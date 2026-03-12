# Phase 6: 模块三 矢量绘图与设计 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 开发模块三全部 7 个页面（m3-p1 ~ m3-p7），内容涵盖矢量 vs 位图、Illustrator 工具、贝塞尔曲线编辑器、图表美化实战、SVG 编辑、多面板 Figure 排版、素材资源站。

**Architecture:** 每页是独立的 ES Module（render + init + destroy），遵循 CLAUDE.md 的页面结构规范（Hero → section 交替 → Footer CTA）。使用 JS transform 模拟 sticky（非 CSS sticky），GSAP 从 ScrollAnimations.js 导入，Canvas/D3 负责核心交互。

**Tech Stack:** Vanilla JS + GSAP（ScrollAnimations.js）+ D3.js + Canvas API + CodeMirror 6（p05）+ SortableJS（p06）+ Prism.js（只读代码块）。模块标识色 `--module-3: #95D5B2`（薄荷绿）。

---

## 设计分析与改进意见

### 当前 M1/M2 模式的已知优点
- JS transform sticky（非 CSS sticky）——已验证跨浏览器稳定
- rAF ticking 模式防 layout reflow
- Hero 统一 GSAP timeline（delay: 0.2）
- 列表+预览浏览器布局（左列表 ≤400px + 右 sticky 预览）
- 模块标识色只用于导航和高亮，不主导页面配色

### M3 内容设计改进建议

| 页面 | 原规划 | 改进方向 |
|------|--------|---------|
| p01 | 简单 BeforeAfter 缩放对比 | 新增**实时缩放滑块**（0-800%），位图用 Canvas 像素化渲染，矢量用 SVG 无损放大；决策树用 D3 动态路径动画 |
| p02 | 12 工具卡片列表 | 工具列表 + 右侧 **SVG CSS 动画演示**（每个工具有独立 SVG 动画展示操作过程）；工具链工作流用 D3 有向图 |
| p03 | Canvas 贝塞尔编辑器 | 增加**预设曲线库**（科研场景常用形状：弯箭头/平滑连接线/S 曲线）；Challenge 模式用 SVG Path 相似度计算（RMSE）；移动端 44px 触控点 |
| p04 | 8 组 BeforeAfter | 精简为 **5 组高质量 D3 生成的 SVG**（每组 Bad/Good 均用代码精心绘制，不是截图）；5 步粘性流用同一数据集渐进变换，突出关键差异 |
| p05 | CodeMirror SVG 编辑器 | 内置 **6 个科研 SVG 模板**（箭头/流程框/路径/文本/渐变/分子结构）；增加实时字节数显示；"优化"按钮展示路径精简效果 |
| p06 | SortableJS 面板拖拽 | 增加 **Nature/Cell 标准面板标注规范**（a/b/c 字母位置、字号、字体）；面板按钮切换预设布局（2栏/3栏/L型/Z型）；R patchwork + Python subplot 双代码联动 |
| p07 | 资源卡片 | 资源真实可用（附实际 URL）；筛选逻辑精细（免费/付费/科研专用/通用）；推荐问答器有 4-5 个问题，给出精准建议 |

---

## 文件结构

### 修改的文件
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p01-vector-vs-raster.js` — 矢量 vs 位图
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p02-illustrator-tools.js` — Illustrator 工具
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p03-bezier.js` — 贝塞尔曲线编辑器
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p04-chart-beautify.js` — 图表美化实战
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p05-svg-editing.js` — SVG 编辑与优化
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p06-multi-panel.js` — 多面板 Figure 组合
- `E:/Claude-project/sci-aesthetic/src/pages/m3/p07-resources.js` — 素材资源站
- `E:/Claude-project/sci-aesthetic/todo.md` — 更新进度

### 参考文件（只读，用于学习设计模式）
- `src/pages/m2/p01-ai-overview.js` — Hero 模板 + 场景判断器模式
- `src/pages/m1/p05-chart-selection.js` — 列表+预览浏览器 + D3 决策树
- `src/pages/m1/p06-ggplot2-grammar.js` — JS sticky 粘性步骤 + D3 图
- `src/pages/m1/p10-workflow-export.js` — 粘性步骤 rAF ticking 模式
- `src/pages/m2/p03-vectorization.js` — Tab 切换器 + 5步骤卡片
- `src/components/ScrollAnimations.js` — 仅从此导入 gsap/ScrollTrigger

---

## 关键技术约束（执行前必读）

1. **GSAP 导入**：`import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js'`，**禁止** `window.gsap`
2. **Sticky 实现**：用 JS transform 模拟（见 design-spec.md 中的 rAF ticking 示例），**禁止** `position:sticky` 和 GSAP pin
3. **Hero 规范**：所有元素必须有 `opacity:0` inline style；GSAP timeline delay:0.2；subtitle opacity 目标 0.5；无 hero stats
4. **代码块**：`white-space: pre-wrap`，**禁止** `white-space: pre`
5. **滚动监听**：`{ passive: true }` + rAF ticking + 不变量缓存
6. **Canvas touch**：使用 Pointer Events API；`getPos()` 兼容 TouchEvent
7. **移动端**：正文 ≥16px；section `scroll-margin-top: 56px`；触控目标 ≥44px
8. **destroy()**：必须调用 `killAll()`，移除所有 scroll listener，dispose CodeMirror

---

## Chunk 1: p01 矢量 vs 位图 + p02 Illustrator 工具

### Task 1: m3-p1 矢量 vs 位图

**Files:**
- Modify: `src/pages/m3/p01-vector-vs-raster.js`

**页面结构：**
```
Hero (深色) → S1 两种格式本质(浅色) → S2 实时缩放对比(深色) → S3 格式决策树(浅色) → S4 科研场景指南(深色) → Footer CTA
```

**核心交互组件：**

**S2 缩放对比演示（Canvas vs SVG）：**
```js
// 左侧：Canvas 位图（固定分辨率，缩放时像素化）
// 右侧：SVG 矢量（无限缩放，始终清晰）
// 一个水平滑块控制两侧同步缩放（1x → 8x）
// 在 200% 以上，左侧出现明显锯齿，右侧保持清晰
const renderRasterSide = (canvas, scale) => {
  // 在低分辨率 ctx 上画图，然后用 CSS transform scale 放大
  // 刻意不用 devicePixelRatio，模拟 72dpi 位图放大
};
const renderVectorSide = (svgEl, scale) => {
  svgEl.setAttribute('transform', `scale(${scale})`);
  // SVG 无论 scale 多大都用 viewBox 精确渲染
};
```

**S3 D3 决策树（交互式）：**
```js
// 节点：科研场景选择题
// 动画：点击选项后，路径高亮（薄荷绿）并展开下一级
// 最终叶节点：显示推荐格式 + 具体理由 + 常用软件
const DECISION_TREE = {
  question: '你的图表是否包含精确数值/坐标轴？',
  yes: { question: '是否会在报告/论文中缩放显示？', yes: { result: 'PDF/SVG', reason: '...' }, no: { result: 'PNG 300dpi', reason: '...' } },
  no: { question: '是否是照片或渐变丰富的图像？', yes: { result: 'TIFF 300dpi', reason: '...' }, no: { result: 'SVG/PDF', reason: '...' } }
};
```

