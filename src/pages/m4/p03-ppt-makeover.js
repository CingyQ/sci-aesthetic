// p03-ppt-makeover.js — PPT 改造工坊
// Hero → S1 改造原则 → S2~S7 六组案例 → Footer

import { fadeIn, killAll, gsap, ScrollTrigger } from '../../components/ScrollAnimations.js';
import { navigateTo } from '../../utils/router.js';
import { createBeforeAfter } from '../../components/BeforeAfter.js';

// ══════════════════════════════════════════════════════
//  模块级状态
// ══════════════════════════════════════════════════════
let _eventHandlers = [];
let _beforeAfters = [];

function addEvt(el, type, fn, opts) {
  if (!el) return;
  el.addEventListener(type, fn, opts);
  _eventHandlers.push({ el, type, fn, opts });
}

// ══════════════════════════════════════════════════════
//  CSS
// ══════════════════════════════════════════════════════
const styles = `
/* ── Hero 光晕 ── */
.mko-hero { position: relative; overflow: hidden; }
.mko-hero::before,
.mko-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none; }
.mko-hero::before { width:55%; height:45%; top:20%; left:5%; background:rgba(240,178,122,0.14); animation:mko-drift-a 14s ease-in-out infinite alternate; }
.mko-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.09); animation:mko-drift-b 10s ease-in-out infinite alternate-reverse; }
@keyframes mko-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(35px,-22px)} }
@keyframes mko-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-28px,18px)} }

/* ── 滚动提示 ── */
.mko-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:mko-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes mko-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 幻灯片基础样式 ── */
.mko-slide {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 10px;
  padding: 28px 32px;
  position: relative;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.5;
  box-sizing: border-box;
}
.mko-slide-before { background: #fff; color: #333; }
.mko-slide-after  { background: #fff; color: #222; }

/* ── Case 外壳 ── */
.mko-case-wrap { max-width:720px; margin:0 auto; width:100%; }
.mko-case-meta { display:flex; gap:8px; margin-bottom:var(--space-md); flex-wrap:wrap; }
.mko-scene-tag {
  display:inline-block;
  font-size:12px;
  padding:4px 12px;
  border-radius:var(--radius-full);
  background:rgba(240,178,122,0.15);
  color:var(--module-4);
  font-weight:500;
  letter-spacing:0.02em;
}
.section-dark .mko-scene-tag {
  background:rgba(240,178,122,0.18);
  color:#f5c08a;
}

/* ── BA 容器 ── */
.mko-ba-container { width:100%; border-radius:12px; overflow:hidden; box-shadow:var(--shadow-lg); }
.section-dark .mko-ba-container { box-shadow:0 8px 40px rgba(0,0,0,0.4); }

/* ── 改造要点 ── */
.mko-takeaway {
  display:flex;
  gap:var(--space-sm);
  margin-top:var(--space-md);
  flex-wrap:wrap;
}
.mko-takeaway-item {
  flex:1;
  min-width:160px;
  padding:12px 16px;
  border-radius:var(--radius-sm);
  font-size:13px;
  line-height:1.6;
  background:rgba(240,178,122,0.06);
  border-left:3px solid var(--module-4);
  color:var(--text-on-light);
}
.section-dark .mko-takeaway-item {
  background:rgba(240,178,122,0.08);
  color:var(--text-on-dark-2);
}

/* ── S1 原则卡片 ── */
.mko-principles-row {
  display:flex;
  gap:var(--space-md);
  max-width:960px;
  margin:0 auto;
  width:100%;
}
.mko-principle-card {
  flex:1;
  background:#fff;
  border-radius:var(--radius-md);
  padding:var(--space-lg) var(--space-md);
  border:1px solid rgba(0,0,0,0.06);
  box-shadow:var(--shadow-sm);
  text-align:center;
  transition:transform 0.3s var(--ease-apple), box-shadow 0.3s var(--ease-apple);
}
.mko-principle-card:hover { transform:translateY(-4px); box-shadow:var(--shadow-hover); }
.mko-principle-num {
  font-size:clamp(2.5rem,5vw,4rem);
  font-family:var(--font-display);
  font-weight:700;
  color:var(--module-4);
  line-height:1;
  margin-bottom:var(--space-sm);
}
.mko-principle-title {
  font-size:var(--text-heading);
  font-weight:700;
  color:var(--text-on-light);
  margin-bottom:var(--space-xs);
}
.mko-principle-desc {
  font-size:var(--text-small);
  color:var(--text-on-light-2);
  line-height:1.7;
}
.mko-principle-icon {
  margin-top:var(--space-md);
  font-size:28px;
  opacity:0.7;
}

/* ── Before 幻灯片样式（通用坏设计特征） ── */
.mko-before-gradient { background:linear-gradient(135deg,#c8d8ee,#dde8ff) !important; }
.mko-before-blue-header { background:linear-gradient(135deg,#1a4a8a,#2860b0) !important; }

/* ── 移动端 ── */
@media (max-width:768px) {
  .mko-principles-row { flex-direction:column; }
  .mko-principle-card { padding:var(--space-md); }
  .mko-slide { padding:16px 18px; font-size:11px; }
  .mko-takeaway { flex-direction:column; }
  .mko-takeaway-item { min-width:unset; }
  #mko-principles,
  #mko-case-title,
  #mko-case-data,
  #mko-case-text,
  #mko-case-chart,
  #mko-case-conclusion,
  #mko-case-cover { scroll-margin-top:56px; }
}

/* 桌面端 scroll-margin */
#mko-principles,
#mko-case-title,
#mko-case-data,
#mko-case-text,
#mko-case-chart,
#mko-case-conclusion,
#mko-case-cover { scroll-margin-top:56px; }
`;

