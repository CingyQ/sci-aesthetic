import{k as N,g as E,S as R}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as C}from"./CodeEditor-BiI1SvFS.js";import{n as j}from"./index-CqhzZnE2.js";import{s as W,l as z,c as T}from"./transform-CrlstJ90.js";import{l as A}from"./line-Ci26EkcQ.js";import{m as $}from"./monotone-KI2q-aQs.js";import"./path-CbwjOpE9.js";let P=null,S=[];const B=[{num:"01",title:"数据整理",en:"Data Cleaning",icon:"🗂",desc:"在绘图前整理数据，确保格式正确、缺失值处理妥当，是出版级图表的基础。",code:`# R 数据整理示例
library(tidyverse)

data <- read_csv("experiment.csv") |>
  filter(!is.na(value)) |>        # 移除缺失值
  mutate(
    group = factor(group),         # 分组变量因子化
    value = log1p(value)           # 对数变换改善分布
  ) |>
  group_by(group) |>
  summarise(
    mean = mean(value),
    se   = sd(value) / sqrt(n()),  # 标准误用于误差线
    .groups = "drop"
  )`,trap:"⚠️ 陷阱：未处理异常值就直接绘图，导致坐标轴范围失真，关键数据被压缩到角落。",color:"#7EC8E3",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">📋 数据质量检查</div>
  <div class="p10-sv-table-wrap">
    <table class="p10-sv-table">
      <thead><tr><th>group</th><th>value</th><th>状态</th></tr></thead>
      <tbody>
        <tr class="p10-sv-ok"><td>A</td><td>2.34</td><td class="p10-sv-tag ok">✓ 正常</td></tr>
        <tr class="p10-sv-bad"><td>B</td><td>NA</td><td class="p10-sv-tag bad">✗ 缺失</td></tr>
        <tr class="p10-sv-bad"><td>C</td><td>9999</td><td class="p10-sv-tag bad">✗ 异常</td></tr>
        <tr class="p10-sv-ok"><td>A</td><td>1.87</td><td class="p10-sv-tag ok">✓ 正常</td></tr>
        <tr class="p10-sv-ok"><td>B</td><td>3.21</td><td class="p10-sv-tag ok">✓ 正常</td></tr>
      </tbody>
    </table>
  </div>
  <p class="p10-sv-caption">移除 NA 和异常值后，分析结果更可靠</p>
</div>`},{num:"02",title:"选择图表",en:"Chart Selection",icon:"📊",desc:"根据数据类型和研究问题选择最合适的图表类型，避免用错图表误导读者。",code:`# 图表类型选择参考
# 比较多组均值 → 箱线图 or 小提琴图
ggplot(data, aes(x=group, y=value, fill=group)) +
  geom_boxplot(width=0.5, outlier.shape=21) +
  geom_jitter(width=0.1, alpha=0.4, size=1.5)

# 展示趋势变化 → 折线图（加置信带）
ggplot(data, aes(x=time, y=value, color=group)) +
  geom_line(linewidth=0.8) +
  geom_ribbon(aes(ymin=lower, ymax=upper, fill=group),
              alpha=0.15, color=NA)

# 展示相关性 → 散点图（加回归线）
ggplot(data, aes(x=x, y=y)) +
  geom_point(alpha=0.6) +
  geom_smooth(method="lm", se=TRUE)`,trap:"⚠️ 陷阱：用折线图连接非时序的分类数据，暗示了不存在的趋势关系。",color:"#95D5B2",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">📊 图表类型速查</div>
  <div class="p10-sv-chart-grid">
    <div class="p10-sv-chart-item active"><svg viewBox="0 0 40 32" fill="none"><rect x="5" y="16" width="6" height="14" fill="#7EC8E3"/><rect x="14" y="8" width="6" height="22" fill="#7EC8E3" opacity=".7"/><rect x="23" y="12" width="6" height="18" fill="#7EC8E3" opacity=".5"/><rect x="32" y="4" width="6" height="26" fill="#7EC8E3" opacity=".4"/><line x1="3" y1="30" x2="40" y2="30" stroke="#555" stroke-width="1"/></svg><span>箱线图</span><small>分布对比</small></div>
    <div class="p10-sv-chart-item"><svg viewBox="0 0 40 32" fill="none"><polyline points="4,26 12,18 20,22 28,10 36,14" stroke="#95D5B2" stroke-width="2" fill="none"/><circle cx="4" cy="26" r="2" fill="#95D5B2"/><circle cx="12" cy="18" r="2" fill="#95D5B2"/><circle cx="20" cy="22" r="2" fill="#95D5B2"/><circle cx="28" cy="10" r="2" fill="#95D5B2"/><circle cx="36" cy="14" r="2" fill="#95D5B2"/></svg><span>折线图</span><small>趋势变化</small></div>
    <div class="p10-sv-chart-item"><svg viewBox="0 0 40 32" fill="none"><circle cx="10" cy="22" r="2.5" fill="#B8B8E8"/><circle cx="16" cy="14" r="2.5" fill="#B8B8E8"/><circle cx="22" cy="18" r="2.5" fill="#B8B8E8"/><circle cx="28" cy="8" r="2.5" fill="#B8B8E8"/><circle cx="14" cy="24" r="2.5" fill="#B8B8E8"/><circle cx="32" cy="12" r="2.5" fill="#B8B8E8"/><circle cx="20" cy="10" r="2.5" fill="#B8B8E8"/></svg><span>散点图</span><small>相关性</small></div>
    <div class="p10-sv-chart-item"><svg viewBox="0 0 40 32" fill="none"><ellipse cx="12" cy="18" rx="5" ry="10" fill="none" stroke="#F0B27A" stroke-width="1.5"/><line x1="7" y1="18" x2="17" y2="18" stroke="#F0B27A" stroke-width="1.5"/><line x1="9" y1="10" x2="15" y2="10" stroke="#F0B27A" stroke-width="1"/><line x1="9" y1="26" x2="15" y2="26" stroke="#F0B27A" stroke-width="1"/><ellipse cx="28" cy="18" rx="5" ry="8" fill="none" stroke="#F0B27A" stroke-width="1.5" opacity=".7"/><line x1="23" y1="18" x2="33" y2="18" stroke="#F0B27A" stroke-width="1.5" opacity=".7"/></svg><span>箱线图</span><small>多组分布</small></div>
    <div class="p10-sv-chart-item"><svg viewBox="0 0 40 32" fill="none"><rect x="4" y="4" width="8" height="8" fill="#7EC8E3" opacity=".9"/><rect x="14" y="4" width="8" height="8" fill="#7EC8E3" opacity=".6"/><rect x="24" y="4" width="8" height="8" fill="#7EC8E3" opacity=".3"/><rect x="4" y="14" width="8" height="8" fill="#E07A7A" opacity=".4"/><rect x="14" y="14" width="8" height="8" fill="#E07A7A" opacity=".7"/><rect x="24" y="14" width="8" height="8" fill="#E07A7A" opacity=".9"/></svg><span>热力图</span><small>矩阵关系</small></div>
    <div class="p10-sv-chart-item"><svg viewBox="0 0 40 32" fill="none"><path d="M8 28 Q10 4 12 28" fill="#95D5B2" opacity=".4"/><path d="M8 28 Q10 14 12 28" fill="none" stroke="#95D5B2" stroke-width="1.5"/><path d="M24 28 Q26 6 28 28" fill="#B8B8E8" opacity=".3"/><path d="M24 28 Q26 16 28 28" fill="none" stroke="#B8B8E8" stroke-width="1.5"/></svg><span>小提琴图</span><small>密度分布</small></div>
  </div>
  <p class="p10-sv-caption">高亮为本步骤场景推荐图表类型</p>
</div>`},{num:"03",title:"生成初稿",en:"First Draft",icon:"✏️",desc:"先快速生成功能完整的初稿，不追求美观，验证数据和图表类型是否正确。",code:`# 快速初稿：使用 ggplot2 默认设置
library(ggplot2)

p <- ggplot(data, aes(x=group, y=value, fill=group)) +
  geom_boxplot() +
  labs(
    title = "各处理组细胞活性对比",
    x = "实验组",
    y = "细胞活性 (OD450)",
    caption = "n=30 per group, data: experiment.csv"
  )

# 先保存低分辨率草稿查看效果
ggsave("draft.png", p, width=8, height=5, dpi=72)`,trap:"⚠️ 陷阱：初稿阶段花太多时间在配色和字体上，应先确认数据展示逻辑再精调外观。",color:"#B8B8E8",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">✏️ 初稿效果预览（ggplot2 默认主题）</div>
  <div class="p10-sv-draft-preview">
    <svg viewBox="0 0 320 160" style="width:100%;height:auto;display:block;">
      <rect width="320" height="160" fill="#f0f0f0"/>
      <line x1="44" y1="8" x2="44" y2="136" stroke="#ccc" stroke-width="1"/>
      <line x1="44" y1="136" x2="312" y2="136" stroke="#ccc" stroke-width="1"/>
      <line x1="44" y1="108" x2="312" y2="108" stroke="white" stroke-width="1"/>
      <line x1="44" y1="80" x2="312" y2="80" stroke="white" stroke-width="1"/>
      <line x1="44" y1="52" x2="312" y2="52" stroke="white" stroke-width="1"/>
      <line x1="44" y1="24" x2="312" y2="24" stroke="white" stroke-width="1"/>
      <rect x="60" y="68" width="40" height="68" fill="#F8766D"/>
      <rect x="140" y="36" width="40" height="100" fill="#00BFC4"/>
      <rect x="220" y="52" width="40" height="84" fill="#7CAE00"/>
      <text x="80" y="150" text-anchor="middle" font-size="10" fill="#666">Control</text>
      <text x="160" y="150" text-anchor="middle" font-size="10" fill="#666">Treatment</text>
      <text x="240" y="150" text-anchor="middle" font-size="10" fill="#666">Vehicle</text>
      <text x="22" y="140" text-anchor="middle" font-size="9" fill="#666">0</text>
      <text x="22" y="112" text-anchor="middle" font-size="9" fill="#666">1</text>
      <text x="22" y="84" text-anchor="middle" font-size="9" fill="#666">2</text>
      <text x="22" y="56" text-anchor="middle" font-size="9" fill="#666">3</text>
      <text x="22" y="28" text-anchor="middle" font-size="9" fill="#666">4</text>
    </svg>
  </div>
  <p class="p10-sv-caption">默认灰色主题 — 先验证数据逻辑，再做美化</p>
</div>`},{num:"04",title:"配色优化",en:"Color Refinement",icon:"🎨",desc:"选择符合期刊要求、色盲友好的配色方案，确保印刷版和屏幕版效果一致。",code:`# 使用色盲安全的 ggsci 配色
library(ggsci)
library(RColorBrewer)

# 方案 1：ggsci Nature 期刊配色
p + scale_fill_npg()

# 方案 2：手动 Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00","#56B4E9","#009E73",
               "#F0E442","#0072B2","#D55E00","#CC79A7")
p + scale_fill_manual(values = okabe_ito)

# 方案 3：ColorBrewer 渐变（适合连续数据）
p + scale_fill_brewer(palette = "Blues", direction = -1)`,trap:"⚠️ 陷阱：使用彩虹色（rainbow）配色——在灰度印刷后颜色差异消失，且对色盲读者不友好。",color:"#F0B27A",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">🎨 配色方案对比</div>
  <div class="p10-sv-palette-compare">
    <div class="p10-sv-palette-row">
      <span class="p10-sv-palette-tag bad">❌ 彩虹色（色盲不友好）</span>
      <div class="p10-sv-swatches">
        <div style="background:#FF0000"></div><div style="background:#FF7F00"></div>
        <div style="background:#FFFF00"></div><div style="background:#00FF00"></div>
        <div style="background:#0000FF"></div><div style="background:#8B00FF"></div>
      </div>
    </div>
    <div class="p10-sv-palette-row">
      <span class="p10-sv-palette-tag ok">✓ Okabe-Ito（色盲安全）</span>
      <div class="p10-sv-swatches">
        <div style="background:#E69F00"></div><div style="background:#56B4E9"></div>
        <div style="background:#009E73"></div><div style="background:#F0E442"></div>
        <div style="background:#0072B2"></div><div style="background:#D55E00"></div>
      </div>
    </div>
    <div class="p10-sv-palette-row">
      <span class="p10-sv-palette-tag ok">✓ ggsci NPG（期刊风格）</span>
      <div class="p10-sv-swatches">
        <div style="background:#E64B35"></div><div style="background:#4DBBD5"></div>
        <div style="background:#00A087"></div><div style="background:#3C5488"></div>
        <div style="background:#F39B7F"></div><div style="background:#8491B4"></div>
      </div>
    </div>
  </div>
</div>`},{num:"05",title:"标注与排版",en:"Annotation & Layout",icon:"📐",desc:"添加统计标注、调整字号和布局，让图表在期刊规定的列宽下依然清晰可读。",code:`# 添加显著性标注 + 精调排版
library(ggpubr)

p_final <- p +
  stat_compare_means(
    comparisons = list(c("Control","Treatment")),
    method = "t.test", label = "p.signif"  # *, **, ***
  ) +
  theme_classic(base_size = 10) +          # 期刊常用 base 10pt
  theme(
    legend.position  = "none",             # 分组已在 x 轴体现
    axis.text        = element_text(size=9, color="black"),
    axis.title       = element_text(size=10, face="bold"),
    plot.title       = element_text(size=11, face="bold",
                                    hjust=0.5),
    plot.margin      = margin(5,5,5,5,"mm")
  )`,trap:"⚠️ 陷阱：字号用 ggplot2 默认的 11pt，但期刊要求印刷后坐标轴标签不小于 7pt，需按实际输出尺寸换算。",color:"#E07A7A",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">📐 标注规范示意</div>
  <div class="p10-sv-annotate-preview">
    <svg viewBox="0 0 300 160" style="width:100%;height:auto;display:block;">
      <rect width="300" height="160" fill="#fff" rx="4"/>
      <line x1="30" y1="10" x2="30" y2="130" stroke="#ccc" stroke-width="1"/>
      <line x1="30" y1="130" x2="280" y2="130" stroke="#ccc" stroke-width="1"/>
      <rect x="50" y="70" width="30" height="60" fill="#7EC8E3" rx="2"/>
      <rect x="110" y="40" width="30" height="90" fill="#7EC8E3" rx="2" opacity=".8"/>
      <rect x="170" y="55" width="30" height="75" fill="#7EC8E3" rx="2" opacity=".65"/>
      <line x1="50" y1="62" x2="80" y2="62" stroke="#333" stroke-width="1"/>
      <line x1="50" y1="62" x2="50" y2="68" stroke="#333" stroke-width="1"/>
      <line x1="80" y1="62" x2="80" y2="68" stroke="#333" stroke-width="1"/>
      <line x1="65" y1="55" x2="65" y2="62" stroke="#333" stroke-width="1"/>
      <text x="65" y="52" text-anchor="middle" font-size="9" fill="#E07A7A" font-weight="bold">**</text>
      <line x1="110" y1="32" x2="140" y2="32" stroke="#333" stroke-width="1"/>
      <line x1="110" y1="32" x2="110" y2="38" stroke="#333" stroke-width="1"/>
      <line x1="140" y1="32" x2="140" y2="38" stroke="#333" stroke-width="1"/>
      <line x1="125" y1="25" x2="125" y2="32" stroke="#333" stroke-width="1"/>
      <text x="125" y="22" text-anchor="middle" font-size="9" fill="#E07A7A" font-weight="bold">***</text>
      <text x="65" y="145" text-anchor="middle" font-size="8" fill="#666">Control</text>
      <text x="125" y="145" text-anchor="middle" font-size="8" fill="#666">Treat A</text>
      <text x="185" y="145" text-anchor="middle" font-size="8" fill="#666">Treat B</text>
      <text x="218" y="80" font-size="7.5" fill="#888">base_size=10</text>
      <text x="218" y="92" font-size="7.5" fill="#888">theme_classic()</text>
      <text x="218" y="104" font-size="7.5" fill="#888">axis.text: 9pt</text>
    </svg>
  </div>
  <p class="p10-sv-caption">显著性标注 + theme_classic() + 9pt 坐标轴字体</p>
</div>`},{num:"06",title:"导出发表",en:"Export & Publish",icon:"🚀",desc:"按期刊要求导出正确的格式、分辨率和尺寸，避免返修。",code:`# Nature 系列期刊导出规范
# 单栏（89mm）/ 1.5 栏（120mm）/ 双栏（183mm），300 DPI，PDF/EPS

ggsave(
  "figure1.pdf",
  plot   = p_final,
  width  = 89,          # 单栏：89mm
  height = 60,          # 高宽比约 0.67
  units  = "mm",
  dpi    = 300,         # 矢量格式 dpi 参数影响嵌入字体
  device = "pdf"
)

# 位图备份（用于预览/提交系统）
ggsave(
  "figure1.tiff",
  plot   = p_final,
  width  = 89, height = 60, units = "mm",
  dpi    = 300,
  compression = "lzw"   # TIFF LZW 无损压缩
)`,trap:'⚠️ 陷阱：用 ggsave 导出时忘记指定 units="mm"，默认 inches 会导致尺寸翻倍，不符合期刊规定的列宽要求。',color:"#7EC8E3",visual:`<div class="p10-step-visual">
  <div class="p10-sv-label">🚀 期刊常用导出规格</div>
  <div class="p10-sv-export-grid">
    <div class="p10-sv-export-card" style="--ec:#E07A7A">
      <div class="p10-sv-ec-format">PDF</div>
      <div class="p10-sv-ec-badge">矢量</div>
      <div class="p10-sv-ec-specs">Nature / Science<br>单栏 89mm<br>字体嵌入</div>
    </div>
    <div class="p10-sv-export-card" style="--ec:#F0B27A">
      <div class="p10-sv-ec-format">TIFF</div>
      <div class="p10-sv-ec-badge">位图</div>
      <div class="p10-sv-ec-specs">Cell / Lancet<br>300 DPI 半调<br>LZW 压缩</div>
    </div>
    <div class="p10-sv-export-card" style="--ec:#95D5B2">
      <div class="p10-sv-ec-format">PNG</div>
      <div class="p10-sv-ec-badge">位图</div>
      <div class="p10-sv-ec-specs">网页 / 演示<br>300 DPI<br>透明背景可选</div>
    </div>
  </div>
</div>`}],I=[{id:"svg",name:"SVG",type:"vector",color:"#7EC8E3",best:"网页、演示文稿、可编辑图表",dpi:"无限缩放（分辨率无关）",size:"极小（通常 <100KB）",support:"Inkscape / Illustrator / 浏览器",desc:"Scalable Vector Graphics，基于 XML 的矢量格式。图形由数学路径描述，无论放大到多少倍都保持清晰。可在 Illustrator 中直接编辑各元素，是科研图表后期精调的首选中间格式。",code:`# ggplot2 导出 SVG
svglite::svglite("figure.svg", width=3.5, height=2.5)
print(p_final)
dev.off()

# 或用 ggsave
ggsave("figure.svg", p_final,
       width=89, height=60, units="mm",
       device=svglite::svglite)`},{id:"pdf",name:"PDF",type:"vector",color:"#E07A7A",best:"Nature / Science 等顶刊提交",dpi:"矢量（内嵌字体）",size:"小（通常 100KB–2MB）",support:"LaTeX / Illustrator / Acrobat",desc:"Portable Document Format，内嵌矢量图形和字体，是大多数高影响力期刊接受的首选格式。ggsave 生成的 PDF 嵌入所有字体，可直接提交给 Nature、Science、Cell 等期刊，无需担心字体缺失问题。",code:`# ggsave 导出 PDF（最常用）
ggsave(
  "figure1.pdf",
  plot   = p_final,
  width  = 89,     # 单栏 89mm
  height = 60,
  units  = "mm",
  dpi    = 300
)

# 检查字体嵌入（Linux/Mac）
# pdffonts figure1.pdf`},{id:"png",name:"PNG",type:"raster",color:"#95D5B2",best:"网页展示、演示文稿插图",dpi:"300 DPI（印刷）/ 150 DPI（屏幕）",size:"中等（300DPI 约 1–5MB）",support:"所有程序通用",desc:"Portable Network Graphics，无损压缩位图格式，支持透明背景。适合网页展示和演示文稿，但放大后会出现像素化。期刊提交时需保证 300 DPI 以上，并按实际印刷尺寸计算像素数。",code:`# ggsave 导出高分辨率 PNG
ggsave(
  "figure1.png",
  plot   = p_final,
  width  = 89,
  height = 60,
  units  = "mm",
  dpi    = 300      # 单栏 89mm × 300DPI = 1051px
)

# 透明背景
ggsave("figure1_transparent.png", p_final,
       bg = "transparent",
       width=89, height=60, units="mm", dpi=300)`},{id:"tiff",name:"TIFF",type:"raster",color:"#F0B27A",best:"Cell / Lancet / NEJM 等期刊提交",dpi:"300 DPI（半色调）/ 600 DPI（线图）",size:"大（300DPI 约 5–20MB，LZW 压缩后减半）",support:"Photoshop / Illustrator / ImageJ",desc:"Tagged Image File Format，无损位图格式，是 Cell Press、Elsevier、Wiley 期刊体系要求的标准格式。支持 LZW 无损压缩（文件大小约为未压缩的 40–60%）。R 的 ggsave 支持 compression 参数直接输出压缩 TIFF。",code:`# ggsave 导出 TIFF（LZW 无损压缩）
ggsave(
  "figure1.tiff",
  plot        = p_final,
  width       = 89,
  height      = 60,
  units       = "mm",
  dpi         = 300,
  compression = "lzw"   # 无损压缩，大幅减小体积
)

# Cell 要求 600 DPI 线图
ggsave("figure1_hires.tiff", p_final,
       width=89, height=60, units="mm",
       dpi=600, compression="lzw")`},{id:"eps",name:"EPS",type:"vector",color:"#B8B8E8",best:"LaTeX 论文排版",dpi:"矢量（与 PDF 等效）",size:"小–中（取决于复杂度）",support:"LaTeX / Illustrator / Ghostscript",desc:"Encapsulated PostScript，历史悠久的矢量格式，在 LaTeX 排版体系中广泛使用（\\includegraphics）。现代期刊投稿系统已逐渐转向 PDF，但部分老牌期刊（如某些 Springer 期刊）的 LaTeX 模板仍要求 EPS 格式。",code:`# ggsave 导出 EPS
ggsave(
  "figure1.eps",
  plot  = p_final,
  width = 89,
  height= 60,
  units = "mm"
)

# LaTeX 中使用
# \\usepackage{graphicx}
# \\includegraphics[width=\\columnwidth]{figure1.eps}`}],M=[{name:"Nature",group:"Nature Portfolio",single:"89mm",oneHalf:"120mm",double:"183mm",dpi_line:1e3,dpi_halftone:300,dpi_combo:500,formats:"PDF / EPS / TIFF / PSD",color:"RGB (屏幕) / CMYK (印刷，需向编辑确认)",maxSize:"单图 ≤ 10MB",fonts:"嵌入所有字体；推荐 Helvetica / Arial",notes:"图片在投稿时可先提交低分辨率，接受后再上传高分辨率版本。坐标轴标签不小于 7pt（印刷后）。"},{name:"Science",group:"AAAS",single:"57mm",oneHalf:"120mm",double:"178mm",dpi_line:1e3,dpi_halftone:300,dpi_combo:500,formats:"PDF / EPS / TIFF",color:"CMYK 优先（印刷版），RGB 可接受",maxSize:"单图 ≤ 20MB",fonts:"嵌入字体；禁止 Times New Roman",notes:"Science 单栏比 Nature 更窄（57mm vs 89mm），需特别注意字号换算。图注文字要简洁，不超过 200 字。"},{name:"Cell",group:"Cell Press / Elsevier",single:"85mm",oneHalf:"114mm",double:"174mm",dpi_line:600,dpi_halftone:300,dpi_combo:600,formats:"PDF / EPS / TIFF / PSD",color:"RGB（提交时），CMYK（印刷转换由期刊处理）",maxSize:"单图 ≤ 20MB",fonts:"嵌入字体；推荐 Arial / Helvetica",notes:"Cell 系列线图要求 600 DPI TIFF（而非 300），注意与 Nature 的区别。接受 PSD 分层文件，便于编辑后期调整。"},{name:"PNAS",group:"National Academy of Sciences",single:"87mm",oneHalf:"114mm",double:"178mm",dpi_line:1e3,dpi_halftone:300,dpi_combo:500,formats:"PDF / EPS / TIFF / PNG",color:"RGB 或 CMYK 均可",maxSize:"单图 ≤ 10MB",fonts:"嵌入字体；Arial / Helvetica 常用",notes:"PNAS 接受 PNG 格式（其他顶刊较少），但建议仍使用 TIFF/PDF。图表需清楚标注实验重复次数和统计方法。"},{name:"Lancet",group:"Elsevier / Lancet",single:"83mm",oneHalf:"N/A",double:"171mm",dpi_line:1e3,dpi_halftone:300,dpi_combo:500,formats:"TIFF / EPS",color:"CMYK（印刷导向）",maxSize:"单图 ≤ 5MB",fonts:"嵌入字体；最小 6pt",notes:"Lancet 系列医学期刊对图表格式要求较严格，偏好 TIFF。统计图必须包含置信区间或误差线，数据点不得少于 5 个。"},{name:"NEJM",group:"Massachusetts Medical Society",single:"84mm",oneHalf:"113mm",double:"171mm",dpi_line:1e3,dpi_halftone:300,dpi_combo:600,formats:"PDF / TIFF / EPS",color:"CMYK 或 Grayscale",maxSize:"单图 ≤ 10MB",fonts:"嵌入字体；Times New Roman 或 Arial",notes:"NEJM 允许使用 Times New Roman（罕见的顶刊）。临床数据图表须包含样本量（n）。彩色图表在线版免费，印刷版收费。"}];function ot(){const n=B.map((t,l)=>`
    <div class="p10-wf-dot" data-step="${l}" id="p10-wf-dot-${l}">
      <div class="p10-wf-dot-circle" style="--step-color:${t.color};">
        <span class="p10-wf-dot-num">${t.num}</span>
      </div>
      <span class="p10-wf-dot-label">${t.title}</span>
    </div>
    ${l<B.length-1?`<div class="p10-wf-connector" id="p10-conn-${l}"></div>`:""}
  `).join(""),o=B.map((t,l)=>`
    <div class="p10-wf-panel" id="p10-wf-panel-${l}" data-step="${l}">
      <div class="p10-wf-panel-inner">
        <div class="p10-wf-panel-header">
          <span class="p10-wf-step-num" style="color:${t.color};">${t.num}</span>
          <span class="p10-wf-step-icon">${t.icon}</span>
        </div>
        <h3 class="p10-wf-step-title">${t.title}</h3>
        <p class="p10-wf-step-en">${t.en}</p>
        <p class="p10-wf-step-desc">${t.desc}</p>
        ${t.visual||""}
        <div class="p10-wf-code-container" id="p10-wf-code-${l}"></div>
        <div class="p10-wf-trap">
          <p class="p10-wf-trap-text">${t.trap}</p>
        </div>
      </div>
    </div>
  `).join(""),a=I.map((t,l)=>`
    <button class="p10-format-tab${l===0?" active":""}" data-fmt="${l}" aria-selected="${l===0}">
      <span class="p10-fmt-tab-badge" style="background:${t.color};"></span>
      ${t.name}
      <span class="p10-fmt-tab-type">${t.type==="vector"?"矢量":"位图"}</span>
    </button>
  `).join(""),s=I.map((t,l)=>`
    <div class="p10-format-panel${l===0?" active":""}" data-fmt="${l}" role="tabpanel">
      <div class="p10-format-panel-inner">
        <!-- 左侧：信息 -->
        <div class="p10-fmt-info">
          <div class="p10-fmt-badge" style="background:${t.color}15;border:1px solid ${t.color}40;">
            <span class="p10-fmt-badge-type" style="color:${t.color};">${t.type==="vector"?"矢量格式":"位图格式"}</span>
            <span class="p10-fmt-badge-name" style="color:${t.color};">${t.name}</span>
          </div>
          <p class="p10-fmt-desc">${t.desc}</p>
          <div class="p10-fmt-specs">
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">最适用</span>
              <span class="p10-fmt-spec-val">${t.best}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">分辨率</span>
              <span class="p10-fmt-spec-val">${t.dpi}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">文件大小</span>
              <span class="p10-fmt-spec-val">${t.size}</span>
            </div>
            <div class="p10-fmt-spec-row">
              <span class="p10-fmt-spec-label">软件支持</span>
              <span class="p10-fmt-spec-val">${t.support}</span>
            </div>
          </div>
        </div>
        <!-- 右侧：SVG 预览 + 代码 -->
        <div class="p10-fmt-visual">
          <div class="p10-fmt-svg-container" id="p10-fmt-svg-${l}">
            <div class="p10-fmt-svg-placeholder">格式示意图</div>
          </div>
          <div class="p10-fmt-code-container" id="p10-fmt-code-${l}"></div>
        </div>
      </div>
    </div>
  `).join(""),i=M.map(t=>`<option value="${t.name}">${t.name}（${t.group}）</option>`).join("");return`
<div class="page-scroll">

<style>
/* ══════════════════════════════════════════════════════
   P10 专属样式
   ══════════════════════════════════════════════════════ */

/* ── Hero ── */
.p10-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
}

