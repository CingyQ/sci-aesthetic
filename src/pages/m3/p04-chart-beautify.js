// p04-chart-beautify.js — 图表美化实战
// 5步渐进美化（JS sticky）+ BeforeAfter 对比 + R/Python 代码对照

import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _eventHandlers = [];
let _scrollHandler = null;
let _observers = [];

// ══════════════════════════════════════════════════════
//  工具函数
// ══════════════════════════════════════════════════════
function addEvent(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ══════════════════════════════════════════════════════
//  数据
// ══════════════════════════════════════════════════════
function genData() {
  let seed = 42;
  const rand = () => { seed = (seed * 1664525 + 1013904223) & 0x7fffffff; return seed / 0x7fffffff; };
  const norm = () => { const u = rand(), v = rand(); return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v); };
  const groups = [
    { name: 'Control',   color_idx: 0, x_mean: 1, y_mean: 0.8,  y_sd: 0.15 },
    { name: 'Treatment', color_idx: 1, x_mean: 2, y_mean: 1.4,  y_sd: 0.18 },
    { name: 'Vehicle',   color_idx: 2, x_mean: 3, y_mean: 1.1,  y_sd: 0.13 },
  ];
  return groups.flatMap(g =>
    Array.from({ length: 30 }, () => ({
      group: g.name, color_idx: g.color_idx,
      x: g.x_mean + norm() * 0.12,
      y: Math.max(0.2, g.y_mean + norm() * g.y_sd),
    }))
  );
}
const DATA = genData();

const DEFAULT_COLORS = ['#F8766D', '#00BFC4', '#7CAE00'];
const OKABE_ITO = ['#E69F00', '#56B4E9', '#009E73'];

const BEAUTY_STEPS = [
  {
    num: '01', title: '默认输出',
    color: '#6e6e73',
    desc: 'ggplot2 灰色主题，默认配色，轴标签偏小，图例占据空间。这是一切美化的起点——先确保数据展示逻辑正确，再谈美化。',
    rCode: `ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2) +
  labs(title = "细胞活性对比", x = "实验组", y = "OD450")`,
    changes: [],
  },
  {
    num: '02', title: '配色优化',
    color: '#95D5B2',
    desc: '替换为 Okabe-Ito 色盲安全配色方案，确保所有读者（包括红绿色盲）都能区分不同分组。',
    rCode: `# Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00","#56B4E9","#009E73")

ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2) +
  scale_color_manual(values = okabe_ito) +
  labs(title = "细胞活性对比", x = "实验组", y = "OD450")`,
    changes: ['colors'],
  },
  {
    num: '03', title: '字体调整',
    color: '#7EC8E3',
    desc: '切换到简洁的 theme_classic()，基础字号提升到 10pt（期刊最小要求），坐标轴标题加粗，标题居中对齐。',
    rCode: `ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2.5) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(
    plot.title   = element_text(face = "bold", hjust = 0.5, size = 11),
    axis.title   = element_text(face = "bold"),
    axis.text    = element_text(color = "black", size = 9)
  )`,
    changes: ['colors', 'theme'],
  },
  {
    num: '04', title: '布局重构',
    color: '#B8B8E8',
    desc: '图例移入图表内部（右上角），删除次网格线，增加点的透明度展示数据密度，扩大点的大小提升可读性。',
    rCode: `ggplot(data, aes(x = group, y = value, color = species)) +
  geom_jitter(width = 0.15, size = 3, alpha = 0.7) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(
    legend.position      = c(0.85, 0.85),  # 图例移入图表
    legend.background    = element_rect(fill = "white", color = "grey90"),
    panel.grid.major.y   = element_line(color = "grey92"),
    panel.grid.minor     = element_blank()
  )`,
    changes: ['colors', 'theme', 'layout'],
  },
  {
    num: '05', title: '细节打磨',
    color: '#F0B27A',
    desc: '添加统计显著性标注（*/**），增加箱线图背景展示分布，精调图表边距，最终导出为 300dpi PNG。',
    rCode: `library(ggpubr)

ggplot(data, aes(x = group, y = value, color = species)) +
  geom_boxplot(width = 0.4, outlier.shape = NA, alpha = 0.3, fill = "grey95") +
  geom_jitter(width = 0.1, size = 2.5, alpha = 0.8) +
  stat_compare_means(
    comparisons = list(c("Control","Treatment")),
    method = "t.test", label = "p.signif"
  ) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(legend.position = "none") +
  labs(title = "细胞活性对比分析", subtitle = "± SEM, n=30/group")`,
    changes: ['colors', 'theme', 'layout', 'details'],
  },
];

// BeforeAfter 对比数据
const BA_PAIRS = [
  { id: 'scatter', name: '散点图', desc: '彩虹配色 vs 色盲友好配色', detail: '彩虹色在灰度打印时失去区分度，且对色觉障碍读者不友好。Okabe-Ito 色板专为科学图表设计，单色打印仍可区分。' },
  { id: 'bar',     name: '柱状图', desc: '默认灰色主题 vs 简洁白色主题', detail: '默认灰色背景引入不必要视觉噪声，theme_classic() 去除背景和多余网格，让数据本身成为焦点。' },
  { id: 'line',    name: '折线图', desc: '密集网格 vs 极简网格', detail: '过密的网格线分散注意力。仅保留主要横向网格线，配合细线宽（0.5pt），引导视线跟随数据趋势。' },
  { id: 'boxplot', name: '箱线图', desc: '纯箱线 vs 叠加数据点', detail: '箱线图隐藏了原始数据分布。叠加 jitter 点后，读者可同时看到汇总统计和原始数据密度。' },
  { id: 'heatmap', name: '热力图', desc: '彩虹色阶 vs 单色渐变', detail: '彩虹色阶不是感知均匀的（perceived uniformity），高值和低值视觉权重不一。viridis 等感知均匀色阶确保颜色变化与数值变化成线性对应。' },
];