// ══════════════════════════════════════════════════════
//  案例幻灯片 HTML（Before / After）
// ══════════════════════════════════════════════════════

// ── Case 1：标题页 ──
const BEFORE_1 = `
<div style="background:linear-gradient(135deg,#c8d8ee,#dde8ff);width:100%;height:100%;padding:20px 24px;box-sizing:border-box;position:relative;">
  <div style="position:absolute;top:10px;left:12px;font-size:9px;color:rgba(0,0,80,0.35);letter-spacing:0.05em;font-family:'Courier New',monospace;">[校徽]</div>
  <div style="position:absolute;top:10px;right:12px;font-size:8px;color:rgba(0,0,80,0.25);">某某大学</div>
  <div style="text-align:center;padding-top:8px;">
    <div style="font-family:'宋体',serif;font-size:11px;font-weight:bold;color:#003399;margin-bottom:4px;">基于深度学习的多模态医学影像分析与肿瘤区域自动分割系统关键技术研究进展汇报</div>
    <div style="font-family:'楷体','KaiTi',serif;font-size:9px;color:#555;margin-bottom:2px;">Research Progress on Key Technologies of Automatic Tumor Segmentation</div>
    <div style="font-family:'黑体','SimHei',sans-serif;font-size:8px;color:#333;margin-top:6px;">汇报人：张三 &nbsp;|&nbsp; 指导老师：李教授</div>
    <div style="font-size:8px;color:#666;margin-top:2px;font-style:italic;">课题组：医学AI实验室 &nbsp;·&nbsp; 学院：计算机科学与技术学院</div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to right,#1a4a8a,#2060b8);height:14px;"></div>
  <div style="position:absolute;bottom:14px;left:0;right:0;background:rgba(0,50,150,0.12);height:4px;"></div>
  <div style="position:absolute;bottom:16px;left:12px;right:12px;text-align:center;font-size:7px;color:rgba(0,0,80,0.5);">2024年12月 &nbsp;|&nbsp; 第xx次组会汇报 &nbsp;|&nbsp; 内部资料·请勿外传</div>
  <div style="position:absolute;left:6px;top:50%;transform:translateY(-50%);width:3px;height:40%;background:linear-gradient(to bottom,#2060b8,#6090d8);"></div>
  <div style="position:absolute;right:6px;top:50%;transform:translateY(-50%);width:3px;height:40%;background:linear-gradient(to bottom,#2060b8,#6090d8);"></div>
</div>
`;

const AFTER_1 = `
<div style="background:#fff;width:100%;height:100%;padding:24px 28px;box-sizing:border-box;position:relative;">
  <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--module-4,#F0B27A);border-radius:10px 0 0 10px;"></div>
  <div style="padding-left:16px;">
    <div style="font-size:7px;letter-spacing:0.12em;color:#aaa;text-transform:uppercase;margin-bottom:10px;font-family:'Inter',sans-serif;">组会汇报</div>
    <div style="font-family:'Noto Sans SC','Inter',sans-serif;font-size:14px;font-weight:700;color:#1d1d1f;line-height:1.4;margin-bottom:18px;max-width:90%;">多模态医学影像<br>肿瘤区域分割</div>
    <div style="display:flex;flex-direction:column;gap:5px;">
      <div style="font-size:10px;color:#444;font-family:'Noto Sans SC',sans-serif;">张三 &nbsp;<span style="color:#bbb;">·</span>&nbsp; 导师：李教授</div>
      <div style="font-size:9px;color:#aaa;">2024 · 12 · 15</div>
    </div>
  </div>
</div>
`;

