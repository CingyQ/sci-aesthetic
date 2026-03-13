// p01-design-fundamentals.js — 设计速成指南
// Hero → S1 对比 → S2 对齐 → S3 留白 → S4 配色 → S5 字体 → S6 信噪比 → S7 视觉层次 → Footer

import { fadeIn, killAll, gsap, ScrollTrigger } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _eventHandlers = [];
let _rafIds = [];
let _currentSNRStep = -1;

function addEvt(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ══════════════════════════════════════════════════════
//  CSS
// ══════════════════════════════════════════════════════
const styles = `
/* ── Hero 光晕 ── */
.df-hero { position: relative; overflow: hidden; }
.df-hero::before,
.df-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.df-hero::before { width:55%; height:45%; top:25%; left:10%; background:rgba(240,178,122,0.12); animation:df-drift-a 13s ease-in-out infinite alternate; }
.df-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.08); animation:df-drift-b 9s ease-in-out infinite alternate-reverse; }
@keyframes df-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-20px)} }
@keyframes df-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-25px,15px)} }

/* ── 滚动提示 ── */
.df-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:df-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes df-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 幻灯片容器 ── */
.df-slide { max-width:640px; aspect-ratio:16/9; border:1px solid rgba(0,0,0,0.08); border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,0.06); padding:40px; margin:0 auto; overflow:hidden; position:relative; background:#fff; }
.section-dark .df-slide { border-color:rgba(255,255,255,0.08); box-shadow:0 4px 24px rgba(0,0,0,0.3); background:rgba(255,255,255,0.03); }

/* ── 滑块 ── */
.df-slider { -webkit-appearance:none; width:100%; max-width:480px; height:4px; border-radius:2px; background:rgba(0,0,0,0.1); outline:none; margin:var(--space-md) auto 0; display:block; }
.df-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:var(--module-4); cursor:pointer; transition:transform 0.2s; }
.df-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }
.df-slider::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:var(--module-4); cursor:pointer; border:none; }
.section-dark .df-slider { background:rgba(255,255,255,0.15); }

/* ── 步骤标签 ── */
.df-step-label { font-size:var(--text-caption); text-align:center; margin-top:var(--space-sm); transition:opacity 0.3s; color:var(--text-on-light-2); }
.section-dark .df-step-label { color:var(--text-on-dark-2); }

/* ── S1 对比 ── */
.df-cs-title { transition:font-size 0.4s ease-out, font-weight 0.4s, color 0.4s; font-family:var(--font-heading); }
.df-cs-points { list-style:disc inside; transition:font-size 0.4s, color 0.4s; margin:var(--space-md) 0; }
.df-cs-points li { margin-bottom:8px; transition:color 0.4s; }
.df-cs-number { margin-top:var(--space-md); transition:font-size 0.4s ease-out, color 0.4s, font-weight 0.4s; font-family:var(--font-code); }

/* ── S2 对齐 ── */
.df-align-canvas { aspect-ratio:16/10; position:relative; border-radius:16px; background:rgba(255,255,255,0.04); overflow:hidden; border:1px solid rgba(255,255,255,0.06); }
.df-align-block { position:absolute; border-radius:8px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); cursor:grab; display:flex; align-items:center; justify-content:center; font-size:12px; color:var(--text-on-dark-2); user-select:none; transition:box-shadow 0.2s; touch-action:none; }
.df-align-block.dragging { cursor:grabbing; box-shadow:0 8px 32px rgba(0,0,0,0.3); z-index:10; }
.df-align-grid-line { position:absolute; background:rgba(126,200,227,0.15); opacity:0; transition:opacity 0.4s; }
.df-align-btns { display:flex; gap:var(--space-sm); justify-content:center; margin-top:var(--space-md); }

/* ── S3 留白 ── */
.df-stepper { display:flex; gap:8px; justify-content:center; margin-top:var(--space-md); }
.df-step-btn { width:40px; height:40px; border-radius:50%; border:2px solid var(--border-light); background:transparent; cursor:pointer; font-size:14px; font-weight:600; color:var(--text-on-light-2); transition:all 0.3s; }
.df-step-btn.df-step-active { background:var(--module-4); border-color:var(--module-4); color:#fff; }
.df-ws-slide { transition:padding 0.5s ease-out; }
.df-ws-title { transition:font-size 0.5s ease-out, margin-bottom 0.5s; }
.df-ws-body p { transition:font-size 0.5s ease-out, margin-bottom 0.5s, opacity 0.4s; }
.df-ws-chart { transition:margin 0.5s ease-out, height 0.5s; border-radius:8px; background:rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:center; font-size:13px; color:#999; }
.df-ws-source { transition:font-size 0.5s, opacity 0.5s, margin-top 0.5s; color:#999; }
.df-ws-pattern { position:absolute; inset:0; opacity:0; transition:opacity 0.5s; pointer-events:none;
  background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,0.02) 10px,rgba(0,0,0,0.02) 20px); }

/* ── S4 配色 ── */
.df-color-bad { background:linear-gradient(135deg,#eef,#ffe) !important; }
.df-color-bad ul { list-style:none; padding:0; margin:var(--space-sm) 0; }
.df-color-bad ul li { margin-bottom:6px; font-size:14px; }
.df-color-good ul { list-style:disc inside; padding:0; margin:var(--space-sm) 0; }
.df-color-good ul li { margin-bottom:6px; font-size:14px; transition:color 0.4s; }
.df-cg-title { transition:color 0.4s; }
.df-color-badge { position:absolute; top:12px; right:12px; font-size:11px; padding:3px 10px; border-radius:var(--radius-full,99px); background:rgba(255,80,80,0.15); color:#ff5050; }
.df-scheme-btn { padding:6px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-on-dark-2); cursor:pointer; font-size:13px; transition:all 0.3s; }
.df-scheme-btn.df-scheme-active { background:var(--module-4); border-color:var(--module-4); color:#1d1d1f; }
.df-swatch { width:36px; height:36px; border-radius:50%; cursor:pointer; transition:transform 0.2s; border:2px solid rgba(255,255,255,0.1); }
.df-swatch:hover { transform:scale(1.15); }
.df-swatch-hex { font-size:11px; font-family:var(--font-code); color:var(--text-on-dark-3); cursor:pointer; }
.df-toast { position:absolute; top:-28px; left:50%; transform:translateX(-50%); font-size:12px; background:rgba(0,0,0,0.75); color:#fff; padding:4px 12px; border-radius:8px; pointer-events:none; opacity:0; white-space:nowrap; }

/* ── S5 字体 ── */
.df-fonts-layout { display:flex; gap:var(--space-lg); max-width:var(--w-full); margin:0 auto; }
.df-fonts-list { width:42%; display:flex; flex-direction:column; gap:var(--space-sm); }
.df-fonts-preview { width:58%; }
.df-font-card { padding:var(--space-md); border-radius:12px; border:1px solid rgba(0,0,0,0.06); cursor:pointer; transition:border-color 0.3s, background 0.3s, border-left-width 0.3s; }
.df-font-card:hover { background:rgba(240,178,122,0.02); }
.df-font-card.df-font-active { border-left:3px solid var(--module-4); background:rgba(240,178,122,0.04); }
.df-font-card-name { font-size:15px; font-weight:600; margin-bottom:4px; }
.df-font-card-desc { font-size:13px; color:var(--text-on-light-2); }
.df-font-card-tags { display:flex; gap:6px; margin-top:8px; }
.df-font-card-tag { font-size:11px; padding:2px 8px; border-radius:10px; background:rgba(0,0,0,0.04); color:var(--text-on-light-3); }

/* ── S6 信噪比 ── */
.df-snr-wrap { display:flex; gap:var(--space-lg); max-width:var(--w-full); margin:0 auto; }
.df-snr-slide-col { width:50%; position:relative; }
.df-snr-steps-col { width:50%; }
.df-snr-step { min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:var(--space-lg); }
.df-snr-step h3 { font-size:var(--text-heading); color:var(--text-on-dark); margin-bottom:var(--space-sm); }
.df-snr-step p { font-size:var(--text-body); color:var(--text-on-dark-2); line-height:1.8; }
.df-snr-tabs { display:none; }
.df-snr-tab { width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-on-dark-2); cursor:pointer; font-size:14px; font-weight:600; transition:all 0.3s; }
.df-snr-tab.df-snr-tab-active { background:var(--module-4); border-color:var(--module-4); color:#1d1d1f; }
/* 幻灯片内噪音元素 */
.df-snr-slide { aspect-ratio:auto; min-height:380px; padding:32px; font-size:14px; }
.df-snr-border { position:absolute; inset:0; border:4px double #8B4513; border-radius:12px; pointer-events:none; transition:opacity 0.5s; }
.df-snr-gradient { position:absolute; inset:0; border-radius:12px; background:linear-gradient(135deg,rgba(100,100,200,0.15),rgba(180,100,200,0.1)); pointer-events:none; transition:opacity 0.5s; }
.df-snr-clipart { position:absolute; transition:opacity 0.5s, transform 0.5s; }
.df-snr-clipart-1 { top:12px; left:12px; width:40px; height:40px; }
.df-snr-clipart-2 { top:12px; right:50px; width:36px; height:36px; }
.df-snr-clipart-3 { bottom:40px; right:12px; width:44px; height:44px; }
.df-snr-title { font-family:'Comic Sans MS','Segoe UI',sans-serif; text-shadow:1px 1px 2px rgba(0,0,0,0.2); transition:all 0.5s; position:relative; z-index:1; margin-bottom:12px; }
.df-snr-bullets { list-style:disc inside; position:relative; z-index:1; margin-bottom:12px; }
.df-snr-bullets li { margin-bottom:4px; transition:opacity 0.4s, max-height 0.4s, margin 0.4s; max-height:30px; overflow:hidden; }
.df-snr-table { position:relative; z-index:1; font-size:11px; border-collapse:collapse; transition:opacity 0.5s; }
.df-snr-table table { width:100%; border-collapse:collapse; }
.df-snr-table th, .df-snr-table td { border:1px solid rgba(255,255,255,0.1); padding:3px 6px; text-align:center; }
.df-snr-table th { background:rgba(255,255,255,0.05); font-weight:600; }
.df-snr-footer { position:absolute; bottom:8px; left:0; right:0; text-align:center; font-size:10px; color:var(--text-on-dark-3); transition:opacity 0.5s; z-index:1; }
.df-snr-chart-clean { position:relative; z-index:1; transition:opacity 0.5s; }

/* ── S7 视觉层次 ── */
.df-hier-controls { display:flex; flex-direction:column; gap:var(--space-md); margin-top:var(--space-lg); max-width:480px; margin-left:auto; margin-right:auto; }
.df-hier-controls label { display:flex; align-items:center; gap:var(--space-sm); font-size:var(--text-caption); color:var(--text-on-light-2); white-space:nowrap; }
.df-hier-controls .df-slider { flex:1; margin:0; }
.df-h-l1,.df-h-l2,.df-h-l3,.df-h-l5 { transition:font-size 0.3s ease-out, color 0.3s, margin-bottom 0.3s; }

/* ── 移动端 ── */
@media (max-width:768px) {
  .df-slide { padding:24px; }
  .df-slider::-webkit-slider-thumb { width:24px; height:24px; }
  .df-slider::-moz-range-thumb { width:24px; height:24px; }
  .df-step-btn { min-width:44px; min-height:44px; }

  /* S5 字体 */
  .df-fonts-layout { flex-direction:column-reverse; }
  .df-fonts-list { width:100%; max-height:400px; overflow-y:auto; }
  .df-fonts-preview { width:100%; }

  /* S6 信噪比 */
  .df-snr-wrap { flex-direction:column; }
  .df-snr-slide-col { width:100%; }
  .df-snr-steps-col { width:100%; }
  .df-snr-step { min-height:auto; display:none; padding:var(--space-md); }
  .df-snr-step.df-snr-step-active { display:flex; }
  .df-snr-tabs { display:flex !important; gap:8px; justify-content:center; margin-bottom:var(--space-md); }
  .df-snr-slide { min-height:280px; }
}

/* 所有 section 移动端 scroll-margin */
@media (max-width:768px) {
  #df-contrast,#df-alignment,#df-whitespace,#df-color,#df-fonts,#df-snr,#df-hierarchy { scroll-margin-top:56px; }
}
`;

// ══════════════════════════════════════════════════════
//  数据
// ══════════════════════════════════════════════════════

// S1 对比 — 5 档
const CONTRAST_STOPS = [
  { title:{ size:'16px', weight:400, color:'#666' }, body:'#777', num:{ size:'16px', weight:400, color:'#888' }, bg:'#f0f0f0', label:'标题和正文几乎没有区分' },
  { title:{ size:'22px', weight:500, color:'#555' }, body:'#666', num:{ size:'24px', weight:500, color:'#777' }, bg:'#f5f5f5', label:'开始有一点层次感' },
  { title:{ size:'28px', weight:600, color:'#444' }, body:'#666', num:{ size:'36px', weight:600, color:'#555' }, bg:'#f9f9f9', label:'层次逐渐清晰' },
  { title:{ size:'32px', weight:700, color:'#333' }, body:'#555', num:{ size:'52px', weight:700, color:'#E08A4A' }, bg:'#fcfcfc', label:'重点突出，阅读有节奏' },
  { title:{ size:'36px', weight:700, color:'#1d1d1f' }, body:'#555', num:{ size:'72px', weight:700, color:'#D4782F' }, bg:'#ffffff', label:'层次分明，重点一目了然 ✓' },
];

// S3 留白 — 5 档
const WHITESPACE_STOPS = [
  { pad:'20px', titleMb:'4px', titleSize:'13px', bodySize:'11px', bodyMb:'2px', chartH:'40px', chartM:'4px 0', srcSize:'10px', srcOpacity:1, pattern:true,  label:'过载：内容拥挤，无法聚焦' },
  { pad:'26px', titleMb:'8px', titleSize:'14px', bodySize:'12px', bodyMb:'4px', chartH:'50px', chartM:'6px 0', srcSize:'11px', srcOpacity:0.9, pattern:false, label:'拥挤：去掉花纹，但仍然拥挤' },
  { pad:'32px', titleMb:'16px',titleSize:'16px', bodySize:'14px', bodyMb:'8px', chartH:'60px', chartM:'12px 0', srcSize:'12px', srcOpacity:0.7, pattern:false, label:'适中：开始有呼吸感' },
  { pad:'38px', titleMb:'24px',titleSize:'18px', bodySize:'15px', bodyMb:'12px',chartH:'70px', chartM:'16px 0', srcSize:'12px', srcOpacity:0.5, pattern:false, label:'舒适：清晰分组，重点突出' },
  { pad:'44px', titleMb:'32px',titleSize:'22px', bodySize:'16px', bodyMb:'16px',chartH:'80px', chartM:'24px 0', srcSize:'11px', srcOpacity:0.3, pattern:false, label:'极简：大量留白，只保留核心 ✓' },
];

// S4 配色方案
const COLOR_SCHEMES = [
  { name:'学术蓝', primary:'#2B5797', accent:'#E8833A', neutral:'#888', title:'#2B5797', body:'#444', bg:'#f8fafc', listColor:'#333' },
  { name:'低饱和绿', primary:'#3A7D5C', accent:'#D4A843', neutral:'#999', title:'#3A7D5C', body:'#555', bg:'#f6faf8', listColor:'#444' },
  { name:'暖灰调', primary:'#5C5C5C', accent:'#C06040', neutral:'#aaa', title:'#5C5C5C', body:'#666', bg:'#faf9f8', listColor:'#555' },
];

// S5 字体组合
const FONT_COMBOS = [
  { name:'正式学术', titleFont:"'Noto Serif SC', serif", bodyFont:"'Noto Sans SC', sans-serif", desc:'沉稳权威，适合答辩和正式报告', tags:['答辩','论文','报告'] },
  { name:'现代简洁', titleFont:"'Inter', sans-serif", bodyFont:"'Noto Sans SC', sans-serif", desc:'干净利落，适合组会和内部汇报', tags:['组会','汇报','日常'] },
  { name:'创意混搭', titleFont:"'Playfair Display', serif", bodyFont:"'Noto Sans SC', sans-serif", desc:'衬线+黑体混搭，适合海报和 GA', tags:['海报','GA','展示'] },
  { name:'纯英文学术', titleFont:"'Playfair Display', serif", bodyFont:"'Inter', sans-serif", desc:'纯英文场景首选，经典学术感', tags:['英文','期刊','国际会议'] },
];

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════
export function render() {
  return `
<style>${styles}</style>
<div class="page-scroll">

  <!-- ═══ Hero ═══ -->
  <section class="section-dark section-hero-full df-hero" id="df-hero">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow" style="opacity:0;">Module 04 / Page 01</p>
      <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">设计速成指南</h1>
      <p class="page-hero-sub" style="opacity:0;">Design Fundamentals</p>
      <p class="df-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">7 条规则，让你的学术演示告别"能用就行"</p>
      <nav class="hero-quicknav" id="df-quicknav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#df-contrast">对比</button>
        <button class="hero-quicknav__item" data-target="#df-alignment">对齐</button>
        <button class="hero-quicknav__item" data-target="#df-whitespace">留白</button>
        <button class="hero-quicknav__item" data-target="#df-color">配色</button>
        <button class="hero-quicknav__item" data-target="#df-fonts">字体</button>
        <button class="hero-quicknav__item" data-target="#df-snr">信噪比</button>
        <button class="hero-quicknav__item" data-target="#df-hierarchy">视觉层次</button>
      </nav>
      <div class="df-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ═══ S1 对比 (浅色) ═══ -->
  <section class="section-light" id="df-contrast" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">01 / 07</p>
      <h2 class="section-title">对比</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">大小、粗细、颜色——差异要足够大，不要"差不多"</p>
    </div>
    <div class="df-contrast-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide" id="df-contrast-slide">
        <h3 class="df-cs-title">研究结论</h3>
        <ul class="df-cs-points">
          <li>实验组显著优于对照组</li>
          <li>效应量 Cohen's d = 0.82</li>
          <li>置信区间 95% CI [0.45, 1.19]</li>
        </ul>
        <div class="df-cs-number">p &lt; 0.001</div>
      </div>
      <input type="range" class="df-slider" id="df-contrast-slider" min="0" max="100" value="0" step="25">
      <p class="df-step-label" id="df-contrast-label">标题和正文几乎没有区分</p>
    </div>
  </section>

  <!-- ═══ S2 对齐 (深色) ═══ -->
  <section class="section-dark" id="df-alignment" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">02 / 07</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">对齐</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">看不见的线条，是秩序感的来源</p>
    </div>
    <div class="df-align-wrap" style="max-width:720px;margin:0 auto;width:100%;">
      <div class="df-align-canvas" id="df-align-canvas"></div>
      <div class="df-align-btns">
        <button class="btn-primary" id="df-align-btn">自动对齐</button>
        <button class="btn-ghost" id="df-shuffle-btn">打乱</button>
      </div>
    </div>
  </section>

  <!-- ═══ S3 留白 (浅色) ═══ -->
  <section class="section-light" id="df-whitespace" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">03 / 07</p>
      <h2 class="section-title">留白</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">留白不是浪费空间，是给内容以呼吸</p>
    </div>
    <div class="df-ws-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide df-ws-slide" id="df-ws-slide">
        <div class="df-ws-pattern" id="df-ws-pattern"></div>
        <h3 class="df-ws-title">数据分析结果</h3>
        <div class="df-ws-body">
          <p class="df-ws-p1">本研究采用双因素方差分析</p>
          <p class="df-ws-p2">主效应显著 F(2,45)=8.32, p&lt;0.01</p>
          <p class="df-ws-p3">交互效应不显著 F(2,45)=1.04, p=0.36</p>
        </div>
        <div class="df-ws-chart">[图表区域]</div>
        <p class="df-ws-source">数据来源：2024 年实验记录</p>
      </div>
      <div class="df-stepper" id="df-ws-stepper">
        <button class="df-step-btn df-step-active" data-step="0">1</button>
        <button class="df-step-btn" data-step="1">2</button>
        <button class="df-step-btn" data-step="2">3</button>
        <button class="df-step-btn" data-step="3">4</button>
        <button class="df-step-btn" data-step="4">5</button>
      </div>
      <p class="df-step-label" id="df-ws-label">过载：内容拥挤，无法聚焦</p>
    </div>
  </section>

  <!-- ═══ S4 配色 (深色) ═══ -->
  <section class="section-dark" id="df-color" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">04 / 07</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">配色</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">一个主色 + 一个强调色，够了</p>
    </div>
    <div class="df-color-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <p style="text-align:center;font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">反面教材</p>
      <div class="df-slide df-color-bad" id="df-color-bad">
        <div class="df-color-badge">6+ 颜色</div>
        <h3 style="color:#e74c3c;font-size:20px;margin-bottom:8px;">研究方法概述</h3>
        <ul>
          <li style="color:#3498db;">实验设计：随机对照</li>
          <li style="color:#2ecc71;">样本量：N = 120</li>
          <li style="color:#9b59b6;">分析方法：双因素方差分析</li>
          <li style="color:#e67e22;">显著性水平：α = 0.05</li>
        </ul>
      </div>
      <p style="text-align:center;font-size:20px;color:var(--text-on-dark-3);margin:var(--space-md) 0;">↓</p>
      <p style="text-align:center;font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">正确示范</p>
      <div class="df-slide df-color-good" id="df-color-good">
        <h3 class="df-cg-title" style="font-size:20px;margin-bottom:8px;">研究方法概述</h3>
        <ul class="df-cg-list">
          <li>实验设计：随机对照</li>
          <li>样本量：N = 120</li>
          <li>分析方法：双因素方差分析</li>
          <li>显著性水平：α = 0.05</li>
        </ul>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:var(--space-md);" id="df-color-schemes"></div>
      <div id="df-color-swatches" style="display:flex;gap:12px;justify-content:center;margin-top:var(--space-sm);position:relative;align-items:center;"></div>
    </div>
  </section>

  <!-- ═══ S5 字体 (浅色) ═══ -->
  <section class="section-light" id="df-fonts" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">05 / 07</p>
      <h2 class="section-title">字体搭配</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">好的字体组合 = 个性 + 可读性</p>
    </div>
    <div class="df-fonts-wrap" style="max-width:var(--w-full);margin:0 auto;width:100%;">
      <div class="df-fonts-layout" id="df-fonts-layout">
        <div class="df-fonts-list" id="df-fonts-list"></div>
        <div class="df-fonts-preview" id="df-fonts-preview">
          <div class="df-slide" id="df-fonts-slide" style="aspect-ratio:auto;min-height:360px;"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ S6 信噪比 (深色) ═══ -->
  <section class="section-dark" id="df-snr" style="padding:var(--space-3xl) var(--space-lg);">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">06 / 07</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">信噪比</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">每个元素都应该传达信息，否则删掉它</p>
    </div>
    <div class="df-snr-wrap" id="df-snr-wrap">
      <div class="df-snr-slide-col" id="df-snr-slide-col">
        <div class="df-slide df-snr-slide" id="df-snr-slide">
          <div class="df-snr-border"></div>
          <div class="df-snr-gradient"></div>
          <div class="df-snr-clipart df-snr-clipart-1">
            <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="16" stroke="#8B6914" stroke-width="2" fill="rgba(139,105,20,0.15)"/><path d="M14 20l4 4 8-8" stroke="#8B6914" stroke-width="2"/></svg>
          </div>
          <div class="df-snr-clipart df-snr-clipart-2">
            <svg viewBox="0 0 36 36" fill="none"><rect x="4" y="4" width="28" height="28" rx="4" stroke="#6B3FA0" stroke-width="2" fill="rgba(107,63,160,0.1)"/><path d="M12 18h12M18 12v12" stroke="#6B3FA0" stroke-width="2"/></svg>
          </div>
          <div class="df-snr-clipart df-snr-clipart-3">
            <svg viewBox="0 0 44 44" fill="none"><polygon points="22,4 28,16 42,18 32,28 34,42 22,36 10,42 12,28 2,18 16,16" stroke="#C0392B" stroke-width="1.5" fill="rgba(192,57,43,0.1)"/></svg>
          </div>
          <h3 class="df-snr-title" style="font-size:18px;color:var(--text-on-dark);">研究成果总结</h3>
          <ul class="df-snr-bullets" style="color:var(--text-on-dark-2);font-size:13px;">
            <li>实验一：对照组与实验组差异显著</li>
            <li>实验二：剂量效应呈线性关系</li>
            <li>实验三：长期随访结果稳定</li>
            <li class="df-snr-extra">统计方法：混合效应模型</li>
            <li class="df-snr-extra">样本量：N=200，脱落率 5%</li>
            <li class="df-snr-extra">效应量：Cohen's d=0.75</li>
            <li class="df-snr-extra">置信区间：95% CI [0.42, 1.08]</li>
            <li class="df-snr-extra">结论：支持原假设</li>
          </ul>
          <div class="df-snr-table" id="df-snr-table">
            <table><thead><tr><th>组别</th><th>N</th><th>M</th><th>SD</th><th>t</th><th>p</th></tr></thead>
            <tbody><tr><td>实验</td><td>100</td><td>78.5</td><td>12.3</td><td>3.45</td><td>.001</td></tr>
            <tr><td>对照</td><td>100</td><td>68.2</td><td>11.8</td><td>—</td><td>—</td></tr></tbody></table>
          </div>
          <div class="df-snr-chart-clean" id="df-snr-chart" style="opacity:0;height:0;overflow:hidden;">
            <div style="display:flex;align-items:flex-end;gap:16px;justify-content:center;height:80px;padding-top:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="width:48px;height:55px;background:var(--module-4);border-radius:6px 6px 0 0;"></div>
                <span style="font-size:11px;color:var(--text-on-dark-3);">实验组</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="width:48px;height:38px;background:rgba(255,255,255,0.15);border-radius:6px 6px 0 0;"></div>
                <span style="font-size:11px;color:var(--text-on-dark-3);">对照组</span>
              </div>
            </div>
          </div>
          <div class="df-snr-footer">© 2024 Research Lab | Page 3/15 | Confidential</div>
        </div>
      </div>
      <div class="df-snr-steps-col" id="df-snr-steps-col">
        <div class="df-snr-tabs" id="df-snr-tabs">
          <button class="df-snr-tab df-snr-tab-active" data-step="0">1</button>
          <button class="df-snr-tab" data-step="1">2</button>
          <button class="df-snr-tab" data-step="2">3</button>
          <button class="df-snr-tab" data-step="3">4</button>
          <button class="df-snr-tab" data-step="4">5</button>
        </div>
        <div class="df-snr-step df-snr-step-active" data-step="0">
          <h3>Step 1：原始版</h3>
          <p>所有装饰元素可见——边框、渐变、剪贴画、密集文字、花哨字体。典型的"信息过载"幻灯片。</p>
        </div>
        <div class="df-snr-step" data-step="1">
          <h3>Step 2：去装饰</h3>
          <p>移除不传达信息的装饰元素——双线边框、渐变背景、剪贴画图标全部消失。</p>
        </div>
        <div class="df-snr-step" data-step="2">
          <h3>Step 3：精简文字</h3>
          <p>8 条 bullet points 精简为 3 条关键发现。密集表格替换为简洁图表。</p>
        </div>
        <div class="df-snr-step" data-step="3">
          <h3>Step 4：优化排版</h3>
          <p>统一字体、修正对齐、扩大间距。信息开始有呼吸感。</p>
        </div>
        <div class="df-snr-step" data-step="4">
          <h3>Step 5：最终版</h3>
          <p>极简布局——只剩标题、3 个关键发现、一张清晰图表。每个元素都传达信息。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ S7 视觉层次 (浅色) ═══ -->
  <section class="section-light" id="df-hierarchy" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">07 / 07</p>
      <h2 class="section-title">视觉层次</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">让观众的视线自然流动：从最重要到最次要</p>
    </div>
    <div class="df-hier-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide" id="df-hier-slide">
        <h3 class="df-h-l1" style="font-size:16px;color:#888;margin-bottom:8px;">实验设计与分析方法</h3>
        <p class="df-h-l2" style="font-size:16px;color:#888;margin-bottom:8px;">双因素混合设计</p>
        <p class="df-h-l3" style="font-size:16px;color:#888;margin-bottom:8px;line-height:1.6;">本研究采用 2×3 混合设计，自变量为干预类型和时间点。因变量为标准化测验得分。采用重复测量方差分析检验主效应和交互效应。</p>
        <div class="df-h-l4" style="height:60px;border-radius:8px;background:rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center;font-size:13px;color:#999;margin-bottom:8px;">[图表区域]</div>
        <p class="df-h-l5" style="font-size:16px;color:#888;">数据来源：XX 大学心理学实验室 · 2024</p>
      </div>
      <div class="df-hier-controls">
        <label>大小差异 <input type="range" class="df-slider" id="df-hier-size" min="0" max="100" value="0"></label>
        <label>颜色差异 <input type="range" class="df-slider" id="df-hier-color" min="0" max="100" value="0"></label>
        <label>位置权重 <input type="range" class="df-slider" id="df-hier-position" min="0" max="100" value="0"></label>
      </div>
      <p class="df-step-label" id="df-hier-label">层次感：弱</p>
    </div>
  </section>

  <!-- ═══ Footer CTA ═══ -->
  <section class="section-dark page-footer-cta" style="padding:var(--space-3xl) var(--space-lg);">
    <p class="page-footer-num">01 / 05</p>
    <h2 class="page-footer-quote">好的设计不是装饰，是让信息自己说话。</h2>
    <p class="page-footer-desc">掌握了这 7 条规则，接下来看看如何应用到真实的 PPT 中。</p>
    <div class="page-footer-nav">
      <button class="btn-ghost" id="df-prev-btn">← 素材资源站</button>
      <button class="btn-primary" id="df-next-btn">PPT 实战指南 →</button>
    </div>
  </section>

</div>`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  initHero();
  initQuicknav();
  initFooterNav();
  initContrast();
  initAlignment();
  initWhitespace();
  initColor();
  initFonts();
  initSNR();
  initHierarchy();
  initScrollAnimations();
}

// ── Hero ──
function initHero() {
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.df-hero .hero-eyebrow',   { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }, 0);
  heroTl.fromTo('.df-hero .page-hero-title', { y:30, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.15);
  heroTl.fromTo('.df-hero .page-hero-sub',   { y:20, opacity:0 }, { opacity:0.5, y:0, duration:0.8, ease:'power3.out' }, 0.3);
  heroTl.fromTo('.df-hero-tagline',          { y:20, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.45);
  heroTl.fromTo('#df-quicknav',              { y:20, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.6);
  heroTl.fromTo('.df-scroll-hint',           { opacity:0, y:15 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }, 0.75);
}

function initQuicknav() {
  const nav = document.getElementById('df-quicknav');
  if (!nav) return;
  addEvt(nav, 'click', (e) => {
    const btn = e.target.closest('.hero-quicknav__item');
    if (!btn) return;
    document.querySelector(btn.dataset.target)?.scrollIntoView({ behavior:'smooth' });
  });
}

function initFooterNav() {
  const prev = document.getElementById('df-prev-btn');
  const next = document.getElementById('df-next-btn');
  if (prev) addEvt(prev, 'click', () => navigateTo('m3-p7'));
  if (next) addEvt(next, 'click', () => navigateTo('m4-p2'));
}

// ── S1 对比 ──
function initContrast() {
  const slider = document.getElementById('df-contrast-slider');
  const label = document.getElementById('df-contrast-label');
  const title = document.querySelector('.df-cs-title');
  const points = document.querySelector('.df-cs-points');
  const num = document.querySelector('.df-cs-number');
  const slide = document.getElementById('df-contrast-slide');
  if (!slider || !title) return;

  const update = () => {
    const idx = Math.round(slider.value / 25);
    const s = CONTRAST_STOPS[idx];
    title.style.fontSize = s.title.size;
    title.style.fontWeight = s.title.weight;
    title.style.color = s.title.color;
    if (points) points.style.color = s.body;
    if (num) {
      num.style.fontSize = s.num.size;
      num.style.fontWeight = s.num.weight;
      num.style.color = s.num.color;
    }
    if (slide) slide.style.background = s.bg;
    if (label) label.textContent = s.label;
  };
  addEvt(slider, 'input', update);
  update();
}

// ── S2 对齐 ──
function initAlignment() {
  const canvas = document.getElementById('df-align-canvas');
  if (!canvas) return;

  const isMobile = window.innerWidth <= 768;
  const blockData = isMobile
    ? [
        { label:'标题', w:120, h:36 },
        { label:'段落', w:140, h:48 },
        { label:'图片', w:80, h:64 },
        { label:'按钮', w:72, h:32 },
      ]
    : [
        { label:'标题', w:140, h:36 },
        { label:'段落', w:160, h:52 },
        { label:'图片', w:100, h:72 },
        { label:'按钮', w:80, h:32 },
        { label:'注释', w:90, h:28 },
        { label:'图标', w:44, h:44 },
      ];

  // 散落位置（百分比）
  const scattered = isMobile
    ? [ {x:8,y:12}, {x:45,y:55}, {x:15,y:65}, {x:60,y:15} ]
    : [ {x:5,y:8}, {x:55,y:60}, {x:10,y:55}, {x:68,y:12}, {x:35,y:35}, {x:72,y:45} ];

  // 对齐位置（百分比，3列布局）
  const aligned = isMobile
    ? [ {x:5,y:8}, {x:5,y:35}, {x:55,y:8}, {x:55,y:50} ]
    : [ {x:5,y:8}, {x:5,y:38}, {x:5,y:68}, {x:55,y:8}, {x:55,y:38}, {x:55,y:68} ];

  // 创建网格线
  const gridEl = document.createElement('div');
  gridEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
  for (let i = 1; i < 3; i++) {
    const vLine = document.createElement('div');
    vLine.className = 'df-align-grid-line';
    vLine.style.cssText = `left:${(i/3)*100}%;top:0;width:1px;height:100%;`;
    gridEl.appendChild(vLine);
    const hLine = document.createElement('div');
    hLine.className = 'df-align-grid-line';
    hLine.style.cssText = `top:${(i/3)*100}%;left:0;height:1px;width:100%;`;
    gridEl.appendChild(hLine);
  }
  canvas.appendChild(gridEl);

  const blocks = [];
  blockData.forEach((bd, i) => {
    const el = document.createElement('div');
    el.className = 'df-align-block';
    el.textContent = bd.label;
    el.style.width = bd.w + 'px';
    el.style.height = bd.h + 'px';
    el.style.left = scattered[i].x + '%';
    el.style.top = scattered[i].y + '%';
    canvas.appendChild(el);
    blocks.push(el);

    // 拖拽
    addEvt(el, 'pointerdown', (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      el.classList.add('dragging');
      const rect = canvas.getBoundingClientRect();
      const offX = e.clientX - el.getBoundingClientRect().left;
      const offY = e.clientY - el.getBoundingClientRect().top;

      const onMove = (ev) => {
        const x = ev.clientX - rect.left - offX;
        const y = ev.clientY - rect.top - offY;
        el.style.left = Math.max(0, Math.min(rect.width - el.offsetWidth, x)) + 'px';
        el.style.top = Math.max(0, Math.min(rect.height - el.offsetHeight, y)) + 'px';
      };
      const onUp = () => {
        el.classList.remove('dragging');
        el.releasePointerCapture(e.pointerId);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        // snap to grid
        const rect2 = canvas.getBoundingClientRect();
        const cellW = rect2.width / 3;
        const cellH = rect2.height / 3;
        const cx = el.offsetLeft + el.offsetWidth / 2;
        const cy = el.offsetTop + el.offsetHeight / 2;
        const snapX = Math.round(cx / cellW) * cellW - el.offsetWidth / 2;
        const snapY = Math.round(cy / cellH) * cellH - el.offsetHeight / 2;
        const dist = Math.hypot(snapX - el.offsetLeft, snapY - el.offsetTop);
        if (dist < 50) {
          gsap.to(el, { left: Math.max(8, snapX), top: Math.max(8, snapY), duration: 0.3, ease: 'back.out(1.2)' });
        }
      };
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', onUp);
    });
  });

  // 自动对齐按钮
  const alignBtn = document.getElementById('df-align-btn');
  const shuffleBtn = document.getElementById('df-shuffle-btn');
  if (alignBtn) {
    addEvt(alignBtn, 'click', () => {
      blocks.forEach((el, i) => {
        gsap.to(el, { left: aligned[i].x + '%', top: aligned[i].y + '%', duration: 0.5, delay: i * 0.08, ease: 'power3.out' });
      });
      gridEl.querySelectorAll('.df-align-grid-line').forEach(l => { l.style.opacity = '1'; });
    });
  }
  if (shuffleBtn) {
    addEvt(shuffleBtn, 'click', () => {
      blocks.forEach((el, i) => {
        gsap.to(el, { left: scattered[i].x + '%', top: scattered[i].y + '%', duration: 0.5, delay: i * 0.06, ease: 'power2.out' });
      });
      gridEl.querySelectorAll('.df-align-grid-line').forEach(l => { l.style.opacity = '0'; });
    });
  }
}

// ── S3 留白 ──
function initWhitespace() {
  const stepper = document.getElementById('df-ws-stepper');
  const label = document.getElementById('df-ws-label');
  const slide = document.getElementById('df-ws-slide');
  const pattern = document.getElementById('df-ws-pattern');
  if (!stepper || !slide) return;

  const titleEl = slide.querySelector('.df-ws-title');
  const bodyPs = slide.querySelectorAll('.df-ws-body p');
  const chart = slide.querySelector('.df-ws-chart');
  const src = slide.querySelector('.df-ws-source');

  function applyStep(idx) {
    const s = WHITESPACE_STOPS[idx];
    gsap.to(slide, { padding: s.pad, duration: 0.5, ease: 'power2.out' });
    gsap.to(titleEl, { fontSize: s.titleSize, marginBottom: s.titleMb, duration: 0.5, ease: 'power2.out' });
    bodyPs.forEach(p => {
      gsap.to(p, { fontSize: s.bodySize, marginBottom: s.bodyMb, duration: 0.5, ease: 'power2.out' });
    });
    gsap.to(chart, { height: s.chartH, margin: s.chartM, duration: 0.5, ease: 'power2.out' });
    gsap.to(src, { fontSize: s.srcSize, opacity: s.srcOpacity, duration: 0.5, ease: 'power2.out' });
    if (pattern) pattern.style.opacity = s.pattern ? '1' : '0';
    if (label) label.textContent = s.label;

    stepper.querySelectorAll('.df-step-btn').forEach(btn => {
      btn.classList.toggle('df-step-active', parseInt(btn.dataset.step) === idx);
    });
  }

  addEvt(stepper, 'click', (e) => {
    const btn = e.target.closest('.df-step-btn');
    if (!btn) return;
    applyStep(parseInt(btn.dataset.step));
  });

  applyStep(0);
}

// ── S4 配色 ──
function initColor() {
  const schemesContainer = document.getElementById('df-color-schemes');
  const swatchesContainer = document.getElementById('df-color-swatches');
  const goodSlide = document.getElementById('df-color-good');
  if (!schemesContainer || !goodSlide) return;

  const goodTitle = goodSlide.querySelector('.df-cg-title');
  const goodItems = goodSlide.querySelectorAll('.df-cg-list li');

  // 渲染方案按钮
  COLOR_SCHEMES.forEach((scheme, i) => {
    const btn = document.createElement('button');
    btn.className = 'df-scheme-btn' + (i === 0 ? ' df-scheme-active' : '');
    btn.dataset.scheme = i;
    btn.textContent = scheme.name;
    schemesContainer.appendChild(btn);
  });

  function applyScheme(idx) {
    const s = COLOR_SCHEMES[idx];
    gsap.to(goodSlide, { background: s.bg, duration: 0.4, ease: 'power2.out' });
    gsap.to(goodTitle, { color: s.title, duration: 0.4 });
    goodItems.forEach(li => { gsap.to(li, { color: s.listColor, duration: 0.4 }); });

    schemesContainer.querySelectorAll('.df-scheme-btn').forEach(btn => {
      btn.classList.toggle('df-scheme-active', parseInt(btn.dataset.scheme) === idx);
    });

    renderSwatches(s);
  }

  function renderSwatches(s) {
    swatchesContainer.innerHTML = '';
    [s.primary, s.accent, s.neutral].forEach(hex => {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;';
      const swatch = document.createElement('div');
      swatch.className = 'df-swatch';
      swatch.style.background = hex;
      const hexLabel = document.createElement('span');
      hexLabel.className = 'df-swatch-hex';
      hexLabel.textContent = hex;
      wrap.appendChild(swatch);
      wrap.appendChild(hexLabel);
      swatchesContainer.appendChild(wrap);

      const copyHandler = () => {
        navigator.clipboard.writeText(hex).catch(() => {});
        const toast = document.createElement('div');
        toast.className = 'df-toast';
        toast.textContent = '已复制 ✓';
        wrap.appendChild(toast);
        gsap.fromTo(toast, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3, onComplete: () => {
          gsap.to(toast, { opacity: 0, delay: 0.8, duration: 0.4, onComplete: () => toast.remove() });
        }});
      };
      addEvt(swatch, 'click', copyHandler);
      addEvt(hexLabel, 'click', copyHandler);
    });
  }

  addEvt(schemesContainer, 'click', (e) => {
    const btn = e.target.closest('.df-scheme-btn');
    if (!btn) return;
    applyScheme(parseInt(btn.dataset.scheme));
  });

  applyScheme(0);
}

// ── S5 字体 ──
function initFonts() {
  const list = document.getElementById('df-fonts-list');
  const slide = document.getElementById('df-fonts-slide');
  if (!list || !slide) return;

  function renderPreview(combo) {
    slide.innerHTML = `
      <h3 style="font-family:${combo.titleFont};font-size:28px;margin-bottom:12px;color:#1d1d1f;transition:all 0.4s;">实验设计与分析方法</h3>
      <p style="font-family:${combo.bodyFont};font-size:18px;color:#444;margin-bottom:8px;transition:all 0.4s;">双因素混合设计 · 重复测量</p>
      <ul style="font-family:${combo.bodyFont};font-size:15px;color:#666;list-style:disc inside;margin-bottom:16px;">
        <li style="margin-bottom:4px;">自变量：干预类型 × 时间点</li>
        <li style="margin-bottom:4px;">因变量：标准化测验得分</li>
        <li style="margin-bottom:4px;">统计方法：重复测量方差分析</li>
      </ul>
      <div style="height:50px;border-radius:8px;background:rgba(0,0,0,0.04);display:flex;align-items:center;justify-content:center;font-size:12px;color:#999;margin-bottom:12px;">[图表区域]</div>
      <p style="font-family:${combo.bodyFont};font-size:12px;color:#aaa;">数据来源：XX 大学 · 2024 &nbsp; | &nbsp; 第 3 页</p>
    `;
  }

  FONT_COMBOS.forEach((combo, i) => {
    const card = document.createElement('div');
    card.className = 'df-font-card' + (i === 0 ? ' df-font-active' : '');
    card.dataset.idx = i;
    card.innerHTML = `
      <div class="df-font-card-name">${combo.name}</div>
      <div class="df-font-card-desc">${combo.desc}</div>
      <div class="df-font-card-tags">${combo.tags.map(t => `<span class="df-font-card-tag">${t}</span>`).join('')}</div>
    `;
    list.appendChild(card);
  });

  addEvt(list, 'click', (e) => {
    const card = e.target.closest('.df-font-card');
    if (!card) return;
    const idx = parseInt(card.dataset.idx);
    list.querySelectorAll('.df-font-card').forEach(c => c.classList.remove('df-font-active'));
    card.classList.add('df-font-active');
    renderPreview(FONT_COMBOS[idx]);
    if (window.innerWidth <= 768) {
      document.getElementById('df-fonts-preview')?.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }
  });

  renderPreview(FONT_COMBOS[0]);

  // 桌面端 sticky 预览
  if (window.innerWidth > 768) {
    initFontsStickyPreview();
  }
}

function initFontsStickyPreview() {
  const container = document.getElementById('df-fonts-layout');
  const preview = document.getElementById('df-fonts-preview');
  if (!container || !preview) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const containerRect = container.getBoundingClientRect();
      const previewH = preview.offsetHeight;
      const containerH = container.offsetHeight;
      const maxTranslate = Math.max(0, containerH - previewH);

      if (containerRect.top >= 0) {
        preview.style.transform = 'translateY(0)';
      } else if (containerRect.bottom <= previewH) {
        preview.style.transform = `translateY(${maxTranslate}px)`;
      } else {
        const translate = Math.min(-containerRect.top, maxTranslate);
        preview.style.transform = `translateY(${translate}px)`;
      }
    });
  };

  addEvt(window, 'scroll', onScroll, { passive: true });
}

