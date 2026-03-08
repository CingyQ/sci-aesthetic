// p01-color-theory.js — 色彩理论基础（Color Theory Fundamentals）
// 全屏叙事流：Hero → 交互色轮 → HSL 三维度 → 加色/减色混色 → Footer CTA

import { fadeIn, scaleReveal, killAll, gsap, ScrollTrigger } from '../../components/ScrollAnimations.js';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToCmyk } from '../../utils/color-math.js';
import { createCopyButton } from '../../components/CopyButton.js';
import { navigateTo } from '../../utils/router.js';

// 页面状态
let state = {
  h: 210, s: 80, l: 50,
  // Canvas 相关
  wheelCanvas: null,
  wheelCtx: null,
  wheelOffscreen: null,
  wheelOffscreenCtx: null,
  wheelSize: 0,
  wheelRadius: 0,
  wheelCenterX: 0,
  wheelCenterY: 0,
  isDraggingWheel: false,
  // 加色/减色混色 Canvas
  additiveCanvas: null,
  additiveCtx: null,
  subtractiveCanvas: null,
  subtractiveCtx: null,
  // 加色圆圈位置（归一化 0-1）
  addCircles: [
    { x: 0.35, y: 0.3 },  // R
    { x: 0.65, y: 0.3 },  // G
    { x: 0.5, y: 0.65 },  // B
  ],
  subCircles: [
    { x: 0.35, y: 0.3 },  // C
    { x: 0.65, y: 0.3 },  // M
    { x: 0.5, y: 0.65 },  // Y
  ],
  draggingAddIdx: -1,
  draggingSubIdx: -1,
  // 动画帧
  rafId: null,
  // 清理函数
  copyButtons: [],
  pointerHandlers: [],
};

// ============================================================
// render()
// ============================================================
export function render() {
  return `
<div class="page-scroll">

  <!-- ====== Section 1: Hero ====== -->
  <section class="section-dark m1p1-hero" style="align-items:center;">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;">
      <p class="m1p1-hero-eyebrow" style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.15em;text-transform:uppercase;opacity:0;">Module 01 / Page 01</p>
      <h1 class="page-hero-title m1p1-hero-title" style="color:var(--text-on-dark);opacity:0;">色彩理论基础</h1>
      <p class="page-hero-sub m1p1-hero-sub" style="opacity:0;">Color Theory Fundamentals</p>
      <p class="m1p1-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">理解光与色彩的物理与感知基础，为科研配色建立系统认知</p>
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
  <section class="section-dark m1p1-footer-cta" style="min-height:50vh;">
    <div class="content-wrapper flex-col-center" style="text-align:center;gap:var(--space-md);">
      <p style="font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;">色彩理论是科研可视化的基石。掌握 HSL 模型与混色原理后，你就拥有了精准控制配色的能力。</p>
      <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;justify-content:center;margin-top:var(--space-sm);">
        <a class="btn-primary m1p1-nav-link" data-route="m1-p2">下一篇：色彩和谐与科研配色 →</a>
      </div>
      <div style="margin-top:var(--space-lg);display:flex;gap:var(--space-md);flex-wrap:wrap;justify-content:center;">
        <a class="btn-ghost btn-small m1p1-nav-link" data-route="m1-p3">调色板生成器</a>
        <a class="btn-ghost btn-small m1p1-nav-link" data-route="m1-p4">色彩无障碍</a>
        <a class="btn-ghost btn-small m1p1-nav-link" data-route="m1-p5">图表类型选择</a>
      </div>
    </div>
  </section>

</div>

<style>
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
`;
}


// ============================================================
// init()
// ============================================================
export function init() {
  // Hero 动画
  initHeroAnimations();
  // 色轮
  initColorWheel();
  // HSL 滑块
  initSliders();
  // 色值复制按钮
  initCopyButtons();
  // HSL 维度可视化
  updateHslDimensions();
  // 混色 Canvas
  initMixingCanvases();
  // 导航链接
  initNavLinks();
  // 滚动动画
  initScrollAnimations();
  // 首次更新
  updateColorFromHSL();
}


// ============================================================
// destroy()
// ============================================================
export function destroy() {
  // 取消动画帧
  if (state.rafId) {
    cancelAnimationFrame(state.rafId);
    state.rafId = null;
  }
  // 移除 pointer 事件
  state.pointerHandlers.forEach(({ el, event, handler }) => {
    el.removeEventListener(event, handler);
  });
  state.pointerHandlers = [];
  // 销毁复制按钮
  state.copyButtons.forEach(cb => cb.destroy());
  state.copyButtons = [];
  // 销毁 ScrollTrigger
  killAll();
  // 清空引用
  state.wheelCanvas = null;
  state.wheelCtx = null;
  state.wheelOffscreen = null;
  state.wheelOffscreenCtx = null;
  state.additiveCanvas = null;
  state.additiveCtx = null;
  state.subtractiveCanvas = null;
  state.subtractiveCtx = null;
}


