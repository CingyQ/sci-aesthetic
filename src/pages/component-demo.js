// 组件 Demo 页 — Phase 2 核心组件可交互示例
// ScrollAnimations / CodeEditor / ChartPreview / InteractiveCanvas / CopyButton

import { fadeIn, countUp, scaleReveal, parallax, killAll } from '../components/ScrollAnimations.js';
import { createCodeEditor } from '../components/CodeEditor.js';
import { createChartPreview, d3 } from '../components/ChartPreview.js';
import { createInteractiveCanvas } from '../components/InteractiveCanvas.js';
import { createCopyButton } from '../components/CopyButton.js';

// 清理函数列表
let cleanups = [];

export function render() {
  return `
    <div class="page-scroll">

      <!-- ====== Hero ====== -->
      <section class="section-dark" style="align-items:center;">
        <h1 class="page-hero-title" style="color:var(--text-on-dark);">组件库</h1>
        <p class="page-hero-sub">Phase 2 核心组件交互演示</p>
      </section>

      <!-- ====== 1. ScrollAnimations ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ScrollAnimations</h2>
          <p class="subtitle" style="margin-bottom:var(--space-xl);">GSAP ScrollTrigger 封装 — 向下滚动查看动画效果</p>

          <div class="scroll-demo-items" style="display:flex;flex-direction:column;gap:var(--space-lg);">
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">fadeIn 渐入动画</h3>
              <p style="color:var(--text-on-light-2);">元素随滚动进入视口时 fade in + translateY。移动端 y 偏移减半，stagger 缩短。</p>
            </div>
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">自动适配断点</h3>
              <p style="color:var(--text-on-light-2);">使用 ScrollTrigger.matchMedia() 为桌面端和移动端分别设置动画参数。</p>
            </div>
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">killAll 清理</h3>
              <p style="color:var(--text-on-light-2);">页面 destroy() 时调用 killAll() 销毁所有 ScrollTrigger 实例，防止内存泄漏。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- countUp 演示 -->
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
            <div>
              <span class="stat-number count-target" data-target="50" style="color:var(--accent);">0</span>
              <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">配色方案</p>
            </div>
          </div>
        </div>
      </section>

      <!-- scaleReveal 演示 -->
      <section class="section-light section-auto">
        <div class="content-wrapper" style="text-align:center;">
          <h2 style="margin-bottom:var(--space-xl);">scaleReveal 缩放揭示</h2>
          <div class="scale-target" style="max-width:600px;margin:0 auto;padding:var(--space-xl);background:var(--accent-subtle);border-radius:var(--radius-lg);">
            <h3 style="color:var(--accent);margin-bottom:var(--space-sm);">交互组件入场效果</h3>
            <p style="color:var(--text-on-light-2);">从 0.9 缩放到 1.0，配合 opacity 渐入。移动端降级为纯 fadeIn。</p>
          </div>
        </div>
      </section>

      <!-- ====== 2. CodeEditor ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CodeEditor</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">CodeMirror 6 封装 — 可编辑的代码编辑器</p>

          <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-md);flex-wrap:wrap;">
            <button class="btn-ghost btn-small lang-switch active" data-lang="r">R</button>
            <button class="btn-ghost btn-small lang-switch" data-lang="python">Python</button>
          </div>

          <div id="code-editor-container" style="margin-bottom:var(--space-md);"></div>

          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">编辑代码后实时更新：</span>
            <span id="code-line-count" style="font-size:var(--text-small);color:var(--accent);">—</span>
            <div id="code-copy-btn"></div>
          </div>
        </div>
      </section>

      <!-- ====== 3. ChartPreview ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ChartPreview</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">D3 SVG 画布 — 深色背景 + 响应式 viewBox</p>

          <div id="chart-preview-container" style="max-width:600px;"></div>

          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-ghost btn-small" id="chart-scatter">散点图</button>
            <button class="btn-ghost btn-small" id="chart-bar">柱状图</button>
            <button class="btn-ghost btn-small" id="chart-line">折线图</button>
          </div>
        </div>
      </section>

      <!-- ====== 4. InteractiveCanvas ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">InteractiveCanvas</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">Canvas API — HiDPI + Pointer Events + 触摸绘图</p>

          <div id="canvas-container" style="max-width:600px;"></div>
          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;">
            <button class="btn-ghost btn-small" id="canvas-clear">清空画布</button>
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">用鼠标或手指在画布上绘画</span>
          </div>
        </div>
      </section>

      <!-- ====== 5. CopyButton ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CopyButton</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">一键复制到剪贴板 + 成功/失败反馈动画</p>

          <div style="padding:var(--space-lg);background:var(--bg-dark);border-radius:var(--radius-md);max-width:500px;">
            <pre style="margin-bottom:var(--space-md);"><code>library(ggplot2)
ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "#7EC8E3") +
  theme_minimal()</code></pre>
            <div id="copy-demo-container" style="display:flex;gap:var(--space-sm);"></div>
          </div>
        </div>
      </section>

      <!-- ====== Footer ====== -->
      <section class="section-dark" style="align-items:center;min-height:50vh;">
        <h2 style="text-align:center;margin-bottom:var(--space-md);">组件库就绪</h2>
        <p class="subtitle" style="text-align:center;margin-bottom:var(--space-lg);">5 个核心组件均可交互验证</p>
        <a href="#home" class="btn-primary">返回首页</a>
      </section>

    </div>
  `;
}

