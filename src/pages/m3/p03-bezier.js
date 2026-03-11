import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';

let _eventHandlers = [];
let _observers = [];
let _canvases = [];

// ── 贝塞尔编辑器状态 ──
let bezierState = {
  points: [
    { x: 0.15, y: 0.7,  type: 'anchor'  },
    { x: 0.25, y: 0.2,  type: 'control' },
    { x: 0.75, y: 0.8,  type: 'control' },
    { x: 0.85, y: 0.3,  type: 'anchor'  },
  ],
  mode: 'cubic',
  showHandles: true,
  showGrid: true,
  dragging: null,
};

const DEFAULT_POINTS = () => ([
  { x: 0.15, y: 0.7,  type: 'anchor'  },
  { x: 0.25, y: 0.2,  type: 'control' },
  { x: 0.75, y: 0.8,  type: 'control' },
  { x: 0.85, y: 0.3,  type: 'anchor'  },
]);

const PRESETS = [
  {
    name: 'S 形曲线', icon: '〜',
    desc: '表示渐进过渡、S 型增长曲线',
    points: [{ x:0.1, y:0.7, type:'anchor' }, { x:0.2, y:0.1, type:'control' },
             { x:0.8, y:0.9, type:'control' }, { x:0.9, y:0.3, type:'anchor' }]
  },
  {
    name: '弯曲箭头', icon: '↗',
    desc: '流程图连接线，方向明确',
    points: [{ x:0.1, y:0.8, type:'anchor' }, { x:0.1, y:0.3, type:'control' },
             { x:0.9, y:0.3, type:'control' }, { x:0.9, y:0.2, type:'anchor' }]
  },
  {
    name: '拱形', icon: '⌒',
    desc: '表示路径、通道、拱门结构',
    points: [{ x:0.1, y:0.8, type:'anchor' }, { x:0.1, y:0.2, type:'control' },
             { x:0.9, y:0.2, type:'control' }, { x:0.9, y:0.8, type:'anchor' }]
  },
  {
    name: '波浪线', icon: '≈',
    desc: '表示振动、波动现象（单段近似）',
    points: [{ x:0.05, y:0.5, type:'anchor' }, { x:0.2, y:0.15, type:'control' },
             { x:0.45, y:0.85, type:'control' }, { x:0.5, y:0.5, type:'anchor' }]
  },
];

const CHALLENGES = [
  {
    id: 'ch1', name: '复现 S 形曲线', difficulty: '⭐',
    target: [{ x:0.1, y:0.7, type:'anchor' }, { x:0.2, y:0.1, type:'control' },
             { x:0.8, y:0.9, type:'control' }, { x:0.9, y:0.3, type:'anchor' }],
    hint: '把上方控制点向左拉，下方控制点向右拉'
  },
  {
    id: 'ch2', name: '画出对称拱形', difficulty: '⭐⭐',
    target: [{ x:0.1, y:0.85, type:'anchor' }, { x:0.1, y:0.15, type:'control' },
             { x:0.9, y:0.15, type:'control' }, { x:0.9, y:0.85, type:'anchor' }],
    hint: '两个控制手柄应对称，高度相同'
  },
  {
    id: 'ch3', name: '弯曲连接箭头', difficulty: '⭐⭐⭐',
    target: [{ x:0.1, y:0.8, type:'anchor' }, { x:0.15, y:0.2, type:'control' },
             { x:0.85, y:0.2, type:'control' }, { x:0.9, y:0.8, type:'anchor' }],
    hint: '两根手柄垂直向上拉，终点在右上方'
  },
];

// ── 挑战状态 ──
let challengeState = {
  currentIndex: 0,
  userPoints: null,
};

