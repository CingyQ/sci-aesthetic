import{k as M,g as L,f as g}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as $}from"./index-BTO2Mx9C.js";let v=[],F=[];function n(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function H(){return`<div class="page-scroll">
<style>
/* p02 hero 光晕 */
.p02-hero { position:relative; overflow:hidden; align-items:center; }
.p02-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 45% at 25% 35%, rgba(184,184,232,0.18) 0%, transparent 65%); animation:p02-drift-a 11s ease-in-out infinite; pointer-events:none; }
.p02-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 45% 55% at 75% 60%, rgba(95,210,190,0.1) 0%, transparent 65%); animation:p02-drift-b 8s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p02-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-18px)} }
@keyframes p02-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,20px)} }
.p02-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p02-float 2s ease-in-out infinite; margin-top:var(--space-sm); }
@keyframes p02-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* S1 CDTF 粘性滚动 */
.p02-cdtf-body { display:flex; align-items:flex-start; position:relative; gap:var(--space-xl); max-width:1100px; margin:0 auto; }
.p02-cdtf-left { width:45%; flex-shrink:0; will-change:transform; }
.p02-cdtf-right { flex:1; min-width:0; }
.p02-cdtf-prompt-box { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-dark); position:relative; }
.p02-cdtf-prompt-box h3 { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p02-prompt-text { font-family:var(--font-code); font-size:0.82rem; line-height:1.85; white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
.p02-seg { color:var(--text-on-dark-3); transition:color 0.4s, background 0.4s; border-radius:4px; padding:0 2px; }
.p02-seg.active { color:var(--text-on-dark); background:rgba(184,184,232,0.12); }
.p02-cdtf-panel { min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:var(--space-2xl) 0; opacity:0.3; transition:opacity 0.4s; }
.p02-cdtf-panel.active { opacity:1; }
.p02-cdtf-panel h2 { font-family:var(--font-display); font-size:var(--text-title); font-weight:700; letter-spacing:-0.02em; color:var(--text-on-dark); margin-bottom:var(--space-md); }
.p02-cdtf-panel-label { font-size:clamp(3rem,6vw,5rem); font-weight:700; color:var(--module-2); opacity:0.2; font-family:var(--font-display); line-height:1; margin-bottom:var(--space-sm); }
.p02-cdtf-panel p { color:var(--text-on-dark-2); font-size:var(--text-body); line-height:1.8; max-width:480px; }
.p02-cdtf-panel ul { color:var(--text-on-dark-2); font-size:0.9rem; line-height:2; list-style:none; padding:0; }
.p02-cdtf-panel ul li::before { content:'→ '; color:var(--module-2); }
.p02-cdtf-tip { margin-top:var(--space-md); padding:12px 16px; background:rgba(184,184,232,0.08); border-radius:var(--radius-sm); border-left:3px solid var(--module-2); font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.6; }

/* S2 好差对比 */
.p02-compare-grid { display:flex; flex-direction:column; gap:var(--space-2xl); max-width:960px; margin:0 auto; }
.p02-compare-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-light); }
.p02-compare-card h3 { font-size:var(--text-heading); font-weight:700; color:var(--text-on-light); margin-bottom:var(--space-md); font-family:var(--font-display); }
.p02-compare-row { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); }
.p02-compare-col h4 { font-size:var(--text-small); font-weight:700; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p02-bad-label { color:#ef4444; }
.p02-good-label { color:#22c55e; }
.p02-compare-img { border-radius:var(--radius-md); overflow:hidden; margin-bottom:var(--space-md); }
.p02-prompt-diff { background:var(--bg-dark-elevated); border-radius:var(--radius-sm); padding:var(--space-md); font-family:var(--font-code); font-size:0.8rem; line-height:1.8; white-space:pre-wrap; word-wrap:break-word; }
.p02-diff-del { color:#ef4444; text-decoration:line-through; background:rgba(239,68,68,0.08); }
.p02-diff-add { color:#22c55e; background:rgba(34,197,94,0.08); }
.p02-diff-keep { color:var(--text-on-dark-3); }

/* S3 迭代时间线 */
.p02-iter-track { display:flex; gap:var(--space-md); overflow-x:auto; padding-bottom:var(--space-md); -webkit-overflow-scrolling:touch; scrollbar-width:thin; }
.p02-iter-item { flex:0 0 200px; cursor:pointer; }
.p02-iter-thumb { border-radius:var(--radius-md); overflow:hidden; border:2px solid var(--border-dark); transition:border-color 0.2s, transform 0.2s; margin-bottom:var(--space-sm); }
.p02-iter-item:hover .p02-iter-thumb { border-color:var(--module-2); transform:translateY(-3px); }
.p02-iter-item.active .p02-iter-thumb { border-color:var(--module-2); }
.p02-iter-ver { font-family:var(--font-code); font-size:var(--text-caption); color:var(--module-2); font-weight:600; margin-bottom:4px; }
.p02-iter-label { font-size:0.85rem; color:var(--text-on-dark-2); font-weight:500; }
.p02-iter-detail { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-lg); margin-top:var(--space-lg); border:1px solid var(--border-dark); }
.p02-iter-detail h3 { color:var(--text-on-dark); font-size:var(--text-heading); font-weight:700; margin-bottom:var(--space-md); }
.p02-iter-detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); }
.p02-iter-change { background:rgba(184,184,232,0.06); border-radius:var(--radius-sm); padding:var(--space-md); border-left:3px solid var(--module-2); }
.p02-iter-change h4 { color:var(--module-2); font-size:var(--text-small); font-weight:600; margin-bottom:8px; }
.p02-iter-change p { color:var(--text-on-dark-2); font-size:0.85rem; line-height:1.7; }

/* S4 模板库 */
.p02-browser-layout { display:flex; gap:var(--space-lg); align-items:flex-start; }
.p02-browser-left { flex:0 0 38%; max-height:600px; overflow-y:auto; -webkit-overflow-scrolling:touch; border-radius:var(--radius-md); border:1px solid var(--border-light); }
.p02-browser-right { flex:1; min-width:0; position:sticky; top:var(--space-lg); }
.p02-tpl-item { padding:var(--space-md); border-bottom:1px solid var(--border-light); cursor:pointer; transition:background 0.2s; }
.p02-tpl-item:hover { background:var(--bg-light-alt,#f5f5f7); }
.p02-tpl-item.active { background:rgba(184,184,232,0.08); border-left:3px solid var(--module-2); }
.p02-tpl-icon { font-size:1.5rem; margin-bottom:4px; }
.p02-tpl-label { font-weight:600; font-size:0.95rem; color:var(--text-on-light); }
.p02-tpl-desc { font-size:0.8rem; color:var(--text-on-light-2); margin-top:2px; }
.p02-tpl-preview { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-lg); border:1px solid var(--border-dark); }
.p02-tpl-preview h3 { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.06em; text-transform:uppercase; margin-bottom:var(--space-md); }
.p02-tpl-structure { background:var(--bg-dark); border-radius:var(--radius-sm); padding:var(--space-md); font-family:var(--font-code); font-size:0.8rem; color:var(--text-on-dark-2); line-height:1.9; white-space:pre-wrap; word-wrap:break-word; margin-bottom:var(--space-md); border:1px solid var(--border-dark); }
.p02-tpl-placeholder { color:var(--module-2); }
.p02-tpl-example-label { color:var(--text-on-dark-3); font-size:var(--text-caption); font-weight:600; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p02-tpl-example { background:var(--bg-dark); border-radius:var(--radius-sm); padding:var(--space-md); font-family:var(--font-code); font-size:0.78rem; color:var(--text-on-dark-3); line-height:1.8; white-space:pre-wrap; word-wrap:break-word; border:1px solid var(--border-dark); margin-bottom:var(--space-md); }
.p02-copy-btn { padding:10px 20px; border-radius:var(--radius-full); background:var(--module-2); color:#1d1d1f; border:none; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.2s; min-height:40px; font-family:var(--font-heading); }
.p02-copy-btn:hover { opacity:0.85; }
.p02-copy-btn.copied { background:#22c55e; color:#fff; }

/* 响应式 */
@media (max-width:900px) {
  .p02-cdtf-body { flex-direction:column; }
  .p02-cdtf-left { width:100%; transform:none !important; }
  .p02-cdtf-panel { min-height:auto; opacity:1; padding:var(--space-lg) 0; }
  .p02-compare-row { grid-template-columns:1fr; }
  .p02-iter-detail-grid { grid-template-columns:1fr; }
  .p02-browser-layout { flex-direction:column; }
  .p02-browser-left { flex:none; width:100%; max-height:320px; }
  .p02-browser-right { position:static; }
}
@media (max-width:768px) {
  #p02-s1, #p02-s2, #p02-s3, #p02-s4 { scroll-margin-top:56px; }
  .p02-iter-track { gap:var(--space-sm); }
  .p02-iter-item { flex:0 0 160px; }
}
</style>

<!-- HERO -->
<section class="section-dark section-hero-full p02-hero" id="p02-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 02</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">从想法到图像：Prompt 的艺术</h1>
    <p class="page-hero-sub" style="opacity:0;">The Art of Prompting: From Idea to Image</p>
    <p class="p02-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">掌握 CDTF 四要素，让 AI 真正理解你的科学意图</p>
    <nav class="hero-quicknav" id="p02-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p02-s1">CDTF 解剖</button>
      <button class="hero-quicknav__item" data-target="#p02-s2">好差对比</button>
      <button class="hero-quicknav__item" data-target="#p02-s3">迭代工作流</button>
      <button class="hero-quicknav__item" data-target="#p02-s4">模板库</button>
    </nav>
    <div class="p02-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- S1: CDTF 粘性滚动 -->
<section class="section-dark" id="p02-s1" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-xl);">
  <div class="content-wrapper" style="margin-bottom:var(--space-2xl);">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">CDTF Prompt 解剖</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">一个高质量科研 Prompt 的四个核心要素</p>
    </div>
    <div class="p02-cdtf-body" id="p02-cdtf-body">
      <div class="p02-cdtf-left" id="p02-cdtf-left">
        <div class="p02-cdtf-prompt-box">
          <h3>完整 Prompt 示例</h3>
          <div class="p02-prompt-text" id="p02-prompt-text">
<span class="p02-seg" data-seg="0">为《自然通讯》制作碳循环机制示意图，科学期刊风格，白色背景，清晰线条</span>
<span class="p02-seg" data-seg="1">[C] 中国北方温带森林生态系统</span>
<span class="p02-seg" data-seg="2">[D] 大气CO₂经光合作用固定→树木生长储碳→凋落物→土壤有机质→微生物分解→CO₂释放回大气
展示碳通量方向和量级（GPP 1200 gC/m²/yr，Ra 580，Rh 280，NEP 340）</span>
<span class="p02-seg" data-seg="3">[T] 剖面视角，左半显示地上，右半显示地下；色彩：大气用浅蓝，植被用绿色，土壤用棕色系渐变；标注用 Helvetica，字号 10-12pt</span>
<span class="p02-seg" data-seg="4">[F] 分辨率 300 DPI，RGB 色彩空间，比例 1:1.2（宽:高），导出 PNG + SVG 双格式</span>
          </div>
        </div>
      </div>
      <div class="p02-cdtf-right" id="p02-cdtf-right">
        <div class="p02-cdtf-panel active" data-panel="0">
          <div class="p02-cdtf-panel-label">C</div>
          <h2>Context — 出版目标与领域背景</h2>
          <p>告诉 AI 这张图将用于什么场景、面向什么读者。出版目标决定了图的风格精度要求，领域背景帮助 AI 调用正确的专业知识库。</p>
          <ul>
            <li>目标期刊名称（Nature / Science / PNAS 等）</li>
            <li>研究领域（生态学 / 大气化学 / 分子生物学）</li>
            <li>读者背景（领域专家 / 跨学科 / 科普公众）</li>
          </ul>
          <div class="p02-cdtf-tip">💡 示例中的 Context：<em>为《自然通讯》制作…科学期刊风格，白色背景，清晰线条</em> — 明确了发表场合和风格基调</div>
        </div>
        <div class="p02-cdtf-panel" data-panel="1">
          <div class="p02-cdtf-panel-label">D</div>
          <h2>Description — 精确科学术语描述</h2>
          <p>用准确的科学词汇描述图中需要展示的内容、过程、数据和关系。这是 Prompt 最核心的部分，质量直接决定科学准确性。</p>
          <ul>
            <li>列举核心科学过程（3-5 个关键步骤）</li>
            <li>包含定量数据（具体数值比"较大"更好）</li>
            <li>明确方向性关系（A 导致 B，B 抑制 C）</li>
          </ul>
          <div class="p02-cdtf-tip">💡 示例中的 Description：<em>展示碳通量方向和量级（GPP 1200 gC/m²/yr…）</em> — 定量描述远比"展示碳循环"有效</div>
        </div>
        <div class="p02-cdtf-panel" data-panel="2">
          <div class="p02-cdtf-panel-label">T</div>
          <h2>Technique — 视角、风格、配色</h2>
          <p>控制图的视觉表现形式。科研图解与艺术图像的核心区别在于：技术参数需要明确到可量化的程度。</p>
          <ul>
            <li>视角：鸟瞰 / 剖面 / 正面 / 等轴测</li>
            <li>配色：指定色彩含义（蓝色=大气，绿色=植被）</li>
            <li>字体字号：与目标期刊规格保持一致</li>
          </ul>
          <div class="p02-cdtf-tip">💡 示例中的 Technique：<em>剖面视角，左半地上右半地下；色彩方案明确指定</em> — 消除了 AI 的自由发挥空间</div>
        </div>
        <div class="p02-cdtf-panel" data-panel="3">
          <div class="p02-cdtf-panel-label">F</div>
          <h2>Format — 技术规格</h2>
          <p>输出规格影响图能否直接用于出版。很多科研人员忽略了这部分，导致需要额外的格式转换步骤。</p>
          <ul>
            <li>分辨率（期刊通常要求 ≥300 DPI）</li>
            <li>色彩模式（印刷=CMYK，网络/屏幕=RGB）</li>
            <li>比例（单栏/双栏宽度对应的宽高比）</li>
          </ul>
          <div class="p02-cdtf-tip">💡 示例中的 Format：<em>300 DPI，RGB，1:1.2，PNG+SVG 双格式</em> — 投稿和网络版本一次生成</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- S2: 好差 Prompt 对比 -->
<section class="section-light" id="p02-s2" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">好 Prompt vs 差 Prompt</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">三组真实环境科学场景的 Prompt 对比，绿色高亮为改进之处</p>
    </div>
    <div class="p02-compare-grid" id="p02-compare-grid"></div>
  </div>
</section>

<!-- S3: 迭代优化工作流 -->
<section class="section-dark" id="p02-s3" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">迭代优化工作流</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);line-height:1.6;">湿地生态系统服务评估框架图 v1→v4 的完整迭代过程</p>
    </div>
    <div class="p02-iter-track" id="p02-iter-track"></div>
    <div class="p02-iter-detail" id="p02-iter-detail"></div>
  </div>
</section>

<!-- S4: Prompt 模板库 -->
<section class="section-light" id="p02-s4" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">Prompt 模板库</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">按科研图类型分类，填空式模板 + 环境科学示例</p>
    </div>
    <div class="p02-browser-layout">
      <div class="p02-browser-left" id="p02-tpl-list"></div>
      <div class="p02-browser-right" id="p02-tpl-preview"></div>
    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta">
  <p class="page-footer-num">02 / 06</p>
  <h2 class="page-footer-quote">描述越精确，AI 越聪明</h2>
  <p class="page-footer-desc">下一页讲解如何将 AI 生成的位图处理成出版级矢量图。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p02-prev-btn">← AI 与科研绘图新范式</button>
    <button class="btn-primary" id="p02-next-btn">AI 输出后处理 →</button>
  </div>
</section>
</div>`}function N(){const i=L.timeline({delay:.2});if(i.fromTo("#p02-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),i.fromTo("#p02-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),i.fromTo("#p02-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),i.fromTo(".p02-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),i.fromTo("#p02-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),i.fromTo(".p02-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p02-quicknav .hero-quicknav__item").forEach(t=>{t.addEventListener("click",()=>{document.querySelector(t.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),window.innerWidth>900){const t=document.getElementById("p02-cdtf-body"),e=document.getElementById("p02-cdtf-left"),a=document.querySelectorAll(".p02-cdtf-panel"),r=document.querySelectorAll(".p02-seg");if(t&&e&&a.length){let o=function(){h||(h=!0,requestAnimationFrame(()=>{const B=t.getBoundingClientRect(),z=Math.max(0,-B.top);e.style.transform=`translateY(${c+Math.min(z,A)}px)`;const m=Math.min(q-1,Math.max(0,Math.floor(z/window.innerHeight)));m!==E&&(E=m,a.forEach((b,y)=>b.classList.toggle("active",y===m)),r.forEach((b,y)=>b.classList.toggle("active",y===m+1))),h=!1}))};const q=a.length,I=40;let h=!1,E=0,f=t.offsetHeight,s=e.offsetHeight,c=Math.max(I,(window.innerHeight-s)/2),A=Math.max(0,f-s-c),D=null;const S=()=>{clearTimeout(D),D=setTimeout(()=>{f=t.offsetHeight,s=e.offsetHeight,c=Math.max(I,(window.innerHeight-s)/2),A=Math.max(0,f-s-c)},150)};window.addEventListener("resize",S,{passive:!0}),v.push({fn:S,el:window,event:"resize"}),window.addEventListener("scroll",o,{passive:!0}),v.push({fn:o,el:window})}}g(document.querySelectorAll("#p02-s1 .reading-wrapper"),{stagger:.1,y:30});const u=[{title:"流域水质监测流程图",badImg:"assets/m2/p02-bad-01-watershed.webp",goodImg:"assets/m2/p02-good-01-watershed.webp",bad:`画一个水质监测的流程图
用蓝色画
要好看`,good:`Environmental engineering flowchart, white background, academic style,
prepared for Environmental Pollution journal.
[Context] Comprehensive water quality monitoring system for a river basin
in southern China, supporting water pollution source tracking research.
[Description] Left-to-right linear flow:
  Sampling Site Layout → Field Physicochemical Measurement (pH/DO/EC/Temperature)
  → Sample Preservation & Transport → Laboratory Analysis
  (Heavy metals ICP-MS / Nutrients / Organics) → Data Quality Control
  → Report Output (GIS-based heatmap)
[Technique] Blue-green palette (blue=#2980b9, green=#27ae60),
  each step has instrument icon, key parameters annotated below each node.
[Format] 2K resolution, 300 DPI, RGB, academic publication standard.`,reason:"差 Prompt 缺乏科学术语和具体参数，AI 无法判断监测什么污染物、用什么方法。好 Prompt 明确了采样策略、分析指标和期刊要求。"},{title:"土壤重金属修复机制",badImg:"assets/m2/p02-bad-02-soil.webp",goodImg:"assets/m2/p02-good-02-soil.webp",bad:`土壤修复示意图
显示重金属去除的过程
科学风格`,good:`Soil profile cross-section scientific illustration, white background,
Nature series journal style.
[Context] EDTA-assisted phytoremediation mechanism for heavy metal contaminated soil,
submitted to Science of The Total Environment.
[Description] Vertical cross-section:
  Aboveground: sunflower hyperaccumulator (Helianthus annuus), EDTA solution spray
  0–20 cm tillage layer: EDTA chelates Cd²⁺/Pb²⁺, plant availability +65%,
    HMA4 transporter (P₁B-type ATPase) shown at root surface
  20–40 cm plow pan: Pb 487 mg/kg, 30x over standard
  >40 cm clean subsoil
  Right panel: Phytoremediation Efficiency bar chart — Cd removal 78%, Pb removal 54%
[Technique] Soil layer gradient (dark brown → yellow-brown),
  green plants + brown soil dominant, chemical symbols clearly labeled.
[Format] 2K resolution, 300 DPI, white background, academic figure standard.`,reason:"差 Prompt 没有指定修复机制类型、具体重金属、定量指标。好 Prompt 包含了化学过程（EDTA螯合）、定量效率和完整的视觉规格。"},{title:"PM2.5 大气传输与形成机制",badImg:"assets/m2/p02-bad-03-atmo.webp",goodImg:"assets/m2/p02-good-03-atmo.webp",bad:"Draw a picture of air pollution in a city.",good:`Scientific conceptual illustration of PM2.5 formation and transport mechanisms,
white background, Atmospheric Environment journal style.
NO charts, NO graphs — purely illustrative diagram.
[Context] Urban air pollution mechanisms, northern China industrial city.
[Description] Urban cross-section landscape:
  Left — Primary emission sources with labeled icons:
    Industrial stack (SO₂, NOₓ, PM) · Vehicle exhaust (BC, EC, Pb)
    Construction dust (Si, Al, Ca) · Biomass burning (K, levoglucosan)
  Center — Atmospheric transformation:
    SO₂ + OH → H₂SO₄ → SO₄²⁻ (secondary sulfate)
    NOₓ + VOCs + sunlight → O₃ → NO₃⁻ (secondary nitrate)
    Photochemical reaction zone with UV arrows
  Right — Receptor monitoring station:
    Instrument tower icon, particle size legend (PM10 / PM2.5 / PM1)
    Atmospheric boundary layer (dashed horizontal line)
[Technique] Blue sky background, gray/brown emission plumes,
  orange photochemical zone, green ground vegetation. All English labels.
[Format] 2K resolution, 300 DPI, white background, academic publication standard.`,reason:'差 Prompt 没有说明科学主题和视觉规格，AI 输出了卡通插图风格。好 Prompt 明确了[Context]期刊背景、[Description]图示内容（化学反应路径+源头图标）、[Technique]配色和[Format]规格，且特别说明"NO charts"避免 AI 生成不适合的数据图表。'}],l=document.getElementById("p02-compare-grid");l&&u.forEach(t=>{const e=document.createElement("div");e.className="p02-compare-card",e.innerHTML=`<h3>${t.title}</h3>
        <div class="p02-compare-row">
          <div class="p02-compare-col">
            <h4 class="p02-bad-label">❌ 差 Prompt</h4>
            <div class="p02-compare-img">
              <img loading="lazy" src="/sci-aesthetic/${t.badImg}" alt="Bad prompt example" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
            </div>
            <div class="p02-prompt-diff">${t.bad.split(`
`).map(a=>`<span class="p02-diff-del">${n(a)}</span>`).join(`
`)}</div>
          </div>
          <div class="p02-compare-col">
            <h4 class="p02-good-label">✅ 好 Prompt</h4>
            <div class="p02-compare-img">
              <img loading="lazy" src="/sci-aesthetic/${t.goodImg}" alt="Good prompt example" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
            </div>
            <div class="p02-prompt-diff">${t.good.split(`
`).map(a=>`<span class="p02-diff-add">${n(a)}</span>`).join(`
`)}</div>
          </div>
        </div>
        <div style="margin-top:var(--space-md);padding:12px 16px;background:var(--bg-light-alt,#f5f5f7);border-radius:var(--radius-sm);font-size:0.85rem;color:var(--text-on-light-2);line-height:1.6;border-left:3px solid var(--module-2);">💬 ${t.reason}</div>`,l.appendChild(e)}),g(document.querySelectorAll("#p02-s2 .reading-wrapper, #p02-s2 .p02-compare-card"),{stagger:.1,y:40});const x=[{ver:"v1",label:"初始构图",icon:"🎯",img:"assets/m2/p02-iter-v1-wetland.webp",change:"构图优化",detail:"从散乱的元素堆砌改为层级分明的同心圆布局，四类服务用象限区分。",next:"配色调整 →",prompt:`[v1 — Initial rough draft, intentionally low quality]
A crude wetland ecosystem services assessment framework diagram:
Chaotic layout (rectangles of random sizes placed haphazardly),
single font size, random oversaturated colors (default red/yellow/green/blue),
no icons — text labels only, thin black connectors in inconsistent directions.
Four service categories: Regulating / Provisioning / Cultural / Supporting.`},{ver:"v2",label:"配色调整",icon:"🎨",img:"assets/m2/p02-iter-v2-wetland.webp",change:"色彩系统化",detail:"从默认混色改为统一的绿色系（调节=深绿，供给=浅绿，文化=青绿，支撑=灰绿）。",next:"细节增加 →",prompt:`[v2 — Added color coding, medium quality, still has issues]
Wetland ecosystem services assessment framework diagram (second AI iteration):
Symmetric four-quadrant layout but cramped spacing,
four service categories have distinct colors but saturation is too high,
icons inconsistent in style (mix of emoji-style and line-art style),
only two font sizes used, center circle overly bright, no quantitative values.`},{ver:"v3",label:"细节增加",icon:"🔬",img:"assets/m2/p02-iter-v3-wetland.webp",change:"科学细节",detail:"为每类服务添加代表性子服务图标和简短标签（如碳封存、水净化、候鸟栖息地、土壤形成）。",next:"标注完善 →",prompt:`[v3 — Refined details, near publication quality]
Wetland ecosystem services assessment framework diagram (third AI iteration):
Clean four-quadrant layout on white background with ample whitespace,
desaturated palette (Regulating=#1B5E20, Provisioning=#4CAF50,
Cultural=#80CBC4, Supporting=#B2DFDB),
unified minimal line-art icons (3 sub-services per category),
three-level font hierarchy (title / service name / sub-item).`},{ver:"v4",label:"标注完善",icon:"✨",img:"assets/m2/p02-iter-v4-wetland.webp",change:"出版级标注",detail:"添加图题、箭头说明生态系统服务流方向、增加定量价值标注（$12,120/ha/yr）。最终达到Nature投稿标准。",next:"完成",prompt:`[v4 — Publication-ready final version, Nature journal submission standard]
Wetland ecosystem services assessment framework diagram, polished final.
Layout: two concentric rings on white background.
Inner circle: wetland illustration icon labeled 'Wetland Ecosystem'.
Middle ring: four equal quadrants — Regulating / Provisioning / Cultural / Supporting,
  each with 3 bullet-point sub-services.
Outer ring: four arc segments with value labels:
  $8,460/ha/yr · $1,240/ha/yr · $320/ha/yr · $2,100/ha/yr
Total value box: 'Total: $12,120/ha/yr (2023 USD)'.
Figure title: 'Wetland Ecosystem Services Framework'.
Footnote: 'Source: Millennium Ecosystem Assessment (MA 2005)'.`}],d=document.getElementById("p02-iter-track"),w=document.getElementById("p02-iter-detail");function k(t){const e=x[t];w&&(w.innerHTML=`
      <h3>${e.ver}: ${e.label}</h3>
      <div class="p02-iter-detail-grid">
        <div>
          <img loading="lazy" src="/sci-aesthetic/${e.img}" alt="Iteration ${e.ver}: ${e.label}" style="width:100%;height:auto;border-radius:var(--radius-md);display:block;">
        </div>
        <div>
          <div class="p02-iter-change">
            <h4>本轮改动：${e.change}</h4>
            <p>${e.detail}</p>
          </div>
          <div style="margin-top:var(--space-md);background:var(--bg-dark);border-radius:var(--radius-sm);padding:var(--space-md);border:1px solid var(--border-dark);">
            <div style="color:var(--text-on-dark-3);font-size:var(--text-caption);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:8px;">Prompt 要点</div>
            <pre style="font-family:var(--font-code);font-size:0.78rem;color:var(--text-on-dark-2);white-space:pre-wrap;word-wrap:break-word;line-height:1.7;">${n(e.prompt)}</pre>
          </div>
        </div>
      </div>`)}d&&(x.forEach((t,e)=>{const a=document.createElement("div");a.className=`p02-iter-item${e===0?" active":""}`,a.dataset.idx=e,a.innerHTML=`
        <div class="p02-iter-thumb">
          <img loading="lazy" src="/sci-aesthetic/${t.img}" alt="Iteration ${t.ver}" style="width:100%;height:auto;display:block;">
        </div>
        <div class="p02-iter-ver">${t.ver}</div>
        <div class="p02-iter-label">${t.label}</div>`,d.appendChild(a)}),k(0),d.addEventListener("click",t=>{const e=t.target.closest(".p02-iter-item");if(!e)return;const a=parseInt(e.dataset.idx);d.querySelectorAll(".p02-iter-item").forEach((r,o)=>r.classList.toggle("active",o===a)),k(a)})),g(document.querySelectorAll("#p02-s3 .reading-wrapper, #p02-iter-track"),{stagger:.1,y:30});const P=[{icon:"🔵",label:"概念示意图",desc:"机制、过程、关系可视化",structure:`为《[期刊名]》制作[研究主题]概念示意图
[C] [研究背景/生态系统/实验条件]
[D] [核心科学过程，3-5个关键步骤]
[T] [视角：鸟瞰/剖面/3D] + [配色方案] + [标注字体/字号]
[F] 分辨率[DPI]，[色彩模式]，比例[W:H]，格式[PNG/SVG]`,example:`为《Environmental Science & Technology》制作土壤重金属修复概念示意图
[C] EDTA辅助植物修复，中国华北平原农业土壤
[D] EDTA施用→土壤重金属活化→植物根系吸收→地上部积累→收割移除
[T] 剖面视角，绿色植株+棕色土壤+蓝色箭头，Helvetica 10pt标注
[F] 300 DPI，RGB，1:1.2，PNG+SVG`},{icon:"🔬",label:"实验流程图",desc:"方法步骤、样品处理流程",structure:`实验方法流程图，[背景颜色]，[风格]
[C] [实验目的/方法体系]
[D] 步骤1: [样品来源] → 步骤2: [处理方法] → 步骤3: [分析测试] → 步骤4: [数据处理]
[T] 从左到右线性流程，每步配[图标类型]，[配色方案]
[F] 宽:高 = [比例]，分辨率 300 DPI`,example:`实验方法流程图，白色背景，简洁学术风格
[C] 沉积物重金属形态分析，BCR顺序提取法
[D] 步骤1: 河流沉积物采集 → 步骤2: BCR顺序提取（4组分）→ 步骤3: ICP-MS测定 → 步骤4: 统计分析
[T] 从左到右线性，化学试剂瓶/烧杯图标，蓝灰配色
[F] 3:1宽高比，300 DPI，PNG`},{icon:"📋",label:"Graphical Abstract",desc:"论文视觉摘要，信息密集型",structure:`期刊Graphical Abstract，白色背景，信息密集
[C] [论文主题一句话]，发表于[目标期刊]
[D] 左: [问题/背景] → 中: [核心方法/发现] → 右: [意义/结论]
关键数据：[最重要的1-3个量化结果]
[T] 左-中-右三栏，关键数字放大，箭头引导阅读
[F] 宽:高=1.8:1，RGB，300 DPI，白色背景`,example:`期刊Graphical Abstract，白色背景
[C] 黄河流域重金属污染时空分布特征，发表于Science of The Total Environment
[D] 左：黄河流域56个采样点地图 → 中：PMF源解析结果（矿业58%，农业27%，城市15%）→ 右：生态风险评估（Cd最高超标14倍）
关键数据：Cu超标率42%，Cd最高14倍超标
[T] 三栏布局，黄河蓝色曲线贯穿，数字用图表展示
[F] 1.8:1，RGB，300 DPI`},{icon:"🗺",label:"综述框架图",desc:"概念关系、研究体系框架",structure:`综述框架概念图，学术风格，[配色]
[C] [综述主题]，涵盖[几个]核心方向
[D] [主题] → [子主题1/子主题2/子主题3] → [各子主题核心内容]
[T] [层级关系/同心圆/模块化布局]，关联线展示关系
[F] [方形/竖版]，300 DPI，RGB`,example:`综述框架概念图，深蓝白配色，学术风格
[C] 微塑料在土壤-植物系统行为与效应综述，4个核心方向
[D] 微塑料土壤效应 → ①土壤物理结构 ②微生物群落 ③植物吸收毒性 ④食物链传递
各方向标注代表研究方法和关键发现
[T] 中心主题+四象限辐射，关联箭头，关键词加框
[F] 1:1正方形，300 DPI，RGB`},{icon:"📊",label:"数据可视化辅助",desc:"图表底图、配套示意图",structure:`数据图表配套示意图，[风格]，[配色]
[C] [论文数据类型]，作为Figure [X]的[补充/底图]
[D] [需展示的数据关系/空间分布]
辅助元素：[坐标轴/图例/比例尺/方向标]
[T] [视图类型]，与主图配色一致
[F] [精确尺寸]，[DPI]，[期刊单栏/双栏]`,example:`数据图表背景底图，简洁科学风格，蓝白配色
[C] 渤海湾重金属分布数据，作为Figure 2的地图底图
[D] 渤海湾轮廓线，主要河流入海口标记，5个采样区域多边形（空心，用于叠加数据点）
辅助：坐标格网（0.5°），比例尺（50km），北向标
[T] 极简地图，深蓝海洋，白色陆地，采样区灰色虚线多边形
[F] 600×500px，300 DPI，PNG透明背景`}],p=document.getElementById("p02-tpl-list"),C=document.getElementById("p02-tpl-preview");function T(t){const e=P[t];if(!C)return;const a=n(e.structure).replace(/\[([^\]]+)\]/g,'<span class="p02-tpl-placeholder">[$1]</span>');C.innerHTML=`
      <div class="p02-tpl-preview">
        <h3>${e.icon} ${e.label}</h3>
        <div class="p02-tpl-structure">${a}</div>
        <div class="p02-tpl-example-label">示例（环境科学）</div>
        <div class="p02-tpl-example">${n(e.example)}</div>
        <button class="p02-copy-btn" id="p02-copy-tpl">📋 复制模板</button>
      </div>`;const r=document.getElementById("p02-copy-tpl");r&&r.addEventListener("click",()=>{navigator.clipboard?.writeText(e.structure).then(()=>{r.textContent="✅ 已复制！",r.classList.add("copied"),setTimeout(()=>{r.textContent="📋 复制模板",r.classList.remove("copied")},2e3)}).catch(()=>{const o=document.createElement("textarea");o.value=e.structure,document.body.appendChild(o),o.select(),document.execCommand("copy"),document.body.removeChild(o),r.textContent="✅ 已复制！",setTimeout(()=>{r.textContent="📋 复制模板"},2e3)})})}p&&(P.forEach((t,e)=>{const a=document.createElement("div");a.className=`p02-tpl-item${e===0?" active":""}`,a.dataset.idx=e,a.innerHTML=`<div class="p02-tpl-icon">${t.icon}</div><div class="p02-tpl-label">${t.label}</div><div class="p02-tpl-desc">${t.desc}</div>`,p.appendChild(a)}),T(0),p.addEventListener("click",t=>{const e=t.target.closest(".p02-tpl-item");if(!e)return;const a=parseInt(e.dataset.idx);p.querySelectorAll(".p02-tpl-item").forEach((r,o)=>r.classList.toggle("active",o===a)),T(a)})),g(document.querySelectorAll("#p02-s4 .reading-wrapper, #p02-tpl-list"),{stagger:.1,y:30}),document.getElementById("p02-prev-btn")?.addEventListener("click",()=>$("m2-p1")),document.getElementById("p02-next-btn")?.addEventListener("click",()=>$("m2-p3"))}function O(){M(),v.forEach(({fn:i,el:u,event:l})=>(u||window).removeEventListener(l||"scroll",i)),v=[],F.forEach(i=>i.disconnect()),F=[]}export{O as destroy,N as init,H as render};
