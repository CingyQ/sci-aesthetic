# TODO - 科研绘图指南（首页 + 4 模块架构）

## Phase 0: 项目骨架
- [x] 初始化 Vite 项目（vanilla JS）
- [x] 创建目录结构（src/styles, components, pages/m1-m4, utils）
- [x] 安装依赖：GSAP, D3.js, CodeMirror 6, SortableJS, Prism.js
- [x] vite.config.js（GitHub Pages base path）
- [x] CSS 变量系统（映射 design-spec.md 完整变量表）
- [x] hash 路由（#home / #m1-p1 ~ #m4-p8 / #ref）
- [x] npm run dev 可运行

## Phase 1: 设计系统 + 导航
- [x] variables.css — 浅色/深色/强调色/模块标识色/数据色/字号/间距/阴影/圆角/过渡
- [x] base.css — reset + typography（clamp 流体字号）+ scrollbar
- [x] components.css — Button / Tag / Code / Input / Table
- [x] layout.css — sidebar + main + section-light/dark
- [x] mobile.css — 底部 tab bar + 顶部导航栏 + 移动端覆盖样式
- [ ] animations.js — GSAP ScrollTrigger 封装（fadeIn/stickySteps/countUp/parallax/scaleReveal + matchMedia 移动端适配）
- [ ] 桌面端侧边栏导航（4 模块分组 + 页面列表 + 进度标记）
- [ ] 移动端底部 Tab Bar（5 tabs：首页/M1/M2/M3/M4）
- [ ] 移动端顶部页面导航栏（返回 + 标题 + 页码）
- [ ] Tablet 汉堡菜单 + 侧边栏覆盖层
- [ ] 横屏提示 Toast 组件
- [x] 样式展示页：所有组件 + 明暗交替 + 移动端布局验证

## Phase 2: 通用组件库
- [ ] ScrollAnimations.js — GSAP 封装 + matchMedia 移动端适配
- [ ] CodeEditor.js — CodeMirror 6 封装（R/Python 双语言，深色主题，onChange，移动端只读模式）
- [ ] ChartPreview.js — D3 SVG 画布封装（深色画布 + 坐标轴 + 响应式 viewBox）
- [ ] InteractiveCanvas.js — Canvas API 封装（HiDPI + Pointer Events + touchAction + 双指缩放）
- [ ] TabSwitcher.js — 带滑动指示器
- [ ] Modal.js — 全屏模态（ESC + 触摸关闭 + 过渡 + GSAP 入场）
- [ ] Accordion.js — 平滑展开（移动端工作坊面板）
- [ ] BeforeAfter.js — 拖拽/滑动对比（Pointer Events 触摸支持）
- [ ] Toast.js — 消息提示（含横屏提示）
- [ ] StickySteps.js — 粘性滚动步骤教学（移动端降级为普通滚动 + 固定标题）
- [ ] ColorInput.js — 颜色选择器（HEX/RGB/HSL 切换 + 精确输入 + 移动端全屏模态）
- [ ] CopyButton.js — 一键复制 + 反馈动画
- [ ] WorkshopLayout.js — 三面板布局（桌面网格 / 移动端手风琴）
- [ ] 组件 demo 页验证（桌面端 + 移动端）

## Phase 3: 首页 + 全局功能
- [ ] home Hero（深色背景 + 大标题动画 + 粒子/几何背景）
- [ ] 4 模块导航卡片（模块标识色 + 图标 + 简介 + 进度百分比）
- [ ] 学习路径推荐（按身份选择 → 推荐模块顺序）
- [ ] 统计 count-up（章节数/交互组件数/配色方案数/图表类型数）
- [ ] 全局搜索 Cmd+K（模态 + 模糊匹配 + 键盘导航）
- [ ] 学习进度系统（localStorage + 侧边栏/Tab Bar 进度标记）
- [ ] 页面过渡动画
- [ ] 移动端首页布局验证