.p10-hero::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(126,200,227,0.18) 0%, transparent 70%);
  top: -100px;
  left: -100px;
  animation: p10-halo-a 8s ease-in-out infinite alternate;
  pointer-events: none;
}

.p10-hero::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(224,122,122,0.14) 0%, transparent 70%);
  bottom: -80px;
  right: -80px;
  animation: p10-halo-b 10s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes p10-halo-a {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(60px, 40px) scale(1.15); }
}

@keyframes p10-halo-b {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-50px, -30px) scale(1.1); }
}

.p10-scroll-hint {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  animation: p10-float 2s ease-in-out infinite;
  white-space: nowrap;
  margin-top: var(--space-sm);
}

@keyframes p10-float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(6px); }
}

/* ── Workflow Section ── */
.p10-workflow-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-section-eyebrow {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--accent);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: var(--space-sm);
}

.p10-section-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  line-height: 1.15;
}

.p10-section-sub {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  text-align: center;
  margin-top: var(--space-sm);
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.p10-section-header {
  margin-bottom: var(--space-xl);
}

/* 工作流主体 */
.p10-wf-body {
  display: flex;
  gap: var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  align-items: flex-start;
}

.p10-wf-left {
  width: 320px;
  flex-shrink: 0;
  will-change: transform;
  padding-top: var(--space-md);
}

.p10-wf-right {
  flex: 1;
  min-width: 0;
}

/* 步骤指示器 */
.p10-wf-step-indicator {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  padding: var(--space-md) 0;
}

.p10-wf-dot {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  cursor: pointer;
  padding: 6px 0;
  transition: opacity var(--t-base);
}

.p10-wf-dot:not(.active) {
  opacity: 0.45;
}

.p10-wf-dot:hover {
  opacity: 0.85;
}

.p10-wf-dot-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--step-color, var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--t-base);
  flex-shrink: 0;
}

