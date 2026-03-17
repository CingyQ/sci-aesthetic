import{k as Ht,g as Q}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as Pt}from"./CodeEditor-CmZbxDVd.js";import{c as It}from"./CopyButton-2sIiwDp8.js";import{n as vt}from"./index-BTO2Mx9C.js";import{l as L,f as yt,s as kt}from"./transform-ChPGlSkf.js";import{m as F}from"./min-D1slsF82.js";import{m as B}from"./max-DBeXZoyG.js";import{r as ct,b as R,p as _t}from"./band-DqVyTAN-.js";import{s as wt}from"./ramp-CDwHjghK.js";import{e as qt,d as Vt,m as nt,c as jt,s as Ot,t as Gt,a as Ct,S as Et}from"./expand-DfSUL-Pe.js";import{b as Nt}from"./bin-D7xP0THh.js";import{q as O}from"./quantile-BCo-3LWc.js";import{s as ft}from"./sum-CB6J5KXz.js";import{a as W,b as E,c as Yt}from"./axis-FVV8vvN_.js";import{a as U}from"./area-BnRBWshW.js";import{b as N,R as Zt}from"./basis-DxYen36A.js";import{l as K,c as Ut}from"./line-DQLATXjo.js";import{s as st}from"./stack-BL_seWro.js";import{p as Kt,v as Jt}from"./viridis-DFAhIwmg.js";import{c as Wt}from"./catmullRom-Dm0ttBHj.js";import{m as $t}from"./monotone-KI2q-aQs.js";import"./math-CRUJxRjv.js";import"./path-BckJrc8i.js";import"./colors-Cc3OSVma.js";function D(t){let e=t;return()=>(e=e*1664525+1013904223&4294967295,(e>>>0)/4294967295)}function G(t){return()=>{const e=Math.max(1e-10,t()),n=t();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*n)}}const Bt=(()=>{const t=D(42),e=G(t),n=[{name:"setosa",mx:5,sx:.35,my:1.5,sy:.18},{name:"versicolor",mx:5.9,sx:.52,my:4.3,sy:.47},{name:"virginica",mx:6.6,sx:.63,my:5.5,sy:.55}],d=[];return n.forEach(v=>{for(let a=0;a<20;a++)d.push({x:v.mx+v.sx*e(),y:v.my+v.sy*e(),sp:v.name})}),d})(),Xt=(()=>{const t=D(100);return["Control","Trt-A","Trt-B","Trt-C","Trt-D"].map(n=>({cat:n,values:[{grp:"Week 1",mean:25+t()*25,se:2+t()*4},{grp:"Week 8",mean:40+t()*40,se:3+t()*6}]}))})(),V=(()=>{const t=D(200),e=["W0","W1","W2","W3","W4"];return[{grp:"Control",color:"#7EC8E3",base:30,slope:2},{grp:"Low Dose",color:"#F0B27A",base:30,slope:9},{grp:"High Dose",color:"#95D5B2",base:30,slope:15}].map(n=>({grp:n.grp,color:n.color,pts:e.map((d,v)=>({w:d,val:n.base+n.slope*v+(t()-.5)*10}))}))})(),At=(()=>{const t=D(300),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(n=>({name:n.name,pts:Array.from({length:30},()=>Math.max(0,n.mu+n.sigma*e()))}))})(),tt=(()=>{const t=D(400),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(n=>({name:n.name,pts:Array.from({length:50},()=>Math.max(0,n.mu+n.sigma*e()))}))})(),et=(()=>{const t=D(500),e=G(t),n=[];for(let d=0;d<120;d++)n.push(30+8*e());for(let d=0;d<80;d++)n.push(65+10*e());return n})(),gt=(()=>{const t=D(600),e=G(t);return[{grp:"Control",color:"#7EC8E3",mu:30,sigma:6},{grp:"Low Dose",color:"#F0B27A",mu:48,sigma:9},{grp:"High Dose",color:"#95D5B2",mu:62,sigma:7}].map(n=>({grp:n.grp,color:n.color,pts:Array.from({length:80},()=>Math.max(0,n.mu+n.sigma*e()))}))})(),at=(()=>{const t=D(700),e=["BRCA1","TP53","MYC","EGFR","VEGF","CDK4"],n=["Ctrl","Trt-1h","Trt-6h","Trt-24h","Recover"];return e.map((d,v)=>({gene:d,values:n.map((a,c)=>({cond:a,val:(t()-.5)*4+Math.sin(v*1.1+c*.7)*1.5}))}))})(),rt=(()=>{const t=D(800);return["Control","Group A","Group B","Group C","Group D","Group E"].map(n=>{const d=8+Math.floor(t()*12),v=20+t()*60,a=5+t()*15,c=a/Math.sqrt(d);return{grp:n,mean:v,se:c,sd:a,ci95:c*1.96}})})(),Qt=(()=>{const t=D(900);return["BRCA2","KRAS","PIK3CA","APC","PTEN","RB1","SMAD4","VHL"].map(n=>({gene:n,val:(t()-.4)*6}))})(),ot=(()=>{const t=D(1e3),e=G(t);return["Week 0","Week 4","Week 8","Week 12"].map((n,d)=>({tp:n,pts:Array.from({length:50},()=>Math.max(0,30+d*12+(5+d*2)*e()))}))})(),mt={setosa:"#7EC8E3",versicolor:"#F0B27A",virginica:"#95D5B2"},it=["#7EC8E3","#F0B27A"],Mt=["#7EC8E3","#F0B27A","#95D5B2"],xt="#0f1117",Y=[{id:"scatter",name:"散点图",en:"Scatter Plot",tags:["连续 × 连续","相关分析"],desc:"展示两连续变量关系，支持分组着色、回归线",info:"Iris 数据集 · 60 个观测点 · 3 物种"},{id:"bar",name:"柱状图",en:"Bar Chart",tags:["分类 × 连续","组间比较"],desc:"比较不同类别的数值，支持分组/堆叠/百分比",info:"5 个处理组 · 2 个时间点 · 模拟实验数据"},{id:"line",name:"折线图",en:"Line Chart",tags:["时间序列","趋势分析"],desc:"展示随时间变化的趋势，支持面积填充",info:"5 个时间点 · 3 个治疗组 · 纵向研究数据"},{id:"boxplot",name:"箱线图",en:"Box Plot",tags:["分类 × 连续","分布比较"],desc:"展示分布中位数、四分位和异常值",info:"3 组 · 每组 30 个观测值 · 模拟临床数据"},{id:"violin",name:"小提琴图",en:"Violin Plot",tags:["分类 × 连续","分布形态"],desc:"核密度估计展示完整分布形状，比箱线图信息更丰富",info:"3 组 · 每组 50 个观测值 · 模拟临床数据"},{id:"histogram",name:"直方图",en:"Histogram",tags:["单变量","频率分布"],desc:"展示单个连续变量的频率分布，揭示数据偏斜与双峰",info:"200 个观测值 · 双峰分布 · 模拟生物学数据"},{id:"density",name:"密度图",en:"Density Plot",tags:["分布对比","多组叠加"],desc:"核密度估计平滑展示分布，多组重叠对比时优于直方图",info:"3 组 · 每组 80 个观测值 · 模拟测量数据"},{id:"heatmap",name:"热力图",en:"Heatmap",tags:["矩阵数据","表达量"],desc:"用颜色编码矩阵数值，常用于基因表达和相关性矩阵",info:"6 基因 × 5 条件 · 模拟转录组数据"},{id:"area",name:"面积图",en:"Area Chart",tags:["时间序列","组成变化"],desc:"展示随时间变化的组成比例，堆叠面积突出总量变化",info:"5 个时间点 · 3 个处理组 · 比例数据"},{id:"errorbar",name:"误差线图",en:"Error Bar",tags:["均值 ± 误差","统计推断"],desc:"展示均值与不确定性（SE/SD/CI），科研报告标配",info:"6 个处理组 · 模拟实验重复数据"},{id:"lollipop",name:"棒棒糖图",en:"Lollipop",tags:["排名比较","简洁柱状"],desc:"比柱状图更简洁，适合展示排名和单值比较",info:"8 个基因 · 差异表达量 · 模拟 RNA-seq"},{id:"ridgeline",name:"山脊图",en:"Ridgeline",tags:["多组分布","时序演变"],desc:"纵向堆叠的密度图，优雅展示多组分布的变化趋势",info:"4 个时间点 · 每时间点 50 个观测值"}],te={scatter:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35"/>
<line x1="18" y1="33" x2="142" y2="33" stroke="#1e2030" stroke-width="0.35"/>
<line x1="56" y1="81" x2="56" y2="8" stroke="#1e2030" stroke-width="0.35"/>
<line x1="96" y1="81" x2="96" y2="8" stroke="#1e2030" stroke-width="0.35"/>
<circle cx="26" cy="74" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="32" cy="70" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="29" cy="65" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="38" cy="72" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="36" cy="63" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="24" cy="61" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="42" cy="68" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="31" cy="57" r="3" fill="#7EC8E3" opacity="0.8"/>
<circle cx="62" cy="52" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="71" cy="45" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="66" cy="40" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="78" cy="50" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="82" cy="43" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="57" cy="44" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="74" cy="36" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="69" cy="55" r="3" fill="#F0B27A" opacity="0.8"/>
<circle cx="102" cy="30" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="110" cy="23" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="117" cy="17" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="107" cy="20" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="114" cy="31" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="122" cy="14" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="120" cy="25" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="96" cy="34" r="3" fill="#95D5B2" opacity="0.8"/>
<line x1="20" y1="78" x2="138" y2="11" stroke="#7EC8E3" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/>
</svg>`,bar:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<rect x="22" y="57" width="11" height="24" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="33" y="40" width="11" height="41" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="54" y="62" width="11" height="19" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="65" y="27" width="11" height="54" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="86" y="51" width="11" height="30" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="97" y="18" width="11" height="63" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="118" y="59" width="11" height="22" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="129" y="36" width="11" height="45" fill="#F0B27A" rx="1.5" opacity="0.9"/>
</svg>`,line:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35"/>
<line x1="18" y1="33" x2="142" y2="33" stroke="#1e2030" stroke-width="0.35"/>
<path d="M22,73 L52,71 L82,69 L112,67 L138,65" fill="none" stroke="#7EC8E3" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="73" r="2.5" fill="#7EC8E3"/><circle cx="52" cy="71" r="2.5" fill="#7EC8E3"/><circle cx="82" cy="69" r="2.5" fill="#7EC8E3"/><circle cx="112" cy="67" r="2.5" fill="#7EC8E3"/><circle cx="138" cy="65" r="2.5" fill="#7EC8E3"/>
<path d="M22,71 L52,59 L82,47 L112,36 L138,26" fill="none" stroke="#F0B27A" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="71" r="2.5" fill="#F0B27A"/><circle cx="52" cy="59" r="2.5" fill="#F0B27A"/><circle cx="82" cy="47" r="2.5" fill="#F0B27A"/><circle cx="112" cy="36" r="2.5" fill="#F0B27A"/><circle cx="138" cy="26" r="2.5" fill="#F0B27A"/>
<path d="M22,69 L52,48 L82,29 L112,15 L138,11" fill="none" stroke="#95D5B2" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="69" r="2.5" fill="#95D5B2"/><circle cx="52" cy="48" r="2.5" fill="#95D5B2"/><circle cx="82" cy="29" r="2.5" fill="#95D5B2"/><circle cx="112" cy="15" r="2.5" fill="#95D5B2"/><circle cx="138" cy="11" r="2.5" fill="#95D5B2"/>
</svg>`,boxplot:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="38" y1="74" x2="38" y2="65" stroke="#7EC8E3" stroke-width="1.2"/><line x1="32" y1="74" x2="44" y2="74" stroke="#7EC8E3" stroke-width="1.2"/>
<rect x="27" y="58" width="22" height="18" fill="rgba(126,200,227,0.15)" stroke="#7EC8E3" stroke-width="1.5" rx="1"/>
<line x1="27" y1="64" x2="49" y2="64" stroke="#7EC8E3" stroke-width="2.5"/>
<line x1="38" y1="40" x2="38" y2="58" stroke="#7EC8E3" stroke-width="1.2"/><line x1="32" y1="40" x2="44" y2="40" stroke="#7EC8E3" stroke-width="1.2"/>
<circle cx="38" cy="34" r="2" fill="none" stroke="#7EC8E3" stroke-width="1.2"/>
<line x1="80" y1="68" x2="80" y2="58" stroke="#F0B27A" stroke-width="1.2"/><line x1="74" y1="68" x2="86" y2="68" stroke="#F0B27A" stroke-width="1.2"/>
<rect x="69" y="38" width="22" height="30" fill="rgba(240,178,122,0.15)" stroke="#F0B27A" stroke-width="1.5" rx="1"/>
<line x1="69" y1="48" x2="91" y2="48" stroke="#F0B27A" stroke-width="2.5"/>
<line x1="80" y1="20" x2="80" y2="38" stroke="#F0B27A" stroke-width="1.2"/><line x1="74" y1="20" x2="86" y2="20" stroke="#F0B27A" stroke-width="1.2"/>
<circle cx="80" cy="14" r="2" fill="none" stroke="#F0B27A" stroke-width="1.2"/>
<line x1="122" y1="58" x2="122" y2="46" stroke="#95D5B2" stroke-width="1.2"/><line x1="116" y1="58" x2="128" y2="58" stroke="#95D5B2" stroke-width="1.2"/>
<rect x="111" y="22" width="22" height="34" fill="rgba(149,213,178,0.15)" stroke="#95D5B2" stroke-width="1.5" rx="1"/>
<line x1="111" y1="36" x2="133" y2="36" stroke="#95D5B2" stroke-width="2.5"/>
<line x1="122" y1="11" x2="122" y2="22" stroke="#95D5B2" stroke-width="1.2"/><line x1="116" y1="11" x2="128" y2="11" stroke="#95D5B2" stroke-width="1.2"/>
</svg>`,violin:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M38,79 C35,73 32,63 35,55 C38,47 41,44 38,38 C35,32 33,27 38,22 C43,27 41,32 38,38 C35,44 38,47 41,55 C44,63 41,73 38,79 Z" fill="#7EC8E3" opacity="0.35"/>
<path d="M38,79 C35,73 32,63 35,55 C38,47 41,44 38,38 C35,32 33,27 38,22 C43,27 41,32 38,38 C35,44 38,47 41,55 C44,63 41,73 38,79 Z" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
<line x1="33" y1="54" x2="43" y2="54" stroke="#7EC8E3" stroke-width="2"/>
<path d="M80,78 C74,71 69,58 72,46 C75,34 82,30 80,21 C78,30 85,34 88,46 C91,58 86,71 80,78 Z" fill="#F0B27A" opacity="0.35"/>
<path d="M80,78 C74,71 69,58 72,46 C75,34 82,30 80,21 C78,30 85,34 88,46 C91,58 86,71 80,78 Z" fill="none" stroke="#F0B27A" stroke-width="1.5"/>
<line x1="73" y1="43" x2="87" y2="43" stroke="#F0B27A" stroke-width="2"/>
<path d="M122,76 C114,67 108,50 112,34 C116,18 124,12 122,9 C120,12 128,18 132,34 C136,50 130,67 122,76 Z" fill="#95D5B2" opacity="0.35"/>
<path d="M122,76 C114,67 108,50 112,34 C116,18 124,12 122,9 C120,12 128,18 132,34 C136,50 130,67 122,76 Z" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
<line x1="113" y1="30" x2="131" y2="30" stroke="#95D5B2" stroke-width="2"/>
</svg>`,histogram:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<rect x="20" y="76" width="11" height="5" fill="#7EC8E3" rx="1" opacity="0.8"/>
<rect x="31" y="68" width="11" height="13" fill="#7EC8E3" rx="1" opacity="0.85"/>
<rect x="42" y="55" width="11" height="26" fill="#7EC8E3" rx="1" opacity="0.9"/>
<rect x="53" y="38" width="11" height="43" fill="#7EC8E3" rx="1" opacity="0.95"/>
<rect x="64" y="22" width="11" height="59" fill="#7EC8E3" rx="1" opacity="1"/>
<rect x="75" y="19" width="11" height="62" fill="#7EC8E3" rx="1" opacity="1"/>
<rect x="86" y="32" width="11" height="49" fill="#7EC8E3" rx="1" opacity="0.95"/>
<rect x="97" y="48" width="11" height="33" fill="#7EC8E3" rx="1" opacity="0.9"/>
<rect x="108" y="64" width="11" height="17" fill="#7EC8E3" rx="1" opacity="0.85"/>
<rect x="119" y="75" width="11" height="6" fill="#7EC8E3" rx="1" opacity="0.8"/>
<path d="M20,77 C30,77 40,60 54,38 C62,24 68,18 80,18 C92,18 98,24 106,38 C120,60 130,77 140,77" fill="none" stroke="#F0B27A" stroke-width="1.5" opacity="0.75"/>
</svg>`,density:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,81 C24,81 32,80 42,64 C48,50 50,40 54,37 C58,40 60,50 66,64 C76,80 84,81 92,81 Z" fill="#7EC8E3" opacity="0.2"/>
<path d="M18,81 C24,81 32,80 42,64 C48,50 50,40 54,37 C58,40 60,50 66,64 C76,80 84,81 92,81" fill="none" stroke="#7EC8E3" stroke-width="2" opacity="0.9"/>
<path d="M32,81 C42,81 52,80 64,58 C70,46 74,34 80,30 C86,34 90,46 96,58 C108,80 118,81 128,81 Z" fill="#F0B27A" opacity="0.18"/>
<path d="M32,81 C42,81 52,80 64,58 C70,46 74,34 80,30 C86,34 90,46 96,58 C108,80 118,81 128,81" fill="none" stroke="#F0B27A" stroke-width="2" opacity="0.9"/>
<path d="M62,81 C72,81 84,80 96,62 C104,48 108,36 114,32 C120,36 124,48 132,62 C144,80 150,81 150,81 Z" fill="#95D5B2" opacity="0.18"/>
<path d="M62,81 C72,81 84,80 96,62 C104,48 108,36 114,32 C120,36 124,48 132,62 C144,80 148,81" fill="none" stroke="#95D5B2" stroke-width="2" opacity="0.9"/>
</svg>`,heatmap:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<rect x="22" y="10" width="22" height="16" fill="#2c5f8a" rx="1.5"/><rect x="45" y="10" width="22" height="16" fill="#3a7dbf" rx="1.5"/><rect x="68" y="10" width="22" height="16" fill="#7EC8E3" rx="1.5"/><rect x="91" y="10" width="22" height="16" fill="#a8dce8" rx="1.5"/><rect x="114" y="10" width="22" height="16" fill="#d4eef7" rx="1.5"/>
<rect x="22" y="28" width="22" height="16" fill="#6b3520" rx="1.5"/><rect x="45" y="28" width="22" height="16" fill="#8b4d2a" rx="1.5"/><rect x="68" y="28" width="22" height="16" fill="#c06b38" rx="1.5"/><rect x="91" y="28" width="22" height="16" fill="#dea06e" rx="1.5"/><rect x="114" y="28" width="22" height="16" fill="#F0B27A" rx="1.5"/>
<rect x="22" y="46" width="22" height="16" fill="#1c5c35" rx="1.5"/><rect x="45" y="46" width="22" height="16" fill="#2e7a4a" rx="1.5"/><rect x="68" y="46" width="22" height="16" fill="#4aab6e" rx="1.5"/><rect x="91" y="46" width="22" height="16" fill="#7dc59a" rx="1.5"/><rect x="114" y="46" width="22" height="16" fill="#95D5B2" rx="1.5"/>
<rect x="22" y="64" width="22" height="16" fill="#4a1a5c" rx="1.5"/><rect x="45" y="64" width="22" height="16" fill="#6b2f80" rx="1.5"/><rect x="68" y="64" width="22" height="16" fill="#9b5ab0" rx="1.5"/><rect x="91" y="64" width="22" height="16" fill="#c291cf" rx="1.5"/><rect x="114" y="64" width="22" height="16" fill="#d9b8e0" rx="1.5"/>
</svg>`,area:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,81 L22,79 L52,71 L82,63 L112,55 L138,48 L138,81 Z" fill="#95D5B2" opacity="0.65"/>
<path d="M18,81 L22,70 L52,55 L82,42 L112,30 L138,22 L138,48 L112,55 L82,63 L52,71 L22,79 Z" fill="#F0B27A" opacity="0.65"/>
<path d="M18,81 L22,60 L52,40 L82,23 L112,12 L138,9 L138,22 L112,30 L82,42 L52,55 L22,70 Z" fill="#7EC8E3" opacity="0.65"/>
<path d="M22,60 L52,40 L82,23 L112,12 L138,9" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
<path d="M22,70 L52,55 L82,42 L112,30 L138,22" fill="none" stroke="#F0B27A" stroke-width="1.5"/>
<path d="M22,79 L52,71 L82,63 L112,55 L138,48" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
</svg>`,errorbar:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="33" y1="72" x2="33" y2="50" stroke="#7EC8E3" stroke-width="1.5"/><line x1="27" y1="72" x2="39" y2="72" stroke="#7EC8E3" stroke-width="1.5"/><line x1="27" y1="50" x2="39" y2="50" stroke="#7EC8E3" stroke-width="1.5"/>
<circle cx="33" cy="61" r="4.5" fill="#7EC8E3"/>
<line x1="62" y1="64" x2="62" y2="38" stroke="#F0B27A" stroke-width="1.5"/><line x1="56" y1="64" x2="68" y2="64" stroke="#F0B27A" stroke-width="1.5"/><line x1="56" y1="38" x2="68" y2="38" stroke="#F0B27A" stroke-width="1.5"/>
<circle cx="62" cy="51" r="4.5" fill="#F0B27A"/>
<line x1="91" y1="55" x2="91" y2="24" stroke="#95D5B2" stroke-width="1.5"/><line x1="85" y1="55" x2="97" y2="55" stroke="#95D5B2" stroke-width="1.5"/><line x1="85" y1="24" x2="97" y2="24" stroke="#95D5B2" stroke-width="1.5"/>
<circle cx="91" cy="40" r="4.5" fill="#95D5B2"/>
<line x1="120" y1="46" x2="120" y2="17" stroke="#7EC8E3" stroke-width="1.5"/><line x1="114" y1="46" x2="126" y2="46" stroke="#7EC8E3" stroke-width="1.5"/><line x1="114" y1="17" x2="126" y2="17" stroke="#7EC8E3" stroke-width="1.5"/>
<circle cx="120" cy="32" r="4.5" fill="#7EC8E3"/>
<path d="M33,61 L62,51 L91,40 L120,32" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
</svg>`,lollipop:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="28" y1="8" x2="28" y2="86" stroke="#1e2030" stroke-width="0.8"/>
<line x1="28" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="28" y1="19" x2="128" y2="19" stroke="#7EC8E3" stroke-width="1.5" opacity="0.8"/><circle cx="128" cy="19" r="5.5" fill="#7EC8E3"/>
<line x1="28" y1="34" x2="110" y2="34" stroke="#F0B27A" stroke-width="1.5" opacity="0.8"/><circle cx="110" cy="34" r="5.5" fill="#F0B27A"/>
<line x1="28" y1="49" x2="138" y2="49" stroke="#95D5B2" stroke-width="1.5" opacity="0.8"/><circle cx="138" cy="49" r="5.5" fill="#95D5B2"/>
<line x1="28" y1="64" x2="88" y2="64" stroke="#7EC8E3" stroke-width="1.5" opacity="0.8"/><circle cx="88" cy="64" r="5.5" fill="#7EC8E3"/>
<line x1="28" y1="79" x2="118" y2="79" stroke="#F0B27A" stroke-width="1.5" opacity="0.8"/><circle cx="118" cy="79" r="5.5" fill="#F0B27A"/>
</svg>`,ridgeline:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,85 C25,85 32,84 42,76 C48,68 52,62 58,60 C64,62 68,68 74,76 C84,84 92,85 140,85 Z" fill="#1a3550" opacity="0.95"/>
<path d="M18,85 C25,85 32,84 42,76 C48,68 52,62 58,60 C64,62 68,68 74,76 C84,84 92,85 140,85" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.6"/>
<path d="M18,72 C28,72 38,71 50,61 C58,51 62,43 70,40 C78,43 82,51 90,61 C102,71 112,72 140,72 Z" fill="#162a42" opacity="0.95"/>
<path d="M18,72 C28,72 38,71 50,61 C58,51 62,43 70,40 C78,43 82,51 90,61 C102,71 112,72 140,72" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.75"/>
<path d="M18,56 C30,56 44,55 58,43 C66,31 72,21 80,18 C88,21 94,31 102,43 C116,55 130,56 140,56 Z" fill="#122038" opacity="0.95"/>
<path d="M18,56 C30,56 44,55 58,43 C66,31 72,21 80,18 C88,21 94,31 102,43 C116,55 130,56 140,56" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.88"/>
<path d="M18,40 C32,40 48,39 64,25 C72,13 78,8 86,6 C94,8 100,13 108,25 C124,39 138,40 140,40 Z" fill="#0f1825" opacity="0.95"/>
<path d="M18,40 C32,40 48,39 64,25 C72,13 78,8 86,6 C94,8 100,13 108,25 C124,39 138,40 140,40" fill="none" stroke="#95D5B2" stroke-width="1.8" opacity="1"/>
</svg>`},ut={scatter:{size:3,alpha:.7,jitter:"none",regression:!1,shape:"circle"},bar:{arrangement:"grouped",barWidth:.7,errorBars:!1},line:{lineType:"solid",lineWidth:1.5,showPoints:!0,smooth:!1,fillArea:!1},boxplot:{boxWidth:.6,showOutliers:!0,fillAlpha:.7,notch:!1,showMean:!0,whisker:"iqr"},violin:{bw:.5,fillAlpha:.7,showBoxplot:!0,halfViolin:"full"},histogram:{bins:20,fillAlpha:.8,densityOverlay:!1},density:{bw:1,fillAlpha:.25,showRug:!1},heatmap:{colorScheme:"rdbu",showValues:!0},area:{arrangement:"stacked",fillAlpha:.65,showLines:!0},errorbar:{errorType:"se",capWidth:.2,lineWidth:1.5,dotSize:5},lollipop:{dotSize:8,lineWidth:1.2,sortBy:"none",horizontal:!1},ridgeline:{overlap:.7,fillAlpha:.7,bw:1}};let k={currentChart:"scatter",params:JSON.parse(JSON.stringify(ut)),editor:null,copyBtn:null,cleanups:[]};function $(t){t.select(".domain").attr("stroke","#424245"),t.selectAll(".tick line").attr("stroke","#424245"),t.selectAll("text").attr("fill","#a1a1a6").style("font-size","11px")}function M(t){t.select(".domain").remove(),t.selectAll(".tick line").attr("stroke","rgba(255,255,255,0.05)"),t.selectAll("text").remove()}function A(t,e,n,d,v){n?t.append("text").attr("transform","rotate(-90)").attr("x",-v/2).attr("y",-48).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e):t.append("text").attr("x",d/2).attr("y",v+46).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e)}function pt(t){return e=>Math.exp(-.5*(e/t)**2)/(t*Math.sqrt(2*Math.PI))}function dt(t,e,n){return n.map(d=>({x:d,y:nt(t,v=>e(d-v))}))}function z(t,e,n,d){kt(t).selectAll("*").remove();const v=kt(t).append("svg").attr("viewBox",`0 0 ${e} ${n}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("display","block");v.append("rect").attr("width",e).attr("height",n).attr("fill",xt).attr("rx",12);const a=v.append("g").attr("transform",`translate(${d.left},${d.top})`),c=e-d.left-d.right,f=n-d.top-d.bottom;return{svg:v,g:a,iW:c,iH:f}}function ee(t,e){const v={top:25,right:115,bottom:55,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=L().domain([3.8,8.2]).range([0,c]),b=L().domain([.5,8]).range([f,0]);a.append("g").call(E(b).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(x).ticks(6)).call($),a.append("g").call(E(b).ticks(5)).call($),A(a,"Sepal.Length (cm)",!1,c,f),A(a,"Petal.Length (cm)",!0,c,f),e.regression&&Object.entries(mt).forEach(([y,g])=>{const o=Bt.filter(C=>C.sp===y),l=nt(o,C=>C.x),u=nt(o,C=>C.y),w=ft(o,C=>(C.x-l)*(C.y-u))/ft(o,C=>(C.x-l)**2),P=u-w*l,j=F(o,C=>C.x)-.1,q=B(o,C=>C.x)+.1;a.append("line").attr("x1",x(j)).attr("y1",b(w*j+P)).attr("x2",x(q)).attr("y2",b(w*q+P)).attr("stroke",g).attr("stroke-width",1.5).attr("stroke-dasharray","6,4").attr("opacity",.7)});const s=D(999),p=e.jitter==="light"?.12:e.jitter==="heavy"?.28:0,m={circle:Ct,triangle:Gt,square:Ot,cross:jt}[e.shape]||Ct,r=(e.size+2)**2*6;Bt.forEach(y=>{const g=p>0?(s()-.5)*p:0,o=p>0?(s()-.5)*p:0;a.append("path").attr("d",Et().type(m).size(r)()).attr("transform",`translate(${x(y.x+g)},${b(y.y+o)})`).attr("fill",mt[y.sp]).attr("opacity",e.alpha).attr("stroke","none")});const h=a.append("g").attr("transform",`translate(${c+12},0)`);Object.entries(mt).forEach(([y,g],o)=>{const l=h.append("g").attr("transform",`translate(0,${o*22})`);l.append("path").attr("d",Et().type(m).size(64)()).attr("transform","translate(7,7)").attr("fill",g).attr("opacity",e.alpha),l.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(y)})}function ae(t,e){const v={top:25,right:115,bottom:60,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=Xt,b=x.map(m=>m.cat),s=["Week 1","Week 8"],p=R().domain(b).range([0,c]).paddingInner(1-e.barWidth);if(e.arrangement==="grouped"){const m=R().domain(s).range([0,p.bandwidth()]).padding(.08),r=B(x,y=>B(y.values,g=>g.mean+(e.errorBars?g.se:0))),h=L().domain([0,r*1.12]).range([f,0]);a.append("g").call(E(h).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(p)).call($),a.append("g").call(E(h).ticks(5)).call($),A(a,"Mean Value",!0,c,f),x.forEach(y=>{const g=a.append("g").attr("transform",`translate(${p(y.cat)},0)`);y.values.forEach((o,l)=>{if(g.append("rect").attr("x",m(o.grp)).attr("y",h(o.mean)).attr("width",m.bandwidth()).attr("height",f-h(o.mean)).attr("fill",it[l]).attr("rx",3),e.errorBars){const u=m(o.grp)+m.bandwidth()/2;g.append("line").attr("x1",u).attr("x2",u).attr("y1",h(o.mean+o.se)).attr("y2",h(o.mean-o.se)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7),[-o.se,o.se].forEach(w=>{g.append("line").attr("x1",u-4).attr("x2",u+4).attr("y1",h(o.mean+w)).attr("y2",h(o.mean+w)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7)})}})})}else if(e.arrangement==="stacked"){const m=x.map(g=>{const o={cat:g.cat};return g.values.forEach(l=>{o[l.grp]=l.mean}),o}),r=st().keys(s)(m),h=B(r[r.length-1],g=>g[1]),y=L().domain([0,h*1.1]).range([f,0]);a.append("g").call(E(y).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(p)).call($),a.append("g").call(E(y).ticks(5)).call($),A(a,"Total Value",!0,c,f),r.forEach((g,o)=>{a.selectAll(null).data(g).enter().append("rect").attr("x",l=>p(l.data.cat)).attr("y",l=>y(l[1])).attr("width",p.bandwidth()).attr("height",l=>y(l[0])-y(l[1])).attr("fill",it[o]).attr("rx",o===0?3:0)})}else{const m=x.map(y=>{const g=ft(y.values,l=>l.mean),o={cat:y.cat};return y.values.forEach(l=>{o[l.grp]=l.mean/g*100}),o}),r=st().keys(s)(m),h=L().domain([0,100]).range([f,0]);a.append("g").call(E(h).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").call(E(h).ticks(5).tickFormat(y=>y+"%")).call($),a.append("g").attr("transform",`translate(0,${f})`).call(W(p)).call($),A(a,"Proportion (%)",!0,c,f),r.forEach((y,g)=>{a.selectAll(null).data(y).enter().append("rect").attr("x",o=>p(o.data.cat)).attr("y",o=>h(o[1])).attr("width",p.bandwidth()).attr("height",o=>h(o[0])-h(o[1])).attr("fill",it[g]).attr("rx",g===0?3:0)})}const i=a.append("g").attr("transform",`translate(${c+12},0)`);s.forEach((m,r)=>{const h=i.append("g").attr("transform",`translate(0,${r*22})`);h.append("rect").attr("width",12).attr("height",12).attr("fill",it[r]).attr("rx",2),h.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(m)})}function re(t,e){const v={top:25,right:110,bottom:55,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=["W0","W1","W2","W3","W4"],b=_t().domain(x).range([0,c]).padding(.2),s=V.flatMap(h=>h.pts.map(y=>y.val)),p=L().domain([F(s)-8,B(s)+8]).range([f,0]);a.append("g").call(E(p).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(b)).call($),a.append("g").call(E(p).ticks(5)).call($),A(a,"Week",!1,c,f),A(a,"Response",!0,c,f);const i={solid:null,dashed:"8,4",dotted:"3,4"},m=e.smooth?Wt:Ut;V.forEach(h=>{e.fillArea&&a.append("path").datum(h.pts).attr("d",U().x((g,o)=>b(x[o])).y0(f).y1(g=>p(g.val)).curve(m)).attr("fill",h.color).attr("opacity",.12);const y=a.append("path").datum(h.pts).attr("d",K().x((g,o)=>b(x[o])).y(g=>p(g.val)).curve(m)).attr("fill","none").attr("stroke",h.color).attr("stroke-width",e.lineWidth);i[e.lineType]&&y.attr("stroke-dasharray",i[e.lineType]),e.showPoints&&h.pts.forEach((g,o)=>{a.append("circle").attr("cx",b(x[o])).attr("cy",p(g.val)).attr("r",e.lineWidth+2).attr("fill",h.color).attr("stroke",xt).attr("stroke-width",1.5)})});const r=a.append("g").attr("transform",`translate(${c+12},0)`);V.forEach((h,y)=>{const g=r.append("g").attr("transform",`translate(0,${y*22})`);g.append("line").attr("x1",0).attr("x2",14).attr("y1",7).attr("y2",7).attr("stroke",h.color).attr("stroke-width",e.lineWidth),e.showPoints&&g.append("circle").attr("cx",7).attr("cy",7).attr("r",3).attr("fill",h.color),g.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(h.grp)})}function oe(t,e){const v={top:25,right:30,bottom:50,left:60},{g:a,iW:c,iH:f}=z(t,540,380,v),x=At.map(i=>{const m=[...i.pts].sort((u,w)=>u-w),r=O(m,.25),h=O(m,.5),y=O(m,.75),g=y-r,o=e.whisker==="iqr"?Math.max(F(m),r-1.5*g):F(m),l=e.whisker==="iqr"?Math.min(B(m),y+1.5*g):B(m);return{name:i.name,q1:r,med:h,q3:y,iqr:g,wMin:o,wMax:l,outliers:m.filter(u=>u<o||u>l),mean:nt(m),notchLo:h-1.58*g/Math.sqrt(m.length),notchHi:h+1.58*g/Math.sqrt(m.length)}}),b=x.flatMap(i=>[i.wMin,i.wMax,...e.showOutliers?i.outliers:[]]),s=L().domain([F(b)-5,B(b)+5]).range([f,0]),p=R().domain(At.map(i=>i.name)).range([0,c]).padding(1-e.boxWidth);a.append("g").call(E(s).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(p)).call($),a.append("g").call(E(s).ticks(5)).call($),A(a,"Response Value",!0,c,f),x.forEach((i,m)=>{const r=p(i.name),h=p.bandwidth(),y=r+h/2,g=Mt[m];if(a.append("line").attr("x1",y).attr("x2",y).attr("y1",s(i.wMax)).attr("y2",s(i.wMin)).attr("stroke",g).attr("stroke-width",1.5).attr("opacity",.7),[i.wMin,i.wMax].forEach(o=>{a.append("line").attr("x1",y-h*.2).attr("x2",y+h*.2).attr("y1",s(o)).attr("y2",s(o)).attr("stroke",g).attr("stroke-width",1.5)}),e.notch){const o=Math.max(i.q1,i.notchLo),l=Math.min(i.q3,i.notchHi),u=h*.2;a.append("path").attr("d",[`M ${r} ${s(i.q1)}`,`L ${r+h} ${s(i.q1)}`,`L ${r+h} ${s(o)}`,`L ${r+h-u} ${s(i.med)}`,`L ${r+h} ${s(l)}`,`L ${r+h} ${s(i.q3)}`,`L ${r} ${s(i.q3)}`,`L ${r} ${s(l)}`,`L ${r+u} ${s(i.med)}`,`L ${r} ${s(o)}`,"Z"].join(" ")).attr("fill",g).attr("opacity",e.fillAlpha).attr("stroke",g).attr("stroke-width",1.5)}else a.append("rect").attr("x",r).attr("y",s(i.q3)).attr("width",h).attr("height",s(i.q1)-s(i.q3)).attr("fill",g).attr("opacity",e.fillAlpha).attr("stroke",g).attr("stroke-width",1.5).attr("rx",3);if(a.append("line").attr("x1",r).attr("x2",r+h).attr("y1",s(i.med)).attr("y2",s(i.med)).attr("stroke","#fff").attr("stroke-width",2),e.showMean){const l=s(i.mean);a.append("path").attr("d",`M ${y} ${l-5} L ${y+5} ${l} L ${y} ${l+5} L ${y-5} ${l} Z`).attr("fill","#fff").attr("opacity",.9)}e.showOutliers&&i.outliers.forEach(o=>{a.append("circle").attr("cx",y).attr("cy",s(o)).attr("r",3).attr("fill","none").attr("stroke",g).attr("stroke-width",1.5).attr("opacity",.7)})})}function ie(t,e){const v={top:25,right:20,bottom:50,left:60},{g:a,iW:c,iH:f}=z(t,540,380,v),x=tt.flatMap(l=>l.pts),b=F(x)-5,s=B(x)+5,p=ct(b,s,(s-b)/80),i=pt(e.bw*10),m=R().domain(tt.map(l=>l.name)).range([0,c]).padding(.3),r=L().domain([b,s]).range([f,0]),h=m.bandwidth()/2,y=tt.map(l=>dt(l.pts,i,p)),g=B(y,l=>B(l,u=>u.y)),o=L().domain([0,g]).range([0,h*.92]);a.append("g").call(E(r).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(m)).call($),a.append("g").call(E(r).ticks(5)).call($),A(a,"Response Value",!0,c,f),tt.forEach((l,u)=>{const w=m(l.name)+h,P=Mt[u],j=y[u],q=U().x0(C=>w-(e.halfViolin!=="right"?o(C.y):0)).x1(C=>w+(e.halfViolin!=="left"?o(C.y):0)).y(C=>r(C.x)).curve(Wt);if(a.append("path").datum(j).attr("d",q).attr("fill",P).attr("opacity",e.fillAlpha).attr("stroke",P).attr("stroke-width",1.5),e.showBoxplot){const C=[...l.pts].sort((Tt,Rt)=>Tt-Rt),I=O(C,.25),T=O(C,.5),J=O(C,.75),bt=J-I,zt=Math.max(F(C),I-1.5*bt),Ft=Math.min(B(C),J+1.5*bt),X=h*.22;a.append("line").attr("x1",w).attr("x2",w).attr("y1",r(zt)).attr("y2",r(Ft)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.8),a.append("rect").attr("x",w-X).attr("y",r(J)).attr("width",X*2).attr("height",r(I)-r(J)).attr("fill","#111318").attr("stroke","#fff").attr("stroke-width",1.5).attr("rx",2),a.append("line").attr("x1",w-X).attr("x2",w+X).attr("y1",r(T)).attr("y2",r(T)).attr("stroke","#fff").attr("stroke-width",2.5)}})}function le(t,e){const v={top:25,right:30,bottom:55,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=F(et)-2,b=B(et)+2,s=L().domain([x,b]).range([0,c]),p=Nt().domain([x,b]).thresholds(e.bins)(et),i=B(p,r=>r.length),m=L().domain([0,i*1.12]).range([f,0]);if(a.append("g").call(E(m).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(s).ticks(8)).call($),a.append("g").call(E(m).ticks(5)).call($),A(a,"Value",!1,c,f),A(a,"Count",!0,c,f),a.selectAll(".p7-hbar").data(p).enter().append("rect").attr("class","p7-hbar").attr("x",r=>s(r.x0)+1).attr("y",r=>m(r.length)).attr("width",r=>Math.max(0,s(r.x1)-s(r.x0)-1)).attr("height",r=>f-m(r.length)).attr("fill","#7EC8E3").attr("opacity",e.fillAlpha).attr("rx",2),e.densityOverlay){const r=pt(3.2),h=ct(x,b,(b-x)/100),y=dt(et,r,h),g=B(y,l=>l.y),o=i/g;a.append("path").datum(y).attr("d",K().x(l=>s(l.x)).y(l=>m(l.y*o)).curve(N)).attr("fill","none").attr("stroke","#F0B27A").attr("stroke-width",2.5).attr("opacity",.9),a.append("text").attr("x",c-4).attr("y",14).attr("fill","#F0B27A").style("font-size","10px").attr("text-anchor","end").text("密度曲线")}}function ne(t,e){const v={top:25,right:105,bottom:55,left:60},{g:a,iW:c,iH:f}=z(t,540,380,v),x=gt.flatMap(o=>o.pts),b=F(x)-5,s=B(x)+5,p=L().domain([b,s]).range([0,c]),i=pt(e.bw*5),m=ct(b,s,(s-b)/100),r=gt.map(o=>({...o,kde:dt(o.pts,i,m)})),h=B(r,o=>B(o.kde,l=>l.y)),y=L().domain([0,h*1.12]).range([f,0]);a.append("g").call(E(y).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(p).ticks(6)).call($),a.append("g").call(E(y).ticks(4).tickFormat(yt(".3f"))).call($),A(a,"Value",!1,c,f),A(a,"Density",!0,c,f),r.forEach(o=>{a.append("path").datum(o.kde).attr("d",U().x(l=>p(l.x)).y0(f).y1(l=>y(l.y)).curve(N)).attr("fill",o.color).attr("opacity",e.fillAlpha),a.append("path").datum(o.kde).attr("d",K().x(l=>p(l.x)).y(l=>y(l.y)).curve(N)).attr("fill","none").attr("stroke",o.color).attr("stroke-width",2),e.showRug&&o.pts.forEach(l=>{a.append("line").attr("x1",p(l)).attr("x2",p(l)).attr("y1",f).attr("y2",f-6).attr("stroke",o.color).attr("opacity",.4)})});const g=a.append("g").attr("transform",`translate(${c+12},0)`);gt.forEach((o,l)=>{const u=g.append("g").attr("transform",`translate(0,${l*22})`);u.append("rect").attr("width",12).attr("height",3).attr("y",5).attr("fill",o.color).attr("rx",1),u.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(o.grp)})}function se(t,e){const v={top:20,right:80,bottom:60,left:70},{g:a,iW:c,iH:f}=z(t,540,380,v),x=at.map(u=>u.gene),b=at[0].values.map(u=>u.cond),s=R().domain(b).range([0,c]).padding(.04),p=R().domain(x).range([0,f]).padding(.04),i=at.flatMap(u=>u.values.map(w=>w.val)),m=B(i.map(Math.abs)),r={rdbu:Vt(Zt).domain([m,0,-m]),viridis:wt(Jt).domain([-m,m]),plasma:wt(Kt).domain([-m,m])},h=r[e.colorScheme]||r.rdbu;a.append("g").attr("transform",`translate(0,${f})`).call(W(s)).call(u=>{u.select(".domain").attr("stroke","#424245"),u.selectAll(".tick line").remove(),u.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px")}),a.append("g").call(E(p)).call(u=>{u.select(".domain").attr("stroke","#424245"),u.selectAll(".tick line").remove(),u.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),at.forEach(u=>{u.values.forEach(w=>{a.append("rect").attr("x",s(w.cond)).attr("y",p(u.gene)).attr("width",s.bandwidth()).attr("height",p.bandwidth()).attr("fill",h(w.val)).attr("rx",3),e.showValues&&a.append("text").attr("x",s(w.cond)+s.bandwidth()/2).attr("y",p(u.gene)+p.bandwidth()/2+4).attr("text-anchor","middle").attr("fill",Math.abs(w.val)>m*.5?"#fff":"#444").style("font-size","9px").style("font-family","monospace").text(w.val.toFixed(1))})});const y=f,g=14,o=a.append("defs").append("linearGradient").attr("id","p7-hm-grad").attr("x1",0).attr("y1",1).attr("x2",0).attr("y2",0);[0,.25,.5,.75,1].forEach(u=>{o.append("stop").attr("offset",`${u*100}%`).attr("stop-color",h(-m+u*2*m))}),a.append("rect").attr("x",c+20).attr("y",0).attr("width",g).attr("height",y).attr("fill","url(#p7-hm-grad)").attr("rx",3);const l=L().domain([-m,m]).range([y,0]);a.append("g").attr("transform",`translate(${c+20+g},0)`).call(Yt(l).ticks(4).tickFormat(yt(".1f"))).call(u=>{u.select(".domain").remove(),u.selectAll(".tick line").attr("stroke","#424245"),u.selectAll("text").attr("fill","#a1a1a6").style("font-size","9px")})}function ce(t,e){const v={top:25,right:110,bottom:55,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=["W0","W1","W2","W3","W4"],b=_t().domain(x).range([0,c]).padding(.2),s=x.map((g,o)=>{const l={w:g};return V.forEach(u=>{l[u.grp]=u.pts[o].val}),l}),p=V.map(g=>g.grp),i=V.map(g=>g.color),m=(g,o)=>U().x((l,u)=>b(x[u])).y0(l=>o(l[0])).y1(l=>o(l[1])).curve($t),r=(g,o)=>K().x((l,u)=>b(x[u])).y(l=>o(l[1])).curve($t);let h;if(e.arrangement==="proportional"){const g=st().keys(p).offset(qt)(s);h=L().domain([0,1]).range([f,0]),a.append("g").call(E(h).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(b)).call($),a.append("g").call(E(h).ticks(5).tickFormat(yt(".0%"))).call($),A(a,"Week",!1,c,f),A(a,"Proportion",!0,c,f),g.forEach((o,l)=>{a.append("path").datum(o).attr("d",m(o,h)).attr("fill",i[l]).attr("opacity",e.fillAlpha),e.showLines&&a.append("path").datum(o).attr("d",r(o,h)).attr("fill","none").attr("stroke",i[l]).attr("stroke-width",1.5).attr("opacity",.8)})}else{const g=st().keys(p)(s),o=B(g[g.length-1],l=>l[1]);h=L().domain([0,o*1.05]).range([f,0]),a.append("g").call(E(h).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(b)).call($),a.append("g").call(E(h).ticks(5)).call($),A(a,"Week",!1,c,f),A(a,"Response",!0,c,f),g.forEach((l,u)=>{a.append("path").datum(l).attr("d",m(l,h)).attr("fill",i[u]).attr("opacity",e.fillAlpha),e.showLines&&a.append("path").datum(l).attr("d",r(l,h)).attr("fill","none").attr("stroke",i[u]).attr("stroke-width",1.5).attr("opacity",.8)})}const y=a.append("g").attr("transform",`translate(${c+12},0)`);V.forEach((g,o)=>{const l=y.append("g").attr("transform",`translate(0,${o*22})`);l.append("rect").attr("width",12).attr("height",12).attr("fill",g.color).attr("opacity",e.fillAlpha).attr("rx",2),l.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(g.grp)})}function pe(t,e){const v={top:25,right:30,bottom:65,left:55},{g:a,iW:c,iH:f}=z(t,540,380,v),x=e.errorType==="se"?"se":e.errorType==="sd"?"sd":"ci95",b=B(rt,r=>r.mean+r[x]),s=Math.max(0,F(rt,r=>r.mean-r[x])),p=R().domain(rt.map(r=>r.grp)).range([0,c]).padding(.5),i=L().domain([s*.85,b*1.15]).range([f,0]);a.append("g").call(E(i).ticks(5).tickSize(-c).tickFormat("")).call(M),a.append("g").attr("transform",`translate(0,${f})`).call(W(p)).call($).selectAll("text").attr("transform","rotate(-30)").attr("text-anchor","end").attr("dy","0.4em"),a.append("g").call(E(i).ticks(5)).call($),A(a,"Mean Value",!0,c,f),rt.forEach((r,h)=>{const y=p(r.grp)+p.bandwidth()/2,g=r[x],o=h<3?"#7EC8E3":"#F0B27A",l=e.capWidth*p.bandwidth();a.append("line").attr("x1",y).attr("x2",y).attr("y1",i(r.mean+g)).attr("y2",i(r.mean-g)).attr("stroke",o).attr("stroke-width",e.lineWidth),[-g,g].forEach(u=>{a.append("line").attr("x1",y-l).attr("x2",y+l).attr("y1",i(r.mean+u)).attr("y2",i(r.mean+u)).attr("stroke",o).attr("stroke-width",e.lineWidth)}),a.append("circle").attr("cx",y).attr("cy",i(r.mean)).attr("r",e.dotSize/2).attr("fill",o).attr("stroke",xt).attr("stroke-width",1.5)});const m={se:"Error bars: ±SE",sd:"Error bars: ±SD",ci95:"Error bars: 95% CI"};a.append("text").attr("x",c).attr("y",14).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").text(m[e.errorType])}function de(t,e){const n=e.horizontal?55:100,d=540,v=380,a={top:25,right:30,bottom:n,left:e.horizontal?80:55},{g:c,iW:f,iH:x}=z(t,d,v,a);let b=[...Qt];e.sortBy==="asc"&&b.sort((p,i)=>p.val-i.val),e.sortBy==="desc"&&b.sort((p,i)=>i.val-p.val);const s=B(b,p=>Math.abs(p.val))*1.15;if(e.horizontal){const p=R().domain(b.map(r=>r.gene)).range([0,x]).padding(.4),i=L().domain([-s,s]).range([0,f]),m=i(0);c.append("g").call(E(p).ticks(0).tickSize(-f).tickFormat("")).call(M),c.append("g").call(W(i).ticks(5).tickSize(-x).tickFormat("")).call(M),c.append("g").call(E(p)).call(r=>{r.select(".domain").attr("stroke","#424245"),r.selectAll(".tick line").remove(),r.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),c.append("g").attr("transform",`translate(0,${x})`).call(W(i).ticks(5)).call($),c.append("line").attr("x1",m).attr("x2",m).attr("y1",0).attr("y2",x).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(c,"log2 Fold Change",!1,f,x),b.forEach(r=>{const h=p(r.gene)+p.bandwidth()/2,y=r.val>0?"#F0B27A":"#7EC8E3";c.append("line").attr("x1",m).attr("x2",i(r.val)).attr("y1",h).attr("y2",h).attr("stroke",y).attr("stroke-width",e.lineWidth).attr("opacity",.7),c.append("circle").attr("cx",i(r.val)).attr("cy",h).attr("r",e.dotSize/2).attr("fill",y)})}else{const p=R().domain(b.map(r=>r.gene)).range([0,f]).padding(.4),i=L().domain([-s,s]).range([x,0]),m=i(0);c.append("g").call(E(i).ticks(5).tickSize(-f).tickFormat("")).call(M),c.append("g").attr("transform",`translate(0,${x})`).call(W(p)).call($).selectAll("text").attr("transform","rotate(-35)").attr("text-anchor","end").attr("dy","0.4em").attr("font-style","italic"),c.append("g").call(E(i).ticks(5)).call($),c.append("line").attr("x1",0).attr("x2",f).attr("y1",m).attr("y2",m).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(c,"Gene",!1,f,x),A(c,"log2 FC",!0,f,x),b.forEach(r=>{const h=p(r.gene)+p.bandwidth()/2,y=r.val>0?"#F0B27A":"#7EC8E3";c.append("line").attr("x1",h).attr("x2",h).attr("y1",m).attr("y2",i(r.val)).attr("stroke",y).attr("stroke-width",e.lineWidth).attr("opacity",.7),c.append("circle").attr("cx",h).attr("cy",i(r.val)).attr("r",e.dotSize/2).attr("fill",y)})}}function he(t,e){const v={top:30,right:20,bottom:50,left:90},{g:a,iW:c,iH:f}=z(t,540,380,v),x=ot.flatMap(u=>u.pts),b=F(x)-5,s=B(x)+5,p=L().domain([b,s]).range([0,c]),i=pt(e.bw*5),m=ct(b,s,(s-b)/100),r=ot.length,h=f/(r+.5),y=ot.map(u=>dt(u.pts,i,m)),g=B(y,u=>B(u,w=>w.y)),o=h*(1+e.overlap),l=["#7EC8E3","#F0B27A","#95D5B2","#B8B8E8"];a.append("g").attr("transform",`translate(0,${f})`).call(W(p).ticks(6)).call($),A(a,"Value",!1,c,f),ot.forEach((u,w)=>{const P=y[w],j=f-w*h,q=l[w%l.length],C=L().domain([0,g]).range([0,-o]),I=a.append("g").attr("transform",`translate(0,${j})`);I.append("path").datum(P).attr("d",U().x(T=>p(T.x)).y0(0).y1(T=>C(T.y)).curve(N)).attr("fill",q).attr("opacity",e.fillAlpha),I.append("line").attr("x1",0).attr("x2",c).attr("y1",0).attr("y2",0).attr("stroke","rgba(255,255,255,0.1)").attr("stroke-width",1),I.append("path").datum(P).attr("d",K().x(T=>p(T.x)).y(T=>C(T.y)).curve(N)).attr("fill","none").attr("stroke",q).attr("stroke-width",2),I.append("text").attr("x",-8).attr("y",0).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").attr("dominant-baseline","middle").text(u.tp)})}const ge={scatter:ee,bar:ae,line:re,boxplot:oe,violin:ie,histogram:le,density:ne,heatmap:se,area:ce,errorbar:pe,lollipop:de,ridgeline:he},me={circle:"16",triangle:"17",square:"15",cross:"3"},fe={solid:'"solid"',dashed:'"dashed"',dotted:'"dotted"'};function ye(t){const e=t.jitter!=="none"?`    position = position_jitter(
      width = ${t.jitter==="light"?.1:.25},
      height = ${t.jitter==="light"?.1:.25}
    ),
`:"",n=t.regression?`  geom_smooth(
    aes(group = Species),
    method = "lm", se = TRUE,
    linewidth = 0.8, alpha = 0.15
  ) +
`:"";return`library(ggplot2)

# ── 数据示例（iris 为 R 内置数据集）──
# data(iris)  # 150 行 × 5 列
# str(iris)
# $ Sepal.Length: num  5.1 4.9 4.7 ...
# $ Petal.Length: num  1.4 1.4 1.3 ...
# $ Species     : Factor w/ 3 levels "setosa","versicolor","virginica"

ggplot(iris, aes(
  x     = Sepal.Length,
  y     = Petal.Length,
  color = Species
)) +
  geom_point(
    size  = ${t.size},
    alpha = ${t.alpha},
    shape = ${me[t.shape]||"16"},
${e}  ) +
${n}  scale_color_manual(values = c(
    setosa     = "#7EC8E3",
    versicolor = "#F0B27A",
    virginica  = "#95D5B2"
  )) +
  labs(
    x     = "Sepal Length (cm)",
    y     = "Petal Length (cm)",
    color = "Species",
    title = "萼片长度 vs 花瓣长度"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position  = "right",
    panel.grid.minor = element_blank()
  )`}function xe(t){const e={grouped:"position_dodge(0.8)",stacked:"position_stack()",filled:"position_fill()"},n=t.errorBars?`  geom_errorbar(
    aes(ymin = mean - se, ymax = mean + se),
    position = position_dodge(0.8),
    width = 0.2
  ) +
`:"",d=t.arrangement==="filled"?"Proportion":"Mean Value",v={grouped:"分组柱状图",stacked:"堆叠柱状图",filled:"百分比堆叠图"};return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  cat  = rep(c("Control","Trt-A","Trt-B","Trt-C","Trt-D"), each = 2),
  grp  = rep(c("Week 1","Week 8"), times = 5),
  mean = c(32, 55, 28, 62, 41, 78, 35, 48, 29, 71),
  se   = c(3.1, 4.8, 2.9, 5.2, 3.7, 6.1, 3.3, 4.5, 2.8, 5.9)
)

ggplot(data, aes(
  x    = cat,
  y    = mean,
  fill = grp
)) +
  geom_col(
    position = ${e[t.arrangement]},
    width    = ${t.barWidth}
  ) +
${n}  scale_fill_manual(values = c(
    "Week 1" = "#7EC8E3",
    "Week 8" = "#F0B27A"
  )) +
  labs(
    x     = "Treatment",
    y     = "${d}",
    fill  = "Time Point",
    title = "${v[t.arrangement]}"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    legend.position    = "right"
  )`}function ue(t){const e=t.fillArea?`  geom_area(alpha = 0.12, position = "identity") +
`:"",n=t.showPoints?`  geom_point(size = ${t.lineWidth+1}) +
`:"",d=t.smooth?`  # 平滑插值：geom_smooth(se = FALSE, method = "loess") 可替代 geom_line
`:"";return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  week  = rep(0:4, times = 3),
  value = c(30, 32, 34, 36, 38,    # Control
            30, 39, 48, 57, 66,    # Low Dose
            30, 45, 60, 75, 90),   # High Dose
  group = rep(c("Control","Low Dose","High Dose"), each = 5)
)

ggplot(data, aes(
  x     = week,
  y     = value,
  color = group,
  group = group
)) +
${e}  geom_line(
    linewidth = ${t.lineWidth},
    linetype  = ${fe[t.lineType]||'"solid"'}
  ) +
${n}${d}  scale_color_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  scale_x_continuous(breaks = 0:4, labels = paste0("W", 0:4)) +
  labs(
    x     = "Week",
    y     = "Response",
    color = "Group",
    title = "治疗响应随时间变化"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.minor = element_blank(),
    legend.position  = "right"
  )`}function be(t){const e=t.whisker==="iqr"?`    # 须线默认 1.5×IQR
`:`    coef = 0,     # 须线延伸到最值
`,n=t.notch?`    notch = TRUE,
`:"",d=t.showOutliers?`    outlier.shape = 1, outlier.alpha = 0.5,
`:`    outlier.shape = NA,
`,v=t.showMean?`  stat_summary(
    fun = mean, geom = "point",
    shape = 18, size = 3, color = "white"
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  group = rep(c("Control","Drug A","Drug B"), each = 30),
  value = c(rnorm(30, 25, 5), rnorm(30, 48, 8), rnorm(30, 66, 6))
)

ggplot(data, aes(
  x    = group,
  y    = value,
  fill = group
)) +
  geom_boxplot(
${n}${d}${e}    width     = ${t.boxWidth},
    alpha     = ${t.fillAlpha},
    linewidth = 0.6
  ) +
${v}  scale_fill_manual(values = c(
    "Control" = "#7EC8E3",
    "Drug A"  = "#F0B27A",
    "Drug B"  = "#95D5B2"
  )) +
  labs(
    x     = "Group",
    y     = "Response Value",
    title = "各组响应值分布"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position    = "none",
    panel.grid.major.x = element_blank()
  )`}function ve(t){const e=t.showBoxplot?`  geom_boxplot(
    width = 0.12, fill = "white",
    outlier.shape = NA, linewidth = 0.6
  ) +
`:"",n=t.halfViolin!=="full"?`  # 半小提琴图可用：ggdist::stat_halfeye(side = "${t.halfViolin}")
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  group = rep(c("Control","Drug A","Drug B"), each = 50),
  value = c(rnorm(50, 25, 5), rnorm(50, 48, 8), rnorm(50, 66, 6))
)

