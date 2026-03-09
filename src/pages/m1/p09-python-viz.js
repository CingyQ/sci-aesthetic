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
//  seaborn 图表数据
// ══════════════════════════════════════════════════════

const SEABORN_CHARTS = [
  { id: 'scatter', name: 'scatterplot', icon: '⊙', desc: '两变量关系分布',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','muted','viridis','rocket','coolwarm'], default:'deep' },
      { id:'alpha',   label:'透明度 alpha', type:'range', min:0.2, max:1, step:0.1, default:0.7 },
      { id:'size',    label:'点大小 s', type:'range', min:20, max:120, step:10, default:60 },
      { id:'hue',     label:'分组 hue', type:'checkbox', default:true },
    ],
    genCode: (p) => `import seaborn as sns
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
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

flights = sns.load_dataset("flights")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.lineplot(
    data=flights, x="year", y="passengers", hue="month",
    palette="${p.palette}",
    ${p.markers ? 'markers=True, ' : ''}errorbar=${p.ci ? '"ci"' : 'None'}, ax=ax
)
ax.set_title("折线图 - 航班乘客月度趋势")
plt.tight_layout()`,
  },
  { id: 'bar', name: 'barplot', icon: '▌', desc: '分类变量均值对比',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','pastel','Set1','rocket'], default:'pastel' },
      { id:'orient',  label:'方向', type:'select', options:['v','h'], default:'v' },
      { id:'ci',      label:'误差线', type:'checkbox', default:true },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.barplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}", orient="${p.orient}",
    errorbar=${p.ci ? '"sd"' : 'None'}, ax=ax
)
ax.set_title("柱状图 - 各天消费均值")
plt.tight_layout()`,
  },
  { id: 'box', name: 'boxplot', icon: '⊡', desc: '分布四分位数/异常值',
    params: [
      { id:'palette',  label:'调色板', type:'select', options:['Set2','deep','pastel','viridis'], default:'Set2' },
      { id:'width',    label:'箱体宽度', type:'range', min:0.3, max:0.9, step:0.1, default:0.5 },
      { id:'notch',    label:'缺口样式', type:'checkbox', default:false },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.boxplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}", width=${p.width},
    ${p.notch ? 'notch=True, ' : ''}ax=ax
)
ax.set_title("箱线图 - 消费分布")
plt.tight_layout()`,
  },
  { id: 'violin', name: 'violinplot', icon: '♫', desc: '分布密度+四分位',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['muted','Set2','pastel','rocket'], default:'muted' },
      { id:'inner',   label:'内部样式', type:'select', options:['box','quartile','point','stick'], default:'box' },
      { id:'bw',      label:'带宽 bw_adjust', type:'range', min:0.5, max:2, step:0.25, default:1 },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.violinplot(
    data=tips, x="day", y="total_bill",
    palette="${p.palette}",
    inner="${p.inner}",
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
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.histplot(
    data=tips, x="total_bill",
    bins=${p.bins}, kde=${p.kde ? 'True' : 'False'},
    color="${p.color}", ax=ax
)
ax.set_title("直方图 - 消费额分布")
plt.tight_layout()`,
  },
  { id: 'kde', name: 'kdeplot', icon: '∿', desc: '核密度估计曲线',
    params: [
      { id:'bw',   label:'带宽 bw_adjust', type:'range', min:0.3, max:2, step:0.1, default:1 },
      { id:'fill', label:'填充区域', type:'checkbox', default:true },
      { id:'hue',  label:'分组 hue', type:'checkbox', default:true },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.kdeplot(
    data=tips, x="total_bill",
    ${p.hue ? 'hue="sex", ' : ''}bw_adjust=${p.bw},
    fill=${p.fill ? 'True' : 'False'}, ax=ax
)
ax.set_title("核密度图 - 消费额密度")
plt.tight_layout()`,
  },
  { id: 'heatmap', name: 'heatmap', icon: '▦', desc: '矩阵热力图/相关性',
    params: [
      { id:'cmap',  label:'色图 cmap', type:'select', options:['coolwarm','viridis','RdBu_r','YlOrRd','Blues'], default:'coolwarm' },
      { id:'annot', label:'显示数值', type:'checkbox', default:true },
      { id:'linewidths', label:'格线宽度', type:'range', min:0, max:1, step:0.1, default:0.5 },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")
corr = tips.select_dtypes('number').corr()

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.heatmap(
    corr, cmap="${p.cmap}",
    annot=${p.annot ? 'True' : 'False'},
    linewidths=${p.linewidths},
    vmin=-1, vmax=1, center=0, ax=ax
)
ax.set_title("热力图 - 相关矩阵")
plt.tight_layout()`,
  },
  { id: 'pair', name: 'pairplot', icon: '⊞', desc: '多变量两两关系矩阵',
    params: [
      { id:'palette', label:'调色板', type:'select', options:['deep','Set2','husl','rocket'], default:'deep' },
      { id:'diag',    label:'对角线图形', type:'select', options:['hist','kde'], default:'hist' },
      { id:'hue',     label:'分组 hue', type:'checkbox', default:true },
    ],
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

g = sns.pairplot(
    iris, ${p.hue ? 'hue="species", ' : ''}palette="${p.palette}",
    diag_kind="${p.diag}",
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
    genCode: (p) => `import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.regplot(
    data=tips, x="total_bill", y="tip",
    ci=${p.ci}, order=${p.order},
    scatter=${p.scatter ? 'True' : 'False'},
    color="${p.color}", ax=ax
)
ax.set_title("回归图 - 线性拟合")
plt.tight_layout()`,
  },
];

const MPL_GGPLOT_COMPARE = [
  { concept: '散点图',
    python: `import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, ax = plt.subplots(figsize=(8,6), dpi=150)\nax.scatter(x, y, c=color, s=60, alpha=0.7)\nax.set_xlabel("X轴")\nax.set_ylabel("Y轴")\nax.spines[["top","right"]].set_visible(False)`,
    r: `library(ggplot2)\n\nggplot(df, aes(x=x, y=y, color=group)) +\n  geom_point(size=2, alpha=0.7) +\n  labs(x="X轴", y="Y轴") +\n  theme_minimal()` },
  { concept: '折线图',
    python: `fig, ax = plt.subplots(figsize=(8,6), dpi=150)\nax.plot(x, y, color="#7EC8E3", lw=2, marker="o")\nax.fill_between(x, y-err, y+err,\n    color="#7EC8E3", alpha=0.2)\nax.set_xlabel("时间")\nax.set_ylabel("值")`,
    r: `ggplot(df, aes(x=x, y=y, group=grp)) +\n  geom_line(color="#7EC8E3", linewidth=1) +\n  geom_ribbon(aes(ymin=y-err, ymax=y+err),\n              alpha=0.2, fill="#7EC8E3") +\n  theme_minimal()` },
  { concept: '柱状图',
    python: `fig, ax = plt.subplots(figsize=(8,6), dpi=150)\nax.bar(categories, values,\n       color="#95D5B2", edgecolor="white",\n       width=0.6)\nax.set_xlabel("类别")\nax.set_ylabel("数值")`,
    r: `ggplot(df, aes(x=category, y=value,\n               fill=category)) +\n  geom_col(width=0.6) +\n  scale_fill_brewer(palette="Set2") +\n  theme_minimal()` },
  { concept: '分面 Facet',
    python: `fig, axes = plt.subplots(2, 3, figsize=(12,8))\nfor ax, grp in zip(axes.flat, groups):\n    ax.scatter(x[grp], y[grp],\n               color=colors[grp])\n    ax.set_title(grp)\nplt.tight_layout()`,
    r: `ggplot(df, aes(x=x, y=y)) +\n  geom_point() +\n  facet_wrap(~group, ncol=3) +\n  theme_minimal()` },
  { concept: '主题样式',
    python: `import matplotlib as mpl\nplt.style.use("seaborn-v0_8-whitegrid")\n# 精细控制：\nax.spines[["top","right"]].set_visible(False)\nax.grid(axis="y", alpha=0.3, linestyle="--")\nmpl.rcParams["font.family"] = "sans-serif"`,
    r: `ggplot(df, aes(x,y)) +\n  geom_point() +\n  theme_minimal() +\n  theme(\n    panel.grid.minor = element_blank(),\n    text = element_text(family="sans")\n  )` },
  { concept: '配色 Scale',
    python: `import matplotlib.cm as cm\nimport seaborn as sns\n\n# 连续配色\ncolors = cm.viridis(np.linspace(0,1,n))\n# 定性配色\nsns.set_palette("Set2")`,
    r: `ggplot(df, aes(x,y,color=z)) +\n  geom_point() +\n  # 连续：\n  scale_color_viridis_c() +\n  # 定性：\n  # scale_color_brewer(palette="Set2")` },
  { concept: '标注 Annotate',
    python: `ax.annotate(\n    "关键点",\n    xy=(x0, y0),\n    xytext=(x0+1, y0+2),\n    arrowprops=dict(\n        arrowstyle="->",\n        color="gray"\n    ),\n    fontsize=10\n)`,
    r: `ggplot(df, aes(x,y)) +\n  geom_point() +\n  annotate("text", x=x0+1, y=y0+2,\n           label="关键点", size=3) +\n  annotate("segment",\n           x=x0+1, xend=x0,\n           y=y0+2, yend=y0,\n           arrow=arrow(length=unit(0.2,"cm")))` },
  { concept: '保存图片',
    python: `plt.savefig(\n    "fig.pdf",\n    dpi=300,\n    bbox_inches="tight",\n    format="pdf"\n)\n# 透明背景：\n# transparent=True`,
    r: `ggsave(\n    "fig.pdf",\n    plot = p,\n    width = 88,\n    height = 66,\n    units = "mm",\n    dpi = 300\n)` },
];

