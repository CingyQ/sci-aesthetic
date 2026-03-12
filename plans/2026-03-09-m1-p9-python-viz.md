# m1-p9 Python 可视化与数据叙事 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 实现 p09-python-viz.js 页面，包含 matplotlib 层次图解、seaborn 速查、对照表、annotate Canvas、叙事4种方法共5个核心交互。

**Architecture:** 单文件 ES Module，export render()/init()/destroy()。D3 绘制交互图表，CodeMirror 显示 Python 代码，Canvas API 实现 annotate 拖拽演示，GSAP ScrollTrigger 驱动滚动动画。

**Tech Stack:** D3.js, CodeMirror 6 (python lang), GSAP + ScrollTrigger, Canvas Pointer Events, vanilla JS ES Modules

---

### Task 1: Hero section + 页面骨架

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** 写 render() 返回完整 HTML 骨架（Hero + 5个section占位 + Footer CTA）

```js
// Hero 结构（深色）:
// section.section-dark.section-hero-full
//   p.hero-eyebrow "Module 01 / Page 09"
//   h1.page-hero-title "Python 可视化与数据叙事"
//   p.page-hero-sub "Python Visualization & Data Storytelling"
//   p.page-hero-tagline (max-width:520px)
//   nav.hero-quicknav#p09-quicknav (5个按钮)
//   p.scroll-hint "↓ 向下探索"

// Hero 光晕（右上角青绿色，与p08紫色区分）:
// ::before 用 CSS keyframe 漂移，径向渐变 #7EC8E3 → transparent

// 5 sections:
// #s1-matplotlib-hierarchy  section-light
// #s2-seaborn-gallery        section-dark
// #s3-mpl-vs-ggplot          section-light
// #s4-annotate-canvas        section-dark
// #s5-storytelling           section-light

// Footer CTA（深黑色）:
// p.page-footer-num "09 / 10"
// h2.page-footer-quote "\"好图表不是装饰，而是论点本身的延伸。\""
// p.page-footer-desc "下一页：科研绘图工作流与导出 — 从数据到出版级图表的完整流程"
// div.page-footer-nav: btn-ghost(上一页) + btn-primary(下一页)
```

**Step 2:** 写 init() 骨架（GSAP Hero 入场 + quicknav 平滑滚动 + 按钮路由）

```js
export function init() {
  // Hero GSAP 入场
  gsap.fromTo('.hero-eyebrow', {opacity:0,y:20},{opacity:1,y:0,duration:0.6,delay:0.1});
  // eyebrow→title→sub→tagline→quicknav 依次 delay 递增0.15s

  // quicknav 平滑滚动
  document.querySelectorAll('.hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.querySelector(btn.dataset.target);
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // footer 按钮路由
  document.getElementById('p09-prev-btn')?.addEventListener('click', () => navigateTo('m1-p8'));
  document.getElementById('p09-next-btn')?.addEventListener('click', () => navigateTo('m1-p10'));
}
```

**Step 3:** 写 destroy() 骨架

```js
export function destroy() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  // 各组件 destroy 在后续 task 中填充
}
```

**Step 4:** 验证 — `npm run dev`，访问 #m1-p9，Hero 可见，QuickNav 按钮平滑跳转

**Step 5:** `git commit -m "feat(m1-p9): Hero section + page skeleton"`

---

### Task 2: Section 1 — matplotlib 层次结构 D3 图解

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** 定义节点数据

```js
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
        { id: 'Text', label: 'Text / Annotation', color: '#F0D264', desc: '任意文字标注，支持箭头。', api: 'ax.annotate("峰值", xy=(x,y), xytext=(x+1,y+2),\n  arrowprops=dict(arrowstyle="->"))', children: [] },
      ]
    }
  ]
};
```

**Step 2:** 实现 `initMatplotlibHierarchy(container)` — D3 树形图

```js
function initMatplotlibHierarchy(container) {
  const W = container.clientWidth || 700;
  const H = 420;
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width','100%').style('height','auto');

  const root = d3.hierarchy(MPL_HIERARCHY);
  const treeLayout = d3.tree().size([W - 80, H - 80]);
  treeLayout(root);

  // 连线
  svg.selectAll('.link').data(root.links()).join('path')
    .attr('class','link')
    .attr('d', d3.linkVertical().x(d=>d.x+40).y(d=>d.y+40))
    .attr('fill','none').attr('stroke','#424245').attr('stroke-width',1.5);

  // 节点
  const node = svg.selectAll('.node').data(root.descendants()).join('g')
    .attr('class','node').attr('transform', d=>`translate(${d.x+40},${d.y+40})`)
    .style('cursor','pointer');

  node.append('circle').attr('r', 22)
    .attr('fill', d=>d.data.color || '#7EC8E3')
    .attr('stroke','#fff').attr('stroke-width',2)
    .attr('opacity',0.85);

  node.append('text').attr('text-anchor','middle').attr('dy','0.35em')
    .attr('fill','#1d1d1f').attr('font-size',10).attr('font-weight',600)
    .text(d=>d.data.label);

  // 点击展开详情
  const infoPanel = container.querySelector('.mpl-info-panel');
  node.on('click', (event, d) => {
    node.selectAll('circle').attr('stroke','#fff').attr('stroke-width',2);
    d3.select(event.currentTarget).select('circle')
      .attr('stroke',d.data.color||'#7EC8E3').attr('stroke-width',3);
    if(infoPanel) {
      infoPanel.innerHTML = `
        <h4 style="color:${d.data.color};margin:0 0 8px">${d.data.label}</h4>
        <p style="margin:0 0 12px;color:var(--text-on-light-2)">${d.data.desc}</p>
        <pre style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;
          font-size:13px;white-space:pre-wrap;word-wrap:break-word;margin:0">${d.data.api}</pre>`;
    }
  });
}
```

**Step 3:** 在 Section 1 HTML 中添加 `.mpl-hierarchy-svg` 容器和 `.mpl-info-panel`

```html
<div style="display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap;">
  <div class="mpl-hierarchy-svg" style="flex:1;min-width:0;min-width:280px"></div>
  <div class="mpl-info-panel" style="width:280px;flex-shrink:0;min-height:160px;
    padding:20px;background:var(--bg-light-alt);border-radius:12px;
    border:1px solid var(--border-light)">
    <p style="color:var(--text-on-light-3)">← 点击节点查看详情</p>
  </div>
