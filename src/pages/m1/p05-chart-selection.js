// p05-chart-selection.js — 图表选择指南
// 交互式决策树 + 20+ 图表全览 + 饼图误用专题

import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ─────────────────────────────────────────────
// 决策树数据
// ─────────────────────────────────────────────
const DECISION_TREE = {
  id: 'root',
  question: '你的数据类型是什么？',
  children: [
    {
      id: 'categorical',
      label: '分类数据',
      desc: '名义 / 有序类别',
      question: '你想表达什么关系？',
      children: [
        { id: 'cat-compare', label: '比较大小', result: { name: '柱状图 / 条形图', en: 'Bar Chart', icon: '▊', reason: '最直观地比较各类别数值，视觉映射清晰。避免在这里使用饼图。' } },
        { id: 'cat-compose', label: '展示构成', result: { name: '堆叠柱状图', en: 'Stacked Bar Chart', icon: '▤', reason: '展示部分与整体关系，且可比较多个时间点。优于饼图。' } },
        { id: 'cat-rank', label: '按大小排列', result: { name: '水平条形图', en: 'Horizontal Bar Chart', icon: '▬', reason: '标签空间充足，长类别名称不会重叠，支持快速视觉排名。' } }
      ]
    },
    {
      id: 'numeric',
      label: '数值数据',
      desc: '连续 / 离散数值',
      question: '变量数量是多少？',
      children: [
        {
          id: 'one-var', label: '单变量',
          question: '关注分布形态还是组间比较？',
          children: [
            { id: 'one-dist', label: '分布形态', result: { name: '直方图 / 密度图', en: 'Histogram / Density Plot', icon: '▲', reason: '展示数据分布形状、中心位置和扩散程度。密度图适合叠加多组。' } },
            { id: 'one-group', label: '组间比较', result: { name: '箱线图 / 小提琴图', en: 'Boxplot / Violin Plot', icon: '⊠', reason: '箱线图简洁展示中位数和异常值；小提琴图还能显示分布形状。' } }
          ]
        },
        { id: 'two-var', label: '两个变量', result: { name: '散点图', en: 'Scatter Plot', icon: '⋯', reason: '展示两变量间的相关关系和分布规律，可叠加回归线和置信区间。' } },
        { id: 'multi-var', label: '多个变量', result: { name: '热力图 / 气泡图', en: 'Heatmap / Bubble Chart', icon: '▦', reason: '热力图适合矩阵型数据（如相关矩阵）；气泡图可同时编码三个维度。' } }
      ]
    },
    {
      id: 'timeseries',
      label: '时间序列',
      desc: '随时间变化的数据',
      question: '序列数量是多少？',
      children: [
        { id: 'ts-single', label: '单条序列', result: { name: '折线图', en: 'Line Chart', icon: '╱', reason: '最清晰地展示单一趋势，强调变化速率。避免使用柱状图表达连续趋势。' } },
        { id: 'ts-multi', label: '多条序列', result: { name: '多线图 / 面积图', en: 'Multi-line / Area Chart', icon: '⌗', reason: '多线对比趋势；面积图在强调累积量时效果更好（3条以内）。' } }
      ]
    },
    {
      id: 'proportion',
      label: '比例 / 构成',
      desc: '占比 / 百分比',
      question: '类别数量是多少？',
      children: [
        { id: 'prop-few', label: '2–4 个类别', result: { name: '堆叠条形图（首选）', en: 'Stacked Bar Chart', icon: '▤', reason: '比饼图更易读，尤其当各比例接近时差异更明显。' } },
        { id: 'prop-many', label: '5+ 个类别', result: { name: '水平条形图', en: 'Horizontal Bar Chart', icon: '▬', reason: '饼图超过 5 个扇区后极难阅读，条形图长度编码更精确。' } }
      ]
    }
  ]
};

// ─────────────────────────────────────────────
// 图表全览数据
// ─────────────────────────────────────────────
const CHART_GROUPS = [
  {
    id: 'comparison', label: '比较', color: '#7EC8E3',
    charts: [
      { id: 'bar', name: '柱状图', en: 'Bar Chart', use: '比较各类别的数值大小，最常用图表之一', avoid: '类别超过 15 个时，改用条形图', draw: drawBar },
      { id: 'hbar', name: '水平条形图', en: 'Horizontal Bar', use: '类别名称较长、需排名对比时', avoid: '数据有时间序列时', draw: drawHBar },
      { id: 'radar', name: '雷达图', en: 'Radar Chart', use: '多指标综合评估，适合 5–8 个维度', avoid: '指标超过 8 个时，或需要精确读值时', draw: drawRadar },
      { id: 'lollipop', name: '棒棒糖图', en: 'Lollipop Chart', use: '类别较多的比较，视觉比柱状图更轻盈', avoid: '强调总量而非差异时', draw: drawLollipop },
    ]
  },
  {
    id: 'distribution', label: '分布', color: '#95D5B2',
    charts: [
      { id: 'histogram', name: '直方图', en: 'Histogram', use: '展示连续数据的频率分布形状', avoid: 'n < 30 的小样本，结果不可靠', draw: drawHistogram },
      { id: 'density', name: '密度图', en: 'Density Plot', use: '平滑展示分布，方便叠加多组比较', avoid: '数据量极小时，曲线无意义', draw: drawDensity },
      { id: 'boxplot', name: '箱线图', en: 'Box Plot', use: '快速比较多组分布与异常值', avoid: '只有少数数据点时（改用抖点图）', draw: drawBoxplot },
      { id: 'violin', name: '小提琴图', en: 'Violin Plot', use: '结合箱线图和密度图，信息最丰富', avoid: 'n < 50 时分布形状无统计意义', draw: drawViolin },
    ]
  },
  {
    id: 'relationship', label: '关系', color: '#B8B8E8',
    charts: [
      { id: 'scatter', name: '散点图', en: 'Scatter Plot', use: '两变量相关性，可叠加回归线和置信区间', avoid: 'n > 10000 时需降采样或用热力图', draw: drawScatter },
      { id: 'heatmap', name: '热力图', en: 'Heatmap', use: '矩阵数据、相关矩阵、基因表达谱', avoid: '未经色盲友好配色测试时', draw: drawHeatmap },
      { id: 'bubble', name: '气泡图', en: 'Bubble Chart', use: '同时展示 x、y、大小三个维度', avoid: '气泡过多时互相遮挡，难以辨读', draw: drawBubble },
      { id: 'sankey', name: '桑基图', en: 'Sankey Diagram', use: '展示流量或比例在不同阶段的流向', avoid: '流向关系单一时，普通图表更清晰', draw: drawSankey },
    ]
  },
  {
    id: 'composition', label: '组成', color: '#F0B27A',
    charts: [
      { id: 'stacked-bar', name: '堆叠柱状图', en: 'Stacked Bar', use: '部分与整体，可跨时间点对比构成变化', avoid: '中间分段难以独立对比精确值', draw: drawStackedBar },
      { id: 'donut', name: '圆环图', en: 'Donut Chart', use: '部分与整体，中心可放总量或关键数字', avoid: '类别超过 5 个时可读性急剧下降', draw: drawDonut },
      { id: 'treemap', name: '树状图', en: 'Treemap', use: '层级构成，面积编码比例关系', avoid: '需要精确比较大小时（面积感知不精确）', draw: drawTreemap },
      { id: 'waffle', name: '华夫图', en: 'Waffle Chart', use: '直观展示百分比，每格代表固定单位', avoid: '比例需要高精度时（最小粒度受格数限制）', draw: drawWaffle },
    ]
  },
  {
    id: 'trend', label: '趋势', color: '#E07A7A',
    charts: [
      { id: 'line', name: '折线图', en: 'Line Chart', use: '时间序列趋势，最常用、最清晰', avoid: '数据点极少（<4）时改用散点图', draw: drawLine },
      { id: 'area', name: '面积图', en: 'Area Chart', use: '强调累积量和趋势，视觉冲击力更强', avoid: '多系列时互相遮挡（限制在 3 条以内）', draw: drawArea },
      { id: 'ridgeline', name: '山脊图', en: 'Ridgeline Plot', use: '多组时间序列分布对比，节省空间', avoid: '组数超过 10 时过于拥挤', draw: drawRidgeline },
      { id: 'step', name: '阶梯图', en: 'Step Chart', use: '离散时间点的状态突变（如存货、政策变化）', avoid: '变化连续时（改用折线图）', draw: drawStep },
    ]
  }
];