.p10-wf-dot.active .p10-wf-dot-circle {
  background: var(--step-color, var(--accent));
  box-shadow: 0 0 0 4px rgba(126, 200, 227, 0.3);
}

.p10-wf-dot-num {
  font-family: var(--font-code);
  font-size: var(--text-small);
  font-weight: 700;
  color: var(--text-on-light-2);
  transition: color var(--t-base);
}

.p10-wf-dot.active .p10-wf-dot-num {
  color: #fff;
}

.p10-wf-dot-label {
  font-family: var(--font-heading);
  font-size: var(--text-small);
  font-weight: 500;
  color: var(--text-on-light);
}

.p10-wf-connector {
  width: 2px;
  height: 24px;
  background: var(--border-light);
  margin-left: 21px;
}
.p10-wf-connector.passed {
  background: var(--accent);
}

/* 工作流面板 */
.p10-wf-panel {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--space-xl) 0;
}

.p10-wf-panel-inner {
  width: 100%;
}

.p10-wf-panel-header {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.p10-wf-step-num {
  font-family: var(--font-code);
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
}

.p10-wf-step-icon {
  font-size: 2rem;
}

.p10-wf-step-title {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-light);
  margin-bottom: 4px;
}

.p10-wf-step-en {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-light-3);
  letter-spacing: 0.05em;
  margin-bottom: var(--space-md);
}

