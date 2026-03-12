# Phase 5.5 — M2 AI 素材生成与占位符替换实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 Nano Banana 2（Gemini on OpenRouter）批量生成 M2 模块 **19 个图片文件**（覆盖 23 个 UI 占位槽，p02 缩略图与详情大图复用同一文件），逐张用 Claude 视觉模态 review，通过后替换 m2-p01/p02/p06 中的占位符 div，完成 Phase 5.5。

**Architecture:** 独立 Python 生成脚本存放于 `E:\Claude-project\fig-nanobanana\`，先测试 API + 1 张图，再分批生成（p01→p02→p06），每批 review 后方可替换 JS 文件。图片最终复制到 `E:\Claude-project\sci-aesthetic\public\assets\m2\`，JS 文件把 `<div class="m2-placeholder">` 替换为 `<img>` 标签。

**Tech Stack:** Python 3.x · `openai` SDK（指向 OpenRouter base_url）· `requests` · `Pillow`（尺寸验证）· OpenRouter API（model: Nano Banana 2 = Gemini）

---

## 背景：占位符完整清单

**实际图片文件数量（19 个文件，覆盖 23 个 UI 占位槽）：**

| 页面 | 位置 | UI 占位槽数 | 实际文件数 | 说明 |
|------|------|------------|-----------|------|
| p01 S4 展示组件 | 5 个场景切换面板 | 5 | 5 | 1:1 |
| p02 S2 好差对比 | 3 组 × 2（bad/good） | 6 | 6 | 1:1 |
| p02 S3 迭代图 | v1~v4 轨道缩略 + 详情大图 | 8 | 4 | **缩略图与详情大图复用同一文件** |
| p06 Case1 Before/After | 原始草图 + 最终 GA | 2 | 2 | 16:9 |
| p06 Case2 最终图 | 微塑料迁移方法图 | 1 | 1 | 4:3 |
| p06 Case3 最终图 | 碳循环综述概念图 | 1 | 1 | 4:3 |
| **合计** | | **23 槽** | **19 文件** | |

> p03/p04/p05 均无图片占位符（全部为文字卡片 + Canvas 交互）。

---

## 文件结构

```
E:\Claude-project\fig-nanobanana\
├── generate.py                    # ★ 主生成脚本（含所有 prompts）
├── review_log.md                  # ★ 每张图 review 记录（pass/fail + 原因）
├── prompts_reference.md           # 所有 prompt 文本存档
└── generated\
    ├── m2-p01\                    # 5 张场景图
    │   ├── p01-s4-01-water.jpg
    │   ├── p01-s4-02-carbon.jpg
    │   ├── p01-s4-03-remote.jpg
    │   ├── p01-s4-04-micro.jpg
    │   └── p01-s4-05-eco.jpg
    ├── m2-p02\                    # 14 张对比+迭代图
    │   ├── p02-bad-01-watershed.jpg
    │   ├── p02-good-01-watershed.jpg
    │   ├── p02-bad-02-soil.jpg
    │   ├── p02-good-02-soil.jpg
    │   ├── p02-bad-03-atmo.jpg
    │   ├── p02-good-03-atmo.jpg
    │   ├── p02-iter-v1-wetland.jpg
    │   ├── p02-iter-v2-wetland.jpg
    │   ├── p02-iter-v3-wetland.jpg
    │   └── p02-iter-v4-wetland.jpg
    │   (注：缩略图和详情大图共用同一张图片，JS 层复用)
    └── m2-p06\                    # 4 张案例图
        ├── p06-case1-draft.jpg
        ├── p06-case1-final-ga.jpg
        ├── p06-case2-microplastic.jpg
        └── p06-case3-carbon.jpg

E:\Claude-project\sci-aesthetic\
└── public\
    └── assets\
        └── m2\                    # 最终生产图（从 generated/ 复制）
            ├── p01-s4-01-water.jpg
            ├── ...（19 文件）
```

---

## Chunk 1：环境搭建与 API 测试

### Task 1：创建生成脚本框架 + 测试 1 张图

**Files:**
- Create: `E:\Claude-project\fig-nanobanana\generate.py`

- [ ] **Step 1.1：安装依赖**

```bash
pip install openai pillow requests
```

Expected: 依赖安装成功，无报错。

- [ ] **Step 1.2：读取 API key**

验证文件存在：
```bash
cat "E:\Claude-project\api-key\nanobanana.txt"
```

Expected: 显示 `sk-or-v1-...` 格式的 key。

- [ ] **Step 1.3：写生成脚本框架**

创建 `E:\Claude-project\fig-nanobanana\generate.py`，内容如下：

```python
#!/usr/bin/env python3
"""
Phase 5.5 — M2 素材生成脚本
使用 Nano Banana 2 (Gemini on OpenRouter) 生成环境科学主题 AI 图
"""

import os
import sys
import json
import base64
import time
from pathlib import Path
from openai import OpenAI

# ── 配置 ──────────────────────────────────────────────────────────────────────

# ★ 重要：运行前先用 list_models() 确认正确的 image-capable model ID
# 常见候选：
#   "google/gemini-2.0-flash-exp"
#   "google/gemini-flash-1.5"
#   "black-forest-labs/flux-1.1-pro"   (备用，如 Gemini 不支持图像生成)
MODEL_ID = "google/gemini-2.0-flash-exp"

API_KEY_PATH = r"E:\Claude-project\api-key\nanobanana.txt"
OUTPUT_BASE  = Path(r"E:\Claude-project\fig-nanobanana\generated")
PROJECT_ASSETS = Path(r"E:\Claude-project\sci-aesthetic\public\assets\m2")

# 成本控制：每批次生成后暂停确认
BATCH_MODE = False   # True = 无确认批量生成；False = 每张生成后暂停

# ── 初始化客户端 ──────────────────────────────────────────────────────────────

def _read_key() -> str:
    with open(API_KEY_PATH, "r", encoding="utf-8") as f:
        return f.read().strip()

client = OpenAI(
    api_key=_read_key(),
    base_url="https://openrouter.ai/api/v1",
)

# ── 核心生成函数 ──────────────────────────────────────────────────────────────

def generate_image(prompt: str, size: str, output_path: Path, dry_run: bool = False) -> bool:
    """
    调用 OpenRouter 图像生成 API，保存到 output_path。
    size 格式: "2048x1536" (4:3) 或 "2048x1152" (16:9)
    返回: True = 成功，False = 失败
    """
    if dry_run:
        print(f"[DRY RUN] 将生成: {output_path.name} ({size})")
        print(f"  Prompt: {prompt[:80]}...")
        return True

    print(f"\n▶ 生成: {output_path.name} ({size})")
    print(f"  Model: {MODEL_ID}")
    print(f"  Prompt: {prompt[:120]}...")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        # 方案 A：OpenAI images.generate 接口（适用于支持该接口的模型）
        response = client.images.generate(
            model=MODEL_ID,
            prompt=prompt,
            n=1,
            size=size,
            response_format="b64_json",
        )
        img_data = base64.b64decode(response.data[0].b64_json)
        with open(output_path, "wb") as f:
            f.write(img_data)
        _verify_dimensions(output_path, size)
        print(f"  ✓ 已保存: {output_path}")
        return True

    except Exception as e:
        print(f"  ✗ 失败 (images API): {e}")
        print("  → 尝试 chat completions 方案...")
        return _generate_via_chat(prompt, size, output_path)


def _verify_dimensions(output_path: Path, expected_size: str):
    """验证生成图片的实际分辨率（与预期可能不符）"""
    try:
        from PIL import Image
        with Image.open(output_path) as img:
            actual_w, actual_h = img.size
        exp_w, exp_h = map(int, expected_size.split("x"))
        match = "✓" if (actual_w, actual_h) == (exp_w, exp_h) else "⚠️"
        print(f"  {match} 分辨率: {actual_w}×{actual_h}（期望 {exp_w}×{exp_h}）")
    except Exception as e:
        print(f"  [无法验证分辨率: {e}]")


