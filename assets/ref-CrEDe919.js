import{k as u,g as h,f as l}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as g}from"./TabSwitcher-B5dsPqHB.js";import{n as d}from"./index-CTmOWimm.js";let n=[],s=null,i=null;function c(e,t,r,a){e&&(e.addEventListener(t,r,a),n.push({el:e,type:t,fn:r,opts:a}))}const v=[{cat:"比较",items:[{name:"柱状图",en:"Bar Chart",use:"比较不同类别的数值大小",avoid:"类别超过 12 个"},{name:"分组柱状图",en:"Grouped Bar",use:"比较多组数据在各类别的差异",avoid:"组数超过 4 个"},{name:"堆叠柱状图",en:"Stacked Bar",use:"显示各部分占总体的比例",avoid:"需要精确比较各部分"},{name:"棒棒糖图",en:"Lollipop",use:"替代柱状图，更简洁",avoid:"数据量少于 3 个"}]},{cat:"分布",items:[{name:"直方图",en:"Histogram",use:"展示连续变量的频率分布",avoid:"样本量 < 30"},{name:"箱线图",en:"Box Plot",use:"比较多组的中位数和离散度",avoid:"样本量极小（< 5）"},{name:"小提琴图",en:"Violin",use:"展示数据分布形状",avoid:"观众不熟悉统计图表"},{name:"密度图",en:"Density",use:"展示连续变量的概率密度",avoid:"需要展示具体数值"}]},{cat:"关系",items:[{name:"散点图",en:"Scatter",use:"展示两个连续变量的关系",avoid:"数据点重叠严重"},{name:"气泡图",en:"Bubble",use:"散点图 + 第三维度（大小）",avoid:"气泡大小差异不明显"},{name:"热力图",en:"Heatmap",use:"展示矩阵数据的模式",avoid:"类别数 < 3"},{name:"相关矩阵",en:"Correlation",use:"展示多变量间的相关性",avoid:"变量 > 20 个"}]},{cat:"构成",items:[{name:"饼图",en:"Pie",use:"展示各部分占总体的比例",avoid:"类别 > 5 个；需精确比较"},{name:"环形图",en:"Donut",use:"饼图的现代替代，中心可放数字",avoid:"同饼图"},{name:"瀑布图",en:"Waterfall",use:"展示增减变化过程",avoid:"步骤过多"},{name:"面积图",en:"Area",use:"展示趋势和累积量",avoid:"多系列重叠遮挡"}]},{cat:"趋势",items:[{name:"折线图",en:"Line",use:"展示随时间变化的趋势",avoid:"时间点 < 3 个"},{name:"阶梯图",en:"Step",use:"展示离散时间点的变化",avoid:"数据连续变化"},{name:"斜率图",en:"Slope",use:"比较两个时间点的排名变化",avoid:"超过 2 个时间点"},{name:"脊线图",en:"Ridgeline",use:"比较多组分布随时间的变化",avoid:"组数 < 3"}]}],b=[{group:"期刊配色",palettes:[{name:"Nature",colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2"]},{name:"Science (AAAS)",colors:["#3B4992","#EE0000","#008B45","#631879","#008280","#BB0021"]},{name:"Lancet",colors:["#00468B","#ED0000","#42B540","#0099B4","#925E9F","#FDAF91"]},{name:"JAMA",colors:["#374E55","#DF8F44","#00A1D5","#B24745","#79AF97","#6A6599"]}]},{group:"色盲安全",palettes:[{name:"Okabe-Ito",colors:["#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7"]},{name:"Wong",colors:["#000000","#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00"]},{name:"Tol Bright",colors:["#4477AA","#EE6677","#228833","#CCBB44","#66CCEE","#AA3377","#BBBBBB"]}]},{group:"ColorBrewer",palettes:[{name:"Set1",colors:["#E41A1C","#377EB8","#4DAF4A","#984EA3","#FF7F00","#A65628"]},{name:"Set2",colors:["#66C2A5","#FC8D62","#8DA0CB","#E78AC3","#A6D854","#FFD92F"]},{name:"Dark2",colors:["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E","#E6AB02"]},{name:"Paired",colors:["#A6CEE3","#1F78B4","#B2DF8A","#33A02C","#FB9A99","#E31A1C"]}]},{group:"渐变配色",palettes:[{name:"Viridis",colors:["#440154","#482777","#3E4989","#31688E","#26828E","#1F9E89","#6DCD59","#FDE725"]},{name:"Plasma",colors:["#0D0887","#5B02A3","#9A179B","#CB4678","#EB7852","#FBB32F","#F0F921"]},{name:"RdBu",colors:["#B2182B","#D6604D","#F4A582","#FDDBC7","#D1E5F0","#92C5DE","#4393C3","#2166AC"]}]}],x=[{name:"Nature",single:"89mm",oneHalf:"120mm",double:"183mm",dpi:`300 (halftone)
500 (combo)`,formats:"PDF, EPS, TIFF",font:"Helvetica/Arial",fontSize:"5–7pt",notes:"无阴影、无 3D"},{name:"Science",single:"57mm",oneHalf:"120mm",double:"178mm",dpi:`300 (halftone)
500 (combo)`,formats:"PDF, EPS, TIFF",font:"Helvetica",fontSize:"6–8pt",notes:"禁用衬线字体"},{name:"Cell",single:"85mm",oneHalf:"114mm",double:"178mm",dpi:`300 (halftone)
600 (line art)`,formats:"PDF, EPS, TIFF",font:"Arial/Helvetica",fontSize:"6–8pt",notes:"白色背景"},{name:"PNAS",single:"87mm",oneHalf:"114mm",double:"178mm",dpi:"300–600",formats:"PDF, EPS, TIFF, PNG",font:"Arial",fontSize:"6–8pt",notes:"接受 PNG"},{name:"Lancet",single:"83mm",oneHalf:"—",double:"171mm",dpi:"300 (halftone)",formats:"TIFF, EPS",font:"Arial",fontSize:"6–8pt",notes:"仅 TIFF/EPS"},{name:"NEJM",single:"84mm",oneHalf:"113mm",double:"171mm",dpi:"600 (combo)",formats:"PDF, EPS, TIFF",font:"Times New Roman",fontSize:"8–10pt",notes:"允许 Times"}],y=[{format:"SVG",type:"矢量",best:"Web / 演示文稿",dpi:"无限",size:"<100KB",code:"ggsave('fig.svg', width=8, height=6)"},{format:"PDF",type:"矢量",best:"Nature/Science 投稿",dpi:"无限",size:"100KB–2MB",code:"ggsave('fig.pdf', width=8, height=6)"},{format:"PNG",type:"位图",best:"PPT / 社交媒体",dpi:"300",size:"500KB–5MB",code:"ggsave('fig.png', width=8, height=6, dpi=300)"},{format:"TIFF",type:"位图",best:"Cell/Lancet 投稿",dpi:"600",size:"5–50MB",code:"ggsave('fig.tiff', width=8, height=6, dpi=600, compression='lzw')"},{format:"EPS",type:"矢量",best:"LaTeX / 旧版期刊",dpi:"无限",size:"100KB–1MB",code:"ggsave('fig.eps', width=8, height=6, device=cairo_ps)"}],w=[{cat:"选择",items:[{key:"V",name:"选择工具",desc:"移动/选中对象"},{key:"A",name:"直接选择",desc:"选中锚点/路径"}]},{cat:"绘制",items:[{key:"P",name:"钢笔工具",desc:"绘制贝塞尔路径"},{key:"L",name:"直线工具",desc:"绘制直线段"},{key:"M",name:"矩形工具",desc:"绘制矩形/圆角矩形"}]},{cat:"编辑",items:[{key:"Ctrl+Z",name:"撤销",desc:"撤销上一步操作"},{key:"Ctrl+G",name:"编组",desc:"将选中对象编组"},{key:"Ctrl+Shift+G",name:"取消编组",desc:"解散当前编组"}]},{cat:"视图",items:[{key:"Ctrl+Y",name:"轮廓模式",desc:"切换轮廓/预览视图"},{key:"Ctrl++",name:"放大",desc:"放大视图"},{key:"Ctrl+0",name:"适合画板",desc:"将画板适配到窗口"},{key:"Space",name:"手形工具",desc:"按住拖动平移画布"}]}],E=`
/* ── Hero 光晕 ── */
.ref-hero { position: relative; overflow: hidden; }
.ref-hero::before,
.ref-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.ref-hero::before { width:55%; height:45%; top:25%; left:10%; background:rgba(240,178,122,0.12); animation:ref-drift-a 13s ease-in-out infinite alternate; }
.ref-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.08); animation:ref-drift-b 9s ease-in-out infinite alternate-reverse; }
@keyframes ref-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-20px)} }
@keyframes ref-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-25px,15px)} }

