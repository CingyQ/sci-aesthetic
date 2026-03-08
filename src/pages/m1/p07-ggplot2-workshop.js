// p07-ggplot2-workshop.js — ggplot2 图表工作坊（第一批 4 种）
// scatter / bar / line / boxplot
// 三面板：左参数 · 中D3预览 · 右R代码；移动端手风琴

import { fadeIn, scaleReveal, killAll, gsap } from '../../components/ScrollAnimations.js';
import { createCodeEditor } from '../../components/CodeEditor.js';
import { createCopyButton } from '../../components/CopyButton.js';
import { navigateTo } from '../../utils/router.js';
import * as d3 from 'd3';

// ─────────────────────────────────────────────
// 工具：带种子的伪随机数
// ─────────────────────────────────────────────
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}
function makeNormal(rng) {
  return () => {
    const u = Math.max(1e-10, rng());
    const v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

// ─────────────────────────────────────────────
// 样本数据（固定种子，可复现）
// ─────────────────────────────────────────────
const SCATTER_DATA = (() => {
  const rng = seededRandom(42);
  const norm = makeNormal(rng);
  const specs = [
    { name: 'setosa',     mx: 5.0, sx: 0.35, my: 1.5,  sy: 0.18 },
    { name: 'versicolor', mx: 5.9, sx: 0.52, my: 4.3,  sy: 0.47 },
    { name: 'virginica',  mx: 6.6, sx: 0.63, my: 5.5,  sy: 0.55 },
  ];
  const pts = [];
  specs.forEach(sp => {
    for (let i = 0; i < 20; i++) {
      pts.push({ x: sp.mx + sp.sx * norm(), y: sp.my + sp.sy * norm(), sp: sp.name });
    }
  });
  return pts;
})();

const BAR_DATA = (() => {
  const rng = seededRandom(100);
  const cats = ['Control', 'Trt-A', 'Trt-B', 'Trt-C', 'Trt-D'];
  return cats.map(cat => ({
    cat,
    values: [
      { grp: 'Week 1', mean: 25 + rng() * 25, se: 2 + rng() * 4 },
      { grp: 'Week 8', mean: 40 + rng() * 40, se: 3 + rng() * 6 },
    ],
  }));
})();

const LINE_DATA = (() => {
  const rng = seededRandom(200);
  const labels = ['W0', 'W1', 'W2', 'W3', 'W4'];
  return [
    { grp: 'Control',   color: '#7EC8E3', base: 30, slope: 2  },
    { grp: 'Low Dose',  color: '#F0B27A', base: 30, slope: 9  },
    { grp: 'High Dose', color: '#95D5B2', base: 30, slope: 15 },
  ].map(g => ({
    grp: g.grp, color: g.color,
    pts: labels.map((l, i) => ({
      w: l,
      val: g.base + g.slope * i + (rng() - 0.5) * 10,
    })),
  }));
})();

const BOXPLOT_DATA = (() => {
  const rng = seededRandom(300);
  const norm = makeNormal(rng);
  return [
    { name: 'Control', mu: 25, sigma: 5  },
    { name: 'Drug A',  mu: 48, sigma: 8  },
    { name: 'Drug B',  mu: 66, sigma: 6  },
  ].map(g => ({
    name: g.name,
    pts: Array.from({ length: 30 }, () => Math.max(0, g.mu + g.sigma * norm())),
  }));
})();

// ─────────────────────────────────────────────
// 配色
// ─────────────────────────────────────────────
const SP_COLORS  = { setosa: '#7EC8E3', versicolor: '#F0B27A', virginica: '#95D5B2' };
const GRP_COLORS = ['#7EC8E3', '#F0B27A'];
const BOX_COLORS = ['#7EC8E3', '#F0B27A', '#95D5B2'];
const CHART_BG   = '#0f1117';

// ─────────────────────────────────────────────
// 图表类型定义
// ─────────────────────────────────────────────
const CHART_TYPES = [
  { id: 'scatter', name: '散点图', en: 'Scatter Plot',
    tags: ['连续 × 连续', '相关分析'],
    desc: '展示两连续变量关系，支持分组着色、回归线',
    info: 'Iris 数据集 · 60 个观测点 · 3 物种' },
  { id: 'bar', name: '柱状图', en: 'Bar Chart',
    tags: ['分类 × 连续', '组间比较'],
    desc: '比较不同类别的数值，支持分组/堆叠/百分比',
    info: '5 个处理组 · 2 个时间点 · 模拟实验数据' },
  { id: 'line', name: '折线图', en: 'Line Chart',
    tags: ['时间序列', '趋势分析'],
    desc: '展示随时间变化的趋势，支持面积填充',
    info: '5 个时间点 · 3 个治疗组 · 纵向研究数据' },
  { id: 'boxplot', name: '箱线图', en: 'Box Plot',
    tags: ['分类 × 连续', '分布比较'],
    desc: '展示分布中位数、四分位和异常值',
    info: '3 组 · 每组 30 个观测值 · 模拟临床数据' },
];

// ─────────────────────────────────────────────
// 状态
// ─────────────────────────────────────────────
const DEFAULT_PARAMS = {
  scatter: { size: 3, alpha: 0.7, jitter: 'none', regression: false, shape: 'circle' },
  bar:     { arrangement: 'grouped', barWidth: 0.7, errorBars: false },
  line:    { lineType: 'solid', lineWidth: 1.5, showPoints: true, smooth: false, fillArea: false },
  boxplot: { boxWidth: 0.6, showOutliers: true, fillAlpha: 0.7, notch: false, showMean: true, whisker: 'iqr' },
};

let state = {
  currentChart: 'scatter',
  params: JSON.parse(JSON.stringify(DEFAULT_PARAMS)),
  editor: null,
  copyBtn: null,
  cleanups: [],
};

// ─────────────────────────────────────────────
// D3 共用工具
// ─────────────────────────────────────────────
function axisStyle(sel) {
  sel.select('.domain').attr('stroke', '#424245');
  sel.selectAll('.tick line').attr('stroke', '#424245');
  sel.selectAll('text').attr('fill', '#a1a1a6').style('font-size', '11px');
}
function gridStyle(sel) {
  sel.select('.domain').remove();
  sel.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.05)');
  sel.selectAll('text').remove();
}
function axisLabel(g, text, isY, iW, iH) {
  if (isY) {
    g.append('text')
      .attr('transform', 'rotate(-90)').attr('x', -iH / 2).attr('y', -48)
      .attr('fill', '#a1a1a6').attr('text-anchor', 'middle')
      .style('font-size', '12px').text(text);
  } else {
    g.append('text')
      .attr('x', iW / 2).attr('y', iH + 46)
      .attr('fill', '#a1a1a6').attr('text-anchor', 'middle')
      .style('font-size', '12px').text(text);
  }
}
function baseSVG(container, W, H, M) {
  d3.select(container).selectAll('*').remove();
  const svg = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('display', 'block');
  svg.append('rect').attr('width', W).attr('height', H)
    .attr('fill', CHART_BG).attr('rx', 12);
  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);
  const iW = W - M.left - M.right;
  const iH = H - M.top - M.bottom;
  return { svg, g, iW, iH };
}