// R/Python 代码对照数据
const CODE_PAIRS = [
  {
    id: 'scatter', name: '散点图', scene: '展示两个连续变量的相关性，识别数据分群',
    rCode: `library(ggplot2)

# 色盲安全色板
okabe_ito <- c("#E69F00", "#56B4E9", "#009E73")

ggplot(data, aes(x = var1, y = var2, color = group)) +
  geom_point(size = 2.5, alpha = 0.7) +
  geom_smooth(method = "lm", se = TRUE, linewidth = 0.8) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(
    plot.title  = element_text(face = "bold", hjust = 0.5),
    legend.position = c(0.15, 0.85),
    legend.background = element_rect(fill = "white", color = "grey90")
  ) +
  labs(
    title = "变量相关性分析",
    x = "自变量 (单位)", y = "因变量 (单位)",
    caption = "n = 90; 阴影为 95% CI"
  )`,
    pyCode: `import seaborn as sns
import matplotlib.pyplot as plt

# 色盲安全色板（Okabe-Ito）
colors = ["#E69F00", "#56B4E9", "#009E73"]
palette = dict(zip(groups, colors))

fig, ax = plt.subplots(figsize=(6, 4.5), dpi=150)

sns.scatterplot(
    data=df, x="var1", y="var2", hue="group",
    palette=palette, s=40, alpha=0.7, ax=ax
)
sns.regplot(
    data=df, x="var1", y="var2",
    scatter=False, ci=95, color="grey",
    line_kws={"linewidth": 0.8}, ax=ax
)

ax.set(title="变量相关性分析",
       xlabel="自变量 (单位)", ylabel="因变量 (单位)")
ax.set_title("变量相关性分析", fontweight="bold", pad=8)
ax.legend(framealpha=0.9, frameon=True, loc="upper left")
sns.despine()
plt.tight_layout()
plt.savefig("scatter.pdf", bbox_inches="tight")`,
    diff: 'ggplot2 用 geom_smooth() 自动添加回归线；seaborn 需分开调用 regplot()。两者均支持置信区间显示。',
  },
  {
    id: 'bar', name: '柱状图', scene: '比较多组均值，展示误差范围（SE 或 SD）',
    rCode: `library(ggplot2)
library(dplyr)

# 计算均值和标准误
summary_df <- data |>
  group_by(group) |>
  summarise(
    mean = mean(value),
    se   = sd(value) / sqrt(n()),
    .groups = "drop"
  )

ggplot(summary_df, aes(x = group, y = mean, fill = group)) +
  geom_col(width = 0.6, color = "white") +
  geom_errorbar(
    aes(ymin = mean - se, ymax = mean + se),
    width = 0.2, linewidth = 0.6, color = "grey30"
  ) +
  scale_fill_manual(values = c("#E69F00","#56B4E9","#009E73")) +
  theme_classic(base_size = 10) +
  theme(legend.position = "none") +
  labs(title = "各组细胞活性均值 ± SE",
       x = "实验组", y = "OD450 (均值 ± SE)")`,
    pyCode: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 计算均值和标准误
summary = df.groupby("group")["value"].agg(
    mean="mean",
    se=lambda x: x.std() / np.sqrt(len(x))
).reset_index()

colors = {"Control": "#E69F00", "Treatment": "#56B4E9", "Vehicle": "#009E73"}

fig, ax = plt.subplots(figsize=(5, 4), dpi=150)
ax.bar(
    summary["group"], summary["mean"],
    color=[colors[g] for g in summary["group"]],
    width=0.6, edgecolor="white", linewidth=1
)
ax.errorbar(
    summary["group"], summary["mean"],
    yerr=summary["se"], fmt="none",
    ecolor="grey", elinewidth=0.8, capsize=3
)
ax.set(title="各组细胞活性均值 ± SE",
       xlabel="实验组", ylabel="OD450")
ax.title.set_fontweight("bold")
sns.despine()
plt.tight_layout()`,
    diff: 'R 的 geom_col + geom_errorbar 分层清晰；Python 需手动计算 SE 并单独调用 errorbar()。均值±SE 是期刊最常见要求。',
  },
  {
    id: 'boxplot', name: '箱线图', scene: '展示数据分布，对比多组差异，配合显著性检验',
    rCode: `library(ggplot2)
library(ggpubr)

ggplot(data, aes(x = group, y = value, color = group)) +
  # 先画箱线图（背景层）
  geom_boxplot(
    width = 0.45, outlier.shape = NA,
    fill = NA, linewidth = 0.6
  ) +
  # 再叠加 jitter 点（前景层）
  geom_jitter(width = 0.12, size = 2, alpha = 0.6) +
  # 显著性标注
  stat_compare_means(
    comparisons = list(c("Control", "Treatment"),
                       c("Treatment", "Vehicle")),
    method = "wilcox.test", label = "p.signif"
  ) +
  scale_color_manual(values = c("#E69F00","#56B4E9","#009E73")) +
  theme_classic(base_size = 10) +
  theme(legend.position = "none") +
  labs(title = "细胞活性分布对比",
       x = "实验组", y = "OD450",
       caption = "Wilcoxon 秩和检验；ns: p>0.05, *: p<0.05")`,
    pyCode: `import seaborn as sns
import matplotlib.pyplot as plt
from scipy import stats

colors = {"Control": "#E69F00", "Treatment": "#56B4E9", "Vehicle": "#009E73"}
groups = ["Control", "Treatment", "Vehicle"]

fig, ax = plt.subplots(figsize=(5.5, 4.5), dpi=150)

# 箱线图（无异常值标记）
sns.boxplot(data=df, x="group", y="value",
            palette=colors, width=0.45,
            flierprops={"marker": "none"}, ax=ax)
# 叠加 jitter 点
sns.stripplot(data=df, x="group", y="value",
              palette=colors, jitter=0.12,
              size=3, alpha=0.6, ax=ax)

# 手动添加显著性标注
pairs = [(0, 1), (1, 2)]
y_max = df["value"].max()
for i, (g1, g2) in enumerate(pairs):
    d1 = df[df["group"] == groups[g1]]["value"]
    d2 = df[df["group"] == groups[g2]]["value"]
    _, p = stats.mannwhitneyu(d1, d2)
    label = "ns" if p > 0.05 else ("*" if p < 0.05 else "**")
    y = y_max + 0.1 + i * 0.15
    ax.plot([g1, g2], [y, y], color="black", linewidth=0.8)
    ax.text((g1 + g2) / 2, y + 0.02, label,
            ha="center", fontsize=10)

sns.despine()
plt.tight_layout()`,
    diff: 'ggpubr 的 stat_compare_means() 一行实现显著性标注；Python 需手动用 scipy 计算 p 值并绘制连线。R 方案更简洁，Python 方案更灵活。',
  },
];

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════
export function render() {
  return `
<div class="page-scroll">
<style>
/* ── Hero ── */
.p04-hero { background: var(--bg-dark); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.p04-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: p04-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}
@keyframes p04-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 粘性步骤 ── */
.p04-s1 { background: var(--bg-light); }
.p04-s1-inner { padding: var(--space-2xl) 0 0; }
.p04-s1-heading { text-align: center; padding: 0 var(--space-lg) var(--space-xl); }
.p04-s1-heading h2 { font-family: var(--font-display); font-size: clamp(2rem,4vw,3.5rem); color: var(--text-on-light); letter-spacing: -0.02em; margin-bottom: var(--space-sm); }
.p04-s1-heading p { font-size: var(--text-body); color: var(--text-on-light-2); max-width: 560px; margin: 0 auto; line-height: 1.8; }

.p04-steps-body { display: flex; align-items: flex-start; position: relative; }
.p04-steps-left {
  width: 45%; flex-shrink: 0; height: 100vh; will-change: transform;
  padding: var(--space-2xl) var(--space-lg);
  box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;
}
.p04-steps-right { flex: 1; min-width: 0; }
.p04-step-panel { height: 100vh; display: flex; align-items: center; justify-content: center; padding: var(--space-lg); }

.p04-step-num { font-family: var(--font-display); font-size: clamp(4rem,8vw,7rem); font-weight: 700; line-height: 1; margin-bottom: var(--space-sm); transition: color 0.5s ease; }
.p04-step-title { font-family: var(--font-heading); font-size: clamp(1.4rem,2.5vw,2rem); font-weight: 700; color: var(--text-on-light); margin-bottom: var(--space-md); }
.p04-step-desc { font-size: var(--text-body); color: var(--text-on-light-2); line-height: 1.8; max-width: 380px; margin-bottom: var(--space-md); }
.p04-step-code-wrap { background: var(--bg-dark); border-radius: var(--radius-md); padding: var(--space-md); overflow: hidden; }
.p04-step-code-wrap pre { margin: 0; font-family: var(--font-code); font-size: 12px; line-height: 1.7; color: #a8dadc; white-space: pre-wrap; word-wrap: break-word; }

.p04-changes { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-md); min-height: 24px; }
.p04-change-tag { font-size: 11px; padding: 3px 10px; border-radius: var(--radius-full); border: 1px solid; font-family: var(--font-code); }

.p04-step-indicator { display: flex; gap: 8px; margin-top: var(--space-md); align-items: center; }
.p04-step-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border-light); transition: all 0.4s ease; cursor: pointer; }
.p04-step-dot.active { width: 24px; border-radius: 4px; }

