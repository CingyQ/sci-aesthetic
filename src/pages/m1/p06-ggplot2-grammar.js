// p06-ggplot2-grammar.js — ggplot2 图层语法与分面
// 粘性滚动图层叠加 + 分面Tab + 坐标变换 + 自定义坐标轴

import { fadeIn, scaleReveal, killAll, gsap, ScrollTrigger } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ─────────────────────────────────────────────
// 数据：模拟 iris 散点（30×3 共 90 点）
// ─────────────────────────────────────────────
function genIris() {
  const seededRand = (seed) => {
    let s = seed;
    return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
  };
  const rng = seededRand(42);
  const normal = () => {
    const u = rng(), v = rng();
    return Math.sqrt(-2 * Math.log(u + 1e-10)) * Math.cos(2 * Math.PI * v);
  };
  const pts = [];
  const specs = [
    { name: 'setosa',     mx: 5.0, sx: 0.35, my: 1.5, sy: 0.18 },
    { name: 'versicolor', mx: 5.9, sx: 0.52, my: 4.3, sy: 0.47 },
    { name: 'virginica',  mx: 6.6, sx: 0.63, my: 5.5, sy: 0.55 },
  ];
  specs.forEach(sp => {
    for (let i = 0; i < 30; i++) {
      pts.push({ x: sp.mx + sp.sx * normal(), y: sp.my + sp.sy * normal(), sp: sp.name });
    }
  });
  return pts;
}

const IRIS = genIris();
const SP_COLORS = { setosa: '#7EC8E3', versicolor: '#F0B27A', virginica: '#95D5B2' };

// 柱状图数据（坐标变换演示）
const BAR_DATA = [
  { cat: 'setosa',     val: 24.1 },
  { cat: 'versicolor', val: 28.6 },
  { cat: 'virginica',  val: 32.3 },
];

let state = {
  layerStep: 0,
  facetTab: 'none',
  coordTab: 'cartesian',
  axisBreaks: 5,
  axisMin: 4,
  axisMax: 8,
  customLabels: false,
  resizeHandlers: [],
  layerObservers: [],
  scrollHandlers: [],
};

// ─────────────────────────────────────────────
// 图层步骤数据
// ─────────────────────────────────────────────
const LAYER_STEPS = [
  {
    title: '第一层：数据 (data)',
    desc: '一切从数据开始。ggplot() 创建画布，但此时画面是空白的——数据已加载，坐标系尚未定义。',
    lines: [
      { text: 'ggplot(iris)', new: true },
    ],
  },
  {
    title: '第二层：映射 (aes)',
    desc: '美学映射（aesthetics）将数据列绑定到视觉属性。x 轴、y 轴标签出现，但还没有任何数据点。',
    lines: [
      { text: 'ggplot(iris, aes(', new: false },
      { text: '  x     = Sepal.Length,', new: true },
      { text: '  y     = Petal.Length,', new: true },
      { text: '  color = Species', new: true },
      { text: '))', new: false },
    ],
  },
  {
    title: '第三层：几何形状 (geom)',
    desc: '几何对象（geom）决定用什么形状展示数据。geom_point() 在每个 (x, y) 位置绘制散点，数据终于可见了。',
    lines: [
      { text: 'ggplot(iris, aes(', new: false },
      { text: '  x = Sepal.Length, y = Petal.Length,', new: false },
      { text: '  color = Species', new: false },
      { text: ')) +', new: false },
      { text: '  geom_point(size = 2.5, alpha = 0.8)', new: true },
    ],
  },
  {
    title: '第四层：标度 (scale)',
    desc: '标度（scale）控制数据到视觉属性的映射方式。scale_color_manual() 将默认配色替换为精心设计的调色板。',
    lines: [
      { text: 'ggplot(iris, aes(', new: false },
      { text: '  x = Sepal.Length, y = Petal.Length,', new: false },
      { text: '  color = Species', new: false },
      { text: ')) +', new: false },
      { text: '  geom_point(size = 2.5, alpha = 0.8) +', new: false },
      { text: '  scale_color_manual(values = c(', new: true },
      { text: '    "setosa"     = "#7EC8E3",', new: true },
      { text: '    "versicolor" = "#F0B27A",', new: true },
      { text: '    "virginica"  = "#95D5B2"', new: true },
      { text: '  ))', new: true },
    ],
  },
  {
    title: '第五层：主题 (theme)',
    desc: '主题（theme）控制所有非数据元素：背景色、网格线、图例位置、字体大小。这是从"能看"到"好看"的最后一步。',
    lines: [
      { text: 'ggplot(iris, aes(', new: false },
      { text: '  x = Sepal.Length, y = Petal.Length,', new: false },
      { text: '  color = Species', new: false },
      { text: ')) +', new: false },
      { text: '  geom_point(size = 2.5, alpha = 0.8) +', new: false },
      { text: '  scale_color_manual(values = c(...)) +', new: false },
      { text: '  theme_minimal(base_size = 12) +', new: true },
      { text: '  theme(', new: true },
      { text: '    legend.position  = "bottom",', new: true },
      { text: '    panel.grid.minor = element_blank()', new: true },
      { text: '  )', new: true },
    ],
  },
];

// 分面 R 代码
const FACET_CODES = {
  none: `ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length,
  color = Species
)) +
  geom_point(alpha = 0.7) +
  scale_color_manual(values = sp_colors) +
  theme_minimal()`,
  facet_wrap: `ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length,
  color = Species
)) +
  geom_point(alpha = 0.7) +
  scale_color_manual(values = sp_colors) +
  facet_wrap(~ Species, nrow = 1) +
  theme_minimal() +
  theme(legend.position = "none")`,
  facet_grid: `ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length
)) +
  geom_point(alpha = 0.6,
             color = "#7EC8E3") +
  facet_grid(
    rows = vars(Species),
    cols = vars(size_cat)
  ) +
  theme_minimal()`,
};

// 坐标变换 R 代码
const COORD_CODES = {
  cartesian: `ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 0.6) +
  scale_fill_manual(
    values = sp_colors
  ) +
  theme_minimal()`,
  flip: `ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 0.6) +
  scale_fill_manual(
    values = sp_colors
  ) +
  coord_flip() +
  theme_minimal()`,
  polar: `ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 1) +
  scale_fill_manual(
    values = sp_colors
  ) +
  coord_polar(theta = "y") +
  theme_minimal() +
  theme(
    axis.text = element_blank()
  )`,
};

