# SciAesthetic 执行命令计划

> **在 Claude Code 中逐条执行。每条完成后确认无报错再执行下一条。**
>
> 所有页面内容细节见 `content-outline.md`，技术规范见 `CLAUDE.md`，CSS 变量和组件模板见 `design-spec.md`。
>
> **当前进度**：Phase 0–3 ✅ | m1-p1 ~ m1-p6 ✅（含 sticky bug fix） | 从 **Step 3（m1-p7）** 开始执行。

---

## ⚠️ 每一步的通用要求（必读）

以下规范在每一步中**自动生效**，不再逐步重复：

### 规范文件
- 开始任何 Step 前，先读取 `CLAUDE.md`、`design-spec.md`、`content-outline.md` 三份规范文件

### 设计规范
- 请使用 **frontend-design skill** 来设计页面视觉（在 prompt 中触发）
- Apple.com 产品页审美标杆：全屏叙事节奏、超大排版、明暗交替、极简配色
- 每个页面第一个 section（Hero）必须用 `section-hero-full` class，所有分辨率 100vh/100dvh
- Hero 底部包含 `.hero-quicknav` 快捷导航按钮，GSAP 延迟入场
- 深色段放交互组件、浅色段放理论内容、代码编辑器始终深色
- 禁止卡片网格平铺、gradient blob、backdrop-filter 满屏、静态截图替代交互
- 彩色只出现在数据区域（配色展示/图表预览/色轮），主体黑白灰 + 强调色 #7EC8E3
- 代码块必须 `white-space: pre-wrap`，禁止 `white-space: pre`

### 响应式适配（★★★）
- **五级断点**：>1200px（Desktop）/ 1024-1200px（Laptop）/ 768-1024px（Tablet）/ 480-768px（Mobile）/ <480px（Small）
- 移动端 section `min-height: auto`，Hero 保持 `100vh/100dvh`
- 所有 `section[id]` 设置 `scroll-margin-top: 56px`（移动端顶部栏不遮挡锚点）
- 按钮/可交互元素最小触控尺寸 **44×44px**
- 滑块移动端 thumb 放大到 24px，`min-height: 32px`
- Tab 切换器移动端 `overflow-x: auto` + 隐藏滚动条
- 双栏布局 ≤900px 转单列（`flex-direction: column`）
- 代码块移动端字号 13px + `pre-wrap` + `word-wrap: break-word`
- 图片/SVG `max-width: 100%; height: auto`
- 列表+预览布局：桌面端左列表+右 sticky 预览；≤900px 纵向堆叠，列表限高 400px
- 工作坊三面板：桌面端 CSS Grid（280px/1fr/360px）；移动端垂直手风琴折叠

### GSAP 动画
- 滚动动画必须用 GSAP ScrollTrigger，不用 CSS-only IntersectionObserver
- 使用 `ScrollTrigger.matchMedia()` 为移动端设置简化参数（减少 y 偏移、缩短 stagger、移动端不 pin）
- `destroy()` 必须调用 `ScrollTrigger.getAll().forEach(t => t.kill())`

### Canvas / D3
- Canvas 使用 Pointer Events API（`pointerdown/pointermove/pointerup`），设置 `touch-action: none`
- Canvas HiDPI 适配：`devicePixelRatio` 缩放
- D3 SVG 使用 `viewBox` + `preserveAspectRatio: xMidYMid meet` 实现响应式
- 图表深色画布背景 `#1a1a2e`

### CodeMirror
- 移动端 `window.innerWidth < 768` 时默认只读 + 显示"点击编辑"按钮
- 始终 oneDark 深色主题

### 质量检查
- 所有交互完整可用，**不允许 placeholder**
- 控制台零报错
- 完成后用 Chrome DevTools 在 375px / 390px / 768px / 1440px 宽度下验证
- 每步完成后更新 `todo.md` 勾选状态并 git commit

---

## Step 1：m1-p5 图表选择指南

