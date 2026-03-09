# m1-p10 UI 改进与 Bug 修复 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 修复 p10 页面 4 个问题：Hero 内容空白、工作流左栏抖动、格式对比桌面布局空白 + 移动端溢出、格式插图质量差。

**Architecture:** 单文件修改 `src/pages/m1/p10-workflow-export.js`。HTML 骨架 / CSS / JS 都在同一文件内。

**Tech Stack:** 原生 CSS，GSAP（`window.gsap`），D3.js（`import * as d3 from 'd3'`）。

---

## 通用规范

- 读取文件前先理解现有代码，绝不盲目替换
- 所有 flex 子项保持 `min-width: 0`
- 代码块保持 `white-space: pre-wrap`
- 不引入新依赖
- 每个 Task 完成后立即 commit

---

## Task 1: Hero 补全内容

**Problem:** Hero 只有标题 + 快捷导航 + "向下探索"，视觉稀疏，缺乏信息量。

**Fix:** 在 tagline 与 quicknav 之间，插入 3 个统计数字卡片（`hero-stats` 行）：
- `06` 核心步骤
- `05` 导出格式
- `06` 期刊速查

同时在 quicknav 下方、scroll-hint 上方，插入一排 6 步工作流迷你预览（小圆点 + 步骤名，横向排列），让用户在 Hero 就能感知页面结构。

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js`

### Step 1: 在 render() 中，在 Hero HTML 里的 `#p10-quicknav` 上方插入 stats

找到 Hero HTML 中这一行：
```html
    <nav class="hero-quicknav" id="p10-quicknav" style="opacity:0;">
```

在它之前插入（注意保留 style="opacity:0;" 留给 GSAP 动画）：
```html
    <!-- Hero stats -->
    <div class="p10-hero-stats" id="p10-hero-stats" style="opacity:0;">
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="6">6</span>
        <span class="p10-hero-stat-label">核心步骤</span>
      </div>
      <div class="p10-hero-stat-divider"></div>
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="5">5</span>
        <span class="p10-hero-stat-label">导出格式</span>
      </div>
      <div class="p10-hero-stat-divider"></div>
      <div class="p10-hero-stat">
        <span class="p10-hero-stat-num" data-target="6">6</span>
        <span class="p10-hero-stat-label">期刊速查</span>
      </div>
    </div>
```

### Step 2: 在 CSS `<style>` 中，添加 Hero stats 样式

在 `.scroll-hint` 和 `@keyframes p10-bounce` 之后、`/* ── Workflow Section ──*/` 之前插入：

```css
/* ── Hero Stats ── */
.p10-hero-stats {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin: var(--space-md) 0;
}

.p10-hero-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.p10-hero-stat-num {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  letter-spacing: -0.03em;
}

.p10-hero-stat-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.p10-hero-stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.12);
  flex-shrink: 0;
}

@media (max-width: 480px) {
  .p10-hero-stats {
    gap: var(--space-md);
  }
  .p10-hero-stat-num {
    font-size: 2rem;
  }
}
```

### Step 3: 在 init() 中，添加 hero-stats 的 GSAP 入场 + count-up

找到 init() 中现有的 GSAP 入场代码，在 `#p10-quicknav` 动画（delay:0.7）后、`scroll-hint` 动画之前插入：

```js
gsap.fromTo('#p10-hero-stats',
  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: 'power3.out',
    onComplete: () => {
      // count-up animation
      document.querySelectorAll('.p10-hero-stat-num').forEach(el => {
        const target = parseInt(el.dataset.target) || 0;
        let current = 0;
        const step = () => {
          current++;
          el.textContent = current;
          if (current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
  });
```

（将原有 `#p10-quicknav` delay 从 0.7 → 0.72，`scroll-hint` delay 从 0.85 → 0.9，不影响视觉，留空间给 stats）

