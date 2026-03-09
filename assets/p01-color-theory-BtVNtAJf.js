import{k as L,g as R,s as H,f as x}from"./ScrollAnimations-B5Kyk-Xq.js";import{r as P,h as A,a as z}from"./color-math-Dw8FC2aa.js";import{c as O}from"./CopyButton-2sIiwDp8.js";import{n as W}from"./index-B1a3RBOV.js";let t={h:210,s:80,l:50,wheelCanvas:null,wheelCtx:null,wheelOffscreen:null,wheelOffscreenCtx:null,wheelSize:0,wheelRadius:0,wheelCenterX:0,wheelCenterY:0,isDraggingWheel:!1,additiveCanvas:null,additiveCtx:null,subtractiveCanvas:null,subtractiveCtx:null,addCircles:[{x:.35,y:.3},{x:.65,y:.3},{x:.5,y:.65}],subCircles:[{x:.35,y:.3},{x:.65,y:.3},{x:.5,y:.65}],draggingAddIdx:-1,draggingSubIdx:-1,copyButtons:[],pointerHandlers:[]};function Z(){return`
<div class="page-scroll">

  <!-- ====== Section 1: Hero ====== -->
  <section class="section-dark section-hero-full m1p1-hero" style="align-items:center;">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;">
      <p class="hero-eyebrow m1p1-hero-eyebrow" style="opacity:0;">Module 01 / Page 01</p>
      <h1 class="page-hero-title m1p1-hero-title" style="color:var(--text-on-dark);opacity:0;">色彩理论基础</h1>
      <p class="page-hero-sub m1p1-hero-sub" style="opacity:0;">Color Theory Fundamentals</p>
      <p class="m1p1-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">理解光与色彩的物理与感知基础，为科研配色建立系统认知</p>
      <!-- 快捷导航 -->
      <nav class="hero-quicknav m1p1-hero-nav" style="opacity:0;" id="m1p1-hero-nav">
        <button class="hero-quicknav__item" data-target=".m1p1-wheel-section">交互色轮</button>
        <button class="hero-quicknav__item" data-target=".m1p1-hsl-section">HSL 三维度</button>
        <button class="hero-quicknav__item" data-target=".m1p1-mixing-section">加色与减色</button>
      </nav>
      <div class="m1p1-scroll-hint">↓ 向下探索</div>
    </div>
  </section>

  <!-- ====== Section 2: Interactive Color Wheel ====== -->
  <section class="section-dark m1p1-wheel-section" style="min-height:auto;padding-top:var(--space-xl);padding-bottom:var(--space-3xl);">
    <div class="content-wrapper">
      <div class="reading-wrapper" style="margin-bottom:var(--space-lg);">
        <h2 class="m1p1-section-title" style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;text-align:center;color:var(--text-on-dark);">交互色轮</h2>
        <p style="text-align:center;color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">拖动色轮选择颜色，调节滑块精确控制 HSL 参数</p>
      </div>
      <div class="m1p1-wheel-layout">
        <!-- 左侧：色轮 -->
        <div class="m1p1-wheel-col">
          <div class="m1p1-wheel-container">
            <canvas id="m1p1-wheel-canvas"></canvas>
          </div>
        </div>
        <!-- 右侧：色值 + 滑块 -->
        <div class="m1p1-controls-col">
          <!-- 色块预览 -->
          <div class="m1p1-swatch-row">
            <div id="m1p1-swatch" class="m1p1-swatch"></div>
            <div id="m1p1-hex-display" class="m1p1-hex-display" style="font-family:var(--font-code);font-size:1.5rem;font-weight:600;color:var(--text-on-dark);">#4C9CD9</div>
          </div>
          <!-- HSL 滑块 -->
          <div class="m1p1-sliders">
            <div class="m1p1-slider-group">
              <label class="m1p1-slider-label">
                <span style="color:var(--text-on-dark-2);">H 色相</span>
                <span id="m1p1-h-value" class="m1p1-slider-value" style="font-family:var(--font-code);">210°</span>
              </label>
              <input type="range" id="m1p1-h-slider" class="m1p1-range m1p1-range-hue" min="0" max="360" value="210">
            </div>
            <div class="m1p1-slider-group">
              <label class="m1p1-slider-label">
                <span style="color:var(--text-on-dark-2);">S 饱和度</span>
                <span id="m1p1-s-value" class="m1p1-slider-value" style="font-family:var(--font-code);">80%</span>
              </label>
              <input type="range" id="m1p1-s-slider" class="m1p1-range m1p1-range-sat" min="0" max="100" value="80">
            </div>
            <div class="m1p1-slider-group">
              <label class="m1p1-slider-label">
                <span style="color:var(--text-on-dark-2);">L 明度</span>
                <span id="m1p1-l-value" class="m1p1-slider-value" style="font-family:var(--font-code);">50%</span>
              </label>
              <input type="range" id="m1p1-l-slider" class="m1p1-range m1p1-range-light" min="0" max="100" value="50">
            </div>
          </div>
          <!-- 色值网格 -->
          <div class="m1p1-values-grid" id="m1p1-values-grid">
            <div class="m1p1-value-row" data-format="hex">
              <span class="m1p1-value-label">HEX</span>
              <span class="m1p1-value-text" id="m1p1-val-hex">#4C9CD9</span>
              <span class="m1p1-value-copy" data-copy="hex"></span>
            </div>
            <div class="m1p1-value-row" data-format="rgb">
              <span class="m1p1-value-label">RGB</span>
              <span class="m1p1-value-text" id="m1p1-val-rgb">rgb(76, 156, 217)</span>
              <span class="m1p1-value-copy" data-copy="rgb"></span>
            </div>
            <div class="m1p1-value-row" data-format="hsl">
              <span class="m1p1-value-label">HSL</span>
              <span class="m1p1-value-text" id="m1p1-val-hsl">hsl(210, 80%, 50%)</span>
              <span class="m1p1-value-copy" data-copy="hsl"></span>
            </div>
            <div class="m1p1-value-row" data-format="cmyk">
              <span class="m1p1-value-label">CMYK</span>
              <span class="m1p1-value-text" id="m1p1-val-cmyk">cmyk(65, 28, 0, 15)</span>
              <span class="m1p1-value-copy" data-copy="cmyk"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== Section 3: HSL Dimensions ====== -->
  <section class="section-light m1p1-hsl-section">
    <div class="content-wrapper">
      <div class="reading-wrapper" style="margin-bottom:var(--space-lg);">
        <h2 class="m1p1-section-title" style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;text-align:center;color:var(--text-on-light);">HSL 三维度</h2>
        <p style="text-align:center;color:var(--text-on-light-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">色相、饱和度、明度——三个独立维度构成完整的色彩空间</p>
      </div>
      <div class="m1p1-hsl-dims">
        <!-- 色相 -->
        <div class="m1p1-dim-block">
          <div class="m1p1-dim-header">
            <h3 style="font-family:var(--font-heading);font-size:var(--text-heading);font-weight:600;color:var(--text-on-light);">色相 <span style="font-weight:300;color:var(--text-on-light-3);">Hue</span></h3>
            <span id="m1p1-dim-h-val" style="font-family:var(--font-code);color:var(--accent);font-size:var(--text-body);">210°</span>
          </div>
          <div class="m1p1-gradient-bar m1p1-gradient-hue">
            <div class="m1p1-gradient-indicator" id="m1p1-hue-indicator" style="left:58.3%;"></div>
          </div>
          <p style="color:var(--text-on-light-2);font-size:var(--text-small);line-height:1.6;margin-top:var(--space-xs);">色相是色彩的基本属性，对应色轮上的角度（0°-360°）。红色 0°，绿色 120°，蓝色 240°。</p>
        </div>
        <!-- 饱和度 -->
        <div class="m1p1-dim-block">
          <div class="m1p1-dim-header">
            <h3 style="font-family:var(--font-heading);font-size:var(--text-heading);font-weight:600;color:var(--text-on-light);">饱和度 <span style="font-weight:300;color:var(--text-on-light-3);">Saturation</span></h3>
            <span id="m1p1-dim-s-val" style="font-family:var(--font-code);color:var(--accent);font-size:var(--text-body);">80%</span>
          </div>
          <div class="m1p1-gradient-bar" id="m1p1-gradient-sat">
            <div class="m1p1-gradient-indicator" id="m1p1-sat-indicator" style="left:80%;"></div>
          </div>
          <p style="color:var(--text-on-light-2);font-size:var(--text-small);line-height:1.6;margin-top:var(--space-xs);">饱和度表示色彩的鲜艳程度。0% 为完全灰色，100% 为纯色。科研图表中适当降低饱和度可提升可读性。</p>
        </div>
        <!-- 明度 -->
        <div class="m1p1-dim-block">
          <div class="m1p1-dim-header">
            <h3 style="font-family:var(--font-heading);font-size:var(--text-heading);font-weight:600;color:var(--text-on-light);">明度 <span style="font-weight:300;color:var(--text-on-light-3);">Lightness</span></h3>
            <span id="m1p1-dim-l-val" style="font-family:var(--font-code);color:var(--accent);font-size:var(--text-body);">50%</span>
          </div>
          <div class="m1p1-gradient-bar" id="m1p1-gradient-light">
            <div class="m1p1-gradient-indicator" id="m1p1-light-indicator" style="left:50%;"></div>
          </div>
          <p style="color:var(--text-on-light-2);font-size:var(--text-small);line-height:1.6;margin-top:var(--space-xs);">明度控制色彩的深浅。0% 为纯黑，100% 为纯白，50% 时色彩最为纯净。打印时需注意明度对比。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== Section 4: Additive vs Subtractive ====== -->
  <section class="section-dark m1p1-mixing-section">
    <div class="content-wrapper">
      <div class="reading-wrapper" style="margin-bottom:var(--space-lg);">
        <h2 class="m1p1-section-title" style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;text-align:center;color:var(--text-on-dark);">加色混色 vs 减色混色</h2>
        <p style="text-align:center;color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">屏幕发光用 RGB（加色），打印吸光用 CMYK（减色）——理解两种模型是科研配色的根基</p>
      </div>
      <div class="m1p1-mixing-layout">
        <div class="m1p1-mixing-panel">
          <h3 style="font-family:var(--font-heading);font-size:var(--text-body);font-weight:600;color:var(--text-on-dark);text-align:center;margin-bottom:var(--space-sm);">加色混色 <span style="font-weight:300;color:var(--text-on-dark-3);">Additive (RGB)</span></h3>
          <p style="color:var(--text-on-dark-3);font-size:var(--text-small);text-align:center;margin-bottom:var(--space-md);">拖动圆圈观察光的叠加</p>
          <div class="m1p1-mixing-canvas-wrap">
            <canvas id="m1p1-additive-canvas"></canvas>
          </div>
        </div>
        <div class="m1p1-mixing-panel">
          <h3 style="font-family:var(--font-heading);font-size:var(--text-body);font-weight:600;color:var(--text-on-dark);text-align:center;margin-bottom:var(--space-sm);">减色混色 <span style="font-weight:300;color:var(--text-on-dark-3);">Subtractive (CMY)</span></h3>
          <p style="color:var(--text-on-dark-3);font-size:var(--text-small);text-align:center;margin-bottom:var(--space-md);">拖动圆圈观察颜料的叠加</p>
          <div class="m1p1-mixing-canvas-wrap subtractive-bg">
            <canvas id="m1p1-subtractive-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ====== Section 5: Footer CTA ====== -->
  <section class="page-footer-cta">
    <p class="page-footer-num">01 / 10</p>
    <h2 class="page-footer-quote">"色彩是数据最直接的语言"</h2>
    <p class="page-footer-desc">掌握 HSL 模型与混色原理后，你就拥有了精准控制配色的能力。下一步：用色彩和谐原理构建科研配色方案。</p>
    <div class="page-footer-nav">
      <button class="btn-primary m1p1-nav-link" data-route="m1-p2">色彩和谐 →</button>
    </div>
  </section>

</div>

<style>
  /* ====== Hero glow ====== */
  .m1p1-hero {
    position: relative;
    overflow: hidden;
  }
  .m1p1-scroll-hint {
    font-size: var(--text-caption); color: var(--text-on-dark-3);
    animation: m1p1-float 2s ease-in-out infinite;
    white-space: nowrap; margin-top: var(--space-sm);
  }
  @keyframes m1p1-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  .m1p1-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 40% at 35% 45%, rgba(126,200,227,0.10) 0%, transparent 70%),
      radial-gradient(ellipse 35% 35% at 65% 55%, rgba(149,213,178,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  /* ====== 色轮区域布局 ====== */
  .m1p1-wheel-layout {
    display: flex;
    gap: var(--space-xl);
    align-items: flex-start;
    max-width: 780px;
    margin: 0 auto;
  }
  .m1p1-wheel-col {
    flex: 0 0 auto;
  }
  .m1p1-controls-col {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  .m1p1-wheel-container {
    position: relative;
    width: 320px;
    height: 320px;
  }
  .m1p1-wheel-container canvas {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: crosshair;
  }

  /* ====== 色块预览 ====== */
  .m1p1-swatch-row {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  .m1p1-swatch {
    width: 72px;
    height: 72px;
    border-radius: var(--radius-md);
    border: 2px solid var(--border-dark);
    transition: background-color 0.05s;
    flex-shrink: 0;
  }

  /* ====== 滑块 ====== */
  .m1p1-sliders {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  .m1p1-slider-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .m1p1-slider-label {
    display: flex;
    justify-content: space-between;
    font-size: var(--text-small);
  }
  .m1p1-slider-value {
    color: var(--text-on-dark);
    font-weight: 500;
  }

  /* 自定义 range slider */
  .m1p1-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    border: none;
  }
  .m1p1-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    cursor: grab;
  }
  .m1p1-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    cursor: grab;
  }
  .m1p1-range:active::-webkit-slider-thumb { cursor: grabbing; }
  .m1p1-range:active::-moz-range-thumb { cursor: grabbing; }

  /* 色相滑块：彩虹渐变 */
  .m1p1-range-hue {
    background: linear-gradient(to right,
      hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%),
      hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));
  }

  /* ====== 色值网格 ====== */
  .m1p1-values-grid {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border-dark);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }
  .m1p1-value-row {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: 10px 14px;
    background: var(--bg-dark-elevated);
  }
  .m1p1-value-label {
    font-family: var(--font-code);
    font-size: var(--text-caption);
    color: var(--text-on-dark-3);
    width: 40px;
    flex-shrink: 0;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .m1p1-value-text {
    font-family: var(--font-code);
    font-size: var(--text-small);
    color: var(--text-on-dark);
    flex: 1;
    min-width: 0;
  }
  .m1p1-value-copy {
    flex-shrink: 0;
  }

  /* ====== HSL 三维度 ====== */
  .m1p1-hsl-dims {
    max-width: 780px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }
  .m1p1-dim-block {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  .m1p1-dim-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .m1p1-gradient-bar {
    position: relative;
    height: 24px;
    border-radius: 12px;
    overflow: visible;
  }
  .m1p1-gradient-hue {
    background: linear-gradient(to right,
      hsl(0,100%,50%), hsl(30,100%,50%), hsl(60,100%,50%), hsl(90,100%,50%),
      hsl(120,100%,50%), hsl(150,100%,50%), hsl(180,100%,50%), hsl(210,100%,50%),
      hsl(240,100%,50%), hsl(270,100%,50%), hsl(300,100%,50%), hsl(330,100%,50%), hsl(360,100%,50%));
  }
  .m1p1-gradient-indicator {
    position: absolute;
    top: 50%;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid rgba(0,0,0,0.3);
    box-shadow: 0 1px 4px rgba(0,0,0,0.25);
    transform: translate(-50%, -50%);
    transition: left 0.1s ease;
    pointer-events: none;
  }

  /* ====== 混色区域 ====== */
  .m1p1-mixing-layout {
    display: flex;
    gap: var(--space-lg);
    max-width: 780px;
    margin: 0 auto;
    justify-content: center;
  }
  .m1p1-mixing-panel {
    flex: 1;
    min-width: 0;
    max-width: 360px;
  }
  .m1p1-mixing-canvas-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-md);
    overflow: hidden;
    background: #111;
  }
  .m1p1-mixing-canvas-wrap.subtractive-bg {
    background: #f5f5f7;
  }
  .m1p1-mixing-canvas-wrap canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: grab;
  }
  .m1p1-mixing-canvas-wrap canvas:active {
    cursor: grabbing;
  }

  /* ====== 导航链接 ====== */
  .m1p1-nav-link {
    cursor: pointer;
    text-decoration: none;
  }

  /* ====== 移动端适配 ====== */
  @media (max-width: 768px) {
    .m1p1-range { height: auto; min-height: 32px; }
    .m1p1-range::-webkit-slider-thumb { width: 24px; height: 24px; }
    .m1p1-range::-moz-range-thumb { width: 24px; height: 24px; }
    .m1p1-wheel-layout {
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
    }
    .m1p1-wheel-container {
      width: min(280px, 80vw);
      height: min(280px, 80vw);
    }
    .m1p1-controls-col {
      width: 100%;
    }
    .m1p1-swatch {
      width: 56px;
      height: 56px;
    }
    .m1p1-hex-display {
      font-size: 1.2rem !important;
    }
    .m1p1-mixing-layout {
      flex-direction: column;
      align-items: center;
      gap: var(--space-lg);
    }
    .m1p1-mixing-panel {
      max-width: 320px;
      width: 100%;
    }
  }
</style>
`}function ee(){q(),X(),_(),G(),B(),U(),Y(),D(),u()}function te(){t.pointerHandlers.forEach(({el:e,event:n,handler:a})=>{e.removeEventListener(n,a)}),t.pointerHandlers=[],t.copyButtons.forEach(e=>e.destroy()),t.copyButtons=[],L(),t.wheelCanvas=null,t.wheelCtx=null,t.wheelOffscreen=null,t.wheelOffscreenCtx=null,t.additiveCanvas=null,t.additiveCtx=null,t.subtractiveCanvas=null,t.subtractiveCtx=null}function q(){const e=R.timeline({delay:.2});e.to(".m1p1-hero-eyebrow",{opacity:1,y:0,duration:.6,ease:"power3.out"},0),e.fromTo(".m1p1-hero-title",{y:30},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),e.fromTo(".m1p1-hero-sub",{y:20},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),e.fromTo(".m1p1-hero-tagline",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),e.fromTo(".m1p1-hero-nav",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),T()}function T(){document.querySelectorAll(".m1p1-hero-nav .hero-quicknav__item").forEach(e=>{const n=()=>{const a=document.querySelector(e.dataset.target);a&&a.scrollIntoView({behavior:"smooth",block:"start"})};e.addEventListener("click",n),t.pointerHandlers.push({el:e,event:"click",handler:n})})}function D(){H(".m1p1-wheel-layout"),x(".m1p1-dim-block",{stagger:.2,y:40}),x(".m1p1-mixing-panel",{stagger:.2,y:50}),x(".m1p1-footer-cta .content-wrapper",{y:30})}function Y(){document.querySelectorAll(".m1p1-nav-link").forEach(e=>{const n=a=>{a.preventDefault();const i=e.getAttribute("data-route");i&&W(i)};e.addEventListener("click",n),t.pointerHandlers.push({el:e,event:"click",handler:n})})}function X(){const e=document.getElementById("m1p1-wheel-canvas");if(!e)return;t.wheelCanvas=e,e.style.touchAction="none";const a=e.parentElement.clientWidth,i=window.devicePixelRatio||1;t.wheelSize=a,e.width=a*i,e.height=a*i,t.wheelCtx=e.getContext("2d"),t.wheelCtx.scale(i,i),t.wheelRadius=a/2-4,t.wheelCenterX=a/2,t.wheelCenterY=a/2,t.wheelOffscreen=document.createElement("canvas"),t.wheelOffscreen.width=a*i,t.wheelOffscreen.height=a*i,t.wheelOffscreenCtx=t.wheelOffscreen.getContext("2d"),t.wheelOffscreenCtx.scale(i,i),$(),E();const l=r=>{const s=g(e,r),c=s.x-t.wheelCenterX,m=s.y-t.wheelCenterY;Math.sqrt(c*c+m*m)<=t.wheelRadius&&(t.isDraggingWheel=!0,e.setPointerCapture(r.pointerId),k(s.x,s.y))},d=r=>{if(!t.isDraggingWheel)return;const s=g(e,r);k(s.x,s.y)},o=()=>{t.isDraggingWheel=!1};e.addEventListener("pointerdown",l),e.addEventListener("pointermove",d),e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o),t.pointerHandlers.push({el:e,event:"pointerdown",handler:l},{el:e,event:"pointermove",handler:d},{el:e,event:"pointerup",handler:o},{el:e,event:"pointercancel",handler:o})}function $(){const e=t.wheelOffscreenCtx,n=t.wheelSize,a=t.wheelCenterX,i=t.wheelCenterY,l=t.wheelRadius,d=t.l;e.clearRect(0,0,n,n);const o=2,r=2;for(let s=0;s<360;s+=o)for(let c=0;c<l;c+=r){const m=s,p=c/l*100,h=(s-1)*Math.PI/180,v=(s+o+1)*Math.PI/180;e.beginPath(),e.arc(a,i,c+r,h,v),e.arc(a,i,Math.max(0,c),v,h,!0),e.closePath(),e.fillStyle=`hsl(${m}, ${p}%, ${d}%)`,e.fill()}e.globalCompositeOperation="destination-in",e.beginPath(),e.arc(a,i,l,0,Math.PI*2),e.fill(),e.globalCompositeOperation="source-over"}function E(){const e=t.wheelCtx,n=t.wheelSize,a=t.wheelCenterX,i=t.wheelCenterY;e.clearRect(0,0,n,n);const l=window.devicePixelRatio||1;e.drawImage(t.wheelOffscreen,0,0,n*l,n*l,0,0,n,n);const d=t.h*Math.PI/180,o=t.s/100*t.wheelRadius,r=a+o*Math.cos(d),s=i+o*Math.sin(d);e.beginPath(),e.arc(r,s,10,0,Math.PI*2),e.strokeStyle="#fff",e.lineWidth=2.5,e.stroke(),e.beginPath(),e.arc(r,s,8,0,Math.PI*2),e.strokeStyle="rgba(0,0,0,0.3)",e.lineWidth=1,e.stroke()}function k(e,n){const a=e-t.wheelCenterX,i=n-t.wheelCenterY;let l=Math.sqrt(a*a+i*i);l>t.wheelRadius&&(l=t.wheelRadius);let d=Math.atan2(i,a)*180/Math.PI;d<0&&(d+=360),t.h=Math.round(d),t.s=Math.round(l/t.wheelRadius*100),u()}function _(){const e=document.getElementById("m1p1-h-slider"),n=document.getElementById("m1p1-s-slider"),a=document.getElementById("m1p1-l-slider");if(!e||!n||!a)return;const i=()=>{t.h=parseInt(e.value),u()},l=()=>{t.s=parseInt(n.value),u()},d=()=>{t.l=parseInt(a.value),$(),u()};e.addEventListener("input",i),n.addEventListener("input",l),a.addEventListener("input",d),t.pointerHandlers.push({el:e,event:"input",handler:i},{el:n,event:"input",handler:l},{el:a,event:"input",handler:d})}function G(){["hex","rgb","hsl","cmyk"].forEach(n=>{const a=document.querySelector(`.m1p1-value-copy[data-copy="${n}"]`);if(!a)return;const i=O(a,{getText:()=>{const l=document.getElementById(`m1p1-val-${n}`);return l?l.textContent:""},label:"复制",className:"btn-small"});t.copyButtons.push(i)})}function u(){const{h:e,s:n,l:a}=t,i=A(e,n,a),l=P(i.r,i.g,i.b),d=z(i.r,i.g,i.b),o=document.getElementById("m1p1-swatch");o&&(o.style.backgroundColor=l);const r=document.getElementById("m1p1-hex-display");r&&(r.textContent=l.toUpperCase());const s=document.getElementById("m1p1-val-hex"),c=document.getElementById("m1p1-val-rgb"),m=document.getElementById("m1p1-val-hsl"),p=document.getElementById("m1p1-val-cmyk");s&&(s.textContent=l.toUpperCase()),c&&(c.textContent=`rgb(${i.r}, ${i.g}, ${i.b})`),m&&(m.textContent=`hsl(${e}, ${n}%, ${a}%)`),p&&(p.textContent=`cmyk(${d.c}, ${d.m}, ${d.y}, ${d.k})`);const h=document.getElementById("m1p1-h-slider"),v=document.getElementById("m1p1-s-slider"),y=document.getElementById("m1p1-l-slider");h&&(h.value=e),v&&(v.value=n),y&&(y.value=a);const b=document.getElementById("m1p1-h-value"),w=document.getElementById("m1p1-s-value"),C=document.getElementById("m1p1-l-value");b&&(b.textContent=`${e}°`),w&&(w.textContent=`${n}%`),C&&(C.textContent=`${a}%`),F(),E(),B()}function F(){const{h:e,s:n,l:a}=t,i=document.getElementById("m1p1-s-slider"),l=document.getElementById("m1p1-l-slider");i&&(i.style.background=`linear-gradient(to right, hsl(${e}, 0%, ${a}%), hsl(${e}, 100%, ${a}%))`),l&&(l.style.background=`linear-gradient(to right, hsl(${e}, ${n}%, 0%), hsl(${e}, ${n}%, 50%), hsl(${e}, ${n}%, 100%))`)}function B(){const{h:e,s:n,l:a}=t,i=document.getElementById("m1p1-hue-indicator"),l=document.getElementById("m1p1-sat-indicator"),d=document.getElementById("m1p1-light-indicator");i&&(i.style.left=`${e/360*100}%`),l&&(l.style.left=`${n}%`),d&&(d.style.left=`${a}%`);const o=document.getElementById("m1p1-gradient-sat");o&&(o.style.background=`linear-gradient(to right, hsl(${e}, 0%, ${a}%), hsl(${e}, 100%, ${a}%))`);const r=document.getElementById("m1p1-gradient-light");r&&(r.style.background=`linear-gradient(to right, hsl(${e}, ${n}%, 0%), hsl(${e}, ${n}%, 50%), hsl(${e}, ${n}%, 100%))`);const s=document.getElementById("m1p1-dim-h-val"),c=document.getElementById("m1p1-dim-s-val"),m=document.getElementById("m1p1-dim-l-val");s&&(s.textContent=`${e}°`),c&&(c.textContent=`${n}%`),m&&(m.textContent=`${a}%`)}function U(){requestAnimationFrame(()=>{requestAnimationFrame(()=>{V(),j()})})}function M(e){e.style.touchAction="none";const n=e.parentElement;let a=n.clientWidth||n.offsetWidth;a<10&&(a=300);const i=window.devicePixelRatio||1;e.width=a*i,e.height=a*i;const l=e.getContext("2d");return l.setTransform(i,0,0,i,0,0),{ctx:l,size:a,wrap:n}}function V(){const e=document.getElementById("m1p1-additive-canvas");if(!e)return;t.additiveCanvas=e;const{ctx:n,size:a,wrap:i}=M(e);t.additiveCtx=n,S(a);const l=r=>{const s=g(e,r),c=i.clientWidth,m=c*.28;for(let p=t.addCircles.length-1;p>=0;p--){const h=t.addCircles[p].x*c,v=t.addCircles[p].y*c;if(Math.hypot(s.x-h,s.y-v)<m){t.draggingAddIdx=p,e.setPointerCapture(r.pointerId);break}}},d=r=>{if(t.draggingAddIdx<0)return;const s=g(e,r),c=i.clientWidth;t.addCircles[t.draggingAddIdx].x=f(s.x/c,.1,.9),t.addCircles[t.draggingAddIdx].y=f(s.y/c,.1,.9),S(c)},o=()=>{t.draggingAddIdx=-1};e.addEventListener("pointerdown",l),e.addEventListener("pointermove",d),e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o),t.pointerHandlers.push({el:e,event:"pointerdown",handler:l},{el:e,event:"pointermove",handler:d},{el:e,event:"pointerup",handler:o},{el:e,event:"pointercancel",handler:o})}function S(e){const n=t.additiveCtx;if(!n)return;n.clearRect(0,0,e,e),n.fillStyle="#111",n.fillRect(0,0,e,e);const a=[[255,0,0],[0,255,0],[0,0,255]],i=e*.28;n.globalCompositeOperation="screen";for(let o=0;o<3;o++){const r=t.addCircles[o].x*e,s=t.addCircles[o].y*e,[c,m,p]=a[o],h=n.createRadialGradient(r,s,0,r,s,i);h.addColorStop(0,`rgba(${c},${m},${p},1)`),h.addColorStop(.7,`rgba(${c},${m},${p},0.85)`),h.addColorStop(1,`rgba(${c},${m},${p},0)`),n.beginPath(),n.arc(r,s,i,0,Math.PI*2),n.fillStyle=h,n.fill()}n.globalCompositeOperation="source-over";const l=["R","G","B"],d=["#ff6666","#66ff66","#6666ff"];n.font=`bold ${Math.round(e*.045)}px Inter, sans-serif`,n.textAlign="center",n.textBaseline="middle";for(let o=0;o<3;o++){const r=t.addCircles[o].x*e,s=t.addCircles[o].y*e;n.fillStyle=d[o],n.fillText(l[o],r,s-i*.7)}}function j(){const e=document.getElementById("m1p1-subtractive-canvas");if(!e)return;t.subtractiveCanvas=e;const{ctx:n,size:a,wrap:i}=M(e);t.subtractiveCtx=n,I(a);const l=r=>{const s=g(e,r),c=i.clientWidth,m=c*.28;for(let p=t.subCircles.length-1;p>=0;p--){const h=t.subCircles[p].x*c,v=t.subCircles[p].y*c;if(Math.hypot(s.x-h,s.y-v)<m){t.draggingSubIdx=p,e.setPointerCapture(r.pointerId);break}}},d=r=>{if(t.draggingSubIdx<0)return;const s=g(e,r),c=i.clientWidth;t.subCircles[t.draggingSubIdx].x=f(s.x/c,.1,.9),t.subCircles[t.draggingSubIdx].y=f(s.y/c,.1,.9),I(c)},o=()=>{t.draggingSubIdx=-1};e.addEventListener("pointerdown",l),e.addEventListener("pointermove",d),e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o),t.pointerHandlers.push({el:e,event:"pointerdown",handler:l},{el:e,event:"pointermove",handler:d},{el:e,event:"pointerup",handler:o},{el:e,event:"pointercancel",handler:o})}function I(e){const n=t.subtractiveCtx;if(!n)return;n.clearRect(0,0,e,e),n.fillStyle="#f5f5f7",n.fillRect(0,0,e,e);const a=[[0,255,255],[255,0,255],[255,255,0]],i=e*.28;n.globalCompositeOperation="multiply";for(let o=0;o<3;o++){const r=t.subCircles[o].x*e,s=t.subCircles[o].y*e,[c,m,p]=a[o],h=n.createRadialGradient(r,s,0,r,s,i);h.addColorStop(0,`rgba(${c},${m},${p},1)`),h.addColorStop(.75,`rgba(${c},${m},${p},0.9)`),h.addColorStop(1,`rgba(${c},${m},${p},0.1)`),n.beginPath(),n.arc(r,s,i,0,Math.PI*2),n.fillStyle=h,n.fill()}n.globalCompositeOperation="source-over";const l=["C","M","Y"],d=["#008b8b","#8b008b","#8b8b00"];n.font=`bold ${Math.round(e*.045)}px Inter, sans-serif`,n.textAlign="center",n.textBaseline="middle";for(let o=0;o<3;o++){const r=t.subCircles[o].x*e,s=t.subCircles[o].y*e;n.fillStyle=d[o],n.fillText(l[o],r,s-i*.7)}}function g(e,n){const a=e.getBoundingClientRect();return{x:(n.clientX-a.left)/a.width*(e.width/(window.devicePixelRatio||1)),y:(n.clientY-a.top)/a.height*(e.height/(window.devicePixelRatio||1))}}function f(e,n,a){return Math.max(n,Math.min(a,e))}export{te as destroy,ee as init,Z as render};