ggplot(data, aes(
  x    = group,
  y    = value,
  fill = group
)) +
  geom_violin(
    bw    = ${t.bw},
    alpha = ${t.fillAlpha},
    trim  = TRUE
  ) +
${e}${n}  scale_fill_manual(values = c(
    "Control" = "#7EC8E3",
    "Drug A"  = "#F0B27A",
    "Drug B"  = "#95D5B2"
  )) +
  labs(
    x     = "Group",
    y     = "Response Value",
    title = "各组响应值分布（小提琴图）"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position    = "none",
    panel.grid.major.x = element_blank()
  )`}function ke(t){const e=t.densityOverlay?`  geom_density(
    aes(y = after_stat(count)),
    color = "#F0B27A", linewidth = 1
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value = c(rnorm(120, mean = 30, sd = 8),
            rnorm(80,  mean = 65, sd = 10))
)

ggplot(data, aes(x = value)) +
  geom_histogram(
    bins  = ${t.bins},
    fill  = "#7EC8E3",
    alpha = ${t.fillAlpha},
    color = NA
  ) +
${e}  labs(
    x     = "Value",
    y     = "Count",
    title = "单变量分布直方图"
  ) +
  theme_minimal(base_size = 13) +
  theme(panel.grid.minor = element_blank())`}function we(t){const e=t.showRug?`  geom_rug(alpha = 0.3, sides = "b") +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value = c(rnorm(80, 30, 6), rnorm(80, 48, 9), rnorm(80, 62, 7)),
  group = rep(c("Control","Low Dose","High Dose"), each = 80)
)

