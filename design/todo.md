# TODO - 科研绘图指南网站改版

## Step 1: 配色系统更新 ✅
- [x] 替换 CSS :root 变量（rose->天蓝, mint->薄荷绿, 新背景色）
- [x] 更新所有内联颜色引用（SVG stroke/fill, style属性中的硬编码颜色）
- [x] 更新背景 blob 颜色
- [x] 更新滚动条、按钮渐变、active 状态
- [x] 更新 design-spec.md

## Step 2: 图表工作坊改造 ✅
- [x] p18 添加全屏模态框 HTML + CSS
- [x] 为每种图表类型实现独立的参数控制面板（12种图表）
- [x] 实现模态框内的 SVG 实时预览 + R 代码显示
- [ ] p19 改为"图表定制进阶"

## Step 3: 图表美化增强 (Page 10) ✅
- [x] 保留4个 before/after 对比
- [x] 实现5步渐进式美化演示（原始->配色->字体->布局->细节）

## Step 4: 薄弱页面充实 ✅
- [x] p11: 快捷键测试小游戏（按键判断对错+计分）
- [ ] p13: 子步骤展开 + 案例流程动画（待补）
- [x] p22: 拖拽式幻灯片布局编辑器
- [x] p23: 注意力热力图互动（点击+理想热力图对比）

## Step 5: 新增交互组件 ✅
- [x] 图表模态编辑器组件（12种图表全屏工作坊）
- [x] 渐进式美化演示器（5步从丑到美）
- [x] 快捷键测试游戏
- [x] 拖拽布局编辑器
- [x] 注意力热力图

## Step 6: 细节打磨
- [x] 页面切换动画（fadeInUp）
- [x] 导航active状态高亮
- [x] 交互动画反馈（hover/transition已内置）
- [ ] 移动端进一步优化（待测试）

## Step 7: 清理 ✅
- [x] 删除 insert_js.py, insert_pages.py, p17.html

## Step 8: 第三轮完善 ✅
- [x] p11: 12个工具卡片点击展示SVG动画效果演示（选择框选、锚点拖动、钢笔描线、打字机等）
- [x] p16: 8个震撼级SVG预设（DNA双螺旋、神经网络、细胞超微结构、化学反应、数据流程图、心脏解剖、弦图、科技装饰）
- [x] p17: ggplot2多图表类型tab切换（散点/柱状/折线/箱线/小提琴/直方/密度/热力/面积 9种）
- [x] p19: 代码实验室扩展至10种图表（+boxplot/violin/histogram/density/heatmap/area/errorbar）

## Step 9: 第四轮深度增强

### Phase 1: Bug修复与稳定性 ✅
- [x] 修复已知交互组件的初始化问题
- [x] 修复懒加载相关的页面切换bug
- [x] 清理控制台错误和警告
- [x] 确保所有SVG动画在页面切换后正确重置

### Phase 2A: AI工作流页面深度充实 (p13-16) ✅
- [x] p13: AI决策树 + 传统vsAI时间对比 + 3案例手风琴 + 质量检查清单
- [x] p14: Prompt工程理论 + 交互式质量评分器 + 3真实案例对比 + 版权伦理
- [x] p15: Image Trace参数模拟器 + 矢量格式兼容性矩阵 + 3常见陷阱
- [x] p16: SVG Path命令速查(交互演示) + 性能优化提示 + 坐标系统可视化

### Phase 2B: 色彩理论深度 (p4,5,8) ✅
- [x] p4: 和谐模式适用场景(3个SVG示例) + 色距理论
- [x] p5: Rainbow陷阱vsViridis对比 + 顶刊配色规范表 + Wong色盲安全配色
- [x] p8: 色觉缺陷统计SVG + WCAG 2.1对比度标准表 + 自定义配色色盲模拟器

### Phase 2C: R可视化高级 (p17,19,21) ✅
- [x] p17: Faceting分面演示(none/wrap/grid) + 坐标变换(cartesian/flip/polar) + 图层叠加示例
- [x] p19: 完整R脚本导出(含数据生成/绑图/导出)
- [x] p21: 期刊投稿图片规格表 + ggsave代码生成器 + patchwork多面板布局(4种)

### Phase 3: 中等优先级页面 ✅
- [x] p1: 快速资源推荐器（3步问答引导）
- [x] p2: Nature论文Figure制作全流程案例（6步SVG流程图 + 陷阱/技巧/清单）
- [x] p23: 格式塔视觉原则（接近性/相似性/连续性/闭合性 4个SVG演示）
- [ ] p9,11: 贝塞尔练习模式 + 工具工作流指引（留待下轮）

### Phase 4: 文档同步
- [x] 更新 design-spec.md 配色系统与组件规格
- [x] 更新 CLAUDE.md 页面描述与交互组件列表
- [x] 更新 todo.md 进度追踪

## Step 10: 第五轮完善 - 图表专属参数 & 内容深化 ✅

### Phase 1: P19 代码实验室 - 图表专属参数面板 ✅
- [x] 10种图表各自添加专属控件（scatter:形状/抖动, bar:排列/柱宽, line:线型/数据点, boxplot:抖动/缺口/均值, violin:trim/箱线/带宽, histogram:bins/密度, density:带宽/填充, heatmap:配色/边框/标签, area:堆叠模式, errorbar:样式/帽宽）
- [x] SVG预览根据专属参数调整渲染
- [x] R代码同步包含专属参数
- [x] 完整R脚本导出包含专属参数

### Phase 2: P17 ggplot2 - 图表专属参数面板 ✅
- [x] 9种图表各自添加专属控件（同P19模式）
- [x] SVG预览和R代码同步更新

### Phase 3: P7 数据配色 - 内容大幅扩充 ✅
- [x] 3类×5种子配色选择器（连续:viridis/plasma/inferno/magma/cividis, 发散:RdBu/PiYG/PRGn/BrBG/RdYlBu, 定性:Set1/Set2/Dark2/Paired/NPG）
- [x] 4种图表预览（热力图/柱状图/散点图/折线图）
- [x] 颜色数量滑块(3-9)
- [x] 连续vs离散映射说明卡

### Phase 4: P12 导出设置 - 交互增强 ✅
- [x] 格式特性对比卡片（SVG/PDF/PNG/TIFF 含优劣势/场景/R代码）
- [x] DPI效果对比（72/150/300/600 可视化）
- [x] 文件大小估算器

### Phase 5: 文档同步 ✅
- [x] 更新 todo.md
- [x] 更新 CLAUDE.md

## Step 11: 第六轮 - P10/P18/P24 各增加4个案例 ✅
- [x] P10 图表美化: 新增4个before/after（箱线图/饼图/误差线图/密度图）共8个
- [x] P18 图表类型: 新增4种图表卡片+chartDefs+renderModalChart（雷达图/棒棒糖图/森林图/瀑布图）共16种
- [x] P24 PPT改造: 新增4个before/after（表格页/结论页/时间线/图片页）共8个
- [x] 文档同步: todo.md + CLAUDE.md

---

## Future Iterations
- [ ] 移动端优化：响应式布局完善、触摸手势支持、底部导航栏适配
- [ ] 多语言支持：英文界面切换、术语双语对照表
- [ ] 打印样式表：添加 @media print 样式，支持导出为可打印教程
