// p10-workflow-export.js — 科研工作流与导出规范
// 工作流步骤 + 格式对比 + DPI 对比器 + 分辨率计算器 + 期刊速查

import { fadeIn, killAll } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _scrollHandler = null;
let _codeEditors = [];

// ══════════════════════════════════════════════════════
//  工作流步骤数据
// ══════════════════════════════════════════════════════

const WORKFLOW_STEPS = [
  { num:'01', title:'数据整理', en:'Data Cleaning', icon:'🗂', desc:'在绘图前整理数据，确保格式正确、缺失值处理妥当，是出版级图表的基础。',
    code: `# R 数据整理示例\nlibrary(tidyverse)\n\ndata <- read_csv("experiment.csv") |>\n  filter(!is.na(value)) |>        # 移除缺失值\n  mutate(\n    group = factor(group),         # 分组变量因子化\n    value = log1p(value)           # 对数变换改善分布\n  ) |>\n  group_by(group) |>\n  summarise(\n    mean = mean(value),\n    se   = sd(value) / sqrt(n()),  # 标准误用于误差线\n    .groups = "drop"\n  )`,
    trap:'⚠️ 陷阱：未处理异常值就直接绘图，导致坐标轴范围失真，关键数据被压缩到角落。', color:'#7EC8E3' },
  { num:'02', title:'选择图表', en:'Chart Selection', icon:'📊', desc:'根据数据类型和研究问题选择最合适的图表类型，避免用错图表误导读者。',
    code: `# 图表类型选择参考\n# 比较多组均值 → 箱线图 or 小提琴图\nggplot(data, aes(x=group, y=value, fill=group)) +\n  geom_boxplot(width=0.5, outlier.shape=21) +\n  geom_jitter(width=0.1, alpha=0.4, size=1.5)\n\n# 展示趋势变化 → 折线图（加置信带）\nggplot(data, aes(x=time, y=value, color=group)) +\n  geom_line(linewidth=0.8) +\n  geom_ribbon(aes(ymin=lower, ymax=upper, fill=group),\n              alpha=0.15, color=NA)\n\n# 展示相关性 → 散点图（加回归线）\nggplot(data, aes(x=x, y=y)) +\n  geom_point(alpha=0.6) +\n  geom_smooth(method="lm", se=TRUE)`,
    trap:'⚠️ 陷阱：用折线图连接非时序的分类数据，暗示了不存在的趋势关系。', color:'#95D5B2' },
  { num:'03', title:'生成初稿', en:'First Draft', icon:'✏️', desc:'先快速生成功能完整的初稿，不追求美观，验证数据和图表类型是否正确。',
    code: `# 快速初稿：使用 ggplot2 默认设置\nlibrary(ggplot2)\n\np <- ggplot(data, aes(x=group, y=value, fill=group)) +\n  geom_boxplot() +\n  labs(\n    title = "各处理组细胞活性对比",\n    x = "实验组",\n    y = "细胞活性 (OD450)",\n    caption = "n=30 per group, data: experiment.csv"\n  )\n\n# 先保存低分辨率草稿查看效果\nggsave("draft.png", p, width=8, height=5, dpi=72)`,
    trap:'⚠️ 陷阱：初稿阶段花太多时间在配色和字体上，应先确认数据展示逻辑再精调外观。', color:'#B8B8E8' },
  { num:'04', title:'配色优化', en:'Color Refinement', icon:'🎨', desc:'选择符合期刊要求、色盲友好的配色方案，确保印刷版和屏幕版效果一致。',
    code: `# 使用色盲安全的 ggsci 配色\nlibrary(ggsci)\nlibrary(RColorBrewer)\n\n# 方案 1：ggsci Nature 期刊配色\np + scale_fill_npg()\n\n# 方案 2：手动 Okabe-Ito 色盲安全色板\nokabe_ito <- c("#E69F00","#56B4E9","#009E73",\n               "#F0E442","#0072B2","#D55E00","#CC79A7")\np + scale_fill_manual(values = okabe_ito)\n\n# 方案 3：ColorBrewer 渐变（适合连续数据）\np + scale_fill_brewer(palette = "Blues", direction = -1)`,
    trap:'⚠️ 陷阱：使用彩虹色（rainbow）配色——在灰度印刷后颜色差异消失，且对色盲读者不友好。', color:'#F0B27A' },
  { num:'05', title:'标注与排版', en:'Annotation & Layout', icon:'📐', desc:'添加统计标注、调整字号和布局，让图表在期刊规定的列宽下依然清晰可读。',
    code: `# 添加显著性标注 + 精调排版\nlibrary(ggpubr)\n\np_final <- p +\n  stat_compare_means(\n    comparisons = list(c("Control","Treatment")),\n    method = "t.test", label = "p.signif"  # *, **, ***\n  ) +\n  theme_classic(base_size = 10) +          # 期刊常用 base 10pt\n  theme(\n    legend.position  = "none",             # 分组已在 x 轴体现\n    axis.text        = element_text(size=9, color="black"),\n    axis.title       = element_text(size=10, face="bold"),\n    plot.title       = element_text(size=11, face="bold",\n                                    hjust=0.5),\n    plot.margin      = margin(5,5,5,5,"mm")\n  )`,
    trap:'⚠️ 陷阱：字号用 ggplot2 默认的 11pt，但期刊要求印刷后坐标轴标签不小于 7pt，需按实际输出尺寸换算。', color:'#E07A7A' },
  { num:'06', title:'导出发表', en:'Export & Publish', icon:'🚀', desc:'按期刊要求导出正确的格式、分辨率和尺寸，避免返修。',
    code: `# Nature 系列期刊导出规范\n# 单栏（89mm）/ 1.5 栏（120mm）/ 双栏（183mm），300 DPI，PDF/EPS\n\nggsave(\n  "figure1.pdf",\n  plot   = p_final,\n  width  = 89,          # 单栏：89mm\n  height = 60,          # 高宽比约 0.67\n  units  = "mm",\n  dpi    = 300,         # 矢量格式 dpi 参数影响嵌入字体\n  device = "pdf"\n)\n\n# 位图备份（用于预览/提交系统）\nggsave(\n  "figure1.tiff",\n  plot   = p_final,\n  width  = 89, height = 60, units = "mm",\n  dpi    = 300,\n  compression = "lzw"   # TIFF LZW 无损压缩\n)`,
    trap:'⚠️ 陷阱：用 ggsave 导出时忘记指定 units="mm"，默认 inches 会导致尺寸翻倍，不符合期刊规定的列宽要求。', color:'#7EC8E3' },
];

// ══════════════════════════════════════════════════════
//  格式数据
// ══════════════════════════════════════════════════════

