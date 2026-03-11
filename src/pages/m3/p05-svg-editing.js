import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';

// ─── 状态 ─────────────────────────────────────────────────────────────────────
let _eventHandlers = [];
let _observers = [];
let _editor = null;

// ─── SVG 元素数据 ─────────────────────────────────────────────────────────────
const SVG_ELEMENTS = [
  {
    id: 'rect', name: 'rect 矩形',
    preview: `<rect x="20" y="20" width="120" height="80" rx="8" fill="#95D5B2" stroke="#1d1d1f" stroke-width="2"/>`,
    attrs: [
      { name: 'x, y', desc: '矩形左上角坐标' },
      { name: 'width, height', desc: '宽高' },
      { name: 'rx, ry', desc: '圆角半径（实现圆角矩形）' },
      { name: 'fill', desc: '填充色（颜色/渐变/none）' },
      { name: 'stroke', desc: '描边颜色' },
      { name: 'stroke-width', desc: '描边粗细' },
    ],
    use: '流程图节点、背景色块、数据表格边框'
  },
  {
    id: 'circle', name: 'circle 圆',
    preview: `<circle cx="80" cy="60" r="50" fill="#7EC8E3" stroke="#1d1d1f" stroke-width="2"/>`,
    attrs: [
      { name: 'cx, cy', desc: '圆心坐标' },
      { name: 'r', desc: '半径' },
      { name: 'fill, stroke', desc: '填充和描边' },
    ],
    use: '数据点、图例符号、步骤圆圈'
  },
  {
    id: 'path', name: 'path 路径',
    preview: `<path d="M10 90 C30 10 100 10 120 90" fill="none" stroke="#95D5B2" stroke-width="3"/><circle cx="10" cy="90" r="4" fill="#F0B27A"/><circle cx="120" cy="90" r="4" fill="#F0B27A"/>`,
    attrs: [
      { name: 'M x y', desc: '移动到 (x,y)（不绘制线）' },
      { name: 'L x y', desc: '绘制直线到 (x,y)' },
      { name: 'C x1 y1 x2 y2 x y', desc: '三次贝塞尔曲线' },
      { name: 'Q x1 y1 x y', desc: '二次贝塞尔曲线' },
      { name: 'Z', desc: '闭合路径（连回起点）' },
    ],
    use: '箭头、弯曲连接线、有机轮廓、自定义图标'
  },
  {
    id: 'text', name: 'text 文字',
    preview: `<text x="80" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#1d1d1f">图表标题</text><text x="80" y="70" text-anchor="middle" font-family="Arial" font-size="10" fill="#6e6e73">Treatment vs Control, n=30</text>`,
    attrs: [
      { name: 'x, y', desc: '文字基线起点坐标' },
      { name: 'text-anchor', desc: '水平对齐：start/middle/end' },
      { name: 'dominant-baseline', desc: '垂直对齐：auto/middle/hanging' },
      { name: 'font-size', desc: '字号（pt 或 px）' },
      { name: 'font-family', desc: '字体族（需要嵌入或系统字体）' },
    ],
    use: '图表标题、坐标轴标签、数据标注'
  },
  {
    id: 'line', name: 'line 直线',
    preview: `<line x1="10" y1="60" x2="150" y2="60" stroke="#424245" stroke-width="2"/><line x1="10" y1="60" x2="10" y2="10" stroke="#424245" stroke-width="2"/><line x1="20" y1="40" x2="150" y2="40" stroke="#d2d2d7" stroke-width="1" stroke-dasharray="4 3"/><text x="5" y="64" font-size="8" fill="#6e6e73">x</text><text x="12" y="14" font-size="8" fill="#6e6e73">y</text>`,
    attrs: [
      { name: 'x1, y1', desc: '起点坐标' },
      { name: 'x2, y2', desc: '终点坐标' },
      { name: 'stroke-dasharray', desc: '虚线模式（如 "4 3" = 4px线+3px空）' },
    ],
    use: '坐标轴、网格线、分隔线'
  },
  {
    id: 'gradient', name: '渐变 defs',
    preview: `<defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7EC8E3"/><stop offset="100%" stop-color="#95D5B2"/></linearGradient></defs><rect x="10" y="20" width="140" height="80" rx="8" fill="url(#g1)"/>`,
    attrs: [
      { name: '&lt;defs&gt;', desc: '定义可复用元素（渐变/滤镜/图案）' },
      { name: 'linearGradient', desc: '线性渐变（x1/y1/x2/y2 定义方向）' },
      { name: 'radialGradient', desc: '径向渐变（cx/cy/r 定义中心和半径）' },
      { name: 'stop', desc: '渐变色标（offset=位置, stop-color=颜色）' },
      { name: 'fill="url(#id)"', desc: '引用已定义的渐变/图案' },
    ],
    use: '背景渐变、数据条填充、热力图色阶'
  },
  {
    id: 'viewbox', name: 'viewBox 坐标系',
    preview: `<rect x="0" y="0" width="160" height="120" fill="none" stroke="#424245" stroke-width="1"/><text x="80" y="12" text-anchor="middle" font-size="8" fill="#6e6e73">viewBox="0 0 160 120"</text><rect x="10" y="20" width="140" height="90" fill="none" stroke="#95D5B2" stroke-width="1" stroke-dasharray="3 2"/><text x="80" y="35" text-anchor="middle" font-size="8" fill="#95D5B2">内容区域</text><text x="80" y="95" text-anchor="middle" font-size="7" fill="#a1a1a6">不论显示尺寸如何，坐标系始终是 160x120</text>`,
    attrs: [
      { name: 'viewBox="x y w h"', desc: '定义内部坐标系（x y = 原点偏移, w h = 内部尺寸）' },
      { name: 'preserveAspectRatio', desc: '保持比例对齐（xMidYMid meet = 居中等比缩放）' },
      { name: 'width, height', desc: 'SVG 元素实际渲染尺寸（改变这个不影响内部坐标）' },
    ],
    use: '响应式 SVG（不设置 width/height，只设 viewBox，CSS 控制大小）'
  },
];