// ─────────────────────────────────────────────
// 饼图误用案例
// ─────────────────────────────────────────────
const PIE_CASES = [
  { title: '案例一：类别过多', problem: '7 个扇区，最小的几乎看不见，颜色难以区分', solution: '水平条形图：所有类别清晰对齐，差异一目了然' },
  { title: '案例二：比例极为相近', problem: '33% / 34% / 33%，人眼对角度的感知无法分辨', solution: '柱状图：微小差异通过长度轻松识别' },
  { title: '案例三：展示时间趋势', problem: '4 个饼图并排，无法感知变化的方向和速率', solution: '折线图：增长趋势直观呈现，无需逐个饼图比较' },
];

// ─────────────────────────────────────────────
// 页面状态
// ─────────────────────────────────────────────
let state = {
  treePath: [],
  activeGroup: 'comparison',
  resizeHandlers: [],
};

// ─────────────────────────────────────────────
// render()
// ─────────────────────────────────────────────
export function render() {
  return `
<div class="page-scroll">
<style>
/* ══ p05 scoped styles ══ */
.p5-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark); display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
.p5-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 40%, rgba(126,200,227,0.08) 0%, transparent 70%);
  pointer-events:none;
}
.p5-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:0.15em; text-transform:uppercase;
  margin-bottom:var(--space-sm);
}
.p5-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-0.02em; line-height:1.1; color:var(--text-on-dark);
}
.p5-hero-sub {
  font-family:var(--font-heading); font-size:clamp(1rem,2vw,1.4rem);
  font-weight:300; color:var(--text-on-dark-2);
  max-width:560px; line-height:1.7; margin-top:var(--space-sm);
}
.p5-scroll-hint {
  position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p5-float 2s ease-in-out infinite;
}
@keyframes p5-float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }

/* Section headers */
.p5-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p5-sec-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-0.02em;
}
.p5-sec-desc {
  font-size:1.05rem; line-height:1.7; max-width:640px;
  margin:var(--space-sm) auto 0;
}

/* ── 决策树 section ── */
.p5-dt-section {
  background:var(--bg-light); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-dt-section .p5-sec-desc { color:var(--text-on-light-2); }
.p5-dt-wrap { max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:var(--space-lg); }

.p5-breadcrumb {
  display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  justify-content:center; font-size:0.85rem; color:var(--text-on-light-2); min-height:28px;
}
.p5-bc-item {
  padding:4px 14px; background:var(--bg-light-alt);
  border-radius:var(--radius-full); border:1px solid var(--border-light);
  cursor:pointer; transition:all var(--t-fast);
}
.p5-bc-item:hover { border-color:var(--accent); color:var(--accent); }
.p5-bc-sep { color:var(--text-on-light-3); }

/* 问题卡片 */
.p5-q-card {
  background:var(--bg-dark); color:var(--text-on-dark);
  border-radius:var(--radius-lg); padding:var(--space-lg); text-align:center;
}
.p5-q-step {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:12px;
}
.p5-q-text {
  font-family:var(--font-display); font-size:clamp(1.2rem,2.5vw,1.65rem);
  font-weight:700; margin-bottom:var(--space-md);
}
.p5-opts { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
.p5-opt-btn {
  padding:14px 22px; min-height:52px;
  background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.14);
  border-radius:var(--radius-full); color:var(--text-on-dark);
  cursor:pointer; font-family:var(--font-heading); font-size:0.92rem;
  transition:all 0.25s var(--ease-apple);
  display:flex; flex-direction:column; align-items:center; gap:2px;
}
.p5-opt-btn .opt-sub { font-size:0.72rem; color:var(--text-on-dark-3); }
.p5-opt-btn:hover { background:rgba(126,200,227,0.1); border-color:var(--accent); transform:translateY(-2px); }
.p5-opt-btn:active { transform:scale(0.97); }

/* 结果卡片 */
.p5-res-card {
  background:linear-gradient(135deg,#1a2a3a 0%,#0d1a1f 100%);
  border:1.5px solid rgba(126,200,227,0.3);
  border-radius:var(--radius-lg); padding:var(--space-lg);
  text-align:center; color:var(--text-on-dark);
  animation:p5-res-in 0.5s var(--ease-out);
}
@keyframes p5-res-in { from{opacity:0;transform:scale(0.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
.p5-res-icon { font-size:2.5rem; color:var(--accent); margin-bottom:10px; }
.p5-res-name { font-family:var(--font-display); font-size:1.9rem; font-weight:700; color:var(--accent); }
.p5-res-en { font-family:var(--font-code); font-size:0.8rem; color:var(--text-on-dark-3); margin:4px 0 14px; }
.p5-res-reason { font-size:0.96rem; color:var(--text-on-dark-2); line-height:1.7; max-width:440px; margin:0 auto 20px; }
.p5-res-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.p5-btn-reset {
  padding:11px 24px; min-height:44px;
  background:transparent; border:1.5px solid var(--border-dark);
  border-radius:var(--radius-full); color:var(--text-on-dark-2);
  cursor:pointer; font-family:var(--font-heading); font-size:0.88rem; transition:all var(--t-fast);
}
.p5-btn-reset:hover { border-color:var(--accent); color:var(--accent); }
.p5-btn-gallery {
  padding:11px 24px; min-height:44px;
  background:var(--accent); border:none; border-radius:var(--radius-full);
  color:#1d1d1f; cursor:pointer; font-family:var(--font-heading); font-size:0.88rem; font-weight:600;
  transition:all var(--t-fast);
}
.p5-btn-gallery:hover { background:var(--accent-hover); transform:translateY(-1px); }

/* 树可视化 */
.p5-tree-viz { width:100%; max-width:760px; }
.p5-tree-svg { width:100%; height:auto; }

/* ── 图表全览 ── */
.p5-gallery-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-gallery-section .p5-sec-desc { color:var(--text-on-dark-2); }
.p5-gallery-wrap { max-width:var(--w-full); margin:0 auto; }

.p5-group-tabs {
  display:flex; gap:8px; margin-bottom:var(--space-xl);
  overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; padding-bottom:4px;
}
.p5-group-tabs::-webkit-scrollbar { display:none; }
.p5-gtab {
  padding:10px 20px; min-height:44px; flex-shrink:0;
  background:rgba(255,255,255,0.04); border:1.5px solid var(--border-dark);
  border-radius:var(--radius-full); color:var(--text-on-dark-2);
  cursor:pointer; font-family:var(--font-heading); font-size:0.88rem;
  transition:all var(--t-fast); display:flex; align-items:center; gap:8px;
}
.p5-gtab .tdot { width:7px; height:7px; border-radius:50%; background:currentColor; opacity:0.5; }
.p5-gtab:hover { border-color:rgba(255,255,255,0.3); color:var(--text-on-dark); }
.p5-gtab.active { border-color:var(--tc); color:var(--tc); background:rgba(126,200,227,0.05); }
.p5-gtab.active .tdot { opacity:1; background:var(--tc); }

/* browser-layout */
.p5-browser { display:flex; gap:var(--space-xl); align-items:flex-start; }
.p5-chart-list { flex:0 0 35%; min-width:0; display:flex; flex-direction:column; gap:10px; }
.p5-ci {
  padding:15px 20px; border-radius:var(--radius-md); border:1.5px solid var(--border-dark);
  cursor:pointer; transition:all var(--t-fast); background:rgba(255,255,255,0.02);
}
.p5-ci:hover { border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.04); }
.p5-ci.active { border-color:var(--ic); background:rgba(126,200,227,0.05); }
.p5-ci-name { font-family:var(--font-heading); font-size:0.96rem; font-weight:600; color:var(--text-on-dark); }
.p5-ci.active .p5-ci-name { color:var(--ic); }
.p5-ci-en { font-family:var(--font-code); font-size:0.72rem; color:var(--text-on-dark-3); margin-top:2px; }

.p5-preview-panel { flex:1; min-width:0; }
.p5-preview-sticky { position:sticky; top:80px; }
.p5-preview-box {
  background:#111418; border-radius:var(--radius-lg); padding:var(--space-md);
  border:1px solid var(--border-dark); overflow:hidden;
}
.p5-preview-box svg { width:100%; height:auto; display:block; }
.p5-preview-info { margin-top:var(--space-md); }
.p5-pv-name { font-family:var(--font-display); font-size:1.4rem; font-weight:700; color:var(--text-on-dark); }
.p5-pv-en { font-family:var(--font-code); font-size:0.75rem; color:var(--text-on-dark-3); margin:3px 0 12px; }
.p5-pv-row { display:flex; gap:var(--space-md); flex-wrap:wrap; }
.p5-pv-block { flex:1; min-width:0; }
.p5-pv-label { font-size:0.7rem; font-family:var(--font-code); color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:4px; }
.p5-pv-text { font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.5; }

/* ── 饼图误用 ── */
.p5-pie-section {
  background:var(--bg-light-alt); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-pie-section .p5-sec-desc { color:var(--text-on-light-2); }
.p5-pie-wrap { max-width:var(--w-content); margin:0 auto; }
.p5-pie-warn {
  background:#fff8e1; border:2px solid #f0b27a; border-radius:var(--radius-lg);
  padding:var(--space-md) var(--space-lg); display:flex; gap:var(--space-md);
  align-items:flex-start; margin-bottom:var(--space-xl);
}
.p5-pie-warn-icon { font-size:1.8rem; flex-shrink:0; margin-top:2px; }
.p5-pie-warn-text { font-size:0.96rem; line-height:1.7; color:#7a4a00; }
.p5-pie-warn-text strong { font-weight:700; }
.p5-pie-cases { display:flex; flex-direction:column; gap:var(--space-xl); }
.p5-case {
  background:white; border-radius:var(--radius-lg); overflow:hidden;
  border:1px solid var(--border-light); box-shadow:var(--shadow-md);
}
.p5-case-hdr { padding:16px 24px; border-bottom:1px solid var(--border-light); }
.p5-case-title { font-family:var(--font-display); font-size:1.15rem; font-weight:700; }
.p5-case-body { display:flex; }
.p5-case-side { flex:1; padding:var(--space-md); display:flex; flex-direction:column; gap:10px; }
.p5-case-side:first-child { border-right:1px solid var(--border-light); }
.p5-badge {
  display:inline-flex; align-items:center; gap:6px;
  padding:4px 12px; border-radius:var(--radius-full);
  font-size:0.72rem; font-weight:700; letter-spacing:0.05em;
}
.p5-badge-bad { background:#fff0f0; color:#c53030; }
.p5-badge-good { background:#f0fff4; color:#276749; }
.p5-case-side svg { width:100%; height:auto; }
.p5-case-note { font-size:0.85rem; line-height:1.5; margin-top:auto; }
.p5-case-note-bad { color:#c53030; }
.p5-case-note-good { color:#276749; }

/* ── Footer CTA ── */
.p5-footer {
  background:var(--bg-dark-deep); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg);
  text-align:center; min-height:50vh;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:var(--space-md);
}
.p5-footer-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-0.02em;
}
.p5-footer-desc { font-size:1rem; color:var(--text-on-dark-2); line-height:1.7; max-width:520px; }
.p5-footer-links { display:flex; gap:var(--space-md); flex-wrap:wrap; justify-content:center; margin-top:8px; }
.p5-fl {
  padding:14px 32px; min-height:52px; border-radius:var(--radius-full);
  font-family:var(--font-heading); font-size:0.96rem; font-weight:500;
  cursor:pointer; transition:all var(--t-base); display:flex; align-items:center; gap:8px;
}
.p5-fl-primary { background:var(--accent); color:#1d1d1f; border:none; box-shadow:0 2px 16px var(--accent-glow); }
.p5-fl-primary:hover { background:var(--accent-hover); transform:translateY(-2px); }
.p5-fl-ghost { background:transparent; color:var(--text-on-dark-2); border:1.5px solid var(--border-dark); }
.p5-fl-ghost:hover { border-color:var(--text-on-dark-2); color:var(--text-on-dark); }

/* ── 响应式 ── */
@media (max-width:900px) {
  .p5-browser { flex-direction:column; }
  .p5-chart-list { flex:none; width:100%; }
  .p5-preview-sticky { position:static; }
}
@media (max-width:768px) {
  .p5-dt-section,.p5-gallery-section,.p5-pie-section,.p5-footer { padding:var(--space-xl) var(--space-sm); }
  .p5-opts { flex-direction:column; align-items:stretch; }
  .p5-opt-btn { width:100%; justify-content:center; }
  .p5-case-body { flex-direction:column; }
  .p5-case-side:first-child { border-right:none; border-bottom:1px solid var(--border-light); }
  .p5-footer-links { flex-direction:column; align-items:center; }
  .p5-res-actions { flex-direction:column; align-items:center; }
  .p5-group-tabs { gap:6px; }
  .p5-gtab { padding:8px 14px; font-size:0.8rem; }
}
</style>

<!-- HERO -->
<section id="p5-hero" class="p5-hero section-hero-full" style="scroll-margin-top:56px;">
  <p class="p5-eyebrow" id="p5-eyebrow" style="opacity:0;">Module 01 · Page 05</p>
  <h1 class="p5-hero-title" id="p5-hero-title" style="opacity:0;">图表选择指南</h1>
  <p class="p5-hero-sub" id="p5-hero-sub" style="opacity:0;">
    面对数据时，如何快速选对图表？<br>从决策树到完整图表库，帮你科学决策。
  </p>
  <nav class="hero-quicknav" id="p5-quicknav" style="opacity:0;">
    <button class="hero-quicknav__item" data-target="#p5-decision">交互式决策树</button>
    <button class="hero-quicknav__item" data-target="#p5-gallery">图表类型全览</button>
    <button class="hero-quicknav__item" data-target="#p5-pie">饼图误用专题</button>
  </nav>
  <p class="p5-scroll-hint">↓ 向下探索</p>
</section>

<!-- 决策树 -->
<section id="p5-decision" class="p5-dt-section" style="scroll-margin-top:56px;">
  <div class="p5-sec-hdr" id="p5-dt-hdr">
    <h2 class="p5-sec-title">交互式图表决策树</h2>
    <p class="p5-sec-desc">回答关于数据的几个问题，获得精准的图表推荐。</p>
  </div>
  <div class="p5-dt-wrap">
    <div class="p5-breadcrumb" id="p5-bc"></div>
    <div id="p5-q-area"></div>
    <div class="p5-tree-viz" id="p5-tree-viz"></div>
  </div>
</section>

<!-- 图表全览 -->
<section id="p5-gallery" class="p5-gallery-section" style="scroll-margin-top:56px;">
  <div class="p5-gallery-wrap">
    <div class="p5-sec-hdr" id="p5-gallery-hdr">
      <h2 class="p5-sec-title">20+ 图表类型全览</h2>
      <p class="p5-sec-desc">按用途分 5 组，每种图表含 D3 示例预览与使用说明。</p>
    </div>
    <div class="p5-group-tabs" id="p5-gtabs">
      ${CHART_GROUPS.map(g => `
        <button class="p5-gtab" data-group="${g.id}" style="--tc:${g.color}">
          <span class="tdot"></span>${g.label}（${g.charts.length}）
        </button>
      `).join('')}
    </div>
    <div class="p5-browser">
      <div class="p5-chart-list" id="p5-chart-list"></div>
      <div class="p5-preview-panel">
        <div class="p5-preview-sticky">
          <div class="p5-preview-box" id="p5-preview-box">
            <svg id="p5-preview-svg" viewBox="0 0 400 260"></svg>
          </div>
          <div class="p5-preview-info" id="p5-preview-info"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 饼图误用 -->
<section id="p5-pie" class="p5-pie-section" style="scroll-margin-top:56px;">
  <div class="p5-pie-wrap">
    <div class="p5-sec-hdr" id="p5-pie-hdr">
      <h2 class="p5-sec-title">我应该用饼图吗？</h2>
      <p class="p5-sec-desc">饼图是科研图表中最常被误用的类型。了解何时应该避免它。</p>
    </div>
    <div class="p5-pie-warn" id="p5-pie-warn">
      <div class="p5-pie-warn-icon">⚠️</div>
      <div class="p5-pie-warn-text">
        <strong>饼图的核心限制：</strong>人眼对角度的判断精度远低于对长度的判断。当类别超过 4 个、比例接近、或需要展示趋势时，
        <strong>条形图几乎始终是更好的选择</strong>。大多数顶刊图表评审也会将多余的饼图视为设计缺陷。
      </div>
    </div>
    <div class="p5-pie-cases" id="p5-pie-cases"></div>
  </div>
</section>

<!-- Footer CTA -->
<section id="p5-footer" class="p5-footer" style="scroll-margin-top:56px;">
  <p class="p5-eyebrow" style="opacity:0.7;">下一步</p>
  <h2 class="p5-footer-title" id="p5-footer-title">选好图表，开始绘制</h2>
  <p class="p5-footer-desc" id="p5-footer-desc">
    掌握了图表选择的原则，接下来学习 ggplot2 的图层语法——精准控制图表每一个视觉细节。
  </p>
  <div class="p5-footer-links">
    <button class="p5-fl p5-fl-primary" onclick="window._p5nav('m1-p6')">ggplot2 图层语法 →</button>
    <button class="p5-fl p5-fl-ghost" onclick="window._p5nav('m1-p4')">← 色彩无障碍</button>
  </div>
</section>

</div>`;
}

