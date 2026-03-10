# TODO - SciAesthetic 科研美学（首页 + 4 模块百科架构）

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
- [x] animations.js — GSAP ScrollTrigger 封装（fadeIn/stickySteps/countUp/parallax/scaleReveal + matchMedia 移动端适配）
- [x] 桌面端侧边栏导航（4 模块分组 + 页面列表）
- [x] 移动端底部 Tab Bar（5 tabs：首页/M1/M2/M3/M4）
- [x] 移动端顶部页面导航栏（返回 + 标题 + 页码）
- [x] Tablet 汉堡菜单 + 侧边栏覆盖层
- [x] 横屏提示 Toast 组件
- [x] 样式展示页：所有组件 + 明暗交替 + 移动端布局验证

## Phase 2: 通用组件库
- [x] ScrollAnimations.js — GSAP 封装 + matchMedia 移动端适配
- [x] CodeEditor.js — CodeMirror 6 封装（R/Python 双语言，深色主题，onChange，移动端只读模式）
- [x] ChartPreview.js — D3 SVG 画布封装（深色画布 + 坐标轴 + 响应式 viewBox）
- [x] InteractiveCanvas.js — Canvas API 封装（HiDPI + Pointer Events + touchAction + 双指缩放）
- [x] TabSwitcher.js — 带滑动指示器
- [x] Modal.js — 全屏模态（ESC + 触摸关闭 + 过渡 + GSAP 入场）
- [x] Accordion.js — 平滑展开（移动端工作坊面板）
- [x] BeforeAfter.js — 拖拽/滑动对比（Pointer Events 触摸支持）
- [x] Toast.js — 消息提示（含横屏提示）
- [x] StickySteps.js — 粘性滚动步骤演示（移动端降级为普通滚动 + 固定标题）
- [x] ColorInput.js — 颜色选择器（HEX/RGB/HSL 切换 + 精确输入 + 移动端全屏模态）
- [x] CopyButton.js — 一键复制 + 反馈动画
- [x] WorkshopLayout.js — 三面板布局（桌面网格 / 移动端手风琴）
- [x] 组件 demo 页验证（桌面端 + 移动端）

## Phase 3: 首页 + 全局功能
- [x] home Hero（深色背景 + 大标题动画 + Canvas 粒子网络背景，展示标题和标语）
- [x] 4 模块导航卡片（模块标识色 + 图标 + 简介 + 进度条，交错纵向排列）
- [x] 统计 count-up（词条数/交互组件数/配色方案数/图表类型数）
- [x] 全局搜索 Cmd+K / Ctrl+K（模态 + 模糊匹配 + 键盘上下选择 + Enter 跳转）
- [x] 页面过渡动画（fade out/in，路由变化时平滑切换）
- [x] 学习进度（localStorage 存储已访问页面，侧边栏和首页模块卡片显示进度百分比）
- [x] 学习路径推荐（选择身份后推荐模块顺序，带动画过渡）
- [x] 移动端首页布局适配（模块卡片纵向堆叠、统计 2×2 网格、角色选择器自适应）

## Phase 4: 模块一 — 科研数据可视化（m1-p1 ~ m1-p10）
- [x] m1-p1 色彩理论基础（Canvas 色轮 + HSL 控制 + 加减色混色交互）
- [x] m1-p2 色彩和谐与科研配色（5 种方案 + 60-30-10 + deltaE + 配色方案库浏览器 + 图表预览）
- [x] m1-p3 配色生成器与数据配色（生成+微调+导出 + 连续/发散/定性 + 错误对比）
- [x] m1-p4 色彩无障碍（WCAG 检测 + 色盲模拟 Brettel/Machado + 修复建议）
- [x] m1-p5 图表选择指南（D3 交互式决策树 + 20+ 图表全览按 5 组分类 + 列表+预览浏览器布局 + 6 类饼图误用专题）
- [x] m1-p6 ggplot2 图层语法与分面（JS-sticky 逐层叠加 data→aes→geom→scale→theme + 分面 Tab 切换 + 坐标变换 3tab + 自定义坐标轴参数控制器）
      ↳ 含 Bug Fix：CSS sticky → transform:translateY JS 模拟；移动端改为堆叠卡片自然滚动
