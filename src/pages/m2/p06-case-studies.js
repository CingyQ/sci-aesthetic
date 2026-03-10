import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';

let _scrollHandlers = [];
let _observers = []; // reserved for future IntersectionObserver instances

// ─── Mermaid ────────────────────────────────────────────────────────────────
let mermaidApi = null;
let mermaidReady = false;

async function initMermaid() {
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
    mermaidApi = mod.default;
    mermaidApi.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'strict',
      themeVariables: {
        primaryColor: '#2d2d4a',
        primaryTextColor: '#f5f5f7',
        lineColor: '#B8B8E8',
        background: '#1d1d1f',
      },
    });
    mermaidReady = true;
  } catch (e) {
    console.warn('Mermaid load failed:', e);
  }
}

async function renderMermaid(code, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!mermaidReady || !mermaidApi) {
    container.innerHTML = `<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${code}</pre>`;
    return;
  }
  try {
    const uid = 'mg-' + Math.random().toString(36).slice(2, 8);
    const { svg } = await mermaidApi.render(uid, code);
    container.innerHTML = svg;
    const svgEl = container.querySelector('svg');
    if (svgEl) {
      svgEl.style.display = 'block';
      svgEl.style.height = 'auto';
      // 不设 max-width：SVG 保持天然宽度，容器 overflow:auto 负责滚动
    }
  } catch (e) {
    if (container) {
      container.innerHTML = `<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${code}</pre>`;
    }
  }
}

// ─── 数据常量 ────────────────────────────────────────────────────────────────

const CASE_CARDS = [
  { num: '01', title: '水污染 Graphical Abstract', brief: '期刊GA制作全流程，从论文摘要到投稿级GA，使用Nano Banana + Vectorizer.AI', target: '#p06-s2' },
  { num: '02', title: '微塑料迁移方法图', brief: 'Methods部分流程图制作，Mermaid AI生成可编辑流程图，展示微塑料迁移路径', target: '#p06-s3' },
  { num: '03', title: '碳循环综述概念图', brief: '综述文章框架图制作，多轮CDTF迭代和AI辅助，从框架到精修全流程', target: '#p06-s4' },
];

const CASE1_STEPS = [
  { num: '01', title: '提取核心信息', icon: '📝',
    desc: '从论文摘要提炼3个核心发现：①流域重金属Cd超标40倍 ②采矿源贡献58% ③EDTA修复效率82%',
    tip: '技巧：找到"最重要的一句话"，GA就是它的视觉化版本。' },
  { num: '02', title: '视觉隐喻选择', icon: '💡',
    desc: '选择河流→流域→土壤的视觉层级，用水流贯穿全图建立空间感，污染程度用颜色深浅编码。',
    tip: '避免用抽象几何形状，科研GA最有力的隐喻来自研究对象本身的形态。' },
  { num: '03', title: '撰写CDTF Prompt', icon: '✍️',
    desc: '[Context]中国流域重金属污染研究，投稿Science of The Total Environment\n[Description]从河流上游采矿区→中游农业区→下游城市区的Cd污染梯度，EDTA植物修复机制\n[Technique]蓝绿配色，卫星视角俯瞰，数字标注污染浓度\n[Format]1.8:1，300DPI，白色背景',
    tip: '期刊要求的GA尺寸不同，先查目标期刊要求再设置Format。' },
  { num: '04', title: 'Nano Banana 生成', icon: '🤖',
    desc: '使用 Nano Banana（Gemini on OpenRouter）生成3个备选版本。选择构图最清晰的版本进入下一步。',
    tip: '生成3-5个版本，从中选择而非修改到满意，成本更低效率更高。' },
  { num: '05', title: '迭代精修（3轮）', icon: '🔄',
    desc: 'Round 1：调整色彩，将默认色改为色盲友好方案\nRound 2：添加污染浓度数字标注，调整字体大小\nRound 3：优化图例位置，移除冗余信息',
    tip: '每轮只改一个维度，否则难以判断哪个改动有效。' },
  { num: '06', title: '矢量化+精修', icon: '⚡',
    desc: '用Vectorizer.AI转为SVG→Illustrator清理路径→统一色板→重写文字标注→调整到86mm宽度',
    tip: '从AI图到出版级图的"最后一公里"——矢量化+精修通常需要45-90分钟。' },
  { num: '07', title: '期刊导出+AI声明', icon: '📤',
    desc: '导出PNG（300DPI，RGB）+ PDF（矢量）\n在图注末尾添加：This Graphical Abstract was created with AI assistance (Nano Banana, 2025), verified by authors.',
    tip: '保留所有prompt文本，便于后续修改和声明审核。' },
];

