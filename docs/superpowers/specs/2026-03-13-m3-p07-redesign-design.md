# M3-P07 素材资源站 — 重新设计规格

> **日期**：2026-03-13
> **范围**：`src/pages/m3/p07-resources.js` 完全重写
> **目标**：面向科研工作者的实用资源导航页，Apple 风格大卡片交错布局

---

## 1. 设计理念

### 问题

当前 p07 偏专业设计工具推荐（Illustrator、Figma、CorelDRAW），与目标用户（科研人员，非设计专业）需求脱节。Quiz 向导和许可证速查增加了页面复杂度但实用性有限。

### 方案

- **按资源类型分 7 个 section**，明暗交替，垂直叙事流
- **大卡片交错图文布局**（Apple 风格），每个资源配独特 SVG 装饰插图
- **去掉** Quiz 向导、许可证速查、免费/付费标签
- **7 类 × 3 个 = 21 个精选资源**，聚焦"简单易得、非专业友好"

---

## 2. 页面结构

```
Hero（深色，100vh）
│  快捷导航：7 个类别按钮
├─ S1 图标库（浅色）          id="p07-icons"
├─ S2 配色工具（深色）        id="p07-colors"
├─ S3 PPT / 演示模板（浅色）  id="p07-templates"
├─ S4 科研插图素材（深色）    id="p07-science"
├─ S5 矢量 / 通用素材（浅色） id="p07-vectors"
├─ S6 字体资源（深色）        id="p07-fonts"
├─ S7 教程 / 灵感（浅色）     id="p07-tutorials"
└─ Footer CTA
```

> **注意**：Hero 是深色，所以 S1 从浅色开始，保证明暗严格交替。

每个 section 结构：
```
┌─────────────────────────────────────┐
│ Section Header                       │
│   eyebrow（英文类别名）              │
│   title（中文标题）                  │
│   subtitle（一句话说明使用场景）     │
├─────────────────────────────────────┤
│ Resource 1: [SVG 插图] [名称+介绍+标签+链接] │  ← 左图右文
│ Resource 2: [名称+介绍+标签+链接] [SVG 插图] │  ← 右图左文
│ Resource 3: [SVG 插图] [名称+介绍+标签+链接] │  ← 左图右文
└─────────────────────────────────────┘
```

---

## 3. 资源清单

### S1 图标库（Icons）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | Iconfont | https://www.iconfont.cn/ | 阿里巴巴矢量图标库，2300 万+ 图标，支持在线改色和多格式导出 | 中文界面、SVG/PNG 导出 |
| 2 | Flaticon | https://www.flaticon.com/ | 全球最大扁平化图标库，900 万+ 图标，可按风格统一下载整套图标包 | 风格统一、整套下载 |
| 3 | The Noun Project | https://thenounproject.com/ | 高质量概念图标，覆盖各学科领域，风格简洁统一 | 学科覆盖广、SVG 格式 |

### S2 配色工具（Color Tools）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | Coolors | https://coolors.co/ | 按空格键即可生成配色方案，支持从图片提色和无障碍检查 | 一键生成、无障碍检查 |
| 2 | ColorBrewer | https://colorbrewer2.org/ | 数据可视化配色标杆，ggplot2 内置调色板的来源，色盲友好 | 数据可视化、色盲友好 |
| 3 | mycolor.space | https://mycolor.space/ | 输入一个颜色，自动生成多种风格的渐变和搭配方案 | 渐变生成、即时预览 |

### S3 PPT / 演示模板（Presentation Templates）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | OfficePlus | https://www.officeplus.cn/ | 微软官方模板平台，百万+ 模板，可通过 PPT 插件直接使用 | 微软官方、插件集成 |
| 2 | Slidesgo | https://slidesgo.com/ | 海量免费学术主题模板，支持 PowerPoint 和 Google Slides | 学术主题、免费下载 |
| 3 | iSlide | https://www.islide.cc/ | PPT 设计插件 + 模板平台，内置海量图标、图表、布局，一键美化 | PPT 插件、一键美化 |