**S4 文件大小 vs 质量权衡（交互式滑块）：**
```js
// 复杂度滑块（1-10）模拟不同复杂度图表的文件大小变化
// 折线图：X轴=图表复杂度，Y轴=文件大小(KB)
// SVG 线：随复杂度线性增长（简单=3KB，复杂=200KB）
// PNG 线：几乎水平（固定分辨率下与内容无关）
// TIFF 线：水平（纯尺寸决定）
```

- [ ] **Step 1: 写 render() — HTML 结构**

完整 HTML 包含：Hero（薄荷绿光晕）、S1 两格式对比卡片（图文交错）、S2 Canvas vs SVG 缩放演示区、S3 D3 决策树容器、S4 文件大小图表容器、Footer CTA（← 模块三入口 / → Illustrator 工具 →）

- [ ] **Step 2: 写 CSS（style 块内）**

```css
/* Hero 薄荷绿光晕 */
.p01m3-hero::before { background: radial-gradient(ellipse 60% 50% at 30% 40%, rgba(149,213,178,0.15) 0%, transparent 70%); animation: p01m3-drift-a 12s ease-in-out infinite; }
.p01m3-hero::after  { background: radial-gradient(ellipse 50% 40% at 70% 65%, rgba(126,200,227,0.08) 0%, transparent 70%); animation: p01m3-drift-b 9s ease-in-out infinite reverse; }
/* 缩放演示区 */
.p01m3-zoom-wrap { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:start; }
.p01m3-zoom-pane { position:relative; overflow:hidden; background:#000; border-radius:var(--radius-md); aspect-ratio:4/3; }
.p01m3-zoom-label { position:absolute; top:var(--space-sm); left:var(--space-sm); font-size:var(--text-caption); padding:4px 10px; border-radius:var(--radius-full); font-family:var(--font-code); }
.p01m3-zoom-slider { width:100%; margin:var(--space-md) 0; }
/* 决策树 */
.p01m3-tree-svg { width:100%; overflow:visible; }
/* 响应式 */
@media (max-width:768px) {
  .p01m3-zoom-wrap { grid-template-columns:1fr; }
  #p01m3-s1, #p01m3-s2, #p01m3-s3, #p01m3-s4 { scroll-margin-top:56px; }
}
```

- [ ] **Step 3: 写 init() — GSAP Hero 动画**

```js
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl.fromTo('.p01m3-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
heroTl.fromTo('.p01m3-title',   { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
heroTl.fromTo('.p01m3-sub',     { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
heroTl.fromTo('.p01m3-tagline', { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
heroTl.fromTo('#p01m3-quicknav',{ y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
heroTl.fromTo('.p01m3-scroll-hint', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);
```

- [ ] **Step 4: 写 init() — Canvas 位图演示**

```js
function initZoomDemo() {
  const rasterCanvas = document.getElementById('p01m3-raster-canvas');
  const svgEl = document.getElementById('p01m3-vector-svg');
  const slider = document.getElementById('p01m3-zoom-slider');
  const scaleLabel = document.getElementById('p01m3-scale-label');

  // 在低分辨率 canvas 上绘制科研散点图（故意用低 dpi）
  const ctx = rasterCanvas.getContext('2d');
  rasterCanvas.width = 120;  // 故意低分辨率
  rasterCanvas.height = 90;
  drawLowResChart(ctx);

  slider.addEventListener('input', () => {
    const scale = parseFloat(slider.value);
    scaleLabel.textContent = scale.toFixed(1) + 'x';
    // Canvas 用 CSS transform 放大（像素化）
    rasterCanvas.style.transform = `scale(${scale})`;
    rasterCanvas.style.imageRendering = 'pixelated';
    // SVG 用 viewBox 缩小（等效于放大内容）
    const vbSize = 100 / scale;
    svgEl.setAttribute('viewBox', `0 0 ${vbSize} ${vbSize}`);
    // 200% 以上显示"像素化提示" badge
    document.getElementById('p01m3-raster-badge').style.opacity = scale >= 2 ? 1 : 0;
  });
}
```

- [ ] **Step 5: 写 init() — D3 决策树**

```js
function initDecisionTree() {
  // 扁平的 if-else 树，用 D3 elk/force 布局渲染为圆角矩形节点图
  // 点击选项 → 路径薄荷绿高亮 → 展开下一层节点（gsap fadeIn）
  // 到达叶节点显示推荐结果卡片
}
```

- [ ] **Step 6: 写 init() — 文件大小折线图（D3）**

```js
// 简单折线图，3条线（SVG/PNG/TIFF），X轴=内容复杂度，Y轴=文件大小KB
// 悬停高亮当前位置 + tooltip
function initFileSizeChart() { /* D3 SVG 折线图 */ }
```

- [ ] **Step 7: 写 init() — fadeIn 动画 + quicknav**

