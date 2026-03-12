# M1 Audit & Polish — 统一设计风格、修复Bug、推送部署

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 对已完成的 M1 模块（10个页面）进行全面审查，统一 Hero/Footer/导航/排版风格，修复 CSS Bug，移除 Git 历史中的 Co-Authored-By，最终推送部署。

**Architecture:** 先统一 Hero 模板（eyebrow、title、sub、tagline、quicknav、scroll-hint），再统一 Footer CTA（quote 格式、导航按钮标签），然后修复 CSS 硬编码和缺失的移动端适配，最后处理 Git 历史重写和推送。

**Tech Stack:** Vanilla JS (ES Modules), CSS Variables, GSAP, Vite, Git (filter-branch/rebase)

---

## Task 1: 统一 Hero Section 模板

**目标：** 所有 10 个页面的 Hero 遵循完全一致的结构和动画策略。

**发现的不一致：**
- P08 缺少 `section-dark` class
- P08 缺少 scroll hint（↓ 向下探索）
- P10 hero 可能缺少标准结构
- P04 使用 `p4-anim-N` class 而非 inline `opacity:0`
- P07 quicknav 使用 `<div>` 而非 `<nav>`
- P09 scroll hint 使用 generic `scroll-hint` class 而非页面前缀
- Tagline max-width: P01-P07 用 540px, P08-P09 用 520px
- P06/P07 title 有 `<br>` 换行（可接受，标题较长）

**统一标准：**
```
Hero 结构:
  section.section-dark.section-hero-full.{pagePrefix}-hero
    .hero-eyebrow        — "Module 01 / Page XX", opacity:0
    .page-hero-title     — 中文标题, color:var(--text-on-dark), opacity:0
    .page-hero-sub       — 英文副标题, opacity:0
    .{pagePrefix}-hero-tagline — 中文说明, max-width:540px, opacity:0
    nav.hero-quicknav    — 快速导航按钮, opacity:0
    .{pagePrefix}-scroll-hint  — "↓ 向下探索", opacity:0
```

**Files:**
- Modify: `src/pages/m1/p08-r-themes.js` — 添加 section-dark class, 添加 scroll hint
- Modify: `src/pages/m1/p10-workflow-export.js` — 检查并修复 hero 结构
- Modify: `src/pages/m1/p07-ggplot2-workshop.js` — quicknav `<div>` → `<nav>`
- Modify: `src/pages/m1/p09-python-viz.js` — scroll hint class 统一
- Modify: `src/pages/m1/p08-r-themes.js` — tagline max-width 540px
- Modify: `src/pages/m1/p09-python-viz.js` — tagline max-width 540px

**Step 1:** 读取 P08 hero 部分，添加 `section-dark` class 和 scroll hint
**Step 2:** 读取 P10 hero 部分，确认结构是否完整，按标准补齐
**Step 3:** P07 quicknav `<div>` → `<nav>`
**Step 4:** P09 scroll hint class 加页面前缀 `p9-scroll-hint`
**Step 5:** P08/P09 tagline max-width 统一为 540px
**Step 6:** 本地 dev 验证所有 hero 显示正常
**Step 7:** Commit: `fix(m1): unify hero section structure across all 10 pages`

---

## Task 2: 统一 Footer CTA 模板

**发现的不一致：**
- P10 footer quote 用 `<p>` 而非 `<h2>`
- Quote 文本：P01/P03/P08/P10 包含中文引号 `"..."`, P02/P04-P07/P09 不包含 → 统一为都不包含引号（CSS 加）
- 导航按钮标签：P01-P07 用页面标题（如 "← 色彩理论"），P08-P10 用 generic "← 上一页 / 下一页 →" → 统一为都用页面标题
- P05 用 `onclick="window._p5nav()"` 而非 data-route → 统一为 data-route 或 ID + JS 绑定
- P01 无 prev 按钮（正确，第一页）

