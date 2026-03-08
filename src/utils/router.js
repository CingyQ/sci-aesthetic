// hash 路由
// 路由格式：#home / #m1-p1 ~ #m1-p10 / #m2-p1 ~ #m2-p6 / #m3-p1 ~ #m3-p7 / #m4-p1 ~ #m4-p8 / #ref

const routes = new Map();
let currentDestroy = null;
let routeChangeCallbacks = [];

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

// 路由变化处理
async function handleRouteChange() {
  const hash = getCurrentRoute();
  const loader = routes.get(hash);

  // 销毁当前页面
  if (currentDestroy) {
    currentDestroy();
    currentDestroy = null;
  }

  const mainContent = document.getElementById('main-content');

  if (loader) {
    try {
      const pageModule = await loader();
      mainContent.innerHTML = pageModule.render();
      mainContent.classList.add('page-enter');

      // 移除动画类（下次切换可重新触发）
      setTimeout(() => mainContent.classList.remove('page-enter'), 500);

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