// ══════════════════════════════════════════════════════
//  状态
// ══════════════════════════════════════════════════════

let state = {
  cleanupFns: [],
  resizeObservers: [],
  sbGallery: null,
  annCanvas: null,
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
//  seaborn D3 预览渲染
// ══════════════════════════════════════════════════════

function seededRng9(seed) {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
}

function renderChartPreview(svg, chartId, params, W, H) {
  svg.selectAll('*').remove();
  const pad = { t: 25, r: 20, b: 35, l: 45 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const g = svg.append('g').attr('transform', `translate(${pad.l},${pad.t})`);

  // dark background + grid
  svg.insert('rect','g').attr('width', W).attr('height', H).attr('fill', '#1d1d1f').attr('rx', 8);
  for (let i=1;i<=4;i++) {
    g.append('line').attr('x1',0).attr('y1',i*iH/4).attr('x2',iW).attr('y2',i*iH/4)
      .attr('stroke','#2d2d2f').attr('stroke-width',1);
  }
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#424245').attr('stroke-width',1);
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH).attr('stroke','#424245').attr('stroke-width',1);

  const rng = seededRng9(42);
  const CATS = ['A','B','C','D'];
  const PALETTE_MAP = {
    'deep':    ['#4C72B0','#DD8452','#55A868','#C44E52'],
    'Set2':    ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3'],
    'Set1':    ['#E41A1C','#377EB8','#4DAF4A','#984EA3'],
    'pastel':  ['#AEC6CF','#FFD1DC','#B5EAD7','#FFDAC1'],
    'viridis': ['#440154','#31688E','#35B779','#FDE725'],
    'muted':   ['#4878D0','#EE854A','#6ACC64','#D65F5F'],
    'rocket':  ['#03051A','#4A0C5C','#B0298B','#F87060'],
    'husl':    ['#F77189','#BB9832','#50B131','#36ADA4'],
  };
  const COLS = (params.palette && PALETTE_MAP[params.palette]) || ['#7EC8E3','#95D5B2','#B8B8E8','#F0B27A'];

  function axisLabel(x, y, txt, anchor='middle') {
    g.append('text').attr('x',x).attr('y',y).attr('text-anchor',anchor)
      .attr('font-size',10).attr('fill','#a0a0a8').attr('font-family','sans-serif').text(txt);
  }

  if (chartId === 'scatter') {
    const pts = Array.from({length:50}, () => ({
      x: 0.05+rng()*0.9, y: 0.05+rng()*0.9, gi: Math.floor(rng()*4)
    }));
    const r = Math.max(2, Math.sqrt((params.size||60)/Math.PI) * 1.1);
    g.selectAll('circle').data(pts).join('circle')
      .attr('cx', d=>d.x*iW).attr('cy', d=>(1-d.y)*iH)
      .attr('r', r)
      .attr('fill', d => params.hue ? COLS[d.gi] : COLS[0])
      .attr('opacity', params.alpha || 0.7);

  } else if (chartId === 'line') {
    const nLines = 3;
    const lines = Array.from({length:nLines}, (_, gi) => ({
      gi, pts: Array.from({length:10}, (_,i) => ({
        x: i/9, y: Math.max(0.02, Math.min(0.92, 0.12+gi*0.22+rng()*0.08+Math.sin(i/3)*0.06))
      }))
    }));
    const lineGen = d3.line().x(d=>d.x*iW).y(d=>(1-d.y)*iH).curve(d3.curveCatmullRom);
    lines.forEach(ln => {
      if (params.ci) {
        const areaGen = d3.area()
          .x(d=>d.x*iW).y0(d=>(1-Math.max(0.02,d.y-0.06))*iH).y1(d=>(1-Math.min(0.92,d.y+0.06))*iH)
          .curve(d3.curveCatmullRom);
        g.append('path').attr('d',areaGen(ln.pts)).attr('fill',COLS[ln.gi]).attr('opacity',0.2);
      }
      g.append('path').attr('d',lineGen(ln.pts)).attr('fill','none').attr('stroke',COLS[ln.gi]).attr('stroke-width',2);
      if (params.markers) {
        g.selectAll(`.mk${ln.gi}`).data(ln.pts).join('circle').attr('class',`.mk${ln.gi}`)
          .attr('cx',d=>d.x*iW).attr('cy',d=>(1-d.y)*iH).attr('r',3.5).attr('fill',COLS[ln.gi]);
      }
    });
    [0,3,6,9].forEach(i => axisLabel(i/9*iW, iH+14, `Q${i+1}`));

  } else if (chartId === 'bar') {
    const vals = CATS.map(() => 0.35+rng()*0.45);
    const errs = vals.map(v => v*0.1+0.03);
    if (params.orient === 'v') {
      const xS = d3.scaleBand().domain(CATS).range([0,iW]).padding(0.28);
      g.selectAll('rect').data(vals).join('rect')
        .attr('x',(_,i)=>xS(CATS[i])).attr('y',d=>(1-d)*iH)
        .attr('width',xS.bandwidth()).attr('height',d=>d*iH)
        .attr('fill',(_,i)=>COLS[i]).attr('rx',3);
      if (params.ci) {
        vals.forEach((v,i)=>{
          const cx = xS(CATS[i])+xS.bandwidth()/2;
          const top = (1-(v+errs[i]))*iH, bot = (1-(v-errs[i]))*iH;
          g.append('line').attr('x1',cx).attr('y1',top).attr('x2',cx).attr('y2',bot).attr('stroke','#fff').attr('stroke-width',1.5);
          g.append('line').attr('x1',cx-5).attr('y1',top).attr('x2',cx+5).attr('y2',top).attr('stroke','#fff').attr('stroke-width',1.5);
          g.append('line').attr('x1',cx-5).attr('y1',bot).attr('x2',cx+5).attr('y2',bot).attr('stroke','#fff').attr('stroke-width',1.5);
        });
      }
      CATS.forEach((c,i)=>axisLabel(xS(c)+xS.bandwidth()/2, iH+14, c));
    } else {
      const yS = d3.scaleBand().domain(CATS).range([0,iH]).padding(0.28);
      g.selectAll('rect').data(vals).join('rect')
        .attr('x',0).attr('y',(_,i)=>yS(CATS[i]))
        .attr('width',d=>d*iW).attr('height',yS.bandwidth())
        .attr('fill',(_,i)=>COLS[i]).attr('rx',3);
      if (params.ci) {
        vals.forEach((v,i)=>{
          const cy = yS(CATS[i])+yS.bandwidth()/2;
          const rx = (v+errs[i])*iW;
          g.append('line').attr('x1',rx).attr('y1',cy-6).attr('x2',rx).attr('y2',cy+6).attr('stroke','#fff').attr('stroke-width',1.5);
        });
      }
      CATS.forEach((c,i)=>axisLabel(-6, yS(c)+yS.bandwidth()/2+4, c, 'end'));
    }

  } else if (chartId === 'box') {
    const bw = (params.width||0.5) * iW / 5.5;
    const hasNotch = !!params.notch;
    CATS.forEach((cat,i)=>{
      const cx = (i+0.5)*(iW/4);
      const med = 0.35+rng()*0.28;
      const q1 = Math.max(0.04, med-0.1-rng()*0.06);
      const q3 = Math.min(0.94, med+0.1+rng()*0.06);
      const wlo = Math.max(0.01, q1-0.13);
      const whi = Math.min(0.97, q3+0.13);
      const col = COLS[i];
      g.append('line').attr('x1',cx).attr('y1',(1-whi)*iH).attr('x2',cx).attr('y2',(1-q3)*iH).attr('stroke',col).attr('stroke-width',1.5).attr('stroke-dasharray','3,2');
      g.append('line').attr('x1',cx).attr('y1',(1-q1)*iH).attr('x2',cx).attr('y2',(1-wlo)*iH).attr('stroke',col).attr('stroke-width',1.5).attr('stroke-dasharray','3,2');
      g.append('line').attr('x1',cx-bw/3).attr('y1',(1-whi)*iH).attr('x2',cx+bw/3).attr('y2',(1-whi)*iH).attr('stroke',col).attr('stroke-width',1.5);
      g.append('line').attr('x1',cx-bw/3).attr('y1',(1-wlo)*iH).attr('x2',cx+bw/3).attr('y2',(1-wlo)*iH).attr('stroke',col).attr('stroke-width',1.5);
      if (hasNotch) {
        const nw = bw*0.45, nm = (1-med)*iH;
        const q1y=(1-q1)*iH, q3y=(1-q3)*iH;
        const pathD = `M${cx-bw/2},${q3y} L${cx-bw/2},${nm-7} L${cx-nw/2},${nm} L${cx-bw/2},${nm+7} L${cx-bw/2},${q1y} L${cx+bw/2},${q1y} L${cx+bw/2},${nm+7} L${cx+nw/2},${nm} L${cx+bw/2},${nm-7} L${cx+bw/2},${q3y}Z`;
        g.append('path').attr('d',pathD).attr('fill',col).attr('opacity',0.7);
      } else {
        g.append('rect').attr('x',cx-bw/2).attr('y',(1-q3)*iH).attr('width',bw).attr('height',(q3-q1)*iH).attr('fill',col).attr('opacity',0.7).attr('rx',2);
      }
      g.append('line').attr('x1',cx-bw/2).attr('y1',(1-med)*iH).attr('x2',cx+bw/2).attr('y2',(1-med)*iH).attr('stroke','#fff').attr('stroke-width',2);
      axisLabel(cx, iH+14, cat);
    });

  } else if (chartId === 'violin') {
    const bwScale = Math.max(0.4, Math.min(2.5, params.bw||1.0));
    const innerStyle = params.inner || 'box';
    CATS.forEach((cat,i)=>{
      const cx = (i+0.5)*(iW/4);
      const col = COLS[i];
      const nPts = 28;
      const pts = [];
      for (let j=0;j<nPts;j++) {
        const t = j/(nPts-1);
        const y = 0.05+t*0.9;
        const base = Math.sin(Math.PI*t);
        const skew = Math.sin(Math.PI*t*1.6+i*0.6)*0.18;
        const w = Math.max(1, (base+skew)*(0.035+rng()*0.018)*bwScale*iW);
        pts.push({y,w});
      }
      const pathD = pts.map((p,j)=>`${j===0?'M':'L'}${cx-p.w},${(1-p.y)*iH}`).join(' ')+
                    pts.slice().reverse().map(p=>`L${cx+p.w},${(1-p.y)*iH}`).join(' ')+'Z';
      g.append('path').attr('d',pathD).attr('fill',col).attr('opacity',0.65);
      const med = 0.38+rng()*0.22;
      const q1 = Math.max(0.06, med-0.1);
      const q3 = Math.min(0.92, med+0.1);
      const mIdx = Math.floor(nPts/2);
      const innerW = pts[mIdx].w*0.45;
      if (innerStyle==='box') {
        g.append('rect').attr('x',cx-innerW/2).attr('y',(1-q3)*iH).attr('width',innerW).attr('height',(q3-q1)*iH).attr('fill','#1d1d1f').attr('stroke',col).attr('stroke-width',1);
        g.append('circle').attr('cx',cx).attr('cy',(1-med)*iH).attr('r',3).attr('fill','#fff');
      } else if (innerStyle==='quartile') {
        [q1,med,q3].forEach(qv=>{
          g.append('line').attr('x1',cx-innerW).attr('y1',(1-qv)*iH).attr('x2',cx+innerW).attr('y2',(1-qv)*iH).attr('stroke',qv===med?'#fff':'#aaa').attr('stroke-width',qv===med?2:1);
        });
      } else if (innerStyle==='point') {
        for (let k=0;k<12;k++) {
          const py = 0.08+rng()*0.84;
          const pw = (rng()-0.5)*innerW*1.8;
          g.append('circle').attr('cx',cx+pw).attr('cy',(1-py)*iH).attr('r',1.5).attr('fill','#fff').attr('opacity',0.75);
        }
      } else if (innerStyle==='stick') {
        for (let k=0;k<12;k++) {
          const py = 0.08+rng()*0.84;
          g.append('line').attr('x1',cx-innerW*0.9).attr('y1',(1-py)*iH).attr('x2',cx+innerW*0.9).attr('y2',(1-py)*iH).attr('stroke','#fff').attr('stroke-width',0.8).attr('opacity',0.7);
        }
      }
      axisLabel(cx, iH+14, cat);
    });

  } else if (chartId === 'hist') {
    const nBins = Math.max(4, Math.min(params.bins||20, 50));
    const mu = 0.45, sig = 0.18;
    const vals = Array.from({length:nBins}, (_,i)=>{
      const x = (i+0.5)/nBins;
      return Math.exp(-Math.pow((x-mu)/sig,2)/2)*(0.7+rng()*0.18);
    });
    const bw = iW/nBins;
    g.selectAll('rect').data(vals).join('rect')
      .attr('x',(_,i)=>i*bw+1).attr('y',d=>(1-d)*iH)
      .attr('width',bw-2).attr('height',d=>d*iH)
      .attr('fill',params.color||'#7EC8E3').attr('opacity',0.85);
    if (params.kde) {
      const kdePoints = Array.from({length:60}, (_,i)=>{
        const x=i/59; return { x, y: Math.exp(-Math.pow((x-mu)/sig,2)/2)*0.92 };
      });
      g.append('path').attr('d',d3.line().x(d=>d.x*iW).y(d=>(1-d.y)*iH).curve(d3.curveBasis)(kdePoints))
        .attr('fill','none').attr('stroke','#F0D264').attr('stroke-width',2.5);
    }

  } else if (chartId === 'kde') {
    const bwScale = Math.max(0.3, params.bw||1.0);
    const sig = 0.12*bwScale;
    const nCurves = params.hue ? 3 : 1;
    const mus = [0.28, 0.48, 0.68];
    for (let gi=0;gi<nCurves;gi++) {
      const col = COLS[gi];
      const kpts = Array.from({length:60}, (_,i)=>{
        const x=i/59; return { x, y: Math.exp(-Math.pow((x-mus[gi])/sig,2)/2)*0.88 };
      });
      const kgen = d3.line().x(d=>d.x*iW).y(d=>(1-d.y)*iH).curve(d3.curveBasis);
      if (params.fill) {
        const agen = d3.area().x(d=>d.x*iW).y0(iH).y1(d=>(1-d.y)*iH).curve(d3.curveBasis);
        g.append('path').attr('d',agen(kpts)).attr('fill',col).attr('opacity',0.2);
      }
      g.append('path').attr('d',kgen(kpts)).attr('fill','none').attr('stroke',col).attr('stroke-width',2.5);
    }

  } else if (chartId === 'heatmap') {
    const n = 4;
    const cellW = iW/n, cellH = iH/n;
    const corr = [[1,0.72,-0.31,0.54],[0.72,1,0.18,-0.08],[-0.31,0.18,1,-0.63],[0.54,-0.08,-0.63,1]];
    const CMAP_FNS = {
      'coolwarm': d3.interpolateRdBu,
      'viridis': d3.interpolateViridis,
      'RdBu': d3.interpolateRdBu,
      'Blues': d3.interpolateBlues,
      'Oranges': d3.interpolateOranges,
    };
    const colorScale = d3.scaleSequential(CMAP_FNS[params.cmap]||d3.interpolateRdBu).domain([1,-1]);
    const lbls = ['X1','X2','X3','X4'];
    for (let r=0;r<n;r++) for (let c=0;c<n;c++) {
      g.append('rect').attr('x',c*cellW+1).attr('y',r*cellH+1).attr('width',cellW-2).attr('height',cellH-2).attr('fill',colorScale(corr[r][c])).attr('rx',2);
      if (params.annot) {
        const fmt = params.fmt==='.2f' ? 2 : 1;
        g.append('text').attr('x',c*cellW+cellW/2).attr('y',r*cellH+cellH/2+4).attr('text-anchor','middle')
          .attr('font-size',9).attr('fill','#fff').attr('font-weight','600').attr('font-family','JetBrains Mono, monospace')
          .text(corr[r][c].toFixed(fmt));
      }
    }
    lbls.forEach((l,i)=>axisLabel(i*cellW+cellW/2, iH+14, l));

  } else if (chartId === 'pair') {
    const n = 2;
    const cellW = iW/n, cellH = iH/n;
    const nGrp = params.hue ? 3 : 1;
    for (let r=0;r<n;r++) for (let c=0;c<n;c++) {
      g.append('rect').attr('x',c*cellW+2).attr('y',r*cellH+2).attr('width',cellW-4).attr('height',cellH-4).attr('fill','#2d2d2f').attr('rx',4);
      if (r===c) {
        if (params.diag==='kde') {
          for (let gi=0;gi<nGrp;gi++) {
            const mu = 0.25+gi*0.25;
            const kpts = Array.from({length:20},(_,i)=>{
              const x=i/19; return { x, y: Math.exp(-Math.pow((x-mu)/0.16,2)/2)*0.85 };
            });
            g.append('path').attr('d',d3.line().x(d=>c*cellW+4+d.x*(cellW-8)).y(d=>r*cellH+cellH-4-d.y*(cellH-8)).curve(d3.curveBasis)(kpts))
              .attr('fill','none').attr('stroke',COLS[gi]).attr('stroke-width',1.5);
          }
        } else {
          const nB = 6;
          for (let gi=0;gi<nGrp;gi++) {
            for (let b=0;b<nB;b++) {
              const h = (0.15+rng()*0.55)*(cellH-8)*0.8;
              const bw2 = (cellW-8)/nB/nGrp;
              g.append('rect')
                .attr('x',c*cellW+4+b*(cellW-8)/nB+gi*bw2).attr('y',r*cellH+cellH-4-h)
                .attr('width',bw2-1).attr('height',h).attr('fill',COLS[gi]).attr('opacity',0.85);
            }
          }
        }
      } else {
        for (let gi=0;gi<nGrp;gi++) {
          for (let k=0;k<8;k++) {
            g.append('circle').attr('cx',c*cellW+5+rng()*(cellW-10)).attr('cy',r*cellH+5+rng()*(cellH-10))
              .attr('r',2.5).attr('fill',params.hue?COLS[gi]:COLS[0]).attr('opacity',0.75);
          }
        }
      }
    }
    ['V1','V2'].forEach((l,i)=>axisLabel(i*cellW+cellW/2, iH+14, l));

  } else if (chartId === 'reg') {
    const order = params.order || 1;
    const col = params.color || '#7EC8E3';
    const ciW = ((params.ci||95)/100) * 0.07;
    const pts = Array.from({length:35}, ()=>({ x: 0.05+rng()*0.9, y:0 }));
    pts.forEach(p => {
      if (order===1) p.y = 0.1+p.x*0.7+(rng()-0.5)*0.16;
      else if (order===2) p.y = 0.1+0.1*p.x+0.9*p.x*p.x+(rng()-0.5)*0.13;
      else p.y = 0.7-2.2*p.x+3.5*p.x*p.x-1.5*p.x*p.x*p.x+(rng()-0.5)*0.1;
      p.y = Math.max(0.02, Math.min(0.95, p.y));
    });
    if (params.scatter) {
      g.selectAll('circle').data(pts).join('circle').attr('cx',d=>d.x*iW).attr('cy',d=>(1-d.y)*iH).attr('r',3.5).attr('fill',col).attr('opacity',0.45);
    }
    const linePts = Array.from({length:50}, (_,i)=>{
      const x = 0.05+i/49*0.9;
      let y;
      if (order===1) y = 0.1+x*0.7;
      else if (order===2) y = 0.1+0.1*x+0.9*x*x;
      else y = 0.7-2.2*x+3.5*x*x-1.5*x*x*x;
      return { x, y: Math.max(0.02, Math.min(0.95, y)) };
    });
    // CI band
    const upPts = linePts.map(p=>({ x:p.x*iW, y:(1-Math.min(0.95,p.y+ciW))*iH }));
    const dnPts = [...linePts].reverse().map(p=>({ x:p.x*iW, y:(1-Math.max(0.02,p.y-ciW))*iH }));
    g.append('path')
      .attr('d', upPts.map((p,i)=>`${i===0?'M':'L'}${p.x},${p.y}`).join(' ')+' '+dnPts.map(p=>`L${p.x},${p.y}`).join(' ')+'Z')
      .attr('fill',col).attr('opacity',0.2);
    g.append('path').attr('d',d3.line().x(d=>d.x*iW).y(d=>(1-d.y)*iH).curve(d3.curveCatmullRom)(linePts))
      .attr('fill','none').attr('stroke',col).attr('stroke-width',2.5);
  }
}

// ══════════════════════════════════════════════════════
//  initSeabornGallery()
// ══════════════════════════════════════════════════════

function initSeabornGallery(container) {
  if (!container) return null;
  const listEl = container.querySelector('.sb-list');
  const paramsEl = container.querySelector('.sb-params');
  const previewEl = container.querySelector('.sb-preview');
  const codeEl = container.querySelector('.sb-code');
  if (!listEl || !paramsEl || !previewEl || !codeEl) return null;

  let active = SEABORN_CHARTS[0];
  let params = Object.fromEntries(active.params.map(p => [p.id, p.default]));
  let editor = null;

  // Build list items
  SEABORN_CHARTS.forEach((ch, i) => {
    const item = document.createElement('div');
    item.className = 'sb-list-item';
    item.style.cssText = 'display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;border-radius:8px;transition:background 0.2s;min-height:44px;min-width:0;';
    item.innerHTML = `<span style="font-size:16px;flex-shrink:0">${ch.icon}</span><div style="min-width:0;overflow:hidden"><div style="font-weight:600;font-size:13px;color:var(--text-on-dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ch.name}</div><div style="font-size:11px;color:var(--text-on-dark-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ch.desc}</div></div>`;
    if (i === 0) item.style.background = 'rgba(126,200,227,0.12)';
    item.addEventListener('click', () => {
      listEl.querySelectorAll('.sb-list-item').forEach(el => el.style.background = '');
      item.style.background = 'rgba(126,200,227,0.12)';
      active = ch;
      params = Object.fromEntries(ch.params.map(p => [p.id, p.default]));
      renderParams();
      updatePreview();
      updateCode();
    });
    listEl.appendChild(item);
  });

  function renderParams() {
    paramsEl.innerHTML = `<div style="font-weight:600;font-size:14px;color:var(--text-on-dark);margin-bottom:14px;font-family:var(--font-code)">${active.name}</div>`;
    active.params.forEach(p => {
      const row = document.createElement('div');
      row.style.marginBottom = '12px';
      if (p.type === 'select') {
        row.innerHTML = `<label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">${p.label}</label>
          <select data-pid="${p.id}" style="width:100%;background:#2d2d2f;color:var(--text-on-dark);border:1px solid var(--border-dark);border-radius:6px;padding:6px 8px;font-size:12px;min-height:36px">
            ${p.options.map(o => `<option value="${o}" ${o === params[p.id] ? 'selected' : ''}>${o}</option>`).join('')}
          </select>`;
      } else if (p.type === 'range') {
        row.innerHTML = `<label style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">
          <span>${p.label}</span><span class="pval-${p.id}">${params[p.id]}</span></label>
          <input type="range" data-pid="${p.id}" min="${p.min}" max="${p.max}" step="${p.step}" value="${params[p.id]}"
            style="width:100%;accent-color:var(--accent);min-height:32px;cursor:pointer">`;
      } else if (p.type === 'checkbox') {
        row.innerHTML = `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;color:var(--text-on-dark-2);min-height:44px">
          <input type="checkbox" data-pid="${p.id}" ${params[p.id] ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--accent)">
          ${p.label}</label>`;
      }
      paramsEl.appendChild(row);
    });
    paramsEl.querySelectorAll('[data-pid]').forEach(el => {
      el.addEventListener('change', () => {
        const pid = el.dataset.pid;
        if (el.type === 'checkbox') params[pid] = el.checked;
        else if (el.type === 'range') params[pid] = parseFloat(el.value);
        else params[pid] = el.value;
        const valEl = paramsEl.querySelector(`.pval-${pid}`);
        if (valEl) valEl.textContent = params[pid];
        updatePreview();
        updateCode();
      });
    });
  }

  function updatePreview() {
    previewEl.innerHTML = '';
    const W = Math.max(previewEl.clientWidth || 0, 180);
    const H = 320;
    const svg = d3.select(previewEl).append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('width', '100%').style('height', 'auto').style('display', 'block');
    renderChartPreview(svg, active.id, params, W, H);
  }

  function updateCode() {
    const code = active.genCode(params);
    if (editor) {
      editor.setCode(code);
    } else {
      editor = createCodeEditor(codeEl, {
        language: 'python',
        code,
        readOnly: window.innerWidth < 768,
      });
    }
  }

  renderParams();
  updatePreview();
  updateCode();

  return {
    destroy() {
      if (editor) { try { editor.destroy(); } catch {} editor = null; }
    }
  };
}

// ══════════════════════════════════════════════════════
//  drawMiniCompareChart() — illustrative mini chart per concept
// ══════════════════════════════════════════════════════

function drawMiniCompareChart(container, concept) {
  const W = 130, H = 80;
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', 'auto').style('display', 'block');
  svg.append('rect').attr('width', W).attr('height', H).attr('fill', '#1d1d1f').attr('rx', 6);
  const pad = { t: 10, r: 10, b: 16, l: 18 };
  const g = svg.append('g').attr('transform', `translate(${pad.l},${pad.t})`);
  const iW = W - pad.l - pad.r, iH = H - pad.t - pad.b;
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#424245').attr('stroke-width',0.8);
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH).attr('stroke','#424245').attr('stroke-width',0.8);
  const COLS = ['#7EC8E3','#95D5B2','#B8B8E8','#F0B27A'];
  const rng = seededRng9(concept.length * 7 + 1);

  if (concept === '散点图') {
    for (let i = 0; i < 22; i++) {
      g.append('circle').attr('cx', rng()*iW).attr('cy', rng()*iH)
        .attr('r', 2.5).attr('fill', COLS[Math.floor(rng()*3)]).attr('opacity', 0.8);
    }
  } else if (concept === '折线图') {
    const d1=[0.55,0.35,0.65,0.45,0.75,0.6,0.85], d2=[0.25,0.15,0.3,0.2,0.4,0.28,0.45];
    const xS=d3.scaleLinear().domain([0,6]).range([0,iW]);
    const yS=d3.scaleLinear().domain([0,1]).range([iH,0]);
    const ln=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
    g.append('path').attr('d',ln(d1)).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',1.8);
    g.append('path').attr('d',ln(d2)).attr('fill','none').attr('stroke','#95D5B2').attr('stroke-width',1.8);
  } else if (concept === '柱状图') {
    const vals=[0.55,0.8,0.4,0.65];
    const xS=d3.scaleBand().domain([0,1,2,3]).range([0,iW]).padding(0.2);
    vals.forEach((v,i) => {
      const bH=v*iH;
      g.append('rect').attr('x',xS(i)).attr('y',iH-bH).attr('width',xS.bandwidth())
        .attr('height',bH).attr('fill',COLS[i]).attr('rx',2).attr('opacity',0.9);
    });
  } else if (concept === '分面 Facet') {
    const pW=(iW-4)/2, pH=(iH-4)/2;
    [[0,0],[1,0],[0,1],[1,1]].forEach(([c,r],pi) => {
      const px=c*(pW+4), py=r*(pH+4);
      g.append('rect').attr('x',px).attr('y',py).attr('width',pW).attr('height',pH)
        .attr('fill','#2a2a2d').attr('rx',2);
      const rng2=seededRng9(pi*13+3);
      for (let i=0;i<5;i++) {
        g.append('circle').attr('cx',px+3+rng2()*(pW-6)).attr('cy',py+3+rng2()*(pH-6))
          .attr('r',2).attr('fill',COLS[pi]).attr('opacity',0.85);
      }
    });
  } else if (concept === '主题样式') {
    [0.25,0.5,0.75,1].forEach(y => {
      g.append('line').attr('x1',0).attr('y1',y*iH).attr('x2',iW).attr('y2',y*iH)
        .attr('stroke','#333336').attr('stroke-dasharray','2,2').attr('stroke-width',0.6);
    });
    const d=[0.3,0.5,0.42,0.68,0.55,0.78];
    const xS=d3.scaleLinear().domain([0,5]).range([0,iW]);
    const yS=d3.scaleLinear().domain([0,1]).range([iH,0]);
    const ln=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
    g.append('path').attr('d',ln(d)).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',1.8);
  } else if (concept === '配色 Scale') {
    const defs=svg.append('defs');
    const grad=defs.append('linearGradient').attr('id',`cg${concept.length}`).attr('x1','0%').attr('x2','100%');
    grad.append('stop').attr('offset','0%').attr('stop-color','#3B4CC0');
    grad.append('stop').attr('offset','50%').attr('stop-color','#95D5B2');
    grad.append('stop').attr('offset','100%').attr('stop-color','#F0B27A');
    g.append('rect').attr('x',0).attr('y',iH/2-5).attr('width',iW).attr('height',12)
      .attr('fill',`url(#cg${concept.length})`).attr('rx',3);
    ['#3B4CC0','#6A8FD5','#95D5B2','#F0C070','#F0B27A'].forEach((c,i) => {
      g.append('circle').attr('cx',(i+0.5)*iW/5).attr('cy',iH/2-18).attr('r',6).attr('fill',c);
    });
  } else if (concept === '标注 Annotate') {
    const d=[0.25,0.45,0.38,0.7,0.55,0.65];
    const xS=d3.scaleLinear().domain([0,5]).range([0,iW]);
    const yS=d3.scaleLinear().domain([0,1]).range([iH,0]);
    const ln=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
    g.append('path').attr('d',ln(d)).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',1.8);
    const ax=xS(3), ay=yS(0.7);
    g.append('circle').attr('cx',ax).attr('cy',ay).attr('r',4).attr('fill','#F0B27A');
    g.append('line').attr('x1',ax).attr('y1',ay).attr('x2',ax-15).attr('y2',ay-18)
      .attr('stroke','#F0B27A').attr('stroke-width',1.2);
    g.append('text').attr('x',ax-16).attr('y',ay-20).attr('fill','#F0B27A').attr('font-size',8)
      .attr('text-anchor','end').attr('font-family','sans-serif').text('关键点');
  } else if (concept === '保存图片') {
    const dW=32, dH=42, dx=(iW-dW)/2, dy=(iH-dH)/2-4;
    g.append('path').attr('d',`M${dx},${dy+8} L${dx+8},${dy} L${dx+dW},${dy} L${dx+dW},${dy+dH} L${dx},${dy+dH} Z`)
      .attr('fill','#2a2a2d').attr('stroke','#424245').attr('stroke-width',1.2);
    g.append('path').attr('d',`M${dx},${dy+8} L${dx+8},${dy+8} L${dx+8},${dy}`)
      .attr('fill','none').attr('stroke','#424245').attr('stroke-width',1);
    const mx=dx+dW/2, my=dy+dH/2+4;
    g.append('line').attr('x1',mx).attr('y1',my-8).attr('x2',mx).attr('y2',my+6)
      .attr('stroke','#7EC8E3').attr('stroke-width',1.5);
    g.append('path').attr('d',`M${mx-4},${my+2} L${mx},${my+7} L${mx+4},${my+2}`)
      .attr('fill','#7EC8E3');
    g.append('text').attr('x',mx).attr('y',dy+dH+12).attr('fill','#7EC8E3').attr('font-size',7)
      .attr('text-anchor','middle').attr('font-family','sans-serif').text('PDF/SVG');
  }
}