// ─────────────────────────────────────────────
// render()
// ─────────────────────────────────────────────
export function render() {
  return `
<div class="page-scroll">
<style>
/* ══ p06 scoped styles ══ */
.p6-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark);
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
@keyframes p6-glow {
  0%,100% { transform:translate(0,0) scale(1); opacity:1; }
  35% { transform:translate(-2%,3%) scale(1.06); opacity:0.65; }
  70% { transform:translate(3%,-2%) scale(0.96); opacity:0.85; }
}
.p6-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 70% 55% at 50% 45%, rgba(126,200,227,0.11) 0%, transparent 70%);
  pointer-events:none;
  animation:p6-glow 11s ease-in-out infinite;
}
.p6-hero::after {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(126,200,227,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(126,200,227,0.03) 1px, transparent 1px);
  background-size:64px 64px;
  pointer-events:none;
}
.p6-hero-inner {
  position:relative; z-index:1;
  display:flex; flex-direction:column; align-items:center;
  gap:var(--space-md); text-align:center;
}
.p6-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:0.15em; text-transform:uppercase;
}
.p6-hero-title {
  color:var(--text-on-dark);
}
.p6-hero-sub {
  font-family:var(--font-heading); font-size:clamp(1rem,2vw,1.4rem);
  font-weight:300; color:var(--text-on-dark); opacity:0.5;
  max-width:600px; line-height:1.4; margin:var(--space-xs) auto 0; text-align:center;
}
.p6-hero-tagline {
  font-family:var(--font-body); font-size:var(--text-body);
  color:var(--text-on-dark-2); max-width:540px; line-height:1.8;
  margin:var(--space-sm) auto 0; text-align:center;
}
.p6-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p6-float 2.2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p6-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

/* Section headers */
.p6-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p6-sec-tag {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:10px;
}
.p6-sec-title {
  font-family:var(--font-display); font-size:clamp(1.8rem,4vw,3rem);
  font-weight:700; letter-spacing:-0.02em; line-height:1.15;
}
.p6-sec-desc {
  font-size:1.05rem; line-height:1.75; max-width:620px;
  margin:var(--space-sm) auto 0; opacity:0.75;
}

/* ── 图层叠加 ── */
.p6-layers-section {
  background:var(--bg-light); color:var(--text-on-light);
  scroll-margin-top:56px;
}
.p6-layers-hdr { padding:var(--space-3xl) var(--space-lg) var(--space-xl); text-align:center; }
.p6-layers-section .p6-sec-title { color:var(--text-on-light); }

/* 桌面端：flex布局 + JS transform模拟sticky（CSS sticky 在有 overflow 的祖先元素中失效） */
.p6-layers-body {
  display:flex; align-items:flex-start;
  max-width:1100px; margin:0 auto; padding:0 var(--space-lg);
}
.p6-sticky-left {
  width:50%; flex-shrink:0;
  height:100vh;
  padding:0 var(--space-lg) 0 0;
  box-sizing:border-box;
  display:flex; flex-direction:column; justify-content:center;
  overflow:hidden;
  will-change:transform; /* JS 通过 transform:translateY() 模拟 sticky */
}
.p6-sticky-steps {
  flex:1; min-width:0;
  padding-left:var(--space-lg);
}
.p6-step-panel {
  height:100vh; display:flex; align-items:center;
  padding:var(--space-xl) 0;
}
.p6-step-panel .p6-step-panel-inner {
  width:100%; opacity:0.4;
  transition:opacity 0.35s ease;
}
.p6-step-panel.p6-step-active .p6-step-panel-inner { opacity:1; }

.p6-step-num {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:14px;
}
.p6-step-title {
  font-family:var(--font-display); font-size:clamp(1.3rem,2.5vw,1.9rem);
  font-weight:700; letter-spacing:-0.01em; color:var(--text-on-light); margin-bottom:var(--space-sm);
}
.p6-step-desc { font-size:1rem; line-height:1.8; color:var(--text-on-light-2); max-width:440px; }

.p6-code-panel {
  background:var(--bg-dark); border-radius:var(--radius-lg);
  padding:var(--space-md); font-family:var(--font-code); font-size:13.5px; line-height:1.65;
  margin-bottom:var(--space-md); border:1px solid var(--border-dark); overflow:hidden;
  flex-shrink:0;
}
.p6-code-line {
  color:var(--text-on-dark-2); border-radius:3px;
  padding:1px 8px; white-space:pre-wrap; word-wrap:break-word;
  transition:color 0.3s, background 0.3s;
}
.p6-code-line.hl {
  color:#e2b96e; background:rgba(226,185,110,0.1);
  border-left:2px solid #e2b96e; padding-left:6px;
}
.p6-chart-box {
  width:100%; aspect-ratio:4/3; border-radius:var(--radius-md);
  overflow:hidden; background:#111218; border:1px solid var(--border-dark);
  flex-shrink:0;
}
.p6-chart-box svg { width:100%; height:100%; display:block; }

/* 移动端步骤卡片列表（桌面隐藏） */
.p6-mobile-steps-list { display:none; }

@media (max-width:900px) {
  .p6-layers-body { padding:0 var(--space-md); }
  .p6-sticky-left { padding-right:var(--space-md); }
  .p6-sticky-steps { padding-left:var(--space-md); }
}

/* ── 移动端：堆叠步骤卡片，自然滚动，无需交互 ── */
@media (max-width:768px) {
  /* 隐藏桌面端 JS-sticky 布局 */
  .p6-layers-body { display:none; }

  /* 移动端：5 张独立卡片，各含代码+图表+说明 */
  .p6-mobile-steps-list {
    display:block;
    padding:0 var(--space-sm) var(--space-2xl); /* bottom gap 防止紧贴下一节 */
    max-width:100%;
  }
  .p6-mobile-step-card {
    background:var(--bg-light-alt);
    border:1px solid var(--border-light);
    border-radius:var(--radius-md);
    padding:var(--space-md);
    margin-bottom:var(--space-md);
  }
  .p6-mobile-step-card .p6-step-num {
    font-family:var(--font-code); font-size:var(--text-caption);
    color:var(--accent); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:10px;
  }
  .p6-mobile-step-card .p6-step-title { font-size:1.1rem; color:var(--text-on-light); margin-bottom:8px; }
  .p6-mobile-step-card .p6-step-desc { font-size:0.9rem; line-height:1.7; color:var(--text-on-light-2); margin-bottom:var(--space-sm); }
  .p6-mobile-step-card .p6-code-panel { font-size:12px; margin-bottom:var(--space-sm); }
  .p6-m-chart-box {
    width:100%; aspect-ratio:4/3;
    border-radius:var(--radius-md); overflow:hidden;
    background:#111218; border:1px solid var(--border-dark);
  }
  .p6-m-chart-box svg { width:100%; height:100%; display:block; }
}

/* ── 分面演示 ── */
.p6-facet-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-tab-bar {
  display:flex; gap:0; max-width:500px; margin:0 auto var(--space-xl);
  background:rgba(255,255,255,0.05); border-radius:var(--radius-full);
  border:1px solid var(--border-dark); overflow:hidden;
}
.p6-tab-btn {
  flex:1; padding:12px 16px; min-height:44px;
  background:transparent; border:none; color:var(--text-on-dark-2);
  font-family:var(--font-heading); font-size:0.88rem; cursor:pointer;
  transition:all 0.25s var(--ease-apple);
}
.p6-tab-btn.active { background:var(--accent); color:#1d1d1f; font-weight:600; }
.p6-tab-btn:not(.active):hover { color:var(--text-on-dark); background:rgba(255,255,255,0.06); }

.p6-facet-layout {
  display:grid; grid-template-columns:1fr 360px;
  gap:var(--space-xl); max-width:1000px; margin:0 auto; align-items:start;
}
.p6-facet-code-area {
  background:var(--bg-dark-elevated); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-code-label {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:var(--space-sm);
}
.p6-code-pre {
  font-family:var(--font-code); font-size:12.5px; line-height:1.65;
  color:#b4c6da; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word;
}
.p6-code-pre .kw { color:#c792ea; }
.p6-code-pre .fn { color:#82aaff; }
.p6-code-pre .str { color:#c3e88d; }
.p6-code-pre .num { color:#f78c6c; }
.p6-facet-svg-wrap { width:100%; }
.p6-facet-svg-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-facet-layout { grid-template-columns:1fr; } .p6-facet-code-area { position:static; } }
@media (max-width:768px) {
  .p6-facet-section { padding:var(--space-xl) var(--space-sm); }
  .p6-tab-bar { max-width:100%; overflow-x:auto; scrollbar-width:none; flex-shrink:0; }
  .p6-tab-bar::-webkit-scrollbar { display:none; }
  .p6-tab-btn { flex-shrink:0; padding:10px 12px; font-size:0.8rem; }
}

/* ── 坐标变换 ── */
.p6-coord-section {
  background:var(--bg-light-alt); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-coord-tabs {
  display:flex; gap:0; max-width:440px; margin:0 auto var(--space-xl);
  background:var(--bg-light-elevated); border-radius:var(--radius-full);
  border:1px solid var(--border-light); overflow:hidden; box-shadow:var(--shadow-sm);
}
.p6-coord-tab-btn {
  flex:1; padding:12px 14px; min-height:44px;
  background:transparent; border:none; color:var(--text-on-light-2);
  font-family:var(--font-heading); font-size:0.85rem; cursor:pointer;
  transition:all 0.25s var(--ease-apple);
}
.p6-coord-tab-btn.active { background:var(--text-on-light); color:var(--bg-light); font-weight:600; }
.p6-coord-tab-btn:not(.active):hover { color:var(--text-on-light); background:var(--bg-light-alt); }

.p6-coord-layout {
  display:grid; grid-template-columns:1fr 340px;
  gap:var(--space-xl); max-width:980px; margin:0 auto; align-items:start;
}
.p6-coord-code-area {
  background:var(--bg-dark); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-coord-chart-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-coord-layout { grid-template-columns:1fr; } .p6-coord-code-area { position:static; } }
@media (max-width:768px) {
  .p6-coord-section { padding:var(--space-xl) var(--space-sm); }
  .p6-coord-tabs { max-width:100%; overflow-x:auto; scrollbar-width:none; }
  .p6-coord-tabs::-webkit-scrollbar { display:none; }
  .p6-coord-tab-btn { flex-shrink:0; font-size:0.78rem; padding:10px 10px; }
}

/* ── 자定义坐标轴 ── */
.p6-axis-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-axis-layout {
  display:grid; grid-template-columns:280px 1fr;
  gap:var(--space-xl); max-width:900px; margin:0 auto; align-items:start;
}
.p6-axis-controls {
  background:var(--bg-dark-elevated); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-ctrl-group { margin-bottom:var(--space-md); }
.p6-ctrl-label {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--text-on-dark-3); text-transform:uppercase; letter-spacing:0.1em;
  margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;
}
.p6-ctrl-val { font-family:var(--font-code); font-size:0.8rem; color:var(--accent); }
.p6-range {
  -webkit-appearance:none; appearance:none;
  width:100%; height:6px; background:var(--border-dark);
  border-radius:var(--radius-full); outline:none; cursor:pointer; min-height:32px;
}
.p6-range::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px;
  background:var(--accent); border-radius:50%;
}
.p6-range::-moz-range-thumb { width:20px; height:20px; background:var(--accent); border-radius:50%; border:none; }
@media (max-width:768px) { .p6-range::-webkit-slider-thumb { width:24px; height:24px; } .p6-range::-moz-range-thumb { width:24px; height:24px; } }

.p6-toggle-group { display:flex; gap:8px; }
.p6-toggle-btn {
  flex:1; padding:9px 10px; min-height:44px;
  background:rgba(255,255,255,0.04); border:1px solid var(--border-dark);
  border-radius:var(--radius-sm); color:var(--text-on-dark-2);
  font-family:var(--font-heading); font-size:0.82rem; cursor:pointer; transition:all 0.2s;
}
.p6-toggle-btn.active { background:var(--accent); color:#1d1d1f; font-weight:600; border-color:var(--accent); }
.p6-axis-chart-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-axis-layout { grid-template-columns:1fr; } .p6-axis-controls { position:static; } }
@media (max-width:768px) { .p6-axis-section { padding:var(--space-xl) var(--space-sm); } }

/* ── Footer ── */
.p6-footer {
  background:var(--bg-dark-deep); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); text-align:center;
}
.p6-footer-title {
  font-family:var(--font-display); font-size:clamp(1.6rem,3.5vw,2.8rem);
  font-weight:700; letter-spacing:-0.02em; margin-bottom:var(--space-sm);
}
.p6-footer-desc { font-size:1.05rem; color:var(--text-on-dark-2); line-height:1.8; max-width:560px; margin:0 auto var(--space-lg); }
.p6-footer-links { display:flex; gap:var(--space-sm); justify-content:center; flex-wrap:wrap; }
.p6-footer-link {
  padding:14px 28px; min-height:44px; border:1.5px solid var(--border-dark);
  border-radius:var(--radius-full); color:var(--text-on-dark-2); background:transparent;
  font-family:var(--font-heading); font-size:0.9rem; cursor:pointer;
  transition:all 0.25s var(--ease-apple);
}
.p6-footer-link:hover { border-color:var(--accent); color:var(--accent); }
.p6-footer-link.primary { background:var(--accent); color:#1d1d1f; border-color:var(--accent); font-weight:600; }
.p6-footer-link.primary:hover { background:var(--accent-hover); border-color:var(--accent-hover); }
@media (max-width:768px) { .p6-footer { padding:var(--space-xl) var(--space-sm); } .p6-footer-links { flex-direction:column; align-items:center; } }
</style>

<!-- Hero -->
<section class="p6-hero section-dark section-hero-full" id="p6-hero">
  <div class="p6-hero-inner">
    <p class="hero-eyebrow p6-eyebrow" style="opacity:0;">Module 01 / Page 06</p>
    <h1 class="page-hero-title p6-hero-title" style="color:var(--text-on-dark);opacity:0;">ggplot2<br>图层语法与分面</h1>
    <p class="page-hero-sub p6-hero-sub" style="opacity:0;">ggplot2 Grammar of Graphics</p>
    <p class="p6-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">理解图形语法的核心设计哲学——每一层都是一次对数据的诠释。<br>从空白画布到出版级图表，五步完成。</p>
    <nav class="hero-quicknav" id="p6-hero-nav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p6-layers">图层叠加</button>
      <button class="hero-quicknav__item" data-target="#p6-facet">分面演示</button>
      <button class="hero-quicknav__item" data-target="#p6-coord">坐标变换</button>
      <button class="hero-quicknav__item" data-target="#p6-axis">自定义坐标轴</button>
    </nav>
    <div class="p6-scroll-hint">↓ 向下探索</div>
  </div>
</section>

<!-- Section 1: 图层叠加 -->
<section class="p6-layers-section" id="p6-layers">
  <div class="p6-layers-hdr">
    <div class="p6-sec-tag">Grammar of Graphics</div>
    <h2 class="p6-sec-title">图层叠加的哲学</h2>
    <p class="p6-sec-desc" style="color:var(--text-on-light-2)">ggplot2 是"图形语法"的具体实现。一张图表 = 数据 + 映射 + 几何 + 标度 + 主题的叠加。向下滚动，逐层构建一张完整的散点图。</p>
  </div>

  <!-- 移动端：5 张堆叠卡片，每张包含说明+代码+图表，向下滚动即可（桌面端隐藏） -->
  <div class="p6-mobile-steps-list" id="p6-mobile-steps-list">
    ${LAYER_STEPS.map((step, i) => `
    <div class="p6-mobile-step-card">
      <div class="p6-step-num">Step ${i + 1} / ${LAYER_STEPS.length}</div>
      <h3 class="p6-step-title">${step.title}</h3>
      <p class="p6-step-desc">${step.desc}</p>
      <div class="p6-code-panel" id="p6-m-code-${i}"></div>
      <div class="p6-m-chart-box" id="p6-m-chart-${i}"></div>
    </div>`).join('')}
  </div>

  <!-- 桌面端：JS-sticky 左列（代码+图表）+ 可滚动右列（步骤描述）（移动端隐藏） -->
  <div class="p6-layers-body" id="p6-layers-body">
    <div class="p6-sticky-left" id="p6-sticky-left">
      <div class="p6-code-panel" id="p6-code-display"></div>
      <div class="p6-chart-box" id="p6-layer-chart"></div>
    </div>
    <div class="p6-sticky-steps" id="p6-sticky-steps">
      ${LAYER_STEPS.map((step, i) => `
      <div class="p6-step-panel" data-step="${i}">
        <div class="p6-step-panel-inner">
          <div class="p6-step-num">Step ${i + 1} / ${LAYER_STEPS.length}</div>
          <h3 class="p6-step-title">${step.title}</h3>
          <p class="p6-step-desc">${step.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<!-- Section 2: 分面演示 -->
<section class="p6-facet-section" id="p6-facet">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Faceting</div>
    <h2 class="p6-sec-title">分面：拆开数据，看清格局</h2>
    <p class="p6-sec-desc">facet_wrap() 和 facet_grid() 让同一图表按分组变量展开为多个小面板，往往比颜色编码更清晰。</p>
  </div>
  <div class="p6-tab-bar" id="p6-facet-tabs">
    <button class="p6-tab-btn active" data-facet="none">无分面</button>
    <button class="p6-tab-btn" data-facet="facet_wrap">facet_wrap</button>
    <button class="p6-tab-btn" data-facet="facet_grid">facet_grid</button>
  </div>
  <div class="p6-facet-layout">
    <div class="p6-facet-chart-area">
      <div class="p6-facet-svg-wrap" id="p6-facet-chart"></div>
    </div>
    <div class="p6-facet-code-area">
      <div class="p6-code-label">R 代码</div>
      <pre class="p6-code-pre" id="p6-facet-code"></pre>
    </div>
  </div>
</section>

<!-- Section 3: 坐标变换 -->
<section class="p6-coord-section" id="p6-coord">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Coordinate Systems</div>
    <h2 class="p6-sec-title" style="color:var(--text-on-light)">坐标系：同数据，不同视角</h2>
    <p class="p6-sec-desc" style="color:var(--text-on-light-2)">同一组数据，不同坐标系呈现完全不同的视觉效果。一行代码，彻底改变图表形态。</p>
  </div>
  <div class="p6-coord-tabs" id="p6-coord-tabs">
    <button class="p6-coord-tab-btn active" data-coord="cartesian">笛卡尔坐标</button>
    <button class="p6-coord-tab-btn" data-coord="flip">翻转 flip</button>
    <button class="p6-coord-tab-btn" data-coord="polar">极坐标 polar</button>
  </div>
  <div class="p6-coord-layout">
    <div class="p6-coord-chart-area">
      <div class="p6-coord-chart-wrap" id="p6-coord-chart"></div>
    </div>
    <div class="p6-coord-code-area">
      <div class="p6-code-label">R 代码</div>
      <pre class="p6-code-pre" id="p6-coord-code"></pre>
    </div>
  </div>
</section>

<!-- Section 4: 自定义坐标轴 -->
<section class="p6-axis-section" id="p6-axis">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Axis Customization</div>
    <h2 class="p6-sec-title">精控坐标轴</h2>
    <p class="p6-sec-desc">breaks 控制刻度位置，labels 替换标签文字，limits 限定显示范围。拖动滑块，观察图表实时变化。</p>
  </div>
  <div class="p6-axis-layout">
    <div class="p6-axis-controls">
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">breaks（刻度数量）<span class="p6-ctrl-val" id="p6-breaks-val">5</span></div>
        <input type="range" class="p6-range" id="p6-breaks-range" min="2" max="10" value="5">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">x 下限 limits[min]<span class="p6-ctrl-val" id="p6-min-val">4.0</span></div>
        <input type="range" class="p6-range" id="p6-min-range" min="3" max="6" step="0.5" value="4">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">x 上限 limits[max]<span class="p6-ctrl-val" id="p6-max-val">8.0</span></div>
        <input type="range" class="p6-range" id="p6-max-range" min="6" max="9" step="0.5" value="8">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">标签样式</div>
        <div class="p6-toggle-group">
          <button class="p6-toggle-btn active" id="p6-labels-auto">自动</button>
          <button class="p6-toggle-btn" id="p6-labels-custom">自定义</button>
        </div>
      </div>
      <div style="margin-top:var(--space-md);padding-top:var(--space-sm);border-top:1px solid var(--border-dark)">
        <div class="p6-code-label">生成的 R 代码</div>
        <pre class="p6-code-pre" id="p6-axis-code" style="font-size:11.5px;margin-top:8px"></pre>
      </div>
    </div>
    <div class="p6-axis-chart-area">
      <div class="p6-axis-chart-wrap" id="p6-axis-chart"></div>
    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="p6-footer">
  <h2 class="p6-footer-title">下一步：图表工作坊</h2>
  <p class="p6-footer-desc">掌握了图层语法，现在动手调节 12+ 种图表类型的每一个参数——散点图、箱线图、小提琴图和更多。</p>
  <div class="p6-footer-links">
    <button class="p6-footer-link" id="p6-back-btn">← 图表选择指南</button>
    <button class="p6-footer-link primary" id="p6-next-btn">ggplot2 工作坊 →</button>
  </div>
</section>

</div>`;
}

// ─────────────────────────────────────────────
// D3：图层叠加图表
// ─────────────────────────────────────────────
function buildLayerChart(container, step) {
  container.innerHTML = '';
  const W = 400, H = 300;
  const m = { t: 24, r: 20, b: 50, l: 54 };
  const iW = W - m.l - m.r, iH = H - m.t - m.b;

  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#111218');

  if (step === 0) {
    svg.append('text').attr('x', W / 2).attr('y', H / 2)
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', '#444').attr('font-family', 'var(--font-heading)').attr('font-size', '13px')
      .text('ggplot(iris)  ← 空白画布');
    return;
  }

  const xExt = [4.0, 8.2], yExt = [0.3, 7.4];
  const xS = d3.scaleLinear().domain(xExt).range([0, iW]);
  const yS = d3.scaleLinear().domain(yExt).range([iH, 0]);
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

  // grid
  const gc = step >= 4 ? '#191c2a' : '#1a1d2e';
  g.selectAll('.gy').data(yS.ticks(5)).join('line')
    .attr('x1', 0).attr('x2', iW).attr('y1', d => yS(d)).attr('y2', d => yS(d))
    .attr('stroke', gc).attr('stroke-width', 1);
  if (step < 4) {
    g.selectAll('.gym').data(yS.ticks(10)).join('line')
      .attr('x1', 0).attr('x2', iW).attr('y1', d => yS(d)).attr('y2', d => yS(d))
      .attr('stroke', '#161820').attr('stroke-width', 0.5);
  }

  // axes
  g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).ticks(5))
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', step >= 1 ? '#888' : '#444').attr('font-size', '9px'); gg.selectAll('line').attr('stroke', '#555'); });
  g.append('g').call(d3.axisLeft(yS).ticks(5))
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', step >= 1 ? '#888' : '#444').attr('font-size', '9px'); gg.selectAll('line').attr('stroke', '#555'); });

  // axis labels (step >= 1)
  if (step >= 1) {
    g.append('text').attr('x', iW / 2).attr('y', iH + 38)
      .attr('text-anchor', 'middle').attr('fill', '#999').attr('font-size', '10.5px').attr('font-family', 'var(--font-code)').text('Sepal.Length');
    g.append('text').attr('transform', 'rotate(-90)').attr('x', -iH / 2).attr('y', -42)
      .attr('text-anchor', 'middle').attr('fill', '#999').attr('font-size', '10.5px').attr('font-family', 'var(--font-code)').text('Petal.Length');
  }

  // points (step >= 2)
  if (step >= 2) {
    g.selectAll('circle').data(IRIS).join('circle')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
      .attr('r', 3.5)
      .attr('fill', d => step >= 3 ? SP_COLORS[d.sp] : '#7EC8E3')
      .attr('opacity', step >= 3 ? 0.82 : 0.55);
  }

  // legend (step >= 2)
  if (step >= 2) {
    const species = ['setosa', 'versicolor', 'virginica'];
    const isBottom = step >= 4;
    const lG = svg.append('g');
    if (isBottom) {
      species.forEach((sp, i) => {
        const lx = m.l + i * 100 + 10;
        const ly = m.t + iH + 44;
        lG.append('circle').attr('cx', lx).attr('cy', ly).attr('r', 4).attr('fill', SP_COLORS[sp]);
        lG.append('text').attr('x', lx + 8).attr('y', ly + 1).attr('dominant-baseline', 'middle')
          .attr('fill', '#aaa').attr('font-size', '9px').attr('font-family', 'var(--font-heading)').text(sp);
      });
    } else {
      species.forEach((sp, i) => {
        const ly = m.t + i * 18 + 6;
        const lx = m.l + iW + 8;
        lG.append('circle').attr('cx', lx).attr('cy', ly).attr('r', 4).attr('fill', SP_COLORS[sp]);
        lG.append('text').attr('x', lx + 8).attr('y', ly + 1).attr('dominant-baseline', 'middle')
          .attr('fill', '#aaa').attr('font-size', '9px').attr('font-family', 'var(--font-heading)').text(sp);
      });
    }
  }
}

// ─────────────────────────────────────────────
// 代码面板渲染
// ─────────────────────────────────────────────
function renderCodePanel(el, step) {
  if (!el) return;
  el.innerHTML = LAYER_STEPS[step].lines.map(l =>
    `<div class="p6-code-line${l.new ? ' hl' : ''}">${escHtml(l.text)}</div>`
  ).join('');
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ─────────────────────────────────────────────
// D3：分面图表
// ─────────────────────────────────────────────
function buildFacetChart(container, mode) {
  container.innerHTML = '';
  const species = ['setosa', 'versicolor', 'virginica'];

  if (mode === 'none') {
    const W = 420, H = 290, m = { t: 20, r: 16, b: 46, l: 50 };
    const iW = W - m.l - m.r, iH = H - m.t - m.b;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#111218');
    const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
    const xS = d3.scaleLinear().domain([4.0, 8.3]).range([0, iW]);
    const yS = d3.scaleLinear().domain([0.3, 7.4]).range([iH, 0]);
    gridLines(g, xS, yS, iW, iH, '#1e2030');
    darkAxes(g, xS, yS, iW, iH);
    axisLabelsDark(svg, m, iW, iH, 'Sepal.Length', 'Petal.Length');
    g.selectAll('circle').data(IRIS).join('circle')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
      .attr('r', 3.5).attr('fill', d => SP_COLORS[d.sp]).attr('opacity', 0.8);
    species.forEach((sp, i) => {
      svg.append('circle').attr('cx', m.l + iW - 76).attr('cy', m.t + i * 18 + 8).attr('r', 4).attr('fill', SP_COLORS[sp]);
      svg.append('text').attr('x', m.l + iW - 69).attr('y', m.t + i * 18 + 8).attr('dominant-baseline', 'middle').attr('fill', '#aaa').attr('font-size', '9px').text(sp);
    });

  } else if (mode === 'facet_wrap') {
    const panW = 180, panH = 155, pm = { t: 18, r: 10, b: 32, l: 36 }, gap = 10;
    const TW = 3 * panW + 2 * gap + 12, TH = panH + 28;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${TW} ${TH}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', TW).attr('height', TH).attr('fill', '#111218');
    species.forEach((sp, si) => {
      const ox = 6 + si * (panW + gap), oy = 22;
      const data = IRIS.filter(d => d.sp === sp);
      const iW = panW - pm.l - pm.r, iH = panH - pm.t - pm.b;
      const xS = d3.scaleLinear().domain([4.0, 8.3]).range([0, iW]);
      const yS = d3.scaleLinear().domain([0.3, 7.4]).range([iH, 0]);
      svg.append('rect').attr('x', ox).attr('y', oy).attr('width', panW).attr('height', panH).attr('fill', '#161820').attr('rx', 5);
      svg.append('text').attr('x', ox + panW / 2).attr('y', oy - 5).attr('text-anchor', 'middle').attr('fill', SP_COLORS[sp]).attr('font-size', '9px').attr('font-family', 'var(--font-heading)').text(sp);
      const g = svg.append('g').attr('transform', `translate(${ox + pm.l},${oy + pm.t})`);
      gridLines(g, xS, yS, iW, iH, '#1e2030');
      g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).ticks(3))
        .call(gg => { gg.select('.domain').attr('stroke', '#444'); gg.selectAll('text').attr('fill', '#666').attr('font-size', '7px'); gg.selectAll('line').attr('stroke', '#444'); });
      g.append('g').call(d3.axisLeft(yS).ticks(3))
        .call(gg => { gg.select('.domain').attr('stroke', '#444'); gg.selectAll('text').attr('fill', '#666').attr('font-size', '7px'); gg.selectAll('line').attr('stroke', '#444'); });
      g.selectAll('circle').data(data).join('circle')
        .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y)).attr('r', 3).attr('fill', SP_COLORS[sp]).attr('opacity', 0.85);
    });

  } else {
    // facet_grid: rows=species, cols=size_cat
    const cols = ['small (≤5.8)', 'large (>5.8)'];
    const panW = 155, panH = 112, pm = { t: 14, r: 8, b: 26, l: 32 }, gX = 8, gY = 8;
    const TW = 2 * panW + gX + 70, TH = 3 * panH + 2 * gY + 36;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${TW} ${TH}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', TW).attr('height', TH).attr('fill', '#111218');
    cols.forEach((c, ci) => {
      svg.append('text').attr('x', 44 + ci * (panW + gX) + panW / 2).attr('y', 13)
        .attr('text-anchor', 'middle').attr('fill', '#aaa').attr('font-size', '8px').text(c);
    });
    species.forEach((sp, si) => {
      svg.append('text')
        .attr('transform', `rotate(90, ${TW - 5}, ${24 + si * (panH + gY) + panH / 2})`)
        .attr('x', TW - 5).attr('y', 24 + si * (panH + gY) + panH / 2)
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
        .attr('fill', SP_COLORS[sp]).attr('font-size', '8px').text(sp);
      cols.forEach((c, ci) => {
        const big = ci === 1;
        const data = IRIS.filter(d => d.sp === sp && (big ? d.x > 5.8 : d.x <= 5.8));
        const ox = 44 + ci * (panW + gX), oy = 20 + si * (panH + gY);
        const iW = panW - pm.l - pm.r, iH = panH - pm.t - pm.b;
        const xS = d3.scaleLinear().domain([4.0, 8.3]).range([0, iW]);
        const yS = d3.scaleLinear().domain([0.3, 7.4]).range([iH, 0]);
        svg.append('rect').attr('x', ox).attr('y', oy).attr('width', panW).attr('height', panH).attr('fill', '#161820').attr('rx', 4);
        const g = svg.append('g').attr('transform', `translate(${ox + pm.l},${oy + pm.t})`);
        gridLines(g, xS, yS, iW, iH, '#1e2030');
        if (si === 2) {
          g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).ticks(3))
            .call(gg => { gg.select('.domain').attr('stroke', '#444'); gg.selectAll('text').attr('fill', '#666').attr('font-size', '7px'); gg.selectAll('line').attr('stroke', '#444'); });
        }
        if (ci === 0) {
          g.append('g').call(d3.axisLeft(yS).ticks(3))
            .call(gg => { gg.select('.domain').attr('stroke', '#444'); gg.selectAll('text').attr('fill', '#666').attr('font-size', '7px'); gg.selectAll('line').attr('stroke', '#444'); });
        }
        g.selectAll('circle').data(data).join('circle')
          .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y)).attr('r', 2.5).attr('fill', SP_COLORS[sp]).attr('opacity', 0.85);
      });
    });
  }
}

// ─────────────────────────────────────────────
// D3：坐标变换图表
// ─────────────────────────────────────────────
function buildCoordChart(container, mode) {
  container.innerHTML = '';

  if (mode === 'cartesian') {
    const W = 380, H = 280, m = { t: 24, r: 16, b: 52, l: 52 };
    const iW = W - m.l - m.r, iH = H - m.t - m.b;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#fafafa');
    const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
    const xS = d3.scaleBand().domain(BAR_DATA.map(d => d.cat)).range([0, iW]).padding(0.38);
    const yS = d3.scaleLinear().domain([0, 38]).range([iH, 0]);
    yS.ticks(5).forEach(v => {
      g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', yS(v)).attr('y2', yS(v)).attr('stroke', '#ebebeb').attr('stroke-width', 1);
    });
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).tickSize(0))
      .call(gg => { gg.select('.domain').attr('stroke', '#ccc'); gg.selectAll('text').attr('fill', '#555').attr('font-size', '10px'); });
    g.append('g').call(d3.axisLeft(yS).ticks(5))
      .call(gg => { gg.select('.domain').attr('stroke', '#ccc'); gg.selectAll('text').attr('fill', '#555').attr('font-size', '10px'); gg.selectAll('line').attr('stroke', '#ccc'); });
    g.selectAll('rect.b').data(BAR_DATA).join('rect').attr('class', 'b')
      .attr('x', d => xS(d.cat)).attr('width', xS.bandwidth())
      .attr('y', d => yS(d.val)).attr('height', d => iH - yS(d.val))
      .attr('fill', d => SP_COLORS[d.cat]).attr('rx', 4).attr('opacity', 0.88);
    g.selectAll('text.v').data(BAR_DATA).join('text').attr('class', 'v')
      .attr('x', d => xS(d.cat) + xS.bandwidth() / 2).attr('y', d => yS(d.val) - 6)
      .attr('text-anchor', 'middle').attr('fill', '#333').attr('font-size', '10.5px').attr('font-weight', '600').text(d => d.val.toFixed(1));
    svg.append('text').attr('x', m.l + iW / 2).attr('y', H - 4)
      .attr('text-anchor', 'middle').attr('fill', '#aaa').attr('font-size', '10px').text('coord_cartesian()（默认）');

  } else if (mode === 'flip') {
    const W = 380, H = 250, m = { t: 14, r: 52, b: 38, l: 88 };
    const iW = W - m.l - m.r, iH = H - m.t - m.b;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#fafafa');
    const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
    const yS = d3.scaleBand().domain(BAR_DATA.map(d => d.cat)).range([0, iH]).padding(0.38);
    const xS = d3.scaleLinear().domain([0, 38]).range([0, iW]);
    xS.ticks(5).forEach(v => {
      g.append('line').attr('y1', 0).attr('y2', iH).attr('x1', xS(v)).attr('x2', xS(v)).attr('stroke', '#ebebeb').attr('stroke-width', 1);
    });
    g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).ticks(5))
      .call(gg => { gg.select('.domain').attr('stroke', '#ccc'); gg.selectAll('text').attr('fill', '#555').attr('font-size', '10px'); gg.selectAll('line').attr('stroke', '#ccc'); });
    g.append('g').call(d3.axisLeft(yS).tickSize(0))
      .call(gg => { gg.select('.domain').attr('stroke', '#ccc'); gg.selectAll('text').attr('fill', '#555').attr('font-size', '10px'); });
    g.selectAll('rect.b').data(BAR_DATA).join('rect').attr('class', 'b')
      .attr('y', d => yS(d.cat)).attr('height', yS.bandwidth())
      .attr('x', 0).attr('width', d => xS(d.val))
      .attr('fill', d => SP_COLORS[d.cat]).attr('rx', 4).attr('opacity', 0.88);
    g.selectAll('text.v').data(BAR_DATA).join('text').attr('class', 'v')
      .attr('y', d => yS(d.cat) + yS.bandwidth() / 2).attr('x', d => xS(d.val) + 5)
      .attr('dominant-baseline', 'middle').attr('fill', '#333').attr('font-size', '10px').attr('font-weight', '600').text(d => d.val.toFixed(1));
    svg.append('text').attr('x', m.l + iW / 2).attr('y', H - 4)
      .attr('text-anchor', 'middle').attr('fill', '#aaa').attr('font-size', '10px').text('coord_flip()');

  } else {
    // polar
    const W = 300, H = 300;
    const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#fafafa');
    const cx = W / 2, cy = H / 2 + 8, maxR = 96;
    // reference rings
    [0.33, 0.67, 1.0].forEach(r => {
      svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r * maxR).attr('fill', 'none').attr('stroke', '#ebebeb').attr('stroke-width', 1);
    });
    const total = d3.sum(BAR_DATA, d => d.val);
    let startAngle = -Math.PI / 2;
    BAR_DATA.forEach(d => {
      const sweep = (d.val / total) * 2 * Math.PI;
      const endAngle = startAngle + sweep;
      const r = (d.val / 38) * maxR;
      const path = d3.arc()({ innerRadius: 0, outerRadius: r, startAngle, endAngle });
      svg.append('path').attr('transform', `translate(${cx},${cy})`).attr('d', path)
        .attr('fill', SP_COLORS[d.cat]).attr('opacity', 0.85).attr('stroke', '#fafafa').attr('stroke-width', 2);
      const midA = startAngle + sweep / 2;
      svg.append('text').attr('x', cx + (r + 18) * Math.sin(midA)).attr('y', cy - (r + 18) * Math.cos(midA))
        .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle').attr('fill', '#444').attr('font-size', '9px').text(d.cat);
      startAngle = endAngle;
    });
    svg.append('text').attr('x', W / 2).attr('y', H - 4)
      .attr('text-anchor', 'middle').attr('fill', '#aaa').attr('font-size', '10px').text('coord_polar(theta = "y")');
  }
}

// ─────────────────────────────────────────────
// D3：自定义坐标轴
// ─────────────────────────────────────────────
function buildAxisChart(container, { breaks, axisMin, axisMax, customLabels }) {
  container.innerHTML = '';
  const W = 480, H = 320, m = { t: 24, r: 20, b: 56, l: 54 };
  const iW = W - m.l - m.r, iH = H - m.t - m.b;
  const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${W} ${H}`).attr('preserveAspectRatio', 'xMidYMid meet');
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#111218').attr('rx', 8);
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);

  const xDomain = [Math.min(axisMin, axisMax - 0.5), Math.max(axisMax, axisMin + 0.5)];
  const xS = d3.scaleLinear().domain(xDomain).range([0, iW]);
  const yS = d3.scaleLinear().domain([0, 7.5]).range([iH, 0]);

  // grid
  yS.ticks(5).forEach(v => {
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', yS(v)).attr('y2', yS(v)).attr('stroke', '#1e2030').attr('stroke-width', 1);
  });
  xS.ticks(breaks).forEach(v => {
    g.append('line').attr('x1', xS(v)).attr('x2', xS(v)).attr('y1', 0).attr('y2', iH).attr('stroke', '#1e2030').attr('stroke-width', 1);
  });

  // limit guide lines
  const guideColor = 'rgba(126,200,227,0.35)';
  [0, iW].forEach(x => {
    g.append('line').attr('x1', x).attr('x2', x).attr('y1', 0).attr('y2', iH)
      .attr('stroke', guideColor).attr('stroke-width', 1.5).attr('stroke-dasharray', '4,3');
  });

  // axes
  const xTicks = xS.ticks(breaks);
  const xAxisFn = d3.axisBottom(xS).tickValues(xTicks);
  if (customLabels) {
    const labels = ['短', '↓', '中', '↓', '中长', '↓', '長', '↓', '超长'];
    xAxisFn.tickFormat((v, i) => labels[i % labels.length] || v.toFixed(1));
  }
  g.append('g').attr('transform', `translate(0,${iH})`).call(xAxisFn)
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', '#888').attr('font-size', '10px'); gg.selectAll('line').attr('stroke', '#555'); });
  g.append('g').call(d3.axisLeft(yS).ticks(5))
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', '#888').attr('font-size', '10px'); gg.selectAll('line').attr('stroke', '#555'); });

  // labels
  g.append('text').attr('x', iW / 2).attr('y', iH + 44)
    .attr('text-anchor', 'middle').attr('fill', '#777').attr('font-size', '11px').attr('font-family', 'var(--font-code)').text('Sepal.Length');
  g.append('text').attr('transform', 'rotate(-90)').attr('x', -iH / 2).attr('y', -42)
    .attr('text-anchor', 'middle').attr('fill', '#777').attr('font-size', '11px').attr('font-family', 'var(--font-code)').text('Petal.Length');

  // points visible in domain
  const visible = IRIS.filter(d => d.x >= xDomain[0] && d.x <= xDomain[1]);
  g.selectAll('circle').data(visible).join('circle')
    .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
    .attr('r', 3.5).attr('fill', d => SP_COLORS[d.sp]).attr('opacity', 0.82);
}

