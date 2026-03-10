import{k as At,g as Dt,f as U}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as yt}from"./CodeEditor-BiI1SvFS.js";import{n as bt}from"./index-tM4brxkH.js";import{s as rt,l as T}from"./transform-CrlstJ90.js";import{b as _t}from"./band-CtrpxvT2.js";import{m as ut}from"./max-DBeXZoyG.js";import{m as zt}from"./min-D1slsF82.js";import{b as S,a as G}from"./axis-FVV8vvN_.js";import{l as St}from"./line-Ci26EkcQ.js";import{c as Lt}from"./catmullRom-Dm0ttBHj.js";import"./path-CbwjOpE9.js";import"./math-CRUJxRjv.js";const tt=[{id:"RColorBrewer",label:"RColorBrewer",desc:"经典 ColorBrewer 体系，支持连续/发散/定性三类",install:'install.packages("RColorBrewer")',groups:[{name:"定性 Qualitative",palettes:[{name:"Set1",n:9,colors:["#E41A1C","#377EB8","#4DAF4A","#984EA3","#FF7F00","#FFFF33","#A65628","#F781BF","#999999"]},{name:"Set2",n:8,colors:["#66C2A5","#FC8D62","#8DA0CB","#E78AC3","#A6D854","#FFD92F","#E5C494","#B3B3B3"]},{name:"Set3",n:8,colors:["#8DD3C7","#FFFFB3","#BEBADA","#FB8072","#80B1D3","#FDB462","#B3DE69","#FCCDE5"]},{name:"Paired",n:8,colors:["#A6CEE3","#1F78B4","#B2DF8A","#33A02C","#FB9A99","#E31A1C","#FDBF6F","#FF7F00"]},{name:"Dark2",n:8,colors:["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E","#E6AB02","#A6761D","#666666"]},{name:"Accent",n:8,colors:["#7FC97F","#BEAED4","#FDC086","#FFFF99","#386CB0","#F0027F","#BF5B17","#666666"]}]},{name:"连续 Sequential",palettes:[{name:"Blues",n:7,colors:["#EFF3FF","#C6DBEF","#9ECAE1","#6BAED6","#4292C6","#2171B5","#084594"]},{name:"Reds",n:7,colors:["#FEE5D9","#FCBBA1","#FC9272","#FB6A4A","#EF3B2C","#CB181D","#99000D"]},{name:"Greens",n:7,colors:["#EDF8E9","#C7E9C0","#A1D99B","#74C476","#41AB5D","#238B45","#005A32"]},{name:"Purples",n:7,colors:["#F2F0F7","#DADAEB","#BCBDDC","#9E9AC8","#807DBA","#6A51A3","#4A1486"]},{name:"YlOrRd",n:6,colors:["#FFFFB2","#FED976","#FEB24C","#FD8D3C","#F03B20","#BD0026"]},{name:"YlGnBu",n:7,colors:["#FFFFCC","#C7E9B4","#7FCDBB","#41B6C4","#1D91C0","#225EA8","#0C2C84"]}]},{name:"发散 Diverging",palettes:[{name:"RdBu",n:7,colors:["#B2182B","#EF8A62","#FDDBC7","#F7F7F7","#D1E5F0","#67A9CF","#2166AC"]},{name:"Spectral",n:7,colors:["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},{name:"RdYlBu",n:7,colors:["#D73027","#FC8D59","#FEE090","#FFFFBF","#E0F3F8","#91BFDB","#4575B4"]},{name:"BrBG",n:7,colors:["#543005","#8C510A","#BF812D","#F6E8C3","#C7EAE5","#5AB4AC","#01665E"]},{name:"PiYG",n:7,colors:["#8E0152","#C51B7D","#DE77AE","#F7F7F7","#7FBC41","#4D9221","#276419"]}]}],scaleColor:'scale_color_brewer(palette = "Set1")',scaleFill:'scale_fill_brewer(palette = "Blues")'},{id:"viridis",label:"viridis",desc:"感知均匀、色盲友好，灰度打印仍清晰，Python/R 通用",install:'install.packages("viridisLite")',groups:[{name:"连续色板（感知均匀）",palettes:[{name:"viridis",n:8,colors:["#440154","#482878","#3E4989","#31688E","#26828E","#1F9E89","#35B779","#FDE725"]},{name:"magma",n:8,colors:["#000004","#1B1044","#4F127B","#812581","#B5367A","#E55C30","#FCA50A","#FCFDBF"]},{name:"inferno",n:8,colors:["#000004","#1B0C42","#4B0C6B","#781C6D","#A52C60","#CF4446","#ED6925","#FCCD25"]},{name:"plasma",n:8,colors:["#0D0887","#5302A3","#8B0AA5","#B83289","#DB5C68","#F48849","#FEBD2A","#F0F921"]},{name:"cividis",n:8,colors:["#00204D","#213D6B","#3B5C8A","#557AA6","#7095BD","#8CB0D2","#AECBDF","#E0E0D8"]},{name:"rocket",n:8,colors:["#03051A","#2A1459","#6B185C","#A32351","#D84D36","#F5872A","#FECB14","#FAEF9C"]},{name:"mako",n:8,colors:["#0B0405","#220E1D","#41214B","#5B3B77","#7464AA","#98A0D6","#C2CFF0","#DEF5E5"]},{name:"turbo",n:8,colors:["#23171B","#4A58DD","#2AB9FF","#10FA8B","#ADF821","#FFC623","#F95F00","#900C00"]}]}],scaleColor:'scale_color_viridis_d(option = "viridis")',scaleFill:'scale_fill_viridis_c(option = "plasma")'},{id:"ggsci",label:"ggsci",desc:"期刊及影视官方配色，NPG / Science / NEJM / Lancet 直接可用",install:'install.packages("ggsci")',groups:[{name:"学术期刊",palettes:[{name:"npg",n:8,colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2","#DC0000"]},{name:"aaas",n:8,colors:["#3B4992","#EE0000","#008B45","#631879","#008280","#BB0021","#5F559B","#A20056"]},{name:"nejm",n:8,colors:["#BC3C29","#0072B5","#E18727","#20854E","#7876B1","#6F99AD","#FFDC91","#EE4C97"]},{name:"lancet",n:8,colors:["#00468B","#ED0000","#42B540","#0099B4","#925E9F","#FDAF91","#AD002A","#ADB6B6"]},{name:"jco",n:8,colors:["#0073C2","#EFC000","#868686","#CD534C","#7AA6DC","#003C67","#8F7700","#3B3B3B"]},{name:"jama",n:8,colors:["#374E55","#DF8F44","#00A1D5","#B24745","#79AF97","#6A6599","#80796B","#000000"]}]},{name:"流行文化",palettes:[{name:"d3",n:8,colors:["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F"]},{name:"futurama",n:7,colors:["#FF6F00","#C71585","#008B00","#8B008B","#0000CD","#FF7F50","#DC143C"]},{name:"simpsons",n:8,colors:["#FED439","#709AE1","#8A9197","#D2AF81","#FD7446","#D5E4A2","#197EC0","#F05C3B"]},{name:"rickandmorty",n:6,colors:["#FAFD7C","#82491E","#24325F","#B7E4F9","#FB6467","#526E2D"]}]}],scaleColor:"scale_color_npg()",scaleFill:"scale_fill_lancet()"},{id:"wesanderson",label:"wesanderson",desc:"韦斯·安德森电影配色，温柔克制，对称精致，适合演示与封面",install:'install.packages("wesanderson")',groups:[{name:"电影配色",palettes:[{name:"GrandBudapest1",n:4,colors:["#F1BB7B","#FD6467","#5B1A18","#D67236"]},{name:"GrandBudapest2",n:4,colors:["#E6A0C4","#C6CDF7","#D8A499","#7294D4"]},{name:"Moonrise1",n:4,colors:["#F3DF6C","#CEAB07","#D5D5D3","#24281A"]},{name:"Moonrise3",n:5,colors:["#85D4E3","#F4B5BD","#9C964A","#CDC08C","#FAD77B"]},{name:"Cavalcanti1",n:5,colors:["#D8B70A","#02401B","#A2A475","#81A88D","#972D15"]},{name:"Royal2",n:5,colors:["#9A8822","#F5CDB4","#F8AFA8","#FDDDA0","#74A089"]},{name:"Darjeeling1",n:5,colors:["#FF0000","#00A08A","#F2AD00","#F98400","#5BBCD6"]},{name:"FantasticFox1",n:5,colors:["#DD8D29","#E2D200","#46ACC8","#E58601","#B40F20"]},{name:"Zissou1",n:5,colors:["#3B9AB2","#78B7C5","#EBCC2A","#E1AF00","#F21A00"]},{name:"IsleofDogs1",n:5,colors:["#9986A5","#79402E","#CCBA72","#0F0D0E","#D9D0D3"]}]}],scaleColor:'scale_color_manual(values = wes_palette("GrandBudapest1"))',scaleFill:'scale_fill_manual(values = wes_palette("Moonrise3"))'},{id:"MetBrewer",label:"MetBrewer",desc:"大都会艺术博物馆馆藏名画配色，艺术感强，适合高影响力出版",install:'install.packages("MetBrewer")',groups:[{name:"名画配色",palettes:[{name:"Hiroshige",n:7,colors:["#E76254","#EF8A47","#F7AA58","#FFE6B7","#AAD3D3","#80B4C6","#476F84"]},{name:"VanGogh3",n:7,colors:["#E9D097","#C7B581","#A59963","#7C7146","#5A5232","#382E20","#2A1F16"]},{name:"Monet",n:6,colors:["#4E6D58","#749474","#A6B49A","#D7CFC7","#E8D6B3","#E5C194"]},{name:"Hokusai2",n:6,colors:["#6D8325","#AEAC6E","#CEBF84","#E3D0A4","#F3CEC8","#F2A497"]},{name:"Kandinsky",n:6,colors:["#3B7EC1","#CE3D3D","#80B6C5","#ECCE66","#6A4C9C","#F5A623"]},{name:"Klimt",n:6,colors:["#DF9B44","#B5621B","#7D3C15","#5C3015","#323D2F","#1A4A37"]},{name:"Renoir",n:6,colors:["#17154F","#2F357C","#6C5D9E","#9D9DC7","#C4C1DC","#F3D0AE"]},{name:"Juarez",n:6,colors:["#A82203","#208CC0","#F1AF3A","#CF5E4E","#637B31","#72BAC5"]},{name:"Degas",n:5,colors:["#591C19","#96410E","#C67B44","#E9B870","#DCD3BA"]},{name:"Ingres",n:6,colors:["#041E43","#042D72","#2471A3","#85C1E9","#D4E6F1","#F9EBEA"]},{name:"Isfahan1",n:6,colors:["#4E3910","#845D29","#C0A585","#EDE1C8","#7DBBC3","#F5A40C"]},{name:"Egypt",n:4,colors:["#DD5129","#0F7BA2","#43B284","#FAB255"]}]}],scaleColor:'scale_color_met_d("Hiroshige")',scaleFill:'scale_fill_met_d("Monet")'}],nt={nature:{label:"Nature",color:"#E64B35",font:"Helvetica / Arial",fontNote:"6–9 pt，坐标轴标签 ≥ 5 pt",cols:{1:89,1.5:120,2:183},maxHeight:234,dpi:300,formats:["TIFF","EPS","PDF"],notes:"彩图收取额外费用；图例需在图内，不单独页面"},science:{label:"Science",color:"#3B4992",font:"Helvetica",fontNote:"7–9 pt，最小 6 pt",cols:{1:57,1.5:100,2:120},maxHeight:200,dpi:300,formats:["TIFF","EPS","PDF"],notes:"图片必须嵌入字体；矢量格式优先"},cell:{label:"Cell",color:"#00A087",font:"Arial",fontNote:"6–8 pt",cols:{1:85,1.5:114,2:178},maxHeight:235,dpi:300,formats:["TIFF","EPS","PDF"],notes:"单栏图不超过 85mm；图注 8 pt Arial"},pnas:{label:"PNAS",color:"#0072B5",font:"Helvetica",fontNote:"6–9 pt",cols:{1:87,1.5:114,2:178},maxHeight:230,dpi:{color:300,line:600},formats:["TIFF","EPS","SVG"],notes:"线条图 600 DPI；彩色图 300 DPI；不接受 JPEG"},lancet:{label:"Lancet",color:"#AD002A",font:"Arial / Helvetica",fontNote:"8 pt，最小 6 pt",cols:{1:85,1.5:114,2:170},maxHeight:220,dpi:300,formats:["TIFF","EPS","PDF"],notes:"彩图需说明是否必要；颜色需在黑白下仍可区分"}},Y=[{id:"h2",label:"A | B",desc:"两图并排（水平拼接）",code:`library(patchwork)

p1 <- ggplot(df, aes(x, y, color = group)) +
  geom_point(size = 2) +
  theme_minimal(base_size = 12)

p2 <- ggplot(df, aes(group, value, fill = group)) +
  geom_col() +
  theme_minimal(base_size = 12)

# 水平拼接
p1 | p2

# 等价写法
p1 + p2 + plot_layout(ncol = 2)`},{id:"v2",label:"A / B",desc:"两图叠放（垂直拼接）",code:`library(patchwork)

# 垂直拼接
p1 / p2

# 调整高度比
p1 / p2 + plot_layout(heights = c(2, 1))`},{id:"h2v",label:"(A | B) / C",desc:"上方两图并排，下方一图全宽",code:`library(patchwork)

# (A | B) 上方 + C 下方全宽
(p1 | p2) / p3

# 添加统一图注
(p1 | p2) / p3 +
  plot_layout(heights = c(1, 0.8)) +
  plot_annotation(
    title    = "图 1  实验结果综合展示",
    theme    = theme(plot.title = element_text(
                 size = 14, face = "bold"))
  )`},{id:"g4",label:"(A+B) / (C+D)",desc:"2×2 四图网格布局",code:`library(patchwork)

# 2×2 四图网格
(p1 + p2) / (p3 + p4)

# 添加面板标签 A B C D
(p1 + p2) / (p3 + p4) +
  plot_annotation(
    tag_levels = "A",           # 自动标注 A B C D
    tag_prefix = "(",
    tag_suffix = ")"
  ) &
  theme(plot.tag = element_text(
    size = 10, face = "bold"))`}],V=[{name:"Default",colors:["#7EC8E3","#F0B27A","#95D5B2"]},{name:"NPG",colors:["#E64B35","#4DBBD5","#00A087"]},{name:"Viridis",colors:["#440154","#21918C","#FDE725"]},{name:"D3 Classic",colors:["#1F77B4","#FF7F0E","#2CA02C"]},{name:"Warm",colors:["#D53E4F","#FC8D59","#FEE08B"]},{name:"Cool",colors:["#2166AC","#67A9CF","#B8B8E8"]},{name:"Hiroshige",colors:["#E76254","#AAD3D3","#476F84"]},{name:"Pastel",colors:["#A6CEE3","#B2DF8A","#FB9A99"]}];function lt(t){let e=t;return()=>(e=e*1664525+1013904223&4294967295,(e>>>0)/4294967295)}function $t(t){return()=>{const e=Math.max(1e-10,t()),a=t();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*a)}}const kt=["Control","Trt-A","Trt-B","Trt-C","Trt-D","Trt-F"],Pt=(()=>{const t=lt(42);return kt.map(()=>20+t()*60)})(),Z=(()=>{const t=lt(99),e=$t(t),a=[{g:0,mx:2.2,my:3,s:.5},{g:1,mx:4.5,my:5.5,s:.6},{g:2,mx:6.8,my:7.2,s:.4},{g:3,mx:3.5,my:8,s:.5}],n=[];return a.forEach(g=>{for(let i=0;i<18;i++)n.push({x:g.mx+g.s*e(),y:g.my+g.s*e(),g:g.g})}),n})(),Tt=(()=>{const t=lt(77),e=[0,2,4,6,8,10,12];return[{g:0,base:20,slope:4},{g:1,base:20,slope:9},{g:2,base:20,slope:14},{g:3,base:20,slope:6}].map(a=>({g:a.g,pts:e.map(n=>({x:n,y:a.base+a.slope*n+(t()-.5)*8}))}))})();let l={activePkg:"RColorBrewer",activePal:null,chartType:"bar",themeParams:{baseTheme:"minimal",bgColor:"#ffffff",fontFamily:"sans",fontSize:12,paletteIdx:0,gridLines:"major",gridColor:"light",axisLines:"show",axisTicks:"outside",axisAngle:0,legendPos:"right",legendDir:"vertical",legendBox:"none",legendKey:"medium",showTitle:!0,titleAlign:"left",showCaption:!1,showRegline:!0},ggsaveParams:{journal:"nature",col:"1",format:"PDF"},patchworkLayout:"h2",codeEditor:null,cleanupFns:[],resizeObservers:[]};function ee(){return`
<div class="page-scroll" id="p8-root">
<style>
/* ── page vars ── */
#p8-root { --p8-accent: #7EC8E3; }

/* ── Hero ── */
.p8-hero {
  position: relative;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  overflow: hidden;
  min-height: 100vh;
  min-height: 100dvh;
}
.p8-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 30% 40%, rgba(240,178,122,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 75% 65%, rgba(126,200,227,0.14) 0%, transparent 70%);
  animation: p8GlowA 12s ease-in-out infinite alternate;
  pointer-events: none;
}
.p8-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 40% at 70% 30%, rgba(149,213,178,0.10) 0%, transparent 65%);
  animation: p8GlowB 9s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}
@keyframes p8GlowA { 0% { transform: translateX(0)  translateY(0);  } 100% { transform: translateX(40px) translateY(-20px); } }
@keyframes p8GlowB { 0% { transform: translateX(0)  translateY(0);  } 100% { transform: translateX(-30px) translateY(30px); } }

.hero-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
  position: relative;
}

.p8-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: p8-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}
@keyframes p8-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── Section headers ── */
.p8-sec-header {
  text-align: center;
  margin-bottom: var(--space-xl);
}
.p8-sec-label {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: block;
  margin-bottom: var(--space-xs);
}
.p8-sec-title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  margin-bottom: var(--space-sm);
}
.p8-sec-desc {
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

/* ── Browser layout (Section 1) ── */
.p8-browser-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p8-browser-inner {
  max-width: var(--w-full);
  margin: 0 auto;
}
.p8-browser-layout {
  display: flex;
  gap: var(--space-lg);
  align-items: flex-start;
}
.p8-browser-left {
  flex: 0 0 42%;
  min-width: 0;
  max-height: 640px;
  overflow-y: auto;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  background: #fff;
}
.p8-browser-left::-webkit-scrollbar { width: 4px; }
.p8-browser-left::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 2px; }

.p8-browser-right {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}
.p8-browser-sticky {
  position: sticky;
  top: 80px;
}

/* Package accordion */
.p8-pkg-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: 14px var(--space-md);
  cursor: pointer;
  border-bottom: 1px solid var(--border-light);
  transition: background var(--t-fast);
  user-select: none;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
}
.p8-pkg-header:hover { background: var(--bg-light-alt); }
.p8-pkg-header.active { background: var(--bg-light-alt); }
.p8-pkg-name {
  font-family: var(--font-code);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-on-light);
}
.p8-pkg-desc-short {
  font-size: 0.78rem;
  color: var(--text-on-light-3);
  margin-left: auto;
  white-space: nowrap;
}
.p8-pkg-chevron {
  margin-left: 4px;
  font-size: 0.7rem;
  color: var(--text-on-light-3);
  transition: transform var(--t-fast);
}
.p8-pkg-body { display: none; }
.p8-pkg-body.open { display: block; }
.p8-pkg-chevron.open { transform: rotate(90deg); }