</div>
<!-- 移动端 flex-wrap:wrap 时 info-panel 全宽 -->
```

**Step 4:** init() 中调用 `initMatplotlibHierarchy`，destroy() 中清理 SVG

**Step 5:** 验证 — 节点可点击，右侧展示说明和 API 代码

**Step 6:** `git commit -m "feat(m1-p9): matplotlib hierarchy D3 interactive graph"`

---

### Task 3: Section 2 — seaborn 10 种图表速查（列表+预览布局）

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** 定义 SEABORN_CHARTS 数据（10种）

```js
const SEABORN_CHARTS = [
  { id: 'scatter', name: 'scatterplot', icon: '⊙', desc: '两变量关系分布',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','muted','viridis','rocket','coolwarm'], default:'deep' },
      { id:'alpha',   label:'透明度 alpha', type:'range', min:0.2, max:1, step:0.1, default:0.7 },
      { id:'size',    label:'点大小 s', type:'range', min:20, max:120, step:10, default:60 },
      { id:'hue',     label:'分组 hue', type:'checkbox', default:true },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.scatterplot(
    data=tips, x="total_bill", y="tip",
    ${p.hue ? 'hue="day", ' : ''}palette="${p.palette}",
    alpha=${p.alpha}, s=${p.size}, ax=ax
)
ax.set_title("散点图 - 消费与小费关系")
plt.tight_layout()
plt.savefig("scatter.pdf", dpi=300)`,
  },
  { id: 'line', name: 'lineplot', icon: '〜', desc: '时间序列/趋势折线',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','Set2','viridis','rocket'], default:'deep' },
      { id:'ci',      label:'置信区间', type:'checkbox', default:true },
      { id:'markers', label:'显示标记点', type:'checkbox', default:false },
      { id:'dashes',  label:'虚线区分', type:'checkbox', default:true },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

flights = sns.load_dataset("flights")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.lineplot(
    data=flights, x="year", y="passengers", hue="month",
    palette="${p.palette}",
    ${p.markers ? 'markers=True, ' : ''}${p.dashes ? 'dashes=True, ' : ''}
    errorbar=${p.ci ? '"ci"' : 'None'}, ax=ax
)
ax.set_title("折线图 - 航班乘客月度趋势")
plt.tight_layout()`,
  },
  { id: 'bar', name: 'barplot', icon: '▌', desc: '分类变量均值对比',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','pastel','Set1','rocket'], default:'pastel' },
      { id:'orient',  label:'方向', type:'select', options:['v','h'], default:'v' },
      { id:'ci',      label:'误差线', type:'checkbox', default:true },
      { id:'capsize', label:'误差帽大小', type:'range', min:0, max:0.3, step:0.05, default:0.1 },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.barplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}", orient="${p.orient}",
    errorbar=${p.ci ? '"sd"' : 'None'},
    capsize=${p.capsize}, ax=ax
)
ax.set_title("柱状图 - 各天消费均值")
plt.tight_layout()`,
  },
  { id: 'box', name: 'boxplot', icon: '⊡', desc: '分布四分位数/异常值',
    params: [
      { id:'palette',  label:'调色板', type:'select', options:['Set2','deep','pastel','viridis'], default:'Set2' },
      { id:'width',    label:'箱体宽度', type:'range', min:0.3, max:0.9, step:0.1, default:0.5 },
      { id:'flier',    label:'显示异常值', type:'checkbox', default:true },
      { id:'notch',    label:'缺口样式', type:'checkbox', default:false },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.boxplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}", width=${p.width},
    ${p.notch ? 'notch=True, ' : ''}
    showfliers=${p.flier ? 'True' : 'False'}, ax=ax
)
ax.set_title("箱线图 - 消费分布")
plt.tight_layout()`,
  },
  { id: 'violin', name: 'violinplot', icon: '♫', desc: '分布密度+四分位',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['muted','Set2','pastel','rocket'], default:'muted' },
      { id:'inner',   label:'内部样式', type:'select', options:['box','quartile','point','stick',null], default:'box' },
      { id:'split',   label:'左右分割', type:'checkbox', default:false },
      { id:'bw',      label:'带宽 bw_adjust', type:'range', min:0.5, max:2, step:0.25, default:1 },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.violinplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}",
    inner=${p.inner ? `"${p.inner}"` : 'None'},
    ${p.split ? 'hue="sex", split=True, ' : ''}
    bw_adjust=${p.bw}, ax=ax
)
ax.set_title("小提琴图 - 消费密度分布")
plt.tight_layout()`,
  },
  { id: 'hist', name: 'histplot', icon: '█', desc: '单变量频率分布',
    params: [
      { id:'bins',  label:'分箱数 bins', type:'range', min:10, max:50, step:5, default:20 },
      { id:'kde',   label:'叠加 KDE 曲线', type:'checkbox', default:true },
      { id:'color', label:'颜色', type:'select', options:['#7EC8E3','#95D5B2','#B8B8E8','#F0B27A'], default:'#7EC8E3' },
      { id:'cumulative', label:'累积分布', type:'checkbox', default:false },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.histplot(
    data=tips, x="total_bill",
    bins=${p.bins}, kde=${p.kde ? 'True' : 'False'},
    color="${p.color}",
    cumulative=${p.cumulative ? 'True' : 'False'}, ax=ax
)
ax.set_title("直方图 - 消费额分布")
plt.tight_layout()`,
  },
  { id: 'kde', name: 'kdeplot', icon: '∿', desc: '核密度估计曲线',
    params: [
      { id:'bw',   label:'带宽 bw_adjust', type:'range', min:0.3, max:2, step:0.1, default:1 },
      { id:'fill', label:'填充区域', type:'checkbox', default:true },
      { id:'hue',  label:'分组 hue', type:'checkbox', default:true },
      { id:'alpha', label:'透明度', type:'range', min:0.1, max:0.8, step:0.1, default:0.3 },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.kdeplot(
    data=tips, x="total_bill",
    ${p.hue ? 'hue="sex", ' : ''}
    bw_adjust=${p.bw},
    fill=${p.fill ? 'True' : 'False'},
    alpha=${p.alpha}, ax=ax
)
ax.set_title("核密度图 - 消费额密度")
plt.tight_layout()`,
  },
  { id: 'heatmap', name: 'heatmap', icon: '▦', desc: '矩阵热力图/相关性',
    params: [
      { id:'cmap',  label:'色图 cmap', type:'select', options:['coolwarm','viridis','RdBu_r','YlOrRd','Blues'], default:'coolwarm' },
      { id:'annot', label:'显示数值', type:'checkbox', default:true },
      { id:'fmt',   label:'数值格式', type:'select', options:['.2f','.1f','d'], default:'.2f' },
      { id:'linewidths', label:'格线宽度', type:'range', min:0, max:1, step:0.1, default:0.5 },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

# 相关矩阵数据
tips = sns.load_dataset("tips")
corr = tips.select_dtypes('number').corr()

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.heatmap(
    corr, cmap="${p.cmap}",
    annot=${p.annot ? 'True' : 'False'},
    fmt="${p.fmt}", linewidths=${p.linewidths},
    vmin=-1, vmax=1, center=0, ax=ax
)
ax.set_title("热力图 - 相关矩阵")
plt.tight_layout()`,
  },
  { id: 'pair', name: 'pairplot', icon: '⊞', desc: '多变量两两关系矩阵',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','Set2','husl','rocket'], default:'deep' },
      { id:'diag',    label:'对角线图形', type:'select', options:['hist','kde'], default:'hist' },
      { id:'corner',  label:'仅下三角', type:'checkbox', default:false },
      { id:'hue',     label:'分组 hue', type:'checkbox', default:true },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

g = sns.pairplot(
    iris, ${p.hue ? 'hue="species", ' : ''}
    palette="${p.palette}",
    diag_kind="${p.diag}",
    ${p.corner ? 'corner=True, ' : ''}
    plot_kws={"alpha": 0.6}
)
g.figure.suptitle("Pairplot - 鸢尾花多变量关系", y=1.02)
plt.tight_layout()`,
  },
  { id: 'reg', name: 'regplot', icon: '↗', desc: '回归拟合线+置信区间',
    params: [
      { id:'ci',     label:'置信区间 %', type:'range', min:50, max:99, step:5, default:95 },
      { id:'order',  label:'多项式阶数', type:'range', min:1, max:3, step:1, default:1 },
      { id:'scatter', label:'显示散点', type:'checkbox', default:true },
      { id:'color',  label:'颜色', type:'select', options:['#7EC8E3','#E07A7A','#95D5B2','#F0B27A'], default:'#7EC8E3' },
    ],
    genCode: p => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.regplot(
    data=tips, x="total_bill", y="tip",
    ci=${p.ci}, order=${p.order},
    scatter=${p.scatter ? 'True' : 'False'},
    color="${p.color}",
    scatter_kws={"alpha": 0.5}, ax=ax
)
ax.set_title(f"回归图 - 阶数={p.order}")
plt.tight_layout()`,
  },
];
```

**Step 2:** 实现 `initSeabornGallery(container)` — 列表+预览布局

```js
function initSeabornGallery(container) {
  let active = SEABORN_CHARTS[0];
  let params = Object.fromEntries(active.params.map(p=>([p.id, p.default])));
  let editor = null;

  // 渲染左侧列表
  const listEl = container.querySelector('.sb-list');
  SEABORN_CHARTS.forEach((ch, i) => {
    const item = document.createElement('div');
    item.className = 'sb-list-item' + (i===0?' active':'');
    item.innerHTML = `<span class="sb-icon">${ch.icon}</span>
      <div><strong>${ch.name}</strong><br><small style="color:var(--text-on-dark-2)">${ch.desc}</small></div>`;
    item.style.cssText = 'display:flex;gap:12px;align-items:center;padding:12px 16px;cursor:pointer;border-radius:8px;transition:background 0.2s;min-height:44px';
    item.addEventListener('click', () => {
      container.querySelectorAll('.sb-list-item').forEach(el=>el.classList.remove('active'));
      item.classList.add('active');
      active = ch;
      params = Object.fromEntries(ch.params.map(p=>([p.id, p.default])));
      renderParams();
      updatePreview();
      updateCode();
    });
    listEl.appendChild(item);
  });

  // 渲染参数面板
  const paramsEl = container.querySelector('.sb-params');
  function renderParams() {
    paramsEl.innerHTML = `<h4 style="margin:0 0 16px;color:var(--text-on-dark)">${active.name} 参数</h4>`;
    active.params.forEach(p => {
      const row = document.createElement('div');
      row.style.cssText = 'margin-bottom:14px';
      if(p.type === 'select') {
        row.innerHTML = `<label style="display:block;margin-bottom:4px;font-size:13px;color:var(--text-on-dark-2)">${p.label}</label>
          <select data-pid="${p.id}" style="width:100%;background:#2d2d2f;color:var(--text-on-dark);border:1px solid var(--border-dark);border-radius:6px;padding:6px 10px;font-size:13px">
            ${p.options.map(o=>`<option value="${o}"${o===params[p.id]?' selected':''}>${o}</option>`).join('')}
          </select>`;
      } else if(p.type === 'range') {
        row.innerHTML = `<label style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:13px;color:var(--text-on-dark-2)">
          <span>${p.label}</span><span data-val="${p.id}">${params[p.id]}</span></label>
          <input type="range" data-pid="${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${params[p.id]}"
            style="width:100%;accent-color:var(--accent);min-height:32px">`;
      } else if(p.type === 'checkbox') {
        row.innerHTML = `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--text-on-dark-2);min-height:44px">
          <input type="checkbox" data-pid="${p.id}" ${params[p.id]?'checked':''} style="width:16px;height:16px;accent-color:var(--accent)">
          ${p.label}</label>`;
      }
      paramsEl.appendChild(row);
    });

    paramsEl.querySelectorAll('[data-pid]').forEach(el => {
      el.addEventListener('change', () => {
        const pid = el.dataset.pid;
        params[pid] = el.type==='checkbox' ? el.checked : (el.type==='range' ? parseFloat(el.value) : el.value);
        const valDisplay = paramsEl.querySelector(`[data-val="${pid}"]`);
        if(valDisplay) valDisplay.textContent = params[pid];
        updatePreview();
        updateCode();
      });
    });
  }

  // D3 预览（简化 SVG，展示图表类型特征）
  const previewEl = container.querySelector('.sb-preview');
  function updatePreview() {
    previewEl.innerHTML = '';
    const W = previewEl.clientWidth || 320;
    const H = 220;
    const svg = d3.select(previewEl).append('svg')
      .attr('viewBox',`0 0 ${W} ${H}`)
      .attr('preserveAspectRatio','xMidYMid meet')
      .style('width','100%').style('height','auto')
      .style('background','#1d1d1f').style('border-radius','8px');

    renderChartPreview(svg, active.id, params, W, H);
  }

  // CodeMirror Python 代码
  const codeEl = container.querySelector('.sb-code');
  function updateCode() {
    const code = active.genCode(params);
    if(editor) { editor.setCode(code); }
    else {
      editor = createCodeEditor(codeEl, {language:'python', code, readOnly: window.innerWidth < 768});
    }
  }

  renderParams();
  updatePreview();
  updateCode();

  return { destroy: () => editor && editor.destroy() };
}
```

**Step 3:** 实现 `renderChartPreview(svg, chartId, params, W, H)` — 各图表 D3 简化预览（8种，pairplot 用网格示意）

核心思路：用随机/内置数据，渲染代表性图形要素。每种图形差异明显即可（不需要精确拟合真实数据）。

**Step 4:** Section 2 HTML 结构

```html
<section class="section-dark" id="s2-seaborn-gallery">
  <div style="max-width:var(--w-full);margin:0 auto;padding:var(--space-xl) var(--space-lg)">
    <p class="hero-eyebrow">Section 02</p>
    <h2 style="font:700 var(--text-display) var(--font-display);color:var(--text-on-dark)">seaborn 速查手册</h2>
    <!-- 响应式列表+预览布局 -->
    <div class="sb-gallery" style="display:flex;gap:24px;margin-top:40px">
      <!-- 左：图表列表 -->
      <div class="sb-list" style="width:220px;flex-shrink:0;max-height:500px;overflow-y:auto;
        scrollbar-width:thin;border-right:1px solid var(--border-dark);padding-right:12px"></div>
      <!-- 右：参数+预览+代码 -->
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:20px">
        <div style="display:flex;gap:16px;flex-wrap:wrap">
          <div class="sb-params" style="width:240px;flex-shrink:0;min-width:0"></div>
          <div class="sb-preview" style="flex:1;min-width:200px"></div>
        </div>
        <div class="sb-code" style="border-radius:12px;overflow:hidden;min-height:200px"></div>
      </div>
    </div>
  </div>