// ============================================================
// Hero 动画
// ============================================================
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.m1p1-hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  tl.fromTo('.m1p1-hero-title', { y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  tl.fromTo('.m1p1-hero-sub', { y: 20 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  tl.fromTo('.m1p1-hero-tagline', { y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
}


// ============================================================
// 滚动动画
// ============================================================
function initScrollAnimations() {
  // 色轮区域
  scaleReveal('.m1p1-wheel-layout');
  // HSL 维度
  fadeIn('.m1p1-dim-block', { stagger: 0.2, y: 40 });
  // 混色区域
  fadeIn('.m1p1-mixing-panel', { stagger: 0.2, y: 50 });
  // Footer
  fadeIn('.m1p1-footer-cta .content-wrapper', { y: 30 });
}


// ============================================================
// 导航链接
// ============================================================
function initNavLinks() {
  document.querySelectorAll('.m1p1-nav-link').forEach(link => {
    const handler = (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      if (route) navigateTo(route);
    };
    link.addEventListener('click', handler);
    state.pointerHandlers.push({ el: link, event: 'click', handler });
  });
}


// ============================================================
// 色轮 Canvas
// ============================================================
function initColorWheel() {
  const canvas = document.getElementById('m1p1-wheel-canvas');
  if (!canvas) return;

  state.wheelCanvas = canvas;
  canvas.style.touchAction = 'none';

  const container = canvas.parentElement;
  const size = container.clientWidth;
  const dpr = window.devicePixelRatio || 1;

  state.wheelSize = size;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  state.wheelCtx = canvas.getContext('2d');
  state.wheelCtx.scale(dpr, dpr);

  state.wheelRadius = size / 2 - 4;
  state.wheelCenterX = size / 2;
  state.wheelCenterY = size / 2;

  // 离屏 Canvas（预渲染色轮，明度变化时重绘）
  state.wheelOffscreen = document.createElement('canvas');
  state.wheelOffscreen.width = size * dpr;
  state.wheelOffscreen.height = size * dpr;
  state.wheelOffscreenCtx = state.wheelOffscreen.getContext('2d');
  state.wheelOffscreenCtx.scale(dpr, dpr);

  renderWheelOffscreen();
  drawWheel();

  // Pointer 事件
  const onPointerDown = (e) => {
    const pos = getCanvasPos(canvas, e);
    const dx = pos.x - state.wheelCenterX;
    const dy = pos.y - state.wheelCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist <= state.wheelRadius) {
      state.isDraggingWheel = true;
      canvas.setPointerCapture(e.pointerId);
      pickColorFromWheel(pos.x, pos.y);
    }
  };
  const onPointerMove = (e) => {
    if (!state.isDraggingWheel) return;
    const pos = getCanvasPos(canvas, e);
    pickColorFromWheel(pos.x, pos.y);
  };
  const onPointerUp = () => {
    state.isDraggingWheel = false;
  };

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  state.pointerHandlers.push(
    { el: canvas, event: 'pointerdown', handler: onPointerDown },
    { el: canvas, event: 'pointermove', handler: onPointerMove },
    { el: canvas, event: 'pointerup', handler: onPointerUp },
    { el: canvas, event: 'pointercancel', handler: onPointerUp },
  );
}

function renderWheelOffscreen() {
  const ctx = state.wheelOffscreenCtx;
  const size = state.wheelSize;
  const cx = state.wheelCenterX;
  const cy = state.wheelCenterY;
  const radius = state.wheelRadius;
  const l = state.l;

  ctx.clearRect(0, 0, size, size);

  // 绘制色轮：按角度和半径绘制小扇形
  const angleStep = 2; // 度
  const radiusStep = 2; // px

  for (let angle = 0; angle < 360; angle += angleStep) {
    for (let r = 0; r < radius; r += radiusStep) {
      const hue = angle;
      const sat = (r / radius) * 100;
      const a1 = (angle - 1) * Math.PI / 180;
      const a2 = (angle + angleStep + 1) * Math.PI / 180;

      ctx.beginPath();
      ctx.arc(cx, cy, r + radiusStep, a1, a2);
      ctx.arc(cx, cy, Math.max(0, r), a2, a1, true);
      ctx.closePath();
      ctx.fillStyle = `hsl(${hue}, ${sat}%, ${l}%)`;
      ctx.fill();
    }
  }

  // 圆形裁剪遮罩（清除边缘锯齿）
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
}

function drawWheel() {
  const ctx = state.wheelCtx;
  const size = state.wheelSize;
  const cx = state.wheelCenterX;
  const cy = state.wheelCenterY;

  ctx.clearRect(0, 0, size, size);

  // 绘制离屏色轮
  const dpr = window.devicePixelRatio || 1;
  ctx.drawImage(state.wheelOffscreen, 0, 0, size * dpr, size * dpr, 0, 0, size, size);

  // 绘制选中指示器
  const angleRad = state.h * Math.PI / 180;
  const dist = (state.s / 100) * state.wheelRadius;
  const sx = cx + dist * Math.cos(angleRad);
  const sy = cy + dist * Math.sin(angleRad);

  // 外圈白色
  ctx.beginPath();
  ctx.arc(sx, sy, 10, 0, Math.PI * 2);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  // 内圈黑色（对比）
  ctx.beginPath();
  ctx.arc(sx, sy, 8, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function pickColorFromWheel(x, y) {
  const dx = x - state.wheelCenterX;
  const dy = y - state.wheelCenterY;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > state.wheelRadius) dist = state.wheelRadius;

  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle < 0) angle += 360;

  state.h = Math.round(angle);
  state.s = Math.round((dist / state.wheelRadius) * 100);

  updateColorFromHSL();
}


// ============================================================
// HSL 滑块
// ============================================================
function initSliders() {
  const hSlider = document.getElementById('m1p1-h-slider');
  const sSlider = document.getElementById('m1p1-s-slider');
  const lSlider = document.getElementById('m1p1-l-slider');

  if (!hSlider || !sSlider || !lSlider) return;

  const onHChange = () => {
    state.h = parseInt(hSlider.value);
    updateColorFromHSL();
  };
  const onSChange = () => {
    state.s = parseInt(sSlider.value);
    updateColorFromHSL();
  };
  const onLChange = () => {
    state.l = parseInt(lSlider.value);
    // 明度变化时需重绘离屏色轮
    renderWheelOffscreen();
    updateColorFromHSL();
  };

  hSlider.addEventListener('input', onHChange);
  sSlider.addEventListener('input', onSChange);
  lSlider.addEventListener('input', onLChange);

  state.pointerHandlers.push(
    { el: hSlider, event: 'input', handler: onHChange },
    { el: sSlider, event: 'input', handler: onSChange },
    { el: lSlider, event: 'input', handler: onLChange },
  );
}


// ============================================================
// 复制按钮
// ============================================================
function initCopyButtons() {
  const formats = ['hex', 'rgb', 'hsl', 'cmyk'];
  formats.forEach(fmt => {
    const container = document.querySelector(`.m1p1-value-copy[data-copy="${fmt}"]`);
    if (!container) return;
    const cb = createCopyButton(container, {
      getText: () => {
        const el = document.getElementById(`m1p1-val-${fmt}`);
        return el ? el.textContent : '';
      },
      label: '复制',
      className: 'btn-small',
    });
    state.copyButtons.push(cb);
  });
}


// ============================================================
// 颜色更新管线
// ============================================================
function updateColorFromHSL() {
  const { h, s, l } = state;
  const rgb = hslToRgb(h, s, l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  // 色块
  const swatch = document.getElementById('m1p1-swatch');
  if (swatch) swatch.style.backgroundColor = hex;

  // HEX 大字
  const hexDisplay = document.getElementById('m1p1-hex-display');
  if (hexDisplay) hexDisplay.textContent = hex.toUpperCase();

  // 色值
  const valHex = document.getElementById('m1p1-val-hex');
  const valRgb = document.getElementById('m1p1-val-rgb');
  const valHsl = document.getElementById('m1p1-val-hsl');
  const valCmyk = document.getElementById('m1p1-val-cmyk');
  if (valHex) valHex.textContent = hex.toUpperCase();
  if (valRgb) valRgb.textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  if (valHsl) valHsl.textContent = `hsl(${h}, ${s}%, ${l}%)`;
  if (valCmyk) valCmyk.textContent = `cmyk(${cmyk.c}, ${cmyk.m}, ${cmyk.y}, ${cmyk.k})`;

  // 同步滑块
  const hSlider = document.getElementById('m1p1-h-slider');
  const sSlider = document.getElementById('m1p1-s-slider');
  const lSlider = document.getElementById('m1p1-l-slider');
  if (hSlider) hSlider.value = h;
  if (sSlider) sSlider.value = s;
  if (lSlider) lSlider.value = l;

  // 滑块值标签
  const hVal = document.getElementById('m1p1-h-value');
  const sVal = document.getElementById('m1p1-s-value');
  const lVal = document.getElementById('m1p1-l-value');
  if (hVal) hVal.textContent = `${h}°`;
  if (sVal) sVal.textContent = `${s}%`;
  if (lVal) lVal.textContent = `${l}%`;

  // 滑块轨道颜色
  updateSliderGradients();

  // 更新色轮指示器
  drawWheel();

  // 更新 HSL 维度可视化
  updateHslDimensions();
}

function updateSliderGradients() {
  const { h, s, l } = state;
  const satSlider = document.getElementById('m1p1-s-slider');
  const lightSlider = document.getElementById('m1p1-l-slider');
  if (satSlider) {
    satSlider.style.background = `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`;
  }
  if (lightSlider) {
    lightSlider.style.background = `linear-gradient(to right, hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 50%), hsl(${h}, ${s}%, 100%))`;
  }
}


// ============================================================
// HSL 维度可视化
// ============================================================
function updateHslDimensions() {
  const { h, s, l } = state;

  // 指示器位置
  const hueInd = document.getElementById('m1p1-hue-indicator');
  const satInd = document.getElementById('m1p1-sat-indicator');
  const lightInd = document.getElementById('m1p1-light-indicator');

  if (hueInd) hueInd.style.left = `${(h / 360) * 100}%`;
  if (satInd) satInd.style.left = `${s}%`;
  if (lightInd) lightInd.style.left = `${l}%`;

  // 饱和度渐变（与当前色相/明度相关）
  const satBar = document.getElementById('m1p1-gradient-sat');
  if (satBar) {
    satBar.style.background = `linear-gradient(to right, hsl(${h}, 0%, ${l}%), hsl(${h}, 100%, ${l}%))`;
  }

  // 明度渐变
  const lightBar = document.getElementById('m1p1-gradient-light');
  if (lightBar) {
    lightBar.style.background = `linear-gradient(to right, hsl(${h}, ${s}%, 0%), hsl(${h}, ${s}%, 50%), hsl(${h}, ${s}%, 100%))`;
  }

  // 值标签
  const dimH = document.getElementById('m1p1-dim-h-val');
  const dimS = document.getElementById('m1p1-dim-s-val');
  const dimL = document.getElementById('m1p1-dim-l-val');
  if (dimH) dimH.textContent = `${h}°`;
  if (dimS) dimS.textContent = `${s}%`;
  if (dimL) dimL.textContent = `${l}%`;
}


// ============================================================
// 混色 Canvas
// ============================================================
function initMixingCanvases() {
  // 延迟初始化，等待 flex 布局完成后获取正确尺寸
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      initAdditiveCanvas();
      initSubtractiveCanvas();
    });
  });
}

function setupMixingCanvas(canvas) {
  canvas.style.touchAction = 'none';
  const wrap = canvas.parentElement;
  let size = wrap.clientWidth || wrap.offsetWidth;
  if (size < 10) size = 300; // fallback
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, size, wrap };
}