.p04-chart-card { background: var(--bg-light-elevated); border-radius: var(--radius-lg); padding: var(--space-md); box-shadow: 0 4px 32px rgba(0,0,0,0.08); width: 100%; max-width: 420px; }
.p04-chart-card svg { width: 100%; height: auto; display: block; }
.p04-chart-step-label { font-size: 11px; font-family: var(--font-code); color: var(--text-on-light-2); text-align: center; margin-bottom: 8px; letter-spacing: 0.05em; }

@media (max-width: 768px) {
  #p04-s1, #p04-s2, #p04-s3 { scroll-margin-top: 56px; }
  .p04-steps-body { flex-direction: column; }
  .p04-steps-left {
    width: 100%; height: auto;
    position: sticky; top: 56px; z-index: 10;
    padding: var(--space-md);
    background: var(--bg-light);
    border-bottom: 1px solid var(--border-light);
  }
  .p04-step-num { font-size: 2.5rem; }
  .p04-step-desc { font-size: 14px; margin-bottom: 8px; }
  .p04-step-code-wrap { display: none; }
  .p04-step-panel { height: auto; min-height: 60vh; padding: var(--space-md); }
}

/* ── S2 BeforeAfter ── */
.p04-s2 { background: var(--bg-dark); padding: var(--space-2xl) 0; }
.p04-s2-heading { text-align: center; margin-bottom: var(--space-2xl); }
.p04-s2-heading h2 { font-family: var(--font-display); font-size: clamp(2rem,4vw,3.5rem); color: var(--text-on-dark); letter-spacing: -0.02em; margin-bottom: var(--space-sm); }
.p04-s2-heading p { color: var(--text-on-dark-2); max-width: 560px; margin: 0 auto; line-height: 1.8; }

.p04-ba-wrapper { display: grid; grid-template-columns: 220px 1fr; gap: var(--space-lg); align-items: start; }
.p04-ba-list { display: flex; flex-direction: column; gap: 4px; }
.p04-ba-list-item {
  min-height: 44px; padding: 10px 16px; border-radius: var(--radius-sm);
  cursor: pointer; transition: all 0.2s ease;
  display: flex; align-items: center; gap: 10px;
  color: var(--text-on-dark-2); font-family: var(--font-body); font-size: 14px;
  border: 1px solid transparent;
}
.p04-ba-list-item:hover { background: var(--bg-dark-elevated); color: var(--text-on-dark); }
.p04-ba-list-item.active { background: var(--bg-dark-elevated); color: var(--module-3); border-color: var(--module-3); }
.p04-ba-list-icon { font-size: 18px; }

.p04-ba-preview { position: sticky; top: 80px; background: var(--bg-dark-elevated); border-radius: var(--radius-lg); padding: var(--space-lg); }
.p04-ba-desc { margin-bottom: var(--space-md); }
.p04-ba-desc h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-on-dark); margin-bottom: 6px; }
.p04-ba-desc p { font-size: 14px; color: var(--text-on-dark-2); line-height: 1.7; }
.p04-ba-charts { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-md); }
.p04-ba-chart-label { font-size: 11px; font-family: var(--font-code); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 8px; }
.p04-ba-chart-label.bad { color: #ef5350; }
.p04-ba-chart-label.good { color: var(--module-3); }
.p04-ba-chart-svg { background: white; border-radius: var(--radius-sm); overflow: hidden; }
.p04-ba-chart-svg svg { width: 100%; height: auto; display: block; }
.p04-ba-note { font-size: 13px; color: var(--text-on-dark-2); line-height: 1.7; padding-top: var(--space-sm); border-top: 1px solid var(--border-dark); }

@media (max-width: 900px) {
  .p04-ba-wrapper { grid-template-columns: 1fr; }
  .p04-ba-list { flex-direction: row; flex-wrap: wrap; gap: 8px; }
  .p04-ba-preview { position: static; }
}

/* ── S3 代码对照 ── */
.p04-s3 { background: var(--bg-light); padding: var(--space-2xl) 0; }
.p04-s3-heading { text-align: center; margin-bottom: var(--space-xl); }
.p04-s3-heading h2 { font-family: var(--font-display); font-size: clamp(2rem,4vw,3.5rem); color: var(--text-on-light); letter-spacing: -0.02em; margin-bottom: var(--space-sm); }
.p04-s3-heading p { color: var(--text-on-light-2); max-width: 560px; margin: 0 auto; line-height: 1.8; }

.p04-chart-selector { display: flex; gap: 8px; margin-bottom: var(--space-lg); flex-wrap: wrap; }
.p04-chart-sel-btn {
  min-height: 36px; padding: 6px 16px; border-radius: var(--radius-full);
  cursor: pointer; border: 1px solid var(--border-light);
  font-family: var(--font-body); font-size: 13px; background: transparent;
  color: var(--text-on-light-2); transition: all 0.2s ease;
}
.p04-chart-sel-btn.active { background: var(--module-3); color: #000; border-color: var(--module-3); }

.p04-code-panel { display: none; }
.p04-code-panel.active { display: block; }

.p04-chart-info { margin-bottom: var(--space-lg); }
.p04-chart-info h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-on-light); margin-bottom: 6px; }
.p04-chart-info p { font-size: 14px; color: var(--text-on-light-2); line-height: 1.7; }

