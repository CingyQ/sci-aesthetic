import{k as P,g as M,f as l}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as _}from"./CodeEditor-CmZbxDVd.js";import{n as u}from"./index-DQN0JRtp.js";let B=[],L=[],m=null;const E=[{id:"rect",name:"rect 矩形",preview:'<rect x="20" y="20" width="120" height="80" rx="8" fill="#95D5B2" stroke="#1d1d1f" stroke-width="2"/>',attrs:[{name:"x, y",desc:"矩形左上角坐标"},{name:"width, height",desc:"宽高"},{name:"rx, ry",desc:"圆角半径（实现圆角矩形）"},{name:"fill",desc:"填充色（颜色/渐变/none）"},{name:"stroke",desc:"描边颜色"},{name:"stroke-width",desc:"描边粗细"}],use:"流程图节点、背景色块、数据表格边框"},{id:"circle",name:"circle 圆",preview:'<circle cx="80" cy="60" r="50" fill="#7EC8E3" stroke="#1d1d1f" stroke-width="2"/>',attrs:[{name:"cx, cy",desc:"圆心坐标"},{name:"r",desc:"半径"},{name:"fill, stroke",desc:"填充和描边"}],use:"数据点、图例符号、步骤圆圈"},{id:"path",name:"path 路径",preview:'<path d="M10 90 C30 10 100 10 120 90" fill="none" stroke="#95D5B2" stroke-width="3"/><circle cx="10" cy="90" r="4" fill="#F0B27A"/><circle cx="120" cy="90" r="4" fill="#F0B27A"/>',attrs:[{name:"M x y",desc:"移动到 (x,y)（不绘制线）"},{name:"L x y",desc:"绘制直线到 (x,y)"},{name:"C x1 y1 x2 y2 x y",desc:"三次贝塞尔曲线"},{name:"Q x1 y1 x y",desc:"二次贝塞尔曲线"},{name:"Z",desc:"闭合路径（连回起点）"}],use:"箭头、弯曲连接线、有机轮廓、自定义图标"},{id:"text",name:"text 文字",preview:'<text x="80" y="40" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#1d1d1f">图表标题</text><text x="80" y="70" text-anchor="middle" font-family="Arial" font-size="10" fill="#6e6e73">Treatment vs Control, n=30</text>',attrs:[{name:"x, y",desc:"文字基线起点坐标"},{name:"text-anchor",desc:"水平对齐：start/middle/end"},{name:"dominant-baseline",desc:"垂直对齐：auto/middle/hanging"},{name:"font-size",desc:"字号（pt 或 px）"},{name:"font-family",desc:"字体族（需要嵌入或系统字体）"}],use:"图表标题、坐标轴标签、数据标注"},{id:"line",name:"line 直线",preview:'<line x1="10" y1="60" x2="150" y2="60" stroke="#424245" stroke-width="2"/><line x1="10" y1="60" x2="10" y2="10" stroke="#424245" stroke-width="2"/><line x1="20" y1="40" x2="150" y2="40" stroke="#d2d2d7" stroke-width="1" stroke-dasharray="4 3"/><text x="5" y="64" font-size="8" fill="#6e6e73">x</text><text x="12" y="14" font-size="8" fill="#6e6e73">y</text>',attrs:[{name:"x1, y1",desc:"起点坐标"},{name:"x2, y2",desc:"终点坐标"},{name:"stroke-dasharray",desc:'虚线模式（如 "4 3" = 4px线+3px空）'}],use:"坐标轴、网格线、分隔线"},{id:"gradient",name:"渐变 defs",preview:'<defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7EC8E3"/><stop offset="100%" stop-color="#95D5B2"/></linearGradient></defs><rect x="10" y="20" width="140" height="80" rx="8" fill="url(#g1)"/>',attrs:[{name:"&lt;defs&gt;",desc:"定义可复用元素（渐变/滤镜/图案）"},{name:"linearGradient",desc:"线性渐变（x1/y1/x2/y2 定义方向）"},{name:"radialGradient",desc:"径向渐变（cx/cy/r 定义中心和半径）"},{name:"stop",desc:"渐变色标（offset=位置, stop-color=颜色）"},{name:'fill="url(#id)"',desc:"引用已定义的渐变/图案"}],use:"背景渐变、数据条填充、热力图色阶"},{id:"viewbox",name:"viewBox 坐标系",preview:'<rect x="0" y="0" width="160" height="120" fill="none" stroke="#424245" stroke-width="1"/><text x="80" y="12" text-anchor="middle" font-size="8" fill="#6e6e73">viewBox="0 0 160 120"</text><rect x="10" y="20" width="140" height="90" fill="none" stroke="#95D5B2" stroke-width="1" stroke-dasharray="3 2"/><text x="80" y="35" text-anchor="middle" font-size="8" fill="#95D5B2">内容区域</text><text x="80" y="95" text-anchor="middle" font-size="7" fill="#a1a1a6">不论显示尺寸如何，坐标系始终是 160x120</text>',attrs:[{name:'viewBox="x y w h"',desc:"定义内部坐标系（x y = 原点偏移, w h = 内部尺寸）"},{name:"preserveAspectRatio",desc:"保持比例对齐（xMidYMid meet = 居中等比缩放）"},{name:"width, height",desc:"SVG 元素实际渲染尺寸（改变这个不影响内部坐标）"}],use:"响应式 SVG（不设置 width/height，只设 viewBox，CSS 控制大小）"}],z=[{id:"flowchart",name:"流程图节点",code:`<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg"
     width="300" height="160">
  <!-- 样本采集 -->
  <rect x="10" y="60" width="80" height="40" rx="6"
        fill="#2d2d2f" stroke="#95D5B2" stroke-width="1.5"/>
  <text x="50" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#95D5B2">样本采集</text>

  <!-- 箭头 -->
  <line x1="90" y1="80" x2="108" y2="80"
        stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="106,75 116,80 106,85"
           fill="#6e6e73"/>

  <!-- 数据分析 -->
  <rect x="116" y="60" width="80" height="40" rx="6"
        fill="#2d2d2f" stroke="#7EC8E3" stroke-width="1.5"/>
  <text x="156" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#7EC8E3">数据分析</text>

  <!-- 箭头 -->
  <line x1="196" y1="80" x2="214" y2="80"
        stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="212,75 222,80 212,85"
           fill="#6e6e73"/>

  <!-- 结果输出 -->
  <rect x="222" y="60" width="68" height="40" rx="6"
        fill="#2d2d2f" stroke="#B8B8E8" stroke-width="1.5"/>
  <text x="256" y="83" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#B8B8E8">结果输出</text>
</svg>`},{id:"arrow",name:"科研弯箭头",code:`<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
     width="200" height="120">
  <!-- 弯曲路径 -->
  <path d="M20 90 C20 40 100 20 160 60"
        fill="none" stroke="#95D5B2"
        stroke-width="2.5" stroke-linecap="round"/>

  <!-- 箭头头部 -->
  <polygon points="155,52 168,63 155,68"
           fill="#95D5B2"/>

  <!-- 标注 -->
  <text x="85" y="28" text-anchor="middle"
        font-family="Arial" font-size="10" fill="#a1a1a6">
    信号传导方向
  </text>

  <!-- 起点标记 -->
  <circle cx="20" cy="90" r="4" fill="#F0B27A"/>
  <text x="20" y="105" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#F0B27A">起点</text>
</svg>`},{id:"scatter",name:"散点图框架",code:`<svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg"
     width="240" height="180">
  <!-- 坐标轴 -->
  <line x1="40" y1="20" x2="40" y2="150"
        stroke="#424245" stroke-width="1.5"/>
  <line x1="40" y1="150" x2="220" y2="150"
        stroke="#424245" stroke-width="1.5"/>

  <!-- 网格线 -->
  <line x1="40" y1="110" x2="220" y2="110"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="40" y1="70" x2="220" y2="70"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="100" y1="20" x2="100" y2="150"
        stroke="#2d2d2f" stroke-width="0.8"/>
  <line x1="160" y1="20" x2="160" y2="150"
        stroke="#2d2d2f" stroke-width="0.8"/>

  <!-- 数据点（Group A）-->
  <circle cx="60" cy="130" r="4" fill="#7EC8E3" opacity="0.8"/>
  <circle cx="75" cy="120" r="4" fill="#7EC8E3" opacity="0.8"/>
  <circle cx="85" cy="125" r="4" fill="#7EC8E3" opacity="0.8"/>

  <!-- 数据点（Group B）-->
  <circle cx="130" cy="85" r="4" fill="#95D5B2" opacity="0.8"/>
  <circle cx="145" cy="75" r="4" fill="#95D5B2" opacity="0.8"/>
  <circle cx="155" cy="80" r="4" fill="#95D5B2" opacity="0.8"/>

  <!-- 标签 -->
  <text x="130" y="168" text-anchor="middle"
        font-family="Arial" font-size="11" fill="#a1a1a6">X 轴标签</text>
  <text x="16" y="90" text-anchor="middle"
        transform="rotate(-90,16,90)"
        font-family="Arial" font-size="11" fill="#a1a1a6">Y 轴标签</text>
  <text x="130" y="14" text-anchor="middle"
        font-family="Arial" font-size="12" font-weight="bold" fill="#f5f5f7">
    实验组对比
  </text>
</svg>`},{id:"gradient-bg",name:"渐变背景",code:`<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg"
     width="200" height="120">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d1d2e"/>
      <stop offset="50%" stop-color="#0d2137"/>
      <stop offset="100%" stop-color="#1d1d2e"/>
    </linearGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#95D5B2" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#95D5B2" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- 背景 -->
  <rect width="200" height="120" fill="url(#bgGrad)"/>

  <!-- 发光效果 -->
  <ellipse cx="100" cy="60" rx="80" ry="50"
           fill="url(#glowGrad)"/>

  <!-- 内容文字 -->
  <text x="100" y="55" text-anchor="middle"
        font-family="Arial" font-size="14" font-weight="bold" fill="#f5f5f7">
    科研美学
  </text>
  <text x="100" y="74" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#a1a1a6">
    SciAesthetic
  </text>
</svg>`},{id:"timeline",name:"时间线",code:`<svg viewBox="0 0 280 100" xmlns="http://www.w3.org/2000/svg"
     width="280" height="100">
  <!-- 主轴线 -->
  <line x1="20" y1="50" x2="260" y2="50"
        stroke="#424245" stroke-width="2"/>

  <!-- 阶段节点 -->
  <circle cx="60" cy="50" r="8" fill="#95D5B2"/>
  <circle cx="120" cy="50" r="8" fill="#7EC8E3"/>
  <circle cx="180" cy="50" r="8" fill="#B8B8E8"/>
  <circle cx="240" cy="50" r="8" fill="#F0B27A"/>

  <!-- 标签 -->
  <text x="60" y="30" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#95D5B2">采样</text>
  <text x="120" y="30" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#7EC8E3">分析</text>
  <text x="180" y="75" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#B8B8E8">建模</text>
  <text x="240" y="75" text-anchor="middle"
        font-family="Arial" font-size="9" fill="#F0B27A">验证</text>

  <!-- 时间节点文字 -->
  <text x="60" y="67" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第1周</text>
  <text x="120" y="67" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第3周</text>
  <text x="180" y="38" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第5周</text>
  <text x="240" y="38" text-anchor="middle"
        font-family="Arial" font-size="8" fill="#6e6e73">第8周</text>
</svg>`},{id:"molecule",name:"分子结构",code:`<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"
     width="200" height="160">
  <!-- 化学键（线） -->
  <line x1="100" y1="40" x2="60" y2="80" stroke="#6e6e73" stroke-width="2"/>
  <line x1="100" y1="40" x2="140" y2="80" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="80" x2="60" y2="120" stroke="#6e6e73" stroke-width="2"/>
  <line x1="140" y1="80" x2="140" y2="120" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="120" x2="100" y2="140" stroke="#6e6e73" stroke-width="2"/>
  <line x1="140" y1="120" x2="100" y2="140" stroke="#6e6e73" stroke-width="2"/>
  <line x1="60" y1="80" x2="30" y2="60" stroke="#6e6e73" stroke-width="1.5"/>
  <line x1="140" y1="80" x2="170" y2="60" stroke="#6e6e73" stroke-width="1.5"/>

  <!-- 原子 -->
  <circle cx="100" cy="40" r="12" fill="#E07A7A"/>
  <circle cx="60" cy="80" r="12" fill="#7EC8E3"/>
  <circle cx="140" cy="80" r="12" fill="#7EC8E3"/>
  <circle cx="60" cy="120" r="12" fill="#95D5B2"/>
  <circle cx="140" cy="120" r="12" fill="#95D5B2"/>
  <circle cx="100" cy="140" r="12" fill="#7EC8E3"/>
  <circle cx="30" cy="60" r="8" fill="#f5f5f7"/>
  <circle cx="170" cy="60" r="8" fill="#f5f5f7"/>

  <!-- 元素符号 -->
  <text x="100" y="44" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">O</text>
  <text x="60" y="84" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="140" y="84" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="60" y="124" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">N</text>
  <text x="140" y="124" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">N</text>
  <text x="100" y="144" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="9" font-weight="bold" fill="white">C</text>
  <text x="30" y="60" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="7" font-weight="bold" fill="#1d1d1f">H</text>
  <text x="170" y="60" text-anchor="middle" dominant-baseline="middle"
        font-family="Arial" font-size="7" font-weight="bold" fill="#1d1d1f">H</text>
</svg>`}],q=[{id:"simplify",title:"路径精简",icon:"✂",badLabel:"优化前",badBytes:"847 B",badCode:`<path d="M 10.000 20.000 C 10.123 19.876
  15.432 18.921 20.000 18.000
  C 24.567 17.079 29.876 16.124
  35.000 16.000 L 120.000 16.000
  C 125.124 16.000 129.876 16.000
  134.000 16.000" fill="#95D5B2"/>`,goodLabel:"优化后",goodBytes:"312 B",goodCode:`<path d="M10 20C10 19 15 18 20 18
  C24 17 29 16 35 16
  L120 16C125 16 129 16 134 16"
  fill="#95D5B2"/>`,reduction:"63%",note:"工具：Illustrator → 对象 → 路径 → 简化 / SVGO CLI（--precision=0）"},{id:"attrs",title:"移除冗余属性",icon:"🧹",badLabel:"优化前（含默认值）",badBytes:"520 B",badCode:`<svg x="0px" y="0px" version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  xml:space="preserve">
  <rect x="0" y="0" width="100" height="60"
        fill="none" opacity="1"
        transform="translate(0,0) scale(1)"
        stroke-opacity="1" fill-rule="nonzero"/>
</svg>`,goodLabel:"优化后（移除默认值）",goodBytes:"118 B",goodCode:`<svg xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="60"/>
</svg>`,reduction:"77%",note:"Illustrator 导出常带大量不必要属性，SVGO 可自动清除"},{id:"defs",title:"合理使用 defs",icon:"♻",badLabel:"优化前（重复定义）",badBytes:"~10 KB",badCode:`<!-- 每个色条都有独立渐变定义（x20 条） -->
<rect fill="url(#grad1)"/>
<linearGradient id="grad1">...</linearGradient>
<rect fill="url(#grad2)"/>
<linearGradient id="grad2">...</linearGradient>
<!-- ... 重复 20 次 -->`,goodLabel:"优化后（defs 一次定义）",goodBytes:"~2 KB",goodCode:`<!-- 在 defs 中定义一次，多处复用 -->
<defs>
  <linearGradient id="heatGrad">
    <stop offset="0%" stop-color="#2196F3"/>
    <stop offset="100%" stop-color="#F44336"/>
  </linearGradient>
</defs>
<!-- 所有热力图色条共享同一渐变 -->
<rect fill="url(#heatGrad)"/>`,reduction:"80%",note:"热力图色阶可从 10KB 减到 2KB；图标库同理，一个 symbol 多处 use"}],V=[{id:"latex",name:"LaTeX",icon:"TeX",desc:"在 LaTeX 文档中使用 SVG",code:`% 方法1：使用 includesvg（推荐）
\\usepackage{svg}
\\includesvg[width=0.8\\linewidth]{figure1.svg}

% 方法2：转换为 PDF 后导入
% inkscape figure1.svg --export-pdf=figure1.pdf
\\includegraphics[width=0.8\\linewidth]{figure1.pdf}`,note:"注意：pdfLaTeX 不直接支持 SVG，需要先转为 PDF 或使用 svg 宏包（需安装 Inkscape）"},{id:"web",name:"Web/HTML",icon:"</>",desc:"在网页中嵌入和样式化 SVG",code:`<!-- 方法1：内联 SVG（可用 CSS 控制） -->
<svg viewBox="0 0 200 100">
  <circle cx="100" cy="50" r="40" class="my-circle"/>
</svg>
<style>
  .my-circle { fill: #95D5B2; transition: fill 0.3s; }
  .my-circle:hover { fill: #7EC8E3; }
</style>

<!-- 方法2：img 标签（不可样式化） -->
<img src="figure.svg" width="400" alt="图表"/>`,note:"内联 SVG 可以通过 CSS 变量控制颜色，实现暗色模式适配"},{id:"office",name:"Office/PPT",icon:"▦",desc:"在 PowerPoint/Word 中使用 SVG",code:`# R 导出为 SVG 供 PPT 使用
library(svglite)
svglite("figure.svg", width = 6, height = 4)
ggplot(data, aes(x, y, color = group)) +
  geom_point(size = 3) +
  theme_minimal(base_size = 14)
dev.off()

# Python 导出 SVG
fig.savefig("figure.svg", format="svg",
            bbox_inches="tight", dpi=300)`,note:"Office 2016+ 支持直接插入 SVG（插入→图片→选 SVG 文件）。字体需要目标机器安装，否则用通用字体"},{id:"print",name:"印刷/期刊",icon:"⬡",desc:"SVG 转为印刷用 PDF/EPS",code:`# 命令行：Inkscape 转 PDF（推荐）
inkscape figure.svg --export-pdf=figure.pdf

# 命令行：Inkscape 转 EPS（部分期刊要求）
inkscape figure.svg --export-eps=figure.eps

# Python：matplotlib 直接导出 PDF（含 SVG 矢量信息）
fig.savefig("figure.pdf", format="pdf",
            bbox_inches="tight")`,note:'印刷时确保字体已嵌入 PDF（Illustrator：文件→存储为→PDF，勾选"嵌入所有字体"）'}];function w(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function f(e,o,a,s){e&&(e.addEventListener(o,a,s),B.push({el:e,type:o,fn:a,opts:s}))}const F=new Set(["svg","g","path","rect","circle","ellipse","line","polyline","polygon","text","tspan","textpath","image","use","defs","symbol","clippath","mask","pattern","lineargradient","radialgradient","stop","filter","feblend","fecolormatrix","fecomposite","feconvolvematrix","fediffuselighting","fedisplacementmap","fedropshadow","feflood","fegaussianblur","feimage","femerge","femergenode","femorphology","feoffset","fespecularlighting","fetile","feturbulence","marker","title","desc","animate","animatetransform","animatemotion","mpath","set","metadata","switch"]),O=/^(on|xlink:href$|href$)/i;function S(e){if(!F.has(e.tagName.toLowerCase())){e.remove();return}const o=Array.from(e.attributes);for(const a of o)(O.test(a.name)||a.value&&/javascript:/i.test(a.value))&&e.removeAttribute(a.name);Array.from(e.children).forEach(S)}function H(e){const a=new DOMParser().parseFromString(e,"image/svg+xml");if(a.querySelector("parsererror")){const p=document.createElement("div");p.innerHTML=e.replace(/<script[\s\S]*?<\/script>/gi,"");const t=p.querySelector("svg");return t?(S(t),t.outerHTML):'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40"><text y="20" x="8" fill="#ef4444" font-size="12">Parse error — 请检查 SVG 语法</text></svg>'}const d=a.documentElement;return S(d),d.outerHTML}function k(e,o,a){try{o.innerHTML=H(e)}catch{}if(a){const s=new Blob([e]).size;a.textContent=s+" B"}}function $(e){return e.attrs.map(o=>`
    <div class="p05-attr-row">
      <code class="p05-attr-name">${o.name}</code>
      <span class="p05-attr-desc">${o.desc}</span>
    </div>
  `).join("")}function X(){const e=E.map((t,c)=>`
    <button class="p05-elem-tab${c===0?" active":""}" data-elem="${t.id}" style="min-height:44px;">${t.name}</button>
  `).join(""),o=E[0],a=z.map((t,c)=>`
    <button class="p05-tmpl-btn${c===0?" active":""}" data-tmpl="${t.id}" style="min-height:44px;">${t.name}</button>
  `).join(""),s=q.map(t=>`
    <div class="p05-opt-card">
      <div class="p05-opt-header">
        <span class="p05-opt-icon">${t.icon}</span>
        <h3 class="p05-opt-title">${t.title}</h3>
        <span class="p05-opt-badge">减少 <strong>${t.reduction}</strong></span>
      </div>
      <div class="p05-opt-compare">
        <div class="p05-opt-col">
          <div class="p05-opt-col-header p05-opt-bad-header">
            <span>${t.badLabel}</span>
            <span class="p05-opt-bytes p05-opt-bytes-bad">${t.badBytes}</span>
          </div>
          <pre class="p05-code-block p05-code-bad">${w(t.badCode)}</pre>
        </div>
        <div class="p05-opt-col">
          <div class="p05-opt-col-header p05-opt-good-header">
            <span>${t.goodLabel}</span>
            <span class="p05-opt-bytes p05-opt-bytes-good">${t.goodBytes}</span>
          </div>
          <pre class="p05-code-block p05-code-good">${w(t.goodCode)}</pre>
        </div>
      </div>
      <p class="p05-opt-note">${t.note}</p>
    </div>
  `).join(""),d=V.map((t,c)=>`
    <button class="p05-scene-tab${c===0?" active":""}" data-scene="${t.id}" style="min-height:44px;">
      <span class="p05-scene-icon">${t.icon}</span>
      <span>${t.name}</span>
    </button>
  `).join(""),p=V.map((t,c)=>`
    <div class="p05-scene-panel${c===0?" active":""}" id="p05-scene-${t.id}">
      <p class="p05-scene-desc">${t.desc}</p>
      <pre class="p05-code-block p05-scene-code">${w(t.code)}</pre>
      <p class="p05-scene-note"><span class="p05-note-label">注意：</span>${t.note}</p>
    </div>
  `).join("");return`<div class="page-scroll">
<style>
/* ── p05 hero ── */
.p05-hero { position:relative; overflow:hidden; align-items:center; }
/* rgba(149,213,178,…) = --module-3:#95D5B2  rgba(126,200,227,…) = --module-1(accent):#7EC8E3 */
.p05-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 55% 45% at 25% 35%, rgba(149,213,178,0.15) 0%, transparent 65%); animation:p05-drift-a 12s ease-in-out infinite; pointer-events:none; }
.p05-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 75% 65%, rgba(126,200,227,0.1) 0%, transparent 65%); animation:p05-drift-b 8s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p05-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-12px)} }
@keyframes p05-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-16px,20px)} }
.p05-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p05-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p05-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 元素图解 ── */
.p05-elem-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-lg); }
.p05-elem-tab { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-elem-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p05-elem-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); font-weight:600; }

.p05-elem-content { display:grid; grid-template-columns:260px 1fr; gap:var(--space-xl); align-items:start; }
.p05-svg-preview-wrap { position:relative; background:var(--bg-light,#fff); border-radius:var(--radius-md); border:1px solid var(--border-light); width:240px; height:180px; display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,0.06); }
.p05-svg-canvas { width:160px; height:120px; }
.p05-svg-size-label { position:absolute; top:8px; left:8px; font-family:var(--font-code); font-size:10px; color:var(--text-on-light-2); background:rgba(210,210,215,0.7); padding:2px 6px; border-radius:4px; }

.p05-attr-list { flex:1; }
.p05-attr-list-title { font-size:0.78rem; font-weight:700; color:var(--module-3,#95D5B2); margin-bottom:var(--space-sm); letter-spacing:0.08em; text-transform:uppercase; }
.p05-attr-row { display:grid; grid-template-columns:140px 1fr; gap:var(--space-sm); padding:10px 0; border-bottom:1px solid var(--border-light); align-items:baseline; }
.p05-attr-row:last-of-type { border-bottom:none; }
.p05-attr-name { font-family:var(--font-code); font-size:0.8rem; color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); padding:2px 8px; border-radius:4px; white-space:nowrap; }
.p05-attr-desc { font-size:0.88rem; color:var(--text-on-light-2); line-height:1.6; }
.p05-use-pill { display:inline-flex; align-items:center; gap:6px; background:rgba(149,213,178,0.1); border:1px solid rgba(149,213,178,0.3); border-radius:var(--radius-full); padding:6px 14px; font-size:0.82rem; color:var(--module-3,#95D5B2); margin-top:var(--space-md); }
.p05-use-pill .p05-use-label { font-weight:700; }

/* ── S2 编辑器 ── */
.p05-template-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-md); }
.p05-tmpl-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-tmpl-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.06); }
.p05-tmpl-btn.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }

.p05-editor-wrap { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:start; }
.p05-editor-pane { background:var(--bg-dark-elevated); border-radius:var(--radius-md); overflow:hidden; }
.p05-preview-pane { background:var(--bg-dark-elevated); border-radius:var(--radius-md); overflow:hidden; }
.p05-editor-header { display:flex; justify-content:space-between; align-items:center; padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-dark); font-size:0.75rem; color:var(--text-on-dark-2); }
.p05-preview-header { padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-dark); font-size:0.75rem; color:var(--text-on-dark-2); display:flex; justify-content:space-between; align-items:center; }

/* ── S3 优化策略 ── */
.p05-opt-grid { display:grid; gap:var(--space-xl); }
.p05-opt-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-light); }
.p05-opt-header { display:flex; align-items:center; gap:var(--space-sm); margin-bottom:var(--space-lg); }
.p05-opt-icon { font-size:1.5rem; line-height:1; }
.p05-opt-title { font-size:1.25rem; font-weight:700; color:var(--text-on-light); font-family:var(--font-display); flex:1; margin:0; }
.p05-opt-badge { background:rgba(149,213,178,0.12); border:1px solid rgba(149,213,178,0.4); border-radius:var(--radius-full); padding:4px 12px; font-size:0.82rem; color:var(--module-3,#95D5B2); white-space:nowrap; }
.p05-opt-compare { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); margin-bottom:var(--space-md); }
.p05-opt-col-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.82rem; font-weight:600; }
.p05-opt-bad-header { color:#ef4444; }
.p05-opt-good-header { color:#22c55e; }
.p05-opt-bytes { font-family:var(--font-code); font-size:0.78rem; padding:2px 8px; border-radius:4px; }
.p05-opt-bytes-bad { background:rgba(239,68,68,0.1); color:#ef4444; }
.p05-opt-bytes-good { background:rgba(34,197,94,0.1); color:#22c55e; }
.p05-code-block { font-family:var(--font-code); font-size:0.78rem; line-height:1.6; border-radius:var(--radius-sm); padding:var(--space-sm); margin:0; white-space:pre-wrap; word-wrap:break-word; }
.p05-code-bad  { background:#fff5f5; border:1px solid rgba(239,68,68,0.2); color:#7f1d1d; }
.p05-code-good { background:#f0fdf4; border:1px solid rgba(34,197,94,0.2); color:#14532d; }
.p05-opt-note { font-size:0.85rem; color:var(--text-on-light-2); background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:var(--radius-sm); padding:10px 14px; margin:0; line-height:1.7; }

/* ── S4 使用场景 ── */
.p05-scene-tabs { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:var(--space-xl); }
.p05-scene-tab { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.88rem; cursor:pointer; transition:all 0.2s; font-family:inherit; }
.p05-scene-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p05-scene-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); }
.p05-scene-icon { font-size:0.95rem; font-family:monospace; font-weight:700; }
.p05-scene-panel { display:none; animation:p05-panel-in 0.3s ease; }
.p05-scene-panel.active { display:block; }
@keyframes p05-panel-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.p05-scene-desc { font-size:1rem; color:var(--text-on-dark-2); margin-bottom:var(--space-md); line-height:1.7; }
.p05-scene-code { background:var(--bg-dark-elevated); color:#a8ff78; border:1px solid var(--border-dark); border-radius:var(--radius-md); padding:var(--space-md); font-family:var(--font-code); font-size:0.85rem; line-height:1.7; margin-bottom:var(--space-md); white-space:pre-wrap; word-wrap:break-word; overflow-x:auto; }
.p05-scene-note { font-size:0.85rem; color:var(--text-on-dark-2); background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:var(--radius-sm); padding:12px 16px; line-height:1.7; margin:0; }
.p05-note-label { font-weight:700; color:var(--module-3,#95D5B2); }

/* ── 响应式 ── */
@media (max-width:900px) {
  .p05-elem-content { grid-template-columns:1fr; }
  .p05-svg-preview-wrap { width:100%; }
  .p05-opt-compare { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  #p05-s1, #p05-s2, #p05-s3, #p05-s4 { scroll-margin-top:56px; }
  .p05-editor-wrap { grid-template-columns:1fr; }
  .p05-attr-row { grid-template-columns:1fr; gap:4px; }
  .p05-attr-name { display:inline-block; }
}
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p05-hero" id="p05-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 05</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">SVG 编辑与优化</h1>
    <p class="page-hero-sub" style="opacity:0;">SVG Code: Edit, Optimize, and Master Vector Markup</p>
    <p class="p05-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">SVG 是矢量图的源代码——读懂它，你就拥有了对图表的完全控制权</p>
    <nav class="hero-quicknav" id="p05-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p05-s1">语法图解</button>
      <button class="hero-quicknav__item" data-target="#p05-s2">代码编辑器</button>
      <button class="hero-quicknav__item" data-target="#p05-s3">优化策略</button>
      <button class="hero-quicknav__item" data-target="#p05-s4">使用场景</button>
    </nav>
    <div class="p05-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 SVG 基础语法图解 ── -->
<section class="section-light" id="p05-s1" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">SVG ELEMENTS</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-light);letter-spacing:-0.02em;margin-bottom:var(--space-md);">基础语法交互图解</h2>
      <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">点击元素类型，查看属性说明与实时预览。SVG 只有 7 种核心形状原语，掌握它们就掌握了矢量世界的词汇。</p>
    </div>

    <!-- Tab 按钮 -->
    <div class="p05-elem-tabs" id="p05-elem-tabs">${e}</div>

    <!-- 预览区 + 属性列表 -->
    <div class="p05-elem-content" id="p05-elem-content">
      <!-- 左：SVG 预览 -->
      <div class="p05-svg-preview-wrap">
        <span class="p05-svg-size-label">160 × 120</span>
        <svg class="p05-svg-canvas" id="p05-svg-canvas" viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
          ${o.preview}
        </svg>
      </div>
      <!-- 右：属性列表 -->
      <div class="p05-attr-list">
        <p class="p05-attr-list-title" id="p05-attr-elem-name">${o.name}</p>
        <div id="p05-attr-rows">${$(o)}</div>
        <div class="p05-use-pill" id="p05-use-pill">
          <span class="p05-use-label">适用：</span>
          <span id="p05-use-text">${o.use}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S2 CodeMirror 编辑器 + 实时预览 ── -->
<section class="section-dark" id="p05-s2" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">LIVE EDITOR</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-dark);letter-spacing:-0.02em;margin-bottom:var(--space-md);">SVG 代码编辑器</h2>
      <p style="font-size:1rem;color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">选择科研模板，即时编辑 SVG 代码，右侧实时渲染预览。</p>
    </div>

    <!-- 模板选择 -->
    <div class="p05-template-tabs" id="p05-template-tabs">${a}</div>

    <!-- 编辑器 + 预览双栏 -->
    <div class="p05-editor-wrap">
      <div class="p05-editor-pane">
        <div class="p05-editor-header">
          <span>SVG 代码</span>
          <span id="p05-byte-count" style="font-family:var(--font-code);font-size:0.75rem;color:var(--text-on-dark-3);">0 B</span>
        </div>
        <div id="p05-editor-container" style="height:360px;overflow:auto;"></div>
      </div>
      <div class="p05-preview-pane">
        <div class="p05-preview-header">
          <span>实时预览</span>
          <span style="font-size:0.75rem;color:var(--text-on-dark-3);">安全沙盒渲染</span>
        </div>
        <div id="p05-svg-preview-live" style="background:var(--bg-light,#fff);border-radius:0 0 var(--radius-md) var(--radius-md);padding:var(--space-lg);min-height:320px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-wrap:wrap;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ── S3 SVG 优化策略 ── -->
<section class="section-light" id="p05-s3" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">OPTIMIZATION</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-light);letter-spacing:-0.02em;margin-bottom:var(--space-md);">三种核心优化策略</h2>
      <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;max-width:600px;margin:0 auto;">Illustrator 导出的 SVG 通常比实际需要的大 5-20 倍。以下三步可将文件缩减至最优。</p>
    </div>
    <div class="p05-opt-grid">${s}</div>
  </div>
</section>

<!-- ── S4 使用场景 ── -->
<section class="section-dark" id="p05-s4" style="padding:var(--space-3xl) var(--space-lg);">
  <div class="content-wrapper">
    <div style="text-align:center;margin-bottom:var(--space-xl);">
      <p style="font-family:var(--font-code);font-size:0.75rem;color:var(--module-3,#95D5B2);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">USE CASES</p>
      <h2 style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:700;color:var(--text-on-dark);letter-spacing:-0.02em;margin-bottom:var(--space-md);">SVG 在科研场景的应用</h2>
      <p style="font-size:1rem;color:var(--text-on-dark-2);line-height:1.8;max-width:600px;margin:0 auto;">从 LaTeX 论文到期刊投稿，SVG 适配所有专业输出需求。</p>
    </div>
    <div class="p05-scene-tabs" id="p05-scene-tabs">${d}</div>
    <div id="p05-scene-panels">${p}</div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">05 / 07</p>
  <h2 class="page-footer-quote">SVG 是矢量图的源代码——读懂它，你就拥有了完全的控制权。</h2>
  <p class="page-footer-desc">直接编辑 SVG 代码，让你的科研图形精确到每一个像素。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p05-prev-btn">← 图表美化实战</button>
    <button class="btn-primary" id="p05-next-btn">多面板 Figure →</button>
  </div>
</section>

</div>`}function Y(){const e=M.timeline({delay:.2});e.fromTo(".p05-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),e.fromTo(".p05-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),e.fromTo(".p05-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),e.fromTo(".p05-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),e.fromTo("#p05-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),e.fromTo(".p05-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p05-quicknav .hero-quicknav__item").forEach(n=>{f(n,"click",()=>{const i=document.querySelector(n.dataset.target);i&&i.scrollIntoView({behavior:"smooth"})})});const a=document.getElementById("p05-elem-tabs"),s=document.getElementById("p05-svg-canvas"),d=document.getElementById("p05-attr-elem-name"),p=document.getElementById("p05-attr-rows"),t=document.getElementById("p05-use-text");function c(n){const r=E.find(i=>i.id===n);r&&(a&&a.querySelectorAll(".p05-elem-tab").forEach(i=>{i.classList.toggle("active",i.dataset.elem===n)}),s&&(s.innerHTML=r.preview),d&&(d.textContent=r.name),p&&(p.innerHTML=$(r)),t&&(t.textContent=r.use))}a&&f(a,"click",r=>{const i=r.target.closest(".p05-elem-tab");i&&c(i.dataset.elem)}),l("#p05-s1 .reading-wrapper"),l("#p05-s1 .p05-elem-tabs"),l("#p05-s1 .p05-elem-content");const A=document.getElementById("p05-editor-container"),g=document.getElementById("p05-svg-preview-live"),y=document.getElementById("p05-byte-count"),h=document.getElementById("p05-template-tabs");if(A&&g){const n=z[0].code;m=_(A,{code:n,language:"xml",onChange:r=>{k(r,g,y)}}),k(n,g,y)}h&&f(h,"click",r=>{const i=r.target.closest(".p05-tmpl-btn");if(!i)return;const b=z.find(v=>v.id===i.dataset.tmpl);b&&(h.querySelectorAll(".p05-tmpl-btn").forEach(v=>{v.classList.toggle("active",v.dataset.tmpl===i.dataset.tmpl)}),m&&m.setCode(b.code),g&&k(b.code,g,y))}),l("#p05-s2 .content-wrapper > div:first-child"),l(".p05-template-tabs"),l(".p05-editor-wrap"),l("#p05-s3 .reading-wrapper"),l(".p05-opt-grid .p05-opt-card");const x=document.getElementById("p05-scene-tabs"),G=document.getElementById("p05-scene-panels");function I(n){x&&x.querySelectorAll(".p05-scene-tab").forEach(r=>{r.classList.toggle("active",r.dataset.scene===n)}),G&&G.querySelectorAll(".p05-scene-panel").forEach(r=>{r.classList.toggle("active",r.id===`p05-scene-${n}`)})}x&&f(x,"click",r=>{const i=r.target.closest(".p05-scene-tab");i&&I(i.dataset.scene)}),l("#p05-s4 .content-wrapper > div:first-child"),l("#p05-scene-tabs"),l("#p05-scene-panels");const C=document.getElementById("p05-prev-btn"),D=document.getElementById("p05-home-btn"),T=document.getElementById("p05-next-btn");C&&f(C,"click",()=>u("m3-p4")),D&&f(D,"click",()=>u("m3-p1")),T&&f(T,"click",()=>u("m3-p6")),l(".page-footer-cta .page-footer-num, .page-footer-cta .page-footer-quote, .page-footer-cta .page-footer-nav")}function K(){P(),m&&(m.destroy(),m=null),B.forEach(({el:o,type:a,fn:s,opts:d})=>{o.removeEventListener(a,s,d)}),B=[],L.forEach(o=>o.disconnect()),L=[];const e=document.getElementById("p05-svg-preview-live");e&&(e.innerHTML="")}export{K as destroy,Y as init,X as render};
