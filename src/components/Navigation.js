// 导航组件 — 侧边栏 + 底部 Tab Bar + 顶部导航栏 + Tablet 汉堡菜单
// 与路由联动：点击导航项切换路由，路由变化更新高亮状态

import { navigateTo, getCurrentRoute, onRouteChange } from '../utils/router.js';
import { getModuleProgress, isVisited } from '../utils/progress.js';

// ========== 导航数据 ==========

const NAV_DATA = {
  modules: [
    {
      id: 'm1',
      title: '科研数据可视化',
      shortTitle: '可视化',
      color: 'var(--module-1)',
      totalPages: 10,
      pages: [
        { id: 'm1-p1', title: '色彩理论基础' },
        { id: 'm1-p2', title: '色彩和谐与科研配色' },
        { id: 'm1-p3', title: '配色生成器与数据配色' },
        { id: 'm1-p4', title: '色彩与阅读无障碍' },
        { id: 'm1-p5', title: '图表选择指南' },
        { id: 'm1-p6', title: 'ggplot2 图层语法与分面' },
        { id: 'm1-p7', title: 'ggplot2 图表工作坊' },
        { id: 'm1-p8', title: 'R 配色与出版级图表' },
        { id: 'm1-p9', title: 'Python 可视化与数据叙事' },
        { id: 'm1-p10', title: '科研绘图工作流与导出' },
      ],
    },
    {
      id: 'm2',
      title: 'AI 辅助科研绘图',
      shortTitle: 'AI 辅助',
      color: 'var(--module-2)',
      totalPages: 6,
      pages: [
        { id: 'm2-p1', title: 'AI 绘图工具全景' },
        { id: 'm2-p2', title: 'Prompt 工程' },
        { id: 'm2-p3', title: 'AI 图片矢量化' },
        { id: 'm2-p4', title: 'AI 伦理与版权' },
        { id: 'm2-p5', title: 'AI 辅助流程图设计' },
        { id: 'm2-p6', title: 'AI 绘图实战案例集' },
      ],
    },
    {
      id: 'm3',
      title: '矢量绘图与设计',
      shortTitle: '矢量设计',
      color: 'var(--module-3)',
      totalPages: 7,
      pages: [
        { id: 'm3-p1', title: '矢量 vs 位图' },
        { id: 'm3-p2', title: 'Illustrator 核心工具' },
        { id: 'm3-p3', title: '贝塞尔曲线与路径' },
        { id: 'm3-p4', title: '图表美化实战' },
        { id: 'm3-p5', title: 'SVG 编辑与优化' },
        { id: 'm3-p6', title: '多面板 Figure 组合' },
        { id: 'm3-p7', title: '素材资源站' },
      ],
    },
    {
      id: 'm4',
      title: '学术演示设计',
      shortTitle: '演示设计',
      color: 'var(--module-4)',
      totalPages: 8,
      pages: [
        { id: 'm4-p1', title: 'PPT 设计原则' },
        { id: 'm4-p2', title: '排版与字体' },
        { id: 'm4-p3', title: '注意力与视觉流' },
        { id: 'm4-p4', title: 'PPT 改造案例' },
        { id: 'm4-p5', title: '学术海报设计' },
        { id: 'm4-p6', title: 'Graphical Abstract' },
        { id: 'm4-p7', title: '科研信息图' },
        { id: 'm4-p8', title: '科研动画基础' },
      ],
    },
  ],
};

// ========== SVG 图标 ==========

const ICONS = {
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  m1: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  m2: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0112 2z"/><circle cx="12" cy="6" r="1"/></svg>',
  m3: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  m4: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  back: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
  hamburger: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  chevron: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  ref: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
};

// Tab Bar 图标（用模块 key）
const TAB_ICONS = ['home', 'm1', 'm2', 'm3', 'm4'];
const TAB_LABELS = ['首页', '可视化', 'AI 辅助', '矢量设计', '演示设计'];

// ========== 构建侧边栏 HTML ==========

function buildSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let html = '';

  // 侧边栏头部
  html += `
    <div class="sidebar-header">
      <span class="sidebar-logo" style="font-family:var(--font-display);letter-spacing:0.03em;">SciAesthetic</span>
      <button class="btn-icon sidebar-close-btn" id="sidebar-close-btn" aria-label="关闭菜单">
        ${ICONS.close}
      </button>
    </div>
  `;

  // 首页链接
  html += `
    <div class="nav-module-group">
      <a class="nav-item" data-route="home" href="#home">
        <span class="nav-item-icon">${ICONS.home}</span>
        首页
      </a>
    </div>
  `;

  // 4 个模块分组
  NAV_DATA.modules.forEach((mod) => {
    const progress = getModuleProgress(mod.id);
    html += `
      <div class="nav-module-group" data-module="${mod.id}">
        <div class="nav-module-title" data-toggle="${mod.id}">
          <span class="nav-module-color" style="background:${mod.color};"></span>
          <span class="nav-module-label">${mod.title}</span>
          ${progress > 0 ? `<span class="nav-module-progress-badge" style="color:${mod.color}">${progress}%</span>` : ''}
          <span class="nav-module-chevron">${ICONS.chevron}</span>
        </div>
        <div class="nav-page-list" id="nav-pages-${mod.id}">
          ${mod.pages
            .map(
              (page, i) => {
                const visited = isVisited(page.id);
                return `
            <a class="nav-item nav-page-item ${visited ? 'visited' : ''}" data-route="${page.id}" href="#${page.id}">
              <span class="nav-page-num">${visited ? ICONS.check : (i + 1)}</span>
              <span class="nav-page-title">${page.title}</span>
            </a>
          `;
              }
            )
            .join('')}
        </div>
      </div>
    `;
  });

  // 速查手册
  html += `
    <div class="nav-module-group">
      <a class="nav-item" data-route="ref" href="#ref">
        <span class="nav-item-icon">${ICONS.ref}</span>
        速查手册
      </a>
    </div>
  `;

  sidebar.innerHTML = html;

  // 绑定模块折叠/展开
  sidebar.querySelectorAll('.nav-module-title[data-toggle]').forEach((title) => {
    title.addEventListener('click', () => {
      const moduleId = title.getAttribute('data-toggle');
      const pageList = document.getElementById(`nav-pages-${moduleId}`);
      const group = title.closest('.nav-module-group');
      if (pageList && group) {
        group.classList.toggle('expanded');
      }
    });
  });

  // 绑定导航点击（阻止默认 hash 跳转，用 navigateTo）
  sidebar.querySelectorAll('.nav-item[data-route]').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const route = item.getAttribute('data-route');
      navigateTo(route);
      // Tablet: 点击后关闭侧边栏
      closeSidebar();
    });
  });

  // 关闭按钮
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }
}

// ========== 构建汉堡菜单按钮 ==========

function buildHamburger() {
  // 在 body 中添加汉堡按钮（tablet 可见）
  const btn = document.createElement('button');
  btn.className = 'hamburger-btn';
  btn.id = 'hamburger-btn';
  btn.setAttribute('aria-label', '打开菜单');
  btn.innerHTML = ICONS.hamburger;
  document.body.appendChild(btn);

  btn.addEventListener('click', openSidebar);

  // 遮罩层点击关闭
  const overlay = document.getElementById('sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
}

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('open');
  if (overlay) overlay.classList.add('active');
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
}

// ========== 构建底部 Tab Bar ==========

function buildTabBar() {
  const tabBar = document.getElementById('tab-bar');
  if (!tabBar) return;

  let html = '';

  TAB_ICONS.forEach((key, i) => {
    const route = key === 'home' ? 'home' : `${key}-p1`;
    html += `
      <button class="tab-item" data-tab="${key}" data-route="${route}" aria-label="${TAB_LABELS[i]}">
        ${ICONS[key]}
        <span>${TAB_LABELS[i]}</span>
      </button>
    `;
  });

  tabBar.innerHTML = html;

  // 绑定点击
  tabBar.querySelectorAll('.tab-item').forEach((item) => {
    item.addEventListener('click', () => {
      const route = item.getAttribute('data-route');
      navigateTo(route);
    });
  });
}