```
读取规范文件，开发 m1-p5 页面。
请使用 frontend-design skill 来设计页面视觉。

核心交互 1 — D3 交互式决策树：
- 用户逐步回答问题（数据类型 → 变量数 → 关系类型）
- 树状图实时展开分支，GSAP 动画过渡
- 最终推荐图表类型 + 适用说明
- 移动端：决策树纵向展开，触摸友好（按钮 ≥44px）

核心交互 2 — 图表类型全览（20+ 种）：
- 按用途分 5 组：比较/分布/关系/组成/趋势
- 每种用 D3 绘制缩略 SVG 预览
- 布局：列表+预览浏览器（桌面端左分类列表+右 D3 示例预览；≤900px 纵向堆叠）
- 点击图表展开详情（适用场景 + 好例/坏例对比）
- 不要用卡片网格，用纵向分组 + 滚动渐入

核心交互 3 — "我应该用饼图吗？" 误用专题：
- 常见误用案例 + 正确替代方案
- Before/After 对比

明暗交替：Hero（深色）→ 决策树（浅色）→ 图表全览（深色，让 SVG 预览更醒目）→ 误用专题（浅色）→ Footer CTA（深色）

完成后更新 todo.md 并 git commit。
```

## Step 2：m1-p6 ggplot2 图层语法与分面 ✅ 已完成

> **实现备注**（供后续参考）：
> - **sticky 方案**：CSS `position:sticky` 在本项目中失效（`base.css` 的 `overflow-x:hidden` 创建了 BFC 拦截 sticky）。实际使用 `transform:translateY()` + `window.scroll` 事件模拟：`translateY = clamp(0, scrolledPast, bodyHeight - panelHeight)`。
> - **移动端步骤交互**：放弃了"数字按钮切换"方案，改为 5 张独立堆叠卡片（各含代码+D3图表+说明），用户自然向下滚动即可，无需任何点击。
> - **步骤检测**：`stepIdx = Math.floor(scrolledPast / window.innerHeight)`，在每个 100vh 边界精确切换。

```
读取规范文件，开发 m1-p6 页面。
请使用 frontend-design skill 来设计页面视觉。

核心交互 1 — 粘性滚动图层叠加教学（JS sticky，非 CSS sticky）：
- ⚠️ 不要用 CSS position:sticky，用 transform:translateY + window scroll 模拟
- 桌面端：左列（代码+D3图表）随 scroll 更新 transform 保持视口内，右列步骤描述正常滚动
- 5 个步骤：data → aes → geom → scale → theme
- 每加一层，代码高亮新增行 + D3 图表实时更新
- 移动端：5 张堆叠卡片，各含完整代码+图表+说明，自然滚动

核心交互 2 — 分面演示：
- TabSwitcher 切换 none / facet_wrap / facet_grid 三种模式
- SVG 和 R 代码同步变化

核心交互 3 — 坐标变换：
- 3 个 tab：笛卡尔 / flip / polar
- 同一数据不同呈现，D3 SVG 实时切换

核心交互 4 — 自定义坐标轴：
- breaks/labels/limits 参数控制器 + D3 实时预览

明暗交替：Hero（深色）→ 图层叠加（浅色）→ 分面（深色）→ 坐标变换（浅色）→ 坐标轴（深色）→ Footer CTA（深色）

完成后更新 todo.md 并 git commit。
```

## Step 3：m1-p7 图表工作坊（第一批 4 种）⚠️ 全站最复杂页面

