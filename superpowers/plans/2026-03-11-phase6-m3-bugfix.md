# Phase 6 M3 Bug Fix Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 M3 模块已确认的 5 个视觉/交互 bug，并增强 p03 概念卡片动效。

**Architecture:** 每个 Task 独立修改 1-2 个文件，commit 后可立即浏览器验证。Task 1 修复的 CSS 影响全部 7 个 M3 页面。

**Tech Stack:** Vanilla JS, GSAP 3 (ScrollAnimations.js), CSS Variables, inline SVG CSS animations (`transform-box: fill-box`)

---

## Bug 根本原因总结

| # | Bug | 根本原因 |
|---|-----|---------|
| 1 | Footer prev 按钮不可见（全部 7 页） | `btn-outline-light` 类在整个项目 CSS 中**从未定义** |
| 2 | Footer quote 标题未居中 | `.page-footer-quote` 无 `text-align: center`，依赖父级继承不稳定 |
| 3 | 决策树选项框不可见 | `section-light` 背景 `#fafafa`，但问题框 fill `#fff`、选项框 fill `#f5f5f7`，对比度极低 |
| 4 | p02 工具动画位置错位 | SVG 元素 `transform: scale()` 缺 `transform-box: fill-box`，从 SVG viewport 中心缩放而非元素中心 |
| 5 | p03 概念卡片全部不显示 | CSS `.p03-concept-card { opacity:0 }` 使 GSAP `from` 目标值也为 0，动画无效 |

---

## Task 1：修复 btn-outline-light + footer quote 居中

**Files:**
- Modify: `src/styles/components.css`
- Modify: `src/styles/layout.css`

- [ ] **Step 1: 读取文件确认现状**

读取 `src/styles/components.css` 第 1-110 行（按钮区域）。
读取 `src/styles/layout.css` 第 698-720 行。

- [ ] **Step 2: 在 components.css 中添加 btn-outline-light**

在 `.btn-ghost:active` 定义后（约第 66 行之后）插入：

```css
/* 深色背景上的轮廓按钮（Footer CTA prev 按钮）*/
.btn-outline-light {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: 14px 32px;
  background: transparent;
  color: var(--text-on-dark-2);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: var(--radius-full);
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--t-base);
  min-height: 44px;
  min-width: 44px;
}

.btn-outline-light:hover {
  border-color: rgba(255, 255, 255, 0.6);
  color: var(--text-on-dark);
  background: rgba(255, 255, 255, 0.06);
}

.btn-outline-light:active {
  transform: scale(0.97);
}
```

- [ ] **Step 3: 在 layout.css 的 .page-footer-quote 中添加 text-align**

找到 `.page-footer-quote` 规则，加入 `text-align: center;`：

```css
.page-footer-quote {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  max-width: 640px;
  line-height: 1.3;
  color: var(--text-on-dark);
  text-align: center;   /* ADD THIS */
}
```

- [ ] **Step 4: 验证**

打开 `http://localhost:5173/sci-aesthetic/#m3-p1`，滚动到底部：
期望：左侧"← 模块二完结"轮廓按钮可见，右侧蓝色按钮，Quote 居中。
依次检查 m3-p2 到 m3-p7，每页底部应都有两个按钮。

- [ ] **Step 5: Commit**

```bash
git add src/styles/components.css src/styles/layout.css
git commit -m "fix(global): add btn-outline-light CSS, center page-footer-quote"
```

---

## Task 2：修复 p01 决策树选项框可见性

**Files:**
- Modify: `src/pages/m3/p01-vector-vs-raster.js`（决策树 render 函数，约第 1045-1200 行）

**根本原因：** 决策树在 `section-light`（背景 `#fafafa`），问题框 fill `#fff` + 选项框 fill `#f5f5f7` 几乎与背景融合，视觉上框体不可见。

- [ ] **Step 1: 读取决策树渲染代码**

读取 `src/pages/m3/p01-vector-vs-raster.js` 第 1020-1205 行。

