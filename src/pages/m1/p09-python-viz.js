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

// ══════════════════════════════════════════════════════
//  状态
// ══════════════════════════════════════════════════════

let state = {
  cleanupFns: [],
  resizeObservers: [],
  sbGallery: null,
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
  const pad = { t: 20, r: 20, b: 35, l: 40 };
  const iW = W - pad.l - pad.r;
  const iH = H - pad.t - pad.b;
  const g = svg.append('g').attr('transform', `translate(${pad.l},${pad.t})`);

  // background
  svg.insert('rect','g').attr('width', W).attr('height', H)
    .attr('fill', '#1d1d1f').attr('rx', 8);

  // axis lines
  g.append('line').attr('x1',0).attr('y1',iH).attr('x2',iW).attr('y2',iH)
    .attr('stroke','#424245').attr('stroke-width',1);
  g.append('line').attr('x1',0).attr('y1',0).attr('x2',0).attr('y2',iH)
    .attr('stroke','#424245').attr('stroke-width',1);

  const rng = seededRng9(42);
  const CATS = ['Mon','Tue','Wed','Thu'];
  const COLORS = ['#7EC8E3','#95D5B2','#B8B8E8','#F0B27A'];

  if (chartId === 'scatter') {
    const pts = Array.from({length:40}, () => ({
      x: 0.1 + rng()*0.8, y: 0.1 + rng()*0.8,
      g: Math.floor(rng()*4)
    }));
    g.selectAll('circle').data(pts).join('circle')
      .attr('cx', d => d.x * iW)
      .attr('cy', d => (1-d.y) * iH)
      .attr('r', Math.sqrt((params.size||60)/Math.PI) * 1.2)
      .attr('fill', d => params.hue ? COLORS[d.g] : '#7EC8E3')
      .attr('opacity', params.alpha||0.7);

  } else if (chartId === 'line') {
    const lines = [0,1,2].map(gi => ({
      gi, pts: Array.from({length:8}, (_,i) => ({
        x: i/(7), y: 0.15 + gi*0.22 + rng()*0.12
      }))
    }));
    const lineGen = d3.line().x(d=>d.x*iW).y(d=>(1-d.y)*iH).curve(d3.curveCatmullRom);
    lines.forEach(ln => {
      g.append('path').attr('d', lineGen(ln.pts))
        .attr('fill','none').attr('stroke', COLORS[ln.gi]).attr('stroke-width',2);
      if (params.markers) {
        g.selectAll(null).data(ln.pts).join('circle')
          .attr('cx', d=>d.x*iW).attr('cy', d=>(1-d.y)*iH)
          .attr('r',3).attr('fill', COLORS[ln.gi]);
      }
    });

  } else if (chartId === 'bar') {
    const vals = CATS.map((_,i) => 0.3 + rng()*0.5);
    const xScale = d3.scaleBand().domain(CATS).range([0,iW]).padding(0.25);
    if (params.orient === 'v') {
      g.selectAll('rect').data(vals).join('rect')
        .attr('x', (_,i)=>xScale(CATS[i])).attr('y', d=>(1-d)*iH)
        .attr('width', xScale.bandwidth()).attr('height', d=>d*iH)
        .attr('fill', (_,i)=>COLORS[i]).attr('rx',3);
    } else {
      const yScale = d3.scaleBand().domain(CATS).range([0,iH]).padding(0.25);
      g.selectAll('rect').data(vals).join('rect')
        .attr('x',0).attr('y', (_,i)=>yScale(CATS[i]))
        .attr('width', d=>d*iW).attr('height', yScale.bandwidth())
        .attr('fill', (_,i)=>COLORS[i]).attr('rx',3);
    }

  } else if (chartId === 'box') {
    const bw = (params.width||0.5) * iW / 5;
    CATS.forEach((cat,i) => {
      const cx = (i+0.5) * (iW/4);
      const med = 0.35 + rng()*0.3;
      const q1 = med - 0.1 - rng()*0.08;
      const q3 = med + 0.1 + rng()*0.08;
      const wlo = q1 - 0.12; const whi = q3 + 0.12;
      g.append('line').attr('x1',cx).attr('y1',(1-whi)*iH).attr('x2',cx).attr('y2',(1-q3)*iH).attr('stroke',COLORS[i]).attr('stroke-width',1.5);
      g.append('line').attr('x1',cx).attr('y1',(1-q1)*iH).attr('x2',cx).attr('y2',(1-wlo)*iH).attr('stroke',COLORS[i]).attr('stroke-width',1.5);
      g.append('rect').attr('x',cx-bw/2).attr('y',(1-q3)*iH).attr('width',bw).attr('height',(q3-q1)*iH).attr('fill',COLORS[i]).attr('opacity',0.7).attr('rx',2);
      g.append('line').attr('x1',cx-bw/2).attr('y1',(1-med)*iH).attr('x2',cx+bw/2).attr('y2',(1-med)*iH).attr('stroke','#fff').attr('stroke-width',2);
    });

  } else if (chartId === 'violin') {
    CATS.forEach((cat,i) => {
      const cx = (i+0.5)*(iW/4);
      const nPts = 20;
      const pts = [];
      for (let j=0; j<nPts; j++) {
        const t = j/(nPts-1);
        const y = 0.1 + t*0.8;
        const w = Math.sin(Math.PI*t) * (0.04 + rng()*0.03) * iW;
        pts.push({y,w});
      }
      const pathD = pts.map((p,j)=>`${j===0?'M':'L'}${cx-p.w},${(1-p.y)*iH}`).join(' ') +
                    pts.slice().reverse().map(p=>`L${cx+p.w},${(1-p.y)*iH}`).join(' ') + 'Z';
      g.append('path').attr('d',pathD).attr('fill',COLORS[i]).attr('opacity',0.7);
    });

  } else if (chartId === 'hist') {
    const nBins = Math.min(params.bins||20, 15);
    const vals = Array.from({length:nBins}, () => 0.05 + rng()*0.85);
    const bw = iW / nBins;
    g.selectAll('rect').data(vals).join('rect')
      .attr('x', (_,i)=>i*bw+1).attr('y', d=>(1-d)*iH)
      .attr('width', bw-2).attr('height', d=>d*iH)
      .attr('fill', params.color||'#7EC8E3').attr('opacity',0.8);
    if (params.kde) {
      const kdeY = Array.from({length:30}, (_,i) => {
        const x = i/29; const gau = Math.exp(-Math.pow((x-0.45)/0.2,2)/2);
        return (1-gau*0.85)*iH;
      });
      const kdeX = Array.from({length:30}, (_,i) => i/29*iW);
      const path = kdeX.map((x,i)=>`${i===0?'M':'L'}${x},${kdeY[i]}`).join(' ');
      g.append('path').attr('d',path).attr('fill','none').attr('stroke','#F0D264').attr('stroke-width',2);
    }

  } else if (chartId === 'kde') {
    [0,1].forEach(gi => {
      const offset = gi*0.25;
      const kdeY = Array.from({length:30}, (_,i) => {
        const x = i/29; const gau = Math.exp(-Math.pow((x-0.35-offset)/0.18,2)/2);
        return (1-gau*0.8)*iH;
      });
      const kdeX = Array.from({length:30}, (_,i) => i/29*iW);
      const pathD = kdeX.map((x,i)=>`${i===0?'M':'L'}${x},${kdeY[i]}`).join(' ');
      if (params.hue) {
        if (params.fill) {
          const fillD = pathD + `L${iW},${iH} L0,${iH}Z`;
          g.append('path').attr('d',fillD).attr('fill',COLORS[gi]).attr('opacity',0.25);
        }
        g.append('path').attr('d',pathD).attr('fill','none').attr('stroke',COLORS[gi]).attr('stroke-width',2);
      } else if (gi===0) {
        if (params.fill) {
          const fillD = pathD + `L${iW},${iH} L0,${iH}Z`;
          g.append('path').attr('d',fillD).attr('fill','#7EC8E3').attr('opacity',0.25);
        }
        g.append('path').attr('d',pathD).attr('fill','none').attr('stroke','#7EC8E3').attr('stroke-width',2);
      }
    });

  } else if (chartId === 'heatmap') {
    const n = 4;
    const cellW = iW/n; const cellH = iH/n;
    const corr = [[1,0.7,-0.3,0.5],[0.7,1,0.2,-0.1],[-0.3,0.2,1,-0.6],[0.5,-0.1,-0.6,1]];
    const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([1,-1]);
    for (let r=0;r<n;r++) for (let c=0;c<n;c++) {
      g.append('rect')
        .attr('x',c*cellW).attr('y',r*cellH)
        .attr('width',cellW-2).attr('height',cellH-2)
        .attr('fill', colorScale(corr[r][c])).attr('rx',2);
      if (params.annot) {
        g.append('text').attr('x',c*cellW+cellW/2).attr('y',r*cellH+cellH/2+4)
          .attr('text-anchor','middle').attr('font-size',10).attr('fill','#fff')
          .attr('font-family','JetBrains Mono, monospace')
          .text(corr[r][c].toFixed(1));
      }
    }

  } else if (chartId === 'pair') {
    // Show 2x2 grid of mini plots
    const n=2; const cellW=iW/n; const cellH=iH/n;
    for (let r=0;r<n;r++) for (let c=0;c<n;c++) {
      g.append('rect').attr('x',c*cellW+2).attr('y',r*cellH+2)
        .attr('width',cellW-4).attr('height',cellH-4)
        .attr('fill','#2d2d2f').attr('rx',4);
      if (r===c) {
        // diagonal: histogram bars
        const nB=8;
        for (let b=0;b<nB;b++) {
          const h=(0.2+rng()*0.6)*cellH*0.8;
          g.append('rect').attr('x',c*cellW+4+b*(cellW-8)/nB).attr('y',r*cellH+cellH-h-4)
            .attr('width',(cellW-8)/nB-1).attr('height',h).attr('fill',COLORS[r]).attr('opacity',0.8);
        }
      } else {
        // scatter
        for (let i=0;i<12;i++) {
          g.append('circle').attr('cx',c*cellW+6+rng()*(cellW-12))
            .attr('cy',r*cellH+6+rng()*(cellH-12))
            .attr('r',3).attr('fill',COLORS[c]).attr('opacity',0.7);
        }
      }
    }

  } else if (chartId === 'reg') {
    const pts = Array.from({length:30}, () => ({
      x: 0.05+rng()*0.9, y: 0.0
    }));
    pts.forEach(p => { p.y = 0.1 + p.x*0.7 + (rng()-0.5)*0.2; });
    if (params.scatter) {
      g.selectAll('circle').data(pts).join('circle')
        .attr('cx', d=>d.x*iW).attr('cy', d=>(1-d.y)*iH)
        .attr('r', 4).attr('fill', params.color||'#7EC8E3').attr('opacity',0.5);
    }
    // regression line
    const slope = 0.7; const intercept = 0.1;
    g.append('line')
      .attr('x1',0.05*iW).attr('y1',(1-(intercept+0.05*slope))*iH)
      .attr('x2',0.95*iW).attr('y2',(1-(intercept+0.95*slope))*iH)
      .attr('stroke',params.color||'#7EC8E3').attr('stroke-width',2.5);
    // CI band
    g.append('path')
      .attr('d', `M${0.05*iW},${(1-(intercept+0.05*slope+0.06))*iH} L${0.95*iW},${(1-(intercept+0.95*slope+0.04))*iH} L${0.95*iW},${(1-(intercept+0.95*slope-0.04))*iH} L${0.05*iW},${(1-(intercept+0.05*slope-0.06))*iH}Z`)
      .attr('fill',params.color||'#7EC8E3').attr('opacity',0.2);
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
    const H = 200;
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
  state.sbGallery = initSeabornGallery(document.getElementById('s2-seaborn-gallery'));
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
  if (state.sbGallery) { state.sbGallery.destroy(); state.sbGallery = null; }
  state.resizeObservers.forEach(ro => ro.disconnect());
  state.resizeObservers = [];
}