// ══════════════════════════════════════════════════════
//  initCompareTable()
// ══════════════════════════════════════════════════════

function initCompareTable(container) {
  if (!container) return;
  const rowsEl = container.querySelector('#compare-rows');
  const tabsEl = container.querySelector('.compare-tabs');
  if (!rowsEl) return;

  // Column header row
  const header = document.createElement('div');
  header.className = 'compare-header-row';
  header.style.cssText = 'display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;padding:8px 0 10px;border-bottom:2px solid var(--border-light);margin-bottom:4px;';
  header.innerHTML = `
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">概念</div>
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">示意图</div>
    <div style="font-size:11px;font-weight:600;color:#7EC8E3;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">🐍 Python / matplotlib</div>
    <div style="font-size:11px;font-weight:600;color:#95D5B2;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">📊 R / ggplot2</div>`;
  rowsEl.appendChild(header);

  MPL_GGPLOT_COMPARE.forEach(item => {
    const row = document.createElement('div');
    row.className = 'compare-row';
    row.style.cssText = 'display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;border-top:1px solid var(--border-light);padding:16px 0;align-items:start;';
    row.innerHTML = `
      <div style="font-weight:600;color:var(--accent);font-size:13px;padding-top:4px;font-family:var(--font-code);line-height:1.5">${item.concept}</div>
      <div class="cmp-mini-wrap" style="border-radius:6px;overflow:hidden;"></div>
      <pre class="compare-python" style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${item.python}</pre>
      <pre class="compare-r" style="background:#f5f5f7;color:#1d1d1f;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${item.r}</pre>`;
    rowsEl.appendChild(row);
    drawMiniCompareChart(row.querySelector('.cmp-mini-wrap'), item.concept);
  });

  // Mobile: tab switcher to show Python or R
  if (window.innerWidth <= 768 && tabsEl) {
    tabsEl.style.display = 'flex';
    // Initially hide R column
    rowsEl.querySelectorAll('.compare-r').forEach(el => el.style.display = 'none');
    tabsEl.querySelectorAll('.compare-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabsEl.querySelectorAll('.compare-tab').forEach(t => {
          t.style.background = 'var(--bg-light-alt)';
          t.style.color = 'var(--text-on-light)';
          t.style.border = '1px solid var(--border-light)';
        });
        tab.style.background = 'var(--accent)';
        tab.style.color = '#1d1d1f';
        tab.style.border = 'none';
        const lang = tab.dataset.lang;
        rowsEl.querySelectorAll('.compare-python').forEach(el => {
          el.style.display = lang === 'python' ? 'block' : 'none';
        });
        rowsEl.querySelectorAll('.compare-r').forEach(el => {
          el.style.display = lang === 'r' ? 'block' : 'none';
        });
      });
    });
  }
}