// ─────────────────────────────────────────────
// init()
// ─────────────────────────────────────────────
export function init() {
  window._p5nav = navigateTo;

  // Hero 入场
  gsap.fromTo('#p5-eyebrow',    { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, delay:0.1, ease:'power3.out' });
  gsap.fromTo('#p5-hero-title', { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, delay:0.25, ease:'power3.out' });
  gsap.fromTo('#p5-hero-sub',   { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.45, ease:'power3.out' });
  gsap.fromTo('#p5-quicknav',   { opacity:0, y:20 }, { opacity:1, y:0, duration:0.8, delay:0.65, ease:'power3.out' });

  // 快捷导航
  document.querySelectorAll('#p5-quicknav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.target)?.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // 滚动入场
  fadeIn('#p5-dt-hdr', { y:40, stagger:0 });
  fadeIn('#p5-gallery-hdr', { y:40, stagger:0 });
  fadeIn('#p5-pie-hdr', { y:40, stagger:0 });
  fadeIn('#p5-footer-title', { y:30, stagger:0 });
  fadeIn('#p5-footer-desc', { y:20, stagger:0 });
  fadeIn('#p5-pie-warn', { y:30, stagger:0 });

  initDecisionTree();
  initGallery();
  initPieCases();
}

// ─────────────────────────────────────────────
// 决策树
// ─────────────────────────────────────────────
function initDecisionTree() {
  state.treePath = [];
  renderQ();
  renderTreeViz();
}

function getNode(path) {
  let n = DECISION_TREE;
  for (const id of path) n = (n.children || []).find(c => c.id === id) || n;
  return n;
}

function renderQ() {
  const node = getNode(state.treePath);
  const area = document.getElementById('p5-q-area');
  if (!area) return;

  if (node.result) {
    const r = node.result;
    area.innerHTML = `
      <div class="p5-res-card">
        <div class="p5-res-icon">${r.icon}</div>
        <div class="p5-res-name">${r.name}</div>
        <div class="p5-res-en">${r.en}</div>
        <p class="p5-res-reason">${r.reason}</p>
        <div class="p5-res-actions">
          <button class="p5-btn-reset" id="p5-reset">重新选择</button>
          <button class="p5-btn-gallery" id="p5-go-gallery">在图表库中查看 →</button>
        </div>
      </div>`;
    document.getElementById('p5-reset')?.addEventListener('click', () => {
      state.treePath = [];
      animateQ(); renderTreeViz(); renderBC();
    });
    document.getElementById('p5-go-gallery')?.addEventListener('click', () => {
      document.getElementById('p5-gallery')?.scrollIntoView({ behavior:'smooth' });
    });
  } else {
    area.innerHTML = `
      <div class="p5-q-card">
        <div class="p5-q-step">问题 ${state.treePath.length + 1}</div>
        <div class="p5-q-text">${node.question}</div>
        <div class="p5-opts">
          ${(node.children || []).map(c => `
            <button class="p5-opt-btn" data-id="${c.id}">
              <span>${c.label}</span>
              ${c.desc ? `<span class="opt-sub">${c.desc}</span>` : ''}
            </button>`).join('')}
        </div>
      </div>`;
    area.querySelectorAll('.p5-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.treePath.push(btn.dataset.id);
        animateQ(); renderTreeViz(); renderBC();
      });
    });
  }
}

