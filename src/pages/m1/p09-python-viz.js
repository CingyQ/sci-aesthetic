// p09-python-viz.js — Python 可视化与数据叙事
// matplotlib 层次结构 + seaborn 速查 + 语法对照 + 标注演示 + 数据叙事

import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ══════════════════════════════════════════════════════
//  matplotlib 层次结构数据
// ══════════════════════════════════════════════════════

const MPL_HIERARCHY = {
  id: 'Figure', label: 'Figure', color: '#7EC8E3',
  desc: '整个图形的顶层容器，对应一张图片文件。',
  api: 'plt.figure(figsize=(8,6), dpi=150)',
  children: [
    { id: 'Axes', label: 'Axes', color: '#95D5B2',
      desc: '单个坐标系，包含所有绘图元素。一个 Figure 可有多个 Axes。',
      api: 'fig.add_subplot(1,1,1)  # 或 plt.subplots()',
      children: [
        { id: 'Title', label: 'Title', color: '#B8B8E8', desc: '图表标题文本对象。', api: 'ax.set_title("标题", fontsize=14)', children: [] },
        { id: 'XAxis', label: 'XAxis', color: '#B8B8E8', desc: 'X 轴（含刻度、标签、刻度线）。', api: 'ax.set_xlabel("X轴")\nax.xaxis.set_tick_params()', children: [] },
        { id: 'YAxis', label: 'YAxis', color: '#B8B8E8', desc: 'Y 轴（含刻度、标签、刻度线）。', api: 'ax.set_ylabel("Y轴")\nax.yaxis.set_tick_params()', children: [] },
        { id: 'Line2D', label: 'Line2D', color: '#F0B27A', desc: '折线/散点等绘图元素（Artist）。', api: 'line, = ax.plot(x, y, color="#7EC8E3", lw=2)', children: [] },
        { id: 'Legend', label: 'Legend', color: '#F0B27A', desc: '图例容器，管理标签和句柄。', api: 'ax.legend(loc="upper right", framealpha=0.8)', children: [] },
        { id: 'Annotation', label: 'Annotation', color: '#F0D264', desc: '任意文字标注，支持箭头。', api: 'ax.annotate("峰值", xy=(x,y), xytext=(x+1,y+2),\n  arrowprops=dict(arrowstyle="->"))', children: [] },
      ]
    }
  ]
};

// ══════════════════════════════════════════════════════
//  状态
// ══════════════════════════════════════════════════════

let state = {
  cleanupFns: [],
  resizeObservers: [],
};

// ══════════════════════════════════════════════════════
//  initMatplotlibHierarchy()
// ══════════════════════════════════════════════════════

function initMatplotlibHierarchy(container) {
  const svgWrap = container.querySelector('.mpl-hierarchy-svg');
  const infoPanel = container.querySelector('.mpl-info-panel');
  if (!svgWrap) return;

  const W = svgWrap.clientWidth || 420;
  const H = 380;

  const svg = d3.select(svgWrap).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto');

  const root = d3.hierarchy(MPL_HIERARCHY);
  const treeLayout = d3.tree().size([W - 80, H - 80]);
  treeLayout(root);

  // Draw links
  svg.selectAll('.mpl-link').data(root.links()).join('path')
    .attr('class', 'mpl-link')
    .attr('d', d3.linkVertical().x(d => d.x + 40).y(d => d.y + 40))
    .attr('fill', 'none')
    .attr('stroke', '#424245')
    .attr('stroke-width', 1.5);

  // Draw nodes
  const node = svg.selectAll('.mpl-node').data(root.descendants()).join('g')
    .attr('class', 'mpl-node')
    .attr('transform', d => `translate(${d.x + 40},${d.y + 40})`)
    .style('cursor', 'pointer');

  node.append('circle')
    .attr('r', 22)
    .attr('fill', d => d.data.color || '#7EC8E3')
    .attr('stroke', '#1d1d1f')
    .attr('stroke-width', 2)
    .attr('opacity', 0.9);

  node.append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('fill', '#1d1d1f')
    .attr('font-size', 9)
    .attr('font-weight', 700)
    .attr('font-family', 'JetBrains Mono, monospace')
    .text(d => d.data.label.length > 8 ? d.data.label.slice(0,7)+'…' : d.data.label);

  // Click handler
  node.on('click', (event, d) => {
    // Reset all highlights
    node.selectAll('circle').attr('stroke', '#1d1d1f').attr('stroke-width', 2);
    // Highlight clicked
    d3.select(event.currentTarget).select('circle')
      .attr('stroke', d.data.color || '#7EC8E3')
      .attr('stroke-width', 3.5);

    if (infoPanel) {
      infoPanel.innerHTML = `
        <div style="margin-bottom:8px">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${d.data.color};margin-right:8px;vertical-align:middle"></span>
          <strong style="color:${d.data.color};font-size:16px;font-family:var(--font-code)">${d.data.label}</strong>
        </div>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.6;margin:0 0 12px">${d.data.desc}</p>
        <pre style="background:#1d1d1f;color:#f5f5f7;padding:12px 14px;border-radius:8px;font-size:12px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5">${d.data.api}</pre>`;
    }
  });

  // Auto-click Figure node on init to show initial info
  node.filter(d => d.data.id === 'Figure').dispatch('click');
}

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════