.p10-wf-step-desc {
  font-size: var(--text-body);
  color: var(--text-on-light-2);
  line-height: 1.8;
  max-width: 560px;
  margin-bottom: var(--space-md);
}

.p10-wf-code-container {
  margin-bottom: var(--space-md);
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 200px;
  background: var(--bg-dark);
}

/* ── Step Visual Cards ── */
.p10-step-visual {
  background: rgba(126, 200, 227, 0.04);
  border: 1px solid rgba(126, 200, 227, 0.12);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-md);
}

.p10-sv-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: var(--space-sm);
}

.p10-sv-caption {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  margin-top: var(--space-sm);
  margin-bottom: 0;
  line-height: 1.5;
  font-style: italic;
}

/* Data Table */
.p10-sv-table-wrap {
  overflow-x: auto;
}

.p10-sv-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  font-family: var(--font-code);
}

.p10-sv-table th {
  text-align: left;
  padding: 6px 12px;
  background: rgba(0,0,0,0.04);
  color: var(--text-on-light-2);
  font-size: var(--text-caption);
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border-light);
}

.p10-sv-table td {
  padding: 6px 12px;
  color: var(--text-on-light);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}

.p10-sv-bad td {
  background: rgba(224, 122, 122, 0.06);
}

.p10-sv-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.p10-sv-tag.ok {
  background: rgba(149, 213, 178, 0.2);
  color: #009E73;
}

.p10-sv-tag.bad {
  background: rgba(224, 122, 122, 0.15);
  color: #E07A7A;
}

/* Chart Grid */
.p10-sv-chart-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-sv-chart-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  background: rgba(0,0,0,0.03);
  border: 1px solid var(--border-light);
  cursor: default;
  transition: border-color var(--t-fast);
}

.p10-sv-chart-item svg {
  width: 48px;
  height: 38px;
}

.p10-sv-chart-item span {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-on-light);
}

.p10-sv-chart-item small {
  font-size: 10px;
  color: var(--text-on-light-3);
}

.p10-sv-chart-item.active {
  border-color: var(--accent);
  background: rgba(126, 200, 227, 0.06);
}

/* Draft Preview */
.p10-sv-draft-preview {
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-light);
}

/* Palette Compare */
.p10-sv-palette-compare {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.p10-sv-palette-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
}

.p10-sv-palette-tag {
  font-size: 12px;
  min-width: 180px;
  flex-shrink: 0;
  font-family: var(--font-code);
}

.p10-sv-palette-tag.ok { color: #009E73; }
.p10-sv-palette-tag.bad { color: #E07A7A; }

.p10-sv-swatches {
  display: flex;
  gap: 3px;
}

.p10-sv-swatches div {
  width: 28px;
  height: 28px;
  border-radius: 4px;
}

/* Annotate Preview */
.p10-sv-annotate-preview {
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: #fff;
}

/* Export Grid */
.p10-sv-export-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-sv-export-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: var(--space-md) var(--space-sm);
  border-radius: var(--radius-md);
  background: rgba(0,0,0,0.03);
  border: 1px solid var(--border-light);
  text-align: center;
}

.p10-sv-ec-format {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--ec, var(--accent));
  line-height: 1;
}

.p10-sv-ec-badge {
  font-family: var(--font-code);
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 3px;
  background: rgba(var(--ec, 126), 200, 227, 0.1);
  color: var(--ec, var(--accent));
  border: 1px solid currentColor;
  opacity: 0.8;
}

.p10-sv-ec-specs {
  font-size: 11px;
  color: var(--text-on-light-2);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .p10-sv-chart-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .p10-sv-palette-tag {
    min-width: 140px;
    font-size: 11px;
  }
  .p10-sv-swatches div {
    width: 22px;
    height: 22px;
  }
  .p10-sv-export-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xs, 8px);
  }
}

.p10-wf-trap {
  background: rgba(224, 122, 122, 0.08);
  border-left: 3px solid #E07A7A;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
}

.p10-wf-trap-text {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  line-height: 1.7;
}

/* ── Format Section ── */
.p10-format-section {
  background: var(--bg-dark);
  color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-format-section .p10-section-title {
  color: var(--text-on-dark);
}

.p10-format-section .p10-section-sub {
  color: var(--text-on-dark-2);
}

.p10-format-tabs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 4px;
  background: var(--bg-dark-elevated);
  padding: 4px;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-xl);
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.p10-format-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-on-dark-2);
  font-family: var(--font-heading);
  font-size: var(--text-small);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--t-fast);
  white-space: nowrap;
  min-height: 44px;
}

.p10-format-tab:hover {
  color: var(--text-on-dark);
  background: rgba(255,255,255,0.05);
}

