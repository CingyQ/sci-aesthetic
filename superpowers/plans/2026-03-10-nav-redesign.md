# 导航栏 Bug 修复 + 视觉升级计划

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复微信 WebView 动态视口导致的底部导航栏半截 Bug，同时将桌面侧边栏和移动端导航栏从"generic"升级到 production-grade 视觉品质

**Architecture:** Bug 根因是 WebView 动态 viewport 变化时 `position:fixed` + `height:56px` 的刚性高度无法适应，改用 auto height + padding 方案。视觉升级遵循 Apple HIG 风格：shadow 替代 border、saturate+blur 玻璃质感、spring 弹性动画、活跃指示器用色条+微缩放。

**Tech Stack:** CSS (position:fixed, env(), backdrop-filter, cubic-bezier spring), vanilla JS

---

## 设计方向（frontend-design skill）

### 移动端 Tab Bar — "Refined Glass"
- **去掉 `border-top`**，改用 `box-shadow` 提供微妙纵深
- **Saturate + Blur** 玻璃：`backdrop-filter: saturate(180%) blur(20px)` — 比纯 blur 更有质感
- **活跃指示器**：icon 上方 3px 色条（模块色）+ icon 微上移 1px + label 加粗
- **Spring 弹性**：tap 时 `scale(0.92)` 回弹，tab 切换 icon 有 translateY 弹性
- **安全区**：`padding-bottom: max(6px, env(safe-area-inset-bottom))` 确保 WeChat/Safari 兼容
- **GPU 合成**：`transform: translateZ(0)` 强制 compositing layer，避免 WebView 重排延迟

### 桌面侧边栏 — "Editorial Panel"
- **去掉 `border-right`**，改用 `box-shadow` 微妙阴影
- **背景**：`rgba(252,252,252,0.92)` + `saturate(180%) blur(24px)` — 更通透的玻璃感
- **活跃页面**：左侧 2px accent 色条 + 浅色背景 highlight + 右侧圆角
- **模块标题**：更小字号 + 半透明分隔线，不用 border-bottom
- **Hover**：极淡背景色 `rgba(0,0,0,0.02)` — 比 `bg-light-alt` 更微妙
- **Logo**：加微妙 text-shadow 增加层次

### 移动端顶部栏 — "Minimal Status"
- 去掉 `border-bottom`，改用 `box-shadow`
- 标题文字略加 `letter-spacing: 0.01em` 精致感

---

## File Map

| 文件 | 职责 |
|------|------|
| `src/styles/mobile.css` | Tab bar + Top bar 样式（移动端） |
| `src/styles/layout.css` | Sidebar 样式（桌面端）+ Hamburger |
| `src/components/Navigation.js` | Tab bar HTML 结构（加指示器 DOM） |

---

## Task 1: 修复微信 Tab Bar Bug + 视觉升级

**Files:**
- Modify: `src/styles/mobile.css` (tab-bar 和 top-bar 区域)
- Modify: `src/components/Navigation.js` (tab bar HTML + active indicator)

### Bug 修复原理

微信/Safari 动态 viewport 变化时，`position:fixed; bottom:0; height:56px` 的 tab bar 会在 browser chrome 消失/出现时出现定位延迟。根因：
1. `height:56px` 是刚性值，`padding-bottom: env(safe-area-inset-bottom)` 加在外面
2. WebView resize 时 fixed 元素重排延迟导致 icon 被截断
3. 缺少 GPU compositing hint

修复方案：
- `height: auto` + flexbox 内容撑高 → 不再依赖刚性高度
- `padding: 6px 0; padding-bottom: max(6px, env(safe-area-inset-bottom))` → 安全区自适应
- `transform: translateZ(0)` → 强制 GPU 合成层，消除重排延迟
- `-webkit-backface-visibility: hidden` → WebKit 双重保险

- [ ] **Step 1: 修改 mobile.css — Tab Bar 样式**

替换 `.tab-bar` 完整样式块（mobile.css Lines 10-34）：

```css
.tab-bar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 不用 height:56px — auto + padding 适应动态 viewport */
  padding: 6px 0;
  padding-bottom: max(6px, env(safe-area-inset-bottom, 0px));
  /* Premium glass — saturate 增加色彩饱和度，比纯 blur 更有质感 */
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  /* Shadow 替代 border-top — 微妙纵深 */
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.06),
              0 -8px 24px rgba(0, 0, 0, 0.04);
  z-index: 200;
  justify-content: space-around;
  align-items: center;
  /* GPU 合成层 — 修复微信/Safari 动态 viewport 重排延迟 */
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  will-change: transform;
}
```

同时更新 `#main-content` padding（适配新的 auto 高度）：

```css
@media (max-width: 768px) {
  .tab-bar {
    display: flex;
  }
  #main-content {
    /* tab bar ~56px + safe area，使用固定估值确保内容不被遮盖 */
    padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px));
  }
}
```

- [ ] **Step 2: 修改 mobile.css — Tab Item 样式**

替换 `.tab-item` 样式块：

```css
.tab-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 4px 0;
  min-width: 56px;
  color: var(--text-on-light-3);
  font-size: 10px;
  font-weight: 500;
  font-family: var(--font-heading);
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  /* Spring 弹性 tap 反馈 */
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
              color 0.2s ease;
}

.tab-item:active {
  transform: scale(0.88);
}

.tab-item svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              color 0.2s ease;
}

.tab-item span {
  transition: opacity 0.2s ease, font-weight 0.2s ease;
  opacity: 0.7;
}

/* 活跃 tab：icon 微上移 + label 加粗 + 指示条 */
.tab-item.active svg {
  transform: translateY(-1px);
}

.tab-item.active span {
  opacity: 1;
  font-weight: 600;
}

/* 色条指示器 — 模块色，在 icon 上方 */
.tab-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 20px;
  height: 3px;
  border-radius: 1.5px;
  background: currentColor;
  transform: translateX(-50%) scaleX(0);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tab-item.active::after {
  transform: translateX(-50%) scaleX(1);
}
```