```
读取规范文件，开发 m1-p7 的第一批：scatter / bar / line / boxplot。
请使用 frontend-design skill 来设计页面视觉。

⚠️ 这是全站最复杂的页面，先做 4 种验证架构可行性。

页面入口 — 图表类型网格：
- 每种有 D3 绘制的缩略 SVG + 名称 + 适用数据标签
- 点击进入全屏工作坊

全屏工作坊 — 使用 WorkshopLayout 组件：
- 左面板：该图表的专属参数控件
  - scatter：点形状/大小/抖动/透明度/回归线开关
  - bar：排列方式（grouped/stacked/dodged）/柱宽/误差线开关
  - line：线型/粗细/标记点/平滑度
  - boxplot：箱宽/异常值显示/须线样式/填充透明度
- 中面板：D3 SVG 实时预览，参数变化 <16ms 反映到图表
- 右面板：CodeMirror R 代码，参数变化时代码同步更新，用户也可编辑
- 底部：一键导出完整 R 脚本（CopyButton）

响应式重点：
- 桌面端：CSS Grid（280px / 1fr / 360px）
- Tablet：Grid（240px / 1fr），代码面板折叠到底部
- 移动端：WorkshopLayout 手风琴模式，一次只展开一个面板
- 参数控件移动端 stepper/slider 触控适配（44px 最小触摸区）
- 验证手风琴展开/折叠动画流畅

完成后更新 todo.md 并 git commit。
```

## Step 4：m1-p7 图表工作坊（剩余 8 种）

```
读取规范文件，继续 m1-p7 剩余 8 种图表：
violin / histogram / density / heatmap / area / errorbar / lollipop / ridgeline

复用 Step 3 建好的 WorkshopLayout 框架，每种图表只需定义：
1. 专属参数控件列表（注意每种图表的特性）
   - violin：带宽/裁剪/分半显示
   - histogram：bin 数/边界处理/密度vs频率
   - density：带宽/核函数/填充透明度
   - heatmap：颜色映射方案/区间数/标签显示
   - area：堆叠方式/透明度/基线
   - errorbar：误差类型(SE/SD/CI)/线帽宽度
   - lollipop：点大小/线粗细/排序方式
   - ridgeline：重叠度/带宽/填充透明度
2. D3 渲染函数
3. R 代码生成模板
4. 示例数据集

heatmap 需要颜色映射，ridgeline 需要多组数据。
移动端手风琴模式下验证每种图表的参数面板和预览。

完成后更新 todo.md 并 git commit。
```

## Step 5：m1-p8 R 配色与出版级图表

```
读取规范文件，开发 m1-p8 页面。
请使用 frontend-design skill 来设计页面视觉。

核心交互 1 — 配色包浏览器：
- 列表+预览布局：桌面端左侧色板列表+右侧 sticky 图表预览；≤900px 纵向堆叠
- 5 个包：RColorBrewer / viridis / ggsci / wesanderson / MetBrewer
- 每个包的全系列色板用色块展示
- 点击任一色板 → 右侧图表预览即时切换该配色
- 图表预览白色背景，多图表类型可切换
- scale_color vs scale_fill 使用场景说明

核心交互 2 — 主题定制器：
- 桌面端左参数面板+右预览；移动端纵向堆叠或手风琴折叠
- 滑块/选择器控制：字号/颜色/网格线开关/背景色/坐标轴样式
- D3 SVG 实时更新
- 下方 CodeMirror 显示对应的 theme() R 代码

核心交互 3 — ggsave 代码生成器：
- 选择期刊（Nature/Science/Cell/PNAS/Lancet）→ 自动填充宽度/高度/DPI/格式
- 生成完整 ggsave() 代码 + CopyButton

核心交互 4 — patchwork 多面板布局：
- 4 种预设预览：A|B, A/B, (A|B)/C, (A+B)/(C+D)
- 点击切换，D3 SVG 示意图 + R 代码同步更新

完成后更新 todo.md 并 git commit。
```

## Step 6：m1-p9 Python 可视化与数据叙事

