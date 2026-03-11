import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

let _scrollHandlers = [];
let _observers = [];

// ─── render ──────────────────────────────────────────────────────────────────

export function render() {
  return `<div class="page-scroll">
<style>
/* ── Hero ── */
.p01m3-hero { position:relative; overflow:hidden; }
.p01m3-hero::before {
  content:'';
  position:absolute; inset:0;
  background:radial-gradient(ellipse 55% 45% at 30% 50%, rgba(149,213,178,0.18) 0%, transparent 65%);
  animation:p01m3-drift-a 14s ease-in-out infinite;
  pointer-events:none;
}
.p01m3-hero::after {
  content:'';
  position:absolute; inset:0;
  background:radial-gradient(ellipse 45% 50% at 72% 45%, rgba(126,200,227,0.10) 0%, transparent 65%);
  animation:p01m3-drift-b 10s ease-in-out infinite reverse;
  pointer-events:none;
}
@keyframes p01m3-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-16px)} }
@keyframes p01m3-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,20px)} }
.p01m3-scroll-hint {
  font-size:var(--text-caption);
  color:var(--text-on-dark-3);
  animation:p01m3-float 2s ease-in-out infinite;
  white-space:nowrap;
  margin-top:var(--space-sm);
}
@keyframes p01m3-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── Section scroll margins ── */
#p01m3-s1,#p01m3-s2,#p01m3-s3,#p01m3-s4 { scroll-margin-top:56px; }

/* ── S1 格式本质 ── */
#p01m3-s1 { padding:var(--space-3xl) var(--space-xl); }
.p01m3-intro-lead {
  font-family:var(--font-body);
  font-size:clamp(1.15rem,2vw,1.5rem);
  font-weight:300;
  color:var(--text-on-light-2);
  line-height:1.8;
  max-width:var(--w-reading);
  margin:0 auto var(--space-2xl);
  text-align:center;
}
.p01m3-comparison-row {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:var(--space-xl);
  max-width:1000px;
  margin:0 auto var(--space-2xl);
  align-items:start;
}
.p01m3-format-card {
  background:var(--bg-light-elevated);
  border-radius:var(--radius-lg);
  padding:var(--space-lg);
  border:1px solid var(--border-light);
}
.p01m3-format-card h3 {
  font-family:var(--font-display);
  font-size:var(--text-heading);
  font-weight:700;
  color:var(--text-on-light);
  margin-bottom:var(--space-sm);
}
.p01m3-format-tag {
  display:inline-block;
  font-size:0.72rem;
  font-weight:700;
  letter-spacing:0.08em;
  text-transform:uppercase;
  padding:4px 12px;
  border-radius:var(--radius-full);
  margin-bottom:var(--space-md);
}
.p01m3-format-tag.raster { background:rgba(240,178,122,0.15); color:#c97d2e; }
.p01m3-format-tag.vector { background:rgba(149,213,178,0.15); color:#3a9a6a; }
.p01m3-format-svg { width:100%; height:160px; margin-bottom:var(--space-md); border-radius:var(--radius-sm); overflow:hidden; }
.p01m3-format-desc {
  font-size:0.9rem;
  color:var(--text-on-light-2);
  line-height:1.75;
  margin-bottom:var(--space-md);
}
.p01m3-format-use {
  font-size:0.82rem;
  color:var(--text-on-light-2);
  line-height:1.6;
  padding:var(--space-sm) var(--space-md);
  border-left:3px solid;
  border-radius:0 var(--radius-sm) var(--radius-sm) 0;
}
.p01m3-format-use.raster { border-color:#F0B27A; background:rgba(240,178,122,0.06); }
.p01m3-format-use.vector { border-color:var(--module-3); background:rgba(149,213,178,0.06); }

/* ── 三指标对比卡片 ── */
.p01m3-metrics-row {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:var(--space-md);
  max-width:960px;
  margin:0 auto;
}
.p01m3-metric-card {
  background:var(--bg-light-elevated);
  border-radius:var(--radius-lg);
  padding:var(--space-lg);
  border:1px solid var(--border-light);
  text-align:center;
}
.p01m3-metric-icon {
  font-size:2rem;
  margin-bottom:var(--space-sm);
}
.p01m3-metric-title {
  font-size:0.85rem;
  font-weight:700;
  color:var(--text-on-light-2);
  text-transform:uppercase;
  letter-spacing:0.06em;
  margin-bottom:var(--space-md);
}
.p01m3-metric-pair {
  display:flex;
  flex-direction:column;
  gap:8px;
}
.p01m3-metric-item {
  font-size:0.82rem;
  line-height:1.5;
  padding:6px 10px;
  border-radius:var(--radius-sm);
}
.p01m3-metric-item.raster { background:rgba(240,178,122,0.1); color:#8a5a1f; }
.p01m3-metric-item.vector { background:rgba(149,213,178,0.1); color:#2a7a50; }

/* ── S2 缩放演示 ── */
#p01m3-s2 { padding:var(--space-3xl) var(--space-xl); }
.p01m3-zoom-wrap {
  max-width:960px;
  margin:0 auto;
}
.p01m3-zoom-panels {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  border:1px solid var(--border-dark);
  border-radius:var(--radius-lg);
  overflow:hidden;
  margin-bottom:var(--space-lg);
  min-height:280px;
}
.p01m3-panel {
  padding:var(--space-md);
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
}
.p01m3-panel.left { border-right:1px solid var(--border-dark); background:#0a0a12; }
.p01m3-panel.right { background:#0a0a12; }
.p01m3-panel-label {
  font-size:0.7rem;
  font-weight:700;
  letter-spacing:0.1em;
  text-transform:uppercase;
  margin-bottom:var(--space-md);
  width:100%;
  text-align:center;
}
.p01m3-panel-label.raster { color:#F0B27A; }
.p01m3-panel-label.vector { color:var(--module-3); }
.p01m3-canvas-wrap {
  width:100%;
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  overflow:hidden;
  min-height:180px;
  position:relative;
}
#p01m3-raster-canvas {
  display:block;
  image-rendering:pixelated;
  image-rendering:-moz-crisp-edges;
  transform-origin:center center;
}
#p01m3-vector-svg {
  width:100%;
  height:100%;
  max-width:200px;
  max-height:160px;
}
.p01m3-badge {
  position:absolute;
  bottom:8px;
  left:50%;
  transform:translateX(-50%);
  font-size:0.7rem;
  font-weight:700;
  padding:4px 10px;
  border-radius:var(--radius-full);
  white-space:nowrap;
  opacity:0;
  transition:opacity 0.3s;
  pointer-events:none;
}
.p01m3-badge.raster { background:rgba(240,100,50,0.9); color:#fff; }
.p01m3-badge.vector { background:rgba(149,213,178,0.9); color:#0a2e1c; }

/* 缩放控制区 */
.p01m3-zoom-controls {
  display:flex;
  align-items:center;
  gap:var(--space-md);
  justify-content:center;
  padding:var(--space-md);
  background:rgba(255,255,255,0.04);
  border-radius:var(--radius-md);
  border:1px solid var(--border-dark);
}
.p01m3-zoom-controls label {
  font-size:0.85rem;
  color:var(--text-on-dark-2);
  white-space:nowrap;
}
#p01m3-zoom-slider {
  flex:1;
  max-width:320px;
  accent-color:var(--module-3);
  height:6px;
  cursor:pointer;
}
#p01m3-scale-label {
  font-size:1.1rem;
  font-weight:700;
  color:var(--module-3);
  font-family:var(--font-code);
  min-width:52px;
  text-align:right;
}
.p01m3-zoom-hint {
  text-align:center;
  font-size:0.8rem;
  color:var(--text-on-dark-3);
  margin-top:var(--space-sm);
}

/* ── S3 决策树 ── */
#p01m3-s3 { padding:var(--space-3xl) var(--space-xl); }
.p01m3-tree-wrap {
  max-width:900px;
  margin:0 auto;
  position:relative;
}
.p01m3-tree-controls {
  text-align:right;
  margin-bottom:var(--space-md);
}
.p01m3-tree-reset {
  font-size:0.8rem;
  padding:8px 18px;
  border-radius:var(--radius-full);
  border:1.5px solid var(--border-light);
  background:transparent;
  color:var(--text-on-light-2);
  cursor:pointer;
  transition:all 0.2s;
  font-family:var(--font-heading);
  min-height:36px;
}
.p01m3-tree-reset:hover { border-color:var(--module-3); color:#3a9a6a; }
#p01m3-tree-svg {
  width:100%;
  overflow:visible;
  display:block;
}
.p01m3-tree-result {
  display:none;
  margin-top:var(--space-lg);
  padding:var(--space-lg);
  border-radius:var(--radius-lg);
  border:2px solid var(--module-3);
  background:rgba(149,213,178,0.06);
}
.p01m3-tree-result.visible { display:block; }
.p01m3-result-format {
  font-family:var(--font-display);
  font-size:var(--text-heading);
  font-weight:700;
  color:var(--text-on-light);
  margin-bottom:var(--space-sm);
}
.p01m3-result-tools {
  font-size:0.85rem;
  color:var(--text-on-light-2);
  line-height:1.7;
}

/* ── S4 文件权衡 ── */
#p01m3-s4 { padding:var(--space-3xl) var(--space-xl); }
.p01m3-chart-wrap {
  max-width:800px;
  margin:0 auto var(--space-xl);
  position:relative;
}
#p01m3-file-chart {
  width:100%;
  display:block;
  background:var(--bg-dark-elevated,#2a2a2d);
  border-radius:var(--radius-lg);
  overflow:visible;
}
.p01m3-complexity-wrap {
  max-width:800px;
  margin:0 auto var(--space-xl);
  padding:var(--space-md) var(--space-lg);
  background:rgba(255,255,255,0.04);
  border-radius:var(--radius-md);
  border:1px solid var(--border-dark);
  display:flex;
  align-items:center;
  gap:var(--space-md);
}
.p01m3-complexity-wrap label {
  font-size:0.85rem;
  color:var(--text-on-dark-2);
  white-space:nowrap;
}
#p01m3-complexity-slider {
  flex:1;
  accent-color:var(--module-3);
  height:6px;
  cursor:pointer;
}
.p01m3-complexity-val {
  font-size:1rem;
  font-weight:700;
  color:var(--module-3);
  font-family:var(--font-code);
  min-width:24px;
  text-align:right;
}
/* D3 tooltip */
.p01m3-tooltip {
  position:fixed;
  background:rgba(0,0,0,0.9);
  color:#f5f5f7;
  padding:8px 12px;
  border-radius:var(--radius-sm);
  font-size:0.78rem;
  pointer-events:none;
  opacity:0;
  transition:opacity 0.15s;
  z-index:1000;
  border:1px solid var(--border-dark);
  line-height:1.6;
  max-width:200px;
}

/* 总结卡片 */
.p01m3-summary-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:var(--space-md);
  max-width:960px;
  margin:0 auto;
}
.p01m3-summary-card {
  background:rgba(255,255,255,0.04);
  border-radius:var(--radius-lg);
  padding:var(--space-lg);
  border:1px solid var(--border-dark);
}
.p01m3-summary-scene {
  font-size:0.72rem;
  font-weight:700;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--module-3);
  margin-bottom:var(--space-sm);
}
.p01m3-summary-title {
  font-size:var(--text-body);
  font-weight:700;
  color:var(--text-on-dark);
  margin-bottom:var(--space-sm);
  line-height:1.4;
}
.p01m3-summary-rec {
  font-size:0.85rem;
  color:var(--text-on-dark-2);
  line-height:1.7;
}
.p01m3-summary-badge {
  display:inline-block;
  margin-top:var(--space-sm);
  padding:4px 10px;
  border-radius:var(--radius-full);
  font-size:0.72rem;
  font-weight:700;
  background:rgba(149,213,178,0.15);
  color:var(--module-3);
}

/* ── Section标题通用 ── */
.p01m3-section-eyebrow {
  font-size:var(--text-caption);
  font-weight:700;
  letter-spacing:0.1em;
  text-transform:uppercase;
  color:var(--module-3);
  font-family:var(--font-heading);
  margin-bottom:var(--space-sm);
  text-align:center;
}
.p01m3-section-title {
  font-family:var(--font-display);
  font-size:var(--text-title);
  font-weight:700;
  letter-spacing:-0.02em;
  line-height:1.2;
  text-align:center;
  margin-bottom:var(--space-md);
}
.p01m3-section-title.on-light { color:var(--text-on-light); }
.p01m3-section-title.on-dark  { color:var(--text-on-dark); }
.p01m3-section-sub {
  text-align:center;
  font-size:var(--text-body);
  font-weight:300;
  line-height:1.8;
  max-width:600px;
  margin:0 auto var(--space-2xl);
}
.p01m3-section-sub.on-light { color:var(--text-on-light-2); }
.p01m3-section-sub.on-dark  { color:var(--text-on-dark-2); }

/* ── responsive ── */
@media (max-width:900px) {
  .p01m3-comparison-row { grid-template-columns:1fr; gap:var(--space-lg); }
  .p01m3-metrics-row { grid-template-columns:1fr; }
  .p01m3-zoom-panels { grid-template-columns:1fr; }
  .p01m3-panel.left { border-right:none; border-bottom:1px solid var(--border-dark); }
  .p01m3-summary-grid { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  #p01m3-s1,#p01m3-s2,#p01m3-s3,#p01m3-s4 { padding:var(--space-2xl) var(--space-md); }
  .p01m3-intro-lead { font-size:1rem; }
  .p01m3-zoom-controls { flex-wrap:wrap; }
  #p01m3-zoom-slider { max-width:100%; }
  .p01m3-complexity-wrap { flex-wrap:wrap; }
  #p01m3-complexity-slider { min-width:100%; }
}
</style>

<!-- ── HERO ── -->
<section class="section-dark section-hero-full p01m3-hero" id="p01m3-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 01</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">矢量 vs 位图</h1>
    <p class="page-hero-sub" style="opacity:0;">Vector vs Raster: Understanding the Fundamental Difference</p>
    <p class="p01m3-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">一个像素，一把锁——理解两种格式的本质，选对格式就是选对工具</p>
    <nav class="hero-quicknav" id="p01m3-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p01m3-s1">格式本质</button>
      <button class="hero-quicknav__item" data-target="#p01m3-s2">缩放对比</button>
      <button class="hero-quicknav__item" data-target="#p01m3-s3">选择指南</button>
      <button class="hero-quicknav__item" data-target="#p01m3-s4">文件权衡</button>
    </nav>
    <div class="p01m3-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 格式本质 ── -->
<section class="section-light" id="p01m3-s1">
  <div class="content-wrapper">
    <p class="p01m3-section-eyebrow">格式本质</p>
    <h2 class="p01m3-section-title on-light">两种截然不同的世界观</h2>
    <p class="p01m3-section-sub on-light">位图用像素记录世界，矢量用数学描述形状。这一本质差异决定了它们各自的边界与优势。</p>

    <div class="p01m3-comparison-row">
      <!-- 位图卡片 -->
      <div class="p01m3-format-card">
        <span class="p01m3-format-tag raster">Raster · 位图</span>
        <h3>像素网格</h3>
        <!-- 像素化示意SVG -->
        <svg class="p01m3-format-svg" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-label="位图像素网格示意">
          <rect width="200" height="140" fill="#f0ede8"/>
          <!-- 6×6 像素网格，模拟科研散点图的像素化效果 -->
          <g transform="translate(20,15)">
            <!-- 行0 -->
            <rect x="0"  y="0"  width="26" height="18" fill="#e0dcd8" rx="1"/>
            <rect x="27" y="0"  width="26" height="18" fill="#d8d4cf" rx="1"/>
            <rect x="54" y="0"  width="26" height="18" fill="#c2beba" rx="1"/>
            <rect x="81" y="0"  width="26" height="18" fill="#bab6b2" rx="1"/>
            <rect x="108" y="0" width="26" height="18" fill="#9a96a2" rx="1"/>
            <rect x="135" y="0" width="26" height="18" fill="#8e8a96" rx="1"/>
            <!-- 行1 -->
            <rect x="0"  y="19" width="26" height="18" fill="#d8d4cf" rx="1"/>
            <rect x="27" y="19" width="26" height="18" fill="#c8c4c0" rx="1"/>
            <rect x="54" y="19" width="26" height="18" fill="#b8b4b0" rx="1"/>
            <rect x="81" y="19" width="26" height="18" fill="#a0a8bf" rx="1"/>
            <rect x="108" y="19" width="26" height="18" fill="#7ec8e3" rx="1"/>
            <rect x="135" y="19" width="26" height="18" fill="#6eb8d3" rx="1"/>
            <!-- 行2 -->
            <rect x="0"  y="38" width="26" height="18" fill="#e8e4e0" rx="1"/>
            <rect x="27" y="38" width="26" height="18" fill="#95d5b2" rx="1"/>
            <rect x="54" y="38" width="26" height="18" fill="#85c5a2" rx="1"/>
            <rect x="81" y="38" width="26" height="18" fill="#c8c4c0" rx="1"/>
            <rect x="108" y="38" width="26" height="18" fill="#d8d4d0" rx="1"/>
            <rect x="135" y="38" width="26" height="18" fill="#c8c4c8" rx="1"/>
            <!-- 行3 -->
            <rect x="0"  y="57" width="26" height="18" fill="#f0b27a" rx="1"/>
            <rect x="27" y="57" width="26" height="18" fill="#e0a26a" rx="1"/>
            <rect x="54" y="57" width="26" height="18" fill="#d8d4cf" rx="1"/>
            <rect x="81" y="57" width="26" height="18" fill="#e8e4e0" rx="1"/>
            <rect x="108" y="57" width="26" height="18" fill="#d0cccc" rx="1"/>
            <rect x="135" y="57" width="26" height="18" fill="#cac6c2" rx="1"/>
            <!-- 行4 -->
            <rect x="0"  y="76" width="26" height="18" fill="#e8e4e0" rx="1"/>
            <rect x="27" y="76" width="26" height="18" fill="#d8d4d0" rx="1"/>
            <rect x="54" y="76" width="26" height="18" fill="#c8c4c2" rx="1"/>
            <rect x="81" y="76" width="26" height="18" fill="#b8b4b2" rx="1"/>
            <rect x="108" y="76" width="26" height="18" fill="#a8a4a0" rx="1"/>
            <rect x="135" y="76" width="26" height="18" fill="#98948f" rx="1"/>
            <!-- 行5 -->
            <rect x="0"  y="95" width="26" height="18" fill="#d8d4cf" rx="1"/>
            <rect x="27" y="95" width="26" height="18" fill="#c8c4c0" rx="1"/>
            <rect x="54" y="95" width="26" height="18" fill="#b4b0ac" rx="1"/>
            <rect x="81" y="95" width="26" height="18" fill="#a4a0a0" rx="1"/>
            <rect x="108" y="95" width="26" height="18" fill="#949092" rx="1"/>
            <rect x="135" y="95" width="26" height="18" fill="#888488" rx="1"/>
          </g>
          <!-- "像素化" 标注 -->
          <text x="100" y="133" text-anchor="middle" font-size="10" fill="#9a9690" font-family="JetBrains Mono, monospace">像素 × 像素 = 固定分辨率</text>
        </svg>
        <p class="p01m3-format-desc">
          位图由<strong>像素网格</strong>构成，每个像素储存固定颜色值。相机照片、显微图像、渲染图都是位图。分辨率在创建时固定，放大后会出现锯齿和模糊。
        </p>
        <div class="p01m3-format-use raster">
          <strong>适合</strong>：照片、荧光显微图像、渐变丰富的渲染图、卫星遥感图
        </div>
      </div>

      <!-- 矢量卡片 -->
      <div class="p01m3-format-card">
        <span class="p01m3-format-tag vector">Vector · 矢量</span>
        <h3>数学方程</h3>
        <!-- 矢量干净示意 -->
        <svg class="p01m3-format-svg" viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" aria-label="矢量图形示意">
          <rect width="200" height="140" fill="#f0f7f3"/>
          <!-- 干净几何：圆 + 正方形 + 折线 -->
          <circle cx="60" cy="60" r="32" fill="none" stroke="#95D5B2" stroke-width="2.5"/>
          <circle cx="60" cy="60" r="12" fill="#95D5B2" opacity="0.4"/>
          <rect x="110" y="30" width="56" height="56" rx="8" fill="none" stroke="#7EC8E3" stroke-width="2.5"/>
          <rect x="122" y="42" width="32" height="32" rx="4" fill="#7EC8E3" opacity="0.3"/>
          <!-- 折线（贝塞尔曲线） -->
          <path d="M20,115 Q60,85 100,105 Q140,120 180,90" fill="none" stroke="#F0B27A" stroke-width="2.5" stroke-linecap="round"/>
          <!-- 锚点 -->
          <circle cx="20" cy="115" r="3.5" fill="#F0B27A"/>
          <circle cx="100" cy="105" r="3.5" fill="#F0B27A"/>
          <circle cx="180" cy="90" r="3.5" fill="#F0B27A"/>
          <text x="100" y="133" text-anchor="middle" font-size="10" fill="#5a9a7a" font-family="JetBrains Mono, monospace">path d="M..." ← 数学方程</text>
        </svg>
        <p class="p01m3-format-desc">
          矢量图用<strong>数学方程</strong>描述形状、路径和颜色。放大任意倍数后，系统重新计算并渲染，边缘始终保持锐利。图表、图标、线条图是矢量的天然领域。
        </p>
        <div class="p01m3-format-use vector">
          <strong>适合</strong>：数据图表（折线/散点/柱状）、示意图、流程图、图标、出版级插图
        </div>
      </div>
    </div>

    <!-- 三指标对比 -->
    <div class="p01m3-metrics-row">
      <div class="p01m3-metric-card">
        <div class="p01m3-metric-icon">⚖️</div>
        <div class="p01m3-metric-title">文件大小</div>
        <div class="p01m3-metric-pair">
          <div class="p01m3-metric-item raster">位图：与分辨率成正比，4K图像轻松超过 10MB</div>
          <div class="p01m3-metric-item vector">矢量：与路径复杂度成正比，简单图表仅 5–50 KB</div>
        </div>
      </div>
      <div class="p01m3-metric-card">
        <div class="p01m3-metric-icon">🔍</div>
        <div class="p01m3-metric-title">可缩放性</div>
        <div class="p01m3-metric-pair">
          <div class="p01m3-metric-item raster">位图：固定分辨率，放大出现像素化失真</div>
          <div class="p01m3-metric-item vector">矢量：无限缩放，100% → 10000% 边缘始终锐利</div>
        </div>
      </div>
      <div class="p01m3-metric-card">
        <div class="p01m3-metric-icon">📰</div>
        <div class="p01m3-metric-title">期刊适用性</div>
        <div class="p01m3-metric-pair">
          <div class="p01m3-metric-item raster">位图：需 ≥300 DPI，TIFF/PNG 是常见要求</div>
          <div class="p01m3-metric-item vector">矢量：PDF/EPS/SVG 满足所有期刊分辨率要求</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S2 实时缩放演示 ── -->
<section class="section-dark" id="p01m3-s2">
  <div class="content-wrapper">
    <p class="p01m3-section-eyebrow" style="color:var(--module-3);">交互演示</p>
    <h2 class="p01m3-section-title on-dark">拖动滑块，亲眼见证差异</h2>
    <p class="p01m3-section-sub on-dark">同一张散点图，位图版（左）和矢量版（右）同步缩放——200% 以上感受像素化与清晰度的分歧。</p>

    <div class="p01m3-zoom-wrap">
      <div class="p01m3-zoom-panels">
        <!-- 位图侧 -->
        <div class="p01m3-panel left">
          <div class="p01m3-panel-label raster">⚡ 位图 Raster（Canvas，低分辨率）</div>
          <div class="p01m3-canvas-wrap">
            <canvas id="p01m3-raster-canvas" width="80" height="60" style="display:block;image-rendering:pixelated;"></canvas>
            <div id="p01m3-raster-badge" class="p01m3-badge raster">⚠ 像素化失真</div>
          </div>
        </div>
        <!-- 矢量侧 -->
        <div class="p01m3-panel right">
          <div class="p01m3-panel-label vector">✦ 矢量 Vector（SVG，无限清晰）</div>
          <div class="p01m3-canvas-wrap">
            <svg id="p01m3-vector-svg" viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg" aria-label="矢量散点图">
              <!-- 背景 -->
              <rect width="100" height="75" fill="#1a1a2e" rx="4"/>
              <!-- 坐标轴 -->
              <line x1="10" y1="5" x2="10" y2="65" stroke="#444" stroke-width="0.6"/>
              <line x1="10" y1="65" x2="95" y2="65" stroke="#444" stroke-width="0.6"/>
              <!-- 网格线（轻） -->
              <line x1="10" y1="45" x2="95" y2="45" stroke="#333" stroke-width="0.3" stroke-dasharray="2,2"/>
              <line x1="10" y1="25" x2="95" y2="25" stroke="#333" stroke-width="0.3" stroke-dasharray="2,2"/>
              <!-- 趋势线 -->
              <line x1="10" y1="62" x2="90" y2="8" stroke="#555" stroke-width="0.5" stroke-dasharray="3,2"/>
              <!-- 散点组1 蓝 -->
              <circle cx="18" cy="58" r="2.5" fill="#7EC8E3" opacity="0.9"/>
              <circle cx="23" cy="52" r="2.5" fill="#7EC8E3" opacity="0.9"/>
              <circle cx="28" cy="55" r="2.5" fill="#7EC8E3" opacity="0.9"/>
              <circle cx="33" cy="48" r="2.5" fill="#7EC8E3" opacity="0.9"/>
              <!-- 散点组2 绿 -->
              <circle cx="43" cy="42" r="2.5" fill="#95D5B2" opacity="0.9"/>
              <circle cx="48" cy="36" r="2.5" fill="#95D5B2" opacity="0.9"/>
              <circle cx="53" cy="39" r="2.5" fill="#95D5B2" opacity="0.9"/>
              <circle cx="58" cy="32" r="2.5" fill="#95D5B2" opacity="0.9"/>
              <!-- 散点组3 橙 -->
              <circle cx="68" cy="26" r="2.5" fill="#F0B27A" opacity="0.9"/>
              <circle cx="73" cy="20" r="2.5" fill="#F0B27A" opacity="0.9"/>
              <circle cx="78" cy="22" r="2.5" fill="#F0B27A" opacity="0.9"/>
              <circle cx="83" cy="15" r="2.5" fill="#F0B27A" opacity="0.9"/>
              <!-- 轴标签 -->
              <text x="52" y="73" text-anchor="middle" font-size="4" fill="#666" font-family="JetBrains Mono, monospace">X variable</text>
              <text x="5" y="35" text-anchor="middle" font-size="4" fill="#666" font-family="JetBrains Mono, monospace" transform="rotate(-90,5,35)">Y</text>
            </svg>
            <div id="p01m3-vector-badge" class="p01m3-badge vector">✓ 仍然清晰锐利</div>
          </div>
        </div>
      </div>

      <!-- 缩放控制 -->
      <div class="p01m3-zoom-controls">
        <label for="p01m3-zoom-slider">缩放比例</label>
        <input type="range" id="p01m3-zoom-slider" min="100" max="800" value="100" step="10" style="min-height:44px;">
        <span id="p01m3-scale-label">100%</span>
      </div>
      <p class="p01m3-zoom-hint">尝试拖动到 200% 或更高，观察两侧的差异</p>
    </div>
  </div>
</section>

<!-- ── S3 决策树 ── -->
<section class="section-light" id="p01m3-s3">
  <div class="content-wrapper">
    <p class="p01m3-section-eyebrow">选择指南</p>
    <h2 class="p01m3-section-title on-light">格式选择决策树</h2>
    <p class="p01m3-section-sub on-light">点击选项，逐步确定你的图表应该用哪种格式。</p>

    <div class="p01m3-tree-wrap">
      <div class="p01m3-tree-controls">
        <button class="p01m3-tree-reset" id="p01m3-tree-reset">↺ 重置</button>
      </div>
      <svg id="p01m3-tree-svg" height="360" aria-label="格式选择决策树"></svg>
      <div class="p01m3-tree-result" id="p01m3-tree-result">
        <div class="p01m3-result-format" id="p01m3-result-format"></div>
        <div class="p01m3-result-tools" id="p01m3-result-tools"></div>
      </div>
    </div>
  </div>
</section>

<!-- ── S4 文件权衡 ── -->
<section class="section-dark" id="p01m3-s4">
  <div class="content-wrapper">
    <p class="p01m3-section-eyebrow" style="color:var(--module-3);">文件权衡</p>
    <h2 class="p01m3-section-title on-dark">复杂度越高，矢量越有优势</h2>
    <p class="p01m3-section-sub on-dark">当图表内容复杂度增加时，各格式文件大小的变化趋势截然不同。悬停或触摸查看数值。</p>

    <div class="p01m3-chart-wrap">
      <svg id="p01m3-file-chart" height="320" aria-label="格式文件大小对比折线图"></svg>
    </div>

    <div class="p01m3-complexity-wrap">
      <label for="p01m3-complexity-slider">内容复杂度</label>
      <input type="range" id="p01m3-complexity-slider" min="1" max="10" value="5" step="1" style="min-height:44px;">
      <span class="p01m3-complexity-val" id="p01m3-complexity-val">5</span>
    </div>

    <!-- 场景总结卡片 -->
    <div class="p01m3-summary-grid">
      <div class="p01m3-summary-card">
        <div class="p01m3-summary-scene">场景 01</div>
        <div class="p01m3-summary-title">数据图表类<br>（散点 / 折线 / 柱状）</div>
        <div class="p01m3-summary-rec">图表内容是精确数学关系，矢量格式能完美保留坐标轴、刻度线、文字标注，任意尺寸输出质量一致。</div>
        <span class="p01m3-summary-badge">→ 始终用 PDF / SVG</span>
      </div>
      <div class="p01m3-summary-card">
        <div class="p01m3-summary-scene">场景 02</div>
        <div class="p01m3-summary-title">图像类<br>（荧光显微 / 遥感）</div>
        <div class="p01m3-summary-rec">照片型图像本质是像素数据，矢量无法描述连续渐变。使用足够高分辨率的 TIFF 或 PNG，确保 ≥300 DPI。</div>
        <span class="p01m3-summary-badge">→ 用 TIFF / PNG ≥300dpi</span>
      </div>
      <div class="p01m3-summary-card">
        <div class="p01m3-summary-scene">场景 03</div>
        <div class="p01m3-summary-title">混合图<br>（图表 + 图像组合）</div>
        <div class="p01m3-summary-rec">将矢量图表框架与位图图像结合：在 Illustrator 或 Inkscape 中，使用 PDF/SVG 容器嵌入高分辨率位图，兼顾两者优势。</div>
        <span class="p01m3-summary-badge">→ 矢量容器内嵌位图</span>
      </div>
    </div>
  </div>
</section>

<!-- ── FOOTER CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">01 / 07</p>
  <h2 class="page-footer-quote">格式选择，是科研表达的第一道门槛。</h2>
  <p class="page-footer-desc">掌握矢量与位图的本质区别，是科研图形制作的第一步。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p01m3-nav-prev">← 模块二完结</button>
    <button class="btn-ghost" id="p01m3-nav-home">返回模块首页</button>
    <button class="btn-primary" id="p01m3-nav-next">Illustrator 工具 →</button>
  </div>
</section>

<!-- D3 tooltip -->
<div class="p01m3-tooltip" id="p01m3-tooltip"></div>

</div>`;
}

