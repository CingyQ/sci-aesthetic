import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';

let _scrollHandlers = [];
let _observers = [];

// ─── 数据常量 ───────────────────────────────────────────────────────────────

const DIAGRAM_TYPES = [
  { id:'flowchart', label:'实验流程图', char:'线性', color:'#7EC8E3',
    desc:'展示实验步骤的顺序执行，适合方法部分。AI优势：快速生成标准化图标和箭头连接，自动对齐布局。' },
  { id:'roadmap', label:'技术路线图', char:'层级', color:'#95D5B2',
    desc:'展示研究框架和技术路线，适合摘要图。AI优势：层级布局复杂时自动优化视觉层次。' },
  { id:'mechanism', label:'机制示意图', char:'循环', color:'#B8B8E8',
    desc:'展示物质流或能量流的循环机制。AI优势：空间位置关系复杂，AI能生成符合直觉的视觉隐喻。' },
  { id:'pipeline', label:'数据分析管线', char:'分支', color:'#F0B27A',
    desc:'展示数据处理和分析流程，带条件判断。AI优势：Mermaid AI可直接从方法文本生成带判断节点的流程图。' },
  { id:'framework', label:'概念框架图', char:'网络', color:'#E07A7A',
    desc:'展示概念间关系，适合综述文章。AI优势：概念之间的非线性关系是AI最擅长的可视化类型。' },
];

const MERMAID_SCENES = [
  { label:'污水处理工艺', description:'城市污水处理厂完整工艺流程',
    code: `flowchart LR
  A[进水] --> B[格栅间]
  B --> C[沉砂池]
  C --> D[初沉池]
  D --> E[曝气池\\n活性污泥]
  E --> F[二沉池]
  F --> G{达标?}
  G -->|是| H[消毒池]
  G -->|否| E
  H --> I[排放]
  D --> J[污泥处理]
  F --> J
  J --> K[污泥消化]
  K --> L[脱水填埋]` },
  { label:'大气颗粒物来源解析', description:'PM2.5来源解析技术路线',
    code: `flowchart TD
  A[环境样品采集\\nPM2.5滤膜] --> B[化学组分分析]
  B --> C[离子色谱\\nSO4/NO3/NH4]
  B --> D[ICP-MS\\n重金属元素]
  B --> E[碳分析仪\\nOC/EC]
  C & D & E --> F[受体模型]
  F --> G[PMF模型\\nPositive Matrix Factorization]
  G --> H{源解析结果}
  H --> I[交通源 28%]
  H --> J[工业源 35%]
  H --> K[扬尘源 18%]
  H --> L[二次生成 19%]` },
  { label:'生态系统碳汇监测', description:'涡度相关法碳通量监测技术体系',
    code: `flowchart LR
  A[涡度相关塔] --> B[超声风速仪\\n三维风速]
  A --> C[CO2/H2O\\n红外分析仪]
  B & C --> D[10Hz原始数据]
  D --> E[EddyPro软件\\n数据质控]
  E --> F{质量标志}
  F -->|优| G[净生态系统\\n生产力NEP]
  F -->|差| H[插补处理\\nRF/ANN]
  H --> G
  G --> I[年度碳收支\\n±gC/m²/yr]
  I --> J[与遥感GPP\\n数据融合]` },
];

const COLLAB_STEPS = [
  { num:'01', title:'选择合适的图解类型', desc:'根据科学内容选择最适合的图解结构：线性过程→流程图，层级框架→路线图，物质循环→机制图，数据流→分析管线，概念关系→框架图。',
    tip:'错误的图解类型比没有图解更容易让读者困惑。先问"信息流向是什么"，再选图解类型。' },
  { num:'02', title:'提炼关键节点', desc:'从方法或综述文本中提取3-7个核心节点。太少（<3）无法说明过程，太多（>8）视觉混乱，记忆负担过重。',
    tip:'每个节点用一个"动词+名词"格式：不是"样品"，而是"采集样品"。' },
  { num:'03', title:'选工具+撰写Prompt', desc:'流程图优先用Mermaid AI（文字→可编辑图）；概念示意图用GPT Image 1.5/FLUX；需要SVG直接输出用Recraft V3。然后用CDTF格式撰写详细Prompt。',
    tip:'对于Mermaid，先让AI生成Mermaid代码而非图片，代码更容易迭代修改。' },
  { num:'04', title:'迭代精修', desc:'AI首稿通常需要2-3轮迭代：第一轮检查科学准确性，第二轮调整视觉层次，第三轮统一配色与期刊其他图表。',
    tip:'每次迭代只修改1-2个问题，避免"什么都修改"导致失去方向。' },
  { num:'05', title:'矢量化与标注', desc:'Mermaid生成SVG可直接编辑；位图图解需Image Trace后删除AI文字→用正确字体重新标注→检查所有科学术语和数值。',
    tip:'中文标注统一用 Noto Sans SC Regular，英文标注用 Helvetica Neue，避免字体混用。' },
];

