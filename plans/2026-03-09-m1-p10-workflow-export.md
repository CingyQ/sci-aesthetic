# m1-p10 科研绘图工作流与导出 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现 m1-p10「科研绘图工作流与导出」页面，包含 6 步粘性滚动工作流时间线、格式原理动画、DPI 对比器、分辨率计算器和期刊速查 5 个核心交互。

**Architecture:** 单文件页面（`p10-workflow-export.js`），导出 `render()`/`init()`/`destroy()` 三个函数。粘性滚动使用 JS `transform:translateY` 模拟（CSS sticky 在本项目全局失效）。D3 用于格式对比动画 SVG，原生 DOM 用于计算器和速查。GSAP ScrollTrigger 处理入场动画。

**Tech Stack:** D3.js (CDN), GSAP + ScrollTrigger (CDN), CodeEditor.js, ScrollAnimations.js, CopyButton, 原生 Canvas/DOM。

---

## 通用规范（每步必须遵守）

1. 开始每步前先回顾 `CLAUDE.md`、`design-spec.md` 规范（已在本文档中提炼关键要点）
2. 明暗交替顺序：Hero（深色）→ 工作流时间线（浅色）→ 格式对比（深色）→ DPI对比器（浅色）→ 分辨率计算器（深色）→ 期刊速查（浅色）→ Footer CTA（深色）
3. Hero 结构固定：eyebrow → title → sub → tagline → quicknav → scroll-hint
4. 每个 section 有 `id` 供 quicknav 跳转，移动端设置 `scroll-margin-top: 56px`
5. 所有 flex 子项设 `min-width: 0` 防溢出；代码块用 `white-space: pre-wrap`
6. destroy() 必须清理：ScrollTrigger.getAll().forEach(t=>t.kill()) + 所有事件监听器
7. `frontend-design skill` 要在视觉设计时参考（全屏叙事、超大排版、明暗交替、无卡片网格）

---

## Task 1: HTML 骨架 + Hero Section

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js`

### Step 1: 写 render() 基础骨架（Hero + section 占位）

用以下代码**完整替换**现有 p10 文件内容。包含 Hero 完整结构和 5 个 section 的占位，以及所有 CSS 样式。

```js
// p10-workflow-export.js — 科研绘图工作流与导出
// 6步粘性工作流 + 格式对比动画 + DPI对比器 + 分辨率计算器 + 期刊速查

