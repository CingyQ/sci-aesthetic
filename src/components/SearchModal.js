// 全局搜索 Cmd+K / Ctrl+K — 模态弹窗 + 模糊匹配 + 键盘导航
import { navigateTo } from '../utils/router.js';

// 搜索数据：所有页面标题 + 关键词
const SEARCH_DATA = [
  { id: 'home', title: '首页', keywords: ['首页', '主页', 'home', '科研美学'] },
  { id: 'm1-p1', title: '色彩理论基础', keywords: ['色彩', '色轮', 'HSL', 'RGB', 'CMYK', '色彩空间', 'color theory'] },
  { id: 'm1-p2', title: '色彩和谐与科研配色', keywords: ['配色', '互补', '类似', '三角', 'deltaE', '色温', 'harmony', 'palette'] },
  { id: 'm1-p3', title: '配色生成器与数据配色', keywords: ['生成器', '连续', '发散', '定性', 'sequential', 'diverging', 'qualitative'] },
  { id: 'm1-p4', title: '色彩与阅读无障碍', keywords: ['无障碍', 'WCAG', '对比度', 'accessibility', '字体', '排版', '可读性', '字号'] },
  { id: 'm1-p5', title: '图表选择指南', keywords: ['图表', '选择', '决策树', '散点图', '柱状图', '折线图', 'chart'] },
  { id: 'm1-p6', title: 'ggplot2 图层语法与分面', keywords: ['ggplot2', 'R', '图层', 'geom', 'facet', '分面', '语法'] },
  { id: 'm1-p7', title: 'ggplot2 图表工作坊', keywords: ['工作坊', 'workshop', 'scatter', 'bar', 'boxplot', 'violin'] },
  { id: 'm1-p8', title: 'R 配色与出版级图表', keywords: ['R', 'viridis', 'RColorBrewer', 'ggsci', 'theme', '出版'] },
  { id: 'm1-p9', title: 'Python 可视化与数据叙事', keywords: ['Python', 'matplotlib', 'seaborn', 'annotate', '叙事'] },
  { id: 'm1-p10', title: '科研绘图工作流与导出', keywords: ['工作流', '导出', 'SVG', 'PDF', 'PNG', 'TIFF', 'DPI', '期刊'] },
  { id: 'm2-p1', title: 'AI 绘图工具全景', keywords: ['AI', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'BioRender'] },
  { id: 'm2-p2', title: 'Prompt 工程', keywords: ['Prompt', '提示词', '评分', '模板'] },
  { id: 'm2-p3', title: 'AI 图片矢量化', keywords: ['矢量化', 'Image Trace', 'vectorize', 'trace'] },
  { id: 'm2-p4', title: 'AI 伦理与版权', keywords: ['伦理', '版权', 'ethics', '期刊政策'] },
  { id: 'm2-p5', title: 'AI 辅助流程图设计', keywords: ['流程图', 'diagram', '示意图', '信号通路'] },
  { id: 'm2-p6', title: 'AI 绘图实战案例集', keywords: ['案例', 'Graphical Abstract', '实验', '综述'] },
  { id: 'm3-p1', title: '矢量 vs 位图', keywords: ['矢量', '位图', 'raster', 'vector', '缩放'] },
  { id: 'm3-p2', title: 'Illustrator 核心工具', keywords: ['Illustrator', 'AI', '工具', '快捷键'] },
  { id: 'm3-p3', title: '贝塞尔曲线与路径', keywords: ['贝塞尔', 'bezier', '曲线', '路径', '锚点'] },
  { id: 'm3-p4', title: '图表美化实战', keywords: ['美化', 'beautify', 'Before/After', '出版级'] },
  { id: 'm3-p5', title: 'SVG 编辑与优化', keywords: ['SVG', '编辑', '优化', 'viewBox', '路径'] },
  { id: 'm3-p6', title: '多面板 Figure 组合', keywords: ['面板', 'patchwork', 'subplot', '布局', 'Figure'] },
  { id: 'm3-p7', title: '素材资源站', keywords: ['素材', 'Freepik', 'BioRender', 'Flaticon', '图标'] },
  { id: 'm4-p1', title: '设计速成指南', keywords: ['PPT', '格式塔', '视觉层次', '信噪比', '设计'] },
  { id: 'm4-p2', title: '学术演示全场景', keywords: ['排版', '字体', 'typography', '行距', '对齐'] },
  { id: 'm4-p3', title: 'PPT 改造工坊', keywords: ['改造', 'makeover', 'Before/After'] },
  { id: 'm4-p4', title: '学术海报与 GA', keywords: ['海报', 'poster', '会议', 'CMYK', '打印', '图摘', 'graphical abstract'] },
  { id: 'ref', title: '速查手册', keywords: ['速查', '手册', 'reference', '快捷键'] },
];