// ========== R / Python 示例代码 ==========

const CODE_SAMPLES = {
  r: `library(ggplot2)

# 科研散点图
ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3, alpha = 0.8) +
  scale_color_manual(values = c("#7EC8E3", "#95D5B2", "#F0B27A")) +
  labs(
    title = "汽车重量与油耗的关系",
    x = "重量 (1000 lbs)",
    y = "油耗 (mpg)",
    color = "气缸数"
  ) +
  theme_minimal(base_size = 14) +
  theme(
    plot.title = element_text(face = "bold"),
    legend.position = "bottom"
  )`,

  python: `import matplotlib.pyplot as plt
import numpy as np

# 科研散点图
np.random.seed(42)
x = np.random.randn(100)
y = 2.5 * x + np.random.randn(100) * 0.8

fig, ax = plt.subplots(figsize=(8, 6), dpi=300)
scatter = ax.scatter(x, y, c=y, cmap='coolwarm',
                     s=50, alpha=0.7, edgecolors='none')

ax.set_xlabel('Variable X', fontsize=12)
ax.set_ylabel('Variable Y', fontsize=12)
ax.set_title('相关性分析', fontsize=14, fontweight='bold')
plt.colorbar(scatter, label='Y value')
plt.tight_layout()
plt.savefig('scatter.pdf', dpi=300)`
};