// ── Case 2：数据页 ──
const BEFORE_2 = `
<div style="background:#fff;width:100%;height:100%;padding:10px 14px;box-sizing:border-box;">
  <div style="font-size:9px;font-weight:bold;text-align:center;margin-bottom:6px;color:#333;">Figure 3</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:calc(100% - 30px);">
    <div style="border:1px solid #999;font-size:7px;">
      <table style="width:100%;border-collapse:collapse;font-size:7px;">
        <tr style="background:#eee;"><th style="border:1px solid #999;padding:2px 3px;">组别</th><th style="border:1px solid #999;padding:2px 3px;">Week1</th><th style="border:1px solid #999;padding:2px 3px;">Week4</th><th style="border:1px solid #999;padding:2px 3px;">Week8</th></tr>
        <tr><td style="border:1px solid #999;padding:2px 3px;">Control</td><td style="border:1px solid #999;padding:2px 3px;">12.3</td><td style="border:1px solid #999;padding:2px 3px;">13.1</td><td style="border:1px solid #999;padding:2px 3px;">13.5</td></tr>
        <tr><td style="border:1px solid #999;padding:2px 3px;">Treatment</td><td style="border:1px solid #999;padding:2px 3px;">12.1</td><td style="border:1px solid #999;padding:2px 3px;">16.4</td><td style="border:1px solid #999;padding:2px 3px;">19.2</td></tr>
        <tr><td style="border:1px solid #999;padding:2px 3px;">Sham</td><td style="border:1px solid #999;padding:2px 3px;">11.9</td><td style="border:1px solid #999;padding:2px 3px;">12.8</td><td style="border:1px solid #999;padding:2px 3px;">12.9</td></tr>
      </table>
    </div>
    <div style="border:1px solid #999;font-size:7px;">
      <table style="width:100%;border-collapse:collapse;font-size:7px;">
        <tr style="background:#eee;"><th style="border:1px solid #999;padding:2px 3px;">指标</th><th style="border:1px solid #999;padding:2px 3px;">p值</th><th style="border:1px solid #999;padding:2px 3px;">ES</th></tr>
        <tr><td style="border:1px solid #999;padding:2px 3px;">主效应</td><td style="border:1px solid #999;padding:2px 3px;">&lt;0.001</td><td style="border:1px solid #999;padding:2px 3px;">0.82</td></tr>
        <tr><td style="border:1px solid #999;padding:2px 3px;">交互</td><td style="border:1px solid #999;padding:2px 3px;">0.023</td><td style="border:1px solid #999;padding:2px 3px;">0.61</td></tr>
      </table>
    </div>
    <div style="grid-column:1/-1;border:1px solid #ccc;padding:4px;font-size:7px;color:#555;line-height:1.4;">
      As shown in Table 1, the treatment group exhibited significantly higher scores compared to the control group at weeks 4 and 8 (p&lt;0.001). Effect size was large (d=0.82). The interaction between time and group was also significant. These results suggest that the intervention had a meaningful impact. Post-hoc analysis further confirmed...
    </div>
  </div>
</div>
`;

const AFTER_2 = `
<div style="background:#fff;width:100%;height:100%;padding:18px 22px;box-sizing:border-box;">
  <div style="font-size:12px;font-weight:700;color:#1d1d1f;margin-bottom:4px;font-family:'Noto Sans SC',sans-serif;line-height:1.3;">实验组效果提升 <span style="color:#F0B27A;font-size:16px;">42%</span></div>
  <div style="font-size:8px;color:#888;margin-bottom:12px;">Treatment group vs. Control at Week 8，p&lt;0.001，d=0.82</div>
  <div style="display:flex;align-items:flex-end;gap:6px;height:55%;padding-bottom:4px;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#888;">13.5</div>
      <div style="width:28px;height:30px;background:#d0d0d0;border-radius:3px 3px 0 0;"></div>
      <div style="font-size:7px;color:#666;">对照组</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#F0B27A;font-weight:600;">19.2</div>
      <div style="width:28px;height:54px;background:#F0B27A;border-radius:3px 3px 0 0;position:relative;">
        <div style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:7px;color:#F0B27A;white-space:nowrap;font-weight:600;">↑42%</div>
      </div>
      <div style="font-size:7px;color:#333;font-weight:600;">实验组</div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#888;">12.9</div>
      <div style="width:28px;height:28px;background:#e8e8e8;border-radius:3px 3px 0 0;"></div>
      <div style="font-size:7px;color:#666;">对照假手术</div>
    </div>
  </div>
  <div style="font-size:7px;color:#aaa;border-top:1px solid #eee;padding-top:6px;">Week 8 数据；详细数据见附录 Slide 18</div>
</div>
`;

// ── Case 3：文字墙 ──
const BEFORE_3 = `
<div style="background:#f5f5f5;width:100%;height:100%;padding:14px 16px;box-sizing:border-box;">
  <div style="font-size:10px;font-weight:bold;color:#222;margin-bottom:8px;border-bottom:1px solid #ccc;padding-bottom:4px;">研究方法</div>
  <div style="font-size:8px;color:#333;line-height:1.55;">
    本研究采用随机对照双盲实验设计，招募符合纳入标准的受试者共72名，随机分配至实验组（n=36）和对照组（n=36）。实验组接受为期8周的干预方案，每周两次，每次45分钟。干预内容包括认知行为训练、生物反馈技术以及个体化方案调整。对照组接受同等时间的安慰剂控制处理。主要结局指标为认知功能综合评分（MMSE、MoCA），次要指标包括焦虑抑郁量表（GAD-7、PHQ-9）及生理指标（心率变异性、皮肤电导）。所有数据均采用SPSS 26.0进行统计分析，组间比较采用独立样本t检验，重复测量数据采用混合线性模型，显著性水平设定为α=0.05。
  </div>
  <div style="font-size:8px;color:#333;line-height:1.55;margin-top:6px;">
    为确保实验质量，所有干预人员均接受标准化培训并通过能力考核。实验过程中对受试者进行全程监测，详细记录不良事件及依从性数据。数据收集采用双人录入并交叉核验。
  </div>
</div>
`;

