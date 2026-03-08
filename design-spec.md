# SciAesthetic 设计规范 - Apple-Inspired Academic

> **品牌**：SciAesthetic（科研美学）
> **Slogan**：你的研究值得更好的表达。
> **Logo 排版**：`SciAesthetic` — Playfair Display, letter-spacing: 0.03em
> **Slogan 排版**：Noto Sans SC, font-weight: 300, opacity: 0.5

---

## 色彩系统

### 浅色表面
```css
--bg-light:          #fafafa;
--bg-light-alt:      #f5f5f7;
--bg-light-elevated: #ffffff;
--text-on-light:     #1d1d1f;
--text-on-light-2:   #6e6e73;
--text-on-light-3:   #86868b;
--border-light:      #d2d2d7;
```

### 深色表面
```css
--bg-dark:           #1d1d1f;
--bg-dark-deep:      #000000;
--bg-dark-elevated:  #2d2d2f;
--text-on-dark:      #f5f5f7;
--text-on-dark-2:    #a1a1a6;
--text-on-dark-3:    #6e6e73;
--border-dark:       #424245;
```

### 强调色
```css
--accent:          #7EC8E3;
--accent-hover:    #5BA3C9;
--accent-subtle:   rgba(126, 200, 227, 0.1);
--accent-glow:     rgba(126, 200, 227, 0.25);
```

### 模块标识色（仅用于模块图标、导航高亮、模块入口卡片边框）
```css
--module-1:  #7EC8E3;  /* 数据可视化 — 天蓝 */
--module-2:  #B8B8E8;  /* AI 辅助 — 淡紫 */
--module-3:  #95D5B2;  /* 矢量设计 — 薄荷绿 */
--module-4:  #F0B27A;  /* 演示设计 — 暖橙 */
```

### 数据色（仅用在图表/配色演示区域）
```css
--data-blue:     #7EC8E3;
--data-green:    #95D5B2;
--data-purple:   #B8B8E8;
--data-orange:   #F0B27A;
--data-red:      #E07A7A;
--data-yellow:   #F0D264;
--data-pink:     #E8A0BF;
--data-teal:     #6BC5D2;
```

---

## 字体系统

```css
--font-display:  'Playfair Display', 'Noto Serif SC', Georgia, serif;
--font-heading:  'Inter', 'Noto Sans SC', -apple-system, sans-serif;
--font-body:     'Noto Sans SC', 'Inter', -apple-system, sans-serif;
--font-code:     'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

### 字号
```css
--text-hero:     clamp(3rem, 6vw, 5rem);
--text-display:  clamp(2.5rem, 5vw, 4.5rem);
--text-title:    clamp(1.75rem, 3vw, 2.5rem);
--text-heading:  clamp(1.25rem, 2vw, 1.75rem);
--text-body:     clamp(1rem, 1.2vw, 1.25rem);
--text-small:    0.875rem;
--text-caption:  0.75rem;
--text-stat:     clamp(3rem, 8vw, 7rem);
```

### 字重与行高
```
Hero/Display: 700, line-height 1.1, letter-spacing -0.02em
引言/副标题: 300, line-height 1.4（苹果标志性的轻细风格）
正文: 400, line-height 1.8（移动端 1.6）
代码: 400, line-height 1.6
```

### 内容宽度
```css
--w-reading:  680px;   /* 正文阅读 */
--w-content:  960px;   /* 宽内容 */
--w-full:     1200px;  /* 最大宽度 */
```

---

## 间距

```css
--space-xs:   8px;
--space-sm:   16px;
--space-md:   24px;
--space-lg:   48px;
--space-xl:   80px;
--space-2xl:  120px;
--space-3xl:  200px;
```

```css
--radius-sm:    8px;
--radius-md:    16px;
--radius-lg:    24px;
--radius-full:  9999px;
```

---

## 阴影

```css
/* 浅色背景 */
--shadow-sm:    0 1px 3px rgba(0,0,0,0.08);
--shadow-md:    0 4px 16px rgba(0,0,0,0.08);
--shadow-lg:    0 12px 40px rgba(0,0,0,0.12);
--shadow-hover: 0 20px 60px rgba(0,0,0,0.15);
--shadow-glow:  0 4px 24px var(--accent-glow);