// ── render ──
export function render() {
  return `<div class="page-scroll">
<style>
/* ── p03 hero ── */
.p03-hero { position:relative; overflow:hidden; align-items:center; }
.p03-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 30% 45%, rgba(149,213,178,0.18) 0%, transparent 70%); animation:p03-drift-a 14s ease-in-out infinite; pointer-events:none; }
.p03-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 72% 62%, rgba(126,200,227,0.1) 0%, transparent 70%); animation:p03-drift-b 10s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p03-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-18px)} }
@keyframes p03-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,24px)} }
.p03-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p03-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p03-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 原理图解 ── */
.p03-concept-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md); max-width:var(--w-full); margin:0 auto; }
.p03-concept-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-md) var(--space-md) var(--space-lg); border:1px solid var(--border-light); display:flex; flex-direction:column; gap:var(--space-sm); transition:box-shadow 0.3s; }
.p03-concept-card:hover { box-shadow:0 12px 40px rgba(0,0,0,0.08); }
.p03-concept-svg { width:100%; height:120px; }
.p03-concept-title { font-family:var(--font-heading); font-size:var(--text-heading); font-weight:700; color:var(--text-on-light); margin-top:4px; }
.p03-concept-en { font-size:var(--text-caption); color:var(--module-3); font-weight:600; letter-spacing:0.06em; text-transform:uppercase; font-family:var(--font-heading); }
.p03-concept-desc { font-size:var(--text-small); color:var(--text-on-light-2); line-height:1.7; }

/* ── S2 编辑器 ── */
.p03-editor-layout { display:grid; grid-template-columns:200px 1fr 180px; gap:var(--space-md); align-items:start; max-width:var(--w-full); margin:0 auto; }
.p03-panel { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-dark); }
.p03-panel-title { font-size:var(--text-caption); font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--module-3); margin-bottom:var(--space-sm); font-family:var(--font-heading); }
.p03-control-group { display:flex; flex-direction:column; gap:10px; }
.p03-radio-row { display:flex; flex-direction:column; gap:6px; }
.p03-radio-label { display:flex; align-items:center; gap:8px; font-size:0.85rem; color:var(--text-on-dark-2); cursor:pointer; padding:6px 0; }
.p03-radio-label input[type=radio] { accent-color:var(--module-3); width:16px; height:16px; }
.p03-toggle-row { display:flex; align-items:center; justify-content:space-between; font-size:0.85rem; color:var(--text-on-dark-2); padding:4px 0; }
.p03-toggle { position:relative; width:36px; height:20px; }
.p03-toggle input { opacity:0; width:0; height:0; }
.p03-toggle-slider { position:absolute; inset:0; background:var(--border-dark); border-radius:var(--radius-full); transition:0.3s; cursor:pointer; }
.p03-toggle-slider::before { content:''; position:absolute; width:14px; height:14px; left:3px; top:3px; background:#fff; border-radius:50%; transition:0.3s; }
.p03-toggle input:checked + .p03-toggle-slider { background:var(--module-3); }
.p03-toggle input:checked + .p03-toggle-slider::before { transform:translateX(16px); }
.p03-coords { font-family:var(--font-code); font-size:0.75rem; color:var(--text-on-dark-3); background:rgba(0,0,0,0.3); border-radius:var(--radius-sm); padding:8px 10px; margin-top:8px; min-height:36px; line-height:1.6; white-space:pre-wrap; }
.p03-btn-reset { width:100%; padding:10px; background:transparent; border:1.5px solid rgba(149,213,178,0.3); border-radius:var(--radius-full); color:var(--module-3); font-size:0.85rem; font-family:var(--font-heading); cursor:pointer; transition:all 0.25s; margin-top:8px; min-height:44px; }
.p03-btn-reset:hover { background:rgba(149,213,178,0.1); border-color:var(--module-3); }
.p03-canvas-wrap { border-radius:var(--radius-md); overflow:hidden; position:relative; background:#1a1a2e; }
.p03-canvas-wrap canvas { display:block; width:100%; height:400px; cursor:crosshair; }
.p03-canvas-hint { position:absolute; bottom:12px; right:14px; font-size:0.7rem; color:rgba(255,255,255,0.25); font-family:var(--font-code); pointer-events:none; }
.p03-preset-btn { width:100%; padding:10px 12px; background:transparent; border:1.5px solid rgba(149,213,178,0.2); border-radius:var(--radius-md); color:var(--text-on-dark-2); font-size:0.82rem; font-family:var(--font-heading); cursor:pointer; transition:all 0.25s; text-align:left; display:flex; flex-direction:column; gap:3px; margin-bottom:8px; }
.p03-preset-btn:hover,.p03-preset-btn.active { background:rgba(149,213,178,0.08); border-color:var(--module-3); color:var(--text-on-dark); }
.p03-preset-icon { font-size:1.3rem; }
.p03-preset-name { font-weight:600; font-size:0.82rem; }
.p03-preset-desc { font-size:0.72rem; color:var(--text-on-dark-3); line-height:1.4; }
.p03-fullscreen-btn { display:none; width:100%; margin-top:var(--space-sm); padding:12px; background:var(--module-3); color:#000; border:none; border-radius:var(--radius-full); font-size:0.9rem; font-weight:600; font-family:var(--font-heading); cursor:pointer; min-height:44px; }
.p03-fullscreen-modal { position:fixed; inset:0; z-index:500; background:#0a0a12; display:flex; flex-direction:column; }
.p03-modal-header { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid var(--border-dark); flex-shrink:0; }
.p03-modal-title { font-family:var(--font-heading); font-weight:700; color:var(--text-on-dark); font-size:1rem; }
.p03-modal-close { width:44px; height:44px; background:transparent; border:1.5px solid var(--border-dark); border-radius:50%; color:var(--text-on-dark); font-size:1.2rem; cursor:pointer; display:flex; align-items:center; justify-content:center; }
.p03-modal-canvas-wrap { flex:1; display:flex; align-items:center; justify-content:center; padding:16px; overflow:hidden; }
.p03-modal-canvas-wrap canvas { border-radius:var(--radius-md); touch-action:none; }

/* ── S3 科研应用 ── */
.p03-app-row { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xl); align-items:center; max-width:var(--w-full); margin:0 auto; }
.p03-app-row.reverse { direction:rtl; }
.p03-app-row.reverse > * { direction:ltr; }
.p03-app-visual { border-radius:var(--radius-lg); overflow:hidden; background:var(--bg-light-elevated,#fff); border:1px solid var(--border-light); padding:var(--space-md); display:flex; align-items:center; justify-content:center; min-height:220px; }
.p03-app-label { font-size:var(--text-caption); font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--module-3); font-family:var(--font-heading); margin-bottom:8px; }
.p03-app-title { font-family:var(--font-display); font-size:var(--text-title); font-weight:700; color:var(--text-on-light); letter-spacing:-0.02em; margin-bottom:var(--space-sm); }
.p03-app-desc { font-size:var(--text-body); color:var(--text-on-light-2); line-height:1.8; margin-bottom:var(--space-sm); }
.p03-app-steps { list-style:none; padding:0; display:flex; flex-direction:column; gap:6px; }
.p03-app-steps li { display:flex; align-items:flex-start; gap:8px; font-size:var(--text-small); color:var(--text-on-light-2); line-height:1.6; }
.p03-app-steps li::before { content:''; width:6px; height:6px; border-radius:50%; background:var(--module-3); margin-top:6px; flex-shrink:0; }
.p03-code-block { background:#1a1a2e; border-radius:var(--radius-md); padding:var(--space-md); border:1px solid rgba(149,213,178,0.15); margin-top:var(--space-sm); }
.p03-code-block pre { font-family:var(--font-code); font-size:0.82rem; color:#a8d8a8; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; line-height:1.7; margin:0; }
.p03-code-comment { color:rgba(168,216,168,0.4); }
.p03-app-divider { border:none; border-top:1px solid var(--border-light); margin:var(--space-2xl) 0; }

/* ── S4 挑战模式 ── */
.p03-challenge-tabs { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:var(--space-lg); justify-content:center; }
.p03-ch-tab { padding:10px 22px; border-radius:var(--radius-full); border:1.5px solid rgba(149,213,178,0.25); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; font-family:var(--font-heading); cursor:pointer; transition:all 0.25s; min-height:44px; }
.p03-ch-tab:hover { border-color:var(--module-3); color:var(--text-on-dark); }
.p03-ch-tab.active { background:rgba(149,213,178,0.12); border-color:var(--module-3); color:var(--module-3); font-weight:700; }
.p03-challenge-layout { display:grid; grid-template-columns:1fr 60px 1fr; gap:var(--space-md); align-items:center; max-width:900px; margin:0 auto; }
.p03-ch-label { font-size:var(--text-caption); font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:var(--text-on-dark-3); text-align:center; margin-bottom:8px; font-family:var(--font-heading); }
.p03-ch-canvas-wrap { border-radius:var(--radius-md); overflow:hidden; background:#131320; }
.p03-ch-canvas-wrap canvas { display:block; width:100%; height:260px; }
.p03-ch-sep { display:flex; flex-direction:column; align-items:center; gap:8px; }
.p03-ch-vs { font-family:var(--font-code); font-size:0.75rem; color:var(--text-on-dark-3); }
.p03-score-display { font-family:var(--font-code); font-size:clamp(2.5rem,6vw,5rem); font-weight:700; text-align:center; margin:var(--space-lg) 0 var(--space-sm); color:var(--module-3); line-height:1; }
.p03-score-label { font-size:0.85rem; color:var(--text-on-dark-3); text-align:center; font-family:var(--font-heading); margin-bottom:var(--space-md); }
.p03-score-msg { text-align:center; font-size:1rem; font-family:var(--font-heading); min-height:28px; }
.p03-ch-actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:var(--space-md); }
.p03-btn-hint { padding:10px 22px; background:transparent; border:1.5px solid rgba(149,213,178,0.25); border-radius:var(--radius-full); color:var(--text-on-dark-2); font-size:0.85rem; font-family:var(--font-heading); cursor:pointer; transition:all 0.25s; min-height:44px; }
.p03-btn-hint:hover { border-color:var(--module-3); color:var(--module-3); }
.p03-hint-box { background:rgba(149,213,178,0.08); border-left:3px solid var(--module-3); border-radius:0 var(--radius-sm) var(--radius-sm) 0; padding:12px 16px; font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.6; max-width:500px; margin:var(--space-sm) auto 0; display:none; }
.p03-hint-box.show { display:block; }

/* ── 响应式 ── */
@media (max-width:1024px) {
  .p03-editor-layout { grid-template-columns:180px 1fr; }
  .p03-presets-panel { grid-column:1/-1; display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
  .p03-preset-btn { margin-bottom:0; }
}
@media (max-width:768px) {
  #p03-s1, #p03-s2, #p03-s3, #p03-s4 { scroll-margin-top:56px; }
  .p03-concept-grid { grid-template-columns:1fr; gap:var(--space-sm); }
  .p03-editor-layout { grid-template-columns:1fr; }
  .p03-panel.p03-presets-panel { display:grid; grid-template-columns:repeat(2,1fr); gap:8px; }
  .p03-preset-btn { margin-bottom:0; }
  .p03-canvas-wrap canvas { height:280px; }
  .p03-fullscreen-btn { display:block; }
  .p03-app-row { grid-template-columns:1fr; gap:var(--space-lg); }
  .p03-app-row.reverse { direction:ltr; }
  .p03-challenge-layout { grid-template-columns:1fr 40px 1fr; }
  .p03-ch-canvas-wrap canvas { height:180px; }
  .p03-score-display { font-size:clamp(2rem,10vw,3.5rem); }
}
@media (max-width:480px) {
  .p03-challenge-layout { grid-template-columns:1fr; }
  .p03-ch-sep { display:none; }
  .p03-ch-canvas-wrap canvas { height:200px; }
  .p03-presets-panel { grid-template-columns:1fr 1fr; }
}
</style>

<!-- HERO -->
<section class="section-dark section-hero-full p03-hero" id="p03-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 03</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">贝塞尔曲线与路径</h1>
    <p class="page-hero-sub" style="opacity:0;">Bézier Curves: The Language of Vector Paths</p>
    <p class="p03-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">两个锚点，两根手柄，无限可能——理解贝塞尔，掌握矢量路径的核心语言</p>
    <nav class="hero-quicknav" id="p03-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p03-s1">曲线原理</button>
      <button class="hero-quicknav__item" data-target="#p03-s2">交互编辑器</button>
      <button class="hero-quicknav__item" data-target="#p03-s3">科研应用</button>
      <button class="hero-quicknav__item" data-target="#p03-s4">挑战模式</button>
    </nav>
    <div class="p03-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- S1 原理图解 -->
<section class="section-light" id="p03-s1" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-caption);letter-spacing:0.1em;text-transform:uppercase;color:var(--module-3);font-weight:700;font-family:var(--font-heading);margin-bottom:var(--space-sm);">核心概念</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-sm);">三个基础元素</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;">理解贝塞尔曲线，先掌握三个构成单元——锚点、手柄、曲线方程。</p>
    </div>
    <div class="p03-concept-grid" id="p03-concept-grid">

      <!-- 卡片1：锚点 -->
      <div class="p03-concept-card">
        <svg class="p03-concept-svg" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 80 C80 80 160 40 200 40" stroke="#95D5B2" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="220" stroke-dashoffset="220" class="p03c1-path"/>
          <rect x="33" y="73" width="14" height="14" rx="2" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5" class="p03c1-pt" style="opacity:0;transform-box:fill-box;transform-origin:center"/>
          <rect x="193" y="33" width="14" height="14" rx="2" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5" class="p03c1-pt" style="opacity:0;transform-box:fill-box;transform-origin:center"/>
          <circle cx="120" cy="56" r="6" fill="none" stroke="#7EC8E3" stroke-width="1.5" stroke-dasharray="3 2" class="p03c1-mid" style="opacity:0"/>
          <text x="40" y="106" font-size="10" fill="#95D5B2" font-family="JetBrains Mono, monospace">P0</text>
          <text x="197" y="58" font-size="10" fill="#95D5B2" font-family="JetBrains Mono, monospace">P1</text>
          <text x="108" y="75" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">中点</text>
          <style>
            .p03c1-path { animation: p03c1draw 3.5s ease-out infinite; }
            .p03c1-pt   { animation: p03c1pt 3.5s ease-out infinite; }
            .p03c1-mid  { animation: p03c1mid 3.5s ease-out infinite; }
            @keyframes p03c1draw { 0%,5%{stroke-dashoffset:220} 55%,88%{stroke-dashoffset:0} 95%,100%{stroke-dashoffset:220} }
            @keyframes p03c1pt { 0%,15%{opacity:0;transform:scale(0)} 40%,85%{opacity:1;transform:scale(1)} 93%,100%{opacity:0} }
            @keyframes p03c1mid { 0%,50%{opacity:0} 68%,85%{opacity:1} 93%,100%{opacity:0} }
          </style>
        </svg>
        <span class="p03-concept-en">Anchor Points</span>
        <h3 class="p03-concept-title">锚点</h3>
        <p class="p03-concept-desc">锚点是路径的起点、终点或转折点。实心方块表示选中的锚点，它决定了路径在该位置的精确坐标。</p>
      </div>

      <!-- 卡片2：控制手柄 -->
      <div class="p03-concept-card">
        <svg class="p03-concept-svg" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="75" r="7" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5"/>
          <line x1="120" y1="75" x2="60" y2="25" stroke="rgba(149,213,178,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <line x1="120" y1="75" x2="190" y2="35" stroke="rgba(149,213,178,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
          <circle cx="60" cy="25" r="5" fill="none" stroke="#7EC8E3" stroke-width="2" class="p03c2-h1"/>
          <circle cx="190" cy="35" r="5" fill="none" stroke="#7EC8E3" stroke-width="2" class="p03c2-h2"/>
          <text x="28" y="20" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">短手柄</text>
          <text x="145" y="24" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">长手柄=强曲率</text>
          <text x="108" y="100" font-size="10" fill="#95D5B2" font-family="JetBrains Mono, monospace">锚点</text>
          <style>
            .p03c2-h1,.p03c2-h2 { animation: p03c2pulse 2.5s ease-in-out infinite alternate; transform-box:fill-box; transform-origin:center; }
            .p03c2-h2 { animation-delay:0.5s; }
            @keyframes p03c2pulse { 0%{r:5;stroke:#7EC8E3;stroke-width:2} 100%{r:7;stroke:#95D5B2;stroke-width:2.5} }
          </style>
        </svg>
        <span class="p03-concept-en">Control Handles</span>
        <h3 class="p03-concept-title">控制手柄</h3>
        <p class="p03-concept-desc">从锚点延伸的手柄控制曲线的切线方向和弯曲程度。手柄越长，曲率越大；两侧手柄共线时产生平滑过渡。</p>
      </div>

      <!-- 卡片3：三次贝塞尔 -->
      <div class="p03-concept-card">
        <svg class="p03-concept-svg" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="90" x2="70" y2="20" stroke="rgba(149,213,178,0.3)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <line x1="210" y1="85" x2="170" y2="20" stroke="rgba(149,213,178,0.3)" stroke-width="1.2" stroke-dasharray="4 3"/>
          <path d="M30 90 C70 20 170 20 210 85" stroke="#95D5B2" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="320" stroke-dashoffset="320" class="p03c3-curve"/>
          <circle r="4" fill="#F0B27A" class="p03c3-dot"/>
          <circle cx="70" cy="20" r="5" fill="none" stroke="#7EC8E3" stroke-width="2"/>
          <circle cx="170" cy="20" r="5" fill="none" stroke="#7EC8E3" stroke-width="2"/>
          <circle cx="30" cy="90" r="7" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5"/>
          <circle cx="210" cy="85" r="7" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5"/>
          <text x="14" y="108" font-size="9" fill="#95D5B2" font-family="JetBrains Mono, monospace">P0</text>
          <text x="58" y="14" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">P1</text>
          <text x="158" y="14" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">P2</text>
          <text x="197" y="108" font-size="9" fill="#95D5B2" font-family="JetBrains Mono, monospace">P3</text>
          <style>
            .p03c3-curve { animation: p03c3draw 4s ease-in-out infinite; }
            .p03c3-dot   { animation: p03c3dot 4s ease-in-out infinite; }
            @keyframes p03c3draw { 0%,5%{stroke-dashoffset:320} 65%,90%{stroke-dashoffset:0} 97%,100%{stroke-dashoffset:320} }
            @keyframes p03c3dot {
              0%{cx:30;cy:90;opacity:0}
              8%{opacity:1}
              25%{cx:80;cy:40}
              50%{cx:120;cy:22}
              75%{cx:165;cy:40}
              88%{cx:210;cy:85;opacity:1}
              93%,100%{cx:210;cy:85;opacity:0}
            }
          </style>
        </svg>
        <span class="p03-concept-en">Cubic Bézier</span>
        <h3 class="p03-concept-title">三次贝塞尔曲线</h3>
        <p class="p03-concept-desc">由 4 个点定义：2 个端点（P0、P3 锚点）+ 2 个控制点（P1、P2）。Illustrator 钢笔工具默认使用三次贝塞尔。</p>
      </div>

    </div>
  </div>
</section>

<!-- S2 交互式编辑器 -->
<section class="section-dark" id="p03-s2" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-caption);letter-spacing:0.1em;text-transform:uppercase;color:var(--module-3);font-weight:700;font-family:var(--font-heading);margin-bottom:var(--space-sm);">动手实践</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-sm);">交互式贝塞尔编辑器</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;">拖拽锚点和控制手柄，亲眼看贝塞尔曲线如何响应你的每一次调整。</p>
    </div>
    <div class="p03-editor-layout" id="p03-editor-layout">
      <!-- 左：控制面板 -->
      <div class="p03-panel p03-control-panel">
        <div class="p03-panel-title">控制面板</div>
        <div class="p03-control-group">
          <div style="font-size:0.78rem;color:var(--text-on-dark-3);margin-bottom:4px;font-family:var(--font-heading);">曲线模式</div>
          <div class="p03-radio-row">
            <label class="p03-radio-label">
              <input type="radio" name="p03-mode" value="cubic" checked> 三次贝塞尔
            </label>
            <label class="p03-radio-label">
              <input type="radio" name="p03-mode" value="quadratic"> 二次贝塞尔
            </label>
          </div>
          <div class="p03-toggle-row">
            <span>显示手柄</span>
            <label class="p03-toggle"><input type="checkbox" id="p03-show-handles" checked><span class="p03-toggle-slider"></span></label>
          </div>
          <div class="p03-toggle-row">
            <span>显示网格</span>
            <label class="p03-toggle"><input type="checkbox" id="p03-show-grid" checked><span class="p03-toggle-slider"></span></label>
          </div>
          <div class="p03-coords" id="p03-coords">拖拽点查看坐标</div>
          <button class="p03-btn-reset" id="p03-btn-reset">重置曲线</button>
        </div>
      </div>
      <!-- 中：Canvas -->
      <div>
        <div class="p03-canvas-wrap">
          <canvas id="p03-canvas"></canvas>
          <div class="p03-canvas-hint">拖拽锚点或控制手柄</div>
        </div>
        <button class="p03-fullscreen-btn" id="p03-fullscreen-btn">全屏编辑</button>
      </div>
      <!-- 右：预设库 -->
      <div class="p03-panel p03-presets-panel" id="p03-presets-panel">
        <div class="p03-panel-title">预设曲线</div>
        ${PRESETS.map((p, i) => `
        <button class="p03-preset-btn" data-preset="${i}">
          <span class="p03-preset-icon">${p.icon}</span>
          <span class="p03-preset-name">${p.name}</span>
          <span class="p03-preset-desc">${p.desc}</span>
        </button>`).join('')}
      </div>
    </div>
  </div>
</section>

<!-- S3 科研应用场景 -->
<section class="section-light" id="p03-s3" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-caption);letter-spacing:0.1em;text-transform:uppercase;color:var(--module-3);font-weight:700;font-family:var(--font-heading);margin-bottom:var(--space-sm);">实战应用</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-sm);">贝塞尔曲线在科研图中的应用</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;">从流程图的弯曲箭头到生物图的有机轮廓，贝塞尔是科研绘图的通用语言。</p>
    </div>

    <!-- 场景1 -->
    <div class="p03-app-row" style="margin-bottom:var(--space-3xl);">
      <div class="p03-app-visual">
        <svg viewBox="0 0 320 200" width="100%" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="75" width="90" height="50" rx="8" fill="#f0fdf4" stroke="#95D5B2" stroke-width="1.5"/>
          <text x="65" y="96" text-anchor="middle" font-size="11" fill="#1d1d1f" font-family="Noto Sans SC, sans-serif">数据采集</text>
          <text x="65" y="112" text-anchor="middle" font-size="10" fill="#6e6e73" font-family="Noto Sans SC, sans-serif">Raw Data</text>
          <rect x="210" y="75" width="90" height="50" rx="8" fill="#f0fdf4" stroke="#95D5B2" stroke-width="1.5"/>
          <text x="255" y="96" text-anchor="middle" font-size="11" fill="#1d1d1f" font-family="Noto Sans SC, sans-serif">统计分析</text>
          <text x="255" y="112" text-anchor="middle" font-size="10" fill="#6e6e73" font-family="Noto Sans SC, sans-serif">Analysis</text>
          <path d="M110 90 C150 40 170 40 210 90" stroke="#95D5B2" stroke-width="2" fill="none" stroke-linecap="round"/>
          <polygon points="210,90 200,83 204,94" fill="#95D5B2"/>
          <rect x="115" y="148" width="90" height="40" rx="8" fill="#e0f2fe" stroke="#7EC8E3" stroke-width="1.5"/>
          <text x="160" y="164" text-anchor="middle" font-size="11" fill="#1d1d1f" font-family="Noto Sans SC, sans-serif">结果可视化</text>
          <text x="160" y="179" text-anchor="middle" font-size="9" fill="#6e6e73" font-family="Noto Sans SC, sans-serif">Visualization</text>
          <path d="M255 125 C255 158 210 168 205 168" stroke="#7EC8E3" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
          <polygon points="205,168 214,162 214,174" fill="#7EC8E3"/>
        </svg>
      </div>
      <div class="p03-app-info">
        <div class="p03-app-label">场景一</div>
        <h3 class="p03-app-title">弯曲连接线<br>流程图箭头</h3>
        <p class="p03-app-desc">流程图中的弯曲箭头远比直线更具视觉层次感，引导读者目光流动。</p>
        <ul class="p03-app-steps">
          <li>钢笔工具点击起点，拖拽创建弯曲路径</li>
          <li>描边轮廓化（Object → Expand）后添加箭头</li>
          <li>使用 Pathfinder 联集合并箭头头部</li>
        </ul>
        <div class="p03-code-block">
          <pre><span class="p03-code-comment"># R ggplot2 中的弯曲箭头</span>
library(ggplot2)
ggplot(data, aes(x, y)) +
  geom_curve(
    aes(xend=x2, yend=y2),
    curvature = 0.3,
    arrow = arrow(length=unit(0.2,"cm"))
  )</pre>
        </div>
      </div>
    </div>

    <hr class="p03-app-divider">

    <!-- 场景2 -->
    <div class="p03-app-row reverse" style="margin-bottom:var(--space-3xl);">
      <div class="p03-app-visual">
        <svg viewBox="0 0 300 200" width="100%" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 30 C195 25 230 60 235 100 C240 140 215 180 170 185 C125 190 80 168 65 130 C50 92 68 45 100 35 C115 30 135 32 150 30Z" fill="rgba(149,213,178,0.15)" stroke="#95D5B2" stroke-width="2"/>
          <ellipse cx="145" cy="105" rx="35" ry="28" fill="rgba(126,200,227,0.2)" stroke="#7EC8E3" stroke-width="1.5" stroke-dasharray="5 3"/>
          <circle cx="138" cy="100" r="4" fill="rgba(149,213,178,0.6)"/>
          <circle cx="155" cy="112" r="3" fill="rgba(149,213,178,0.4)"/>
          <circle cx="125" cy="118" r="2.5" fill="rgba(149,213,178,0.35)"/>
          <text x="60" y="196" font-size="8.5" fill="#95D5B2" font-family="JetBrains Mono, monospace">有机轮廓（贝塞尔）</text>
          <text x="104" y="80" font-size="8.5" fill="#7EC8E3" font-family="JetBrains Mono, monospace">细胞核</text>
        </svg>
      </div>
      <div class="p03-app-info">
        <div class="p03-app-label">场景二</div>
        <h3 class="p03-app-title">有机轮廓<br>生物形态图</h3>
        <p class="p03-app-desc">生物科研图中的细胞、器官、组织切片需要有机曲线，规则的矩形或圆形无法表达自然形态。</p>
        <ul class="p03-app-steps">
          <li>钢笔工具点击创建锚点，拖拽生成控制手柄</li>
          <li>按住 Alt 键单独调整一侧手柄（非平滑节点）</li>
          <li>闭合路径后填色，叠加渐变表现立体感</li>
          <li>导出为 SVG 保持无限缩放品质</li>
        </ul>
      </div>
    </div>

    <hr class="p03-app-divider">

    <!-- 场景3 -->
    <div class="p03-app-row">
      <div class="p03-app-visual" style="background:#0f111a;">
        <div style="width:100%;max-width:280px;">
          <div style="font-size:0.75rem;color:var(--module-3);font-family:var(--font-heading);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:8px;">SVG Path Data</div>
          <div style="background:rgba(0,0,0,0.4);border-radius:8px;padding:14px 16px;border:1px solid rgba(149,213,178,0.15);">
            <pre style="font-family:var(--font-code);font-size:0.78rem;color:#a8d8a8;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;line-height:1.9;margin:0;"><span style="color:rgba(168,216,168,0.5)">/* MoveTo 起点 */</span>
M 50,100
<span style="color:rgba(168,216,168,0.5)">/* CurveTo 三次贝塞尔 */</span>
C 50,20 150,20 150,100
<span style="color:rgba(168,216,168,0.5)">/* QuadraticCurveTo */</span>
Q 200,20 250,100
<span style="color:rgba(168,216,168,0.5)">/* LineTo 直线 */</span>
L 280,100
<span style="color:rgba(168,216,168,0.5)">/* ClosePath */</span>
Z</pre>
          </div>
        </div>
      </div>
      <div class="p03-app-info">
        <div class="p03-app-label">场景三</div>
        <h3 class="p03-app-title">SVG Path 数据<br>代码集成</h3>
        <p class="p03-app-desc">理解 SVG path 命令，可在 R/Python/LaTeX/HTML 中直接嵌入矢量图形，无需外部文件依赖。</p>
        <ul class="p03-app-steps">
          <li><strong>M (x,y)</strong>：MoveTo，移动到起点，不绘制</li>
          <li><strong>L (x,y)</strong>：LineTo，绘制直线</li>
          <li><strong>C (x1,y1,x2,y2,x,y)</strong>：三次贝塞尔（2 控制点 + 终点）</li>
          <li><strong>Q (x1,y1,x,y)</strong>：二次贝塞尔（1 控制点 + 终点）</li>
          <li><strong>Z</strong>：ClosePath，闭合路径</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- S4 挑战模式 -->
<section class="section-dark" id="p03-s4" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-caption);letter-spacing:0.1em;text-transform:uppercase;color:var(--module-3);font-weight:700;font-family:var(--font-heading);margin-bottom:var(--space-sm);">挑战模式</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-sm);">复现目标曲线</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;">调整右侧曲线，尽量匹配左侧目标。得分越高，说明你对贝塞尔的掌握越精准。</p>
    </div>

    <div class="p03-challenge-tabs" id="p03-challenge-tabs">
      ${CHALLENGES.map((ch, i) => `
      <button class="p03-ch-tab${i === 0 ? ' active' : ''}" data-ch="${i}">${ch.difficulty} ${ch.name}</button>`).join('')}
    </div>

    <div class="p03-challenge-layout">
      <div>
        <div class="p03-ch-label">目标曲线（只读）</div>
        <div class="p03-ch-canvas-wrap">
          <canvas id="p03-ch-target"></canvas>
        </div>
      </div>
      <div class="p03-ch-sep">
        <div class="p03-ch-vs">VS</div>
      </div>
      <div>
        <div class="p03-ch-label">你的曲线（可拖拽）</div>
        <div class="p03-ch-canvas-wrap">
          <canvas id="p03-ch-user"></canvas>
        </div>
      </div>
    </div>

    <div class="p03-score-display" id="p03-score">--</div>
    <div class="p03-score-label">相似度得分（满分 100）</div>
    <div class="p03-score-msg" id="p03-score-msg"></div>

    <div class="p03-ch-actions">
      <button class="btn-outline-light" id="p03-ch-reset">重置用户曲线</button>
      <button class="p03-btn-hint" id="p03-btn-hint">查看提示</button>
    </div>
    <div class="p03-hint-box" id="p03-hint-box"></div>
  </div>
</section>

<!-- Footer CTA -->
<footer class="page-footer-cta">
  <p class="page-footer-num">Module 03 / 03</p>
  <h2 class="page-footer-quote">每一根弯曲的连接线，都是一次对路径语言的运用。</h2>
  <div class="page-footer-nav">
    <button class="btn-outline-light" id="p03-prev-btn">← Illustrator 工具</button>
    <button class="btn-primary" id="p03-next-btn">图表美化实战 →</button>
  </div>
</footer>

</div>`;
}