const SHOWCASE_TABS = [
  { id:'show-flowchart', label:'实验流程图', color:'#7EC8E3',
    title:'污水处理工艺流程', subtitle:'Mermaid AI 生成 → SVG 导出 → Illustrator 标注优化',
    desc:'使用 Mermaid flowchart LR 语法，AI 一次性生成完整工艺流程。节点标注经人工核查，箭头连接符合实际水处理工艺顺序。最终导出 SVG 后在 Illustrator 中统一字体和线宽。' },
  { id:'show-roadmap', label:'技术路线图', color:'#95D5B2',
    title:'PM2.5来源解析技术路线', subtitle:'Mermaid TD 布局 → 层级优化',
    desc:'复杂的多分支技术路线通过 Mermaid flowchart TD 实现，&并行连接语法简洁表达了多输入汇聚到受体模型的流程。结果分支用不同颜色区分来源类别。' },
  { id:'show-mechanism', label:'机制示意图', color:'#B8B8E8',
    title:'生态系统碳通量监测体系', subtitle:'涡度相关法完整数据处理链路',
    desc:'从传感器采集到最终碳收支计算，涡度相关法数据处理链路跨越多个软件和算法节点。Mermaid 流程图清晰展示了质量控制的条件判断分支和最终数据融合环节。' },
  { id:'show-pipeline', label:'数据分析管线', color:'#F0B27A',
    title:'基因组数据分析管线', subtitle:'带条件判断的分析流程',
    desc:'数据分析管线的特点是包含多个质控检查点和条件分支。AI 能够从方法文本直接生成带有菱形判断节点的流程图，显著降低了从文字到图形的转化成本。' },
  { id:'show-framework', label:'概念框架图', color:'#E07A7A',
    title:'生态系统服务评估框架', subtitle:'概念关系网络可视化',
    desc:'综述文章中的概念框架图需要展示非线性的概念关系网络。AI 能够从概念描述文本中识别主要节点和关联关系，生成初始框架后再由作者调整重要性排序和视觉层级。' },
];

// ─── Mermaid 动态加载 ───────────────────────────────────────────────────────

let mermaidApi = null;
let mermaidReady = false;

async function initMermaid() {
  try {
    const mod = await import('https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs');
    mermaidApi = mod.default;
    mermaidApi.initialize({
      startOnLoad: false, theme: 'dark', securityLevel: 'loose',
      themeVariables: {
        primaryColor: '#2d2d4a', primaryTextColor: '#f5f5f7',
        lineColor: '#B8B8E8', background: '#1d1d1f'
      }
    });
    mermaidReady = true;
  } catch(e) { console.warn('Mermaid load failed:', e); }
}

async function renderMermaid(code, containerId) {
  if (!mermaidReady || !mermaidApi) {
    const c = document.getElementById(containerId);
    if (c) c.innerHTML = `<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${code}</pre>`;
    return;
  }
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const uid = 'mg-' + Math.random().toString(36).slice(2, 8);
    const { svg } = await mermaidApi.render(uid, code);
    container.innerHTML = svg;
    const svgEl = container.querySelector('svg');
    if (svgEl) {
      svgEl.style.display = 'block';
      svgEl.style.height = 'auto';
      // 不设 max-width：LR 流程图保持天然宽度，可横向滚动阅读；TD 流程图纵向可滚动
    }
  } catch(e) {
    // Use already-resolved reference instead of re-querying DOM
    if (container) container.innerHTML = `<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${code}</pre>`;
  }
}

// ─── D3 缩略图绘制 ──────────────────────────────────────────────────────────

