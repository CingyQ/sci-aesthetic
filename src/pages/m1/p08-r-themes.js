// p08-r-themes.js — R 配色与出版级图表
// 配色包浏览器 + 主题定制器 + ggsave 生成器 + patchwork 布局

import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ══════════════════════════════════════════════════════
//  配色包数据
// ══════════════════════════════════════════════════════

const PKG_DATA = [
  {
    id: 'RColorBrewer',
    label: 'RColorBrewer',
    desc: '经典 ColorBrewer 体系，支持连续/发散/定性三类',
    install: 'install.packages("RColorBrewer")',
    groups: [
      { name: '定性 Qualitative', palettes: [
        { name: 'Set1',    n: 9,  colors: ['#E41A1C','#377EB8','#4DAF4A','#984EA3','#FF7F00','#FFFF33','#A65628','#F781BF','#999999'] },
        { name: 'Set2',    n: 8,  colors: ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854','#FFD92F','#E5C494','#B3B3B3'] },
        { name: 'Set3',    n: 8,  colors: ['#8DD3C7','#FFFFB3','#BEBADA','#FB8072','#80B1D3','#FDB462','#B3DE69','#FCCDE5'] },
        { name: 'Paired',  n: 8,  colors: ['#A6CEE3','#1F78B4','#B2DF8A','#33A02C','#FB9A99','#E31A1C','#FDBF6F','#FF7F00'] },
        { name: 'Dark2',   n: 8,  colors: ['#1B9E77','#D95F02','#7570B3','#E7298A','#66A61E','#E6AB02','#A6761D','#666666'] },
        { name: 'Accent',  n: 8,  colors: ['#7FC97F','#BEAED4','#FDC086','#FFFF99','#386CB0','#F0027F','#BF5B17','#666666'] },
      ]},
      { name: '连续 Sequential', palettes: [
        { name: 'Blues',   n: 7,  colors: ['#EFF3FF','#C6DBEF','#9ECAE1','#6BAED6','#4292C6','#2171B5','#084594'] },
        { name: 'Reds',    n: 7,  colors: ['#FEE5D9','#FCBBA1','#FC9272','#FB6A4A','#EF3B2C','#CB181D','#99000D'] },
        { name: 'Greens',  n: 7,  colors: ['#EDF8E9','#C7E9C0','#A1D99B','#74C476','#41AB5D','#238B45','#005A32'] },
        { name: 'Purples', n: 7,  colors: ['#F2F0F7','#DADAEB','#BCBDDC','#9E9AC8','#807DBA','#6A51A3','#4A1486'] },
        { name: 'YlOrRd',  n: 6,  colors: ['#FFFFB2','#FED976','#FEB24C','#FD8D3C','#F03B20','#BD0026'] },
        { name: 'YlGnBu',  n: 7,  colors: ['#FFFFCC','#C7E9B4','#7FCDBB','#41B6C4','#1D91C0','#225EA8','#0C2C84'] },
      ]},
      { name: '发散 Diverging', palettes: [
        { name: 'RdBu',     n: 7, colors: ['#B2182B','#EF8A62','#FDDBC7','#F7F7F7','#D1E5F0','#67A9CF','#2166AC'] },
        { name: 'Spectral', n: 7, colors: ['#D53E4F','#FC8D59','#FEE08B','#FFFFBF','#E6F598','#99D594','#3288BD'] },
        { name: 'RdYlBu',  n: 7,  colors: ['#D73027','#FC8D59','#FEE090','#FFFFBF','#E0F3F8','#91BFDB','#4575B4'] },
        { name: 'BrBG',    n: 7,  colors: ['#543005','#8C510A','#BF812D','#F6E8C3','#C7EAE5','#5AB4AC','#01665E'] },
        { name: 'PiYG',    n: 7,  colors: ['#8E0152','#C51B7D','#DE77AE','#F7F7F7','#7FBC41','#4D9221','#276419'] },
      ]},
    ],
    scaleColor: 'scale_color_brewer(palette = "Set1")',
    scaleFill:  'scale_fill_brewer(palette = "Blues")',
  },
  {
    id: 'viridis',
    label: 'viridis',
    desc: '感知均匀、色盲友好，灰度打印仍清晰，Python/R 通用',
    install: 'install.packages("viridisLite")',
    groups: [
      { name: '连续色板（感知均匀）', palettes: [
        { name: 'viridis', n: 8, colors: ['#440154','#482878','#3E4989','#31688E','#26828E','#1F9E89','#35B779','#FDE725'] },
        { name: 'magma',   n: 8, colors: ['#000004','#1B1044','#4F127B','#812581','#B5367A','#E55C30','#FCA50A','#FCFDBF'] },
        { name: 'inferno', n: 8, colors: ['#000004','#1B0C42','#4B0C6B','#781C6D','#A52C60','#CF4446','#ED6925','#FCCD25'] },
        { name: 'plasma',  n: 8, colors: ['#0D0887','#5302A3','#8B0AA5','#B83289','#DB5C68','#F48849','#FEBD2A','#F0F921'] },
        { name: 'cividis', n: 8, colors: ['#00204D','#213D6B','#3B5C8A','#557AA6','#7095BD','#8CB0D2','#AECBDF','#E0E0D8'] },
        { name: 'rocket',  n: 8, colors: ['#03051A','#2A1459','#6B185C','#A32351','#D84D36','#F5872A','#FECB14','#FAEF9C'] },
        { name: 'mako',    n: 8, colors: ['#0B0405','#220E1D','#41214B','#5B3B77','#7464AA','#98A0D6','#C2CFF0','#DEF5E5'] },
        { name: 'turbo',   n: 8, colors: ['#23171B','#4A58DD','#2AB9FF','#10FA8B','#ADF821','#FFC623','#F95F00','#900C00'] },
      ]},
    ],
    scaleColor: 'scale_color_viridis_d(option = "viridis")',
    scaleFill:  'scale_fill_viridis_c(option = "plasma")',
  },
  {
    id: 'ggsci',
    label: 'ggsci',
    desc: '期刊及影视官方配色，NPG / Science / NEJM / Lancet 直接可用',
    install: 'install.packages("ggsci")',
    groups: [
      { name: '学术期刊', palettes: [
        { name: 'npg',    n: 8, colors: ['#E64B35','#4DBBD5','#00A087','#3C5488','#F39B7F','#8491B4','#91D1C2','#DC0000'] },
        { name: 'aaas',   n: 8, colors: ['#3B4992','#EE0000','#008B45','#631879','#008280','#BB0021','#5F559B','#A20056'] },
        { name: 'nejm',   n: 8, colors: ['#BC3C29','#0072B5','#E18727','#20854E','#7876B1','#6F99AD','#FFDC91','#EE4C97'] },
        { name: 'lancet', n: 8, colors: ['#00468B','#ED0000','#42B540','#0099B4','#925E9F','#FDAF91','#AD002A','#ADB6B6'] },
        { name: 'jco',    n: 8, colors: ['#0073C2','#EFC000','#868686','#CD534C','#7AA6DC','#003C67','#8F7700','#3B3B3B'] },
        { name: 'jama',   n: 8, colors: ['#374E55','#DF8F44','#00A1D5','#B24745','#79AF97','#6A6599','#80796B','#000000'] },
      ]},
      { name: '流行文化', palettes: [
        { name: 'd3',         n: 8, colors: ['#1F77B4','#FF7F0E','#2CA02C','#D62728','#9467BD','#8C564B','#E377C2','#7F7F7F'] },
        { name: 'futurama',   n: 7, colors: ['#FF6F00','#C71585','#008B00','#8B008B','#0000CD','#FF7F50','#DC143C'] },
        { name: 'simpsons',   n: 8, colors: ['#FED439','#709AE1','#8A9197','#D2AF81','#FD7446','#D5E4A2','#197EC0','#F05C3B'] },
        { name: 'rickandmorty', n: 6, colors: ['#FAFD7C','#82491E','#24325F','#B7E4F9','#FB6467','#526E2D'] },
      ]},
    ],
    scaleColor: 'scale_color_npg()',
    scaleFill:  'scale_fill_lancet()',
  },
  {
    id: 'wesanderson',
    label: 'wesanderson',
    desc: '韦斯·安德森电影配色，温柔克制，对称精致，适合演示与封面',
    install: 'install.packages("wesanderson")',
    groups: [
      { name: '电影配色', palettes: [
        { name: 'GrandBudapest1', n: 4, colors: ['#F1BB7B','#FD6467','#5B1A18','#D67236'] },
        { name: 'GrandBudapest2', n: 4, colors: ['#E6A0C4','#C6CDF7','#D8A499','#7294D4'] },
        { name: 'Moonrise1',      n: 4, colors: ['#F3DF6C','#CEAB07','#D5D5D3','#24281A'] },
        { name: 'Moonrise3',      n: 5, colors: ['#85D4E3','#F4B5BD','#9C964A','#CDC08C','#FAD77B'] },
        { name: 'Cavalcanti1',    n: 5, colors: ['#D8B70A','#02401B','#A2A475','#81A88D','#972D15'] },
        { name: 'Royal2',         n: 5, colors: ['#9A8822','#F5CDB4','#F8AFA8','#FDDDA0','#74A089'] },
        { name: 'Darjeeling1',    n: 5, colors: ['#FF0000','#00A08A','#F2AD00','#F98400','#5BBCD6'] },
        { name: 'FantasticFox1',  n: 5, colors: ['#DD8D29','#E2D200','#46ACC8','#E58601','#B40F20'] },
        { name: 'Zissou1',        n: 5, colors: ['#3B9AB2','#78B7C5','#EBCC2A','#E1AF00','#F21A00'] },
        { name: 'IsleofDogs1',    n: 5, colors: ['#9986A5','#79402E','#CCBA72','#0F0D0E','#D9D0D3'] },
      ]},
    ],
    scaleColor: 'scale_color_manual(values = wes_palette("GrandBudapest1"))',
    scaleFill:  'scale_fill_manual(values = wes_palette("Moonrise3"))',
  },
  {
    id: 'MetBrewer',
    label: 'MetBrewer',
    desc: '大都会艺术博物馆馆藏名画配色，艺术感强，适合高影响力出版',
    install: 'install.packages("MetBrewer")',
    groups: [
      { name: '名画配色', palettes: [
        { name: 'Hiroshige', n: 7, colors: ['#E76254','#EF8A47','#F7AA58','#FFE6B7','#AAD3D3','#80B4C6','#476F84'] },
        { name: 'VanGogh3',  n: 7, colors: ['#E9D097','#C7B581','#A59963','#7C7146','#5A5232','#382E20','#2A1F16'] },
        { name: 'Monet',     n: 6, colors: ['#4E6D58','#749474','#A6B49A','#D7CFC7','#E8D6B3','#E5C194'] },
        { name: 'Hokusai2',  n: 6, colors: ['#6D8325','#AEAC6E','#CEBF84','#E3D0A4','#F3CEC8','#F2A497'] },
        { name: 'Kandinsky', n: 6, colors: ['#3B7EC1','#CE3D3D','#80B6C5','#ECCE66','#6A4C9C','#F5A623'] },
        { name: 'Klimt',     n: 6, colors: ['#DF9B44','#B5621B','#7D3C15','#5C3015','#323D2F','#1A4A37'] },
        { name: 'Renoir',    n: 6, colors: ['#17154F','#2F357C','#6C5D9E','#9D9DC7','#C4C1DC','#F3D0AE'] },
        { name: 'Juarez',    n: 6, colors: ['#A82203','#208CC0','#F1AF3A','#CF5E4E','#637B31','#72BAC5'] },
        { name: 'Degas',     n: 5, colors: ['#591C19','#96410E','#C67B44','#E9B870','#DCD3BA'] },
        { name: 'Ingres',    n: 6, colors: ['#041E43','#042D72','#2471A3','#85C1E9','#D4E6F1','#F9EBEA'] },
        { name: 'Isfahan1',  n: 6, colors: ['#4E3910','#845D29','#C0A585','#EDE1C8','#7DBBC3','#F5A40C'] },
        { name: 'Egypt',     n: 4, colors: ['#DD5129','#0F7BA2','#43B284','#FAB255'] },
      ]},
    ],
    scaleColor: 'scale_color_met_d("Hiroshige")',
    scaleFill:  'scale_fill_met_d("Monet")',
  },
];

// ══════════════════════════════════════════════════════
//  期刊规格数据
// ══════════════════════════════════════════════════════

const JOURNALS = {
  nature: {
    label: 'Nature',
    color: '#E64B35',
    font: 'Helvetica / Arial',
    fontNote: '6–9 pt，坐标轴标签 ≥ 5 pt',
    cols: { 1: 89, 1.5: 120, 2: 183 },
    maxHeight: 234,
    dpi: 300,
    formats: ['TIFF','EPS','PDF'],
    notes: '彩图收取额外费用；图例需在图内，不单独页面',
  },
  science: {
    label: 'Science',
    color: '#3B4992',
    font: 'Helvetica',
    fontNote: '7–9 pt，最小 6 pt',
    cols: { 1: 57, 1.5: 100, 2: 120 },
    maxHeight: 200,
    dpi: 300,
    formats: ['TIFF','EPS','PDF'],
    notes: '图片必须嵌入字体；矢量格式优先',
  },
  cell: {
    label: 'Cell',
    color: '#00A087',
    font: 'Arial',
    fontNote: '6–8 pt',
    cols: { 1: 85, 1.5: 114, 2: 178 },
    maxHeight: 235,
    dpi: 300,
    formats: ['TIFF','EPS','PDF'],
    notes: '单栏图不超过 85mm；图注 8 pt Arial',
  },
  pnas: {
    label: 'PNAS',
    color: '#0072B5',
    font: 'Helvetica',
    fontNote: '6–9 pt',
    cols: { 1: 87, 1.5: 114, 2: 178 },
    maxHeight: 230,
    dpi: { color: 300, line: 600 },
    formats: ['TIFF','EPS','SVG'],
    notes: '线条图 600 DPI；彩色图 300 DPI；不接受 JPEG',
  },
  lancet: {
    label: 'Lancet',
    color: '#AD002A',
    font: 'Arial / Helvetica',
    fontNote: '8 pt，最小 6 pt',
    cols: { 1: 85, 1.5: 114, 2: 170 },
    maxHeight: 220,
    dpi: 300,
    formats: ['TIFF','EPS','PDF'],
    notes: '彩图需说明是否必要；颜色需在黑白下仍可区分',
  },
};

// ══════════════════════════════════════════════════════
//  Patchwork 布局
// ══════════════════════════════════════════════════════

const PATCHWORK_LAYOUTS = [
  {
    id: 'h2',
    label: 'A | B',
    desc: '两图并排（水平拼接）',
    code: `library(patchwork)

p1 <- ggplot(df, aes(x, y, color = group)) +
  geom_point(size = 2) +
  theme_minimal(base_size = 12)

p2 <- ggplot(df, aes(group, value, fill = group)) +
  geom_col() +
  theme_minimal(base_size = 12)

# 水平拼接
p1 | p2

# 等价写法
p1 + p2 + plot_layout(ncol = 2)`,
  },
  {
    id: 'v2',
    label: 'A / B',
    desc: '两图叠放（垂直拼接）',
    code: `library(patchwork)

# 垂直拼接
p1 / p2

# 调整高度比
p1 / p2 + plot_layout(heights = c(2, 1))`,
  },
  {
    id: 'h2v',
    label: '(A | B) / C',
    desc: '上方两图并排，下方一图全宽',
    code: `library(patchwork)

# (A | B) 上方 + C 下方全宽
(p1 | p2) / p3

# 添加统一图注
(p1 | p2) / p3 +
  plot_layout(heights = c(1, 0.8)) +
  plot_annotation(
    title    = "图 1  实验结果综合展示",
    theme    = theme(plot.title = element_text(
                 size = 14, face = "bold"))
  )`,
  },
  {
    id: 'g4',
    label: '(A+B) / (C+D)',
    desc: '2×2 四图网格布局',
    code: `library(patchwork)

# 2×2 四图网格
(p1 + p2) / (p3 + p4)

# 添加面板标签 A B C D
(p1 + p2) / (p3 + p4) +
  plot_annotation(
    tag_levels = "A",           # 自动标注 A B C D
    tag_prefix = "(",
    tag_suffix = ")"
  ) &
  theme(plot.tag = element_text(
    size = 10, face = "bold"))`,
  },
];

// ══════════════════════════════════════════════════════
//  主题定制器 — 预设配色方案（mini palette selector）
// ══════════════════════════════════════════════════════

const MINI_PALETTES = [
  { name: 'Default',    colors: ['#7EC8E3','#F0B27A','#95D5B2'] },
  { name: 'NPG',        colors: ['#E64B35','#4DBBD5','#00A087'] },
  { name: 'Viridis',    colors: ['#440154','#21918C','#FDE725'] },
  { name: 'D3 Classic', colors: ['#1F77B4','#FF7F0E','#2CA02C'] },
  { name: 'Warm',       colors: ['#D53E4F','#FC8D59','#FEE08B'] },
  { name: 'Cool',       colors: ['#2166AC','#67A9CF','#B8B8E8'] },
  { name: 'Hiroshige',  colors: ['#E76254','#AAD3D3','#476F84'] },
  { name: 'Pastel',     colors: ['#A6CEE3','#B2DF8A','#FB9A99'] },
];

// ══════════════════════════════════════════════════════
//  图表数据（固定种子）
// ══════════════════════════════════════════════════════

function seededRng(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}
function makeNorm(rng) {
  return () => {
    const u = Math.max(1e-10, rng()), v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

const BAR_CATS = ['Control','Trt-A','Trt-B','Trt-C','Trt-D','Trt-F'];
const BAR_VALS = (() => { const r = seededRng(42); return BAR_CATS.map(() => 20 + r() * 60); })();

const SCATTER_PTS = (() => {
  const r = seededRng(99); const n = makeNorm(r);
  const specs = [
    { g: 0, mx: 2.2, my: 3.0, s: 0.5 },
    { g: 1, mx: 4.5, my: 5.5, s: 0.6 },
    { g: 2, mx: 6.8, my: 7.2, s: 0.4 },
    { g: 3, mx: 3.5, my: 8.0, s: 0.5 },
  ];
  const pts = [];
  specs.forEach(sp => {
    for (let i = 0; i < 18; i++) pts.push({ x: sp.mx + sp.s * n(), y: sp.my + sp.s * n(), g: sp.g });
  });
  return pts;
})();

const LINE_PTS = (() => {
  const r = seededRng(77);
  const xs = [0, 2, 4, 6, 8, 10, 12];
  return [
    { g: 0, base: 20, slope: 4  },
    { g: 1, base: 20, slope: 9  },
    { g: 2, base: 20, slope: 14 },
    { g: 3, base: 20, slope: 6  },
  ].map(s => ({ g: s.g, pts: xs.map(x => ({ x, y: s.base + s.slope * x + (r() - 0.5) * 8 })) }));
})();

// ══════════════════════════════════════════════════════
//  状态
// ══════════════════════════════════════════════════════

let state = {
  activePkg: 'RColorBrewer',
  activePal: null,       // { name, colors }
  chartType: 'bar',      // bar | scatter | line
  themeParams: {
    baseTheme:   'minimal',
    bgColor:     '#ffffff',
    fontFamily:  'sans',
    fontSize:    12,
    paletteIdx:  0,
    gridLines:   'major',
    gridColor:   'light',
    axisLines:   'show',
    axisTicks:   'outside',
    axisAngle:    0,
    legendPos:   'right',
    legendDir:   'vertical',
    legendBox:   'none',
    legendKey:   'medium',
    showTitle:   true,
    titleAlign:  'left',
    showCaption: false,
    showRegline: true,
  },
  ggsaveParams: {
    journal: 'nature',
    col: '1',
    format: 'PDF',
  },
  patchworkLayout: 'h2',
  codeEditor: null,
  cleanupFns: [],
  resizeObservers: [],
};

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════

export function render() {
  return `
<div class="page-scroll" id="p8-root">
<style>
/* ── page vars ── */
#p8-root { --p8-accent: #7EC8E3; }

/* ── Hero ── */
.p8-hero {
  position: relative;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  overflow: hidden;
  min-height: 100vh;
  min-height: 100dvh;
}
.p8-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 30% 40%, rgba(240,178,122,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 75% 65%, rgba(126,200,227,0.14) 0%, transparent 70%);
  animation: p8GlowA 12s ease-in-out infinite alternate;
  pointer-events: none;
}
.p8-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 40% at 70% 30%, rgba(149,213,178,0.10) 0%, transparent 65%);
  animation: p8GlowB 9s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}
@keyframes p8GlowA { 0% { transform: translateX(0)  translateY(0);  } 100% { transform: translateX(40px) translateY(-20px); } }
@keyframes p8GlowB { 0% { transform: translateX(0)  translateY(0);  } 100% { transform: translateX(-30px) translateY(30px); } }

.hero-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
  position: relative;
}

.p8-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: p8-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}
@keyframes p8-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── Section headers ── */
.p8-sec-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}
.p8-sec-label {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: block;
  margin-bottom: var(--space-xs);
}
.p8-sec-title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: var(--space-sm);
}
.p8-sec-desc {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

/* ── Browser layout (Section 1) ── */
.p8-browser-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p8-browser-inner {
  max-width: var(--w-full);
  margin: 0 auto;
}
.p8-browser-layout {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
}
.p8-browser-left {
  flex: 0 0 42%;
  min-width: 0;
  max-height: 640px;
  overflow-y: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background: #fff;
}
.p8-browser-left::-webkit-scrollbar { width: 4px; }
.p8-browser-left::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

.p8-browser-right {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.p8-browser-sticky {
  position: sticky;
  top: 80px;
}

/* Package accordion */
.p8-pkg-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 14px var(--space-md);
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
  transition: background var(--t-fast);
  user-select: none;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
}
.p8-pkg-header:hover { background: var(--bg-light-alt); }
.p8-pkg-header.active { background: var(--bg-light-alt); }
.p8-pkg-name {
  font-family: var(--font-code);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-on-light);
}
.p8-pkg-desc-short {
  font-size: 0.78rem;
  color: var(--text-on-light-3);
  margin-left: auto;
  white-space: nowrap;
}
.p8-pkg-chevron {
  margin-left: 4px;
  font-size: 0.7rem;
  color: var(--text-on-light-3);
  transition: transform var(--t-fast);
}
.p8-pkg-body { display: none; }
.p8-pkg-body.open { display: block; }
.p8-pkg-chevron.open { transform: rotate(90deg); }

.p8-pal-group-label {
  font-size: 0.72rem;
  font-family: var(--font-code);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-on-light-3);
  padding: 10px var(--space-md) 6px;
  border-bottom: 1px solid var(--border-light);
}

.p8-pal-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px var(--space-md);
  cursor: pointer;
  transition: background var(--t-fast);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.p8-pal-row:hover { background: var(--bg-light-alt); }
.p8-pal-row.active {
  background: var(--accent-subtle);
  border-left: 3px solid var(--accent);
}
.p8-pal-name {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-light-2);
  min-width: 90px;
  flex-shrink: 0;
}
.p8-pal-swatches {
  display: flex;
  gap: 2px;
  flex: 1;
}
.p8-swatch {
  height: 18px;
  flex: 1;
  border-radius: 2px;
  min-width: 8px;
}

/* Right panel */
.p8-chart-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}
.p8-chart-tab {
  padding: 7px 16px;
  border-radius: var(--radius-full);
  background: var(--bg-light-alt);
  border: 1.5px solid var(--border-light);
  color: var(--text-on-light-2);
  font-family: var(--font-heading);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 36px;
}
.p8-chart-tab:hover { border-color: var(--accent); color: var(--text-on-light); }
.p8-chart-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.p8-chart-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: #fff;
  margin-bottom: var(--space-md);
}
.p8-chart-wrap svg { display: block; width: 100%; }

.p8-pal-info {
  background: var(--bg-light-alt);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.p8-pal-info-name {
  font-family: var(--font-code);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-on-light);
}
.p8-scale-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.p8-scale-badge {
  font-size: 0.7rem;
  font-family: var(--font-code);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
.p8-scale-badge.color { background: rgba(126,200,227,0.12); color: var(--accent-hover); border: 1px solid rgba(126,200,227,0.3); }
.p8-scale-badge.fill  { background: rgba(240,178,122,0.12); color: #d4844a; border: 1px solid rgba(240,178,122,0.3); }
.p8-scale-code {
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: var(--text-on-light-2);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.p8-copy-btn {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1.5px solid var(--border-light);
  color: var(--text-on-light-2);
  font-size: 0.78rem;
  font-family: var(--font-heading);
  cursor: pointer;
  transition: all var(--t-fast);
  white-space: nowrap;
  min-height: 32px;
}
.p8-copy-btn:hover { border-color: var(--accent); color: var(--accent); }
.p8-copy-btn.copied { background: var(--accent); border-color: var(--accent); color: #fff; }

/* scale_color vs scale_fill 说明 */
.p8-scale-explain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-xl);
  max-width: var(--w-content);
  margin-left: auto;
  margin-right: auto;
}
.p8-scale-card {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
.p8-scale-card-title {
  font-family: var(--font-code);
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.p8-scale-card.color .p8-scale-card-title { color: #2196F3; }
.p8-scale-card.fill  .p8-scale-card-title { color: #FF9800; }
.p8-scale-card p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-on-light-2);
}
.p8-scale-card code {
  font-family: var(--font-code);
  font-size: 0.78rem;
  background: var(--bg-light-alt);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-on-light);
}

/* ── Theme customizer (Section 2) ── */
.p8-theme-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p8-theme-inner {
  max-width: var(--w-full);
  margin: 0 auto;
}
.p8-theme-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-lg);
  align-items: flex-start;
}
/* Controls panel */
.p8-theme-controls {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-width: 0;
}
/* Tab strip */
.p8-ctrl-tabs {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid var(--border-dark);
}
.p8-ctrl-tabs::-webkit-scrollbar { display: none; }
.p8-ctrl-tab {
  flex: 1 1 0;
  padding: 11px 8px;
  font-size: 0.76rem;
  font-family: var(--font-heading);
  font-weight: 500;
  color: var(--text-on-dark-3);
  cursor: pointer;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: all var(--t-fast);
  min-height: 40px;
}
.p8-ctrl-tab:hover { color: var(--text-on-dark); }
.p8-ctrl-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
/* Group panels */
.p8-ctrl-group-panel {
  display: none;
  padding: var(--space-md);
  flex-direction: column;
  gap: 16px;
}
.p8-ctrl-group-panel.active { display: flex; }
/* Control row */
.p8-ctrl-group { display: flex; flex-direction: column; gap: 8px; }
.p8-ctrl-label {
  font-size: 0.78rem;
  color: var(--text-on-dark-3);
  font-family: var(--font-heading);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.p8-ctrl-label-val {
  font-family: var(--font-code);
  color: var(--accent);
  font-size: 0.8rem;
}
/* Button group */
.p8-btn-group {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.p8-btn-opt {
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1.5px solid var(--border-dark);
  color: var(--text-on-dark-3);
  font-size: 0.75rem;
  font-family: var(--font-code);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 32px;
}
.p8-btn-opt:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p8-btn-opt.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }
/* Range slider */
.p8-range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: var(--border-dark);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
}
.p8-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg-dark);
  cursor: pointer;
  transition: transform var(--t-fast);
}
.p8-range-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.p8-range-slider::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent); border: 2px solid var(--bg-dark); cursor: pointer;
}
/* Mini palette grid */
.p8-mini-pals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}
.p8-mini-pal {
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  padding: 4px;
  transition: all var(--t-fast);
  background: rgba(255,255,255,0.04);
}
.p8-mini-pal:hover { border-color: var(--accent); }
.p8-mini-pal.active { border-color: var(--accent); background: rgba(126,200,227,0.12); }
.p8-mini-pal-dots { display: flex; gap: 2px; margin-bottom: 3px; }
.p8-mini-pal-dot { flex: 1; height: 8px; border-radius: 2px; }
.p8-mini-pal-name {
  font-size: 0.6rem;
  font-family: var(--font-code);
  color: var(--text-on-dark-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
/* Background swatches */
.p8-bg-swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.p8-bg-swatch {
  width: 34px; height: 34px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--border-dark);
  cursor: pointer;
  transition: all var(--t-fast);
}
.p8-bg-swatch:hover { border-color: var(--accent); transform: scale(1.1); }
.p8-bg-swatch.active { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(126,200,227,0.4); }
/* Toggle switch */
.p8-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.p8-toggle-label { font-size: 0.78rem; color: var(--text-on-dark-3); font-family: var(--font-heading); }
.p8-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
.p8-toggle input { opacity: 0; width: 0; height: 0; }
.p8-toggle-track {
  position: absolute; inset: 0;
  background: var(--border-dark);
  border-radius: 10px;
  cursor: pointer;
  transition: background var(--t-fast);
}
.p8-toggle input:checked + .p8-toggle-track { background: var(--accent); }
.p8-toggle-track::after {
  content: '';
  position: absolute;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #fff;
  top: 3px; left: 3px;
  transition: transform var(--t-fast);
}
.p8-toggle input:checked + .p8-toggle-track::after { transform: translateX(16px); }
/* Preview area */
.p8-theme-preview-wrap { display: flex; flex-direction: column; gap: var(--space-md); min-width: 0; }
.p8-theme-chart-box {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-dark);
}
.p8-theme-chart-box svg { display: block; width: 100%; }
.p8-code-box {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-dark);
}
.p8-code-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--space-md);
  border-bottom: 1px solid var(--border-dark);
}
.p8-code-box-title {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-dark-3);
  letter-spacing: 0.05em;
}
.p8-code-editor-wrap { min-height: 200px; }

/* ── ggsave section (Section 3) ── */
.p8-ggsave-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p8-ggsave-inner {
  max-width: 860px;
  margin: 0 auto;
}
.p8-journal-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-xl);
}
.p8-journal-btn {
  padding: 10px 22px;
  border-radius: var(--radius-full);
  background: #fff;
  border: 2px solid var(--border-light);
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-base);
  min-height: 44px;
}
.p8-journal-btn:hover { border-color: var(--accent); color: var(--text-on-light); }
.p8-journal-btn.active { color: #fff; border-color: transparent; }

.p8-ggsave-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}
.p8-ctrl-section {
  background: var(--bg-light-alt);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
.p8-ctrl-section-label {
  font-size: 0.78rem;
  font-family: var(--font-code);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-on-light-3);
  margin-bottom: 10px;
  display: block;
}
.p8-light-btn-group { display: flex; gap: 4px; flex-wrap: wrap; }
.p8-light-btn {
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: #fff;
  border: 1.5px solid var(--border-light);
  font-size: 0.82rem;
  font-family: var(--font-code);
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 36px;
}
.p8-light-btn:hover { border-color: var(--accent); color: var(--accent); }
.p8-light-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.p8-specs-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: var(--space-lg);
}
.p8-spec-item {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}
.p8-spec-label { font-size: 0.72rem; color: var(--text-on-light-3); font-family: var(--font-code); text-transform: uppercase; letter-spacing: 0.08em; }
.p8-spec-value { font-size: 1.05rem; font-weight: 700; color: var(--text-on-light); font-family: var(--font-code); margin-top: 4px; }

.p8-code-output-light {
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.p8-code-output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--space-md);
  border-bottom: 1px solid var(--border-dark);
}
.p8-code-output-title {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-dark-3);
}
.p8-code-output-pre {
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: #abb2bf;
  padding: var(--space-md);
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
}

.p8-journal-note {
  font-size: 0.82rem;
  color: var(--text-on-light-3);
  text-align: center;
  margin-top: var(--space-md);
  font-style: italic;
  line-height: 1.5;
}

/* ── Patchwork (Section 4) ── */
.p8-patchwork-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p8-patchwork-inner {
  max-width: 900px;
  margin: 0 auto;
}
.p8-layout-tabs {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}
.p8-layout-tab {
  padding: 10px 24px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1.5px solid var(--border-dark);
  color: var(--text-on-dark-2);
  font-family: var(--font-code);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}
.p8-layout-tab:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p8-layout-tab.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }

.p8-layout-desc {
  text-align: center;
  font-size: 0.88rem;
  color: var(--text-on-dark-3);
  margin-bottom: var(--space-lg);
  font-family: var(--font-body);
}

.p8-patchwork-preview-box {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-lg);
}
.p8-patchwork-preview-box svg { display: block; width: 100%; }

/* ── Footer CTA ── */
.page-footer-cta {
  background: var(--bg-dark-deep);
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .p8-theme-layout { grid-template-columns: 280px 1fr; }
}
@media (max-width: 900px) {
  .p8-browser-layout { flex-direction: column; }
  .p8-browser-left { flex: none; width: 100%; max-height: 380px; }
  .p8-browser-sticky { position: static; }
  .p8-theme-layout { grid-template-columns: 1fr; }
  .p8-scale-explain { grid-template-columns: 1fr; }
  .p8-ggsave-controls { grid-template-columns: 1fr; }
  .p8-specs-row { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .p8-browser-section,
  .p8-theme-section,
  .p8-ggsave-section,
  .p8-patchwork-section { padding: var(--space-xl) var(--space-sm); }

  /* Browser section fixes */
  .p8-browser-left, .p8-browser-right { min-width: 0; overflow: hidden; }
  .p8-pal-info { min-width: 0; overflow: hidden; }
  .p8-pal-name { min-width: 70px; font-size: 0.74rem; }
  /* Scale row: wrap on mobile so code fits */
  .p8-scale-row { flex-wrap: wrap; gap: 6px; align-items: center; }
  .p8-scale-code {
    flex: 1 1 100%;       /* take full row on wrap */
    white-space: normal;
    word-break: break-all;
    overflow-wrap: break-word;
    overflow: visible;
    text-overflow: clip;
    font-size: 0.72rem;
    padding: 2px 0;
  }
  .p8-copy-btn { margin-left: auto; }
  /* Scale cards */
  .p8-scale-card code { word-break: break-all; }

  /* ggsave section */
  .p8-specs-row { grid-template-columns: repeat(2, 1fr); }

  /* Theme customizer */
  .p8-range-slider { min-height: 36px; }
  .p8-range-slider::-webkit-slider-thumb { width: 24px; height: 24px; }
  .p8-range-slider::-moz-range-thumb { width: 24px; height: 24px; }
  .p8-mini-pals { grid-template-columns: repeat(4, 1fr); }
  .p8-ctrl-tab { padding: 11px 6px; font-size: 0.7rem; }
}
@media (max-width: 480px) {
  .p8-specs-row { grid-template-columns: 1fr 1fr; }
  .p8-journal-btn { padding: 8px 16px; font-size: 0.82rem; }
  .p8-bg-swatch { width: 30px; height: 30px; }
  .p8-pal-name { min-width: 60px; }
  .p8-scale-badge { font-size: 0.65rem; padding: 2px 6px; }
}
</style>

<!-- ═══════════ HERO ═══════════ -->
<section class="section-dark section-hero-full p8-hero" id="p8-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 01 / Page 08</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">R 配色与出版级图表</h1>
    <p class="page-hero-sub" style="opacity:0;">R Color Packages &amp; Publication-Ready Figures</p>
    <p class="p8-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
      掌握 RColorBrewer、viridis、ggsci 等专业配色包，将图表调整到顶刊投稿标准。
    </p>
    <nav class="hero-quicknav" id="p8-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p8-browser">配色包浏览器</button>
      <button class="hero-quicknav__item" data-target="#p8-theme">主题定制器</button>
      <button class="hero-quicknav__item" data-target="#p8-ggsave">ggsave 生成器</button>
      <button class="hero-quicknav__item" data-target="#p8-patchwork">patchwork 布局</button>
    </nav>
    <div class="p8-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ═══════════ Section 1: 配色包浏览器 ═══════════ -->
<section id="p8-browser" class="p8-browser-section">
  <div class="p8-browser-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">R 配色系统</span>
      <h2 class="p8-sec-title" style="color:var(--text-on-light);">五大配色包全览</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-light-2);">
        从 ColorBrewer 的科学配色到 MetBrewer 的艺术馆名画配色，点击色板即时预览在图表中的效果。
      </p>
    </div>

    <div class="p8-browser-layout">
      <!-- Left: Package list -->
      <div class="p8-browser-left" id="p8-pkg-list">
        ${PKG_DATA.map((pkg, pi) => `
        <div class="p8-pkg-item" data-pkg="${pkg.id}">
          <div class="p8-pkg-header${pi === 0 ? ' active' : ''}" data-pkg-toggle="${pkg.id}">
            <span class="p8-pkg-name">${pkg.label}</span>
            <span class="p8-pkg-chevron${pi === 0 ? ' open' : ''}">▶</span>
          </div>
          <div class="p8-pkg-body${pi === 0 ? ' open' : ''}">
            ${pkg.groups.map(grp => `
              <div class="p8-pal-group-label">${grp.name}</div>
              ${grp.palettes.map((pal, palIdx) => `
              <div class="p8-pal-row${pi === 0 && palIdx === 0 ? ' active' : ''}"
                   data-pkg="${pkg.id}" data-pal="${pal.name}">
                <span class="p8-pal-name">${pal.name}</span>
                <div class="p8-pal-swatches">
                  ${pal.colors.map(c => `<span class="p8-swatch" style="background:${c}"></span>`).join('')}
                </div>
              </div>`).join('')}
            `).join('')}
          </div>
        </div>`).join('')}
      </div>

      <!-- Right: Chart preview -->
      <div class="p8-browser-right">
        <div class="p8-browser-sticky">
          <!-- Chart type tabs -->
          <div class="p8-chart-tabs" id="p8-chart-type-tabs">
            <button class="p8-chart-tab active" data-chart="bar">柱状图</button>
            <button class="p8-chart-tab" data-chart="scatter">散点图</button>
            <button class="p8-chart-tab" data-chart="line">折线图</button>
          </div>
          <!-- D3 chart -->
          <div class="p8-chart-wrap" id="p8-chart-wrap"></div>
          <!-- Palette info -->
          <div class="p8-pal-info" id="p8-pal-info">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="p8-pal-info-name" id="p8-active-pal-name">Set1</span>
              <span style="font-size:0.78rem;color:var(--text-on-light-3);font-family:var(--font-code);" id="p8-active-pkg-name">RColorBrewer</span>
            </div>
            <div class="p8-scale-row">
              <span class="p8-scale-badge color">scale_color</span>
              <span class="p8-scale-code" id="p8-scale-color-code">scale_color_brewer(palette = "Set1")</span>
              <button class="p8-copy-btn" id="p8-copy-color">复制</button>
            </div>
            <div class="p8-scale-row">
              <span class="p8-scale-badge fill">scale_fill</span>
              <span class="p8-scale-code" id="p8-scale-fill-code">scale_fill_brewer(palette = "Set1")</span>
              <button class="p8-copy-btn" id="p8-copy-fill">复制</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- scale_color vs scale_fill 说明 -->
    <div class="p8-scale-explain">
      <div class="p8-scale-card color">
        <div class="p8-scale-card-title">scale_color_*() / scale_colour_*()</div>
        <p>控制<strong>几何对象的边框/线条/点</strong>的颜色。适用于 <code>geom_point()</code>、<code>geom_line()</code>、<code>geom_boxplot()</code> 等。</p>
        <p style="margin-top:8px;">例：<code>aes(color = group)</code> → <code>scale_color_brewer()</code></p>
      </div>
      <div class="p8-scale-card fill">
        <div class="p8-scale-card-title">scale_fill_*()</div>
        <p>控制<strong>几何对象的填充区域</strong>的颜色。适用于 <code>geom_col()</code>、<code>geom_histogram()</code>、<code>geom_violin()</code> 等。</p>
        <p style="margin-top:8px;">例：<code>aes(fill = group)</code> → <code>scale_fill_npg()</code></p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Section 2: 主题定制器 ═══════════ -->
<section id="p8-theme" class="p8-theme-section">
  <div class="p8-theme-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">出版级调整</span>
      <h2 class="p8-sec-title">主题定制器</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-dark-2);">
        调节 15+ 参数，实时预览图表效果，同步生成完整的 <code style="font-family:var(--font-code);color:var(--accent);font-size:0.9em;">theme()</code> R 代码。
      </p>
    </div>

    <div class="p8-theme-layout">
      <!-- Left: tabbed controls -->
      <div class="p8-theme-controls">
        <div class="p8-ctrl-tabs" id="p8-ctrl-tabs">
          <button class="p8-ctrl-tab active" data-panel="base">主题基础</button>
          <button class="p8-ctrl-tab" data-panel="grid">坐标&amp;网格</button>
          <button class="p8-ctrl-tab" data-panel="legend">图例</button>
          <button class="p8-ctrl-tab" data-panel="text">标注</button>
        </div>

        <!-- Panel 1: 主题基础 -->
        <div class="p8-ctrl-group-panel active" data-panel="base">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">基础主题 theme_*()</span>
            <div class="p8-btn-group" id="p8-base-theme-btns">
              <button class="p8-btn-opt active" data-theme="minimal">minimal</button>
              <button class="p8-btn-opt" data-theme="classic">classic</button>
              <button class="p8-btn-opt" data-theme="bw">bw</button>
              <button class="p8-btn-opt" data-theme="void">void</button>
              <button class="p8-btn-opt" data-theme="dark2">dark2</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">配色方案 <span class="p8-ctrl-label-val" id="p8-palette-name-val">Default</span></span>
            <div class="p8-mini-pals" id="p8-mini-pals">
              ${MINI_PALETTES.map((p, i) => `
              <button class="p8-mini-pal${i === 0 ? ' active' : ''}" data-pal-idx="${i}" title="${p.name}">
                <div class="p8-mini-pal-dots">
                  ${p.colors.map(c => `<span class="p8-mini-pal-dot" style="background:${c}"></span>`).join('')}
                </div>
                <div class="p8-mini-pal-name">${p.name}</div>
              </button>`).join('')}
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">背景色 panel.background</span>
            <div class="p8-bg-swatches" id="p8-bg-swatches">
              <button class="p8-bg-swatch active" data-bg="#ffffff" style="background:#ffffff;" title="white"></button>
              <button class="p8-bg-swatch" data-bg="#fafafa" style="background:#fafafa;" title="grey98"></button>
              <button class="p8-bg-swatch" data-bg="#f5f5f5" style="background:#f5f5f5;" title="grey97"></button>
              <button class="p8-bg-swatch" data-bg="#f0f4f8" style="background:#f0f4f8;" title="#f0f4f8"></button>
              <button class="p8-bg-swatch" data-bg="#fffbf0" style="background:#fffbf0;" title="warm white"></button>
              <button class="p8-bg-swatch" data-bg="#1d1d1f" style="background:#1d1d1f;border-color:#555;" title="dark"></button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">字体族 base_family</span>
            <div class="p8-btn-group" id="p8-font-family-btns">
              <button class="p8-btn-opt active" data-font="sans">无衬线</button>
              <button class="p8-btn-opt" data-font="serif">衬线</button>
              <button class="p8-btn-opt" data-font="mono">等宽</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">基础字号 base_size <span class="p8-ctrl-label-val" id="p8-fontsize-val">12</span> pt</span>
            <input type="range" class="p8-range-slider" id="p8-fontsize" min="8" max="20" value="12" step="1">
          </div>
        </div>

        <!-- Panel 2: 坐标与网格 -->
        <div class="p8-ctrl-group-panel" data-panel="grid">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">网格线 panel.grid</span>
            <div class="p8-btn-group" id="p8-grid-btns">
              <button class="p8-btn-opt" data-grid="both">主+次</button>
              <button class="p8-btn-opt active" data-grid="major">仅主</button>
              <button class="p8-btn-opt" data-grid="none">无</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">网格颜色</span>
            <div class="p8-btn-group" id="p8-grid-color-btns">
              <button class="p8-btn-opt active" data-gridcolor="light">浅灰 grey90</button>
              <button class="p8-btn-opt" data-gridcolor="medium">中灰 grey80</button>
              <button class="p8-btn-opt" data-gridcolor="white">白色 white</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">坐标轴线 axis.line</span>
            <div class="p8-btn-group" id="p8-axis-btns">
              <button class="p8-btn-opt active" data-axis="show">显示</button>
              <button class="p8-btn-opt" data-axis="none">隐藏</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">刻度方向 axis.ticks</span>
            <div class="p8-btn-group" id="p8-ticks-btns">
              <button class="p8-btn-opt active" data-ticks="outside">向外</button>
              <button class="p8-btn-opt" data-ticks="inside">向内</button>
              <button class="p8-btn-opt" data-ticks="none">无刻度</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">X 轴标签旋转 <span class="p8-ctrl-label-val" id="p8-axis-angle-val">0°</span></span>
            <input type="range" class="p8-range-slider" id="p8-axis-angle" min="0" max="90" value="0" step="15">
          </div>
        </div>

        <!-- Panel 3: 图例 -->
        <div class="p8-ctrl-group-panel" data-panel="legend">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例位置 legend.position</span>
            <div class="p8-btn-group" id="p8-legend-pos-btns">
              <button class="p8-btn-opt active" data-legendpos="right">右侧</button>
              <button class="p8-btn-opt" data-legendpos="bottom">底部</button>
              <button class="p8-btn-opt" data-legendpos="top">顶部</button>
              <button class="p8-btn-opt" data-legendpos="left">左侧</button>
              <button class="p8-btn-opt" data-legendpos="none">隐藏</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">排列方向 legend.direction</span>
            <div class="p8-btn-group" id="p8-legend-dir-btns">
              <button class="p8-btn-opt active" data-legenddir="vertical">垂直</button>
              <button class="p8-btn-opt" data-legenddir="horizontal">水平</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例框 legend.box.background</span>
            <div class="p8-btn-group" id="p8-legend-box-btns">
              <button class="p8-btn-opt active" data-legendbox="none">无边框</button>
              <button class="p8-btn-opt" data-legendbox="rect">加边框</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例键大小 legend.key.size</span>
            <div class="p8-btn-group" id="p8-legend-key-btns">
              <button class="p8-btn-opt" data-legendkey="small">小 0.8×</button>
              <button class="p8-btn-opt active" data-legendkey="medium">中 1×</button>
              <button class="p8-btn-opt" data-legendkey="large">大 1.4×</button>
            </div>
          </div>
        </div>

        <!-- Panel 4: 文字标注 -->
        <div class="p8-ctrl-group-panel" data-panel="text">
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">显示标题 plot.title</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-title" checked>
              <span class="p8-toggle-track"></span>
            </label>
          </div>
          <div class="p8-ctrl-group" id="p8-title-align-group">
            <span class="p8-ctrl-label">标题对齐 hjust</span>
            <div class="p8-btn-group" id="p8-title-align-btns">
              <button class="p8-btn-opt active" data-align="left">左对齐</button>
              <button class="p8-btn-opt" data-align="center">居中</button>
              <button class="p8-btn-opt" data-align="right">右对齐</button>
            </div>
          </div>
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">显示图注 plot.caption</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-caption">
              <span class="p8-toggle-track"></span>
            </label>
          </div>
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">趋势回归线 geom_smooth()</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-regline" checked>
              <span class="p8-toggle-track"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right: preview + code -->
      <div class="p8-theme-preview-wrap">
        <div class="p8-theme-chart-box" id="p8-theme-chart-box"></div>
        <div class="p8-code-box">
          <div class="p8-code-box-header">
            <span class="p8-code-box-title">theme() 完整代码</span>
            <button class="p8-copy-btn" id="p8-theme-copy-btn">复制</button>
          </div>
          <div class="p8-code-editor-wrap" id="p8-theme-editor"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Section 3: ggsave 生成器 ═══════════ -->
<section id="p8-ggsave" class="p8-ggsave-section">
  <div class="p8-ggsave-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">出版导出</span>
      <h2 class="p8-sec-title" style="color:var(--text-on-light);">ggsave 代码生成器</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-light-2);">
        选择目标期刊，自动填充尺寸、DPI 和格式要求，一键生成完整导出代码。
      </p>
    </div>

    <!-- Journal buttons -->
    <div class="p8-journal-grid" id="p8-journal-btns">
      ${Object.entries(JOURNALS).map(([id, j]) => `
        <button class="p8-journal-btn${id === 'nature' ? ' active' : ''}"
                data-journal="${id}"
                style="${id === 'nature' ? `background:${j.color};` : ''}">
          ${j.label}
        </button>`).join('')}
    </div>

    <!-- Controls -->
    <div class="p8-ggsave-controls">
      <div class="p8-ctrl-section">
        <span class="p8-ctrl-section-label">栏宽</span>
        <div class="p8-light-btn-group" id="p8-col-btns">
          <button class="p8-light-btn active" data-col="1">单栏</button>
          <button class="p8-light-btn" data-col="1.5">1.5 栏</button>
          <button class="p8-light-btn" data-col="2">双栏</button>
        </div>
      </div>
      <div class="p8-ctrl-section">
        <span class="p8-ctrl-section-label">格式</span>
        <div class="p8-light-btn-group" id="p8-fmt-btns">
          <button class="p8-light-btn active" data-fmt="PDF">PDF</button>
          <button class="p8-light-btn" data-fmt="TIFF">TIFF</button>
          <button class="p8-light-btn" data-fmt="PNG">PNG</button>
          <button class="p8-light-btn" data-fmt="SVG">SVG</button>
          <button class="p8-light-btn" data-fmt="EPS">EPS</button>
        </div>
      </div>
    </div>

    <!-- Specs display -->
    <div class="p8-specs-row">
      <div class="p8-spec-item">
        <div class="p8-spec-label">宽度</div>
        <div class="p8-spec-value" id="p8-spec-width">89 mm</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">最大高度</div>
        <div class="p8-spec-value" id="p8-spec-height">234 mm</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">DPI</div>
        <div class="p8-spec-value" id="p8-spec-dpi">300</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">字体</div>
        <div class="p8-spec-value" id="p8-spec-font" style="font-size:0.82rem;">Helvetica</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">字号</div>
        <div class="p8-spec-value" id="p8-spec-fontnote" style="font-size:0.72rem;">6–9 pt</div>
      </div>
    </div>

    <!-- Code output -->
    <div class="p8-code-output-light">
      <div class="p8-code-output-header">
        <span class="p8-code-output-title">ggsave() 代码</span>
        <button class="p8-copy-btn" id="p8-ggsave-copy" style="border-color:var(--border-dark);color:var(--text-on-dark-2);">复制</button>
      </div>
      <pre class="p8-code-output-pre" id="p8-ggsave-code"></pre>
    </div>
    <p class="p8-journal-note" id="p8-journal-note"></p>
  </div>
</section>

<!-- ═══════════ Section 4: patchwork ═══════════ -->
<section id="p8-patchwork" class="p8-patchwork-section">
  <div class="p8-patchwork-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">多面板布局</span>
      <h2 class="p8-sec-title">patchwork 组合图表</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-dark-2);">
        patchwork 用运算符 <code style="font-family:var(--font-code);color:var(--accent);">|</code> <code style="font-family:var(--font-code);color:var(--accent);">/</code> <code style="font-family:var(--font-code);color:var(--accent);">+</code> 拼接 ggplot 对象，无需学习复杂 API。
      </p>
    </div>

    <div class="p8-layout-tabs" id="p8-layout-tabs">
      ${PATCHWORK_LAYOUTS.map(l => `
        <button class="p8-layout-tab${l.id === 'h2' ? ' active' : ''}" data-layout="${l.id}">${l.label}</button>
      `).join('')}
    </div>
    <p class="p8-layout-desc" id="p8-layout-desc">${PATCHWORK_LAYOUTS[0].desc}</p>

    <div class="p8-patchwork-preview-box" id="p8-patchwork-box"></div>

    <div class="p8-code-box" style="margin-top:var(--space-md);">
      <div class="p8-code-box-header">
        <span class="p8-code-box-title">R 代码</span>
        <button class="p8-copy-btn" id="p8-patchwork-copy">复制</button>
      </div>
      <div class="p8-code-editor-wrap" id="p8-patchwork-editor"></div>
    </div>
  </div>
</section>

<!-- ═══════════ Footer CTA ═══════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">08 / 10</p>
  <h2 class="page-footer-quote">图表的颜色不是装饰，是数据的语言</h2>
  <p class="page-footer-desc">下一页：Python 可视化与数据叙事 — matplotlib、seaborn 与标注技巧</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p8-prev-btn">← ggplot2 工作坊</button>
    <button class="btn-primary" id="p8-next-btn">Python 可视化 →</button>
  </div>
</section>

</div>`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════

export function init() {
  state.cleanupFns = [];
  state.resizeObservers = [];
  state.codeEditor = null;
  state.patchEditor = null;

  // 初始激活第一个 palette
  const firstPkg = PKG_DATA[0];
  const firstPal = firstPkg.groups[0].palettes[0];
  state.activePkg = firstPkg.id;
  state.activePal = firstPal;
  state.chartType = 'bar';
  state.patchworkLayout = 'h2';

  // GSAP scroll animations
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('#p8-hero .hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('#p8-hero .page-hero-title', { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('#p8-hero .page-hero-sub', { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('#p8-hero .p8-hero-tagline', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p8-hero #p8-quicknav', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('#p8-hero .p8-scroll-hint', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // Quicknav smooth scroll
  document.querySelectorAll('#p8-quicknav .hero-quicknav__item').forEach(btn => {
    const fn = () => {
      const t = document.querySelector(btn.dataset.target);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  fadeIn(['#p8-browser .p8-sec-header'], { y: 40, start: 'top 85%' });
  fadeIn(['#p8-theme  .p8-sec-header'], { y: 40, start: 'top 85%' });
  fadeIn(['#p8-ggsave .p8-sec-header'], { y: 40, start: 'top 85%' });
  fadeIn(['#p8-patchwork .p8-sec-header'], { y: 40, start: 'top 85%' });

  initBrowser();
  initThemeCustomizer();
  initGgsave();
  initPatchwork();
  initNavButtons();
}

// ─────────────────────────────────────────────────────
//  Section 1: 配色包浏览器
// ─────────────────────────────────────────────────────

function initBrowser() {
  // Package accordion toggles
  document.querySelectorAll('[data-pkg-toggle]').forEach(header => {
    const fn = () => {
      const pkgId = header.dataset.pkgToggle;
      const body = header.nextElementSibling;
      const chev = header.querySelector('.p8-pkg-chevron');
      const isOpen = body.classList.contains('open');
      // Collapse all
      document.querySelectorAll('.p8-pkg-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.p8-pkg-chevron').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.p8-pkg-header').forEach(h => h.classList.remove('active'));
      if (!isOpen) {
        body.classList.add('open');
        chev.classList.add('open');
        header.classList.add('active');
        state.activePkg = pkgId;
      }
    };
    header.addEventListener('click', fn);
    state.cleanupFns.push(() => header.removeEventListener('click', fn));
  });

  // Palette row clicks
  document.querySelectorAll('.p8-pal-row').forEach(row => {
    const fn = () => {
      document.querySelectorAll('.p8-pal-row').forEach(r => r.classList.remove('active'));
      row.classList.add('active');
      const pkgId = row.dataset.pkg;
      const palName = row.dataset.pal;
      const pkg = PKG_DATA.find(p => p.id === pkgId);
      let pal = null;
      pkg.groups.forEach(g => { const p = g.palettes.find(pp => pp.name === palName); if (p) pal = p; });
      if (pal) {
        state.activePkg = pkgId;
        state.activePal = pal;
        updateBrowserChart();
        updatePalInfo();
      }
    };
    row.addEventListener('click', fn);
    state.cleanupFns.push(() => row.removeEventListener('click', fn));
  });

  // Chart type tabs
  document.querySelectorAll('#p8-chart-type-tabs .p8-chart-tab').forEach(tab => {
    const fn = () => {
      document.querySelectorAll('#p8-chart-type-tabs .p8-chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.chartType = tab.dataset.chart;
      updateBrowserChart();
    };
    tab.addEventListener('click', fn);
    state.cleanupFns.push(() => tab.removeEventListener('click', fn));
  });

  // Copy buttons
  setupCopyBtn('p8-copy-color', () => document.getElementById('p8-scale-color-code')?.textContent || '');
  setupCopyBtn('p8-copy-fill',  () => document.getElementById('p8-scale-fill-code')?.textContent  || '');

  // Initial render
  updateBrowserChart();
  updatePalInfo();
}

function getPalColors() {
  const pal = state.activePal;
  if (!pal) return ['#7EC8E3','#F0B27A','#95D5B2','#B8B8E8','#E07A7A','#F0D264'];
  return pal.colors;
}

function updateBrowserChart() {
  const wrap = document.getElementById('p8-chart-wrap');
  if (!wrap) return;
  const colors = getPalColors();
  wrap.innerHTML = '';
  const W = 480, H = 300;
  const svg = d3.select(wrap).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  // White background
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#ffffff');

  const m = { top: 20, right: 20, bottom: 36, left: 44 };
  const iW = W - m.left - m.right;
  const iH = H - m.top - m.bottom;
  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  if (state.chartType === 'bar') {
    const usedCats = BAR_CATS.slice(0, Math.min(colors.length, 6));
    const usedVals = BAR_VALS.slice(0, usedCats.length);
    const xScale = d3.scaleBand().domain(usedCats).range([0, iW]).padding(0.25);
    const yScale = d3.scaleLinear().domain([0, d3.max(usedVals) * 1.1]).range([iH, 0]);
    // Grid
    g.append('g').attr('class','grid').call(d3.axisLeft(yScale).tickSize(-iW).tickFormat(''))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke','#e8e8e8'); });
    // Bars
    g.selectAll('.bar').data(usedCats).join('rect')
      .attr('class','bar')
      .attr('x', d => xScale(d))
      .attr('y', (_, i) => yScale(usedVals[i]))
      .attr('width', xScale.bandwidth())
      .attr('height', (_, i) => iH - yScale(usedVals[i]))
      .attr('fill', (_, i) => colors[i % colors.length])
      .attr('rx', 2);
    // Axes
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xScale))
      .call(a => { a.select('.domain').attr('stroke','#ccc'); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });
    g.append('g').call(d3.axisLeft(yScale).ticks(5))
      .call(a => { a.select('.domain').remove(); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });

  } else if (state.chartType === 'scatter') {
    const grps = [...new Set(SCATTER_PTS.map(d => d.g))].slice(0, Math.min(colors.length, 4));
    const pts = SCATTER_PTS.filter(d => grps.includes(d.g));
    const xScale = d3.scaleLinear().domain([0, 9]).range([0, iW]);
    const yScale = d3.scaleLinear().domain([0, 10]).range([iH, 0]);
    // Grid
    g.append('g').call(d3.axisLeft(yScale).tickSize(-iW).tickFormat(''))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke','#e8e8e8'); });
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xScale).tickSize(-iH).tickFormat(''))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke','#e8e8e8'); });
    // Points
    g.selectAll('circle').data(pts).join('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 4.5)
      .attr('fill', d => colors[d.g % colors.length])
      .attr('opacity', 0.85);
    // Axes
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xScale).ticks(5))
      .call(a => { a.select('.domain').attr('stroke','#ccc'); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });
    g.append('g').call(d3.axisLeft(yScale).ticks(5))
      .call(a => { a.select('.domain').remove(); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });

  } else {
    // Line
    const usedLines = LINE_PTS.slice(0, Math.min(colors.length, 4));
    const allPts = usedLines.flatMap(l => l.pts);
    const xScale = d3.scaleLinear().domain([0, 12]).range([0, iW]);
    const yScale = d3.scaleLinear().domain([d3.min(allPts, d => d.y) - 5, d3.max(allPts, d => d.y) + 5]).range([iH, 0]);
    // Grid
    g.append('g').call(d3.axisLeft(yScale).tickSize(-iW).tickFormat(''))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke','#e8e8e8'); });
    // Lines
    const line = d3.line().x(d => xScale(d.x)).y(d => yScale(d.y)).curve(d3.curveCatmullRom.alpha(0.5));
    usedLines.forEach((series, i) => {
      g.append('path').datum(series.pts).attr('fill','none')
        .attr('stroke', colors[i % colors.length]).attr('stroke-width', 2.5)
        .attr('d', line);
      g.selectAll(`.dot-${i}`).data(series.pts).join('circle')
        .attr('cx', d => xScale(d.x)).attr('cy', d => yScale(d.y))
        .attr('r', 3).attr('fill', colors[i % colors.length]);
    });
    // Axes
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xScale).ticks(5))
      .call(a => { a.select('.domain').attr('stroke','#ccc'); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });
    g.append('g').call(d3.axisLeft(yScale).ticks(5))
      .call(a => { a.select('.domain').remove(); a.selectAll('text').attr('fill','#666').attr('font-size','10px'); a.selectAll('line').remove(); });
  }
}

function updatePalInfo() {
  const pkg = PKG_DATA.find(p => p.id === state.activePkg);
  const pal = state.activePal;
  if (!pkg || !pal) return;
  const nameEl = document.getElementById('p8-active-pal-name');
  const pkgEl  = document.getElementById('p8-active-pkg-name');
  const colorEl = document.getElementById('p8-scale-color-code');
  const fillEl  = document.getElementById('p8-scale-fill-code');
  if (nameEl) nameEl.textContent = pal.name;
  if (pkgEl)  pkgEl.textContent  = pkg.label;
  // Generate scale function text based on package
  let colorCode = '', fillCode = '';
  if (pkg.id === 'RColorBrewer') {
    colorCode = `scale_color_brewer(palette = "${pal.name}")`;
    fillCode  = `scale_fill_brewer(palette = "${pal.name}")`;
  } else if (pkg.id === 'viridis') {
    colorCode = `scale_color_viridis_d(option = "${pal.name}")`;
    fillCode  = `scale_fill_viridis_c(option = "${pal.name}")`;
  } else if (pkg.id === 'ggsci') {
    colorCode = `scale_color_${pal.name}()`;
    fillCode  = `scale_fill_${pal.name}()`;
  } else if (pkg.id === 'wesanderson') {
    colorCode = `scale_color_manual(values = wes_palette("${pal.name}"))`;
    fillCode  = `scale_fill_manual(values = wes_palette("${pal.name}"))`;
  } else if (pkg.id === 'MetBrewer') {
    colorCode = `scale_color_met_d("${pal.name}")`;
    fillCode  = `scale_fill_met_d("${pal.name}")`;
  }
  if (colorEl) colorEl.textContent = colorCode;
  if (fillEl)  fillEl.textContent  = fillCode;
}

// ─────────────────────────────────────────────────────
//  Section 2: 主题定制器
// ─────────────────────────────────────────────────────

function initThemeCustomizer() {
  const tp = state.themeParams;

  // Helper: wire up a btn-group
  function wireGroup(selector, stateKey, dataAttr) {
    document.querySelectorAll(`${selector} .p8-btn-opt`).forEach(btn => {
      const fn = () => {
        document.querySelectorAll(`${selector} .p8-btn-opt`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tp[stateKey] = btn.dataset[dataAttr];
        updateThemeChart(); updateThemeCode();
      };
      btn.addEventListener('click', fn);
      state.cleanupFns.push(() => btn.removeEventListener('click', fn));
    });
  }

  // Tab switching
  document.querySelectorAll('#p8-ctrl-tabs .p8-ctrl-tab').forEach(tab => {
    const fn = () => {
      document.querySelectorAll('#p8-ctrl-tabs .p8-ctrl-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.p8-ctrl-group-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.querySelector(`.p8-ctrl-group-panel[data-panel="${tab.dataset.panel}"]`);
      if (panel) panel.classList.add('active');
    };
    tab.addEventListener('click', fn);
    state.cleanupFns.push(() => tab.removeEventListener('click', fn));
  });

  // Wire all button groups
  wireGroup('#p8-base-theme-btns', 'baseTheme', 'theme');
  wireGroup('#p8-font-family-btns', 'fontFamily', 'font');
  wireGroup('#p8-grid-btns', 'gridLines', 'grid');
  wireGroup('#p8-grid-color-btns', 'gridColor', 'gridcolor');
  wireGroup('#p8-axis-btns', 'axisLines', 'axis');
  wireGroup('#p8-ticks-btns', 'axisTicks', 'ticks');
  wireGroup('#p8-legend-pos-btns', 'legendPos', 'legendpos');
  wireGroup('#p8-legend-dir-btns', 'legendDir', 'legenddir');
  wireGroup('#p8-legend-box-btns', 'legendBox', 'legendbox');
  wireGroup('#p8-legend-key-btns', 'legendKey', 'legendkey');
  wireGroup('#p8-title-align-btns', 'titleAlign', 'align');

  // Mini palette selector
  document.querySelectorAll('#p8-mini-pals .p8-mini-pal').forEach(btn => {
    const fn = () => {
      document.querySelectorAll('#p8-mini-pals .p8-mini-pal').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tp.paletteIdx = parseInt(btn.dataset.palIdx);
      const nameEl = document.getElementById('p8-palette-name-val');
      if (nameEl) nameEl.textContent = MINI_PALETTES[tp.paletteIdx].name;
      updateThemeChart(); updateThemeCode();
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  // Background swatches
  document.querySelectorAll('#p8-bg-swatches .p8-bg-swatch').forEach(btn => {
    const fn = () => {
      document.querySelectorAll('#p8-bg-swatches .p8-bg-swatch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tp.bgColor = btn.dataset.bg;
      updateThemeChart(); updateThemeCode();
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  // Font size slider
  const fsSlider = document.getElementById('p8-fontsize');
  const fsVal    = document.getElementById('p8-fontsize-val');
  if (fsSlider) {
    const fn = () => {
      tp.fontSize = parseInt(fsSlider.value);
      if (fsVal) fsVal.textContent = tp.fontSize;
      updateThemeChart(); updateThemeCode();
    };
    fsSlider.addEventListener('input', fn);
    state.cleanupFns.push(() => fsSlider.removeEventListener('input', fn));
  }

  // Axis angle slider
  const angleSlider = document.getElementById('p8-axis-angle');
  const angleVal    = document.getElementById('p8-axis-angle-val');
  if (angleSlider) {
    const fn = () => {
      tp.axisAngle = parseInt(angleSlider.value);
      if (angleVal) angleVal.textContent = tp.axisAngle + '°';
      updateThemeChart(); updateThemeCode();
    };
    angleSlider.addEventListener('input', fn);
    state.cleanupFns.push(() => angleSlider.removeEventListener('input', fn));
  }

  // Toggle: show title
  const titleChk = document.getElementById('p8-show-title');
  if (titleChk) {
    const fn = () => {
      tp.showTitle = titleChk.checked;
      const ag = document.getElementById('p8-title-align-group');
      if (ag) ag.style.opacity = tp.showTitle ? '1' : '0.4';
      updateThemeChart(); updateThemeCode();
    };
    titleChk.addEventListener('change', fn);
    state.cleanupFns.push(() => titleChk.removeEventListener('change', fn));
  }

  // Toggle: show caption
  const captionChk = document.getElementById('p8-show-caption');
  if (captionChk) {
    const fn = () => { tp.showCaption = captionChk.checked; updateThemeChart(); updateThemeCode(); };
    captionChk.addEventListener('change', fn);
    state.cleanupFns.push(() => captionChk.removeEventListener('change', fn));
  }

  // Toggle: regression line
  const reglineChk = document.getElementById('p8-show-regline');
  if (reglineChk) {
    const fn = () => { tp.showRegline = reglineChk.checked; updateThemeChart(); updateThemeCode(); };
    reglineChk.addEventListener('change', fn);
    state.cleanupFns.push(() => reglineChk.removeEventListener('change', fn));
  }

  // CodeMirror editor
  const editorEl = document.getElementById('p8-theme-editor');
  if (editorEl) {
    state.codeEditor = createCodeEditor(editorEl, {
      code: buildThemeCode(),
      language: 'r',
      readOnly: true,
    });
  }

  // Copy button
  setupCopyBtn('p8-theme-copy-btn', () => buildThemeCode());

  // Initial render
  updateThemeChart();
}

function updateThemeChart() {
  const box = document.getElementById('p8-theme-chart-box');
  if (!box) return;
  const tp = state.themeParams;
  box.innerHTML = '';

  const W = 580, H = 390;
  const svg = d3.select(box).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const isDark = tp.bgColor === '#1d1d1f' || tp.baseTheme === 'dark2';
  const textColor  = isDark ? '#e8e8e8' : '#222222';
  const textColor2 = isDark ? '#aaaaaa' : '#555555';

  const palColors = MINI_PALETTES[tp.paletteIdx].colors;
  const nGroups = Math.min(palColors.length, 4);

  const fontFamilyMap = {
    sans:  'Helvetica, Arial, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    mono:  '"Courier New", monospace',
  };
  const fontFam = fontFamilyMap[tp.fontFamily] || fontFamilyMap.sans;

  // Per-theme visual rules
  const themeRules = {
    minimal: { plotBg: tp.bgColor, gridMajC: isDark ? 'rgba(255,255,255,0.1)' : '#e5e5e5', gridMinC: isDark ? 'rgba(255,255,255,0.05)' : '#f2f2f2', axisLineC: 'none', outerBorder: false },
    classic: { plotBg: tp.bgColor, gridMajC: 'none', gridMinC: 'none', axisLineC: isDark ? '#aaaaaa' : '#333333', outerBorder: false },
    bw:      { plotBg: tp.bgColor, gridMajC: isDark ? 'rgba(255,255,255,0.14)' : '#dddddd', gridMinC: 'none', axisLineC: 'none', outerBorder: true, borderColor: isDark ? '#888888' : '#444444' },
    void:    { plotBg: tp.bgColor, gridMajC: 'none', gridMinC: 'none', axisLineC: 'none', outerBorder: false },
    dark2:   { plotBg: '#2a2a2e', gridMajC: 'rgba(255,255,255,0.1)', gridMinC: 'rgba(255,255,255,0.04)', axisLineC: 'none', outerBorder: false },
  };
  const rules = themeRules[tp.baseTheme] || themeRules.minimal;

  // Grid color override
  const gridColorMap = {
    light:  isDark ? 'rgba(255,255,255,0.1)' : '#e8e8e8',
    medium: isDark ? 'rgba(255,255,255,0.2)' : '#cccccc',
    white:  'rgba(255,255,255,0.9)',
  };
  const gridMajC = rules.gridMajC === 'none' ? 'none' : (gridColorMap[tp.gridColor] || rules.gridMajC);
  const gridMinC = rules.gridMinC === 'none' ? 'none' : (tp.gridColor === 'white' ? 'rgba(255,255,255,0.5)' : (isDark ? 'rgba(255,255,255,0.05)' : '#f2f2f2'));

  // Layout dimensions
  const legendIsHoriz = tp.legendDir === 'horizontal';
  const legendNone = tp.legendPos === 'none';
  const lgLabelSize = Math.max(7, tp.fontSize * 0.65);
  const lgKeySize = { small: 7, medium: 9, large: 13 }[tp.legendKey] || 9;
  const labels = ['Group A', 'Group B', 'Group C', 'Group D'].slice(0, nGroups);
  const lgItemW = 62, lgItemH = lgKeySize + 10;
  const lgTotalW = legendIsHoriz ? labels.length * lgItemW : 74;
  const lgTotalH = legendIsHoriz ? lgItemH + 4 : labels.length * lgItemH + 4;

  const hasTitle   = tp.showTitle;
  const hasCaption = tp.showCaption;
  const titleH   = hasTitle   ? 32 : 0;
  const captionH = hasCaption ? 18 : 0;
  const extraBottomForAngle = tp.axisAngle > 30 ? 14 : 0;

  const m = {
    top:    14 + titleH + (tp.legendPos === 'top'    && !legendNone ? lgTotalH + 6 : 0),
    right:  (tp.legendPos === 'right' && !legendNone ? lgTotalW + 10 : 16),
    bottom: 36 + captionH + extraBottomForAngle + (tp.legendPos === 'bottom' && !legendNone ? lgTotalH + 8 : 0),
    left:   (tp.legendPos === 'left'  && !legendNone ? lgTotalW + 10 : 46),
  };
  const iW = W - m.left - m.right;
  const iH = H - m.top - m.bottom;

  // Outer canvas bg
  const outerBg = tp.baseTheme === 'dark2' ? '#1a1a2e' : (isDark ? '#2a2a2e' : '#f0f0f0');
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', outerBg);

  const g = svg.append('g').attr('transform', `translate(${m.left},${m.top})`);

  // Panel background
  g.append('rect').attr('width', iW).attr('height', iH)
    .attr('fill', rules.plotBg)
    .attr('stroke', rules.outerBorder ? rules.borderColor : 'none')
    .attr('stroke-width', rules.outerBorder ? 1 : 0);

  const xScale = d3.scaleLinear().domain([0, 9]).range([0, iW]);
  const yScale = d3.scaleLinear().domain([0, 10]).range([iH, 0]);

  // Grid
  if (tp.gridLines !== 'none' && gridMajC !== 'none') {
    g.append('g').call(d3.axisLeft(yScale).tickSize(-iW).tickFormat('').ticks(5))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke', gridMajC).attr('stroke-width', 0.7); });
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xScale).tickSize(-iH).tickFormat('').ticks(5))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke', gridMajC).attr('stroke-width', 0.7); });
  }
  if (tp.gridLines === 'both' && gridMinC !== 'none') {
    g.append('g').call(d3.axisLeft(yScale).tickSize(-iW).tickFormat('').ticks(10))
      .call(a => { a.select('.domain').remove(); a.selectAll('line').attr('stroke', gridMinC).attr('stroke-width', 0.35).attr('stroke-dasharray', '2,3'); });
  }

  // Axis lines
  const showAxisLine = tp.axisLines === 'show' && rules.axisLineC !== 'none';
  if (showAxisLine || tp.baseTheme === 'classic') {
    const alC = rules.axisLineC !== 'none' ? rules.axisLineC : (isDark ? '#888' : '#444');
    g.append('line').attr('x1', 0).attr('y1', iH).attr('x2', iW).attr('y2', iH).attr('stroke', alC).attr('stroke-width', 0.9);
    g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', iH).attr('stroke', alC).attr('stroke-width', 0.9);
  }
  // bw top/right border
  if (tp.baseTheme === 'bw') {
    g.append('line').attr('x1', iW).attr('y1', 0).attr('x2', iW).attr('y2', iH).attr('stroke', rules.borderColor).attr('stroke-width', 0.8);
    g.append('line').attr('x1', 0).attr('y1', 0).attr('x2', iW).attr('y2', 0).attr('stroke', rules.borderColor).attr('stroke-width', 0.8);
  }

  // Regression lines
  if (tp.showRegline) {
    for (let gi = 0; gi < nGroups; gi++) {
      const pts = SCATTER_PTS.filter(d => d.g === gi);
      if (pts.length < 2) continue;
      const n = pts.length;
      const sumX = pts.reduce((s, p) => s + p.x, 0);
      const sumY = pts.reduce((s, p) => s + p.y, 0);
      const sumXX = pts.reduce((s, p) => s + p.x * p.x, 0);
      const sumXY = pts.reduce((s, p) => s + p.x * p.y, 0);
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
      const intercept = (sumY - slope * sumX) / n;
      const x1 = 0, x2 = 9;
      const y1c = Math.max(0, Math.min(10, slope * x1 + intercept));
      const y2c = Math.max(0, Math.min(10, slope * x2 + intercept));
      g.append('line')
        .attr('x1', xScale(x1)).attr('y1', yScale(y1c))
        .attr('x2', xScale(x2)).attr('y2', yScale(y2c))
        .attr('stroke', palColors[gi % palColors.length])
        .attr('stroke-width', 1.2)
        .attr('stroke-dasharray', '5,3')
        .attr('opacity', 0.55);
    }
  }

  // Data points
  const ptR = Math.max(3, Math.min(5.5, tp.fontSize * 0.28));
  SCATTER_PTS.filter(d => d.g < nGroups).forEach(d => {
    g.append('circle')
      .attr('cx', xScale(d.x)).attr('cy', yScale(d.y))
      .attr('r', ptR).attr('fill', palColors[d.g % palColors.length]).attr('opacity', 0.85)
      .attr('stroke', rules.plotBg).attr('stroke-width', 0.5);
  });

  // Axis ticks & labels (hide for void)
  const axisColor = isDark ? '#666' : '#aaa';
  const tickFontSize = Math.max(8, tp.fontSize * 0.72) + 'px';
  const tickLen = { outside: 4, inside: -4, none: 0 }[tp.axisTicks] || 4;
  if (tp.baseTheme !== 'void') {
    const axBottom = g.append('g').attr('transform', `translate(0,${iH})`)
      .call(d3.axisBottom(xScale).ticks(5).tickSize(tickLen));
    axBottom.select('.domain').attr('stroke', axisColor);
    axBottom.selectAll('text').attr('fill', textColor2).attr('font-size', tickFontSize).attr('font-family', fontFam);
    axBottom.selectAll('line').attr('stroke', axisColor);
    if (tp.axisTicks === 'none') axBottom.selectAll('line').remove();
    if (tp.axisAngle > 0) {
      axBottom.selectAll('text')
        .attr('transform', `rotate(${tp.axisAngle})`)
        .attr('text-anchor', 'start').attr('dx', '0.4em');
    }

    const axLeft = g.append('g').call(d3.axisLeft(yScale).ticks(5).tickSize(tickLen));
    axLeft.select('.domain').attr('stroke', axisColor);
    axLeft.selectAll('text').attr('fill', textColor2).attr('font-size', tickFontSize).attr('font-family', fontFam);
    axLeft.selectAll('line').attr('stroke', axisColor);
    if (tp.axisTicks === 'none') axLeft.selectAll('line').remove();

    const axLabelSize = Math.max(9, tp.fontSize * 0.82) + 'px';
    svg.append('text').attr('x', m.left + iW / 2).attr('y', H - captionH - 3)
      .attr('text-anchor', 'middle').attr('font-size', axLabelSize)
      .attr('fill', textColor).attr('font-family', fontFam).text('X Variable');
    svg.append('text').attr('transform', `translate(12,${m.top + iH / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle').attr('font-size', axLabelSize)
      .attr('fill', textColor).attr('font-family', fontFam).text('Y Variable');
  }

  // Title
  if (hasTitle) {
    const hjustMap = { left: m.left, center: W / 2, right: W - m.right };
    const hAnchorMap = { left: 'start', center: 'middle', right: 'end' };
    const titleSize = Math.max(11, tp.fontSize * 1.05) + 'px';
    svg.append('text')
      .attr('x', hjustMap[tp.titleAlign] || m.left)
      .attr('y', 12 + titleH * 0.55)
      .attr('text-anchor', hAnchorMap[tp.titleAlign] || 'start')
      .attr('font-size', titleSize).attr('font-weight', 700)
      .attr('fill', textColor).attr('font-family', fontFam)
      .text('Gene Expression vs. Treatment');
  }

  // Caption
  if (hasCaption) {
    svg.append('text')
      .attr('x', W - m.right).attr('y', H - 3)
      .attr('text-anchor', 'end')
      .attr('font-size', Math.max(7, tp.fontSize * 0.6) + 'px')
      .attr('fill', textColor2).attr('font-family', fontFam)
      .text('Source: Gene Expression Dataset, 2024');
  }

  // Legend
  if (!legendNone) {
    let lgX, lgY;
    if (tp.legendPos === 'right')  { lgX = m.left + iW + 8;           lgY = m.top + (iH - lgTotalH) / 2; }
    else if (tp.legendPos === 'bottom') { lgX = m.left + (iW - lgTotalW) / 2; lgY = m.top + iH + 28; }
    else if (tp.legendPos === 'top')    { lgX = m.left + (iW - lgTotalW) / 2; lgY = m.top - lgTotalH - 6; }
    else if (tp.legendPos === 'left')   { lgX = 4;                         lgY = m.top + (iH - lgTotalH) / 2; }
    else { lgX = m.left + iW - lgTotalW; lgY = m.top + 8; }

    const lg = svg.append('g').attr('transform', `translate(${lgX},${lgY})`);
    if (tp.legendBox === 'rect') {
      lg.append('rect')
        .attr('x', -4).attr('y', -4).attr('width', lgTotalW + 4).attr('height', lgTotalH + 4)
        .attr('fill', 'none').attr('stroke', isDark ? '#555' : '#ccc').attr('stroke-width', 0.8).attr('rx', 3);
    }
    labels.forEach((label, i) => {
      const ox = legendIsHoriz ? i * lgItemW : 0;
      const oy = legendIsHoriz ? 0 : i * lgItemH;
      lg.append('circle')
        .attr('cx', ox + lgKeySize / 2).attr('cy', oy + lgKeySize / 2)
        .attr('r', Math.max(3, lgKeySize / 2)).attr('fill', palColors[i % palColors.length]);
      lg.append('text')
        .attr('x', ox + lgKeySize + 4).attr('y', oy + lgKeySize / 2 + 3.5)
        .attr('font-size', lgLabelSize + 'px').attr('fill', textColor).attr('font-family', fontFam)
        .text(label);
    });
  }
}

function buildThemeCode() {
  const tp = state.themeParams;
  const bgMap = {
    '#ffffff': '"white"', '#fafafa': '"grey98"', '#f5f5f5': '"grey97"',
    '#f0f4f8': '"#f0f4f8"', '#fffbf0': '"#fffbf0"', '#1d1d1f': '"#1d1d1f"',
  };
  const bgR = bgMap[tp.bgColor] || `"${tp.bgColor}"`;
  const fontFamR = { sans: '"Helvetica"', serif: '"Georgia"', mono: '"Courier New"' }[tp.fontFamily] || '"Helvetica"';

  const palColors = MINI_PALETTES[tp.paletteIdx].colors;
  const palR = palColors.map(c => `"${c}"`).join(', ');

  const gridMajR = tp.gridLines === 'none' ? 'element_blank()' :
    tp.gridColor === 'light'  ? 'element_line(color = "grey90",  linewidth = 0.4)' :
    tp.gridColor === 'medium' ? 'element_line(color = "grey80",  linewidth = 0.5)' :
                                'element_line(color = "white",   linewidth = 0.5)';
  const gridMinR = tp.gridLines === 'both' ?
    'element_line(color = "grey95", linewidth = 0.2)' : 'element_blank()';
  const axisLineR = tp.axisLines === 'show' ?
    'element_line(color = "grey70", linewidth = 0.5)' : 'element_blank()';
  const axisTicksR = tp.axisTicks === 'none' ? 'element_blank()' :
    'element_line(color = "grey70", linewidth = 0.4)';
  const axisTickLenR = tp.axisTicks === 'inside' ? 'unit(-0.15, "cm")' : 'unit(0.15, "cm")';
  const axisTextXR = tp.axisAngle > 0 ?
    `element_text(angle = ${tp.axisAngle}, hjust = 1, vjust = 1)` : 'element_text()';

  const legPosR  = `"${tp.legendPos}"`;
  const legDirR  = `"${tp.legendDir}"`;
  const legBoxR  = tp.legendBox === 'rect' ?
    'element_rect(color = "grey70", linewidth = 0.5)' : 'element_blank()';
  const legKeySizeR = { small: 'unit(0.8, "lines")', medium: 'unit(1, "lines")', large: 'unit(1.4, "lines")' }[tp.legendKey] || 'unit(1, "lines")';

  const hjust = tp.titleAlign === 'left' ? 0 : tp.titleAlign === 'center' ? 0.5 : 1;
  const titleR = tp.showTitle ?
    `element_text(size = ${Math.round(tp.fontSize * 1.1)}, face = "bold", hjust = ${hjust})` :
    'element_blank()';
  const captionR = tp.showCaption ?
    `element_text(size = ${Math.round(tp.fontSize * 0.7)}, hjust = 1, color = "grey50")` :
    'element_blank()';

  const reglLine = tp.showRegline ?
    '\n  geom_smooth(method = "lm", se = FALSE,\n              linetype = "dashed", alpha = 0.6) +' : '';

  return `library(ggplot2)

# 配色方案：${MINI_PALETTES[tp.paletteIdx].name}
palette_colors <- c(${palR})

ggplot(df, aes(x, y, color = group)) +
  geom_point(size = ${(tp.fontSize * 0.28).toFixed(1)}, alpha = 0.85) +${reglLine}
  scale_color_manual(values = palette_colors) +
  labs(
    title   = "Gene Expression vs. Treatment",
    x       = "X Variable",
    y       = "Y Variable",
    caption = "Source: Gene Expression Dataset"
  ) +
  theme_${tp.baseTheme}(
    base_size   = ${tp.fontSize},
    base_family = ${fontFamR}
  ) +
  theme(
    panel.background      = element_rect(fill = ${bgR}, color = NA),
    panel.grid.major      = ${gridMajR},
    panel.grid.minor      = ${gridMinR},
    axis.line             = ${axisLineR},
    axis.ticks            = ${axisTicksR},
    axis.ticks.length     = ${axisTickLenR},
    axis.text.x           = ${axisTextXR},
    axis.text             = element_text(
      size  = ${Math.round(tp.fontSize * 0.75)},
      color = "grey40"
    ),
    axis.title            = element_text(
      size  = ${Math.round(tp.fontSize * 0.85)},
      color = "grey20"
    ),
    plot.title            = ${titleR},
    plot.caption          = ${captionR},
    legend.position       = ${legPosR},
    legend.direction      = ${legDirR},
    legend.box.background = ${legBoxR},
    legend.key.size       = ${legKeySizeR},
    legend.text           = element_text(
      size = ${Math.round(tp.fontSize * 0.75)}
    )
  )`;
}

function updateThemeCode() {
  if (state.codeEditor) {
    state.codeEditor.setCode(buildThemeCode());
  }
}

// ─────────────────────────────────────────────────────
//  Section 3: ggsave 代码生成器
// ─────────────────────────────────────────────────────

function initGgsave() {
  // Journal buttons
  document.querySelectorAll('#p8-journal-btns .p8-journal-btn').forEach(btn => {
    const fn = () => {
      document.querySelectorAll('#p8-journal-btns .p8-journal-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = '';
      });
      btn.classList.add('active');
      const jId = btn.dataset.journal;
      btn.style.background = JOURNALS[jId].color;
      state.ggsaveParams.journal = jId;
      updateGgsave();
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  // Column buttons
  document.querySelectorAll('#p8-col-btns .p8-light-btn').forEach(btn => {
    const fn = () => {
      document.querySelectorAll('#p8-col-btns .p8-light-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.ggsaveParams.col = btn.dataset.col;
      updateGgsave();
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  // Format buttons
  document.querySelectorAll('#p8-fmt-btns .p8-light-btn').forEach(btn => {
    const fn = () => {
      document.querySelectorAll('#p8-fmt-btns .p8-light-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.ggsaveParams.format = btn.dataset.fmt;
      updateGgsave();
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  setupCopyBtn('p8-ggsave-copy', () => document.getElementById('p8-ggsave-code')?.textContent || '');

  updateGgsave();
}

function updateGgsave() {
  const { journal, col, format } = state.ggsaveParams;
  const j = JOURNALS[journal];
  const colKey = col === '1.5' ? 1.5 : parseFloat(col);
  const width = j.cols[colKey] || j.cols[1];
  const height = Math.round(width * 0.75);
  const dpi = typeof j.dpi === 'object' ? j.dpi.color : j.dpi;
  const ext = format.toLowerCase();

  // Update spec display
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('p8-spec-width', width + ' mm');
  setTxt('p8-spec-height', j.maxHeight + ' mm max');
  setTxt('p8-spec-dpi', dpi + (typeof j.dpi === 'object' ? ' (彩图)' : ''));
  setTxt('p8-spec-font', j.font);
  setTxt('p8-spec-fontnote', j.fontNote);

  const noteEl = document.getElementById('p8-journal-note');
  if (noteEl) noteEl.textContent = j.notes;

  // Generate code
  const deviceArg = format === 'PDF' ? 'cairo_pdf' : format === 'TIFF' ? '"tiff"' : format === 'SVG' ? '"svg"' : format === 'EPS' ? 'cairo_ps' : '"png"';
  const dpiLine   = (format !== 'PDF' && format !== 'SVG' && format !== 'EPS') ? `\n  dpi     = ${dpi},` : '';
  const code = `# ${j.label} 期刊导出规范
# 宽度：${width} mm，最大高度：${j.maxHeight} mm
# 字体：${j.font}（${j.fontNote}）

ggsave(
  filename = "figure_1.${ext}",
  plot     = last_plot(),
  width    = ${width},
  height   = ${height},
  units    = "mm",${dpiLine}
  device   = ${deviceArg}
)

# 如果使用 Cairo 引擎（推荐嵌入字体）:
# library(Cairo)
# CairoPDF("figure_1.pdf", width = ${(width / 25.4).toFixed(2)}, height = ${(height / 25.4).toFixed(2)})
# print(p)
# dev.off()`;

  const codeEl = document.getElementById('p8-ggsave-code');
  if (codeEl) codeEl.textContent = code;
}

// ─────────────────────────────────────────────────────
//  Section 4: patchwork 多面板布局
// ─────────────────────────────────────────────────────

function initPatchwork() {
  document.querySelectorAll('#p8-layout-tabs .p8-layout-tab').forEach(tab => {
    const fn = () => {
      document.querySelectorAll('#p8-layout-tabs .p8-layout-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.patchworkLayout = tab.dataset.layout;
      updatePatchwork();
    };
    tab.addEventListener('click', fn);
    state.cleanupFns.push(() => tab.removeEventListener('click', fn));
  });

  // CodeMirror for patchwork
  const patchEl = document.getElementById('p8-patchwork-editor');
  if (patchEl) {
    state.patchEditor = createCodeEditor(patchEl, {
      code: PATCHWORK_LAYOUTS[0].code,
      language: 'r',
      readOnly: true,
    });
  }

  setupCopyBtn('p8-patchwork-copy', () => {
    const layout = PATCHWORK_LAYOUTS.find(l => l.id === state.patchworkLayout);
    return layout ? layout.code : '';
  });

  updatePatchwork();
}

function updatePatchwork() {
  const layout = PATCHWORK_LAYOUTS.find(l => l.id === state.patchworkLayout);
  if (!layout) return;

  // Update desc
  const descEl = document.getElementById('p8-layout-desc');
  if (descEl) descEl.textContent = layout.desc;

  // Update code editor
  if (state.patchEditor) {
    state.patchEditor.setCode(layout.code);
  }

  // Draw SVG panel diagram
  const box = document.getElementById('p8-patchwork-box');
  if (!box) return;
  box.innerHTML = '';

  const W = 700, H = 240;
  const svg = d3.select(box).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#1a1a2e');

  const panelColors = ['#7EC8E3','#F0B27A','#95D5B2','#B8B8E8'];
  const pad = 16;
  const labelSize = 14;
  const r = 8;

  // Deterministic scatter dots for panels (avoid Math.random for reproducibility)
  const dotOffsets = [
    [0.15,0.3],[0.35,0.55],[0.55,0.25],[0.7,0.7],[0.25,0.75],[0.8,0.4],[0.45,0.4],[0.6,0.6],
  ];
  function drawPanel(x, y, w, h, label, colorIdx) {
    const pg = svg.append('g');
    pg.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h)
      .attr('fill', panelColors[colorIdx]).attr('opacity', 0.18)
      .attr('rx', r).attr('stroke', panelColors[colorIdx]).attr('stroke-width', 1.5);
    const mr = 20;
    dotOffsets.forEach(([fx, fy]) => {
      pg.append('circle')
        .attr('cx', x + mr + fx * (w - mr * 2))
        .attr('cy', y + mr + fy * (h - mr * 2))
        .attr('r', 2.5).attr('fill', panelColors[colorIdx]).attr('opacity', 0.65);
    });
    pg.append('text').attr('x', x + 10).attr('y', y + 22)
      .attr('font-family', 'monospace').attr('font-size', labelSize).attr('font-weight', 700)
      .attr('fill', panelColors[colorIdx]).text(label);
  }

  const aW = W - pad * 2;
  const aH = H - pad * 2;

  if (layout.id === 'h2') {
    const hw = (aW - 12) / 2;
    drawPanel(pad, pad, hw, aH, 'A', 0);
    drawPanel(pad + hw + 12, pad, hw, aH, 'B', 1);
  } else if (layout.id === 'v2') {
    const hh = (aH - 12) / 2;
    drawPanel(pad, pad, aW, hh, 'A', 0);
    drawPanel(pad, pad + hh + 12, aW, hh, 'B', 1);
  } else if (layout.id === 'h2v') {
    const topH = aH * 0.55;
    const botH = aH - topH - 12;
    const hw = (aW - 12) / 2;
    drawPanel(pad, pad, hw, topH, 'A', 0);
    drawPanel(pad + hw + 12, pad, hw, topH, 'B', 1);
    drawPanel(pad, pad + topH + 12, aW, botH, 'C', 2);
  } else {
    const hw = (aW - 12) / 2;
    const hh = (aH - 12) / 2;
    drawPanel(pad, pad, hw, hh, 'A', 0);
    drawPanel(pad + hw + 12, pad, hw, hh, 'B', 1);
    drawPanel(pad, pad + hh + 12, hw, hh, 'C', 2);
    drawPanel(pad + hw + 12, pad + hh + 12, hw, hh, 'D', 3);
  }
}

// ─────────────────────────────────────────────────────
//  Nav buttons
// ─────────────────────────────────────────────────────

function initNavButtons() {
  const prevBtn = document.getElementById('p8-prev-btn');
  const nextBtn = document.getElementById('p8-next-btn');
  if (prevBtn) {
    const fn = () => navigateTo('m1-p7');
    prevBtn.addEventListener('click', fn);
    state.cleanupFns.push(() => prevBtn.removeEventListener('click', fn));
  }
  if (nextBtn) {
    const fn = () => navigateTo('m1-p9');
    nextBtn.addEventListener('click', fn);
    state.cleanupFns.push(() => nextBtn.removeEventListener('click', fn));
  }
}

// ─────────────────────────────────────────────────────
//  Utility: copy button setup
// ─────────────────────────────────────────────────────

function setupCopyBtn(id, getText) {
  const btn = document.getElementById(id);
  if (!btn) return;
  const fn = async () => {
    try {
      await navigator.clipboard.writeText(getText());
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '复制'; btn.classList.remove('copied'); }, 2000);
    } catch { }
  };
  btn.addEventListener('click', fn);
  state.cleanupFns.push(() => btn.removeEventListener('click', fn));
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════

export function destroy() {
  killAll();
  state.cleanupFns.forEach(fn => { try { fn(); } catch { } });
  state.cleanupFns = [];
  if (state.codeEditor) { try { state.codeEditor.destroy(); } catch {} state.codeEditor = null; }
  if (state.patchEditor) { try { state.patchEditor.destroy(); } catch {} state.patchEditor = null; }
  state.resizeObservers.forEach(ro => ro.disconnect());
  state.resizeObservers = [];
}
