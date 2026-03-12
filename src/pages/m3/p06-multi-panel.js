// p06-multi-panel.js — 多面板图形
// Hero → S1 排版规范 → S2 拖拽布局编辑器 → S3 代码生成 → S4 期刊案例 → Footer CTA

import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';
import Sortable from 'sortablejs';
import * as d3 from 'd3';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _eventHandlers = [];
let _sortableInstances = [];
let _editors = [];
let _timeouts = [];
let _rEditor = null;
let _pyEditor = null;

// 布局编辑器状态
let _editorState = {
  panelCount: 4,
  layoutId: '2x2',
  cells: [],
  spacing: 12,                   // tight:4 / normal:12 / loose:24
  showLabels: true,
  preset: 'nature-double'        // 尺寸预设
};

// ══════════════════════════════════════════════════════
//  工具函数
// ══════════════════════════════════════════════════════
function addEvt(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// 伪随机数（固定 seed，图表可复现）
function makeRng(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

// ══════════════════════════════════════════════════════
//  面板类型定义
// ══════════════════════════════════════════════════════
const PANEL_TYPES = [
  { id: 'main',    label: '主图',   icon: '◈', desc: '散点+回归线' },
  { id: 'scatter', label: '散点图', icon: '⠿', desc: '双变量关系' },
  { id: 'line',    label: '折线图', icon: '∿', desc: '时间序列' },
  { id: 'bar',     label: '柱状图', icon: '▐', desc: '组间比较' },
  { id: 'box',     label: '箱线图', icon: '⊟', desc: '分布形态' },
  { id: 'heatmap', label: '热图',   icon: '▦', desc: '矩阵数据' },
];

// ══════════════════════════════════════════════════════
//  布局模板定义（驱动动态画布）
// ══════════════════════════════════════════════════════
const LAYOUTS = {
  1: [
    { id: '1x1', label: '单图', cols: 1, rows: 1, gridCols: '1fr', desc: '单栏独立图，全宽' },
  ],
  2: [
    { id: '1x2', label: '左右并排', cols: 2, rows: 1, gridCols: '1fr 1fr', desc: '双变量对比，等宽' },
    { id: '2x1', label: '上下堆叠', cols: 1, rows: 2, gridCols: '1fr', desc: '时间序列上下对比' },
    { id: '1w+1', label: '主图+辅图', cols: 2, rows: 1, gridCols: '1.8fr 1fr', desc: '主图突出，辅图辅助' },
  ],
  3: [
    { id: '1x3', label: '三列叙事', cols: 3, rows: 1, gridCols: '1fr 1fr 1fr', desc: '因果三步递进' },
    { id: '1s+2', label: '主图+两辅', cols: 2, rows: 2, gridCols: '1.6fr 1fr', spans: [{ idx: 0, rowSpan: 2 }], desc: '左侧主图，右侧上下两辅' },
    { id: '2+1s', label: '两辅+主图', cols: 2, rows: 2, gridCols: '1fr 1.6fr', spans: [{ idx: 1, colStart: 2, rowSpan: 2 }], desc: '左侧上下两辅，右侧主图' },
  ],
  4: [
    { id: '2x2', label: '四等分', cols: 2, rows: 2, gridCols: '1fr 1fr', desc: '均等对比，2×2' },
    { id: '1x4', label: '四列横排', cols: 4, rows: 1, gridCols: 'repeat(4,1fr)', desc: '步骤演示，横向展开' },
    { id: '1s+3', label: '主图+三辅', cols: 2, rows: 3, gridCols: '1.6fr 1fr', spans: [{ idx: 0, rowSpan: 3 }], desc: '左侧大主图，右侧三小图' },
  ],
  5: [
    { id: '2+3', label: '上2下3', cols: 3, rows: 2, gridCols: '1fr 1fr 1fr', spanConfig: '2+3', desc: '上方两图，下方三图' },
    { id: '3+2', label: '上3下2', cols: 3, rows: 2, gridCols: '1fr 1fr 1fr', spanConfig: '3+2', desc: '上方三图，下方两图居中' },
    { id: '1s+4', label: '主图+四辅', cols: 2, rows: 3, gridCols: '1.5fr 1fr', spans: [{ idx: 0, rowSpan: 2 }], desc: '左侧主图占两行，右侧四小图' },
  ],
  6: [
    { id: '2x3', label: '两行三列', cols: 3, rows: 2, gridCols: '1fr 1fr 1fr', desc: 'Nature 标准双栏六图' },
    { id: '3x2', label: '三行两列', cols: 2, rows: 3, gridCols: '1fr 1fr', desc: '纵向叙事六图' },
    { id: '1sx2+4', label: '主图+五辅', cols: 3, rows: 3, gridCols: '1.5fr 1fr 1fr', spans: [{ idx: 0, rowSpan: 3 }], desc: '左侧大主图，右侧2列五小图' },
  ],
  7: [
    { id: '3+4', label: '上3下4', cols: 4, rows: 2, gridCols: 'repeat(4,1fr)', spanConfig: '3+4', desc: '复杂七图组合' },
    { id: '2x3+1', label: '六格+底图', cols: 3, rows: 3, gridCols: '1fr 1fr 1fr', spans: [{ idx: 6, colSpan: 3 }], desc: '六格+底部横幅图' },
  ],
  8: [
    { id: '2x4', label: '两行四列', cols: 4, rows: 2, gridCols: 'repeat(4,1fr)', desc: '大版面八图' },
    { id: '4x2', label: '四行两列', cols: 2, rows: 4, gridCols: '1fr 1fr', desc: '纵向长图' },
    { id: '1sx3+4', label: '主图+七辅', cols: 4, rows: 2, gridCols: '1.8fr 1fr 1fr 1fr', spans: [{ idx: 0, rowSpan: 2 }], desc: '左侧主图，右侧七小图' },
  ],
};

// ══════════════════════════════════════════════════════
//  布局工具函数
// ══════════════════════════════════════════════════════
function getCurrentLayout() {
  const list = LAYOUTS[_editorState.panelCount] || LAYOUTS[4];
  return list.find(l => l.id === _editorState.layoutId) || list[0];
}

function setPanelCount(n) {
  _editorState.panelCount = n;
  const list = LAYOUTS[n] || LAYOUTS[4];
  _editorState.layoutId = list[0].id;
  _editorState.cells = Array(n).fill(null);
}

function setLayout(layoutId) {
  const list = LAYOUTS[_editorState.panelCount] || LAYOUTS[4];
  const layout = list.find(l => l.id === layoutId);
  if (!layout) return;
  _editorState.layoutId = layoutId;
  const n = _editorState.panelCount;
  _editorState.cells = Array(n).fill(null).map((_, i) => _editorState.cells[i] || null);
}

// ══════════════════════════════════════════════════════
//  Mini D3 图表预览
// ══════════════════════════════════════════════════════
const PANEL_PREVIEWS = {
  scatter(svg, w, h) {
    const rng = makeRng(31);
    const pts = Array.from({ length: 20 }, () => ({ x: rng(), y: rng() }));
    const xS = d3.scaleLinear([0, 1], [6, w - 6]);
    const yS = d3.scaleLinear([0, 1], [h - 6, 6]);
    d3.select(svg).selectAll('circle').data(pts).join('circle')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
      .attr('r', 2.5).attr('fill', '#7EC8E3').attr('opacity', 0.75);
  },
  line(svg, w, h) {
    const rng = makeRng(17);
    const pts = Array.from({ length: 12 }, (_, i) => ({ x: i / 11, y: 0.3 + rng() * 0.5 }));
    const xS = d3.scaleLinear([0, 1], [6, w - 6]);
    const yS = d3.scaleLinear([0, 1], [h - 6, 6]);
    const lineGen = d3.line().x(d => xS(d.x)).y(d => yS(d.y)).curve(d3.curveCatmullRom);
    d3.select(svg).append('path')
      .datum(pts).attr('d', lineGen)
      .attr('fill', 'none').attr('stroke', '#95D5B2').attr('stroke-width', 1.8);
    d3.select(svg).selectAll('circle').data(pts).join('circle')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
      .attr('r', 2).attr('fill', '#95D5B2');
  },
  bar(svg, w, h) {
    const vals = [0.5, 0.75, 0.45, 0.85, 0.6];
    const colors = ['#7EC8E3', '#95D5B2', '#B8B8E8', '#F0B27A', '#7EC8E3'];
    const xS = d3.scaleBand().domain(d3.range(5)).range([4, w - 4]).padding(0.3);
    const yS = d3.scaleLinear([0, 1], [h - 4, 4]);
    d3.select(svg).selectAll('rect').data(vals).join('rect')
      .attr('x', (_, i) => xS(i)).attr('y', d => yS(d))
      .attr('width', xS.bandwidth()).attr('height', d => (h - 4) - yS(d))
      .attr('fill', (_, i) => colors[i]).attr('rx', 1);
  },
  box(svg, w, h) {
    const groups = [
      { x: w * 0.2, q1: h * 0.3,  med: h * 0.45, q3: h * 0.6,  lo: h * 0.2,  hi: h * 0.7,  c: '#7EC8E3' },
      { x: w * 0.5, q1: h * 0.25, med: h * 0.4,  q3: h * 0.55, lo: h * 0.15, hi: h * 0.65, c: '#95D5B2' },
      { x: w * 0.8, q1: h * 0.35, med: h * 0.5,  q3: h * 0.65, lo: h * 0.25, hi: h * 0.75, c: '#B8B8E8' },
    ];
    const bw = w * 0.14;
    const s = d3.select(svg);
    groups.forEach(g => {
      s.append('line').attr('x1', g.x).attr('x2', g.x).attr('y1', g.lo).attr('y2', g.hi)
        .attr('stroke', g.c).attr('stroke-width', 1.2);
      s.append('rect').attr('x', g.x - bw / 2).attr('y', g.q1).attr('width', bw).attr('height', g.q3 - g.q1)
        .attr('fill', 'none').attr('stroke', g.c).attr('stroke-width', 1.5).attr('rx', 1);
      s.append('line').attr('x1', g.x - bw / 2).attr('x2', g.x + bw / 2).attr('y1', g.med).attr('y2', g.med)
        .attr('stroke', g.c).attr('stroke-width', 1.8);
    });
  },
  heatmap(svg, w, h) {
    const rows = 4, cols = 5;
    const rng = makeRng(99);
    const cScale = d3.scaleSequential(d3.interpolateYlOrRd).domain([0, 1]);
    const cw = (w - 4) / cols, ch = (h - 4) / rows;
    d3.select(svg).selectAll('rect')
      .data(d3.cross(d3.range(rows), d3.range(cols)))
      .join('rect')
      .attr('x', ([, j]) => 2 + j * cw).attr('y', ([i]) => 2 + i * ch)
      .attr('width', cw - 1).attr('height', ch - 1)
      .attr('fill', () => cScale(rng())).attr('rx', 1);
  },
  main(svg, w, h) {
    const rng = makeRng(42);
    const pts = Array.from({ length: 25 }, () => ({ x: rng(), y: rng() * 0.7 + rng() * 0.3 }));
    const xS = d3.scaleLinear([0, 1], [8, w - 8]);
    const yS = d3.scaleLinear([0, 1], [h - 8, 8]);
    d3.select(svg).append('line')
      .attr('x1', xS(0)).attr('y1', yS(0.15)).attr('x2', xS(1)).attr('y2', yS(0.85))
      .attr('stroke', '#F0B27A').attr('stroke-width', 1.5).attr('opacity', 0.7);
    d3.select(svg).selectAll('circle.pt').data(pts).join('circle')
      .attr('class', 'pt')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y))
      .attr('r', 3).attr('fill', '#7EC8E3').attr('opacity', 0.8)
      .attr('stroke', '#fff').attr('stroke-width', 0.5);
  }
};

