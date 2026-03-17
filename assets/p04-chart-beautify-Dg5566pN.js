import{k as ut,g as J,f as L}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as N}from"./index--9oJ04dn.js";import{s as dt,l as T,a as vt}from"./transform-ChPGlSkf.js";import{q as U}from"./quantile-BCo-3LWc.js";import{m as bt}from"./min-D1slsF82.js";import{m as rt}from"./max-DBeXZoyG.js";import{l as mt}from"./line-DQLATXjo.js";import{c as wt}from"./catmullRom-Dm0ttBHj.js";import{r as ot}from"./rainbow-BQl-qGvD.js";import{v as kt}from"./viridis-DFAhIwmg.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";import"./colors-Cc3OSVma.js";let K=[],j=null,it=[];function w(r,n,m,c){r&&(r.addEventListener(n,m,c),K.push({el:r,type:n,fn:m,opts:c}))}function Et(){let r=42;const n=()=>(r=r*1664525+1013904223&2147483647,r/2147483647),m=()=>{const e=n(),o=n();return Math.sqrt(-2*Math.log(e+1e-10))*Math.cos(2*Math.PI*o)};return[{name:"Control",color_idx:0,x_mean:1,y_mean:.8,y_sd:.15},{name:"Treatment",color_idx:1,x_mean:2,y_mean:1.4,y_sd:.18},{name:"Vehicle",color_idx:2,x_mean:3,y_mean:1.1,y_sd:.13}].flatMap(e=>Array.from({length:30},()=>({group:e.name,color_idx:e.color_idx,x:e.x_mean+m()*.12,y:Math.max(.2,e.y_mean+m()*e.y_sd)})))}const M=Et(),_t=["#F8766D","#00BFC4","#7CAE00"],u=["#E69F00","#56B4E9","#009E73"],k=[{num:"01",title:"默认输出",color:"#6e6e73",desc:"ggplot2 灰色主题，默认配色，轴标签偏小，图例占据空间。这是一切美化的起点——先确保数据展示逻辑正确，再谈美化。",rCode:`ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2) +
  labs(title = "细胞活性对比", x = "实验组", y = "OD450")`,changes:[]},{num:"02",title:"配色优化",color:"#95D5B2",desc:"替换为 Okabe-Ito 色盲安全配色方案，确保所有读者（包括红绿色盲）都能区分不同分组。",rCode:`# Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00","#56B4E9","#009E73")

ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2) +
  scale_color_manual(values = okabe_ito) +
  labs(title = "细胞活性对比", x = "实验组", y = "OD450")`,changes:["colors"]},{num:"03",title:"字体调整",color:"#7EC8E3",desc:"切换到简洁的 theme_classic()，基础字号提升到 10pt（期刊最小要求），坐标轴标题加粗，标题居中对齐。",rCode:`ggplot(data, aes(x = group, y = value, color = species)) +
  geom_point(size = 2.5) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(
    plot.title   = element_text(face = "bold", hjust = 0.5, size = 11),
    axis.title   = element_text(face = "bold"),
    axis.text    = element_text(color = "black", size = 9)
  )`,changes:["colors","theme"]},{num:"04",title:"布局重构",color:"#B8B8E8",desc:"图例移入图表内部（右上角），删除次网格线，增加点的透明度展示数据密度，扩大点的大小提升可读性。",rCode:`ggplot(data, aes(x = group, y = value, color = species)) +
  geom_jitter(width = 0.15, size = 3, alpha = 0.7) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  theme(
    legend.position      = c(0.85, 0.85),  # 图例移入图表
    legend.background    = element_rect(fill = "white", color = "grey90"),
    panel.grid.major.y   = element_line(color = "grey92"),
    panel.grid.minor     = element_blank()
  )`,changes:["colors","theme","layout"]},{num:"05",title:"细节打磨",color:"#F0B27A",desc:"添加统计显著性标注（*/**），增加箱线图背景展示分布，精调图表边距，最终导出为 300dpi PNG。",rCode:`library(ggpubr)

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
  labs(title = "细胞活性对比分析", subtitle = "± SEM, n=30/group")`,changes:["colors","theme","layout","details"]}],$=[{id:"scatter",name:"散点图",desc:"彩虹配色 vs 色盲友好配色",detail:"彩虹色在灰度打印时失去区分度，且对色觉障碍读者不友好。Okabe-Ito 色板专为科学图表设计，单色打印仍可区分。"},{id:"bar",name:"柱状图",desc:"默认灰色主题 vs 简洁白色主题",detail:"默认灰色背景引入不必要视觉噪声，theme_classic() 去除背景和多余网格，让数据本身成为焦点。"},{id:"line",name:"折线图",desc:"密集网格 vs 极简网格",detail:"过密的网格线分散注意力。仅保留主要横向网格线，配合细线宽（0.5pt），引导视线跟随数据趋势。"},{id:"boxplot",name:"箱线图",desc:"纯箱线 vs 叠加数据点",detail:"箱线图隐藏了原始数据分布。叠加 jitter 点后，读者可同时看到汇总统计和原始数据密度。"},{id:"heatmap",name:"热力图",desc:"彩虹色阶 vs 单色渐变",detail:"彩虹色阶不是感知均匀的（perceived uniformity），高值和低值视觉权重不一。viridis 等感知均匀色阶确保颜色变化与数值变化成线性对应。"}],st=[{id:"scatter",name:"散点图",scene:"展示两个连续变量的相关性，识别数据分群",rCode:`library(ggplot2)

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
  )`,pyCode:`import seaborn as sns
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
plt.savefig("scatter.pdf", bbox_inches="tight")`,diff:"ggplot2 用 geom_smooth() 自动添加回归线；seaborn 需分开调用 regplot()。两者均支持置信区间显示。"},{id:"bar",name:"柱状图",scene:"比较多组均值，展示误差范围（SE 或 SD）",rCode:`library(ggplot2)
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
       x = "实验组", y = "OD450 (均值 ± SE)")`,pyCode:`import pandas as pd
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
plt.tight_layout()`,diff:"R 的 geom_col + geom_errorbar 分层清晰；Python 需手动计算 SE 并单独调用 errorbar()。均值±SE 是期刊最常见要求。"},{id:"boxplot",name:"箱线图",scene:"展示数据分布，对比多组差异，配合显著性检验",rCode:`library(ggplot2)
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
       caption = "Wilcoxon 秩和检验；ns: p>0.05, *: p<0.05")`,pyCode:`import seaborn as sns
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
plt.tight_layout()`,diff:"ggpubr 的 stat_compare_means() 一行实现显著性标注；Python 需手动用 scipy 计算 p 值并绘制连线。R 方案更简洁，Python 方案更灵活。"}];function Vt(){return`
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
  position: relative;
  padding: var(--space-2xl) var(--space-lg);
  box-sizing: border-box; display: flex; flex-direction: column; justify-content: center;
}
.p04-steps-left::before {
  content: '';
  position: absolute; left: 0; top: var(--space-2xl); bottom: var(--space-2xl);
  width: 3px; border-radius: 0 2px 2px 0;
  background: var(--step-accent, #6e6e73);
  transition: background 0.5s ease;
}
.p04-steps-right { flex: 1; min-width: 0; }
.p04-step-panel { height: 100vh; display: flex; align-items: center; justify-content: center; padding: var(--space-lg); }

.p04-step-num { font-family: var(--font-display); font-size: clamp(4rem,8vw,7rem); font-weight: 700; line-height: 1; margin-bottom: var(--space-sm); transition: color 0.5s ease; }
.p04-step-title { font-family: var(--font-heading); font-size: clamp(1.4rem,2.5vw,2rem); font-weight: 700; color: var(--text-on-light); margin-bottom: var(--space-md); }
.p04-step-desc { font-size: var(--text-body); color: var(--text-on-light-2); line-height: 1.8; max-width: 380px; margin-bottom: var(--space-md); }
.p04-step-code-wrap { background: var(--bg-dark); border-radius: var(--radius-md); padding: var(--space-md); overflow: hidden; }
.p04-step-code-wrap pre { margin: 0; font-family: var(--font-code); font-size: 12px; line-height: 1.7; color: #a8dadc; white-space: pre-wrap; word-wrap: break-word; }
.p04-step-code-label {
  font-size: 10px; font-family: var(--font-code); letter-spacing: 0.08em;
  text-transform: uppercase; margin-bottom: 6px;
  opacity: 0.6; transition: color 0.4s ease;
}

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
          <div class="p04-step-code-label" id="p04-step-code-label">R 代码 — Step 01</div>
          <pre id="p04-step-code"></pre>
        </div>
        <div class="p04-step-indicator" id="p04-step-indicator">
          ${k.map((r,n)=>`<div class="p04-step-dot${n===0?" active":""}" data-step="${n}"></div>`).join("")}
        </div>
      </div>
      <!-- 右侧：每步 D3 图表 -->
      <div class="p04-steps-right">
        ${k.map((r,n)=>`
        <div class="p04-step-panel" id="p04-panel-${n}">
          <div class="p04-chart-card">
            <div class="p04-chart-step-label">Step ${r.num} — ${r.title}</div>
            <div id="p04-chart-${n}" style="width:100%;"></div>
          </div>
        </div>
        `).join("")}
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
        ${$.map((r,n)=>`
        <div class="p04-ba-list-item${n===0?" active":""}" data-ba="${n}">
          <span class="p04-ba-list-icon">${["●","▮","↗","⊡","▦"][n]}</span>
          <div>
            <div style="font-weight:600;font-size:13px;">${r.name}</div>
            <div style="font-size:11px;margin-top:2px;opacity:0.7;">${r.desc}</div>
          </div>
        </div>
        `).join("")}
      </div>
      <!-- 右侧预览 -->
      <div class="p04-ba-preview" id="p04-ba-preview">
        <div class="p04-ba-desc">
          <h3 id="p04-ba-title">${$[0].name}</h3>
          <p id="p04-ba-subdesc">${$[0].desc}</p>
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
        <p class="p04-ba-note" id="p04-ba-note">${$[0].detail}</p>
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
      ${st.map((r,n)=>`<button class="p04-chart-sel-btn${n===0?" active":""}" data-chart="${n}">${r.name}</button>`).join("")}
    </div>
    ${st.map((r,n)=>`
    <div class="p04-code-panel${n===0?" active":""}" id="p04-code-panel-${n}">
      <div class="p04-chart-info">
        <h3>${r.name}</h3>
        <p>适用场景：${r.scene}</p>
      </div>
      <div class="p04-code-grid">
        <div class="p04-code-col">
          <h4 class="r-label">R — ggplot2</h4>
          <pre class="p04-code-block">${nt(r.rCode)}</pre>
        </div>
        <div class="p04-code-col">
          <h4 class="py-label">Python — seaborn / matplotlib</h4>
          <pre class="p04-code-block">${nt(r.pyCode)}</pre>
        </div>
      </div>
      <div class="p04-code-diff"><strong>关键差异：</strong>${r.diff}</div>
    </div>
    `).join("")}
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
  `}function nt(r){return r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function zt(r,n){const m=document.getElementById(r);if(!m)return;m.innerHTML="";const e=k[n].changes,o=e.includes("colors"),a=e.includes("theme"),i=e.includes("layout"),t=e.includes("details"),s=o?u:_t,l=a?"#ffffff":"#ebebeb",p=a?"#333":"#999",d=a?"#f0f0f0":"white",g=i?5:o?4.5:4,A=i?.7:.85,V=360,Z=240,C=a?{top:30,right:80,bottom:45,left:50}:{top:20,right:65,bottom:30,left:38},E=V-C.left-C.right,b=Z-C.top-C.bottom,tt=dt(m).append("svg").attr("viewBox",`0 0 ${V} ${Z}`).attr("preserveAspectRatio","xMidYMid meet").style("background",l),h=tt.append("g").attr("transform",`translate(${C.left},${C.top})`),q=T().domain([.5,3.5]).range([0,E]),x=T().domain([0,2.2]).range([b,0]);if(h.append("rect").attr("width",E).attr("height",b).attr("fill",l),[.5,1,1.5,2].forEach(f=>{h.append("line").attr("x1",0).attr("x2",E).attr("y1",x(f)).attr("y2",x(f)).attr("stroke",d).attr("stroke-width",a?.8:1)}),t){["Control","Treatment","Vehicle"].forEach((y,_)=>{const z=M.filter(G=>G.group===y).map(G=>G.y).sort(vt),S=U(z,.25),B=U(z,.75),et=U(z,.5),at=B-S,xt=Math.max(bt(z),S-1.5*at),yt=Math.min(rt(z),B+1.5*at),H=q(_+1),D=26;h.append("line").attr("x1",H).attr("x2",H).attr("y1",x(xt)).attr("y2",x(yt)).attr("stroke","#bbb").attr("stroke-width",1),h.append("rect").attr("x",H-D/2).attr("y",x(B)).attr("width",D).attr("height",x(S)-x(B)).attr("fill","rgba(200,200,200,0.3)").attr("stroke","#ccc").attr("stroke-width",1),h.append("line").attr("x1",H-D/2).attr("x2",H+D/2).attr("y1",x(et)).attr("y2",x(et)).attr("stroke","#888").attr("stroke-width",2)});const f=rt(M,y=>y.y),v=x(f+.12);h.append("line").attr("x1",q(1)).attr("x2",q(2)).attr("y1",v).attr("y2",v).attr("stroke","#555").attr("stroke-width",.8),h.append("text").attr("x",q(1.5)).attr("y",v-3).attr("text-anchor","middle").attr("font-size",11).attr("fill","#555").text("*")}const ft=i?.09:0;M.forEach((f,v)=>{const y=i?(v%19-9)/9*ft:0;h.append("circle").attr("cx",q(f.color_idx+1+y)).attr("cy",x(f.y)).attr("r",g).attr("fill",s[f.color_idx]).attr("opacity",A)}),h.append("line").attr("x1",0).attr("x2",E).attr("y1",b).attr("y2",b).attr("stroke",p).attr("stroke-width",a?1.2:.6),h.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",b).attr("stroke",p).attr("stroke-width",a?1.2:.6);const Y=["Control","Treatment","Vehicle"];if(Y.forEach((f,v)=>{h.append("text").attr("x",q(v+1)).attr("y",b+(a?18:13)).attr("text-anchor","middle").attr("font-size",a?9:7.5).attr("font-weight","normal").attr("fill",p).text(f)}),[0,.5,1,1.5,2].forEach(f=>{h.append("text").attr("x",-5).attr("y",x(f)+3).attr("text-anchor","end").attr("font-size",a?8:7).attr("fill",p).text(f.toFixed(1))}),a&&(h.append("text").attr("x",E/2).attr("y",b+38).attr("text-anchor","middle").attr("font-size",9.5).attr("font-weight","bold").attr("fill","#333").text("实验组"),h.append("text").attr("transform","rotate(-90)").attr("x",-b/2).attr("y",-36).attr("text-anchor","middle").attr("font-size",9.5).attr("font-weight","bold").attr("fill","#333").text("OD450"),tt.append("text").attr("x",V/2).attr("y",15).attr("text-anchor","middle").attr("font-size",10.5).attr("font-weight","bold").attr("fill","#1d1d1f").text("细胞活性对比")),i){const y=E-80-4,_=4;h.append("rect").attr("x",y).attr("y",_).attr("width",80).attr("height",60).attr("fill","white").attr("stroke","#e0e0e0").attr("stroke-width",.8).attr("rx",3),Y.forEach((z,S)=>{const B=_+14+S*16;h.append("circle").attr("cx",y+10).attr("cy",B).attr("r",4).attr("fill",s[S]).attr("opacity",.75),h.append("text").attr("x",y+20).attr("y",B+4).attr("font-size",8).attr("fill","#333").text(z)})}else{const f=E+(a?8:5);Y.forEach((v,y)=>{const _=20+y*18;h.append("circle").attr("cx",f+5).attr("cy",_).attr("r",4).attr("fill",s[y]).attr("opacity",.85),h.append("text").attr("x",f+13).attr("y",_+4).attr("font-size",7.5).attr("fill",p).text(v)})}}function ht(r,n,m){const c=document.getElementById(r);return c?(c.innerHTML="",dt(c).append("svg").attr("viewBox",`0 0 ${n} ${m}`).attr("preserveAspectRatio","xMidYMid meet")):null}function Bt(r){const c=ht("p04-ba-bad",240,170);if(c){if(r==="scatter"){const e=c.append("g").attr("transform","translate(28,10)"),o=180,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","#ebebeb");for(let l=0;l<=8;l++)e.append("line").attr("x1",l*o/8).attr("x2",l*o/8).attr("y1",0).attr("y2",a).attr("stroke","white").attr("stroke-width",.5),e.append("line").attr("x1",0).attr("x2",o).attr("y1",l*a/8).attr("y2",l*a/8).attr("stroke","white").attr("stroke-width",.5);const i=ot,t=T().domain([.5,3.5]).range([0,o]),s=T().domain([0,2.2]).range([a,0]);M.forEach(l=>{e.append("circle").attr("cx",t(l.color_idx+1)).attr("cy",s(l.y)).attr("r",3).attr("fill",i(l.color_idx/2.5)).attr("opacity",.8)}),e.append("text").attr("x",o/2).attr("y",a+12).attr("text-anchor","middle").attr("font-size",7).attr("fill","#999").text("Group"),e.append("text").attr("transform","rotate(-90)").attr("x",-a/2).attr("y",-16).attr("text-anchor","middle").attr("font-size",7).attr("fill","#999").text("Value"),["Ctrl","Trt","Veh"].forEach((l,p)=>{const d=15+p*18;e.append("circle").attr("cx",o+8).attr("cy",d).attr("r",3.5).attr("fill",i(p/2.5)),e.append("text").attr("x",o+15).attr("y",d+3).attr("font-size",7).attr("fill","#777").text(l)})}else if(r==="bar"){const e=c.append("g").attr("transform","translate(28,10)"),o=170,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","#ebebeb"),[.25,.5,.75].forEach(t=>{e.append("line").attr("x1",0).attr("x2",o).attr("y1",a*(1-t)).attr("y2",a*(1-t)).attr("stroke","white").attr("stroke-width",.8)});const i=[{x:15,h:55,c:"#F8766D",l:"Control"},{x:65,h:90,c:"#00BFC4",l:"Treatment"},{x:115,h:70,c:"#7CAE00",l:"Vehicle"}];i.forEach(t=>e.append("rect").attr("x",t.x).attr("y",a-t.h).attr("width",40).attr("height",t.h).attr("fill",t.c)),i.forEach(t=>e.append("text").attr("x",t.x+20).attr("y",a+11).attr("text-anchor","middle").attr("font-size",6.5).attr("fill","#888").text(t.l)),i.forEach((t,s)=>{e.append("rect").attr("x",o+4).attr("y",10+s*16).attr("width",8).attr("height",8).attr("fill",t.c),e.append("text").attr("x",o+14).attr("y",18+s*16).attr("font-size",7).attr("fill","#777").text(t.l)})}else if(r==="line"){const e=c.append("g").attr("transform","translate(22,8)"),o=190,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","#ebebeb");for(let l=0;l<=12;l++)e.append("line").attr("x1",l*o/12).attr("x2",l*o/12).attr("y1",0).attr("y2",a).attr("stroke","white").attr("stroke-width",.4),e.append("line").attr("x1",0).attr("x2",o).attr("y1",l*a/12).attr("y2",l*a/12).attr("stroke","white").attr("stroke-width",.4);const i=[0,38,76,114,152,190],t=[100,60,82,44,70,55],s=mt().x((l,p)=>i[p]).y(l=>l);e.append("path").datum(t).attr("d",s).attr("stroke","#F8766D").attr("stroke-width",.8).attr("fill","none")}else if(r==="boxplot"){const e=c.append("g").attr("transform","translate(22,8)");e.append("rect").attr("width",185).attr("height",120).attr("fill","white").attr("stroke","#ddd"),[{x:40,q1:70,med:55,q3:35,lo:90,hi:25,c:"#F8766D"},{x:95,q1:40,med:28,q3:10,lo:55,hi:5,c:"#00BFC4"},{x:150,q1:55,med:42,q3:25,lo:70,hi:18,c:"#7CAE00"}].forEach(t=>{e.append("line").attr("x1",t.x).attr("x2",t.x).attr("y1",t.lo).attr("y2",t.hi).attr("stroke",t.c).attr("stroke-width",1),e.append("rect").attr("x",t.x-16).attr("y",t.q3).attr("width",32).attr("height",t.q1-t.q3).attr("fill",t.c).attr("opacity",.6).attr("stroke",t.c),e.append("line").attr("x1",t.x-16).attr("x2",t.x+16).attr("y1",t.med).attr("y2",t.med).attr("stroke","white").attr("stroke-width",2);for(let s=0;s<3;s++)e.append("circle").attr("cx",t.x+(s-1)*5).attr("cy",t.lo-4-s*5).attr("r",2).attr("fill",t.c).attr("opacity",.5)})}else if(r==="heatmap"){const e=c.append("g").attr("transform","translate(10,8)"),o=5,a=6,i=30,t=22,s=ot;for(let d=0;d<o;d++)for(let g=0;g<a;g++){const A=(d*a+g)/(o*a-1);e.append("rect").attr("x",g*i).attr("y",d*t).attr("width",i-1).attr("height",t-1).attr("fill",s(A))}const p=c.append("defs").append("linearGradient").attr("id","p04-bad-rainbow").attr("x1","0").attr("x2","1");[0,.17,.33,.5,.67,.83,1].forEach(d=>p.append("stop").attr("offset",d).attr("stop-color",s(d))),e.append("rect").attr("x",0).attr("y",o*t+4).attr("width",a*i-1).attr("height",8).attr("fill","url(#p04-bad-rainbow)"),e.append("text").attr("x",a*i/2).attr("y",o*t+24).attr("text-anchor","middle").attr("font-size",7).attr("fill","#999").text("Rainbow (感知非均匀)")}}}function Ct(r){const c=ht("p04-ba-good",240,170);if(c){if(r==="scatter"){const e=c.append("g").attr("transform","translate(28,10)"),o=180,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","white"),[.5,1,1.5,2].forEach(p=>{const d=a-p/2.5*a;e.append("line").attr("x1",0).attr("x2",o).attr("y1",d).attr("y2",d).attr("stroke","#f0f0f0").attr("stroke-width",.8)});const i=T().domain([.5,3.5]).range([0,o]),t=T().domain([0,2.2]).range([a,0]);M.forEach((p,d)=>{const g=(d%15-7)/70;e.append("circle").attr("cx",i(p.color_idx+1+g)).attr("cy",t(p.y)).attr("r",3.5).attr("fill",u[p.color_idx]).attr("opacity",.75)}),e.append("line").attr("x1",0).attr("x2",o).attr("y1",a).attr("y2",a).attr("stroke","#333").attr("stroke-width",1),e.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",a).attr("stroke","#333").attr("stroke-width",1),e.append("text").attr("x",o/2).attr("y",a+13).attr("text-anchor","middle").attr("font-size",8).attr("font-weight","bold").attr("fill","#333").text("实验组");const s=o-78,l=4;e.append("rect").attr("x",s).attr("y",l).attr("width",76).attr("height",56).attr("fill","white").attr("stroke","#e8e8e8").attr("rx",3),["Control","Treat.","Vehicle"].forEach((p,d)=>{e.append("circle").attr("cx",s+9).attr("cy",l+12+d*15).attr("r",3.5).attr("fill",u[d]).attr("opacity",.75),e.append("text").attr("x",s+18).attr("y",l+16+d*15).attr("font-size",8).attr("fill","#333").text(p)})}else if(r==="bar"){const e=c.append("g").attr("transform","translate(28,12)"),o=172,a=118;e.append("rect").attr("width",o).attr("height",a).attr("fill","white"),[.25,.5,.75].forEach(t=>{e.append("line").attr("x1",0).attr("x2",o).attr("y1",a*(1-t)).attr("y2",a*(1-t)).attr("stroke","#f0f0f0").attr("stroke-width",.8)});const i=[{x:15,h:55,c:u[0]},{x:65,h:90,c:u[1]},{x:115,h:70,c:u[2]}];i.forEach(t=>{e.append("rect").attr("x",t.x).attr("y",a-t.h).attr("width",40).attr("height",t.h).attr("fill",t.c).attr("rx",1);const s=t.x+20;e.append("line").attr("x1",s).attr("x2",s).attr("y1",a-t.h-7).attr("y2",a-t.h+7).attr("stroke","#555").attr("stroke-width",1.2),e.append("line").attr("x1",s-6).attr("x2",s+6).attr("y1",a-t.h-7).attr("y2",a-t.h-7).attr("stroke","#555").attr("stroke-width",.8),e.append("line").attr("x1",s-6).attr("x2",s+6).attr("y1",a-t.h+7).attr("y2",a-t.h+7).attr("stroke","#555").attr("stroke-width",.8)}),e.append("line").attr("x1",0).attr("x2",o).attr("y1",a).attr("y2",a).attr("stroke","#333").attr("stroke-width",1.2),e.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",a).attr("stroke","#333").attr("stroke-width",1.2),["Control","Treatment","Vehicle"].forEach((t,s)=>{e.append("text").attr("x",i[s].x+20).attr("y",a+12).attr("text-anchor","middle").attr("font-size",7.5).attr("fill","#333").text(t)})}else if(r==="line"){const e=c.append("g").attr("transform","translate(22,8)"),o=190,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","white"),[40,80].forEach(l=>{e.append("line").attr("x1",0).attr("x2",o).attr("y1",l).attr("y2",l).attr("stroke","#f0f0f0").attr("stroke-width",.8)});const i=[0,38,76,114,152,190],t=[100,60,82,44,70,55],s=mt().x((l,p)=>i[p]).y(l=>l).curve(wt);e.append("path").datum(t).attr("d",s).attr("stroke",u[1]).attr("stroke-width",2).attr("fill","none"),i.forEach((l,p)=>{e.append("circle").attr("cx",l).attr("cy",t[p]).attr("r",4).attr("fill","white").attr("stroke",u[1]).attr("stroke-width",2)}),e.append("line").attr("x1",0).attr("x2",o).attr("y1",a).attr("y2",a).attr("stroke","#333").attr("stroke-width",1),e.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",a).attr("stroke","#333").attr("stroke-width",1)}else if(r==="boxplot"){const e=c.append("g").attr("transform","translate(22,8)"),o=185,a=120;e.append("rect").attr("width",o).attr("height",a).attr("fill","white"),[40,80].forEach(t=>{e.append("line").attr("x1",0).attr("x2",o).attr("y1",t).attr("y2",t).attr("stroke","#f0f0f0").attr("stroke-width",.7)}),[{x:40,q1:70,med:55,q3:35,lo:90,hi:25,c:u[0]},{x:95,q1:40,med:28,q3:10,lo:55,hi:5,c:u[1]},{x:150,q1:55,med:42,q3:25,lo:70,hi:18,c:u[2]}].forEach(t=>{e.append("line").attr("x1",t.x).attr("x2",t.x).attr("y1",t.lo).attr("y2",t.hi).attr("stroke","#ccc").attr("stroke-width",1),e.append("rect").attr("x",t.x-16).attr("y",t.q3).attr("width",32).attr("height",t.q1-t.q3).attr("fill","none").attr("stroke",t.c).attr("stroke-width",1.8),e.append("line").attr("x1",t.x-16).attr("x2",t.x+16).attr("y1",t.med).attr("y2",t.med).attr("stroke",t.c).attr("stroke-width",2.5);for(let s=0;s<10;s++){const l=t.x+((s*7+3)%17-8),p=t.q3+s*13%(t.q1-t.q3);e.append("circle").attr("cx",l).attr("cy",p).attr("r",2.5).attr("fill",t.c).attr("opacity",.65)}}),e.append("line").attr("x1",0).attr("x2",o).attr("y1",a).attr("y2",a).attr("stroke","#333").attr("stroke-width",1),e.append("line").attr("x1",0).attr("x2",0).attr("y1",0).attr("y2",a).attr("stroke","#333").attr("stroke-width",1)}else if(r==="heatmap"){const e=c.append("g").attr("transform","translate(10,8)"),o=5,a=6,i=30,t=22,s=kt;for(let d=0;d<o;d++)for(let g=0;g<a;g++){const A=(d*a+g)/(o*a-1);e.append("rect").attr("x",g*i).attr("y",d*t).attr("width",i-1).attr("height",t-1).attr("fill",s(A))}const p=c.append("defs").append("linearGradient").attr("id","p04-good-viridis").attr("x1","0").attr("x2","1");[0,.25,.5,.75,1].forEach(d=>p.append("stop").attr("offset",d).attr("stop-color",s(d))),e.append("rect").attr("x",0).attr("y",o*t+4).attr("width",a*i-1).attr("height",8).attr("fill","url(#p04-good-viridis)"),e.append("text").attr("x",0).attr("y",o*t+22).attr("font-size",7.5).attr("fill","#666").text("低"),e.append("text").attr("x",a*i-1).attr("y",o*t+22).attr("text-anchor","end").attr("font-size",7.5).attr("fill","#666").text("高"),e.append("text").attr("x",a*i/2).attr("y",o*t+24).attr("text-anchor","middle").attr("font-size",7).attr("fill","#555").text("Viridis (感知均匀)")}}}function lt(r){const n=$[r];Bt(n.id),Ct(n.id)}let W=0,F=!1,I=null,X=0,pt=0,O=0,gt=0,Q=0,R=!1;function ct(){const r=document.getElementById("p04-steps-body"),n=document.getElementById("p04-steps-left");!r||!n||(X=r.offsetHeight,pt=n.offsetHeight,O=r.getBoundingClientRect().top+window.scrollY,gt=Math.max(0,X-pt),Q=X/k.length)}function P(r){const n=k[r],m=document.getElementById("p04-step-num"),c=document.getElementById("p04-step-title"),e=document.getElementById("p04-step-desc"),o=document.getElementById("p04-step-code"),a=document.getElementById("p04-changes");m&&(m.textContent=n.num,m.style.color=n.color);const i=document.getElementById("p04-steps-left");i&&i.style.setProperty("--step-accent",n.color);const t=document.getElementById("p04-step-code-label");t&&(t.textContent=`R 代码 — Step ${n.num}`,t.style.color=n.color),c&&(c.textContent=n.title),e&&(e.textContent=n.desc),o&&(o.textContent=n.rCode);const s={colors:"#95D5B2",theme:"#7EC8E3",layout:"#B8B8E8",details:"#F0B27A"},l={colors:"配色",theme:"主题",layout:"布局",details:"细节"};a&&(a.innerHTML=n.changes.map(p=>`<span class="p04-change-tag" style="color:${s[p]};border-color:${s[p]};">${l[p]}</span>`).join("")),document.querySelectorAll(".p04-step-dot").forEach((p,d)=>{p.classList.toggle("active",d===r);const g=k[r].color;p.style.background=d<=r?g:"",p.style.opacity=d<=r?"1":"0.25"})}function qt(r){const n=document.getElementById("p04-step-num"),m=document.getElementById("p04-step-title"),c=document.getElementById("p04-step-desc"),e=document.getElementById("p04-step-code"),o=document.getElementById("p04-changes"),a=[n,m,o,c,e].filter(Boolean);if(F){P(r);return}F=!0,I=J.to(a,{opacity:0,y:-10,duration:.18,ease:"power2.in",onInterrupt(){F=!1,I=null},onComplete(){I=null,P(r),J.fromTo(a,{opacity:0,y:12},{opacity:1,y:0,duration:.32,stagger:.05,ease:"power3.out",onComplete(){F=!1}})}})}function St(){if(window.innerWidth<=768)return;const n=document.getElementById("p04-steps-left");if(!n)return;const m=window.scrollY,c=Math.max(0,m-O);n.style.transform=`translateY(${Math.min(c,gt)}px)`;const e=m+window.innerHeight*.5,o=Math.floor((e-O)/(Q||window.innerHeight)),a=Math.min(k.length-1,Math.max(0,o));a!==W&&(W=a,qt(W))}function $t(){R||(R=!0,requestAnimationFrame(()=>{St(),R=!1}))}function Yt(){const r=J.timeline({delay:.2});r.fromTo("#p04-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),r.fromTo("#p04-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),r.fromTo("#p04-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),r.fromTo("#p04-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),r.fromTo("#p04-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),r.fromTo("#p04-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p04-quicknav .hero-quicknav__item").forEach(i=>{w(i,"click",()=>{const t=document.querySelector(i.dataset.target);t&&t.scrollIntoView({behavior:"smooth"})})}),k.forEach((i,t)=>zt(`p04-chart-${t}`,t)),P(0),requestAnimationFrame(()=>{ct(),j=$t,window.addEventListener("scroll",j,{passive:!0})}),w(window,"resize",()=>{W=0,ct();const i=document.getElementById("p04-steps-left");i&&window.innerWidth>768&&(i.style.transform="translateY(0)"),P(0)}),document.querySelectorAll(".p04-step-dot").forEach(i=>{w(i,"click",()=>{const t=parseInt(i.dataset.step,10),s=document.getElementById(`p04-panel-${t}`);s&&s.scrollIntoView({behavior:"smooth",block:"center"})})});let m=0;lt(0),document.querySelectorAll(".p04-ba-list-item").forEach(i=>{w(i,"click",()=>{const t=parseInt(i.dataset.ba,10);if(t===m)return;m=t,document.querySelectorAll(".p04-ba-list-item").forEach(g=>g.classList.remove("active")),i.classList.add("active");const s=$[t],l=document.getElementById("p04-ba-title"),p=document.getElementById("p04-ba-subdesc"),d=document.getElementById("p04-ba-note");l&&(l.textContent=s.name),p&&(p.textContent=s.desc),d&&(d.textContent=s.detail),lt(t)})});let c=0;document.querySelectorAll(".p04-chart-sel-btn").forEach(i=>{w(i,"click",()=>{const t=parseInt(i.dataset.chart,10);t!==c&&(c=t,document.querySelectorAll(".p04-chart-sel-btn").forEach(s=>s.classList.remove("active")),i.classList.add("active"),document.querySelectorAll(".p04-code-panel").forEach((s,l)=>{s.classList.toggle("active",l===t)}))})});const e=document.getElementById("p04-prev-btn"),o=document.getElementById("p04-home-btn"),a=document.getElementById("p04-next-btn");e&&w(e,"click",()=>N("m3-p3")),o&&w(o,"click",()=>N("m3-p1")),a&&w(a,"click",()=>N("m3-p5")),L("#p04-s1 .p04-s1-heading",{start:"top 85%"}),L("#p04-s2 .p04-s2-heading",{start:"top 85%"}),L("#p04-s3 .p04-s3-heading",{start:"top 85%"}),L(".page-footer-cta .page-footer-quote",{start:"top 85%",y:30})}function Gt(){ut(),j&&(window.removeEventListener("scroll",j,{passive:!0}),j=null),K.forEach(({el:r,type:n,fn:m,opts:c})=>{r&&r.removeEventListener(n,m,c)}),K=[],it.forEach(r=>r.disconnect()),it=[],W=0,F=!1,I&&(I.kill(),I=null),R=!1,O=0,Q=0}export{Gt as destroy,Yt as init,Vt as render};