.p10-format-tab.active {
  background: var(--bg-dark-deep);
  color: var(--text-on-dark);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

.p10-fmt-tab-badge {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.p10-fmt-tab-type {
  font-size: 11px;
  opacity: 0.6;
  font-family: var(--font-code);
}

.p10-format-panel {
  display: none;
}

.p10-format-panel.active {
  display: block;
}

.p10-format-panel-inner {
  display: flex;
  gap: var(--space-xl);
  max-width: 1100px;
  margin: 0 auto;
  align-items: flex-start;
}

.p10-fmt-info {
  flex: 1.1;
  min-width: 0;
}

.p10-fmt-badge {
  display: inline-flex;
  flex-direction: column;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  gap: 2px;
}

.p10-fmt-badge-type {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.p10-fmt-badge-name {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.p10-fmt-desc {
  font-size: var(--text-body);
  color: var(--text-on-dark-2);
  line-height: 1.8;
  margin-bottom: var(--space-md);
}

.p10-fmt-specs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.p10-fmt-spec-row {
  display: flex;
  gap: var(--space-sm);
  align-items: baseline;
  font-size: var(--text-small);
}

.p10-fmt-spec-label {
  color: var(--text-on-dark-3);
  width: 80px;
  flex-shrink: 0;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.05em;
}

.p10-fmt-spec-val {
  color: var(--text-on-dark);
  line-height: 1.5;
}

.p10-fmt-visual {
  flex: 0.9;
  min-width: 0;
}

.p10-fmt-svg-container {
  border-radius: var(--radius-md);
  height: 240px;
  position: relative;
  overflow: hidden;
  margin-bottom: var(--space-md);
  background: linear-gradient(135deg, #0d1117 0%, #13192b 60%, #0d1117 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4);
}

.p10-fmt-svg-placeholder {
  color: var(--text-on-dark-3);
  font-size: var(--text-small);
  font-family: var(--font-code);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.p10-fmt-code-container {
  border-radius: var(--radius-md);
  overflow: hidden;
  min-height: 160px;
  background: var(--bg-dark-deep);
}

/* ── DPI Section ── */
.p10-dpi-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-dpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-md);
  max-width: 1100px;
  margin: 0 auto;
}

.p10-dpi-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

.p10-dpi-canvas-wrap {
  width: 100%;
  aspect-ratio: 1;
  background: var(--bg-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-light);
}

.p10-dpi-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.p10-dpi-value {
  font-family: var(--font-code);
  font-size: var(--text-heading);
  font-weight: 700;
  color: var(--text-on-light);
  letter-spacing: -0.02em;
}

.p10-dpi-label {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  text-align: center;
  line-height: 1.4;
}

/* 移动端 DPI Tabs */
.p10-dpi-tabs-mobile {
  display: none;
}

.p10-dpi-mobile-tabs-bar {
  display: flex;
  gap: 4px;
  background: var(--bg-light-alt);
  padding: 4px;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-md);
  justify-content: center;
}

.p10-dpi-mobile-tab {
  padding: 8px 16px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: var(--font-code);
  font-size: var(--text-small);
  font-weight: 600;
  color: var(--text-on-light-2);
  cursor: pointer;
  transition: all var(--t-fast);
  min-height: 44px;
}

.p10-dpi-mobile-tab.active {
  background: var(--bg-dark);
  color: var(--text-on-dark);
}

.p10-dpi-mobile-canvas-wrap {
  width: 100%;
  aspect-ratio: 1;
  max-width: 360px;
  margin: 0 auto;
  background: var(--bg-dark);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.p10-dpi-mobile-canvas-wrap canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* ── Calculator Section ── */
.p10-calc-section {
  background: var(--bg-dark);
  color: var(--text-on-dark);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-calc-section .p10-section-title {
  color: var(--text-on-dark);
}

.p10-calc-section .p10-section-sub {
  color: var(--text-on-dark-2);
}

.p10-calc-layout {
  display: flex;
  gap: var(--space-xl);
  max-width: 1000px;
  margin: 0 auto;
  align-items: flex-start;
}

.p10-calc-input-panel {
  flex: 0 0 340px;
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  border: 1px solid var(--border-dark);
}

.p10-calc-title {
  font-family: var(--font-heading);
  font-size: var(--text-heading);
  font-weight: 600;
  color: var(--text-on-dark);
  margin-bottom: var(--space-md);
}

.p10-calc-field {
  margin-bottom: var(--space-md);
}

.p10-calc-label {
  display: block;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-dark-3);
  margin-bottom: 6px;
}

.p10-calc-input-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.p10-calc-input {
  flex: 1;
  background: var(--bg-dark-deep);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 1rem;
  padding: 10px 14px;
  min-height: 44px;
  transition: border-color var(--t-fast);
  width: 100%;
}

.p10-calc-input:focus {
  outline: none;
  border-color: var(--accent);
}

.p10-calc-unit {
  font-family: var(--font-code);
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  flex-shrink: 0;
}

.p10-calc-select {
  width: 100%;
  background: var(--bg-dark-deep);
  border: 1px solid var(--border-dark);
  border-radius: var(--radius-sm);
  color: var(--text-on-dark);
  font-family: var(--font-code);
  font-size: 1rem;
  padding: 10px 14px;
  min-height: 44px;
  cursor: pointer;
  transition: border-color var(--t-fast);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236e6e73' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.p10-calc-select:focus {
  outline: none;
  border-color: var(--accent);
}

.p10-calc-result-panel {
  flex: 1;
  min-width: 0;
}

.p10-calc-result-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.p10-calc-result-card {
  background: var(--bg-dark-elevated);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  border: 1px solid var(--border-dark);
}

.p10-calc-result-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.p10-calc-result-val {
  font-family: var(--font-code);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
}

.p10-calc-result-unit {
  font-size: var(--text-small);
  color: var(--text-on-dark-3);
  font-weight: 400;
}

.p10-calc-result-value {
  font-family: var(--font-code);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1.2;
}

.p10-calc-result-note {
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  margin: 4px 0 0;
  line-height: 1.4;
}

.p10-calc-code-wrap {
  background: var(--bg-dark-deep);
  border-radius: var(--radius-md);
  padding: var(--space-md);
  margin-bottom: var(--space-sm);
  border: 1px solid var(--border-dark);
  overflow-x: auto;
}

.p10-calc-code-label {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  color: var(--text-on-dark-3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-sm);
}

#p10-calc-code {
  font-family: var(--font-code);
  font-size: 13px;
  color: var(--text-on-dark);
  line-height: 1.7;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin: 0;
  background: transparent;
  padding: 0;
}

.p10-calc-warning {
  background: rgba(255, 149, 0, 0.1);
  border-left: 3px solid var(--color-warning);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
  display: none;
}

.p10-calc-warning.visible {
  display: block;
}

.p10-calc-warning-text {
  font-size: var(--text-small);
  color: var(--color-warning);
  line-height: 1.6;
}

/* ── Journal Section ── */
.p10-journal-section {
  background: var(--bg-light);
  color: var(--text-on-light);
  padding: var(--space-3xl) var(--space-lg);
}

.p10-journal-search {
  max-width: 540px;
  margin: 0 auto var(--space-xl);
}

.p10-journal-select-label {
  display: block;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-light-3);
  margin-bottom: 8px;
  text-align: center;
}

.p10-journal-select {
  width: 100%;
  background: var(--bg-light-elevated);
  border: 1.5px solid var(--border-light);
  border-radius: var(--radius-md);
  color: var(--text-on-light);
  font-family: var(--font-heading);
  font-size: 1rem;
  padding: 14px 20px;
  min-height: 52px;
  cursor: pointer;
  transition: border-color var(--t-fast);
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2386868b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 20px center;
  padding-right: 44px;
  box-shadow: var(--shadow-sm);
}

.p10-journal-select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

#p10-journal-result {
  display: none;
  max-width: 900px;
  margin: 0 auto;
}

#p10-journal-result.visible {
  display: block;
}

#p10-journal-card {
  background: var(--bg-light-elevated);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-light);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.p10-journal-card-header {
  padding: var(--space-lg);
  border-bottom: 1px solid var(--border-light);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.p10-journal-card-name {
  font-family: var(--font-display);
  font-size: var(--text-title);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-on-light);
}

.p10-journal-card-group {
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  margin-top: 4px;
}

.p10-journal-card-body {
  padding: var(--space-lg);
}

.p10-journal-spec-section {
  margin-bottom: var(--space-md);
}

.p10-journal-spec-title {
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-on-light-3);
  margin-bottom: var(--space-sm);
}

.p10-journal-width-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-journal-width-cell {
  background: var(--bg-light-alt);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}

.p10-journal-width-label {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  display: block;
  margin-bottom: 4px;
}

.p10-journal-width-val {
  font-family: var(--font-code);
  font-size: var(--text-heading);
  font-weight: 700;
  color: var(--accent);
}

.p10-journal-dpi-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-sm);
}

.p10-journal-dpi-cell {
  background: var(--bg-light-alt);
  border-radius: var(--radius-sm);
  padding: var(--space-sm) var(--space-md);
  text-align: center;
}

.p10-journal-dpi-label {
  font-size: var(--text-caption);
  color: var(--text-on-light-3);
  display: block;
  margin-bottom: 4px;
}

.p10-journal-dpi-val {
  font-family: var(--font-code);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-on-light);
}

.p10-journal-spec-row {
  display: flex;
  gap: var(--space-sm);
  align-items: baseline;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: var(--text-small);
}

.p10-journal-spec-row:last-child {
  border-bottom: none;
}

.p10-journal-spec-key {
  color: var(--text-on-light-3);
  width: 88px;
  flex-shrink: 0;
  font-family: var(--font-code);
  font-size: var(--text-caption);
  letter-spacing: 0.04em;
}

.p10-journal-spec-val {
  color: var(--text-on-light);
  line-height: 1.5;
  flex: 1;
}