## Phase 4: 模块一 — 科研数据可视化（m1-p1 ~ m1-p10）
- [ ] m1-p1 色彩理论基础（Canvas 色轮 + HSL 控制 + 色彩空间对比）
- [ ] m1-p2 色彩和谐与科研配色（5 种方案 + 60-30-10 + deltaE + 配色方案库浏览器 + 图表预览）
- [ ] m1-p3 配色生成器与数据配色（生成+微调+导出 + 连续/发散/定性 + 错误对比）
- [ ] m1-p4 色彩无障碍（WCAG 检测 + 色盲模拟 + 修复建议）
- [ ] m1-p5 图表选择指南（D3 决策树 + 20+ 图表全览 + 误用专题）
- [ ] m1-p6 ggplot2 图层语法与分面（粘性滚动逐层叠加 + 分面 Tab 切换 + CodeMirror + D3 预览）
- [ ] m1-p7 ggplot2 图表工作坊 — 先做 4 种验证（scatter/bar/line/boxplot）
- [ ] m1-p7 ggplot2 图表工作坊 — 剩余 8 种 + 移动端手风琴面板验证
- [ ] m1-p8 R 配色与出版级图表（包浏览器 + 主题定制器 + ggsave + patchwork）
- [ ] m1-p9 Python 可视化与数据叙事（matplotlib/seaborn + annotate 交互 + 叙事结构）
- [ ] m1-p10 科研绘图工作流与导出（时间线 + Nature 案例 + DPI 对比 + 期刊速查）

## Phase 5: 模块二 — AI 辅助科研绘图（m2-p1 ~ m2-p6）
- [ ] m2-p1 AI 工具全景（D3 决策树 + 工具矩阵 + 时间对比动画）
- [ ] m2-p2 Prompt 工程（评分器 + 效果对比 + 模板库）
- [ ] m2-p3 AI 矢量化（Trace 参数模拟器 + 兼容矩阵 + 陷阱）
- [ ] m2-p4 AI 伦理版权（期刊政策交互表 + 情景判断练习）
- [ ] m2-p5 AI 辅助科研流程图（工作流演示 + Prompt 模板 + 3 个完整案例）
- [ ] m2-p6 AI 绘图实战案例集（3 个端到端案例 + Before/After）

## Phase 6: 模块三 — 矢量绘图与设计（m3-p1 ~ m3-p7）
- [ ] m3-p1 矢量 vs 位图（缩放对比 + 格式决策树）
- [ ] m3-p2 Illustrator 工具（12 工具 SVG 动画）
- [ ] m3-p3 贝塞尔曲线（Canvas 编辑器 + 练习模式 + 移动端全屏适配）
- [ ] m3-p4 图表美化（8 组 Before/After + 5 步粘性滚动教学）
- [ ] m3-p5 SVG 编辑与优化（CodeMirror SVG 编辑器 + 实时渲染 + 优化策略）
- [ ] m3-p6 多面板 Figure 组合（拖拽排列 + 标注规范 + R/Python 代码）
- [ ] m3-p7 素材资源站（资源卡片 + 需求筛选 + 推荐器 + 许可证）

## Phase 7: 模块四 — 学术演示设计（m4-p1 ~ m4-p8）
- [ ] m4-p1 PPT 设计原则（格式塔 SVG + 视觉层次 + 信噪比）
- [ ] m4-p2 排版字体（Canvas 拖拽布局 + 字体推荐 + 行距演示 + 移动端预设模板）
- [ ] m4-p3 注意力与视觉流（热力图 + F/Z 模式）
- [ ] m4-p4 PPT 改造案例（8 组 Before/After + 粘性步骤讲解 + 用户练习打分）
- [ ] m4-p5 学术海报（布局模板 + 打印规范 + CMYK）
- [ ] m4-p6 Graphical Abstract（案例分析 + 元素库拖拽组合 + 期刊尺寸）
- [ ] m4-p7 科研信息图（4 种叙事模板 + 数据简化 + 社交媒体适配）
- [ ] m4-p8 科研动画（关键帧编辑器 + gganimate + PPT 动画）

## Phase 8: 速查手册 + 打磨
- [ ] ref 速查手册（图表/配色/导出/快捷键/期刊 5 类速查卡，可复制/下载 PDF）
- [ ] Vite 构建优化（code splitting + 按模块懒加载 + 压缩）
- [ ] 字体加载优化（font-display: swap + 子集化）
- [ ] GitHub Actions 部署
- [ ] SEO / Open Graph
- [ ] 移动端全面测试（iPhone SE / iPhone 14 / iPad / Android）
- [ ] 性能审计（Lighthouse 90+，移动端和桌面端分别测试）
- [ ] 触摸交互回归测试