- [ ] **Step 2: 将问题框改为深色**

找到问题框 rect 的 `.attr('fill', '#fff')` 和文字颜色，修改为：
- 问题框 fill: `'#1d1d1f'`（深色）
- 问题框 stroke: `'#95D5B2'`（保持绿色）
- 问题框文字 fill: `'#f5f5f7'`（浅色文字）

- [ ] **Step 3: 将选项框改为深色**

找到 `optBoxes.forEach` 中的 `fillColor` / `strokeColor` 计算，修改：

```js
// 非结果节点（中间问题节点）：
const fillColor = isResult
  ? (opt.node.color || '#95D5B2') + '22'
  : 'rgba(30, 30, 40, 0.9)';
const strokeColor = isResult
  ? (opt.node.color || '#95D5B2')
  : '#95D5B2';
```

选项框内文字颜色：
```js
// 非结果节点文字改为浅色
.attr('fill', isResult ? (opt.node.color || '#3a9a6a') : '#f5f5f7')
```

次级提示文字"→ 点击继续"：
```js
.attr('fill', 'rgba(149,213,178,0.7)')
```

连接线颜色：
```js
.attr('stroke', 'rgba(149,213,178,0.5)')
```

返回按钮文字 `#6e6e73` → `'#95D5B2'`

- [ ] **Step 4: 验证**

打开 `#m3-p1` 滚动到"格式选择决策树"（S3）：
- 问题框深色背景 + 绿色边框 + 浅色文字
- "是"/"否"选项框清晰可见，深色背景 + 绿色边框
- 点击后跳到下一层，显示面包屑路径
- 叶节点显示推荐格式卡片

- [ ] **Step 5: Commit**

```bash
git add src/pages/m3/p01-vector-vs-raster.js
git commit -m "fix(m3/p01): decision tree dark box style for visibility"
```

---

## Task 3：修复 p02 工具动画 SVG transform-box

**Files:**
- Modify: `src/pages/m3/p02-illustrator-tools.js`

**根本原因：** SVG 元素 CSS `transform: scale()` 默认以 SVG viewport 中心（viewBox 的 50%,50% 处，即 80px,60px）为原点，而非元素自身中心。导致元素缩放时"跳到"错误位置。

修复方案：对每个有 `animation` 的 SVG 元素，在其 CSS rule 中加 `transform-box: fill-box; transform-origin: center;`

- [ ] **Step 1: 读取 TOOLS 数组**

读取 `src/pages/m3/p02-illustrator-tools.js` 第 1-270 行（全部 12 个工具）。

- [ ] **Step 2: 修复每个工具的动画 CSS**

对以下工具的每个有 `animation` 属性的 CSS 类，添加 `transform-box: fill-box; transform-origin: center;`：

**工具 1 (select)**:
- `.select-box`：添加 `transform-box: fill-box; transform-origin: center;`
- `.select-handle`：添加
- `.select-obj`：添加
- `selectBoxAnim` keyframe 中的 `transform-origin:40px 30px` 是无效写法（transform-origin 不能在 keyframe 内），需删除（transform-origin 已在 rule 中定义）

**工具 2 (direct select)**:
- `.da-ctrl`：添加 `transform-box: fill-box; transform-origin: center;`

**工具 7 (eyedropper)**:
- `.eye-cursor`：添加 `transform-box: fill-box; transform-origin: center;`

**工具 9 (group)**:
- `.grp-box`：添加
- `.grp-elements`：添加

**工具 12 (scissors)**:
- `.sci-icon`：添加 `transform-box: fill-box; transform-origin: center;`

对其他所有工具，凡是有 `animation:` 的 CSS 类，统一添加 `transform-box: fill-box; transform-origin: center;`（防御性修复，对 opacity-only 动画无害）。

- [ ] **Step 3: 验证**

