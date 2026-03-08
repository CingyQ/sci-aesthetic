// Modal.js — 全屏模态组件
// ESC 和点击遮罩关闭，GSAP 入场动画，移动端触摸友好

import { gsap } from 'gsap';

/**
 * 创建模态弹窗
 * @param {Object} options
 * @param {string} options.content - 模态内容 HTML
 * @param {string} options.title - 标题（可选）
 * @param {Function} options.onClose - 关闭回调
 * @param {boolean} options.closeOnOverlay - 点击遮罩关闭（默认 true）
 * @param {string} options.size - 'default' | 'large' | 'fullscreen'
 * @returns {{ el, close, destroy }}
 */
export function createModal({
  content = '',
  title = '',
  onClose = null,
  closeOnOverlay = true,
  size = 'default'
} = {}) {
  // 创建 DOM
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-container modal-container--${size}">
      <div class="modal-header">
        ${title ? `<h3 class="modal-title">${title}</h3>` : '<span></span>'}
        <button class="modal-close" aria-label="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;

  document.body.appendChild(overlay);
  // 阻止背景滚动
  document.body.style.overflow = 'hidden';

  const container = overlay.querySelector('.modal-container');
  const closeBtn = overlay.querySelector('.modal-close');

  // GSAP 入场动画
  gsap.fromTo(overlay,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: 'power2.out' }
  );
  gsap.fromTo(container,
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 }
  );

  function close() {
    // 退场动画
    gsap.to(container, {
      opacity: 0, y: 20, scale: 0.97,
      duration: 0.2, ease: 'power2.in'
    });
    gsap.to(overlay, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      delay: 0.05,
      onComplete: () => {
        document.body.style.overflow = '';
        overlay.remove();
        if (onClose) onClose();
      }
    });
  }

  // 关闭按钮
  closeBtn.addEventListener('click', close);

  // 点击遮罩关闭
  if (closeOnOverlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
  }

  // ESC 关闭
  function onKeyDown(e) {
    if (e.key === 'Escape') close();
  }
  document.addEventListener('keydown', onKeyDown);

  return {
    el: overlay,
    body: overlay.querySelector('.modal-body'),
    close,
    destroy() {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      overlay.remove();
    }
  };
}
