import{k as B,g as _,f as y}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as $}from"./index-CTmOWimm.js";let n=[],L=[];function z(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}const j=["Nature","Science","Cell/Elsevier","PNAS","Lancet"],T=["数据图（Figure）","示意图/概念图","封面图","AI文字辅助"],M=[["❌ 禁止","⚠️ 需声明","⚠️ 需编辑批准","⚠️ 需声明"],["❌ 禁止","⚠️ 需声明","⚠️ 需编辑批准","⚠️ 需声明"],["❌ 禁止","⚠️ 需声明","✅ 允许+声明","⚠️ 需声明"],["❌ 禁止","⚠️ 需声明","⚠️ 需编辑批准","✅ 允许"],["❌ 禁止","❌ 禁止","❌ 禁止","⚠️ 需声明"]],O={"Nature-数据图（Figure）":"Nature明确禁止使用AI生成任何研究数据图，违反将被视为学术不端（2024年修订政策）。","Nature-示意图/概念图":'允许AI辅助生成概念示意图，但必须在图注中注明"该图由[AI工具名]辅助生成"。',"Nature-封面图":"封面图使用AI须提前获得编辑书面批准，审批周期通常3-5个工作日。","Nature-AI文字辅助":"允许使用AI辅助语言润色，但须在Author Contributions部分声明具体用途。","Science-数据图（Figure）":"Science政策与Nature一致，严格禁止AI生成数据图表，包括修改原始数据的AI增强。","Science-示意图/概念图":'概念图允许，要求图注末尾注明"Figure created with [tool] assistance"。',"Science-封面图":"需联系Science编辑委员会，通过专项审核流程，通常需要说明AI工具的具体用途。","Science-AI文字辅助":"须在致谢或方法中说明AI辅助写作工具及使用范围。","Cell/Elsevier-数据图（Figure）":"Elsevier系列期刊（含Cell）明确禁止AI生成数据图，适用于旗下所有2000+期刊。","Cell/Elsevier-示意图/概念图":"概念图允许并须声明，Elsevier提供标准声明模板供作者使用。","Cell/Elsevier-封面图":"Cell明确允许AI辅助封面图，但须在封面申请中注明，且创意方向须由作者主导。","Cell/Elsevier-AI文字辅助":"Elsevier要求在方法或致谢中详细说明使用的具体AI工具和用途。","PNAS-数据图（Figure）":'PNAS对数据图持严格禁止立场，并特别指出禁止用AI"修复"或"增强"真实数据图像。',"PNAS-示意图/概念图":"示意图须声明，PNAS建议在图注中注明生成工具和提示词要点。","PNAS-封面图":"PNAS不定期征集封面图，AI辅助封面须提前与编辑沟通，个案处理。","PNAS-AI文字辅助":"PNAS在2024年更新政策，明确允许AI文字辅助，无需额外说明即视为合规。","Lancet-数据图（Figure）":"Lancet系列期刊对AI持最严格立场，任何涉及临床数据的AI生成内容均被禁止。","Lancet-示意图/概念图":"Lancet明确禁止AI生成示意图，理由是医学期刊对准确性要求高于其他领域。","Lancet-封面图":"Lancet封面图须为真实患者/医疗场景摄影，不接受AI生成，包括艺术化处理。","Lancet-AI文字辅助":"允许语言润色，但须在方法中声明，且AI生成文字不得超过正文的10%。"},F=[{level:1,color:"#22c55e",label:"完全安全",example:"AI辅助配色、排版建议、语法检查",desc:"使用AI工具协助配色决策、排版建议或语法检查，无需额外声明。这类辅助与使用Spell Check本质相同。"},{level:2,color:"#84cc16",label:"需声明使用",example:"AI生成概念示意图用于正文",desc:'在图注中注明"图由[工具名]辅助生成"，并确保科学准确性由作者保证。大多数期刊接受，需查阅具体投稿指南。'},{level:3,color:"#eab308",label:"需编辑批准",example:"AI生成期刊封面图",desc:"提交前需联系期刊编辑获得书面批准，不同期刊政策存在显著差异。建议提前2-4周与编辑沟通。"},{level:4,color:"#ef4444",label:"严格禁止",example:"AI生成或修改实验数据图",desc:"将AI生成内容用于展示数据、实验结果或统计分析，属于学术数据造假，可能导致撤稿和学术处分。"},{level:5,color:"#6b7280",label:"灰色地带",example:"AI增强真实显微照片",desc:"对真实照片进行AI增强（去噪、分辨率提升）存在争议，需在方法部分详细说明处理过程和软件版本。"}],N=[{q:'将遥感卫星图用AI"去云"处理后作为Figure数据展示',answer:"forbid",feedback:"这是对真实数据的AI修改，PNAS等期刊明确禁止，必须在方法中详细说明处理过程，且需经过peer review评估。"},{q:"用Midjourney生成论文TOC图形摘要（Graphical Abstract）",answer:"declare",feedback:'TOC图属于示意图，大多数期刊允许但须声明。格式：图注末尾加 "This figure was generated with AI assistance (Midjourney, 2025)"。'},{q:"用ChatGPT润色图表说明（Figure Caption）文字",answer:"ok",feedback:"语言辅助属于允许范围，但Elsevier系列期刊要求在Author Contributions中说明AI工具的具体使用范围。"},{q:'用Stable Diffusion生成"理想化"实验装置示意图用于Methods',answer:"declare",feedback:"实验装置示意图允许（如科学准确），须声明AI辅助，并确保所有技术细节经人工核实。注意：不得添加实际实验中不存在的装置组件。"},{q:"AI直接生成扫描电镜（SEM）风格图像替代真实显微照片",answer:"forbid",feedback:"严格禁止。AI生成的显微图像假冒真实数据，属于严重学术不端，可能导致撤稿、调查和处分。"},{q:"将ChatGPT生成文字作为论文正文发表而不声明",answer:"forbid",feedback:"几乎所有顶刊要求声明任何AI辅助写作。不声明被认定为学术不端，可能导致拒稿或追溯撤稿。"},{q:"用Mermaid AI生成实验流程图在Methods部分使用",answer:"declare",feedback:'流程图用于方法说明合理，须声明"流程图使用Mermaid AI辅助绘制，内容经作者核实"。Mermaid生成的是可编辑结构图，透明度更高。'},{q:"申请期刊封面时使用AI生成的河流生态系统渲染图",answer:"declare",feedback:"封面图使用AI须提前联系编辑获批（Nature/Science）或在申请时注明（Cell），不得直接提交而不声明。"}],D=["Nature","Science","Cell","Elsevier系列","PNAS","Lancet","ACS期刊","Wiley期刊","其他期刊"],G=["概念示意图/流程图","Graphical Abstract（图形摘要）","封面图","数据可视化辅助","语言润色","多种用途"],R=["GPT Image / DALL-E","Midjourney","Stable Diffusion / FLUX","Recraft V3","Mermaid AI","ChatGPT（文字辅助）","多种AI工具"];function J(){const a=T.map(o=>`<th>${o}</th>`).join(""),t=j.map((o,h)=>{const w=T.map((k,A)=>{const b=M[h][A];let v="";return b.includes("❌")?v="p05-cell-no":b.includes("⚠️")?v="p05-cell-warn":b.includes("✅")&&(v="p05-cell-ok"),`<td class="${v}" data-journal="${o}" data-dim="${k}">${b}</td>`}).join("");return`<tr><td>${o}</td>${w}</tr>`}).join(""),r=N.map((o,h)=>`
    <div class="p05-quiz-card" data-idx="${h}">
      <p class="p05-quiz-q">${o.q}</p>
      <div class="p05-quiz-btns">
        <button class="p05-quiz-btn" data-choice="ok">✅ 可以用</button>
        <button class="p05-quiz-btn" data-choice="declare">⚠️ 需要声明</button>
        <button class="p05-quiz-btn" data-choice="forbid">❌ 禁止使用</button>
      </div>
      <div class="p05-quiz-result"></div>
    </div>`).join(""),s=D.map(o=>`<option value="${o}">${o}</option>`).join(""),u=G.map(o=>`<option value="${o}">${o}</option>`).join(""),m=R.map(o=>`<option value="${o}">${o}</option>`).join("");return`<div class="page-scroll">
<style>
/* p05 hero */
.p05-hero { position:relative; overflow:hidden; align-items:center; }
.p05-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 45% at 25% 40%, rgba(239,68,68,0.12) 0%, transparent 65%); animation:p05-drift-a 11s ease-in-out infinite; pointer-events:none; }
.p05-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 45% 50% at 75% 55%, rgba(184,184,232,0.15) 0%, transparent 65%); animation:p05-drift-b 8s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p05-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-18px)} }
@keyframes p05-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-22px,20px)} }
.p05-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p05-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p05-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* S1 期刊政策表 */
.p05-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:var(--radius-lg); border:1px solid var(--border-light); }
.p05-policy-table { border-collapse:collapse; width:100%; min-width:600px; }
.p05-policy-table th { padding:12px 16px; font-size:0.8rem; font-weight:700; color:var(--text-on-light-2); text-align:center; background:var(--bg-light-elevated,#fff); border-bottom:2px solid var(--border-light); white-space:nowrap; }
.p05-policy-table th:first-child { text-align:left; position:sticky; left:0; z-index:1; }
.p05-policy-table td { padding:10px 16px; text-align:center; border-bottom:1px solid var(--border-light); font-size:0.85rem; cursor:pointer; transition:background 0.15s; }
.p05-policy-table td:first-child { text-align:left; font-weight:600; font-size:0.9rem; color:var(--text-on-light); background:var(--bg-light-elevated,#fff); position:sticky; left:0; white-space:nowrap; }
.p05-policy-table td:hover:not(:first-child) { background:rgba(184,184,232,0.1); }
.p05-policy-table tr:last-child td { border-bottom:none; }
.p05-cell-ok { color:#16a34a; font-weight:600; }
.p05-cell-warn { color:#d97706; font-weight:600; }
.p05-cell-no { color:#dc2626; font-weight:600; }

/* 政策弹出框 */
.p05-policy-popup { position:fixed; background:var(--bg-light-elevated,#fff); border:1px solid var(--border-light); border-radius:var(--radius-md); padding:var(--space-md); max-width:min(320px, calc(100vw - 32px)); font-size:0.85rem; line-height:1.6; box-shadow:var(--shadow-light); z-index:500; display:none; color:var(--text-on-light-2); }
.p05-policy-popup h4 { color:var(--text-on-light); font-size:0.9rem; font-weight:700; margin-bottom:8px; }
.p05-policy-popup-close { float:right; cursor:pointer; color:var(--text-on-light-3,#999); font-size:1.1rem; line-height:1; background:none; border:none; padding:0; }

/* S2 合规光谱 */
.p05-spectrum-row { border-radius:var(--radius-md); margin-bottom:var(--space-sm); cursor:pointer; border-left:4px solid; transition:opacity 0.2s; box-sizing:border-box; width:100%; }
.p05-spectrum-main { display:flex; align-items:center; gap:var(--space-md); padding:var(--space-md); }
.p05-spectrum-dot { width:12px; height:12px; border-radius:50%; flex-shrink:0; }
.p05-spectrum-label { font-weight:700; font-size:0.95rem; }
.p05-spectrum-example { font-size:0.82rem; color:var(--text-on-dark-3); margin-top:2px; }
.p05-spectrum-toggle { margin-left:auto; font-size:0.8rem; color:var(--text-on-dark-3); transition:transform 0.3s; flex-shrink:0; }
.p05-spectrum-detail { max-height:0; overflow:hidden; transition:max-height 0.35s ease; font-size:0.88rem; color:var(--text-on-dark-2); line-height:1.7; box-sizing:border-box; }
.p05-spectrum-detail.open { max-height:200px; }
.p05-spectrum-detail-inner { padding:0 var(--space-md) var(--space-md); border-top:1px solid rgba(255,255,255,0.08); overflow-wrap:break-word; word-break:break-word; }

/* S3 情景练习 */
.p05-quiz-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:var(--space-md); max-width:960px; margin:0 auto; }
.p05-quiz-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-light); }
.p05-quiz-q { font-size:0.95rem; color:var(--text-on-light); line-height:1.6; margin-bottom:var(--space-sm); font-weight:500; }
.p05-quiz-btns { display:flex; gap:8px; flex-wrap:wrap; }
.p05-quiz-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; font-size:0.8rem; cursor:pointer; transition:all 0.2s; min-height:36px; font-family:var(--font-heading); color:var(--text-on-light-2); }
.p05-quiz-btn:hover { background:var(--bg-light-alt,#f5f5f7); }
.p05-quiz-btn.correct { background:#22c55e20; border-color:#22c55e; color:#16a34a; font-weight:600; }
.p05-quiz-btn.wrong { background:#ef444420; border-color:#ef4444; color:#dc2626; }
.p05-quiz-btn.reveal { background:#22c55e10; border-color:#22c55e80; color:#16a34a; }
.p05-quiz-result { margin-top:var(--space-sm); padding:10px 12px; border-radius:var(--radius-sm); font-size:0.85rem; line-height:1.5; display:none; }
.p05-quiz-result.show { display:block; }
.p05-quiz-result.correct-msg { background:#22c55e15; color:#15803d; border-left:3px solid #22c55e; }
.p05-quiz-result.wrong-msg { background:#ef444415; color:#b91c1c; border-left:3px solid #ef4444; }

/* S4 声明生成器 */
.p05-gen-layout { max-width:860px; margin:0 auto; }
.p05-gen-selects { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md); margin-bottom:var(--space-xl); }
.p05-gen-select-wrap label { display:block; font-size:0.8rem; font-weight:600; color:var(--text-on-dark-2); letter-spacing:0.05em; text-transform:uppercase; margin-bottom:8px; }
.p05-gen-select { width:100%; padding:10px 14px; border-radius:var(--radius-md); border:1.5px solid var(--border-dark); background:var(--bg-dark-elevated); color:var(--text-on-dark); font-size:0.88rem; font-family:var(--font-body); cursor:pointer; appearance:none; -webkit-appearance:none; }
.p05-gen-output { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); margin-bottom:var(--space-lg); }
.p05-gen-lang-label { font-size:0.75rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:var(--text-on-dark-3); margin-bottom:8px; }
.p05-gen-text { font-size:0.9rem; color:var(--text-on-dark); line-height:1.8; margin-bottom:var(--space-lg); font-family:var(--font-body); padding:var(--space-md); background:rgba(255,255,255,0.03); border-radius:var(--radius-sm); border:1px solid var(--border-dark); white-space:pre-wrap; word-wrap:break-word; overflow-wrap:break-word; }
.p05-copy-btn { padding:10px 24px; border-radius:var(--radius-full); background:var(--module-2); color:#1d1d1f; border:none; font-size:0.85rem; font-weight:600; cursor:pointer; transition:all 0.2s; min-height:40px; font-family:var(--font-heading); }
.p05-copy-btn:hover { opacity:0.85; }
.p05-copy-btn.copied { background:#22c55e; color:#fff; }

/* section padding（桌面端） */
#p05-s1, #p05-s2, #p05-s3, #p05-s4 { padding: var(--space-3xl) var(--space-xl); }
/* 全局溢出防护 */
#p05-s1, #p05-s2, #p05-s3, #p05-s4 { overflow-x:hidden; }

/* 响应式 */
@media (max-width:900px) {
  .p05-gen-selects { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  #p05-s1, #p05-s2, #p05-s3, #p05-s4 { scroll-margin-top:56px; padding:var(--space-xl) var(--space-sm); }
  /* flex 子元素 margin:auto 会取消 stretch，强制 100% 宽度 */
  #p05-s1 > div, #p05-s2 > div, #p05-s3 > div, #p05-s4 > div { width:100%; min-width:0; max-width:100%; }
  .p05-quiz-grid { grid-template-columns:1fr; }
  /* 表格在 section padding 范围内水平滚动，保留圆角和边框，不做全宽展开 */
  .p05-table-wrap { box-sizing:border-box; max-width:100%; }
  .p05-policy-table th,
  .p05-policy-table td { padding:8px 10px; font-size:0.75rem; }
  .p05-policy-table th { font-size:0.72rem; }
}
</style>

<!-- ── Hero ────────────────────────────────────────────────────────────── -->
<section class="section-dark section-hero-full p05-hero" id="p05-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 05</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">伦理、版权与学术规范</h1>
    <p class="page-hero-sub" style="opacity:0;">AI Ethics, Copyright &amp; Academic Integrity</p>
    <p class="p05-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">技术能力之外，AI 科研绘图还需要遵守学术诚信的底线</p>
    <nav class="hero-quicknav" id="p05-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p05-s1">期刊政策</button>
      <button class="hero-quicknav__item" data-target="#p05-s2">合规边界</button>
      <button class="hero-quicknav__item" data-target="#p05-s3">情景练习</button>
      <button class="hero-quicknav__item" data-target="#p05-s4">声明生成器</button>
    </nav>
    <div class="p05-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 期刊政策全景 ──────────────────────────────────────────────────── -->
<section class="section-light" id="p05-s1">
  <div style="max-width:900px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">期刊政策全景</p>
    <h2 class="section-title">主流期刊 AI 政策对比</h2>
    <p class="section-body" style="max-width:680px;margin:0 auto var(--space-xl);">
      不同期刊对AI生成内容持有差异显著的政策立场。点击任意单元格查看该期刊的详细政策说明。
    </p>
    <div class="p05-table-wrap">
      <table class="p05-policy-table">
        <thead>
          <tr>
            <th>期刊</th>
            ${a}
          </tr>
        </thead>
        <tbody>
          ${t}
        </tbody>
      </table>
    </div>
    <p style="margin-top:var(--space-md);font-size:0.78rem;color:var(--text-on-light-3);text-align:center;">
      数据来源：各期刊官方Author Guidelines（截至2024年Q4）。政策可能更新，投稿前请核实最新版本。
    </p>
  </div>
</section>

<!-- 政策弹出框（全局单例） -->
<div class="p05-policy-popup" id="p05-policy-popup">
  <button class="p05-policy-popup-close" id="p05-popup-close">✕</button>
  <h4 id="p05-popup-title"></h4>
  <p id="p05-popup-body"></p>
</div>

<!-- ── S2 合规使用边界 ──────────────────────────────────────────────────── -->
<section class="section-dark" id="p05-s2">
  <div style="max-width:760px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">合规使用边界</p>
    <h2 class="section-title" style="color:var(--text-on-dark);">使用 AI 的五个层级</h2>
    <p class="section-body" style="color:var(--text-on-dark-2);max-width:600px;margin:0 auto var(--space-xl);">
      从完全安全到严格禁止，点击每个层级查看详细说明和典型例子。
    </p>
    <div id="p05-spectrum-wrap"></div>
  </div>
</section>

<!-- ── S3 情景判断练习 ──────────────────────────────────────────────────── -->
<section class="section-light" id="p05-s3">
  <div style="max-width:980px;margin:0 auto;">
    <p class="section-eyebrow" style="color:var(--module-2);">情景判断练习</p>
    <h2 class="section-title">在实践中判断边界</h2>
    <p class="section-body" style="max-width:680px;margin:0 auto var(--space-xl);">
      8个真实科研场景，你来判断：可以直接用、需要声明、还是禁止使用？
    </p>
    <div class="p05-quiz-grid">
      ${r}
    </div>
  </div>
</section>

<!-- ── S4 AI声明模板生成器 ─────────────────────────────────────────────── -->
<section class="section-dark" id="p05-s4">
  <div class="p05-gen-layout">
    <p class="section-eyebrow" style="color:var(--module-2);text-align:center;">声明模板生成器</p>
    <h2 class="section-title" style="color:var(--text-on-dark);text-align:center;">一键生成合规声明文本</h2>
    <p class="section-body" style="color:var(--text-on-dark-2);text-align:center;max-width:600px;margin:0 auto var(--space-xl);">
      选择投稿期刊、使用类型和AI工具，自动生成中英双语声明文本，可直接复制到论文中使用。
    </p>

    <div class="p05-gen-selects">
      <div class="p05-gen-select-wrap">
        <label for="p05-sel-journal">投稿期刊</label>
        <select class="p05-gen-select" id="p05-sel-journal">
          ${s}
        </select>
      </div>
      <div class="p05-gen-select-wrap">
        <label for="p05-sel-usage">使用类型</label>
        <select class="p05-gen-select" id="p05-sel-usage">
          ${u}
        </select>
      </div>
      <div class="p05-gen-select-wrap">
        <label for="p05-sel-tool">AI工具</label>
        <select class="p05-gen-select" id="p05-sel-tool">
          ${m}
        </select>
      </div>
    </div>

    <div class="p05-gen-output">
      <div class="p05-gen-lang-label">中文声明</div>
      <div class="p05-gen-text" id="p05-decl-cn"></div>
      <div class="p05-gen-lang-label">English Declaration</div>
      <div class="p05-gen-text" id="p05-decl-en"></div>
    </div>

    <div style="text-align:center;">
      <button class="p05-copy-btn" id="p05-copy-btn">复制全部声明</button>
    </div>
  </div>
</section>

<!-- ── Footer CTA ──────────────────────────────────────────────────────── -->
<section class="page-footer-cta">
  <p class="page-footer-num">05 / 06</p>
  <h2 class="page-footer-quote">了解边界，才能放心地在边界内自由创作</h2>
  <p class="page-footer-desc">伦理规范是技术使用的前提，而不是障碍。接下来通过三个完整实战案例，把所学整合运用。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p05-prev-btn">← AI辅助图解</button>
    <button class="btn-primary" id="p05-next-btn">端到端实战 →</button>
  </div>
</section>
</div>`}function H(a,t,r){const s=new Date().getFullYear(),u=`The ${t} in this manuscript was created with the assistance of ${r} (${s}). All content has been reviewed and verified by the authors for scientific accuracy. This use of AI-generated imagery complies with the editorial policies of ${a}.`,m=`本文中的${t}在${r}辅助下创作（${s}年）。所有内容已由作者审核并核实其科学准确性，符合${a}的编辑政策要求。`;return{EN:u,CN:m}}function Y(){const a=document.getElementById("p05-spectrum-wrap");a&&F.forEach(t=>{const r=document.createElement("div");r.className="p05-spectrum-row",r.style.cssText=`border-left:4px solid ${t.color};background:${t.color}15;`,r.innerHTML=`
      <div class="p05-spectrum-main">
        <div class="p05-spectrum-dot" style="background:${t.color};"></div>
        <div style="flex:1;min-width:0;">
          <div class="p05-spectrum-label" style="color:${t.color};">${z(t.label)}</div>
          <div class="p05-spectrum-example">${z(t.example)}</div>
        </div>
        <div class="p05-spectrum-toggle">▼</div>
      </div>
      <div class="p05-spectrum-detail"><div class="p05-spectrum-detail-inner">${z(t.desc)}</div></div>`,a.appendChild(r);const s=r.querySelector(".p05-spectrum-main"),u=r.querySelector(".p05-spectrum-detail"),m=r.querySelector(".p05-spectrum-toggle"),o=()=>{const h=u.classList.contains("open");u.classList.toggle("open",!h),m.style.transform=h?"rotate(0deg)":"rotate(180deg)"};s.addEventListener("click",o),n.push({el:s,type:"click",fn:o})})}function V(){const a=_.timeline({delay:.2});a.fromTo(".p05-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),a.fromTo(".p05-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),a.fromTo(".p05-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),a.fromTo(".p05-hero .p05-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),a.fromTo("#p05-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),a.fromTo(".p05-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p05-quicknav .hero-quicknav__item").forEach(e=>{const i=()=>{const g=e.dataset.target,c=document.querySelector(g);c&&c.scrollIntoView({behavior:"smooth"})};e.addEventListener("click",i),n.push({el:e,type:"click",fn:i})});const t=document.getElementById("p05-policy-popup"),r=document.getElementById("p05-popup-title"),s=document.getElementById("p05-popup-body"),u=document.getElementById("p05-popup-close"),m=()=>{t&&(t.style.display="none")};u&&(u.addEventListener("click",m),n.push({el:u,type:"click",fn:m}));const o=e=>{t&&t.style.display!=="none"&&!t.contains(e.target)&&(e.target.closest("td[data-journal]")||m())};document.addEventListener("click",o),n.push({el:document,type:"click",fn:o}),document.querySelectorAll(".p05-policy-table td[data-journal]").forEach(e=>{const i=g=>{const c=e.dataset.journal,p=e.dataset.dim,f=`${c}-${p}`,I=O[f]||"暂无详细说明。";r.textContent=`${c} — ${p}`,s.textContent=I,t.style.display="block";const q=e.getBoundingClientRect(),x=320;let d=q.left+window.scrollX,P=q.bottom+window.scrollY+8;d+x>window.innerWidth-16&&(d=window.innerWidth-x-16),d<8&&(d=8),t.style.left=d+"px",t.style.top=P+"px",g.stopPropagation()};e.addEventListener("click",i),n.push({el:e,type:"click",fn:i})}),Y();const h={ok:"可以用",declare:"需要声明",forbid:"禁止使用"};document.querySelectorAll(".p05-quiz-card").forEach(e=>{const i=parseInt(e.dataset.idx,10),g=N[i],c=e.querySelector(".p05-quiz-result");let p=!1;e.querySelectorAll(".p05-quiz-btn").forEach(f=>{const I=()=>{if(p)return;p=!0;const x=f.dataset.choice===g.answer;e.querySelectorAll(".p05-quiz-btn").forEach(d=>{d.dataset.choice===g.answer?d.classList.add(x&&d===f?"correct":"reveal"):d===f&&d.classList.add("wrong")}),c.textContent=(x?"✅ 正确！":`❌ 正确答案是「${h[g.answer]}」。`)+" "+g.feedback,c.className=`p05-quiz-result show ${x?"correct-msg":"wrong-msg"}`};f.addEventListener("click",I),n.push({el:f,type:"click",fn:I})})});const w=document.getElementById("p05-sel-journal"),k=document.getElementById("p05-sel-usage"),A=document.getElementById("p05-sel-tool"),b=document.getElementById("p05-decl-cn"),v=document.getElementById("p05-decl-en"),l=document.getElementById("p05-copy-btn");function C(){if(!w||!k||!A||!b||!v)return;const{CN:e,EN:i}=H(w.value,k.value,A.value);b.textContent=e,v.textContent=i}if(C(),[w,k,A].forEach(e=>{if(!e)return;const i=C;e.addEventListener("change",i),n.push({el:e,type:"change",fn:i})}),l){const e=()=>{const i=b?b.textContent:"",g=v?v.textContent:"",c=`【中文声明】
${i}

【English Declaration】
${g}`;navigator.clipboard.writeText(c).then(()=>{l.textContent="已复制 ✓",l.classList.add("copied"),setTimeout(()=>{l.textContent="复制全部声明",l.classList.remove("copied")},2e3)}).catch(()=>{const p=document.createElement("textarea");p.value=c,p.style.cssText="position:fixed;opacity:0;",document.body.appendChild(p),p.select(),document.execCommand("copy"),document.body.removeChild(p),l.textContent="已复制 ✓",l.classList.add("copied"),setTimeout(()=>{l.textContent="复制全部声明",l.classList.remove("copied")},2e3)})};l.addEventListener("click",e),n.push({el:l,type:"click",fn:e})}y("#p05-s1 .section-eyebrow, #p05-s1 .section-title, #p05-s1 .section-body",{stagger:.12,y:40}),y("#p05-s1 .p05-table-wrap",{stagger:0,y:30}),y("#p05-s2 .section-eyebrow, #p05-s2 .section-title, #p05-s2 .section-body",{stagger:.12,y:40}),y("#p05-s3 .section-eyebrow, #p05-s3 .section-title, #p05-s3 .section-body",{stagger:.12,y:40}),y(".p05-quiz-card",{stagger:.08,y:30}),y("#p05-s4 .section-eyebrow, #p05-s4 .section-title, #p05-s4 .section-body",{stagger:.12,y:40}),y(".p05-gen-selects, .p05-gen-output",{stagger:.12,y:30});const E=document.getElementById("p05-prev-btn"),S=document.getElementById("p05-next-btn");if(E){const e=()=>$("m2-p4");E.addEventListener("click",e),n.push({el:E,type:"click",fn:e})}if(S){const e=()=>$("m2-p6");S.addEventListener("click",e),n.push({el:S,type:"click",fn:e})}}function X(){B(),n.forEach(({el:t,type:r,fn:s})=>t.removeEventListener(r,s)),n=[],L.forEach(t=>t.disconnect()),L=[];const a=document.getElementById("p05-spectrum-wrap");a&&(a.innerHTML="")}export{X as destroy,V as init,J as render};
