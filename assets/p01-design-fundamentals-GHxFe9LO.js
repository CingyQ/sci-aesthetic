import{k as A,g as o,f as b}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as C}from"./index-D9wLY_eR.js";let z=[],B=[],S=-1;function g(t,s,i,c){t&&(t.addEventListener(s,i,c),z.push({el:t,type:s,fn:i,opts:c}))}const q=`
/* ── Hero 光晕 ── */
.df-hero { position: relative; overflow: hidden; }
.df-hero::before,
.df-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.df-hero::before { width:55%; height:45%; top:25%; left:10%; background:rgba(240,178,122,0.12); animation:df-drift-a 13s ease-in-out infinite alternate; }
.df-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.08); animation:df-drift-b 9s ease-in-out infinite alternate-reverse; }
@keyframes df-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-20px)} }
@keyframes df-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-25px,15px)} }

/* ── 滚动提示 ── */
.df-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:df-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes df-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 幻灯片容器 ── */
.df-slide { max-width:640px; aspect-ratio:16/9; border:1px solid rgba(0,0,0,0.08); border-radius:12px; box-shadow:0 4px 24px rgba(0,0,0,0.06); padding:40px; margin:0 auto; overflow:hidden; position:relative; background:#fff; }
.section-dark .df-slide { border-color:rgba(255,255,255,0.08); box-shadow:0 4px 24px rgba(0,0,0,0.3); background:rgba(255,255,255,0.03); }

/* ── 滑块 ── */
.df-slider { -webkit-appearance:none; width:100%; max-width:480px; height:4px; border-radius:2px; background:rgba(0,0,0,0.1); outline:none; margin:var(--space-md) auto 0; display:block; }
.df-slider::-webkit-slider-thumb { -webkit-appearance:none; width:20px; height:20px; border-radius:50%; background:var(--module-4); cursor:pointer; transition:transform 0.2s; }
.df-slider::-webkit-slider-thumb:hover { transform:scale(1.2); }
.df-slider::-moz-range-thumb { width:20px; height:20px; border-radius:50%; background:var(--module-4); cursor:pointer; border:none; }
.section-dark .df-slider { background:rgba(255,255,255,0.15); }

/* ── 步骤标签 ── */
.df-step-label { font-size:var(--text-caption); text-align:center; margin-top:var(--space-sm); transition:opacity 0.3s; color:var(--text-on-light-2); }
.section-dark .df-step-label { color:var(--text-on-dark-2); }

/* ── S1 看懂差距 ── */
.df-showcase-caption { transition:opacity 0.4s; }

/* ── S2 对比 ── */
.df-cs-title { transition:font-size 0.4s ease-out, font-weight 0.4s, color 0.4s; font-family:var(--font-heading); }
.df-cs-points { list-style:disc inside; transition:font-size 0.4s, color 0.4s; margin:var(--space-md) 0; }
.df-cs-points li { margin-bottom:8px; transition:color 0.4s; }
.df-cs-number { margin-top:var(--space-md); transition:font-size 0.4s ease-out, color 0.4s, font-weight 0.4s; font-family:var(--font-code); }

/* ── S3 配色 ── */
.df-color-bad { background: linear-gradient(135deg, #dde4ff 0%, #fff5e0 60%, #ffe0e8 100%) !important; border: 2px dashed rgba(200,0,0,0.18) !important; }
.df-color-bad ul { list-style:none; padding:0; margin:var(--space-sm) 0; }
.df-color-bad ul li { margin-bottom:6px; font-size:14px; }
.df-color-good ul { list-style:disc inside; padding:0; margin:var(--space-sm) 0; }
.df-color-good ul li { margin-bottom:6px; font-size:14px; transition:color 0.4s; }
.df-cg-title { transition:color 0.4s; }
.df-color-badge { position:absolute; top:12px; right:12px; font-size:11px; padding:3px 10px; border-radius:var(--radius-full,99px); background:rgba(255,80,80,0.15); color:#ff5050; }
.df-scheme-btn { padding:6px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-on-dark-2); cursor:pointer; font-size:13px; transition:all 0.3s; }
.df-scheme-btn.df-scheme-active { background:var(--module-4); border-color:var(--module-4); color:#1d1d1f; }
.df-swatch { width:36px; height:36px; border-radius:50%; cursor:pointer; transition:transform 0.2s; border:2px solid rgba(255,255,255,0.1); }
.df-swatch:hover { transform:scale(1.15); }
.df-swatch-hex { font-size:11px; font-family:var(--font-code); color:var(--text-on-dark-3); cursor:pointer; }
.df-toast { position:absolute; top:-28px; left:50%; transform:translateX(-50%); font-size:12px; background:rgba(0,0,0,0.75); color:#fff; padding:4px 12px; border-radius:8px; pointer-events:none; opacity:0; white-space:nowrap; }

/* ── S4 对齐 ── */
.df-align-slide { position:relative; }
.df-align-el { position:absolute; transition:none; font-family:var(--font-body); }
.df-align-guideline { position:absolute; left:40px; top:0; bottom:0; width:1px; background:rgba(126,200,227,0.5); opacity:0; transition:opacity 0.4s; }
.df-align-btns { display:flex; gap:var(--space-sm); justify-content:center; margin-top:var(--space-md); }

/* ── S5 留白 ── */
.df-stepper { display:flex; gap:8px; justify-content:center; margin-top:var(--space-md); }
.df-step-btn { width:40px; height:40px; border-radius:50%; border:2px solid var(--border-light); background:transparent; cursor:pointer; font-size:14px; font-weight:600; color:var(--text-on-light-2); transition:all 0.3s; }
.df-step-btn.df-step-active { background:var(--module-4); border-color:var(--module-4); color:#fff; }
.df-ws-slide { transition:padding 0.5s ease-out; }
.df-ws-title { transition:font-size 0.5s ease-out, margin-bottom 0.5s; }
.df-ws-body p { transition:font-size 0.5s ease-out, margin-bottom 0.5s, opacity 0.4s; }
.df-ws-chart { transition:margin 0.5s ease-out, height 0.5s; border-radius:8px; background:rgba(0,0,0,0.04); display:flex; align-items:center; justify-content:center; font-size:13px; color:#999; }
.df-ws-source { transition:font-size 0.5s, opacity 0.5s, margin-top 0.5s; color:#999; }
.df-ws-pattern { position:absolute; inset:0; opacity:0; transition:opacity 0.5s; pointer-events:none;
  background:repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(0,0,0,0.02) 10px,rgba(0,0,0,0.02) 20px); }

/* ── S6 实战改造 ── */
.df-snr-wrap { display:flex; gap:var(--space-lg); max-width:var(--w-full); margin:0 auto; align-items:flex-start; }
.df-snr-slide-col { width:50%; position:relative; }
.df-snr-steps-col { width:50%; }
.df-snr-step { min-height:100vh; display:flex; flex-direction:column; justify-content:center; padding:var(--space-lg); }
.df-snr-step h3 { font-size:var(--text-heading); color:var(--text-on-dark); margin-bottom:var(--space-sm); }
.df-snr-step p { font-size:var(--text-body); color:var(--text-on-dark-2); line-height:1.8; }
.df-snr-tabs { display:none; }
.df-snr-tab { width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.15); background:transparent; color:var(--text-on-dark-2); cursor:pointer; font-size:14px; font-weight:600; transition:all 0.3s; }
.df-snr-tab.df-snr-tab-active { background:var(--module-4); border-color:var(--module-4); color:#1d1d1f; }
/* 幻灯片内噪音元素 */
.df-snr-slide { aspect-ratio:auto; min-height:380px; padding:32px; font-size:14px; }
.df-snr-border { position:absolute; inset:0; border:4px double #8B4513; border-radius:12px; pointer-events:none; transition:opacity 0.5s; }
.df-snr-gradient { position:absolute; inset:0; border-radius:12px; background:linear-gradient(135deg,rgba(100,100,200,0.15),rgba(180,100,200,0.1)); pointer-events:none; transition:opacity 0.5s; }
.df-snr-clipart { position:absolute; transition:opacity 0.5s, transform 0.5s; }
.df-snr-clipart-1 { top:12px; left:12px; width:40px; height:40px; }
.df-snr-clipart-2 { top:12px; right:50px; width:36px; height:36px; }
.df-snr-clipart-3 { bottom:40px; right:12px; width:44px; height:44px; }
.df-snr-title { font-family:'Comic Sans MS','Segoe UI',sans-serif; text-shadow:1px 1px 2px rgba(0,0,0,0.2); transition:all 0.5s; position:relative; z-index:1; margin-bottom:12px; }
.df-snr-bullets { list-style:disc inside; position:relative; z-index:1; margin-bottom:12px; }
.df-snr-bullets li { margin-bottom:4px; transition:opacity 0.4s, max-height 0.4s, margin 0.4s; max-height:30px; overflow:hidden; }
.df-snr-table { position:relative; z-index:1; font-size:11px; border-collapse:collapse; transition:opacity 0.5s; }
.df-snr-table table { width:100%; border-collapse:collapse; }
.df-snr-table th, .df-snr-table td { border:1px solid rgba(255,255,255,0.1); padding:3px 6px; text-align:center; }
.df-snr-table th { background:rgba(255,255,255,0.05); font-weight:600; }
.df-snr-footer { position:absolute; bottom:8px; left:0; right:0; text-align:center; font-size:10px; color:var(--text-on-dark-3); transition:opacity 0.5s; z-index:1; }
.df-snr-chart-clean { position:relative; z-index:1; transition:opacity 0.5s; }

/* ── 移动端 ── */
@media (max-width:768px) {
  .df-slide { padding:24px; }
  .df-slider::-webkit-slider-thumb { width:24px; height:24px; }
  .df-slider::-moz-range-thumb { width:24px; height:24px; }
  .df-step-btn { min-width:44px; min-height:44px; }

  /* S6 实战改造 */
  .df-snr-wrap { flex-direction:column; }
  .df-snr-slide-col { width:100%; }
  .df-snr-steps-col { width:100%; }
  .df-snr-step { min-height:auto; display:none; padding:var(--space-md); }
  .df-snr-step.df-snr-step-active { display:flex; }
  .df-snr-tabs { display:flex !important; gap:8px; justify-content:center; margin-bottom:var(--space-md); }
  .df-snr-slide { min-height:280px; }
}

/* 所有 section 移动端 scroll-margin */
@media (max-width:768px) {
  #df-showcase,#df-contrast,#df-color,#df-alignment,#df-whitespace,#df-makeover { scroll-margin-top:56px; }
}
#df-showcase,#df-contrast,#df-color,#df-alignment,#df-whitespace,#df-makeover { scroll-margin-top:56px; }
`,k=[{before:`<div style="width:100%;height:100%;box-sizing:border-box;background:linear-gradient(135deg,#1a3a6b,#2d5aa0);border-radius:12px;padding:44px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;">
      <p style="font-family:SimSun,serif;font-size:17px;color:rgba(255,255,255,0.5);margin-bottom:10px;">XX 大学 XX 学院 XX 实验室</p>
      <h3 style="font-family:SimSun,serif;font-size:24px;color:#fff;line-height:1.6;margin-bottom:16px;">基于深度学习的多模态情感分析<br>——以社交媒体文本与图像融合为例</h3>
      <p style="font-size:15px;color:rgba(255,255,255,0.4);line-height:1.8;">汇报人：张三 &nbsp;|&nbsp; 导师：李四教授<br>2024 年 6 月 15 日 &nbsp;|&nbsp; 第三次组会汇报</p>
    </div>`,after:`<div style="width:100%;height:100%;box-sizing:border-box;background:#1d1d1f;border-radius:12px;padding:48px;display:flex;flex-direction:column;justify-content:center;">
      <div style="width:48px;height:4px;background:var(--module-4);margin-bottom:24px;border-radius:2px;"></div>
      <h3 style="font-size:28px;color:#f5f5f7;font-weight:700;line-height:1.4;margin-bottom:16px;">多模态情感分析</h3>
      <p style="font-size:18px;color:rgba(245,245,247,0.5);margin-bottom:32px;">深度学习 + 文本图像融合</p>
      <div style="display:flex;gap:24px;margin-top:auto;">
        <span style="font-size:15px;color:rgba(245,245,247,0.35);">张三</span>
        <span style="font-size:15px;color:rgba(245,245,247,0.35);">2024.06</span>
        <span style="font-size:15px;color:rgba(245,245,247,0.35);">组会汇报</span>
      </div>
    </div>`,caption:"同样的信息，不同的表达"},{before:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:40px;overflow:hidden;display:flex;flex-direction:column;justify-content:center;">
      <h3 style="font-size:22px;color:#333;margin-bottom:12px;font-weight:700;">研究背景与动机</h3>
      <p style="font-size:15px;color:#444;line-height:1.8;margin-bottom:8px;">随着社交媒体的<b style="color:#e74c3c;">快速发展</b>，用户生成内容呈<u>爆发式增长</u>。传统情感分析方法仅关注<span style="color:#2ecc71;">文本模态</span>，忽略了<span style="color:#9b59b6;">图像信息</span>的重要作用。近年来，<b style="color:#e67e22;">多模态学习</b>成为研究热点，但现有方法存在<span style="color:#e74c3c;text-decoration:underline;">模态融合不充分</span>的问题。本研究旨在提出一种新的<b>跨模态注意力机制</b>，以实现更精准的情感判别。</p>
      <p style="font-size:13px;color:#888;margin-top:8px;">* 参考文献：[1] Wang et al., 2023; [2] Liu et al., 2022; [3] Chen et al., 2024...</p>
    </div>`,after:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:44px;display:flex;flex-direction:column;justify-content:center;">
      <h3 style="font-size:26px;color:#1d1d1f;margin-bottom:28px;font-weight:700;">为什么需要多模态？</h3>
      <div style="display:flex;gap:20px;">
        <div style="flex:1;background:#f8f8f8;border-radius:10px;padding:24px 16px;text-align:center;">
          <div style="font-size:40px;font-weight:700;color:var(--module-4);margin-bottom:8px;">85%</div>
          <div style="font-size:15px;color:#888;">社交内容含图像</div>
        </div>
        <div style="flex:1;background:#f8f8f8;border-radius:10px;padding:24px 16px;text-align:center;">
          <div style="font-size:40px;font-weight:700;color:#1d1d1f;margin-bottom:8px;">+12%</div>
          <div style="font-size:15px;color:#888;">融合后准确率提升</div>
        </div>
        <div style="flex:1;background:#f8f8f8;border-radius:10px;padding:24px 16px;text-align:center;">
          <div style="font-size:40px;font-weight:700;color:#1d1d1f;margin-bottom:8px;">Gap</div>
          <div style="font-size:15px;color:#888;">融合机制不充分</div>
        </div>
      </div>
    </div>`,caption:"200 字变 3 个关键词——信息量没少"},{before:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:40px;">
      <h3 style="font-size:22px;color:#333;margin-bottom:14px;">各组实验结果对比</h3>
      <div style="display:flex;align-items:flex-end;gap:8px;height:160px;padding:0 12px;">
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:96px;background:linear-gradient(180deg,#e74c3c,#c0392b);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">A1</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:128px;background:linear-gradient(180deg,#3498db,#2980b9);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">A2</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:72px;background:linear-gradient(180deg,#2ecc71,#27ae60);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">B1</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:115px;background:linear-gradient(180deg,#9b59b6,#8e44ad);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">B2</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:88px;background:linear-gradient(180deg,#e67e22,#d35400);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">C1</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:144px;background:linear-gradient(180deg,#1abc9c,#16a085);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">C2</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:60px;background:linear-gradient(180deg,#f39c12,#e67e22);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">D1</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;">
          <div style="width:100%;height:104px;background:linear-gradient(180deg,#e91e63,#c2185b);border-radius:4px 4px 0 0;box-shadow:2px 2px 4px rgba(0,0,0,0.2);"></div><span style="font-size:12px;color:#888;">D2</span>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;justify-content:center;">
        <span style="font-size:12px;color:#e74c3c;">■ A1</span><span style="font-size:12px;color:#3498db;">■ A2</span><span style="font-size:12px;color:#2ecc71;">■ B1</span><span style="font-size:12px;color:#9b59b6;">■ B2</span><span style="font-size:12px;color:#e67e22;">■ C1</span><span style="font-size:12px;color:#1abc9c;">■ C2</span><span style="font-size:12px;color:#f39c12;">■ D1</span><span style="font-size:12px;color:#e91e63;">■ D2</span>
      </div>
    </div>`,after:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:44px;display:flex;flex-direction:column;justify-content:center;">
      <h3 style="font-size:24px;color:#1d1d1f;margin-bottom:6px;font-weight:700;">融合模型准确率高出 12%</h3>
      <p style="font-size:15px;color:#999;margin-bottom:24px;">实验组 vs 对照组 · F1-Score</p>
      <div style="display:flex;align-items:flex-end;gap:32px;height:140px;padding:0 28px;">
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:6px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:84px;background:var(--module-4);border-radius:5px 5px 0 0;"></div>
            <div style="flex:1;height:63px;background:#e0e0e0;border-radius:5px 5px 0 0;"></div>
          </div>
          <span style="font-size:14px;color:#888;">文本</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:6px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:105px;background:var(--module-4);border-radius:5px 5px 0 0;"></div>
            <div style="flex:1;height:73px;background:#e0e0e0;border-radius:5px 5px 0 0;"></div>
          </div>
          <span style="font-size:14px;color:#888;">图像</span>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;">
          <div style="display:flex;gap:6px;width:100%;align-items:flex-end;">
            <div style="flex:1;height:130px;background:var(--module-4);border-radius:5px 5px 0 0;position:relative;">
              <div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:12px;color:var(--module-4);font-weight:700;white-space:nowrap;">92%</div>
            </div>
            <div style="flex:1;height:81px;background:#e0e0e0;border-radius:5px 5px 0 0;"></div>
          </div>
          <span style="font-size:14px;color:#888;">融合</span>
        </div>
      </div>
      <div style="display:flex;gap:16px;justify-content:center;margin-top:12px;">
        <span style="font-size:13px;color:var(--module-4);">● 实验组</span>
        <span style="font-size:13px;color:#ccc;">● 对照组</span>
      </div>
    </div>`,caption:"8 种颜色变 2 种——数据更清晰"},{before:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:40px;display:flex;flex-direction:column;justify-content:center;">
      <h3 style="font-size:22px;color:#333;margin-bottom:14px;">结论与展望</h3>
      <ul style="font-size:16px;color:#444;list-style:disc inside;line-height:2.2;flex:1;display:flex;flex-direction:column;justify-content:center;">
        <li>多模态融合显著优于单模态</li>
        <li>跨模态注意力机制有效</li>
        <li>消融实验验证各组件贡献</li>
        <li>社交媒体数据集上 SOTA</li>
        <li>可扩展到视频模态</li>
        <li>未来计划：更大规模预训练</li>
      </ul>
      <p style="font-size:36px;text-align:center;margin-top:12px;">Thank You! <span style="font-size:28px;">&#127881;&#10024;&#127882;</span></p>
    </div>`,after:`<div style="width:100%;height:100%;box-sizing:border-box;background:#fff;border-radius:12px;padding:48px;display:flex;flex-direction:column;justify-content:center;">
      <h3 style="font-size:26px;color:#1d1d1f;margin-bottom:32px;font-weight:700;">三个核心发现</h3>
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div style="display:flex;gap:16px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:var(--module-4);line-height:1;">1</span>
          <div><div style="font-size:18px;color:#1d1d1f;font-weight:600;">多模态融合准确率 +12%</div><div style="font-size:15px;color:#999;margin-top:4px;">显著优于纯文本和纯图像方法</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:var(--module-4);line-height:1;">2</span>
          <div><div style="font-size:18px;color:#1d1d1f;font-weight:600;">跨模态注意力是关键</div><div style="font-size:15px;color:#999;margin-top:4px;">消融实验证实贡献度最高</div></div>
        </div>
        <div style="display:flex;gap:16px;align-items:flex-start;">
          <span style="font-size:28px;font-weight:700;color:var(--module-4);line-height:1;">3</span>
          <div><div style="font-size:18px;color:#1d1d1f;font-weight:600;">框架可扩展至视频模态</div><div style="font-size:15px;color:#999;margin-top:4px;">下一步：大规模多模态预训练</div></div>
        </div>
      </div>
    </div>`,caption:"6 条结论变 3 条——记住的更多"}],T=[{title:{size:"16px",weight:400,color:"#666"},body:"#777",num:{size:"16px",weight:400,color:"#888"},bg:"#f0f0f0",label:"标题和正文几乎没有区分"},{title:{size:"22px",weight:500,color:"#555"},body:"#666",num:{size:"24px",weight:500,color:"#777"},bg:"#f5f5f5",label:"开始有一点层次感"},{title:{size:"28px",weight:600,color:"#444"},body:"#666",num:{size:"36px",weight:600,color:"#555"},bg:"#f9f9f9",label:"层次逐渐清晰"},{title:{size:"32px",weight:700,color:"#333"},body:"#555",num:{size:"52px",weight:700,color:"#E08A4A"},bg:"#fcfcfc",label:"重点突出，阅读有节奏"},{title:{size:"36px",weight:700,color:"#1d1d1f"},body:"#555",num:{size:"72px",weight:700,color:"#D4782F"},bg:"#ffffff",label:"层次分明，重点一目了然 ✓"}],m=[{text:"研究成果总结",style:"font-size:24px;font-weight:700;color:#1d1d1f;",rand:{left:"55%",top:"8%"},aligned:{left:"40px",top:"28px"}},{text:"实验组显著优于对照组 (p<0.001)",style:"font-size:16px;color:#555;",rand:{left:"10%",top:"58%"},aligned:{left:"40px",top:"72px"}},{text:"效应量 Cohen's d = 0.82",style:"font-size:16px;color:#555;",rand:{left:"52%",top:"42%"},aligned:{left:"40px",top:"108px"}},{text:"■■■ 数据图表",style:"font-size:14px;color:#bbb;background:rgba(0,0,0,0.04);padding:16px 28px;border-radius:8px;display:inline-block;",rand:{left:"8%",top:"22%"},aligned:{left:"40px",top:"156px"}},{text:"数据来源：2024 实验记录",style:"font-size:13px;color:#bbb;",rand:{left:"48%",top:"75%"},aligned:{left:"40px",top:"224px"}}],j=[{pad:"24px",titleMb:"6px",titleSize:"14px",bodySize:"12px",bodyMb:"4px",chartH:"50px",chartM:"6px 0",srcSize:"11px",srcOpacity:1,pattern:!0,label:"过载：所有内容挤在一起"},{pad:"36px",titleMb:"20px",titleSize:"18px",bodySize:"15px",bodyMb:"10px",chartH:"70px",chartM:"14px 0",srcSize:"12px",srcOpacity:.6,pattern:!1,label:"适中：内容开始有呼吸感"},{pad:"48px",titleMb:"32px",titleSize:"22px",bodySize:"16px",bodyMb:"16px",chartH:"90px",chartM:"24px 0",srcSize:"11px",srcOpacity:.3,pattern:!1,label:"极简：只保留核心信息 ✓"}],I=[{name:"学术蓝",primary:"#2B5797",accent:"#E8833A",neutral:"#888",title:"#2B5797",body:"#444",bg:"#f8fafc",listColor:"#333"},{name:"低饱和绿",primary:"#3A7D5C",accent:"#D4A843",neutral:"#999",title:"#3A7D5C",body:"#555",bg:"#f6faf8",listColor:"#444"},{name:"暖灰调",primary:"#5C5C5C",accent:"#C06040",neutral:"#aaa",title:"#5C5C5C",body:"#666",bg:"#faf9f8",listColor:"#555"}];function V(){return`
<style>${q}</style>
<div class="page-scroll">

  <!-- ═══ Hero ═══ -->
  <section class="section-dark section-hero-full df-hero" id="df-hero">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow" style="opacity:0;">Module 04 / Page 01</p>
      <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">设计速成指南</h1>
      <p class="page-hero-sub" style="opacity:0;">Design Fundamentals</p>
      <p class="df-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">不用学设计理论——4 个原则 + 1 次实战，你的 PPT 就能脱胎换骨</p>
      <nav class="hero-quicknav" id="df-quicknav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#df-showcase">看懂差距</button>
        <button class="hero-quicknav__item" data-target="#df-contrast">对比</button>
        <button class="hero-quicknav__item" data-target="#df-color">配色</button>
        <button class="hero-quicknav__item" data-target="#df-alignment">对齐</button>
        <button class="hero-quicknav__item" data-target="#df-whitespace">留白</button>
        <button class="hero-quicknav__item" data-target="#df-makeover">实战改造</button>
      </nav>
      <div class="df-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ═══ S1 看懂差距 (深色) ═══ -->
  <section class="section-dark" id="df-showcase" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;scroll-margin-top:56px;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">01 / 06</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">看懂差距</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">同一份内容，两种表达——差距就在细节里</p>
    </div>
    <div style="max-width:680px;margin:0 auto;width:100%;">
      <div class="df-showcase-tabs" id="df-showcase-tabs" style="display:flex;gap:8px;justify-content:center;margin-bottom:var(--space-md);flex-wrap:wrap;"></div>
      <p class="df-showcase-label" id="df-showcase-label" style="font-size:12px;color:var(--text-on-dark-3);text-align:center;margin-bottom:var(--space-xs);letter-spacing:0.05em;text-transform:uppercase;">Before</p>
      <div id="df-showcase-pair" style="aspect-ratio:16/9;position:relative;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.3);">
        <div id="df-showcase-before" style="position:absolute;inset:0;transition:opacity 0.5s ease;"></div>
        <div id="df-showcase-after" style="position:absolute;inset:0;transition:opacity 0.5s ease;opacity:0;"></div>
      </div>
      <p id="df-showcase-caption" style="font-size:var(--text-body);color:var(--text-on-dark-2);text-align:center;margin-top:var(--space-md);max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7;min-height:1.7em;"></p>
    </div>
  </section>

  <!-- ═══ S2 对比 (浅色) ═══ -->
  <section class="section-light" id="df-contrast" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">02 / 06</p>
      <h2 class="section-title">对比</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">大小、粗细、颜色——差异要足够大，不要"差不多"</p>
    </div>
    <div class="df-contrast-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide" id="df-contrast-slide">
        <h3 class="df-cs-title">研究结论</h3>
        <ul class="df-cs-points">
          <li>实验组显著优于对照组</li>
          <li>效应量 Cohen's d = 0.82</li>
          <li>置信区间 95% CI [0.45, 1.19]</li>
        </ul>
        <div class="df-cs-number">p &lt; 0.001</div>
      </div>
      <input type="range" class="df-slider" id="df-contrast-slider" min="0" max="100" value="0" step="25">
      <p class="df-step-label" id="df-contrast-label">标题和正文几乎没有区分</p>
    </div>
    <p style="max-width:540px;margin:var(--space-lg) auto 0;text-align:center;font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;">标题比正文大一号不够——要大三号。对比不是微调，是让差异大到<strong>一眼就能看出层次</strong>。</p>
  </section>

  <!-- ═══ S3 配色 (深色) ═══ -->
  <section class="section-dark" id="df-color" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">03 / 06</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">配色</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">一个主色 + 一个强调色，够了</p>
    </div>
    <div class="df-color-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <p style="text-align:center;font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">反面教材</p>
      <div class="df-slide df-color-bad" id="df-color-bad">
        <div class="df-color-badge">6+ 颜色</div>
        <h3 style="color:#e74c3c;font-size:20px;margin-bottom:8px;">研究方法概述</h3>
        <ul>
          <li style="color:#3498db;">实验设计：随机对照</li>
          <li style="color:#2ecc71;">样本量：N = 120</li>
          <li style="color:#9b59b6;">分析方法：双因素方差分析</li>
          <li style="color:#e67e22;">显著性水平：α = 0.05</li>
        </ul>
      </div>
      <p style="text-align:center;font-size:20px;color:var(--text-on-dark-3);margin:var(--space-md) 0;">↓</p>
      <p style="text-align:center;font-size:var(--text-caption);color:var(--text-on-dark-3);margin-bottom:var(--space-xs);">正确示范</p>
      <div class="df-slide df-color-good" id="df-color-good">
        <h3 class="df-cg-title" style="font-size:20px;margin-bottom:8px;">研究方法概述</h3>
        <ul class="df-cg-list">
          <li>实验设计：随机对照</li>
          <li>样本量：N = 120</li>
          <li>分析方法：双因素方差分析</li>
          <li>显著性水平：α = 0.05</li>
        </ul>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:var(--space-md);" id="df-color-schemes"></div>
      <div id="df-color-swatches" style="display:flex;gap:12px;justify-content:center;margin-top:var(--space-sm);position:relative;align-items:center;"></div>
    </div>
  </section>

  <!-- ═══ S4 对齐 (浅色) ═══ -->
  <section class="section-light" id="df-alignment" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">04 / 06</p>
      <h2 class="section-title">对齐</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">看不见的线条，是秩序感的来源</p>
    </div>
    <div class="df-align-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide df-align-slide" id="df-align-slide" style="min-height:260px;aspect-ratio:auto;">
        <div class="df-align-guideline" id="df-align-guideline"></div>
      </div>
      <div class="df-align-btns">
        <button class="btn-primary" id="df-align-btn">对齐</button>
        <button class="btn-ghost" id="df-shuffle-btn">打乱</button>
      </div>
    </div>
    <p style="max-width:540px;margin:var(--space-lg) auto 0;text-align:center;font-size:var(--text-body);color:var(--text-on-light-2);line-height:1.8;">看不见的线条是秩序感的来源。所有元素沿同一条隐形线排列，观众的视线就能自然流动，而不是在页面上乱跳。</p>
  </section>

  <!-- ═══ S5 留白 (深色) ═══ -->
  <section class="section-dark" id="df-whitespace" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">05 / 06</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">留白</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">留白不是浪费空间，是给内容以呼吸</p>
    </div>
    <div class="df-ws-wrap" style="max-width:640px;margin:0 auto;width:100%;">
      <div class="df-slide df-ws-slide" id="df-ws-slide">
        <div class="df-ws-pattern" id="df-ws-pattern"></div>
        <h3 class="df-ws-title">数据分析结果</h3>
        <div class="df-ws-body">
          <p class="df-ws-p1">本研究采用双因素方差分析</p>
          <p class="df-ws-p2">主效应显著 F(2,45)=8.32, p&lt;0.01</p>
          <p class="df-ws-p3">交互效应不显著 F(2,45)=1.04, p=0.36</p>
        </div>
        <div class="df-ws-chart"><div style="display:flex;align-items:flex-end;gap:4px;height:44px;padding:0 4px;"><div style="flex:1;height:55%;background:rgba(0,0,0,0.08);border-radius:3px 3px 0 0;"></div><div style="flex:1;height:82%;background:rgba(240,178,122,0.4);border-radius:3px 3px 0 0;"></div><div style="flex:1;height:40%;background:rgba(0,0,0,0.08);border-radius:3px 3px 0 0;"></div><div style="flex:1;height:65%;background:rgba(0,0,0,0.08);border-radius:3px 3px 0 0;"></div></div></div>
        <p class="df-ws-source">数据来源：2024 年实验记录</p>
      </div>
      <div class="df-stepper" id="df-ws-stepper">
        <button class="df-step-btn df-step-active" data-step="0">1</button>
        <button class="df-step-btn" data-step="1">2</button>
        <button class="df-step-btn" data-step="2">3</button>
      </div>
      <p class="df-step-label" id="df-ws-label" style="color:var(--text-on-dark-2);">过载：所有内容挤在一起</p>
    </div>
    <p style="max-width:540px;margin:var(--space-lg) auto 0;text-align:center;font-size:var(--text-body);color:var(--text-on-dark-2);line-height:1.8;">留白不是浪费空间，是给内容呼吸的房间。当你删掉一个元素后发现什么都没少——说明它本来就不该在那里。</p>
  </section>

  <!-- ═══ S6 实战改造 (深色) ═══ -->
  <section class="section-dark" id="df-makeover" style="padding:var(--space-3xl) var(--space-lg);">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">06 / 06</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">实战改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;color:var(--text-on-dark-2);">四个原则同时作用，一张幻灯片脱胎换骨</p>
    </div>
    <div class="df-snr-wrap" id="df-snr-wrap">
      <div class="df-snr-slide-col" id="df-snr-slide-col">
        <div class="df-slide df-snr-slide" id="df-snr-slide">
          <div class="df-snr-border"></div>
          <div class="df-snr-gradient"></div>
          <div class="df-snr-clipart df-snr-clipart-1">
            <svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="16" stroke="#8B6914" stroke-width="2" fill="rgba(139,105,20,0.15)"/><path d="M14 20l4 4 8-8" stroke="#8B6914" stroke-width="2"/></svg>
          </div>
          <div class="df-snr-clipart df-snr-clipart-2">
            <svg viewBox="0 0 36 36" fill="none"><rect x="4" y="4" width="28" height="28" rx="4" stroke="#6B3FA0" stroke-width="2" fill="rgba(107,63,160,0.1)"/><path d="M12 18h12M18 12v12" stroke="#6B3FA0" stroke-width="2"/></svg>
          </div>
          <div class="df-snr-clipart df-snr-clipart-3">
            <svg viewBox="0 0 44 44" fill="none"><polygon points="22,4 28,16 42,18 32,28 34,42 22,36 10,42 12,28 2,18 16,16" stroke="#C0392B" stroke-width="1.5" fill="rgba(192,57,43,0.1)"/></svg>
          </div>
          <h3 class="df-snr-title" style="font-size:18px;color:var(--text-on-dark);">研究成果总结</h3>
          <ul class="df-snr-bullets" style="color:var(--text-on-dark-2);font-size:13px;">
            <li>实验一：对照组与实验组差异显著</li>
            <li>实验二：剂量效应呈线性关系</li>
            <li>实验三：长期随访结果稳定</li>
            <li class="df-snr-extra">统计方法：混合效应模型</li>
            <li class="df-snr-extra">样本量：N=200，脱落率 5%</li>
            <li class="df-snr-extra">效应量：Cohen's d=0.75</li>
            <li class="df-snr-extra">置信区间：95% CI [0.42, 1.08]</li>
            <li class="df-snr-extra">结论：支持原假设</li>
          </ul>
          <div class="df-snr-table" id="df-snr-table">
            <table><thead><tr><th>组别</th><th>N</th><th>M</th><th>SD</th><th>t</th><th>p</th></tr></thead>
            <tbody><tr><td>实验</td><td>100</td><td>78.5</td><td>12.3</td><td>3.45</td><td>.001</td></tr>
            <tr><td>对照</td><td>100</td><td>68.2</td><td>11.8</td><td>—</td><td>—</td></tr></tbody></table>
          </div>
          <div class="df-snr-chart-clean" id="df-snr-chart" style="opacity:0;height:0;overflow:hidden;">
            <div style="display:flex;align-items:flex-end;gap:16px;justify-content:center;height:80px;padding-top:12px;">
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="width:48px;height:55px;background:var(--module-4);border-radius:6px 6px 0 0;"></div>
                <span style="font-size:11px;color:var(--text-on-dark-3);">实验组</span>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
                <div style="width:48px;height:38px;background:rgba(255,255,255,0.15);border-radius:6px 6px 0 0;"></div>
                <span style="font-size:11px;color:var(--text-on-dark-3);">对照组</span>
              </div>
            </div>
          </div>
          <div class="df-snr-footer">&copy; 2024 Research Lab | Page 3/15 | Confidential</div>
        </div>
      </div>
      <div class="df-snr-steps-col" id="df-snr-steps-col">
        <div class="df-snr-tabs" id="df-snr-tabs">
          <button class="df-snr-tab df-snr-tab-active" data-step="0">0</button>
          <button class="df-snr-tab" data-step="1">1</button>
          <button class="df-snr-tab" data-step="2">2</button>
          <button class="df-snr-tab" data-step="3">3</button>
          <button class="df-snr-tab" data-step="4">4</button>
        </div>
        <div class="df-snr-step df-snr-step-active" data-step="0">
          <h3>原始版</h3>
          <p>这是一张典型的"什么都想放"的幻灯片。花边框、渐变背景、剪贴画、Comic Sans——每个元素都在争夺注意力，结果谁都看不到。</p>
        </div>
        <div class="df-snr-step" data-step="1">
          <h3>Step 1：删掉噪音</h3>
          <p>不传达信息的装饰就是噪音。边框和剪贴画看起来热闹，但没有一个元素在帮助观众理解你的研究成果。删掉它们，信息反而更清晰。</p>
        </div>
        <div class="df-snr-step" data-step="2">
          <h3>Step 2：建立对比</h3>
          <p>标题是观众第一眼看到的东西。当标题和正文一样大，没人知道从哪里开始读。把标题放大加粗，关键数字用强调色突出——层次立刻出现。</p>
        </div>
        <div class="df-snr-step" data-step="3">
          <h3>Step 3：精简留白</h3>
          <p>8 条 bullet point 没人看得完。砍到 3 条核心发现，删掉密集表格换成简洁图表。留出呼吸空间，每条信息才能被真正看到。</p>
        </div>
        <div class="df-snr-step" data-step="4">
          <h3>Step 4：统一风格</h3>
          <p>最后一步：Comic Sans 换成正规字体，6 种颜色收敛为主色+强调色，所有元素沿同一条线对齐。四个原则同时作用，一张专业的 slide 就诞生了。</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ Footer CTA ═══ -->
  <section class="section-dark page-footer-cta" style="padding:var(--space-3xl) var(--space-lg);">
    <p class="page-footer-num">01 / 04</p>
    <h2 class="page-footer-quote">好的设计不是装饰，是让信息自己说话。</h2>
    <p class="page-footer-desc">掌握了 4 个原则，接下来看看不同场景下的 PPT 该怎么设计。</p>
    <div class="page-footer-nav">
      <button class="btn-ghost" id="df-prev-btn">← 素材资源站</button>
      <button class="btn-primary" id="df-next-btn">学术演示全场景 →</button>
    </div>
  </section>

</div>`}function G(){H(),_(),L(),F(),P(),N(),O(),D(),W(),Y()}function H(){const t=o.timeline({delay:.2});t.fromTo(".df-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),t.fromTo(".df-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),t.fromTo(".df-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo(".df-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#df-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),t.fromTo(".df-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75)}function _(){const t=document.getElementById("df-quicknav");t&&g(t,"click",s=>{const i=s.target.closest(".hero-quicknav__item");i&&document.querySelector(i.dataset.target)?.scrollIntoView({behavior:"smooth"})})}function L(){const t=document.getElementById("df-prev-btn"),s=document.getElementById("df-next-btn");t&&g(t,"click",()=>C("m3-p7")),s&&g(s,"click",()=>C("m4-p2"))}function F(){const t=document.getElementById("df-showcase-pair"),s=document.getElementById("df-showcase-before"),i=document.getElementById("df-showcase-after"),c=document.getElementById("df-showcase-caption"),d=document.getElementById("df-showcase-label"),l=document.getElementById("df-showcase-tabs");if(!t||!s||!i)return;let p=0,r="before",a=null;const n=["封面","文字","图表","结论"];k.forEach((x,h)=>{const u=document.createElement("button");u.className="df-showcase-tab"+(h===0?" active":""),u.dataset.idx=h,u.textContent=n[h]||`案例${h+1}`,u.style.cssText="padding:6px 16px;border-radius:20px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:var(--text-on-dark-2);cursor:pointer;font-size:13px;transition:all 0.3s;",l.appendChild(u)});function e(x,h){p=x,r=h;const u=k[x];s.innerHTML=u.before,i.innerHTML=u.after,h==="before"?(s.style.opacity="1",i.style.opacity="0",d&&(d.textContent="BEFORE")):(s.style.opacity="0",i.style.opacity="1",d&&(d.textContent="AFTER")),c&&(c.style.opacity="0",setTimeout(()=>{c.textContent=h==="after"?u.caption:"",c.style.opacity=h==="after"?"1":"0"},200)),l.querySelectorAll(".df-showcase-tab").forEach((v,M)=>{const w=M===x;v.classList.toggle("active",w),v.style.background=w?"var(--module-4)":"transparent",v.style.borderColor=w?"var(--module-4)":"rgba(255,255,255,0.15)",v.style.color=w?"#1d1d1f":"var(--text-on-dark-2)"})}e(0,"before"),g(l,"click",x=>{const h=x.target.closest(".df-showcase-tab");if(!h)return;const u=parseInt(h.dataset.idx);e(u,"before"),clearInterval(a),f()}),g(t,"click",()=>{e(p,r==="before"?"after":"before"),clearInterval(a),f()});function f(){a=setInterval(()=>{if(r==="before")e(p,"after");else{const x=(p+1)%k.length;e(x,"before")}},2500)}f(),g(document,"visibilitychange",()=>{document.hidden?clearInterval(a):f()})}function P(){const t=document.getElementById("df-contrast-slider"),s=document.getElementById("df-contrast-label"),i=document.querySelector(".df-cs-title"),c=document.querySelector(".df-cs-points"),d=document.querySelector(".df-cs-number"),l=document.getElementById("df-contrast-slide");if(!t||!i)return;const p=()=>{const r=Math.round(t.value/25),a=T[r];i.style.fontSize=a.title.size,i.style.fontWeight=a.title.weight,i.style.color=a.title.color,c&&(c.style.color=a.body),d&&(d.style.fontSize=a.num.size,d.style.fontWeight=a.num.weight,d.style.color=a.num.color),l&&(l.style.background=a.bg),s&&(s.textContent=a.label)};g(t,"input",p),p()}function N(){const t=document.getElementById("df-color-schemes"),s=document.getElementById("df-color-swatches"),i=document.getElementById("df-color-good");if(!t||!i)return;const c=i.querySelector(".df-cg-title"),d=i.querySelectorAll(".df-cg-list li");I.forEach((r,a)=>{const n=document.createElement("button");n.className="df-scheme-btn"+(a===0?" df-scheme-active":""),n.dataset.scheme=a,n.textContent=r.name,t.appendChild(n)});function l(r){const a=I[r];o.to(i,{background:a.bg,duration:.4,ease:"power2.out"}),o.to(c,{color:a.title,duration:.4}),d.forEach(n=>{o.to(n,{color:a.listColor,duration:.4})}),t.querySelectorAll(".df-scheme-btn").forEach(n=>{n.classList.toggle("df-scheme-active",parseInt(n.dataset.scheme)===r)}),p(a)}function p(r){s.innerHTML="",[r.primary,r.accent,r.neutral].forEach(a=>{const n=document.createElement("div");n.style.cssText="display:flex;flex-direction:column;align-items:center;gap:4px;position:relative;";const e=document.createElement("div");e.className="df-swatch",e.style.background=a;const f=document.createElement("span");f.className="df-swatch-hex",f.textContent=a,n.appendChild(e),n.appendChild(f),s.appendChild(n);const y=()=>{navigator.clipboard.writeText(a).catch(()=>{});const x=document.createElement("div");x.className="df-toast",x.textContent="已复制 ✓",n.appendChild(x),o.fromTo(x,{opacity:0,y:5},{opacity:1,y:0,duration:.3,onComplete:()=>{o.to(x,{opacity:0,delay:.8,duration:.4,onComplete:()=>x.remove()})}})};g(e,"click",y),g(f,"click",y)})}g(t,"click",r=>{const a=r.target.closest(".df-scheme-btn");a&&l(parseInt(a.dataset.scheme))}),l(0)}function O(){const t=document.getElementById("df-align-slide"),s=document.getElementById("df-align-guideline");if(!t)return;const i=[];m.forEach((l,p)=>{const r=document.createElement("div");r.className="df-align-el",r.textContent=l.text,r.style.cssText=l.style,r.style.left=l.rand.left,r.style.top=l.rand.top,t.appendChild(r),i.push(r)});const c=document.getElementById("df-align-btn"),d=document.getElementById("df-shuffle-btn");c&&g(c,"click",()=>{i.forEach((l,p)=>{o.to(l,{left:m[p].aligned.left,top:m[p].aligned.top,duration:.5,delay:p*.08,ease:"power3.out"})}),s&&o.to(s,{opacity:1,duration:.4})}),d&&g(d,"click",()=>{i.forEach((l,p)=>{o.to(l,{left:m[p].rand.left,top:m[p].rand.top,duration:.5,delay:p*.06,ease:"power2.out"})}),s&&o.to(s,{opacity:0,duration:.4})})}function D(){const t=document.getElementById("df-ws-stepper"),s=document.getElementById("df-ws-label"),i=document.getElementById("df-ws-slide"),c=document.getElementById("df-ws-pattern");if(!t||!i)return;const d=i.querySelector(".df-ws-title"),l=i.querySelectorAll(".df-ws-body p"),p=i.querySelector(".df-ws-chart"),r=i.querySelector(".df-ws-source");function a(n){const e=j[n];o.to(i,{padding:e.pad,duration:.5,ease:"power2.out"}),o.to(d,{fontSize:e.titleSize,marginBottom:e.titleMb,duration:.5,ease:"power2.out"}),l.forEach(f=>{o.to(f,{fontSize:e.bodySize,marginBottom:e.bodyMb,duration:.5,ease:"power2.out"})}),o.to(p,{height:e.chartH,margin:e.chartM,duration:.5,ease:"power2.out"}),o.to(r,{fontSize:e.srcSize,opacity:e.srcOpacity,duration:.5,ease:"power2.out"}),c&&(c.style.opacity=e.pattern?"1":"0"),s&&(s.textContent=e.label),t.querySelectorAll(".df-step-btn").forEach(f=>{f.classList.toggle("df-step-active",parseInt(f.dataset.step)===n)})}g(t,"click",n=>{const e=n.target.closest(".df-step-btn");e&&a(parseInt(e.dataset.step))}),a(0)}function W(){window.innerWidth<=768?R():X()}function E(t){if(t===S)return;S=t;const s=document.querySelector(".df-snr-border"),i=document.querySelector(".df-snr-gradient"),c=document.querySelectorAll(".df-snr-clipart"),d=document.querySelector(".df-snr-title"),l=document.querySelectorAll(".df-snr-extra"),p=document.getElementById("df-snr-table"),r=document.getElementById("df-snr-chart"),a=document.querySelector(".df-snr-footer"),n=document.querySelector(".df-snr-bullets");t===0&&(o.to(s,{opacity:1,duration:.4}),o.to(i,{opacity:1,duration:.4}),c.forEach(e=>o.to(e,{opacity:1,scale:1,duration:.4})),d&&o.to(d,{fontFamily:"'Comic Sans MS','Segoe UI',sans-serif",textShadow:"1px 1px 2px rgba(0,0,0,0.2)",fontSize:"18px",duration:.4}),l.forEach(e=>o.to(e,{opacity:1,maxHeight:30,marginBottom:4,duration:.4})),o.to(p,{opacity:1,height:"auto",duration:.4}),o.to(r,{opacity:0,height:0,duration:.4}),o.to(a,{opacity:1,duration:.4}),n&&o.to(n,{fontSize:"13px",duration:.4})),t>=1&&(o.to(s,{opacity:0,duration:.5}),o.to(i,{opacity:0,duration:.5}),c.forEach((e,f)=>o.to(e,{opacity:0,scale:.5,duration:.4,delay:f*.1}))),t>=2?(l.forEach((e,f)=>o.to(e,{opacity:0,maxHeight:0,marginBottom:0,duration:.4,delay:f*.05})),o.to(p,{opacity:0,height:0,duration:.5}),o.to(r,{opacity:1,height:"auto",duration:.5,delay:.3})):(l.forEach(e=>o.to(e,{opacity:1,maxHeight:30,marginBottom:4,duration:.4})),o.to(p,{opacity:1,height:"auto",duration:.4}),o.to(r,{opacity:0,height:0,duration:.3})),t>=3?(d&&o.to(d,{fontFamily:"var(--font-heading)",textShadow:"none",fontSize:"22px",marginBottom:"16px",duration:.5}),n&&o.to(n,{fontSize:"15px",duration:.5}),o.to(a,{opacity:.5,fontSize:"9px",duration:.4})):t<3&&(d&&o.to(d,{fontFamily:"'Comic Sans MS','Segoe UI',sans-serif",textShadow:"1px 1px 2px rgba(0,0,0,0.2)",fontSize:"18px",marginBottom:"12px",duration:.4}),n&&o.to(n,{fontSize:"13px",duration:.4}),o.to(a,{opacity:1,fontSize:"10px",duration:.4})),t>=4?(d&&o.to(d,{fontSize:"26px",color:"var(--text-on-dark)",fontWeight:600,marginBottom:"20px",duration:.5}),n&&o.to(n,{fontSize:"16px",color:"var(--text-on-dark-2)",duration:.5}),o.to(a,{opacity:0,duration:.4})):t<3&&d&&o.to(d,{fontWeight:400,color:"var(--text-on-dark)",duration:.4}),document.querySelectorAll(".df-snr-tab").forEach(e=>{e.classList.toggle("df-snr-tab-active",parseInt(e.dataset.step)===t)}),document.querySelectorAll(".df-snr-step").forEach(e=>{e.classList.toggle("df-snr-step-active",parseInt(e.dataset.step)===t)})}function X(){const t=document.getElementById("df-snr-wrap"),s=document.getElementById("df-snr-slide-col");if(!t||!s)return;const i=s.offsetHeight,c=t.offsetHeight,d=Math.max(0,c-i),l=window.innerHeight,p=Math.max(0,(l-i)/2);let r=!1;const a=()=>{r||(r=!0,requestAnimationFrame(()=>{r=!1;const n=t.getBoundingClientRect();if(n.top>=p)s.style.transform="translateY(0)";else if(-n.top+l>=c)s.style.transform=`translateY(${d}px)`;else{const y=Math.min(-n.top+p,d);s.style.transform=`translateY(${y}px)`}const e=Math.max(0,Math.min(1,-n.top/Math.max(1,c-l))),f=Math.min(4,Math.floor(e*5));E(f)}))};g(window,"scroll",a,{passive:!0}),a()}function R(){const t=document.getElementById("df-snr-tabs");t&&(g(t,"click",s=>{const i=s.target.closest(".df-snr-tab");i&&E(parseInt(i.dataset.step))}),E(0))}function Y(){["#df-showcase","#df-contrast","#df-color","#df-alignment","#df-whitespace","#df-makeover"].forEach(t=>{b(`${t} .section-header`)}),b(".df-contrast-wrap",{y:50,duration:.7}),b(".df-align-wrap",{y:50,duration:.7}),b(".df-ws-wrap",{y:50,duration:.7}),b(".df-color-wrap",{y:50,duration:.7}),b(".df-snr-wrap",{y:50,duration:.7}),b(".page-footer-quote",{y:40,duration:.9}),b(".page-footer-cta .page-footer-nav",{y:25,duration:.6})}function Q(){A(),z.forEach(({el:t,type:s,fn:i,opts:c})=>{t.removeEventListener(s,i,c)}),z=[],B.forEach(t=>cancelAnimationFrame(t)),B=[],S=-1}export{Q as destroy,G as init,V as render};