// ─── SVG 模板数据 ─────────────────────────────────────────────────────────────
const SVG_TEMPLATES = [
  {
    id: 'flowchart', name: '流程图节点',
    code: `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"
     width="300" height="160">
  <!-- 样本采集 -->
  <rect x="10" y="60" width="80" height="40" rx="6"
        fill="#2d2d2f" stroke="#95D5B2" stroke-width="1.5"/>
  <text x="50" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#95D5B2">样本采集</text>

  <!-- 箭头 -->
  <line x1="90" y1="80" x2="108" y2="80"
        stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="106,75 116,80 106,85"
           fill="#6e6e73"/>

  <!-- 数据分析 -->
  <rect x="116" y="60" width="80" height="40" rx="6"
        fill="#2d2d2f" stroke="#7EC8E3" stroke-width="1.5"/>
  <text x="156" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#7EC8E3">数据分析</text>

  <!-- 箭头 -->
  <line x1="196" y1="80" x2="214" y2="80"
        stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="212,75 222,80 212,85"
           fill="#6e6e73"/>

  <!-- 结果输出 -->
  <rect x="222" y="60" width="68" height="40" rx="6"
        fill="#2d2d2f" stroke="#B8B8E8" stroke-width="1.5"/>
  <text x="256" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#B8B8E8">结果输出</text>
</svg>`
  },
  {
    id: 'arrow', name: '科研弯箭头',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
     width="200" height="120">
  <!-- 弯曲路径 -->
  <path d="M20 90 C20 40 100 20 160 60"
        fill="none" stroke="#95D5B2"
        stroke-width="2.5" stroke-linecap="round"/>

  <!-- 箭头头部 -->
  <polygon points="155,52 168,63 155,68"
           fill="#95D5B2"/>

  <!-- 标注 -->
  <text x="85" y="28" text-anchor="middle"
        font-family="Arial" font-size="10" fill="#a1a1a6">
    信号传导方向
  </text>

  <!-- 起点标记 -->
  <circle cx="20" cy="90" r="4" fill="#F0B27A"/>
  <text x="20" y="105" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#F0B27A">起点</text>
</svg>`
  },
  {
    id: 'scatter', name: '散点图框架',
    code: `<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg"
     width="240" height="180">
  <!-- 坐标轴 -->
  <line x1="40" y1="20" x2="40" y2="150"
        stroke="#424245" stroke-width="1.5"/>
  <line x1="40" y1="150" x2="220" y2="150"
        stroke="#424245" stroke-width="1.5"/>

  <!-- 网格线 -->
  <line x1="40" y1="110" x2="220" y2="110"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="40" y1="70" x2="220" y2="70"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="100" y1="20" x2="100" y2="150"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="160" y1="20" x2="160" y2="150"
        stroke="#2d2d2f" stroke-width="0.8"/>

  <!-- 数据点（Group A）-->
  <circle cx="60" cy="130" r="4" fill="#7EC8E3" opacity="0.8"/>
  <circle cx="75" cy="120" r="4" fill="#7EC8E3" opacity="0.8"/>
  <circle cx="85" cy="125" r="4" fill="#7EC8E3" opacity="0.8"/>

  <!-- 数据点（Group B）-->
  <circle cx="130" cy="85" r="4" fill="#95D5B2" opacity="0.8"/>
  <circle cx="145" cy="75" r="4" fill="#95D5B2" opacity="0.8"/>
  <circle cx="155" cy="80" r="4" fill="#95D5B2" opacity="0.8"/>

  <!-- 标签 -->
  <text x="130" y="168" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#a1a1a6">X 轴标签</text>
  <text x="16" y="90" text-anchor="middle"
        transform="rotate(-90,16,90)"
        font-family="Arial" font-size="11" fill="#a1a1a6">Y 轴标签</text>
  <text x="130" y="14" text-anchor="middle"
        font-family="Arial" font-size="12" font-weight="bold" fill="#f5f5f7">
    实验组对比
  </text>
</svg>`
  },
  {
    id: 'gradient-bg', name: '渐变背景',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
     width="200" height="120">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d1d2e"/>
      <stop offset="50%" stop-color="#0d2137"/>
      <stop offset="100%" stop-color="#1d1d2e"/>
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#95D5B2" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#95D5B2" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 背景 -->
  <rect width="200" height="120" fill="url(#bgGrad)"/>

  <!-- 发光效果 -->
  <ellipse cx="100" cy="60" rx="80" ry="50"
           fill="url(#glowGrad)"/>

  <!-- 内容文字 -->
  <text x="100" y="55" text-anchor="middle"
        font-family="Arial" font-size="14" font-weight="bold" fill="#f5f5f7">
    科研美学
  </text>
  <text x="100" y="74" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#a1a1a6">
    SciAesthetic
  </text>
</svg>`
  },
  {
    id: 'timeline', name: '时间线',
    code: `<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg"
     width="280" height="100">
  <!-- 主轴线 -->
  <line x1="20" y1="50" x2="260" y2="50"
        stroke="#424245" stroke-width="2"/>

  <!-- 阶段节点 -->
  <circle cx="60" cy="50" r="8" fill="#95D5B2"/>
  <circle cx="120" cy="50" r="8" fill="#7EC8E3"/>
  <circle cx="180" cy="50" r="8" fill="#B8B8E8"/>
  <circle cx="240" cy="50" r="8" fill="#F0B27A"/>

  <!-- 标签 -->
  <text x="60" y="30" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#95D5B2">采样</text>
  <text x="120" y="30" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#7EC8E3">分析</text>
  <text x="180" y="75" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#B8B8E8">建模</text>
  <text x="240" y="75" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#F0B27A">验证</text>

  <!-- 时间节点文字 -->
  <text x="60" y="67" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第1周</text>
  <text x="120" y="67" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第3周</text>
  <text x="180" y="38" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第5周</text>
  <text x="240" y="38" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第8周</text>
</svg>`
  },
  {
    id: 'molecule', name: '分子结构',
    code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
     width="200" height="160">
  <!-- 化学键（线） -->
  <line x1="100" y1="40" x2="60" y2="80" stroke="#6e6e73" stroke-width="2"/>
  <line x1="100" y1="40" x2="140" y2="80" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="80" x2="60" y2="120" stroke="#6e6e73" stroke-width="2"/>
  <line x1="140" y1="80" x2="140" y2="120" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="120" x2="100" y2="140" stroke="#6e6e73" stroke-width="2"/>
  <line x1="140" y1="120" x2="100" y2="140" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="80" x2="30" y2="60" stroke="#6e6e73" stroke-width="1.5"/>
  <line x1="140" y1="80" x2="170" y2="60" stroke="#6e6e73" stroke-width="1.5"/>

  <!-- 原子 -->
  <circle cx="100" cy="40" r="12" fill="#E07A7A"/>
  <circle cx="60" cy="80" r="12" fill="#7EC8E3"/>
  <circle cx="140" cy="80" r="12" fill="#7EC8E3"/>
  <circle cx="60" cy="120" r="12" fill="#95D5B2"/>
  <circle cx="140" cy="120" r="12" fill="#95D5B2"/>
  <circle cx="100" cy="140" r="12" fill="#7EC8E3"/>
  <circle cx="30" cy="60" r="8" fill="#f5f5f7"/>
  <circle cx="170" cy="60" r="8" fill="#f5f5f7"/>

  <!-- 元素符号 -->
  <text x="100" y="44" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">O</text>
  <text x="60" y="84" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="140" y="84" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="60" y="124" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">N</text>
  <text x="140" y="124" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">N</text>
  <text x="100" y="144" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="30" y="60" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="7" font-weight="bold" fill="#1d1d1f">H</text>
  <text x="170" y="60" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="7" font-weight="bold" fill="#1d1d1f">H</text>
</svg>`
  },
];

// ─── 优化策略数据 ─────────────────────────────────────────────────────────────
const OPTIMIZATIONS = [
  {
    id: 'simplify',
    title: '路径精简',
    icon: '✂',
    badLabel: '优化前',
    badBytes: '847 B',
    badCode: `<path d="M 10.000 20.000 C 10.123 19.876
  15.432 18.921 20.000 18.000
  C 24.567 17.079 29.876 16.124
  35.000 16.000 L 120.000 16.000
  C 125.124 16.000 129.876 16.000
  134.000 16.000" fill="#95D5B2"/>`,
    goodLabel: '优化后',
    goodBytes: '312 B',
    goodCode: `<path d="M10 20C10 19 15 18 20 18
  C24 17 29 16 35 16
  L120 16C125 16 129 16 134 16"
  fill="#95D5B2"/>`,
    reduction: '63%',
    note: '工具：Illustrator → 对象 → 路径 → 简化 / SVGO CLI（--precision=0）',
  },
  {
    id: 'attrs',
    title: '移除冗余属性',
    icon: '🧹',
    badLabel: '优化前（含默认值）',
    badBytes: '520 B',
    badCode: `<svg x="0px" y="0px" version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xml:space="preserve">
  <rect x="0" y="0" width="100" height="60"
        fill="none" opacity="1"
        transform="translate(0,0) scale(1)"
        stroke-opacity="1" fill-rule="nonzero"/>
</svg>`,
    goodLabel: '优化后（移除默认值）',
    goodBytes: '118 B',
    goodCode: `<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="60"/>
</svg>`,
    reduction: '77%',
    note: 'Illustrator 导出常带大量不必要属性，SVGO 可自动清除',
  },
  {
    id: 'defs',
    title: '合理使用 defs',
    icon: '♻',
    badLabel: '优化前（重复定义）',
    badBytes: '~10 KB',
    badCode: `<!-- 每个色条都有独立渐变定义（x20 条） -->
<rect fill="url(#grad1)"/>
<linearGradient id="grad1">...</linearGradient>
<rect fill="url(#grad2)"/>
<linearGradient id="grad2">...</linearGradient>
<!-- ... 重复 20 次 -->`,
    goodLabel: '优化后（defs 一次定义）',
    goodBytes: '~2 KB',
    goodCode: `<!-- 在 defs 中定义一次，多处复用 -->
<defs>
  <linearGradient id="heatGrad">
    <stop offset="0%" stop-color="#2196F3"/>
    <stop offset="100%" stop-color="#F44336"/>
  </linearGradient>
</defs>
<!-- 所有热力图色条共享同一渐变 -->
<rect fill="url(#heatGrad)"/>`,
    reduction: '80%',
    note: '热力图色阶可从 10KB 减到 2KB；图标库同理，一个 symbol 多处 use',
  },
];

