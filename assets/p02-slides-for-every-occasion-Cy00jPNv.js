import{k as w,g as p,f as i}from"./ScrollAnimations-B5Kyk-Xq.js";import{n as m}from"./index-BY6Mz6oK.js";import{c as u}from"./TabSwitcher-B5dsPqHB.js";let x=[],g=[];function c(e,t,l,o){e&&(e.addEventListener(t,l,o),x.push({el:e,type:t,fn:l,opts:o}))}const k=`
/* ── Hero 光晕 ── */
.seo-hero { position: relative; overflow: hidden; }
.seo-hero::before,
.seo-hero::after { content:''; position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
.seo-hero::before { width:55%; height:45%; top:20%; left:8%; background:rgba(240,178,122,0.13); animation:seo-drift-a 13s ease-in-out infinite alternate; }
.seo-hero::after  { width:50%; height:40%; top:35%; right:5%;  background:rgba(126,200,227,0.08); animation:seo-drift-b 9s ease-in-out infinite alternate-reverse; }
@keyframes seo-drift-a { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-20px)} }
@keyframes seo-drift-b { 0%{transform:translate(0,0)} 100%{transform:translate(-25px,15px)} }

/* ── 滚动提示 ── */
.seo-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:seo-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes seo-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 所有 section scroll-margin ── */
#seo-overview, #seo-lab-meeting, #seo-conference, #seo-project, #seo-thesis, #seo-toolbox {
  scroll-margin-top: 56px;
}

/* ══ S1 场景卡片 ══ */
.seo-cards-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  max-width: 960px;
  margin: 0 auto;
}
.seo-card {
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 220px;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 0 0 20px 0;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s;
  position: relative;
}
.seo-card::before {
  content: '';
  display: block;
  height: 4px;
  background: var(--module-4);
  border-radius: 4px 4px 0 0;
}
.seo-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.seo-card-body { padding: 20px 20px 0; }
.seo-card-icon { font-size: 32px; line-height: 1; margin-bottom: 12px; }
.seo-card-name { font-size: 16px; font-weight: 700; color: var(--text-on-light); margin-bottom: 6px; font-family: var(--font-heading); }
.seo-card-desc { font-size: 13px; color: var(--text-on-light-2); margin-bottom: 14px; line-height: 1.6; }
.seo-card-meta { display: flex; flex-direction: column; gap: 6px; }
.seo-card-meta-item { display: flex; align-items: baseline; gap: 6px; font-size: 12px; }
.seo-card-meta-label { color: var(--text-on-light-3); white-space: nowrap; }
.seo-card-meta-value { color: var(--text-on-light-2); font-weight: 500; }
.seo-stars { display: flex; gap: 2px; margin-top: 2px; }
.seo-star { color: var(--module-4); font-size: 14px; }
.seo-star-empty { color: rgba(0,0,0,0.15); font-size: 14px; }

/* ══ S2 组会汇报 ══ */
.seo-profile-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.seo-profile-item { display: flex; gap: 12px; align-items: flex-start; }
.seo-profile-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--module-4); white-space: nowrap; padding-top: 2px; min-width: 70px; }
.seo-profile-text { font-size: 15px; color: var(--text-on-dark-2); line-height: 1.7; }

.seo-struct-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.seo-struct-item { border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.03); }
.seo-struct-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px; cursor: pointer; user-select: none;
  min-height: 44px;
  transition: background 0.2s;
}
.seo-struct-header:hover { background: rgba(255,255,255,0.04); }
.seo-struct-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--module-4); color: #1d1d1f;
  font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.seo-struct-title { font-size: 15px; color: var(--text-on-dark); font-weight: 600; flex: 1; }
.seo-struct-arrow { font-size: 12px; color: var(--text-on-dark-3); transition: transform 0.3s; }
.seo-struct-item.open .seo-struct-arrow { transform: rotate(180deg); }
.seo-struct-body { overflow: hidden; max-height: 0; transition: max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
.seo-struct-body-inner { padding: 0 16px 14px 56px; font-size: 14px; color: var(--text-on-dark-2); line-height: 1.7; }

.seo-dodo { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: var(--space-md); }
.seo-do, .seo-dont { border-radius: 12px; padding: 20px; }
.seo-do { background: rgba(149,213,178,0.08); border: 1px solid rgba(149,213,178,0.2); }
.seo-dont { background: rgba(255,100,100,0.06); border: 1px solid rgba(255,100,100,0.15); }
.seo-dodo-head { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
.seo-do .seo-dodo-head { color: #95D5B2; }
.seo-dont .seo-dodo-head { color: #ff7070; }
.seo-dodo-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
.seo-dodo-list li { font-size: 14px; color: var(--text-on-dark-2); line-height: 1.6; display: flex; gap: 8px; align-items: flex-start; }
.seo-dodo-list li::before { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.seo-do .seo-dodo-list li::before { content: '✓'; color: #95D5B2; }
.seo-dont .seo-dodo-list li::before { content: '✗'; color: #ff7070; }

/* ══ S3 学术会议 ══ */
.seo-conf-profile { max-width: 680px; margin: 0 auto var(--space-xl); }
.seo-time-bar { display: flex; border-radius: 8px; overflow: hidden; height: 48px; margin: var(--space-md) 0; }
.seo-time-seg { display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #fff; padding: 4px 8px; text-align: center; line-height: 1.3; min-width: 0; }
.seo-principles-row { display: flex; gap: 16px; flex-wrap: wrap; margin-top: var(--space-md); }
.seo-principle-card { flex: 1 1 160px; background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; padding: 16px; }
.section-dark .seo-principle-card { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.08); }
.seo-principle-icon { font-size: 24px; margin-bottom: 8px; }
.seo-principle-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; color: var(--text-on-light); }
.section-dark .seo-principle-title { color: var(--text-on-dark); }
.seo-principle-desc { font-size: 13px; color: var(--text-on-light-2); line-height: 1.6; }
.section-dark .seo-principle-desc { color: var(--text-on-dark-2); }
.seo-tab-panel { padding: var(--space-lg) 0; }

/* ══ S4 项目答辩 ══ */
.seo-proj-cols { display: flex; gap: 20px; margin: var(--space-xl) 0; }
.seo-proj-col { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; }
.seo-proj-col-title { font-size: 16px; font-weight: 700; color: var(--module-4); margin-bottom: 16px; }
.seo-proj-col ol { list-style: none; padding: 0; margin: 0; counter-reset: proj-item; }
.seo-proj-col ol li { counter-increment: proj-item; display: flex; gap: 10px; align-items: flex-start; margin-bottom: 10px; font-size: 14px; color: var(--text-on-dark-2); line-height: 1.6; }
.seo-proj-col ol li::before { content: counter(proj-item); width: 22px; height: 22px; border-radius: 50%; background: rgba(240,178,122,0.2); color: var(--module-4); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }

.seo-align-table { width: 100%; border-collapse: collapse; font-size: 14px; margin-top: var(--space-md); }
.seo-align-table th { padding: 10px 14px; text-align: left; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-on-dark-3); border-bottom: 1px solid rgba(255,255,255,0.1); }
.seo-align-table td { padding: 10px 14px; color: var(--text-on-dark-2); border-bottom: 1px solid rgba(255,255,255,0.06); vertical-align: top; }
.seo-align-table tr:nth-child(odd) td { background: rgba(255,255,255,0.02); }
.seo-align-check { color: #95D5B2; font-weight: 700; }

/* ══ S5 学位答辩 ══ */
.seo-thesis-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.seo-thesis-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; color: var(--text-on-light-2); line-height: 1.6; }
.seo-thesis-num { width: 26px; height: 26px; border-radius: 50%; background: rgba(240,178,122,0.15); color: var(--module-4); font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
.seo-thesis-highlight { background: rgba(240,178,122,0.1); border-radius: 6px; padding: 2px 6px; font-size: 12px; color: var(--module-4); font-weight: 600; margin-left: 6px; }

.seo-survival-list { display: flex; flex-direction: column; gap: 8px; margin-top: var(--space-lg); }
.seo-survival-item { border: 1px solid rgba(0,0,0,0.07); border-radius: 12px; overflow: hidden; background: #fff; }
.seo-survival-header { display: flex; align-items: center; gap: 12px; padding: 16px 18px; cursor: pointer; min-height: 44px; user-select: none; transition: background 0.2s; }
.seo-survival-header:hover { background: rgba(240,178,122,0.04); }
.seo-survival-icon { font-size: 20px; flex-shrink: 0; }
.seo-survival-title { font-size: 15px; font-weight: 700; color: var(--text-on-light); flex: 1; }
.seo-survival-arrow { font-size: 12px; color: var(--text-on-light-3); transition: transform 0.3s; }
.seo-survival-item.open .seo-survival-arrow { transform: rotate(180deg); }
.seo-survival-body { overflow: hidden; max-height: 0; transition: max-height 0.35s cubic-bezier(0.25,0.46,0.45,0.94); }
.seo-survival-body-inner { padding: 0 18px 16px 50px; font-size: 14px; color: var(--text-on-light-2); line-height: 1.8; }
.seo-survival-body-inner ul { list-style: disc inside; padding: 0; margin: 0; }
.seo-survival-body-inner ul li { margin-bottom: 6px; }

/* ══ S6 工具箱 ══ */
.seo-tip-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: var(--space-xl); max-width: 900px; margin-left: auto; margin-right: auto; }
.seo-tip-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; }
.seo-tip-num { width: 36px; height: 36px; border-radius: 50%; background: var(--module-4); color: #1d1d1f; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.seo-tip-title { font-size: 16px; font-weight: 700; color: var(--text-on-dark); margin-bottom: 8px; }
.seo-tip-desc { font-size: 14px; color: var(--text-on-dark-2); line-height: 1.7; }

/* ══ 通用 section 样式 ══ */
.seo-section-wrap { max-width: var(--w-content, 900px); margin: 0 auto; padding: 0 var(--space-lg); }
.seo-subsection-label {
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
  color: var(--module-4); margin-bottom: var(--space-sm);
}

/* ══ 移动端 ══ */
@media (max-width: 768px) {
  .seo-cards-row { gap: 12px; }
  .seo-card { flex: 1 1 calc(50% - 8px); min-width: calc(50% - 8px); max-width: none; }

  .seo-dodo { grid-template-columns: 1fr; }

  .seo-proj-cols { flex-direction: column; }

  .seo-tip-grid { grid-template-columns: 1fr; }

  .seo-time-bar { height: auto; flex-wrap: wrap; }
  .seo-time-seg { flex: 1 1 auto; min-width: 60px; }

  .seo-section-wrap { padding: 0 var(--space-md); }
}

@media (max-width: 480px) {
  .seo-card { flex: 1 1 100%; max-width: none; }
}
`,S=[{target:"#seo-lab-meeting",icon:"💬",name:"组会汇报",desc:"日常进度沟通",duration:"10–20 min",audience:"导师 + 同组",formality:1},{target:"#seo-conference",icon:"🎤",name:"学术会议报告",desc:"向同行展示成果",duration:"15–20 min",audience:"同行专家",formality:3},{target:"#seo-project",icon:"📁",name:"项目答辩",desc:"说服评委通过",duration:"20–30 min",audience:"评审专家",formality:2},{target:"#seo-thesis",icon:"🎓",name:"学位答辩",desc:"证明系统研究能力",duration:"30–45 min",audience:"答辩委员会",formality:3}],$=[{title:"本周目标",tip:"开门见山列出本周计划完成的 1-2 件事，帮助导师快速进入状态。"},{title:"完成进展",tip:'用要点列表，只写"做了什么 + 结果是什么"，不写过程细节。'},{title:"关键数据 / 结果",tip:"一张图或一个表，核心发现用颜色或加粗高亮，不放多个图。"},{title:"遇到的问题",tip:"把问题写清楚：背景→尝试的方案→为什么还没解决。有利于获得有效帮助。"},{title:"下周计划",tip:'具体可执行的 2-3 条，避免模糊表述如"继续推进实验"。'},{title:"需要帮助的点",tip:"明确写出需要导师或同组提供的资源、建议或决策，让讨论有焦点。"}],f=[{id:"15min",label:"15分钟口头报告",segs:[{label:"引言",slides:"2张",pct:14,color:"#4A90D9"},{label:"方法",slides:"3张",pct:20,color:"#5BA39C"},{label:"结果",slides:"6张",pct:40,color:"#E08A4A"},{label:"讨论",slides:"2张",pct:13,color:"#8B7EC8"},{label:"结论",slides:"2张",pct:13,color:"#95D5B2"}],principles:[{icon:"🎯",title:"Hook 开场",desc:"前30秒用一句话或一个数字抓住眼球"},{icon:"📊",title:"一图一事",desc:"每张数据图只传达一个核心发现"},{icon:"💡",title:"Take-home",desc:"结尾用一句话总结，让人记住你的贡献"}]},{id:"5min",label:"5分钟快速报告",segs:[{label:"背景",slides:"1张",pct:15,color:"#4A90D9"},{label:"问题",slides:"1张",pct:15,color:"#5BA39C"},{label:"核心结果",slides:"2张",pct:40,color:"#E08A4A"},{label:"意义",slides:"1张",pct:15,color:"#95D5B2"},{label:"结论",slides:"1张",pct:15,color:"#8B7EC8"}],principles:[{icon:"⏱",title:"严守时间",desc:"5分钟只讲1个核心发现，宁少勿多"},{icon:"🗣",title:"直接入题",desc:"不做自我介绍，第一句话就是你的问题"},{icon:"📌",title:"一句话结论",desc:"观众会只记住一件事，让那件事是你选的"}]},{id:"10min",label:"10分钟 Poster Talk",segs:[{label:"背景",slides:"1张",pct:12,color:"#4A90D9"},{label:"方法",slides:"2张",pct:22,color:"#5BA39C"},{label:"结果",slides:"4张",pct:44,color:"#E08A4A"},{label:"结论",slides:"2张",pct:22,color:"#95D5B2"}],principles:[{icon:"👁",title:"引导视线",desc:"用激光笔或手势引导观众看海报的关键区域"},{icon:"🤝",title:"对话感",desc:'问"有什么问题吗"，Poster Talk要比讲台更互动'},{icon:"📋",title:"补充材料",desc:"准备二维码或名片，方便感兴趣的人后续联系"}]}],z=["研究背景与问题（突出空白）","研究目标与创新点","研究方案与可行性","预期成果与时间节点","团队支撑与资源保障"],T=["研究背景与任务书回顾","主要研究内容完成情况","核心成果（论文/专利/软著）","量化指标对照（对齐任务书）","结题总结与后续展望"],j=[{text:"封面",note:"题目、姓名、导师、答辩日期"},{text:"目录",note:"研究框架导航，让评委一眼看全局"},{text:"研究背景与文献综述",note:"3–4张"},{text:"研究问题与假设",note:"1–2张"},{text:"研究方法",note:"2–3张"},{text:"实验与分析结果",note:"5–8张 ← 重点",highlight:!0},{text:"讨论与意义",note:"2–3张"},{text:"结论与展望",note:"1–2张"},{text:"致谢",note:"1张"},{text:"备用 slides",note:"3–5张，预判提问准备",highlight:!0}],P=[{text:"封面",note:"题目、姓名、导师、学位类型、答辩日期"},{text:"目录",note:"整体框架，突出各章研究问题"},{text:"研究背景与文献综述",note:"5–7张，系统梳理领域现状"},{text:"研究问题与假设",note:"2–3张，明确界定研究边界"},{text:"研究方法与设计",note:"4–6张，严谨论证方法选择"},{text:"实验与分析结果",note:"10–15张 ← 核心",highlight:!0},{text:"讨论：理论贡献",note:"3–5张 ← 博士必须明确创新点",highlight:!0},{text:"结论与展望",note:"2–3张"},{text:"致谢",note:"1张"},{text:"备用 slides",note:"5–10张，充分准备答委提问",highlight:!0}],E=[{icon:"⏱",title:"时间管理",content:`<ul>
      <li>正式答辩前至少练习 3 遍全流程，掐表计时</li>
      <li>每张 slide 平均不超过 1.5 分钟</li>
      <li>留 5 分钟 buffer，不要把时间填满</li>
      <li>制作计时参考卡：第 5 分钟应讲到第 X 张 slide</li>
    </ul>`},{icon:"🎯",title:"回答问题策略",content:`<ul>
      <li>先重复问题，确认理解正确后再回答</li>
      <li>承认不知道比胡编好——"这是个好问题，我需要进一步研究"</li>
      <li>准备 5–8 张备用 slides，专门对应常见提问方向</li>
      <li>对于超出研究范围的问题，可以说明局限性并展望未来</li>
    </ul>`},{icon:"🚨",title:"常见翻车场景",content:`<ul>
      <li>设备故障：U盘+网盘+PDF 三重备份，提前测试投影接口</li>
      <li>紧张念稿：在备注里写关键词而非全文，不要逐字念</li>
      <li>激光笔 vs 动画指示：避免激光笔抖动，用动画或手势替代</li>
      <li>时间超出：提前准备"如果时间不够"的删减版本（跳过哪几张）</li>
    </ul>`}],q=[{title:"2-3-1 法则",desc:"每张 slide：2 种字号 + 3 种颜色以内 + 1 个视觉焦点。超过就删。"},{title:"备份策略",desc:"U 盘 + 网盘 + PDF 三重保险。到达会场第一件事：测试投影 + 打开备份文件。"},{title:"母版模板",desc:"在 PPT 母版视图设好字体、颜色、占位符——修改一处，全套同步，节省 80% 时间。"},{title:"演讲者视图",desc:"演讲者视图里写备注（可以是逐字稿），投影给观众只看 slide，自己看提示。"},{title:"版本命名",desc:'告别"终_终终_最终版.pptx"，改用 YYYY-MM-DD_场景_v01 格式，一眼知道哪个是最新版。'},{title:"字体嵌入",desc:"换电脑变形是噩梦。解决方案：嵌入字体（另存为选项中勾选），或最终版导出 PDF。"}];function _(e,t=3){let l="";for(let o=0;o<t;o++)l+=o<e?'<span class="seo-star">★</span>':'<span class="seo-star-empty">☆</span>';return`<div class="seo-stars">${l}</div>`}function A(){return S.map(e=>`
    <div class="seo-card" data-target="${e.target}" tabindex="0" role="button" aria-label="跳转到${e.name}">
      <div class="seo-card-body">
        <div class="seo-card-icon">${e.icon}</div>
        <div class="seo-card-name">${e.name}</div>
        <div class="seo-card-desc">${e.desc}</div>
        <div class="seo-card-meta">
          <div class="seo-card-meta-item">
            <span class="seo-card-meta-label">时长</span>
            <span class="seo-card-meta-value">${e.duration}</span>
          </div>
          <div class="seo-card-meta-item">
            <span class="seo-card-meta-label">受众</span>
            <span class="seo-card-meta-value">${e.audience}</span>
          </div>
          <div class="seo-card-meta-item">
            <span class="seo-card-meta-label">正式度</span>
            ${_(e.formality)}
          </div>
        </div>
      </div>
    </div>
  `).join("")}function D(){return $.map((e,t)=>`
    <li class="seo-struct-item" data-idx="${t}">
      <div class="seo-struct-header">
        <div class="seo-struct-num">${t+1}</div>
        <div class="seo-struct-title">${e.title}</div>
        <span class="seo-struct-arrow">▼</span>
      </div>
      <div class="seo-struct-body">
        <div class="seo-struct-body-inner">${e.tip}</div>
      </div>
    </li>
  `).join("")}function B(e){const t=e.segs.map(o=>`<div class="seo-time-seg" style="flex:${o.pct};background:${o.color};" title="${o.label} ${o.slides}">
      <span style="white-space:pre-wrap;word-break:keep-all;">${o.label}<br>${o.slides}</span>
    </div>`).join(""),l=e.principles.map(o=>`
    <div class="seo-principle-card">
      <div class="seo-principle-icon">${o.icon}</div>
      <div class="seo-principle-title">${o.title}</div>
      <div class="seo-principle-desc">${o.desc}</div>
    </div>
  `).join("");return`
    <div class="seo-tab-panel">
      <p class="seo-subsection-label">时间分配</p>
      <div class="seo-time-bar">${t}</div>
      <p class="seo-subsection-label" style="margin-top:var(--space-lg);">核心原则</p>
      <div class="seo-principles-row">${l}</div>
    </div>
  `}function I(e){return e.map((t,l)=>`
    <li>
      <div class="seo-thesis-num">${l+1}</div>
      <span>${t.text}${t.note?`<span style="font-size:13px;color:var(--text-on-light-3);margin-left:8px;">${t.note}</span>`:""}${t.highlight?'<span class="seo-thesis-highlight">重点</span>':""}</span>
    </li>
  `).join("")}function H(){return E.map((e,t)=>`
    <div class="seo-survival-item" data-idx="${t}">
      <div class="seo-survival-header">
        <span class="seo-survival-icon">${e.icon}</span>
        <span class="seo-survival-title">${e.title}</span>
        <span class="seo-survival-arrow">▼</span>
      </div>
      <div class="seo-survival-body">
        <div class="seo-survival-body-inner">${e.content}</div>
      </div>
    </div>
  `).join("")}function O(){return q.map((e,t)=>`
    <div class="seo-tip-card">
      <div class="seo-tip-num">${t+1}</div>
      <div class="seo-tip-title">${e.title}</div>
      <div class="seo-tip-desc">${e.desc}</div>
    </div>
  `).join("")}function M(){return`
<style>${k}</style>
<div class="page-scroll">

  <!-- ═══ Hero ═══ -->
  <section class="section-dark section-hero-full seo-hero" id="seo-hero">
    <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
      <p class="hero-eyebrow" style="opacity:0;">Module 04 / Page 02</p>
      <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">学术演示全场景</h1>
      <p class="page-hero-sub" style="opacity:0;">Slides for Every Occasion</p>
      <p class="seo-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">组会、会议、答辩、结题——每种场景都有最优策略</p>
      <nav class="hero-quicknav" id="seo-quicknav" style="opacity:0;">
        <button class="hero-quicknav__item" data-target="#seo-overview">场景总览</button>
        <button class="hero-quicknav__item" data-target="#seo-lab-meeting">组会</button>
        <button class="hero-quicknav__item" data-target="#seo-conference">会议报告</button>
        <button class="hero-quicknav__item" data-target="#seo-project">项目答辩</button>
        <button class="hero-quicknav__item" data-target="#seo-thesis">学位答辩</button>
        <button class="hero-quicknav__item" data-target="#seo-toolbox">工具箱</button>
      </nav>
      <div class="seo-scroll-hint" style="opacity:0;">↓ 向下探索</div>
    </div>
  </section>

  <!-- ═══ S1 场景总览 (浅色) ═══ -->
  <section class="section-light" id="seo-overview" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;display:flex;flex-direction:column;justify-content:center;">
    <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
      <p class="section-eyebrow">01 / 06</p>
      <h2 class="section-title">场景决定一切</h2>
      <p class="section-subtitle" style="max-width:600px;margin:0 auto;">同样是 PPT，组会和学位答辩的设计策略截然不同。先确认场景，再决定策略。</p>
    </div>
    <div class="seo-cards-row" id="seo-scenario-cards">
      ${A()}
    </div>
  </section>

  <!-- ═══ S2 组会汇报 (深色) ═══ -->
  <section class="section-dark" id="seo-lab-meeting" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
    <div class="seo-section-wrap">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">02 / 06</p>
        <h2 class="section-title" style="color:var(--text-on-dark);">组会汇报</h2>
        <p class="section-subtitle" style="max-width:560px;margin:0 auto;color:var(--text-on-dark-2);">非正式、高频、进度导向——组会 PPT 越简洁越好</p>
      </div>

      <!-- A. 场景画像 -->
      <div id="seo-lab-profile" style="margin-bottom:var(--space-xl);">
        <p class="seo-subsection-label">场景画像</p>
        <ul class="seo-profile-list">
          <li class="seo-profile-item"><span class="seo-profile-label">特点</span><span class="seo-profile-text">非正式、高频、进度导向</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">受众</span><span class="seo-profile-text">导师和同实验室成员，已有研究背景知识</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">目标</span><span class="seo-profile-text">快速同步进度 + 寻求反馈 + 暴露问题</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">常见坑</span><span class="seo-profile-text">准备过度（30+ 张 PPT 讲进度）/ 信息太散 / 没有明确提问</span></li>
        </ul>
      </div>

      <!-- B. 推荐结构 -->
      <div id="seo-lab-struct" style="margin-bottom:var(--space-xl);">
        <p class="seo-subsection-label">推荐结构（6 页以内）</p>
        <ul class="seo-struct-list" id="seo-struct-list">
          ${D()}
        </ul>
      </div>

      <!-- C. DO/DON'T -->
      <div id="seo-lab-dodo">
        <p class="seo-subsection-label">DO / DON'T</p>
        <div class="seo-dodo">
          <div class="seo-do">
            <div class="seo-dodo-head">✓ DO</div>
            <ul class="seo-dodo-list">
              <li>突出本周关键发现</li>
              <li>把问题写清楚（背景 + 已尝试方案）</li>
              <li>准备具体的讨论问题</li>
            </ul>
          </div>
          <div class="seo-dont">
            <div class="seo-dodo-head">✗ DON'T</div>
            <ul class="seo-dodo-list">
              <li>堆砌所有实验细节</li>
              <li>用学术会议级别的正式排版</li>
              <li>PPT 超过 10 页</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ S3 学术会议 (浅色) ═══ -->
  <section class="section-light" id="seo-conference" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
    <div class="seo-section-wrap">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">03 / 06</p>
        <h2 class="section-title">学术会议报告</h2>
        <p class="section-subtitle" style="max-width:560px;margin:0 auto;">正式、一次性、成果展示——让人记住你的核心发现</p>
      </div>

      <div class="seo-conf-profile">
        <ul class="seo-profile-list" style="background:rgba(0,0,0,0.02);border-radius:12px;padding:20px;">
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">特点</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">正式、一次性、成果展示</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">受众</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">不了解你具体研究的同行专家</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">目标</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">让人记住核心发现 + 激发交流兴趣</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">常见坑</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">背景铺垫太长 / 数据太密 / 没有 take-home message</span></li>
        </ul>
      </div>

      <p class="seo-subsection-label" style="text-align:center;">选择你的场景</p>
      <div id="seo-conf-tabs-mount"></div>
      <div id="seo-conf-panel"></div>
    </div>
  </section>

  <!-- ═══ S4 项目答辩与结题 (深色) ═══ -->
  <section class="section-dark" id="seo-project" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
    <div class="seo-section-wrap">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">04 / 06</p>
        <h2 class="section-title" style="color:var(--text-on-dark);">项目答辩与结题</h2>
        <p class="section-subtitle" style="max-width:560px;margin:0 auto;color:var(--text-on-dark-2);">说服性质、强调成果和价值——对齐评审关注点</p>
      </div>

      <div id="seo-proj-profile" style="margin-bottom:var(--space-lg);">
        <ul class="seo-profile-list">
          <li class="seo-profile-item"><span class="seo-profile-label">特点</span><span class="seo-profile-text">说服性质、强调成果和价值</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">受众</span><span class="seo-profile-text">不一定懂技术细节的评审专家（尤其基金评审）</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">目标</span><span class="seo-profile-text">证明钱花得值 / 研究有价值 / 达到预期目标</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label">常见坑</span><span class="seo-profile-text">自嗨式技术展示 / 没有对照任务书 / 成果展示碎片化</span></li>
        </ul>
      </div>

      <div class="seo-proj-cols" id="seo-proj-cols">
        <div class="seo-proj-col">
          <div class="seo-proj-col-title">📋 项目答辩（立项）</div>
          <ol>
            ${z.map(e=>`<li>${e}</li>`).join("")}
          </ol>
        </div>
        <div class="seo-proj-col">
          <div class="seo-proj-col-title">✅ 结题报告</div>
          <ol>
            ${T.map(e=>`<li>${e}</li>`).join("")}
          </ol>
        </div>
      </div>

      <div id="seo-align-strategy" style="margin-top:var(--space-xl);">
        <p class="seo-subsection-label">对齐任务书策略（结题专属）</p>
        <div style="overflow-x:auto;border-radius:12px;border:1px solid rgba(255,255,255,0.1);">
          <table class="seo-align-table">
            <thead>
              <tr>
                <th>任务书指标</th>
                <th>完成情况</th>
                <th>佐证材料</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>发表 SCI 论文 ≥ 2 篇</td>
                <td><span class="seo-align-check">✓</span> 发表 3 篇（IF &gt; 5.0）</td>
                <td>论文 DOI / 接收函</td>
              </tr>
              <tr>
                <td>申请发明专利 ≥ 1 项</td>
                <td><span class="seo-align-check">✓</span> 申请 2 项，已授权 1 项</td>
                <td>专利证书 / 申请受理通知</td>
              </tr>
              <tr>
                <td>培养研究生 ≥ 1 名</td>
                <td><span class="seo-align-check">✓</span> 培养硕士生 2 名</td>
                <td>学籍信息 / 毕业证书</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ S5 学位答辩 (浅色) ═══ -->
  <section class="section-light" id="seo-thesis" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
    <div class="seo-section-wrap">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">05 / 06</p>
        <h2 class="section-title">学位答辩</h2>
        <p class="section-subtitle" style="max-width:560px;margin:0 auto;">最正式、最长、最系统——证明你的系统性研究能力</p>
      </div>

      <div style="background:rgba(0,0,0,0.02);border-radius:12px;padding:20px;margin-bottom:var(--space-xl);">
        <ul class="seo-profile-list">
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">特点</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">最正式、最长、最系统化</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">受众</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">答辩委员会（领域专家，但不一定了解你的具体课题）</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">目标</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">证明系统性研究能力 + 获得学位</span></li>
          <li class="seo-profile-item"><span class="seo-profile-label" style="color:var(--module-4);">常见坑</span><span class="seo-profile-text" style="color:var(--text-on-light-2);">PPT 太多（60+ 页）/ 念 PPT / 时间管理失控 / 不会回答问题</span></li>
        </ul>
      </div>

      <p class="seo-subsection-label" style="text-align:center;margin-bottom:var(--space-md);">选择答辩类型</p>
      <div id="seo-thesis-tabs-mount"></div>
      <div id="seo-thesis-panel" style="margin-top:var(--space-lg);max-width:640px;margin-left:auto;margin-right:auto;"></div>

      <div style="margin-top:var(--space-3xl);">
        <div style="text-align:center;margin-bottom:var(--space-lg);">
          <p class="seo-subsection-label">答辩生存指南</p>
        </div>
        <div class="seo-survival-list" id="seo-survival-list" style="max-width:640px;margin:0 auto;">
          ${H()}
        </div>
      </div>
    </div>
  </section>

  <!-- ═══ S6 工具箱 (深色) ═══ -->
  <section class="section-dark" id="seo-toolbox" style="padding:var(--space-3xl) var(--space-lg);min-height:100vh;">
    <div class="seo-section-wrap">
      <div class="section-header" style="text-align:center;margin-bottom:var(--space-xl);">
        <p class="section-eyebrow">06 / 06</p>
        <h2 class="section-title" style="color:var(--text-on-dark);">通用技巧工具箱</h2>
        <p class="section-subtitle" style="max-width:560px;margin:0 auto;color:var(--text-on-dark-2);">无论什么场景，这 6 个技巧都能让你的演示更专业</p>
      </div>
      <div class="seo-tip-grid" id="seo-tip-grid">
        ${O()}
      </div>
    </div>
  </section>

  <!-- ═══ Footer ═══ -->
  <footer class="section-dark" style="padding:var(--space-3xl) var(--space-lg);min-height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
    <div style="max-width:640px;margin:0 auto;">
      <p class="page-footer-num">02 / 04</p>
      <h2 class="page-footer-quote">场景决定策略，受众决定详略。</h2>
      <p class="page-footer-desc">知道了怎么设计，接下来看看怎么把"差"的 PPT 变"好"。</p>
      <div class="page-footer-nav">
        <button class="btn-ghost" id="seo-prev-btn">← 设计速成指南</button>
        <button class="btn-primary" id="seo-next-btn">PPT 改造工坊 →</button>
      </div>
    </div>
  </footer>

</div>`}function N(){x=[],g=[];const e=p.timeline({delay:.2});e.fromTo(".seo-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),e.fromTo(".seo-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),e.fromTo(".seo-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),e.fromTo(".seo-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),e.fromTo("#seo-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),e.fromTo(".seo-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#seo-quicknav .hero-quicknav__item").forEach(s=>{c(s,"click",()=>{const a=document.querySelector(s.dataset.target);a&&a.scrollIntoView({behavior:"smooth"})})}),document.querySelectorAll("#seo-scenario-cards .seo-card").forEach(s=>{c(s,"click",()=>{const a=document.querySelector(s.dataset.target);a&&(p.to(s,{scale:.97,duration:.1,ease:"power2.in",onComplete:()=>{p.to(s,{scale:1,duration:.2,ease:"power2.out"})}}),a.scrollIntoView({behavior:"smooth"}))}),c(s,"keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s.click())})}),document.querySelectorAll("#seo-struct-list .seo-struct-item").forEach(s=>{const a=s.querySelector(".seo-struct-header"),r=s.querySelector(".seo-struct-body"),n=s.querySelector(".seo-struct-body-inner");c(a,"click",()=>{s.classList.contains("open")?(r.style.maxHeight=r.scrollHeight+"px",requestAnimationFrame(()=>{r.style.maxHeight="0"}),s.classList.remove("open")):(r.style.maxHeight=n.offsetHeight+"px",s.classList.add("open"))})});const t=document.getElementById("seo-conf-tabs-mount"),l=document.getElementById("seo-conf-panel");if(t&&l){let a=function(n){const d=f.find(y=>y.id===n);d&&(l.innerHTML=B(d),p.fromTo(l,{opacity:0,y:10},{opacity:1,y:0,duration:.4,ease:"power3.out"}))};const s=f.map(n=>({id:n.id,label:n.label})),r=u(t,{tabs:s,activeId:s[0].id,variant:"pill",onChange:a});g.push(r),a(s[0].id)}const o=document.getElementById("seo-thesis-tabs-mount"),v=document.getElementById("seo-thesis-panel");if(o&&v){let s=function(r){const n=r==="master"?j:P,d=r==="master"?"硕士答辩（20–25 分钟，25–30 页）":"博士答辩（30–45 分钟，40–50 页）";v.innerHTML=`
        <p style="font-size:13px;color:var(--text-on-light-3);text-align:center;margin-bottom:var(--space-md);">${d}</p>
        <ul class="seo-thesis-list">${I(n)}</ul>
      `,p.fromTo(v,{opacity:0,y:10},{opacity:1,y:0,duration:.4,ease:"power3.out"})};const a=u(o,{tabs:[{id:"master",label:"硕士答辩"},{id:"phd",label:"博士答辩"}],activeId:"master",variant:"default",onChange:s});g.push(a),s("master")}document.querySelectorAll("#seo-survival-list .seo-survival-item").forEach(s=>{const a=s.querySelector(".seo-survival-header"),r=s.querySelector(".seo-survival-body"),n=s.querySelector(".seo-survival-body-inner");c(a,"click",()=>{s.classList.contains("open")?(r.style.maxHeight=r.scrollHeight+"px",requestAnimationFrame(()=>{r.style.maxHeight="0"}),s.classList.remove("open")):(r.style.maxHeight=n.offsetHeight+"px",s.classList.add("open"))})});const h=document.getElementById("seo-prev-btn"),b=document.getElementById("seo-next-btn");c(h,"click",()=>m("m4-p1")),c(b,"click",()=>m("m4-p3")),i("#seo-overview .section-header",{y:40}),i("#seo-lab-meeting .section-header",{y:40}),i("#seo-conference .section-header",{y:40}),i("#seo-project .section-header",{y:40}),i("#seo-thesis .section-header",{y:40}),i("#seo-toolbox .section-header",{y:40}),i("#seo-scenario-cards .seo-card",{stagger:.1,y:30}),i("#seo-tip-grid .seo-tip-card",{stagger:.1,y:30}),i("#seo-lab-profile",{y:50}),i("#seo-lab-struct",{y:50}),i("#seo-lab-dodo",{y:50}),i("#seo-proj-profile",{y:50}),i("#seo-proj-cols",{y:50}),i("#seo-align-strategy",{y:50}),i(".seo-conf-profile",{y:40}),i("#seo-survival-list",{y:40}),i("#seo-struct-list .seo-struct-item",{stagger:.08,y:20,duration:.5}),i("#seo-survival-list .seo-survival-item",{stagger:.1,y:20,duration:.5}),i(".page-footer-quote",{y:40}),i(".page-footer-num",{y:20}),i(".page-footer-desc",{y:20}),i(".page-footer-nav",{y:20})}function Y(){x.forEach(({el:e,type:t,fn:l,opts:o})=>e.removeEventListener(t,l,o)),x=[],g.forEach(e=>e.destroy()),g=[],w()}export{Y as destroy,N as init,M as render};