const AFTER_3 = `
<div style="background:#1d1d1f;width:100%;height:100%;padding:18px 22px;box-sizing:border-box;">
  <div style="font-size:8px;letter-spacing:0.1em;color:#888;text-transform:uppercase;margin-bottom:14px;">研究方法</div>
  <div style="display:flex;gap:16px;">
    <div style="flex:1;text-align:center;">
      <div style="font-size:22px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;">72</div>
      <div style="font-size:9px;font-weight:600;color:#f5f5f7;margin:3px 0 2px;">随机对照</div>
      <div style="font-size:7px;color:#666;line-height:1.5;">双盲设计<br>实验组 vs 对照组</div>
    </div>
    <div style="flex:1;text-align:center;">
      <div style="font-size:22px;font-weight:700;color:#7EC8E3;font-family:'Inter',sans-serif;">8周</div>
      <div style="font-size:9px;font-weight:600;color:#f5f5f7;margin:3px 0 2px;">认知行为干预</div>
      <div style="font-size:7px;color:#666;line-height:1.5;">每周 2 次<br>每次 45 分钟</div>
    </div>
    <div style="flex:1;text-align:center;">
      <div style="font-size:22px;font-weight:700;color:#95D5B2;font-family:'Inter',sans-serif;">MMSE</div>
      <div style="font-size:9px;font-weight:600;color:#f5f5f7;margin:3px 0 2px;">认知功能评估</div>
      <div style="font-size:7px;color:#666;line-height:1.5;">MoCA + GAD-7<br>混合线性模型</div>
    </div>
  </div>
  <div style="font-size:7px;color:#555;margin-top:12px;border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;">详细方法见演讲者备注</div>
</div>
`;

// ── Case 4：图表页 ──
const BEFORE_4 = `
<div style="background:#fff;width:100%;height:100%;padding:10px 12px;box-sizing:border-box;">
  <div style="font-size:9px;font-weight:bold;color:#333;margin-bottom:6px;text-align:center;">Fig.3 Results of Experiment</div>
  <div style="display:flex;gap:6px;height:calc(100% - 36px);">
    <div style="flex:1;position:relative;border:1px solid #ccc;background:#f8f8f8;">
      <!-- Excel风格图表 -->
      <div style="position:absolute;bottom:14px;left:10px;right:10px;display:flex;align-items:flex-end;gap:3px;">
        <div style="width:10px;height:32px;background:#4472C4;"></div>
        <div style="width:10px;height:54px;background:#ED7D31;"></div>
        <div style="width:10px;height:22px;background:#A9D18E;"></div>
        <div style="width:10px;height:40px;background:#FF0000;"></div>
        <div style="width:10px;height:48px;background:#FFC000;"></div>
        <div style="width:10px;height:28px;background:#7030A0;"></div>
        <div style="width:10px;height:36px;background:#00B0F0;"></div>
        <div style="width:10px;height:58px;background:#FF00FF;"></div>
      </div>
      <div style="position:absolute;bottom:4px;left:0;right:0;font-size:6px;color:#555;text-align:center;">T1 T2 T3 T4 T5 T6 T7 T8</div>
      <div style="position:absolute;top:4px;left:4px;font-size:6px;color:#777;writing-mode:vertical-lr;transform:rotate(180deg);">Val (AU)</div>
      <div style="position:absolute;top:4px;left:0;right:0;border-top:1px solid #bbb;"></div>
    </div>
    <div style="width:56px;font-size:6px;color:#444;line-height:1.8;padding:2px;">
      <div>■ <span style="color:#4472C4;">Ctrl-W1</span></div>
      <div>■ <span style="color:#ED7D31;">Trt-W1</span></div>
      <div>■ <span style="color:#A9D18E;">Ctrl-W4</span></div>
      <div>■ <span style="color:#FF0000;">Trt-W4</span></div>
      <div>■ <span style="color:#FFC000;">Ctrl-W8</span></div>
      <div>■ <span style="color:#7030A0;">Trt-W8</span></div>
      <div>■ <span style="color:#00B0F0;">Sham-W4</span></div>
      <div>■ <span style="color:#FF00FF;">Sham-W8</span></div>
    </div>
  </div>
  <div style="font-size:6px;color:#888;margin-top:2px;text-align:center;">Note: AU = arbitrary units; error bars = SEM; n=12/group</div>
</div>
`;