// ─── 使用场景数据 ─────────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 'latex', name: 'LaTeX', icon: 'TeX',
    desc: '在 LaTeX 文档中使用 SVG',
    code: `% 方法1：使用 includesvg（推荐）
\\usepackage{svg}
\\includesvg[width=0.8\\linewidth]{figure1.svg}

% 方法2：转换为 PDF 后导入
% inkscape figure1.svg --export-pdf=figure1.pdf
\\includegraphics[width=0.8\\linewidth]{figure1.pdf}`,
    note: '注意：pdfLaTeX 不直接支持 SVG，需要先转为 PDF 或使用 svg 宏包（需安装 Inkscape）'
  },
  {
    id: 'web', name: 'Web/HTML', icon: '</>',
    desc: '在网页中嵌入和样式化 SVG',
    code: `<!-- 方法1：内联 SVG（可用 CSS 控制） -->
<svg viewBox="0 0 200 100">
  <circle cx="100" cy="50" r="40" class="my-circle"/>
</svg>
<style>
  .my-circle { fill: #95D5B2; transition: fill 0.3s; }
  .my-circle:hover { fill: #7EC8E3; }
</style>

<!-- 方法2：img 标签（不可样式化） -->
<img src="figure.svg" width="400" alt="图表"/>`,
    note: '内联 SVG 可以通过 CSS 变量控制颜色，实现暗色模式适配'
  },
  {
    id: 'office', name: 'Office/PPT', icon: '▦',
    desc: '在 PowerPoint/Word 中使用 SVG',
    code: `# R 导出为 SVG 供 PPT 使用
library(svglite)
svglite("figure.svg", width = 6, height = 4)
ggplot(data, aes(x, y, color = group)) +
  geom_point(size = 3) +
  theme_minimal(base_size = 14)
dev.off()

# Python 导出 SVG
fig.savefig("figure.svg", format="svg",
            bbox_inches="tight", dpi=300)`,
    note: 'Office 2016+ 支持直接插入 SVG（插入→图片→选 SVG 文件）。字体需要目标机器安装，否则用通用字体'
  },
  {
    id: 'print', name: '印刷/期刊', icon: '⬡',
    desc: 'SVG 转为印刷用 PDF/EPS',
    code: `# 命令行：Inkscape 转 PDF（推荐）
inkscape figure.svg --export-pdf=figure.pdf

# 命令行：Inkscape 转 EPS（部分期刊要求）
inkscape figure.svg --export-eps=figure.eps

# Python：matplotlib 直接导出 PDF（含 SVG 矢量信息）
fig.savefig("figure.pdf", format="pdf",
            bbox_inches="tight")`,
    note: '印刷时确保字体已嵌入 PDF（Illustrator：文件→存储为→PDF，勾选"嵌入所有字体"）'
  }
];