- [x] m1-p7 ggplot2 图表工作坊 — 先做 4 种验证（scatter/bar/line/boxplot，WorkshopLayout 三面板 + 移动端手风琴）
- [x] m1-p7 ggplot2 图表工作坊 — 剩余 8 种（violin/histogram/density/heatmap/area/errorbar/lollipop/ridgeline）
- [x] **Bug Fix（m1-p2~p7）**：Hero 版式统一（eyebrow 英文 Module 0X/Page 0X + 英文副标题 + 中文 tagline）；各页独特动态光晕（CSS keyframe 漂移动画）；m1-p7 gallery padding 压缩；12 种图表 R 代码加示例数据
- [x] **Bug Fix（m1-p1~p7）**：统一 hero eyebrow 样式（全局 `.hero-eyebrow` 类）；p01 补加「↓ 向下探索」；p07 gallery SVG 图标（IntersectionObserver 取代 GSAP 避免闪白）；移动端 scroll hint 移入 flex 流（quicknav 下方，不再 position:absolute）；p07 移动端三 tab 布局
- [x] **统一 Footer CTA（m1-p1~p7）**：新增全局 `.page-footer-cta` / `.page-footer-num` / `.page-footer-quote` / `.page-footer-desc` / `.page-footer-nav` CSS；所有页面末尾统一风格（纯黑背景 + 页码 + 金句 + 标准按钮）；修复 p03 next/prev 按钮顺序颠倒；修复 p03/p05 中「无障碍色彩」→「色彩与阅读无障碍」对齐 p04 实际标题
- [x] m1-p8 R 配色与出版级图表（配色包浏览器列表+预览 + 主题定制器滑块+D3+theme()代码 + ggsave 期刊代码生成器 + patchwork 4 种布局）
- [x] m1-p9 Python 可视化与数据叙事（matplotlib 层次图解 + seaborn 10 种图表参数面板 + matplotlib vs ggplot2 对照 + annotate Canvas 拖拽 + 叙事 4 种方法动画）
- [x] m1-p10 科研绘图工作流与导出（6 步粘性时间线 + 格式原理动画 + DPI 对比器 + 分辨率计算器 + 期刊速查）
      ↳ Debug：window.gsap → import from ScrollAnimations.js（hero invisible fix）；scroll handler → rAF ticking（sticky jitter fix）；countUp zero-guard；hero stats 移至正文 section

## Phase 4.5: M1 审计与统一（Audit & Polish）
- [x] Hero 统一：所有 10 页使用 flex-col-center wrapper、opacity:0、统一 GSAP timeline
- [x] P10 删除 hero stats 数字展示（不属于 hero 模板）
- [x] P08 添加 section-dark class 和 scroll-hint
- [x] Footer CTA 统一：quote 引号改 CSS、按钮标签改页面标题、P05 onclick→addEventListener
- [x] CSS 清理：删除 48 行未使用 .m1-section-title 等、P04 语义色变量化
- [x] 动画统一：6 页补 scroll-hint 动画、P08 subtitle opacity、删除 dead import
- [x] P10 修复：gsap 从 ScrollAnimations.js 导入（window.gsap 导致 hero 不可见）
- [x] Git 历史：移除 28 个 commit 的 Co-Authored-By、force push
- [x] 文档更新：CLAUDE.md / design-spec.md / commands.md / todo.md 同步审计结论
- [x] P10 debug：三个 p10 专属 fix（window.gsap / rAF ticking / countUp zero guard）在审计过程中识别并修复
- [x] 规范同步：CLAUDE.md / design-spec.md / commands.md 补充 rAF ticking 模式、countUp 零值保护、Hero 不放统计数字三条新规范

