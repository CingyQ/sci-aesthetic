import{k as T,g as L,f as g}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as w}from"./index-B3B88WEn.js";let k=[],h=[];function B(){return`<div class="page-scroll">
<style>
/* ── M2 全局占位符样式（仅在 p01 中声明） ── */
.m2-placeholder { background: linear-gradient(135deg,#2d2d4a 0%,#1a1a2e 100%); border:1px dashed rgba(184,184,232,0.3); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; min-height:200px; }
.m2-placeholder-inner { text-align:center; padding:var(--space-md); }
.m2-ph-icon { font-size:2.5rem; margin-bottom:var(--space-sm); opacity:0.6; }
.m2-ph-label { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
.m2-ph-desc { color:var(--text-on-dark-2); font-size:var(--text-caption); margin-top:6px; max-width:240px; }
/* ── p01 hero 光晕 ── */
.p01-hero { position:relative; overflow:hidden; align-items:center; }
.p01-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 30% 40%, rgba(184,184,232,0.15) 0%, transparent 70%); animation:p01-drift-a 12s ease-in-out infinite; pointer-events:none; }
.p01-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 70% 65%, rgba(126,200,227,0.1) 0%, transparent 70%); animation:p01-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p01-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
@keyframes p01-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,25px)} }
.p01-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p01-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p01-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
/* 双时间线 */
.p01-tl-wrap { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xl); max-width:900px; margin:0 auto; }
.p01-tl-col { display:flex; flex-direction:column; }
.p01-tl-header { text-align:center; padding-bottom:var(--space-md); border-bottom:1px solid var(--border-dark); margin-bottom:var(--space-md); }
.p01-tl-step { display:flex; gap:var(--space-sm); padding:var(--space-sm) 0; opacity:0.2; transition:opacity 0.5s ease; }
.p01-tl-step.active { opacity:1; }
.p01-tl-step-num { width:36px; height:36px; border-radius:50%; border:1.5px solid var(--border-dark); display:flex; align-items:center; justify-content:center; font-size:11px; font-family:var(--font-code); flex-shrink:0; transition:all 0.4s; }
.p01-tl-step.active .p01-tl-step-num { border-color:var(--module-2); background:rgba(184,184,232,0.12); color:var(--module-2); }
.p01-tl-step-title { font-weight:600; font-size:0.95rem; color:var(--text-on-dark); }
.p01-tl-badges { display:flex; gap:6px; flex-wrap:wrap; margin-top:4px; }
.p01-badge { padding:2px 8px; border-radius:var(--radius-full); font-size:0.7rem; }
.p01-badge-time { background:rgba(240,210,100,0.15); color:#F0D264; }
.p01-badge-skill { background:rgba(184,184,232,0.1); color:var(--module-2); }
.p01-tl-connector { width:2px; background:var(--border-dark); height:16px; margin-left:17px; }
/* 场景判断器 */
.p01-quiz-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:var(--space-md); max-width:960px; margin:0 auto; }
.p01-quiz-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-light); }
.p01-quiz-scene { font-size:0.95rem; color:var(--text-on-light); line-height:1.6; margin-bottom:var(--space-sm); font-weight:500; }
.p01-quiz-btns { display:flex; gap:8px; flex-wrap:wrap; }
.p01-quiz-btn { padding:8px 14px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; font-size:0.78rem; cursor:pointer; transition:all 0.2s; min-height:36px; font-family:var(--font-heading); color:var(--text-on-light-2); }
.p01-quiz-btn:hover { background:var(--bg-light-alt,#f5f5f7); }
.p01-quiz-btn.selected-correct { background:#22c55e18; border-color:#22c55e; color:#15803d; font-weight:600; }
.p01-quiz-btn.selected-wrong { background:#ef444418; border-color:#ef4444; color:#dc2626; }
.p01-quiz-btn.reveal-correct { background:#22c55e10; border-color:#22c55e80; color:#15803d; }
.p01-quiz-result { margin-top:var(--space-sm); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.83rem; line-height:1.6; display:none; }
.p01-quiz-result.show { display:block; }
.p01-quiz-result.ok { background:#22c55e12; border-left:3px solid #22c55e; color:#166534; }
.p01-quiz-result.bad { background:#ef444412; border-left:3px solid #ef4444; color:#991b1b; }
/* 能力矩阵 */
.p01-matrix-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
.p01-matrix-table { border-collapse:collapse; min-width:500px; }
.p01-matrix-table th { padding:10px 16px; font-size:0.8rem; font-weight:600; color:var(--text-on-dark-2); text-align:center; white-space:nowrap; }
.p01-matrix-table td { padding:8px; text-align:center; }
.p01-matrix-cell { width:56px; height:40px; border-radius:10px; display:inline-flex; align-items:center; justify-content:center; font-size:1rem; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
.p01-matrix-cell:hover { transform:scale(1.2); box-shadow:0 4px 12px rgba(0,0,0,0.3); }
.p01-matrix-cell.s2 { background:rgba(34,197,94,0.18); }
.p01-matrix-cell.s1 { background:rgba(234,179,8,0.18); }
.p01-matrix-cell.s0 { background:rgba(107,114,128,0.12); }
.p01-tool-label { text-align:left; padding:8px 14px; font-size:0.85rem; color:var(--text-on-dark); font-weight:500; white-space:nowrap; }
.p01-matrix-tooltip { position:fixed; background:var(--bg-dark-elevated); color:var(--text-on-dark); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.8rem; max-width:220px; line-height:1.5; pointer-events:none; z-index:999; display:none; border:1px solid var(--border-dark); box-shadow:0 8px 32px rgba(0,0,0,0.5); }
/* 展示切换 */
.p01-sc-tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:var(--space-lg); }
.p01-sc-tab { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid rgba(184,184,232,0.25); background:transparent; color:var(--text-on-light-2); font-size:0.85rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); }
.p01-sc-tab:hover { border-color:var(--module-2); color:var(--text-on-light); }
.p01-sc-tab.active { background:rgba(184,184,232,0.1); border-color:var(--module-2); color:var(--module-2); font-weight:600; }
.p01-sc-panel { display:none; }
.p01-sc-panel.active { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:start; }
.p01-sc-prompt-box { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-dark); }
.p01-sc-prompt-box h4 { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p01-sc-prompt-box pre { font-family:var(--font-code); font-size:0.8rem; color:var(--text-on-dark-2); line-height:1.7; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
.p01-sc-review { margin-top:var(--space-sm); padding:12px 14px; background:rgba(184,184,232,0.06); border-radius:var(--radius-sm); border-left:3px solid var(--module-2); font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.6; }
/* 响应式 */
@media (max-width:900px) {
  .p01-tl-wrap { grid-template-columns:1fr; gap:var(--space-lg); }
  .p01-sc-panel.active { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  .p01-quiz-grid { grid-template-columns:1fr; }
  .p01-sc-tabs { gap:6px; }
  .p01-sc-tab { padding:8px 14px; font-size:0.78rem; }
  #p01-s1, #p01-s2, #p01-s3, #p01-s4 { scroll-margin-top:56px; }
}
</style>

<!-- HERO -->
<section class="section-dark section-hero-full p01-hero" id="p01-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 01</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">AI 与科研绘图：新范式</h1>
    <p class="page-hero-sub" style="opacity:0;">AI-Assisted Scientific Visualization: A New Paradigm</p>
    <p class="p01-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">AI 改变的不只是速度，而是从"画"到"描述 + 迭代"的思维方式</p>
    <nav class="hero-quicknav" id="p01-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p01-s1">范式转变</button>
      <button class="hero-quicknav__item" data-target="#p01-s2">能力边界</button>
      <button class="hero-quicknav__item" data-target="#p01-s3">工具生态</button>
      <button class="hero-quicknav__item" data-target="#p01-s4">案例展示</button>
    </nav>
    <div class="p01-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- S1: 范式转变 双时间线 -->
<section class="section-dark" id="p01-s1" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">工作流对比</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">不是 AI 更快，而是思维方式的根本转变</p>
    </div>
    <div class="p01-tl-wrap" id="p01-tl-wrap">
      <div class="p01-tl-col" id="p01-tl-trad">
        <div class="p01-tl-header">
          <h3 style="font-size:var(--text-heading);font-weight:600;color:var(--text-on-dark);">传统科研绘图</h3>
          <p style="color:var(--text-on-dark-3);font-size:0.85rem;margin-top:4px;">软件驱动，操作优先</p>
        </div>
        <!-- steps injected by JS -->
      </div>
      <div class="p01-tl-col" id="p01-tl-ai">
        <div class="p01-tl-header">
          <h3 style="font-size:var(--text-heading);font-weight:600;color:var(--module-2);">AI 辅助绘图</h3>
          <p style="color:var(--text-on-dark-3);font-size:0.85rem;margin-top:4px;">描述驱动，迭代为主</p>
        </div>
        <!-- steps injected by JS -->
      </div>
    </div>
  </div>
</section>

<!-- S2: 能力边界 场景判断器 -->
<section class="section-light" id="p01-s2" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">能力边界判断</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">点击判断每个场景是否适合使用 AI 辅助绘图</p>
    </div>
    <div class="p01-quiz-grid" id="p01-quiz-grid"></div>
  </div>
</section>

<!-- S3: 工具生态 能力矩阵 -->
<section class="section-dark" id="p01-s3" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">工具生态速览（2026）</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">按任务类型理解各工具的能力边界</p>
    </div>
    <div class="p01-matrix-wrap"><div id="p01-matrix"></div></div>
    <div id="p01-tooltip" class="p01-matrix-tooltip"></div>
  </div>
</section>

<!-- S4: 案例展示 -->
<section class="section-light" id="p01-s4" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">环境科学 AI 绘图展示</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">5 个真实环境科学场景，使用 Nano Banana 生成（占位符版本）</p>
    </div>
    <div class="p01-sc-tabs" id="p01-sc-tabs"></div>
    <div id="p01-sc-panels"></div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta">
  <p class="page-footer-num">01 / 06</p>
  <h2 class="page-footer-quote">AI 不会取代科研绘图，但会用 AI 的人会</h2>
  <p class="page-footer-desc">接下来学习如何写出高质量的 Prompt，让 AI 真正理解你的科学意图。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p01-prev-btn">← 科研绘图工作流</button>
    <button class="btn-primary" id="p01-next-btn">Prompt 的艺术 →</button>
  </div>
</section>
</div>`}function O(){const o=L.timeline({delay:.2});o.fromTo("#p01-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),o.fromTo("#p01-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),o.fromTo("#p01-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),o.fromTo(".p01-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),o.fromTo("#p01-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),o.fromTo(".p01-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p01-quicknav .hero-quicknav__item").forEach(t=>{t.addEventListener("click",()=>{document.querySelector(t.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})});const u=[{n:"01",title:"手绘草稿",time:"~30 min",skill:"纸笔构思"},{n:"02",title:"软件建图",time:"~2 hr",skill:"Illustrator/PPT"},{n:"03",title:"配色调试",time:"~45 min",skill:"色彩审美"},{n:"04",title:"标注排版",time:"~1 hr",skill:"版式设计"},{n:"05",title:"格式导出",time:"~20 min",skill:"技术参数"},{n:"06",title:"反复修改",time:"循环多次",skill:"耐心"}],z=[{n:"01",title:"CDTF 描述撰写",time:"~15 min",skill:"科学表达"},{n:"02",title:"AI 生成初稿",time:"~2 min",skill:"Prompt 迭代"},{n:"03",title:"迭代精修",time:"~30 min",skill:"审美判断"},{n:"04",title:"矢量化后处理",time:"~45 min",skill:"Illustrator"}];function f(t,a){const e=document.getElementById(t);e&&a.forEach((r,s)=>{const n=document.createElement("div");if(n.className="p01-tl-step",n.dataset.tlIdx=s,n.innerHTML=`<div class="p01-tl-step-num">${r.n}</div>
        <div style="flex:1;"><div class="p01-tl-step-title">${r.title}</div>
        <div class="p01-tl-badges"><span class="p01-badge p01-badge-time">${r.time}</span><span class="p01-badge p01-badge-skill">${r.skill}</span></div>
        </div>`,e.appendChild(n),s<a.length-1){const l=document.createElement("div");l.className="p01-tl-connector",e.appendChild(l)}})}f("p01-tl-trad",u),f("p01-tl-ai",z),document.querySelectorAll("#p01-s1 .p01-tl-step").forEach(t=>{const a=new IntersectionObserver(([e])=>{e.isIntersecting&&(t.classList.add("active"),a.disconnect())},{threshold:.4});a.observe(t),h.push(a)}),g(document.querySelectorAll("#p01-s1 .reading-wrapper"),{stagger:.1,y:30});const b=[{scene:"为论文 Figure 1 绘制散点图（数据精确）",answer:"no",reason:"精确数据图必须用 R/Python，AI 无法保证数值准确性，会造成数据不可信。"},{scene:'为综述绘制"气候变化影响链"概念示意图',answer:"yes",reason:"概念图无精确数值要求，AI 擅长此类可视化，快速生成合适构图。"},{scene:"将 R 生成的箱线图配色优化为色盲友好方案",answer:"assist",reason:"AI 可建议配色方案和 HEX 值，但最终仍需在 R 中用 scale_color 手动应用。"},{scene:'绘制"样品采集→提取→测序→分析"实验流程图',answer:"yes",reason:"流程图是 AI 图解的强项，Mermaid AI 或通用图像生成均适用。"},{scene:"制作期刊封面图（河流生态系统艺术渲染）",answer:"assist",reason:"AI 生成封面图需编辑批准，且必须在文章中声明使用了 AI 辅助。"},{scene:"在 Figure 3 热力图上添加统计显著性星号标注",answer:"no",reason:"标注基于统计结果，必须源自实际分析数据，不能由 AI 生成。"},{scene:'绘制"碳循环与生态系统服务"综述框架图',answer:"yes",reason:"框架图是 AI 辅助的理想场景，可快速迭代视觉层次和隐喻。"},{scene:"将模型预测时间序列绘制为折线图并加置信带",answer:"no",reason:"需要真实数据驱动图表生成，R/Python 是唯一可靠路径。"}],E={yes:"✅ 该用 AI",no:"❌ 不该用",assist:"⚡ AI 辅助"},d=document.getElementById("p01-quiz-grid");d&&(b.forEach((t,a)=>{const e=document.createElement("div");e.className="p01-quiz-card",e.innerHTML=`<p class="p01-quiz-scene">${t.scene}</p>
        <div class="p01-quiz-btns">
          ${["yes","no","assist"].map(r=>`<button class="p01-quiz-btn" data-k="${r}" data-correct="${t.answer}">${E[r]}</button>`).join("")}
        </div>
        <div class="p01-quiz-result" id="p01-qr-${a}"></div>`,d.appendChild(e)}),d.addEventListener("click",t=>{const a=t.target.closest(".p01-quiz-btn");if(!a||a.disabled)return;const e=a.closest(".p01-quiz-card"),r=a.dataset.correct,s=a.dataset.k,n=[...d.children].indexOf(e),l=document.getElementById(`p01-qr-${n}`);e.querySelectorAll(".p01-quiz-btn").forEach(c=>{c.disabled=!0,c.dataset.k===r&&c!==a&&c.classList.add("reveal-correct")}),a.classList.add(s===r?"selected-correct":"selected-wrong");const p=s===r;l.textContent=(p?"✓ 正确！":"✗ 错误。")+" "+b[n].reason,l.className=`p01-quiz-result show ${p?"ok":"bad"}`})),g(document.querySelectorAll("#p01-s2 .reading-wrapper, #p01-s2 .p01-quiz-card"),{stagger:.07,y:30});const S=["GPT Image 1.5","Midjourney v7","FLUX 1.1 Pro","Recraft V3 SVG","StarVector","Mermaid AI","Nano Banana"],x=["概念示意图","流程图","数据图辅助","图标/素材"],A=[[2,1,0,2],[2,0,0,2],[2,0,0,2],[2,1,1,2],[1,2,0,1],[0,2,0,0],[2,1,0,2]],q=[["优秀的概念图生成，风格多样","能生成流程图但精确度有限","不建议生成精确数据图","可生成精美图标"],["艺术风格强，适合综述封面","不擅长结构化流程图","不适合","高质量图标素材"],["开源强模型，科学图示质量优秀","不擅长","不适合","高质量图标素材"],["支持SVG直出，概念图效果佳","可生成简单流程图SVG","有限支持，仍需处理","直接输出矢量，最适合图标"],["专注位图转矢量，概念图能力有限","擅长转换流程图为SVG","不适合","可将位图图标转矢量"],["不适合非结构化概念图","最强流程图工具，自然语言→可编辑图","不适合","不适合"],["基于 Gemini 模型，特别擅长环境科学场景概念图生成，本项目主要使用工具","可生成结构化流程图，结果稳定可控","不适合生成含精确数值的数据图表","可生成高质量科研图标和场景素材"]],I=["❌","⚠️","✅"],y=document.getElementById("p01-matrix"),i=document.getElementById("p01-tooltip");if(y){const t=document.createElement("table");t.className="p01-matrix-table",t.innerHTML=`<thead><tr><th style="text-align:left;min-width:140px;">工具</th>${x.map(e=>`<th>${e}</th>`).join("")}</tr></thead>`;const a=document.createElement("tbody");S.forEach((e,r)=>{const s=document.createElement("tr");s.innerHTML=`<td class="p01-tool-label">${e}</td>`+x.map((n,l)=>{const p=A[r][l],c=q[r]?.[l]||"";return`<td><div class="p01-matrix-cell s${p}" data-info="${e} × ${n}：${c}">${I[p]}</div></td>`}).join(""),a.appendChild(s)}),t.appendChild(a),y.appendChild(t),i&&(t.addEventListener("mouseover",e=>{const r=e.target.closest(".p01-matrix-cell");r&&(i.textContent=r.dataset.info,i.style.display="block")}),t.addEventListener("mousemove",e=>{i.style.left=e.clientX+14+"px",i.style.top=e.clientY+14+"px"}),t.addEventListener("mouseleave",()=>{i.style.display="none"}),t.addEventListener("click",e=>{const r=e.target.closest(".p01-matrix-cell");r&&(i.textContent=r.dataset.info,i.style.display="block",setTimeout(()=>{i.style.display="none"},3e3))}))}g(document.querySelectorAll("#p01-s3 .reading-wrapper, #p01-matrix"),{stagger:.15,y:30});const C=[{id:"water",label:"水污染处理工艺",img:"assets/m2/p01-s4-01-water.png",desc:"城市污水从进水到达标排放的完整处理流程，包含物化和生化处理单元",prompt:`Environmental engineering process diagram, tech blue color scheme, white background.
Topic: Urban wastewater treatment process flow.
Layout: left-to-right linear flow with 7 nodes:
① Influent Screen → ② Grit Chamber (HRT 15 min) → ③ Primary Clarifier (SS removal 60%)
→ ④ Aeration Tank / Activated Sludge (BOD removal 92%) → ⑤ Secondary Clarifier (sludge recycle)
→ ⑥ Filtration + UV Disinfection → ⑦ Effluent Discharge (GB18918 Class 1A).
Each node has a professional icon. Thick blue arrows between nodes.
Inlet: COD 350 mg/L, SS 280 mg/L. Outlet: COD ≤50 mg/L.
Bottom branch: sludge treatment (Thickening → Digestion → Dewatering → Disposal).
Style: clean English labels, white background, vector-art style, #1a5276 / #27ae60 palette.`},{id:"carbon",label:"碳循环机制",img:"assets/m2/p01-s4-02-carbon.png",desc:"森林生态系统碳固存与释放的自然循环机制，含大气-植物-土壤三界面",prompt:`Ecosystem conceptual diagram, natural science style, green-brown palette.
Topic: Carbon cycle in a temperate forest ecosystem.
Scene: horizontal cross-section — left: atmosphere, center: tall broadleaf trees, right: soil profile.
Carbon flux arrows (width proportional to magnitude):
• Atmosphere CO₂ (415 ppm) → Photosynthesis → Plant biomass (GPP = 120 GtC/yr)
• Plant Respiration → Atmosphere (60 GtC/yr)
• Litterfall → Soil Organic Carbon (SOC)
• Microbial Decomposition → Atmosphere (60 GtC/yr)
• Net Ecosystem Production NEP = 2.6 GtC/yr (net carbon sink)
Soil layers labeled: 0–20 cm (humus), 20–60 cm (mineral), >60 cm (parent material).
Style: naturalistic green vegetation, brown soil, flux values annotated on each arrow.`},{id:"remote",label:"遥感分析 Pipeline",img:"assets/m2/p01-s4-03-remote.png",desc:"从卫星获取影像到最终地表分类结果的技术分析流程",prompt:`Technical flowchart, dark blue-purple tech style (dark background #1a1a2e, light text).
Topic: Remote sensing image land cover classification workflow.
Vertical flow (top to bottom), 7 steps:
① Satellite Image Acquisition (Landsat-9 / Sentinel-2)
→ ② Atmospheric Correction (6S model / FLAASH, aerosol removal)
→ ③ Geometric Rectification (RMS < 0.5 pixel)
→ ④ Feature Extraction (NDVI, EVI, MNDWI, texture)
→ ⑤ Random Forest Classification (OOB accuracy 94.2%)
→ ⑥ Accuracy Assessment (confusion matrix, Kappa = 0.91)
→ ⑦ Thematic Map Output (6 classes: Forest / Grassland / Cropland / Water / Urban / Bare)
Each step in a rounded rectangle with small icon. Tools annotated: ENVI / Google Earth Engine.`},{id:"micro",label:"微塑料迁移路径",img:"assets/m2/p01-s4-04-micro.png",desc:"微塑料从塑料制品源头经陆地-水体传输到达海洋的完整迁移过程",prompt:`Environmental science diagram, blue-green palette, natural style, white background.
Topic: Microplastic migration pathway from terrestrial sources to deep ocean.
Scene: wide horizontal landscape cross-section (left shore to right deep sea).
Left zone — Urban source: buildings, plastic waste, factory discharge.
Center zone — Terrestrial transport: weathering/fragmentation → surface runoff
  → soil infiltration → groundwater → river transport.
Right zone — Marine accumulation: estuarine convergence → surface water floating
  → settling to deep-sea sediment.
Annotations: microplastic size categories (<1 mm, 1–5 mm, nano), 5 sampling hotspots (star markers).
Blue-green gradient from land to ocean. Microplastics shown as orange particles.`},{id:"eco",label:"生态系统服务评估",img:"assets/m2/p01-s4-05-eco.png",desc:"森林生态系统提供调节/供给/文化/支撑四类服务及其价值框架",prompt:`Academic framework diagram, green color theme, white background.
Topic: Forest Ecosystem Services Valuation Framework.
Layout: four-quadrant design with concentric elements, center shows forest ecosystem icon.
Four quadrants:
① Provisioning Services (top-left, light green): Timber, Freshwater, Food, Genetic resources
② Regulating Services (top-right, dark green): Carbon sequestration, Climate regulation,
   Hydrological regulation, Air purification
③ Cultural Services (bottom-right, cyan-green): Recreation & tourism, Research & education,
   Spiritual & aesthetic values
④ Supporting Services (bottom-left, olive green): Soil formation, Nutrient cycling,
   Primary production, Biodiversity
Outer ring: service flow arrows to society, annotated total value $12,100/ha/yr.`}],m=document.getElementById("p01-sc-tabs"),v=document.getElementById("p01-sc-panels");m&&v&&(C.forEach((t,a)=>{const e=document.createElement("button");e.className=`p01-sc-tab${a===0?" active":""}`,e.textContent=t.label,e.dataset.idx=a,m.appendChild(e);const r=document.createElement("div");r.className=`p01-sc-panel${a===0?" active":""}`,r.id=`p01-panel-${a}`,r.innerHTML=`
        <img src="/sci-aesthetic/${t.img}" alt="${t.label}" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
        <div>
          <div class="p01-sc-prompt-box">
            <h4>Prompt</h4>
            <pre>${t.prompt}</pre>
          </div>
        </div>`,v.appendChild(r)}),m.addEventListener("click",t=>{const a=t.target.closest(".p01-sc-tab");a&&(m.querySelectorAll(".p01-sc-tab").forEach(e=>e.classList.remove("active")),v.querySelectorAll(".p01-sc-panel").forEach(e=>e.classList.remove("active")),a.classList.add("active"),document.getElementById(`p01-panel-${a.dataset.idx}`)?.classList.add("active"))})),g(document.querySelectorAll("#p01-s4 .reading-wrapper, #p01-sc-tabs"),{stagger:.1,y:30}),document.getElementById("p01-prev-btn")?.addEventListener("click",()=>w("m1-p10")),document.getElementById("p01-next-btn")?.addEventListener("click",()=>w("m2-p2"))}function R(){T(),k.forEach(({fn:o,el:u})=>(u||window).removeEventListener("scroll",o)),k=[],h.forEach(o=>o.disconnect()),h=[]}export{R as destroy,O as init,B as render};