.p8-pal-group-label {
  font-size: 0.72rem;
  font-family: var(--font-code);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-on-light-3);
  padding: 10px var(--space-md) 6px;
  border-bottom: 1px solid var(--border-light);
}

.p8-pal-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px var(--space-md);
  cursor: pointer;
  transition: background var(--t-fast);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
.p8-pal-row:hover { background: var(--bg-light-alt); }
.p8-pal-row.active {
  background: var(--accent-subtle);
  border-left: 3px solid var(--accent);
}
.p8-pal-name {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-light-2);
  min-width: 90px;
  flex-shrink: 0;
}
.p8-pal-swatches {
  display: flex;
  gap: 2px;
  flex: 1;
}
.p8-swatch {
  height: 18px;
  flex: 1;
  border-radius: 2px;
  min-width: 8px;
}

/* Right panel */
.p8-chart-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: var(--space-md);
  flex-wrap: wrap;
}
.p8-chart-tab {
  padding: 7px 16px;
  border-radius: var(--radius-full);
  background: var(--bg-light-alt);
  border: 1.5px solid var(--border-light);
  color: var(--text-on-light-2);
  font-family: var(--font-heading);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 36px;
}
.p8-chart-tab:hover { border-color: var(--accent); color: var(--text-on-light); }
.p8-chart-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.p8-chart-wrap {
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: #fff;
  margin-bottom: var(--space-md);
}
.p8-chart-wrap svg { display: block; width: 100%; }