const CASE2_STEPS = [
  { num: '01', title: '用Mermaid AI生成流程图代码', icon: '🔧',
    desc: '将微塑料迁移路径描述输入Mermaid AI，得到可编辑的flowchart TD代码。路径：塑料制品→风化破碎→粒径分类→土壤积累/地下水→河流→海洋。',
    tip: 'Mermaid AI的优势：输出是可编辑代码，而非图片，修改成本极低。' },
  { num: '02', title: '迭代优化流程结构', icon: '🔄',
    desc: '在Mermaid在线编辑器中调整节点命名、添加表情图标、优化连线方向，确保科学逻辑正确。',
    tip: '将Mermaid代码直接粘贴到mermaid.live可实时预览修改效果。' },
  { num: '03', title: '导出SVG并在Illustrator精修', icon: '✏️',
    desc: 'Mermaid可直接导出SVG文件，在Illustrator中：统一字体（Helvetica/Noto Sans SC）、调整节点颜色、添加图注、设置页面尺寸。',
    tip: 'Mermaid的SVG路径已经很干净，通常不需要简化路径，直接修改即可。' },
  { num: '04', title: '与正文其他图表配色统一', icon: '🎨',
    desc: '检查流程图配色是否与论文其他图表（箱线图、地图等）协调。使用全局重新着色功能统一整体色调。',
    tip: '建议将论文中所有图表的配色汇总成一个色板文件，方便跨图表一致性检查。' },
  { num: '05', title: '声明+投稿', icon: '📤',
    desc: '在图注末尾添加：This flow chart was generated with Mermaid AI assistance and verified by the authors. Methods were validated against published protocols.',
    tip: 'Mermaid是开源工具，声明中注明即可，通常不需要额外的期刊批准。' },
];

const CASE2_MERMAID = `flowchart LR
  A["🏭 塑料制品\n(包装/农膜/轮胎)"] --> B["⚡ 风化破碎\n(UV/机械摩擦)"]
  B --> C{"粒径\n分类"}
  C -->|"< 5 mm\n微塑料"| D["🌱 表层土壤\n积累"]
  C -->|"< 1 μm\n纳米塑料"| E["💧 深层渗漏\n污染"]
  D --> F["🌊 地表径流\n携带迁移"]
  E --> G["🔩 地下水\n污染扩散"]
  F --> H["🏞️ 河流\n浓度峰值采样"]
  G --> H
  H --> I["🌀 河口\n过渡带"]
  I --> J["🐚 近岸海洋\n底泥积累"]
  J --> K["🌑 深海\n最终汇集"]`;

