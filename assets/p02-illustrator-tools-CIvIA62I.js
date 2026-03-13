import{k as G,g as B,f as x}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as C}from"./index-DQN0JRtp.js";let a=[],g=[];const f=[{id:"select",name:"选择工具",shortcut:"V",category:"select",desc:"选中、移动、缩放和旋转完整对象。按住 Shift 多选，拖拽角点等比缩放。",use:"选中并整体移动图表元素、调整整体尺寸",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect x="40" y="30" width="80" height="60" rx="4" fill="none" stroke="#95D5B2" stroke-width="1.5" stroke-dasharray="4 3" class="select-box" style="opacity:0"/>
  <rect x="50" y="40" width="60" height="40" rx="3" fill="#2d2d4a" stroke="#7EC8E3" stroke-width="1.5" class="select-obj"/>
  <circle cx="40" cy="30" r="4" fill="#95D5B2" class="select-handle" style="opacity:0"/>
  <circle cx="120" cy="30" r="4" fill="#95D5B2" class="select-handle" style="opacity:0"/>
  <circle cx="40" cy="90" r="4" fill="#95D5B2" class="select-handle" style="opacity:0"/>
  <circle cx="120" cy="90" r="4" fill="#95D5B2" class="select-handle" style="opacity:0"/>
  <style>
    .select-box { animation: selectBoxAnim 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .select-handle { animation: selectHandleAnim 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .select-obj { animation: selectObjAnim 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes selectBoxAnim { 0%,20%{opacity:0;transform:scale(0.5)} 40%,80%{opacity:1;transform:scale(1)} 90%,100%{opacity:0;transform:scale(1)} }
    @keyframes selectHandleAnim { 0%,30%{opacity:0} 50%,80%{opacity:1} 90%,100%{opacity:0} }
    @keyframes selectObjAnim { 0%,60%{transform:translate(0,0)} 75%{transform:translate(15px,-10px)} 90%,100%{transform:translate(0,0)} }
  </style>
</svg>`},{id:"direct",name:"直接选择",shortcut:"A",category:"select",desc:"单独编辑锚点和路径段。点击选中锚点（实心方块），拖拽改变路径形状。",use:"微调流程图连接线的弯曲程度、箭头形状",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <path d="M20 80 C60 20 100 20 140 80" fill="none" stroke="#7EC8E3" stroke-width="2" class="da-path"/>
  <rect x="16" y="76" width="8" height="8" fill="#95D5B2"/>
  <rect x="136" y="76" width="8" height="8" fill="#95D5B2"/>
  <circle cx="56" cy="24" r="4" fill="none" stroke="#95D5B2" stroke-width="1.5" class="da-ctrl"/>
  <circle cx="100" cy="24" r="4" fill="none" stroke="#95D5B2" stroke-width="1.5" class="da-ctrl"/>
  <line x1="20" y1="80" x2="56" y2="24" stroke="rgba(149,213,178,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
  <line x1="140" y1="80" x2="100" y2="24" stroke="rgba(149,213,178,0.4)" stroke-width="1" stroke-dasharray="3 2"/>
  <style>
    .da-ctrl { animation: daCtrlMove 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes daCtrlMove { 0%,30%{transform:translate(0,0)} 60%{transform:translate(0,-20px)} 90%,100%{transform:translate(0,0)} }
  </style>
</svg>`},{id:"pen",name:"钢笔工具",shortcut:"P",category:"draw",desc:"点击创建角点，拖拽创建贝塞尔曲线控制手柄。Shift 约束 45° 角，Alt 断开手柄。",use:"绘制自定义箭头、弯曲连接线、有机轮廓形状",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <circle cx="20" cy="100" r="4" fill="#95D5B2"/>
  <circle cx="140" cy="100" r="4" fill="#95D5B2" class="pen-a3" style="opacity:0"/>
  <path d="M20 100 C40 50 70 10 80 30" fill="none" stroke="#95D5B2" stroke-width="2" stroke-dasharray="200" stroke-dashoffset="200" class="pen-path-1"/>
  <path d="M80 30 C90 50 120 50 140 100" fill="none" stroke="#7EC8E3" stroke-width="2" stroke-dasharray="200" stroke-dashoffset="200" class="pen-path-2" style="opacity:0"/>
  <circle cx="80" cy="30" r="4" fill="#F0B27A" class="pen-cursor" style="opacity:0"/>
  <style>
    .pen-path-1 { animation: penP1 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pen-path-2 { animation: penP2 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pen-cursor { animation: penCursor 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pen-a3 { animation: penA3 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes penP1 { 0%,10%{stroke-dashoffset:200} 40%,100%{stroke-dashoffset:0} }
    @keyframes penP2 { 0%,45%{opacity:0;stroke-dashoffset:200} 50%{opacity:1;stroke-dashoffset:200} 80%,100%{stroke-dashoffset:0;opacity:1} }
    @keyframes penCursor { 0%,10%{opacity:0;cx:30;cy:80} 15%,40%{opacity:1;cx:80;cy:30} 50%,75%{opacity:0;cx:140;cy:100} 100%{opacity:0} }
    @keyframes penA3 { 0%,75%{opacity:0} 80%,100%{opacity:1} }
  </style>
</svg>`},{id:"type",name:"文字工具",shortcut:"T",category:"text",desc:"点击添加点文字，拖拽创建区域文字框。双击编辑已有文字。支持 OpenType 特性。",use:"添加图表标题、坐标轴标签、图注标注文字",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect x="20" y="40" width="120" height="50" rx="3" fill="none" stroke="rgba(149,213,178,0.4)" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="30" y="68" font-family="Arial" font-size="13" fill="#1d1d1f" class="type-text">科研图表标题</text>
  <line x1="132" y1="72" x2="132" y2="52" stroke="#95D5B2" stroke-width="1.5" class="type-cursor"/>
  <style>
    .type-cursor { animation: typeCursorBlink 1s step-end infinite; transform-box: fill-box; transform-origin: center; }
    .type-text { animation: typeTextAppear 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes typeCursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes typeTextAppear { 0%,10%{opacity:0} 30%,100%{opacity:1} }
  </style>
</svg>`},{id:"pathfinder",name:"Pathfinder",shortcut:"Shift+Ctrl+F9",category:"shape",desc:"布尔运算：联集/交集/差集/分割。将多个基本形状组合成复杂自定义形状。",use:"制作自定义流程图节点形状、挖空文字效果、复合箭头",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <g class="pf-before">
    <rect x="30" y="35" width="60" height="55" rx="4" fill="rgba(126,200,227,0.3)" stroke="#7EC8E3" stroke-width="1.5"/>
    <circle cx="100" cy="62" r="28" fill="rgba(149,213,178,0.3)" stroke="#95D5B2" stroke-width="1.5"/>
  </g>
  <text x="80" y="20" text-anchor="middle" font-size="9" fill="#6e6e73" font-family="Arial" class="pf-label">布尔运算前</text>
  <text x="80" y="20" text-anchor="middle" font-size="9" font-family="Arial" class="pf-label-after" style="opacity:0">联集（布尔运算后）</text>
  <g class="pf-after" style="opacity:0">
    <rect x="30" y="35" width="60" height="55" rx="4" fill="#95D5B2" opacity="0.85"/>
    <circle cx="100" cy="62" r="28" fill="#95D5B2" opacity="0.85"/>
    <text x="72" y="110" text-anchor="middle" font-size="8" fill="#95D5B2" font-family="Arial" font-weight="600">联集完成</text>
  </g>
  <style>
    .pf-before { animation: pfBefore 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pf-after { animation: pfAfter 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pf-label { animation: pfLabel 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .pf-label-after { animation: pfLabelAfter 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes pfBefore { 0%,50%{opacity:1} 65%,100%{opacity:0} }
    @keyframes pfAfter { 0%,50%{opacity:0} 65%,100%{opacity:1} }
    @keyframes pfLabel { 0%,50%{opacity:1} 65%,100%{opacity:0} }
    @keyframes pfLabelAfter { 0%,55%{opacity:0} 65%,95%{opacity:1;fill:#95D5B2} 100%{opacity:0} }
  </style>
</svg>`},{id:"gradient",name:"渐变工具",shortcut:"G",category:"color",desc:"在选中对象上拖拽定义渐变方向和范围。支持线性渐变和径向渐变，可在画布直接添加/移动色标。",use:"为背景添加渐变过渡、突出重点区域、制作深度感",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <linearGradient id="p02-demo-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1d1d1f"/>
      <stop offset="50%" stop-color="#95D5B2" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#7EC8E3"/>
    </linearGradient>
  </defs>
  <rect x="20" y="35" width="120" height="55" rx="4" fill="url(#p02-demo-grad)"/>
  <line x1="20" y1="62" x2="140" y2="62" stroke="rgba(255,255,255,0.6)" stroke-width="1" stroke-dasharray="3 2"/>
  <circle cx="20" cy="62" r="6" fill="#1d1d1f" stroke="white" stroke-width="1.5"/>
  <circle cx="80" cy="62" r="4" fill="#95D5B2" stroke="white" stroke-width="1" class="grad-mid"/>
  <circle cx="140" cy="62" r="6" fill="#7EC8E3" stroke="white" stroke-width="1.5" class="grad-end"/>
  <style>
    .grad-mid { animation: gradMid 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .grad-end { animation: gradEnd 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes gradMid { 0%,100%{cx:80} 50%{cx:100} }
    @keyframes gradEnd { 0%,100%{cx:140} 50%{cx:150} }
  </style>
</svg>`},{id:"eyedropper",name:"吸管工具",shortcut:"I",category:"color",desc:"从画面任意位置采样颜色（包括其他应用程序）。Option+点击应用颜色到选中对象。",use:"从参考图片/期刊截图中采样配色，统一论文所有图表色调",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect x="10" y="10" width="60" height="40" rx="3" fill="#3b5e8c"/>
  <text x="40" y="34" text-anchor="middle" font-size="8" fill="white" font-family="Arial">参考图</text>
  <rect x="10" y="55" width="60" height="40" rx="3" fill="#7EC8E3"/>
  <rect x="80" y="10" width="70" height="85" rx="3" fill="#f5f5f7" stroke="#d2d2d7" stroke-width="1"/>
  <text x="115" y="56" text-anchor="middle" font-size="9" fill="#6e6e73" font-family="Arial">目标对象</text>
  <g class="eye-cursor">
    <path d="M-4 4 L-12 12 M0 0 L-4 4" stroke="#95D5B2" stroke-width="2" fill="none"/>
    <circle cx="0" cy="0" r="5" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
  </g>
  <rect x="80" y="10" width="70" height="85" rx="3" fill="#3b5e8c" class="eye-apply" style="opacity:0"/>
  <style>
    .eye-cursor { animation: eyeCursor 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .eye-apply { animation: eyeApply 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes eyeCursor { 0%{transform:translate(35px,30px)} 30%{transform:translate(35px,25px)} 50%{transform:translate(100px,50px)} 100%{transform:translate(35px,30px)} }
    @keyframes eyeApply { 0%,45%{opacity:0} 55%,75%{opacity:0.8} 85%,100%{opacity:0} }
  </style>
</svg>`},{id:"align",name:"对齐工具",shortcut:"Shift+F7",category:"layout",desc:"精确对齐和分布多个对象。支持对齐到画板、关键对象或选区。消除手动排列的不精确性。",use:"确保多面板图表间距精确均等、标注文字与图表对齐",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <g class="align-before">
    <rect x="15" y="25" width="30" height="20" rx="3" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
    <rect x="65" y="55" width="30" height="20" rx="3" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
    <rect x="110" y="35" width="30" height="20" rx="3" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
  </g>
  <line x1="10" y1="62" x2="150" y2="62" stroke="rgba(149,213,178,0.5)" stroke-width="1" stroke-dasharray="4 3" class="align-guide" style="opacity:0"/>
  <g class="align-after" style="opacity:0">
    <rect x="15" y="52" width="30" height="20" rx="3" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
    <rect x="65" y="52" width="30" height="20" rx="3" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
    <rect x="110" y="52" width="30" height="20" rx="3" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
  </g>
  <style>
    .align-before { animation: alignBefore 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .align-guide { animation: alignGuide 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .align-after { animation: alignAfter 3.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes alignBefore { 0%,40%{opacity:1} 55%,100%{opacity:0} }
    @keyframes alignGuide { 0%,35%{opacity:0} 50%,65%{opacity:1} 80%,100%{opacity:0} }
    @keyframes alignAfter { 0%,50%{opacity:0} 65%,100%{opacity:1} }
  </style>
</svg>`},{id:"group",name:"编组",shortcut:"Ctrl+G",category:"layout",desc:"将多个对象组合为一个整体，方便整体移动和缩放。双击进入组内编辑单个元素。",use:"将图表各元素（轴/点/标注）打包，一键整体移动到 Figure 指定位置",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <g class="grp-elements">
    <circle cx="40" cy="50" r="12" fill="rgba(126,200,227,0.5)" stroke="#7EC8E3" stroke-width="1.5"/>
    <rect x="70" y="38" width="24" height="24" rx="3" fill="rgba(149,213,178,0.5)" stroke="#95D5B2" stroke-width="1.5"/>
    <polygon points="115,38 127,62 103,62" fill="rgba(240,178,122,0.5)" stroke="#F0B27A" stroke-width="1.5"/>
  </g>
  <rect x="25" y="35" width="108" height="42" rx="5" fill="none" stroke="#95D5B2" stroke-width="2" stroke-dasharray="5 3" class="grp-box" style="opacity:0"/>
  <style>
    .grp-box { animation: grpBox 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .grp-elements { animation: grpElems 3s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes grpBox { 0%,30%{opacity:0} 50%,80%{opacity:1} 90%,100%{opacity:0} }
    @keyframes grpElems { 0%,60%{transform:translate(0,0)} 80%{transform:translate(10px,15px)} 100%{transform:translate(0,0)} }
  </style>
</svg>`},{id:"artboard",name:"画板工具",shortcut:"Shift+O",category:"layout",desc:"创建和管理多个画板，每个画板可设置独立尺寸。支持按照期刊规格精确设置（如 86mm 单栏宽）。",use:"管理 a/b/c/d 多面板 Figure，按期刊规格设置导出尺寸",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <rect x="8" y="14" width="66" height="48" rx="2" fill="#2d2d2f" stroke="#95D5B2" stroke-width="1.5"/>
  <text x="12" y="11" font-size="8" fill="#95D5B2" font-family="Arial" font-weight="600">a</text>
  <rect x="86" y="14" width="66" height="48" rx="2" fill="#2d2d2f" stroke="#424245" stroke-width="1"/>
  <text x="90" y="11" font-size="8" fill="#6e6e73" font-family="Arial">b</text>
  <rect x="8" y="68" width="66" height="42" rx="2" fill="#2d2d2f" stroke="#424245" stroke-width="1"/>
  <text x="12" y="65" font-size="8" fill="#6e6e73" font-family="Arial">c</text>
  <rect x="86" y="68" width="66" height="42" rx="2" fill="#2d2d2f" stroke="#424245" stroke-width="1"/>
  <text x="90" y="65" font-size="8" fill="#6e6e73" font-family="Arial">d</text>
  <line x1="78" y1="5" x2="78" y2="118" stroke="rgba(149,213,178,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
  <line x1="0" y1="64" x2="160" y2="64" stroke="rgba(149,213,178,0.25)" stroke-width="1" stroke-dasharray="3 3"/>
</svg>`},{id:"zoom",name:"缩放工具",shortcut:"Z",category:"view",desc:"点击放大，Alt+点击缩小。Cmd+= 放大，Cmd+- 缩小，Cmd+0 适合窗口，Cmd+1 100%。",use:"精细编辑锚点和路径时切换到 400%+ 视图，导出前在 100% 视图检查字号",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <clipPath id="p02-lens-clip">
      <circle cx="70" cy="55" r="32"/>
    </clipPath>
  </defs>
  <!-- Magnified content area -->
  <g clip-path="url(#p02-lens-clip)">
    <rect x="37" y="22" width="66" height="66" fill="#2d2d2f"/>
    <!-- Chart content inside lens -->
    <line x1="40" y1="80" x2="100" y2="80" stroke="rgba(149,213,178,0.3)" stroke-width="1"/>
    <line x1="40" y1="60" x2="100" y2="60" stroke="rgba(149,213,178,0.3)" stroke-width="1"/>
    <line x1="40" y1="40" x2="100" y2="40" stroke="rgba(149,213,178,0.3)" stroke-width="1"/>
    <rect x="45" y="60" width="8" height="20" fill="#7EC8E3" opacity="0.8"/>
    <rect x="58" y="45" width="8" height="35" fill="#95D5B2" opacity="0.8"/>
    <rect x="71" y="52" width="8" height="28" fill="#7EC8E3" opacity="0.8"/>
    <rect x="84" y="38" width="8" height="42" fill="#F0B27A" opacity="0.8" class="zoom-bar"/>
    <!-- Zoom indicator crosshair -->
    <line x1="68" y1="53" x2="74" y2="53" stroke="#F0B27A" stroke-width="1"/>
    <line x1="71" y1="50" x2="71" y2="56" stroke="#F0B27A" stroke-width="1"/>
  </g>
  <!-- Magnifying glass frame -->
  <circle cx="70" cy="55" r="32" fill="none" stroke="#95D5B2" stroke-width="2"/>
  <circle cx="70" cy="55" r="32" fill="none" stroke="rgba(149,213,178,0.15)" stroke-width="6"/>
  <!-- Handle -->
  <line x1="95" y1="80" x2="125" y2="108" stroke="#95D5B2" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Zoom label -->
  <text x="38" y="18" font-size="8" fill="#95D5B2" font-family="Arial" class="zoom-label">400%</text>
  <style>
    .zoom-bar { animation: zoomBarPulse 2s ease-in-out infinite alternate; transform-box:fill-box; transform-origin:bottom center; }
    .zoom-label { animation: zoomLabelPulse 2s ease-in-out infinite alternate; }
    @keyframes zoomBarPulse { 0%{opacity:0.8;transform:scaleY(1)} 100%{opacity:1;transform:scaleY(1.15)} }
    @keyframes zoomLabelPulse { 0%{opacity:0.6} 100%{opacity:1;fill:#F0B27A} }
  </style>
</svg>`},{id:"scissors",name:"剪刀工具",shortcut:"C",category:"draw",desc:"在路径上的锚点处剪断路径，将一条路径分成两条独立路径。",use:"将自动生成的封闭路径剪开、分离图表区域轮廓用于独立着色",svgDemo:`<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <path d="M20 60 C50 20 110 20 140 60 C110 100 50 100 20 60 Z" fill="none" stroke="#7EC8E3" stroke-width="2" class="sci-path"/>
  <circle cx="80" cy="20" r="5" fill="#95D5B2"/>
  <g transform="translate(80,20)" class="sci-icon">
    <circle cx="-6" cy="-6" r="4" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
    <circle cx="6" cy="-6" r="4" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
    <line x1="-2" y1="-4" x2="4" y2="4" stroke="#95D5B2" stroke-width="1.5"/>
    <line x1="2" y1="-4" x2="-4" y2="4" stroke="#95D5B2" stroke-width="1.5"/>
  </g>
  <path d="M20 60 C50 20 80 20" fill="none" stroke="#95D5B2" stroke-width="2.5" class="sci-left" style="opacity:0"/>
  <path d="M80 20 C110 20 140 60 C110 100 50 100 20 60" fill="none" stroke="#F0B27A" stroke-width="2.5" class="sci-right" style="opacity:0"/>
  <style>
    .sci-path { animation: sciPath 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .sci-left,.sci-right { animation: sciSplit 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    .sci-icon { animation: sciIcon 4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes sciPath { 0%,50%{opacity:1} 65%,100%{opacity:0} }
    @keyframes sciSplit { 0%,55%{opacity:0} 70%,100%{opacity:1} }
    @keyframes sciIcon { 0%,30%{transform:scale(1)} 45%{transform:scale(1.4)} 60%,100%{transform:scale(1)} }
  </style>
</svg>`}],_=[{id:"all",label:"全部"},{id:"select",label:"选择"},{id:"draw",label:"绘制"},{id:"text",label:"文字"},{id:"shape",label:"形状"},{id:"color",label:"颜色"},{id:"layout",label:"布局"},{id:"view",label:"视图"}],j=[{id:"arrow",title:"工作流 A：绘制弯曲箭头",steps:[{tool:"钢笔 (P)",action:"绘制弯曲路径",note:"点击+拖拽创建贝塞尔手柄"},{tool:"描边→轮廓化",action:"Shift+Ctrl+O",note:"将描边转为可填色路径"},{tool:"Pathfinder",action:"联集合并",note:"箭头体+箭头头合并"},{tool:"直接选择 (A)",action:"微调锚点",note:"精细调整箭头弧度"},{tool:"吸管 (I)",action:"采样配色",note:"匹配图表主色调"}],output:"可复用矢量箭头符号（存为图形样式）"},{id:"unify",title:"工作流 B：统一多图表配色",steps:[{tool:"选择 (V)",action:"框选所有图表",note:"或 Ctrl+A 全选"},{tool:"吸管 (I)",action:"从参考图采色",note:"获取期刊官方配色"},{tool:"重新着色",action:"Shift+Ctrl+F",note:"将相近颜色合并统一"},{tool:"编组 (Ctrl+G)",action:"按图表分组",note:"方便后续定位管理"},{tool:"画板 (Shift+O)",action:"各图表单独导出",note:"按期刊尺寸导出 PDF"}],output:"配色统一的多图表集（可直接投稿）"},{id:"multipanel",title:"工作流 C：多面板 Figure",steps:[{tool:"画板 (Shift+O)",action:"创建 4 个画板",note:"按期刊单双栏尺寸设置"},{tool:"导入子图",action:"置入各面板图",note:"File→Place 置入 PDF/SVG"},{tool:"对齐 (Shift+F7)",action:"精确对齐间距",note:"分布间距设为 2mm"},{tool:"文字 (T)",action:"添加 a/b/c/d 标注",note:"8pt 粗体，左上角偏移 2mm"},{tool:"File→Export",action:"导出出版格式",note:"存储为 PDF + 导出 TIFF 300dpi"}],output:"出版级多面板 Figure（符合期刊提交规范）"}],O=[{key:"V",cat:"select",name:"选择工具",scenario:"选中/移动整个图表元素"},{key:"A",cat:"select",name:"直接选择",scenario:"编辑单个锚点和路径"},{key:"Ctrl+G",cat:"select",name:"编组",scenario:"将图表元素打包整体操作"},{key:"Ctrl+Shift+G",cat:"select",name:"解组",scenario:"进入组内编辑单个元素"},{key:"P",cat:"draw",name:"钢笔工具",scenario:"绘制弯曲连接线和箭头"},{key:"C",cat:"draw",name:"剪刀工具",scenario:"剪断路径分离图表区域"},{key:"Shift+Ctrl+O",cat:"draw",name:"轮廓化描边",scenario:"将描边转为可填色路径（制作箭头必备）"},{key:"T",cat:"text",name:"文字工具",scenario:"添加标题/标注/坐标轴标签"},{key:"Shift+Ctrl+F9",cat:"shape",name:"Pathfinder",scenario:"打开布尔运算面板（联集/差集）"},{key:"Shift+F7",cat:"view",name:"对齐面板",scenario:"精确对齐和均等分布多个对象"},{key:"G",cat:"view",name:"渐变工具",scenario:"在对象上直接定义渐变方向"},{key:"Cmd+0",cat:"view",name:"适合窗口",scenario:"查看整体布局，导出前检查"}],V=[{id:"all",label:"全部"},{id:"select",label:"选择与编组"},{id:"draw",label:"绘制"},{id:"text",label:"文字"},{id:"shape",label:"形状"},{id:"view",label:"视图与对齐"}];function W(){return`<div class="page-scroll">
<style>
/* ── p02 hero 光晕 ── */
.p02-hero { position:relative; overflow:hidden; align-items:center; }
.p02-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 30% 40%, rgba(149,213,178,0.15) 0%, transparent 70%); animation:p02-drift-a 12s ease-in-out infinite; pointer-events:none; }
.p02-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 70% 65%, rgba(126,200,227,0.08) 0%, transparent 70%); animation:p02-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p02-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
@keyframes p02-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,25px)} }
.p02-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p02-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p02-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── S1 工具浏览器 ── */
.p02-browser { display:flex; gap:var(--space-lg); align-items:flex-start; }
.p02-tool-sidebar { width:260px; flex-shrink:0; }
.p02-cat-tabs { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:var(--space-md); }
.p02-cat-tab { padding:6px 14px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.78rem; cursor:pointer; transition:all 0.2s; min-height:44px; font-family:var(--font-heading); white-space:nowrap; }
.p02-cat-tab:hover { border-color:var(--module-3); color:var(--text-on-light); }
.p02-cat-tab.active { background:rgba(149,213,178,0.12); border-color:var(--module-3); color:var(--module-3); font-weight:600; }
.p02-tool-list { display:flex; flex-direction:column; gap:4px; max-height:480px; overflow-y:auto; }
.p02-tool-list::-webkit-scrollbar { width:4px; }
.p02-tool-list::-webkit-scrollbar-track { background:transparent; }
.p02-tool-list::-webkit-scrollbar-thumb { background:var(--border-light); border-radius:4px; }
.p02-tool-item { display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:var(--radius-sm); cursor:pointer; transition:all 0.18s; border:1.5px solid transparent; min-height:44px; }
.p02-tool-item:hover { background:rgba(149,213,178,0.06); border-color:rgba(149,213,178,0.2); }
.p02-tool-item.active { background:rgba(149,213,178,0.1); border-color:var(--module-3); }
.p02-tool-shortcut { font-family:var(--font-code); font-size:0.72rem; color:var(--text-on-light-3); background:var(--bg-light-elevated,#fff); border:1px solid var(--border-light); padding:3px 7px; border-radius:5px; white-space:nowrap; min-width:30px; text-align:center; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.08); }
.p02-tool-name { font-size:0.88rem; color:var(--text-on-light); font-weight:500; flex:1; }
/* 演示面板 */
.p02-demo-panel { flex:1; min-width:0; background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); border:1px solid var(--border-light); padding:var(--space-lg); box-shadow:0 4px 24px rgba(0,0,0,0.06); }
.p02-demo-header { display:flex; align-items:baseline; gap:var(--space-sm); margin-bottom:var(--space-md); flex-wrap:wrap; }
.p02-demo-title { font-family:var(--font-display); font-size:var(--text-heading); font-weight:700; color:var(--module-3); }
.p02-demo-shortcut-badge { font-family:var(--font-code); font-size:0.85rem; color:var(--text-on-light-2); background:#f5f5f7; border:1px solid var(--border-light); padding:4px 10px; border-radius:var(--radius-sm); }
.p02-demo-svg-area { background:#f8f8f8; border-radius:var(--radius-md); width:100%; height:200px; display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:var(--space-md); border:1px solid var(--border-light); }
.p02-demo-svg-area svg { width:260px; height:180px; }
.p02-demo-desc { font-size:var(--text-body); color:var(--text-on-light); line-height:1.8; margin-bottom:var(--space-sm); }
.p02-demo-use { font-size:0.9rem; color:var(--text-on-light-2); line-height:1.6; padding:12px 16px; background:rgba(149,213,178,0.08); border-left:3px solid var(--module-3); border-radius:0 var(--radius-sm) var(--radius-sm) 0; margin-bottom:var(--space-md); }
.p02-demo-use strong { color:var(--module-3); }
.p02-replay-btn { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid var(--module-3); background:transparent; color:var(--module-3); font-size:0.85rem; cursor:pointer; transition:all 0.22s; font-family:var(--font-heading); min-height:44px; }
.p02-replay-btn:hover { background:rgba(149,213,178,0.12); }

/* ── S2 工作流 ── */
.p02-wf-tabs { display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:var(--space-xl); }
.p02-wf-tab { padding:10px 22px; border-radius:var(--radius-full); border:1.5px solid rgba(149,213,178,0.25); background:transparent; color:var(--text-on-dark-2); font-size:0.9rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); }
.p02-wf-tab:hover { border-color:var(--module-3); color:var(--text-on-dark); }
.p02-wf-tab.active { background:rgba(149,213,178,0.12); border-color:var(--module-3); color:var(--module-3); font-weight:600; }
.p02-wf-panel { display:none; }
.p02-wf-panel.active { display:block; }
.p02-wf-steps { display:flex; align-items:flex-start; flex-wrap:wrap; justify-content:center; gap:0; margin-bottom:var(--space-lg); }
.p02-wf-step { display:flex; flex-direction:column; align-items:center; flex:1; min-width:120px; max-width:175px; }
.p02-wf-step-card { background:var(--bg-dark-elevated,#2d2d2f); border-radius:var(--radius-md); padding:var(--space-sm); width:100%; text-align:center; border:1px solid var(--border-dark); box-sizing:border-box; }
.p02-wf-step-tool { font-size:0.78rem; font-weight:700; color:var(--module-3); margin-bottom:4px; font-family:var(--font-heading); }
.p02-wf-step-action { font-size:0.82rem; color:var(--text-on-dark); line-height:1.4; margin-bottom:4px; font-weight:500; font-family:var(--font-code); }
.p02-wf-step-note { font-size:0.7rem; color:var(--text-on-dark-3); line-height:1.4; }
.p02-wf-arrow { color:var(--module-3); font-size:1.4rem; margin:0 4px; align-self:center; flex-shrink:0; opacity:0.6; padding-top:0; }
.p02-wf-output-wrap { text-align:center; }
.p02-wf-output-label { font-size:0.72rem; color:var(--text-on-dark-3); letter-spacing:0.08em; text-transform:uppercase; margin-bottom:8px; font-family:var(--font-heading); }
.p02-wf-output { display:inline-flex; align-items:center; gap:10px; padding:var(--space-sm) var(--space-md); background:rgba(149,213,178,0.08); border:1.5px solid var(--module-3); border-radius:var(--radius-md); color:var(--text-on-dark); font-size:0.88rem; line-height:1.5; }

/* ── S3 快捷键 ── */
.p02-sc-tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:var(--space-lg); }
.p02-sc-tab { padding:8px 18px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.82rem; cursor:pointer; transition:all 0.22s; min-height:40px; font-family:var(--font-heading); }
.p02-sc-tab:hover { border-color:var(--module-3); color:var(--text-on-light); }
.p02-sc-tab.active { background:rgba(149,213,178,0.1); border-color:var(--module-3); color:var(--module-3); font-weight:600; }
.p02-sc-table { width:100%; border-collapse:collapse; }
.p02-sc-table th { padding:10px 16px; font-size:0.75rem; font-weight:600; color:var(--text-on-light-3); text-align:left; border-bottom:1px solid var(--border-light); font-family:var(--font-heading); letter-spacing:0.05em; text-transform:uppercase; }
.p02-sc-table td { padding:12px 16px; border-bottom:1px solid var(--border-light); vertical-align:middle; }
.p02-sc-table tbody tr:last-child td { border-bottom:none; }
.p02-sc-table tbody tr:hover td { background:rgba(149,213,178,0.04); }
.p02-sc-key { display:inline-flex; align-items:center; gap:3px; flex-wrap:wrap; }
.p02-kbd { font-family:var(--font-code); font-size:0.75rem; background:#f5f5f7; border:1px solid #d2d2d7; border-bottom-width:2px; padding:3px 8px; border-radius:5px; color:var(--text-on-light); white-space:nowrap; }
.p02-sc-name { font-size:0.88rem; color:var(--text-on-light); font-weight:500; }
.p02-sc-scenario { font-size:0.78rem; color:var(--text-on-light-3); line-height:1.5; }

/* 响应式 */
@media (max-width:900px) {
  .p02-browser { flex-direction:column; }
  .p02-tool-sidebar { width:100%; }
  .p02-tool-list { max-height:250px; }
  .p02-wf-steps { gap:4px; }
}
@media (max-width:768px) {
  #p02-s1, #p02-s2, #p02-s3 { scroll-margin-top:56px; }
  .p02-cat-tabs { overflow-x:auto; flex-wrap:nowrap; padding-bottom:4px; -webkit-overflow-scrolling:touch; }
  .p02-cat-tab { white-space:nowrap; }
  .p02-wf-arrow { display:none; }
  .p02-wf-step { min-width:80px; max-width:none; width:calc(50% - 8px); }
  .p02-sc-table th:last-child, .p02-sc-table td:last-child { display:none; }
}
</style>

<!-- HERO -->
<section class="section-dark section-hero-full p02-hero" id="p02-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 02</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">Illustrator 核心工具</h1>
    <p class="page-hero-sub" style="opacity:0;">Essential Tools for Scientific Illustration</p>
    <p class="p02-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">掌握 12 个工具，覆盖科研绘图 95% 的操作场景</p>
    <nav class="hero-quicknav" id="p02-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p02-s1">工具库</button>
      <button class="hero-quicknav__item" data-target="#p02-s2">工作流</button>
      <button class="hero-quicknav__item" data-target="#p02-s3">快捷键</button>
    </nav>
    <div class="p02-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- S1: 工具浏览器 -->
<section class="section-light" id="p02-s1" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">12 个核心工具</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">点击工具查看动态演示与科研使用场景</p>
    </div>
    <div class="p02-browser">
      <div class="p02-tool-sidebar">
        <div class="p02-cat-tabs" id="p02-cat-tabs"></div>
        <div class="p02-tool-list" id="p02-tool-list"></div>
      </div>
      <div class="p02-demo-panel" id="p02-demo-panel">
        <div class="p02-demo-header">
          <span class="p02-demo-title" id="p02-demo-title">选择工具</span>
          <span class="p02-demo-shortcut-badge" id="p02-demo-shortcut">V</span>
        </div>
        <div class="p02-demo-svg-area" id="p02-demo-svg"></div>
        <p class="p02-demo-desc" id="p02-demo-desc"></p>
        <p class="p02-demo-use" id="p02-demo-use"><strong>科研场景：</strong><span id="p02-demo-use-text"></span></p>
        <button class="p02-replay-btn" id="p02-replay-btn">↺ 重播动画</button>
      </div>
    </div>
  </div>
</section>

<!-- S2: 工作流演示 -->
<section class="section-dark" id="p02-s2" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">3 个典型工作流</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">将分散的工具技能串联成完整的科研绘图流程</p>
    </div>
    <div class="p02-wf-tabs" id="p02-wf-tabs"></div>
    <div id="p02-wf-panels"></div>
  </div>
</section>

<!-- S3: 快捷键速查 -->
<section class="section-light" id="p02-s3" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">快捷键速查</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">熟记这 12 个快捷键，操作效率提升 3 倍</p>
    </div>
    <div class="p02-sc-tabs" id="p02-sc-tabs"></div>
    <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">
      <table class="p02-sc-table">
        <thead>
          <tr>
            <th>快捷键</th>
            <th>功能名称</th>
            <th>科研使用场景</th>
          </tr>
        </thead>
        <tbody id="p02-sc-tbody"></tbody>
      </table>
    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta">
  <p class="page-footer-num">02 / 07</p>
  <h2 class="page-footer-quote">工具是思维的延伸，快捷键是工具的翅膀。</h2>
  <p class="page-footer-desc">熟练掌握 Illustrator 核心工具，让创作速度匹配你的思维速度。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p02-prev-btn">← 矢量 vs 位图</button>
    <button class="btn-primary" id="p02-next-btn">贝塞尔曲线 →</button>
  </div>
</section>
</div>`}function Y(){const i=B.timeline({delay:.2});i.fromTo("#p02-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),i.fromTo("#p02-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),i.fromTo("#p02-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),i.fromTo(".p02-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),i.fromTo("#p02-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),i.fromTo(".p02-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p02-quicknav .hero-quicknav__item").forEach(e=>{const t=()=>{document.querySelector(e.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})};e.addEventListener("click",t),a.push({el:e,type:"click",fn:t})});let l="all",c=f[0];const d=document.getElementById("p02-cat-tabs"),p=document.getElementById("p02-tool-list");function A(){d&&(d.innerHTML="",_.forEach(e=>{const t=document.createElement("button");t.className=`p02-cat-tab${e.id===l?" active":""}`,t.textContent=e.label,t.dataset.cat=e.id,d.appendChild(t)}))}function D(){if(!p)return;p.innerHTML="",(l==="all"?f:f.filter(t=>t.category===l)).forEach(t=>{const o=t.shortcut.length>8?t.shortcut.split("+").pop():t.shortcut,r=document.createElement("div");r.className=`p02-tool-item${t.id===c.id?" active":""}`,r.dataset.toolId=t.id,r.innerHTML=`
        <span class="p02-tool-shortcut">${o}</span>
        <span class="p02-tool-name">${t.name}</span>
      `,p.appendChild(r)})}function b(e){const t=document.getElementById("p02-demo-title"),o=document.getElementById("p02-demo-shortcut"),r=document.getElementById("p02-demo-svg"),n=document.getElementById("p02-demo-desc"),s=document.getElementById("p02-demo-use-text");!t||!r||(t.textContent=e.name,o.textContent=e.shortcut,r.innerHTML=e.svgDemo,n.textContent=e.desc,s.textContent=e.use)}A(),D(),b(c);const z=e=>{const t=e.target.closest(".p02-cat-tab");if(!t)return;l=t.dataset.cat,A();const o=l==="all"?f:f.filter(r=>r.category===l);o.length&&!o.find(r=>r.id===c.id)&&(c=o[0],b(c)),D()};d?.addEventListener("click",z),a.push({el:d,type:"click",fn:z});const S=e=>{const t=e.target.closest(".p02-tool-item");if(!t)return;const o=f.find(r=>r.id===t.dataset.toolId);o&&(c=o,b(o),p?.querySelectorAll(".p02-tool-item").forEach(r=>{r.classList.toggle("active",r.dataset.toolId===o.id)}))};p?.addEventListener("click",S),a.push({el:p,type:"click",fn:S});const u=document.getElementById("p02-replay-btn");if(u){const e=()=>{const t=document.getElementById("p02-demo-svg");if(!t)return;const o=t.innerHTML;t.innerHTML="",requestAnimationFrame(()=>{t.innerHTML=o})};u.addEventListener("click",e),a.push({el:u,type:"click",fn:e})}const T=document.getElementById("p02-s1");if(T){const e=new IntersectionObserver(([t])=>{t.isIntersecting&&(x(document.querySelectorAll("#p02-s1 .reading-wrapper"),{stagger:.1,y:30}),B.fromTo(".p02-browser",{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:"power3.out",delay:.2}),e.disconnect())},{threshold:.1});e.observe(T),g.push(e)}const m=document.getElementById("p02-wf-tabs"),v=document.getElementById("p02-wf-panels");function $(e){let t='<div class="p02-wf-steps">';return e.steps.forEach((o,r)=>{t+=`
        <div class="p02-wf-step" style="opacity:0;" data-wf-step>
          <div class="p02-wf-step-card">
            <div class="p02-wf-step-tool">${o.tool}</div>
            <div class="p02-wf-step-action">${o.action}</div>
            <div class="p02-wf-step-note">${o.note}</div>
          </div>
        </div>`,r<e.steps.length-1&&(t+='<div class="p02-wf-arrow" aria-hidden="true">→</div>')}),t+="</div>",`${t}
    <div class="p02-wf-output-wrap" style="margin-top:var(--space-lg);">
      <p class="p02-wf-output-label">最终产出</p>
      <div class="p02-wf-output">
        <span style="color:var(--module-3);font-size:1.1rem;flex-shrink:0;">✓</span>
        <span>${e.output}</span>
      </div>
    </div>`}function I(e){const t=document.getElementById(`p02-wf-panel-${e}`);if(!t)return;const o=t.querySelectorAll("[data-wf-step]");B.fromTo(o,{opacity:0,y:30},{opacity:1,y:0,duration:.5,ease:"power3.out",stagger:.1})}if(m&&v){j.forEach((o,r)=>{const n=document.createElement("button");n.className=`p02-wf-tab${r===0?" active":""}`,n.textContent=o.title,n.dataset.wfIdx=r,m.appendChild(n);const s=document.createElement("div");s.className=`p02-wf-panel${r===0?" active":""}`,s.id=`p02-wf-panel-${r}`,s.innerHTML=$(o),v.appendChild(s)});const e=document.getElementById("p02-s2");if(e){const o=new IntersectionObserver(([r])=>{r.isIntersecting&&(x(document.querySelectorAll("#p02-s2 .reading-wrapper"),{stagger:.1,y:30}),I(0),o.disconnect())},{threshold:.15});o.observe(e),g.push(o)}const t=o=>{const r=o.target.closest(".p02-wf-tab");if(!r)return;const n=parseInt(r.dataset.wfIdx,10);m.querySelectorAll(".p02-wf-tab").forEach(s=>s.classList.remove("active")),v.querySelectorAll(".p02-wf-panel").forEach(s=>s.classList.remove("active")),r.classList.add("active"),document.getElementById(`p02-wf-panel-${n}`)?.classList.add("active"),I(n)};m.addEventListener("click",t),a.push({el:m,type:"click",fn:t})}const h=document.getElementById("p02-sc-tabs"),L=document.getElementById("p02-sc-tbody");let y="all";function H(e){return e.split("+").map(o=>`<kbd class="p02-kbd">${o.trim()}</kbd>`).join('<span style="color:var(--text-on-light-3);font-size:0.7rem;margin:0 1px;">+</span>')}function F(){if(!L)return;const e=y==="all"?O:O.filter(t=>t.cat===y);L.innerHTML=e.map(t=>`
      <tr>
        <td><span class="p02-sc-key">${H(t.key)}</span></td>
        <td><span class="p02-sc-name">${t.name}</span></td>
        <td><span class="p02-sc-scenario">${t.scenario}</span></td>
      </tr>
    `).join("")}function P(){h&&(h.innerHTML="",V.forEach(e=>{const t=document.createElement("button");t.className=`p02-sc-tab${e.id===y?" active":""}`,t.textContent=e.label,t.dataset.cat=e.id,h.appendChild(t)}))}P(),F();const M=e=>{const t=e.target.closest(".p02-sc-tab");t&&(y=t.dataset.cat,P(),F())};h?.addEventListener("click",M),a.push({el:h,type:"click",fn:M});const q=document.getElementById("p02-s3");if(q){const e=new IntersectionObserver(([t])=>{t.isIntersecting&&(x(document.querySelectorAll("#p02-s3 .reading-wrapper"),{stagger:.1,y:30}),x(document.querySelectorAll("#p02-s3 .p02-sc-tabs, #p02-s3 .p02-sc-table"),{stagger:.15,y:30}),e.disconnect())},{threshold:.1});e.observe(q),g.push(e)}const w=document.getElementById("p02-prev-btn"),k=document.getElementById("p02-home-btn"),E=document.getElementById("p02-next-btn");if(w){const e=()=>C("m3-p1");w.addEventListener("click",e),a.push({el:w,type:"click",fn:e})}if(k){const e=()=>C("m3-p1");k.addEventListener("click",e),a.push({el:k,type:"click",fn:e})}if(E){const e=()=>C("m3-p3");E.addEventListener("click",e),a.push({el:E,type:"click",fn:e})}}function Z(){G(),a.forEach(({el:i,type:l,fn:c,opts:d})=>i.removeEventListener(l,c,d)),a=[],g.forEach(i=>i.disconnect()),g=[]}export{Z as destroy,Y as init,W as render};
