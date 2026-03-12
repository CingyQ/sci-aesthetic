# M1 & M2 文字审计修复计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 M1（10页）和 M2（6页）中的所有文字错误，主要包括工具版本升级（Nano Banana → Nano Banana 2）、删除 OpenRouter 说明、以及删除占位符标注"（占位符版本）"。

**Architecture:** 审计已完成。M1 无文字问题。M2 的问题集中在 p01 和 p06 两个文件中，共 6 处修改。

**Tech Stack:** 直接编辑 JS 文件中的 HTML 字符串和 JS 数据常量，无需构建。

---

## 审计结果总览

### M1（科研数据可视化）— 全部通过 ✅

| 文件 | 状态 |
|------|------|
| p01-color-theory.js | ✅ 无问题 |
| p02-color-harmony.js | ✅ 无问题 |
| p03-palette-generator.js | ✅ 无问题 |
| p04-accessibility.js | ✅ 无问题 |
| p05-chart-selection.js | ✅ 无问题 |
| p06-ggplot2-grammar.js | ✅ 无问题 |
| p07-ggplot2-workshop.js | ✅ 无问题 |
| p08-r-themes.js | ✅ 无问题 |
| p09-python-viz.js | ✅ 无问题 |
| p10-workflow-export.js | ✅ 无问题 |

### M2（AI 辅助科研绘图）— 发现问题 ❌

| 文件 | 状态 | 问题数 |
|------|------|--------|
| p01-ai-overview.js | ❌ 有问题 | 3 处 |
| p02-prompt-engineering.js | ✅ 无问题 | — |
| p03-vectorization.js | ✅ 无问题 | — |
| p04-ethics.js | ✅ 无问题 | — |
| p05-ai-diagrams.js | ✅ 无问题 | — |
| p06-case-studies.js | ❌ 有问题 | 3 处 |

---

## 问题详情

### 问题 A：工具版本需升级为 Nano Banana 2

所有出现"Nano Banana"的地方统一改为"Nano Banana 2"。

### 问题 B：OpenRouter 说明需删除

p06 步骤描述中有"（Gemini on OpenRouter）"这段括注，直接删除即可。

### 问题 C：占位符标注残留

p01 第 159 行末尾的"（占位符版本）"是开发阶段临时标注，需从正式内容中删除。

---

## 受影响文件

| 文件 | 修改行 | 内容 |
|------|--------|------|
| `src/pages/m2/p01-ai-overview.js` | ~159 | 删除"（占位符版本）"，升级工具名 |
| `src/pages/m2/p01-ai-overview.js` | ~298 | TOOLS 数组中升级工具名 |
| `src/pages/m2/p01-ai-overview.js` | ~308 | DESCS 数组中升级工具名描述 |
| `src/pages/m2/p06-case-studies.js` | ~59 | CASE_CARDS 中升级工具名 |
| `src/pages/m2/p06-case-studies.js` | ~74-75 | 步骤标题和描述中升级工具名、删除 OpenRouter 说明 |
| `src/pages/m2/p06-case-studies.js` | ~84 | AI 声明文本中升级工具名 |

---

## Chunk 1：修复 m2/p01-ai-overview.js

**Files:**
- Modify: `src/pages/m2/p01-ai-overview.js`（3处）

### Task 1：删除"（占位符版本）"并升级工具名（第~159行）

- [ ] **Step 1：定位并修改 HTML 字符串**

找到：
```
<p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">5 个真实环境科学场景，使用 Nano Banana 生成（占位符版本）</p>
```

改为：
```
<p style="color:var(--text-on-light-2);margin-top:var(--space-sm);line-height:1.6;">5 个真实环境科学场景，使用 Nano Banana 2 生成</p>
```

- [ ] **Step 2：验证第 159 行附近不再含有"占位符"字样**

---

### Task 2：修改 TOOLS 数组（第~298行）

- [ ] **Step 1：定位并修改 TOOLS 常量**