const CASE3_STEPS = [
  { num: '01', title: '梳理综述框架', icon: '🗺',
    desc: '将综述覆盖的4个核心方向系统化：①森林固碳过程 ②碳循环调控机制 ③碳汇监测方法 ④气候变化响应。确定各子主题的核心概念和相互关系。',
    tip: '综述框架图最忌讳内容过多，4-6个核心概念是最佳信息密度。' },
  { num: '02', title: '选择视觉隐喻：同心圆层级', icon: '🎯',
    desc: '选用同心圆布局：内圈=森林生态系统（研究主体），中圈=碳循环机制（核心过程），外圈=监测与响应（研究手段和背景）。',
    tip: '层级越少越好，3层是最大值。超过3层视觉关系会变得模糊。' },
  { num: '03', title: '4轮CDTF迭代', icon: '🔄',
    desc: '第1稿：建立基本同心圆结构，确认层级关系\n第2稿：丰富内容，添加代表性图标和关键词\n第3稿：调整色彩，统一绿色系，增加深度感\n第4稿：精化标注，添加碳通量方向箭头',
    tip: '每稿只修改1-2个目标，保存所有版本便于回溯。' },
  { num: '04', title: '矢量化与标注', icon: '⚡',
    desc: 'FLUX 1.1 Pro输出→Vectorizer.AI→Illustrator精修：删除AI文字路径→Noto Sans SC重新标注→添加碳通量数字（GPP/Ra/Rh/NEP）→调整为双栏宽度（176mm）',
    tip: '综述概念图通常需要更多手工精修时间，预留2小时。' },
  { num: '05', title: '审稿意见修改', icon: '📋',
    desc: '针对审稿人"增加方法部分内容"的意见：在外圈新增"涡度相关法"和"遥感监测"图标，补充方法层级。修改时只需在AI原图基础上叠加新元素，不必重新生成。',
    tip: '保留原始矢量文件是快速响应审稿意见的关键。每次修改另存为新版本。' },
];

const SUMMARY_DATA = [
  { aspect: '总耗时', case1: '约4小时', case2: '约3小时', case3: '约5小时' },
  { aspect: '纯手绘估时', case1: '约12小时', case2: '约8小时', case3: '约15小时' },
  { aspect: 'AI节省时间', case1: '~67%', case2: '~62%', case3: '~67%' },
  { aspect: 'Prompt迭代轮次', case1: '3轮', case2: '2轮', case3: '4轮' },
  { aspect: '矢量化时间', case1: '90分钟', case2: '60分钟（Mermaid直出SVG）', case3: '90分钟' },
  { aspect: '最大挑战', case1: '科学标注准确性', case2: '结构逻辑清晰度', case3: '信息密度控制' },
];

const TAKEAWAYS = [
  { icon: '⚡', title: 'AI加速比约3-4倍', desc: '三个案例平均节省时间约65%，主要节省在"构图+配色+标注"等需要设计技能的环节，这也是科研工作者传统上最薄弱的地方。' },
  { icon: '🔄', title: '迭代次数决定质量', desc: '2-3轮迭代是最优区间：第1轮建立框架，第2轮修正科学细节，第3轮精化视觉。超过4轮往往意味着目标不够清晰。' },
  { icon: '📋', title: '矢量化是不可省略的环节', desc: '从AI图到出版图，矢量化和人工标注平均需要60-90分钟。这一步无法AI化，是体现科学严谨性的最重要环节。' },
];

// ─── 辅助函数 ────────────────────────────────────────────────────────────────

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildStepCard(step, theme /* 'light' | 'dark' */) {
  return `
    <div class="p06-step-card ${theme}">
      <div class="p06-step-icon">${esc(step.icon)}</div>
      <div class="p06-step-num">STEP ${step.num}</div>
      <div class="p06-step-title ${theme}">${esc(step.title)}</div>
      <div class="p06-step-desc ${theme}">${esc(step.desc)}</div>
      <div class="p06-step-tip ${theme}">${esc(step.tip)}</div>
    </div>`;
}

function buildPlaceholder(icon, label, desc) {
  return `
    <div class="m2-placeholder">
      <div class="m2-placeholder-inner">
        <div class="m2-ph-icon">${icon}</div>
        <div class="m2-ph-label">${esc(label)}</div>
        <div class="m2-ph-desc">${esc(desc)}</div>
      </div>
    </div>`;
}

// ─── render ──────────────────────────────────────────────────────────────────