</section>
```

**Step 5:** 移动端 ≤900px — `.sb-gallery` flex-direction:column，`.sb-list` max-height:200px 横向滚动

**Step 6:** 验证 — 10 种图表列表可点击，参数面板更新，预览刷新，代码同步变化

**Step 7:** `git commit -m "feat(m1-p9): seaborn 10-chart gallery with param panel + D3 preview"`

---

### Task 4: Section 3 — matplotlib vs ggplot2 对照表

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** 定义对照数据（8组）

```js
const MPL_GGPLOT_COMPARE = [
  { concept: '散点图', python: `import matplotlib.pyplot as plt\n\nfig, ax = plt.subplots()\nax.scatter(x, y, c=color, s=size, alpha=0.7)\nax.set_xlabel("X轴")\nax.set_ylabel("Y轴")`, r: `library(ggplot2)\n\nggplot(df, aes(x=x, y=y, color=group)) +\n  geom_point(size=2, alpha=0.7) +\n  labs(x="X轴", y="Y轴")` },
  { concept: '折线图', python: `fig, ax = plt.subplots()\nax.plot(x, y, color="#7EC8E3", lw=2, marker="o")\nax.fill_between(x, y-err, y+err, alpha=0.2)`, r: `ggplot(df, aes(x=x, y=y, group=group)) +\n  geom_line(color="#7EC8E3", lw=1) +\n  geom_ribbon(aes(ymin=y-err, ymax=y+err), alpha=0.2)` },
  { concept: '柱状图', python: `fig, ax = plt.subplots()\nax.bar(categories, values,\n       color="#95D5B2", edgecolor="white", width=0.6)`, r: `ggplot(df, aes(x=category, y=value, fill=category)) +\n  geom_col(width=0.6) +\n  scale_fill_brewer(palette="Set2")` },
  { concept: '分面 Facet', python: `fig, axes = plt.subplots(2, 3, figsize=(12,8))\nfor ax, grp in zip(axes.flat, groups):\n    ax.scatter(x[grp], y[grp])\n    ax.set_title(grp)`, r: `ggplot(df, aes(x=x, y=y)) +\n  geom_point() +\n  facet_wrap(~group, ncol=3)` },
  { concept: '主题/样式', python: `plt.style.use("seaborn-v0_8-whitegrid")\n# 或精细控制：\nax.spines[["top","right"]].set_visible(False)\nax.grid(axis="y", alpha=0.3)`, r: `ggplot(df, aes(x,y)) + geom_point() +\n  theme_minimal() +\n  theme(panel.grid.minor = element_blank(),\n        text=element_text(family="sans"))` },
  { concept: '配色 Scale', python: `import matplotlib.cm as cm\ncolors = cm.viridis(np.linspace(0,1,n))\n# 或 seaborn:\nsns.set_palette("Set2")`, r: `ggplot(df, aes(x,y,color=z)) +\n  geom_point() +\n  scale_color_viridis_c() +\n  # 或定性:\n  scale_color_brewer(palette="Set2")` },
  { concept: '标注 Annotate', python: `ax.annotate("关键点",\n    xy=(x0,y0), xytext=(x0+1, y0+2),\n    arrowprops=dict(arrowstyle="->",\n                    color="gray"),\n    fontsize=10)`, r: `ggplot(df, aes(x,y)) + geom_point() +\n  annotate("text", x=x0+1, y=y0+2,\n           label="关键点", size=3) +\n  annotate("segment", x=x0+1, xend=x0,\n           y=y0+2, yend=y0,\n           arrow=arrow(length=unit(0.2,"cm")))` },
  { concept: '保存图片', python: `plt.savefig("fig.pdf",\n    dpi=300, bbox_inches="tight",\n    format="pdf")`, r: `ggsave("fig.pdf", plot=p,\n       width=88, height=66,\n       units="mm", dpi=300)` },
];
```

**Step 2:** 桌面端 HTML — 双栏对照表

```html
<section class="section-light" id="s3-mpl-vs-ggplot">
  ...
  <!-- Tab 切换器（移动端专用）-->
  <div class="compare-tabs" style="display:none">
    <button class="compare-tab active" data-lang="python">Python</button>
    <button class="compare-tab" data-lang="r">R / ggplot2</button>
  </div>
  <!-- 对照行 -->
  <div class="compare-table">
    <!-- 表头 -->
    <div class="compare-header" style="display:grid;grid-template-columns:120px 1fr 1fr;gap:12px">
      <div>概念</div><div>Python (matplotlib)</div><div>R (ggplot2)</div>
    </div>
    <!-- 数据行由 JS 生成 -->
    <div id="compare-rows"></div>
  </div>