const FORMAT_DATA = [
  {
    id: 'svg',
    name: 'SVG',
    type: 'vector',
    color: '#7EC8E3',
    best: '网页、演示文稿、可编辑图表',
    dpi: '无限缩放（分辨率无关）',
    size: '极小（通常 <100KB）',
    support: 'Inkscape / Illustrator / 浏览器',
    desc: 'Scalable Vector Graphics，基于 XML 的矢量格式。图形由数学路径描述，无论放大到多少倍都保持清晰。可在 Illustrator 中直接编辑各元素，是科研图表后期精调的首选中间格式。',
    code: `# ggplot2 导出 SVG\nsvglite::svglite("figure.svg", width=3.5, height=2.5)\nprint(p_final)\ndev.off()\n\n# 或用 ggsave\nggsave("figure.svg", p_final,\n       width=89, height=60, units="mm",\n       device=svglite::svglite)`,
  },
  {
    id: 'pdf',
    name: 'PDF',
    type: 'vector',
    color: '#E07A7A',
    best: 'Nature / Science 等顶刊提交',
    dpi: '矢量（内嵌字体）',
    size: '小（通常 100KB–2MB）',
    support: 'LaTeX / Illustrator / Acrobat',
    desc: 'Portable Document Format，内嵌矢量图形和字体，是大多数高影响力期刊接受的首选格式。ggsave 生成的 PDF 嵌入所有字体，可直接提交给 Nature、Science、Cell 等期刊，无需担心字体缺失问题。',
    code: `# ggsave 导出 PDF（最常用）\nggsave(\n  "figure1.pdf",\n  plot   = p_final,\n  width  = 89,     # 单栏 89mm\n  height = 60,\n  units  = "mm",\n  dpi    = 300\n)\n\n# 检查字体嵌入（Linux/Mac）\n# pdffonts figure1.pdf`,
  },
  {
    id: 'png',
    name: 'PNG',
    type: 'raster',
    color: '#95D5B2',
    best: '网页展示、演示文稿插图',
    dpi: '300 DPI（印刷）/ 150 DPI（屏幕）',
    size: '中等（300DPI 约 1–5MB）',
    support: '所有程序通用',
    desc: 'Portable Network Graphics，无损压缩位图格式，支持透明背景。适合网页展示和演示文稿，但放大后会出现像素化。期刊提交时需保证 300 DPI 以上，并按实际印刷尺寸计算像素数。',
    code: `# ggsave 导出高分辨率 PNG\nggsave(\n  "figure1.png",\n  plot   = p_final,\n  width  = 89,\n  height = 60,\n  units  = "mm",\n  dpi    = 300      # 单栏 89mm × 300DPI = 1051px\n)\n\n# 透明背景\nggsave("figure1_transparent.png", p_final,\n       bg = "transparent",\n       width=89, height=60, units="mm", dpi=300)`,
  },
  {
    id: 'tiff',
    name: 'TIFF',
    type: 'raster',
    color: '#F0B27A',
    best: 'Cell / Lancet / NEJM 等期刊提交',
    dpi: '300 DPI（半色调）/ 600 DPI（线图）',
    size: '大（300DPI 约 5–20MB，LZW 压缩后减半）',
    support: 'Photoshop / Illustrator / ImageJ',
    desc: 'Tagged Image File Format，无损位图格式，是 Cell Press、Elsevier、Wiley 期刊体系要求的标准格式。支持 LZW 无损压缩（文件大小约为未压缩的 40–60%）。R 的 ggsave 支持 compression 参数直接输出压缩 TIFF。',
    code: `# ggsave 导出 TIFF（LZW 无损压缩）\nggsave(\n  "figure1.tiff",\n  plot        = p_final,\n  width       = 89,\n  height      = 60,\n  units       = "mm",\n  dpi         = 300,\n  compression = "lzw"   # 无损压缩，大幅减小体积\n)\n\n# Cell 要求 600 DPI 线图\nggsave("figure1_hires.tiff", p_final,\n       width=89, height=60, units="mm",\n       dpi=600, compression="lzw")`,
  },
  {
    id: 'eps',
    name: 'EPS',
    type: 'vector',
    color: '#B8B8E8',
    best: 'LaTeX 论文排版',
    dpi: '矢量（与 PDF 等效）',
    size: '小–中（取决于复杂度）',
    support: 'LaTeX / Illustrator / Ghostscript',
    desc: 'Encapsulated PostScript，历史悠久的矢量格式，在 LaTeX 排版体系中广泛使用（\\includegraphics）。现代期刊投稿系统已逐渐转向 PDF，但部分老牌期刊（如某些 Springer 期刊）的 LaTeX 模板仍要求 EPS 格式。',
    code: `# ggsave 导出 EPS\nggsave(\n  "figure1.eps",\n  plot  = p_final,\n  width = 89,\n  height= 60,\n  units = "mm"\n)\n\n# LaTeX 中使用\n# \\usepackage{graphicx}\n# \\includegraphics[width=\\columnwidth]{figure1.eps}`,
  },
];

// ══════════════════════════════════════════════════════
//  期刊数据
// ══════════════════════════════════════════════════════

const JOURNAL_DATA = [
  {
    name: 'Nature',
    group: 'Nature Portfolio',
    single: '89mm',
    oneHalf: '120mm',
    double: '183mm',
    dpi_line: 1000,
    dpi_halftone: 300,
    dpi_combo: 500,
    formats: 'PDF / EPS / TIFF / PSD',
    color: 'RGB (屏幕) / CMYK (印刷，需向编辑确认)',
    maxSize: '单图 ≤ 10MB',
    fonts: '嵌入所有字体；推荐 Helvetica / Arial',
    notes: '图片在投稿时可先提交低分辨率，接受后再上传高分辨率版本。坐标轴标签不小于 7pt（印刷后）。',
  },
  {
    name: 'Science',
    group: 'AAAS',
    single: '57mm',
    oneHalf: '120mm',
    double: '178mm',
    dpi_line: 1000,
    dpi_halftone: 300,
    dpi_combo: 500,
    formats: 'PDF / EPS / TIFF',
    color: 'CMYK 优先（印刷版），RGB 可接受',
    maxSize: '单图 ≤ 20MB',
    fonts: '嵌入字体；禁止 Times New Roman',
    notes: 'Science 单栏比 Nature 更窄（57mm vs 89mm），需特别注意字号换算。图注文字要简洁，不超过 200 字。',
  },
  {
    name: 'Cell',
    group: 'Cell Press / Elsevier',
    single: '85mm',
    oneHalf: '114mm',
    double: '174mm',
    dpi_line: 600,
    dpi_halftone: 300,
    dpi_combo: 600,
    formats: 'PDF / EPS / TIFF / PSD',
    color: 'RGB（提交时），CMYK（印刷转换由期刊处理）',
    maxSize: '单图 ≤ 20MB',
    fonts: '嵌入字体；推荐 Arial / Helvetica',
    notes: 'Cell 系列线图要求 600 DPI TIFF（而非 300），注意与 Nature 的区别。接受 PSD 分层文件，便于编辑后期调整。',
  },
  {
    name: 'PNAS',
    group: 'National Academy of Sciences',
    single: '87mm',
    oneHalf: '114mm',
    double: '178mm',
    dpi_line: 1000,
    dpi_halftone: 300,
    dpi_combo: 500,
    formats: 'PDF / EPS / TIFF / PNG',
    color: 'RGB 或 CMYK 均可',
    maxSize: '单图 ≤ 10MB',
    fonts: '嵌入字体；Arial / Helvetica 常用',
    notes: 'PNAS 接受 PNG 格式（其他顶刊较少），但建议仍使用 TIFF/PDF。图表需清楚标注实验重复次数和统计方法。',
  },
  {
    name: 'Lancet',
    group: 'Elsevier / Lancet',
    single: '83mm',
    oneHalf: 'N/A',
    double: '171mm',
    dpi_line: 1000,
    dpi_halftone: 300,
    dpi_combo: 500,
    formats: 'TIFF / EPS',
    color: 'CMYK（印刷导向）',
    maxSize: '单图 ≤ 5MB',
    fonts: '嵌入字体；最小 6pt',
    notes: 'Lancet 系列医学期刊对图表格式要求较严格，偏好 TIFF。统计图必须包含置信区间或误差线，数据点不得少于 5 个。',
  },
  {
    name: 'NEJM',
    group: 'Massachusetts Medical Society',
    single: '84mm',
    oneHalf: '113mm',
    double: '171mm',
    dpi_line: 1000,
    dpi_halftone: 300,
    dpi_combo: 600,
    formats: 'PDF / TIFF / EPS',
    color: 'CMYK 或 Grayscale',
    maxSize: '单图 ≤ 10MB',
    fonts: '嵌入字体；Times New Roman 或 Arial',
    notes: 'NEJM 允许使用 Times New Roman（罕见的顶刊）。临床数据图表须包含样本量（n）。彩色图表在线版免费，印刷版收费。',
  },
];

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════