export function render() {
  // S1 — case selector cards
  const caseCardsHtml = CASE_CARDS.map(c => `
    <div class="p06-case-card" data-target="${esc(c.target)}" tabindex="0" role="button" aria-label="跳转到案例 ${c.num}">
      <div class="p06-cc-num">${esc(c.num)}</div>
      <h3>${esc(c.title)}</h3>
      <p>${esc(c.brief)}</p>
    </div>`).join('');

  // S2 — case 1 steps (7 steps, cols-4 grid, auto-flow wraps to second row)
  const case1StepsHtml = CASE1_STEPS.map(s => buildStepCard(s, 'light')).join('');

  // S3 — case 2 steps (5 steps)
  const case2StepsHtml = CASE2_STEPS.map(s => buildStepCard(s, 'dark')).join('');

  // S4 — case 3 steps (5 steps)
  const case3StepsHtml = CASE3_STEPS.map(s => buildStepCard(s, 'light')).join('');

  // S5 — summary table rows
  const summaryRowsHtml = SUMMARY_DATA.map(row => `
    <tr>
      <td>${esc(row.aspect)}</td>
      <td>${esc(row.case1)}</td>
      <td>${esc(row.case2)}</td>
      <td>${esc(row.case3)}</td>
    </tr>`).join('');

  // S5 — takeaway cards
  const takeawayCardsHtml = TAKEAWAYS.map(t => `
    <div class="p06-takeaway-card">
      <div class="p06-takeaway-icon">${esc(t.icon)}</div>
      <div class="p06-takeaway-title">${esc(t.title)}</div>
      <div class="p06-takeaway-desc">${esc(t.desc)}</div>
    </div>`).join('');

  return `<div class="page-scroll">
<style>
/* ── p06 hero ── */
.p06-hero { position:relative; overflow:hidden; align-items:center; }
.p06-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 30% 40%, rgba(184,184,232,0.18) 0%, transparent 65%); animation:p06-drift-a 12s ease-in-out infinite; pointer-events:none; }
.p06-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 45% at 70% 60%, rgba(149,213,178,0.1) 0%, transparent 65%); animation:p06-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p06-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-18px)} }
@keyframes p06-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,22px)} }
.p06-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p06-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p06-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 case selector ── */
.p06-case-selector { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-lg); max-width:1100px; margin:0 auto; }
.p06-case-card { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); cursor:pointer; transition:all 0.25s; }
.p06-case-card:hover { transform:translateY(-4px); border-color:var(--module-2); box-shadow:0 8px 32px rgba(184,184,232,0.12); }
.p06-case-card:focus { outline:2px solid var(--module-2); outline-offset:3px; }
.p06-cc-num { font-size:clamp(2rem,5vw,4rem); font-weight:700; color:var(--module-2); opacity:0.25; font-family:var(--font-display); line-height:1; margin-bottom:var(--space-sm); }
.p06-case-card h3 { font-size:var(--text-heading); font-weight:700; color:var(--text-on-dark); margin-bottom:var(--space-sm); font-family:var(--font-display); }
.p06-case-card p { font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.7; }

/* ── step grids ── */
.p06-steps-grid { display:grid; gap:var(--space-md); max-width:1100px; margin:0 auto var(--space-2xl); }
.p06-steps-grid.cols-4 { grid-template-columns:repeat(4,1fr); }
.p06-steps-grid.cols-5 { grid-template-columns:repeat(5,1fr); }
.p06-step-card { border-radius:var(--radius-lg); padding:var(--space-lg); }
.p06-step-card.light { background:var(--bg-light-elevated,#fff); border:1px solid var(--border-light); }
.p06-step-card.dark  { background:var(--bg-dark-elevated); border:1px solid var(--border-dark); }
.p06-step-icon { font-size:1.8rem; margin-bottom:var(--space-sm); }
.p06-step-num { font-size:0.7rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--module-2); margin-bottom:4px; }
.p06-step-title { font-size:0.95rem; font-weight:700; margin-bottom:var(--space-sm); }
.p06-step-title.light { color:var(--text-on-light); }
.p06-step-title.dark  { color:var(--text-on-dark); }
.p06-step-desc { font-size:0.82rem; line-height:1.7; margin-bottom:var(--space-sm); white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
.p06-step-desc.light { color:var(--text-on-light-2); }
.p06-step-desc.dark  { color:var(--text-on-dark-2); }
.p06-step-tip { font-size:0.75rem; line-height:1.6; padding:8px 12px; border-radius:var(--radius-sm); border-left:3px solid var(--module-2); }
.p06-step-tip.light { background:rgba(184,184,232,0.06); color:var(--text-on-light-2); }
.p06-step-tip.dark  { background:rgba(184,184,232,0.08); color:var(--text-on-dark-2); }

/* ── S3 Mermaid ── */
.p06-mermaid-wrap { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); min-height:180px; max-height:400px; overflow:auto; -webkit-overflow-scrolling:touch; touch-action:pan-x pan-y; max-width:1100px; margin:0 auto var(--space-2xl); }
.p06-mermaid-wrap svg { width:auto !important; max-width:none; height:auto; min-height:160px; display:block; }
.p06-mermaid-hint { display:none; }
@media (max-width:768px) { .p06-mermaid-hint { display:block; text-align:center; font-size:var(--text-caption); color:var(--text-on-dark-3); margin-top:calc(-1 * var(--space-md)); margin-bottom:var(--space-md); } }

/* ── before/after placeholder row ── */
.p06-ba-row { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); max-width:1100px; margin:0 auto var(--space-2xl); }
.p06-ba-label { font-size:var(--text-small); font-weight:700; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:var(--space-sm); }
.p06-ba-label.light { color:var(--text-on-light-2); }
.p06-ba-label.dark  { color:var(--text-on-dark-2); }
.p06-ph-wrap { max-width:1100px; margin:0 auto var(--space-2xl); }

/* ── S5 summary ── */
.p06-summary-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:var(--radius-lg); border:1px solid var(--border-dark); max-width:1000px; margin:0 auto var(--space-2xl); }
.p06-summary-table { border-collapse:collapse; width:100%; min-width:600px; }
.p06-summary-table th { padding:12px 16px; font-size:0.8rem; font-weight:700; color:var(--text-on-dark-2); text-align:center; background:var(--bg-dark-elevated); border-bottom:2px solid var(--border-dark); }
.p06-summary-table th:first-child { text-align:left; }
.p06-summary-table td { padding:10px 16px; text-align:center; border-bottom:1px solid var(--border-dark); font-size:0.85rem; color:var(--text-on-dark-2); }
.p06-summary-table td:first-child { text-align:left; font-weight:600; color:var(--text-on-dark); background:var(--bg-dark-elevated); white-space:nowrap; }
.p06-summary-table tr:last-child td { border-bottom:none; }
.p06-takeaway-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-lg); max-width:1000px; margin:0 auto; }
.p06-takeaway-card { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); }
.p06-takeaway-icon { font-size:2rem; margin-bottom:var(--space-sm); }
.p06-takeaway-title { font-size:var(--text-body); font-weight:700; color:var(--text-on-dark); margin-bottom:var(--space-sm); }
.p06-takeaway-desc { font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.7; }

/* ── section padding（桌面端） ── */
#p06-s1, #p06-s2, #p06-s3, #p06-s4, #p06-s5 { padding: var(--space-3xl) var(--space-xl); }
/* ── 全局溢出防护（任何宽度下）── */
#p06-s1, #p06-s2, #p06-s3, #p06-s4, #p06-s5 { overflow-x:hidden; }

/* ── responsive ── */
@media (max-width:900px) {
  .p06-case-selector { grid-template-columns:1fr; }
  .p06-steps-grid.cols-4 { grid-template-columns:repeat(2,1fr); }
  .p06-steps-grid.cols-5 { grid-template-columns:repeat(2,1fr); }
  .p06-takeaway-grid { grid-template-columns:1fr; }
  .p06-ba-row { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  #p06-s1, #p06-s2, #p06-s3, #p06-s4, #p06-s5 { scroll-margin-top:56px; padding:var(--space-xl) var(--space-sm); }
  /* flex 子元素 margin:auto 会取消 stretch，强制 100% 宽度 */
  #p06-s1 > div, #p06-s2 > div, #p06-s3 > div, #p06-s4 > div, #p06-s5 > div { width:100%; min-width:0; max-width:100%; }
  /* 案例 02：步骤卡片减少内边距 */
  .p06-steps-grid.cols-4 { grid-template-columns:1fr; }
  .p06-steps-grid.cols-5 { grid-template-columns:1fr; }
  .p06-step-card { padding:var(--space-md) !important; }
  .p06-step-icon { font-size:1.4rem; }
  .p06-step-title { font-size:0.9rem; }
  .p06-step-desc  { font-size:0.8rem; }
  .p06-step-tip   { font-size:0.72rem; }
  /* 案例 02：Mermaid 固定高度+横向滚动，防 SVG 撑破外层 */
  .p06-mermaid-wrap { max-height:220px; min-height:120px; padding:var(--space-sm); max-width:100%; box-sizing:border-box; }
  .p06-mermaid-wrap svg { height:180px !important; width:auto !important; min-height:unset; min-width:360px; }
  /* 案例 02：最终图片容器全宽 */
  .p06-ph-wrap { margin:0 0 var(--space-xl); }
  /* 规律总结：表格在 section 内水平滚动，无需全宽展开 */
  .p06-steps-grid { max-width:100%; box-sizing:border-box; }
  .p06-ba-row { max-width:100%; box-sizing:border-box; }
  .p06-summary-wrap { box-sizing:border-box; max-width:100%; }
  .p06-summary-table th,
  .p06-summary-table td { padding:7px 8px; font-size:0.76rem; }
  .p06-summary-table td:first-child { white-space:normal; font-size:0.76rem; min-width:72px; }
  /* takeaway 卡片已在 900px 改为 1 列，移动端减少内边距 */
  .p06-takeaway-card { padding:var(--space-md); }
}
</style>

<!-- ══ Hero ══════════════════════════════════════════════════════════════════ -->
<section class="section-dark section-hero-full p06-hero" id="p06-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 06</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">端到端实战：三个完整案例</h1>
    <p class="page-hero-sub" style="opacity:0;">End-to-End Practice: Three Complete Cases</p>
    <p class="p06-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">从科学问题到出版级图像，完整走完每一步</p>
    <nav class="hero-quicknav" id="p06-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p06-s1">案例导览</button>
      <button class="hero-quicknav__item" data-target="#p06-s2">水污染 GA</button>
      <button class="hero-quicknav__item" data-target="#p06-s3">微塑料迁移图</button>
      <button class="hero-quicknav__item" data-target="#p06-s4">碳循环概念图</button>
      <button class="hero-quicknav__item" data-target="#p06-s5">经验总结</button>
    </nav>
    <div class="p06-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ══ S1 案例选择器（深色） ═══════════════════════════════════════════════ -->
<section class="section-dark" id="p06-s1">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">三个完整案例</p>
    <h2 class="section-title" style="color:var(--text-on-dark);">选择一个案例开始探索</h2>
    <p class="section-body" style="color:var(--text-on-dark-2);margin-bottom:var(--space-2xl);">
      每个案例涵盖从科学问题出发、到最终出版级图像的完整流程，包含真实Prompt、迭代细节和经验总结。
    </p>
    <div class="p06-case-selector" id="p06-case-selector">
      ${caseCardsHtml}
    </div>
  </div>
</section>

<!-- ══ S2 案例一：水污染 GA（浅色） ════════════════════════════════════════ -->
<section class="section-light" id="p06-s2">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">案例 01</p>
    <h2 class="section-title">案例一：水污染流域 Graphical Abstract</h2>
    <p class="section-body" style="margin-bottom:var(--space-2xl);">
      <em>Science of The Total Environment</em> 投稿，7步完整制作流程，从论文摘要提炼到投稿级 GA。
    </p>

    <!-- 7步流程（cols-4，CSS auto-flow自动折2行） -->
    <div class="p06-steps-grid cols-4">
      ${case1StepsHtml}
    </div>

    <!-- Before / After -->
    <div class="p06-ba-row">
      <div>
        <p class="p06-ba-label light">初稿草图</p>
        <div style="aspect-ratio:16/9;overflow:hidden;border-radius:var(--radius-md);">
          <img src="${import.meta.env.BASE_URL}assets/m2/p06-case1-draft.png" alt="Case 1 draft graphical abstract" style="width:100%;height:100%;object-fit:cover;display:block;">
        </div>
      </div>
      <div>
        <p class="p06-ba-label light">最终成果</p>
        <div style="aspect-ratio:16/9;overflow:hidden;border-radius:var(--radius-md);">
          <img src="${import.meta.env.BASE_URL}assets/m2/p06-case1-final-ga.png" alt="Case 1 final graphical abstract" style="width:100%;height:100%;object-fit:cover;display:block;">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ S3 案例二：微塑料迁移方法图（深色） ════════════════════════════════ -->
<section class="section-dark" id="p06-s3">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">案例 02</p>
    <h2 class="section-title" style="color:var(--text-on-dark);">案例二：微塑料迁移方法图</h2>
    <p class="section-body" style="color:var(--text-on-dark-2);margin-bottom:var(--space-2xl);">
      Mermaid AI 生成可编辑流程图，5步从文字描述到矢量图表，展示微塑料在环境中的迁移路径。
    </p>

    <!-- 5步流程 -->
    <div class="p06-steps-grid cols-5">
      ${case2StepsHtml}
    </div>

    <!-- Mermaid 流程图 -->
    <h3 style="font-size:var(--text-heading);font-weight:700;color:var(--text-on-dark);margin-bottom:var(--space-md);max-width:900px;margin-left:auto;margin-right:auto;">
      微塑料迁移路径流程图（Mermaid 渲染）
    </h3>
    <div class="p06-mermaid-wrap" id="p06-mermaid-output">
      <div style="color:var(--text-on-dark-3);font-size:0.85rem;text-align:center;padding:var(--space-lg);">正在加载 Mermaid 流程图…</div>
    </div>
    <p class="p06-mermaid-hint">← 可滑动浏览完整流程图 →</p>

    <!-- 最终图成果占位 -->
    <div class="p06-ph-wrap">
      <p class="p06-ba-label dark" style="max-width:900px;margin:0 auto var(--space-sm);">精修后最终图</p>
      <div style="max-width:900px;margin:0 auto;">
        <img src="${import.meta.env.BASE_URL}assets/m2/p06-case2-microplastic.png" alt="Microplastic migration methodology figure" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
      </div>
    </div>
  </div>
</section>

<!-- ══ S4 案例三：碳循环综述概念图（浅色） ═══════════════════════════════ -->
<section class="section-light" id="p06-s4">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">案例 03</p>
    <h2 class="section-title">案例三：碳循环综述概念图</h2>
    <p class="section-body" style="margin-bottom:var(--space-2xl);">
      综述文章框架图制作，4轮 CDTF 迭代，适合复杂信息可视化。从同心圆层级隐喻到出版级精修全流程。
    </p>

    <!-- 5步流程 -->
    <div class="p06-steps-grid cols-5">
      ${case3StepsHtml}
    </div>

    <!-- 最终成果占位 -->
    <div class="p06-ph-wrap">
      <p class="p06-ba-label light" style="max-width:1100px;margin:0 auto var(--space-sm);">最终成果</p>
      <div style="max-width:800px;margin:0 auto;">
        <img src="${import.meta.env.BASE_URL}assets/m2/p06-case3-carbon.png" alt="Carbon cycle review conceptual figure" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
      </div>
    </div>
  </div>
</section>

<!-- ══ S5 经验总结（深色） ════════════════════════════════════════════════ -->
<section class="section-dark" id="p06-s5">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">规律总结</p>
    <h2 class="section-title" style="color:var(--text-on-dark);">经验总结与效率提升</h2>
    <p class="section-body" style="color:var(--text-on-dark-2);margin-bottom:var(--space-2xl);">
      横向对比三个案例，提炼可迁移的工作流规律。
    </p>

    <!-- 汇总对比表 -->
    <div class="p06-summary-wrap">
      <table class="p06-summary-table">
        <thead>
          <tr>
            <th>对比维度</th>
            <th>案例一·水污染 GA</th>
            <th>案例二·微塑料迁移图</th>
            <th>案例三·碳循环概念图</th>
          </tr>
        </thead>
        <tbody>
          ${summaryRowsHtml}
        </tbody>
      </table>
    </div>

    <!-- 三条核心经验 -->
    <h3 style="font-size:var(--text-heading);font-weight:700;color:var(--text-on-dark);margin-bottom:var(--space-lg);text-align:center;">三条核心经验</h3>
    <div class="p06-takeaway-grid">
      ${takeawayCardsHtml}
    </div>
  </div>
</section>

<!-- ══ Footer CTA ══════════════════════════════════════════════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">06 / 06</p>
  <h2 class="page-footer-quote">科学的严谨与艺术的表达，并不矛盾</h2>
  <p class="page-footer-desc">恭喜完成 AI 辅助科研绘图模块！你现在已经掌握了从 Prompt 到出版级图像的完整工作流。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p06-prev-btn">← 伦理与合规</button>
    <button class="btn-ghost" id="p06-home-btn">返回模块首页</button>
    <button class="btn-primary" id="p06-next-btn">进入模块三 →</button>
  </div>
</section>

</div>`;
}

