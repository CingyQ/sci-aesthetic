# README Design Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 SciAesthetic 项目设计并生成一份专业、美观的 README，配套 AI 生成的无文字项目封面图和模块图标。

**Architecture:**
- 使用 Nano Banana 2（google/gemini-3.1-flash-image-preview）通过 `E:\Claude-project\fig-nanobanana\generate.py` 的相同 API 结构生成图像
- 图像存入项目 `readme-assets/` 目录并 commit 到仓库（GitHub 上可引用）
- README.md 放在项目根目录，使用相对路径引用图像

**Tech Stack:** Python + OpenRouter API（Nano Banana 2）、Markdown、GitHub Pages

---

## Chunk 1: 图像生成脚本 + 素材

### Task 1: 创建 README 图像生成脚本

**Files:**
- Create: `E:/Claude-project/fig-nanobanana/generate_readme.py`
- Output dir: `E:/Claude-project/fig-nanobanana/generated/readme/`

**图像规划（共 5 张，全部无文字）：**

| 文件名 | 宽高比 | 用途 | 视觉概念 |
|--------|--------|------|---------|
| `hero.png` | 16:9 | README 顶部横幅 | 深色背景，抽象数据可视化元素组合 |
| `m1-dataviz.png` | 1:1 | 模块一图标 | 色轮 + 散点图 + 渐变色带 |
| `m2-ai.png` | 1:1 | 模块二图标 | 抽象神经网络节点 + 发光路径 |
| `m3-vector.png` | 1:1 | 模块三图标 | 贝塞尔曲线 + 几何锚点 + 精确路径 |
| `m4-present.png` | 1:1 | 模块四图标 | 抽象版式构图 + 层叠矩形 |

- [ ] **Step 1: 创建生成脚本**

创建 `E:/Claude-project/fig-nanobanana/generate_readme.py`，复用 `generate.py` 的 `generate_image()` 函数结构：