// ── S6 信噪比 ──
function initSNR() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    initSNRMobile();
  } else {
    initSNRDesktop();
  }
}

function updateSNR(step) {
  if (step === _currentSNRStep) return;
  _currentSNRStep = step;

  const border = document.querySelector('.df-snr-border');
  const gradient = document.querySelector('.df-snr-gradient');
  const cliparts = document.querySelectorAll('.df-snr-clipart');
  const title = document.querySelector('.df-snr-title');
  const extras = document.querySelectorAll('.df-snr-extra');
  const table = document.getElementById('df-snr-table');
  const chart = document.getElementById('df-snr-chart');
  const footer = document.querySelector('.df-snr-footer');
  const bullets = document.querySelector('.df-snr-bullets');

  // Step 0: 全部可见
  if (step === 0) {
    gsap.to(border, { opacity: 1, duration: 0.4 });
    gsap.to(gradient, { opacity: 1, duration: 0.4 });
    cliparts.forEach(c => gsap.to(c, { opacity: 1, scale: 1, duration: 0.4 }));
    if (title) gsap.to(title, { fontFamily: "'Comic Sans MS','Segoe UI',sans-serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)', fontSize: '18px', duration: 0.4 });
    extras.forEach(li => gsap.to(li, { opacity: 1, maxHeight: 30, marginBottom: 4, duration: 0.4 }));
    gsap.to(table, { opacity: 1, height: 'auto', duration: 0.4 });
    gsap.to(chart, { opacity: 0, height: 0, duration: 0.4 });
    gsap.to(footer, { opacity: 1, duration: 0.4 });
    if (bullets) gsap.to(bullets, { fontSize: '13px', duration: 0.4 });
  }
  // Step 1: 去装饰
  if (step >= 1) {
    gsap.to(border, { opacity: 0, duration: 0.5 });
    gsap.to(gradient, { opacity: 0, duration: 0.5 });
    cliparts.forEach((c, i) => gsap.to(c, { opacity: 0, scale: 0.5, duration: 0.4, delay: i * 0.1 }));
  }
  // Step 2: 精简文字
  if (step >= 2) {
    extras.forEach((li, i) => gsap.to(li, { opacity: 0, maxHeight: 0, marginBottom: 0, duration: 0.4, delay: i * 0.05 }));
    gsap.to(table, { opacity: 0, height: 0, duration: 0.5 });
    gsap.to(chart, { opacity: 1, height: 'auto', duration: 0.5, delay: 0.3 });
  } else {
    extras.forEach(li => gsap.to(li, { opacity: 1, maxHeight: 30, marginBottom: 4, duration: 0.4 }));
    gsap.to(table, { opacity: 1, height: 'auto', duration: 0.4 });
    gsap.to(chart, { opacity: 0, height: 0, duration: 0.3 });
  }
  // Step 3: 优化排版
  if (step >= 3) {
    if (title) gsap.to(title, { fontFamily: "var(--font-heading)", textShadow: 'none', fontSize: '22px', marginBottom: '16px', duration: 0.5 });
    if (bullets) gsap.to(bullets, { fontSize: '15px', duration: 0.5 });
    gsap.to(footer, { opacity: 0.5, fontSize: '9px', duration: 0.4 });
  } else if (step < 3) {
    if (title) gsap.to(title, { fontFamily: "'Comic Sans MS','Segoe UI',sans-serif", textShadow: '1px 1px 2px rgba(0,0,0,0.2)', fontSize: '18px', marginBottom: '12px', duration: 0.4 });
    if (bullets) gsap.to(bullets, { fontSize: '13px', duration: 0.4 });
    gsap.to(footer, { opacity: 1, fontSize: '10px', duration: 0.4 });
  }
  // Step 4: 最终版
  if (step >= 4) {
    if (title) gsap.to(title, { fontSize: '26px', color: 'var(--text-on-dark)', fontWeight: 600, marginBottom: '20px', duration: 0.5 });
    if (bullets) gsap.to(bullets, { fontSize: '16px', color: 'var(--text-on-dark-2)', duration: 0.5 });
    gsap.to(footer, { opacity: 0, duration: 0.4 });
  } else {
    if (step < 3 && title) gsap.to(title, { fontWeight: 400, color: 'var(--text-on-dark)', duration: 0.4 });
  }

  // 更新 tab / step 高亮
  document.querySelectorAll('.df-snr-tab').forEach(tab => {
    tab.classList.toggle('df-snr-tab-active', parseInt(tab.dataset.step) === step);
  });
  document.querySelectorAll('.df-snr-step').forEach(s => {
    s.classList.toggle('df-snr-step-active', parseInt(s.dataset.step) === step);
  });
}

function initSNRDesktop() {
  const wrap = document.getElementById('df-snr-wrap');
  const slideCol = document.getElementById('df-snr-slide-col');
  if (!wrap || !slideCol) return;

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const wrapRect = wrap.getBoundingClientRect();
      const slideH = slideCol.offsetHeight;
      const wrapH = wrap.offsetHeight;
      const maxTranslate = Math.max(0, wrapH - slideH);

      // JS sticky
      if (wrapRect.top >= 0) {
        slideCol.style.transform = 'translateY(0)';
      } else if (wrapRect.bottom <= slideH) {
        slideCol.style.transform = `translateY(${maxTranslate}px)`;
      } else {
        const translate = Math.min(-wrapRect.top, maxTranslate);
        slideCol.style.transform = `translateY(${translate}px)`;
      }

      // 计算当前步骤
      const progress = Math.max(0, -wrapRect.top) / Math.max(1, wrapH - window.innerHeight);
      const stepIdx = Math.min(4, Math.floor(progress * 5));
      updateSNR(stepIdx);
    });
  };

  addEvt(window, 'scroll', onScroll, { passive: true });
  updateSNR(0);
}