### Step 4: commit

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat(p10): add hero stats (6步/5格式/6期刊) with count-up animation"
```

---

## Task 2: 工作流左侧目录抖动修复

**Problem:** `initWorkflowDesktop()` 中每次 scroll 事件都直接读取 `getBoundingClientRect()` 并立刻写入 `style.transform`，导致强制同步 layout reflow + 在每帧多次触发 → 视觉抖动。

**Fix:** 用 `requestAnimationFrame` + `ticking` flag 节流；缓存 `body.offsetHeight`（不变量）和 `left.offsetHeight`（不变量），只在 rAF 内读取 `getBoundingClientRect()`。

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — `initWorkflowDesktop()` 函数

### Step 1: 替换 `initWorkflowDesktop()` 中的 `updateSticky` 函数

找到现有代码：
```js
  function updateSticky() {
    const bodyRect = body.getBoundingClientRect();
    const scrolledPast = Math.max(0, -bodyRect.top);
    const maxTranslate = Math.max(0, body.offsetHeight - left.offsetHeight);
    left.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;

    // Step detection: each step occupies 100vh
    const stepIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
    if (stepIdx !== currentStep) updateStep(stepIdx);
  }

  _scrollHandler = updateSticky;
  window.addEventListener('scroll', updateSticky, { passive: true });
  updateSticky();
```

替换为：
```js
  // 缓存不变量（避免每帧触发 reflow）
  const cachedBodyHeight = body.offsetHeight;
  const cachedLeftHeight = left.offsetHeight;
  const maxTranslate = Math.max(0, cachedBodyHeight - cachedLeftHeight);

  let ticking = false;

  function updateSticky() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolledPast = Math.max(0, -body.getBoundingClientRect().top);
      left.style.transform = `translateY(${Math.min(scrolledPast, maxTranslate)}px)`;
      const stepIdx = Math.min(TOTAL - 1, Math.max(0, Math.floor(scrolledPast / window.innerHeight)));
      if (stepIdx !== currentStep) updateStep(stepIdx);
      ticking = false;
    });
  }

  _scrollHandler = updateSticky;
  window.addEventListener('scroll', updateSticky, { passive: true });
  updateSticky();
```

### Step 2: commit

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js
git commit -m "fix(p10): eliminate sticky jitter with rAF ticking pattern and cached heights"
```

---

## Task 3: 格式对比 — 桌面布局 + 移动端溢出修复

**Problem 1（桌面）:** `.p10-fmt-info` 和 `.p10-fmt-visual` 各为 `flex: 1`，比例相等，但 info 内容更多。`.p10-fmt-svg-container` 固定 `height: 180px` 太矮，右侧整体偏空。

**Problem 2（移动端）:** `.p10-format-panel-inner` 在 `<=768px` 改为 flex-column，但 `.p10-format-tabs` 内的 `flex-wrap: wrap` 会让按钮换行占高度；`<=480px` 下 `flex-direction: column` 改为全宽按钮，但没有限制 tab 容器宽度，导致某些 tab 文字溢出。另外 `.p10-fmt-visual` 在 mobile 宽度不足时 Canvas/SVG 可能超出父容器。

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — CSS section

### Step 1: 修改桌面端 `.p10-format-panel-inner` 布局比例

找到：
```css
.p10-fmt-info {
  flex: 1;
  min-width: 0;
}
```
改为：
```css
.p10-fmt-info {
  flex: 1.1;
  min-width: 0;
}
```

找到：
```css
.p10-fmt-visual {
  flex: 1;
  min-width: 0;
}
```
改为：
```css
.p10-fmt-visual {
  flex: 0.9;
  min-width: 0;
}
```

找到：
```css
.p10-fmt-svg-container {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
  border: 1px solid var(--border-dark);
  overflow: hidden;
}
```
改为：
```css
.p10-fmt-svg-container {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-md);
  border: 1px solid var(--border-dark);
  overflow: hidden;
}
```

### Step 2: 修复移动端 `.p10-format-tabs` 溢出

找到 `@media (max-width: 768px)` 中：
```css
  .p10-format-tabs {
    gap: 2px;
  }
  .p10-format-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
```
替换为：
```css
  .p10-format-tabs {
    gap: 2px;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    max-width: 100%;
    padding-bottom: 2px;
  }
  .p10-format-tabs::-webkit-scrollbar {
    display: none;
  }
  .p10-format-tab {
    padding: 8px 12px;
    font-size: 13px;
    flex-shrink: 0;
  }
```