export function render() {
  // 生成工作流步骤指示器 HTML
  const stepDots = WORKFLOW_STEPS.map((s, i) => `
    <div class="p10-wf-dot" data-step="${i}" id="p10-wf-dot-${i}">
      <div class="p10-wf-dot-circle" style="--step-color:${s.color};">
        <span class="p10-wf-dot-num">${s.num}</span>
      </div>
      <span class="p10-wf-dot-label">${s.title}</span>
    </div>
    ${i < WORKFLOW_STEPS.length - 1 ? `<div class="p10-wf-connector" id="p10-conn-${i}"></div>` : ''}
  `).join('');

  // 生成工作流面板 HTML
  const stepPanels = WORKFLOW_STEPS.map((s, i) => `
    <div class="p10-wf-panel" id="p10-wf-panel-${i}" data-step="${i}">
      <div class="p10-wf-panel-inner">
        <div class="p10-wf-panel-header">
          <span class="p10-wf-step-num" style="color:${s.color};">${s.num}</span>
          <span class="p10-wf-step-icon">${s.icon}</span>
        </div>
        <h3 class="p10-wf-step-title">${s.title}</h3>
        <p class="p10-wf-step-en">${s.en}</p>
        <p class="p10-wf-step-desc">${s.desc}</p>
        <div class="p10-wf-code-container" id="p10-wf-code-${i}"></div>
        <div class="p10-wf-trap">
          <p class="p10-wf-trap-text">${s.trap}</p>
        </div>
      </div>
    </div>
  `).join('');

  // 生成格式标签和面板
  const formatTabs = FORMAT_DATA.map((f, i) => `
    <button class="p10-format-tab${i === 0 ? ' active' : ''}" data-fmt="${i}" aria-selected="${i === 0}">
      <span class="p10-fmt-tab-badge" style="background:${f.color};"></span>
      ${f.name}
      <span class="p10-fmt-tab-type">${f.type === 'vector' ? '矢量' : '位图'}</span>
    </button>
  `).join('');

  const formatPanels = FORMAT_DATA.map((f, i) => `
    <div class="p10-format-panel${i === 0 ? ' active' : ''}" data-fmt="${i}" role="tabpanel">
      <div class="p10-format-panel-inner">
        <!-- 左侧：信息 -->
        <div class="p10-fmt-info">
          <div class="p10-fmt-badge" style="background:${f.color}15;border:1px solid ${f.color}40;">
            <span class="p10-fmt-badge-type" style="color:${f.color};">${f.type === 'vector' ? '矢量格式' : '位图格式'}</span>
            <span class="p10-fmt-badge-name" style="color:${f.color};">${f.name}</span>
          </div>
          <p class="p10-fmt-desc">${f.desc}</p>
          <div class="p10-fmt-specs">
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">最适用</span>
              <span class="p10-fmt-spec-val">${f.best}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">分辨率</span>
              <span class="p10-fmt-spec-val">${f.dpi}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">文件大小</span>
              <span class="p10-fmt-spec-val">${f.size}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">软件支持</span>
              <span class="p10-fmt-spec-val">${f.support}</span>
            </div>
          </div>
        </div>
        <!-- 右侧：SVG 预览 + 代码 -->
        <div class="p10-fmt-visual">
          <div class="p10-fmt-svg-container" id="p10-fmt-svg-${i}">
            <div class="p10-fmt-svg-placeholder">格式示意图</div>
          </div>
          <div class="p10-fmt-code-container" id="p10-fmt-code-${i}"></div>
        </div>
      </div>
    </div>
  `).join('');

  // 生成期刊选项
  const journalOptions = JOURNAL_DATA.map(j =>
    `<option value="${j.name}">${j.name}（${j.group}）</option>`
  ).join('');

  return `
<div class="page-scroll">

<style>
/* ══════════════════════════════════════════════════════
   P10 专属样式
   ══════════════════════════════════════════════════════ */

/* ── Hero ── */
.p10-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
}

.p10-hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(126,200,227,0.18) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  animation: p10-halo-a 8s ease-in-out infinite alternate;
  pointer-events: none;
}

.p10-hero::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(224,122,122,0.14) 0%, transparent 70%);
  bottom: -80px;
  right: -80px;
  animation: p10-halo-b 10s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes p10-halo-a {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(60px, 40px) scale(1.15); }
}

@keyframes p10-halo-b {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-50px, -30px) scale(1.1); }
}

.p10-hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  text-align: center;
  padding: 0 var(--space-lg);
}

.p10-hero-tagline {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  max-width: 560px;
  line-height: 1.8;
  margin-top: var(--space-sm);
}

.scroll-hint {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  letter-spacing: 0.1em;
  margin-top: var(--space-lg);
  animation: p10-bounce 2.5s ease-in-out infinite;
}

@keyframes p10-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50%       { transform: translateY(6px); opacity: 1; }
}

/* ── Hero Stats ── */
.p10-hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin: var(--space-md) 0;
}

.p10-hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.p10-hero-stat-num {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.03em;
}

.p10-hero-stat-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.p10-hero-stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .p10-hero-stats {
    gap: var(--space-md);
  }
  .p10-hero-stat-num {
    font-size: 2rem;
  }
}

/* ── Workflow Section ── */
.p10-workflow-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-section-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: var(--space-sm);
}

.p10-section-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  line-height: 1.15;
}

.p10-section-sub {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  text-align: center;
  margin-top: var(--space-sm);
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.p10-section-header {
  margin-bottom: var(--space-xl);
}

/* 工作流主体 */
.p10-wf-body {
  display: flex;
  gap: var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  align-items: flex-start;
}

.p10-wf-left {
  width: 320px;
  flex-shrink: 0;
  will-change: transform;
  padding-top: var(--space-md);
}

.p10-wf-right {
  flex: 1;
  min-width: 0;
}

/* 步骤指示器 */
.p10-wf-step-indicator {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  padding: var(--space-md) 0;
}

.p10-wf-dot {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  padding: 6px 0;
  transition: opacity var(--t-base);
}

.p10-wf-dot:not(.active) {
  opacity: 0.45;
}

.p10-wf-dot:hover {
  opacity: 0.85;
}

.p10-wf-dot-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--step-color, var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--t-base);
  flex-shrink: 0;
}

.p10-wf-dot.active .p10-wf-dot-circle {
  background: var(--step-color, var(--accent));
  box-shadow: 0 0 0 4px rgba(126, 200, 227, 0.3);
}

.p10-wf-dot-num {
  font-family: var(--font-code);
  font-size: var(--text-small);
  font-weight: 700;
  color: var(--text-on-light-2);
  transition: color var(--t-base);
}

.p10-wf-dot.active .p10-wf-dot-num {
  color: #fff;
}

.p10-wf-dot-label {
  font-family: var(--font-heading);
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--text-on-light);
}

.p10-wf-connector {
  width: 2px;
  height: 24px;
  background: var(--border-light);
  margin-left: 21px;
}
.p10-wf-connector.passed {
  background: var(--accent);
}

/* 工作流面板 */
.p10-wf-panel {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--space-xl) 0;
}

.p10-wf-panel-inner {
  width: 100%;
}

.p10-wf-panel-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.p10-wf-step-num {
  font-family: var(--font-code);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
}

.p10-wf-step-icon {
  font-size: 2rem;
}

.p10-wf-step-title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-light);
  margin-bottom: 4px;
}

.p10-wf-step-en {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-light-3);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.p10-wf-step-desc {
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  line-height: 1.8;
  max-width: 560px;
  margin-bottom: var(--space-md);
}

.p10-wf-code-container {
  margin-bottom: var(--space-md);
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 200px;
  background: var(--bg-dark);
}

.p10-wf-trap {
  background: rgba(224, 122, 122, 0.08);
  border-left: 3px solid #E07A7A;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
}

.p10-wf-trap-text {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  line-height: 1.7;
}

/* ── Format Section ── */
.p10-format-section {
  background: var(--bg-dark);
  color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-format-section .p10-section-title {
  color: var(--text-on-dark);
}

.p10-format-section .p10-section-sub {
  color: var(--text-on-dark-2);
}

.p10-format-tabs {
  display: flex;
  gap: 4px;
  background: var(--bg-dark-elevated);
  padding: 4px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.p10-format-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-on-dark-2);
  font-family: var(--font-heading);
  font-size: var(--text-small);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--t-fast);
  white-space: nowrap;
  min-height: 44px;
}

.p10-format-tab:hover {
  color: var(--text-on-dark);
  background: rgba(255,255,255,0.05);
}

.p10-format-tab.active {
  background: var(--bg-dark-deep);
  color: var(--text-on-dark);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.p10-fmt-tab-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.p10-fmt-tab-type {
  font-size: 11px;
  opacity: 0.6;
  font-family: var(--font-code);
}

.p10-format-panel {
  display: none;
}

.p10-format-panel.active {
  display: block;
}

.p10-format-panel-inner {
  display: flex;
  gap: var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-start;
}

.p10-fmt-info {
  flex: 1;
  min-width: 0;
}

.p10-fmt-badge {
  display: inline-flex;
  flex-direction: column;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  gap: 2px;
}

.p10-fmt-badge-type {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.p10-fmt-badge-name {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.p10-fmt-desc {
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  line-height: 1.8;
  margin-bottom: var(--space-md);
}

.p10-fmt-specs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.p10-fmt-spec-row {
  display: flex;
  gap: var(--space-sm);
  align-items: baseline;
  font-size: var(--text-small);
}

.p10-fmt-spec-label {
  color: var(--text-on-dark-3);
  width: 80px;
  flex-shrink: 0;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.05em;
}

.p10-fmt-spec-val {
  color: var(--text-on-dark);
  line-height: 1.5;
}

.p10-fmt-visual {
  flex: 1;
  min-width: 0;
}

.p10-fmt-svg-container {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
  border: 1px solid var(--border-dark);
  overflow: hidden;
}

.p10-fmt-svg-placeholder {
  color: var(--text-on-dark-3);
  font-size: var(--text-small);
  font-family: var(--font-code);
}

.p10-fmt-code-container {
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 160px;
  background: var(--bg-dark-deep);
}

/* ── DPI Section ── */
.p10-dpi-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-dpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  max-width: 1100px;
  margin: 0 auto;
}

.p10-dpi-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.p10-dpi-canvas-wrap {
  width: 100%;
  aspect-ratio: 1;
  background: var(--bg-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
}

.p10-dpi-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.p10-dpi-value {
  font-family: var(--font-code);
  font-size: var(--text-heading);
  font-weight: 700;
  color: var(--text-on-light);
  letter-spacing: -0.02em;
}

.p10-dpi-label {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  text-align: center;
  line-height: 1.4;
}

/* 移动端 DPI Tabs */
.p10-dpi-tabs-mobile {
  display: none;
}

.p10-dpi-mobile-tabs-bar {
  display: flex;
  gap: 4px;
  background: var(--bg-light-alt);
  padding: 4px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  justify-content: center;
}

.p10-dpi-mobile-tab {
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-code);
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}

.p10-dpi-mobile-tab.active {
  background: var(--bg-dark);
  color: var(--text-on-dark);
}

.p10-dpi-mobile-canvas-wrap {
  width: 100%;
  aspect-ratio: 1;
  max-width: 360px;
  margin: 0 auto;
  background: var(--bg-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.p10-dpi-mobile-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Calculator Section ── */
.p10-calc-section {
  background: var(--bg-dark);
  color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-calc-section .p10-section-title {
  color: var(--text-on-dark);
}

.p10-calc-section .p10-section-sub {
  color: var(--text-on-dark-2);
}

.p10-calc-layout {
  display: flex;
  gap: var(--space-xl);
  max-width: 1000px;
  margin: 0 auto;
  align-items: flex-start;
}

.p10-calc-input-panel {
  flex: 0 0 340px;
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  border: 1px solid var(--border-dark);
}

.p10-calc-title {
  font-family: var(--font-heading);
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--text-on-dark);
  margin-bottom: var(--space-md);
}

.p10-calc-field {
  margin-bottom: var(--space-md);
}

.p10-calc-label {
  display: block;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-dark-3);
  margin-bottom: 6px;
}

.p10-calc-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.p10-calc-input {
  flex: 1;
  background: var(--bg-dark-deep);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 1rem;
  padding: 10px 14px;
  min-height: 44px;
  transition: border-color var(--t-fast);
  width: 100%;
}

.p10-calc-input:focus {
  outline: none;
  border-color: var(--accent);
}

.p10-calc-unit {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  flex-shrink: 0;
}

.p10-calc-select {
  width: 100%;
  background: var(--bg-dark-deep);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 1rem;
  padding: 10px 14px;
  min-height: 44px;
  cursor: pointer;
  transition: border-color var(--t-fast);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236e6e73' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.p10-calc-select:focus {
  outline: none;
  border-color: var(--accent);
}

.p10-calc-result-panel {
  flex: 1;
  min-width: 0;
}

.p10-calc-result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.p10-calc-result-card {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border: 1px solid var(--border-dark);
}

.p10-calc-result-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.p10-calc-result-val {
  font-family: var(--font-code);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
}

.p10-calc-result-unit {
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  font-weight: 400;
}

.p10-calc-result-value {
  font-family: var(--font-code);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
}

.p10-calc-result-note {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  margin: 4px 0 0;
  line-height: 1.4;
}

.p10-calc-code-wrap {
  background: var(--bg-dark-deep);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  border: 1px solid var(--border-dark);
  overflow-x: auto;
}

.p10-calc-code-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}

#p10-calc-code {
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--text-on-dark);
  line-height: 1.7;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  background: transparent;
  padding: 0;
}

.p10-calc-warning {
  background: rgba(255, 149, 0, 0.1);
  border-left: 3px solid var(--color-warning);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
  display: none;
}

.p10-calc-warning.visible {
  display: block;
}

.p10-calc-warning-text {
  font-size: var(--text-small);
  color: var(--color-warning);
  line-height: 1.6;
}

/* ── Journal Section ── */
.p10-journal-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-journal-search {
  max-width: 540px;
  margin: 0 auto var(--space-xl);
}

.p10-journal-select-label {
  display: block;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-light-3);
  margin-bottom: 8px;
  text-align: center;
}

.p10-journal-select {
  width: 100%;
  background: var(--bg-light-elevated);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-on-light);
  font-family: var(--font-heading);
  font-size: 1rem;
  padding: 14px 20px;
  min-height: 52px;
  cursor: pointer;
  transition: border-color var(--t-fast);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2386868b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px center;
  padding-right: 44px;
  box-shadow: var(--shadow-sm);
}

.p10-journal-select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

#p10-journal-result {
  display: none;
  max-width: 900px;
  margin: 0 auto;
}

#p10-journal-result.visible {
  display: block;
}

#p10-journal-card {
  background: var(--bg-light-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.p10-journal-card-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.p10-journal-card-name {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-light);
}

.p10-journal-card-group {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  margin-top: 4px;
}

.p10-journal-card-body {
  padding: var(--space-lg);
}

.p10-journal-spec-section {
  margin-bottom: var(--space-md);
}

.p10-journal-spec-title {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-light-3);
  margin-bottom: var(--space-sm);
}

.p10-journal-width-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-journal-width-cell {
  background: var(--bg-light-alt);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}

.p10-journal-width-label {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  display: block;
  margin-bottom: 4px;
}

.p10-journal-width-val {
  font-family: var(--font-code);
  font-size: var(--text-heading);
  font-weight: 700;
  color: var(--accent);
}

.p10-journal-dpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-journal-dpi-cell {
  background: var(--bg-light-alt);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}

.p10-journal-dpi-label {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  display: block;
  margin-bottom: 4px;
}

.p10-journal-dpi-val {
  font-family: var(--font-code);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-on-light);
}

.p10-journal-spec-row {
  display: flex;
  gap: var(--space-sm);
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: var(--text-small);
}

.p10-journal-spec-row:last-child {
  border-bottom: none;
}

.p10-journal-spec-key {
  color: var(--text-on-light-3);
  width: 88px;
  flex-shrink: 0;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.04em;
}

.p10-journal-spec-val {
  color: var(--text-on-light);
  line-height: 1.5;
  flex: 1;
}

.p10-journal-notes {
  background: rgba(126, 200, 227, 0.07);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
  margin-top: var(--space-md);
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  line-height: 1.7;
}

/* ══════════════════════════════════════════════════════
   响应式断点
   ══════════════════════════════════════════════════════ */

@media (max-width: 900px) {
  .p10-wf-body {
    gap: var(--space-lg);
  }
  .p10-wf-left {
    width: 260px;
  }
}

@media (max-width: 768px) {
  /* 工作流移动端：隐藏左侧指示器，只显示面板 */
  .p10-wf-left {
    display: none;
  }
  .p10-wf-body {
    flex-direction: column;
  }
  .p10-wf-right {
    width: 100%;
  }
  .p10-wf-panel {
    min-height: auto;
    padding: var(--space-lg) 0;
    border-bottom: 1px solid var(--border-light);
  }

  /* 格式面板移动端：堆叠 */
  .p10-format-panel-inner {
    flex-direction: column;
    gap: var(--space-md);
  }
  .p10-format-tabs {
    gap: 2px;
  }
  .p10-format-tab {
    padding: 8px 12px;
    font-size: 13px;
  }

  /* DPI：桌面网格隐藏，移动端 Tab 显示 */
  .p10-dpi-grid {
    display: none;
  }
  .p10-dpi-tabs-mobile {
    display: block;
    max-width: 480px;
    margin: 0 auto;
  }

  /* 计算器移动端：堆叠 */
  .p10-calc-layout {
    flex-direction: column;
    gap: var(--space-md);
  }
  .p10-calc-input-panel {
    flex: none;
    width: 100%;
  }

  /* 期刊卡片 */
  .p10-journal-width-grid,
  .p10-journal-dpi-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .p10-hero-content {
    padding: 0 var(--space-sm);
  }
  .p10-format-tabs {
    flex-direction: column;
  }
  .p10-format-tab {
    width: 100%;
    justify-content: flex-start;
  }
  .p10-calc-result-grid {
    grid-template-columns: 1fr;
  }
  .p10-journal-width-grid,
  .p10-journal-dpi-grid {
    grid-template-columns: 1fr;
  }
  .p10-journal-card-header {
    flex-direction: column;
    gap: var(--space-sm);
  }
}

@media (max-width: 768px) {
  section[id] {
    scroll-margin-top: 56px;
  }
}
</style>

<!-- ══════════════════════════════════════════════════════
     Section 1: Hero
     ══════════════════════════════════════════════════════ -->
<section class="section-dark section-hero-full p10-hero" id="p10-hero">
  <div class="p10-hero-content">
    <p class="hero-eyebrow" style="opacity:0;" id="p10-eyebrow">Module 01 / Page 10</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;" id="p10-hero-title">工作流与导出</h1>
    <p class="page-hero-sub" style="opacity:0;" id="p10-hero-sub">Research Workflow &amp; Export</p>
    <p class="p10-hero-tagline" style="opacity:0;" id="p10-hero-tagline">
      从原始数据到顶刊图表，掌握每一步的决策与规范——<br>
      让你的图表在第一次提交时就符合期刊要求。
    </p>
    <!-- Hero stats -->
    <div class="p10-hero-stats" id="p10-hero-stats" style="opacity:0;">
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="6">6</span>
        <span class="p10-hero-stat-label">核心步骤</span>
      </div>
      <div class="p10-hero-stat-divider"></div>
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="5">5</span>
        <span class="p10-hero-stat-label">导出格式</span>
      </div>
      <div class="p10-hero-stat-divider"></div>
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="6">6</span>
        <span class="p10-hero-stat-label">期刊速查</span>
      </div>
    </div>
    <nav class="hero-quicknav" id="p10-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p10-workflow">工作流六步</button>
      <button class="hero-quicknav__item" data-target="#p10-format">格式对比</button>
      <button class="hero-quicknav__item" data-target="#p10-dpi">DPI 对比</button>
      <button class="hero-quicknav__item" data-target="#p10-calc">分辨率计算器</button>
      <button class="hero-quicknav__item" data-target="#p10-journal">期刊速查</button>
    </nav>
    <p class="scroll-hint" id="p10-scroll-hint" style="opacity:0">↓ 向下探索</p>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 2: Workflow
     ══════════════════════════════════════════════════════ -->
<section class="p10-workflow-section" id="p10-workflow">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Workflow</p>
    <h2 class="p10-section-title">出版级图表工作流</h2>
    <p class="p10-section-sub">六个核心步骤，覆盖从数据整理到最终导出的完整流程。每一步都有典型陷阱——提前知道，提前避开。</p>
  </div>
  <div class="p10-wf-body" id="p10-wf-body">
    <!-- 左侧：步骤指示器 -->
    <div class="p10-wf-left" id="p10-wf-left">
      <div class="p10-wf-step-indicator" id="p10-wf-indicator">
        ${stepDots}
      </div>
    </div>
    <!-- 右侧：面板 -->
    <div class="p10-wf-right" id="p10-wf-right">
      ${stepPanels}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 3: Format Comparison
     ══════════════════════════════════════════════════════ -->
<section class="p10-format-section" id="p10-format">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">File Formats</p>
    <h2 class="p10-section-title" style="color:var(--text-on-dark);">图像格式对比</h2>
    <p class="p10-section-sub" style="color:var(--text-on-dark-2);">SVG、PDF、PNG、TIFF、EPS——每种格式都有其最适用的场景。选错格式会导致期刊返修。</p>
  </div>
  <!-- 标签栏 -->
  <div class="p10-format-tabs" id="p10-format-tabs" role="tablist">
    ${formatTabs}
  </div>
  <!-- 内容面板 -->
  <div id="p10-format-panels">
    ${formatPanels}
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 4: DPI Comparison
     ══════════════════════════════════════════════════════ -->
<section class="p10-dpi-section" id="p10-dpi">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Resolution</p>
    <h2 class="p10-section-title">DPI 视觉对比</h2>
    <p class="p10-section-sub">同一图像在不同分辨率下的清晰度差异。72 DPI 仅适合屏幕预览，期刊提交至少需要 300 DPI。</p>
  </div>

  <!-- 桌面端：4 格网格 -->
  <div class="p10-dpi-grid" id="p10-dpi-grid">
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-72" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">72 DPI</div>
      <div class="p10-dpi-label">屏幕预览<br>网页/演示文稿草稿</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-150" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">150 DPI</div>
      <div class="p10-dpi-label">过渡分辨率<br>不推荐用于期刊</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-300" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">300 DPI</div>
      <div class="p10-dpi-label">半色调标准<br>Nature / Cell 半色调要求</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-600" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">600 DPI</div>
      <div class="p10-dpi-label">线图标准<br>Cell / Science 线图要求</div>
    </div>
  </div>

  <!-- 移动端：Tab + 单画布 -->
  <div class="p10-dpi-tabs-mobile" id="p10-dpi-tabs-mobile">
    <div class="p10-dpi-mobile-tabs-bar">
      <button class="p10-dpi-mobile-tab active" data-dpi="72">72</button>
      <button class="p10-dpi-mobile-tab" data-dpi="150">150</button>
      <button class="p10-dpi-mobile-tab" data-dpi="300">300</button>
      <button class="p10-dpi-mobile-tab" data-dpi="600">600</button>
    </div>
    <div class="p10-dpi-mobile-canvas-wrap">
      <canvas id="p10-dpi-mobile-canvas" width="300" height="300"></canvas>
    </div>
    <p style="text-align:center;font-family:var(--font-code);font-size:var(--text-small);color:var(--text-on-light-2);margin-top:var(--space-sm);" id="p10-dpi-mobile-label">72 DPI — 屏幕预览</p>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 5: Resolution Calculator
     ══════════════════════════════════════════════════════ -->
<section class="p10-calc-section" id="p10-calc">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Calculator</p>
    <h2 class="p10-section-title" style="color:var(--text-on-dark);">分辨率计算器</h2>
    <p class="p10-section-sub" style="color:var(--text-on-dark-2);">输入图表的物理尺寸和目标 DPI，自动计算像素数、文件大小，并生成 ggsave 代码。</p>
  </div>

  <div class="p10-calc-layout">
    <!-- 输入面板 -->
    <div class="p10-calc-input-panel">
      <h3 class="p10-calc-title">参数输入</h3>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-width">宽度（cm）</label>
        <div class="p10-calc-input-row">
          <input
            type="number"
            id="p10-calc-width"
            class="p10-calc-input"
            value="8.9"
            min="1"
            max="100"
            step="0.1"
            inputmode="decimal"
          >
          <span class="p10-calc-unit">cm</span>
        </div>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-height">高度（cm）</label>
        <div class="p10-calc-input-row">
          <input
            type="number"
            id="p10-calc-height"
            class="p10-calc-input"
            value="6.0"
            min="1"
            max="100"
            step="0.1"
            inputmode="decimal"
          >
          <span class="p10-calc-unit">cm</span>
        </div>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-dpi">DPI</label>
        <select id="p10-calc-dpi" class="p10-calc-select">
          <option value="72">72 DPI — 屏幕草稿</option>
          <option value="150">150 DPI — 低质量位图</option>
          <option value="300" selected>300 DPI — 半色调标准</option>
          <option value="600">600 DPI — 线图标准</option>
          <option value="1000">1000 DPI — Nature 线图</option>
        </select>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-format">格式</label>
        <select id="p10-calc-format" class="p10-calc-select">
          <option value="png">PNG（无损位图）</option>
          <option value="tiff">TIFF（无损位图，LZW）</option>
          <option value="jpeg">JPEG（有损位图）</option>
          <option value="svg">PDF / SVG（矢量，ggsave 生成 PDF）</option>
        </select>
      </div>
    </div>

    <!-- 结果面板 -->
    <div class="p10-calc-result-panel">
      <div class="p10-calc-result-grid">
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">宽度像素</div>
          <div class="p10-calc-result-val" id="p10-res-w">1051 <span class="p10-calc-result-unit">px</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">高度像素</div>
          <div class="p10-calc-result-val" id="p10-res-h">709 <span class="p10-calc-result-unit">px</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">总像素</div>
          <div class="p10-calc-result-val" id="p10-res-mp">0.74 <span class="p10-calc-result-unit">MP</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">估算大小</div>
          <div class="p10-calc-result-val" id="p10-res-size">2.1 <span class="p10-calc-result-unit">MB</span></div>
        </div>
      </div>

      <div class="p10-calc-code-wrap">
        <div class="p10-calc-code-label">ggsave 代码</div>
        <pre id="p10-calc-code">ggsave(
  "figure.png",
  plot   = p_final,
  width  = 8.9,
  height = 6.0,
  units  = "cm",
  dpi    = 300
)</pre>
      </div>

      <div class="p10-calc-warning" id="p10-calc-warning">
        <p class="p10-calc-warning-text" id="p10-calc-warning-text"></p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 6: Journal Reference
     ══════════════════════════════════════════════════════ -->
<section class="p10-journal-section" id="p10-journal">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Journal Guide</p>
    <h2 class="p10-section-title">期刊投稿速查</h2>
    <p class="p10-section-sub">选择目标期刊，快速查看图表尺寸、分辨率、格式和字体要求。</p>
  </div>

  <div class="p10-journal-search">
    <label class="p10-journal-select-label" for="p10-journal-select">选择期刊</label>
    <select id="p10-journal-select" class="p10-journal-select">
      <option value="" disabled selected>— 请选择期刊 —</option>
      ${journalOptions}
    </select>
  </div>

  <div id="p10-journal-result">
    <div id="p10-journal-card">
      <!-- 由 JS 填充 -->
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Footer CTA
     ══════════════════════════════════════════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">10 / 10</p>
  <p class="page-footer-quote">"每一张顶刊图表的背后，都是一套被反复验证的工作流。"</p>
  <p class="page-footer-desc">
    模块一「科研数据可视化」到此完结。你已掌握色彩理论、R/Python 绘图、图表选择与导出规范。<br>
    模块二将介绍 AI 辅助科研绘图——用 Midjourney、Stable Diffusion 与 ChatGPT 加速你的科研视觉创作。
  </p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p10-prev-btn">← 上一页：Python 可视化</button>
    <button class="btn-primary" id="p10-next-btn">进入模块二 →</button>
  </div>
</section>

</div>
`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  // 1. quicknav 点击跳转
  document.querySelectorAll('#p10-quicknav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 2. Hero GSAP 入场 (gsap is available as window.gsap from CDN)
  const gsap = window.gsap;
  if (gsap) {
    gsap.fromTo('#p10-hero .hero-eyebrow',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .page-hero-title',
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .page-hero-sub',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .p10-hero-tagline',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: 'power3.out' });
    gsap.fromTo('#p10-hero-stats',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.65, ease: 'power3.out',
        onComplete: () => {
          document.querySelectorAll('.p10-hero-stat-num').forEach(el => {
            const target = parseInt(el.dataset.target) || 0;
            let current = 0;
            const step = () => {
              current++;
              el.textContent = current;
              if (current < target) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }
      });
    gsap.fromTo('#p10-quicknav',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.72, ease: 'power3.out' });
    gsap.fromTo('#p10-hero .scroll-hint',
      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: 'power3.out' });
  }

  // 3. Footer 导航
  document.getElementById('p10-prev-btn')?.addEventListener('click', () => navigateTo('m1-p9'));
  document.getElementById('p10-next-btn')?.addEventListener('click', () => navigateTo('m2-p1'));

  // 4. 初始化工作流（其他模块 Task 3/4 会添加）
  initWorkflow();
  initFormatSection();
  initDpiComparison();
  initResolutionCalc();
  initJournalLookup();

  // 5. ScrollTrigger section 入场动画（桌面端）
  if (gsap && window.ScrollTrigger && window.innerWidth >= 769) {
    const sections = ['#p10-workflow', '#p10-format', '#p10-dpi', '#p10-calc', '#p10-journal'];
    sections.forEach(sel => {
      const el = document.querySelector(sel);
      if (!el) return;
      const targets = el.querySelectorAll('.p10-section-eyebrow, .p10-section-title, .p10-section-sub');
      if (targets.length) {
        gsap.from(targets, {
          scrollTrigger: { trigger: el, start: 'top 85%' },
          opacity: 0, y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out'
        });
      }
    });
  }
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  killAll();
  if (_scrollHandler) {
    window.removeEventListener('scroll', _scrollHandler);
    _scrollHandler = null;
  }
  _codeEditors.forEach(e => { try { e.destroy(); } catch(_) {} });
  _codeEditors = [];
}