function renderMiniChart(container, type, w, h) {
  container.innerHTML = '';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.style.display = 'block';
  container.appendChild(svg);
  const fn = PANEL_PREVIEWS[type];
  if (fn) fn(svg, w, h);
}

// ══════════════════════════════════════════════════════
//  布局编辑器：刷新画布
// ══════════════════════════════════════════════════════
function refreshCanvas() {
  const grid = document.getElementById('p06-canvas-grid');
  if (!grid) return;
  grid.style.gap = _editorState.spacing + 'px';

  const cells = grid.querySelectorAll('.p06-cell');
  cells.forEach((cell, i) => {
    const panelType = _editorState.cells[i];
    const chartDiv  = cell.querySelector('.p06-cell-chart');
    const labelDiv  = cell.querySelector('.p06-cell-label');
    const emptyDiv  = cell.querySelector('.p06-cell-empty');

    if (panelType) {
      const cw = cell.offsetWidth  || 120;
      const ch = Math.round(cw * 0.6);
      if (chartDiv) renderMiniChart(chartDiv, panelType, cw - 16, Math.min(ch, 80));
      if (labelDiv) {
        labelDiv.textContent = String.fromCharCode(65 + i);
        labelDiv.style.display = _editorState.showLabels ? 'flex' : 'none';
      }
      if (emptyDiv) emptyDiv.style.display = 'none';
      cell.classList.add('p06-cell--filled');
    } else {
      if (chartDiv) chartDiv.innerHTML = '';
      if (labelDiv) labelDiv.style.display = 'none';
      if (emptyDiv) emptyDiv.style.display = 'flex';
      cell.classList.remove('p06-cell--filled');
    }
  });

  // 同步移动端画布
  const mobileGrid = document.getElementById('p06-canvas-grid-m');
  if (mobileGrid) {
    mobileGrid.style.gap = _editorState.spacing + 'px';
    const mobileCells = mobileGrid.querySelectorAll('.p06-cell');
    mobileCells.forEach((cell, i) => {
      const panelType = _editorState.cells[i];
      const chartDiv  = cell.querySelector('.p06-cell-chart');
      const labelDiv  = cell.querySelector('.p06-cell-label');
      const emptyDiv  = cell.querySelector('.p06-cell-empty');

      if (panelType) {
        if (chartDiv) renderMiniChart(chartDiv, panelType, 100, 60);
        if (labelDiv) {
          labelDiv.textContent = String.fromCharCode(65 + i);
          labelDiv.style.display = _editorState.showLabels ? 'flex' : 'none';
        }
        if (emptyDiv) emptyDiv.style.display = 'none';
        cell.classList.add('p06-cell--filled');
      } else {
        if (chartDiv) chartDiv.innerHTML = '';
        if (labelDiv) labelDiv.style.display = 'none';
        if (emptyDiv) emptyDiv.style.display = 'flex';
        cell.classList.remove('p06-cell--filled');
      }
    });
  }

  updateGeneratedCode();
}

function clearCanvas() {
  _editorState.cells = Array(_editorState.panelCount).fill(null);
  refreshCanvas();
}

// ══════════════════════════════════════════════════════
//  代码生成
// ══════════════════════════════════════════════════════
const PANEL_R_MAP = {
  main:    'p_main',
  scatter: 'p_scatter',
  line:    'p_line',
  bar:     'p_bar',
  box:     'p_box',
  heatmap: 'p_heatmap',
};