.p8-pal-info {
  background: var(--bg-light-alt);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.p8-pal-info-name {
  font-family: var(--font-code);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-on-light);
}
.p8-scale-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.p8-scale-badge {
  font-size: 0.7rem;
  font-family: var(--font-code);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
.p8-scale-badge.color { background: rgba(126,200,227,0.12); color: var(--accent-hover); border: 1px solid rgba(126,200,227,0.3); }
.p8-scale-badge.fill  { background: rgba(240,178,122,0.12); color: #d4844a; border: 1px solid rgba(240,178,122,0.3); }
.p8-scale-code {
  font-family: var(--font-code);
  font-size: 0.78rem;
  color: var(--text-on-light-2);
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.p8-copy-btn {
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1.5px solid var(--border-light);
  color: var(--text-on-light-2);
  font-size: 0.78rem;
  font-family: var(--font-heading);
  cursor: pointer;
  transition: all var(--t-fast);
  white-space: nowrap;
  min-height: 32px;
}
.p8-copy-btn:hover { border-color: var(--accent); color: var(--accent); }
.p8-copy-btn.copied { background: var(--accent); border-color: var(--accent); color: #fff; }

/* scale_color vs scale_fill 说明 */
.p8-scale-explain {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-top: var(--space-xl);
  max-width: var(--w-content);
  margin-left: auto;
  margin-right: auto;
}
.p8-scale-card {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
.p8-scale-card-title {
  font-family: var(--font-code);
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.p8-scale-card.color .p8-scale-card-title { color: #2196F3; }
.p8-scale-card.fill  .p8-scale-card-title { color: #FF9800; }
.p8-scale-card p {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-on-light-2);
}
.p8-scale-card code {
  font-family: var(--font-code);
  font-size: 0.78rem;
  background: var(--bg-light-alt);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--text-on-light);
}

/* ── Theme customizer (Section 2) ── */
.p8-theme-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p8-theme-inner {
  max-width: var(--w-full);
  margin: 0 auto;
}
.p8-theme-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space-lg);
  align-items: flex-start;
}
/* Controls panel */
.p8-theme-controls {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-width: 0;
}
/* Tab strip */
.p8-ctrl-tabs {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  border-bottom: 1px solid var(--border-dark);
}
.p8-ctrl-tabs::-webkit-scrollbar { display: none; }
.p8-ctrl-tab {
  flex: 1 1 0;
  padding: 11px 8px;
  font-size: 0.76rem;
  font-family: var(--font-heading);
  font-weight: 500;
  color: var(--text-on-dark-3);
  cursor: pointer;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  transition: all var(--t-fast);
  min-height: 40px;
}
.p8-ctrl-tab:hover { color: var(--text-on-dark); }
.p8-ctrl-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
/* Group panels */
.p8-ctrl-group-panel {
  display: none;
  padding: var(--space-md);
  flex-direction: column;
  gap: 16px;
}
.p8-ctrl-group-panel.active { display: flex; }
/* Control row */
.p8-ctrl-group { display: flex; flex-direction: column; gap: 8px; }
.p8-ctrl-label {
  font-size: 0.78rem;
  color: var(--text-on-dark-3);
  font-family: var(--font-heading);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.p8-ctrl-label-val {
  font-family: var(--font-code);
  color: var(--accent);
  font-size: 0.8rem;
}
/* Button group */
.p8-btn-group {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.p8-btn-opt {
  padding: 5px 10px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1.5px solid var(--border-dark);
  color: var(--text-on-dark-3);
  font-size: 0.75rem;
  font-family: var(--font-code);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 32px;
}
.p8-btn-opt:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p8-btn-opt.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }
/* Range slider */
.p8-range-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: var(--border-dark);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
}
.p8-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg-dark);
  cursor: pointer;
  transition: transform var(--t-fast);
}
.p8-range-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
.p8-range-slider::-moz-range-thumb {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent); border: 2px solid var(--bg-dark); cursor: pointer;
}
/* Mini palette grid */
.p8-mini-pals {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}
.p8-mini-pal {
  border-radius: var(--radius-sm);
  border: 2px solid transparent;
  cursor: pointer;
  padding: 4px;
  transition: all var(--t-fast);
  background: rgba(255,255,255,0.04);
}
.p8-mini-pal:hover { border-color: var(--accent); }
.p8-mini-pal.active { border-color: var(--accent); background: rgba(126,200,227,0.12); }
.p8-mini-pal-dots { display: flex; gap: 2px; margin-bottom: 3px; }
.p8-mini-pal-dot { flex: 1; height: 8px; border-radius: 2px; }
.p8-mini-pal-name {
  font-size: 0.6rem;
  font-family: var(--font-code);
  color: var(--text-on-dark-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}
/* Background swatches */
.p8-bg-swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.p8-bg-swatch {
  width: 34px; height: 34px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--border-dark);
  cursor: pointer;
  transition: all var(--t-fast);
}
.p8-bg-swatch:hover { border-color: var(--accent); transform: scale(1.1); }
.p8-bg-swatch.active { border-color: var(--accent); box-shadow: 0 0 0 2px rgba(126,200,227,0.4); }
/* Toggle switch */
.p8-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.p8-toggle-label { font-size: 0.78rem; color: var(--text-on-dark-3); font-family: var(--font-heading); }
.p8-toggle { position: relative; width: 36px; height: 20px; flex-shrink: 0; }
.p8-toggle input { opacity: 0; width: 0; height: 0; }
.p8-toggle-track {
  position: absolute; inset: 0;
  background: var(--border-dark);
  border-radius: 10px;
  cursor: pointer;
  transition: background var(--t-fast);
}
.p8-toggle input:checked + .p8-toggle-track { background: var(--accent); }
.p8-toggle-track::after {
  content: '';
  position: absolute;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #fff;
  top: 3px; left: 3px;
  transition: transform var(--t-fast);
}
.p8-toggle input:checked + .p8-toggle-track::after { transform: translateX(16px); }
/* Preview area */
.p8-theme-preview-wrap { display: flex; flex-direction: column; gap: var(--space-md); min-width: 0; }
.p8-theme-chart-box {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-dark);
}
.p8-theme-chart-box svg { display: block; width: 100%; }
.p8-code-box {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border-dark);
}
.p8-code-box-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px var(--space-md);
  border-bottom: 1px solid var(--border-dark);
}
.p8-code-box-title {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-dark-3);
  letter-spacing: 0.05em;
}
.p8-code-editor-wrap { min-height: 200px; }

/* ── ggsave section (Section 3) ── */
.p8-ggsave-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-light);
  color: var(--text-on-light);
}
.p8-ggsave-inner {
  max-width: 860px;
  margin: 0 auto;
}
.p8-journal-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--space-xl);
}
.p8-journal-btn {
  padding: 10px 22px;
  border-radius: var(--radius-full);
  background: #fff;
  border: 2px solid var(--border-light);
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-base);
  min-height: 44px;
}
.p8-journal-btn:hover { border-color: var(--accent); color: var(--text-on-light); }
.p8-journal-btn.active { color: #fff; border-color: transparent; }

.p8-ggsave-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}
.p8-ctrl-section {
  background: var(--bg-light-alt);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
.p8-ctrl-section-label {
  font-size: 0.78rem;
  font-family: var(--font-code);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-on-light-3);
  margin-bottom: 10px;
  display: block;
}
.p8-light-btn-group { display: flex; gap: 4px; flex-wrap: wrap; }
.p8-light-btn {
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  background: #fff;
  border: 1.5px solid var(--border-light);
  font-size: 0.82rem;
  font-family: var(--font-code);
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 36px;
}
.p8-light-btn:hover { border-color: var(--accent); color: var(--accent); }
.p8-light-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.p8-specs-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: var(--space-lg);
}
.p8-spec-item {
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}
.p8-spec-label { font-size: 0.72rem; color: var(--text-on-light-3); font-family: var(--font-code); text-transform: uppercase; letter-spacing: 0.08em; }
.p8-spec-value { font-size: 1.05rem; font-weight: 700; color: var(--text-on-light); font-family: var(--font-code); margin-top: 4px; }