```python
#!/usr/bin/env python3
"""
README Asset Generation Script
Uses Nano Banana 2 (google/gemini-3.1-flash-image-preview on OpenRouter)
to generate SciAesthetic README banner and module icons.
All images: NO text, NO labels — pure visual composition only.
"""

import sys
import json
import base64
import time
from pathlib import Path
import requests

if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

MODEL_ID = "google/gemini-3.1-flash-image-preview"
API_KEY_PATH = r"E:\Claude-project\api-key\nanobanana.txt"
OUTPUT_DIR = Path(r"E:\Claude-project\fig-nanobanana\generated\readme")

def _read_key():
    with open(API_KEY_PATH, "r", encoding="utf-8") as f:
        return f.read().strip()

def generate_image(prompt, aspect_ratio, output_path):
    print(f"\n>> {output_path.name}  (ratio={aspect_ratio})")
    print(f"   Prompt: {prompt[:100]}...")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    key = _read_key()
    headers = {
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://cingyq.github.io/sci-aesthetic/",
        "X-Title": "SciAesthetic",
    }
    payload = {
        "model": MODEL_ID,
        "messages": [{"role": "user", "content": prompt}],
        "modalities": ["image", "text"],
        "image_config": {"aspect_ratio": aspect_ratio, "image_size": "2K"}
    }
    try:
        r = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers, json=payload, timeout=180
        )
        resp = r.json()
        if "error" in resp:
            print(f"  [FAIL] {resp['error']}")
            return False
        msg = resp["choices"][0]["message"]
        images = msg.get("images", [])
        if images:
            img0 = images[0]
            data_url = img0.get("image_url", {}).get("url", "") if isinstance(img0, dict) else img0
            if data_url.startswith("data:image"):
                _, b64 = data_url.split(",", 1)
                ext = ".png" if "png" in data_url.split(";")[0] else ".jpg"
                final = output_path.with_suffix(ext)
                with open(final, "wb") as f:
                    f.write(base64.b64decode(b64))
                print(f"  [OK] {final}")
                return True
        print("  [FAIL] No image in response")
        return False
    except Exception as e:
        print(f"  [FAIL] {e}")
        return False

# ── Prompt 设计原则 ──────────────────────────────────────────────────────
# 项目配色：深色 #1d1d1f / 浅色 #f5f5f7 / 天蓝 #7EC8E3
# 强调：ABSOLUTELY NO TEXT, NO LABELS, NO WORDS, NO LETTERS, NO NUMBERS
# 审美方向：Apple 产品页级别的视觉精度 + 科研工具的专业感

NO_TEXT = (
    "CRITICAL CONSTRAINT: This image must contain ABSOLUTELY NO TEXT, "
    "NO letters, NO numbers, NO labels, NO words, NO annotations, "
    "NO captions, NO watermarks of any kind. Pure visual composition only."
)

IMAGES = {
    "hero": {
        "aspect_ratio": "16:9",
        "prompt": (
            "Abstract scientific data visualization composition, dark background #0d0d0f, "
            "ultra-wide cinematic banner format.\n"
            "Visual elements floating in deep dark space:\n"
            "- Left zone: a luminous color wheel with smooth hue gradients, "
            "radiating rings of cyan #7EC8E3, lavender #B8B8E8, mint #95D5B2, warm orange #F0B27A\n"
            "- Center zone: an elegant scatter plot constellation — hundreds of tiny glowing dots "
            "in varying sizes, forming a diagonal cluster pattern, dots colored from deep blue "
            "to bright cyan, connected by faint translucent lines\n"
            "- Right zone: flowing bezier curves and smooth gradient bands, "
            "like silk ribbons of data, transitioning through the project palette\n"
            "- Background: very subtle grid of fine white lines at low opacity (5%), "
            "like graph paper barely visible\n"
            "- Atmospheric glow: soft radial light sources behind each element cluster, "
            "like bioluminescence in deep water\n"
            "Mood: sophisticated, precise, scientific yet artistic. "
            "Apple product page aesthetic applied to data science. "
            "High contrast, cinematic depth of field blur on edges.\n\n"
            + NO_TEXT
        )
    },
    "m1-dataviz": {
        "aspect_ratio": "1:1",
        "prompt": (
            "Abstract square icon for a data visualization module, dark background #1d1d1f.\n"
            "Composition: centered color wheel occupying 60% of frame, "
            "smooth HSL gradient around the ring with vivid pure hues, "
            "inner area shows a miniature scatter plot with glowing cyan dots #7EC8E3, "
            "diagonal regression line in white at 30% opacity. "
            "Bottom: three abstract bar chart columns as geometric silhouettes in "
            "different heights, filled with color gradient. "
            "Background: faint concentric circles at very low opacity. "
            "Overall palette: dark background, cyan primary accent, "
            "rainbow color wheel as feature element. "
            "Geometric precision, clean, no decoration.\n\n"
            + NO_TEXT
        )
    },
    "m2-ai": {
        "aspect_ratio": "1:1",
        "prompt": (
            "Abstract square icon for an AI-assisted scientific illustration module, "
            "dark background #1d1d1f.\n"
            "Composition: abstract neural network visualization — "
            "7-8 softly glowing circular nodes arranged in two vertical layers, "
            "connected by curved bezier paths that glow in lavender-purple #B8B8E8. "
            "From the network, abstract shapes emerge on the right side: "
            "a simple molecular structure silhouette, a leaf silhouette, "
            "representing AI generating scientific imagery. "
            "Central node slightly larger, emitting radial light. "
            "Connection lines have gradient opacity (brighter at nodes, fading in middle). "
            "Background: very subtle hexagonal mesh pattern at 4% opacity. "
            "Color palette: dark background, lavender-purple accents, "
            "warm white node centers. Clean, technological, elegant.\n\n"
            + NO_TEXT
        )
    },
    "m3-vector": {
        "aspect_ratio": "1:1",
        "prompt": (
            "Abstract square icon for a vector design module, dark background #1d1d1f.\n"
            "Composition: elegant bezier curve system — "
            "one large smooth S-curve sweeping diagonally across the frame, "
            "in bright mint green #95D5B2 with subtle glow effect. "
            "At each end and the midpoint: diamond-shaped anchor points in white, "
            "with control handles extending outward as thin lines with circular endpoints. "
            "Secondary elements: a partially constructed geometric shape "
            "(pentagon outline, only 3 of 5 sides drawn, like work-in-progress), "
            "in slightly lighter green. "
            "Background: fine white grid at 6% opacity, like vector software canvas. "
            "One subtle pen tool cursor shape as abstract geometry. "
            "Palette: dark bg, mint green primary, white accents. "
            "Precise, architectural, mathematical beauty.\n\n"
            + NO_TEXT
        )
    },
    "m4-present": {
        "aspect_ratio": "1:1",
        "prompt": (
            "Abstract square icon for an academic presentation design module, "
            "dark background #1d1d1f.\n"
            "Composition: abstract slide composition as nested rectangles — "
            "outer frame representing a slide canvas in warm orange #F0B27A at low opacity. "
            "Inside: carefully arranged abstract layout elements: "
            "a wide thin rectangle at top (like a title bar), "
            "two equal rectangles side by side in the middle (like two-column layout), "
            "one wide rectangle at bottom (like a content bar). "
            "These rectangles are filled with subtle gradients from orange to transparent. "
            "Overlapping slightly with the slide: abstract typography rhythm — "
            "5-6 horizontal lines of varying lengths stacked, "
            "representing text blocks without being actual letters, "
            "in white at 20% opacity. "
            "Small triangle/arrow shape in bright orange pointing right, "
            "suggesting presentation flow. "
            "Palette: dark bg, warm orange accent, white structural lines.\n\n"
            + NO_TEXT
        )
    }
}


if __name__ == "__main__":
    print(f"Generating {len(IMAGES)} README assets...\n")
    results = {}
    for key, cfg in IMAGES.items():
        out = OUTPUT_DIR / f"{key}.jpg"
        if out.exists() or out.with_suffix(".png").exists():
            actual = out if out.exists() else out.with_suffix(".png")
            print(f"  [SKIP] {actual.name} already exists")
            results[key] = "skip"
            continue
        ok = generate_image(cfg["prompt"], cfg["aspect_ratio"], out)
        results[key] = "ok" if ok else "fail"
        time.sleep(1)

    print(f"\n{'='*50}")
    for k, v in results.items():
        icon = "✅" if v in ("ok","skip") else "❌"
        print(f"  {icon} {k}: {v}")
```