**统一标准：**
```
Footer CTA 结构:
  section.page-footer-cta
    p.page-footer-num     — "XX / 10"
    h2.page-footer-quote  — 引用文字（不含引号符号，CSS ::before/::after 加）
    p.page-footer-desc    — 描述文字, max-width:520px
    div.page-footer-nav
      button.btn-ghost     — "← {上一页标题}" (P01无prev)
      button.btn-primary   — "{下一页标题} →" (P10改为 "进入模块二 →")
```

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — quote 标签 `<p>` → `<h2>`
- Modify: `src/pages/m1/p08-r-themes.js` — 按钮标签改为页面标题
- Modify: `src/pages/m1/p09-python-viz.js` — 按钮标签改为页面标题
- Modify: `src/pages/m1/p10-workflow-export.js` — 按钮标签统一
- Modify: `src/pages/m1/p05-chart-selection.js` — onclick → 统一导航方式
- Modify: `src/styles/layout.css` — 可选：为 `.page-footer-quote` 添加 CSS 引号装饰
- Modify: 所有包含引号的页面 — 移除文本中的引号符号

**Step 1:** 统一所有 footer quote 为 `<h2>` 标签
**Step 2:** 移除所有 quote 文本中的中文引号符号
**Step 3:** 在 layout.css 中为 `.page-footer-quote` 添加 `::before { content: "\201C"; }` 和 `::after { content: "\201D"; }` 装饰
**Step 4:** P08 按钮: "← 上一页" → "← ggplot2 工作坊", "下一页 →" → "Python 可视化 →"
**Step 5:** P09 按钮: "← 上一页" → "← R 配色方案", "下一页 →" → "工作流与导出 →"
**Step 6:** P10 按钮确认: "← 上一页：Python 可视化" → "← Python 可视化"
**Step 7:** P05 onclick → 改为 ID + addEventListener 绑定
**Step 8:** 验证所有页面 footer 导航正常
**Step 9:** Commit: `fix(m1): unify footer CTA structure — quotes, buttons, navigation`

---

## Task 3: 统一 Hero Stats（数字展示）

**问题：** P10 hero 中有统计数字展示（6步/5格式/6期刊），其他 hero 页面没有。是否所有页面都需要？

**决策：** P10 的 stats 是该页面特有内容（工作流步骤数、格式数、期刊数），属于页面特色而非模板统一项。**保留但确保与 hero 其他元素风格一致。** 检查 stats 的字体、间距、动画是否符合设计规范。

**Files:**
- Review: `src/pages/m1/p10-workflow-export.js` — hero stats 区域

**Step 1:** 检查 P10 hero stats 的字体是否为 `var(--font-display)` / `var(--font-code)`
**Step 2:** 检查间距是否使用 CSS 变量
**Step 3:** 如有硬编码值，修正为 CSS 变量
**Step 4:** Commit (如有改动): `fix(p10): normalize hero stats typography and spacing`

---

## Task 4: CSS 硬编码修复