.p8-code-output-light {
  background: var(--bg-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.p8-code-output-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px var(--space-md);
  border-bottom: 1px solid var(--border-dark);
}
.p8-code-output-title {
  font-family: var(--font-code);
  font-size: 0.8rem;
  color: var(--text-on-dark-3);
}
.p8-code-output-pre {
  font-family: var(--font-code);
  font-size: 0.85rem;
  color: #abb2bf;
  padding: var(--space-md);
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  line-height: 1.7;
}

.p8-journal-note {
  font-size: 0.82rem;
  color: var(--text-on-light-3);
  text-align: center;
  margin-top: var(--space-md);
  font-style: italic;
  line-height: 1.5;
}

/* ── Patchwork (Section 4) ── */
.p8-patchwork-section {
  padding: var(--space-3xl) var(--space-lg);
  background: var(--bg-dark);
  color: var(--text-on-dark);
}
.p8-patchwork-inner {
  max-width: 900px;
  margin: 0 auto;
}
.p8-layout-tabs {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: var(--space-xl);
  flex-wrap: wrap;
}
.p8-layout-tab {
  padding: 10px 24px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1.5px solid var(--border-dark);
  color: var(--text-on-dark-2);
  font-family: var(--font-code);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}
.p8-layout-tab:hover { border-color: var(--accent); color: var(--text-on-dark); }
.p8-layout-tab.active { background: var(--accent); border-color: var(--accent); color: #1d1d1f; font-weight: 600; }

.p8-layout-desc {
  text-align: center;
  font-size: 0.88rem;
  color: var(--text-on-dark-3);
  margin-bottom: var(--space-lg);
  font-family: var(--font-body);
}

.p8-patchwork-preview-box {
  background: var(--bg-dark-elevated);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-lg);
}
.p8-patchwork-preview-box svg { display: block; width: 100%; }

/* ── Footer CTA ── */
.page-footer-cta {
  background: var(--bg-dark-deep);
  padding: var(--space-3xl) var(--space-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-md);
}

/* ── Responsive ── */
@media (max-width: 1024px) {
  .p8-theme-layout { grid-template-columns: 280px 1fr; }
}
@media (max-width: 900px) {
  .p8-browser-layout { flex-direction: column; }
  .p8-browser-left { flex: none; width: 100%; max-height: 380px; }
  .p8-browser-sticky { position: static; }
  .p8-theme-layout { grid-template-columns: 1fr; }
  .p8-scale-explain { grid-template-columns: 1fr; }
  .p8-ggsave-controls { grid-template-columns: 1fr; }
  .p8-specs-row { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .p8-browser-section,
  .p8-theme-section,
  .p8-ggsave-section,
  .p8-patchwork-section { padding: var(--space-xl) var(--space-sm); }

  /* Browser section fixes */
  .p8-browser-left, .p8-browser-right { min-width: 0; overflow: hidden; }
  .p8-pal-info { min-width: 0; overflow: hidden; }
  .p8-pal-name { min-width: 70px; font-size: 0.74rem; }
  /* Scale row: wrap on mobile so code fits */
  .p8-scale-row { flex-wrap: wrap; gap: 6px; align-items: center; }
  .p8-scale-code {
    flex: 1 1 100%;       /* take full row on wrap */
    white-space: normal;
    word-break: break-all;
    overflow-wrap: break-word;
    overflow: visible;
    text-overflow: clip;
    font-size: 0.72rem;
    padding: 2px 0;
  }
  .p8-copy-btn { margin-left: auto; }
  /* Scale cards */
  .p8-scale-card code { word-break: break-all; }

  /* ggsave section */
  .p8-specs-row { grid-template-columns: repeat(2, 1fr); }

  /* Theme customizer */
  .p8-range-slider { min-height: 36px; }
  .p8-range-slider::-webkit-slider-thumb { width: 24px; height: 24px; }
  .p8-range-slider::-moz-range-thumb { width: 24px; height: 24px; }
  .p8-mini-pals { grid-template-columns: repeat(4, 1fr); }
  .p8-ctrl-tab { padding: 11px 6px; font-size: 0.7rem; }
}
@media (max-width: 480px) {
  .p8-specs-row { grid-template-columns: 1fr 1fr; }
  .p8-journal-btn { padding: 8px 16px; font-size: 0.82rem; }
  .p8-bg-swatch { width: 30px; height: 30px; }
  .p8-pal-name { min-width: 60px; }
  .p8-scale-badge { font-size: 0.65rem; padding: 2px 6px; }
}
</style>

<!-- ═══════════ HERO ═══════════ -->
<section class="section-dark section-hero-full p8-hero" id="p8-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 01 / Page 08</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">R 配色与出版级图表</h1>
    <p class="page-hero-sub" style="opacity:0;">R Color Packages &amp; Publication-Ready Figures</p>
    <p class="p8-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
      掌握 RColorBrewer、viridis、ggsci 等专业配色包，将图表调整到顶刊投稿标准。
    </p>
    <nav class="hero-quicknav" id="p8-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p8-browser">配色包浏览器</button>
      <button class="hero-quicknav__item" data-target="#p8-theme">主题定制器</button>
      <button class="hero-quicknav__item" data-target="#p8-ggsave">ggsave 生成器</button>
      <button class="hero-quicknav__item" data-target="#p8-patchwork">patchwork 布局</button>
    </nav>
    <div class="p8-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ═══════════ Section 1: 配色包浏览器 ═══════════ -->
<section id="p8-browser" class="p8-browser-section">
  <div class="p8-browser-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">R 配色系统</span>
      <h2 class="p8-sec-title" style="color:var(--text-on-light);">五大配色包全览</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-light-2);">
        从 ColorBrewer 的科学配色到 MetBrewer 的艺术馆名画配色，点击色板即时预览在图表中的效果。
      </p>
    </div>

    <div class="p8-browser-layout">
      <!-- Left: Package list -->
      <div class="p8-browser-left" id="p8-pkg-list">
        ${tt.map((t,e)=>`
        <div class="p8-pkg-item" data-pkg="${t.id}">
          <div class="p8-pkg-header${e===0?" active":""}" data-pkg-toggle="${t.id}">
            <span class="p8-pkg-name">${t.label}</span>
            <span class="p8-pkg-chevron${e===0?" open":""}">▶</span>
          </div>
          <div class="p8-pkg-body${e===0?" open":""}">
            ${t.groups.map(a=>`
              <div class="p8-pal-group-label">${a.name}</div>
              ${a.palettes.map((n,g)=>`
              <div class="p8-pal-row${e===0&&g===0?" active":""}"
                   data-pkg="${t.id}" data-pal="${n.name}">
                <span class="p8-pal-name">${n.name}</span>
                <div class="p8-pal-swatches">
                  ${n.colors.map(i=>`<span class="p8-swatch" style="background:${i}"></span>`).join("")}
                </div>
              </div>`).join("")}
            `).join("")}
          </div>
        </div>`).join("")}
      </div>

      <!-- Right: Chart preview -->
      <div class="p8-browser-right">
        <div class="p8-browser-sticky">
          <!-- Chart type tabs -->
          <div class="p8-chart-tabs" id="p8-chart-type-tabs">
            <button class="p8-chart-tab active" data-chart="bar">柱状图</button>
            <button class="p8-chart-tab" data-chart="scatter">散点图</button>
            <button class="p8-chart-tab" data-chart="line">折线图</button>
          </div>
          <!-- D3 chart -->
          <div class="p8-chart-wrap" id="p8-chart-wrap"></div>
          <!-- Palette info -->
          <div class="p8-pal-info" id="p8-pal-info">
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <span class="p8-pal-info-name" id="p8-active-pal-name">Set1</span>
              <span style="font-size:0.78rem;color:var(--text-on-light-3);font-family:var(--font-code);" id="p8-active-pkg-name">RColorBrewer</span>
            </div>
            <div class="p8-scale-row">
              <span class="p8-scale-badge color">scale_color</span>
              <span class="p8-scale-code" id="p8-scale-color-code">scale_color_brewer(palette = "Set1")</span>
              <button class="p8-copy-btn" id="p8-copy-color">复制</button>
            </div>
            <div class="p8-scale-row">
              <span class="p8-scale-badge fill">scale_fill</span>
              <span class="p8-scale-code" id="p8-scale-fill-code">scale_fill_brewer(palette = "Set1")</span>
              <button class="p8-copy-btn" id="p8-copy-fill">复制</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- scale_color vs scale_fill 说明 -->
    <div class="p8-scale-explain">
      <div class="p8-scale-card color">
        <div class="p8-scale-card-title">scale_color_*() / scale_colour_*()</div>
        <p>控制<strong>几何对象的边框/线条/点</strong>的颜色。适用于 <code>geom_point()</code>、<code>geom_line()</code>、<code>geom_boxplot()</code> 等。</p>
        <p style="margin-top:8px;">例：<code>aes(color = group)</code> → <code>scale_color_brewer()</code></p>
      </div>
      <div class="p8-scale-card fill">
        <div class="p8-scale-card-title">scale_fill_*()</div>
        <p>控制<strong>几何对象的填充区域</strong>的颜色。适用于 <code>geom_col()</code>、<code>geom_histogram()</code>、<code>geom_violin()</code> 等。</p>
        <p style="margin-top:8px;">例：<code>aes(fill = group)</code> → <code>scale_fill_npg()</code></p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Section 2: 主题定制器 ═══════════ -->
<section id="p8-theme" class="p8-theme-section">
  <div class="p8-theme-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">出版级调整</span>
      <h2 class="p8-sec-title">主题定制器</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-dark-2);">
        调节 15+ 参数，实时预览图表效果，同步生成完整的 <code style="font-family:var(--font-code);color:var(--accent);font-size:0.9em;">theme()</code> R 代码。
      </p>
    </div>

    <div class="p8-theme-layout">
      <!-- Left: tabbed controls -->
      <div class="p8-theme-controls">
        <div class="p8-ctrl-tabs" id="p8-ctrl-tabs">
          <button class="p8-ctrl-tab active" data-panel="base">主题基础</button>
          <button class="p8-ctrl-tab" data-panel="grid">坐标&amp;网格</button>
          <button class="p8-ctrl-tab" data-panel="legend">图例</button>
          <button class="p8-ctrl-tab" data-panel="text">标注</button>
        </div>

        <!-- Panel 1: 主题基础 -->
        <div class="p8-ctrl-group-panel active" data-panel="base">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">基础主题 theme_*()</span>
            <div class="p8-btn-group" id="p8-base-theme-btns">
              <button class="p8-btn-opt active" data-theme="minimal">minimal</button>
              <button class="p8-btn-opt" data-theme="classic">classic</button>
              <button class="p8-btn-opt" data-theme="bw">bw</button>
              <button class="p8-btn-opt" data-theme="void">void</button>
              <button class="p8-btn-opt" data-theme="dark2">dark2</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">配色方案 <span class="p8-ctrl-label-val" id="p8-palette-name-val">Default</span></span>
            <div class="p8-mini-pals" id="p8-mini-pals">
              ${V.map((t,e)=>`
              <button class="p8-mini-pal${e===0?" active":""}" data-pal-idx="${e}" title="${t.name}">
                <div class="p8-mini-pal-dots">
                  ${t.colors.map(a=>`<span class="p8-mini-pal-dot" style="background:${a}"></span>`).join("")}
                </div>
                <div class="p8-mini-pal-name">${t.name}</div>
              </button>`).join("")}
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">背景色 panel.background</span>
            <div class="p8-bg-swatches" id="p8-bg-swatches">
              <button class="p8-bg-swatch active" data-bg="#ffffff" style="background:#ffffff;" title="white"></button>
              <button class="p8-bg-swatch" data-bg="#fafafa" style="background:#fafafa;" title="grey98"></button>
              <button class="p8-bg-swatch" data-bg="#f5f5f5" style="background:#f5f5f5;" title="grey97"></button>
              <button class="p8-bg-swatch" data-bg="#f0f4f8" style="background:#f0f4f8;" title="#f0f4f8"></button>
              <button class="p8-bg-swatch" data-bg="#fffbf0" style="background:#fffbf0;" title="warm white"></button>
              <button class="p8-bg-swatch" data-bg="#1d1d1f" style="background:#1d1d1f;border-color:#555;" title="dark"></button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">字体族 base_family</span>
            <div class="p8-btn-group" id="p8-font-family-btns">
              <button class="p8-btn-opt active" data-font="sans">无衬线</button>
              <button class="p8-btn-opt" data-font="serif">衬线</button>
              <button class="p8-btn-opt" data-font="mono">等宽</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">基础字号 base_size <span class="p8-ctrl-label-val" id="p8-fontsize-val">12</span> pt</span>
            <input type="range" class="p8-range-slider" id="p8-fontsize" min="8" max="20" value="12" step="1">
          </div>
        </div>

        <!-- Panel 2: 坐标与网格 -->
        <div class="p8-ctrl-group-panel" data-panel="grid">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">网格线 panel.grid</span>
            <div class="p8-btn-group" id="p8-grid-btns">
              <button class="p8-btn-opt" data-grid="both">主+次</button>
              <button class="p8-btn-opt active" data-grid="major">仅主</button>
              <button class="p8-btn-opt" data-grid="none">无</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">网格颜色</span>
            <div class="p8-btn-group" id="p8-grid-color-btns">
              <button class="p8-btn-opt active" data-gridcolor="light">浅灰 grey90</button>
              <button class="p8-btn-opt" data-gridcolor="medium">中灰 grey80</button>
              <button class="p8-btn-opt" data-gridcolor="white">白色 white</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">坐标轴线 axis.line</span>
            <div class="p8-btn-group" id="p8-axis-btns">
              <button class="p8-btn-opt active" data-axis="show">显示</button>
              <button class="p8-btn-opt" data-axis="none">隐藏</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">刻度方向 axis.ticks</span>
            <div class="p8-btn-group" id="p8-ticks-btns">
              <button class="p8-btn-opt active" data-ticks="outside">向外</button>
              <button class="p8-btn-opt" data-ticks="inside">向内</button>
              <button class="p8-btn-opt" data-ticks="none">无刻度</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">X 轴标签旋转 <span class="p8-ctrl-label-val" id="p8-axis-angle-val">0°</span></span>
            <input type="range" class="p8-range-slider" id="p8-axis-angle" min="0" max="90" value="0" step="15">
          </div>
        </div>

        <!-- Panel 3: 图例 -->
        <div class="p8-ctrl-group-panel" data-panel="legend">
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例位置 legend.position</span>
            <div class="p8-btn-group" id="p8-legend-pos-btns">
              <button class="p8-btn-opt active" data-legendpos="right">右侧</button>
              <button class="p8-btn-opt" data-legendpos="bottom">底部</button>
              <button class="p8-btn-opt" data-legendpos="top">顶部</button>
              <button class="p8-btn-opt" data-legendpos="left">左侧</button>
              <button class="p8-btn-opt" data-legendpos="none">隐藏</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">排列方向 legend.direction</span>
            <div class="p8-btn-group" id="p8-legend-dir-btns">
              <button class="p8-btn-opt active" data-legenddir="vertical">垂直</button>
              <button class="p8-btn-opt" data-legenddir="horizontal">水平</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例框 legend.box.background</span>
            <div class="p8-btn-group" id="p8-legend-box-btns">
              <button class="p8-btn-opt active" data-legendbox="none">无边框</button>
              <button class="p8-btn-opt" data-legendbox="rect">加边框</button>
            </div>
          </div>
          <div class="p8-ctrl-group">
            <span class="p8-ctrl-label">图例键大小 legend.key.size</span>
            <div class="p8-btn-group" id="p8-legend-key-btns">
              <button class="p8-btn-opt" data-legendkey="small">小 0.8×</button>
              <button class="p8-btn-opt active" data-legendkey="medium">中 1×</button>
              <button class="p8-btn-opt" data-legendkey="large">大 1.4×</button>
            </div>
          </div>
        </div>

        <!-- Panel 4: 文字标注 -->
        <div class="p8-ctrl-group-panel" data-panel="text">
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">显示标题 plot.title</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-title" checked>
              <span class="p8-toggle-track"></span>
            </label>
          </div>
          <div class="p8-ctrl-group" id="p8-title-align-group">
            <span class="p8-ctrl-label">标题对齐 hjust</span>
            <div class="p8-btn-group" id="p8-title-align-btns">
              <button class="p8-btn-opt active" data-align="left">左对齐</button>
              <button class="p8-btn-opt" data-align="center">居中</button>
              <button class="p8-btn-opt" data-align="right">右对齐</button>
            </div>
          </div>
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">显示图注 plot.caption</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-caption">
              <span class="p8-toggle-track"></span>
            </label>
          </div>
          <div class="p8-toggle-row">
            <span class="p8-toggle-label">趋势回归线 geom_smooth()</span>
            <label class="p8-toggle">
              <input type="checkbox" id="p8-show-regline" checked>
              <span class="p8-toggle-track"></span>
            </label>
          </div>
        </div>
      </div>

      <!-- Right: preview + code -->
      <div class="p8-theme-preview-wrap">
        <div class="p8-theme-chart-box" id="p8-theme-chart-box"></div>
        <div class="p8-code-box">
          <div class="p8-code-box-header">
            <span class="p8-code-box-title">theme() 完整代码</span>
            <button class="p8-copy-btn" id="p8-theme-copy-btn">复制</button>
          </div>
          <div class="p8-code-editor-wrap" id="p8-theme-editor"></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════ Section 3: ggsave 生成器 ═══════════ -->
