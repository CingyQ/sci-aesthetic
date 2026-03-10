import{k,g as u,f as g}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as b}from"./index-D6DYdHif.js";let h=[],y=[];const I=[{icon:"📐",title:"分辨率不足",desc:"AI生成图默认输出1024×1024像素，仅约72 DPI。期刊要求通常≥300 DPI，放大后出现明显像素化。",tag:"高频问题"},{icon:"🔤",title:"文字乱码",desc:"AI生成的中文标注常出现乱码、字形扭曲或拼写错误，无法直接用于出版。科学术语需要人工逐一核查。",tag:"必须修复"},{icon:"⚗️",title:"科学细节错误",desc:"AI可能生成视觉上合理但科学错误的内容，如箭头方向反转、化学结构式错误、数量级标注不准确。",tag:"严重风险"},{icon:"🎨",title:"风格不统一",desc:"同一论文中多张AI生成图风格各异，与其他数据图表色彩/字体/线条粗细不协调，破坏整体视觉一致性。",tag:"常见问题"},{icon:"📋",title:"格式不合规",desc:"直接输出的PNG缺少CMYK版本、出血框或PDF矢量格式，不符合期刊投稿要求。",tag:"投稿阻断"}],f=[{id:"native",label:"① AI原生SVG",color:"#95D5B2",steps:["输入文本描述","Recraft V3 SVG 生成","直接获得SVG文件","Illustrator精修"],pros:["无损矢量，天然可编辑","颜色块状清晰，适合图标类"],cons:["写实风格效果差","复杂机制图支持有限"],use:"图标、Logo、简单流程图、色块分明的示意图"},{id:"ai-convert",label:"② AI辅助转换",color:"#7EC8E3",steps:["AI位图输出","Vectorizer.AI / StarVector","自动生成SVG路径","Illustrator清理"],pros:["支持任意AI图像输入","比Image Trace保留更多细节"],cons:["复杂图像路径数量庞大","处理时间较长（分钟级）"],use:"需要矢量化的AI生成概念图、遥感图示、复杂背景图像"},{id:"trace",label:"③ 传统Image Trace",color:"#B8B8E8",steps:["AI位图输出","Illustrator Image Trace","参数调节","扩展路径","手动清理"],pros:["本地处理，无隐私顾虑","参数可精细控制"],cons:["参数调节需经验积累","复杂渐变图效果较差"],use:"简单线稿、图标化风格AI图、色块清晰的流程图"}],z=[{num:"01",title:"清理多余路径",desc:'矢量化后通常产生数百至数千个冗余路径。使用 Illustrator 的"简化路径"（Ctrl+Alt+J）和"合并"工具，将路径数量减少到合理范围（通常减少60-80%）。',tip:'选中全部路径 → 对象→路径→简化，容差设为1-2px，勾选"预览"逐步调整。'},{num:"02",title:"统一配色系统",desc:"AI生成图的颜色往往细微差异大（例如同一绿色有数十种近似值）。用全局重新着色（Ctrl+Shift+F）将相似颜色合并，建立统一色板。",tip:"编辑→编辑颜色→重新着色图稿，减少颜色数量至5-8种，匹配论文其他图表配色。"},{num:"03",title:"修正文字标注",desc:"所有AI生成的文字必须删除重写：删除AI文字路径→使用 Helvetica/Arial 重新添加→核查所有科学术语拼写和单位格式。",tip:"期刊一般要求标注字号8-10pt，轴标签10-12pt，图标题14pt。中文场景使用 Noto Sans SC。"},{num:"04",title:"调整布局比例",desc:"根据目标期刊的图版要求（单栏宽度约86mm，双栏约176mm）调整图像比例。使用 Illustrator 的画板工具精确设置尺寸。",tip:"文档设置→画板尺寸设为期刊要求（如Nature单栏：88mm×88mm），内容等比缩放。"},{num:"05",title:"导出出版格式",desc:"最终导出需要同时提供矢量（PDF/EPS）和位图（TIFF/PNG，≥300DPI）两种格式。PDF保留可编辑性，TIFF用于生产印刷。",tip:"文件→导出→存储为→PDF（保留Illustrator编辑功能）+ 导出为→PNG（300DPI，RGB）。"}];function E(){const r=I.map(t=>`
    <div class="p03-prob-card">
      <span class="p03-prob-tag">${t.tag}</span>
      <div class="p03-prob-icon">${t.icon}</div>
      <h3 class="p03-prob-title">${t.title}</h3>
      <p class="p03-prob-desc">${t.desc}</p>
    </div>
  `).join(""),p=f.map((t,i)=>`
    <button class="p03-path-tab${i===0?" active":""}" data-tab="${t.id}" style="${i===0?`background:${t.color};border-color:${t.color};`:""}">${t.label}</button>
  `).join(""),m=f.map((t,i)=>{const d=t.steps.map((o,s)=>`
      <span class="p03-path-step" style="background:${t.color}22;color:${t.color};border:1px solid ${t.color}44;">${o}</span>
      ${s<t.steps.length-1?'<span class="p03-path-arrow">→</span>':""}
    `).join(""),e=t.pros.map(o=>`<li>${o}</li>`).join(""),n=t.cons.map(o=>`<li>${o}</li>`).join("");return`
      <div class="p03-path-panel${i===0?" active":""}" id="p03-panel-${t.id}">
        <div>
          <div class="p03-path-steps">${d}</div>
          <div class="p03-use-case" style="border-color:${t.color};background:${t.color}11;">
            <span class="p03-use-label">适用场景：</span>${t.use}
          </div>
        </div>
        <div>
          <div class="p03-pros-cons">
            <div class="p03-pros">
              <h4>优势</h4>
              <ul>${e}</ul>
            </div>
            <div class="p03-cons">
              <h4>局限</h4>
              <ul>${n}</ul>
            </div>
          </div>
        </div>
      </div>
    `}).join(""),v=z.map(t=>`
    <div class="p03-refine-card">
      <div class="p03-refine-num">${t.num}</div>
      <h3 class="p03-refine-title">${t.title}</h3>
      <p class="p03-refine-desc">${t.desc}</p>
      <div class="p03-refine-tip">${t.tip}</div>
    </div>
  `).join("");return`<div class="page-scroll">
<style>
/* ── p03 hero ── */
.p03-hero { position:relative; overflow:hidden; align-items:center; }
.p03-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 45% at 20% 30%, rgba(184,184,232,0.18) 0%, transparent 65%); animation:p03-drift-a 10s ease-in-out infinite; pointer-events:none; }
.p03-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 40% at 78% 65%, rgba(149,213,178,0.1) 0%, transparent 65%); animation:p03-drift-b 7s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p03-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(22px,-15px)} }
@keyframes p03-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,22px)} }
.p03-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p03-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p03-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 problem cards ── */
.p03-prob-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:var(--space-lg); max-width:1100px; margin:0 auto; }
.p03-prob-card { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); position:relative; overflow:hidden; }
.p03-prob-icon { font-size:2.5rem; margin-bottom:var(--space-md); }
.p03-prob-tag { position:absolute; top:var(--space-md); right:var(--space-md); background:rgba(239,68,68,0.15); color:#ef4444; font-size:0.7rem; font-weight:700; letter-spacing:0.05em; padding:3px 10px; border-radius:var(--radius-full); border:1px solid rgba(239,68,68,0.3); }
.p03-prob-title { font-size:var(--text-heading); font-weight:700; color:var(--text-on-dark); margin-bottom:var(--space-sm); font-family:var(--font-display); }
.p03-prob-desc { font-size:0.9rem; color:var(--text-on-dark-2); line-height:1.7; }

/* ── S2 path tabs ── */
.p03-path-tabs { display:flex; gap:8px; margin-bottom:var(--space-xl); flex-wrap:wrap; }
.p03-path-tab { padding:10px 24px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; font-size:0.85rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); color:var(--text-on-light-2); }
.p03-path-tab.active { color:#1d1d1f; font-weight:600; }
.p03-path-panel { display:none; }
.p03-path-panel.active { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xl); align-items:start; }
.p03-path-steps { display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:var(--space-lg); }
.p03-path-step { padding:6px 14px; border-radius:var(--radius-full); font-size:0.82rem; font-weight:500; }
.p03-path-arrow { color:var(--text-on-light-3,#999); font-size:1rem; }
.p03-pros-cons { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-bottom:var(--space-md); }
.p03-pros, .p03-cons { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-light); }
.p03-pros h4 { color:#16a34a; font-size:var(--text-small); font-weight:700; margin-bottom:var(--space-sm); }
.p03-cons h4 { color:#dc2626; font-size:var(--text-small); font-weight:700; margin-bottom:var(--space-sm); }
.p03-pros ul, .p03-cons ul { list-style:none; padding:0; font-size:0.85rem; line-height:2; color:var(--text-on-light-2); }
.p03-pros li::before { content:'✓ '; color:#22c55e; }
.p03-cons li::before { content:'✗ '; color:#ef4444; }
.p03-use-case { padding:12px 16px; border-radius:var(--radius-sm); font-size:0.88rem; color:var(--text-on-light-2); line-height:1.6; border-left:3px solid; }
.p03-use-label { font-weight:700; color:var(--text-on-light); }

/* ── S3 simulator ── */
.p03-sim-layout { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xl); align-items:start; max-width:1000px; margin:0 auto; }
.p03-sliders { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); }
.p03-slider-row { margin-bottom:var(--space-md); }
.p03-slider-label { display:flex; justify-content:space-between; margin-bottom:6px; }
.p03-slider-name { font-size:0.85rem; font-weight:600; color:var(--text-on-dark); }
.p03-slider-val { font-family:var(--font-code); font-size:0.82rem; color:var(--module-2); }
.p03-range { width:100%; accent-color:var(--module-2); cursor:pointer; }
.p03-preview-box { background:var(--bg-dark-elevated); border-radius:var(--radius-lg); padding:var(--space-md); border:1px solid var(--border-dark); }
#p03-trace-preview { width:100%; min-height:180px; }
.p03-sim-hint { font-size:0.78rem; color:var(--text-on-dark-3); text-align:center; margin-top:var(--space-sm); font-style:italic; }

/* ── S4 refine steps ── */
.p03-refine-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:var(--space-md); max-width:1200px; margin:0 auto; }
.p03-refine-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-light); position:relative; }
.p03-refine-num { font-size:clamp(2rem,4vw,3.5rem); font-weight:700; color:var(--module-2); opacity:0.2; font-family:var(--font-display); line-height:1; margin-bottom:var(--space-sm); }
.p03-refine-title { font-size:var(--text-body); font-weight:700; color:var(--text-on-light); margin-bottom:var(--space-sm); }
.p03-refine-desc { font-size:0.85rem; color:var(--text-on-light-2); line-height:1.7; margin-bottom:var(--space-sm); }
.p03-refine-tip { background:rgba(184,184,232,0.08); border-left:3px solid var(--module-2); border-radius:var(--radius-sm); padding:10px 12px; font-size:0.78rem; color:var(--text-on-light-2); line-height:1.6; font-family:var(--font-code); white-space:pre-wrap; word-wrap:break-word; }

/* ── Responsive ── */
@media (max-width:900px) {
  .p03-path-panel.active { grid-template-columns:1fr; }
  .p03-sim-layout { grid-template-columns:1fr; }
  .p03-refine-grid { grid-template-columns:repeat(2,1fr); }
}
@media (max-width:768px) {
  #p03-s1, #p03-s2, #p03-s3, #p03-s4 { scroll-margin-top:56px; }
  .p03-prob-grid { grid-template-columns:1fr; }
  .p03-refine-grid { grid-template-columns:1fr; }
  .p03-pros-cons { grid-template-columns:1fr; }
}
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p03-hero" id="p03-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 03</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">从位图到矢量：AI 输出的后处理</h1>
    <p class="page-hero-sub" style="opacity:0;">From Raster to Vector: Post-Processing AI Outputs</p>
    <p class="p03-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">AI 生成的图像只是起点，后处理决定出版质量</p>
    <nav class="hero-quicknav" id="p03-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p03-s1">常见问题</button>
      <button class="hero-quicknav__item" data-target="#p03-s2">矢量化路径</button>
      <button class="hero-quicknav__item" data-target="#p03-s3">Image Trace 模拟</button>
      <button class="hero-quicknav__item" data-target="#p03-s4">精修工作流</button>
    </nav>
    <div class="p03-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 常见问题（深色） ── -->
<section class="section-dark" id="p03-s1" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">AI 图像的五大致命伤</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-md);">为什么 AI 生成图不能直接投稿？</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">了解这五个核心问题，是制定后处理策略的基础。每一项都可能导致审稿人退稿或编辑要求返工。</p>
    </div>
    <div class="p03-prob-grid">
      ${r}
    </div>
  </div>
</section>

<!-- ── S2 矢量化三路径（浅色） ── -->
<section class="section-light" id="p03-s2" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">方法论</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-md);">矢量化的三条路径</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;max-width:620px;">从AI生成的位图到出版级矢量图，有三种主流方案。根据图像类型和工具条件，选择最合适的路径。</p>
    </div>
    <div class="p03-path-tabs" id="p03-path-tabs">
      ${p}
    </div>
    <div id="p03-path-panels">
      ${m}
    </div>
  </div>
</section>

<!-- ── S3 Image Trace 模拟器（深色） ── -->
<section class="section-dark" id="p03-s3" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1000px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">交互演示</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);margin-bottom:var(--space-md);">Image Trace 参数模拟器</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;max-width:580px;margin:0 auto;">调节四个核心参数，实时预览矢量化效果的变化。理解每个参数对结果的影响，在真实 Illustrator 中做到心中有数。</p>
    </div>
    <div class="p03-sim-layout">
      <div class="p03-sliders">
        <h3 style="font-size:var(--text-small);font-weight:700;color:var(--module-2);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:var(--space-lg);">参数控制</h3>
        <div class="p03-slider-row">
          <div class="p03-slider-label">
            <span class="p03-slider-name">颜色阈值</span>
            <span class="p03-slider-val" id="p03-val-threshold">80</span>
          </div>
          <input type="range" class="p03-range" id="p03-threshold" min="10" max="250" value="80" aria-label="颜色阈值">
        </div>
        <div class="p03-slider-row">
          <div class="p03-slider-label">
            <span class="p03-slider-name">路径精度</span>
            <span class="p03-slider-val" id="p03-val-paths">50</span>
          </div>
          <input type="range" class="p03-range" id="p03-paths" min="1" max="100" value="50" aria-label="路径精度">
        </div>
        <div class="p03-slider-row">
          <div class="p03-slider-label">
            <span class="p03-slider-name">角点锐度</span>
            <span class="p03-slider-val" id="p03-val-corners">50</span>
          </div>
          <input type="range" class="p03-range" id="p03-corners" min="0" max="100" value="50" aria-label="角点锐度">
        </div>
        <div class="p03-slider-row">
          <div class="p03-slider-label">
            <span class="p03-slider-name">噪声过滤</span>
            <span class="p03-slider-val" id="p03-val-noise">30</span>
          </div>
          <input type="range" class="p03-range" id="p03-noise" min="1" max="100" value="30" aria-label="噪声过滤">
        </div>
        <div style="margin-top:var(--space-md);padding-top:var(--space-md);border-top:1px solid var(--border-dark);">
          <p style="font-size:0.78rem;color:var(--text-on-dark-3);line-height:1.7;">
            <strong style="color:var(--text-on-dark-2);">颜色阈值</strong>越高→颜色越少，文件越小<br>
            <strong style="color:var(--text-on-dark-2);">路径精度</strong>越高→细节越多，路径越多<br>
            <strong style="color:var(--text-on-dark-2);">角点锐度</strong>越高→边角越硬，更接近几何感<br>
            <strong style="color:var(--text-on-dark-2);">噪声过滤</strong>越大→过滤细小噪点路径
          </p>
        </div>
      </div>
      <div>
        <div class="p03-preview-box">
          <p style="font-size:0.78rem;color:var(--text-on-dark-3);margin-bottom:var(--space-sm);text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">矢量化预览</p>
          <div id="p03-trace-preview"></div>
          <p class="p03-sim-hint">调节左侧参数实时更新 · 右下角显示估算路径数量</p>
        </div>
        <div style="margin-top:var(--space-md);background:var(--bg-dark-elevated);border-radius:var(--radius-md);padding:var(--space-md);border:1px solid var(--border-dark);">
          <p style="font-size:0.82rem;color:var(--text-on-dark-3);line-height:1.7;">
            💡 <strong style="color:var(--text-on-dark-2);">实战建议：</strong>对于科研图表，通常选择"高颜色阈值（120+）+ 中等精度（40-60）"，既减少文件体积，又保留主要形状。复杂机制图建议先尝试 AI 辅助转换（路径 ②）。
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S4 精修工作流（浅色） ── -->
<section class="section-light" id="p03-s4" style="padding:var(--space-2xl) var(--space-lg);">
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:var(--space-2xl);">
      <p style="font-size:var(--text-small);font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--module-2);margin-bottom:var(--space-sm);">完整工作流</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3.5rem);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);margin-bottom:var(--space-md);">矢量化后的五步精修</h2>
      <p style="font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;max-width:620px;margin:0 auto;">矢量化只是第一步。真正将AI草稿升级为出版级图表，需要系统性的精修流程。每一步都有明确的操作目标和期刊标准。</p>
    </div>
    <div class="p03-refine-grid" id="p03-refine-grid">
      ${v}
    </div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta" id="p03-footer">
  <p class="page-footer-num">03 / 06</p>
  <h2 class="page-footer-quote">AI 生成图像是草稿，精修才是作品</h2>
  <p class="page-footer-desc">掌握从位图到矢量的完整工作流，你的 AI 辅助绘图才算真正完成。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p03-prev-btn">← Prompt的艺术</button>
    <button class="btn-primary" id="p03-next-btn">AI辅助图解 →</button>
  </div>
</section>

</div>`}function x(r,p,m,v){const t=document.getElementById("p03-trace-preview");if(!t)return;const i=window.d3;if(!i){t.innerHTML='<p style="color:rgba(255,255,255,0.4);text-align:center;padding:2rem;font-size:0.85rem;">D3 未加载，无法渲染预览</p>';return}const d=400,e=300;for(;t.firstChild;)t.removeChild(t.firstChild);const n=i.select(t).append("svg").attr("viewBox",`0 0 ${d} ${e}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("border-radius","12px");n.append("rect").attr("width",d).attr("height",e).attr("fill","#1a1a2e").attr("rx",12);const o=Math.max(2,Math.round(8-r/250*6)),s=Math.max(4,Math.round(40-p/100*36)),c=i.schemeTableau10.slice(0,o);for(let l=0;l<e;l+=s)for(let a=0;a<d;a+=s){const w=c[Math.floor((a/d+l/e+v/200)*c.length)%c.length];n.append("rect").attr("x",a).attr("y",l).attr("width",s).attr("height",s).attr("fill",w).attr("opacity",.7).attr("rx",m/100*s*.5)}n.append("text").attr("x",d-10).attr("y",e-10).attr("text-anchor","end").attr("fill","rgba(255,255,255,0.4)").attr("font-size",11).attr("font-family","monospace").text(`~${Math.round(p*3+50)} 路径`)}function S(){if(!window.d3){const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js",e.onload=()=>d(),e.onerror=()=>console.warn("p03: D3 加载失败，Image Trace 模拟器不可用"),document.head.appendChild(e)}const r=u.timeline({delay:.2});r.fromTo(".p03-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),r.fromTo(".p03-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),r.fromTo(".p03-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),r.fromTo(".p03-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),r.fromTo("#p03-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),r.fromTo(".p03-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p03-quicknav .hero-quicknav__item").forEach(e=>{e.addEventListener("click",()=>{const n=e.getAttribute("data-target");if(!n)return;const o=document.querySelector(n);o&&o.scrollIntoView({behavior:"smooth",block:"start"})})}),g(".p03-prob-card",{stagger:.12,y:40});const p=document.querySelectorAll(".p03-path-tab"),m=document.querySelectorAll(".p03-path-panel");p.forEach((e,n)=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-tab"),s=f.find(a=>a.id===o),c=s?s.color:"#7EC8E3";p.forEach(a=>{a.classList.remove("active"),a.style.background="transparent",a.style.borderColor="",a.style.color=""}),e.classList.add("active"),e.style.background=c,e.style.borderColor=c,e.style.color="#1d1d1f",m.forEach(a=>a.classList.remove("active"));const l=document.getElementById(`p03-panel-${o}`);l&&(l.classList.add("active"),u.fromTo(l,{opacity:0,y:16},{opacity:1,y:0,duration:.4,ease:"power3.out"}))})});const v=[{id:"p03-threshold",valId:"p03-val-threshold",key:"threshold"},{id:"p03-paths",valId:"p03-val-paths",key:"paths"},{id:"p03-corners",valId:"p03-val-corners",key:"corners"},{id:"p03-noise",valId:"p03-val-noise",key:"noise"}],t={threshold:80,paths:50,corners:50,noise:30};let i=null;function d(){v.forEach(({id:e,valId:n,key:o})=>{const s=document.getElementById(e),c=document.getElementById(n);if(!s)return;const l=()=>{const a=parseInt(s.value,10);t[o]=a,c&&(c.textContent=a),i&&cancelAnimationFrame(i),i=requestAnimationFrame(()=>{x(t.threshold,t.paths,t.corners,t.noise),i=null})};s.addEventListener("input",l),h.push({fn:l,el:s})}),x(t.threshold,t.paths,t.corners,t.noise)}window.d3&&d(),g(".p03-refine-card",{stagger:.1,y:40}),document.getElementById("p03-prev-btn")?.addEventListener("click",()=>b("m2-p2")),document.getElementById("p03-next-btn")?.addEventListener("click",()=>b("m2-p4")),g(".p03-path-tabs",{stagger:0,y:30}),g(".p03-sim-layout",{stagger:0,y:40})}function T(){k(),h.forEach(({fn:r,el:p})=>{p&&r&&p.removeEventListener("input",r)}),h=[],y.forEach(r=>r.disconnect()),y=[]}export{T as destroy,S as init,E as render};