ggplot(data, aes(
  x     = value,
  fill  = group,
  color = group
)) +
  geom_density(
    bw        = ${t.bw},
    alpha     = ${t.fillAlpha},
    linewidth = 0.8
  ) +
${e}  scale_fill_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  scale_color_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  labs(
    x     = "Value",
    y     = "Density",
    title = "各组密度分布对比"
  ) +
  theme_minimal(base_size = 13)`}function Ce(t){const e={rdbu:`scale_fill_gradient2(
    low = "#2166AC", mid = "white", high = "#B2182B",
    midpoint = 0
  )`,viridis:'scale_fill_viridis_c(option = "viridis")',plasma:'scale_fill_viridis_c(option = "plasma")'};return`library(ggplot2)
library(dplyr)
library(tidyr)

# ── 示例数据 ──
mat <- matrix(
  c(-1.2, 0.8, 1.5,-0.3, 0.5,
     0.4,-0.9, 1.1, 2.0,-0.7,
     1.8, 0.3,-1.5, 0.6, 1.2,
    -0.5, 1.4, 0.7,-1.0, 0.9,
     0.2,-0.6, 1.3, 1.7,-0.4,
    -1.0, 0.5, 0.8,-0.2, 1.6),
  nrow = 6, byrow = TRUE,
  dimnames = list(
    c("BRCA1","TP53","MYC","EGFR","VEGF","CDK4"),
    c("Ctrl","Trt-1h","Trt-6h","Trt-24h","Recover")
  )
)

