// 组件 Demo 页 — Phase 2 全部组件可交互示例
// 13 个组件：ScrollAnimations / CodeEditor / ChartPreview / InteractiveCanvas / CopyButton
// + TabSwitcher / Modal / Accordion / BeforeAfter / Toast / StickySteps / ColorInput / WorkshopLayout

import { fadeIn, countUp, scaleReveal, killAll } from '../components/ScrollAnimations.js';
import { createCodeEditor } from '../components/CodeEditor.js';
import { createChartPreview, d3 } from '../components/ChartPreview.js';
import { createInteractiveCanvas } from '../components/InteractiveCanvas.js';
import { createCopyButton } from '../components/CopyButton.js';
import { createTabSwitcher } from '../components/TabSwitcher.js';
import { createModal } from '../components/Modal.js';
import { createAccordion } from '../components/Accordion.js';
import { createBeforeAfter } from '../components/BeforeAfter.js';
import { showToast } from '../components/Toast.js';
import { createStickySteps } from '../components/StickySteps.js';
import { createColorInput } from '../components/ColorInput.js';
import { createWorkshopLayout } from '../components/WorkshopLayout.js';

let cleanups = [];

export function render() {
  return `
    <div class="page-scroll">

      <!-- Hero -->
      <section class="section-dark" style="align-items:center;">
        <h1 class="page-hero-title" style="color:var(--text-on-dark);">组件库</h1>
        <p class="page-hero-sub">Phase 2 — 13 个核心组件交互演示</p>
      </section>

      <!-- 1. ScrollAnimations -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ScrollAnimations</h2>
          <p class="subtitle" style="margin-bottom:var(--space-xl);">GSAP ScrollTrigger — 向下滚动查看效果</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-lg);">
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">fadeIn 渐入</h3>
              <p style="color:var(--text-on-light-2);">fade in + translateY，移动端 y 偏移减半。</p>
            </div>
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">matchMedia 断点适配</h3>
              <p style="color:var(--text-on-light-2);">桌面端和移动端分别设置动画参数。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- countUp -->
      <section class="section-dark section-auto">
        <div class="content-wrapper" style="text-align:center;">
          <h2 style="margin-bottom:var(--space-xl);">countUp 数字递增</h2>
          <div style="display:flex;gap:var(--space-xl);justify-content:center;flex-wrap:wrap;">
            <div>
              <span class="stat-number count-target" data-target="31" style="color:var(--accent);">0</span>
              <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">教学章节</p>
            </div>
            <div>
              <span class="stat-number count-target" data-target="120" style="color:var(--accent);">0</span>
              <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">交互组件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- scaleReveal -->
      <section class="section-light section-auto">
        <div class="content-wrapper" style="text-align:center;">
          <h2 style="margin-bottom:var(--space-xl);">scaleReveal 缩放揭示</h2>
          <div class="scale-target" style="max-width:600px;margin:0 auto;padding:var(--space-xl);background:var(--accent-subtle);border-radius:var(--radius-lg);">
            <h3 style="color:var(--accent);margin-bottom:var(--space-sm);">交互组件入场</h3>
            <p style="color:var(--text-on-light-2);">0.9→1.0 缩放 + opacity 渐入</p>
          </div>
        </div>
      </section>

      <!-- 2. CodeEditor -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CodeEditor</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">CodeMirror 6 — R/Python 切换</p>
          <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-md);flex-wrap:wrap;">
            <button class="btn-ghost btn-small lang-switch active" data-lang="r">R</button>
            <button class="btn-ghost btn-small lang-switch" data-lang="python">Python</button>
          </div>
          <div id="code-editor-container" style="margin-bottom:var(--space-md);"></div>
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">行数：</span>
            <span id="code-line-count" style="font-size:var(--text-small);color:var(--accent);">—</span>
            <div id="code-copy-btn"></div>
          </div>
        </div>
      </section>

      <!-- 3. ChartPreview -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ChartPreview</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">D3 SVG — 深色画布 + 响应式</p>
          <div id="chart-preview-container" style="max-width:600px;"></div>
          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-ghost btn-small" id="chart-scatter">散点图</button>
            <button class="btn-ghost btn-small" id="chart-bar">柱状图</button>
            <button class="btn-ghost btn-small" id="chart-line">折线图</button>
          </div>
        </div>
      </section>

      <!-- 4. InteractiveCanvas -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">InteractiveCanvas</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">Canvas — HiDPI + Pointer Events 绘图</p>
          <div id="canvas-container" style="max-width:600px;"></div>
          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;">
            <button class="btn-ghost btn-small" id="canvas-clear">清空画布</button>
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">鼠标或手指绘画</span>
          </div>
        </div>
      </section>

      <!-- 5. CopyButton -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CopyButton</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">一键复制 + 反馈动画</p>
          <div style="padding:var(--space-lg);background:var(--bg-dark);border-radius:var(--radius-md);max-width:500px;">
            <pre style="margin-bottom:var(--space-md);"><code>ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "#7EC8E3")</code></pre>
            <div id="copy-demo-container" style="display:flex;gap:var(--space-sm);"></div>
          </div>
        </div>
      </section>

      <!-- 6. TabSwitcher -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">TabSwitcher</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">滑动指示器跟随切换</p>
          <div style="margin-bottom:var(--space-lg);">
            <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-bottom:var(--space-sm);">Default 样式</p>
            <div id="tab-switcher-default"></div>
          </div>
          <div>
            <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-bottom:var(--space-sm);">Pill 样式</p>
            <div id="tab-switcher-pill"></div>
          </div>
          <p id="tab-result" style="margin-top:var(--space-md);font-size:var(--text-small);color:var(--accent);">当前选中：scatter</p>
        </div>
      </section>

      <!-- 7. Modal -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Modal</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">ESC / 点击遮罩关闭，GSAP 入场</p>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-primary" id="open-modal-default">打开模态框</button>
            <button class="btn-ghost" id="open-modal-large">大尺寸模态框</button>
          </div>
        </div>
      </section>

      <!-- 8. Accordion -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Accordion</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">平滑展开/折叠，单开模式</p>
          <div id="accordion-container" style="max-width:600px;"></div>
        </div>
      </section>

      <!-- 9. BeforeAfter -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">BeforeAfter</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">拖拽/滑动对比 — Pointer Events</p>
          <div id="before-after-container" style="max-width:600px;"></div>
        </div>
      </section>

      <!-- 10. Toast -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Toast</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">底部弹出消息，自动消失</p>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-ghost btn-small" id="toast-info">信息</button>
            <button class="btn-ghost btn-small" id="toast-success">成功</button>
            <button class="btn-ghost btn-small" id="toast-error">错误</button>
            <button class="btn-ghost btn-small" id="toast-landscape">横屏提示</button>
          </div>
        </div>
      </section>

      <!-- 11. StickySteps -->
      <section class="section-dark" style="min-height:auto;padding:var(--space-xl) var(--space-lg);">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">StickySteps</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">粘性滚动步骤教学</p>
          <div id="sticky-steps-container"></div>
        </div>
      </section>

      <!-- 12. ColorInput -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ColorInput</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">HEX/RGB/HSL 三模式 + 色相滑块</p>
          <div style="display:flex;gap:var(--space-xl);flex-wrap:wrap;align-items:flex-start;">
            <div id="color-input-container"></div>
            <div id="color-preview" style="width:120px;height:120px;border-radius:var(--radius-md);background:#7EC8E3;transition:background 0.15s;border:2px solid var(--border-dark);"></div>
          </div>
        </div>
      </section>

      <!-- 13. WorkshopLayout -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">WorkshopLayout</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">三面板：桌面 Grid / 移动端手风琴</p>
          <div id="workshop-container"></div>
        </div>
      </section>

      <!-- Footer -->
      <section class="section-dark" style="align-items:center;min-height:50vh;">
        <h2 style="text-align:center;margin-bottom:var(--space-md);">组件库完整就绪</h2>
        <p class="subtitle" style="text-align:center;margin-bottom:var(--space-lg);">13 个核心组件均可交互验证</p>
        <a href="#home" class="btn-primary">返回首页</a>
      </section>

    </div>
  `;
}