/* 深色背景 */
--shadow-dark:  0 4px 16px rgba(0,0,0,0.4);
```

---

## 过渡

```css
--ease-apple:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
--t-fast:      0.2s var(--ease-apple);
--t-base:      0.35s var(--ease-apple);
--t-slow:      0.6s var(--ease-apple);
```

---

## 组件样式

### Section
```css
.section-light {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.section-dark {
  background: var(--bg-dark);
  color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
  min-height: 100vh;
}

/* 移动端 section 间距缩小 */
@media (max-width: 768px) {
  .section-light,
  .section-dark {
    padding: var(--space-xl) var(--space-sm);
    min-height: auto;  /* 移动端不强制 100vh，内容决定高度 */
  }
}
```

### 页面标题（居中，苹果风格）
```css
.page-hero-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-align: center;
}
.page-hero-sub {
  font-family: var(--font-heading);
  font-size: var(--text-title);
  font-weight: 300;
  text-align: center;
  opacity: 0.5;
  max-width: 600px;
  margin: var(--space-md) auto 0;
}
```

### 按钮
```css
.btn-primary {
  padding: 14px 32px;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--t-base);
  box-shadow: 0 2px 12px var(--accent-glow);
  /* 移动端最小触控尺寸 */
  min-height: 44px;
  min-width: 44px;
}
.btn-primary:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 24px var(--accent-glow);
}
.btn-primary:active {
  transform: scale(0.97);
}
.btn-ghost {
  padding: 14px 32px;
  background: transparent;
  color: var(--accent);
  border: 1.5px solid var(--accent);
  border-radius: var(--radius-full);
  transition: all var(--t-base);
  min-height: 44px;
}
.btn-ghost:hover { background: var(--accent-subtle); }
.btn-ghost:active { background: var(--accent-subtle); transform: scale(0.97); }
```

### 桌面端侧边栏
```css
#sidebar {
  position: fixed;
  left: 0; top: 0;
  width: 260px;
  height: 100vh;
  background: rgba(250,250,250,0.85);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-light);
  z-index: 100;
  overflow-y: auto;
}
.nav-module-group {
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border-light);
}
.nav-module-title {
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--text-on-light-2);
  padding: var(--space-xs) var(--space-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.nav-item {
  padding: 10px var(--space-sm) 10px 24px;
  font-size: 0.9rem;
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-fast);
}
.nav-item.active {
  color: var(--accent);
  border-left: 3px solid var(--accent);
  font-weight: 500;
}
.nav-item:hover {
  color: var(--text-on-light);
  background: var(--bg-light-alt);
}

/* Tablet：汉堡菜单 */
@media (max-width: 1024px) and (min-width: 769px) {
  #sidebar {
    transform: translateX(-100%);
    transition: transform var(--t-base);
  }
  #sidebar.open {
    transform: translateX(0);
  }
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    z-index: 99;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--t-base);
  }
  .sidebar-overlay.active {
    opacity: 1;
    pointer-events: auto;
  }
}

