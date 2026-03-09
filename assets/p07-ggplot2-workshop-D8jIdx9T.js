import{k as Zt,g as et}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as Ut}from"./CodeEditor-BiI1SvFS.js";import{c as Kt}from"./CopyButton-2sIiwDp8.js";import{n as $t}from"./index-B0tbaLKl.js";import{a as Bt,n as Jt,i as zt,d as Xt,e as Ft,f as Qt,g as te,l as L,r as ht,b as R,p as Tt,h as wt,s as At}from"./transform-ZU6R_1Oi.js";import{m as D}from"./min-D1slsF82.js";import{m as B}from"./max-DBeXZoyG.js";import{a as ee,s as Lt}from"./ramp-BVcNPFnM.js";import{b as ae}from"./bin-mVdl7xVY.js";import{s as bt}from"./sum-CB6J5KXz.js";import{w as re,c as at}from"./path-CbwjOpE9.js";import{t as oe,a as K,p as ie}from"./math-CRUJxRjv.js";import{a as _,b as E,c as ne}from"./axis-FVV8vvN_.js";import{a as J}from"./area-D7iSONw5.js";import{b as Y,p as le,v as se,R as ce}from"./basis-DySTvzFC.js";import{l as X,c as pe}from"./line-Ci26EkcQ.js";import{n as de,s as pt,m as Mt}from"./stack-Dxh_ZBJe.js";import{c as Rt}from"./catmullRom-Dm0ttBHj.js";function he(t=Bt){if(t===Bt)return Ht;if(typeof t!="function")throw new TypeError("compare is not a function");return(e,a)=>{const o=t(e,a);return o||o===0?o:(t(a,a)===0)-(t(e,e)===0)}}function Ht(t,e){return(t==null||!(t>=t))-(e==null||!(e>=e))||(t<e?-1:t>e?1:0)}function Pt(t,e,a=0,o=1/0,s){if(e=Math.floor(e),a=Math.floor(Math.max(0,a)),o=Math.floor(Math.min(t.length-1,o)),!(a<=e&&e<=o))return t;for(s=s===void 0?Ht:he(s);o>a;){if(o-a>600){const u=o-a+1,b=e-a+1,d=Math.log(u),g=.5*Math.exp(2*d/3),c=.5*Math.sqrt(d*g*(u-g)/u)*(b-u/2<0?-1:1),f=Math.max(a,Math.floor(e-b*g/u+c)),l=Math.min(o,Math.floor(e+(u-b)*g/u+c));Pt(t,e,f,l,s)}const r=t[e];let i=a,h=o;for(N(t,a,e),s(t[o],r)>0&&N(t,a,o);i<h;){for(N(t,i,h),++i,--h;s(t[i],r)<0;)++i;for(;s(t[h],r)>0;)--h}s(t[a],r)===0?N(t,a,h):(++h,N(t,h,o)),h<=e&&(a=h+1),e<=h&&(o=h-1)}return t}function N(t,e,a){const o=t[e];t[e]=t[a],t[a]=o}function O(t,e,a){if(t=Float64Array.from(Jt(t)),!(!(o=t.length)||isNaN(e=+e))){if(e<=0||o<2)return D(t);if(e>=1)return B(t);var o,s=(o-1)*e,r=Math.floor(s),i=B(Pt(t,r).subarray(0,r+1)),h=D(t.subarray(r+1));return i+(h-i)*(s-r)}}function dt(t,e){let a=0,o=0;if(e===void 0)for(let s of t)s!=null&&(s=+s)>=s&&(++a,o+=s);else{let s=-1;for(let r of t)(r=e(r,++s,t))!=null&&(r=+r)>=r&&(++a,o+=r)}if(a)return o/a}function ge(t,e){e===void 0&&(e=t,t=zt);for(var a=0,o=e.length-1,s=e[0],r=new Array(o<0?0:o);a<o;)r[a]=t(s,s=e[++a]);return function(i){var h=Math.max(0,Math.min(o-1,Math.floor(i*=o)));return r[h](i-h)}}function me(){var t=0,e=.5,a=1,o=1,s,r,i,h,u,b=Ft,d,g=!1,c;function f(n){return isNaN(n=+n)?c:(n=.5+((n=+d(n))-r)*(o*n<o*r?h:u),b(g?Math.max(0,Math.min(1,n)):n))}f.domain=function(n){return arguments.length?([t,e,a]=n,s=d(t=+t),r=d(e=+e),i=d(a=+a),h=s===r?0:.5/(r-s),u=r===i?0:.5/(i-r),o=r<s?-1:1,f):[t,e,a]},f.clamp=function(n){return arguments.length?(g=!!n,f):g},f.interpolator=function(n){return arguments.length?(b=n,f):b};function l(n){return function(x){var y,p,m;return arguments.length?([y,p,m]=x,b=ge(n,[y,p,m]),f):[b(0),b(.5),b(1)]}}return f.range=l(zt),f.rangeRound=l(te),f.unknown=function(n){return arguments.length?(c=n,f):c},function(n){return d=n,s=n(t),r=n(e),i=n(a),h=s===r?0:.5/(r-s),u=r===i?0:.5/(i-r),o=r<s?-1:1,f}}function It(){var t=Xt(me()(Ft));return t.copy=function(){return ee(t,It())},Qt.apply(t,arguments)}const vt={draw(t,e){const a=K(e/ie);t.moveTo(a,0),t.arc(0,0,a,0,oe)}},fe={draw(t,e){const a=K(e/5)/2;t.moveTo(-3*a,-a),t.lineTo(-a,-a),t.lineTo(-a,-3*a),t.lineTo(a,-3*a),t.lineTo(a,-a),t.lineTo(3*a,-a),t.lineTo(3*a,a),t.lineTo(a,a),t.lineTo(a,3*a),t.lineTo(-a,3*a),t.lineTo(-a,a),t.lineTo(-3*a,a),t.closePath()}},ue={draw(t,e){const a=K(e),o=-a/2;t.rect(o,o,a,a)}},ut=K(3),ye={draw(t,e){const a=-K(e/(ut*3));t.moveTo(0,a*2),t.lineTo(-ut*a,-a),t.lineTo(ut*a,-a),t.closePath()}};function _t(t,e){let a=null,o=re(s);t=typeof t=="function"?t:at(t||vt),e=typeof e=="function"?e:at(e===void 0?64:+e);function s(){let r;if(a||(a=r=o()),t.apply(this,arguments).draw(a,+e.apply(this,arguments)),r)return a=null,r+""||null}return s.type=function(r){return arguments.length?(t=typeof r=="function"?r:at(r),s):t},s.size=function(r){return arguments.length?(e=typeof r=="function"?r:at(+r),s):e},s.context=function(r){return arguments.length?(a=r??null,s):a},s}function xe(t,e){if((o=t.length)>0){for(var a,o,s=0,r=t[0].length,i;s<r;++s){for(i=a=0;a<o;++a)i+=t[a][s][1]||0;if(i)for(a=0;a<o;++a)t[a][s][1]/=i}de(t,e)}}function z(t){let e=t;return()=>(e=e*1664525+1013904223&4294967295,(e>>>0)/4294967295)}function G(t){return()=>{const e=Math.max(1e-10,t()),a=t();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*a)}}const Wt=(()=>{const t=z(42),e=G(t),a=[{name:"setosa",mx:5,sx:.35,my:1.5,sy:.18},{name:"versicolor",mx:5.9,sx:.52,my:4.3,sy:.47},{name:"virginica",mx:6.6,sx:.63,my:5.5,sy:.55}],o=[];return a.forEach(s=>{for(let r=0;r<20;r++)o.push({x:s.mx+s.sx*e(),y:s.my+s.sy*e(),sp:s.name})}),o})(),be=(()=>{const t=z(100);return["Control","Trt-A","Trt-B","Trt-C","Trt-D"].map(a=>({cat:a,values:[{grp:"Week 1",mean:25+t()*25,se:2+t()*4},{grp:"Week 8",mean:40+t()*40,se:3+t()*6}]}))})(),V=(()=>{const t=z(200),e=["W0","W1","W2","W3","W4"];return[{grp:"Control",color:"#7EC8E3",base:30,slope:2},{grp:"Low Dose",color:"#F0B27A",base:30,slope:9},{grp:"High Dose",color:"#95D5B2",base:30,slope:15}].map(a=>({grp:a.grp,color:a.color,pts:e.map((o,s)=>({w:o,val:a.base+a.slope*s+(t()-.5)*10}))}))})(),St=(()=>{const t=z(300),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(a=>({name:a.name,pts:Array.from({length:30},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),rt=(()=>{const t=z(400),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(a=>({name:a.name,pts:Array.from({length:50},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),ot=(()=>{const t=z(500),e=G(t),a=[];for(let o=0;o<120;o++)a.push(30+8*e());for(let o=0;o<80;o++)a.push(65+10*e());return a})(),yt=(()=>{const t=z(600),e=G(t);return[{grp:"Control",color:"#7EC8E3",mu:30,sigma:6},{grp:"Low Dose",color:"#F0B27A",mu:48,sigma:9},{grp:"High Dose",color:"#95D5B2",mu:62,sigma:7}].map(a=>({grp:a.grp,color:a.color,pts:Array.from({length:80},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),it=(()=>{const t=z(700),e=["BRCA1","TP53","MYC","EGFR","VEGF","CDK4"],a=["Ctrl","Trt-1h","Trt-6h","Trt-24h","Recover"];return e.map((o,s)=>({gene:o,values:a.map((r,i)=>({cond:r,val:(t()-.5)*4+Math.sin(s*1.1+i*.7)*1.5}))}))})(),nt=(()=>{const t=z(800);return["Control","Group A","Group B","Group C","Group D","Group E"].map(a=>{const o=8+Math.floor(t()*12),s=20+t()*60,r=5+t()*15,i=r/Math.sqrt(o);return{grp:a,mean:s,se:i,sd:r,ci95:i*1.96}})})(),ve=(()=>{const t=z(900);return["BRCA2","KRAS","PIK3CA","APC","PTEN","RB1","SMAD4","VHL"].map(a=>({gene:a,val:(t()-.4)*6}))})(),lt=(()=>{const t=z(1e3),e=G(t);return["Week 0","Week 4","Week 8","Week 12"].map((a,o)=>({tp:a,pts:Array.from({length:50},()=>Math.max(0,30+o*12+(5+o*2)*e()))}))})(),xt={setosa:"#7EC8E3",versicolor:"#F0B27A",virginica:"#95D5B2"},st=["#7EC8E3","#F0B27A"],qt=["#7EC8E3","#F0B27A","#95D5B2"],kt="#0f1117",Z=[{id:"scatter",name:"散点图",en:"Scatter Plot",tags:["连续 × 连续","相关分析"],desc:"展示两连续变量关系，支持分组着色、回归线",info:"Iris 数据集 · 60 个观测点 · 3 物种"},{id:"bar",name:"柱状图",en:"Bar Chart",tags:["分类 × 连续","组间比较"],desc:"比较不同类别的数值，支持分组/堆叠/百分比",info:"5 个处理组 · 2 个时间点 · 模拟实验数据"},{id:"line",name:"折线图",en:"Line Chart",tags:["时间序列","趋势分析"],desc:"展示随时间变化的趋势，支持面积填充",info:"5 个时间点 · 3 个治疗组 · 纵向研究数据"},{id:"boxplot",name:"箱线图",en:"Box Plot",tags:["分类 × 连续","分布比较"],desc:"展示分布中位数、四分位和异常值",info:"3 组 · 每组 30 个观测值 · 模拟临床数据"},{id:"violin",name:"小提琴图",en:"Violin Plot",tags:["分类 × 连续","分布形态"],desc:"核密度估计展示完整分布形状，比箱线图信息更丰富",info:"3 组 · 每组 50 个观测值 · 模拟临床数据"},{id:"histogram",name:"直方图",en:"Histogram",tags:["单变量","频率分布"],desc:"展示单个连续变量的频率分布，揭示数据偏斜与双峰",info:"200 个观测值 · 双峰分布 · 模拟生物学数据"},{id:"density",name:"密度图",en:"Density Plot",tags:["分布对比","多组叠加"],desc:"核密度估计平滑展示分布，多组重叠对比时优于直方图",info:"3 组 · 每组 80 个观测值 · 模拟测量数据"},{id:"heatmap",name:"热力图",en:"Heatmap",tags:["矩阵数据","表达量"],desc:"用颜色编码矩阵数值，常用于基因表达和相关性矩阵",info:"6 基因 × 5 条件 · 模拟转录组数据"},{id:"area",name:"面积图",en:"Area Chart",tags:["时间序列","组成变化"],desc:"展示随时间变化的组成比例，堆叠面积突出总量变化",info:"5 个时间点 · 3 个处理组 · 比例数据"},{id:"errorbar",name:"误差线图",en:"Error Bar",tags:["均值 ± 误差","统计推断"],desc:"展示均值与不确定性（SE/SD/CI），科研报告标配",info:"6 个处理组 · 模拟实验重复数据"},{id:"lollipop",name:"棒棒糖图",en:"Lollipop",tags:["排名比较","简洁柱状"],desc:"比柱状图更简洁，适合展示排名和单值比较",info:"8 个基因 · 差异表达量 · 模拟 RNA-seq"},{id:"ridgeline",name:"山脊图",en:"Ridgeline",tags:["多组分布","时序演变"],desc:"纵向堆叠的密度图，优雅展示多组分布的变化趋势",info:"4 个时间点 · 每时间点 50 个观测值"}],we={scatter:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
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
</svg>`},Ct={scatter:{size:3,alpha:.7,jitter:"none",regression:!1,shape:"circle"},bar:{arrangement:"grouped",barWidth:.7,errorBars:!1},line:{lineType:"solid",lineWidth:1.5,showPoints:!0,smooth:!1,fillArea:!1},boxplot:{boxWidth:.6,showOutliers:!0,fillAlpha:.7,notch:!1,showMean:!0,whisker:"iqr"},violin:{bw:.5,fillAlpha:.7,showBoxplot:!0,halfViolin:"full"},histogram:{bins:20,fillAlpha:.8,densityOverlay:!1},density:{bw:1,fillAlpha:.25,showRug:!1},heatmap:{colorScheme:"rdbu",showValues:!0},area:{arrangement:"stacked",fillAlpha:.65,showLines:!0},errorbar:{errorType:"se",capWidth:.2,lineWidth:1.5,dotSize:5},lollipop:{dotSize:8,lineWidth:1.2,sortBy:"none",horizontal:!1},ridgeline:{overlap:.7,fillAlpha:.7,bw:1}};let w={currentChart:"scatter",params:JSON.parse(JSON.stringify(Ct)),editor:null,copyBtn:null,cleanups:[]};function $(t){t.select(".domain").attr("stroke","#424245"),t.selectAll(".tick line").attr("stroke","#424245"),t.selectAll("text").attr("fill","#a1a1a6").style("font-size","11px")}function W(t){t.select(".domain").remove(),t.selectAll(".tick line").attr("stroke","rgba(255,255,255,0.05)"),t.selectAll("text").remove()}function A(t,e,a,o,s){a?t.append("text").attr("transform","rotate(-90)").attr("x",-s/2).attr("y",-48).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e):t.append("text").attr("x",o/2).attr("y",s+46).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e)}function gt(t){return e=>Math.exp(-.5*(e/t)**2)/(t*Math.sqrt(2*Math.PI))}function mt(t,e,a){return a.map(o=>({x:o,y:dt(t,s=>e(o-s))}))}function F(t,e,a,o){At(t).selectAll("*").remove();const s=At(t).append("svg").attr("viewBox",`0 0 ${e} ${a}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("display","block");s.append("rect").attr("width",e).attr("height",a).attr("fill",kt).attr("rx",12);const r=s.append("g").attr("transform",`translate(${o.left},${o.top})`),i=e-o.left-o.right,h=a-o.top-o.bottom;return{svg:s,g:r,iW:i,iH:h}}function ke(t,e){const s={top:25,right:115,bottom:55,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=L().domain([3.8,8.2]).range([0,i]),b=L().domain([.5,8]).range([h,0]);r.append("g").call(E(b).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(u).ticks(6)).call($),r.append("g").call(E(b).ticks(5)).call($),A(r,"Sepal.Length (cm)",!1,i,h),A(r,"Petal.Length (cm)",!0,i,h),e.regression&&Object.entries(xt).forEach(([x,y])=>{const p=Wt.filter(C=>C.sp===x),m=dt(p,C=>C.x),v=dt(p,C=>C.y),k=bt(p,C=>(C.x-m)*(C.y-v))/bt(p,C=>(C.x-m)**2),P=v-k*m,j=D(p,C=>C.x)-.1,q=B(p,C=>C.x)+.1;r.append("line").attr("x1",u(j)).attr("y1",b(k*j+P)).attr("x2",u(q)).attr("y2",b(k*q+P)).attr("stroke",y).attr("stroke-width",1.5).attr("stroke-dasharray","6,4").attr("opacity",.7)});const d=z(999),g=e.jitter==="light"?.12:e.jitter==="heavy"?.28:0,f={circle:vt,triangle:ye,square:ue,cross:fe}[e.shape]||vt,l=(e.size+2)**2*6;Wt.forEach(x=>{const y=g>0?(d()-.5)*g:0,p=g>0?(d()-.5)*g:0;r.append("path").attr("d",_t().type(f).size(l)()).attr("transform",`translate(${u(x.x+y)},${b(x.y+p)})`).attr("fill",xt[x.sp]).attr("opacity",e.alpha).attr("stroke","none")});const n=r.append("g").attr("transform",`translate(${i+12},0)`);Object.entries(xt).forEach(([x,y],p)=>{const m=n.append("g").attr("transform",`translate(0,${p*22})`);m.append("path").attr("d",_t().type(f).size(64)()).attr("transform","translate(7,7)").attr("fill",y).attr("opacity",e.alpha),m.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(x)})}function Ce(t,e){const s={top:25,right:115,bottom:60,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=be,b=u.map(f=>f.cat),d=["Week 1","Week 8"],g=R().domain(b).range([0,i]).paddingInner(1-e.barWidth);if(e.arrangement==="grouped"){const f=R().domain(d).range([0,g.bandwidth()]).padding(.08),l=B(u,x=>B(x.values,y=>y.mean+(e.errorBars?y.se:0))),n=L().domain([0,l*1.12]).range([h,0]);r.append("g").call(E(n).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(g)).call($),r.append("g").call(E(n).ticks(5)).call($),A(r,"Mean Value",!0,i,h),u.forEach(x=>{const y=r.append("g").attr("transform",`translate(${g(x.cat)},0)`);x.values.forEach((p,m)=>{if(y.append("rect").attr("x",f(p.grp)).attr("y",n(p.mean)).attr("width",f.bandwidth()).attr("height",h-n(p.mean)).attr("fill",st[m]).attr("rx",3),e.errorBars){const v=f(p.grp)+f.bandwidth()/2;y.append("line").attr("x1",v).attr("x2",v).attr("y1",n(p.mean+p.se)).attr("y2",n(p.mean-p.se)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7),[-p.se,p.se].forEach(k=>{y.append("line").attr("x1",v-4).attr("x2",v+4).attr("y1",n(p.mean+k)).attr("y2",n(p.mean+k)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7)})}})})}else if(e.arrangement==="stacked"){const f=u.map(y=>{const p={cat:y.cat};return y.values.forEach(m=>{p[m.grp]=m.mean}),p}),l=pt().keys(d)(f),n=B(l[l.length-1],y=>y[1]),x=L().domain([0,n*1.1]).range([h,0]);r.append("g").call(E(x).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(g)).call($),r.append("g").call(E(x).ticks(5)).call($),A(r,"Total Value",!0,i,h),l.forEach((y,p)=>{r.selectAll(null).data(y).enter().append("rect").attr("x",m=>g(m.data.cat)).attr("y",m=>x(m[1])).attr("width",g.bandwidth()).attr("height",m=>x(m[0])-x(m[1])).attr("fill",st[p]).attr("rx",p===0?3:0)})}else{const f=u.map(x=>{const y=bt(x.values,m=>m.mean),p={cat:x.cat};return x.values.forEach(m=>{p[m.grp]=m.mean/y*100}),p}),l=pt().keys(d)(f),n=L().domain([0,100]).range([h,0]);r.append("g").call(E(n).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").call(E(n).ticks(5).tickFormat(x=>x+"%")).call($),r.append("g").attr("transform",`translate(0,${h})`).call(_(g)).call($),A(r,"Proportion (%)",!0,i,h),l.forEach((x,y)=>{r.selectAll(null).data(x).enter().append("rect").attr("x",p=>g(p.data.cat)).attr("y",p=>n(p[1])).attr("width",g.bandwidth()).attr("height",p=>n(p[0])-n(p[1])).attr("fill",st[y]).attr("rx",y===0?3:0)})}const c=r.append("g").attr("transform",`translate(${i+12},0)`);d.forEach((f,l)=>{const n=c.append("g").attr("transform",`translate(0,${l*22})`);n.append("rect").attr("width",12).attr("height",12).attr("fill",st[l]).attr("rx",2),n.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(f)})}function Ee(t,e){const s={top:25,right:110,bottom:55,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=["W0","W1","W2","W3","W4"],b=Tt().domain(u).range([0,i]).padding(.2),d=V.flatMap(n=>n.pts.map(x=>x.val)),g=L().domain([D(d)-8,B(d)+8]).range([h,0]);r.append("g").call(E(g).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(b)).call($),r.append("g").call(E(g).ticks(5)).call($),A(r,"Week",!1,i,h),A(r,"Response",!0,i,h);const c={solid:null,dashed:"8,4",dotted:"3,4"},f=e.smooth?Rt:pe;V.forEach(n=>{e.fillArea&&r.append("path").datum(n.pts).attr("d",J().x((y,p)=>b(u[p])).y0(h).y1(y=>g(y.val)).curve(f)).attr("fill",n.color).attr("opacity",.12);const x=r.append("path").datum(n.pts).attr("d",X().x((y,p)=>b(u[p])).y(y=>g(y.val)).curve(f)).attr("fill","none").attr("stroke",n.color).attr("stroke-width",e.lineWidth);c[e.lineType]&&x.attr("stroke-dasharray",c[e.lineType]),e.showPoints&&n.pts.forEach((y,p)=>{r.append("circle").attr("cx",b(u[p])).attr("cy",g(y.val)).attr("r",e.lineWidth+2).attr("fill",n.color).attr("stroke",kt).attr("stroke-width",1.5)})});const l=r.append("g").attr("transform",`translate(${i+12},0)`);V.forEach((n,x)=>{const y=l.append("g").attr("transform",`translate(0,${x*22})`);y.append("line").attr("x1",0).attr("x2",14).attr("y1",7).attr("y2",7).attr("stroke",n.color).attr("stroke-width",e.lineWidth),e.showPoints&&y.append("circle").attr("cx",7).attr("cy",7).attr("r",3).attr("fill",n.color),y.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(n.grp)})}function $e(t,e){const s={top:25,right:30,bottom:50,left:60},{g:r,iW:i,iH:h}=F(t,540,380,s),u=St.map(c=>{const f=[...c.pts].sort((v,k)=>v-k),l=O(f,.25),n=O(f,.5),x=O(f,.75),y=x-l,p=e.whisker==="iqr"?Math.max(D(f),l-1.5*y):D(f),m=e.whisker==="iqr"?Math.min(B(f),x+1.5*y):B(f);return{name:c.name,q1:l,med:n,q3:x,iqr:y,wMin:p,wMax:m,outliers:f.filter(v=>v<p||v>m),mean:dt(f),notchLo:n-1.58*y/Math.sqrt(f.length),notchHi:n+1.58*y/Math.sqrt(f.length)}}),b=u.flatMap(c=>[c.wMin,c.wMax,...e.showOutliers?c.outliers:[]]),d=L().domain([D(b)-5,B(b)+5]).range([h,0]),g=R().domain(St.map(c=>c.name)).range([0,i]).padding(1-e.boxWidth);r.append("g").call(E(d).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(g)).call($),r.append("g").call(E(d).ticks(5)).call($),A(r,"Response Value",!0,i,h),u.forEach((c,f)=>{const l=g(c.name),n=g.bandwidth(),x=l+n/2,y=qt[f];if(r.append("line").attr("x1",x).attr("x2",x).attr("y1",d(c.wMax)).attr("y2",d(c.wMin)).attr("stroke",y).attr("stroke-width",1.5).attr("opacity",.7),[c.wMin,c.wMax].forEach(p=>{r.append("line").attr("x1",x-n*.2).attr("x2",x+n*.2).attr("y1",d(p)).attr("y2",d(p)).attr("stroke",y).attr("stroke-width",1.5)}),e.notch){const p=Math.max(c.q1,c.notchLo),m=Math.min(c.q3,c.notchHi),v=n*.2;r.append("path").attr("d",[`M ${l} ${d(c.q1)}`,`L ${l+n} ${d(c.q1)}`,`L ${l+n} ${d(p)}`,`L ${l+n-v} ${d(c.med)}`,`L ${l+n} ${d(m)}`,`L ${l+n} ${d(c.q3)}`,`L ${l} ${d(c.q3)}`,`L ${l} ${d(m)}`,`L ${l+v} ${d(c.med)}`,`L ${l} ${d(p)}`,"Z"].join(" ")).attr("fill",y).attr("opacity",e.fillAlpha).attr("stroke",y).attr("stroke-width",1.5)}else r.append("rect").attr("x",l).attr("y",d(c.q3)).attr("width",n).attr("height",d(c.q1)-d(c.q3)).attr("fill",y).attr("opacity",e.fillAlpha).attr("stroke",y).attr("stroke-width",1.5).attr("rx",3);if(r.append("line").attr("x1",l).attr("x2",l+n).attr("y1",d(c.med)).attr("y2",d(c.med)).attr("stroke","#fff").attr("stroke-width",2),e.showMean){const m=d(c.mean);r.append("path").attr("d",`M ${x} ${m-5} L ${x+5} ${m} L ${x} ${m+5} L ${x-5} ${m} Z`).attr("fill","#fff").attr("opacity",.9)}e.showOutliers&&c.outliers.forEach(p=>{r.append("circle").attr("cx",x).attr("cy",d(p)).attr("r",3).attr("fill","none").attr("stroke",y).attr("stroke-width",1.5).attr("opacity",.7)})})}function Be(t,e){const s={top:25,right:20,bottom:50,left:60},{g:r,iW:i,iH:h}=F(t,540,380,s),u=rt.flatMap(m=>m.pts),b=D(u)-5,d=B(u)+5,g=ht(b,d,(d-b)/80),c=gt(e.bw*10),f=R().domain(rt.map(m=>m.name)).range([0,i]).padding(.3),l=L().domain([b,d]).range([h,0]),n=f.bandwidth()/2,x=rt.map(m=>mt(m.pts,c,g)),y=B(x,m=>B(m,v=>v.y)),p=L().domain([0,y]).range([0,n*.92]);r.append("g").call(E(l).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(f)).call($),r.append("g").call(E(l).ticks(5)).call($),A(r,"Response Value",!0,i,h),rt.forEach((m,v)=>{const k=f(m.name)+n,P=qt[v],j=x[v],q=J().x0(C=>k-(e.halfViolin!=="right"?p(C.y):0)).x1(C=>k+(e.halfViolin!=="left"?p(C.y):0)).y(C=>l(C.x)).curve(Rt);if(r.append("path").datum(j).attr("d",q).attr("fill",P).attr("opacity",e.fillAlpha).attr("stroke",P).attr("stroke-width",1.5),e.showBoxplot){const C=[...m.pts].sort((Nt,Yt)=>Nt-Yt),I=O(C,.25),T=O(C,.5),Q=O(C,.75),Et=Q-I,Ot=Math.max(D(C),I-1.5*Et),Gt=Math.min(B(C),Q+1.5*Et),tt=n*.22;r.append("line").attr("x1",k).attr("x2",k).attr("y1",l(Ot)).attr("y2",l(Gt)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.8),r.append("rect").attr("x",k-tt).attr("y",l(Q)).attr("width",tt*2).attr("height",l(I)-l(Q)).attr("fill","#111318").attr("stroke","#fff").attr("stroke-width",1.5).attr("rx",2),r.append("line").attr("x1",k-tt).attr("x2",k+tt).attr("y1",l(T)).attr("y2",l(T)).attr("stroke","#fff").attr("stroke-width",2.5)}})}function Ae(t,e){const s={top:25,right:30,bottom:55,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=D(ot)-2,b=B(ot)+2,d=L().domain([u,b]).range([0,i]),g=ae().domain([u,b]).thresholds(e.bins)(ot),c=B(g,l=>l.length),f=L().domain([0,c*1.12]).range([h,0]);if(r.append("g").call(E(f).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(d).ticks(8)).call($),r.append("g").call(E(f).ticks(5)).call($),A(r,"Value",!1,i,h),A(r,"Count",!0,i,h),r.selectAll(".p7-hbar").data(g).enter().append("rect").attr("class","p7-hbar").attr("x",l=>d(l.x0)+1).attr("y",l=>f(l.length)).attr("width",l=>Math.max(0,d(l.x1)-d(l.x0)-1)).attr("height",l=>h-f(l.length)).attr("fill","#7EC8E3").attr("opacity",e.fillAlpha).attr("rx",2),e.densityOverlay){const l=gt(3.2),n=ht(u,b,(b-u)/100),x=mt(ot,l,n),y=B(x,m=>m.y),p=c/y;r.append("path").datum(x).attr("d",X().x(m=>d(m.x)).y(m=>f(m.y*p)).curve(Y)).attr("fill","none").attr("stroke","#F0B27A").attr("stroke-width",2.5).attr("opacity",.9),r.append("text").attr("x",i-4).attr("y",14).attr("fill","#F0B27A").style("font-size","10px").attr("text-anchor","end").text("密度曲线")}}function Le(t,e){const s={top:25,right:105,bottom:55,left:60},{g:r,iW:i,iH:h}=F(t,540,380,s),u=yt.flatMap(p=>p.pts),b=D(u)-5,d=B(u)+5,g=L().domain([b,d]).range([0,i]),c=gt(e.bw*5),f=ht(b,d,(d-b)/100),l=yt.map(p=>({...p,kde:mt(p.pts,c,f)})),n=B(l,p=>B(p.kde,m=>m.y)),x=L().domain([0,n*1.12]).range([h,0]);r.append("g").call(E(x).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(g).ticks(6)).call($),r.append("g").call(E(x).ticks(4).tickFormat(wt(".3f"))).call($),A(r,"Value",!1,i,h),A(r,"Density",!0,i,h),l.forEach(p=>{r.append("path").datum(p.kde).attr("d",J().x(m=>g(m.x)).y0(h).y1(m=>x(m.y)).curve(Y)).attr("fill",p.color).attr("opacity",e.fillAlpha),r.append("path").datum(p.kde).attr("d",X().x(m=>g(m.x)).y(m=>x(m.y)).curve(Y)).attr("fill","none").attr("stroke",p.color).attr("stroke-width",2),e.showRug&&p.pts.forEach(m=>{r.append("line").attr("x1",g(m)).attr("x2",g(m)).attr("y1",h).attr("y2",h-6).attr("stroke",p.color).attr("opacity",.4)})});const y=r.append("g").attr("transform",`translate(${i+12},0)`);yt.forEach((p,m)=>{const v=y.append("g").attr("transform",`translate(0,${m*22})`);v.append("rect").attr("width",12).attr("height",3).attr("y",5).attr("fill",p.color).attr("rx",1),v.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(p.grp)})}function Me(t,e){const s={top:20,right:80,bottom:60,left:70},{g:r,iW:i,iH:h}=F(t,540,380,s),u=it.map(v=>v.gene),b=it[0].values.map(v=>v.cond),d=R().domain(b).range([0,i]).padding(.04),g=R().domain(u).range([0,h]).padding(.04),c=it.flatMap(v=>v.values.map(k=>k.val)),f=B(c.map(Math.abs)),l={rdbu:It(ce).domain([f,0,-f]),viridis:Lt(se).domain([-f,f]),plasma:Lt(le).domain([-f,f])},n=l[e.colorScheme]||l.rdbu;r.append("g").attr("transform",`translate(0,${h})`).call(_(d)).call(v=>{v.select(".domain").attr("stroke","#424245"),v.selectAll(".tick line").remove(),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px")}),r.append("g").call(E(g)).call(v=>{v.select(".domain").attr("stroke","#424245"),v.selectAll(".tick line").remove(),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),it.forEach(v=>{v.values.forEach(k=>{r.append("rect").attr("x",d(k.cond)).attr("y",g(v.gene)).attr("width",d.bandwidth()).attr("height",g.bandwidth()).attr("fill",n(k.val)).attr("rx",3),e.showValues&&r.append("text").attr("x",d(k.cond)+d.bandwidth()/2).attr("y",g(v.gene)+g.bandwidth()/2+4).attr("text-anchor","middle").attr("fill",Math.abs(k.val)>f*.5?"#fff":"#444").style("font-size","9px").style("font-family","monospace").text(k.val.toFixed(1))})});const x=h,y=14,p=r.append("defs").append("linearGradient").attr("id","p7-hm-grad").attr("x1",0).attr("y1",1).attr("x2",0).attr("y2",0);[0,.25,.5,.75,1].forEach(v=>{p.append("stop").attr("offset",`${v*100}%`).attr("stop-color",n(-f+v*2*f))}),r.append("rect").attr("x",i+20).attr("y",0).attr("width",y).attr("height",x).attr("fill","url(#p7-hm-grad)").attr("rx",3);const m=L().domain([-f,f]).range([x,0]);r.append("g").attr("transform",`translate(${i+20+y},0)`).call(ne(m).ticks(4).tickFormat(wt(".1f"))).call(v=>{v.select(".domain").remove(),v.selectAll(".tick line").attr("stroke","#424245"),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","9px")})}function _e(t,e){const s={top:25,right:110,bottom:55,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=["W0","W1","W2","W3","W4"],b=Tt().domain(u).range([0,i]).padding(.2),d=u.map((y,p)=>{const m={w:y};return V.forEach(v=>{m[v.grp]=v.pts[p].val}),m}),g=V.map(y=>y.grp),c=V.map(y=>y.color),f=(y,p)=>J().x((m,v)=>b(u[v])).y0(m=>p(m[0])).y1(m=>p(m[1])).curve(Mt),l=(y,p)=>X().x((m,v)=>b(u[v])).y(m=>p(m[1])).curve(Mt);let n;if(e.arrangement==="proportional"){const y=pt().keys(g).offset(xe)(d);n=L().domain([0,1]).range([h,0]),r.append("g").call(E(n).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(b)).call($),r.append("g").call(E(n).ticks(5).tickFormat(wt(".0%"))).call($),A(r,"Week",!1,i,h),A(r,"Proportion",!0,i,h),y.forEach((p,m)=>{r.append("path").datum(p).attr("d",f(p,n)).attr("fill",c[m]).attr("opacity",e.fillAlpha),e.showLines&&r.append("path").datum(p).attr("d",l(p,n)).attr("fill","none").attr("stroke",c[m]).attr("stroke-width",1.5).attr("opacity",.8)})}else{const y=pt().keys(g)(d),p=B(y[y.length-1],m=>m[1]);n=L().domain([0,p*1.05]).range([h,0]),r.append("g").call(E(n).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(b)).call($),r.append("g").call(E(n).ticks(5)).call($),A(r,"Week",!1,i,h),A(r,"Response",!0,i,h),y.forEach((m,v)=>{r.append("path").datum(m).attr("d",f(m,n)).attr("fill",c[v]).attr("opacity",e.fillAlpha),e.showLines&&r.append("path").datum(m).attr("d",l(m,n)).attr("fill","none").attr("stroke",c[v]).attr("stroke-width",1.5).attr("opacity",.8)})}const x=r.append("g").attr("transform",`translate(${i+12},0)`);V.forEach((y,p)=>{const m=x.append("g").attr("transform",`translate(0,${p*22})`);m.append("rect").attr("width",12).attr("height",12).attr("fill",y.color).attr("opacity",e.fillAlpha).attr("rx",2),m.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(y.grp)})}function We(t,e){const s={top:25,right:30,bottom:65,left:55},{g:r,iW:i,iH:h}=F(t,540,380,s),u=e.errorType==="se"?"se":e.errorType==="sd"?"sd":"ci95",b=B(nt,l=>l.mean+l[u]),d=Math.max(0,D(nt,l=>l.mean-l[u])),g=R().domain(nt.map(l=>l.grp)).range([0,i]).padding(.5),c=L().domain([d*.85,b*1.15]).range([h,0]);r.append("g").call(E(c).ticks(5).tickSize(-i).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${h})`).call(_(g)).call($).selectAll("text").attr("transform","rotate(-30)").attr("text-anchor","end").attr("dy","0.4em"),r.append("g").call(E(c).ticks(5)).call($),A(r,"Mean Value",!0,i,h),nt.forEach((l,n)=>{const x=g(l.grp)+g.bandwidth()/2,y=l[u],p=n<3?"#7EC8E3":"#F0B27A",m=e.capWidth*g.bandwidth();r.append("line").attr("x1",x).attr("x2",x).attr("y1",c(l.mean+y)).attr("y2",c(l.mean-y)).attr("stroke",p).attr("stroke-width",e.lineWidth),[-y,y].forEach(v=>{r.append("line").attr("x1",x-m).attr("x2",x+m).attr("y1",c(l.mean+v)).attr("y2",c(l.mean+v)).attr("stroke",p).attr("stroke-width",e.lineWidth)}),r.append("circle").attr("cx",x).attr("cy",c(l.mean)).attr("r",e.dotSize/2).attr("fill",p).attr("stroke",kt).attr("stroke-width",1.5)});const f={se:"Error bars: ±SE",sd:"Error bars: ±SD",ci95:"Error bars: 95% CI"};r.append("text").attr("x",i).attr("y",14).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").text(f[e.errorType])}function Se(t,e){const a=e.horizontal?55:100,o=540,s=380,r={top:25,right:30,bottom:a,left:e.horizontal?80:55},{g:i,iW:h,iH:u}=F(t,o,s,r);let b=[...ve];e.sortBy==="asc"&&b.sort((g,c)=>g.val-c.val),e.sortBy==="desc"&&b.sort((g,c)=>c.val-g.val);const d=B(b,g=>Math.abs(g.val))*1.15;if(e.horizontal){const g=R().domain(b.map(l=>l.gene)).range([0,u]).padding(.4),c=L().domain([-d,d]).range([0,h]),f=c(0);i.append("g").call(E(g).ticks(0).tickSize(-h).tickFormat("")).call(W),i.append("g").call(_(c).ticks(5).tickSize(-u).tickFormat("")).call(W),i.append("g").call(E(g)).call(l=>{l.select(".domain").attr("stroke","#424245"),l.selectAll(".tick line").remove(),l.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),i.append("g").attr("transform",`translate(0,${u})`).call(_(c).ticks(5)).call($),i.append("line").attr("x1",f).attr("x2",f).attr("y1",0).attr("y2",u).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(i,"log2 Fold Change",!1,h,u),b.forEach(l=>{const n=g(l.gene)+g.bandwidth()/2,x=l.val>0?"#F0B27A":"#7EC8E3";i.append("line").attr("x1",f).attr("x2",c(l.val)).attr("y1",n).attr("y2",n).attr("stroke",x).attr("stroke-width",e.lineWidth).attr("opacity",.7),i.append("circle").attr("cx",c(l.val)).attr("cy",n).attr("r",e.dotSize/2).attr("fill",x)})}else{const g=R().domain(b.map(l=>l.gene)).range([0,h]).padding(.4),c=L().domain([-d,d]).range([u,0]),f=c(0);i.append("g").call(E(c).ticks(5).tickSize(-h).tickFormat("")).call(W),i.append("g").attr("transform",`translate(0,${u})`).call(_(g)).call($).selectAll("text").attr("transform","rotate(-35)").attr("text-anchor","end").attr("dy","0.4em").attr("font-style","italic"),i.append("g").call(E(c).ticks(5)).call($),i.append("line").attr("x1",0).attr("x2",h).attr("y1",f).attr("y2",f).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(i,"Gene",!1,h,u),A(i,"log2 FC",!0,h,u),b.forEach(l=>{const n=g(l.gene)+g.bandwidth()/2,x=l.val>0?"#F0B27A":"#7EC8E3";i.append("line").attr("x1",n).attr("x2",n).attr("y1",f).attr("y2",c(l.val)).attr("stroke",x).attr("stroke-width",e.lineWidth).attr("opacity",.7),i.append("circle").attr("cx",n).attr("cy",c(l.val)).attr("r",e.dotSize/2).attr("fill",x)})}}function De(t,e){const s={top:30,right:20,bottom:50,left:90},{g:r,iW:i,iH:h}=F(t,540,380,s),u=lt.flatMap(v=>v.pts),b=D(u)-5,d=B(u)+5,g=L().domain([b,d]).range([0,i]),c=gt(e.bw*5),f=ht(b,d,(d-b)/100),l=lt.length,n=h/(l+.5),x=lt.map(v=>mt(v.pts,c,f)),y=B(x,v=>B(v,k=>k.y)),p=n*(1+e.overlap),m=["#7EC8E3","#F0B27A","#95D5B2","#B8B8E8"];r.append("g").attr("transform",`translate(0,${h})`).call(_(g).ticks(6)).call($),A(r,"Value",!1,i,h),lt.forEach((v,k)=>{const P=x[k],j=h-k*n,q=m[k%m.length],C=L().domain([0,y]).range([0,-p]),I=r.append("g").attr("transform",`translate(0,${j})`);I.append("path").datum(P).attr("d",J().x(T=>g(T.x)).y0(0).y1(T=>C(T.y)).curve(Y)).attr("fill",q).attr("opacity",e.fillAlpha),I.append("line").attr("x1",0).attr("x2",i).attr("y1",0).attr("y2",0).attr("stroke","rgba(255,255,255,0.1)").attr("stroke-width",1),I.append("path").datum(P).attr("d",X().x(T=>g(T.x)).y(T=>C(T.y)).curve(Y)).attr("fill","none").attr("stroke",q).attr("stroke-width",2),I.append("text").attr("x",-8).attr("y",0).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").attr("dominant-baseline","middle").text(v.tp)})}const ze={scatter:ke,bar:Ce,line:Ee,boxplot:$e,violin:Be,histogram:Ae,density:Le,heatmap:Me,area:_e,errorbar:We,lollipop:Se,ridgeline:De},Fe={circle:"16",triangle:"17",square:"15",cross:"3"},Te={solid:'"solid"',dashed:'"dashed"',dotted:'"dotted"'};function Re(t){const e=t.jitter!=="none"?`    position = position_jitter(
      width = ${t.jitter==="light"?.1:.25},
      height = ${t.jitter==="light"?.1:.25}
    ),
`:"",a=t.regression?`  geom_smooth(
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
    shape = ${Fe[t.shape]||"16"},
${e}  ) +
${a}  scale_color_manual(values = c(
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
  )`}function He(t){const e={grouped:"position_dodge(0.8)",stacked:"position_stack()",filled:"position_fill()"},a=t.errorBars?`  geom_errorbar(
    aes(ymin = mean - se, ymax = mean + se),
    position = position_dodge(0.8),
    width = 0.2
  ) +
`:"",o=t.arrangement==="filled"?"Proportion":"Mean Value",s={grouped:"分组柱状图",stacked:"堆叠柱状图",filled:"百分比堆叠图"};return`library(ggplot2)

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
${a}  scale_fill_manual(values = c(
    "Week 1" = "#7EC8E3",
    "Week 8" = "#F0B27A"
  )) +
  labs(
    x     = "Treatment",
    y     = "${o}",
    fill  = "Time Point",
    title = "${s[t.arrangement]}"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    legend.position    = "right"
  )`}function Pe(t){const e=t.fillArea?`  geom_area(alpha = 0.12, position = "identity") +
`:"",a=t.showPoints?`  geom_point(size = ${t.lineWidth+1}) +
`:"",o=t.smooth?`  # 平滑插值：geom_smooth(se = FALSE, method = "loess") 可替代 geom_line
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
    linetype  = ${Te[t.lineType]||'"solid"'}
  ) +
${a}${o}  scale_color_manual(values = c(
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
  )`}function Ie(t){const e=t.whisker==="iqr"?`    # 须线默认 1.5×IQR
`:`    coef = 0,     # 须线延伸到最值
`,a=t.notch?`    notch = TRUE,
`:"",o=t.showOutliers?`    outlier.shape = 1, outlier.alpha = 0.5,
`:`    outlier.shape = NA,
`,s=t.showMean?`  stat_summary(
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
${a}${o}${e}    width     = ${t.boxWidth},
    alpha     = ${t.fillAlpha},
    linewidth = 0.6
  ) +
${s}  scale_fill_manual(values = c(
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
  )`}function qe(t){const e=t.showBoxplot?`  geom_boxplot(
    width = 0.12, fill = "white",
    outlier.shape = NA, linewidth = 0.6
  ) +
`:"",a=t.halfViolin!=="full"?`  # 半小提琴图可用：ggdist::stat_halfeye(side = "${t.halfViolin}")
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
${e}${a}  scale_fill_manual(values = c(
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
  )`}function Ve(t){const e=t.densityOverlay?`  geom_density(
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
  theme(panel.grid.minor = element_blank())`}function je(t){const e=t.showRug?`  geom_rug(alpha = 0.3, sides = "b") +
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
  theme_minimal(base_size = 13)`}function Oe(t){const e={rdbu:`scale_fill_gradient2(
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
  )`}function Ge(t){const e={stacked:"position_stack()",proportional:"position_fill()"},a=t.arrangement==="proportional"?"Proportion":"Response",o=t.arrangement==="proportional"?`
  scale_y_continuous(labels = scales::percent) +`:"",s=t.showLines?`  geom_line(
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
${s}  scale_fill_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +${o}
  labs(
    x     = "Week",
    y     = "${a}",
    fill  = "Group",
    title = "${t.arrangement==="proportional"?"比例堆叠面积图":"堆叠面积图"}"
  ) +
  theme_minimal(base_size = 13)`}function Ne(t){const e={se:{ymin:"mean - se",ymax:"mean + se",note:"# se = sd / sqrt(n)"},sd:{ymin:"mean - sd",ymax:"mean + sd",note:"# sd = standard deviation"},ci95:{ymin:"mean - ci95",ymax:"mean + ci95",note:"# ci95 = 1.96 * se"}},a=e[t.errorType]||e.se;return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  group = c("Control","Group A","Group B","Group C","Group D","Group E"),
  mean  = c(24.3, 51.7, 38.2, 67.4, 44.8, 82.1),
  se    = c( 2.8,  4.3,  3.1,  5.6,  3.7,  6.2),
  sd    = c( 8.4, 12.9,  9.3, 16.8, 11.1, 18.6),
  ci95  = c( 5.5,  8.4,  6.1, 11.0,  7.3, 12.2)
)

${a.note}
ggplot(data, aes(x = group, y = mean)) +
  geom_errorbar(
    aes(ymin = ${a.ymin},
        ymax = ${a.ymax}),
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
  )`}function Ye(t){const e=t.sortBy!=="none"?`  dplyr::mutate(gene = reorder(gene, ${t.sortBy==="asc"?"":"-"}log2fc)) |>
`:"",a=t.horizontal?`  coord_flip() +
`:"",o=t.horizontal?"":'angle = 35, hjust = 1, face = "italic"';return`library(ggplot2)
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
${a}  geom_hline(yintercept = 0, linetype = "dashed",
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
    axis.text.x = element_text(${o})
  )`}function Ze(t){return`library(ggplot2)
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
  theme(legend.position = "none")`}const Vt={scatter:Re,bar:He,line:Pe,boxplot:Ie,violin:qe,histogram:Ve,density:je,heatmap:Oe,area:Ge,errorbar:Ne,lollipop:Ye,ridgeline:Ze};function S(t,e){return`<button class="p7-toggle${t?" p7-toggle--on":""}" data-toggle="${e}">
    <span class="p7-tog-track"><span class="p7-tog-thumb"></span></span>
    <span class="p7-tog-lbl">${t?"开启":"关闭"}</span>
  </button>`}function H(t,e,a){return`<div class="p7-opt-row">${t.map(o=>`<button class="p7-opt-btn${o.val===e?" active":""}" data-group="${a}" data-val="${o.val}">${o.label}</button>`).join("")}</div>`}function M(t,e,a,o,s){return`<div class="p7-ctrl-hdr">
    <span class="p7-ctrl-lbl">${{size:"点大小",alpha:"透明度",barWidth:"柱宽",lineWidth:"线宽",boxWidth:"箱宽",fillAlpha:"填充透明度",bw:"带宽",bins:"分箱数",capWidth:"线帽宽度",dotSize:"点大小",overlap:"重叠度"}[t]}</span>
    <span class="p7-ctrl-val" id="p7-val-${t}">${s}</span>
  </div>
  <input class="p7-slider" type="range" data-param="${t}"
    min="${e}" max="${a}" step="${o}" value="${s}">`}function Ue(t){return`
    <div class="p7-ctrl-group">${M("size",1,8,1,t.size)}</div>
    <div class="p7-ctrl-group">${M("alpha",.1,1,.1,t.alpha)}</div>
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
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Ke(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排列方式</span>
      ${H([{val:"grouped",label:"分组"},{val:"stacked",label:"堆叠"},{val:"filled",label:"百分比"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${M("barWidth",.3,.9,.05,t.barWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差线</span>
      ${S(t.errorBars,"errorBars")}
      <div class="p7-ctrl-note">分组模式下可见误差线</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Je(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">线型</span>
      ${H([{val:"solid",label:"实线"},{val:"dashed",label:"虚线"},{val:"dotted",label:"点线"}],t.lineType,"lineType")}
    </div>
    <div class="p7-ctrl-group">${M("lineWidth",.5,3,.25,t.lineWidth)}</div>
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
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Xe(t){return`
    <div class="p7-ctrl-group">${M("boxWidth",.3,.9,.05,t.boxWidth)}</div>
    <div class="p7-ctrl-group">${M("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
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
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function Qe(t){return`
    <div class="p7-ctrl-group">${M("bw",.2,2,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${M("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">嵌套箱线图</span>
      ${S(t.showBoxplot,"showBoxplot")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">展示方向</span>
      ${H([{val:"full",label:"完整"},{val:"left",label:"左半"},{val:"right",label:"右半"}],t.halfViolin,"halfViolin")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ta(t){return`
    <div class="p7-ctrl-group">${M("bins",5,50,1,t.bins)}</div>
    <div class="p7-ctrl-group">${M("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">叠加密度曲线</span>
      ${S(t.densityOverlay,"densityOverlay")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ea(t){return`
    <div class="p7-ctrl-group">${M("bw",.5,5,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${M("fillAlpha",0,.6,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据地毯</span>
      ${S(t.showRug,"showRug")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function aa(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">颜色映射方案</span>
      ${H([{val:"rdbu",label:"红蓝"},{val:"viridis",label:"Viridis"},{val:"plasma",label:"Plasma"}],t.colorScheme,"colorScheme")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数值标签</span>
      ${S(t.showValues,"showValues")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ra(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">堆叠方式</span>
      ${H([{val:"stacked",label:"绝对堆叠"},{val:"proportional",label:"比例填充"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${M("fillAlpha",.2,.95,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示边界线</span>
      ${S(t.showLines,"showLines")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function oa(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差类型</span>
      ${H([{val:"se",label:"SE"},{val:"sd",label:"SD"},{val:"ci95",label:"95% CI"}],t.errorType,"errorType")}
      <div class="p7-ctrl-note">SE：标准误 · SD：标准差 · CI：置信区间</div>
    </div>
    <div class="p7-ctrl-group">${M("capWidth",.1,.5,.05,t.capWidth)}</div>
    <div class="p7-ctrl-group">${M("lineWidth",.5,2.5,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">${M("dotSize",2,10,1,t.dotSize)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ia(t){return`
    <div class="p7-ctrl-group">${M("dotSize",4,16,1,t.dotSize)}</div>
    <div class="p7-ctrl-group">${M("lineWidth",.5,3,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排序方式</span>
      ${H([{val:"none",label:"原始"},{val:"asc",label:"升序"},{val:"desc",label:"降序"}],t.sortBy,"sortBy")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">水平方向</span>
      ${S(t.horizontal,"horizontal")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function na(t){return`
    <div class="p7-ctrl-group">${M("overlap",.2,1.5,.1,t.overlap)}</div>
    <div class="p7-ctrl-group">${M("fillAlpha",.2,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">${M("bw",.5,5,.1,t.bw)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}const la={scatter:Ue,bar:Ke,line:Je,boxplot:Xe,violin:Qe,histogram:ta,density:ea,heatmap:aa,area:ra,errorbar:oa,lollipop:ia,ridgeline:na};function _a(){const t=`<svg class="p7-chevron" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/></svg>`,e=Z.map(o=>`
    <button class="p7-chart-tab${o.id==="scatter"?" active":""}" data-chart="${o.id}">
      ${o.name}
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
    <div class="hero-quicknav" id="p7-hero-nav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p7-gallery">图表类型库</button>
      <button class="hero-quicknav__item" data-target="#p7-workshop">交互工作坊</button>
    </div>
    <div class="p7-scroll-hint">↓ 向下探索</div>
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
    <div class="p7-chart-grid" id="p7-chart-grid">${Z.map(o=>`
    <div class="p7-chart-card" data-chart="${o.id}" id="p7-card-${o.id}"
         role="button" tabindex="0" aria-label="打开 ${o.name} 工作坊">
      <div class="p7-thumb-wrap">${we[o.id]||""}</div>
      <div class="p7-card-info">
        <div class="p7-card-name">${o.name}</div>
        <div class="p7-card-en">${o.en}</div>
        <div class="p7-card-tags">${o.tags.map(s=>`<span class="p7-tag">${s}</span>`).join("")}</div>
        <div class="p7-card-desc">${o.desc}</div>
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
</div>`}function ct(t){if(!Z.find(o=>o.id===t))return;w.currentChart=t,document.querySelectorAll(".p7-chart-tab").forEach(o=>o.classList.toggle("active",o.dataset.chart===t)),document.querySelectorAll(".p7-chart-card").forEach(o=>o.classList.toggle("active",o.dataset.chart===t));const e=document.getElementById("p7-ws-title"),a=Z.find(o=>o.id===t);e&&a&&(e.textContent=a.name),jt(),U(),ft(),sa()}function jt(){const t=document.getElementById("p7-params-body");if(t&&(t.innerHTML=la[w.currentChart](w.params[w.currentChart]),window.innerWidth<=768)){const e=t.closest(".p7-panel");e&&e.classList.contains("collapsed")&&(t.classList.add("p7-collapsed"),t.classList.remove("p7-expanded"))}}function U(){const t=document.getElementById("p7-d3-container");t&&ze[w.currentChart](t,w.params[w.currentChart])}function ft(){if(!w.editor)return;const t=Vt[w.currentChart](w.params[w.currentChart]);w.editor.setCode(t)}function sa(){const t=document.getElementById("p7-preview-info");if(!t)return;const e=Z.find(a=>a.id===w.currentChart);e&&(t.textContent=e.info)}function Dt(t,e){w.params[w.currentChart][t]=e,U(),ft()}function ca(){w.params[w.currentChart]=JSON.parse(JSON.stringify(Ct[w.currentChart])),jt(),U(),ft()}function pa(){if(window.innerWidth>768)return;[{hdrId:"p7-params-hdr",bodyId:"p7-params-body",expanded:!1},{hdrId:"p7-preview-hdr",bodyId:"p7-preview-body",expanded:!0},{hdrId:"p7-code-hdr",bodyId:"p7-code-body",expanded:!1}].forEach(e=>{const a=document.getElementById(e.bodyId);if(!a)return;e.expanded?a.classList.add("p7-expanded"):(a.classList.add("p7-collapsed"),a.closest(".p7-panel")?.classList.add("collapsed"));const o=document.getElementById(e.hdrId);if(!o)return;const s=()=>{a.classList.contains("p7-expanded")?(a.classList.replace("p7-expanded","p7-collapsed"),o.closest(".p7-panel")?.classList.add("collapsed")):(a.classList.replace("p7-collapsed","p7-expanded"),o.closest(".p7-panel")?.classList.remove("collapsed"))};o.addEventListener("click",s),w.cleanups.push(()=>o.removeEventListener("click",s))})}function da(){const t=et.timeline({delay:.2});t.to("#p7-hero-eyebrow",{opacity:1,y:0,duration:.7,ease:"power3.out"},0),t.fromTo(".p7-hero-title",{y:30},{opacity:1,y:0,duration:.9,ease:"power3.out"},.15),t.fromTo(".p7-hero-sub",{y:20},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo(".p7-hero-tagline",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#p7-hero-nav",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),et.from("#p7-gallery-hdr",{scrollTrigger:{trigger:"#p7-gallery",start:"top 85%"},opacity:0,y:50,duration:.8,ease:"power3.out"}),et.from("#p7-ws-layout",{scrollTrigger:{trigger:"#p7-workshop",start:"top 80%"},opacity:0,y:30,duration:.8,ease:"power3.out"}),et.from("#p7-footer-inner",{scrollTrigger:{trigger:"#p7-footer",start:"top 85%"},opacity:0,y:40,duration:.8,ease:"power3.out"})}function Wa(){const t=document.querySelectorAll(".p7-chart-card");if(t.length){const u=new IntersectionObserver(b=>{b.forEach(d=>{d.isIntersecting&&(d.target.classList.add("p7-card-vis"),u.unobserve(d.target))})},{threshold:.05,rootMargin:"0px 0px -10px 0px"});t.forEach(b=>u.observe(b)),w.cleanups.push(()=>u.disconnect())}const e=document.getElementById("p7-mobile-tabs");if(e){const u={params:"p7-params-panel",preview:"p7-preview-panel",code:"p7-code-panel"},b=g=>{e.querySelectorAll(".p7-mob-tab").forEach(c=>c.classList.toggle("active",c.dataset.panel===g)),Object.entries(u).forEach(([c,f])=>document.getElementById(f)?.classList.toggle("mob-active",c===g)),g==="preview"&&U()};window.innerWidth<=768&&b("preview");const d=g=>{const c=g.target.closest("[data-panel]");c&&(g.preventDefault(),b(c.dataset.panel))};e.addEventListener("click",d),w.cleanups.push(()=>e.removeEventListener("click",d))}const a=document.getElementById("p7-code-editor");a&&(w.editor=Ut(a,{code:Vt.scatter(w.params.scatter),language:"r"}));const o=document.getElementById("p7-copy-wrap");o&&(w.copyBtn=Kt(o,{getText:()=>w.editor?w.editor.getCode():"",label:"复制代码",successLabel:"已复制"})),ct("scatter");const s=document.getElementById("p7-chart-grid");if(s){const u=d=>{const g=d.target.closest("[data-chart]");g&&(ct(g.dataset.chart),document.getElementById("p7-workshop")?.scrollIntoView({behavior:"smooth",block:"start"}))},b=d=>{if(d.key==="Enter"||d.key===" "){const g=d.target.closest("[data-chart]");g&&(d.preventDefault(),ct(g.dataset.chart))}};s.addEventListener("click",u),s.addEventListener("keydown",b),w.cleanups.push(()=>{s.removeEventListener("click",u),s.removeEventListener("keydown",b)})}const r=document.getElementById("p7-chart-tabs");if(r){const u=b=>{const d=b.target.closest("[data-chart]");d&&ct(d.dataset.chart)};r.addEventListener("click",u),w.cleanups.push(()=>r.removeEventListener("click",u))}const i=document.getElementById("p7-params-body");if(i){const u=d=>{if(d.target.dataset.param){const g=d.target.dataset.param,c=parseFloat(d.target.value),f=document.getElementById(`p7-val-${g}`);f&&(f.textContent=c),Dt(g,c)}},b=d=>{const g=d.target.closest("[data-group][data-val]");if(g){const f=g.dataset.group,l=g.dataset.val;i.querySelectorAll(`[data-group="${f}"]`).forEach(n=>n.classList.remove("active")),g.classList.add("active"),Dt(f,l);return}const c=d.target.closest("[data-toggle]");if(c){const f=c.dataset.toggle,l=!w.params[w.currentChart][f];w.params[w.currentChart][f]=l,c.classList.toggle("p7-toggle--on",l);const n=c.querySelector(".p7-tog-lbl");n&&(n.textContent=l?"开启":"关闭"),U(),ft();return}d.target.closest("[data-reset]")&&ca()};i.addEventListener("input",u),i.addEventListener("click",b),w.cleanups.push(()=>{i.removeEventListener("input",u),i.removeEventListener("click",b)})}const h=document.getElementById("p7-export-btn");if(h){const u=()=>{const b=w.editor?w.editor.getCode():"",d=new Blob([b],{type:"text/plain"}),g=URL.createObjectURL(d),c=document.createElement("a");c.href=g,c.download=`${w.currentChart}_plot.R`,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(g)};h.addEventListener("click",u),w.cleanups.push(()=>h.removeEventListener("click",u))}document.querySelectorAll("#p7-hero-nav .hero-quicknav__item").forEach(u=>{u.addEventListener("click",()=>{document.querySelector(u.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),document.getElementById("p7-btn-prev")?.addEventListener("click",()=>$t("m1-p6")),document.getElementById("p7-btn-next")?.addEventListener("click",()=>$t("m1-p8")),pa(),da()}function Sa(){Zt(),w.editor&&(w.editor.destroy(),w.editor=null),w.copyBtn&&(w.copyBtn.destroy(),w.copyBtn=null),w.cleanups.forEach(t=>t()),w.cleanups=[],w.currentChart="scatter",w.params=JSON.parse(JSON.stringify(Ct))}export{Sa as destroy,Wa as init,_a as render};