import { fadeIn, killAll } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  数据：6步工作流
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WORKFLOW_STEPS = [
  {
    num: '01', title: '数据整理', en: 'Data Cleaning',
    icon: '🗂',
    desc: '在绘图前整理数据，确保格式正确、缺失值处理妥当，是出版级图表的基础。',
    code: `# R 数据整理示例
library(tidyverse)

data <- read_csv("experiment.csv") |>
  filter(!is.na(value)) |>        # 移除缺失值
  mutate(
    group = factor(group),         # 分组变量因子化
    value = log1p(value)           # 对数变换改善分布
  ) |>
  group_by(group) |>
  summarise(
    mean = mean(value),
    se   = sd(value) / sqrt(n()),  # 标准误用于误差线
    .groups = "drop"
  )`,
    trap: '⚠️ 陷阱：未处理异常值就直接绘图，导致坐标轴范围失真，关键数据被压缩到角落。',
    color: '#7EC8E3'
  },
  {
    num: '02', title: '选择图表', en: 'Chart Selection',
    icon: '📊',
    desc: '根据数据类型和研究问题选择最合适的图表类型，避免用错图表误导读者。',
    code: `# 图表类型选择参考
# 比较多组均值 → 箱线图 or 小提琴图
ggplot(data, aes(x=group, y=value, fill=group)) +
  geom_boxplot(width=0.5, outlier.shape=21) +
  geom_jitter(width=0.1, alpha=0.4, size=1.5)

# 展示趋势变化 → 折线图（加置信带）
ggplot(data, aes(x=time, y=value, color=group)) +
  geom_line(linewidth=0.8) +
  geom_ribbon(aes(ymin=lower, ymax=upper, fill=group),
              alpha=0.15, color=NA)

# 展示相关性 → 散点图（加回归线）
ggplot(data, aes(x=x, y=y)) +
  geom_point(alpha=0.6) +
  geom_smooth(method="lm", se=TRUE)`,
    trap: '⚠️ 陷阱：用折线图连接非时序的分类数据，暗示了不存在的趋势关系。',
    color: '#95D5B2'
  },
  {
    num: '03', title: '生成初稿', en: 'First Draft',
    icon: '✏️',
    desc: '先快速生成功能完整的初稿，不追求美观，验证数据和图表类型是否正确。',
    code: `# 快速初稿：使用 ggplot2 默认设置
library(ggplot2)

p <- ggplot(data, aes(x=group, y=value, fill=group)) +
  geom_boxplot() +
  labs(
    title = "各处理组细胞活性对比",
    x = "实验组",
    y = "细胞活性 (OD450)",
    caption = "n=30 per group, data: experiment.csv"
  )

# 先保存低分辨率草稿查看效果
ggsave("draft.png", p, width=8, height=5, dpi=72)`,
    trap: '⚠️ 陷阱：初稿阶段花太多时间在配色和字体上，应先确认数据展示逻辑再精调外观。',
    color: '#B8B8E8'
  },
  {
    num: '04', title: '配色优化', en: 'Color Refinement',
    icon: '🎨',
    desc: '选择符合期刊要求、色盲友好的配色方案，确保印刷版和屏幕版效果一致。',
    code: `# 使用色盲安全的 ggsci 配色
library(ggsci)
library(RColorBrewer)

# 方案 1：ggsci Nature 期刊配色
p + scale_fill_npg()

# 方案 2：手动 Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00","#56B4E9","#009E73",
               "#F0E442","#0072B2","#D55E00","#CC79A7")
p + scale_fill_manual(values = okabe_ito)

# 方案 3：ColorBrewer 渐变（适合连续数据）
p + scale_fill_brewer(palette = "Blues", direction = -1)`,
    trap: '⚠️ 陷阱：使用彩虹色（rainbow）配色——在灰度印刷后颜色差异消失，且对色盲读者不友好。',
    color: '#F0B27A'
  },
  {
    num: '05', title: '标注与排版', en: 'Annotation & Layout',
    icon: '📐',
    desc: '添加统计标注、调整字号和布局，让图表在期刊规定的列宽下依然清晰可读。',
    code: `# 添加显著性标注 + 精调排版
library(ggpubr)

p_final <- p +
  stat_compare_means(
    comparisons = list(c("Control","Treatment")),
    method = "t.test", label = "p.signif"  # *, **, ***
  ) +
  theme_classic(base_size = 10) +          # 期刊常用 base 10pt
  theme(
    legend.position  = "none",             # 分组已在 x 轴体现
    axis.text        = element_text(size=9, color="black"),
    axis.title       = element_text(size=10, face="bold"),
    plot.title       = element_text(size=11, face="bold",
                                    hjust=0.5),
    plot.margin      = margin(5,5,5,5,"mm")
  )`,
    trap: '⚠️ 陷阱：字号用 ggplot2 默认的 11pt，但期刊要求印刷后坐标轴标签不小于 7pt，需按实际输出尺寸换算。',
    color: '#E07A7A'
  },
  {
    num: '06', title: '导出发表', en: 'Export & Publish',
    icon: '🚀',
    desc: '按期刊要求导出正确的格式、分辨率和尺寸，避免返修。',
    code: `# Nature 系列期刊导出规范
# 单栏（89mm）/ 1.5 栏（120mm）/ 双栏（183mm），300 DPI，PDF/EPS

ggsave(
  "figure1.pdf",
  plot   = p_final,
  width  = 89,          # 单栏：89mm
  height = 60,          # 高宽比约 0.67
  units  = "mm",
  dpi    = 300,         # 矢量格式 dpi 参数影响嵌入字体
  device = "pdf"
)

# 位图备份（用于预览/提交系统）
ggsave(
  "figure1.tiff",
  plot   = p_final,
  width  = 89, height = 60, units = "mm",
  dpi    = 300,
  compression = "lzw"   # TIFF LZW 无损压缩
)`,
    trap: '⚠️ 陷阱：用 ggsave 导出时忘记指定 units="mm"，默认 inches 会导致尺寸翻倍，不符合期刊规定的列宽要求。',
    color: '#7EC8E3'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  数据：格式对比
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const FORMAT_DATA = [
  {
    id: 'svg', name: 'SVG', type: 'vector',
    color: '#7EC8E3',
    best: '网页嵌入、交互图表',
    dpi: '任意分辨率（无限缩放）',
    size: '小（仅存路径描述）',
    support: '浏览器原生支持',
    desc: '可缩放矢量图形。以数学路径描述形状，无论放大多少倍都保持清晰。',
    code: `<svg viewBox="0 0 100 100">
  <!-- 矢量：数学描述形状 -->
  <circle cx="50" cy="50" r="30"
    fill="#7EC8E3"/>
  <rect x="20" y="70" width="60" height="20"
    fill="#1d1d1f"/>
</svg>`
  },
  {
    id: 'pdf', name: 'PDF', type: 'vector',
    color: '#95D5B2',
    best: '期刊投稿首选、打印',
    dpi: '任意分辨率（矢量内核）',
    size: '中（嵌入字体）',
    support: 'Nature/Science/Cell 等顶刊接受',
    desc: 'PDF 内嵌矢量路径，字体可嵌入，跨平台渲染一致，是期刊投稿的首选格式。',
    code: `# R 导出 PDF
ggsave("fig.pdf",
  plot   = p,
  width  = 89,    # mm
  height = 60,    # mm
  units  = "mm",
  dpi    = 300,   # 影响嵌入位图 DPI
  device = "pdf"
)`
  },
  {
    id: 'png', name: 'PNG', type: 'raster',
    color: '#B8B8E8',
    best: '幻灯片、网络分享',
    dpi: '300 DPI for print, 72/96 for screen',
    size: '中（无损压缩）',
    support: '所有软件和平台',
    desc: 'PNG 是最通用的位图格式，无损压缩，支持透明背景，适合屏幕显示和非顶刊投稿。',
    code: `# R 导出 PNG
ggsave("fig.png",
  plot   = p,
  width  = 89,
  height = 60,
  units  = "mm",
  dpi    = 300    # 印刷质量
)

# Python
fig.savefig("fig.png", dpi=300,
            bbox_inches="tight",
            transparent=False)`
  },
  {
    id: 'tiff', name: 'TIFF', type: 'raster',
    color: '#F0B27A',
    best: '顶刊位图投稿（TIFF/LZW）',
    dpi: '≥300 DPI（印刷 600 DPI）',
    size: '大（但支持 LZW 无损压缩）',
    support: 'Nature/Lancet 常要求此格式',
    desc: 'TIFF 是出版印刷行业的标准位图格式，支持 LZW 无损压缩，保留完整像素数据。',
    code: `# R 导出 TIFF（LZW 压缩）
ggsave("fig.tiff",
  plot        = p,
  width       = 89,
  height      = 60,
  units       = "mm",
  dpi         = 300,
  compression = "lzw"  # 无损压缩
)`
  },
  {
    id: 'eps', name: 'EPS', type: 'vector',
    color: '#E07A7A',
    best: '旧版期刊/Illustrator 工作流',
    dpi: '任意分辨率（矢量）',
    size: '中',
    support: 'Cell Press 等部分期刊仍要求',
    desc: 'EPS 是传统印刷矢量格式，与 Adobe Illustrator 高度兼容，但现代工作流中 PDF 已基本取代它。',
    code: `# R 导出 EPS
ggsave("fig.eps",
  plot   = p,
  width  = 89,
  height = 60,
  units  = "mm",
  device = "eps"
)

# 注意：EPS 不支持透明度，
# 有透明元素需提前去除`
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  数据：期刊要求
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const JOURNAL_DATA = [
  {
    name: 'Nature', group: 'Nature Portfolio',
    single: '89mm', oneHalf: '120mm', double: '183mm',
    dpi_line: '1000', dpi_halftone: '300', dpi_combo: '500',
    formats: 'PDF, EPS, AI (TIFF for revision)',
    color: 'RGB (screen) / CMYK (print)',
    maxSize: '10MB (初投)',
    fonts: '嵌入所有字体，最小 5pt',
    notes: 'Figure 字母标注统一左上角，Helvetica/Arial 字体'
  },
  {
    name: 'Science', group: 'AAAS',
    single: '55mm / 90mm', oneHalf: '—', double: '190mm',
    dpi_line: '1000', dpi_halftone: '300', dpi_combo: '600',
    formats: 'EPS, PDF, AI, TIFF',
    color: 'RGB',
    maxSize: '20MB',
    fonts: '嵌入，Times New Roman 或 Helvetica',
    notes: '允许 2 列：55mm 或 90mm；不接受 PNG 初投'
  },
  {
    name: 'Cell', group: 'Cell Press',
    single: '85mm', oneHalf: '—', double: '170mm',
    dpi_line: '1200', dpi_halftone: '300', dpi_combo: '600',
    formats: 'EPS, PDF, AI',
    color: 'RGB',
    maxSize: '无限制',
    fonts: '嵌入，推荐 Arial',
    notes: '图例文字 ≥ 6pt，坐标轴标签 ≥ 5pt'
  },
  {
    name: 'PNAS', group: 'NAS',
    single: '87mm', oneHalf: '114mm', double: '178mm',
    dpi_line: '1000', dpi_halftone: '300', dpi_combo: '500',
    formats: 'EPS, TIFF, PDF',
    color: 'CMYK 或 RGB',
    maxSize: '10MB per figure',
    fonts: '嵌入，建议 Helvetica',
    notes: '彩色收费，灰度图免费'
  },
  {
    name: 'Lancet', group: 'Elsevier',
    single: '90mm', oneHalf: '—', double: '190mm',
    dpi_line: '1000', dpi_halftone: '300', dpi_combo: '500',
    formats: 'TIFF, EPS',
    color: 'CMYK',
    maxSize: '5MB',
    fonts: '嵌入，Times/Helvetica',
    notes: 'CMYK 色彩模式，RGB 会被转换'
  },
  {
    name: 'NEJM', group: 'Massachusetts Medical Society',
    single: '86mm', oneHalf: '—', double: '178mm',
    dpi_line: '600', dpi_halftone: '300', dpi_combo: '600',
    formats: 'TIFF, EPS, PDF',
    color: 'CMYK or Grayscale',
    maxSize: '10MB',
    fonts: '嵌入，建议 Arial/Helvetica',
    notes: '临床数据图表建议灰度，保证打印清晰'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  render()
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function render() {
  return `
<div class="page-scroll">
<style>
/* ── p10 专属样式 ── */
.p10-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-3xl) var(--space-lg);
  overflow: hidden;
}
.p10-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 60% at 20% 80%, rgba(126,200,227,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 50% 40% at 80% 20%, rgba(224,122,122,0.12) 0%, transparent 55%);
  animation: p10HeroDrift 11s ease-in-out infinite alternate;
  pointer-events: none;
}
.p10-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 40% 50% at 60% 70%, rgba(149,213,178,0.1) 0%, transparent 50%);
  animation: p10HeroDrift2 14s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}
@keyframes p10HeroDrift {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.08) translate(20px,-15px); }
}
@keyframes p10HeroDrift2 {
  from { transform: scale(1) translate(0,0); }
  to   { transform: scale(1.06) translate(-25px,20px); }
}

/* ── 工作流 StickySteps ── */
.p10-workflow-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p10-wf-intro {
  max-width: var(--w-reading);
  margin: 0 auto var(--space-2xl);
  text-align: center;
}
.p10-wf-body {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xl);
  max-width: var(--w-full);
  margin: 0 auto;
  position: relative;
}
.p10-wf-left {
  width: 320px;
  flex-shrink: 0;
  will-change: transform;
}
.p10-wf-step-indicator {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.p10-wf-dot {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  cursor: pointer;
  transition: all 0.25s ease;
}
.p10-wf-dot-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-light-3);
  flex-shrink: 0;
  transition: all 0.3s ease;
  background: var(--bg-light-elevated);
}
.p10-wf-dot.active .p10-wf-dot-circle {
  background: var(--accent);
  border-color: var(--accent);
  color: #1d1d1f;
  font-weight: 700;
  box-shadow: 0 0 16px var(--accent-glow);
  transform: scale(1.1);
}
.p10-wf-dot-label {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--text-on-light-3);
  font-weight: 500;
  transition: color 0.3s ease;
}
.p10-wf-dot.active .p10-wf-dot-label {
  color: var(--text-on-light);
  font-weight: 600;
}
.p10-wf-connector {
  width: 2px;
  height: 20px;
  background: var(--border-light);
  margin-left: 21px;
  transition: background 0.3s ease;
}
.p10-wf-connector.passed {
  background: var(--accent);
}

/* 右侧步骤内容 */
.p10-wf-right {
  flex: 1;
  min-width: 0;
}
.p10-wf-panel {
  height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--space-xl) 0;
}
.p10-wf-panel-inner {
  width: 100%;
}
.p10-wf-step-num {
  font-family: var(--font-code);
  font-size: var(--text-small);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-xs);
}
.p10-wf-step-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text-on-light);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.p10-wf-step-en {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--text-on-light-3);
  margin-bottom: var(--space-md);
}
.p10-wf-step-desc {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  line-height: 1.8;
  max-width: 520px;
  margin-bottom: var(--space-md);
}
.p10-wf-code-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-sm);
}
.p10-wf-trap {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(224,122,122,0.08);
  border: 1px solid rgba(224,122,122,0.2);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #c05050;
  line-height: 1.6;
}

/* ── 移动端：工作流改为堆叠卡片 ── */
@media (max-width: 900px) {
  .p10-wf-body { flex-direction: column; }
  .p10-wf-left { width: 100%; }
  .p10-wf-step-indicator { flex-direction: row; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
  .p10-wf-step-indicator::-webkit-scrollbar { display: none; }
  .p10-wf-dot { flex-direction: column; align-items: center; gap: 4px; padding: 8px 12px; flex-shrink: 0; }
  .p10-wf-dot-label { font-size: 0.72rem; text-align: center; }
  .p10-wf-connector { display: none; }
  .p10-wf-panel { height: auto; padding: var(--space-md) 0; }
  .p10-wf-panel-inner { padding: var(--space-md); background: var(--bg-light-elevated); border-radius: var(--radius-md); box-shadow: var(--shadow-md); }
}
@media (max-width: 768px) {
  .p10-workflow-section { padding: var(--space-xl) var(--space-sm); }
  .p10-wf-step-title { font-size: clamp(1.4rem, 5vw, 1.8rem); }
  .p10-wf-panel-inner { padding: var(--space-sm); }
}

/* ── 格式对比 ── */
.p10-format-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p10-format-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border-dark);
  margin-bottom: var(--space-xl);
  overflow-x: auto;
  scrollbar-width: none;
}
.p10-format-tabs::-webkit-scrollbar { display: none; }
.p10-format-tab {
  padding: 12px 20px;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--text-on-dark-3);
  border: none;
  background: transparent;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.25s ease;
  white-space: nowrap;
  min-height: 44px;
  flex-shrink: 0;
}
.p10-format-tab.active {
  color: var(--text-on-dark);
  border-bottom-color: var(--accent);
}
.p10-format-tab:hover { color: var(--text-on-dark-2); }

.p10-format-content {
  display: none;
}
.p10-format-content.active { display: block; }

.p10-format-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  align-items: start;
  max-width: var(--w-content);
  margin: 0 auto;
}
.p10-format-info {
  min-width: 0;
}
.p10-format-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-code);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}
.p10-format-badge.vector { background: rgba(126,200,227,0.15); color: var(--accent); }
.p10-format-badge.raster { background: rgba(224,122,122,0.15); color: #e07a7a; }
.p10-format-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: var(--space-sm);
  letter-spacing: -0.02em;
}
.p10-format-desc {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  line-height: 1.8;
  margin-bottom: var(--space-md);
}
.p10-format-specs {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: var(--space-md);
}
.p10-format-spec-row {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
  align-items: baseline;
  min-width: 0;
}
.p10-format-spec-key {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--text-on-dark-3);
  white-space: nowrap;
  flex-shrink: 0;
  width: 80px;
}
.p10-format-spec-val {
  color: var(--text-on-dark-2);
  overflow-wrap: break-word;
  min-width: 0;
}
.p10-format-visual {
  min-width: 0;
}
.p10-format-svg-wrap {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--space-sm);
}
.p10-format-code-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
}

@media (max-width: 900px) {
  .p10-format-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .p10-format-section { padding: var(--space-xl) var(--space-sm); }
  .p10-format-tab { font-size: 0.78rem; padding: 10px 14px; }
}

/* ── DPI 对比器 ── */
.p10-dpi-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p10-dpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  max-width: var(--w-full);
  margin: 0 auto var(--space-xl);
}
.p10-dpi-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.p10-dpi-canvas-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: #fff;
  position: relative;
}
.p10-dpi-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}
.p10-dpi-label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--text-on-light-3);
  text-align: center;
}
.p10-dpi-val {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-on-light);
}

/* 移动端 DPI 改为 Tab 切换 */
.p10-dpi-tabs-mobile { display: none; }
@media (max-width: 768px) {
  .p10-dpi-grid { display: none; }
  .p10-dpi-tabs-mobile { display: block; }
  .p10-dpi-mobile-tabs {
    display: flex;
    border-bottom: 1px solid var(--border-light);
    overflow-x: auto;
    scrollbar-width: none;
    margin-bottom: var(--space-md);
  }
  .p10-dpi-mobile-tabs::-webkit-scrollbar { display: none; }
  .p10-dpi-mobile-tab {
    flex: 1;
    min-width: 70px;
    padding: 10px 12px;
    text-align: center;
    font-family: var(--font-code);
    font-size: 0.78rem;
    border: none;
    background: transparent;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    color: var(--text-on-light-3);
    min-height: 44px;
    transition: all 0.2s;
  }
  .p10-dpi-mobile-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
  .p10-dpi-mobile-canvas { max-width: 300px; margin: 0 auto; }
  .p10-dpi-section { padding: var(--space-xl) var(--space-sm); }
}
@media (max-width: 900px) and (min-width: 769px) {
  .p10-dpi-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ── 分辨率计算器 ── */
.p10-calc-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p10-calc-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xl);
  max-width: var(--w-content);
  margin: 0 auto;
  align-items: start;
}
.p10-calc-panel {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  min-width: 0;
}
.p10-calc-field {
  margin-bottom: var(--space-md);
}
.p10-calc-label {
  display: block;
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
}
.p10-calc-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.2s ease;
  min-height: 44px;
  box-sizing: border-box;
}
.p10-calc-input:focus {
  border-color: var(--accent);
}
.p10-calc-select {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-dark);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-heading);
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;
  min-height: 44px;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236e6e73' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  box-sizing: border-box;
}
.p10-calc-result-panel {
  min-width: 0;
}
.p10-calc-result-item {
  margin-bottom: var(--space-md);
}
.p10-calc-result-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.p10-calc-result-value {
  font-family: var(--font-heading);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.01em;
}
.p10-calc-result-sub {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-on-dark-3);
  margin-top: 2px;
}
.p10-calc-warning {
  margin-top: var(--space-md);
  padding: 12px 16px;
  background: rgba(224,122,122,0.08);
  border: 1px solid rgba(224,122,122,0.2);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: #c05050;
  display: none;
  line-height: 1.6;
}
.p10-calc-warning.show { display: block; }

@media (max-width: 900px) {
  .p10-calc-layout { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .p10-calc-section { padding: var(--space-xl) var(--space-sm); }
  .p10-calc-panel { padding: var(--space-md); }
}

/* ── 期刊速查 ── */
.p10-journal-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p10-journal-search-wrap {
  max-width: 480px;
  margin: 0 auto var(--space-xl);
  position: relative;
}
.p10-journal-select {
  width: 100%;
  padding: 16px 20px;
  background: var(--bg-light-elevated);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-full);
  color: var(--text-on-light);
  font-family: var(--font-heading);
  font-size: 1rem;
  outline: none;
  cursor: pointer;
  min-height: 52px;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236e6e73' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px center;
  padding-right: 48px;
  box-shadow: var(--shadow-sm);
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.p10-journal-select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-subtle);
}
.p10-journal-result {
  max-width: var(--w-content);
  margin: 0 auto;
  display: none;
}
.p10-journal-result.show { display: block; }
.p10-journal-card {
  background: var(--bg-light-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
}
.p10-journal-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-lg);
  flex-wrap: wrap;
  gap: 12px;
}
.p10-journal-card-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.2rem);
  font-weight: 700;
  color: var(--text-on-light);
  letter-spacing: -0.02em;
}
.p10-journal-card-group {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--text-on-light-3);
  letter-spacing: 0.08em;
}
.p10-journal-specs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}
.p10-journal-spec-card {
  background: var(--bg-light-alt);
  border-radius: var(--radius-md);
  padding: 16px;
  min-width: 0;
}
.p10-journal-spec-label {
  font-family: var(--font-code);
  font-size: 0.65rem;
  color: var(--text-on-light-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.p10-journal-spec-value {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-on-light);
  overflow-wrap: break-word;
}
.p10-journal-notes {
  padding: 12px 16px;
  background: rgba(126,200,227,0.06);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-on-light-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .p10-journal-section { padding: var(--space-xl) var(--space-sm); }
  .p10-journal-specs-grid { grid-template-columns: 1fr 1fr; }
  .p10-journal-card { padding: var(--space-md); }
}
@media (max-width: 480px) {
  .p10-journal-specs-grid { grid-template-columns: 1fr; }
}

/* ── 通用 section 标题 ── */
.p10-section-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  text-align: center;
  margin-bottom: var(--space-sm);
}
.p10-section-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-align: center;
  margin-bottom: var(--space-sm);
}
.p10-section-sub {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: inherit;
  opacity: 0.6;
  text-align: center;
  max-width: 560px;
  margin: 0 auto var(--space-xl);
  line-height: 1.7;
}
</style>

<!-- ══════════════════════════════════════════
     HERO
══════════════════════════════════════════ -->
<section class="section-dark section-hero-full p10-hero" id="p10-hero">
  <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:var(--space-sm);">
    <p class="hero-eyebrow">Module 01 / Page 10</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);">工作流与导出</h1>
    <p class="page-hero-sub">Research Workflow &amp; Export</p>
    <p style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:520px;line-height:1.8;margin-top:var(--space-xs);text-align:center;">
      从原始数据到顶刊 Figure——掌握完整绘图工作流，选对格式与分辨率，一次投稿通过审稿人。
    </p>
    <nav class="hero-quicknav" id="p10-quicknav">
      <button class="hero-quicknav__item" data-target="#p10-workflow">工作流时间线</button>
      <button class="hero-quicknav__item" data-target="#p10-format">格式对比</button>
      <button class="hero-quicknav__item" data-target="#p10-dpi">DPI 对比器</button>
      <button class="hero-quicknav__item" data-target="#p10-calc">分辨率计算器</button>
      <button class="hero-quicknav__item" data-target="#p10-journal">期刊速查</button>
    </nav>
    <p class="scroll-hint">↓ 向下探索</p>
  </div>
</section>

<!-- ══════════════════════════════════════════
     SECTION 1：工作流时间线（StickySteps 模拟）
══════════════════════════════════════════ -->
<section class="p10-workflow-section" id="p10-workflow">
  <div class="p10-wf-intro">
    <p class="p10-section-eyebrow">Complete Workflow</p>
    <h2 class="p10-section-title" style="color:var(--text-on-light);">6 步出版级绘图流程</h2>
    <p class="p10-section-sub" style="color:var(--text-on-light-2);">从数据整理到最终导出，每一步都有常见陷阱。</p>
  </div>

  <!-- 桌面端：sticky 模拟（JS transform） -->
  <div class="p10-wf-body" id="p10-wf-body">
    <!-- 左侧：步骤指示器 -->
    <div class="p10-wf-left" id="p10-wf-left">
      <div class="p10-wf-step-indicator" id="p10-wf-indicator">
        ${WORKFLOW_STEPS.map((s, i) => `
          <div class="p10-wf-dot${i===0?' active':''}" data-step="${i}" id="p10-dot-${i}">
            <div class="p10-wf-dot-circle">${s.icon}</div>
            <span class="p10-wf-dot-label">${s.title}</span>
          </div>
          ${i < WORKFLOW_STEPS.length-1 ? `<div class="p10-wf-connector" id="p10-conn-${i}"></div>` : ''}
        `).join('')}
      </div>
    </div>

    <!-- 右侧：每步内容 -->
    <div class="p10-wf-right" id="p10-wf-right">
      ${WORKFLOW_STEPS.map((s, i) => `
        <div class="p10-wf-panel" id="p10-wf-panel-${i}">
          <div class="p10-wf-panel-inner">
            <p class="p10-wf-step-num">Step ${s.num}</p>
            <h3 class="p10-wf-step-title">${s.title}</h3>
            <p class="p10-wf-step-en">${s.en}</p>
            <p class="p10-wf-step-desc">${s.desc}</p>
            <div class="p10-wf-code-wrap" id="p10-wf-code-${i}"></div>
            <div class="p10-wf-trap">${s.trap}</div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     SECTION 2：格式对比
══════════════════════════════════════════ -->
<section class="p10-format-section" id="p10-format">
  <div style="max-width:var(--w-full);margin:0 auto;">
    <p class="p10-section-eyebrow" style="color:var(--accent);">Format Deep Dive</p>
    <h2 class="p10-section-title" style="color:var(--text-on-dark);">格式深度对比</h2>
    <p class="p10-section-sub" style="color:var(--text-on-dark-2);">SVG / PDF / PNG / TIFF / EPS — 各有适用场景，用错了图退修。</p>

    <div class="p10-format-tabs" id="p10-format-tabs">
      ${FORMAT_DATA.map((f, i) => `
        <button class="p10-format-tab${i===0?' active':''}" data-fmt="${i}">${f.name}</button>
      `).join('')}
    </div>

    ${FORMAT_DATA.map((f, i) => `
      <div class="p10-format-content${i===0?' active':''}" id="p10-fmt-${i}">
        <div class="p10-format-layout">
          <div class="p10-format-info">
            <span class="p10-format-badge ${f.type}">${f.type === 'vector' ? '矢量格式' : '位图格式'}</span>
            <h3 class="p10-format-name" style="color:${f.color}">${f.name}</h3>
            <p class="p10-format-desc">${f.desc}</p>
            <div class="p10-format-specs">
              <div class="p10-format-spec-row">
                <span class="p10-format-spec-key">最佳用途</span>
                <span class="p10-format-spec-val">${f.best}</span>
              </div>
              <div class="p10-format-spec-row">
                <span class="p10-format-spec-key">分辨率</span>
                <span class="p10-format-spec-val">${f.dpi}</span>
              </div>
              <div class="p10-format-spec-row">
                <span class="p10-format-spec-key">文件大小</span>
                <span class="p10-format-spec-val">${f.size}</span>
              </div>
              <div class="p10-format-spec-row">
                <span class="p10-format-spec-key">兼容性</span>
                <span class="p10-format-spec-val">${f.support}</span>
              </div>
            </div>
          </div>
          <div class="p10-format-visual">
            <div class="p10-format-svg-wrap" id="p10-fmt-svg-${i}" style="height:200px;"></div>
            <div class="p10-format-code-wrap" id="p10-fmt-code-${i}"></div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
</section>

<!-- ══════════════════════════════════════════
     SECTION 3：DPI 对比器
══════════════════════════════════════════ -->
<section class="p10-dpi-section" id="p10-dpi">
  <p class="p10-section-eyebrow">Resolution Comparison</p>
  <h2 class="p10-section-title" style="color:var(--text-on-light);">DPI 对比器</h2>
  <p class="p10-section-sub" style="color:var(--text-on-light-2);">同一张图，72 / 150 / 300 / 600 DPI 的视觉差异。</p>

  <!-- 桌面端：4 格并排 -->
  <div class="p10-dpi-grid" id="p10-dpi-grid">
    ${[72, 150, 300, 600].map(dpi => `
      <div class="p10-dpi-cell">
        <p class="p10-dpi-val">${dpi} DPI</p>
        <div class="p10-dpi-canvas-wrap">
          <canvas id="p10-dpi-canvas-${dpi}" width="300" height="300"></canvas>
        </div>
        <p class="p10-dpi-label">${dpi===72?'屏幕显示（模糊）':dpi===150?'一般印刷':dpi===300?'期刊标准 ✓':dpi===600?'顶刊线条图 ✓':''}</p>
      </div>
    `).join('')}
  </div>

  <!-- 移动端：Tab 切换 -->
  <div class="p10-dpi-tabs-mobile">
    <div class="p10-dpi-mobile-tabs">
      ${[72, 150, 300, 600].map((dpi, i) => `
        <button class="p10-dpi-mobile-tab${i===0?' active':''}" data-dpi="${dpi}">${dpi} DPI</button>
      `).join('')}
    </div>
    <div class="p10-dpi-mobile-canvas">
      <canvas id="p10-dpi-mobile-canvas" width="300" height="300" style="width:100%;height:auto;border-radius:var(--radius-md);border:1px solid var(--border-light);"></canvas>
      <p class="p10-dpi-label" id="p10-dpi-mobile-label" style="margin-top:8px;text-align:center;">屏幕显示（模糊）</p>
    </div>
  </div>

  <p style="font-family:var(--font-body);font-size:0.85rem;color:var(--text-on-light-3);text-align:center;margin-top:var(--space-md);">
    * 以上演示通过模拟像素化程度呈现 DPI 差异效果。
  </p>
</section>

<!-- ══════════════════════════════════════════
     SECTION 4：分辨率计算器
══════════════════════════════════════════ -->
<section class="p10-calc-section" id="p10-calc">
  <p class="p10-section-eyebrow" style="color:var(--accent);">Resolution Calculator</p>
  <h2 class="p10-section-title" style="color:var(--text-on-dark);">分辨率计算器</h2>
  <p class="p10-section-sub" style="color:var(--text-on-dark-2);">输入图表的实际印刷尺寸和 DPI，计算所需像素数和估算文件大小。</p>

  <div class="p10-calc-layout">
    <!-- 输入面板 -->
    <div class="p10-calc-panel">
      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-w">宽度（cm）</label>
        <input class="p10-calc-input" id="p10-calc-w" type="number" inputmode="decimal" min="1" max="100" value="8.9" step="0.1" placeholder="8.9">
      </div>
      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-h">高度（cm）</label>
        <input class="p10-calc-input" id="p10-calc-h" type="number" inputmode="decimal" min="1" max="100" value="6" step="0.1" placeholder="6">
      </div>
      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-dpi">分辨率（DPI）</label>
        <select class="p10-calc-select" id="p10-calc-dpi">
          <option value="72">72 DPI — 屏幕显示</option>
          <option value="150">150 DPI — 一般印刷</option>
          <option value="300" selected>300 DPI — 期刊标准</option>
          <option value="600">600 DPI — 顶刊线条图</option>
          <option value="1000">1000 DPI — 顶刊线条图（最高）</option>
        </select>
      </div>
      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-fmt">图片格式</label>
        <select class="p10-calc-select" id="p10-calc-fmt">
          <option value="png">PNG（无损，8-bit）</option>
          <option value="tiff">TIFF（无损，LZW 压缩）</option>
          <option value="jpeg">JPEG（有损，Quality=95）</option>
          <option value="svg">PDF/SVG（矢量，无像素）</option>
        </select>
      </div>
    </div>

    <!-- 结果面板 -->
    <div class="p10-calc-result-panel" id="p10-calc-results">
      <div class="p10-calc-result-item">
        <p class="p10-calc-result-label">像素宽 × 高</p>
        <p class="p10-calc-result-value" id="p10-calc-px">1051 × 709</p>
        <p class="p10-calc-result-sub">pixels</p>
      </div>
      <div class="p10-calc-result-item">
        <p class="p10-calc-result-label">总像素数</p>
        <p class="p10-calc-result-value" id="p10-calc-total">0.75 MP</p>
        <p class="p10-calc-result-sub">百万像素</p>
      </div>
      <div class="p10-calc-result-item">
        <p class="p10-calc-result-label">估算文件大小</p>
        <p class="p10-calc-result-value" id="p10-calc-size">约 2.1 MB</p>
        <p class="p10-calc-result-sub" id="p10-calc-size-note">PNG 无损压缩估算</p>
      </div>
      <div class="p10-calc-result-item">
        <p class="p10-calc-result-label">R ggsave 代码</p>
        <pre id="p10-calc-code" style="background:var(--bg-dark-elevated);padding:14px;border-radius:var(--radius-sm);font-family:var(--font-code);font-size:0.78rem;color:var(--text-on-dark-2);white-space:pre-wrap;word-break:break-all;overflow-wrap:break-word;margin-top:6px;"></pre>
      </div>
      <div class="p10-calc-warning" id="p10-calc-warning">
        ⚠️ 该分辨率下文件较大，建议：<br>
        • TIFF 改用 LZW 无损压缩<br>
        • PNG 使用 pngquant 优化<br>
        • 矢量数据改用 PDF/EPS
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     SECTION 5：期刊速查
══════════════════════════════════════════ -->
<section class="p10-journal-section" id="p10-journal">
  <p class="p10-section-eyebrow">Journal Quick Reference</p>
  <h2 class="p10-section-title" style="color:var(--text-on-light);">期刊图片规格速查</h2>
  <p class="p10-section-sub" style="color:var(--text-on-light-2);">选择目标期刊，即刻查看投稿图片的尺寸、DPI 和格式要求。</p>

  <div class="p10-journal-search-wrap">
    <select class="p10-journal-select" id="p10-journal-select">
      <option value="">— 选择期刊 —</option>
      ${JOURNAL_DATA.map(j => `<option value="${j.name}">${j.name} (${j.group})</option>`).join('')}
    </select>
  </div>

  <div class="p10-journal-result" id="p10-journal-result">
    <div class="p10-journal-card" id="p10-journal-card"></div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FOOTER CTA
══════════════════════════════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">10 / 10</p>
  <h2 class="page-footer-quote">"每一张顶刊图表的背后，都是一套被反复验证的工作流。"</h2>
  <p class="page-footer-desc">模块一完结 — 接下来：模块二 AI 辅助科研绘图，让 AI 为你的研究提速。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p10-prev-btn">← 上一页</button>
    <button class="btn-primary" id="p10-next-btn">下一页 →</button>
  </div>
</section>

</div>`;
}
```

### Step 2: 启动开发服务器，确认 Hero 可见

```bash
cd "E:/Claude-project/sci-aesthetic"
npm run dev
```

在浏览器访问 `http://localhost:5173/#m1-p10`，验证：
- [ ] Hero 全屏显示（100vh）
- [ ] eyebrow "Module 01 / Page 10" 显示
- [ ] 主标题"工作流与导出"显示
- [ ] 光晕动画在 Hero 背景运行
- [ ] 无控制台报错

### Step 3: 提交 HTML 骨架

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat: p10 HTML skeleton with Hero, 5 sections, Footer CTA"
```

---

## Task 2: init() — 工作流 StickySteps + GSAP 入场

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — 添加 init() 实现

### Step 1: 实现 init() 基础结构（quicknav + footer + 工作流逻辑）

在 render() 后面添加 init() 和 destroy() 函数：

```js
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  模块状态
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let _scrollHandler = null;
let _codeEditors = [];    // 收集所有 CodeMirror 实例

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  init()
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function init() {
  // 1. quicknav 点击跳转
  document.querySelectorAll('#p10-quicknav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 2. Hero GSAP 入场
  const gsap = window.gsap;
  if (gsap) {
    gsap.fromTo('#p10-hero .hero-eyebrow',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .page-hero-title',
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .page-hero-sub',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('#p10-hero p[style*="font-family:var(--font-body)"]',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: 'power3.out' });
    gsap.fromTo('#p10-quicknav',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.7, ease: 'power3.out' });
  }

  // 3. Footer 导航
  document.getElementById('p10-prev-btn')?.addEventListener('click', () => navigateTo('m1-p9'));
  document.getElementById('p10-next-btn')?.addEventListener('click', () => navigateTo('m2-p1'));

  // 4. 初始化各模块
  initWorkflow();
  initFormatSection();
  initDpiComparison();
  initResolutionCalc();
  initJournalLookup();

  // 5. ScrollTrigger 入场动画（桌面端）
  if (gsap && window.ScrollTrigger && window.innerWidth >= 769) {
    const sections = ['#p10-workflow', '#p10-format', '#p10-dpi', '#p10-calc', '#p10-journal'];
    sections.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      gsap.from(el.querySelectorAll('.p10-section-eyebrow, .p10-section-title, .p10-section-sub'), {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out'
      });
    });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  destroy()
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function destroy() {
  killAll();
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler);
    _scrollHandler = null;
  }
  _codeEditors.forEach(e => { try { e.destroy(); } catch(_) {} });
  _codeEditors = [];
}
```

### Step 2: 实现 initWorkflow()

```js
function initWorkflow() {
  const isMobile = window.innerWidth <= 900;

  // 为每个步骤初始化 CodeMirror（只读展示）
  WORKFLOW_STEPS.forEach((step, i) => {
    const container = document.getElementById(`p10-wf-code-${i}`);
    if (!container) return;
    try {
      const editor = createCodeEditor(container, {
        code: step.code, language: 'r', readOnly: true
      });
      _codeEditors.push(editor);
    } catch(e) {
      // CodeMirror 失败时降级为 pre 标签
      container.innerHTML = `<pre style="background:#1a1a2e;padding:16px;border-radius:8px;font-family:var(--font-code);font-size:0.78rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${step.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;
    }
  });

  if (isMobile) {
    initWorkflowMobile();
    return;
  }
  initWorkflowDesktop();
}

function initWorkflowMobile() {
  // 移动端：点击步骤 dot 切换显示
  const dots = document.querySelectorAll('.p10-wf-dot');
  const panels = document.querySelectorAll('.p10-wf-panel');
  let currentStep = 0;

  function setStep(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    panels.forEach((p, i) => {
      p.style.display = i === idx ? 'flex' : 'none';
    });
    currentStep = idx;
  }

  // 初始显示第 0 步
  setStep(0);
  panels.forEach((p, i) => { if(i > 0) p.style.display = 'none'; });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setStep(i));
  });
}

function initWorkflowDesktop() {
  const body = document.getElementById('p10-wf-body');
  const left = document.getElementById('p10-wf-left');
  const right = document.getElementById('p10-wf-right');
  if (!body || !left || !right) return;

  let currentStep = 0;
  const TOTAL = WORKFLOW_STEPS.length;

  function updateStep(idx) {
    currentStep = idx;
    document.querySelectorAll('.p10-wf-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    // 更新连接线
    document.querySelectorAll('.p10-wf-connector').forEach((c, i) => {
      c.classList.toggle('passed', i < idx);
    });
  }

  function updateSticky() {
    const bodyRect = body.getBoundingClientRect();
    const scrolledPast = Math.max(0, -bodyRect.top);
    const maxTranslate = Math.max(0, body.offsetHeight - left.offsetHeight);
    left.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;

    // 步骤检测（每步 100vh）
    const stepIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
    if (stepIdx !== currentStep) updateStep(stepIdx);
  }

  _scrollHandler = updateSticky;
  window.addEventListener('scroll', updateSticky, { passive: true });
  updateSticky();

  // 点击 dot 滚动到对应步骤
  document.querySelectorAll('.p10-wf-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const panel = document.getElementById(`p10-wf-panel-${i}`);
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
```

### Step 3: 验证工作流 StickySteps

访问 `http://localhost:5173/#m1-p10`，向下滚动到工作流 section：
- [ ] 桌面端（>900px）：左侧步骤指示器随滚动 transform 向下跟随，每步 100vh
- [ ] 左侧 dot 随步骤变化高亮（active 状态）
- [ ] 连接线 passed 状态更新
- [ ] CodeMirror 代码显示正确（各步骤显示对应 R 代码）
- [ ] 移动端（≤900px）：显示为横向 dot 选择器 + 单个面板
- [ ] 无控制台报错

### Step 4: 提交工作流功能

```bash
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat: p10 workflow StickySteps with JS transform sticky simulation"
```

---

## Task 3: 格式对比 + DPI 对比器

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — 添加 initFormatSection() 和 initDpiComparison()

### Step 1: 实现 initFormatSection()

```js
function initFormatSection() {
  // Tab 切换
  const tabs = document.querySelectorAll('.p10-format-tab');
  const contents = document.querySelectorAll('.p10-format-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.fmt);
      tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
      contents.forEach((c, i) => c.classList.toggle('active', i === idx));
      // 延迟一帧再渲染，确保 DOM 可见
      requestAnimationFrame(() => renderFormatVisual(idx));
    });
  });

  // 初始渲染第 0 个格式的可视化
  renderFormatVisual(0);

  // 初始化所有格式的 CodeMirror（只读）
  FORMAT_DATA.forEach((f, i) => {
    const container = document.getElementById(`p10-fmt-code-${i}`);
    if (!container) return;
    try {
      const editor = createCodeEditor(container, {
        code: f.code, language: f.id === 'svg' ? 'r' : 'r', readOnly: true
      });
      _codeEditors.push(editor);
    } catch(e) {
      container.innerHTML = `<pre style="background:#0d1117;padding:14px;border-radius:8px;font-size:0.75rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${f.code.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;
    }
  });
}

function renderFormatVisual(idx) {
  const f = FORMAT_DATA[idx];
  const container = document.getElementById(`p10-fmt-svg-${idx}`);
  if (!container || container._rendered) return;
  container._rendered = true;

  if (f.type === 'vector') {
    renderVectorAnimation(container, f);
  } else {
    renderRasterAnimation(container, f);
  }
}

function renderVectorAnimation(container, f) {
  // 用 D3 绘制矢量概念图：显示路径点和贝塞尔曲线描述
  const svg = d3.select(container).append('svg')
    .attr('viewBox', '0 0 400 200')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', '100%');

  svg.append('rect').attr('width', 400).attr('height', 200).attr('fill', '#0d1117');

  // 标题文字
  svg.append('text').attr('x', 200).attr('y', 30).attr('text-anchor', 'middle')
    .attr('fill', f.color).attr('font-size', 13).attr('font-family', 'JetBrains Mono, monospace')
    .text('矢量：数学路径描述');

  // 绘制一个简单的圆弧路径，附带控制点
  const pathData = 'M 60 150 C 100 60, 180 60, 200 100 C 220 140, 300 60, 340 100';
  svg.append('path').attr('d', pathData)
    .attr('fill', 'none').attr('stroke', f.color).attr('stroke-width', 2.5)
    .attr('stroke-dasharray', '0,1000')
    .transition().duration(1500).ease(d3.easeCubicOut)
    .attrTween('stroke-dasharray', () => {
      return t => `${t * 1000},1000`;
    });

  // 锚点
  [[60,150],[200,100],[340,100]].forEach(([x,y]) => {
    svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 0)
      .attr('fill', f.color).attr('stroke', 'white').attr('stroke-width', 1.5)
      .transition().delay(1200).duration(400)
      .attr('r', 5);
    svg.append('text').attr('x', x).attr('y', y + 18)
      .attr('text-anchor', 'middle').attr('fill', '#6e6e73')
      .attr('font-size', 9).attr('font-family', 'JetBrains Mono, monospace')
      .text(`(${x}, ${y})`);
  });

  // "任意缩放"标签
  svg.append('text').attr('x', 200).attr('y', 185).attr('text-anchor', 'middle')
    .attr('fill', '#6e6e73').attr('font-size', 10)
    .text('路径在任意分辨率下精确重绘 → 无损缩放');
}

function renderRasterAnimation(container, f) {
  // 用 Canvas 绘制像素网格概念图
  const canvas = document.createElement('canvas');
  canvas.width = 400; canvas.height = 200;
  canvas.style.width = '100%'; canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, 400, 200);

  // 标题
  ctx.fillStyle = f.color;
  ctx.font = '13px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('位图：像素网格存储', 200, 28);

  // 绘制像素网格（放大效果）
  const gridSize = 22;
  const cols = 12, rows = 6;
  const startX = 40, startY = 50;
  const pixelColors = [
    '#0d1117','#7EC8E3','#7EC8E3','#0d1117','#0d1117','#0d1117','#95D5B2','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
    '#0d1117','#7EC8E3','#95D5B2','#0d1117','#0d1117','#7EC8E3','#7EC8E3','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
    '#0d1117','#0d1117','#0d1117','#0d1117','#95D5B2','#7EC8E3','#95D5B2','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
    '#0d1117','#0d1117','#0d1117','#7EC8E3','#7EC8E3','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
    '#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
    '#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117','#0d1117',
  ];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = pixelColors[r * cols + c] || '#0d1117';
      ctx.fillStyle = color;
      ctx.fillRect(startX + c * gridSize, startY + r * gridSize, gridSize - 1, gridSize - 1);
    }
  }

  // 标注
  ctx.fillStyle = '#6e6e73';
  ctx.font = '10px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('放大后可见像素格子（锯齿）', 200, 188);
}
```

### Step 2: 实现 initDpiComparison()

```js
function initDpiComparison() {
  const DPI_VALS = [72, 150, 300, 600];
  const DPI_LABELS = {
    72: '屏幕显示（模糊）',
    150: '一般印刷',
    300: '期刊标准 ✓',
    600: '顶刊线条图 ✓'
  };

  // 绘制 DPI 对比图函数（Canvas）
  // 通过改变像素块大小模拟不同 DPI 的清晰度
  function drawDpiCanvas(canvas, dpi) {
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // 白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // 模拟 DPI：DPI 越低，像素块越大（锯齿越明显）
    // 用 blockSize 模拟马赛克效果：dpi=72 → blockSize=4, dpi=600 → blockSize=0.5
    const scale = dpi / 300;  // 300 为参考 DPI
    const offCanvas = document.createElement('canvas');
    const offSize = Math.max(8, Math.round(size * scale / 4));
    offCanvas.width = offSize;
    offCanvas.height = offSize;
    const offCtx = offCanvas.getContext('2d');

    // 在小画布上绘制精细内容
    offCtx.fillStyle = '#ffffff';
    offCtx.fillRect(0, 0, offSize, offSize);

    // 绘制一个圆 + 文字 + 线条
    offCtx.beginPath();
    offCtx.arc(offSize * 0.35, offSize * 0.4, offSize * 0.22, 0, Math.PI * 2);
    offCtx.fillStyle = '#7EC8E3';
    offCtx.fill();
    offCtx.lineWidth = Math.max(0.5, offSize * 0.02);
    offCtx.strokeStyle = '#1d1d1f';
    offCtx.stroke();

    offCtx.beginPath();
    offCtx.moveTo(offSize * 0.1, offSize * 0.75);
    offCtx.lineTo(offSize * 0.6, offSize * 0.55);
    offCtx.lineTo(offSize * 0.9, offSize * 0.7);
    offCtx.strokeStyle = '#95D5B2';
    offCtx.lineWidth = Math.max(0.5, offSize * 0.025);
    offCtx.stroke();

    offCtx.font = `${Math.max(4, offSize * 0.15)}px Arial`;
    offCtx.fillStyle = '#1d1d1f';
    offCtx.fillText('ABC', offSize * 0.55, offSize * 0.4);

    // 将小画布缩放到目标尺寸（imageSmoothingEnabled=false → 像素化）
    ctx.imageSmoothingEnabled = dpi < 300;  // 低 DPI 显示锯齿
    ctx.drawImage(offCanvas, 0, 0, size, size);

    // DPI 标注
    ctx.fillStyle = '#1d1d1f';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${dpi} DPI`, size / 2, size - 16);
  }

  // 桌面端：绘制 4 个 canvas
  DPI_VALS.forEach(dpi => {
    const canvas = document.getElementById(`p10-dpi-canvas-${dpi}`);
    if (canvas) drawDpiCanvas(canvas, dpi);
  });

  // 移动端：Tab 切换
  const mobileTabs = document.querySelectorAll('.p10-dpi-mobile-tab');
  const mobileCanvas = document.getElementById('p10-dpi-mobile-canvas');
  const mobileLabel = document.getElementById('p10-dpi-mobile-label');

  if (mobileTabs.length && mobileCanvas) {
    // 初始显示第一个
    drawDpiCanvas(mobileCanvas, 72);

    mobileTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const dpi = parseInt(tab.dataset.dpi);
        mobileTabs.forEach(t => t.classList.toggle('active', t.dataset.dpi == dpi));
        drawDpiCanvas(mobileCanvas, dpi);
        if (mobileLabel) mobileLabel.textContent = DPI_LABELS[dpi] || '';
      });
    });
  }
}
```

### Step 3: 验证格式对比和 DPI 对比器

- [ ] 格式 Tab 切换正常（SVG/PDF/PNG/TIFF/EPS）
- [ ] 矢量格式显示路径动画（D3 SVG）
- [ ] 位图格式显示像素网格（Canvas）
- [ ] DPI 对比器：4 个 Canvas 显示不同清晰度
- [ ] 移动端（≤768px）：DPI 改为 Tab 切换
- [ ] 无控制台报错

### Step 4: 提交格式和 DPI 功能

```bash
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat: p10 format comparison tabs with D3/Canvas + DPI visualizer"
```

---

## Task 4: 分辨率计算器 + 期刊速查

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — 添加 initResolutionCalc() 和 initJournalLookup()

### Step 1: 实现 initResolutionCalc()

```js
function initResolutionCalc() {
  const wInput  = document.getElementById('p10-calc-w');
  const hInput  = document.getElementById('p10-calc-h');
  const dpiSel  = document.getElementById('p10-calc-dpi');
  const fmtSel  = document.getElementById('p10-calc-fmt');
  const pxEl    = document.getElementById('p10-calc-px');
  const totalEl = document.getElementById('p10-calc-total');
  const sizeEl  = document.getElementById('p10-calc-size');
  const noteEl  = document.getElementById('p10-calc-size-note');
  const codeEl  = document.getElementById('p10-calc-code');
  const warnEl  = document.getElementById('p10-calc-warning');

  if (!wInput || !pxEl) return;

  function calc() {
    const w   = parseFloat(wInput.value) || 8.9;
    const h   = parseFloat(hInput.value) || 6;
    const dpi = parseInt(dpiSel.value) || 300;
    const fmt = fmtSel.value;

    // cm → inch → pixels (1 inch = 2.54 cm)
    const pxW = Math.round(w / 2.54 * dpi);
    const pxH = Math.round(h / 2.54 * dpi);
    const totalPx = pxW * pxH;
    const megaPx = (totalPx / 1e6).toFixed(2);

    // 估算文件大小（字节）
    let bytesEst = 0;
    let sizeNote = '';
    if (fmt === 'png') {
      // PNG：约 0.5-1 byte per pixel（压缩后）
      bytesEst = totalPx * 0.6;
      sizeNote = 'PNG 无损压缩估算（RGB）';
    } else if (fmt === 'tiff') {
      // TIFF LZW：约 1-2 bytes per pixel
      bytesEst = totalPx * 1.2;
      sizeNote = 'TIFF LZW 无损压缩估算（RGB）';
    } else if (fmt === 'jpeg') {
      // JPEG 95%：约 0.3-0.5 bytes per pixel
      bytesEst = totalPx * 0.4;
      sizeNote = 'JPEG Quality=95 估算（有损）';
    } else {
      // PDF/SVG：矢量，无像素
      bytesEst = 0;
      sizeNote = '矢量格式无像素，文件大小取决于路径复杂度';
    }

    const sizeMB = bytesEst > 0 ? (bytesEst / 1024 / 1024).toFixed(1) : '—';

    pxEl.textContent = `${pxW.toLocaleString()} × ${pxH.toLocaleString()}`;
    totalEl.textContent = `${megaPx} MP`;
    sizeEl.textContent = bytesEst > 0 ? `约 ${sizeMB} MB` : '约 0.1–2 MB（视路径数）';
    noteEl.textContent = sizeNote;

    // R ggsave 代码
    const fmtStr = fmt === 'svg' ? 'pdf' : fmt;
    codeEl.textContent = `ggsave("figure.${fmtStr}",\n  plot   = p,\n  width  = ${w},\n  height = ${h},\n  units  = "cm",\n  dpi    = ${dpi}${fmtStr === 'tiff' ? ',\n  compression = "lzw"' : ''}\n)`;

    // 警告：文件大于 10MB
    const showWarn = bytesEst > 10 * 1024 * 1024;
    warnEl.classList.toggle('show', showWarn);
  }

  [wInput, hInput, dpiSel, fmtSel].forEach(el => {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  // 初始计算
  calc();
}
```

### Step 2: 实现 initJournalLookup()

```js
function initJournalLookup() {
  const select = document.getElementById('p10-journal-select');
  const result = document.getElementById('p10-journal-result');
  const card   = document.getElementById('p10-journal-card');
  if (!select || !result || !card) return;

  select.addEventListener('change', () => {
    const name = select.value;
    if (!name) {
      result.classList.remove('show');
      return;
    }
    const journal = JOURNAL_DATA.find(j => j.name === name);
    if (!journal) return;

    card.innerHTML = `
      <div class="p10-journal-card-header">
        <div>
          <div class="p10-journal-card-title">${journal.name}</div>
          <div class="p10-journal-card-group">${journal.group}</div>
        </div>
      </div>
      <div class="p10-journal-specs-grid">
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">单栏宽度</div>
          <div class="p10-journal-spec-value">${journal.single}</div>
        </div>
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">双栏宽度</div>
          <div class="p10-journal-spec-value">${journal.double}</div>
        </div>
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">半色调 DPI</div>
          <div class="p10-journal-spec-value">${journal.dpi_halftone} DPI</div>
        </div>
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">线条图 DPI</div>
          <div class="p10-journal-spec-value">${journal.dpi_line} DPI</div>
        </div>
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">接受格式</div>
          <div class="p10-journal-spec-value">${journal.formats}</div>
        </div>
        <div class="p10-journal-spec-card">
          <div class="p10-journal-spec-label">色彩模式</div>
          <div class="p10-journal-spec-value">${journal.color}</div>
        </div>
      </div>
      <div class="p10-journal-notes">📌 ${journal.notes}</div>
    `;

    result.classList.add('show');

    // 入场动画
    const gsap = window.gsap;
    if (gsap) {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  });
}
```

### Step 3: 验证计算器和期刊速查

- [ ] 分辨率计算器：输入宽高和 DPI，结果实时更新
- [ ] 像素数计算正确（89mm × 300 DPI ≈ 1051px）
- [ ] 文件大小估算合理
- [ ] ggsave 代码正确生成
- [ ] TIFF 格式显示 LZW 参数
- [ ] 矢量格式（PDF/SVG）提示无像素
- [ ] 期刊速查：下拉选择期刊后显示规格卡片
- [ ] 卡片入场有 GSAP 动画
- [ ] 移动端 3 列变 2 列 → 1 列
- [ ] 无控制台报错

### Step 4: 提交计算器和期刊速查

```bash
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat: p10 resolution calculator and journal specs lookup"
```

---

## Task 5: 响应式检查 + Bug 修复 + 最终提交

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — 最终 bug 修复
- Modify: `todo.md` — 勾选 m1-p10 完成

### Step 1: 质量检查清单

使用 Chrome DevTools 在以下分辨率逐项验证：

**375px（iPhone SE）**
- [ ] Hero 全屏，无水平滚动条
- [ ] 工作流：横向 dot 选择器 + 单步内容显示
- [ ] 格式 Tab 可横向滑动
- [ ] DPI 对比器：Tab 切换模式
- [ ] 分辨率计算器：单列布局，inputmode="decimal"
- [ ] 期刊速查：下拉选择 + 规格卡 1 列
- [ ] Footer 按钮左右排列

**768px（iPad mini）**
- [ ] 工作流变单列（flex-direction: column）
- [ ] 格式对比变单列
- [ ] 计算器变单列

**1440px（Desktop）**
- [ ] 工作流：左侧指示器 + 右侧步骤内容正常
- [ ] 格式对比：2 列布局
- [ ] DPI：4 格并排
- [ ] 计算器：2 列布局

**功能验证**
- [ ] 所有 CodeMirror 实例显示正确（无白屏）
- [ ] 工作流 sticky 模拟在桌面端正常跟随
- [ ] 格式 Tab 切换正常
- [ ] DPI Canvas 绘制正常
- [ ] 分辨率计算器实时更新
- [ ] 期刊速查显示正确信息
- [ ] F12 控制台零报错

### Step 2: 修复发现的 Bug

根据检查结果修复，常见问题：
- CodeMirror 在深色/浅色背景切换时有白边 → 检查 `.cm-editor` 背景色
- 工作流 sticky 在 iOS 上 `-bodyRect.top` 计算异常 → 加 `Math.max(0, ...)`（已在代码中处理）
- 格式对比 SVG 在首次隐藏时不渲染 → 用 `container._rendered` flag 延迟渲染（已在代码中处理）

### Step 3: 更新 todo.md

将 todo.md 第 67 行的 `- [ ] m1-p10` 改为：

```
- [x] m1-p10 科研绘图工作流与导出（6 步粘性时间线 + 格式原理动画 + DPI 对比器 + 分辨率计算器 + 期刊速查）
```

### Step 4: 最终提交

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js todo.md
git commit -m "feat: m1-p10 完成 — 工作流与导出页面全部交互实现

- 6步粘性工作流时间线（JS transform sticky + CodeMirror 代码展示）
- 格式对比（SVG/PDF/PNG/TIFF/EPS，矢量动画 + 位图网格可视化）
- DPI 对比器（Canvas 模拟 4 种分辨率，移动端 Tab 切换）
- 分辨率计算器（cm×DPI→像素数 + 文件大小估算 + ggsave 代码生成）
- 期刊速查（Nature/Science/Cell/PNAS/Lancet/NEJM 规格速查）
- 移动端完整适配：响应式断点覆盖 375/768/1440px"
```

---

## 快速参考

### 关键 CSS 变量
```css
--bg-dark: #1d1d1f      --bg-light: #fafafa
--accent: #7EC8E3        --font-code: 'JetBrains Mono'
--space-xl: 80px         --radius-md: 16px
```

### 文件位置
- 主文件: `src/pages/m1/p10-workflow-export.js`
- 全局 CSS: `src/styles/`（不要修改）
- 路由注册: 已注册 `#m1-p10`（不需要改动）
- todo.md: 根目录 `todo.md`

### 已知约束
- CSS `position:sticky` 全局失效，用 JS `transform:translateY` 模拟
- GSAP/D3 通过 CDN 加载，用 `window.gsap` 和 `import * as d3 from 'd3'` 访问
- CodeMirror 用 `createCodeEditor(container, {code, language, readOnly})` 创建，返回实例需 `.destroy()` 清理
- 所有 flex 子项必须设 `min-width: 0`
- `destroy()` 必须调用 `killAll()` + 清理 `_scrollHandler` + 销毁所有 CodeMirror 实例