```js
fadeIn('.p01m3-concept-card', { stagger: 0.1, y: 40 });
// quicknav 平滑滚动
document.querySelectorAll('#p01m3-quicknav .hero-quicknav__item').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

- [ ] **Step 8: 写 destroy()**

```js
export function destroy() {
  killAll();
  // 移除 zoom slider 监听器
}
```

- [ ] **Step 9: 在浏览器中验证**
  - Hero 动画正常（薄荷绿光晕 + GSAP timeline）
  - 缩放滑块：200% 以上 Canvas 像素化，SVG 始终清晰
  - D3 决策树可点击，路径正确高亮
  - 移动端：两列变单列，section scroll-margin-top 正确

- [ ] **Step 10: git commit**
```bash
git add src/pages/m3/p01-vector-vs-raster.js
git commit -m "feat(m3): add p01 vector vs raster page with Canvas/SVG zoom demo and D3 decision tree"
```

---

### Task 2: m3-p2 Illustrator 工具

**Files:**
- Modify: `src/pages/m3/p02-illustrator-tools.js`

**页面结构：**
```
Hero (深色) → S1 工具浏览器(浅色，列表+预览) → S2 工具组合工作流(深色，D3有向图) → S3 快捷键速查(浅色) → Footer CTA
```

**工具数据（12个）：**
```js
const TOOLS = [
  { id: 'select',     name: '选择工具 (V)',      shortcut: 'V',       category: 'selection',
    desc: '选中、移动、变换完整对象。按住 Shift 多选，拖拽边框缩放。',
    use: '选中并移动图表元素、调整整体布局',
    svgDemo: '...' /* SVG CSS 动画演示选中框出现和移动 */ },
  { id: 'direct',     name: '直接选择 (A)',       shortcut: 'A',       category: 'selection', ... },
  { id: 'pen',        name: '钢笔工具 (P)',        shortcut: 'P',       category: 'draw',
    desc: '点击创建角点，拖拽创建贝塞尔曲线。点击锚点可切换角点/曲线点。',
    use: '绘制自定义箭头、连接线、有机形状', ... },
  { id: 'anchor',     name: '锚点转换 (Shift+C)', shortcut: 'Shift+C', category: 'draw', ... },
  { id: 'type',       name: '文字工具 (T)',        shortcut: 'T',       category: 'text', ... },
  { id: 'areatype',   name: '区域文字',            shortcut: '-',       category: 'text', ... },
  { id: 'pathfinder', name: 'Pathfinder',          shortcut: 'Shift+Ctrl+F9', category: 'shape',
    desc: '布尔运算：联集/交集/差集/分割。将多个形状合并或裁剪。',
    use: '制作自定义箭头形状、挖空文字', ... },
  { id: 'align',      name: '对齐工具',            shortcut: '-',       category: 'layout', ... },
  { id: 'group',      name: '编组 (Ctrl+G)',       shortcut: 'Ctrl+G',  category: 'layout', ... },
  { id: 'eyedropper', name: '吸管工具 (I)',         shortcut: 'I',       category: 'color', ... },
  { id: 'gradient',   name: '渐变工具 (G)',         shortcut: 'G',       category: 'color', ... },
  { id: 'artboard',   name: '画板工具 (Shift+O)',  shortcut: 'Shift+O', category: 'layout',
    desc: '创建和管理多个画板，控制输出范围。每个画板可导出为独立文件。',
    use: '管理多面板 Figure，批量导出 a/b/c 子图', ... },
];
```

**SVG Demo 动画（CSS keyframes）：**
每个工具的演示是一段 SVG + CSS animation，内嵌在工具数据中：
- `select`：矩形选中框从无到有，然后拖动对象
- `pen`：依次出现锚点和贝塞尔曲线
- `pathfinder`：两个圆形叠加，执行布尔运算变为一个形状
- `align`：多个矩形对齐到中轴线

**工作流 D3 有向图（S2）：**
```js
const WORKFLOWS = [
  {
    id: 'arrow',
    title: '工作流 1：自定义科研箭头',
    steps: ['钢笔(P) 绘制路径', '描边→轮廓化(Shift+Ctrl+O)', 'Pathfinder 联集', '锚点转换(Shift+C) 调整弧度', '吸管(I) 匹配配色'],
    output: '可复用的矢量箭头符号'
  },
  {
    id: 'text-mask',
    title: '工作流 2：图表配色统一',
    steps: ['选择工具(V) 全选', '吸管(I) 采样论文配色', '编辑→编辑颜色→重新着色', 'Ctrl+G 编组保存', '画板(Shift+O) 导出单图'],
    output: '配色统一的多图表集'
  },
  {
    id: 'multi-panel',
    title: '工作流 3：多面板 Figure',
    steps: ['画板(Shift+O) 设置期刊尺寸', '对齐工具 精确排列', '文字(T) 添加 a/b/c 标注', '编组(Ctrl+G) 管理层级', '导出→存储为 PDF'],
    output: '出版级多面板图'
  }
];
```

- [ ] **Step 1: 写 render() — HTML 结构**

包含：Hero（薄荷绿光晕）、S1 工具浏览器（左侧分类筛选+工具列表，右侧 SVG 演示面板）、S2 工作流有向图（3个工作流 Tab）、S3 快捷键表格、Footer CTA

- [ ] **Step 2: 写 CSS（style 块内）**

```css
/* 工具浏览器 */
.p02m3-browser { display:grid; grid-template-columns:280px 1fr; gap:var(--space-lg); align-items:start; }
.p02m3-tool-list { max-height:600px; overflow-y:auto; }
.p02m3-tool-item { display:flex; align-items:center; gap:var(--space-sm); padding:12px var(--space-sm); border-radius:var(--radius-sm); cursor:pointer; transition:background 0.2s; border-left:3px solid transparent; }
.p02m3-tool-item:hover { background:var(--bg-light-alt); }
.p02m3-tool-item.active { background:rgba(149,213,178,0.1); border-color:var(--module-3); }
.p02m3-tool-shortcut { font-family:var(--font-code); font-size:var(--text-caption); padding:2px 8px; background:var(--bg-light-alt); border-radius:4px; color:var(--text-on-light-2); }
/* SVG 演示区 */
.p02m3-demo-pane { background:var(--bg-light-elevated); border-radius:var(--radius-md); padding:var(--space-lg); min-height:300px; border:1px solid var(--border-light); }
.p02m3-demo-svg-wrap { background:#f8f8f8; border-radius:var(--radius-sm); padding:var(--space-md); aspect-ratio:4/3; display:flex; align-items:center; justify-content:center; overflow:hidden; }
/* 快捷键表 */
.p02m3-kbd-table { width:100%; border-collapse:collapse; }
.p02m3-kbd-table td { padding:10px 16px; border-bottom:1px solid var(--border-light); font-size:0.9rem; }
.p02m3-kbd { font-family:var(--font-code); background:var(--bg-light-alt); border:1px solid var(--border-light); border-radius:6px; padding:3px 10px; font-size:0.82rem; white-space:nowrap; }
/* 响应式 */
@media (max-width:900px) { .p02m3-browser { grid-template-columns:1fr; } .p02m3-tool-list { max-height:300px; } }
@media (max-width:768px) { #p02m3-s1, #p02m3-s2, #p02m3-s3 { scroll-margin-top:56px; } }
```

- [ ] **Step 3: 写 init() — Hero 动画（同 p01 模式，前缀 p02m3）**

- [ ] **Step 4: 写 init() — 工具浏览器交互**

```js
function initToolBrowser() {
  const items = document.querySelectorAll('.p02m3-tool-item');
  const demoArea = document.getElementById('p02m3-demo-pane');

  function showTool(tool) {
    // 更新左侧 active 状态
    items.forEach(i => i.classList.toggle('active', i.dataset.id === tool.id));
    // 更新右侧详情：名称、描述、科研用例、快捷键、SVG 动画
    demoArea.innerHTML = buildDemoHTML(tool);
    // 重新触发 SVG CSS animation（先移除 class 再添加）
    const svgAnim = demoArea.querySelector('.p02m3-anim-svg');
    if (svgAnim) { svgAnim.classList.remove('play'); void svgAnim.offsetWidth; svgAnim.classList.add('play'); }
  }
  items.forEach(item => {
    item.addEventListener('click', () => {
      const tool = TOOLS.find(t => t.id === item.dataset.id);
      if (tool) showTool(tool);
    });
  });
  // 默认显示第一个工具
  showTool(TOOLS[0]);
}
```

- [ ] **Step 5: 写 init() — 工作流 Tab + D3 有向图**

每个工作流渲染为横向步骤流程图（节点=圆角矩形，箭头=SVG path），点击 Tab 切换，GSAP stagger 动画入场。

- [ ] **Step 6: git commit**
```bash
git add src/pages/m3/p02-illustrator-tools.js
git commit -m "feat(m3): add p02 illustrator tools page with animated SVG demos and workflow graphs"
```

---

## Chunk 2: p03 贝塞尔曲线 + p04 图表美化

### Task 3: m3-p3 贝塞尔曲线编辑器

**Files:**
- Modify: `src/pages/m3/p03-bezier.js`

**页面结构：**
```
Hero (深色) → S1 贝塞尔原理图解(浅色) → S2 交互式编辑器(深色) → S3 科研应用场景(浅色) → S4 挑战模式(深色) → Footer CTA
```

**Canvas 编辑器核心逻辑：**

```js
// 状态
let points = [
  { x: 80,  y: 300, type: 'anchor' },   // 起点
  { x: 150, y: 100, type: 'control' },  // 控制手柄1
  { x: 350, y: 100, type: 'control' },  // 控制手柄2
  { x: 420, y: 300, type: 'anchor' },   // 终点
];
let dragging = null;
let mode = 'cubic'; // 'cubic' | 'quadratic'

// Pointer Events（兼容鼠标和触摸）
canvas.addEventListener('pointerdown', e => {
  const pos = getPos(canvas, e);
  // 找最近的点（hitRadius: 桌面16px，移动端24px）
  dragging = findNearestPoint(pos, isMobile() ? 24 : 16);
});
canvas.addEventListener('pointermove', e => {
  if (!dragging) return;
  const pos = getPos(canvas, e);
  dragging.x = pos.x; dragging.y = pos.y;
  renderBezier();
});
canvas.addEventListener('pointerup', () => { dragging = null; });

function renderBezier() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 绘制控制手柄线（虚线）
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'rgba(149,213,178,0.4)';
  // 绘制控制手柄点（圆形）
  // 绘制曲线（贝塞尔路径）
  ctx.setLineDash([]);
  ctx.strokeStyle = '#95D5B2';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  if (mode === 'cubic') {
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y);
  }
  ctx.stroke();
}
```

**预设曲线库（S2 侧边按钮）：**
```js
const PRESETS = [
  { name: '平滑 S 形', desc: '常用于表示渐进过渡，如数量变化趋势', points: [...] },
  { name: '弯曲箭头', desc: '流程图中的弯曲连接线', points: [...] },
  { name: '拱形', desc: '示意图中的弧形结构，如半圆通道', points: [...] },
  { name: '波浪线', desc: '表示振动、波动现象', points: [...] },
];
```

**挑战模式（S4）：**
```js
const CHALLENGES = [
  { name: '复现 S 形曲线', target: [...points], maxScore: 100 },
  { name: '画出弯曲箭头', target: [...points], maxScore: 100 },
  { name: '精确弧形', target: [...points], maxScore: 100 },
];