.p04-code-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); margin-bottom: var(--space-md); }
.p04-code-col h4 { font-size: 12px; font-family: var(--font-code); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.p04-code-col h4.r-label { color: #2196F3; }
.p04-code-col h4.py-label { color: #FF9800; }
.p04-code-block {
  background: var(--bg-dark); border-radius: var(--radius-sm); padding: var(--space-md);
  margin: 0; font-family: var(--font-code); font-size: 12px; line-height: 1.7;
  color: #a8dadc; white-space: pre-wrap; word-wrap: break-word; overflow: auto;
  max-height: 400px; display: block;
}
.p04-code-diff { font-size: 13px; color: var(--text-on-light-2); line-height: 1.7; padding: var(--space-md); background: var(--bg-light-elevated); border-radius: var(--radius-sm); border-left: 3px solid var(--module-3); }
.p04-code-diff strong { color: var(--text-on-light); }

@media (max-width: 768px) {
  .p04-code-grid { grid-template-columns: 1fr; }
  .p04-code-block { font-size: 11px; max-height: 280px; }
}

/* ── Footer ── */
.p04-footer { background: var(--bg-dark); min-height: 50vh; display: flex; align-items: center; justify-content: center; text-align: center; }
</style>

<!-- ══════════════════════════════════════════════════════ -->
<!--  Hero                                                  -->
<!-- ══════════════════════════════════════════════════════ -->
<section class="section-dark section-hero-full p04-hero" id="p04-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" id="p04-eyebrow" style="opacity:0;">Module 03 / Page 04</p>
    <h1 class="page-hero-title" id="p04-title" style="color:var(--text-on-dark);opacity:0;">图表美化实战</h1>
    <p class="page-hero-sub" id="p04-sub" style="opacity:0;">From Default to Publication-Quality: 5-Step Chart Beautification</p>
    <p id="p04-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
      ggplot2 默认样式只是起点，5 步渐进美化让图表达到顶刊投稿标准
    </p>
    <nav class="hero-quicknav" id="p04-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p04-s1">渐进美化</button>
      <button class="hero-quicknav__item" data-target="#p04-s2">对比案例</button>
      <button class="hero-quicknav__item" data-target="#p04-s3">代码实现</button>
    </nav>
    <div class="p04-scroll-hint" id="p04-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════ -->
<!--  S1: 5步渐进美化                                        -->
<!-- ══════════════════════════════════════════════════════ -->
<section class="p04-s1" id="p04-s1">
  <div class="p04-s1-inner">
    <div class="p04-s1-heading content-wrapper">
      <h2>5 步渐进美化</h2>
      <p>从 ggplot2 默认输出到顶刊投稿质量，每一步都有明确目标和可衡量的改进</p>
    </div>
    <div class="p04-steps-body" id="p04-steps-body">
      <!-- 左侧：步骤说明（JS transform sticky）-->
      <div class="p04-steps-left" id="p04-steps-left">
        <div class="p04-step-num" id="p04-step-num" style="color:#6e6e73;">01</div>
        <div class="p04-step-title" id="p04-step-title">默认输出</div>
        <div class="p04-changes" id="p04-changes"></div>
        <div class="p04-step-desc" id="p04-step-desc">
          ggplot2 灰色主题，默认配色，轴标签偏小，图例占据空间。这是一切美化的起点——先确保数据展示逻辑正确，再谈美化。
        </div>
        <div class="p04-step-code-wrap">
          <pre id="p04-step-code"></pre>
        </div>
        <div class="p04-step-indicator" id="p04-step-indicator">
          ${BEAUTY_STEPS.map((_, i) => `<div class="p04-step-dot${i === 0 ? ' active' : ''}" data-step="${i}"></div>`).join('')}
        </div>
      </div>
      <!-- 右侧：每步 D3 图表 -->
      <div class="p04-steps-right">
        ${BEAUTY_STEPS.map((step, i) => `
        <div class="p04-step-panel" id="p04-panel-${i}">
          <div class="p04-chart-card">
            <div class="p04-chart-step-label">Step ${step.num} — ${step.title}</div>
            <div id="p04-chart-${i}" style="width:100%;"></div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════ -->
<!--  S2: BeforeAfter 对比                                   -->
<!-- ══════════════════════════════════════════════════════ -->
<section class="p04-s2" id="p04-s2">
  <div class="content-wrapper">
    <div class="p04-s2-heading">
      <h2>案例对比：改前 vs 改后</h2>
      <p>5 种常见图表类型的美化对比，每对图表都清晰展示改进前后的视觉差异</p>
    </div>
    <div class="p04-ba-wrapper">
      <!-- 左侧列表 -->
      <div class="p04-ba-list" id="p04-ba-list">
        ${BA_PAIRS.map((pair, i) => `
        <div class="p04-ba-list-item${i === 0 ? ' active' : ''}" data-ba="${i}">
          <span class="p04-ba-list-icon">${['●','▮','↗','⊡','▦'][i]}</span>
          <div>
            <div style="font-weight:600;font-size:13px;">${pair.name}</div>
            <div style="font-size:11px;margin-top:2px;opacity:0.7;">${pair.desc}</div>
          </div>
        </div>
        `).join('')}
      </div>
      <!-- 右侧预览 -->
      <div class="p04-ba-preview" id="p04-ba-preview">
        <div class="p04-ba-desc">
          <h3 id="p04-ba-title">${BA_PAIRS[0].name}</h3>
          <p id="p04-ba-subdesc">${BA_PAIRS[0].desc}</p>
        </div>
        <div class="p04-ba-charts">
          <div class="p04-ba-chart-wrap">
            <div class="p04-ba-chart-label bad">Before — 改前</div>
            <div class="p04-ba-chart-svg" id="p04-ba-bad"></div>
          </div>
          <div class="p04-ba-chart-wrap">
            <div class="p04-ba-chart-label good">After — 改后</div>
            <div class="p04-ba-chart-svg" id="p04-ba-good"></div>
          </div>
        </div>
        <p class="p04-ba-note" id="p04-ba-note">${BA_PAIRS[0].detail}</p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════ -->
<!--  S3: R/Python 代码对照                                  -->
<!-- ══════════════════════════════════════════════════════ -->
<section class="p04-s3" id="p04-s3">
  <div class="content-wrapper">
    <div class="p04-s3-heading">
      <h2>R / Python 代码对照</h2>
      <p>同一图表，两种语言实现。选择你熟悉的工具，快速复用到自己的科研项目</p>
    </div>
    <div class="p04-chart-selector" id="p04-chart-selector">
      ${CODE_PAIRS.map((p, i) => `<button class="p04-chart-sel-btn${i === 0 ? ' active' : ''}" data-chart="${i}">${p.name}</button>`).join('')}
    </div>
    ${CODE_PAIRS.map((pair, i) => `
    <div class="p04-code-panel${i === 0 ? ' active' : ''}" id="p04-code-panel-${i}">
      <div class="p04-chart-info">
        <h3>${pair.name}</h3>
        <p>适用场景：${pair.scene}</p>
      </div>
      <div class="p04-code-grid">
        <div class="p04-code-col">
          <h4 class="r-label">R — ggplot2</h4>
          <pre class="p04-code-block">${escapeHtml(pair.rCode)}</pre>
        </div>
        <div class="p04-code-col">
          <h4 class="py-label">Python — seaborn / matplotlib</h4>
          <pre class="p04-code-block">${escapeHtml(pair.pyCode)}</pre>
        </div>
      </div>
      <div class="p04-code-diff"><strong>关键差异：</strong>${pair.diff}</div>
    </div>
    `).join('')}
  </div>
</section>

<!-- ══════════════════════════════════════════════════════ -->
<!--  Footer CTA                                            -->
<!-- ══════════════════════════════════════════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">04 / 07</p>
  <h2 class="page-footer-quote">同样的数据，好的设计让它开口说话。</h2>
  <p class="page-footer-desc">从数据到发表级图表，美化不是装饰，是科学表达的精准度。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p04-prev-btn">← 贝塞尔曲线</button>
    <button class="btn-primary" id="p04-next-btn">SVG 编辑与优化 →</button>
  </div>
</section>
</div>
  `;
}

// HTML 转义
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ══════════════════════════════════════════════════════
//  D3 步骤图表绘制
// ══════════════════════════════════════════════════════
function drawStepChart(containerId, stepIdx) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const step = BEAUTY_STEPS[stepIdx];
  const changes = step.changes;
  const hasColors  = changes.includes('colors');
  const hasTheme   = changes.includes('theme');
  const hasLayout  = changes.includes('layout');
  const hasDetails = changes.includes('details');

  const colors     = hasColors ? OKABE_ITO : DEFAULT_COLORS;
  const bgColor    = hasTheme ? '#ffffff' : '#ebebeb';
  const axisColor  = hasTheme ? '#333' : '#999';
  const gridColor  = hasTheme ? '#f0f0f0' : 'white';
  const pointR     = hasLayout ? 5 : hasColors ? 4.5 : 4;
  const pointAlpha = hasLayout ? 0.7 : 0.85;

  const W = 360, H = 240;
  const margin = hasTheme
    ? { top: 30, right: 80, bottom: 45, left: 50 }
    : { top: 20, right: 65, bottom: 30, left: 38 };
  const innerW = W - margin.left - margin.right;
  const innerH = H - margin.top - margin.bottom;

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('background', bgColor);

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleLinear().domain([0.5, 3.5]).range([0, innerW]);
  const yScale = d3.scaleLinear().domain([0, 2.2]).range([innerH, 0]);

  // 背景面板
  g.append('rect').attr('width', innerW).attr('height', innerH).attr('fill', bgColor);

  // 网格线
  [0.5, 1.0, 1.5, 2.0].forEach(v => {
    g.append('line')
      .attr('x1', 0).attr('x2', innerW)
      .attr('y1', yScale(v)).attr('y2', yScale(v))
      .attr('stroke', gridColor)
      .attr('stroke-width', hasTheme ? 0.8 : 1);
  });

  // 步骤5：箱线图层
  if (hasDetails) {
    ['Control', 'Treatment', 'Vehicle'].forEach((grp, gi) => {
      const vals = DATA.filter(d => d.group === grp).map(d => d.y).sort(d3.ascending);
      const q1  = d3.quantile(vals, 0.25);
      const q3  = d3.quantile(vals, 0.75);
      const med = d3.quantile(vals, 0.5);
      const iqr = q3 - q1;
      const lo  = Math.max(d3.min(vals), q1 - 1.5 * iqr);
      const hi  = Math.min(d3.max(vals), q3 + 1.5 * iqr);
      const bx  = xScale(gi + 1);
      const bw  = 26;
      g.append('line').attr('x1', bx).attr('x2', bx).attr('y1', yScale(lo)).attr('y2', yScale(hi)).attr('stroke', '#bbb').attr('stroke-width', 1);
      g.append('rect').attr('x', bx - bw / 2).attr('y', yScale(q3)).attr('width', bw).attr('height', yScale(q1) - yScale(q3)).attr('fill', 'rgba(200,200,200,0.3)').attr('stroke', '#ccc').attr('stroke-width', 1);
      g.append('line').attr('x1', bx - bw / 2).attr('x2', bx + bw / 2).attr('y1', yScale(med)).attr('y2', yScale(med)).attr('stroke', '#888').attr('stroke-width', 2);
    });

    // 显著性标注
    const maxY = d3.max(DATA, d => d.y);
    const sigY = yScale(maxY + 0.12);
    g.append('line').attr('x1', xScale(1)).attr('x2', xScale(2)).attr('y1', sigY).attr('y2', sigY).attr('stroke', '#555').attr('stroke-width', 0.8);
    g.append('text').attr('x', xScale(1.5)).attr('y', sigY - 3).attr('text-anchor', 'middle').attr('font-size', 11).attr('fill', '#555').text('*');
  }

  // 散点（步骤4+：jitter）
  const jitterW = hasLayout ? 0.09 : 0;
  // 用固定偏移避免随机（保证重绘一致）
  DATA.forEach((d, idx) => {
    const jOffset = hasLayout ? ((idx % 19 - 9) / 9) * jitterW : 0;
    g.append('circle')
      .attr('cx', xScale(d.color_idx + 1 + jOffset))
      .attr('cy', yScale(d.y))
      .attr('r', pointR)
      .attr('fill', colors[d.color_idx])
      .attr('opacity', pointAlpha);
  });

  // 坐标轴线
  g.append('line').attr('x1', 0).attr('x2', innerW).attr('y1', innerH).attr('y2', innerH).attr('stroke', axisColor).attr('stroke-width', hasTheme ? 1.2 : 0.6);
  g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', innerH).attr('stroke', axisColor).attr('stroke-width', hasTheme ? 1.2 : 0.6);

  // X 轴标签
  const xGroups = ['Control', 'Treatment', 'Vehicle'];
  xGroups.forEach((name, i) => {
    g.append('text')
      .attr('x', xScale(i + 1))
      .attr('y', innerH + (hasTheme ? 18 : 13))
      .attr('text-anchor', 'middle')
      .attr('font-size', hasTheme ? 9 : 7.5)
      .attr('font-weight', hasTheme ? 'normal' : 'normal')
      .attr('fill', axisColor)
      .text(name);
  });

  // Y 轴标签
  [0, 0.5, 1.0, 1.5, 2.0].forEach(v => {
    g.append('text')
      .attr('x', -5)
      .attr('y', yScale(v) + 3)
      .attr('text-anchor', 'end')
      .attr('font-size', hasTheme ? 8 : 7)
      .attr('fill', axisColor)
      .text(v.toFixed(1));
  });

  // 轴标题（步骤3+）
  if (hasTheme) {
    g.append('text').attr('x', innerW / 2).attr('y', innerH + 38).attr('text-anchor', 'middle').attr('font-size', 9.5).attr('font-weight', 'bold').attr('fill', '#333').text('实验组');
    g.append('text').attr('transform', 'rotate(-90)').attr('x', -innerH / 2).attr('y', -36).attr('text-anchor', 'middle').attr('font-size', 9.5).attr('font-weight', 'bold').attr('fill', '#333').text('OD450');
    svg.append('text').attr('x', W / 2).attr('y', 15).attr('text-anchor', 'middle').attr('font-size', 10.5).attr('font-weight', 'bold').attr('fill', '#1d1d1f').text('细胞活性对比');
  }

  // 图例
  if (!hasLayout) {
    // 外部图例（步骤1-3）
    const lx = innerW + (hasTheme ? 8 : 5);
    xGroups.forEach((name, i) => {
      const ly = 20 + i * 18;
      g.append('circle').attr('cx', lx + 5).attr('cy', ly).attr('r', 4).attr('fill', colors[i]).attr('opacity', 0.85);
      g.append('text').attr('x', lx + 13).attr('y', ly + 4).attr('font-size', 7.5).attr('fill', axisColor).text(name);
    });
  } else {
    // 内部图例（步骤4-5，右上角）
    const legW = 80, legH = 60;
    const legX = innerW - legW - 4;
    const legY = 4;
    g.append('rect').attr('x', legX).attr('y', legY).attr('width', legW).attr('height', legH).attr('fill', 'white').attr('stroke', '#e0e0e0').attr('stroke-width', 0.8).attr('rx', 3);
    xGroups.forEach((name, i) => {
      const ly = legY + 14 + i * 16;
      g.append('circle').attr('cx', legX + 10).attr('cy', ly).attr('r', 4).attr('fill', colors[i]).attr('opacity', 0.75);
      g.append('text').attr('x', legX + 20).attr('y', ly + 4).attr('font-size', 8).attr('fill', '#333').text(name);
    });
  }
}

// ══════════════════════════════════════════════════════
//  BeforeAfter D3 图表
// ══════════════════════════════════════════════════════
function makeBaSvg(containerId, W, H) {
  const container = document.getElementById(containerId);
  if (!container) return null;
  container.innerHTML = '';
  return d3.select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
}

function drawBaBad(type) {
  const W = 240, H = 170;
  const svg = makeBaSvg('p04-ba-bad', W, H);
  if (!svg) return;

  if (type === 'scatter') {
    const g = svg.append('g').attr('transform', 'translate(28,10)');
    const iW = 180, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', '#ebebeb');
    for (let i = 0; i <= 8; i++) {
      g.append('line').attr('x1', i * iW / 8).attr('x2', i * iW / 8).attr('y1', 0).attr('y2', iH).attr('stroke', 'white').attr('stroke-width', 0.5);
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', i * iH / 8).attr('y2', i * iH / 8).attr('stroke', 'white').attr('stroke-width', 0.5);
    }
    const rainbow = d3.interpolateRainbow;
    const xS = d3.scaleLinear().domain([0.5, 3.5]).range([0, iW]);
    const yS = d3.scaleLinear().domain([0, 2.2]).range([iH, 0]);
    DATA.forEach(d => {
      g.append('circle').attr('cx', xS(d.color_idx + 1)).attr('cy', yS(d.y)).attr('r', 3).attr('fill', rainbow(d.color_idx / 2.5)).attr('opacity', 0.8);
    });
    // 小且模糊的轴标签
    g.append('text').attr('x', iW / 2).attr('y', iH + 12).attr('text-anchor', 'middle').attr('font-size', 7).attr('fill', '#999').text('Group');
    g.append('text').attr('transform', 'rotate(-90)').attr('x', -iH / 2).attr('y', -16).attr('text-anchor', 'middle').attr('font-size', 7).attr('fill', '#999').text('Value');
    // 外部图例（右侧挤占空间）
    ['Ctrl', 'Trt', 'Veh'].forEach((l, i) => {
      const ly = 15 + i * 18;
      g.append('circle').attr('cx', iW + 8).attr('cy', ly).attr('r', 3.5).attr('fill', rainbow(i / 2.5));
      g.append('text').attr('x', iW + 15).attr('y', ly + 3).attr('font-size', 7).attr('fill', '#777').text(l);
    });

  } else if (type === 'bar') {
    const g = svg.append('g').attr('transform', 'translate(28,10)');
    const iW = 170, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', '#ebebeb');
    [0.25, 0.5, 0.75].forEach(v => {
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH * (1 - v)).attr('y2', iH * (1 - v)).attr('stroke', 'white').attr('stroke-width', 0.8);
    });
    const bars = [{ x: 15, h: 55, c: '#F8766D', l: 'Control' }, { x: 65, h: 90, c: '#00BFC4', l: 'Treatment' }, { x: 115, h: 70, c: '#7CAE00', l: 'Vehicle' }];
    bars.forEach(b => g.append('rect').attr('x', b.x).attr('y', iH - b.h).attr('width', 40).attr('height', b.h).attr('fill', b.c));
    // 小字分类标签
    bars.forEach(b => g.append('text').attr('x', b.x + 20).attr('y', iH + 11).attr('text-anchor', 'middle').attr('font-size', 6.5).attr('fill', '#888').text(b.l));
    // 外部图例（浪费空间）
    bars.forEach((b, i) => {
      g.append('rect').attr('x', iW + 4).attr('y', 10 + i * 16).attr('width', 8).attr('height', 8).attr('fill', b.c);
      g.append('text').attr('x', iW + 14).attr('y', 18 + i * 16).attr('font-size', 7).attr('fill', '#777').text(b.l);
    });

  } else if (type === 'line') {
    const g = svg.append('g').attr('transform', 'translate(22,8)');
    const iW = 190, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', '#ebebeb');
    // 极密网格
    for (let i = 0; i <= 12; i++) {
      g.append('line').attr('x1', i * iW / 12).attr('x2', i * iW / 12).attr('y1', 0).attr('y2', iH).attr('stroke', 'white').attr('stroke-width', 0.4);
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', i * iH / 12).attr('y2', i * iH / 12).attr('stroke', 'white').attr('stroke-width', 0.4);
    }
    const xs = [0, 38, 76, 114, 152, 190];
    const ys = [100, 60, 82, 44, 70, 55];
    const line = d3.line().x((d, i) => xs[i]).y(d => d);
    g.append('path').datum(ys).attr('d', line).attr('stroke', '#F8766D').attr('stroke-width', 0.8).attr('fill', 'none');
    // 无数据点，细线

  } else if (type === 'boxplot') {
    const g = svg.append('g').attr('transform', 'translate(22,8)');
    const iW = 185, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', 'white').attr('stroke', '#ddd');
    const bxData = [
      { x: 40, q1: 70, med: 55, q3: 35, lo: 90, hi: 25, c: '#F8766D' },
      { x: 95, q1: 40, med: 28, q3: 10, lo: 55, hi: 5,  c: '#00BFC4' },
      { x: 150,q1: 55, med: 42, q3: 25, lo: 70, hi: 18, c: '#7CAE00' },
    ];
    bxData.forEach(b => {
      g.append('line').attr('x1', b.x).attr('x2', b.x).attr('y1', b.lo).attr('y2', b.hi).attr('stroke', b.c).attr('stroke-width', 1);
      g.append('rect').attr('x', b.x - 16).attr('y', b.q3).attr('width', 32).attr('height', b.q1 - b.q3).attr('fill', b.c).attr('opacity', 0.6).attr('stroke', b.c);
      g.append('line').attr('x1', b.x - 16).attr('x2', b.x + 16).attr('y1', b.med).attr('y2', b.med).attr('stroke', 'white').attr('stroke-width', 2);
      // 外部异常值点（混杂）
      for (let i = 0; i < 3; i++) {
        g.append('circle').attr('cx', b.x + (i - 1) * 5).attr('cy', b.lo - 4 - i * 5).attr('r', 2).attr('fill', b.c).attr('opacity', 0.5);
      }
    });

  } else if (type === 'heatmap') {
    const g = svg.append('g').attr('transform', 'translate(10,8)');
    const rows = 5, cols = 6, cW = 30, cH = 22;
    const rainbow = d3.interpolateRainbow;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = (r * cols + c) / (rows * cols - 1);
        g.append('rect').attr('x', c * cW).attr('y', r * cH).attr('width', cW - 1).attr('height', cH - 1).attr('fill', rainbow(v));
      }
    }
    const defs = svg.append('defs');
    const grad = defs.append('linearGradient').attr('id', 'p04-bad-rainbow').attr('x1', '0').attr('x2', '1');
    [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1].forEach(t => grad.append('stop').attr('offset', t).attr('stop-color', rainbow(t)));
    g.append('rect').attr('x', 0).attr('y', rows * cH + 4).attr('width', cols * cW - 1).attr('height', 8).attr('fill', 'url(#p04-bad-rainbow)');
    g.append('text').attr('x', (cols * cW) / 2).attr('y', rows * cH + 24).attr('text-anchor', 'middle').attr('font-size', 7).attr('fill', '#999').text('Rainbow (感知非均匀)');
  }
}