## Phase 5: 模块二 — AI 辅助科研绘图（m2-p1 ~ m2-p6）工作流驱动，环境科学主题
> 先完成所有页面的交互、功能模块和布局，AI 生成图位置用占位符。
> Phase 5.5 统一使用 Nano Banana 生成素材后替换占位符。
- [x] m2-p1 AI 与科研绘图新范式（D3 双时间线传统vsAI 工作流对比 + 场景判断器6-8题 + 能力矩阵按任务分类 + 5场景切换展示组件[占位符]）
- [x] m2-p2 Prompt 的艺术（CDTF 粘性滚动解剖 + 3 组好差 BeforeAfter 对比[占位符] + 4 步迭代时间线[占位符] + Prompt 模板库列表+预览 CopyButton）
- [x] m2-p3 AI 输出后处理（5 问题卡片滚动[占位符] + 矢量化三路径 Tab + Image Trace 4 滑块模拟器 + 5 步精修 StickySteps BeforeAfter[占位符]）
- [x] m2-p4 AI 辅助科研图解（5 种图解类型学 D3 + Mermaid 文生图解 3 场景演示 + AI+精修 5 步协作 StickySteps[占位符] + 5 种图解切换展示[占位符]）
- [x] m2-p5 伦理版权学术规范（期刊政策交互对比表✅⚠️❌ + 5 层合规光谱 D3 + 8-10 题情景判断练习 + AI 声明模板生成器中英文 CopyButton）
- [x] m2-p6 端到端实战三案例（案例选择器 + 水污染GA StickySteps[占位符] + 微塑料迁移方法图 Mermaid+AI[占位符] + 碳循环综述概念图[占位符] + 经验总结对比表）

## Phase 5.1: M2 Bug Fix（移动端适配 + Mermaid + 矩阵 + 折叠框）

- [x] p01：工具矩阵副标题清理 + 补充 Nano Banana
- [x] p02：CDTF 粘性左面板顶部偏移修复（80px）
- [x] p04：Mermaid 图 max-height + 移除 max-width 限制，移动端可滚动
- [x] p05：期刊政策表移动端全宽 + 折叠框宽度稳定
- [x] p06：Mermaid 流程图 max-height + GA 占位符改为 16/9
- [x] p03：举一反三检查同类问题 — 已无需修改

## Phase 5.5: M2 素材生成与替换（Nano Banana 统一批次）
- [ ] 用 Nano Banana (Gemini on OpenRouter) 按 content-outline.md 中的素材规划批量生成 ~53 张环境科学主题图
- [ ] 替换 m2-p1 ~ m2-p6 中所有占位符为实际 AI 生成图
- [ ] 每张图保存对应 prompt 文本（存入 assets 或 md 备注）
- [ ] 视觉一致性检查：风格/配色/尺寸统一，不合格的重新生成

## Phase 6: 模块三 — 矢量绘图与设计（m3-p1 ~ m3-p7）
- [ ] m3-p1 矢量 vs 位图（Canvas+SVG 缩放对比到 800% + D3 格式选择决策树 + 文件大小vs质量权衡）
- [ ] m3-p2 Illustrator 工具（12 工具列表+预览布局 + SVG 动画演示操作过程 + 快捷键 + 3 个工具链工作流）
- [ ] m3-p3 贝塞尔曲线（InteractiveCanvas 编辑器拖拽锚点/手柄 + 挑战模式匹配度 + 移动端全屏+44px 触控点）
- [ ] m3-p4 图表美化（8 组 BeforeAfter 对比 + 5 步 StickySteps 渐进美化 + SVG 逐步变化 + R/Python 代码同步）
- [ ] m3-p5 SVG 编辑与优化（CodeMirror SVG 编辑+实时渲染预览 + 基础语法教学可编辑示例 + 优化前后文件大小对比）
- [ ] m3-p6 多面板 Figure 组合（SortableJS 拖拽排列面板 + Nature 标注规范 + R patchwork + Python subplot 双版本代码）
- [ ] m3-p7 素材资源站（资源卡片按类别分组+筛选 + 3 步问答推荐器 + 许可证类型说明）