function calcScore(userPoints, targetPoints) {
  // 采样两条贝塞尔曲线上的 50 个点
  // 计算平均欧几里得距离，转换为 0-100 分
  const userSamples = sampleBezier(userPoints, 50);
  const targetSamples = sampleBezier(targetPoints, 50);
  const rmse = Math.sqrt(userSamples.reduce((acc, p, i) => {
    const dx = p.x - targetSamples[i].x, dy = p.y - targetSamples[i].y;
    return acc + dx*dx + dy*dy;
  }, 0) / 50);
  return Math.max(0, Math.round(100 - rmse / 2));
}
```

**移动端全屏编辑器：**
- 移动端（< 768px）编辑器点击"全屏编辑"按钮 → 进入全屏 modal（black bg）
- 触控点半径放大到 24px（vs 桌面 16px）
- 双指捏合缩放画布

- [ ] **Step 1: 写 render() — HTML 结构**

包含：Hero、S1 原理图解（3个概念卡片：控制点/曲线/路径组合 + CSS 动画示意图）、S2 编辑器（Canvas + 侧边预设按钮 + 模式切换 cubic/quadratic + 坐标显示）、S3 应用场景（3 个真实场景 SVG 演示）、S4 挑战模式（目标曲线展示 + 用户绘制区 + 实时评分）

- [ ] **Step 2: 写 CSS**

重点：Canvas 包裹容器 `position:relative`；触控区 `touch-action:none`；挑战区两列（目标+用户）；移动端全屏 modal；分数计数器动画

- [ ] **Step 3: 写 init() — Hero + Canvas Bezier 编辑器**

- [ ] **Step 4: 写 init() — 预设曲线库按钮**

- [ ] **Step 5: 写 init() — 挑战模式（评分 + 动画）**

- [ ] **Step 6: 写 init() — 移动端全屏编辑模态（< 768px 启用）**

- [ ] **Step 7: destroy() — 移除所有 pointer event listeners**

- [ ] **Step 8: 验证（桌面：拖拽流畅 60fps；移动端：44px 触控区，全屏模式正常）**

- [ ] **Step 9: git commit**
```bash
git add src/pages/m3/p03-bezier.js
git commit -m "feat(m3): add p03 bezier editor with canvas drag, presets, and challenge mode"
```

---

### Task 4: m3-p4 图表美化实战

**Files:**
- Modify: `src/pages/m3/p04-chart-beautify.js`

**页面结构：**
```
Hero (深色) → S1 5步美化粘性滚动(浅色) → S2 5组BeforeAfter对比(深色) → S3 R/Python代码对照(浅色) → Footer CTA
```

**5步渐进美化（同一散点图数据集，每步用 D3 重绘）：**
```js
const BEAUTY_STEPS = [
  {
    num: '01', title: '默认输出', color: '#6e6e73',
    desc: 'ggplot2 默认灰色主题，无配色优化，轴标签过小，图例位置占用空间。',
    changes: [],  // 基础状态
    code: 'ggplot(data, aes(x, y, color=group)) + geom_point()',
  },
  {
    num: '02', title: '配色优化', color: '#95D5B2',
    desc: '替换为 Okabe-Ito 色盲安全配色，确保所有读者可区分分组。',
    changes: ['colors'],
    code: '... + scale_color_manual(values = okabe_ito)',
  },
  {
    num: '03', title: '字体调整', color: '#7EC8E3',
    desc: '基础字号提升到 10pt（期刊最小要求），轴标签加粗，标题居中。',
    changes: ['colors', 'fonts'],
    code: '... + theme_classic(base_size=10) + theme(axis.title=element_text(face="bold"))',
  },
  {
    num: '04', title: '布局重构', color: '#B8B8E8',
    desc: '图例移至图表内部右上角，减少空白；删除冗余网格线；增加数据标注。',
    changes: ['colors', 'fonts', 'layout'],
    code: '... + theme(legend.position=c(0.85,0.15), panel.grid.minor=element_blank())',
  },
  {
    num: '05', title: '细节打磨', color: '#F0B27A',
    desc: '增加回归线和置信区间；数据点透明度调整；统计显著性标注；出版级留白。',
    changes: ['colors', 'fonts', 'layout', 'details'],
    code: '... + geom_smooth(method="lm") + stat_ellipse(level=0.95)',
  },
];
```

**5 组 BeforeAfter（D3 绘制 SVG）：**
```js
const BA_PAIRS = [
  { id: 'scatter',   name: '散点图',  bad: drawBadScatter,  good: drawGoodScatter  },
  { id: 'bar',       name: '柱状图',  bad: drawBadBar,      good: drawGoodBar      },
  { id: 'line',      name: '折线图',  bad: drawBadLine,     good: drawGoodLine     },
  { id: 'boxplot',   name: '箱线图',  bad: drawBadBoxplot,  good: drawGoodBoxplot  },
  { id: 'heatmap',   name: '热力图',  bad: drawBadHeatmap,  good: drawGoodHeatmap  },
];
// 每对：左侧 Bad 图（彩虹色/过小字体/过密网格/缺标题）
//       右侧 Good 图（Okabe-Ito/合适字体/清晰网格/完整标注）
// BeforeAfter 滑块：拖动竖线分割 Bad/Good 区域
```

**粘性步骤（JS transform，与 p10 相同实现）：**
```js
// 左侧：步骤说明固定（transform translateY）
// 右侧：D3 图表随步骤渐进变化
// 使用 rAF ticking 防抖
```

- [ ] **Step 1: 写 render() — HTML 结构**
- [ ] **Step 2: 写 CSS（BeforeAfter 滑块 + 步骤区 + 响应式）**
- [ ] **Step 3: 写各种 D3 绘图函数（drawBadScatter / drawGoodScatter 等）**

每个函数接受 SVG 容器 + 尺寸，返回已绘制的 D3 selection。关键：坏图 vs 好图的差异要明显且有教学价值。

- [ ] **Step 4: 写 init() — Hero 动画**
- [ ] **Step 5: 写 init() — 粘性步骤（rAF ticking，左侧固定+右侧D3更新）**
- [ ] **Step 6: 写 init() — BeforeAfter 列表+预览浏览器 + 滑块交互**
- [ ] **Step 7: 写 init() — R/Python 代码 Tab（Prism 语法高亮）**
- [ ] **Step 8: destroy() — 移除 scroll handler**
- [ ] **Step 9: 验证（5步渐进变化正确；BeforeAfter 滑块流畅；移动端单列）**
- [ ] **Step 10: git commit**
```bash
git add src/pages/m3/p04-chart-beautify.js
git commit -m "feat(m3): add p04 chart beautification with D3 before/after and 5-step progressive demo"
```

---

## Chunk 3: p05 SVG 编辑 + p06 多面板 Figure

### Task 5: m3-p5 SVG 编辑与优化

**Files:**
- Modify: `src/pages/m3/p05-svg-editing.js`

**页面结构：**
```
Hero (深色) → S1 SVG基础语法交互图解(浅色) → S2 CodeMirror编辑器+实时预览(深色) → S3 优化策略(浅色) → S4 使用场景(深色) → Footer CTA
```

**CodeMirror 编辑器 + 实时 SVG 预览：**

```js
import { createCodeEditor } from '../../components/CodeEditor.js';

