import{k as re,g as E,f as S,s as J}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as G}from"./TabSwitcher-B5dsPqHB.js";import{c as oe}from"./CopyButton-2sIiwDp8.js";import{b as M,c as Y,r as se,h as ne}from"./color-math-Dw8FC2aa.js";import{n as O}from"./index-B1a3RBOV.js";import{s as $,p as ie,r as le,l as I,b as pe}from"./transform-ZU6R_1Oi.js";import{m as X}from"./max-DBeXZoyG.js";import{l as ce,c as de}from"./line-Ci26EkcQ.js";import{a as P,b as j}from"./axis-FVV8vvN_.js";import"./path-CbwjOpE9.js";let s={baseHex:"#4DBBD5",algorithm:"analogous",colorCount:5,generatedColors:[],hslValues:[],chartTab:"bar",exportTab:"hex",dataTypeTab:"sequential",seqSchemeIdx:0,seqCount:5,divSchemeIdx:0,divCount:7,qualSchemeIdx:0,qualCount:5,tabInstances:[],copyInstances:[]};const W=[{name:"Blues",colors:["#EFF3FF","#BDD7E7","#6BAED6","#2171B5","#084594"]},{name:"Greens",colors:["#EDF8E9","#BAE4B3","#74C476","#31A354","#006D2C"]},{name:"Oranges",colors:["#FEE6CE","#FDAE6B","#FD8D3C","#E6550D","#A63603"]},{name:"Viridis",colors:["#FDE725","#5DC963","#21908C","#3B528B","#440154"]},{name:"Plasma",colors:["#F0F921","#FCA636","#E16462","#B12A90","#0D0887"]}],K=[{name:"RdBu",colors:["#B2182B","#EF8A62","#FDDBC7","#F7F7F7","#D1E5F0","#67A9CF","#2166AC"]},{name:"RdYlBu",colors:["#D73027","#FC8D59","#FEE090","#FFFFBF","#E0F3F8","#91BFDB","#4575B4"]},{name:"PiYG",colors:["#8E0152","#DE77AE","#FDE0EF","#F7F7F7","#E6F5D0","#7FBC41","#4D9221"]},{name:"BrBG",colors:["#543005","#BF812D","#F6E8C3","#F5F5F5","#C7EAE5","#35978F","#003C30"]},{name:"PRGn",colors:["#40004B","#9970AB","#E7D4E8","#F7F7F7","#D9F0D3","#5AAE61","#00441B"]}],T=[{name:"Nature",colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2"]},{name:"Okabe-Ito",colors:["#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7"]},{name:"Set1",colors:["#E41A1C","#377EB8","#4DAF4A","#984EA3","#FF7F00","#A65628","#F781BF"]},{name:"Tableau",colors:["#4E79A7","#F28E2B","#E15759","#76B7B2","#59A14F","#EDC948","#B07AA1"]},{name:"Pastel",colors:["#AEC6CF","#FFD1DC","#B5EAD7","#FFDAC1","#C7CEEA","#E2F0CB","#FF9AA2"]}];function B(t,a,e){const r=ne(t,a,e);return se(r.r,r.g,r.b)}function F(t){return(t%360+360)%360}function C(t){return Math.max(0,Math.min(100,t))}function Z(t,a,e){const r=M(t),{h:o,s:n,l:x}=Y(r.r,r.g,r.b),p=[],h=Math.max(25,Math.min(85,n)),l=Math.max(35,Math.min(65,x));switch(a){case"complementary":{const g=[o,F(o+180)];for(let c=0;c<e;c++){const m=g[c%2],u=Math.floor(c/2)*(c%2===0?-15:15),f=C(l-10+c/(e-1)*20);p.push(B(F(m+u),h,f))}break}case"analogous":{const g=Math.min(60,15*(e-1)),c=F(o-g/2);for(let m=0;m<e;m++){const u=F(c+g/Math.max(e-1,1)*m),f=C(l-5+m/Math.max(e-1,1)*15);p.push(B(u,C(h-5+m*3),f))}break}case"triadic":{const g=[o,F(o+120),F(o+240)];for(let c=0;c<e;c++){const m=g[c%3],u=C(l-8+Math.floor(c/3)*16);p.push(B(m,h,u))}break}case"monochromatic":{for(let m=0;m<e;m++){const u=25+55*(m/Math.max(e-1,1)),f=C(h-10+m/Math.max(e-1,1)*20);p.push(B(o,f,u))}break}default:p.push(t)}return p.slice(0,e)}function Q(t,a,e){let r;t==="sequential"?r=W:t==="diverging"?r=K:r=T;const o=r[a].colors;if(e<=1)return[o[0]];const n=[];for(let x=0;x<e;x++){const p=Math.round(x*(o.length-1)/Math.max(e-1,1));n.push(o[Math.min(p,o.length-1)])}return n}function he(t){const a=M(t);return .2126*(a.r/255)+.7152*(a.g/255)+.0722*(a.b/255)>.45?"#1d1d1f":"#f5f5f7"}function A(t,a){const e=typeof t=="string"?document.querySelector(t):t;if(!e)return;e.innerHTML="";const r=520,o=240,n={top:20,right:20,bottom:36,left:48},x=r-n.left-n.right,p=o-n.top-n.bottom,l=$(e).append("svg").attr("viewBox",`0 0 ${r} ${o}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block").style("background","#fff").append("g").attr("transform",`translate(${n.left},${n.top})`),g=a.slice(0,5),m=["A组","B组","C组","D组","E组"].slice(0,g.length).map((i,v)=>({name:i,value:28+Math.sin(v*1.3+.5)*14+v*7,color:g[v]})),u=pe().domain(m.map(i=>i.name)).range([0,x]).padding(.35),f=I().domain([0,X(m,i=>i.value)*1.25]).nice().range([p,0]);l.selectAll(".grid").data(f.ticks(4)).enter().append("line").attr("x1",0).attr("x2",x).attr("y1",i=>f(i)).attr("y2",i=>f(i)).attr("stroke","#e8e8ed").attr("stroke-width",1),l.selectAll(".bar").data(m).enter().append("rect").attr("x",i=>u(i.name)).attr("y",i=>f(i.value)).attr("width",u.bandwidth()).attr("height",i=>p-f(i.value)).attr("fill",i=>i.color).attr("rx",3),l.append("g").attr("transform",`translate(0,${p})`).call(P(u).tickSize(0)).call(i=>i.select(".domain").attr("stroke","#d2d2d7")).selectAll("text").style("fill","#6e6e73").style("font-size","11px"),l.append("g").call(j(f).ticks(4)).call(i=>i.select(".domain").attr("stroke","#d2d2d7")).call(i=>i.selectAll(".tick line").remove()).selectAll("text").style("fill","#6e6e73").style("font-size","11px")}function ge(t,a){const e=typeof t=="string"?document.querySelector(t):t;if(!e)return;e.innerHTML="";const r=520,o=240,n={top:24,right:24,bottom:36,left:48},x=r-n.left-n.right,p=o-n.top-n.bottom,l=$(e).append("svg").attr("viewBox",`0 0 ${r} ${o}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block").style("background","#fff").append("g").attr("transform",`translate(${n.left},${n.top})`),g=Math.min(a.length,5),c=7,m=["Jan","Feb","Mar","Apr","May","Jun","Jul"],u=[[22,28,25,35,32,40,45],[30,26,33,38,42,39,50],[45,48,43,52,55,58,62],[18,22,27,24,30,35,38],[55,52,58,60,56,65,70]],f=a.slice(0,g).map((b,w)=>({color:b,points:u[w%u.length].slice(0,c).map((k,L)=>({x:L,y:k}))})),i=ie().domain(le(c)).range([0,x]).padding(.1),v=f.flatMap(b=>b.points.map(w=>w.y)),y=I().domain([0,X(v)*1.15]).nice().range([p,0]);l.selectAll(".grid").data(y.ticks(4)).enter().append("line").attr("x1",0).attr("x2",x).attr("y1",b=>y(b)).attr("y2",b=>y(b)).attr("stroke","#e8e8ed").attr("stroke-width",1);const d=ce().x(b=>i(b.x)).y(b=>y(b.y)).curve(de);f.forEach(({color:b,points:w})=>{l.append("path").datum(w).attr("fill","none").attr("stroke",b).attr("stroke-width",2).attr("d",d),l.selectAll(null).data(w).enter().append("circle").attr("cx",k=>i(k.x)).attr("cy",k=>y(k.y)).attr("r",3.5).attr("fill",b).attr("stroke","#fff").attr("stroke-width",1.5)}),l.append("g").attr("transform",`translate(0,${p})`).call(P(i).tickFormat(b=>m[b])).call(b=>b.select(".domain").attr("stroke","#d2d2d7")).call(b=>b.selectAll(".tick line").remove()).selectAll("text").style("fill","#6e6e73").style("font-size","11px"),l.append("g").call(j(y).ticks(4)).call(b=>b.select(".domain").attr("stroke","#d2d2d7")).call(b=>b.selectAll(".tick line").remove()).selectAll("text").style("fill","#6e6e73").style("font-size","11px")}function z(t,a){const e=typeof t=="string"?document.querySelector(t):t;if(!e)return;e.innerHTML="";const r=6,o=6,n=40,x=3,p=o*n,h=p+20,l=r*n+20,c=$(e).append("svg").attr("viewBox",`0 0 ${h} ${l}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("max-width",`${h}px`).style("height","auto").style("display","block").style("margin","0 auto").style("background","#fff").append("g").attr("transform",`translate(${(h-p)/2}, ${(l-r*n)/2})`),m=a.length,u=f=>{const i=f/(r*o-1),v=Math.min(Math.floor(i*m),m-1);return a[v]};for(let f=0;f<r;f++)for(let i=0;i<o;i++)c.append("rect").attr("x",i*n).attr("y",f*n).attr("width",n-x).attr("height",n-x).attr("fill",u(f*o+i)).attr("rx",3)}function me(t,a){const e=typeof t=="string"?document.querySelector(t):t;if(!e)return;e.innerHTML="";const r=6,o=38,n=2,x=28,p=r*o,h=p+x+10,l=p+x+10,c=$(e).append("svg").attr("viewBox",`0 0 ${h} ${l}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("max-width",`${h}px`).style("height","auto").style("display","block").style("margin","0 auto").style("background","#fff").append("g").attr("transform",`translate(${x+4}, ${x})`),m=["V1","V2","V3","V4","V5","V6"],u=Array.from({length:r},(i,v)=>Array.from({length:r},(y,d)=>v===d?1:Math.max(-1,Math.min(1,Math.cos((v+d)*.9)*.7+Math.sin(v*1.2-d*.5)*.3)))),f=i=>{const v=(i+1)/2,y=Math.min(Math.floor(v*a.length),a.length-1);return a[y]};for(let i=0;i<r;i++)for(let v=0;v<r;v++)c.append("rect").attr("x",v*o).attr("y",i*o).attr("width",o-n).attr("height",o-n).attr("fill",f(u[i][v])).attr("rx",2);c.selectAll(".xlabel").data(m).enter().append("text").attr("x",(i,v)=>v*o+(o-n)/2).attr("y",-5).attr("text-anchor","middle").style("font-size","10px").style("fill","#6e6e73").text(i=>i),c.selectAll(".ylabel").data(m).enter().append("text").attr("x",-6).attr("y",(i,v)=>v*o+(o-n)/2+4).attr("text-anchor","end").style("font-size","10px").style("fill","#6e6e73").text(i=>i)}function fe(t,a){const e=typeof t=="string"?document.querySelector(t):t;if(!e)return;e.innerHTML="";const r=520,o=280,n={top:20,right:24,bottom:40,left:48},x=r-n.left-n.right,p=o-n.top-n.bottom,h=$(e).append("svg").attr("viewBox",`0 0 ${r} ${o}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block").style("background","#fff"),l=h.append("g").attr("transform",`translate(${n.left},${n.top})`),g=Math.min(a.length,5),c=[{cx:25,cy:70},{cx:55,cy:30},{cx:80,cy:65},{cx:40,cy:50},{cx:70,cy:85}],m=[];for(let d=0;d<g;d++){const b=c[d%c.length];for(let w=0;w<10;w++){const k=(d*7+w*13)%17-8,L=(d*11+w*7)%15-7;m.push({x:Math.max(2,Math.min(98,b.cx+k)),y:Math.max(2,Math.min(98,b.cy+L)),color:a[d],group:d})}}const u=I().domain([0,100]).nice().range([0,x]),f=I().domain([0,100]).nice().range([p,0]);l.selectAll(".gridh").data(f.ticks(5)).enter().append("line").attr("x1",0).attr("x2",x).attr("y1",d=>f(d)).attr("y2",d=>f(d)).attr("stroke","#e8e8ed").attr("stroke-width",1),l.selectAll(".gridv").data(u.ticks(5)).enter().append("line").attr("x1",d=>u(d)).attr("x2",d=>u(d)).attr("y1",0).attr("y2",p).attr("stroke","#e8e8ed").attr("stroke-width",1),l.selectAll(".dot").data(m).enter().append("circle").attr("cx",d=>u(d.x)).attr("cy",d=>f(d.y)).attr("r",5).attr("fill",d=>d.color).attr("opacity",.82).attr("stroke","#fff").attr("stroke-width",1.2),l.append("g").attr("transform",`translate(0,${p})`).call(P(u).ticks(5)).call(d=>d.select(".domain").attr("stroke","#d2d2d7")).call(d=>d.selectAll(".tick line").attr("stroke","#d2d2d7")).selectAll("text").style("fill","#6e6e73").style("font-size","11px"),l.append("g").call(j(f).ticks(5)).call(d=>d.select(".domain").attr("stroke","#d2d2d7")).call(d=>d.selectAll(".tick line").attr("stroke","#d2d2d7")).selectAll("text").style("fill","#6e6e73").style("font-size","11px");const i=h.append("g").attr("transform",`translate(${n.left+8}, ${o-14})`),v=["组A","组B","组C","组D","组E"];let y=0;for(let d=0;d<g;d++)i.append("circle").attr("cx",y).attr("cy",0).attr("r",4).attr("fill",a[d]),i.append("text").attr("x",y+7).attr("y",4).style("font-size","10px").style("fill","#6e6e73").text(v[d]),y+=48}function ee(t,a){switch(a){case"hex":return t.map(e=>`"${e}"`).join(`,
`);case"r":return`# 在 R 中使用生成的配色方案
palette <- c(${t.map(e=>`"${e}"`).join(", ")})

# 用于 ggplot2
scale_fill_manual(values = palette)
scale_color_manual(values = palette)

# 用于 base R 绘图
barplot(1:${t.length}, col = palette)`;case"python":return`# 在 Python 中使用生成的配色方案
palette = [${t.map(e=>`"${e}"`).join(", ")}]

# 用于 matplotlib
import matplotlib.pyplot as plt
from matplotlib.colors import ListedColormap
cmap = ListedColormap(palette)

# 用于 seaborn
import seaborn as sns
sns.set_palette(palette)`;case"css":return`:root {
${t.map((e,r)=>`  --color-${r+1}: ${e};`).join(`
`)}
}`;default:return""}}function De(){return`
<style id="p3-styles">
/* ── Hero ── */
.p3-hero {
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--bg-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: var(--space-xl) var(--space-lg);
}
@keyframes p3-glow-a {
  0%,100% { transform: translate(0,0) scale(1); opacity: 1; }
  45% { transform: translate(-3%,4%) scale(1.1); opacity: 0.65; }
}
@keyframes p3-glow-b {
  0%,100% { transform: translate(0,0) scale(1); opacity: 0.6; }
  55% { transform: translate(5%,-3%) scale(0.9); opacity: 1; }
}
.p3-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(77,187,213,0.14) 0%, transparent 65%);
  pointer-events: none;
  animation: p3-glow-a 11s ease-in-out infinite;
}
.p3-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 40% 40% at 72% 62%, rgba(149,213,178,0.09) 0%, transparent 60%);
  pointer-events: none;
  animation: p3-glow-b 14s ease-in-out infinite;
}
.p3-hero-eyebrow {
  /* 使用全局 .hero-eyebrow 基础样式，此处无需重复 */
}
.p3-hero-title {
  color: var(--text-on-dark);
}
.p3-hero-sub {
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 300;
  color: var(--text-on-dark);
  opacity: 0.5;
  max-width: 600px;
  line-height: 1.4;
  text-align: center;
}
.p3-hero-tagline {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  max-width: 540px;
  line-height: 1.8;
  margin-top: var(--space-sm);
  text-align: center;
}
.p3-scroll-hint {
  font-size: var(--text-caption); color: var(--text-on-dark-3);
  animation: p3-float 2.2s ease-in-out infinite;
  margin-top: var(--space-sm);
}
@keyframes p3-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }

/* ── Section labels ── */
.p3-section-label {
  font-family: var(--font-code);
  font-size: 0.75rem;
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.p3-section-title-dark {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-on-dark);
  margin-bottom: var(--space-sm);
}
.p3-section-title-light {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-on-light);
  margin-bottom: var(--space-sm);
}
.p3-section-desc-dark { color: var(--text-on-dark-2); font-size: 1rem; line-height: 1.7; }
.p3-section-desc-light { color: var(--text-on-light-2); font-size: 1rem; line-height: 1.7; }

/* ── Section 2: Generator ── */
.p3-generator-section {
  background: var(--bg-dark);
  padding: var(--space-xl) var(--space-lg);
}
.p3-gen-header { max-width: 720px; margin: 0 auto var(--space-xl); text-align: center; }

/* Generator layout */
.p3-generator-layout {
  display: flex;
  gap: 32px;
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-start;
}
.p3-left-panel {
  width: 340px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.p3-panel-group { display: flex; flex-direction: column; gap: 10px; }
.p3-panel-label {
  font-family: var(--font-heading);
  font-size: 0.73rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-on-dark-2);
}
.p3-color-input-row { display: flex; align-items: center; gap: 10px; }
.p3-color-picker {
  width: 44px; height: 44px;
  border: 1.5px solid var(--border-dark);
  padding: 2px;
  background: transparent;
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.p3-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
.p3-color-picker::-webkit-color-swatch { border-radius: 6px; border: none; }
.p3-hex-input {
  flex: 1;
  background: #111113;
  border: 1.5px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 0.9rem;
  padding: 10px 14px;
  outline: none;
  transition: border-color 0.2s;
}
.p3-hex-input:focus { border-color: var(--accent); }
.p3-algo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.p3-algo-btn {
  background: #111113;
  border: 1.5px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark-2);
  font-family: var(--font-body);
  font-size: 0.85rem;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.3;
}
.p3-algo-btn:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p3-algo-btn.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }
/* ── Stepper 数量选择器（替代原生 range） ── */
.p3-stepper {
  display: flex; align-items: center; position: relative; gap: 0;
  padding: 4px 0;
}
.p3-stepper-track {
  position: absolute; top: 50%; left: 0; right: 0;
  height: 2px; background: var(--border-dark);
  transform: translateY(-50%); z-index: 0;
  border-radius: 1px;
}
.p3-stepper-fill {
  position: absolute; top: 50%; left: 0;
  height: 2px; background: var(--accent);
  transform: translateY(-50%); z-index: 1;
  border-radius: 1px;
  transition: width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.p3-stepper-dot {
  position: relative; z-index: 2;
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-code); font-size: 0.75rem; font-weight: 500;
  color: var(--text-on-dark-3);
  background: var(--bg-dark);
  border: 1.5px solid var(--border-dark);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.p3-stepper-dot:hover {
  border-color: var(--accent);
  color: var(--text-on-dark);
}
.p3-stepper-dot.passed {
  border-color: rgba(126, 200, 227, 0.3);
  color: var(--text-on-dark-2);
}
.p3-stepper-dot.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #1d1d1f;
  font-weight: 700;
  box-shadow: 0 0 12px rgba(126, 200, 227, 0.4);
  transform: scale(1.15);
}
.p3-stepper-gap {
  flex: 1; min-width: 4px;
}