// ══════════════════════════════════════════════════════
//  initWorkflow() — 工作流步骤初始化
// ══════════════════════════════════════════════════════
function initWorkflow() {
  const isMobile = window.innerWidth <= 900;

  // Initialize CodeMirror for each workflow step (read-only display)
  WORKFLOW_STEPS.forEach((step, i) => {
    const container = document.getElementById(`p10-wf-code-${i}`);
    if (!container) return;
    try {
      const editor = createCodeEditor(container, {
        code: step.code, language: 'r', readOnly: true
      });
      if (editor && editor.destroy) _codeEditors.push(editor);
    } catch(e) {
      // Fallback to pre element if CodeMirror fails
      container.innerHTML = `<pre style="background:#1a1a2e;padding:16px;border-radius:8px;font-family:var(--font-code);font-size:0.78rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${step.code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;
    }
  });

  if (isMobile) {
    initWorkflowMobile();
  } else {
    initWorkflowDesktop();
  }
}

function initWorkflowMobile() {
  const dots = document.querySelectorAll('.p10-wf-dot');
  const panels = document.querySelectorAll('.p10-wf-panel');

  function setStep(idx) {
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    panels.forEach((p, i) => {
      p.style.display = i === idx ? 'flex' : 'none';
    });
  }

  // Show first step, hide others
  setStep(0);
  panels.forEach((p, i) => { if (i > 0) p.style.display = 'none'; });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setStep(i));
  });
}

function initWorkflowDesktop() {
  const body = document.getElementById('p10-wf-body');
  const left = document.getElementById('p10-wf-left');
  if (!body || !left) return;

  let currentStep = 0;
  const TOTAL = WORKFLOW_STEPS.length;

  function updateStep(idx) {
    currentStep = idx;
    document.querySelectorAll('.p10-wf-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    // Update connector "passed" state
    document.querySelectorAll('.p10-wf-connector').forEach((c, i) => {
      c.classList.toggle('passed', i < idx);
    });
  }

  function updateSticky() {
    const bodyRect = body.getBoundingClientRect();
    const scrolledPast = Math.max(0, -bodyRect.top);
    const maxTranslate = Math.max(0, body.offsetHeight - left.offsetHeight);
    left.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;

    // Step detection: each step occupies 100vh
    const stepIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
    if (stepIdx !== currentStep) updateStep(stepIdx);
  }

  _scrollHandler = updateSticky;
  window.addEventListener('scroll', updateSticky, { passive: true });
  updateSticky();

  // Click dot to scroll to corresponding panel
  document.querySelectorAll('.p10-wf-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const panel = document.getElementById(`p10-wf-panel-${i}`);
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ══════════════════════════════════════════════════════
//  initFormatSection() — 格式对比标签页
// ══════════════════════════════════════════════════════
function initFormatSection() {
  // Tab switching
  const tabs = document.querySelectorAll('.p10-format-tab');
  const contents = document.querySelectorAll('.p10-format-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.fmt);
      tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
      contents.forEach((c, i) => c.classList.toggle('active', i === idx));
      requestAnimationFrame(() => renderFormatVisual(idx));
    });
  });

  // Render first format visual
  renderFormatVisual(0);

  // Initialize CodeMirror for all format code containers (read-only)
  FORMAT_DATA.forEach((f, i) => {
    const container = document.getElementById(`p10-fmt-code-${i}`);
    if (!container) return;
    try {
      const editor = createCodeEditor(container, {
        code: f.code, language: 'r', readOnly: true
      });
      if (editor && editor.destroy) _codeEditors.push(editor);
    } catch(e) {
      container.innerHTML = `<pre style="background:#0d1117;padding:14px;border-radius:8px;font-size:0.75rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${f.code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`;
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
  const svg = d3.select(container).append('svg')
    .attr('viewBox', '0 0 400 200')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', '100%');

  svg.append('rect').attr('width', 400).attr('height', 200).attr('fill', '#0d1117');

  svg.append('text').attr('x', 200).attr('y', 30).attr('text-anchor', 'middle')
    .attr('fill', f.color).attr('font-size', 13).attr('font-family', 'JetBrains Mono, monospace')
    .text('矢量：数学路径描述');

  const pathData = 'M 60 150 C 100 60, 180 60, 200 100 C 220 140, 300 60, 340 100';
  svg.append('path').attr('d', pathData)
    .attr('fill', 'none').attr('stroke', f.color).attr('stroke-width', 2.5)
    .attr('stroke-dasharray', '0,1000')
    .transition().duration(1500).ease(d3.easeCubicOut)
    .attrTween('stroke-dasharray', () => t => `${t * 1000},1000`);

  [[60,150],[200,100],[340,100]].forEach(([x,y]) => {
    svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 0)
      .attr('fill', f.color).attr('stroke', 'white').attr('stroke-width', 1.5)
      .transition().delay(1200).duration(400).attr('r', 5);
    svg.append('text').attr('x', x).attr('y', y + 18)
      .attr('text-anchor', 'middle').attr('fill', '#6e6e73')
      .attr('font-size', 9).attr('font-family', 'JetBrains Mono, monospace')
      .text(`(${x}, ${y})`);
  });

  svg.append('text').attr('x', 200).attr('y', 185).attr('text-anchor', 'middle')
    .attr('fill', '#6e6e73').attr('font-size', 10)
    .text('路径在任意分辨率下精确重绘 → 无损缩放');
}

function renderRasterAnimation(container, f) {
  const canvas = document.createElement('canvas');
  canvas.width = 400; canvas.height = 200;
  canvas.style.width = '100%'; canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, 400, 200);

  ctx.fillStyle = f.color;
  ctx.font = '13px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('位图：像素网格存储', 200, 28);

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

  ctx.fillStyle = '#6e6e73';
  ctx.font = '10px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('放大后可见像素格子（锯齿）', 200, 188);
}

// ══════════════════════════════════════════════════════
//  initDpiComparison() — DPI 对比器
// ══════════════════════════════════════════════════════
function initDpiComparison() {
  const DPI_VALS = [72, 150, 300, 600];
  const DPI_LABELS = {
    72: '屏幕显示（模糊）',
    150: '一般印刷',
    300: '期刊标准 ✓',
    600: '顶刊线条图 ✓'
  };

  function drawDpiCanvas(canvas, dpi) {
    const size = 300;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Simulate DPI: lower DPI = larger pixel blocks (more jagged appearance)
    const offCanvas = document.createElement('canvas');
    const offSize = Math.max(8, Math.round(size * dpi / 300 / 4));
    offCanvas.width = offSize;
    offCanvas.height = offSize;
    const offCtx = offCanvas.getContext('2d');

    offCtx.fillStyle = '#ffffff';
    offCtx.fillRect(0, 0, offSize, offSize);

    // Draw content on small canvas
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

    // Scale to target size, lower DPI shows pixelation (imageSmoothingEnabled=false)
    ctx.imageSmoothingEnabled = dpi >= 300;
    ctx.drawImage(offCanvas, 0, 0, size, size);

    // DPI label
    ctx.fillStyle = '#1d1d1f';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${dpi} DPI`, size / 2, size - 16);
  }

  // Desktop: draw all 4 canvases
  DPI_VALS.forEach(dpi => {
    const canvas = document.getElementById(`p10-dpi-canvas-${dpi}`);
    if (canvas) drawDpiCanvas(canvas, dpi);
  });

  // Mobile: tab switching
  const mobileTabs = document.querySelectorAll('.p10-dpi-mobile-tab');
  const mobileCanvas = document.getElementById('p10-dpi-mobile-canvas');
  const mobileLabel = document.getElementById('p10-dpi-mobile-label');

  if (mobileCanvas) {
    drawDpiCanvas(mobileCanvas, 72);
    if (mobileLabel) mobileLabel.textContent = `72 DPI — ${DPI_LABELS[72]}`;
  }

  mobileTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const dpi = parseInt(tab.dataset.dpi);
      mobileTabs.forEach(t => t.classList.toggle('active', t.dataset.dpi == dpi));
      if (mobileCanvas) drawDpiCanvas(mobileCanvas, dpi);
      if (mobileLabel) mobileLabel.textContent = `${dpi} DPI — ${DPI_LABELS[dpi] || ''}`;
    });
  });
}

// ══════════════════════════════════════════════════════
//  initResolutionCalc() — 分辨率计算器
// ══════════════════════════════════════════════════════
function initResolutionCalc() {
  // HTML uses p10-calc-width / p10-calc-height / p10-calc-format
  // and separate p10-res-w, p10-res-h, p10-res-mp, p10-res-size for output
  const wInput  = document.getElementById('p10-calc-width');
  const hInput  = document.getElementById('p10-calc-height');
  const dpiSel  = document.getElementById('p10-calc-dpi');
  const fmtSel  = document.getElementById('p10-calc-format');
  const resWEl  = document.getElementById('p10-res-w');
  const resHEl  = document.getElementById('p10-res-h');
  const mpEl    = document.getElementById('p10-res-mp');
  const sizeEl  = document.getElementById('p10-res-size');
  const codeEl     = document.getElementById('p10-calc-code');
  const warnEl     = document.getElementById('p10-calc-warning');
  const warnTextEl = document.getElementById('p10-calc-warning-text');

  if (!wInput || !resWEl) return;

  function calc() {
    const w   = parseFloat(wInput.value) || 8.9;
    const h   = parseFloat(hInput.value) || 6;
    const dpi = parseInt(dpiSel.value) || 300;
    const fmt = fmtSel.value;

    // cm to pixels: 1 inch = 2.54 cm
    const pxW = Math.round(w / 2.54 * dpi);
    const pxH = Math.round(h / 2.54 * dpi);
    const totalPx = pxW * pxH;
    const megaPx = (totalPx / 1e6).toFixed(2);

    // Estimate file size
    let bytesEst = 0;
    if (fmt === 'png') {
      bytesEst = totalPx * 0.6;
    } else if (fmt === 'tiff') {
      bytesEst = totalPx * 1.2;
    } else if (fmt === 'jpeg') {
      bytesEst = totalPx * 0.4;
    }
    // svg/pdf: bytesEst stays 0 (vector)

    const sizeMB = bytesEst > 0 ? (bytesEst / 1024 / 1024).toFixed(1) : '—';

    // Compute size note for user context
    let sizeNote = '';
    if (fmt === 'png') {
      sizeNote = '无损压缩，适合网页与演示文稿';
    } else if (fmt === 'tiff') {
      sizeNote = 'LZW 无损压缩，期刊提交首选';
    } else if (fmt === 'jpeg') {
      sizeNote = '有损压缩，不建议用于期刊投稿';
    } else {
      sizeNote = '矢量格式，ggsave 生成 PDF 文件';
    }

    // Update result cards — each card has a value + unit span
    // Replace inner content while preserving the unit span structure
    if (resWEl) resWEl.innerHTML = `${pxW.toLocaleString()} <span class="p10-calc-result-unit">px</span>`;
    if (resHEl) resHEl.innerHTML = `${pxH.toLocaleString()} <span class="p10-calc-result-unit">px</span>`;
    if (mpEl)   mpEl.innerHTML   = `${megaPx} <span class="p10-calc-result-unit">MP</span>`;
    if (sizeEl) sizeEl.innerHTML = bytesEst > 0
      ? `<span class="p10-calc-result-value">${sizeMB} MB</span><p class="p10-calc-result-note">${sizeNote}</p>`
      : `<span class="p10-calc-result-value">矢量</span><p class="p10-calc-result-note">${sizeNote}</p>`;

    // Generate ggsave code
    const fmtStr = (fmt === 'svg') ? 'pdf' : fmt;
    const tiffExtra = (fmtStr === 'tiff') ? ',\n  compression = "lzw"' : '';
    if (codeEl) {
      codeEl.textContent = `ggsave("figure.${fmtStr}",\n  plot   = p,\n  width  = ${w},\n  height = ${h},\n  units  = "cm",\n  dpi    = ${dpi}${tiffExtra}\n)`;
    }

    // Warning for large files (>10MB) — CSS uses .visible class
    if (warnEl) {
      const showWarn = bytesEst > 10 * 1024 * 1024;
      warnEl.classList.toggle('visible', showWarn);
      if (warnTextEl && showWarn) {
        warnTextEl.textContent = `⚠️ 估算文件大小约 ${sizeMB} MB，超过 10MB。建议使用 LZW 压缩（TIFF）或改用矢量格式（PDF/SVG）。`;
      }
    }
  }

  [wInput, hInput, dpiSel, fmtSel].forEach(el => {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  // Run initial calculation
  calc();
}

// ══════════════════════════════════════════════════════
//  initJournalLookup() — 期刊速查
// ══════════════════════════════════════════════════════
function initJournalLookup() {
  const select = document.getElementById('p10-journal-select');
  const result = document.getElementById('p10-journal-result');
  const card   = document.getElementById('p10-journal-card');
  if (!select || !result || !card) return;

  select.addEventListener('change', () => {
    const name = select.value;
    if (!name) {
      result.classList.remove('visible');
      return;
    }
    const journal = JOURNAL_DATA.find(j => j.name === name);
    if (!journal) return;

    // Build card using the existing CSS classes from the embedded <style>
    card.innerHTML = `
      <div class="p10-journal-card-header">
        <div>
          <div class="p10-journal-card-name">${journal.name}</div>
          <div class="p10-journal-card-group">${journal.group}</div>
        </div>
      </div>
      <div class="p10-journal-card-body">
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-title">栏宽规格</div>
          <div class="p10-journal-width-grid">
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">单栏</span>
              <span class="p10-journal-width-val">${journal.single}</span>
            </div>
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">1.5 栏</span>
              <span class="p10-journal-width-val">${journal.oneHalf}</span>
            </div>
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">双栏</span>
              <span class="p10-journal-width-val">${journal.double}</span>
            </div>
          </div>
        </div>
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-title">分辨率要求</div>
          <div class="p10-journal-dpi-grid">
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">半色调</span>
              <span class="p10-journal-dpi-val">${journal.dpi_halftone} DPI</span>
            </div>
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">线条图</span>
              <span class="p10-journal-dpi-val">${journal.dpi_line} DPI</span>
            </div>
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">混合图</span>
              <span class="p10-journal-dpi-val">${journal.dpi_combo} DPI</span>
            </div>
          </div>
        </div>
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">格式</span>
            <span class="p10-journal-spec-val">${journal.formats}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">色彩</span>
            <span class="p10-journal-spec-val">${journal.color}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">文件大小</span>
            <span class="p10-journal-spec-val">${journal.maxSize}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">字体</span>
            <span class="p10-journal-spec-val">${journal.fonts}</span>
          </div>
        </div>
        <div class="p10-journal-notes">📌 ${journal.notes}</div>
      </div>
    `;

    // CSS uses .visible class to show the result container
    result.classList.add('visible');

    // GSAP entrance animation
    const gsap = window.gsap;
    if (gsap) {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  });
}