function buildAxisCode(breaks, axisMin, axisMax, customLabels) {
  const labPart = customLabels
    ? `\n  labels = c("短","中","長"),`
    : '';
  return `scale_x_continuous(\n  breaks = seq(${axisMin}, ${axisMax},\n    length.out = ${breaks}),${labPart}\n  limits = c(${axisMin}, ${axisMax})\n)`;
}

// ─────────────────────────────────────────────
// 公用 D3 辅助
// ─────────────────────────────────────────────
function gridLines(g, xS, yS, iW, iH, color) {
  g.selectAll('.gy').data(yS.ticks(5)).join('line')
    .attr('x1', 0).attr('x2', iW).attr('y1', d => yS(d)).attr('y2', d => yS(d))
    .attr('stroke', color).attr('stroke-width', 1);
}

function darkAxes(g, xS, yS, iW, iH) {
  g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS).ticks(5))
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', '#888').attr('font-size', '9px'); gg.selectAll('line').attr('stroke', '#555'); });
  g.append('g').call(d3.axisLeft(yS).ticks(5))
    .call(gg => { gg.select('.domain').attr('stroke', '#555'); gg.selectAll('text').attr('fill', '#888').attr('font-size', '9px'); gg.selectAll('line').attr('stroke', '#555'); });
}

