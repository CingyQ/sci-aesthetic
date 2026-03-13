import{k as J,g as N,f as U,s as S}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as W}from"./ChartPreview-CPZsLrZv.js";import{c as O}from"./TabSwitcher-B5dsPqHB.js";import{c as Q}from"./CopyButton-2sIiwDp8.js";import{g as K,r as Z,d as tt,h as et,b as at}from"./color-math-Dw8FC2aa.js";import{n as H}from"./index-DQN0JRtp.js";import{b as T}from"./band-DqVyTAN-.js";import{l as C,c as A}from"./transform-ChPGlSkf.js";import{m as rt}from"./max-DBeXZoyG.js";import{a as F,b as D}from"./axis-FVV8vvN_.js";import{l as nt,c as ot}from"./line-DQLATXjo.js";import{a as j}from"./arc-BpqQfc-p.js";import{p as it}from"./pie-DaGM7Udv.js";import{s as st}from"./stack-BL_seWro.js";import{a as lt}from"./area-BnRBWshW.js";import{m as ct}from"./monotone-KI2q-aQs.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";const L={nature:[{name:"Nature Reviews (NPG)",colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2","#DC0000"]},{name:"Nature Methods",colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2","#7E6148"]},{name:"Nature Cell Biology",colors:["#631879","#3C5488","#0072B5","#00A087","#4DBBD5","#E64B35","#F39B7F","#8491B4"]}],science:[{name:"Science (AAAS)",colors:["#3B4992","#EE0000","#008B45","#631879","#008280","#BB0021","#5F559B","#A20056"]},{name:"JAMA",colors:["#374E55","#DF8F44","#00A1D5","#B24745","#79AF97","#6A6599","#80796B","#000000"]},{name:"NEJM",colors:["#BC3C29","#0072B5","#E18727","#20854E","#7876B1","#6F99AD","#FFDC91","#EE4C97"]}],ggsci:[{name:"ggsci npg",colors:["#E64B35","#4DBBD5","#00A087","#3C5488","#F39B7F","#8491B4","#91D1C2","#DC0000"]},{name:"ggsci Lancet",colors:["#00468B","#ED0000","#42B540","#0099B4","#925E9F","#FDAF91","#AD002A","#ADB6B6"]},{name:"ggsci JAMA",colors:["#374E55","#DF8F44","#00A1D5","#B24745","#79AF97","#6A6599","#80796B","#000000"]},{name:"ggsci D3",colors:["#1F77B4","#FF7F0E","#2CA02C","#D62728","#9467BD","#8C564B","#E377C2","#7F7F7F"]}],colorbrewer:[{name:"ColorBrewer Set1",colors:["#E41A1C","#377EB8","#4DAF4A","#984EA3","#FF7F00","#FFFF33","#A65628","#F781BF"]},{name:"ColorBrewer Set2",colors:["#66C2A5","#FC8D62","#8DA0CB","#E78AC3","#A6D854","#FFD92F","#E5C494","#B3B3B3"]},{name:"ColorBrewer Dark2",colors:["#1B9E77","#D95F02","#7570B3","#E7298A","#66A61E","#E6AB02","#A6761D","#666666"]}],colorblind:[{name:"Wong (色盲安全)",colors:["#000000","#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7"]},{name:"Tol (色盲安全)",colors:["#332288","#117733","#44AA99","#88CCEE","#DDCC77","#CC6677","#AA4499","#882255"]},{name:"Okabe-Ito",colors:["#E69F00","#56B4E9","#009E73","#F0E442","#0072B2","#D55E00","#CC79A7","#000000"]}]},pt=[{id:"nature",label:"Nature"},{id:"science",label:"Science"},{id:"ggsci",label:"ggsci"},{id:"colorbrewer",label:"ColorBrewer"},{id:"colorblind",label:"色盲安全"}],X=[{id:"complementary",label:"互补"},{id:"analogous",label:"类似"},{id:"triadic",label:"三角"},{id:"split-complementary",label:"分裂互补"},{id:"square",label:"方形"}],dt={complementary:"色轮上相隔 180° 的两种颜色，产生最大对比。适合强调数据差异，如对照组 vs 实验组。",analogous:"色轮上相邻的 3 种颜色（±30°），自然和谐。适合表示同类数据的渐变或分组。",triadic:"色轮上均匀分布的 3 种颜色（间隔 120°），活力十足。适合展示 3 个独立类别。","split-complementary":"一种颜色和其互补色两侧各 30° 的颜色，比互补更柔和。保留对比同时避免冲突。",square:"色轮上均匀分布的 4 种颜色（间隔 90°），丰富且均衡。适合 4 组数据的可视化。"},R=[{primary:"#f5f5f7",secondary:"#3C5488",accent:"#E64B35"},{primary:"#0a1628",secondary:"#4DBBD5",accent:"#F39B7F"},{primary:"#f0faf6",secondary:"#00A087",accent:"#DC0000"},{primary:"#2d1b4e",secondary:"#B8B8E8",accent:"#E69F00"}];let a={harmonyType:"complementary",baseHue:0,harmonyCanvas:null,harmonyCtx:null,harmonyAnimFrame:null,harmonyTabSwitcher:null,harmonyChartPreview:null,proportions:[60,30,10],rule603010Colors:{primary:"#f5f5f7",secondary:"#3C5488",accent:"#E64B35"},presetIndex:0,isDraggingDivider:!1,activeDivider:-1,deltaColor1:"#E64B35",deltaColor2:"#4DBBD5",paletteCategory:"nature",paletteTabSwitcher:null,paletteBrowserChart:null,activePaletteColors:null,chartType:"bar",copyButtons:[],cleanupFns:[],resizeObservers:[]};function _t(){return`
    <style id="m1p2-styles">
      .m1p2-hero-section { position: relative; overflow: hidden; }
      /* 滑块移动端适配 */
      @media (max-width: 768px) {
        #m1p2-hue-slider {
          min-height: 32px;
        }
        #m1p2-hue-slider::-webkit-slider-thumb {
          width: 24px;
          height: 24px;
        }
        #m1p2-hue-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
        }
      }
      @keyframes m1p2-glow {
        0%,100% { transform: translate(0,0) scale(1); opacity: 1; }
        50% { transform: translate(4%,3%) scale(1.08); opacity: 0.7; }
      }
      @keyframes m1p2-glow-b {
        0%,100% { transform: translate(0,0) scale(1); opacity: 0.5; }
        50% { transform: translate(-5%,-2%) scale(0.92); opacity: 0.9; }
      }
      .m1p2-hero-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 50% 40% at 35% 45%, rgba(126,200,227,0.12) 0%, transparent 65%);
        pointer-events: none;
        animation: m1p2-glow 10s ease-in-out infinite;
      }
      .m1p2-hero-section::after {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 35% 35% at 68% 58%, rgba(149,213,178,0.08) 0%, transparent 65%);
        pointer-events: none;
        animation: m1p2-glow-b 13s ease-in-out infinite;
      }
      .m1p2-scroll-hint {
        font-size: var(--text-caption); color: var(--text-on-dark-3);
        animation: m1p2-float 2s ease-in-out infinite; white-space: nowrap;
        margin-top: var(--space-sm);
      }
      @keyframes m1p2-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
    </style>
    <div class="page-scroll">

      <!-- ====== Section 1: Hero ====== -->
      <section class="section-dark section-hero-full m1p2-hero-section" style="align-items:center;">
        <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
          <p class="hero-eyebrow m1p2-eyebrow" style="opacity:0;">Module 01 / Page 02</p>
          <h1 class="page-hero-title m1p2-hero-title" style="color:var(--text-on-dark);opacity:0;">色彩和谐与科研配色</h1>
          <p class="page-hero-sub m1p2-hero-sub" style="opacity:0;">Color Harmony & Scientific Palettes</p>
          <p class="m1p2-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">掌握经典配色方案，获取可直接用于论文的专业配色</p>
          <!-- 快捷导航 -->
          <nav class="hero-quicknav m1p2-hero-nav" style="opacity:0;" id="m1p2-hero-nav">
            <button class="hero-quicknav__item" data-target="#m1p2-harmony">五种配色方案</button>
            <button class="hero-quicknav__item" data-target="#m1p2-rule603010">60-30-10 法则</button>
            <button class="hero-quicknav__item" data-target="#m1p2-deltae">ΔE 色差计算</button>
            <button class="hero-quicknav__item" data-target="#m1p2-palette-browser">配色方案库</button>
          </nav>
        <div class="m1p2-scroll-hint">↓ 向下探索</div>
        </div>
      </section>

      <!-- ====== Section 2: Harmony Types ====== -->
      <section class="section-light" style="align-items:center;" id="m1p2-harmony">
        <div class="content-wrapper">
          <h2 class="page-hero-title" style="color:var(--text-on-light);text-align:center;margin-bottom:var(--space-sm);">五种经典配色方案</h2>
          <p style="text-align:center;color:var(--text-on-light-2);font-size:var(--text-body);max-width:520px;margin:0 auto var(--space-xl);line-height:1.7;">
            理解色彩和谐的基本逻辑，为你的图表选择恰当的配色方案
          </p>

          <!-- 色轮 -->
          <div style="display:flex;justify-content:center;margin-bottom:var(--space-md);">
            <canvas id="m1p2-harmony-wheel" width="600" height="600" style="max-width:340px;width:100%;height:auto;cursor:pointer;"></canvas>
          </div>

          <!-- Tab 切换 -->
          <div style="display:flex;justify-content:center;margin-bottom:var(--space-md);overflow-x:auto;" id="m1p2-harmony-tabs"></div>

          <!-- 色相旋转滑块 -->
          <div style="max-width:400px;margin:0 auto var(--space-md);">
            <label style="display:flex;align-items:center;gap:var(--space-sm);font-size:var(--text-small);color:var(--text-on-light-2);">
              <span>基础色相</span>
              <input type="range" class="range" id="m1p2-hue-slider" min="0" max="359" value="0" style="flex:1;">
              <span id="m1p2-hue-value" style="font-family:var(--font-code);min-width:36px;text-align:right;">0°</span>
            </label>
          </div>

          <!-- 和谐色块 -->
          <div id="m1p2-harmony-swatches" style="display:flex;justify-content:center;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-md);"></div>

          <!-- 描述 -->
          <p id="m1p2-harmony-desc" style="text-align:center;max-width:520px;margin:0 auto var(--space-lg);color:var(--text-on-light-2);font-size:var(--text-small);line-height:1.7;"></p>

          <!-- 小图表预览 -->
          <div id="m1p2-harmony-chart" style="max-width:500px;margin:0 auto;"></div>
        </div>
      </section>

      <!-- ====== Section 3: 60-30-10 Rule ====== -->
      <section class="section-dark" style="align-items:center;" id="m1p2-rule603010">
        <div class="content-wrapper">
          <h2 class="page-hero-title" style="color:var(--text-on-dark);text-align:center;margin-bottom:var(--space-sm);">60-30-10 配色法则</h2>
          <p style="text-align:center;color:var(--text-on-dark-2);font-size:var(--text-body);max-width:520px;margin:0 auto var(--space-xl);line-height:1.7;">
            黄金比例配色——让科研图表的色彩分布更有节奏感
          </p>

          <!-- 比例条 -->
          <div id="m1p2-proportion-bar" style="max-width:600px;margin:0 auto var(--space-lg);position:relative;height:64px;border-radius:var(--radius-md);overflow:hidden;cursor:col-resize;user-select:none;-webkit-user-select:none;touch-action:none;border:1.5px solid rgba(255,255,255,0.12);">
          </div>

          <!-- 比例数值 -->
          <div id="m1p2-proportion-labels" style="display:flex;justify-content:center;gap:var(--space-lg);margin-bottom:var(--space-lg);flex-wrap:wrap;"></div>

          <!-- 预设配色切换 -->
          <div style="display:flex;justify-content:center;gap:var(--space-sm);margin-bottom:var(--space-lg);flex-wrap:wrap;">
            <span style="color:var(--text-on-dark-3);font-size:var(--text-small);align-self:center;">预设配色：</span>
            <div id="m1p2-preset-btns" style="display:flex;gap:var(--space-xs);flex-wrap:wrap;"></div>
          </div>

          <!-- 模拟图表 -->
          <div id="m1p2-rule-preview" style="max-width:500px;margin:0 auto;background:var(--bg-dark-elevated);border-radius:var(--radius-md);padding:var(--space-md);"></div>

          <!-- 说明文字 -->
          <p style="text-align:center;color:var(--text-on-dark-3);font-size:var(--text-small);max-width:520px;margin:var(--space-lg) auto 0;line-height:1.7;">
            60% 为背景/底色，30% 为主要数据色，10% 为强调/高亮色。<br>
            这个法则源自室内设计，同样适用于科研图表——避免色彩分布过于均匀导致视觉主次不分。
          </p>
        </div>
      </section>

      <!-- ====== Section 4: DeltaE Calculator ====== -->
      <section class="section-light" style="align-items:center;" id="m1p2-deltae">
        <div class="content-wrapper" style="max-width:700px;">
          <h2 class="page-hero-title" style="color:var(--text-on-light);text-align:center;margin-bottom:var(--space-sm);">色距感知：CIELAB ΔE</h2>
          <p style="text-align:center;color:var(--text-on-light-2);font-size:var(--text-body);max-width:520px;margin:0 auto var(--space-lg);line-height:1.7;">
            两种颜色在人眼看来差多少？ΔE 给出量化答案
          </p>

          <!-- 预设配对按钮 -->
          <div style="display:flex;justify-content:center;gap:var(--space-xs);margin-bottom:var(--space-lg);flex-wrap:wrap;">
            <span style="color:var(--text-on-light-3);font-size:var(--text-small);align-self:center;margin-right:var(--space-xs);">试试：</span>
            <button class="btn-ghost btn-small m1p2-de-preset" data-c1="#E64B35" data-c2="#E8523D" style="font-size:var(--text-small);color:var(--text-on-light-2);border-color:var(--border-light);">极相似</button>
            <button class="btn-ghost btn-small m1p2-de-preset" data-c1="#3C5488" data-c2="#4DBBD5" style="font-size:var(--text-small);color:var(--text-on-light-2);border-color:var(--border-light);">同色系</button>
            <button class="btn-ghost btn-small m1p2-de-preset" data-c1="#E64B35" data-c2="#4DBBD5" style="font-size:var(--text-small);color:var(--text-on-light-2);border-color:var(--border-light);">互补色</button>
            <button class="btn-ghost btn-small m1p2-de-preset" data-c1="#DC0000" data-c2="#009E73" style="font-size:var(--text-small);color:var(--text-on-light-2);border-color:var(--border-light);">红绿色盲</button>
            <button class="btn-ghost btn-small" id="m1p2-de-random" style="font-size:var(--text-small);color:var(--accent);border-color:var(--accent);">🎲 随机</button>
          </div>

          <!-- 双色输入 -->
          <div style="display:flex;gap:var(--space-lg);justify-content:center;align-items:flex-start;flex-wrap:wrap;margin-bottom:var(--space-lg);">
            <!-- 颜色 1 -->
            <div style="text-align:center;position:relative;">
              <div id="m1p2-de-swatch1" style="margin:0 auto var(--space-sm);width:100px;height:100px;border-radius:var(--radius-md);border:2px solid var(--border-light);cursor:pointer;transition:transform var(--t-fast),box-shadow var(--t-fast);position:relative;overflow:hidden;">
                <input type="color" id="m1p2-de-picker1" value="#E64B35" style="position:absolute;inset:0;width:200%;height:200%;opacity:0;cursor:pointer;">
              </div>
              <label style="font-size:var(--text-small);color:var(--text-on-light-2);display:block;margin-bottom:4px;">颜色 A<span style="font-size:10px;color:var(--text-on-light-3);margin-left:4px;">点击选色</span></label>
              <input type="text" class="input" id="m1p2-de-input1" value="#E64B35" style="max-width:130px;text-align:center;font-family:var(--font-code);margin:0 auto;">
            </div>

            <!-- 结果 -->
            <div style="text-align:center;align-self:center;min-width:140px;">
              <div id="m1p2-de-value" style="font-size:var(--text-stat);font-weight:700;color:var(--text-on-light);line-height:1;font-family:var(--font-heading);transition:color 0.3s;">0</div>
              <div style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;">ΔE (CIE76)</div>
              <div id="m1p2-de-label" style="font-size:var(--text-small);color:var(--accent);margin-top:var(--space-xs);font-weight:500;min-height:20px;"></div>
              <!-- 渐变条预览 -->
              <div id="m1p2-de-gradient" style="margin-top:var(--space-sm);height:8px;border-radius:4px;max-width:140px;margin-left:auto;margin-right:auto;"></div>
            </div>

            <!-- 颜色 2 -->
            <div style="text-align:center;position:relative;">
              <div id="m1p2-de-swatch2" style="margin:0 auto var(--space-sm);width:100px;height:100px;border-radius:var(--radius-md);border:2px solid var(--border-light);cursor:pointer;transition:transform var(--t-fast),box-shadow var(--t-fast);position:relative;overflow:hidden;">
                <input type="color" id="m1p2-de-picker2" value="#4DBBD5" style="position:absolute;inset:0;width:200%;height:200%;opacity:0;cursor:pointer;">
              </div>
              <label style="font-size:var(--text-small);color:var(--text-on-light-2);display:block;margin-bottom:4px;">颜色 B<span style="font-size:10px;color:var(--text-on-light-3);margin-left:4px;">点击选色</span></label>
              <input type="text" class="input" id="m1p2-de-input2" value="#4DBBD5" style="max-width:130px;text-align:center;font-family:var(--font-code);margin:0 auto;">
            </div>
          </div>

          <!-- ΔE 感知标尺 -->
          <div style="max-width:500px;margin:0 auto;">
            <div style="position:relative;height:12px;border-radius:var(--radius-full);overflow:hidden;background:linear-gradient(to right, #34C759 0%, #34C759 2%, #7EC8E3 4%, #F0B27A 20%, #E07A7A 60%, #ff3b30 100%);">
              <div id="m1p2-de-marker" style="position:absolute;top:-6px;width:4px;height:24px;background:var(--text-on-light);border-radius:2px;transition:left 0.4s var(--ease-out);left:0%;"></div>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:var(--space-xs);font-size:10px;color:var(--text-on-light-3);">
              <span>0</span><span>1</span><span>2</span><span>10</span><span>50</span><span>100+</span>
            </div>
            <!-- 解读表 -->
            <div style="margin-top:var(--space-md);display:grid;grid-template-columns:auto 1fr;gap:4px var(--space-sm);font-size:var(--text-caption);color:var(--text-on-light-2);">
              <span style="font-family:var(--font-code);">0-1</span><span>人眼不可感知</span>
              <span style="font-family:var(--font-code);">1-2</span><span>非常微小的差异</span>
              <span style="font-family:var(--font-code);">2-10</span><span>可感知但仍较接近</span>
              <span style="font-family:var(--font-code);">10-50</span><span>明显不同的颜色</span>
              <span style="font-family:var(--font-code);">>50</span><span>完全不相关的颜色</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== Section 5: Palette Browser ====== -->
      <section class="section-dark section-auto" style="align-items:center;padding-bottom:var(--space-3xl);" id="m1p2-palette-browser">
        <div class="content-wrapper">
          <h2 class="page-hero-title" style="color:var(--text-on-dark);text-align:center;margin-bottom:var(--space-sm);">科研配色方案库</h2>
          <p style="text-align:center;color:var(--text-on-dark-2);font-size:var(--text-body);max-width:520px;margin:0 auto var(--space-lg);line-height:1.7;">
            来自顶级期刊和可视化库的配色方案，一键复制使用
          </p>

          <!-- 分类 Tab -->
          <div style="display:flex;justify-content:center;margin-bottom:var(--space-lg);overflow-x:auto;" id="m1p2-palette-tabs"></div>

          <!-- 响应式双栏布局 -->
          <div class="m1p2-browser-layout">
            <!-- 左侧：配色卡片列表 -->
            <div class="m1p2-browser-left">
              <div id="m1p2-palette-list" style="display:flex;flex-direction:column;gap:var(--space-md);"></div>
            </div>

            <!-- 右侧：图表预览区 -->
            <div class="m1p2-browser-right">
              <div style="position:sticky;top:var(--space-lg);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-md);flex-wrap:wrap;gap:var(--space-xs);">
                  <span style="color:var(--text-on-dark-2);font-size:var(--text-small);font-weight:500;">配色效果预览</span>
                  <div id="m1p2-chart-type-btns" style="display:flex;gap:4px;flex-wrap:wrap;"></div>
                </div>
                <div id="m1p2-palette-chart"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== Section 6: Footer CTA ====== -->
      <section class="page-footer-cta">
        <p class="page-footer-num">02 / 10</p>
        <h2 class="page-footer-quote">从理论到实践，配色方案即刻可用</h2>
        <p class="page-footer-desc">掌握了色彩和谐原理，下一步学习如何用算法生成完美配色。</p>
        <div class="page-footer-nav">
          <button class="btn-ghost" id="m1p2-prev-btn">← 色彩理论</button>
          <button class="btn-primary" id="m1p2-next-btn">配色生成器 →</button>
        </div>
      </section>

    </div>
  `}function qt(){const t=N.timeline({delay:.2});t.to(".m1p2-eyebrow",{opacity:1,y:0,duration:.6,ease:"power3.out"},0),t.fromTo(".m1p2-hero-title",{y:30},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),t.fromTo(".m1p2-hero-sub",{y:20},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo(".m1p2-hero-tagline",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo(".m1p2-hero-nav",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),t.fromTo(".m1p2-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75);const e=document.getElementById("m1p2-prev-btn"),r=document.getElementById("m1p2-next-btn");e&&e.addEventListener("click",()=>H("m1-p1")),r&&r.addEventListener("click",()=>H("m1-p3")),ht(),vt(),gt(),yt(),wt(),mt()}function mt(){document.querySelectorAll("#m1p2-hero-nav .hero-quicknav__item").forEach(t=>{const e=()=>{const r=document.querySelector(t.dataset.target);r&&r.scrollIntoView({behavior:"smooth",block:"start"})};t.addEventListener("click",e),a.cleanupFns.push(()=>t.removeEventListener("click",e))})}function ht(){const t=document.getElementById("m1p2-harmony-wheel");if(!t)return;a.harmonyCanvas=t,a.harmonyCtx=t.getContext("2d");const e=window.devicePixelRatio||1,r=600;t.width=r*e,t.height=r*e,a.harmonyCtx.scale(e,e);const i=document.getElementById("m1p2-harmony-tabs");i&&(a.harmonyTabSwitcher=O(i,{tabs:X,activeId:"complementary",onChange:s=>{a.harmonyType=s,$()},variant:"pill"}));const n=document.getElementById("m1p2-hue-slider"),p=document.getElementById("m1p2-hue-value");if(n){const s=()=>{a.baseHue=parseInt(n.value),p&&(p.textContent=a.baseHue+"°"),$()};n.addEventListener("input",s),a.cleanupFns.push(()=>n.removeEventListener("input",s))}const v=s=>{const o=t.getBoundingClientRect(),h=o.width/2,g=o.height/2,c=s.clientX-o.left-h,d=s.clientY-o.top-g,f=Math.sqrt(c*c+d*d),y=Math.min(h,g)*.85,l=y*.55;if(f>=l&&f<=y){let u=Math.atan2(d,c)*180/Math.PI+90;u<0&&(u+=360),a.baseHue=Math.round(u)%360,n&&(n.value=a.baseHue),p&&(p.textContent=a.baseHue+"°"),$()}};t.addEventListener("pointerdown",v),a.cleanupFns.push(()=>t.removeEventListener("pointerdown",v));const m=document.getElementById("m1p2-harmony-chart");m&&(a.harmonyChartPreview=W(m,{width:500,height:280,margin:{top:30,right:30,bottom:40,left:40},bgColor:"#ffffff"})),$()}function $(){const t=a.harmonyCtx,e=a.harmonyCanvas;if(!t||!e)return;const r=600,i=r/2,n=r/2,p=r*.42,v=p*.55;t.clearRect(0,0,r,r);for(let c=0;c<360;c+=1){const d=(c-91)*Math.PI/180,f=(c-89)*Math.PI/180;t.beginPath(),t.arc(i,n,p,d,f),t.arc(i,n,v,f,d,!0),t.closePath(),t.fillStyle=`hsl(${c}, 75%, 55%)`,t.fill()}t.beginPath(),t.arc(i,n,v-2,0,Math.PI*2),t.fillStyle="#fafafa",t.fill();const m=K(a.baseHue,a.harmonyType),s=(p+v)/2;m.length>1&&(t.beginPath(),m.forEach((c,d)=>{const f=(c-90)*Math.PI/180,y=i+Math.cos(f)*s,l=n+Math.sin(f)*s;d===0?t.moveTo(y,l):t.lineTo(y,l)}),t.closePath(),t.strokeStyle="rgba(29,29,31,0.5)",t.lineWidth=2,t.setLineDash([6,4]),t.stroke(),t.setLineDash([]));const o=[];m.forEach(c=>{const d=(c-90)*Math.PI/180,f=i+Math.cos(d)*s,y=n+Math.sin(d)*s,l=et(c,75,55),u=Z(l.r,l.g,l.b);o.push(u),t.beginPath(),t.arc(f,y,16,0,Math.PI*2),t.fillStyle="#fff",t.fill(),t.strokeStyle="rgba(0,0,0,0.15)",t.lineWidth=2,t.stroke(),t.beginPath(),t.arc(f,y,12,0,Math.PI*2),t.fillStyle=u,t.fill()}),t.fillStyle="#1d1d1f",t.font="600 14px Inter, Noto Sans SC, sans-serif",t.textAlign="center",t.textBaseline="middle";const h=X.find(c=>c.id===a.harmonyType);h&&(t.fillText(h.label,i,n-8),t.fillStyle="#86868b",t.font="12px Inter, Noto Sans SC, sans-serif",t.fillText(m.length+" 色",i,n+12)),ft(o);const g=document.getElementById("m1p2-harmony-desc");g&&(g.textContent=dt[a.harmonyType]||""),ut(o)}function ft(t){const e=document.getElementById("m1p2-harmony-swatches");e&&(e.innerHTML=t.map(r=>`
    <div style="text-align:center;">
      <div style="width:56px;height:56px;border-radius:var(--radius-sm);background:${r};border:2px solid rgba(0,0,0,0.08);margin-bottom:4px;"></div>
      <span style="font-family:var(--font-code);font-size:11px;color:var(--text-on-light-2);">${r.toUpperCase()}</span>
    </div>
  `).join(""))}function ut(t){const e=a.harmonyChartPreview;if(!e)return;const r=e.clear(),{innerWidth:i,innerHeight:n}=e,p=t.map((s,o)=>({label:"Var "+(o+1),value:40+Math.sin(o*1.2+.5)*30+20,color:s})),v=T().domain(p.map(s=>s.label)).range([0,i]).padding(.3),m=C().domain([0,110]).range([n,0]);r.append("g").attr("transform",`translate(0,${n})`).call(F(v).tickSize(0)).call(s=>s.select(".domain").attr("stroke","#e0e0e0")).selectAll("text").attr("fill","#888").attr("font-size","11px"),r.append("g").call(D(m).ticks(5).tickSize(-i)).call(s=>s.select(".domain").remove()).call(s=>s.selectAll(".tick line").attr("stroke","#e0e0e0").attr("stroke-dasharray","3,3")).selectAll("text").attr("fill","#888").attr("font-size","11px"),r.selectAll(".bar").data(p).join("rect").attr("class","bar").attr("x",s=>v(s.label)).attr("width",v.bandwidth()).attr("rx",4).attr("fill",s=>s.color).attr("y",n).attr("height",0).transition().duration(500).ease(A).attr("y",s=>m(s.value)).attr("height",s=>n-m(s.value))}function vt(){M(),Y(),I();const t=document.getElementById("m1p2-proportion-bar");if(!t)return;const e=n=>{const p=t.getBoundingClientRect(),v=(n.clientX-p.left)/p.width*100,m=a.proportions[0],s=a.proportions[0]+a.proportions[1],o=Math.abs(v-m),h=Math.abs(v-s);(o<8||h<8)&&(a.isDraggingDivider=!0,a.activeDivider=o<h?0:1,n.preventDefault())},r=n=>{if(!a.isDraggingDivider)return;const p=t.getBoundingClientRect(),v=Math.max(0,Math.min(100,(n.clientX-p.left)/p.width*100));if(a.activeDivider===0){const m=a.proportions[0]+a.proportions[1]-5,s=Math.max(10,Math.min(m,v)),o=s-a.proportions[0];a.proportions[0]=Math.round(s),a.proportions[1]=Math.round(Math.max(5,a.proportions[1]-o)),a.proportions[2]=100-a.proportions[0]-a.proportions[1]}else{const m=a.proportions[0]+5,s=Math.max(m,Math.min(95,v));a.proportions[1]=Math.round(s-a.proportions[0]),a.proportions[2]=Math.round(100-a.proportions[0]-a.proportions[1])}a.proportions[2]<3&&(a.proportions[2]=3,a.proportions[1]=100-a.proportions[0]-3),M(),G(),I()},i=()=>{a.isDraggingDivider=!1,a.activeDivider=-1};t.addEventListener("pointerdown",e),document.addEventListener("pointermove",r),document.addEventListener("pointerup",i),a.cleanupFns.push(()=>{t.removeEventListener("pointerdown",e),document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",i)})}function M(){const t=document.getElementById("m1p2-proportion-bar");if(!t)return;const[e,r,i]=a.proportions,{primary:n,secondary:p,accent:v}=a.rule603010Colors;t.innerHTML=`
    <div style="position:absolute;inset:0;display:flex;">
      <div style="width:${e}%;background:${n};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:var(--text-small);font-weight:600;color:${z(n)?"#1d1d1f":"#f5f5f7"};opacity:0.8;">${e}%</span>
      </div>
      <div style="width:${r}%;background:${p};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:var(--text-small);font-weight:600;color:${z(p)?"#1d1d1f":"#f5f5f7"};opacity:0.8;">${r}%</span>
      </div>
      <div style="width:${i}%;background:${v};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:${i>6?"var(--text-small)":"10px"};font-weight:600;color:${z(v)?"#1d1d1f":"#f5f5f7"};opacity:0.8;">${i>6?i+"%":""}</span>
      </div>
    </div>
    <div style="position:absolute;left:${e}%;top:0;bottom:0;width:4px;transform:translateX(-50%);background:rgba(255,255,255,0.6);cursor:col-resize;z-index:2;"></div>
    <div style="position:absolute;left:${e+r}%;top:0;bottom:0;width:4px;transform:translateX(-50%);background:rgba(255,255,255,0.6);cursor:col-resize;z-index:2;"></div>
  `,G()}function G(){const t=document.getElementById("m1p2-proportion-labels");if(!t)return;const{primary:e,secondary:r,accent:i}=a.rule603010Colors,[n,p,v]=a.proportions;t.innerHTML=[{label:"背景 / 底色",color:e,pct:n},{label:"主数据色",color:r,pct:p},{label:"强调色",color:i,pct:v}].map(m=>`
    <div style="display:flex;align-items:center;gap:var(--space-xs);">
      <div style="width:20px;height:20px;border-radius:4px;background:${m.color};border:1px solid rgba(255,255,255,0.15);"></div>
      <span style="font-size:var(--text-small);color:var(--text-on-dark-2);">${m.label} ${m.pct}%</span>
    </div>
  `).join("")}function Y(){const t=document.getElementById("m1p2-preset-btns");t&&(t.innerHTML=R.map((e,r)=>`
    <button class="m1p2-preset-btn ${r===a.presetIndex?"active":""}" data-idx="${r}" style="
      display:flex;gap:2px;padding:6px 10px;border-radius:var(--radius-full);
      border:1.5px solid ${r===a.presetIndex?"var(--accent)":"var(--border-dark)"};
      background:${r===a.presetIndex?"var(--accent-subtle)":"transparent"};
      cursor:pointer;min-height:36px;align-items:center;transition:all var(--t-fast);
    ">
      <span style="width:16px;height:16px;border-radius:50%;background:${e.primary};border:1px solid rgba(255,255,255,0.2);"></span>
      <span style="width:16px;height:16px;border-radius:50%;background:${e.secondary};"></span>
      <span style="width:16px;height:16px;border-radius:50%;background:${e.accent};"></span>
    </button>
  `).join(""),t.querySelectorAll(".m1p2-preset-btn").forEach(e=>{const r=()=>{const i=parseInt(e.dataset.idx);a.presetIndex=i,a.rule603010Colors={...R[i]},a.proportions=[60,30,10],Y(),M(),I()};e.addEventListener("click",r),a.cleanupFns.push(()=>e.removeEventListener("click",r))}))}function I(){const t=document.getElementById("m1p2-rule-preview");if(!t)return;const{primary:e,secondary:r,accent:i}=a.rule603010Colors,n=z(e),p=n?"#1d1d1f":"#f5f5f7",v=n?"#666":"#aaa";t.innerHTML=`
    <div style="background:${e};border-radius:var(--radius-sm);padding:var(--space-md);min-height:200px;position:relative;transition:background 0.3s;">
      <div style="font-size:var(--text-small);font-weight:600;color:${p};margin-bottom:var(--space-sm);">Figure 1. Sample Data Distribution</div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding-top:var(--space-sm);">
        ${[65,85,45,70,90].map((m,s)=>{const o=s===4;return`<div style="flex:1;height:${m}%;background:${o?i:r};border-radius:4px 4px 0 0;opacity:${o?1:.6+s*.1};transition:all 0.3s;"></div>`}).join("")}
      </div>
      <div style="display:flex;gap:8px;margin-top:4px;">
        ${["A","B","C","D","E*"].map(m=>`<div style="flex:1;text-align:center;font-size:10px;color:${v};">${m}</div>`).join("")}
      </div>
      <div style="display:flex;gap:var(--space-sm);justify-content:center;margin-top:var(--space-sm);">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:10px;height:10px;border-radius:2px;background:${r};"></div>
          <span style="font-size:10px;color:${v};">Control</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:10px;height:10px;border-radius:2px;background:${i};"></div>
          <span style="font-size:10px;color:${v};">Significant</span>
        </div>
      </div>
    </div>
  `}function gt(){const t=document.getElementById("m1p2-de-input1"),e=document.getElementById("m1p2-de-input2"),r=document.getElementById("m1p2-de-swatch1"),i=document.getElementById("m1p2-de-swatch2"),n=document.getElementById("m1p2-de-picker1"),p=document.getElementById("m1p2-de-picker2"),v=(o,h)=>{t&&(t.value=o),e&&(e.value=h),n&&(n.value=o),p&&(p.value=h),m()},m=()=>{const o=q(t?t.value:"#E64B35"),h=q(e?e.value:"#4DBBD5");if(!o||!h)return;a.deltaColor1=o,a.deltaColor2=h,r&&(r.style.background=o),i&&(i.style.background=h),n&&n.value!==o&&(n.value=o),p&&p.value!==h&&(p.value=h);const g=document.getElementById("m1p2-de-gradient");g&&(g.style.background=`linear-gradient(to right, ${o}, ${h})`);const c=tt(o,h),d=document.getElementById("m1p2-de-value"),f=document.getElementById("m1p2-de-label"),y=document.getElementById("m1p2-de-marker");d&&(N.to(d,{textContent:c.toFixed(1),duration:.5,snap:{textContent:.1},ease:"power2.out"}),c<2?d.style.color="#34C759":c<10?d.style.color="#7EC8E3":c<50?d.style.color="#F0B27A":d.style.color="#E07A7A");let l="";if(c<1?l="人眼不可感知":c<2?l="非常微小的差异":c<10?l="可感知的差异":c<50?l="明显不同的颜色":l="完全不相关的颜色",f&&(f.textContent=l),y){let u;c<=0?u=0:c<=1?u=c*2:c<=2?u=2+(c-1)*2:c<=10?u=4+(c-2)*2:c<=50?u=20+(c-10)*1:u=Math.min(100,60+(c-50)*.4),y.style.left=u+"%"}};if(t&&(t.addEventListener("input",m),a.cleanupFns.push(()=>t.removeEventListener("input",m))),e&&(e.addEventListener("input",m),a.cleanupFns.push(()=>e.removeEventListener("input",m))),n){const o=()=>{t&&(t.value=n.value),m()};n.addEventListener("input",o),a.cleanupFns.push(()=>n.removeEventListener("input",o))}if(p){const o=()=>{e&&(e.value=p.value),m()};p.addEventListener("input",o),a.cleanupFns.push(()=>p.removeEventListener("input",o))}document.querySelectorAll(".m1p2-de-preset").forEach(o=>{const h=()=>v(o.dataset.c1,o.dataset.c2);o.addEventListener("click",h),a.cleanupFns.push(()=>o.removeEventListener("click",h))});const s=document.getElementById("m1p2-de-random");if(s){const o=()=>{const h=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");v(h(),h())};s.addEventListener("click",o),a.cleanupFns.push(()=>s.removeEventListener("click",o))}[r,i].forEach(o=>{o&&(o.addEventListener("pointerenter",()=>{o.style.transform="scale(1.05)",o.style.boxShadow="0 4px 20px rgba(0,0,0,0.15)"}),o.addEventListener("pointerleave",()=>{o.style.transform="",o.style.boxShadow=""}))}),m()}function yt(){bt();const t=document.getElementById("m1p2-palette-tabs");t&&(a.paletteTabSwitcher=O(t,{tabs:pt,activeId:"nature",onChange:r=>{a.paletteCategory=r,_()},variant:"pill"}));const e=document.getElementById("m1p2-palette-chart");e&&(a.paletteBrowserChart=W(e,{width:560,height:380,margin:{top:30,right:30,bottom:50,left:50},bgColor:"#ffffff"}),a.activePaletteColors=L.nature[0].colors,P()),V(),_()}const xt=[{id:"bar",label:"柱状图"},{id:"line",label:"折线图"},{id:"donut",label:"圆环图"},{id:"scatter",label:"散点图"},{id:"area",label:"面积图"}];function V(){const t=document.getElementById("m1p2-chart-type-btns");t&&(t.innerHTML=xt.map(e=>`
    <button class="m1p2-chart-type-btn${e.id===a.chartType?" active":""}" data-type="${e.id}" style="
      padding:4px 12px;border-radius:var(--radius-full);font-size:11px;font-family:var(--font-heading);font-weight:500;
      border:1px solid ${e.id===a.chartType?"var(--accent)":"var(--border-dark)"};
      background:${e.id===a.chartType?"var(--accent-subtle)":"transparent"};
      color:${e.id===a.chartType?"var(--accent)":"var(--text-on-dark-3)"};
      cursor:pointer;transition:all var(--t-fast);min-height:28px;
    ">${e.label}</button>
  `).join(""),t.querySelectorAll(".m1p2-chart-type-btn").forEach(e=>{const r=()=>{a.chartType=e.dataset.type,V(),P()};e.addEventListener("click",r),a.cleanupFns.push(()=>e.removeEventListener("click",r))}))}function bt(){if(document.getElementById("m1p2-browser-layout-css"))return;const t=document.createElement("style");t.id="m1p2-browser-layout-css",t.textContent=`
    .m1p2-browser-layout {
      display: flex;
      gap: var(--space-lg);
      align-items: flex-start;
    }
    .m1p2-browser-left {
      flex: 0 0 42%;
      min-width: 0;
      max-height: 620px;
      overflow-y: auto;
      padding-right: var(--space-sm);
      -webkit-overflow-scrolling: touch;
    }
    .m1p2-browser-left::-webkit-scrollbar { width: 4px; }
    .m1p2-browser-left::-webkit-scrollbar-thumb { background: var(--border-dark); border-radius: 2px; }
    .m1p2-browser-right {
      flex: 1;
      min-width: 0;
    }
    @media (max-width: 900px) {
      .m1p2-browser-layout {
        flex-direction: column;
      }
      .m1p2-browser-left {
        flex: none;
        width: 100%;
        max-height: 400px;
        padding-right: 0;
      }
      .m1p2-browser-right {
        width: 100%;
      }
      .m1p2-browser-right > div {
        position: static !important;
      }
    }
    @media (max-width: 768px) {
      .m1p2-browser-layout {
        gap: var(--space-md);
      }
      .m1p2-browser-left {
        max-height: 320px;
      }
      /* 配色卡片紧凑 */
      .m1p2-palette-card {
        padding: var(--space-sm) !important;
      }
      .m1p2-palette-card [style*="font-size:10px"] {
        font-size: 9px !important;
      }
    }
  `,document.head.appendChild(t),a.cleanupFns.push(()=>t.remove())}function _(){const t=document.getElementById("m1p2-palette-list");if(!t)return;a.copyButtons.forEach(r=>r.destroy()),a.copyButtons=[];const e=L[a.paletteCategory]||[];t.innerHTML=e.map((r,i)=>`
    <div class="m1p2-palette-card" data-idx="${i}" style="
      background:var(--bg-dark-elevated);
      border-radius:var(--radius-md);
      padding:var(--space-md);
      border:1px solid var(--border-dark);
      transition:border-color var(--t-fast);
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm);flex-wrap:wrap;gap:var(--space-xs);">
        <span style="font-family:var(--font-heading);font-weight:600;color:var(--text-on-dark);font-size:var(--text-body);">${r.name}</span>
        <div style="display:flex;gap:var(--space-xs);align-items:center;" class="m1p2-palette-actions" data-idx="${i}"></div>
      </div>
      <div style="display:flex;gap:0;border-radius:var(--radius-sm);overflow:hidden;margin-bottom:var(--space-sm);">
        ${r.colors.map(n=>`<div style="flex:1;height:48px;background:${n};min-width:0;" title="${n}"></div>`).join("")}
      </div>
      <div style="display:flex;gap:var(--space-xs);flex-wrap:wrap;">
        ${r.colors.map(n=>`<span style="font-family:var(--font-code);font-size:10px;color:var(--text-on-dark-3);">${n}</span>`).join("")}
      </div>
    </div>
  `).join(""),e.forEach((r,i)=>{const n=t.querySelector(`.m1p2-palette-actions[data-idx="${i}"]`);if(!n)return;const p=Q(n,{getText:()=>r.colors.join(", "),label:"复制 HEX",successLabel:"已复制",className:"btn-small"});a.copyButtons.push(p);const v=document.createElement("button");v.className="btn-ghost btn-small",v.textContent="应用到图表",v.style.cssText="font-size:var(--text-small);padding:8px 16px;color:var(--text-on-dark-2);border-color:var(--border-dark);";const m=()=>{a.activePaletteColors=r.colors,P();const s=document.getElementById("m1p2-palette-chart");s&&s.scrollIntoView({behavior:"smooth",block:"center"}),t.querySelectorAll(".m1p2-palette-card").forEach((o,h)=>{o.style.borderColor=h===i?"var(--accent)":"var(--border-dark)"})};v.addEventListener("click",m),n.appendChild(v),a.cleanupFns.push(()=>{v.removeEventListener("click",m),v.remove()})})}function P(){const t=a.paletteBrowserChart;if(!t)return;const e=a.activePaletteColors||L.nature[0].colors,r=a.chartType||"bar",i=t.clear(),{innerWidth:n,innerHeight:p}=t,v="#333",m="#888",s="#e0e0e0",o=(h,g,c=-15)=>{const d=h.length,f=Math.min(60,n/d),y=d*f,l=n-y,u=i.append("g").attr("transform",`translate(${l}, ${c})`);h.forEach((b,B)=>{const x=u.append("g").attr("transform",`translate(${B*f}, 0)`);x.append("rect").attr("width",10).attr("height",10).attr("rx",2).attr("fill",g[B]),x.append("text").attr("x",14).attr("y",9).attr("fill",m).attr("font-size","10px").text(b)})};if(r==="bar"){const h=["Group A","Group B","Group C","Group D"],g=e.slice(0,5).map((l,u)=>({name:"S"+(u+1),color:l})),c=h.flatMap((l,u)=>g.map((b,B)=>({category:l,series:b.name,value:20+Math.sin(u*1.5+B*.7)*30+40,color:b.color}))),d=T().domain(h).range([0,n]).padding(.2),f=T().domain(g.map(l=>l.name)).range([0,d.bandwidth()]).padding(.08),y=C().domain([0,100]).range([p,0]);i.append("g").attr("transform",`translate(0,${p})`).call(F(d).tickSize(0)).call(l=>l.select(".domain").attr("stroke",s)).selectAll("text").attr("fill",m).attr("font-size","11px"),i.append("g").call(D(y).ticks(5).tickSize(-n)).call(l=>l.select(".domain").remove()).call(l=>l.selectAll(".tick line").attr("stroke",s).attr("stroke-dasharray","3,3")).selectAll("text").attr("fill",m).attr("font-size","11px"),i.selectAll(".bar").data(c).join("rect").attr("class","bar").attr("x",l=>d(l.category)+f(l.series)).attr("width",f.bandwidth()).attr("rx",3).attr("fill",l=>l.color).attr("y",p).attr("height",0).transition().duration(600).delay((l,u)=>u*20).ease(A).attr("y",l=>y(l.value)).attr("height",l=>p-y(l.value)),o(g.map(l=>l.name),g.map(l=>l.color))}else if(r==="line"){const h=Math.min(e.length,6),g=8,c=C().domain([0,g-1]).range([0,n]),d=C().domain([0,100]).range([p,0]);i.append("g").attr("transform",`translate(0,${p})`).call(F(c).ticks(g).tickFormat(f=>"T"+f)).call(f=>f.select(".domain").attr("stroke",s)).selectAll("text").attr("fill",m).attr("font-size","11px"),i.append("g").call(D(d).ticks(5).tickSize(-n)).call(f=>f.select(".domain").remove()).call(f=>f.selectAll(".tick line").attr("stroke",s).attr("stroke-dasharray","3,3")).selectAll("text").attr("fill",m).attr("font-size","11px");for(let f=0;f<h;f++){const y=15+f*8,l=5+f*1.2,u=[0,3,-2,4,-1,5,2,3],b=Array.from({length:g},(E,k)=>({x:k,y:Math.min(95,Math.max(5,y+l*k+u[k%u.length]))})),B=nt().x(E=>c(E.x)).y(E=>d(E.y)).curve(ot),x=i.append("path").datum(b).attr("d",B).attr("fill","none").attr("stroke",e[f]).attr("stroke-width",2.5).attr("stroke-linecap","round"),w=x.node().getTotalLength();x.attr("stroke-dasharray",w).attr("stroke-dashoffset",w).transition().duration(800).delay(f*100).ease(A).attr("stroke-dashoffset",0),i.selectAll(`.dot-${f}`).data(b).join("circle").attr("class",`dot-${f}`).attr("cx",E=>c(E.x)).attr("cy",E=>d(E.y)).attr("r",0).attr("fill",e[f]).transition().duration(400).delay((E,k)=>800+f*100+k*40).attr("r",3.5)}o(Array.from({length:h},(f,y)=>"S"+(y+1)),e.slice(0,h))}else if(r==="donut"){const h=Math.min(e.length,8),g=Array.from({length:h},(u,b)=>({value:10+Math.sin(b*1.4)*5+8,color:e[b],label:"Cat "+(b+1)})),c=Math.min(n,p)/2-10,d=j().innerRadius(c*.55).outerRadius(c),y=it().value(u=>u.value).sort(null).padAngle(.02)(g),l=i.append("g").attr("transform",`translate(${n/2},${p/2})`);l.selectAll(".arc").data(y).join("path").attr("class","arc").attr("fill",u=>u.data.color).attr("d",j().innerRadius(c*.55).outerRadius(c*.55)).transition().duration(700).delay((u,b)=>b*60).ease(A).attr("d",d),l.append("text").attr("text-anchor","middle").attr("dy","-0.2em").attr("fill",v).attr("font-size","18px").attr("font-weight","700").text("Total"),l.append("text").attr("text-anchor","middle").attr("dy","1.2em").attr("fill",m).attr("font-size","13px").text(g.reduce((u,b)=>u+b.value,0).toFixed(0)),y.forEach((u,b)=>{const[B,x]=d.centroid(u);u.endAngle-u.startAngle>.3&&l.append("text").attr("x",B).attr("y",x).attr("text-anchor","middle").attr("fill","#fff").attr("font-size","10px").attr("font-weight","600").text(Math.round(u.data.value/g.reduce((w,E)=>w+E.value,0)*100)+"%").attr("opacity",0).transition().delay(700+b*60).duration(300).attr("opacity",1)}),o(g.map(u=>u.label),g.map(u=>u.color))}else if(r==="scatter"){const h=Math.min(e.length,5),g=C().domain([0,100]).range([0,n]),c=C().domain([0,100]).range([p,0]);i.append("g").attr("transform",`translate(0,${p})`).call(F(g).ticks(5)).call(d=>d.select(".domain").attr("stroke",s)).selectAll("text").attr("fill",m).attr("font-size","11px"),i.append("g").call(D(c).ticks(5).tickSize(-n)).call(d=>d.select(".domain").remove()).call(d=>d.selectAll(".tick line").attr("stroke",s).attr("stroke-dasharray","3,3")).selectAll("text").attr("fill",m).attr("font-size","11px"),i.append("text").attr("x",n/2).attr("y",p+38).attr("text-anchor","middle").attr("fill",m).attr("font-size","11px").text("Variable X"),i.append("text").attr("transform","rotate(-90)").attr("x",-p/2).attr("y",-38).attr("text-anchor","middle").attr("fill",m).attr("font-size","11px").text("Variable Y");for(let d=0;d<h;d++){const f=Array.from({length:12},()=>({x:10+d*15+Math.random()*30,y:20+Math.random()*60+Math.sin(d)*10}));i.selectAll(`.scatter-${d}`).data(f).join("circle").attr("class",`scatter-${d}`).attr("cx",y=>g(y.x)).attr("cy",y=>c(y.y)).attr("r",0).attr("fill",e[d]).attr("opacity",.7).transition().duration(500).delay((y,l)=>d*80+l*20).ease(A).attr("r",5)}o(Array.from({length:h},(d,f)=>"Group "+(f+1)),e.slice(0,h))}else if(r==="area"){const h=Math.min(e.length,5),g=10,c=C().domain([0,g-1]).range([0,n]),d=Array.from({length:g},(x,w)=>{const E={x:w};for(let k=0;k<h;k++)E["s"+k]=8+Math.sin(w*.6+k*1.3)*6+10;return E}),f=Array.from({length:h},(x,w)=>"s"+w),l=st().keys(f)(d),u=rt(l[l.length-1],x=>x[1]),b=C().domain([0,u*1.1]).range([p,0]);i.append("g").attr("transform",`translate(0,${p})`).call(F(c).ticks(g).tickFormat(x=>"T"+x)).call(x=>x.select(".domain").attr("stroke",s)).selectAll("text").attr("fill",m).attr("font-size","11px"),i.append("g").call(D(b).ticks(5).tickSize(-n)).call(x=>x.select(".domain").remove()).call(x=>x.selectAll(".tick line").attr("stroke",s).attr("stroke-dasharray","3,3")).selectAll("text").attr("fill",m).attr("font-size","11px");const B=lt().x((x,w)=>c(d[w].x)).y0(x=>b(x[0])).y1(x=>b(x[1])).curve(ct);l.forEach((x,w)=>{i.append("path").datum(x).attr("d",B).attr("fill",e[w]).attr("opacity",0).transition().duration(600).delay(w*80).ease(A).attr("opacity",.8)}),o(Array.from({length:h},(x,w)=>"S"+(w+1)),e.slice(0,h))}}function wt(){U(".page-hero-title, .page-hero-sub"),S("#m1p2-harmony-wheel"),S("#m1p2-proportion-bar"),S("#m1p2-palette-list")}function Nt(){J();const t=document.getElementById("m1p2-styles");t&&t.remove(),a.harmonyTabSwitcher&&a.harmonyTabSwitcher.destroy(),a.paletteTabSwitcher&&a.paletteTabSwitcher.destroy(),a.harmonyChartPreview&&a.harmonyChartPreview.destroy(),a.paletteBrowserChart&&a.paletteBrowserChart.destroy(),a.copyButtons.forEach(e=>e.destroy()),a.harmonyAnimFrame&&cancelAnimationFrame(a.harmonyAnimFrame),a.cleanupFns.forEach(e=>e()),a.resizeObservers.forEach(e=>e.disconnect()),a={harmonyType:"complementary",baseHue:0,harmonyCanvas:null,harmonyCtx:null,harmonyAnimFrame:null,harmonyTabSwitcher:null,harmonyChartPreview:null,proportions:[60,30,10],rule603010Colors:{primary:"#f5f5f7",secondary:"#3C5488",accent:"#E64B35"},presetIndex:0,isDraggingDivider:!1,activeDivider:-1,deltaColor1:"#E64B35",deltaColor2:"#4DBBD5",paletteCategory:"nature",paletteTabSwitcher:null,paletteBrowserChart:null,activePaletteColors:null,chartType:"bar",copyButtons:[],cleanupFns:[],resizeObservers:[]}}function q(t){let e=(t||"").trim();return e.startsWith("#")||(e="#"+e),/^#[0-9A-Fa-f]{6}$/.test(e)?e:/^#[0-9A-Fa-f]{3}$/.test(e)?"#"+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]:null}function z(t){const e=at(t);return e?(.299*e.r+.587*e.g+.114*e.b)/255>.55:!0}export{Nt as destroy,qt as init,_t as render};
