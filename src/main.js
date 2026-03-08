// 主入口 — 注册路由 + 导航 + 搜索 + 启动

import { registerRoute, initRouter } from './utils/router.js';
import { initNavigation } from './components/Navigation.js';
import { initSearch } from './components/SearchModal.js';

// 首页
registerRoute('home', () => import('./pages/home.js'));

// 模块一：科研数据可视化（10 页）
registerRoute('m1-p1', () => import('./pages/m1/p01-color-theory.js'));
registerRoute('m1-p2', () => import('./pages/m1/p02-color-harmony.js'));
registerRoute('m1-p3', () => import('./pages/m1/p03-palette-generator.js'));
registerRoute('m1-p4', () => import('./pages/m1/p04-accessibility.js'));
registerRoute('m1-p5', () => import('./pages/m1/p05-chart-selection.js'));
registerRoute('m1-p6', () => import('./pages/m1/p06-ggplot2-grammar.js'));
registerRoute('m1-p7', () => import('./pages/m1/p07-ggplot2-workshop.js'));
registerRoute('m1-p8', () => import('./pages/m1/p08-r-themes.js'));
registerRoute('m1-p9', () => import('./pages/m1/p09-python-viz.js'));
registerRoute('m1-p10', () => import('./pages/m1/p10-workflow-export.js'));

// 模块二：AI 辅助科研绘图（6 页）
registerRoute('m2-p1', () => import('./pages/m2/p01-ai-overview.js'));
registerRoute('m2-p2', () => import('./pages/m2/p02-prompt-engineering.js'));
registerRoute('m2-p3', () => import('./pages/m2/p03-vectorization.js'));
registerRoute('m2-p4', () => import('./pages/m2/p04-ethics.js'));
registerRoute('m2-p5', () => import('./pages/m2/p05-ai-diagrams.js'));
registerRoute('m2-p6', () => import('./pages/m2/p06-case-studies.js'));

// 模块三：矢量绘图与设计（7 页）
registerRoute('m3-p1', () => import('./pages/m3/p01-vector-vs-raster.js'));
registerRoute('m3-p2', () => import('./pages/m3/p02-illustrator-tools.js'));
registerRoute('m3-p3', () => import('./pages/m3/p03-bezier.js'));
registerRoute('m3-p4', () => import('./pages/m3/p04-chart-beautify.js'));
registerRoute('m3-p5', () => import('./pages/m3/p05-svg-editing.js'));
registerRoute('m3-p6', () => import('./pages/m3/p06-multi-panel.js'));
registerRoute('m3-p7', () => import('./pages/m3/p07-resources.js'));

// 模块四：学术演示设计（8 页）
registerRoute('m4-p1', () => import('./pages/m4/p01-ppt-principles.js'));
registerRoute('m4-p2', () => import('./pages/m4/p02-typography.js'));
registerRoute('m4-p3', () => import('./pages/m4/p03-attention-flow.js'));
registerRoute('m4-p4', () => import('./pages/m4/p04-ppt-makeover.js'));
registerRoute('m4-p5', () => import('./pages/m4/p05-poster.js'));
registerRoute('m4-p6', () => import('./pages/m4/p06-graphical-abstract.js'));
registerRoute('m4-p7', () => import('./pages/m4/p07-infographics.js'));
registerRoute('m4-p8', () => import('./pages/m4/p08-animation.js'));

// 速查手册
registerRoute('ref', () => import('./pages/ref.js'));

// 组件 demo 页
registerRoute('component-demo', () => import('./pages/component-demo.js'));

// 初始化
initNavigation();
initSearch();
initRouter();