找到 `@media (max-width: 480px)` 中：
```css
  .p10-format-tabs {
    flex-direction: column;
  }
  .p10-format-tab {
    width: 100%;
    justify-content: flex-start;
  }
```
删除这两条（480px 下改为横向滚动即可，不需要竖排）。

同时确保 `.p10-fmt-visual` 在 mobile 下宽度受限：在 `@media (max-width: 768px)` 中添加：
```css
  .p10-fmt-visual {
    width: 100%;
  }
  .p10-fmt-svg-container {
    height: 200px;
  }
```

### Step 3: commit

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js
git commit -m "fix(p10): format section layout — fix empty right column and mobile overflow"
```

---

## Task 4: 格式插图重新设计

**Problem:** 当前的格式插图太丑、太简单：
- 矢量格式：只有一条弯曲的线 + 3 个坐标点
- 位图格式：一个无意义的彩色像素网格

**Fix:** 重新设计两类插图，突出"矢量 vs 位图"的核心差异——**缩放质量**：
- **矢量** (`renderVectorAnimation`)：在容器内左右分屏：左侧展示一个完整的迷你折线图（D3 绘制，带坐标轴），右侧展示"放大 4×"后的同等清晰效果，加标签 `×4 zoom` + `依然清晰 ✓`
- **位图** (`renderRasterAnimation`)：左侧展示正常清晰的图，右侧展示放大 4× 后的像素块效果（用大方块模拟锯齿），加标签 `×4 zoom` + `像素化 ✗`

**Files:**
- Modify: `src/pages/m1/p10-workflow-export.js` — `renderVectorAnimation` 和 `renderRasterAnimation` 两个函数

### Step 1: 替换 `renderVectorAnimation(container, f)`

完整替换（保留函数签名）：

```js
function renderVectorAnimation(container, f) {
  const svg = d3.select(container).append('svg')
    .attr('viewBox', '0 0 420 230')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', '100%');

  // 背景
  svg.append('rect').attr('width', 420).attr('height', 230).attr('fill', '#0d1117');

  // 标题
  svg.append('text').attr('x', 210).attr('y', 22)
    .attr('text-anchor', 'middle').attr('fill', f.color)
    .attr('font-size', 12).attr('font-family', 'JetBrains Mono, monospace')
    .text('矢量格式：无限缩放不失真');

  // 分隔线
  svg.append('line').attr('x1', 210).attr('y1', 34).attr('x2', 210).attr('y2', 210)
    .attr('stroke', '#2a2a3a').attr('stroke-width', 1).attr('stroke-dasharray', '4,3');

  // ── 左侧：原始视图 ──
  const lData = [0,1,2,3,4,5].map(i => ({ x: i, y: [2.1,3.8,2.9,4.5,3.2,5.1][i] }));
  const lX = d3.scaleLinear().domain([0,5]).range([30, 185]);
  const lY = d3.scaleLinear().domain([0,6]).range([195, 45]);

  // 坐标轴（极简）
  svg.append('line').attr('x1', 30).attr('y1', 195).attr('x2', 185).attr('y2', 195)
    .attr('stroke', '#3a3a4a').attr('stroke-width', 1);
  svg.append('line').attr('x1', 30).attr('y1', 45).attr('x2', 30).attr('y2', 195)
    .attr('stroke', '#3a3a4a').attr('stroke-width', 1);

  // 折线
  const lLine = d3.line().x(d => lX(d.x)).y(d => lY(d.y)).curve(d3.curveMonotoneX);
  const lPath = svg.append('path').attr('d', lLine(lData))
    .attr('fill', 'none').attr('stroke', f.color).attr('stroke-width', 2)
    .attr('stroke-dasharray', function() { return this.getTotalLength(); })
    .attr('stroke-dashoffset', function() { return this.getTotalLength(); });
  lPath.transition().duration(1200).ease(d3.easeCubicOut).attr('stroke-dashoffset', 0);

  // 数据点
  lData.forEach(d => {
    svg.append('circle').attr('cx', lX(d.x)).attr('cy', lY(d.y)).attr('r', 0)
      .attr('fill', f.color).transition().delay(1000).duration(300).attr('r', 3.5);
  });

  // 标签
  svg.append('text').attr('x', 107).attr('y', 215)
    .attr('text-anchor', 'middle').attr('fill', '#555').attr('font-size', 10)
    .text('100% 原始大小');

  // ── 右侧：4× 放大视图（同等清晰）──
  // 只绘制放大区域的一个数据点附近，清晰展示线条和点
  const zoom = 2.8;
  const rCx = 313, rCy = 120;
  // 剪裁区域
  svg.append('rect').attr('x', 222).attr('y', 38).attr('width', 174).attr('height', 162)
    .attr('fill', '#111520').attr('rx', 4);

  // 放大的折线（只画中间3段）
  const rData = lData.slice(1, 5);
  const rX = d3.scaleLinear().domain([1,4]).range([232, 384]);
  const rY = d3.scaleLinear().domain([2,6]).range([185, 48]);
  const rLine = d3.line().x(d => rX(d.x)).y(d => rY(d.y)).curve(d3.curveMonotoneX);
  const rPath = svg.append('path').attr('d', rLine(rData))
    .attr('fill', 'none').attr('stroke', f.color).attr('stroke-width', 2.5)
    .attr('stroke-dasharray', function() { return this.getTotalLength(); })
    .attr('stroke-dashoffset', function() { return this.getTotalLength(); });
  rPath.transition().delay(400).duration(1000).ease(d3.easeCubicOut).attr('stroke-dashoffset', 0);

  rData.forEach(d => {
    svg.append('circle').attr('cx', rX(d.x)).attr('cy', rY(d.y)).attr('r', 0)
      .attr('fill', f.color).attr('stroke', '#0d1117').attr('stroke-width', 1.5)
      .transition().delay(1300).duration(300).attr('r', 5.5);
  });

  // 放大倍数标签
  svg.append('rect').attr('x', 222).attr('y', 38).attr('width', 46).attr('height', 18)
    .attr('fill', f.color).attr('rx', 3).style('opacity', 0.9);
  svg.append('text').attr('x', 245).attr('y', 51).attr('text-anchor', 'middle')
    .attr('fill', '#000').attr('font-size', 10).attr('font-weight', 'bold')
    .attr('font-family', 'JetBrains Mono, monospace').text('×4 zoom');

  svg.append('text').attr('x', 309).attr('y', 215)
    .attr('text-anchor', 'middle').attr('fill', f.color).attr('font-size', 10)
    .text('依然清晰 ✓');
}
```

### Step 2: 替换 `renderRasterAnimation(container, f)`

完整替换（保留函数签名）：

```js
function renderRasterAnimation(container, f) {
  const canvas = document.createElement('canvas');
  const W = 420, H = 230;
  canvas.width = W; canvas.height = H;
  canvas.style.width = '100%'; canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // 背景
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, W, H);

  // 标题
  ctx.fillStyle = f.color;
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('位图格式：放大后像素化', W / 2, 22);

  // 分隔线
  ctx.strokeStyle = '#2a2a3a';
  ctx.setLineDash([4, 3]);
  ctx.beginPath(); ctx.moveTo(210, 34); ctx.lineTo(210, 210); ctx.stroke();
  ctx.setLineDash([]);

  // ── 左侧：清晰原始视图 ──
  // 绘制一个简洁的散点图 + 折线
  const pts = [[30,75],[55,50],[80,68],[105,40],[130,55],[155,35]];
  const offX = 25, offY = 38, scaleX = 1.0, scaleY = 1.0;

  ctx.strokeStyle = '#3a3a4a'; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(25+offX, 38+offY); ctx.lineTo(25+offX, 155+offY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(25+offX, 155+offY); ctx.lineTo(175+offX, 155+offY); ctx.stroke();

  ctx.strokeStyle = f.color; ctx.lineWidth = 1.8;
  ctx.beginPath();
  pts.forEach(([x,y],i) => i===0 ? ctx.moveTo(x+offX,y+offY) : ctx.lineTo(x+offX,y+offY));
  ctx.stroke();
  pts.forEach(([x,y]) => {
    ctx.beginPath(); ctx.arc(x+offX, y+offY, 3, 0, Math.PI*2);
    ctx.fillStyle = f.color; ctx.fill();
  });

  ctx.fillStyle = '#555'; ctx.font = '10px "JetBrains Mono", monospace';
  ctx.textAlign = 'center'; ctx.fillText('100% 原始大小', 107, 215);

  // ── 右侧：4× 放大视图（像素块）──
  ctx.fillStyle = '#111520';
  roundRect(ctx, 222, 38, 174, 162, 4);
  ctx.fill();

  // 用大方块模拟放大后的像素化
  const blockSize = 14;
  // 放大区域只展示折线中间段的像素块（模拟 bilinear 插值后的锯齿）
  const pixelData = [
    // row, col, color
    [0,2,'#2a4a5a'],[0,3,f.color],[0,4,f.color],[0,5,'#1a3a4a'],
    [1,1,'#1a3a4a'],[1,2,f.color],[1,3,f.color],[1,4,f.color],[1,5,'#2a4a5a'],[1,6,'#0d1117'],
    [2,1,f.color],[2,2,f.color],[2,3,'#2a4a5a'],[2,4,'#1a3a4a'],
    [3,0,'#1a3a4a'],[3,1,f.color],[3,2,f.color],[3,3,'#0d1117'],
    [4,0,f.color],[4,1,'#2a4a5a'],
    [5,0,f.color],[5,1,f.color],
    [6,0,'#1a3a4a'],[6,1,f.color],[6,1,'#2a4a5a'],
  ];
  const bStartX = 228, bStartY = 55;
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const px = pixelData.find(([r,c]) => r===row && c===col);
      ctx.fillStyle = px ? px[2] : '#111520';
      ctx.fillRect(bStartX + col*blockSize, bStartY + row*blockSize, blockSize-1, blockSize-1);
    }
  }
  // 像素格子边框（增强锯齿感）
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 0.5;
  for (let i=0; i<=10; i++) {
    ctx.beginPath(); ctx.moveTo(bStartX+i*blockSize, bStartY); ctx.lineTo(bStartX+i*blockSize, bStartY+10*blockSize); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bStartX, bStartY+i*blockSize); ctx.lineTo(bStartX+10*blockSize, bStartY+i*blockSize); ctx.stroke();
  }

  // 放大倍数标签
  ctx.fillStyle = f.color;
  roundRect(ctx, 222, 38, 46, 18, 3); ctx.fill();
  ctx.fillStyle = '#000'; ctx.font = 'bold 10px "JetBrains Mono", monospace';
  ctx.textAlign = 'center'; ctx.fillText('×4 zoom', 245, 51);

  ctx.fillStyle = '#E07A7A'; ctx.font = '10px "JetBrains Mono", monospace';
  ctx.fillText('像素化 ✗', 309, 215);
}