export function render() {
  return `
<div class="page-scroll" id="p9-root">
<style>
/* ── Hero ── */
.p9-hero {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  overflow: hidden;
}
.p9-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 75% 25%, rgba(126,200,227,0.22) 0%, transparent 65%),
              radial-gradient(ellipse 40% 35% at 20% 70%, rgba(149,213,178,0.10) 0%, transparent 65%);
  animation: p9GlowA 14s ease-in-out infinite alternate;
  pointer-events: none;
}
.p9-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 40% at 55% 80%, rgba(126,200,227,0.08) 0%, transparent 60%);
  animation: p9GlowB 11s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}
@keyframes p9GlowA { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(-50px) translateY(30px); } }
@keyframes p9GlowB { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(40px) translateY(-40px); } }

/* ── Quicknav ── */
.hero-quicknav { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-top:32px; }
.hero-quicknav__item { padding:8px 18px; min-height:44px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:99px; color:var(--text-on-dark); cursor:pointer; font-size:14px; font-family:var(--font-body); transition:background 0.2s; white-space:nowrap; }
.hero-quicknav__item:hover { background:rgba(255,255,255,0.15); }
.scroll-hint { color:var(--text-on-dark-3); font-size:13px; margin-top:24px; }
.page-hero-tagline { color:var(--text-on-dark-2); font-family:var(--font-body); font-size:var(--text-body); line-height:1.7; margin-top:12px; }
.page-hero-title { font:700 var(--text-display) var(--font-display); color:var(--text-on-dark); letter-spacing:-0.02em; line-height:1.1; margin:0; }
.page-hero-sub { font-size:var(--text-body); color:var(--text-on-dark-2); margin-top:8px; font-weight:300; }

/* ── Mobile responsive ── */
@media (max-width: 900px) {
  .sb-gallery-layout { flex-direction: column !important; }
  .sb-list { width: 100% !important; max-height: 200px !important; border-right: none !important; border-bottom: 1px solid var(--border-dark); padding-right: 0 !important; padding-bottom: 12px; overflow-x: auto; display: flex !important; gap: 8px; scrollbar-width: none; }
  .sb-list::-webkit-scrollbar { display: none; }
  .sb-right { width: 100% !important; }
}
@media (max-width: 768px) {
  .p9-hero { padding: var(--space-md) var(--space-sm) !important; }
  .hero-quicknav { gap: 8px; }
  .page-hero-title { font-size: clamp(2rem,7vw,3rem) !important; }
  #mpl-hierarchy-container { flex-direction: column !important; }
  .mpl-info-panel { width: 100% !important; }
  #s4-annotate-canvas > div > div:last-child { width: 100% !important; }
}
@media (max-width: 400px) {
  .hero-quicknav { flex-direction: column; align-items: center; }
}
</style>

<!-- ══════════════════ HERO ══════════════════ -->
<section class="section-dark section-hero-full p9-hero">
  <p class="hero-eyebrow">Module 01 / Page 09</p>
  <h1 class="page-hero-title">Python 可视化与数据叙事</h1>
  <p class="page-hero-sub">Python Visualization &amp; Data Storytelling</p>
  <p class="page-hero-tagline" style="max-width:520px">用 matplotlib 与 seaborn 制作出版级图表，让数据开口说话。</p>
  <nav class="hero-quicknav" id="p09-quicknav">
    <button class="hero-quicknav__item" data-target="#s1-matplotlib-hierarchy">matplotlib 层次</button>
    <button class="hero-quicknav__item" data-target="#s2-seaborn-gallery">seaborn 速查</button>
    <button class="hero-quicknav__item" data-target="#s3-mpl-vs-ggplot">语法对照</button>
    <button class="hero-quicknav__item" data-target="#s4-annotate-canvas">标注演示</button>
    <button class="hero-quicknav__item" data-target="#s5-storytelling">数据叙事</button>
  </nav>
  <p class="scroll-hint">↓ 向下探索</p>
</section>

<!-- ══════════════════ SECTION 01: matplotlib 层次结构 ══════════════════ -->
<section class="section-light" id="s1-matplotlib-hierarchy" style="padding: var(--space-3xl) var(--space-lg); min-height: 60vh; display: flex; flex-direction: column; justify-content: center;">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 01</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">matplotlib 层次结构</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8">理解 Figure / Axes / Artist 的层次关系，是掌握 matplotlib 的关键。点击节点查看详细说明。</p>
    <div id="mpl-hierarchy-container" style="margin-top:32px;display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
      <div class="mpl-hierarchy-svg" style="flex:1;min-width:280px;min-width:0;"></div>
      <div class="mpl-info-panel" style="width:280px;flex-shrink:0;min-height:160px;padding:20px;background:var(--bg-light-alt);border-radius:12px;border:1px solid var(--border-light);box-sizing:border-box;">
        <p style="color:var(--text-on-light-3);margin:0">← 点击节点查看详情</p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 02: seaborn 速查手册 ══════════════════ -->
<section class="section-dark" id="s2-seaborn-gallery" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 02</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-dark);margin-bottom:16px">seaborn 速查手册</h2>
    <p style="color:var(--text-on-dark-2);max-width:600px;line-height:1.8;margin-bottom:32px">10 种常用图表，选择图表类型，调整参数，实时预览效果与 Python 代码。</p>
    <div class="sb-gallery-layout" style="display:flex;gap:24px;align-items:flex-start;">
      <div class="sb-list" style="width:220px;flex-shrink:0;max-height:500px;overflow-y:auto;scrollbar-width:thin;border-right:1px solid var(--border-dark);padding-right:12px;min-width:0;"></div>
      <div class="sb-right" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:20px;">
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <div class="sb-params" style="width:240px;flex-shrink:0;min-width:0;"></div>
          <div class="sb-preview" style="flex:1;min-width:200px;min-width:0;"></div>
        </div>
        <div class="sb-code" style="border-radius:12px;overflow:hidden;min-height:200px;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 03: matplotlib vs ggplot2 ══════════════════ -->
<section class="section-light" id="s3-mpl-vs-ggplot" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 03</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">matplotlib vs ggplot2</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8;margin-bottom:32px">R 用户迁移到 Python 的语法对照手册——相同图表，两种实现。</p>
    <div class="compare-tabs" style="display:none;gap:8px;margin-bottom:16px;">
      <button class="compare-tab active" data-lang="python" style="padding:8px 20px;min-height:44px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;">Python</button>
      <button class="compare-tab" data-lang="r" style="padding:8px 20px;min-height:44px;background:var(--bg-light-alt);color:var(--text-on-light);border:1px solid var(--border-light);border-radius:8px;cursor:pointer;font-size:14px;">R / ggplot2</button>
    </div>
    <div id="compare-rows"></div>
  </div>
</section>

<!-- ══════════════════ SECTION 04: annotate 交互演示 ══════════════════ -->
<section class="section-dark" id="s4-annotate-canvas" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 04</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-dark);margin-bottom:16px">annotate 交互演示</h2>
    <p style="color:var(--text-on-dark-2);max-width:600px;line-height:1.8;margin-bottom:32px">在图表上拖放标注元素，实时生成对应的 plt.annotate() Python 代码。</p>
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
      <div style="flex:1;min-width:280px;min-width:0;">
        <div class="annotate-toolbar" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;"></div>
        <canvas id="annotate-canvas" style="width:100%;border-radius:12px;touch-action:none;cursor:crosshair;display:block;"></canvas>
      </div>
      <div style="width:280px;flex-shrink:0;min-width:0;">
        <h4 style="color:var(--text-on-dark);margin:0 0 12px;font-size:15px;">生成代码</h4>
        <div class="ann-code-editor" style="border-radius:10px;overflow:hidden;min-height:180px;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 05: 图表叙事四种方法 ══════════════════ -->
<section class="section-light" id="s5-storytelling" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 05</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">图表叙事四种方法</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8;margin-bottom:40px">好的图表不只展示数据，更要主动引导读者注意力——以下四种方法是数据叙事的核心工具。</p>
    <div id="story-color-contrast" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-annotation-flow" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-grey-out" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-reveal" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-compare" style="margin-top:40px;"></div>
  </div>
</section>

<!-- ══════════════════ FOOTER CTA ══════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">09 / 10</p>
  <h2 class="page-footer-quote">"好图表不是装饰，而是论点本身的延伸。"</h2>
  <p class="page-footer-desc">下一页：科研绘图工作流与导出 — 从数据到出版级图表的完整流程</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p9-prev-btn">← 上一页</button>
    <button class="btn-primary" id="p9-next-btn">下一页 →</button>
  </div>
</section>

</div>
`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════

export function init() {
  state.cleanupFns = [];
  state.resizeObservers = [];

  // Hero GSAP入场
  const tl = gsap.timeline();
  tl.fromTo('#p9-root .hero-eyebrow', {opacity:0,y:20},{opacity:1,y:0,duration:0.5}, 0.1)
    .fromTo('#p9-root .page-hero-title', {opacity:0,y:30},{opacity:1,y:0,duration:0.6}, 0.25)
    .fromTo('#p9-root .page-hero-sub', {opacity:0,y:20},{opacity:1,y:0,duration:0.5}, 0.4)
    .fromTo('#p9-root .page-hero-tagline', {opacity:0,y:20},{opacity:1,y:0,duration:0.5}, 0.55)
    .fromTo('#p9-root .hero-quicknav', {opacity:0,y:15},{opacity:1,y:0,duration:0.5}, 0.7)
    .fromTo('#p9-root .scroll-hint', {opacity:0},{opacity:1,duration:0.4}, 0.9);

  // quicknav 平滑滚动
  document.querySelectorAll('#p09-quicknav .hero-quicknav__item').forEach(btn => {
    const fn = () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    };
    btn.addEventListener('click', fn);
    state.cleanupFns.push(() => btn.removeEventListener('click', fn));
  });

  // footer buttons
  const prevBtn = document.getElementById('p9-prev-btn');
  const nextBtn = document.getElementById('p9-next-btn');
  if (prevBtn) {
    const fn = () => navigateTo('m1-p8');
    prevBtn.addEventListener('click', fn);
    state.cleanupFns.push(() => prevBtn.removeEventListener('click', fn));
  }
  if (nextBtn) {
    const fn = () => navigateTo('m1-p10');
    nextBtn.addEventListener('click', fn);
    state.cleanupFns.push(() => nextBtn.removeEventListener('click', fn));
  }

  // Section init stubs (to be filled by later tasks)
  initMatplotlibHierarchy(document.getElementById('s1-matplotlib-hierarchy'));
  // initSeabornGallery(...)
  // initCompareTable(...)
  // initAnnotateCanvas(...)
  // initStorytelling(...)
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════

export function destroy() {
  killAll(); // kills all ScrollTriggers
  state.cleanupFns.forEach(fn => { try { fn(); } catch {} });
  state.cleanupFns = [];
  const mplSvg = document.querySelector('#s1-matplotlib-hierarchy .mpl-hierarchy-svg svg');
  if (mplSvg) mplSvg.remove();
  state.resizeObservers.forEach(ro => ro.disconnect());
  state.resizeObservers = [];
}