// ─── 决策树数据 ────────────────────────────────────────────────────────────────

const TREE_DATA = {
  id: 'root',
  question: '图表是否包含精确数值 / 坐标轴？',
  children: [
    {
      id: 'yes-A',
      label: '是',
      question: '是否需要在论文中缩放显示？',
      children: [
        {
          id: 'result-1',
          label: '是',
          result: true,
          format: 'PDF / SVG 矢量格式',
          color: '#95D5B2',
          tools: '推荐软件：Adobe Illustrator、Inkscape、R（ggsave PDF）、Python（matplotlib savefig PDF）\n期刊适用：Nature、Science、Cell 等顶刊首选格式',
        },
        {
          id: 'result-2',
          label: '否',
          result: true,
          format: 'PNG ≥300 DPI',
          color: '#7EC8E3',
          tools: '推荐软件：R（ggsave PNG，dpi=300）、Python（savefig dpi=300）\n期刊适用：大多数期刊接受 300DPI PNG，但矢量仍更优',
        },
      ],
    },
    {
      id: 'no-B',
      label: '否',
      question: '是照片或渐变丰富的图像？',
      children: [
        {
          id: 'result-3',
          label: '是',
          result: true,
          format: 'TIFF / JPEG ≥300 DPI',
          color: '#F0B27A',
          tools: '推荐软件：Photoshop、GIMP、ImageJ（科研图像处理）\n期刊适用：荧光显微、遥感等图像首选 TIFF',
        },
        {
          id: 'result-4',
          label: '否',
          result: true,
          format: 'SVG / PDF 矢量',
          color: '#95D5B2',
          tools: '推荐软件：Adobe Illustrator、Inkscape、Figma\n期刊适用：图标、示意图、流程图均可使用矢量',
        },
      ],
    },
  ],
};

