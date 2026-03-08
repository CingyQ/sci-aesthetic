// p04-accessibility.js — 色彩与阅读无障碍（Color & Reading Accessibility）
// WCAG 对比度检测 + 图表排版规范 + 字体可读性 + 设计检查清单

import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { getContrastRatio } from '../../utils/color-math.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ─────────────────────────────────────────────
// 常量
// ─────────────────────────────────────────────

// 图表排版推荐值
const CHART_DEFAULTS = {
  titleSize: 16,
  subtitleSize: 12,
  axisLabelSize: 11,
  tickSize: 10,
  legendSize: 10,
  annotationSize: 9,
  titleWeight: 700,
  lineHeight: 1.3,
};

// 字号阶梯（pt 值，科研出版常用）
const FONT_SCALE = [
  { role: '图表主标题', ptMin: 12, ptRec: 14, ptMax: 18, css: 'font-weight: 700' },
  { role: '图表副标题', ptMin: 10, ptRec: 12, ptMax: 14, css: 'font-weight: 400; opacity: 0.7' },
  { role: '坐标轴标题', ptMin: 10, ptRec: 11, ptMax: 13, css: 'font-weight: 600' },
  { role: '刻度标签',   ptMin: 8,  ptRec: 10, ptMax: 12, css: 'font-weight: 400' },
  { role: '图例文字',   ptMin: 8,  ptRec: 10, ptMax: 12, css: 'font-weight: 400' },
  { role: '注释/标注',  ptMin: 7,  ptRec: 9,  ptMax: 11, css: 'font-weight: 400; font-style: italic' },
];

// 期刊字体要求
const JOURNAL_FONTS = [
  { journal: 'Nature', font: 'Helvetica / Arial', sizeRange: '5–7 pt（印刷）', note: '标题不超过 8pt' },
  { journal: 'Science', font: 'Helvetica', sizeRange: '6–8 pt', note: '不接受衬线字体用于图表' },
  { journal: 'Cell', font: 'Arial / Helvetica', sizeRange: '6–8 pt', note: '推荐无衬线' },
  { journal: 'PNAS', font: 'Arial', sizeRange: '6–8 pt', note: '图例 ≥6pt' },
  { journal: 'PLoS ONE', font: 'Arial', sizeRange: '8–12 pt', note: '所有文字 ≥8pt' },
  { journal: 'IEEE', font: 'Times New Roman / Arial', sizeRange: '8–10 pt', note: '坐标轴标签 ≥8pt' },
];

// 字体对比
const FONT_FAMILIES = [
  { name: 'Arial', family: 'Arial, sans-serif', type: '无衬线', use: '最安全的图表字体，几乎所有期刊接受' },
  { name: 'Helvetica', family: 'Helvetica, Arial, sans-serif', type: '无衬线', use: 'Nature / Science 推荐，最常用的科研字体' },
  { name: 'Times New Roman', family: "Times New Roman, serif", type: '衬线', use: '正文首选，图表中较少使用' },
  { name: 'Consolas', family: 'Consolas, JetBrains Mono, monospace', type: '等宽', use: '代码、数值表格、基因序列' },
];

// ─────────────────────────────────────────────
// 页面状态
// ─────────────────────────────────────────────

let state = {
  fgColor: '#1d1d1f',
  bgColor: '#ffffff',
  previewFontSize: 16,
  // 图表排版控制
  chart: { ...CHART_DEFAULTS },
  // 行高对比
  lineHeightA: 1.2,
  lineHeightB: 1.8,
};

// ─────────────────────────────────────────────
// render()
// ─────────────────────────────────────────────