/* ── 滚动提示 ── */
.ref-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:ref-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes ref-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 通用 ── */
.ref-section { scroll-margin-top: 56px; }

/* ── 复制 Toast ── */
.ref-copy-toast {
  position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
  font-size: 14px; background: rgba(0,0,0,0.82); color: #fff;
  padding: 8px 20px; border-radius: var(--radius-full);
  pointer-events: none; opacity: 0; z-index: 999;
  transition: opacity 0.3s;
  font-family: var(--font-code);
}
.ref-copy-toast.ref-toast-show { opacity: 1; }

/* ── Tab 1: 图表选择 ── */
.ref-chart-group { margin-bottom: var(--space-lg); }
.ref-chart-group-title {
  font-size: var(--text-heading); font-weight: 600; color: var(--text-on-light);
  margin-bottom: var(--space-sm); padding-bottom: 8px;
  border-bottom: 2px solid var(--module-1);
  display: flex; align-items: center; gap: 8px;
}
.ref-chart-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
.ref-chart-card {
  background: var(--bg-light-elevated); border: 1px solid var(--border-light);
  border-radius: var(--radius-sm); padding: 16px;
  transition: box-shadow var(--t-fast);
}
.ref-chart-card:hover { box-shadow: var(--shadow-md); }
.ref-chart-name {
  font-size: 15px; font-weight: 600; color: var(--text-on-light);
  margin-bottom: 2px;
}
.ref-chart-en {
  font-size: 12px; color: var(--text-on-light-3); font-family: var(--font-code);
  margin-bottom: 8px;
}
.ref-chart-row {
  font-size: 13px; line-height: 1.6; color: var(--text-on-light-2);
}
.ref-chart-row span { font-weight: 500; color: var(--text-on-light); }
.ref-chart-avoid span { color: var(--color-error); font-weight: 500; }

