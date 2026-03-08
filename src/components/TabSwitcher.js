// TabSwitcher.js — 带滑动指示器的 Tab 切换组件
// 指示器跟随当前 tab 平滑移动

/**
 * 创建 Tab 切换器
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {Array<{id: string, label: string}>} options.tabs - Tab 列表
 * @param {string} options.activeId - 默认选中 Tab ID
 * @param {Function} options.onChange - 切换回调 (id) => void
 * @param {string} options.variant - 'default' | 'pill' 样式变体
 * @returns {{ setActive, getActive, destroy }}
 */
export function createTabSwitcher(container, {
  tabs = [],
  activeId = '',
  onChange = null,
  variant = 'default'
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = `tab-switcher tab-switcher--${variant}`;

  // 渲染 tabs
  const tabsHtml = tabs.map(t =>
    `<button class="tab-switcher__tab${t.id === activeId ? ' active' : ''}" data-tab-id="${t.id}">${t.label}</button>`
  ).join('');
  wrapper.innerHTML = tabsHtml + '<div class="tab-switcher__indicator"></div>';
  container.appendChild(wrapper);

  const indicator = wrapper.querySelector('.tab-switcher__indicator');
  const tabButtons = wrapper.querySelectorAll('.tab-switcher__tab');
  let currentId = activeId || (tabs[0] && tabs[0].id) || '';

  // 更新指示器位置
  function updateIndicator(animate = true) {
    const activeTab = wrapper.querySelector('.tab-switcher__tab.active');
    if (!activeTab) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    indicator.style.transition = animate ? 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    indicator.style.left = (tabRect.left - wrapperRect.left) + 'px';
    indicator.style.width = tabRect.width + 'px';
  }

  // 设置选中态
  function setActive(id, triggerChange = true) {
    if (id === currentId) return;
    currentId = id;

    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tabId === id);
    });

    updateIndicator(true);

    if (triggerChange && onChange) {
      onChange(id);
    }
  }

  // 点击事件
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn.dataset.tabId);
    });
  });

  // 初始化指示器（等 DOM 渲染后）
  requestAnimationFrame(() => {
    updateIndicator(false);
  });

  // ResizeObserver 应对布局变化
  const resizeObserver = new ResizeObserver(() => {
    updateIndicator(false);
  });
  resizeObserver.observe(wrapper);

  return {
    setActive(id) { setActive(id, true); },
    getActive() { return currentId; },
    destroy() {
      resizeObserver.disconnect();
      wrapper.remove();
    }
  };
}