function drawTypeThumbs() {
  const d3 = window.d3;
  if (!d3) return;

  const cards = document.querySelectorAll('.p04-type-card');
  DIAGRAM_TYPES.forEach((t, i) => {
    const container = cards[i]?.querySelector('.p04-type-thumb');
    if (!container) return;
    const c = t.color;
    const svg = d3.select(container).append('svg').attr('viewBox', '0 0 100 60').style('width', '100%').style('height', 'auto');
    svg.append('rect').attr('width', 100).attr('height', 60).attr('fill', 'none');

    if (t.id === 'flowchart') {
      [[8,20,22,18],[41,20,22,18],[74,20,22,18]].forEach(([x,y,w,h]) =>
        svg.append('rect').attr('x',x).attr('y',y).attr('width',w).attr('height',h).attr('rx',3).attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5)
      );
      [[30,29],[63,29]].forEach(([x,y]) =>
        svg.append('line').attr('x1',x).attr('y1',y).attr('x2',x+11).attr('y2',y).attr('stroke',c).attr('stroke-width',1.5)
      );
      [[41,26],[74,26]].forEach(([x,y]) =>
        svg.append('polygon').attr('points',`${x},${y} ${x-5},${y+3} ${x-5},${y-3}`).attr('fill',c)
      );
    } else if (t.id === 'roadmap') {
      svg.append('rect').attr('x',38).attr('y',5).attr('width',24).attr('height',15).attr('rx',3).attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5);
      [[8,38,22,15],[39,38,22,15],[70,38,22,15]].forEach(([x,y,w,h]) =>
        svg.append('rect').attr('x',x).attr('y',y).attr('width',w).attr('height',h).attr('rx',3).attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5)
      );
      [[50,20,19,38],[50,20,80,38],[50,20,50,38]].forEach(([x1,y1,x2,y2]) =>
        svg.append('line').attr('x1',x1).attr('y1',y1).attr('x2',x2).attr('y2',y2).attr('stroke',c).attr('stroke-width',1).attr('opacity',0.6)
      );
    } else if (t.id === 'mechanism') {
      [[50,15],[25,45],[75,45]].forEach(([cx,cy]) =>
        svg.append('circle').attr('cx',cx).attr('cy',cy).attr('r',12).attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5)
      );
      svg.append('path').attr('d','M 37 20 Q 25 30 30 40').attr('fill','none').attr('stroke',c).attr('stroke-width',1.5);
      svg.append('path').attr('d','M 63 20 Q 75 30 70 40').attr('fill','none').attr('stroke',c).attr('stroke-width',1.5);
      svg.append('path').attr('d','M 37 48 Q 50 58 63 48').attr('fill','none').attr('stroke',c).attr('stroke-width',1.5);
    } else if (t.id === 'pipeline') {
      svg.append('polygon').attr('points','50,5 80,30 50,55 20,30').attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5);
      svg.append('line').attr('x1',50).attr('y1',55).attr('x2',25).attr('y2',55).attr('stroke',c).attr('stroke-width',1.5);
      svg.append('line').attr('x1',50).attr('y1',55).attr('x2',75).attr('y2',55).attr('stroke',c).attr('stroke-width',1.5);
    } else if (t.id === 'framework') {
      const nodes = [[50,30],[20,15],[80,15],[20,48],[80,48]];
      nodes.slice(1).forEach(([x,y]) =>
        svg.append('line').attr('x1',50).attr('y1',30).attr('x2',x).attr('y2',y).attr('stroke',c).attr('stroke-width',1).attr('opacity',0.5)
      );
      nodes.forEach(([x,y],ni) =>
        svg.append('circle').attr('cx',x).attr('cy',y).attr('r',ni===0?10:7).attr('fill',c+'33').attr('stroke',c).attr('stroke-width',1.5)
      );
    }
  });
}

// ─── render ─────────────────────────────────────────────────────────────────

