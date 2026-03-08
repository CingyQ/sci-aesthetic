// ChartPreview.js — D3 SVG 画布封装
// 深色背景 #1a1a2e，viewBox 响应式，preserveAspectRatio

import * as d3 from 'd3';

/**
 * 创建 D3 SVG 图表画布
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {number} options.width - SVG 宽度（viewBox）
 * @param {number} options.height - SVG 高度（viewBox）
 * @param {Object} options.margin - 图表边距
 * @param {string} options.bgColor - 画布背景色
 * @param {number} options.radius - 背景圆角
 * @returns {{ svg, g, innerWidth, innerHeight, update, destroy }}
 */
export function createChartPreview(container, {
  width = 600,
  height = 400,
  margin = { top: 40, right: 40, bottom: 60, left: 60 },
  bgColor = '#1a1a2e',
  radius = 12
} = {}) {
  // 创建包装容器
  const wrapper = document.createElement('div');
  wrapper.className = 'chart-preview-wrapper';
  wrapper.style.cssText = 'width:100%;max-width:' + width + 'px;';
  container.appendChild(wrapper);

  // 创建 SVG
  const svg = d3.select(wrapper)
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('class', 'chart-svg')
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('height', 'auto')
    .style('display', 'block')
    .style('border-radius', radius + 'px')
    .style('overflow', 'hidden');

  // 深色画布背景
  svg.append('rect')
    .attr('class', 'chart-bg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', bgColor)
    .attr('rx', radius);

  // 绘图区域 <g>（应用 margin）
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  return {
    svg,
    g,
    innerWidth,
    innerHeight,
    width,
    height,
    margin,

    /** 清空绘图区域并返回 g */
    clear() {
      g.selectAll('*').remove();
      return g;
    },

    /** 更新 viewBox 尺寸 */
    resize(newWidth, newHeight) {
      svg.attr('viewBox', `0 0 ${newWidth} ${newHeight}`);
      svg.select('.chart-bg')
        .attr('width', newWidth)
        .attr('height', newHeight);
    },

    /** 销毁 SVG */
    destroy() {
      wrapper.remove();
    }
  };
}

// 导出 d3 供页面直接使用
export { d3 };