function initAdditiveCanvas() {
  const canvas = document.getElementById('m1p1-additive-canvas');
  if (!canvas) return;

  state.additiveCanvas = canvas;
  const { ctx, size, wrap } = setupMixingCanvas(canvas);
  state.additiveCtx = ctx;

  drawAdditive(size);

  const onDown = (e) => {
    const pos = getCanvasPos(canvas, e);
    const s = wrap.clientWidth;
    const circleRadius = s * 0.28;
    // 检查哪个圆被点击
    for (let i = state.addCircles.length - 1; i >= 0; i--) {
      const cx = state.addCircles[i].x * s;
      const cy = state.addCircles[i].y * s;
      if (Math.hypot(pos.x - cx, pos.y - cy) < circleRadius) {
        state.draggingAddIdx = i;
        canvas.setPointerCapture(e.pointerId);
        break;
      }
    }
  };
  const onMove = (e) => {
    if (state.draggingAddIdx < 0) return;
    const pos = getCanvasPos(canvas, e);
    const s = wrap.clientWidth;
    state.addCircles[state.draggingAddIdx].x = clamp(pos.x / s, 0.1, 0.9);
    state.addCircles[state.draggingAddIdx].y = clamp(pos.y / s, 0.1, 0.9);
    drawAdditive(s);
  };
  const onUp = () => { state.draggingAddIdx = -1; };

  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  state.pointerHandlers.push(
    { el: canvas, event: 'pointerdown', handler: onDown },
    { el: canvas, event: 'pointermove', handler: onMove },
    { el: canvas, event: 'pointerup', handler: onUp },
    { el: canvas, event: 'pointercancel', handler: onUp },
  );
}