export function render() {
  const typeCardsHtml = DIAGRAM_TYPES.map((t, i) => `
    <div class="p04-type-card" data-type-id="${t.id}" tabindex="0" role="button" aria-label="${t.label}">
      <div class="p04-type-thumb" id="p04-thumb-${t.id}"></div>
      <div class="p04-type-char">${t.char}</div>
      <div class="p04-type-label">${t.label}</div>
    </div>
  `).join('');

  const sceneTabsHtml = MERMAID_SCENES.map((s, i) => `
    <button class="p04-scene-tab${i === 0 ? ' active' : ''}" data-scene="${i}">${s.label}</button>
  `).join('');

  const collabCardsHtml = COLLAB_STEPS.map(s => `
    <div class="p04-collab-card">
      <div class="p04-collab-num">${s.num}</div>
      <h3 class="p04-collab-title">${s.title}</h3>
      <p class="p04-collab-desc">${s.desc}</p>
      <div class="p04-collab-tip">${s.tip}</div>
    </div>
  `).join('');

  const showcaseTabsHtml = SHOWCASE_TABS.map((t, i) => `
    <button class="p04-showcase-tab${i === 0 ? ' active' : ''}" data-showcase="${t.id}" style="${i === 0 ? `border-color:${t.color};color:${t.color};background:${t.color}18;` : ''}">${t.label}</button>
  `).join('');

  const showcasePanelsHtml = SHOWCASE_TABS.map((t, i) => `
    <div class="p04-showcase-panel${i === 0 ? ' active' : ''}" id="${t.id}">
      <div style="background:var(--bg-dark-elevated);border-radius:var(--radius-lg);border:1px solid ${t.color}33;overflow:hidden;">
        <div style="padding:var(--space-lg);border-bottom:1px solid ${t.color}22;">
          <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${t.color};margin-bottom:6px;">${t.label}</p>
          <h3 style="font-family:var(--font-display);font-size:var(--text-heading);font-weight:700;color:var(--text-on-dark);margin-bottom:4px;">${t.title}</h3>
          <p style="font-size:0.8rem;color:var(--text-on-dark-3);">${t.subtitle}</p>
        </div>
        <div style="padding:var(--space-lg);">
          <div style="background:${t.color}0d;border-radius:var(--radius-md);padding:var(--space-lg);border:1px dashed ${t.color}44;display:flex;align-items:center;justify-content:center;min-height:160px;margin-bottom:var(--space-lg);">
            <div style="text-align:center;">
              <div style="font-size:3rem;margin-bottom:var(--space-sm);opacity:0.4;">${i===0?'⬡':i===1?'⬢':i===2?'◎':i===3?'◇':'◉'}</div>
              <p style="font-size:0.8rem;color:${t.color};font-weight:600;">示例图解区域</p>
              <p style="font-size:0.72rem;color:var(--text-on-dark-3);margin-top:4px;">实际项目中替换为导出的 SVG / PNG</p>
            </div>
          </div>
          <p style="font-size:0.88rem;color:var(--text-on-dark-2);line-height:1.75;">${t.desc}</p>
        </div>
      </div>
    </div>
  `).join('');

  return `<div class="page-scroll">
<style>
/* ── p04 hero ── */
.p04-hero { position:relative; overflow:hidden; align-items:center; }
.p04-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 50% at 30% 40%, rgba(184,184,232,0.2) 0%, transparent 65%); animation:p04-drift-a 13s ease-in-out infinite; pointer-events:none; }
.p04-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 45% 45% at 72% 60%, rgba(126,200,227,0.1) 0%, transparent 65%); animation:p04-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p04-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(28px,-20px)} }
@keyframes p04-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,25px)} }
.p04-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p04-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p04-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 diagram types ── */
.p04-type-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:var(--space-md); max-width:1100px; margin:0 auto; }
.p04-type-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-md); border:1px solid var(--border-light); cursor:pointer; transition:all 0.2s; }
.p04-type-card:hover { transform:translateY(-3px); box-shadow:var(--shadow-light); }
.p04-type-card.active { border-color:var(--module-2); background:rgba(184,184,232,0.05); }
.p04-type-thumb { width:100%; margin-bottom:var(--space-sm); }
.p04-type-char { font-size:0.7rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:var(--text-on-light-3,#aaa); margin-bottom:4px; }
.p04-type-label { font-size:0.9rem; font-weight:700; color:var(--text-on-light); margin-bottom:4px; }
.p04-type-detail { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-md); padding:var(--space-lg); border:1px solid var(--border-light); margin-top:var(--space-lg); display:none; max-width:1100px; margin-left:auto; margin-right:auto; }
.p04-type-detail.show { display:block; }
.p04-type-detail h3 { font-size:var(--text-heading); font-weight:700; margin-bottom:var(--space-sm); font-family:var(--font-display); }
.p04-type-detail p { color:var(--text-on-light-2); font-size:0.9rem; line-height:1.7; }

/* ── S2 Mermaid viewer ── */
.p04-scene-tabs { display:flex; gap:8px; margin-bottom:var(--space-lg); flex-wrap:wrap; }
.p04-scene-tab { padding:10px 24px; border-radius:var(--radius-full); border:1.5px solid rgba(184,184,232,0.3); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); }
.p04-scene-tab:hover { border-color:var(--module-2); color:var(--text-on-dark); }
.p04-scene-tab.active { background:rgba(184,184,232,0.12); border-color:var(--module-2); color:var(--module-2); }
.p04-mermaid-wrap { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); min-height:200px; max-height:600px; margin-bottom:var(--space-lg); overflow:auto; -webkit-overflow-scrolling:touch; }
.p04-code-wrap { background:var(--bg-dark); border-radius:var(--radius-md); border:1px solid var(--border-dark); position:relative; }
.p04-code-copy { position:absolute; top:var(--space-sm); right:var(--space-sm); padding:6px 14px; border-radius:var(--radius-full); background:rgba(184,184,232,0.15); color:var(--module-2); border:1px solid rgba(184,184,232,0.3); font-size:0.78rem; cursor:pointer; font-family:var(--font-heading); transition:all 0.2s; }
.p04-code-copy:hover { background:rgba(184,184,232,0.25); }
.p04-code-copy.copied { background:#22c55e20; color:#22c55e; border-color:#22c55e; }
.p04-code-pre { font-family:var(--font-code); font-size:0.78rem; color:var(--text-on-dark-2); line-height:1.8; padding:var(--space-lg); padding-right:80px; white-space:pre-wrap; word-wrap:break-word; margin:0; }

/* ── Mermaid scroll hint ── */
.p04-mermaid-hint { display:none; }
@media (max-width:768px) { .p04-mermaid-hint { display:block; text-align:center; font-size:var(--text-caption); color:var(--text-on-dark-3); margin-bottom:var(--space-sm); } }

/* ── S3 collab steps ── */
.p04-collab-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:var(--space-md); max-width:1200px; margin:0 auto; }
.p04-collab-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-light); }
.p04-collab-num { font-size:clamp(2rem,4vw,3.5rem); font-weight:700; color:var(--module-2); opacity:0.2; font-family:var(--font-display); line-height:1; margin-bottom:var(--space-sm); }
.p04-collab-title { font-size:var(--text-body); font-weight:700; color:var(--text-on-light); margin-bottom:var(--space-sm); }
.p04-collab-desc { font-size:0.85rem; color:var(--text-on-light-2); line-height:1.7; margin-bottom:var(--space-sm); }
.p04-collab-tip { background:rgba(184,184,232,0.08); border-left:3px solid var(--module-2); border-radius:var(--radius-sm); padding:10px 12px; font-size:0.78rem; color:var(--text-on-light-2); line-height:1.6; }

/* ── S4 showcase ── */
.p04-showcase-tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:var(--space-xl); }
.p04-showcase-tab { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid rgba(184,184,232,0.3); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); }
.p04-showcase-tab.active { background:rgba(184,184,232,0.12); border-color:var(--module-2); color:var(--module-2); }
.p04-showcase-panel { display:none; max-width:800px; margin:0 auto; }
.p04-showcase-panel.active { display:block; }

/* ── Responsive ── */
@media (max-width:900px) {
  .p04-type-grid { grid-template-columns:repeat(3,1fr); }
  .p04-collab-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:768px) {
  #p04-s1, #p04-s2, #p04-s3, #p04-s4 { scroll-margin-top:56px; }
  .p04-type-grid { grid-template-columns:repeat(2,1fr); }
  .p04-collab-grid { grid-template-columns:1fr; }
  .p04-mermaid-wrap { max-height:320px; }
}
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p04-hero" id="p04-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 04</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">AI 辅助科研图解设计</h1>
    <p class="page-hero-sub" style="opacity:0;">AI-Assisted Scientific Diagram Design</p>
    <p class="p04-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">从流程图到概念图，AI 重塑科研图解的创作方式</p>
    <nav class="hero-quicknav" id="p04-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p04-s1">图解类型</button>
      <button class="hero-quicknav__item" data-target="#p04-s2">Mermaid 实战</button>
      <button class="hero-quicknav__item" data-target="#p04-s3">协作策略</button>
      <button class="hero-quicknav__item" data-target="#p04-s4">案例展示</button>
    </nav>
    <div class="p04-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 图解类型学（浅色）── -->
<section class="section-light" id="p04-s1" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">五种核心图解结构</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-md);">科研图解类型学</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">不同的科学内容需要不同的图解结构。点击每种类型，了解其特点和 AI 辅助的最大优势。</p>
    </div>
    <div class="p04-type-grid" id="p04-type-grid">
      ${typeCardsHtml}
    </div>
    <div class="p04-type-detail" id="p04-type-detail">
      <h3 id="p04-detail-title"></h3>
      <p id="p04-detail-desc"></p>
    </div>
  </div>
</section>

<!-- ── S2 文生图解工具链（深色）── -->
<section class="section-dark" id="p04-s2" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1000px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">Mermaid Live Rendering</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-md);">文本即图解</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">选择一个真实科研场景，查看 AI 从文字描述直接生成的 Mermaid 流程图代码及渲染结果。</p>
    </div>
    <div class="p04-scene-tabs" id="p04-scene-tabs">
      ${sceneTabsHtml}
    </div>
    <div style="margin-bottom:var(--space-sm);">
      <p id="p04-scene-desc" style="font-size:0.85rem;color:var(--text-on-dark-3);margin-bottom:var(--space-md);"></p>
    </div>
    <div class="p04-mermaid-wrap" id="p04-mermaid-output">
      <div style="display:flex;align-items:center;justify-content:center;min-height:180px;color:var(--text-on-dark-3);font-size:0.85rem;">加载图解渲染引擎…</div>
    </div>
    <p class="p04-mermaid-hint">← 可滑动查看完整流程图 →</p>
    <div class="p04-code-wrap">
      <button class="p04-code-copy" id="p04-copy-btn">复制代码</button>
      <pre class="p04-code-pre" id="p04-code-display"></pre>
    </div>
  </div>
</section>

<!-- ── S3 AI+精修协作策略（浅色）── -->
<section class="section-light" id="p04-s3" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">五步协作工作流</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-md);">AI + 精修协作策略</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">从图解类型选择到最终发表，每一步都有明确的人机分工策略，避免常见失误。</p>
    </div>
    <div class="p04-collab-grid">
      ${collabCardsHtml}
    </div>
  </div>
</section>

<!-- ── S4 案例展示（深色）── -->
<section class="section-dark" id="p04-s4" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1000px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">真实科研图解案例</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-md);">案例展示库</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">不同图解类型的实际应用场景，每个案例展示 AI 辅助创作的完整制作思路。</p>
    </div>
    <div class="p04-showcase-tabs" id="p04-showcase-tabs">
      ${showcaseTabsHtml}
    </div>
    <div id="p04-showcase-container">
      ${showcasePanelsHtml}
    </div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">04 / 06</p>
  <h2 class="page-footer-quote">科研图解的语言，是科学家与读者之间最短的距离</h2>
  <p class="page-footer-desc">掌握图解设计策略后，接下来了解 AI 辅助绘图的伦理边界与学术规范。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p04-prev-btn">← AI输出后处理</button>
    <button class="btn-primary" id="p04-next-btn">伦理与合规 →</button>
  </div>
</section>

</div>`;
}

