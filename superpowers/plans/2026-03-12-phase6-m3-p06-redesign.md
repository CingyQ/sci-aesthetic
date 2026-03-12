# M3-P06 多面板图形 重做实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完整重做 p06-multi-panel.js：修复代码编辑器 bug，将固定 3×2 网格升级为自适应多面板布局引擎（支持 1-8 图、多种布局模板），并全面提升视觉与交互品质。

**Architecture:** 三步式布局向导（选数量 → 选模板 → 拖放图表）替代固定 3×2 画布；LAYOUTS 数据驱动 CSS Grid 动态变更；代码生成根据实际 rows/cols/spans 自适应生成 R patchwork 和 Python matplotlib 代码；所有动画从 ScrollAnimations.js 导入 GSAP，禁止 window.gsap。

**Tech Stack:** Vanilla JS ES Modules, GSAP + ScrollTrigger, D3.js (mini chart previews), SortableJS (drag-and-drop), CodeMirror 6 (via `createCodeEditor` wrapper in CodeEditor.js)

---

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/pages/m3/p06-multi-panel.js` | **完全重写** | 唯一改动文件 |
| `src/components/CodeEditor.js` | 只读参考 | 正确 API：`createCodeEditor(el, { code, language, readOnly })` → `{ setCode, getCode, destroy }` |
| `src/components/ScrollAnimations.js` | 只读参考 | 导出 `{ fadeIn, killAll, gsap }` |

---

## Chunk 1: Bug 修复 + 布局数据层

### Task 1: 修复两个核心 Bug

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（init 函数的编辑器初始化部分 + updateGeneratedCode 函数）

**背景：** 现有代码有两个静默失败的 bug，导致代码编辑器显示空白、"生成代码"按钮无反应。

#### 两个 Bug 的位置

**Bug 1** — `createCodeEditor` 调用签名错误（第 1213–1222 行）：
```js
// ❌ 当前错误：第二参数应为 options 对象，不是 code string
const ed = createCodeEditor(rEditorEl, generateRCode(), 'r', { readOnly: true });
// ✅ 正确
const ed = createCodeEditor(rEditorEl, { code: generateRCode(), language: 'r', readOnly: true });
```

**Bug 2** — `updateGeneratedCode` 调用了不存在的 `.dispatch()` 方法（第 347–356 行）：
```js
// ❌ 当前错误：_rEditor 是 wrapper 对象，没有 dispatch 方法
_rEditor.dispatch({ changes: { from: 0, to: _rEditor.state.doc.length, insert: generateRCode() } });
// ✅ 正确：使用 wrapper 暴露的 setCode()
_rEditor.setCode(generateRCode());
```

- [ ] **Step 1: 修复 updateGeneratedCode（Bug 2）**

将 `updateGeneratedCode` 函数（约第 346–357 行）替换为：

```js
function updateGeneratedCode() {
  if (_rEditor) {
    try { _rEditor.setCode(generateRCode()); } catch (_) {}
  }
  if (_pyEditor) {
    try { _pyEditor.setCode(generatePyCode()); } catch (_) {}
  }
}
```

- [ ] **Step 2: 修复 createCodeEditor 调用签名（Bug 1）**

将 init() 中的编辑器初始化代码（约第 1212–1222 行）替换为：

```js
const rEditorEl = document.getElementById('p06-r-editor');
if (rEditorEl) {
  const ed = createCodeEditor(rEditorEl, { code: generateRCode(), language: 'r', readOnly: true });
  if (ed) { _editors.push(ed); _rEditor = ed; }
}

const pyEditorEl = document.getElementById('p06-py-editor');
if (pyEditorEl) {
  const ed = createCodeEditor(pyEditorEl, { code: generatePyCode(), language: 'python', readOnly: true });
  if (ed) { _editors.push(ed); _pyEditor = ed; }
}
```

- [ ] **Step 3: 在浏览器中验证**

1. 打开 `http://localhost:5173/sci-aesthetic/#m3-p6`
2. 滚动到 S3"完整代码模板"
3. 确认 R 和 Python 编辑器均显示代码（不再空白）
4. 回到 S2，点击"生成代码 →"按钮
5. 确认页面平滑滚动到 S3，编辑器内容刷新