// ─── 工具函数 ─────────────────────────────────────────────────────────────────
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function addEvt(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ─── SVG 安全过滤（DOMParser 白名单方案）────────────────────────────────────

const ALLOWED_SVG_TAGS = new Set([
  'svg','g','path','rect','circle','ellipse','line','polyline','polygon',
  'text','tspan','textpath','image','use','defs','symbol','clippath',
  'mask','pattern','lineargradient','radialgradient','stop','filter',
  'feblend','fecolormatrix','fecomposite','feconvolvematrix',
  'fediffuselighting','fedisplacementmap','fedropshadow','feflood',
  'fegaussianblur','feimage','femerge','femergenode','femorphology',
  'feoffset','fespecularlighting','fetile','feturbulence','marker',
  'title','desc','animate','animatetransform','animatemotion','mpath',
  'set','metadata','switch'
]);

// 危险属性：事件处理器（on*）和可携带 javascript: 的链接属性
const DANGEROUS_ATTRS = /^(on|xlink:href$|href$)/i;

function sanitizeElement(el) {
  // 不在白名单的元素直接移除
  if (!ALLOWED_SVG_TAGS.has(el.tagName.toLowerCase())) {
    el.remove();
    return;
  }
  // 移除危险属性
  const attrs = Array.from(el.attributes);
  for (const attr of attrs) {
    if (DANGEROUS_ATTRS.test(attr.name)) {
      el.removeAttribute(attr.name);
    } else if (attr.value && /javascript:/i.test(attr.value)) {
      el.removeAttribute(attr.name);
    }
  }
  // 递归处理子元素（先复制列表，避免边删边迭代）
  Array.from(el.children).forEach(sanitizeElement);
}

function sanitizeSvg(svgStr) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgStr, 'image/svg+xml');

  // DOMParser 遇到格式错误时会生成 parsererror 节点
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    // 回退：以 HTML 片段方式解析，先强力移除 script
    const div = document.createElement('div');
    div.innerHTML = svgStr.replace(/<script[\s\S]*?<\/script>/gi, '');
    const svgEl = div.querySelector('svg');
    if (!svgEl) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text y="20" x="8" fill="#ef4444" font-size="12">Parse error — 请检查 SVG 语法</text></svg>';
    }
    sanitizeElement(svgEl);
    return svgEl.outerHTML;
  }

  const svgEl = doc.documentElement;
  sanitizeElement(svgEl);
  return svgEl.outerHTML;
}

