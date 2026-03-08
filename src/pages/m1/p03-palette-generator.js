// p03-palette-generator.js — 配色生成器与数据配色
// 配色生成器 + 三类数据配色 + 常见错误对比

import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createTabSwitcher } from '../../components/TabSwitcher.js';
import { createCopyButton } from '../../components/CopyButton.js';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../../utils/color-math.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ═══════════════════════════════════════════════════
// 状态
// ═══════════════════════════════════════════════════
let state = {
  baseHex: '#4DBBD5',
  algorithm: 'analogous',
  colorCount: 5,
  generatedColors: [],
  hslValues: [],
  chartTab: 'bar',
  exportTab: 'hex',
  dataTypeTab: 'sequential',
  seqSchemeIdx: 0,
  seqCount: 5,
  divSchemeIdx: 0,
  divCount: 7,
  qualSchemeIdx: 0,
  qualCount: 5,
  tabInstances: [],
  copyInstances: [],
  rafId: null,
};

// ═══════════════════════════════════════════════════
// 配色数据
// ═══════════════════════════════════════════════════
const SEQUENTIAL_SCHEMES = [
  { name: 'Blues',   colors: ['#EFF3FF','#BDD7E7','#6BAED6','#2171B5','#084594'] },
  { name: 'Greens',  colors: ['#EDF8E9','#BAE4B3','#74C476','#31A354','#006D2C'] },
  { name: 'Oranges', colors: ['#FEE6CE','#FDAE6B','#FD8D3C','#E6550D','#A63603'] },
  { name: 'Viridis', colors: ['#FDE725','#5DC963','#21908C','#3B528B','#440154'] },
  { name: 'Plasma',  colors: ['#F0F921','#FCA636','#E16462','#B12A90','#0D0887'] },
];

const DIVERGING_SCHEMES = [
  { name: 'RdBu',   colors: ['#B2182B','#EF8A62','#FDDBC7','#F7F7F7','#D1E5F0','#67A9CF','#2166AC'] },
  { name: 'RdYlBu', colors: ['#D73027','#FC8D59','#FEE090','#FFFFBF','#E0F3F8','#91BFDB','#4575B4'] },
  { name: 'PiYG',   colors: ['#8E0152','#DE77AE','#FDE0EF','#F7F7F7','#E6F5D0','#7FBC41','#4D9221'] },
  { name: 'BrBG',   colors: ['#543005','#BF812D','#F6E8C3','#F5F5F5','#C7EAE5','#35978F','#003C30'] },
  { name: 'PRGn',   colors: ['#40004B','#9970AB','#E7D4E8','#F7F7F7','#D9F0D3','#5AAE61','#00441B'] },
];

const QUALITATIVE_SCHEMES = [
  { name: 'Nature',    colors: ['#E64B35','#4DBBD5','#00A087','#3C5488','#F39B7F','#8491B4','#91D1C2'] },
  { name: 'Okabe-Ito', colors: ['#E69F00','#56B4E9','#009E73','#F0E442','#0072B2','#D55E00','#CC79A7'] },
  { name: 'Set1',      colors: ['#E41A1C','#377EB8','#4DAF4A','#984EA3','#FF7F00','#A65628','#F781BF'] },
  { name: 'Tableau',   colors: ['#4E79A7','#F28E2B','#E15759','#76B7B2','#59A14F','#EDC948','#B07AA1'] },
  { name: 'Pastel',    colors: ['#AEC6CF','#FFD1DC','#B5EAD7','#FFDAC1','#C7CEEA','#E2F0CB','#FF9AA2'] },
];

// ═══════════════════════════════════════════════════
// 色彩计算
// ═══════════════════════════════════════════════════
function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function clampH(h) { return ((h % 360) + 360) % 360; }
function clampSL(v) { return Math.max(0, Math.min(100, v)); }

function generatePalette(baseHex, algorithm, count) {
  const rgb = hexToRgb(baseHex);
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [];
  const safeS = Math.max(25, Math.min(85, s));
  const safeL = Math.max(35, Math.min(65, l));

  switch (algorithm) {
    case 'complementary': {
      const baseHues = [h, clampH(h + 180)];
      for (let i = 0; i < count; i++) {
        const hueBase = baseHues[i % 2];
        const offset = Math.floor(i / 2) * (i % 2 === 0 ? -15 : 15);
        const lightness = clampSL(safeL - 10 + (i / (count - 1)) * 20);
        colors.push(hslToHex(clampH(hueBase + offset), safeS, lightness));
      }
      break;
    }
    case 'analogous': {
      const spread = Math.min(60, 15 * (count - 1));
      const startH = clampH(h - spread / 2);
      for (let i = 0; i < count; i++) {
        const hue = clampH(startH + (spread / Math.max(count - 1, 1)) * i);
        const lightness = clampSL(safeL - 5 + (i / Math.max(count - 1, 1)) * 15);
        colors.push(hslToHex(hue, clampSL(safeS - 5 + i * 3), lightness));
      }
      break;
    }
    case 'triadic': {
      const baseHues = [h, clampH(h + 120), clampH(h + 240)];
      for (let i = 0; i < count; i++) {
        const hue = baseHues[i % 3];
        const lightness = clampSL(safeL - 8 + Math.floor(i / 3) * 16);
        colors.push(hslToHex(hue, safeS, lightness));
      }
      break;
    }
    case 'monochromatic': {
      const minL = 25, maxL = 80;
      for (let i = 0; i < count; i++) {
        const lightness = minL + (maxL - minL) * (i / Math.max(count - 1, 1));
        const sat = clampSL(safeS - 10 + (i / Math.max(count - 1, 1)) * 20);
        colors.push(hslToHex(h, sat, lightness));
      }
      break;
    }
    default:
      colors.push(baseHex);
  }

  return colors.slice(0, count);
}

