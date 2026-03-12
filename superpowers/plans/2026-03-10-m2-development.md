# M2 AI辅助科研绘图 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all 6 pages of Module 2 (AI辅助科研绘图) with full interactive components, using styled placeholder divs for AI-generated images (Phase 5.5 素材替换 is out of scope).

**Architecture:** Each page follows the M1 pattern: `render()` returns HTML string, `init()` wires up GSAP animations and interactive components, `destroy()` cleans up. GSAP must always be imported from `ScrollAnimations.js`, never from `window.gsap`. Module accent color: `#B8B8E8` (var(--module-2)).

**Tech Stack:** Vanilla JS + GSAP (from ScrollAnimations.js) + D3.js + CodeMirror 6 + Canvas API + Mermaid.js (npm, new dependency for p04/p06)

---

## File Map

| File | Content | Status |
|------|---------|--------|
| `src/pages/m2/p01-ai-overview.js` | m2-p1: AI新范式 | Stub → Full |
| `src/pages/m2/p02-prompt-engineering.js` | m2-p2: Prompt工程 | Stub → Full |
| `src/pages/m2/p03-vectorization.js` | m2-p3: AI输出后处理 | Stub → Full |
| `src/pages/m2/p04-ethics.js` | **m2-p4: AI辅助科研图解** (file name is misleading — content is p4 diagram design) | Stub → Full |
| `src/pages/m2/p05-ai-diagrams.js` | **m2-p5: 伦理版权学术规范** (file name is misleading — content is p5 ethics) | Stub → Full |
| `src/pages/m2/p06-case-studies.js` | m2-p6: 端到端实战 | Stub → Full |
| `package.json` | Add mermaid dependency | Modify |

> ⚠️ **File name confusion:** `p04-ethics.js` implements the *4th page* content (AI辅助科研图解), and `p05-ai-diagrams.js` implements the *5th page* content (伦理版权). The file names in the original stub creation were swapped. Always trust the page number (p04 = 4th page), not the file name suffix.

---

## Placeholder Image Standard

All AI-generated image slots (marked `[占位符]` in todo.md) use this HTML pattern. Never use `<img>` tags pointing to missing files — use styled divs:

```html
<div class="m2-placeholder" data-desc="图片描述" style="aspect-ratio:16/9;">
  <div class="m2-placeholder-inner">
    <div class="m2-ph-icon">🖼</div>
    <p class="m2-ph-label">AI 生成图占位符</p>
    <p class="m2-ph-desc">图片描述文字</p>
  </div>
</div>
```

```css
.m2-placeholder {
  background: linear-gradient(135deg, #2d2d4a 0%, #1a1a2e 100%);
  border: 1px dashed rgba(184,184,232,0.3);
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  min-height: 200px;
}
.m2-placeholder-inner { text-align: center; padding: var(--space-md); }
.m2-ph-icon { font-size: 2.5rem; margin-bottom: var(--space-sm); opacity: 0.6; }
.m2-ph-label { color: var(--module-2); font-size: var(--text-small); font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
.m2-ph-desc { color: var(--text-on-dark-2); font-size: var(--text-caption); margin-top: 6px; max-width: 240px; }
```

This CSS block goes in the `<style>` tag of the **first page that uses it** (p01), and is reused by subsequent pages — do NOT redeclare it in every page.

---

## Hero Template Reminder (M1-audited final spec)

Every page Hero must strictly follow this pattern (from CLAUDE.md):

```js
// In render():
`<section class="section-dark section-hero-full {prefix}-hero" id="{prefix}-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 0X</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">中文标题</h1>
    <p class="page-hero-sub" style="opacity:0;">English Subtitle</p>
    <p class="{prefix}-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">一句话说明</p>
    <nav class="hero-quicknav" id="{prefix}-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#section-id">S1</button>
    </nav>
    <div class="{prefix}-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>`