// ─────────────────────────────────────────────
// D3：散点图
// ─────────────────────────────────────────────
function renderScatter(container, p) {
  const W = 540, H = 380, M = { top: 25, right: 115, bottom: 55, left: 55 };
  const { g, iW, iH } = baseSVG(container, W, H, M);

  const xSc = d3.scaleLinear().domain([3.8, 8.2]).range([0, iW]);
  const ySc = d3.scaleLinear().domain([0.5, 8.0]).range([iH, 0]);

  g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(xSc).ticks(6)).call(axisStyle);
  g.append('g').call(d3.axisLeft(ySc).ticks(5)).call(axisStyle);
  axisLabel(g, 'Sepal.Length (cm)', false, iW, iH);
  axisLabel(g, 'Petal.Length (cm)', true, iW, iH);

  // 回归线
  if (p.regression) {
    Object.entries(SP_COLORS).forEach(([sp, col]) => {
      const pts = SCATTER_DATA.filter(d => d.sp === sp);
      const mX = d3.mean(pts, d => d.x), mY = d3.mean(pts, d => d.y);
      const sl = d3.sum(pts, d => (d.x - mX) * (d.y - mY)) /
                 d3.sum(pts, d => (d.x - mX) ** 2);
      const ic = mY - sl * mX;
      const x1 = d3.min(pts, d => d.x) - 0.1;
      const x2 = d3.max(pts, d => d.x) + 0.1;
      g.append('line')
        .attr('x1', xSc(x1)).attr('y1', ySc(sl * x1 + ic))
        .attr('x2', xSc(x2)).attr('y2', ySc(sl * x2 + ic))
        .attr('stroke', col).attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '6,4').attr('opacity', 0.7);
    });
  }

  // 数据点
  const jRng = seededRandom(999);
  const jAmt = p.jitter === 'light' ? 0.12 : p.jitter === 'heavy' ? 0.28 : 0;
  const symTypeMap = {
    circle: d3.symbolCircle, triangle: d3.symbolTriangle,
    square: d3.symbolSquare, cross: d3.symbolCross,
  };
  const symT = symTypeMap[p.shape] || d3.symbolCircle;
  const symSize = (p.size + 2) ** 2 * 6;

  SCATTER_DATA.forEach(d => {
    const jx = jAmt > 0 ? (jRng() - 0.5) * jAmt : 0;
    const jy = jAmt > 0 ? (jRng() - 0.5) * jAmt : 0;
    g.append('path')
      .attr('d', d3.symbol().type(symT).size(symSize)())
      .attr('transform', `translate(${xSc(d.x + jx)},${ySc(d.y + jy)})`)
      .attr('fill', SP_COLORS[d.sp]).attr('opacity', p.alpha).attr('stroke', 'none');
  });

  // 图例
  const lg = g.append('g').attr('transform', `translate(${iW + 12},0)`);
  Object.entries(SP_COLORS).forEach(([sp, col], i) => {
    const row = lg.append('g').attr('transform', `translate(0,${i * 22})`);
    row.append('path').attr('d', d3.symbol().type(symT).size(64)())
      .attr('transform', 'translate(7,7)').attr('fill', col).attr('opacity', p.alpha);
    row.append('text').attr('x', 18).attr('y', 11)
      .attr('fill', '#a1a1a6').style('font-size', '10px').text(sp);
  });
}

// ─────────────────────────────────────────────
// D3：柱状图
// ─────────────────────────────────────────────
function renderBar(container, p) {
  const W = 540, H = 380, M = { top: 25, right: 115, bottom: 60, left: 55 };
  const { g, iW, iH } = baseSVG(container, W, H, M);
  const data = BAR_DATA;
  const cats = data.map(d => d.cat);
  const grps = ['Week 1', 'Week 8'];

  const xB = d3.scaleBand().domain(cats).range([0, iW]).paddingInner(1 - p.barWidth);

  if (p.arrangement === 'grouped') {
    const x1 = d3.scaleBand().domain(grps).range([0, xB.bandwidth()]).padding(0.08);
    const maxV = d3.max(data, d => d3.max(d.values, v => v.mean + (p.errorBars ? v.se : 0)));
    const ySc = d3.scaleLinear().domain([0, maxV * 1.12]).range([iH, 0]);

    g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
    g.append('g').attr('transform', `translate(0,${iH})`)
      .call(d3.axisBottom(xB)).call(axisStyle);
    g.append('g').call(d3.axisLeft(ySc).ticks(5)).call(axisStyle);
    axisLabel(g, 'Mean Value', true, iW, iH);

    data.forEach(d => {
      const cg = g.append('g').attr('transform', `translate(${xB(d.cat)},0)`);
      d.values.forEach((v, vi) => {
        cg.append('rect')
          .attr('x', x1(v.grp)).attr('y', ySc(v.mean))
          .attr('width', x1.bandwidth()).attr('height', iH - ySc(v.mean))
          .attr('fill', GRP_COLORS[vi]).attr('rx', 3);
        if (p.errorBars) {
          const cx = x1(v.grp) + x1.bandwidth() / 2;
          cg.append('line').attr('x1', cx).attr('x2', cx)
            .attr('y1', ySc(v.mean + v.se)).attr('y2', ySc(v.mean - v.se))
            .attr('stroke', '#fff').attr('stroke-width', 1.5).attr('opacity', 0.7);
          [-v.se, v.se].forEach(off => {
            cg.append('line').attr('x1', cx - 4).attr('x2', cx + 4)
              .attr('y1', ySc(v.mean + off)).attr('y2', ySc(v.mean + off))
              .attr('stroke', '#fff').attr('stroke-width', 1.5).attr('opacity', 0.7);
          });
        }
      });
    });

  } else if (p.arrangement === 'stacked') {
    const sd = data.map(d => {
      const o = { cat: d.cat };
      d.values.forEach(v => { o[v.grp] = v.mean; });
      return o;
    });
    const stack = d3.stack().keys(grps)(sd);
    const maxV = d3.max(stack[stack.length - 1], d => d[1]);
    const ySc = d3.scaleLinear().domain([0, maxV * 1.1]).range([iH, 0]);

    g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
    g.append('g').attr('transform', `translate(0,${iH})`)
      .call(d3.axisBottom(xB)).call(axisStyle);
    g.append('g').call(d3.axisLeft(ySc).ticks(5)).call(axisStyle);
    axisLabel(g, 'Total Value', true, iW, iH);

    stack.forEach((layer, li) => {
      g.selectAll(null).data(layer).enter().append('rect')
        .attr('x', d => xB(d.data.cat))
        .attr('y', d => ySc(d[1]))
        .attr('width', xB.bandwidth())
        .attr('height', d => ySc(d[0]) - ySc(d[1]))
        .attr('fill', GRP_COLORS[li]).attr('rx', li === 0 ? 3 : 0);
    });

  } else { // filled
    const sd = data.map(d => {
      const total = d3.sum(d.values, v => v.mean);
      const o = { cat: d.cat };
      d.values.forEach(v => { o[v.grp] = (v.mean / total) * 100; });
      return o;
    });
    const stack = d3.stack().keys(grps)(sd);
    const ySc = d3.scaleLinear().domain([0, 100]).range([iH, 0]);

    g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
    g.append('g').call(d3.axisLeft(ySc).ticks(5).tickFormat(d => d + '%')).call(axisStyle);
    g.append('g').attr('transform', `translate(0,${iH})`)
      .call(d3.axisBottom(xB)).call(axisStyle);
    axisLabel(g, 'Proportion (%)', true, iW, iH);

    stack.forEach((layer, li) => {
      g.selectAll(null).data(layer).enter().append('rect')
        .attr('x', d => xB(d.data.cat))
        .attr('y', d => ySc(d[1]))
        .attr('width', xB.bandwidth())
        .attr('height', d => ySc(d[0]) - ySc(d[1]))
        .attr('fill', GRP_COLORS[li]).attr('rx', li === 0 ? 3 : 0);
    });
  }

  // 图例
  const lg = g.append('g').attr('transform', `translate(${iW + 12},0)`);
  grps.forEach((grp, i) => {
    const row = lg.append('g').attr('transform', `translate(0,${i * 22})`);
    row.append('rect').attr('width', 12).attr('height', 12)
      .attr('fill', GRP_COLORS[i]).attr('rx', 2);
    row.append('text').attr('x', 16).attr('y', 11)
      .attr('fill', '#a1a1a6').style('font-size', '10px').text(grp);
  });
}

