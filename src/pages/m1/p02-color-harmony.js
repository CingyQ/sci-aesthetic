// p02-color-harmony.js — 色彩和谐与科研配色
// 色彩和谐理论 + 配色方案浏览器
import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createChartPreview, d3 } from '../../components/ChartPreview.js';
import { createTabSwitcher } from '../../components/TabSwitcher.js';
import { createCopyButton } from '../../components/CopyButton.js';
import { deltaE, hexToRgb, rgbToHex, hslToRgb, getHarmonyHues } from '../../utils/color-math.js';
import { navigateTo } from '../../utils/router.js';

// ═══════════════════════════════════════════════════
// 配色数据
// ═══════════════════════════════════════════════════

const PALETTE_DATA = {
  nature: [
    { name: 'Nature Reviews (NPG)', colors: ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2', '#DC0000'] },
    { name: 'Nature Methods', colors: ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2', '#7E6148'] },
    { name: 'Nature Cell Biology', colors: ['#631879', '#3C5488', '#0072B5', '#00A087', '#4DBBD5', '#E64B35', '#F39B7F', '#8491B4'] },
  ],
  science: [
    { name: 'Science (AAAS)', colors: ['#3B4992', '#EE0000', '#008B45', '#631879', '#008280', '#BB0021', '#5F559B', '#A20056'] },
    { name: 'JAMA', colors: ['#374E55', '#DF8F44', '#00A1D5', '#B24745', '#79AF97', '#6A6599', '#80796B', '#000000'] },
    { name: 'NEJM', colors: ['#BC3C29', '#0072B5', '#E18727', '#20854E', '#7876B1', '#6F99AD', '#FFDC91', '#EE4C97'] },
  ],
  ggsci: [
    { name: 'ggsci npg', colors: ['#E64B35', '#4DBBD5', '#00A087', '#3C5488', '#F39B7F', '#8491B4', '#91D1C2', '#DC0000'] },
    { name: 'ggsci Lancet', colors: ['#00468B', '#ED0000', '#42B540', '#0099B4', '#925E9F', '#FDAF91', '#AD002A', '#ADB6B6'] },
    { name: 'ggsci JAMA', colors: ['#374E55', '#DF8F44', '#00A1D5', '#B24745', '#79AF97', '#6A6599', '#80796B', '#000000'] },
    { name: 'ggsci D3', colors: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B', '#E377C2', '#7F7F7F'] },
  ],
  colorbrewer: [
    { name: 'ColorBrewer Set1', colors: ['#E41A1C', '#377EB8', '#4DAF4A', '#984EA3', '#FF7F00', '#FFFF33', '#A65628', '#F781BF'] },
    { name: 'ColorBrewer Set2', colors: ['#66C2A5', '#FC8D62', '#8DA0CB', '#E78AC3', '#A6D854', '#FFD92F', '#E5C494', '#B3B3B3'] },
    { name: 'ColorBrewer Dark2', colors: ['#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E', '#E6AB02', '#A6761D', '#666666'] },
  ],
  colorblind: [
    { name: 'Wong (色盲安全)', colors: ['#000000', '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'] },
    { name: 'Tol (色盲安全)', colors: ['#332288', '#117733', '#44AA99', '#88CCEE', '#DDCC77', '#CC6677', '#AA4499', '#882255'] },
    { name: 'Okabe-Ito', colors: ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7', '#000000'] },
  ],
};

const CATEGORY_TABS = [
  { id: 'nature', label: 'Nature' },
  { id: 'science', label: 'Science' },
  { id: 'ggsci', label: 'ggsci' },
  { id: 'colorbrewer', label: 'ColorBrewer' },
  { id: 'colorblind', label: '色盲安全' },
];

const HARMONY_TABS = [
  { id: 'complementary', label: '互补' },
  { id: 'analogous', label: '类似' },
  { id: 'triadic', label: '三角' },
  { id: 'split-complementary', label: '分裂互补' },
  { id: 'square', label: '方形' },
];

const HARMONY_DESCRIPTIONS = {
  complementary: '色轮上相隔 180° 的两种颜色，产生最大对比。适合强调数据差异，如对照组 vs 实验组。',
  analogous: '色轮上相邻的 3 种颜色（±30°），自然和谐。适合表示同类数据的渐变或分组。',
  triadic: '色轮上均匀分布的 3 种颜色（间隔 120°），活力十足。适合展示 3 个独立类别。',
  'split-complementary': '一种颜色和其互补色两侧各 30° 的颜色，比互补更柔和。保留对比同时避免冲突。',
  square: '色轮上均匀分布的 4 种颜色（间隔 90°），丰富且均衡。适合 4 组数据的可视化。',
};

// 60-30-10 预设配色
const PRESET_603010 = [
  { primary: '#f5f5f7', secondary: '#3C5488', accent: '#E64B35' },
  { primary: '#0a1628', secondary: '#4DBBD5', accent: '#F39B7F' },
  { primary: '#f0faf6', secondary: '#00A087', accent: '#DC0000' },
  { primary: '#2d1b4e', secondary: '#B8B8E8', accent: '#E69F00' },
];

// ═══════════════════════════════════════════════════
// 页面状态
// ═══════════════════════════════════════════════════

let state = {
  // Section 2 - Harmony
  harmonyType: 'complementary',
  baseHue: 0,
  harmonyCanvas: null,
  harmonyCtx: null,
  harmonyAnimFrame: null,
  harmonyTabSwitcher: null,
  harmonyChartPreview: null,

  // Section 3 - 60-30-10
  proportions: [60, 30, 10],
  rule603010Colors: { primary: '#f5f5f7', secondary: '#3C5488', accent: '#E64B35' },
  presetIndex: 0,
  isDraggingDivider: false,
  activeDivider: -1,

  // Section 4 - DeltaE
  deltaColor1: '#E64B35',
  deltaColor2: '#4DBBD5',

  // Section 5 - Palette Browser
  paletteCategory: 'nature',
  paletteTabSwitcher: null,
  paletteBrowserChart: null,
  activePaletteColors: null,
  chartType: 'bar',
  copyButtons: [],

  // 清理列表
  cleanupFns: [],
  resizeObservers: [],
};

// ═══════════════════════════════════════════════════
// Render
// ═══════════════════════════════════════════════════

export function render() {
  return `
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
      <section class="section-dark section-auto" style="align-items:center;min-height:50vh;">
        <div class="content-wrapper" style="text-align:center;">
          <p style="color:var(--text-on-dark-3);font-size:var(--text-small);font-weight:500;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:var(--space-sm);">02 / 10</p>
          <h2 style="font-family:var(--font-display);font-size:var(--text-title);color:var(--text-on-dark);font-weight:700;margin-bottom:var(--space-md);">
            从理论到实践，配色方案即刻可用
          </h2>
          <p style="color:var(--text-on-dark-2);font-size:var(--text-body);max-width:480px;margin:0 auto var(--space-xl);line-height:1.7;">
            掌握了色彩和谐原理，下一步学习如何用算法生成完美配色。
          </p>
          <div style="display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;">
            <button class="btn-ghost" id="m1p2-prev-btn" style="color:var(--text-on-dark-2);border-color:var(--border-dark);">← 色彩理论基础</button>
            <button class="btn-primary" id="m1p2-next-btn">配色生成器 →</button>
          </div>
        </div>
      </section>

    </div>
  `;
}

// ═══════════════════════════════════════════════════
// Init
// ═══════════════════════════════════════════════════

export function init() {
  // Hero 入场动画
  const tl = gsap.timeline({ delay: 0.2 });
  tl.to('.m1p2-eyebrow',      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  tl.fromTo('.m1p2-hero-title',  { y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  tl.fromTo('.m1p2-hero-sub',    { y: 20 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  tl.fromTo('.m1p2-hero-tagline',{ y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  tl.fromTo('.m1p2-hero-nav',    { y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);

  // 导航按钮
  const prevBtn = document.getElementById('m1p2-prev-btn');
  const nextBtn = document.getElementById('m1p2-next-btn');
  if (prevBtn) prevBtn.addEventListener('click', () => navigateTo('m1-p1'));
  if (nextBtn) nextBtn.addEventListener('click', () => navigateTo('m1-p3'));

  initHarmonySection();
  init603010Section();
  initDeltaESection();
  initPaletteBrowser();
  initScrollAnimations();
  initHeroQuickNav();
}

function initHeroQuickNav() {
  document.querySelectorAll('#m1p2-hero-nav .hero-quicknav__item').forEach(btn => {
    const handler = () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    btn.addEventListener('click', handler);
    state.cleanupFns.push(() => btn.removeEventListener('click', handler));
  });
}

// ═══════════════════════════════════════════════════
// Section 2: Harmony Types
// ═══════════════════════════════════════════════════

function initHarmonySection() {
  const canvas = document.getElementById('m1p2-harmony-wheel');
  if (!canvas) return;

  state.harmonyCanvas = canvas;
  state.harmonyCtx = canvas.getContext('2d');

  // HiDPI 支持
  const dpr = window.devicePixelRatio || 1;
  const size = 600;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  state.harmonyCtx.scale(dpr, dpr);

  // Tab 切换器
  const tabsContainer = document.getElementById('m1p2-harmony-tabs');
  if (tabsContainer) {
    state.harmonyTabSwitcher = createTabSwitcher(tabsContainer, {
      tabs: HARMONY_TABS,
      activeId: 'complementary',
      onChange: (id) => {
        state.harmonyType = id;
        updateHarmonyWheel();
      },
      variant: 'pill',
    });
  }

  // 色相滑块
  const hueSlider = document.getElementById('m1p2-hue-slider');
  const hueValue = document.getElementById('m1p2-hue-value');
  if (hueSlider) {
    const onHueChange = () => {
      state.baseHue = parseInt(hueSlider.value);
      if (hueValue) hueValue.textContent = state.baseHue + '\u00B0';
      updateHarmonyWheel();
    };
    hueSlider.addEventListener('input', onHueChange);
    state.cleanupFns.push(() => hueSlider.removeEventListener('input', onHueChange));
  }

  // 点击色轮设置基础色相
  const onCanvasPointer = (e) => {
    const r = canvas.getBoundingClientRect();
    const cx = r.width / 2;
    const cy = r.height / 2;
    const px = e.clientX - r.left - cx;
    const py = e.clientY - r.top - cy;
    const dist = Math.sqrt(px * px + py * py);
    const maxR = Math.min(cx, cy) * 0.85;
    const minR = maxR * 0.55;
    if (dist >= minR && dist <= maxR) {
      let angle = Math.atan2(py, px) * 180 / Math.PI + 90;
      if (angle < 0) angle += 360;
      state.baseHue = Math.round(angle) % 360;
      if (hueSlider) hueSlider.value = state.baseHue;
      if (hueValue) hueValue.textContent = state.baseHue + '\u00B0';
      updateHarmonyWheel();
    }
  };
  canvas.addEventListener('pointerdown', onCanvasPointer);
  state.cleanupFns.push(() => canvas.removeEventListener('pointerdown', onCanvasPointer));

  // 和谐方案小图表预览
  const chartContainer = document.getElementById('m1p2-harmony-chart');
  if (chartContainer) {
    state.harmonyChartPreview = createChartPreview(chartContainer, {
      width: 500,
      height: 280,
      margin: { top: 30, right: 30, bottom: 40, left: 40 },
      bgColor: '#ffffff',
    });
  }

  // 初始渲染
  updateHarmonyWheel();
}

function updateHarmonyWheel() {
  const ctx = state.harmonyCtx;
  const canvas = state.harmonyCanvas;
  if (!ctx || !canvas) return;

  const W = 600;
  const cx = W / 2;
  const cy = W / 2;
  const outerR = W * 0.42;
  const innerR = outerR * 0.55;

  // 清空
  ctx.clearRect(0, 0, W, W);

  // 绘制色轮环——逐度填充扇形
  for (let deg = 0; deg < 360; deg += 1) {
    const startAngle = (deg - 91) * Math.PI / 180;
    const endAngle = (deg - 89) * Math.PI / 180;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, endAngle);
    ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = `hsl(${deg}, 75%, 55%)`;
    ctx.fill();
  }

  // 内圆背景
  ctx.beginPath();
  ctx.arc(cx, cy, innerR - 2, 0, Math.PI * 2);
  ctx.fillStyle = '#fafafa';
  ctx.fill();

  // 获取和谐色相
  const hues = getHarmonyHues(state.baseHue, state.harmonyType);
  const midR = (outerR + innerR) / 2;

  // 连接线（虚线）
  if (hues.length > 1) {
    ctx.beginPath();
    hues.forEach((h, i) => {
      const angle = (h - 90) * Math.PI / 180;
      const px = cx + Math.cos(angle) * midR;
      const py = cy + Math.sin(angle) * midR;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.strokeStyle = 'rgba(29,29,31,0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // 和谐锚点
  const harmonyColors = [];
  hues.forEach((h) => {
    const angle = (h - 90) * Math.PI / 180;
    const px = cx + Math.cos(angle) * midR;
    const py = cy + Math.sin(angle) * midR;
    const rgb = hslToRgb(h, 75, 55);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    harmonyColors.push(hex);

    // 白色外圈
    ctx.beginPath();
    ctx.arc(px, py, 16, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 色彩填充
    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.fillStyle = hex;
    ctx.fill();
  });

  // 在色轮中心显示当前和谐类型名
  ctx.fillStyle = '#1d1d1f';
  ctx.font = '600 14px Inter, Noto Sans SC, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const typeLabel = HARMONY_TABS.find(t => t.id === state.harmonyType);
  if (typeLabel) {
    ctx.fillText(typeLabel.label, cx, cy - 8);
    ctx.fillStyle = '#86868b';
    ctx.font = '12px Inter, Noto Sans SC, sans-serif';
    ctx.fillText(hues.length + ' 色', cx, cy + 12);
  }

  // 更新色块展示
  updateHarmonySwatches(harmonyColors);

  // 更新描述
  const descEl = document.getElementById('m1p2-harmony-desc');
  if (descEl) descEl.textContent = HARMONY_DESCRIPTIONS[state.harmonyType] || '';

  // 更新小图表
  updateHarmonyChart(harmonyColors);
}

function updateHarmonySwatches(colors) {
  const container = document.getElementById('m1p2-harmony-swatches');
  if (!container) return;
  container.innerHTML = colors.map(c => `
    <div style="text-align:center;">
      <div style="width:56px;height:56px;border-radius:var(--radius-sm);background:${c};border:2px solid rgba(0,0,0,0.08);margin-bottom:4px;"></div>
      <span style="font-family:var(--font-code);font-size:11px;color:var(--text-on-light-2);">${c.toUpperCase()}</span>
    </div>
  `).join('');
}

function updateHarmonyChart(colors) {
  const chart = state.harmonyChartPreview;
  if (!chart) return;

  const g = chart.clear();
  const { innerWidth, innerHeight } = chart;

  // 简单柱状图
  const data = colors.map((c, i) => ({
    label: 'Var ' + (i + 1),
    value: 40 + Math.sin(i * 1.2 + 0.5) * 30 + 20,
    color: c,
  }));

  const x = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range([0, innerWidth])
    .padding(0.3);

  const y = d3.scaleLinear()
    .domain([0, 110])
    .range([innerHeight, 0]);

  g.append('g')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(d3.axisBottom(x).tickSize(0))
    .call(sel => sel.select('.domain').attr('stroke', '#e0e0e0'))
    .selectAll('text')
    .attr('fill', '#888')
    .attr('font-size', '11px');

  g.append('g')
    .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
    .call(sel => sel.select('.domain').remove())
    .call(sel => sel.selectAll('.tick line').attr('stroke', '#e0e0e0').attr('stroke-dasharray', '3,3'))
    .selectAll('text')
    .attr('fill', '#888')
    .attr('font-size', '11px');

  g.selectAll('.bar')
    .data(data)
    .join('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.label))
    .attr('width', x.bandwidth())
    .attr('rx', 4)
    .attr('fill', d => d.color)
    .attr('y', innerHeight)
    .attr('height', 0)
    .transition()
    .duration(500)
    .ease(d3.easeCubicOut)
    .attr('y', d => y(d.value))
    .attr('height', d => innerHeight - y(d.value));
}

// ═══════════════════════════════════════════════════
// Section 3: 60-30-10 Rule
// ═══════════════════════════════════════════════════

function init603010Section() {
  renderProportionBar();
  renderPresetButtons();
  renderRulePreview();

  // 拖拽比例分界线
  const bar = document.getElementById('m1p2-proportion-bar');
  if (!bar) return;

  const onPointerDown = (e) => {
    const rect = bar.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width * 100;
    const div1 = state.proportions[0];
    const div2 = state.proportions[0] + state.proportions[1];
    const d1 = Math.abs(xPct - div1);
    const d2 = Math.abs(xPct - div2);
    if (d1 < 8 || d2 < 8) {
      state.isDraggingDivider = true;
      state.activeDivider = d1 < d2 ? 0 : 1;
      e.preventDefault();
    }
  };

  const onPointerMove = (e) => {
    if (!state.isDraggingDivider) return;
    const rect = bar.getBoundingClientRect();
    const xPct = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100));

    if (state.activeDivider === 0) {
      const maxPos = state.proportions[0] + state.proportions[1] - 5;
      const pos = Math.max(10, Math.min(maxPos, xPct));
      const diff = pos - state.proportions[0];
      state.proportions[0] = Math.round(pos);
      state.proportions[1] = Math.round(Math.max(5, state.proportions[1] - diff));
      state.proportions[2] = 100 - state.proportions[0] - state.proportions[1];
    } else {
      const minPos = state.proportions[0] + 5;
      const pos = Math.max(minPos, Math.min(95, xPct));
      state.proportions[1] = Math.round(pos - state.proportions[0]);
      state.proportions[2] = Math.round(100 - state.proportions[0] - state.proportions[1]);
    }

    // 约束最小值
    if (state.proportions[2] < 3) {
      state.proportions[2] = 3;
      state.proportions[1] = 100 - state.proportions[0] - 3;
    }

    renderProportionBar();
    renderProportionLabels();
    renderRulePreview();
  };

  const onPointerUp = () => {
    state.isDraggingDivider = false;
    state.activeDivider = -1;
  };

  bar.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  state.cleanupFns.push(() => {
    bar.removeEventListener('pointerdown', onPointerDown);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
  });
}

function renderProportionBar() {
  const bar = document.getElementById('m1p2-proportion-bar');
  if (!bar) return;
  const [p1, p2, p3] = state.proportions;
  const { primary, secondary, accent } = state.rule603010Colors;

  bar.innerHTML = `
    <div style="position:absolute;inset:0;display:flex;">
      <div style="width:${p1}%;background:${primary};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:var(--text-small);font-weight:600;color:${isLightColor(primary) ? '#1d1d1f' : '#f5f5f7'};opacity:0.8;">${p1}%</span>
      </div>
      <div style="width:${p2}%;background:${secondary};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:var(--text-small);font-weight:600;color:${isLightColor(secondary) ? '#1d1d1f' : '#f5f5f7'};opacity:0.8;">${p2}%</span>
      </div>
      <div style="width:${p3}%;background:${accent};transition:width 0.1s;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:${p3 > 6 ? 'var(--text-small)' : '10px'};font-weight:600;color:${isLightColor(accent) ? '#1d1d1f' : '#f5f5f7'};opacity:0.8;">${p3 > 6 ? p3 + '%' : ''}</span>
      </div>
    </div>
    <div style="position:absolute;left:${p1}%;top:0;bottom:0;width:4px;transform:translateX(-50%);background:rgba(255,255,255,0.6);cursor:col-resize;z-index:2;"></div>
    <div style="position:absolute;left:${p1 + p2}%;top:0;bottom:0;width:4px;transform:translateX(-50%);background:rgba(255,255,255,0.6);cursor:col-resize;z-index:2;"></div>
  `;

  renderProportionLabels();
}

function renderProportionLabels() {
  const container = document.getElementById('m1p2-proportion-labels');
  if (!container) return;
  const { primary, secondary, accent } = state.rule603010Colors;
  const [p1, p2, p3] = state.proportions;

  container.innerHTML = [
    { label: '背景 / 底色', color: primary, pct: p1 },
    { label: '主数据色', color: secondary, pct: p2 },
    { label: '强调色', color: accent, pct: p3 },
  ].map(d => `
    <div style="display:flex;align-items:center;gap:var(--space-xs);">
      <div style="width:20px;height:20px;border-radius:4px;background:${d.color};border:1px solid rgba(255,255,255,0.15);"></div>
      <span style="font-size:var(--text-small);color:var(--text-on-dark-2);">${d.label} ${d.pct}%</span>
    </div>
  `).join('');
}

function renderPresetButtons() {
  const container = document.getElementById('m1p2-preset-btns');
  if (!container) return;

  container.innerHTML = PRESET_603010.map((p, i) => `
    <button class="m1p2-preset-btn ${i === state.presetIndex ? 'active' : ''}" data-idx="${i}" style="
      display:flex;gap:2px;padding:6px 10px;border-radius:var(--radius-full);
      border:1.5px solid ${i === state.presetIndex ? 'var(--accent)' : 'var(--border-dark)'};
      background:${i === state.presetIndex ? 'var(--accent-subtle)' : 'transparent'};
      cursor:pointer;min-height:36px;align-items:center;transition:all var(--t-fast);
    ">
      <span style="width:16px;height:16px;border-radius:50%;background:${p.primary};border:1px solid rgba(255,255,255,0.2);"></span>
      <span style="width:16px;height:16px;border-radius:50%;background:${p.secondary};"></span>
      <span style="width:16px;height:16px;border-radius:50%;background:${p.accent};"></span>
    </button>
  `).join('');

  container.querySelectorAll('.m1p2-preset-btn').forEach(btn => {
    const handler = () => {
      const idx = parseInt(btn.dataset.idx);
      state.presetIndex = idx;
      state.rule603010Colors = { ...PRESET_603010[idx] };
      state.proportions = [60, 30, 10];
      renderPresetButtons();
      renderProportionBar();
      renderRulePreview();
    };
    btn.addEventListener('click', handler);
    state.cleanupFns.push(() => btn.removeEventListener('click', handler));
  });
}

function renderRulePreview() {
  const container = document.getElementById('m1p2-rule-preview');
  if (!container) return;

  const { primary, secondary, accent } = state.rule603010Colors;
  const lightText = isLightColor(primary);
  const textColor = lightText ? '#1d1d1f' : '#f5f5f7';
  const subColor = lightText ? '#666' : '#aaa';

  container.innerHTML = `
    <div style="background:${primary};border-radius:var(--radius-sm);padding:var(--space-md);min-height:200px;position:relative;transition:background 0.3s;">
      <div style="font-size:var(--text-small);font-weight:600;color:${textColor};margin-bottom:var(--space-sm);">Figure 1. Sample Data Distribution</div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:120px;padding-top:var(--space-sm);">
        ${[65, 85, 45, 70, 90].map((h, i) => {
          const isAccent = i === 4;
          return `<div style="flex:1;height:${h}%;background:${isAccent ? accent : secondary};border-radius:4px 4px 0 0;opacity:${isAccent ? 1 : (0.6 + i * 0.1)};transition:all 0.3s;"></div>`;
        }).join('')}
      </div>
      <div style="display:flex;gap:8px;margin-top:4px;">
        ${['A', 'B', 'C', 'D', 'E*'].map(l => `<div style="flex:1;text-align:center;font-size:10px;color:${subColor};">${l}</div>`).join('')}
      </div>
      <div style="display:flex;gap:var(--space-sm);justify-content:center;margin-top:var(--space-sm);">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:10px;height:10px;border-radius:2px;background:${secondary};"></div>
          <span style="font-size:10px;color:${subColor};">Control</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:10px;height:10px;border-radius:2px;background:${accent};"></div>
          <span style="font-size:10px;color:${subColor};">Significant</span>
        </div>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════
// Section 4: DeltaE Calculator
// ═══════════════════════════════════════════════════

function initDeltaESection() {
  const input1 = document.getElementById('m1p2-de-input1');
  const input2 = document.getElementById('m1p2-de-input2');
  const swatch1 = document.getElementById('m1p2-de-swatch1');
  const swatch2 = document.getElementById('m1p2-de-swatch2');
  const picker1 = document.getElementById('m1p2-de-picker1');
  const picker2 = document.getElementById('m1p2-de-picker2');

  const setColors = (hex1, hex2) => {
    if (input1) input1.value = hex1;
    if (input2) input2.value = hex2;
    if (picker1) picker1.value = hex1;
    if (picker2) picker2.value = hex2;
    update();
  };

  const update = () => {
    const hex1 = normalizeHex(input1 ? input1.value : '#E64B35');
    const hex2 = normalizeHex(input2 ? input2.value : '#4DBBD5');
    if (!hex1 || !hex2) return;

    state.deltaColor1 = hex1;
    state.deltaColor2 = hex2;

    if (swatch1) swatch1.style.background = hex1;
    if (swatch2) swatch2.style.background = hex2;

    // 同步 color picker
    if (picker1 && picker1.value !== hex1) picker1.value = hex1;
    if (picker2 && picker2.value !== hex2) picker2.value = hex2;

    // 渐变条
    const gradientEl = document.getElementById('m1p2-de-gradient');
    if (gradientEl) gradientEl.style.background = `linear-gradient(to right, ${hex1}, ${hex2})`;

    // 计算 ΔE
    const de = deltaE(hex1, hex2);
    const valueEl = document.getElementById('m1p2-de-value');
    const labelEl = document.getElementById('m1p2-de-label');
    const markerEl = document.getElementById('m1p2-de-marker');

    if (valueEl) {
      gsap.to(valueEl, {
        textContent: de.toFixed(1),
        duration: 0.5,
        snap: { textContent: 0.1 },
        ease: 'power2.out',
      });
      // 数值颜色随差异大小变化
      if (de < 2) valueEl.style.color = '#34C759';
      else if (de < 10) valueEl.style.color = '#7EC8E3';
      else if (de < 50) valueEl.style.color = '#F0B27A';
      else valueEl.style.color = '#E07A7A';
    }

    // 解读
    let interpretation = '';
    if (de < 1) interpretation = '人眼不可感知';
    else if (de < 2) interpretation = '非常微小的差异';
    else if (de < 10) interpretation = '可感知的差异';
    else if (de < 50) interpretation = '明显不同的颜色';
    else interpretation = '完全不相关的颜色';

    if (labelEl) labelEl.textContent = interpretation;

    // 标尺标记位置（分段线性映射）
    if (markerEl) {
      let pct;
      if (de <= 0) pct = 0;
      else if (de <= 1) pct = de * 2;
      else if (de <= 2) pct = 2 + (de - 1) * 2;
      else if (de <= 10) pct = 4 + (de - 2) * 2;
      else if (de <= 50) pct = 20 + (de - 10) * 1;
      else pct = Math.min(100, 60 + (de - 50) * 0.4);
      markerEl.style.left = pct + '%';
    }
  };

  // 文字输入
  if (input1) {
    input1.addEventListener('input', update);
    state.cleanupFns.push(() => input1.removeEventListener('input', update));
  }
  if (input2) {
    input2.addEventListener('input', update);
    state.cleanupFns.push(() => input2.removeEventListener('input', update));
  }

  // 原生颜色选择器同步到文字输入
  if (picker1) {
    const onPick1 = () => { if (input1) input1.value = picker1.value; update(); };
    picker1.addEventListener('input', onPick1);
    state.cleanupFns.push(() => picker1.removeEventListener('input', onPick1));
  }
  if (picker2) {
    const onPick2 = () => { if (input2) input2.value = picker2.value; update(); };
    picker2.addEventListener('input', onPick2);
    state.cleanupFns.push(() => picker2.removeEventListener('input', onPick2));
  }

  // 预设配对按钮
  document.querySelectorAll('.m1p2-de-preset').forEach(btn => {
    const handler = () => setColors(btn.dataset.c1, btn.dataset.c2);
    btn.addEventListener('click', handler);
    state.cleanupFns.push(() => btn.removeEventListener('click', handler));
  });

  // 随机按钮
  const randomBtn = document.getElementById('m1p2-de-random');
  if (randomBtn) {
    const onRandom = () => {
      const rndHex = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
      setColors(rndHex(), rndHex());
    };
    randomBtn.addEventListener('click', onRandom);
    state.cleanupFns.push(() => randomBtn.removeEventListener('click', onRandom));
  }

  // Swatch hover 效果
  [swatch1, swatch2].forEach(sw => {
    if (!sw) return;
    sw.addEventListener('pointerenter', () => { sw.style.transform = 'scale(1.05)'; sw.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; });
    sw.addEventListener('pointerleave', () => { sw.style.transform = ''; sw.style.boxShadow = ''; });
  });

  // 初始计算
  update();
}

// ═══════════════════════════════════════════════════
// Section 5: Palette Browser
// ═══════════════════════════════════════════════════

function initPaletteBrowser() {
  // 注入响应式 CSS
  injectBrowserLayoutCSS();

  // 分类 Tab
  const tabsContainer = document.getElementById('m1p2-palette-tabs');
  if (tabsContainer) {
    state.paletteTabSwitcher = createTabSwitcher(tabsContainer, {
      tabs: CATEGORY_TABS,
      activeId: 'nature',
      onChange: (id) => {
        state.paletteCategory = id;
        renderPaletteList();
      },
      variant: 'pill',
    });
  }

  // 图表预览
  const chartContainer = document.getElementById('m1p2-palette-chart');
  if (chartContainer) {
    state.paletteBrowserChart = createChartPreview(chartContainer, {
      width: 560,
      height: 380,
      margin: { top: 30, right: 30, bottom: 50, left: 50 },
      bgColor: '#ffffff',
    });
    state.activePaletteColors = PALETTE_DATA.nature[0].colors;
    renderBrowserChart();
  }

  // 图表类型切换按钮
  renderChartTypeButtons();

  renderPaletteList();
}

const CHART_TYPES = [
  { id: 'bar', label: '柱状图' },
  { id: 'line', label: '折线图' },
  { id: 'donut', label: '圆环图' },
  { id: 'scatter', label: '散点图' },
  { id: 'area', label: '面积图' },
];

function renderChartTypeButtons() {
  const container = document.getElementById('m1p2-chart-type-btns');
  if (!container) return;

  container.innerHTML = CHART_TYPES.map(t => `
    <button class="m1p2-chart-type-btn${t.id === state.chartType ? ' active' : ''}" data-type="${t.id}" style="
      padding:4px 12px;border-radius:var(--radius-full);font-size:11px;font-family:var(--font-heading);font-weight:500;
      border:1px solid ${t.id === state.chartType ? 'var(--accent)' : 'var(--border-dark)'};
      background:${t.id === state.chartType ? 'var(--accent-subtle)' : 'transparent'};
      color:${t.id === state.chartType ? 'var(--accent)' : 'var(--text-on-dark-3)'};
      cursor:pointer;transition:all var(--t-fast);min-height:28px;
    ">${t.label}</button>
  `).join('');

  container.querySelectorAll('.m1p2-chart-type-btn').forEach(btn => {
    const handler = () => {
      state.chartType = btn.dataset.type;
      renderChartTypeButtons();
      renderBrowserChart();
    };
    btn.addEventListener('click', handler);
    state.cleanupFns.push(() => btn.removeEventListener('click', handler));
  });
}

function injectBrowserLayoutCSS() {
  if (document.getElementById('m1p2-browser-layout-css')) return;
  const style = document.createElement('style');
  style.id = 'm1p2-browser-layout-css';
  style.textContent = `
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
  `;
  document.head.appendChild(style);
  state.cleanupFns.push(() => style.remove());
}

function renderPaletteList() {
  const container = document.getElementById('m1p2-palette-list');
  if (!container) return;

  // 销毁旧的复制按钮
  state.copyButtons.forEach(cb => cb.destroy());
  state.copyButtons = [];

  const palettes = PALETTE_DATA[state.paletteCategory] || [];

  container.innerHTML = palettes.map((p, idx) => `
    <div class="m1p2-palette-card" data-idx="${idx}" style="
      background:var(--bg-dark-elevated);
      border-radius:var(--radius-md);
      padding:var(--space-md);
      border:1px solid var(--border-dark);
      transition:border-color var(--t-fast);
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-sm);flex-wrap:wrap;gap:var(--space-xs);">
        <span style="font-family:var(--font-heading);font-weight:600;color:var(--text-on-dark);font-size:var(--text-body);">${p.name}</span>
        <div style="display:flex;gap:var(--space-xs);align-items:center;" class="m1p2-palette-actions" data-idx="${idx}"></div>
      </div>
      <div style="display:flex;gap:0;border-radius:var(--radius-sm);overflow:hidden;margin-bottom:var(--space-sm);">
        ${p.colors.map(c => `<div style="flex:1;height:48px;background:${c};min-width:0;" title="${c}"></div>`).join('')}
      </div>
      <div style="display:flex;gap:var(--space-xs);flex-wrap:wrap;">
        ${p.colors.map(c => `<span style="font-family:var(--font-code);font-size:10px;color:var(--text-on-dark-3);">${c}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // 为每个卡片添加复制和应用按钮
  palettes.forEach((p, idx) => {
    const actionsEl = container.querySelector(`.m1p2-palette-actions[data-idx="${idx}"]`);
    if (!actionsEl) return;

    // 复制 HEX 按钮
    const copyBtn = createCopyButton(actionsEl, {
      getText: () => p.colors.join(', '),
      label: '复制 HEX',
      successLabel: '已复制',
      className: 'btn-small',
    });
    state.copyButtons.push(copyBtn);

    // 应用到图表按钮
    const applyBtn = document.createElement('button');
    applyBtn.className = 'btn-ghost btn-small';
    applyBtn.textContent = '应用到图表';
    applyBtn.style.cssText = 'font-size:var(--text-small);padding:8px 16px;color:var(--text-on-dark-2);border-color:var(--border-dark);';
    const applyHandler = () => {
      state.activePaletteColors = p.colors;
      renderBrowserChart();
      // 滚动到图表预览区
      const chartEl = document.getElementById('m1p2-palette-chart');
      if (chartEl) chartEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // 高亮当前卡片
      container.querySelectorAll('.m1p2-palette-card').forEach((card, ci) => {
        card.style.borderColor = ci === idx ? 'var(--accent)' : 'var(--border-dark)';
      });
    };
    applyBtn.addEventListener('click', applyHandler);
    actionsEl.appendChild(applyBtn);
    state.cleanupFns.push(() => {
      applyBtn.removeEventListener('click', applyHandler);
      applyBtn.remove();
    });
  });
}

function renderBrowserChart() {
  const chart = state.paletteBrowserChart;
  if (!chart) return;
  const colors = state.activePaletteColors || PALETTE_DATA.nature[0].colors;
  const type = state.chartType || 'bar';

  const g = chart.clear();
  const { innerWidth, innerHeight } = chart;
  const textColor = '#333';
  const subColor = '#888';
  const gridColor = '#e0e0e0';

  // 共用：绘制图例
  const drawLegend = (labels, cols, yOffset = -15) => {
    const n = labels.length;
    const spacing = Math.min(60, innerWidth / n);
    const totalW = n * spacing;
    const startX = innerWidth - totalW;
    const legend = g.append('g').attr('transform', `translate(${startX}, ${yOffset})`);
    labels.forEach((label, i) => {
      const lg = legend.append('g').attr('transform', `translate(${i * spacing}, 0)`);
      lg.append('rect').attr('width', 10).attr('height', 10).attr('rx', 2).attr('fill', cols[i]);
      lg.append('text').attr('x', 14).attr('y', 9).attr('fill', subColor).attr('font-size', '10px').text(label);
    });
  };

  if (type === 'bar') {
    // 分组柱状图
    const categories = ['Group A', 'Group B', 'Group C', 'Group D'];
    const series = colors.slice(0, 5).map((c, i) => ({ name: 'S' + (i + 1), color: c }));
    const data = categories.flatMap((cat, ci) =>
      series.map((s, si) => ({ category: cat, series: s.name, value: 20 + Math.sin(ci * 1.5 + si * 0.7) * 30 + 40, color: s.color }))
    );
    const x0 = d3.scaleBand().domain(categories).range([0, innerWidth]).padding(0.2);
    const x1 = d3.scaleBand().domain(series.map(s => s.name)).range([0, x0.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x0).tickSize(0))
      .call(sel => sel.select('.domain').attr('stroke', gridColor))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');
    g.append('g').call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .call(sel => sel.select('.domain').remove())
      .call(sel => sel.selectAll('.tick line').attr('stroke', gridColor).attr('stroke-dasharray', '3,3'))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');

    g.selectAll('.bar').data(data).join('rect').attr('class', 'bar')
      .attr('x', d => x0(d.category) + x1(d.series)).attr('width', x1.bandwidth())
      .attr('rx', 3).attr('fill', d => d.color)
      .attr('y', innerHeight).attr('height', 0)
      .transition().duration(600).delay((d, i) => i * 20).ease(d3.easeCubicOut)
      .attr('y', d => y(d.value)).attr('height', d => innerHeight - y(d.value));

    drawLegend(series.map(s => s.name), series.map(s => s.color));

  } else if (type === 'line') {
    // 多系列折线图
    const n = Math.min(colors.length, 6);
    const points = 8;
    const x = d3.scaleLinear().domain([0, points - 1]).range([0, innerWidth]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x).ticks(points).tickFormat(d => 'T' + d))
      .call(sel => sel.select('.domain').attr('stroke', gridColor))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');
    g.append('g').call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .call(sel => sel.select('.domain').remove())
      .call(sel => sel.selectAll('.tick line').attr('stroke', gridColor).attr('stroke-dasharray', '3,3'))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');

    for (let s = 0; s < n; s++) {
      // Simple upward trend with small deterministic noise — traditional line chart style
      const base = 15 + s * 8;
      const slope = 5 + s * 1.2;
      const noise = [0, 3, -2, 4, -1, 5, 2, 3];
      const lineData = Array.from({ length: points }, (_, i) => ({
        x: i,
        y: Math.min(95, Math.max(5, base + slope * i + noise[i % noise.length])),
      }));
      const line = d3.line().x(d => x(d.x)).y(d => y(d.y)).curve(d3.curveLinear);

      // 线条动画：用 stroke-dashoffset
      const path = g.append('path').datum(lineData)
        .attr('d', line).attr('fill', 'none').attr('stroke', colors[s]).attr('stroke-width', 2.5)
        .attr('stroke-linecap', 'round');
      const totalLen = path.node().getTotalLength();
      path.attr('stroke-dasharray', totalLen).attr('stroke-dashoffset', totalLen)
        .transition().duration(800).delay(s * 100).ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);

      // 数据点
      g.selectAll(`.dot-${s}`).data(lineData).join('circle').attr('class', `dot-${s}`)
        .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
        .attr('r', 0).attr('fill', colors[s])
        .transition().duration(400).delay((d, i) => 800 + s * 100 + i * 40)
        .attr('r', 3.5);
    }

    drawLegend(Array.from({ length: n }, (_, i) => 'S' + (i + 1)), colors.slice(0, n));

  } else if (type === 'donut') {
    // 圆环图
    const n = Math.min(colors.length, 8);
    const pieData = Array.from({ length: n }, (_, i) => ({ value: 10 + Math.sin(i * 1.4) * 5 + 8, color: colors[i], label: 'Cat ' + (i + 1) }));
    const radius = Math.min(innerWidth, innerHeight) / 2 - 10;
    const arcGen = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);
    const pie = d3.pie().value(d => d.value).sort(null).padAngle(0.02);
    const arcs = pie(pieData);
    const center = g.append('g').attr('transform', `translate(${innerWidth / 2},${innerHeight / 2})`);

    center.selectAll('.arc').data(arcs).join('path').attr('class', 'arc')
      .attr('fill', d => d.data.color)
      .attr('d', d3.arc().innerRadius(radius * 0.55).outerRadius(radius * 0.55))
      .transition().duration(700).delay((d, i) => i * 60).ease(d3.easeCubicOut)
      .attr('d', arcGen);

    // 中心文字
    center.append('text').attr('text-anchor', 'middle').attr('dy', '-0.2em')
      .attr('fill', textColor).attr('font-size', '18px').attr('font-weight', '700').text('Total');
    center.append('text').attr('text-anchor', 'middle').attr('dy', '1.2em')
      .attr('fill', subColor).attr('font-size', '13px').text(pieData.reduce((s, d) => s + d.value, 0).toFixed(0));

    // 标签
    arcs.forEach((d, i) => {
      const [lx, ly] = arcGen.centroid(d);
      if (d.endAngle - d.startAngle > 0.3) {
        center.append('text').attr('x', lx).attr('y', ly).attr('text-anchor', 'middle')
          .attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '600')
          .text(Math.round(d.data.value / pieData.reduce((s, p) => s + p.value, 0) * 100) + '%')
          .attr('opacity', 0).transition().delay(700 + i * 60).duration(300).attr('opacity', 1);
      }
    });

    drawLegend(pieData.map(d => d.label), pieData.map(d => d.color));

  } else if (type === 'scatter') {
    // 散点图
    const n = Math.min(colors.length, 5);
    const x = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const y = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x).ticks(5))
      .call(sel => sel.select('.domain').attr('stroke', gridColor))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');
    g.append('g').call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .call(sel => sel.select('.domain').remove())
      .call(sel => sel.selectAll('.tick line').attr('stroke', gridColor).attr('stroke-dasharray', '3,3'))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');

    // 轴标签
    g.append('text').attr('x', innerWidth / 2).attr('y', innerHeight + 38)
      .attr('text-anchor', 'middle').attr('fill', subColor).attr('font-size', '11px').text('Variable X');
    g.append('text').attr('transform', 'rotate(-90)').attr('x', -innerHeight / 2).attr('y', -38)
      .attr('text-anchor', 'middle').attr('fill', subColor).attr('font-size', '11px').text('Variable Y');

    for (let s = 0; s < n; s++) {
      const pts = Array.from({ length: 12 }, () => ({
        x: 10 + s * 15 + Math.random() * 30,
        y: 20 + Math.random() * 60 + Math.sin(s) * 10,
      }));
      g.selectAll(`.scatter-${s}`).data(pts).join('circle').attr('class', `scatter-${s}`)
        .attr('cx', d => x(d.x)).attr('cy', d => y(d.y))
        .attr('r', 0).attr('fill', colors[s]).attr('opacity', 0.7)
        .transition().duration(500).delay((d, i) => s * 80 + i * 20).ease(d3.easeCubicOut)
        .attr('r', 5);
    }

    drawLegend(Array.from({ length: n }, (_, i) => 'Group ' + (i + 1)), colors.slice(0, n));

  } else if (type === 'area') {
    // 堆叠面积图
    const n = Math.min(colors.length, 5);
    const points = 10;
    const x = d3.scaleLinear().domain([0, points - 1]).range([0, innerWidth]);

    // 生成堆叠数据
    const rawData = Array.from({ length: points }, (_, i) => {
      const row = { x: i };
      for (let s = 0; s < n; s++) row['s' + s] = 8 + Math.sin(i * 0.6 + s * 1.3) * 6 + 10;
      return row;
    });
    const keys = Array.from({ length: n }, (_, i) => 's' + i);
    const stack = d3.stack().keys(keys);
    const layers = stack(rawData);
    const yMax = d3.max(layers[layers.length - 1], d => d[1]);
    const y = d3.scaleLinear().domain([0, yMax * 1.1]).range([innerHeight, 0]);

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(x).ticks(points).tickFormat(d => 'T' + d))
      .call(sel => sel.select('.domain').attr('stroke', gridColor))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');
    g.append('g').call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .call(sel => sel.select('.domain').remove())
      .call(sel => sel.selectAll('.tick line').attr('stroke', gridColor).attr('stroke-dasharray', '3,3'))
      .selectAll('text').attr('fill', subColor).attr('font-size', '11px');

    const area = d3.area()
      .x((d, i) => x(rawData[i].x))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]))
      .curve(d3.curveMonotoneX);

    layers.forEach((layer, i) => {
      g.append('path').datum(layer)
        .attr('d', area).attr('fill', colors[i]).attr('opacity', 0)
        .transition().duration(600).delay(i * 80).ease(d3.easeCubicOut)
        .attr('opacity', 0.8);
    });

    drawLegend(Array.from({ length: n }, (_, i) => 'S' + (i + 1)), colors.slice(0, n));
  }
}

// ═══════════════════════════════════════════════════
// Scroll Animations
// ═══════════════════════════════════════════════════

function initScrollAnimations() {
  // Hero 内容
  fadeIn('.page-hero-title, .page-hero-sub');

  // 各 section 交互组件入场
  scaleReveal('#m1p2-harmony-wheel');
  scaleReveal('#m1p2-proportion-bar');
  scaleReveal('#m1p2-palette-list');
}

// ═══════════════════════════════════════════════════
// Destroy
// ═══════════════════════════════════════════════════

export function destroy() {
  killAll();

  const styleTag = document.getElementById('m1p2-styles');
  if (styleTag) styleTag.remove();

  if (state.harmonyTabSwitcher) state.harmonyTabSwitcher.destroy();
  if (state.paletteTabSwitcher) state.paletteTabSwitcher.destroy();
  if (state.harmonyChartPreview) state.harmonyChartPreview.destroy();
  if (state.paletteBrowserChart) state.paletteBrowserChart.destroy();

  state.copyButtons.forEach(cb => cb.destroy());

  if (state.harmonyAnimFrame) cancelAnimationFrame(state.harmonyAnimFrame);

  state.cleanupFns.forEach(fn => fn());
  state.resizeObservers.forEach(ro => ro.disconnect());

  // 重置状态
  state = {
    harmonyType: 'complementary',
    baseHue: 0,
    harmonyCanvas: null,
    harmonyCtx: null,
    harmonyAnimFrame: null,
    harmonyTabSwitcher: null,
    harmonyChartPreview: null,
    proportions: [60, 30, 10],
    rule603010Colors: { primary: '#f5f5f7', secondary: '#3C5488', accent: '#E64B35' },
    presetIndex: 0,
    isDraggingDivider: false,
    activeDivider: -1,
    deltaColor1: '#E64B35',
    deltaColor2: '#4DBBD5',
    paletteCategory: 'nature',
    paletteTabSwitcher: null,
    paletteBrowserChart: null,
    activePaletteColors: null,
    chartType: 'bar',
    copyButtons: [],
    cleanupFns: [],
    resizeObservers: [],
  };
}

// ═══════════════════════════════════════════════════
// Utilities
// ═══════════════════════════════════════════════════

function normalizeHex(val) {
  let hex = (val || '').trim();
  if (!hex.startsWith('#')) hex = '#' + hex;
  if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex;
  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return null;
}

function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.55;
}
