# Update Docs from M1 Learnings — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 M1（p1–p10）开发与 debug 过程中发现的所有新模式和修复，同步写入 CLAUDE.md、design-spec.md、commands.md、todo.md 四份规范文件。

**Architecture:** 纯文档更新，无代码变更。逐文件按 git 历史归纳新模式，精确定位插入位置，保持文件风格一致。

**Tech Stack:** Markdown, git log 作为信息来源

---

## 背景：从 M1 git 历史归纳的新模式

以下是尚未写入规范、需要补充的模式：

### 1. rAF ticking 模式（scroll 性能优化）

来自 `fix(p10): eliminate sticky jitter with rAF ticking pattern`
原始 scroll 监听器每帧直接操作 DOM 导致抖动。正确模式：

```js
// ✅ 正确：rAF ticking + 缓存不变量
const cachedBodyH = body.offsetHeight;
const cachedLeftH = left.offsetHeight;
const maxTranslate = Math.max(0, cachedBodyH - cachedLeftH);
let ticking = false;

function updateSticky() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scrolledPast = Math.max(0, -body.getBoundingClientRect().top);
    left.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;
    ticking = false;
  });
}
window.addEventListener('scroll', updateSticky, { passive: true });

// ❌ 错误：每次 scroll 直接读写 DOM（触发 layout reflow）
function updateSticky() {
  const bodyRect = body.getBoundingClientRect();    // 读
  left.style.transform = `translateY(...)`;         // 写（紧接着读→reflow）
}
```

### 2. Count-up 动画零值保护

来自 `fix(p10): guard count-up rAF against zero-target edge case`
当 `data-target="0"` 或未设置时，rAF 循环永不终止。

```js
// ✅ 正确
function startCountUp(el) {
  const target = parseInt(el.dataset.target) || 0;
  if (!target) { el.textContent = '0'; return; }  // 零值直接设置，不启动 rAF
  // ... 正常 rAF count-up 逻辑
}

// ❌ 错误：未保护零值
function startCountUp(el) {
  const target = parseInt(el.dataset.target);
  // 若 target === 0, 下面的 rAF 循环可能产生 NaN 或无限循环
}
```

### 3. Hero 元素不能放统计数字/Hero Stats

来自 `fix(m1): complete hero section unification` → "P10: remove hero stats"
Hero Stats（如"6核心步骤 / 5导出格式 / 6期刊速查"）曾放在 Hero Section 内，审计时删除。
**规则**：Hero 只包含 eyebrow/title/sub/tagline/quicknav/scroll-hint，统计数字属于第一个正文 section。

### 4. window.gsap 是最常见的"hero 不可见" root cause

来自 `fix(p10): import gsap from module instead of window.gsap`
p10 hero 完全不可见的 root cause 是用了 `window.gsap` 而非从 ScrollAnimations.js 导入。
此规则虽已在 CLAUDE.md 文档中，但需要在"已知 Bug / 常见错误"部分加重点提醒。

### 5. Hero 各元素必须有 opacity:0 inline style + GSAP 必须正常运行

来自两个相反的 commit：先去掉（怕 GSAP 失败导致空白页），后审计统一加回来。
**最终决策**：保留 `opacity:0` inline style，因为 GSAP 在此项目中始终可用（CDN via ScrollAnimations.js）。
若未来需要"降级显示"，在 `init()` 内加 `try/catch`，而不是去掉 opacity。

---

## Task 1: 更新 design-spec.md

**File:** `E:/Claude-project/sci-aesthetic/design-spec.md`

**Step 1: 在"JS sticky transform 模拟"代码块中补充 rAF ticking 优化版**

定位到 `design-spec.md` 第 17–35 行（"已知技术约束"→ JS transform 模拟 sticky 代码块）。
在现有代码块后面，**新增**以下内容（插入在代码块的 `</code>` 后、 `---` 之前）：

````markdown

**⚡ 性能优化 — rAF ticking 模式（必须用于生产代码）：**

```js
// 在 updateSticky() 外层缓存不变量（避免每帧 layout reflow）
const cachedBodyH  = bodyEl.offsetHeight;
const cachedLeftH  = leftEl.offsetHeight;
const maxTranslate = Math.max(0, cachedBodyH - cachedLeftH);
let ticking = false;

function updateSticky() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const scrolledPast = Math.max(0, -bodyEl.getBoundingClientRect().top);
    leftEl.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;
    const stepIdx = Math.min(TOTAL_STEPS - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
    if (stepIdx !== state.currentStep) updateStep(stepIdx);
    ticking = false;
  });
}
window.addEventListener('scroll', updateSticky, { passive: true });
```