// ========== 代码示例 ==========

const CODE_SAMPLES = {
  r: `library(ggplot2)

ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3, alpha = 0.8) +
  scale_color_manual(values = c("#7EC8E3", "#95D5B2", "#F0B27A")) +
  labs(title = "Weight vs MPG", x = "Weight", y = "MPG") +
  theme_minimal(base_size = 14)`,

  python: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.randn(100)
y = 2.5 * x + np.random.randn(100) * 0.8

fig, ax = plt.subplots(figsize=(8, 6), dpi=300)
ax.scatter(x, y, c='#7EC8E3', s=50, alpha=0.7)
ax.set_xlabel('Variable X')
ax.set_ylabel('Variable Y')
plt.tight_layout()`
};

export function init() {
  // ---- 1. ScrollAnimations ----
  fadeIn('.fade-item', { stagger: 0.2, y: 60 });
  document.querySelectorAll('.count-target').forEach(el => {
    countUp(el, parseInt(el.dataset.target));
  });
  scaleReveal('.scale-target');

  // ---- 2. CodeEditor ----
  const editorContainer = document.getElementById('code-editor-container');
  const lineCountEl = document.getElementById('code-line-count');
  let currentLang = 'r';

  let editor = createCodeEditor(editorContainer, {
    code: CODE_SAMPLES.r,
    language: 'r',
    onChange: (code) => {
      lineCountEl.textContent = code.split('\n').length + ' 行';
    }
  });
  cleanups.push(() => editor.destroy());
  lineCountEl.textContent = CODE_SAMPLES.r.split('\n').length + ' 行';

  document.querySelectorAll('.lang-switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      document.querySelectorAll('.lang-switch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      editor.destroy();
      editor = createCodeEditor(editorContainer, {
        code: CODE_SAMPLES[lang],
        language: lang,
        onChange: (code) => { lineCountEl.textContent = code.split('\n').length + ' 行'; }
      });
      lineCountEl.textContent = CODE_SAMPLES[lang].split('\n').length + ' 行';
    });
  });

  const codeCopyBtn = createCopyButton(document.getElementById('code-copy-btn'), {
    getText: () => editor.getCode(),
    label: '复制代码'
  });
  cleanups.push(() => codeCopyBtn.destroy());

  // ---- 3. ChartPreview ----
  const chart = createChartPreview(document.getElementById('chart-preview-container'));
  cleanups.push(() => chart.destroy());
  const COLORS = ['#7EC8E3', '#95D5B2', '#B8B8E8', '#F0B27A', '#E07A7A'];

  function drawScatter() {
    const g = chart.clear();
    const data = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100, y: Math.random() * 100,
      r: 3 + Math.random() * 5, color: COLORS[Math.floor(Math.random() * 5)]
    }));
    const xS = d3.scaleLinear().domain([0, 100]).range([0, chart.innerWidth]);
    const yS = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);
    g.append('g').attr('transform', `translate(0,${chart.innerHeight})`).call(d3.axisBottom(xS).ticks(5)).selectAll('text').attr('fill', '#a1a1a6');
    g.append('g').call(d3.axisLeft(yS).ticks(5)).selectAll('text').attr('fill', '#a1a1a6');
    g.selectAll('.domain,.tick line').attr('stroke', '#424245');
    g.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y)).attr('r', 0).attr('fill', d => d.color).attr('opacity', 0.8)
      .transition().duration(500).delay((_, i) => i * 12).attr('r', d => d.r);
  }

  function drawBar() {
    const g = chart.clear();
    const cats = ['A', 'B', 'C', 'D', 'E'];
    const data = cats.map((c, i) => ({ label: c, value: 20 + Math.random() * 80, color: COLORS[i] }));
    const xS = d3.scaleBand().domain(cats).range([0, chart.innerWidth]).padding(0.3);
    const yS = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);
    g.append('g').attr('transform', `translate(0,${chart.innerHeight})`).call(d3.axisBottom(xS)).selectAll('text').attr('fill', '#a1a1a6');
    g.append('g').call(d3.axisLeft(yS).ticks(5)).selectAll('text').attr('fill', '#a1a1a6');
    g.selectAll('.domain,.tick line').attr('stroke', '#424245');
    g.selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => xS(d.label)).attr('width', xS.bandwidth()).attr('y', chart.innerHeight).attr('height', 0)
      .attr('fill', d => d.color).attr('rx', 4)
      .transition().duration(500).delay((_, i) => i * 80)
      .attr('y', d => yS(d.value)).attr('height', d => chart.innerHeight - yS(d.value));
  }

  function drawLine() {
    const g = chart.clear();
    const data = Array.from({ length: 20 }, (_, i) => ({ x: i, y: 30 + Math.sin(i * 0.5) * 25 + Math.random() * 10 }));
    const xS = d3.scaleLinear().domain([0, 19]).range([0, chart.innerWidth]);
    const yS = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);
    g.append('g').attr('transform', `translate(0,${chart.innerHeight})`).call(d3.axisBottom(xS).ticks(5)).selectAll('text').attr('fill', '#a1a1a6');
    g.append('g').call(d3.axisLeft(yS).ticks(5)).selectAll('text').attr('fill', '#a1a1a6');
    g.selectAll('.domain,.tick line').attr('stroke', '#424245');
    const line = d3.line().x(d => xS(d.x)).y(d => yS(d.y)).curve(d3.curveCatmullRom);
    const path = g.append('path').datum(data).attr('d', line).attr('fill', 'none').attr('stroke', '#7EC8E3').attr('stroke-width', 2.5);
    const len = path.node().getTotalLength();
    path.attr('stroke-dasharray', len).attr('stroke-dashoffset', len).transition().duration(1000).ease(d3.easeQuadOut).attr('stroke-dashoffset', 0);
    g.selectAll('circle').data(data).enter().append('circle').attr('cx', d => xS(d.x)).attr('cy', d => yS(d.y)).attr('r', 0).attr('fill', '#7EC8E3')
      .transition().delay((_, i) => 800 + i * 25).duration(300).attr('r', 3.5);
  }

  drawScatter();
  document.getElementById('chart-scatter').addEventListener('click', drawScatter);
  document.getElementById('chart-bar').addEventListener('click', drawBar);
  document.getElementById('chart-line').addEventListener('click', drawLine);

  // ---- 4. InteractiveCanvas ----
  const ic = createInteractiveCanvas(document.getElementById('canvas-container'), { width: 600, height: 350, responsive: true });
  cleanups.push(() => ic.destroy());
  ic.clear('#1a1a2e');
  let isDrawing = false, lastPos = null, hue = 0;
  ic.onPointerDown((_, pos) => { isDrawing = true; lastPos = pos; });
  ic.onPointerMove((_, pos) => {
    if (!isDrawing) return;
    hue = (hue + 1) % 360;
    ic.ctx.beginPath(); ic.ctx.moveTo(lastPos.x, lastPos.y); ic.ctx.lineTo(pos.x, pos.y);
    ic.ctx.strokeStyle = `hsl(${hue}, 70%, 65%)`; ic.ctx.lineWidth = 3; ic.ctx.lineCap = 'round'; ic.ctx.stroke();
    lastPos = pos;
  });
  ic.onPointerUp(() => { isDrawing = false; lastPos = null; });
  ic.onResize(() => { ic.clear('#1a1a2e'); });
  document.getElementById('canvas-clear').addEventListener('click', () => { ic.clear('#1a1a2e'); hue = 0; });

  // ---- 5. CopyButton ----
  const copyBtn1 = createCopyButton(document.getElementById('copy-demo-container'), { getText: 'ggplot(mtcars, aes(x = wt, y = mpg)) +\n  geom_point(color = "#7EC8E3")', label: '复制代码' });
  const copyBtn2 = createCopyButton(document.getElementById('copy-demo-container'), { getText: '#7EC8E3', label: '复制色值' });
  cleanups.push(() => copyBtn1.destroy(), () => copyBtn2.destroy());

  // ---- 6. TabSwitcher ----
  const tabResult = document.getElementById('tab-result');
  const ts1 = createTabSwitcher(document.getElementById('tab-switcher-default'), {
    tabs: [
      { id: 'scatter', label: '散点图' },
      { id: 'bar', label: '柱状图' },
      { id: 'line', label: '折线图' },
      { id: 'boxplot', label: '箱线图' }
    ],
    activeId: 'scatter',
    onChange: (id) => { tabResult.textContent = '当前选中：' + id; }
  });
  cleanups.push(() => ts1.destroy());

  const ts2 = createTabSwitcher(document.getElementById('tab-switcher-pill'), {
    tabs: [
      { id: 'r', label: 'R' },
      { id: 'python', label: 'Python' },
      { id: 'julia', label: 'Julia' }
    ],
    activeId: 'r',
    variant: 'pill'
  });
  cleanups.push(() => ts2.destroy());

  // ---- 7. Modal ----
  document.getElementById('open-modal-default').addEventListener('click', () => {
    createModal({
      title: '图表导出设置',
      content: `
        <p style="margin-bottom:var(--space-md);">选择导出参数以获得最佳的出版品质。</p>
        <div style="margin-bottom:var(--space-sm);">
          <label style="font-size:var(--text-small);color:var(--text-on-dark-3);display:block;margin-bottom:4px;">格式</label>
          <select class="select" style="max-width:200px;">
            <option>PDF（矢量）</option><option>SVG（矢量）</option><option>PNG（位图）</option><option>TIFF（位图）</option>
          </select>
        </div>
        <div>
          <label style="font-size:var(--text-small);color:var(--text-on-dark-3);display:block;margin-bottom:4px;">DPI</label>
          <input class="input" type="number" value="300" style="max-width:120px;" inputmode="numeric" />
        </div>
      `
    });
  });

  document.getElementById('open-modal-large').addEventListener('click', () => {
    createModal({
      title: '配色方案浏览器',
      size: 'large',
      content: `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-md);">
          ${['Nature', 'Science', 'Cell', 'Lancet', 'JAMA', 'PNAS'].map(name =>
            `<div style="padding:var(--space-md);background:var(--bg-dark);border-radius:var(--radius-sm);border:1px solid var(--border-dark);">
              <p style="font-weight:500;margin-bottom:var(--space-xs);">${name}</p>
              <div style="display:flex;gap:4px;">${COLORS.slice(0, 4).map(c => `<div style="width:24px;height:24px;border-radius:4px;background:${c};"></div>`).join('')}</div>
            </div>`
          ).join('')}
        </div>
      `
    });
  });

  // ---- 8. Accordion ----
  const accordion = createAccordion(document.getElementById('accordion-container'), {
    items: [
      { id: 'step1', title: '1. 选择图表类型', content: '<p>根据数据特征和要传达的信息，选择合适的图表类型。散点图适合展示两个连续变量的关系，柱状图适合分类比较。</p>' },
      { id: 'step2', title: '2. 配色优化', content: '<p>使用感知均匀的配色方案（如 viridis），避免 rainbow 配色。确保色盲友好，考虑打印时的灰度效果。</p>' },
      { id: 'step3', title: '3. 标注与排版', content: '<p>添加清晰的坐标轴标签、图例和标题。使用合适的字号（≥8pt），确保在缩小后仍可读。</p>' },
      { id: 'step4', title: '4. 导出设置', content: '<p>矢量格式（PDF/SVG）用于期刊投稿，位图格式（PNG/TIFF）需 300+ DPI。注意文件大小限制。</p>' }
    ],
    defaultOpen: 'step1'
  });
  cleanups.push(() => accordion.destroy());

  // ---- 9. BeforeAfter ----
  const ba = createBeforeAfter(document.getElementById('before-after-container'), {
    beforeContent: `<div style="width:100%;height:300px;background:linear-gradient(135deg,#2d2d2f,#1d1d1f);display:flex;align-items:center;justify-content:center;padding:var(--space-lg);">
      <div style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:var(--space-sm);">
          <div style="width:40px;height:80px;background:#ff0000;border-radius:4px;"></div>
          <div style="width:40px;height:120px;background:#00ff00;border-radius:4px;"></div>
          <div style="width:40px;height:60px;background:#0000ff;border-radius:4px;"></div>
          <div style="width:40px;height:100px;background:#ffff00;border-radius:4px;"></div>
        </div>
        <p style="color:var(--text-on-dark-3);font-size:var(--text-small);">默认配色</p>
      </div>
    </div>`,
    afterContent: `<div style="width:100%;height:300px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;padding:var(--space-lg);">
      <div style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:var(--space-sm);">
          <div style="width:40px;height:80px;background:#7EC8E3;border-radius:4px;"></div>
          <div style="width:40px;height:120px;background:#95D5B2;border-radius:4px;"></div>
          <div style="width:40px;height:60px;background:#B8B8E8;border-radius:4px;"></div>
          <div style="width:40px;height:100px;background:#F0B27A;border-radius:4px;"></div>
        </div>
        <p style="color:var(--text-on-dark-2);font-size:var(--text-small);">优化配色</p>
      </div>
    </div>`,
    beforeLabel: '优化前',
    afterLabel: '优化后'
  });
  cleanups.push(() => ba.destroy());

  // ---- 10. Toast ----
  document.getElementById('toast-info').addEventListener('click', () => showToast('图表已保存到本地', { type: 'info' }));
  document.getElementById('toast-success').addEventListener('click', () => showToast('配色方案已复制到剪贴板', { type: 'success' }));
  document.getElementById('toast-error').addEventListener('click', () => showToast('导出失败：DPI 超出限制', { type: 'error' }));
  document.getElementById('toast-landscape').addEventListener('click', () => showToast('横屏体验更佳', { type: 'landscape' }));

  // ---- 11. StickySteps ----
  const stickySteps = createStickySteps(document.getElementById('sticky-steps-container'), {
    heading: '图表美化流程',
    subheading: '5 步将默认图表升级到出版级',
    steps: [
      { title: '默认输出', description: '使用 ggplot2 默认主题输出图表', content: '<code>ggplot(data, aes(x, y)) + geom_point()</code>' },
      { title: '配色优化', description: '替换为感知均匀配色方案', content: '<code>+ scale_color_viridis_d()</code>' },
      { title: '字体调整', description: '设置合适的字号和字体', content: '<code>+ theme(text = element_text(size = 12))</code>' },
      { title: '布局重构', description: '调整图例位置和边距', content: '<code>+ theme(legend.position = "bottom")</code>' },
      { title: '细节打磨', description: '添加标注、调整坐标轴', content: '<code>+ labs(title = "...", caption = "Source: ...")</code>' }
    ]
  });
  cleanups.push(() => stickySteps.destroy());

  // ---- 12. ColorInput ----
  const colorPreview = document.getElementById('color-preview');
  const colorInput = createColorInput(document.getElementById('color-input-container'), {
    value: '#7EC8E3',
    label: '强调色',
    onChange: (hex) => { colorPreview.style.background = hex; }
  });
  cleanups.push(() => colorInput.destroy());

  // ---- 13. WorkshopLayout ----
  const workshop = createWorkshopLayout(document.getElementById('workshop-container'), {
    panels: [
      {
        id: 'params', title: '参数面板', icon: '⚙',
        content: `<div style="font-size:var(--text-small);color:var(--text-on-dark-2);">
          <p style="margin-bottom:var(--space-sm);font-weight:500;color:var(--text-on-dark);">散点图参数</p>
          <label style="display:block;margin-bottom:var(--space-xs);color:var(--text-on-dark-3);">点大小</label>
          <input class="range" type="range" min="1" max="10" value="3" style="margin-bottom:var(--space-sm);" />
          <label style="display:block;margin-bottom:var(--space-xs);color:var(--text-on-dark-3);">透明度</label>
          <input class="range" type="range" min="0" max="100" value="80" />
        </div>`
      },
      {
        id: 'preview', title: '图表预览', icon: '📊',
        content: `<div style="background:#1a1a2e;border-radius:var(--radius-sm);height:250px;display:flex;align-items:center;justify-content:center;color:var(--text-on-dark-3);font-size:var(--text-small);">
          SVG 图表预览区域
        </div>`
      },
      {
        id: 'code', title: 'R 代码', icon: '💻',
        content: `<pre style="margin:0;font-size:13px;"><code>ggplot(mtcars, aes(wt, mpg)) +
  geom_point(
    size = 3,
    alpha = 0.8,
    color = "#7EC8E3"
  ) +
  theme_minimal()</code></pre>`
      }
    ],
    defaultPanel: 'preview'
  });
  cleanups.push(() => workshop.destroy());
}

export function destroy() {
  cleanups.forEach(fn => fn());
  cleanups = [];
  killAll();
}
