import{_ as z,n as B}from"./index-e5xGBvMn.js";import{k as T,g as w}from"./ScrollAnimations-B5Kyk-Xq.js";let f=[],u=[];const S=[{id:"flowchart",label:"实验流程图",char:"线性",color:"#7EC8E3",desc:"展示实验步骤的顺序执行，适合方法部分。AI优势：快速生成标准化图标和箭头连接，自动对齐布局。"},{id:"roadmap",label:"技术路线图",char:"层级",color:"#95D5B2",desc:"展示研究框架和技术路线，适合摘要图。AI优势：层级布局复杂时自动优化视觉层次。"},{id:"mechanism",label:"机制示意图",char:"循环",color:"#B8B8E8",desc:"展示物质流或能量流的循环机制。AI优势：空间位置关系复杂，AI能生成符合直觉的视觉隐喻。"},{id:"pipeline",label:"数据分析管线",char:"分支",color:"#F0B27A",desc:"展示数据处理和分析流程，带条件判断。AI优势：Mermaid AI可直接从方法文本生成带判断节点的流程图。"},{id:"framework",label:"概念框架图",char:"网络",color:"#E07A7A",desc:"展示概念间关系，适合综述文章。AI优势：概念之间的非线性关系是AI最擅长的可视化类型。"}],C=[{label:"污水处理工艺",description:"城市污水处理厂完整工艺流程",code:`flowchart LR
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
  K --> L[脱水填埋]`},{label:"大气颗粒物来源解析",description:"PM2.5来源解析技术路线",code:`flowchart TD
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
  H --> L[二次生成 19%]`},{label:"生态系统碳汇监测",description:"涡度相关法碳通量监测技术体系",code:`flowchart LR
  A[涡度相关塔] --> B[超声风速仪\\n三维风速]
  A --> C[CO2/H2O\\n红外分析仪]
  B & C --> D[10Hz原始数据]
  D --> E[EddyPro软件\\n数据质控]
  E --> F{质量标志}
  F -->|优| G[净生态系统\\n生产力NEP]
  F -->|差| H[插补处理\\nRF/ANN]
  H --> G
  G --> I[年度碳收支\\n±gC/m²/yr]
  I --> J[与遥感GPP\\n数据融合]`}],L=[{num:"01",title:"选择合适的图解类型",desc:"根据科学内容选择最适合的图解结构：线性过程→流程图，层级框架→路线图，物质循环→机制图，数据流→分析管线，概念关系→框架图。",tip:'错误的图解类型比没有图解更容易让读者困惑。先问"信息流向是什么"，再选图解类型。'},{num:"02",title:"提炼关键节点",desc:"从方法或综述文本中提取3-7个核心节点。太少（<3）无法说明过程，太多（>8）视觉混乱，记忆负担过重。",tip:'每个节点用一个"动词+名词"格式：不是"样品"，而是"采集样品"。'},{num:"03",title:"选工具+撰写Prompt",desc:"流程图优先用Mermaid AI（文字→可编辑图）；概念示意图用GPT Image 1.5/FLUX；需要SVG直接输出用Recraft V3。然后用CDTF格式撰写详细Prompt。",tip:"对于Mermaid，先让AI生成Mermaid代码而非图片，代码更容易迭代修改。"},{num:"04",title:"迭代精修",desc:"AI首稿通常需要2-3轮迭代：第一轮检查科学准确性，第二轮调整视觉层次，第三轮统一配色与期刊其他图表。",tip:'每次迭代只修改1-2个问题，避免"什么都修改"导致失去方向。'},{num:"05",title:"矢量化与标注",desc:"Mermaid生成SVG可直接编辑；位图图解需Image Trace后删除AI文字→用正确字体重新标注→检查所有科学术语和数值。",tip:"中文标注统一用 Noto Sans SC Regular，英文标注用 Helvetica Neue，避免字体混用。"}],k=[{id:"show-flowchart",label:"实验流程图",color:"#7EC8E3",title:"污水处理工艺流程",subtitle:"Mermaid AI 生成 → SVG 导出 → Illustrator 标注优化",desc:"使用 Mermaid flowchart LR 语法，AI 一次性生成完整工艺流程。节点标注经人工核查，箭头连接符合实际水处理工艺顺序。最终导出 SVG 后在 Illustrator 中统一字体和线宽。",mermaidCode:`flowchart LR
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
  K --> L[脱水填埋]`},{id:"show-roadmap",label:"技术路线图",color:"#95D5B2",title:"PM2.5来源解析技术路线",subtitle:"Mermaid TD 布局 → 层级优化",desc:"复杂的多分支技术路线通过 Mermaid flowchart TD 实现，&并行连接语法简洁表达了多输入汇聚到受体模型的流程。结果分支用不同颜色区分来源类别。",mermaidCode:`flowchart TD
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
  H --> L[二次生成 19%]`},{id:"show-mechanism",label:"机制示意图",color:"#B8B8E8",title:"生态系统碳通量监测体系",subtitle:"涡度相关法完整数据处理链路",desc:"从传感器采集到最终碳收支计算，涡度相关法数据处理链路跨越多个软件和算法节点。Mermaid 流程图清晰展示了质量控制的条件判断分支和最终数据融合环节。",mermaidCode:`flowchart LR
  A[涡度相关塔] --> B[超声风速仪\\n三维风速]
  A --> C[CO2/H2O\\n红外分析仪]
  B & C --> D[10Hz原始数据]
  D --> E[EddyPro软件\\n数据质控]
  E --> F{质量标志}
  F -->|优| G[净生态系统\\n生产力NEP]
  F -->|差| H[插补处理\\nRF/ANN]
  H --> G
  G --> I[年度碳收支\\n±gC/m²/yr]
  I --> J[与遥感GPP\\n数据融合]`},{id:"show-pipeline",label:"数据分析管线",color:"#F0B27A",title:"基因组数据分析管线",subtitle:"带条件判断的分析流程",desc:"数据分析管线的特点是包含多个质控检查点和条件分支。AI 能够从方法文本直接生成带有菱形判断节点的流程图，显著降低了从文字到图形的转化成本。",mermaidCode:`flowchart TD
  A[原始测序数据\\nFASTQ] --> B[质量控制\\nFastQC]
  B --> C{质量达标?}
  C -->|否| D[修剪过滤\\nTrimmomatic]
  D --> B
  C -->|是| E[参考基因组比对\\nBWA-MEM]
  E --> F[BAM排序去重\\nSamtools/Picard]
  F --> G[变异检测\\nGATK HaplotypeCaller]
  G --> H{变异过滤}
  H -->|VQSR通过| I[功能注释\\nANNOVAR]
  H -->|过滤失败| J[排除]
  I --> K[下游分析\\n关联/通路富集]`},{id:"show-framework",label:"概念框架图",color:"#E07A7A",title:"生态系统服务评估框架",subtitle:"概念关系网络可视化",desc:"综述文章中的概念框架图需要展示非线性的概念关系网络。AI 能够从概念描述文本中识别主要节点和关联关系，生成初始框架后再由作者调整重要性排序和视觉层级。",mermaidCode:`flowchart TD
  A[生态系统结构与过程] --> B[供给服务]
  A --> C[调节服务]
  A --> D[文化服务]
  A --> E[支持服务]
  B --> F[粮食/淡水/木材]
  C --> G[气候调节/水净化]
  D --> H[休闲/美学/精神]
  E --> I[土壤形成/养分循环]
  F & G & H & I --> J[人类福祉]
  J --> K{驱动力}
  K -->|直接| L[土地利用变化]
  K -->|间接| M[气候变化/政策]
  L & M --> A`}];let b=null,x=!1;async function D(){try{b=(await z(()=>import("https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs"),[])).default,b.initialize({startOnLoad:!1,theme:"dark",securityLevel:"loose",themeVariables:{primaryColor:"#2d2d4a",primaryTextColor:"#f5f5f7",lineColor:"#B8B8E8",background:"#1d1d1f"}}),x=!0}catch(n){console.warn("Mermaid load failed:",n)}}async function M(n,p){if(!x||!b){const h=document.getElementById(p);h&&(h.innerHTML=`<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${n}</pre>`);return}const d=document.getElementById(p);if(d)try{const h="mg-"+Math.random().toString(36).slice(2,8),{svg:v}=await b.render(h,n);d.innerHTML=v;const t=d.querySelector("svg");t&&(t.style.display="block",t.style.height="auto")}catch{d&&(d.innerHTML=`<pre style="color:var(--text-on-dark-2);font-size:0.78rem;padding:var(--space-md);white-space:pre-wrap;word-wrap:break-word;">${n}</pre>`)}}function F(){const n=window.d3;if(!n)return;const p=document.querySelectorAll(".p04-type-card");S.forEach((d,h)=>{const v=p[h]?.querySelector(".p04-type-thumb");if(!v)return;const t=d.color,o=n.select(v).append("svg").attr("viewBox","0 0 100 60").style("width","100%").style("height","auto");if(o.append("rect").attr("width",100).attr("height",60).attr("fill","none"),d.id==="flowchart")[[8,20,22,18],[41,20,22,18],[74,20,22,18]].forEach(([i,l,m,g])=>o.append("rect").attr("x",i).attr("y",l).attr("width",m).attr("height",g).attr("rx",3).attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5)),[[30,29],[63,29]].forEach(([i,l])=>o.append("line").attr("x1",i).attr("y1",l).attr("x2",i+11).attr("y2",l).attr("stroke",t).attr("stroke-width",1.5)),[[41,26],[74,26]].forEach(([i,l])=>o.append("polygon").attr("points",`${i},${l} ${i-5},${l+3} ${i-5},${l-3}`).attr("fill",t));else if(d.id==="roadmap")o.append("rect").attr("x",38).attr("y",5).attr("width",24).attr("height",15).attr("rx",3).attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5),[[8,38,22,15],[39,38,22,15],[70,38,22,15]].forEach(([i,l,m,g])=>o.append("rect").attr("x",i).attr("y",l).attr("width",m).attr("height",g).attr("rx",3).attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5)),[[50,20,19,38],[50,20,80,38],[50,20,50,38]].forEach(([i,l,m,g])=>o.append("line").attr("x1",i).attr("y1",l).attr("x2",m).attr("y2",g).attr("stroke",t).attr("stroke-width",1).attr("opacity",.6));else if(d.id==="mechanism")[[50,15],[25,45],[75,45]].forEach(([i,l])=>o.append("circle").attr("cx",i).attr("cy",l).attr("r",12).attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5)),o.append("path").attr("d","M 37 20 Q 25 30 30 40").attr("fill","none").attr("stroke",t).attr("stroke-width",1.5),o.append("path").attr("d","M 63 20 Q 75 30 70 40").attr("fill","none").attr("stroke",t).attr("stroke-width",1.5),o.append("path").attr("d","M 37 48 Q 50 58 63 48").attr("fill","none").attr("stroke",t).attr("stroke-width",1.5);else if(d.id==="pipeline")o.append("polygon").attr("points","50,5 80,30 50,55 20,30").attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5),o.append("line").attr("x1",50).attr("y1",55).attr("x2",25).attr("y2",55).attr("stroke",t).attr("stroke-width",1.5),o.append("line").attr("x1",50).attr("y1",55).attr("x2",75).attr("y2",55).attr("stroke",t).attr("stroke-width",1.5);else if(d.id==="framework"){const i=[[50,30],[20,15],[80,15],[20,48],[80,48]];i.slice(1).forEach(([l,m])=>o.append("line").attr("x1",50).attr("y1",30).attr("x2",l).attr("y2",m).attr("stroke",t).attr("stroke-width",1).attr("opacity",.5)),i.forEach(([l,m],g)=>o.append("circle").attr("cx",l).attr("cy",m).attr("r",g===0?10:7).attr("fill",t+"33").attr("stroke",t).attr("stroke-width",1.5))}})}function q(){const n=S.map((t,o)=>`
    <div class="p04-type-card" data-type-id="${t.id}" tabindex="0" role="button" aria-label="${t.label}">
      <div class="p04-type-thumb" id="p04-thumb-${t.id}"></div>
      <div class="p04-type-char">${t.char}</div>
      <div class="p04-type-label">${t.label}</div>
    </div>
  `).join(""),p=C.map((t,o)=>`
    <button class="p04-scene-tab${o===0?" active":""}" data-scene="${o}">${t.label}</button>
  `).join(""),d=L.map(t=>`
    <div class="p04-collab-card">
      <div class="p04-collab-num">${t.num}</div>
      <h3 class="p04-collab-title">${t.title}</h3>
      <p class="p04-collab-desc">${t.desc}</p>
      <div class="p04-collab-tip">${t.tip}</div>
    </div>
  `).join(""),h=k.map((t,o)=>`
    <button class="p04-showcase-tab${o===0?" active":""}" data-showcase="${t.id}" style="${o===0?`border-color:${t.color};color:${t.color};background:${t.color}18;`:""}">${t.label}</button>
  `).join(""),v=k.map((t,o)=>`
    <div class="p04-showcase-panel${o===0?" active":""}" id="${t.id}">
      <div style="background:var(--bg-dark-elevated);border-radius:var(--radius-lg);border:1px solid ${t.color}33;overflow:hidden;">
        <div style="padding:var(--space-lg);border-bottom:1px solid ${t.color}22;">
          <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${t.color};margin-bottom:6px;">${t.label}</p>
          <h3 style="font-family:var(--font-display);font-size:var(--text-heading);font-weight:700;color:var(--text-on-dark);margin-bottom:4px;">${t.title}</h3>
          <p style="font-size:0.8rem;color:var(--text-on-dark-3);">${t.subtitle}</p>
        </div>
        <div style="padding:var(--space-lg);">
          <div id="p04-showcase-mermaid-${o}" style="background:${t.color}0d;border-radius:var(--radius-md);border:1px solid ${t.color}22;min-height:160px;margin-bottom:var(--space-lg);overflow:auto;-webkit-overflow-scrolling:touch;max-height:400px;">
            <div style="display:flex;align-items:center;justify-content:center;min-height:160px;color:var(--text-on-dark-3);font-size:0.82rem;">加载图解中…</div>
          </div>
          <p style="font-size:0.88rem;color:var(--text-on-dark-2);line-height:1.75;">${t.desc}</p>
        </div>
      </div>
    </div>
  `).join("");return`<div class="page-scroll">
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
      ${n}
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
      ${p}
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
      ${d}
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
      ${h}
    </div>
    <div id="p04-showcase-container">
      ${v}
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

</div>`}let $=0;function _(){const n=w.timeline({delay:.2});n.fromTo(".p04-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),n.fromTo(".p04-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),n.fromTo(".p04-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),n.fromTo(".p04-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),n.fromTo("#p04-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),n.fromTo(".p04-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p04-quicknav .hero-quicknav__item").forEach(e=>{const a=s=>{const r=document.querySelector(e.dataset.target);r&&r.scrollIntoView({behavior:"smooth"})};e.addEventListener("click",a),f.push({el:e,type:"click",fn:a})}),F();const p=document.getElementById("p04-type-detail"),d=document.getElementById("p04-detail-title"),h=document.getElementById("p04-detail-desc");document.querySelectorAll(".p04-type-card").forEach((e,a)=>{const s=()=>{const c=S[a],y=e.classList.contains("active");if(document.querySelectorAll(".p04-type-card").forEach(H=>H.classList.remove("active")),y){p.classList.remove("show");return}e.classList.add("active"),d.textContent=c.label,p.style.borderColor=c.color,d.style.color=c.color,h.textContent=c.desc,p.classList.add("show"),setTimeout(()=>p.scrollIntoView({behavior:"smooth",block:"nearest"}),50)},r=c=>{(c.key==="Enter"||c.key===" ")&&(c.preventDefault(),s())};e.addEventListener("click",s),e.addEventListener("keydown",r),f.push({el:e,type:"click",fn:s}),f.push({el:e,type:"keydown",fn:r})});const v=new IntersectionObserver(e=>{e.forEach(a=>{a.isIntersecting&&(a.target.querySelectorAll(".p04-type-card").forEach((r,c)=>{w.fromTo(r,{opacity:0,y:30},{opacity:1,y:0,duration:.5,delay:c*.08,ease:"power3.out"})}),v.unobserve(a.target))})},{threshold:.1}),t=document.getElementById("p04-type-grid");t&&v.observe(t),u.push(v);const o=async e=>{$=e;const a=C[e];document.querySelectorAll(".p04-scene-tab").forEach((c,y)=>{c.classList.toggle("active",y===e)});const s=document.getElementById("p04-scene-desc");s&&(s.textContent=a.description);const r=document.getElementById("p04-code-display");r&&(r.textContent=a.code),await M(a.code,"p04-mermaid-output")};document.querySelectorAll(".p04-scene-tab").forEach((e,a)=>{const s=()=>o(a).catch(r=>console.warn("p04 scene switch failed:",r));e.addEventListener("click",s),f.push({el:e,type:"click",fn:s})});const i=document.getElementById("p04-copy-btn");if(i){const e=async()=>{const a=C[$].code;try{await navigator.clipboard.writeText(a)}catch{const s=document.createElement("textarea");s.value=a,s.style.cssText="position:fixed;opacity:0;",document.body.appendChild(s),s.select(),document.execCommand("copy"),document.body.removeChild(s)}i.textContent="已复制！",i.classList.add("copied"),setTimeout(()=>{i.textContent="复制代码",i.classList.remove("copied")},2e3)};i.addEventListener("click",e),f.push({el:i,type:"click",fn:e})}D().then(()=>o(0)).catch(e=>console.warn("p04 init failed:",e));const l=new IntersectionObserver(e=>{e.forEach(a=>{a.isIntersecting&&(a.target.querySelectorAll(".p04-collab-card").forEach((r,c)=>{w.fromTo(r,{opacity:0,y:30},{opacity:1,y:0,duration:.5,delay:c*.1,ease:"power3.out"})}),l.unobserve(a.target))})},{threshold:.15}),m=document.querySelector(".p04-collab-grid");m&&l.observe(m),u.push(l);const g=new Set,E=async e=>{if(g.has(e))return;g.add(e);const a=k[e];!a||!a.mermaidCode||await M(a.mermaidCode,`p04-showcase-mermaid-${e}`)};if(document.querySelectorAll(".p04-showcase-tab").forEach((e,a)=>{const s=()=>{document.querySelectorAll(".p04-showcase-tab").forEach((r,c)=>{const y=k[c];r.classList.toggle("active",c===a),c===a?(r.style.borderColor=y.color,r.style.color=y.color,r.style.background=y.color+"18"):(r.style.borderColor="",r.style.color="",r.style.background="")}),document.querySelectorAll(".p04-showcase-panel").forEach((r,c)=>{r.classList.toggle("active",c===a)}),E(a).catch(r=>console.warn("p04 showcase mermaid render failed:",r))};e.addEventListener("click",s),f.push({el:e,type:"click",fn:s})}),x)E(0).catch(e=>console.warn("p04 showcase render failed:",e));else{const e=()=>{x?E(0).catch(a=>console.warn("p04 showcase render failed:",a)):setTimeout(e,100)};e()}document.querySelectorAll("#p04-s1 h2, #p04-s2 h2, #p04-s3 h2, #p04-s4 h2").forEach(e=>{const a=new IntersectionObserver(s=>{s.forEach(r=>{r.isIntersecting&&(w.fromTo(r.target,{opacity:0,y:20},{opacity:1,y:0,duration:.7,ease:"power3.out"}),a.unobserve(r.target))})},{threshold:.2});a.observe(e),u.push(a)});const A=document.getElementById("p04-prev-btn"),I=document.getElementById("p04-next-btn");if(A){const e=()=>B("m2-p3");A.addEventListener("click",e),f.push({el:A,type:"click",fn:e})}if(I){const e=()=>B("m2-p5");I.addEventListener("click",e),f.push({el:I,type:"click",fn:e})}}function O(){T(),f.forEach(({el:n,type:p,fn:d})=>n.removeEventListener(p,d)),f=[],u.forEach(n=>n.disconnect()),u=[],b=null,x=!1}export{O as destroy,_ as init,q as render};