def _generate_via_chat(prompt: str, size: str, output_path: Path) -> bool:
    """
    备用方案：通过 chat completions + response_modalities 生成图像
    适用于 Gemini 2.0 Flash 等通过多模态接口输出图像的模型
    """
    w, h = size.split("x")
    try:
        response = client.chat.completions.create(
            model=MODEL_ID,
            messages=[{
                "role": "user",
                "content": (
                    f"Generate a scientific illustration image. "
                    f"Target resolution: {w}x{h} pixels.\n\n{prompt}"
                )
            }],
            extra_body={
                "response_modalities": ["image"],
            }
        )
        # 尝试从响应中提取图像
        for part in response.choices[0].message.content:
            if hasattr(part, "image_url"):
                img_url = part.image_url.url
                if img_url.startswith("data:image"):
                    _, b64 = img_url.split(",", 1)
                    img_data = base64.b64decode(b64)
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    _verify_dimensions(output_path, size)
                    print(f"  ✓ 已保存 (via chat): {output_path}")
                    return True
        print("  ✗ 响应中未找到图像数据")
        return False
    except Exception as e:
        print(f"  ✗ chat completions 也失败: {e}")
        return False


def list_models():
    """列出 OpenRouter 上所有模型（重点关注图像生成支持）"""
    import requests
    r = requests.get(
        "https://openrouter.ai/api/v1/models",
        headers={"Authorization": f"Bearer {_read_key()}"}
    )
    data = r.json()
    models = data.get("data", [])

    # 先显示疑似图像生成模型（关键词过滤）
    keywords = ["image", "gemini", "flux", "nano", "banana", "dall", "stable", "imagen"]
    image_models = [m for m in models if any(kw in m.get("id", "").lower() for kw in keywords)]
    print(f"\n★ 候选图像生成模型（关键词命中，共 {len(image_models)} 个）：")
    for m in image_models:
        print(f"  {m['id']:60s}")

    # 再显示全部模型供手工查找
    print(f"\n★ 全部模型列表（共 {len(models)} 个，请手工搜索 Nano Banana / Gemini）：")
    for m in models:
        print(f"  {m['id']}")


# ── Prompts 数据库 ────────────────────────────────────────────────────────────

# 通用样式前缀（追加到每条 prompt 末尾）
STYLE_SUFFIX = (
    "\n\n样式要求：专业学术科学插图，清晰的英文/中文标注，"
    "白色或极浅灰背景，矢量插画风格，高细节。"
    "配色方案：以深青蓝(#1a5276)、草绿(#27ae60)、暖琥珀(#e67e22)为主，"
    "搭配浅灰辅色，避免过度饱和。"
    "不含水印、无装饰性边框、无 lorem ipsum 占位文字。"
)

# P01 — 5 个场景展示图（4:3，2048×1536）
P01_PROMPTS = {
    "p01-s4-01-water": {
        "size": "2048x1536",
        "prompt": (
            "环境工程示意图，科技蓝色调，白色背景。\n"
            "主题：城市污水处理工艺流程。\n"
            "内容：从左到右线性流程，7 个节点：\n"
            "① 进水格栅（去除大颗粒杂物）→ ② 沉砂池（去除砂粒，停留15min）"
            "→ ③ 初沉池（去除悬浮物 60%）→ ④ 曝气池·活性污泥法（BOD去除92%）"
            "→ ⑤ 二沉池（污泥回流）→ ⑥ 过滤+紫外消毒 → ⑦ 达标排放（GB18918 一级A）。\n"
            "每节点配专业图标，节点间用粗蓝色箭头，标注关键去除指标和停留时间。"
            "左侧输入显示原水水质（COD 350mg/L，SS 280mg/L）。"
            "右侧输出显示出水水质（COD ≤50mg/L）。"
            "底部显示污泥处理支线（浓缩→消化→脱水→填埋）。"
        ) + STYLE_SUFFIX
    },
    "p01-s4-02-carbon": {
        "size": "2048x1536",
        "prompt": (
            "生态系统概念图，科普风格，绿棕配色。\n"
            "主题：温带森林生态系统碳循环机制。\n"
            "场景：横向剖面图，左侧大气层，中央高大乔木，右侧土壤剖面。\n"
            "碳通量箭头（宽度按量级比例）：\n"
            "• 大气 CO₂（415 ppm）→ 光合作用 → 植物（GPP = 120 GtC/yr）\n"
            "• 植物呼吸 → 大气（60 GtC/yr）\n"
            "• 凋落物 → 土壤有机碳（SOC）\n"
            "• 土壤微生物分解 → 大气（呼吸 60 GtC/yr）\n"
            "• 森林净固碳 NEP = 2.6 GtC/yr（标注为净碳汇）\n"
            "自然主义绿色植被，棕色土壤层次（0-20cm，20-60cm，>60cm标注有机碳含量）。"
            "箭头用数值标注通量大小，重要通量高亮。"
        ) + STYLE_SUFFIX
    },
    "p01-s4-03-remote": {
        "size": "2048x1536",
        "prompt": (
            "技术流程图，深色蓝紫科技风格（深色背景 #1a1a2e，文字浅色）。\n"
            "主题：遥感影像地表覆被分类分析流程。\n"
            "竖向流程（从上到下），7 步：\n"
            "① 卫星影像获取（Landsat-9 / Sentinel-2，图标：卫星）\n"
            "→ ② 大气校正（6S模型/FLAASH，去除气溶胶散射）\n"
            "→ ③ 几何精校正（RMS < 0.5 pixel，图标：坐标网格）\n"
            "→ ④ 特征提取（NDVI, EVI, MNDWI, 纹理特征，图标：光谱曲线）\n"
            "→ ⑤ 随机森林分类（OOB accuracy 94.2%，图标：决策树）\n"
            "→ ⑥ 精度评估（混淆矩阵，Kappa=0.91，图标：矩阵表格）\n"
            "→ ⑦ 专题图产品输出（6类地物：林地/草地/农田/水体/建设/裸地）\n"
            "每步用圆角矩形节点，配小图标，标注工具名（ENVI/Google Earth Engine）。"
            "节点间用渐变箭头，整体深色科技感，蓝紫色主调。"
        ) + STYLE_SUFFIX
    },
    "p01-s4-04-micro": {
        "size": "2048x1536",
        "prompt": (
            "环境科学示意图，蓝绿配色，自然风格，白色背景。\n"
            "主题：微塑料从陆地污染源到海洋深处的迁移路径。\n"
            "场景：横向景观剖面图（从左岸到右海），展示：\n"
            "左：城市区域 — 塑料垃圾、工厂排放（微塑料源头，用🔴标记污染点）\n"
            "中：陆地迁移 — 风化碎裂（UV降解示意）→ 地表径流 → 土壤渗漏（剖面显示土层微塑料）\n"
            "→ 地下水传输 → 河流携带（流速箭头）\n"
            "右：近海与深海 — 河口汇聚 → 表层海水漂浮 → 沉降深海积累（深蓝色梯度）\n"
            "关键标注：\n"
            "• 微塑料尺寸分类（1-5mm碎片，<1mm纤维，<100μm颗粒）\n"
            "• 各段迁移速率（径流：15km/d，河流：30-80km/d）\n"
            "• 采样热点位置（共5个，用星形标记）\n"
            "• 积累热点（近海表层+深海沉积物）\n"
            "使用蓝绿渐变从陆地到海洋，微塑料用橙色小颗粒表示，路径用流线箭头。"
        ) + STYLE_SUFFIX
    },
    "p01-s4-05-eco": {
        "size": "2048x1536",
        "prompt": (
            "学术综述框架图，绿色主调，白色背景。\n"
            "主题：森林生态系统服务价值评估框架。\n"
            "布局：同心圆/四象限混合布局，中心为'温带森林生态系统'圆形图标（绿色森林剪影）。\n"
            "四个象限，每象限一类服务：\n"
            "① 供给服务（左上，浅绿 #a8e6a3）：木材（150 m³/ha/yr）、淡水供给、食物（蘑菇/浆果）、遗传资源\n"
            "② 调节服务（右上，深绿 #27ae60）：碳封存（$240/tC）、气候调节、水文调节（洪峰削减30%）、空气净化\n"
            "③ 文化服务（右下，青绿 #1abc9c）：休闲旅游（$320/ha/yr）、科研教育、精神美学价值\n"
            "④ 支撑服务（左下，橄榄绿 #7f8c2e）：土壤形成、营养物循环、初级生产（NPP）、生物多样性\n"
            "外圈：服务流向社会箭头，标注年度总价值（$12,100/ha/yr）。\n"
            "每类服务配代表性小图标，各象限间有关联箭头体现服务协同效应。"
        ) + STYLE_SUFFIX
    },
}