function updateSvgPreview(code, previewEl, byteCountEl) {
  try {
    previewEl.innerHTML = sanitizeSvg(code);
  } catch (e) {
    // 解析失败保持上一个状态
  }
  if (byteCountEl) {
    const bytes = new Blob([code]).size;
    byteCountEl.textContent = bytes + ' B';
  }
}

function buildAttrRows(el) {
  return el.attrs.map(a => `
    <div class="p05-attr-row">
      <code class="p05-attr-name">${a.name}</code>
      <span class="p05-attr-desc">${a.desc}</span>
    </div>
  `).join('');
}

// ─── render ───────────────────────────────────────────────────────────────────
export function render() {
  // S1：元素 Tab 按钮
  const elementTabs = SVG_ELEMENTS.map((el, i) => `
    <button class="p05-elem-tab${i === 0 ? ' active' : ''}" data-elem="${el.id}" style="min-height:44px;">${el.name}</button>
  `).join('');

  const firstEl = SVG_ELEMENTS[0];

  // S2：模板按钮
  const templateTabs = SVG_TEMPLATES.map((t, i) => `
    <button class="p05-tmpl-btn${i === 0 ? ' active' : ''}" data-tmpl="${t.id}" style="min-height:44px;">${t.name}</button>
  `).join('');

  // S3：优化对比卡片
  const optCards = OPTIMIZATIONS.map(opt => `
    <div class="p05-opt-card">
      <div class="p05-opt-header">
        <span class="p05-opt-icon">${opt.icon}</span>
        <h3 class="p05-opt-title">${opt.title}</h3>
        <span class="p05-opt-badge">减少 <strong>${opt.reduction}</strong></span>
      </div>
      <div class="p05-opt-compare">
        <div class="p05-opt-col">
          <div class="p05-opt-col-header p05-opt-bad-header">
            <span>${opt.badLabel}</span>
            <span class="p05-opt-bytes p05-opt-bytes-bad">${opt.badBytes}</span>
          </div>
          <pre class="p05-code-block p05-code-bad">${escHtml(opt.badCode)}</pre>
        </div>
        <div class="p05-opt-col">
          <div class="p05-opt-col-header p05-opt-good-header">
            <span>${opt.goodLabel}</span>
            <span class="p05-opt-bytes p05-opt-bytes-good">${opt.goodBytes}</span>
          </div>
          <pre class="p05-code-block p05-code-good">${escHtml(opt.goodCode)}</pre>
        </div>
      </div>
      <p class="p05-opt-note">${opt.note}</p>
    </div>
  `).join('');

  // S4：场景 Tab 按钮 + 面板
  const scenarioTabs = SCENARIOS.map((s, i) => `
    <button class="p05-scene-tab${i === 0 ? ' active' : ''}" data-scene="${s.id}" style="min-height:44px;">
      <span class="p05-scene-icon">${s.icon}</span>
      <span>${s.name}</span>
    </button>
  `).join('');

  const scenarioPanels = SCENARIOS.map((s, i) => `
    <div class="p05-scene-panel${i === 0 ? ' active' : ''}" id="p05-scene-${s.id}">
      <p class="p05-scene-desc">${s.desc}</p>
      <pre class="p05-code-block p05-scene-code">${escHtml(s.code)}</pre>
      <p class="p05-scene-note"><span class="p05-note-label">注意：</span>${s.note}</p>
    </div>
  `).join('');

  return `<div class="page-scroll">
<style>
/* ── p05 hero ── */
.p05-hero { position:relative; overflow:hidden; align-items:center; }
/* rgba(149,213,178,…) = --module-3:#95D5B2  rgba(126,200,227,…) = --module-1(accent):#7EC8E3 */
.p05-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 45% at 25% 35%, rgba(149,213,178,0.15) 0%, transparent 65%); animation:p05-drift-a 12s ease-in-out infinite; pointer-events:none; }
.p05-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 75% 65%, rgba(126,200,227,0.1) 0%, transparent 65%); animation:p05-drift-b 8s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p05-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-12px)} }
@keyframes p05-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-16px,20px)} }
.p05-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p05-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p05-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 元素图解 ── */
.p05-elem-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-lg); }
.p05-elem-tab { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-elem-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p05-elem-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); font-weight:600; }

.p05-elem-content { display:grid; grid-template-columns:260px 1fr; gap:var(--space-xl); align-items:start; }
.p05-svg-preview-wrap { position:relative; background:var(--bg-light,#fff); border-radius:var(--radius-md); border:1px solid var(--border-light); width:240px; height:180px; display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
.p05-svg-canvas { width:160px; height:120px; }
.p05-svg-size-label { position:absolute; top:8px; left:8px; font-family:var(--font-code); font-size:10px; color:var(--text-on-light-2); background:rgba(210,210,215,0.7); padding:2px 6px; border-radius:4px; }

.p05-attr-list { flex:1; }
.p05-attr-list-title { font-size:0.78rem; font-weight:700; color:var(--module-3,#95D5B2); margin-bottom:var(--space-sm); letter-spacing:0.08em; text-transform:uppercase; }
.p05-attr-row { display:grid; grid-template-columns:140px 1fr; gap:var(--space-sm); padding:10px 0; border-bottom:1px solid var(--border-light); align-items:baseline; }
.p05-attr-row:last-of-type { border-bottom:none; }
.p05-attr-name { font-family:var(--font-code); font-size:0.8rem; color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); padding:2px 8px; border-radius:4px; white-space:nowrap; }
.p05-attr-desc { font-size:0.88rem; color:var(--text-on-light-2); line-height:1.6; }
.p05-use-pill { display:inline-flex; align-items:center; gap:6px; background:rgba(149,213,178,0.1); border:1px solid rgba(149,213,178,0.3); border-radius:var(--radius-full); padding:6px 14px; font-size:0.82rem; color:var(--module-3,#95D5B2); margin-top:var(--space-md); }
.p05-use-pill .p05-use-label { font-weight:700; }

/* ── S2 编辑器 ── */
.p05-template-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-md); }
.p05-tmpl-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-tmpl-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.06); }
.p05-tmpl-btn.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }

.p05-editor-wrap { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:start; }
.p05-editor-pane { background:var(--bg-dark-elevated); border-radius:var(--radius-md); overflow:hidden; }
.p05-preview-pane { background:var(--bg-dark-elevated); border-radius:var(--radius-md); overflow:hidden; }
.p05-editor-header { display:flex; justify-content:space-between; align-items:center; padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-dark); font-size:0.75rem; color:var(--text-on-dark-2); }
.p05-preview-header { padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-dark); font-size:0.75rem; color:var(--text-on-dark-2); display:flex; justify-content:space-between; align-items:center; }

/* ── S3 优化策略 ── */
.p05-opt-grid { display:grid; gap:var(--space-xl); }
.p05-opt-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-light); }
.p05-opt-header { display:flex; align-items:center; gap:var(--space-sm); margin-bottom:var(--space-lg); }
.p05-opt-icon { font-size:1.5rem; line-height:1; }
.p05-opt-title { font-size:1.25rem; font-weight:700; color:var(--text-on-light); font-family:var(--font-display); flex:1; margin:0; }
.p05-opt-badge { background:rgba(149,213,178,0.12); border:1px solid rgba(149,213,178,0.4); border-radius:var(--radius-full); padding:4px 12px; font-size:0.82rem; color:var(--module-3,#95D5B2); white-space:nowrap; }
.p05-opt-compare { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-bottom:var(--space-md); }
.p05-opt-col-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.82rem; font-weight:600; }
.p05-opt-bad-header { color:#ef4444; }
.p05-opt-good-header { color:#22c55e; }
.p05-opt-bytes { font-family:var(--font-code); font-size:0.78rem; padding:2px 8px; border-radius:4px; }
.p05-opt-bytes-bad { background:rgba(239,68,68,0.1); color:#ef4444; }
.p05-opt-bytes-good { background:rgba(34,197,94,0.1); color:#22c55e; }
.p05-code-block { font-family:var(--font-code); font-size:0.78rem; line-height:1.6; border-radius:var(--radius-sm); padding:var(--space-sm); margin:0; white-space:pre-wrap; word-wrap:break-word; }
.p05-code-bad  { background:#fff5f5; border:1px solid rgba(239,68,68,0.2); color:#7f1d1d; }
.p05-code-good { background:#f0fdf4; border:1px solid rgba(34,197,94,0.2); color:#14532d; }
.p05-opt-note { font-size:0.85rem; color:var(--text-on-light-2); background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:var(--radius-sm); padding:10px 14px; margin:0; line-height:1.7; }

/* ── S4 使用场景 ── */
.p05-scene-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-xl); }
.p05-scene-tab { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.88rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-scene-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p05-scene-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); }
.p05-scene-icon { font-size:0.95rem; font-family:monospace; font-weight:700; }
.p05-scene-panel { display:none; animation:p05-panel-in 0.3s ease; }
.p05-scene-panel.active { display:block; }
@keyframes p05-panel-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.p05-scene-desc { font-size:1rem; color:var(--text-on-dark-2); margin-bottom:var(--space-md); line-height:1.7; }
.p05-scene-code { background:var(--bg-dark-elevated); color:#a8ff78; border:1px solid var(--border-dark); border-radius:var(--radius-md); padding:var(--space-md); font-family:var(--font-code); font-size:0.85rem; line-height:1.7; margin-bottom:var(--space-md); white-space:pre-wrap; word-wrap:break-word; overflow-x:auto; }
.p05-scene-note { font-size:0.85rem; color:var(--text-on-dark-2); background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:var(--radius-sm); padding:12px 16px; line-height:1.7; margin:0; }
.p05-note-label { font-weight:700; color:var(--module-3,#95D5B2); }

/* ── 响应式 ── */
@media (max-width:900px) {
  .p05-elem-content { grid-template-columns:1fr; }
  .p05-svg-preview-wrap { width:100%; }
  .p05-opt-compare { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  #p05-s1, #p05-s2, #p05-s3, #p05-s4 { scroll-margin-top:56px; }
  .p05-editor-wrap { grid-template-columns:1fr; }
  .p05-attr-row { grid-template-columns:1fr; gap:4px; }
  .p05-attr-name { display:inline-block; }
}
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p05-hero" id="p05-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 05</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">SVG 编辑与优化</h1>
    <p class="page-hero-sub" style="opacity:0;">SVG Code: Edit, Optimize, and Master Vector Markup</p>
    <p class="p05-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">SVG 是矢量图的源代码——读懂它，你就拥有了对图表的完全控制权</p>
    <nav class="hero-quicknav" id="p05-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p05-s1">语法图解</button>
      <button class="hero-quicknav__item" data-target="#p05-s2">代码编辑器</button>
      <button class="hero-quicknav__item" data-target="#p05-s3">优化策略</button>
      <button class="hero-quicknav__item" data-target="#p05-s4">使用场景</button>
    </nav>
    <div class="p05-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 SVG 基础语法图解 ── -->
<section class="section-light" id="p05-s1" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">SVG ELEMENTS</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-light);letter-spacing:-0.02em;margin-bottom:var(--space-md);">基础语法交互图解</h2>
      <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">点击元素类型，查看属性说明与实时预览。SVG 只有 7 种核心形状原语，掌握它们就掌握了矢量世界的词汇。</p>
    </div>

    <!-- Tab 按钮 -->
    <div class="p05-elem-tabs" id="p05-elem-tabs">${elementTabs}</div>

    <!-- 预览区 + 属性列表 -->
    <div class="p05-elem-content" id="p05-elem-content">
      <!-- 左：SVG 预览 -->
      <div class="p05-svg-preview-wrap">
        <span class="p05-svg-size-label">160 × 120</span>
        <svg class="p05-svg-canvas" id="p05-svg-canvas" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
          ${firstEl.preview}
        </svg>
      </div>
      <!-- 右：属性列表 -->
      <div class="p05-attr-list">
        <p class="p05-attr-list-title" id="p05-attr-elem-name">${firstEl.name}</p>
        <div id="p05-attr-rows">${buildAttrRows(firstEl)}</div>
        <div class="p05-use-pill" id="p05-use-pill">
          <span class="p05-use-label">适用：</span>
          <span id="p05-use-text">${firstEl.use}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S2 CodeMirror 编辑器 + 实时预览 ── -->
<section class="section-dark" id="p05-s2" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">LIVE EDITOR</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-dark);letter-spacing:-0.02em;margin-bottom:var(--space-md);">SVG 代码编辑器</h2>
      <p style="font-size:1rem;color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">选择科研模板，即时编辑 SVG 代码，右侧实时渲染预览。</p>
    </div>

    <!-- 模板选择 -->
    <div class="p05-template-tabs" id="p05-template-tabs">${templateTabs}</div>

    <!-- 编辑器 + 预览双栏 -->
    <div class="p05-editor-wrap">
      <div class="p05-editor-pane">
        <div class="p05-editor-header">
          <span>SVG 代码</span>
          <span id="p05-byte-count" style="font-family:var(--font-code);font-size:0.75rem;color:var(--text-on-dark-3);">0 B</span>
        </div>
        <div id="p05-editor-container" style="height:360px;overflow:auto;"></div>
      </div>
      <div class="p05-preview-pane">
        <div class="p05-preview-header">
          <span>实时预览</span>
          <span style="font-size:0.75rem;color:var(--text-on-dark-3);">安全沙盒渲染</span>
        </div>
        <div id="p05-svg-preview-live" style="background:var(--bg-light,#fff);border-radius:0 0 var(--radius-md) var(--radius-md);padding:var(--space-lg);min-height:320px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-wrap:wrap;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ── S3 SVG 优化策略 ── -->
<section class="section-light" id="p05-s3" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">OPTIMIZATION</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-light);letter-spacing:-0.02em;margin-bottom:var(--space-md);">三种核心优化策略</h2>
      <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">Illustrator 导出的 SVG 通常比实际需要的大 5-20 倍。以下三步可将文件缩减至最优。</p>
    </div>
    <div class="p05-opt-grid">${optCards}</div>
  </div>
</section>

<!-- ── S4 使用场景 ── -->
<section class="section-dark" id="p05-s4" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">USE CASES</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-dark);letter-spacing:-0.02em;margin-bottom:var(--space-md);">SVG 在科研场景的应用</h2>
      <p style="font-size:1rem;color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">从 LaTeX 论文到期刊投稿，SVG 适配所有专业输出需求。</p>
    </div>
    <div class="p05-scene-tabs" id="p05-scene-tabs">${scenarioTabs}</div>
    <div id="p05-scene-panels">${scenarioPanels}</div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">05 / 07</p>
  <h2 class="page-footer-quote">SVG 是矢量图的源代码——读懂它，你就拥有了完全的控制权。</h2>
  <p class="page-footer-desc">直接编辑 SVG 代码，让你的科研图形精确到每一个像素。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p05-prev-btn">← 图表美化实战</button>
    <button class="btn-primary" id="p05-next-btn">多面板 Figure →</button>
  </div>
</section>

</div>`;
}