- [ ] **Step 4: Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "fix(m3/p06): 修复 createCodeEditor 调用签名和 dispatch→setCode，代码编辑器不再空白"
```

---

### Task 2: LAYOUTS 数据结构 + 状态重构

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（顶部数据层和状态）

**说明：** 定义驱动整个编辑器的数据结构。`LAYOUTS` 是一个 `panelCount → 布局模板数组` 的映射。每个布局模板描述 CSS Grid 和 span 规则。

- [ ] **Step 1: 替换顶部状态对象**

将 `_editorState` 替换为更完整的状态（在 p06-multi-panel.js 顶部）：

```js
// 布局编辑器状态
let _editorState = {
  panelCount: 4,         // 用户选择的面板数量（1-8）
  layoutId: '2x2',       // 当前布局模板 ID
  cells: [],             // 每格的面板类型（length = panelCount）
  spacing: 12,           // tight:4 / normal:12 / loose:24
  showLabels: true,
  preset: 'nature-double'
};
```

- [ ] **Step 2: 添加 LAYOUTS 常量**

在 `PANEL_TYPES` 定义之后添加：

```js
// ══════════════════════════════════════════════════════
//  布局模板定义（驱动动态画布）
// ══════════════════════════════════════════════════════
// spans: 需要跨行/跨列的格子索引（格子编号从0开始，按行优先）
// gridArea: 可选，用 CSS grid-area 名称布局（处理非矩形网格）
const LAYOUTS = {
  1: [
    { id: '1x1', label: '单图', cols: 1, rows: 1,
      gridCols: '1fr', desc: '单栏独立图，全宽' },
  ],
  2: [
    { id: '1x2', label: '左右并排', cols: 2, rows: 1,
      gridCols: '1fr 1fr', desc: '双变量对比，等宽' },
    { id: '2x1', label: '上下堆叠', cols: 1, rows: 2,
      gridCols: '1fr', desc: '时间序列上下对比' },
    { id: '1w+1', label: '主图+辅图', cols: 2, rows: 1,
      gridCols: '1.8fr 1fr', desc: '主图突出，辅图辅助' },
  ],
  3: [
    { id: '1x3', label: '三列叙事', cols: 3, rows: 1,
      gridCols: '1fr 1fr 1fr', desc: '因果三步递进' },
    { id: '1s+2', label: '主图+两辅', cols: 2, rows: 2,
      gridCols: '1.6fr 1fr',
      spans: [{ idx: 0, rowSpan: 2 }],  // 格子0跨2行
      desc: '左侧主图，右侧上下两辅' },
    { id: '2+1s', label: '两辅+主图', cols: 2, rows: 2,
      gridCols: '1fr 1.6fr',
      spans: [{ idx: 1, colStart: 2, rowSpan: 2 }],  // 格子1（右侧）跨2行
      desc: '左侧上下两辅，右侧主图' },
  ],
  4: [
    { id: '2x2', label: '四等分', cols: 2, rows: 2,
      gridCols: '1fr 1fr', desc: '均等对比，2×2' },
    { id: '1x4', label: '四列横排', cols: 4, rows: 1,
      gridCols: 'repeat(4,1fr)', desc: '步骤演示，横向展开' },
    { id: '1s+3', label: '主图+三辅', cols: 2, rows: 3,
      gridCols: '1.6fr 1fr',
      spans: [{ idx: 0, rowSpan: 3 }],
      desc: '左侧大主图，右侧三小图' },
  ],
  5: [
    { id: '2+3', label: '上2下3', cols: 3, rows: 2,
      gridCols: '1fr 1fr 1fr',
      // 上行：前两格各占1.5col；下行：后三格各占1col
      // 实现方式：格子0-1各 span 0，但第0行只放2格（第3格为空不渲染）
      spanConfig: '2+3',  // 特殊标记，由 rebuildCanvas 特殊处理
      desc: '上方两图，下方三图' },
    { id: '3+2', label: '上3下2', cols: 3, rows: 2,
      gridCols: '1fr 1fr 1fr',
      spanConfig: '3+2',
      desc: '上方三图，下方两图居中' },
    { id: '1s+4', label: '主图+四辅', cols: 2, rows: 3,
      gridCols: '1.5fr 1fr',
      spans: [{ idx: 0, rowSpan: 2 }],  // 格子0跨2行，格子2-4正常
      desc: '左侧主图占两行，右侧四小图' },
  ],
  6: [
    { id: '2x3', label: '两行三列', cols: 3, rows: 2,
      gridCols: '1fr 1fr 1fr', desc: 'Nature 标准双栏六图' },
    { id: '3x2', label: '三行两列', cols: 2, rows: 3,
      gridCols: '1fr 1fr', desc: '纵向叙事六图' },
    { id: '1sx2+4', label: '主图+五辅', cols: 3, rows: 3,
      gridCols: '1.5fr 1fr 1fr',
      spans: [{ idx: 0, rowSpan: 3 }],
      desc: '左侧大主图，右侧2×2五小图' },
  ],
  7: [
    { id: '3+4', label: '上3下4', cols: 4, rows: 2,
      gridCols: 'repeat(4,1fr)',
      spanConfig: '3+4',  // 上行3格(各约1.33col)，下行4格
      desc: '复杂七图组合' },
    { id: '2x3+1', label: '六格+底图', cols: 3, rows: 3,
      gridCols: '1fr 1fr 1fr',
      spans: [{ idx: 6, colSpan: 3 }],  // 最后格子横跨3列
      desc: '六格+底部横幅图' },
  ],
  8: [
    { id: '2x4', label: '两行四列', cols: 4, rows: 2,
      gridCols: 'repeat(4,1fr)', desc: '大版面八图' },
    { id: '4x2', label: '四行两列', cols: 2, rows: 4,
      gridCols: '1fr 1fr', desc: '纵向长图' },
    { id: '1sx3+4', label: '主图+七辅', cols: 4, rows: 2,
      gridCols: '1.8fr 1fr 1fr 1fr',
      spans: [{ idx: 0, rowSpan: 2 }],
      desc: '左侧主图，右侧七小图' },
  ],
};
```

- [ ] **Step 3: 添加布局工具函数**

```js
// 获取当前布局对象
function getCurrentLayout() {
  const list = LAYOUTS[_editorState.panelCount] || LAYOUTS[4];
  return list.find(l => l.id === _editorState.layoutId) || list[0];
}

// 切换面板数量：重置 cells，选默认布局
function setPanelCount(n) {
  _editorState.panelCount = n;
  const list = LAYOUTS[n] || LAYOUTS[4];
  _editorState.layoutId = list[0].id;
  _editorState.cells = Array(n).fill(null);
}