function getSchemeColors(type, idx, count) {
  let schemes;
  if (type === 'sequential') schemes = SEQUENTIAL_SCHEMES;
  else if (type === 'diverging') schemes = DIVERGING_SCHEMES;
  else schemes = QUALITATIVE_SCHEMES;

  const full = schemes[idx].colors;
  if (count <= 1) return [full[0]];
  const result = [];
  for (let i = 0; i < count; i++) {
    const fi = Math.round(i * (full.length - 1) / Math.max(count - 1, 1));
    result.push(full[Math.min(fi, full.length - 1)]);
  }
  return result;
}

function textColorForBg(hex) {
  const rgb = hexToRgb(hex);
  const lum = 0.2126 * (rgb.r / 255) + 0.7152 * (rgb.g / 255) + 0.0722 * (rgb.b / 255);
  return lum > 0.45 ? '#1d1d1f' : '#f5f5f7';
}

// ═══════════════════════════════════════════════════
// D3 图表
// ═══════════════════════════════════════════════════
function drawBarChart(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const totalW = el.clientWidth || 480;
  const margin = { top: 20, right: 20, bottom: 36, left: 44 };
  const width = Math.max(totalW - margin.left - margin.right, 100);
  const height = 200 - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('width', totalW).attr('height', 200)
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const palette = colors.slice(0, 5);
  const labels = ['A组','B组','C组','D组','E组'].slice(0, palette.length);
  const data = labels.map((name, i) => ({
    name,
    value: 28 + Math.sin(i * 1.3 + 0.5) * 14 + i * 7,
    color: palette[i]
  }));

  const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, width]).padding(0.35);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value) * 1.25]).range([height, 0]);

  g.selectAll('.grid').data(y.ticks(4)).enter().append('line')
    .attr('x1', 0).attr('x2', width).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);

  g.selectAll('.bar').data(data).enter().append('rect')
    .attr('x', d => x(d.name)).attr('y', d => y(d.value))
    .attr('width', x.bandwidth()).attr('height', d => height - y(d.value))
    .attr('fill', d => d.color).attr('rx', 3);

  g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickSize(0))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  g.append('g').call(d3.axisLeft(y).ticks(4))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');
}

function drawLineChart(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const totalW = el.clientWidth || 480;
  const margin = { top: 20, right: 20, bottom: 36, left: 44 };
  const width = Math.max(totalW - margin.left - margin.right, 100);
  const height = 200 - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('width', totalW).attr('height', 200)
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const nLines = Math.min(colors.length, 5);
  const nPoints = 8;
  const seeds = [7, 13, 3, 17, 5];
  const linesData = colors.slice(0, nLines).map((color, li) => {
    const seed = seeds[li % seeds.length];
    const points = Array.from({ length: nPoints }, (_, i) => ({
      x: i,
      y: 15 + li * 10 + i * (4 + seed % 3) + ((seed * (i + 1)) % 7) - 3
    }));
    return { color, points };
  });

  const x = d3.scaleLinear().domain([0, nPoints - 1]).range([0, width]);
  const allY = linesData.flatMap(d => d.points.map(p => p.y));
  const y = d3.scaleLinear().domain([0, d3.max(allY) * 1.2]).range([height, 0]);

  g.selectAll('.grid').data(y.ticks(4)).enter().append('line')
    .attr('x1', 0).attr('x2', width).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);

  const lineGen = d3.line().x(d => x(d.x)).y(d => y(d.y)).curve(d3.curveCatmullRom.alpha(0.5));
  linesData.forEach(({ color, points }) => {
    g.append('path').datum(points)
      .attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.5).attr('d', lineGen);
    g.selectAll(null).data(points).enter().append('circle')
      .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
      .attr('r', 3.5).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 1.5);
  });

  const months = ['1月','2月','3月','4月','5月','6月','7月','8月'];
  g.append('g').attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(nPoints - 1).tickFormat(i => months[i]))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  g.append('g').call(d3.axisLeft(y).ticks(4))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');
}

function drawHeatmap(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const totalW = el.clientWidth || 480;
  const rows = 6, cols = 6;
  const size = Math.min(totalW - 16, 260);
  const cellW = size / cols;
  const cellH = cellW;
  const svgH = rows * cellH + 10;

  const svg = d3.select(el).append('svg')
    .attr('width', totalW).attr('height', svgH)
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${(totalW - size) / 2}, 5)`);

  const nColors = colors.length;
  const getColor = val => {
    const t = val / (rows * cols - 1);
    const idx = Math.min(Math.floor(t * nColors), nColors - 1);
    return colors[idx];
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      g.append('rect')
        .attr('x', c * cellW).attr('y', r * cellH)
        .attr('width', cellW - 2).attr('height', cellH - 2)
        .attr('fill', getColor(r * cols + c)).attr('rx', 3);
    }
  }
}

function drawCorrelationMatrix(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const totalW = el.clientWidth || 480;
  const n = 6;
  const size = Math.min(totalW - 40, 240);
  const cell = size / n;
  const svgH = size + 20;

  const svg = d3.select(el).append('svg')
    .attr('width', totalW).attr('height', svgH)
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${(totalW - size) / 2 + 10}, 14)`);

  const labels = ['V1','V2','V3','V4','V5','V6'];
  const corr = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 1;
      return Math.max(-1, Math.min(1, Math.cos((i + j) * 0.9) * 0.7 + Math.sin(i * 1.2 - j * 0.5) * 0.3));
    })
  );

  const getColor = val => {
    const t = (val + 1) / 2;
    const idx = Math.min(Math.floor(t * colors.length), colors.length - 1);
    return colors[idx];
  };

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      g.append('rect')
        .attr('x', c * cell).attr('y', r * cell)
        .attr('width', cell - 2).attr('height', cell - 2)
        .attr('fill', getColor(corr[r][c])).attr('rx', 2);
    }
  }

  g.selectAll('.xlabel').data(labels).enter().append('text')
    .attr('x', (_, i) => i * cell + cell / 2).attr('y', -3)
    .attr('text-anchor', 'middle').style('font-size', '10px').style('fill', '#6e6e73').text(d => d);

  g.selectAll('.ylabel').data(labels).enter().append('text')
    .attr('x', -4).attr('y', (_, i) => i * cell + cell / 2 + 4)
    .attr('text-anchor', 'end').style('font-size', '10px').style('fill', '#6e6e73').text(d => d);
}