### S4 科研插图素材（Scientific Illustrations）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | BioRender | https://www.biorender.com/ | 生命科学专用绘图平台，5 万+ 专业图标，拖拽式创作 | 生命科学、拖拽操作 |
| 2 | Servier Medical Art | https://smart.servier.com/ | 制药公司 Servier 出品的免费医学插图库，CC BY 许可 | 免费商用、医学专用 |
| 3 | SciDraw | https://scidraw.io/ | 开源科学插画仓库，覆盖多学科，SVG 格式可自由编辑 | 开源、多学科 |

### S5 矢量 / 通用素材（Vector Assets）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | Freepik | https://www.freepik.com/ | 综合矢量素材平台，涵盖插画、图标、照片，格式齐全 | 素材全面、格式丰富 |
| 2 | unDraw | https://undraw.co/ | 扁平风矢量插画库，支持在线自定义配色，免费商用 | 自定义配色、免费商用 |
| 3 | Vecteezy | https://www.vecteezy.com/ | 百万+ 矢量素材，提供在线编辑器，支持 AI/EPS/SVG 格式 | 在线编辑、格式多样 |

### S6 字体资源（Fonts）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | Google Fonts | https://fonts.google.com/ | 1500+ 免费开源字体，含优秀中英文学术字体，API 直接嵌入 | 免费开源、中英文 |
| 2 | 猫啃网 | https://www.maoken.com/ | 国内最全免费商用中文字体收录站，授权信息清晰可查 | 中文字体、授权清晰 |
| 3 | Font Squirrel | https://www.fontsquirrel.com/ | 精选商业授权免费字体，所有字体均经过许可验证，可安心用于发表 | 许可验证、学术安全 |

### S7 教程 / 灵感（Tutorials & Inspiration）

| # | 资源 | URL | 介绍 | 标签 |
|---|------|-----|------|------|
| 1 | R Graph Gallery | https://r-graph-gallery.com/ | 数百种 R 语言图表示例，每个都附完整可复现代码 | R 语言、可复现代码 |
| 2 | Python Graph Gallery | https://python-graph-gallery.com/ | Python 可视化教程库，覆盖 matplotlib / seaborn / plotly | Python、多库覆盖 |
| 3 | From Data to Viz | https://www.data-to-viz.com/ | 图表选择决策树——输入数据类型，推荐最合适的图表形式 | 决策辅助、图表选型 |

---

## 4. 卡片设计

### 单个资源卡片结构

```html
<div class="p07-resource-item {p07-item-reverse}">
  <div class="p07-resource-illustration">
    <!-- 独特 SVG 装饰插图，~160×120px，线条风格 -->
    <!-- 深色 section：薄荷绿线条 + 半透明填充 -->
    <!-- 浅色 section：深灰线条 + 浅色填充 -->
  </div>
  <div class="p07-resource-info">
    <h3 class="p07-resource-name">网站名称</h3>
    <p class="p07-resource-desc">一句话介绍，最多 2 行</p>
    <div class="p07-resource-tags">
      <span class="p07-tag">标签1</span>
      <span class="p07-tag">标签2</span>
    </div>
    <a href="URL" target="_blank" rel="noopener" class="p07-resource-link">
      访问网站 <span aria-hidden="true">→</span>
    </a>
  </div>
</div>
```

### 交错布局

- 奇数资源（1st, 3rd）：左图右文
- 偶数资源（2nd）：右图左文（添加 `.p07-item-reverse` class）
- 移动端（≤768px）：统一纵向堆叠（图上文下）

### SVG 插图设计原则

- 每个资源一个独特的 SVG 装饰插图
- 线条风格（stroke-based），不要实心填充块
- 深色 section：`stroke: rgba(149,213,178,0.6)`，`fill: rgba(149,213,178,0.08)`
- 浅色 section：`stroke: rgba(29,29,31,0.3)`，`fill: rgba(149,213,178,0.06)`
- 内容应抽象表达该资源的功能（如图标库用散落的图标形状，配色工具用色轮/调色板，字体用字母排版）
- 尺寸：桌面端 200×140px 区域，移动端 100% 宽度 × 120px

### CSS 变量与样式