<section id="p8-ggsave" class="p8-ggsave-section">
  <div class="p8-ggsave-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">出版导出</span>
      <h2 class="p8-sec-title" style="color:var(--text-on-light);">ggsave 代码生成器</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-light-2);">
        选择目标期刊，自动填充尺寸、DPI 和格式要求，一键生成完整导出代码。
      </p>
    </div>

    <!-- Journal buttons -->
    <div class="p8-journal-grid" id="p8-journal-btns">
      ${Object.entries(nt).map(([t,e])=>`
        <button class="p8-journal-btn${t==="nature"?" active":""}"
                data-journal="${t}"
                style="${t==="nature"?`background:${e.color};`:""}">
          ${e.label}
        </button>`).join("")}
    </div>

    <!-- Controls -->
    <div class="p8-ggsave-controls">
      <div class="p8-ctrl-section">
        <span class="p8-ctrl-section-label">栏宽</span>
        <div class="p8-light-btn-group" id="p8-col-btns">
          <button class="p8-light-btn active" data-col="1">单栏</button>
          <button class="p8-light-btn" data-col="1.5">1.5 栏</button>
          <button class="p8-light-btn" data-col="2">双栏</button>
        </div>
      </div>
      <div class="p8-ctrl-section">
        <span class="p8-ctrl-section-label">格式</span>
        <div class="p8-light-btn-group" id="p8-fmt-btns">
          <button class="p8-light-btn active" data-fmt="PDF">PDF</button>
          <button class="p8-light-btn" data-fmt="TIFF">TIFF</button>
          <button class="p8-light-btn" data-fmt="PNG">PNG</button>
          <button class="p8-light-btn" data-fmt="SVG">SVG</button>
          <button class="p8-light-btn" data-fmt="EPS">EPS</button>
        </div>
      </div>
    </div>

    <!-- Specs display -->
    <div class="p8-specs-row">
      <div class="p8-spec-item">
        <div class="p8-spec-label">宽度</div>
        <div class="p8-spec-value" id="p8-spec-width">89 mm</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">最大高度</div>
        <div class="p8-spec-value" id="p8-spec-height">234 mm</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">DPI</div>
        <div class="p8-spec-value" id="p8-spec-dpi">300</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">字体</div>
        <div class="p8-spec-value" id="p8-spec-font" style="font-size:0.82rem;">Helvetica</div>
      </div>
      <div class="p8-spec-item">
        <div class="p8-spec-label">字号</div>
        <div class="p8-spec-value" id="p8-spec-fontnote" style="font-size:0.72rem;">6–9 pt</div>
      </div>
    </div>

    <!-- Code output -->
    <div class="p8-code-output-light">
      <div class="p8-code-output-header">
        <span class="p8-code-output-title">ggsave() 代码</span>
        <button class="p8-copy-btn" id="p8-ggsave-copy" style="border-color:var(--border-dark);color:var(--text-on-dark-2);">复制</button>
      </div>
      <pre class="p8-code-output-pre" id="p8-ggsave-code"></pre>
    </div>
    <p class="p8-journal-note" id="p8-journal-note"></p>
  </div>
</section>

<!-- ═══════════ Section 4: patchwork ═══════════ -->
<section id="p8-patchwork" class="p8-patchwork-section">
  <div class="p8-patchwork-inner">
    <div class="p8-sec-header">
      <span class="p8-sec-label">多面板布局</span>
      <h2 class="p8-sec-title">patchwork 组合图表</h2>
      <p class="p8-sec-desc" style="color:var(--text-on-dark-2);">
        patchwork 用运算符 <code style="font-family:var(--font-code);color:var(--accent);">|</code> <code style="font-family:var(--font-code);color:var(--accent);">/</code> <code style="font-family:var(--font-code);color:var(--accent);">+</code> 拼接 ggplot 对象，无需学习复杂 API。
      </p>
    </div>

    <div class="p8-layout-tabs" id="p8-layout-tabs">
      ${Y.map(t=>`
        <button class="p8-layout-tab${t.id==="h2"?" active":""}" data-layout="${t.id}">${t.label}</button>
      `).join("")}
    </div>
    <p class="p8-layout-desc" id="p8-layout-desc">${Y[0].desc}</p>

    <div class="p8-patchwork-preview-box" id="p8-patchwork-box"></div>

    <div class="p8-code-box" style="margin-top:var(--space-md);">
      <div class="p8-code-box-header">
        <span class="p8-code-box-title">R 代码</span>
        <button class="p8-copy-btn" id="p8-patchwork-copy">复制</button>
      </div>
      <div class="p8-code-editor-wrap" id="p8-patchwork-editor"></div>
    </div>
  </div>
</section>

<!-- ═══════════ Footer CTA ═══════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">08 / 10</p>
  <h2 class="page-footer-quote">图表的颜色不是装饰，是数据的语言</h2>
  <p class="page-footer-desc">下一页：Python 可视化与数据叙事 — matplotlib、seaborn 与标注技巧</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p8-prev-btn">← ggplot2 工作坊</button>
    <button class="btn-primary" id="p8-next-btn">Python 可视化 →</button>
  </div>
</section>

