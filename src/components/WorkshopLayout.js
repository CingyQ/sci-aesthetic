// WorkshopLayout.js — 三面板布局组件
// 桌面端 CSS Grid（280px / 1fr / 360px）
// 移动端改为垂直手风琴折叠，一次只展开一个面板

/**
 * 创建工作坊三面板布局
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {Array<{id: string, title: string, icon: string, content: string}>} options.panels - 面板列表（最多 3 个）
 * @param {string} options.defaultPanel - 移动端默认展开的面板 ID
 * @returns {{ getPanel, destroy }}
 */
export function createWorkshopLayout(container, {
  panels = [],
  defaultPanel = ''
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'workshop-layout';

  const defaultId = defaultPanel || (panels[0] && panels[0].id) || '';

  wrapper.innerHTML = panels.map((panel, i) => `
    <div class="workshop-panel${panel.id === defaultId ? ' expanded' : ''}" data-panel-id="${panel.id}">
      <div class="workshop-panel-header" role="button" tabindex="0" aria-expanded="${panel.id === defaultId}">
        <span class="workshop-panel-title">
          ${panel.icon ? `<span class="workshop-panel-icon">${panel.icon}</span>` : ''}
          ${panel.title}
        </span>
        <svg class="workshop-panel-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div class="workshop-panel-content" id="workshop-panel-${panel.id}">
        ${panel.content}
      </div>
    </div>
  `).join('');

  container.appendChild(wrapper);

  // 移动端手风琴逻辑
  const panelEls = wrapper.querySelectorAll('.workshop-panel');

  function togglePanel(targetId) {
    // 只在移动端生效
    if (window.innerWidth > 768) return;

    panelEls.forEach(panel => {
      const contentEl = panel.querySelector('.workshop-panel-content');
      const headerEl = panel.querySelector('.workshop-panel-header');

      if (panel.dataset.panelId === targetId) {
        const isExpanded = panel.classList.contains('expanded');
        if (isExpanded) {
          // 折叠
          contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
          contentEl.offsetHeight;
          contentEl.style.maxHeight = '0';
          panel.classList.remove('expanded');
          headerEl.setAttribute('aria-expanded', 'false');
        } else {
          // 展开：先折叠其他
          panelEls.forEach(other => {
            if (other !== panel && other.classList.contains('expanded')) {
              other.classList.remove('expanded');
              other.querySelector('.workshop-panel-header').setAttribute('aria-expanded', 'false');
              other.querySelector('.workshop-panel-content').style.maxHeight = '0';
            }
          });
          panel.classList.add('expanded');
          headerEl.setAttribute('aria-expanded', 'true');
          contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
          // 动画结束后设为 none（允许内容变化）
          const onEnd = () => {
            contentEl.style.maxHeight = 'none';
            contentEl.removeEventListener('transitionend', onEnd);
          };
          contentEl.addEventListener('transitionend', onEnd);
        }
      }
    });
  }

  wrapper.addEventListener('click', (e) => {
    const header = e.target.closest('.workshop-panel-header');
    if (!header) return;
    const panel = header.closest('.workshop-panel');
    togglePanel(panel.dataset.panelId);
  });

  // 键盘支持
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const header = e.target.closest('.workshop-panel-header');
      if (!header) return;
      e.preventDefault();
      const panel = header.closest('.workshop-panel');
      togglePanel(panel.dataset.panelId);
    }
  });

  return {
    /** 获取面板内容容器 */
    getPanel(id) {
      return wrapper.querySelector(`#workshop-panel-${id}`);
    },
    destroy() {
      wrapper.remove();
    }
  };
}