# P02 — 好差对比 + 迭代时间线（4:3，2048×1536）

# 最小图片格式后缀（用于"差图"和"早期迭代图"）
# ⚠️ 这些图不要求专业样式，但必须确保 API 返回实际 2K 光栅图片
MIN_FORMAT_SUFFIX = (
    "\n\n请生成一张 2048×1536 像素的彩色图像（JPEG/PNG），"
    "白色或浅色背景，包含可识别的图表内容。"
)

# 差 Prompt 图（故意模糊，演示 AI 生成质量差的原因）
# ⚠️ 使用 MIN_FORMAT_SUFFIX 而非 STYLE_SUFFIX：需要真实图片，但刻意不追求专业样式
P02_BAD_PROMPTS = {
    "p02-bad-01-watershed": {
        "size": "2048x1536",
        "prompt": (
            "水质监测流程图，蓝色，好看。\n"
            "效果应体现模糊 prompt 的典型 AI 输出：视觉花哨但内容混乱，"
            "缺少具体采样方法和指标名称，标注模糊，色彩过于鲜艳，布局松散。"
        ) + MIN_FORMAT_SUFFIX
    },
    "p02-bad-02-soil": {
        "size": "2048x1536",
        "prompt": (
            "土壤修复示意图，显示重金属去除，科学风格。\n"
            "效果应体现模糊 prompt 的典型问题：过于简化，无具体修复机制名称，"
            "箭头方向不明确，无定量数据，配色随意，整体像示意草图。"
        ) + MIN_FORMAT_SUFFIX
    },
    "p02-bad-03-atmo": {
        "size": "2048x1536",
        "prompt": (
            "PM2.5来源分析圆形图，包含工业、交通和其他来源。\n"
            "效果应体现模糊 prompt 的典型问题：仅3类来源，百分比缺失，"
            "无化学示踪物，配色不专业，整体效果像 PPT 默认图表。"
        ) + MIN_FORMAT_SUFFIX
    },
}

# 好 Prompt 图（完整 CDTF，演示高质量输出）
P02_GOOD_PROMPTS = {
    "p02-good-01-watershed": {
        "size": "2048x1536",
        "prompt": (
            "环境工程流程图，白色背景，学术风格，为 Environmental Pollution 期刊制作。\n"
            "[Context] 中国南方流域（珠江支流）水质综合监测体系，服务于水污染溯源研究。\n"
            "[Description] 从左到右线性流程：\n"
            "采样点布设（网格法，3km间距，共42个监测点，附平面分布小图）\n"
            "→ 现场理化测定（pH 7.2±0.3，DO 8.1mg/L，EC 245μS/cm，水温19.6°C，用便携式仪器图标）\n"
            "→ 样品保存运输（4°C冷藏，<24h送检，无菌玻璃瓶图标）\n"
            "→ 实验室分析（重金属ICP-MS检测Cd/Pb/As/Cr；营养盐分光光度法NH₄⁺/NO₃⁻/TP；有机物GC-MS半挥发性有机物）\n"
            "→ 数据质控（平行样RSD<5%，加标回收率92-108%，空白对照）\n"
            "→ 报告输出（地理信息热力图+时间序列趋势图）\n"
            "[Technique] 从左到右线性流程，每步配对应科学仪器精确图标，蓝绿配色（蓝=#2980b9，绿=#27ae60），\n"
            "连接箭头粗实线，关键指标在节点下方以灰色小字标注，整体留白充裕，无背景装饰。\n"
            "[Format] 2K分辨率 2048×1536px，300 DPI，RGB色彩空间，PNG格式，学术出版级别。"
        ) + STYLE_SUFFIX
    },
    "p02-good-02-soil": {
        "size": "2048x1536",
        "prompt": (
            "土壤剖面剖视科学插图，白色背景，Nature系列期刊风格。\n"
            "[Context] EDTA辅助植物修复重金属污染土壤机制，投稿 Science of The Total Environment。\n"
            "[Description] 垂直剖面图（上部植被，下部土壤层），从上到下展示：\n"
            "• 地上部分：向日葵（超积累植物，叶片Cd积累量标注8.2 mg/kg DW），EDTA溶液喷施示意\n"
            "• 0-20cm耕作层：EDTA与土壤中游离态Cd²⁺/Pb²⁺螯合（分子结构简图，形成EDTA-Cd/Pb螯合物，增强植物可利用性+65%）\n"
            "• 根系区：主动吸收螯合物的根毛（放大圆圈细节，标注转运蛋白HMA4），韧皮部向上运输箭头\n"
            "• 20-40cm犁底层：重金属锁定区（红色危险标记，Pb 487mg/kg，高于背景值30倍）\n"
            "• >40cm底土：清洁层（绿色）\n"
            "• 右侧：修复效率数据框（3次种植循环后Cd去除率78%，Pb去除率54%，土壤pH维持6.0-6.5）\n"
            "[Technique] 土壤层次清晰（颜色从深棕渐变至黄褐），植物根系细节丰富，\n"
            "化学符号和分子式标注清晰，箭头方向明确表示物质流向，绿色植物+棕色土壤主调。\n"
            "[Format] 2K分辨率，300DPI，白色背景，学术图表标准。"
        ) + STYLE_SUFFIX
    },
    "p02-good-03-atmo": {
        "size": "2048x1536",
        "prompt": (
            "受体模型来源解析结果可视化，白色背景，Atmospheric Environment 期刊风格。\n"
            "[Context] 中国华北工业城市（邯郸市）PM2.5来源解析，PMF正矩阵因子分解模型结果，2023年采样数据。\n"
            "[Description] 双图组合布局：\n"
            "左侧主图：饼图，6个来源精确占比：\n"
            "• 工业源 35%（钢铁/化工/电力，色=#7f8c8d灰）\n"
            "• 交通排放 28%（机动车尾气+轮胎磨损，色=#e74c3c红）\n"
            "• 扬尘源 18%（道路/建筑/农业扬尘，色=#d4a017棕黄）\n"
            "• 生物质燃烧 9%（秸秆燃烧，色=#8e44ad紫）\n"
            "• 二次生成 8%（SO₄²⁻/NO₃⁻二次颗粒，色=#3498db蓝）\n"
            "• 其他 2%（色=#95a5a6浅灰）\n"
            "右侧：各来源化学示踪物展开面板（每来源一行）：\n"
            "• 交通：BC/EC比值=3.2，Pb，Sb（刹车）\n"
            "• 工业：V，Ni（燃油），As，Se（燃煤），Mn，Zn（冶炼）\n"
            "• 扬尘：Si，Al，Ca，Fe（地壳元素）\n"
            "• 二次：高水溶性离子 SO₄²⁻占PM2.5的23%，NO₃⁻占18%\n"
            "[Technique] 左右双栏布局，配色与来源一一对应，右侧化学标注用等宽字体，\n"
            "整体干净专业，数据精确，符合顶刊标准。\n"
            "[Format] 2K分辨率，300DPI，白色背景，学术出版级。"
        ) + STYLE_SUFFIX
    },
}

