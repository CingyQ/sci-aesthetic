// StickySteps.js — 粘性滚动步骤演示组件
// 桌面端：GSAP pin 左侧标题，右侧内容随滚动切换
// 移动端：普通滚动 + CSS sticky 标题

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/**
 * 创建粘性步骤演示
 * @param {HTMLElement} container - 容器元素
 * @param {Object} options
 * @param {Array<{title: string, description: string, content: string}>} options.steps - 步骤列表
 * @param {string} options.heading - 主标题
 * @param {string} options.subheading - 副标题
 * @returns {{ destroy }}
 */
export function createStickySteps(container, {
  steps = [],
  heading = '',
  subheading = ''
} = {}) {
  const wrapper = document.createElement('div');
  wrapper.className = 'sticky-steps';

  const stepsHtml = steps.map((step, i) => `
    <div class="sticky-steps__step" data-step="${i}">
      <div class="sticky-steps__step-marker">
        <span class="sticky-steps__step-number">${i + 1}</span>
        ${i < steps.length - 1 ? '<div class="sticky-steps__step-line"></div>' : ''}
      </div>
      <div class="sticky-steps__step-body">
        <h4 class="sticky-steps__step-title">${step.title}</h4>
        ${step.description ? `<p class="sticky-steps__step-desc">${step.description}</p>` : ''}
        <div class="sticky-steps__step-content">${step.content}</div>
      </div>
    </div>
  `).join('');

  wrapper.innerHTML = `
    <div class="sticky-steps__fixed">
      ${heading ? `<h3 class="sticky-steps__heading">${heading}</h3>` : ''}
      ${subheading ? `<p class="sticky-steps__subheading">${subheading}</p>` : ''}
      <div class="sticky-steps__progress">
        <div class="sticky-steps__progress-fill"></div>
      </div>
      <div class="sticky-steps__current-label"></div>
    </div>
    <div class="sticky-steps__scroll">
      ${stepsHtml}
    </div>
  `;

  container.appendChild(wrapper);

  const fixedPanel = wrapper.querySelector('.sticky-steps__fixed');
  const scrollPanel = wrapper.querySelector('.sticky-steps__scroll');
  const progressFill = wrapper.querySelector('.sticky-steps__progress-fill');
  const currentLabel = wrapper.querySelector('.sticky-steps__current-label');
  const stepEls = wrapper.querySelectorAll('.sticky-steps__step');

  // 设置当前步骤高亮
  function highlightStep(index) {
    stepEls.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
    if (steps[index]) {
      currentLabel.textContent = `步骤 ${index + 1} / ${steps.length}`;
    }
    progressFill.style.width = ((index + 1) / steps.length * 100) + '%';
  }

  highlightStep(0);

  // 桌面端：GSAP pin + 步骤渐入
  ScrollTrigger.matchMedia({
    '(min-width: 769px)': () => {
      // pin 左侧面板
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top 80px',
        end: 'bottom bottom',
        pin: fixedPanel,
        pinSpacing: false
      });

      // 每个步骤的滚动触发
      stepEls.forEach((el, i) => {
        // 渐入动画
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          },
          opacity: 0,
          x: 30,
          duration: 0.6,
          ease: 'power3.out'
        });

        // 步骤切换
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => highlightStep(i),
          onEnterBack: () => highlightStep(i)
        });
      });
    },

    '(max-width: 768px)': () => {
      // 移动端：sticky 定位
      fixedPanel.style.position = 'sticky';
      fixedPanel.style.top = '56px';
      fixedPanel.style.zIndex = '10';
      fixedPanel.style.background = 'inherit';
      fixedPanel.style.paddingBottom = 'var(--space-sm)';

      // 简化动画
      stepEls.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out'
        });

        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => highlightStep(i),
          onEnterBack: () => highlightStep(i)
        });
      });

      return () => {
        fixedPanel.style.position = '';
        fixedPanel.style.top = '';
        fixedPanel.style.zIndex = '';
        fixedPanel.style.background = '';
        fixedPanel.style.paddingBottom = '';
      };
    }
  });

  return {
    destroy() {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger && wrapper.contains(t.trigger)) {
          t.kill();
        }
      });
      wrapper.remove();
    }
  };
}