```
读取规范文件，开发 m1-p9 页面。
请使用 frontend-design skill 来设计页面视觉。

核心交互 1 — matplotlib 层次结构图解：
- D3 绘制 Figure/Axes/Artist 层次关系交互图
- 点击节点展开说明

核心交互 2 — seaborn 速查：
- 10 种常用图表的参数面板 + CodeMirror Python 代码生成
- 列表+预览布局：桌面端左参数+右预览；≤900px 纵向堆叠

核心交互 3 — matplotlib vs ggplot2 对照表：
- 桌面端双栏并排对比（左 Python 右 R）
- 移动端 Tab 切换 R/Python 代码

核心交互 4 — annotate 交互演示：
- Canvas 上用户可拖拽箭头/文字/框到图表上定位
- Pointer Events 实现，移动端触控友好

核心交互 5 — 图表叙事 4 种方法：
- 颜色对比突出 / 标注引导 / 灰化非重点 / 分步揭示
- 每种做一个 D3/Canvas 动画演示
- 好/差标注对比

完成后更新 todo.md 并 git commit。
```

## Step 7：m1-p10 工作流与导出

```
读取规范文件，开发 m1-p10 页面。
请使用 frontend-design skill 来设计页面视觉。

核心交互 1 — 工作流时间线（粘性滚动）：
- StickySteps 演示 6 个步骤：数据整理 → 选图表 → 初稿 → 配色 → 标注 → 导出
- 每步有说明 + 代码片段 + 常见陷阱提示
- 移动端缩短 pin 距离

核心交互 2 — 格式对比（SVG/PDF/PNG/TIFF/EPS）：
- 每种用简短动画演示内部原理（矢量描述形状 vs 位图存储像素）

核心交互 3 — DPI 对比器：
- 同一张图 72/150/300/600 DPI 四格并排
- BeforeAfter 滑块看差异
- 移动端：Tab 切换或纵向堆叠

核心交互 4 — 分辨率计算器：
- 输入宽(cm) × 高(cm) + DPI → 实时计算像素数和估算文件大小
- `inputmode="decimal"` 移动端数字键盘

核心交互 5 — 期刊速查：
- 输入或选择期刊名 → 显示该期刊的图片规格（宽度/DPI/格式/色彩模式/文件大小限制）
- 移动端友好的下拉选择

完成后更新 todo.md 并 git commit。
```

## Step 8：m2-p1 AI 工具全景 + m2-p2 Prompt 工程

```
读取规范文件，开发 m2-p1 和 m2-p2 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m2-p1 AI 工具全景 ===

核心交互 1 — AI 工具决策树：
- 交互式：你要做什么？→ 推荐工具 + 理由
- D3 绘制，与 m1-p5 类似但内容不同

核心交互 2 — 工具矩阵：
- Midjourney/DALL-E/Stable Diffusion/BioRender AI/GPT-4V/Gemini
- 桌面端：完整矩阵表格（可排序/筛选）
- 移动端：首列固定+水平滚动，或卡片式逐个展示

核心交互 3 — 传统 vs AI 工作流时间对比：
- 动画柱状图

核心交互 4 — 5 个合理应用场景：
- 示意图/流程图/概念图/配色建议/布局草图

=== m2-p2 Prompt 工程 ===

核心交互 1 — Prompt 质量评分器（★ 核心亮点）：
- 用户输入 Prompt 文本
- 实时分析结构完整性（主体/风格/细节/参数）
- 给出 0-100 分 + 每个维度的评分条 + 具体改进建议
- D3 或 CSS 绘制评分可视化

核心交互 2 — 好/差 Prompt 对比：
- 3 组 Before/After
- 桌面端并排；移动端上下堆叠

核心交互 3 — Prompt 模板库：
- 列表+预览布局：按科研场景分类（流程图/示意图/结构图/信息图）
- 每个模板可一键复制（CopyButton）

完成后更新 todo.md 并 git commit。
```

## Step 9：m2-p3 矢量化 + m2-p4 伦理