> **为什么**：直接在 scroll 回调中读写 DOM 会触发每帧 layout reflow（读 getBoundingClientRect → 写 transform → 再读 → 浏览器被迫同步计算布局），导致可见抖动。rAF ticking 将读写合并到一帧，并用 `ticking` flag 去重。`passive: true` 告知浏览器此监听器不调用 `preventDefault()`，允许浏览器提前开始渲染。
````

**Step 2: 在 GSAP ScrollTrigger 标准模式章节补充 countUp 零值保护**

定位到 `design-spec.md` 中 `countUp` 函数（约第 1101 行）。
在该函数**下方**新增一个说明块：

````markdown

> **⚠️ count-up 零值保护**：若元素的 `data-target` 属性为 `"0"` 或未设置时，`parseInt()` 返回 `0` 或 `NaN`，rAF 动画循环将产生异常（永不终止或显示 NaN）。调用前必须加保护：
>
> ```js
> function startCountUp(el) {
>   const target = parseInt(el.dataset.target) || 0;
>   if (!target) { el.textContent = '0'; return; }
>   // ... 正常 rAF 逻辑
> }
> ```
````

**Step 3: 在禁止清单中补充两条**

定位到 `design-spec.md` 末尾禁止清单（`## 禁止清单`），在末尾新增：

```markdown
❌ scroll 监听器直接读写 DOM（触发 layout reflow + 抖动），必须用 rAF ticking 模式
❌ Hero Section 内放统计数字 / Hero Stats（属于第一个正文 section）
```

**Step 4: 验证**

```bash
# 无命令执行，目视检查确认：
# 1. rAF ticking 代码块插入正确位置（在 JS sticky 原始代码块之后）
# 2. countUp 零值保护在 countUp 函数下方
# 3. 禁止清单末尾新增两条
```

---

## Task 2: 更新 CLAUDE.md

**File:** `E:/Claude-project/sci-aesthetic/CLAUDE.md`

**Step 1: 在"动画"编码约定中补充 rAF 规则**

定位到 `CLAUDE.md` 的 `### 动画` 章节（约第 398–405 行）。
在 `- destroy() 必须调用 killAll()` 之后，新增：

```markdown
- **scroll 监听器必须使用 rAF ticking 模式**：用 `let ticking = false` + `requestAnimationFrame()` 包裹 DOM 读写，防止每帧 layout reflow 导致的抖动
- **不变量必须在监听器外缓存**：`bodyEl.offsetHeight`、`leftEl.offsetHeight`、`maxTranslate` 在 DOM 渲染后缓存，不在每次 scroll 回调中重算
- window.addEventListener 必须加 `{ passive: true }`（scroll/touchmove 监听器）
```

**Step 2: 在 Hero 规范的"关键规则"中补充"Hero 不放统计数字"解释**

定位到 `### ★ Hero Section 标准模板` → "关键规则" 列表（约第 361–369 行）。
找到已有的 `- Hero 不放页面特有的统计数字/数据展示，这些属于正文 section` 这一行，将其替换为更详细的版本：

```markdown
- Hero 不放统计数字 / Hero Stats（如"6核心步骤 / 5格式"等数字展示）——这些属于第一个正文 section 的 count-up 动画，放在 Hero 内会与 GSAP 动画序列冲突，且在移动端造成布局拥挤
```

**Step 3: 在 Hero 规范中强调 window.gsap 是"hero 不可见"最常见原因**

定位到已有的 `- **GSAP 必须从 ScrollAnimations.js 模块导入**` 规则，在该条下方新增：

```markdown
  - ⚠️ **诊断清单**：若 hero 所有元素不可见（全黑/全空），第一步检查是否用了 `window.gsap` 而非 `import { gsap } from` ScrollAnimations.js——这是 M1 audit 中最常见的 root cause
  - ⚠️ **不要通过删除 `opacity:0`** 来规避 GSAP 失败——正确做法是修复 import，保留 `opacity:0` 以确保元素从不可见状态动画入场
```

**Step 4: 验证**

目视检查三处插入，确认无乱序、格式一致。

---

## Task 3: 更新 commands.md

**File:** `E:/Claude-project/sci-aesthetic/commands.md`

**Step 1: 在 GSAP 动画规范章节补充 rAF ticking 规则**

定位到 `commands.md` 的 `### GSAP 动画` 章节（约第 140–145 行）。
在最后一条 `- **gsap / ScrollTrigger 必须从 ScrollAnimations.js 导入**` 之后，新增：