// ─── init ────────────────────────────────────────────────────────────────────

export function init() {
  // ── Hero GSAP timeline ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p06-hero .hero-eyebrow',
    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p06-hero .page-hero-title',
    { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p06-hero .page-hero-sub',
    { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p06-hero-tagline',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p06-quicknav',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p06-scroll-hint',
    { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // ── Hero quicknav ──
  document.querySelectorAll('#p06-quicknav .hero-quicknav__item').forEach(btn => {
    const fn = () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    btn.addEventListener('click', fn);
    _scrollHandlers.push({ el: btn, type: 'click', fn });
  });

  // ── S1 case card click → scroll to target ──
  document.querySelectorAll('.p06-case-card').forEach(card => {
    const scrollFn = () => {
      const target = document.querySelector(card.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    card.addEventListener('click', scrollFn);
    _scrollHandlers.push({ el: card, type: 'click', fn: scrollFn });

    // keyboard a11y
    const keyFn = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollFn(); } };
    card.addEventListener('keydown', keyFn);
    _scrollHandlers.push({ el: card, type: 'keydown', fn: keyFn });
  });

  // ── Mermaid for S3 ──
  initMermaid()
    .then(() => renderMermaid(CASE2_MERMAID, 'p06-mermaid-output'))
    .catch(e => console.warn('p06 mermaid failed:', e));

  // ── Scroll-triggered fadeIn — separate loops per group so delay resets per section ──
  // 案例卡片：不用 fadeIn（ScrollTrigger 在移动端可能不触发），直接 gsap.fromTo 确保可见
  document.querySelectorAll('.p06-case-card').forEach((el, i) =>
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.3 + i * 0.1, ease: 'power3.out' }
    )
  );
  document.querySelectorAll('.p06-step-card').forEach((el, i) =>
    fadeIn(el, { delay: (i % 4) * 0.08, y: 24, duration: 0.7 })
  );
  document.querySelectorAll('.p06-takeaway-card').forEach((el, i) =>
    fadeIn(el, { delay: i * 0.12, y: 24, duration: 0.7 })
  );

  // ── Footer nav buttons ──
  const prevBtn = document.getElementById('p06-prev-btn');
  const nextBtn = document.getElementById('p06-next-btn');

  if (prevBtn) {
    const prevFn = () => navigateTo('m2-p5');
    prevBtn.addEventListener('click', prevFn);
    _scrollHandlers.push({ el: prevBtn, type: 'click', fn: prevFn });
  }
  const homeBtn = document.getElementById('p06-home-btn');
  if (homeBtn) {
    const homeFn = () => navigateTo('m2-p1');
    homeBtn.addEventListener('click', homeFn);
    _scrollHandlers.push({ el: homeBtn, type: 'click', fn: homeFn });
  }
  if (nextBtn) {
    const nextFn = () => navigateTo('m3-p1');
    nextBtn.addEventListener('click', nextFn);
    _scrollHandlers.push({ el: nextBtn, type: 'click', fn: nextFn });
  }
}

// ─── destroy ─────────────────────────────────────────────────────────────────

export function destroy() {
  killAll();
  _scrollHandlers.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
  _scrollHandlers = [];
  _observers.forEach(obs => obs.disconnect());
  _observers = [];
  mermaidApi = null;
  mermaidReady = false;
}
