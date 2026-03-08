// CopyButton.js — 一键复制到剪贴板 + 成功/失败反馈动画

/**
 * 创建复制按钮
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {string|Function} options.getText - 要复制的文本或获取文本的函数
 * @param {string} options.label - 按钮文字（默认"复制"）
 * @param {string} options.successLabel - 成功提示（默认"已复制"）
 * @param {string} options.className - 额外 CSS 类名
 * @returns {{ button: HTMLButtonElement, destroy: Function }}
 */
export function createCopyButton(container, {
  getText,
  label = '复制',
  successLabel = '已复制',
  className = ''
} = {}) {
  const button = document.createElement('button');
  button.className = `copy-btn ${className}`.trim();
  button.setAttribute('aria-label', label);
  button.innerHTML = `
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span class="copy-label">${label}</span>
  `;

  let timeout = null;

  async function handleClick() {
    const text = typeof getText === 'function' ? getText() : getText;
    const labelEl = button.querySelector('.copy-label');
    const copyIcon = button.querySelector('.copy-icon');
    const checkIcon = button.querySelector('.check-icon');

    try {
      await navigator.clipboard.writeText(text);

      // 成功反馈
      button.classList.add('copy-success');
      labelEl.textContent = successLabel;
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'block';

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        button.classList.remove('copy-success');
        labelEl.textContent = label;
        copyIcon.style.display = '';
        checkIcon.style.display = 'none';
      }, 2000);
    } catch {
      // 失败反馈
      button.classList.add('copy-error');
      labelEl.textContent = '复制失败';

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        button.classList.remove('copy-error');
        labelEl.textContent = label;
      }, 2000);
    }
  }

  button.addEventListener('click', handleClick);

  container.appendChild(button);

  return {
    button,
    destroy() {
      if (timeout) clearTimeout(timeout);
      button.removeEventListener('click', handleClick);
      button.remove();
    }
  };
}
