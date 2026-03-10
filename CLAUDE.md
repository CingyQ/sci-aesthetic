# SciAesthetic（科研美学）- 项目规范

## 品牌信息
- **英文品牌名**：SciAesthetic
- **中文标题**：科研美学
- **Slogan**：你的研究值得更好的表达。
- **浏览器标签页**：科研美学 | SciAesthetic
- **GitHub 仓库名**：sci-aesthetic
- **侧边栏 logo**：SciAesthetic（Playfair Display 衬线体，大字号，letter-spacing: 0.03em）
- **Slogan 排版**：Noto Sans SC，font-weight: 300，opacity 稍降

## 项目定位
面向科研工作者的**交互式知识百科**——科研视觉传达完整体系。
结构：首页 + 4 个独立模块（数据可视化 / AI 辅助 / 矢量设计 / 演示设计）+ 速查手册。
百科式浏览：用户可从任意词条进入，自由探索，无线性课程路径。
部署在 GitHub Pages。

---

## 网站结构

```
首页（Landing Page）
├── 模块一：科研数据可视化（10 页）  ← 色彩 + R/Python + 图表选择 + 导出
├── 模块二：AI 辅助科研绘图（6 页）  ← 新范式 + Prompt + 后处理 + 图解 + 伦理 + 实战
├── 模块三：矢量绘图与设计（7 页）   ← Illustrator + 贝塞尔 + SVG + 美化
├── 模块四：学术演示设计（8 页）     ← PPT + 海报 + 图摘 + 信息图 + 动画
└── 速查手册（全局）                 ← 图表/配色/导出/快捷键/期刊速查
```

每个模块是**独立子站**的感觉：有自己的入口页和配色调性。
用户可以按任意顺序浏览模块，模块间通过交叉链接关联。

---

## 目录结构

```
src/
├── styles/
│   ├── variables.css          # 全局 CSS 变量
│   ├── base.css               # reset + typography + scrollbar
│   ├── components.css         # 按钮 / 标签 / 输入框 / 表格
│   ├── layout.css             # 侧边栏 + 底部导航 + main + section
│   ├── mobile.css             # 移动端专用覆盖样式
│   └── animations.css         # 微交互 CSS transitions
├── components/
│   ├── ScrollAnimations.js    # GSAP ScrollTrigger 封装
│   ├── CodeEditor.js          # CodeMirror 6 封装
│   ├── ChartPreview.js        # D3 SVG 画布封装
│   ├── InteractiveCanvas.js   # Canvas API 封装
│   ├── Navigation.js          # 侧边栏 + 底部 tab bar + 路由
│   ├── BeforeAfter.js         # 拖拽/滑动对比
│   └── ...
├── pages/
│   ├── home.js                # 首页
│   ├── m1/                    # 模块一：科研数据可视化
│   │   ├── p01-color-theory.js
│   │   ├── p02-color-harmony.js
│   │   ├── p03-palette-generator.js
│   │   ├── p04-accessibility.js
│   │   ├── p05-chart-selection.js
│   │   ├── p06-ggplot2-grammar.js
│   │   ├── p07-ggplot2-workshop.js
│   │   ├── p08-r-themes.js
│   │   ├── p09-python-viz.js
│   │   └── p10-workflow-export.js
│   ├── m2/                    # 模块二：AI 辅助
│   │   ├── p01-ai-overview.js
│   │   ├── p02-prompt-engineering.js
│   │   ├── p03-vectorization.js
│   │   ├── p04-ethics.js
│   │   ├── p05-ai-diagrams.js
│   │   └── p06-case-studies.js
│   ├── m3/                    # 模块三：矢量设计
│   │   ├── p01-vector-vs-raster.js
│   │   ├── p02-illustrator-tools.js
│   │   ├── p03-bezier.js
│   │   ├── p04-chart-beautify.js
│   │   ├── p05-svg-editing.js
│   │   ├── p06-multi-panel.js
│   │   └── p07-resources.js
│   ├── m4/                    # 模块四：演示设计
│   │   ├── p01-ppt-principles.js
│   │   ├── p02-typography.js
│   │   ├── p03-attention-flow.js
│   │   ├── p04-ppt-makeover.js
│   │   ├── p05-poster.js
│   │   ├── p06-graphical-abstract.js
│   │   ├── p07-infographics.js
│   │   └── p08-animation.js
│   └── ref.js                 # 速查手册
└── utils/
    ├── router.js              # hash 路由
    └── color-math.js          # 色彩空间转换 / deltaE / 对比度
```

---

## 技术栈

### 构建
- Vite（vanilla JS，不用 React/Vue/Angular）
- ES Modules 代码组织

