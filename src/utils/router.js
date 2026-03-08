// hash 路由
// 路由格式：#home / #m1-p1 ~ #m1-p10 / #m2-p1 ~ #m2-p6 / #m3-p1 ~ #m3-p7 / #m4-p1 ~ #m4-p8 / #ref
import { markVisited } from './progress.js';

const routes = new Map();
let currentDestroy = null;
let routeChangeCallbacks = [];
let isTransitioning = false;

// 注册路由
export function registerRoute(hash, loader) {
  routes.set(hash, loader);
}

// 获取当前路由
export function getCurrentRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  return hash;
}

// 导航到指定路由
export function navigateTo(hash) {
  window.location.hash = hash;
}

// 注册路由变化回调
export function onRouteChange(callback) {
  routeChangeCallbacks.push(callback);
}

// 路由变化处理（带 fade 过渡）
async function handleRouteChange() {
  const hash = getCurrentRoute();
  const loader = routes.get(hash);

  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  // 如果正在过渡中，跳过动画直接切换
  if (isTransitioning) {
    mainContent.style.opacity = '1';
    mainContent.style.transform = 'none';
  }

  // 标记学习进度
  markVisited(hash);

  // 销毁当前页面
  if (currentDestroy) {
    currentDestroy();
    currentDestroy = null;
  }

  if (loader) {
    try {
      isTransitioning = true;

      // Fade out
      mainContent.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(8px)';

      // 加载模块（可与 fade out 并行）
      const pageModule = await loader();

      // 等 fade out 完成
      await new Promise(r => setTimeout(r, 150));

      // 渲染新内容
      mainContent.innerHTML = pageModule.render();

      // Fade in
      requestAnimationFrame(() => {
        mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mainContent.style.opacity = '1';
        mainContent.style.transform = 'translateY(0)';
      });

      setTimeout(() => {
        isTransitioning = false;
        mainContent.style.transition = '';
      }, 350);

      if (pageModule.init) {
        pageModule.init();
      }
      if (pageModule.destroy) {
        currentDestroy = pageModule.destroy;
      }

      // 通知路由变化
      routeChangeCallbacks.forEach(cb => cb(hash));
    } catch (err) {
      console.error(`路由加载失败: ${hash}`, err);
      isTransitioning = false;
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'none';
      mainContent.style.transition = '';
      mainContent.innerHTML = `
        <div class="section-light" style="align-items:center;">
          <h2>页面加载失败</h2>
          <p style="color:var(--text-on-light-2);margin-top:var(--space-sm);">请刷新页面重试</p>
        </div>
      `;
    }
  } else {
    // 未匹配路由，回到首页
    navigateTo('home');
  }
}

// 初始化路由
export function initRouter() {
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
}