function animateQ() {
  const card = document.querySelector('.p5-q-card, .p5-res-card');
  if (card) {
    gsap.to(card, { opacity:0, x:-30, duration:0.2, ease:'power2.in', onComplete: () => {
      renderQ();
      gsap.fromTo('.p5-q-card, .p5-res-card', { opacity:0, x:30 }, { opacity:1, x:0, duration:0.35, ease:'power2.out' });
    }});
  } else { renderQ(); }
}

function renderBC() {
  const bc = document.getElementById('p5-bc');
  if (!bc) return;
  if (!state.treePath.length) { bc.innerHTML = ''; return; }
  let html = '';
  for (let i = 0; i < state.treePath.length; i++) {
    const parentNode = getNode(state.treePath.slice(0, i));
    const child = (parentNode.children || []).find(c => c.id === state.treePath[i]);
    if (i > 0) html += '<span class="p5-bc-sep">›</span>';
    const snap = JSON.stringify(state.treePath.slice(0, i));
    html += `<span class="p5-bc-item" data-snap='${snap}'>${child?.label || state.treePath[i]}</span>`;
  }
  bc.innerHTML = html;
  bc.querySelectorAll('.p5-bc-item').forEach(item => {
    item.addEventListener('click', () => {
      state.treePath = JSON.parse(item.dataset.snap);
      animateQ(); renderTreeViz(); renderBC();
    });
  });
}

function renderTreeViz() {
  const container = document.getElementById('p5-tree-viz');
  if (!container) return;
  const isMobile = window.innerWidth < 768;
  const W = Math.min(container.clientWidth || 700, 760), H = isMobile ? 180 : 240;
  container.innerHTML = '';
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`).attr('class', 'p5-tree-svg')
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#f0f0f2').attr('rx', 12);

  const labels = ['开始', ...getPathLabels()];
  const max = isMobile ? 4 : 6;
  const shown = labels.slice(-max);
  const n = shown.length;
  const mx = isMobile ? 40 : 60;
  const step = n > 1 ? (W - 2 * mx) / (n - 1) : 0;
  const nodes = shown.map((label, i) => ({
    label: label.length > 6 ? label.slice(0, 6) + '…' : label,
    x: n === 1 ? W / 2 : mx + i * step, y: H / 2
  }));

  // 连线
  for (let i = 0; i < nodes.length - 1; i++) {
    const src = nodes[i], tgt = nodes[i + 1];
    const path = svg.append('path')
      .attr('fill', 'none').attr('stroke', '#7EC8E3').attr('stroke-width', 2)
      .attr('d', `M${src.x},${src.y} C${(src.x + tgt.x) / 2},${src.y} ${(src.x + tgt.x) / 2},${tgt.y} ${tgt.x},${tgt.y}`);
    const tLen = path.node().getTotalLength();
    path.attr('stroke-dasharray', tLen).attr('stroke-dashoffset', tLen)
      .transition().duration(500).ease(d3.easeQuadOut).attr('stroke-dashoffset', 0);
  }
  // 节点
  nodes.forEach((nd, i) => {
    const isLast = i === nodes.length - 1;
    const g = svg.append('g').attr('transform', `translate(${nd.x},${nd.y})`);
    g.append('circle').attr('r', 0)
      .attr('fill', isLast ? '#7EC8E3' : '#1d1d1f')
      .attr('stroke', '#7EC8E3').attr('stroke-width', 2)
      .transition().delay(i * 100).duration(350).ease(d3.easeBackOut.overshoot(1.5))
      .attr('r', isLast ? 13 : 9);
    g.append('text').attr('text-anchor', 'middle').attr('dy', isMobile ? 24 : 28)
      .attr('font-size', isMobile ? '9px' : '10px').attr('fill', '#555')
      .attr('font-family', 'var(--font-heading)').text(nd.label).style('opacity', 0)
      .transition().delay(i * 100 + 200).duration(250).style('opacity', 1);
  });
}

function getPathLabels() {
  const labels = [];
  let node = DECISION_TREE;
  for (const id of state.treePath) {
    const child = (node.children || []).find(c => c.id === id);
    if (child) { labels.push(child.label); node = child; }
  }
  if (node.result) labels.push(node.result.name.split('（')[0].split(' / ')[0]);
  return labels;
}

// ─────────────────────────────────────────────
// 图表全览
// ─────────────────────────────────────────────
function initGallery() {
  document.querySelectorAll('.p5-gtab').forEach(btn => {
    btn.addEventListener('click', () => selectGroup(btn.dataset.group));
  });
  selectGroup('comparison');
  scaleReveal('#p5-gallery .p5-browser', { scale:0.97 });
}

function selectGroup(id) {
  state.activeGroup = id;
  const group = CHART_GROUPS.find(g => g.id === id);
  if (!group) return;
  document.querySelectorAll('.p5-gtab').forEach(b => b.classList.toggle('active', b.dataset.group === id));
  const listEl = document.getElementById('p5-chart-list');
  if (!listEl) return;
  listEl.innerHTML = group.charts.map(c => `
    <div class="p5-ci" data-cid="${c.id}" style="--ic:${group.color}">
      <div class="p5-ci-name">${c.name}</div>
      <div class="p5-ci-en">${c.en}</div>
    </div>`).join('');
  listEl.querySelectorAll('.p5-ci').forEach(item => {
    item.addEventListener('click', () => {
      listEl.querySelectorAll('.p5-ci').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const chart = group.charts.find(c => c.id === item.dataset.cid);
      if (chart) renderPreview(chart, group.color);
    });
  });
  listEl.querySelector('.p5-ci')?.classList.add('active');
  if (group.charts[0]) renderPreview(group.charts[0], group.color);
}

function renderPreview(chart, color) {
  const svgEl = document.getElementById('p5-preview-svg');
  const infoEl = document.getElementById('p5-preview-info');
  if (!svgEl || !infoEl) return;
  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();
  svg.append('rect').attr('width', 400).attr('height', 260).attr('fill', '#111418').attr('rx', 8);
  if (chart.draw) chart.draw(svg, color);
  infoEl.innerHTML = `
    <div class="p5-pv-name">${chart.name}</div>
    <div class="p5-pv-en">${chart.en}</div>
    <div class="p5-pv-row">
      <div class="p5-pv-block"><div class="p5-pv-label">适用场景</div><div class="p5-pv-text">${chart.use}</div></div>
      <div class="p5-pv-block"><div class="p5-pv-label">避免使用</div><div class="p5-pv-text">${chart.avoid}</div></div>
    </div>`;
}

// ─────────────────────────────────────────────
// 饼图误用案例
// ─────────────────────────────────────────────
function initPieCases() {
  const container = document.getElementById('p5-pie-cases');
  if (!container) return;
  container.innerHTML = PIE_CASES.map((c, idx) => `
    <div class="p5-case" id="p5-case-${idx}">
      <div class="p5-case-hdr"><div class="p5-case-title">${c.title}</div></div>
      <div class="p5-case-body">
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-bad">✗ 错误用法</div>
          <svg id="pc-bad-${idx}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-bad">⚠ ${c.problem}</div>
        </div>
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-good">✓ 推荐替代</div>
          <svg id="pc-good-${idx}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-good">✓ ${c.solution}</div>
        </div>
      </div>
    </div>`).join('');
  drawPieCase0(); drawPieCase1(); drawPieCase2();
  PIE_CASES.forEach((_, idx) => fadeIn(`#p5-case-${idx}`, { y:40, stagger:0 }));
}

