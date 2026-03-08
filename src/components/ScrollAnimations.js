// ScrollAnimations.js — GSAP ScrollTrigger 封装
// 提供 fadeIn / stickySteps / countUp / parallax / scaleReveal / killAll
// 使用 ScrollTrigger.matchMedia() 为移动端设置简化参数

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 移动端断点
const MOBILE_BP = '(max-width: 768px)';
const DESKTOP_BP = '(min-width: 769px)';

/**
 * 基础渐入 — 所有 section 内元素的默认入场方式
 * 移动端：减少 y 偏移、缩短 stagger
 */
export function fadeIn(elements, {
  stagger = 0.15,
  y = 60,
  start = 'top 85%',
  duration = 0.8
} = {}) {
  const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
  if (!els || (els.length !== undefined && els.length === 0)) return null;

  const trigger = (els.length !== undefined && els.length > 0) ? els[0] : els;

  // 桌面端参数
  const desktopTween = () => gsap.from(els, {
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y,
    duration,
    stagger,
    ease: 'power3.out'
  });

  // 移动端参数：y 减半、stagger 缩短
  const mobileTween = () => gsap.from(els, {
    scrollTrigger: {
      trigger,
      start: 'top 90%',
      toggleActions: 'play none none none' // 移动端不 reverse，避免闪烁
    },
    opacity: 0,
    y: Math.min(y, 30),
    duration: duration * 0.8,
    stagger: Math.min(stagger, 0.08),
    ease: 'power3.out'
  });

  ScrollTrigger.matchMedia({
    [DESKTOP_BP]: desktopTween,
    [MOBILE_BP]: mobileTween
  });
}

/**
 * 粘性步骤演示 — 左侧固定标题/描述，右侧内容随滚动切换
 * 移动端：不使用 pin（粘性体验不佳），改为普通滚动
 */
export function stickySteps(container, pinned, { endTrigger } = {}) {
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  const pinnedEl = typeof pinned === 'string' ? document.querySelector(pinned) : pinned;
  if (!containerEl || !pinnedEl) return null;

  ScrollTrigger.matchMedia({
    [DESKTOP_BP]: () => {
      ScrollTrigger.create({
        trigger: containerEl,
        start: 'top top',
        end: endTrigger || 'bottom bottom',
        pin: pinnedEl,
        pinSpacing: false
      });
    },
    [MOBILE_BP]: () => {
      // 移动端：给 pinned 元素加 sticky 定位替代
      pinnedEl.style.position = 'sticky';
      pinnedEl.style.top = '56px'; // 移动端顶部导航高度
      pinnedEl.style.zIndex = '10';
      // matchMedia cleanup 时自动移除
      return () => {
        pinnedEl.style.position = '';
        pinnedEl.style.top = '';
        pinnedEl.style.zIndex = '';
      };
    }
  });
}

/**
 * 数字递增 — 统计数字 count-up 动画
 */
export function countUp(el, target, duration = 2) {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element) return null;

  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    textContent: target,
    duration,
    snap: { textContent: 1 },
    ease: 'power2.out'
  });
}

/**
 * 视差 — 背景装饰慢速移动
 * 移动端：不启用视差（性能考虑）
 */
export function parallax(el, speed = 0.3) {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element) return null;

  ScrollTrigger.matchMedia({
    [DESKTOP_BP]: () => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          scrub: true
        },
        y: `${speed * 100}%`,
        ease: 'none'
      });
    }
    // 移动端不创建视差动画
  });
}

/**
 * 缩放揭示 — 交互组件入场
 */
export function scaleReveal(el, { scale = 0.9, start = 'top 80%' } = {}) {
  const element = typeof el === 'string' ? document.querySelector(el) : el;
  if (!element) return null;

  ScrollTrigger.matchMedia({
    [DESKTOP_BP]: () => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale,
        duration: 1,
        ease: 'power3.out'
      });
    },
    [MOBILE_BP]: () => {
      // 移动端：只做 fadeIn，不做 scale（避免布局偏移）
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out'
      });
    }
  });
}

/**
 * 页面离开时必须调用 — 销毁所有 ScrollTrigger 实例
 */
export function killAll() {
  ScrollTrigger.getAll().forEach(t => t.kill());
}

// 导出 gsap 和 ScrollTrigger 供页面直接使用
export { gsap, ScrollTrigger };