打开 `#m3-p2`，点击各工具查看动画演示：
- 选择工具：虚线选择框从自身中心缩放出现，不跳位
- 直接选择：控制手柄在原位运动
- 吸管工具：光标沿正常路径移动
- 编组：虚线方框从正确位置出现
- 剪刀：剪刀图标在切点处缩放

- [ ] **Step 4: Commit**

```bash
git add src/pages/m3/p02-illustrator-tools.js
git commit -m "fix(m3/p02): SVG transform-box fill-box for correct scale origin"
```

---

## Task 4：修复 p03 概念卡片可见性 + 增强 SVG 动画

**Files:**
- Modify: `src/pages/m3/p03-bezier.js`

**根本原因：** CSS `.p03-concept-card { opacity: 0 }` 使得 GSAP `gsap.from(el, { opacity:0 })` 的目标状态也是 opacity:0（读取 CSS 计算值），动画从 0 到 0 = 卡片永远不显示。

**Fix：** 从 CSS 移除 `opacity:0`（GSAP `from` 动画会自动从 0 起始）。同时用 stagger 代替无效的 `delay` 参数，并为 SVG 图示添加动画。

- [ ] **Step 1: 读取相关代码**

读取 `src/pages/m3/p03-bezier.js` 第 97-105 行（CSS），第 220-285 行（3 张卡片 SVG），第 1009-1015 行（fadeIn 调用）。

- [ ] **Step 2: 从 CSS 移除 opacity:0**

找到：
```css
.p03-concept-card { ... opacity:0; transition:box-shadow 0.3s; }
```
删除 `opacity:0;`，保留其他所有属性。

- [ ] **Step 3: 修复 fadeIn 调用**

找到第 1009-1012 行：
```js
document.querySelectorAll('.p03-concept-card').forEach((card, i) => {
  fadeIn(card, { delay: i * 0.15 });
});
```
替换为单次调用（`fadeIn` 不支持 `delay` 参数，用 `stagger` 即可）：
```js
fadeIn('.p03-concept-card', { stagger: 0.18, y: 50, start: 'top 88%' });
```

- [ ] **Step 4: 为卡片1（锚点）SVG 添加路径绘制动画**

将现有卡片1的 SVG 内容替换（保留相同图形，增加 `stroke-dasharray/offset` 和 CSS 动画）：

```html
<svg class="p03-concept-svg" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 80 C80 80 160 40 200 40" stroke="#95D5B2" stroke-width="2.5" stroke-linecap="round"
        stroke-dasharray="220" stroke-dashoffset="220" class="p03c1-path"/>
  <rect x="33" y="73" width="14" height="14" rx="2" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5"
        class="p03c1-pt" style="opacity:0;transform-box:fill-box;transform-origin:center"/>
  <rect x="193" y="33" width="14" height="14" rx="2" fill="#95D5B2" stroke="#1d1d1f" stroke-width="1.5"
        class="p03c1-pt" style="opacity:0;transform-box:fill-box;transform-origin:center"/>
  <circle cx="120" cy="56" r="6" fill="none" stroke="#7EC8E3" stroke-width="1.5" stroke-dasharray="3 2"
          class="p03c1-mid" style="opacity:0"/>
  <text x="40" y="106" font-size="10" fill="#95D5B2" font-family="JetBrains Mono, monospace">P0</text>
  <text x="197" y="58" font-size="10" fill="#95D5B2" font-family="JetBrains Mono, monospace">P1</text>
  <text x="108" y="75" font-size="9" fill="#7EC8E3" font-family="JetBrains Mono, monospace">中点</text>
  <style>
    .p03c1-path { animation: p03c1draw 3.5s ease-out infinite; }
    .p03c1-pt   { animation: p03c1pt 3.5s ease-out infinite; }
    .p03c1-mid  { animation: p03c1mid 3.5s ease-out infinite; }
    @keyframes p03c1draw { 0%,5%{stroke-dashoffset:220} 55%,88%{stroke-dashoffset:0} 95%,100%{stroke-dashoffset:220} }
    @keyframes p03c1pt { 0%,15%{opacity:0;transform:scale(0)} 40%,85%{opacity:1;transform:scale(1)} 93%,100%{opacity:0} }
    @keyframes p03c1mid { 0%,50%{opacity:0} 68%,85%{opacity:1} 93%,100%{opacity:0} }
  </style>
</svg>
```