// 模块前缀 → 模块名
const MODULE_NAMES = {
  m1: '数据可视化',
  m2: 'AI 辅助',
  m3: '矢量设计',
  m4: '演示设计',
};

let modalEl = null;
let isOpen = false;
let selectedIndex = 0;
let currentResults = [];

/**
 * 模糊匹配
 */
function fuzzyMatch(query, items) {
  const q = query.toLowerCase().trim();
  if (!q) return items.slice(0, 8);

  return items
    .map(item => {
      let score = 0;
      const title = item.title.toLowerCase();
      const keywords = item.keywords.join(' ').toLowerCase();

      // 标题完全包含
      if (title.includes(q)) score += 100;
      // 标题开头匹配
      if (title.startsWith(q)) score += 50;
      // 关键词匹配
      if (keywords.includes(q)) score += 30;
      // 逐字匹配
      const qChars = q.split('');
      let matchCount = 0;
      let lastIdx = -1;
      for (const ch of qChars) {
        const idx = title.indexOf(ch, lastIdx + 1);
        if (idx > -1) {
          matchCount++;
          lastIdx = idx;
        }
      }
      score += (matchCount / qChars.length) * 20;

      // 同样检查关键词
      matchCount = 0;
      lastIdx = -1;
      for (const ch of qChars) {
        const idx = keywords.indexOf(ch, lastIdx + 1);
        if (idx > -1) {
          matchCount++;
          lastIdx = idx;
        }
      }
      score += (matchCount / qChars.length) * 10;

      return { ...item, score };
    })
    .filter(item => item.score > 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

function getModuleLabel(id) {
  const prefix = id.split('-')[0];
  return MODULE_NAMES[prefix] || '';
}

function renderResults(results) {
  const listEl = modalEl.querySelector('.search-results');
  if (!listEl) return;

  if (results.length === 0) {
    listEl.innerHTML = '<div class="search-empty">没有找到匹配的页面</div>';
    return;
  }

  listEl.innerHTML = results.map((item, i) => {
    const moduleLabel = getModuleLabel(item.id);
    const isSelected = i === selectedIndex;
    return `
      <button class="search-result-item ${isSelected ? 'selected' : ''}" data-index="${i}" data-route="${item.id}">
        <span class="search-result-title">${item.title}</span>
        ${moduleLabel ? `<span class="search-result-module">${moduleLabel}</span>` : ''}
      </button>
    `;
  }).join('');
}

function open() {
  if (isOpen) return;
  isOpen = true;
  selectedIndex = 0;

  if (!modalEl) {
    createModal();
  }

  modalEl.classList.add('active');
  const input = modalEl.querySelector('.search-input');
  input.value = '';
  currentResults = fuzzyMatch('', SEARCH_DATA);
  renderResults(currentResults);

  // 延迟聚焦（等 CSS transition 开始）
  requestAnimationFrame(() => input.focus());
}

function close() {
  if (!isOpen) return;
  isOpen = false;
  if (modalEl) {
    modalEl.classList.remove('active');
  }
}

function navigate(route) {
  close();
  navigateTo(route);
}

function createModal() {
  modalEl = document.createElement('div');
  modalEl.className = 'search-modal-overlay';
  modalEl.innerHTML = `
    <div class="search-modal">
      <div class="search-input-wrapper">
        <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input class="search-input" type="text" placeholder="搜索页面…" autocomplete="off" />
        <kbd class="search-kbd">ESC</kbd>
      </div>
      <div class="search-results"></div>
    </div>
  `;
  document.body.appendChild(modalEl);

  // 点击遮罩关闭
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) close();
  });

  // 输入事件
  const input = modalEl.querySelector('.search-input');
  input.addEventListener('input', () => {
    selectedIndex = 0;
    currentResults = fuzzyMatch(input.value, SEARCH_DATA);
    renderResults(currentResults);
  });

  // 键盘导航
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
      renderResults(currentResults);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      renderResults(currentResults);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentResults[selectedIndex]) {
        navigate(currentResults[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      close();
    }
  });

  // 结果点击
  modalEl.querySelector('.search-results').addEventListener('click', (e) => {
    const item = e.target.closest('.search-result-item');
    if (item) {
      navigate(item.dataset.route);
    }
  });
}

/**
 * 初始化搜索 — 绑定 Cmd+K / Ctrl+K
 */
export function initSearch() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) {
        close();
      } else {
        open();
      }
    }
  });
}

/**
 * 公开的打开方法（移动端按钮调用）
 */
export function openSearch() {
  open();
}