const AFTER_4 = `
<div style="background:#fff;width:100%;height:100%;padding:16px 20px;box-sizing:border-box;">
  <div style="font-size:11px;font-weight:700;color:#1d1d1f;margin-bottom:2px;font-family:'Noto Sans SC',sans-serif;">处理组在第 8 周达到峰值</div>
  <div style="font-size:7px;color:#888;margin-bottom:10px;">平均分值（任意单位）；误差棒 = SEM；n=12/组</div>
  <div style="display:flex;gap:8px;height:56%;align-items:flex-end;margin-bottom:6px;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#aaa;">W1</div>
      <div style="display:flex;gap:2px;align-items:flex-end;">
        <div style="width:12px;height:24px;background:#d0d0d0;border-radius:2px 2px 0 0;" title="对照组 W1"></div>
        <div style="width:12px;height:25px;background:#F0B27A;border-radius:2px 2px 0 0;" title="实验组 W1"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#aaa;">W4</div>
      <div style="display:flex;gap:2px;align-items:flex-end;">
        <div style="width:12px;height:26px;background:#d0d0d0;border-radius:2px 2px 0 0;"></div>
        <div style="width:12px;height:38px;background:#F0B27A;border-radius:2px 2px 0 0;"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:7px;color:#F0B27A;font-weight:700;">W8 ★</div>
      <div style="display:flex;gap:2px;align-items:flex-end;">
        <div style="width:12px;height:28px;background:#d0d0d0;border-radius:2px 2px 0 0;"></div>
        <div style="width:12px;height:54px;background:#F0B27A;border-radius:2px 2px 0 0;position:relative;">
          <div style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);font-size:7px;color:#F0B27A;font-weight:700;white-space:nowrap;">峰值</div>
        </div>
      </div>
    </div>
    <div style="margin-left:8px;display:flex;flex-direction:column;gap:4px;justify-content:flex-end;padding-bottom:4px;">
      <div style="display:flex;align-items:center;gap:4px;"><div style="width:10px;height:10px;background:#d0d0d0;border-radius:2px;"></div><div style="font-size:7px;color:#666;">对照组</div></div>
      <div style="display:flex;align-items:center;gap:4px;"><div style="width:10px;height:10px;background:#F0B27A;border-radius:2px;"></div><div style="font-size:7px;color:#333;font-weight:600;">实验组</div></div>
    </div>
  </div>
  <div style="font-size:7px;color:#aaa;border-top:1px solid #eee;padding-top:5px;">p&lt;0.001（W8组间比较）；详细数据见附录</div>
</div>
`;

// ── Case 5：结论页 ──
const BEFORE_5 = `
<div style="background:#fff;width:100%;height:100%;padding:12px 16px;box-sizing:border-box;">
  <div style="font-size:11px;font-weight:bold;text-align:center;color:#003399;margin-bottom:8px;border-bottom:2px solid #003399;padding-bottom:4px;">Summary &amp; Conclusions</div>
  <ul style="font-size:8px;color:#333;line-height:1.6;padding-left:14px;margin:0;">
    <li>本研究成功建立了一套完整的认知干预评估体系，涵盖认知、情感及生理多个维度</li>
    <li>实验组在干预后各主要指标均显著优于对照组，差异具有统计学意义（p&lt;0.001）</li>
    <li>效应量分析表明干预效果显著（Cohen's d = 0.82），具有较高的临床意义</li>
    <li>双盲随机对照设计有效控制了安慰剂效应和观察者偏倚，提高了研究内部效度</li>
    <li>本研究存在一定局限性，包括样本量相对有限、随访时间较短及单一地区样本等</li>
    <li>未来研究可考虑扩大样本量、延长随访期并在多中心开展验证研究</li>
  </ul>
  <div style="text-align:center;margin-top:10px;font-size:18px;color:#003399;font-weight:bold;text-shadow:1px 1px 3px rgba(0,0,200,0.2);">Thank You! 🎉✨🎊</div>
</div>
`;

const AFTER_5 = `
<div style="background:#1d1d1f;width:100%;height:100%;padding:18px 22px;box-sizing:border-box;">
  <div style="font-size:8px;letter-spacing:0.1em;color:#666;text-transform:uppercase;margin-bottom:12px;">Take-home Messages</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:12px;">
    <div style="display:flex;align-items:flex-start;gap:8px;">
      <div style="font-size:16px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:18px;line-height:1.2;">1</div>
      <div><div style="font-size:10px;font-weight:600;color:#f5f5f7;line-height:1.3;">认知干预有效</div><div style="font-size:7px;color:#666;margin-top:1px;">d = 0.82，p &lt; 0.001</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:8px;">
      <div style="font-size:16px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:18px;line-height:1.2;">2</div>
      <div><div style="font-size:10px;font-weight:600;color:#f5f5f7;line-height:1.3;">效果在第 8 周达峰</div><div style="font-size:7px;color:#666;margin-top:1px;">需要足够干预时长</div></div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:8px;">
      <div style="font-size:16px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:18px;line-height:1.2;">3</div>
      <div><div style="font-size:10px;font-weight:600;color:#f5f5f7;line-height:1.3;">双盲 RCT 设计可靠</div><div style="font-size:7px;color:#666;margin-top:1px;">有效控制偏倚</div></div>
    </div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:8px;">
    <div style="font-size:7px;color:#555;margin-bottom:4px;letter-spacing:0.08em;">未来方向</div>
    <div style="font-size:8px;color:#555;line-height:1.6;">扩大样本量 &nbsp;·&nbsp; 多中心验证 &nbsp;·&nbsp; 延长随访</div>
  </div>
</div>
`;

