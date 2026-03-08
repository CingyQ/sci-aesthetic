// 首页 — 临时样式展示页
// 展示所有设计系统组件在明暗背景交替下的效果

export function render() {
  return `
    <div class="page-scroll">

      <!-- ====== Hero（深色） ====== -->
      <section class="section-dark" style="align-items:center;">
        <h1 class="text-hero" style="color:var(--text-on-dark);text-align:center;">设计系统</h1>
        <p class="page-hero-sub">科研绘图指南 — 样式展示页</p>
      </section>

      <!-- ====== 色彩系统（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">色彩系统</h2>

          <h6 style="margin-bottom:var(--space-sm);">浅色表面</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-lg);">
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#fafafa;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">bg-light</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#f5f5f7;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">bg-light-alt</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#ffffff;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">bg-elevated</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#1d1d1f;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">text-on-light</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#6e6e73;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">text-2</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#86868b;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">text-3</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#d2d2d7;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">border</span>
            </div>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">强调色 + 模块标识色</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-lg);">
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#7EC8E3;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">accent</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#5BA3C9;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">accent-hover</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#B8B8E8;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">M2 淡紫</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#95D5B2;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">M3 薄荷绿</span>
            </div>
            <div style="text-align:center;">
              <div class="color-swatch-lg" style="background:#F0B27A;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-light-3);margin-top:4px;display:block;">M4 暖橙</span>
            </div>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">数据色</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <div class="color-swatch" style="background:var(--data-blue);"></div>
            <div class="color-swatch" style="background:var(--data-green);"></div>
            <div class="color-swatch" style="background:var(--data-purple);"></div>
            <div class="color-swatch" style="background:var(--data-orange);"></div>
            <div class="color-swatch" style="background:var(--data-red);"></div>
            <div class="color-swatch" style="background:var(--data-yellow);"></div>
            <div class="color-swatch" style="background:var(--data-pink);"></div>
            <div class="color-swatch" style="background:var(--data-teal);"></div>
          </div>
        </div>
      </section>

      <!-- ====== 字体排版（深色） ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">字体排版</h2>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-hero · Playfair Display · 700</p>
            <span class="text-hero" style="color:var(--text-on-dark);">Science</span>
          </div>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-display · Playfair Display · 700</p>
            <span class="page-hero-title" style="color:var(--text-on-dark);text-align:left;">科研绘图指南</span>
          </div>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-title · Inter · 300（引言/副标题）</p>
            <span style="font-size:var(--text-title);font-weight:300;line-height:1.4;color:var(--text-on-dark-2);">面向科研工作者的交互式教学网站</span>
          </div>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-heading · Inter · 700</p>
            <h3>图表选择指南</h3>
          </div>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-body · Noto Sans SC · 400 · line-height 1.8</p>
            <p style="color:var(--text-on-dark-2);">在科研论文写作中，数据可视化是传递研究发现的核心手段。一张精心设计的图表不仅能让审稿人快速理解你的数据模式，更能在读者脑中留下深刻印象。好的图表设计遵循「数据墨水比」原则——每一滴墨水都应服务于数据本身。</p>
          </div>

          <div style="margin-bottom:var(--space-xl);">
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-code · JetBrains Mono · 400</p>
            <pre><code>library(ggplot2)
ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "#7EC8E3", size = 3) +
  theme_minimal(base_size = 14)</code></pre>
          </div>

          <div>
            <p style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">--text-stat · 统计数字</p>
            <div style="display:flex;gap:var(--space-xl);flex-wrap:wrap;">
              <div>
                <span class="stat-number" style="color:var(--accent);">31</span>
                <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">教学章节</p>
              </div>
              <div>
                <span class="stat-number" style="color:var(--accent);">120+</span>
                <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">交互组件</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 按钮（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">按钮</h2>

          <h6 style="margin-bottom:var(--space-sm);">Primary</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;margin-bottom:var(--space-lg);">
            <button class="btn-primary">开始学习</button>
            <button class="btn-primary btn-small">小按钮</button>
            <button class="btn-primary" disabled>禁用状态</button>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">Ghost</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;margin-bottom:var(--space-lg);">
            <button class="btn-ghost">查看详情</button>
            <button class="btn-ghost btn-small">小按钮</button>
            <button class="btn-ghost" disabled>禁用状态</button>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">Icon Button</h6>
          <div style="display:flex;gap:var(--space-sm);align-items:center;">
            <button class="btn-icon" aria-label="复制">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            </button>
            <button class="btn-icon" aria-label="下载">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
            <button class="btn-icon" aria-label="设置">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          </div>
        </div>
      </section>

      <!-- ====== 按钮 - 深色背景 ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">按钮（深色背景）</h2>

          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;margin-bottom:var(--space-lg);">
            <button class="btn-primary">开始学习</button>
            <button class="btn-ghost">查看详情</button>
            <button class="btn-icon" aria-label="设置">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </button>
          </div>
        </div>
      </section>

      <!-- ====== 标签（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">标签（Tags）</h2>

          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-lg);">
            <span class="tag">默认标签</span>
            <span class="tag tag-m1">数据可视化</span>
            <span class="tag tag-m2">AI 辅助</span>
            <span class="tag tag-m3">矢量设计</span>
            <span class="tag tag-m4">演示设计</span>
          </div>

          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <span class="tag tag-success">通过</span>
            <span class="tag tag-warning">注意</span>
            <span class="tag tag-error">错误</span>
          </div>
        </div>
      </section>

      <!-- ====== 输入框 + 下拉 + 滑块（深色） ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">输入控件（深色背景）</h2>

          <div style="max-width:480px;">
            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-dark-2);margin-bottom:var(--space-xs);">文本输入</label>
              <input class="input" type="text" placeholder="输入颜色 HEX 值，如 #7EC8E3" />
            </div>

            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-dark-2);margin-bottom:var(--space-xs);">下拉选择</label>
              <select class="select">
                <option>选择图表类型</option>
                <option>散点图 Scatter</option>
                <option>柱状图 Bar</option>
                <option>折线图 Line</option>
                <option>箱线图 Boxplot</option>
              </select>
            </div>

            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-dark-2);margin-bottom:var(--space-xs);">数值输入</label>
              <input class="input input-number" type="number" inputmode="decimal" placeholder="300" min="72" max="1200" step="1" />
            </div>

            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-dark-2);margin-bottom:var(--space-xs);">滑块 — DPI: <span id="dpi-value">300</span></label>
              <input class="range" type="range" min="72" max="600" value="300" id="dpi-slider" />
            </div>

            <div>
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-dark-2);margin-bottom:var(--space-xs);">文本域</label>
              <textarea class="input" rows="3" placeholder="输入 R 代码或描述…"></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 输入框（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">输入控件（浅色背景）</h2>

          <div style="max-width:480px;">
            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-light-2);margin-bottom:var(--space-xs);">文本输入</label>
              <input class="input" type="text" placeholder="输入期刊名称" />
            </div>

            <div style="margin-bottom:var(--space-md);">
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-light-2);margin-bottom:var(--space-xs);">下拉选择</label>
              <select class="select">
                <option>选择配色方案</option>
                <option>viridis</option>
                <option>RColorBrewer Set2</option>
                <option>ggsci Nature</option>
              </select>
            </div>

            <div>
              <label style="display:block;font-size:var(--text-small);color:var(--text-on-light-2);margin-bottom:var(--space-xs);">滑块 — 颜色数量: <span id="color-count-value">5</span></label>
              <input class="range" type="range" min="3" max="12" value="5" id="color-count-slider" />
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 表格（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">表格（浅色背景）</h2>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>期刊</th>
                  <th>图片宽度</th>
                  <th>DPI</th>
                  <th>格式</th>
                  <th>色彩模式</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Nature</strong></td>
                  <td>89 mm（单栏）/ 183 mm（双栏）</td>
                  <td>300+</td>
                  <td>TIFF, EPS, PDF</td>
                  <td>RGB</td>
                </tr>
                <tr>
                  <td><strong>Science</strong></td>
                  <td>85 mm / 114 mm / 174 mm</td>
                  <td>300+</td>
                  <td>EPS, PDF</td>
                  <td>RGB / CMYK</td>
                </tr>
                <tr>
                  <td><strong>Cell</strong></td>
                  <td>85 mm / 114 mm / 174 mm</td>
                  <td>300+</td>
                  <td>PDF, EPS, TIFF</td>
                  <td>RGB</td>
                </tr>
                <tr>
                  <td><strong>PNAS</strong></td>
                  <td>8.7 cm / 11.4 cm / 17.8 cm</td>
                  <td>300-600</td>
                  <td>TIFF, EPS</td>
                  <td>RGB</td>
                </tr>
                <tr>
                  <td><strong>Lancet</strong></td>
                  <td>89 mm（单栏）</td>
                  <td>300+</td>
                  <td>EPS, TIFF</td>
                  <td>CMYK</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====== 表格（深色） ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">表格（深色背景）</h2>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>图表类型</th>
                  <th>适用数据</th>
                  <th>变量数</th>
                  <th>推荐场景</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>散点图</td>
                  <td>连续 × 连续</td>
                  <td>2-3</td>
                  <td>相关性、分布</td>
                </tr>
                <tr>
                  <td>柱状图</td>
                  <td>分类 × 连续</td>
                  <td>1-2</td>
                  <td>组间比较</td>
                </tr>
                <tr>
                  <td>箱线图</td>
                  <td>分类 × 连续</td>
                  <td>1-2</td>
                  <td>分布比较</td>
                </tr>
                <tr>
                  <td>热力图</td>
                  <td>矩阵数据</td>
                  <td>3+</td>
                  <td>相关矩阵、基因表达</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====== 代码块 + inline code（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">代码</h2>

          <p style="margin-bottom:var(--space-md);">使用 <code>ggplot2</code> 的 <code>geom_point()</code> 函数可以创建散点图。设置 <code>color</code>、<code>size</code> 和 <code>alpha</code> 参数控制外观。</p>

          <pre><code>import matplotlib.pyplot as plt
import numpy as np

x = np.random.randn(200)
y = 2 * x + np.random.randn(200) * 0.5

fig, ax = plt.subplots(figsize=(8, 6), dpi=300)
ax.scatter(x, y, c='#7EC8E3', s=40, alpha=0.7, edgecolors='none')
ax.set_xlabel('Variable X', fontsize=12)
ax.set_ylabel('Variable Y', fontsize=12)
plt.tight_layout()
plt.savefig('scatter.pdf', dpi=300, bbox_inches='tight')</code></pre>
        </div>
      </section>

      <!-- ====== 间距 + 圆角 + 阴影（深色） ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">间距 · 圆角 · 阴影</h2>

          <h6 style="margin-bottom:var(--space-sm);">间距</h6>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:flex-end;margin-bottom:var(--space-xl);">
            <div style="text-align:center;">
              <div style="width:var(--space-xs);height:var(--space-xs);background:var(--accent);border-radius:2px;margin:0 auto;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-top:4px;display:block;">xs 8</span>
            </div>
            <div style="text-align:center;">
              <div style="width:var(--space-sm);height:var(--space-sm);background:var(--accent);border-radius:2px;margin:0 auto;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-top:4px;display:block;">sm 16</span>
            </div>
            <div style="text-align:center;">
              <div style="width:var(--space-md);height:var(--space-md);background:var(--accent);border-radius:2px;margin:0 auto;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-top:4px;display:block;">md 24</span>
            </div>
            <div style="text-align:center;">
              <div style="width:var(--space-lg);height:var(--space-lg);background:var(--accent);border-radius:2px;margin:0 auto;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-top:4px;display:block;">lg 48</span>
            </div>
            <div style="text-align:center;">
              <div style="width:80px;height:80px;background:var(--accent);border-radius:2px;margin:0 auto;"></div>
              <span style="font-size:var(--text-caption);color:var(--text-on-dark-3);margin-top:4px;display:block;">xl 80</span>
            </div>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">圆角</h6>
          <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;margin-bottom:var(--space-xl);">
            <div style="width:80px;height:80px;background:var(--bg-dark-elevated);border:1px solid var(--border-dark);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-dark-3);">sm 8</div>
            <div style="width:80px;height:80px;background:var(--bg-dark-elevated);border:1px solid var(--border-dark);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-dark-3);">md 16</div>
            <div style="width:80px;height:80px;background:var(--bg-dark-elevated);border:1px solid var(--border-dark);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-dark-3);">lg 24</div>
            <div style="width:80px;height:80px;background:var(--bg-dark-elevated);border:1px solid var(--border-dark);border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-dark-3);">full</div>
          </div>

          <h6 style="margin-bottom:var(--space-sm);">阴影（浅色背景展示）</h6>
          <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;">
            <div style="width:120px;height:80px;background:var(--bg-light-elevated);border-radius:var(--radius-md);box-shadow:var(--shadow-sm);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-light-2);">shadow-sm</div>
            <div style="width:120px;height:80px;background:var(--bg-light-elevated);border-radius:var(--radius-md);box-shadow:var(--shadow-md);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-light-2);">shadow-md</div>
            <div style="width:120px;height:80px;background:var(--bg-light-elevated);border-radius:var(--radius-md);box-shadow:var(--shadow-lg);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-light-2);">shadow-lg</div>
            <div style="width:120px;height:80px;background:var(--bg-light-elevated);border-radius:var(--radius-md);box-shadow:var(--shadow-glow);display:flex;align-items:center;justify-content:center;font-size:var(--text-caption);color:var(--text-on-light-2);">shadow-glow</div>
          </div>
        </div>
      </section>

      <!-- ====== 动画类预览（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">动画 CSS 类</h2>
          <p style="color:var(--text-on-light-2);margin-bottom:var(--space-lg);">点击按钮触发动画效果。GSAP ScrollTrigger 动画在 Phase 2 的 ScrollAnimations.js 中实现。</p>

          <div style="display:flex;gap:var(--space-md);flex-wrap:wrap;align-items:flex-start;">
            <div>
              <button class="btn-ghost btn-small" id="demo-fade">fade-in</button>
              <div id="demo-fade-target" style="margin-top:var(--space-sm);width:200px;height:60px;background:var(--accent-subtle);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:var(--text-small);color:var(--accent);transition:opacity 0.8s var(--ease-out),transform 0.8s var(--ease-out);">fade-in 目标</div>
            </div>

            <div>
              <button class="btn-ghost btn-small" id="demo-scale">scale-reveal</button>
              <div id="demo-scale-target" style="margin-top:var(--space-sm);width:200px;height:60px;background:var(--accent-subtle);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:var(--text-small);color:var(--accent);transition:opacity 1s var(--ease-out),transform 1s var(--ease-out);">scale-reveal 目标</div>
            </div>

            <div>
              <button class="btn-ghost btn-small pulse">pulse 脉冲</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 布局工具类（深色） ====== -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">布局工具类</h2>

          <h6 style="margin-bottom:var(--space-sm);">交错图文 .stagger-row</h6>
          <div class="stagger-row" style="margin-bottom:var(--space-xl);">
            <div style="background:var(--bg-dark-elevated);border-radius:var(--radius-md);height:200px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-dark);">
              <span style="color:var(--text-on-dark-3);">图片 / 交互组件</span>
            </div>
            <div>
              <h3 style="margin-bottom:var(--space-sm);">图左文右</h3>
              <p style="color:var(--text-on-dark-2);">使用 <code>.stagger-row</code> 实现交错图文布局。两个子元素各占 50%，移动端自动堆叠为纵向排列。</p>
            </div>
          </div>

          <div class="stagger-row reverse">
            <div style="background:var(--bg-dark-elevated);border-radius:var(--radius-md);height:200px;display:flex;align-items:center;justify-content:center;border:1px solid var(--border-dark);">
              <span style="color:var(--text-on-dark-3);">图片 / 交互组件</span>
            </div>
            <div>
              <h3 style="margin-bottom:var(--space-sm);">图右文左</h3>
              <p style="color:var(--text-on-dark-2);">添加 <code>.reverse</code> 翻转方向。移动端同样纵向堆叠，不受影响。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 过渡曲线（浅色） ====== -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-lg);">过渡与缓动</h2>

          <div class="table-wrapper" style="max-width:600px;">
            <table>
              <thead>
                <tr>
                  <th>变量</th>
                  <th>值</th>
                  <th>用途</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>--t-fast</code></td>
                  <td>0.2s ease-apple</td>
                  <td>hover、focus 等微交互</td>
                </tr>
                <tr>
                  <td><code>--t-base</code></td>
                  <td>0.35s ease-apple</td>
                  <td>按钮、输入框、侧边栏</td>
                </tr>
                <tr>
                  <td><code>--t-slow</code></td>
                  <td>0.6s ease-apple</td>
                  <td>页面过渡、模态弹窗</td>
                </tr>
                <tr>
                  <td><code>--ease-apple</code></td>
                  <td>cubic-bezier(0.25, 0.46, 0.45, 0.94)</td>
                  <td>通用缓动</td>
                </tr>
                <tr>
                  <td><code>--ease-out</code></td>
                  <td>cubic-bezier(0.16, 1, 0.3, 1)</td>
                  <td>弹出、展开动画</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ====== Footer CTA ====== -->
      <section class="section-dark" style="align-items:center;min-height:50vh;">
        <h2 style="text-align:center;margin-bottom:var(--space-md);">设计系统就绪</h2>
        <p class="subtitle" style="text-align:center;margin-bottom:var(--space-lg);">所有 CSS 变量、组件样式、明暗交替已验证</p>
        <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;justify-content:center;">
          <a href="#m1-p1" class="btn-primary">进入模块一</a>
          <a href="#ref" class="btn-ghost">速查手册</a>
        </div>
      </section>

    </div>
  `;
}