```
读取规范文件，开发 m2-p3 和 m2-p4 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m2-p3 AI 图片矢量化 ===

核心交互 1 — Image Trace 参数模拟器：
- 用一张示例位图
- 4 个滑块（阈值/路径精度/角度/噪声）→ SVG 预览实时变化
- Canvas 模拟矢量化过程
- 移动端滑块触控适配（thumb 24px，min-height 32px）

核心交互 2 — 矢量化前后对比：
- BeforeAfter 组件

核心交互 3 — 格式兼容性矩阵：
- 哪些软件能打开哪些矢量格式
- 移动端首列固定+水平滚动

核心交互 4 — 3 个常见陷阱 + 解决方案

=== m2-p4 AI 伦理与版权 ===

核心交互 1 — 期刊政策表：
- Nature/Science/Cell/Lancet/PNAS/JAMA 等 AI 图片政策
- 桌面端：完整对比表格（可按严格程度排序）
- 移动端：首列固定+水平滚动

核心交互 2 — 情景判断练习：
- 给出场景描述
- 用户选择"可以用/不可以用"
- 系统给出正确答案和解释 + 动画反馈

核心交互 3 — AI 声明模板生成器：
- 选择期刊 + 使用方式 → 生成声明文本 + CopyButton

完成后更新 todo.md 并 git commit。
```

## Step 10：m2-p5 AI 流程图 + m2-p6 案例集

```
读取规范文件，开发 m2-p5 和 m2-p6 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m2-p5 AI 辅助科研流程图设计 ===

核心交互 1 — 工作流粘性滚动演示：
- StickySteps 5 个步骤：文字描述 → AI 草图 → 精修 → 矢量化 → 终稿
- 移动端缩短 pin 距离

核心交互 2 — 流程图类型总览：
- 实验流程/技术路线/分子机制/信号通路/数据分析管线
- 每种类型提供专用 Prompt 模板（CopyButton）

核心交互 3 — 3 个完整案例：
- 从文字描述到最终出版级流程图的全过程
- BeforeAfter 对比

=== m2-p6 AI 绘图实战案例集 ===

核心交互 — 3 个端到端案例：
- 案例 1：论文 Graphical Abstract
- 案例 2：实验方法示意图
- 案例 3：综述文章概念图
- 每个案例：
  - StickySteps 分步讲解（需求分析 → 工具选择 → Prompt 迭代 → 矢量化 → 精修 → 导出）
  - BeforeAfter 组件展示最终效果
  - 可复制的完整 Prompt（CopyButton）
  - 常见错误与修正方案

完成后更新 todo.md 并 git commit。
```

## Step 11：m3-p1 矢量 vs 位图 + m3-p2 Illustrator 工具

```
读取规范文件，开发 m3-p1 和 m3-p2 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m3-p1 矢量 vs 位图 ===

核心交互 1 — 缩放对比演示（★ 核心）：
- 同一图形并排：Canvas 绘制位图版 + SVG 绘制矢量版
- 滑块缩放到 800%，清晰看到锯齿 vs 平滑
- 移动端：上下堆叠，手指拖拽滑块

核心交互 2 — 格式选择流程图：
- 交互式 D3 决策树

核心交互 3 — 文件大小 vs 质量权衡：
- 桌面端并排对比；移动端上下堆叠

=== m3-p2 Illustrator 核心工具 ===

核心交互 — 12 个工具演示：
- 列表+预览布局：桌面端左侧工具列表+右侧 SVG 动画演示
- 移动端：纵向卡片列表，点击展开详情
- 点击后 GSAP 动画展开，用 SVG 动画演示该工具的操作过程
  例如：钢笔工具画曲线、直接选择工具移动锚点
- 每个工具标注快捷键
- 科研场景用例
- 工具组合工作流：3 个常见任务的工具链演示

不要用卡片网格！用可点击展开的列表。

完成后更新 todo.md 并 git commit。
```

## Step 12：m3-p3 贝塞尔 + m3-p4 图表美化