# P02 — 迭代时间线：湿地生态系统服务框架图 v1~v4
P02_ITER_PROMPTS = {
    "p02-iter-v1-wetland": {
        "size": "2048x1536",
        "prompt": (
            "【迭代 v1 — 初始草稿，质量较低】\n"
            "一张简陋的湿地生态系统服务评估框架图（AI 第一版输出风格）：\n"
            "• 布局混乱：四类服务用大小不一的矩形随意堆放，未对齐，间距不统一\n"
            "• 字体单一：所有文字相同大小（12pt），没有标题层级\n"
            "• 配色随机：使用饱和度极高的默认红/黄/绿/蓝，缺乏专业感\n"
            "• 没有图标，只有文字标签\n"
            "• 中心'湿地生态系统'文字用普通矩形框\n"
            "• 连接线用细黑线，方向不统一\n"
            "• 整体像 Word 文档中手绘的初稿\n"
            "四类服务文字：调节服务/供给服务/文化服务/支撑服务，各有2-3个子项文字。"
        ) + MIN_FORMAT_SUFFIX
    },
    "p02-iter-v2-wetland": {
        "size": "2048x1536",
        "prompt": (
            "【迭代 v2 — 加入配色，中等质量】\n"
            "湿地生态系统服务评估框架图（AI 第二版，有改进但仍有问题）：\n"
            "• 布局：对称的四象限布局，比 v1 整齐，但间距仍显拥挤\n"
            "• 配色：四类服务有了颜色区分（调节=深绿，供给=浅绿，文化=青绿，支撑=灰绿），\n"
            "  但饱和度偏高，不够专业，与出版标准有差距\n"
            "• 加入了简单图标，但风格不统一（有些是 emoji 风格，有些是线条风格）\n"
            "• 字体有两种大小（标题16pt，正文11pt），仍无第三层级\n"
            "• 中心圆形'湿地生态系统'，颜色过于鲜艳\n"
            "• 无定量数值，只有文字描述\n"
            "整体看起来比 v1 好，但仍不符合顶刊投稿要求。"
        ) + MIN_FORMAT_SUFFIX
    },
    "p02-iter-v3-wetland": {
        "size": "2048x1536",
        "prompt": (
            "【迭代 v3 — 细节完善，接近出版质量】\n"
            "湿地生态系统服务评估框架图（AI 第三版，较为精良）：\n"
            "• 布局：清晰的四象限，白色背景，充裕的留白，元素间距均匀\n"
            "• 配色：降低饱和度（调节深绿=#1B5E20，供给浅绿=#4CAF50，文化青绿=#80CBC4，支撑灰绿=#B2DFDB），\n"
            "  专业克制，接近顶刊标准\n"
            "• 图标风格统一（简洁线条图标），每类3个子服务各有专属图标\n"
            "  调节：(碳封存图标)(洪水控制)(水质净化)\n"
            "  供给：(鱼类图标)(芦苇)(淡水)\n"
            "  文化：(观鸟)(科研)(教育)\n"
            "  支撑：(土壤)(营养循环)(候鸟栖息地)\n"
            "• 三级字体（标题18pt粗体，服务名14pt，子项10pt灰色）\n"
            "• 缺少定量价值标注，中英文混排尚不完美\n"
            "整体已接近学术图表标准，但还需最终润色。"
        ) + STYLE_SUFFIX
    },
    "p02-iter-v4-wetland": {
        "size": "2048x1536",
        "prompt": (
            "【迭代 v4 — 出版级最终成果】\n"
            "湿地生态系统服务评估框架图（最终版，Nature投稿标准）：\n"
            "• 布局：精美的同心圆四象限融合布局\n"
            "  中心圆：'Wetland Ecosystem'（绿色湿地地图轮廓图标，直径约25%图幅）\n"
            "  四个扇形象限对称分布，每象限独立色调\n"
            "• 配色专业克制：\n"
            "  调节 Regulating=#1B5E20（深绿），供给 Provisioning=#4CAF50（中绿）\n"
            "  文化 Cultural=#80CBC4（青绿），支撑 Supporting=#B2DFDB（浅青）\n"
            "• 定量价值标注（外圈标注年经济价值）：\n"
            "  调节 $8,460/ha/yr · 供给 $1,240/ha/yr · 文化 $320/ha/yr · 支撑 $2,100/ha/yr\n"
            "  总价值 $12,120/ha/yr（圆形外圈标注）\n"
            "• 服务流向箭头：从湿地中心辐射到人类福祉图标（简洁人形图标）\n"
            "• 图题：'Wetland Ecosystem Services Framework'（14pt粗体，图下方）\n"
            "• 脚注：'Values in $/ha/yr (2023 USD). Source: MA (2005) framework.'（9pt灰色）\n"
            "• 无水印，白色背景，300 DPI，符合 Nature/Science 投稿规范。"
        ) + STYLE_SUFFIX
    },
}