- [ ] **Step 2: 运行生成脚本（dry-run 检查）**

```bash
cd E:/Claude-project/fig-nanobanana
python generate_readme.py
```

预期输出：5 张图生成到 `generated/readme/`，每张打印 `[OK] filename.png`

- [ ] **Step 3: 将生成的图像复制到项目目录**

```bash
mkdir -p E:/Claude-project/sci-aesthetic/readme-assets
cp E:/Claude-project/fig-nanobanana/generated/readme/*.png E:/Claude-project/sci-aesthetic/readme-assets/
# 或 .jpg，取决于生成格式
```

- [ ] **Step 4: 验证图像文件存在**

```bash
ls E:/Claude-project/sci-aesthetic/readme-assets/
```

预期：`hero.png  m1-dataviz.png  m2-ai.png  m3-vector.png  m4-present.png`

---

## Chunk 2: README.md 正文

### Task 2: 编写 README.md

**Files:**
- Create: `E:/Claude-project/sci-aesthetic/README.md`

README 结构：
1. Hero 横幅图
2. 项目名 + Slogan + badges
3. 简介段落
4. 功能模块（4 个，每个配模块图标）
5. 技术栈
6. 本地开发
7. 部署说明
8. License

- [ ] **Step 1: 创建 README.md**

```markdown
<div align="center">

<img src="readme-assets/hero.png" alt="SciAesthetic Banner" width="100%">

# SciAesthetic · 科研美学

**你的研究值得更好的表达。**

[![GitHub Pages](https://img.shields.io/badge/Live-GitHub%20Pages-0d1117?style=flat-square&logo=github)](https://cingyq.github.io/sci-aesthetic/)
[![License](https://img.shields.io/badge/License-MIT-7EC8E3?style=flat-square)](LICENSE)
![Modules](https://img.shields.io/badge/Modules-4-B8B8E8?style=flat-square)
![Pages](https://img.shields.io/badge/Pages-31-95D5B2?style=flat-square)

</div>

---

## 关于

SciAesthetic 是面向科研工作者的**交互式视觉传达知识百科**，覆盖从数据可视化到学术演示设计的完整体系。

不是线性课程，而是自由探索的词条网络——你可以从任意模块进入，按需浏览。每个页面都是一个独立的知识单元，配有交互工具和真实案例。

---

## 功能模块

<table>
<tr>
<td width="25%" align="center">
<img src="readme-assets/m1-dataviz.png" width="120" alt="数据可视化"><br>
<b>科研数据可视化</b><br>
<sub>色彩理论 · R/Python 图表 · 出版规格导出</sub>
</td>
<td width="25%" align="center">
<img src="readme-assets/m2-ai.png" width="120" alt="AI 辅助"><br>
<b>AI 辅助科研绘图</b><br>
<sub>Prompt 技巧 · 矢量化 · 伦理边界</sub>
</td>
<td width="25%" align="center">
<img src="readme-assets/m3-vector.png" width="120" alt="矢量设计"><br>
<b>矢量绘图与设计</b><br>
<sub>Illustrator · 贝塞尔 · SVG 编辑</sub>
</td>
<td width="25%" align="center">
<img src="readme-assets/m4-present.png" width="120" alt="演示设计"><br>
<b>学术演示设计</b><br>
<sub>PPT · 海报 · 图摘 · 信息图</sub>
</td>
</tr>
</table>

---

## 技术栈

| 用途 | 技术 |
|------|------|
| 构建 | Vite + Vanilla JS（ES Modules） |
| 样式 | 原生 CSS（CSS Variables） |
| 滚动动画 | GSAP + ScrollTrigger |
| 数据可视化 | D3.js |
| 代码编辑器 | CodeMirror 6 |
| 部署 | GitHub Pages（GitHub Actions 自动构建） |

---

## 本地开发

```bash
git clone https://github.com/CingyQ/sci-aesthetic.git
cd sci-aesthetic
npm install
npm run dev
```

访问 `http://localhost:5173/sci-aesthetic/`

