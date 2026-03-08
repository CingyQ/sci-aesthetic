import{k as at,g as C,f as _,s as et}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as rt}from"./index-B7QL69Hz.js";import{s as D,b as E,l as x,a as v,c as b,r as L,e as nt,p as ot}from"./transform-B0CMyjPe.js";import{r as it,c as st,b as lt,s as ct}from"./ramp-BMotAxMB.js";import{m as H}from"./max-DBeXZoyG.js";import{q as N}from"./quad-nLXVu5ve.js";import{a as W}from"./area-CnIeoxsb.js";import{c as S}from"./catmullRom-Dm0ttBHj.js";import{l as z}from"./line-rQPvecky.js";import{p as V}from"./pie-CAPf6xSx.js";import{a as Q}from"./arc-BKWW_vAI.js";import"./path-CbwjOpE9.js";import"./math-CRUJxRjv.js";var J=1.70158;(function t(r){r=+r;function a(e){return(e=+e)*e*(r*(e-1)+e)}return a.overshoot=t,a})(J);var dt=(function t(r){r=+r;function a(e){return--e*e*((e+1)*r+e)+1}return a.overshoot=t,a})(J);(function t(r){r=+r;function a(e){return((e*=2)<1?e*e*((r+1)*e-r):(e-=2)*e*((r+1)*e+r)+2)/2}return a.overshoot=t,a})(J);function pt(t){var r=0,a=t.children,e=a&&a.length;if(!e)r=1;else for(;--e>=0;)r+=a[e].value;t.value=r}function ft(){return this.eachAfter(pt)}function ht(t,r){let a=-1;for(const e of this)t.call(r,e,++a,this);return this}function mt(t,r){for(var a=this,e=[a],o,n,c=-1;a=e.pop();)if(t.call(r,a,++c,this),o=a.children)for(n=o.length-1;n>=0;--n)e.push(o[n]);return this}function gt(t,r){for(var a=this,e=[a],o=[],n,c,i,s=-1;a=e.pop();)if(o.push(a),n=a.children)for(c=0,i=n.length;c<i;++c)e.push(n[c]);for(;a=o.pop();)t.call(r,a,++s,this);return this}function ut(t,r){let a=-1;for(const e of this)if(t.call(r,e,++a,this))return e}function xt(t){return this.eachAfter(function(r){for(var a=+t(r.data)||0,e=r.children,o=e&&e.length;--o>=0;)a+=e[o].value;r.value=a})}function yt(t){return this.eachBefore(function(r){r.children&&r.children.sort(t)})}function vt(t){for(var r=this,a=bt(r,t),e=[r];r!==a;)r=r.parent,e.push(r);for(var o=e.length;t!==a;)e.splice(o,0,t),t=t.parent;return e}function bt(t,r){if(t===r)return t;var a=t.ancestors(),e=r.ancestors(),o=null;for(t=a.pop(),r=e.pop();t===r;)o=t,t=a.pop(),r=e.pop();return o}function wt(){for(var t=this,r=[t];t=t.parent;)r.push(t);return r}function kt(){return Array.from(this)}function $t(){var t=[];return this.eachBefore(function(r){r.children||t.push(r)}),t}function At(){var t=this,r=[];return t.each(function(a){a!==t&&r.push({source:a.parent,target:a})}),r}function*Et(){var t=this,r,a=[t],e,o,n;do for(r=a.reverse(),a=[];t=r.pop();)if(yield t,e=t.children)for(o=0,n=e.length;o<n;++o)a.push(e[o]);while(a.length)}function Z(t,r){t instanceof Map?(t=[void 0,t],r===void 0&&(r=Mt)):r===void 0&&(r=zt);for(var a=new T(t),e,o=[a],n,c,i,s;e=o.pop();)if((c=r(e.data))&&(s=(c=Array.from(c)).length))for(e.children=c,i=s-1;i>=0;--i)o.push(n=c[i]=new T(c[i])),n.parent=e,n.depth=e.depth+1;return a.eachBefore(Ct)}function Bt(){return Z(this).eachBefore(_t)}function zt(t){return t.children}function Mt(t){return Array.isArray(t)?t[1]:null}function _t(t){t.data.value!==void 0&&(t.value=t.data.value),t.data=t.data.data}function Ct(t){var r=0;do t.height=r;while((t=t.parent)&&t.height<++r)}function T(t){this.data=t,this.depth=this.height=0,this.parent=null}T.prototype=Z.prototype={constructor:T,count:ft,each:ht,eachAfter:gt,eachBefore:mt,find:ut,sum:xt,sort:yt,path:vt,ancestors:wt,descendants:kt,leaves:$t,links:At,copy:Bt,[Symbol.iterator]:Et};function St(t){if(typeof t!="function")throw new Error;return t}function I(){return 0}function P(t){return function(){return t}}function qt(t){t.x0=Math.round(t.x0),t.y0=Math.round(t.y0),t.x1=Math.round(t.x1),t.y1=Math.round(t.y1)}function It(t,r,a,e,o){for(var n=t.children,c,i=-1,s=n.length,d=t.value&&(e-r)/t.value;++i<s;)c=n[i],c.y0=a,c.y1=o,c.x0=r,c.x1=r+=c.value*d}function Pt(t,r,a,e,o){for(var n=t.children,c,i=-1,s=n.length,d=t.value&&(o-a)/t.value;++i<s;)c=n[i],c.x0=r,c.x1=e,c.y0=a,c.y1=a+=c.value*d}var Ht=(1+Math.sqrt(5))/2;function Dt(t,r,a,e,o,n){for(var c=[],i=r.children,s,d,p=0,f=0,l=i.length,m,h,g=r.value,u,w,B,M,k,$,q;p<l;){m=o-a,h=n-e;do u=i[f++].value;while(!u&&f<l);for(w=B=u,$=Math.max(h/m,m/h)/(g*t),q=u*u*$,k=Math.max(B/q,q/w);f<l;++f){if(u+=d=i[f].value,d<w&&(w=d),d>B&&(B=d),q=u*u*$,M=Math.max(B/q,q/w),M>k){u-=d;break}k=M}c.push(s={value:u,dice:m<h,children:i.slice(p,f)}),s.dice?It(s,a,e,o,g?e+=h*u/g:n):Pt(s,a,e,g?a+=m*u/g:o,n),g-=u,p=f}return c}const Lt=(function t(r){function a(e,o,n,c,i){Dt(r,e,o,n,c,i)}return a.ratio=function(e){return t((e=+e)>1?e:1)},a})(Ht);function Tt(){var t=Lt,r=!1,a=1,e=1,o=[0],n=I,c=I,i=I,s=I,d=I;function p(l){return l.x0=l.y0=0,l.x1=a,l.y1=e,l.eachBefore(f),o=[0],r&&l.eachBefore(qt),l}function f(l){var m=o[l.depth],h=l.x0+m,g=l.y0+m,u=l.x1-m,w=l.y1-m;u<h&&(h=u=(h+u)/2),w<g&&(g=w=(g+w)/2),l.x0=h,l.y0=g,l.x1=u,l.y1=w,l.children&&(m=o[l.depth+1]=n(l)/2,h+=d(l)-m,g+=c(l)-m,u-=i(l)-m,w-=s(l)-m,u<h&&(h=u=(h+u)/2),w<g&&(g=w=(g+w)/2),t(l,h,g,u,w))}return p.round=function(l){return arguments.length?(r=!!l,p):r},p.size=function(l){return arguments.length?(a=+l[0],e=+l[1],p):[a,e]},p.tile=function(l){return arguments.length?(t=St(l),p):t},p.padding=function(l){return arguments.length?p.paddingInner(l).paddingOuter(l):p.paddingInner()},p.paddingInner=function(l){return arguments.length?(n=typeof l=="function"?l:P(+l),p):n},p.paddingOuter=function(l){return arguments.length?p.paddingTop(l).paddingRight(l).paddingBottom(l).paddingLeft(l):p.paddingTop()},p.paddingTop=function(l){return arguments.length?(c=typeof l=="function"?l:P(+l),p):c},p.paddingRight=function(l){return arguments.length?(i=typeof l=="function"?l:P(+l),p):i},p.paddingBottom=function(l){return arguments.length?(s=typeof l=="function"?l:P(+l),p):s},p.paddingLeft=function(l){return arguments.length?(d=typeof l=="function"?l:P(+l),p):d},p}var Gt=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(st);const Wt=it(Gt),K={id:"root",question:"你的数据类型是什么？",children:[{id:"categorical",label:"分类数据",desc:"名义 / 有序类别",question:"你想表达什么关系？",children:[{id:"cat-compare",label:"比较大小",result:{name:"柱状图 / 条形图",en:"Bar Chart",icon:"▊",chartId:"bar",reason:"最直观地比较各类别数值，视觉映射清晰。避免在这里使用饼图。"}},{id:"cat-compose",label:"展示构成",result:{name:"堆叠柱状图",en:"Stacked Bar Chart",icon:"▤",chartId:"stacked-bar",reason:"展示部分与整体关系，且可比较多个时间点。优于饼图。"}},{id:"cat-rank",label:"按大小排列",result:{name:"水平条形图",en:"Horizontal Bar Chart",icon:"▬",chartId:"hbar",reason:"标签空间充足，长类别名称不会重叠，支持快速视觉排名。"}}]},{id:"numeric",label:"数值数据",desc:"连续 / 离散数值",question:"变量数量是多少？",children:[{id:"one-var",label:"单变量",question:"关注分布形态还是组间比较？",children:[{id:"one-dist",label:"分布形态",result:{name:"直方图 / 密度图",en:"Histogram / Density Plot",icon:"▲",chartId:"histogram",reason:"展示数据分布形状、中心位置和扩散程度。密度图适合叠加多组。"}},{id:"one-group",label:"组间比较",result:{name:"箱线图 / 小提琴图",en:"Boxplot / Violin Plot",icon:"⊠",chartId:"boxplot",reason:"箱线图简洁展示中位数和异常值；小提琴图还能显示分布形状。"}}]},{id:"two-var",label:"两个变量",result:{name:"散点图",en:"Scatter Plot",icon:"⋯",chartId:"scatter",reason:"展示两变量间的相关关系和分布规律，可叠加回归线和置信区间。"}},{id:"multi-var",label:"多个变量",result:{name:"热力图 / 气泡图",en:"Heatmap / Bubble Chart",icon:"▦",chartId:"heatmap",reason:"热力图适合矩阵型数据（如相关矩阵）；气泡图可同时编码三个维度。"}}]},{id:"timeseries",label:"时间序列",desc:"随时间变化的数据",question:"序列数量是多少？",children:[{id:"ts-single",label:"单条序列",result:{name:"折线图",en:"Line Chart",icon:"╱",chartId:"line",reason:"最清晰地展示单一趋势，强调变化速率。避免使用柱状图表达连续趋势。"}},{id:"ts-multi",label:"多条序列",result:{name:"多线图 / 面积图",en:"Multi-line / Area Chart",icon:"⌗",chartId:"area",reason:"多线对比趋势；面积图在强调累积量时效果更好（3条以内）。"}}]},{id:"proportion",label:"比例 / 构成",desc:"占比 / 百分比",question:"类别数量是多少？",children:[{id:"prop-few",label:"2–4 个类别",result:{name:"堆叠条形图（首选）",en:"Stacked Bar Chart",icon:"▤",chartId:"stacked-bar",reason:"比饼图更易读，尤其当各比例接近时差异更明显。"}},{id:"prop-many",label:"5+ 个类别",result:{name:"水平条形图",en:"Horizontal Bar Chart",icon:"▬",chartId:"hbar",reason:"饼图超过 5 个扇区后极难阅读，条形图长度编码更精确。"}}]}]},U=[{id:"comparison",label:"比较",color:"#7EC8E3",charts:[{id:"bar",name:"柱状图",en:"Bar Chart",use:"比较各类别的数值大小，最常用图表之一",avoid:"类别超过 15 个时，改用条形图",draw:Nt},{id:"hbar",name:"水平条形图",en:"Horizontal Bar",use:"类别名称较长、需排名对比时",avoid:"数据有时间序列时",draw:Vt},{id:"radar",name:"雷达图",en:"Radar Chart",use:"多指标综合评估，适合 5–8 个维度",avoid:"指标超过 8 个时，或需要精确读值时",draw:Qt},{id:"lollipop",name:"棒棒糖图",en:"Lollipop Chart",use:"类别较多的比较，视觉比柱状图更轻盈",avoid:"强调总量而非差异时",draw:Jt}]},{id:"distribution",label:"分布",color:"#95D5B2",charts:[{id:"histogram",name:"直方图",en:"Histogram",use:"展示连续数据的频率分布形状",avoid:"n < 30 的小样本，结果不可靠",draw:Zt},{id:"density",name:"密度图",en:"Density Plot",use:"平滑展示分布，方便叠加多组比较",avoid:"数据量极小时，曲线无意义",draw:Ut},{id:"boxplot",name:"箱线图",en:"Box Plot",use:"快速比较多组分布与异常值",avoid:"只有少数数据点时（改用抖点图）",draw:Xt},{id:"violin",name:"小提琴图",en:"Violin Plot",use:"结合箱线图和密度图，信息最丰富",avoid:"n < 50 时分布形状无统计意义",draw:Kt}]},{id:"relationship",label:"关系",color:"#B8B8E8",charts:[{id:"scatter",name:"散点图",en:"Scatter Plot",use:"两变量相关性，可叠加回归线和置信区间",avoid:"n > 10000 时需降采样或用热力图",draw:ta},{id:"heatmap",name:"热力图",en:"Heatmap",use:"矩阵数据、相关矩阵、基因表达谱",avoid:"未经色盲友好配色测试时",draw:aa},{id:"bubble",name:"气泡图",en:"Bubble Chart",use:"同时展示 x、y、大小三个维度",avoid:"气泡过多时互相遮挡，难以辨读",draw:ea},{id:"sankey",name:"桑基图",en:"Sankey Diagram",use:"展示流量或比例在不同阶段的流向",avoid:"流向关系单一时，普通图表更清晰",draw:ra}]},{id:"composition",label:"组成",color:"#F0B27A",charts:[{id:"stacked-bar",name:"堆叠柱状图",en:"Stacked Bar",use:"部分与整体，可跨时间点对比构成变化",avoid:"中间分段难以独立对比精确值",draw:na},{id:"donut",name:"圆环图",en:"Donut Chart",use:"部分与整体，中心可放总量或关键数字",avoid:"类别超过 5 个时可读性急剧下降",draw:oa},{id:"treemap",name:"树状图",en:"Treemap",use:"层级构成，面积编码比例关系",avoid:"需要精确比较大小时（面积感知不精确）",draw:ia},{id:"waffle",name:"华夫图",en:"Waffle Chart",use:"直观展示百分比，每格代表固定单位",avoid:"比例需要高精度时（最小粒度受格数限制）",draw:sa}]},{id:"trend",label:"趋势",color:"#E07A7A",charts:[{id:"line",name:"折线图",en:"Line Chart",use:"时间序列趋势，最常用、最清晰",avoid:"数据点极少（<4）时改用散点图",draw:la},{id:"area",name:"面积图",en:"Area Chart",use:"强调累积量和趋势，视觉冲击力更强",avoid:"多系列时互相遮挡（限制在 3 条以内）",draw:ca},{id:"ridgeline",name:"山脊图",en:"Ridgeline Plot",use:"多组时间序列分布对比，节省空间",avoid:"组数超过 10 时过于拥挤",draw:da},{id:"step",name:"阶梯图",en:"Step Chart",use:"离散时间点的状态突变（如存货、政策变化）",avoid:"变化连续时（改用折线图）",draw:pa}]}],X=[{id:"pie-many",tag:"饼图",tagColor:"#E07A7A",title:"饼图：类别过多",problem:"7 个扇区，最小的几乎不可见，颜色无法区分，读者无从比较大小",solution:"水平条形图：按大小排序，长度感知精确，标签空间充足",drawBad:fa,drawGood:ha},{id:"yaxis-truncate",tag:"柱状图",tagColor:"#F0B27A",title:"截断 Y 轴：放大微小差异",problem:"Y 轴从 95 开始，让仅 2% 的差异看起来像 400%，严重误导读者",solution:"Y 轴从 0 开始：差异真实呈现，读者可正确评估数据比例",drawBad:ma,drawGood:ga},{id:"dual-axis",tag:"双Y轴",tagColor:"#B8B8E8",title:"双 Y 轴：制造虚假相关",problem:'两个无关变量共享 X 轴，走势"完美重合"，暗示因果关系却可能完全偶然',solution:"拆成两张独立图表，各自用完整的 Y 轴，不强加视觉关联",drawBad:ua,drawGood:xa},{id:"scatter-line",tag:"散点图",tagColor:"#7EC8E3",title:"散点图强行连线",problem:"将离散测量点用折线连接，暗示两点之间存在连续数据，实际并不存在",solution:"保留散点，叠加回归线：诚实表达数据的稀疏性和不确定区间",drawBad:ya,drawGood:va},{id:"3d-pie",tag:"3D图表",tagColor:"#95D5B2",title:"3D 图表：透视扭曲感知",problem:"3D 透视使前方扇区看起来比实际更大，视觉占比与真实占比严重不符",solution:"平面 2D 圆环图：面积分配客观，减少类别时才考虑使用",drawBad:ba,drawGood:wa},{id:"line-category",tag:"折线图",tagColor:"#F0D264",title:"折线图连接无序类别",problem:'用折线连接"北京、上海、广州..."等无时间顺序的城市，暗示不存在的趋势',solution:'柱状图：无序类别之间没有"中间值"，折线的斜率无意义',drawBad:ka,drawGood:$a}];let A={treePath:[],activeGroup:"comparison",resizeHandlers:[]};function La(){return`
<div class="page-scroll">
<style>
/* ══ p05 scoped styles ══ */
.p5-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark); display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
@keyframes p5-glow-a {
  0%,100% { transform:translate(0,0) scale(1); opacity:0.8; }
  33% { transform:translate(-3%,2%) scale(1.05); opacity:1; }
  66% { transform:translate(4%,-1%) scale(0.95); opacity:0.6; }
}
@keyframes p5-glow-b {
  0%,100% { transform:translate(0,0); opacity:0.4; }
  50% { transform:translate(5%,4%); opacity:0.8; }
}
.p5-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 60% 50% at 45% 38%, rgba(126,200,227,0.11) 0%, transparent 65%);
  pointer-events:none;
  animation:p5-glow-a 13s ease-in-out infinite;
}
.p5-hero::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 35% 40% at 75% 62%, rgba(184,184,232,0.07) 0%, transparent 60%);
  pointer-events:none;
  animation:p5-glow-b 16s ease-in-out infinite;
}
.p5-eyebrow {
  /* 使用全局 .hero-eyebrow 基础样式 */
}
.p5-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-0.02em; line-height:1.1; color:var(--text-on-dark);
}
.p5-hero-sub {
  font-family:var(--font-heading); font-size:clamp(1rem,2vw,1.4rem);
  font-weight:300; color:var(--text-on-dark); opacity:0.5;
  max-width:600px; line-height:1.4; text-align:center; margin-top:var(--space-xs);
}
.p5-hero-tagline {
  font-family:var(--font-body); font-size:var(--text-body);
  color:var(--text-on-dark-2); max-width:540px; line-height:1.8;
  margin-top:var(--space-sm); text-align:center;
}
.p5-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p5-float 2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p5-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* Section headers */
.p5-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p5-sec-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-0.02em;
}
.p5-sec-desc {
  font-size:1.05rem; line-height:1.7; max-width:640px;
  margin:var(--space-sm) auto 0;
}

/* ── 决策树 section ── */
.p5-dt-section {
  background:var(--bg-light); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-dt-section .p5-sec-desc { color:var(--text-on-light-2); }
.p5-dt-wrap { max-width:760px; margin:0 auto; display:flex; flex-direction:column; gap:var(--space-lg); }

.p5-breadcrumb {
  display:flex; align-items:center; gap:8px; flex-wrap:wrap;
  justify-content:center; font-size:0.85rem; color:var(--text-on-light-2); min-height:28px;
}
.p5-bc-item {
  padding:4px 14px; background:var(--bg-light-alt);
  border-radius:var(--radius-full); border:1px solid var(--border-light);
  cursor:pointer; transition:all var(--t-fast);
}
.p5-bc-item:hover { border-color:var(--accent); color:var(--accent); }
.p5-bc-sep { color:var(--text-on-light-3); }

/* 问题卡片 */
.p5-q-card {
  background:var(--bg-dark); color:var(--text-on-dark);
  border-radius:var(--radius-lg); padding:var(--space-lg); text-align:center;
}
.p5-q-step {
  font-family:var(--font-code); font-size:var(--text-caption);
  color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:12px;
}
.p5-q-text {
  font-family:var(--font-display); font-size:clamp(1.2rem,2.5vw,1.65rem);
  font-weight:700; margin-bottom:var(--space-md);
}
.p5-opts { display:flex; flex-wrap:wrap; gap:12px; justify-content:center; }
.p5-opt-btn {
  padding:14px 22px; min-height:52px;
  background:rgba(255,255,255,0.05); border:1.5px solid rgba(255,255,255,0.14);
  border-radius:var(--radius-full); color:var(--text-on-dark);
  cursor:pointer; font-family:var(--font-heading); font-size:0.92rem;
  transition:all 0.25s var(--ease-apple);
  display:flex; flex-direction:column; align-items:center; gap:2px;
}
.p5-opt-btn .opt-sub { font-size:0.72rem; color:var(--text-on-dark-3); }
.p5-opt-btn:hover { background:rgba(126,200,227,0.1); border-color:var(--accent); transform:translateY(-2px); }
.p5-opt-btn:active { transform:scale(0.97); }

/* 结果卡片 */
.p5-res-card {
  background:linear-gradient(135deg,#1a2a3a 0%,#0d1a1f 100%);
  border:1.5px solid rgba(126,200,227,0.3);
  border-radius:var(--radius-lg); padding:var(--space-lg);
  text-align:center; color:var(--text-on-dark);
  animation:p5-res-in 0.5s var(--ease-out);
}
@keyframes p5-res-in { from{opacity:0;transform:scale(0.95) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
.p5-res-icon { font-size:2.5rem; color:var(--accent); margin-bottom:10px; }
.p5-res-name { font-family:var(--font-display); font-size:1.9rem; font-weight:700; color:var(--accent); }
.p5-res-en { font-family:var(--font-code); font-size:0.8rem; color:var(--text-on-dark-3); margin:4px 0 14px; }
.p5-res-reason { font-size:0.96rem; color:var(--text-on-dark-2); line-height:1.7; max-width:440px; margin:0 auto 20px; }
.p5-res-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
.p5-btn-reset {
  padding:11px 24px; min-height:44px;
  background:transparent; border:1.5px solid var(--border-dark);
  border-radius:var(--radius-full); color:var(--text-on-dark-2);
  cursor:pointer; font-family:var(--font-heading); font-size:0.88rem; transition:all var(--t-fast);
}
.p5-btn-reset:hover { border-color:var(--accent); color:var(--accent); }
.p5-btn-gallery {
  padding:11px 24px; min-height:44px;
  background:var(--accent); border:none; border-radius:var(--radius-full);
  color:#1d1d1f; cursor:pointer; font-family:var(--font-heading); font-size:0.88rem; font-weight:600;
  transition:all var(--t-fast);
}
.p5-btn-gallery:hover { background:var(--accent-hover); transform:translateY(-1px); }

/* 树可视化 */
.p5-tree-viz { width:100%; max-width:760px; }
.p5-tree-svg { width:100%; height:auto; }

/* ── 图表全览 ── */
.p5-gallery-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-gallery-section .p5-sec-desc { color:var(--text-on-dark-2); }
.p5-gallery-wrap { max-width:var(--w-full); margin:0 auto; }

.p5-group-tabs {
  display:flex; gap:8px; margin-bottom:var(--space-xl);
  overflow-x:auto; scrollbar-width:none; -webkit-overflow-scrolling:touch; padding-bottom:4px;
}
.p5-group-tabs::-webkit-scrollbar { display:none; }
.p5-gtab {
  padding:10px 20px; min-height:44px; flex-shrink:0;
  background:rgba(255,255,255,0.04); border:1.5px solid var(--border-dark);
  border-radius:var(--radius-full); color:var(--text-on-dark-2);
  cursor:pointer; font-family:var(--font-heading); font-size:0.88rem;
  transition:all var(--t-fast); display:flex; align-items:center; gap:8px;
}
.p5-gtab .tdot { width:7px; height:7px; border-radius:50%; background:currentColor; opacity:0.5; }
.p5-gtab:hover { border-color:rgba(255,255,255,0.3); color:var(--text-on-dark); }
.p5-gtab.active { border-color:var(--tc); color:var(--tc); background:rgba(126,200,227,0.05); }
.p5-gtab.active .tdot { opacity:1; background:var(--tc); }

/* browser-layout */
.p5-browser { display:flex; gap:var(--space-xl); align-items:flex-start; }
.p5-chart-list { flex:0 0 35%; min-width:0; display:flex; flex-direction:column; gap:10px; }
.p5-ci {
  padding:15px 20px; border-radius:var(--radius-md); border:1.5px solid var(--border-dark);
  cursor:pointer; transition:all var(--t-fast); background:rgba(255,255,255,0.02);
}
.p5-ci:hover { border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.04); }
.p5-ci.active { border-color:var(--ic); background:rgba(126,200,227,0.05); }
.p5-ci-name { font-family:var(--font-heading); font-size:0.96rem; font-weight:600; color:var(--text-on-dark); }
.p5-ci.active .p5-ci-name { color:var(--ic); }
.p5-ci-en { font-family:var(--font-code); font-size:0.72rem; color:var(--text-on-dark-3); margin-top:2px; }

.p5-preview-panel { flex:1; min-width:0; }
.p5-preview-sticky { position:sticky; top:80px; }
.p5-preview-box {
  background:#111418; border-radius:var(--radius-lg); padding:var(--space-md);
  border:1px solid var(--border-dark); overflow:hidden;
}
.p5-preview-box svg { width:100%; height:auto; display:block; }
.p5-preview-info { margin-top:var(--space-md); }
.p5-pv-name { font-family:var(--font-display); font-size:1.4rem; font-weight:700; color:var(--text-on-dark); }
.p5-pv-en { font-family:var(--font-code); font-size:0.75rem; color:var(--text-on-dark-3); margin:3px 0 12px; }
.p5-pv-row { display:flex; gap:var(--space-md); flex-wrap:wrap; }
.p5-pv-block { flex:1; min-width:0; }
.p5-pv-label { font-size:0.7rem; font-family:var(--font-code); color:var(--accent); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:4px; }
.p5-pv-text { font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.5; }

/* ── 误用合集 ── */
.p5-misuse-section {
  background:var(--bg-light-alt); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p5-misuse-section .p5-sec-desc { color:var(--text-on-light-2); }
.p5-misuse-wrap { max-width:var(--w-full); margin:0 auto; }
.p5-misuse-intro {
  background:#fff; border:1px solid var(--border-light); border-radius:var(--radius-lg);
  padding:var(--space-md) var(--space-lg); display:flex; gap:var(--space-md);
  align-items:flex-start; margin-bottom:var(--space-xl);
  box-shadow:var(--shadow-sm);
}
.p5-misuse-intro-icon { font-size:1.6rem; flex-shrink:0; margin-top:2px; }
.p5-misuse-intro-text { font-size:0.95rem; line-height:1.7; color:var(--text-on-light-2); }
.p5-misuse-intro-text strong { color:var(--text-on-light); font-weight:700; }
.p5-misuse-grid { display:flex; flex-direction:column; gap:var(--space-xl); }
.p5-case {
  background:white; border-radius:var(--radius-lg); overflow:hidden;
  border:1px solid var(--border-light); box-shadow:var(--shadow-md);
}
.p5-case-hdr {
  padding:14px 24px; border-bottom:1px solid var(--border-light);
  display:flex; align-items:center; gap:12px;
}
.p5-case-tag {
  padding:3px 10px; border-radius:var(--radius-full);
  font-size:0.72rem; font-weight:700; letter-spacing:0.05em; flex-shrink:0;
  color:white;
}
.p5-case-title { font-family:var(--font-display); font-size:1.1rem; font-weight:700; }
.p5-case-body { display:flex; }
.p5-case-side { flex:1; padding:var(--space-md); display:flex; flex-direction:column; gap:10px; }
.p5-case-side:first-child { border-right:1px solid var(--border-light); }
.p5-badge {
  display:inline-flex; align-items:center; gap:6px;
  padding:4px 12px; border-radius:var(--radius-full);
  font-size:0.72rem; font-weight:700; letter-spacing:0.05em;
}
.p5-badge-bad { background:#fff0f0; color:#c53030; }
.p5-badge-good { background:#f0fff4; color:#276749; }
.p5-case-side svg { width:100%; height:auto; }
.p5-case-note { font-size:0.85rem; line-height:1.5; margin-top:auto; }
.p5-case-note-bad { color:#c53030; }
.p5-case-note-good { color:#276749; }

/* footer nav uses global btn-primary / btn-ghost */
/* footer uses global .page-footer-cta */

/* ── 响应式 ── */
@media (max-width:900px) {
  .p5-browser { flex-direction:column; }
  .p5-chart-list { flex:none; width:100%; }
  .p5-preview-sticky { position:static; }
}
@media (max-width:768px) {
  .p5-dt-section,.p5-gallery-section,.p5-misuse-section { padding:var(--space-xl) var(--space-sm); }
  .p5-opts { flex-direction:column; align-items:stretch; }
  .p5-opt-btn { width:100%; justify-content:center; }
  .p5-case-body { flex-direction:column; }
  .p5-case-side:first-child { border-right:none; border-bottom:1px solid var(--border-light); }
  /* footer nav uses global .page-footer-nav */
  .p5-res-actions { flex-direction:column; align-items:center; }
  .p5-group-tabs { gap:6px; }
  .p5-gtab { padding:8px 14px; font-size:0.8rem; }
}
</style>

<!-- HERO -->
<section id="p5-hero" class="p5-hero section-dark section-hero-full" style="scroll-margin-top:56px;">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p5-eyebrow" id="p5-eyebrow" style="opacity:0;">Module 01 / Page 05</p>
    <h1 class="page-hero-title p5-hero-title" id="p5-hero-title" style="color:var(--text-on-dark);opacity:0;">图表选择指南</h1>
    <p class="page-hero-sub p5-hero-sub" id="p5-hero-sub" style="opacity:0;">Chart Selection Guide</p>
    <p class="p5-hero-tagline" id="p5-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">
      面对数据时，如何快速选对图表？从决策树到完整图表库，帮你科学决策。
    </p>
    <nav class="hero-quicknav" id="p5-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p5-decision">交互式决策树</button>
      <button class="hero-quicknav__item" data-target="#p5-gallery">图表类型全览</button>
      <button class="hero-quicknav__item" data-target="#p5-misuse">误用案例合集</button>
    </nav>
    <p class="p5-scroll-hint">↓ 向下探索</p>
  </div>
</section>

<!-- 决策树 -->
<section id="p5-decision" class="p5-dt-section" style="scroll-margin-top:56px;">
  <div class="p5-sec-hdr" id="p5-dt-hdr">
    <h2 class="p5-sec-title">交互式图表决策树</h2>
    <p class="p5-sec-desc">回答关于数据的几个问题，获得精准的图表推荐。</p>
  </div>
  <div class="p5-dt-wrap">
    <div class="p5-breadcrumb" id="p5-bc"></div>
    <div id="p5-q-area"></div>
    <div class="p5-tree-viz" id="p5-tree-viz"></div>
  </div>
</section>

<!-- 图表全览 -->
<section id="p5-gallery" class="p5-gallery-section" style="scroll-margin-top:56px;">
  <div class="p5-gallery-wrap">
    <div class="p5-sec-hdr" id="p5-gallery-hdr">
      <h2 class="p5-sec-title">20+ 图表类型全览</h2>
      <p class="p5-sec-desc">按用途分 5 组，每种图表含 D3 示例预览与使用说明。</p>
    </div>
    <div class="p5-group-tabs" id="p5-gtabs">
      ${U.map(t=>`
        <button class="p5-gtab" data-group="${t.id}" style="--tc:${t.color}">
          <span class="tdot"></span>${t.label}（${t.charts.length}）
        </button>
      `).join("")}
    </div>
    <div class="p5-browser">
      <div class="p5-chart-list" id="p5-chart-list"></div>
      <div class="p5-preview-panel">
        <div class="p5-preview-sticky">
          <div class="p5-preview-box" id="p5-preview-box">
            <svg id="p5-preview-svg" viewBox="0 0 400 260"></svg>
          </div>
          <div class="p5-preview-info" id="p5-preview-info"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 误用合集 -->
<section id="p5-misuse" class="p5-misuse-section" style="scroll-margin-top:56px;">
  <div class="p5-misuse-wrap">
    <div class="p5-sec-hdr" id="p5-misuse-hdr">
      <h2 class="p5-sec-title">图表误用合集</h2>
      <p class="p5-sec-desc">6 种科研图表中最高频的误用模式，每个附有 D3 对比演示与修正建议。</p>
    </div>
    <div class="p5-misuse-intro" id="p5-misuse-intro">
      <div class="p5-misuse-intro-icon">🔍</div>
      <div class="p5-misuse-intro-text">
        <strong>图表误用的核心问题</strong>不是图表本身，而是图表与数据、意图不匹配。
        同一种图表，在一个场景里是最佳选择，在另一个场景里就会严重误导读者。
        识别这些模式，能让你的图表既诚实又有说服力。
      </div>
    </div>
    <div class="p5-misuse-grid" id="p5-misuse-grid"></div>
  </div>
</section>

<!-- Footer CTA -->
<section id="p5-footer" class="page-footer-cta" style="scroll-margin-top:56px;">
  <p class="page-footer-num">05 / 10</p>
  <h2 class="page-footer-quote">选好图表，让数据开口说话</h2>
  <p class="page-footer-desc">掌握了图表选择的原则，接下来学习 ggplot2 的图层语法——精准控制图表每一个视觉细节。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" onclick="window._p5nav('m1-p4')">← 色彩与阅读无障碍</button>
    <button class="btn-primary" onclick="window._p5nav('m1-p6')">ggplot2 图层语法 →</button>
  </div>
</section>

</div>`}function Ta(){window._p5nav=rt,C.fromTo("#p5-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,delay:.1,ease:"power3.out"}),C.fromTo("#p5-hero-title",{opacity:0,y:30},{opacity:1,y:0,duration:.8,delay:.25,ease:"power3.out"}),C.fromTo("#p5-hero-sub",{opacity:0,y:20},{opacity:.5,y:0,duration:.8,delay:.4,ease:"power3.out"}),C.fromTo("#p5-hero-tagline",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.55,ease:"power3.out"}),C.fromTo("#p5-quicknav",{opacity:0,y:20},{opacity:1,y:0,duration:.8,delay:.7,ease:"power3.out"}),document.querySelectorAll("#p5-quicknav .hero-quicknav__item").forEach(t=>{t.addEventListener("click",()=>{document.querySelector(t.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),_("#p5-dt-hdr",{y:40,stagger:0}),_("#p5-gallery-hdr",{y:40,stagger:0}),_("#p5-misuse-hdr",{y:40,stagger:0}),_("#p5-footer-title",{y:30,stagger:0}),_("#p5-footer-desc",{y:20,stagger:0}),_("#p5-misuse-intro",{y:30,stagger:0}),jt(),Ft(),Ot()}function jt(){A.treePath=[],j(),G()}function tt(t){let r=K;for(const a of t)r=(r.children||[]).find(e=>e.id===a)||r;return r}function j(){const t=tt(A.treePath),r=document.getElementById("p5-q-area");if(r)if(t.result){const a=t.result;r.innerHTML=`
      <div class="p5-res-card">
        <div class="p5-res-icon">${a.icon}</div>
        <div class="p5-res-name">${a.name}</div>
        <div class="p5-res-en">${a.en}</div>
        <p class="p5-res-reason">${a.reason}</p>
        <div class="p5-res-actions">
          <button class="p5-btn-reset" id="p5-reset">重新选择</button>
          <button class="p5-btn-gallery" id="p5-go-gallery">在图表库中查看 →</button>
        </div>
      </div>`,document.getElementById("p5-reset")?.addEventListener("click",()=>{A.treePath=[],R(),G(),Y()}),document.getElementById("p5-go-gallery")?.addEventListener("click",()=>{document.getElementById("p5-gallery")?.scrollIntoView({behavior:"smooth"}),a.chartId&&setTimeout(()=>Yt(a.chartId),600)})}else r.innerHTML=`
      <div class="p5-q-card">
        <div class="p5-q-step">问题 ${A.treePath.length+1}</div>
        <div class="p5-q-text">${t.question}</div>
        <div class="p5-opts">
          ${(t.children||[]).map(a=>`
            <button class="p5-opt-btn" data-id="${a.id}">
              <span>${a.label}</span>
              ${a.desc?`<span class="opt-sub">${a.desc}</span>`:""}
            </button>`).join("")}
        </div>
      </div>`,r.querySelectorAll(".p5-opt-btn").forEach(a=>{a.addEventListener("click",()=>{A.treePath.push(a.dataset.id),R(),G(),Y()})})}function R(){const t=document.querySelector(".p5-q-card, .p5-res-card");t?C.to(t,{opacity:0,x:-30,duration:.2,ease:"power2.in",onComplete:()=>{j(),C.fromTo(".p5-q-card, .p5-res-card",{opacity:0,x:30},{opacity:1,x:0,duration:.35,ease:"power2.out"})}}):j()}function Y(){const t=document.getElementById("p5-bc");if(!t)return;if(!A.treePath.length){t.innerHTML="";return}let r="";for(let a=0;a<A.treePath.length;a++){const o=(tt(A.treePath.slice(0,a)).children||[]).find(c=>c.id===A.treePath[a]);a>0&&(r+='<span class="p5-bc-sep">›</span>');const n=JSON.stringify(A.treePath.slice(0,a));r+=`<span class="p5-bc-item" data-snap='${n}'>${o?.label||A.treePath[a]}</span>`}t.innerHTML=r,t.querySelectorAll(".p5-bc-item").forEach(a=>{a.addEventListener("click",()=>{A.treePath=JSON.parse(a.dataset.snap),R(),G(),Y()})})}function G(){const t=document.getElementById("p5-tree-viz");if(!t)return;const r=window.innerWidth<768,a=Math.min(t.clientWidth||700,760),e=r?180:240;t.innerHTML="";const o=D(t).append("svg").attr("viewBox",`0 0 ${a} ${e}`).attr("class","p5-tree-svg").attr("preserveAspectRatio","xMidYMid meet");o.append("rect").attr("width",a).attr("height",e).attr("fill","#f0f0f2").attr("rx",12);const n=["开始",...Rt()],c=r?4:6,i=n.slice(-c),s=i.length,d=r?40:60,p=s>1?(a-2*d)/(s-1):0,f=i.map((l,m)=>({label:l.length>6?l.slice(0,6)+"…":l,x:s===1?a/2:d+m*p,y:e/2}));for(let l=0;l<f.length-1;l++){const m=f[l],h=f[l+1],g=o.append("path").attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2).attr("d",`M${m.x},${m.y} C${(m.x+h.x)/2},${m.y} ${(m.x+h.x)/2},${h.y} ${h.x},${h.y}`),u=g.node().getTotalLength();g.attr("stroke-dasharray",u).attr("stroke-dashoffset",u).transition().duration(500).ease(N).attr("stroke-dashoffset",0)}f.forEach((l,m)=>{const h=m===f.length-1,g=o.append("g").attr("transform",`translate(${l.x},${l.y})`);g.append("circle").attr("r",0).attr("fill",h?"#7EC8E3":"#1d1d1f").attr("stroke","#7EC8E3").attr("stroke-width",2).transition().delay(m*100).duration(350).ease(dt.overshoot(1.5)).attr("r",h?13:9),g.append("text").attr("text-anchor","middle").attr("dy",r?24:28).attr("font-size",r?"9px":"10px").attr("fill","#555").attr("font-family","var(--font-heading)").text(l.label).style("opacity",0).transition().delay(m*100+200).duration(250).style("opacity",1)})}function Rt(){const t=[];let r=K;for(const a of A.treePath){const e=(r.children||[]).find(o=>o.id===a);e&&(t.push(e.label),r=e)}return r.result&&t.push(r.result.name.split("（")[0].split(" / ")[0]),t}function Yt(t){const r=U.find(n=>n.charts.some(c=>c.id===t));if(!r)return;F(r.id);const a=document.getElementById("p5-chart-list"),e=a?.querySelector(`[data-cid="${t}"]`);if(!e)return;a.querySelectorAll(".p5-ci").forEach(n=>n.classList.remove("active")),e.classList.add("active");const o=r.charts.find(n=>n.id===t);o&&O(o,r.color),e.scrollIntoView({behavior:"smooth",block:"nearest"}),e.style.transition="box-shadow 0.3s",e.style.boxShadow=`0 0 0 3px ${r.color}`,setTimeout(()=>{e.style.boxShadow=""},1600)}function Ft(){document.querySelectorAll(".p5-gtab").forEach(t=>{t.addEventListener("click",()=>F(t.dataset.group))}),F("comparison"),et("#p5-gallery .p5-browser",{scale:.97})}function F(t){A.activeGroup=t;const r=U.find(e=>e.id===t);if(!r)return;document.querySelectorAll(".p5-gtab").forEach(e=>e.classList.toggle("active",e.dataset.group===t));const a=document.getElementById("p5-chart-list");a&&(a.innerHTML=r.charts.map(e=>`
    <div class="p5-ci" data-cid="${e.id}" style="--ic:${r.color}">
      <div class="p5-ci-name">${e.name}</div>
      <div class="p5-ci-en">${e.en}</div>
    </div>`).join(""),a.querySelectorAll(".p5-ci").forEach(e=>{e.addEventListener("click",()=>{a.querySelectorAll(".p5-ci").forEach(n=>n.classList.remove("active")),e.classList.add("active");const o=r.charts.find(n=>n.id===e.dataset.cid);o&&O(o,r.color)})}),a.querySelector(".p5-ci")?.classList.add("active"),r.charts[0]&&O(r.charts[0],r.color))}function O(t,r){const a=document.getElementById("p5-preview-svg"),e=document.getElementById("p5-preview-info");if(!a||!e)return;const o=D(a);o.selectAll("*").remove(),o.append("rect").attr("width",400).attr("height",260).attr("fill","#111418").attr("rx",8),t.draw&&t.draw(o,r),e.innerHTML=`
    <div class="p5-pv-name">${t.name}</div>
    <div class="p5-pv-en">${t.en}</div>
    <div class="p5-pv-row">
      <div class="p5-pv-block"><div class="p5-pv-label">适用场景</div><div class="p5-pv-text">${t.use}</div></div>
      <div class="p5-pv-block"><div class="p5-pv-label">避免使用</div><div class="p5-pv-text">${t.avoid}</div></div>
    </div>`}function Ot(){const t=document.getElementById("p5-misuse-grid");t&&(t.innerHTML=X.map((r,a)=>`
    <div class="p5-case" id="p5-case-${a}">
      <div class="p5-case-hdr">
        <span class="p5-case-tag" style="background:${r.tagColor}">${r.tag}</span>
        <div class="p5-case-title">${r.title}</div>
      </div>
      <div class="p5-case-body">
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-bad">✗ 误用示例</div>
          <svg id="pc-bad-${a}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-bad">⚠ ${r.problem}</div>
        </div>
        <div class="p5-case-side">
          <div class="p5-badge p5-badge-good">✓ 推荐替代</div>
          <svg id="pc-good-${a}" viewBox="0 0 280 200"></svg>
          <div class="p5-case-note p5-case-note-good">✓ ${r.solution}</div>
        </div>
      </div>
    </div>`).join(""),X.forEach((r,a)=>{r.drawBad(D(`#pc-bad-${a}`)),r.drawGood(D(`#pc-good-${a}`)),_(`#p5-case-${a}`,{y:40,stagger:0})}))}function y(t){t.selectAll(".domain").attr("stroke","#3a3a3a"),t.selectAll(".tick line").attr("stroke","#3a3a3a"),t.selectAll(".tick text").attr("fill","#888").attr("font-size","10px").attr("font-family","var(--font-heading)")}function Nt(t,r){const a=[{c:"A",v:82},{c:"B",v:56},{c:"C",v:67},{c:"D",v:43},{c:"E",v:91}],e={t:30,r:30,b:48,l:48},o=400-e.l-e.r,n=260-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=E().domain(a.map(d=>d.c)).range([0,o]).padding(.35),s=x().domain([0,100]).range([n,0]);c.append("g").attr("transform",`translate(0,${n})`).call(v(i).tickSize(0)).call(y),c.append("g").call(b(s).ticks(4)).call(y),c.selectAll("rect").data(a).join("rect").attr("x",d=>i(d.c)).attr("width",i.bandwidth()).attr("y",n).attr("height",0).attr("fill",r).attr("opacity",.85).attr("rx",3).transition().duration(600).delay((d,p)=>p*80).ease(N).attr("y",d=>s(d.v)).attr("height",d=>n-s(d.v))}function Vt(t,r){const a=[{c:"Group A",v:78},{c:"Group B",v:54},{c:"Group C",v:92},{c:"Group D",v:36},{c:"Group E",v:65}],e={t:20,r:30,b:28,l:64},o=400-e.l-e.r,n=260-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=E().domain(a.map(d=>d.c)).range([0,n]).padding(.3),s=x().domain([0,100]).range([0,o]);c.append("g").call(b(i).tickSize(0)).call(y),c.selectAll("rect").data(a).join("rect").attr("y",d=>i(d.c)).attr("height",i.bandwidth()).attr("x",0).attr("width",0).attr("fill",r).attr("opacity",.85).attr("rx",3).transition().duration(600).delay((d,p)=>p*80).attr("width",d=>s(d.v))}function Qt(t,r){const a=["样本量","精确度","召回率","F1分数","速度"],e=[.8,.7,.85,.75,.6],o=200,n=130,c=85,i=a.length,s=2*Math.PI/i,d=(f,l)=>({x:o+l*Math.sin(f*s),y:n-l*Math.cos(f*s)});[.25,.5,.75,1].forEach(f=>{t.append("polygon").attr("points",a.map((l,m)=>{const h=d(m,c*f);return`${h.x},${h.y}`}).join(" ")).attr("fill","none").attr("stroke","#333").attr("stroke-width",1)}),a.forEach((f,l)=>{const m=d(l,c),h=d(l,c+13);t.append("line").attr("x1",o).attr("y1",n).attr("x2",m.x).attr("y2",m.y).attr("stroke","#333").attr("stroke-width",1),t.append("text").attr("x",h.x).attr("y",h.y).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text(a[l])});const p=e.map((f,l)=>d(l,c*f));t.append("polygon").attr("points",p.map(f=>`${f.x},${f.y}`).join(" ")).attr("fill",r).attr("opacity",.25).attr("stroke",r).attr("stroke-width",2),p.forEach(f=>t.append("circle").attr("cx",f.x).attr("cy",f.y).attr("r",4).attr("fill",r).attr("stroke","#111418").attr("stroke-width",2))}function Jt(t,r){const a=[{c:"A",v:72},{c:"B",v:45},{c:"C",v:88},{c:"D",v:31},{c:"E",v:64}],e={t:30,r:30,b:48,l:48},o=400-e.l-e.r,n=260-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=E().domain(a.map(d=>d.c)).range([0,o]).padding(.4),s=x().domain([0,100]).range([n,0]);c.append("g").attr("transform",`translate(0,${n})`).call(v(i).tickSize(0)).call(y),c.append("g").call(b(s).ticks(4)).call(y),c.selectAll(".stem").data(a).join("line").attr("x1",d=>i(d.c)+i.bandwidth()/2).attr("x2",d=>i(d.c)+i.bandwidth()/2).attr("y1",n).attr("y2",n).attr("stroke",r).attr("stroke-width",2).attr("opacity",.6).transition().duration(500).delay((d,p)=>p*80).attr("y2",d=>s(d.v)),c.selectAll(".candy").data(a).join("circle").attr("cx",d=>i(d.c)+i.bandwidth()/2).attr("cy",n).attr("r",0).attr("fill",r).transition().duration(400).delay((d,p)=>p*80+300).attr("cy",d=>s(d.v)).attr("r",7)}function Zt(t,r){let a=42;const e=()=>(a=(a*9301+49297)%233280,a/233280),o=Array.from({length:80},()=>{let l=e(),m=e();return Math.sqrt(-2*Math.log(l))*Math.cos(2*Math.PI*m)*15+60}),n={t:28,r:28,b:48,l:48},c=400-n.l-n.r,i=260-n.t-n.b,s=t.append("g").attr("transform",`translate(${n.l},${n.t})`),d=x().domain([0,100]).range([0,c]),p=lt().domain(d.domain()).thresholds(d.ticks(12))(o),f=x().domain([0,H(p,l=>l.length)]).nice().range([i,0]);s.append("g").attr("transform",`translate(0,${i})`).call(v(d).ticks(6)).call(y),s.append("g").call(b(f).ticks(4)).call(y),s.selectAll("rect").data(p).join("rect").attr("x",l=>d(l.x0)+1).attr("width",l=>Math.max(0,d(l.x1)-d(l.x0)-2)).attr("y",i).attr("height",0).attr("fill",r).attr("opacity",.82).attr("rx",2).transition().duration(600).delay((l,m)=>m*25).attr("y",l=>f(l.length)).attr("height",l=>i-f(l.length))}function Ut(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=x().domain([0,100]).range([0,e]),i=(h,g,u)=>Math.exp(-.5*((h-g)/u)**2)/(u*Math.sqrt(2*Math.PI)),s=L(0,101,2).map(h=>({x:h,y:i(h,42,12)})),d=L(0,101,2).map(h=>({x:h,y:i(h,68,10)})),p=Math.max(H(s,h=>h.y),H(d,h=>h.y)),f=x().domain([0,p*1.1]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(c).ticks(6)).call(y);const l=W().x(h=>c(h.x)).y0(o).y1(h=>f(h.y)).curve(S),m=z().x(h=>c(h.x)).y(h=>f(h.y)).curve(S);[[s,r],[d,"#95D5B2"]].forEach(([h,g])=>{n.append("path").datum(h).attr("fill",g).attr("opacity",.2).attr("d",l),n.append("path").datum(h).attr("fill","none").attr("stroke",g).attr("stroke-width",2.5).attr("d",m)})}function Xt(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=["Control","Treat A","Treat B"],i=[{min:20,q1:35,med:52,q3:68,max:85},{min:35,q1:55,med:70,q3:80,max:95},{min:15,q1:28,med:42,q3:58,max:72}],s=E().domain(c).range([0,e]).padding(.4),d=x().domain([0,100]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(s).tickSize(0)).call(y),n.append("g").call(b(d).ticks(4)).call(y),i.forEach((p,f)=>{const l=s(c[f])+s.bandwidth()/2,m=s.bandwidth(),h=[r,"#95D5B2","#B8B8E8"][f];n.append("line").attr("x1",l).attr("x2",l).attr("y1",d(p.min)).attr("y2",d(p.max)).attr("stroke",h).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),n.append("rect").attr("x",s(c[f])).attr("width",m).attr("y",d(p.q3)).attr("height",d(p.q1)-d(p.q3)).attr("fill",h).attr("opacity",.3).attr("stroke",h).attr("stroke-width",1.5).attr("rx",2),n.append("line").attr("x1",s(c[f])).attr("x2",s(c[f])+m).attr("y1",d(p.med)).attr("y2",d(p.med)).attr("stroke",h).attr("stroke-width",2.5)})}function Kt(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=["Group A","Group B","Group C"],i=[{mu:50,sigma:15},{mu:72,sigma:10},{mu:35,sigma:20}],s=E().domain(c).range([0,e]).padding(.35),d=[r,"#95D5B2","#B8B8E8"];n.append("g").attr("transform",`translate(0,${o})`).call(v(s).tickSize(0)).call(y),i.forEach((p,f)=>{const l=s(c[f])+s.bandwidth()/2,m=s.bandwidth()/2*.8,h=$=>Math.exp(-.5*(($-p.mu)/p.sigma)**2)/(p.sigma*Math.sqrt(2*Math.PI)),g=L(5,96,2),u=H(g,$=>h($)),w=g.map($=>({y:$,d:h($)/u*m})),B=x().domain([0,100]).range([o,0]),M=w.map($=>[l+$.d,B($.y)]),k=[...w].reverse().map($=>[l-$.d,B($.y)]);n.append("polygon").attr("points",[...M,...k].map($=>$.join(",")).join(" ")).attr("fill",d[f]).attr("opacity",.4).attr("stroke",d[f]).attr("stroke-width",1.5),n.append("line").attr("x1",l-m*.5).attr("x2",l+m*.5).attr("y1",B(p.mu)).attr("y2",B(p.mu)).attr("stroke",d[f]).attr("stroke-width",2)})}function ta(t,r){let a=42;const e=()=>(a=(a*9301+49297)%233280,a/233280),o=Array.from({length:40},()=>{const f=e()*80+10;return{x:f,y:f*.6+e()*28+5}}),n={t:28,r:28,b:48,l:48},c=400-n.l-n.r,i=260-n.t-n.b,s=t.append("g").attr("transform",`translate(${n.l},${n.t})`),d=x().domain([0,100]).range([0,c]),p=x().domain([0,100]).range([i,0]);s.append("g").attr("transform",`translate(0,${i})`).call(v(d).ticks(5)).call(y),s.append("g").call(b(p).ticks(4)).call(y),s.append("line").attr("x1",d(0)).attr("y1",p(8)).attr("x2",d(100)).attr("y2",p(68)).attr("stroke",r).attr("stroke-width",1.5).attr("opacity",.4).attr("stroke-dasharray","5,3"),s.selectAll("circle").data(o).join("circle").attr("cx",f=>d(f.x)).attr("cy",f=>p(f.y)).attr("r",0).attr("fill",r).attr("opacity",.7).transition().duration(400).delay((f,l)=>l*12).attr("r",4)}function aa(t,r){const a=["Gene A","Gene B","Gene C","Gene D","Gene E"],e=["Ctrl","T1","T2","T3","T4"],o=[.2,.8,.5,.3,.9,.7,.1,.6,.4,.85,.6,.2,.9,.5,.3,.8,.4,.7,.15,.6,.3,.6,.2,.8,.55],n={t:28,r:72,b:48,l:60},c=400-n.l-n.r,i=260-n.t-n.b,s=t.append("g").attr("transform",`translate(${n.l},${n.t})`),d=E().domain(e).range([0,c]).padding(.05),p=E().domain(a).range([0,i]).padding(.05),f=ct(Wt).domain([0,1]);s.append("g").attr("transform",`translate(0,${i})`).call(v(d).tickSize(0)).call(y),s.append("g").call(b(p).tickSize(0)).call(y),a.forEach((l,m)=>e.forEach((h,g)=>{s.append("rect").attr("x",d(h)).attr("y",p(l)).attr("width",d.bandwidth()).attr("height",p.bandwidth()).attr("fill",f(o[m*e.length+g])).attr("rx",2).attr("opacity",0).transition().delay((m*e.length+g)*25).duration(250).attr("opacity",1)}))}function ea(t,r){const a=[{x:25,y:60,r:18},{x:55,y:30,r:28},{x:70,y:75,r:22},{x:40,y:48,r:14},{x:80,y:20,r:35}],e={t:28,r:28,b:48,l:48},o=400-e.l-e.r,n=260-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=x().domain([0,100]).range([0,o]),s=x().domain([0,100]).range([n,0]);c.append("g").attr("transform",`translate(0,${n})`).call(v(i).ticks(5)).call(y),c.append("g").call(b(s).ticks(4)).call(y);const d=[r,"#95D5B2","#B8B8E8","#F0B27A","#E07A7A"];c.selectAll("circle").data(a).join("circle").attr("cx",p=>i(p.x)).attr("cy",p=>s(p.y)).attr("r",0).attr("fill",(p,f)=>d[f]).attr("opacity",.6).attr("stroke",(p,f)=>d[f]).attr("stroke-width",1.5).transition().duration(500).delay((p,f)=>f*80).attr("r",p=>p.r)}function ra(t,r){[{sx:55,sy1:70,sy2:130,tx:190,ty1:50,ty2:110,c:r},{sx:55,sy1:130,sy2:190,tx:190,ty1:130,ty2:190,c:"#95D5B2"},{sx:205,sy1:50,sy2:90,tx:340,ty1:60,ty2:100,c:r},{sx:205,sy1:90,sy2:110,tx:340,ty1:110,ty2:140,c:"#B8B8E8"},{sx:205,sy1:130,sy2:190,tx:340,ty1:150,ty2:200,c:"#95D5B2"}].forEach(e=>{t.append("path").attr("d",`M${e.sx},${e.sy1} C${(e.sx+e.tx)/2},${e.sy1} ${(e.sx+e.tx)/2},${e.ty1} ${e.tx},${e.ty1} L${e.tx},${e.ty2} C${(e.sx+e.tx)/2},${e.ty2} ${(e.sx+e.tx)/2},${e.sy2} ${e.sx},${e.sy2} Z`).attr("fill",e.c).attr("opacity",.35)}),[[40,70,120,"来源"],[190,50,60,"路径A"],[190,130,60,"路径B"],[340,60,40,"结果1"],[340,110,30,"结果2"],[340,150,50,"结果3"]].forEach(([e,o,n,c])=>{t.append("rect").attr("x",e).attr("y",o).attr("width",14).attr("height",n).attr("fill",r).attr("opacity",.85).attr("rx",2),t.append("text").attr("x",e+18).attr("y",o+n/2).attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text(c)})}function na(t,r){const a=[{c:"Q1",a:30,b:40,cc:30},{c:"Q2",a:35,b:35,cc:30},{c:"Q3",a:25,b:45,cc:30},{c:"Q4",a:40,b:30,cc:30}],e=[r,"#95D5B2","#B8B8E8"],o={t:28,r:28,b:48,l:48},n=400-o.l-o.r,c=260-o.t-o.b,i=t.append("g").attr("transform",`translate(${o.l},${o.t})`),s=E().domain(a.map(p=>p.c)).range([0,n]).padding(.35),d=x().domain([0,100]).range([c,0]);i.append("g").attr("transform",`translate(0,${c})`).call(v(s).tickSize(0)).call(y),i.append("g").call(b(d).ticks(4)).call(y),a.forEach(p=>{let f=0;[[p.a,0],[p.b,1],[p.cc,2]].forEach(([l,m])=>{i.append("rect").attr("x",s(p.c)).attr("width",s.bandwidth()).attr("y",d(f+l)).attr("height",c-d(l)).attr("fill",e[m]).attr("opacity",.85).attr("rx",1),f+=l})})}function oa(t,r){const a=[42,28,18,12],e=[r,"#95D5B2","#B8B8E8","#F0B27A"],o=V().value(i=>i).sort(null),n=Q().innerRadius(55).outerRadius(90),c=t.append("g").attr("transform","translate(200,130)");o(a).forEach((i,s)=>{c.append("path").datum(i).attr("fill",e[s]).attr("opacity",.88).attr("d",n).attr("stroke","#111418").attr("stroke-width",2)}),c.append("text").attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","14px").attr("font-family","var(--font-heading)").attr("font-weight","600").text("42%")}function ia(t,r){const a=Z({children:[{v:35},{v:25},{v:20},{v:12},{v:5},{v:3}]}).sum(o=>o.v);Tt().size([400,260]).padding(3)(a);const e=[r,"#95D5B2","#B8B8E8","#F0B27A","#E07A7A","#F0D264"];a.leaves().forEach((o,n)=>{t.append("rect").attr("x",o.x0).attr("y",o.y0).attr("width",o.x1-o.x0).attr("height",o.y1-o.y0).attr("fill",e[n%e.length]).attr("opacity",.85).attr("rx",3),o.x1-o.x0>38&&t.append("text").attr("x",(o.x0+o.x1)/2).attr("y",(o.y0+o.y1)/2).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#1d1d1f").attr("font-size","11px").attr("font-weight","600").text(o.data.v+"%")})}function sa(t,r){for(let s=0;s<100;s++){const d=s%10,p=Math.floor(s/10);t.append("rect").attr("x",101.5+d*20).attr("y",31.5+p*20).attr("width",17).attr("height",17).attr("fill",s<63?r:"#2a2a2a").attr("rx",2).attr("opacity",0).transition().delay(s*7).duration(180).attr("opacity",1)}t.append("text").attr("x",200).attr("y",240).attr("text-anchor","middle").attr("fill","#888").attr("font-size","11px").attr("font-family","var(--font-heading)").text("63% — 每格代表 1%")}function la(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],i=[{v:[42,55,61,48,72,68,85,90],c:r},{v:[30,35,38,42,50,55,60,65],c:"#95D5B2"}],s=E().domain(c).range([0,e]).padding(.1),d=x().domain([20,100]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(s).tickSize(0)).call(y),n.append("g").call(b(d).ticks(4)).call(y);const p=z().x((f,l)=>s(c[l])+s.bandwidth()/2).y(f=>d(f)).curve(S);i.forEach(f=>{const l=n.append("path").datum(f.v).attr("fill","none").attr("stroke",f.c).attr("stroke-width",2.5).attr("d",p),m=l.node().getTotalLength();l.attr("stroke-dasharray",m).attr("stroke-dashoffset",m).transition().duration(900).ease(N).attr("stroke-dashoffset",0)})}function ca(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=[42,55,61,48,72,68,85,90,78,95],i=x().domain([0,c.length-1]).range([0,e]),s=x().domain([30,100]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(i).ticks(5)).call(y),n.append("g").call(b(s).ticks(4)).call(y);const d=W().x((m,h)=>i(h)).y0(o).y1(m=>s(m)).curve(S),p=z().x((m,h)=>i(h)).y(m=>s(m)).curve(S);n.append("path").datum(c).attr("fill",r).attr("opacity",.2).attr("d",d);const f=n.append("path").datum(c).attr("fill","none").attr("stroke",r).attr("stroke-width",2.5).attr("d",p),l=f.node().getTotalLength();f.attr("stroke-dasharray",l).attr("stroke-dashoffset",l).transition().duration(900).attr("stroke-dashoffset",0)}function da(t,r){const a=["Group A","Group B","Group C","Group D"],e=[{mu:40},{mu:55},{mu:70},{mu:48}],o=[r,"#95D5B2","#B8B8E8","#F0B27A"],n={t:28,r:28,b:28,l:60},c=400-n.l-n.r,i=(260-n.t-n.b)/a.length*1.35,s=t.append("g").attr("transform",`translate(${n.l},${n.t})`),d=x().domain([0,100]).range([0,c]);a.forEach((p,f)=>{const l=f*(i*.72),m=k=>Math.exp(-.5*((k-e[f].mu)/14)**2),h=L(0,101,2).map(k=>({v:k,d:m(k)})),g=H(h,k=>k.d),u=x().domain([0,g]).range([0,-i]),w=W().x(k=>d(k.v)).y0(0).y1(k=>u(k.d)),B=z().x(k=>d(k.v)).y(k=>u(k.d)),M=s.append("g").attr("transform",`translate(0,${l+i})`);M.append("path").datum(h).attr("fill",o[f]).attr("opacity",.3).attr("d",w),M.append("path").datum(h).attr("fill","none").attr("stroke",o[f]).attr("stroke-width",2).attr("d",B),M.append("text").attr("x",-6).attr("y",-i/2).attr("text-anchor","end").attr("dominant-baseline","middle").attr("fill","#aaa").attr("font-size","9.5px").text(p)})}function pa(t,r){const a={t:28,r:28,b:48,l:48},e=400-a.l-a.r,o=260-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=[{x:0,y:30},{x:2,y:30},{x:2,y:55},{x:4,y:55},{x:4,y:42},{x:6,y:42},{x:6,y:70},{x:8,y:70},{x:8,y:58},{x:10,y:58}],i=x().domain([0,10]).range([0,e]),s=x().domain([20,80]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(i).ticks(5)).call(y),n.append("g").call(b(s).ticks(4)).call(y);const d=W().x(m=>i(m.x)).y0(o).y1(m=>s(m.y)),p=z().x(m=>i(m.x)).y(m=>s(m.y));n.append("path").datum(c).attr("fill",r).attr("opacity",.15).attr("d",d);const f=n.append("path").datum(c).attr("fill","none").attr("stroke",r).attr("stroke-width",2.5).attr("d",p),l=f.node().getTotalLength();f.attr("stroke-dasharray",l).attr("stroke-dashoffset",l).transition().duration(900).attr("stroke-dashoffset",0)}function fa(t){const r=[{l:"方法A",v:28},{l:"方法B",v:22},{l:"方法C",v:18},{l:"方法D",v:14},{l:"方法E",v:10},{l:"方法F",v:5},{l:"其他",v:3}],a=["#e03030","#f08030","#c8b820","#50c050","#3090d0","#8050d0","#d050a0"];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const e=V().value(c=>c.v).sort(null),o=Q().innerRadius(0).outerRadius(68),n=t.append("g").attr("transform","translate(100,100)");e(r).forEach((c,i)=>n.append("path").datum(c).attr("fill",a[i]).attr("d",o).attr("stroke","#fff").attr("stroke-width",1)),t.append("text").attr("x",100).attr("y",185).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("7个扇区，颜色无法区分")}function ha(t){const r=[{l:"方法A",v:28},{l:"方法B",v:22},{l:"方法C",v:18},{l:"方法D",v:14},{l:"方法E",v:10},{l:"方法F",v:5},{l:"其他",v:3}];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a=[...r].sort((n,c)=>c.v-n.v),e=E().domain(a.map(n=>n.l)).range([12,188]).padding(.22),o=x().domain([0,30]).range([58,265]);a.forEach(n=>{t.append("rect").attr("x",58).attr("y",e(n.l)).attr("height",e.bandwidth()).attr("width",o(n.v)-58).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3),t.append("text").attr("x",54).attr("y",e(n.l)+e.bandwidth()/2).attr("text-anchor","end").attr("dominant-baseline","middle").attr("fill","#444").attr("font-size","9px").attr("font-family","var(--font-heading)").text(n.l),t.append("text").attr("x",o(n.v)+3).attr("y",e(n.l)+e.bandwidth()/2).attr("dominant-baseline","middle").attr("fill","#444").attr("font-size","9px").text(n.v+"%")}),t.append("text").attr("x",160).attr("y",197).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("水平条形图：大小一目了然")}function ma(t){const r=[{l:"A组",v:96.2},{l:"B组",v:97.1},{l:"C组",v:98.4},{l:"D组",v:96.8}];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a={t:22,r:20,b:32,l:48},e=280-a.l-a.r,o=200-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=E().domain(r.map(s=>s.l)).range([0,e]).padding(.35),i=x().domain([95.5,99]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(c).tickSize(0)).call(s=>{s.select(".domain").attr("stroke","#ccc"),s.selectAll("text").attr("fill","#555").attr("font-size","10px")}),n.append("g").call(b(i).ticks(4)).call(s=>{s.select(".domain").attr("stroke","#ccc"),s.selectAll("text").attr("fill","#555").attr("font-size","9px")}),n.selectAll("rect").data(r).join("rect").attr("x",s=>c(s.l)).attr("width",c.bandwidth()).attr("y",s=>i(s.v)).attr("height",s=>o-i(s.v)).attr("fill","#E07A7A").attr("opacity",.85).attr("rx",3),n.append("text").attr("x",-10).attr("y",o+2).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9px").attr("font-weight","700").text("≠0"),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("Y轴从95.5开始，差异被放大10×")}function ga(t){const r=[{l:"A组",v:96.2},{l:"B组",v:97.1},{l:"C组",v:98.4},{l:"D组",v:96.8}];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const a={t:22,r:20,b:32,l:48},e=280-a.l-a.r,o=200-a.t-a.b,n=t.append("g").attr("transform",`translate(${a.l},${a.t})`),c=E().domain(r.map(s=>s.l)).range([0,e]).padding(.35),i=x().domain([0,100]).range([o,0]);n.append("g").attr("transform",`translate(0,${o})`).call(v(c).tickSize(0)).call(s=>{s.select(".domain").attr("stroke","#ccc"),s.selectAll("text").attr("fill","#555").attr("font-size","10px")}),n.append("g").call(b(i).ticks(5)).call(s=>{s.select(".domain").attr("stroke","#ccc"),s.selectAll("text").attr("fill","#555").attr("font-size","9px")}),n.selectAll("rect").data(r).join("rect").attr("x",s=>c(s.l)).attr("width",c.bandwidth()).attr("y",s=>i(s.v)).attr("height",s=>o-i(s.v)).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("Y轴从0开始：差异真实呈现")}function ua(t){t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const r={t:22,r:44,b:32,l:44},a=280-r.l-r.r,e=200-r.t-r.b,o=t.append("g").attr("transform",`translate(${r.l},${r.t})`),n=["1月","3月","5月","7月","9月","11月"],c=[120,180,310,420,380,150],i=[3,4,6,8,7,3],s=E().domain(n).range([0,a]).padding(.1),d=x().domain([0,500]).range([e,0]),p=x().domain([0,10]).range([e,0]);o.append("g").attr("transform",`translate(0,${e})`).call(v(s).tickSize(0)).call(m=>{m.select(".domain").attr("stroke","#ccc"),m.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),o.append("g").call(b(d).ticks(4)).call(m=>{m.select(".domain").attr("stroke","#E07A7A"),m.selectAll("text").attr("fill","#E07A7A").attr("font-size","8.5px")}),o.append("g").attr("transform",`translate(${a},0)`).call(nt(p).ticks(4)).call(m=>{m.select(".domain").attr("stroke","#B8B8E8"),m.selectAll("text").attr("fill","#B8B8E8").attr("font-size","8.5px")});const f=z().x((m,h)=>s(n[h])+s.bandwidth()/2).y(m=>d(m));o.append("path").datum(c).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2.5).attr("d",f);const l=z().x((m,h)=>s(n[h])+s.bandwidth()/2).y(m=>p(m));o.append("path").datum(i).attr("fill","none").attr("stroke","#B8B8E8").attr("stroke-width",2.5).attr("d",l),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("双轴：冰淇淋与溺水？错觉相关！")}function xa(t){t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const r=["1月","3月","5月","7月","9月","11月"],a=[120,180,310,420,380,150],e=[3,4,6,8,7,3],o=t.append("g").attr("transform","translate(44,10)"),n=192,c=72,i=E().domain(r).range([0,n]).padding(.1),s=x().domain([0,500]).range([c,0]);o.append("g").attr("transform",`translate(0,${c})`).call(v(i).tickSize(0)).call(h=>{h.select(".domain").remove(),h.selectAll("text").attr("fill","#888").attr("font-size","7.5px")}),o.append("g").call(b(s).ticks(3)).call(h=>{h.select(".domain").remove(),h.selectAll("text").attr("fill","#888").attr("font-size","7.5px")});const d=z().x((h,g)=>i(r[g])+i.bandwidth()/2).y(h=>s(h)).curve(S);o.append("path").datum(a).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2).attr("d",d),t.append("text").attr("x",44).attr("y",90).attr("fill","#666").attr("font-size","9px").attr("font-family","var(--font-heading)").text("冰淇淋销量（万支）"),t.append("line").attr("x1",44).attr("y1",96).attr("x2",236).attr("y2",96).attr("stroke","#e0e0e0").attr("stroke-width",1).attr("stroke-dasharray","3,2");const p=t.append("g").attr("transform","translate(44,100)"),f=62,l=x().domain([0,10]).range([f,0]);p.append("g").attr("transform",`translate(0,${f})`).call(v(i).tickSize(0)).call(h=>{h.select(".domain").remove(),h.selectAll("text").attr("fill","#888").attr("font-size","7.5px")}),p.append("g").call(b(l).ticks(3)).call(h=>{h.select(".domain").remove(),h.selectAll("text").attr("fill","#888").attr("font-size","7.5px")});const m=z().x((h,g)=>i(r[g])+i.bandwidth()/2).y(h=>l(h)).curve(S);p.append("path").datum(e).attr("fill","none").attr("stroke","#B8B8E8").attr("stroke-width",2).attr("d",m),t.append("text").attr("x",44).attr("y",170).attr("fill","#666").attr("font-size","9px").attr("font-family","var(--font-heading)").text("溺水人数（起）"),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("独立图表：各变量诚实呈现")}function ya(t){let r=7;const a=()=>(r=(r*9301+49297)%233280,r/233280),e=Array.from({length:10},(f,l)=>({x:l*10+5+a()*6-3,y:l*5+20+a()*25-12}));e.sort((f,l)=>f.x-l.x),t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const o={t:20,r:20,b:32,l:40},n=280-o.l-o.r,c=200-o.t-o.b,i=t.append("g").attr("transform",`translate(${o.l},${o.t})`),s=x().domain([0,100]).range([0,n]),d=x().domain([0,80]).range([c,0]);i.append("g").attr("transform",`translate(0,${c})`).call(v(s).ticks(5)).call(f=>{f.select(".domain").attr("stroke","#ccc"),f.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),i.append("g").call(b(d).ticks(4)).call(f=>{f.select(".domain").attr("stroke","#ccc"),f.selectAll("text").attr("fill","#555").attr("font-size","8.5px")});const p=z().x(f=>s(f.x)).y(f=>d(f.y));i.append("path").datum(e).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",1.5).attr("d",p),i.selectAll("circle").data(e).join("circle").attr("cx",f=>s(f.x)).attr("cy",f=>d(f.y)).attr("r",5).attr("fill","#E07A7A").attr("stroke","#fff").attr("stroke-width",1.5),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","10px").attr("font-family","var(--font-heading)").text("连线暗示两点间存在数据")}function va(t){let r=7;const a=()=>(r=(r*9301+49297)%233280,r/233280),e=Array.from({length:10},(p,f)=>({x:f*10+5+a()*6-3,y:f*5+20+a()*25-12}));t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const o={t:20,r:20,b:32,l:40},n=280-o.l-o.r,c=200-o.t-o.b,i=t.append("g").attr("transform",`translate(${o.l},${o.t})`),s=x().domain([0,100]).range([0,n]),d=x().domain([0,80]).range([c,0]);i.append("g").attr("transform",`translate(0,${c})`).call(v(s).ticks(5)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),i.append("g").call(b(d).ticks(4)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),i.append("line").attr("x1",s(0)).attr("y1",d(20)).attr("x2",s(100)).attr("y2",d(70)).attr("stroke","#7EC8E3").attr("stroke-width",2).attr("opacity",.6).attr("stroke-dasharray","5,3"),i.selectAll("circle").data(e).join("circle").attr("cx",p=>s(p.x)).attr("cy",p=>d(p.y)).attr("r",5).attr("fill","#7EC8E3").attr("stroke","#fff").attr("stroke-width",1.5),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","10px").attr("font-family","var(--font-heading)").text("散点+回归线：诚实展示数据")}function ba(t){t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const r=[{startAngle:-Math.PI/2,endAngle:-Math.PI/2+2*Math.PI*.35,color:"#E07A7A",label:"35%"},{startAngle:-Math.PI/2+2*Math.PI*.35,endAngle:-Math.PI/2+2*Math.PI*.65,color:"#7EC8E3",label:"30%"},{startAngle:-Math.PI/2+2*Math.PI*.65,endAngle:-Math.PI/2+2*Math.PI*.85,color:"#95D5B2",label:"20%"},{startAngle:-Math.PI/2+2*Math.PI*.85,endAngle:3*Math.PI/2,color:"#F0B27A",label:"15%"}],a=120,e=95,o=80,n=38,c=30;r.forEach(i=>{const s=(i.startAngle+i.endAngle)/2;if(Math.sin(s)>-.2){const d=a+o*Math.cos(i.startAngle),p=e+n*Math.sin(i.startAngle),f=a+o*Math.cos(i.endAngle),l=e+n*Math.sin(i.endAngle),m=i.endAngle-i.startAngle>Math.PI?1:0;t.append("path").attr("d",`M${d},${p} L${d},${p+c} A${o},${n} 0 ${m} 1 ${f},${l+c} L${f},${l} A${o},${n} 0 ${m} 0 ${d},${p}`).attr("fill",i.color).attr("opacity",.6)}}),r.forEach(i=>{const s=i.endAngle-i.startAngle>Math.PI?1:0,d=a+o*Math.cos(i.startAngle),p=e+n*Math.sin(i.startAngle),f=a+o*Math.cos(i.endAngle),l=e+n*Math.sin(i.endAngle);t.append("path").attr("d",`M${a},${e} L${d},${p} A${o},${n} 0 ${s} 1 ${f},${l} Z`).attr("fill",i.color).attr("opacity",.92).attr("stroke","#fff").attr("stroke-width",1);const m=(i.startAngle+i.endAngle)/2;t.append("text").attr("x",a+o*.65*Math.cos(m)).attr("y",e+n*.65*Math.sin(m)).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","10px").attr("font-weight","700").text(i.label)}),t.append("text").attr("x",140).attr("y",190).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("3D透视：前方扇区面积被高估")}function wa(t){t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const r=[35,30,20,15],a=["#E07A7A","#7EC8E3","#95D5B2","#F0B27A"],e=["35%","30%","20%","15%"],o=V().value(i=>i).sort(null),n=Q().innerRadius(42).outerRadius(78),c=t.append("g").attr("transform","translate(120,98)");o(r).forEach((i,s)=>{c.append("path").datum(i).attr("fill",a[s]).attr("opacity",.88).attr("d",n).attr("stroke","#fafafa").attr("stroke-width",2);const d=n.centroid(i);c.append("text").attr("x",d[0]).attr("y",d[1]).attr("text-anchor","middle").attr("dominant-baseline","middle").attr("fill","#fff").attr("font-size","9.5px").attr("font-weight","700").text(e[s])}),t.append("text").attr("x",140).attr("y",190).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("平面圆环：面积感知客观")}function ka(t){const r=["北京","上海","广州","成都","武汉","西安"],a=[82,91,78,65,74,68];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const e={t:20,r:20,b:36,l:42},o=280-e.l-e.r,n=200-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=ot().domain(r).range([0,o]).padding(.3),s=x().domain([50,100]).range([n,0]);c.append("g").attr("transform",`translate(0,${n})`).call(v(i).tickSize(0)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8px").attr("transform","rotate(-20)").attr("text-anchor","end")}),c.append("g").call(b(s).ticks(4)).call(p=>{p.select(".domain").attr("stroke","#ccc"),p.selectAll("text").attr("fill","#555").attr("font-size","8.5px")});const d=z().x((p,f)=>i(r[f])).y((p,f)=>s(a[f]));c.append("path").datum(a).attr("fill","none").attr("stroke","#E07A7A").attr("stroke-width",2.5).attr("d",d),c.selectAll("circle").data(a).join("circle").attr("cx",(p,f)=>i(r[f])).attr("cy",p=>s(p)).attr("r",4.5).attr("fill","#E07A7A"),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#c53030").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("折线暗示城市间存在顺序关系")}function $a(t){const r=["上海","北京","广州","武汉","西安","成都"],a=[91,82,78,74,68,65];t.append("rect").attr("width",280).attr("height",200).attr("fill","#fafafa");const e={t:20,r:20,b:36,l:42},o=280-e.l-e.r,n=200-e.t-e.b,c=t.append("g").attr("transform",`translate(${e.l},${e.t})`),i=E().domain(r).range([0,o]).padding(.35),s=x().domain([50,100]).range([n,0]);c.append("g").attr("transform",`translate(0,${n})`).call(v(i).tickSize(0)).call(d=>{d.select(".domain").attr("stroke","#ccc"),d.selectAll("text").attr("fill","#555").attr("font-size","8px").attr("transform","rotate(-20)").attr("text-anchor","end")}),c.append("g").call(b(s).ticks(4)).call(d=>{d.select(".domain").attr("stroke","#ccc"),d.selectAll("text").attr("fill","#555").attr("font-size","8.5px")}),r.forEach((d,p)=>{c.append("rect").attr("x",i(d)).attr("width",i.bandwidth()).attr("y",s(a[p])).attr("height",n-s(a[p])).attr("fill","#7EC8E3").attr("opacity",.85).attr("rx",3)}),t.append("text").attr("x",140).attr("y",196).attr("text-anchor","middle").attr("fill","#276749").attr("font-size","9.5px").attr("font-family","var(--font-heading)").text("柱状图：无序类别无连线误导")}function Ga(){at(),A.resizeHandlers.forEach(t=>window.removeEventListener("resize",t)),A.resizeHandlers=[],A.treePath=[],window._p5nav&&delete window._p5nav}export{Ga as destroy,Ta as init,La as render};
