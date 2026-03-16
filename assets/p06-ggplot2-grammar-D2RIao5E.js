import{k as O,g as D,f as P,s as G}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as j}from"./index-DTvePxRW.js";import{s as z,l as E}from"./transform-ChPGlSkf.js";import{b as F}from"./band-DqVyTAN-.js";import{s as J}from"./sum-CB6J5KXz.js";import{a as $,b as H}from"./axis-FVV8vvN_.js";import{a as U}from"./arc-BpqQfc-p.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";function V(){const l=(a=>{let r=a;return()=>(r=r*1664525+1013904223&4294967295,(r>>>0)/4294967295)})(42),x=()=>{const a=l(),r=l();return Math.sqrt(-2*Math.log(a+1e-10))*Math.cos(2*Math.PI*r)},f=[];return[{name:"setosa",mx:5,sx:.35,my:1.5,sy:.18},{name:"versicolor",mx:5.9,sx:.52,my:4.3,sy:.47},{name:"virginica",mx:6.6,sx:.63,my:5.5,sy:.55}].forEach(a=>{for(let r=0;r<30;r++)f.push({x:a.mx+a.sx*x(),y:a.my+a.sy*x(),sp:a.name})}),f}const B=V(),k={setosa:"#7EC8E3",versicolor:"#F0B27A",virginica:"#95D5B2"},S=[{cat:"setosa",val:24.1},{cat:"versicolor",val:28.6},{cat:"virginica",val:32.3}];let h={layerStep:0,facetTab:"none",coordTab:"cartesian",axisBreaks:5,axisMin:4,axisMax:8,customLabels:!1,resizeHandlers:[],layerObservers:[],scrollHandlers:[]};const A=[{title:"第一层：数据 (data)",desc:"一切从数据开始。ggplot() 创建画布，但此时画面是空白的——数据已加载，坐标系尚未定义。",lines:[{text:"ggplot(iris)",new:!0}]},{title:"第二层：映射 (aes)",desc:"美学映射（aesthetics）将数据列绑定到视觉属性。x 轴、y 轴标签出现，但还没有任何数据点。",lines:[{text:"ggplot(iris, aes(",new:!1},{text:"  x     = Sepal.Length,",new:!0},{text:"  y     = Petal.Length,",new:!0},{text:"  color = Species",new:!0},{text:"))",new:!1}]},{title:"第三层：几何形状 (geom)",desc:"几何对象（geom）决定用什么形状展示数据。geom_point() 在每个 (x, y) 位置绘制散点，数据终于可见了。",lines:[{text:"ggplot(iris, aes(",new:!1},{text:"  x = Sepal.Length, y = Petal.Length,",new:!1},{text:"  color = Species",new:!1},{text:")) +",new:!1},{text:"  geom_point(size = 2.5, alpha = 0.8)",new:!0}]},{title:"第四层：标度 (scale)",desc:"标度（scale）控制数据到视觉属性的映射方式。scale_color_manual() 将默认配色替换为精心设计的调色板。",lines:[{text:"ggplot(iris, aes(",new:!1},{text:"  x = Sepal.Length, y = Petal.Length,",new:!1},{text:"  color = Species",new:!1},{text:")) +",new:!1},{text:"  geom_point(size = 2.5, alpha = 0.8) +",new:!1},{text:"  scale_color_manual(values = c(",new:!0},{text:'    "setosa"     = "#7EC8E3",',new:!0},{text:'    "versicolor" = "#F0B27A",',new:!0},{text:'    "virginica"  = "#95D5B2"',new:!0},{text:"  ))",new:!0}]},{title:"第五层：主题 (theme)",desc:'主题（theme）控制所有非数据元素：背景色、网格线、图例位置、字体大小。这是从"能看"到"好看"的最后一步。',lines:[{text:"ggplot(iris, aes(",new:!1},{text:"  x = Sepal.Length, y = Petal.Length,",new:!1},{text:"  color = Species",new:!1},{text:")) +",new:!1},{text:"  geom_point(size = 2.5, alpha = 0.8) +",new:!1},{text:"  scale_color_manual(values = c(...)) +",new:!1},{text:"  theme_minimal(base_size = 12) +",new:!0},{text:"  theme(",new:!0},{text:'    legend.position  = "bottom",',new:!0},{text:"    panel.grid.minor = element_blank()",new:!0},{text:"  )",new:!0}]}],N={none:`ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length,
  color = Species
)) +
  geom_point(alpha = 0.7) +
  scale_color_manual(values = sp_colors) +
  theme_minimal()`,facet_wrap:`ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length,
  color = Species
)) +
  geom_point(alpha = 0.7) +
  scale_color_manual(values = sp_colors) +
  facet_wrap(~ Species, nrow = 1) +
  theme_minimal() +
  theme(legend.position = "none")`,facet_grid:`ggplot(iris, aes(
  x = Sepal.Length,
  y = Petal.Length
)) +
  geom_point(alpha = 0.6,
             color = "#7EC8E3") +
  facet_grid(
    rows = vars(Species),
    cols = vars(size_cat)
  ) +
  theme_minimal()`},X={cartesian:`ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 0.6) +
  scale_fill_manual(
    values = sp_colors
  ) +
  theme_minimal()`,flip:`ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 0.6) +
  scale_fill_manual(
    values = sp_colors
  ) +
  coord_flip() +
  theme_minimal()`,polar:`ggplot(df, aes(
  x = Species,
  y = mean_length,
  fill = Species
)) +
  geom_col(width = 1) +
  scale_fill_manual(
    values = sp_colors
  ) +
  coord_polar(theta = "y") +
  theme_minimal() +
  theme(
    axis.text = element_blank()
  )`};function mt(){return`
<div class="page-scroll">
<style>
/* ══ p06 scoped styles ══ */
.p6-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark);
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
@keyframes p6-glow {
  0%,100% { transform:translate(0,0) scale(1); opacity:1; }
  35% { transform:translate(-2%,3%) scale(1.06); opacity:0.65; }
  70% { transform:translate(3%,-2%) scale(0.96); opacity:0.85; }
}
.p6-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 70% 55% at 50% 45%, rgba(126,200,227,0.11) 0%, transparent 70%);
  pointer-events:none;
  animation:p6-glow 11s ease-in-out infinite;
}
.p6-hero::after {
  content:''; position:absolute; inset:0;
  background-image:
    linear-gradient(rgba(126,200,227,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(126,200,227,0.03) 1px, transparent 1px);
  background-size:64px 64px;
  pointer-events:none;
}
.p6-hero-inner {
  position:relative; z-index:1;
  display:flex; flex-direction:column; align-items:center;
  gap:var(--space-md); text-align:center;
}
.p6-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:0.15em; text-transform:uppercase;
}
.p6-hero-title {
  color:var(--text-on-dark);
}
.p6-hero-sub {
  font-family:var(--font-heading); font-size:clamp(1rem,2vw,1.4rem);
  font-weight:300; color:var(--text-on-dark); opacity:0.5;
  max-width:600px; line-height:1.4; margin:var(--space-xs) auto 0; text-align:center;
}
.p6-hero-tagline {
  font-family:var(--font-body); font-size:var(--text-body);
  color:var(--text-on-dark-2); max-width:540px; line-height:1.8;
  margin:var(--space-sm) auto 0; text-align:center;
}
.p6-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p6-float 2.2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p6-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

/* Section headers */
.p6-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p6-sec-tag {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:10px;
}
.p6-sec-title {
  font-family:var(--font-display); font-size:clamp(1.8rem,4vw,3rem);
  font-weight:700; letter-spacing:-0.02em; line-height:1.15;
}
.p6-sec-desc {
  font-size:1.05rem; line-height:1.75; max-width:620px;
  margin:var(--space-sm) auto 0; opacity:0.75;
}

/* ── 图层叠加 ── */
.p6-layers-section {
  background:var(--bg-light); color:var(--text-on-light);
  scroll-margin-top:56px;
}
.p6-layers-hdr { padding:var(--space-3xl) var(--space-lg) var(--space-xl); text-align:center; }
.p6-layers-section .p6-sec-title { color:var(--text-on-light); }

/* 桌面端：flex布局 + JS transform模拟sticky（CSS sticky 在有 overflow 的祖先元素中失效） */
.p6-layers-body {
  display:flex; align-items:flex-start;
  max-width:1100px; margin:0 auto; padding:0 var(--space-lg);
}
.p6-sticky-left {
  width:50%; flex-shrink:0;
  height:100vh;
  padding:0 var(--space-lg) 0 0;
  box-sizing:border-box;
  display:flex; flex-direction:column; justify-content:center;
  overflow:hidden;
  will-change:transform; /* JS 通过 transform:translateY() 模拟 sticky */
}
.p6-sticky-steps {
  flex:1; min-width:0;
  padding-left:var(--space-lg);
}
.p6-step-panel {
  height:100vh; display:flex; align-items:center;
  padding:var(--space-xl) 0;
}
.p6-step-panel .p6-step-panel-inner {
  width:100%; opacity:0.4;
  transition:opacity 0.35s ease;
}
.p6-step-panel.p6-step-active .p6-step-panel-inner { opacity:1; }

.p6-step-num {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:14px;
}
.p6-step-title {
  font-family:var(--font-display); font-size:clamp(1.3rem,2.5vw,1.9rem);
  font-weight:700; letter-spacing:-0.01em; color:var(--text-on-light); margin-bottom:var(--space-sm);
}
.p6-step-desc { font-size:1rem; line-height:1.8; color:var(--text-on-light-2); max-width:440px; }

.p6-code-panel {
  background:var(--bg-dark); border-radius:var(--radius-lg);
  padding:var(--space-md); font-family:var(--font-code); font-size:13.5px; line-height:1.65;
  margin-bottom:var(--space-md); border:1px solid var(--border-dark); overflow:hidden;
  flex-shrink:0;
}
.p6-code-line {
  color:var(--text-on-dark-2); border-radius:3px;
  padding:1px 8px; white-space:pre-wrap; word-wrap:break-word;
  transition:color 0.3s, background 0.3s;
}
.p6-code-line.hl {
  color:#e2b96e; background:rgba(226,185,110,0.1);
  border-left:2px solid #e2b96e; padding-left:6px;
}
.p6-chart-box {
  width:100%; aspect-ratio:4/3; border-radius:var(--radius-md);
  overflow:hidden; background:#111218; border:1px solid var(--border-dark);
  flex-shrink:0;
}
.p6-chart-box svg { width:100%; height:100%; display:block; }

/* 移动端步骤卡片列表（桌面隐藏） */
.p6-mobile-steps-list { display:none; }

@media (max-width:900px) {
  .p6-layers-body { padding:0 var(--space-md); }
  .p6-sticky-left { padding-right:var(--space-md); }
  .p6-sticky-steps { padding-left:var(--space-md); }
}

/* ── 移动端：堆叠步骤卡片，自然滚动，无需交互 ── */
@media (max-width:768px) {
  /* 隐藏桌面端 JS-sticky 布局 */
  .p6-layers-body { display:none; }

  /* 移动端：5 张独立卡片，各含代码+图表+说明 */
  .p6-mobile-steps-list {
    display:block;
    padding:0 var(--space-sm) var(--space-2xl); /* bottom gap 防止紧贴下一节 */
    max-width:100%;
  }
  .p6-mobile-step-card {
    background:var(--bg-light-alt);
    border:1px solid var(--border-light);
    border-radius:var(--radius-md);
    padding:var(--space-md);
    margin-bottom:var(--space-md);
  }
  .p6-mobile-step-card .p6-step-num {
    font-family:var(--font-code); font-size:var(--text-caption);
    color:var(--accent); letter-spacing:0.15em; text-transform:uppercase; margin-bottom:10px;
  }
  .p6-mobile-step-card .p6-step-title { font-size:1.1rem; color:var(--text-on-light); margin-bottom:8px; }
  .p6-mobile-step-card .p6-step-desc { font-size:0.9rem; line-height:1.7; color:var(--text-on-light-2); margin-bottom:var(--space-sm); }
  .p6-mobile-step-card .p6-code-panel { font-size:12px; margin-bottom:var(--space-sm); }
  .p6-m-chart-box {
    width:100%; aspect-ratio:4/3;
    border-radius:var(--radius-md); overflow:hidden;
    background:#111218; border:1px solid var(--border-dark);
  }
  .p6-m-chart-box svg { width:100%; height:100%; display:block; }
}

/* ── 分面演示 ── */
.p6-facet-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-tab-bar {
  display:flex; gap:0; max-width:500px; margin:0 auto var(--space-xl);
  background:rgba(255,255,255,0.05); border-radius:var(--radius-full);
  border:1px solid var(--border-dark); overflow:hidden;
}
.p6-tab-btn {
  flex:1; padding:12px 16px; min-height:44px;
  background:transparent; border:none; color:var(--text-on-dark-2);
  font-family:var(--font-heading); font-size:0.88rem; cursor:pointer;
  transition:all 0.25s var(--ease-apple);
}
.p6-tab-btn.active { background:var(--accent); color:#1d1d1f; font-weight:600; }
.p6-tab-btn:not(.active):hover { color:var(--text-on-dark); background:rgba(255,255,255,0.06); }

.p6-facet-layout {
  display:grid; grid-template-columns:1fr 360px;
  gap:var(--space-xl); max-width:1000px; margin:0 auto; align-items:start;
}
.p6-facet-code-area {
  background:var(--bg-dark-elevated); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-code-label {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:var(--space-sm);
}
.p6-code-pre {
  font-family:var(--font-code); font-size:12.5px; line-height:1.65;
  color:#b4c6da; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word;
}
.p6-code-pre .kw { color:#c792ea; }
.p6-code-pre .fn { color:#82aaff; }
.p6-code-pre .str { color:#c3e88d; }
.p6-code-pre .num { color:#f78c6c; }
.p6-facet-svg-wrap { width:100%; }
.p6-facet-svg-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-facet-layout { grid-template-columns:1fr; } .p6-facet-code-area { position:static; } }
@media (max-width:768px) {
  .p6-facet-section { padding:var(--space-xl) var(--space-sm); }
  .p6-tab-bar { max-width:100%; overflow-x:auto; scrollbar-width:none; flex-shrink:0; }
  .p6-tab-bar::-webkit-scrollbar { display:none; }
  .p6-tab-btn { flex-shrink:0; padding:10px 12px; font-size:0.8rem; }
}

/* ── 坐标变换 ── */
.p6-coord-section {
  background:var(--bg-light-alt); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-coord-tabs {
  display:flex; gap:0; max-width:440px; margin:0 auto var(--space-xl);
  background:var(--bg-light-elevated); border-radius:var(--radius-full);
  border:1px solid var(--border-light); overflow:hidden; box-shadow:var(--shadow-sm);
}
.p6-coord-tab-btn {
  flex:1; padding:12px 14px; min-height:44px;
  background:transparent; border:none; color:var(--text-on-light-2);
  font-family:var(--font-heading); font-size:0.85rem; cursor:pointer;
  transition:all 0.25s var(--ease-apple);
}
.p6-coord-tab-btn.active { background:var(--text-on-light); color:var(--bg-light); font-weight:600; }
.p6-coord-tab-btn:not(.active):hover { color:var(--text-on-light); background:var(--bg-light-alt); }

.p6-coord-layout {
  display:grid; grid-template-columns:1fr 340px;
  gap:var(--space-xl); max-width:980px; margin:0 auto; align-items:start;
}
.p6-coord-code-area {
  background:var(--bg-dark); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-coord-chart-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-coord-layout { grid-template-columns:1fr; } .p6-coord-code-area { position:static; } }
@media (max-width:768px) {
  .p6-coord-section { padding:var(--space-xl) var(--space-sm); }
  .p6-coord-tabs { max-width:100%; overflow-x:auto; scrollbar-width:none; }
  .p6-coord-tabs::-webkit-scrollbar { display:none; }
  .p6-coord-tab-btn { flex-shrink:0; font-size:0.78rem; padding:10px 10px; }
}

/* ── 자定义坐标轴 ── */
.p6-axis-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); scroll-margin-top:56px;
}
.p6-axis-layout {
  display:grid; grid-template-columns:280px 1fr;
  gap:var(--space-xl); max-width:900px; margin:0 auto; align-items:start;
}
.p6-axis-controls {
  background:var(--bg-dark-elevated); border-radius:var(--radius-lg);
  border:1px solid var(--border-dark); padding:var(--space-md);
  position:sticky; top:var(--space-lg);
}
.p6-ctrl-group { margin-bottom:var(--space-md); }
.p6-ctrl-label {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--text-on-dark-3); text-transform:uppercase; letter-spacing:0.1em;
  margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;
}
.p6-ctrl-val { font-family:var(--font-code); font-size:0.8rem; color:var(--accent); }
.p6-range {
  -webkit-appearance:none; appearance:none;
  width:100%; height:6px; background:var(--border-dark);
  border-radius:var(--radius-full); outline:none; cursor:pointer; min-height:32px;
}
.p6-range::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px;
  background:var(--accent); border-radius:50%;
}
.p6-range::-moz-range-thumb { width:20px; height:20px; background:var(--accent); border-radius:50%; border:none; }
@media (max-width:768px) { .p6-range::-webkit-slider-thumb { width:24px; height:24px; } .p6-range::-moz-range-thumb { width:24px; height:24px; } }

.p6-toggle-group { display:flex; gap:8px; }
.p6-toggle-btn {
  flex:1; padding:9px 10px; min-height:44px;
  background:rgba(255,255,255,0.04); border:1px solid var(--border-dark);
  border-radius:var(--radius-sm); color:var(--text-on-dark-2);
  font-family:var(--font-heading); font-size:0.82rem; cursor:pointer; transition:all 0.2s;
}
.p6-toggle-btn.active { background:var(--accent); color:#1d1d1f; font-weight:600; border-color:var(--accent); }
.p6-axis-chart-wrap svg { width:100%; height:auto; display:block; }

@media (max-width:900px) { .p6-axis-layout { grid-template-columns:1fr; } .p6-axis-controls { position:static; } }
@media (max-width:768px) { .p6-axis-section { padding:var(--space-xl) var(--space-sm); } }

/* footer uses global .page-footer-cta */
</style>

<!-- Hero -->
<section class="p6-hero section-dark section-hero-full" id="p6-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p6-eyebrow" style="opacity:0;">Module 01 / Page 06</p>
    <h1 class="page-hero-title p6-hero-title" style="color:var(--text-on-dark);opacity:0;">ggplot2<br>图层语法与分面</h1>
    <p class="page-hero-sub p6-hero-sub" style="opacity:0;">ggplot2 Grammar of Graphics</p>
    <p class="p6-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">理解图形语法的核心设计哲学——每一层都是一次对数据的诠释。<br>从空白画布到出版级图表，五步完成。</p>
    <nav class="hero-quicknav" id="p6-hero-nav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p6-layers">图层叠加</button>
      <button class="hero-quicknav__item" data-target="#p6-facet">分面演示</button>
      <button class="hero-quicknav__item" data-target="#p6-coord">坐标变换</button>
      <button class="hero-quicknav__item" data-target="#p6-axis">自定义坐标轴</button>
    </nav>
    <div class="p6-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- Section 1: 图层叠加 -->
<section class="p6-layers-section" id="p6-layers">
  <div class="p6-layers-hdr">
    <div class="p6-sec-tag">Grammar of Graphics</div>
    <h2 class="p6-sec-title">图层叠加的哲学</h2>
    <p class="p6-sec-desc" style="color:var(--text-on-light-2)">ggplot2 是"图形语法"的具体实现。一张图表 = 数据 + 映射 + 几何 + 标度 + 主题的叠加。向下滚动，逐层构建一张完整的散点图。</p>
  </div>

  <!-- 移动端：5 张堆叠卡片，每张包含说明+代码+图表，向下滚动即可（桌面端隐藏） -->
  <div class="p6-mobile-steps-list" id="p6-mobile-steps-list">
    ${A.map((o,l)=>`
    <div class="p6-mobile-step-card">
      <div class="p6-step-num">Step ${l+1} / ${A.length}</div>
      <h3 class="p6-step-title">${o.title}</h3>
      <p class="p6-step-desc">${o.desc}</p>
      <div class="p6-code-panel" id="p6-m-code-${l}"></div>
      <div class="p6-m-chart-box" id="p6-m-chart-${l}"></div>
    </div>`).join("")}
  </div>

  <!-- 桌面端：JS-sticky 左列（代码+图表）+ 可滚动右列（步骤描述）（移动端隐藏） -->
  <div class="p6-layers-body" id="p6-layers-body">
    <div class="p6-sticky-left" id="p6-sticky-left">
      <div class="p6-code-panel" id="p6-code-display"></div>
      <div class="p6-chart-box" id="p6-layer-chart"></div>
    </div>
    <div class="p6-sticky-steps" id="p6-sticky-steps">
      ${A.map((o,l)=>`
      <div class="p6-step-panel" data-step="${l}">
        <div class="p6-step-panel-inner">
          <div class="p6-step-num">Step ${l+1} / ${A.length}</div>
          <h3 class="p6-step-title">${o.title}</h3>
          <p class="p6-step-desc">${o.desc}</p>
        </div>
      </div>`).join("")}
    </div>
  </div>
</section>

<!-- Section 2: 分面演示 -->
<section class="p6-facet-section" id="p6-facet">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Faceting</div>
    <h2 class="p6-sec-title">分面：拆开数据，看清格局</h2>
    <p class="p6-sec-desc">facet_wrap() 和 facet_grid() 让同一图表按分组变量展开为多个小面板，往往比颜色编码更清晰。</p>
  </div>
  <div class="p6-tab-bar" id="p6-facet-tabs">
    <button class="p6-tab-btn active" data-facet="none">无分面</button>
    <button class="p6-tab-btn" data-facet="facet_wrap">facet_wrap</button>
    <button class="p6-tab-btn" data-facet="facet_grid">facet_grid</button>
  </div>
  <div class="p6-facet-layout">
    <div class="p6-facet-chart-area">
      <div class="p6-facet-svg-wrap" id="p6-facet-chart"></div>
    </div>
    <div class="p6-facet-code-area">
      <div class="p6-code-label">R 代码</div>
      <pre class="p6-code-pre" id="p6-facet-code"></pre>
    </div>
  </div>
</section>

<!-- Section 3: 坐标变换 -->
<section class="p6-coord-section" id="p6-coord">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Coordinate Systems</div>
    <h2 class="p6-sec-title" style="color:var(--text-on-light)">坐标系：同数据，不同视角</h2>
    <p class="p6-sec-desc" style="color:var(--text-on-light-2)">同一组数据，不同坐标系呈现完全不同的视觉效果。一行代码，彻底改变图表形态。</p>
  </div>
  <div class="p6-coord-tabs" id="p6-coord-tabs">
    <button class="p6-coord-tab-btn active" data-coord="cartesian">笛卡尔坐标</button>
    <button class="p6-coord-tab-btn" data-coord="flip">翻转 flip</button>
    <button class="p6-coord-tab-btn" data-coord="polar">极坐标 polar</button>
  </div>
  <div class="p6-coord-layout">
    <div class="p6-coord-chart-area">
      <div class="p6-coord-chart-wrap" id="p6-coord-chart"></div>
    </div>
    <div class="p6-coord-code-area">
      <div class="p6-code-label">R 代码</div>
      <pre class="p6-code-pre" id="p6-coord-code"></pre>
    </div>
  </div>
</section>

<!-- Section 4: 自定义坐标轴 -->
<section class="p6-axis-section" id="p6-axis">
  <div class="p6-sec-hdr">
    <div class="p6-sec-tag">Axis Customization</div>
    <h2 class="p6-sec-title">精控坐标轴</h2>
    <p class="p6-sec-desc">breaks 控制刻度位置，labels 替换标签文字，limits 限定显示范围。拖动滑块，观察图表实时变化。</p>
  </div>
  <div class="p6-axis-layout">
    <div class="p6-axis-controls">
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">breaks（刻度数量）<span class="p6-ctrl-val" id="p6-breaks-val">5</span></div>
        <input type="range" class="p6-range" id="p6-breaks-range" min="2" max="10" value="5">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">x 下限 limits[min]<span class="p6-ctrl-val" id="p6-min-val">4.0</span></div>
        <input type="range" class="p6-range" id="p6-min-range" min="3" max="6" step="0.5" value="4">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">x 上限 limits[max]<span class="p6-ctrl-val" id="p6-max-val">8.0</span></div>
        <input type="range" class="p6-range" id="p6-max-range" min="6" max="9" step="0.5" value="8">
      </div>
      <div class="p6-ctrl-group">
        <div class="p6-ctrl-label">标签样式</div>
        <div class="p6-toggle-group">
          <button class="p6-toggle-btn active" id="p6-labels-auto">自动</button>
          <button class="p6-toggle-btn" id="p6-labels-custom">自定义</button>
        </div>
      </div>
      <div style="margin-top:var(--space-md);padding-top:var(--space-sm);border-top:1px solid var(--border-dark)">
        <div class="p6-code-label">生成的 R 代码</div>
        <pre class="p6-code-pre" id="p6-axis-code" style="font-size:11.5px;margin-top:8px"></pre>
      </div>
    </div>
    <div class="p6-axis-chart-area">
      <div class="p6-axis-chart-wrap" id="p6-axis-chart"></div>
    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta">
  <p class="page-footer-num">06 / 10</p>
  <h2 class="page-footer-quote">图层即语法，语法即自由</h2>
  <p class="page-footer-desc">掌握了图层语法，现在动手调节 12+ 种图表类型的每一个参数——散点图、箱线图、小提琴图和更多。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p6-back-btn">← 图表选择指南</button>
    <button class="btn-primary" id="p6-next-btn">ggplot2 工作坊 →</button>
  </div>
</section>

</div>`}function T(o,l){o.innerHTML="";const x=400,f=300,e={t:24,r:20,b:50,l:54},a=x-e.l-e.r,r=f-e.t-e.b,n=z(o).append("svg").attr("viewBox",`0 0 ${x} ${f}`).attr("preserveAspectRatio","xMidYMid meet");if(n.append("rect").attr("width",x).attr("height",f).attr("fill","#111218"),l===0){n.append("text").attr("x",x/2).attr("y",f/2).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#444").attr("font-family","var(--font-heading)").attr("font-size","13px").text("ggplot(iris)  ← 空白画布");return}const p=[4,8.2],i=[.3,7.4],s=E().domain(p).range([0,a]),t=E().domain(i).range([r,0]),d=n.append("g").attr("transform",`translate(${e.l},${e.t})`),g=l>=4?"#191c2a":"#1a1d2e";if(d.selectAll(".gy").data(t.ticks(5)).join("line").attr("x1",0).attr("x2",a).attr("y1",m=>t(m)).attr("y2",m=>t(m)).attr("stroke",g).attr("stroke-width",1),l<4&&d.selectAll(".gym").data(t.ticks(10)).join("line").attr("x1",0).attr("x2",a).attr("y1",m=>t(m)).attr("y2",m=>t(m)).attr("stroke","#161820").attr("stroke-width",.5),d.append("g").attr("transform",`translate(0,${r})`).call($(s).ticks(5)).call(m=>{m.select(".domain").attr("stroke","#555"),m.selectAll("text").attr("fill",l>=1?"#888":"#444").attr("font-size","9px"),m.selectAll("line").attr("stroke","#555")}),d.append("g").call(H(t).ticks(5)).call(m=>{m.select(".domain").attr("stroke","#555"),m.selectAll("text").attr("fill",l>=1?"#888":"#444").attr("font-size","9px"),m.selectAll("line").attr("stroke","#555")}),l>=1&&(d.append("text").attr("x",a/2).attr("y",r+38).attr("text-anchor","middle").attr("fill","#999").attr("font-size","10.5px").attr("font-family","var(--font-code)").text("Sepal.Length"),d.append("text").attr("transform","rotate(-90)").attr("x",-r/2).attr("y",-42).attr("text-anchor","middle").attr("fill","#999").attr("font-size","10.5px").attr("font-family","var(--font-code)").text("Petal.Length")),l>=2&&d.selectAll("circle").data(B).join("circle").attr("cx",m=>s(m.x)).attr("cy",m=>t(m.y)).attr("r",3.5).attr("fill",m=>l>=3?k[m.sp]:"#7EC8E3").attr("opacity",l>=3?.82:.55),l>=2){const m=["setosa","versicolor","virginica"],y=l>=4,w=n.append("g");y?m.forEach((u,_)=>{const c=e.l+_*100+10,v=e.t+r+44;w.append("circle").attr("cx",c).attr("cy",v).attr("r",4).attr("fill",k[u]),w.append("text").attr("x",c+8).attr("y",v+1).attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9px").attr("font-family","var(--font-heading)").text(u)}):m.forEach((u,_)=>{const c=e.t+_*18+6,v=e.l+a+8;w.append("circle").attr("cx",v).attr("cy",c).attr("r",4).attr("fill",k[u]),w.append("text").attr("x",v+8).attr("y",c+1).attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9px").attr("font-family","var(--font-heading)").text(u)})}}function C(o,l){o&&(o.innerHTML=A[l].lines.map(x=>`<div class="p6-code-line${x.new?" hl":""}">${Y(x.text)}</div>`).join(""))}function Y(o){return o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function K(o,l){o.innerHTML="";const x=["setosa","versicolor","virginica"];if(l==="none"){const a={t:20,r:16,b:46,l:50},r=420-a.l-a.r,n=290-a.t-a.b,p=z(o).append("svg").attr("viewBox","0 0 420 290").attr("preserveAspectRatio","xMidYMid meet");p.append("rect").attr("width",420).attr("height",290).attr("fill","#111218");const i=p.append("g").attr("transform",`translate(${a.l},${a.t})`),s=E().domain([4,8.3]).range([0,r]),t=E().domain([.3,7.4]).range([n,0]);q(i,s,t,r,n,"#1e2030"),at(i,s,t,r,n),et(p,a,r,n,"Sepal.Length","Petal.Length"),i.selectAll("circle").data(B).join("circle").attr("cx",d=>s(d.x)).attr("cy",d=>t(d.y)).attr("r",3.5).attr("fill",d=>k[d.sp]).attr("opacity",.8),x.forEach((d,g)=>{p.append("circle").attr("cx",a.l+r-76).attr("cy",a.t+g*18+8).attr("r",4).attr("fill",k[d]),p.append("text").attr("x",a.l+r-69).attr("y",a.t+g*18+8).attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9px").text(d)})}else if(l==="facet_wrap"){const a={t:18,r:10,b:32,l:36},r=10,n=540+2*r+12,p=183,i=z(o).append("svg").attr("viewBox",`0 0 ${n} ${p}`).attr("preserveAspectRatio","xMidYMid meet");i.append("rect").attr("width",n).attr("height",p).attr("fill","#111218"),x.forEach((s,t)=>{const d=6+t*(180+r),g=22,m=B.filter(v=>v.sp===s),y=180-a.l-a.r,w=155-a.t-a.b,u=E().domain([4,8.3]).range([0,y]),_=E().domain([.3,7.4]).range([w,0]);i.append("rect").attr("x",d).attr("y",g).attr("width",180).attr("height",155).attr("fill","#161820").attr("rx",5),i.append("text").attr("x",d+180/2).attr("y",g-5).attr("text-anchor","middle").attr("fill",k[s]).attr("font-size","9px").attr("font-family","var(--font-heading)").text(s);const c=i.append("g").attr("transform",`translate(${d+a.l},${g+a.t})`);q(c,u,_,y,w,"#1e2030"),c.append("g").attr("transform",`translate(0,${w})`).call($(u).ticks(3)).call(v=>{v.select(".domain").attr("stroke","#444"),v.selectAll("text").attr("fill","#666").attr("font-size","7px"),v.selectAll("line").attr("stroke","#444")}),c.append("g").call(H(_).ticks(3)).call(v=>{v.select(".domain").attr("stroke","#444"),v.selectAll("text").attr("fill","#666").attr("font-size","7px"),v.selectAll("line").attr("stroke","#444")}),c.selectAll("circle").data(m).join("circle").attr("cx",v=>u(v.x)).attr("cy",v=>_(v.y)).attr("r",3).attr("fill",k[s]).attr("opacity",.85)})}else{const f=["small (≤5.8)","large (>5.8)"],r={t:14,r:8,b:26,l:32},n=8,p=8,i=310+n+70,s=336+2*p+36,t=z(o).append("svg").attr("viewBox",`0 0 ${i} ${s}`).attr("preserveAspectRatio","xMidYMid meet");t.append("rect").attr("width",i).attr("height",s).attr("fill","#111218"),f.forEach((d,g)=>{t.append("text").attr("x",44+g*(155+n)+155/2).attr("y",13).attr("text-anchor","middle").attr("fill","#aaa").attr("font-size","8px").text(d)}),x.forEach((d,g)=>{t.append("text").attr("transform",`rotate(90, ${i-5}, ${24+g*(112+p)+112/2})`).attr("x",i-5).attr("y",24+g*(112+p)+112/2).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill",k[d]).attr("font-size","8px").text(d),f.forEach((m,y)=>{const w=y===1,u=B.filter(b=>b.sp===d&&(w?b.x>5.8:b.x<=5.8)),_=44+y*(155+n),c=20+g*(112+p),v=155-r.l-r.r,L=112-r.t-r.b,M=E().domain([4,8.3]).range([0,v]),I=E().domain([.3,7.4]).range([L,0]);t.append("rect").attr("x",_).attr("y",c).attr("width",155).attr("height",112).attr("fill","#161820").attr("rx",4);const W=t.append("g").attr("transform",`translate(${_+r.l},${c+r.t})`);q(W,M,I,v,L,"#1e2030"),g===2&&W.append("g").attr("transform",`translate(0,${L})`).call($(M).ticks(3)).call(b=>{b.select(".domain").attr("stroke","#444"),b.selectAll("text").attr("fill","#666").attr("font-size","7px"),b.selectAll("line").attr("stroke","#444")}),y===0&&W.append("g").call(H(I).ticks(3)).call(b=>{b.select(".domain").attr("stroke","#444"),b.selectAll("text").attr("fill","#666").attr("font-size","7px"),b.selectAll("line").attr("stroke","#444")}),W.selectAll("circle").data(u).join("circle").attr("cx",b=>M(b.x)).attr("cy",b=>I(b.y)).attr("r",2.5).attr("fill",k[d]).attr("opacity",.85)})})}}function Q(o,l){if(o.innerHTML="",l==="cartesian"){const e={t:24,r:16,b:52,l:52},a=380-e.l-e.r,r=280-e.t-e.b,n=z(o).append("svg").attr("viewBox","0 0 380 280").attr("preserveAspectRatio","xMidYMid meet");n.append("rect").attr("width",380).attr("height",280).attr("fill","#fafafa");const p=n.append("g").attr("transform",`translate(${e.l},${e.t})`),i=F().domain(S.map(t=>t.cat)).range([0,a]).padding(.38),s=E().domain([0,38]).range([r,0]);s.ticks(5).forEach(t=>{p.append("line").attr("x1",0).attr("x2",a).attr("y1",s(t)).attr("y2",s(t)).attr("stroke","#ebebeb").attr("stroke-width",1)}),p.append("g").attr("transform",`translate(0,${r})`).call($(i).tickSize(0)).call(t=>{t.select(".domain").attr("stroke","#ccc"),t.selectAll("text").attr("fill","#555").attr("font-size","10px")}),p.append("g").call(H(s).ticks(5)).call(t=>{t.select(".domain").attr("stroke","#ccc"),t.selectAll("text").attr("fill","#555").attr("font-size","10px"),t.selectAll("line").attr("stroke","#ccc")}),p.selectAll("rect.b").data(S).join("rect").attr("class","b").attr("x",t=>i(t.cat)).attr("width",i.bandwidth()).attr("y",t=>s(t.val)).attr("height",t=>r-s(t.val)).attr("fill",t=>k[t.cat]).attr("rx",4).attr("opacity",.88),p.selectAll("text.v").data(S).join("text").attr("class","v").attr("x",t=>i(t.cat)+i.bandwidth()/2).attr("y",t=>s(t.val)-6).attr("text-anchor","middle").attr("fill","#333").attr("font-size","10.5px").attr("font-weight","600").text(t=>t.val.toFixed(1)),n.append("text").attr("x",e.l+a/2).attr("y",276).attr("text-anchor","middle").attr("fill","#aaa").attr("font-size","10px").text("coord_cartesian()（默认）")}else if(l==="flip"){const e={t:14,r:52,b:38,l:88},a=380-e.l-e.r,r=250-e.t-e.b,n=z(o).append("svg").attr("viewBox","0 0 380 250").attr("preserveAspectRatio","xMidYMid meet");n.append("rect").attr("width",380).attr("height",250).attr("fill","#fafafa");const p=n.append("g").attr("transform",`translate(${e.l},${e.t})`),i=F().domain(S.map(t=>t.cat)).range([0,r]).padding(.38),s=E().domain([0,38]).range([0,a]);s.ticks(5).forEach(t=>{p.append("line").attr("y1",0).attr("y2",r).attr("x1",s(t)).attr("x2",s(t)).attr("stroke","#ebebeb").attr("stroke-width",1)}),p.append("g").attr("transform",`translate(0,${r})`).call($(s).ticks(5)).call(t=>{t.select(".domain").attr("stroke","#ccc"),t.selectAll("text").attr("fill","#555").attr("font-size","10px"),t.selectAll("line").attr("stroke","#ccc")}),p.append("g").call(H(i).tickSize(0)).call(t=>{t.select(".domain").attr("stroke","#ccc"),t.selectAll("text").attr("fill","#555").attr("font-size","10px")}),p.selectAll("rect.b").data(S).join("rect").attr("class","b").attr("y",t=>i(t.cat)).attr("height",i.bandwidth()).attr("x",0).attr("width",t=>s(t.val)).attr("fill",t=>k[t.cat]).attr("rx",4).attr("opacity",.88),p.selectAll("text.v").data(S).join("text").attr("class","v").attr("y",t=>i(t.cat)+i.bandwidth()/2).attr("x",t=>s(t.val)+5).attr("dominant-baseline","middle").attr("fill","#333").attr("font-size","10px").attr("font-weight","600").text(t=>t.val.toFixed(1)),n.append("text").attr("x",e.l+a/2).attr("y",246).attr("text-anchor","middle").attr("fill","#aaa").attr("font-size","10px").text("coord_flip()")}else{const e=z(o).append("svg").attr("viewBox","0 0 300 300").attr("preserveAspectRatio","xMidYMid meet");e.append("rect").attr("width",300).attr("height",300).attr("fill","#fafafa");const a=300/2,r=300/2+8,n=96;[.33,.67,1].forEach(s=>{e.append("circle").attr("cx",a).attr("cy",r).attr("r",s*n).attr("fill","none").attr("stroke","#ebebeb").attr("stroke-width",1)});const p=J(S,s=>s.val);let i=-Math.PI/2;S.forEach(s=>{const t=s.val/p*2*Math.PI,d=i+t,g=s.val/38*n,m=U()({innerRadius:0,outerRadius:g,startAngle:i,endAngle:d});e.append("path").attr("transform",`translate(${a},${r})`).attr("d",m).attr("fill",k[s.cat]).attr("opacity",.85).attr("stroke","#fafafa").attr("stroke-width",2);const y=i+t/2;e.append("text").attr("x",a+(g+18)*Math.sin(y)).attr("y",r-(g+18)*Math.cos(y)).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#444").attr("font-size","9px").text(s.cat),i=d}),e.append("text").attr("x",300/2).attr("y",296).attr("text-anchor","middle").attr("fill","#aaa").attr("font-size","10px").text('coord_polar(theta = "y")')}}function Z(o,{breaks:l,axisMin:x,axisMax:f,customLabels:e}){o.innerHTML="";const a=480,r=320,n={t:24,r:20,b:56,l:54},p=a-n.l-n.r,i=r-n.t-n.b,s=z(o).append("svg").attr("viewBox",`0 0 ${a} ${r}`).attr("preserveAspectRatio","xMidYMid meet");s.append("rect").attr("width",a).attr("height",r).attr("fill","#111218").attr("rx",8);const t=s.append("g").attr("transform",`translate(${n.l},${n.t})`),d=[Math.min(x,f-.5),Math.max(f,x+.5)],g=E().domain(d).range([0,p]),m=E().domain([0,7.5]).range([i,0]);m.ticks(5).forEach(c=>{t.append("line").attr("x1",0).attr("x2",p).attr("y1",m(c)).attr("y2",m(c)).attr("stroke","#1e2030").attr("stroke-width",1)}),g.ticks(l).forEach(c=>{t.append("line").attr("x1",g(c)).attr("x2",g(c)).attr("y1",0).attr("y2",i).attr("stroke","#1e2030").attr("stroke-width",1)});const y="rgba(126,200,227,0.35)";[0,p].forEach(c=>{t.append("line").attr("x1",c).attr("x2",c).attr("y1",0).attr("y2",i).attr("stroke",y).attr("stroke-width",1.5).attr("stroke-dasharray","4,3")});const w=g.ticks(l),u=$(g).tickValues(w);if(e){const c=["短","↓","中","↓","中长","↓","長","↓","超长"];u.tickFormat((v,L)=>c[L%c.length]||v.toFixed(1))}t.append("g").attr("transform",`translate(0,${i})`).call(u).call(c=>{c.select(".domain").attr("stroke","#555"),c.selectAll("text").attr("fill","#888").attr("font-size","10px"),c.selectAll("line").attr("stroke","#555")}),t.append("g").call(H(m).ticks(5)).call(c=>{c.select(".domain").attr("stroke","#555"),c.selectAll("text").attr("fill","#888").attr("font-size","10px"),c.selectAll("line").attr("stroke","#555")}),t.append("text").attr("x",p/2).attr("y",i+44).attr("text-anchor","middle").attr("fill","#777").attr("font-size","11px").attr("font-family","var(--font-code)").text("Sepal.Length"),t.append("text").attr("transform","rotate(-90)").attr("x",-i/2).attr("y",-42).attr("text-anchor","middle").attr("fill","#777").attr("font-size","11px").attr("font-family","var(--font-code)").text("Petal.Length");const _=B.filter(c=>c.x>=d[0]&&c.x<=d[1]);t.selectAll("circle").data(_).join("circle").attr("cx",c=>g(c.x)).attr("cy",c=>m(c.y)).attr("r",3.5).attr("fill",c=>k[c.sp]).attr("opacity",.82)}function tt(o,l,x,f){return`scale_x_continuous(
  breaks = seq(${l}, ${x},
    length.out = ${o}),${f?`
  labels = c("短","中","長"),`:""}
  limits = c(${l}, ${x})
)`}function q(o,l,x,f,e,a){o.selectAll(".gy").data(x.ticks(5)).join("line").attr("x1",0).attr("x2",f).attr("y1",r=>x(r)).attr("y2",r=>x(r)).attr("stroke",a).attr("stroke-width",1)}function at(o,l,x,f,e){o.append("g").attr("transform",`translate(0,${e})`).call($(l).ticks(5)).call(a=>{a.select(".domain").attr("stroke","#555"),a.selectAll("text").attr("fill","#888").attr("font-size","9px"),a.selectAll("line").attr("stroke","#555")}),o.append("g").call(H(x).ticks(5)).call(a=>{a.select(".domain").attr("stroke","#555"),a.selectAll("text").attr("fill","#888").attr("font-size","9px"),a.selectAll("line").attr("stroke","#555")})}function et(o,l,x,f,e,a){o.append("text").attr("x",l.l+x/2).attr("y",l.t+f+40).attr("text-anchor","middle").attr("fill","#888").attr("font-size","10px").attr("font-family","var(--font-code)").text(e),o.append("text").attr("transform","rotate(-90)").attr("x",-132).attr("y",12).attr("text-anchor","middle").attr("fill","#888").attr("font-size","10px").attr("font-family","var(--font-code)").text(a)}function R(o){return Y(o).replace(/\b(ggplot|aes|geom_point|geom_col|scale_color_manual|scale_fill_manual|facet_wrap|facet_grid|theme_minimal|theme|coord_flip|coord_polar|scale_x_continuous|vars|seq|element_blank)\b/g,'<span class="fn">$1</span>').replace(/\b(c|TRUE|FALSE|NULL)\b/g,'<span class="kw">$1</span>').replace(/&quot;([^&]*)&quot;/g,'<span class="str">&quot;$1&quot;</span>').replace(/\b(\d+\.?\d*)\b/g,'<span class="num">$1</span>')}function xt(){document.querySelectorAll("#p6-hero-nav .hero-quicknav__item").forEach(e=>{e.addEventListener("click",()=>{const a=document.querySelector(e.dataset.target);a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});const o=D.timeline({delay:.2});if(o.fromTo(".p6-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),o.fromTo(".p6-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),o.fromTo(".p6-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),o.fromTo(".p6-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),o.fromTo("#p6-hero-nav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),o.fromTo(".p6-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),window.innerWidth>768){let r=function(){if(!e||!a)return;const n=e.getBoundingClientRect(),p=Math.max(0,-n.top),i=Math.max(0,e.offsetHeight-a.offsetHeight);a.style.transform=`translateY(${Math.min(p,i)}px)`;const s=window.innerHeight,t=Math.min(A.length-1,Math.max(0,Math.floor(p/s)));t!==h.layerStep&&(h.layerStep=t,C(document.getElementById("p6-code-display"),t),T(document.getElementById("p6-layer-chart"),t),document.querySelectorAll(".p6-step-panel").forEach((d,g)=>{d.classList.toggle("p6-step-active",g===t)}))};C(document.getElementById("p6-code-display"),0),T(document.getElementById("p6-layer-chart"),0),document.querySelectorAll(".p6-step-panel")[0]?.classList.add("p6-step-active");const e=document.getElementById("p6-layers-body"),a=document.getElementById("p6-sticky-left");window.addEventListener("scroll",r,{passive:!0}),h.scrollHandlers.push({el:window,fn:r}),r()}window.innerWidth<=768&&A.forEach((e,a)=>{const r=document.getElementById(`p6-m-code-${a}`),n=document.getElementById(`p6-m-chart-${a}`);r&&C(r,a),n&&T(n,a)});function l(e){h.facetTab=e,K(document.getElementById("p6-facet-chart"),e);const a=document.getElementById("p6-facet-code");a&&(a.innerHTML=R(N[e])),document.querySelectorAll("#p6-facet-tabs .p6-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.facet===e)})}document.querySelectorAll("#p6-facet-tabs .p6-tab-btn").forEach(e=>{e.addEventListener("click",()=>l(e.dataset.facet))}),l("none");function x(e){h.coordTab=e,Q(document.getElementById("p6-coord-chart"),e);const a=document.getElementById("p6-coord-code");a&&(a.innerHTML=R(X[e])),document.querySelectorAll("#p6-coord-tabs .p6-coord-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.coord===e)})}document.querySelectorAll("#p6-coord-tabs .p6-coord-tab-btn").forEach(e=>{e.addEventListener("click",()=>x(e.dataset.coord))}),x("cartesian");function f(){const e=parseInt(document.getElementById("p6-breaks-range")?.value||"5"),a=parseFloat(document.getElementById("p6-min-range")?.value||"4"),r=parseFloat(document.getElementById("p6-max-range")?.value||"8");h.axisBreaks=e,h.axisMin=a,h.axisMax=r;const n=document.getElementById("p6-breaks-val"),p=document.getElementById("p6-min-val"),i=document.getElementById("p6-max-val");n&&(n.textContent=e),p&&(p.textContent=a.toFixed(1)),i&&(i.textContent=r.toFixed(1)),Z(document.getElementById("p6-axis-chart"),{breaks:e,axisMin:a,axisMax:r,customLabels:h.customLabels});const s=document.getElementById("p6-axis-code");s&&(s.innerHTML=R(tt(e,a,r,h.customLabels)))}["p6-breaks-range","p6-min-range","p6-max-range"].forEach(e=>{document.getElementById(e)?.addEventListener("input",f)}),document.getElementById("p6-labels-auto")?.addEventListener("click",()=>{h.customLabels=!1,document.getElementById("p6-labels-auto")?.classList.add("active"),document.getElementById("p6-labels-custom")?.classList.remove("active"),f()}),document.getElementById("p6-labels-custom")?.addEventListener("click",()=>{h.customLabels=!0,document.getElementById("p6-labels-custom")?.classList.add("active"),document.getElementById("p6-labels-auto")?.classList.remove("active"),f()}),f(),P(document.querySelectorAll(".p6-sec-hdr"),{stagger:.12,y:50}),P(document.querySelectorAll(".page-footer-quote, .page-footer-desc"),{stagger:.15}),G(document.getElementById("p6-axis-layout")),document.getElementById("p6-next-btn")?.addEventListener("click",()=>j("m1-p7")),document.getElementById("p6-back-btn")?.addEventListener("click",()=>j("m1-p5"))}function ft(){O(),h.layerObservers.forEach(o=>o.disconnect()),h.layerObservers=[],h.scrollHandlers.forEach(({el:o,fn:l})=>o.removeEventListener("scroll",l)),h.scrollHandlers=[],h.resizeHandlers.forEach(o=>window.removeEventListener("resize",o)),h.resizeHandlers=[],h.layerStep=0,h.facetTab="none",h.coordTab="cartesian",h.customLabels=!1}export{ft as destroy,xt as init,mt as render};
