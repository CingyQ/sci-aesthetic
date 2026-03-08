// p04-accessibility.js — 色彩无障碍（Color Accessibility）
// WCAG 对比度检测 + 色盲模拟器 + 安全配色推荐

import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCopyButton } from '../../components/CopyButton.js';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, getContrastRatio, rgbToLab } from '../../utils/color-math.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ─────────────────────────────────────────────
// 色盲模拟：Machado et al. (2009) 矩阵
// ─────────────────────────────────────────────

function linearize(c) {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function gammify(c) {
  c = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1.0 / 2.4) - 0.055;
  return Math.min(255, Math.max(0, Math.round(c * 255)));
}

const CVDM = {
  protanopia: [
    [0.152286,  1.052583, -0.204868],
    [0.114503,  0.786281,  0.099216],
    [-0.003882, -0.048116,  1.051998]
  ],
  deuteranopia: [
    [0.367322,  0.860646, -0.227968],
    [0.280085,  0.672501,  0.047413],
    [-0.011820,  0.042940,  0.968881]
  ],
  tritanopia: [
    [ 1.255528, -0.076749, -0.178779],
    [-0.078411,  0.930809,  0.147602],
    [ 0.004733,  0.691367,  0.303900]
  ]
};

function simulateCVD(hex, type) {
  if (type === 'achromatopsia') {
    const { r, g, b } = hexToRgb(hex);
    const gray = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
    return rgbToHex(gray, gray, gray);
  }
  const { r, g, b } = hexToRgb(hex);
  const lr = linearize(r), lg = linearize(g), lb = linearize(b);
  const m = CVDM[type];
  const nr = m[0][0] * lr + m[0][1] * lg + m[0][2] * lb;
  const ng = m[1][0] * lr + m[1][1] * lg + m[1][2] * lb;
  const nb = m[2][0] * lr + m[2][1] * lg + m[2][2] * lb;
  return rgbToHex(gammify(nr), gammify(ng), gammify(nb));
}

function computeDeltaE(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lab1 = rgbToLab(rgb1.r, rgb1.g, rgb1.b);
  const lab2 = rgbToLab(rgb2.r, rgb2.g, rgb2.b);
  return Math.sqrt(
    Math.pow(lab1.L - lab2.L, 2) +
    Math.pow(lab1.a - lab2.a, 2) +
    Math.pow(lab1.b - lab2.b, 2)
  );
}

// ─────────────────────────────────────────────
// 常量
// ─────────────────────────────────────────────

const OKABE_ITO = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];
const INITIAL_COLORS = ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F'];

const CVD_TYPES = [
  { id: 'original',     label: '原始',    labelEn: 'Original' },
  { id: 'protanopia',   label: '红色盲',  labelEn: 'Protanopia' },
  { id: 'deuteranopia', label: '绿色盲',  labelEn: 'Deuteranopia' },
  { id: 'tritanopia',   label: '蓝黄色盲', labelEn: 'Tritanopia' },
];