function drawScatterPlot(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const totalW = el.clientWidth || 480;
  const margin = { top: 20, right: 20, bottom: 36, left: 44 };
  const width = Math.max(totalW - margin.left - margin.right, 100);
  const height = 200 - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('width', totalW).attr('height', 200)
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  const nGroups = Math.min(colors.length, 5);
  const seeds2 = [31, 17, 53, 7, 41];
  const allPoints = [];
  for (let gi = 0; gi < nGroups; gi++) {
    const sx = seeds2[gi] % 80 + 10;
    const sy = seeds2[gi] % 60 + 20;
    for (let pi = 0; pi < 14; pi++) {
      allPoints.push({
        x: sx + (((gi * 97 + pi * 37) % 50) - 25),
        y: sy + (((gi * 53 + pi * 71) % 50) - 25),
        color: colors[gi]
      });
    }
  }

  const x = d3.scaleLinear().domain([0, 130]).range([0, width]);
  const y = d3.scaleLinear().domain([0, 130]).range([height, 0]);

  g.selectAll('.grid').data(y.ticks(4)).enter().append('line')
    .attr('x1', 0).attr('x2', width).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);

  g.selectAll('.dot').data(allPoints).enter().append('circle')
    .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
    .attr('r', 5).attr('fill', d => d.color).attr('opacity', 0.78)
    .attr('stroke', '#fff').attr('stroke-width', 1.2);

  g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).ticks(4))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  g.append('g').call(d3.axisLeft(y).ticks(4))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');
}

// ═══════════════════════════════════════════════════
// 代码导出
// ═══════════════════════════════════════════════════
function buildExportCode(colors, tab) {
  switch (tab) {
    case 'hex':
      return colors.map(c => `"${c}"`).join(',\n');
    case 'r':
      return `# 在 R 中使用生成的配色方案
palette <- c(${colors.map(c => `"${c}"`).join(', ')})

# 用于 ggplot2
scale_fill_manual(values = palette)
scale_color_manual(values = palette)

# 用于 base R 绘图
barplot(1:${colors.length}, col = palette)`;
    case 'python':
      return `# 在 Python 中使用生成的配色方案
palette = [${colors.map(c => `"${c}"`).join(', ')}]

# 用于 matplotlib
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
cmap = ListedColormap(palette)

# 用于 seaborn
import seaborn as sns
sns.set_palette(palette)`;
    case 'css':
      return `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
    default:
      return '';
  }
}

// ═══════════════════════════════════════════════════
// render()
// ═══════════════════════════════════════════════════
export function render() {
  return `
<style id="p3-styles">
/* ── Hero ── */
.p3-hero {
  min-height: 80vh;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-xl) var(--space-lg);
}
.p3-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 40%, rgba(77,187,213,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 70% 60%, rgba(149,213,178,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.p3-hero-eyebrow {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}
.p3-hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text-on-dark);
  line-height: 1.05;
  margin-bottom: var(--space-sm);
}
.p3-hero-sub {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-on-dark-2);
  max-width: 540px;
  line-height: 1.7;
}
.p3-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-on-dark-3);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
}
.p3-scroll-arrow {
  width: 18px; height: 18px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  transform: rotate(45deg);
  animation: p3ArrowBounce 1.6s ease-in-out infinite;
}
@keyframes p3ArrowBounce {
  0%,100% { transform: rotate(45deg) translateY(0); }
  50% { transform: rotate(45deg) translateY(5px); }
}

/* ── Section labels ── */
.p3-section-label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.p3-section-title-dark {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-on-dark);
  margin-bottom: var(--space-sm);
}
.p3-section-title-light {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-on-light);
  margin-bottom: var(--space-sm);
}
.p3-section-desc-dark { color: var(--text-on-dark-2); font-size: 1rem; line-height: 1.7; }
.p3-section-desc-light { color: var(--text-on-light-2); font-size: 1rem; line-height: 1.7; }

/* ── Section 2: Generator ── */
.p3-generator-section {
  background: var(--bg-dark);
  padding: var(--space-xl) var(--space-lg);
  min-height: 120vh;
}
.p3-gen-header { max-width: 720px; margin: 0 auto var(--space-xl); text-align: center; }

/* Generator layout */
.p3-generator-layout {
  display: flex;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-start;
}
.p3-left-panel {
  width: 340px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.p3-panel-group { display: flex; flex-direction: column; gap: 10px; }
.p3-panel-label {
  font-family: var(--font-heading);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-on-dark-2);
}
.p3-color-input-row { display: flex; align-items: center; gap: 10px; }
.p3-color-picker {
  width: 44px; height: 44px;
  border: 1.5px solid var(--border-dark);
  padding: 2px;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.p3-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
.p3-color-picker::-webkit-color-swatch { border-radius: 6px; border: none; }
.p3-hex-input {
  flex: 1;
  background: #111113;
  border: 1.5px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 0.9rem;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;
}
.p3-hex-input:focus { border-color: var(--accent); }
.p3-algo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.p3-algo-btn {
  background: #111113;
  border: 1.5px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark-2);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.3;
}
.p3-algo-btn:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p3-algo-btn.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }
.p3-slider-row { display: flex; align-items: center; gap: 12px; }
.p3-slider {
  flex: 1;
  -webkit-appearance: none; appearance: none;
  height: 4px; border-radius: 2px;
  background: var(--border-dark); outline: none; cursor: pointer;
}
.p3-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--accent); cursor: pointer;
  box-shadow: 0 1px 6px rgba(126,200,227,0.4);
}
.p3-slider-val { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent); min-width: 24px; text-align: right; }
.p3-generate-btn {
  width: 100%; padding: 14px;
  background: var(--accent); color: #1d1d1f;
  border: none; border-radius: var(--radius-sm);
  font-family: var(--font-heading); font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em;
}
.p3-generate-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
.p3-generate-btn:active { transform: translateY(0); }