</div>`}function ae(){l.cleanupFns=[],l.resizeObservers=[],l.codeEditor=null,l.patchEditor=null;const t=tt[0],e=t.groups[0].palettes[0];l.activePkg=t.id,l.activePal=e,l.chartType="bar",l.patchworkLayout="h2";const a=Dt.timeline({delay:.2});a.fromTo("#p8-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),a.fromTo("#p8-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),a.fromTo("#p8-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),a.fromTo("#p8-hero .p8-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),a.fromTo("#p8-hero #p8-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),a.fromTo("#p8-hero .p8-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p8-quicknav .hero-quicknav__item").forEach(n=>{const g=()=>{const i=document.querySelector(n.dataset.target);i&&i.scrollIntoView({behavior:"smooth",block:"start"})};n.addEventListener("click",g),l.cleanupFns.push(()=>n.removeEventListener("click",g))}),U(["#p8-browser .p8-sec-header"],{y:40,start:"top 85%"}),U(["#p8-theme  .p8-sec-header"],{y:40,start:"top 85%"}),U(["#p8-ggsave .p8-sec-header"],{y:40,start:"top 85%"}),U(["#p8-patchwork .p8-sec-header"],{y:40,start:"top 85%"}),Mt(),It(),Rt(),qt(),Gt()}function Mt(){document.querySelectorAll("[data-pkg-toggle]").forEach(t=>{const e=()=>{const a=t.dataset.pkgToggle,n=t.nextElementSibling,g=t.querySelector(".p8-pkg-chevron"),i=n.classList.contains("open");document.querySelectorAll(".p8-pkg-body").forEach(d=>d.classList.remove("open")),document.querySelectorAll(".p8-pkg-chevron").forEach(d=>d.classList.remove("open")),document.querySelectorAll(".p8-pkg-header").forEach(d=>d.classList.remove("active")),i||(n.classList.add("open"),g.classList.add("open"),t.classList.add("active"),l.activePkg=a)};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),document.querySelectorAll(".p8-pal-row").forEach(t=>{const e=()=>{document.querySelectorAll(".p8-pal-row").forEach(d=>d.classList.remove("active")),t.classList.add("active");const a=t.dataset.pkg,n=t.dataset.pal,g=tt.find(d=>d.id===a);let i=null;g.groups.forEach(d=>{const s=d.palettes.find(m=>m.name===n);s&&(i=s)}),i&&(l.activePkg=a,l.activePal=i,at(),ht())};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),document.querySelectorAll("#p8-chart-type-tabs .p8-chart-tab").forEach(t=>{const e=()=>{document.querySelectorAll("#p8-chart-type-tabs .p8-chart-tab").forEach(a=>a.classList.remove("active")),t.classList.add("active"),l.chartType=t.dataset.chart,at()};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),O("p8-copy-color",()=>document.getElementById("p8-scale-color-code")?.textContent||""),O("p8-copy-fill",()=>document.getElementById("p8-scale-fill-code")?.textContent||""),at(),ht()}function jt(){const t=l.activePal;return t?t.colors:["#7EC8E3","#F0B27A","#95D5B2","#B8B8E8","#E07A7A","#F0D264"]}function at(){const t=document.getElementById("p8-chart-wrap");if(!t)return;const e=jt();t.innerHTML="";const a=480,n=300,g=rt(t).append("svg").attr("viewBox",`0 0 ${a} ${n}`).attr("preserveAspectRatio","xMidYMid meet");g.append("rect").attr("width",a).attr("height",n).attr("fill","#ffffff");const i={top:20,right:20,bottom:36,left:44},d=a-i.left-i.right,s=n-i.top-i.bottom,m=g.append("g").attr("transform",`translate(${i.left},${i.top})`);if(l.chartType==="bar"){const u=kt.slice(0,Math.min(e.length,6)),c=Pt.slice(0,u.length),p=_t().domain(u).range([0,d]).padding(.25),f=T().domain([0,ut(c)*1.1]).range([s,0]);m.append("g").attr("class","grid").call(S(f).tickSize(-d).tickFormat("")).call(o=>{o.select(".domain").remove(),o.selectAll("line").attr("stroke","#e8e8e8")}),m.selectAll(".bar").data(u).join("rect").attr("class","bar").attr("x",o=>p(o)).attr("y",(o,r)=>f(c[r])).attr("width",p.bandwidth()).attr("height",(o,r)=>s-f(c[r])).attr("fill",(o,r)=>e[r%e.length]).attr("rx",2),m.append("g").attr("transform",`translate(0,${s})`).call(G(p)).call(o=>{o.select(".domain").attr("stroke","#ccc"),o.selectAll("text").attr("fill","#666").attr("font-size","10px"),o.selectAll("line").remove()}),m.append("g").call(S(f).ticks(5)).call(o=>{o.select(".domain").remove(),o.selectAll("text").attr("fill","#666").attr("font-size","10px"),o.selectAll("line").remove()})}else if(l.chartType==="scatter"){const u=[...new Set(Z.map(o=>o.g))].slice(0,Math.min(e.length,4)),c=Z.filter(o=>u.includes(o.g)),p=T().domain([0,9]).range([0,d]),f=T().domain([0,10]).range([s,0]);m.append("g").call(S(f).tickSize(-d).tickFormat("")).call(o=>{o.select(".domain").remove(),o.selectAll("line").attr("stroke","#e8e8e8")}),m.append("g").attr("transform",`translate(0,${s})`).call(G(p).tickSize(-s).tickFormat("")).call(o=>{o.select(".domain").remove(),o.selectAll("line").attr("stroke","#e8e8e8")}),m.selectAll("circle").data(c).join("circle").attr("cx",o=>p(o.x)).attr("cy",o=>f(o.y)).attr("r",4.5).attr("fill",o=>e[o.g%e.length]).attr("opacity",.85),m.append("g").attr("transform",`translate(0,${s})`).call(G(p).ticks(5)).call(o=>{o.select(".domain").attr("stroke","#ccc"),o.selectAll("text").attr("fill","#666").attr("font-size","10px"),o.selectAll("line").remove()}),m.append("g").call(S(f).ticks(5)).call(o=>{o.select(".domain").remove(),o.selectAll("text").attr("fill","#666").attr("font-size","10px"),o.selectAll("line").remove()})}else{const u=Tt.slice(0,Math.min(e.length,4)),c=u.flatMap(r=>r.pts),p=T().domain([0,12]).range([0,d]),f=T().domain([zt(c,r=>r.y)-5,ut(c,r=>r.y)+5]).range([s,0]);m.append("g").call(S(f).tickSize(-d).tickFormat("")).call(r=>{r.select(".domain").remove(),r.selectAll("line").attr("stroke","#e8e8e8")});const o=St().x(r=>p(r.x)).y(r=>f(r.y)).curve(Lt.alpha(.5));u.forEach((r,b)=>{m.append("path").datum(r.pts).attr("fill","none").attr("stroke",e[b%e.length]).attr("stroke-width",2.5).attr("d",o),m.selectAll(`.dot-${b}`).data(r.pts).join("circle").attr("cx",y=>p(y.x)).attr("cy",y=>f(y.y)).attr("r",3).attr("fill",e[b%e.length])}),m.append("g").attr("transform",`translate(0,${s})`).call(G(p).ticks(5)).call(r=>{r.select(".domain").attr("stroke","#ccc"),r.selectAll("text").attr("fill","#666").attr("font-size","10px"),r.selectAll("line").remove()}),m.append("g").call(S(f).ticks(5)).call(r=>{r.select(".domain").remove(),r.selectAll("text").attr("fill","#666").attr("font-size","10px"),r.selectAll("line").remove()})}}function ht(){const t=tt.find(m=>m.id===l.activePkg),e=l.activePal;if(!t||!e)return;const a=document.getElementById("p8-active-pal-name"),n=document.getElementById("p8-active-pkg-name"),g=document.getElementById("p8-scale-color-code"),i=document.getElementById("p8-scale-fill-code");a&&(a.textContent=e.name),n&&(n.textContent=t.label);let d="",s="";t.id==="RColorBrewer"?(d=`scale_color_brewer(palette = "${e.name}")`,s=`scale_fill_brewer(palette = "${e.name}")`):t.id==="viridis"?(d=`scale_color_viridis_d(option = "${e.name}")`,s=`scale_fill_viridis_c(option = "${e.name}")`):t.id==="ggsci"?(d=`scale_color_${e.name}()`,s=`scale_fill_${e.name}()`):t.id==="wesanderson"?(d=`scale_color_manual(values = wes_palette("${e.name}"))`,s=`scale_fill_manual(values = wes_palette("${e.name}"))`):t.id==="MetBrewer"&&(d=`scale_color_met_d("${e.name}")`,s=`scale_fill_met_d("${e.name}")`),g&&(g.textContent=d),i&&(i.textContent=s)}function It(){const t=l.themeParams;function e(c,p,f){document.querySelectorAll(`${c} .p8-btn-opt`).forEach(o=>{const r=()=>{document.querySelectorAll(`${c} .p8-btn-opt`).forEach(b=>b.classList.remove("active")),o.classList.add("active"),t[p]=o.dataset[f],z(),P()};o.addEventListener("click",r),l.cleanupFns.push(()=>o.removeEventListener("click",r))})}document.querySelectorAll("#p8-ctrl-tabs .p8-ctrl-tab").forEach(c=>{const p=()=>{document.querySelectorAll("#p8-ctrl-tabs .p8-ctrl-tab").forEach(o=>o.classList.remove("active")),document.querySelectorAll(".p8-ctrl-group-panel").forEach(o=>o.classList.remove("active")),c.classList.add("active");const f=document.querySelector(`.p8-ctrl-group-panel[data-panel="${c.dataset.panel}"]`);f&&f.classList.add("active")};c.addEventListener("click",p),l.cleanupFns.push(()=>c.removeEventListener("click",p))}),e("#p8-base-theme-btns","baseTheme","theme"),e("#p8-font-family-btns","fontFamily","font"),e("#p8-grid-btns","gridLines","grid"),e("#p8-grid-color-btns","gridColor","gridcolor"),e("#p8-axis-btns","axisLines","axis"),e("#p8-ticks-btns","axisTicks","ticks"),e("#p8-legend-pos-btns","legendPos","legendpos"),e("#p8-legend-dir-btns","legendDir","legenddir"),e("#p8-legend-box-btns","legendBox","legendbox"),e("#p8-legend-key-btns","legendKey","legendkey"),e("#p8-title-align-btns","titleAlign","align"),document.querySelectorAll("#p8-mini-pals .p8-mini-pal").forEach(c=>{const p=()=>{document.querySelectorAll("#p8-mini-pals .p8-mini-pal").forEach(o=>o.classList.remove("active")),c.classList.add("active"),t.paletteIdx=parseInt(c.dataset.palIdx);const f=document.getElementById("p8-palette-name-val");f&&(f.textContent=V[t.paletteIdx].name),z(),P()};c.addEventListener("click",p),l.cleanupFns.push(()=>c.removeEventListener("click",p))}),document.querySelectorAll("#p8-bg-swatches .p8-bg-swatch").forEach(c=>{const p=()=>{document.querySelectorAll("#p8-bg-swatches .p8-bg-swatch").forEach(f=>f.classList.remove("active")),c.classList.add("active"),t.bgColor=c.dataset.bg,z(),P()};c.addEventListener("click",p),l.cleanupFns.push(()=>c.removeEventListener("click",p))});const a=document.getElementById("p8-fontsize"),n=document.getElementById("p8-fontsize-val");if(a){const c=()=>{t.fontSize=parseInt(a.value),n&&(n.textContent=t.fontSize),z(),P()};a.addEventListener("input",c),l.cleanupFns.push(()=>a.removeEventListener("input",c))}const g=document.getElementById("p8-axis-angle"),i=document.getElementById("p8-axis-angle-val");if(g){const c=()=>{t.axisAngle=parseInt(g.value),i&&(i.textContent=t.axisAngle+"°"),z(),P()};g.addEventListener("input",c),l.cleanupFns.push(()=>g.removeEventListener("input",c))}const d=document.getElementById("p8-show-title");if(d){const c=()=>{t.showTitle=d.checked;const p=document.getElementById("p8-title-align-group");p&&(p.style.opacity=t.showTitle?"1":"0.4"),z(),P()};d.addEventListener("change",c),l.cleanupFns.push(()=>d.removeEventListener("change",c))}const s=document.getElementById("p8-show-caption");if(s){const c=()=>{t.showCaption=s.checked,z(),P()};s.addEventListener("change",c),l.cleanupFns.push(()=>s.removeEventListener("change",c))}const m=document.getElementById("p8-show-regline");if(m){const c=()=>{t.showRegline=m.checked,z(),P()};m.addEventListener("change",c),l.cleanupFns.push(()=>m.removeEventListener("change",c))}const u=document.getElementById("p8-theme-editor");u&&(l.codeEditor=yt(u,{code:ot(),language:"r",readOnly:!0})),O("p8-theme-copy-btn",()=>ot()),z()}function z(){const t=document.getElementById("p8-theme-chart-box");if(!t)return;const e=l.themeParams;t.innerHTML="";const a=580,n=390,g=rt(t).append("svg").attr("viewBox",`0 0 ${a} ${n}`).attr("preserveAspectRatio","xMidYMid meet"),i=e.bgColor==="#1d1d1f"||e.baseTheme==="dark2",d=i?"#e8e8e8":"#222222",s=i?"#aaaaaa":"#555555",m=V[e.paletteIdx].colors,u=Math.min(m.length,4),c={sans:"Helvetica, Arial, sans-serif",serif:'Georgia, "Times New Roman", serif',mono:'"Courier New", monospace'},p=c[e.fontFamily]||c.sans,f={minimal:{plotBg:e.bgColor,gridMajC:i?"rgba(255,255,255,0.1)":"#e5e5e5",gridMinC:i?"rgba(255,255,255,0.05)":"#f2f2f2",axisLineC:"none",outerBorder:!1},classic:{plotBg:e.bgColor,gridMajC:"none",gridMinC:"none",axisLineC:i?"#aaaaaa":"#333333",outerBorder:!1},bw:{plotBg:e.bgColor,gridMajC:i?"rgba(255,255,255,0.14)":"#dddddd",gridMinC:"none",axisLineC:"none",outerBorder:!0,borderColor:i?"#888888":"#444444"},void:{plotBg:e.bgColor,gridMajC:"none",gridMinC:"none",axisLineC:"none",outerBorder:!1},dark2:{plotBg:"#2a2a2e",gridMajC:"rgba(255,255,255,0.1)",gridMinC:"rgba(255,255,255,0.04)",axisLineC:"none",outerBorder:!1}},o=f[e.baseTheme]||f.minimal,r={light:i?"rgba(255,255,255,0.1)":"#e8e8e8",medium:i?"rgba(255,255,255,0.2)":"#cccccc",white:"rgba(255,255,255,0.9)"},b=o.gridMajC==="none"?"none":r[e.gridColor]||o.gridMajC,y=o.gridMinC==="none"?"none":e.gridColor==="white"?"rgba(255,255,255,0.5)":i?"rgba(255,255,255,0.05)":"#f2f2f2",F=e.legendDir==="horizontal",A=e.legendPos==="none",L=Math.max(7,e.fontSize*.65),E={small:7,medium:9,large:13}[e.legendKey]||9,$=["Group A","Group B","Group C","Group D"].slice(0,u),X=62,H=E+10,M=F?$.length*X:74,j=F?H+4:$.length*H+4,st=e.showTitle,it=e.showCaption,ct=st?32:0,pt=it?18:0,wt=e.axisAngle>30?14:0,h={top:14+ct+(e.legendPos==="top"&&!A?j+6:0),right:e.legendPos==="right"&&!A?M+10:16,bottom:36+pt+wt+(e.legendPos==="bottom"&&!A?j+8:0),left:e.legendPos==="left"&&!A?M+10:46},k=a-h.left-h.right,w=n-h.top-h.bottom,Ft=e.baseTheme==="dark2"?"#1a1a2e":i?"#2a2a2e":"#f0f0f0";g.append("rect").attr("width",a).attr("height",n).attr("fill",Ft);const C=g.append("g").attr("transform",`translate(${h.left},${h.top})`);C.append("rect").attr("width",k).attr("height",w).attr("fill",o.plotBg).attr("stroke",o.outerBorder?o.borderColor:"none").attr("stroke-width",o.outerBorder?1:0);const N=T().domain([0,9]).range([0,k]),I=T().domain([0,10]).range([w,0]);if(e.gridLines!=="none"&&b!=="none"&&(C.append("g").call(S(I).tickSize(-k).tickFormat("").ticks(5)).call(v=>{v.select(".domain").remove(),v.selectAll("line").attr("stroke",b).attr("stroke-width",.7)}),C.append("g").attr("transform",`translate(0,${w})`).call(G(N).tickSize(-w).tickFormat("").ticks(5)).call(v=>{v.select(".domain").remove(),v.selectAll("line").attr("stroke",b).attr("stroke-width",.7)})),e.gridLines==="both"&&y!=="none"&&C.append("g").call(S(I).tickSize(-k).tickFormat("").ticks(10)).call(v=>{v.select(".domain").remove(),v.selectAll("line").attr("stroke",y).attr("stroke-width",.35).attr("stroke-dasharray","2,3")}),e.axisLines==="show"&&o.axisLineC!=="none"||e.baseTheme==="classic"){const v=o.axisLineC!=="none"?o.axisLineC:i?"#888":"#444";C.append("line").attr("x1",0).attr("y1",w).attr("x2",k).attr("y2",w).attr("stroke",v).attr("stroke-width",.9),C.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",w).attr("stroke",v).attr("stroke-width",.9)}if(e.baseTheme==="bw"&&(C.append("line").attr("x1",k).attr("y1",0).attr("x2",k).attr("y2",w).attr("stroke",o.borderColor).attr("stroke-width",.8),C.append("line").attr("x1",0).attr("y1",0).attr("x2",k).attr("y2",0).attr("stroke",o.borderColor).attr("stroke-width",.8)),e.showRegline)for(let v=0;v<u;v++){const x=Z.filter(D=>D.g===v);if(x.length<2)continue;const B=x.length,R=x.reduce((D,_)=>D+_.x,0),q=x.reduce((D,_)=>D+_.y,0),W=x.reduce((D,_)=>D+_.x*_.x,0),J=x.reduce((D,_)=>D+_.x*_.y,0),et=(B*J-R*q)/(B*W-R*R),mt=(q-et*R)/B,ft=0,vt=9,Ct=Math.max(0,Math.min(10,et*ft+mt)),Bt=Math.max(0,Math.min(10,et*vt+mt));C.append("line").attr("x1",N(ft)).attr("y1",I(Ct)).attr("x2",N(vt)).attr("y2",I(Bt)).attr("stroke",m[v%m.length]).attr("stroke-width",1.2).attr("stroke-dasharray","5,3").attr("opacity",.55)}const Et=Math.max(3,Math.min(5.5,e.fontSize*.28));Z.filter(v=>v.g<u).forEach(v=>{C.append("circle").attr("cx",N(v.x)).attr("cy",I(v.y)).attr("r",Et).attr("fill",m[v.g%m.length]).attr("opacity",.85).attr("stroke",o.plotBg).attr("stroke-width",.5)});const K=i?"#666":"#aaa",dt=Math.max(8,e.fontSize*.72)+"px",gt={outside:4,inside:-4,none:0}[e.axisTicks]||4;if(e.baseTheme!=="void"){const v=C.append("g").attr("transform",`translate(0,${w})`).call(G(N).ticks(5).tickSize(gt));v.select(".domain").attr("stroke",K),v.selectAll("text").attr("fill",s).attr("font-size",dt).attr("font-family",p),v.selectAll("line").attr("stroke",K),e.axisTicks==="none"&&v.selectAll("line").remove(),e.axisAngle>0&&v.selectAll("text").attr("transform",`rotate(${e.axisAngle})`).attr("text-anchor","start").attr("dx","0.4em");const x=C.append("g").call(S(I).ticks(5).tickSize(gt));x.select(".domain").attr("stroke",K),x.selectAll("text").attr("fill",s).attr("font-size",dt).attr("font-family",p),x.selectAll("line").attr("stroke",K),e.axisTicks==="none"&&x.selectAll("line").remove();const B=Math.max(9,e.fontSize*.82)+"px";g.append("text").attr("x",h.left+k/2).attr("y",n-pt-3).attr("text-anchor","middle").attr("font-size",B).attr("fill",d).attr("font-family",p).text("X Variable"),g.append("text").attr("transform",`translate(12,${h.top+w/2}) rotate(-90)`).attr("text-anchor","middle").attr("font-size",B).attr("fill",d).attr("font-family",p).text("Y Variable")}if(st){const v={left:h.left,center:a/2,right:a-h.right},x={left:"start",center:"middle",right:"end"},B=Math.max(11,e.fontSize*1.05)+"px";g.append("text").attr("x",v[e.titleAlign]||h.left).attr("y",12+ct*.55).attr("text-anchor",x[e.titleAlign]||"start").attr("font-size",B).attr("font-weight",700).attr("fill",d).attr("font-family",p).text("Gene Expression vs. Treatment")}if(it&&g.append("text").attr("x",a-h.right).attr("y",n-3).attr("text-anchor","end").attr("font-size",Math.max(7,e.fontSize*.6)+"px").attr("fill",s).attr("font-family",p).text("Source: Gene Expression Dataset, 2024"),!A){let v,x;e.legendPos==="right"?(v=h.left+k+8,x=h.top+(w-j)/2):e.legendPos==="bottom"?(v=h.left+(k-M)/2,x=h.top+w+28):e.legendPos==="top"?(v=h.left+(k-M)/2,x=h.top-j-6):e.legendPos==="left"?(v=4,x=h.top+(w-j)/2):(v=h.left+k-M,x=h.top+8);const B=g.append("g").attr("transform",`translate(${v},${x})`);e.legendBox==="rect"&&B.append("rect").attr("x",-4).attr("y",-4).attr("width",M+4).attr("height",j+4).attr("fill","none").attr("stroke",i?"#555":"#ccc").attr("stroke-width",.8).attr("rx",3),$.forEach((R,q)=>{const W=F?q*X:0,J=F?0:q*H;B.append("circle").attr("cx",W+E/2).attr("cy",J+E/2).attr("r",Math.max(3,E/2)).attr("fill",m[q%m.length]),B.append("text").attr("x",W+E+4).attr("y",J+E/2+3.5).attr("font-size",L+"px").attr("fill",d).attr("font-family",p).text(R)})}}function ot(){const t=l.themeParams,a={"#ffffff":'"white"',"#fafafa":'"grey98"',"#f5f5f5":'"grey97"',"#f0f4f8":'"#f0f4f8"',"#fffbf0":'"#fffbf0"',"#1d1d1f":'"#1d1d1f"'}[t.bgColor]||`"${t.bgColor}"`,n={sans:'"Helvetica"',serif:'"Georgia"',mono:'"Courier New"'}[t.fontFamily]||'"Helvetica"',i=V[t.paletteIdx].colors.map(E=>`"${E}"`).join(", "),d=t.gridLines==="none"?"element_blank()":t.gridColor==="light"?'element_line(color = "grey90",  linewidth = 0.4)':t.gridColor==="medium"?'element_line(color = "grey80",  linewidth = 0.5)':'element_line(color = "white",   linewidth = 0.5)',s=t.gridLines==="both"?'element_line(color = "grey95", linewidth = 0.2)':"element_blank()",m=t.axisLines==="show"?'element_line(color = "grey70", linewidth = 0.5)':"element_blank()",u=t.axisTicks==="none"?"element_blank()":'element_line(color = "grey70", linewidth = 0.4)',c=t.axisTicks==="inside"?'unit(-0.15, "cm")':'unit(0.15, "cm")',p=t.axisAngle>0?`element_text(angle = ${t.axisAngle}, hjust = 1, vjust = 1)`:"element_text()",f=`"${t.legendPos}"`,o=`"${t.legendDir}"`,r=t.legendBox==="rect"?'element_rect(color = "grey70", linewidth = 0.5)':"element_blank()",b={small:'unit(0.8, "lines")',medium:'unit(1, "lines")',large:'unit(1.4, "lines")'}[t.legendKey]||'unit(1, "lines")',y=t.titleAlign==="left"?0:t.titleAlign==="center"?.5:1,F=t.showTitle?`element_text(size = ${Math.round(t.fontSize*1.1)}, face = "bold", hjust = ${y})`:"element_blank()",A=t.showCaption?`element_text(size = ${Math.round(t.fontSize*.7)}, hjust = 1, color = "grey50")`:"element_blank()",L=t.showRegline?`
  geom_smooth(method = "lm", se = FALSE,
              linetype = "dashed", alpha = 0.6) +`:"";return`library(ggplot2)