/* ── Tab 2: 配色方案 ── */
.ref-palette-group { margin-bottom: var(--space-lg); }
.ref-palette-group-title {
  font-size: var(--text-heading); font-weight: 600; color: var(--text-on-light);
  margin-bottom: var(--space-sm); padding-bottom: 8px;
  border-bottom: 2px solid var(--accent);
}
.ref-palette-row {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
}
.ref-palette-name {
  width: 120px; min-width: 120px; font-size: 14px; font-weight: 500;
  color: var(--text-on-light);
}
.ref-palette-swatches { display: flex; gap: 8px; flex-wrap: wrap; }
.ref-swatch {
  width: 36px; height: 36px; border-radius: 50%; cursor: pointer;
  transition: transform 0.2s; border: 2px solid rgba(0,0,0,0.06);
  position: relative;
}
.ref-swatch:hover { transform: scale(1.18); }
.ref-swatch:active { transform: scale(0.95); }

/* ── Tab 3 & 4: 表格 ── */
.ref-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; border-radius: var(--radius-sm); }
.ref-table {
  width: 100%; border-collapse: collapse; font-size: 14px;
  background: var(--bg-dark); color: var(--text-on-dark);
}
.ref-table th {
  padding: 12px 16px; text-align: left; font-weight: 600; font-size: 13px;
  background: var(--bg-dark-elevated); color: var(--text-on-dark-2);
  border-bottom: 1px solid var(--border-dark); white-space: nowrap;
}
.ref-table td {
  padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  vertical-align: top; line-height: 1.6;
}
.ref-table tr:hover td { background: rgba(255,255,255,0.03); }
.ref-table td:first-child { font-weight: 600; color: var(--text-on-dark); white-space: nowrap; }
.ref-table .ref-code-cell {
  font-family: var(--font-code); font-size: 12px; color: var(--accent);
  white-space: pre-wrap; word-break: break-all; position: relative;
}
.ref-copy-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border-dark);
  background: transparent; color: var(--text-on-dark-3); cursor: pointer;
  transition: all var(--t-fast); margin-left: 8px; vertical-align: middle;
  font-size: 13px;
}
.ref-copy-btn:hover { background: rgba(255,255,255,0.08); color: var(--accent); }
.ref-dpi-cell { white-space: pre-line; }