// ── Canvas 工具函数 ──
function getCanvasPos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const clientX = (e.clientX !== undefined) ? e.clientX : (e.touches ? e.touches[0].clientX : 0);
  const clientY = (e.clientY !== undefined) ? e.clientY : (e.touches ? e.touches[0].clientY : 0);
  return {
    x: (clientX - rect.left) / rect.width,
    y: (clientY - rect.top) / rect.height,
  };
}

function findNearestPoint(pos, points, hitRadius) {
  let best = null, bestDist = Infinity;
  points.forEach((p, i) => {
    const dx = p.x - pos.x, dy = p.y - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < hitRadius && dist < bestDist) { bestDist = dist; best = i; }
  });
  return best;
}

function renderBezierCanvas(canvas, state, isTarget) {
  if (!canvas) return;
  const W = canvas.offsetWidth || 400;
  const H = canvas.offsetHeight || 300;
  if (W === 0 || H === 0) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  ctx.fillStyle = isTarget ? '#131320' : '#1a1a2e';
  ctx.fillRect(0, 0, W, H);

  if (!isTarget && state.showGrid) {
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(W * i / 10, 0); ctx.lineTo(W * i / 10, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, H * i / 10); ctx.lineTo(W, H * i / 10); ctx.stroke();
    }
  }

  const pts = state.points;
  if (!pts || pts.length < 2) return;

  const px = idx => pts[idx] ? pts[idx].x * W : 0;
  const py = idx => pts[idx] ? pts[idx].y * H : 0;

  const isCubic = state.mode !== 'quadratic';
  const minPts = isCubic ? 4 : 3;
  if (pts.length < minPts) return;

  // 手柄线
  if (!isTarget && state.showHandles) {
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(149,213,178,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(px(0), py(0)); ctx.lineTo(px(1), py(1)); ctx.stroke();
    if (isCubic && pts.length >= 4) {
      ctx.beginPath(); ctx.moveTo(px(3), py(3)); ctx.lineTo(px(2), py(2)); ctx.stroke();
    } else if (!isCubic && pts.length >= 3) {
      ctx.beginPath(); ctx.moveTo(px(2), py(2)); ctx.lineTo(px(1), py(1)); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // 曲线
  ctx.strokeStyle = isTarget ? 'rgba(149,213,178,0.7)' : '#95D5B2';
  ctx.lineWidth = isTarget ? 2 : 2.5;
  ctx.shadowColor = 'rgba(149,213,178,0.35)';
  ctx.shadowBlur = isTarget ? 4 : 8;
  ctx.beginPath();
  ctx.moveTo(px(0), py(0));
  if (isCubic && pts.length >= 4) {
    ctx.bezierCurveTo(px(1), py(1), px(2), py(2), px(3), py(3));
  } else if (!isCubic && pts.length >= 3) {
    ctx.quadraticCurveTo(px(1), py(1), px(2), py(2));
  }
  ctx.stroke();
  ctx.shadowBlur = 0;

  // 点
  const count = isCubic ? Math.min(4, pts.length) : Math.min(3, pts.length);
  for (let i = 0; i < count; i++) {
    const p = pts[i];
    const x = p.x * W, y = p.y * H;
    const isAnchor = p.type === 'anchor';
    if (!isAnchor && (isTarget || !state.showHandles)) continue;

    ctx.beginPath();
    ctx.arc(x, y, isAnchor ? 7 : 5, 0, Math.PI * 2);
    if (isAnchor) {
      ctx.fillStyle = (state.dragging === i && !isTarget) ? '#fff' : (isTarget ? 'rgba(149,213,178,0.6)' : '#95D5B2');
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else {
      ctx.strokeStyle = state.dragging === i ? '#fff' : '#7EC8E3';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = 'rgba(126,200,227,0.15)';
      ctx.fill();
    }
  }

  // 坐标
  if (!isTarget && state.dragging !== null && pts[state.dragging]) {
    const p = pts[state.dragging];
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText(`(${p.x.toFixed(3)}, ${p.y.toFixed(3)})`, 10, 18);
  }
}

// ── 评分 ──
function sampleCubicBezier(pts, n) {
  n = n || 50;
  if (pts.length < 4) return [];
  const [p0, p1, p2, p3] = pts;
  const result = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n, mt = 1 - t;
    result.push({
      x: mt*mt*mt*p0.x + 3*mt*mt*t*p1.x + 3*mt*t*t*p2.x + t*t*t*p3.x,
      y: mt*mt*mt*p0.y + 3*mt*mt*t*p1.y + 3*mt*t*t*p2.y + t*t*t*p3.y,
    });
  }
  return result;
}

function calcScore(userPts, targetPts) {
  if (!userPts || !targetPts || userPts.length < 4 || targetPts.length < 4) return 0;
  const uS = sampleCubicBezier(userPts);
  const tS = sampleCubicBezier(targetPts);
  const rmse = Math.sqrt(uS.reduce((acc, p, i) => {
    const dx = p.x - tS[i].x, dy = p.y - tS[i].y;
    return acc + dx * dx + dy * dy;
  }, 0) / uS.length);
  return Math.max(0, Math.round(100 - rmse * 280));
}

function getChallengeUserDefault(targetPts) {
  return targetPts.map(p => ({
    ...p,
    x: Math.max(0.05, Math.min(0.95, p.x + (Math.random() - 0.5) * 0.3)),
    y: Math.max(0.05, Math.min(0.95, p.y + (Math.random() - 0.5) * 0.3)),
  }));
}

// ── 事件绑定 ──
function addEvent(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ── 初始化主编辑器 ──
function initMainEditor() {
  const canvas = document.getElementById('p03-canvas');
  if (!canvas) return;
  _canvases.push(canvas);
  canvas.style.touchAction = 'none';

  requestAnimationFrame(() => renderBezierCanvas(canvas, bezierState, false));

  const isMobile = () => window.innerWidth < 768;

  addEvent(canvas, 'pointerdown', e => {
    e.preventDefault();
    const pos = getCanvasPos(canvas, e);
    const hitR = isMobile() ? 0.08 : 0.05;
    const idx = findNearestPoint(pos, bezierState.points, hitR);
    if (idx !== null) {
      bezierState.dragging = idx;
      canvas.setPointerCapture(e.pointerId);
      renderBezierCanvas(canvas, bezierState, false);
    }
  });

  addEvent(canvas, 'pointermove', e => {
    if (bezierState.dragging === null) return;
    const pos = getCanvasPos(canvas, e);
    bezierState.points[bezierState.dragging].x = Math.max(0, Math.min(1, pos.x));
    bezierState.points[bezierState.dragging].y = Math.max(0, Math.min(1, pos.y));
    const p = bezierState.points[bezierState.dragging];
    const coordsEl = document.getElementById('p03-coords');
    if (coordsEl) coordsEl.textContent = `点 ${bezierState.dragging} (${p.type})\nx: ${p.x.toFixed(3)}\ny: ${p.y.toFixed(3)}`;
    renderBezierCanvas(canvas, bezierState, false);
  });

  addEvent(canvas, 'pointerup', () => {
    bezierState.dragging = null;
    renderBezierCanvas(canvas, bezierState, false);
  });

  addEvent(canvas, 'pointercancel', () => {
    bezierState.dragging = null;
  });

  // 曲线模式切换
  document.querySelectorAll('input[name="p03-mode"]').forEach(radio => {
    addEvent(radio, 'change', () => {
      bezierState.mode = radio.value;
      if (radio.value === 'quadratic') {
        bezierState.points = [
          { x: 0.1, y: 0.8, type: 'anchor' },
          { x: 0.5, y: 0.1, type: 'control' },
          { x: 0.9, y: 0.8, type: 'anchor' },
        ];
      } else {
        bezierState.points = DEFAULT_POINTS();
      }
      renderBezierCanvas(canvas, bezierState, false);
    });
  });

  const handleToggle = document.getElementById('p03-show-handles');
  if (handleToggle) {
    addEvent(handleToggle, 'change', () => {
      bezierState.showHandles = handleToggle.checked;
      renderBezierCanvas(canvas, bezierState, false);
    });
  }

  const gridToggle = document.getElementById('p03-show-grid');
  if (gridToggle) {
    addEvent(gridToggle, 'change', () => {
      bezierState.showGrid = gridToggle.checked;
      renderBezierCanvas(canvas, bezierState, false);
    });
  }

  const resetBtn = document.getElementById('p03-btn-reset');
  if (resetBtn) {
    addEvent(resetBtn, 'click', () => {
      bezierState.points = DEFAULT_POINTS();
      bezierState.mode = 'cubic';
      bezierState.showHandles = true;
      bezierState.showGrid = true;
      bezierState.dragging = null;
      const cubicRadio = document.querySelector('input[name="p03-mode"][value="cubic"]');
      if (cubicRadio) cubicRadio.checked = true;
      const hToggle = document.getElementById('p03-show-handles');
      if (hToggle) hToggle.checked = true;
      const gToggle = document.getElementById('p03-show-grid');
      if (gToggle) gToggle.checked = true;
      const coordsEl = document.getElementById('p03-coords');
      if (coordsEl) coordsEl.textContent = '拖拽点查看坐标';
      document.querySelectorAll('.p03-preset-btn').forEach(b => b.classList.remove('active'));
      renderBezierCanvas(canvas, bezierState, false);
    });
  }

  // 预设按钮
  document.querySelectorAll('.p03-preset-btn').forEach(btn => {
    addEvent(btn, 'click', () => {
      const idx = parseInt(btn.dataset.preset, 10);
      if (PRESETS[idx]) {
        bezierState.points = PRESETS[idx].points.map(p => ({ ...p }));
        bezierState.dragging = null;
        bezierState.mode = 'cubic';
        document.querySelectorAll('.p03-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderBezierCanvas(canvas, bezierState, false);
      }
    });
  });

  // resize 重绘
  let resizeTimer = null;
  addEvent(window, 'resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => renderBezierCanvas(canvas, bezierState, false), 120);
  });
}

// ── 全屏编辑 ──
function initFullscreenEditor() {
  const btn = document.getElementById('p03-fullscreen-btn');
  if (!btn) return;

  addEvent(btn, 'click', () => {
    const modal = document.createElement('div');
    modal.className = 'p03-fullscreen-modal';
    modal.innerHTML = `
      <div class="p03-modal-header">
        <span class="p03-modal-title">贝塞尔编辑器（全屏）</span>
        <button class="p03-modal-close" id="p03-modal-close">✕</button>
      </div>
      <div class="p03-modal-canvas-wrap">
        <canvas id="p03-modal-canvas"></canvas>
      </div>`;
    document.body.appendChild(modal);

    const modalCanvas = modal.querySelector('#p03-modal-canvas');
    _canvases.push(modalCanvas);
    modalCanvas.style.touchAction = 'none';
    modalCanvas.style.width = '100%';
    modalCanvas.style.height = '100%';

    requestAnimationFrame(() => renderBezierCanvas(modalCanvas, bezierState, false));

    let modalDragging = null;

    const downFn = e => {
      e.preventDefault();
      const pos = getCanvasPos(modalCanvas, e);
      const idx = findNearestPoint(pos, bezierState.points, 0.08);
      if (idx !== null) {
        modalDragging = idx;
        bezierState.dragging = idx;
        modalCanvas.setPointerCapture(e.pointerId);
        renderBezierCanvas(modalCanvas, bezierState, false);
      }
    };
    const moveFn = e => {
      if (modalDragging === null) return;
      const pos = getCanvasPos(modalCanvas, e);
      bezierState.points[modalDragging].x = Math.max(0, Math.min(1, pos.x));
      bezierState.points[modalDragging].y = Math.max(0, Math.min(1, pos.y));
      renderBezierCanvas(modalCanvas, bezierState, false);
    };
    const upFn = () => {
      modalDragging = null;
      bezierState.dragging = null;
      renderBezierCanvas(modalCanvas, bezierState, false);
    };

    modalCanvas.addEventListener('pointerdown', downFn);
    modalCanvas.addEventListener('pointermove', moveFn);
    modalCanvas.addEventListener('pointerup', upFn);
    modalCanvas.addEventListener('pointercancel', upFn);

    const closeBtn = modal.querySelector('#p03-modal-close');
    closeBtn.addEventListener('click', () => {
      const mainCanvas = document.getElementById('p03-canvas');
      if (mainCanvas) renderBezierCanvas(mainCanvas, bezierState, false);
      modal.remove();
      _canvases = _canvases.filter(c => c !== modalCanvas);
    });
  });
}

// ── 挑战模式 ──
function initChallenge() {
  const targetCanvas = document.getElementById('p03-ch-target');
  const userCanvas = document.getElementById('p03-ch-user');
  if (!targetCanvas || !userCanvas) return;
  _canvases.push(targetCanvas, userCanvas);
  userCanvas.style.touchAction = 'none';

  const scoreEl = document.getElementById('p03-score');
  const scoreMsgEl = document.getElementById('p03-score-msg');

  function updateScore() {
    if (!scoreEl || !challengeState.userPoints) return;
    const ch = CHALLENGES[challengeState.currentIndex];
    const score = calcScore(challengeState.userPoints, ch.target);
    scoreEl.textContent = score;
    if (scoreMsgEl) {
      if (score >= 85) {
        scoreMsgEl.textContent = '🎉 优秀！你已掌握这条曲线！';
        scoreMsgEl.style.color = '#95D5B2';
      } else if (score >= 70) {
        scoreMsgEl.textContent = '良好，继续微调，接近目标了';
        scoreMsgEl.style.color = '#7EC8E3';
      } else {
        scoreMsgEl.textContent = '继续努力，对比目标曲线调整手柄方向';
        scoreMsgEl.style.color = 'var(--text-on-dark-3)';
      }
    }
  }

  function loadChallenge(idx) {
    const ch = CHALLENGES[idx];
    if (!ch) return;
    challengeState.currentIndex = idx;
    challengeState.userPoints = getChallengeUserDefault(ch.target);
    const hintBox = document.getElementById('p03-hint-box');
    if (hintBox) { hintBox.classList.remove('show'); hintBox.textContent = ''; }
    requestAnimationFrame(() => {
      renderBezierCanvas(targetCanvas, { points: ch.target, mode: 'cubic', showHandles: false, showGrid: false, dragging: null }, true);
      renderBezierCanvas(userCanvas, { points: challengeState.userPoints, mode: 'cubic', showHandles: true, showGrid: false, dragging: null }, false);
      updateScore();
    });
  }

  // 标签切换
  document.querySelectorAll('.p03-ch-tab').forEach(btn => {
    addEvent(btn, 'click', () => {
      const idx = parseInt(btn.dataset.ch, 10);
      document.querySelectorAll('.p03-ch-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadChallenge(idx);
    });
  });

  // 用户 Canvas 拖拽
  let chDragging = null;

  addEvent(userCanvas, 'pointerdown', e => {
    e.preventDefault();
    if (!challengeState.userPoints) return;
    const pos = getCanvasPos(userCanvas, e);
    const hitR = window.innerWidth < 768 ? 0.1 : 0.07;
    const idx = findNearestPoint(pos, challengeState.userPoints, hitR);
    if (idx !== null) {
      chDragging = idx;
      userCanvas.setPointerCapture(e.pointerId);
    }
  });

  addEvent(userCanvas, 'pointermove', e => {
    if (chDragging === null || !challengeState.userPoints) return;
    const pos = getCanvasPos(userCanvas, e);
    challengeState.userPoints[chDragging].x = Math.max(0, Math.min(1, pos.x));
    challengeState.userPoints[chDragging].y = Math.max(0, Math.min(1, pos.y));
    renderBezierCanvas(userCanvas, { points: challengeState.userPoints, mode: 'cubic', showHandles: true, showGrid: false, dragging: chDragging }, false);
    updateScore();
  });

  addEvent(userCanvas, 'pointerup', () => {
    chDragging = null;
    if (challengeState.userPoints) {
      renderBezierCanvas(userCanvas, { points: challengeState.userPoints, mode: 'cubic', showHandles: true, showGrid: false, dragging: null }, false);
    }
  });

  addEvent(userCanvas, 'pointercancel', () => { chDragging = null; });

  // 重置
  const chResetBtn = document.getElementById('p03-ch-reset');
  if (chResetBtn) {
    addEvent(chResetBtn, 'click', () => {
      const ch = CHALLENGES[challengeState.currentIndex];
      challengeState.userPoints = getChallengeUserDefault(ch.target);
      renderBezierCanvas(userCanvas, { points: challengeState.userPoints, mode: 'cubic', showHandles: true, showGrid: false, dragging: null }, false);
      updateScore();
    });
  }

  // 提示
  const hintBtn = document.getElementById('p03-btn-hint');
  const hintBox = document.getElementById('p03-hint-box');
  if (hintBtn && hintBox) {
    addEvent(hintBtn, 'click', () => {
      const ch = CHALLENGES[challengeState.currentIndex];
      hintBox.textContent = `提示：${ch.hint}`;
      hintBox.classList.toggle('show');
    });
  }

  // resize
  let chResizeTimer = null;
  addEvent(window, 'resize', () => {
    clearTimeout(chResizeTimer);
    chResizeTimer = setTimeout(() => {
      const ch = CHALLENGES[challengeState.currentIndex];
      renderBezierCanvas(targetCanvas, { points: ch.target, mode: 'cubic', showHandles: false, showGrid: false, dragging: null }, true);
      if (challengeState.userPoints) {
        renderBezierCanvas(userCanvas, { points: challengeState.userPoints, mode: 'cubic', showHandles: true, showGrid: false, dragging: null }, false);
      }
    }, 120);
  });

  // 初始加载
  loadChallenge(0);
}

// ── 快捷导航 ──
function initQuicknav() {
  document.querySelectorAll('#p03-quicknav .hero-quicknav__item').forEach(btn => {
    addEvent(btn, 'click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── init ──
export function init() {
  // Hero 动画
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p03-hero .hero-eyebrow',    { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p03-hero .page-hero-title', { opacity: 0, y: 30 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p03-hero .page-hero-sub',   { opacity: 0, y: 20 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p03-hero .p03-hero-tagline',{ opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p03-quicknav',              { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p03-scroll-hint',           { opacity: 0, y: 15 }, { opacity: 1,   y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // S1 概念卡片
  fadeIn('.p03-concept-card', { stagger: 0.18, y: 50, start: 'top 88%' });

  // S2 编辑器区域
  fadeIn('#p03-editor-layout');

  // S3 应用行
  document.querySelectorAll('.p03-app-row').forEach(row => fadeIn(row));

  // S4 挑战区
  fadeIn('#p03-challenge-tabs');
  fadeIn('.p03-challenge-layout');

  // 各模块初始化
  initQuicknav();
  initMainEditor();
  initFullscreenEditor();
  initChallenge();

  // Footer 导航
  const prevBtn = document.getElementById('p03-prev-btn');
  const nextBtn = document.getElementById('p03-next-btn');
  if (prevBtn) addEvent(prevBtn, 'click', () => navigateTo('m3-p2'));
  if (nextBtn) addEvent(nextBtn, 'click', () => navigateTo('m3-p4'));
}

// ── destroy ──
export function destroy() {
  killAll();
  _eventHandlers.forEach(({ el, type, fn, opts }) => {
    if (el) el.removeEventListener(type, fn, opts);
  });
  _eventHandlers = [];
  _observers.forEach(o => o.disconnect());
  _observers = [];
  _canvases.forEach(canvas => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  _canvases = [];

  // 清除全屏 modal
  const modal = document.querySelector('.p03-fullscreen-modal');
  if (modal) modal.remove();

  // 重置状态
  bezierState = {
    points: DEFAULT_POINTS(),
    mode: 'cubic',
    showHandles: true,
    showGrid: true,
    dragging: null,
  };
  challengeState = { currentIndex: 0, userPoints: null };
}