/* 浅色段内的 stepper */
.p3-stepper-light .p3-stepper-track { background: var(--border-light); }
.p3-stepper-light .p3-stepper-fill { background: var(--accent-hover); }
.p3-stepper-light .p3-stepper-dot {
  color: var(--text-on-light-3);
  background: var(--bg-light);
  border-color: var(--border-light);
}
.p3-stepper-light .p3-stepper-dot:hover {
  border-color: var(--accent-hover);
  color: var(--text-on-light);
}
.p3-stepper-light .p3-stepper-dot.passed {
  border-color: rgba(126, 200, 227, 0.35);
  color: var(--text-on-light-2);
}
.p3-stepper-light .p3-stepper-dot.active {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  color: #fff;
  box-shadow: 0 0 10px rgba(126, 200, 227, 0.3);
}
.p3-generate-btn {
  width: 100%; padding: 14px;
  background: var(--accent); color: #1d1d1f;
  border: none; border-radius: var(--radius-sm);
  font-family: var(--font-heading); font-size: 1rem; font-weight: 700;
  cursor: pointer; transition: all 0.2s; letter-spacing: 0.02em;
}
.p3-generate-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }
.p3-generate-btn:active { transform: translateY(0); }

/* Right panel */
.p3-right-panel { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 24px; }