function initSNRMobile() {
  const tabs = document.getElementById('df-snr-tabs');
  if (!tabs) return;
  addEvt(tabs, 'click', (e) => {
    const tab = e.target.closest('.df-snr-tab');
    if (!tab) return;
    updateSNR(parseInt(tab.dataset.step));
  });
  updateSNR(0);
}

// ── S7 视觉层次 ──
function initHierarchy() {
  const sizeSlider = document.getElementById('df-hier-size');
  const colorSlider = document.getElementById('df-hier-color');
  const posSlider = document.getElementById('df-hier-position');
  const label = document.getElementById('df-hier-label');
  if (!sizeSlider) return;

  const l1 = document.querySelector('.df-h-l1');
  const l2 = document.querySelector('.df-h-l2');
  const l3 = document.querySelector('.df-h-l3');
  const l5 = document.querySelector('.df-h-l5');

  const lerp = (a, b, t) => a + (b - a) * t;
  const lerpColor = (a, b, t) => {
    const parse = (h) => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
    const [r1,g1,b1] = parse(a);
    const [r2,g2,b2] = parse(b);
    return `rgb(${Math.round(lerp(r1,r2,t))},${Math.round(lerp(g1,g2,t))},${Math.round(lerp(b1,b2,t))})`;
  };

  const update = () => {
    const sv = sizeSlider.value / 100;
    const cv = colorSlider.value / 100;
    const pv = posSlider.value / 100;

    // 大小
    if (l1) l1.style.fontSize = lerp(16, 42, sv) + 'px';
    if (l2) l2.style.fontSize = lerp(16, 28, sv) + 'px';
    if (l3) l3.style.fontSize = lerp(16, 16, sv) + 'px';
    if (l5) l5.style.fontSize = lerp(16, 12, sv) + 'px';

    // 颜色
    if (l1) l1.style.color = lerpColor('#888888', '#1d1d1f', cv);
    if (l2) l2.style.color = lerpColor('#888888', '#444444', cv);
    if (l3) l3.style.color = lerpColor('#888888', '#666666', cv);
    if (l5) l5.style.color = lerpColor('#888888', '#aaaaaa', cv);

    // 位置权重
    if (l1) l1.style.marginBottom = lerp(8, 40, pv) + 'px';

    // 标签
    const avg = (sv + cv + pv) / 3;
    if (label) {
      if (avg < 0.33) label.textContent = '层次感：弱';
      else if (avg < 0.66) label.textContent = '层次感：中等';
      else label.textContent = '层次感：强 ✓';
    }
  };

  addEvt(sizeSlider, 'input', update);
  addEvt(colorSlider, 'input', update);
  addEvt(posSlider, 'input', update);
  update();
}

// ── 滚动入场动画 ──
function initScrollAnimations() {
  ['#df-contrast','#df-alignment','#df-whitespace','#df-color','#df-fonts','#df-snr','#df-hierarchy'].forEach(id => {
    fadeIn(`${id} .section-header`);
  });

  fadeIn('.df-contrast-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-align-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-ws-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-color-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-fonts-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-snr-wrap', { y: 50, duration: 0.7 });
  fadeIn('.df-hier-wrap', { y: 50, duration: 0.7 });

  fadeIn('.page-footer-quote', { y: 40, duration: 0.9 });
  fadeIn('.page-footer-cta .page-footer-nav', { y: 25, duration: 0.6 });
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  killAll();
  _eventHandlers.forEach(({ el, type, fn, opts }) => {
    el.removeEventListener(type, fn, opts);
  });
  _eventHandlers = [];
  _rafIds.forEach(id => cancelAnimationFrame(id));
  _rafIds = [];
  _currentSNRStep = -1;
}