# 配色方案：${V[t.paletteIdx].name}
palette_colors <- c(${i})

ggplot(df, aes(x, y, color = group)) +
  geom_point(size = ${(t.fontSize*.28).toFixed(1)}, alpha = 0.85) +${L}
  scale_color_manual(values = palette_colors) +
  labs(
    title   = "Gene Expression vs. Treatment",
    x       = "X Variable",
    y       = "Y Variable",
    caption = "Source: Gene Expression Dataset"
  ) +
  theme_${t.baseTheme}(
    base_size   = ${t.fontSize},
    base_family = ${n}
  ) +
  theme(
    panel.background      = element_rect(fill = ${a}, color = NA),
    panel.grid.major      = ${d},
    panel.grid.minor      = ${s},
    axis.line             = ${m},
    axis.ticks            = ${u},
    axis.ticks.length     = ${c},
    axis.text.x           = ${p},
    axis.text             = element_text(
      size  = ${Math.round(t.fontSize*.75)},
      color = "grey40"
    ),
    axis.title            = element_text(
      size  = ${Math.round(t.fontSize*.85)},
      color = "grey20"
    ),
    plot.title            = ${F},
    plot.caption          = ${A},
    legend.position       = ${f},
    legend.direction      = ${o},
    legend.box.background = ${r},
    legend.key.size       = ${b},
    legend.text           = element_text(
      size = ${Math.round(t.fontSize*.75)}
    )
  )`}function P(){l.codeEditor&&l.codeEditor.setCode(ot())}function Rt(){document.querySelectorAll("#p8-journal-btns .p8-journal-btn").forEach(t=>{const e=()=>{document.querySelectorAll("#p8-journal-btns .p8-journal-btn").forEach(n=>{n.classList.remove("active"),n.style.background=""}),t.classList.add("active");const a=t.dataset.journal;t.style.background=nt[a].color,l.ggsaveParams.journal=a,Q()};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),document.querySelectorAll("#p8-col-btns .p8-light-btn").forEach(t=>{const e=()=>{document.querySelectorAll("#p8-col-btns .p8-light-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),l.ggsaveParams.col=t.dataset.col,Q()};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),document.querySelectorAll("#p8-fmt-btns .p8-light-btn").forEach(t=>{const e=()=>{document.querySelectorAll("#p8-fmt-btns .p8-light-btn").forEach(a=>a.classList.remove("active")),t.classList.add("active"),l.ggsaveParams.format=t.dataset.fmt,Q()};t.addEventListener("click",e),l.cleanupFns.push(()=>t.removeEventListener("click",e))}),O("p8-ggsave-copy",()=>document.getElementById("p8-ggsave-code")?.textContent||""),Q()}function Q(){const{journal:t,col:e,format:a}=l.ggsaveParams,n=nt[t],g=e==="1.5"?1.5:parseFloat(e),i=n.cols[g]||n.cols[1],d=Math.round(i*.75),s=typeof n.dpi=="object"?n.dpi.color:n.dpi,m=a.toLowerCase(),u=(b,y)=>{const F=document.getElementById(b);F&&(F.textContent=y)};u("p8-spec-width",i+" mm"),u("p8-spec-height",n.maxHeight+" mm max"),u("p8-spec-dpi",s+(typeof n.dpi=="object"?" (彩图)":"")),u("p8-spec-font",n.font),u("p8-spec-fontnote",n.fontNote);const c=document.getElementById("p8-journal-note");c&&(c.textContent=n.notes);const p=a==="PDF"?"cairo_pdf":a==="TIFF"?'"tiff"':a==="SVG"?'"svg"':a==="EPS"?"cairo_ps":'"png"',f=a!=="PDF"&&a!=="SVG"&&a!=="EPS"?`
  dpi     = ${s},`:"",o=`# ${n.label} 期刊导出规范