## Phase 7: 模块四 — 学术演示设计（m4-p1 ~ m4-p8）
- [ ] m4-p1 PPT 设计原则（格式塔 5 组 SVG 拖拽交互 + 视觉层次 4 维滑块/移动端预设 + 信噪比 5 级渐进简化）
- [ ] m4-p2 排版字体（InteractiveCanvas 拖拽布局+网格吸附+对齐辅助线 + 字体搭配推荐器 + 行距字距实时调参 + 移动端预设模板）
- [ ] m4-p3 注意力与视觉流（Canvas 注意力热力图+评分 + F/Z 型 SVG 动画路径 + 视觉焦点 4 种控制技巧）
- [ ] m4-p4 PPT 改造案例（8 组 BeforeAfter 列表+预览 + StickySteps 3-5 步讲解 + Canvas 互动拖拽评分）
- [ ] m4-p5 学术海报（3-4 种布局模板列表+全屏预览 + 海报 vs PPT 差异 + CMYK vs RGB 色差演示 + 打印规范）
- [ ] m4-p6 Graphical Abstract（5 例分析 D3 雷达图评分 + 元素库拖拽组合画布 + 期刊尺寸速查）
- [ ] m4-p7 科研信息图（4 种叙事结构 SVG 模板可交互预览 + 数据简化技巧 + 社交媒体多平台裁切预览）
- [ ] m4-p8 科研动画（Canvas 关键帧编辑器+拖动+实时预览 + gganimate CodeMirror+逐帧 SVG 模拟 + PPT 动画技巧）

## Phase 8: 速查手册 + 打磨
- [ ] ref 速查手册（TabSwitcher 5 类速查卡 + CopyButton 一键复制 + @media print PDF 导出 + 全局导航可访问）
- [ ] Vite 构建优化（按模块 code splitting m1/m2/m3/m4 懒加载 + CSS/JS minify + 图片优化）
- [ ] 字体加载优化（font-display: swap + 中文字体子集化 Noto Sans SC/Noto Serif SC）
- [ ] GitHub Actions 自动部署（push main → build → gh-pages）
- [ ] SEO / Open Graph（meta title/description + og:title/og:description/og:image）
- [ ] 响应式逐页检查（375px/390px/768px/1024px/1440px 五级断点全页面验证）
- [ ] 性能审计（Lighthouse 桌面端 90+ / 移动端 85+ + 修复问题）
- [ ] 交互组件回归测试（Canvas 触摸/BeforeAfter 滑动/CodeMirror 只读+编辑/手风琴/Tab 横滚/滑块触控≥44px）

---

## 进度总览

| 阶段 | 状态 | 备注 |
|------|------|------|
| Phase 0 项目骨架 | ✅ 完成 | |
| Phase 1 设计系统 | ✅ 完成 | |
| Phase 2 组件库 | ✅ 完成 | |
| Phase 3 首页 | ✅ 完成 | |
| Phase 4 模块一 | ✅ 10/10 | m1-p1~p10 全部完成 |
| Phase 4.5 M1 审计 | ✅ 完成 | Hero/Footer/CSS/动画统一 + 文档更新 |
| Phase 5 模块二 | ✅ 完成 | 6/6 页完成，占位符待 Phase 5.5 替换 |
| Phase 5.1 M2 Bug Fix | ✅ 完成 | 移动端适配 + Mermaid 优化 + 工具矩阵补充 |
| Phase 5.5 M2 素材 | ⏳ 待开始 | Nano Banana 批量生成 ~53 张环境科学图 |
| Phase 6 模块三 | ⏳ 待开始 | |
| Phase 7 模块四 | ⏳ 待开始 | |
| Phase 8 收尾 | ⏳ 待开始 | |

**下一步**：Phase 6 — m3-p1~m3-p7 矢量绘图与设计（可选：先执行 Phase 5.5 AI 素材生成）