/* ── Tab 5: 快捷键 ── */
.ref-shortcut-group { margin-bottom: var(--space-lg); }
.ref-shortcut-group-title {
  font-size: var(--text-heading); font-weight: 600; color: var(--text-on-light);
  margin-bottom: var(--space-sm); padding-bottom: 8px;
  border-bottom: 2px solid var(--module-3);
}
.ref-shortcut-list { display: flex; flex-direction: column; gap: 6px; }
.ref-shortcut-item {
  display: flex; align-items: center; gap: var(--space-sm);
  padding: 8px 12px; border-radius: var(--radius-sm);
  transition: background var(--t-fast);
}
.ref-shortcut-item:hover { background: rgba(0,0,0,0.03); }
.ref-key {
  display: inline-block; min-width: 36px; padding: 4px 10px;
  font-family: var(--font-code); font-size: 13px; font-weight: 600;
  text-align: center; color: var(--text-on-light);
  background: var(--bg-light-alt); border: 1px solid var(--border-light);
  border-bottom-width: 3px; border-radius: 6px;
  white-space: nowrap;
}
.ref-shortcut-name { font-weight: 500; color: var(--text-on-light); font-size: 14px; min-width: 100px; }
.ref-shortcut-desc { color: var(--text-on-light-2); font-size: 13px; }