/* Mobile：隐藏侧边栏 */
@media (max-width: 768px) {
  #sidebar { display: none; }
}
```

---

## 📱 移动端导航组件

### 底部 Tab Bar（移动端 <768px）
```css
.tab-bar {
  display: none;   /* 桌面端隐藏 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--border-light);
  z-index: 200;
  justify-content: space-around;
  align-items: center;
}

@media (max-width: 768px) {
  .tab-bar { display: flex; }
  /* 给 main 内容区留出底部空间 */
  #main-content { padding-bottom: calc(56px + env(safe-area-inset-bottom)); }
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 6px 0;
  min-width: 56px;
  color: var(--text-on-light-3);
  font-size: 10px;
  font-family: var(--font-heading);
  transition: color var(--t-fast);
  -webkit-tap-highlight-color: transparent;
  /* 无障碍：最小触控区域 */
  min-height: 44px;
  justify-content: center;
}
.tab-item.active {
  color: var(--accent);
}
.tab-item svg {
  width: 22px;
  height: 22px;
}
```

### 移动端顶部导航栏（模块内页）
```css
.mobile-top-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  padding-top: env(safe-area-inset-top);
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light);
  z-index: 150;
  align-items: center;
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
  gap: var(--space-sm);
}

@media (max-width: 768px) {
  .mobile-top-bar { display: flex; }
  #main-content { padding-top: calc(48px + env(safe-area-inset-top)); }
}

.mobile-back-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  background: none;
  border: none;
  cursor: pointer;
}
.mobile-page-title {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mobile-page-progress {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  white-space: nowrap;
}
```

---

## 📱 移动端触摸交互规范

### 触控目标尺寸
```css
/* 所有可交互元素的最小尺寸 */
.touchable {
  min-width: 44px;
  min-height: 44px;
}

/* 滑块 thumb 放大 */
@media (max-width: 768px) {
  input[type="range"]::-webkit-slider-thumb {
    width: 28px;
    height: 28px;
  }
  input[type="range"] {
    height: 44px;  /* 增大触摸区域 */
  }
}
```

### Canvas 触摸事件模板
```js
// 统一使用 Pointer Events API
canvas.addEventListener('pointerdown', onPointerDown);
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerup', onPointerUp);
canvas.addEventListener('pointercancel', onPointerUp);

// 移动端：禁止 canvas 区域的页面滚动
canvas.style.touchAction = 'none';

// 坐标转换（兼容 mouse 和 touch）
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
```

### 手势识别辅助
```js
// 双指缩放检测（用于 Canvas/D3 图表）
let initialPinchDistance = null;
canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 2) {
    initialPinchDistance = getDistance(e.touches[0], e.touches[1]);
  }
});
canvas.addEventListener('touchmove', (e) => {
  if (e.touches.length === 2 && initialPinchDistance) {
    const currentDistance = getDistance(e.touches[0], e.touches[1]);
    const scale = currentDistance / initialPinchDistance;
    // 应用缩放...
  }
});
```

### 横屏提示组件
```css
.landscape-hint {
  display: none;
  position: fixed;
  bottom: calc(56px + env(safe-area-inset-bottom) + 16px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-dark-elevated);
  color: var(--text-on-dark);
  padding: 12px 24px;
  border-radius: var(--radius-full);
  font-size: var(--text-small);
  z-index: 300;
  white-space: nowrap;
  box-shadow: var(--shadow-dark);
  animation: slideUp 0.3s var(--ease-out);
}

@media (orientation: portrait) and (max-width: 768px) {
  .page-interactive-heavy .landscape-hint {
    display: block;
  }
}

@keyframes slideUp {
  from { transform: translateX(-50%) translateY(20px); opacity: 0; }
  to   { transform: translateX(-50%) translateY(0); opacity: 1; }
}
```

---

## 📱 移动端响应式组件变体

### 工作坊三面板布局
```css
.workshop-layout {
  display: grid;
  grid-template-columns: 280px 1fr 360px;
  gap: var(--space-md);
  height: calc(100vh - 120px);
}