// ── Case 6：封面页 ──
const BEFORE_6 = `
<div style="background:#f0f4fa;width:100%;height:100%;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#1a4a8a,#2860b0);height:28%;display:flex;align-items:center;padding:0 16px;gap:10px;">
    <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:bold;">校</div>
    <div>
      <div style="font-size:9px;color:#fff;font-weight:bold;">XX大学</div>
      <div style="font-size:7px;color:rgba(255,255,255,0.7);">XX University · 博士学位论文答辩</div>
    </div>
    <div style="margin-left:auto;font-size:7px;color:rgba(255,255,255,0.6);">School of Medicine</div>
  </div>
  <div style="padding:8px 14px;">
    <div style="font-size:9px;font-weight:bold;color:#1a3a6a;line-height:1.4;margin-bottom:6px;text-align:center;">基于深度学习的多模态医学影像分析与肿瘤区域自动分割系统关键技术研究</div>
    <div style="font-size:7px;color:#555;text-align:center;margin-bottom:8px;">Key Technologies of Multi-modal Medical Image Analysis and Automatic Tumor Segmentation System Based on Deep Learning</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;font-size:7px;color:#444;text-align:center;border:1px solid #ccc;border-radius:4px;padding:4px;">
      <div>答辩人：张三</div><div>学号：2021XXX001</div>
      <div>导师：李四 教授</div><div>副导师：王五 副教授</div>
      <div>专业：计算机科学</div><div>学院：信息工程学院</div>
    </div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to right,#1a4a8a,#2060b8);height:10px;"></div>
  <div style="position:absolute;bottom:10px;left:0;right:0;font-size:6px;color:#888;text-align:center;">答辩日期：2024年12月15日 &nbsp;|&nbsp; 答辩地点：主楼 201 会议室</div>
</div>
`;

const AFTER_6 = `
<div style="background:#fff;width:100%;height:100%;padding:0;box-sizing:border-box;display:flex;overflow:hidden;">
  <div style="width:5px;background:var(--module-4,#F0B27A);flex-shrink:0;"></div>
  <div style="flex:1;padding:18px 22px;display:flex;flex-direction:column;justify-content:center;">
    <div style="font-size:7px;letter-spacing:0.12em;color:#bbb;text-transform:uppercase;margin-bottom:14px;">博士学位论文答辩</div>
    <div style="font-size:14px;font-weight:700;color:#1d1d1f;line-height:1.35;margin-bottom:18px;max-width:85%;font-family:'Noto Sans SC',sans-serif;">多模态医学影像<br>肿瘤自动分割系统</div>
    <div style="display:flex;flex-direction:column;gap:5px;margin-bottom:14px;">
      <div style="font-size:9px;color:#333;font-weight:600;">张三</div>
      <div style="font-size:8px;color:#888;">导师：李四 教授</div>
    </div>
    <div style="border-top:1px solid #eee;padding-top:10px;display:flex;justify-content:space-between;align-items:center;">
      <div style="font-size:7px;color:#bbb;">XX 大学 · 信息工程学院</div>
      <div style="font-size:7px;color:#bbb;">2024 · 12</div>
    </div>
  </div>
</div>
`;