</section>
```

**Step 3:** JS 生成对照行 + 移动端 Tab 切换

```js
function initCompareTable(container) {
  const rowsEl = container.querySelector('#compare-rows');
  MPL_GGPLOT_COMPARE.forEach(item => {
    const row = document.createElement('div');
    row.style.cssText = 'display:grid;grid-template-columns:120px 1fr 1fr;gap:12px;border-top:1px solid var(--border-light);padding:16px 0';
    row.innerHTML = `
      <div style="font-weight:600;color:var(--accent);font-size:14px;padding-top:4px">${item.concept}</div>
      <pre class="compare-python" style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;
        font-size:12px;white-space:pre-wrap;word-wrap:break-word;margin:0;font-family:var(--font-code)">${item.python}</pre>
      <pre class="compare-r" style="background:#f5f5f7;color:#1d1d1f;padding:12px;border-radius:8px;
        font-size:12px;white-space:pre-wrap;word-wrap:break-word;margin:0;font-family:var(--font-code)">${item.r}</pre>`;
    rowsEl.appendChild(row);
  });

  // 移动端 Tab 切换
  if(window.innerWidth <= 768) {
    container.querySelector('.compare-tabs').style.display = 'flex';
    container.querySelectorAll('#compare-rows > div').forEach(row => {
      row.style.gridTemplateColumns = '1fr';
      row.querySelector('.compare-r').style.display = 'none';
    });
    container.querySelectorAll('.compare-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.compare-tab').forEach(t=>t.classList.remove('active'));
        tab.classList.add('active');
        const lang = tab.dataset.lang;
        container.querySelectorAll('.compare-python').forEach(el=>el.style.display=lang==='python'?'':'none');
        container.querySelectorAll('.compare-r').forEach(el=>el.style.display=lang==='r'?'':'none');
      });
    });
  }
}
```

**Step 4:** 验证 — 桌面双栏，移动端 Tab 切换，代码块无水平溢出

**Step 5:** `git commit -m "feat(m1-p9): matplotlib vs ggplot2 comparison table"`

---

### Task 5: Section 4 — annotate Canvas 拖拽演示

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** Canvas HTML 结构

```html
<section class="section-dark" id="s4-annotate-canvas">
  <div style="max-width:var(--w-full);margin:0 auto;padding:var(--space-xl) var(--space-lg)">
    ...
    <div style="display:flex;gap:24px;flex-wrap:wrap;margin-top:32px">
      <!-- 左：工具栏 + Canvas -->
      <div style="flex:1;min-width:280px">
        <div class="annotate-toolbar" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
          <button class="ann-tool active" data-type="arrow" style="min-height:44px;padding:8px 16px;background:#2d2d2f;border:1px solid var(--border-dark);border-radius:8px;color:var(--text-on-dark);cursor:pointer">↗ 箭头</button>
          <button class="ann-tool" data-type="text" style="...">T 文字</button>
          <button class="ann-tool" data-type="rect" style="...">□ 方框</button>
          <button class="ann-tool" data-type="highlight" style="...">◆ 高亮</button>
          <button id="ann-reset" style="...;margin-left:auto;color:var(--accent)">重置</button>
        </div>
        <canvas id="annotate-canvas" style="width:100%;border-radius:12px;touch-action:none;cursor:crosshair"></canvas>
      </div>
      <!-- 右：生成代码 -->
      <div style="width:280px;flex-shrink:0;min-width:0" class="ann-code-wrap">
        <h4>生成代码</h4>
        <div class="ann-code-editor"></div>
      </div>
    </div>
  </div>