### 样式
- 原生 CSS（CSS Variables + 模块化文件）
- 字体：Google Fonts（Noto Serif SC + Playfair Display + Inter + Noto Sans SC + JetBrains Mono）

### 交互与动画（★ 这是本项目的核心竞争力）

| 用途 | 库 | 来源 | 说明 |
|------|----|----|------|
| 滚动动画 | **GSAP + ScrollTrigger** | CDN | 必须使用。苹果级滚动体验的基础 |
| 数据可视化 | **D3.js** | CDN | 所有图表预览、色轮、决策树、数据演示 |
| 代码编辑器 | **CodeMirror 6** | npm | 真实的代码编辑体验（语法高亮+行号+自动缩进+可编辑） |
| 画布交互 | **Canvas API** | 原生 | 贝塞尔编辑器、拖拽布局、注意力热力图 |
| 语法高亮（只读） | **Prism.js** | CDN | 只读代码展示块 |
| 拖拽排序 | **SortableJS** | CDN | 布局编辑器、面板排列 |
| 数学运算 | 原生 JS | - | 色彩空间转换、CIELAB deltaE、对比度计算 |

### 为什么选这些库？

**CodeMirror 6** 而不是简单的 `<pre>` 代码块：
- 用户可以**直接编辑** R/Python 代码并看到预览变化
- 真实的语法高亮、光标、行号、括号匹配
- 这是 VS Code 和 Observable 使用的同级别编辑器引擎
- 让代码工作坊感觉像真正的 IDE

**D3.js** 而不是 Chart.js：
- 需要的不是"图表库"，而是"数据驱动的 DOM 操作"
- 色轮、决策树、流程图、自定义 SVG 图表都需要 D3 的底层控制力
- 图表预览需要精确控制每个元素的样式、动画、交互

**Canvas API** 而不是纯 DOM：
- 贝塞尔编辑器需要亚像素级精度
- 热力图需要逐像素绘制
- 拖拽布局需要高性能重绘
- 配合 requestAnimationFrame 实现 60fps 交互

---

## ⭐ 设计方向（每次开发页面前必须重读）

### 审美标杆：Apple.com 产品页

**每次开发新页面时，必须同时参考：**
1. 本文件的设计原则
2. design-spec.md 中的具体 CSS 变量和代码模板
3. **frontend-design skill**（在 prompt 中触发，确保视觉品质达到 production-grade）

### 核心原则

#### 1. 全屏叙事节奏
- 每个知识点占 **100vh**，一屏一件事
- 不是卡片堆砌，是**垂直叙事流**
- section 之间 120-200px padding（移动端 60-100px）
- 每个 section 有独立的"情绪"（通过明暗背景切换）

#### 2. 滚动驱动动画 ★★★
用 GSAP ScrollTrigger，不用 CSS-only IntersectionObserver：
- **渐入**：元素随滚动进入视口时 fade in + translateY
- **视差**：背景和前景不同速率
- **粘性滚动**：标题固定，内容随滚动切换（步骤演示的核心交互）
- **进度驱动**：SVG 路径随滚动绘制、数字递增、进度条填充
- **缩放揭示**：组件从 0.9 缩放到 1.0
- **移动端**：减少视差层数，缩短粘性区间，降低动画复杂度

#### 3. 超大排版
- 章节标题：clamp(2.5rem, 5vw, 4.5rem)，letter-spacing: -0.02em
- 概念引言：font-weight: 300，浅灰色，clamp(1.5rem, 3vw, 2.5rem)
- 正文：18-20px，line-height: 1.8，max-width: 680px 居中
- 关键数字：clamp(3rem, 8vw, 7rem) + count-up 动画
- **移动端**：正文最小 16px，line-height 1.6，全宽 padding 16-20px

#### 4. 明暗交替
- 浅色段：#fafafa 背景，#1d1d1f 文字
- 深色段：#1d1d1f 背景，#f5f5f7 文字
- **交互组件放在深色段**，让彩色内容更醒目
- 代码编辑器始终深色主题
- 代码块（`pre`）必须使用 `white-space: pre-wrap`，禁止 `white-space: pre`（会撑破容器）

#### 5. 极简配色
- 主体黑白灰
- 强调色只用一个：天蓝 #7EC8E3
- 各模块可有辅助标识色（仅用于模块图标和导航高亮，不影响页面主体配色）：
  - 模块一（数据可视化）：#7EC8E3（天蓝）
  - 模块二（AI 辅助）：#B8B8E8（淡紫）
  - 模块三（矢量设计）：#95D5B2（薄荷绿）
  - 模块四（演示设计）：#F0B27A（暖橙）