/* Tablet */
@media (max-width: 1024px) {
  .workshop-layout {
    grid-template-columns: 240px 1fr;
    /* 代码面板折叠到底部 */
  }
  .workshop-code-panel {
    grid-column: 1 / -1;
    max-height: 300px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .workshop-layout {
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 0;
  }
  .workshop-panel {
    border-bottom: 1px solid var(--border-dark);
  }
  .workshop-panel-header {
    padding: var(--space-sm);
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    min-height: 44px;
  }
  .workshop-panel-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--t-base);
  }
  .workshop-panel.expanded .workshop-panel-content {
    max-height: 500px;
    overflow-y: auto;
  }
}
```

### Before/After 对比组件
```css
.before-after {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: col-resize;
  /* 移动端：支持触摸滑动 */
  touch-action: pan-y;
}

@media (max-width: 768px) {
  .before-after {
    cursor: default;
    /* 触摸区域提示 */
  }
  .before-after .slider-handle {
    width: 40px;
    /* 放大拖动手柄 */
  }
}
```

### CodeMirror 移动端适配
```css
@media (max-width: 768px) {
  .code-editor-wrapper {
    position: relative;
  }
  .code-editor-wrapper .cm-editor {
    font-size: 13px;
  }
  /* 只读遮罩，显示"点击编辑"按钮 */
  .code-editor-readonly-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.3);
    z-index: 10;
  }
  .code-editor-readonly-overlay .edit-btn {
    padding: 10px 20px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-full);
    font-size: var(--text-small);
  }
}
```

---

## GSAP ScrollTrigger 标准模式

每个页面初始化时使用以下封装函数：

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 基础渐入（所有 section 内元素的默认入场方式）
export function fadeIn(elements, { stagger = 0.15, y = 60, start = 'top 85%' } = {}) {
  return gsap.from(elements, {
    scrollTrigger: {
      trigger: elements[0] || elements,
      start,
      toggleActions: 'play none none reverse'
    },
    opacity: 0, y, duration: 0.8, stagger,
    ease: 'power3.out'
  });
}

// 粘性步骤教学（左侧固定标题/描述，右侧内容随滚动切换）
export function stickySteps(container, pinned) {
  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: 'bottom bottom',
    pin: pinned,
    pinSpacing: false
  });
}

// 数字递增（统计数字、count-up）
export function countUp(el, target, duration = 2) {
  return gsap.to(el, {
    scrollTrigger: { trigger: el, start: 'top 80%' },
    textContent: target,
    duration,
    snap: { textContent: 1 },
    ease: 'power2.out'
  });
}

// 视差（背景装饰慢速移动）
export function parallax(el, speed = 0.3) {
  return gsap.to(el, {
    scrollTrigger: { trigger: el, scrub: true },
    y: `${speed * 100}%`,
    ease: 'none'
  });
}

// 缩放揭示（交互组件入场）
export function scaleReveal(el, { scale = 0.9, start = 'top 80%' } = {}) {
  return gsap.from(el, {
    scrollTrigger: { trigger: el, start, toggleActions: 'play none none reverse' },
    opacity: 0, scale, duration: 1,
    ease: 'power3.out'
  });
}

// 页面离开时必须调用
export function killAll() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}
```

### 移动端 GSAP 适配
```js
// 使用 matchMedia 为移动端设置不同动画参数
ScrollTrigger.matchMedia({
  // 桌面端
  '(min-width: 769px)': function() {
    // 完整动画：视差、长距离 pin、复杂时间线
    stickySteps(container, pinned);
    parallax(decorEl, 0.3);
  },
  // 移动端
  '(max-width: 768px)': function() {
    // 简化动画：减少视差、缩短 pin 距离、减少 stagger
    fadeIn(elements, { y: 30, stagger: 0.08 });
    // 不使用 pin（移动端粘性滚动体验不佳）
    // 改为普通的 fadeIn + 固定标题
  }
});
```

---

## CodeMirror 6 标准配置

用于代码实验室、图表工作坊等需要用户编辑代码的场景：