# 宽度：${i} mm，最大高度：${n.maxHeight} mm
# 字体：${n.font}（${n.fontNote}）

ggsave(
  filename = "figure_1.${m}",
  plot     = last_plot(),
  width    = ${i},
  height   = ${d},
  units    = "mm",${f}
  device   = ${p}
)

# 如果使用 Cairo 引擎（推荐嵌入字体）:
# library(Cairo)
# CairoPDF("figure_1.pdf", width = ${(i/25.4).toFixed(2)}, height = ${(d/25.4).toFixed(2)})
# print(p)
# dev.off()`,r=document.getElementById("p8-ggsave-code");r&&(r.textContent=o)}function qt(){document.querySelectorAll("#p8-layout-tabs .p8-layout-tab").forEach(e=>{const a=()=>{document.querySelectorAll("#p8-layout-tabs .p8-layout-tab").forEach(n=>n.classList.remove("active")),e.classList.add("active"),l.patchworkLayout=e.dataset.layout,xt()};e.addEventListener("click",a),l.cleanupFns.push(()=>e.removeEventListener("click",a))});const t=document.getElementById("p8-patchwork-editor");t&&(l.patchEditor=yt(t,{code:Y[0].code,language:"r",readOnly:!0})),O("p8-patchwork-copy",()=>{const e=Y.find(a=>a.id===l.patchworkLayout);return e?e.code:""}),xt()}function xt(){const t=Y.find(r=>r.id===l.patchworkLayout);if(!t)return;const e=document.getElementById("p8-layout-desc");e&&(e.textContent=t.desc),l.patchEditor&&l.patchEditor.setCode(t.code);const a=document.getElementById("p8-patchwork-box");if(!a)return;a.innerHTML="";const n=700,g=240,i=rt(a).append("svg").attr("viewBox",`0 0 ${n} ${g}`).attr("preserveAspectRatio","xMidYMid meet");i.append("rect").attr("width",n).attr("height",g).attr("fill","#1a1a2e");const d=["#7EC8E3","#F0B27A","#95D5B2","#B8B8E8"],s=16,m=14,u=8,c=[[.15,.3],[.35,.55],[.55,.25],[.7,.7],[.25,.75],[.8,.4],[.45,.4],[.6,.6]];function p(r,b,y,F,A,L){const E=i.append("g");E.append("rect").attr("x",r).attr("y",b).attr("width",y).attr("height",F).attr("fill",d[L]).attr("opacity",.18).attr("rx",u).attr("stroke",d[L]).attr("stroke-width",1.5);const $=20;c.forEach(([X,H])=>{E.append("circle").attr("cx",r+$+X*(y-$*2)).attr("cy",b+$+H*(F-$*2)).attr("r",2.5).attr("fill",d[L]).attr("opacity",.65)}),E.append("text").attr("x",r+10).attr("y",b+22).attr("font-family","monospace").attr("font-size",m).attr("font-weight",700).attr("fill",d[L]).text(A)}const f=n-s*2,o=g-s*2;if(t.id==="h2"){const r=(f-12)/2;p(s,s,r,o,"A",0),p(s+r+12,s,r,o,"B",1)}else if(t.id==="v2"){const r=(o-12)/2;p(s,s,f,r,"A",0),p(s,s+r+12,f,r,"B",1)}else if(t.id==="h2v"){const r=o*.55,b=o-r-12,y=(f-12)/2;p(s,s,y,r,"A",0),p(s+y+12,s,y,r,"B",1),p(s,s+r+12,f,b,"C",2)}else{const r=(f-12)/2,b=(o-12)/2;p(s,s,r,b,"A",0),p(s+r+12,s,r,b,"B",1),p(s,s+b+12,r,b,"C",2),p(s+r+12,s+b+12,r,b,"D",3)}}function Gt(){const t=document.getElementById("p8-prev-btn"),e=document.getElementById("p8-next-btn");if(t){const a=()=>bt("m1-p7");t.addEventListener("click",a),l.cleanupFns.push(()=>t.removeEventListener("click",a))}if(e){const a=()=>bt("m1-p9");e.addEventListener("click",a),l.cleanupFns.push(()=>e.removeEventListener("click",a))}}function O(t,e){const a=document.getElementById(t);if(!a)return;const n=async()=>{try{await navigator.clipboard.writeText(e()),a.textContent="已复制 ✓",a.classList.add("copied"),setTimeout(()=>{a.textContent="复制",a.classList.remove("copied")},2e3)}catch{}};a.addEventListener("click",n),l.cleanupFns.push(()=>a.removeEventListener("click",n))}function oe(){if(At(),l.cleanupFns.forEach(t=>{try{t()}catch{}}),l.cleanupFns=[],l.codeEditor){try{l.codeEditor.destroy()}catch{}l.codeEditor=null}if(l.patchEditor){try{l.patchEditor.destroy()}catch{}l.patchEditor=null}l.resizeObservers.forEach(t=>t.disconnect()),l.resizeObservers=[]}export{oe as destroy,ae as init,ee as render};