/* Right panel */
.p3-right-panel { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 24px; }

/* Swatches */
.p3-palette-swatches { display: flex; gap: 8px; }
.p3-color-box {
  flex: 1;
  height: 80px;
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.p3-color-box:hover { transform: scaleY(1.05); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
.p3-hex-label {
  font-family: var(--font-code); font-size: 0.65rem;
  opacity: 0; transition: opacity 0.2s;
  padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.28);
}
.p3-color-box:hover .p3-hex-label { opacity: 1; }
.p3-copied-flash {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.35);
  font-size: 0.72rem; font-family: var(--font-code);
  opacity: 0; transition: opacity 0.2s; pointer-events: none;
}

/* Chart preview */
.p3-chart-wrapper {
  background: #fff;
  border-radius: var(--radius-md);
  padding: 4px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.p3-chart-area { width: 100%; min-height: 200px; background: #fff; border-radius: 10px; overflow: hidden; }

/* HSL panel */
.p3-hsl-panel {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  padding: 20px;
}
.p3-hsl-title {
  font-family: var(--font-heading);
  font-size: 0.78rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-on-dark-2); margin-bottom: 16px;
}
.p3-hsl-rows { display: flex; flex-direction: column; gap: 10px; }
.p3-hsl-row { display: flex; align-items: center; gap: 8px; }
.p3-hsl-swatch {
  width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
  border: 1.5px solid rgba(255,255,255,0.1);
}
.p3-hsl-row label {
  font-family: var(--font-code); font-size: 0.7rem;
  color: var(--text-on-dark-3); width: 14px; flex-shrink: 0;
}
.p3-hsl-slider {
  flex: 1; -webkit-appearance: none; appearance: none;
  height: 3px; border-radius: 2px;
  background: var(--border-dark); outline: none; cursor: pointer;
  min-width: 40px;
}
.p3-hsl-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; cursor: pointer;
  border: 2px solid var(--bg-dark-elevated);
  box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.p3-hsl-val {
  font-family: var(--font-code); font-size: 0.72rem;
  color: var(--text-on-dark-2); min-width: 30px; text-align: right;
}

/* Export panel */
.p3-export-panel {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.p3-export-header { padding: 16px 20px 0; }
.p3-export-code-wrap { position: relative; padding: 0 20px 20px; }
.p3-export-code {
  font-family: var(--font-code); font-size: 0.8rem;
  line-height: 1.7; color: #a8d8ea;
  background: #0d0d0f; border-radius: var(--radius-sm);
  padding: 16px; margin: 12px 0 0;
  overflow-x: auto; white-space: pre;
  border: 1px solid var(--border-dark); min-height: 90px;
}
.p3-export-copy-wrap { position: absolute; top: 24px; right: 32px; }

/* ── Section 3: Data Types ── */
.p3-datatypes-section {
  background: var(--bg-light);
  padding: var(--space-xl) var(--space-lg);
}
.p3-datatypes-inner { max-width: 1000px; margin: 0 auto; }
.p3-dt-header { text-align: center; margin-bottom: var(--space-lg); }
.p3-scheme-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.p3-scheme-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  background: var(--bg-light-elevated);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-sm);
  cursor: pointer; transition: all 0.2s;
  font-size: 0.85rem; color: var(--text-on-light-2);
}
.p3-scheme-swatches { display: flex; gap: 2px; }
.p3-scheme-swatch { width: 12px; height: 12px; border-radius: 2px; }
.p3-scheme-btn:hover { border-color: var(--accent); color: var(--text-on-light); }
.p3-scheme-btn.active {
  border-color: var(--accent);
  background: var(--accent-subtle);
  color: var(--text-on-light); font-weight: 600;
}
.p3-datatype-desc { font-size: 1rem; color: var(--text-on-light-2); line-height: 1.7; max-width: 680px; margin-bottom: 16px; }
.p3-datatype-controls { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.p3-datatype-controls label { font-size: 0.85rem; color: var(--text-on-light-2); white-space: nowrap; }
.p3-data-slider {
  width: 140px; -webkit-appearance: none; appearance: none;
  height: 4px; border-radius: 2px; background: var(--border-light); outline: none; cursor: pointer;
}
.p3-data-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--accent); cursor: pointer;
}
.p3-data-slider-val { font-family: var(--font-code); font-size: 0.85rem; color: var(--accent-hover); min-width: 20px; }
.p3-data-chart-wrap {
  background: #fff; border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: 4px;
  box-shadow: var(--shadow-sm); overflow: hidden;
}
.p3-data-chart-area { width: 100%; min-height: 200px; background: #fff; border-radius: 10px; overflow: hidden; }

/* Tab overrides for light section */
.p3-datatypes-section .tab-switcher {
  background: transparent;
  border-bottom: 1.5px solid var(--border-light);
  margin-bottom: 28px;
}
.p3-datatypes-section .tab-switcher__tab { color: var(--text-on-light-2); }
.p3-datatypes-section .tab-switcher__tab.active { color: var(--text-on-light); }
.p3-datatypes-section .tab-switcher__indicator { background: var(--accent); bottom: 0; top: auto; height: 2px; }

/* ── Section 4: Errors ── */
.p3-errors-section { background: var(--bg-dark); padding: var(--space-xl) var(--space-lg); }
.p3-errors-inner { max-width: 1100px; margin: 0 auto; }
.p3-errors-header { text-align: center; margin-bottom: var(--space-lg); }
.p3-errors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.p3-error-card {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md); overflow: hidden;
}
.p3-error-card-header {
  padding: 20px 20px 14px;
  font-family: var(--font-heading); font-size: 0.9rem; font-weight: 600;
  color: var(--text-on-dark);
}
.p3-comparison-row { display: flex; gap: 8px; padding: 0 20px; }
.p3-compare-half { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.p3-compare-tag { font-size: 0.68rem; font-family: var(--font-code); font-weight: 600; letter-spacing: 0.05em; }
.p3-compare-tag.bad { color: #FF6B6B; }
.p3-compare-tag.good { color: #4CAF50; }
.p3-compare-chart { background: #fff; border-radius: 6px; overflow: hidden; min-height: 90px; }
.p3-error-desc {
  padding: 14px 20px; font-size: 0.82rem; color: var(--text-on-dark-2); line-height: 1.6;
  border-top: 1px solid var(--border-dark); margin-top: 14px;
}

/* ── Footer CTA ── */
.p3-footer-section {
  background: var(--bg-dark); padding: var(--space-2xl) var(--space-lg);
  text-align: center; border-top: 1px solid var(--border-dark);
}
.p3-footer-stat {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  color: var(--text-on-dark); font-weight: 700;
  margin-bottom: var(--space-md); letter-spacing: -0.02em;
}
.p3-footer-sub { color: var(--text-on-dark-2); font-size: 1rem; margin-bottom: var(--space-lg); }
.p3-footer-links { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.p3-footer-link {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: var(--radius-full);
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s; text-decoration: none; border: none;
}
.p3-footer-link.primary { background: var(--accent); color: #1d1d1f; }
.p3-footer-link.primary:hover { background: var(--accent-hover); transform: translateY(-2px); }
.p3-footer-link.secondary { background: transparent; color: var(--text-on-dark); border: 1.5px solid var(--border-dark); }
.p3-footer-link.secondary:hover { border-color: var(--accent); color: var(--accent); }

/* Mobile */
@media (max-width: 900px) {
  .p3-generator-layout { flex-direction: column; }
  .p3-left-panel { width: 100%; position: static; }
  .p3-errors-grid { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .p3-generator-section, .p3-datatypes-section, .p3-errors-section, .p3-footer-section {
    padding-left: var(--space-sm); padding-right: var(--space-sm);
  }
  .p3-hero { padding: 80px var(--space-sm) 60px; }
  .p3-palette-swatches { gap: 4px; }
  .p3-color-box { height: 60px; }
  .p3-hsl-row label { display: none; }
  .p3-errors-grid { gap: 16px; }
}
</style>

<div class="page-scroll">

  <!-- ══ Section 1: Hero ══ -->
  <section class="p3-hero section-dark">
    <div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;">
      <p class="p3-hero-eyebrow" id="p3-eyebrow">Module 01 / Page 03</p>
      <h1 class="p3-hero-title" id="p3-hero-title">配色生成器</h1>
      <p class="p3-hero-sub" id="p3-hero-sub">从一个基色出发，生成专业的科研配色方案</p>
    </div>
    <div class="p3-scroll-hint" id="p3-scroll-hint">
      <span>SCROLL</span>
      <div class="p3-scroll-arrow"></div>
    </div>
  </section>

  <!-- ══ Section 2: Generator ══ -->
  <section class="p3-generator-section section-dark" id="p3-generator-section">
    <div class="p3-gen-header" id="p3-gen-header">
      <p class="p3-section-label">Interactive Tool</p>
      <h2 class="p3-section-title-dark">自定义配色生成器</h2>
      <p class="p3-section-desc-dark">选择基色和配色算法，实时预览生成的科研配色方案</p>
    </div>

    <div class="p3-generator-layout">
      <!-- Left: controls -->
      <div class="p3-left-panel" id="p3-left-panel">
        <div class="p3-panel-group">
          <div class="p3-panel-label">基色</div>
          <div class="p3-color-input-row">
            <input type="color" id="p3-base-color" class="p3-color-picker" value="#4DBBD5">
            <input type="text" id="p3-hex-input" class="p3-hex-input" value="#4DBBD5" maxlength="7" spellcheck="false">
          </div>
        </div>

        <div class="p3-panel-group">
          <div class="p3-panel-label">配色算法</div>
          <div class="p3-algo-grid">
            <button class="p3-algo-btn" data-algo="complementary">互补色</button>
            <button class="p3-algo-btn active" data-algo="analogous">类似色</button>
            <button class="p3-algo-btn" data-algo="triadic">三角配色</button>
            <button class="p3-algo-btn" data-algo="monochromatic">单色渐变</button>
          </div>
        </div>

        <div class="p3-panel-group">
          <div class="p3-panel-label">颜色数量</div>
          <div class="p3-slider-row">
            <input type="range" class="p3-slider" id="p3-count-slider" min="3" max="8" value="5">
            <span class="p3-slider-val" id="p3-count-val">5</span>
          </div>
        </div>

        <button class="p3-generate-btn" id="p3-generate-btn">✦ 生成配色</button>
      </div>

      <!-- Right: output -->
      <div class="p3-right-panel" id="p3-right-panel">
        <div class="p3-palette-swatches" id="p3-swatches"></div>

        <div>
          <div id="p3-chart-tab-container"></div>
          <div class="p3-chart-wrapper">
            <div class="p3-chart-area" id="p3-chart-area"></div>
          </div>
        </div>

        <div class="p3-hsl-panel">
          <div class="p3-hsl-title">HSL 精细调整</div>
          <div class="p3-hsl-rows" id="p3-hsl-rows"></div>
        </div>

        <div class="p3-export-panel">
          <div class="p3-export-header" id="p3-export-tab-container"></div>
          <div class="p3-export-code-wrap">
            <pre class="p3-export-code" id="p3-export-code"></pre>
            <div class="p3-export-copy-wrap" id="p3-export-copy-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ Section 3: Data Types ══ -->
  <section class="p3-datatypes-section" id="p3-datatypes-section">
    <div class="p3-datatypes-inner">
      <div class="p3-dt-header">
        <p class="p3-section-label" style="color:var(--accent-hover);">数据配色策略</p>
        <h2 class="p3-section-title-light">三类数据配色</h2>
        <p class="p3-section-desc-light">不同类型的数据需要不同的配色策略</p>
      </div>
      <div id="p3-datatype-tab-container"></div>
      <div id="p3-datatype-content"></div>
    </div>
  </section>

  <!-- ══ Section 4: Errors ══ -->
  <section class="p3-errors-section section-dark" id="p3-errors-section">
    <div class="p3-errors-inner">
      <div class="p3-errors-header">
        <p class="p3-section-label">常见错误</p>
        <h2 class="p3-section-title-dark">配色的对与错</h2>
        <p class="p3-section-desc-dark">避免这些常见的配色错误，让你的数据图表更加专业</p>
      </div>
      <div class="p3-errors-grid" id="p3-errors-grid"></div>
    </div>
  </section>

  <!-- ══ Section 5: Footer CTA ══ -->
  <section class="p3-footer-section section-dark" id="p3-footer">
    <div class="p3-footer-stat">"好的配色让数据自己说话"</div>
    <p class="p3-footer-sub">下一步：学习色觉无障碍设计，让更多人看懂你的图表</p>
    <div class="p3-footer-links">
      <button class="p3-footer-link primary" id="p3-next-btn">无障碍色彩 →</button>
      <button class="p3-footer-link secondary" id="p3-prev-btn">← 色彩和谐</button>
    </div>
  </section>

</div>
  `;
}

// ═══════════════════════════════════════════════════
// init()
// ═══════════════════════════════════════════════════
export function init() {
  // Hero entrance
  gsap.fromTo('#p3-eyebrow',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' });
  gsap.fromTo('#p3-hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  gsap.fromTo('#p3-hero-sub',   { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: 'power3.out' });
  gsap.fromTo('#p3-scroll-hint',{ opacity: 0 },        { opacity: 1, duration: 0.6, delay: 1, ease: 'power2.out' });

  // Scroll animations
  fadeIn('#p3-gen-header', { y: 40 });
  scaleReveal('#p3-left-panel');
  scaleReveal('#p3-right-panel');
  fadeIn('#p3-dt-header', { y: 40 });
  fadeIn('#p3-errors-inner', { y: 30 });
  fadeIn('#p3-footer', { y: 30 });

  // Setup
  setupGeneratorControls();
  setupChartTabs();
  setupExportTabs();
  setupDataTypeTabs();
  setupErrorCards();
  setupNavButtons();

  // Initial generation
  state.generatedColors = generatePalette(state.baseHex, state.algorithm, state.colorCount);
  state.hslValues = state.generatedColors.map(hex => {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  });
  renderSwatches();
  renderChart();
  renderHSLRows();
  renderExportCode();
}

// ═══════════════════════════════════════════════════
// Generator controls
// ═══════════════════════════════════════════════════
function setupGeneratorControls() {
  const colorPicker = document.getElementById('p3-base-color');
  const hexInput = document.getElementById('p3-hex-input');
  const countSlider = document.getElementById('p3-count-slider');
  const countVal = document.getElementById('p3-count-val');
  const generateBtn = document.getElementById('p3-generate-btn');

  if (colorPicker) {
    colorPicker.addEventListener('input', e => {
      state.baseHex = e.target.value;
      if (hexInput) hexInput.value = e.target.value;
      debouncedGenerate();
    });
  }

  if (hexInput) {
    hexInput.addEventListener('input', e => {
      const val = e.target.value.trim();
      const hex = val.startsWith('#') ? val : '#' + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
        state.baseHex = hex;
        if (colorPicker) colorPicker.value = hex;
        debouncedGenerate();
      }
    });
  }

  document.querySelectorAll('.p3-algo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.p3-algo-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.algorithm = btn.dataset.algo;
      doGenerate();
    });
  });

  if (countSlider) {
    countSlider.addEventListener('input', e => {
      state.colorCount = parseInt(e.target.value);
      if (countVal) countVal.textContent = state.colorCount;
      debouncedGenerate();
    });
  }

  if (generateBtn) generateBtn.addEventListener('click', doGenerate);
}

let _debTimer = null;
function debouncedGenerate() {
  clearTimeout(_debTimer);
  _debTimer = setTimeout(doGenerate, 80);
}

function doGenerate() {
  state.generatedColors = generatePalette(state.baseHex, state.algorithm, state.colorCount);
  state.hslValues = state.generatedColors.map(hex => {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  });
  renderSwatches();
  renderChart();
  renderHSLRows();
  renderExportCode();
}

// ═══════════════════════════════════════════════════
// Swatches
// ═══════════════════════════════════════════════════
function renderSwatches() {
  const container = document.getElementById('p3-swatches');
  if (!container) return;

  container.innerHTML = state.generatedColors.map((hex, i) => {
    const tc = textColorForBg(hex);
    return `<div class="p3-color-box" data-hex="${hex}" data-idx="${i}" style="background:${hex};" title="点击复制 ${hex}">
      <span class="p3-hex-label" style="color:${tc};">${hex}</span>
      <span class="p3-copied-flash" style="color:${tc};">已复制!</span>
    </div>`;
  }).join('');

  container.querySelectorAll('.p3-color-box').forEach(box => {
    box.addEventListener('click', () => {
      navigator.clipboard.writeText(box.dataset.hex).then(() => {
        const flash = box.querySelector('.p3-copied-flash');
        if (flash) {
          flash.style.opacity = '1';
          setTimeout(() => { flash.style.opacity = '0'; }, 1200);
        }
      }).catch(() => {});
    });
  });
}

// ═══════════════════════════════════════════════════
// Chart tabs
// ═══════════════════════════════════════════════════
function setupChartTabs() {
  const container = document.getElementById('p3-chart-tab-container');
  if (!container) return;

  const tab = createTabSwitcher(container, {
    tabs: [
      { id: 'bar', label: '柱状图' },
      { id: 'line', label: '折线图' },
      { id: 'heatmap', label: '热力图' },
    ],
    activeId: 'bar',
    variant: 'pill',
    onChange: id => { state.chartTab = id; renderChart(); }
  });
  state.tabInstances.push(tab);
}

function renderChart() {
  const area = document.getElementById('p3-chart-area');
  if (!area) return;
  switch (state.chartTab) {
    case 'bar':     drawBarChart(area, state.generatedColors); break;
    case 'line':    drawLineChart(area, state.generatedColors); break;
    case 'heatmap': drawHeatmap(area, state.generatedColors); break;
  }
}

// ═══════════════════════════════════════════════════
// HSL rows
// ═══════════════════════════════════════════════════
function renderHSLRows() {
  const container = document.getElementById('p3-hsl-rows');
  if (!container) return;

  container.innerHTML = state.hslValues.map((hsl, i) => {
    const hex = state.generatedColors[i];
    return `<div class="p3-hsl-row" data-row="${i}">
      <div class="p3-hsl-swatch p3-hsl-swatch-${i}" style="background:${hex};"></div>
      <label>H</label>
      <input type="range" class="p3-hsl-slider" data-idx="${i}" data-comp="h" min="0" max="360" value="${hsl.h}">
      <span class="p3-hsl-val p3-hval-h-${i}">${hsl.h}°</span>
      <label>S</label>
      <input type="range" class="p3-hsl-slider" data-idx="${i}" data-comp="s" min="0" max="100" value="${hsl.s}">
      <span class="p3-hsl-val p3-hval-s-${i}">${hsl.s}%</span>
      <label>L</label>
      <input type="range" class="p3-hsl-slider" data-idx="${i}" data-comp="l" min="0" max="100" value="${hsl.l}">
      <span class="p3-hsl-val p3-hval-l-${i}">${hsl.l}%</span>
    </div>`;
  }).join('');

  container.querySelectorAll('.p3-hsl-slider').forEach(slider => {
    slider.addEventListener('input', e => {
      const idx = parseInt(e.target.dataset.idx);
      const comp = e.target.dataset.comp;
      const val = parseInt(e.target.value);

      if (comp === 'h') state.hslValues[idx].h = val;
      else if (comp === 's') state.hslValues[idx].s = val;
      else if (comp === 'l') state.hslValues[idx].l = val;

      const { h, s, l } = state.hslValues[idx];
      const newHex = hslToHex(h, s, l);
      state.generatedColors[idx] = newHex;

      // Update row swatch + value display
      const swatch = container.querySelector(`.p3-hsl-swatch-${idx}`);
      if (swatch) swatch.style.background = newHex;
      const valEl = container.querySelector(`.p3-hval-${comp}-${idx}`);
      if (valEl) valEl.textContent = comp === 'h' ? `${val}°` : `${val}%`;

      renderSwatches();
      renderChart();
      renderExportCode();
    });
  });
}

// ═══════════════════════════════════════════════════
// Export tabs
// ═══════════════════════════════════════════════════
function setupExportTabs() {
  const container = document.getElementById('p3-export-tab-container');
  if (!container) return;

  const tab = createTabSwitcher(container, {
    tabs: [
      { id: 'hex', label: 'HEX 列表' },
      { id: 'r', label: 'R 代码' },
      { id: 'python', label: 'Python' },
      { id: 'css', label: 'CSS 变量' },
    ],
    activeId: 'hex',
    variant: 'default',
    onChange: id => { state.exportTab = id; renderExportCode(); }
  });
  state.tabInstances.push(tab);

  const copyWrap = document.getElementById('p3-export-copy-wrap');
  if (copyWrap) {
    const copy = createCopyButton(copyWrap, {
      getText: () => buildExportCode(state.generatedColors, state.exportTab),
      label: '复制',
      successLabel: '已复制'
    });
    state.copyInstances.push(copy);
  }
}

function renderExportCode() {
  const el = document.getElementById('p3-export-code');
  if (el) el.textContent = buildExportCode(state.generatedColors, state.exportTab);
}

// ═══════════════════════════════════════════════════
// Data type tabs (Section 3)
// ═══════════════════════════════════════════════════
const DATA_TYPE_DESCS = {
  sequential:  '连续型配色适用于表示有序的单一变量，如基因表达量、温度分布。颜色从浅到深平滑过渡，直觉上传递"越深 = 越大"的信息。',
  diverging:   '发散型配色以中性色为中心，向两侧延伸出两种对立色调，适合表示以零点为基准的数据——如正负相关、收益与损失。',
  qualitative: '定性型配色使用感知上差异明显的不同色调，适合区分无序的类别变量，如不同实验组、不同物种，颜色之间不含有序含义。',
};
const DATA_TYPE_RANGE = {
  sequential:  { min: 3, max: 9 },
  diverging:   { min: 3, max: 7 },
  qualitative: { min: 3, max: 7 },
};

function setupDataTypeTabs() {
  const tabContainer = document.getElementById('p3-datatype-tab-container');
  if (!tabContainer) return;

  const tab = createTabSwitcher(tabContainer, {
    tabs: [
      { id: 'sequential',  label: '连续型（Sequential）' },
      { id: 'diverging',   label: '发散型（Diverging）' },
      { id: 'qualitative', label: '定性型（Qualitative）' },
    ],
    activeId: 'sequential',
    variant: 'default',
    onChange: id => { state.dataTypeTab = id; renderDataTypeContent(); }
  });
  state.tabInstances.push(tab);
  renderDataTypeContent();
}

function renderDataTypeContent() {
  const contentEl = document.getElementById('p3-datatype-content');
  if (!contentEl) return;

  const type = state.dataTypeTab;
  let schemes, schemeIdx, count;
  if (type === 'sequential') {
    schemes = SEQUENTIAL_SCHEMES; schemeIdx = state.seqSchemeIdx; count = state.seqCount;
  } else if (type === 'diverging') {
    schemes = DIVERGING_SCHEMES; schemeIdx = state.divSchemeIdx; count = state.divCount;
  } else {
    schemes = QUALITATIVE_SCHEMES; schemeIdx = state.qualSchemeIdx; count = state.qualCount;
  }

  const range = DATA_TYPE_RANGE[type];
  const colors = getSchemeColors(type, schemeIdx, count);

  contentEl.innerHTML = `
    <p class="p3-datatype-desc">${DATA_TYPE_DESCS[type]}</p>
    <div class="p3-scheme-grid" id="p3-scheme-grid">
      ${schemes.map((s, i) => `
        <button class="p3-scheme-btn${i === schemeIdx ? ' active' : ''}" data-scheme-idx="${i}">
          <div class="p3-scheme-swatches">
            ${s.colors.slice(0, 5).map(c => `<div class="p3-scheme-swatch" style="background:${c};"></div>`).join('')}
          </div>
          <span>${s.name}</span>
        </button>`).join('')}
    </div>
    <div class="p3-datatype-controls">
      <label>颜色数量</label>
      <input type="range" class="p3-data-slider" id="p3-data-count"
        min="${range.min}" max="${range.max}" value="${count}">
      <span class="p3-data-slider-val" id="p3-data-count-val">${count}</span>
    </div>
    <div class="p3-data-chart-wrap">
      <div class="p3-data-chart-area" id="p3-data-chart-area"></div>
    </div>
  `;

  contentEl.querySelectorAll('.p3-scheme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.schemeIdx);
      if (type === 'sequential') state.seqSchemeIdx = idx;
      else if (type === 'diverging') state.divSchemeIdx = idx;
      else state.qualSchemeIdx = idx;
      renderDataTypeContent();
    });
  });

  const sl = contentEl.querySelector('#p3-data-count');
  const sv = contentEl.querySelector('#p3-data-count-val');
  if (sl) {
    sl.addEventListener('input', e => {
      const v = parseInt(e.target.value);
      if (type === 'sequential') state.seqCount = v;
      else if (type === 'diverging') state.divCount = v;
      else state.qualCount = v;
      if (sv) sv.textContent = v;
      const updatedColors = getSchemeColors(type, schemeIdx, v);
      renderDataChart(updatedColors, type);
    });
  }

  renderDataChart(colors, type);
}

function renderDataChart(colors, type) {
  const area = document.getElementById('p3-data-chart-area');
  if (!area) return;
  switch (type) {
    case 'sequential':  drawHeatmap(area, colors); break;
    case 'diverging':   drawCorrelationMatrix(area, colors); break;
    case 'qualitative': drawScatterPlot(area, colors); break;
  }
}

// ═══════════════════════════════════════════════════
// Error cards (Section 4)
// ═══════════════════════════════════════════════════
function setupErrorCards() {
  const grid = document.getElementById('p3-errors-grid');
  if (!grid) return;

  const cards = [
    {
      title: '用彩虹色显示连续数据',
      desc: '彩虹色没有感知上的单调亮度排序，人眼难以判断哪端更大，且对色盲用户完全失效。应改用有序的单色渐变（如 Blues）。',
      badFn: el => drawHeatmap(el, ['#FF0000','#FF7700','#FFFF00','#00FF00','#0000FF','#8B00FF']),
      goodFn: el => drawHeatmap(el, SEQUENTIAL_SCHEMES[0].colors),
    },
    {
      title: '用定性色显示有序数据',
      desc: '定性配色各颜色之间无顺序关系，用在有序柱状图上会让观看者误以为各组是平等并列的。应使用连续型或单色渐变。',
      badFn: el => drawBarChart(el, QUALITATIVE_SCHEMES[0].colors.slice(0, 5)),
      goodFn: el => drawBarChart(el, ['#EFF3FF','#6BAED6','#2171B5','#084594','#041E4A']),
    },
    {
      title: '忽略色盲友好性',
      desc: '红绿配色对约8%的男性（红绿色盲）无法区分，信息完全丢失。Okabe-Ito 配色方案经专门设计，在多种色觉类型下均可区分。',
      badFn: el => drawBarChart(el, ['#FF0000','#00CC00','#FF3333','#009900','#FF6666']),
      goodFn: el => drawBarChart(el, QUALITATIVE_SCHEMES[1].colors.slice(0, 5)),
    },
  ];

  grid.innerHTML = cards.map((card, i) => `
    <div class="p3-error-card">
      <div class="p3-error-card-header">${card.title}</div>
      <div class="p3-comparison-row">
        <div class="p3-compare-half">
          <div class="p3-compare-tag bad">✕ 错误</div>
          <div class="p3-compare-chart" id="p3-err-bad-${i}"></div>
        </div>
        <div class="p3-compare-half">
          <div class="p3-compare-tag good">✓ 正确</div>
          <div class="p3-compare-chart" id="p3-err-good-${i}"></div>
        </div>
      </div>
      <div class="p3-error-desc">${card.desc}</div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    cards.forEach((card, i) => {
      const badEl = document.getElementById(`p3-err-bad-${i}`);
      const goodEl = document.getElementById(`p3-err-good-${i}`);
      if (badEl) card.badFn(badEl);
      if (goodEl) card.goodFn(goodEl);
    });
  });
}

// ═══════════════════════════════════════════════════
// Navigation
// ═══════════════════════════════════════════════════
function setupNavButtons() {
  const nextBtn = document.getElementById('p3-next-btn');
  const prevBtn = document.getElementById('p3-prev-btn');
  if (nextBtn) nextBtn.addEventListener('click', () => { try { navigateTo('m1-p4'); } catch(_){} });
  if (prevBtn) prevBtn.addEventListener('click', () => { try { navigateTo('m1-p2'); } catch(_){} });
}

// ═══════════════════════════════════════════════════
// destroy()
// ═══════════════════════════════════════════════════
export function destroy() {
  killAll();
  clearTimeout(_debTimer);
  if (state.rafId) { cancelAnimationFrame(state.rafId); state.rafId = null; }

  state.tabInstances.forEach(t => { try { t.destroy(); } catch(_){} });
  state.tabInstances = [];
  state.copyInstances.forEach(c => { try { c.destroy(); } catch(_){} });
  state.copyInstances = [];

  // Remove injected style tag
  const style = document.getElementById('p3-styles');
  if (style) style.remove();

  state.generatedColors = [];
  state.hslValues = [];
}
