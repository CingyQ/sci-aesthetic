// 学习进度 — localStorage 存储已访问页面
// 供侧边栏、首页模块卡片显示进度百分比

const STORAGE_KEY = 'sci-aesthetic-progress';

// 所有模块页面 ID
const MODULE_PAGES = {
  m1: ['m1-p1','m1-p2','m1-p3','m1-p4','m1-p5','m1-p6','m1-p7','m1-p8','m1-p9','m1-p10'],
  m2: ['m2-p1','m2-p2','m2-p3','m2-p4','m2-p5','m2-p6'],
  m3: ['m3-p1','m3-p2','m3-p3','m3-p4','m3-p5','m3-p6','m3-p7'],
  m4: ['m4-p1','m4-p2','m4-p3','m4-p4','m4-p5','m4-p6','m4-p7','m4-p8'],
};

// 读取已访问页面集合
function getVisited() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

// 保存已访问页面
function saveVisited(visited) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
  } catch { /* quota exceeded */ }
}

/**
 * 标记页面为已访问
 */
export function markVisited(pageId) {
  if (pageId === 'home' || pageId === 'ref' || pageId === 'component-demo') return;
  const visited = getVisited();
  if (!visited.has(pageId)) {
    visited.add(pageId);
    saveVisited(visited);
    // 触发自定义事件通知 UI 更新
    window.dispatchEvent(new CustomEvent('progress-update', { detail: { pageId } }));
  }
}

/**
 * 获取模块进度百分比（0-100）
 */
export function getModuleProgress(moduleId) {
  const pages = MODULE_PAGES[moduleId];
  if (!pages) return 0;
  const visited = getVisited();
  const count = pages.filter(p => visited.has(p)).length;
  return Math.round((count / pages.length) * 100);
}

/**
 * 获取全部进度
 */
export function getAllProgress() {
  return {
    m1: getModuleProgress('m1'),
    m2: getModuleProgress('m2'),
    m3: getModuleProgress('m3'),
    m4: getModuleProgress('m4'),
  };
}

/**
 * 获取总体进度
 */
export function getTotalProgress() {
  const visited = getVisited();
  const allPages = Object.values(MODULE_PAGES).flat();
  const count = allPages.filter(p => visited.has(p)).length;
  return Math.round((count / allPages.length) * 100);
}

/**
 * 检查某页是否已访问
 */
export function isVisited(pageId) {
  return getVisited().has(pageId);
}