/* Swatches */
.p3-palette-swatches { display: flex; gap: 8px; }
.p3-color-box {
  flex: 1;
  height: 80px;
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; overflow: hidden;
}
.p3-color-box:hover { transform: scaleY(1.05); box-shadow: 0 4px 16px rgba(0,0,0,0.4); }
.p3-hex-label {
  font-family: var(--font-code); font-size: 0.65rem;
  opacity: 0; transition: opacity 0.2s;
  padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.28);
}
.p3-color-box:hover .p3-hex-label { opacity: 1; }
.p3-copied-flash {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.35);
  font-size: 0.72rem; font-family: var(--font-code);
  opacity: 0; transition: opacity 0.2s; pointer-events: none;
}

/* Chart preview */
.p3-chart-wrapper {
  background: #fff;
  border-radius: var(--radius-md);
  padding: 4px;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.p3-chart-area { width: 100%; background: #fff; border-radius: 10px; overflow: hidden; }

/* HSL panel — collapsible */
.p3-hsl-panel {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.p3-hsl-toggle {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 16px 20px;
  background: none; border: none; cursor: pointer;
  color: var(--text-on-dark-2); transition: color 0.2s;
}
.p3-hsl-toggle:hover { color: var(--text-on-dark); }
.p3-hsl-title {
  font-family: var(--font-heading);
  font-size: 0.78rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.p3-hsl-arrow {
  width: 18px; height: 18px; transition: transform 0.3s var(--ease-apple);
}
.p3-hsl-panel.open .p3-hsl-arrow { transform: rotate(180deg); }
.p3-hsl-body {
  max-height: 0; overflow: hidden;
  transition: max-height 0.4s var(--ease-apple), padding 0.3s;
  padding: 0 20px;
}
.p3-hsl-panel.open .p3-hsl-body {
  max-height: 600px; padding: 0 20px 20px;
}
.p3-hsl-rows { display: flex; flex-direction: column; gap: 10px; }
.p3-hsl-row { display: flex; align-items: center; gap: 8px; }
.p3-hsl-swatch {
  width: 26px; height: 26px; border-radius: 6px; flex-shrink: 0;
  border: 1.5px solid rgba(255,255,255,0.1);
}
.p3-hsl-row label {
  font-family: var(--font-code); font-size: 0.7rem;
  color: var(--text-on-dark-3); width: 14px; flex-shrink: 0;
}
.p3-hsl-slider {
  flex: 1; -webkit-appearance: none; appearance: none;
  height: 3px; border-radius: 2px;
  background: var(--border-dark); outline: none; cursor: pointer;
  min-width: 40px;
}
.p3-hsl-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: #fff; cursor: pointer;
  border: 2px solid var(--bg-dark-elevated);
  box-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.p3-hsl-val {
  font-family: var(--font-code); font-size: 0.72rem;
  color: var(--text-on-dark-2); min-width: 30px; text-align: right;
}

/* Export panel */
.p3-export-panel {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.p3-export-header { padding: 16px 20px 0; }
.p3-export-code-wrap { position: relative; padding: 0 20px 20px; }
.p3-export-code {
  font-family: var(--font-code); font-size: 0.8rem;
  line-height: 1.7; color: #a8d8ea;
  background: #0d0d0f; border-radius: var(--radius-sm);
  padding: 16px; margin: 12px 0 0;
  overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word;
  border: 1px solid var(--border-dark); min-height: 90px;
}
.p3-export-copy-wrap { position: absolute; top: 24px; right: 32px; }

/* ── Section 3: Data Types ── */
.p3-datatypes-section {
  background: var(--bg-light);
  padding: var(--space-xl) var(--space-lg);
}
.p3-datatypes-inner { max-width: 1000px; margin: 0 auto; }
.p3-dt-header { text-align: center; margin-bottom: var(--space-lg); }
.p3-scheme-grid { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.p3-scheme-btn {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px;
  background: var(--bg-light-elevated);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-sm);
  cursor: pointer; transition: all 0.2s;
  font-size: 0.85rem; color: var(--text-on-light-2);
}
.p3-scheme-swatches { display: flex; gap: 2px; }
.p3-scheme-swatch { width: 12px; height: 12px; border-radius: 2px; }
.p3-scheme-btn:hover { border-color: var(--accent); color: var(--text-on-light); }
.p3-scheme-btn.active {
  border-color: var(--accent);
  background: var(--accent-subtle);
  color: var(--text-on-light); font-weight: 600;
}
.p3-datatype-desc { font-size: 1rem; color: var(--text-on-light-2); line-height: 1.7; max-width: 680px; margin-bottom: 16px; }
.p3-datatype-controls { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.p3-datatype-controls label { font-size: 0.85rem; color: var(--text-on-light-2); white-space: nowrap; }
.p3-data-chart-wrap {
  background: #fff; border: 1px solid var(--border-light);
  border-radius: var(--radius-md); padding: 4px;
  box-shadow: var(--shadow-sm); overflow: hidden;
}
.p3-data-chart-area { width: 100%; background: #fff; border-radius: 10px; overflow: hidden; }

/* Tab overrides for light section — underline style */
.p3-datatypes-section .tab-switcher {
  background: transparent;
  border: none;
  border-bottom: 1.5px solid var(--border-light);
  border-radius: 0;
  margin-bottom: 28px;
  padding: 0;
  display: flex;
  width: 100%;
}
.p3-datatypes-section .tab-switcher__tab {
  color: var(--text-on-light-2);
  flex: 1;
  text-align: center;
  padding: 12px 16px;
  border-radius: 0;
  font-size: 0.9rem;
}
.p3-datatypes-section .tab-switcher__tab.active { color: var(--text-on-light); font-weight: 600; }
.p3-datatypes-section .tab-switcher__indicator { background: var(--accent); bottom: 0; top: auto; height: 2.5px; border-radius: 2px 2px 0 0; }

/* ── Section 4: Errors ── */
.p3-errors-section { background: var(--bg-dark); padding: var(--space-xl) var(--space-lg); }
.p3-errors-inner { max-width: 1100px; margin: 0 auto; }
.p3-errors-header { text-align: center; margin-bottom: var(--space-lg); }
.p3-errors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.p3-error-card {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-md); overflow: hidden;
}
.p3-error-card-header {
  padding: 20px 20px 14px;
  font-family: var(--font-heading); font-size: 0.9rem; font-weight: 600;
  color: var(--text-on-dark);
}
.p3-comparison-row { display: flex; gap: 8px; padding: 0 20px; }
.p3-compare-half { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.p3-compare-tag { font-size: 0.68rem; font-family: var(--font-code); font-weight: 600; letter-spacing: 0.05em; }
.p3-compare-tag.bad { color: #FF6B6B; }
.p3-compare-tag.good { color: #4CAF50; }
.p3-compare-chart { background: #fff; border-radius: 6px; overflow: hidden; min-height: 90px; }
.p3-error-desc {
  padding: 14px 20px; font-size: 0.82rem; color: var(--text-on-dark-2); line-height: 1.6;
  border-top: 1px solid var(--border-dark); margin-top: 14px;
}

/* footer uses global .page-footer-cta */

/* ── Responsive ── */

/* Tablet / narrow desktop */
@media (max-width: 900px) {
  .p3-generator-layout { flex-direction: column; }
  .p3-left-panel { width: 100%; position: static; }
  .p3-errors-grid { grid-template-columns: 1fr; }
}

/* Tab switcher overflow — allow horizontal scroll on all sizes */
.p3-generator-section .tab-switcher,
.p3-datatypes-section .tab-switcher {
  overflow-x: auto; -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.p3-generator-section .tab-switcher::-webkit-scrollbar,
.p3-datatypes-section .tab-switcher::-webkit-scrollbar { display: none; }
.p3-generator-section .tab-switcher__tab,
.p3-datatypes-section .tab-switcher__tab { white-space: nowrap; flex-shrink: 0; }

/* Mobile */
@media (max-width: 768px) {
  .p3-generator-section, .p3-datatypes-section, .p3-errors-section {
    padding: var(--space-lg) var(--space-sm);
  }
  .p3-hero { padding: 80px var(--space-sm) 48px; }
  .p3-datatypes-section .tab-switcher__tab { font-size: 0.78rem; padding: 10px 8px; }

  /* Left panel compact */
  .p3-left-panel { padding: 20px; gap: 16px; }
  .p3-algo-grid { grid-template-columns: 1fr 1fr; gap: 6px; }
  .p3-algo-btn { font-size: 0.8rem; padding: 8px 10px; }

  /* Stepper 移动端：更大的触控点 */
  .p3-stepper-dot { width: 34px; height: 34px; font-size: 0.8rem; }
  .p3-stepper-dot.active { transform: scale(1.1); }

  /* HSL slider touch sizing */
  .p3-hsl-slider {
    height: auto; min-height: 32px;
  }
  .p3-hsl-slider::-webkit-slider-thumb { width: 22px; height: 22px; }
  .p3-hsl-slider::-moz-range-thumb { width: 22px; height: 22px; }

  /* Swatches wrap on very narrow */
  .p3-palette-swatches { flex-wrap: wrap; gap: 4px; }
  .p3-color-box { flex: 1 1 calc(33% - 4px); min-width: 48px; height: 56px; }
  .p3-hex-label { font-size: 0.55rem; }

  /* HSL rows: stack sliders vertically */
  .p3-hsl-row {
    flex-wrap: wrap; gap: 4px 6px;
  }
  .p3-hsl-swatch { width: 22px; height: 22px; }
  .p3-hsl-row label { font-size: 0.6rem; width: 10px; }
  .p3-hsl-slider { min-width: 50px; }
  .p3-hsl-val { font-size: 0.65rem; min-width: 26px; }

  /* Export code */
  .p3-export-code { font-size: 0.72rem; padding: 12px; max-height: 160px; }
  .p3-export-copy-wrap { top: 16px; right: 24px; }

  /* Data type section */
  .p3-scheme-grid { gap: 6px; }
  .p3-scheme-btn { padding: 6px 10px; font-size: 0.78rem; }
  .p3-scheme-swatch { width: 10px; height: 10px; }
  .p3-datatype-controls { flex-wrap: wrap; gap: 8px; }

  /* Error cards */
  .p3-comparison-row { flex-direction: column; gap: 10px; }
  .p3-error-card-header { font-size: 0.85rem; padding: 16px 16px 10px; }
  .p3-comparison-row { padding: 0 16px; }
  .p3-error-desc { padding: 12px 16px; font-size: 0.78rem; }
}

/* Small phones */
@media (max-width: 400px) {
  .p3-color-box { flex: 1 1 calc(50% - 4px); }
  .p3-algo-grid { grid-template-columns: 1fr; }
  .p3-hsl-row label { display: none; }
  .p3-scheme-btn span { font-size: 0.7rem; }
  /* footer nav uses global btn-primary / btn-ghost */
}
</style>

<div class="page-scroll">

  <!-- ══ Section 1: Hero ══ -->
  <section class="p3-hero section-dark section-hero-full">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow p3-hero-eyebrow" id="p3-eyebrow" style="opacity:0;">Module 01 / Page 03</p>
      <h1 class="page-hero-title p3-hero-title" id="p3-hero-title" style="color:var(--text-on-dark);opacity:0;">配色生成器</h1>
      <p class="page-hero-sub p3-hero-sub" id="p3-hero-sub" style="opacity:0;">Color Palette Generator</p>
      <p class="p3-hero-tagline" id="p3-hero-tagline" style="opacity:0;">从一个基色出发，生成专业的科研配色方案</p>
      <!-- 快捷导航 -->
      <nav class="hero-quicknav" id="p3-hero-nav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#p3-generator-section">自定义配色</button>
        <button class="hero-quicknav__item" data-target="#p3-datatypes-section">数据配色类型</button>
        <button class="hero-quicknav__item" data-target="#p3-errors-section">常见错误</button>
      </nav>
      <div class="p3-scroll-hint" id="p3-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ══ Section 2: Generator ══ -->
  <section class="p3-generator-section section-dark" id="p3-generator-section">
    <div class="p3-gen-header" id="p3-gen-header">
      <p class="p3-section-label">Interactive Tool</p>
      <h2 class="p3-section-title-dark">自定义配色生成器</h2>
      <p class="p3-section-desc-dark">选择基色和配色算法，实时预览生成的科研配色方案</p>
    </div>

    <div class="p3-generator-layout">
      <!-- Left: controls -->
      <div class="p3-left-panel" id="p3-left-panel">
        <div class="p3-panel-group">
          <div class="p3-panel-label">基色</div>
          <div class="p3-color-input-row">
            <input type="color" id="p3-base-color" class="p3-color-picker" value="#4DBBD5">
            <input type="text" id="p3-hex-input" class="p3-hex-input" value="#4DBBD5" maxlength="7" spellcheck="false">
          </div>
        </div>

        <div class="p3-panel-group">
          <div class="p3-panel-label">配色算法</div>
          <div class="p3-algo-grid">
            <button class="p3-algo-btn" data-algo="complementary">互补色</button>
            <button class="p3-algo-btn active" data-algo="analogous">类似色</button>
            <button class="p3-algo-btn" data-algo="triadic">三角配色</button>
            <button class="p3-algo-btn" data-algo="monochromatic">单色渐变</button>
          </div>
        </div>

        <div class="p3-panel-group">
          <div class="p3-panel-label">颜色数量</div>
          <div class="p3-stepper" id="p3-count-stepper" data-min="3" data-max="8" data-value="5">
            <div class="p3-stepper-track"></div>
            <div class="p3-stepper-fill"></div>
          </div>
        </div>

        <button class="p3-generate-btn" id="p3-generate-btn">✦ 生成配色</button>
      </div>

      <!-- Right: output -->
      <div class="p3-right-panel" id="p3-right-panel">
        <div class="p3-palette-swatches" id="p3-swatches"></div>

        <div>
          <div id="p3-chart-tab-container"></div>
          <div class="p3-chart-wrapper">
            <div class="p3-chart-area" id="p3-chart-area"></div>
          </div>
        </div>

        <div class="p3-hsl-panel" id="p3-hsl-panel">
          <button class="p3-hsl-toggle" id="p3-hsl-toggle" type="button">
            <span class="p3-hsl-title">HSL 精细调整</span>
            <svg class="p3-hsl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="p3-hsl-body">
            <div class="p3-hsl-rows" id="p3-hsl-rows"></div>
          </div>
        </div>

        <div class="p3-export-panel">
          <div class="p3-export-header" id="p3-export-tab-container"></div>
          <div class="p3-export-code-wrap">
            <pre class="p3-export-code" id="p3-export-code"></pre>
            <div class="p3-export-copy-wrap" id="p3-export-copy-wrap"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══ Section 3: Data Types ══ -->
  <section class="p3-datatypes-section" id="p3-datatypes-section">
    <div class="p3-datatypes-inner">
      <div class="p3-dt-header">
        <p class="p3-section-label" style="color:var(--accent-hover);">数据配色策略</p>
        <h2 class="p3-section-title-light">三类数据配色</h2>
        <p class="p3-section-desc-light">不同类型的数据需要不同的配色策略</p>
      </div>
      <div id="p3-datatype-tab-container"></div>
      <div id="p3-datatype-content"></div>
    </div>
  </section>

  <!-- ══ Section 4: Errors ══ -->
  <section class="p3-errors-section section-dark" id="p3-errors-section">
    <div class="p3-errors-inner">
      <div class="p3-errors-header">
        <p class="p3-section-label">常见错误</p>
        <h2 class="p3-section-title-dark">配色的对与错</h2>
        <p class="p3-section-desc-dark">避免这些常见的配色错误，让你的数据图表更加专业</p>
      </div>
      <div class="p3-errors-grid" id="p3-errors-grid"></div>
    </div>
  </section>

  <!-- ══ Section 5: Footer CTA ══ -->
  <section class="page-footer-cta" id="p3-footer">
    <p class="page-footer-num">03 / 10</p>
    <h2 class="page-footer-quote">"好的配色让数据自己说话"</h2>
    <p class="page-footer-desc">下一步：学习色觉无障碍设计，让更多人看懂你的图表</p>
    <div class="page-footer-nav">
      <button class="btn-ghost" id="p3-prev-btn">← 色彩和谐</button>
      <button class="btn-primary" id="p3-next-btn">色彩与阅读无障碍 →</button>
    </div>
  </section>

</div>
  `}function qe(){E.fromTo("#p3-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.7,delay:.1,ease:"power3.out"}),E.fromTo("#p3-hero-title",{opacity:0,y:40},{opacity:1,y:0,duration:.9,delay:.25,ease:"power3.out"}),E.fromTo("#p3-hero-sub",{opacity:0,y:30},{opacity:.5,y:0,duration:.8,delay:.4,ease:"power3.out"}),E.fromTo("#p3-hero-tagline",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.55,ease:"power3.out"}),E.fromTo("#p3-hero-nav",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.7,ease:"power3.out"}),E.fromTo("#p3-scroll-hint",{opacity:0},{opacity:1,duration:.6,delay:1,ease:"power2.out"}),S("#p3-gen-header",{y:40}),J("#p3-left-panel"),J("#p3-right-panel"),S("#p3-dt-header",{y:40}),S("#p3-errors-inner",{y:30}),S("#p3-footer",{y:30});const t=document.getElementById("p3-hsl-toggle"),a=document.getElementById("p3-hsl-panel");t&&a&&t.addEventListener("click",()=>{a.classList.toggle("open")}),xe(),ue(),be(),we(),ke(),Ee(),document.querySelectorAll("#p3-hero-nav .hero-quicknav__item").forEach(e=>{e.addEventListener("click",()=>{const r=document.querySelector(e.dataset.target);r&&r.scrollIntoView({behavior:"smooth",block:"start"})})}),s.generatedColors=Z(s.baseHex,s.algorithm,s.colorCount),s.hslValues=s.generatedColors.map(e=>{const r=M(e);return Y(r.r,r.g,r.b)}),N(),D(),ae(),q()}function te(t,a){if(!t)return;const e=parseInt(t.dataset.min),r=parseInt(t.dataset.max);let o=parseInt(t.dataset.value);function n(){t.querySelectorAll(".p3-stepper-dot, .p3-stepper-gap").forEach(l=>l.remove());const h=t.querySelector(".p3-stepper-fill");for(let l=e;l<=r;l++){if(l>e){const c=document.createElement("div");c.className="p3-stepper-gap",t.appendChild(c)}const g=document.createElement("button");g.className="p3-stepper-dot",g.textContent=l,g.type="button",l===o?g.classList.add("active"):l<o&&g.classList.add("passed"),g.addEventListener("click",()=>{o=l,t.dataset.value=l,x(),a&&a(l)}),t.appendChild(g)}p(h)}function x(){t.querySelectorAll(".p3-stepper-dot").forEach((l,g)=>{const c=e+g;l.classList.remove("active","passed"),c===o?l.classList.add("active"):c<o&&l.classList.add("passed")}),p(t.querySelector(".p3-stepper-fill"))}function p(h){if(!h)return;const l=t.querySelectorAll(".p3-stepper-dot");if(l.length<2){h.style.width="0";return}requestAnimationFrame(()=>{const g=l[0],c=l[o-e];if(!g||!c)return;const m=t.getBoundingClientRect(),u=g.getBoundingClientRect().left+g.offsetWidth/2-m.left,f=c.getBoundingClientRect().left+c.offsetWidth/2-m.left;h.style.left=u+"px",h.style.width=f-u+"px"})}n()}function xe(){const t=document.getElementById("p3-base-color"),a=document.getElementById("p3-hex-input"),e=document.getElementById("p3-generate-btn");t&&t.addEventListener("input",r=>{s.baseHex=r.target.value,a&&(a.value=r.target.value),_()}),a&&a.addEventListener("input",r=>{const o=r.target.value.trim(),n=o.startsWith("#")?o:"#"+o;/^#[0-9A-Fa-f]{6}$/.test(n)&&(s.baseHex=n,t&&(t.value=n),_())}),document.querySelectorAll(".p3-algo-btn").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".p3-algo-btn").forEach(o=>o.classList.remove("active")),r.classList.add("active"),s.algorithm=r.dataset.algo,R()})}),te(document.getElementById("p3-count-stepper"),r=>{s.colorCount=r,_()}),e&&e.addEventListener("click",R)}let H=null;function _(){clearTimeout(H),H=setTimeout(R,80)}function R(){s.generatedColors=Z(s.baseHex,s.algorithm,s.colorCount),s.hslValues=s.generatedColors.map(t=>{const a=M(t);return Y(a.r,a.g,a.b)}),N(),D(),ae(),q()}function N(){const t=document.getElementById("p3-swatches");t&&(t.innerHTML=s.generatedColors.map((a,e)=>{const r=he(a);return`<div class="p3-color-box" data-hex="${a}" data-idx="${e}" style="background:${a};" title="点击复制 ${a}">
      <span class="p3-hex-label" style="color:${r};">${a}</span>
      <span class="p3-copied-flash" style="color:${r};">已复制!</span>
    </div>`}).join(""),t.querySelectorAll(".p3-color-box").forEach(a=>{a.addEventListener("click",()=>{navigator.clipboard.writeText(a.dataset.hex).then(()=>{const e=a.querySelector(".p3-copied-flash");e&&(e.style.opacity="1",setTimeout(()=>{e.style.opacity="0"},1200))}).catch(()=>{})})}))}function ue(){const t=document.getElementById("p3-chart-tab-container");if(!t)return;const a=G(t,{tabs:[{id:"bar",label:"柱状图"},{id:"line",label:"折线图"},{id:"heatmap",label:"热力图"}],activeId:"bar",variant:"pill",onChange:e=>{s.chartTab=e,D()}});s.tabInstances.push(a)}function D(){const t=document.getElementById("p3-chart-area");if(t)switch(s.chartTab){case"bar":A(t,s.generatedColors);break;case"line":ge(t,s.generatedColors);break;case"heatmap":z(t,s.generatedColors);break}}function ae(){const t=document.getElementById("p3-hsl-rows");t&&(t.innerHTML=s.hslValues.map((a,e)=>{const r=s.generatedColors[e];return`<div class="p3-hsl-row" data-row="${e}">
      <div class="p3-hsl-swatch p3-hsl-swatch-${e}" style="background:${r};"></div>
      <label>H</label>
      <input type="range" class="p3-hsl-slider" data-idx="${e}" data-comp="h" min="0" max="360" value="${a.h}">
      <span class="p3-hsl-val p3-hval-h-${e}">${a.h}°</span>
      <label>S</label>
      <input type="range" class="p3-hsl-slider" data-idx="${e}" data-comp="s" min="0" max="100" value="${a.s}">
      <span class="p3-hsl-val p3-hval-s-${e}">${a.s}%</span>
      <label>L</label>
      <input type="range" class="p3-hsl-slider" data-idx="${e}" data-comp="l" min="0" max="100" value="${a.l}">
      <span class="p3-hsl-val p3-hval-l-${e}">${a.l}%</span>
    </div>`}).join(""),t.querySelectorAll(".p3-hsl-slider").forEach(a=>{a.addEventListener("input",e=>{const r=parseInt(e.target.dataset.idx),o=e.target.dataset.comp,n=parseInt(e.target.value);o==="h"?s.hslValues[r].h=n:o==="s"?s.hslValues[r].s=n:o==="l"&&(s.hslValues[r].l=n);const{h:x,s:p,l:h}=s.hslValues[r],l=B(x,p,h);s.generatedColors[r]=l;const g=t.querySelector(`.p3-hsl-swatch-${r}`);g&&(g.style.background=l);const c=t.querySelector(`.p3-hval-${o}-${r}`);c&&(c.textContent=o==="h"?`${n}°`:`${n}%`),N(),D(),q()})}))}function be(){const t=document.getElementById("p3-export-tab-container");if(!t)return;const a=G(t,{tabs:[{id:"hex",label:"HEX 列表"},{id:"r",label:"R 代码"},{id:"python",label:"Python"},{id:"css",label:"CSS 变量"}],activeId:"hex",variant:"default",onChange:r=>{s.exportTab=r,q()}});s.tabInstances.push(a);const e=document.getElementById("p3-export-copy-wrap");if(e){const r=oe(e,{getText:()=>ee(s.generatedColors,s.exportTab),label:"复制",successLabel:"已复制"});s.copyInstances.push(r)}}function q(){const t=document.getElementById("p3-export-code");t&&(t.textContent=ee(s.generatedColors,s.exportTab))}const ve={sequential:'连续型配色适用于表示有序的单一变量，如基因表达量、温度分布。颜色从浅到深平滑过渡，直觉上传递"越深 = 越大"的信息。',diverging:"发散型配色以中性色为中心，向两侧延伸出两种对立色调，适合表示以零点为基准的数据——如正负相关、收益与损失。",qualitative:"定性型配色使用感知上差异明显的不同色调，适合区分无序的类别变量，如不同实验组、不同物种，颜色之间不含有序含义。"},ye={sequential:{min:3,max:9},diverging:{min:3,max:7},qualitative:{min:3,max:7}};function we(){const t=document.getElementById("p3-datatype-tab-container");if(!t)return;const a=G(t,{tabs:[{id:"sequential",label:"连续型 Sequential"},{id:"diverging",label:"发散型 Diverging"},{id:"qualitative",label:"定性型 Qualitative"}],activeId:"sequential",variant:"default",onChange:e=>{s.dataTypeTab=e,V()}});s.tabInstances.push(a),V()}function V(){const t=document.getElementById("p3-datatype-content");if(!t)return;const a=s.dataTypeTab;let e,r,o;a==="sequential"?(e=W,r=s.seqSchemeIdx,o=s.seqCount):a==="diverging"?(e=K,r=s.divSchemeIdx,o=s.divCount):(e=T,r=s.qualSchemeIdx,o=s.qualCount);const n=ye[a],x=Q(a,r,o);t.innerHTML=`
    <p class="p3-datatype-desc">${ve[a]}</p>
    <div class="p3-scheme-grid" id="p3-scheme-grid">
      ${e.map((p,h)=>`
        <button class="p3-scheme-btn${h===r?" active":""}" data-scheme-idx="${h}">
          <div class="p3-scheme-swatches">
            ${p.colors.slice(0,5).map(l=>`<div class="p3-scheme-swatch" style="background:${l};"></div>`).join("")}
          </div>
          <span>${p.name}</span>
        </button>`).join("")}
    </div>
    <div class="p3-datatype-controls">
      <label>颜色数量</label>
      <div class="p3-stepper p3-stepper-light" id="p3-data-stepper" data-min="${n.min}" data-max="${n.max}" data-value="${o}" style="flex:1;">
        <div class="p3-stepper-track"></div>
        <div class="p3-stepper-fill"></div>
      </div>
    </div>
    <div class="p3-data-chart-wrap">
      <div class="p3-data-chart-area" id="p3-data-chart-area"></div>
    </div>
  `,t.querySelectorAll(".p3-scheme-btn").forEach(p=>{p.addEventListener("click",()=>{const h=parseInt(p.dataset.schemeIdx);a==="sequential"?s.seqSchemeIdx=h:a==="diverging"?s.divSchemeIdx=h:s.qualSchemeIdx=h,V()})}),te(t.querySelector("#p3-data-stepper"),p=>{a==="sequential"?s.seqCount=p:a==="diverging"?s.divCount=p:s.qualCount=p;const h=Q(a,r,p);U(h,a)}),U(x,a)}function U(t,a){const e=document.getElementById("p3-data-chart-area");if(e)switch(a){case"sequential":z(e,t);break;case"diverging":me(e,t);break;case"qualitative":fe(e,t);break}}function ke(){const t=document.getElementById("p3-errors-grid");if(!t)return;const a=[{title:"用彩虹色显示连续数据",desc:"彩虹色没有感知上的单调亮度排序，人眼难以判断哪端更大，且对不同色觉条件的读者不友好。应改用有序的单色渐变（如 Blues）。",badFn:e=>z(e,["#FF0000","#FF7700","#FFFF00","#00FF00","#0000FF","#8B00FF"]),goodFn:e=>z(e,W[0].colors)},{title:"用定性色显示有序数据",desc:"定性配色各颜色之间无顺序关系，用在有序柱状图上会让观看者误以为各组是平等并列的。应使用连续型或单色渐变。",badFn:e=>A(e,T[0].colors.slice(0,5)),goodFn:e=>A(e,["#EFF3FF","#6BAED6","#2171B5","#084594","#041E4A"])},{title:"忽略色觉多样性",desc:"红绿配色对约 8% 的男性读者难以区分，信息可能丢失。Okabe-Ito 配色方案经专门设计，在多种色觉条件下均可清晰辨别。",badFn:e=>A(e,["#FF0000","#00CC00","#FF3333","#009900","#FF6666"]),goodFn:e=>A(e,T[1].colors.slice(0,5))}];t.innerHTML=a.map((e,r)=>`
    <div class="p3-error-card">
      <div class="p3-error-card-header">${e.title}</div>
      <div class="p3-comparison-row">
        <div class="p3-compare-half">
          <div class="p3-compare-tag bad">✕ 错误</div>
          <div class="p3-compare-chart" id="p3-err-bad-${r}"></div>
        </div>
        <div class="p3-compare-half">
          <div class="p3-compare-tag good">✓ 正确</div>
          <div class="p3-compare-chart" id="p3-err-good-${r}"></div>
        </div>
      </div>
      <div class="p3-error-desc">${e.desc}</div>
    </div>
  `).join(""),requestAnimationFrame(()=>{a.forEach((e,r)=>{const o=document.getElementById(`p3-err-bad-${r}`),n=document.getElementById(`p3-err-good-${r}`);o&&e.badFn(o),n&&e.goodFn(n)})})}function Ee(){const t=document.getElementById("p3-next-btn"),a=document.getElementById("p3-prev-btn");t&&t.addEventListener("click",()=>{try{O("m1-p4")}catch{}}),a&&a.addEventListener("click",()=>{try{O("m1-p2")}catch{}})}function Le(){re(),clearTimeout(H),s.tabInstances.forEach(a=>{try{a.destroy()}catch{}}),s.tabInstances=[],s.copyInstances.forEach(a=>{try{a.destroy()}catch{}}),s.copyInstances=[];const t=document.getElementById("p3-styles");t&&t.remove(),s.generatedColors=[],s.hslValues=[]}export{Le as destroy,qe as init,De as render};
