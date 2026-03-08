// InteractiveCanvas.js — Canvas API 封装
// HiDPI devicePixelRatio 适配，统一使用 Pointer Events
// canvas 设置 touch-action:none

/**
 * 创建交互式 Canvas
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {number} options.width - 逻辑宽度（CSS px）
 * @param {number} options.height - 逻辑高度（CSS px）
 * @param {boolean} options.responsive - 是否响应容器宽度
 * @returns {{ canvas, ctx, getPos, onPointerDown, onPointerMove, onPointerUp, resize, destroy }}
 */
export function createInteractiveCanvas(container, {
  width = 800,
  height = 600,
  responsive = true
} = {}) {
  const canvas = document.createElement('canvas');
  const dpr = window.devicePixelRatio || 1;

  // 设置 canvas 尺寸
  function setSize(w, h) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  canvas.style.display = 'block';
  canvas.style.borderRadius = '12px';
  // 禁止 canvas 区域的页面滚动（移动端）
  canvas.style.touchAction = 'none';

  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);

  // 响应式：canvas 宽度跟随容器
  let currentWidth = width;
  let currentHeight = height;
  const aspectRatio = width / height;

  if (responsive) {
    const containerWidth = container.clientWidth;
    if (containerWidth > 0 && containerWidth < width) {
      currentWidth = containerWidth;
      currentHeight = containerWidth / aspectRatio;
    }
  }

  setSize(currentWidth, currentHeight);

  // 统一的指针坐标转换（兼容 mouse 和 touch）
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = currentWidth / rect.width;
    const scaleY = currentHeight / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  // Pointer Events 回调注册
  const handlers = {
    pointerdown: [],
    pointermove: [],
    pointerup: []
  };

  canvas.addEventListener('pointerdown', (e) => {
    handlers.pointerdown.forEach(fn => fn(e, getPos(e)));
  });
  canvas.addEventListener('pointermove', (e) => {
    handlers.pointermove.forEach(fn => fn(e, getPos(e)));
  });
  canvas.addEventListener('pointerup', (e) => {
    handlers.pointerup.forEach(fn => fn(e, getPos(e)));
  });
  canvas.addEventListener('pointercancel', (e) => {
    handlers.pointerup.forEach(fn => fn(e, getPos(e)));
  });

  // ResizeObserver 响应式
  let resizeObserver = null;
  let onResizeCallback = null;

  if (responsive) {
    resizeObserver = new ResizeObserver(entries => {
      const entry = entries[0];
      const newW = Math.floor(entry.contentRect.width);
      if (newW > 0 && newW !== currentWidth) {
        currentWidth = newW;
        currentHeight = newW / aspectRatio;
        setSize(currentWidth, currentHeight);
        if (onResizeCallback) onResizeCallback(currentWidth, currentHeight);
      }
    });
    resizeObserver.observe(container);
  }

  return {
    canvas,
    ctx,
    getPos,

    /** 获取当前逻辑尺寸 */
    getSize() {
      return { width: currentWidth, height: currentHeight };
    },

    /** 注册 pointerdown 回调 */
    onPointerDown(fn) {
      handlers.pointerdown.push(fn);
    },

    /** 注册 pointermove 回调 */
    onPointerMove(fn) {
      handlers.pointermove.push(fn);
    },

    /** 注册 pointerup 回调 */
    onPointerUp(fn) {
      handlers.pointerup.push(fn);
    },

    /** 注册 resize 回调 */
    onResize(fn) {
      onResizeCallback = fn;
    },

    /** 手动设置尺寸 */
    resize(w, h) {
      currentWidth = w;
      currentHeight = h;
      setSize(w, h);
    },

    /** 清空画布 */
    clear(color) {
      ctx.clearRect(0, 0, currentWidth, currentHeight);
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, currentWidth, currentHeight);
      }
    },

    /** 销毁 */
    destroy() {
      if (resizeObserver) resizeObserver.disconnect();
      canvas.remove();
    }
  };
}