const SVG_TEMPLATES = [
  {
    id: 'shapes', name: '基本形状', icon: '◯',
    code: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- 矩形 -->
  <rect x="10" y="10" width="60" height="40" fill="#95D5B2" rx="4"/>
  <!-- 圆形 -->
  <circle cx="110" cy="30" r="25" fill="#7EC8E3"/>
  <!-- 椭圆 -->
  <ellipse cx="170" cy="30" rx="25" ry="15" fill="#B8B8E8"/>
  <!-- 折线 -->
  <polyline points="10,80 40,60 70,75 100,55 130,70 160,50" fill="none" stroke="#F0B27A" stroke-width="2"/>
</svg>`
  },
  {
    id: 'path', name: '路径 (path)', icon: '✏️',
    code: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <!-- 科研弯箭头 -->
  <path d="M20 50 C20 20, 80 20, 100 50 S180 80, 180 50"
        fill="none" stroke="#95D5B2" stroke-width="2"/>
  <!-- 箭头头部 -->
  <polygon points="175,42 185,50 175,58" fill="#95D5B2"/>
  <!-- 注释文字 -->
  <text x="60" y="15" font-size="10" fill="#6e6e73" font-family="Arial">
    三次贝塞尔曲线
  </text>
</svg>`
  },
  {
    id: 'gradient', name: '渐变', icon: '🌈',
    code: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#7EC8E3"/>
      <stop offset="100%" stop-color="#95D5B2"/>
    </linearGradient>
    <radialGradient id="grad2">
      <stop offset="0%"   stop-color="#F0B27A" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#F0B27A" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect x="10" y="20" width="180" height="60" rx="8" fill="url(#grad1)"/>
  <circle cx="100" cy="50" r="30" fill="url(#grad2)"/>
</svg>`
  },
  {
    id: 'diagram', name: '流程图节点', icon: '□',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <!-- 样本采集 -->
  <rect x="10" y="45" width="60" height="30" rx="6" fill="#2d2d2f" stroke="#95D5B2" stroke-width="1.5"/>
  <text x="40" y="64" text-anchor="middle" font-size="9" fill="#95D5B2" font-family="Arial">样本采集</text>
  <!-- 箭头 -->
  <line x1="70" y1="60" x2="90" y2="60" stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="88,55 98,60 88,65" fill="#6e6e73"/>
  <!-- 数据分析 -->
  <rect x="98" y="45" width="60" height="30" rx="6" fill="#2d2d2f" stroke="#7EC8E3" stroke-width="1.5"/>
  <text x="128" y="64" text-anchor="middle" font-size="9" fill="#7EC8E3" font-family="Arial">数据分析</text>
  <!-- 箭头 -->
  <line x1="158" y1="60" x2="178" y2="60" stroke="#6e6e73" stroke-width="1.5"/>
  <polygon points="176,55 186,60 176,65" fill="#6e6e73"/>
  <!-- 结果输出 -->
  <rect x="186" y="45" width="30" height="30" rx="6" fill="#2d2d2f" stroke="#B8B8E8" stroke-width="1.5"/>
  <text x="201" y="64" text-anchor="middle" font-size="9" fill="#B8B8E8" font-family="Arial">结果</text>
</svg>`
  },
  {
    id: 'text', name: '文字排版', icon: 'T',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <!-- 图表标题 -->
  <text x="100" y="20" text-anchor="middle"
        font-size="14" font-weight="bold" fill="#1d1d1f" font-family="Arial">
    细胞活性对比分析
  </text>
  <!-- 副标题 -->
  <text x="100" y="36" text-anchor="middle"
        font-size="9" fill="#6e6e73" font-family="Arial">
    Treatment vs Control (n=30/group)
  </text>
  <!-- 轴标签 -->
  <text x="100" y="115" text-anchor="middle"
        font-size="10" fill="#1d1d1f" font-family="Arial">实验组</text>
  <text x="12" y="75" text-anchor="middle"
        font-size="10" fill="#1d1d1f" font-family="Arial"
        transform="rotate(-90,12,75)">OD450</text>
  <!-- 示意坐标轴 -->
  <line x1="30" y1="45" x2="30" y2="100" stroke="#ccc" stroke-width="1"/>
  <line x1="30" y1="100" x2="185" y2="100" stroke="#ccc" stroke-width="1"/>
</svg>`
  },
  {
    id: 'filter', name: '滤镜效果', icon: '✨',
    code: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <circle cx="60" cy="50" r="30" fill="#95D5B2" filter="url(#glow)"/>
  <rect x="120" y="20" width="60" height="60" rx="8" fill="#7EC8E3" filter="url(#shadow)"/>
  <text x="100" y="95" text-anchor="middle" font-size="9" fill="#6e6e73">发光 vs 阴影滤镜</text>
</svg>`
  },
];
```

**实时 SVG 预览：**
```js
function setupLivePreview(editor, previewEl) {
  editor.onChange(code => {
    try {
      // 安全性：不执行任何脚本（移除 script 标签）
      const safeCode = code.replace(/<script[\s\S]*?<\/script>/gi, '');
      previewEl.innerHTML = safeCode;
      // 更新字节数
      const bytes = new Blob([code]).size;
      document.getElementById('p05m3-byte-count').textContent = bytes + ' bytes';
    } catch(e) {
      // 解析失败时保持上一个有效预览
    }
  });
}
```

**优化演示（S3）：**
```js
const OPTIMIZE_DEMO = {
  before: `<path d="M 10.000 20.000 C 10.123 19.876 10.456 19.543 11.000 19.000
           C 11.234 18.766 12.100 18.200 13.000 17.500..." />`,
  after: `<path d="M10 20C10 19 11 19 11 19C12 18 13 18 13 17..." />`,
  beforeBytes: 847,
  afterBytes: 312,
  reduction: '63%',
};
// 展示为 CodeMirror diff 风格（红行 vs 绿行）+ 字节数对比动画
```

- [ ] **Step 1: 写 render() — HTML**
- [ ] **Step 2: 写 CSS（编辑器布局 + 模板按钮 + 优化对比区）**
- [ ] **Step 3: 写 init() — Hero 动画**
- [ ] **Step 4: 写 init() — SVG 基础语法交互图解（S1，点击形状名→高亮 SVG 中对应元素+解释代码）**
- [ ] **Step 5: 写 init() — CodeMirror 编辑器 + 实时预览（S2）**
- [ ] **Step 6: 写 init() — 模板按钮切换（6个模板）**
- [ ] **Step 7: 写 init() — 优化前后对比（S3，字节数动画）**
- [ ] **Step 8: 写 init() — 使用场景 Tab（LaTeX/Web/Office/印刷，S4）**
- [ ] **Step 9: destroy() — dispose CodeMirror + 清理**
- [ ] **Step 10: git commit**
```bash
git add src/pages/m3/p05-svg-editing.js
git commit -m "feat(m3): add p05 SVG editor with CodeMirror live preview and 6 scientific templates"
```

---

### Task 6: m3-p6 多面板 Figure 组合

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`