```js
import { EditorView, basicSetup } from 'codemirror';
import { r } from 'codemirror-lang-r';        // R 语言支持
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

export function createEditor(container, { code = '', language = 'r', onChange, readOnly = false }) {
  const extensions = [
    basicSetup,
    oneDark,                    // 始终深色主题
    language === 'r' ? r() : python(),
    EditorView.updateListener.of(update => {
      if (update.docChanged && onChange) {
        onChange(update.state.doc.toString());
      }
    }),
    EditorView.theme({
      '&': { fontSize: '14px', borderRadius: '12px' },
      '.cm-content': { fontFamily: 'var(--font-code)', padding: '16px' },
      '.cm-gutters': { borderRight: 'none' },
    })
  ];

  // 移动端默认只读
  if (readOnly || window.innerWidth < 768) {
    extensions.push(EditorView.editable.of(false));
  }

  return new EditorView({
    doc: code,
    extensions,
    parent: container
  });
}
```

---

## D3.js 图表预览标准

用于图表参数面板的实时 SVG 预览：

```js
// 标准 SVG 画布初始化
export function createChartSVG(container, { width = 600, height = 400, margin = { top: 40, right: 40, bottom: 60, left: 60 } } = {}) {
  const svg = d3.select(container)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'chart-svg')
    .attr('preserveAspectRatio', 'xMidYMid meet');  // 移动端自适应

  // 深色画布背景
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', '#1a1a2e')
    .attr('rx', 12);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  return { svg, g, innerWidth: width - margin.left - margin.right, innerHeight: height - margin.top - margin.bottom };
}
```

---

## Canvas 交互标准

用于贝塞尔编辑器、热力图、布局编辑器等：

```js
export function createInteractiveCanvas(container, { width = 800, height = 600 } = {}) {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  container.appendChild(canvas);

  // 禁止 canvas 区域的页面滚动（移动端）
  canvas.style.touchAction = 'none';

  // 统一的指针坐标转换（兼容 mouse 和 touch）
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  return { canvas, ctx, getPos };
}
```

---

## 响应式断点

```
Desktop  (>1200px)  : 侧边栏 260px + 全宽内容
Laptop   (1024-1200): 侧边栏 220px
Tablet   (768-1024) : 汉堡菜单覆盖层
Mobile   (480-768)  : 底部 tab bar + 单列布局 + padding 16px
Small    (<480px)   : 同 Mobile，字号用 clamp 下限，间距进一步压缩
```

### 移动端关键 CSS 覆盖
```css
@media (max-width: 768px) {
  /* 排版 */
  body { font-size: 16px; line-height: 1.6; }
  h1 { font-size: clamp(1.75rem, 6vw, 2.5rem); }
  h2 { font-size: clamp(1.25rem, 4vw, 1.75rem); }

  /* 布局 */
  .content-wrapper { padding: 0 var(--space-sm); }
  .two-column { flex-direction: column; }
  .side-by-side { flex-direction: column; gap: var(--space-md); }

  /* 表格 */
  .table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  /* 代码块 */
  pre, .cm-editor { font-size: 13px; overflow-x: auto; }

  /* 图片 */
  img, svg.chart-svg { max-width: 100%; height: auto; }

  /* 间距压缩 */
  --space-xl: 48px;
  --space-2xl: 64px;
  --space-3xl: 80px;
}

@media (max-width: 480px) {
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 56px;
}
```

---

## 禁止清单

❌ 卡片网格平铺布局
❌ gradient blob 背景装饰
❌ backdrop-filter 毛玻璃卡片满屏
❌ 全页面只有一种背景色
❌ CSS-only IntersectionObserver 做滚动动画
❌ 交互组件挤在小卡片里
❌ 非数据区域大面积彩色
❌ 3D transform 旋转
❌ 只读 `<pre>` 充当代码编辑器（需要编辑功能的地方必须用 CodeMirror）
❌ 静态截图替代交互演示
❌ 移动端忽略触摸交互适配
❌ 移动端使用 hover-only 的信息展示
❌ 可交互元素小于 44×44px