# mat 为基因 × 样本矩阵，转换为长格式
data_long <- mat |>
  as.data.frame() |>
  rownames_to_column("gene") |>
  pivot_longer(-gene, names_to = "condition",
               values_to = "expression")

ggplot(data_long, aes(
  x    = condition,
  y    = gene,
  fill = expression
)) +
  geom_tile(linewidth = 0.3) +
${t.showValues?`  geom_text(
    aes(label = round(expression, 2)),
    size = 2.5, color = "white"
  ) +
`:""}  ${e[t.colorScheme]||e.rdbu} +
  labs(
    x     = "Condition",
    y     = "Gene",
    fill  = "log2 FC",
    title = "基因表达热力图"
  ) +
  theme_minimal(base_size = 11) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    panel.grid  = element_blank()
  )`}function Ee(t){const e={stacked:"position_stack()",proportional:"position_fill()"},n=t.arrangement==="proportional"?"Proportion":"Response",d=t.arrangement==="proportional"?`
  scale_y_continuous(labels = scales::percent) +`:"",v=t.showLines?`  geom_line(
    aes(group = group),
    position = ${e[t.arrangement]},
    linewidth = 0.8, alpha = 0.8
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  week  = rep(0:4, times = 3),
  value = c(30, 32, 34, 36, 38,    # Control
            30, 39, 48, 57, 66,    # Low Dose
            30, 45, 60, 75, 90),   # High Dose
  group = rep(c("Control","Low Dose","High Dose"), each = 5)
)