// ══════════════════════════════════════════════════════
//  annotate Canvas helpers
// ══════════════════════════════════════════════════════

function drawArrow9(ctx, x1, y1, x2, y2, color) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const len = 10;
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - len * Math.cos(angle - 0.4), y2 - len * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - len * Math.cos(angle + 0.4), y2 - len * Math.sin(angle + 0.4));
  ctx.closePath(); ctx.fill();
}

function hitTest9(ann, pos) {
  const bx = ann.type === 'arrow' ? Math.min(ann.x1, ann.x2) : ann.x;
  const by = ann.type === 'arrow' ? Math.min(ann.y1, ann.y2) : ann.y;
  const bw = ann.type === 'arrow' ? Math.abs(ann.x2 - ann.x1) + 20 : (ann.w || 60);
  const bh = ann.type === 'arrow' ? Math.abs(ann.y2 - ann.y1) + 20 : (ann.h || 40);
  return pos.x >= bx - 10 && pos.x <= bx + bw + 10 &&
         pos.y >= by - 10 && pos.y <= by + bh + 10;
}

// ══════════════════════════════════════════════════════
//  initAnnotateCanvas()
// ══════════════════════════════════════════════════════

function initAnnotateCanvas(container) {
  if (!container) return null;
  const canvas = container.querySelector('#annotate-canvas');
  const toolbar = container.querySelector('.annotate-toolbar');
  const codeWrap = container.querySelector('.ann-code-editor');
  if (!canvas || !toolbar || !codeWrap) return null;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let annEditor = null;
  const annotations = [];
  let activeType = 'arrow';
  let dragging = null;
  let dragOffset = { x: 0, y: 0 };
  let startPos = null;

  // Toolbar buttons
  const toolDefs = [
    { type: 'arrow', label: '↗ 箭头' },
    { type: 'text',  label: 'T 文字' },
    { type: 'rect',  label: '□ 方框' },
    { type: 'highlight', label: '◆ 高亮' },
  ];
  toolDefs.forEach(td => {
    const btn = document.createElement('button');
    btn.textContent = td.label;
    btn.dataset.type = td.type;
    btn.style.cssText = 'padding:8px 14px;min-height:44px;background:#2d2d2f;border:1px solid var(--border-dark);border-radius:8px;color:var(--text-on-dark);cursor:pointer;font-size:13px;transition:background 0.2s;white-space:nowrap;';
    if (td.type === 'arrow') btn.style.background = 'rgba(126,200,227,0.18)';
    btn.addEventListener('click', () => {
      toolbar.querySelectorAll('button[data-type]').forEach(b => b.style.background = '#2d2d2f');
      btn.style.background = 'rgba(126,200,227,0.18)';
      activeType = td.type;
    });
    toolbar.appendChild(btn);
  });
  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = '重置';
  resetBtn.style.cssText = 'padding:8px 14px;min-height:44px;background:transparent;border:1px solid var(--border-dark);border-radius:8px;color:var(--accent);cursor:pointer;font-size:13px;margin-left:auto;white-space:nowrap;';
  resetBtn.addEventListener('click', () => {
    annotations.length = 0;
    redraw();
    updateAnnotateCode();
  });
  toolbar.appendChild(resetBtn);

  function resizeCanvas() {
    const W = canvas.parentElement.clientWidth || 400;
    const H = Math.round(Math.min(W * 0.55, 380));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawBase();
    drawAnnotations();
  }

  function drawBase() {
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    ctx.fillStyle = '#1d1d1f';
    ctx.fillRect(0, 0, W, H);
    // axes
    ctx.strokeStyle = '#424245'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(55,15); ctx.lineTo(55,H-30); ctx.lineTo(W-15,H-30); ctx.stroke();
    // chart data (line)
    const data = [30,80,55,120,95,150,110,170,140,185];
    const xStep = (W - 80) / (data.length - 1);
    const yScale = (H - 55) / 200;
    const pts = data.map((v, i) => ({ x: 55 + i * xStep, y: H - 30 - v * yScale }));
    ctx.strokeStyle = '#7EC8E3'; ctx.lineWidth = 2;
    ctx.beginPath(); pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)); ctx.stroke();
    ctx.fillStyle = '#7EC8E3';
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill(); });
    // labels
    ctx.fillStyle = '#6e6e73'; ctx.font = '11px sans-serif';
    ctx.fillText('时间', W/2 - 10, H - 8);
    ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('值', -8, 0); ctx.restore();
  }

  function drawAnnotations() {
    annotations.forEach(ann => {
      ctx.save();
      if (ann.type === 'arrow') {
        drawArrow9(ctx, ann.x1, ann.y1, ann.x2, ann.y2, '#F0D264');
        ctx.fillStyle = '#F0D264'; ctx.font = 'bold 11px sans-serif';
        ctx.fillText(ann.label || '峰值', ann.x2 + 6, ann.y2 - 4);
      } else if (ann.type === 'text') {
        ctx.font = '12px sans-serif';
        const tw = ctx.measureText(ann.label || '标注').width;
        ctx.fillStyle = 'rgba(240,210,100,0.9)';
        ctx.fillRect(ann.x - 3, ann.y - 14, tw + 8, 18);
        ctx.fillStyle = '#1d1d1f';
        ctx.fillText(ann.label || '标注', ann.x + 1, ann.y);
      } else if (ann.type === 'rect') {
        ctx.strokeStyle = '#E07A7A'; ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(ann.x, ann.y, ann.w || 70, ann.h || 45);
        ctx.setLineDash([]);
      } else if (ann.type === 'highlight') {
        ctx.fillStyle = 'rgba(240,178,122,0.22)';
        ctx.fillRect(ann.x, ann.y, ann.w || 70, ann.h || 45);
        ctx.strokeStyle = '#F0B27A'; ctx.lineWidth = 1.5;
        ctx.strokeRect(ann.x, ann.y, ann.w || 70, ann.h || 45);
      }
      ctx.restore();
    });
  }

  function redraw() { drawBase(); drawAnnotations(); }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.clientWidth / rect.width;
    const scaleY = canvas.clientHeight / rect.height;
    const clientX = e.clientX ?? (e.touches?.[0]?.clientX ?? 0);
    const clientY = e.clientY ?? (e.touches?.[0]?.clientY ?? 0);
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
  }

  canvas.addEventListener('pointerdown', e => {
    e.preventDefault();
    canvas.setPointerCapture(e.pointerId);
    const pos = getPos(e);
    dragging = annotations.slice().reverse().find(a => hitTest9(a, pos)) || null;
    if (dragging) {
      dragOffset = { x: pos.x - (dragging.x ?? dragging.x1), y: pos.y - (dragging.y ?? dragging.y1) };
    } else {
      startPos = pos;
    }
  });

  canvas.addEventListener('pointermove', e => {
    if (!dragging && !startPos) return;
    const pos = getPos(e);
    if (dragging) {
      const dx = pos.x - dragOffset.x - (dragging.x ?? dragging.x1);
      const dy = pos.y - dragOffset.y - (dragging.y ?? dragging.y1);
      if (dragging.type === 'arrow') {
        dragging.x1 += dx; dragging.y1 += dy; dragging.x2 += dx; dragging.y2 += dy;
      } else {
        dragging.x += dx; dragging.y += dy;
      }
      dragOffset = { x: pos.x - (dragging.x ?? dragging.x1), y: pos.y - (dragging.y ?? dragging.y1) };
      redraw();
    }
  });

  canvas.addEventListener('pointerup', e => {
    if (!dragging && startPos) {
      const pos = getPos(e);
      if (activeType === 'arrow') {
        annotations.push({ type: 'arrow', x1: startPos.x, y1: startPos.y, x2: pos.x, y2: pos.y, label: '关键点' });
      } else if (activeType === 'text') {
        annotations.push({ type: 'text', x: pos.x, y: pos.y, label: '标注文字' });
      } else {
        const dx = pos.x - startPos.x, dy = pos.y - startPos.y;
        annotations.push({ type: activeType, x: Math.min(startPos.x, pos.x), y: Math.min(startPos.y, pos.y), w: Math.abs(dx) || 70, h: Math.abs(dy) || 45 });
      }
      redraw();
      updateAnnotateCode();
    }
    dragging = null; startPos = null;
  });

  function updateAnnotateCode() {
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const toX = v => ((v - 55) / (W - 80) * 10).toFixed(1);
    const toY = v => ((H - 30 - v) / (H - 55) * 200).toFixed(0);
    const lines = [
      'import matplotlib.pyplot as plt',
      '',
      'fig, ax = plt.subplots(figsize=(8, 6), dpi=150)',
      '# ... 绘制图表数据 ...',
      '',
    ];
    annotations.forEach(a => {
      if (a.type === 'arrow') {
        lines.push(`ax.annotate("${a.label || '关键点'}",`);
        lines.push(`    xy=(${toX(a.x2)}, ${toY(a.y2)}),`);
        lines.push(`    xytext=(${toX(a.x1)}, ${toY(a.y1)}),`);
        lines.push(`    arrowprops=dict(arrowstyle="->", color="#F0D264"),`);
        lines.push(`    color="#F0D264", fontsize=10)`);
      } else if (a.type === 'text') {
        lines.push(`ax.text(${toX(a.x)}, ${toY(a.y)}, "标注文字",`);
        lines.push(`    fontsize=10, color="#F0D264")`);
      } else if (a.type === 'rect' || a.type === 'highlight') {
        lines.push(`from matplotlib.patches import FancyBboxPatch`);
        lines.push(`rect = FancyBboxPatch((${toX(a.x)}, ${toY(a.y + (a.h||45))}),`);
        lines.push(`    ${((a.w||70)/(W-80)*10).toFixed(1)}, ${((a.h||45)/(H-55)*200).toFixed(0)},`);
        lines.push(`    boxstyle="round,pad=0.1",`);
        lines.push(`    fill=${a.type==='highlight' ? 'True' : 'False'},`);
        lines.push(`    alpha=0.2, color="#F0B27A")`);
        lines.push(`ax.add_patch(rect)`);
      }
      lines.push('');
    });
    lines.push('plt.tight_layout()');
    const code = lines.join('\n');
    if (annEditor) { annEditor.setCode(code); }
    else { annEditor = createCodeEditor(codeWrap, { language: 'python', code, readOnly: window.innerWidth < 768 }); }
  }

  resizeCanvas();
  updateAnnotateCode();

  const onResize = () => { resizeCanvas(); updateAnnotateCode(); };
  window.addEventListener('resize', onResize);

  return {
    destroy() {
      window.removeEventListener('resize', onResize);
      if (annEditor) { try { annEditor.destroy(); } catch {} annEditor = null; }
    }
  };
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
.p9-scroll-hint { color:var(--text-on-dark-3); font-size:13px; margin-top:24px; }
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
/* Story block 2-column grid */
.story-grid { display:grid; grid-template-columns:minmax(200px,340px) 1fr; gap:32px; align-items:start; }
@media (max-width: 768px) { .story-grid { grid-template-columns:1fr !important; } }
/* Storytelling blocks responsive */
@media (max-width: 768px) {
  #s5-storytelling .story-block { margin-bottom: 40px !important; }
}
/* Compare table mobile: responsive via CSS */
#compare-rows pre { min-width: 0; }
@media (max-width: 768px) {
  .compare-row { grid-template-columns: 80px 1fr !important; }
  .compare-header-row { display: none !important; }
  .cmp-mini-wrap { display: none !important; }
}
/* Seaborn params + preview on small screens */
@media (max-width: 600px) {
  .sb-right > div:first-child { flex-direction: column !important; }
  .sb-params { width: 100% !important; }
}
/* Annotate toolbar wraps on small screens */
.annotate-toolbar { flex-wrap: wrap; }
</style>

