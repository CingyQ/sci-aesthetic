// p07-resources.js — 资源与工具
// Hero → S1 资源卡片库 → S2 工具推荐向导 → S3 许可证速查 → Footer CTA

import { fadeIn, killAll, gsap } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _eventHandlers = [];

function addEvt(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ══════════════════════════════════════════════════════
//  资源数据
// ══════════════════════════════════════════════════════
const RESOURCES = [
  // 软件工具
  {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    category: 'software',
    categoryLabel: '软件工具',
    desc: '业界标准的专业矢量图形软件，科研插图制作的首选工具。',
    pricing: 'paid',
    pricingLabel: '付费',
    features: ['强大的钢笔工具与贝塞尔曲线控制', '完美兼容各大期刊投稿格式', '丰富的脚本自动化能力'],
    tags: ['journal', 'diagram', 'presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'advanced',
    free: false,
    paid: true,
    url: '#'
  },
  {
    id: 'inkscape',
    name: 'Inkscape',
    category: 'software',
    categoryLabel: '软件工具',
    desc: '功能完备的免费开源矢量图形编辑器，支持全面的 SVG 标准。',
    pricing: 'free',
    pricingLabel: '免费',
    features: ['完全免费且开源，无需订阅', '出色的 SVG 原生支持', '支持 Python 脚本扩展'],
    tags: ['journal', 'diagram', 'all'],
    os: 'cross-platform',
    difficulty: 'medium',
    free: true,
    paid: false,
    url: '#'
  },
  {
    id: 'affinity',
    name: 'Affinity Designer',
    category: 'software',
    categoryLabel: '软件工具',
    desc: '高性价比的专业矢量与栅格图形设计工具，一次性购买终身使用。',
    pricing: 'paid',
    pricingLabel: '付费',
    features: ['一次性购买，无订阅费用', '矢量与栅格无缝切换', '流畅的 120fps 实时预览'],
    tags: ['journal', 'presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'medium',
    free: false,
    paid: true,
    url: '#'
  },
  {
    id: 'coreldraw',
    name: 'CorelDRAW',
    category: 'software',
    categoryLabel: '软件工具',
    desc: '历史悠久的专业矢量设计套件，在工程和科学插图领域广泛应用。',
    pricing: 'paid',
    pricingLabel: '付费',
    features: ['完善的工程制图支持', '丰富的科学符号库', '强大的排版与布局工具'],
    tags: ['journal', 'diagram', 'all'],
    os: 'cross-platform',
    difficulty: 'advanced',
    free: false,
    paid: true,
    url: '#'
  },
  // 在线工具
  {
    id: 'figma',
    name: 'Figma',
    category: 'online',
    categoryLabel: '在线工具',
    desc: '基于浏览器的协作设计平台，适合团队共同创作科研图表和演示材料。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['实时多人协作编辑', '丰富的矢量编辑能力', '海量社区模板和插件'],
    tags: ['presentation', 'diagram', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  {
    id: 'canva',
    name: 'Canva for Science',
    category: 'online',
    categoryLabel: '在线工具',
    desc: '面向科研人员优化的在线设计平台，提供大量学术海报和图表模板。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['专属学术设计模板库', '一键生成图形摘要', '支持高分辨率 PDF 导出'],
    tags: ['presentation', 'journal', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  {
    id: 'biorender',
    name: 'BioRender',
    category: 'online',
    categoryLabel: '在线工具',
    desc: '生命科学领域的专业科学图形创作平台，内置数千个生物医学图标。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['超过 50,000 个生物科学图标', '专为期刊发表图形优化', '支持团队协作与模板共享'],
    tags: ['journal', 'diagram', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  // 字体资源
  {
    id: 'google-fonts',
    name: 'Google Fonts',
    category: 'fonts',
    categoryLabel: '字体资源',
    desc: '免费开源字体库，提供超过 1500 款高质量字体，含多款学术友好字体。',
    pricing: 'free',
    pricingLabel: '免费',
    features: ['完全免费，支持商业使用', '优秀的中英文学术字体选择', 'API 直接嵌入网页和文档'],
    tags: ['presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: false,
    url: '#'
  },
  {
    id: 'adobe-fonts',
    name: 'Adobe Fonts',
    category: 'fonts',
    categoryLabel: '字体资源',
    desc: '随 Adobe Creative Cloud 订阅提供的高端字体库，含众多专业排版字体。',
    pricing: 'paid',
    pricingLabel: '付费',
    features: ['20,000+ 专业级字体', '与 Illustrator 无缝集成', '支持多语言科研文档排版'],
    tags: ['journal', 'presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: false,
    paid: true,
    url: '#'
  },
  {
    id: 'font-squirrel',
    name: 'Font Squirrel',
    category: 'fonts',
    categoryLabel: '字体资源',
    desc: '精选的免费商业字体平台，所有字体均经过授权验证，可安全用于发表。',
    pricing: 'free',
    pricingLabel: '免费',
    features: ['严格筛选的商业授权字体', '提供 Web Font 格式转换', '按风格和用途分类浏览'],
    tags: ['presentation', 'journal', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: false,
    url: '#'
  },
  // 图标库
  {
    id: 'noun-project',
    name: 'The Noun Project',
    category: 'icons',
    categoryLabel: '图标库',
    desc: '全球最大的科学与通用图标库，覆盖几乎所有学科领域的专业图标。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['500 万+ 专业图标矢量素材', '覆盖生物、化学、物理等各学科', '支持 SVG/PNG 格式下载'],
    tags: ['journal', 'diagram', 'presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  {
    id: 'flaticon',
    name: 'Flaticon',
    category: 'icons',
    categoryLabel: '图标库',
    desc: '拥有大量扁平化风格矢量图标的资源网站，适合制作现代感的科研演示。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['900 万+ 矢量图标和贴纸', '提供统一风格的图标包', '支持颜色自定义后下载'],
    tags: ['presentation', 'diagram', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  {
    id: 'font-awesome',
    name: 'Font Awesome',
    category: 'icons',
    categoryLabel: '图标库',
    desc: '经典的图标字体库，提供大量 UI 和通用图标，常用于科研网站和报告。',
    pricing: 'freemium',
    pricingLabel: '免费增值',
    features: ['2000+ 免费图标，即用即得', '支持图标字体和 SVG 两种形式', '易于在 Web 和文档中集成'],
    tags: ['presentation', 'all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: true,
    url: '#'
  },
  // 学习资源
  {
    id: 'vecteezy',
    name: 'Vecteezy Tutorials',
    category: 'learning',
    categoryLabel: '学习资源',
    desc: '提供系统的矢量图形设计教程，从入门到进阶全面覆盖。',
    pricing: 'free',
    pricingLabel: '免费',
    features: ['系统化的矢量设计教程', '实战项目练习文件下载', '社区问答和点评反馈'],
    tags: ['all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: false,
    url: '#'
  },
  {
    id: 'adobe-learn',
    name: 'Adobe Learn',
    category: 'learning',
    categoryLabel: '学习资源',
    desc: 'Adobe 官方学习中心，提供 Illustrator 系列视频教程和实战项目指导。',
    pricing: 'free',
    pricingLabel: '免费',
    features: ['Adobe 官方权威教程', '从基础到高级的完整学习路径', '随时可下载的练习文件'],
    tags: ['all'],
    os: 'cross-platform',
    difficulty: 'easy',
    free: true,
    paid: false,
    url: '#'
  }
];

// ══════════════════════════════════════════════════════
//  Quiz 数据
// ══════════════════════════════════════════════════════
const QUIZ_QUESTIONS = [
  {
    id: 'budget',
    question: '你的预算是？',
    icon: '💰',
    options: [
      { value: 'free', label: '完全免费', desc: '只使用免费工具' },
      { value: 'low', label: '低预算', desc: '可接受一次性小额付费' },
      { value: 'professional', label: '专业预算', desc: '订阅或高端软件均可' }
    ]
  },
  {
    id: 'purpose',
    question: '主要用途是什么？',
    icon: '🎯',
    options: [
      { value: 'journal', label: '期刊图表', desc: '投稿用的精密科学图形' },
      { value: 'diagram', label: '流程图 / 示意图', desc: '实验流程、机制示意图' },
      { value: 'presentation', label: '演示设计', desc: '学术海报、PPT、汇报' },
      { value: 'all', label: '全能需求', desc: '以上都需要' }
    ]
  },
  {
    id: 'os',
    question: '你使用什么操作系统？',
    icon: '💻',
    options: [
      { value: 'windows', label: 'Windows', desc: 'PC 或工作站' },
      { value: 'macos', label: 'macOS', desc: 'Mac / MacBook' },
      { value: 'cross-platform', label: '跨平台 / 浏览器', desc: '在线工具优先' }
    ]
  },
  {
    id: 'level',
    question: '你的设计技术水平？',
    icon: '📊',
    options: [
      { value: 'beginner', label: '初学者', desc: '刚开始接触设计工具' },
      { value: 'medium', label: '有基础', desc: '用过一些设计软件' },
      { value: 'advanced', label: '专业用户', desc: '熟悉矢量设计原理' }
    ]
  }
];

// ══════════════════════════════════════════════════════
//  许可证数据
// ══════════════════════════════════════════════════════
const LICENSES = [
  {
    id: 'cc-by',
    name: 'CC BY',
    fullName: '署名许可',
    colorVar: 'var(--module-3)',
    colorHex: '#95D5B2',
    icon: 'BY',
    desc: '使用作品时需要注明原作者，可自由使用、修改和商业化。',
    academicNote: '适合学术发表，在图注中注明来源即可。',
    canDo: ['学术论文中引用', '修改后用于教学', '商业产品中使用（需署名）', '创作衍生作品'],
    cannotDo: ['移除版权声明', '声称为自己的原创作品']
  },
  {
    id: 'cc-by-nc',
    name: 'CC BY-NC',
    fullName: '署名—非商业性使用',
    colorVar: 'var(--accent)',
    colorHex: '#7EC8E3',
    icon: 'NC',
    desc: '允许非商业用途的使用和修改，必须署名，禁止商业用途。',
    academicNote: '适合学术非营利发表，商业出版社期刊须确认条款。',
    canDo: ['个人和学术研究使用', '非营利教育材料', '开放获取期刊投稿（部分）'],
    cannotDo: ['商业出版物中使用', '销售含此内容的产品', '企业报告或宣传材料']
  },
  {
    id: 'cc-by-sa',
    name: 'CC BY-SA',
    fullName: '署名—相同方式共享',
    colorVar: 'var(--module-4)',
    colorHex: '#F0B27A',
    icon: 'SA',
    desc: '允许修改和使用，但衍生作品必须采用相同的许可协议，并署名。',
    academicNote: '需注意期刊是否接受 SA 类许可，开放获取期刊通常可接受。',
    canDo: ['学术论文中引用', '修改后在相同许可下发布', '维基百科类协作项目'],
    cannotDo: ['修改后用专有许可发布', '用于不兼容许可的项目']
  },
  {
    id: 'cc0',
    name: 'CC0',
    fullName: '公共领域 / 无版权',
    colorVar: 'var(--module-2)',
    colorHex: '#B8B8E8',
    icon: 'C0',
    desc: '作者放弃所有版权，任何人可以自由使用、修改、商业化，无需署名。',
    academicNote: '最友好的学术使用许可，无任何限制，但学术规范建议仍注明来源。',
    canDo: ['完全自由使用和修改', '无需注明来源（学术规范建议注明）', '商业和非商业均可', '创作任何衍生作品'],
    cannotDo: ['（几乎没有限制）']
  },
  {
    id: 'commercial',
    name: '商业许可',
    fullName: '专有商业许可',
    colorVar: '#E8A0A0',
    colorHex: '#E8A0A0',
    icon: '©',
    desc: '需要购买授权才能使用，通常有明确的使用范围限制，不可随意再分发。',
    academicNote: '部分期刊或机构订阅后可用于发表；个人购买前务必确认学术发表权限。',
    canDo: ['购买后在授权范围内使用', '部分许可允许学术发表', '咨询版权方获得特殊授权'],
    cannotDo: ['未购买情况下使用', '超出授权范围使用', '再分发或转售', '修改后发布（通常）']
  }
];

// ══════════════════════════════════════════════════════
//  Quiz 运行时状态
// ══════════════════════════════════════════════════════
let _quizState = {
  currentStep: 0,
  answers: {}
};

// ══════════════════════════════════════════════════════
//  渲染辅助函数
// ══════════════════════════════════════════════════════
function renderResourceCard(r) {
  const pricingClass = {
    free: 'p07-badge-free',
    paid: 'p07-badge-paid',
    freemium: 'p07-badge-freemium'
  }[r.pricing] || 'p07-badge-free';

  return `
<div class="p07-resource-card" data-category="${r.category}">
  <div class="p07-card-header">
    <div class="p07-card-name">${r.name}</div>
    <div class="p07-card-badges">
      <span class="p07-badge p07-badge-category">${r.categoryLabel}</span>
      <span class="p07-badge ${pricingClass}">${r.pricingLabel}</span>
    </div>
  </div>
  <p class="p07-card-desc">${r.desc}</p>
  <ul class="p07-card-features">
    ${r.features.map(f => `<li>${f}</li>`).join('')}
  </ul>
  <div class="p07-card-footer">
    <a href="${r.url}" class="p07-card-link">访问资源 <span aria-hidden="true">→</span></a>
  </div>
</div>`.trim();
}

function renderQuizQuestion(q, index) {
  const display = index === 0 ? 'block' : 'none';
  return `
<div class="p07-quiz-question" id="p07-question-${index}" style="display:${display};">
  <span class="p07-question-icon" aria-hidden="true">${q.icon}</span>
  <p class="p07-question-text">${q.question}</p>
  <div class="p07-quiz-options">
    ${q.options.map(opt => `
    <button class="p07-quiz-option" data-question="${q.id}" data-value="${opt.value}">
      <span class="p07-option-label">${opt.label}</span>
      <span class="p07-option-desc">${opt.desc}</span>
    </button>`).join('')}
  </div>
</div>`.trim();
}

function renderLicenseCard(l) {
  return `
<div class="p07-license-card">
  <div class="p07-license-header">
    <div class="p07-license-icon" style="background:${l.colorHex}22;color:${l.colorHex};">${l.icon}</div>
    <div class="p07-license-names">
      <div class="p07-license-name">${l.name}</div>
      <div class="p07-license-fullname">${l.fullName}</div>
    </div>
  </div>
  <div class="p07-license-body">
    <p class="p07-license-desc">${l.desc}</p>
    <div class="p07-academic-note">学术发表：${l.academicNote}</div>
    <div class="p07-license-rules">
      <div class="p07-license-rules-col p07-rules-can">
        <p class="p07-rules-title">可以</p>
        ${l.canDo.map(item => `<div class="p07-rule-item"><span class="rule-check" aria-hidden="true">✓</span><span>${item}</span></div>`).join('')}
      </div>
      <div class="p07-license-rules-col p07-rules-cannot">
        <p class="p07-rules-title">不可以</p>
        ${l.cannotDo.map(item => `<div class="p07-rule-item"><span class="rule-cross" aria-hidden="true">✗</span><span>${item}</span></div>`).join('')}
      </div>
    </div>
  </div>
</div>`.trim();
}

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════
export function render() {
  return `
<div class="page-scroll p07-page">
  <style>
    /* ─── Hero scroll hint ─── */
    .p07-scroll-hint {
      font-size: var(--text-caption);
      color: var(--text-on-dark-3);
      animation: p07-float 2s ease-in-out infinite;
      white-space: nowrap;
      margin-top: var(--space-sm);
    }
    @keyframes p07-float {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(6px); }
    }

    /* ─── S1 Filter tabs ─── */
    .p07-filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-bottom: var(--space-lg);
    }
    .p07-filter-tab {
      padding: 8px 18px;
      border: 1px solid var(--border);
      border-radius: 20px;
      background: transparent;
      color: var(--text-secondary);
      font-size: var(--text-caption);
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      font-family: var(--font-body);
    }
    .p07-filter-tab:hover {
      border-color: var(--module-3);
      color: var(--module-3);
    }
    .p07-filter-tab.active {
      background: var(--module-3);
      border-color: var(--module-3);
      color: #1d1d1f;
      font-weight: 600;
    }

    /* ─── S1 Resource grid ─── */
    .p07-resources-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-md);
    }
    @media (max-width: 1024px) {
      .p07-resources-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 600px) {
      .p07-resources-grid { grid-template-columns: 1fr; }
    }
    .p07-resource-card {
      background: var(--bg-primary);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: var(--space-md);
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .p07-resource-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.1);
      border-color: var(--module-3);
    }
    .p07-resource-card.hidden { display: none; }
    .p07-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    .p07-card-name {
      font-size: var(--text-body);
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.3;
    }
    .p07-card-badges {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .p07-badge {
      font-size: 11px;
      padding: 3px 9px;
      border-radius: 10px;
      font-weight: 600;
      white-space: nowrap;
    }
    .p07-badge-category { background: rgba(149,213,178,0.15); color: var(--module-3); }
    .p07-badge-free     { background: rgba(149,213,178,0.2);  color: #2e7d52; }
    .p07-badge-paid     { background: rgba(240,178,122,0.2);  color: #9c5e1a; }
    .p07-badge-freemium { background: rgba(126,200,227,0.2);  color: #1a7296; }
    .p07-card-desc {
      font-size: var(--text-caption);
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .p07-card-features {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .p07-card-features li {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.5;
      padding-left: 16px;
      position: relative;
    }
    .p07-card-features li::before {
      content: '▸';
      position: absolute;
      left: 0;
      color: var(--module-3);
      font-size: 11px;
      top: 2px;
    }
    .p07-card-footer {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--border);
    }
    .p07-card-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: var(--text-caption);
      color: var(--module-3);
      text-decoration: none;
      font-weight: 500;
      transition: gap 0.2s ease;
    }
    .p07-card-link:hover { gap: 10px; }

    /* ─── S2 Quiz ─── */
    .p07-quiz-wrapper {
      max-width: 680px;
      margin: 0 auto;
    }
    .p07-quiz-progress {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
    }
    .p07-quiz-progress-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
    }
    .p07-quiz-progress-fill {
      height: 100%;
      background: var(--module-3);
      border-radius: 2px;
      transition: width 0.4s ease;
    }
    .p07-quiz-progress-label {
      font-size: var(--text-caption);
      color: var(--text-on-dark-3);
      min-width: 36px;
      text-align: right;
    }
    .p07-question-icon {
      font-size: 2.5rem;
      margin-bottom: var(--space-sm);
      display: block;
    }
    .p07-question-text {
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 600;
      color: var(--text-on-dark);
      margin-bottom: var(--space-md);
      line-height: 1.4;
    }
    .p07-quiz-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .p07-quiz-option {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 16px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-align: left;
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-height: 44px;
      width: 100%;
      font-family: var(--font-body);
    }
    .p07-quiz-option:hover {
      background: rgba(149,213,178,0.1);
      border-color: var(--module-3);
    }
    .p07-quiz-option.selected {
      background: rgba(149,213,178,0.15);
      border-color: var(--module-3);
    }
    .p07-option-label {
      font-size: var(--text-body);
      font-weight: 600;
      color: var(--text-on-dark);
    }
    .p07-option-desc {
      font-size: var(--text-caption);
      color: var(--text-on-dark-3);
    }
    .p07-quiz-results { display: none; }
    .p07-results-title {
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      font-weight: 600;
      color: var(--text-on-dark);
      margin-bottom: var(--space-md);
    }
    .p07-result-card {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 14px;
      padding: var(--space-md);
      margin-bottom: 12px;
      display: flex;
      align-items: flex-start;
      gap: var(--space-sm);
    }
    .p07-result-card:first-child {
      border-color: var(--module-3);
      background: rgba(149,213,178,0.08);
    }
    .p07-result-rank {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      flex-shrink: 0;
    }
    .p07-result-rank-1 { background: var(--module-3); color: #1d1d1f; }
    .p07-result-rank-2 { background: rgba(255,255,255,0.15); color: var(--text-on-dark); }
    .p07-result-rank-3 { background: rgba(255,255,255,0.08); color: var(--text-on-dark-3); }
    .p07-result-info { flex: 1; }
    .p07-result-name {
      font-size: var(--text-body);
      font-weight: 600;
      color: var(--text-on-dark);
      margin-bottom: 4px;
    }
    .p07-result-why {
      font-size: var(--text-caption);
      color: var(--text-on-dark-3);
      line-height: 1.6;
    }
    .p07-result-score-bar {
      width: 100%;
      height: 3px;
      background: rgba(255,255,255,0.08);
      border-radius: 2px;
      margin-top: 8px;
      overflow: hidden;
    }
    .p07-result-score-fill {
      height: 100%;
      background: var(--module-3);
      border-radius: 2px;
      transition: width 0.6s ease 0.2s;
    }
    .p07-quiz-restart {
      margin-top: var(--space-md);
      padding: 12px 28px;
      background: transparent;
      border: 1px solid rgba(149,213,178,0.4);
      border-radius: 24px;
      color: var(--module-3);
      font-size: var(--text-caption);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      min-height: 44px;
      font-family: var(--font-body);
    }
    .p07-quiz-restart:hover {
      background: rgba(149,213,178,0.1);
      border-color: var(--module-3);
    }

    /* ─── S3 Licenses ─── */
    .p07-license-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-md);
    }
    .p07-license-card {
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      background: var(--bg-primary);
    }
    .p07-license-header {
      padding: var(--space-sm) var(--space-md);
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .p07-license-icon {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }
    .p07-license-names { flex: 1; }
    .p07-license-name {
      font-size: var(--text-body);
      font-weight: 700;
      color: var(--text-primary);
    }
    .p07-license-fullname {
      font-size: var(--text-caption);
      color: var(--text-secondary);
    }
    .p07-license-body {
      padding: 0 var(--space-md) var(--space-md);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .p07-license-desc {
      font-size: var(--text-caption);
      color: var(--text-secondary);
      line-height: 1.7;
    }
    .p07-academic-note {
      background: rgba(149,213,178,0.1);
      border-left: 3px solid var(--module-3);
      padding: 8px 12px;
      border-radius: 0 8px 8px 0;
      font-size: 13px;
      color: var(--text-primary);
      line-height: 1.6;
    }
    .p07-license-rules {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    @media (max-width: 400px) {
      .p07-license-rules { grid-template-columns: 1fr; }
    }
    .p07-license-rules-col { display: flex; flex-direction: column; gap: 4px; }
    .p07-rules-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .p07-rules-can .p07-rules-title   { color: #2e7d52; }
    .p07-rules-cannot .p07-rules-title { color: #c0392b; }
    .p07-rule-item {
      font-size: 12px;
      color: var(--text-secondary);
      line-height: 1.5;
      display: flex;
      gap: 5px;
      align-items: flex-start;
    }
    .rule-check { color: #2e7d52; flex-shrink: 0; margin-top: 1px; }
    .rule-cross  { color: #c0392b; flex-shrink: 0; margin-top: 1px; }

    /* ─── Mobile overrides ─── */
    @media (max-width: 768px) {
      #p07-s1, #p07-s2, #p07-s3 { scroll-margin-top: 56px; }
    }
  </style>

  <!-- ══════ HERO ══════ -->
  <section class="section-dark section-hero-full p07-hero" id="p07-hero">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 07</p>
      <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">资源与工具</h1>
      <p class="page-hero-sub" style="opacity:0;">Vector Design Resources &amp; Tools</p>
      <p class="p07-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
        精选科研矢量设计工具链——从免费入门到专业进阶，一览无余
      </p>
      <nav class="hero-quicknav" id="p07-quicknav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#p07-s1">资源库</button>
        <button class="hero-quicknav__item" data-target="#p07-s2">工具推荐</button>
        <button class="hero-quicknav__item" data-target="#p07-s3">许可证指南</button>
      </nav>
      <div class="p07-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ══════ S1 资源卡片库 ══════ -->
  <section class="section-light" id="p07-s1" style="scroll-margin-top:56px;">
    <div class="section-inner">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">Resources Library</p>
        <h2 class="section-title">精选资源库</h2>
        <p class="section-subtitle" style="max-width:600px;margin:0 auto;">
          15 个经过筛选的矢量设计资源，覆盖软件、在线工具、字体、图标和学习材料
        </p>
      </div>

      <div class="p07-filter-tabs" id="p07-filter-tabs">
        <button class="p07-filter-tab active" data-filter="all">全部</button>
        <button class="p07-filter-tab" data-filter="software">软件工具</button>
        <button class="p07-filter-tab" data-filter="online">在线工具</button>
        <button class="p07-filter-tab" data-filter="fonts">字体资源</button>
        <button class="p07-filter-tab" data-filter="icons">图标库</button>
        <button class="p07-filter-tab" data-filter="learning">学习资源</button>
      </div>

      <div class="p07-resources-grid" id="p07-resources-grid">
        ${RESOURCES.map(r => renderResourceCard(r)).join('\n')}
      </div>
    </div>
  </section>

  <!-- ══════ S2 工具推荐向导 ══════ -->
  <section class="section-dark" id="p07-s2" style="scroll-margin-top:56px;">
    <div class="section-inner">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow" style="color:rgba(149,213,178,0.7);">Tool Finder Quiz</p>
        <h2 class="section-title" style="color:var(--text-on-dark);">找到最适合你的工具</h2>
        <p class="section-subtitle" style="color:var(--text-on-dark-2);max-width:520px;margin:0 auto;">
          回答 4 个问题，获得个性化工具推荐
        </p>
      </div>

      <div class="p07-quiz-wrapper">
        <div class="p07-quiz-progress">
          <div class="p07-quiz-progress-bar">
            <div class="p07-quiz-progress-fill" id="p07-quiz-progress-fill" style="width:0%"></div>
          </div>
          <span class="p07-quiz-progress-label" id="p07-quiz-progress-label">0 / 4</span>
        </div>

        <div id="p07-quiz-questions">
          ${QUIZ_QUESTIONS.map((q, i) => renderQuizQuestion(q, i)).join('\n')}
        </div>

        <div class="p07-quiz-results" id="p07-quiz-results">
          <p class="p07-results-title">为你推荐的工具</p>
          <div id="p07-quiz-results-list"></div>
          <button class="p07-quiz-restart" id="p07-quiz-restart">↩ 重新测试</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════ S3 许可证速查 ══════ -->
  <section class="section-light" id="p07-s3" style="scroll-margin-top:56px;">
    <div class="section-inner">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">License Guide</p>
        <h2 class="section-title">许可证速查手册</h2>
        <p class="section-subtitle" style="max-width:600px;margin:0 auto;">
          了解不同许可证类型，确保你的科研图形合规使用
        </p>
      </div>

      <div class="p07-license-grid" id="p07-license-grid">
        ${LICENSES.map(l => renderLicenseCard(l)).join('\n')}
      </div>
    </div>
  </section>

  <!-- ══════ Footer CTA ══════ -->
  <section class="section-dark section-footer-cta" id="p07-footer">
    <div class="section-inner" style="text-align:center;">
      <h2 class="page-footer-quote">工欲善其事，必先利其器——选对工具，事半功倍</h2>
      <p style="color:var(--text-on-dark-2);margin-top:var(--space-sm);max-width:540px;margin-left:auto;margin-right:auto;line-height:1.8;">
        模块三已全部完成。掌握矢量设计工具链，让你的科研图形达到发表级水准。
      </p>
      <div class="footer-nav-row" style="margin-top:var(--space-lg);display:flex;gap:var(--space-md);justify-content:center;flex-wrap:wrap;">
        <button class="btn-outline-light" id="p07-prev-btn">← 多面板 Figure 组合</button>
        <button class="btn-primary" id="p07-next-btn">进入模块四 →</button>
      </div>
    </div>
  </section>
</div>
  `;
}

// ══════════════════════════════════════════════════════
//  Quiz 逻辑
// ══════════════════════════════════════════════════════
function scoreResource(resource, answers) {
  let score = 0;

  // 预算匹配
  if (answers.budget === 'free' && resource.free) score += 3;
  if (answers.budget === 'free' && !resource.free) score -= 3;
  if (answers.budget === 'low' && (resource.free || resource.pricing === 'freemium')) score += 2;
  if (answers.budget === 'professional' && resource.paid) score += 2;

  // 用途匹配
  if (answers.purpose && resource.tags.includes(answers.purpose)) score += 3;
  if (resource.tags.includes('all')) score += 1;

  // 操作系统匹配
  if (resource.os === 'cross-platform') score += 2;

  // 技术水平匹配
  if (answers.level === 'beginner' && resource.difficulty === 'easy') score += 2;
  if (answers.level === 'medium'   && resource.difficulty === 'medium') score += 2;
  if (answers.level === 'advanced' && resource.difficulty === 'advanced') score += 2;
  if (answers.level === 'beginner' && resource.difficulty === 'advanced') score -= 1;

  // 学习资源 / 字体 / 图标库不是主要推荐（除非全能需求）
  if (resource.category === 'learning' && answers.purpose !== 'all') score -= 2;
  if ((resource.category === 'fonts' || resource.category === 'icons') &&
      answers.purpose !== 'all' && answers.purpose !== 'presentation') score -= 1;

  return score;
}

function getRecommendations(answers) {
  const scorable = RESOURCES.filter(r =>
    r.category === 'software' || r.category === 'online'
  );
  const scored = scorable.map(r => ({ ...r, score: scoreResource(r, answers) }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3);
}

function buildWhyText(resource, answers) {
  const parts = [];
  if (answers.budget === 'free' && resource.free) parts.push('完全免费');
  if (answers.budget === 'low' && resource.pricing === 'freemium') parts.push('提供免费版本');
  if (resource.tags.includes(answers.purpose)) {
    const nameMap = { journal: '期刊图表', diagram: '流程示意图', presentation: '演示设计', all: '全能需求' };
    parts.push(`非常适合${nameMap[answers.purpose] || answers.purpose}`);
  }
  if (resource.difficulty === 'easy' && answers.level === 'beginner') parts.push('上手容易');
  if (resource.os === 'cross-platform') parts.push('支持跨平台使用');
  if (parts.length === 0) parts.push('综合匹配度较高');
  return parts.join('，');
}

function showQuizResults() {
  const questionsEl = document.getElementById('p07-quiz-questions');
  const resultsEl   = document.getElementById('p07-quiz-results');
  const listEl      = document.getElementById('p07-quiz-results-list');

  const recs    = getRecommendations(_quizState.answers);
  const maxScore = Math.max(recs[0]?.score || 1, 1);

  listEl.innerHTML = recs.map((r, i) => {
    const pct         = Math.max(20, Math.round((r.score / maxScore) * 100));
    const rankClass   = `p07-result-rank-${i + 1}`;
    const pricingText = r.pricing === 'free' ? '免费' : r.pricing === 'paid' ? '付费' : '免费增值';
    const why         = buildWhyText(r, _quizState.answers);
    return `
<div class="p07-result-card">
  <div class="p07-result-rank ${rankClass}">${i + 1}</div>
  <div class="p07-result-info">
    <div class="p07-result-name">${r.name}
      <span style="font-size:12px;font-weight:400;color:var(--text-on-dark-3);">(${pricingText})</span>
    </div>
    <div class="p07-result-why">${why}</div>
    <div class="p07-result-score-bar">
      <div class="p07-result-score-fill" style="width:${pct}%"></div>
    </div>
  </div>
</div>`.trim();
  }).join('\n');

  gsap.to(questionsEl, {
    opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      questionsEl.style.display = 'none';
      resultsEl.style.display = 'block';
      gsap.fromTo(resultsEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  });

  document.getElementById('p07-quiz-progress-fill').style.width  = '100%';
  document.getElementById('p07-quiz-progress-label').textContent = '完成';
}

function resetQuiz() {
  _quizState = { currentStep: 0, answers: {} };

  const questionsEl = document.getElementById('p07-quiz-questions');
  const resultsEl   = document.getElementById('p07-quiz-results');

  // 重置所有选中状态
  document.querySelectorAll('.p07-quiz-option').forEach(el => el.classList.remove('selected'));

  // 显示第一题，隐藏其余
  document.querySelectorAll('.p07-quiz-question').forEach((el, i) => {
    el.style.display  = i === 0 ? 'block' : 'none';
    el.style.opacity  = '1';
    el.style.transform = '';
  });

  resultsEl.style.display   = 'none';
  questionsEl.style.display = 'block';
  questionsEl.style.opacity = '1';

  document.getElementById('p07-quiz-progress-fill').style.width  = '0%';
  document.getElementById('p07-quiz-progress-label').textContent = '0 / 4';
}

function handleOptionClick(e) {
  const btn      = e.currentTarget;
  const question = btn.dataset.question;
  const value    = btn.dataset.value;
  const step     = _quizState.currentStep;

  // 标记选中
  document.getElementById(`p07-question-${step}`)
    .querySelectorAll('.p07-quiz-option')
    .forEach(el => el.classList.remove('selected'));
  btn.classList.add('selected');

  // 记录答案
  _quizState.answers[question] = value;

  const nextStep  = step + 1;
  const total     = QUIZ_QUESTIONS.length;

  document.getElementById('p07-quiz-progress-fill').style.width  = `${(nextStep / total) * 100}%`;
  document.getElementById('p07-quiz-progress-label').textContent = `${nextStep} / ${total}`;

  if (nextStep >= total) {
    setTimeout(() => showQuizResults(), 400);
  } else {
    const currentEl = document.getElementById(`p07-question-${step}`);
    const nextEl    = document.getElementById(`p07-question-${nextStep}`);

    nextEl.style.display  = 'block';
    nextEl.style.opacity  = '0';

    gsap.to(currentEl, {
      opacity: 0, x: -30, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        currentEl.style.display   = 'none';
        currentEl.style.opacity   = '1';
        currentEl.style.transform = '';
        gsap.fromTo(nextEl,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });

    _quizState.currentStep = nextStep;
  }
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  // ── Hero 动画 ──
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo('.p07-hero .hero-eyebrow',
    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo('.p07-hero .page-hero-title',
    { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo('.p07-hero .page-hero-sub',
    { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo('.p07-hero-tagline',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo('#p07-quicknav',
    { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo('.p07-scroll-hint',
    { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);

  // ── Hero quicknav ──
  document.querySelectorAll('#p07-quicknav .hero-quicknav__item').forEach(btn => {
    addEvt(btn, 'click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── S1 资源筛选 ──
  document.querySelectorAll('.p07-filter-tab').forEach(tab => {
    addEvt(tab, 'click', () => {
      document.querySelectorAll('.p07-filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      document.querySelectorAll('.p07-resource-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        if (show) {
          card.classList.remove('hidden');
          gsap.fromTo(card,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
          );
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ── S1 卡片滚动入场 ──
  fadeIn('#p07-s1 .section-header', { trigger: '#p07-s1' });
  document.querySelectorAll('.p07-resource-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      }
    );
  });

  // ── S2 Quiz 事件 ──
  document.querySelectorAll('.p07-quiz-option').forEach(btn => {
    addEvt(btn, 'click', handleOptionClick);
  });
  addEvt(document.getElementById('p07-quiz-restart'), 'click', resetQuiz);

  fadeIn('#p07-s2 .section-header', { trigger: '#p07-s2' });
  gsap.fromTo('.p07-quiz-wrapper',
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: '.p07-quiz-wrapper', start: 'top 85%', once: true }
    }
  );

  // ── S3 许可证卡片入场 ──
  fadeIn('#p07-s3 .section-header', { trigger: '#p07-s3' });
  document.querySelectorAll('.p07-license-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: { trigger: card, start: 'top 90%', once: true }
      }
    );
  });

  // ── Footer ──
  fadeIn('#p07-footer', { trigger: '#p07-footer' });
  addEvt(document.getElementById('p07-prev-btn'), 'click', () => navigateTo('m3-p6'));
  addEvt(document.getElementById('p07-next-btn'), 'click', () => navigateTo('m4-p1'));
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  killAll();
  _eventHandlers.forEach(({ el, type, fn, opts }) => el.removeEventListener(type, fn, opts));
  _eventHandlers = [];
  _quizState = { currentStep: 0, answers: {} };
}