// In init():
const heroTl = gsap.timeline({ delay: 0.2 });
heroTl.fromTo('.{prefix}-hero .hero-eyebrow', { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }, 0);
heroTl.fromTo('.page-hero-title',  { y:30, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.15);
heroTl.fromTo('.page-hero-sub',    { y:20, opacity:0 }, { opacity:0.5, y:0, duration:0.8, ease:'power3.out' }, 0.3);
heroTl.fromTo('.{prefix}-hero-tagline', { y:20, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.45);
heroTl.fromTo('#{prefix}-quicknav', { y:20, opacity:0 }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, 0.6);
heroTl.fromTo('.{prefix}-scroll-hint', { opacity:0, y:15 }, { opacity:1, y:0, duration:0.6, ease:'power3.out' }, 0.75);
```

Hero background: unique CSS `::before`/`::after` radial-gradient with keyframe drift animation (module color #B8B8E8 + complementary).

---

## Footer CTA Template

```html
<section class="page-footer-cta">
  <p class="page-footer-num">0X / 06</p>
  <h2 class="page-footer-quote">金句文本（不含引号）</h2>
  <p class="page-footer-desc">过渡文案</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="{prefix}-prev-btn">← 上一页标题</button>
    <button class="btn-primary" id="{prefix}-next-btn">下一页标题 →</button>
  </div>
</section>
```

Button click handlers use `getElementById` + `addEventListener` + `navigateTo()` — never `onclick` attribute.

---

## Chunk 1: Setup + p01 AI新范式

### Task 0: Install Mermaid.js

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install mermaid**

```bash
cd E:\Claude-project\sci-aesthetic
npm install mermaid
```

Expected: `package.json` now lists `"mermaid": "^11.x.x"` in dependencies.

- [ ] **Step 2: Verify dev server still starts**

```bash
npm run dev
```

Expected: Vite starts without errors.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat(m2): add mermaid.js dependency for diagram rendering"
```

---

### Task 1: m2-p1 AI与科研绘图新范式

**File:** `src/pages/m2/p01-ai-overview.js`

**Sections:**
- Hero (深色, 100vh): Module 02 / Page 01, "AI 与科研绘图：新范式"
- S1 范式转变 (深色): D3 双时间线动画 — 传统6步 vs AI 4步，滚动驱动
- S2 能力边界 (浅色): 交互式场景判断器（6-8 题，点击判断 AI/不用/辅助，即时反馈）
- S3 工具生态速览 (深色): 交互式能力矩阵（按任务×工具，hover显示详情）
- S4 展示组件 (浅色): 5场景切换按钮 + placeholder图 + prompt + 简评
- Footer CTA: "← 科研绘图工作流" | "Prompt 的艺术 →"

**Interactive components to build:**

**D3 双时间线 (S1):**
```js
// 两条并排时间线：Traditional(左) vs AI-Assisted(右)
// 每条时间线是纵向流程图，步骤随 ScrollTrigger scrub 逐步亮起
// traditional steps: 手绘草稿→软件建图→配色调试→标注排版→格式导出→反复修改 (6步)
// AI steps: CDTF描述→AI生成→迭代精修→矢量后处理 (4步)
// 每步标注:耗时 + 技能要求标签
```

**场景判断器 (S2):**
```js
// 8个场景卡片，三个选项按钮，点击显示结果+解释
const SCENARIOS = [
  { scene: '为论文 Figure 1 绘制散点图（数据精确）', answer: 'no', reason: '精确数据图必须用 R/Python，AI 无法保证数值准确性' },
  { scene: '为综述绘制"气候变化影响链"概念示意图', answer: 'yes', reason: '概念图无精确数值要求，AI 擅长此类可视化' },
  { scene: '将 R 生成的箱线图配色优化为色盲友好方案', answer: 'assist', reason: 'AI 可建议配色方案，但最终需要在 R 中手动执行' },
  { scene: '绘制实验流程图（样品采集→提取→测序→分析）', answer: 'yes', reason: '流程图是 AI 图解的强项，Mermaid AI 或通用图像均适用' },
  { scene: '制作期刊封面图（河流生态系统艺术渲染）', answer: 'assist', reason: 'AI 生成图用于封面需编辑批准，且需标注使用 AI' },
  { scene: '在 Figure 3 热力图中添加统计显著性星号标注', answer: 'no', reason: '标注涉及统计数值，必须基于实际分析结果，不能 AI 生成' },
  { scene: '绘制"碳循环与生态系统服务"综述框架图', answer: 'yes', reason: '框架图是 AI 辅助的理想场景，可快速迭代视觉隐喻' },
  { scene: '将模型预测值绘制成时间序列折线图并添加置信带', answer: 'no', reason: '需要真实数据驱动，R/Python 是唯一可靠选择' },
];
```

**能力矩阵 (S3):**
```js
// 横轴: 任务类型 ['概念图', '流程图', '数据图', '图标/素材']
// 纵轴: 工具 ['GPT Image 1.5', 'Midjourney v7', 'FLUX 1.1 Pro', 'Recraft V3 SVG', 'StarVector', 'Mermaid AI']
// 色块: 0(❌灰)→1(⚠️黄)→2(✅绿)
// hover: 显示工具名 + 能力描述浮层
const MATRIX = {
  tools: ['GPT Image 1.5', 'Midjourney v7', 'FLUX 1.1 Pro', 'Recraft V3 SVG', 'StarVector', 'Mermaid AI'],
  tasks: ['概念图', '流程图', '数据图辅助', '图标/素材'],
  scores: [
    [2,1,0,2], // GPT Image
    [2,0,0,2], // Midjourney
    [2,0,0,2], // FLUX
    [2,1,1,2], // Recraft SVG
    [1,2,0,1], // StarVector
    [0,2,0,0], // Mermaid AI
  ]
};
// D3 rect grid, hover shows tooltip overlay
```

**5场景切换展示 (S4):**
```js
const SHOWCASE = [
  { id: 'water', label: '水污染处理工艺', desc: '展示城市污水从进水到达标排放的完整处理流程', prompt: '...(来自 content-outline.md 规划)' },
  { id: 'carbon', label: '碳循环机制', desc: '森林生态系统碳固存与释放的自然循环机制' },
  { id: 'remote', label: '遥感分析 Pipeline', desc: '卫星影像从获取到地表分类分析的技术流程' },
  { id: 'micro', label: '微塑料迁移路径', desc: '微塑料从源头经土壤-地下水-河流到海洋的迁移过程' },
  { id: 'eco', label: '生态系统服务评估', desc: '森林生态系统提供的调节/供给/文化/支撑四类服务' },
];
// 5 buttons → switch active placeholder + prompt text + brief review
```

- [ ] **Step 1: Write render() with all HTML**

Implement `src/pages/m2/p01-ai-overview.js`:

```js
import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// Page-level cleanup references
let _scrollHandlers = [];
let _rafIds = [];
let _stTriggers = [];

export function render() {
  return `<div class="page-scroll">
<style>
/* ── M2 全局占位符样式（仅在 p01 中声明，其他页复用） ── */
.m2-placeholder { background: linear-gradient(135deg,#2d2d4a 0%,#1a1a2e 100%); border:1px dashed rgba(184,184,232,0.3); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; min-height:200px; }
.m2-placeholder-inner { text-align:center; padding:var(--space-md); }
.m2-ph-icon { font-size:2.5rem; margin-bottom:var(--space-sm); opacity:0.6; }
.m2-ph-label { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.05em; text-transform:uppercase; }
.m2-ph-desc { color:var(--text-on-dark-2); font-size:var(--text-caption); margin-top:6px; max-width:240px; }
/* ── p01 专属样式 ── */
.p01-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 30% 40%, rgba(184,184,232,0.15) 0%, transparent 70%); animation:p01-drift-a 12s ease-in-out infinite; }
.p01-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 70% 65%, rgba(126,200,227,0.1) 0%, transparent 70%); animation:p01-drift-b 9s ease-in-out infinite reverse; }
@keyframes p01-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
@keyframes p01-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,25px)} }
.p01-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p01-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p01-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
/* 双时间线布局 */
.p01-timeline-wrap { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xl); max-width:900px; margin:0 auto; }
.p01-tl-col { display:flex; flex-direction:column; gap:0; }
.p01-tl-header { text-align:center; padding-bottom:var(--space-md); border-bottom:1px solid var(--border-dark); margin-bottom:var(--space-md); }
.p01-tl-header h3 { font-size:var(--text-heading); font-weight:600; }
.p01-tl-step { display:flex; gap:var(--space-sm); padding:var(--space-sm) 0; opacity:0.25; transition:opacity 0.4s ease; position:relative; }
.p01-tl-step.active { opacity:1; }
.p01-tl-step-num { width:36px; height:36px; border-radius:50%; border:1.5px solid var(--border-dark); display:flex; align-items:center; justify-content:center; font-size:var(--text-caption); font-family:var(--font-code); flex-shrink:0; }
.p01-tl-step.active .p01-tl-step-num { border-color:var(--module-2); background:rgba(184,184,232,0.1); color:var(--module-2); }
.p01-tl-step-body { flex:1; }
.p01-tl-step-title { font-weight:600; font-size:0.95rem; }
.p01-tl-step-meta { display:flex; gap:6px; flex-wrap:wrap; margin-top:4px; }
.p01-tl-badge { padding:2px 8px; border-radius:var(--radius-full); font-size:0.7rem; }
.p01-tl-badge.time { background:rgba(240,210,100,0.15); color:#F0D264; }
.p01-tl-badge.skill { background:rgba(184,184,232,0.1); color:var(--module-2); }
.p01-tl-connector { width:2px; background:var(--border-dark); height:16px; margin-left:17px; }
/* 场景判断器 */
.p01-quiz-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:var(--space-md); max-width:960px; margin:0 auto; }
.p01-quiz-card { background:var(--bg-light-elevated); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-light); }
.p01-quiz-scene { font-size:0.95rem; color:var(--text-on-light); line-height:1.6; margin-bottom:var(--space-sm); font-weight:500; }
.p01-quiz-btns { display:flex; gap:8px; flex-wrap:wrap; }
.p01-quiz-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; font-size:0.8rem; cursor:pointer; transition:all 0.2s; min-height:36px; font-family:var(--font-heading); }
.p01-quiz-btn:hover { background:var(--bg-light-alt); }
.p01-quiz-btn.correct { background:#22c55e20; border-color:#22c55e; color:#16a34a; }
.p01-quiz-btn.wrong { background:#ef444420; border-color:#ef4444; color:#dc2626; }
.p01-quiz-result { margin-top:var(--space-sm); padding:10px 12px; border-radius:var(--radius-sm); font-size:0.85rem; line-height:1.5; display:none; }
.p01-quiz-result.show { display:block; }
.p01-quiz-result.correct-msg { background:#22c55e15; color:#15803d; border-left:3px solid #22c55e; }
.p01-quiz-result.wrong-msg { background:#ef444415; color:#b91c1c; border-left:3px solid #ef4444; }
/* 能力矩阵 */
.p01-matrix-wrap { overflow-x:auto; }
.p01-matrix-table { border-collapse:collapse; width:100%; }
.p01-matrix-table th { padding:10px 14px; font-size:0.8rem; font-weight:600; color:var(--text-on-dark-2); text-align:center; }
.p01-matrix-table td { padding:8px; text-align:center; position:relative; }
.p01-matrix-cell { width:52px; height:36px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:0.85rem; cursor:pointer; transition:transform 0.2s; }
.p01-matrix-cell:hover { transform:scale(1.15); }
.p01-matrix-cell.score-2 { background:rgba(34,197,94,0.2); }
.p01-matrix-cell.score-1 { background:rgba(234,179,8,0.15); }
.p01-matrix-cell.score-0 { background:rgba(107,114,128,0.1); }
.p01-tool-label { text-align:left; padding:8px 12px; font-size:0.85rem; color:var(--text-on-dark); white-space:nowrap; font-weight:500; }
.p01-matrix-tooltip { position:fixed; background:var(--bg-dark-elevated); color:var(--text-on-dark); padding:10px 14px; border-radius:var(--radius-sm); font-size:0.82rem; max-width:200px; line-height:1.5; pointer-events:none; z-index:500; display:none; border:1px solid var(--border-dark); box-shadow:var(--shadow-dark); }
/* 展示切换 */
.p01-showcase-tabs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-bottom:var(--space-lg); }
.p01-showcase-tab { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid rgba(184,184,232,0.3); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; cursor:pointer; transition:all 0.25s; min-height:44px; font-family:var(--font-heading); }
.p01-showcase-tab:hover { border-color:var(--module-2); color:var(--text-on-dark); }
.p01-showcase-tab.active { background:rgba(184,184,232,0.12); border-color:var(--module-2); color:var(--module-2); }
.p01-showcase-panel { display:none; }
.p01-showcase-panel.active { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:start; }
.p01-showcase-prompt { background:var(--bg-dark-elevated); border-radius:var(--radius-md); padding:var(--space-md); border:1px solid var(--border-dark); }
.p01-showcase-prompt h4 { color:var(--module-2); font-size:var(--text-small); font-weight:600; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p01-showcase-prompt pre { font-family:var(--font-code); font-size:0.82rem; color:var(--text-on-dark-2); line-height:1.7; white-space:pre-wrap; word-wrap:break-word; }
.p01-showcase-review { margin-top:var(--space-sm); padding:10px 14px; background:rgba(184,184,232,0.06); border-radius:var(--radius-sm); border-left:3px solid var(--module-2); font-size:0.85rem; color:var(--text-on-dark-2); line-height:1.6; }
/* 响应式 */
@media (max-width:900px) {
  .p01-timeline-wrap { grid-template-columns:1fr; gap:var(--space-lg); }
  .p01-showcase-panel.active { grid-template-columns:1fr; }
}
@media (max-width:768px) {
  .p01-quiz-grid { grid-template-columns:1fr; }
  .p01-matrix-wrap { -webkit-overflow-scrolling:touch; }
}
</style>

<!-- ═══ HERO ═══ -->
<section class="section-dark section-hero-full p01-hero" id="p01-hero" style="align-items:center;position:relative;overflow:hidden;">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 02 / Page 01</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">AI 与科研绘图：新范式</h1>
    <p class="page-hero-sub" style="opacity:0;">AI-Assisted Scientific Visualization: A New Paradigm</p>
    <p class="p01-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">AI 改变的不只是速度，而是从"画"到"描述+迭代"的思维方式</p>
    <nav class="hero-quicknav" id="p01-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p01-s1">范式转变</button>
      <button class="hero-quicknav__item" data-target="#p01-s2">能力边界</button>
      <button class="hero-quicknav__item" data-target="#p01-s3">工具生态</button>
      <button class="hero-quicknav__item" data-target="#p01-s4">案例展示</button>
    </nav>
    <div class="p01-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ═══ S1: 范式转变 双时间线 ═══ -->
<section class="section-dark" id="p01-s1" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">工作流对比</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);font-size:var(--text-body);line-height:1.6;">不是 AI 更快，而是思维方式的根本转变</p>
    </div>
    <div class="p01-timeline-wrap" id="p01-timeline">
      <div class="p01-tl-col">
        <div class="p01-tl-header">
          <h3 style="color:var(--text-on-dark);">传统科研绘图</h3>
          <p style="color:var(--text-on-dark-3);font-size:0.85rem;margin-top:4px;">软件驱动，操作优先</p>
        </div>
        <div class="p01-tl-step" data-tl="trad-0"><div class="p01-tl-step-num">01</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">手绘草稿</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~30 min</span><span class="p01-tl-badge skill">纸笔构思</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="trad-1"><div class="p01-tl-step-num">02</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">软件建图</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~2 hr</span><span class="p01-tl-badge skill">Illustrator/PPT</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="trad-2"><div class="p01-tl-step-num">03</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">配色调试</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~45 min</span><span class="p01-tl-badge skill">色彩审美</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="trad-3"><div class="p01-tl-step-num">04</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">标注排版</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~1 hr</span><span class="p01-tl-badge skill">版式设计</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="trad-4"><div class="p01-tl-step-num">05</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">格式导出</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~20 min</span><span class="p01-tl-badge skill">技术参数</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="trad-5"><div class="p01-tl-step-num">06</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">反复修改</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">循环多次</span><span class="p01-tl-badge skill">耐心</span></div></div></div>
      </div>
      <div class="p01-tl-col">
        <div class="p01-tl-header">
          <h3 style="color:var(--module-2);">AI 辅助绘图</h3>
          <p style="color:var(--text-on-dark-3);font-size:0.85rem;margin-top:4px;">描述驱动，迭代为主</p>
        </div>
        <div class="p01-tl-step" data-tl="ai-0"><div class="p01-tl-step-num">01</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">CDTF 描述撰写</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~15 min</span><span class="p01-tl-badge skill">科学表达</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="ai-1"><div class="p01-tl-step-num">02</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">AI 生成初稿</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~2 min</span><span class="p01-tl-badge skill">Prompt 迭代</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="ai-2"><div class="p01-tl-step-num">03</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">迭代精修</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~30 min</span><span class="p01-tl-badge skill">审美判断</span></div></div></div>
        <div class="p01-tl-connector"></div>
        <div class="p01-tl-step" data-tl="ai-3"><div class="p01-tl-step-num">04</div><div class="p01-tl-step-body"><div class="p01-tl-step-title">矢量化后处理</div><div class="p01-tl-step-meta"><span class="p01-tl-badge time">~45 min</span><span class="p01-tl-badge skill">Illustrator</span></div></div></div>
      </div>
    </div>
  </div>
</section>

<!-- ═══ S2: 能力边界 场景判断器 ═══ -->
<section class="section-light" id="p01-s2" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">能力边界判断</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">点击判断每个场景是否适合使用 AI 辅助绘图</p>
    </div>
    <div class="p01-quiz-grid" id="p01-quiz-grid"></div>
  </div>
</section>

<!-- ═══ S3: 工具生态 能力矩阵 ═══ -->
<section class="section-dark" id="p01-s3" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-2xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-dark);">工具生态速览（2026）</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);line-height:1.6;">按任务类型分类，而非逐一介绍工具</p>
    </div>
    <div class="p01-matrix-wrap">
      <div id="p01-matrix-container"></div>
    </div>
    <div id="p01-matrix-tooltip" class="p01-matrix-tooltip"></div>
  </div>
</section>

<!-- ═══ S4: 展示组件 ═══ -->
<section class="section-light" id="p01-s4" style="min-height:auto;padding-top:var(--space-3xl);padding-bottom:var(--space-3xl);">
  <div class="content-wrapper">
    <div class="reading-wrapper" style="text-align:center;margin-bottom:var(--space-xl);">
      <h2 style="font-family:var(--font-display);font-size:var(--text-title);font-weight:700;letter-spacing:-0.02em;color:var(--text-on-light);">环境科学 AI 绘图展示</h2>
      <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">5 个真实环境科学场景，使用 Nano Banana 生成</p>
    </div>
    <div class="p01-showcase-tabs" id="p01-showcase-tabs"></div>
    <div id="p01-showcase-panels"></div>
  </div>
</section>

<!-- ═══ Footer CTA ═══ -->
<section class="page-footer-cta">
  <p class="page-footer-num">01 / 06</p>
  <h2 class="page-footer-quote">AI 不会取代科研绘图，但会用 AI 的人会</h2>
  <p class="page-footer-desc">接下来学习如何写出高质量的 Prompt，让 AI 真正理解你的科学意图。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p01-prev-btn">← 科研绘图工作流</button>
    <button class="btn-primary" id="p01-next-btn">Prompt 的艺术 →</button>
  </div>
</section>

</div>`;
}

export function init() {
  // ── Hero 入场动画 ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p01-hero .hero-eyebrow', { opacity:0,y:20 }, { opacity:1,y:0,duration:0.6,ease:'power3.out' }, 0);
  heroTl.fromTo('.p01-hero .page-hero-title', { y:30,opacity:0 }, { opacity:1,y:0,duration:0.8,ease:'power3.out' }, 0.15);
  heroTl.fromTo('.p01-hero .page-hero-sub',   { y:20,opacity:0 }, { opacity:0.5,y:0,duration:0.8,ease:'power3.out' }, 0.3);
  heroTl.fromTo('.p01-hero-tagline',  { y:20,opacity:0 }, { opacity:1,y:0,duration:0.8,ease:'power3.out' }, 0.45);
  heroTl.fromTo('#p01-quicknav',      { y:20,opacity:0 }, { opacity:1,y:0,duration:0.8,ease:'power3.out' }, 0.6);
  heroTl.fromTo('.p01-scroll-hint',   { opacity:0,y:15 }, { opacity:1,y:0,duration:0.6,ease:'power3.out' }, 0.75);

  // ── Hero 快捷导航 ──
  document.querySelectorAll('#p01-quicknav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  // ── S1: 时间线 ScrollTrigger 逐步激活 ──
  const tradSteps = document.querySelectorAll('[data-tl^="trad-"]');
  const aiSteps   = document.querySelectorAll('[data-tl^="ai-"]');
  // Activate all steps progressively on scroll into S1
  fadeIn([...tradSteps, ...aiSteps], { stagger:0.12, y:20 });
  // After fadeIn, set them to full opacity (override the 0→1 to make them "active")
  // Actually: use IntersectionObserver to add .active class per step
  const activateSteps = (steps) => {
    steps.forEach((step, i) => {
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { step.classList.add('active'); io.disconnect(); }
      }, { threshold: 0.5 });
      io.observe(step);
    });
  };
  activateSteps(tradSteps);
  activateSteps(aiSteps);

  // ── S2: 场景判断器 ──
  const SCENARIOS = [
    { scene:'为论文 Figure 1 绘制散点图（数据来自实验测量）', answer:'no',
      reason:'精确数据图必须用 R/Python，AI 无法保证数值准确性，会造成数据不可信。' },
    { scene:'为综述绘制"气候变化影响链"概念示意图', answer:'yes',
      reason:'概念图无精确数值要求，AI 擅长此类可视化，快速生成合适构图。' },
    { scene:'将 R 生成的箱线图配色优化为色盲友好方案', answer:'assist',
      reason:'AI 可建议配色方案和 HEX 值，但最终仍需在 R 中用 scale_color 手动应用。' },
    { scene:'绘制"样品采集→提取→测序→分析"实验流程图', answer:'yes',
      reason:'流程图是 AI 图解的强项，Mermaid AI 或通用图像生成均适用。' },
    { scene:'制作期刊封面图（河流生态系统艺术渲染）', answer:'assist',
      reason:'AI 生成封面图需编辑批准，且必须在文章中声明使用了 AI 辅助。' },
    { scene:'在 Figure 3 热力图上添加统计显著性星号标注', answer:'no',
      reason:'标注基于统计结果，必须源自实际分析数据，不能由 AI 生成。' },
    { scene:'绘制"碳循环与生态系统服务"综述框架图', answer:'yes',
      reason:'框架图是 AI 辅助的理想场景，可快速迭代视觉层次和隐喻。' },
    { scene:'将模型预测时间序列绘制为折线图并加置信带', answer:'no',
      reason:'需要真实数据驱动图表生成，R/Python 是唯一可靠路径。' },
  ];
  const LABELS = { yes:'✅ 该用 AI', no:'❌ 不该用', assist:'⚡ AI 辅助' };
  const grid = document.getElementById('p01-quiz-grid');
  if (grid) {
    SCENARIOS.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'p01-quiz-card';
      card.innerHTML = `<p class="p01-quiz-scene">${s.scene}</p>
        <div class="p01-quiz-btns">
          ${['yes','no','assist'].map(k => `<button class="p01-quiz-btn" data-answer="${k}" data-correct="${s.answer}">${LABELS[k]}</button>`).join('')}
        </div>
        <div class="p01-quiz-result" id="quiz-result-${i}"></div>`;
      grid.appendChild(card);
    });
    grid.querySelectorAll('.p01-quiz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.p01-quiz-card');
        const correct = btn.dataset.correct;
        const chosen  = btn.dataset.answer;
        const result  = card.querySelector('.p01-quiz-result');
        // Mark buttons
        card.querySelectorAll('.p01-quiz-btn').forEach(b => {
          b.classList.remove('correct','wrong');
          if (b.dataset.answer === correct) b.classList.add('correct');
          else if (b === btn) b.classList.add('wrong');
          b.disabled = true;
        });
        const isCorrect = chosen === correct;
        const scenarioIdx = [...grid.children].indexOf(card);
        result.textContent = (isCorrect ? '✓ 正确！' : '✗ 错误。') + ' ' + SCENARIOS[scenarioIdx].reason;
        result.className = `p01-quiz-result show ${isCorrect ? 'correct-msg' : 'wrong-msg'}`;
      });
    });
  }
  fadeIn(document.querySelectorAll('#p01-s2 .p01-quiz-card'), { stagger:0.08, y:30, start:'top 90%' });

  // ── S3: 能力矩阵 ──
  const MATRIX_TOOLS = ['GPT Image 1.5','Midjourney v7','FLUX 1.1 Pro','Recraft V3 SVG','StarVector','Mermaid AI'];
  const MATRIX_TASKS = ['概念示意图','流程图','数据图辅助','图标/素材'];
  const MATRIX_SCORES = [[2,1,0,2],[2,0,0,2],[2,0,0,2],[2,1,1,2],[1,2,0,1],[0,2,0,0]];
  const MATRIX_LABELS = ['❌','⚠️','✅'];
  const MATRIX_DESCS = {
    'GPT Image 1.5-概念示意图': '优秀的概念图生成，风格多样，科学准确性需审核',
    'GPT Image 1.5-流程图': '能生成流程图但精确度有限，建议用 Mermaid',
    'GPT Image 1.5-数据图辅助': '不建议：AI 无法生成准确数据图',
    'GPT Image 1.5-图标/素材': '可生成精美图标，风格统一度需注意',
    'Midjourney v7-概念示意图': '艺术风格强，适合综述封面和概念渲染',
    'Midjourney v7-流程图': '不擅长结构化流程图',
    'Midjourney v7-数据图辅助': '不适合',
    'Midjourney v7-图标/素材': '高质量素材生成',
    'FLUX 1.1 Pro-概念示意图': '开源强模型，科学图示质量优秀',
    'FLUX 1.1 Pro-流程图': '不擅长',
    'FLUX 1.1 Pro-数据图辅助': '不适合',
    'FLUX 1.1 Pro-图标/素材': '高质量素材',
    'Recraft V3 SVG-概念示意图': '支持原生 SVG 输出，概念图效果佳',
    'Recraft V3 SVG-流程图': '可生成简单流程图 SVG',
    'Recraft V3 SVG-数据图辅助': '有限支持，仍需人工处理',
    'Recraft V3 SVG-图标/素材': '直接输出矢量，最适合图标场景',
    'StarVector-概念示意图': '专注位图转矢量，概念图生成能力有限',
    'StarVector-流程图': '擅长转换现有流程图为 SVG',
    'StarVector-数据图辅助': '不适合',
    'StarVector-图标/素材': '可将位图图标转为矢量',
    'Mermaid AI-概念示意图': '不适合非结构化概念图',
    'Mermaid AI-流程图': '最强流程图工具，自然语言→可编辑流程图',
    'Mermaid AI-数据图辅助': '不适合',
    'Mermaid AI-图标/素材': '不适合',
  };
  const matrixContainer = document.getElementById('p01-matrix-container');
  const tooltip = document.getElementById('p01-matrix-tooltip');
  if (matrixContainer) {
    const table = document.createElement('table');
    table.className = 'p01-matrix-table';
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th style="text-align:left;">工具</th>${MATRIX_TASKS.map(t=>`<th>${t}</th>`).join('')}</tr>`;
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    MATRIX_TOOLS.forEach((tool, ti) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="p01-tool-label">${tool}</td>` +
        MATRIX_TASKS.map((task, ki) => {
          const score = MATRIX_SCORES[ti][ki];
          const desc = MATRIX_DESCS[`${tool}-${task}`] || '';
          return `<td><div class="p01-matrix-cell score-${score}" data-tool="${tool}" data-task="${task}" data-desc="${desc}">${MATRIX_LABELS[score]}</div></td>`;
        }).join('');
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    matrixContainer.appendChild(table);
    // Tooltip
    table.querySelectorAll('.p01-matrix-cell').forEach(cell => {
      cell.addEventListener('mouseenter', e => {
        tooltip.textContent = `${cell.dataset.tool} × ${cell.dataset.task}：${cell.dataset.desc}`;
        tooltip.style.display = 'block';
      });
      cell.addEventListener('mousemove', e => {
        tooltip.style.left = (e.clientX + 12) + 'px';
        tooltip.style.top  = (e.clientY + 12) + 'px';
      });
      cell.addEventListener('mouseleave', () => { tooltip.style.display = 'none'; });
      // Mobile tap
      cell.addEventListener('click', () => {
        tooltip.textContent = `${cell.dataset.tool} × ${cell.dataset.task}：${cell.dataset.desc}`;
        tooltip.style.display = 'block';
        setTimeout(() => { tooltip.style.display = 'none'; }, 3000);
      });
    });
  }
  fadeIn(document.querySelectorAll('#p01-s3 .reading-wrapper, #p01-matrix-container'), { stagger:0.2, y:30 });

  // ── S4: 展示切换组件 ──
  const SHOWCASE = [
    { id:'water', label:'水污染处理工艺', desc:'展示城市污水从进水到达标排放的完整处理流程，包含物化和生化处理单元',
      prompt: `环境工程示意图，风格：科技蓝色调，白色背景
主题：城市污水处理工艺流程
内容：进水格栅→沉砂池→初沉池→活性污泥池→二沉池→过滤消毒→出水
要求：每个处理单元用简洁图标表示，箭头连接，标注主要去除污染物`,
      review: '构图清晰，流程逻辑正确，颜色区分度高。需修正：活性污泥池内部微生物示意图比例需调整。' },
    { id:'carbon', label:'碳循环机制', desc:'森林生态系统碳固存与释放的自然循环机制，含大气-植物-土壤三界面',
      prompt: `生态系统示意图，科普风格，绿棕配色
主题：森林生态系统碳循环
内容：大气CO2→光合作用→植物固碳→凋落物→土壤有机碳→微生物分解→呼吸释放→大气
要求：自然主义风格，展示碳通量方向和大致比例`,
      review: '色彩自然，有机感强。需调整：土壤层截面的碳通量箭头宽度应反映实际碳流量比例。' },
    { id:'remote', label:'遥感分析 Pipeline', desc:'从卫星获取影像到最终地表分类结果的技术分析流程',
      prompt: `技术流程图，深色科技风格，蓝紫色调
主题：遥感影像地表分类分析流程
内容：卫星获取→大气校正→几何配准→特征提取→机器学习分类→精度评估→产品输出
每步配对应图标和简短说明`,
      review: '科技感强，图标设计清晰。建议增加：各步骤的典型软件工具标注（ENVI/GEE等）。' },
    { id:'micro', label:'微塑料迁移路径', desc:'微塑料从塑料制品源头经陆地-水体传输到达海洋的完整迁移过程',
      prompt: `环境科学示意图，蓝绿配色，自然风格
主题：微塑料从陆地到海洋的迁移路径
内容：塑料制品→风化破碎→径流携带→土壤渗漏→地下水→河流→近海→深海
标注：迁移速率、积累热点、采样位置`,
      review: '路径叙事完整，视觉引导性强。需修正：深海积累区域的颜色深度梯度需更明显。' },
    { id:'eco', label:'生态系统服务评估', desc:'森林生态系统提供的调节/供给/文化/支撑四类服务及其价值框架',
      prompt: `综述框架图，学术风格，绿色主调
主题：森林生态系统服务价值评估框架
四类服务：调节服务（气候/水文/固碳）、供给服务（木材/食物/水资源）、文化服务（休闲/教育/精神）、支撑服务（土壤/营养循环/生物多样性）
要求：同心圆或四象限布局，各类型有代表性图标`,
      review: '框架层次清晰，图标识别性好。建议：四类服务之间的相互关联箭头可增强，体现生态系统整体性。' },
  ];
  const tabsEl    = document.getElementById('p01-showcase-tabs');
  const panelsEl  = document.getElementById('p01-showcase-panels');
  if (tabsEl && panelsEl) {
    SHOWCASE.forEach((sc, i) => {
      const tab = document.createElement('button');
      tab.className = `p01-showcase-tab${i===0?' active':''}`;
      tab.textContent = sc.label;
      tab.dataset.idx = i;
      tabsEl.appendChild(tab);
      const panel = document.createElement('div');
      panel.className = `p01-showcase-panel${i===0?' active':''}`;
      panel.id = `p01-panel-${i}`;
      panel.innerHTML = `
        <div class="m2-placeholder" style="aspect-ratio:4/3;">
          <div class="m2-placeholder-inner">
            <div class="m2-ph-icon">🌿</div>
            <p class="m2-ph-label">AI 生成图占位符</p>
            <p class="m2-ph-desc">${sc.desc}</p>
          </div>
        </div>
        <div>
          <div class="p01-showcase-prompt">
            <h4>Prompt</h4>
            <pre>${sc.prompt}</pre>
          </div>
          <div class="p01-showcase-review">💬 ${sc.review}</div>
        </div>`;
      panelsEl.appendChild(panel);
    });
    tabsEl.querySelectorAll('.p01-showcase-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsEl.querySelectorAll('.p01-showcase-tab').forEach(t => t.classList.remove('active'));
        panelsEl.querySelectorAll('.p01-showcase-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`p01-panel-${tab.dataset.idx}`).classList.add('active');
      });
    });
  }
  fadeIn(document.querySelectorAll('#p01-s4 .reading-wrapper, #p01-showcase-tabs'), { stagger:0.15, y:30 });

  // ── Footer 按钮 ──
  document.getElementById('p01-prev-btn')?.addEventListener('click', () => navigateTo('m1-p10'));
  document.getElementById('p01-next-btn')?.addEventListener('click', () => navigateTo('m2-p2'));
}

export function destroy() {
  killAll();
}
```

- [ ] **Step 2: Run dev server and visually verify p01**

```bash
npm run dev
```

Navigate to `#m2-p1`. Check:
- Hero animates in (eyebrow → title → sub → tagline → quicknav → scroll-hint)
- S1 timeline shows two columns with step cards
- S2 quiz cards appear, clicking buttons shows correct/wrong feedback
- S3 matrix renders as table with emoji cells, hover shows tooltip
- S4 tabs switch between 5 scenarios with placeholder image + prompt
- Footer CTA shows correctly

- [ ] **Step 3: Commit**

```bash
git add src/pages/m2/p01-ai-overview.js
git commit -m "feat(m2-p1): AI新范式 — D3时间线+场景判断器+能力矩阵+展示组件"
```

---

## Chunk 2: p02 Prompt工程

### Task 2: m2-p2 Prompt的艺术

**File:** `src/pages/m2/p02-prompt-engineering.js`

**Sections:**
- Hero: Module 02 / Page 02, "从想法到图像：Prompt 的艺术"
- S1 CDTF 解剖 (深色): 左侧固定完整 prompt + 右侧滚动高亮四要素（JS sticky 模拟）
- S2 好差 Prompt 对比 (浅色): 3组场景，每组 BeforeAfter 滑块占位符 + prompt逐行diff对比
- S3 迭代优化工作流 (深色): 4步横向时间线，缩略图 + 点击展开大图占位符 + prompt diff
- S4 Prompt 模板库 (浅色): 列表+预览浏览器布局，左模板列表+右模板结构+示例+CopyButton
- Footer CTA: "← AI新范式" | "后处理流程 →"

**Key interactive components:**

**S1 CDTF 粘性滚动 (使用 JS transform sticky 模式):**
```js
// 完整 prompt 固定在左侧，右侧4个要素面板各占一屏高度
// 每个面板对应高亮 prompt 中的对应部分
// 使用 rAF ticking scroll handler (不用 GSAP pin，因为 sticky 在本项目中失效)
const CDTF_PROMPT = `为《自然通讯》制作碳循环机制示意图，
科学期刊风格，白色背景，清晰线条
[Context] 中国北方温带森林生态系统
[Description] 大气CO2经光合作用固定→树木生长储碳→
凋落物→土壤有机质→微生物分解→CO2释放回大气
展示碳通量方向和量级（GPP 1200 gC/m²/yr，
Ra 580，Rh 280，NEP 340）
[Technique] 剖面视角，左半显示地上，右半显示地下
色彩：大气用浅蓝，植被用绿色，土壤用棕色系渐变
标注用 Helvetica，字号 10-12pt
[Format] 分辨率 300 DPI，RGB 色彩空间，
比例 1:1.2（宽:高），导出 PNG + SVG 双格式`;
```

**S4 Prompt 模板库:**
```js
const TEMPLATES = [
  { type:'概念示意图', icon:'🔵', label:'概念示意图',
    structure: `为《[期刊名]》制作[研究主题]概念示意图，[插图风格]
[Context] [研究背景/生态系统/实验条件]
[Description] [核心科学过程，3-5个关键步骤]
[Technique] [视角：鸟瞰/剖面/3D] + [配色方案] + [标注字体/字号]
[Format] 分辨率[DPI]，[色彩模式]，比例[W:H]，格式[PNG/SVG]`,
    example: `为《Environmental Science & Technology》制作土壤重金属修复概念示意图，学术插图风格
[Context] EDTA辅助植物修复技术，中国华北平原农业土壤
[Description] EDTA施用→土壤重金属活化→植物根系吸收→地上部积累→收割移除
[Technique] 剖面视角，土壤层次清晰，绿色植株+棕色土壤+蓝色箭头标注通量
[Format] 300 DPI，RGB，1:1.2，PNG + SVG` },
  { type:'实验流程图', icon:'🔬', label:'实验流程图',
    structure: `实验方法流程图，[背景颜色]，[风格]
[Context] [实验目的/方法体系]
[Description] 步骤1: [样品来源] → 步骤2: [处理方法] → 步骤3: [分析测试] → 步骤4: [数据处理]
[Technique] 线性流程布局，每步配[图标类型]，色彩：[配色方案]
[Format] 宽:高 = [比例]，分辨率 300 DPI`,
    example: `实验方法流程图，白色背景，简洁学术风格
[Context] 沉积物重金属形态分析，BCR顺序提取法
[Description] 步骤1: 样品采集（河流沉积物）→ 步骤2: BCR顺序提取（4个组分）→ 步骤3: ICP-MS测定 → 步骤4: 统计分析
[Technique] 从左到右线性流程，化学试剂瓶/烧杯图标，蓝灰配色
[Format] 宽:高 = 3:1，300 DPI，PNG` },
  { type:'Graphical Abstract', icon:'📋', label:'Graphical Abstract',
    structure: `期刊 Graphical Abstract，白色/浅灰背景，信息密集但清晰
[Context] [论文主题一句话], 发表于[目标期刊]
[Description] 左侧：[问题/研究背景] → 中间：[核心方法/发现] → 右侧：[意义/结论]
关键数据：[最重要的1-3个量化结果]
[Technique] 左-中-右三栏布局，关键数字放大突出，箭头引导阅读
[Format] 宽:高 = 1.8:1，RGB，300 DPI，白色背景`,
    example: `期刊 Graphical Abstract，白色背景
[Context] 黄河流域重金属污染时空分布特征，发表于 Science of The Total Environment
[Description] 左：黄河流域采样点地图（56个点）→ 中：Cd/Pb/Cu污染热点识别+源解析（PMF模型）→ 右：农业/矿业/城市化贡献占比（58%/27%/15%）
关键数据：Cu浓度超标率42%，Cd最高超标14倍
[Technique] 三栏布局，黄河用蓝色曲线贯穿，数据用图表而非文字，字号层次明确
[Format] 1.8:1，RGB，300 DPI` },
  { type:'综述框架图', icon:'🗺', label:'综述框架图',
    structure: `综述文章框架概念图，学术风格，[配色方案]
[Context] [综述主题]，涵盖[几个]核心方向
[Description] 框架结构：[主题] → [子主题1/子主题2/子主题3] → [各子主题的核心内容]
[Technique] [层级关系/同心圆/模块化布局]，关键概念加边框突出，关联线展示相互关系
[Format] 方形或竖版布局，300 DPI，RGB，适合打印`,
    example: `综述文章框架概念图，深蓝白配色，学术风格
[Context] 微塑料在土壤-植物系统中的行为与效应综述，涵盖4个核心方向
[Description] 框架：微塑料土壤效应 → ①土壤物理结构改变 ②微生物群落影响 ③植物吸收与毒性 ④食物链传递
各方向标注代表性研究方法和关键发现
[Technique] 中心主题+四象限辐射布局，关联箭头，关键词加框
[Format] 1:1正方形，300 DPI，RGB` },
  { type:'数据可视化辅助', icon:'📊', label:'数据可视化辅助',
    structure: `数据图表配套示意图，[风格]，[配色]
[Context] [论文数据类型]，作为 Figure [X] 的[补充/底图]
[Description] [需要展示的数据关系/趋势/空间分布]
辅助元素：[坐标轴说明/图例/比例尺/北方向]
[Technique] [视图类型]，与主图表配色一致，精确标注单位
[Format] [精确像素/尺寸]，[DPI]，用于[杂志单栏/双栏]`,
    example: `数据图表背景底图，简洁科学风格，蓝白配色
[Context] 渤海湾重金属时空分布数据，作为 Figure 2 的地图底图
[Description] 渤海湾轮廓线，主要河流入海口标记，5个采样区域多边形（空心，用于叠加数据点）
辅助：坐标格网（0.5°间隔），比例尺（50km），北向标
[Technique] 极简地图风格，深蓝海洋，白色陆地，采样区域用灰色虚线多边形
[Format] 600×500像素，300 DPI，RGB，PNG透明背景` },
];
```

- [ ] **Step 1: Write p02 full implementation**

The implementation includes:
1. Hero with GSAP timeline (same pattern as p01)
2. S1: CDTF sticky layout using JS rAF ticking scroll handler
3. S2: 3 comparison cards with "差 prompt → 好 prompt" side-by-side text diff + placeholder images
4. S3: 4-step horizontal timeline with expandable overlay + placeholder images
5. S4: Browser layout (left template list + right template preview + CopyButton)

Key code for S1 sticky scroll:
```js
// In init():
const cdtfBody = document.getElementById('p02-cdtf-body');
const cdtfLeft = document.getElementById('p02-cdtf-left');
if (cdtfBody && cdtfLeft) {
  const STEP_COUNT = 4;
  let ticking = false;
  let currentStep = -1;
  const cachedBodyH = cdtfBody.offsetHeight;
  const cachedLeftH = cdtfLeft.offsetHeight;
  const maxTranslate = Math.max(0, cachedBodyH - cachedLeftH);

  function updateCDTF() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const bodyTop = cdtfBody.getBoundingClientRect().top;
      const scrolledPast = Math.max(0, -bodyTop);
      cdtfLeft.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;
      const stepIdx = Math.min(STEP_COUNT - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
      if (stepIdx !== currentStep) {
        currentStep = stepIdx;
        // Highlight corresponding CDTF segment
        document.querySelectorAll('.p02-cdtf-seg').forEach((seg, i) => {
          seg.classList.toggle('active', i === stepIdx);
        });
        // Show right panel
        document.querySelectorAll('.p02-cdtf-panel').forEach((p, i) => {
          p.classList.toggle('active', i === stepIdx);
        });
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', updateCDTF, { passive: true });
  _scrollHandlers.push({ fn: updateCDTF, el: window });
}
```

Key code for CopyButton in S4 (use existing CopyButton.js component):
```js
import { createCopyButton } from '../../components/CopyButton.js';
// In init() S4 section:
document.querySelectorAll('.p02-template-copy-btn').forEach(btn => {
  const targetId = btn.dataset.target;
  createCopyButton(btn, () => document.getElementById(targetId)?.textContent || '');
});
```

- [ ] **Step 2: Visual verify p02**

Navigate to `#m2-p2`. Check:
- Hero animates correctly
- S1 CDTF: scroll down to see left panel stay fixed while right panels cycle through C/D/T/F
- S2: 3 comparison cards show bad vs good prompt with color-coded diff
- S3: 4 iteration steps visible, clicking thumbnail shows overlay with larger placeholder
- S4: left list click updates right preview, copy button works
- Mobile: S1 degrades to stacked panels, S4 to single column

- [ ] **Step 3: Commit**

```bash
git add src/pages/m2/p02-prompt-engineering.js
git commit -m "feat(m2-p2): Prompt工程 — CDTF粘性解剖+好差对比+迭代时间线+模板库"
```

---

## Chunk 3: p03 后处理

### Task 3: m2-p3 AI输出后处理

**File:** `src/pages/m2/p03-vectorization.js`

**Sections:**
- Hero: Module 02 / Page 03, "从位图到矢量：AI 输出的后处理"
- S1 问题展示 (深色): 5 张问题卡片 fadeIn scroll — 占位符图+红圈标注（CSS overlay）+文字
- S2 矢量化三路径 (浅色): Tab 切换器 — 3个路径的流程图+适用场景+优缺点
- S3 Image Trace 模拟器 (深色): 4 滑块 → SVG 实时渲染预览（pure JS SVG generation）
- S4 精修工作流 (浅色): 5步 StickySteps + BeforeAfter 占位符对比
- Footer CTA: "← Prompt的艺术" | "AI辅助图解 →"

**S1 问题卡片数据:**
```js
const PROBLEMS = [
  { icon:'📐', title:'分辨率不足', desc:'AI生成图默认输出1024×1024像素，仅约72 DPI。期刊要求通常≥300 DPI，放大后出现明显像素化。', region:'左上角文字区域像素化' },
  { icon:'🔤', title:'文字乱码', desc:'AI生成的中文标注常出现乱码、字形扭曲或拼写错误，无法直接用于出版。科学术语需要人工逐一核查。', region:'图中"碳通量"标注变形' },
  { icon:'⚗️', title:'科学细节错误', desc:'AI可能生成视觉上合理但科学错误的内容，如箭头方向反转、化学结构式错误、数量级标注不准确。', region:'碳循环箭头方向错误' },
  { icon:'🎨', title:'风格不统一', desc:'同一论文中多张AI生成图风格各异，与其他数据图表色彩/字体/线条粗细不协调，破坏整体视觉一致性。', region:'与其他图表配色不匹配' },
  { icon:'📋', title:'格式不合规', desc:'直接输出的PNG缺少CMYK版本、出血框或PDF矢量格式，不符合期刊投稿要求。', region:'色彩模式/格式不符合要求' },
];
```

**S2 矢量化路径数据:**
```js
const PATHS = [
  { id:'native', label:'① AI原生SVG', color:'#95D5B2',
    steps:['输入文本描述','→','Recraft V3 SVG生成','→','直接获得SVG文件','→','Illustrator精修'],
    pros:['无损矢量，天然可编辑','颜色块状清晰，适合图标类'],
    cons:['写实风格效果差','复杂机制图支持有限'],
    use:'图标、Logo、简单流程图、色块分明的示意图' },
  { id:'ai-convert', label:'② AI辅助转换', color:'#7EC8E3',
    steps:['AI位图输出','→','Vectorizer.AI / StarVector','→','自动生成SVG路径','→','Illustrator清理'],
    pros:['支持任意AI图像输入','比Image Trace保留更多细节'],
    cons:['复杂图像路径数量庞大','处理时间较长（分钟级）'],
    use:'需要矢量化的AI生成概念图、遥感图示、复杂背景图像' },
  { id:'trace', label:'③ 传统Image Trace', color:'#B8B8E8',
    steps:['AI位图输出','→','Illustrator Image Trace','→','参数调节','→','扩展路径','→','手动清理'],
    pros:['本地处理，无隐私顾虑','参数可精细控制'],
    cons:['参数调节需经验积累','复杂渐变图效果较差'],
    use:'简单线稿、图标化风格AI图、色块清晰的流程图' },
];
```

**S3 Image Trace 模拟器 (纯 SVG 参数演示):**
```js
// 4个滑块控制参数：
// threshold: 10-250 (色彩阈值，影响颜色数量)
// paths: 1-100 (路径精度，影响细节)
// corners: 0-100 (角度阈值，影响曲线vs折线)
// noise: 1-100 (噪声阈值，影响路径简化)
// 视觉效果：用D3生成一个模拟"矢量化程度"的SVG图
// 低threshold/低paths → 稀疏色块（像素化感）
// 高threshold/高paths → 细密路径（接近原图）
// 这是一个模拟演示，不需要真实图像输入
function renderTraceSVG(threshold, pathCount, corners, noise) {
  // Generate abstract SVG that visually represents vectorization level
  // Color count decreases as threshold increases
  // Detail level increases as pathCount increases
}
```

**S4 精修5步数据:**
```js
const REFINE_STEPS = [
  { num:'01', title:'清理多余路径', desc:'矢量化后通常产生数百至数千个冗余路径。使用 Illustrator 的"简化路径"（Ctrl+Alt+J）和"合并"工具，将路径数量减少到合理范围（通常减少60-80%）。',
    tip:'选中全部路径 → 对象→路径→简化，容差设为1-2px，勾选"预览"逐步调整。' },
  { num:'02', title:'统一配色系统', desc:'AI生成图的颜色往往细微差异大（例如同一绿色有数十种近似值）。用全局重新着色（Ctrl+Shift+F）将相似颜色合并，建立统一色板。',
    tip:'编辑→编辑颜色→重新着色图稿，减少颜色数量至5-8种，匹配论文其他图表配色。' },
  { num:'03', title:'修正文字标注', desc:'所有AI生成的文字必须删除重写：删除AI文字路径→使用 Helvetica/Arial 重新添加→核查所有科学术语拼写和单位格式。',
    tip:'期刊一般要求标注字号8-10pt，轴标签10-12pt，图标题14pt。中文场景使用 Noto Sans SC。' },
  { num:'04', title:'调整布局比例', desc:'根据目标期刊的图版要求（单栏宽度约86mm，双栏约176mm）调整图像比例。使用 Illustrator 的画板工具精确设置尺寸。',
    tip:'文档设置→画板尺寸设为期刊要求（如Nature单栏：88mm×88mm），内容等比缩放。' },
  { num:'05', title:'导出出版格式', desc:'最终导出需要同时提供矢量（PDF/EPS）和位图（TIFF/PNG，≥300DPI）两种格式。PDF保留可编辑性，TIFF用于生产印刷。',
    tip:'文件→导出→存储为→PDF（保留Illustrator编辑功能）+ 导出为→PNG（300DPI，RGB）。' },
];
```

- [ ] **Step 1: Write p03 full implementation**

Pattern for S3 Image Trace simulator (D3-based SVG simulation):

```js
// In init(), S3 slider handlers:
function renderTraceSim(threshold, pathPct, corners, noise) {
  const container = document.getElementById('p03-trace-preview');
  if (!container) return;
  const W = 400, H = 300;
  // Clear previous
  while(container.firstChild) container.removeChild(container.firstChild);
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio','xMidYMid meet')
    .style('width','100%').style('height','auto')
    .style('border-radius','12px');
  // Background
  svg.append('rect').attr('width',W).attr('height',H).attr('fill','#1a1a2e').attr('rx',12);
  // Simulate: fewer colors at higher threshold, more blocky at lower pathPct
  const colorCount = Math.max(2, Math.round(8 - (threshold/250)*6));
  const blockSize  = Math.max(4, Math.round(40 - (pathPct/100)*36));
  const palette = d3.schemeTableau10.slice(0, colorCount);
  // Render grid of colored blocks (simulating vectorized regions)
  for (let y = 0; y < H; y += blockSize) {
    for (let x = 0; x < W; x += blockSize) {
      const color = palette[Math.floor((x/W + y/H + noise/200) * palette.length) % palette.length];
      svg.append('rect')
        .attr('x',x).attr('y',y)
        .attr('width',blockSize).attr('height',blockSize)
        .attr('fill',color).attr('opacity',0.7)
        .attr('rx', corners/100 * blockSize * 0.5);
    }
  }
  // Overlay: path count indicator
  svg.append('text')
    .attr('x',W-10).attr('y',H-10)
    .attr('text-anchor','end')
    .attr('fill','rgba(255,255,255,0.4)')
    .attr('font-size',11).attr('font-family','monospace')
    .text(`~${Math.round(pathPct * 3 + 50)} 路径`);
}
```

- [ ] **Step 2: Visual verify p03**

Check:
- 5 problem cards fadeIn on scroll
- Tab switcher between 3 vectorization paths
- 4 sliders update SVG preview in real time
- 5-step sticky workflow shows correctly (or stacked on mobile)
- Placeholder images in S1 and S4

- [ ] **Step 3: Commit**

```bash
git add src/pages/m2/p03-vectorization.js
git commit -m "feat(m2-p3): AI输出后处理 — 问题展示+三路径Tab+模拟器+精修工作流"
```

---

## Chunk 4: p04 AI图解设计

### Task 4: m2-p4 AI辅助科研图解设计

**File:** `src/pages/m2/p04-ethics.js`

> ⚠️ Note: file is named p04-ethics.js but contains p4 content (AI辅助科研图解). This is a pre-existing naming mistake in the project.

**Sections:**
- Hero: Module 02 / Page 04, "AI 辅助科研图解设计"
- S1 图解类型学 (浅色): 5种图解的D3/SVG缩略图 + 点击展开详情
- S2 文生图解工具链 (深色): Mermaid代码+实时渲染 — 3个环境科学场景可切换
- S3 AI+精修协作策略 (浅色): 5步StickySteps + 占位符图
- S4 展示组件 (深色): 5种图解切换展示 + 占位符
- Footer CTA: "← AI输出后处理" | "伦理与合规 →"

**Mermaid integration for S2:**
```js
// Dynamic import mermaid in init()
import('mermaid').then(({ default: mermaid }) => {
  mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
  // Render diagrams on demand
  async function renderMermaid(code, container) {
    container.innerHTML = '';
    const id = 'mermaid-' + Date.now();
    const { svg } = await mermaid.render(id, code);
    container.innerHTML = svg;
  }
});
```

**S2 三个场景的 Mermaid 代码:**
```js
const MERMAID_SCENES = [
  { label:'污水处理工艺', description:'城市污水处理厂完整工艺流程',
    code: `flowchart LR
  A[进水] --> B[格栅间]
  B --> C[沉砂池]
  C --> D[初沉池]
  D --> E[曝气池\n活性污泥]
  E --> F[二沉池]
  F --> G{达标?}
  G -->|是| H[消毒池]
  G -->|否| E
  H --> I[排放]
  D --> J[污泥处理]
  F --> J
  J --> K[污泥消化]
  K --> L[脱水填埋]` },
  { label:'大气颗粒物来源解析', description:'PM2.5来源解析技术路线',
    code: `flowchart TD
  A[环境样品采集\nPM2.5滤膜] --> B[化学组分分析]
  B --> C[离子色谱\nSO4/NO3/NH4]
  B --> D[ICP-MS\n重金属元素]
  B --> E[碳分析仪\nOC/EC]
  C & D & E --> F[受体模型]
  F --> G[PMF模型\nPositive Matrix Factorization]
  G --> H{源解析结果}
  H --> I[交通源 28%]
  H --> J[工业源 35%]
  H --> K[扬尘源 18%]
  H --> L[二次生成 19%]` },
  { label:'生态系统碳汇监测', description:'涡度相关法碳通量监测技术体系',
    code: `flowchart LR
  A[涡度相关塔] --> B[超声风速仪\n三维风速]
  A --> C[CO2/H2O\n红外分析仪]
  B & C --> D[10Hz原始数据]
  D --> E[EddyPro软件\n数据质控]
  E --> F{质量标志}
  F -->|优| G[净生态系统\n生产力NEP]
  F -->|差| H[插补处理\nRF/ANN]
  H --> G
  G --> I[年度碳收支\n±gC/m²/yr]
  I --> J[与遥感GPP\n数据融合]` },
];
```

**S1 图解类型学 D3 缩略图:**
```js
// 5种图解的SVG缩略图，使用D3绘制
// 每种图解有明显的结构特征
const DIAGRAM_TYPES = [
  { id:'flowchart', label:'实验流程图', char:'线性', color:'#7EC8E3',
    desc:'展示实验步骤的顺序执行，适合方法部分',
    drawFn: (svg, w, h) => { /* 绘制线性箭头链 */ } },
  { id:'roadmap', label:'技术路线图', char:'层级', color:'#95D5B2',
    desc:'展示研究框架和技术路线，适合摘要图',
    drawFn: (svg, w, h) => { /* 绘制树状层级结构 */ } },
  { id:'mechanism', label:'机制示意图', char:'循环', color:'#B8B8E8',
    desc:'展示物质流或能量流的循环机制',
    drawFn: (svg, w, h) => { /* 绘制循环箭头图 */ } },
  { id:'pipeline', label:'数据分析管线', char:'分支', color:'#F0B27A',
    desc:'展示数据处理和分析流程，带条件判断',
    drawFn: (svg, w, h) => { /* 绘制带判断节点的流程图 */ } },
  { id:'framework', label:'概念框架图', char:'网络', color:'#E07A7A',
    desc:'展示概念间关系，适合综述文章',
    drawFn: (svg, w, h) => { /* 绘制网络节点图 */ } },
];
```

- [ ] **Step 1: Write p04 full implementation**

Key implementation notes:
- Use `import('mermaid')` as a dynamic import at the top of init()
- Fallback: if Mermaid fails to load, show a styled code block instead
- The Mermaid container must have unique id each time render() is called (to avoid stale ids)
- SVG thumbnails for S1 are drawn with d3 using simple geometric primitives (no AI images needed)

```js
// Mermaid initialization pattern:
let mermaidReady = false;
let mermaidApi = null;

async function initMermaid() {
  try {
    const mod = await import('mermaid');
    mermaidApi = mod.default;
    mermaidApi.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose',
      themeVariables: { primaryColor: '#2d2d4a', primaryTextColor: '#f5f5f7',
        lineColor: '#B8B8E8', background: '#1d1d1f' }
    });
    mermaidReady = true;
  } catch(e) { console.warn('Mermaid load failed:', e); }
}

async function renderMermaid(code, containerId) {
  if (!mermaidReady || !mermaidApi) return;
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const uid = 'mg-' + Math.random().toString(36).slice(2,8);
    const { svg } = await mermaidApi.render(uid, code);
    container.innerHTML = svg;
    container.querySelector('svg')?.setAttribute('style', 'max-width:100%;height:auto;');
  } catch(e) {
    container.innerHTML = `<pre style="color:var(--text-on-dark-2);font-size:0.8rem;padding:var(--space-md);">${code}</pre>`;
  }
}
```

- [ ] **Step 2: Visual verify p04**

Check:
- S1: 5 diagram thumbnails drawn by D3, clicking shows detail card
- S2: Mermaid renders actual flowcharts for each of 3 scenes (not just code)
- S3: 5-step sticky workflow
- S4: 5 diagram type tabs with placeholders

- [ ] **Step 3: Commit**

```bash
git add src/pages/m2/p04-ethics.js
git commit -m "feat(m2-p4): AI辅助图解 — 类型学D3+Mermaid实时渲染+协作策略+展示组件"
```

---

## Chunk 5: p05 伦理合规

### Task 5: m2-p5 伦理版权与学术规范

**File:** `src/pages/m2/p05-ai-diagrams.js`

> ⚠️ Note: file is named p05-ai-diagrams.js but contains p5 content (伦理版权). Pre-existing naming mistake.

**Sections:**
- Hero: Module 02 / Page 05, "伦理、版权与学术规范"
- S1 期刊政策全景 (浅色): 交互式表格（✅/⚠️/❌），5大期刊×4维度，移动端首列固定+横滚
- S2 合规使用边界 (深色): D3 渐变光谱图（5层），点击展开案例说明
- S3 情景判断练习 (浅色): 8-10道题，三选一，即时反馈+期刊政策引用
- S4 AI声明模板生成器 (深色): 3个下拉框 → 实时生成中英文声明 → CopyButton
- Footer CTA: "← AI辅助图解" | "端到端实战 →"

**S1 期刊政策数据:**
```js
const JOURNALS = ['Nature', 'Science', 'Cell/Elsevier', 'PNAS', 'Lancet'];
const DIMENSIONS = ['数据图（Figure）', '示意图/概念图', '封面图', 'AI文字辅助'];
const POLICIES = [
  // [数据图, 示意图, 封面图, 文字辅助]  ❌⚠️✅
  ['❌ 禁止', '⚠️ 需声明', '⚠️ 需编辑批准', '⚠️ 需声明'],  // Nature
  ['❌ 禁止', '⚠️ 需声明', '⚠️ 需编辑批准', '⚠️ 需声明'],  // Science
  ['❌ 禁止', '⚠️ 需声明', '✅ 允许+声明', '⚠️ 需声明'],    // Cell/Elsevier
  ['❌ 禁止', '⚠️ 需声明', '⚠️ 需编辑批准', '✅ 允许'],      // PNAS
  ['❌ 禁止', '❌ 禁止', '❌ 禁止', '⚠️ 需声明'],           // Lancet
];
const POLICY_DETAILS = {
  'Nature-数据图': 'Nature明确禁止使用AI生成任何研究数据图，违反则视为学术不端（见2024年修订政策）。',
  'Nature-示意图/概念图': '允许用AI生成概念示意图，但必须在图注中声明"该图由[AI工具名]辅助生成"。',
  // ... 其他详情
};
```

**S2 合规光谱 D3:**
```js
const SPECTRUM_LAYERS = [
  { level:1, color:'#22c55e', label:'完全安全', example:'AI辅助配色、AI建议排版', desc:'使用AI工具协助配色决策、排版建议或语法检查，无需额外声明。' },
  { level:2, color:'#84cc16', label:'需声明', example:'AI生成概念示意图用于论文', desc:'在图注中注明"图由[工具]辅助生成"，并确保科学准确性由作者保证。' },
  { level:3, color:'#eab308', label:'需编辑批准', example:'AI生成期刊封面图', desc:'提交前需联系期刊编辑获得书面批准，不同期刊政策不同。' },
  { level:4, color:'#ef4444', label:'严格禁止', example:'AI生成/修改实验数据图', desc:'将AI生成内容用于展示数据、实验结果或统计分析，属于学术造假。' },
  { level:5, color:'#6b7280', label:'灰色地带', example:'AI增强真实照片/显微图像', desc:'对真实照片进行AI增强（去噪、分辨率提升）存在争议，需在方法部分详细说明。' },
];
```

**S3 情景判断题:**
```js
const ETHICS_SCENARIOS = [
  { q:'将遥感卫星图用AI"去云"处理后作为 Figure 数据展示', answer:'no',
    feedback:'这是对真实数据的AI修改，属于灰色地带中最危险部分，大多数期刊不允许，PNAS等要求详细说明处理过程。' },
  { q:'用 Midjourney 生成论文 TOC（Table of Contents）图形摘要', answer:'declare',
    feedback:'TOC图属于示意图范畴，大多数期刊允许但需声明。格式：在图注末尾加"This figure was generated with AI assistance (Midjourney, 2025)"。' },
  { q:'用ChatGPT帮助润色论文中图表说明（Figure Caption）文字', answer:'yes',
    feedback:'语言辅助属于允许范围，但部分期刊（如Elsevier系列）要求在Author Contributions中说明AI工具的使用。' },
  { q:'用 Stable Diffusion 生成"理想化"实验装置示意图用于 Methods', answer:'declare',
    feedback:'装置示意图用于方法说明是允许的（如果科学准确），需声明AI辅助，并确保所有技术细节经过人工核实。' },
  { q:'AI直接生成扫描电镜（SEM）风格图像替代真实显微照片', answer:'no',
    feedback:'严格禁止。AI生成的显微图像假冒真实数据，属于严重学术不端，可能导致撤稿和处分。' },
  { q:'用 DALL-E 为审稿信中的实验设计概念图生成可视化', answer:'declare',
    feedback:'审稿信不是正式论文组成部分，通常允许，但建议备注说明以保持透明度。' },
  { q:'将ChatGPT生成的文字作为论文正文发表而不声明', answer:'no',
    feedback:'几乎所有顶刊都要求声明任何AI辅助写作。不声明将被认定为学术不端，可能导致拒稿或撤稿。' },
  { q:'用AI图解工具（Mermaid AI）生成实验流程图，在Methods中使用', answer:'declare',
    feedback:'流程图用于方法说明是合理的，需声明"流程图使用Mermaid AI辅助绘制，内容经作者核实"。' },
];
```

**S4 声明模板生成器:**
```js
// 3个下拉框
const JOURNALS_LIST = ['Nature', 'Science', 'Cell', 'Elsevier系列', 'PNAS', 'Lancet', 'ACS期刊', 'Wiley期刊', '其他期刊'];
const USAGE_TYPES = ['概念示意图/流程图', 'Graphical Abstract', '封面图', '数据可视化辅助', '语言润色', '多种用途'];
const AI_TOOLS = ['GPT Image / DALL-E', 'Midjourney', 'Stable Diffusion / FLUX', 'Recraft V3', 'Mermaid AI', 'ChatGPT', '多种AI工具'];

// 根据选择生成声明模板
function generateDeclaration(journal, usage, tool) {
  const EN = `This figure [was/were] created with the assistance of ${tool} (${new Date().getFullYear()}). The content has been verified by the authors for scientific accuracy. This use complies with the editorial policies of ${journal}.`;
  const CN = `本文中的${usage}在${tool}辅助下绘制（${new Date().getFullYear()}年）。所有内容已由作者核实科学准确性，符合${journal}的编辑政策。`;
  return { EN, CN };
}
```

- [ ] **Step 1: Write p05 full implementation**

Key implementation notes:
- Journal policy table: use `position: sticky` on first `<th>` for column header — this works because the table's parent has `overflow-x: auto` as a NEW scroll container, so sticky works within that scope
- D3 spectrum: vertical stacked bars with color gradient, each row expandable onClick
- Quiz cards: same pattern as p01 quiz but with 3 options (可以/需声明/不可以)
- Generator: use `addEventListener('change')` on all 3 selects → regenerate text

- [ ] **Step 2: Visual verify p05**

Check:
- S1: Table renders with emoji status, mobile scrollable with fixed first column effect
- S2: D3 spectrum shows 5 layers, clicking expands detail text
- S3: 8 quiz cards, clicking answers shows feedback + policy reference
- S4: Dropdown selection generates both Chinese and English declaration text, copy works

- [ ] **Step 3: Commit**

```bash
git add src/pages/m2/p05-ai-diagrams.js
git commit -m "feat(m2-p5): 伦理合规 — 期刊政策表+合规光谱D3+情景练习+声明生成器"
```

---

## Chunk 6: p06 实战案例 + Final Verification

### Task 6: m2-p6 端到端实战三案例

**File:** `src/pages/m2/p06-case-studies.js`

**Sections:**
- Hero: Module 02 / Page 06, "端到端实战：三个完整案例"
- S1 案例选择器 (深色): 3张案例卡，点击滚动到对应案例
- S2 案例一：水污染 GA (浅色): StickySteps 6-7步 + 占位符 + BeforeAfter(占位符)
- S3 案例二：微塑料迁移方法图 (深色): StickySteps + Mermaid代码渲染 + 占位符
- S4 案例三：碳循环综述概念图 (浅色): StickySteps + 占位符
- S5 经验总结 (深色): 对比表格 + 要点卡片
- Footer CTA: "← 伦理与合规" | "回到模块首页"

**案例一步骤数据 (水污染 Graphical Abstract):**
```js
const CASE1_STEPS = [
  { num:'01', title:'提取核心信息', icon:'📝',
    desc:'从论文摘要提炼3个核心发现：①流域重金属Cd超标40倍 ②采矿源贡献58% ③EDTA修复效率82%',
    tip:'技巧：找到"最重要的一句话"，GA就是它的视觉化版本。' },
  { num:'02', title:'视觉隐喻选择', icon:'💡',
    desc:'选择河流→流域→土壤的视觉层级，用水流贯穿全图建立空间感，污染程度用颜色深浅编码。',
    tip:'避免用抽象几何形状，科研GA最有力的隐喻来自研究对象本身的形态。' },
  { num:'03', title:'撰写CDTF Prompt', icon:'✍️',
    desc:'[Context]中国流域重金属污染研究，投稿Science of The Total Environment\n[Description]从河流上游采矿区→中游农业区→下游城市区的Cd污染梯度，EDTA植物修复机制\n[Technique]蓝绿配色，卫星视角俯瞰，数字标注污染浓度\n[Format]1.8:1，300DPI，白色背景',
    tip:'期刊要求的GA尺寸不同，先查目标期刊要求再设置Format。' },
  { num:'04', title:'Nano Banana 生成', icon:'🤖',
    desc:'使用 Nano Banana（Gemini on OpenRouter）生成3个备选版本。选择构图最清晰的版本进入下一步。',
    tip:'生成3-5个版本，从中选择而非修改到满意，成本更低效率更高。' },
  { num:'05', title:'迭代精修（3轮）', icon:'🔄',
    desc:'Round 1：调整色彩，将默认色改为色盲友好方案\nRound 2：添加污染浓度数字标注，调整字体大小\nRound 3：优化图例位置，移除冗余信息',
    tip:'每轮只改一个维度，否则难以判断哪个改动有效。' },
  { num:'06', title:'矢量化+精修', icon:'⚡',
    desc:'用Vectorizer.AI转为SVG→Illustrator清理路径→统一色板→重写文字标注→调整到86mm宽度',
    tip:'从AI图到出版级图的"最后一公里"——矢量化+精修通常需要45-90分钟。' },
  { num:'07', title:'期刊导出+AI声明', icon:'📤',
    desc:'导出PNG（300DPI，RGB）+ PDF（矢量）\n在图注末尾添加：This Graphical Abstract was created with AI assistance (Nano Banana, 2025), verified by authors.',
    tip:'保留所有prompt文本，便于后续修改和声明审核。' },
];
```

**案例二 (微塑料迁移) Mermaid代码:**
```js
const CASE2_MERMAID = `flowchart TD
  A["🏭 塑料制品\n（包装/农膜/轮胎）"] --> B["风化与破碎\n（UV/机械摩擦）"]
  B --> C{"粒径判断"}
  C --> |"<5mm"| D["微塑料\n表层土壤积累"]
  C --> |"<1μm"| E["纳米塑料\n深层渗漏"]
  D --> F["地表径流\n携带"]
  E --> G["地下水\n污染"]
  F & G --> H["河流\n（浓度峰值采样点）"]
  H --> I["河口\n过渡带"]
  I --> J["近岸海洋\n底泥积累"]
  J --> K["深海\n最终汇集"]`;
```

**S5 经验总结对比表:**
```js
// 表格对比三案例的工作量和效率
const SUMMARY_DATA = [
  { aspect:'总耗时', case1:'约4小时', case2:'约3小时', case3:'约5小时' },
  { aspect:'纯手绘估时', case1:'约12小时', case2:'约8小时', case3:'约15小时' },
  { aspect:'AI节省时间', case1:'~67%', case2:'~62%', case3:'~67%' },
  { aspect:'Prompt迭代轮次', case1:'3轮', case2:'2轮', case3:'4轮' },
  { aspect:'矢量化时间', case1:'90分钟', case2:'60分钟（Mermaid直出SVG）', case3:'90分钟' },
  { aspect:'最大挑战', case1:'科学标注准确性', case2:'结构逻辑清晰度', case3:'信息密度控制' },
];
```

- [ ] **Step 1: Write p06 full implementation**

Key notes:
- Case selector cards (S1) use smooth scroll via `scrollIntoView`
- StickySteps: use JS rAF ticking pattern (same as p02 S1)
- Case 2 uses Mermaid (same dynamic import pattern as p04)
- S5 summary table is a regular HTML table with fixed first column on mobile

```js
// Case selector cards HTML:
`<div class="p06-case-selector" id="p06-case-selector">
  ${[case1Data, case2Data, case3Data].map((c, i) => `
    <div class="p06-case-card" data-target="#p06-s${i+2}">
      <div class="p06-cc-num">0${i+1}</div>
      <h3>${c.title}</h3>
      <p>${c.brief}</p>
      <div class="m2-placeholder" style="aspect-ratio:16/9;margin-top:var(--space-sm);">
        <div class="m2-placeholder-inner">
          <div class="m2-ph-icon">🖼</div>
          <p class="m2-ph-label">最终成果预览</p>
        </div>
      </div>
    </div>
  `).join('')}
</div>`
```

- [ ] **Step 2: Visual verify p06**

Check:
- S1 case cards are clickable and scroll to correct case
- Case 1 sticky steps work (7 steps visible on desktop)
- Case 2 Mermaid flowchart renders
- Case 3 sticky steps work
- S5 summary table renders correctly, scrollable on mobile

- [ ] **Step 3: Commit p06**

```bash
git add src/pages/m2/p06-case-studies.js
git commit -m "feat(m2-p6): 端到端实战 — 三案例StickySteps+Mermaid+GA制作流程+经验总结"
```

---

### Task 7: Final Verification & Todo Update

- [ ] **Step 1: Full M2 navigation check**

Run dev server and navigate through all 6 M2 pages:
```
#m2-p1 → #m2-p2 → #m2-p3 → #m2-p4 → #m2-p5 → #m2-p6
```

Verify each page's Footer CTA "next" button navigates to the correct next page.

- [ ] **Step 2: Console errors check**

Open browser DevTools. Navigate through all M2 pages. Expected: 0 errors in console.

- [ ] **Step 3: Mobile check (Chrome DevTools)**

Set viewport to iPhone SE (375px). Check each page:
- Hero visible and animated
- Main interactive components usable
- No horizontal overflow
- Touch targets ≥ 44px

- [ ] **Step 4: Update todo.md**

Mark all M2 Phase 5 items as complete in `todo.md`. Change `- [ ]` to `- [x]` for all 6 m2 pages.

- [ ] **Step 5: Final commit**

```bash
git add todo.md
git commit -m "docs: mark M2 Phase 5 complete (p01-p06, excluding Phase 5.5 素材替换)"
```

---

## Notes for Implementer

1. **Import gsap**: ALWAYS use `import { gsap } from '../../components/ScrollAnimations.js'`, NEVER `window.gsap`
2. **destroy()**: ALWAYS call `killAll()` from ScrollAnimations.js + remove any `window.addEventListener` scroll handlers
3. **Placeholder images**: ALL `[占位符]` slots use the `.m2-placeholder` div pattern, NOT missing `<img>` tags
4. **Module color**: `var(--module-2)` = `#B8B8E8` (淡紫)
5. **navigateTo routes**: m2-p1 = `'m2-p1'`, m2-p2 = `'m2-p2'`, etc. (check router.js for exact format)
6. **Mermaid**: dynamic import `import('mermaid')` in init(), always provide code block fallback
7. **StickySteps in p02/p06**: Use JS rAF ticking pattern from design-spec.md, NOT GSAP pin
8. **File name confusion**: p04-ethics.js = m2-p4 content, p05-ai-diagrams.js = m2-p5 content

---

*Plan complete. Check router.js to verify exact route string format before implementing Footer CTA buttons.*