</section>
```

**Step 2:** 实现 `initAnnotateCanvas(container)`

```js
function initAnnotateCanvas(container) {
  const canvas = container.querySelector('#annotate-canvas');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // HiDPI 适配
  function resizeCanvas() {
    const W = canvas.parentElement.clientWidth;
    const H = Math.min(W * 0.6, 420);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = H + 'px';
    ctx.scale(dpr, dpr);
    drawBase();
    drawAnnotations();
  }

  // 绘制背景图表（折线图）
  function drawBase() {
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    ctx.fillStyle = '#1d1d1f';
    ctx.fillRect(0, 0, W, H);

    // 坐标轴
    ctx.strokeStyle = '#424245'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(60,20); ctx.lineTo(60,H-40); ctx.lineTo(W-20,H-40); ctx.stroke();

    // 模拟折线数据
    const data = [30,80,55,120,95,150,110,170,140,185];
    const xStep = (W - 90) / (data.length - 1);
    const yScale = (H - 70) / 200;
    const pts = data.map((v,i) => ({ x: 60 + i*xStep, y: H-40 - v*yScale }));

    ctx.strokeStyle = '#7EC8E3'; ctx.lineWidth = 2.5;
    ctx.beginPath(); pts.forEach((p,i) => i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
    ctx.stroke();
    ctx.fillStyle = '#7EC8E3';
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2); ctx.fill(); });

    // 轴标签
    ctx.fillStyle = '#a1a1a6'; ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText('时间 (月)', W/2-20, H-10);
    ctx.save(); ctx.translate(15, H/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('指标值', -20, 0); ctx.restore();
  }

  // 注释元素列表
  const annotations = [];
  let activeType = 'arrow';
  let dragging = null;
  let dragOffset = { x:0, y:0 };

  function drawAnnotations() {
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;
    annotations.forEach(ann => {
      ctx.save();
      if(ann.type === 'arrow') {
        ctx.strokeStyle = '#F0D264'; ctx.fillStyle = '#F0D264'; ctx.lineWidth = 2;
        drawArrow(ctx, ann.x1, ann.y1, ann.x2, ann.y2);
        ctx.fillStyle = '#F0D264'; ctx.font = 'bold 12px sans-serif';
        ctx.fillText(ann.label || '峰值', ann.x2 + 6, ann.y2);
      } else if(ann.type === 'text') {
        ctx.fillStyle = '#F0D264'; ctx.font = '13px Noto Sans SC, sans-serif';
        ctx.fillRect(ann.x-4, ann.y-16, ctx.measureText(ann.label||'标注').width+8, 22);
        ctx.fillStyle = '#1d1d1f';
        ctx.fillText(ann.label || '标注', ann.x, ann.y);
      } else if(ann.type === 'rect') {
        ctx.strokeStyle = '#E07A7A'; ctx.lineWidth = 2; ctx.setLineDash([4,3]);
        ctx.strokeRect(ann.x, ann.y, ann.w||80, ann.h||50);
        ctx.setLineDash([]);
      } else if(ann.type === 'highlight') {
        ctx.fillStyle = 'rgba(240,178,122,0.2)';
        ctx.fillRect(ann.x, ann.y, ann.w||80, ann.h||50);
        ctx.strokeStyle = '#F0B27A'; ctx.lineWidth = 1.5;
        ctx.strokeRect(ann.x, ann.y, ann.w||80, ann.h||50);
      }
      ctx.restore();
    });
  }

  function redraw() { drawBase(); drawAnnotations(); }

  // Pointer Events
  let startPos = null;
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / dpr / rect.width;
    const scaleY = canvas.height / dpr / rect.height;
    return { x: (e.clientX - rect.left)*scaleX, y: (e.clientY - rect.top)*scaleY };
  }

  canvas.addEventListener('pointerdown', e => {
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    const pos = getPos(e);
    // 检查是否点击了现有注释
    const hit = annotations.find(a => hitTest(a, pos));
    if(hit) { dragging = hit; dragOffset = {x:pos.x-hit.x, y:pos.y-hit.y}; }
    else { startPos = pos; }
  });

  canvas.addEventListener('pointermove', e => {
    if(!dragging && !startPos) return;
    const pos = getPos(e);
    if(dragging) {
      dragging.x = pos.x - dragOffset.x;
      dragging.y = pos.y - dragOffset.y;
      if(dragging.x2 !== undefined) { dragging.x2 += pos.x - dragOffset.x - dragging.x + dragOffset.x; }
      redraw();
    }
  });

  canvas.addEventListener('pointerup', e => {
    if(startPos && !dragging) {
      const pos = getPos(e);
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      if(activeType === 'arrow') {
        annotations.push({type:'arrow', x1:pos.x, y1:pos.y, x2:startPos.x, y2:startPos.y, label:'关键点'});
      } else if(activeType === 'text') {
        annotations.push({type:'text', x:pos.x, y:pos.y, label:'标注文字'});
      } else if(activeType === 'rect' || activeType === 'highlight') {
        const dx = pos.x - startPos.x, dy = pos.y - startPos.y;
        annotations.push({type:activeType, x:Math.min(startPos.x,pos.x), y:Math.min(startPos.y,pos.y), w:Math.abs(dx)||60, h:Math.abs(dy)||40});
      }
      redraw();
      updateAnnotateCode();
    }
    dragging = null; startPos = null;
  });

  // 工具切换
  container.querySelectorAll('.ann-tool').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.ann-tool').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeType = btn.dataset.type;
    });
  });
  container.querySelector('#ann-reset')?.addEventListener('click', () => {
    annotations.length = 0; redraw(); updateAnnotateCode();
  });

  // 生成 Python 代码
  let annEditor = null;
  function updateAnnotateCode() {
    const lines = ['fig, ax = plt.subplots(figsize=(8,6))', '# ... 绘制图表 ...', ''];
    annotations.forEach((a,i) => {
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const toDataX = v => ((v-60)/(W-80) * 10).toFixed(1);
      const toDataY = v => ((H-40-v)/(H-70) * 200).toFixed(0);
      if(a.type==='arrow') {
        lines.push(`ax.annotate("${a.label}", xy=(${toDataX(a.x1)}, ${toDataY(a.y1)}),`);
        lines.push(`    xytext=(${toDataX(a.x2)}, ${toDataY(a.y2)}),`);
        lines.push(`    arrowprops=dict(arrowstyle="->", color="#F0D264"),`);
        lines.push(`    color="#F0D264", fontsize=10)`);
      } else if(a.type==='text') {
        lines.push(`ax.text(${toDataX(a.x)}, ${toDataY(a.y)}, "${a.label}", fontsize=10, color="#F0D264")`);
      } else if(a.type==='rect' || a.type==='highlight') {
        lines.push(`from matplotlib.patches import FancyBboxPatch`);
        lines.push(`rect = FancyBboxPatch((${toDataX(a.x)}, ${toDataY(a.y+a.h)}), ${((a.w||60)/(W-80)*10).toFixed(1)}, ${((a.h||40)/(H-70)*200).toFixed(0)},`);
        lines.push(`    boxstyle="round,pad=0.1", fill=${a.type==='highlight'?'True':'False'}, alpha=0.2, color="#F0B27A")`);
        lines.push(`ax.add_patch(rect)`);
      }
      lines.push('');
    });
    lines.push('plt.tight_layout()');
    const code = lines.join('\n');
    const wrap = container.querySelector('.ann-code-editor');
    if(annEditor) { annEditor.setCode(code); }
    else { annEditor = createCodeEditor(wrap, {language:'python', code, readOnly: window.innerWidth<768}); }
  }

  updateAnnotateCode();
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  return {
    destroy: () => {
      window.removeEventListener('resize', resizeCanvas);
      annEditor?.destroy();
    }
  };
}