```
读取规范文件，开发 m3-p3 和 m3-p4 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m3-p3 贝塞尔曲线与路径 ===

核心交互 1 — 贝塞尔编辑器（InteractiveCanvas）：
- 拖动锚点移动位置
- 拖动控制手柄改变曲率
- 双击添加/删除锚点
- 曲线实时平滑渲染
- Pointer Events 统一处理 mouse/touch
- 移动端：全屏编辑 + 触控点放大到 44px + 双指缩放
- Canvas HiDPI 适配

核心交互 2 — 挑战模式：
- 显示一个半透明目标形状
- 用户尝试用贝塞尔复现
- 实时计算匹配度百分比
- 有重置按钮

核心交互 3 — 科研应用：
- 用路径绘制流程图连接线、自定义箭头

=== m3-p4 图表美化实战 ===

核心交互 1 — 8 组 Before/After：
- 折线/柱状/散点/箱线/饼图/误差线/密度/热力
- 使用 BeforeAfter 组件

核心交互 2 — 5 步渐进美化（粘性滚动）：
- StickySteps 演示：默认输出 → 配色优化 → 字体调整 → 布局重构 → 细节打磨
- 左侧固定步骤标题和说明
- 右侧 SVG 图表随滚动逐步变化
- 下方代码面板高亮当前步骤的 R/Python 代码
- 移动端：不 pin，改为普通滚动 + 固定标题

完成后更新 todo.md 并 git commit。
```

## Step 13：m3-p5 SVG 编辑 + m3-p6 多面板 + m3-p7 资源站

```
读取规范文件，开发 m3-p5、m3-p6 和 m3-p7 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m3-p5 SVG 编辑与优化 ===

核心交互 1 — CodeMirror SVG 编辑器：
- 桌面端：左侧编辑 SVG 代码 + 右侧即时渲染预览（并排）
- 移动端：纵向堆叠，代码在上预览在下
- 代码变化实时反映

核心交互 2 — SVG 基础语法教学：
- 基本形状（rect/circle/ellipse/line/polyline/polygon/path）
- 坐标系统与 viewBox
- 每个知识点有可编辑的代码示例

核心交互 3 — SVG 优化策略：
- 路径简化 / 移除冗余 / 文件大小对比（优化前 vs 优化后）

=== m3-p6 多面板 Figure 组合 ===

核心交互 1 — Figure 布局编辑器：
- SortableJS 拖拽排列 A/B/C/D 面板
- 设置各面板宽高比例
- 移动端：改为预设布局模板选择

核心交互 2 — 标注规范：
- Nature 标准（字母大小/位置/字体）

核心交互 3 — 代码生成：
- 同时生成 R patchwork 和 Python subplot 两版代码
- CopyButton

=== m3-p7 素材资源站 ===

核心交互 1 — 资源卡片：
- 桌面端左侧筛选面板+右侧卡片展示
- 移动端：筛选改为顶部下拉/Tab，卡片单列
- 按类别分组

核心交互 2 — 3 步推荐器：
- 交互式问答流程 → 推荐最适合的 2-3 个资源

核心交互 3 — 许可证类型说明（CC BY/CC0/商用限制）

完成后更新 todo.md 并 git commit。
```

## Step 14：m4-p1 设计原则 + m4-p2 排版字体

```
读取规范文件，开发 m4-p1 和 m4-p2 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m4-p1 PPT 设计原则 ===

核心交互 1 — 格式塔原则演示：
- 5 组 SVG 交互（接近性/相似性/连续性/闭合性/图底关系）
- 用户可拖拽元素看原则如何生效
- Pointer Events，移动端触控友好

核心交互 2 — 视觉层次：
- 大小/颜色/位置/留白 4 维控制
- 桌面端：滑块实时调参
- 移动端：预设对比组

核心交互 3 — 信噪比 5 级渐进简化：
- 同一张幻灯片从信息过载一步步去噪到清晰
- 滑块或 StickySteps 切换

=== m4-p2 排版与字体 ===

核心交互 1 — 拖拽式布局编辑器：
- InteractiveCanvas 实现
- 自由拖放标题/正文/图表/图片区块
- 网格吸附 + 对齐辅助线（Canvas 绘制）
- 移动端：改为预设布局模板选择 + 参数微调

核心交互 2 — 字体搭配推荐器：
- 中文+英文组合效果展示
- 按场景分类：正式/现代/创意

核心交互 3 — 行距/字距/对齐影响演示：
- 同一段文字，实时调参看效果变化

完成后更新 todo.md 并 git commit。
```

