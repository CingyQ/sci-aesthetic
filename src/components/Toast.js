// Toast.js — 底部弹出消息提示
// 自动消失，支持横屏提示样式

let toastContainer = null;

function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

/**
 * 显示 Toast 消息
 * @param {string} message - 消息内容
 * @param {Object} options
 * @param {number} options.duration - 显示时长（ms，默认 3000）
 * @param {'info'|'success'|'error'|'landscape'} options.type - 类型
 * @returns {{ close: Function }}
 */
export function showToast(message, {
  duration = 3000,
  type = 'info'
} = {}) {
  const container = ensureContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;

  const icons = {
    info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    landscape: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V2"/></svg>'
  };

  toast.innerHTML = `
    <span class="toast__icon">${icons[type] || icons.info}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="关闭">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  container.appendChild(toast);

  // 入场动画
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  let timeout = null;

  function close() {
    if (timeout) clearTimeout(timeout);
    toast.classList.remove('toast--visible');
    toast.classList.add('toast--exit');
    setTimeout(() => toast.remove(), 300);
  }

  toast.querySelector('.toast__close').addEventListener('click', close);

  if (duration > 0) {
    timeout = setTimeout(close, duration);
  }

  return { close };
}

/**
 * 显示横屏提示 Toast（仅移动端竖屏时触发）
 * 每页只提示一次（sessionStorage）
 * @param {string} pageId - 页面标识
 */
export function showLandscapeHint(pageId) {
  const key = `landscape-hint-${pageId}`;
  if (sessionStorage.getItem(key)) return;

  // 仅在竖屏移动端显示
  const isMobilePortrait = window.innerWidth < 768 &&
    window.matchMedia('(orientation: portrait)').matches;
  if (!isMobilePortrait) return;

  sessionStorage.setItem(key, '1');
  showToast('横屏体验更佳', { duration: 4000, type: 'landscape' });
}