function drawAdditive(size) {
  const ctx = state.additiveCtx;
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);
  // 黑色背景
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, size, size);

  const colors = [
    [255, 0, 0],   // R
    [0, 255, 0],   // G
    [0, 0, 255],   // B
  ];
  const radius = size * 0.28;

  // 使用 screen 混合（加色模式）：用多次叠加模拟
  ctx.globalCompositeOperation = 'screen';
  for (let i = 0; i < 3; i++) {
    const cx = state.addCircles[i].x * size;
    const cy = state.addCircles[i].y * size;
    const [r, g, b] = colors[i];

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.7, `rgba(${r},${g},${b},0.85)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // 圆圈标签
  const labels = ['R', 'G', 'B'];
  const labelColors = ['#ff6666', '#66ff66', '#6666ff'];
  ctx.font = `bold ${Math.round(size * 0.045)}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < 3; i++) {
    const cx = state.addCircles[i].x * size;
    const cy = state.addCircles[i].y * size;
    ctx.fillStyle = labelColors[i];
    ctx.fillText(labels[i], cx, cy - radius * 0.7);
  }
}

function initSubtractiveCanvas() {
  const canvas = document.getElementById('m1p1-subtractive-canvas');
  if (!canvas) return;

  state.subtractiveCanvas = canvas;
  const { ctx, size, wrap } = setupMixingCanvas(canvas);
  state.subtractiveCtx = ctx;

  drawSubtractive(size);

  const onDown = (e) => {
    const pos = getCanvasPos(canvas, e);
    const s = wrap.clientWidth;
    const circleRadius = s * 0.28;
    for (let i = state.subCircles.length - 1; i >= 0; i--) {
      const cx = state.subCircles[i].x * s;
      const cy = state.subCircles[i].y * s;
      if (Math.hypot(pos.x - cx, pos.y - cy) < circleRadius) {
        state.draggingSubIdx = i;
        canvas.setPointerCapture(e.pointerId);
        break;
      }
    }
  };
  const onMove = (e) => {
    if (state.draggingSubIdx < 0) return;
    const pos = getCanvasPos(canvas, e);
    const s = wrap.clientWidth;
    state.subCircles[state.draggingSubIdx].x = clamp(pos.x / s, 0.1, 0.9);
    state.subCircles[state.draggingSubIdx].y = clamp(pos.y / s, 0.1, 0.9);
    drawSubtractive(s);
  };
  const onUp = () => { state.draggingSubIdx = -1; };

  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  state.pointerHandlers.push(
    { el: canvas, event: 'pointerdown', handler: onDown },
    { el: canvas, event: 'pointermove', handler: onMove },
    { el: canvas, event: 'pointerup', handler: onUp },
    { el: canvas, event: 'pointercancel', handler: onUp },
  );
}