function generateRCode() {
  const filled = _editorState.cells.filter(Boolean);
  if (filled.length === 0) return '# 请先选择面板放置到画布\n';

  const unique = [...new Set(filled)];
  const defs = unique.map(t => {
    const map = {
      main:    `# 主图：散点 + 回归线\np_main <- ggplot(df, aes(x = var1, y = var2, color = group)) +\n  geom_point(size = 2, alpha = 0.7) +\n  geom_smooth(method = "lm", se = TRUE, linewidth = 0.8) +\n  scale_color_manual(values = okabe_ito) +\n  theme_classic(base_size = 10) +\n  labs(x = "自变量", y = "因变量")`,
      scatter: `# 散点图\np_scatter <- ggplot(df, aes(x = x1, y = x2)) +\n  geom_point(size = 2, alpha = 0.6, color = "#7EC8E3") +\n  theme_classic(base_size = 10)`,
      line:    `# 折线图\np_line <- ggplot(df_time, aes(x = time, y = value, color = group)) +\n  geom_line(linewidth = 0.8) +\n  geom_point(size = 1.5) +\n  theme_classic(base_size = 10)`,
      bar:     `# 柱状图\np_bar <- ggplot(df_sum, aes(x = group, y = mean, fill = group)) +\n  geom_col(width = 0.6) +\n  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.2) +\n  theme_classic(base_size = 10)`,
      box:     `# 箱线图\np_box <- ggplot(df, aes(x = group, y = value, fill = group)) +\n  geom_boxplot(width = 0.5, outlier.shape = NA, alpha = 0.6) +\n  geom_jitter(width = 0.1, size = 1.5, alpha = 0.5) +\n  theme_classic(base_size = 10)`,
      heatmap: `# 热图\np_heatmap <- ggplot(df_mat, aes(x = col, y = row, fill = value)) +\n  geom_tile(color = "white", linewidth = 0.3) +\n  scale_fill_distiller(palette = "YlOrRd", direction = 1) +\n  theme_minimal(base_size = 10)`,
    };
    return map[t] || `p_${t} <- ggplot() + labs(title = "${t}")`;
  }).join('\n\n');

  const varNames = _editorState.cells.map(t => t ? PANEL_R_MAP[t] : 'plot_spacer()');
  const labelsCode = _editorState.showLabels
    ? '\n  plot_annotation(tag_levels = "A") &\n  theme(plot.tag = element_text(size = 8, face = "bold"))'
    : '';

  return `library(ggplot2)
library(patchwork)

# Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00", "#56B4E9", "#009E73")

# ─── 各子图定义 ───────────────────────────────────────
${defs}

# ─── 组合布局（2×3 网格）────────────────────────────
# 间距控制：theme(plot.margin = unit(c(${_editorState.spacing/4},${_editorState.spacing/4},${_editorState.spacing/4},${_editorState.spacing/4}), "mm"))
(${varNames.join(' | ')}) +
  plot_layout(ncol = 3, guides = "collect")${labelsCode}

# ─── 导出 ─────────────────────────────────────────────
ggsave("multi_panel.pdf",
       width = 183, height = 120, units = "mm", dpi = 300)`;
}

function generatePyCode() {
  const filled = _editorState.cells.filter(Boolean);
  if (filled.length === 0) return '# 请先选择面板放置到画布\n';

  const hspace = _editorState.spacing <= 4 ? 0.3 : _editorState.spacing <= 12 ? 0.45 : 0.6;
  const wspace = _editorState.spacing <= 4 ? 0.25 : _editorState.spacing <= 12 ? 0.35 : 0.5;

  const plotCalls = _editorState.cells.map((t, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const axRef = `ax[${row}][${col}]`;
    const label = _editorState.showLabels
      ? `${axRef}.set_title("(${String.fromCharCode(65 + i)})", loc='left', fontweight='bold', fontsize=9)\n`
      : '';
    const calls = {
      main:    `${axRef}.scatter(df['var1'], df['var2'], c=colors, alpha=0.7, s=20)\n${axRef}.plot(x_fit, y_fit, color='#F0B27A', lw=1.2)\n${label}${axRef}.set(xlabel='自变量', ylabel='因变量')`,
      scatter: `${axRef}.scatter(df['x1'], df['x2'], alpha=0.6, s=20, color='#7EC8E3')\n${label}${axRef}.set(xlabel='X', ylabel='Y')`,
      line:    `${axRef}.plot(df['time'], df['value'], lw=1.2, color='#95D5B2', marker='o', ms=3)\n${label}${axRef}.set(xlabel='时间', ylabel='数值')`,
      bar:     `${axRef}.bar(groups, means, color='#7EC8E3', yerr=sems, capsize=3, width=0.5)\n${label}${axRef}.set(xlabel='分组', ylabel='均值 ± SE')`,
      box:     `bxp = ${axRef}.boxplot([df[df['group']==g]['value'] for g in groups], patch_artist=True)\nfor patch in bxp['boxes']: patch.set_facecolor('#95D5B2'); patch.set_alpha(0.5)\n${label}${axRef}.set(xlabel='分组', ylabel='数值')`,
      heatmap: `im = ${axRef}.imshow(matrix, aspect='auto', cmap='YlOrRd')\nfig.colorbar(im, ax=${axRef}, shrink=0.8)\n${label}`,
    };
    if (!t) return `${axRef}.axis('off')  # 空格`;
    return calls[t] || `${axRef}.text(0.5, 0.5, '${t}', ha='center', va='center', transform=${axRef}.transAxes)`;
  }).join('\n\n');

  return `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# ─── 全局样式设置 ──────────────────────────────────────
plt.rcParams.update({
    'font.size': 9,
    'axes.labelsize': 9,
    'axes.titlesize': 9,
    'xtick.labelsize': 8,
    'ytick.labelsize': 8,
    'figure.dpi': 300,
    'axes.spines.top': False,
    'axes.spines.right': False,
})

# ─── 示例数据 ──────────────────────────────────────────
np.random.seed(42)
df = pd.DataFrame({
    'var1': np.random.randn(50),
    'var2': np.random.randn(50),
    'x1': np.random.randn(50),
    'x2': np.random.randn(50),
    'time': np.arange(50),
    'value': np.cumsum(np.random.randn(50)),
    'group': np.repeat(['A', 'B', 'C', 'D', 'E'], 10)
})
groups = ['A', 'B', 'C', 'D', 'E']
means = df.groupby('group')['value'].mean().values
sems  = df.groupby('group')['value'].sem().values
matrix = np.random.rand(5, 6)
colors = ['#7EC8E3' if g == 'A' else '#95D5B2' for g in df['group']]
x_fit = np.linspace(df['var1'].min(), df['var1'].max(), 50)
y_fit = np.poly1d(np.polyfit(df['var1'], df['var2'], 1))(x_fit)

# ─── 创建 2×3 画布（183mm × 120mm = Nature 双栏）─────
fig, ax = plt.subplots(2, 3, figsize=(7.2, 4.7))
fig.subplots_adjust(hspace=${hspace}, wspace=${wspace})

${plotCalls}

# ─── 导出 ─────────────────────────────────────────────
plt.tight_layout()
plt.savefig('multi_panel.pdf', bbox_inches='tight', dpi=300)
plt.savefig('multi_panel.tiff', bbox_inches='tight', dpi=600)
print("导出完成：multi_panel.pdf / .tiff")`;
}

function updateGeneratedCode() {
  if (_rEditor) {
    try { _rEditor.setCode(generateRCode()); } catch (_) {}
  }
  if (_pyEditor) {
    try { _pyEditor.setCode(generatePyCode()); } catch (_) {}
  }
}

// ══════════════════════════════════════════════════════
//  SortableJS 初始化（桌面端）
// ══════════════════════════════════════════════════════
function initSortable() {
  const pool = document.getElementById('p06-panel-pool');
  if (!pool) return;

  // 面板池：只能拖出（clone），不能接收
  const poolSortable = new Sortable(pool, {
    group: { name: 'panels', pull: 'clone', put: false },
    animation: 150,
    ghostClass: 'p06-ghost',
    sort: false,
  });
  _sortableInstances.push(poolSortable);

  // 画布格子：可接收拖放
  const cells = document.querySelectorAll('#p06-canvas-grid .p06-cell');
  cells.forEach((cell, i) => {
    const cellSortable = new Sortable(cell, {
      group: { name: 'panels', pull: false, put: true },
      animation: 150,
      ghostClass: 'p06-ghost',
      onAdd(evt) {
        const type = evt.item.dataset.panelType;
        _editorState.cells[i] = type;
        // 移除 SortableJS 插入的 DOM 节点（由 refreshCanvas 自己渲染内容）
        try { evt.item.remove(); } catch (_) {}
        refreshCanvas();
      }
    });
    _sortableInstances.push(cellSortable);

    // 点击已填充的格子：清除
    addEvt(cell, 'click', () => {
      if (_editorState.cells[i]) {
        _editorState.cells[i] = null;
        refreshCanvas();
      }
    });
  });
}