// ─────────────────────────────────────────────
// D3：折线图
// ─────────────────────────────────────────────
function renderLine(container, p) {
  const W = 540, H = 380, M = { top: 25, right: 110, bottom: 55, left: 55 };
  const { g, iW, iH } = baseSVG(container, W, H, M);

  const wk = ['W0', 'W1', 'W2', 'W3', 'W4'];
  const xSc = d3.scalePoint().domain(wk).range([0, iW]).padding(0.2);
  const allV = LINE_DATA.flatMap(d => d.pts.map(pt => pt.val));
  const ySc = d3.scaleLinear().domain([d3.min(allV) - 8, d3.max(allV) + 8]).range([iH, 0]);

  g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(xSc)).call(axisStyle);
  g.append('g').call(d3.axisLeft(ySc).ticks(5)).call(axisStyle);
  axisLabel(g, 'Week', false, iW, iH);
  axisLabel(g, 'Response', true, iW, iH);

  const dashMap = { solid: null, dashed: '8,4', dotted: '3,4' };
  const curve = p.smooth ? d3.curveCatmullRom : d3.curveLinear;

  LINE_DATA.forEach(grp => {
    if (p.fillArea) {
      g.append('path').datum(grp.pts)
        .attr('d', d3.area().x((_, i) => xSc(wk[i])).y0(iH)
          .y1(pt => ySc(pt.val)).curve(curve))
        .attr('fill', grp.color).attr('opacity', 0.12);
    }
    const path = g.append('path').datum(grp.pts)
      .attr('d', d3.line().x((_, i) => xSc(wk[i])).y(pt => ySc(pt.val)).curve(curve))
      .attr('fill', 'none').attr('stroke', grp.color).attr('stroke-width', p.lineWidth);
    if (dashMap[p.lineType]) path.attr('stroke-dasharray', dashMap[p.lineType]);
    if (p.showPoints) {
      grp.pts.forEach((pt, i) => {
        g.append('circle').attr('cx', xSc(wk[i])).attr('cy', ySc(pt.val))
          .attr('r', p.lineWidth + 2).attr('fill', grp.color)
          .attr('stroke', CHART_BG).attr('stroke-width', 1.5);
      });
    }
  });

  const lg = g.append('g').attr('transform', `translate(${iW + 12},0)`);
  LINE_DATA.forEach((grp, i) => {
    const row = lg.append('g').attr('transform', `translate(0,${i * 22})`);
    row.append('line').attr('x1', 0).attr('x2', 14).attr('y1', 7).attr('y2', 7)
      .attr('stroke', grp.color).attr('stroke-width', p.lineWidth);
    if (p.showPoints) {
      row.append('circle').attr('cx', 7).attr('cy', 7).attr('r', 3).attr('fill', grp.color);
    }
    row.append('text').attr('x', 18).attr('y', 11)
      .attr('fill', '#a1a1a6').style('font-size', '10px').text(grp.grp);
  });
}

// ─────────────────────────────────────────────
// D3：箱线图
// ─────────────────────────────────────────────
function renderBoxplot(container, p) {
  const W = 540, H = 380, M = { top: 25, right: 30, bottom: 50, left: 60 };
  const { g, iW, iH } = baseSVG(container, W, H, M);

  const stats = BOXPLOT_DATA.map(grp => {
    const sorted = [...grp.pts].sort((a, b) => a - b);
    const q1  = d3.quantile(sorted, 0.25);
    const med = d3.quantile(sorted, 0.5);
    const q3  = d3.quantile(sorted, 0.75);
    const iqr = q3 - q1;
    const wMin = p.whisker === 'iqr'
      ? Math.max(d3.min(sorted), q1 - 1.5 * iqr) : d3.min(sorted);
    const wMax = p.whisker === 'iqr'
      ? Math.min(d3.max(sorted), q3 + 1.5 * iqr) : d3.max(sorted);
    return {
      name: grp.name, q1, med, q3, iqr, wMin, wMax,
      outliers: sorted.filter(v => v < wMin || v > wMax),
      mean: d3.mean(sorted),
      notchLo: med - 1.58 * iqr / Math.sqrt(sorted.length),
      notchHi: med + 1.58 * iqr / Math.sqrt(sorted.length),
    };
  });

  const allY = stats.flatMap(s => [s.wMin, s.wMax, ...(p.showOutliers ? s.outliers : [])]);
  const ySc = d3.scaleLinear()
    .domain([d3.min(allY) - 5, d3.max(allY) + 5]).range([iH, 0]);
  const xSc = d3.scaleBand()
    .domain(BOXPLOT_DATA.map(d => d.name)).range([0, iW]).padding(1 - p.boxWidth);

  g.append('g').call(d3.axisLeft(ySc).ticks(5).tickSize(-iW).tickFormat('')).call(gridStyle);
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(xSc)).call(axisStyle);
  g.append('g').call(d3.axisLeft(ySc).ticks(5)).call(axisStyle);
  axisLabel(g, 'Response Value', true, iW, iH);

  stats.forEach((s, i) => {
    const bX = xSc(s.name), bW = xSc.bandwidth(), mX = bX + bW / 2;
    const col = BOX_COLORS[i];

    // 须线
    g.append('line').attr('x1', mX).attr('x2', mX)
      .attr('y1', ySc(s.wMax)).attr('y2', ySc(s.wMin))
      .attr('stroke', col).attr('stroke-width', 1.5).attr('opacity', 0.7);
    [s.wMin, s.wMax].forEach(v => {
      g.append('line').attr('x1', mX - bW * 0.2).attr('x2', mX + bW * 0.2)
        .attr('y1', ySc(v)).attr('y2', ySc(v))
        .attr('stroke', col).attr('stroke-width', 1.5);
    });

    // 盒体
    if (p.notch) {
      const nl = Math.max(s.q1, s.notchLo);
      const nh = Math.min(s.q3, s.notchHi);
      const nw = bW * 0.2;
      g.append('path').attr('d', [
        `M ${bX} ${ySc(s.q1)}`, `L ${bX + bW} ${ySc(s.q1)}`,
        `L ${bX + bW} ${ySc(nl)}`, `L ${bX + bW - nw} ${ySc(s.med)}`,
        `L ${bX + bW} ${ySc(nh)}`, `L ${bX + bW} ${ySc(s.q3)}`,
        `L ${bX} ${ySc(s.q3)}`, `L ${bX} ${ySc(nh)}`,
        `L ${bX + nw} ${ySc(s.med)}`, `L ${bX} ${ySc(nl)}`, 'Z',
      ].join(' '))
        .attr('fill', col).attr('opacity', p.fillAlpha)
        .attr('stroke', col).attr('stroke-width', 1.5);
    } else {
      g.append('rect')
        .attr('x', bX).attr('y', ySc(s.q3))
        .attr('width', bW).attr('height', ySc(s.q1) - ySc(s.q3))
        .attr('fill', col).attr('opacity', p.fillAlpha)
        .attr('stroke', col).attr('stroke-width', 1.5).attr('rx', 3);
    }

    // 中位线
    g.append('line').attr('x1', bX).attr('x2', bX + bW)
      .attr('y1', ySc(s.med)).attr('y2', ySc(s.med))
      .attr('stroke', '#fff').attr('stroke-width', 2);

    // 均值菱形
    if (p.showMean) {
      const sz = 5, my = ySc(s.mean);
      g.append('path')
        .attr('d', `M ${mX} ${my - sz} L ${mX + sz} ${my} L ${mX} ${my + sz} L ${mX - sz} ${my} Z`)
        .attr('fill', '#fff').attr('opacity', 0.9);
    }

    // 异常值
    if (p.showOutliers) {
      s.outliers.forEach(v => {
        g.append('circle').attr('cx', mX).attr('cy', ySc(v)).attr('r', 3)
          .attr('fill', 'none').attr('stroke', col)
          .attr('stroke-width', 1.5).attr('opacity', 0.7);
      });
    }
  });
}

const CHART_FNS = { scatter: renderScatter, bar: renderBar, line: renderLine, boxplot: renderBoxplot };

// ─────────────────────────────────────────────
// 缩略图渲染
// ─────────────────────────────────────────────
function makeThumbnail(container) {
  return d3.select(container).append('svg')
    .attr('viewBox', '0 0 150 95').style('width', '100%').style('display', 'block')
    .call(s => s.append('rect').attr('width', 150).attr('height', 95)
      .attr('fill', CHART_BG).attr('rx', 8));
}

function thumbScatter(container) {
  const svg = makeThumbnail(container);
  const M = { t: 8, r: 8, b: 14, l: 14 };
  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
  const iW = 150 - M.l - M.r, iH = 95 - M.t - M.b;
  const xS = d3.scaleLinear().domain([3.8, 8.2]).range([0, iW]);
  const yS = d3.scaleLinear().domain([0.5, 8.0]).range([iH, 0]);
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(xS).ticks(3))
    .call(ax => {
      ax.select('.domain').attr('stroke', '#424245');
      ax.selectAll('.tick line').remove();
      ax.selectAll('text').attr('fill', '#555').style('font-size', '7px');
    });
  SCATTER_DATA.forEach(d => {
    g.append('circle').attr('cx', xS(d.x)).attr('cy', yS(d.y)).attr('r', 2.5)
      .attr('fill', SP_COLORS[d.sp]).attr('opacity', 0.75);
  });
}