// ─── init ─────────────────────────────────────────────────────────────────────
export function init() {
  // ── Hero 动画 ──────────────────────────────────────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p05-hero .hero-eyebrow',   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p05-hero .page-hero-title', { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p05-hero .page-hero-sub',   { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p05-hero-tagline',          { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p05-quicknav',              { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p05-scroll-hint',           { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // ── Quicknav 平滑滚动 ──────────────────────────────────────────────────────
  const quicknavBtns = document.querySelectorAll('#p05-quicknav .hero-quicknav__item');
  quicknavBtns.forEach(btn => {
    const fn = () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    addEvt(btn, 'click', fn);
  });

  // ── S1：元素 Tab 切换 ──────────────────────────────────────────────────────
  const elemTabsEl = document.getElementById('p05-elem-tabs');
  const svgCanvas = document.getElementById('p05-svg-canvas');
  const attrElemName = document.getElementById('p05-attr-elem-name');
  const attrRowsEl = document.getElementById('p05-attr-rows');
  const useTextEl = document.getElementById('p05-use-text');

  function switchElemTab(id) {
    const el = SVG_ELEMENTS.find(e => e.id === id);
    if (!el) return;

    // 更新 Tab 激活状态
    if (elemTabsEl) {
      elemTabsEl.querySelectorAll('.p05-elem-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.elem === id);
      });
    }

    // 更新 SVG 预览（sanitizeSvg 仅对完整 SVG 文档有意义，
    // el.preview 是 SVG 内容片段，直接赋值；内容来自本文件常量，无 XSS 风险）
    if (svgCanvas) svgCanvas.innerHTML = el.preview;

    // 更新属性列表
    if (attrElemName) attrElemName.textContent = el.name;
    if (attrRowsEl) attrRowsEl.innerHTML = buildAttrRows(el);
    if (useTextEl) useTextEl.textContent = el.use;
  }

  if (elemTabsEl) {
    const fn = (e) => {
      const btn = e.target.closest('.p05-elem-tab');
      if (btn) switchElemTab(btn.dataset.elem);
    };
    addEvt(elemTabsEl, 'click', fn);
  }

  // S1 滚动渐入
  fadeIn('#p05-s1 .reading-wrapper');
  fadeIn('#p05-s1 .p05-elem-tabs');
  fadeIn('#p05-s1 .p05-elem-content');

  // ── S2：CodeMirror 编辑器 ──────────────────────────────────────────────────
  const editorContainer = document.getElementById('p05-editor-container');
  const previewLive = document.getElementById('p05-svg-preview-live');
  const byteCount = document.getElementById('p05-byte-count');
  const templateTabsEl = document.getElementById('p05-template-tabs');

  if (editorContainer && previewLive) {
    const initialCode = SVG_TEMPLATES[0].code;

    _editor = createCodeEditor(editorContainer, {
      code: initialCode,
      language: 'xml', // xml 模式：CodeEditor 无对应语言包时退回基础编辑器
      onChange: (code) => {
        updateSvgPreview(code, previewLive, byteCount);
      }
    });

    // 初始预览
    updateSvgPreview(initialCode, previewLive, byteCount);
  }

  // 模板切换
  if (templateTabsEl) {
    const fn = (e) => {
      const btn = e.target.closest('.p05-tmpl-btn');
      if (!btn) return;
      const tmpl = SVG_TEMPLATES.find(t => t.id === btn.dataset.tmpl);
      if (!tmpl) return;

      // 更新激活状态
      templateTabsEl.querySelectorAll('.p05-tmpl-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tmpl === btn.dataset.tmpl);
      });

      // 更新编辑器内容
      if (_editor) _editor.setCode(tmpl.code);

      // 更新预览
      if (previewLive) updateSvgPreview(tmpl.code, previewLive, byteCount);
    };
    addEvt(templateTabsEl, 'click', fn);
  }

  fadeIn('#p05-s2 .content-wrapper > div:first-child');
  fadeIn('.p05-template-tabs');
  fadeIn('.p05-editor-wrap');

  // ── S3：优化策略滚动动画 ──────────────────────────────────────────────────
  fadeIn('#p05-s3 .reading-wrapper');
  fadeIn('.p05-opt-grid .p05-opt-card');

  // ── S4：场景 Tab 切换 ──────────────────────────────────────────────────────
  const sceneTabsEl = document.getElementById('p05-scene-tabs');
  const scenePanelsEl = document.getElementById('p05-scene-panels');

  function switchSceneTab(id) {
    if (sceneTabsEl) {
      sceneTabsEl.querySelectorAll('.p05-scene-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.scene === id);
      });
    }
    if (scenePanelsEl) {
      scenePanelsEl.querySelectorAll('.p05-scene-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === `p05-scene-${id}`);
      });
    }
  }

  if (sceneTabsEl) {
    const fn = (e) => {
      const btn = e.target.closest('.p05-scene-tab');
      if (btn) switchSceneTab(btn.dataset.scene);
    };
    addEvt(sceneTabsEl, 'click', fn);
  }

  fadeIn('#p05-s4 .content-wrapper > div:first-child');
  fadeIn('#p05-scene-tabs');
  fadeIn('#p05-scene-panels');

  // ── Footer 导航 ────────────────────────────────────────────────────────────
  const prevBtn = document.getElementById('p05-prev-btn');
  const homeBtn = document.getElementById('p05-home-btn');
  const nextBtn = document.getElementById('p05-next-btn');

  if (prevBtn) addEvt(prevBtn, 'click', () => navigateTo('m3-p4'));
  if (homeBtn) addEvt(homeBtn, 'click', () => navigateTo('m3-p1'));
  if (nextBtn) addEvt(nextBtn, 'click', () => navigateTo('m3-p6'));

  fadeIn('.page-footer-cta .page-footer-num, .page-footer-cta .page-footer-quote, .page-footer-cta .page-footer-nav');
}

// ─── destroy ──────────────────────────────────────────────────────────────────
export function destroy() {
  killAll();

  if (_editor) {
    _editor.destroy();
    _editor = null;
  }

  _eventHandlers.forEach(({ el, type, fn, opts }) => {
    el.removeEventListener(type, fn, opts);
  });
  _eventHandlers = [];

  _observers.forEach(o => o.disconnect());
  _observers = [];

  // 清理预览 DOM
  const previewLive = document.getElementById('p05-svg-preview-live');
  if (previewLive) previewLive.innerHTML = '';
}