function drawBaGood(type) {
  const W = 240, H = 170;
  const svg = makeBaSvg('p04-ba-good', W, H);
  if (!svg) return;

  if (type === 'scatter') {
    const g = svg.append('g').attr('transform', 'translate(28,10)');
    const iW = 180, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', 'white');
    // 稀疏横向网格
    [0.5, 1, 1.5, 2].forEach(v => {
      const y = iH - (v / 2.5) * iH;
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', y).attr('y2', y).attr('stroke', '#f0f0f0').attr('stroke-width', 0.8);
    });
    const xS = d3.scaleLinear().domain([0.5, 3.5]).range([0, iW]);
    const yS = d3.scaleLinear().domain([0, 2.2]).range([iH, 0]);
    DATA.forEach((d, idx) => {
      const joff = ((idx % 15) - 7) / 70;
      g.append('circle').attr('cx', xS(d.color_idx + 1 + joff)).attr('cy', yS(d.y)).attr('r', 3.5).attr('fill', OKABE_ITO[d.color_idx]).attr('opacity', 0.75);
    });
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);
    g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);
    g.append('text').attr('x', iW / 2).attr('y', iH + 13).attr('text-anchor', 'middle').attr('font-size', 8).attr('font-weight', 'bold').attr('fill', '#333').text('实验组');
    // 内部图例
    const lx = iW - 78, ly = 4;
    g.append('rect').attr('x', lx).attr('y', ly).attr('width', 76).attr('height', 56).attr('fill', 'white').attr('stroke', '#e8e8e8').attr('rx', 3);
    ['Control', 'Treat.', 'Vehicle'].forEach((l, i) => {
      g.append('circle').attr('cx', lx + 9).attr('cy', ly + 12 + i * 15).attr('r', 3.5).attr('fill', OKABE_ITO[i]).attr('opacity', 0.75);
      g.append('text').attr('x', lx + 18).attr('y', ly + 16 + i * 15).attr('font-size', 8).attr('fill', '#333').text(l);
    });

  } else if (type === 'bar') {
    const g = svg.append('g').attr('transform', 'translate(28,12)');
    const iW = 172, iH = 118;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', 'white');
    [0.25, 0.5, 0.75].forEach(v => {
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH * (1 - v)).attr('y2', iH * (1 - v)).attr('stroke', '#f0f0f0').attr('stroke-width', 0.8);
    });
    const bars = [{ x: 15, h: 55, c: OKABE_ITO[0] }, { x: 65, h: 90, c: OKABE_ITO[1] }, { x: 115, h: 70, c: OKABE_ITO[2] }];
    bars.forEach(b => {
      g.append('rect').attr('x', b.x).attr('y', iH - b.h).attr('width', 40).attr('height', b.h).attr('fill', b.c).attr('rx', 1);
      // 误差线
      const midX = b.x + 20;
      g.append('line').attr('x1', midX).attr('x2', midX).attr('y1', iH - b.h - 7).attr('y2', iH - b.h + 7).attr('stroke', '#555').attr('stroke-width', 1.2);
      g.append('line').attr('x1', midX - 6).attr('x2', midX + 6).attr('y1', iH - b.h - 7).attr('y2', iH - b.h - 7).attr('stroke', '#555').attr('stroke-width', 0.8);
      g.append('line').attr('x1', midX - 6).attr('x2', midX + 6).attr('y1', iH - b.h + 7).attr('y2', iH - b.h + 7).attr('stroke', '#555').attr('stroke-width', 0.8);
    });
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1.2);
    g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1.2);
    ['Control', 'Treatment', 'Vehicle'].forEach((l, i) => {
      g.append('text').attr('x', bars[i].x + 20).attr('y', iH + 12).attr('text-anchor', 'middle').attr('font-size', 7.5).attr('fill', '#333').text(l);
    });

  } else if (type === 'line') {
    const g = svg.append('g').attr('transform', 'translate(22,8)');
    const iW = 190, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', 'white');
    // 稀疏网格
    [40, 80].forEach(y => {
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', y).attr('y2', y).attr('stroke', '#f0f0f0').attr('stroke-width', 0.8);
    });
    const xs = [0, 38, 76, 114, 152, 190];
    const ys = [100, 60, 82, 44, 70, 55];
    const line = d3.line().x((d, i) => xs[i]).y(d => d).curve(d3.curveCatmullRom);
    g.append('path').datum(ys).attr('d', line).attr('stroke', OKABE_ITO[1]).attr('stroke-width', 2).attr('fill', 'none');
    // 数据点
    xs.forEach((x, i) => {
      g.append('circle').attr('cx', x).attr('cy', ys[i]).attr('r', 4).attr('fill', 'white').attr('stroke', OKABE_ITO[1]).attr('stroke-width', 2);
    });
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);
    g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);

  } else if (type === 'boxplot') {
    const g = svg.append('g').attr('transform', 'translate(22,8)');
    const iW = 185, iH = 120;
    g.append('rect').attr('width', iW).attr('height', iH).attr('fill', 'white');
    [40, 80].forEach(y => {
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', y).attr('y2', y).attr('stroke', '#f0f0f0').attr('stroke-width', 0.7);
    });
    const bxData = [
      { x: 40, q1: 70, med: 55, q3: 35, lo: 90, hi: 25, c: OKABE_ITO[0] },
      { x: 95, q1: 40, med: 28, q3: 10, lo: 55, hi: 5,  c: OKABE_ITO[1] },
      { x: 150,q1: 55, med: 42, q3: 25, lo: 70, hi: 18, c: OKABE_ITO[2] },
    ];
    bxData.forEach(b => {
      g.append('line').attr('x1', b.x).attr('x2', b.x).attr('y1', b.lo).attr('y2', b.hi).attr('stroke', '#ccc').attr('stroke-width', 1);
      g.append('rect').attr('x', b.x - 16).attr('y', b.q3).attr('width', 32).attr('height', b.q1 - b.q3).attr('fill', 'none').attr('stroke', b.c).attr('stroke-width', 1.8);
      g.append('line').attr('x1', b.x - 16).attr('x2', b.x + 16).attr('y1', b.med).attr('y2', b.med).attr('stroke', b.c).attr('stroke-width', 2.5);
      // Jitter 点
      for (let i = 0; i < 10; i++) {
        const jx = b.x + ((i * 7 + 3) % 17 - 8);
        const jy = b.q3 + (i * 13 % (b.q1 - b.q3));
        g.append('circle').attr('cx', jx).attr('cy', jy).attr('r', 2.5).attr('fill', b.c).attr('opacity', 0.65);
      }
    });
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', iH).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);
    g.append('line').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', iH).attr('stroke', '#333').attr('stroke-width', 1);

  } else if (type === 'heatmap') {
    const g = svg.append('g').attr('transform', 'translate(10,8)');
    const rows = 5, cols = 6, cW = 30, cH = 22;
    const viridis = d3.interpolateViridis;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = (r * cols + c) / (rows * cols - 1);
        g.append('rect').attr('x', c * cW).attr('y', r * cH).attr('width', cW - 1).attr('height', cH - 1).attr('fill', viridis(v));
      }
    }
    const defs = svg.append('defs');
    const grad = defs.append('linearGradient').attr('id', 'p04-good-viridis').attr('x1', '0').attr('x2', '1');
    [0, 0.25, 0.5, 0.75, 1].forEach(t => grad.append('stop').attr('offset', t).attr('stop-color', viridis(t)));
    g.append('rect').attr('x', 0).attr('y', rows * cH + 4).attr('width', cols * cW - 1).attr('height', 8).attr('fill', 'url(#p04-good-viridis)');
    g.append('text').attr('x', 0).attr('y', rows * cH + 22).attr('font-size', 7.5).attr('fill', '#666').text('低');
    g.append('text').attr('x', cols * cW - 1).attr('y', rows * cH + 22).attr('text-anchor', 'end').attr('font-size', 7.5).attr('fill', '#666').text('高');
    g.append('text').attr('x', (cols * cW) / 2).attr('y', rows * cH + 24).attr('text-anchor', 'middle').attr('font-size', 7).attr('fill', '#555').text('Viridis (感知均匀)');
  }
}