function thumbBar(container) {
  const svg = makeThumbnail(container);
  const M = { t: 8, r: 8, b: 14, l: 14 };
  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
  const iW = 150 - M.l - M.r, iH = 95 - M.t - M.b;
  const data = BAR_DATA.slice(0, 4);
  const xS = d3.scaleBand().domain(data.map(d => d.cat)).range([0, iW]).padding(0.3);
  const yS = d3.scaleLinear().domain([0, d3.max(data, d => d.values[0].mean) * 1.1]).range([iH, 0]);
  g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS))
    .call(ax => {
      ax.select('.domain').attr('stroke', '#424245');
      ax.selectAll('.tick line').remove();
      ax.selectAll('text').attr('fill', '#555').style('font-size', '7px');
    });
  data.forEach(d => {
    g.append('rect').attr('x', xS(d.cat)).attr('y', yS(d.values[0].mean))
      .attr('width', xS.bandwidth()).attr('height', iH - yS(d.values[0].mean))
      .attr('fill', GRP_COLORS[0]).attr('rx', 2);
  });
}

function thumbLine(container) {
  const svg = makeThumbnail(container);
  const M = { t: 8, r: 8, b: 14, l: 14 };
  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
  const iW = 150 - M.l - M.r, iH = 95 - M.t - M.b;
  const wk = ['W0', 'W1', 'W2', 'W3', 'W4'];
  const xS = d3.scalePoint().domain(wk).range([0, iW]).padding(0.2);
  const allV = LINE_DATA.flatMap(d => d.pts.map(p => p.val));
  const yS = d3.scaleLinear().domain([d3.min(allV) - 2, d3.max(allV) + 2]).range([iH, 0]);
  g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS))
    .call(ax => {
      ax.select('.domain').attr('stroke', '#424245');
      ax.selectAll('.tick line').remove();
      ax.selectAll('text').attr('fill', '#555').style('font-size', '7px');
    });
  const lineGen = d3.line().x((_, i) => xS(wk[i])).y(pt => yS(pt.val));
  LINE_DATA.forEach(grp => {
    g.append('path').datum(grp.pts).attr('d', lineGen)
      .attr('fill', 'none').attr('stroke', grp.color).attr('stroke-width', 1.5);
    grp.pts.forEach((pt, i) => {
      g.append('circle').attr('cx', xS(wk[i])).attr('cy', yS(pt.val))
        .attr('r', 2).attr('fill', grp.color);
    });
  });
}

function thumbBoxplot(container) {
  const svg = makeThumbnail(container);
  const M = { t: 8, r: 8, b: 14, l: 14 };
  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
  const iW = 150 - M.l - M.r, iH = 95 - M.t - M.b;
  const stats = BOXPLOT_DATA.map(grp => {
    const s = [...grp.pts].sort((a, b) => a - b);
    const q1 = d3.quantile(s, 0.25), med = d3.quantile(s, 0.5), q3 = d3.quantile(s, 0.75);
    const iqr = q3 - q1;
    return {
      name: grp.name, q1, med, q3,
      wMin: Math.max(d3.min(s), q1 - 1.5 * iqr),
      wMax: Math.min(d3.max(s), q3 + 1.5 * iqr),
    };
  });
  const xS = d3.scaleBand().domain(BOXPLOT_DATA.map(d => d.name)).range([0, iW]).padding(0.35);
  const allY = stats.flatMap(s => [s.wMin, s.wMax]);
  const yS = d3.scaleLinear().domain([d3.min(allY) - 3, d3.max(allY) + 3]).range([iH, 0]);
  g.append('g').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(xS))
    .call(ax => {
      ax.select('.domain').attr('stroke', '#424245');
      ax.selectAll('.tick line').remove();
      ax.selectAll('text').attr('fill', '#555').style('font-size', '7px');
    });
  stats.forEach((s, i) => {
    const bX = xS(s.name), bW = xS.bandwidth(), mX = bX + bW / 2;
    g.append('line').attr('x1', mX).attr('x2', mX)
      .attr('y1', yS(s.wMax)).attr('y2', yS(s.wMin))
      .attr('stroke', BOX_COLORS[i]).attr('stroke-width', 1).attr('opacity', 0.7);
    g.append('rect').attr('x', bX).attr('y', yS(s.q3))
      .attr('width', bW).attr('height', yS(s.q1) - yS(s.q3))
      .attr('fill', BOX_COLORS[i]).attr('opacity', 0.75).attr('rx', 2);
    g.append('line').attr('x1', bX).attr('x2', bX + bW)
      .attr('y1', yS(s.med)).attr('y2', yS(s.med))
      .attr('stroke', '#fff').attr('stroke-width', 1.5);
  });
}

const THUMB_FNS = { scatter: thumbScatter, bar: thumbBar, line: thumbLine, boxplot: thumbBoxplot };

// ─────────────────────────────────────────────
// R 代码生成器
// ─────────────────────────────────────────────
const R_SHAPE = { circle: '16', triangle: '17', square: '15', cross: '3' };
const R_LTYPE = { solid: '"solid"', dashed: '"dashed"', dotted: '"dotted"' };

function genScatterCode(p) {
  const jitterLine = p.jitter !== 'none'
    ? `    position = position_jitter(\n      width = ${p.jitter === 'light' ? 0.1 : 0.25},\n      height = ${p.jitter === 'light' ? 0.1 : 0.25}\n    ),\n`
    : '';
  const regLine = p.regression
    ? `  geom_smooth(\n    aes(group = Species),\n    method = "lm", se = TRUE,\n    linewidth = 0.8, alpha = 0.15\n  ) +\n`
    : '';
  return `library(ggplot2)

ggplot(iris, aes(
  x     = Sepal.Length,
  y     = Petal.Length,
  color = Species
)) +
  geom_point(
    size  = ${p.size},
    alpha = ${p.alpha},
    shape = ${R_SHAPE[p.shape] || '16'},
${jitterLine}  ) +
${regLine}  scale_color_manual(values = c(
    setosa     = "#7EC8E3",
    versicolor = "#F0B27A",
    virginica  = "#95D5B2"
  )) +
  labs(
    x     = "Sepal Length (cm)",
    y     = "Petal Length (cm)",
    color = "Species",
    title = "萼片长度 vs 花瓣长度"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position  = "right",
    panel.grid.minor = element_blank()
  )`;
}

function genBarCode(p) {
  const posMap = {
    grouped: 'position_dodge(0.8)',
    stacked: 'position_stack()',
    filled:  'position_fill()',
  };
  const errLine = p.errorBars
    ? `  geom_errorbar(\n    aes(ymin = mean - se, ymax = mean + se),\n    position = position_dodge(0.8),\n    width = 0.2\n  ) +\n`
    : '';
  const yLab = p.arrangement === 'filled' ? 'Proportion' : 'Mean Value';
  const titleMap = { grouped: '分组柱状图', stacked: '堆叠柱状图', filled: '百分比堆叠图' };
  return `library(ggplot2)

# data 包含列：cat, grp (factor), mean, se
ggplot(data, aes(
  x    = cat,
  y    = mean,
  fill = grp
)) +
  geom_col(
    position = ${posMap[p.arrangement]},
    width    = ${p.barWidth}
  ) +
${errLine}  scale_fill_manual(values = c(
    "Week 1" = "#7EC8E3",
    "Week 8" = "#F0B27A"
  )) +
  labs(
    x     = "Treatment",
    y     = "${yLab}",
    fill  = "Time Point",
    title = "${titleMap[p.arrangement]}"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    legend.position    = "right"
  )`;
}