function drawSubtractive(size) {
  const ctx = state.subtractiveCtx;
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);
  // 白色背景
  ctx.fillStyle = '#f5f5f7';
  ctx.fillRect(0, 0, size, size);

  const colors = [
    [0, 255, 255],   // C
    [255, 0, 255],   // M
    [255, 255, 0],   // Y
  ];
  const radius = size * 0.28;

  // 使用 multiply 混合（减色模式）
  ctx.globalCompositeOperation = 'multiply';
  for (let i = 0; i < 3; i++) {
    const cx = state.subCircles[i].x * size;
    const cy = state.subCircles[i].y * size;
    const [r, g, b] = colors[i];

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
    grad.addColorStop(0.75, `rgba(${r},${g},${b},0.9)`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0.1)`);

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // 圆圈标签
  const labels = ['C', 'M', 'Y'];
  const labelColors = ['#008b8b', '#8b008b', '#8b8b00'];
  ctx.font = `bold ${Math.round(size * 0.045)}px Inter, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < 3; i++) {
    const cx = state.subCircles[i].x * size;
    const cy = state.subCircles[i].y * size;
    ctx.fillStyle = labelColors[i];
    ctx.fillText(labels[i], cx, cy - radius * 0.7);
  }
}


// ============================================================
// 工具函数
// ============================================================
function getCanvasPos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  // 返回 CSS 像素坐标（与绘图坐标一致，因为 ctx 已 scale(dpr)）
  return {
    x: (e.clientX - rect.left) / rect.width * (canvas.width / (window.devicePixelRatio || 1)),
    y: (e.clientY - rect.top) / rect.height * (canvas.height / (window.devicePixelRatio || 1)),
  };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
