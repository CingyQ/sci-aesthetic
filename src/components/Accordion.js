// Accordion.js — 平滑展开/折叠组件
// 支持单开模式（展开一个自动折叠其他）

/**
 * 创建手风琴组件
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {Array<{id: string, title: string, content: string}>} options.items - 项目列表
 * @param {boolean} options.singleOpen - 单开模式（默认 true）
 * @param {string} options.defaultOpen - 默认展开的 item id
 * @returns {{ open, close, toggle, destroy }}
 */
export function createAccordion(container, {
  items = [],
  singleOpen = true,
  defaultOpen = ''
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'accordion';

  wrapper.innerHTML = items.map(item => `
    <div class="accordion__item${item.id === defaultOpen ? ' expanded' : ''}" data-accordion-id="${item.id}">
      <button class="accordion__header" aria-expanded="${item.id === defaultOpen}">
        <span class="accordion__title">${item.title}</span>
        <svg class="accordion__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="accordion__content" style="${item.id === defaultOpen ? '' : 'height:0;'}">
        <div class="accordion__inner">${item.content}</div>
      </div>
    </div>
  `).join('');

  container.appendChild(wrapper);

  const itemEls = wrapper.querySelectorAll('.accordion__item');

  function animateHeight(contentEl, expanding) {
    const innerEl = contentEl.querySelector('.accordion__inner');
    if (expanding) {
      const targetH = innerEl.offsetHeight;
      contentEl.style.height = '0px';
      contentEl.offsetHeight; // 强制 reflow
      contentEl.style.transition = 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      contentEl.style.height = targetH + 'px';
      // 动画结束后设为 auto（支持内容变化）
      const onEnd = () => {
        contentEl.style.height = 'auto';
        contentEl.style.transition = '';
        contentEl.removeEventListener('transitionend', onEnd);
      };
      contentEl.addEventListener('transitionend', onEnd);
    } else {
      // 先设为具体值，再过渡到 0
      contentEl.style.height = contentEl.scrollHeight + 'px';
      contentEl.offsetHeight; // reflow
      contentEl.style.transition = 'height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      contentEl.style.height = '0px';
    }
  }

  function open(id) {
    const item = wrapper.querySelector(`[data-accordion-id="${id}"]`);
    if (!item || item.classList.contains('expanded')) return;

    // 单开模式：关闭其他
    if (singleOpen) {
      itemEls.forEach(el => {
        if (el !== item && el.classList.contains('expanded')) {
          closeItem(el);
        }
      });
    }

    item.classList.add('expanded');
    item.querySelector('.accordion__header').setAttribute('aria-expanded', 'true');
    animateHeight(item.querySelector('.accordion__content'), true);
  }

  function closeItem(item) {
    item.classList.remove('expanded');
    item.querySelector('.accordion__header').setAttribute('aria-expanded', 'false');
    animateHeight(item.querySelector('.accordion__content'), false);
  }

  function close(id) {
    const item = wrapper.querySelector(`[data-accordion-id="${id}"]`);
    if (!item || !item.classList.contains('expanded')) return;
    closeItem(item);
  }

  function toggle(id) {
    const item = wrapper.querySelector(`[data-accordion-id="${id}"]`);
    if (!item) return;
    if (item.classList.contains('expanded')) {
      close(id);
    } else {
      open(id);
    }
  }

  // 点击事件
  wrapper.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion__header');
    if (!header) return;
    const item = header.closest('.accordion__item');
    toggle(item.dataset.accordionId);
  });

  return {
    open,
    close,
    toggle,
    destroy() {
      wrapper.remove();
    }
  };
}