**页面结构：**
```
Hero (深色) → S1 面板标注规范(浅色) → S2 布局编辑器(深色) → S3 R/Python代码(浅色) → S4 期刊规格速查(深色) → Footer CTA
```

**SortableJS 布局编辑器：**

```js
import Sortable from 'sortablejs'; // CDN

// 预设布局方案
const PRESETS = [
  { id: '2col',  name: '2列等宽',   layout: 'repeat(2, 1fr)',         panels: ['A','B'] },
  { id: '3col',  name: '3列等宽',   layout: 'repeat(3, 1fr)',         panels: ['A','B','C'] },
  { id: 'Ltype', name: 'L型(1+2)',  layout: '2fr 1fr',               panels: ['A (大)','B','C'], rows: 2, special: 'L' },
  { id: 'Ztype', name: 'Z型(2+2)',  layout: 'repeat(2, 1fr)',         panels: ['A','B','C','D'] },
  { id: 'wide',  name: '宽图+小图', layout: '2fr 1fr / 1fr 1fr',     panels: ['A (主图)','B','C'] },
];

// 每个面板可设置：
// - 内容类型（散点图/折线图/箱线图/图像/占位符）
// - 宽高比（16:9 / 4:3 / 1:1 / 3:4）
// - 背景色
// - 标注字母（a/b/c/d）的位置（左上/左下/右上）和样式

// SortableJS 初始化
const sortable = Sortable.create(document.getElementById('p06m3-grid'), {
  animation: 150,
  handle: '.p06m3-panel-handle',
  ghostClass: 'p06m3-ghost',
  onEnd: () => updateCode(),
});
```

**Nature/Cell 标注规范展示（S1）：**
```js
// 交互式：点击标注元素查看规范说明
const LABEL_RULES = [
  { id: 'letter', title: '面板字母', rule: '粗体 8pt 黑色，相对画板左上角 2mm×2mm 位置' },
  { id: 'font',   title: '字体要求', rule: 'Nature: Helvetica/Arial；Cell: 同；Science: 同。中文期刊通常 Sans-serif' },
  { id: 'size',   title: '字号层级', rule: '轴标签 ≥7pt，标题 ≥8pt，注释 ≥6pt' },
  { id: 'weight', title: '线条粗细', rule: '数据线 0.75-1pt；轴线 0.5pt；网格线 0.25pt（或删除）' },
  { id: 'margin', title: '面板间距', rule: '至少 2mm，防止印刷出血时内容被裁剪' },
];
```

**R patchwork + Python subplot 代码生成：**
```js
function generateCode(layout, panels) {
  // 根据当前布局生成对应的 R patchwork 代码
  const rCode = generatePatchworkCode(layout, panels);
  // 生成 Python matplotlib subplot 代码
  const pyCode = generateSubplotCode(layout, panels);
  return { rCode, pyCode };
}

function generatePatchworkCode(layout, panels) {
  // 例：2列布局生成 (p1 | p2)
  // L型生成 (p1 | (p2 / p3))
}
```

- [ ] **Step 1: 写 render() — HTML**
- [ ] **Step 2: 写 CSS（面板网格 + 拖拽手柄 + 控制面板 + 代码区）**
- [ ] **Step 3: 写 init() — Hero 动画**
- [ ] **Step 4: 写 init() — Nature 标注规范交互图示（S1）**
- [ ] **Step 5: 写 init() — SortableJS 布局编辑器（S2）**
  - 预设布局切换按钮
  - 每个面板的内容类型选择器（D3 绘制缩略图）
  - 面板标注字母编辑
  - 实时预览渲染