function drawArrow(ctx, x1, y1, x2, y2) {
  const angle = Math.atan2(y2-y1, x2-x1);
  const len = 12;
  ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - len*Math.cos(angle-0.4), y2 - len*Math.sin(angle-0.4));
  ctx.lineTo(x2 - len*Math.cos(angle+0.4), y2 - len*Math.sin(angle+0.4));
  ctx.closePath(); ctx.fill();
}

function hitTest(ann, pos) {
  return pos.x >= ann.x - 15 && pos.x <= ann.x + (ann.w||60) + 15
      && pos.y >= ann.y - 15 && pos.y <= ann.y + (ann.h||40) + 15;
}
```

**Step 5:** 验证 — Canvas 可绘制箭头/文字/方框，元素可拖拽，代码实时更新，移动端触控正常

**Step 6:** `git commit -m "feat(m1-p9): annotate canvas drag demo with live code generation"`

---

### Task 6: Section 5 — 图表叙事 4 种方法

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** Section 5 HTML 结构（4 个 Demo 子块 + 好/差对比）

```html
<section class="section-light" id="s5-storytelling">
  <div style="max-width:var(--w-full);margin:0 auto;padding:var(--space-xl) var(--space-lg)">
    <p class="hero-eyebrow">Section 05</p>
    <h2>图表叙事四种方法</h2>
    <p>让数据图表主动引导读者注意力……</p>

    <!-- 方法1: 颜色对比 -->
    <div class="story-block" id="story-color-contrast">...</div>
    <!-- 方法2: 标注引导 -->
    <div class="story-block" id="story-annotation-flow">...</div>
    <!-- 方法3: 灰化非重点 -->
    <div class="story-block" id="story-grey-out">...</div>
    <!-- 方法4: 分步揭示 -->
    <div class="story-block" id="story-reveal">...</div>

    <!-- 好/差对比 -->
    <div id="story-compare">...</div>
  </div>