// ══════════════════════════════════════════════════════
//  移动端预设模板
// ══════════════════════════════════════════════════════
const MOBILE_PRESETS = [
  {
    id: 'a', label: '主图 + 辅图', desc: '主散点+柱+箱+折线',
    cells: ['main', 'bar', 'box', 'line', null, null],
  },
  {
    id: 'b', label: '3列叙事流', desc: '散点→折线→柱状',
    cells: ['scatter', 'line', 'bar', null, null, null],
  },
  {
    id: 'c', label: '全面板 2×3', desc: '六种图表全展示',
    cells: ['main', 'scatter', 'line', 'bar', 'box', 'heatmap'],
  },
];

function initMobilePresets() {
  const container = document.getElementById('p06-mobile-presets');
  if (!container) return;
  MOBILE_PRESETS.forEach(preset => {
    const btn = container.querySelector(`[data-preset="${preset.id}"]`);
    if (!btn) return;
    addEvt(btn, 'click', () => {
      _editorState.cells = [...preset.cells];
      container.querySelectorAll('.p06-preset-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      refreshCanvas();
    });
  });
}

// ══════════════════════════════════════════════════════
//  控制面板事件
// ══════════════════════════════════════════════════════
function initEditorControls() {
  // 间距按钮（桌面 + 移动端共用，通过 class 匹配所有）
  document.querySelectorAll('.p06-spacing-btn').forEach(btn => {
    addEvt(btn, 'click', () => {
      document.querySelectorAll('.p06-spacing-btn').forEach(b => b.classList.remove('active'));
      // 只激活同 data-spacing 的所有按钮
      document.querySelectorAll(`.p06-spacing-btn[data-spacing="${btn.dataset.spacing}"]`)
        .forEach(b => b.classList.add('active'));
      _editorState.spacing = parseInt(btn.dataset.spacing);
      refreshCanvas();
    });
  });

  // 标签开关
  ['p06-label-toggle', 'p06-label-toggle-m'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    addEvt(el, 'change', () => {
      _editorState.showLabels = el.checked;
      // 同步另一个
      ['p06-label-toggle', 'p06-label-toggle-m'].forEach(oid => {
        const o = document.getElementById(oid);
        if (o && o !== el) o.checked = _editorState.showLabels;
      });
      refreshCanvas();
    });
  });

  // 尺寸预设
  document.querySelectorAll('.p06-size-btn').forEach(btn => {
    addEvt(btn, 'click', () => {
      document.querySelectorAll('.p06-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _editorState.preset = btn.dataset.size;
    });
  });

  // 清空画布
  const clearBtn = document.getElementById('p06-clear-btn');
  if (clearBtn) addEvt(clearBtn, 'click', clearCanvas);

  // 生成代码 → 跳转到 S3
  ['p06-export-code-btn', 'p06-export-code-btn-m'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    addEvt(btn, 'click', () => {
      updateGeneratedCode();
      const s3 = document.getElementById('p06-s3');
      if (s3) s3.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ══════════════════════════════════════════════════════
//  S3 代码 Tab + 复制按钮
// ══════════════════════════════════════════════════════
function initCodeTabs() {
  const tabs   = document.querySelectorAll('.p06-code-tab');
  const panels = document.querySelectorAll('.p06-code-panel');
  tabs.forEach(tab => {
    addEvt(tab, 'click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('p06-code-' + tab.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

function initCopyButtons() {
  document.querySelectorAll('.p06-copy-btn').forEach(btn => {
    addEvt(btn, 'click', async () => {
      const text = btn.dataset.copyTarget === 'r' ? generateRCode() : generatePyCode();
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '已复制 ✓';
        _timeouts.push(setTimeout(() => { btn.textContent = '复制代码'; }, 2000));
      } catch (_) {
        btn.textContent = '复制失败';
      }
    });
  });
}

// ══════════════════════════════════════════════════════
//  Quicknav 平滑滚动
// ══════════════════════════════════════════════════════
function initQuicknav() {
  const nav = document.getElementById('p06-quicknav');
  if (!nav) return;
  nav.querySelectorAll('.hero-quicknav__item').forEach(btn => {
    addEvt(btn, 'click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ══════════════════════════════════════════════════════
//  Footer 导航
// ══════════════════════════════════════════════════════
function initFooterNav() {
  const prevBtn = document.getElementById('p06-btn-prev');
  const homeBtn = document.getElementById('p06-home-btn');
  const nextBtn = document.getElementById('p06-btn-next');
  if (prevBtn) addEvt(prevBtn, 'click', () => navigateTo('m3-p5'));
  if (homeBtn) addEvt(homeBtn, 'click', () => navigateTo('m3-p1'));
  if (nextBtn) addEvt(nextBtn, 'click', () => navigateTo('m3-p7'));
}

// ══════════════════════════════════════════════════════
//  GSAP ScrollTrigger 动画
// ══════════════════════════════════════════════════════
function initScrollAnimations() {
  fadeIn('#p06-s1 .p06-section-label', { y: 30, duration: 0.7 });
  fadeIn('#p06-s1 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('#p06-s1 .p06-intro-text',    { y: 30, duration: 0.7 });
  fadeIn('.p06-spec-item',             { stagger: 0.1, y: 25, duration: 0.6 });
  fadeIn('.p06-archetype-card',        { stagger: 0.18, y: 40, duration: 0.7 });

  fadeIn('#p06-s2 .p06-section-label', { y: 30, duration: 0.7 });
  fadeIn('#p06-s2 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('#p06-s2 .p06-editor-layout', { y: 40, duration: 0.7 });
  fadeIn('#p06-s2 .p06-mobile-presets',{ y: 30, duration: 0.6 });

  fadeIn('#p06-s3 .p06-section-label', { y: 30, duration: 0.7 });
  fadeIn('#p06-s3 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('.p06-code-tabs',             { y: 25, duration: 0.6 });
  fadeIn('.p06-code-panels',           { y: 35, duration: 0.7 });
  fadeIn('.p06-annotation',            { stagger: 0.12, y: 25, duration: 0.6 });

  fadeIn('#p06-s4 .p06-section-label', { y: 30, duration: 0.7 });
  fadeIn('#p06-s4 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('.p06-journal-card',          { stagger: 0.2,  y: 45, duration: 0.8 });

  fadeIn('.page-footer-quote',         { y: 40, duration: 0.9 });
  fadeIn('.page-footer-cta .page-footer-nav', { y: 25, duration: 0.6 });
}

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════
export function render() {
  // 面板池
  const poolItems = PANEL_TYPES.map(pt => `
    <div class="p06-pool-item" data-panel-type="${pt.id}" title="${pt.desc}" draggable="true">
      <span class="p06-pool-icon">${pt.icon}</span>
      <span class="p06-pool-label">${pt.label}</span>
    </div>
  `).join('');

  // 画布格子
  const canvasCells = Array.from({ length: 6 }, (_, i) => `
    <div class="p06-cell" data-cell-index="${i}">
      <div class="p06-cell-label" style="display:none;">${String.fromCharCode(65 + i)}</div>
      <div class="p06-cell-chart"></div>
      <div class="p06-cell-empty">
        <span class="p06-cell-empty-icon">+</span>
        <span class="p06-cell-empty-text">拖入面板</span>
      </div>
    </div>
  `).join('');

  // 移动端预设
  const mobilePresets = MOBILE_PRESETS.map((p, i) => `
    <button class="p06-preset-btn${i === 0 ? ' active' : ''}" data-preset="${p.id}" style="min-height:44px;">
      <strong>${p.label}</strong>
      <small>${p.desc}</small>
    </button>
  `).join('');

  // 期刊数据
  const journals = [
    {
      name: 'Nature', color: '#7EC8E3',
      specs: [
        { label: '单栏宽度', value: '89 mm' },
        { label: '1.5 栏宽度', value: '140 mm' },
        { label: '双栏宽度', value: '183 mm' },
        { label: '最大高度', value: '247 mm' },
        { label: '最大子图数', value: '建议 ≤ 8' },
        { label: '分辨率', value: 'PNG ≥ 300 dpi' },
        { label: '字体最小值', value: '≥ 7 pt（终稿）' },
        { label: '标签格式', value: 'a, b, c（小写）' },
      ],
      colRatios: [{ label: '单栏', mm: 89 }, { label: '1.5栏', mm: 140 }, { label: '双栏', mm: 183 }],
      note: 'Nature 要求图注在图下方，字体不小于 7pt。彩图须同时提供灰度版本确认可读性。'
    },
    {
      name: 'Cell', color: '#95D5B2',
      specs: [
        { label: '单栏宽度', value: '85 mm' },
        { label: '双栏宽度', value: '170 mm' },
        { label: '最大高度', value: '225 mm' },
        { label: '最大子图数', value: '建议 ≤ 7' },
        { label: '分辨率', value: 'TIFF ≥ 300 dpi' },
        { label: '字体最小值', value: '≥ 6 pt（终稿）' },
        { label: '标签格式', value: 'A, B, C（大写）' },
        { label: '格式要求', value: 'PDF / TIFF / EPS' },
      ],
      colRatios: [{ label: '单栏', mm: 85 }, { label: '双栏', mm: 170 }],
      note: 'Cell 系列偏好 TIFF 格式。面板标签使用大写字母，置于左上角，字体加粗。'
    },
    {
      name: 'Science', color: '#B8B8E8',
      specs: [
        { label: '单栏宽度', value: '55 mm' },
        { label: '1.5 栏宽度', value: '114 mm' },
        { label: '双栏宽度', value: '173 mm' },
        { label: '最大高度', value: '234 mm' },
        { label: '最大子图数', value: '建议 ≤ 6' },
        { label: '分辨率', value: 'EPS / PDF 矢量优先' },
        { label: '字体最小值', value: '≥ 7 pt（终稿）' },
        { label: '标签格式', value: 'A, B, C（大写粗体）' },
      ],
      colRatios: [{ label: '单栏', mm: 55 }, { label: '1.5栏', mm: 114 }, { label: '双栏', mm: 173 }],
      note: 'Science 版面更窄（单栏 55mm），图表必须精简。优先使用矢量格式（EPS/PDF）。'
    }
  ];

  const journalCards = journals.map(j => {
    const specRows = j.specs.map(s => `
      <div class="p06-spec-row">
        <span class="p06-spec-key">${s.label}</span>
        <span class="p06-spec-val">${s.value}</span>
      </div>
    `).join('');
    const colMocks = j.colRatios.map((c, idx) => {
      const pct = Math.round(c.mm / 183 * 100);
      const opacity = 0.4 + idx * 0.2;
      return `
        <div class="p06-col-mock">
          <div class="p06-col-bar" style="width:${pct}%;background:${j.color};opacity:${opacity};"></div>
          <span class="p06-col-label">${c.label}<br><small>${c.mm} mm</small></span>
        </div>
      `;
    }).join('');
    return `
      <div class="p06-journal-card">
        <div class="p06-journal-header" style="border-color:${j.color};">
          <h3 class="p06-journal-name" style="color:${j.color};">${j.name}</h3>
          <span class="p06-journal-badge" style="background:${j.color}20;border-color:${j.color}55;color:${j.color};">投稿必读</span>
        </div>
        <div class="p06-col-visual">${colMocks}</div>
        <div class="p06-spec-list">${specRows}</div>
        <p class="p06-journal-note">${j.note}</p>
      </div>
    `;
  }).join('');

  return `<div class="page-scroll">
<style>
/* ── Hero ── */
.p06-hero { position:relative; overflow:hidden; align-items:center; }
.p06-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 20% 40%, rgba(149,213,178,0.12) 0%, transparent 65%); animation:p06-drift-a 14s ease-in-out infinite; pointer-events:none; }
.p06-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 80% 60%, rgba(126,200,227,0.08) 0%, transparent 60%); animation:p06-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p06-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-10px)} }
@keyframes p06-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,18px)} }
.p06-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p06-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p06-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 通用标题 ── */
.p06-section-label { font-size:0.75rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p06-label-light { color:var(--module-3,#95D5B2); }
.p06-label-dark  { color:var(--module-3,#95D5B2); }
.p06-section-title { font-family:var(--font-display); font-size:clamp(2rem,4vw,3.2rem); font-weight:700; letter-spacing:-0.02em; line-height:1.15; margin:0 0 var(--space-lg); }
.p06-title-light { color:var(--text-on-light); }
.p06-title-dark  { color:var(--text-on-dark); }

/* ── S1 排版规范 ── */
.p06-s1-inner { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xxl); align-items:start; max-width:1100px; margin:0 auto; }
.p06-intro-text { font-size:1rem; color:var(--text-on-light-2); line-height:1.8; margin-bottom:var(--space-lg); }
.p06-spec-item { display:flex; align-items:baseline; gap:12px; padding:10px 14px; background:rgba(149,213,178,0.07); border-left:3px solid var(--module-3,#95D5B2); border-radius:0 var(--radius-sm) var(--radius-sm) 0; margin-bottom:10px; }
.p06-spec-item-key { font-weight:700; color:var(--module-3,#95D5B2); font-size:0.82rem; white-space:nowrap; min-width:96px; }
.p06-spec-item-val { font-size:0.87rem; color:var(--text-on-light-2); line-height:1.5; }

.p06-archetype-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-md) var(--space-lg); border:1px solid var(--border-light); margin-bottom:var(--space-md); }
.p06-archetype-header { display:flex; align-items:center; gap:var(--space-sm); margin-bottom:var(--space-md); }
.p06-archetype-num { width:28px; height:28px; border-radius:50%; background:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:700; font-size:0.78rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.p06-archetype-name { font-weight:700; color:var(--text-on-light); font-size:0.95rem; margin:0; }
.p06-archetype-use  { font-size:0.8rem; color:var(--text-on-light-2); margin:2px 0 0; }

/* 布局示意图 */
.p06-layout-diagram { display:grid; gap:4px; border-radius:var(--radius-sm); overflow:hidden; margin-bottom:var(--space-sm); height:84px; background:rgba(149,213,178,0.04); border:1px solid rgba(149,213,178,0.15); padding:4px; box-sizing:border-box; }
.p06-layout-cell { background:rgba(149,213,178,0.18); border:1.5px solid rgba(149,213,178,0.5); border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:700; color:var(--module-3,#95D5B2); }
.layout-2x2 { grid-template-columns:1fr 1fr; }
.layout-1plus2 { grid-template-columns:1.6fr 1fr; grid-template-rows:1fr 1fr; }
.layout-1plus2 .p06-layout-cell:first-child { grid-row:span 2; }
.layout-3col { grid-template-columns:1fr 1fr 1fr; }
.p06-archetype-note { font-size:0.8rem; color:var(--text-on-light-2); margin:0; line-height:1.6; }

/* ── S2 拖拽编辑器 ── */
.p06-editor-intro { font-size:1rem; color:var(--text-on-dark-2); line-height:1.8; margin-bottom:var(--space-xl); max-width:600px; }
.p06-editor-layout { display:grid; grid-template-columns:190px 1fr; gap:var(--space-xl); align-items:start; }
.p06-pool-title { font-size:0.72rem; font-weight:700; color:var(--text-on-dark-2); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p06-panel-pool { display:flex; flex-direction:column; gap:8px; min-height:200px; }
.p06-pool-item { display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(255,255,255,0.06); border:1.5px solid var(--border-dark); border-radius:var(--radius-sm); cursor:grab; transition:all 0.18s; user-select:none; min-height:44px; }
.p06-pool-item:hover { border-color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); transform:translateX(2px); }
.p06-pool-item:active { cursor:grabbing; }
.p06-pool-icon  { font-size:1.05rem; line-height:1; color:var(--module-3,#95D5B2); }
.p06-pool-label { font-size:0.85rem; color:var(--text-on-dark); font-weight:500; }
.p06-pool-hint  { font-size:0.72rem; color:var(--text-on-dark-3); margin-top:var(--space-sm); line-height:1.6; }

.p06-canvas-area {}
.p06-canvas-controls { display:flex; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:var(--space-md); padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-radius:var(--radius-sm); border:1px solid var(--border-dark); }
.p06-ctrl-group { display:flex; align-items:center; gap:8px; }
.p06-ctrl-label { font-size:0.75rem; color:var(--text-on-dark-2); white-space:nowrap; }
.p06-spacing-btn, .p06-size-btn { padding:5px 11px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.78rem; cursor:pointer; transition:all 0.18s; font-family:inherit; min-height:32px; }
.p06-spacing-btn.active, .p06-size-btn.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }
.p06-toggle-wrap { display:flex; align-items:center; gap:6px; }
.p06-toggle { width:36px; height:20px; background:#444; border-radius:10px; cursor:pointer; position:relative; border:none; appearance:none; -webkit-appearance:none; transition:background 0.2s; flex-shrink:0; vertical-align:middle; }
.p06-toggle:checked { background:var(--module-3,#95D5B2); }
.p06-toggle::after { content:''; position:absolute; width:14px; height:14px; background:#fff; border-radius:50%; top:3px; left:3px; transition:left 0.2s; }
.p06-toggle:checked::after { left:19px; }
.p06-toggle-label { font-size:0.78rem; color:var(--text-on-dark-2); cursor:pointer; }

.p06-canvas-wrap { background:rgba(255,255,255,0.03); border:1.5px solid var(--border-dark); border-radius:var(--radius-md); padding:var(--space-md); }
.p06-canvas-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.p06-cell { background:rgba(255,255,255,0.04); border:1.5px dashed rgba(149,213,178,0.25); border-radius:var(--radius-sm); min-height:100px; position:relative; cursor:pointer; transition:border-color 0.2s, background 0.2s; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.p06-cell:hover { border-color:rgba(149,213,178,0.45); background:rgba(149,213,178,0.04); }
.p06-cell--filled { border-style:solid; border-color:rgba(149,213,178,0.4); background:rgba(149,213,178,0.06); }
.p06-cell--filled:hover { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.04); }
.p06-cell-label { position:absolute; top:4px; left:5px; z-index:2; width:18px; height:18px; background:var(--module-3,#95D5B2); color:#1d1d1f; border-radius:3px; font-size:0.66rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
.p06-cell-chart { width:100%; padding:8px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
.p06-cell-chart svg { max-width:100%; display:block; }
.p06-cell-empty { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; pointer-events:none; }
.p06-cell-empty-icon { font-size:1.4rem; color:rgba(149,213,178,0.3); line-height:1; }
.p06-cell-empty-text { font-size:0.66rem; color:rgba(149,213,178,0.35); }
.p06-ghost { opacity:0.35; border:2px dashed var(--module-3,#95D5B2) !important; background:rgba(149,213,178,0.08) !important; }

.p06-canvas-actions { display:flex; align-items:center; gap:12px; margin-top:var(--space-md); flex-wrap:wrap; }
.p06-action-btn { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; }
.p06-action-btn:hover { border-color:var(--text-on-dark-2); color:var(--text-on-dark); }
.p06-action-btn--primary { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:600; }
.p06-action-btn--primary:hover { opacity:0.88; }
.p06-canvas-hint { font-size:0.76rem; color:var(--text-on-dark-3); margin-top:8px; }

/* 移动端预设 */
.p06-mobile-presets { display:none; flex-direction:column; gap:10px; margin-bottom:var(--space-lg); }
.p06-preset-btn { display:flex; flex-direction:column; align-items:flex-start; gap:3px; padding:14px 18px; border-radius:var(--radius-md); border:1.5px solid var(--border-dark); background:rgba(255,255,255,0.04); color:var(--text-on-dark); cursor:pointer; transition:all 0.2s; font-family:inherit; text-align:left; }
.p06-preset-btn strong { font-size:0.9rem; }
.p06-preset-btn small { font-size:0.78rem; color:var(--text-on-dark-2); }
.p06-preset-btn.active { border-color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }

/* ── S3 代码生成 ── */
.p06-code-tabs { display:flex; gap:8px; margin-bottom:var(--space-lg); }
.p06-code-tab { padding:8px 22px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.85rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; }
.p06-code-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-code-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); font-weight:600; }
.p06-code-panel { display:none; }
.p06-code-panel.active { display:block; animation:p06-panel-in 0.25s ease; }
@keyframes p06-panel-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.p06-code-panel-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); }
.p06-code-panel-title { font-size:1.05rem; font-weight:700; color:var(--text-on-light); }
.p06-code-panel-desc { font-size:0.88rem; color:var(--text-on-light-2); margin-bottom:var(--space-md); line-height:1.7; }
.p06-copy-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; white-space:nowrap; }
.p06-copy-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-editor-container { border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-light); margin-bottom:var(--space-lg); }
.p06-annotation-list { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); }
.p06-annotation { padding:14px 16px; background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:0 var(--radius-sm) var(--radius-sm) 0; }
.p06-annotation-key { font-family:var(--font-code); font-size:0.78rem; color:var(--module-3,#95D5B2); font-weight:700; margin-bottom:5px; word-break:break-all; }
.p06-annotation-desc { font-size:0.83rem; color:var(--text-on-light-2); line-height:1.6; }

/* ── S4 期刊案例 ── */
.p06-journal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-xl); max-width:1100px; margin:0 auto; }
.p06-journal-card { background:rgba(255,255,255,0.04); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); }
.p06-journal-header { display:flex; align-items:center; justify-content:space-between; padding-bottom:var(--space-md); margin-bottom:var(--space-md); border-bottom:2px solid; }
.p06-journal-name { font-family:var(--font-display); font-size:1.55rem; font-weight:700; margin:0; letter-spacing:-0.02em; }
.p06-journal-badge { font-size:0.7rem; font-weight:700; padding:4px 10px; border-radius:var(--radius-full); border:1px solid; letter-spacing:0.06em; white-space:nowrap; }
.p06-col-visual { margin-bottom:var(--space-md); display:flex; flex-direction:column; gap:8px; }
.p06-col-mock { display:flex; align-items:center; gap:10px; }
.p06-col-bar { height:13px; border-radius:3px; min-width:6px; }
.p06-col-label { font-size:0.75rem; color:var(--text-on-dark-2); line-height:1.3; white-space:nowrap; }
.p06-col-label small { font-size:0.67rem; color:var(--text-on-dark-3); display:block; }
.p06-spec-list { display:flex; flex-direction:column; gap:0; margin-bottom:var(--space-md); }
.p06-spec-row { display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
.p06-spec-row:last-child { border-bottom:none; }
.p06-spec-key { font-size:0.78rem; color:var(--text-on-dark-2); }
.p06-spec-val { font-size:0.8rem; font-weight:600; color:var(--text-on-dark); font-family:var(--font-code); text-align:right; }
.p06-journal-note { font-size:0.8rem; color:var(--text-on-dark-2); line-height:1.7; padding:10px 13px; background:rgba(255,255,255,0.04); border-radius:var(--radius-sm); margin:0; }

/* ── Footer ── */
#p06-footer { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:50vh; text-align:center; padding:var(--space-xxl) var(--space-lg); }
.p06-footer-nav { display:flex; gap:var(--space-md); flex-wrap:wrap; justify-content:center; margin-top:var(--space-xl); }
.p06-nav-btn { padding:14px 28px; border-radius:var(--radius-full); border:1.5px solid rgba(255,255,255,0.22); background:transparent; color:var(--text-on-dark); font-size:0.95rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:48px; }
.p06-nav-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-nav-btn--primary { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:600; }
.p06-nav-btn--primary:hover { opacity:0.88; color:#1d1d1f; }

/* ── 响应式 ── */
@media (max-width:1024px) {
  .p06-s1-inner { grid-template-columns:1fr; gap:var(--space-xl); }
  .p06-journal-grid { grid-template-columns:1fr; gap:var(--space-lg); }
  .p06-editor-layout { grid-template-columns:1fr; }
  .p06-panel-pool { flex-direction:row; flex-wrap:wrap; }
  .p06-pool-item { flex:1 1 130px; }
}
@media (max-width:768px) {
  #p06-s1, #p06-s2, #p06-s3, #p06-s4 { scroll-margin-top:56px; }
  .p06-annotation-list { grid-template-columns:1fr; }
  .p06-canvas-grid { grid-template-columns:repeat(2,1fr); }
  .p06-desktop-drag { display:none !important; }
  .p06-mobile-presets { display:flex !important; }
  .p06-canvas-controls { flex-direction:column; align-items:flex-start; }
  .p06-footer-nav { flex-direction:column; align-items:center; }
}
@media (max-width:480px) {
  .p06-canvas-grid { grid-template-columns:1fr 1fr; }
  .p06-journal-grid { grid-template-columns:1fr; }
}
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p06-hero" id="p06-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 06</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">多面板图形</h1>
    <p class="page-hero-sub" style="opacity:0;">Multi-Panel Figure Composition</p>
    <p class="p06-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">像 Nature 一样排版——掌握科研多图组合的视觉语言</p>
    <nav class="hero-quicknav" id="p06-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p06-s1">排版规范</button>
      <button class="hero-quicknav__item" data-target="#p06-s2">拖拽布局</button>
      <button class="hero-quicknav__item" data-target="#p06-s3">代码生成</button>
      <button class="hero-quicknav__item" data-target="#p06-s4">期刊案例</button>
    </nav>
    <div class="p06-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 排版规范 ── -->
<section class="section-light" id="p06-s1" style="padding:var(--space-xxl) var(--space-lg);">
  <div class="p06-s1-inner">
    <!-- 左：规范说明 -->
    <div>
      <p class="p06-section-label p06-label-light">Layout Principles</p>
      <h2 class="p06-section-title p06-title-light">排版规范<br>Nature / Science 标准</h2>
      <p class="p06-intro-text">顶级期刊对多面板图形有严格要求。了解这些规范，不仅能通过审稿人的技术检查，更能让图表拥有专业的视觉重量感。</p>
      <div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">最大宽度</span>
          <span class="p06-spec-item-val">Nature 双栏 183 mm，Cell 双栏 170 mm，Science 双栏 173 mm</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">字体最小值</span>
          <span class="p06-spec-item-val">期刊终稿字体 ≥ 7 pt，轴标签不小于 6 pt（打印后可读）</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">面板标签</span>
          <span class="p06-spec-item-val">Nature 用小写 a/b/c，Cell/Science 用大写 A/B/C，置于左上角</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">分辨率</span>
          <span class="p06-spec-item-val">位图 ≥ 300 dpi，线条图 ≥ 600 dpi，首选矢量格式 PDF/EPS</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">图例整合</span>
          <span class="p06-spec-item-val">多面板共享图例应合并为一个，放在右侧或底部，避免重复</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">色彩规范</span>
          <span class="p06-spec-item-val">彩色需额外付费，确认配色在灰度打印时仍可被区分</span>
        </div>
      </div>
    </div>

    <!-- 右：布局原型 -->
    <div>
      <!-- 2×2 四等分 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">1</div>
          <div>
            <p class="p06-archetype-name">2×2 四等分布局</p>
            <p class="p06-archetype-use">同类型数据对比，各面板等权重</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-2x2">
          <div class="p06-layout-cell">A</div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
          <div class="p06-layout-cell">D</div>
        </div>
        <p class="p06-archetype-note">适合：基因表达对比、四个处理组、Before/After 两对实验</p>
      </div>

      <!-- 1+2 宽窄组合 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">2</div>
          <div>
            <p class="p06-archetype-name">1+2 宽窄组合</p>
            <p class="p06-archetype-use">主图突出，右侧细节图辅助说明</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-1plus2">
          <div class="p06-layout-cell">A<br><small style="opacity:0.6;font-size:0.6rem;">主图</small></div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
        </div>
        <p class="p06-archetype-note">适合：模式图+验证、流程图+实验结果、总览+局部放大</p>
      </div>

      <!-- 3列叙事流 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">3</div>
          <div>
            <p class="p06-archetype-name">3列叙事流</p>
            <p class="p06-archetype-use">左→右递进，讲述因果故事</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-3col">
          <div class="p06-layout-cell">A<br><small style="opacity:0.55;font-size:0.58rem;">起因</small></div>
          <div class="p06-layout-cell">B<br><small style="opacity:0.55;font-size:0.58rem;">过程</small></div>
          <div class="p06-layout-cell">C<br><small style="opacity:0.55;font-size:0.58rem;">结论</small></div>
        </div>
        <p class="p06-archetype-note">适合：分子机制通路、三步验证实验、病程发展阶段</p>
      </div>
    </div>
  </div>
</section>

<!-- ── S2 拖拽布局编辑器 ── -->
<section class="section-dark" id="p06-s2" style="padding:var(--space-xxl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="p06-section-label p06-label-dark">Interactive Editor</p>
    <h2 class="p06-section-title p06-title-dark">拖拽布局编辑器</h2>
    <p class="p06-editor-intro">从左侧面板库拖入图表类型到画布格子，实时预览 2×3 布局效果。点击已放置的面板可将其移除。</p>

    <!-- 移动端：预设模板选择 -->
    <div id="p06-mobile-presets" class="p06-mobile-presets">
      <p class="p06-pool-title">选择预设布局模板</p>
      ${mobilePresets}
    </div>

    <!-- 桌面端：拖拽编辑器 -->
    <div class="p06-editor-layout p06-desktop-drag">
      <!-- 左：面板库 -->
      <div>
        <p class="p06-pool-title">面板库</p>
        <div id="p06-panel-pool" class="p06-panel-pool">
          ${poolItems}
        </div>
        <p class="p06-pool-hint">拖拽到右侧画布<br>点击已放置面板可移除</p>
      </div>

      <!-- 右：控制 + 画布 -->
      <div class="p06-canvas-area">
        <!-- 控制面板 -->
        <div class="p06-canvas-controls">
          <div class="p06-ctrl-group">
            <span class="p06-ctrl-label">间距</span>
            <button class="p06-spacing-btn" data-spacing="4">紧密</button>
            <button class="p06-spacing-btn active" data-spacing="12">正常</button>
            <button class="p06-spacing-btn" data-spacing="24">宽松</button>
          </div>
          <div class="p06-ctrl-group p06-toggle-wrap">
            <input type="checkbox" class="p06-toggle" id="p06-label-toggle" checked>
            <label class="p06-toggle-label" for="p06-label-toggle">ABCDEF 标签</label>
          </div>
          <div class="p06-ctrl-group">
            <span class="p06-ctrl-label">尺寸预设</span>
            <button class="p06-size-btn" data-size="nature-single">单栏 89mm</button>
            <button class="p06-size-btn" data-size="nature-1half">1.5栏 140mm</button>
            <button class="p06-size-btn active" data-size="nature-double">双栏 183mm</button>
          </div>
        </div>

        <!-- 画布 -->
        <div class="p06-canvas-wrap">
          <div id="p06-canvas-grid" class="p06-canvas-grid">
            ${canvasCells}
          </div>
        </div>

        <div class="p06-canvas-actions">
          <button class="p06-action-btn" id="p06-clear-btn">清空画布</button>
          <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn">生成代码 →</button>
        </div>
        <p class="p06-canvas-hint">画布模拟 Nature 双栏宽度（183mm），每格对应一个子图</p>
      </div>
    </div>

    <!-- 移动端：控制面板 + 画布 -->
    <div style="margin-top:var(--space-lg);">
      <div class="p06-canvas-controls" style="margin-bottom:var(--space-md);">
        <div class="p06-ctrl-group">
          <span class="p06-ctrl-label">间距</span>
          <button class="p06-spacing-btn" data-spacing="4">紧密</button>
          <button class="p06-spacing-btn active" data-spacing="12">正常</button>
          <button class="p06-spacing-btn" data-spacing="24">宽松</button>
        </div>
        <div class="p06-ctrl-group p06-toggle-wrap">
          <input type="checkbox" class="p06-toggle" id="p06-label-toggle-m" checked>
          <label class="p06-toggle-label" for="p06-label-toggle-m">显示标签</label>
        </div>
      </div>
      <div class="p06-canvas-wrap">
        <div id="p06-canvas-grid-m" class="p06-canvas-grid"></div>
      </div>
      <div style="text-align:center;margin-top:var(--space-xl);">
        <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn-m" style="font-size:1rem;padding:14px 32px;">查看完整代码 →</button>
      </div>
    </div>
  </div>
</section>

<!-- ── S3 代码生成 ── -->
<section class="section-light" id="p06-s3" style="padding:var(--space-xxl) var(--space-lg);">
  <div style="max-width:900px;margin:0 auto;">
    <p class="p06-section-label p06-label-light">Code Generation</p>
    <h2 class="p06-section-title p06-title-light">完整代码模板</h2>
    <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;margin-bottom:var(--space-xl);">以下代码根据你的画布布局实时生成。R 使用 patchwork，Python 使用 matplotlib subplot，均可直接用于论文投稿。</p>

    <div class="p06-code-tabs">
      <button class="p06-code-tab active" data-tab="r">R（patchwork）</button>
      <button class="p06-code-tab" data-tab="py">Python（matplotlib）</button>
    </div>

    <div>
      <!-- R 面板 -->
      <div class="p06-code-panel active" id="p06-code-r">
        <div class="p06-code-panel-header">
          <div class="p06-code-panel-title">patchwork 多面板组合</div>
          <button class="p06-copy-btn" data-copy-target="r">复制代码</button>
        </div>
        <p class="p06-code-panel-desc">patchwork 语法直观，<code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">p1 | p2</code> 横排，<code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">p1 / p2</code> 纵排，支持自动对齐轴和合并图例。</p>
        <div class="p06-editor-container" id="p06-r-editor"></div>
        <div class="p06-annotation-list">
          <div class="p06-annotation">
            <div class="p06-annotation-key">guides = "collect"</div>
            <div class="p06-annotation-desc">将所有面板的图例合并为一个，避免重复。放在 plot_layout() 中。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">tag_levels = "A"</div>
            <div class="p06-annotation-desc">plot_annotation() 自动为每个面板添加 A/B/C 标签，无需手动在每图中设置。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">plot_spacer()</div>
            <div class="p06-annotation-desc">创建不规则布局中的空白占位格，patchwork 的重要工具。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">units = "mm"</div>
            <div class="p06-annotation-desc">ggsave() 直接以毫米指定尺寸，精确匹配期刊要求（如 183mm 双栏）。</div>
          </div>
        </div>
      </div>

      <!-- Python 面板 -->
      <div class="p06-code-panel" id="p06-code-py">
        <div class="p06-code-panel-header">
          <div class="p06-code-panel-title">matplotlib subplot 多面板</div>
          <button class="p06-copy-btn" data-copy-target="py">复制代码</button>
        </div>
        <p class="p06-code-panel-desc">matplotlib 的 <code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">subplots()</code> 提供精确的网格控制，rcParams 全局配置确保期刊字体规范。</p>
        <div class="p06-editor-container" id="p06-py-editor"></div>
        <div class="p06-annotation-list">
          <div class="p06-annotation">
            <div class="p06-annotation-key">rcParams.update({})</div>
            <div class="p06-annotation-desc">批量设置全局样式，字号、脊线等一次配置，所有子图自动继承。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">figsize=(7.2, 4.7)</div>
            <div class="p06-annotation-desc">7.2 英寸 ≈ 183mm（Nature 双栏），直接换算期刊尺寸，dpi=300 时精确输出。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">ax[row][col]</div>
            <div class="p06-annotation-desc">subplots 返回二维数组，行列索引对应画布网格位置，直观清晰。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">dpi=600 / tiff</div>
            <div class="p06-annotation-desc">线条图导出 600dpi，位图 300dpi；TIFF 格式用于打印，PDF 用于提交。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S4 期刊案例 ── -->
<section class="section-dark" id="p06-s4" style="padding:var(--space-xxl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="p06-section-label p06-label-dark" style="text-align:center;">Journal Specifications</p>
    <h2 class="p06-section-title p06-title-dark" style="text-align:center;margin-bottom:var(--space-xxl);">三大顶刊排版规范</h2>
    <div class="p06-journal-grid">
      ${journalCards}
    </div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">06 / 07</p>
  <h2 class="page-footer-quote">一张好的多面板图，是你研究故事的目录页。</h2>
  <p class="page-footer-desc">掌握多面板 Figure 的排版规范，让你的论文图表达到顶刊标准。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p06-btn-prev">← SVG 编辑与优化</button>
    <button class="btn-primary" id="p06-btn-next">资源与工具 →</button>
  </div>
</section>
</div>`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  // ── Hero 入场动画 ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p06-hero .hero-eyebrow',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p06-hero .page-hero-title', { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p06-hero .page-hero-sub',   { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p06-hero-tagline',           { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p06-quicknav',               { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p06-scroll-hint',            { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // ── Quicknav ──
  initQuicknav();

  // ── 布局编辑器 ──
  const isMobile = window.innerWidth < 768;

  // 初始化画布（默认填充示例面板）
  _editorState.cells = ['main', 'scatter', 'line', 'bar', 'box', 'heatmap'];
  refreshCanvas();

  if (isMobile) {
    initMobilePresets();
    // 移动端：渲染移动端画布（镜像 grid）
    const mobileGrid = document.getElementById('p06-canvas-grid-m');
    if (mobileGrid) {
      // 清空旧内容，防止页面重入时重复创建单元格
      mobileGrid.innerHTML = '';
      // 用与桌面相同的单元格结构，但绑定独立 click 事件
      mobileGrid.style.gap = _editorState.spacing + 'px';
      mobileGrid.style.gridTemplateColumns = 'repeat(2,1fr)';
      Array.from({ length: 6 }, (_, i) => {
        const cell = document.createElement('div');
        cell.className = 'p06-cell p06-cell--filled';
        cell.dataset.cellIndex = i;
        const label = document.createElement('div');
        label.className = 'p06-cell-label';
        label.textContent = String.fromCharCode(65 + i);
        const chart = document.createElement('div');
        chart.className = 'p06-cell-chart';
        const empty = document.createElement('div');
        empty.className = 'p06-cell-empty';
        empty.style.display = 'none';
        cell.appendChild(label);
        cell.appendChild(chart);
        cell.appendChild(empty);
        mobileGrid.appendChild(cell);
      });
      // 用 refreshCanvas 的逻辑再渲染移动端网格
      const mobileCells = mobileGrid.querySelectorAll('.p06-cell');
      mobileCells.forEach((cell, i) => {
        const panelType = _editorState.cells[i];
        const chartDiv = cell.querySelector('.p06-cell-chart');
        if (panelType && chartDiv) {
          renderMiniChart(chartDiv, panelType, 100, 60);
        }
      });
    }
  } else {
    initSortable();
  }

  initEditorControls();

  // ── S3 代码编辑器 ──
  initCodeTabs();
  initCopyButtons();

  const rEditorEl = document.getElementById('p06-r-editor');
  if (rEditorEl) {
    const ed = createCodeEditor(rEditorEl, { code: generateRCode(), language: 'r', readOnly: true });
    if (ed) { _editors.push(ed); _rEditor = ed; }
  }

  const pyEditorEl = document.getElementById('p06-py-editor');
  if (pyEditorEl) {
    const ed = createCodeEditor(pyEditorEl, { code: generatePyCode(), language: 'python', readOnly: true });
    if (ed) { _editors.push(ed); _pyEditor = ed; }
  }

  // ── ScrollTrigger ──
  initScrollAnimations();

  // ── Footer ──
  initFooterNav();
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  killAll();

  _sortableInstances.forEach(s => { try { s.destroy(); } catch (_) {} });
  _sortableInstances = [];

  _editors.forEach(e => { try { e && e.destroy(); } catch (_) {} });
  _editors = [];

  _eventHandlers.forEach(({ el, type, fn, opts }) => {
    try { el.removeEventListener(type, fn, opts); } catch (_) {}
  });
  _eventHandlers = [];

  _timeouts.forEach(id => clearTimeout(id));
  _timeouts = [];

  _rEditor = null;
  _pyEditor = null;

  // 重置状态，以便下次 init() 从干净状态开始
  _editorState.cells = Array(_editorState.panelCount).fill(null);
  _editorState.spacing = 12;
  _editorState.showLabels = true;
  _editorState.preset = 'nature-double';
}