/* ── 移动端 ── */
@media (max-width: 768px) {
  .ref-chart-grid { grid-template-columns: 1fr; }
  .ref-palette-row { flex-direction: column; align-items: flex-start; gap: 6px; }
  .ref-palette-name { width: auto; min-width: auto; }
  .ref-palette-swatches { gap: 6px; }
  .ref-swatch { width: 32px; height: 32px; }
  .ref-table { font-size: 13px; }
  .ref-table th, .ref-table td { padding: 8px 10px; }
  .ref-shortcut-item { flex-wrap: wrap; gap: 8px; }
  .ref-shortcut-name { min-width: auto; }
}
`;function B(){return v.map(e=>`
    <div class="ref-chart-group">
      <div class="ref-chart-group-title">${e.cat}</div>
      <div class="ref-chart-grid">
        ${e.items.map(t=>`
          <div class="ref-chart-card">
            <div class="ref-chart-name">${t.name}</div>
            <div class="ref-chart-en">${t.en}</div>
            <div class="ref-chart-row"><span>适用：</span>${t.use}</div>
            <div class="ref-chart-row ref-chart-avoid"><span>避免：</span>${t.avoid}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("")}function k(){return b.map(e=>`
    <div class="ref-palette-group">
      <div class="ref-palette-group-title">${e.group}</div>
      ${e.palettes.map(t=>`
        <div class="ref-palette-row">
          <div class="ref-palette-name">${t.name}</div>
          <div class="ref-palette-swatches">
            ${t.colors.map(r=>`<div class="ref-swatch" data-color="${r}" style="background:${r};" title="${r}"></div>`).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `).join("")}function F(){return`
    <div class="ref-table-wrap">
      <table class="ref-table">
        <thead>
          <tr>
            <th>期刊</th><th>单栏</th><th>1.5栏</th><th>双栏</th>
            <th>DPI</th><th>格式</th><th>字体</th><th>字号</th><th>备注</th>
          </tr>
        </thead>
        <tbody>
          ${x.map(e=>`
            <tr>
              <td>${e.name}</td><td>${e.single}</td><td>${e.oneHalf}</td><td>${e.double}</td>
              <td class="ref-dpi-cell">${e.dpi}</td><td>${e.formats}</td>
              <td>${e.font}</td><td>${e.fontSize}</td><td>${e.notes}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}function A(){return`
    <div class="ref-table-wrap">
      <table class="ref-table">
        <thead>
          <tr>
            <th>格式</th><th>类型</th><th>最佳用途</th>
            <th>DPI</th><th>文件大小</th><th>R 代码</th>
          </tr>
        </thead>
        <tbody>
          ${y.map(e=>`
            <tr>
              <td>${e.format}</td><td>${e.type}</td><td>${e.best}</td>
              <td>${e.dpi}</td><td>${e.size}</td>
              <td class="ref-code-cell">
                <code>${e.code}</code>
                <button class="ref-copy-btn" data-copy="${e.code.replace(/"/g,"&quot;")}" title="复制代码">&#x2398;</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `}function T(){return w.map(e=>`
    <div class="ref-shortcut-group">
      <div class="ref-shortcut-group-title">${e.cat}</div>
      <div class="ref-shortcut-list">
        ${e.items.map(t=>`
          <div class="ref-shortcut-item">
            <span class="ref-key">${t.key}</span>
            <span class="ref-shortcut-name">${t.name}</span>
            <span class="ref-shortcut-desc">${t.desc}</span>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("")}function z(){return`
    <style>${E}</style>
    <div class="page-scroll">

      <!-- ═══ Hero ═══ -->
      <section class="section-dark section-hero-full ref-hero" id="ref-hero">
        <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
          <p class="hero-eyebrow" style="opacity:0;">Quick Reference</p>
          <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">速查手册</h1>
          <p class="page-hero-sub" style="opacity:0;">Quick Reference</p>
          <p class="ref-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">图表 · 配色 · 期刊 · 导出 · 快捷键——随时查阅，一键复制</p>
          <div class="ref-scroll-hint" style="opacity:0;">↓ 向下探索</div>
        </div>
      </section>

      <!-- ═══ Tab 区域 ═══ -->
      <section class="section-light ref-section" id="ref-tabs-section" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
        <div style="max-width:var(--w-full);margin:0 auto;">
          <div id="ref-tabs-mount" style="margin-bottom:var(--space-xl);"></div>
          <div id="ref-content"></div>
        </div>
      </section>

      <!-- ═══ Footer CTA ═══ -->
      <section class="section-dark page-footer-cta" style="padding:var(--space-3xl) var(--space-lg);">
        <h2 class="page-footer-quote">查得到，用得上——好工具让好研究被看见。</h2>
        <div class="page-footer-nav">
          <button class="btn-ghost" id="ref-prev-btn">← 学术海报与 GA</button>
          <button class="btn-primary" id="ref-next-btn">回到首页 →</button>
        </div>
      </section>

      <!-- Toast -->
      <div class="ref-copy-toast" id="ref-toast"></div>

    </div>
  `}function p(e){const t=document.getElementById("ref-toast");t&&(t.textContent=e,t.classList.add("ref-toast-show"),i&&clearTimeout(i),i=setTimeout(()=>{t.classList.remove("ref-toast-show")},1200))}function f(e){if(navigator.clipboard)navigator.clipboard.writeText(e).then(()=>{p(`已复制 ${e}`)});else{const t=document.createElement("textarea");t.value=e,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),p(`已复制 ${e}`)}}function m(e){const t=document.getElementById("ref-content");if(!t)return;const a={charts:B,palettes:k,journals:F,export:A,shortcuts:T}[e];a&&(t.innerHTML=a(),h.fromTo(t,{opacity:0,y:10},{opacity:1,y:0,duration:.4,ease:"power3.out"}),C(e,t))}function C(e,t){e==="palettes"&&t.querySelectorAll(".ref-swatch").forEach(a=>{const o=()=>f(a.dataset.color);a.addEventListener("click",o),n.push({el:a,type:"click",fn:o})}),e==="export"&&t.querySelectorAll(".ref-copy-btn").forEach(a=>{const o=()=>f(a.dataset.copy);a.addEventListener("click",o),n.push({el:a,type:"click",fn:o})})}function P(){const e=h.timeline({delay:.2});e.fromTo(".ref-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),e.fromTo(".ref-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),e.fromTo(".ref-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),e.fromTo(".ref-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),e.fromTo(".ref-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.6);const t=document.getElementById("ref-tabs-mount");t&&(s=g(t,{tabs:[{id:"charts",label:"图表选择"},{id:"palettes",label:"配色方案"},{id:"journals",label:"期刊规格"},{id:"export",label:"导出格式"},{id:"shortcuts",label:"快捷键"}],activeId:"charts",variant:"pill",onChange:o=>{m(o)}}),m("charts")),l("#ref-tabs-section",{y:40,duration:.8}),l(".page-footer-quote",{y:40,duration:.9}),l(".page-footer-cta .page-footer-nav",{y:25,duration:.6});const r=document.getElementById("ref-prev-btn"),a=document.getElementById("ref-next-btn");r&&c(r,"click",()=>d("m4-p4")),a&&c(a,"click",()=>d("home"))}function I(){u(),n.forEach(({el:e,type:t,fn:r,opts:a})=>{e.removeEventListener(t,r,a)}),n=[],s&&(s.destroy(),s=null),i&&(clearTimeout(i),i=null)}export{I as destroy,P as init,z as render};