<!-- ══════════════════ HERO ══════════════════ -->
<section class="section-dark section-hero-full p9-hero">
  <p class="hero-eyebrow">Module 01 / Page 09</p>
  <h1 class="page-hero-title">Python 可视化与数据叙事</h1>
  <p class="page-hero-sub">Python Visualization &amp; Data Storytelling</p>
  <p class="page-hero-tagline" style="max-width:540px">用 matplotlib 与 seaborn 制作出版级图表，让数据开口说话。</p>
  <nav class="hero-quicknav" id="p09-quicknav">
    <button class="hero-quicknav__item" data-target="#s1-matplotlib-hierarchy">matplotlib 层次</button>
    <button class="hero-quicknav__item" data-target="#s2-seaborn-gallery">seaborn 速查</button>
    <button class="hero-quicknav__item" data-target="#s3-mpl-vs-ggplot">语法对照</button>
    <button class="hero-quicknav__item" data-target="#s4-annotate-canvas">标注演示</button>
    <button class="hero-quicknav__item" data-target="#s5-storytelling">数据叙事</button>
  </nav>
  <p class="p9-scroll-hint">↓ 向下探索</p>
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
  <h2 class="page-footer-quote">好图表不是装饰，而是论点本身的延伸</h2>
  <p class="page-footer-desc">下一页：科研绘图工作流与导出 — 从数据到出版级图表的完整流程</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p9-prev-btn">← R 配色方案</button>
    <button class="btn-primary" id="p9-next-btn">工作流与导出 →</button>
  </div>