**发现的问题：**
1. `components.css` 按钮 padding 硬编码 (14px 32px) — **不修改**，按钮 padding 是全局视觉决策，不一定需要绑定 spacing scale
2. `m1-pages.css:83` `.m1-nav-link` padding: 12px — 改为 CSS 变量
3. P04 accessibility.js 硬编码语义色 (#34c759, #FF6B6B, #ff3b30)
4. P01 inline style 重复 CSS 变量值
5. m1-pages.css 中 `.m1-section-title/.m1-section-sub/.m1-section-desc` 未被使用

**Files:**
- Modify: `src/styles/m1-pages.css` — 修复 nav-link padding, 删除未使用的 class
- Modify: `src/pages/m1/p04-accessibility.js` — 语义色统一
- Modify: `src/pages/m1/p01-color-theory.js` — 移除冗余 inline styles

**Step 1:** m1-pages.css: `.m1-nav-link` padding 12px → `var(--space-sm)` (16px)
**Step 2:** 检查 `.m1-section-title` 等是否被任何页面引用，如果确认未使用则删除
**Step 3:** P04: 将 `#34c759` → `var(--color-success)`, `#ff3b30`/`#FF6B6B` → `var(--color-error)` 检查 variables.css 是否定义了这些语义色，如没有则添加
**Step 4:** P01: 清理重复 inline styles（仅当不影响渲染时）
**Step 5:** 验证所有页面视觉未变化
**Step 6:** Commit: `fix(m1): remove hardcoded colors and unused CSS`

---

## Task 5: 响应式适配检查

**目标：** 确保 375px / 768px / 1024px / 1440px 下所有页面正常显示。

**已知问题：**
- P05 D3 决策树在小屏可能溢出
- P06 sticky scroll 已有 JS workaround
- P10 6步工作流 grid 可能需要 mobile collapse

**Files:**
- Review: 所有 10 个 M1 页面
- Modify: `src/styles/m1-pages.css` — 如需添加 mobile override

**Step 1:** 启动 `npm run dev`，打开 DevTools
**Step 2:** 逐页检查 375px 宽度下的布局溢出
**Step 3:** 检查 768px 宽度下的布局切换
**Step 4:** 检查 1440px 宽度下的最大宽度限制
**Step 5:** 修复发现的任何溢出、截断、重叠问题
**Step 6:** Commit (如有改动): `fix(m1): responsive layout fixes for mobile and tablet`

---

## Task 6: 动效与过渡检查

**目标：** 确保 GSAP 动画一致，页面切换流畅。

**检查项：**
- Hero 入场动画时序是否统一（eyebrow → title → sub → tagline → quicknav → scroll-hint）
- ScrollTrigger 动画是否都正常触发和销毁（防止内存泄漏）
- 页面切换过渡是否平滑（router fade transition）
- 点击 quicknav 按钮是否平滑滚动到目标

**Files:**
- Review: 所有 10 个 M1 页面的 init() 和 destroy() 函数

**Step 1:** 检查每个页面的 hero GSAP timeline 时序
**Step 2:** 确认 destroy() 是否清理了所有 ScrollTrigger 实例
**Step 3:** 验证页面切换时无控制台错误
**Step 4:** Commit (如有改动): `fix(m1): normalize GSAP animation timing and cleanup`

---

## Task 7: Git 历史重写 — 移除 Co-Authored-By

**目标：** 从 28 个 commit 中移除 `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` 行。

**方法：** 使用 `git filter-branch --msg-filter` 或 `git rebase -i` 重写历史。

**注意：** 这是破坏性操作，会改变所有 commit hash。需要 `git push --force`。

**Step 1:** 备份当前分支: `git branch backup-before-rewrite`
**Step 2:** 使用 `git filter-branch --msg-filter` 移除所有 Co-Authored-By 行:
```bash
git filter-branch -f --msg-filter '
  sed "/^Co-Authored-By:/d"
' -- --all
```
**Step 3:** 验证 `git log` 中不再有 Co-Authored-By
**Step 4:** 清理: `git update-ref -d refs/original/refs/heads/master`
**Step 5:** Force push: `git push --force origin master`
**Step 6:** 确认 GitHub 上 commit 显示正确

---

## Task 8: 最终 Commit & Push

**Step 1:** 确认所有 Task 1-6 的改动已 commit
**Step 2:** `npm run build` 确认构建成功
**Step 3:** Push to GitHub: `git push origin master`
**Step 4:** 确认 gh-pages workflow 被触发: `gh run list --limit 5`
**Step 5:** 等待部署完成，验证线上版本

---

## 执行顺序

1. Task 1 (Hero 统一) → Task 2 (Footer 统一) → Task 3 (Hero Stats) → Task 4 (CSS 修复)
2. Task 5 (响应式) → Task 6 (动效)
3. Task 7 (Git 历史) — **必须在所有代码改动 commit 之后执行**
4. Task 8 (最终推送)

**预计涉及文件：** 10 个 M1 页面 JS + 2-3 个 CSS 文件
**破坏性操作提醒：** Task 7 的 git filter-branch 会重写历史，需要 force push