```css
/* 资源卡片布局 */
.p07-resource-item {
  display: flex;
  align-items: center;
  gap: var(--space-xl);
  max-width: var(--w-full);
  margin: 0 auto var(--space-xl);
}
.p07-item-reverse {
  flex-direction: row-reverse;
}

/* 插图容器 */
.p07-resource-illustration {
  flex-shrink: 0;
  width: 200px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 信息区 */
.p07-resource-name {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  margin-bottom: 8px;
}
.p07-resource-desc {
  font-size: var(--text-body);
  line-height: 1.7;
  max-width: 480px;
  margin-bottom: 12px;
}

/* 标签 */
.p07-tag {
  font-size: 11px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  /* 深色 section */
  background: rgba(149,213,178,0.1);
  color: rgba(149,213,178,0.8);
}
.section-light .p07-tag {
  background: rgba(149,213,178,0.12);
  color: var(--module-3);
}

/* 访问链接 */
.p07-resource-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-caption);
  font-weight: 500;
  color: var(--module-3);
  text-decoration: none;
  transition: gap 0.2s ease;
  margin-top: 8px;
}
.p07-resource-link:hover { gap: 10px; }

/* 移动端 */
@media (max-width: 768px) {
  .p07-resource-item,
  .p07-item-reverse {
    flex-direction: column;
    text-align: center;
    gap: var(--space-md);
  }
  .p07-resource-illustration {
    width: 100%;
    height: 120px;
  }
  .p07-resource-desc { max-width: 100%; }
}
```

---

## 5. Section Header 设计

每个类别 section 的 header 结构：

```html
<div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
  <p class="section-eyebrow">Icons</p>
  <h2 class="section-title">图标库</h2>
  <p class="section-subtitle" style="max-width:540px;margin:0 auto;">
    科研海报、PPT、论文配图中常需要简洁的图标来表达概念——以下是最实用的图标资源站
  </p>
</div>
```

**注意**：`section-eyebrow`、`section-title`、`section-subtitle` 是项目内已有的全局 class（各页面普遍使用）。深色 section 需要在 header 元素上添加内联颜色覆盖：
- eyebrow: `style="color:rgba(149,213,178,0.7)"`
- title: `style="color:var(--text-on-dark)"`
- subtitle: `style="color:var(--text-on-dark-2)"`

### 各 Section 的 Header 文案

| Section | Eyebrow | Title | Subtitle |
|---------|---------|-------|----------|
| S1 | Icons | 图标库 | 科研海报、PPT、论文配图中常需要简洁的图标来表达概念——以下是最实用的图标资源站 |
| S2 | Color Tools | 配色工具 | 配色决定第一印象——用对工具，让每张图表和幻灯片的色彩都经得起推敲 |
| S3 | Templates | PPT / 演示模板 | 不必从零开始——专业模板让你把时间花在内容上，而不是排版上 |
| S4 | Scientific Illustrations | 科研插图素材 | 细胞、分子、实验装置……专业科研插图让你的论文配图不再"手绘风" |
| S5 | Vector Assets | 矢量 / 通用素材 | 矢量插画、背景纹理、装饰元素——为海报和演示增添视觉层次 |
| S6 | Fonts | 字体资源 | 字体是设计的骨架——选对字体，学术感和可读性兼得 |
| S7 | Tutorials & Inspiration | 教程 / 灵感 | 不知道该画什么图？这些网站提供完整代码和选型指南，照着做就行 |

---

## 6. Hero（对齐 M3 p01-p06 风格）

遵循 CLAUDE.md 标准 Hero 模板，风格与 M3 已有页面对齐。

### 文案

- **eyebrow**: Module 03 / Page 07
- **title**: 素材资源站
- **subtitle**: Design Resources & Tools
- **tagline**: 精选 21 个实用资源——图标、配色、模板、插图、字体、教程，按需取用
- **quicknav**: 7 个按钮，`data-target` 对应 section ID：
  - 图标库 → `#p07-icons`
  - 配色工具 → `#p07-colors`
  - 演示模板 → `#p07-templates`
  - 科研插图 → `#p07-science`
  - 矢量素材 → `#p07-vectors`
  - 字体资源 → `#p07-fonts`
  - 教程灵感 → `#p07-tutorials`
- **scroll-hint**: ↓ 向下探索