// 切换布局模板：不重置 cells（已填充的保留，多余的截断）
function setLayout(layoutId) {
  const list = LAYOUTS[_editorState.panelCount] || LAYOUTS[4];
  const layout = list.find(l => l.id === layoutId);
  if (!layout) return;
  _editorState.layoutId = layoutId;
  // cells 截断或补充 null
  const n = _editorState.panelCount;
  _editorState.cells = Array(n).fill(null).map((_, i) => _editorState.cells[i] || null);
}
```

- [ ] **Step 4: 浏览器验证（数据层）**

在浏览器控制台运行（页面加载后）：
```js
// 确认 LAYOUTS 可访问（通过查看 window 全局不合适，但可通过点击 count 按钮来验证）
// 后续 Task 中 UI 连接后再完整验证
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3/p06): 添加 LAYOUTS 数据结构和状态重构，支持 1-8 图自适应布局"
```

---

## Chunk 2: 三步式 UI + 动态画布

### Task 3: Step 1&2 UI — 数量选择 + 布局模板选择

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（render 函数中 S2 的 HTML，initEditorControls 函数）

**说明：** 将 S2 的 HTML 重构为三步向导形式。步骤指示器显示当前进度，Step 1 是数字选择器，Step 2 是布局模板卡片，Step 3 是画布（在 Task 4 中实现）。

- [ ] **Step 1: 新增向导 CSS**

在 render() 返回的 `<style>` 中，新增以下样式（替换旧的 `.p06-editor-layout` 等布局样式）：

```css
/* ── 三步向导 ── */
.p06-wizard { max-width: 1100px; margin: 0 auto; }
.p06-steps-bar { display: flex; align-items: center; gap: 0; margin-bottom: var(--space-xxl); }
.p06-step-item { display: flex; align-items: center; gap: 10px; }
.p06-step-num { width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.35); font-size: 0.78rem; font-weight: 700; display: flex; align-items: center; justify-content: center; transition: all 0.3s; flex-shrink: 0; }
.p06-step-item.active .p06-step-num { background: var(--module-3,#95D5B2); border-color: var(--module-3,#95D5B2); color: #1d1d1f; }
.p06-step-item.done .p06-step-num { background: rgba(149,213,178,0.25); border-color: var(--module-3,#95D5B2); color: var(--module-3,#95D5B2); }
.p06-step-label { font-size: 0.82rem; color: rgba(255,255,255,0.35); transition: color 0.3s; white-space: nowrap; }
.p06-step-item.active .p06-step-label, .p06-step-item.done .p06-step-label { color: var(--text-on-dark-2); }
.p06-step-connector { flex: 1; height: 1.5px; background: rgba(255,255,255,0.1); margin: 0 12px; min-width: 20px; }

/* Step 1：数量选择 */
.p06-count-grid { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: var(--space-xl); }
.p06-count-btn { width: 56px; height: 56px; border-radius: var(--radius-md); border: 1.5px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); color: var(--text-on-dark-2); font-size: 1.25rem; font-weight: 700; cursor: pointer; transition: all 0.2s; position: relative; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); }
.p06-count-btn:hover { border-color: var(--module-3,#95D5B2); color: var(--module-3,#95D5B2); background: rgba(149,213,178,0.08); transform: translateY(-2px); }
.p06-count-btn.active { background: var(--module-3,#95D5B2); border-color: var(--module-3,#95D5B2); color: #1d1d1f; transform: translateY(-2px); box-shadow: 0 4px 16px rgba(149,213,178,0.3); }
.p06-count-sub { font-size: 0.65rem; position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); white-space: nowrap; opacity: 0.6; font-weight: 400; font-family: var(--font-body); }

/* Step 2：布局模板 */
.p06-layout-step { display: none; }
.p06-layout-step.visible { display: block; animation: p06-step-in 0.3s ease; }
@keyframes p06-step-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.p06-layout-templates { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: var(--space-xl); }
.p06-tpl-card { cursor: pointer; padding: 14px 16px; border-radius: var(--radius-md); border: 1.5px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.03); transition: all 0.2s; min-width: 120px; }
.p06-tpl-card:hover { border-color: rgba(149,213,178,0.5); background: rgba(149,213,178,0.06); transform: translateY(-2px); }
.p06-tpl-card.active { border-color: var(--module-3,#95D5B2); background: rgba(149,213,178,0.1); box-shadow: 0 0 0 2px rgba(149,213,178,0.2); }
.p06-tpl-preview { width: 80px; height: 56px; margin-bottom: 10px; }
.p06-tpl-name { font-size: 0.82rem; font-weight: 600; color: var(--text-on-dark); margin-bottom: 3px; }
.p06-tpl-desc { font-size: 0.72rem; color: var(--text-on-dark-3); line-height: 1.4; }

/* 布局预览 mini grid（在模板卡片内）*/
.p06-mini-grid { width: 100%; height: 100%; display: grid; gap: 3px; box-sizing: border-box; }
.p06-mini-cell { background: rgba(149,213,178,0.22); border: 1px solid rgba(149,213,178,0.4); border-radius: 2px; }
```

- [ ] **Step 2: 重写 S2 的 HTML（render 函数中）**

将 S2 `<section>` 内的内容替换为（保留 section 标签和 id）：

```html
<section class="section-dark" id="p06-s2" style="padding:var(--space-xxl) var(--space-lg);">
  <div class="p06-wizard">
    <p class="p06-section-label p06-label-dark">Interactive Editor</p>
    <h2 class="p06-section-title p06-title-dark">自适应布局编辑器</h2>
    <p class="p06-editor-intro">三步构建你的多面板图：选择面板数量，挑选最合适的排版模板，最后拖入图表类型。</p>

    <!-- 步骤指示器 -->
    <div class="p06-steps-bar">
      <div class="p06-step-item active" data-step="1">
        <div class="p06-step-num">1</div>
        <span class="p06-step-label">选择面板数</span>
      </div>
      <div class="p06-step-connector"></div>
      <div class="p06-step-item" data-step="2">
        <div class="p06-step-num">2</div>
        <span class="p06-step-label">选择布局模板</span>
      </div>
      <div class="p06-step-connector"></div>
      <div class="p06-step-item" data-step="3">
        <div class="p06-step-num">3</div>
        <span class="p06-step-label">拖入图表 / 生成代码</span>
      </div>
    </div>

    <!-- Step 1：面板数量 -->
    <div id="p06-step1">
      <p class="p06-pool-title" style="margin-bottom:var(--space-md);">需要几个子图？</p>
      <div class="p06-count-grid" id="p06-count-grid">
        ${[1,2,3,4,5,6,7,8].map(n => `
          <button class="p06-count-btn${n === 4 ? ' active' : ''}" data-count="${n}">
            ${n}
            <span class="p06-count-sub">${['单图','两图','三图','四图','五图','六图','七图','八图'][n-1]}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Step 2：布局模板（JS 动态渲染） -->
    <div id="p06-step2" class="p06-layout-step visible">
      <p class="p06-pool-title" style="margin-bottom:var(--space-md);">选择布局模板</p>
      <div class="p06-layout-templates" id="p06-layout-templates">
        <!-- 由 renderLayoutTemplates() 动态填充 -->
      </div>
    </div>

    <!-- Step 3：控制 + 画布（桌面端） -->
    <div id="p06-step3" class="p06-layout-step visible p06-desktop-drag">
      <div style="display:flex;gap:var(--space-xl);align-items:start;">
        <!-- 左：面板库 -->
        <div style="width:190px;flex-shrink:0;">
          <p class="p06-pool-title">面板库</p>
          <div id="p06-panel-pool" class="p06-panel-pool">
            ${poolItems}
          </div>
          <p class="p06-pool-hint">拖入右侧画布格子<br>点击已放置面板可移除</p>
        </div>
        <!-- 右：控制 + 画布 -->
        <div style="flex:1;min-width:0;">
          <div class="p06-canvas-controls">
            <div class="p06-ctrl-group">
              <span class="p06-ctrl-label">间距</span>
              <button class="p06-spacing-btn" data-spacing="4">紧密</button>
              <button class="p06-spacing-btn active" data-spacing="12">正常</button>
              <button class="p06-spacing-btn" data-spacing="24">宽松</button>
            </div>
            <div class="p06-ctrl-group p06-toggle-wrap">
              <input type="checkbox" class="p06-toggle" id="p06-label-toggle" checked>
              <label class="p06-toggle-label" for="p06-label-toggle">ABCDEF 标签</label>
            </div>
            <div class="p06-ctrl-group">
              <span class="p06-ctrl-label">尺寸预设</span>
              <button class="p06-size-btn" data-size="nature-single">单栏 89mm</button>
              <button class="p06-size-btn" data-size="nature-1half">1.5栏 140mm</button>
              <button class="p06-size-btn active" data-size="nature-double">双栏 183mm</button>
            </div>
          </div>
          <div class="p06-canvas-wrap">
            <div id="p06-canvas-grid" class="p06-canvas-grid"></div>
          </div>
          <div class="p06-canvas-actions">
            <button class="p06-action-btn" id="p06-clear-btn">清空画布</button>
            <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn">生成代码 →</button>
          </div>
          <p class="p06-canvas-hint">画布模拟 Nature 双栏宽度（183mm），每格对应一个子图</p>
        </div>
      </div>
    </div>

    <!-- 移动端：预设模板 + 画布 -->
    <div class="p06-mobile-editor">
      <p class="p06-pool-title">选择预设布局</p>
      <div id="p06-mobile-presets" class="p06-mobile-presets">
        ${mobilePresets}
      </div>
      <div class="p06-canvas-controls">
        <div class="p06-ctrl-group">
          <span class="p06-ctrl-label">间距</span>
          <button class="p06-spacing-btn" data-spacing="4">紧密</button>
          <button class="p06-spacing-btn active" data-spacing="12">正常</button>
          <button class="p06-spacing-btn" data-spacing="24">宽松</button>
        </div>
        <div class="p06-ctrl-group p06-toggle-wrap">
          <input type="checkbox" class="p06-toggle" id="p06-label-toggle-m" checked>
          <label class="p06-toggle-label" for="p06-label-toggle-m">显示标签</label>
        </div>
      </div>
      <div class="p06-canvas-wrap">
        <div id="p06-canvas-grid-m" class="p06-canvas-grid"></div>
      </div>
      <div style="text-align:center;margin-top:var(--space-xl);">
        <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn-m">查看完整代码 →</button>
      </div>
    </div>
  </div>
</section>
```

注意：需要在 render() 顶部继续保留 `poolItems` 和 `mobilePresets` 的变量定义，同时删除旧的 `canvasCells` 变量（画布格子改为 JS 动态生成）。

- [ ] **Step 3: 实现 renderLayoutTemplates()**

```js
// ══════════════════════════════════════════════════════
//  Step 2：布局模板渲染
// ══════════════════════════════════════════════════════
function buildMiniGridSVG(layout) {
  // 根据 layout.cols / layout.rows / layout.spans 生成 SVG 小预览
  const { cols, rows, spans = [] } = layout;
  const W = 80, H = 56, gap = 3, pad = 2;
  const cw = (W - pad * 2 - gap * (cols - 1)) / cols;
  const rh = (H - pad * 2 - gap * (rows - 1)) / rows;

  // 构建每个格子的 x/y/w/h（考虑 spans）
  const cells = [];
  let idx = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const span = spans.find(s => s.idx === idx);
      const rSpan = span?.rowSpan || 1;
      const cSpan = span?.colSpan || 1;
      const x = pad + c * (cw + gap);
      const y = pad + r * (rh + gap);
      const w = cw * cSpan + gap * (cSpan - 1);
      const h = rh * rSpan + gap * (rSpan - 1);
      cells.push({ x, y, w, h });
      idx++;
      if (idx >= layout.id.startsWith('1s') ? cols * rows - (rows - 1) : cols * rows) break; // 防止超出
    }
    if (cells.length >= (layout.id.startsWith('1s') ? cols * rows - (rows - 1) : cols * rows)) break;
  }

  const rects = cells.map(c =>
    `<rect x="${c.x.toFixed(1)}" y="${c.y.toFixed(1)}" width="${c.w.toFixed(1)}" height="${c.h.toFixed(1)}" rx="2" fill="rgba(149,213,178,0.22)" stroke="rgba(149,213,178,0.45)" stroke-width="1"/>`
  ).join('');

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">${rects}</svg>`;
}

function renderLayoutTemplates() {
  const container = document.getElementById('p06-layout-templates');
  if (!container) return;
  const list = LAYOUTS[_editorState.panelCount] || LAYOUTS[4];

  container.innerHTML = list.map(layout => `
    <div class="p06-tpl-card${layout.id === _editorState.layoutId ? ' active' : ''}" data-layout-id="${layout.id}">
      <div class="p06-tpl-preview">${buildMiniGridSVG(layout)}</div>
      <div class="p06-tpl-name">${layout.label}</div>
      <div class="p06-tpl-desc">${layout.desc}</div>
    </div>
  `).join('');

  // 绑定点击事件
  container.querySelectorAll('.p06-tpl-card').forEach(card => {
    addEvt(card, 'click', () => {
      setLayout(card.dataset.layoutId);
      container.querySelectorAll('.p06-tpl-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      // 更新步骤指示器
      updateStepsBar(3);
      rebuildCanvas();
    });
  });
}

function updateStepsBar(activeStep) {
  document.querySelectorAll('.p06-step-item').forEach(item => {
    const step = parseInt(item.dataset.step);
    item.classList.toggle('active', step === activeStep);
    item.classList.toggle('done', step < activeStep);
  });
}
```

- [ ] **Step 4: 初始化 Step 1 数量选择器（在 initEditorControls 中）**

```js
// 数量选择器
document.querySelectorAll('.p06-count-btn').forEach(btn => {
  addEvt(btn, 'click', () => {
    const n = parseInt(btn.dataset.count);
    setPanelCount(n);
    document.querySelectorAll('.p06-count-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateStepsBar(2);
    renderLayoutTemplates();
    rebuildCanvas();
  });
});
```

- [ ] **Step 5: 浏览器验证**

1. 打开 `#m3-p6`，滚动到 S2
2. 看到步骤指示器"1 → 2 → 3"
3. 点击数字"6"→ 布局模板区更新，显示"两行三列"/"三行两列"/"主图+五辅"三个卡片
4. 点击模板卡片 → 高亮选中，画布格子数量变化（Task 4 完成后）

- [ ] **Step 6: Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3/p06): 三步向导 UI——数量选择器 + 布局模板卡片"
```

---

### Task 4: 动态画布 rebuildCanvas + 拖拽系统适配

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（rebuildCanvas、refreshCanvas、initSortable）

**说明：** 将 `refreshCanvas()` 升级为 `rebuildCanvas()`——根据当前布局模板动态创建 DOM 格子、设置 CSS Grid 属性和 span 规则，然后调用 `refreshCanvas()` 渲染 D3 mini charts。重新初始化 SortableJS。

- [ ] **Step 1: 实现 rebuildCanvas()**

```js
// ══════════════════════════════════════════════════════
//  动态画布：根据 LAYOUTS 重建 DOM 格子
// ══════════════════════════════════════════════════════
function rebuildCanvas() {
  const grid = document.getElementById('p06-canvas-grid');
  if (!grid) return;

  const layout = getCurrentLayout();
  const { cols, rows, gridCols, spans = [], spanConfig } = layout;
  const n = _editorState.panelCount;

  // 销毁旧 Sortable 实例（除 pool）
  _sortableInstances.forEach(s => { try { s.destroy(); } catch (_) {} });
  _sortableInstances = [];

  // 设置 Grid 容器属性
  grid.style.gridTemplateColumns = gridCols;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  grid.style.gap = _editorState.spacing + 'px';

  // 清空并重建格子
  grid.innerHTML = '';

  // 处理特殊 spanConfig（5图的 2+3 / 3+2 等非矩形布局）
  const cellConfigs = buildCellConfigs(layout, n);

  cellConfigs.forEach((cfg, i) => {
    const cell = document.createElement('div');
    cell.className = 'p06-cell';
    cell.dataset.cellIndex = i;

    // 应用 span 样式
    if (cfg.rowSpan > 1) cell.style.gridRow = `span ${cfg.rowSpan}`;
    if (cfg.colSpan > 1) cell.style.gridColumn = `span ${cfg.colSpan}`;

    cell.innerHTML = `
      <div class="p06-cell-label" style="display:none;">${String.fromCharCode(65 + i)}</div>
      <div class="p06-cell-chart"></div>
      <div class="p06-cell-empty">
        <span class="p06-cell-empty-icon">+</span>
        <span class="p06-cell-empty-text">拖入面板</span>
      </div>
    `;
    grid.appendChild(cell);
  });

  // 重新初始化 Sortable（如果桌面端）
  if (window.innerWidth >= 768) {
    initSortableOnGrid();
  }

  // 渲染已有内容
  refreshCanvas();
}

// 计算每个格子的 rowSpan / colSpan
function buildCellConfigs(layout, n) {
  const { spans = [], spanConfig, cols, rows } = layout;
  const configs = Array(n).fill(null).map(() => ({ rowSpan: 1, colSpan: 1 }));

  if (spanConfig === '2+3') {
    // 上行2格各占1.5列 → 用 gridColumn span 实现
    // 格子0,1 各 span 1.5（用3列格子，格子0从col1开始span2，格子1从col3 span1不对...）
    // 简化实现：改用 grid-template-areas
    // 此处采用：上行格子0 span 2列，格子1 span 1列；下行3格各1列
    if (n >= 2) configs[0] = { rowSpan: 1, colSpan: 2 }; // 注意 gridCols 要改为 repeat(3,1fr)
    // configs[1] 正常（1列）
    // 下行三格 configs[2,3,4] 正常
  } else if (spanConfig === '3+2') {
    // 上行3格各1列，下行格子3,4各span1.5列
    if (n >= 4) configs[3] = { rowSpan: 1, colSpan: 2 };
    // configs[4] 不显示（下行只有2格）
    // 实际上 spanConfig '3+2' 上行3格下行2格中间对齐
    // 最简实现：下行格子3占据第1列span1，格子4占据第2列span1，但左右各留0.5列空白
    // 改为：下行2格各span1，用 justify-content:center
  }

  // 处理普通 spans（如主图跨多行）
  spans.forEach(({ idx, rowSpan = 1, colSpan = 1 }) => {
    if (idx < configs.length) {
      configs[idx].rowSpan = rowSpan;
      configs[idx].colSpan = colSpan;
    }
  });

  return configs;
}
```

- [ ] **Step 2: 将 SortableJS 初始化提取为 initSortableOnGrid()**

```js
function initSortableOnGrid() {
  const pool = document.getElementById('p06-panel-pool');
  if (pool && !pool._sortable) {
    const poolSortable = new Sortable(pool, {
      group: { name: 'panels', pull: 'clone', put: false },
      animation: 150, ghostClass: 'p06-ghost', sort: false,
    });
    pool._sortable = poolSortable;
    _sortableInstances.push(poolSortable);
  }

  document.querySelectorAll('#p06-canvas-grid .p06-cell').forEach((cell, i) => {
    const cellSortable = new Sortable(cell, {
      group: { name: 'panels', pull: false, put: true },
      animation: 150, ghostClass: 'p06-ghost',
      onAdd(evt) {
        const type = evt.item.dataset.panelType;
        _editorState.cells[i] = type;
        try { evt.item.remove(); } catch (_) {}
        // 动画：格子内容入场
        const chartDiv = cell.querySelector('.p06-cell-chart');
        if (chartDiv) {
          gsap.fromTo(cell, { scale: 0.92 }, { scale: 1, duration: 0.25, ease: 'back.out(1.5)' });
        }
        refreshCanvas();
      }
    });
    _sortableInstances.push(cellSortable);

    addEvt(cell, 'click', () => {
      if (_editorState.cells[i]) {
        _editorState.cells[i] = null;
        gsap.fromTo(cell, { scale: 1 }, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        refreshCanvas();
      }
    });
  });
}
```

- [ ] **Step 3: 更新 refreshCanvas 使其适配动态格子**

`refreshCanvas` 本身基本正确，只需确保 `grid.style.gap` 同步和无需再硬编码格子数量：

```js
function refreshCanvas() {
  const grid = document.getElementById('p06-canvas-grid');
  if (!grid) return;
  grid.style.gap = _editorState.spacing + 'px';

  const cells = grid.querySelectorAll('.p06-cell');
  cells.forEach((cell, i) => {
    const panelType = _editorState.cells[i] || null;
    const chartDiv  = cell.querySelector('.p06-cell-chart');
    const labelDiv  = cell.querySelector('.p06-cell-label');
    const emptyDiv  = cell.querySelector('.p06-cell-empty');

    if (panelType) {
      const cw = cell.offsetWidth || 120;
      const ch = Math.round(cw * 0.65);
      if (chartDiv) renderMiniChart(chartDiv, panelType, cw - 16, Math.min(ch, 100));
      if (labelDiv) {
        labelDiv.textContent = String.fromCharCode(65 + i);
        labelDiv.style.display = _editorState.showLabels ? 'flex' : 'none';
      }
      if (emptyDiv) emptyDiv.style.display = 'none';
      cell.classList.add('p06-cell--filled');
    } else {
      if (chartDiv) chartDiv.innerHTML = '';
      if (labelDiv) labelDiv.style.display = 'none';
      if (emptyDiv) emptyDiv.style.display = 'flex';
      cell.classList.remove('p06-cell--filled');
    }
  });

  updateGeneratedCode();
}
```

- [ ] **Step 4: 在 init() 中用 rebuildCanvas() 替代旧的初始化**

```js
// 默认状态：4面板，2×2布局，全部填充示例
setPanelCount(4);
_editorState.layoutId = '2x2';
_editorState.cells = ['main', 'scatter', 'bar', 'box'];
renderLayoutTemplates();
rebuildCanvas();
```

- [ ] **Step 5: 浏览器验证**

1. 默认进入页面 → S2 显示 2×2 四格画布，每格有 D3 mini chart
2. 点击数字"6"→ 模板更新，画布变 2×3 六格
3. 点击"三行两列"模板 → 画布变 3×2
4. 拖动面板类型到空格 → 格子显示 mini chart，动画流畅
5. 点击已填充格子 → 格子清空

- [ ] **Step 6: Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3/p06): 动态画布 rebuildCanvas，支持任意 rows×cols + span 布局"
```

---

## Chunk 3: 代码生成 + 视觉完善

### Task 5: 代码生成动态适配 rows/cols

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（generateRCode、generatePyCode）

**说明：** 将硬编码的 `3列2行` 改为读取 `getCurrentLayout()` 的 `rows/cols`，patchwork 布局语法动态生成，matplotlib `subplots` 行列动态。

- [ ] **Step 1: 重写 generateRCode()**

```js
function generateRCode() {
  const filled = _editorState.cells.filter(Boolean);
  if (filled.length === 0) return '# 请先在画布中放置面板\n';

  const layout = getCurrentLayout();
  const { cols, rows, spans = [] } = layout;
  const n = _editorState.panelCount;

  // 图定义（去重）
  const unique = [...new Set(filled)];
  const defs = unique.map(t => {
    const map = {
      main:    `# 主图：散点 + 回归线\np_main <- ggplot(df, aes(x = var1, y = var2, color = group)) +\n  geom_point(size = 2, alpha = 0.7) +\n  geom_smooth(method = "lm", se = TRUE, linewidth = 0.8) +\n  scale_color_manual(values = okabe_ito) +\n  theme_classic(base_size = 10) +\n  labs(x = "自变量", y = "因变量")`,
      scatter: `# 散点图\np_scatter <- ggplot(df, aes(x = x1, y = x2)) +\n  geom_point(size = 2, alpha = 0.6, color = "#7EC8E3") +\n  theme_classic(base_size = 10)`,
      line:    `# 折线图\np_line <- ggplot(df_time, aes(x = time, y = value, color = group)) +\n  geom_line(linewidth = 0.8) +\n  geom_point(size = 1.5) +\n  theme_classic(base_size = 10)`,
      bar:     `# 柱状图\np_bar <- ggplot(df_sum, aes(x = group, y = mean, fill = group)) +\n  geom_col(width = 0.6) +\n  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.2) +\n  theme_classic(base_size = 10)`,
      box:     `# 箱线图\np_box <- ggplot(df, aes(x = group, y = value, fill = group)) +\n  geom_boxplot(width = 0.5, outlier.shape = NA, alpha = 0.6) +\n  geom_jitter(width = 0.1, size = 1.5, alpha = 0.5) +\n  theme_classic(base_size = 10)`,
      heatmap: `# 热图\np_heatmap <- ggplot(df_mat, aes(x = col, y = row, fill = value)) +\n  geom_tile(color = "white", linewidth = 0.3) +\n  scale_fill_distiller(palette = "YlOrRd", direction = 1) +\n  theme_minimal(base_size = 10)`,
    };
    return map[t] || `p_${t} <- ggplot() + labs(title = "${t}")`;
  }).join('\n\n');

  // patchwork 布局：根据有无 spans 决定 design 字符串 vs ncol
  let layoutCode;
  const hasSpan = spans.length > 0;

  if (hasSpan && n <= 8) {
    // 生成 design 字符串（ABCDE...）
    const letters = Array.from({ length: n }, (_, i) => String.fromCharCode(65 + i));
    const grid = [];
    for (let r = 0; r < rows; r++) {
      let rowStr = '';
      for (let c = 0; c < cols; c++) {
        const cellIdx = r * cols + c;
        // 找该位置对应的格子
        rowStr += (cellIdx < n) ? letters[cellIdx] : '#';
      }
      grid.push(rowStr);
    }
    const designStr = grid.join('\n');
    layoutCode = `plot_layout(design = "${designStr}", guides = "collect")`;
  } else {
    layoutCode = `plot_layout(ncol = ${cols}, guides = "collect")`;
  }

  const varNames = _editorState.cells.map(t => t ? `p_${t}` : 'plot_spacer()');
  const labelsCode = _editorState.showLabels
    ? '\n  plot_annotation(tag_levels = "A") &\n  theme(plot.tag = element_text(size = 8, face = "bold"))'
    : '';

  // 导出尺寸根据 preset
  const presetSizes = {
    'nature-single': '89, height = 70',
    'nature-1half': '140, height = 100',
    'nature-double': '183, height = 120',
  };
  const sizeStr = presetSizes[_editorState.preset] || '183, height = 120';

  return `library(ggplot2)
library(patchwork)

# Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00", "#56B4E9", "#009E73")

# ─── 各子图定义 ───────────────────────────────────────
${defs}

# ─── 组合布局（${rows}行${cols}列）────────────────────────────
(${varNames.join(' | ')}) +
  ${layoutCode}${labelsCode}

# ─── 导出 ─────────────────────────────────────────────
ggsave("multi_panel.pdf",
       width = ${sizeStr}, units = "mm", dpi = 300)`;
}
```

- [ ] **Step 2: 重写 generatePyCode()**

```js
function generatePyCode() {
  const filled = _editorState.cells.filter(Boolean);
  if (filled.length === 0) return '# 请先在画布中放置面板\n';

  const layout = getCurrentLayout();
  const { cols, rows, spans = [] } = layout;
  const hasSpan = spans.length > 0;

  const hspace = _editorState.spacing <= 4 ? 0.3 : _editorState.spacing <= 12 ? 0.45 : 0.6;
  const wspace = _editorState.spacing <= 4 ? 0.25 : _editorState.spacing <= 12 ? 0.35 : 0.5;
  const figW = (cols * 2.4).toFixed(1);
  const figH = (rows * 2.1).toFixed(1);

  // 有 span 时，用 gridspec
  if (hasSpan) {
    const spanDef = spans.map(({ idx, rowSpan = 1, colSpan = 1 }) => {
      const r = Math.floor(idx / cols);
      const c = idx % cols;
      return `ax_span = fig.add_subplot(gs[${r}:${r + rowSpan}, ${c}:${c + colSpan}])  # 面板 ${String.fromCharCode(65 + idx)}（主图）`;
    }).join('\n');

    return `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

plt.rcParams.update({
    'font.size': 9, 'axes.labelsize': 9,
    'axes.spines.top': False, 'axes.spines.right': False,
    'figure.dpi': 300,
})

# ─── 创建 ${rows}×${cols} GridSpec 画布（含 span 布局）────────────
fig = plt.figure(figsize=(${figW}, ${figH}))
gs = gridspec.GridSpec(${rows}, ${cols}, figure=fig,
                       hspace=${hspace}, wspace=${wspace})

${spanDef}
# 其余子图
# ax1 = fig.add_subplot(gs[0, 1])  # 按需添加

plt.savefig('multi_panel.pdf', bbox_inches='tight', dpi=300)
print("导出完成：multi_panel.pdf")`;
  }

  // 无 span：标准 subplots
  const plotCalls = _editorState.cells.map((t, i) => {
    const r = Math.floor(i / cols);
    const c = i % cols;
    // subplots 返回 1D 或 2D 数组，统一用 ax.flat[i]
    const axRef = `ax.flat[${i}]`;
    const label = _editorState.showLabels
      ? `${axRef}.set_title("(${String.fromCharCode(65 + i)})", loc='left', fontweight='bold', fontsize=9)\n`
      : '';
    const calls = {
      main:    `${axRef}.scatter(df['var1'], df['var2'], c=colors, alpha=0.7, s=20)\n${axRef}.plot(x_fit, y_fit, color='#F0B27A', lw=1.2)\n${label}${axRef}.set(xlabel='自变量', ylabel='因变量')`,
      scatter: `${axRef}.scatter(df['x1'], df['x2'], alpha=0.6, s=20, color='#7EC8E3')\n${label}${axRef}.set(xlabel='X', ylabel='Y')`,
      line:    `${axRef}.plot(df['time'], df['value'], lw=1.2, color='#95D5B2', marker='o', ms=3)\n${label}${axRef}.set(xlabel='时间', ylabel='数值')`,
      bar:     `${axRef}.bar(groups, means, color='#7EC8E3', yerr=sems, capsize=3, width=0.5)\n${label}${axRef}.set(xlabel='分组', ylabel='均值 ± SE')`,
      box:     `bxp = ${axRef}.boxplot([df[df['group']==g]['value'] for g in groups], patch_artist=True)\nfor patch in bxp['boxes']: patch.set_facecolor('#95D5B2'); patch.set_alpha(0.5)\n${label}${axRef}.set(xlabel='分组', ylabel='数值')`,
      heatmap: `im = ${axRef}.imshow(matrix, aspect='auto', cmap='YlOrRd')\nfig.colorbar(im, ax=${axRef}, shrink=0.8)\n${label}`,
    };
    if (!t) return `${axRef}.axis('off')  # 空格`;
    return calls[t] || `${axRef}.text(0.5, 0.5, '${t}', ha='center', transform=${axRef}.transAxes)`;
  }).join('\n\n');

  return `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams.update({
    'font.size': 9, 'axes.labelsize': 9, 'axes.titlesize': 9,
    'xtick.labelsize': 8, 'ytick.labelsize': 8,
    'figure.dpi': 300,
    'axes.spines.top': False, 'axes.spines.right': False,
})

np.random.seed(42)
df = pd.DataFrame({
    'var1': np.random.randn(50), 'var2': np.random.randn(50),
    'x1': np.random.randn(50),   'x2': np.random.randn(50),
    'time': np.arange(50),       'value': np.cumsum(np.random.randn(50)),
    'group': np.repeat(['A','B','C','D','E'], 10)
})
groups = ['A','B','C','D','E']
means = df.groupby('group')['value'].mean().values
sems  = df.groupby('group')['value'].sem().values
matrix = np.random.rand(5, 6)
colors = ['#7EC8E3' if g == 'A' else '#95D5B2' for g in df['group']]
x_fit = np.linspace(df['var1'].min(), df['var1'].max(), 50)
y_fit = np.poly1d(np.polyfit(df['var1'], df['var2'], 1))(x_fit)

# ─── 创建 ${rows}×${cols} 画布（${figW}" × ${figH}"）────────────────
fig, ax = plt.subplots(${rows}, ${cols}, figsize=(${figW}, ${figH}))
fig.subplots_adjust(hspace=${hspace}, wspace=${wspace})

${plotCalls}

plt.tight_layout()
plt.savefig('multi_panel.pdf', bbox_inches='tight', dpi=300)
plt.savefig('multi_panel.tiff', bbox_inches='tight', dpi=600)
print("导出完成：multi_panel.pdf / .tiff")`;
}
```

- [ ] **Step 3: 浏览器验证**

1. 在 S2 选择 3 个面板，选"主图+两辅"布局（1s+2）
2. 拖入 main、scatter、line
3. 点击"生成代码 →"
4. S3 R 编辑器显示：`plot_layout(design = "AB\nAC"...)`（主图A跨两行）
5. S3 Python 编辑器显示：`gridspec.GridSpec(2, 2, ...)` 和 `ax_span`

- [ ] **Step 4: Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3/p06): 代码生成动态适配 rows/cols，span 布局输出 gridspec / design 字符串"
```

---

### Task 6: 动画提升 + S1 内容丰富 + 整体视觉完善

**Files:**
- Modify: `src/pages/m3/p06-multi-panel.js`（CSS、S1 HTML、initScrollAnimations）

**说明：** 提升整体视觉品质：Step 切换动画、格子入场动画、S1 增加 3 个布局原型、"生成代码"按钮点击 feedback、代码编辑器高亮 flash。

- [ ] **Step 1: 添加画布切换动画（rebuildCanvas 增强）**

在 `rebuildCanvas()` 的 `grid.innerHTML = ''` 之前加入退出动画，之后加入入场动画：

```js
// 退出旧格子
const oldCells = [...grid.querySelectorAll('.p06-cell')];
if (oldCells.length > 0) {
  await new Promise(resolve => {
    gsap.to(oldCells, { scale: 0.88, opacity: 0, duration: 0.18, stagger: 0.03, ease: 'power2.in', onComplete: resolve });
  });
}
grid.innerHTML = '';
// ... 创建新格子 ...
// 入场动画
const newCells = [...grid.querySelectorAll('.p06-cell')];
gsap.fromTo(newCells, { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'back.out(1.4)', delay: 0.05 });
```

注意：需将 `rebuildCanvas` 改为 `async function`，并用 `gsap.to(..., { onComplete: resolve })` 包裹。

- [ ] **Step 2: "生成代码"按钮点击 feedback**

在 `initEditorControls` 的生成代码按钮事件中增加：

```js
addEvt(btn, 'click', () => {
  updateGeneratedCode();
  const s3 = document.getElementById('p06-s3');
  if (s3) {
    s3.scrollIntoView({ behavior: 'smooth' });
    // 编辑器容器高亮 flash
    const t = setTimeout(() => {
      const editors = document.querySelectorAll('.p06-editor-container');
      gsap.fromTo(editors,
        { boxShadow: '0 0 0 2px rgba(149,213,178,0)' },
        { boxShadow: '0 0 0 2px rgba(149,213,178,0.6)', duration: 0.4, yoyo: true, repeat: 2, ease: 'power2.inOut' }
      );
    }, 600); // 等滚动动画完成
    _timeouts.push(t);
  }
});
```

- [ ] **Step 3: S1 增加 3 个布局原型（在现有 3 个后追加）**

在"3列叙事流"卡片之后追加：

```html
<!-- 2×2 四等分（原型4）-->
<div class="p06-archetype-card">
  <div class="p06-archetype-header">
    <div class="p06-archetype-num">4</div>
    <div>
      <p class="p06-archetype-name">2×2 均等四图</p>
      <p class="p06-archetype-use">四组平行对比，无主次之分</p>
    </div>
  </div>
  <div class="p06-layout-diagram layout-2x2">
    <div class="p06-layout-cell">A</div>
    <div class="p06-layout-cell">B</div>
    <div class="p06-layout-cell">C</div>
    <div class="p06-layout-cell">D</div>
  </div>
  <p class="p06-archetype-note">适合：四种基因型对比、Before/After × 两组实验、ROC 曲线四分类</p>
</div>

<!-- 渐进揭示型（原型5）-->
<div class="p06-archetype-card">
  <div class="p06-archetype-header">
    <div class="p06-archetype-num">5</div>
    <div>
      <p class="p06-archetype-name">渐进揭示型（1+N）</p>
      <p class="p06-archetype-use">主图全高，辅图递进补充细节</p>
    </div>
  </div>
  <div class="p06-layout-diagram layout-1plus2" style="grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr 1fr;">
    <div class="p06-layout-cell" style="grid-row:span 3;">A<br><small style="opacity:0.6;font-size:0.58rem;">主图</small></div>
    <div class="p06-layout-cell">B</div>
    <div class="p06-layout-cell">C</div>
    <div class="p06-layout-cell">D</div>
  </div>
  <p class="p06-archetype-note">适合：全图+三个局部放大、总体趋势+三种条件、模式图+三组验证</p>
</div>

<!-- 横幅底图型（原型6）-->
<div class="p06-archetype-card">
  <div class="p06-archetype-header">
    <div class="p06-archetype-num">6</div>
    <div>
      <p class="p06-archetype-name">横幅底图型</p>
      <p class="p06-archetype-use">上方多小图，底部横跨大图总结</p>
    </div>
  </div>
  <div class="p06-layout-diagram" style="grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;">
    <div class="p06-layout-cell">A</div>
    <div class="p06-layout-cell">B</div>
    <div class="p06-layout-cell">C</div>
    <div class="p06-layout-cell" style="grid-column:span 3;">D（横跨全宽）</div>
  </div>
  <p class="p06-archetype-note">适合：三个亚组结果 + 底部汇总统计、三时间点 + 综合热图</p>
</div>
```

- [ ] **Step 4: 增强 Hero 背景光晕（CSS 精修）**

在现有 `.p06-hero::before` 动画基础上，增加第三层格点背景：

```css
.p06-hero-bg-dots {
  position: absolute; inset: 0; pointer-events: none; z-index: 0;
  background-image: radial-gradient(circle, rgba(149,213,178,0.08) 1px, transparent 1px);
  background-size: 32px 32px;
  animation: p06-dots-drift 20s linear infinite;
}
@keyframes p06-dots-drift { from { background-position: 0 0; } to { background-position: 32px 32px; } }
```

在 Hero section 内最前面添加 `<div class="p06-hero-bg-dots"></div>`。

- [ ] **Step 5: 完善 initScrollAnimations（增加新元素）**

```js
function initScrollAnimations() {
  // S1
  fadeIn('#p06-s1 .p06-section-label', { y: 30 });
  fadeIn('#p06-s1 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('#p06-s1 .p06-intro-text',    { y: 30 });
  fadeIn('.p06-spec-item',             { stagger: 0.08, y: 20 });
  fadeIn('.p06-archetype-card',        { stagger: 0.15, y: 40, duration: 0.7 });

  // S2
  fadeIn('#p06-s2 .p06-section-label', { y: 30 });
  fadeIn('#p06-s2 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('.p06-steps-bar',             { y: 25, duration: 0.7 });
  fadeIn('.p06-count-grid',            { y: 30, duration: 0.6 });
  fadeIn('.p06-layout-templates',      { y: 30, duration: 0.6 });

  // S3
  fadeIn('#p06-s3 .p06-section-label', { y: 30 });
  fadeIn('#p06-s3 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('.p06-code-tabs',             { y: 25 });
  fadeIn('.p06-code-panels',           { y: 35 });
  fadeIn('.p06-annotation',            { stagger: 0.1, y: 20 });

  // S4
  fadeIn('#p06-s4 .p06-section-label', { y: 30 });
  fadeIn('#p06-s4 .p06-section-title', { y: 40, duration: 0.8 });
  fadeIn('.p06-journal-card',          { stagger: 0.18, y: 40, duration: 0.8 });

  // Footer
  fadeIn('.page-footer-quote',         { y: 40, duration: 0.9 });
  fadeIn('.page-footer-cta .page-footer-nav', { y: 25 });
}
```

- [ ] **Step 6: 浏览器全面验证**

1. Hero：格点背景微漂移动画正常
2. S1：6个布局原型卡片全部显示，滚动渐入
3. S2：
   - 步骤指示器正确显示当前步骤高亮
   - 切换面板数时布局模板卡片动画更新
   - 切换布局模板时画布格子数量/形状变化，有动画过渡
   - 拖放面板到格子，mini chart 显示
   - 点击"生成代码"→ 滚动到 S3，编辑器有 flash 高亮
4. S3：R/Python 编辑器显示根据画布状态生成的代码
5. S4：期刊卡片正常
6. 移动端（Chrome DevTools iPhone SE）：步骤指示器可横向滚动，预设按钮正常工作

- [ ] **Step 7: 最终 Commit**

```bash
git add src/pages/m3/p06-multi-panel.js
git commit -m "feat(m3/p06): 完整重做——三步向导、动态画布、代码生成适配、动画提升、S1扩展"
```

---

## 开发注意事项

### 关键规则
1. **GSAP 必须从 `ScrollAnimations.js` 导入**：`import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js'`，禁止 `window.gsap`
2. **createCodeEditor 正确签名**：`createCodeEditor(el, { code, language, readOnly })`，返回 `{ setCode, getCode, destroy }`
3. **updateGeneratedCode 用 setCode**：`_rEditor.setCode(...)` 而非 `_rEditor.dispatch(...)`
4. **destroy() 必须清理 SortableJS**：`_sortableInstances.forEach(s => s.destroy())`
5. **addEvt 统一管理事件**：所有 addEventListener 必须通过 `addEvt(el, type, fn)` 注册，确保 destroy 时能清理
6. **CSS 代码块禁止 `white-space: pre`**：用 `white-space: pre-wrap; word-wrap: break-word`

### 常见陷阱
- `Sortable` 的 `onAdd` 回调中，必须手动 `evt.item.remove()` 移除 DOM 节点（SortableJS 会将原节点移入 cell）
- `rebuildCanvas` 改为 async 后，init() 中调用它不需要 await（初始渲染时无需等待退出动画）
- `buildMiniGridSVG` 的 span 计算需处理"格子索引"和"Grid 行列"的对应关系
- 移动端 `#p06-canvas-grid-m` 保持简化版（不用 Sortable，只用预设按钮）