export function init() {
  // 滑块实时更新
  const dpiSlider = document.getElementById('dpi-slider');
  const dpiValue = document.getElementById('dpi-value');
  if (dpiSlider && dpiValue) {
    dpiSlider.addEventListener('input', () => {
      dpiValue.textContent = dpiSlider.value;
    });
  }

  const colorSlider = document.getElementById('color-count-slider');
  const colorValue = document.getElementById('color-count-value');
  if (colorSlider && colorValue) {
    colorSlider.addEventListener('input', () => {
      colorValue.textContent = colorSlider.value;
    });
  }

  // 动画 demo 按钮
  const demoFadeBtn = document.getElementById('demo-fade');
  const demoFadeTarget = document.getElementById('demo-fade-target');
  if (demoFadeBtn && demoFadeTarget) {
    let visible = true;
    demoFadeBtn.addEventListener('click', () => {
      visible = !visible;
      demoFadeTarget.style.opacity = visible ? '1' : '0';
      demoFadeTarget.style.transform = visible ? 'translateY(0)' : 'translateY(40px)';
    });
  }

  const demoScaleBtn = document.getElementById('demo-scale');
  const demoScaleTarget = document.getElementById('demo-scale-target');
  if (demoScaleBtn && demoScaleTarget) {
    let visible = true;
    demoScaleBtn.addEventListener('click', () => {
      visible = !visible;
      demoScaleTarget.style.opacity = visible ? '1' : '0';
      demoScaleTarget.style.transform = visible ? 'scale(1)' : 'scale(0.9)';
    });
  }
}

export function destroy() {
  // 无需清理（event listeners 随 DOM 销毁）
}
