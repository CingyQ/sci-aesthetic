import{k as H,g as y,f,s as R}from"./ScrollAnimations-B5Kyk-Xq.js";import{e as N}from"./color-math-Dw8FC2aa.js";import{n as E}from"./index-BI1ljIWX.js";import{s as W,l as q}from"./transform-CrlstJ90.js";import{b as j}from"./band-CtrpxvT2.js";import{a as G,b as O}from"./axis-FVV8vvN_.js";const B={titleSize:16,subtitleSize:12,axisLabelSize:11,tickSize:10,legendSize:10,annotationSize:9,titleWeight:700,lineHeight:1.3},P=[{role:"图表主标题",ptMin:12,ptRec:14,ptMax:18,css:"font-weight: 700"},{role:"图表副标题",ptMin:10,ptRec:12,ptMax:14,css:"font-weight: 400; opacity: 0.7"},{role:"坐标轴标题",ptMin:10,ptRec:11,ptMax:13,css:"font-weight: 600"},{role:"刻度标签",ptMin:8,ptRec:10,ptMax:12,css:"font-weight: 400"},{role:"图例文字",ptMin:8,ptRec:10,ptMax:12,css:"font-weight: 400"},{role:"注释/标注",ptMin:7,ptRec:9,ptMax:11,css:"font-weight: 400; font-style: italic"}],Y=[{journal:"Nature",font:"Helvetica / Arial",sizeRange:"5–7 pt（印刷）",note:"标题不超过 8pt"},{journal:"Science",font:"Helvetica",sizeRange:"6–8 pt",note:"不接受衬线字体用于图表"},{journal:"Cell",font:"Arial / Helvetica",sizeRange:"6–8 pt",note:"推荐无衬线"},{journal:"PNAS",font:"Arial",sizeRange:"6–8 pt",note:"图例 ≥6pt"},{journal:"PLoS ONE",font:"Arial",sizeRange:"8–12 pt",note:"所有文字 ≥8pt"},{journal:"IEEE",font:"Times New Roman / Arial",sizeRange:"8–10 pt",note:"坐标轴标签 ≥8pt"}],D=[{name:"Arial",family:"Arial, sans-serif",type:"无衬线",use:"最安全的图表字体，几乎所有期刊接受"},{name:"Helvetica",family:"Helvetica, Arial, sans-serif",type:"无衬线",use:"Nature / Science 推荐，最常用的科研字体"},{name:"Times New Roman",family:"Times New Roman, serif",type:"衬线",use:"正文首选，图表中较少使用"},{name:"Consolas",family:"Consolas, JetBrains Mono, monospace",type:"等宽",use:"代码、数值表格、基因序列"}];let a={fgColor:"#1d1d1f",bgColor:"#ffffff",previewFontSize:16,chart:{...B}};function at(){return`
<div class="page-scroll">

<style>
/* ══════════════════════════════════
   p04 page-scoped styles
   ══════════════════════════════════ */

/* ── Hero ── */
@keyframes p4-glow-a {
  0% { transform: translate(0,0); opacity: 1; }
  25% { transform: translate(3%,-2%); opacity: 0.7; }
  50% { transform: translate(0,-4%); opacity: 0.5; }
  75% { transform: translate(-3%,-2%); opacity: 0.8; }
  100% { transform: translate(0,0); opacity: 1; }
}
@keyframes p4-glow-b {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.4; }
  50% { transform: translate(-4%,5%) scale(1.1); opacity: 0.8; }
}
.p4-hero {
  min-height: 100vh; min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark); color: var(--text-on-dark);
  flex-direction: column; gap: var(--space-md);
  position: relative; overflow: hidden;
}
.p4-hero::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 55% 45% at 50% 38%, rgba(240,178,122,0.09) 0%, transparent 65%);
  pointer-events: none;
  animation: p4-glow-a 14s ease-in-out infinite;
}
.p4-hero::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse 40% 35% at 25% 65%, rgba(126,200,227,0.07) 0%, transparent 60%);
  pointer-events: none;
  animation: p4-glow-b 9s ease-in-out infinite;
}
.p4-hero-tagline {
  font-family: var(--font-body); font-size: var(--text-body);
  color: var(--text-on-dark-2); max-width: 540px;
  line-height: 1.8; text-align: center;
}
.p4-eyebrow {
  /* 使用全局 .hero-eyebrow 基础样式 */
}
.p4-hero-title {
  font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700; letter-spacing: -0.02em; line-height: 1.1;
}
.p4-hero-sub {
  font-family: var(--font-heading); font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 300; color: var(--text-on-dark); opacity: 0.5; max-width: 600px;
  line-height: 1.4; text-align: center;
}
.p4-scroll-hint {
  font-size: var(--text-caption); color: var(--text-on-dark-3);
  animation: p4-float 2s ease-in-out infinite;
  margin-top: var(--space-sm);
}
@keyframes p4-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

/* ── 通用 section ── */
.p4-section-header { text-align: center; margin-bottom: var(--space-xl); }
.p4-section-title {
  font-family: var(--font-display); font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 700; letter-spacing: -0.02em;
}
.p4-section-desc {
  font-size: 1.05rem; line-height: 1.7; max-width: 680px; margin: var(--space-sm) auto 0;
  color: var(--text-on-light-2);
}
.p4-section-desc--dark { color: var(--text-on-dark-2); }

/* ── Section: WCAG 对比度 ── */
.p4-contrast-section {
  background: var(--bg-light-alt); color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}
.p4-contrast-card {
  max-width: 720px; margin: 0 auto;
  background: var(--bg-light-elevated); border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  padding: var(--space-lg); box-shadow: 0 4px 24px rgba(0,0,0,0.06);
}
.p4-contrast-pickers {
  display: flex; gap: var(--space-lg); margin-bottom: var(--space-md);
}
.p4-picker-col { flex: 1; }
.p4-picker-label {
  display: block; font-size: var(--text-small); color: var(--text-on-light-2);
  margin-bottom: 8px; font-weight: 500;
}
.p4-picker-row { display: flex; align-items: center; gap: 10px; }
.p4-color-swatch-btn {
  width: 44px; height: 44px; border-radius: var(--radius-sm);
  border: 2px solid var(--border-light); cursor: pointer;
  position: relative; overflow: hidden; flex-shrink: 0;
}
.p4-color-swatch-btn input[type="color"] {
  position: absolute; inset: -8px; width: calc(100% + 16px); height: calc(100% + 16px);
  cursor: pointer; border: none; padding: 0;
}
.p4-hex-input {
  width: 100px; font-family: var(--font-code); font-size: 0.9rem;
  padding: 8px 12px; border: 1px solid var(--border-light);
  border-radius: var(--radius-sm); background: var(--bg-light);
  color: var(--text-on-light); text-transform: uppercase;
}
.p4-preview-box {
  border-radius: var(--radius-md); padding: var(--space-md);
  margin-bottom: var(--space-md); border: 1px solid var(--border-light);
  transition: all 0.2s;
}
.p4-preview-large { font-size: 1.5rem; font-weight: 700; margin-bottom: 8px; }
.p4-preview-normal { font-size: 1rem; line-height: 1.6; margin-bottom: 4px; }
.p4-preview-small { font-size: 0.75rem; color: inherit; opacity: 0.8; }
.p4-font-size-row {
  display: flex; align-items: center; gap: 12px; margin-top: var(--space-sm);
  padding-top: var(--space-sm); border-top: 1px solid var(--border-light);
}
.p4-font-size-label { font-size: var(--text-small); color: var(--text-on-light-2); white-space: nowrap; }
.p4-font-size-stepper {
  display: flex; align-items: center; gap: 0;
  background: var(--bg-light-alt); border-radius: var(--radius-full);
  border: 1px solid var(--border-light); overflow: hidden;
}
.p4-font-size-btn {
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  background: none; border: none; cursor: pointer;
  font-size: 1.1rem; color: var(--text-on-light-2);
  transition: all 0.15s; -webkit-tap-highlight-color: transparent;
}
.p4-font-size-btn:hover { background: var(--border-light); color: var(--text-on-light); }
.p4-font-size-btn:active { background: var(--accent); color: #fff; }
.p4-font-size-val {
  min-width: 44px; text-align: center; font-family: var(--font-code);
  font-size: 0.85rem; color: var(--text-on-light); font-weight: 600;
  border-left: 1px solid var(--border-light);
  border-right: 1px solid var(--border-light);
  padding: 0 4px;
}
.p4-contrast-result { text-align: center; }
.p4-contrast-ratio {
  font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700; color: var(--text-on-light); line-height: 1;
}
.p4-ratio-unit { font-size: 0.5em; color: var(--text-on-light-2); }
.p4-badges { display: flex; gap: 8px; justify-content: center; margin: var(--space-sm) 0; flex-wrap: wrap; }
.p4-badge {
  padding: 4px 14px; border-radius: var(--radius-full);
  font-size: var(--text-small); font-weight: 600; letter-spacing: 0.02em;
}
.p4-badge--pass { background: rgba(52,199,89,0.12); color: var(--color-success); }
.p4-badge--fail { background: rgba(255,59,48,0.12); color: var(--color-error); }
.p4-contrast-bar-wrap { margin-top: var(--space-sm); }
.p4-contrast-bar-track {
  height: 8px; background: var(--bg-light-alt); border-radius: 4px;
  position: relative; overflow: visible;
}
.p4-contrast-bar-fill {
  height: 100%; border-radius: 4px;
  transition: width 0.4s ease, background 0.3s;
}
.p4-bar-tick {
  position: absolute; top: -4px; width: 1px; height: 16px;
  background: var(--text-on-light-3); opacity: 0.4;
}
.p4-bar-labels {
  display: flex; justify-content: space-between; margin-top: 4px;
  font-size: 0.65rem; color: var(--text-on-light-3); font-family: var(--font-code);
}

/* ── Section: 图表排版规范 ── */
.p4-typo-section {
  background: var(--bg-dark); color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}
.p4-typo-layout {
  display: flex; gap: var(--space-lg); max-width: 1100px; margin: 0 auto;
  align-items: flex-start;
}
.p4-typo-controls {
  width: 300px; flex-shrink: 0;
  background: var(--bg-dark-elevated); border-radius: var(--radius-lg);
  border: 1px solid var(--border-dark); padding: var(--space-md);
}
.p4-typo-ctrl-title {
  font-size: var(--text-small); font-weight: 600; color: var(--accent);
  margin-bottom: var(--space-sm); text-transform: uppercase;
  letter-spacing: 0.05em;
}
.p4-ctrl-group {
  margin-bottom: var(--space-sm);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--border-dark);
}
.p4-ctrl-group:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.p4-ctrl-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px; margin-bottom: 6px;
}
.p4-ctrl-label {
  font-size: 0.8rem; color: var(--text-on-dark-2); white-space: nowrap;
}
.p4-ctrl-slider-wrap { display: flex; align-items: center; gap: 8px; flex: 1; max-width: 160px; }
.p4-ctrl-slider {
  flex: 1; -webkit-appearance: none; appearance: none;
  height: 3px; border-radius: 2px; background: var(--border-dark);
  outline: none; cursor: pointer;
}
.p4-ctrl-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 14px; height: 14px;
  border-radius: 50%; background: var(--accent); cursor: pointer;
}
.p4-ctrl-slider::-moz-range-thumb {
  width: 14px; height: 14px;
  border-radius: 50%; background: var(--accent); cursor: pointer; border: none;
}
.p4-ctrl-val {
  font-family: var(--font-code); font-size: 0.75rem;
  color: var(--accent); min-width: 28px; text-align: right;
}
.p4-ctrl-reset {
  width: 100%; margin-top: var(--space-sm);
  padding: 8px; background: transparent;
  border: 1px solid var(--border-dark); border-radius: var(--radius-sm);
  color: var(--text-on-dark-2); font-size: 0.8rem;
  cursor: pointer; transition: all 0.2s;
}
.p4-ctrl-reset:hover { border-color: var(--accent); color: var(--accent); }

.p4-typo-preview {
  flex: 1; min-width: 0;
  background: #fff; border-radius: var(--radius-lg);
  overflow: hidden; box-shadow: 0 8px 40px rgba(0,0,0,0.3);
}
.p4-chart-canvas {
  width: 100%; aspect-ratio: 4/3; position: relative;
}
.p4-chart-canvas svg { width: 100%; height: 100%; }

/* ── Section: 字体与可读性 ── */
.p4-font-section {
  background: var(--bg-light); color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}
.p4-font-compare {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md); max-width: 900px; margin: 0 auto var(--space-xl);
}
.p4-font-card {
  background: var(--bg-light-elevated); border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: var(--space-md);
  transition: border-color 0.2s;
}
.p4-font-card:hover { border-color: var(--accent); }
.p4-font-card-name {
  font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;
}
.p4-font-card-type {
  font-size: var(--text-caption); color: var(--text-on-light-3);
  margin-bottom: var(--space-sm); font-weight: 500;
}
.p4-font-card-sample {
  font-size: 1.3rem; line-height: 1.5; margin-bottom: var(--space-sm);
  color: var(--text-on-light);
}
.p4-font-card-use {
  font-size: var(--text-small); color: var(--text-on-light-2); line-height: 1.5;
}

/* 字号阶梯表 */
.p4-scale-table-wrap {
  max-width: 800px; margin: 0 auto var(--space-xl); overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.p4-scale-table {
  width: 100%; border-collapse: collapse;
  font-size: 0.9rem;
}
.p4-scale-table th {
  text-align: left; padding: 10px 14px;
  font-size: var(--text-small); font-weight: 600;
  color: var(--text-on-light-2); border-bottom: 2px solid var(--border-light);
  white-space: nowrap;
}
.p4-scale-table td {
  padding: 10px 14px; border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}
.p4-scale-role { font-weight: 600; color: var(--text-on-light); }
.p4-scale-rec {
  font-family: var(--font-code); font-weight: 700; color: var(--accent-hover);
}
.p4-scale-range {
  font-family: var(--font-code); font-size: 0.8rem; color: var(--text-on-light-3);
}
.p4-scale-preview { display: inline-block; }

/* 行高对比 */
.p4-lh-compare {
  display: flex; gap: var(--space-md); max-width: 900px;
  margin: 0 auto var(--space-xl);
}
.p4-lh-card {
  flex: 1; background: var(--bg-light-elevated);
  border: 1px solid var(--border-light); border-radius: var(--radius-md);
  padding: var(--space-md);
}
.p4-lh-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: var(--space-sm);
}
.p4-lh-label { font-size: var(--text-small); font-weight: 600; color: var(--text-on-light); }
.p4-lh-tag {
  font-size: 0.7rem; padding: 2px 10px; border-radius: var(--radius-full);
  font-weight: 600;
}
.p4-lh-tag--bad { background: rgba(255,59,48,0.1); color: var(--color-error); }
.p4-lh-tag--good { background: rgba(52,199,89,0.1); color: var(--color-success); }
.p4-lh-text {
  font-size: 0.9rem; color: var(--text-on-light-2);
}

/* 期刊字体表 */
.p4-journal-table-wrap {
  max-width: 800px; margin: 0 auto; overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.p4-journal-table {
  width: 100%; border-collapse: collapse; font-size: 0.88rem;
}
.p4-journal-table th {
  text-align: left; padding: 10px 14px;
  font-size: var(--text-small); font-weight: 600;
  color: var(--text-on-light-2); border-bottom: 2px solid var(--border-light);
  white-space: nowrap;
}
.p4-journal-table td {
  padding: 10px 14px; border-bottom: 1px solid var(--border-light);
}
.p4-journal-name { font-weight: 700; color: var(--accent-hover); }
.p4-journal-font { font-family: var(--font-code); font-size: 0.82rem; }

/* ── Section: 设计检查清单 ── */
.p4-check-section {
  background: var(--bg-dark); color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}
.p4-check-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md); max-width: 900px; margin: 0 auto;
}
.p4-check-card {
  background: var(--bg-dark-elevated); border: 1px solid var(--border-dark);
  border-radius: var(--radius-md); padding: var(--space-md);
  transition: border-color 0.3s, transform 0.3s;
}
.p4-check-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.p4-check-icon {
  font-size: 1.5rem; margin-bottom: var(--space-sm);
  line-height: 1;
}
.p4-check-title {
  font-size: 1rem; font-weight: 700; margin-bottom: 6px;
  color: var(--text-on-dark);
}
.p4-check-desc {
  font-size: var(--text-small); color: var(--text-on-dark-2);
  line-height: 1.6;
}
.p4-check-example {
  margin-top: var(--space-sm); padding-top: var(--space-sm);
  border-top: 1px solid var(--border-dark);
  display: flex; gap: var(--space-sm);
}
.p4-check-ex-col { flex: 1; }
.p4-check-ex-tag {
  font-size: 0.65rem; font-family: var(--font-code);
  font-weight: 600; letter-spacing: 0.05em; margin-bottom: 4px;
}
.p4-check-ex-tag.bad { color: var(--color-error); }
.p4-check-ex-tag.good { color: #4CAF50; }
.p4-check-ex-content {
  font-size: 0.8rem; color: var(--text-on-dark-2); line-height: 1.5;
}

/* footer nav uses global btn-primary / btn-ghost */
/* footer uses global .page-footer-cta */

/* ── Responsive ── */
@media (max-width: 900px) {
  .p4-typo-layout { flex-direction: column; }
  .p4-typo-controls { width: 100%; }
}
@media (max-width: 768px) {
  .p4-contrast-section, .p4-typo-section,
  .p4-font-section, .p4-check-section {
    padding: var(--space-xl) var(--space-sm);
  }
  .p4-hero { padding: 80px var(--space-sm) 48px; }
  .p4-contrast-pickers { flex-direction: column; gap: var(--space-sm); }
  .p4-font-compare { grid-template-columns: 1fr; }
  .p4-check-grid { grid-template-columns: 1fr; }
  .p4-lh-compare { flex-direction: column; }
  /* footer nav uses global .page-footer-nav */
  .p4-ctrl-slider::-webkit-slider-thumb { width: 20px; height: 20px; }
  .p4-ctrl-slider::-moz-range-thumb { width: 20px; height: 20px; }
  .p4-ctrl-slider { min-height: 32px; }
}
@media (max-width: 480px) {
  .p4-scale-table { font-size: 0.8rem; }
  .p4-scale-table th, .p4-scale-table td { padding: 8px 10px; }
}
</style>

<!-- ════════════════════════════════════════════
     Section 1: Hero
     ════════════════════════════════════════════ -->
<section class="p4-hero section-dark section-hero-full">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p4-eyebrow p4-anim-0">Module 01 / Page 04</p>
    <h1 class="page-hero-title p4-hero-title p4-anim-1" style="color:var(--text-on-dark);">色彩与阅读无障碍</h1>
    <p class="page-hero-sub p4-hero-sub p4-anim-2">Color Accessibility</p>
    <p class="p4-hero-tagline p4-anim-3">
      好的科研图表不只是"好看"——它需要被每一位读者清晰阅读。<br>
      从对比度到字号，从配色到排版，让你的研究触达所有人。
    </p>
    <nav class="hero-quicknav p4-anim-4" id="p4-hero-nav">
      <button class="hero-quicknav__item" data-target=".p4-contrast-section">WCAG 对比度</button>
      <button class="hero-quicknav__item" data-target=".p4-typo-section">图表排版规范</button>
      <button class="hero-quicknav__item" data-target=".p4-font-section">字体与可读性</button>
      <button class="hero-quicknav__item" data-target=".p4-check-section">设计检查清单</button>
    </nav>
    <div class="p4-scroll-hint">↓ 向下探索</div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 2: WCAG 对比度检测器
     ════════════════════════════════════════════ -->
<section class="p4-contrast-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title">WCAG 对比度检测</h2>
    <p class="p4-section-desc">
      WCAG 2.1 标准要求正文至少 4.5:1 的对比度比值。<br>
      选择前景和背景颜色，实时查看是否达标。
    </p>
  </div>

  <div class="p4-contrast-card" id="p4-contrast-card">
    <div class="p4-contrast-pickers">
      <div class="p4-picker-col">
        <span class="p4-picker-label">文字颜色</span>
        <div class="p4-picker-row">
          <div class="p4-color-swatch-btn" id="p4-fg-swatch" style="background:#1d1d1f;">
            <input type="color" id="p4-fg-picker" value="#1d1d1f">
          </div>
          <input type="text" class="p4-hex-input" id="p4-fg-hex" value="#1D1D1F" maxlength="7">
        </div>
      </div>
      <div class="p4-picker-col">
        <span class="p4-picker-label">背景颜色</span>
        <div class="p4-picker-row">
          <div class="p4-color-swatch-btn" id="p4-bg-swatch" style="background:#ffffff;">
            <input type="color" id="p4-bg-picker" value="#ffffff">
          </div>
          <input type="text" class="p4-hex-input" id="p4-bg-hex" value="#FFFFFF" maxlength="7">
        </div>
      </div>
    </div>

    <div class="p4-preview-box" id="p4-preview-box" style="background:#ffffff;color:#1d1d1f;">
      <div class="p4-preview-large">标题文字 Heading</div>
      <div class="p4-preview-normal" id="p4-preview-normal">正文示例 — The quick brown fox jumps over the lazy dog.</div>
      <div class="p4-preview-small">注释/图例文字 Caption text, axis labels, footnotes.</div>
    </div>

    <div class="p4-font-size-row">
      <span class="p4-font-size-label">预览字号</span>
      <div class="p4-font-size-stepper">
        <button class="p4-font-size-btn" id="p4-font-dec" type="button">−</button>
        <span class="p4-font-size-val" id="p4-font-size-val">16px</span>
        <button class="p4-font-size-btn" id="p4-font-inc" type="button">+</button>
      </div>
    </div>

    <div class="p4-contrast-result">
      <div class="p4-contrast-ratio">
        <span id="p4-ratio-num">21.00</span><span class="p4-ratio-unit"> : 1</span>
      </div>
      <div class="p4-badges" id="p4-badges">
        <span class="p4-badge p4-badge--pass" id="p4-badge-aa">✓ AA 正文</span>
        <span class="p4-badge p4-badge--pass" id="p4-badge-aa-large">✓ AA 大字</span>
        <span class="p4-badge p4-badge--pass" id="p4-badge-aaa">✓ AAA</span>
      </div>
      <div class="p4-contrast-bar-wrap">
        <div class="p4-contrast-bar-track">
          <div class="p4-contrast-bar-fill" id="p4-bar-fill" style="width:100%;background:var(--color-success);"></div>
          <div class="p4-bar-tick" style="left:${(3/21*100).toFixed(1)}%;"></div>
          <div class="p4-bar-tick" style="left:${(4.5/21*100).toFixed(1)}%;"></div>
          <div class="p4-bar-tick" style="left:${(7/21*100).toFixed(1)}%;"></div>
        </div>
        <div class="p4-bar-labels">
          <span>1:1</span><span>3:1 AA 大字</span><span>4.5:1 AA</span><span>7:1 AAA</span><span>21:1</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 3: 图表排版规范（交互式）
     ════════════════════════════════════════════ -->
<section class="p4-typo-section" id="p4-typo-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title" style="color:var(--text-on-dark);">图表排版规范</h2>
    <p class="p4-section-desc p4-section-desc--dark">
      拖动控制面板中的滑块，实时调整图表各元素的字号与间距，<br>
      直观感受排版参数对可读性的影响。
    </p>
  </div>

  <div class="p4-typo-layout">
    <div class="p4-typo-controls" id="p4-typo-controls">
      <div class="p4-typo-ctrl-title">排版参数</div>

      <div class="p4-ctrl-group">
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">主标题字号</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-title" min="10" max="24" value="16">
            <span class="p4-ctrl-val" id="p4-v-title">16px</span>
          </div>
        </div>
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">副标题字号</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-subtitle" min="8" max="18" value="12">
            <span class="p4-ctrl-val" id="p4-v-subtitle">12px</span>
          </div>
        </div>
      </div>

      <div class="p4-ctrl-group">
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">坐标轴标题</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-axis" min="8" max="16" value="11">
            <span class="p4-ctrl-val" id="p4-v-axis">11px</span>
          </div>
        </div>
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">刻度标签</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-tick" min="6" max="14" value="10">
            <span class="p4-ctrl-val" id="p4-v-tick">10px</span>
          </div>
        </div>
      </div>

      <div class="p4-ctrl-group">
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">图例字号</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-legend" min="6" max="14" value="10">
            <span class="p4-ctrl-val" id="p4-v-legend">10px</span>
          </div>
        </div>
        <div class="p4-ctrl-row">
          <span class="p4-ctrl-label">注释字号</span>
          <div class="p4-ctrl-slider-wrap">
            <input type="range" class="p4-ctrl-slider" id="p4-c-annotation" min="6" max="14" value="9">
            <span class="p4-ctrl-val" id="p4-v-annotation">9px</span>
          </div>
        </div>
      </div>

      <button class="p4-ctrl-reset" id="p4-typo-reset" type="button">↺ 恢复默认值</button>
    </div>

    <div class="p4-typo-preview" id="p4-typo-preview">
      <div class="p4-chart-canvas" id="p4-chart-canvas"></div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 4: 字体与可读性
     ════════════════════════════════════════════ -->
<section class="p4-font-section" id="p4-font-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title">字体与可读性</h2>
    <p class="p4-section-desc">
      科研图表中的字体选择直接影响阅读体验和投稿要求。<br>
      了解常用字体类型、推荐字号阶梯以及主流期刊的规范。
    </p>
  </div>

  <!-- 字体对比卡片 -->
  <div class="p4-font-compare" id="p4-font-compare">
    ${D.map(t=>`
    <div class="p4-font-card">
      <div class="p4-font-card-name" style="font-family:${t.family};">${t.name}</div>
      <div class="p4-font-card-type">${t.type}</div>
      <div class="p4-font-card-sample" style="font-family:${t.family};">
        AaBbCcDd 0123456789<br>
        科研数据 可视化 μ σ² Δ
      </div>
      <div class="p4-font-card-use">${t.use}</div>
    </div>`).join("")}
  </div>

  <!-- 字号阶梯表 -->
  <h3 style="text-align:center;font-size:1.3rem;margin-bottom:var(--space-md);font-weight:700;">字号阶梯推荐</h3>
  <div class="p4-scale-table-wrap">
    <table class="p4-scale-table">
      <thead>
        <tr>
          <th>元素</th>
          <th>最小 (pt)</th>
          <th>推荐 (pt)</th>
          <th>最大 (pt)</th>
          <th>预览</th>
        </tr>
      </thead>
      <tbody>
        ${P.map(t=>`
        <tr>
          <td class="p4-scale-role">${t.role}</td>
          <td class="p4-scale-range">${t.ptMin}</td>
          <td class="p4-scale-rec">${t.ptRec}</td>
          <td class="p4-scale-range">${t.ptMax}</td>
          <td><span class="p4-scale-preview" style="font-size:${t.ptRec*1.333}px;${t.css};">示例 Sample</span></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>

  <!-- 行高对比 -->
  <h3 style="text-align:center;font-size:1.3rem;margin:var(--space-xl) 0 var(--space-md);font-weight:700;">行高对可读性的影响</h3>
  <div class="p4-lh-compare" id="p4-lh-compare">
    <div class="p4-lh-card">
      <div class="p4-lh-header">
        <span class="p4-lh-label">行高 1.2</span>
        <span class="p4-lh-tag p4-lh-tag--bad">拥挤</span>
      </div>
      <p class="p4-lh-text" style="line-height:1.2;">
        科研图表中的文字元素包括标题、坐标轴标签、图例说明和注释。当行高过小时，多行文字会紧密贴合，
        读者在扫视时容易串行，尤其在印刷品的小字号场景下，过密的行距会严重影响可读性。
      </p>
    </div>
    <div class="p4-lh-card">
      <div class="p4-lh-header">
        <span class="p4-lh-label">行高 1.6</span>
        <span class="p4-lh-tag p4-lh-tag--good">舒适</span>
      </div>
      <p class="p4-lh-text" style="line-height:1.6;">
        科研图表中的文字元素包括标题、坐标轴标签、图例说明和注释。当行高设置在 1.5–1.8 之间时，
        行与行之间留有充足的呼吸空间，读者可以轻松定位每一行的内容，阅读体验显著提升。
      </p>
    </div>
  </div>

  <!-- 期刊字体要求 -->
  <h3 style="text-align:center;font-size:1.3rem;margin:var(--space-xl) 0 var(--space-md);font-weight:700;">主流期刊字体要求</h3>
  <div class="p4-journal-table-wrap">
    <table class="p4-journal-table">
      <thead>
        <tr><th>期刊</th><th>推荐字体</th><th>字号范围</th><th>备注</th></tr>
      </thead>
      <tbody>
        ${Y.map(t=>`
        <tr>
          <td class="p4-journal-name">${t.journal}</td>
          <td class="p4-journal-font">${t.font}</td>
          <td>${t.sizeRange}</td>
          <td>${t.note}</td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 5: 设计检查清单
     ════════════════════════════════════════════ -->
<section class="p4-check-section" id="p4-check-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title" style="color:var(--text-on-dark);">图表设计检查清单</h2>
    <p class="p4-section-desc p4-section-desc--dark">
      出图前的四项核心检查——确保每位读者都能无障碍地理解你的数据。
    </p>
  </div>

  <div class="p4-check-grid" id="p4-check-grid">
    <div class="p4-check-card">
      <div class="p4-check-icon">◆ ✕ ○</div>
      <div class="p4-check-title">形状辅助颜色</div>
      <div class="p4-check-desc">
        不要仅靠颜色区分类别。为每个数据系列赋予不同的形状（圆、方、三角、菱形），
        即使在黑白打印或灰度显示下也能清晰辨别。
      </div>
      <div class="p4-check-example">
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag bad">✗ 仅颜色</div>
          <div class="p4-check-ex-content">五组数据只靠色彩区分，打印后无法辨识</div>
        </div>
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag good">✓ 颜色 + 形状</div>
          <div class="p4-check-ex-content">圆、方、三角各代表一组，颜色只是增强</div>
        </div>
      </div>
    </div>

    <div class="p4-check-card">
      <div class="p4-check-icon">Aa</div>
      <div class="p4-check-title">字号层级清晰</div>
      <div class="p4-check-desc">
        标题、坐标轴、刻度标签、图例的字号应有明确的大小递减关系。
        推荐 3–4 级字号阶梯（如 14 / 11 / 10 / 9 pt），避免大小混乱或全部相同。
      </div>
      <div class="p4-check-example">
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag bad">✗ 无层级</div>
          <div class="p4-check-ex-content">标题和标签同一字号，信息等级不清</div>
        </div>
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag good">✓ 阶梯递减</div>
          <div class="p4-check-ex-content">标题 14pt → 轴标题 11pt → 刻度 10pt → 注释 9pt</div>
        </div>
      </div>
    </div>

    <div class="p4-check-card">
      <div class="p4-check-icon">4.5 : 1</div>
      <div class="p4-check-title">对比度达标</div>
      <div class="p4-check-desc">
        所有文字与背景的对比度比值至少达到 WCAG AA 标准（正文 ≥ 4.5:1，大字 ≥ 3:1）。
        避免浅灰色文字叠在浅色背景上——这是最常见的可读性错误。
      </div>
      <div class="p4-check-example">
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag bad">✗ 对比度 2.1:1</div>
          <div class="p4-check-ex-content" style="color:#aaa;">几乎看不清的灰色文字</div>
        </div>
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag good">✓ 对比度 7.4:1</div>
          <div class="p4-check-ex-content">清晰可辨的深色文字</div>
        </div>
      </div>
    </div>

    <div class="p4-check-card">
      <div class="p4-check-icon">[ ]──→</div>
      <div class="p4-check-title">冗余编码与标注</div>
      <div class="p4-check-desc">
        重要数据点用直接标注（数值标签）替代仅靠图例的间接对应。
        同时使用颜色、形状和位置进行冗余编码，确保任何单一通道失效时信息不丢失。
      </div>
      <div class="p4-check-example">
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag bad">✗ 只靠图例</div>
          <div class="p4-check-ex-content">读者需要反复对照图例才能理解数据</div>
        </div>
        <div class="p4-check-ex-col">
          <div class="p4-check-ex-tag good">✓ 直接标注</div>
          <div class="p4-check-ex-content">关键数据点旁直接标明数值或类别名</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 6: Footer
     ════════════════════════════════════════════ -->
<section class="page-footer-cta" id="p4-footer">
  <p class="page-footer-num">04 / 10</p>
  <h2 class="page-footer-quote">可读性不是妥协，是让科学发现触达更多人的方式</h2>
  <p class="page-footer-desc">掌握对比度与色盲友好配色，让你的图表真正惠及所有读者。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p4-prev-btn">← 配色生成器</button>
    <button class="btn-primary" id="p4-next-btn">图表选择指南 →</button>
  </div>
</section>

</div>`}function rt(){y.fromTo(".p4-anim-0",{opacity:0,y:20},{opacity:1,y:0,duration:.7,delay:.1,ease:"power3.out"}),y.fromTo(".p4-anim-1",{opacity:0,y:40},{opacity:1,y:0,duration:.9,delay:.25,ease:"power3.out"}),y.fromTo(".p4-anim-2",{opacity:0,y:30},{opacity:.5,y:0,duration:.8,delay:.4,ease:"power3.out"}),y.fromTo(".p4-anim-3",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.55,ease:"power3.out"}),y.fromTo(".p4-anim-4",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.7,ease:"power3.out"}),y.fromTo(".p4-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,delay:.85,ease:"power3.out"}),f(".p4-contrast-card",{y:40}),f("#p4-typo-section .p4-section-header",{y:40}),R(".p4-typo-controls"),R(".p4-typo-preview"),f("#p4-font-section .p4-section-header",{y:40}),f(".p4-font-compare",{y:30}),f(".p4-scale-table-wrap",{y:30}),f(".p4-lh-compare",{y:30}),f(".p4-journal-table-wrap",{y:30}),f("#p4-check-section .p4-section-header",{y:40}),y.utils.toArray(".p4-check-card").forEach((t,d)=>{f(t,{y:30})}),f("#p4-footer",{y:30}),document.querySelectorAll("#p4-hero-nav .hero-quicknav__item").forEach(t=>{t.addEventListener("click",()=>{const d=document.querySelector(t.dataset.target);d&&d.scrollIntoView({behavior:"smooth",block:"start"})})});try{U()}catch(t){console.error("p04 setupContrastChecker:",t)}try{J()}catch(t){console.error("p04 setupChartTypography:",t)}try{V()}catch(t){console.error("p04 setupNavButtons:",t)}}function U(){const t=document.getElementById("p4-fg-picker"),d=document.getElementById("p4-bg-picker"),b=document.getElementById("p4-fg-hex"),C=document.getElementById("p4-bg-hex"),z=document.getElementById("p4-fg-swatch"),u=document.getElementById("p4-bg-swatch");function k(){const r=N(a.fgColor,a.bgColor),v=r.toFixed(2);document.getElementById("p4-ratio-num").textContent=v;const m=r>=4.5,c=r>=3,h=r>=7;w("p4-badge-aa",m,"AA 正文"),w("p4-badge-aa-large",c,"AA 大字"),w("p4-badge-aaa",h,"AAA");const i=Math.min(100,r/21*100),g=document.getElementById("p4-bar-fill");g&&(g.style.width=i+"%",g.style.background=r>=4.5?"var(--color-success)":r>=3?"#F0B27A":"var(--color-error)");const S=document.getElementById("p4-preview-box");S&&(S.style.background=a.bgColor,S.style.color=a.fgColor),z&&(z.style.background=a.fgColor),u&&(u.style.background=a.bgColor)}function w(r,v,m){const c=document.getElementById(r);c&&(c.className=`p4-badge ${v?"p4-badge--pass":"p4-badge--fail"}`,c.textContent=`${v?"✓":"✗"} ${m}`)}function A(r,v,m,c){!r||!v||(r.addEventListener("input",h=>{const i=h.target.value;c?a.fgColor=i:a.bgColor=i,v.value=i.toUpperCase(),k()}),v.addEventListener("input",h=>{let i=h.target.value.trim();i.startsWith("#")||(i="#"+i),/^#[0-9A-Fa-f]{6}$/.test(i)&&(c?a.fgColor=i:a.bgColor=i,r.value=i,k())}))}A(t,b,!1,!0),A(d,C,!1,!1);const n=document.getElementById("p4-font-dec"),l=document.getElementById("p4-font-inc"),p=document.getElementById("p4-font-size-val"),e=document.getElementById("p4-preview-normal");function o(){p&&(p.textContent=a.previewFontSize+"px"),e&&(e.style.fontSize=a.previewFontSize+"px")}n&&n.addEventListener("click",()=>{a.previewFontSize=Math.max(8,a.previewFontSize-1),o()}),l&&l.addEventListener("click",()=>{a.previewFontSize=Math.min(32,a.previewFontSize+1),o()}),k()}function J(){const t=document.getElementById("p4-chart-canvas");if(!t)return;const d=[{group:"Control",a:23,b:18,c:15},{group:"Treatment A",a:35,b:28,c:22},{group:"Treatment B",a:41,b:32,c:27},{group:"Treatment C",a:29,b:24,c:19}],b=["a","b","c"],C=["Gene α","Gene β","Gene γ"],z=["#7EC8E3","#5BA3C9","#3A7CA5"];function u(){t.innerHTML="";const n=t.getBoundingClientRect(),l=n.width||600,p=n.height||450,e=a.chart,o={top:20+e.titleSize+e.subtitleSize+8,right:100,bottom:20+e.axisLabelSize+e.tickSize+8,left:20+e.axisLabelSize+e.tickSize+8},r=W(t).append("svg").attr("viewBox",`0 0 ${l} ${p}`).attr("preserveAspectRatio","xMidYMid meet");r.append("rect").attr("width",l).attr("height",p).attr("fill","#ffffff");const v=l-o.left-o.right,m=p-o.top-o.bottom,c=r.append("g").attr("transform",`translate(${o.left},${o.top})`),h=j().domain(d.map(s=>s.group)).range([0,v]).padding(.25),i=j().domain(b).range([0,h.bandwidth()]).padding(.05),g=q().domain([0,50]).range([m,0]);c.selectAll(".grid-line").data(g.ticks(5)).enter().append("line").attr("x1",0).attr("x2",v).attr("y1",s=>g(s)).attr("y2",s=>g(s)).attr("stroke","#e8e8e8").attr("stroke-dasharray","3,3"),c.selectAll(".bar-group").data(d).enter().append("g").attr("transform",s=>`translate(${h(s.group)},0)`).selectAll("rect").data(s=>b.map(x=>({key:x,value:s[x]}))).enter().append("rect").attr("x",s=>i(s.key)).attr("y",s=>g(s.value)).attr("width",i.bandwidth()).attr("height",s=>m-g(s.value)).attr("fill",(s,x)=>z[x]).attr("rx",2),c.append("g").attr("transform",`translate(0,${m})`).call(G(h).tickSize(0)).selectAll("text").attr("font-size",e.tickSize+"px").attr("fill","#555"),c.select(".domain").attr("stroke","#ccc"),c.append("g").call(O(g).ticks(5).tickSize(-4)).selectAll("text").attr("font-size",e.tickSize+"px").attr("fill","#555"),r.append("text").attr("x",o.left+v/2).attr("y",p-6).attr("text-anchor","middle").attr("font-size",e.axisLabelSize+"px").attr("font-weight",600).attr("fill","#333").text("实验组"),r.append("text").attr("x",-(o.top+m/2)).attr("y",14).attr("transform","rotate(-90)").attr("text-anchor","middle").attr("font-size",e.axisLabelSize+"px").attr("font-weight",600).attr("fill","#333").text("表达量 (FPKM)"),r.append("text").attr("x",o.left).attr("y",e.titleSize+4).attr("font-size",e.titleSize+"px").attr("font-weight",e.titleWeight).attr("fill","#1d1d1f").text("三组基因在不同处理下的表达量"),r.append("text").attr("x",o.left).attr("y",e.titleSize+e.subtitleSize+10).attr("font-size",e.subtitleSize+"px").attr("fill","#888").text("数据来源：RNA-seq, n = 3 replicates");const L=o.top+10,M=l-o.right+16,I=r.append("g").attr("transform",`translate(${M},${L})`);b.forEach((s,x)=>{const F=x*(e.legendSize+10);I.append("rect").attr("x",0).attr("y",F).attr("width",e.legendSize).attr("height",e.legendSize).attr("fill",z[x]).attr("rx",2),I.append("text").attr("x",e.legendSize+6).attr("y",F+e.legendSize*.8).attr("font-size",e.legendSize+"px").attr("fill","#555").text(C[x])});const $=d[2],T=h($.group)+i("a")+i.bandwidth()/2,_=g($.a)-8;r.append("text").attr("x",o.left+T).attr("y",o.top+_).attr("text-anchor","middle").attr("font-size",e.annotationSize+"px").attr("font-style","italic").attr("fill","#888").text("p < 0.01 *")}const k=[{id:"p4-c-title",valId:"p4-v-title",key:"titleSize",unit:"px"},{id:"p4-c-subtitle",valId:"p4-v-subtitle",key:"subtitleSize",unit:"px"},{id:"p4-c-axis",valId:"p4-v-axis",key:"axisLabelSize",unit:"px"},{id:"p4-c-tick",valId:"p4-v-tick",key:"tickSize",unit:"px"},{id:"p4-c-legend",valId:"p4-v-legend",key:"legendSize",unit:"px"},{id:"p4-c-annotation",valId:"p4-v-annotation",key:"annotationSize",unit:"px"}];k.forEach(n=>{const l=document.getElementById(n.id),p=document.getElementById(n.valId);l&&l.addEventListener("input",e=>{const o=parseInt(e.target.value);a.chart[n.key]=o,p&&(p.textContent=o+n.unit),u()})});const w=document.getElementById("p4-typo-reset");w&&w.addEventListener("click",()=>{a.chart={...B},k.forEach(n=>{const l=document.getElementById(n.id),p=document.getElementById(n.valId);l&&(l.value=a.chart[n.key]),p&&(p.textContent=a.chart[n.key]+n.unit)}),u()}),u();const A=new ResizeObserver(()=>u());A.observe(t),a._resizeObserver=A}function V(){const t=document.getElementById("p4-next-btn"),d=document.getElementById("p4-prev-btn"),b=document.getElementById("p4-m1-btn");t&&t.addEventListener("click",()=>E("m1-p5")),d&&d.addEventListener("click",()=>E("m1-p3")),b&&b.addEventListener("click",()=>E("m1"))}function ot(){H(),a._resizeObserver&&(a._resizeObserver.disconnect(),a._resizeObserver=null),a={fgColor:"#1d1d1f",bgColor:"#ffffff",previewFontSize:16,chart:{...B},lineHeightA:1.2,lineHeightB:1.8}}export{ot as destroy,rt as init,at as render};
