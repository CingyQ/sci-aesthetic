import{k as S,g as r,f as s}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as z}from"./index--9oJ04dn.js";import{c as T}from"./TabSwitcher-B5dsPqHB.js";let b=[],u=[],c=null,m=0,y=0;function p(a,t,i,e){a&&(a.addEventListener(t,i,e),b.push({el:a,type:t,fn:i,opts:e}))}const E=`
/* ── Hero 光晕 ── */
.pga-hero { position:relative; overflow:hidden; }
.pga-hero::before,
.pga-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.pga-hero::before { width:55%; height:45%; top:25%; left:10%; background:rgba(240,178,122,0.13); animation:pga-drift-a 13s ease-in-out infinite alternate; }
.pga-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.09); animation:pga-drift-b 9s ease-in-out infinite alternate-reverse; }
@keyframes pga-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-20px)} }
@keyframes pga-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-25px,15px)} }

/* ── 滚动提示 ── */
.pga-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:pga-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes pga-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ══ S1 对比卡片 ══ */
.pga-compare-wrap { display:flex; gap:var(--space-lg); max-width:900px; margin:0 auto; }
.pga-compare-card { flex:1; background:#fff; border-radius:16px; border:1px solid rgba(0,0,0,0.06); overflow:hidden; box-shadow:0 2px 16px rgba(0,0,0,0.04); }
.pga-compare-card-header { height:6px; }
.pga-compare-card-header.pga-poster-accent { background:var(--module-4); }
.pga-compare-card-header.pga-ga-accent { background:var(--module-1); }
.pga-compare-card-title { font-size:var(--text-subheading); font-weight:700; padding:var(--space-md) var(--space-md) var(--space-sm); font-family:var(--font-heading); color:var(--text-on-light); }
.pga-compare-row { display:flex; padding:10px var(--space-md); font-size:var(--text-caption); border-top:1px solid rgba(0,0,0,0.04); }
.pga-compare-row:nth-child(odd) { background:rgba(0,0,0,0.015); }
.pga-compare-label { width:90px; flex-shrink:0; color:var(--text-on-light-2); font-weight:500; }
.pga-compare-value { color:var(--text-on-light); line-height:1.5; }

/* ══ S2 布局模板 ══ */
.pga-layout-wrap { display:flex; gap:var(--space-lg); max-width:var(--w-full); margin:0 auto; position:relative; align-items:flex-start; }
.pga-layout-list { width:42%; display:flex; flex-direction:column; gap:var(--space-sm); }
.pga-layout-preview-col { width:58%; }
.pga-layout-card { padding:var(--space-md); border-radius:12px; border:1px solid rgba(255,255,255,0.08); cursor:pointer; transition:border-color 0.3s, background 0.3s, border-left-width 0.2s; background:rgba(255,255,255,0.03); border-left:2px solid transparent; }
.pga-layout-card:hover { background:rgba(255,255,255,0.06); }
.pga-layout-card.pga-layout-active { border-left:3px solid var(--module-4); background:rgba(240,178,122,0.07); }
.pga-layout-card-name { font-size:15px; font-weight:600; color:var(--text-on-dark); margin-bottom:4px; }
.pga-layout-card-desc { font-size:13px; color:var(--text-on-dark-2); line-height:1.5; }
.pga-layout-preview { border-radius:12px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); overflow:hidden; }
.pga-preview-inner { aspect-ratio:1/1.414; position:relative; padding:12px; display:flex; flex-direction:column; gap:6px; }
.pga-block { border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:11px; font-family:var(--font-code); letter-spacing:0.03em; color:rgba(255,255,255,0.7); font-weight:500; }

/* 布局1 三栏 */
.pga-layout-1 { flex:1; display:flex; flex-direction:column; gap:6px; }
.pga-layout-1 .row { display:flex; gap:6px; flex:1; }
.pga-layout-1 .col { display:flex; flex-direction:column; gap:6px; flex:1; }

/* ══ S3 设计要点 ══ */
.pga-tips-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md); max-width:900px; margin:0 auto; }
.pga-tip-card { background:#fff; border:1px solid rgba(0,0,0,0.06); border-radius:16px; padding:var(--space-md); box-shadow:0 2px 12px rgba(0,0,0,0.04); }
.pga-tip-num { width:40px; height:40px; border-radius:50%; background:var(--module-4); display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; color:#1d1d1f; margin-bottom:var(--space-sm); }
.pga-tip-title { font-size:15px; font-weight:700; color:var(--text-on-light); margin-bottom:6px; font-family:var(--font-heading); }
.pga-tip-body { font-size:13px; color:var(--text-on-light-2); line-height:1.6; }

/* ══ S4 GA 流程 ══ */
.pga-flow-wrap { display:flex; gap:0; max-width:900px; margin:0 auto; align-items:stretch; position:relative; }
.pga-flow-step { flex:1; padding:var(--space-md); border-radius:12px; cursor:pointer; transition:background 0.3s, transform 0.3s; text-align:center; position:relative; }
.pga-flow-step.pga-flow-active { background:rgba(240,178,122,0.12); transform:translateY(-4px); }
.pga-flow-step.pga-flow-active .pga-flow-num {
  transform:scale(1.1);
  transition:transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
}
.pga-flow-step:not(.pga-flow-active) { opacity:0.55; }
.pga-flow-step:hover:not(.pga-flow-active) { opacity:0.8; }
.pga-flow-num { font-size:clamp(2.5rem,5vw,3.5rem); font-weight:700; color:var(--module-4); font-family:var(--font-heading); line-height:1; margin-bottom:var(--space-sm); }
.pga-flow-icon { font-size:2rem; margin-bottom:var(--space-sm); }
.pga-flow-title { font-size:15px; font-weight:700; color:var(--text-on-dark); margin-bottom:6px; }
.pga-flow-desc { font-size:13px; color:var(--text-on-dark-2); line-height:1.6; }
.pga-flow-arrow { display:flex; align-items:center; color:rgba(255,255,255,0.2); font-size:20px; padding:0 4px; flex-shrink:0; align-self:center; }

/* ══ S5 GA 案例 ══ */
.pga-rating-wrap { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md); max-width:1000px; margin:0 auto; }
.pga-rating-card { background:#fff; border-radius:16px; border:1px solid rgba(0,0,0,0.06); overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.04); transition:box-shadow 0.3s; }
.pga-rating-card.pga-best { border:2px solid var(--module-4); box-shadow:0 4px 24px rgba(240,178,122,0.15); }
.pga-ga-thumb { height:160px; background:rgba(0,0,0,0.03); border-bottom:1px solid rgba(0,0,0,0.05); padding:12px; display:flex; align-items:center; gap:8px; overflow:hidden; }
.pga-ga-block { border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; color:rgba(0,0,0,0.4); font-family:var(--font-code); text-align:center; line-height:1.2; }
.pga-ga-arrow { color:rgba(0,0,0,0.3); font-size:16px; flex-shrink:0; }
.pga-rating-body { padding:var(--space-md); }
.pga-rating-title { font-size:14px; font-weight:700; color:var(--text-on-light); margin-bottom:6px; }
.pga-rating-stars { font-size:18px; margin-bottom:var(--space-sm); letter-spacing:2px; }
.pga-rating-points { list-style:none; padding:0; margin:0; }
.pga-rating-points li { font-size:12px; color:var(--text-on-light-2); line-height:1.6; padding:2px 0; }
.pga-rating-points li::before { margin-right:6px; }
.pga-rating-points li.pga-pro::before { content:'✓'; color:#2ea85c; }
.pga-rating-points li.pga-con::before { content:'✗'; color:#e05050; }

/* ══ S6 尺寸速查 ══ */
.pga-sizes-tab-content { display:none; }
.pga-sizes-tab-content.pga-tab-active { display:block; }
.pga-table-wrap { overflow-x:auto; margin-top:var(--space-md); border-radius:10px; }
.pga-table { width:100%; border-collapse:collapse; font-size:14px; min-width:480px; }
.pga-table th { text-align:left; padding:12px 16px; font-weight:700; color:var(--text-on-dark); border-bottom:2px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.05); font-size:13px; }
.pga-table td { padding:11px 16px; color:var(--text-on-dark-2); border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; }
.pga-table tr:nth-child(even) td { background:rgba(255,255,255,0.025); }
.pga-table tr:hover td { background:rgba(255,255,255,0.04); }
.pga-table td:first-child { font-weight:600; color:var(--text-on-dark); }

/* ══ pga-section-inner 内容包裹层 ══ */
.pga-section-inner {
  padding: var(--space-3xl) var(--space-lg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
/* S2 布局模板：内容从顶部开始，不垂直居中 */
#pga-poster-layout .pga-section-inner {
  justify-content: flex-start;
}

/* ══ Footer ══ */
.pga-footer-nav { display:flex; gap:var(--space-md); justify-content:center; flex-wrap:wrap; margin-top:var(--space-lg); }

/* ══ 移动端 ══ */
@media (max-width:768px) {
  .pga-compare-wrap { flex-direction:column; }
  .pga-layout-wrap { flex-direction:column-reverse; }
  .pga-layout-list { width:100%; }
  .pga-layout-preview-col { width:100%; }
  .pga-tips-grid { grid-template-columns:1fr; }
  .pga-flow-wrap { flex-direction:column; align-items:stretch; }
  .pga-flow-arrow { display:none; }
  .pga-flow-step { text-align:left; display:flex; gap:var(--space-sm); align-items:flex-start; }
  .pga-flow-step.pga-flow-active { transform:none; }
  .pga-flow-num { font-size:2rem; flex-shrink:0; }
  .pga-flow-step-body { flex:1; }
  .pga-rating-wrap { grid-template-columns:1fr; }
  .pga-ga-thumb { height:120px; }
}
@media (max-width:900px) {
  .pga-tips-grid { grid-template-columns:repeat(2,1fr); }
  .pga-rating-wrap { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:768px) {
  #pga-compare, #pga-poster-layout, #pga-poster-tips, #pga-ga-flow, #pga-ga-rating, #pga-sizes { scroll-margin-top:56px; }
}
`,h=[{name:"三栏经典",desc:"最传统，适合内容丰富的研究。左背景+中方法结果+右结论。",render:()=>`
      <div class="pga-preview-inner" style="flex-direction:column;">
        <div class="pga-block" style="background:rgba(240,178,122,0.25);height:12%;font-size:10px;">Title / Authors</div>
        <div style="display:flex;gap:6px;flex:1;">
          <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
            <div class="pga-block" style="background:rgba(126,200,227,0.2);flex:1;">背景</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
            <div class="pga-block" style="background:rgba(149,213,178,0.2);flex:1;">方法</div>
            <div class="pga-block" style="background:rgba(149,213,178,0.25);flex:2;">结果</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
            <div class="pga-block" style="background:rgba(240,178,122,0.2);flex:2;">结论</div>
            <div class="pga-block" style="background:rgba(255,255,255,0.06);flex:1;font-size:9px;">参考文献</div>
          </div>
        </div>
      </div>
    `},{name:"两栏现代",desc:"视觉流更集中，现代感强。左宽主内容，右窄辅助信息。",render:()=>`
      <div class="pga-preview-inner" style="flex-direction:column;">
        <div class="pga-block" style="background:rgba(240,178,122,0.25);height:12%;font-size:10px;">Title / Authors</div>
        <div style="display:flex;gap:6px;flex:1;">
          <div style="display:flex;flex-direction:column;gap:6px;flex:3;">
            <div class="pga-block" style="background:rgba(126,200,227,0.18);height:28%;font-size:10px;">背景 / 摘要</div>
            <div class="pga-block" style="background:rgba(149,213,178,0.2);flex:1;">方法 + 结果</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex:1.5;">
            <div class="pga-block" style="background:rgba(240,178,122,0.2);flex:1;">结论</div>
            <div class="pga-block" style="background:rgba(255,255,255,0.06);flex:1;font-size:9px;">展望 / 致谢</div>
            <div class="pga-block" style="background:rgba(255,255,255,0.04);flex:1;font-size:9px;">参考文献</div>
          </div>
        </div>
      </div>
    `},{name:"中轴对称",desc:"中间宽主体，两侧窄辅助，平衡感强，视觉效果庄重。",render:()=>`
      <div class="pga-preview-inner" style="flex-direction:column;">
        <div class="pga-block" style="background:rgba(240,178,122,0.25);height:11%;font-size:10px;">Title / Authors</div>
        <div style="display:flex;gap:6px;flex:1;">
          <div style="display:flex;flex-direction:column;gap:6px;width:22%;">
            <div class="pga-block" style="background:rgba(126,200,227,0.2);flex:1;font-size:9px;">背景</div>
            <div class="pga-block" style="background:rgba(255,255,255,0.05);flex:1;font-size:9px;">致谢</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
            <div class="pga-block" style="background:rgba(149,213,178,0.2);height:35%;font-size:10px;">方法</div>
            <div class="pga-block" style="background:rgba(149,213,178,0.28);flex:1;">结果（主图）</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;width:22%;">
            <div class="pga-block" style="background:rgba(240,178,122,0.22);flex:1;font-size:9px;">结论</div>
            <div class="pga-block" style="background:rgba(255,255,255,0.04);flex:1;font-size:9px;">参考</div>
          </div>
        </div>
      </div>
    `},{name:"信息流",desc:"单列蛇形流，适合流程类研究，叙事性强，引导阅读顺序。",render:()=>`
      <div class="pga-preview-inner" style="flex-direction:column;gap:5px;">
        <div class="pga-block" style="background:rgba(240,178,122,0.25);height:9%;font-size:10px;">Title / Authors</div>
        <div class="pga-block" style="background:rgba(126,200,227,0.18);height:13%;font-size:10px;">研究背景与问题</div>
        <div class="pga-block" style="background:rgba(149,213,178,0.2);height:13%;font-size:10px;">研究方法</div>
        <div style="display:flex;gap:5px;flex:1;">
          <div class="pga-block" style="background:rgba(149,213,178,0.28);flex:1;">结果 A</div>
          <div class="pga-block" style="background:rgba(149,213,178,0.22);flex:1;">结果 B</div>
        </div>
        <div class="pga-block" style="background:rgba(240,178,122,0.22);height:12%;font-size:10px;">结论与展望</div>
        <div class="pga-block" style="background:rgba(255,255,255,0.04);height:8%;font-size:9px;">参考文献</div>
      </div>
    `}];function L(){return`
<style>${E}</style>
<div class="page-scroll">

<!-- ─────────────── HERO ─────────────── -->
<section class="section-dark section-hero-full pga-hero" id="pga-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 04 / Page 04</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">学术海报与 GA</h1>
    <p class="page-hero-sub" style="opacity:0;">Poster &amp; Graphical Abstract</p>
    <p class="pga-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
      一页纸的艺术——把完整研究浓缩成一张图
    </p>
    <nav class="hero-quicknav" id="pga-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#pga-compare">海报 vs GA</button>
      <button class="hero-quicknav__item" data-target="#pga-poster-layout">布局模板</button>
      <button class="hero-quicknav__item" data-target="#pga-poster-tips">设计要点</button>
      <button class="hero-quicknav__item" data-target="#pga-ga-flow">GA 流程</button>
      <button class="hero-quicknav__item" data-target="#pga-ga-rating">GA 案例</button>
      <button class="hero-quicknav__item" data-target="#pga-sizes">尺寸速查</button>
    </nav>
    <div class="pga-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ─────────────── S1 海报 vs GA 对比 ─────────────── -->
<section class="section-light" id="pga-compare" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title">海报 vs GA</h2>
      <p class="section-subtitle">同为"一页纸传达研究"，用途与设计策略截然不同</p>
    </div>
    <div class="pga-compare-wrap">
      <!-- 学术海报 -->
      <div class="pga-compare-card">
        <div class="pga-compare-card-header pga-poster-accent"></div>
        <div class="pga-compare-card-title">🖼 学术海报</div>
        <div class="pga-compare-row"><span class="pga-compare-label">典型尺寸</span><span class="pga-compare-value">A0 841×1189mm</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">展示场景</span><span class="pga-compare-value">会议展板区</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">阅读距离</span><span class="pga-compare-value">1–2 米</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">信息密度</span><span class="pga-compare-value">中等</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">文字量</span><span class="pga-compare-value"><strong>800–1000 字</strong></span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">可视元素</span><span class="pga-compare-value">图表 + 文字 + 照片</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">制作工具</span><span class="pga-compare-value">AI / PPT / InDesign</span></div>
      </div>
      <!-- GA -->
      <div class="pga-compare-card">
        <div class="pga-compare-card-header pga-ga-accent"></div>
        <div class="pga-compare-card-title">📊 Graphical Abstract</div>
        <div class="pga-compare-row"><span class="pga-compare-label">典型尺寸</span><span class="pga-compare-value">期刊指定（≤530px 宽）</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">展示场景</span><span class="pga-compare-value">论文在线首图</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">阅读距离</span><span class="pga-compare-value">屏幕上</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">信息密度</span><span class="pga-compare-value">极低</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">文字量</span><span class="pga-compare-value"><strong>&lt;50 字</strong></span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">可视元素</span><span class="pga-compare-value">图标 + 箭头 + 关键数字</span></div>
        <div class="pga-compare-row"><span class="pga-compare-label">制作工具</span><span class="pga-compare-value">AI / PPT / BioRender</span></div>
      </div>
    </div>
  </div>
</section>

<!-- ─────────────── S2 海报布局模板 ─────────────── -->
<section class="section-dark" id="pga-poster-layout" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title" style="color:var(--text-on-dark);">海报布局模板</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">4 种经典结构，按内容类型选择最合适的</p>
    </div>
    <div class="pga-layout-wrap" id="pga-layout-wrap">
      <!-- 左侧列表 -->
      <div class="pga-layout-list" id="pga-layout-list">
        ${h.map((a,t)=>`
        <div class="pga-layout-card${t===0?" pga-layout-active":""}" data-layout-idx="${t}">
          <div class="pga-layout-card-name">${t+1}. ${a.name}</div>
          <div class="pga-layout-card-desc">${a.desc}</div>
        </div>`).join("")}
      </div>
      <!-- 右侧预览 -->
      <div class="pga-layout-preview-col">
        <div class="pga-layout-preview" id="pga-layout-preview">
          ${h[0].render()}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ─────────────── S3 海报设计要点 ─────────────── -->
<section class="section-light" id="pga-poster-tips" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title">海报设计要点</h2>
      <p class="section-subtitle">让你的海报在展板区脱颖而出的 6 条关键原则</p>
    </div>
    <div class="pga-tips-grid">
      <div class="pga-tip-card">
        <div class="pga-tip-num">1</div>
        <div class="pga-tip-title">字号分级</div>
        <div class="pga-tip-body">标题 ≥72pt / 作者 36–48pt / 正文 24–28pt / 注释 18pt。层次分明，一米外看得清。</div>
      </div>
      <div class="pga-tip-card">
        <div class="pga-tip-num">2</div>
        <div class="pga-tip-title">色块分区</div>
        <div class="pga-tip-body">用浅色背景色块区分各 Section，不要用线框。色块让视觉更整洁，线框显得拥挤。</div>
      </div>
      <div class="pga-tip-card">
        <div class="pga-tip-num">3</div>
        <div class="pga-tip-title">图 &gt; 文字</div>
        <div class="pga-tip-body">图表面积占 40–60%，文字精简为要点。观众站在一米外，读不了长段落。</div>
      </div>
      <div class="pga-tip-card">
        <div class="pga-tip-num">4</div>
        <div class="pga-tip-title">阅读流</div>
        <div class="pga-tip-body">设计引导：标题 → 图表 → 结论 → 细节。大多数观众只会用 90 秒浏览你的海报。</div>
      </div>
      <div class="pga-tip-card">
        <div class="pga-tip-num">5</div>
        <div class="pga-tip-title">留白呼吸</div>
        <div class="pga-tip-body">各区块间距 ≥20mm，不要填满每一寸空间。留白不是浪费，是让内容呼吸的空间。</div>
      </div>
      <div class="pga-tip-card">
        <div class="pga-tip-num">6</div>
        <div class="pga-tip-title">打印检查</div>
        <div class="pga-tip-body">CMYK 色彩模式 / 300 dpi / 出血 3mm / 嵌入字体。打印前检查，避免到场翻车。</div>
      </div>
    </div>
  </div>
</section>

<!-- ─────────────── S4 GA 设计流程 ─────────────── -->
<section class="section-dark" id="pga-ga-flow" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title" style="color:var(--text-on-dark);">GA 设计流程</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">从论文到一张图，4 步系统化流程</p>
    </div>
    <div class="pga-flow-wrap" id="pga-flow-wrap">
      <div class="pga-flow-step pga-flow-active" data-step="0">
        <div class="pga-flow-num">1</div>
        <div class="pga-flow-step-body">
          <div class="pga-flow-icon">🎯</div>
          <div class="pga-flow-title">提取核心</div>
          <div class="pga-flow-desc">从论文提炼 1 句核心发现 + 关键方法步骤。把"我们做了什么→发现了什么"压缩成一句话。</div>
        </div>
      </div>
      <div class="pga-flow-arrow">→</div>
      <div class="pga-flow-step" data-step="1">
        <div class="pga-flow-num">2</div>
        <div class="pga-flow-step-body">
          <div class="pga-flow-icon">💡</div>
          <div class="pga-flow-title">选择隐喻</div>
          <div class="pga-flow-desc">用直觉可懂的视觉隐喻：漏斗（筛选）/ 齿轮（机制）/ 路径（流程）/ 箭头（因果）。</div>
        </div>
      </div>
      <div class="pga-flow-arrow">→</div>
      <div class="pga-flow-step" data-step="2">
        <div class="pga-flow-num">3</div>
        <div class="pga-flow-step-body">
          <div class="pga-flow-icon">✏️</div>
          <div class="pga-flow-title">布局草图</div>
          <div class="pga-flow-desc">左到右或上到下的信息流，箭头连接各模块。先在纸上画草图，确定逻辑再开软件。</div>
        </div>
      </div>
      <div class="pga-flow-arrow">→</div>
      <div class="pga-flow-step" data-step="3">
        <div class="pga-flow-num">4</div>
        <div class="pga-flow-step-body">
          <div class="pga-flow-icon">🎨</div>
          <div class="pga-flow-title">配色精修</div>
          <div class="pga-flow-desc">≤3 色，与论文图表配色统一。颜色一致性让 GA 和正文图表形成整体感。</div>
        </div>
      </div>
    </div>
    <div id="pga-flow-detail" style="max-width:680px;margin:var(--space-lg) auto 0;padding:var(--space-md);border-radius:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);min-height:80px;">
      <p style="font-size:14px;color:var(--text-on-dark-2);line-height:1.7;" id="pga-flow-detail-text">从论文提炼 1 句核心发现 + 关键方法步骤。把"我们做了什么→发现了什么"压缩成一句话。</p>
    </div>
  </div>
</section>

<!-- ─────────────── S5 GA 案例评分 ─────────────── -->
<section class="section-light" id="pga-ga-rating" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title">GA 案例评分</h2>
      <p class="section-subtitle">3 种典型水平，看什么是好的 GA，什么需要改进</p>
    </div>
    <div class="pga-rating-wrap">

      <!-- 案例 1：信息过载型 -->
      <div class="pga-rating-card">
        <div class="pga-ga-thumb">
          <!-- 模拟过载的 GA：大量文字小色块 -->
          <div style="flex:1;display:flex;flex-direction:column;gap:4px;overflow:hidden;">
            <div class="pga-ga-block" style="background:#e8e8e8;height:18px;font-size:8px;padding:2px;">Very Long Title Text Here ABC</div>
            <div style="display:flex;gap:3px;flex:1;">
              <div class="pga-ga-block" style="background:#d0d8e8;flex:1;font-size:7px;padding:2px;">Method
Step 1
Detail...</div>
              <div class="pga-ga-arrow" style="font-size:10px;">→</div>
              <div class="pga-ga-block" style="background:#d0e8d8;flex:1;font-size:7px;padding:2px;">Result
Data
Note...</div>
              <div class="pga-ga-arrow" style="font-size:10px;">→</div>
              <div class="pga-ga-block" style="background:#e8d8d0;flex:1;font-size:7px;padding:2px;">Conc.
P=0.001
CI...</div>
            </div>
            <div style="display:flex;gap:2px;">
              <div class="pga-ga-block" style="background:#f0e8c8;flex:1;height:14px;font-size:7px;">Sub A</div>
              <div class="pga-ga-block" style="background:#e8f0c8;flex:1;height:14px;font-size:7px;">Sub B</div>
              <div class="pga-ga-block" style="background:#c8e8f0;flex:1;height:14px;font-size:7px;">Sub C</div>
              <div class="pga-ga-block" style="background:#f0c8e8;flex:1;height:14px;font-size:7px;">Sub D</div>
            </div>
          </div>
        </div>
        <div class="pga-rating-body">
          <div class="pga-rating-title">信息过载型</div>
          <div class="pga-rating-stars" style="color:#f0b27a;">★★<span style="color:#ddd;">☆☆☆</span></div>
          <ul class="pga-rating-points">
            <li class="pga-con">文字过多，缩小版论文</li>
            <li class="pga-con">布局混乱，无视觉焦点</li>
            <li class="pga-con">颜色过杂，超过 5 色</li>
          </ul>
        </div>
      </div>

      <!-- 案例 2：中规中矩型 -->
      <div class="pga-rating-card">
        <div class="pga-ga-thumb">
          <!-- 模拟中等 GA：有图标但逻辑不清 -->
          <div style="flex:1;display:flex;align-items:center;gap:8px;">
            <div class="pga-ga-block" style="background:#dce8f5;width:80px;height:80px;flex-shrink:0;font-size:20px;border-radius:8px;">🔬</div>
            <div style="display:flex;flex-direction:column;gap:4px;align-items:center;">
              <div class="pga-ga-arrow">↓</div>
              <div class="pga-ga-arrow">↑</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;flex:1;">
              <div class="pga-ga-block" style="background:#d8f0e0;flex:1;font-size:18px;">📊</div>
              <div class="pga-ga-block" style="background:#f5e8dc;flex:1;font-size:18px;">📈</div>
            </div>
            <div class="pga-ga-arrow">←</div>
            <div class="pga-ga-block" style="background:#e8dcf0;width:65px;height:80px;flex-shrink:0;font-size:11px;border-radius:8px;padding:4px;">结论<br>文字</div>
          </div>
        </div>
        <div class="pga-rating-body">
          <div class="pga-rating-title">中规中矩型</div>
          <div class="pga-rating-stars" style="color:#f0b27a;">★★★<span style="color:#ddd;">☆☆</span></div>
          <ul class="pga-rating-points">
            <li class="pga-con">逻辑不够清晰</li>
            <li class="pga-con">箭头方向混乱</li>
            <li class="pga-con">颜色偏多（4色）</li>
          </ul>
        </div>
      </div>

      <!-- 案例 3：优秀示范型 -->
      <div class="pga-rating-card pga-best">
        <div class="pga-ga-thumb" style="background:rgba(240,178,122,0.05);">
          <!-- 模拟优质 GA：左→右清晰流程，3色 -->
          <div style="flex:1;display:flex;align-items:center;gap:8px;padding:4px;">
            <div class="pga-ga-block" style="background:#f5ece0;width:72px;height:72px;flex-shrink:0;border-radius:10px;font-size:9px;padding:4px;border:1.5px solid rgba(240,178,122,0.4);">样本<br>输入</div>
            <div class="pga-ga-arrow" style="color:var(--module-4);font-size:20px;font-weight:700;">→</div>
            <div class="pga-ga-block" style="background:#e8f4f0;width:72px;height:72px;flex-shrink:0;border-radius:10px;font-size:9px;padding:4px;border:1.5px solid rgba(149,213,178,0.4);">处理<br>流程</div>
            <div class="pga-ga-arrow" style="color:var(--module-4);font-size:20px;font-weight:700;">→</div>
            <div class="pga-ga-block" style="background:#e8eef5;flex:1;height:72px;border-radius:10px;font-size:11px;border:1.5px solid rgba(126,200,227,0.4);font-weight:700;color:rgba(0,0,0,0.6);">核心<br>发现</div>
          </div>
        </div>
        <div class="pga-rating-body">
          <div class="pga-rating-title">优秀示范型 ✨</div>
          <div class="pga-rating-stars" style="color:#f0b27a;">★★★★★</div>
          <ul class="pga-rating-points">
            <li class="pga-pro">左→右流程清晰</li>
            <li class="pga-pro">3 色配色统一</li>
            <li class="pga-pro">核心发现突出</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- ─────────────── S6 尺寸速查 ─────────────── -->
<section class="section-dark" id="pga-sizes" style="scroll-margin-top:56px;">
  <div class="pga-section-inner">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 class="section-title" style="color:var(--text-on-dark);">尺寸速查</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">打印前必查，避免尺寸/格式不符被退稿</p>
    </div>
    <!-- TabSwitcher 挂载点 -->
    <div id="pga-sizes-tabs"></div>
    <!-- 海报尺寸 -->
    <div id="pga-sizes-content-poster" class="pga-sizes-tab-content pga-tab-active">
      <div class="pga-table-wrap">
        <table class="pga-table">
          <thead><tr><th>用途</th><th>尺寸</th><th>方向</th><th>DPI</th><th>格式</th></tr></thead>
          <tbody>
            <tr><td>国际会议 A0</td><td>841 × 1189 mm</td><td>竖</td><td>300</td><td>PDF</td></tr>
            <tr><td>国际会议横版</td><td>1189 × 841 mm</td><td>横</td><td>300</td><td>PDF</td></tr>
            <tr><td>小型海报 A1</td><td>594 × 841 mm</td><td>竖</td><td>300</td><td>PDF</td></tr>
            <tr><td>电子海报</td><td>1080 × 1920 px</td><td>竖</td><td>72</td><td>PNG / PDF</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- GA 期刊要求 -->
    <div id="pga-sizes-content-ga" class="pga-sizes-tab-content">
      <div class="pga-table-wrap">
        <table class="pga-table">
          <thead><tr><th>期刊</th><th>最大尺寸</th><th>格式</th><th>特殊要求</th></tr></thead>
          <tbody>
            <tr><td>Nature</td><td>180 mm 宽</td><td>TIFF / EPS</td><td>无文字阴影</td></tr>
            <tr><td>Science</td><td>单栏 90mm / 双栏 180mm</td><td>EPS / PDF</td><td>嵌入字体</td></tr>
            <tr><td>Cell</td><td>85 × 85 mm（方形）</td><td>TIFF 300dpi</td><td>白色背景</td></tr>
            <tr><td>Elsevier</td><td>531 × 1328 px</td><td>JPEG / TIFF</td><td>参考子刊要求</td></tr>
            <tr><td>MDPI</td><td>11 × 5 cm</td><td>PNG / TIFF</td><td>简洁风格</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- ─────────────── Footer CTA ─────────────── -->
<section class="section-dark page-footer-cta">
  <div class="flex-col-center" style="text-align:center;max-width:680px;margin:0 auto;">
    <p class="page-footer-num">04 / 04</p>
    <h2 class="page-footer-quote">一张图胜过千言万语——前提是你选对了那张图。</h2>
    <p class="page-footer-desc">恭喜完成全部学术演示设计学习！回到首页探索更多模块。</p>
    <div class="pga-footer-nav">
      <button class="btn btn-ghost" id="pga-btn-prev">← PPT 改造工坊</button>
      <button class="btn btn-primary" id="pga-btn-next">回到首页 →</button>
    </div>
  </div>
</section>

</div>
  `}function C(){const a=r.timeline({delay:.2});a.fromTo(".pga-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),a.fromTo(".pga-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),a.fromTo(".pga-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),a.fromTo(".pga-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),a.fromTo("#pga-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),a.fromTo(".pga-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#pga-quicknav .hero-quicknav__item").forEach(t=>{p(t,"click",()=>{const i=document.querySelector(t.dataset.target);i&&i.scrollIntoView({behavior:"smooth"})})}),s(".pga-compare-wrap .section-header",{y:40,duration:.8}),s(".pga-compare-card",{stagger:.1,y:30,duration:.7}),G(),s("#pga-poster-tips .section-header",{y:40,duration:.8}),s(".pga-tip-card",{stagger:.1,y:30,duration:.6}),I(),s("#pga-ga-flow .section-header",{y:40,duration:.8}),s("#pga-ga-rating .section-header",{y:40,duration:.8}),s(".pga-rating-card",{stagger:.12,y:30,duration:.7}),_(),s(".page-footer-num",{y:20,duration:.7}),s(".page-footer-quote",{y:30,duration:.8}),s(".page-footer-desc",{y:20,duration:.7}),s(".pga-footer-nav",{y:20,duration:.7}),p(document.getElementById("pga-btn-prev"),"click",()=>z("m4-p3")),p(document.getElementById("pga-btn-next"),"click",()=>z("home"))}function G(){const a=document.querySelectorAll(".pga-layout-card"),t=document.getElementById("pga-layout-preview");if(!t)return;s("#pga-poster-layout .section-header",{y:40,duration:.8}),s(".pga-layout-card",{stagger:.1,y:30,duration:.6}),a.forEach(l=>{p(l,"click",()=>{const n=parseInt(l.dataset.layoutIdx,10);n!==m&&(m=n,a.forEach(A=>A.classList.remove("pga-layout-active")),l.classList.add("pga-layout-active"),r.to(t,{opacity:0,duration:.18,ease:"power2.in",onComplete:()=>{t.innerHTML=h[n].render(),r.to(t,{opacity:1,duration:.3,ease:"power2.out"})}}))})});const i=document.getElementById("pga-layout-wrap"),e=t?t.parentElement:null;if(!i||!e)return;let o=!1,d=0,g=0,v=0,f=0,x=window.innerHeight;function w(){x=window.innerHeight,d=i.offsetHeight,g=e.offsetHeight,v=Math.max(0,d-g),f=Math.max(0,(x-g)/2)}function k(){o||(c=requestAnimationFrame(()=>{if(window.innerWidth>768){const l=i.getBoundingClientRect();if(l.top>=f)e.style.transform="translateY(0)";else if(-l.top+x>=d)e.style.transform=`translateY(${v}px)`;else{const n=Math.min(-l.top+f,v);e.style.transform=`translateY(${n}px)`}}else e.style.transform="";o=!1}),o=!0)}requestAnimationFrame(()=>{w()}),p(window,"scroll",k,{passive:!0}),p(window,"resize",()=>{w(),k()})}function I(){const a=['从论文提炼 1 句核心发现 + 关键方法步骤。把"我们做了什么→发现了什么"压缩成一句话。',"用直觉可懂的视觉隐喻：漏斗（筛选）/ 齿轮（机制）/ 路径（流程）/ 箭头（因果）。","左到右或上到下的信息流，箭头连接各模块。先在纸上画草图，确定逻辑再开软件。","≤3 色，与论文图表配色统一。颜色一致性让 GA 和正文图表形成整体感。"],t=document.querySelectorAll(".pga-flow-step"),i=document.getElementById("pga-flow-detail-text");t.forEach(e=>{p(e,"click",()=>{const o=parseInt(e.dataset.step,10);o!==y&&(y=o,t.forEach(d=>d.classList.remove("pga-flow-active")),e.classList.add("pga-flow-active"),i&&r.to(i,{opacity:0,y:5,duration:.15,onComplete:()=>{i.textContent=a[o],r.to(i,{opacity:1,y:0,duration:.3,ease:"power2.out"})}}))})}),s(".pga-flow-step",{stagger:.15,y:30,duration:.7})}function _(){const a=document.getElementById("pga-sizes-tabs");if(!a)return;const t=T(a,{tabs:[{id:"poster",label:"海报尺寸"},{id:"ga",label:"GA 期刊要求"}],activeId:"poster",variant:"default",onChange:i=>{document.querySelectorAll(".pga-sizes-tab-content").forEach(o=>{o.classList.remove("pga-tab-active")});const e=document.getElementById(`pga-sizes-content-${i}`);e&&r.fromTo(e,{opacity:0,y:10},{opacity:1,y:0,duration:.4,ease:"power2.out",onStart:()=>{e.classList.add("pga-tab-active")}})}});u.push(t),s("#pga-sizes .section-header",{y:40,duration:.8}),s("#pga-sizes-tabs",{y:30,duration:.6})}function B(){b.forEach(({el:a,type:t,fn:i,opts:e})=>a.removeEventListener(t,i,e)),b=[],u.forEach(a=>a.destroy()),u=[],c&&(cancelAnimationFrame(c),c=null),m=0,y=0,S()}export{B as destroy,C as init,L as render};
