import{k as U,g as D,f as B,s as Z}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as V}from"./index-BTO2Mx9C.js";import{s as P,l as g}from"./transform-ChPGlSkf.js";import{b as k,r as q,p as X}from"./band-DqVyTAN-.js";import{b as K}from"./bin-D7xP0THh.js";import{m as S}from"./max-DBeXZoyG.js";import{s as tt}from"./ramp-CDwHjghK.js";import{h as at}from"./index-DOot-1bs.js";import{a as u,b as v,c as rt}from"./axis-FVV8vvN_.js";import{q as R}from"./quad-nLXVu5ve.js";import{a as H}from"./area-BnRBWshW.js";import{c as z}from"./catmullRom-Dm0ttBHj.js";import{l as A}from"./line-DQLATXjo.js";import{Y as et}from"./YlOrRd-_z79I1LS.js";import{p as Y}from"./pie-DaGM7Udv.js";import{a as F}from"./arc-BpqQfc-p.js";import{i as nt,b as ot}from"./index-DzMNnvuW.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";import"./colors-Cc3OSVma.js";const Q={id:"root",question:"你的数据类型是什么？",children:[{id:"categorical",label:"分类数据",desc:"名义 / 有序类别",question:"你想表达什么关系？",children:[{id:"cat-compare",label:"比较大小",result:{name:"柱状图 / 条形图",en:"Bar Chart",icon:"▊",chartId:"bar",reason:"最直观地比较各类别数值，视觉映射清晰。避免在这里使用饼图。"}},{id:"cat-compose",label:"展示构成",result:{name:"堆叠柱状图",en:"Stacked Bar Chart",icon:"▤",chartId:"stacked-bar",reason:"展示部分与整体关系，且可比较多个时间点。优于饼图。"}},{id:"cat-rank",label:"按大小排列",result:{name:"水平条形图",en:"Horizontal Bar Chart",icon:"▬",chartId:"hbar",reason:"标签空间充足，长类别名称不会重叠，支持快速视觉排名。"}}]},{id:"numeric",label:"数值数据",desc:"连续 / 离散数值",question:"变量数量是多少？",children:[{id:"one-var",label:"单变量",question:"关注分布形态还是组间比较？",children:[{id:"one-dist",label:"分布形态",result:{name:"直方图 / 密度图",en:"Histogram / Density Plot",icon:"▲",chartId:"histogram",reason:"展示数据分布形状、中心位置和扩散程度。密度图适合叠加多组。"}},{id:"one-group",label:"组间比较",result:{name:"箱线图 / 小提琴图",en:"Boxplot / Violin Plot",icon:"⊠",chartId:"boxplot",reason:"箱线图简洁展示中位数和异常值；小提琴图还能显示分布形状。"}}]},{id:"two-var",label:"两个变量",result:{name:"散点图",en:"Scatter Plot",icon:"⋯",chartId:"scatter",reason:"展示两变量间的相关关系和分布规律，可叠加回归线和置信区间。"}},{id:"multi-var",label:"多个变量",result:{name:"热力图 / 气泡图",en:"Heatmap / Bubble Chart",icon:"▦",chartId:"heatmap",reason:"热力图适合矩阵型数据（如相关矩阵）；气泡图可同时编码三个维度。"}}]},{id:"timeseries",label:"时间序列",desc:"随时间变化的数据",question:"序列数量是多少？",children:[{id:"ts-single",label:"单条序列",result:{name:"折线图",en:"Line Chart",icon:"╱",chartId:"line",reason:"最清晰地展示单一趋势，强调变化速率。避免使用柱状图表达连续趋势。"}},{id:"ts-multi",label:"多条序列",result:{name:"多线图 / 面积图",en:"Multi-line / Area Chart",icon:"⌗",chartId:"area",reason:"多线对比趋势；面积图在强调累积量时效果更好（3条以内）。"}}]},{id:"proportion",label:"比例 / 构成",desc:"占比 / 百分比",question:"类别数量是多少？",children:[{id:"prop-few",label:"2–4 个类别",result:{name:"堆叠条形图（首选）",en:"Stacked Bar Chart",icon:"▤",chartId:"stacked-bar",reason:"比饼图更易读，尤其当各比例接近时差异更明显。"}},{id:"prop-many",label:"5+ 个类别",result:{name:"水平条形图",en:"Horizontal Bar Chart",icon:"▬",chartId:"hbar",reason:"饼图超过 5 个扇区后极难阅读，条形图长度编码更精确。"}}]}]},O=[{id:"comparison",label:"比较",color:"#7EC8E3",charts:[{id:"bar",name:"柱状图",en:"Bar Chart",use:"比较各类别的数值大小，最常用图表之一",avoid:"类别超过 15 个时，改用条形图",draw:pt},{id:"hbar",name:"水平条形图",en:"Horizontal Bar",use:"类别名称较长、需排名对比时",avoid:"数据有时间序列时",draw:ft},{id:"radar",name:"雷达图",en:"Radar Chart",use:"多指标综合评估，适合 5–8 个维度",avoid:"指标超过 8 个时，或需要精确读值时",draw:mt},{id:"lollipop",name:"棒棒糖图",en:"Lollipop Chart",use:"类别较多的比较，视觉比柱状图更轻盈",avoid:"强调总量而非差异时",draw:ht}]},{id:"distribution",label:"分布",color:"#95D5B2",charts:[{id:"histogram",name:"直方图",en:"Histogram",use:"展示连续数据的频率分布形状",avoid:"n < 30 的小样本，结果不可靠",draw:gt},{id:"density",name:"密度图",en:"Density Plot",use:"平滑展示分布，方便叠加多组比较",avoid:"数据量极小时，曲线无意义",draw:xt},{id:"boxplot",name:"箱线图",en:"Box Plot",use:"快速比较多组分布与异常值",avoid:"只有少数数据点时（改用抖点图）",draw:yt},{id:"violin",name:"小提琴图",en:"Violin Plot",use:"结合箱线图和密度图，信息最丰富",avoid:"n < 50 时分布形状无统计意义",draw:ut}]},{id:"relationship",label:"关系",color:"#B8B8E8",charts:[{id:"scatter",name:"散点图",en:"Scatter Plot",use:"两变量相关性，可叠加回归线和置信区间",avoid:"n > 10000 时需降采样或用热力图",draw:vt},{id:"heatmap",name:"热力图",en:"Heatmap",use:"矩阵数据、相关矩阵、基因表达谱",avoid:"未经色盲友好配色测试时",draw:bt},{id:"bubble",name:"气泡图",en:"Bubble Chart",use:"同时展示 x、y、大小三个维度",avoid:"气泡过多时互相遮挡，难以辨读",draw:wt},{id:"sankey",name:"桑基图",en:"Sankey Diagram",use:"展示流量或比例在不同阶段的流向",avoid:"流向关系单一时，普通图表更清晰",draw:kt}]},{id:"composition",label:"组成",color:"#F0B27A",charts:[{id:"stacked-bar",name:"堆叠柱状图",en:"Stacked Bar",use:"部分与整体，可跨时间点对比构成变化",avoid:"中间分段难以独立对比精确值",draw:$t},{id:"donut",name:"圆环图",en:"Donut Chart",use:"部分与整体，中心可放总量或关键数字",avoid:"类别超过 5 个时可读性急剧下降",draw:At},{id:"treemap",name:"树状图",en:"Treemap",use:"层级构成，面积编码比例关系",avoid:"需要精确比较大小时（面积感知不精确）",draw:Et},{id:"waffle",name:"华夫图",en:"Waffle Chart",use:"直观展示百分比，每格代表固定单位",avoid:"比例需要高精度时（最小粒度受格数限制）",draw:Bt}]},{id:"trend",label:"趋势",color:"#E07A7A",charts:[{id:"line",name:"折线图",en:"Line Chart",use:"时间序列趋势，最常用、最清晰",avoid:"数据点极少（<4）时改用散点图",draw:zt},{id:"area",name:"面积图",en:"Area Chart",use:"强调累积量和趋势，视觉冲击力更强",avoid:"多系列时互相遮挡（限制在 3 条以内）",draw:Mt},{id:"ridgeline",name:"山脊图",en:"Ridgeline Plot",use:"多组时间序列分布对比，节省空间",avoid:"组数超过 10 时过于拥挤",draw:Ct},{id:"step",name:"阶梯图",en:"Step Chart",use:"离散时间点的状态突变（如存货、政策变化）",avoid:"变化连续时（改用折线图）",draw:St}]}],N=[{id:"pie-many",tag:"饼图",tagColor:"#E07A7A",title:"饼图：类别过多",problem:"7 个扇区，最小的几乎不可见，颜色无法区分，读者无从比较大小",solution:"水平条形图：按大小排序，长度感知精确，标签空间充足",drawBad:_t,drawGood:Pt},{id:"yaxis-truncate",tag:"柱状图",tagColor:"#F0B27A",title:"截断 Y 轴：放大微小差异",problem:"Y 轴从 95 开始，让仅 2% 的差异看起来像 400%，严重误导读者",solution:"Y 轴从 0 开始：差异真实呈现，读者可正确评估数据比例",drawBad:qt,drawGood:It},{id:"dual-axis",tag:"双Y轴",tagColor:"#B8B8E8",title:"双 Y 轴：制造虚假相关",problem:'两个无关变量共享 X 轴，走势"完美重合"，暗示因果关系却可能完全偶然',solution:"拆成两张独立图表，各自用完整的 Y 轴，不强加视觉关联",drawBad:Ht,drawGood:Dt},{id:"scatter-line",tag:"散点图",tagColor:"#7EC8E3",title:"散点图强行连线",problem:"将离散测量点用折线连接，暗示两点之间存在连续数据，实际并不存在",solution:"保留散点，叠加回归线：诚实表达数据的稀疏性和不确定区间",drawBad:Lt,drawGood:Tt},{id:"3d-pie",tag:"3D图表",tagColor:"#95D5B2",title:"3D 图表：透视扭曲感知",problem:"3D 透视使前方扇区看起来比实际更大，视觉占比与真实占比严重不符",solution:"平面 2D 圆环图：面积分配客观，减少类别时才考虑使用",drawBad:Gt,drawGood:Wt},{id:"line-category",tag:"折线图",tagColor:"#F0D264",title:"折线图连接无序类别",problem:'用折线连接"北京、上海、广州..."等无时间顺序的城市，暗示不存在的趋势',solution:'柱状图：无序类别之间没有"中间值"，折线的斜率无意义',drawBad:jt,drawGood:Rt}];let b={treePath:[],activeGroup:"comparison",resizeHandlers:[]};function ca(){return`
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
@keyframes p5-glow-a {
  0%,100% { transform:translate(0,0) scale(1); opacity:0.8; }
  33% { transform:translate(-3%,2%) scale(1.05); opacity:1; }
  66% { transform:translate(4%,-1%) scale(0.95); opacity:0.6; }
}
@keyframes p5-glow-b {
  0%,100% { transform:translate(0,0); opacity:0.4; }
  50% { transform:translate(5%,4%); opacity:0.8; }
}
.p5-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 60% 50% at 45% 38%, rgba(126,200,227,0.11) 0%, transparent 65%);
  pointer-events:none;
  animation:p5-glow-a 13s ease-in-out infinite;
}
.p5-hero::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 35% 40% at 75% 62%, rgba(184,184,232,0.07) 0%, transparent 60%);
  pointer-events:none;
  animation:p5-glow-b 16s ease-in-out infinite;
}
.p5-eyebrow {
  /* 使用全局 .hero-eyebrow 基础样式 */
}
.p5-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-0.02em; line-height:1.1; color:var(--text-on-dark);
}
.p5-hero-sub {
  font-family:var(--font-heading); font-size:clamp(1rem,2vw,1.4rem);
  font-weight:300; color:var(--text-on-dark); opacity:0.5;
  max-width:600px; line-height:1.4; text-align:center; margin-top:var(--space-xs);
}
.p5-hero-tagline {
  font-family:var(--font-body); font-size:var(--text-body);
  color:var(--text-on-dark-2); max-width:540px; line-height:1.8;
  margin-top:var(--space-sm); text-align:center;
}
.p5-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p5-float 2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p5-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

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

/* ── 误用合集 ── */
.p5-misuse-section {
  background:var(--bg-light-alt); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-misuse-section .p5-sec-desc { color:var(--text-on-light-2); }
.p5-misuse-wrap { max-width:var(--w-full); margin:0 auto; }
.p5-misuse-intro {
  background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-lg);
  padding:var(--space-md) var(--space-lg); display:flex; gap:var(--space-md);
  align-items:flex-start; margin-bottom:var(--space-xl);
  box-shadow:var(--shadow-sm);
}
.p5-misuse-intro-icon { font-size:1.6rem; flex-shrink:0; margin-top:2px; }
.p5-misuse-intro-text { font-size:0.95rem; line-height:1.7; color:var(--text-on-light-2); }
.p5-misuse-intro-text strong { color:var(--text-on-light); font-weight:700; }
.p5-misuse-grid { display:flex; flex-direction:column; gap:var(--space-xl); }
.p5-case {
  background:white; border-radius:var(--radius-lg); overflow:hidden;
  border:1px solid var(--border-light); box-shadow:var(--shadow-md);
}
.p5-case-hdr {
  padding:14px 24px; border-bottom:1px solid var(--border-light);
  display:flex; align-items:center; gap:12px;
}
.p5-case-tag {
  padding:3px 10px; border-radius:var(--radius-full);
  font-size:0.72rem; font-weight:700; letter-spacing:0.05em; flex-shrink:0;
  color:white;
}
.p5-case-title { font-family:var(--font-display); font-size:1.1rem; font-weight:700; }
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

/* footer nav uses global btn-primary / btn-ghost */
/* footer uses global .page-footer-cta */

/* ── 响应式 ── */
@media (max-width:900px) {
  .p5-browser { flex-direction:column; }
  .p5-chart-list { flex:none; width:100%; }
  .p5-preview-sticky { position:static; }
}
@media (max-width:768px) {
  .p5-dt-section,.p5-gallery-section,.p5-misuse-section { padding:var(--space-xl) var(--space-sm); }
  .p5-opts { flex-direction:column; align-items:stretch; }
  .p5-opt-btn { width:100%; justify-content:center; }
  .p5-case-body { flex-direction:column; }
  .p5-case-side:first-child { border-right:none; border-bottom:1px solid var(--border-light); }
  /* footer nav uses global .page-footer-nav */
  .p5-res-actions { flex-direction:column; align-items:center; }
  .p5-group-tabs { gap:6px; }
  .p5-gtab { padding:8px 14px; font-size:0.8rem; }
}
</style>

<!-- HERO -->
<section id="p5-hero" class="p5-hero section-dark section-hero-full" style="scroll-margin-top:56px;">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p5-eyebrow" id="p5-eyebrow" style="opacity:0;">Module 01 / Page 05</p>
    <h1 class="page-hero-title p5-hero-title" id="p5-hero-title" style="color:var(--text-on-dark);opacity:0;">图表选择指南</h1>
    <p class="page-hero-sub p5-hero-sub" id="p5-hero-sub" style="opacity:0;">Chart Selection Guide</p>
    <p class="p5-hero-tagline" id="p5-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">
      面对数据时，如何快速选对图表？从决策树到完整图表库，帮你科学决策。
    </p>
    <nav class="hero-quicknav" id="p5-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p5-decision">交互式决策树</button>
      <button class="hero-quicknav__item" data-target="#p5-gallery">图表类型全览</button>
      <button class="hero-quicknav__item" data-target="#p5-misuse">误用案例合集</button>
    </nav>
    <div class="p5-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
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
      ${O.map(r=>`
        <button class="p5-gtab" data-group="${r.id}" style="--tc:${r.color}">
          <span class="tdot"></span>${r.label}（${r.charts.length}）
        </button>
      `).join("")}
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

<!-- 误用合集 -->
<section id="p5-misuse" class="p5-misuse-section" style="scroll-margin-top:56px;">
  <div class="p5-misuse-wrap">
    <div class="p5-sec-hdr" id="p5-misuse-hdr">
      <h2 class="p5-sec-title">图表误用合集</h2>
      <p class="p5-sec-desc">6 种科研图表中最高频的误用模式，每个附有 D3 对比演示与修正建议。</p>
    </div>
    <div class="p5-misuse-intro" id="p5-misuse-intro">
      <div class="p5-misuse-intro-icon">🔍</div>
      <div class="p5-misuse-intro-text">
        <strong>图表误用的核心问题</strong>不是图表本身，而是图表与数据、意图不匹配。
        同一种图表，在一个场景里是最佳选择，在另一个场景里就会严重误导读者。
        识别这些模式，能让你的图表既诚实又有说服力。
      </div>
    </div>
    <div class="p5-misuse-grid" id="p5-misuse-grid"></div>
  </div>
</section>

<!-- Footer CTA -->
<section id="p5-footer" class="page-footer-cta" style="scroll-margin-top:56px;">
  <p class="page-footer-num">05 / 10</p>
  <h2 class="page-footer-quote">选好图表，让数据开口说话</h2>
  <p class="page-footer-desc">掌握了图表选择的原则，接下来学习 ggplot2 的图层语法——精准控制图表每一个视觉细节。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p5-prev-btn">← 色彩与阅读无障碍</button>
    <button class="btn-primary" id="p5-next-btn">ggplot2 图层语法 →</button>
  </div>
</section>

</div>`}function da(){const r=document.getElementById("p5-prev-btn"),n=document.getElementById("p5-next-btn");r&&r.addEventListener("click",()=>V("m1-p4")),n&&n.addEventListener("click",()=>V("m1-p6"));const t=D.timeline({delay:.2});t.fromTo("#p5-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),t.fromTo("#p5-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),t.fromTo("#p5-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo("#p5-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#p5-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),t.fromTo(".p5-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p5-quicknav .hero-quicknav__item").forEach(a=>{a.addEventListener("click",()=>{document.querySelector(a.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),B("#p5-dt-hdr",{y:40,stagger:0}),B("#p5-gallery-hdr",{y:40,stagger:0}),B("#p5-misuse-hdr",{y:40,stagger:0}),B("#p5-footer-title",{y:30,stagger:0}),B("#p5-footer-desc",{y:20,stagger:0}),B("#p5-misuse-intro",{y:30,stagger:0}),it(),ct(),dt()}function it(){b.treePath=[],L(),I()}function J(r){let n=Q;for(const t of r)n=(n.children||[]).find(a=>a.id===t)||n;return n}function L(){const r=J(b.treePath),n=document.getElementById("p5-q-area");if(n)if(r.result){const t=r.result;n.innerHTML=`
      <div class="p5-res-card">
        <div class="p5-res-icon">${t.icon}</div>
        <div class="p5-res-name">${t.name}</div>
        <div class="p5-res-en">${t.en}</div>
        <p class="p5-res-reason">${t.reason}</p>
        <div class="p5-res-actions">
          <button class="p5-btn-reset" id="p5-reset">重新选择</button>
          <button class="p5-btn-gallery" id="p5-go-gallery">在图表库中查看 →</button>
        </div>
      </div>`,document.getElementById("p5-reset")?.addEventListener("click",()=>{b.treePath=[],T(),I(),G()}),document.getElementById("p5-go-gallery")?.addEventListener("click",()=>{document.getElementById("p5-gallery")?.scrollIntoView({behavior:"smooth"}),t.chartId&&setTimeout(()=>lt(t.chartId),600)})}else n.innerHTML=`
      <div class="p5-q-card">
        <div class="p5-q-step">问题 ${b.treePath.length+1}</div>
        <div class="p5-q-text">${r.question}</div>
        <div class="p5-opts">
          ${(r.children||[]).map(t=>`
            <button class="p5-opt-btn" data-id="${t.id}">
              <span>${t.label}</span>
              ${t.desc?`<span class="opt-sub">${t.desc}</span>`:""}
            </button>`).join("")}
        </div>
      </div>`,n.querySelectorAll(".p5-opt-btn").forEach(t=>{t.addEventListener("click",()=>{b.treePath.push(t.dataset.id),T(),I(),G()})})}function T(){const r=document.querySelector(".p5-q-card, .p5-res-card");r?D.to(r,{opacity:0,x:-30,duration:.2,ease:"power2.in",onComplete:()=>{L(),D.fromTo(".p5-q-card, .p5-res-card",{opacity:0,x:30},{opacity:1,x:0,duration:.35,ease:"power2.out"})}}):L()}function G(){const r=document.getElementById("p5-bc");if(!r)return;if(!b.treePath.length){r.innerHTML="";return}let n="";for(let t=0;t<b.treePath.length;t++){const o=(J(b.treePath.slice(0,t)).children||[]).find(d=>d.id===b.treePath[t]);t>0&&(n+='<span class="p5-bc-sep">›</span>');const e=JSON.stringify(b.treePath.slice(0,t));n+=`<span class="p5-bc-item" data-snap='${e}'>${o?.label||b.treePath[t]}</span>`}r.innerHTML=n,r.querySelectorAll(".p5-bc-item").forEach(t=>{t.addEventListener("click",()=>{b.treePath=JSON.parse(t.dataset.snap),T(),I(),G()})})}function I(){const r=document.getElementById("p5-tree-viz");if(!r)return;const n=window.innerWidth<768,t=Math.min(r.clientWidth||700,760),a=n?180:240;r.innerHTML="";const o=P(r).append("svg").attr("viewBox",`0 0 ${t} ${a}`).attr("class","p5-tree-svg").attr("preserveAspectRatio","xMidYMid meet");o.append("rect").attr("width",t).attr("height",a).attr("fill","#f0f0f2").attr("rx",12);const e=["开始",...st()],d=n?4:6,s=e.slice(-d),i=s.length,l=n?40:60,p=i>1?(t-2*l)/(i-1):0,c=s.map((f,h)=>({label:f.length>6?f.slice(0,6)+"…":f,x:i===1?t/2:l+h*p,y:a/2}));for(let f=0;f<c.length-1;f++){const h=c[f],m=c[f+1],y=o.append("path").attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2).attr("d",`M${h.x},${h.y} C${(h.x+m.x)/2},${h.y} ${(h.x+m.x)/2},${m.y} ${m.x},${m.y}`),E=y.node().getTotalLength();y.attr("stroke-dasharray",E).attr("stroke-dashoffset",E).transition().duration(500).ease(R).attr("stroke-dashoffset",0)}c.forEach((f,h)=>{const m=h===c.length-1,y=o.append("g").attr("transform",`translate(${f.x},${f.y})`);y.append("circle").attr("r",0).attr("fill",m?"#7EC8E3":"#1d1d1f").attr("stroke","#7EC8E3").attr("stroke-width",2).transition().delay(h*100).duration(350).ease(ot.overshoot(1.5)).attr("r",m?13:9),y.append("text").attr("text-anchor","middle").attr("dy",n?24:28).attr("font-size",n?"9px":"10px").attr("fill","#555").attr("font-family","var(--font-heading)").text(f.label).style("opacity",0).transition().delay(h*100+200).duration(250).style("opacity",1)})}function st(){const r=[];let n=Q;for(const t of b.treePath){const a=(n.children||[]).find(o=>o.id===t);a&&(r.push(a.label),n=a)}return n.result&&r.push(n.result.name.split("（")[0].split(" / ")[0]),r}function lt(r){const n=O.find(e=>e.charts.some(d=>d.id===r));if(!n)return;W(n.id);const t=document.getElementById("p5-chart-list"),a=t?.querySelector(`[data-cid="${r}"]`);if(!a)return;t.querySelectorAll(".p5-ci").forEach(e=>e.classList.remove("active")),a.classList.add("active");const o=n.charts.find(e=>e.id===r);o&&j(o,n.color),a.scrollIntoView({behavior:"smooth",block:"nearest"}),a.style.transition="box-shadow 0.3s",a.style.boxShadow=`0 0 0 3px ${n.color}`,setTimeout(()=>{a.style.boxShadow=""},1600)}function ct(){document.querySelectorAll(".p5-gtab").forEach(r=>{r.addEventListener("click",()=>W(r.dataset.group))}),W("comparison"),Z("#p5-gallery .p5-browser",{scale:.97})}function W(r){b.activeGroup=r;const n=O.find(a=>a.id===r);if(!n)return;document.querySelectorAll(".p5-gtab").forEach(a=>a.classList.toggle("active",a.dataset.group===r));const t=document.getElementById("p5-chart-list");t&&(t.innerHTML=n.charts.map(a=>`
    <div class="p5-ci" data-cid="${a.id}" style="--ic:${n.color}">
      <div class="p5-ci-name">${a.name}</div>
      <div class="p5-ci-en">${a.en}</div>
    </div>`).join(""),t.querySelectorAll(".p5-ci").forEach(a=>{a.addEventListener("click",()=>{t.querySelectorAll(".p5-ci").forEach(e=>e.classList.remove("active")),a.classList.add("active");const o=n.charts.find(e=>e.id===a.dataset.cid);o&&j(o,n.color)})}),t.querySelector(".p5-ci")?.classList.add("active"),n.charts[0]&&j(n.charts[0],n.color))}function j(r,n){const t=document.getElementById("p5-preview-svg"),a=document.getElementById("p5-preview-info");if(!t||!a)return;const o=P(t);o.selectAll("*").remove(),o.append("rect").attr("width",400).attr("height",260).attr("fill","#111418").attr("rx",8),r.draw&&r.draw(o,n),a.innerHTML=`
    <div class="p5-pv-name">${r.name}</div>
    <div class="p5-pv-en">${r.en}</div>
    <div class="p5-pv-row">
      <div class="p5-pv-block"><div class="p5-pv-label">适用场景</div><div class="p5-pv-text">${r.use}</div></div>
      <div class="p5-pv-block"><div class="p5-pv-label">避免使用</div><div class="p5-pv-text">${r.avoid}</div></div>
    </div>`}function dt(){const r=document.getElementById("p5-misuse-grid");r&&(r.innerHTML=N.map((n,t)=>`
    <div class="p5-case" id="p5-case-${t}">
      <div class="p5-case-hdr">
        <span class="p5-case-tag" style="background:${n.tagColor}">${n.tag}</span>
        <div class="p5-case-title">${n.title}</div>
      </div>
      <div class="p5-case-body">
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-bad">✗ 误用示例</div>
          <svg id="pc-bad-${t}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-bad">⚠ ${n.problem}</div>
        </div>
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-good">✓ 推荐替代</div>
          <svg id="pc-good-${t}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-good">✓ ${n.solution}</div>
        </div>
      </div>
    </div>`).join(""),N.forEach((n,t)=>{n.drawBad(P(`#pc-bad-${t}`)),n.drawGood(P(`#pc-good-${t}`)),B(`#p5-case-${t}`,{y:40,stagger:0})}))}function x(r){r.selectAll(".domain").attr("stroke","#3a3a3a"),r.selectAll(".tick line").attr("stroke","#3a3a3a"),r.selectAll(".tick text").attr("fill","#888").attr("font-size","10px").attr("font-family","var(--font-heading)")}function pt(r,n){const t=[{c:"A",v:82},{c:"B",v:56},{c:"C",v:67},{c:"D",v:43},{c:"E",v:91}],a={t:30,r:30,b:48,l:48},o=400-a.l-a.r,e=260-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=k().domain(t.map(l=>l.c)).range([0,o]).padding(.35),i=g().domain([0,100]).range([e,0]);d.append("g").attr("transform",`translate(0,${e})`).call(u(s).tickSize(0)).call(x),d.append("g").call(v(i).ticks(4)).call(x),d.selectAll("rect").data(t).join("rect").attr("x",l=>s(l.c)).attr("width",s.bandwidth()).attr("y",e).attr("height",0).attr("fill",n).attr("opacity",.85).attr("rx",3).transition().duration(600).delay((l,p)=>p*80).ease(R).attr("y",l=>i(l.v)).attr("height",l=>e-i(l.v))}function ft(r,n){const t=[{c:"Group A",v:78},{c:"Group B",v:54},{c:"Group C",v:92},{c:"Group D",v:36},{c:"Group E",v:65}],a={t:20,r:30,b:28,l:64},o=400-a.l-a.r,e=260-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=k().domain(t.map(l=>l.c)).range([0,e]).padding(.3),i=g().domain([0,100]).range([0,o]);d.append("g").call(v(s).tickSize(0)).call(x),d.selectAll("rect").data(t).join("rect").attr("y",l=>s(l.c)).attr("height",s.bandwidth()).attr("x",0).attr("width",0).attr("fill",n).attr("opacity",.85).attr("rx",3).transition().duration(600).delay((l,p)=>p*80).attr("width",l=>i(l.v))}function mt(r,n){const t=["样本量","精确度","召回率","F1分数","速度"],a=[.8,.7,.85,.75,.6],o=200,e=130,d=85,s=t.length,i=2*Math.PI/s,l=(c,f)=>({x:o+f*Math.sin(c*i),y:e-f*Math.cos(c*i)});[.25,.5,.75,1].forEach(c=>{r.append("polygon").attr("points",t.map((f,h)=>{const m=l(h,d*c);return`${m.x},${m.y}`}).join(" ")).attr("fill","none").attr("stroke","#333").attr("stroke-width",1)}),t.forEach((c,f)=>{const h=l(f,d),m=l(f,d+13);r.append("line").attr("x1",o).attr("y1",e).attr("x2",h.x).attr("y2",h.y).attr("stroke","#333").attr("stroke-width",1),r.append("text").attr("x",m.x).attr("y",m.y).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text(t[f])});const p=a.map((c,f)=>l(f,d*c));r.append("polygon").attr("points",p.map(c=>`${c.x},${c.y}`).join(" ")).attr("fill",n).attr("opacity",.25).attr("stroke",n).attr("stroke-width",2),p.forEach(c=>r.append("circle").attr("cx",c.x).attr("cy",c.y).attr("r",4).attr("fill",n).attr("stroke","#111418").attr("stroke-width",2))}function ht(r,n){const t=[{c:"A",v:72},{c:"B",v:45},{c:"C",v:88},{c:"D",v:31},{c:"E",v:64}],a={t:30,r:30,b:48,l:48},o=400-a.l-a.r,e=260-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=k().domain(t.map(l=>l.c)).range([0,o]).padding(.4),i=g().domain([0,100]).range([e,0]);d.append("g").attr("transform",`translate(0,${e})`).call(u(s).tickSize(0)).call(x),d.append("g").call(v(i).ticks(4)).call(x),d.selectAll(".stem").data(t).join("line").attr("x1",l=>s(l.c)+s.bandwidth()/2).attr("x2",l=>s(l.c)+s.bandwidth()/2).attr("y1",e).attr("y2",e).attr("stroke",n).attr("stroke-width",2).attr("opacity",.6).transition().duration(500).delay((l,p)=>p*80).attr("y2",l=>i(l.v)),d.selectAll(".candy").data(t).join("circle").attr("cx",l=>s(l.c)+s.bandwidth()/2).attr("cy",e).attr("r",0).attr("fill",n).transition().duration(400).delay((l,p)=>p*80+300).attr("cy",l=>i(l.v)).attr("r",7)}function gt(r,n){let t=42;const a=()=>(t=(t*9301+49297)%233280,t/233280),o=Array.from({length:80},()=>{let f=a(),h=a();return Math.sqrt(-2*Math.log(f))*Math.cos(2*Math.PI*h)*15+60}),e={t:28,r:28,b:48,l:48},d=400-e.l-e.r,s=260-e.t-e.b,i=r.append("g").attr("transform",`translate(${e.l},${e.t})`),l=g().domain([0,100]).range([0,d]),p=K().domain(l.domain()).thresholds(l.ticks(12))(o),c=g().domain([0,S(p,f=>f.length)]).nice().range([s,0]);i.append("g").attr("transform",`translate(0,${s})`).call(u(l).ticks(6)).call(x),i.append("g").call(v(c).ticks(4)).call(x),i.selectAll("rect").data(p).join("rect").attr("x",f=>l(f.x0)+1).attr("width",f=>Math.max(0,l(f.x1)-l(f.x0)-2)).attr("y",s).attr("height",0).attr("fill",n).attr("opacity",.82).attr("rx",2).transition().duration(600).delay((f,h)=>h*25).attr("y",f=>c(f.length)).attr("height",f=>s-c(f.length))}function xt(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=g().domain([0,100]).range([0,a]),s=(m,y,E)=>Math.exp(-.5*((m-y)/E)**2)/(E*Math.sqrt(2*Math.PI)),i=q(0,101,2).map(m=>({x:m,y:s(m,42,12)})),l=q(0,101,2).map(m=>({x:m,y:s(m,68,10)})),p=Math.max(S(i,m=>m.y),S(l,m=>m.y)),c=g().domain([0,p*1.1]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(d).ticks(6)).call(x);const f=H().x(m=>d(m.x)).y0(o).y1(m=>c(m.y)).curve(z),h=A().x(m=>d(m.x)).y(m=>c(m.y)).curve(z);[[i,n],[l,"#95D5B2"]].forEach(([m,y])=>{e.append("path").datum(m).attr("fill",y).attr("opacity",.2).attr("d",f),e.append("path").datum(m).attr("fill","none").attr("stroke",y).attr("stroke-width",2.5).attr("d",h)})}function yt(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=["Control","Treat A","Treat B"],s=[{min:20,q1:35,med:52,q3:68,max:85},{min:35,q1:55,med:70,q3:80,max:95},{min:15,q1:28,med:42,q3:58,max:72}],i=k().domain(d).range([0,a]).padding(.4),l=g().domain([0,100]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(i).tickSize(0)).call(x),e.append("g").call(v(l).ticks(4)).call(x),s.forEach((p,c)=>{const f=i(d[c])+i.bandwidth()/2,h=i.bandwidth(),m=[n,"#95D5B2","#B8B8E8"][c];e.append("line").attr("x1",f).attr("x2",f).attr("y1",l(p.min)).attr("y2",l(p.max)).attr("stroke",m).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),e.append("rect").attr("x",i(d[c])).attr("width",h).attr("y",l(p.q3)).attr("height",l(p.q1)-l(p.q3)).attr("fill",m).attr("opacity",.3).attr("stroke",m).attr("stroke-width",1.5).attr("rx",2),e.append("line").attr("x1",i(d[c])).attr("x2",i(d[c])+h).attr("y1",l(p.med)).attr("y2",l(p.med)).attr("stroke",m).attr("stroke-width",2.5)})}function ut(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=["Group A","Group B","Group C"],s=[{mu:50,sigma:15},{mu:72,sigma:10},{mu:35,sigma:20}],i=k().domain(d).range([0,a]).padding(.35),l=[n,"#95D5B2","#B8B8E8"];e.append("g").attr("transform",`translate(0,${o})`).call(u(i).tickSize(0)).call(x),s.forEach((p,c)=>{const f=i(d[c])+i.bandwidth()/2,h=i.bandwidth()/2*.8,m=$=>Math.exp(-.5*(($-p.mu)/p.sigma)**2)/(p.sigma*Math.sqrt(2*Math.PI)),y=q(5,96,2),E=S(y,$=>m($)),_=y.map($=>({y:$,d:m($)/E*h})),M=g().domain([0,100]).range([o,0]),C=_.map($=>[f+$.d,M($.y)]),w=[..._].reverse().map($=>[f-$.d,M($.y)]);e.append("polygon").attr("points",[...C,...w].map($=>$.join(",")).join(" ")).attr("fill",l[c]).attr("opacity",.4).attr("stroke",l[c]).attr("stroke-width",1.5),e.append("line").attr("x1",f-h*.5).attr("x2",f+h*.5).attr("y1",M(p.mu)).attr("y2",M(p.mu)).attr("stroke",l[c]).attr("stroke-width",2)})}function vt(r,n){let t=42;const a=()=>(t=(t*9301+49297)%233280,t/233280),o=Array.from({length:40},()=>{const c=a()*80+10;return{x:c,y:c*.6+a()*28+5}}),e={t:28,r:28,b:48,l:48},d=400-e.l-e.r,s=260-e.t-e.b,i=r.append("g").attr("transform",`translate(${e.l},${e.t})`),l=g().domain([0,100]).range([0,d]),p=g().domain([0,100]).range([s,0]);i.append("g").attr("transform",`translate(0,${s})`).call(u(l).ticks(5)).call(x),i.append("g").call(v(p).ticks(4)).call(x),i.append("line").attr("x1",l(0)).attr("y1",p(8)).attr("x2",l(100)).attr("y2",p(68)).attr("stroke",n).attr("stroke-width",1.5).attr("opacity",.4).attr("stroke-dasharray","5,3"),i.selectAll("circle").data(o).join("circle").attr("cx",c=>l(c.x)).attr("cy",c=>p(c.y)).attr("r",0).attr("fill",n).attr("opacity",.7).transition().duration(400).delay((c,f)=>f*12).attr("r",4)}function bt(r,n){const t=["Gene A","Gene B","Gene C","Gene D","Gene E"],a=["Ctrl","T1","T2","T3","T4"],o=[.2,.8,.5,.3,.9,.7,.1,.6,.4,.85,.6,.2,.9,.5,.3,.8,.4,.7,.15,.6,.3,.6,.2,.8,.55],e={t:28,r:72,b:48,l:60},d=400-e.l-e.r,s=260-e.t-e.b,i=r.append("g").attr("transform",`translate(${e.l},${e.t})`),l=k().domain(a).range([0,d]).padding(.05),p=k().domain(t).range([0,s]).padding(.05),c=tt(et).domain([0,1]);i.append("g").attr("transform",`translate(0,${s})`).call(u(l).tickSize(0)).call(x),i.append("g").call(v(p).tickSize(0)).call(x),t.forEach((f,h)=>a.forEach((m,y)=>{i.append("rect").attr("x",l(m)).attr("y",p(f)).attr("width",l.bandwidth()).attr("height",p.bandwidth()).attr("fill",c(o[h*a.length+y])).attr("rx",2).attr("opacity",0).transition().delay((h*a.length+y)*25).duration(250).attr("opacity",1)}))}function wt(r,n){const t=[{x:25,y:60,r:18},{x:55,y:30,r:28},{x:70,y:75,r:22},{x:40,y:48,r:14},{x:80,y:20,r:35}],a={t:28,r:28,b:48,l:48},o=400-a.l-a.r,e=260-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=g().domain([0,100]).range([0,o]),i=g().domain([0,100]).range([e,0]);d.append("g").attr("transform",`translate(0,${e})`).call(u(s).ticks(5)).call(x),d.append("g").call(v(i).ticks(4)).call(x);const l=[n,"#95D5B2","#B8B8E8","#F0B27A","#E07A7A"];d.selectAll("circle").data(t).join("circle").attr("cx",p=>s(p.x)).attr("cy",p=>i(p.y)).attr("r",0).attr("fill",(p,c)=>l[c]).attr("opacity",.6).attr("stroke",(p,c)=>l[c]).attr("stroke-width",1.5).transition().duration(500).delay((p,c)=>c*80).attr("r",p=>p.r)}function kt(r,n){[{sx:55,sy1:70,sy2:130,tx:190,ty1:50,ty2:110,c:n},{sx:55,sy1:130,sy2:190,tx:190,ty1:130,ty2:190,c:"#95D5B2"},{sx:205,sy1:50,sy2:90,tx:340,ty1:60,ty2:100,c:n},{sx:205,sy1:90,sy2:110,tx:340,ty1:110,ty2:140,c:"#B8B8E8"},{sx:205,sy1:130,sy2:190,tx:340,ty1:150,ty2:200,c:"#95D5B2"}].forEach(a=>{r.append("path").attr("d",`M${a.sx},${a.sy1} C${(a.sx+a.tx)/2},${a.sy1} ${(a.sx+a.tx)/2},${a.ty1} ${a.tx},${a.ty1} L${a.tx},${a.ty2} C${(a.sx+a.tx)/2},${a.ty2} ${(a.sx+a.tx)/2},${a.sy2} ${a.sx},${a.sy2} Z`).attr("fill",a.c).attr("opacity",.35)}),[[40,70,120,"来源"],[190,50,60,"路径A"],[190,130,60,"路径B"],[340,60,40,"结果1"],[340,110,30,"结果2"],[340,150,50,"结果3"]].forEach(([a,o,e,d])=>{r.append("rect").attr("x",a).attr("y",o).attr("width",14).attr("height",e).attr("fill",n).attr("opacity",.85).attr("rx",2),r.append("text").attr("x",a+18).attr("y",o+e/2).attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text(d)})}function $t(r,n){const t=[{c:"Q1",a:30,b:40,cc:30},{c:"Q2",a:35,b:35,cc:30},{c:"Q3",a:25,b:45,cc:30},{c:"Q4",a:40,b:30,cc:30}],a=[n,"#95D5B2","#B8B8E8"],o={t:28,r:28,b:48,l:48},e=400-o.l-o.r,d=260-o.t-o.b,s=r.append("g").attr("transform",`translate(${o.l},${o.t})`),i=k().domain(t.map(p=>p.c)).range([0,e]).padding(.35),l=g().domain([0,100]).range([d,0]);s.append("g").attr("transform",`translate(0,${d})`).call(u(i).tickSize(0)).call(x),s.append("g").call(v(l).ticks(4)).call(x),t.forEach(p=>{let c=0;[[p.a,0],[p.b,1],[p.cc,2]].forEach(([f,h])=>{s.append("rect").attr("x",i(p.c)).attr("width",i.bandwidth()).attr("y",l(c+f)).attr("height",d-l(f)).attr("fill",a[h]).attr("opacity",.85).attr("rx",1),c+=f})})}function At(r,n){const t=[42,28,18,12],a=[n,"#95D5B2","#B8B8E8","#F0B27A"],o=Y().value(s=>s).sort(null),e=F().innerRadius(55).outerRadius(90),d=r.append("g").attr("transform","translate(200,130)");o(t).forEach((s,i)=>{d.append("path").datum(s).attr("fill",a[i]).attr("opacity",.88).attr("d",e).attr("stroke","#111418").attr("stroke-width",2)}),d.append("text").attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","14px").attr("font-family","var(--font-heading)").attr("font-weight","600").text("42%")}function Et(r,n){const t=at({children:[{v:35},{v:25},{v:20},{v:12},{v:5},{v:3}]}).sum(o=>o.v);nt().size([400,260]).padding(3)(t);const a=[n,"#95D5B2","#B8B8E8","#F0B27A","#E07A7A","#F0D264"];t.leaves().forEach((o,e)=>{r.append("rect").attr("x",o.x0).attr("y",o.y0).attr("width",o.x1-o.x0).attr("height",o.y1-o.y0).attr("fill",a[e%a.length]).attr("opacity",.85).attr("rx",3),o.x1-o.x0>38&&r.append("text").attr("x",(o.x0+o.x1)/2).attr("y",(o.y0+o.y1)/2).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#1d1d1f").attr("font-size","11px").attr("font-weight","600").text(o.data.v+"%")})}function Bt(r,n){for(let i=0;i<100;i++){const l=i%10,p=Math.floor(i/10);r.append("rect").attr("x",101.5+l*20).attr("y",31.5+p*20).attr("width",17).attr("height",17).attr("fill",i<63?n:"#2a2a2a").attr("rx",2).attr("opacity",0).transition().delay(i*7).duration(180).attr("opacity",1)}r.append("text").attr("x",200).attr("y",240).attr("text-anchor","middle").attr("fill","#888").attr("font-size","11px").attr("font-family","var(--font-heading)").text("63% — 每格代表 1%")}function zt(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],s=[{v:[42,55,61,48,72,68,85,90],c:n},{v:[30,35,38,42,50,55,60,65],c:"#95D5B2"}],i=k().domain(d).range([0,a]).padding(.1),l=g().domain([20,100]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(i).tickSize(0)).call(x),e.append("g").call(v(l).ticks(4)).call(x);const p=A().x((c,f)=>i(d[f])+i.bandwidth()/2).y(c=>l(c)).curve(z);s.forEach(c=>{const f=e.append("path").datum(c.v).attr("fill","none").attr("stroke",c.c).attr("stroke-width",2.5).attr("d",p),h=f.node().getTotalLength();f.attr("stroke-dasharray",h).attr("stroke-dashoffset",h).transition().duration(900).ease(R).attr("stroke-dashoffset",0)})}function Mt(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=[42,55,61,48,72,68,85,90,78,95],s=g().domain([0,d.length-1]).range([0,a]),i=g().domain([30,100]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(s).ticks(5)).call(x),e.append("g").call(v(i).ticks(4)).call(x);const l=H().x((h,m)=>s(m)).y0(o).y1(h=>i(h)).curve(z),p=A().x((h,m)=>s(m)).y(h=>i(h)).curve(z);e.append("path").datum(d).attr("fill",n).attr("opacity",.2).attr("d",l);const c=e.append("path").datum(d).attr("fill","none").attr("stroke",n).attr("stroke-width",2.5).attr("d",p),f=c.node().getTotalLength();c.attr("stroke-dasharray",f).attr("stroke-dashoffset",f).transition().duration(900).attr("stroke-dashoffset",0)}function Ct(r,n){const t=["Group A","Group B","Group C","Group D"],a=[{mu:40},{mu:55},{mu:70},{mu:48}],o=[n,"#95D5B2","#B8B8E8","#F0B27A"],e={t:28,r:28,b:28,l:60},d=400-e.l-e.r,s=(260-e.t-e.b)/t.length*1.35,i=r.append("g").attr("transform",`translate(${e.l},${e.t})`),l=g().domain([0,100]).range([0,d]);t.forEach((p,c)=>{const f=c*(s*.72),h=w=>Math.exp(-.5*((w-a[c].mu)/14)**2),m=q(0,101,2).map(w=>({v:w,d:h(w)})),y=S(m,w=>w.d),E=g().domain([0,y]).range([0,-s]),_=H().x(w=>l(w.v)).y0(0).y1(w=>E(w.d)),M=A().x(w=>l(w.v)).y(w=>E(w.d)),C=i.append("g").attr("transform",`translate(0,${f+s})`);C.append("path").datum(m).attr("fill",o[c]).attr("opacity",.3).attr("d",_),C.append("path").datum(m).attr("fill","none").attr("stroke",o[c]).attr("stroke-width",2).attr("d",M),C.append("text").attr("x",-6).attr("y",-s/2).attr("text-anchor","end").attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").text(p)})}function St(r,n){const t={t:28,r:28,b:48,l:48},a=400-t.l-t.r,o=260-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=[{x:0,y:30},{x:2,y:30},{x:2,y:55},{x:4,y:55},{x:4,y:42},{x:6,y:42},{x:6,y:70},{x:8,y:70},{x:8,y:58},{x:10,y:58}],s=g().domain([0,10]).range([0,a]),i=g().domain([20,80]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(s).ticks(5)).call(x),e.append("g").call(v(i).ticks(4)).call(x);const l=H().x(h=>s(h.x)).y0(o).y1(h=>i(h.y)),p=A().x(h=>s(h.x)).y(h=>i(h.y));e.append("path").datum(d).attr("fill",n).attr("opacity",.15).attr("d",l);const c=e.append("path").datum(d).attr("fill","none").attr("stroke",n).attr("stroke-width",2.5).attr("d",p),f=c.node().getTotalLength();c.attr("stroke-dasharray",f).attr("stroke-dashoffset",f).transition().duration(900).attr("stroke-dashoffset",0)}function _t(r){const n=[{l:"方法A",v:28},{l:"方法B",v:22},{l:"方法C",v:18},{l:"方法D",v:14},{l:"方法E",v:10},{l:"方法F",v:5},{l:"其他",v:3}],t=["#e03030","#f08030","#c8b820","#50c050","#3090d0","#8050d0","#d050a0"];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a=Y().value(d=>d.v).sort(null),o=F().innerRadius(0).outerRadius(68),e=r.append("g").attr("transform","translate(100,100)");a(n).forEach((d,s)=>e.append("path").datum(d).attr("fill",t[s]).attr("d",o).attr("stroke","#fff").attr("stroke-width",1)),r.append("text").attr("x",100).attr("y",185).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("7个扇区，颜色无法区分")}function Pt(r){const n=[{l:"方法A",v:28},{l:"方法B",v:22},{l:"方法C",v:18},{l:"方法D",v:14},{l:"方法E",v:10},{l:"方法F",v:5},{l:"其他",v:3}];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const t=[...n].sort((e,d)=>d.v-e.v),a=k().domain(t.map(e=>e.l)).range([12,188]).padding(.22),o=g().domain([0,30]).range([58,265]);t.forEach(e=>{r.append("rect").attr("x",58).attr("y",a(e.l)).attr("height",a.bandwidth()).attr("width",o(e.v)-58).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3),r.append("text").attr("x",54).attr("y",a(e.l)+a.bandwidth()/2).attr("text-anchor","end").attr("dominant-baseline","middle").attr("fill","#444").attr("font-size","9px").attr("font-family","var(--font-heading)").text(e.l),r.append("text").attr("x",o(e.v)+3).attr("y",a(e.l)+a.bandwidth()/2).attr("dominant-baseline","middle").attr("fill","#444").attr("font-size","9px").text(e.v+"%")}),r.append("text").attr("x",160).attr("y",197).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("水平条形图：大小一目了然")}function qt(r){const n=[{l:"A组",v:96.2},{l:"B组",v:97.1},{l:"C组",v:98.4},{l:"D组",v:96.8}];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const t={t:22,r:20,b:32,l:48},a=280-t.l-t.r,o=200-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=k().domain(n.map(i=>i.l)).range([0,a]).padding(.35),s=g().domain([95.5,99]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(d).tickSize(0)).call(i=>{i.select(".domain").attr("stroke","#ccc"),i.selectAll("text").attr("fill","#555").attr("font-size","10px")}),e.append("g").call(v(s).ticks(4)).call(i=>{i.select(".domain").attr("stroke","#ccc"),i.selectAll("text").attr("fill","#555").attr("font-size","9px")}),e.selectAll("rect").data(n).join("rect").attr("x",i=>d(i.l)).attr("width",d.bandwidth()).attr("y",i=>s(i.v)).attr("height",i=>o-s(i.v)).attr("fill","#E07A7A").attr("opacity",.85).attr("rx",3),e.append("text").attr("x",-10).attr("y",o+2).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9px").attr("font-weight","700").text("≠0"),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("Y轴从95.5开始，差异被放大10×")}function It(r){const n=[{l:"A组",v:96.2},{l:"B组",v:97.1},{l:"C组",v:98.4},{l:"D组",v:96.8}];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const t={t:22,r:20,b:32,l:48},a=280-t.l-t.r,o=200-t.t-t.b,e=r.append("g").attr("transform",`translate(${t.l},${t.t})`),d=k().domain(n.map(i=>i.l)).range([0,a]).padding(.35),s=g().domain([0,100]).range([o,0]);e.append("g").attr("transform",`translate(0,${o})`).call(u(d).tickSize(0)).call(i=>{i.select(".domain").attr("stroke","#ccc"),i.selectAll("text").attr("fill","#555").attr("font-size","10px")}),e.append("g").call(v(s).ticks(5)).call(i=>{i.select(".domain").attr("stroke","#ccc"),i.selectAll("text").attr("fill","#555").attr("font-size","9px")}),e.selectAll("rect").data(n).join("rect").attr("x",i=>d(i.l)).attr("width",d.bandwidth()).attr("y",i=>s(i.v)).attr("height",i=>o-s(i.v)).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("Y轴从0开始：差异真实呈现")}function Ht(r){r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const n={t:22,r:44,b:32,l:44},t=280-n.l-n.r,a=200-n.t-n.b,o=r.append("g").attr("transform",`translate(${n.l},${n.t})`),e=["1月","3月","5月","7月","9月","11月"],d=[120,180,310,420,380,150],s=[3,4,6,8,7,3],i=k().domain(e).range([0,t]).padding(.1),l=g().domain([0,500]).range([a,0]),p=g().domain([0,10]).range([a,0]);o.append("g").attr("transform",`translate(0,${a})`).call(u(i).tickSize(0)).call(h=>{h.select(".domain").attr("stroke","#ccc"),h.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),o.append("g").call(v(l).ticks(4)).call(h=>{h.select(".domain").attr("stroke","#E07A7A"),h.selectAll("text").attr("fill","#E07A7A").attr("font-size","8.5px")}),o.append("g").attr("transform",`translate(${t},0)`).call(rt(p).ticks(4)).call(h=>{h.select(".domain").attr("stroke","#B8B8E8"),h.selectAll("text").attr("fill","#B8B8E8").attr("font-size","8.5px")});const c=A().x((h,m)=>i(e[m])+i.bandwidth()/2).y(h=>l(h));o.append("path").datum(d).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2.5).attr("d",c);const f=A().x((h,m)=>i(e[m])+i.bandwidth()/2).y(h=>p(h));o.append("path").datum(s).attr("fill","none").attr("stroke","#B8B8E8").attr("stroke-width",2.5).attr("d",f),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("双轴：冰淇淋与溺水？错觉相关！")}function Dt(r){r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const n=["1月","3月","5月","7月","9月","11月"],t=[120,180,310,420,380,150],a=[3,4,6,8,7,3],o=r.append("g").attr("transform","translate(44,10)"),e=192,d=72,s=k().domain(n).range([0,e]).padding(.1),i=g().domain([0,500]).range([d,0]);o.append("g").attr("transform",`translate(0,${d})`).call(u(s).tickSize(0)).call(m=>{m.select(".domain").remove(),m.selectAll("text").attr("fill","#888").attr("font-size","7.5px")}),o.append("g").call(v(i).ticks(3)).call(m=>{m.select(".domain").remove(),m.selectAll("text").attr("fill","#888").attr("font-size","7.5px")});const l=A().x((m,y)=>s(n[y])+s.bandwidth()/2).y(m=>i(m)).curve(z);o.append("path").datum(t).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2).attr("d",l),r.append("text").attr("x",44).attr("y",90).attr("fill","#666").attr("font-size","9px").attr("font-family","var(--font-heading)").text("冰淇淋销量（万支）"),r.append("line").attr("x1",44).attr("y1",96).attr("x2",236).attr("y2",96).attr("stroke","#e0e0e0").attr("stroke-width",1).attr("stroke-dasharray","3,2");const p=r.append("g").attr("transform","translate(44,100)"),c=62,f=g().domain([0,10]).range([c,0]);p.append("g").attr("transform",`translate(0,${c})`).call(u(s).tickSize(0)).call(m=>{m.select(".domain").remove(),m.selectAll("text").attr("fill","#888").attr("font-size","7.5px")}),p.append("g").call(v(f).ticks(3)).call(m=>{m.select(".domain").remove(),m.selectAll("text").attr("fill","#888").attr("font-size","7.5px")});const h=A().x((m,y)=>s(n[y])+s.bandwidth()/2).y(m=>f(m)).curve(z);p.append("path").datum(a).attr("fill","none").attr("stroke","#B8B8E8").attr("stroke-width",2).attr("d",h),r.append("text").attr("x",44).attr("y",170).attr("fill","#666").attr("font-size","9px").attr("font-family","var(--font-heading)").text("溺水人数（起）"),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("独立图表：各变量诚实呈现")}function Lt(r){let n=7;const t=()=>(n=(n*9301+49297)%233280,n/233280),a=Array.from({length:10},(c,f)=>({x:f*10+5+t()*6-3,y:f*5+20+t()*25-12}));a.sort((c,f)=>c.x-f.x),r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const o={t:20,r:20,b:32,l:40},e=280-o.l-o.r,d=200-o.t-o.b,s=r.append("g").attr("transform",`translate(${o.l},${o.t})`),i=g().domain([0,100]).range([0,e]),l=g().domain([0,80]).range([d,0]);s.append("g").attr("transform",`translate(0,${d})`).call(u(i).ticks(5)).call(c=>{c.select(".domain").attr("stroke","#ccc"),c.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),s.append("g").call(v(l).ticks(4)).call(c=>{c.select(".domain").attr("stroke","#ccc"),c.selectAll("text").attr("fill","#555").attr("font-size","8.5px")});const p=A().x(c=>i(c.x)).y(c=>l(c.y));s.append("path").datum(a).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",1.5).attr("d",p),s.selectAll("circle").data(a).join("circle").attr("cx",c=>i(c.x)).attr("cy",c=>l(c.y)).attr("r",5).attr("fill","#E07A7A").attr("stroke","#fff").attr("stroke-width",1.5),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("连线暗示两点间存在数据")}function Tt(r){let n=7;const t=()=>(n=(n*9301+49297)%233280,n/233280),a=Array.from({length:10},(p,c)=>({x:c*10+5+t()*6-3,y:c*5+20+t()*25-12}));r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const o={t:20,r:20,b:32,l:40},e=280-o.l-o.r,d=200-o.t-o.b,s=r.append("g").attr("transform",`translate(${o.l},${o.t})`),i=g().domain([0,100]).range([0,e]),l=g().domain([0,80]).range([d,0]);s.append("g").attr("transform",`translate(0,${d})`).call(u(i).ticks(5)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),s.append("g").call(v(l).ticks(4)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),s.append("line").attr("x1",i(0)).attr("y1",l(20)).attr("x2",i(100)).attr("y2",l(70)).attr("stroke","#7EC8E3").attr("stroke-width",2).attr("opacity",.6).attr("stroke-dasharray","5,3"),s.selectAll("circle").data(a).join("circle").attr("cx",p=>i(p.x)).attr("cy",p=>l(p.y)).attr("r",5).attr("fill","#7EC8E3").attr("stroke","#fff").attr("stroke-width",1.5),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("散点+回归线：诚实展示数据")}function Gt(r){r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const n=[{startAngle:-Math.PI/2,endAngle:-Math.PI/2+2*Math.PI*.35,color:"#E07A7A",label:"35%"},{startAngle:-Math.PI/2+2*Math.PI*.35,endAngle:-Math.PI/2+2*Math.PI*.65,color:"#7EC8E3",label:"30%"},{startAngle:-Math.PI/2+2*Math.PI*.65,endAngle:-Math.PI/2+2*Math.PI*.85,color:"#95D5B2",label:"20%"},{startAngle:-Math.PI/2+2*Math.PI*.85,endAngle:3*Math.PI/2,color:"#F0B27A",label:"15%"}],t=120,a=95,o=80,e=38,d=30;n.forEach(s=>{const i=(s.startAngle+s.endAngle)/2;if(Math.sin(i)>-.2){const l=t+o*Math.cos(s.startAngle),p=a+e*Math.sin(s.startAngle),c=t+o*Math.cos(s.endAngle),f=a+e*Math.sin(s.endAngle),h=s.endAngle-s.startAngle>Math.PI?1:0;r.append("path").attr("d",`M${l},${p} L${l},${p+d} A${o},${e} 0 ${h} 1 ${c},${f+d} L${c},${f} A${o},${e} 0 ${h} 0 ${l},${p}`).attr("fill",s.color).attr("opacity",.6)}}),n.forEach(s=>{const i=s.endAngle-s.startAngle>Math.PI?1:0,l=t+o*Math.cos(s.startAngle),p=a+e*Math.sin(s.startAngle),c=t+o*Math.cos(s.endAngle),f=a+e*Math.sin(s.endAngle);r.append("path").attr("d",`M${t},${a} L${l},${p} A${o},${e} 0 ${i} 1 ${c},${f} Z`).attr("fill",s.color).attr("opacity",.92).attr("stroke","#fff").attr("stroke-width",1);const h=(s.startAngle+s.endAngle)/2;r.append("text").attr("x",t+o*.65*Math.cos(h)).attr("y",a+e*.65*Math.sin(h)).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","10px").attr("font-weight","700").text(s.label)}),r.append("text").attr("x",140).attr("y",190).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("3D透视：前方扇区面积被高估")}function Wt(r){r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const n=[35,30,20,15],t=["#E07A7A","#7EC8E3","#95D5B2","#F0B27A"],a=["35%","30%","20%","15%"],o=Y().value(s=>s).sort(null),e=F().innerRadius(42).outerRadius(78),d=r.append("g").attr("transform","translate(120,98)");o(n).forEach((s,i)=>{d.append("path").datum(s).attr("fill",t[i]).attr("opacity",.88).attr("d",e).attr("stroke","#fafafa").attr("stroke-width",2);const l=e.centroid(s);d.append("text").attr("x",l[0]).attr("y",l[1]).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","9.5px").attr("font-weight","700").text(a[i])}),r.append("text").attr("x",140).attr("y",190).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("平面圆环：面积感知客观")}function jt(r){const n=["北京","上海","广州","成都","武汉","西安"],t=[82,91,78,65,74,68];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a={t:20,r:20,b:36,l:42},o=280-a.l-a.r,e=200-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=X().domain(n).range([0,o]).padding(.3),i=g().domain([50,100]).range([e,0]);d.append("g").attr("transform",`translate(0,${e})`).call(u(s).tickSize(0)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8px").attr("transform","rotate(-20)").attr("text-anchor","end")}),d.append("g").call(v(i).ticks(4)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")});const l=A().x((p,c)=>s(n[c])).y((p,c)=>i(t[c]));d.append("path").datum(t).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2.5).attr("d",l),d.selectAll("circle").data(t).join("circle").attr("cx",(p,c)=>s(n[c])).attr("cy",p=>i(p)).attr("r",4.5).attr("fill","#E07A7A"),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("折线暗示城市间存在顺序关系")}function Rt(r){const n=["上海","北京","广州","武汉","西安","成都"],t=[91,82,78,74,68,65];r.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a={t:20,r:20,b:36,l:42},o=280-a.l-a.r,e=200-a.t-a.b,d=r.append("g").attr("transform",`translate(${a.l},${a.t})`),s=k().domain(n).range([0,o]).padding(.35),i=g().domain([50,100]).range([e,0]);d.append("g").attr("transform",`translate(0,${e})`).call(u(s).tickSize(0)).call(l=>{l.select(".domain").attr("stroke","#ccc"),l.selectAll("text").attr("fill","#555").attr("font-size","8px").attr("transform","rotate(-20)").attr("text-anchor","end")}),d.append("g").call(v(i).ticks(4)).call(l=>{l.select(".domain").attr("stroke","#ccc"),l.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),n.forEach((l,p)=>{d.append("rect").attr("x",s(l)).attr("width",s.bandwidth()).attr("y",i(t[p])).attr("height",e-i(t[p])).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3)}),r.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("柱状图：无序类别无连线误导")}function pa(){U(),b.resizeHandlers.forEach(r=>window.removeEventListener("resize",r)),b.resizeHandlers=[],b.treePath=[]}export{pa as destroy,da as init,ca as render};