function genLineCode(p) {
  const areaLine = p.fillArea
    ? `  geom_area(alpha = 0.12, position = "identity") +\n`
    : '';
  const ptLine = p.showPoints
    ? `  geom_point(size = ${p.lineWidth + 1}) +\n`
    : '';
  const smoothNote = p.smooth
    ? `  # 平滑插值：geom_smooth(se = FALSE, method = "loess") 可替代 geom_line\n`
    : '';
  return `library(ggplot2)

# data 包含列：week (0-4), value, group
ggplot(data, aes(
  x     = week,
  y     = value,
  color = group,
  group = group
)) +
${areaLine}  geom_line(
    linewidth = ${p.lineWidth},
    linetype  = ${R_LTYPE[p.lineType] || '"solid"'}
  ) +
${ptLine}${smoothNote}  scale_color_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  scale_x_continuous(breaks = 0:4, labels = paste0("W", 0:4)) +
  labs(
    x     = "Week",
    y     = "Response",
    color = "Group",
    title = "治疗响应随时间变化"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.minor = element_blank(),
    legend.position  = "right"
  )`;
}

function genBoxplotCode(p) {
  const whiskerNote = p.whisker === 'iqr'
    ? '    # 须线默认 1.5×IQR\n'
    : '    coef = 0,     # 须线延伸到最值\n';
  const notchArg   = p.notch         ? '    notch = TRUE,\n'                      : '';
  const outlierArg = p.showOutliers  ? '    outlier.shape = 1, outlier.alpha = 0.5,\n'
                                     : '    outlier.shape = NA,\n';
  const meanLine   = p.showMean
    ? `  stat_summary(\n    fun = mean, geom = "point",\n    shape = 18, size = 3, color = "white"\n  ) +\n`
    : '';
  return `library(ggplot2)

# data 包含列：group (factor), value
ggplot(data, aes(
  x    = group,
  y    = value,
  fill = group
)) +
  geom_boxplot(
${notchArg}${outlierArg}${whiskerNote}    width     = ${p.boxWidth},
    alpha     = ${p.fillAlpha},
    linewidth = 0.6
  ) +
${meanLine}  scale_fill_manual(values = c(
    "Control" = "#7EC8E3",
    "Drug A"  = "#F0B27A",
    "Drug B"  = "#95D5B2"
  )) +
  labs(
    x     = "Group",
    y     = "Response Value",
    title = "各组响应值分布"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position    = "none",
    panel.grid.major.x = element_blank()
  )`;
}

const CODE_GEN = {
  scatter: genScatterCode,
  bar:     genBarCode,
  line:    genLineCode,
  boxplot: genBoxplotCode,
};

// ─────────────────────────────────────────────
// 参数面板 HTML
// ─────────────────────────────────────────────
function togBtn(active, key) {
  return `<button class="p7-toggle${active ? ' p7-toggle--on' : ''}" data-toggle="${key}">
    <span class="p7-tog-track"><span class="p7-tog-thumb"></span></span>
    <span class="p7-tog-lbl">${active ? '开启' : '关闭'}</span>
  </button>`;
}
function tabRow(opts, activeVal, groupKey) {
  return `<div class="p7-opt-row">${opts.map(o =>
    `<button class="p7-opt-btn${o.val === activeVal ? ' active' : ''}" data-group="${groupKey}" data-val="${o.val}">${o.label}</button>`
  ).join('')}</div>`;
}
function sliderCtrl(paramKey, min, max, step, val) {
  return `<div class="p7-ctrl-hdr">
    <span class="p7-ctrl-lbl">${
      { size: '点大小', alpha: '透明度', barWidth: '柱宽', lineWidth: '线宽',
        boxWidth: '箱宽', fillAlpha: '填充透明度' }[paramKey]
    }</span>
    <span class="p7-ctrl-val" id="p7-val-${paramKey}">${val}</span>
  </div>
  <input class="p7-slider" type="range" data-param="${paramKey}"
    min="${min}" max="${max}" step="${step}" value="${val}">`;
}

function buildScatterParams(p) {
  return `
    <div class="p7-ctrl-group">${sliderCtrl('size', 1, 8, 1, p.size)}</div>
    <div class="p7-ctrl-group">${sliderCtrl('alpha', 0.1, 1.0, 0.1, p.alpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">抖动</span>
      ${tabRow([{val:'none',label:'无'},{val:'light',label:'轻微'},{val:'heavy',label:'明显'}], p.jitter, 'jitter')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">回归线</span>
      ${togBtn(p.regression, 'regression')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">点形状</span>
      <div class="p7-opt-row">${[
        {val:'circle',label:'●',title:'圆形'},{val:'triangle',label:'▲',title:'三角'},
        {val:'square',label:'■',title:'方形'},{val:'cross',label:'✕',title:'十字'},
      ].map(o =>
        `<button class="p7-shape-btn${o.val === p.shape ? ' active' : ''}" data-group="shape" data-val="${o.val}" title="${o.title}">${o.label}</button>`
      ).join('')}</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`;
}

function buildBarParams(p) {
  return `
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排列方式</span>
      ${tabRow([{val:'grouped',label:'分组'},{val:'stacked',label:'堆叠'},{val:'filled',label:'百分比'}], p.arrangement, 'arrangement')}
    </div>
    <div class="p7-ctrl-group">${sliderCtrl('barWidth', 0.3, 0.9, 0.05, p.barWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差线</span>
      ${togBtn(p.errorBars, 'errorBars')}
      <div class="p7-ctrl-note">分组模式下可见误差线</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`;
}

function buildLineParams(p) {
  return `
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">线型</span>
      ${tabRow([{val:'solid',label:'实线'},{val:'dashed',label:'虚线'},{val:'dotted',label:'点线'}], p.lineType, 'lineType')}
    </div>
    <div class="p7-ctrl-group">${sliderCtrl('lineWidth', 0.5, 3, 0.25, p.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据点</span>
      ${togBtn(p.showPoints, 'showPoints')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">平滑曲线</span>
      ${togBtn(p.smooth, 'smooth')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">面积填充</span>
      ${togBtn(p.fillArea, 'fillArea')}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`;
}

function buildBoxplotParams(p) {
  return `
    <div class="p7-ctrl-group">${sliderCtrl('boxWidth', 0.3, 0.9, 0.05, p.boxWidth)}</div>
    <div class="p7-ctrl-group">${sliderCtrl('fillAlpha', 0.1, 1.0, 0.05, p.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">须线样式</span>
      ${tabRow([{val:'iqr',label:'1.5×IQR'},{val:'minmax',label:'全范围'}], p.whisker, 'whisker')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示异常值</span>
      ${togBtn(p.showOutliers, 'showOutliers')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">Notch（槽口置信区间）</span>
      ${togBtn(p.notch, 'notch')}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示均值（菱形）</span>
      ${togBtn(p.showMean, 'showMean')}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`;
}

const PARAMS_BUILDERS = {
  scatter: buildScatterParams,
  bar:     buildBarParams,
  line:    buildLineParams,
  boxplot: buildBoxplotParams,
};