> **tagline 语气参考**（M3 已有页面统一为"一句话点题 + 动词短语"风格）：
> - p01: "一个像素，一把锁——理解两种格式的本质，选对格式就是选对工具"
> - p04: "5 步从平凡到出版级——直观可视化美化的完整工作流"
> - p06: "像 Nature 一样排版——掌握科研多图组合的视觉语言"

### 背景光晕（双层漂移，与 M3 统一模式）

```css
.p07-hero { position: relative; overflow: hidden; }
.p07-hero::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 55% 45% at 25% 40%, rgba(149,213,178,0.15) 0%, transparent 70%);
  animation: p07-drift-a 13s ease-in-out infinite;
  pointer-events: none;
}
.p07-hero::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 50% 40% at 75% 60%, rgba(126,200,227,0.10) 0%, transparent 65%);
  animation: p07-drift-b 9s ease-in-out infinite reverse;
  pointer-events: none;
}
@keyframes p07-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(24px,-14px)} }
@keyframes p07-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-18px,20px)} }
```

> M3 一致性：drift-a 12-14s，drift-b 8-10s reverse，薄荷绿 + 天蓝双色，opacity 0.10-0.18。

### Hero GSAP Timeline（统一时序，禁止独立 fromTo）

```js
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl.fromTo('.p07-hero .hero-eyebrow',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
heroTl.fromTo('.p07-hero .page-hero-title',{ y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
heroTl.fromTo('.p07-hero .page-hero-sub', { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
heroTl.fromTo('.p07-hero-tagline',        { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
heroTl.fromTo('#p07-quicknav',            { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
heroTl.fromTo('.p07-scroll-hint',         { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);
```

### Scroll Hint CSS

```css
.p07-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: p07-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}
@keyframes p07-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
```

---

## 7. 动画规格（高级感动效）

### 7.1 Section Header 入场

每个 section header 使用 `fadeIn()` 滚动渐入，与 M3 所有页面一致：
```js
fadeIn('#p07-icons .section-header', { trigger: '#p07-icons' });
fadeIn('#p07-colors .section-header', { trigger: '#p07-colors' });
// ... 7 个 section 各一个
```

### 7.2 资源卡片入场（核心动效，分桌面端/移动端）

**桌面端（≥769px）— 交错方向 + 缩放 + 位移三重组合**

每张卡片的入场动画根据交错方向不同，有不同的 x 偏移方向：

```js
ScrollTrigger.matchMedia({
  '(min-width: 769px)': function() {
    document.querySelectorAll('.p07-resource-item').forEach(item => {
      const isReverse = item.classList.contains('p07-item-reverse');
      const illust = item.querySelector('.p07-resource-illustration');
      const info   = item.querySelector('.p07-resource-info');

      // 整体卡片：opacity + y 入场
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      // 插图：从对应方向滑入 + 缩放
      gsap.fromTo(illust,
        { opacity: 0, x: isReverse ? 40 : -40, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' } }
      );

      // 信息区：从反方向微移入场 + stagger 子元素
      const infoChildren = info.querySelectorAll('.p07-resource-name, .p07-resource-desc, .p07-resource-tags, .p07-resource-link');
      gsap.fromTo(infoChildren,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.25,
          scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' } }
      );
    });
  },

  '(max-width: 768px)': function() {
    // 移动端：简化为纯 y 入场，无 x 偏移和 scale
    document.querySelectorAll('.p07-resource-item').forEach(item => {
      gsap.fromTo(item,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' } }
      );
    });
  }
});
```

**动效拆解（为什么这样设计）**：
- **整体卡片 y:50**：大位移营造"从下方升起"的重量感（M3 p06 用 y:35-40 做卡片入场）
- **插图 x 偏移 + scale 0.9→1**：方向性入场增强交错布局的节奏感；缩放从 0.9 起步（不是 0.5），微妙但有高级感
- **信息区子元素 stagger 0.08s**：名称→介绍→标签→链接依次出现，创造"内容逐行揭示"的阅读引导（M3 p06 的 spec-items 也用 0.08s stagger）
- **delay 分层**：整体 0s → 插图 0.15s → 文字 0.25s，三层时间差制造深度

### 7.3 SVG 插图微动画（hover / idle）

