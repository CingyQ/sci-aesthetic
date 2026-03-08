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

  const W = 520, H = 240;
  const margin = { top: 20, right: 20, bottom: 36, left: 48 };
  const width = W - margin.left - margin.right;
  const height = H - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', 'auto').style('display', 'block')
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
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value) * 1.25]).nice().range([height, 0]);

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
    .call(ax => ax.selectAll('.tick line').remove())
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');
}

function drawLineChart(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const W = 520, H = 240;
  const margin = { top: 24, right: 24, bottom: 36, left: 48 };
  const width = W - margin.left - margin.right;
  const height = H - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', 'auto').style('display', 'block')
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Stock-style data: trending lines with up/down fluctuations
  const nLines = Math.min(colors.length, 5);
  const nPoints = 7;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const stockData = [
    [22, 28, 25, 35, 32, 40, 45],
    [30, 26, 33, 38, 42, 39, 50],
    [45, 48, 43, 52, 55, 58, 62],
    [18, 22, 27, 24, 30, 35, 38],
    [55, 52, 58, 60, 56, 65, 70],
  ];

  const linesData = colors.slice(0, nLines).map((color, li) => ({
    color,
    points: stockData[li % stockData.length].slice(0, nPoints).map((y, i) => ({ x: i, y }))
  }));

  const x = d3.scalePoint().domain(d3.range(nPoints)).range([0, width]).padding(0.1);
  const allY = linesData.flatMap(d => d.points.map(p => p.y));
  const y = d3.scaleLinear().domain([0, d3.max(allY) * 1.15]).nice().range([height, 0]);

  g.selectAll('.grid').data(y.ticks(4)).enter().append('line')
    .attr('x1', 0).attr('x2', width).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);

  const lineGen = d3.line().x(d => x(d.x)).y(d => y(d.y)).curve(d3.curveLinear);
  linesData.forEach(({ color, points }) => {
    g.append('path').datum(points)
      .attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2).attr('d', lineGen);
    g.selectAll(null).data(points).enter().append('circle')
      .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
      .attr('r', 3.5).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 1.5);
  });

  g.append('g').attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(i => months[i]))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .call(ax => ax.selectAll('.tick line').remove())
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  g.append('g').call(d3.axisLeft(y).ticks(4))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .call(ax => ax.selectAll('.tick line').remove())
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');
}

function drawHeatmap(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const rows = 6, cols = 6;
  const cellSize = 40, gap = 3;
  const size = cols * cellSize;
  const W = size + 20, H = rows * cellSize + 20;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('max-width', `${W}px`)
    .style('height', 'auto').style('display', 'block').style('margin', '0 auto')
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${(W - size) / 2}, ${(H - rows * cellSize) / 2})`);

  const nColors = colors.length;
  const getColor = val => {
    const t = val / (rows * cols - 1);
    const idx = Math.min(Math.floor(t * nColors), nColors - 1);
    return colors[idx];
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      g.append('rect')
        .attr('x', c * cellSize).attr('y', r * cellSize)
        .attr('width', cellSize - gap).attr('height', cellSize - gap)
        .attr('fill', getColor(r * cols + c)).attr('rx', 3);
    }
  }
}

function drawCorrelationMatrix(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const n = 6;
  const cell = 38, gap = 2, labelW = 28;
  const size = n * cell;
  const W = size + labelW + 10, H = size + labelW + 10;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('max-width', `${W}px`)
    .style('height', 'auto').style('display', 'block').style('margin', '0 auto')
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${labelW + 4}, ${labelW})`);

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
        .attr('width', cell - gap).attr('height', cell - gap)
        .attr('fill', getColor(corr[r][c])).attr('rx', 2);
    }
  }

  g.selectAll('.xlabel').data(labels).enter().append('text')
    .attr('x', (_, i) => i * cell + (cell - gap) / 2).attr('y', -5)
    .attr('text-anchor', 'middle').style('font-size', '10px').style('fill', '#6e6e73').text(d => d);

  g.selectAll('.ylabel').data(labels).enter().append('text')
    .attr('x', -6).attr('y', (_, i) => i * cell + (cell - gap) / 2 + 4)
    .attr('text-anchor', 'end').style('font-size', '10px').style('fill', '#6e6e73').text(d => d);
}