function drawBaCharts(pairIdx) {
  const pair = BA_PAIRS[pairIdx];
  drawBaBad(pair.id);
  drawBaGood(pair.id);
}

// ══════════════════════════════════════════════════════
//  粘性步骤逻辑
// ══════════════════════════════════════════════════════
let currentStep = 0;
let _stepAnimating = false;   // 模块作用域，与 currentStep 同级别
let _stepTween = null;
let _cachedBodyH = 0, _cachedLeftH = 0, _cachedBodyTop = 0, _maxTranslate = 0, _cachedPanelH = 0;
let _ticking = false;

function cacheLayout() {
  const bodyEl = document.getElementById('p04-steps-body');
  const leftEl = document.getElementById('p04-steps-left');
  if (!bodyEl || !leftEl) return;
  _cachedBodyH   = bodyEl.offsetHeight;
  _cachedLeftH   = leftEl.offsetHeight;
  // 缓存绝对位置（只计算一次，不在滚动热路径中调用）
  _cachedBodyTop = bodyEl.getBoundingClientRect().top + window.scrollY;
  _maxTranslate  = Math.max(0, _cachedBodyH - _cachedLeftH);
  _cachedPanelH  = _cachedBodyH / BEAUTY_STEPS.length;
}

function updateStepUI(idx) {
  const step = BEAUTY_STEPS[idx];
  const numEl     = document.getElementById('p04-step-num');
  const titleEl   = document.getElementById('p04-step-title');
  const descEl    = document.getElementById('p04-step-desc');
  const codeEl    = document.getElementById('p04-step-code');
  const changesEl = document.getElementById('p04-changes');

  if (numEl)    { numEl.textContent = step.num; numEl.style.color = step.color; }
  if (titleEl)  titleEl.textContent = step.title;
  if (descEl)   descEl.textContent  = step.desc;
  if (codeEl)   codeEl.textContent  = step.rCode;

  const tagColors  = { colors: '#95D5B2', theme: '#7EC8E3', layout: '#B8B8E8', details: '#F0B27A' };
  const tagLabels  = { colors: '配色', theme: '主题', layout: '布局', details: '细节' };
  if (changesEl) {
    changesEl.innerHTML = step.changes.map(c =>
      `<span class="p04-change-tag" style="color:${tagColors[c]};border-color:${tagColors[c]};">${tagLabels[c]}</span>`
    ).join('');
  }

  document.querySelectorAll('.p04-step-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === idx);
    const stepColor = BEAUTY_STEPS[idx].color;
    dot.style.background = i <= idx ? stepColor : '';
    dot.style.opacity    = i <= idx ? '1' : '0.25';
  });
}