// ─── 文件大小数据 ──────────────────────────────────────────────────────────────

const FILE_DATA = {
  svg:  [2,5,10,18,28,40,55,80,110,150],
  png:  [200,220,240,260,280,300,320,350,380,400],
  tiff: [1500,1600,1700,1800,1900,2000,2100,2200,2300,3000],
  pdf:  [10,20,35,55,80,110,145,190,240,300],
};

const LINE_COLORS = {
  svg:  '#95D5B2',
  png:  '#7EC8E3',
  tiff: '#F0B27A',
  pdf:  '#B8B8E8',
};

const LINE_LABELS = {
  svg:  'SVG（矢量）',
  png:  'PNG 300dpi',
  tiff: 'TIFF',
  pdf:  'PDF（矢量+字体）',
};

// ─── init ─────────────────────────────────────────────────────────────────────

export function init() {
  initHero();
  initQuicknav();
  initScrollFadeIns();
  initZoomDemo();
  initDecisionTree();
  initFileChart();
  initFooterNav();
}

// ── Hero 动画 ──────────────────────────────────────────────────────────────────

function initHero() {
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p01m3-hero .hero-eyebrow',
    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p01m3-hero .page-hero-title',
    { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p01m3-hero .page-hero-sub',
    { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p01m3-hero-tagline',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p01m3-quicknav',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p01m3-scroll-hint',
    { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);
}

// ── 快捷导航 ──────────────────────────────────────────────────────────────────

function initQuicknav() {
  const btns = document.querySelectorAll('#p01m3-quicknav .hero-quicknav__item');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (!target) return;
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ── 滚动淡入 ──────────────────────────────────────────────────────────────────

function initScrollFadeIns() {
  fadeIn('.p01m3-format-card', { stagger: 0.15 });
  fadeIn('.p01m3-metric-card', { stagger: 0.12 });
  fadeIn('.p01m3-summary-card', { stagger: 0.12 });
  fadeIn('.p01m3-zoom-wrap', { y: 40 });
  fadeIn('.p01m3-tree-wrap', { y: 40 });
  fadeIn('.p01m3-chart-wrap', { y: 40 });
}

// ── 缩放演示 ──────────────────────────────────────────────────────────────────

function initZoomDemo() {
  const rasterCanvas = document.getElementById('p01m3-raster-canvas');
  const svgEl = document.getElementById('p01m3-vector-svg');
  const slider = document.getElementById('p01m3-zoom-slider');
  const scaleLabel = document.getElementById('p01m3-scale-label');
  const rasterBadge = document.getElementById('p01m3-raster-badge');
  const vectorBadge = document.getElementById('p01m3-vector-badge');

  if (!rasterCanvas || !svgEl || !slider) return;

  // 绘制低分辨率散点图（故意 80×60，不用 devicePixelRatio）
  const ctx = rasterCanvas.getContext('2d');
  rasterCanvas.width = 80;
  rasterCanvas.height = 60;

  // 背景
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, 80, 60);

  // 坐标轴
  ctx.strokeStyle = '#444444';
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(8, 4);
  ctx.lineTo(8, 52);
  ctx.lineTo(76, 52);
  ctx.stroke();

  // 趋势线（虚线）
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 0.4;
  ctx.setLineDash([2, 1.5]);
  ctx.beginPath();
  ctx.moveTo(8, 50);
  ctx.lineTo(76, 6);
  ctx.stroke();
  ctx.setLineDash([]);

  // 散点
  const points = [
    {x:15,y:44,c:'#7EC8E3'},{x:20,y:40,c:'#7EC8E3'},{x:25,y:42,c:'#7EC8E3'},{x:30,y:36,c:'#7EC8E3'},
    {x:38,y:30,c:'#95D5B2'},{x:43,y:26,c:'#95D5B2'},{x:48,y:28,c:'#95D5B2'},{x:53,y:22,c:'#95D5B2'},
    {x:60,y:18,c:'#F0B27A'},{x:65,y:13,c:'#F0B27A'},{x:70,y:15,c:'#F0B27A'},{x:75,y:10,c:'#F0B27A'},
  ];
  points.forEach(p => {
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 滑块更新逻辑，使用 rAF ticking
  let ticking = false;
  function updateZoom() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const pct = parseInt(slider.value);
      const scale = pct / 100;
      scaleLabel.textContent = pct + '%';

      // 位图：CSS transform scale（pixelated）
      rasterCanvas.style.transform = `scale(${scale})`;
      rasterCanvas.style.transformOrigin = 'center center';
      rasterCanvas.style.imageRendering = 'pixelated';

      // 矢量：缩小 viewBox 等效放大
      const vbW = 100 / scale;
      const vbH = 75 / scale;
      const vbX = (100 - vbW) / 2;
      const vbY = (75 - vbH) / 2;
      svgEl.setAttribute('viewBox', `${vbX} ${vbY} ${vbW} ${vbH}`);

      // 徽章显隐
      const show = pct >= 200 ? '1' : '0';
      rasterBadge.style.opacity = show;
      vectorBadge.style.opacity = show;

      ticking = false;
    });
  }

  slider.addEventListener('input', updateZoom, { passive: true });
  _scrollHandlers.push({ el: slider, type: 'input', fn: updateZoom, opts: { passive: true } });
}

// ── 决策树（D3）──────────────────────────────────────────────────────────────

let _treeState = null;

function initDecisionTree() {
  const svg = document.getElementById('p01m3-tree-svg');
  if (!svg || !d3) return;

  let currentNode = TREE_DATA;
  let selectedPath = []; // [{node, choiceIdx}]

  function render() {
    const svgSel = d3.select('#p01m3-tree-svg');
    const W = svg.parentElement ? svg.parentElement.clientWidth : 800;
    svgSel.attr('width', W);

    svgSel.selectAll('*').remove();

    if (currentNode.result) {
      // 已到叶节点，显示结果卡片
      const resultDiv = document.getElementById('p01m3-tree-result');
      const formatDiv = document.getElementById('p01m3-result-format');
      const toolsDiv = document.getElementById('p01m3-result-tools');
      if (resultDiv) resultDiv.classList.add('visible');
      if (formatDiv) formatDiv.textContent = '推荐格式：' + currentNode.format;
      if (toolsDiv) toolsDiv.style.whiteSpace = 'pre-wrap';
      if (toolsDiv) toolsDiv.textContent = currentNode.tools;
      if (resultDiv) resultDiv.style.borderColor = currentNode.color;
      return;
    }

    // 隐藏结果卡片
    const resultDiv = document.getElementById('p01m3-tree-result');
    if (resultDiv) resultDiv.classList.remove('visible');

    // 渲染当前问题 + 选项
    const g = svgSel.append('g').attr('transform', 'translate(0,20)');
    const isMobile = W < 600;

    // 问题框
    const questionW = Math.min(W * 0.85, 520);
    const questionX = (W - questionW) / 2;
    const questionH = 60;

    // 绘制已选路径（面包屑）
    if (selectedPath.length > 0) {
      let breadcrumb = selectedPath.map(s => {
        const label = s.node.children[s.choiceIdx].label;
        return label;
      }).join(' → ');
      g.append('text')
        .attr('x', W / 2)
        .attr('y', -5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#95D5B2')
        .attr('font-family', 'var(--font-heading)')
        .text('路径：' + breadcrumb);
    }

    // 问题框
    g.append('rect')
      .attr('x', questionX)
      .attr('y', 15)
      .attr('width', questionW)
      .attr('height', questionH)
      .attr('rx', 12)
      .attr('fill', '#1d1d1f')
      .attr('stroke', '#95D5B2')
      .attr('stroke-width', 2);

    g.append('text')
      .attr('x', W / 2)
      .attr('y', 48)
      .attr('text-anchor', 'middle')
      .attr('font-size', isMobile ? '13px' : '15px')
      .attr('font-weight', '600')
      .attr('fill', '#f5f5f7')
      .attr('font-family', 'var(--font-heading)')
      .text(currentNode.question);

    // 连接线
    const lineY1 = 15 + questionH;
    const lineY2 = 140;
    const opts = currentNode.children;
    const gap = isMobile ? 16 : 32;
    const optW = isMobile ? Math.min((W - gap * 3) / 2, 180) : Math.min((W - gap * 3) / 2, 220);
    const optH = 52;
    const leftX = W / 2 - gap / 2 - optW;
    const rightX = W / 2 + gap / 2;

    // 左选项
    const centers = [leftX + optW / 2, rightX + optW / 2];
    const questionCenterX = W / 2;

    centers.forEach((cx, i) => {
      // 连接线
      const path = d3.path();
      path.moveTo(questionCenterX, lineY1);
      path.bezierCurveTo(questionCenterX, lineY1 + 30, cx, lineY2 - 20, cx, lineY2);
      g.append('path')
        .attr('d', path.toString())
        .attr('fill', 'none')
        .attr('stroke', 'rgba(149,213,178,0.5)')
        .attr('stroke-width', 1.5);

      // 选项标签
      g.append('text')
        .attr('x', cx)
        .attr('y', lineY1 + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#6e6e73')
        .attr('font-family', 'var(--font-heading)')
        .text(opts[i].label);
    });

    // 左选项框
    const optBoxes = [
      { x: leftX, label: opts[0].label, node: opts[0], idx: 0 },
      { x: rightX, label: opts[1].label, node: opts[1], idx: 1 },
    ];

    optBoxes.forEach(opt => {
      const isResult = opt.node.result;
      const fillColor = isResult ? (opt.node.color || '#95D5B2') + '22' : 'rgba(30, 30, 40, 0.88)';
      const strokeColor = isResult ? (opt.node.color || '#95D5B2') : '#95D5B2';

      const grp = g.append('g')
        .attr('cursor', 'pointer')
        .attr('tabindex', 0)
        .attr('role', 'button')
        .attr('aria-label', opt.node.result ? ('选择：' + opt.node.format) : ('选择：' + opt.node.question));

      grp.append('rect')
        .attr('x', opt.x)
        .attr('y', lineY2)
        .attr('width', optW)
        .attr('height', optH)
        .attr('rx', 10)
        .attr('fill', fillColor)
        .attr('stroke', strokeColor)
        .attr('stroke-width', 1.5)
        .attr('class', 'p01m3-tree-opt-rect');

      const labelText = isResult ? opt.node.format : opt.node.question;
      const shortText = labelText.length > 28 ? labelText.slice(0, 26) + '…' : labelText;

      grp.append('text')
        .attr('x', opt.x + optW / 2)
        .attr('y', lineY2 + 26)
        .attr('text-anchor', 'middle')
        .attr('font-size', isMobile ? '11px' : '12.5px')
        .attr('font-weight', isResult ? '700' : '500')
        .attr('fill', isResult ? (opt.node.color || '#3a9a6a') : '#f5f5f7')
        .attr('font-family', 'var(--font-heading)')
        .text(shortText);

      if (!isResult && opt.node.question && opt.node.question.length > 0) {
        grp.append('text')
          .attr('x', opt.x + optW / 2)
          .attr('y', lineY2 + 43)
          .attr('text-anchor', 'middle')
          .attr('font-size', '10px')
          .attr('fill', 'rgba(149,213,178,0.7)')
          .attr('font-family', 'var(--font-heading)')
          .text('→ 点击继续');
      }

      // hover 效果
      grp.on('mouseenter', function() {
        d3.select(this).select('.p01m3-tree-opt-rect')
          .attr('stroke', opt.node.result ? (opt.node.color || '#95D5B2') : '#95D5B2')
          .attr('stroke-width', 2.5)
          .attr('fill', opt.node.result ? (opt.node.color || '#95D5B2') + '33' : '#eef8f3');
      }).on('mouseleave', function() {
        d3.select(this).select('.p01m3-tree-opt-rect')
          .attr('stroke', strokeColor)
          .attr('stroke-width', 1.5)
          .attr('fill', fillColor);
      });

      const clickFn = () => {
        selectedPath.push({ node: currentNode, choiceIdx: opt.idx });
        currentNode = opt.node;
        render();
      };
      grp.on('click', clickFn);
      grp.on('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); clickFn(); } });
    });

    // 如果有上一步
    if (selectedPath.length > 0) {
      const backG = g.append('g').attr('cursor', 'pointer');
      backG.append('rect')
        .attr('x', questionX)
        .attr('y', lineY2 + 70)
        .attr('width', 100)
        .attr('height', 44)
        .attr('rx', 22)
        .attr('fill', 'transparent')
        .attr('stroke', 'rgba(149,213,178,0.4)')
        .attr('stroke-width', 1);
      backG.append('text')
        .attr('x', questionX + 50)
        .attr('y', lineY2 + 97)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('fill', '#95D5B2')
        .attr('font-family', 'var(--font-heading)')
        .text('← 返回');
      backG.on('click', () => {
        const prev = selectedPath.pop();
        currentNode = prev.node;
        render();
      });
    }

    // 调整 SVG 高度
    const newH = lineY2 + optH + 120;
    svgSel.attr('height', newH + 20);
  }

  render();
  _treeState = { render, reset: () => { currentNode = TREE_DATA; selectedPath = []; render(); } };

  // 重置按钮
  const resetBtn = document.getElementById('p01m3-tree-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', _treeState.reset);
  }

  // 窗口 resize 时重绘（节流）
  let resizeTicking = false;
  function onResize() {
    if (resizeTicking) return;
    resizeTicking = true;
    requestAnimationFrame(() => {
      render();
      resizeTicking = false;
    });
  }
  window.addEventListener('resize', onResize, { passive: true });
  _scrollHandlers.push({ el: window, type: 'resize', fn: onResize, opts: { passive: true } });
}

// ── 文件大小折线图（D3）──────────────────────────────────────────────────────

function initFileChart() {
  const svgEl = document.getElementById('p01m3-file-chart');
  if (!svgEl || !d3) return;

  // 颜色常量（对应 CSS 变量，避免硬编码）
  const BG_DARK_ELEVATED = '#2d2d2f';  // var(--bg-dark-elevated)
  const BORDER_DARK = '#424245';       // var(--border-dark)

  const tooltip = document.getElementById('p01m3-tooltip');
  const slider = document.getElementById('p01m3-complexity-slider');
  const valDisplay = document.getElementById('p01m3-complexity-val');

  const margin = { top: 24, right: 100, bottom: 48, left: 70 };

  // 保存最新一次 drawChart 产生的 updateVLine，供 slider handler 调用
  let _currentUpdateVLine = null;

  function drawChart() {
    const W = svgEl.parentElement ? svgEl.parentElement.clientWidth : 800;
    const H = 320;
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;

    d3.select('#p01m3-file-chart').selectAll('*').remove();

    const svg = d3.select('#p01m3-file-chart')
      .attr('width', W)
      .attr('height', H);

    // 背景
    svg.append('rect')
      .attr('width', W)
      .attr('height', H)
      .attr('rx', 16)
      .attr('fill', BG_DARK_ELEVATED);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear().domain([1, 10]).range([0, width]);
    const yMax = 3200;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

    // 网格线
    g.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(yScale).ticks(5).tickSize(-width).tickFormat(''))
      .selectAll('line')
      .attr('stroke', BORDER_DARK)
      .attr('stroke-dasharray', '3,3');
    g.select('.grid .domain').remove();

    // X 轴
    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(9).tickFormat(d => d))
      .selectAll('text')
      .attr('fill', '#6e6e73')
      .attr('font-size', '11px');
    g.select('.domain').attr('stroke', BORDER_DARK);

    // Y 轴
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => d >= 1000 ? (d / 1000) + 'MB' : d + 'KB'))
      .selectAll('text')
      .attr('fill', '#6e6e73')
      .attr('font-size', '11px');

    // 轴标签
    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6e6e73')
      .attr('font-size', '12px')
      .attr('font-family', 'var(--font-heading)')
      .text('图表内容复杂度');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -55)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6e6e73')
      .attr('font-size', '12px')
      .attr('font-family', 'var(--font-heading)')
      .text('文件大小');

    // 折线
    const lineGen = d3.line()
      .x((_, i) => xScale(i + 1))
      .y(d => yScale(d))
      .curve(d3.curveCatmullRom.alpha(0.5));

    const formats = ['tiff', 'png', 'pdf', 'svg'];
    formats.forEach(fmt => {
      const data = FILE_DATA[fmt];

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', LINE_COLORS[fmt])
        .attr('stroke-width', 2)
        .attr('d', lineGen);

      // 折线标签（末尾）
      const lastVal = data[data.length - 1];
      g.append('text')
        .attr('x', width + 6)
        .attr('y', yScale(lastVal) + 4)
        .attr('fill', LINE_COLORS[fmt])
        .attr('font-size', '10px')
        .attr('font-family', 'var(--font-heading)')
        .attr('font-weight', '600')
        .text(LINE_LABELS[fmt]);
    });

    // 交互点（透明覆盖区域）
    const points = formats.flatMap(fmt =>
      FILE_DATA[fmt].map((val, i) => ({ fmt, x: i + 1, y: val }))
    );

    // 竖线（复杂度指示）
    const complexityVal = parseInt(slider ? slider.value : 5);
    const vLine = g.append('line')
      .attr('x1', xScale(complexityVal))
      .attr('x2', xScale(complexityVal))
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#fff')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4,3')
      .attr('opacity', 0.4);

    // 在竖线位置显示各格式数值
    const valLabels = g.append('g').attr('class', 'val-labels');

    function updateVLine(val) {
      vLine.attr('x1', xScale(val)).attr('x2', xScale(val));
      valLabels.selectAll('*').remove();
      formats.forEach((fmt, fi) => {
        const yVal = FILE_DATA[fmt][val - 1];
        const displayVal = yVal >= 1000 ? (yVal / 1000).toFixed(1) + ' MB' : yVal + ' KB';
        valLabels.append('circle')
          .attr('cx', xScale(val))
          .attr('cy', yScale(yVal))
          .attr('r', 4)
          .attr('fill', LINE_COLORS[fmt]);
      });
    }
    updateVLine(complexityVal);

    // 鼠标悬停 tooltip
    const overlay = g.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .style('cursor', 'crosshair');

    overlay.on('mousemove', function(event) {
      const [mx] = d3.pointer(event, this);
      const xVal = Math.round(xScale.invert(mx));
      if (xVal < 1 || xVal > 10) return;
      const lines = formats.map(fmt => {
        const v = FILE_DATA[fmt][xVal - 1];
        return `${LINE_LABELS[fmt]}: ${v >= 1000 ? (v / 1000).toFixed(1) + ' MB' : v + ' KB'}`;
      }).join('\n');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.left = (event.clientX + 14) + 'px';
        tooltip.style.top = (event.clientY - 20) + 'px';
        tooltip.style.whiteSpace = 'pre-wrap';
        tooltip.textContent = `复杂度 ${xVal}：\n${lines}`;
      }
    }).on('mouseleave', function() {
      if (tooltip) tooltip.style.opacity = '0';
    });

    // 触摸 tooltip
    overlay.on('touchmove', function(event) {
      event.preventDefault();
      const touch = event.touches[0];
      const rect = svgEl.getBoundingClientRect();
      const mx = touch.clientX - rect.left - margin.left;
      const xVal = Math.round(xScale.invert(mx));
      if (xVal < 1 || xVal > 10) return;
      const lines = formats.map(fmt => {
        const v = FILE_DATA[fmt][xVal - 1];
        return `${LINE_LABELS[fmt]}: ${v >= 1000 ? (v / 1000).toFixed(1) + ' MB' : v + ' KB'}`;
      }).join('\n');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.left = (touch.clientX + 14) + 'px';
        tooltip.style.top = (touch.clientY - 20) + 'px';
        tooltip.style.whiteSpace = 'pre-wrap';
        tooltip.textContent = `复杂度 ${xVal}：\n${lines}`;
      }
    }, { passive: false });

    // 把最新的 updateVLine 暴露给 slider handler
    _currentUpdateVLine = updateVLine;
  }

  drawChart();

  // slider 控制竖线（一次性注册，避免 resize 触发 drawChart 时重复注册）
  if (slider) {
    const sliderHandler = () => {
      const v = parseInt(slider.value);
      if (valDisplay) valDisplay.textContent = v;
      if (_currentUpdateVLine) _currentUpdateVLine(v);
    };
    slider.addEventListener('input', sliderHandler, { passive: true });
    _scrollHandlers.push({ el: slider, type: 'input', fn: sliderHandler, opts: { passive: true } });
  }

  // resize 重绘
  let chartResizeTicking = false;
  function onChartResize() {
    if (chartResizeTicking) return;
    chartResizeTicking = true;
    requestAnimationFrame(() => {
      drawChart();
      chartResizeTicking = false;
    });
  }
  window.addEventListener('resize', onChartResize, { passive: true });
  _scrollHandlers.push({ el: window, type: 'resize', fn: onChartResize, opts: { passive: true } });
}

// ── Footer 导航 ───────────────────────────────────────────────────────────────

function initFooterNav() {
  const prevBtn = document.getElementById('p01m3-nav-prev');
  const homeBtn = document.getElementById('p01m3-nav-home');
  const nextBtn = document.getElementById('p01m3-nav-next');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo('m2-p6'));
  if (homeBtn) homeBtn.addEventListener('click', () => navigateTo('m3-p1'));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo('m3-p2'));
}

// ─── destroy ─────────────────────────────────────────────────────────────────

export function destroy() {
  killAll();
  _scrollHandlers.forEach(({ el, type, fn, opts }) => {
    el.removeEventListener(type, fn, opts);
  });
  _scrollHandlers = [];
  _observers.forEach(o => o.disconnect());
  _observers = [];
  _treeState = null;
  // 隐藏 tooltip
  const tooltip = document.getElementById('p01m3-tooltip');
  if (tooltip && tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
}