function drawScatterPlot(container, colors) {
  const el = typeof container === 'string' ? document.querySelector(container) : container;
  if (!el) return;
  el.innerHTML = '';

  const W = 520, H = 280;
  const margin = { top: 20, right: 24, bottom: 40, left: 48 };
  const width = W - margin.left - margin.right;
  const height = H - margin.top - margin.bottom;

  const svg = d3.select(el).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', 'auto').style('display', 'block')
    .style('background', '#fff');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  // Well-separated cluster data with clear group structure
  const nGroups = Math.min(colors.length, 5);
  const clusterCenters = [
    { cx: 25, cy: 70 }, { cx: 55, cy: 30 }, { cx: 80, cy: 65 },
    { cx: 40, cy: 50 }, { cx: 70, cy: 85 },
  ];
  const allPoints = [];
  for (let gi = 0; gi < nGroups; gi++) {
    const center = clusterCenters[gi % clusterCenters.length];
    for (let pi = 0; pi < 10; pi++) {
      // Deterministic scatter using modular arithmetic
      const dx = ((gi * 7 + pi * 13) % 17) - 8;
      const dy = ((gi * 11 + pi * 7) % 15) - 7;
      allPoints.push({
        x: Math.max(2, Math.min(98, center.cx + dx)),
        y: Math.max(2, Math.min(98, center.cy + dy)),
        color: colors[gi],
        group: gi
      });
    }
  }

  const x = d3.scaleLinear().domain([0, 100]).nice().range([0, width]);
  const y = d3.scaleLinear().domain([0, 100]).nice().range([height, 0]);

  // Grid lines
  g.selectAll('.gridh').data(y.ticks(5)).enter().append('line')
    .attr('x1', 0).attr('x2', width).attr('y1', d => y(d)).attr('y2', d => y(d))
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);
  g.selectAll('.gridv').data(x.ticks(5)).enter().append('line')
    .attr('x1', d => x(d)).attr('x2', d => x(d)).attr('y1', 0).attr('y2', height)
    .attr('stroke', '#e8e8ed').attr('stroke-width', 1);

  // Points
  g.selectAll('.dot').data(allPoints).enter().append('circle')
    .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
    .attr('r', 5).attr('fill', d => d.color).attr('opacity', 0.82)
    .attr('stroke', '#fff').attr('stroke-width', 1.2);

  // Axes — ticks aligned to nice values
  g.append('g').attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(5))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .call(ax => ax.selectAll('.tick line').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  g.append('g')
    .call(d3.axisLeft(y).ticks(5))
    .call(ax => ax.select('.domain').attr('stroke', '#d2d2d7'))
    .call(ax => ax.selectAll('.tick line').attr('stroke', '#d2d2d7'))
    .selectAll('text').style('fill', '#6e6e73').style('font-size', '11px');

  // Legend
  const legendG = svg.append('g').attr('transform', `translate(${margin.left + 8}, ${H - 14})`);
  const groupLabels = ['组A','组B','组C','组D','组E'];
  let lx = 0;
  for (let gi = 0; gi < nGroups; gi++) {
    legendG.append('circle').attr('cx', lx).attr('cy', 0).attr('r', 4).attr('fill', colors[gi]);
    legendG.append('text').attr('x', lx + 7).attr('y', 4)
      .style('font-size', '10px').style('fill', '#6e6e73').text(groupLabels[gi]);
    lx += 48;
  }
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
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-xl) var(--space-lg);
}
@keyframes p3-glow-a {
  0%,100% { transform: translate(0,0) scale(1); opacity: 1; }
  45% { transform: translate(-3%,4%) scale(1.1); opacity: 0.65; }
}
@keyframes p3-glow-b {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.6; }
  55% { transform: translate(5%,-3%) scale(0.9); opacity: 1; }
}
.p3-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(77,187,213,0.14) 0%, transparent 65%);
  pointer-events: none;
  animation: p3-glow-a 11s ease-in-out infinite;
}
.p3-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 40% 40% at 72% 62%, rgba(149,213,178,0.09) 0%, transparent 60%);
  pointer-events: none;
  animation: p3-glow-b 14s ease-in-out infinite;
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
  color: var(--text-on-dark);
}
.p3-hero-sub {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 300;
  color: var(--text-on-dark);
  opacity: 0.5;
  max-width: 600px;
  line-height: 1.4;
  text-align: center;
}
.p3-hero-tagline {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  max-width: 540px;
  line-height: 1.8;
  margin-top: var(--space-sm);
  text-align: center;
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
/* ── Stepper 数量选择器（替代原生 range） ── */
.p3-stepper {
  display: flex; align-items: center; position: relative; gap: 0;
  padding: 4px 0;
}
.p3-stepper-track {
  position: absolute; top: 50%; left: 0; right: 0;
  height: 2px; background: var(--border-dark);
  transform: translateY(-50%); z-index: 0;
  border-radius: 1px;
}
.p3-stepper-fill {
  position: absolute; top: 50%; left: 0;
  height: 2px; background: var(--accent);
  transform: translateY(-50%); z-index: 1;
  border-radius: 1px;
  transition: width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.p3-stepper-dot {
  position: relative; z-index: 2;
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-code); font-size: 0.75rem; font-weight: 500;
  color: var(--text-on-dark-3);
  background: var(--bg-dark);
  border: 1.5px solid var(--border-dark);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.p3-stepper-dot:hover {
  border-color: var(--accent);
  color: var(--text-on-dark);
}
.p3-stepper-dot.passed {
  border-color: rgba(126, 200, 227, 0.3);
  color: var(--text-on-dark-2);
}
.p3-stepper-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #1d1d1f;
  font-weight: 700;
  box-shadow: 0 0 12px rgba(126, 200, 227, 0.4);
  transform: scale(1.15);
}
.p3-stepper-gap {
  flex: 1; min-width: 4px;
}

/* 浅色段内的 stepper */
.p3-stepper-light .p3-stepper-track { background: var(--border-light); }
.p3-stepper-light .p3-stepper-fill { background: var(--accent-hover); }
.p3-stepper-light .p3-stepper-dot {
  color: var(--text-on-light-3);
  background: var(--bg-light);
  border-color: var(--border-light);
}
.p3-stepper-light .p3-stepper-dot:hover {
  border-color: var(--accent-hover);
  color: var(--text-on-light);
}
.p3-stepper-light .p3-stepper-dot.passed {
  border-color: rgba(126, 200, 227, 0.35);
  color: var(--text-on-light-2);
}
.p3-stepper-light .p3-stepper-dot.active {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  color: #fff;
  box-shadow: 0 0 10px rgba(126, 200, 227, 0.3);
}
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
.p3-chart-area { width: 100%; background: #fff; border-radius: 10px; overflow: hidden; }

/* HSL panel — collapsible */
.p3-hsl-panel {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.p3-hsl-toggle {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 16px 20px;
  background: none; border: none; cursor: pointer;
  color: var(--text-on-dark-2); transition: color 0.2s;
}
.p3-hsl-toggle:hover { color: var(--text-on-dark); }
.p3-hsl-title {
  font-family: var(--font-heading);
  font-size: 0.78rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.p3-hsl-arrow {
  width: 18px; height: 18px; transition: transform 0.3s var(--ease-apple);
}
.p3-hsl-panel.open .p3-hsl-arrow { transform: rotate(180deg); }
.p3-hsl-body {
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s var(--ease-apple), padding 0.3s;
  padding: 0 20px;
}
.p3-hsl-panel.open .p3-hsl-body {
  max-height: 600px; padding: 0 20px 20px;
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
  overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;
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
.p3-data-chart-wrap {
  background: #fff; border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: 4px;
  box-shadow: var(--shadow-sm); overflow: hidden;
}
.p3-data-chart-area { width: 100%; background: #fff; border-radius: 10px; overflow: hidden; }

/* Tab overrides for light section — underline style */
.p3-datatypes-section .tab-switcher {
  background: transparent;
  border: none;
  border-bottom: 1.5px solid var(--border-light);
  border-radius: 0;
  margin-bottom: 28px;
  padding: 0;
  display: flex;
  width: 100%;
}
.p3-datatypes-section .tab-switcher__tab {
  color: var(--text-on-light-2);
  flex: 1;
  text-align: center;
  padding: 12px 16px;
  border-radius: 0;
  font-size: 0.9rem;
}
.p3-datatypes-section .tab-switcher__tab.active { color: var(--text-on-light); font-weight: 600; }
.p3-datatypes-section .tab-switcher__indicator { background: var(--accent); bottom: 0; top: auto; height: 2.5px; border-radius: 2px 2px 0 0; }

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

/* ── Responsive ── */

/* Tablet / narrow desktop */
@media (max-width: 900px) {
  .p3-generator-layout { flex-direction: column; }
  .p3-left-panel { width: 100%; position: static; }
  .p3-errors-grid { grid-template-columns: 1fr; }
}

/* Tab switcher overflow — allow horizontal scroll on all sizes */
.p3-generator-section .tab-switcher,
.p3-datatypes-section .tab-switcher {
  overflow-x: auto; -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.p3-generator-section .tab-switcher::-webkit-scrollbar,
.p3-datatypes-section .tab-switcher::-webkit-scrollbar { display: none; }
.p3-generator-section .tab-switcher__tab,
.p3-datatypes-section .tab-switcher__tab { white-space: nowrap; flex-shrink: 0; }

/* Mobile */
@media (max-width: 768px) {
  .p3-generator-section, .p3-datatypes-section, .p3-errors-section, .p3-footer-section {
    padding: var(--space-lg) var(--space-sm);
  }
  .p3-hero { padding: 80px var(--space-sm) 48px; }
  .p3-datatypes-section .tab-switcher__tab { font-size: 0.78rem; padding: 10px 8px; }

  /* Left panel compact */
  .p3-left-panel { padding: 20px; gap: 16px; }
  .p3-algo-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
  .p3-algo-btn { font-size: 0.8rem; padding: 8px 10px; }

  /* Stepper 移动端：更大的触控点 */
  .p3-stepper-dot { width: 34px; height: 34px; font-size: 0.8rem; }
  .p3-stepper-dot.active { transform: scale(1.1); }

  /* HSL slider touch sizing */
  .p3-hsl-slider {
    height: auto; min-height: 32px;
  }
  .p3-hsl-slider::-webkit-slider-thumb { width: 22px; height: 22px; }
  .p3-hsl-slider::-moz-range-thumb { width: 22px; height: 22px; }

  /* Swatches wrap on very narrow */
  .p3-palette-swatches { flex-wrap: wrap; gap: 4px; }
  .p3-color-box { flex: 1 1 calc(33% - 4px); min-width: 48px; height: 56px; }
  .p3-hex-label { font-size: 0.55rem; }

  /* HSL rows: stack sliders vertically */
  .p3-hsl-row {
    flex-wrap: wrap; gap: 4px 6px;
  }
  .p3-hsl-swatch { width: 22px; height: 22px; }
  .p3-hsl-row label { font-size: 0.6rem; width: 10px; }
  .p3-hsl-slider { min-width: 50px; }
  .p3-hsl-val { font-size: 0.65rem; min-width: 26px; }

  /* Export code */
  .p3-export-code { font-size: 0.72rem; padding: 12px; max-height: 160px; }
  .p3-export-copy-wrap { top: 16px; right: 24px; }

  /* Data type section */
  .p3-scheme-grid { gap: 6px; }
  .p3-scheme-btn { padding: 6px 10px; font-size: 0.78rem; }
  .p3-scheme-swatch { width: 10px; height: 10px; }
  .p3-datatype-controls { flex-wrap: wrap; gap: 8px; }

  /* Error cards */
  .p3-comparison-row { flex-direction: column; gap: 10px; }
  .p3-error-card-header { font-size: 0.85rem; padding: 16px 16px 10px; }
  .p3-comparison-row { padding: 0 16px; }
  .p3-error-desc { padding: 12px 16px; font-size: 0.78rem; }
}

/* Small phones */
@media (max-width: 400px) {
  .p3-color-box { flex: 1 1 calc(50% - 4px); }
  .p3-algo-grid { grid-template-columns: 1fr; }
  .p3-hsl-row label { display: none; }
  .p3-scheme-btn span { font-size: 0.7rem; }
  .p3-footer-links { flex-direction: column; align-items: stretch; }
  .p3-footer-link { justify-content: center; }
}
</style>

<div class="page-scroll">

  <!-- ══ Section 1: Hero ══ -->
  <section class="p3-hero section-dark section-hero-full">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="p3-hero-eyebrow" id="p3-eyebrow" style="opacity:0;">Module 01 / Page 03</p>
      <h1 class="page-hero-title p3-hero-title" id="p3-hero-title" style="color:var(--text-on-dark);opacity:0;">配色生成器</h1>
      <p class="page-hero-sub p3-hero-sub" id="p3-hero-sub" style="opacity:0;">Color Palette Generator</p>
      <p class="p3-hero-tagline" id="p3-hero-tagline" style="opacity:0;">从一个基色出发，生成专业的科研配色方案</p>
      <!-- 快捷导航 -->
      <nav class="hero-quicknav" id="p3-hero-nav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#p3-generator-section">自定义配色</button>
        <button class="hero-quicknav__item" data-target="#p3-datatypes-section">数据配色类型</button>
        <button class="hero-quicknav__item" data-target="#p3-errors-section">常见错误</button>
      </nav>
    </div>
    <div class="p3-scroll-hint" id="p3-scroll-hint" style="opacity:0;">↓ 向下探索</div>
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
          <div class="p3-stepper" id="p3-count-stepper" data-min="3" data-max="8" data-value="5">
            <div class="p3-stepper-track"></div>
            <div class="p3-stepper-fill"></div>
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

        <div class="p3-hsl-panel" id="p3-hsl-panel">
          <button class="p3-hsl-toggle" id="p3-hsl-toggle" type="button">
            <span class="p3-hsl-title">HSL 精细调整</span>
            <svg class="p3-hsl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="p3-hsl-body">
            <div class="p3-hsl-rows" id="p3-hsl-rows"></div>
          </div>
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
  gsap.fromTo('#p3-eyebrow',      { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.7, delay: 0.1,  ease: 'power3.out' });
  gsap.fromTo('#p3-hero-title',   { opacity: 0, y: 40 }, { opacity: 1,   y: 0, duration: 0.9, delay: 0.25, ease: 'power3.out' });
  gsap.fromTo('#p3-hero-sub',     { opacity: 0, y: 30 }, { opacity: 0.5, y: 0, duration: 0.8, delay: 0.4,  ease: 'power3.out' });
  gsap.fromTo('#p3-hero-tagline', { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, delay: 0.55, ease: 'power3.out' });
  gsap.fromTo('#p3-hero-nav',     { opacity: 0, y: 20 }, { opacity: 1,   y: 0, duration: 0.8, delay: 0.7,  ease: 'power3.out' });
  gsap.fromTo('#p3-scroll-hint',  { opacity: 0 },        { opacity: 1,          duration: 0.6, delay: 1,    ease: 'power2.out' });

  // Scroll animations
  fadeIn('#p3-gen-header', { y: 40 });
  scaleReveal('#p3-left-panel');
  scaleReveal('#p3-right-panel');
  fadeIn('#p3-dt-header', { y: 40 });
  fadeIn('#p3-errors-inner', { y: 30 });
  fadeIn('#p3-footer', { y: 30 });

  // HSL panel toggle
  const hslToggle = document.getElementById('p3-hsl-toggle');
  const hslPanel = document.getElementById('p3-hsl-panel');
  if (hslToggle && hslPanel) {
    hslToggle.addEventListener('click', () => { hslPanel.classList.toggle('open'); });
  }

  // Setup
  setupGeneratorControls();
  setupChartTabs();
  setupExportTabs();
  setupDataTypeTabs();
  setupErrorCards();
  setupNavButtons();
  // 快捷导航
  document.querySelectorAll('#p3-hero-nav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

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
/**
 * 初始化 stepper 数量选择器
 * @param {HTMLElement} container - .p3-stepper 容器
 * @param {function} onChange - 值变化回调 (newValue: number) => void
 */
function initStepper(container, onChange) {
  if (!container) return;
  const min = parseInt(container.dataset.min);
  const max = parseInt(container.dataset.max);
  let value = parseInt(container.dataset.value);

  function render() {
    // 清除旧的 dots 和 gaps（保留 track 和 fill）
    container.querySelectorAll('.p3-stepper-dot, .p3-stepper-gap').forEach(el => el.remove());
    const fill = container.querySelector('.p3-stepper-fill');

    for (let i = min; i <= max; i++) {
      if (i > min) {
        const gap = document.createElement('div');
        gap.className = 'p3-stepper-gap';
        container.appendChild(gap);
      }
      const dot = document.createElement('button');
      dot.className = 'p3-stepper-dot';
      dot.textContent = i;
      dot.type = 'button';
      if (i === value) dot.classList.add('active');
      else if (i < value) dot.classList.add('passed');
      dot.addEventListener('click', () => {
        value = i;
        container.dataset.value = i;
        updateVisual();
        if (onChange) onChange(i);
      });
      container.appendChild(dot);
    }
    updateFill(fill);
  }

  function updateVisual() {
    const dots = container.querySelectorAll('.p3-stepper-dot');
    dots.forEach((dot, idx) => {
      const num = min + idx;
      dot.classList.remove('active', 'passed');
      if (num === value) dot.classList.add('active');
      else if (num < value) dot.classList.add('passed');
    });
    updateFill(container.querySelector('.p3-stepper-fill'));
  }

  function updateFill(fill) {
    if (!fill) return;
    const total = max - min;
    const progress = total > 0 ? (value - min) / total : 0;
    // 计算 fill 宽度：从第一个 dot 中心到 active dot 中心
    const dots = container.querySelectorAll('.p3-stepper-dot');
    if (dots.length < 2) { fill.style.width = '0'; return; }
    requestAnimationFrame(() => {
      const first = dots[0];
      const active = dots[value - min];
      if (!first || !active) return;
      const containerRect = container.getBoundingClientRect();
      const firstCenter = first.getBoundingClientRect().left + first.offsetWidth / 2 - containerRect.left;
      const activeCenter = active.getBoundingClientRect().left + active.offsetWidth / 2 - containerRect.left;
      fill.style.left = firstCenter + 'px';
      fill.style.width = (activeCenter - firstCenter) + 'px';
    });
  }

  render();
}

function setupGeneratorControls() {
  const colorPicker = document.getElementById('p3-base-color');
  const hexInput = document.getElementById('p3-hex-input');
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

  // 颜色数量 stepper
  initStepper(document.getElementById('p3-count-stepper'), val => {
    state.colorCount = val;
    debouncedGenerate();
  });

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
      { id: 'sequential',  label: '连续型 Sequential' },
      { id: 'diverging',   label: '发散型 Diverging' },
      { id: 'qualitative', label: '定性型 Qualitative' },
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
      <div class="p3-stepper p3-stepper-light" id="p3-data-stepper" data-min="${range.min}" data-max="${range.max}" data-value="${count}" style="flex:1;">
        <div class="p3-stepper-track"></div>
        <div class="p3-stepper-fill"></div>
      </div>
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

  // 数据配色数量 stepper
  initStepper(contentEl.querySelector('#p3-data-stepper'), v => {
    if (type === 'sequential') state.seqCount = v;
    else if (type === 'diverging') state.divCount = v;
    else state.qualCount = v;
    const updatedColors = getSchemeColors(type, schemeIdx, v);
    renderDataChart(updatedColors, type);
  });

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
      desc: '彩虹色没有感知上的单调亮度排序，人眼难以判断哪端更大，且对不同色觉条件的读者不友好。应改用有序的单色渐变（如 Blues）。',
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
      title: '忽略色觉多样性',
      desc: '红绿配色对约 8% 的男性读者难以区分，信息可能丢失。Okabe-Ito 配色方案经专门设计，在多种色觉条件下均可清晰辨别。',
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