- [ ] **Step 6: 写 init() — 代码生成（R patchwork + Python subplot）**
  - CopyButton 集成
  - Tab 切换 R/Python
- [ ] **Step 7: 写 init() — 期刊规格速查表（S4，可筛选）**
- [ ] **Step 8: destroy() — Sortable.destroy() + killAll()**
- [ ] **Step 9: git commit**
```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3): add p06 multi-panel figure composer with SortableJS and code generation"
```

---

## Chunk 4: p07 资源站 + 全页面收尾

### Task 7: m3-p7 素材资源站

**Files:**
- Modify: `src/pages/m3/p07-resources.js`

**页面结构：**
```
Hero (深色) → S1 资源浏览器(浅色，左筛选+右卡片) → S2 3步推荐器(深色) → S3 许可证指南(浅色) → Footer CTA（← 多面板Figure / → 模块四 →）
```

**资源数据（真实 URL）：**
```js
const RESOURCES = [
  // 图标类
  { id: 'iconfont',  name: '阿里巴巴 Iconfont', url: 'https://www.iconfont.cn', category: 'icon', price: 'free',
    scope: 'general', desc: '中国最大的图标库，支持 SVG/PNG/AI 格式下载，有专业科研图标集', tags: ['图标','SVG','中文友好'] },
  { id: 'flaticon',  name: 'Flaticon', url: 'https://www.flaticon.com', category: 'icon', price: 'freemium',
    scope: 'general', desc: '国际最大图标库之一，科研相关图标丰富，免费版需署名', tags: ['图标','PNG','SVG'] },
  { id: 'scidraw',   name: 'SciDraw', url: 'https://scidraw.io', category: 'icon', price: 'free',
    scope: 'science', desc: '专为科研设计的矢量素材库，涵盖生物/化学/医学领域图标，CC0 授权', tags: ['科研专用','SVG','CC0'] },
  { id: 'biorender', name: 'BioRender', url: 'https://www.biorender.com', category: 'template', price: 'paid',
    scope: 'science', desc: '生命科学领域最专业的科研图示工具，预制 50000+ 科研符号，支持协作', tags: ['生命科学','专业','订阅制'] },
  { id: 'servier',   name: 'Servier Medical Art', url: 'https://smart.servier.com', category: 'icon', price: 'free',
    scope: 'science', desc: '医学研究图示素材库，CC BY 授权，适合医学/药学论文', tags: ['医学','CC BY','专业'] },
  // 矢量素材类
  { id: 'vecteezy',  name: 'Vecteezy', url: 'https://www.vecteezy.com', category: 'vector', price: 'freemium',
    scope: 'general', desc: '高质量矢量插图库，有大量科学、自然、数据类素材，支持 SVG 下载', tags: ['矢量','插图','SVG'] },
  { id: 'freepik',   name: 'Freepik', url: 'https://www.freepik.com', category: 'vector', price: 'freemium',
    scope: 'general', desc: '国际知名素材平台，图标/矢量/PSD 全品类，免费版需标注来源', tags: ['矢量','PSD','全品类'] },
  { id: 'undraw',    name: 'unDraw', url: 'https://undraw.co', category: 'vector', price: 'free',
    scope: 'general', desc: '扁平化插图库，可自定义主题色，MIT 授权，适合学术报告配图', tags: ['插图','开源','扁平化'] },
  // 配色类
  { id: 'coolors',   name: 'Coolors', url: 'https://coolors.co', category: 'color', price: 'free',
    scope: 'general', desc: '配色方案生成器，支持色盲检测、对比度检查、导出 CSS/SCSS', tags: ['配色','色盲安全','生成器'] },
  { id: 'colorbrewer', name: 'ColorBrewer 2.0', url: 'https://colorbrewer2.org', category: 'color', price: 'free',
    scope: 'science', desc: '学术专用配色工具，专为地图和数据可视化设计，支持色盲安全和打印友好', tags: ['数据可视化','学术','色盲安全'] },
  { id: 'paletton',  name: 'Paletton', url: 'https://paletton.com', category: 'color', price: 'free',
    scope: 'general', desc: '基于色彩理论的配色生成器，支持互补/类似/三角等方案导出', tags: ['配色理论','交互式'] },
  // 模板类
  { id: 'slidemania', name: 'SlidesMania', url: 'https://slidesmania.com', category: 'template', price: 'free',
    scope: 'general', desc: '学术 PPT/Google Slides 模板，有多款适合学术报告的简洁设计', tags: ['PPT','学术','免费'] },
  { id: 'canva-sci',  name: 'Canva Science', url: 'https://www.canva.com', category: 'template', price: 'freemium',
    scope: 'science', desc: 'Canva 科研相关模板，适合 Graphical Abstract、信息图、海报', tags: ['模板','信息图','简便'] },
  // 字体类
  { id: 'googlefonts', name: 'Google Fonts', url: 'https://fonts.google.com', category: 'font', price: 'free',
    scope: 'general', desc: '开放源代码字体库，包含 Noto 系列多语言字体，适合出版级科研图表', tags: ['字体','OFL','中文支持'] },
  { id: 'fontsquirrel', name: 'Font Squirrel', url: 'https://www.fontsquirrel.com', category: 'font', price: 'free',
    scope: 'general', desc: '商用免费字体集合，经过授权验证，可安全用于论文和出版物', tags: ['字体','商用免费','验证授权'] },
];
```

**推荐问答器（S2，4步问答 → 推荐2-3个资源）：**
```js
const QUIZ_STEPS = [
  { q: '你主要需要什么类型的素材？', opts: [
    { label: '图标 / 符号', val: 'icon' },
    { label: '矢量插图', val: 'vector' },
    { label: '配色方案', val: 'color' },
    { label: 'PPT / 报告模板', val: 'template' },
    { label: '字体', val: 'font' },
  ]},
  { q: '你的研究领域是？', opts: [
    { label: '生命科学 / 医学', val: 'bio' },
    { label: '理工科（物化材）', val: 'stem' },
    { label: '社科 / 人文', val: 'social' },
    { label: '环境 / 地理', val: 'env' },
  ]},
  { q: '使用场景是？', opts: [
    { label: '发表论文 / 期刊图', val: 'publish' },
    { label: '学术报告 / 会议', val: 'present' },
    { label: '科普推文 / 海报', val: 'public' },
  ]},
  { q: '预算是？', opts: [
    { label: '完全免费', val: 'free' },
    { label: '可接受免费增值', val: 'freemium' },
    { label: '预算充足，用最好的', val: 'paid' },
  ]},
];

function calcRecommendations(answers) {
  // 根据4个答案评分每个资源，返回前3个推荐
  // 评分维度：类别匹配 + 领域匹配 + 场景匹配 + 价格匹配
}
```

