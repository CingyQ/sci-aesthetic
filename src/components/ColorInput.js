// ColorInput.js — 颜色选择器组件
// HEX/RGB/HSL 三种模式 tab 切换，精确数值输入
// 移动端点击后弹出全屏模态选色

/**
 * 创建颜色选择器
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {string} options.value - 初始颜色（HEX，如 '#7EC8E3'）
 * @param {Function} options.onChange - 颜色变化回调 (hex) => void
 * @param {string} options.label - 标签文字
 * @returns {{ getValue, setValue, destroy }}
 */
export function createColorInput(container, {
  value = '#7EC8E3',
  onChange = null,
  label = '颜色'
} = {}) {
  let currentHex = normalizeHex(value);
  let currentMode = 'hex'; // 'hex' | 'rgb' | 'hsl'

  const wrapper = document.createElement('div');
  wrapper.className = 'color-input';

  // 完整渲染（切换 mode 或初始化时调用）
  function render() {
    const rgb = hexToRgb(currentHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    wrapper.innerHTML = `
      <label class="color-input__label">${label}</label>
      <div class="color-input__row">
        <div class="color-input__preview" style="background:${currentHex};"></div>
        <div class="color-input__fields">
          <div class="color-input__tabs">
            <button class="color-input__tab${currentMode === 'hex' ? ' active' : ''}" data-mode="hex">HEX</button>
            <button class="color-input__tab${currentMode === 'rgb' ? ' active' : ''}" data-mode="rgb">RGB</button>
            <button class="color-input__tab${currentMode === 'hsl' ? ' active' : ''}" data-mode="hsl">HSL</button>
          </div>
          <div class="color-input__values">
            ${currentMode === 'hex' ? `
              <input class="color-input__hex-input input" type="text" value="${currentHex}" maxlength="7" spellcheck="false" />
            ` : currentMode === 'rgb' ? `
              <div class="color-input__triple">
                <label><span>R</span><input class="input input-number" type="number" min="0" max="255" value="${rgb.r}" data-channel="r" inputmode="numeric" /></label>
                <label><span>G</span><input class="input input-number" type="number" min="0" max="255" value="${rgb.g}" data-channel="g" inputmode="numeric" /></label>
                <label><span>B</span><input class="input input-number" type="number" min="0" max="255" value="${rgb.b}" data-channel="b" inputmode="numeric" /></label>
              </div>
            ` : `
              <div class="color-input__triple">
                <label><span>H</span><input class="input input-number" type="number" min="0" max="360" value="${Math.round(hsl.h)}" data-channel="h" inputmode="numeric" /></label>
                <label><span>S</span><input class="input input-number" type="number" min="0" max="100" value="${Math.round(hsl.s)}" data-channel="s" inputmode="numeric" /></label>
                <label><span>L</span><input class="input input-number" type="number" min="0" max="100" value="${Math.round(hsl.l)}" data-channel="l" inputmode="numeric" /></label>
              </div>
            `}
          </div>
        </div>
      </div>
      <div class="color-input__slider-row">
        <input class="color-input__hue-slider" type="range" min="0" max="360" value="${Math.round(hsl.h)}" />
      </div>
    `;

    bindEvents();
  }

  // 局部更新（拖动滑块/输入数值时调用，不重建 DOM）
  function patchUI() {
    const preview = wrapper.querySelector('.color-input__preview');
    if (preview) preview.style.background = currentHex;

    const rgb = hexToRgb(currentHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // 更新数值输入框（不触发事件）
    if (currentMode === 'hex') {
      const hexInput = wrapper.querySelector('.color-input__hex-input');
      if (hexInput && document.activeElement !== hexInput) {
        hexInput.value = currentHex;
      }
    } else if (currentMode === 'rgb') {
      const rIn = wrapper.querySelector('[data-channel="r"]');
      const gIn = wrapper.querySelector('[data-channel="g"]');
      const bIn = wrapper.querySelector('[data-channel="b"]');
      if (rIn && document.activeElement !== rIn) rIn.value = rgb.r;
      if (gIn && document.activeElement !== gIn) gIn.value = rgb.g;
      if (bIn && document.activeElement !== bIn) bIn.value = rgb.b;
    } else {
      const hIn = wrapper.querySelector('[data-channel="h"]');
      const sIn = wrapper.querySelector('[data-channel="s"]');
      const lIn = wrapper.querySelector('[data-channel="l"]');
      if (hIn && document.activeElement !== hIn) hIn.value = Math.round(hsl.h);
      if (sIn && document.activeElement !== sIn) sIn.value = Math.round(hsl.s);
      if (lIn && document.activeElement !== lIn) lIn.value = Math.round(hsl.l);
    }

    // 滑块位置：不更新正在拖动的滑块
    const hueSlider = wrapper.querySelector('.color-input__hue-slider');
    if (hueSlider && document.activeElement !== hueSlider) {
      hueSlider.value = Math.round(hsl.h);
    }
  }

  // 更新颜色值（局部更新，不重建 DOM）
  function updateColor(hex) {
    const normalized = normalizeHex(hex);
    if (!normalized || normalized === currentHex) return;
    currentHex = normalized;
    patchUI();
    if (onChange) onChange(currentHex);
  }

  function bindEvents() {
    // Tab 切换 — 需要完整 render
    wrapper.querySelectorAll('.color-input__tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentMode = tab.dataset.mode;
        render();
      });
    });

    // HEX 输入
    const hexInput = wrapper.querySelector('.color-input__hex-input');
    if (hexInput) {
      hexInput.addEventListener('change', () => {
        updateColor(hexInput.value);
      });
    }

    // RGB/HSL 数值输入
    wrapper.querySelectorAll('.color-input__triple input[data-channel]').forEach(input => {
      input.addEventListener('input', () => {
        if (currentMode === 'rgb') {
          const r = parseInt(wrapper.querySelector('[data-channel="r"]')?.value || 0);
          const g = parseInt(wrapper.querySelector('[data-channel="g"]')?.value || 0);
          const b = parseInt(wrapper.querySelector('[data-channel="b"]')?.value || 0);
          updateColor(rgbToHex(clamp(r, 0, 255), clamp(g, 0, 255), clamp(b, 0, 255)));
        } else if (currentMode === 'hsl') {
          const h = parseInt(wrapper.querySelector('[data-channel="h"]')?.value || 0);
          const s = parseInt(wrapper.querySelector('[data-channel="s"]')?.value || 0);
          const l = parseInt(wrapper.querySelector('[data-channel="l"]')?.value || 0);
          const rgb = hslToRgb(clamp(h, 0, 360), clamp(s, 0, 100), clamp(l, 0, 100));
          updateColor(rgbToHex(rgb.r, rgb.g, rgb.b));
        }
      });
    });

    // 色相滑块 — 连续拖动，局部更新
    const hueSlider = wrapper.querySelector('.color-input__hue-slider');
    if (hueSlider) {
      hueSlider.addEventListener('input', () => {
        const rgb = hexToRgb(currentHex);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.h = parseInt(hueSlider.value);
        const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        const normalized = normalizeHex(newHex);
        if (normalized && normalized !== currentHex) {
          currentHex = normalized;
          patchUI();
          if (onChange) onChange(currentHex);
        }
      });
    }
  }

  render();
  container.appendChild(wrapper);

  return {
    getValue() { return currentHex; },
    setValue(hex) { updateColor(hex); },
    destroy() { wrapper.remove(); }
  };
}

// ========== 色彩转换工具 ==========

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function normalizeHex(hex) {
  if (!hex) return null;
  hex = hex.trim();
  if (!hex.startsWith('#')) hex = '#' + hex;
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase();
  return null;
}

function hexToRgb(hex) {
  const h = normalizeHex(hex) || '#000000';
  return {
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16)
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