// ========== 构建移动端顶部导航栏 ==========

function buildTopBar() {
  const topBar = document.getElementById('mobile-top-bar');
  if (!topBar) return;

  topBar.innerHTML = `
    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="打开菜单">
      ${ICONS.hamburger}
    </button>
    <span class="mobile-page-title" id="mobile-page-title"></span>
    <span class="mobile-page-index" id="mobile-page-index"></span>
  `;

  // 菜单按钮：打开侧边栏
  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    openSidebar();
  });
}

// ========== 更新导航状态 ==========

function updateNavigation(route) {
  updateSidebar(route);
  updateTabBar(route);
  updateTopBar(route);
}

function updateSidebar(route) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // 清除所有 active
  sidebar.querySelectorAll('.nav-item.active').forEach((item) => {
    item.classList.remove('active');
  });

  // 设置当前 active
  const activeItem = sidebar.querySelector(`.nav-item[data-route="${route}"]`);
  if (activeItem) {
    activeItem.classList.add('active');

    // 自动展开所在模块分组
    const group = activeItem.closest('.nav-module-group');
    if (group && group.dataset.module) {
      group.classList.add('expanded');
    }
  }

}

function updateTabBar(route) {
  const tabBar = document.getElementById('tab-bar');
  if (!tabBar) return;

  // 确定当前属于哪个 tab
  let activeTab = 'home';
  if (route.startsWith('m1')) activeTab = 'm1';
  else if (route.startsWith('m2')) activeTab = 'm2';
  else if (route.startsWith('m3')) activeTab = 'm3';
  else if (route.startsWith('m4')) activeTab = 'm4';
  else if (route === 'ref') activeTab = 'home'; // ref 归属首页 tab

  // 获取模块颜色
  const moduleColors = { m1: 'var(--module-1)', m2: 'var(--module-2)', m3: 'var(--module-3)', m4: 'var(--module-4)' };

  tabBar.querySelectorAll('.tab-item').forEach((item) => {
    const tab = item.getAttribute('data-tab');
    const isActive = tab === activeTab;
    item.classList.toggle('active', isActive);

    // 使用模块标识色高亮
    if (isActive && moduleColors[tab]) {
      item.style.color = moduleColors[tab];
    } else if (isActive) {
      item.style.color = 'var(--accent)';
    } else {
      item.style.color = '';
    }
  });
}

function updateTopBar(route) {
  const titleEl = document.getElementById('mobile-page-title');
  const indexEl = document.getElementById('mobile-page-index');
  const topBar = document.getElementById('mobile-top-bar');
  if (!titleEl || !indexEl || !topBar) return;

  const mainContent = document.getElementById('main-content');

  // 首页和 ref 不显示顶部栏
  if (route === 'home' || route === 'ref') {
    topBar.classList.add('top-bar-hidden');
    if (mainContent) mainContent.classList.remove('has-top-bar');
    titleEl.textContent = '';
    indexEl.textContent = '';
    return;
  }

  topBar.classList.remove('top-bar-hidden');
  if (mainContent) mainContent.classList.add('has-top-bar');

  // 查找当前页面信息
  let pageTitle = '';
  let pageNum = '';

  for (const mod of NAV_DATA.modules) {
    const idx = mod.pages.findIndex((p) => p.id === route);
    if (idx !== -1) {
      pageTitle = mod.pages[idx].title;
      pageNum = `${idx + 1}/${mod.totalPages}`;
      break;
    }
  }

  titleEl.textContent = pageTitle;
  indexEl.textContent = pageNum;
}

// ========== 初始化 ==========

export function initNavigation() {
  buildSidebar();
  buildHamburger();
  buildTabBar();
  buildTopBar();

  // 初始更新
  updateNavigation(getCurrentRoute());

  // 监听路由变化
  onRouteChange((route) => {
    updateNavigation(route);
    // 滚动到顶部
    window.scrollTo(0, 0);
  });

  // 监听进度更新 — 重建侧边栏以更新进度指示
  window.addEventListener('progress-update', () => {
    const currentRoute = getCurrentRoute();
    buildSidebar();
    updateSidebar(currentRoute);
  });
}