**许可证说明（S3）：**
```js
const LICENSES = [
  { name: 'CC0', label: '公共领域', icon: '🟢', desc: '无需署名，商用免费，可修改', suitable: '论文/商业' },
  { name: 'CC BY', label: '署名', icon: '🟡', desc: '需标注来源，可商用，可修改', suitable: '学术报告（注明来源）' },
  { name: 'CC BY-NC', label: '署名-非商业', icon: '🟡', desc: '需署名，仅非商业用途，可修改', suitable: '学术论文（非商业）' },
  { name: 'OFL', label: '字体开放授权', icon: '🟢', desc: '字体可自由使用、修改、嵌入，但衍生字体须同名', suitable: '任何场景' },
  { name: 'Proprietary', label: '商业授权', icon: '🔴', desc: '需购买授权，限制较多，仔细阅读条款', suitable: '按授权使用' },
];
```

- [ ] **Step 1: 写 render() — HTML**
- [ ] **Step 2: 写 CSS（资源卡片网格 + 筛选栏 + 推荐器步骤 + 许可证色块）**
- [ ] **Step 3: 写 init() — Hero 动画**
- [ ] **Step 4: 写 init() — 资源浏览器（筛选：类别+价格+领域）**
  - 筛选逻辑：AND 条件，过滤不匹配的卡片（GSAP opacity/height 动画）
  - 每张卡片：logo/icon + 名称 + 描述 + tags + 外链按钮（target="_blank" rel="noopener"）
- [ ] **Step 5: 写 init() — 推荐问答器（4步 → 展示结果卡片）**
- [ ] **Step 6: 写 init() — 许可证交互说明**
- [ ] **Step 7: destroy()**
- [ ] **Step 8: git commit**
```bash
git add src/pages/m3/p07-resources.js
git commit -m "feat(m3): add p07 resources hub with filtering, quiz recommender, and license guide"
```

---

### Task 8: M3 导航集成验证 + Footer CTA 统一

**Files:**
- `src/utils/router.js` — 确认 m3-p1 ~ m3-p7 路由已注册
- `src/components/Navigation.js` — 确认 M3 侧边栏菜单正确
- 所有 7 页 Footer CTA 统一检查

**Footer CTA 按钮设计（m3 统一规范）：**
| 页面 | 上一页按钮 | 下一页按钮 |
|------|-----------|-----------|
| p01  | ← 模块二：AI 辅助（m2-p6） | → Illustrator 工具 |
| p02  | ← 矢量 vs 位图 | → 贝塞尔曲线 |
| p03  | ← Illustrator 工具 | → 图表美化实战 |
| p04  | ← 贝塞尔曲线 | → SVG 编辑 |
| p05  | ← 图表美化实战 | → 多面板 Figure |
| p06  | ← SVG 编辑 | → 素材资源站 |
| p07  | ← 多面板 Figure | → 模块四：演示设计（m4-p1） |

- [ ] **Step 1: 检查 router.js 中 m3 路由注册**
```bash
grep -n "m3" src/utils/router.js
```
确保 `#m3-p1` 到 `#m3-p7` 全部注册。

- [ ] **Step 2: 检查 Navigation.js 侧边栏**
```bash
grep -n "矢量" src/components/Navigation.js
```
确保 M3 分组显示正确，7页链接均可点击。

- [ ] **Step 3: 全页面 Footer CTA 一致性检查**
- 每页 Footer 有页码（如 `Module 03 / 07`）
- Quote 无引号符号（CSS ::before/::after 添加）
- 按钮用目标页面标题（非"上一页/下一页"）
- 按钮用 `getElementById` + `addEventListener`（非 `onclick`）

- [ ] **Step 4: 移动端快速验证（Chrome DevTools）**
在以下设备上验证每页：
- iPhone SE（375px）：Hero 正常；单列布局；scroll-margin-top 正确
- iPhone 14（390px）：Canvas 编辑器触控；Tab 可点击（≥44px）
- iPad（768px）：双列正常；侧边栏覆盖层正常

- [ ] **Step 5: 更新 todo.md**
将 Phase 6 所有任务标记为 ✅ 完成。

- [ ] **Step 6: 最终 commit**
```bash
git add todo.md
git commit -m "chore: complete Phase 6 M3 vector design module (7 pages)"
```

---

## 执行方式建议

### 并行开发策略（使用多智能体）

由于各页面相互独立，推荐以下并行方案：

**批次 A（同时启动）：**
- Agent 1：Task 1 (p01 Vector vs Raster)
- Agent 2：Task 2 (p02 Illustrator Tools)

**批次 B（A 完成后启动）：**
- Agent 3：Task 3 (p03 Bezier)
- Agent 4：Task 4 (p04 Chart Beautify)

**批次 C（B 完成后启动）：**
- Agent 5：Task 5 (p05 SVG Editing)
- Agent 6：Task 6 (p06 Multi-panel)

**批次 D（C 完成后）：**
- Agent 7：Task 7 (p07 Resources)
- 随后主 Agent 执行 Task 8（导航集成验证）

### 每个 Agent 的上下文要求

每个子 Agent 需要读取以下文件后再开始：
1. `CLAUDE.md`（项目规范，特别是 Hero 规范和禁止事项）
2. `design-spec.md`（CSS 变量 + rAF ticking 代码模板）
3. `src/pages/m2/p01-ai-overview.js`（Hero 模板参考）
4. 至少一个相关参考页面（如 p03 参考 m2/p03-vectorization.js 的步骤模式）

### Nano Banana 使用决策

**M3 不需要 Nano Banana 生成图片。** 所有交互组件（Canvas/D3/SVG）均以代码生成：
- p04 的 BeforeAfter 图表用 D3 代码绘制（比位图质量更高且可缩放）
- p05 的 SVG 模板内嵌在代码中
- p06 的面板预览用 CSS + 迷你 D3 图表

如果后续回顾发现某些静态概念图效果不佳，可在 Phase 6.5 补充 Nano Banana 生成，prompt 存入 `E:\Claude-project\fig-nanobanana\generate.py`，输出到 `public/assets/m3/`。

---

## 代码质量检查清单

每个 Task 完成后，子 Agent 应对照以下清单自查：

- [ ] `import { gsap } from '../../components/ScrollAnimations.js'`（无 `window.gsap`）
- [ ] Hero 所有元素有 `opacity:0` inline style
- [ ] Hero timeline `delay: 0.2`，subtitle opacity 目标 `0.5`
- [ ] 无 `position:sticky`（使用 JS transform 代替）
- [ ] scroll handler 使用 `{ passive: true }` + rAF ticking
- [ ] 所有 `pre`/代码块使用 `white-space: pre-wrap`
- [ ] Canvas touch 使用 Pointer Events API
- [ ] `destroy()` 调用 `killAll()` 并清理所有 listener
- [ ] 移动端 section 有 `scroll-margin-top: 56px`
- [ ] 触控目标 ≥44px
- [ ] 控制台无报错（特别是 D3/Canvas 相关）
- [ ] Footer CTA 用 `addEventListener`（非 `onclick`）