function axisLabelsDark(svg, m, iW, iH, xL, yL) {
  svg.append('text').attr('x', m.l + iW / 2).attr('y', m.t + iH + 40)
    .attr('text-anchor', 'middle').attr('fill', '#888').attr('font-size', '10px').attr('font-family', 'var(--font-code)').text(xL);
  svg.append('text').attr('transform', `rotate(-90)`).attr('x', -(m.t + iH / 2)).attr('y', 12)
    .attr('text-anchor', 'middle').attr('fill', '#888').attr('font-size', '10px').attr('font-family', 'var(--font-code)').text(yL);
}

function syntaxHL(code) {
  return escHtml(code)
    .replace(/\b(ggplot|aes|geom_point|geom_col|scale_color_manual|scale_fill_manual|facet_wrap|facet_grid|theme_minimal|theme|coord_flip|coord_polar|scale_x_continuous|vars|seq|element_blank)\b/g, '<span class="fn">$1</span>')
    .replace(/\b(c|TRUE|FALSE|NULL)\b/g, '<span class="kw">$1</span>')
    .replace(/&quot;([^&]*)&quot;/g, '<span class="str">&quot;$1&quot;</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>');
}

// ─────────────────────────────────────────────
// init()
// ─────────────────────────────────────────────
export function init() {
  // hero quicknav
  document.querySelectorAll('#p6-hero-nav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
  const tl6 = gsap.timeline({ delay: 0.1 });
  tl6.fromTo('.p6-eyebrow',     { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.7, ease: 'power3.out' }, 0);
  tl6.fromTo('.p6-hero-title',  { opacity: 0, y: 40 }, { opacity: 1,   y: 0, duration: 0.9, ease: 'power3.out' }, 0.15);
  tl6.fromTo('.p6-hero-sub',    { opacity: 0, y: 30 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  tl6.fromTo('.p6-hero-tagline',{ opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  tl6.fromTo('#p6-hero-nav',    { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);

  // ── 桌面端：JS-sticky 模拟（transform:translateY，不依赖 CSS sticky）──
  if (window.innerWidth > 768) {
    // 初始化代码面板 + 图表（步骤 0）
    renderCodePanel(document.getElementById('p6-code-display'), 0);
    buildLayerChart(document.getElementById('p6-layer-chart'), 0);
    document.querySelectorAll('.p6-step-panel')[0]?.classList.add('p6-step-active');

    const bodyEl = document.getElementById('p6-layers-body');
    const leftEl = document.getElementById('p6-sticky-left');

    function updateStickyLeft() {
      if (!bodyEl || !leftEl) return;
      const bodyRect = bodyEl.getBoundingClientRect();
      const scrolledPast = Math.max(0, -bodyRect.top);
      const maxTranslate = Math.max(0, bodyEl.offsetHeight - leftEl.offsetHeight);
      leftEl.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;

      // 根据滚动进度激活对应步骤
      const stepH = window.innerHeight;
      const stepIdx = Math.min(LAYER_STEPS.length - 1, Math.max(0, Math.floor(scrolledPast / stepH)));
      if (stepIdx !== state.layerStep) {
        state.layerStep = stepIdx;
        renderCodePanel(document.getElementById('p6-code-display'), stepIdx);
        buildLayerChart(document.getElementById('p6-layer-chart'), stepIdx);
        document.querySelectorAll('.p6-step-panel').forEach((p, idx) => {
          p.classList.toggle('p6-step-active', idx === stepIdx);
        });
      }
    }

    // 监听 window scroll（layout.css 中 #main-content 无 overflow-y，页面滚动在 window 上）
    window.addEventListener('scroll', updateStickyLeft, { passive: true });
    state.scrollHandlers.push({ el: window, fn: updateStickyLeft });
    updateStickyLeft(); // 初始调用一次
  }

  // ── 移动端：渲染所有步骤卡片（每张卡片含独立代码+图表，无需交互，向下滚动即可）──
  if (window.innerWidth <= 768) {
    LAYER_STEPS.forEach((_, i) => {
      const mCodeEl = document.getElementById(`p6-m-code-${i}`);
      const mChartEl = document.getElementById(`p6-m-chart-${i}`);
      if (mCodeEl) renderCodePanel(mCodeEl, i);
      if (mChartEl) buildLayerChart(mChartEl, i);
    });
  }

  // 分面 Tabs
  function updateFacet(mode) {
    state.facetTab = mode;
    buildFacetChart(document.getElementById('p6-facet-chart'), mode);
    const codeEl = document.getElementById('p6-facet-code');
    if (codeEl) codeEl.innerHTML = syntaxHL(FACET_CODES[mode]);
    document.querySelectorAll('#p6-facet-tabs .p6-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.facet === mode);
    });
  }
  document.querySelectorAll('#p6-facet-tabs .p6-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => updateFacet(btn.dataset.facet));
  });
  updateFacet('none');

  // 坐标变换 Tabs
  function updateCoord(mode) {
    state.coordTab = mode;
    buildCoordChart(document.getElementById('p6-coord-chart'), mode);
    const codeEl = document.getElementById('p6-coord-code');
    if (codeEl) codeEl.innerHTML = syntaxHL(COORD_CODES[mode]);
    document.querySelectorAll('#p6-coord-tabs .p6-coord-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.coord === mode);
    });
  }
  document.querySelectorAll('#p6-coord-tabs .p6-coord-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => updateCoord(btn.dataset.coord));
  });
  updateCoord('cartesian');

  // 自定义坐标轴
  function updateAxis() {
    const b = parseInt(document.getElementById('p6-breaks-range')?.value || '5');
    const mn = parseFloat(document.getElementById('p6-min-range')?.value || '4');
    const mx = parseFloat(document.getElementById('p6-max-range')?.value || '8');
    state.axisBreaks = b;
    state.axisMin = mn;
    state.axisMax = mx;
    const bv = document.getElementById('p6-breaks-val');
    const mnv = document.getElementById('p6-min-val');
    const mxv = document.getElementById('p6-max-val');
    if (bv) bv.textContent = b;
    if (mnv) mnv.textContent = mn.toFixed(1);
    if (mxv) mxv.textContent = mx.toFixed(1);
    buildAxisChart(document.getElementById('p6-axis-chart'), { breaks: b, axisMin: mn, axisMax: mx, customLabels: state.customLabels });
    const ac = document.getElementById('p6-axis-code');
    if (ac) ac.innerHTML = syntaxHL(buildAxisCode(b, mn, mx, state.customLabels));
  }
  ['p6-breaks-range', 'p6-min-range', 'p6-max-range'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateAxis);
  });
  document.getElementById('p6-labels-auto')?.addEventListener('click', () => {
    state.customLabels = false;
    document.getElementById('p6-labels-auto')?.classList.add('active');
    document.getElementById('p6-labels-custom')?.classList.remove('active');
    updateAxis();
  });
  document.getElementById('p6-labels-custom')?.addEventListener('click', () => {
    state.customLabels = true;
    document.getElementById('p6-labels-custom')?.classList.add('active');
    document.getElementById('p6-labels-auto')?.classList.remove('active');
    updateAxis();
  });
  updateAxis();

  // 滚动动画
  fadeIn(document.querySelectorAll('.p6-sec-hdr'), { stagger: 0.12, y: 50 });
  fadeIn(document.querySelectorAll('.p6-footer-title, .p6-footer-desc'), { stagger: 0.15 });
  scaleReveal(document.getElementById('p6-axis-layout'));

  // Footer 导航
  document.getElementById('p6-next-btn')?.addEventListener('click', () => navigateTo('m1-p7'));
  document.getElementById('p6-back-btn')?.addEventListener('click', () => navigateTo('m1-p5'));
}

// ─────────────────────────────────────────────
// destroy()
// ─────────────────────────────────────────────
export function destroy() {
  killAll();
  state.layerObservers.forEach(o => o.disconnect());
  state.layerObservers = [];
  state.scrollHandlers.forEach(({ el, fn }) => el.removeEventListener('scroll', fn));
  state.scrollHandlers = [];
  state.resizeHandlers.forEach(fn => window.removeEventListener('resize', fn));
  state.resizeHandlers = [];
  state.layerStep = 0;
  state.facetTab = 'none';
  state.coordTab = 'cartesian';
  state.customLabels = false;
}