const CVD_INFO = [
  {
    id: 'protanopia',
    name: '红色盲',
    nameEn: 'Protanopia',
    prevalence: '男性约 1%，女性约 0.01%',
    desc: 'L 型视锥细胞缺失，无法区分红色与绿色。红色看起来接近黑色或深褐色。',
    sampleColors: ['#E64B35', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  },
  {
    id: 'deuteranopia',
    name: '绿色盲',
    nameEn: 'Deuteranopia',
    prevalence: '男性约 1%，女性约 0.01%',
    desc: 'M 型视锥细胞缺失，红绿混淆。是最常见的色觉缺陷类型，绿色与红色难以区分。',
    sampleColors: ['#E64B35', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  },
  {
    id: 'tritanopia',
    name: '蓝黄色盲',
    nameEn: 'Tritanopia',
    prevalence: '男女均约 0.001%',
    desc: 'S 型视锥细胞缺失，蓝色与绿色、黄色与粉红色易混淆。极为罕见。',
    sampleColors: ['#E64B35', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  },
  {
    id: 'achromatopsia',
    name: '全色盲',
    nameEn: 'Achromatopsia',
    prevalence: '约 0.003%',
    desc: '三种视锥细胞均无功能，只能感知明暗，完全看不到颜色，仅有灰度视觉。',
    sampleColors: ['#E64B35', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
  },
];

const PREVALENCE_DATA = [
  { name: '红色盲', value: 1.0 },
  { name: '绿色盲', value: 1.0 },
  { name: '蓝黄色盲', value: 0.001 },
  { name: '全色盲', value: 0.003 },
];

// ─────────────────────────────────────────────
// 页面状态
// ─────────────────────────────────────────────

let state = {
  fgColor: '#1d1d1f',
  bgColor: '#ffffff',
  simColors: [...INITIAL_COLORS],
  copyButtons: [],
  resizeObservers: [],
  rafId: null,
};

// ─────────────────────────────────────────────
// render()
// ─────────────────────────────────────────────

export function render() {
  const heroMiniDemo = buildHeroMiniDemoHTML();

  return `
<div class="page-scroll">

<style>
/* ══════════════════════════════════
   p04 page-scoped styles
   ══════════════════════════════════ */

/* ── Hero ── */
.p4-hero {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  position: relative;
  overflow: hidden;
  background: var(--bg-dark);
}
.p4-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(126,200,227,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(126,200,227,0.04) 0%, transparent 60%);
  pointer-events: none;
}
.p4-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}
.p4-hero-title {
  font-family: var(--font-display);
  font-size: var(--text-hero);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-dark);
  margin-bottom: var(--space-sm);
}
.p4-hero-sub {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  max-width: 580px;
  line-height: 1.8;
  margin: 0 auto var(--space-lg);
}
.p4-hero-mini {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--space-sm);
}
.p4-hero-vision {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.p4-hero-vision-label {
  font-family: var(--font-code);
  font-size: 10px;
  color: var(--text-on-dark-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.p4-hero-swatches {
  display: flex;
  gap: 5px;
}
.p4-hero-swatch {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid rgba(255,255,255,0.08);
}

/* ── Section titles ── */
.p4-section-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}
.p4-section-title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-light);
  margin-bottom: var(--space-sm);
}
.p4-section-title--dark {
  color: var(--text-on-dark);
}
.p4-section-desc {
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  line-height: 1.7;
  max-width: 640px;
  margin: 0 auto;
}
.p4-section-desc--dark {
  color: var(--text-on-dark-2);
}

/* ── Section 2: WCAG Contrast ── */
.p4-contrast-section {
  background: var(--bg-light);
  padding: var(--space-2xl) var(--space-lg);
}
.p4-contrast-card {
  max-width: 700px;
  margin: 0 auto;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
}
.p4-contrast-pickers {
  display: flex;
}
.p4-picker-col {
  flex: 1;
  padding: var(--space-md);
  border-bottom: 1px solid var(--border-light);
}
.p4-picker-col:first-child {
  border-right: 1px solid var(--border-light);
}
.p4-picker-label {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--text-on-light-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
}
.p4-picker-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.p4-color-swatch-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 2px solid var(--border-light);
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  transition: transform var(--t-fast);
}
.p4-color-swatch-btn:hover {
  transform: scale(1.08);
}
.p4-color-swatch-btn input[type="color"] {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  opacity: 0;
  cursor: pointer;
  border: none;
  padding: 0;
}
.p4-hex-input {
  font-family: var(--font-code);
  font-size: 14px;
  color: var(--text-on-light);
  background: var(--bg-light-alt);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 8px 12px;
  width: 110px;
  transition: border-color var(--t-fast);
  text-transform: uppercase;
}
.p4-hex-input:focus {
  outline: none;
  border-color: var(--accent);
}
.p4-preview-box {
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: var(--space-md);
  transition: background 0.2s, color 0.2s;
  border-bottom: 1px solid var(--border-light);
}
.p4-preview-large {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
}
.p4-preview-normal {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 400;
}
.p4-preview-small {
  font-family: var(--font-code);
  font-size: 12px;
  opacity: 0.75;
}
.p4-contrast-result {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}
.p4-contrast-ratio {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  color: var(--text-on-light);
  line-height: 1;
}
.p4-ratio-unit {
  font-size: 0.45em;
  color: var(--text-on-light-2);
  font-weight: 400;
}
.p4-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.p4-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-family: var(--font-code);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  border: 1.5px solid;
  transition: all var(--t-fast);
}
.p4-badge--pass {
  color: #15803d;
  background: #f0fdf4;
  border-color: #86efac;
}
.p4-badge--fail {
  color: #dc2626;
  background: #fef2f2;
  border-color: #fca5a5;
}
.p4-badge--warn {
  color: #b45309;
  background: #fffbeb;
  border-color: #fde68a;
}
.p4-contrast-bar-wrap {
  width: 100%;
  max-width: 420px;
}
.p4-contrast-bar-track {
  height: 6px;
  background: var(--border-light);
  border-radius: 3px;
  overflow: visible;
  position: relative;
}
.p4-contrast-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
  max-width: 100%;
}
.p4-contrast-bar-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
}
.p4-bar-label {
  font-family: var(--font-code);
  font-size: 10px;
  color: var(--text-on-light-3);
}
.p4-bar-tick {
  position: absolute;
  top: -3px;
  height: 12px;
  width: 1.5px;
  background: rgba(0,0,0,0.25);
  border-radius: 1px;
}

/* ── Section 3: CVD Types ── */
.p4-cvd-section {
  background: var(--bg-dark);
  padding: var(--space-2xl) var(--space-lg);
}
.p4-cvd-layout {
  max-width: var(--w-full);
  margin: var(--space-lg) auto 0;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: var(--space-xl);
  align-items: start;
}
.p4-cvd-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.p4-cvd-card {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: border-color var(--t-fast), transform var(--t-fast);
}
.p4-cvd-card:hover {
  border-color: rgba(126,200,227,0.4);
  transform: translateX(4px);
}
.p4-cvd-card-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 6px;
}
.p4-cvd-name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-on-dark);
}
.p4-cvd-name-en {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.04em;
}
.p4-cvd-prevalence {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--text-on-dark-3);
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}
.p4-cvd-desc {
  font-size: 14px;
  color: var(--text-on-dark-2);
  line-height: 1.65;
  margin-bottom: 12px;
}
.p4-sim-dots {
  display: flex;
  gap: 10px;
}
.p4-sim-dot-pair {
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
}
.p4-sim-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
}
.p4-sim-dot-row-label {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
.p4-sim-dot-row-label span {
  font-family: var(--font-code);
  font-size: 9px;
  color: var(--text-on-dark-3);
  width: 26px;
  text-align: center;
  letter-spacing: 0.04em;
}
.p4-chart-panel {
  position: sticky;
  top: 80px;
}
.p4-chart-label {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}

/* ── Section 4: Simulator ── */
.p4-sim-section {
  background: var(--bg-light);
  padding: var(--space-2xl) var(--space-lg);
}
.p4-sim-card {
  max-width: 920px;
  margin: 0 auto;
  background: #fff;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  border: 1px solid var(--border-light);
}
.p4-sim-header {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  flex-wrap: wrap;
  background: var(--bg-light-alt);
}
.p4-sim-header-text h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-on-light);
}
.p4-sim-header-text p {
  font-size: 13px;
  color: var(--text-on-light-2);
  margin-top: 2px;
}
.p4-sim-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.p4-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-family: var(--font-code);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all var(--t-fast);
  border: 1.5px solid;
  white-space: nowrap;
}
.p4-btn--outline {
  color: var(--text-on-light);
  background: transparent;
  border-color: var(--border-light);
}
.p4-btn--outline:hover {
  background: var(--bg-light-alt);
  border-color: var(--text-on-light-2);
}
.p4-btn--accent {
  color: var(--bg-dark);
  background: var(--accent);
  border-color: var(--accent);
}
.p4-btn--accent:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}
.p4-color-input-area {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-light);
}
.p4-color-input-label {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--text-on-light-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
}
.p4-color-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.p4-color-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--bg-light-alt);
  border: 1.5px solid var(--border-light);
  border-radius: 10px;
  padding: 5px 8px;
  transition: border-color var(--t-fast);
}
.p4-color-item:hover {
  border-color: var(--accent);
}
.p4-color-item-swatch {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  border: 1.5px solid rgba(0,0,0,0.08);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  transition: transform var(--t-fast);
}
.p4-color-item-swatch:hover {
  transform: scale(1.1);
}
.p4-color-item-swatch input[type="color"] {
  position: absolute;
  inset: -4px;
  width: calc(100% + 8px);
  height: calc(100% + 8px);
  opacity: 0;
  cursor: pointer;
  border: none;
  padding: 0;
}
.p4-color-item-hex {
  font-family: var(--font-code);
  font-size: 12px;
  color: var(--text-on-light);
  background: transparent;
  border: none;
  outline: none;
  width: 72px;
  text-transform: uppercase;
  padding: 0;
}
.p4-color-item-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-on-light-3);
  font-size: 16px;
  line-height: 1;
  padding: 0 2px;
  border-radius: 4px;
  transition: color var(--t-fast);
  display: flex;
  align-items: center;
}
.p4-color-item-remove:hover {
  color: var(--color-error);
}
.p4-add-color-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border: 1.5px dashed var(--border-light);
  border-radius: 10px;
  font-family: var(--font-code);
  font-size: 12px;
  color: var(--text-on-light-2);
  background: transparent;
  cursor: pointer;
  transition: all var(--t-fast);
}
.p4-add-color-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Simulation Grid */
.p4-sim-grid-wrap {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--border-light);
  overflow-x: auto;
}
.p4-sim-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  min-width: 540px;
}
.p4-sim-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.p4-sim-col-label {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--text-on-light-2);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border-light);
}
.p4-sim-col-label span {
  display: block;
  font-size: 9px;
  color: var(--text-on-light-3);
  margin-top: 2px;
  letter-spacing: 0.04em;
}
.p4-sim-swatches {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.p4-sim-swatch {
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.06);
  transition: transform var(--t-fast);
}
.p4-sim-swatch:hover {
  transform: scaleX(1.02);
}

/* Safety Table */
.p4-safety-wrap {
  padding: var(--space-md) var(--space-lg);
}
.p4-safety-title {
  font-family: var(--font-code);
  font-size: 11px;
  color: var(--text-on-light-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}
.p4-safety-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.p4-safety-table th {
  font-family: var(--font-code);
  font-size: 10px;
  color: var(--text-on-light-3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: left;
  padding: 6px 8px;
  border-bottom: 1px solid var(--border-light);
  background: var(--bg-light-alt);
}
.p4-safety-table th:not(:first-child) {
  text-align: center;
}
.p4-safety-table td {
  padding: 8px 8px;
  border-bottom: 1px solid var(--border-light);
  vertical-align: middle;
}
.p4-safety-table tr:last-child td {
  border-bottom: none;
}
.p4-safety-color-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.p4-safety-dot {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.08);
}
.p4-safety-hex {
  font-family: var(--font-code);
  font-size: 12px;
  color: var(--text-on-light-2);
}
.p4-safety-cell {
  text-align: center;
}
.p4-safe-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-family: var(--font-code);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.p4-safe-badge--ok {
  color: #15803d;
  background: #f0fdf4;
}
.p4-safe-badge--warn {
  color: #dc2626;
  background: #fef2f2;
}

/* ── Section 5: Tips ── */
.p4-tips-section {
  background: var(--bg-dark);
  padding: var(--space-2xl) var(--space-lg);
}
.p4-tips-grid {
  max-width: 860px;
  margin: var(--space-xl) auto 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.p4-tip-card {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  transition: border-color var(--t-fast), transform var(--t-fast);
}
.p4-tip-card:hover {
  border-color: rgba(126,200,227,0.3);
  transform: translateY(-2px);
}
.p4-tip-icon {
  font-size: 20px;
  margin-bottom: 10px;
  opacity: 0.9;
  letter-spacing: 4px;
}
.p4-tip-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-on-dark);
  margin-bottom: 8px;
}
.p4-tip-desc {
  font-size: 14px;
  color: var(--text-on-dark-2);
  line-height: 1.65;
}
.p4-tip-code {
  font-family: var(--font-code);
  font-size: 12px;
  background: rgba(255,255,255,0.08);
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--accent);
}

/* ── Section 6: Footer ── */
.p4-footer {
  background: var(--bg-dark);
  padding: var(--space-2xl) var(--space-lg);
  text-align: center;
  border-top: 1px solid var(--border-dark);
}
.p4-footer-summary {
  font-family: var(--font-display);
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--text-on-dark);
  max-width: 560px;
  margin: 0 auto var(--space-lg);
  line-height: 1.5;
}
.p4-footer-links {
  display: flex;
  gap: var(--space-md);
  justify-content: center;
  flex-wrap: wrap;
}
.p4-nav-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-family: var(--font-code);
  font-size: 13px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all var(--t-fast);
  border: 1.5px solid;
  background: transparent;
}
.p4-nav-link--primary {
  color: var(--bg-dark);
  background: var(--accent);
  border-color: var(--accent);
}
.p4-nav-link--primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}
.p4-nav-link--ghost {
  color: var(--text-on-dark-2);
  border-color: var(--border-dark);
}
.p4-nav-link--ghost:hover {
  color: var(--text-on-dark);
  border-color: var(--text-on-dark-2);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .p4-cvd-layout {
    grid-template-columns: 1fr;
  }
  .p4-chart-panel {
    position: static;
    max-width: 400px;
  }
}
@media (max-width: 768px) {
  .p4-tips-grid {
    grid-template-columns: 1fr;
  }
  .p4-contrast-pickers {
    flex-direction: column;
  }
  .p4-picker-col:first-child {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
  }
  .p4-sim-header {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-sm);
  }
  .p4-sim-actions {
    flex-wrap: wrap;
    width: 100%;
  }
  .p4-hero-swatch {
    width: 22px;
    height: 22px;
  }
  /* All sections padding */
  .p4-hero { padding: var(--space-xl) var(--space-sm); }
  .p4-contrast-section { padding: var(--space-lg) var(--space-sm); }
  .p4-cvd-section { padding: var(--space-lg) var(--space-sm); }
  .p4-sim-section { padding: var(--space-lg) var(--space-sm); }
  .p4-tips-section { padding: var(--space-lg) var(--space-sm); }
  .p4-footer-section { padding: var(--space-lg) var(--space-sm); }

  /* Color input area compact */
  .p4-color-input-area { padding: var(--space-sm); }
  .p4-color-row { gap: 6px; }
  .p4-color-item { padding: 4px 6px; }
  .p4-color-item-swatch { width: 24px; height: 24px; }
  .p4-color-item-hex { width: 60px; font-size: 11px; }

  /* Simulator grid */
  .p4-sim-grid-wrap { padding: var(--space-sm); overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .p4-sim-grid { min-width: 460px; gap: 10px; }

  /* Safety table scroll */
  .p4-safety-wrap { padding: var(--space-sm); overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .p4-safety-table { min-width: 420px; font-size: 12px; }
  .p4-safety-table th { font-size: 9px; padding: 4px 6px; }
  .p4-safety-table td { padding: 6px; }

  /* Contrast section */
  .p4-contrast-card { border-radius: var(--radius-md); }
  .p4-contrast-ratio { font-size: clamp(2rem, 8vw, 3.5rem); }
  .p4-contrast-badges { gap: 6px; }
  .p4-contrast-badge { padding: 4px 10px; font-size: 11px; }

  /* CVD cards */
  .p4-cvd-cards { gap: var(--space-sm); }
}

@media (max-width: 480px) {
  .p4-hero { padding: var(--space-lg) var(--space-sm); }
  .p4-hero-mini { gap: 8px; }
  .p4-hero-mini-col { gap: 3px; }
  .p4-hero-swatch { width: 18px; height: 18px; }

  /* Simulator: 2-column grid for very narrow */
  .p4-sim-grid { grid-template-columns: repeat(2, 1fr); min-width: 0; }

  .p4-btn { padding: 6px 12px; font-size: 11px; }
  .p4-nav-links { flex-direction: column; align-items: stretch; }
  .p4-nav-link { justify-content: center; }
}
</style>

<!-- ════════════════════════════════════════════
     Section 1: Hero
     ════════════════════════════════════════════ -->
<section class="p4-hero section-hero-full">
  <p class="p4-eyebrow p4-anim-0">Module 01 / Page 04</p>
  <h1 class="p4-hero-title p4-anim-1">色彩无障碍</h1>
  <p class="p4-hero-sub p4-anim-2">
    确保你的图表对所有人都可读——包括约 8% 的男性色觉障碍者。<br>
    科研图表承载知识，无障碍是传播的基础。
  </p>
  <div class="p4-hero-mini p4-anim-3">
    ${heroMiniDemo}
  </div>
  <!-- 快捷导航 -->
  <nav class="hero-quicknav p4-anim-4" id="p4-hero-nav">
    <button class="hero-quicknav__item" data-target=".p4-contrast-section">WCAG 对比度</button>
    <button class="hero-quicknav__item" data-target=".p4-cvd-section">色觉障碍类型</button>
    <button class="hero-quicknav__item" data-target=".p4-sim-section">色盲模拟器</button>
    <button class="hero-quicknav__item" data-target=".p4-tips-section">设计建议</button>
  </nav>
</section>

<!-- ════════════════════════════════════════════
     Section 2: WCAG Contrast Checker
     ════════════════════════════════════════════ -->
<section class="p4-contrast-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title">WCAG 对比度检测</h2>
    <p class="p4-section-desc">
      WCAG AA 标准要求对比度 ≥ 4.5:1（正文）/ ≥ 3:1（大字）；
      AAA 标准要求 ≥ 7:1。国际无障碍标准的核心量化指标。
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
      <div class="p4-preview-large">示例大字 Sample Heading</div>
      <div class="p4-preview-normal">正文示例文字 The quick brown fox jumps over the lazy dog.</div>
      <div class="p4-preview-small">小号文字 Caption text — figure labels and table footnotes</div>
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
        <div class="p4-contrast-bar-labels">
          <span class="p4-bar-label">1:1</span>
          <span class="p4-bar-label">3:1</span>
          <span class="p4-bar-label">4.5:1</span>
          <span class="p4-bar-label">7:1</span>
          <span class="p4-bar-label">21:1</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 3: CVD Types
     ════════════════════════════════════════════ -->
<section class="p4-cvd-section">
  <div style="max-width:var(--w-full);margin:0 auto;">
    <div class="p4-section-header" style="text-align:left;margin-bottom:0;">
      <h2 class="p4-section-title p4-section-title--dark">色觉缺陷的主要类型</h2>
      <p class="p4-section-desc p4-section-desc--dark">
        全球约 8% 的男性存在某种色觉障碍。了解不同类型有助于设计对所有人友好的图表。
      </p>
    </div>
    <div class="p4-cvd-layout">
      <div class="p4-cvd-cards" id="p4-cvd-cards">
        ${CVD_INFO.map(info => buildCVDCardHTML(info)).join('')}
      </div>
      <div class="p4-chart-panel">
        <p class="p4-chart-label">男性患病率（%）</p>
        <svg id="p4-prevalence-chart"></svg>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 4: Simulator (Core Interaction)
     ════════════════════════════════════════════ -->
<section class="p4-sim-section">
  <div class="p4-section-header">
    <h2 class="p4-section-title">自定义色盲模拟器</h2>
    <p class="p4-section-desc">
      输入你的配色方案，实时模拟不同色觉障碍者的视觉体验，并自动检测颜色混淆风险。
    </p>
  </div>

  <div class="p4-sim-card" id="p4-sim-card">
    <div class="p4-sim-header">
      <div class="p4-sim-header-text">
        <h3>颜色方案</h3>
        <p>点击色块更改颜色，最多 8 个</p>
      </div>
      <div class="p4-sim-actions">
        <button class="p4-btn p4-btn--outline" id="p4-reset-btn">↺ 重置</button>
        <button class="p4-btn p4-btn--accent" id="p4-okabe-btn">🎨 Okabe-Ito 安全配色</button>
      </div>
    </div>

    <div class="p4-color-input-area">
      <span class="p4-color-input-label">配色方案</span>
      <div class="p4-color-row" id="p4-color-row"></div>
    </div>

    <div class="p4-sim-grid-wrap">
      <div class="p4-sim-grid" id="p4-sim-grid"></div>
    </div>

    <div class="p4-safety-wrap">
      <p class="p4-safety-title">色觉障碍安全性分析</p>
      <div id="p4-safety-table-wrap"></div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 5: Tips
     ════════════════════════════════════════════ -->
<section class="p4-tips-section">
  <div style="max-width:860px;margin:0 auto;">
    <div class="p4-section-header" style="margin-bottom:0;">
      <h2 class="p4-section-title p4-section-title--dark">让你的配色对所有人友好</h2>
      <p class="p4-section-desc p4-section-desc--dark">四条实用原则，覆盖科研图表的常见场景</p>
    </div>
    <div class="p4-tips-grid" id="p4-tips-grid">
      <div class="p4-tip-card">
        <div class="p4-tip-icon">◆ ✕ ○</div>
        <div class="p4-tip-title">不仅靠颜色区分</div>
        <p class="p4-tip-desc">颜色是辅助信息层，不是唯一区分手段。同时使用形状、填充图案、线型（实线/虚线）和直接标注。即使打印成灰度也应可读。</p>
      </div>
      <div class="p4-tip-card">
        <div class="p4-tip-icon">🎨</div>
        <div class="p4-tip-title">使用色盲友好配色</div>
        <p class="p4-tip-desc">Okabe-Ito、Wong 和 ColorBrewer 安全方案经过科学验证，对红绿色盲友好。R 包 <span class="p4-tip-code">ggsci</span> 内置这些方案，开箱即用。</p>
      </div>
      <div class="p4-tip-card">
        <div class="p4-tip-icon">🔬</div>
        <div class="p4-tip-title">测试你的图表</div>
        <p class="p4-tip-desc">使用本页的色盲模拟器对你的实际配色进行验证。建议在提交论文前检查所有图表，尤其是配色超过 4 种的复杂图表。</p>
      </div>
      <div class="p4-tip-card">
        <div class="p4-tip-icon">◎</div>
        <div class="p4-tip-title">提高亮度对比度</div>
        <p class="p4-tip-desc">色盲用户主要依靠明暗来区分颜色。确保相邻颜色的明度（L）差值 ≥ 25%，并用上方的 WCAG 检测器验证文字可读性。</p>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════════════════════════════
     Section 6: Footer / CTA
     ════════════════════════════════════════════ -->
<section class="p4-footer">
  <p class="p4-footer-summary">
    色彩无障碍不是妥协，是让科学发现触达更多人的方式。
  </p>
  <div class="p4-footer-links">
    <button class="p4-nav-link p4-nav-link--primary" id="p4-next-btn">
      下一篇：图表选择指南 →
    </button>
    <button class="p4-nav-link p4-nav-link--ghost" id="p4-prev-btn">
      ← 调色板生成器
    </button>
    <button class="p4-nav-link p4-nav-link--ghost" id="p4-m1-btn">
      ↩ 模块一首页
    </button>
  </div>
</section>

</div>
`;
}

// ─────────────────────────────────────────────
// Hero mini demo
// ─────────────────────────────────────────────

function buildHeroMiniDemoHTML() {
  const PIE_COLORS = ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F'];
  const LABELS = [
    { id: 'original',     label: '正常视觉' },
    { id: 'protanopia',   label: '红色盲' },
    { id: 'deuteranopia', label: '绿色盲' },
    { id: 'tritanopia',   label: '蓝黄色盲' },
  ];

  return LABELS.map(({ id, label }) => {
    const colors = id === 'original'
      ? PIE_COLORS
      : PIE_COLORS.map(c => simulateCVD(c, id));

    return `
    <div class="p4-hero-vision">
      <div class="p4-hero-swatches">
        ${colors.map(c => `<div class="p4-hero-swatch" style="background:${c};"></div>`).join('')}
      </div>
      <div class="p4-hero-vision-label">${label}</div>
    </div>`;
  }).join('');
}

// ─────────────────────────────────────────────
// CVD Card builder
// ─────────────────────────────────────────────

function buildCVDCardHTML(info) {
  const simColors = info.sampleColors.map(c => simulateCVD(c, info.id));

  return `
  <div class="p4-cvd-card">
    <div class="p4-cvd-card-header">
      <span class="p4-cvd-name">${info.name}</span>
      <span class="p4-cvd-name-en">${info.nameEn}</span>
    </div>
    <div class="p4-cvd-prevalence">患病率：${info.prevalence}</div>
    <p class="p4-cvd-desc">${info.desc}</p>
    <div style="display:flex;flex-direction:column;gap:4px;">
      <div class="p4-sim-dots">
        ${info.sampleColors.map((orig) => `
        <div class="p4-sim-dot-pair">
          <div class="p4-sim-dot" style="background:${orig};" title="原始 ${orig}"></div>
        </div>`).join('')}
      </div>
      <div class="p4-sim-dots">
        ${simColors.map((sim) => `
        <div class="p4-sim-dot-pair">
          <div class="p4-sim-dot" style="background:${sim};" title="模拟 ${sim}"></div>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:20px;margin-top:2px;">
        <span style="font-family:var(--font-code);font-size:9px;color:var(--text-on-dark-3);letter-spacing:0.04em;">原始</span>
        <span style="font-family:var(--font-code);font-size:9px;color:var(--text-on-dark-3);letter-spacing:0.04em;">模拟</span>
      </div>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────
// init()
// ─────────────────────────────────────────────

export function init() {
  // Reset state
  state.simColors = [...INITIAL_COLORS];
  state.fgColor = '#1d1d1f';
  state.bgColor = '#ffffff';

  // Hero entrance
  gsap.from('.p4-eyebrow',    { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', delay: 0.15 });
  gsap.from('.p4-hero-title', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', delay: 0.3 });
  gsap.from('.p4-hero-sub',   { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', delay: 0.5 });
  gsap.from('.p4-hero-mini',  { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.7 });
  gsap.from('.p4-anim-4',    { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', delay: 0.9 });
  // 快捷导航
  document.querySelectorAll('#p4-hero-nav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Scroll-triggered section animations
  fadeIn('.p4-contrast-section .p4-section-header', { start: 'top 88%' });
  fadeIn('#p4-contrast-card', { start: 'top 85%', y: 40 });

  fadeIn('.p4-cvd-section .p4-section-header', { start: 'top 88%' });
  fadeIn('.p4-cvd-card', { stagger: 0.12, start: 'top 88%' });

  fadeIn('.p4-sim-section .p4-section-header', { start: 'top 88%' });
  scaleReveal('#p4-sim-card', { start: 'top 82%' });

  fadeIn('.p4-tips-section .p4-section-header', { start: 'top 88%' });
  fadeIn('.p4-tip-card', { stagger: 0.1, start: 'top 85%' });

  fadeIn('.p4-footer-summary', { start: 'top 88%' });
  fadeIn('.p4-footer-links', { start: 'top 88%', y: 20 });

  initContrastChecker();
  initPrevalenceChart();
  initSimulator();
  initFooterNav();
}

// ─────────────────────────────────────────────
// Section 2: WCAG Contrast Checker
// ─────────────────────────────────────────────

function normalizeHex(v) {
  v = v.trim();
  if (!v.startsWith('#')) v = '#' + v;
  if (/^#[0-9a-fA-F]{3}$/.test(v)) {
    v = '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
  }
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null;
}

function initContrastChecker() {
  const fgPicker  = document.getElementById('p4-fg-picker');
  const bgPicker  = document.getElementById('p4-bg-picker');
  const fgHex     = document.getElementById('p4-fg-hex');
  const bgHex     = document.getElementById('p4-bg-hex');
  const fgSwatch  = document.getElementById('p4-fg-swatch');
  const bgSwatch  = document.getElementById('p4-bg-swatch');
  const preview   = document.getElementById('p4-preview-box');
  const ratioNum  = document.getElementById('p4-ratio-num');
  const badgeAA   = document.getElementById('p4-badge-aa');
  const badgeAA2  = document.getElementById('p4-badge-aa-large');
  const badgeAAA  = document.getElementById('p4-badge-aaa');
  const barFill   = document.getElementById('p4-bar-fill');
  if (!fgPicker) return;

  let prevRatio = 21;

  function updateContrast() {
    const fg = state.fgColor;
    const bg = state.bgColor;

    preview.style.background = bg;
    preview.style.color = fg;
    fgSwatch.style.background = fg;
    bgSwatch.style.background = bg;

    const ratio = getContrastRatio(fg, bg);

    // Animate ratio number
    gsap.to({ val: prevRatio }, {
      val: ratio,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: function() {
        ratioNum.textContent = this.targets()[0].val.toFixed(2);
      }
    });
    prevRatio = ratio;

    // Badges
    function setBadge(el, pass, label) {
      el.className = `p4-badge ${pass ? 'p4-badge--pass' : 'p4-badge--fail'}`;
      el.textContent = (pass ? '✓ ' : '✗ ') + label;
    }
    setBadge(badgeAA,  ratio >= 4.5, 'AA 正文');
    setBadge(badgeAA2, ratio >= 3.0, 'AA 大字');
    setBadge(badgeAAA, ratio >= 7.0, 'AAA');

    // Bar
    const pct = Math.min(ratio / 21, 1) * 100;
    barFill.style.width = pct.toFixed(1) + '%';
    barFill.style.background = ratio >= 7 ? 'var(--color-success)'
      : ratio >= 4.5 ? '#22c55e'
      : ratio >= 3 ? 'var(--color-warning)'
      : 'var(--color-error)';
  }

  fgPicker.addEventListener('input', e => {
    state.fgColor = e.target.value;
    fgHex.value = e.target.value.toUpperCase();
    updateContrast();
  });

  bgPicker.addEventListener('input', e => {
    state.bgColor = e.target.value;
    bgHex.value = e.target.value.toUpperCase();
    updateContrast();
  });

  fgHex.addEventListener('input', e => {
    const v = normalizeHex(e.target.value);
    if (v) {
      state.fgColor = v;
      fgPicker.value = v;
      updateContrast();
    }
  });

  bgHex.addEventListener('input', e => {
    const v = normalizeHex(e.target.value);
    if (v) {
      state.bgColor = v;
      bgPicker.value = v;
      updateContrast();
    }
  });

  updateContrast();
}

// ─────────────────────────────────────────────
// Section 3: D3 Prevalence Chart
// ─────────────────────────────────────────────

function initPrevalenceChart() {
  const svgEl = document.getElementById('p4-prevalence-chart');
  if (!svgEl) return;

  const container = svgEl.parentElement;
  const width     = Math.min(container.clientWidth || 320, 360);
  const margin    = { top: 8, right: 64, bottom: 24, left: 72 };
  const innerW    = width - margin.left - margin.right;

  const barH  = 30;
  const barGap = 12;
  const totalH = PREVALENCE_DATA.length * (barH + barGap) + margin.top + margin.bottom;

  const svg = d3.select(svgEl)
    .attr('width', width)
    .attr('height', totalH);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, 1.0]).range([0, innerW]);

  // Grid lines
  [0.25, 0.5, 0.75, 1.0].forEach(tick => {
    g.append('line')
      .attr('x1', x(tick)).attr('x2', x(tick))
      .attr('y1', 0).attr('y2', totalH - margin.top - margin.bottom)
      .attr('stroke', 'rgba(255,255,255,0.07)')
      .attr('stroke-dasharray', '3,3');
  });

  PREVALENCE_DATA.forEach((d, i) => {
    const y = i * (barH + barGap);

    // Track background
    g.append('rect')
      .attr('x', 0).attr('y', y)
      .attr('width', innerW).attr('height', barH)
      .attr('rx', 6).attr('fill', 'rgba(255,255,255,0.04)');

    // Animated bar
    const bar = g.append('rect')
      .attr('x', 0).attr('y', y)
      .attr('width', 0).attr('height', barH)
      .attr('rx', 6).attr('fill', '#7EC8E3').attr('opacity', 0.9);

    // Name label (left)
    g.append('text')
      .attr('x', -6).attr('y', y + barH / 2)
      .attr('text-anchor', 'end').attr('dominant-baseline', 'middle')
      .attr('fill', '#a1a1a6')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', 11)
      .text(d.name);

    // Value label (right, starts at 0)
    const valText = g.append('text')
      .attr('x', 4).attr('y', y + barH / 2)
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#f5f5f7')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', 11)
      .text('');

    // Animate when in view
    const { gsap: _gsap, ScrollTrigger } = { gsap, ScrollTrigger: null };

    // Use GSAP ScrollTrigger from already-imported module
    import('gsap/ScrollTrigger').then(mod => {
      const ST = mod.ScrollTrigger;
      gsap.registerPlugin(ST);
      ST.create({
        trigger: svgEl,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const targetW = x(d.value);
          bar.transition().duration(900).delay(i * 160)
            .ease(d3.easeCubicOut).attr('width', targetW);
          valText.transition().duration(900).delay(i * 160)
            .ease(d3.easeCubicOut)
            .attr('x', targetW + 6)
            .text(d.value < 0.01
              ? d.value.toFixed(3) + '%'
              : d.value.toFixed(1) + '%');
        }
      });
    }).catch(() => {
      bar.attr('width', x(d.value));
      valText.attr('x', x(d.value) + 6)
        .text(d.value < 0.01 ? d.value.toFixed(3) + '%' : d.value.toFixed(1) + '%');
    });
  });

  // Axis
  const axG = g.append('g')
    .attr('transform', `translate(0,${PREVALENCE_DATA.length * (barH + barGap) + 4})`);
  [0, 0.5, 1.0].forEach(tick => {
    axG.append('text')
      .attr('x', x(tick)).attr('y', 12)
      .attr('text-anchor', 'middle')
      .attr('fill', '#6e6e73')
      .attr('font-family', "'JetBrains Mono', monospace").attr('font-size', 10)
      .text(tick + '%');
  });
}

// ─────────────────────────────────────────────
// Section 4: Simulator
// ─────────────────────────────────────────────

function generateDistinctColor() {
  const existingHues = state.simColors.map(c => {
    const { r, g, b } = hexToRgb(c);
    return rgbToHsl(r, g, b).h;
  });
  let bestHue = 0, bestDist = 0;
  for (let h = 0; h < 360; h += 15) {
    const minDist = Math.min(...existingHues.map(eh => {
      const d = Math.abs(h - eh);
      return Math.min(d, 360 - d);
    }));
    if (minDist > bestDist) { bestDist = minDist; bestHue = h; }
  }
  const { r, g, b } = hslToRgb(bestHue, 70, 50);
  return rgbToHex(r, g, b);
}

function renderColorInputs() {
  const row = document.getElementById('p4-color-row');
  if (!row) return;
  row.innerHTML = '';

  state.simColors.forEach((color, i) => {
    const item = document.createElement('div');
    item.className = 'p4-color-item';

    const swatchDiv = document.createElement('div');
    swatchDiv.className = 'p4-color-item-swatch';
    swatchDiv.style.background = color;

    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = color;
    picker.dataset.idx = i;
    swatchDiv.appendChild(picker);

    const hexInput = document.createElement('input');
    hexInput.type = 'text';
    hexInput.className = 'p4-color-item-hex';
    hexInput.value = color.toUpperCase();
    hexInput.maxLength = 7;
    hexInput.dataset.idx = i;

    item.appendChild(swatchDiv);
    item.appendChild(hexInput);

    if (state.simColors.length > 2) {
      const removeBtn = document.createElement('button');
      removeBtn.className = 'p4-color-item-remove';
      removeBtn.innerHTML = '×';
      removeBtn.title = '移除';
      removeBtn.addEventListener('click', () => {
        state.simColors.splice(i, 1);
        renderColorInputs();
        renderSimGrid();
        renderSafetyTable();
      });
      item.appendChild(removeBtn);
    }

    picker.addEventListener('input', e => {
      const v = e.target.value;
      state.simColors[i] = v;
      swatchDiv.style.background = v;
      hexInput.value = v.toUpperCase();
      renderSimGrid();
      renderSafetyTable();
    });

    hexInput.addEventListener('input', e => {
      let v = e.target.value.trim();
      if (!v.startsWith('#')) v = '#' + v;
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        state.simColors[i] = v.toLowerCase();
        picker.value = v;
        swatchDiv.style.background = v;
        renderSimGrid();
        renderSafetyTable();
      }
    });

    row.appendChild(item);
  });

  // Add button
  if (state.simColors.length < 8) {
    const addBtn = document.createElement('button');
    addBtn.className = 'p4-add-color-btn';
    addBtn.textContent = '+ 添加颜色';
    addBtn.addEventListener('click', () => {
      if (state.simColors.length >= 8) return;
      state.simColors.push(generateDistinctColor());
      renderColorInputs();
      renderSimGrid();
      renderSafetyTable();
    });
    row.appendChild(addBtn);
  }
}

function renderSimGrid() {
  const grid = document.getElementById('p4-sim-grid');
  if (!grid) return;
  grid.innerHTML = '';

  CVD_TYPES.forEach(({ id, label, labelEn }) => {
    const col = document.createElement('div');
    col.className = 'p4-sim-col';

    const colLabel = document.createElement('div');
    colLabel.className = 'p4-sim-col-label';
    colLabel.innerHTML = `${label}<span>${labelEn}</span>`;
    col.appendChild(colLabel);

    const swatchWrap = document.createElement('div');
    swatchWrap.className = 'p4-sim-swatches';

    state.simColors.forEach(color => {
      const simColor = id === 'original' ? color : simulateCVD(color, id);
      const swatch = document.createElement('div');
      swatch.className = 'p4-sim-swatch';
      swatch.style.background = simColor;
      swatch.title = simColor.toUpperCase();
      swatchWrap.appendChild(swatch);
    });

    col.appendChild(swatchWrap);
    grid.appendChild(col);
  });
}

function renderSafetyTable() {
  const wrap = document.getElementById('p4-safety-table-wrap');
  if (!wrap) return;

  if (state.simColors.length < 2) {
    wrap.innerHTML = '<p style="font-size:13px;color:var(--text-on-light-3);padding:8px 0;">至少需要 2 种颜色才能进行分析</p>';
    return;
  }

  const cvdIds    = ['protanopia', 'deuteranopia', 'tritanopia'];
  const cvdLabels = { protanopia: '红色盲', deuteranopia: '绿色盲', tritanopia: '蓝黄色盲' };

  // Precompute simulated palettes
  const simPalettes = {};
  cvdIds.forEach(id => {
    simPalettes[id] = state.simColors.map(c => simulateCVD(c, id));
  });

  const table = document.createElement('table');
  table.className = 'p4-safety-table';

  // Header
  const thead = document.createElement('thead');
  thead.innerHTML = `<tr>
    <th>颜色</th>
    <th>原始</th>
    ${cvdIds.map(id => `<th>${cvdLabels[id]}</th>`).join('')}
  </tr>`;
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  state.simColors.forEach((hex, i) => {
    const tr = document.createElement('tr');

    // Color cell
    const colorTd = document.createElement('td');
    colorTd.innerHTML = `
      <div class="p4-safety-color-cell">
        <div class="p4-safety-dot" style="background:${hex};"></div>
        <span class="p4-safety-hex">${hex.toUpperCase()}</span>
      </div>`;
    tr.appendChild(colorTd);

    // Original always safe
    const origTd = document.createElement('td');
    origTd.className = 'p4-safety-cell';
    origTd.innerHTML = `<span class="p4-safe-badge p4-safe-badge--ok">✓ 安全</span>`;
    tr.appendChild(origTd);

    // CVD columns
    cvdIds.forEach(cvdId => {
      const td = document.createElement('td');
      td.className = 'p4-safety-cell';
      const mySimColor = simPalettes[cvdId][i];
      const confused = [];
      simPalettes[cvdId].forEach((otherSim, j) => {
        if (j === i) return;
        if (computeDeltaE(mySimColor, otherSim) < 15) {
          confused.push(state.simColors[j]);
        }
      });

      if (confused.length === 0) {
        td.innerHTML = `<span class="p4-safe-badge p4-safe-badge--ok">✓ 安全</span>`;
      } else {
        const tooltip = confused.map(c => c.toUpperCase()).join(', ');
        const text = confused.length === 1
          ? `与 ${confused[0].toUpperCase()} 混淆`
          : `与 ${confused.length} 色混淆`;
        td.innerHTML = `<span class="p4-safe-badge p4-safe-badge--warn" title="${tooltip}">⚠ ${text}</span>`;
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrap.innerHTML = '';
  wrap.appendChild(table);
}

function initSimulator() {
  renderColorInputs();
  renderSimGrid();
  renderSafetyTable();

  const resetBtn  = document.getElementById('p4-reset-btn');
  const okabeBtn  = document.getElementById('p4-okabe-btn');

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.simColors = [...INITIAL_COLORS];
      renderColorInputs();
      renderSimGrid();
      renderSafetyTable();
      gsap.from('#p4-sim-grid', { opacity: 0.2, duration: 0.4, ease: 'power2.out' });
    });
  }

  if (okabeBtn) {
    okabeBtn.addEventListener('click', () => {
      state.simColors = [...OKABE_ITO];
      renderColorInputs();
      renderSimGrid();
      renderSafetyTable();
      gsap.from('#p4-sim-grid', { opacity: 0.2, duration: 0.5, ease: 'power2.out' });
      gsap.from('#p4-safety-table-wrap', { opacity: 0.2, duration: 0.4, ease: 'power2.out', delay: 0.1 });
    });
  }
}

// ─────────────────────────────────────────────
// Footer nav
// ─────────────────────────────────────────────

function initFooterNav() {
  const nextBtn = document.getElementById('p4-next-btn');
  const prevBtn = document.getElementById('p4-prev-btn');
  const m1Btn   = document.getElementById('p4-m1-btn');

  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo('m1-p5'));
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo('m1-p3'));
  if (m1Btn)   m1Btn.addEventListener('click',   () => navigateTo('m1-p1'));
}

// ─────────────────────────────────────────────
// destroy()
// ─────────────────────────────────────────────

export function destroy() {
  killAll();
  state.copyButtons.forEach(b => { try { b.destroy(); } catch (e) {} });
  state.resizeObservers.forEach(o => { try { o.disconnect(); } catch (e) {} });
  state.copyButtons = [];
  state.resizeObservers = [];
  if (state.rafId) { cancelAnimationFrame(state.rafId); state.rafId = null; }
}