export function render() {
  return `
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
  position: absolute; bottom: 28px; left: 50%;
  transform: translateX(-50%);
  font-size: var(--text-caption); color: var(--text-on-dark-3);
  animation: p4-float 2s ease-in-out infinite;
}
@keyframes p4-float { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }

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
.p4-badge--pass { background: rgba(52,199,89,0.12); color: #34c759; }
.p4-badge--fail { background: rgba(255,59,48,0.12); color: #ff3b30; }
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
.p4-lh-tag--bad { background: rgba(255,59,48,0.1); color: #ff3b30; }
.p4-lh-tag--good { background: rgba(52,199,89,0.1); color: #34c759; }
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
.p4-check-ex-tag.bad { color: #FF6B6B; }
.p4-check-ex-tag.good { color: #4CAF50; }
.p4-check-ex-content {
  font-size: 0.8rem; color: var(--text-on-dark-2); line-height: 1.5;
}

/* ── Footer ── */
.p4-footer {
  background: var(--bg-dark-deep); color: var(--text-on-dark);
  padding: var(--space-2xl) var(--space-lg); text-align: center;
  border-top: 1px solid var(--border-dark);
}
.p4-footer-summary {
  font-family: var(--font-display); font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 700; max-width: 600px; margin: 0 auto var(--space-lg);
  line-height: 1.3; letter-spacing: -0.01em;
}
.p4-footer-links {
  display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;
}
.p4-nav-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: var(--radius-full);
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; text-decoration: none; border: none;
}
.p4-nav-link--primary { background: var(--accent); color: #1d1d1f; }
.p4-nav-link--primary:hover { background: var(--accent-hover); transform: translateY(-2px); }
.p4-nav-link--ghost { background: transparent; color: var(--text-on-dark); border: 1.5px solid var(--border-dark); }
.p4-nav-link--ghost:hover { border-color: var(--accent); color: var(--accent); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .p4-typo-layout { flex-direction: column; }
  .p4-typo-controls { width: 100%; }
}
@media (max-width: 768px) {
  .p4-contrast-section, .p4-typo-section,
  .p4-font-section, .p4-check-section, .p4-footer {
    padding: var(--space-xl) var(--space-sm);
  }
  .p4-hero { padding: 80px var(--space-sm) 48px; }
  .p4-contrast-pickers { flex-direction: column; gap: var(--space-sm); }
  .p4-font-compare { grid-template-columns: 1fr; }
  .p4-check-grid { grid-template-columns: 1fr; }
  .p4-lh-compare { flex-direction: column; }
  .p4-footer-links { flex-direction: column; align-items: center; }
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
  </div>
  <div class="p4-scroll-hint" style="position:absolute;left:50%;transform:translateX(-50%);font-size:var(--text-caption);color:var(--text-on-dark-3);">↓ 向下探索</div>
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
    ${FONT_FAMILIES.map(f => `
    <div class="p4-font-card">
      <div class="p4-font-card-name" style="font-family:${f.family};">${f.name}</div>
      <div class="p4-font-card-type">${f.type}</div>
      <div class="p4-font-card-sample" style="font-family:${f.family};">
        AaBbCcDd 0123456789<br>
        科研数据 可视化 μ σ² Δ
      </div>
      <div class="p4-font-card-use">${f.use}</div>
    </div>`).join('')}
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
        ${FONT_SCALE.map(s => `
        <tr>
          <td class="p4-scale-role">${s.role}</td>
          <td class="p4-scale-range">${s.ptMin}</td>
          <td class="p4-scale-rec">${s.ptRec}</td>
          <td class="p4-scale-range">${s.ptMax}</td>
          <td><span class="p4-scale-preview" style="font-size:${s.ptRec * 1.333}px;${s.css};">示例 Sample</span></td>
        </tr>`).join('')}
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
        ${JOURNAL_FONTS.map(j => `
        <tr>
          <td class="p4-journal-name">${j.journal}</td>
          <td class="p4-journal-font">${j.font}</td>
          <td>${j.sizeRange}</td>
          <td>${j.note}</td>
        </tr>`).join('')}
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
<section class="p4-footer" id="p4-footer">
  <p class="p4-footer-summary">
    可读性不是妥协，是让科学发现触达更多人的方式。
  </p>
  <div class="p4-footer-links">
    <button class="p4-nav-link p4-nav-link--primary" id="p4-next-btn">
      下一篇：图表选择指南 →
    </button>
    <button class="p4-nav-link p4-nav-link--ghost" id="p4-prev-btn">
      ← 配色生成器
    </button>
    <button class="p4-nav-link p4-nav-link--ghost" id="p4-m1-btn">
      ↩ 模块一首页
    </button>
  </div>
</section>

</div>`;
}

// ═══════════════════════════════════════════════════
// init()
// ═══════════════════════════════════════════════════

