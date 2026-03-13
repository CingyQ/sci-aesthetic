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
├─ S1 图标库（深色）
├─ S2 配色工具（浅色）
├─ S3 PPT / 演示模板（深色）
├─ S4 科研插图素材（浅色）
├─ S5 矢量 / 通用素材（深色）
├─ S6 字体资源（浅色）
├─ S7 教程 / 灵感（深色）
└─ Footer CTA
```

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
  color: #2e7d52;
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

深色 section 的 eyebrow / subtitle 需要添加对应的颜色覆盖（`color: var(--text-on-dark-2)` 等）。

---

## 6. Hero

遵循 CLAUDE.md 标准 Hero 模板：

- **eyebrow**: Module 03 / Page 07
- **title**: 素材资源站
- **subtitle**: Design Resources & Tools
- **tagline**: 精选 21 个实用资源——图标、配色、模板、插图、字体、教程，按需取用
- **quicknav**: 7 个按钮（图标库 / 配色工具 / 演示模板 / 科研插图 / 矢量素材 / 字体资源 / 教程灵感）
- **scroll-hint**: ↓ 向下探索
- **背景光晕**: 薄荷绿 + 天蓝双色漂移（与 M3 模块色调一致）

---

## 7. 动画

### Hero
标准 timeline 模式（见 CLAUDE.md Hero 规范）。

### Section Headers
每个 section header 使用 `fadeIn()` 滚动渐入。

### 资源卡片
- 每张卡片独立 ScrollTrigger
- `gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } })`
- 插图区域额外添加 `scale: 0.95 → 1` 的缩放效果
- 交错布局的卡片还可以添加轻微的 `x` 偏移入场（左图从左滑入，右图从右滑入）

### 移动端
- 减少 `y` 偏移（40 → 25）
- 去掉 `x` 偏移和 `scale` 效果
- 通过 `ScrollTrigger.matchMedia` 区分

---

## 8. Footer CTA

```html
<section class="page-footer-cta">
  <p class="page-footer-num">07 / 07</p>
  <h2 class="page-footer-quote">工欲善其事，必先利其器——选对工具，事半功倍。</h2>
  <p class="page-footer-desc">模块三「矢量绘图与设计」到此完结。模块四将带你进入学术演示设计的世界。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p07-prev-btn">← 多面板 Figure 组合</button>
    <button class="btn-ghost" id="p07-home-btn">返回模块首页</button>
    <button class="btn-primary" id="p07-next-btn">进入模块四 →</button>
  </div>
</section>
```

---

## 9. 删除内容

- Quiz 工具推荐向导（整个 S2）
- 许可证速查（整个 S3）
- 所有旧资源数据（RESOURCES / QUIZ_QUESTIONS / LICENSES 数组）
- 免费/付费/操作系统/难度等级字段
- 所有 Quiz 相关函数（scoreResource / getRecommendations / buildWhyText / showQuizResults / resetQuiz / handleOptionClick）

---

## 10. 技术约束

- `gsap` / `ScrollTrigger` 必须从 `ScrollAnimations.js` 导入
- 外链使用 `target="_blank" rel="noopener"`
- 代码块 `white-space: pre-wrap`
- 所有 hero 元素 `opacity:0` inline style
- `destroy()` 必须调用 `killAll()` 并清理所有事件监听
- scroll 监听器使用 `{ passive: true }`