// ─────────────────────────────────────────────
// render()
// ─────────────────────────────────────────────
export function render() {
  const chevronSvg = `<svg class="p7-chevron" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/></svg>`;

  const chartTabsHtml = CHART_TYPES.map(ct => `
    <button class="p7-chart-tab${ct.id === 'scatter' ? ' active' : ''}" data-chart="${ct.id}">
      ${ct.name}
    </button>`).join('');

  const galleryCardsHtml = CHART_TYPES.map(ct => `
    <div class="p7-chart-card" data-chart="${ct.id}" id="p7-card-${ct.id}"
         role="button" tabindex="0" aria-label="打开 ${ct.name} 工作坊">
      <div class="p7-thumb-wrap" id="p7-thumb-${ct.id}"></div>
      <div class="p7-card-info">
        <div class="p7-card-name">${ct.name}</div>
        <div class="p7-card-en">${ct.en}</div>
        <div class="p7-card-tags">${ct.tags.map(t => `<span class="p7-tag">${t}</span>`).join('')}</div>
        <div class="p7-card-desc">${ct.desc}</div>
      </div>
      <div class="p7-card-cta">打开工作坊 →</div>
    </div>`).join('');

  return `
<div class="page-scroll">
<style>
/* ══ p07 作用域样式 ══ */
.p7-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark); display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
.p7-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 60% 50% at 50% 40%, rgba(126,200,227,0.07) 0%, transparent 70%);
  pointer-events:none;
}
.p7-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:.15em; text-transform:uppercase;
  margin-bottom:var(--space-sm);
}
.p7-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-.02em; line-height:1.1; color:var(--text-on-dark);
}
.p7-hero-sub {
  font-family:var(--font-heading); font-size:clamp(.9rem,1.8vw,1.25rem);
  font-weight:300; color:var(--text-on-dark-2); max-width:560px;
  line-height:1.75; margin-top:var(--space-sm);
}
.p7-batch-badge {
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 16px; border:1px solid rgba(126,200,227,.25);
  border-radius:var(--radius-full); font-size:var(--text-small);
  color:var(--accent); margin-bottom:var(--space-md);
}
.p7-scroll-hint {
  position:absolute; bottom:28px; left:50%; transform:translateX(-50%);
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p7-float 2s ease-in-out infinite;
}
@keyframes p7-float{0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)}}
.p7-container { max-width:960px; margin:0 auto; }
.p7-container-wide { max-width:1440px; margin:0 auto; }

/* ── Gallery ── */
.p7-gallery-section {
  background:var(--bg-light); color:var(--text-on-light);
  padding:var(--space-3xl) var(--space-lg);
}
.p7-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p7-sec-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-sec-sub {
  font-size:1.05rem; line-height:1.7; max-width:600px;
  margin:var(--space-sm) auto 0; opacity:.65;
}
.p7-chart-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md);
}
.p7-chart-card {
  background:var(--bg-light-elevated); border:1.5px solid var(--border-light);
  border-radius:var(--radius-md); overflow:hidden; cursor:pointer;
  transition:all .3s var(--ease-apple); display:flex; flex-direction:column;
}
.p7-chart-card:hover {
  border-color:var(--accent); transform:translateY(-4px); box-shadow:var(--shadow-hover);
}
.p7-chart-card.active {
  border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow);
}
.p7-thumb-wrap { background:var(--bg-dark); padding:12px 14px; }
.p7-card-info { padding:14px 14px 8px; flex:1; }
.p7-card-name {
  font-family:var(--font-display); font-size:1.1rem; font-weight:700;
  color:var(--text-on-light);
}
.p7-card-en {
  font-size:.75rem; color:var(--text-on-light-3); margin-top:1px;
  font-family:var(--font-code); letter-spacing:.05em;
}
.p7-card-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
.p7-tag {
  padding:2px 10px; background:var(--bg-light-alt);
  border:1px solid var(--border-light); border-radius:var(--radius-full);
  font-size:.72rem; color:var(--text-on-light-2);
}
.p7-chart-card.active .p7-tag {
  border-color:rgba(126,200,227,.3); color:var(--accent);
  background:rgba(126,200,227,.06);
}
.p7-card-desc {
  font-size:.8rem; line-height:1.5; color:var(--text-on-light-2); margin-top:8px;
}
.p7-card-cta {
  padding:8px 14px 12px; font-size:.78rem; color:var(--accent); font-weight:500;
}
.p7-chart-card:hover .p7-card-cta,
.p7-chart-card.active .p7-card-cta { color:var(--accent-hover); }

/* ── Workshop ── */
.p7-workshop-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg) var(--space-2xl);
}
.p7-ws-head {
  display:flex; align-items:flex-start; justify-content:space-between;
  gap:var(--space-md); flex-wrap:wrap; margin-bottom:var(--space-lg);
}
.p7-ws-title {
  font-family:var(--font-display); font-size:clamp(1.5rem,3vw,2.25rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-chart-tabs { display:flex; gap:6px; flex-wrap:wrap; align-self:flex-end; }
.p7-chart-tab {
  padding:10px 20px; background:var(--bg-dark-elevated);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-2); font-size:.9rem; cursor:pointer;
  transition:all var(--t-fast); min-height:44px; white-space:nowrap;
}
.p7-chart-tab:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-chart-tab.active {
  background:var(--accent); border-color:var(--accent);
  color:#1d1d1f; font-weight:600;
}
/* 3-panel grid */
.p7-ws-layout {
  display:grid; grid-template-columns:280px 1fr 360px;
  gap:var(--space-md); align-items:start;
}
.p7-panel {
  background:var(--bg-dark-elevated); border:1px solid var(--border-dark);
  border-radius:var(--radius-md); overflow:hidden;
}
.p7-panel-hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 16px; border-bottom:1px solid var(--border-dark);
  font-size:.9rem; font-weight:600; color:var(--text-on-dark); user-select:none;
}
.p7-panel-body { padding:16px; }
.p7-chevron { transition:transform var(--t-fast); flex-shrink:0; color:var(--text-on-dark-3); }
.p7-panel.collapsed .p7-chevron { transform:rotate(-90deg); }

/* Params */
.p7-ctrl-group { margin-bottom:20px; }
.p7-ctrl-group:last-of-type { margin-bottom:12px; }
.p7-ctrl-hdr { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.p7-ctrl-lbl { font-size:.85rem; color:var(--text-on-dark-2); display:block; margin-bottom:8px; }
.p7-ctrl-hdr .p7-ctrl-lbl { margin-bottom:0; }
.p7-ctrl-val { font-family:var(--font-code); font-size:.82rem; color:var(--accent); min-width:32px; text-align:right; }
.p7-slider {
  -webkit-appearance:none; appearance:none; width:100%; height:6px;
  border-radius:var(--radius-full); background:var(--border-dark); outline:none; cursor:pointer;
}
.p7-slider::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px; border-radius:50%;
  background:var(--accent); cursor:pointer; box-shadow:0 0 8px rgba(126,200,227,.4);
}
.p7-slider::-moz-range-thumb {
  width:20px; height:20px; border-radius:50%;
  background:var(--accent); border:none; cursor:pointer;
}
.p7-opt-row { display:flex; gap:4px; flex-wrap:wrap; }
.p7-opt-btn {
  padding:7px 14px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-3); font-size:.82rem; cursor:pointer;
  transition:all var(--t-fast); min-height:36px;
}
.p7-opt-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-opt-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-shape-btn {
  width:38px; height:38px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-sm);
  color:var(--text-on-dark-2); cursor:pointer; transition:all var(--t-fast);
  display:flex; align-items:center; justify-content:center; font-size:1rem;
}
.p7-shape-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-shape-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-toggle {
  display:inline-flex; align-items:center; gap:10px; cursor:pointer;
  background:none; border:none; padding:0; color:var(--text-on-dark-2);
  font-size:.85rem; min-height:36px;
}
.p7-tog-track {
  width:40px; height:22px; background:var(--border-dark);
  border-radius:11px; position:relative; transition:background var(--t-fast); flex-shrink:0;
}
.p7-tog-thumb {
  width:16px; height:16px; border-radius:50%; background:#666;
  position:absolute; top:3px; left:3px; transition:all var(--t-fast);
}
.p7-toggle.p7-toggle--on .p7-tog-track { background:rgba(126,200,227,.3); }
.p7-toggle.p7-toggle--on .p7-tog-thumb { background:var(--accent); left:21px; }
.p7-toggle.p7-toggle--on .p7-tog-lbl { color:var(--accent); }
.p7-ctrl-note { font-size:.75rem; color:var(--text-on-dark-3); margin-top:6px; }
.p7-reset-btn {
  width:100%; padding:10px; background:transparent;
  border:1px solid var(--border-dark); border-radius:var(--radius-md);
  color:var(--text-on-dark-3); cursor:pointer; font-size:.85rem;
  transition:all var(--t-fast); margin-top:4px; min-height:44px;
}
.p7-reset-btn:hover { border-color:var(--accent); color:var(--accent); }
/* Preview */
.p7-preview-panel .p7-panel-body { padding:12px; display:flex; flex-direction:column; gap:8px; }
#p7-d3-container { width:100%; }
.p7-preview-info {
  font-family:var(--font-code); font-size:.72rem;
  color:var(--text-on-dark-3); text-align:center; padding:4px 0;
}
/* Code panel */
.p7-code-panel .p7-panel-body { padding:0; display:flex; flex-direction:column; }
.p7-code-actions {
  display:flex; align-items:center; gap:8px;
  padding:10px 12px; border-top:1px solid var(--border-dark); flex-wrap:wrap;
}
.p7-export-btn {
  padding:9px 18px; background:transparent;
  border:1.5px solid var(--accent); border-radius:var(--radius-full);
  color:var(--accent); font-size:.85rem; cursor:pointer;
  transition:all var(--t-fast); min-height:40px;
}
.p7-export-btn:hover { background:var(--accent-subtle); }
.p7-export-btn:active { transform:scale(.97); }
/* Footer */
.p7-footer-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg); text-align:center;
}
.p7-footer-title {
  font-family:var(--font-display); font-size:clamp(1.5rem,3vw,2.25rem);
  font-weight:700; letter-spacing:-.02em; max-width:640px; margin:0 auto;
}
.p7-footer-desc {
  font-size:1rem; color:var(--text-on-dark-2); max-width:560px;
  margin:var(--space-sm) auto var(--space-lg); line-height:1.7;
}
.p7-footer-links { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }

/* ── Tablet ── */
@media (max-width:1024px) {
  .p7-ws-layout {
    grid-template-columns:240px 1fr;
    grid-template-areas:'params preview' 'code code';
  }
  .p7-code-panel { grid-area:code; }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); }
}
/* ── Mobile ── */
@media (max-width:768px) {
  .p7-gallery-section,.p7-workshop-section { padding:var(--space-xl) var(--space-sm); }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
  .p7-card-desc { display:none; }
  .p7-ws-head { flex-direction:column; }
  .p7-chart-tabs { overflow-x:auto; scrollbar-width:none; }
  .p7-chart-tabs::-webkit-scrollbar { display:none; }
  .p7-chart-tab { padding:8px 14px; font-size:.82rem; }
  .p7-ws-layout { display:flex; flex-direction:column; gap:0; }
  .p7-panel { border-radius:0; border-left:none; border-right:none; border-top:none; }
  .p7-panel:first-child { border-top:1px solid var(--border-dark); border-radius:var(--radius-md) var(--radius-md) 0 0; border-left:1px solid var(--border-dark); border-right:1px solid var(--border-dark); }
  .p7-panel:last-child { border-radius:0 0 var(--radius-md) var(--radius-md); border-left:1px solid var(--border-dark); border-right:1px solid var(--border-dark); border-bottom:1px solid var(--border-dark); }
  .p7-panel-hdr { cursor:pointer; }
  .p7-panel-body { overflow:hidden; transition:max-height .35s var(--ease-apple); }
  .p7-panel-body.p7-collapsed { max-height:0 !important; padding:0 !important; }
  .p7-panel-body.p7-expanded { max-height:800px; }
  .p7-slider::-webkit-slider-thumb { width:24px; height:24px; }
  .p7-slider::-moz-range-thumb { width:24px; height:24px; }
  .p7-slider { min-height:32px; }
  .p7-footer-links { flex-direction:column; align-items:center; }
}
@media (max-width:480px) {
  .p7-chart-grid { grid-template-columns:1fr 1fr; gap:10px; }
}
@media (max-width:400px) {
  .p7-chart-grid { grid-template-columns:1fr; }
}
</style>

<!-- Hero -->
<section class="p7-hero section-hero-full" id="p7-hero">
  <div class="p7-batch-badge">第一批 · 4 种图表</div>
  <div class="p7-eyebrow">模块一 · 第 7 页</div>
  <h1 class="p7-hero-title">ggplot2<br>图表工作坊</h1>
  <p class="p7-hero-sub">12 种常用图表 · 参数实时调节<br>R 代码即时生成 · 一键导出脚本</p>
  <div class="hero-quicknav" id="p7-hero-nav">
    <button class="hero-quicknav__item" data-target="#p7-gallery">图表类型库</button>
    <button class="hero-quicknav__item" data-target="#p7-workshop">交互工作坊</button>
  </div>
  <div class="p7-scroll-hint">↓ 向下探索</div>
</section>

<!-- Gallery -->
<section class="p7-gallery-section" id="p7-gallery">
  <div class="p7-container">
    <div class="p7-sec-hdr" id="p7-gallery-hdr">
      <div class="p7-eyebrow" style="color:var(--text-on-light-2)">图表类型</div>
      <h2 class="p7-sec-title">4 种核心图表</h2>
      <p class="p7-sec-sub">点击任意图表卡片进入工作坊，实时调节参数并同步生成 R 代码。</p>
    </div>
    <div class="p7-chart-grid" id="p7-chart-grid">${galleryCardsHtml}</div>
  </div>
</section>

<!-- Workshop -->
<section class="p7-workshop-section" id="p7-workshop">
  <div class="p7-container-wide">
    <div class="p7-ws-head">
      <div>
        <div class="p7-eyebrow">交互工作坊</div>
        <h2 class="p7-ws-title" id="p7-ws-title">散点图</h2>
      </div>
      <div class="p7-chart-tabs" id="p7-chart-tabs">${chartTabsHtml}</div>
    </div>
    <div class="p7-ws-layout" id="p7-ws-layout">

      <!-- 左：参数 -->
      <div class="p7-panel p7-params-panel" id="p7-params-panel">
        <div class="p7-panel-hdr" id="p7-params-hdr">
          <span>⚙ 参数控制</span>${chevronSvg}
        </div>
        <div class="p7-panel-body" id="p7-params-body"></div>
      </div>

      <!-- 中：预览 -->
      <div class="p7-panel p7-preview-panel" id="p7-preview-panel">
        <div class="p7-panel-hdr" id="p7-preview-hdr">
          <span>📊 实时预览</span>${chevronSvg}
        </div>
        <div class="p7-panel-body" id="p7-preview-body">
          <div id="p7-d3-container"></div>
          <div class="p7-preview-info" id="p7-preview-info">Iris 数据集 · 60 个观测点 · 3 物种</div>
        </div>
      </div>

      <!-- 右：代码 -->
      <div class="p7-panel p7-code-panel" id="p7-code-panel">
        <div class="p7-panel-hdr" id="p7-code-hdr">
          <span>{ } R 代码</span>${chevronSvg}
        </div>
        <div class="p7-panel-body" id="p7-code-body">
          <div id="p7-code-editor"></div>
          <div class="p7-code-actions">
            <button class="p7-export-btn" id="p7-export-btn">↓ 导出脚本</button>
            <div id="p7-copy-wrap"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="p7-footer-section" id="p7-footer">
  <div class="p7-container" id="p7-footer-inner">
    <div class="p7-eyebrow" style="margin-bottom:var(--space-sm)">继续探索</div>
    <h2 class="p7-footer-title">掌握参数，让图表更出色</h2>
    <p class="p7-footer-desc">
      第 8 页深入 R 配色方案与出版级图表调整——<br>
      主题定制器、期刊规格导出、patchwork 多面板布局。
    </p>
    <div class="p7-footer-links">
      <button class="btn-ghost" id="p7-btn-prev">← 上一页：图层语法</button>
      <button class="btn-primary" id="p7-btn-next">下一页：R 配色 →</button>
    </div>
  </div>
</section>
</div>`;
}