</section>
```

**Step 2:** 实现 4 个 D3 演示函数

```js
// 方法1: 颜色对比突出 — 散点图，点击组按钮高亮
function initColorContrast(container) {
  const data = Array.from({length:60}, (_,i) => ({
    x: Math.random()*8, y: Math.random()*6,
    group: ['A','B','C'][Math.floor(Math.random()*3)]
  }));
  const colors = { A:'#7EC8E3', B:'#95D5B2', C:'#F0B27A' };
  let highlighted = null;

  const svg = d3.select(container.querySelector('.story-svg'));
  // ... D3 散点图，点击按钮 highlighted=group，非 highlighted 组颜色→#424245
  // GSAP 颜色过渡 gsap.to(circles, {fill, duration:0.4})
}

// 方法2: 标注引导 — 折线图，箭头标注依次 stagger 出现
function initAnnotationFlow(container) {
  // 折线图 + 3个关键点标注
  // 播放按钮 → gsap.to 每个标注 fromTo opacity 0→1, y 10→0, stagger:0.6
}

// 方法3: 灰化非重点 — 柱状图，hover 高亮当前栏，其余灰化
function initGreyOut(container) {
  // 柱状图，mouseover → 当前栏保持颜色，其余 fill→#424245
  // 演示说明卡
}