# P06 — 案例图（4 张）
P06_PROMPTS = {
    "p06-case1-draft": {
        "size": "2048x1152",   # 16:9，GA 格式
        "prompt": (
            "流域重金属污染 Graphical Abstract 草图（AI 初始生成，未精修版本）：\n"
            "主题：'流域尺度重金属污染源解析与治理' GA 第一版 AI 生成输出。\n"
            "内容：显示一个流域横截面，包含：\n"
            "• 左侧污染源区（采矿/冶炼工厂图标，废水排放箭头）\n"
            "• 中部河流（Cd²⁺/Pb²⁺离子符号随水流传输）\n"
            "• 右侧农田/村庄（重金属污染的土壤，农作物受影响）\n"
            "• 底部：3种治理措施（植物修复/电动力修复/固化稳定化）小图标\n"
            "质量特征：轮廓清晰但细节粗糙，标注文字有少量乱码（如英文字母顺序错误），\n"
            "配色略显随意，整体是'能看但需精修'的 AI 初稿感。\n"
            "格式：16:9横向布局，浅色背景，重金属用橙红色表示。"
        )
    },
    "p06-case1-final-ga": {
        "size": "2048x1152",   # 16:9，GA 格式
        "prompt": (
            "流域重金属污染治理 Graphical Abstract 精修终稿（出版级，Nature期刊标准）：\n"
            "主题：'流域尺度重金属污染源解析与修复' — Environmental Science & Technology 图形摘要。\n"
            "布局：16:9横向，三段式结构：\n"
            "① 左 1/3 — 问题诊断：流域卫星俯视图（简化线描），标注5个重金属监测站，\n"
            "  空间污染热力色图（红色高污染区，绿色清洁区），Cd浓度1.2mg/kg（超标4倍）\n"
            "② 中 1/3 — 机制解析：污染源贡献饼图（采矿41%，冶炼29%，农业面源18%，其他12%），\n"
            "  正矩阵因子分解PMF模型示意，化学示踪物箭头\n"
            "③ 右 1/3 — 治理方案：三种原位修复技术对比（植物提取效率78%，石灰钝化效率65%，\n"
            "  微生物修复效率45%），绿色恢复后土壤示意\n"
            "图题：'Source Identification and Remediation of Heavy Metal Contamination in Watershed Soils'\n"
            "配色：专业蓝绿色调（污染红/橙，治理绿/蓝），无衬线字体，所有文字清晰可读。\n"
            "品质：可直接用于期刊投稿的出版级别，300 DPI，RGB。"
        ) + STYLE_SUFFIX
    },
    "p06-case2-microplastic": {
        "size": "2048x1536",   # 4:3
        "prompt": (
            "微塑料迁移路径实验方法示意图（出版级，Environmental Pollution 期刊）：\n"
            "主题：微塑料从陆源到海洋的迁移路径及采样方法体系。\n"
            "布局：从上到下纵向叙事，4个场景层次：\n"
            "① 源头识别层（顶部）：城市垃圾场、工业废水排口、农业地膜（3个污染源图标），\n"
            "  微塑料类型表格（PE碎片/PET纤维/PS颗粒，粒径分布0.5-5mm）\n"
            "② 陆地迁移层：雨水径流路径（蓝色箭头），土壤剖面（显示微塑料在20cm和40cm深度分布），\n"
            "  地下水传输（虚线路径），迁移速率标注\n"
            "③ 水体传输层：河流横截面（表层漂浮+悬浮态+沉积态三个分布区），\n"
            "  水样采样方法（托罗网，500μm筛网，采样量50L），沉积物采集方法（抓斗式采样器）\n"
            "④ 海洋汇集层（底部）：近海（颗粒聚集，0.05 items/m³）→ 深海（沉积物累积，35000 items/kg）\n"
            "右侧竖向：5个采样点位图标（S1-S5），每点标注经纬度和对应采样方法。\n"
            "配色：蓝色系水体，棕色土壤，橙色微塑料颗粒，绿色陆地。\n"
            "风格：精确、清晰，符合 Environmental Pollution 投稿规范，300DPI RGB。"
        ) + STYLE_SUFFIX
    },
    "p06-case3-carbon": {
        "size": "2048x1536",   # 4:3
        "prompt": (
            "森林生态系统碳汇与服务价值综述概念图（出版级，Global Change Biology期刊）：\n"
            "主题：'温带针阔混交林碳固持功能与生态系统服务价值综合评估' 综述框架图。\n"
            "布局：同心圆层级概念图，适合双栏页面（176mm宽）：\n"
            "最内圈：温带针阔混交林生态系统（林冠剖面剪影图，树种：云杉+桦树）\n"
            "第二圈：5个核心生态过程（扇形分割）：\n"
            "  • 光合碳固定（GPP 987 gC/m²/yr）\n"
            "  • 呼吸碳释放（R_eco 612 gC/m²/yr）\n"
            "  • 凋落物分解（枯落物量 310 gC/m²/yr）\n"
            "  • 土壤碳储量（SOC 12.4 kgC/m²，深度100cm）\n"
            "  • 净生态系统生产量（NEP 375 gC/m²/yr = 碳汇！）\n"
            "第三圈：4类生态系统服务（带价值估算）：\n"
            "  调节（碳汇价值 $1,560/ha/yr · 水文调节 $840/ha/yr）\n"
            "  供给（木材 $2,200/ha/yr · 非木材林产品 $180/ha/yr）\n"
            "  文化（生态旅游 $420/ha/yr · 科学价值 $90/ha/yr）\n"
            "  支撑（生物多样性 $680/ha/yr · 土壤保持 $320/ha/yr）\n"
            "最外圈：政策含义（碳交易市场、REDD+机制、生态补偿政策3个箭头指向外部）\n"
            "配色：绿色系为主（内深外浅），碳通量用箭头粗细表示量级，数值标注清晰。\n"
            "图题（底部）：'Carbon sequestration and ecosystem services in temperate mixed forests'\n"
            "尺寸规格：176mm × 220mm实际印刷尺寸，300DPI，CMYK转RGB，出版级。"
        ) + STYLE_SUFFIX
    },
}

# ── 生成批次定义 ──────────────────────────────────────────────────────────────

BATCHES = {
    "p01": {
        "dir": OUTPUT_BASE / "m2-p01",
        "prompts": P01_PROMPTS,
        "desc": "P01 — 5 个场景展示图",
    },
    "p02_bad": {
        "dir": OUTPUT_BASE / "m2-p02",
        "prompts": P02_BAD_PROMPTS,
        "desc": "P02 — 3 张差 Prompt 示例图",
    },
    "p02_good": {
        "dir": OUTPUT_BASE / "m2-p02",
        "prompts": P02_GOOD_PROMPTS,
        "desc": "P02 — 3 张好 Prompt 示例图",
    },
    "p02_iter": {
        "dir": OUTPUT_BASE / "m2-p02",
        "prompts": P02_ITER_PROMPTS,
        "desc": "P02 — 4 步迭代时间线图",
    },
    "p06": {
        "dir": OUTPUT_BASE / "m2-p06",
        "prompts": P06_PROMPTS,
        "desc": "P06 — 4 张案例研究图",
    },
}

# ── 主程序 ────────────────────────────────────────────────────────────────────

def run_batch(batch_name: str, dry_run: bool = False):
    """生成一个批次的图片"""
    if batch_name not in BATCHES:
        print(f"✗ 未知批次: {batch_name}，可选: {list(BATCHES.keys())}")
        return

    batch = BATCHES[batch_name]
    print(f"\n{'='*60}")
    print(f"批次: {batch['desc']}")
    print(f"{'='*60}")

    successes = []
    failures = []

    for key, cfg in batch["prompts"].items():
        output_path = batch["dir"] / f"{key}.jpg"
        if output_path.exists():
            print(f"  [跳过] {key}.jpg 已存在")
            continue

        ok = generate_image(
            prompt=cfg["prompt"],
            size=cfg["size"],
            output_path=output_path,
            dry_run=dry_run,
        )

        if ok:
            successes.append(key)
        else:
            failures.append(key)

        if not dry_run and not BATCH_MODE:
            input("  → 按 Enter 继续下一张（Ctrl+C 中断）...")

        time.sleep(1)  # 请求间隔，避免限流

    print(f"\n✓ 成功: {len(successes)} 张")
    if failures:
        print(f"✗ 失败: {len(failures)} 张 → {failures}")


def test_single():
    """测试单张图片生成（用 p01 第1张）"""
    print("★ 测试模式：仅生成 1 张图片")
    cfg = P01_PROMPTS["p01-s4-01-water"]
    out = OUTPUT_BASE / "m2-p01" / "p01-s4-01-water.jpg"
    generate_image(cfg["prompt"], cfg["size"], out)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法:")
        print("  python generate.py test          → 测试生成 1 张图")
        print("  python generate.py list_models   → 列出可用模型")
        print("  python generate.py dry_run       → 预览所有生成任务（不实际调用 API）")
        print("  python generate.py p01           → 生成 p01 批次（5 张）")
        print("  python generate.py p02_bad       → 生成 p02 差图（3 张）")
        print("  python generate.py p02_good      → 生成 p02 好图（3 张）")
        print("  python generate.py p02_iter      → 生成 p02 迭代图（4 张）")
        print("  python generate.py p06           → 生成 p06 案例图（4 张）")
        sys.exit(0)

    cmd = sys.argv[1]

    if cmd == "test":
        test_single()
    elif cmd == "list_models":
        list_models()
    elif cmd == "dry_run":
        for batch_name in BATCHES:
            run_batch(batch_name, dry_run=True)
    else:
        run_batch(cmd)
```

- [ ] **Step 1.4：验证脚本语法**

```bash
cd E:\Claude-project\fig-nanobanana
python generate.py --help 2>&1 | head -5
# 或
python -c "import generate; print('OK')"
```

Expected: 打印用法帮助或"OK"，无 SyntaxError。

- [ ] **Step 1.5：列出 OpenRouter 可用图像模型**

```bash
python generate.py list_models
```

Expected: 输出 Gemini / FLUX 等支持图像的模型列表。
**关键步骤**：找到正确的 Nano Banana 2 model ID（Gemini image gen），更新 `generate.py` 第 20 行的 `MODEL_ID`。

- [ ] **Step 1.6：测试生成 1 张图**

```bash
python generate.py test
```

Expected:
- `E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-01-water.jpg` 文件存在
- 文件大小 > 100KB
- 控制台显示 `✓ 已保存`

若报错 `images API` 失败但 chat completions 成功 → 两路备用方案已生效，继续。
若两路均失败 → 检查 MODEL_ID 是否支持图像生成，尝试 `list_models` 中的备用 FLUX 模型。

- [ ] **Step 1.7：用 Claude 视觉模态 review 测试图**

打开 `E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-01-water.jpg`，Claude 用 Read 工具读取并 review：

**Review 标准（必须全部达到才算 Pass）：**
1. ✅ 图像清晰，无像素化或模糊
2. ✅ 内容：城市污水处理工艺流程（进水→多级处理→出水），7个节点可识别
3. ✅ 科学性：箭头方向正确，处理单元有标注
4. ✅ 风格：白色或浅色背景，蓝色调为主，学术专业感
5. ✅ 没有明显乱码文字或拼写错误
6. ✅ 分辨率：文件尺寸对应 2K 级别（≥800KB 的 JPEG 通常为 2K+）

若 Fail：调整 `P01_PROMPTS["p01-s4-01-water"]["prompt"]` 中的具体描述，重新生成（删除旧文件后重跑）。

- [ ] **Step 1.8：记录测试结果到 review_log.md**

创建 `E:\Claude-project\fig-nanobanana\review_log.md`：

```markdown
# Phase 5.5 图片 Review 日志

