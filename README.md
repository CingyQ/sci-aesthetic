# SciAesthetic 科研美学

> 你的研究值得更好的表达。

面向科研工作者的**交互式知识百科**——科研视觉传达完整体系。

## 项目状态

**当前进度：Phase 0–4 部分完成（m1-p1 ~ m1-p6）**

| 模块 | 内容 | 状态 |
|------|------|------|
| 首页 | Hero + 模块卡片 + 搜索 + 学习路径 | ✅ |
| 模块一：科研数据可视化 | 10 页 | 🔄 6/10 |
| 模块二：AI 辅助科研绘图 | 6 页 | ⏳ |
| 模块三：矢量绘图与设计 | 7 页 | ⏳ |
| 模块四：学术演示设计 | 8 页 | ⏳ |
| 速查手册 | 全局 | ⏳ |

## 本地开发

```bash
npm install
npm run dev       # http://localhost:5173/sci-aesthetic/
npm run build     # 构建到 dist/
npm run preview   # 预览构建结果
```

## 技术栈

| 用途 | 技术 |
|------|------|
| 构建 | Vite（vanilla JS，ES Modules） |
| 样式 | 原生 CSS + CSS Variables |
| 滚动动画 | GSAP + ScrollTrigger |
| 数据可视化 | D3.js |
| 代码编辑器 | CodeMirror 6（R / Python） |
| 画布交互 | Canvas API + Pointer Events |
| 拖拽排序 | SortableJS |
| 字体 | Google Fonts（Noto Serif SC / Playfair Display / Noto Sans SC / JetBrains Mono） |

## 目录结构

```
src/
├── styles/          # CSS 变量、基础、组件、布局、移动端
├── components/      # 可复用 JS 组件
├── pages/
│   ├── home.js      # 首页
│   ├── m1/          # 模块一（10 页）
│   ├── m2/          # 模块二（6 页）
│   ├── m3/          # 模块三（7 页）
│   ├── m4/          # 模块四（8 页）
│   └── ref.js       # 速查手册
└── utils/           # 路由、色彩数学
```

## 规范文档

| 文件 | 内容 |
|------|------|
| `CLAUDE.md` | 项目规范、设计原则、编码约定（AI 开发必读） |
| `design-spec.md` | CSS 变量、GSAP 模板、组件样式、移动端规范 |
| `content-outline.md` | 首页 + 4 模块内容大纲（31 页 + 速查手册） |
| `todo.md` | 按模块分阶段的开发进度 |
| `commands.md` | Claude Code 执行命令计划（逐步开发指引） |

## 已知技术决策

### CSS sticky 失效问题
`base.css` 对 `body` 和 `.page-scroll` 设置了 `overflow-x: hidden`，这会创建 BFC 导致 `position:sticky` 失效。项目中凡需要 sticky 滚动效果，统一使用 **`transform:translateY()` + `window.scroll` 事件**模拟。

### 移动端步骤交互
复杂的步骤选择器（数字按钮）对移动端不友好。统一使用**堆叠独立卡片**模式：每张卡片自包含全部内容（说明+代码+图表），用户自然向下滚动即可。

### 滚动容器
项目滚动发生在 `window` 上（`#main-content` 无 `overflow-y`），所有 scroll 事件监听绑定到 `window`。

## 部署

GitHub Pages，路径：`/sci-aesthetic/`

```bash
# 手动部署
npm run build
# 推送 dist/ 到 gh-pages 分支
```