// ─────────────────────────────────────────────
// D3 图表绘制
// ─────────────────────────────────────────────
function axisStyle(g) {
  g.selectAll('.domain').attr('stroke', '#3a3a3a');
  g.selectAll('.tick line').attr('stroke', '#3a3a3a');
  g.selectAll('.tick text').attr('fill', '#888').attr('font-size', '10px').attr('font-family', 'var(--font-heading)');
}

function drawBar(svg, color) {
  const data = [{ c:'A', v:82 },{ c:'B', v:56 },{ c:'C', v:67 },{ c:'D', v:43 },{ c:'E', v:91 }];
  const m = { t:30, r:30, b:48, l:48 }, W = 400-m.l-m.r, H = 260-m.t-m.b;
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
  const x = d3.scaleBand().domain(data.map(d=>d.c)).range([0,W]).padding(0.35);
  const y = d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  g.selectAll('rect').data(data).join('rect')
    .attr('x',d=>x(d.c)).attr('width',x.bandwidth()).attr('y',H).attr('height',0)
    .attr('fill',color).attr('opacity',0.85).attr('rx',3)
    .transition().duration(600).delay((_,i)=>i*80).ease(d3.easeQuadOut)
    .attr('y',d=>y(d.v)).attr('height',d=>H-y(d.v));
}

function drawHBar(svg, color) {
  const data = [{ c:'Group A', v:78 },{ c:'Group B', v:54 },{ c:'Group C', v:92 },{ c:'Group D', v:36 },{ c:'Group E', v:65 }];
  const m = { t:20, r:30, b:28, l:64 }, W = 400-m.l-m.r, H = 260-m.t-m.b;
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
  const y = d3.scaleBand().domain(data.map(d=>d.c)).range([0,H]).padding(0.3);
  const x = d3.scaleLinear().domain([0,100]).range([0,W]);
  g.append('g').call(d3.axisLeft(y).tickSize(0)).call(axisStyle);
  g.selectAll('rect').data(data).join('rect')
    .attr('y',d=>y(d.c)).attr('height',y.bandwidth()).attr('x',0).attr('width',0)
    .attr('fill',color).attr('opacity',0.85).attr('rx',3)
    .transition().duration(600).delay((_,i)=>i*80).attr('width',d=>x(d.v));
}

function drawRadar(svg, color) {
  const labels = ['样本量','精确度','召回率','F1分数','速度'];
  const vals = [0.8,0.7,0.85,0.75,0.6];
  const cx=200, cy=130, r=85, n=labels.length;
  const ang = (2*Math.PI)/n;
  const pt = (i, rad) => ({ x: cx+rad*Math.sin(i*ang), y: cy-rad*Math.cos(i*ang) });
  [0.25,0.5,0.75,1].forEach(f => {
    svg.append('polygon').attr('points',labels.map((_,i)=>{ const p=pt(i,r*f); return `${p.x},${p.y}`; }).join(' '))
      .attr('fill','none').attr('stroke','#333').attr('stroke-width',1);
  });
  labels.forEach((_,i) => {
    const p1=pt(i,r), p2=pt(i,r+13);
    svg.append('line').attr('x1',cx).attr('y1',cy).attr('x2',p1.x).attr('y2',p1.y).attr('stroke','#333').attr('stroke-width',1);
    svg.append('text').attr('x',p2.x).attr('y',p2.y).attr('text-anchor','middle').attr('dominant-baseline','middle')
      .attr('fill','#aaa').attr('font-size','9.5px').attr('font-family','var(--font-heading)').text(labels[i]);
  });
  const dPts = vals.map((v,i)=>pt(i,r*v));
  svg.append('polygon').attr('points',dPts.map(p=>`${p.x},${p.y}`).join(' ')).attr('fill',color).attr('opacity',0.25).attr('stroke',color).attr('stroke-width',2);
  dPts.forEach(p => svg.append('circle').attr('cx',p.x).attr('cy',p.y).attr('r',4).attr('fill',color).attr('stroke','#111418').attr('stroke-width',2));
}

function drawLollipop(svg, color) {
  const data = [{ c:'A', v:72 },{ c:'B', v:45 },{ c:'C', v:88 },{ c:'D', v:31 },{ c:'E', v:64 }];
  const m = { t:30, r:30, b:48, l:48 }, W = 400-m.l-m.r, H = 260-m.t-m.b;
  const g = svg.append('g').attr('transform', `translate(${m.l},${m.t})`);
  const x = d3.scaleBand().domain(data.map(d=>d.c)).range([0,W]).padding(0.4);
  const y = d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  g.selectAll('.stem').data(data).join('line')
    .attr('x1',d=>x(d.c)+x.bandwidth()/2).attr('x2',d=>x(d.c)+x.bandwidth()/2).attr('y1',H).attr('y2',H)
    .attr('stroke',color).attr('stroke-width',2).attr('opacity',0.6)
    .transition().duration(500).delay((_,i)=>i*80).attr('y2',d=>y(d.v));
  g.selectAll('.candy').data(data).join('circle')
    .attr('cx',d=>x(d.c)+x.bandwidth()/2).attr('cy',H).attr('r',0).attr('fill',color)
    .transition().duration(400).delay((_,i)=>i*80+300).attr('cy',d=>y(d.v)).attr('r',7);
}

function drawHistogram(svg, color) {
  let s=42;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const raw=Array.from({length:80},()=>{ let u=rnd(),v=rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)*15+60; });
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const x=d3.scaleLinear().domain([0,100]).range([0,W]);
  const bins=d3.bin().domain(x.domain()).thresholds(x.ticks(12))(raw);
  const y=d3.scaleLinear().domain([0,d3.max(bins,d=>d.length)]).nice().range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).ticks(6)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  g.selectAll('rect').data(bins).join('rect')
    .attr('x',d=>x(d.x0)+1).attr('width',d=>Math.max(0,x(d.x1)-x(d.x0)-2))
    .attr('y',H).attr('height',0).attr('fill',color).attr('opacity',0.82).attr('rx',2)
    .transition().duration(600).delay((_,i)=>i*25).attr('y',d=>y(d.length)).attr('height',d=>H-y(d.length));
}

