// 首页 — Landing Page
// 深色 Hero + Canvas 几何动画 + 模块卡片 + 统计 + 学习路径
import { fadeIn, countUp, scaleReveal, parallax, killAll, gsap, ScrollTrigger } from '../components/ScrollAnimations.js';
import { getAllProgress } from '../utils/progress.js';
import { navigateTo } from '../utils/router.js';

// 模块数据
const MODULES = [
  {
    id: 'm1', route: 'm1-p1',
    title: '科研数据可视化',
    subtitle: 'Data Visualization',
    color: '#7EC8E3',
    pages: 10,
    desc: '从色彩理论到出版级图表——掌握 R/Python 数据可视化全流程，让你的 Figure 经得起顶刊审稿人的审视。',
    highlights: ['交互色轮与配色生成器', 'ggplot2 图表工作坊', '期刊导出规格速查'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  },
  {
    id: 'm2', route: 'm2-p1',
    title: 'AI 辅助科研绘图',
    subtitle: 'AI-Assisted Illustration',
    color: '#B8B8E8',
    pages: 6,
    desc: 'AI 工具如何在科研绘图中扮演恰当的角色——工具选择、Prompt 技巧、矢量化处理，以及不可忽视的伦理边界。',
    highlights: ['Prompt 质量评分器', 'AI 矢量化模拟器', '期刊 AI 政策对照'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0112 2z"/><circle cx="12" cy="6" r="1"/></svg>`,
  },
  {
    id: 'm3', route: 'm3-p1',
    title: '矢量绘图与设计',
    subtitle: 'Vector Graphics & Design',
    color: '#95D5B2',
    pages: 7,
    desc: '将默认图表升级为出版级——贝塞尔曲线编辑器、SVG 手动优化、多面板 Figure 排版，让每张图都精确到像素。',
    highlights: ['贝塞尔曲线交互编辑器', '8 组 Before/After 美化', 'Figure 布局拖拽编辑器'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  },
  {
    id: 'm4', route: 'm4-p1',
    title: '学术演示设计',
    subtitle: 'Academic Presentation Design',
    color: '#F0B27A',
    pages: 8,
    desc: '从一张幻灯片到完整学术传播物料——排版原则、注意力引导、海报设计、Graphical Abstract，全面提升学术表达力。',
    highlights: ['注意力热力图交互', 'PPT 改造 Before/After', '学术海报布局模板'],
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  },
];

// 学习路径推荐
const ROLES = [
  {
    id: 'grad',
    label: '研究生',
    desc: '刚接触科研绘图，需要系统学习',
    path: ['m1', 'm3', 'm4', 'm2'],
    tip: '从数据可视化基础开始，循序渐进',
  },
  {
    id: 'postdoc',
    label: '博士后/青年教师',
    desc: '有基础，想提升图表品质和效率',
    path: ['m1', 'm2', 'm3', 'm4'],
    tip: '直接进入高级技巧，善用 AI 提效',
  },
  {
    id: 'pi',
    label: 'PI / 导师',
    desc: '指导学生，需要规范和参考',
    path: ['m4', 'm1', 'm3', 'm2'],
    tip: '先看演示设计规范，再深入技术细节',
  },
  {
    id: 'designer',
    label: '科研设计师',
    desc: '帮课题组做美化，需要专业工具',
    path: ['m3', 'm1', 'm4', 'm2'],
    tip: '矢量设计为核心，数据理解为辅助',
  },
];

const MODULE_TITLES = { m1: '数据可视化', m2: 'AI 辅助', m3: '矢量设计', m4: '演示设计' };
const MODULE_COLORS = { m1: '#7EC8E3', m2: '#B8B8E8', m3: '#95D5B2', m4: '#F0B27A' };

export function render() {
  const progress = getAllProgress();

  return `
    <div class="page-scroll home-page">

      <!-- ====== Hero（深色，100vh）====== -->
      <section class="section-dark home-hero" id="home-hero">
        <canvas id="hero-canvas"></canvas>
        <div class="home-hero-content">
          <h1 class="home-hero-title">SciAesthetic</h1>
          <p class="home-hero-slogan">你的研究值得更好的表达</p>
          <p class="home-hero-sub">科研视觉传达知识百科——从色彩理论到出版级图表的完整体系</p>
          <div class="home-hero-actions">
            <button class="btn-primary home-hero-btn" id="hero-explore-btn">开始探索</button>
            <button class="btn-ghost home-hero-btn" id="hero-search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              搜索
              <kbd class="hero-kbd">⌘K</kbd>
            </button>
          </div>
        </div>
        <div class="home-hero-scroll-hint" id="scroll-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      <!-- ====== 模块导航（交错排列）====== -->
      ${MODULES.map((mod, i) => {
        const isOdd = i % 2 === 1;
        const bg = isOdd ? 'section-dark' : 'section-light';
        const p = progress[mod.id] || 0;
        return `
      <section class="${bg} home-module-section" id="module-${mod.id}">
        <div class="content-wrapper">
          <div class="home-module-card ${isOdd ? 'reverse' : ''}" data-color="${mod.color}">
            <div class="home-module-visual">
              <div class="home-module-icon-ring" style="--mod-color: ${mod.color}">
                <div class="home-module-icon">${mod.icon}</div>
              </div>
              <div class="home-module-number" style="color: ${mod.color}">${String(i + 1).padStart(2, '0')}</div>
            </div>
            <div class="home-module-info">
              <span class="home-module-subtitle" style="color: ${mod.color}">${mod.subtitle}</span>
              <h2 class="home-module-title">${mod.title}</h2>
              <p class="home-module-desc">${mod.desc}</p>
              <ul class="home-module-highlights">
                ${mod.highlights.map(h => `<li><span class="highlight-dot" style="background:${mod.color}"></span>${h}</li>`).join('')}
              </ul>
              <div class="home-module-footer">
                <a href="#${mod.route}" class="btn-primary home-module-btn" style="background:${mod.color}" data-route="${mod.route}">
                  进入模块
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
                <div class="home-module-progress" data-module="${mod.id}">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:${p}%;background:${mod.color}"></div>
                  </div>
                  <span class="progress-label">${p > 0 ? `${p}% 已探索` : `${mod.pages} 个词条`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
      }).join('')}

      <!-- ====== 统计数字（深色）====== -->
      <section class="section-dark-deep home-stats-section" id="home-stats">
        <div class="content-wrapper">
          <div class="home-stats-grid">
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-entries" data-target="31">0</span>
              <span class="home-stat-label">知识词条</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-components" data-target="120">0</span>
              <span class="home-stat-label">交互组件</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-palettes" data-target="50">0</span>
              <span class="home-stat-label">配色方案</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-charts" data-target="20">0</span>
              <span class="home-stat-label">图表类型</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 学习路径推荐（浅色）====== -->
      <section class="section-light home-path-section" id="home-path">
        <div class="content-wrapper">
          <div class="home-path-header">
            <h2 class="home-section-title">选择你的角色</h2>
            <p class="home-section-sub">我们为不同背景的科研工作者推荐最适合的学习路径</p>
          </div>
          <div class="home-role-selector">
            ${ROLES.map((role, i) => `
            <button class="home-role-btn ${i === 0 ? 'active' : ''}" data-role="${role.id}">
              <span class="home-role-label">${role.label}</span>
              <span class="home-role-desc">${role.desc}</span>
            </button>
            `).join('')}
          </div>
          <div class="home-path-display" id="path-display">
            <div class="home-path-tip" id="path-tip">${ROLES[0].tip}</div>
            <div class="home-path-steps" id="path-steps">
              ${renderPathSteps(ROLES[0].path)}
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 速查手册入口（深色）====== -->
      <section class="section-dark home-ref-section">
        <div class="content-wrapper" style="text-align:center;">
          <h2 class="home-section-title">速查手册</h2>
          <p class="home-section-sub" style="margin-bottom:var(--space-lg);">图表选择 · 配色方案 · 导出参数 · 快捷键 · 期刊规格<br>随时查阅，一键复制</p>
          <a href="#ref" class="btn-primary" data-route="ref">打开速查手册</a>
        </div>
      </section>

      <!-- ====== Footer CTA ====== -->
      <section class="section-dark-deep home-footer-section">
        <div class="content-wrapper" style="text-align:center;">
          <p class="home-footer-brand">SciAesthetic</p>
          <p class="home-footer-slogan">你的研究值得更好的表达。</p>
        </div>
      </section>

    </div>
  `;
}

function renderPathSteps(path) {
  return path.map((mId, i) => `
    <div class="home-path-step" data-step="${i}">
      <div class="home-path-step-num" style="background:${MODULE_COLORS[mId]}">${i + 1}</div>
      <div class="home-path-step-info">
        <span class="home-path-step-title" style="color:${MODULE_COLORS[mId]}">${MODULE_TITLES[mId]}</span>
      </div>
      ${i < path.length - 1 ? '<div class="home-path-connector"></div>' : ''}
    </div>
  `).join('');
}

// ========== Canvas 几何动画 ==========

let animationId = null;

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  let width, height;
  const isMobile = window.innerWidth < 768;

  // 节点数量：移动端减少
  const NODE_COUNT = isMobile ? 30 : 60;
  const CONNECTION_DIST = isMobile ? 120 : 160;
  const nodes = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // 连线
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.strokeStyle = `rgba(126, 200, 227, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 节点
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126, 200, 227, ${node.opacity})`;
      ctx.fill();
    }
  }

  function update() {
    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      // 边界反弹
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));
    }
  }

  function loop() {
    update();
    draw();
    animationId = requestAnimationFrame(loop);
  }

  resize();
  createNodes();
  loop();

  // resize 处理
  window.__heroResizeHandler = () => {
    resize();
    // 重新生成节点以适应新尺寸
    createNodes();
  };
  window.addEventListener('resize', window.__heroResizeHandler);
}

// ========== 初始化 ==========

export function init() {
  // Canvas 动画
  initHeroCanvas();

  // Hero 按钮
  const exploreBtn = document.getElementById('hero-explore-btn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const section = document.getElementById('module-m1');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const searchBtn = document.getElementById('hero-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      // 触发搜索（通过模拟键盘事件或直接调用）
      import('../components/SearchModal.js').then(m => m.openSearch());
    });
  }

  // 模块按钮点击
  document.querySelectorAll('.home-module-btn[data-route]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(btn.dataset.route);
    });
  });

  // 速查手册按钮
  document.querySelectorAll('[data-route="ref"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('ref');
    });
  });

  // 滚动动画 — Hero 内容
  gsap.from('.home-hero-title', {
    opacity: 0, y: 40, duration: 1, delay: 0.2, ease: 'power3.out'
  });
  gsap.from('.home-hero-slogan', {
    opacity: 0, y: 30, duration: 0.8, delay: 0.5, ease: 'power3.out'
  });
  gsap.from('.home-hero-sub', {
    opacity: 0, y: 20, duration: 0.8, delay: 0.7, ease: 'power3.out'
  });
  gsap.from('.home-hero-actions', {
    opacity: 0, y: 20, duration: 0.8, delay: 0.9, ease: 'power3.out'
  });

  // 滚动提示隐藏
  const scrollHint = document.getElementById('scroll-hint');
  if (scrollHint) {
    ScrollTrigger.create({
      trigger: '#home-hero',
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        scrollHint.style.opacity = String(1 - self.progress * 3);
      }
    });
  }

  // 模块卡片入场动画
  document.querySelectorAll('.home-module-card').forEach(card => {
    scaleReveal(card, { scale: 0.95, start: 'top 85%' });
  });

  // 统计 count-up
  document.querySelectorAll('.home-stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    countUp(el, target, 2);
  });

  // 统计区 fadeIn
  fadeIn('.home-stat-item', { stagger: 0.2, y: 40 });

  // 学习路径 section fadeIn
  fadeIn('.home-path-header', { y: 40 });
  fadeIn('.home-role-selector', { y: 30 });
  scaleReveal(document.querySelector('.home-path-display'), { scale: 0.95 });

  // 角色选择器交互
  initRoleSelector();

  // 路径步骤入场动画
  animatePathSteps();

  // 速查手册 section
  fadeIn('.home-ref-section .content-wrapper', { y: 40 });
}

function initRoleSelector() {
  const roleBtns = document.querySelectorAll('.home-role-btn');
  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const roleId = btn.dataset.role;
      const role = ROLES.find(r => r.id === roleId);
      if (!role) return;

      // 更新路径
      const stepsEl = document.getElementById('path-steps');
      const tipEl = document.getElementById('path-tip');
      if (tipEl) tipEl.textContent = role.tip;
      if (stepsEl) {
        // 淡出再淡入
        stepsEl.style.opacity = '0';
        stepsEl.style.transform = 'translateY(10px)';
        setTimeout(() => {
          stepsEl.innerHTML = renderPathSteps(role.path);
          requestAnimationFrame(() => {
            stepsEl.style.opacity = '1';
            stepsEl.style.transform = 'translateY(0)';
          });
        }, 200);
      }
    });
  });
}

function animatePathSteps() {
  const steps = document.querySelectorAll('.home-path-step');
  steps.forEach((step, i) => {
    gsap.from(step, {
      scrollTrigger: {
        trigger: step,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -20,
      duration: 0.5,
      delay: i * 0.15,
      ease: 'power3.out'
    });
  });
}

export function destroy() {
  // 停止 Canvas 动画
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // 移除 resize 监听
  if (window.__heroResizeHandler) {
    window.removeEventListener('resize', window.__heroResizeHandler);
    delete window.__heroResizeHandler;
  }

  // 销毁所有 ScrollTrigger
  killAll();
}