// ══════════════════════════════════════════════════════
//  render()
// ══════════════════════════════════════════════════════
export function render() {
  return `
<style>${styles}</style>
<div class="page-scroll">

  <!-- ═══ Hero ═══ -->
  <section class="section-dark section-hero-full mko-hero" id="mko-hero">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow" style="opacity:0;">Module 04 / Page 03</p>
      <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">PPT 改造工坊</h1>
      <p class="page-hero-sub" style="opacity:0;">Slide Makeover Workshop</p>
      <p class="mko-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">6 组真实案例，看"差"如何变"好"</p>
      <nav class="hero-quicknav" id="mko-quicknav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#mko-principles">改造原则</button>
        <button class="hero-quicknav__item" data-target="#mko-case-title">标题页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-data">数据页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-text">文字页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-chart">图表页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-conclusion">结论页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-cover">封面页</button>
      </nav>
      <div class="mko-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ═══ S1 改造原则 (浅色) ═══ -->
  <section class="section-light" id="mko-principles"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">核心原则</p>
      <h2 class="section-title">改造前先记住这三条</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">不是"让它变漂亮"，而是"让信息更清晰"</p>
    </div>
    <div class="mko-principles-row">
      <div class="mko-principle-card">
        <div class="mko-principle-num">01</div>
        <div class="mko-principle-title">减法优先</div>
        <p class="mko-principle-desc">先删掉不必要的，再美化剩下的。<br>每次删一个元素，问：去掉会不会影响理解？</p>
        <div class="mko-principle-icon">✂️</div>
      </div>
      <div class="mko-principle-card">
        <div class="mko-principle-num">02</div>
        <div class="mko-principle-title">一页一事</div>
        <p class="mko-principle-desc">每张 slide 只传达一个核心信息。<br>如果你无法用一句话概括这张 slide，就该拆分。</p>
        <div class="mko-principle-icon">◎</div>
      </div>
      <div class="mko-principle-card">
        <div class="mko-principle-num">03</div>
        <div class="mko-principle-title">对比验证</div>
        <p class="mko-principle-desc">改完后和原版放一起看。<br>如果改进不是一眼看出来的，就继续改。</p>
        <div class="mko-principle-icon">⇆</div>
      </div>
    </div>
  </section>

  <!-- ═══ S2 Case 1：标题页 (深色) ═══ -->
  <section class="section-dark" id="mko-case-title"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 1 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">标题页改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">第一张 slide 决定第一印象，别让它成为信息垃圾桶</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">组会汇报</span>
        <span class="mko-scene-tag">日常汇报</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-1"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 标题精简：30 字以上的标题去掉修饰词，保留核心研究对象和方法</div>
        <div class="mko-takeaway-item">② 字体统一：全页只用一种字体，通过字号和字重建立层次</div>
        <div class="mko-takeaway-item">③ 背景简化：去掉渐变、水印和装饰线条，白底永远不会出错</div>
      </div>
    </div>
  </section>

  <!-- ═══ S3 Case 2：数据页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-data"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 2 / 6</p>
      <h2 class="section-title">数据页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">一张 slide 装三个表格，没有一个表格能看清楚</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">学术会议</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-2"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 一页一图：把多图合并拆分开来，每张 slide 只展示一个关键数据</div>
        <div class="mko-takeaway-item">② 标题即结论：把"Figure 3"改成"实验组效果提升 42%"，观众秒懂</div>
        <div class="mko-takeaway-item">③ 数据高亮关键值：用颜色或字号突出最重要的数字，引导眼球</div>
      </div>
    </div>
  </section>

  <!-- ═══ S4 Case 3：文字墙 (深色) ═══ -->
  <section class="section-dark" id="mko-case-text"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 3 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">文字墙改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">PPT 不是论文，观众是来听你讲的，不是来读的</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">项目答辩</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-3"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 提炼关键词：200 字的段落浓缩成 3 个关键词 + 一句话说明</div>
        <div class="mko-takeaway-item">② 用数字代替形容词："显著提升"不如"提升 42%"有力量</div>
        <div class="mko-takeaway-item">③ 详细内容放备注：演讲者备注是你的台词，slide 是观众的摘要</div>
      </div>
    </div>
  </section>

  <!-- ═══ S5 Case 4：图表页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-chart"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 4 / 6</p>
      <h2 class="section-title">图表页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">Excel 默认配色是设计师的噩梦，也是观众的噩梦</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">学位答辩</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-4"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 重绘别截图：截图模糊、配色乱；用 Python/R/AI 重新绘制矢量图</div>
        <div class="mko-takeaway-item">② 标题即结论：把图的标题从编号改成你想让观众记住的那句话</div>
        <div class="mko-takeaway-item">③ 图例集成：把图例直接标注在数据旁，减少视线跳跃</div>
      </div>
    </div>
  </section>

  <!-- ═══ S6 Case 5：结论页 (深色) ═══ -->
  <section class="section-dark" id="mko-case-conclusion"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 5 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">结论页改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">最后一张 slide 是最后一次机会——别浪费在子弹列表上</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">学术会议</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-5"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 只留 3 条核心结论：人类工作记忆上限是 3-4 条，超过就全忘了</div>
        <div class="mko-takeaway-item">② 分层：主结论 &gt; 未来方向 &gt; 联系方式，信息有轻重</div>
        <div class="mko-takeaway-item">③ 结尾给行动指引：二维码、邮箱、数据集链接——让合作从这里开始</div>
      </div>
    </div>
  </section>

  <!-- ═══ S7 Case 6：封面页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-cover"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 6 / 6</p>
      <h2 class="section-title">封面页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">学校模板是出发点，不是终点——你有权利改掉它</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">学位答辩</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-6"></div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 模板可以改：校徽保留但缩小，蓝色横幅删掉或替换为简洁色块</div>
        <div class="mko-takeaway-item">② 标题是主角：论文标题字号至少是其他信息的 2 倍，占据视觉中心</div>
        <div class="mko-takeaway-item">③ 留白即权威：干净的封面传达自信，塞满装饰只会让评委分心</div>
      </div>
    </div>
  </section>

  <!-- ═══ Footer CTA ═══ -->
  <section class="section-dark page-footer-cta" style="padding:var(--space-3xl) var(--space-lg);">
    <p class="page-footer-num">03 / 04</p>
    <h2 class="page-footer-quote">最好的改造，是让观众忘记设计，只记住内容。</h2>
    <p class="page-footer-desc">学完 PPT，来看看学术海报和 Graphical Abstract 的设计要领。</p>
    <div class="page-footer-nav">
      <button class="btn-ghost" id="mko-prev-btn">← 学术演示全场景</button>
      <button class="btn-primary" id="mko-next-btn">学术海报与 GA →</button>
    </div>
  </section>

</div>`;
}