每个 SVG 装饰插图应有轻微的 idle 动画增加页面活力：

```css
/* SVG 内部路径的 idle 呼吸动画 */
.p07-resource-illustration svg {
  transition: transform 0.4s var(--ease-apple);
}
.p07-resource-item:hover .p07-resource-illustration svg {
  transform: scale(1.05);
}

/* SVG 内特定路径可添加描边动画 */
.p07-resource-illustration .p07-svg-accent {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  transition: stroke-dashoffset 0.8s ease;
}
.p07-resource-item:hover .p07-svg-accent {
  stroke-dashoffset: 0;
}
```

> **桌面端 only**：hover 效果通过 `@media (hover: hover)` 限定，触摸设备不触发。

```css
@media (hover: hover) {
  .p07-resource-item:hover .p07-resource-illustration svg { transform: scale(1.05); }
  .p07-resource-item:hover .p07-svg-accent { stroke-dashoffset: 0; }
}
```

### 7.4 访问链接交互反馈

```css
.p07-resource-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-caption);
  font-weight: 500;
  color: var(--module-3);
  text-decoration: none;
  transition: gap 0.25s var(--ease-apple), color 0.25s var(--ease-apple);
  margin-top: 8px;
}
@media (hover: hover) {
  .p07-resource-link:hover {
    gap: 12px;
    color: var(--accent-hover);
  }
}
.p07-resource-link:active {
  transform: scale(0.97);
}
```

### 7.5 Section 过渡装饰（可选，增加高级感）

相邻明暗 section 之间可添加一个渐变过渡带，避免硬切割：

```css
/* 浅→深过渡 */
.p07-section-transition-to-dark {
  height: 120px;
  background: linear-gradient(to bottom, var(--bg-light) 0%, var(--bg-dark) 100%);
  pointer-events: none;
}
/* 深→浅过渡 */
.p07-section-transition-to-light {
  height: 120px;
  background: linear-gradient(to bottom, var(--bg-dark) 0%, var(--bg-light) 100%);
  pointer-events: none;
}
```

> 实现时可选：如果 7 个 section 之间加 6 个过渡带导致页面过长，可省略此项。

### 7.6 Footer CTA 入场

```js
fadeIn('.page-footer-cta', { trigger: '.page-footer-cta', y: 40 });
```

---

## 8. Footer CTA

```html
<section class="page-footer-cta">
  <p class="page-footer-num">07 / 07</p>
  <h2 class="page-footer-quote">工欲善其事，必先利其器——选对工具，事半功倍。</h2>
  <p class="page-footer-desc">模块三「矢量绘图与设计」到此完结。模块四将带你进入学术演示设计的世界。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p07-prev-btn">← 多面板 Figure 组合</button>
    <button class="btn-primary" id="p07-next-btn">进入模块四 →</button>
  </div>
</section>
```

> 两按钮模式：ghost（上一页）+ primary（下一页），符合 design-spec.md Footer CTA 规范。

---

## 9. 移动端适配规格（≤768px）

本页面为纯展示型（无 Canvas、CodeMirror、拖拽等复杂交互），移动端适配聚焦于**布局重排、触控优化、动画简化**。

### 9.1 Hero 移动端

```css
@media (max-width: 768px) {
  .p07-hero .page-hero-title {
    font-size: clamp(1.8rem, 6vw, 2.5rem);
  }
  .p07-hero-tagline {
    max-width: 90vw;
    font-size: 15px;
    line-height: 1.7;
    padding: 0 var(--space-sm);
  }
}
```

### 9.2 Quicknav（7 按钮换行处理）

桌面端 7 个 quicknav 按钮一行排列。移动端按钮多，需要换行：

```css
@media (max-width: 768px) {
  #p07-quicknav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    max-width: 90vw;
  }
  .hero-quicknav__item {
    font-size: 12px;
    padding: 6px 12px;
  }
}
@media (max-width: 400px) {
  /* 极窄屏：纵向两列 */
  #p07-quicknav {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    width: 100%;
    padding: 0 20px;
  }
  .hero-quicknav__item {
    text-align: center;
  }
}
```

### 9.3 资源卡片移动端布局