.p10-journal-notes {
  background: rgba(126, 200, 227, 0.07);
  border-left: 3px solid var(--accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  padding: var(--space-sm) var(--space-md);
  margin-top: var(--space-md);
  font-size: var(--text-small);
  color: var(--text-on-light-2);
  line-height: 1.7;
}

/* ══════════════════════════════════════════════════════
   响应式断点
   ══════════════════════════════════════════════════════ */

@media (max-width: 900px) {
  .p10-wf-body {
    gap: var(--space-lg);
  }
  .p10-wf-left {
    width: 260px;
  }
}

@media (max-width: 768px) {
  /* 工作流移动端：隐藏左侧指示器，只显示面板 */
  .p10-wf-left {
    display: none;
  }
  .p10-wf-body {
    flex-direction: column;
  }
  .p10-wf-right {
    width: 100%;
  }
  .p10-wf-panel {
    min-height: auto;
    padding: var(--space-lg) 0;
    border-bottom: 1px solid var(--border-light);
  }

  /* 格式面板移动端：堆叠 */
  .p10-format-panel-inner {
    flex-direction: column;
    gap: var(--space-md);
  }
  .p10-format-tabs {
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
    max-width: 100%;
  }
  .p10-format-tab {
    padding: 8px 12px;
    font-size: 13px;
  }
  .p10-fmt-visual {
    width: 100%;
  }
  .p10-fmt-svg-container {
    height: 200px;
  }

  /* DPI：桌面网格隐藏，移动端 Tab 显示 */
  .p10-dpi-grid {
    display: none;
  }
  .p10-dpi-tabs-mobile {
    display: block;
    max-width: 480px;
    margin: 0 auto;
  }

  /* 计算器移动端：堆叠 */
  .p10-calc-layout {
    flex-direction: column;
    gap: var(--space-md);
  }
  .p10-calc-input-panel {
    flex: none;
    width: 100%;
  }

  /* 期刊卡片 */
  .p10-journal-width-grid,
  .p10-journal-dpi-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .p10-format-tabs {
    grid-template-columns: repeat(2, 1fr);
  }
  .p10-calc-result-grid {
    grid-template-columns: 1fr;
  }
  .p10-journal-width-grid,
  .p10-journal-dpi-grid {
    grid-template-columns: 1fr;
  }
  .p10-journal-card-header {
    flex-direction: column;
    gap: var(--space-sm);
  }
}

@media (max-width: 768px) {
  section[id] {
    scroll-margin-top: 56px;
  }
}
</style>

<!-- ══════════════════════════════════════════════════════
     Section 1: Hero
     ══════════════════════════════════════════════════════ -->
<section class="section-dark section-hero-full p10-hero" id="p10-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" id="p10-eyebrow" style="opacity:0;">Module 01 / Page 10</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;" id="p10-hero-title">工作流与导出</h1>
    <p class="page-hero-sub" id="p10-hero-sub" style="opacity:0;">Research Workflow &amp; Export</p>
    <p class="p10-hero-tagline" id="p10-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">
      从原始数据到顶刊图表，掌握每一步的决策与规范——<br>
      让你的图表在第一次提交时就符合期刊要求。
    </p>
    <nav class="hero-quicknav" id="p10-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p10-workflow">工作流六步</button>
      <button class="hero-quicknav__item" data-target="#p10-format">格式对比</button>
      <button class="hero-quicknav__item" data-target="#p10-dpi">DPI 对比</button>
      <button class="hero-quicknav__item" data-target="#p10-calc">分辨率计算器</button>
      <button class="hero-quicknav__item" data-target="#p10-journal">期刊速查</button>
    </nav>
    <div class="p10-scroll-hint" id="p10-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 2: Workflow
     ══════════════════════════════════════════════════════ -->
<section class="p10-workflow-section" id="p10-workflow">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Workflow</p>
    <h2 class="p10-section-title">出版级图表工作流</h2>
    <p class="p10-section-sub">六个核心步骤，覆盖从数据整理到最终导出的完整流程。每一步都有典型陷阱——提前知道，提前避开。</p>
  </div>
  <div class="p10-wf-body" id="p10-wf-body">
    <!-- 左侧：步骤指示器 -->
    <div class="p10-wf-left" id="p10-wf-left">
      <div class="p10-wf-step-indicator" id="p10-wf-indicator">
        ${n}
      </div>
    </div>
    <!-- 右侧：面板 -->
    <div class="p10-wf-right" id="p10-wf-right">
      ${o}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 3: Format Comparison
     ══════════════════════════════════════════════════════ -->
<section class="p10-format-section" id="p10-format">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">File Formats</p>
    <h2 class="p10-section-title" style="color:var(--text-on-dark);">图像格式对比</h2>
    <p class="p10-section-sub" style="color:var(--text-on-dark-2);">SVG、PDF、PNG、TIFF、EPS——每种格式都有其最适用的场景。选错格式会导致期刊返修。</p>
  </div>
  <!-- 标签栏 -->
  <div class="p10-format-tabs" id="p10-format-tabs" role="tablist">
    ${a}
  </div>
  <!-- 内容面板 -->
  <div id="p10-format-panels">
    ${s}
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 4: DPI Comparison
     ══════════════════════════════════════════════════════ -->
<section class="p10-dpi-section" id="p10-dpi">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Resolution</p>
    <h2 class="p10-section-title">DPI 视觉对比</h2>
    <p class="p10-section-sub">同一图像在不同分辨率下的清晰度差异。72 DPI 仅适合屏幕预览，期刊提交至少需要 300 DPI。</p>
  </div>

  <!-- 桌面端：4 格网格 -->
  <div class="p10-dpi-grid" id="p10-dpi-grid">
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-72" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">72 DPI</div>
      <div class="p10-dpi-label">屏幕预览<br>网页/演示文稿草稿</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-150" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">150 DPI</div>
      <div class="p10-dpi-label">过渡分辨率<br>不推荐用于期刊</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-300" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">300 DPI</div>
      <div class="p10-dpi-label">半色调标准<br>Nature / Cell 半色调要求</div>
    </div>
    <div class="p10-dpi-cell">
      <div class="p10-dpi-canvas-wrap">
        <canvas id="p10-dpi-canvas-600" width="300" height="300"></canvas>
      </div>
      <div class="p10-dpi-value">600 DPI</div>
      <div class="p10-dpi-label">线图标准<br>Cell / Science 线图要求</div>
    </div>
  </div>

  <!-- 移动端：Tab + 单画布 -->
  <div class="p10-dpi-tabs-mobile" id="p10-dpi-tabs-mobile">
    <div class="p10-dpi-mobile-tabs-bar">
      <button class="p10-dpi-mobile-tab active" data-dpi="72">72</button>
      <button class="p10-dpi-mobile-tab" data-dpi="150">150</button>
      <button class="p10-dpi-mobile-tab" data-dpi="300">300</button>
      <button class="p10-dpi-mobile-tab" data-dpi="600">600</button>
    </div>
    <div class="p10-dpi-mobile-canvas-wrap">
      <canvas id="p10-dpi-mobile-canvas" width="300" height="300"></canvas>
    </div>
    <p style="text-align:center;font-family:var(--font-code);font-size:var(--text-small);color:var(--text-on-light-2);margin-top:var(--space-sm);" id="p10-dpi-mobile-label">72 DPI — 屏幕预览</p>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 5: Resolution Calculator
     ══════════════════════════════════════════════════════ -->
<section class="p10-calc-section" id="p10-calc">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Calculator</p>
    <h2 class="p10-section-title" style="color:var(--text-on-dark);">分辨率计算器</h2>
    <p class="p10-section-sub" style="color:var(--text-on-dark-2);">输入图表的物理尺寸和目标 DPI，自动计算像素数、文件大小，并生成 ggsave 代码。</p>
  </div>

  <div class="p10-calc-layout">
    <!-- 输入面板 -->
    <div class="p10-calc-input-panel">
      <h3 class="p10-calc-title">参数输入</h3>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-width">宽度（cm）</label>
        <div class="p10-calc-input-row">
          <input
            type="number"
            id="p10-calc-width"
            class="p10-calc-input"
            value="8.9"
            min="1"
            max="100"
            step="0.1"
            inputmode="decimal"
          >
          <span class="p10-calc-unit">cm</span>
        </div>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-height">高度（cm）</label>
        <div class="p10-calc-input-row">
          <input
            type="number"
            id="p10-calc-height"
            class="p10-calc-input"
            value="6.0"
            min="1"
            max="100"
            step="0.1"
            inputmode="decimal"
          >
          <span class="p10-calc-unit">cm</span>
        </div>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-dpi">DPI</label>
        <select id="p10-calc-dpi" class="p10-calc-select">
          <option value="72">72 DPI — 屏幕草稿</option>
          <option value="150">150 DPI — 低质量位图</option>
          <option value="300" selected>300 DPI — 半色调标准</option>
          <option value="600">600 DPI — 线图标准</option>
          <option value="1000">1000 DPI — Nature 线图</option>
        </select>
      </div>

      <div class="p10-calc-field">
        <label class="p10-calc-label" for="p10-calc-format">格式</label>
        <select id="p10-calc-format" class="p10-calc-select">
          <option value="png">PNG（无损位图）</option>
          <option value="tiff">TIFF（无损位图，LZW）</option>
          <option value="jpeg">JPEG（有损位图）</option>
          <option value="svg">PDF / SVG（矢量，ggsave 生成 PDF）</option>
        </select>
      </div>
    </div>

    <!-- 结果面板 -->
    <div class="p10-calc-result-panel">
      <div class="p10-calc-result-grid">
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">宽度像素</div>
          <div class="p10-calc-result-val" id="p10-res-w">1051 <span class="p10-calc-result-unit">px</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">高度像素</div>
          <div class="p10-calc-result-val" id="p10-res-h">709 <span class="p10-calc-result-unit">px</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">总像素</div>
          <div class="p10-calc-result-val" id="p10-res-mp">0.74 <span class="p10-calc-result-unit">MP</span></div>
        </div>
        <div class="p10-calc-result-card">
          <div class="p10-calc-result-label">估算大小</div>
          <div class="p10-calc-result-val" id="p10-res-size">2.1 <span class="p10-calc-result-unit">MB</span></div>
        </div>
      </div>

      <div class="p10-calc-code-wrap">
        <div class="p10-calc-code-label">ggsave 代码</div>
        <pre id="p10-calc-code">ggsave(
  "figure.png",
  plot   = p_final,
  width  = 8.9,
  height = 6.0,
  units  = "cm",
  dpi    = 300
)</pre>
      </div>

      <div class="p10-calc-warning" id="p10-calc-warning">
        <p class="p10-calc-warning-text" id="p10-calc-warning-text"></p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Section 6: Journal Reference
     ══════════════════════════════════════════════════════ -->
<section class="p10-journal-section" id="p10-journal">
  <div class="p10-section-header">
    <p class="p10-section-eyebrow">Journal Guide</p>
    <h2 class="p10-section-title">期刊投稿速查</h2>
    <p class="p10-section-sub">选择目标期刊，快速查看图表尺寸、分辨率、格式和字体要求。</p>
  </div>

  <div class="p10-journal-search">
    <label class="p10-journal-select-label" for="p10-journal-select">选择期刊</label>
    <select id="p10-journal-select" class="p10-journal-select">
      <option value="" disabled selected>— 请选择期刊 —</option>
      ${i}
    </select>
  </div>

  <div id="p10-journal-result">
    <div id="p10-journal-card">
      <!-- 由 JS 填充 -->
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════════════════
     Footer CTA
     ══════════════════════════════════════════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">10 / 10</p>
  <h2 class="page-footer-quote">每一张顶刊图表的背后，都是一套被反复验证的工作流</h2>
  <p class="page-footer-desc">
    模块一「科研数据可视化」到此完结。你已掌握色彩理论、R/Python 绘图、图表选择与导出规范。<br>
    模块二将介绍 AI 辅助科研绘图——用 Midjourney、Stable Diffusion 与 ChatGPT 加速你的科研视觉创作。
  </p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p10-prev-btn">← Python 可视化</button>
    <button class="btn-ghost" id="p10-home-btn">返回模块首页</button>
    <button class="btn-primary" id="p10-next-btn">进入模块二 →</button>
  </div>
</section>

</div>
`}function rt(){document.querySelectorAll("#p10-quicknav .hero-quicknav__item").forEach(o=>{o.addEventListener("click",()=>{const a=document.querySelector(o.dataset.target);a&&a.scrollIntoView({behavior:"smooth",block:"start"})})});const n=E.timeline({delay:.2});n.fromTo("#p10-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),n.fromTo("#p10-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),n.fromTo("#p10-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),n.fromTo("#p10-hero .p10-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),n.fromTo("#p10-hero #p10-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),n.fromTo("#p10-hero .p10-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.getElementById("p10-prev-btn")?.addEventListener("click",()=>j("m1-p9")),document.getElementById("p10-home-btn")?.addEventListener("click",()=>j("m1-p1")),document.getElementById("p10-next-btn")?.addEventListener("click",()=>j("m2-p1")),H(),J(),O(),X(),K(),E&&R&&window.innerWidth>=769&&["#p10-workflow","#p10-format","#p10-dpi","#p10-calc","#p10-journal"].forEach(a=>{const s=document.querySelector(a);if(!s)return;const i=s.querySelectorAll(".p10-section-eyebrow, .p10-section-title, .p10-section-sub");i.length&&E.from(i,{scrollTrigger:{trigger:s,start:"top 85%"},opacity:0,y:40,duration:.8,stagger:.12,ease:"power3.out"})})}function st(){N(),P&&(window.removeEventListener("scroll",P),P=null),S.forEach(n=>{try{n.destroy()}catch{}}),S=[]}function H(){const n=window.innerWidth<=900;B.forEach((o,a)=>{const s=document.getElementById(`p10-wf-code-${a}`);if(s)try{const i=C(s,{code:o.code,language:"r",readOnly:!0});i&&i.destroy&&S.push(i)}catch{s.innerHTML=`<pre style="background:#1a1a2e;padding:16px;border-radius:8px;font-family:var(--font-code);font-size:0.78rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${o.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>`}}),n?G():q()}function G(){const n=document.querySelectorAll(".p10-wf-dot"),o=document.querySelectorAll(".p10-wf-panel");function a(s){n.forEach((i,t)=>i.classList.toggle("active",t===s)),o.forEach((i,t)=>{i.style.display=t===s?"flex":"none"})}a(0),o.forEach((s,i)=>{i>0&&(s.style.display="none")}),n.forEach((s,i)=>{s.addEventListener("click",()=>a(i))})}function q(){const n=document.getElementById("p10-wf-body"),o=document.getElementById("p10-wf-left");if(!n||!o)return;let a=0;const s=B.length;function i(m){a=m,document.querySelectorAll(".p10-wf-dot").forEach((c,e)=>{c.classList.toggle("active",e===m)}),document.querySelectorAll(".p10-wf-connector").forEach((c,e)=>{c.classList.toggle("passed",e<m)})}const t=n.offsetHeight,l=o.offsetHeight,f=Math.max(0,t-l);let u=!1;function d(){u||(u=!0,requestAnimationFrame(()=>{const m=Math.max(0,-n.getBoundingClientRect().top);o.style.transform=`translateY(${Math.min(m,f)}px)`;const c=Math.min(s-1,Math.max(0,Math.floor(m/window.innerHeight)));c!==a&&i(c),u=!1}))}P=d,window.addEventListener("scroll",d,{passive:!0}),d(),document.querySelectorAll(".p10-wf-dot").forEach((m,c)=>{m.addEventListener("click",()=>{const e=document.getElementById(`p10-wf-panel-${c}`);e&&e.scrollIntoView({behavior:"smooth",block:"start"})})})}function J(){const n=document.querySelectorAll(".p10-format-tab"),o=document.querySelectorAll(".p10-format-panel");n.forEach(a=>{a.addEventListener("click",()=>{const s=parseInt(a.dataset.fmt);n.forEach((i,t)=>i.classList.toggle("active",t===s)),o.forEach((i,t)=>i.classList.toggle("active",t===s)),requestAnimationFrame(()=>_(s))})}),_(0),I.forEach((a,s)=>{const i=document.getElementById(`p10-fmt-code-${s}`);if(i)try{const t=C(i,{code:a.code,language:"r",readOnly:!0});t&&t.destroy&&S.push(t)}catch{i.innerHTML=`<pre style="background:#0d1117;padding:14px;border-radius:8px;font-size:0.75rem;color:#a1a1a6;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;overflow:hidden;">${a.code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</pre>`}})}function _(n){const o=I[n],a=document.getElementById(`p10-fmt-svg-${n}`);!a||a._rendered||(a._rendered=!0,o.type==="vector"?V(a,o):Y(a,o))}function V(n,o){const a=W(n).append("svg").attr("viewBox","0 0 420 230").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","100%");a.append("rect").attr("width",420).attr("height",230).attr("fill","#0d1117"),a.append("text").attr("x",210).attr("y",22).attr("text-anchor","middle").attr("fill",o.color).attr("font-size",12).attr("font-family","JetBrains Mono, monospace").text("矢量格式：无限缩放不失真"),a.append("line").attr("x1",210).attr("y1",34).attr("x2",210).attr("y2",210).attr("stroke","#2a2a3a").attr("stroke-width",1).attr("stroke-dasharray","4,3");const s=[0,1,2,3,4,5].map(r=>({x:r,y:[2.1,3.8,2.9,4.5,3.2,5.1][r]})),i=z().domain([0,5]).range([32,188]),t=z().domain([0,6]).range([195,46]);a.append("line").attr("x1",32).attr("y1",195).attr("x2",188).attr("y2",195).attr("stroke","#3a3a4a").attr("stroke-width",1),a.append("line").attr("x1",32).attr("y1",46).attr("x2",32).attr("y2",195).attr("stroke","#3a3a4a").attr("stroke-width",1),[1,3,5].forEach(r=>{a.append("line").attr("x1",28).attr("y1",t(r)).attr("x2",32).attr("y2",t(r)).attr("stroke","#3a3a4a").attr("stroke-width",1)});const l=A().x(r=>i(r.x)).y(r=>t(r.y)).curve($);a.append("path").attr("d",l(s)).attr("fill","none").attr("stroke",o.color).attr("stroke-width",2).attr("stroke-dasharray",function(){return this.getTotalLength()}).attr("stroke-dashoffset",function(){return this.getTotalLength()}).transition().duration(1200).ease(T).attr("stroke-dashoffset",0),s.forEach(r=>{a.append("circle").attr("cx",i(r.x)).attr("cy",t(r.y)).attr("r",0).attr("fill",o.color).attr("stroke","#0d1117").attr("stroke-width",1).transition().delay(1e3).duration(300).attr("r",3.5)}),a.append("text").attr("x",110).attr("y",215).attr("text-anchor","middle").attr("fill","#555").attr("font-size",10).attr("font-family","JetBrains Mono, monospace").text("100% 原始大小"),a.append("rect").attr("x",222).attr("y",38).attr("width",174).attr("height",162).attr("fill","#111520").attr("rx",4);const u=s.slice(1,5),d=z().domain([1,4]).range([234,382]),m=z().domain([2,6]).range([185,50]);a.append("line").attr("x1",234).attr("y1",185).attr("x2",382).attr("y2",185).attr("stroke","#3a3a4a").attr("stroke-width",.8),a.append("line").attr("x1",234).attr("y1",50).attr("x2",234).attr("y2",185).attr("stroke","#3a3a4a").attr("stroke-width",.8);const c=A().x(r=>d(r.x)).y(r=>m(r.y)).curve($);a.append("path").attr("d",c(u)).attr("fill","none").attr("stroke",o.color).attr("stroke-width",2.8).attr("stroke-dasharray",function(){return this.getTotalLength()}).attr("stroke-dashoffset",function(){return this.getTotalLength()}).transition().delay(300).duration(1e3).ease(T).attr("stroke-dashoffset",0),u.forEach(r=>{a.append("circle").attr("cx",d(r.x)).attr("cy",m(r.y)).attr("r",0).attr("fill",o.color).attr("stroke","#0d1117").attr("stroke-width",1.5).transition().delay(1200).duration(300).attr("r",6)}),a.append("rect").attr("x",222).attr("y",38).attr("width",48).attr("height",18).attr("fill",o.color).attr("rx",3),a.append("text").attr("x",246).attr("y",51).attr("text-anchor","middle").attr("fill","#000").attr("font-size",10).attr("font-weight","bold").attr("font-family","JetBrains Mono, monospace").text("×4 zoom"),a.append("text").attr("x",309).attr("y",215).attr("text-anchor","middle").attr("fill",o.color).attr("font-size",10).attr("font-family","JetBrains Mono, monospace").text("依然清晰 ✓")}function Y(n,o){const a=document.createElement("canvas"),s=420,i=230;a.width=s,a.height=i,a.style.width="100%",a.style.height="100%",n.appendChild(a);const t=a.getContext("2d");t.roundRect||(t.roundRect=function(p,v,y,x,w){this.beginPath(),this.moveTo(p+w,v),this.arcTo(p+y,v,p+y,v+x,w),this.arcTo(p+y,v+x,p,v+x,w),this.arcTo(p,v+x,p,v,w),this.arcTo(p,v,p+y,v,w),this.closePath()}),t.fillStyle="#0d1117",t.fillRect(0,0,s,i),t.fillStyle=o.color,t.font='12px "JetBrains Mono", monospace',t.textAlign="center",t.fillText("位图格式：放大后像素化",s/2,22),t.strokeStyle="#2a2a3a",t.setLineDash([4,3]),t.lineWidth=1,t.beginPath(),t.moveTo(210,34),t.lineTo(210,210),t.stroke(),t.setLineDash([]);const l=10,f=36;t.strokeStyle="#3a3a4a",t.lineWidth=1,t.beginPath(),t.moveTo(36+l,36+f),t.lineTo(36+l,158+f),t.stroke(),t.beginPath(),t.moveTo(36+l,158+f),t.lineTo(168+l,158+f),t.stroke();const u=[[36,120],[58,88],[80,108],[102,68],[124,84],[146,54]].map(([p,v])=>[p+l,v+f]);t.strokeStyle=o.color,t.lineWidth=2,t.beginPath(),u.forEach(([p,v],y)=>y===0?t.moveTo(p,v):t.lineTo(p,v)),t.stroke(),u.forEach(([p,v])=>{t.beginPath(),t.arc(p,v,3,0,Math.PI*2),t.fillStyle=o.color,t.fill(),t.strokeStyle="#0d1117",t.lineWidth=1,t.stroke()}),t.fillStyle="#555",t.font='10px "JetBrains Mono", monospace',t.textAlign="center",t.fillText("100% 原始大小",107,215),t.fillStyle="#111520",t.beginPath(),t.roundRect(222,38,174,162,4),t.fill();const d=13,m=228,c=48,e="#0d1117",r=o.color,g=o.color+"88",h=o.color+"33",b=[[e,e,e,g,r,r,g,e,e,e,e,e],[e,e,g,r,r,g,e,e,e,e,e,e],[e,g,r,r,g,e,e,e,e,e,e,e],[g,r,r,h,e,e,e,e,e,e,e,e],[r,r,h,e,e,e,g,r,g,e,e,e],[r,h,e,e,e,g,r,r,g,e,e,e],[h,e,e,e,g,r,r,h,e,e,e,e],[e,e,e,g,r,r,h,e,e,e,e,e],[e,e,g,r,h,e,e,e,g,r,g,e],[e,g,r,h,e,e,e,e,g,r,g,e]];for(let p=0;p<b.length;p++)for(let v=0;v<b[p].length;v++)t.fillStyle=b[p][v],t.fillRect(m+v*d,c+p*d,d-1,d-1);t.strokeStyle="rgba(255,255,255,0.05)",t.lineWidth=.5;for(let p=0;p<=12;p++)t.beginPath(),t.moveTo(m+p*d,c),t.lineTo(m+p*d,c+b.length*d),t.stroke();for(let p=0;p<=b.length;p++)t.beginPath(),t.moveTo(m,c+p*d),t.lineTo(m+12*d,c+p*d),t.stroke();t.fillStyle=o.color,t.beginPath(),t.roundRect(222,38,48,18,3),t.fill(),t.fillStyle="#000",t.font='bold 10px "JetBrains Mono", monospace',t.textAlign="center",t.fillText("×4 zoom",246,51),t.fillStyle="#E07A7A",t.font='10px "JetBrains Mono", monospace',t.textAlign="center",t.fillText("像素化 ✗",309,215)}function O(){const n=[72,150,300,600],o={72:"屏幕显示（模糊）",150:"一般印刷",300:"期刊标准 ✓",600:"顶刊线条图 ✓"};function a(l,f){l.width=300,l.height=300;const d=l.getContext("2d");d.fillStyle="#ffffff",d.fillRect(0,0,300,300);const m=document.createElement("canvas"),c=Math.max(8,Math.round(300*f/300/4));m.width=c,m.height=c;const e=m.getContext("2d");e.fillStyle="#ffffff",e.fillRect(0,0,c,c),e.beginPath(),e.arc(c*.35,c*.4,c*.22,0,Math.PI*2),e.fillStyle="#7EC8E3",e.fill(),e.lineWidth=Math.max(.5,c*.02),e.strokeStyle="#1d1d1f",e.stroke(),e.beginPath(),e.moveTo(c*.1,c*.75),e.lineTo(c*.6,c*.55),e.lineTo(c*.9,c*.7),e.strokeStyle="#95D5B2",e.lineWidth=Math.max(.5,c*.025),e.stroke(),e.font=`${Math.max(4,c*.15)}px Arial`,e.fillStyle="#1d1d1f",e.fillText("ABC",c*.55,c*.4),d.imageSmoothingEnabled=f>=300,d.drawImage(m,0,0,300,300),d.fillStyle="#1d1d1f",d.font="bold 20px Inter, sans-serif",d.textAlign="center",d.fillText(`${f} DPI`,300/2,284)}n.forEach(l=>{const f=document.getElementById(`p10-dpi-canvas-${l}`);f&&a(f,l)});const s=document.querySelectorAll(".p10-dpi-mobile-tab"),i=document.getElementById("p10-dpi-mobile-canvas"),t=document.getElementById("p10-dpi-mobile-label");i&&(a(i,72),t&&(t.textContent=`72 DPI — ${o[72]}`)),s.forEach(l=>{l.addEventListener("click",()=>{const f=parseInt(l.dataset.dpi);s.forEach(u=>u.classList.toggle("active",u.dataset.dpi==f)),i&&a(i,f),t&&(t.textContent=`${f} DPI — ${o[f]||""}`)})})}function X(){const n=document.getElementById("p10-calc-width"),o=document.getElementById("p10-calc-height"),a=document.getElementById("p10-calc-dpi"),s=document.getElementById("p10-calc-format"),i=document.getElementById("p10-res-w"),t=document.getElementById("p10-res-h"),l=document.getElementById("p10-res-mp"),f=document.getElementById("p10-res-size"),u=document.getElementById("p10-calc-code"),d=document.getElementById("p10-calc-warning"),m=document.getElementById("p10-calc-warning-text");if(!n||!i)return;function c(){const e=parseFloat(n.value)||8.9,r=parseFloat(o.value)||6,g=parseInt(a.value)||300,h=s.value,b=Math.round(e/2.54*g),p=Math.round(r/2.54*g),v=b*p,y=(v/1e6).toFixed(2);let x=0;h==="png"?x=v*.6:h==="tiff"?x=v*1.2:h==="jpeg"&&(x=v*.4);const w=x>0?(x/1024/1024).toFixed(1):"—";let k="";h==="png"?k="无损压缩，适合网页与演示文稿":h==="tiff"?k="LZW 无损压缩，期刊提交首选":h==="jpeg"?k="有损压缩，不建议用于期刊投稿":k="矢量格式，ggsave 生成 PDF 文件",i&&(i.innerHTML=`${b.toLocaleString()} <span class="p10-calc-result-unit">px</span>`),t&&(t.innerHTML=`${p.toLocaleString()} <span class="p10-calc-result-unit">px</span>`),l&&(l.innerHTML=`${y} <span class="p10-calc-result-unit">MP</span>`),f&&(f.innerHTML=x>0?`<span class="p10-calc-result-value">${w} MB</span><p class="p10-calc-result-note">${k}</p>`:`<span class="p10-calc-result-value">矢量</span><p class="p10-calc-result-note">${k}</p>`);const F=h==="svg"?"pdf":h,L=F==="tiff"?`,
  compression = "lzw"`:"";if(u&&(u.textContent=`ggsave("figure.${F}",
  plot   = p,
  width  = ${e},
  height = ${r},
  units  = "cm",
  dpi    = ${g}${L}
)`),d){const D=x>10485760;d.classList.toggle("visible",D),m&&D&&(m.textContent=`⚠️ 估算文件大小约 ${w} MB，超过 10MB。建议使用 LZW 压缩（TIFF）或改用矢量格式（PDF/SVG）。`)}}[n,o,a,s].forEach(e=>{e.addEventListener("input",c),e.addEventListener("change",c)}),c()}function K(){const n=document.getElementById("p10-journal-select"),o=document.getElementById("p10-journal-result"),a=document.getElementById("p10-journal-card");!n||!o||!a||n.addEventListener("change",()=>{const s=n.value;if(!s){o.classList.remove("visible");return}const i=M.find(t=>t.name===s);i&&(a.innerHTML=`
      <div class="p10-journal-card-header">
        <div>
          <div class="p10-journal-card-name">${i.name}</div>
          <div class="p10-journal-card-group">${i.group}</div>
        </div>
      </div>
      <div class="p10-journal-card-body">
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-title">栏宽规格</div>
          <div class="p10-journal-width-grid">
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">单栏</span>
              <span class="p10-journal-width-val">${i.single}</span>
            </div>
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">1.5 栏</span>
              <span class="p10-journal-width-val">${i.oneHalf}</span>
            </div>
            <div class="p10-journal-width-cell">
              <span class="p10-journal-width-label">双栏</span>
              <span class="p10-journal-width-val">${i.double}</span>
            </div>
          </div>
        </div>
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-title">分辨率要求</div>
          <div class="p10-journal-dpi-grid">
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">半色调</span>
              <span class="p10-journal-dpi-val">${i.dpi_halftone} DPI</span>
            </div>
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">线条图</span>
              <span class="p10-journal-dpi-val">${i.dpi_line} DPI</span>
            </div>
            <div class="p10-journal-dpi-cell">
              <span class="p10-journal-dpi-label">混合图</span>
              <span class="p10-journal-dpi-val">${i.dpi_combo} DPI</span>
            </div>
          </div>
        </div>
        <div class="p10-journal-spec-section">
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">格式</span>
            <span class="p10-journal-spec-val">${i.formats}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">色彩</span>
            <span class="p10-journal-spec-val">${i.color}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">文件大小</span>
            <span class="p10-journal-spec-val">${i.maxSize}</span>
          </div>
          <div class="p10-journal-spec-row">
            <span class="p10-journal-spec-key">字体</span>
            <span class="p10-journal-spec-val">${i.fonts}</span>
          </div>
        </div>
        <div class="p10-journal-notes">📌 ${i.notes}</div>
      </div>
    `,o.classList.add("visible"),E&&E.fromTo(a,{opacity:0,y:20},{opacity:1,y:0,duration:.5,ease:"power3.out"}))})}export{st as destroy,rt as init,ot as render};