</section>

</div>
`;
}

// ══════════════════════════════════════════════════════
//  Section 5: 图表叙事四种方法
// ══════════════════════════════════════════════════════

function initColorContrast(el) {
  if (!el) return;
  el.innerHTML = `
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法一</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">颜色对比突出关键数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将需要强调的数据组染成鲜明颜色，其余保持灰色——读者视线被自动吸引。</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <button class="cc-btn active" data-group="all" style="padding:6px 16px;min-height:36px;border-radius:20px;border:none;background:var(--accent);color:#1d1d1f;font-size:13px;cursor:pointer;font-weight:600">全部</button>
          <button class="cc-btn" data-group="A" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 A 组</button>
          <button class="cc-btn" data-group="B" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 B 组</button>
          <button class="cc-btn" data-group="C" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 C 组</button>
        </div>
      </div>
      <div class="cc-svg-wrap"></div>
    </div>`;

  const rng = seededRng9(55);
  const groups = ['A','B','C','D'];
  const groupColors = { A:'#7EC8E3', B:'#95D5B2', C:'#F0B27A', D:'#B8B8E8' };
  const pts = Array.from({length:60}, () => {
    const g = groups[Math.floor(rng()*4)];
    return { x: 0.05+rng()*0.9, y: 0.05+rng()*0.9, g };
  });

  const W = 480, H = 280;
  const svg = d3.select(el.querySelector('.cc-svg-wrap')).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio','xMidYMid meet')
    .style('width','100%').style('height','auto')
    .style('background','var(--bg-light-alt)').style('border-radius','10px');

  const pad = {t:15,r:15,b:30,l:40};
  const g = svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
  const iW = W-pad.l-pad.r, iH = H-pad.t-pad.b;
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#d2d2d7').attr('stroke-width',1);
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH).attr('stroke','#d2d2d7').attr('stroke-width',1);

  const circles = g.selectAll('circle').data(pts).join('circle')
    .attr('cx', d=>d.x*iW).attr('cy', d=>(1-d.y)*iH)
    .attr('r', 5).attr('fill', d=>groupColors[d.g]).attr('opacity',0.75);

  function updateHighlight(group) {
    circles.transition().duration(400)
      .attr('fill', d => group==='all' ? groupColors[d.g] : (d.g===group ? groupColors[d.g] : '#d2d2d7'))
      .attr('opacity', d => group==='all' ? 0.75 : (d.g===group ? 0.9 : 0.3));
    el.querySelectorAll('.cc-btn').forEach(btn => {
      const active = btn.dataset.group === group;
      btn.style.background = active ? 'var(--accent)' : 'transparent';
      btn.style.color = active ? '#1d1d1f' : 'var(--text-on-light-2)';
      btn.style.fontWeight = active ? '600' : '400';
    });
  }
  el.querySelectorAll('.cc-btn').forEach(btn => {
    btn.addEventListener('click', () => updateHighlight(btn.dataset.group));
  });
}

function initAnnotationFlow(el) {
  if (!el) return;
  el.innerHTML = `
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法二</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">标注引导阅读顺序</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将分析结论直接写在图表上，箭头和文字标注引导读者按预设顺序理解数据。</p>
        <button id="af-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放标注</button>
      </div>
      <div class="af-svg-wrap"></div>
    </div>`;

  const W=500, H=260;
  const svg = d3.select(el.querySelector('.af-svg-wrap')).append('svg')
    .attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet')
    .style('width','100%').style('height','auto')
    .style('background','var(--bg-light-alt)').style('border-radius','10px');

  const pad={t:20,r:20,b:35,l:45};
  const g=svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
  const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#d2d2d7').attr('stroke-width',1);
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH).attr('stroke','#d2d2d7').attr('stroke-width',1);

  const data = [18,32,28,55,48,72,65,88,78,95];
  const xS = d3.scaleLinear().domain([0,9]).range([0,iW]);
  const yS = d3.scaleLinear().domain([0,100]).range([iH,0]);
  const lineGen = d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
  g.append('path').attr('d',lineGen(data)).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',2.5);
  g.selectAll('circle').data(data).join('circle')
    .attr('cx',(_,i)=>xS(i)).attr('cy',d=>yS(d)).attr('r',4).attr('fill','#7EC8E3');

  const annotations = [
    { x:xS(3), y:yS(55), label:'转折点 ↑',  tx:-15, ty:-32 },
    { x:xS(7), y:yS(88), label:'高峰值',     tx:-52, ty:22  },
    { x:xS(9), y:yS(95), label:'终点 95',    tx:-58, ty:28  },
  ];
  const annG = g.append('g').attr('class','ann-layer');
  const annItems = annotations.map(a => {
    const grp = annG.append('g').style('opacity','0');
    grp.append('line').attr('x1',a.x).attr('y1',a.y).attr('x2',a.x+a.tx*0.65).attr('y2',a.y+a.ty*0.65)
       .attr('stroke','#F0D264').attr('stroke-width',1.5)
       .attr('marker-end','url(#arrow-marker)');
    grp.append('text').attr('x',a.x+a.tx).attr('y',a.y+a.ty)
       .attr('fill','#F0D264').attr('font-size',11).attr('font-weight','600')
       .attr('font-family','sans-serif').attr('text-anchor', a.tx < 0 ? 'end' : 'start').text(a.label);
    return grp;
  });
  // arrow marker
  const defs = svg.append('defs');
  const marker = defs.append('marker').attr('id','arrow-marker')
    .attr('markerWidth',8).attr('markerHeight',8).attr('refX',6).attr('refY',3).attr('orient','auto');
  marker.append('path').attr('d','M0,0 L0,6 L8,3 z').attr('fill','#F0D264');

  let playing = false;
  el.querySelector('#af-play-btn').addEventListener('click', () => {
    if (playing) return;
    playing = true;
    annItems.forEach(grp => grp.style('opacity','0'));
    annItems.forEach((grp, i) => {
      gsap.to(grp.node(), { opacity:1, duration:0.5, delay: i * 0.8 + 0.2,
        onComplete: i===annItems.length-1 ? ()=>{ playing=false; } : undefined });
    });
  });
}

function initGreyOut(el) {
  if (!el) return;
  el.innerHTML = `
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法三</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">灰化非重点数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:12px">将非核心数据调成低饱和度灰色，让重点数据自然浮现。</p>
        <p style="color:var(--text-on-light-3);font-size:13px;line-height:1.6;font-style:italic">↗ 悬停右侧柱子体验效果</p>
      </div>
      <div class="go-svg-wrap"></div>
    </div>`;

  const cats=['一月','二月','三月','四月','五月','六月'];
  const vals=[42,68,55,80,63,91];
  const colors=['#7EC8E3','#95D5B2','#F0B27A','#B8B8E8','#E07A7A','#F0D264'];
  const W=480, H=260;
  const svg=d3.select(el.querySelector('.go-svg-wrap')).append('svg')
    .attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet')
    .style('width','100%').style('height','auto')
    .style('background','var(--bg-light-alt)').style('border-radius','10px');

  const pad={t:15,r:20,b:35,l:45};
  const g=svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
  const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#d2d2d7');
  const xS=d3.scaleBand().domain(cats).range([0,iW]).padding(0.25);
  const yS=d3.scaleLinear().domain([0,100]).range([iH,0]);
  g.selectAll('text.xt').data(cats).join('text').attr('class','xt')
    .attr('x',d=>xS(d)+xS.bandwidth()/2).attr('y',iH+16)
    .attr('text-anchor','middle').attr('font-size',11).attr('fill','#6e6e73').text(d=>d);

  const bars=g.selectAll('rect').data(vals).join('rect')
    .attr('x',(_,i)=>xS(cats[i])).attr('y',d=>yS(d))
    .attr('width',xS.bandwidth()).attr('height',d=>iH-yS(d))
    .attr('fill',(_,i)=>colors[i]).attr('rx',3).attr('opacity',0.85)
    .style('cursor','pointer');

  bars.on('mouseover', function(event, d) {
    const idx = Array.from(this.parentNode.querySelectorAll('rect')).indexOf(this);
    bars.transition().duration(200)
      .attr('fill', (_, i) => i === idx ? colors[i] : '#d2d2d7')
      .attr('opacity', (_, i) => i === idx ? 1 : 0.5);
  }).on('mouseout', () => {
    bars.transition().duration(200)
      .attr('fill', (_, i) => colors[i]).attr('opacity', 0.85);
  });
}

function initStepReveal(el) {
  if (!el) return;
  el.innerHTML = `
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法四</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">分步揭示</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">按时间顺序或分析步骤逐步展示数据，引导读者跟随叙事节奏理解趋势。</p>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <button id="sr-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放</button>
          <button id="sr-reset-btn" style="padding:8px 16px;min-height:40px;background:transparent;border:1px solid var(--border-light);border-radius:8px;cursor:pointer;font-size:13px;color:var(--text-on-light-2)">重置</button>
          <span id="sr-step-label" style="font-size:13px;color:var(--text-on-light-3);font-family:var(--font-code)">0 / 10</span>
        </div>
      </div>
      <div class="sr-svg-wrap"></div>
    </div>`;

  const data=[12,28,22,45,38,62,55,75,68,88];
  const W=480, H=250;
  const svg=d3.select(el.querySelector('.sr-svg-wrap')).append('svg')
    .attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet')
    .style('width','100%').style('height','auto')
    .style('background','var(--bg-light-alt)').style('border-radius','10px');

  const pad={t:15,r:15,b:30,l:45};
  const g=svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
  const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH).attr('stroke','#d2d2d7');
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH).attr('stroke','#d2d2d7');

  const xS=d3.scaleLinear().domain([0,9]).range([0,iW]);
  const yS=d3.scaleLinear().domain([0,100]).range([iH,0]);

  const allCircles=g.selectAll('circle.sr-dot').data(data).join('circle')
    .attr('class','sr-dot').attr('cx',(_,i)=>xS(i)).attr('cy',d=>yS(d))
    .attr('r',5).attr('fill','#7EC8E3').attr('opacity',0);

  const pathEl=g.append('path').attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',2.5).attr('opacity',0);

  let step=0, timer=null;
  const stepLabel=el.querySelector('#sr-step-label');

  function showStep(n) {
    step=n;
    if(stepLabel) stepLabel.textContent=`${n} / ${data.length}`;
    allCircles.attr('opacity',(_,i)=>i<n?0.85:0);
    if(n>1){
      const visData=data.slice(0,n);
      const lineGen=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
      pathEl.attr('d',lineGen(visData)).attr('opacity',1);
    } else { pathEl.attr('opacity',0); }
  }

  el.querySelector('#sr-play-btn').addEventListener('click',()=>{
    if(timer) return;
    showStep(0);
    let cur=0;
    timer=setInterval(()=>{
      cur++;
      showStep(cur);
      if(cur>=data.length){ clearInterval(timer); timer=null; }
    },500);
  });
  el.querySelector('#sr-reset-btn').addEventListener('click',()=>{
    if(timer){ clearInterval(timer); timer=null; }
    showStep(0);
  });
}

function initStoryCompare(el) {
  if (!el) return;
  el.innerHTML = `
    <div style="margin-bottom:20px;padding-top:20px;border-top:1px solid var(--border-light)">
      <h3 style="font:700 1.3rem var(--font-display);color:var(--text-on-light);margin-bottom:8px">好/差标注对比</h3>
      <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">同样的折线图，标注质量决定可读性。</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
      <div>
        <div style="text-align:center;margin-bottom:8px;font-size:13px;color:#E07A7A;font-weight:600">✗ 标注混乱</div>
        <div class="sc-bad-wrap"></div>
        <p style="font-size:12px;color:var(--text-on-light-3);margin-top:8px;line-height:1.6">过多标注、颜色杂乱、视线无法聚焦</p>
      </div>
      <div>
        <div style="text-align:center;margin-bottom:8px;font-size:13px;color:#95D5B2;font-weight:600">✓ 精准引导</div>
        <div class="sc-good-wrap"></div>
        <p style="font-size:12px;color:var(--text-on-light-3);margin-top:8px;line-height:1.6">只标最关键一个点，简洁有力</p>
      </div>
    </div>`;

  // Mobile: switch to single column
  const grid = el.querySelector('div[style*="grid-template-columns"]');
  if (window.innerWidth <= 600 && grid) grid.style.gridTemplateColumns = '1fr';

  function drawBadChart(wrap) {
    const W=300, H=180;
    const svg=d3.select(wrap).append('svg').attr('viewBox',`0 0 ${W} ${H}`)
      .attr('preserveAspectRatio','xMidYMid meet').style('width','100%').style('height','auto')
      .style('background','var(--bg-light-alt)').style('border-radius','8px');
    const pad={t:15,r:15,b:25,l:35};
    const g=svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
    const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
    const data=[20,35,28,55,48,70];
    const xS=d3.scaleLinear().domain([0,5]).range([0,iW]);
    const yS=d3.scaleLinear().domain([0,80]).range([iH,0]);
    const lineGen=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
    g.append('path').attr('d',lineGen(data)).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',2);
    // too many annotations in clashing colors
    const badAnns=[
      {x:xS(1),y:yS(35),label:'增长?',color:'#E64B35'},
      {x:xS(2),y:yS(28),label:'下降!',color:'#F0B27A'},
      {x:xS(3),y:yS(55),label:'最高点',color:'#4DBBD5'},
      {x:xS(4),y:yS(48),label:'又降了',color:'#00A087'},
      {x:xS(5),y:yS(70),label:'高点',color:'#3C5488'},
    ];
    badAnns.forEach(a=>{
      g.append('circle').attr('cx',a.x).attr('cy',a.y).attr('r',6).attr('fill',a.color).attr('opacity',0.9);
      g.append('text').attr('x',a.x+6).attr('y',a.y-6).attr('fill',a.color).attr('font-size',9).attr('font-weight','bold').text(a.label);
    });
  }

  function drawGoodChart(wrap) {
    const W=300, H=180;
    const svg=d3.select(wrap).append('svg').attr('viewBox',`0 0 ${W} ${H}`)
      .attr('preserveAspectRatio','xMidYMid meet').style('width','100%').style('height','auto')
      .style('background','var(--bg-light-alt)').style('border-radius','8px');
    const pad={t:15,r:15,b:25,l:35};
    const g=svg.append('g').attr('transform',`translate(${pad.l},${pad.t})`);
    const iW=W-pad.l-pad.r, iH=H-pad.t-pad.b;
    const data=[20,35,28,55,48,70];
    const xS=d3.scaleLinear().domain([0,5]).range([0,iW]);
    const yS=d3.scaleLinear().domain([0,80]).range([iH,0]);
    const lineGen=d3.line().x((_,i)=>xS(i)).y(d=>yS(d)).curve(d3.curveCatmullRom);
    g.append('path').attr('d',lineGen(data)).attr('fill','none').attr('stroke','#d2d2d7').attr('stroke-width',2);
    // Only one annotation on the key point
    const kx=xS(5), ky=yS(70);
    g.append('circle').attr('cx',kx).attr('cy',ky).attr('r',6).attr('fill','#7EC8E3');
    g.append('line').attr('x1',kx).attr('y1',ky+8).attr('x2',kx-30).attr('y2',ky+28)
      .attr('stroke','#7EC8E3').attr('stroke-width',1.5);
    g.append('text').attr('x',kx-34).attr('y',ky+38)
      .attr('fill','#7EC8E3').attr('font-size',10).attr('font-weight','600')
      .attr('text-anchor','end').text('季度最高：70');
  }

  drawBadChart(el.querySelector('.sc-bad-wrap'));
  drawGoodChart(el.querySelector('.sc-good-wrap'));
}

function initStorytelling(container) {
  if (!container) return;
  initColorContrast(container.querySelector('#story-color-contrast'));
  initAnnotationFlow(container.querySelector('#story-annotation-flow'));
  initGreyOut(container.querySelector('#story-grey-out'));
  initStepReveal(container.querySelector('#story-reveal'));
  initStoryCompare(container.querySelector('#story-compare'));

  // ScrollTrigger fadeIn for each block
  ['#story-color-contrast','#story-annotation-flow','#story-grey-out','#story-reveal'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.fromTo(el, { opacity:0, y:40 }, {
      opacity:1, y:0, duration:0.7, ease:'power2.out',
      scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' }
    });
  });
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
    .fromTo('#p9-root .p9-scroll-hint', {opacity:0},{opacity:1,duration:0.4}, 0.9);

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
  state.sbGallery = initSeabornGallery(document.getElementById('s2-seaborn-gallery'));
  initCompareTable(document.getElementById('s3-mpl-vs-ggplot'));
  state.annCanvas = initAnnotateCanvas(document.getElementById('s4-annotate-canvas'));
  initStorytelling(document.getElementById('s5-storytelling'));

  // ScrollTrigger fadeIn for section headers
  [
    '#s1-matplotlib-hierarchy h2',
    '#s1-matplotlib-hierarchy p',
    '#s2-seaborn-gallery h2',
    '#s2-seaborn-gallery > div > p',
    '#s3-mpl-vs-ggplot h2',
    '#s3-mpl-vs-ggplot > div > p',
    '#s4-annotate-canvas h2',
    '#s4-annotate-canvas > div > p',
    '#s5-storytelling h2',
    '#s5-storytelling > div > p',
  ].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) fadeIn(el, { y: 40, stagger: 0 });
  });
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
  if (state.sbGallery) { state.sbGallery.destroy(); state.sbGallery = null; }
  const compareRows = document.getElementById('compare-rows');
  if (compareRows) compareRows.innerHTML = '';
  if (state.annCanvas) { state.annCanvas.destroy(); state.annCanvas = null; }
  state.resizeObservers.forEach(ro => ro.disconnect());
  state.resizeObservers = [];
  // Clear storytelling timers (timers are local scope, cleared on re-init)
  ['#story-color-contrast','#story-annotation-flow','#story-grey-out','#story-reveal','#story-compare'].forEach(sel => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = '';
  });
}