// ══════════════════════════════════════════════════════
//  init()
// ══════════════════════════════════════════════════════
export function init() {
  initHero();
  initQuicknav();
  initCases();
  initScrollAnimations();
  initFooterNav();
}

// ── Hero 入场动画 ──
function initHero() {
  const eyebrow = document.querySelector('.mko-hero .hero-eyebrow');
  const title   = document.querySelector('.mko-hero .page-hero-title');
  const sub     = document.querySelector('.mko-hero .page-hero-sub');
  const tagline = document.querySelector('.mko-hero-tagline');
  const quicknav = document.getElementById('mko-quicknav');
  const scroll  = document.querySelector('.mko-scroll-hint');

  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl.fromTo(eyebrow,  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0);
  heroTl.fromTo(title,    { y: 30, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
  heroTl.fromTo(sub,      { y: 20, opacity: 0 }, { opacity: 0.5, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  heroTl.fromTo(tagline,  { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.45);
  heroTl.fromTo(quicknav, { y: 20, opacity: 0 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.6);
  heroTl.fromTo(scroll,   { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.75);
}

// ── 快捷导航 ──
function initQuicknav() {
  const nav = document.getElementById('mko-quicknav');
  if (!nav) return;
  nav.querySelectorAll('.hero-quicknav__item').forEach(btn => {
    addEvt(btn, 'click', () => {
      const target = document.querySelector(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ── 6 组 BeforeAfter 案例 ──
function initCases() {
  const caseDefs = [
    { id: 'mko-ba-1', before: BEFORE_1, after: AFTER_1 },
    { id: 'mko-ba-2', before: BEFORE_2, after: AFTER_2 },
    { id: 'mko-ba-3', before: BEFORE_3, after: AFTER_3 },
    { id: 'mko-ba-4', before: BEFORE_4, after: AFTER_4 },
    { id: 'mko-ba-5', before: BEFORE_5, after: AFTER_5 },
    { id: 'mko-ba-6', before: BEFORE_6, after: AFTER_6 },
  ];

  caseDefs.forEach(({ id, before, after }) => {
    const container = document.getElementById(id);
    if (!container) return;
    const ba = createBeforeAfter(container, {
      beforeContent: `<div class="mko-slide mko-slide-before">${before}</div>`,
      afterContent:  `<div class="mko-slide mko-slide-after">${after}</div>`,
      beforeLabel: '改造前',
      afterLabel: '改造后',
      initialPosition: 50,
    });
    if (ba) _beforeAfters.push(ba);
  });
}

// ── 滚动动画 ──
function initScrollAnimations() {
  // S1 原则卡片
  fadeIn('.mko-principle-card', { stagger: 0.12, y: 30, duration: 0.6 });

  // 每组 case 的 section-header
  const caseIds = ['mko-case-title','mko-case-data','mko-case-text','mko-case-chart','mko-case-conclusion','mko-case-cover'];
  caseIds.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;
    const header = section.querySelector('.section-header');
    const ba     = section.querySelector('.mko-ba-container');
    const takeaway = section.querySelector('.mko-takeaway');
    if (header)   fadeIn(header,   { y: 40, duration: 0.8 });
    if (ba)       fadeIn(ba,       { y: 40, duration: 0.7, start: 'top 80%' });
    if (takeaway) fadeIn(takeaway, { y: 20, duration: 0.6, start: 'top 90%' });
  });

  // Footer
  fadeIn('.page-footer-quote', { y: 40, duration: 0.9 });
  fadeIn('.page-footer-cta .page-footer-nav', { y: 25, duration: 0.6 });
}

// ── 底部导航 ──
function initFooterNav() {
  const prevBtn = document.getElementById('mko-prev-btn');
  const nextBtn = document.getElementById('mko-next-btn');
  if (prevBtn) addEvt(prevBtn, 'click', () => navigateTo('m4-p2'));
  if (nextBtn) addEvt(nextBtn, 'click', () => navigateTo('m4-p4'));
}

// ══════════════════════════════════════════════════════
//  destroy()
// ══════════════════════════════════════════════════════
export function destroy() {
  _eventHandlers.forEach(({ el, type, fn, opts }) => el.removeEventListener(type, fn, opts));
  _eventHandlers = [];
  _beforeAfters.forEach(ba => ba.destroy());
  _beforeAfters = [];
  killAll();
}