- [ ] **Step 3: 修改 mobile.css — Top Bar 样式**

更新 `.mobile-top-bar` 样式：

```css
.mobile-top-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  padding-top: env(safe-area-inset-top, 0px);
  /* Premium glass — 与 tab bar 统一 */
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  /* Shadow 替代 border */
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06),
              0 4px 16px rgba(0, 0, 0, 0.03);
  z-index: 150;
  align-items: center;
  padding-left: var(--space-sm);
  padding-right: var(--space-sm);
  gap: var(--space-sm);
  /* GPU 合成层 */
  transform: translateZ(0);
}

.mobile-page-title {
  flex: 1;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-on-light);
}

.mobile-page-index {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--text-on-light-3);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
```

- [ ] **Step 4: Navigation.js — Tab Item SVG 图标尺寸**

Navigation.js 中 SVG 图标的 `viewBox` 和尺寸由 CSS 控制（24×24），不需要改 JS。但需确认 `updateTabBar` 中的 active 颜色设置兼容 `::after` 伪元素的 `currentColor`。

查看 Navigation.js `updateTabBar` 函数，确认 `item.style.color = moduleColors[tab]` 会传递给 `::after` 的 `currentColor`。✓ 不需改 JS。

---

## Task 2: 桌面侧边栏视觉升级

**Files:**
- Modify: `src/styles/layout.css` (sidebar 区域)

- [ ] **Step 5: 修改 layout.css — Sidebar 主体样式**

修改 `#sidebar` 样式（layout.css ~Line 10）：

```css
#sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  height: 100vh;
  /* 更通透的玻璃面板 */
  background: rgba(252, 252, 252, 0.88);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  /* Shadow 替代 border-right — 微妙纵深 */
  box-shadow: 1px 0 0 rgba(0, 0, 0, 0.05),
              4px 0 24px rgba(0, 0, 0, 0.02);
  z-index: 100;
  overflow-y: auto;
  transition: transform var(--t-base);
  overscroll-behavior: contain;
}
```

- [ ] **Step 6: 修改 layout.css — Logo 样式**

提升 `.sidebar-logo` 精致感：

```css
.sidebar-logo {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text-on-light);
  /* 微妙文字阴影增加层次 */
  text-shadow: 0 0 20px rgba(126, 200, 227, 0.1);
}
```

- [ ] **Step 7: 修改 layout.css — Sidebar Header**

更新 `.sidebar-header`：

```css
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm);
  /* 去掉 border-bottom，用更微妙的分隔 */
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
}
```

- [ ] **Step 8: 修改 layout.css — Module Group**

更新 `.nav-module-group`：

```css
.nav-module-group {
  padding: var(--space-xs) 0;
  /* 去掉 border-bottom，用透明间隔感 */
}

/* 仅在非最后一个 module-group 之间加分隔线 */
.nav-module-group + .nav-module-group {
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04);
}
```

- [ ] **Step 9: 修改 layout.css — Nav Item Active/Hover**

升级 `.nav-item` 交互状态：

```css
.nav-item {
  padding: 10px var(--space-sm) 10px 16px;
  font-size: 0.88rem;
  color: var(--text-on-light-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  color: var(--text-on-light);
  background: rgba(0, 0, 0, 0.025);
}

.nav-item.active {
  color: var(--accent);
  background: rgba(126, 200, 227, 0.06);
  border-left: 2px solid var(--accent);
  font-weight: 600;
}
```

- [ ] **Step 10: 修改 layout.css — Page Item Active/Hover**

升级 `.nav-page-item` 交互状态：

```css
.nav-page-item {
  display: flex !important;
  align-items: center;
  gap: 8px;
  padding: 7px var(--space-sm) 7px 28px;
  font-size: 0.84rem;
  text-decoration: none;
  color: var(--text-on-light-2);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-right: 8px;
  transition: all 0.2s ease;
}

.nav-page-item:hover {
  color: var(--text-on-light);
  background: rgba(0, 0, 0, 0.02);
}

.nav-page-item.active {
  color: var(--accent);
  background: rgba(126, 200, 227, 0.06);
  font-weight: 500;
}
```

---

## Task 3: 验证

- [ ] **Step 11: Playwright 移动端测试**

测试点：
1. Tab bar 位置稳定 — `position:fixed; bottom:0` + `transform:translateZ(0)`
2. Tab bar 无水平溢出
3. Active tab 指示条可见（::after pseudo-element）
4. Safe area padding 正确
5. Top bar shadow 可见（无 border）
6. 所有 tab 点击响应正常

- [ ] **Step 12: Playwright 桌面端测试**

测试点：
1. Sidebar shadow 替代了 border-right
2. Logo 样式正确
3. Active nav-item 有背景 highlight + 左侧色条
4. Hover 效果有微妙背景变化
5. Module 折叠/展开正常
6. 侧边栏宽度未变（260px / 220px）

- [ ] **Step 13: Commit**

```bash
git add src/styles/mobile.css src/styles/layout.css
git commit -m "fix(nav): 修复微信动态viewport导致tab bar截断 + 导航栏视觉升级"
```