---

## 部署

推送到 `master` 分支后，GitHub Actions 自动构建并部署到 GitHub Pages。

手动触发：GitHub → Actions → Deploy to GitHub Pages → Run workflow

---

## License

MIT © 2025 SciAesthetic
```

- [ ] **Step 2: 检查图像路径引用是否与实际文件名一致**

确认 `readme-assets/` 下的文件名与 README 中引用的路径完全匹配。

---

## Chunk 3: 提交与验证

### Task 3: 提交到 GitHub 并验证显示效果

**Files:**
- Modify: `.gitignore`（确认 `readme-assets/` 不在忽略列表中）
- Commit: `README.md` + `readme-assets/`

- [ ] **Step 1: 检查 .gitignore 不包含 readme-assets**

```bash
grep "readme-assets" E:/Claude-project/sci-aesthetic/.gitignore
```

预期：无输出（未被忽略）

- [ ] **Step 2: 提交**

```bash
cd E:/Claude-project/sci-aesthetic
git add README.md readme-assets/
git commit -m "docs: add professional README with AI-generated banner and module icons"
git push origin master
```

- [ ] **Step 3: 验证 GitHub 页面显示**

打开 `https://github.com/CingyQ/sci-aesthetic` 确认：
- hero 横幅图正常显示
- 4 个模块图标在表格中对齐
- badges 链接可点击

---

## 执行说明

**执行顺序：** Chunk 1（生成图像）→ Chunk 2（写 README）→ Chunk 3（提交）

**Chunk 1 注意事项：**
- 图像生成需要 API Key 在 `E:\Claude-project\api-key\nanobanana.txt`
- 每张图约 30-60 秒，5 张合计约 3-5 分钟
- 如果某张生成失败，删除对应文件后重新运行脚本即可（有 skip 逻辑）
- 图像格式取决于 API 返回（通常为 PNG）

**关于 hero 图尺寸：**
- 16:9 实际输出约 2752×1536，README 中用 `width="100%"` 自适应

**如果图像质量不满意：**
- 删除对应 `generated/readme/` 文件
- 调整 `IMAGES` 字典中的 prompt 描述
- 重新运行 `python generate_readme.py`