function drawDensity(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const x=d3.scaleLinear().domain([0,100]).range([0,W]);
  const gPdf=(v,mu,sigma)=>Math.exp(-0.5*((v-mu)/sigma)**2)/(sigma*Math.sqrt(2*Math.PI));
  const pts1=d3.range(0,101,2).map(v=>({x:v,y:gPdf(v,42,12)}));
  const pts2=d3.range(0,101,2).map(v=>({x:v,y:gPdf(v,68,10)}));
  const maxY=Math.max(d3.max(pts1,d=>d.y),d3.max(pts2,d=>d.y));
  const y=d3.scaleLinear().domain([0,maxY*1.1]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).ticks(6)).call(axisStyle);
  const area=d3.area().x(d=>x(d.x)).y0(H).y1(d=>y(d.y)).curve(d3.curveCatmullRom);
  const line=d3.line().x(d=>x(d.x)).y(d=>y(d.y)).curve(d3.curveCatmullRom);
  [[pts1,color],[pts2,'#95D5B2']].forEach(([pts,c])=>{
    g.append('path').datum(pts).attr('fill',c).attr('opacity',0.2).attr('d',area);
    g.append('path').datum(pts).attr('fill','none').attr('stroke',c).attr('stroke-width',2.5).attr('d',line);
  });
}

function drawBoxplot(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const groups=['Control','Treat A','Treat B'];
  const stats=[{min:20,q1:35,med:52,q3:68,max:85},{min:35,q1:55,med:70,q3:80,max:95},{min:15,q1:28,med:42,q3:58,max:72}];
  const x=d3.scaleBand().domain(groups).range([0,W]).padding(0.4);
  const y=d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  stats.forEach((s,i)=>{
    const cx=x(groups[i])+x.bandwidth()/2, bw=x.bandwidth();
    const c=[color,'#95D5B2','#B8B8E8'][i];
    g.append('line').attr('x1',cx).attr('x2',cx).attr('y1',y(s.min)).attr('y2',y(s.max)).attr('stroke',c).attr('stroke-width',1.5).attr('stroke-dasharray','3,2');
    g.append('rect').attr('x',x(groups[i])).attr('width',bw).attr('y',y(s.q3)).attr('height',y(s.q1)-y(s.q3)).attr('fill',c).attr('opacity',0.3).attr('stroke',c).attr('stroke-width',1.5).attr('rx',2);
    g.append('line').attr('x1',x(groups[i])).attr('x2',x(groups[i])+bw).attr('y1',y(s.med)).attr('y2',y(s.med)).attr('stroke',c).attr('stroke-width',2.5);
  });
}

function drawViolin(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const groups=['Group A','Group B','Group C'];
  const params=[{mu:50,sigma:15},{mu:72,sigma:10},{mu:35,sigma:20}];
  const x=d3.scaleBand().domain(groups).range([0,W]).padding(0.35);
  const colors=[color,'#95D5B2','#B8B8E8'];
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  params.forEach((p,i)=>{
    const cx=x(groups[i])+x.bandwidth()/2, hw=x.bandwidth()/2*0.8;
    const pdf=v=>Math.exp(-0.5*((v-p.mu)/p.sigma)**2)/(p.sigma*Math.sqrt(2*Math.PI));
    const ys=d3.range(5,96,2);
    const maxP=d3.max(ys,v=>pdf(v));
    const pts=ys.map(v=>({y:v,d:pdf(v)/maxP*hw}));
    const y=d3.scaleLinear().domain([0,100]).range([H,0]);
    const right=pts.map(pt=>[cx+pt.d,y(pt.y)]);
    const left=[...pts].reverse().map(pt=>[cx-pt.d,y(pt.y)]);
    g.append('polygon').attr('points',[...right,...left].map(p=>p.join(',')).join(' ')).attr('fill',colors[i]).attr('opacity',0.4).attr('stroke',colors[i]).attr('stroke-width',1.5);
    g.append('line').attr('x1',cx-hw*0.5).attr('x2',cx+hw*0.5).attr('y1',y(p.mu)).attr('y2',y(p.mu)).attr('stroke',colors[i]).attr('stroke-width',2);
  });
}

function drawScatter(svg, color) {
  let s=42;const r=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const data=Array.from({length:40},()=>{ const xv=r()*80+10; return {x:xv,y:xv*0.6+r()*28+5}; });
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const xs=d3.scaleLinear().domain([0,100]).range([0,W]);
  const ys=d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(xs).ticks(5)).call(axisStyle);
  g.append('g').call(d3.axisLeft(ys).ticks(4)).call(axisStyle);
  g.append('line').attr('x1',xs(0)).attr('y1',ys(8)).attr('x2',xs(100)).attr('y2',ys(68)).attr('stroke',color).attr('stroke-width',1.5).attr('opacity',0.4).attr('stroke-dasharray','5,3');
  g.selectAll('circle').data(data).join('circle').attr('cx',d=>xs(d.x)).attr('cy',d=>ys(d.y)).attr('r',0).attr('fill',color).attr('opacity',0.7)
    .transition().duration(400).delay((_,i)=>i*12).attr('r',4);
}

function drawHeatmap(svg, color) {
  const rows=['Gene A','Gene B','Gene C','Gene D','Gene E'];
  const cols=['Ctrl','T1','T2','T3','T4'];
  const vals=[0.2,0.8,0.5,0.3,0.9,0.7,0.1,0.6,0.4,0.85,0.6,0.2,0.9,0.5,0.3,0.8,0.4,0.7,0.15,0.6,0.3,0.6,0.2,0.8,0.55];
  const m={t:28,r:72,b:48,l:60},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const x=d3.scaleBand().domain(cols).range([0,W]).padding(0.05);
  const y=d3.scaleBand().domain(rows).range([0,H]).padding(0.05);
  const cs=d3.scaleSequential(d3.interpolateYlOrRd).domain([0,1]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).tickSize(0)).call(axisStyle);
  rows.forEach((row,ri)=>cols.forEach((col,ci)=>{
    g.append('rect').attr('x',x(col)).attr('y',y(row)).attr('width',x.bandwidth()).attr('height',y.bandwidth())
      .attr('fill',cs(vals[ri*cols.length+ci])).attr('rx',2).attr('opacity',0)
      .transition().delay((ri*cols.length+ci)*25).duration(250).attr('opacity',1);
  }));
}

function drawBubble(svg, color) {
  const data=[{x:25,y:60,r:18},{x:55,y:30,r:28},{x:70,y:75,r:22},{x:40,y:48,r:14},{x:80,y:20,r:35}];
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const xs=d3.scaleLinear().domain([0,100]).range([0,W]);
  const ys=d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(xs).ticks(5)).call(axisStyle);
  g.append('g').call(d3.axisLeft(ys).ticks(4)).call(axisStyle);
  const cls=[color,'#95D5B2','#B8B8E8','#F0B27A','#E07A7A'];
  g.selectAll('circle').data(data).join('circle').attr('cx',d=>xs(d.x)).attr('cy',d=>ys(d.y))
    .attr('r',0).attr('fill',(_,i)=>cls[i]).attr('opacity',0.6).attr('stroke',(_,i)=>cls[i]).attr('stroke-width',1.5)
    .transition().duration(500).delay((_,i)=>i*80).attr('r',d=>d.r);
}

function drawSankey(svg, color) {
  const links=[
    {sx:55,sy1:70,sy2:130,tx:190,ty1:50,ty2:110,c:color},
    {sx:55,sy1:130,sy2:190,tx:190,ty1:130,ty2:190,c:'#95D5B2'},
    {sx:205,sy1:50,sy2:90,tx:340,ty1:60,ty2:100,c:color},
    {sx:205,sy1:90,sy2:110,tx:340,ty1:110,ty2:140,c:'#B8B8E8'},
    {sx:205,sy1:130,sy2:190,tx:340,ty1:150,ty2:200,c:'#95D5B2'},
  ];
  links.forEach(l=>{
    svg.append('path')
      .attr('d',`M${l.sx},${l.sy1} C${(l.sx+l.tx)/2},${l.sy1} ${(l.sx+l.tx)/2},${l.ty1} ${l.tx},${l.ty1} L${l.tx},${l.ty2} C${(l.sx+l.tx)/2},${l.ty2} ${(l.sx+l.tx)/2},${l.sy2} ${l.sx},${l.sy2} Z`)
      .attr('fill',l.c).attr('opacity',0.35);
  });
  [[40,70,120,'来源'],[190,50,60,'路径A'],[190,130,60,'路径B'],[340,60,40,'结果1'],[340,110,30,'结果2'],[340,150,50,'结果3']].forEach(([x,y,h,label])=>{
    svg.append('rect').attr('x',x).attr('y',y).attr('width',14).attr('height',h).attr('fill',color).attr('opacity',0.85).attr('rx',2);
    svg.append('text').attr('x',x+18).attr('y',y+h/2).attr('dominant-baseline','middle').attr('fill','#aaa').attr('font-size','9.5px').attr('font-family','var(--font-heading)').text(label);
  });
}