// 方法4: 分步揭示 — 折线数据点逐步出现
function initStepReveal(container) {
  let step = 0; let playing = false; let timer = null;
  const data = [10,35,28,55,42,68,52,80,65,90];
  // 播放按钮 → 每 600ms 揭示一个数据点
  // 进度条显示当前步骤
}
```

**Step 3:** 实现好/差标注对比（并排 SVG）

```js
// 左边：差的标注（标注过多、颜色杂乱）
// 右边：好的标注（只标最重要一个点，简洁）
function initStorytellCompare(container) {
  // 两个 D3 SVG 并排，mobile 纵向堆叠
  // 标签：✗ 标注混乱  vs  ✓ 精准引导
}
```

**Step 4:** GSAP ScrollTrigger 驱动 story-block 渐入

```js
['#story-color-contrast','#story-annotation-flow','#story-grey-out','#story-reveal'].forEach(sel => {
  gsap.fromTo(sel, {opacity:0,y:40},{
    opacity:1, y:0, duration:0.7,
    scrollTrigger: { trigger:sel, start:'top 80%' }
  });
});
```

**Step 5:** 验证 — 4 种方法各自可交互，播放按钮有动画，好/差对比 SVG 清晰

**Step 6:** `git commit -m "feat(m1-p9): storytelling 4 methods - color/annotation/greyout/reveal"`

---

### Task 7: GSAP 滚动动画 + destroy() 完善 + 移动端检查

**Files:**
- Modify: `src/pages/m1/p09-python-viz.js`

**Step 1:** 为所有 section 标题/段落添加 ScrollTrigger fadeIn

```js
// Section 1~5 的 h2, p, .story-block 等
fadeIn('.page-scroll #s1-matplotlib-hierarchy h2, .page-scroll #s1-matplotlib-hierarchy p', 0);
fadeIn('.page-scroll #s2-seaborn-gallery h2', 0.1);
// ...依次类推
```

**Step 2:** 完善 destroy()

```js
export function destroy() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  _seabornGallery?.destroy();
  _annotateCanvas?.destroy();
  window.removeEventListener('scroll', _scrollHandlers);
}
```

**Step 3:** 移动端检查清单

```
375px: Hero 无溢出，quicknav 换行，scroll-hint 在 flex 流内
375px: seaborn 列表纵向堆叠，代码块 pre-wrap 不溢出
768px: compare-table Tab 切换正常
375px: annotate Canvas touch-action:none，工具栏自动换行
```

**Step 4:** 验证 Chrome DevTools — iPhone SE (375px)，iPad (768px)，Desktop (1440px)

**Step 5:** 更新 todo.md — m1-p9 行改为 `[x]`

**Step 6:** `git commit -m "feat(m1-p9): GSAP scroll animations + mobile polish + todo update"`

---

## 执行顺序

Task 1 → Task 2 → Task 3 → Task 4 → Task 5 → Task 6 → Task 7

每个 Task 完成后验证功能再 commit，不跨 Task 合并 commit。

---

## 移动端关键约束（每 Task 结束时核查）

- `min-width: 0` 在所有 flex 子项
- `white-space: pre-wrap; word-wrap: break-word` 在所有 `pre` 块
- Canvas `touch-action: none`
- Tab/按钮 `min-height: 44px`
- ≤900px 双栏 → 单列