function animateStepTransition(idx) {
  const numEl     = document.getElementById('p04-step-num');
  const titleEl   = document.getElementById('p04-step-title');
  const descEl    = document.getElementById('p04-step-desc');
  const codeEl    = document.getElementById('p04-step-code');
  const changesEl = document.getElementById('p04-changes');
  const targets   = [numEl, titleEl, changesEl, descEl, codeEl].filter(Boolean);

  if (_stepAnimating) {
    // 快速滚动时直接更新，跳过动画
    updateStepUI(idx);
    return;
  }
  _stepAnimating = true;

  _stepTween = gsap.to(targets, {
    opacity: 0, y: -10, duration: 0.18, ease: 'power2.in',
    onInterrupt() { _stepAnimating = false; _stepTween = null; },
    onComplete() {
      _stepTween = null;
      updateStepUI(idx);
      gsap.fromTo(targets,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.32, stagger: 0.05,
          ease: 'power3.out',
          onComplete() { _stepAnimating = false; },
        }
      );
    },
  });
}

function onStickyScroll() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) return;

  const leftEl = document.getElementById('p04-steps-left');
  if (!leftEl) return;

  const scrollY      = window.scrollY;
  const scrolledPast = Math.max(0, scrollY - _cachedBodyTop);
  leftEl.style.transform = `translateY(${Math.min(scrolledPast, _maxTranslate)}px)`;

  // 用视口中心判断步骤，防止边界震荡
  const midY    = scrollY + window.innerHeight * 0.5;
  const rawIdx  = Math.floor((midY - _cachedBodyTop) / (_cachedPanelH || window.innerHeight));
  const stepIdx = Math.min(BEAUTY_STEPS.length - 1, Math.max(0, rawIdx));

  if (stepIdx !== currentStep) {
    currentStep = stepIdx;
    animateStepTransition(currentStep);
  }
}