ggplot(data, aes(
  x     = week,
  y     = value,
  fill  = group,
  group = group
)) +
  geom_area(
    position = ${e[t.arrangement]},
    alpha    = ${t.fillAlpha}
  ) +
${v}  scale_fill_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +${d}
  labs(
    x     = "Week",
    y     = "${n}",
    fill  = "Group",
    title = "${t.arrangement==="proportional"?"比例堆叠面积图":"堆叠面积图"}"
  ) +
  theme_minimal(base_size = 13)`}function $e(t){const e={se:{ymin:"mean - se",ymax:"mean + se",note:"# se = sd / sqrt(n)"},sd:{ymin:"mean - sd",ymax:"mean + sd",note:"# sd = standard deviation"},ci95:{ymin:"mean - ci95",ymax:"mean + ci95",note:"# ci95 = 1.96 * se"}},n=e[t.errorType]||e.se;return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  group = c("Control","Group A","Group B","Group C","Group D","Group E"),
  mean  = c(24.3, 51.7, 38.2, 67.4, 44.8, 82.1),
  se    = c( 2.8,  4.3,  3.1,  5.6,  3.7,  6.2),
  sd    = c( 8.4, 12.9,  9.3, 16.8, 11.1, 18.6),
  ci95  = c( 5.5,  8.4,  6.1, 11.0,  7.3, 12.2)
)

${n.note}
ggplot(data, aes(x = group, y = mean)) +
  geom_errorbar(
    aes(ymin = ${n.ymin},
        ymax = ${n.ymax}),
    width     = ${t.capWidth},
    linewidth = ${t.lineWidth},
    color     = "#7EC8E3"
  ) +
  geom_point(
    size  = ${t.dotSize},
    color = "#7EC8E3"
  ) +
  labs(
    x     = "Group",
    y     = "Mean ± ${t.errorType.toUpperCase()}",
    title = "均值与误差范围"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    axis.text.x = element_text(angle = 30, hjust = 1)
  )`}function Be(t){const e=t.sortBy!=="none"?`  dplyr::mutate(gene = reorder(gene, ${t.sortBy==="asc"?"":"-"}log2fc)) |>
`:"",n=t.horizontal?`  coord_flip() +
`:"",d=t.horizontal?"":'angle = 35, hjust = 1, face = "italic"';return`library(ggplot2)
library(dplyr)

# ── 示例数据 ──
data <- data.frame(
  gene   = c("BRCA2","KRAS","PIK3CA","APC","PTEN","RB1","SMAD4","VHL"),
  log2fc = c(2.4, -1.8, 1.1, -2.7, 0.6, -1.3, 1.9, -0.5)
)

data |>
${e}ggplot(aes(x = gene, y = log2fc,
         color = ifelse(log2fc > 0, "up", "down"))) +
  geom_segment(
    aes(xend = gene, yend = 0),
    linewidth = ${t.lineWidth},
    alpha     = 0.7
  ) +
  geom_point(size = ${t.dotSize}) +
${n}  geom_hline(yintercept = 0, linetype = "dashed",
             color = "grey50", linewidth = 0.5) +
  scale_color_manual(values = c(
    "up"   = "#F0B27A",
    "down" = "#7EC8E3"
  ), guide = "none") +
  labs(
    x     = "Gene",
    y     = "log2 Fold Change",
    title = "差异基因 log2FC 棒棒糖图"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.${t.horizontal?"y":"x"} = element_blank(),
    axis.text.x = element_text(${d})
  )`}function Ae(t){return`library(ggplot2)
library(ggridges)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value     = c(rnorm(50, 30, 5), rnorm(50, 42, 7),
                rnorm(50, 54, 9), rnorm(50, 66, 11)),
  timepoint = factor(
    rep(c("Week 0","Week 4","Week 8","Week 12"), each = 50),
    levels = c("Week 12","Week 8","Week 4","Week 0")
  )
)

ggplot(data, aes(
  x    = value,
  y    = timepoint,
  fill = timepoint
)) +
  geom_density_ridges(
    scale          = ${t.overlap},
    bandwidth      = ${t.bw},
    alpha          = ${t.fillAlpha},
    rel_min_height = 0.01
  ) +
  scale_fill_manual(values = c(
    "Week 0"  = "#7EC8E3",
    "Week 4"  = "#F0B27A",
    "Week 8"  = "#95D5B2",
    "Week 12" = "#B8B8E8"
  )) +
  labs(
    x     = "Value",
    y     = "Time Point",
    title = "随时间变化的分布（山脊图）"
  ) +
  theme_ridges(font_size = 13) +
  theme(legend.position = "none")`}const St={scatter:ye,bar:xe,line:ue,boxplot:be,violin:ve,histogram:ke,density:we,heatmap:Ce,area:Ee,errorbar:$e,lollipop:Be,ridgeline:Ae};function S(t,e){return`<button class="p7-toggle${t?" p7-toggle--on":""}" data-toggle="${e}">
    <span class="p7-tog-track"><span class="p7-tog-thumb"></span></span>
    <span class="p7-tog-lbl">${t?"开启":"关闭"}</span>
  </button>`}function H(t,e,n){return`<div class="p7-opt-row">${t.map(d=>`<button class="p7-opt-btn${d.val===e?" active":""}" data-group="${n}" data-val="${d.val}">${d.label}</button>`).join("")}</div>`}function _(t,e,n,d,v){return`<div class="p7-ctrl-hdr">
    <span class="p7-ctrl-lbl">${{size:"点大小",alpha:"透明度",barWidth:"柱宽",lineWidth:"线宽",boxWidth:"箱宽",fillAlpha:"填充透明度",bw:"带宽",bins:"分箱数",capWidth:"线帽宽度",dotSize:"点大小",overlap:"重叠度"}[t]}</span>
    <span class="p7-ctrl-val" id="p7-val-${t}">${v}</span>
  </div>
  <input class="p7-slider" type="range" data-param="${t}"
    min="${e}" max="${n}" step="${d}" value="${v}">`}function Le(t){return`
    <div class="p7-ctrl-group">${_("size",1,8,1,t.size)}</div>
    <div class="p7-ctrl-group">${_("alpha",.1,1,.1,t.alpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">抖动</span>
      ${H([{val:"none",label:"无"},{val:"light",label:"轻微"},{val:"heavy",label:"明显"}],t.jitter,"jitter")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">回归线</span>
      ${S(t.regression,"regression")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">点形状</span>
      <div class="p7-opt-row">${[{val:"circle",label:"●",title:"圆形"},{val:"triangle",label:"▲",title:"三角"},{val:"square",label:"■",title:"方形"},{val:"cross",label:"✕",title:"十字"}].map(e=>`<button class="p7-shape-btn${e.val===t.shape?" active":""}" data-group="shape" data-val="${e.val}" title="${e.title}">${e.label}</button>`).join("")}</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function _e(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排列方式</span>
      ${H([{val:"grouped",label:"分组"},{val:"stacked",label:"堆叠"},{val:"filled",label:"百分比"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${_("barWidth",.3,.9,.05,t.barWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差线</span>
      ${S(t.errorBars,"errorBars")}
      <div class="p7-ctrl-note">分组模式下可见误差线</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function We(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">线型</span>
      ${H([{val:"solid",label:"实线"},{val:"dashed",label:"虚线"},{val:"dotted",label:"点线"}],t.lineType,"lineType")}
    </div>
    <div class="p7-ctrl-group">${_("lineWidth",.5,3,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据点</span>
      ${S(t.showPoints,"showPoints")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">平滑曲线</span>
      ${S(t.smooth,"smooth")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">面积填充</span>
      ${S(t.fillArea,"fillArea")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Me(t){return`
    <div class="p7-ctrl-group">${_("boxWidth",.3,.9,.05,t.boxWidth)}</div>
    <div class="p7-ctrl-group">${_("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">须线样式</span>
      ${H([{val:"iqr",label:"1.5×IQR"},{val:"minmax",label:"全范围"}],t.whisker,"whisker")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示异常值</span>
      ${S(t.showOutliers,"showOutliers")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">Notch（槽口置信区间）</span>
      ${S(t.notch,"notch")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示均值（菱形）</span>
      ${S(t.showMean,"showMean")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Se(t){return`
    <div class="p7-ctrl-group">${_("bw",.2,2,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${_("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">嵌套箱线图</span>
      ${S(t.showBoxplot,"showBoxplot")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">展示方向</span>
      ${H([{val:"full",label:"完整"},{val:"left",label:"左半"},{val:"right",label:"右半"}],t.halfViolin,"halfViolin")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function De(t){return`
    <div class="p7-ctrl-group">${_("bins",5,50,1,t.bins)}</div>
    <div class="p7-ctrl-group">${_("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">叠加密度曲线</span>
      ${S(t.densityOverlay,"densityOverlay")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ze(t){return`
    <div class="p7-ctrl-group">${_("bw",.5,5,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${_("fillAlpha",0,.6,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据地毯</span>
      ${S(t.showRug,"showRug")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Fe(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">颜色映射方案</span>
      ${H([{val:"rdbu",label:"红蓝"},{val:"viridis",label:"Viridis"},{val:"plasma",label:"Plasma"}],t.colorScheme,"colorScheme")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数值标签</span>
      ${S(t.showValues,"showValues")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Te(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">堆叠方式</span>
      ${H([{val:"stacked",label:"绝对堆叠"},{val:"proportional",label:"比例填充"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${_("fillAlpha",.2,.95,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示边界线</span>
      ${S(t.showLines,"showLines")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Re(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差类型</span>
      ${H([{val:"se",label:"SE"},{val:"sd",label:"SD"},{val:"ci95",label:"95% CI"}],t.errorType,"errorType")}
      <div class="p7-ctrl-note">SE：标准误 · SD：标准差 · CI：置信区间</div>
    </div>
    <div class="p7-ctrl-group">${_("capWidth",.1,.5,.05,t.capWidth)}</div>
    <div class="p7-ctrl-group">${_("lineWidth",.5,2.5,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">${_("dotSize",2,10,1,t.dotSize)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function He(t){return`
    <div class="p7-ctrl-group">${_("dotSize",4,16,1,t.dotSize)}</div>
    <div class="p7-ctrl-group">${_("lineWidth",.5,3,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排序方式</span>
      ${H([{val:"none",label:"原始"},{val:"asc",label:"升序"},{val:"desc",label:"降序"}],t.sortBy,"sortBy")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">水平方向</span>
      ${S(t.horizontal,"horizontal")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Pe(t){return`
    <div class="p7-ctrl-group">${_("overlap",.2,1.5,.1,t.overlap)}</div>
    <div class="p7-ctrl-group">${_("fillAlpha",.2,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">${_("bw",.5,5,.1,t.bw)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}const Ie={scatter:Le,bar:_e,line:We,boxplot:Me,violin:Se,histogram:De,density:ze,heatmap:Fe,area:Te,errorbar:Re,lollipop:He,ridgeline:Pe};function fa(){const t=`<svg class="p7-chevron" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/></svg>`,e=Y.map(d=>`
    <button class="p7-chart-tab${d.id==="scatter"?" active":""}" data-chart="${d.id}">
      ${d.name}
    </button>`).join("");return`
<div class="page-scroll">
<style>
/* ══ p07 作用域样式 ══ */
.p7-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark); display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
@keyframes p7-glow-a {
  0%,100% { transform:translate(0,0) scale(1); opacity:1; }
  40% { transform:translate(-4%,2%) scale(1.08); opacity:0.7; }
  70% { transform:translate(3%,-3%) scale(0.95); opacity:0.9; }
}
@keyframes p7-glow-b {
  0%,100% { transform:translate(0,0) scale(1); opacity:0.5; }
  50% { transform:translate(6%,4%) scale(1.12); opacity:0.9; }
}
.p7-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 55% 45% at 35% 45%, rgba(126,200,227,0.12) 0%, transparent 65%);
  pointer-events:none;
  animation:p7-glow-a 12s ease-in-out infinite;
}
.p7-hero::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 45% 40% at 72% 58%, rgba(184,184,232,0.08) 0%, transparent 60%);
  pointer-events:none;
  animation:p7-glow-b 15s ease-in-out infinite;
}
.p7-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:.15em; text-transform:uppercase;
}
.p7-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-.02em; line-height:1.1; color:var(--text-on-dark);
}
.p7-hero-sub { /* styling via global .page-hero-sub */ }
.p7-hero-tagline { /* styling via inline styles */ }
.p7-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p7-float 2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p7-float{0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)}}
.p7-container { max-width:960px; margin:0 auto; }
.p7-container-wide { max-width:1440px; margin:0 auto; }

/* ── Gallery ── */
.p7-gallery-section {
  background:var(--bg-light); color:var(--text-on-light);
  padding:var(--space-xl) var(--space-lg) var(--space-2xl);
}
.p7-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p7-sec-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-sec-sub {
  font-size:1.05rem; line-height:1.7; max-width:600px;
  margin:var(--space-sm) auto 0; opacity:.65;
}
.p7-chart-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md);
}
.p7-chart-card {
  background:var(--bg-light-elevated); border:1.5px solid var(--border-light);
  border-radius:var(--radius-md); overflow:hidden; cursor:pointer;
  transition:opacity 0.5s ease, transform 0.5s ease, border-color .3s var(--ease-apple), box-shadow .3s var(--ease-apple);
  display:flex; flex-direction:column;
  opacity:0; transform:translateY(20px);
}
.p7-chart-card.p7-card-vis { opacity:1; transform:translateY(0); }
.p7-chart-card.p7-card-vis:hover {
  border-color:var(--accent); transform:translateY(-4px); box-shadow:var(--shadow-hover);
}
.p7-chart-card.active {
  border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow);
}
.p7-thumb-wrap { overflow:hidden; line-height:0; }
.p7-card-info { padding:14px 14px 8px; flex:1; }
.p7-card-name {
  font-family:var(--font-display); font-size:1.1rem; font-weight:700;
  color:var(--text-on-light);
}
.p7-card-en {
  font-size:.75rem; color:var(--text-on-light-3); margin-top:1px;
  font-family:var(--font-code); letter-spacing:.05em;
}
.p7-card-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
.p7-tag {
  padding:2px 10px; background:var(--bg-light-alt);
  border:1px solid var(--border-light); border-radius:var(--radius-full);
  font-size:.72rem; color:var(--text-on-light-2);
}
.p7-chart-card.active .p7-tag {
  border-color:rgba(126,200,227,.3); color:var(--accent);
  background:rgba(126,200,227,.06);
}
.p7-card-desc {
  font-size:.8rem; line-height:1.5; color:var(--text-on-light-2); margin-top:8px;
}
.p7-card-cta {
  padding:8px 14px 12px; font-size:.78rem; color:var(--accent); font-weight:500;
}
.p7-chart-card:hover .p7-card-cta,
.p7-chart-card.active .p7-card-cta { color:var(--accent-hover); }

/* ── Workshop ── */
.p7-workshop-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg) var(--space-2xl);
}
.p7-ws-head {
  display:flex; align-items:flex-start; justify-content:space-between;
  gap:var(--space-md); flex-wrap:wrap; margin-bottom:var(--space-lg);
}
.p7-ws-title {
  font-family:var(--font-display); font-size:clamp(1.5rem,3vw,2.25rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-chart-tabs { display:flex; gap:6px; flex-wrap:wrap; align-self:flex-end; }
.p7-chart-tab {
  padding:10px 20px; background:var(--bg-dark-elevated);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-2); font-size:.9rem; cursor:pointer;
  transition:all var(--t-fast); min-height:44px; white-space:nowrap;
}
.p7-chart-tab:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-chart-tab.active {
  background:var(--accent); border-color:var(--accent);
  color:#1d1d1f; font-weight:600;
}
/* 3-panel grid */
.p7-ws-layout {
  display:grid; grid-template-columns:280px 1fr 360px;
  gap:var(--space-md); align-items:start;
}
.p7-panel {
  background:var(--bg-dark-elevated); border:1px solid var(--border-dark);
  border-radius:var(--radius-md); overflow:hidden;
}
.p7-panel-hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 16px; border-bottom:1px solid var(--border-dark);
  font-size:.9rem; font-weight:600; color:var(--text-on-dark); user-select:none;
}
.p7-panel-body { padding:16px; }
.p7-chevron { transition:transform var(--t-fast); flex-shrink:0; color:var(--text-on-dark-3); }
.p7-panel.collapsed .p7-chevron { transform:rotate(-90deg); }

/* Params */
.p7-ctrl-group { margin-bottom:20px; }
.p7-ctrl-group:last-of-type { margin-bottom:12px; }
.p7-ctrl-hdr { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.p7-ctrl-lbl { font-size:.85rem; color:var(--text-on-dark-2); display:block; margin-bottom:8px; }
.p7-ctrl-hdr .p7-ctrl-lbl { margin-bottom:0; }
.p7-ctrl-val { font-family:var(--font-code); font-size:.82rem; color:var(--accent); min-width:32px; text-align:right; }
.p7-slider {
  -webkit-appearance:none; appearance:none; width:100%; height:6px;
  border-radius:var(--radius-full); background:var(--border-dark); outline:none; cursor:pointer;
}
.p7-slider::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px; border-radius:50%;
  background:var(--accent); cursor:pointer; box-shadow:0 0 8px rgba(126,200,227,.4);
}
.p7-slider::-moz-range-thumb {
  width:20px; height:20px; border-radius:50%;
  background:var(--accent); border:none; cursor:pointer;
}
.p7-opt-row { display:flex; gap:4px; flex-wrap:wrap; }
.p7-opt-btn {
  padding:7px 14px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-3); font-size:.82rem; cursor:pointer;
  transition:all var(--t-fast); min-height:36px;
}
.p7-opt-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-opt-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-shape-btn {
  width:38px; height:38px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-sm);
  color:var(--text-on-dark-2); cursor:pointer; transition:all var(--t-fast);
  display:flex; align-items:center; justify-content:center; font-size:1rem;
}
.p7-shape-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-shape-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-toggle {
  display:inline-flex; align-items:center; gap:10px; cursor:pointer;
  background:none; border:none; padding:0; color:var(--text-on-dark-2);
  font-size:.85rem; min-height:36px;
}
.p7-tog-track {
  width:40px; height:22px; background:var(--border-dark);
  border-radius:11px; position:relative; transition:background var(--t-fast); flex-shrink:0;
}
.p7-tog-thumb {
  width:16px; height:16px; border-radius:50%; background:#666;
  position:absolute; top:3px; left:3px; transition:all var(--t-fast);
}
.p7-toggle.p7-toggle--on .p7-tog-track { background:rgba(126,200,227,.3); }
.p7-toggle.p7-toggle--on .p7-tog-thumb { background:var(--accent); left:21px; }
.p7-toggle.p7-toggle--on .p7-tog-lbl { color:var(--accent); }
.p7-ctrl-note { font-size:.75rem; color:var(--text-on-dark-3); margin-top:6px; }
.p7-reset-btn {
  width:100%; padding:10px; background:transparent;
  border:1px solid var(--border-dark); border-radius:var(--radius-md);
  color:var(--text-on-dark-3); cursor:pointer; font-size:.85rem;
  transition:all var(--t-fast); margin-top:4px; min-height:44px;
}
.p7-reset-btn:hover { border-color:var(--accent); color:var(--accent); }
/* Preview */
.p7-preview-panel .p7-panel-body { padding:12px; display:flex; flex-direction:column; gap:8px; }
#p7-d3-container { width:100%; }
.p7-preview-info {
  font-family:var(--font-code); font-size:.72rem;
  color:var(--text-on-dark-3); text-align:center; padding:4px 0;
}
/* Code panel */
.p7-code-panel .p7-panel-body { padding:0; display:flex; flex-direction:column; }
.p7-code-actions {
  display:flex; align-items:center; gap:8px;
  padding:10px 12px; border-top:1px solid var(--border-dark); flex-wrap:wrap;
}
.p7-export-btn {
  padding:9px 18px; background:transparent;
  border:1.5px solid var(--accent); border-radius:var(--radius-full);
  color:var(--accent); font-size:.85rem; cursor:pointer;
  transition:all var(--t-fast); min-height:40px;
}
.p7-export-btn:hover { background:var(--accent-subtle); }
.p7-export-btn:active { transform:scale(.97); }
/* footer uses global .page-footer-cta */

/* ── Tablet ── */
@media (max-width:1024px) {
  .p7-ws-layout {
    grid-template-columns:240px 1fr;
    grid-template-areas:'params preview' 'code code';
  }
  .p7-code-panel { grid-area:code; }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); }
}