- 彩色只出现在数据区域（配色展示/图表预览/色轮）
- 大面积留白 > 花哨装饰

#### 6. 禁止卡片网格平铺
用以下布局替代：
- **交错图文**：图左文右 → 图右文左 → 交替
- **全宽展示**：交互组件占满内容区
- **居中叙事**：重要概念用居中大字单独一屏
- **粘性步骤流**：左侧标题固定，右侧内容滚动切换
- **纵向时间线**：每步滚动渐入

#### 7. 高级交互设计原则
- 交互组件不是"玩具 demo"，要像**真正的软件工具**
- 参数调节要有**即时视觉反馈**（<16ms 延迟）
- 代码编辑器要**真正可编辑**（CodeMirror），不是只读 `<pre>`
- 颜色选择要支持**精确输入**（HEX/RGB/HSL 三种模式切换）
- 拖拽要有**吸附/对齐辅助线**
- 所有可导出的内容都要有**一键复制/下载**按钮
- 复杂交互要有**默认值和重置按钮**，用户不会被困住

---

## 📱 移动端适配规范（★★★ 必读）

### 导航方式

| 设备 | 宽度 | 导航方式 | 侧边栏唤起 |
|------|------|---------|-----------|
| Desktop | >1200px | 左侧固定侧边栏（260px），模块分组展开 | 始终可见 |
| Laptop | 1024-1200px | 左侧缩窄侧边栏（220px） | 始终可见 |
| Tablet | 768-1024px | 左上角浮动汉堡按钮（z:200）→ 侧边栏覆盖层 | 浮动按钮 |
| Mobile | <768px | **底部 Tab Bar** + **顶部栏（含菜单按钮）** | 顶部栏内 ☰ 按钮 |

**底部 Tab Bar**（移动端）：
- 5 个 tab：首页 / 数据可视化 / AI 辅助 / 矢量设计 / 演示设计
- 每个 tab 有图标 + 文字标签
- 当前模块高亮（使用模块标识色）
- 高度 56px，安全区适配（`padding-bottom: env(safe-area-inset-bottom)`）
- z-index: 200

**模块内页导航**（移动端）：
- 顶部固定栏（z:150）：☰ 菜单按钮 + 当前页标题 + 页码（3/10）
- 菜单按钮点击打开侧边栏覆盖层（与 Tablet 共用同一个侧边栏）
- 底部 Tab Bar 仍然可见，允许跨模块跳转
- **浮动汉堡按钮在移动端隐藏**（已集成到顶部栏内，避免"飘在空中"）
- 首页和速查手册页面不显示顶部栏

**Hero 快捷导航**（所有页面）：
- 每个页面 Hero section 底部有一组快捷导航按钮
- 列出当前页面的所有 section，点击平滑滚动到对应位置
- 使用 GSAP 延迟动画入场，样式为半透明胶囊按钮
- 移动端自动缩小字号和间距，极窄屏（<400px）纵向排列

**滚动偏移**：
- 移动端所有 section 设置 `scroll-margin-top: 56px`
- 确保快捷导航跳转和锚点定位不被固定顶部栏遮挡

### 触摸交互适配

| 桌面端交互 | 移动端替代 | 说明 |
|-----------|-----------|------|
| hover 效果 | `:active` + 点击反馈 | 取消所有 hover-only 的信息展示 |
| 鼠标拖拽 | 触摸拖拽（touch events） | touchstart/touchmove/touchend |
| Before/After 滑块 | 水平滑动手势 | 支持手指滑动 |
| Canvas 编辑器 | 全屏模式 + 放大触控点 | 最小触控目标 44×44px |
| CodeMirror 编辑 | 默认只读 + "编辑"按钮 | 点击后进入编辑模式，避免误触 |
| 颜色选择器 | 全屏模态弹窗 | 更大的选色区域 |
| 右键菜单 | 长按菜单 | 统一交互预期 |
| 拖拽排序 | SortableJS 触摸模式 | 原生支持，无需额外处理 |
| 双面板对比 | 上下堆叠 / Tab 切换 | 小屏无法并排 |
| 精确数值输入 | 数字键盘 + 步进器 | `inputmode="decimal"` |

### 排版调整

```
移动端（<768px）排版规则：
- 正文最小 16px（防止 iOS 自动缩放）
- line-height: 1.6（桌面端 1.8，移动端适当压缩）
- 内容 padding: 16-20px
- 单列布局，禁止水平滚动
- 图片最大宽度 100%，高度自适应
- 代码块必须换行（white-space: pre-wrap + word-wrap: break-word），字号 13px，禁止 white-space: pre
- 表格水平可滚动，固定首列
```