## 测试阶段

| 文件 | 状态 | Review 摘要 | 生成时间 |
|------|------|------------|----------|
| p01-s4-01-water.jpg | [PASS/FAIL] | ... | 2026-03-10 |
```

---

## Chunk 2：P01 批量生成（5 张场景图）

### Task 2：生成 p01 全部 5 张场景图并 Review

**Files:**
- Create: `E:\Claude-project\fig-nanobanana\generated\m2-p01\*.jpg` (5 files)

> ⚠️ 成本提示：p01 共 5 张，约消耗 5 次 API 调用。在生成前确认 Step 1.6 测试已通过。

- [ ] **Step 2.1：dry_run 预览**

```bash
cd E:\Claude-project\fig-nanobanana
python generate.py dry_run 2>&1 | grep "p01"
```

Expected: 显示 5 行预览（文件名+尺寸+prompt 摘要）。

- [ ] **Step 2.2：生成 p01 批次（第1张已在 Task 1 生成，跳过）**

```bash
python generate.py p01
```

Expected: 生成 4 张新图（p01-s4-02~05），第1张自动跳过（已存在）。

- [ ] **Step 2.3：Review 5 张图（Claude 视觉模态）**

依次用 Read 工具读取以下文件，按 Review 标准逐张检查：

```
E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-01-water.jpg
E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-02-carbon.jpg
E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-03-remote.jpg
E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-04-micro.jpg
E:\Claude-project\fig-nanobanana\generated\m2-p01\p01-s4-05-eco.jpg
```

**各图 Review 要点：**

| 图片 | 主要检查点 |
|------|-----------|
| 01-water | 7步流程节点清晰，蓝色调，无乱码 |
| 02-carbon | 大气-植物-土壤三层清晰，通量箭头可见 |
| 03-remote | 深色背景，7步竖向流程，卫星图标可识别 |
| 04-micro | 横向景观，迁移路径从左(陆地)到右(海洋)清晰 |
| 05-eco | 同心圆或四象限布局，4类服务可区分，绿色主调 |

失败的图：删除文件 → 调整对应 prompt → 重新生成该图。每次 retry 记录到 review_log.md。

- [ ] **Step 2.4：更新 review_log.md**

在 review_log.md 中补充 p01 全部 5 张的 review 结果。

- [ ] **Step 2.5：Commit（仅代码，不含图片）**

```bash
cd E:\Claude-project\fig-nanobanana
git init 2>/dev/null || true
git add generate.py review_log.md
git commit -m "feat: Phase 5.5 生成脚本 + p01 prompts"
```

---

## Chunk 3：P02 批量生成（10 张对比+迭代图）

### Task 3：生成 p02 好差对比图（6 张）

**Files:**
- Create: `E:\Claude-project\fig-nanobanana\generated\m2-p02\p02-bad-*.jpg` (3 files)
- Create: `E:\Claude-project\fig-nanobanana\generated\m2-p02\p02-good-*.jpg` (3 files)

> ⚠️ 成本提示：6 次 API 调用。确认 p01 review 全部 pass 后继续。

- [ ] **Step 3.1：生成差图批次**

```bash
cd E:\Claude-project\fig-nanobanana
python generate.py p02_bad
```

Expected: 3 个 `p02-bad-*.jpg` 文件生成。

- [ ] **Step 3.2：Review 差图**

差图 review 标准（与普通图相反）：
1. ✅ 图像可看清基本内容（不是纯噪音）
2. ✅ 视觉上有明显的"不专业感"（松散布局/过于鲜艳/标注模糊）
3. ✅ 与好图形成对比时，差距明显可见
4. ✅ 分辨率达标（不是低分辨率模糊，只是内容质量差）

若差图生成的反而很好看 → 在 prompt 中加强"不专业感"的描述，重新生成。

- [ ] **Step 3.3：生成好图批次**

```bash
python generate.py p02_good
```

Expected: 3 个 `p02-good-*.jpg` 文件生成。

- [ ] **Step 3.4：Review 好图（高标准）**

| 图片 | 检查点 |
|------|--------|
| good-01-watershed | 从左到右6步流程，有仪器图标，蓝绿配色，指标标注清晰 |
| good-02-soil | 土壤剖面竖向，植物+根系详细，化学符号标注正确 |
| good-03-atmo | 左饼图+右来源展开，6个来源百分比可见，配色与来源对应 |

- [ ] **Step 3.5：好差对比视觉确认**

同时查看每组的 bad/good 对：

1. `p02-bad-01-watershed.jpg` vs `p02-good-01-watershed.jpg`
2. `p02-bad-02-soil.jpg` vs `p02-good-02-soil.jpg`
3. `p02-bad-03-atmo.jpg` vs `p02-good-03-atmo.jpg`

确认：对比鲜明，差距直观可见。若某组对比不明显 → 调整 prompt 重新生成。

### Task 4：生成 p02 迭代时间线图（4 张）

**Files:**
- Create: `E:\Claude-project\fig-nanobanana\generated\m2-p02\p02-iter-v*.jpg` (4 files)

- [ ] **Step 4.1：生成迭代批次**

```bash
cd E:\Claude-project\fig-nanobanana
python generate.py p02_iter
```

Expected: 4 个 `p02-iter-v*.jpg` 文件生成。

- [ ] **Step 4.2：Review 4 张迭代图（关键：渐进提升感）**

| 图片 | 检查点 |
|------|--------|
| iter-v1 | 布局混乱，字体单一，配色随机，像草稿 |
| iter-v2 | 有颜色区分，布局稍整齐，但仍不专业 |
| iter-v3 | 图标统一，字体层级好，接近专业水准 |
| iter-v4 | 同心圆布局，有价值数据，图题，出版级别 |

**关键要求**：v1→v2→v3→v4 有明显的视觉进步感，放在一排时能看出"从差到好"的渐进。
若某版本与相邻版本视觉差异不明显 → 重新生成该版本，加大 prompt 中的差异化描述。

- [ ] **Step 4.3：更新 review_log.md，记录 p02 全部 10 张结果**

- [ ] **Step 4.4：Commit**

```bash
cd E:\Claude-project\fig-nanobanana
git add generated/ review_log.md
git commit -m "feat: Phase 5.5 p02 对比图+迭代图生成完成"
```

---

## Chunk 4：P06 批量生成（4 张案例图）

### Task 5：生成 p06 案例研究图（4 张）

**Files:**
- Create: `E:\Claude-project\fig-nanobanana\generated\m2-p06\*.jpg` (4 files)

> ⚠️ 成本提示：4 次 API 调用。p06 图片要求最高（出版级），请仔细 review。

- [ ] **Step 5.1：生成 p06 批次**

```bash
cd E:\Claude-project\fig-nanobanana
python generate.py p06
```

Expected: 4 个 p06 图片文件生成。

- [ ] **Step 5.2：Review p06 图（严格标准）**

| 图片 | 尺寸 | 检查点 |
|------|------|--------|
| case1-draft.jpg | 16:9 | 有"AI初稿"感，流域横截面可识别，轮廓清晰但细节粗糙 |
| case1-final-ga.jpg | 16:9 | 三段式布局（问题+机制+治理），数据标注清晰，出版级别 |
| case2-microplastic.jpg | 4:3 | 4层纵向结构，迁移路径从上(源头)到下(海洋)完整 |
| case3-carbon.jpg | 4:3 | 同心圆层级图，5个生态过程+4类服务+价值数据清晰 |

**特别注意**：
- `case1-draft` vs `case1-final-ga` 之间的质量差距要明显（体现精修价值）
- 16:9 图片的宽高比要正确（视觉上明显横向）
- 中英文标注不得乱码

- [ ] **Step 5.3：若某张图不合格，调整 prompt 重生成**

策略：
1. 删除不合格图片
2. 在 `generate.py` 对应 prompt 中增加更具体的描述
3. 重新运行 `python generate.py p06`（已存在的自动跳过）
4. 最多重试 3 次，若仍不满意：降低期望，接受当前最好版本，在 review_log 记录待优化

- [ ] **Step 5.4：更新 review_log.md，记录全部 23 张的最终状态**

review_log.md 最终格式：
```markdown
# Phase 5.5 图片 Review 日志