export function init() {
  // Hero animations
  gsap.fromTo('.p4-anim-0', { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.7, delay: 0.1,  ease: 'power3.out' });
  gsap.fromTo('.p4-anim-1', { opacity: 0, y: 40 }, { opacity: 1,   y: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  gsap.fromTo('.p4-anim-2', { opacity: 0, y: 30 }, { opacity: 0.5, y: 0, duration: 0.8, delay: 0.4,  ease: 'power3.out' });
  gsap.fromTo('.p4-anim-3', { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, delay: 0.55, ease: 'power3.out' });
  gsap.fromTo('.p4-anim-4', { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, delay: 0.7,  ease: 'power3.out' });

  // Scroll reveals
  fadeIn('.p4-contrast-card', { y: 40 });
  fadeIn('#p4-typo-section .p4-section-header', { y: 40 });
  scaleReveal('.p4-typo-controls');
  scaleReveal('.p4-typo-preview');
  fadeIn('#p4-font-section .p4-section-header', { y: 40 });
  fadeIn('.p4-font-compare', { y: 30 });
  fadeIn('.p4-scale-table-wrap', { y: 30 });
  fadeIn('.p4-lh-compare', { y: 30 });
  fadeIn('.p4-journal-table-wrap', { y: 30 });
  fadeIn('#p4-check-section .p4-section-header', { y: 40 });

  // Stagger check cards
  gsap.utils.toArray('.p4-check-card').forEach((card, i) => {
    fadeIn(card, { y: 30, delay: i * 0.1 });
  });

  fadeIn('#p4-footer', { y: 30 });

  // Quick nav
  document.querySelectorAll('#p4-hero-nav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Setup interactions
  try { setupContrastChecker(); } catch(e) { console.error('p04 setupContrastChecker:', e); }
  try { setupChartTypography(); } catch(e) { console.error('p04 setupChartTypography:', e); }
  try { setupNavButtons(); } catch(e) { console.error('p04 setupNavButtons:', e); }
}

// ═══════════════════════════════════════════════════
// WCAG 对比度检测器
// ═══════════════════════════════════════════════════

function setupContrastChecker() {
  const fgPicker = document.getElementById('p4-fg-picker');
  const bgPicker = document.getElementById('p4-bg-picker');
  const fgHex = document.getElementById('p4-fg-hex');
  const bgHex = document.getElementById('p4-bg-hex');
  const fgSwatch = document.getElementById('p4-fg-swatch');
  const bgSwatch = document.getElementById('p4-bg-swatch');

  function updateContrast() {
    const ratio = getContrastRatio(state.fgColor, state.bgColor);
    const r = ratio.toFixed(2);

    document.getElementById('p4-ratio-num').textContent = r;

    // Badges
    const passAA = ratio >= 4.5;
    const passAALarge = ratio >= 3;
    const passAAA = ratio >= 7;
    setBadge('p4-badge-aa', passAA, 'AA 正文');
    setBadge('p4-badge-aa-large', passAALarge, 'AA 大字');
    setBadge('p4-badge-aaa', passAAA, 'AAA');

    // Bar
    const pct = Math.min(100, (ratio / 21) * 100);
    const barEl = document.getElementById('p4-bar-fill');
    if (barEl) {
      barEl.style.width = pct + '%';
      barEl.style.background = ratio >= 4.5 ? 'var(--color-success)' : ratio >= 3 ? '#F0B27A' : '#ff3b30';
    }

    // Preview box
    const previewBox = document.getElementById('p4-preview-box');
    if (previewBox) {
      previewBox.style.background = state.bgColor;
      previewBox.style.color = state.fgColor;
    }

    // Swatches
    if (fgSwatch) fgSwatch.style.background = state.fgColor;
    if (bgSwatch) bgSwatch.style.background = state.bgColor;
  }

  function setBadge(id, pass, label) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = `p4-badge ${pass ? 'p4-badge--pass' : 'p4-badge--fail'}`;
    el.textContent = `${pass ? '✓' : '✗'} ${label}`;
  }

  function bindColorInput(picker, hex, isField, isFg) {
    if (!picker || !hex) return;
    picker.addEventListener('input', e => {
      const v = e.target.value;
      if (isFg) state.fgColor = v;
      else state.bgColor = v;
      hex.value = v.toUpperCase();
      updateContrast();
    });
    hex.addEventListener('input', e => {
      let v = e.target.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        if (isFg) state.fgColor = v;
        else state.bgColor = v;
        picker.value = v;
        updateContrast();
      }
    });
  }

  bindColorInput(fgPicker, fgHex, false, true);
  bindColorInput(bgPicker, bgHex, false, false);

  // Font size stepper
  const decBtn = document.getElementById('p4-font-dec');
  const incBtn = document.getElementById('p4-font-inc');
  const sizeVal = document.getElementById('p4-font-size-val');
  const previewNormal = document.getElementById('p4-preview-normal');

  function updateFontSize() {
    if (sizeVal) sizeVal.textContent = state.previewFontSize + 'px';
    if (previewNormal) previewNormal.style.fontSize = state.previewFontSize + 'px';
  }

  if (decBtn) decBtn.addEventListener('click', () => {
    state.previewFontSize = Math.max(8, state.previewFontSize - 1);
    updateFontSize();
  });
  if (incBtn) incBtn.addEventListener('click', () => {
    state.previewFontSize = Math.min(32, state.previewFontSize + 1);
    updateFontSize();
  });

  updateContrast();
}

// ═══════════════════════════════════════════════════
// 图表排版交互式 D3 预览
// ═══════════════════════════════════════════════════

function setupChartTypography() {
  const canvas = document.getElementById('p4-chart-canvas');
  if (!canvas) return;

  // 示例数据
  const data = [
    { group: 'Control', a: 23, b: 18, c: 15 },
    { group: 'Treatment A', a: 35, b: 28, c: 22 },
    { group: 'Treatment B', a: 41, b: 32, c: 27 },
    { group: 'Treatment C', a: 29, b: 24, c: 19 },
  ];
  const keys = ['a', 'b', 'c'];
  const labels = ['Gene α', 'Gene β', 'Gene γ'];
  const colors = ['#7EC8E3', '#5BA3C9', '#3A7CA5'];

  function renderChart() {
    canvas.innerHTML = '';
    const rect = canvas.getBoundingClientRect();
    const W = rect.width || 600;
    const H = rect.height || 450;
    const c = state.chart;

    const margin = {
      top: 20 + c.titleSize + c.subtitleSize + 8,
      right: 100,
      bottom: 20 + c.axisLabelSize + c.tickSize + 8,
      left: 20 + c.axisLabelSize + c.tickSize + 8,
    };

    const svg = d3.select(canvas).append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Background
    svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#ffffff');

    const plotW = W - margin.left - margin.right;
    const plotH = H - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const x0 = d3.scaleBand().domain(data.map(d => d.group)).range([0, plotW]).padding(0.25);
    const x1 = d3.scaleBand().domain(keys).range([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear().domain([0, 50]).range([plotH, 0]);

    // Grid lines
    g.selectAll('.grid-line')
      .data(y.ticks(5))
      .enter().append('line')
      .attr('x1', 0).attr('x2', plotW)
      .attr('y1', d => y(d)).attr('y2', d => y(d))
      .attr('stroke', '#e8e8e8').attr('stroke-dasharray', '3,3');

    // Bars
    const groups = g.selectAll('.bar-group')
      .data(data).enter().append('g')
      .attr('transform', d => `translate(${x0(d.group)},0)`);

    groups.selectAll('rect')
      .data(d => keys.map(k => ({ key: k, value: d[k] })))
      .enter().append('rect')
      .attr('x', d => x1(d.key))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => plotH - y(d.value))
      .attr('fill', (d, i) => colors[i])
      .attr('rx', 2);

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${plotH})`)
      .call(d3.axisBottom(x0).tickSize(0))
      .selectAll('text')
      .attr('font-size', c.tickSize + 'px')
      .attr('fill', '#555');

    g.select('.domain').attr('stroke', '#ccc');

    // Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-4))
      .selectAll('text')
      .attr('font-size', c.tickSize + 'px')
      .attr('fill', '#555');

    // Axis labels
    svg.append('text')
      .attr('x', margin.left + plotW / 2)
      .attr('y', H - 6)
      .attr('text-anchor', 'middle')
      .attr('font-size', c.axisLabelSize + 'px')
      .attr('font-weight', 600)
      .attr('fill', '#333')
      .text('实验组');

    svg.append('text')
      .attr('x', -(margin.top + plotH / 2))
      .attr('y', 14)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .attr('font-size', c.axisLabelSize + 'px')
      .attr('font-weight', 600)
      .attr('fill', '#333')
      .text('表达量 (FPKM)');

    // Title
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', c.titleSize + 4)
      .attr('font-size', c.titleSize + 'px')
      .attr('font-weight', c.titleWeight)
      .attr('fill', '#1d1d1f')
      .text('三组基因在不同处理下的表达量');

    // Subtitle
    svg.append('text')
      .attr('x', margin.left)
      .attr('y', c.titleSize + c.subtitleSize + 10)
      .attr('font-size', c.subtitleSize + 'px')
      .attr('fill', '#888')
      .text('数据来源：RNA-seq, n = 3 replicates');

    // Legend
    const legendY = margin.top + 10;
    const legendX = W - margin.right + 16;
    const legendG = svg.append('g').attr('transform', `translate(${legendX},${legendY})`);

    keys.forEach((k, i) => {
      const ly = i * (c.legendSize + 10);
      legendG.append('rect')
        .attr('x', 0).attr('y', ly)
        .attr('width', c.legendSize).attr('height', c.legendSize)
        .attr('fill', colors[i]).attr('rx', 2);
      legendG.append('text')
        .attr('x', c.legendSize + 6).attr('y', ly + c.legendSize * 0.8)
        .attr('font-size', c.legendSize + 'px')
        .attr('fill', '#555')
        .text(labels[i]);
    });

    // Annotation
    const annoData = data[2]; // Treatment B
    const annoX = x0(annoData.group) + x1('a') + x1.bandwidth() / 2;
    const annoY = y(annoData.a) - 8;
    svg.append('text')
      .attr('x', margin.left + annoX)
      .attr('y', margin.top + annoY)
      .attr('text-anchor', 'middle')
      .attr('font-size', c.annotationSize + 'px')
      .attr('font-style', 'italic')
      .attr('fill', '#888')
      .text('p < 0.01 *');
  }

  // 绑定滑块
  const sliders = [
    { id: 'p4-c-title', valId: 'p4-v-title', key: 'titleSize', unit: 'px' },
    { id: 'p4-c-subtitle', valId: 'p4-v-subtitle', key: 'subtitleSize', unit: 'px' },
    { id: 'p4-c-axis', valId: 'p4-v-axis', key: 'axisLabelSize', unit: 'px' },
    { id: 'p4-c-tick', valId: 'p4-v-tick', key: 'tickSize', unit: 'px' },
    { id: 'p4-c-legend', valId: 'p4-v-legend', key: 'legendSize', unit: 'px' },
    { id: 'p4-c-annotation', valId: 'p4-v-annotation', key: 'annotationSize', unit: 'px' },
  ];

  sliders.forEach(s => {
    const el = document.getElementById(s.id);
    const valEl = document.getElementById(s.valId);
    if (!el) return;
    el.addEventListener('input', e => {
      const v = parseInt(e.target.value);
      state.chart[s.key] = v;
      if (valEl) valEl.textContent = v + s.unit;
      renderChart();
    });
  });

  // Reset button
  const resetBtn = document.getElementById('p4-typo-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.chart = { ...CHART_DEFAULTS };
      sliders.forEach(s => {
        const el = document.getElementById(s.id);
        const valEl = document.getElementById(s.valId);
        if (el) el.value = state.chart[s.key];
        if (valEl) valEl.textContent = state.chart[s.key] + s.unit;
      });
      renderChart();
    });
  }

  // Initial render
  renderChart();

  // Resize observer
  const ro = new ResizeObserver(() => renderChart());
  ro.observe(canvas);
  state._resizeObserver = ro;
}

// ═══════════════════════════════════════════════════
// 导航按钮
// ═══════════════════════════════════════════════════

function setupNavButtons() {
  const nextBtn = document.getElementById('p4-next-btn');
  const prevBtn = document.getElementById('p4-prev-btn');
  const m1Btn = document.getElementById('p4-m1-btn');

  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo('m1-p5'));
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo('m1-p3'));
  if (m1Btn)   m1Btn.addEventListener('click', () => navigateTo('m1'));
}

// ═══════════════════════════════════════════════════
// destroy()
// ═══════════════════════════════════════════════════

export function destroy() {
  killAll();
  if (state._resizeObserver) {
    state._resizeObserver.disconnect();
    state._resizeObserver = null;
  }
  state = {
    fgColor: '#1d1d1f',
    bgColor: '#ffffff',
    previewFontSize: 16,
    chart: { ...CHART_DEFAULTS },
    lineHeightA: 1.2,
    lineHeightB: 1.8,
  };
}