## Step 15：m4-p3 注意力 + m4-p4 PPT 改造

```
读取规范文件，开发 m4-p3 和 m4-p4 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m4-p3 注意力与视觉流 ===

核心交互 1 — 注意力热力图（★ 核心）：
- 展示一张幻灯片示例
- 用户在上面点击认为最重要的区域
- Canvas 生成热力图（高斯模糊叠加）
- 与专家理想方案对比
- 给出评分和改进建议

核心交互 2 — F型/Z型阅读模式：
- SVG 动画路径演示视线流动

核心交互 3 — 视觉焦点控制技巧：
- 对比/隔离/运动/位置 4 种方法演示

=== m4-p4 PPT 改造案例 ===

核心交互 1 — 8 组 Before/After：
- 标题/数据/图表/文字/表格/结论/时间线/图片页
- 列表+预览布局：桌面端左侧案例列表+右侧 BeforeAfter 预览
- 移动端：纵向堆叠

核心交互 2 — 每组改造分步讲解：
- StickySteps 粘性滚动 3-5 步骤
- 移动端缩短 pin 距离

核心交互 3 — 互动评分：
- 给出一张"丑"幻灯片
- 用户可拖拽调整元素位置/大小（Canvas/Pointer Events）
- 系统根据设计原则打分
- 移动端触控友好（44px 最小触摸区）

完成后更新 todo.md 并 git commit。
```

## Step 16：m4-p5 海报 + m4-p6 图摘

```
读取规范文件，开发 m4-p5 和 m4-p6 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m4-p5 学术海报设计 ===

核心交互 1 — 海报布局模板库：
- 3-4 种经典布局的 SVG 缩略图
- 列表+预览布局：桌面端左模板列表+右预览；移动端纵向堆叠
- 点击展开全屏预览，标注各区块的推荐字号和内容

核心交互 2 — 海报 vs PPT 设计差异
核心交互 3 — 字号/色块/留白规则
核心交互 4 — 打印注意事项：
- CMYK vs RGB 色差演示（D3 或 Canvas 可视化色差）
- 出血 / 分辨率说明

=== m4-p6 Graphical Abstract 设计 ===

核心交互 1 — 5 个好例分析：
- 评分卡（构图/配色/信息密度/可读性 4 维）
- D3 雷达图/蛛网图可视化

核心交互 2 — 元素库拖拽组合：
- 箭头/框/图标/流程线等常用元素
- 桌面端：左侧元素库面板+右侧画布（SortableJS 或 InteractiveCanvas）
- 移动端：元素库改为底部抽屉或顶部 Tab

核心交互 3 — 期刊尺寸要求速查

完成后更新 todo.md 并 git commit。
```

## Step 17：m4-p7 信息图 + m4-p8 动画

