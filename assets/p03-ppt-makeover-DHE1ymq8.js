import{k as w,g as z,f as d}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as h}from"./index--9oJ04dn.js";import{c as S}from"./BeforeAfter-OabwNNOK.js";let x=[],v=[];function n(e,i,t,s){e&&(e.addEventListener(i,t,s),x.push({el:e,type:i,fn:t,opts:s}))}const A=`
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
  padding: 40px 48px;
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
.mko-scene-tag::before {
  content:'';
  display:inline-block;
  width:6px;
  height:6px;
  border-radius:50%;
  background:currentColor;
  margin-right:6px;
  vertical-align:middle;
  opacity:0.6;
}
.section-dark .mko-scene-tag {
  background:rgba(240,178,122,0.18);
  color:#f5c08a;
}

/* ── BA 容器 ── */
.mko-ba-container { width:100%; border-radius:12px; overflow:hidden; box-shadow:var(--shadow-lg); transition:transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s; }
.mko-ba-container:hover { transform:scale(1.01); box-shadow:0 16px 48px rgba(0,0,0,0.15); }
.section-dark .mko-ba-container { box-shadow:0 8px 40px rgba(0,0,0,0.4); }
.section-dark .mko-ba-container:hover { box-shadow:0 16px 56px rgba(0,0,0,0.5); }

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
  transition:transform 0.3s, box-shadow 0.3s;
  cursor:default;
}
.mko-takeaway-item:hover {
  transform:translateX(4px);
  box-shadow:inset 3px 0 0 var(--module-4);
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

/* ── 改造评分指示器 ── */
.mko-score-bar {
  display:flex;
  align-items:center;
  gap:var(--space-sm);
  margin-top:var(--space-md);
  padding:12px 16px;
  border-radius:var(--radius-sm);
  background:rgba(240,178,122,0.06);
  border:1px solid rgba(240,178,122,0.12);
}
.section-dark .mko-score-bar {
  background:rgba(240,178,122,0.08);
  border-color:rgba(240,178,122,0.15);
}
.mko-score-label {
  font-size:12px;
  font-weight:600;
  color:var(--module-4);
  letter-spacing:0.06em;
  text-transform:uppercase;
  white-space:nowrap;
}
.mko-score-track {
  flex:1;
  height:6px;
  border-radius:3px;
  background:rgba(0,0,0,0.06);
  overflow:hidden;
  position:relative;
}
.section-dark .mko-score-track { background:rgba(255,255,255,0.08); }
.mko-score-fill {
  height:100%;
  border-radius:3px;
  background:linear-gradient(90deg, #F0B27A, #95D5B2);
  transition:width 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  width:50%;
}
.mko-score-value {
  font-size:18px;
  font-weight:700;
  color:var(--module-4);
  font-family:var(--font-code);
  min-width:48px;
  text-align:right;
}

/* ── 移动端 ── */
@media (max-width:768px) {
  .mko-principles-row { flex-direction:column; }
  .mko-principle-card { padding:var(--space-md); }
  .mko-slide { padding:24px 28px; font-size:11px; }
  .mko-takeaway { flex-direction:column; }
  .mko-takeaway-item { min-width:unset; }
  #mko-principles,
  #mko-case-cover,
  #mko-case-toc,
  #mko-case-text,
  #mko-case-table,
  #mko-case-chart,
  #mko-case-conclusion { scroll-margin-top:56px; }
}

/* 桌面端 scroll-margin */
#mko-principles,
#mko-case-cover,
#mko-case-toc,
#mko-case-text,
#mko-case-table,
#mko-case-chart,
#mko-case-conclusion { scroll-margin-top:56px; }
`,E=`
<div style="background:linear-gradient(135deg,#c8d8ee,#dde8ff);width:100%;height:100%;padding:24px 32px;box-sizing:border-box;position:relative;overflow:hidden;">
  <div style="position:absolute;top:16px;left:20px;width:40px;height:40px;border-radius:50%;background:rgba(0,0,100,0.12);display:flex;align-items:center;justify-content:center;font-size:15px;color:rgba(0,0,100,0.4);font-weight:bold;">校</div>
  <div style="position:absolute;top:18px;right:20px;font-size:13px;color:rgba(0,0,80,0.3);">某某大学</div>
  <div style="display:flex;flex-direction:column;justify-content:center;text-align:center;height:100%;">
    <div style="font-family:'SimSun',serif;font-size:17px;font-weight:bold;color:#003399;line-height:1.35;margin-bottom:6px;">基于深度学习的多模态医学影像分析与肿瘤区域自动分割系统关键技术研究进展汇报</div>
    <div style="font-family:'KaiTi',serif;font-size:11px;color:#555;margin-bottom:6px;line-height:1.3;">Research Progress on Key Technologies of Multi-modal Medical Image Analysis and Automatic Tumor Region Segmentation System</div>
    <div style="width:80%;height:1px;background:linear-gradient(90deg,transparent,#003399,transparent);margin:12px auto;"></div>
    <div style="font-size:12px;color:#333;line-height:1.8;">
      <span>汇报人：张三</span>&nbsp;&nbsp;<span>学号：2021XXX001</span><br>
      <span>指导老师：李四 教授</span>&nbsp;&nbsp;<span>副导师：王五 副教授</span><br>
      <span>课题组：医学AI实验室</span>&nbsp;&nbsp;<span>学院：计算机科学与技术学院</span>
    </div>
    <div style="font-size:11px;color:rgba(0,0,80,0.35);margin-top:8px;font-style:italic;">课题来源：国家自然科学基金面上项目（No. 62xxxxxx）</div>
  </div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:10px;background:linear-gradient(to right,#1a4a8a,#2860b0);"></div>
  <div style="position:absolute;bottom:14px;left:0;right:0;text-align:center;font-size:11px;color:rgba(0,0,80,0.4);">2024年12月15日 · 第14次组会汇报 · 内部资料请勿外传</div>
  <div style="position:absolute;left:8px;top:40%;width:3px;height:30%;background:linear-gradient(#2060b8,#6090d8);border-radius:1px;"></div>
  <div style="position:absolute;right:8px;top:40%;width:3px;height:30%;background:linear-gradient(#2060b8,#6090d8);border-radius:1px;"></div>
</div>
`,F=`
<div style="background:#1d1d1f;width:100%;height:100%;padding:44px 48px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;overflow:hidden;position:relative;">
  <div style="width:60px;height:5px;background:#F0B27A;border-radius:2px;margin-bottom:20px;"></div>
  <div style="font-size:13px;letter-spacing:0.14em;color:#666;text-transform:uppercase;margin-bottom:20px;">组会汇报 · 第 14 次</div>
  <div style="font-size:30px;font-weight:700;color:#f5f5f7;line-height:1.35;margin-bottom:8px;">多模态医学影像</div>
  <div style="font-size:30px;font-weight:700;color:#f5f5f7;line-height:1.35;margin-bottom:28px;">肿瘤区域自动分割</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
    <div style="font-size:16px;color:#ccc;font-weight:500;">张三 · 2021 级博士</div>
    <div style="font-size:15px;color:#777;">导师：李四 教授 · 副导师：王五 副教授</div>
    <div style="font-size:13px;color:#555;">国家自然科学基金面上项目（No. 62xxxxxx）</div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:14px;display:flex;justify-content:space-between;">
    <div style="font-size:13px;color:#555;">医学AI实验室 · 计算机科学与技术学院</div>
    <div style="font-size:13px;color:#555;">2024 · 12 · 15</div>
  </div>
</div>
`,C=`
<div style="background:#fff;width:100%;height:100%;padding:32px 36px;box-sizing:border-box;position:relative;">
  <div style="text-align:center;margin-bottom:20px;">
    <div style="font-size:26px;font-weight:bold;color:#003399;letter-spacing:0.3em;">目&nbsp;&nbsp;录</div>
    <div style="width:60%;height:2px;background:#003399;margin:8px auto 0;"></div>
  </div>
  <div style="font-size:16px;color:#333;line-height:2.2;padding-left:28px;">
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>一、研究背景与文献综述 ...................... 3</div>
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>二、研究问题与假设 .......................... 8</div>
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>三、基于卷积神经网络的图像分割方法 ......... 12</div>
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>四、实验设计与数据采集 ...................... 18</div>
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>五、实验结果与分析 .......................... 22</div>
    <div style="display:flex;align-items:center;gap:10px;"><div style="width:14px;height:14px;border-radius:50%;background:#4472C4;flex-shrink:0;"></div>六、结论与展望 .............................. 28</div>
  </div>
  <div style="position:absolute;bottom:12px;right:24px;font-size:14px;color:#999;">2 / 30</div>
</div>
`,B=`
<div style="background:#fff;width:100%;height:100%;padding:36px 44px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:13px;letter-spacing:0.1em;color:#bbb;text-transform:uppercase;margin-bottom:24px;">CONTENTS</div>
  <div style="display:flex;flex-direction:column;gap:14px;">
    <div style="display:flex;align-items:baseline;gap:18px;opacity:0.4;">
      <div style="font-size:34px;font-weight:700;color:#d0d0d0;font-family:'Inter',sans-serif;min-width:48px;">01</div>
      <div style="font-size:16px;color:#999;">研究背景与文献综述</div>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;opacity:0.4;">
      <div style="font-size:34px;font-weight:700;color:#d0d0d0;font-family:'Inter',sans-serif;min-width:48px;">02</div>
      <div style="font-size:16px;color:#999;">研究问题与假设</div>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;padding:10px 0;border-left:5px solid #F0B27A;padding-left:18px;margin-left:-23px;">
      <div style="font-size:38px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:48px;">03</div>
      <div>
        <div style="font-size:20px;font-weight:600;color:#1d1d1f;">基于 CNN 的图像分割方法</div>
        <div style="font-size:13px;color:#aaa;margin-top:2px;">本次汇报重点</div>
      </div>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;opacity:0.4;">
      <div style="font-size:34px;font-weight:700;color:#d0d0d0;font-family:'Inter',sans-serif;min-width:48px;">04</div>
      <div style="font-size:16px;color:#999;">实验设计与数据采集</div>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;opacity:0.4;">
      <div style="font-size:34px;font-weight:700;color:#d0d0d0;font-family:'Inter',sans-serif;min-width:48px;">05</div>
      <div style="font-size:16px;color:#999;">实验结果与分析</div>
    </div>
    <div style="display:flex;align-items:baseline;gap:18px;opacity:0.4;">
      <div style="font-size:34px;font-weight:700;color:#d0d0d0;font-family:'Inter',sans-serif;min-width:48px;">06</div>
      <div style="font-size:16px;color:#999;">结论与展望</div>
    </div>
  </div>
</div>
`,T=`
<div style="background:#f8f8f8;width:100%;height:100%;padding:24px 28px;box-sizing:border-box;">
  <div style="font-size:20px;font-weight:bold;color:#cc0000;margin-bottom:8px;text-decoration:underline;">研究方法</div>
  <div style="font-size:14px;line-height:1.45;color:#333;">
    <span style="color:#003399;font-weight:bold;">本研究采用</span>随机对照双盲实验设计，招募符合纳入标准的受试者共<span style="color:#cc0000;font-weight:bold;">72名</span>，随机分配至实验组（<span style="color:#003399;">n=36</span>）和对照组（<span style="color:#003399;">n=36</span>）。实验组接受为期<span style="font-weight:bold;text-decoration:underline;">8周</span>的干预方案，<span style="color:#cc6600;font-style:italic;">每周两次，每次45分钟</span>。干预内容包括<span style="font-weight:bold;">认知行为训练</span>、生物反馈技术以及个体化方案调整。对照组接受同等时间的安慰剂控制处理。
  </div>
  <div style="font-size:14px;line-height:1.45;color:#333;margin-top:8px;">
    <span style="color:#006600;font-weight:bold;font-style:italic;">主要结局指标</span>为认知功能综合评分（<span style="text-decoration:underline;">MMSE、MoCA</span>），<span style="color:#660066;">次要指标</span>包括焦虑抑郁量表（GAD-7、PHQ-9）及生理指标（心率变异性HRV、皮肤电导SC）。所有数据均采用SPSS 26.0进行统计分析，组间比较采用独立样本t检验，重复测量数据采用<span style="font-weight:bold;color:#003399;">混合线性模型</span>，显著性水平设定为<span style="color:#cc0000;">α=0.05</span>。
  </div>
  <div style="font-size:13px;color:#444;margin-top:8px;line-height:1.4;">
    为确保实验质量，所有干预人员均接受标准化培训（≥40学时）并通过能力考核（合格率100%）。实验过程中对受试者进行全程监测，详细记录不良事件及依从性数据。数据收集采用双人录入并交叉核验，录入错误率<0.1%。
  </div>
</div>
`,_=`
<div style="background:#fff;width:100%;height:100%;padding:36px 44px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:13px;letter-spacing:0.1em;color:#bbb;text-transform:uppercase;margin-bottom:20px;">METHODS</div>
  <div style="display:flex;flex-direction:column;gap:18px;">
    <div style="display:flex;gap:20px;align-items:flex-start;">
      <div style="font-size:46px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;line-height:1;min-width:72px;">72</div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#1d1d1f;margin-bottom:4px;">受试者 · 随机对照双盲</div>
        <div style="font-size:13px;color:#888;line-height:1.5;">实验组 n=36 vs 对照组 n=36 · 安慰剂控制<br>纳入标准筛选 · SPSS 26.0 统计分析 · α=0.05</div>
      </div>
    </div>
    <div style="border-top:1px solid #f0f0f0;padding-top:18px;display:flex;gap:20px;align-items:flex-start;">
      <div style="font-size:46px;font-weight:700;color:#7EC8E3;font-family:'Inter',sans-serif;line-height:1;min-width:72px;">8<span style="font-size:20px;font-weight:400;color:#aaa;">周</span></div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#1d1d1f;margin-bottom:4px;">认知行为干预方案</div>
        <div style="font-size:13px;color:#888;line-height:1.5;">每周 2 次 × 45 min · 认知训练 + 生物反馈 + 个体化调整<br>干预人员标准化培训 ≥40 学时 · 依从性全程监测</div>
      </div>
    </div>
    <div style="border-top:1px solid #f0f0f0;padding-top:18px;display:flex;gap:20px;align-items:flex-start;">
      <div style="font-size:46px;font-weight:700;color:#95D5B2;font-family:'Inter',sans-serif;line-height:1;min-width:72px;">4<span style="font-size:20px;font-weight:400;color:#aaa;">项</span></div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#1d1d1f;margin-bottom:4px;">核心结局指标</div>
        <div style="font-size:13px;color:#888;line-height:1.5;">主要：MMSE + MoCA（认知功能）<br>次要：GAD-7 + PHQ-9（情绪）· HRV + SC（生理）</div>
      </div>
    </div>
  </div>
  <div style="font-size:12px;color:#ccc;margin-top:18px;">详细方法与质控流程见演讲者备注 · 数据双人录入交叉核验（错误率 &lt;0.1%）</div>
</div>
`,q=`
<div style="background:#fff;width:100%;height:100%;padding:24px 28px;box-sizing:border-box;">
  <div style="font-size:15px;font-weight:bold;text-align:center;color:#333;margin-bottom:10px;">Table 2. Experimental Results (Pre-Post Comparison)</div>
  <table style="width:100%;border-collapse:collapse;font-size:12px;border:2px solid #333;">
    <tr style="background:#4472C4;color:#fff;font-weight:bold;">
      <th style="border:1px solid #333;padding:4px 6px;">Group</th>
      <th style="border:1px solid #333;padding:4px 6px;">Pre</th>
      <th style="border:1px solid #333;padding:4px 6px;">Post</th>
      <th style="border:1px solid #333;padding:4px 6px;">Change</th>
      <th style="border:1px solid #333;padding:4px 6px;">p-value</th>
    </tr>
    <tr><td style="border:1px solid #999;padding:3px 5px;background:#dce6f1;">Exp-A</td><td style="border:1px solid #999;padding:3px 5px;">45.2±8.3</td><td style="border:1px solid #999;padding:3px 5px;">68.7±9.1</td><td style="border:1px solid #999;padding:3px 5px;color:red;font-weight:bold;">+23.5</td><td style="border:1px solid #999;padding:3px 5px;color:red;">&lt;0.001**</td></tr>
    <tr style="background:#f2f2f2;"><td style="border:1px solid #999;padding:3px 5px;background:#dce6f1;">Exp-B</td><td style="border:1px solid #999;padding:3px 5px;">44.8±7.6</td><td style="border:1px solid #999;padding:3px 5px;">61.3±8.4</td><td style="border:1px solid #999;padding:3px 5px;color:red;">+16.5</td><td style="border:1px solid #999;padding:3px 5px;">0.003**</td></tr>
    <tr><td style="border:1px solid #999;padding:3px 5px;background:#dce6f1;">Ctrl-1</td><td style="border:1px solid #999;padding:3px 5px;">45.5±8.1</td><td style="border:1px solid #999;padding:3px 5px;">47.2±8.5</td><td style="border:1px solid #999;padding:3px 5px;">+1.7</td><td style="border:1px solid #999;padding:3px 5px;">0.42</td></tr>
    <tr style="background:#f2f2f2;"><td style="border:1px solid #999;padding:3px 5px;background:#dce6f1;">Ctrl-2</td><td style="border:1px solid #999;padding:3px 5px;">44.1±7.9</td><td style="border:1px solid #999;padding:3px 5px;">45.8±8.2</td><td style="border:1px solid #999;padding:3px 5px;">+1.7</td><td style="border:1px solid #999;padding:3px 5px;">0.38</td></tr>
    <tr><td style="border:1px solid #999;padding:3px 5px;background:#dce6f1;">Sham</td><td style="border:1px solid #999;padding:3px 5px;">45.0±7.7</td><td style="border:1px solid #999;padding:3px 5px;">46.1±8.0</td><td style="border:1px solid #999;padding:3px 5px;">+1.1</td><td style="border:1px solid #999;padding:3px 5px;">0.55</td></tr>
  </table>
  <div style="font-size:11px;color:#666;margin-top:6px;line-height:1.4;">Note: Values are means±SD. Pre=baseline, Post=8-week follow-up. Change=Post-Pre. p-values from independent samples t-tests. *p&lt;0.05, **p&lt;0.01, ***p&lt;0.001. ES=effect size (Cohen's d). Exp=experimental group. Ctrl=control group.</div>
</div>
`,I=`
<div style="background:#fff;width:100%;height:100%;padding:36px 44px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
  <div style="margin-bottom:20px;">
    <div style="font-size:22px;font-weight:700;color:#1d1d1f;line-height:1.3;">实验组 A 改善最显著，提升 <span style="color:#F0B27A;">52%</span></div>
    <div style="font-size:13px;color:#aaa;margin-top:6px;">前后对比得分（均值±SD），8 周干预后</div>
  </div>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr>
      <td style="padding:8px 10px;font-weight:600;color:#aaa;border-bottom:1px solid #eee;font-size:13px;">组别</td>
      <td style="padding:8px 10px;color:#aaa;border-bottom:1px solid #eee;font-size:13px;">前测</td>
      <td style="padding:8px 10px;color:#aaa;border-bottom:1px solid #eee;font-size:13px;">后测</td>
      <td style="padding:8px 10px;color:#aaa;border-bottom:1px solid #eee;font-size:13px;">变化</td>
      <td style="padding:8px 10px;color:#aaa;border-bottom:1px solid #eee;font-size:13px;">p 值</td>
    </tr>
    <tr style="background:rgba(240,178,122,0.08);">
      <td style="padding:8px 10px;font-weight:600;color:#1d1d1f;border-bottom:1px solid #f5f5f5;">实验 A</td>
      <td style="padding:8px 10px;color:#666;border-bottom:1px solid #f5f5f5;">45.2</td>
      <td style="padding:8px 10px;color:#1d1d1f;font-weight:600;border-bottom:1px solid #f5f5f5;">68.7</td>
      <td style="padding:8px 10px;color:#F0B27A;font-weight:700;border-bottom:1px solid #f5f5f5;">+23.5</td>
      <td style="padding:8px 10px;color:#F0B27A;font-weight:600;border-bottom:1px solid #f5f5f5;">&lt;0.001</td>
    </tr>
    <tr>
      <td style="padding:8px 10px;font-weight:600;color:#1d1d1f;border-bottom:1px solid #f5f5f5;">实验 B</td>
      <td style="padding:8px 10px;color:#666;border-bottom:1px solid #f5f5f5;">44.8</td>
      <td style="padding:8px 10px;color:#1d1d1f;border-bottom:1px solid #f5f5f5;">61.3</td>
      <td style="padding:8px 10px;color:#F0B27A;border-bottom:1px solid #f5f5f5;">+16.5</td>
      <td style="padding:8px 10px;color:#666;border-bottom:1px solid #f5f5f5;">0.003</td>
    </tr>
    <tr>
      <td style="padding:8px 10px;color:#bbb;border-bottom:1px solid #f5f5f5;">对照 1</td>
      <td style="padding:8px 10px;color:#ccc;border-bottom:1px solid #f5f5f5;">45.5</td>
      <td style="padding:8px 10px;color:#ccc;border-bottom:1px solid #f5f5f5;">47.2</td>
      <td style="padding:8px 10px;color:#ccc;border-bottom:1px solid #f5f5f5;">+1.7</td>
      <td style="padding:8px 10px;color:#ccc;border-bottom:1px solid #f5f5f5;">0.42</td>
    </tr>
    <tr>
      <td style="padding:8px 10px;color:#bbb;">对照 2</td>
      <td style="padding:8px 10px;color:#ccc;">44.1</td>
      <td style="padding:8px 10px;color:#ccc;">45.8</td>
      <td style="padding:8px 10px;color:#ccc;">+1.7</td>
      <td style="padding:8px 10px;color:#ccc;">0.38</td>
    </tr>
  </table>
  <div style="font-size:12px;color:#ccc;margin-top:14px;">均值（±SD）· 独立样本 t 检验 · n=36/组 · Sham 组省略（p=0.55）</div>
</div>
`,P=`
<div style="background:#fff;width:100%;height:100%;padding:24px 28px;box-sizing:border-box;">
  <div style="font-size:15px;font-weight:bold;color:#333;margin-bottom:6px;text-align:center;">Fig.3 Results of Experiment</div>
  <div style="display:flex;gap:8px;height:calc(100% - 56px);">
    <div style="flex:1;position:relative;border:1px solid #bbb;background:#f8f8f8;">
      <div style="position:absolute;top:4px;left:4px;right:4px;bottom:4px;background:repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(0,0,0,0.06) 24px,rgba(0,0,0,0.06) 25px);">
        <div style="position:absolute;bottom:0;left:14px;right:14px;display:flex;align-items:flex-end;gap:4px;height:85%;perspective:200px;">
          <div style="width:20px;height:35%;background:#4472C4;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:58%;background:#ED7D31;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:25%;background:#A5A5A5;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:42%;background:#FFC000;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:52%;background:#FF0000;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:30%;background:#7030A0;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:38%;background:#00B0F0;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
          <div style="width:20px;height:62%;background:#FF00FF;transform:rotateY(-8deg);border-radius:2px 2px 0 0;"></div>
        </div>
      </div>
      <div style="position:absolute;bottom:4px;left:0;right:0;font-size:10px;color:#666;text-align:center;">T1 T2 T3 T4 T5 T6 T7 T8</div>
      <div style="position:absolute;top:8px;left:4px;font-size:9px;color:#888;writing-mode:vertical-lr;transform:rotate(180deg);">Score (AU)</div>
    </div>
    <div style="width:90px;font-size:11px;color:#444;line-height:1.7;padding:4px;">
      <div>■ <span style="color:#4472C4;">Ctrl-W1</span></div>
      <div>■ <span style="color:#ED7D31;">Exp-W1</span></div>
      <div>■ <span style="color:#A5A5A5;">Sham-W1</span></div>
      <div>■ <span style="color:#FFC000;">Ctrl-W4</span></div>
      <div>■ <span style="color:#FF0000;">Exp-W4</span></div>
      <div>■ <span style="color:#7030A0;">Sham-W4</span></div>
      <div>■ <span style="color:#00B0F0;">Ctrl-W8</span></div>
      <div>■ <span style="color:#FF00FF;">Exp-W8</span></div>
    </div>
  </div>
  <div style="font-size:10px;color:#888;margin-top:4px;text-align:center;">Note: AU = arbitrary units; error bars omitted; n=12/group; *p&lt;0.05</div>
</div>
`,R=`
<div style="background:#fff;width:100%;height:100%;padding:36px 44px;box-sizing:border-box;">
  <div style="font-size:22px;font-weight:700;color:#1d1d1f;margin-bottom:4px;">实验组在第 8 周达到峰值</div>
  <div style="font-size:13px;color:#aaa;margin-bottom:20px;">平均得分（任意单位）· 误差棒=SEM · n=12/组</div>
  <div style="display:flex;gap:24px;height:52%;align-items:flex-end;padding-bottom:8px;border-bottom:1px solid #f0f0f0;">
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;">
      <div style="font-size:12px;color:#bbb;">Week 1</div>
      <div style="display:flex;gap:5px;align-items:flex-end;width:100%;justify-content:center;">
        <div style="width:28px;height:42px;background:#e0e0e0;border-radius:3px 3px 0 0;"></div>
        <div style="width:28px;height:45px;background:#F0B27A;border-radius:3px 3px 0 0;"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;">
      <div style="font-size:12px;color:#bbb;">Week 4</div>
      <div style="display:flex;gap:5px;align-items:flex-end;width:100%;justify-content:center;">
        <div style="width:28px;height:45px;background:#e0e0e0;border-radius:3px 3px 0 0;"></div>
        <div style="width:28px;height:66px;background:#F0B27A;border-radius:3px 3px 0 0;"></div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex:1;">
      <div style="font-size:12px;color:#F0B27A;font-weight:700;">Week 8</div>
      <div style="display:flex;gap:5px;align-items:flex-end;width:100%;justify-content:center;">
        <div style="width:28px;height:48px;background:#e0e0e0;border-radius:3px 3px 0 0;"></div>
        <div style="width:28px;height:93px;background:#F0B27A;border-radius:3px 3px 0 0;position:relative;">
          <div style="position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:11px;color:#F0B27A;font-weight:700;white-space:nowrap;">68.7 ↑</div>
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;justify-content:flex-end;padding-bottom:10px;padding-left:10px;border-left:1px solid #f0f0f0;">
      <div style="display:flex;align-items:center;gap:8px;"><div style="width:14px;height:14px;background:#e0e0e0;border-radius:3px;"></div><div style="font-size:12px;color:#999;">对照组</div></div>
      <div style="display:flex;align-items:center;gap:8px;"><div style="width:14px;height:14px;background:#F0B27A;border-radius:3px;"></div><div style="font-size:12px;color:#666;font-weight:600;">实验组</div></div>
    </div>
  </div>
  <div style="font-size:12px;color:#ccc;margin-top:10px;">p&lt;0.001（W8 组间）· 完整数据与 Sham 组见附录 Slide 22</div>
</div>
`,j=`
<div style="background:#fff;width:100%;height:100%;padding:24px 32px;box-sizing:border-box;">
  <div style="font-size:18px;font-weight:bold;text-align:center;color:#003399;margin-bottom:8px;">Summary &amp; Conclusions</div>
  <div style="width:80%;height:2px;background:#003399;margin:0 auto 10px;"></div>
  <ul style="font-size:12px;color:#333;line-height:1.5;padding-left:20px;margin:0;">
    <li style="margin-bottom:4px;">本研究建立了一套完整的认知干预评估体系，涵盖认知、情感及生理多维度综合评价</li>
    <li style="margin-bottom:4px;">实验组在干预后各指标均<span style="color:#cc0000;font-weight:bold;">显著优于</span>对照组（p&lt;0.001），差异有统计学意义</li>
    <li style="margin-bottom:4px;">效应量分析表明干预效果显著（<span style="font-weight:bold;">Cohen's d = 0.82</span>），临床意义高</li>
    <li style="margin-bottom:4px;">双盲 RCT 设计有效控制了<span style="text-decoration:underline;">安慰剂效应和观察者偏倚</span></li>
    <li style="margin-bottom:4px;">局限性：样本量有限（n=72）、随访较短（8周）、单一地区</li>
    <li style="margin-bottom:4px;">未来：扩大样本（n≥200）、随访延长至12个月、多中心验证</li>
  </ul>
  <div style="text-align:center;margin-top:10px;font-size:26px;color:#003399;font-weight:bold;text-shadow:1px 1px 3px rgba(0,0,200,0.15);">Thank You! 🎉✨🎊</div>
</div>
`,D=`
<div style="background:#1d1d1f;width:100%;height:100%;padding:36px 44px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;">
  <div style="font-size:13px;letter-spacing:0.12em;color:#555;text-transform:uppercase;margin-bottom:24px;">Take-home Messages</div>
  <div style="display:flex;flex-direction:column;gap:18px;margin-bottom:20px;">
    <div style="display:flex;align-items:flex-start;gap:18px;">
      <div style="font-size:34px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:36px;line-height:1;">1</div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#f5f5f7;line-height:1.3;">多维认知干预体系有效</div>
        <div style="font-size:13px;color:#666;margin-top:4px;">覆盖认知+情感+生理 · d=0.82 · p&lt;0.001</div>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:18px;">
      <div style="font-size:34px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:36px;line-height:1;">2</div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#f5f5f7;line-height:1.3;">第 8 周效果达峰</div>
        <div style="font-size:13px;color:#666;margin-top:4px;">实验组显著优于对照 · 需要足够干预时长</div>
      </div>
    </div>
    <div style="display:flex;align-items:flex-start;gap:18px;">
      <div style="font-size:34px;font-weight:700;color:#F0B27A;font-family:'Inter',sans-serif;min-width:36px;line-height:1;">3</div>
      <div>
        <div style="font-size:17px;font-weight:600;color:#f5f5f7;line-height:1.3;">双盲 RCT 设计保证可靠性</div>
        <div style="font-size:13px;color:#666;margin-top:4px;">有效控制安慰剂效应与观察者偏倚</div>
      </div>
    </div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px;display:flex;flex-direction:column;gap:8px;">
    <div style="display:flex;gap:10px;align-items:baseline;">
      <div style="font-size:13px;color:#555;font-weight:600;letter-spacing:0.06em;min-width:80px;">未来方向</div>
      <div style="font-size:13px;color:#666;">扩大样本（n≥200）· 多中心验证 · 随访延长至 12 个月</div>
    </div>
    <div style="display:flex;gap:10px;align-items:baseline;">
      <div style="font-size:13px;color:#555;font-weight:600;letter-spacing:0.06em;min-width:80px;">局限性</div>
      <div style="font-size:13px;color:#666;">n=72 · 单一地区 · 随访 8 周</div>
    </div>
  </div>
  <div style="margin-top:18px;font-size:13px;color:#444;">zhangsan@university.edu · github.com/zhangsan/cog-study</div>
</div>
`;function X(){return`
<style>${A}</style>
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
        <button class="hero-quicknav__item" data-target="#mko-case-cover">封面页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-toc">目录页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-text">文字页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-table">表格页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-chart">图表页</button>
        <button class="hero-quicknav__item" data-target="#mko-case-conclusion">结论页</button>
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

  <!-- ═══ S2 Case 1：封面页 (深色) ═══ -->
  <section class="section-dark" id="mko-case-cover"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 1 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">封面页改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">第一张 slide 决定第一印象——信息要分层，不要堆砌</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">组会汇报</span>
        <span class="mko-scene-tag">答辩封面</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-1"></div>
      <div class="mko-score-bar" id="mko-score-1">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-1"></div></div>
        <span class="mko-score-value" id="mko-score-val-1">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 标题砍到核心关键词——30 字标题提炼成 8 字，修饰词全删</div>
        <div class="mko-takeaway-item">② 信息分三层：标题（最大）&gt; 姓名导师（中）&gt; 学校日期（最小），字号差 2 倍</div>
        <div class="mko-takeaway-item">③ 去掉渐变/水印/装饰线/色带——白底或深色底二选一</div>
      </div>
    </div>
  </section>

  <!-- ═══ S3 Case 2：目录页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-toc"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 2 / 6</p>
      <h2 class="section-title">目录页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">目录不是摆设，是导航——让观众知道"我们在哪"</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">学位答辩</span>
        <span class="mko-scene-tag">项目汇报</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-2"></div>
      <div class="mko-score-bar" id="mko-score-2">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-2"></div></div>
        <span class="mko-score-value" id="mko-score-val-2">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 高亮当前章节，弱化其余——让观众一眼知道讲到哪了</div>
        <div class="mko-takeaway-item">② 用大数字替代圆点，建立视觉锚点，扫一眼就能定位</div>
        <div class="mko-takeaway-item">③ 删掉页码和省略号——观众不需要翻页找内容</div>
      </div>
    </div>
  </section>

  <!-- ═══ S4 Case 3：文字页 (深色) ═══ -->
  <section class="section-dark" id="mko-case-text"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 3 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">文字页改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">PPT 不是论文——观众来听你讲，不是来读的</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">方法介绍</span>
        <span class="mko-scene-tag">项目答辩</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-3"></div>
      <div class="mko-score-bar" id="mko-score-3">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-3"></div></div>
        <span class="mko-score-value" id="mko-score-val-3">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 段落 → 信息块：每块由一个关键数字引导，后跟 1-2 行说明</div>
        <div class="mko-takeaway-item">② 信息量不减，但从"读论文"变成"扫重点"——3 秒抓住要点</div>
        <div class="mko-takeaway-item">③ 统一字色（最多 2 种），删掉随机加粗/彩色/下划线</div>
      </div>
    </div>
  </section>

  <!-- ═══ S5 Case 4：表格页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-table"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 4 / 6</p>
      <h2 class="section-title">表格页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">Excel 粘贴到 PPT 是偷懒，不是效率</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">数据展示</span>
        <span class="mko-scene-tag">学术会议</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-4"></div>
      <div class="mko-score-bar" id="mko-score-4">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-4"></div></div>
        <span class="mko-score-value" id="mko-score-val-4">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 标题写结论而不是编号——"A 组提升 52%"而不是"Table 2"</div>
        <div class="mko-takeaway-item">② 高亮关键行，弱化参考行——让眼睛自动看到最重要的数据</div>
        <div class="mko-takeaway-item">③ 去掉彩色表头和粗边框，用留白和细线分隔——信息不少但不吵</div>
      </div>
    </div>
  </section>

  <!-- ═══ S6 Case 5：图表页 (深色) ═══ -->
  <section class="section-dark" id="mko-case-chart"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow" style="color:var(--text-on-dark-3);">Case 5 / 6</p>
      <h2 class="section-title" style="color:var(--text-on-dark);">图表页改造</h2>
      <p class="section-subtitle" style="color:var(--text-on-dark-2);">Excel 默认配色是设计的噩梦——重绘，不要截图</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">结果展示</span>
        <span class="mko-scene-tag">学位答辩</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-5"></div>
      <div class="mko-score-bar" id="mko-score-5">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-5"></div></div>
        <span class="mko-score-value" id="mko-score-val-5">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 颜色最多 2 种——主数据用强调色，对照用灰色</div>
        <div class="mko-takeaway-item">② 图例标在数据旁——不要让眼睛在图和图例之间来回跳</div>
        <div class="mko-takeaway-item">③ 标题即结论——观众读标题就知道你的发现是什么</div>
      </div>
    </div>
  </section>

  <!-- ═══ S7 Case 6：结论页 (浅色) ═══ -->
  <section class="section-light" id="mko-case-conclusion"
    style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-lg);">
      <p class="section-eyebrow">Case 6 / 6</p>
      <h2 class="section-title">结论页改造</h2>
      <p class="section-subtitle" style="max-width:540px;margin:0 auto;">最后一张 slide 是最后一次机会——别浪费在 Thank You 上</p>
    </div>
    <div class="mko-case-wrap">
      <div class="mko-case-meta">
        <span class="mko-scene-tag">总结陈词</span>
        <span class="mko-scene-tag">学术会议</span>
      </div>
      <div class="mko-ba-container" id="mko-ba-6"></div>
      <div class="mko-score-bar" id="mko-score-6">
        <span class="mko-score-label">改造评分</span>
        <div class="mko-score-track"><div class="mko-score-fill" id="mko-score-fill-6"></div></div>
        <span class="mko-score-value" id="mko-score-val-6">50</span>
      </div>
      <div class="mko-takeaway">
        <div class="mko-takeaway-item">① 6 条砍成 3 条——工作记忆上限 3-4 条，超过全忘</div>
        <div class="mko-takeaway-item">② 每条分两层：主结论（粗体）+ 佐证数据（小字灰色），信息不丢但有主次</div>
        <div class="mko-takeaway-item">③ 结尾是行动号召（邮箱/链接），不是 Thank You 和 emoji</div>
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

</div>`}function $(){M(),W(),Y(),H(),N()}function M(){const e=document.querySelector(".mko-hero .hero-eyebrow"),i=document.querySelector(".mko-hero .page-hero-title"),t=document.querySelector(".mko-hero .page-hero-sub"),s=document.querySelector(".mko-hero-tagline"),r=document.getElementById("mko-quicknav"),a=document.querySelector(".mko-scroll-hint"),o=z.timeline({delay:.2});o.fromTo(e,{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),o.fromTo(i,{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),o.fromTo(t,{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),o.fromTo(s,{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),o.fromTo(r,{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),o.fromTo(a,{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75)}function W(){const e=document.getElementById("mko-quicknav");e&&e.querySelectorAll(".hero-quicknav__item").forEach(i=>{n(i,"click",()=>{const t=document.querySelector(i.dataset.target);t&&t.scrollIntoView({behavior:"smooth"})})})}function Y(){const e=[{before:25,after:90},{before:30,after:85},{before:15,after:88},{before:20,after:85},{before:22,after:87},{before:18,after:92}];[{id:"mko-ba-1",before:E,after:F},{id:"mko-ba-2",before:C,after:B},{id:"mko-ba-3",before:T,after:_},{id:"mko-ba-4",before:q,after:I},{id:"mko-ba-5",before:P,after:R},{id:"mko-ba-6",before:j,after:D}].forEach(({id:t,before:s,after:r},a)=>{const o=document.getElementById(t);if(!o)return;const l=S(o,{beforeContent:`<div class="mko-slide mko-slide-before">${s}</div>`,afterContent:`<div class="mko-slide mko-slide-after">${r}</div>`,beforeLabel:"改造前",afterLabel:"改造后",initialPosition:50});l&&v.push(l);const f=document.getElementById(`mko-score-fill-${a+1}`),m=document.getElementById(`mko-score-val-${a+1}`);if(f&&m){const p=o.querySelector(".before-after");if(p){const c=()=>{const g=p.querySelector(".before-after__handle");if(!g)return;const k=parseFloat(g.style.left)||50,{before:b,after:u}=e[a],y=Math.round(b+(u-b)*(1-k/100));f.style.width=y+"%",m.textContent=y};n(p,"pointermove",c),n(p,"click",()=>requestAnimationFrame(c)),c()}}})}function H(){d(".mko-principle-card",{stagger:.12,y:30,duration:.6}),["mko-case-cover","mko-case-toc","mko-case-text","mko-case-table","mko-case-chart","mko-case-conclusion"].forEach(i=>{const t=document.getElementById(i);if(!t)return;const s=t.querySelector(".section-header"),r=t.querySelector(".mko-ba-container"),a=t.querySelector(".mko-takeaway");if(s&&d(s,{y:40,duration:.8}),r&&d(r,{y:40,duration:.7,start:"top 80%"}),a){const l=a.querySelectorAll(".mko-takeaway-item");l.length?d(l,{stagger:.12,y:15,duration:.5,start:"top 90%"}):d(a,{y:20,duration:.6,start:"top 90%"})}const o=t.querySelector(".mko-score-bar");o&&d(o,{y:15,duration:.5,start:"top 88%"})}),d(".page-footer-quote",{y:40,duration:.9}),d(".page-footer-cta .page-footer-nav",{y:25,duration:.6})}function N(){const e=document.getElementById("mko-prev-btn"),i=document.getElementById("mko-next-btn");e&&n(e,"click",()=>h("m4-p2")),i&&n(i,"click",()=>h("m4-p4"))}function L(){x.forEach(({el:e,type:i,fn:t,opts:s})=>e.removeEventListener(i,t,s)),x=[],v.forEach(e=>e.destroy()),v=[],w()}export{L as destroy,$ as init,X as render};
