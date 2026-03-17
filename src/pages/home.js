// 首页 — Landing Page
// 深色 Hero + Canvas 几何动画 + 模块卡片 + 统计 + 学习路径
import { fadeIn, countUp, scaleReveal, parallax, killAll, gsap, ScrollTrigger } from '../components/ScrollAnimations.js';
import { getAllProgress } from '../utils/progress.js';
import { navigateTo } from '../utils/router.js';

// 首页对比展示数据（复用 P01 的幻灯片素材，但简化为 3 组）
const HOME_SHOWCASE = [
  {
    label: '封面',
    before: `<div style="width:100%;height:100%;box-sizing:border-box;background:linear-gradient(135deg,#c8d8ee,#dde8ff);padding:40px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
      <div style="font-size:17px;font-weight:bold;color:#003399;line-height:1.4;margin-bottom:8px;">基于深度学习的多模态医学影像分析与肿瘤区域自动分割系统关键技术研究进展汇报</div>
      <div style="font-size:11px;color:#555;margin-bottom:12px;">Research Progress on Key Technologies of Multi-modal Medical Image Analysis</div>
      <div style="width:60%;height:1px;background:linear-gradient(90deg,transparent,#003399,transparent);margin:8px auto;"></div>
      <div style="font-size:12px;color:#333;line-height:2;">汇报人：张三 | 指导老师：李四 教授<br>课题组：医学AI实验室 · 计算机科学与技术学院</div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:10px;background:linear-gradient(to right,#1a4a8a,#2860b0);"></div>
    </div>`,
    after: `<div style="width:100%;height:100%;box-sizing:border-box;background:#1d1d1f;padding:48px;display:flex;flex-direction:column;justify-content:center;">
      <div style="width:50px;height:4px;background:#F0B27A;border-radius:2px;margin-bottom:20px;"></div>
      <div style="font-size:12px;color:#666;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:16px;">组会汇报 · 第 14 次</div>
      <div style="font-size:28px;font-weight:700;color:#f5f5f7;line-height:1.35;margin-bottom:24px;">多模态医学影像<br>肿瘤区域自动分割</div>
      <div style="font-size:14px;color:#999;">张三 · 导师：李四 教授</div>
      <div style="border-top:1px solid rgba(255,255,255,0.08);margin-top:20px;padding-top:12px;font-size:12px;color:#555;display:flex;justify-content:space-between;">
        <span>医学AI实验室</span><span>2024 · 12</span>
      </div>
    </div>`,
    caption: '同样的信息，不同的表达',
  },
  {
    label: '图表',
    before: `<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;padding:40px;">
      <div style="font-size:16px;font-weight:bold;color:#333;margin-bottom:12px;text-align:center;">Fig.3 Results of Experiment</div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:160px;padding:0 20px;">
        <div style="flex:1;height:60%;background:linear-gradient(180deg,#e74c3c,#c0392b);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:80%;background:linear-gradient(180deg,#3498db,#2980b9);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:40%;background:linear-gradient(180deg,#2ecc71,#27ae60);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:65%;background:linear-gradient(180deg,#9b59b6,#8e44ad);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:50%;background:linear-gradient(180deg,#e67e22,#d35400);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:90%;background:linear-gradient(180deg,#1abc9c,#16a085);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:35%;background:linear-gradient(180deg,#f39c12,#e67e22);border-radius:3px 3px 0 0;"></div>
        <div style="flex:1;height:72%;background:linear-gradient(180deg,#e91e63,#c2185b);border-radius:3px 3px 0 0;"></div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;justify-content:center;font-size:11px;">
        <span style="color:#e74c3c;">■ A1</span><span style="color:#3498db;">■ A2</span><span style="color:#2ecc71;">■ B1</span><span style="color:#9b59b6;">■ B2</span><span style="color:#e67e22;">■ C1</span><span style="color:#1abc9c;">■ C2</span><span style="color:#f39c12;">■ D1</span><span style="color:#e91e63;">■ D2</span>
      </div>
    </div>`,
    after: `<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;padding:44px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-size:22px;font-weight:700;color:#1d1d1f;margin-bottom:4px;">实验组在第 8 周达到峰值</div>
      <div style="font-size:13px;color:#aaa;margin-bottom:20px;">平均得分 · n=12/组</div>
      <div style="display:flex;align-items:flex-end;gap:28px;height:140px;padding:0 20px;">
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:5px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:56px;background:#e0e0e0;border-radius:4px 4px 0 0;"></div>
            <div style="flex:1;height:60px;background:#F0B27A;border-radius:4px 4px 0 0;"></div>
          </div>
          <span style="font-size:13px;color:#aaa;">W1</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:5px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:60px;background:#e0e0e0;border-radius:4px 4px 0 0;"></div>
            <div style="flex:1;height:88px;background:#F0B27A;border-radius:4px 4px 0 0;"></div>
          </div>
          <span style="font-size:13px;color:#aaa;">W4</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:5px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:64px;background:#e0e0e0;border-radius:4px 4px 0 0;"></div>
            <div style="flex:1;height:120px;background:#F0B27A;border-radius:4px 4px 0 0;position:relative;">
              <div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:11px;color:#F0B27A;font-weight:700;white-space:nowrap;">峰值</div>
            </div>
          </div>
          <span style="font-size:13px;color:#F0B27A;font-weight:600;">W8</span>
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:12px;">
        <span style="font-size:12px;color:#e0e0e0;">● 对照组</span>
        <span style="font-size:12px;color:#F0B27A;">● 实验组</span>
      </div>
    </div>`,
    caption: '8 种颜色变 2 种——数据更清晰',
  },
  {
    label: '结论',
    before: `<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;padding:40px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-size:20px;font-weight:bold;text-align:center;color:#003399;margin-bottom:10px;">Summary &amp; Conclusions</div>
      <div style="width:60%;height:2px;background:#003399;margin:0 auto 14px;"></div>
      <ul style="font-size:14px;color:#444;list-style:disc inside;line-height:2;">
        <li>多模态融合显著优于单模态</li>
        <li>跨模态注意力机制有效</li>
        <li>消融实验验证各组件贡献</li>
        <li>社交媒体数据集上 SOTA</li>
        <li>可扩展到视频模态</li>
        <li>未来：更大规模预训练</li>
      </ul>
      <div style="text-align:center;margin-top:12px;font-size:32px;color:#003399;font-weight:bold;">Thank You! 🎉✨🎊</div>
    </div>`,
    after: `<div style="width:100%;height:100%;box-sizing:border-box;background:#1d1d1f;padding:48px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-size:12px;color:#555;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:24px;">Take-home Messages</div>
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:#F0B27A;line-height:1;">1</span>
          <div><div style="font-size:17px;font-weight:600;color:#f5f5f7;">多模态融合准确率 +12%</div><div style="font-size:13px;color:#666;margin-top:3px;">显著优于纯文本和纯图像方法</div></div>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:#F0B27A;line-height:1;">2</span>
          <div><div style="font-size:17px;font-weight:600;color:#f5f5f7;">跨模态注意力是关键</div><div style="font-size:13px;color:#666;margin-top:3px;">消融实验证实贡献度最高</div></div>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:#F0B27A;line-height:1;">3</span>
          <div><div style="font-size:17px;font-weight:600;color:#f5f5f7;">框架可扩展至视频</div><div style="font-size:13px;color:#666;margin-top:3px;">下一步：大规模多模态预训练</div></div>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.06);margin-top:20px;padding-top:12px;font-size:12px;color:#444;">zhangsan@university.edu</div>
    </div>`,
    caption: '6 条结论变 3 条——记住的更多',
  },
];

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
    pages: 4,
    desc: '4 条设计原则 + 6 组真实改造案例——从封面到结论，每一张 slide 都能脱胎换骨。',
    highlights: ['PPT 改造 Before/After', '4 原则速成指南', '学术海报与 GA 设计'],
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

      <!-- ====== 对比冲击（深色）====== -->
      <section class="section-dark home-showcase-section" id="home-showcase" style="padding:var(--space-3xl) var(--space-lg);min-height:80vh;display:flex;align-items:center;">
        <div class="content-wrapper">
          <div class="home-showcase-header" style="text-align:center;margin-bottom:var(--space-xl);">
            <h2 class="home-section-title">同一份内容，两种表达</h2>
            <p class="home-section-sub">差距就在细节里——我们教你怎么做到</p>
          </div>
          <div class="home-showcase-wrap">
            <div class="home-showcase-tabs" id="home-showcase-tabs" style="display:flex;justify-content:center;margin-bottom:var(--space-md);flex-wrap:wrap;"></div>
            <p class="home-showcase-label" id="home-showcase-label" style="font-size:12px;color:rgba(255,255,255,0.3);text-align:center;margin-bottom:8px;letter-spacing:0.08em;text-transform:uppercase;">BEFORE</p>
            <div class="home-showcase-frame" id="home-showcase-frame" style="max-width:680px;margin:0 auto;aspect-ratio:16/9;border-radius:12px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.4);position:relative;cursor:pointer;transition:transform 0.3s,box-shadow 0.3s;">
              <div id="home-showcase-before" style="position:absolute;inset:0;transition:opacity 0.6s ease;"></div>
              <div id="home-showcase-after" style="position:absolute;inset:0;transition:opacity 0.6s ease;opacity:0;"></div>
            </div>
            <p class="home-showcase-caption" id="home-showcase-caption" style="font-size:16px;color:rgba(255,255,255,0.5);text-align:center;margin-top:20px;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7;min-height:1.7em;transition:opacity 0.4s;"></p>
          </div>
          <div style="text-align:center;margin-top:32px;">
            <a href="#m4-p1" class="btn-primary" data-route="m4-p1" style="background:#F0B27A;">学习设计原则 →</a>
          </div>
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
              <span class="stat-number home-stat-num" id="stat-entries" data-target="28">0</span>
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
      <section class="section-dark home-ref-section" style="padding:var(--space-3xl) var(--space-lg);min-height:40vh;display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;width:100%;max-width:var(--w-content);margin:0 auto;">
          <h2 class="home-section-title">速查手册</h2>
          <p class="home-section-sub" style="margin-bottom:var(--space-lg);">图表选择 · 配色方案 · 导出参数 · 快捷键 · 期刊规格 —— 随时查阅，一键复制</p>
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

  // 首页对比展示
  initHomeShowcase();

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

  // 对比展示 CTA 按钮
  document.querySelectorAll('[data-route="m4-p1"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('m4-p1');
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

  // 对比展示 fadeIn
  fadeIn('#home-showcase .home-showcase-header', { y: 40 });
  fadeIn('.home-showcase-wrap', { y: 50, duration: 0.8 });

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

function initHomeShowcase() {
  const frame = document.getElementById('home-showcase-frame');
  const beforeEl = document.getElementById('home-showcase-before');
  const afterEl = document.getElementById('home-showcase-after');
  const captionEl = document.getElementById('home-showcase-caption');
  const labelEl = document.getElementById('home-showcase-label');
  const tabsEl = document.getElementById('home-showcase-tabs');
  if (!frame || !beforeEl || !afterEl || !tabsEl) return;

  let currentSlide = 0;
  let currentPhase = 'before';
  let autoTimer = null;

  // 渲染 tab 按钮
  HOME_SHOWCASE.forEach((s, i) => {
    const tab = document.createElement('button');
    tab.className = 'home-showcase-tab' + (i === 0 ? ' active' : '');
    tab.dataset.idx = i;
    tab.textContent = s.label;
    tab.style.cssText = 'padding:8px 18px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(255,255,255,0.5);cursor:pointer;font-size:14px;transition:all 0.3s;margin:0 4px;';
    tabsEl.appendChild(tab);
  });

  function showSlide(idx, phase) {
    currentSlide = idx;
    currentPhase = phase;
    const slide = HOME_SHOWCASE[idx];

    beforeEl.innerHTML = slide.before;
    afterEl.innerHTML = slide.after;

    if (phase === 'before') {
      beforeEl.style.opacity = '1';
      afterEl.style.opacity = '0';
      if (labelEl) labelEl.textContent = 'BEFORE';
    } else {
      beforeEl.style.opacity = '0';
      afterEl.style.opacity = '1';
      if (labelEl) labelEl.textContent = 'AFTER';
    }

    if (captionEl) {
      captionEl.style.opacity = '0';
      setTimeout(() => {
        captionEl.textContent = phase === 'after' ? slide.caption : '';
        captionEl.style.opacity = phase === 'after' ? '1' : '0';
      }, 200);
    }

    tabsEl.querySelectorAll('.home-showcase-tab').forEach((t, i) => {
      const isActive = i === idx;
      t.style.background = isActive ? '#F0B27A' : 'transparent';
      t.style.borderColor = isActive ? '#F0B27A' : 'rgba(255,255,255,0.15)';
      t.style.color = isActive ? '#1d1d1f' : 'rgba(255,255,255,0.5)';
    });
  }

  showSlide(0, 'before');

  // Tab 点击
  tabsEl.addEventListener('click', (e) => {
    const tab = e.target.closest('.home-showcase-tab');
    if (!tab) return;
    showSlide(parseInt(tab.dataset.idx), 'before');
    clearInterval(autoTimer);
    startAutoPlay();
  });

  // 点击 frame 切换 before/after
  frame.addEventListener('click', () => {
    showSlide(currentSlide, currentPhase === 'before' ? 'after' : 'before');
    clearInterval(autoTimer);
    startAutoPlay();
  });

  // 自动轮播
  function startAutoPlay() {
    autoTimer = setInterval(() => {
      if (currentPhase === 'before') {
        showSlide(currentSlide, 'after');
      } else {
        showSlide((currentSlide + 1) % HOME_SHOWCASE.length, 'before');
      }
    }, 2500);
  }
  startAutoPlay();

  // 存储 timer 以便 destroy 时清理
  window.__homeShowcaseTimer = autoTimer;
  window.__homeShowcaseStartAutoPlay = startAutoPlay;
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

  // 清理对比展示自动轮播
  if (window.__homeShowcaseTimer) {
    clearInterval(window.__homeShowcaseTimer);
    delete window.__homeShowcaseTimer;
    delete window.__homeShowcaseStartAutoPlay;
  }

  // 销毁所有 ScrollTrigger
  killAll();
}