- [ ] **Step 5: 为卡片2（控制手柄）SVG 添加手柄脉冲动画**

将卡片2的 SVG `<style>` 块替换：

```html
<style>
  .p03c2-h1,.p03c2-h2 {
    animation: p03c2pulse 2.5s ease-in-out infinite alternate;
    transform-box: fill-box;
    transform-origin: center;
  }
  .p03c2-h2 { animation-delay: 0.5s; }
  @keyframes p03c2pulse {
    0%  { r: 5; stroke: #7EC8E3; stroke-width: 2; }
    100%{ r: 7; stroke: #95D5B2; stroke-width: 2.5; }
  }
</style>
```

在卡片2的两个手柄 circle 上加 class（`cx=60,cy=25` 和 `cx=190,cy=35`）：
```html
<circle cx="60" cy="25" r="5" fill="none" stroke="#7EC8E3" stroke-width="2" class="p03c2-h1"/>
<circle cx="190" cy="35" r="5" fill="none" stroke="#7EC8E3" stroke-width="2" class="p03c2-h2"/>
```

- [ ] **Step 6: 为卡片3（三次贝塞尔）SVG 添加运动点动画**

在卡片3的 SVG 中，为贝塞尔曲线 path 添加描边动画，并加一个沿曲线运动的小圆点：

```html
<path d="M30 90 C70 20 170 20 210 85" stroke="#95D5B2" stroke-width="2.5" stroke-linecap="round"
      stroke-dasharray="320" stroke-dashoffset="320" class="p03c3-curve"/>
<!-- 沿曲线运动的指示点 -->
<circle r="4" fill="#F0B27A" class="p03c3-dot"/>
<style>
  .p03c3-curve { animation: p03c3draw 4s ease-in-out infinite; }
  .p03c3-dot   { animation: p03c3dot 4s ease-in-out infinite; }
  @keyframes p03c3draw {
    0%,5%{stroke-dashoffset:320} 65%,90%{stroke-dashoffset:0} 97%,100%{stroke-dashoffset:320}
  }
  @keyframes p03c3dot {
    0%{cx:30;cy:90;opacity:0}
    8%{opacity:1}
    25%{cx:80;cy:40}
    50%{cx:120;cy:22}
    75%{cx:165;cy:40}
    88%{cx:210;cy:85;opacity:1}
    93%,100%{cx:210;cy:85;opacity:0}
  }
</style>
```

- [ ] **Step 7: 验证**

打开 `#m3-p3`，滚动到 S1"三个基础元素"：
- 3 张卡片随滚动依次淡入（约 0.18s 间隔）
- 卡片1：曲线路径从左到右绘制，锚点方块依次出现
- 卡片2：手柄端点持续在两种尺寸/颜色间交替脉冲
- 卡片3：贝塞尔曲线绘制，橙色点沿曲线运动

- [ ] **Step 8: Commit**

```bash
git add src/pages/m3/p03-bezier.js
git commit -m "fix(m3/p03): fix opacity bug on concept cards, add SVG path animations"
```

---

## 验收清单（所有 Task 完成后）

- [ ] m3-p1 至 m3-p7 每页底部：左侧轮廓 prev 按钮可见，右侧蓝色 next 按钮
- [ ] 所有页面 footer quote 文字居中对齐
- [ ] m3-p1 决策树：选项框深色背景清晰可见，可点击；点击后跳到下一层；到达叶节点显示推荐格式
- [ ] m3-p2 工具动画：12 个工具演示无跳位，scale 动画从元素自身中心展开
- [ ] m3-p3 概念卡片：页面加载后滚动到 S1 时 3 张卡片依次淡入；3 个 SVG 均有循环动画