function onScroll() {
  if (_ticking) return;
  _ticking = true;
  requestAnimationFrame(() => {
    onStickyScroll();
    _ticking = false;
  });
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  // ── Hero 动画 ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('#p04-eyebrow',     { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('#p04-title',       { y: 30, opacity: 0 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('#p04-sub',         { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('#p04-tagline',     { y: 20, opacity: 0 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p04-quicknav',    { y: 20, opacity: 0 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('#p04-scroll-hint', { opacity: 0, y: 15 }, { opacity: 1,   y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // Quicknav 平滑滚动
  document.querySelectorAll('#p04-quicknav .hero-quicknav__item').forEach(btn => {
    addEvent(btn, 'click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── S1 步骤图表初始化 ──
  BEAUTY_STEPS.forEach((_, i) => drawStepChart(`p04-chart-${i}`, i));
  updateStepUI(0);

  // 缓存布局并注册 scroll
  requestAnimationFrame(() => {
    cacheLayout();
    _scrollHandler = onScroll;
    window.addEventListener('scroll', _scrollHandler, { passive: true });
    // 注意：scroll handler 已直接注册到 window，不走 addEvent，destroy 时单独清理
  });

  // resize 时重新缓存
  const onResize = () => {
    currentStep = 0;
    cacheLayout();
    const leftEl = document.getElementById('p04-steps-left');
    if (leftEl && window.innerWidth > 768) leftEl.style.transform = 'translateY(0)';
    updateStepUI(0);
  };
  addEvent(window, 'resize', onResize);

  // 步骤指示点点击跳转
  document.querySelectorAll('.p04-step-dot').forEach(dot => {
    addEvent(dot, 'click', () => {
      const idx = parseInt(dot.dataset.step, 10);
      const panel = document.getElementById(`p04-panel-${idx}`);
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // ── S2 BeforeAfter ──
  let activeBa = 0;
  drawBaCharts(0);

  document.querySelectorAll('.p04-ba-list-item').forEach(item => {
    addEvent(item, 'click', () => {
      const idx = parseInt(item.dataset.ba, 10);
      if (idx === activeBa) return;
      activeBa = idx;

      document.querySelectorAll('.p04-ba-list-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      const pair = BA_PAIRS[idx];
      const titleEl = document.getElementById('p04-ba-title');
      const descEl  = document.getElementById('p04-ba-subdesc');
      const noteEl  = document.getElementById('p04-ba-note');
      if (titleEl) titleEl.textContent = pair.name;
      if (descEl)  descEl.textContent  = pair.desc;
      if (noteEl)  noteEl.textContent  = pair.detail;

      drawBaCharts(idx);
    });
  });

  // ── S3 代码图表选择 ──
  let activeChart = 0;
  document.querySelectorAll('.p04-chart-sel-btn').forEach(btn => {
    addEvent(btn, 'click', () => {
      const idx = parseInt(btn.dataset.chart, 10);
      if (idx === activeChart) return;
      activeChart = idx;

      document.querySelectorAll('.p04-chart-sel-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      document.querySelectorAll('.p04-code-panel').forEach((p, i) => {
        p.classList.toggle('active', i === idx);
      });
    });
  });

  // ── Footer 导航 ──
  const prevBtn = document.getElementById('p04-prev-btn');
  const homeBtn = document.getElementById('p04-home-btn');
  const nextBtn = document.getElementById('p04-next-btn');
  if (prevBtn) addEvent(prevBtn, 'click', () => navigateTo('m3-p3'));
  if (homeBtn) addEvent(homeBtn, 'click', () => navigateTo('m3-p1'));
  if (nextBtn) addEvent(nextBtn, 'click', () => navigateTo('m3-p5'));

  // ── ScrollTrigger fadeIn ──
  fadeIn('#p04-s1 .p04-s1-heading', { start: 'top 85%' });
  fadeIn('#p04-s2 .p04-s2-heading', { start: 'top 85%' });
  fadeIn('#p04-s3 .p04-s3-heading', { start: 'top 85%' });
  fadeIn('.page-footer-cta .page-footer-quote', { start: 'top 85%', y: 30 });
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  killAll();

  // scroll handler
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler, { passive: true });
    _scrollHandler = null;
  }

  // 其他事件
  _eventHandlers.forEach(({ el, type, fn, opts }) => {
    if (el) el.removeEventListener(type, fn, opts);
  });
  _eventHandlers = [];

  // observers
  _observers.forEach(o => o.disconnect());
  _observers = [];

  // 重置状态
  currentStep = 0;
  _stepAnimating = false;
  if (_stepTween) { _stepTween.kill(); _stepTween = null; }
  _ticking = false;
  _cachedBodyTop = 0;
  _cachedPanelH = 0;
}