## 最终清单（23 张）

| 文件 | 批次 | 状态 | Review 摘要 | 重生成次数 |
|------|------|------|------------|-----------|
| p01-s4-01-water.jpg | p01 | ✅ PASS | 流程7步清晰，蓝色调 | 0 |
| ... | | | | |
```

- [ ] **Step 5.5：Commit**

```bash
cd E:\Claude-project\fig-nanobanana
git add generated/ review_log.md prompts_reference.md
git commit -m "feat: Phase 5.5 全部 23 张图生成并 review 通过"
```

---

## Chunk 5：图片部署与占位符替换

### Task 6：复制图片到项目目录

**Files:**
- Create dir: `E:\Claude-project\sci-aesthetic\public\assets\m2\`
- Copy: 23 张 jpg 文件

- [ ] **Step 6.1：创建目标目录并复制图片**

```bash
# ⚠️ 注意：Windows Git Bash 中路径用正斜杠 + /e/ 盘符格式
mkdir -p /e/Claude-project/sci-aesthetic/public/assets/m2

# 复制全部 19 个文件
cp /e/Claude-project/fig-nanobanana/generated/m2-p01/*.jpg \
   /e/Claude-project/sci-aesthetic/public/assets/m2/

cp /e/Claude-project/fig-nanobanana/generated/m2-p02/*.jpg \
   /e/Claude-project/sci-aesthetic/public/assets/m2/

cp /e/Claude-project/fig-nanobanana/generated/m2-p06/*.jpg \
   /e/Claude-project/sci-aesthetic/public/assets/m2/
```

- [ ] **Step 6.2：验证文件数量**

```bash
ls /e/Claude-project/sci-aesthetic/public/assets/m2/ | wc -l
```

Expected: `19`（5 p01 + 10 p02 + 4 p06）

### Task 7：替换 p01-ai-overview.js 中的占位符

**Files:**
- Modify: `E:\Claude-project\sci-aesthetic\src\pages\m2\p01-ai-overview.js`

**当前占位符位置（约第 397-405 行）：**
```js
panel.innerHTML = `
  <div class="m2-placeholder" style="aspect-ratio:4/3;">
    <div class="m2-placeholder-inner">
      <div class="m2-ph-icon">🌿</div>
      <p class="m2-ph-label">AI 生成图占位符</p>
      <p class="m2-ph-desc">${sc.desc}</p>
    </div>
  </div>
  <div>...`;
```

**替换方案：** 为每个 SHOWCASE 场景添加 `img` 字段，动态渲染真实图片。

- [ ] **Step 7.1：修改 SHOWCASE 数据，添加 img 字段**

在 `p01-ai-overview.js` 的 `SHOWCASE` 数组中，为每个场景添加 `img` 属性：

```js
const SHOWCASE = [
  { id:'water', label:'水污染处理工艺',
    img: '/assets/m2/p01-s4-01-water.jpg',
    // ...其他字段保持不变
  },
  { id:'carbon', label:'碳循环机制',
    img: '/assets/m2/p01-s4-02-carbon.jpg',
    // ...
  },
  { id:'remote', label:'遥感分析 Pipeline',
    img: '/assets/m2/p01-s4-03-remote.jpg',
    // ...
  },
  { id:'micro', label:'微塑料迁移路径',
    img: '/assets/m2/p01-s4-04-micro.jpg',
    // ...
  },
  { id:'eco', label:'生态系统服务评估',
    img: '/assets/m2/p01-s4-05-eco.jpg',
    // ...
  },
];
```

- [ ] **Step 7.2：修改 panel 渲染逻辑，替换占位符 div 为 img 标签**

找到 panel.innerHTML 赋值处（约第 398-412 行），将 `.m2-placeholder` div 替换为：

```js
panel.innerHTML = `
  <div>
    <img src="${sc.img}"
         alt="${sc.label} — AI 生成图"
         style="width:100%;border-radius:var(--radius-md);display:block;aspect-ratio:4/3;object-fit:cover;"
         loading="lazy"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="m2-placeholder" style="aspect-ratio:4/3;display:none;">
      <div class="m2-placeholder-inner"><div class="m2-ph-icon">🌿</div><p class="m2-ph-label">${sc.label}</p></div>
    </div>
  </div>
  <div>
    <div class="p01-sc-prompt-box">
      <h4>Prompt</h4>
      <pre>${sc.prompt}</pre>
    </div>
    <div class="p01-sc-review">💬 ${sc.review}</div>
  </div>`;
```

> 注：`onerror` 回退到占位符，确保图片加载失败时不破坏布局。

### Task 8：替换 p02-prompt-engineering.js 中的占位符

**Files:**
- Modify: `E:\Claude-project\sci-aesthetic\src\pages\m2\p02-prompt-engineering.js`

- [ ] **Step 8.1：修改 COMPARES 数据，添加图片字段**

在 `COMPARES` 数组每项添加 `badImg` 和 `goodImg`：

```js
const COMPARES = [
  {
    title: '流域水质监测流程图',
    badImg: '/assets/m2/p02-bad-01-watershed.jpg',
    goodImg: '/assets/m2/p02-good-01-watershed.jpg',
    bad: `...`,
    good: `...`,
    reason: '...'
  },
  {
    title: '土壤重金属修复机制',
    badImg: '/assets/m2/p02-bad-02-soil.jpg',
    goodImg: '/assets/m2/p02-good-02-soil.jpg',
    // ...
  },
  {
    title: '大气颗粒物来源解析',
    badImg: '/assets/m2/p02-bad-03-atmo.jpg',
    goodImg: '/assets/m2/p02-good-03-atmo.jpg',
    // ...
  },
];
```

- [ ] **Step 8.2：修改 compareGrid 渲染逻辑**

找到 `card.innerHTML` 赋值处（约第 367-388 行），替换两处 `.m2-placeholder` 为 img 标签：

```js
// 差图区域
<div class="p02-compare-img">
  <img src="${c.badImg}" alt="差 Prompt 示例图"
       style="width:100%;border-radius:var(--radius-sm);display:block;aspect-ratio:4/3;object-fit:cover;"
       loading="lazy">
</div>

// 好图区域
<div class="p02-compare-img">
  <img src="${c.goodImg}" alt="好 Prompt 示例图"
       style="width:100%;border-radius:var(--radius-sm);display:block;aspect-ratio:4/3;object-fit:cover;"
       loading="lazy">
</div>
```

- [ ] **Step 8.3：修改 ITERATIONS 数据，添加图片字段**

```js
const ITERATIONS = [
  { ver: 'v1', label: '初始构图', icon: '🎯',
    img: '/assets/m2/p02-iter-v1-wetland.jpg',
    // ...
  },
  { ver: 'v2', label: '配色调整', icon: '🎨',
    img: '/assets/m2/p02-iter-v2-wetland.jpg',
    // ...
  },
  { ver: 'v3', label: '细节增加', icon: '🔬',
    img: '/assets/m2/p02-iter-v3-wetland.jpg',
    // ...
  },
  { ver: 'v4', label: '标注完善', icon: '✨',
    img: '/assets/m2/p02-iter-v4-wetland.jpg',
    // ...
  },
];
```

- [ ] **Step 8.4：修改迭代详情渲染（renderIterDetail 函数）**

约第 428-446 行，将详情大图占位符改为 img：

```js
iterDetail.innerHTML = `
  <h3>${it.ver}: ${it.label}</h3>
  <div class="p02-iter-detail-grid">
    <div>
      <img src="${it.img}" alt="迭代版本 ${it.ver} — ${it.label}"
           style="width:100%;border-radius:var(--radius-md);display:block;aspect-ratio:4/3;object-fit:cover;"
           loading="lazy">
    </div>
    <div>
      <!-- 原有的 iter-change 和 prompt 内容保持不变 -->
      ...
    </div>
  </div>`;
```

- [ ] **Step 8.5：修改迭代轨道缩略图渲染**

约第 454-461 行，将轨道缩略图占位符改为 img：

```js
item.innerHTML = `
  <div class="p02-iter-thumb">
    <img src="${it.img}" alt="${it.ver}"
         style="width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:var(--radius-sm);"
         loading="lazy">
  </div>
  <div class="p02-iter-ver">${it.ver}</div>
  <div class="p02-iter-label">${it.label}</div>`;
```

### Task 9：替换 p06-case-studies.js 中的占位符

**Files:**
- Modify: `E:\Claude-project\sci-aesthetic\src\pages\m2\p06-case-studies.js`

> ⚠️ **重要架构说明**：p06 的占位符位于 `render()` 函数返回的 HTML 模板字符串中（静态字符串，不是动态数据驱动）。
> 替换方式是：在 `render()` 的 return 语句模板字符串内，直接把 `${buildPlaceholder(...)}` 调用替换为 `<img>` 标签。
> **不要** 像 p01/p02 那样去修改数据数组——p06 无需数据数组改动。

- [ ] **Step 9.1：修改 buildPlaceholder 调用处，Case 1 Before/After**

在 `render()` 函数的 return 模板字符串中，找到约第 350-358 行（p06-ba-row Case1 区域）：

```js
// 替换 Case 1 草图占位符
<div style="aspect-ratio:16/9;">
  <img src="/assets/m2/p06-case1-draft.jpg"
       alt="流域重金属污染 GA 草图（AI 初始生成）"
       style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);display:block;">
</div>

// 替换 Case 1 最终 GA 占位符
<div style="aspect-ratio:16/9;">
  <img src="/assets/m2/p06-case1-final-ga.jpg"
       alt="流域重金属污染 Graphical Abstract 最终成果"
       style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);display:block;">
</div>
```

- [ ] **Step 9.2：替换 Case 2 微塑料方法图占位符**

找到约第 391-392 行（Case 2 最终图占位符）：

```js
<div style="max-width:900px;margin:0 auto;aspect-ratio:4/3;">
  <img src="/assets/m2/p06-case2-microplastic.jpg"
       alt="微塑料迁移路径实验方法示意图"
       style="width:100%;border-radius:var(--radius-md);display:block;">
</div>
```

- [ ] **Step 9.3：替换 Case 3 碳循环概念图占位符**

找到约第 414-416 行（Case 3 最终图占位符）：

```js
<div style="max-width:1100px;margin:0 auto;aspect-ratio:4/3;">
  <img src="/assets/m2/p06-case3-carbon.jpg"
       alt="森林生态系统碳汇与服务价值综述概念图"
       style="width:100%;border-radius:var(--radius-md);display:block;">
</div>
```

---

## Chunk 6：验证与收尾

### Task 10：本地验证 + 视觉检查

**Files:**
- No new files

- [ ] **Step 10.1：启动 dev server**

```bash
cd E:\Claude-project\sci-aesthetic
npm run dev
```

Expected: 本地 `http://localhost:5173` 启动成功。

- [ ] **Step 10.2：逐页验证图片加载**

在浏览器中访问并检查（用 Chrome DevTools Network 面板）：

```
#m2-p1 → S4 展示组件：点击 5 个 tab，每个显示真实图片，无占位符
#m2-p2 → S2 对比区：3 组好差图均显示
#m2-p2 → S3 迭代区：轨道缩略图 + 点击详情大图均显示
#m2-p6 → S2 Case1：Before/After 两张图均显示（16:9）
#m2-p6 → S3 Case2：微塑料方法图显示（4:3）
#m2-p6 → S4 Case3：碳循环概念图显示（4:3）
```

Expected: 所有图片正常加载，无 404 错误，无 `.m2-placeholder` 残留样式。

- [ ] **Step 10.3：移动端验证（Chrome DevTools）**

切换 iPhone SE (375px) 和 iPhone 14 (390px) 模拟器，确认：
- 图片自适应宽度（`width:100%`）
- 宽高比正确（4:3 或 16:9 无拉伸）
- 页面无水平溢出

- [ ] **Step 10.4：控制台零报错确认**

打开 Console，确认无 404 图片错误、无 JS 报错。

- [ ] **Step 10.5：更新 todo.md**

在 `E:\Claude-project\sci-aesthetic\todo.md` 中：

```markdown
## Phase 5.5: M2 素材生成与替换（Nano Banana 统一批次）
- [x] 用 Nano Banana 2 (Gemini on OpenRouter) 批量生成 23 张环境科学主题图
- [x] 替换 m2-p1/p2/p6 中所有占位符为实际 AI 生成图
- [x] 每张图保存对应 prompt 文本（存入 fig-nanobanana/generate.py）
- [x] 视觉一致性检查：风格/配色/尺寸统一，不合格的重新生成
```

- [ ] **Step 10.6：Git Commit**

```bash
cd E:\Claude-project\sci-aesthetic
git add src/pages/m2/p01-ai-overview.js \
        src/pages/m2/p02-prompt-engineering.js \
        src/pages/m2/p06-case-studies.js \
        public/assets/m2/ \
        todo.md
git commit -m "$(cat <<'EOF'
feat(m2-phase5.5): 替换全部 23 张 AI 生成图占位符

使用 Nano Banana 2 (Gemini on OpenRouter) 生成环境科学主题图，
替换 p01/p02/p06 中的 m2-placeholder div 为真实 AI 生成图 img 标签。
图片均经 Claude 视觉模态 review 通过，保留 onerror 回退机制。

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## 成本估算与注意事项

| 批次 | 张数 | 优先级 | 估算成本 |
|------|------|--------|--------|
| p01 场景图 | 5 | 高 | 视模型定价 |
| p02 对比图（好+差） | 6 | 高 | |
| p02 迭代图 | 4 | 中 | |
| p06 案例图 | 4 | 高 | |
| **合计** | **23** | | |

**成本控制策略：**
1. 先执行 Chunk 1（1 张测试图），确认 API 正常且图片质量合格，再继续
2. `BATCH_MODE = False`（默认）：每张生成后暂停确认，可随时中断
3. 每批次 review 通过后再继续下一批次
4. 若某张图需要多次重试（>3次），接受当前最好版本，在 review_log 记录
5. 脚本自动跳过已存在的文件，中断后可随时续跑

**若 Gemini 不支持 OpenRouter 图像生成：**
备用方案 —— 在 `generate.py` 的 `MODEL_ID` 改为：
- `black-forest-labs/flux-1.1-pro`（FLUX，OpenRouter 广泛支持）
- `openai/dall-e-3`（OpenAI，若账户有 OpenAI 访问权限）

运行 `python generate.py list_models` 查看实际可用的图像生成模型列表。