```markdown
- **scroll 监听器用 rAF ticking 模式**：`let ticking = false` + `requestAnimationFrame()` 包裹，事件加 `{ passive: true }`
- **不变量在监听器外一次性缓存**（`offsetHeight`、`maxTranslate`），避免每帧 reflow
```

**Step 2: 在质量检查清单 "功能" 部分补充一条**

定位到 `### 质量检查清单` → `**功能**` 部分（约第 165–169 行）。
在 `- [ ] destroy() 能清理所有事件监听器...` 之后新增：

```markdown
- [ ] scroll 监听器使用 rAF ticking 模式（无直接 DOM 读写在 scroll 回调内）
- [ ] count-up 动画有零值保护（`data-target="0"` 或 NaN 时不启动 rAF 循环）
```

**Step 3: 更新进度标注**

当前进度行（约第 7 行）：
```
> **当前进度**：Phase 0–4 ✅（M1 全 10 页完成 + 审计统一） | 从 **Step 8（m2-p1）** 开始执行。
```

确认该行已正确反映状态（不需要修改，仅确认）。

**Step 4: 验证**

```bash
# 目视检查两处插入，确认行号和缩进与相邻内容一致
```

---

## Task 4: 更新 todo.md

**File:** `E:/Claude-project/sci-aesthetic/todo.md`

**Step 1: 在 Phase 4 m1-p10 条目中追加 debug 备注**

定位到 `todo.md` Phase 4 中的 m1-p10 行：

```markdown
- [x] m1-p10 科研绘图工作流与导出（6 步粘性时间线 + 格式原理动画 + DPI 对比器 + 分辨率计算器 + 期刊速查）
```

在该行末尾添加：

```markdown
      ↳ Debug：window.gsap → import from ScrollAnimations.js（hero invisible fix）；scroll handler → rAF ticking（sticky jitter fix）；countUp zero-guard；hero stats 移至正文 section
```

**Step 2: 在 Phase 4.5 中追加 p10 相关修复项**

定位到 Phase 4.5 最后已有的条目，在末尾追加：

```markdown
- [x] P10 debug：三个 p10 专属 fix（window.gsap / rAF ticking / countUp zero guard）在审计过程中识别并修复
- [x] 规范同步：CLAUDE.md / design-spec.md / commands.md 补充 rAF ticking 模式、countUp 零值保护、Hero 不放统计数字三条新规范
```

**Step 3: 更新"下一步"提示行（如有变化则更新）**

确认 todo.md 末尾的"下一步"行：

```markdown
**下一步**：`commands.md` Step 8 — m2-p1 AI 工具全景 + m2-p2 Prompt 工程
```

此行正确，无需修改。

**Step 4: 验证文件结构完整**

```bash
# 目视检查：
# 1. Phase 4 m1-p10 行有 ↳ Debug 备注
# 2. Phase 4.5 末尾新增两条 [x]
# 3. 进度总览表格仍正确（Phase 4 / 4.5 ✅，Phase 5+ 待开始）
# 4. 下一步提示正确
```

---

## Task 5: Commit

**Step 1: 暂存并提交**

```bash
cd E:/Claude-project/sci-aesthetic
git add CLAUDE.md design-spec.md commands.md todo.md docs/plans/
git commit -m "docs: sync M1 learnings to spec files

- design-spec.md: rAF ticking pattern for scroll handlers, countUp
  zero-target guard, two new prohibitions
- CLAUDE.md: scroll rAF rule, hero-stats prohibition detail, window.gsap
  diagnosis tip
- commands.md: rAF/passive rules in GSAP section, two new QA checklist items
- todo.md: p10 debug annotations in Phase 4 and Phase 4.5
- docs/plans/: add this plan file"
```

**Step 2: 验证 commit**

```bash
git log --oneline -3
```

Expected: 最新 commit 显示 "docs: sync M1 learnings to spec files"

---

## 快速参考：各文件改动汇总

| 文件 | 新增内容 | 定位方法 |
|------|---------|---------|
| `design-spec.md` | rAF ticking 代码块、countUp 零值保护说明、2 条禁止 | JS sticky 章节下方；countUp 函数下方；禁止清单末尾 |
| `CLAUDE.md` | scroll rAF 规则（3条）、hero-stats 禁止详细说明、window.gsap 诊断清单 | 动画章节；Hero 关键规则；GSAP import 规则下方 |
| `commands.md` | scroll rAF 规则（2条）、QA checklist 2项 | GSAP 动画章节末尾；功能检查列表末尾 |
| `todo.md` | p10 debug 备注、Phase 4.5 两条新 [x] | m1-p10 条目末尾；Phase 4.5 末尾 |