/* ── Mobile tab bar (hidden on desktop) ── */
.p7-mobile-tabs {
  display:none; border-radius:var(--radius-md) var(--radius-md) 0 0;
  overflow:hidden; border:1px solid var(--border-dark); border-bottom:none;
}
.p7-mob-tab {
  flex:1; padding:13px 4px; background:var(--bg-dark-elevated);
  border:none; border-right:1px solid var(--border-dark);
  color:var(--text-on-dark-3); font-size:.78rem; cursor:pointer;
  min-height:48px; transition:background .2s,color .2s;
  font-weight:500; line-height:1.3; white-space:nowrap;
}
.p7-mob-tab:last-child { border-right:none; }
.p7-mob-tab.active { background:var(--accent); color:#0a0a0a; font-weight:700; }

/* ── Mobile ── */
@media (max-width:768px) {
  /* Gallery & workshop sections */
  .p7-gallery-section,.p7-workshop-section { padding:var(--space-lg) var(--space-sm); }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
  .p7-card-desc { display:none; }

  /* Workshop head */
  .p7-ws-head { flex-direction:column; gap:var(--space-sm); }
  .p7-chart-tabs { overflow-x:auto; scrollbar-width:none; width:100%; }
  .p7-chart-tabs::-webkit-scrollbar { display:none; }
  .p7-chart-tab { padding:8px 14px; font-size:.8rem; min-height:40px; }

  /* Show mobile tab bar */
  .p7-mobile-tabs { display:flex; }

  /* Workshop: single-panel tab view */
  .p7-ws-layout { display:block; }
  .p7-panel { display:none; border-radius:0 0 var(--radius-md) var(--radius-md); border:1px solid var(--border-dark); border-top:none; }
  .p7-panel.mob-active { display:flex; flex-direction:column; }
  .p7-panel-hdr { display:none; } /* replaced by mobile tab bar */

  /* Params panel: scrollable, compact */
  #p7-params-body { max-height:62vh; overflow-y:auto; padding:14px; }
  .p7-ctrl-group { margin-bottom:16px; }
  .p7-opt-row { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .p7-opt-btn { padding:9px 4px; font-size:.8rem; min-height:40px; }
  .p7-shape-btn { padding:9px 4px; font-size:1rem; min-height:40px; }
  /* Shape buttons: 4 in a row */
  .p7-ctrl-group .p7-opt-row:has(.p7-shape-btn) { grid-template-columns:repeat(4,1fr); }
  .p7-slider::-webkit-slider-thumb { width:24px; height:24px; }
  .p7-slider::-moz-range-thumb { width:24px; height:24px; }
  .p7-slider { min-height:32px; }

  /* Preview panel */
  #p7-preview-body { padding:10px; }

  /* Code panel: limited height + scroll */
  #p7-code-body { display:flex; flex-direction:column; max-height:65vh; }
  #p7-code-editor { flex:1; min-height:0; overflow:auto; max-height:50vh; }
  .p7-code-actions { padding:10px 12px; flex-shrink:0; }

  /* footer nav uses global .page-footer-nav */
}
@media (max-width:480px) {
  .p7-chart-grid { gap:10px; }
}
@media (max-width:400px) {
  .p7-chart-grid { grid-template-columns:1fr; }
}
</style>

<!-- Hero -->
<section class="p7-hero section-dark section-hero-full" id="p7-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p7-eyebrow" id="p7-hero-eyebrow" style="opacity:0;">Module 01 / Page 07</p>
    <h1 class="page-hero-title p7-hero-title" style="color:var(--text-on-dark);opacity:0;">ggplot2<br>图表工作坊</h1>
    <p class="page-hero-sub p7-hero-sub" style="opacity:0;">ggplot2 Chart Workshop</p>
    <p class="p7-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">12 种常用图表 · 参数实时调节 · R 代码即时生成 · 一键导出脚本</p>
    <nav class="hero-quicknav" id="p7-hero-nav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p7-gallery">图表类型库</button>
      <button class="hero-quicknav__item" data-target="#p7-workshop">交互工作坊</button>
    </nav>
    <div class="p7-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- Gallery -->
<section class="p7-gallery-section" id="p7-gallery">
  <div class="p7-container">
    <div class="p7-sec-hdr" id="p7-gallery-hdr">
      <div class="p7-eyebrow" style="color:var(--text-on-light-2)">图表类型</div>
      <h2 class="p7-sec-title">12 种核心图表</h2>
      <p class="p7-sec-sub">点击任意图表卡片进入工作坊，实时调节参数并同步生成 R 代码。</p>
    </div>
    <div class="p7-chart-grid" id="p7-chart-grid">${Y.map(d=>`
    <div class="p7-chart-card" data-chart="${d.id}" id="p7-card-${d.id}"
         role="button" tabindex="0" aria-label="打开 ${d.name} 工作坊">
      <div class="p7-thumb-wrap">${te[d.id]||""}</div>
      <div class="p7-card-info">
        <div class="p7-card-name">${d.name}</div>
        <div class="p7-card-en">${d.en}</div>
        <div class="p7-card-tags">${d.tags.map(v=>`<span class="p7-tag">${v}</span>`).join("")}</div>
        <div class="p7-card-desc">${d.desc}</div>
      </div>
      <div class="p7-card-cta">打开工作坊 →</div>
    </div>`).join("")}</div>
  </div>
</section>

<!-- Workshop -->
<section class="p7-workshop-section" id="p7-workshop">
  <div class="p7-container-wide">
    <div class="p7-ws-head">
      <div>
        <div class="p7-eyebrow">交互工作坊</div>
        <h2 class="p7-ws-title" id="p7-ws-title">散点图</h2>
      </div>
      <div class="p7-chart-tabs" id="p7-chart-tabs">${e}</div>
    </div>
    <!-- 移动端三栏切换 Tab -->
    <div class="p7-mobile-tabs" id="p7-mobile-tabs">
      <button class="p7-mob-tab" data-panel="params">⚙ 参数控制</button>
      <button class="p7-mob-tab active" data-panel="preview">📊 实时预览</button>
      <button class="p7-mob-tab" data-panel="code">{ } R 代码</button>
    </div>
    <div class="p7-ws-layout" id="p7-ws-layout">

      <!-- 左：参数 -->
      <div class="p7-panel p7-params-panel" id="p7-params-panel">
        <div class="p7-panel-hdr" id="p7-params-hdr">
          <span>⚙ 参数控制</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-params-body"></div>
      </div>

      <!-- 中：预览 -->
      <div class="p7-panel p7-preview-panel" id="p7-preview-panel">
        <div class="p7-panel-hdr" id="p7-preview-hdr">
          <span>📊 实时预览</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-preview-body">
          <div id="p7-d3-container"></div>
          <div class="p7-preview-info" id="p7-preview-info">Iris 数据集 · 60 个观测点 · 3 物种</div>
        </div>
      </div>

      <!-- 右：代码 -->
      <div class="p7-panel p7-code-panel" id="p7-code-panel">
        <div class="p7-panel-hdr" id="p7-code-hdr">
          <span>{ } R 代码</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-code-body">
          <div id="p7-code-editor"></div>
          <div class="p7-code-actions">
            <button class="p7-export-btn" id="p7-export-btn">↓ 导出脚本</button>
            <div id="p7-copy-wrap"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta" id="p7-footer">
  <p class="page-footer-num">07 / 10</p>
  <h2 class="page-footer-quote" id="p7-footer-inner">掌握参数，让图表更出色</h2>
  <p class="page-footer-desc">第 8 页深入 R 配色方案与出版级图表调整——主题定制器、期刊规格导出、patchwork 多面板布局。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p7-btn-prev">← 图层语法</button>
    <button class="btn-primary" id="p7-btn-next">R 配色方案 →</button>
  </div>
</section>
</div>`}function lt(t){if(!Y.find(d=>d.id===t))return;k.currentChart=t,document.querySelectorAll(".p7-chart-tab").forEach(d=>d.classList.toggle("active",d.dataset.chart===t)),document.querySelectorAll(".p7-chart-card").forEach(d=>d.classList.toggle("active",d.dataset.chart===t));const e=document.getElementById("p7-ws-title"),n=Y.find(d=>d.id===t);e&&n&&(e.textContent=n.name),Dt(),Z(),ht(),qe()}function Dt(){const t=document.getElementById("p7-params-body");if(t&&(t.innerHTML=Ie[k.currentChart](k.params[k.currentChart]),window.innerWidth<=768)){const e=t.closest(".p7-panel");e&&e.classList.contains("collapsed")&&(t.classList.add("p7-collapsed"),t.classList.remove("p7-expanded"))}}function Z(){const t=document.getElementById("p7-d3-container");t&&ge[k.currentChart](t,k.params[k.currentChart])}function ht(){if(!k.editor)return;const t=St[k.currentChart](k.params[k.currentChart]);k.editor.setCode(t)}function qe(){const t=document.getElementById("p7-preview-info");if(!t)return;const e=Y.find(n=>n.id===k.currentChart);e&&(t.textContent=e.info)}function Lt(t,e){k.params[k.currentChart][t]=e,Z(),ht()}function Ve(){k.params[k.currentChart]=JSON.parse(JSON.stringify(ut[k.currentChart])),Dt(),Z(),ht()}function je(){if(window.innerWidth>768)return;[{hdrId:"p7-params-hdr",bodyId:"p7-params-body",expanded:!1},{hdrId:"p7-preview-hdr",bodyId:"p7-preview-body",expanded:!0},{hdrId:"p7-code-hdr",bodyId:"p7-code-body",expanded:!1}].forEach(e=>{const n=document.getElementById(e.bodyId);if(!n)return;e.expanded?n.classList.add("p7-expanded"):(n.classList.add("p7-collapsed"),n.closest(".p7-panel")?.classList.add("collapsed"));const d=document.getElementById(e.hdrId);if(!d)return;const v=()=>{n.classList.contains("p7-expanded")?(n.classList.replace("p7-expanded","p7-collapsed"),d.closest(".p7-panel")?.classList.add("collapsed")):(n.classList.replace("p7-collapsed","p7-expanded"),d.closest(".p7-panel")?.classList.remove("collapsed"))};d.addEventListener("click",v),k.cleanups.push(()=>d.removeEventListener("click",v))})}function Oe(){const t=Q.timeline({delay:.2});t.fromTo("#p7-hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),t.fromTo(".p7-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),t.fromTo(".p7-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo(".p7-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#p7-hero-nav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),t.fromTo(".p7-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),Q.from("#p7-gallery-hdr",{scrollTrigger:{trigger:"#p7-gallery",start:"top 85%"},opacity:0,y:50,duration:.8,ease:"power3.out"}),Q.from("#p7-ws-layout",{scrollTrigger:{trigger:"#p7-workshop",start:"top 80%"},opacity:0,y:30,duration:.8,ease:"power3.out"}),Q.from("#p7-footer-inner",{scrollTrigger:{trigger:"#p7-footer",start:"top 85%"},opacity:0,y:40,duration:.8,ease:"power3.out"})}function ya(){const t=document.querySelectorAll(".p7-chart-card");if(t.length){const x=new IntersectionObserver(b=>{b.forEach(s=>{s.isIntersecting&&(s.target.classList.add("p7-card-vis"),x.unobserve(s.target))})},{threshold:.05,rootMargin:"0px 0px -10px 0px"});t.forEach(b=>x.observe(b)),k.cleanups.push(()=>x.disconnect())}const e=document.getElementById("p7-mobile-tabs");if(e){const x={params:"p7-params-panel",preview:"p7-preview-panel",code:"p7-code-panel"},b=p=>{e.querySelectorAll(".p7-mob-tab").forEach(i=>i.classList.toggle("active",i.dataset.panel===p)),Object.entries(x).forEach(([i,m])=>document.getElementById(m)?.classList.toggle("mob-active",i===p)),p==="preview"&&Z()};window.innerWidth<=768&&b("preview");const s=p=>{const i=p.target.closest("[data-panel]");i&&(p.preventDefault(),b(i.dataset.panel))};e.addEventListener("click",s),k.cleanups.push(()=>e.removeEventListener("click",s))}const n=document.getElementById("p7-code-editor");n&&(k.editor=Pt(n,{code:St.scatter(k.params.scatter),language:"r"}));const d=document.getElementById("p7-copy-wrap");d&&(k.copyBtn=It(d,{getText:()=>k.editor?k.editor.getCode():"",label:"复制代码",successLabel:"已复制"})),lt("scatter");const v=document.getElementById("p7-chart-grid");if(v){const x=s=>{const p=s.target.closest("[data-chart]");p&&(lt(p.dataset.chart),document.getElementById("p7-workshop")?.scrollIntoView({behavior:"smooth",block:"start"}))},b=s=>{if(s.key==="Enter"||s.key===" "){const p=s.target.closest("[data-chart]");p&&(s.preventDefault(),lt(p.dataset.chart))}};v.addEventListener("click",x),v.addEventListener("keydown",b),k.cleanups.push(()=>{v.removeEventListener("click",x),v.removeEventListener("keydown",b)})}const a=document.getElementById("p7-chart-tabs");if(a){const x=b=>{const s=b.target.closest("[data-chart]");s&&lt(s.dataset.chart)};a.addEventListener("click",x),k.cleanups.push(()=>a.removeEventListener("click",x))}const c=document.getElementById("p7-params-body");if(c){const x=s=>{if(s.target.dataset.param){const p=s.target.dataset.param,i=parseFloat(s.target.value),m=document.getElementById(`p7-val-${p}`);m&&(m.textContent=i),Lt(p,i)}},b=s=>{const p=s.target.closest("[data-group][data-val]");if(p){const m=p.dataset.group,r=p.dataset.val;c.querySelectorAll(`[data-group="${m}"]`).forEach(h=>h.classList.remove("active")),p.classList.add("active"),Lt(m,r);return}const i=s.target.closest("[data-toggle]");if(i){const m=i.dataset.toggle,r=!k.params[k.currentChart][m];k.params[k.currentChart][m]=r,i.classList.toggle("p7-toggle--on",r);const h=i.querySelector(".p7-tog-lbl");h&&(h.textContent=r?"开启":"关闭"),Z(),ht();return}s.target.closest("[data-reset]")&&Ve()};c.addEventListener("input",x),c.addEventListener("click",b),k.cleanups.push(()=>{c.removeEventListener("input",x),c.removeEventListener("click",b)})}const f=document.getElementById("p7-export-btn");if(f){const x=()=>{const b=k.editor?k.editor.getCode():"",s=new Blob([b],{type:"text/plain"}),p=URL.createObjectURL(s),i=document.createElement("a");i.href=p,i.download=`${k.currentChart}_plot.R`,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(p)};f.addEventListener("click",x),k.cleanups.push(()=>f.removeEventListener("click",x))}document.querySelectorAll("#p7-hero-nav .hero-quicknav__item").forEach(x=>{x.addEventListener("click",()=>{document.querySelector(x.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),document.getElementById("p7-btn-prev")?.addEventListener("click",()=>vt("m1-p6")),document.getElementById("p7-btn-next")?.addEventListener("click",()=>vt("m1-p8")),je(),Oe()}function xa(){Ht(),k.editor&&(k.editor.destroy(),k.editor=null),k.copyBtn&&(k.copyBtn.destroy(),k.copyBtn=null),k.cleanups.forEach(t=>t()),k.cleanups=[],k.currentChart="scatter",k.params=JSON.parse(JSON.stringify(ut))}export{xa as destroy,ya as init,fa as render};