// 辅助函数（如果文件中不存在则添加，如果存在则跳过）
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
  ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
  ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
  ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
  ctx.closePath();
}
```

**注意：** `roundRect` 是新辅助函数，加在文件末尾（destroy() 之后，或者 initJournalLookup() 之后）。先 grep 确认文件中没有同名函数。

### Step 3: 验证

检查 `renderVectorAnimation` 中的 D3 path 动画：`lPath.transition()` 需要 `stroke-dasharray` 和 `stroke-dashoffset` 动画，确保 D3 CDN 已加载（文件顶部 `import * as d3 from 'd3'` — 已有）。

### Step 4: commit

```bash
cd "E:/Claude-project/sci-aesthetic"
git add src/pages/m1/p10-workflow-export.js
git commit -m "feat(p10): redesign format illustrations with vector vs raster zoom comparison"
```

---

## 快速参考

### 关键 ID / 选择器
- `#p10-hero-stats` — hero stats 行
- `.p10-hero-stat-num[data-target]` — count-up 数字
- `#p10-wf-body` / `#p10-wf-left` — 工作流 sticky 容器
- `.p10-format-tabs` — 格式 tab 栏
- `.p10-fmt-svg-container` — 格式插图容器（现在 240px 高）
- `renderVectorAnimation` / `renderRasterAnimation` — 插图函数

### 文件位置
- 主文件: `src/pages/m1/p10-workflow-export.js`（单文件，所有 CSS/HTML/JS 在内）

### 已知约束
- GSAP: `window.gsap`（CDN），不可 import
- D3: `import * as d3 from 'd3'`（已有）
- CSS sticky 全局失效，用 JS transform 模拟（已处理）
- 不修改全局 CSS 文件