找到：
```js
const TOOLS = ['GPT Image 1.5','Midjourney v7','FLUX 1.1 Pro','Recraft V3 SVG','StarVector','Mermaid AI','Nano Banana'];
```

改为：
```js
const TOOLS = ['GPT Image 1.5','Midjourney v7','FLUX 1.1 Pro','Recraft V3 SVG','StarVector','Mermaid AI','Nano Banana 2'];
```

- [ ] **Step 2：确认 SCORES 和 DESCS 数组长度仍为 7，无需改动**

---

### Task 3：修改 DESCS 数组中的工具描述（第~308行）

- [ ] **Step 1：定位并修改描述（DESCS 第 7 个元素，index 6）**

找到：
```js
['基于 Gemini 模型，特别擅长环境科学场景概念图生成，本项目主要使用工具','可生成结构化流程图，结果稳定可控','不适合生成含精确数值的数据图表','可生成高质量科研图标和场景素材'],
```

改为：
```js
['特别擅长环境科学场景概念图生成，推荐工具','可生成结构化流程图，结果稳定可控','不适合生成含精确数值的数据图表','可生成高质量科研图标和场景素材'],
```

> 说明：删除"基于 Gemini 模型"（技术实现细节不必对外暴露）和"本项目主要使用工具"（主观措辞），改为简洁客观的描述。

- [ ] **Step 2：全文搜索确认 p01 中不再有旧版"Nano Banana"（不带"2"）**

---

## Chunk 2：修复 m2/p06-case-studies.js

**Files:**
- Modify: `src/pages/m2/p06-case-studies.js`（3处）

### Task 4：修改 CASE_CARDS 数据（第~59行）

- [ ] **Step 1：定位并修改 brief 字段**

找到：
```js
{ num: '01', title: '水污染 Graphical Abstract', brief: '期刊GA制作全流程，从论文摘要到投稿级GA，使用Nano Banana + Vectorizer.AI', target: '#p06-s2' },
```

改为：
```js
{ num: '01', title: '水污染 Graphical Abstract', brief: '期刊GA制作全流程，从论文摘要到投稿级GA，使用 Nano Banana 2 + Vectorizer.AI', target: '#p06-s2' },
```

---

### Task 5：修改 CASE1_STEPS 步骤 04（第~74-75行）

- [ ] **Step 1：修改步骤标题和描述，同时删除 OpenRouter 说明**

找到：
```js
{ num: '04', title: 'Nano Banana 生成', icon: '🤖',
  desc: '使用 Nano Banana（Gemini on OpenRouter）生成3个备选版本。选择构图最清晰的版本进入下一步。',
```

改为：
```js
{ num: '04', title: 'Nano Banana 2 生成', icon: '🤖',
  desc: '使用 Nano Banana 2 生成3个备选版本。选择构图最清晰的版本进入下一步。',
```

---

### Task 6：修改 AI 声明文本（第~84行）

- [ ] **Step 1：定位并修改 AI 声明**

找到：
```js
desc: '导出PNG（300DPI，RGB）+ PDF（矢量）\n在图注末尾添加：This Graphical Abstract was created with AI assistance (Nano Banana, 2025), verified by authors.',
```

改为：
```js
desc: '导出PNG（300DPI，RGB）+ PDF（矢量）\n在图注末尾添加：This Graphical Abstract was created with AI assistance (Nano Banana 2, 2025), verified by authors.',
```

- [ ] **Step 2：全文搜索确认 p06 中不再有旧版"Nano Banana"（不带"2"）和"OpenRouter"**

---

## 收尾

- [ ] **全局验证**：在 `src/pages/m2/` 下搜索"占位符版本"和"OpenRouter"，确认为零结果。搜索"Nano Banana"，确认所有结果均为"Nano Banana 2"。
- [ ] **git commit**：
```bash
git add src/pages/m2/p01-ai-overview.js src/pages/m2/p06-case-studies.js
git commit -m "fix(m2): 工具名升级为 Nano Banana 2，删除 OpenRouter 说明和占位符标注"
```