// ─── init ────────────────────────────────────────────────────────────────────

let _currentScene = 0;

export function init() {
  // Hero 入场动画
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p04-hero .hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p04-hero .page-hero-title', { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p04-hero .page-hero-sub', { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p04-hero-tagline', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p04-quicknav', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p04-scroll-hint', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // 快捷导航滚动
  document.querySelectorAll('#p04-quicknav .hero-quicknav__item').forEach(btn => {
    const handler = (e) => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
    btn.addEventListener('click', handler);
    _scrollHandlers.push({ el: btn, type: 'click', fn: handler });
  });

  // ── S1 类型卡片点击 ──────────────────────────────────────────────────────
  drawTypeThumbs();

  const detailEl = document.getElementById('p04-type-detail');
  const detailTitle = document.getElementById('p04-detail-title');
  const detailDesc = document.getElementById('p04-detail-desc');

  document.querySelectorAll('.p04-type-card').forEach((card, i) => {
    const handler = () => {
      const t = DIAGRAM_TYPES[i];
      const isActive = card.classList.contains('active');

      document.querySelectorAll('.p04-type-card').forEach(c => c.classList.remove('active'));

      if (isActive) {
        detailEl.classList.remove('show');
        return;
      }

      card.classList.add('active');
      detailTitle.textContent = t.label;
      detailEl.style.borderColor = t.color;
      detailTitle.style.color = t.color;
      detailDesc.textContent = t.desc;
      detailEl.classList.add('show');

      // 平滑滚动到详情
      setTimeout(() => detailEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
    };

    const keyHandler = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', keyHandler);
    _scrollHandlers.push({ el: card, type: 'click', fn: handler });
    _scrollHandlers.push({ el: card, type: 'keydown', fn: keyHandler });
  });

  // ScrollTrigger fadeIn for S1 cards
  const obs1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.p04-type-card');
        cards.forEach((c, i) => {
          gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out' });
        });
        obs1.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  const typeGrid = document.getElementById('p04-type-grid');
  if (typeGrid) obs1.observe(typeGrid);
  _observers.push(obs1);

  // ── S2 Mermaid ───────────────────────────────────────────────────────────
  const setScene = async (idx) => {
    _currentScene = idx;
    const scene = MERMAID_SCENES[idx];

    // Update tabs
    document.querySelectorAll('.p04-scene-tab').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });

    // Update description
    const descEl = document.getElementById('p04-scene-desc');
    if (descEl) descEl.textContent = scene.description;

    // Update code display
    const codeEl = document.getElementById('p04-code-display');
    if (codeEl) codeEl.textContent = scene.code;

    // Render mermaid
    await renderMermaid(scene.code, 'p04-mermaid-output');
  };

  // Scene tabs
  document.querySelectorAll('.p04-scene-tab').forEach((tab, i) => {
    const handler = () => setScene(i).catch(e => console.warn('p04 scene switch failed:', e));
    tab.addEventListener('click', handler);
    _scrollHandlers.push({ el: tab, type: 'click', fn: handler });
  });

  // Copy button
  const copyBtn = document.getElementById('p04-copy-btn');
  if (copyBtn) {
    const copyHandler = async () => {
      const code = MERMAID_SCENES[_currentScene].code;
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = code;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      copyBtn.textContent = '已复制！';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = '复制代码';
        copyBtn.classList.remove('copied');
      }, 2000);
    };
    copyBtn.addEventListener('click', copyHandler);
    _scrollHandlers.push({ el: copyBtn, type: 'click', fn: copyHandler });
  }

  // Init mermaid and render first scene
  initMermaid().then(() => setScene(0)).catch(e => console.warn('p04 init failed:', e));

  // ── S3 collab cards scroll animation ─────────────────────────────────────
  const obs2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.p04-collab-card');
        cards.forEach((c, i) => {
          gsap.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.1, ease: 'power3.out' });
        });
        obs2.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  const collabGrid = document.querySelector('.p04-collab-grid');
  if (collabGrid) obs2.observe(collabGrid);
  _observers.push(obs2);

  // ── S4 showcase tabs ──────────────────────────────────────────────────────
  document.querySelectorAll('.p04-showcase-tab').forEach((tab, i) => {
    const handler = () => {
      document.querySelectorAll('.p04-showcase-tab').forEach((t, ti) => {
        const tData = SHOWCASE_TABS[ti];
        t.classList.toggle('active', ti === i);
        if (ti === i) {
          t.style.borderColor = tData.color;
          t.style.color = tData.color;
          t.style.background = tData.color + '18';
        } else {
          t.style.borderColor = '';
          t.style.color = '';
          t.style.background = '';
        }
      });
      document.querySelectorAll('.p04-showcase-panel').forEach((p, pi) => {
        p.classList.toggle('active', pi === i);
      });
    };
    tab.addEventListener('click', handler);
    _scrollHandlers.push({ el: tab, type: 'click', fn: handler });
  });

  // ── Section heading scroll animations ────────────────────────────────────
  document.querySelectorAll('#p04-s1 h2, #p04-s2 h2, #p04-s3 h2, #p04-s4 h2').forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
    _observers.push(obs);
  });

  // ── Footer buttons ────────────────────────────────────────────────────────
  const prevBtn = document.getElementById('p04-prev-btn');
  const nextBtn = document.getElementById('p04-next-btn');

  if (prevBtn) {
    const handler = () => navigateTo('m2-p3');
    prevBtn.addEventListener('click', handler);
    _scrollHandlers.push({ el: prevBtn, type: 'click', fn: handler });
  }
  if (nextBtn) {
    const handler = () => navigateTo('m2-p5');
    nextBtn.addEventListener('click', handler);
    _scrollHandlers.push({ el: nextBtn, type: 'click', fn: handler });
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