// ─────────────────────────────────────────────
// 工作坊核心逻辑
// ─────────────────────────────────────────────
function selectChart(chartId) {
  if (!CHART_TYPES.find(ct => ct.id === chartId)) return;
  state.currentChart = chartId;

  document.querySelectorAll('.p7-chart-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.chart === chartId));
  document.querySelectorAll('.p7-chart-card').forEach(c =>
    c.classList.toggle('active', c.dataset.chart === chartId));

  const titleEl = document.getElementById('p7-ws-title');
  const ct = CHART_TYPES.find(c => c.id === chartId);
  if (titleEl && ct) titleEl.textContent = ct.name;

  rebuildParams();
  redrawChart();
  updateCode();
  updatePreviewInfo();
}

function rebuildParams() {
  const body = document.getElementById('p7-params-body');
  if (!body) return;
  body.innerHTML = PARAMS_BUILDERS[state.currentChart](state.params[state.currentChart]);
  // On mobile, re-apply collapsed state if needed
  if (window.innerWidth <= 768) {
    const panel = body.closest('.p7-panel');
    if (panel && panel.classList.contains('collapsed')) {
      body.classList.add('p7-collapsed');
      body.classList.remove('p7-expanded');
    }
  }
}

function redrawChart() {
  const container = document.getElementById('p7-d3-container');
  if (!container) return;
  CHART_FNS[state.currentChart](container, state.params[state.currentChart]);
}

function updateCode() {
  if (!state.editor) return;
  const newCode = CODE_GEN[state.currentChart](state.params[state.currentChart]);
  state.editor.setCode(newCode);
}

function updatePreviewInfo() {
  const el = document.getElementById('p7-preview-info');
  if (!el) return;
  const ct = CHART_TYPES.find(c => c.id === state.currentChart);
  if (ct) el.textContent = ct.info;
}

function handleParamChange(key, value) {
  state.params[state.currentChart][key] = value;
  redrawChart();
  updateCode();
}

function resetParams() {
  state.params[state.currentChart] = JSON.parse(JSON.stringify(DEFAULT_PARAMS[state.currentChart]));
  rebuildParams();
  redrawChart();
  updateCode();
}

// ─────────────────────────────────────────────
// 移动端手风琴
// ─────────────────────────────────────────────
function initMobileAccordion() {
  if (window.innerWidth > 768) return;

  const panels = [
    { hdrId: 'p7-params-hdr',  bodyId: 'p7-params-body',  expanded: false },
    { hdrId: 'p7-preview-hdr', bodyId: 'p7-preview-body', expanded: true  },
    { hdrId: 'p7-code-hdr',    bodyId: 'p7-code-body',    expanded: false },
  ];

  panels.forEach(def => {
    const body = document.getElementById(def.bodyId);
    if (!body) return;
    if (def.expanded) {
      body.classList.add('p7-expanded');
    } else {
      body.classList.add('p7-collapsed');
      body.closest('.p7-panel')?.classList.add('collapsed');
    }

    const hdr = document.getElementById(def.hdrId);
    if (!hdr) return;
    const onClick = () => {
      const isExpanded = body.classList.contains('p7-expanded');
      if (isExpanded) {
        body.classList.replace('p7-expanded', 'p7-collapsed');
        hdr.closest('.p7-panel')?.classList.add('collapsed');
      } else {
        body.classList.replace('p7-collapsed', 'p7-expanded');
        hdr.closest('.p7-panel')?.classList.remove('collapsed');
      }
    };
    hdr.addEventListener('click', onClick);
    state.cleanups.push(() => hdr.removeEventListener('click', onClick));
  });
}

// ─────────────────────────────────────────────
// GSAP 动画
// ─────────────────────────────────────────────
function initAnimations() {
  gsap.fromTo('.p7-hero-title', { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.1, delay: 0.1, ease: 'power3.out' });
  gsap.fromTo('.p7-hero-sub', { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
  gsap.fromTo('#p7-hero-nav', { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' });

  gsap.from('#p7-gallery-hdr', {
    scrollTrigger: { trigger: '#p7-gallery', start: 'top 85%' },
    opacity: 0, y: 50, duration: 0.8, ease: 'power3.out',
  });
  gsap.from('.p7-chart-card', {
    scrollTrigger: { trigger: '#p7-chart-grid', start: 'top 85%' },
    opacity: 0, y: 40, stagger: 0.1, duration: 0.6, ease: 'power3.out',
  });
  gsap.from('#p7-ws-layout', {
    scrollTrigger: { trigger: '#p7-workshop', start: 'top 80%' },
    opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
  });
  gsap.from('#p7-footer-inner', {
    scrollTrigger: { trigger: '#p7-footer', start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
  });
}

// ─────────────────────────────────────────────
// init()
// ─────────────────────────────────────────────
export function init() {
  // 绘制缩略图
  CHART_TYPES.forEach(ct => {
    const wrap = document.getElementById(`p7-thumb-${ct.id}`);
    if (wrap) THUMB_FNS[ct.id](wrap);
  });

  // 初始化 CodeMirror
  const codeContainer = document.getElementById('p7-code-editor');
  if (codeContainer) {
    state.editor = createCodeEditor(codeContainer, {
      code: CODE_GEN.scatter(state.params.scatter),
      language: 'r',
    });
  }

  // 复制按钮
  const copyWrap = document.getElementById('p7-copy-wrap');
  if (copyWrap) {
    state.copyBtn = createCopyButton(copyWrap, {
      getText: () => state.editor ? state.editor.getCode() : '',
      label: '复制代码',
      successLabel: '已复制',
    });
  }

  // 初始渲染（scatter）
  selectChart('scatter');

  // 图库卡片
  const grid = document.getElementById('p7-chart-grid');
  if (grid) {
    const onClick = e => {
      const card = e.target.closest('[data-chart]');
      if (card) {
        selectChart(card.dataset.chart);
        document.getElementById('p7-workshop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const onKey = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('[data-chart]');
        if (card) { e.preventDefault(); selectChart(card.dataset.chart); }
      }
    };
    grid.addEventListener('click', onClick);
    grid.addEventListener('keydown', onKey);
    state.cleanups.push(() => {
      grid.removeEventListener('click', onClick);
      grid.removeEventListener('keydown', onKey);
    });
  }

  // 图表类型标签页
  const tabsEl = document.getElementById('p7-chart-tabs');
  if (tabsEl) {
    const onTabClick = e => {
      const tab = e.target.closest('[data-chart]');
      if (tab) selectChart(tab.dataset.chart);
    };
    tabsEl.addEventListener('click', onTabClick);
    state.cleanups.push(() => tabsEl.removeEventListener('click', onTabClick));
  }

  // 参数事件委托
  const paramsBody = document.getElementById('p7-params-body');
  if (paramsBody) {
    const onInput = e => {
      if (e.target.dataset.param) {
        const key = e.target.dataset.param;
        const val = parseFloat(e.target.value);
        const display = document.getElementById(`p7-val-${key}`);
        if (display) display.textContent = val;
        handleParamChange(key, val);
      }
    };
    const onParamClick = e => {
      const optBtn = e.target.closest('[data-group][data-val]');
      if (optBtn) {
        const group = optBtn.dataset.group;
        const val   = optBtn.dataset.val;
        paramsBody.querySelectorAll(`[data-group="${group}"]`)
          .forEach(b => b.classList.remove('active'));
        optBtn.classList.add('active');
        handleParamChange(group, val);
        return;
      }
      const togBtn2 = e.target.closest('[data-toggle]');
      if (togBtn2) {
        const key = togBtn2.dataset.toggle;
        const newVal = !state.params[state.currentChart][key];
        state.params[state.currentChart][key] = newVal;
        togBtn2.classList.toggle('p7-toggle--on', newVal);
        const lbl = togBtn2.querySelector('.p7-tog-lbl');
        if (lbl) lbl.textContent = newVal ? '开启' : '关闭';
        redrawChart();
        updateCode();
        return;
      }
      if (e.target.closest('[data-reset]')) resetParams();
    };
    paramsBody.addEventListener('input', onInput);
    paramsBody.addEventListener('click', onParamClick);
    state.cleanups.push(() => {
      paramsBody.removeEventListener('input', onInput);
      paramsBody.removeEventListener('click', onParamClick);
    });
  }

  // 导出按钮
  const exportBtn = document.getElementById('p7-export-btn');
  if (exportBtn) {
    const onExport = () => {
      const code = state.editor ? state.editor.getCode() : '';
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${state.currentChart}_plot.R`;
      document.body.appendChild(a); a.click();
      a.remove(); URL.revokeObjectURL(url);
    };
    exportBtn.addEventListener('click', onExport);
    state.cleanups.push(() => exportBtn.removeEventListener('click', onExport));
  }

  // Hero 快捷导航
  document.querySelectorAll('#p7-hero-nav .hero-quicknav__item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.target)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 页脚导航
  document.getElementById('p7-btn-prev')?.addEventListener('click', () => navigateTo('m1-p6'));
  document.getElementById('p7-btn-next')?.addEventListener('click', () => navigateTo('m1-p8'));

  // 移动端手风琴
  initMobileAccordion();

  // GSAP 动画
  initAnimations();
}

// ─────────────────────────────────────────────
// destroy()
// ─────────────────────────────────────────────
export function destroy() {
  killAll();
  if (state.editor) { state.editor.destroy(); state.editor = null; }
  if (state.copyBtn) { state.copyBtn.destroy(); state.copyBtn = null; }
  state.cleanups.forEach(fn => fn());
  state.cleanups = [];
  state.currentChart = 'scatter';
  state.params = JSON.parse(JSON.stringify(DEFAULT_PARAMS));
}