export function init() {
  // ---- ScrollAnimations 演示 ----
  fadeIn('.fade-item', { stagger: 0.2, y: 60 });

  document.querySelectorAll('.count-target').forEach(el => {
    const target = parseInt(el.dataset.target);
    countUp(el, target);
  });

  scaleReveal('.scale-target');

  // ---- CodeEditor 演示 ----
  const editorContainer = document.getElementById('code-editor-container');
  const lineCountEl = document.getElementById('code-line-count');
  let currentLang = 'r';

  let editor = createCodeEditor(editorContainer, {
    code: CODE_SAMPLES.r,
    language: 'r',
    onChange: (code) => {
      const lines = code.split('\n').length;
      lineCountEl.textContent = `${lines} 行`;
    }
  });
  cleanups.push(() => editor.destroy());

  // 初始行数
  lineCountEl.textContent = `${CODE_SAMPLES.r.split('\n').length} 行`;

  // 语言切换按钮
  document.querySelectorAll('.lang-switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;

      // 更新按钮状态
      document.querySelectorAll('.lang-switch').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 重建编辑器
      editor.destroy();
      editor = createCodeEditor(editorContainer, {
        code: CODE_SAMPLES[lang],
        language: lang,
        onChange: (code) => {
          const lines = code.split('\n').length;
          lineCountEl.textContent = `${lines} 行`;
        }
      });

      lineCountEl.textContent = `${CODE_SAMPLES[lang].split('\n').length} 行`;
    });
  });

  // 代码复制按钮
  const codeCopyBtn = createCopyButton(document.getElementById('code-copy-btn'), {
    getText: () => editor.getCode(),
    label: '复制代码',
    successLabel: '已复制'
  });
  cleanups.push(() => codeCopyBtn.destroy());

  // ---- ChartPreview 演示 ----
  const chartContainer = document.getElementById('chart-preview-container');
  const chart = createChartPreview(chartContainer);
  cleanups.push(() => chart.destroy());

  // 生成示例数据
  const DATA_COLORS = ['#7EC8E3', '#95D5B2', '#B8B8E8', '#F0B27A', '#E07A7A'];

  function drawScatter() {
    const g = chart.clear();
    const n = 60;
    const data = Array.from({ length: n }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      r: 3 + Math.random() * 6,
      color: DATA_COLORS[Math.floor(Math.random() * DATA_COLORS.length)]
    }));

    const xScale = d3.scaleLinear().domain([0, 100]).range([0, chart.innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);

    // 坐标轴
    g.append('g')
      .attr('transform', `translate(0,${chart.innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '11px');
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '11px');

    // 样式化坐标轴线
    g.selectAll('.domain').attr('stroke', '#424245');
    g.selectAll('.tick line').attr('stroke', '#424245');

    // 数据点
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .attr('fill', d => d.color)
      .attr('opacity', 0.8)
      .transition()
      .duration(600)
      .delay((_, i) => i * 15)
      .attr('r', d => d.r);
  }

  function drawBar() {
    const g = chart.clear();
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const data = categories.map((c, i) => ({
      label: c,
      value: 20 + Math.random() * 80,
      color: DATA_COLORS[i % DATA_COLORS.length]
    }));

    const xScale = d3.scaleBand().domain(categories).range([0, chart.innerWidth]).padding(0.3);
    const yScale = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${chart.innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '12px');
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '11px');

    g.selectAll('.domain').attr('stroke', '#424245');
    g.selectAll('.tick line').attr('stroke', '#424245');

    g.selectAll('rect.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label))
      .attr('width', xScale.bandwidth())
      .attr('y', chart.innerHeight)
      .attr('height', 0)
      .attr('fill', d => d.color)
      .attr('rx', 4)
      .transition()
      .duration(600)
      .delay((_, i) => i * 80)
      .attr('y', d => yScale(d.value))
      .attr('height', d => chart.innerHeight - yScale(d.value));
  }

  function drawLine() {
    const g = chart.clear();
    const n = 20;
    const data = Array.from({ length: n }, (_, i) => ({
      x: i,
      y: 30 + Math.sin(i * 0.5) * 25 + Math.random() * 10
    }));

    const xScale = d3.scaleLinear().domain([0, n - 1]).range([0, chart.innerWidth]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([chart.innerHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${chart.innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '11px');
    g.append('g')
      .call(d3.axisLeft(yScale).ticks(5))
      .selectAll('text').attr('fill', '#a1a1a6').attr('font-size', '11px');

    g.selectAll('.domain').attr('stroke', '#424245');
    g.selectAll('.tick line').attr('stroke', '#424245');

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCatmullRom);

    const path = g.append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#7EC8E3')
      .attr('stroke-width', 2.5);

    // 线条绘制动画
    const totalLength = path.node().getTotalLength();
    path
      .attr('stroke-dasharray', totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1200)
      .ease(d3.easeQuadOut)
      .attr('stroke-dashoffset', 0);

    // 数据点
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 0)
      .attr('fill', '#7EC8E3')
      .transition()
      .delay(1000)
      .duration(400)
      .delay((_, i) => 800 + i * 30)
      .attr('r', 4);
  }

  // 默认绘制散点图
  drawScatter();

  document.getElementById('chart-scatter').addEventListener('click', drawScatter);
  document.getElementById('chart-bar').addEventListener('click', drawBar);
  document.getElementById('chart-line').addEventListener('click', drawLine);

  // ---- InteractiveCanvas 演示 ----
  const canvasContainer = document.getElementById('canvas-container');
  const ic = createInteractiveCanvas(canvasContainer, {
    width: 600,
    height: 400,
    responsive: true
  });
  cleanups.push(() => ic.destroy());

  // 初始化画布背景
  ic.clear('#1a1a2e');

  // 绘图逻辑
  let isDrawing = false;
  let lastPos = null;
  let hue = 0;

  ic.onPointerDown((e, pos) => {
    isDrawing = true;
    lastPos = pos;
  });

  ic.onPointerMove((e, pos) => {
    if (!isDrawing) return;
    hue = (hue + 1) % 360;
    ic.ctx.beginPath();
    ic.ctx.moveTo(lastPos.x, lastPos.y);
    ic.ctx.lineTo(pos.x, pos.y);
    ic.ctx.strokeStyle = `hsl(${hue}, 70%, 65%)`;
    ic.ctx.lineWidth = 3;
    ic.ctx.lineCap = 'round';
    ic.ctx.stroke();
    lastPos = pos;
  });

  ic.onPointerUp(() => {
    isDrawing = false;
    lastPos = null;
  });

  // resize 时重新绘制背景（简单处理：保持绘制内容丢失提示）
  ic.onResize(() => {
    ic.clear('#1a1a2e');
    // 绘制提示文字
    ic.ctx.fillStyle = '#6e6e73';
    ic.ctx.font = '14px Inter, sans-serif';
    ic.ctx.textAlign = 'center';
    const size = ic.getSize();
    ic.ctx.fillText('画布已调整大小，请重新绘制', size.width / 2, size.height / 2);
  });

  document.getElementById('canvas-clear').addEventListener('click', () => {
    ic.clear('#1a1a2e');
    hue = 0;
  });

  // ---- CopyButton 演示 ----
  const copyContainer = document.getElementById('copy-demo-container');
  const codeText = `library(ggplot2)\nggplot(mtcars, aes(x = wt, y = mpg)) +\n  geom_point(color = "#7EC8E3") +\n  theme_minimal()`;

  const copyBtn1 = createCopyButton(copyContainer, {
    getText: codeText,
    label: '复制代码',
    successLabel: '已复制'
  });
  cleanups.push(() => copyBtn1.destroy());

  const copyBtn2 = createCopyButton(copyContainer, {
    getText: '#7EC8E3',
    label: '复制色值',
    successLabel: '已复制'
  });
  cleanups.push(() => copyBtn2.destroy());
}

export function destroy() {
  cleanups.forEach(fn => fn());
  cleanups = [];
  killAll();
}
