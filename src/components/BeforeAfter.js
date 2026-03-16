// BeforeAfter.js — 拖拽/滑动对比组件
// 使用 clip-path 裁切，内容不变形
// Pointer Events 实现，移动端手指滑动流畅

/**
 * 创建 Before/After 对比组件
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {string} options.beforeContent - Before HTML 内容
 * @param {string} options.afterContent - After HTML 内容
 * @param {string} options.beforeLabel - Before 标签
 * @param {string} options.afterLabel - After 标签
 * @param {number} options.initialPosition - 初始分割位置（0-100，默认 50）
 * @returns {{ setPosition, destroy }}
 */
export function createBeforeAfter(container, {
  beforeContent = '',
  afterContent = '',
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'before-after';
  wrapper.style.touchAction = 'pan-y';

  wrapper.innerHTML = `
    <div class="before-after__after">${afterContent}</div>
    <div class="before-after__before" style="clip-path:inset(0 ${100 - initialPosition}% 0 0);">${beforeContent}</div>
    <div class="before-after__handle" style="left:${initialPosition}%;">
      <div class="before-after__handle-line"></div>
      <div class="before-after__handle-grip">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
    <span class="before-after__label before-after__label--before">${beforeLabel}</span>
    <span class="before-after__label before-after__label--after">${afterLabel}</span>
  `;

  container.appendChild(wrapper);

  const beforeEl = wrapper.querySelector('.before-after__before');
  const handle = wrapper.querySelector('.before-after__handle');
  let isDragging = false;

  function setPosition(pct) {
    const clamped = Math.max(0, Math.min(100, pct));
    // clip-path 裁切：内容始终全宽，只改变可见区域
    beforeEl.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    handle.style.left = clamped + '%';
  }

  function getPercentFromEvent(e) {
    const rect = wrapper.getBoundingClientRect();
    return ((e.clientX - rect.left) / rect.width) * 100;
  }

  function onPointerDown(e) {
    // 允许从 before/after 内容区域开始拖拽
    isDragging = true;
    wrapper.setPointerCapture(e.pointerId);
    setPosition(getPercentFromEvent(e));
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    setPosition(getPercentFromEvent(e));
  }

  function onPointerUp() {
    isDragging = false;
  }

  wrapper.addEventListener('pointerdown', onPointerDown);
  wrapper.addEventListener('pointermove', onPointerMove);
  wrapper.addEventListener('pointerup', onPointerUp);
  wrapper.addEventListener('pointercancel', onPointerUp);

  return {
    setPosition,
    destroy() {
      wrapper.remove();
    }
  };
}