```css
@media (max-width: 768px) {
  /* 所有卡片统一纵向堆叠，取消交错 */
  .p07-resource-item,
  .p07-item-reverse {
    flex-direction: column;
    text-align: center;
    gap: var(--space-md);
  }

  /* 插图区域：全宽，固定高度 */
  .p07-resource-illustration {
    width: 100%;
    height: 120px;
  }

  /* 信息区：全宽居中 */
  .p07-resource-info {
    width: 100%;
    align-items: center;
  }
  .p07-resource-desc {
    max-width: 100%;
    font-size: 15px;
    line-height: 1.6;
  }

  /* 资源名称 */
  .p07-resource-name {
    font-size: 1.2rem;
  }

  /* 标签 */
  .p07-resource-tags {
    justify-content: center;
  }
  .p07-tag {
    font-size: 11px;
    padding: 3px 10px;
  }

  /* 访问链接：加大触控区域 */
  .p07-resource-link {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
  }

  /* 卡片间距 */
  .p07-resource-item + .p07-resource-item {
    margin-top: var(--space-lg);
  }
}
```

### 9.4 Section 间距

```css
@media (max-width: 768px) {
  /* Section padding 缩减 */
  [id^="p07-"] {
    padding: 60px 16px;
    scroll-margin-top: 56px;
  }

  /* Section header 间距 */
  .section-header {
    margin-bottom: var(--space-lg);
  }
  .section-subtitle {
    max-width: 100%;
    font-size: 14px;
    padding: 0 8px;
  }
}
```

### 9.5 触控交互

| 元素 | 桌面端 | 移动端 |
|------|--------|--------|
| SVG hover scale(1.05) | `@media (hover: hover)` 内 | 不触发，保持静态 |
| 链接 gap 6→12px | hover 触发 | 不触发；`:active` 时 `scale(0.97)` 提供点击反馈 |
| 描边动画 dashoffset | hover 触发 | 不触发 |
| 整张卡片 | 无额外效果 | 可选：`:active` 时轻微 `scale(0.98)` 提供触觉反馈 |

```css
/* 移动端触控反馈 */
@media (hover: none) {
  .p07-resource-link:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}
```

### 9.6 动画简化（已在 7.2 中通过 matchMedia 实现）

移动端动画变化要点：
- 卡片入场：`y: 25`（桌面 50），无 x 偏移，无 scale
- `start: 'top 90%'`（桌面 85%），更早触发避免用户等待
- `duration: 0.5s`（桌面 0.7s），更短更干脆
- 无 stagger 子元素（整张卡片一起出现）
- Section header 的 `fadeIn()` 保留但减少 y 值

### 9.7 Footer CTA 移动端

Footer CTA 使用全局样式，无需额外适配。按钮在窄屏自动换行（`flex-wrap: wrap`）。

---

## 10. 删除内容

- Quiz 工具推荐向导（整个 S2）
- 许可证速查（整个 S3）
- 所有旧资源数据（RESOURCES / QUIZ_QUESTIONS / LICENSES 数组）
- 免费/付费/操作系统/难度等级字段
- 所有 Quiz 相关函数（scoreResource / getRecommendations / buildWhyText / showQuizResults / resetQuiz / handleOptionClick）

---

## 11. 技术约束

- `gsap` / `ScrollTrigger` 必须从 `ScrollAnimations.js` 导入
- `navigateTo` 从 `router.js` 导入（Footer 按钮导航）
- 外链使用 `target="_blank" rel="noopener"`
- 代码块 `white-space: pre-wrap`
- 所有 hero 元素 `opacity:0` inline style
- `destroy()` 必须调用 `killAll()` 并清理所有事件监听
- scroll 监听器使用 `{ passive: true }`
- 移动端所有 section 设置 `scroll-margin-top: 56px`（全局已有规则，但页面 `<style>` 中应显式包含 `@media (max-width: 768px) { #p07-icons, #p07-colors, ... { scroll-margin-top: 56px; } }`）
- SVG 插图：21 个独特 SVG，线条风格，可在实现时逐步完善。首轮实现可使用简化版 SVG（几何形状 + 线条组合），后续迭代提升精度
- 实现前应验证所有 21 个 URL 可访问（尤其是 officeplus.cn、scidraw.io、mycolor.space）