```
读取规范文件，开发 m4-p7 和 m4-p8 页面。
请使用 frontend-design skill 来设计页面视觉。

=== m4-p7 科研信息图 ===

核心交互 1 — 4 种叙事结构模板：
- 时间线/流程/对比/层级
- 列表+预览布局：桌面端左模板选择+右预览；移动端纵向堆叠
- 各做一个 SVG 可交互的模板预览
- 用户可点击查看不同填充内容的效果

核心交互 2 — 数据简化技巧：
- 把复杂数据变成一张图讲清楚

核心交互 3 — 社交媒体适配：
- Twitter/WeChat/小红书尺寸和风格
- 同一信息图在不同平台尺寸下的裁切预览

=== m4-p8 科研动画基础 ===

核心交互 1 — 关键帧编辑器：
- Canvas 绘制时间轴
- 用户可添加/拖动关键帧（Pointer Events）
- 预览区实时播放动画效果
- 移动端：简化为预设动画选择+播放预览

核心交互 2 — gganimate 入门：
- CodeMirror R 代码
- 右侧用逐帧 SVG 模拟 GIF 动画效果
- 桌面端左代码+右预览；移动端纵向堆叠

核心交互 3 — PowerPoint 动画进阶技巧
核心交互 4 — 适合做动画的科研场景

完成后更新 todo.md 并 git commit。
```

## Step 18：速查手册

```
读取规范文件，开发 ref 页面（速查手册）。
请使用 frontend-design skill 来设计页面视觉。

5 类速查卡用 TabSwitcher 切换：
1. 图表选择速查卡
2. 配色方案速查卡
3. 导出参数速查卡
4. 快捷键速查卡（Illustrator/R/Python 分组）
5. 期刊规格速查卡

布局：
- 桌面端：左侧分类 Tab + 右侧速查内容
- 移动端：Tab 改为顶部水平滚动，内容单列全宽
- 每张卡片内容紧凑

功能：
- 所有内容支持 CopyButton 一键复制
- 整体可导出为 PDF（浏览器 print 样式优化：@media print）
- 从导航栏全局可直接访问，不属于任何模块

完成后更新 todo.md 并 git commit。
```

## Step 19：构建优化与部署

```
读取规范文件，执行构建优化：

1. Vite 构建优化：
   - 按模块 code splitting（m1/m2/m3/m4 各自懒加载）
   - 资源压缩（CSS/JS minify）
   - 图片资源优化

2. 字体优化：
   - font-display: swap（所有 @font-face）
   - 中文字体子集化减小体积（Noto Sans SC / Noto Serif SC）

3. GitHub Actions 自动部署：
   - push to main → npm run build → deploy to gh-pages
   - 创建 .github/workflows/deploy.yml

4. SEO / Open Graph：
   - 每个页面的 meta title/description
   - Open Graph 社交分享卡片（og:title/og:description/og:image）

5. 验证：
   - npm run build 成功
   - preview dist 目录无报错
   - 所有路由正常工作

完成后更新 todo.md 并 git commit。
```

## Step 20：最终全面测试

```
执行最终全面测试：

1. 响应式逐页检查（Chrome DevTools）：
   - 375px（iPhone SE）
   - 390px（iPhone 14）
   - 768px（iPad）
   - 1024px（Laptop）
   - 1440px（Desktop）
   每页确认：
   - 底部 Tab Bar 正常显示/隐藏
   - 移动端顶部栏正常
   - 无水平溢出（overflow-x）
   - 文字可读（最小 16px）
   - 图片/SVG 不超出容器
   - section 明暗交替正确

2. 交互组件测试：
   - 所有 Canvas 编辑器移动端触摸拖拽正常
   - 所有 BeforeAfter 滑块移动端滑动流畅
   - 所有 CodeMirror 移动端只读 + 编辑按钮正常
   - 工作坊手风琴面板展开/折叠正常
   - Tab 切换器移动端可横向滚动
   - 滑块/Stepper 触控目标 ≥44px

3. 导航测试：
   - 侧边栏所有链接跳转正确
   - 底部 Tab Bar 模块切换正确
   - 移动端顶部栏菜单按钮打开侧边栏
   - Hero 快捷导航跳转不被顶部栏遮挡（scroll-margin-top）
   - Cmd+K / Ctrl+K 搜索正常

4. 性能审计：
   - Lighthouse 桌面端 Performance 90+
   - Lighthouse 移动端 Performance 85+
   - 修复所有发现的问题

5. 控制台零报错确认

完成后更新 todo.md 标记全部完成并 git commit。
```