### 复杂交互降级方案

| 交互类型 | 桌面端 | 移动端降级 |
|---------|--------|----------|
| 全屏工作坊（三面板） | 左参数 + 中预览 + 右代码 | 垂直堆叠 + 手风琴折叠，一次只展开一个面板 |
| Canvas 贝塞尔编辑器 | 自由拖拽锚点和控制柄 | 全屏编辑 + 放大显示 + 双指缩放 |
| D3 复杂图表 | 完整交互 | 简化视图 + 双指缩放浏览 |
| 粘性滚动演示 | 长距离 pin + 切换 | 缩短 pin 距离 / 改为普通滚动 + 固定标题 |
| 拖拽布局编辑器 | 自由拖放 + 吸附 | 预设布局模板选择 + 参数微调 |
| 多图表并排对比 | 横向排列 | 纵向堆叠 / 左右滑动切换 |
| 列表+预览浏览器 | 左列表（可滚动）+ 右 sticky 预览（flex row） | ≤900px 纵向堆叠（flex column），列表限高 400px |
| 色彩空间 3D 演示 | 3D 旋转 | 静态多角度预览图 + 手势旋转 |

### 横屏提示策略
- 对于复杂交互页面（工作坊、Canvas 编辑器、多面板布局）：
  - 竖屏时显示 Toast 提示："横屏体验更佳"
  - 使用 `@media (orientation: portrait) and (max-width: 768px)` 检测
  - 不阻断内容，仅为建议
  - Toast 可关闭，关闭后该页面不再提示（sessionStorage）

---

## 页面结构规范

### 每个页面的内部结构
```
┌──────────────────────────────────┐
│  Page Hero (100vh, 深色)          │  ← 居中大标题 + 副标题 + 快捷导航按钮
│  class="section-dark              │     使用 section-hero-full 保持全屏
│         section-hero-full"        │     （移动端也保持 100vh/100dvh）
├──────────────────────────────────┤
│  Section 1 (浅色, ~100vh)        │  ← 理论概念，交错图文
│  滚动渐入                         │     移动端 min-height: auto
├──────────────────────────────────┤
│  Section 2 (深色)                │  ← 主交互组件（全宽）
│  动手实践                         │     CodeMirror / D3 / Canvas
├──────────────────────────────────┤
│  Section 3 (浅色)                │  ← 案例 / 对比 / 应用
├──────────────────────────────────┤
│  Footer CTA (深色, ~50vh)        │  ← 小结 + "相关词条" / "下一篇"
└──────────────────────────────────┘
```

### ★ Hero Section 标准模板（M1 审计后确定的最终规范）

每个页面 Hero 必须严格遵循以下结构，不允许变体：

```html
<section class="section-dark section-hero-full {prefix}-hero" id="{prefix}-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 0X / Page 0X</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">中文标题</h1>
    <p class="page-hero-sub" style="opacity:0;">English Subtitle</p>
    <p class="{prefix}-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">一句话中文说明</p>
    <nav class="hero-quicknav" id="{prefix}-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#section-id">按钮文字</button>
    </nav>
    <div class="{prefix}-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>
```

**GSAP 动画（统一 timeline 模式，禁止用独立 gsap.fromTo）：**
```js
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl.fromTo('{eyebrow}', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
heroTl.fromTo('{title}',   { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
heroTl.fromTo('{sub}',     { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
heroTl.fromTo('{tagline}', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
heroTl.fromTo('{quicknav}',{ y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
heroTl.fromTo('{scroll}',  { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);
```

**Scroll-hint CSS（每页的 style 块中定义）：**
```css
.{prefix}-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: {prefix}-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}
@keyframes {prefix}-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
```

**关键规则（从 M1 审计中总结）：**
- 所有 hero 元素必须有 `opacity:0` inline style（GSAP fromTo 动画起始状态）
- Tagline max-width 统一 540px，不允许 520px 或 560px
- Subtitle 动画目标 opacity 为 0.5，不是 1.0
- Quicknav 必须用 `<nav>` 标签，不能用 `<div>`
- Scroll hint 用 `<div>`，class 必须有页面前缀（如 `p10-scroll-hint`）
- Hero 不放统计数字 / Hero Stats（如"6核心步骤 / 5格式"等数字展示）——这些属于第一个正文 section 的 count-up 动画，放在 Hero 内会与 GSAP 动画序列冲突，且在移动端造成布局拥挤
- **GSAP 必须从 ScrollAnimations.js 模块导入**，禁止用 `window.gsap`
  - ⚠️ **诊断清单**：若 hero 所有元素不可见（全黑/全空），第一步检查是否用了 `window.gsap` 而非 `import { gsap } from` ScrollAnimations.js——这是 M1 audit 中最常见的 root cause
  - ⚠️ **不要通过删除 `opacity:0`** 来规避 GSAP 失败——正确做法是修复 import，保留 `opacity:0` 以确保元素从不可见状态动画入场