function drawStackedBar(svg, color) {
  const data=[{c:'Q1',a:30,b:40,cc:30},{c:'Q2',a:35,b:35,cc:30},{c:'Q3',a:25,b:45,cc:30},{c:'Q4',a:40,b:30,cc:30}];
  const cls=[color,'#95D5B2','#B8B8E8'];
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const x=d3.scaleBand().domain(data.map(d=>d.c)).range([0,W]).padding(0.35);
  const y=d3.scaleLinear().domain([0,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  data.forEach(d=>{
    let cum=0;
    [[d.a,0],[d.b,1],[d.cc,2]].forEach(([v,ci])=>{
      g.append('rect').attr('x',x(d.c)).attr('width',x.bandwidth())
        .attr('y',y(cum+v)).attr('height',H-y(v)).attr('fill',cls[ci]).attr('opacity',0.85).attr('rx',1);
      cum+=v;
    });
  });
}

function drawDonut(svg, color) {
  const data=[42,28,18,12];
  const cls=[color,'#95D5B2','#B8B8E8','#F0B27A'];
  const pie=d3.pie().value(d=>d).sort(null);
  const arc=d3.arc().innerRadius(55).outerRadius(90);
  const g=svg.append('g').attr('transform','translate(200,130)');
  pie(data).forEach((d,i)=>{
    g.append('path').datum(d).attr('fill',cls[i]).attr('opacity',0.88).attr('d',arc).attr('stroke','#111418').attr('stroke-width',2);
  });
  g.append('text').attr('text-anchor','middle').attr('dominant-baseline','middle')
    .attr('fill','#fff').attr('font-size','14px').attr('font-family','var(--font-heading)').attr('font-weight','600').text('42%');
}

function drawTreemap(svg, color) {
  const root=d3.hierarchy({children:[{v:35},{v:25},{v:20},{v:12},{v:5},{v:3}]}).sum(d=>d.v);
  d3.treemap().size([400,260]).padding(3)(root);
  const cls=[color,'#95D5B2','#B8B8E8','#F0B27A','#E07A7A','#F0D264'];
  root.leaves().forEach((d,i)=>{
    svg.append('rect').attr('x',d.x0).attr('y',d.y0).attr('width',d.x1-d.x0).attr('height',d.y1-d.y0).attr('fill',cls[i%cls.length]).attr('opacity',0.85).attr('rx',3);
    if(d.x1-d.x0>38) svg.append('text').attr('x',(d.x0+d.x1)/2).attr('y',(d.y0+d.y1)/2).attr('text-anchor','middle').attr('dominant-baseline','middle').attr('fill','#1d1d1f').attr('font-size','11px').attr('font-weight','600').text(d.data.v+'%');
  });
}

function drawWaffle(svg, color) {
  const filled=63, cs=17, gap=3, cols=10;
  const ox=(400-cols*(cs+gap)+gap)/2, oy=(260-10*(cs+gap)+gap)/2;
  for(let i=0;i<100;i++){
    const col=i%cols,row=Math.floor(i/cols);
    svg.append('rect').attr('x',ox+col*(cs+gap)).attr('y',oy+row*(cs+gap)).attr('width',cs).attr('height',cs)
      .attr('fill',i<filled?color:'#2a2a2a').attr('rx',2).attr('opacity',0)
      .transition().delay(i*7).duration(180).attr('opacity',1);
  }
  svg.append('text').attr('x',200).attr('y',240).attr('text-anchor','middle').attr('fill','#888').attr('font-size','11px').attr('font-family','var(--font-heading)').text(`${filled}% — 每格代表 1%`);
}

function drawLine(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
  const series=[{v:[42,55,61,48,72,68,85,90],c:color},{v:[30,35,38,42,50,55,60,65],c:'#95D5B2'}];
  const x=d3.scaleBand().domain(months).range([0,W]).padding(0.1);
  const y=d3.scaleLinear().domain([20,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).tickSize(0)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  const lg=d3.line().x((_,i)=>x(months[i])+x.bandwidth()/2).y(d=>y(d)).curve(d3.curveCatmullRom);
  series.forEach(s=>{
    const path=g.append('path').datum(s.v).attr('fill','none').attr('stroke',s.c).attr('stroke-width',2.5).attr('d',lg);
    const tl=path.node().getTotalLength();
    path.attr('stroke-dasharray',tl).attr('stroke-dashoffset',tl).transition().duration(900).ease(d3.easeQuadOut).attr('stroke-dashoffset',0);
  });
}

function drawArea(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const vals=[42,55,61,48,72,68,85,90,78,95];
  const x=d3.scaleLinear().domain([0,vals.length-1]).range([0,W]);
  const y=d3.scaleLinear().domain([30,100]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).ticks(5)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  const ag=d3.area().x((_,i)=>x(i)).y0(H).y1(d=>y(d)).curve(d3.curveCatmullRom);
  const lg=d3.line().x((_,i)=>x(i)).y(d=>y(d)).curve(d3.curveCatmullRom);
  g.append('path').datum(vals).attr('fill',color).attr('opacity',0.2).attr('d',ag);
  const path=g.append('path').datum(vals).attr('fill','none').attr('stroke',color).attr('stroke-width',2.5).attr('d',lg);
  const tl=path.node().getTotalLength();
  path.attr('stroke-dasharray',tl).attr('stroke-dashoffset',tl).transition().duration(900).attr('stroke-dashoffset',0);
}

function drawRidgeline(svg, color) {
  const groups=['Group A','Group B','Group C','Group D'];
  const params=[{mu:40},{mu:55},{mu:70},{mu:48}];
  const cls=[color,'#95D5B2','#B8B8E8','#F0B27A'];
  const m={t:28,r:28,b:28,l:60};
  const W=400-m.l-m.r, rowH=(260-m.t-m.b)/groups.length*1.35;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const xsc=d3.scaleLinear().domain([0,100]).range([0,W]);
  groups.forEach((grp,gi)=>{
    const yOff=gi*(rowH*0.72);
    const pdf=v=>Math.exp(-0.5*((v-params[gi].mu)/14)**2);
    const pts=d3.range(0,101,2).map(v=>({v,d:pdf(v)}));
    const maxD=d3.max(pts,p=>p.d);
    const ysc=d3.scaleLinear().domain([0,maxD]).range([0,-rowH]);
    const ag=d3.area().x(p=>xsc(p.v)).y0(0).y1(p=>ysc(p.d));
    const lg=d3.line().x(p=>xsc(p.v)).y(p=>ysc(p.d));
    const gg=g.append('g').attr('transform',`translate(0,${yOff+rowH})`);
    gg.append('path').datum(pts).attr('fill',cls[gi]).attr('opacity',0.3).attr('d',ag);
    gg.append('path').datum(pts).attr('fill','none').attr('stroke',cls[gi]).attr('stroke-width',2).attr('d',lg);
    gg.append('text').attr('x',-6).attr('y',-rowH/2).attr('text-anchor','end').attr('dominant-baseline','middle').attr('fill','#aaa').attr('font-size','9.5px').text(grp);
  });
}

function drawStep(svg, color) {
  const m={t:28,r:28,b:48,l:48},W=400-m.l-m.r,H=260-m.t-m.b;
  const g=svg.append('g').attr('transform',`translate(${m.l},${m.t})`);
  const pts=[{x:0,y:30},{x:2,y:30},{x:2,y:55},{x:4,y:55},{x:4,y:42},{x:6,y:42},{x:6,y:70},{x:8,y:70},{x:8,y:58},{x:10,y:58}];
  const x=d3.scaleLinear().domain([0,10]).range([0,W]);
  const y=d3.scaleLinear().domain([20,80]).range([H,0]);
  g.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(x).ticks(5)).call(axisStyle);
  g.append('g').call(d3.axisLeft(y).ticks(4)).call(axisStyle);
  const ag=d3.area().x(d=>x(d.x)).y0(H).y1(d=>y(d.y));
  const lg=d3.line().x(d=>x(d.x)).y(d=>y(d.y));
  g.append('path').datum(pts).attr('fill',color).attr('opacity',0.15).attr('d',ag);
  const path=g.append('path').datum(pts).attr('fill','none').attr('stroke',color).attr('stroke-width',2.5).attr('d',lg);
  const tl=path.node().getTotalLength();
  path.attr('stroke-dasharray',tl).attr('stroke-dashoffset',tl).transition().duration(900).attr('stroke-dashoffset',0);
}

// ─────────────────────────────────────────────
// 饼图误用案例绘制
// ─────────────────────────────────────────────
function drawPieCase0() {
  const data=[{l:'方法A',v:28},{l:'方法B',v:22},{l:'方法C',v:18},{l:'方法D',v:14},{l:'方法E',v:10},{l:'方法F',v:5},{l:'其他',v:3}];
  const cls7=['#e03030','#f08030','#c8b820','#50c050','#3090d0','#8050d0','#d050a0'];

  // 坏：饼图
  const bs=d3.select('#pc-bad-0');
  bs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const pie=d3.pie().value(d=>d.v).sort(null);
  const arc=d3.arc().innerRadius(0).outerRadius(70);
  const g=bs.append('g').attr('transform','translate(100,100)');
  pie(data).forEach((d,i)=>g.append('path').datum(d).attr('fill',cls7[i]).attr('d',arc).attr('stroke','#fff').attr('stroke-width',1));
  bs.append('text').attr('x',100).attr('y',182).attr('text-anchor','middle').attr('fill','#c53030').attr('font-size','10px').attr('font-family','var(--font-heading)').text('7个扇区，颜色难以区分');

  // 好：水平条形图
  const gs=d3.select('#pc-good-0');
  gs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const sorted=[...data].sort((a,b)=>b.v-a.v);
  const y=d3.scaleBand().domain(sorted.map(d=>d.l)).range([12,188]).padding(0.22);
  const x=d3.scaleLinear().domain([0,30]).range([58,265]);
  sorted.forEach(d=>{
    gs.append('rect').attr('x',58).attr('y',y(d.l)).attr('height',y.bandwidth()).attr('width',x(d.v)-58).attr('fill','#7EC8E3').attr('opacity',0.85).attr('rx',3);
    gs.append('text').attr('x',54).attr('y',y(d.l)+y.bandwidth()/2).attr('text-anchor','end').attr('dominant-baseline','middle').attr('fill','#444').attr('font-size','9.5px').attr('font-family','var(--font-heading)').text(d.l);
    gs.append('text').attr('x',x(d.v)+3).attr('y',y(d.l)+y.bandwidth()/2).attr('dominant-baseline','middle').attr('fill','#444').attr('font-size','9px').text(d.v+'%');
  });
}

function drawPieCase1() {
  const data=[{l:'A',v:33},{l:'B',v:34},{l:'C',v:33}];
  const cls=['#e03030','#f08030','#3090d0'];

  const bs=d3.select('#pc-bad-1');
  bs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const pie=d3.pie().value(d=>d.v).sort(null);
  const arc=d3.arc().innerRadius(0).outerRadius(70);
  const g=bs.append('g').attr('transform','translate(140,100)');
  pie(data).forEach((d,i)=>{
    g.append('path').datum(d).attr('fill',cls[i]).attr('d',arc).attr('stroke','#fff').attr('stroke-width',2);
    const c=arc.centroid(d);
    g.append('text').attr('x',c[0]).attr('y',c[1]).attr('text-anchor','middle').attr('dominant-baseline','middle').attr('fill','#fff').attr('font-size','11px').attr('font-weight','700').text(d.data.v+'%');
  });
  bs.append('text').attr('x',140).attr('y',185).attr('text-anchor','middle').attr('fill','#c53030').attr('font-size','10px').attr('font-family','var(--font-heading)').text('33%/34%/33%：肉眼无法区分');

  const gs=d3.select('#pc-good-1');
  gs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const x=d3.scaleBand().domain(data.map(d=>d.l)).range([36,244]).padding(0.35);
  const y=d3.scaleLinear().domain([30,36]).range([158,28]);
  const gg=gs.append('g');
  data.forEach((d,i)=>{
    gg.append('rect').attr('x',x(d.l)).attr('width',x.bandwidth()).attr('y',y(d.v)).attr('height',158-y(d.v)).attr('fill',cls[i]).attr('opacity',0.85).attr('rx',3);
    gg.append('text').attr('x',x(d.l)+x.bandwidth()/2).attr('y',y(d.v)-6).attr('text-anchor','middle').attr('fill','#333').attr('font-size','12px').attr('font-weight','700').text(d.v+'%');
    gg.append('text').attr('x',x(d.l)+x.bandwidth()/2).attr('y',172).attr('text-anchor','middle').attr('fill','#555').attr('font-size','12px').text(d.l);
  });
  gs.append('text').attr('x',140).attr('y',192).attr('text-anchor','middle').attr('fill','#276749').attr('font-size','10px').attr('font-family','var(--font-heading)').text('柱状图：B最高，差异清晰可辨');
}

function drawPieCase2() {
  const years=[2020,2021,2022,2023];
  const vals=[32,41,58,73];

  const bs=d3.select('#pc-bad-2');
  bs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const pie=d3.pie().value(d=>d).sort(null);
  const arc=d3.arc().innerRadius(0).outerRadius(23);
  years.forEach((yr,yi)=>{
    const v=vals[yi];
    const g=bs.append('g').attr('transform',`translate(${35+yi*62},78)`);
    pie([v,100-v]).forEach((d,i)=>g.append('path').datum(d).attr('fill',i===0?'#e03030':'#ddd').attr('d',arc));
    bs.append('text').attr('x',35+yi*62).attr('y',112).attr('text-anchor','middle').attr('fill','#555').attr('font-size','9.5px').text(yr);
  });
  bs.append('text').attr('x',140).attr('y',135).attr('text-anchor','middle').attr('fill','#c53030').attr('font-size','10px').attr('font-family','var(--font-heading)').text('4个饼图：无法感知增长趋势');

  const gs=d3.select('#pc-good-2');
  gs.append('rect').attr('width',280).attr('height',200).attr('fill','#fafafa');
  const m={t:18,r:18,b:36,l:38},W=280-m.l-m.r,H=200-m.t-m.b;
  const xsc=d3.scaleLinear().domain([2020,2023]).range([0,W]);
  const ysc=d3.scaleLinear().domain([20,80]).range([H,0]);
  const gLine=gs.append('g').attr('transform',`translate(${m.l},${m.t})`);
  gLine.append('g').attr('transform',`translate(0,${H})`).call(d3.axisBottom(xsc).ticks(4).tickFormat(d3.format('d')).tickSize(0)).call(g=>{g.select('.domain').remove();g.selectAll('text').attr('fill','#555').attr('font-size','9.5px');});
  gLine.append('g').call(d3.axisLeft(ysc).ticks(4).tickSize(0)).call(g=>{g.select('.domain').remove();g.selectAll('text').attr('fill','#555').attr('font-size','9.5px');});
  const pts=years.map((yr,i)=>({x:yr,y:vals[i]}));
  gLine.append('path').datum(pts).attr('fill','#7EC8E3').attr('opacity',0.2).attr('d',d3.area().x(d=>xsc(d.x)).y0(H).y1(d=>ysc(d.y)).curve(d3.curveCatmullRom));
  const lp=gLine.append('path').datum(pts).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',2.5).attr('d',d3.line().x(d=>xsc(d.x)).y(d=>ysc(d.y)).curve(d3.curveCatmullRom));
  const tl=lp.node().getTotalLength();
  lp.attr('stroke-dasharray',tl).attr('stroke-dashoffset',tl).transition().duration(900).attr('stroke-dashoffset',0);
  pts.forEach(p=>gLine.append('circle').attr('cx',xsc(p.x)).attr('cy',ysc(p.y)).attr('r',4).attr('fill','#7EC8E3'));
  gs.append('text').attr('x',140).attr('y',192).attr('text-anchor','middle').attr('fill','#276749').attr('font-size','10px').attr('font-family','var(--font-heading)').text('折线图：增长趋势一目了然');
}

// ─────────────────────────────────────────────
// destroy()
// ─────────────────────────────────────────────
export function destroy() {
  killAll();
  state.resizeHandlers.forEach(fn => window.removeEventListener('resize', fn));
  state.resizeHandlers = [];
  state.treePath = [];
  if (window._p5nav) delete window._p5nav;
}