### 导航与路由
- **路由格式**：`#home` / `#m1-p1` ~ `#m1-p10` / `#m2-p1` ~ `#m2-p6` / ... / `#ref`
- **桌面端**：侧边栏选模块 → 展开页面列表 → 点击进入长页面 → 纵向滚动浏览
- **移动端**：底部 Tab 选模块 → 页面列表 → 长页面 → 底部"下一篇"按钮

---

## 编码约定

### 语言
- 界面：中文，技术术语括号标注英文
- 注释：中文

### 页面模块
```js
// src/pages/m1/p01-color-theory.js
export function render() { return '<div class="page-scroll">...</div>'; }
export function init() { /* GSAP ScrollTrigger + CodeMirror + D3 初始化 */ }
export function destroy() { /* kill ScrollTrigger + dispose CodeMirror + cleanup */ }
```

### CSS
- 全部用 CSS 变量，不硬编码
- 断点：480 / 768 / 1024 / 1200px
- 明暗交替用 `.section-dark` / `.section-light`
- 移动端覆盖写在 mobile.css 或各组件的 `@media` 块中

### 动画
- 滚动动画：GSAP ScrollTrigger
- 微交互：CSS transition
- 缓动：`power3.out` / `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- destroy() 必须调用 `killAll()`（来自 ScrollAnimations.js），确保所有 ScrollTrigger 实例被清理
- 移动端：通过 `ScrollTrigger.matchMedia()` 为不同断点设置不同动画参数
- **gsap / ScrollTrigger 必须从 `ScrollAnimations.js` 导入**，禁止使用 `window.gsap` 或 `window.ScrollTrigger`（ES Module 和 CDN 全局变量是不同实例，混用会导致动画不生效或无法清理）
- Hero 入场动画使用 `gsap.timeline({ delay: 0.2 })`，所有页面统一时序
- **scroll 监听器必须使用 rAF ticking 模式**：用 `let ticking = false` + `requestAnimationFrame()` 包裹 DOM 读写，防止每帧 layout reflow 导致的抖动
- **不变量必须在监听器外缓存**：`bodyEl.offsetHeight`、`leftEl.offsetHeight`、`maxTranslate` 在 DOM 渲染后一次性计算，不在每次 scroll 回调中重算
- `window.addEventListener` scroll/touchmove 必须加 `{ passive: true }` 选项

### 触摸事件
- 所有 Canvas 交互必须同时绑定 mouse 和 touch 事件
- 使用 `pointer events` API 作为统一方案（pointerdown/pointermove/pointerup）
- Canvas `getPos()` 方法需兼容 `TouchEvent`

### 质量
- 所有交互完整可用，**不允许 placeholder**
- 控制台零报错
- 每个 Phase 完成后 git commit + 更新 todo.md
- 复杂页面先做 3-4 个核心 section 验证质量
- **移动端测试**：每个页面完成后在 Chrome DevTools 中用 iPhone SE / iPhone 14 / iPad 模拟器验证

### Footer CTA 规范
- Quote 文本不含引号符号（`"..."` 由 CSS `::before`/`::after` 自动添加）
- Quote 标签统一用 `<h2 class="page-footer-quote">`，不用 `<p>`
- 导航按钮标签使用目标页面标题（如 "← ggplot2 工作坊"），不用 generic "← 上一页"
- 按钮绑定使用 `getElementById` + `addEventListener`，不用 `onclick` 属性

---

## Skill 引用

**开发每个页面时，在 prompt 中加上这句话触发 frontend-design skill：**
```
请使用 frontend-design skill 来设计页面视觉。
```

这个 skill 包含避免"AI 审美"、追求 production-grade 视觉品质的具体指导，包括：
- 字体选择（避免 Inter/Roboto 等泛滥字体）
- 配色策略（主色+强调色，不是平均分配）
- 动画设计（高冲击力时刻 vs 散碎微交互）
- 空间构图（不对称/重叠/打破网格）
- 背景与纹理（渐变网格/噪点/几何图案/层叠透明度）

---

## 相关文件
- `design-spec.md` — CSS 变量 / GSAP 代码模板 / 组件样式 / 移动端规范
- `content-outline.md` — 首页 + 4 模块内容大纲（31 页 + 速查手册）
- `todo.md` — 按模块分阶段的开发进度
