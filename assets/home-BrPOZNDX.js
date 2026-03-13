const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-DQN0JRtp.js","assets/index-CJsR1HCA.css"])))=>i.map(i=>d[i]);
import{_ as I,n as x,g as _}from"./index-DQN0JRtp.js";import{k as C,g as d,S as L,s as k,c as M,f as h}from"./ScrollAnimations-B5Kyk-Xq.js";const P=[{id:"m1",route:"m1-p1",title:"科研数据可视化",subtitle:"Data Visualization",color:"#7EC8E3",pages:10,desc:"从色彩理论到出版级图表——掌握 R/Python 数据可视化全流程，让你的 Figure 经得起顶刊审稿人的审视。",highlights:["交互色轮与配色生成器","ggplot2 图表工作坊","期刊导出规格速查"],icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'},{id:"m2",route:"m2-p1",title:"AI 辅助科研绘图",subtitle:"AI-Assisted Illustration",color:"#B8B8E8",pages:6,desc:"AI 工具如何在科研绘图中扮演恰当的角色——工具选择、Prompt 技巧、矢量化处理，以及不可忽视的伦理边界。",highlights:["Prompt 质量评分器","AI 矢量化模拟器","期刊 AI 政策对照"],icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 014 4c0 1.95-1.4 3.58-3.25 3.93L12 22l-.75-12.07A4.001 4.001 0 0112 2z"/><circle cx="12" cy="6" r="1"/></svg>'},{id:"m3",route:"m3-p1",title:"矢量绘图与设计",subtitle:"Vector Graphics & Design",color:"#95D5B2",pages:7,desc:"将默认图表升级为出版级——贝塞尔曲线编辑器、SVG 手动优化、多面板 Figure 排版，让每张图都精确到像素。",highlights:["贝塞尔曲线交互编辑器","8 组 Before/After 美化","Figure 布局拖拽编辑器"],icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'},{id:"m4",route:"m4-p1",title:"学术演示设计",subtitle:"Academic Presentation Design",color:"#F0B27A",pages:8,desc:"从一张幻灯片到完整学术传播物料——排版原则、注意力引导、海报设计、Graphical Abstract，全面提升学术表达力。",highlights:["注意力热力图交互","PPT 改造 Before/After","学术海报布局模板"],icon:'<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'}],p=[{id:"grad",label:"研究生",desc:"刚接触科研绘图，需要系统学习",path:["m1","m3","m4","m2"],tip:"从数据可视化基础开始，循序渐进"},{id:"postdoc",label:"博士后/青年教师",desc:"有基础，想提升图表品质和效率",path:["m1","m2","m3","m4"],tip:"直接进入高级技巧，善用 AI 提效"},{id:"pi",label:"PI / 导师",desc:"指导学生，需要规范和参考",path:["m4","m1","m3","m2"],tip:"先看演示设计规范，再深入技术细节"},{id:"designer",label:"科研设计师",desc:"帮课题组做美化，需要专业工具",path:["m3","m1","m4","m2"],tip:"矢量设计为核心，数据理解为辅助"}],T={m1:"数据可视化",m2:"AI 辅助",m3:"矢量设计",m4:"演示设计"},$={m1:"#7EC8E3",m2:"#B8B8E8",m3:"#95D5B2",m4:"#F0B27A"};function z(){const a=_();return`
    <div class="page-scroll home-page">

      <!-- ====== Hero（深色，100vh）====== -->
      <section class="section-dark home-hero" id="home-hero">
        <canvas id="hero-canvas"></canvas>
        <div class="home-hero-content">
          <h1 class="home-hero-title">SciAesthetic</h1>
          <p class="home-hero-slogan">你的研究值得更好的表达</p>
          <p class="home-hero-sub">科研视觉传达知识百科——从色彩理论到出版级图表的完整体系</p>
          <div class="home-hero-actions">
            <button class="btn-primary home-hero-btn" id="hero-explore-btn">开始探索</button>
            <button class="btn-ghost home-hero-btn" id="hero-search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              搜索
              <kbd class="hero-kbd">⌘K</kbd>
            </button>
          </div>
        </div>
        <div class="home-hero-scroll-hint" id="scroll-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </section>

      <!-- ====== 模块导航（交错排列）====== -->
      ${P.map((e,i)=>{const t=i%2===1,s=t?"section-dark":"section-light",r=a[e.id]||0;return`
      <section class="${s} home-module-section" id="module-${e.id}">
        <div class="content-wrapper">
          <div class="home-module-card ${t?"reverse":""}" data-color="${e.color}">
            <div class="home-module-visual">
              <div class="home-module-icon-ring" style="--mod-color: ${e.color}">
                <div class="home-module-icon">${e.icon}</div>
              </div>
              <div class="home-module-number" style="color: ${e.color}">${String(i+1).padStart(2,"0")}</div>
            </div>
            <div class="home-module-info">
              <span class="home-module-subtitle" style="color: ${e.color}">${e.subtitle}</span>
              <h2 class="home-module-title">${e.title}</h2>
              <p class="home-module-desc">${e.desc}</p>
              <ul class="home-module-highlights">
                ${e.highlights.map(l=>`<li><span class="highlight-dot" style="background:${e.color}"></span>${l}</li>`).join("")}
              </ul>
              <div class="home-module-footer">
                <a href="#${e.route}" class="btn-primary home-module-btn" style="background:${e.color}" data-route="${e.route}">
                  进入模块
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </a>
                <div class="home-module-progress" data-module="${e.id}">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width:${r}%;background:${e.color}"></div>
                  </div>
                  <span class="progress-label">${r>0?`${r}% 已探索`:`${e.pages} 个词条`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`}).join("")}

      <!-- ====== 统计数字（深色）====== -->
      <section class="section-dark-deep home-stats-section" id="home-stats">
        <div class="content-wrapper">
          <div class="home-stats-grid">
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-entries" data-target="31">0</span>
              <span class="home-stat-label">知识词条</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-components" data-target="120">0</span>
              <span class="home-stat-label">交互组件</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-palettes" data-target="50">0</span>
              <span class="home-stat-label">配色方案</span>
            </div>
            <div class="home-stat-item">
              <span class="stat-number home-stat-num" id="stat-charts" data-target="20">0</span>
              <span class="home-stat-label">图表类型</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 学习路径推荐（浅色）====== -->
      <section class="section-light home-path-section" id="home-path">
        <div class="content-wrapper">
          <div class="home-path-header">
            <h2 class="home-section-title">选择你的角色</h2>
            <p class="home-section-sub">我们为不同背景的科研工作者推荐最适合的学习路径</p>
          </div>
          <div class="home-role-selector">
            ${p.map((e,i)=>`
            <button class="home-role-btn ${i===0?"active":""}" data-role="${e.id}">
              <span class="home-role-label">${e.label}</span>
              <span class="home-role-desc">${e.desc}</span>
            </button>
            `).join("")}
          </div>
          <div class="home-path-display" id="path-display">
            <div class="home-path-tip" id="path-tip">${p[0].tip}</div>
            <div class="home-path-steps" id="path-steps">
              ${E(p[0].path)}
            </div>
          </div>
        </div>
      </section>

      <!-- ====== 速查手册入口（深色）====== -->
      <section class="section-dark home-ref-section">
        <div class="content-wrapper" style="text-align:center;">
          <h2 class="home-section-title">速查手册</h2>
          <p class="home-section-sub" style="margin-bottom:var(--space-lg);">图表选择 · 配色方案 · 导出参数 · 快捷键 · 期刊规格<br>随时查阅，一键复制</p>
          <a href="#ref" class="btn-primary" data-route="ref">打开速查手册</a>
        </div>
      </section>

      <!-- ====== Footer CTA ====== -->
      <section class="section-dark-deep home-footer-section">
        <div class="content-wrapper" style="text-align:center;">
          <p class="home-footer-brand">SciAesthetic</p>
          <p class="home-footer-slogan">你的研究值得更好的表达。</p>
        </div>
      </section>

    </div>
  `}function E(a){return a.map((e,i)=>`
    <div class="home-path-step" data-step="${i}">
      <div class="home-path-step-num" style="background:${$[e]}">${i+1}</div>
      <div class="home-path-step-info">
        <span class="home-path-step-title" style="color:${$[e]}">${T[e]}</span>
      </div>
      ${i<a.length-1?'<div class="home-path-connector"></div>':""}
    </div>
  `).join("")}let m=null;function R(){const a=document.getElementById("hero-canvas");if(!a)return;const e=a.getContext("2d"),i=window.devicePixelRatio||1;let t,s;const r=window.innerWidth<768,l=r?30:60,u=r?120:160,n=[];function g(){const o=a.parentElement.getBoundingClientRect();t=o.width,s=o.height,a.width=t*i,a.height=s*i,a.style.width=t+"px",a.style.height=s+"px",e.setTransform(i,0,0,i,0,0)}function v(){n.length=0;for(let o=0;o<l;o++)n.push({x:Math.random()*t,y:Math.random()*s,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*2+1,opacity:Math.random()*.5+.2})}function A(){e.clearRect(0,0,t,s);for(let o=0;o<n.length;o++)for(let c=o+1;c<n.length;c++){const f=n[o].x-n[c].x,b=n[o].y-n[c].y,w=Math.sqrt(f*f+b*b);if(w<u){const B=(1-w/u)*.15;e.strokeStyle=`rgba(126, 200, 227, ${B})`,e.lineWidth=.5,e.beginPath(),e.moveTo(n[o].x,n[o].y),e.lineTo(n[c].x,n[c].y),e.stroke()}}for(const o of n)e.beginPath(),e.arc(o.x,o.y,o.r,0,Math.PI*2),e.fillStyle=`rgba(126, 200, 227, ${o.opacity})`,e.fill()}function S(){for(const o of n)o.x+=o.vx,o.y+=o.vy,(o.x<0||o.x>t)&&(o.vx*=-1),(o.y<0||o.y>s)&&(o.vy*=-1),o.x=Math.max(0,Math.min(t,o.x)),o.y=Math.max(0,Math.min(s,o.y))}function y(){S(),A(),m=requestAnimationFrame(y)}g(),v(),y(),window.__heroResizeHandler=()=>{g(),v()},window.addEventListener("resize",window.__heroResizeHandler)}function F(){R();const a=document.getElementById("hero-explore-btn");a&&a.addEventListener("click",()=>{const t=document.getElementById("module-m1");t&&t.scrollIntoView({behavior:"smooth"})});const e=document.getElementById("hero-search-btn");e&&e.addEventListener("click",()=>{I(()=>import("./index-DQN0JRtp.js").then(t=>t.S),__vite__mapDeps([0,1])).then(t=>t.openSearch())}),document.querySelectorAll(".home-module-btn[data-route]").forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),x(t.dataset.route)})}),document.querySelectorAll('[data-route="ref"]').forEach(t=>{t.addEventListener("click",s=>{s.preventDefault(),x("ref")})}),d.from(".home-hero-title",{opacity:0,y:40,duration:1,delay:.2,ease:"power3.out"}),d.from(".home-hero-slogan",{opacity:0,y:30,duration:.8,delay:.5,ease:"power3.out"}),d.from(".home-hero-sub",{opacity:0,y:20,duration:.8,delay:.7,ease:"power3.out"}),d.from(".home-hero-actions",{opacity:0,y:20,duration:.8,delay:.9,ease:"power3.out"});const i=document.getElementById("scroll-hint");i&&L.create({trigger:"#home-hero",start:"top top",end:"bottom top",onUpdate:t=>{i.style.opacity=String(1-t.progress*3)}}),document.querySelectorAll(".home-module-card").forEach(t=>{k(t,{scale:.95,start:"top 85%"})}),document.querySelectorAll(".home-stat-num").forEach(t=>{const s=parseInt(t.dataset.target,10);M(t,s,2)}),h(".home-stat-item",{stagger:.2,y:40}),h(".home-path-header",{y:40}),h(".home-role-selector",{y:30}),k(document.querySelector(".home-path-display"),{scale:.95}),D(),j(),h(".home-ref-section .content-wrapper",{y:40})}function D(){const a=document.querySelectorAll(".home-role-btn");a.forEach(e=>{e.addEventListener("click",()=>{a.forEach(l=>l.classList.remove("active")),e.classList.add("active");const i=e.dataset.role,t=p.find(l=>l.id===i);if(!t)return;const s=document.getElementById("path-steps"),r=document.getElementById("path-tip");r&&(r.textContent=t.tip),s&&(s.style.opacity="0",s.style.transform="translateY(10px)",setTimeout(()=>{s.innerHTML=E(t.path),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateY(0)"})},200))})})}function j(){document.querySelectorAll(".home-path-step").forEach((e,i)=>{d.from(e,{scrollTrigger:{trigger:e,start:"top 85%",toggleActions:"play none none none"},opacity:0,x:-20,duration:.5,delay:i*.15,ease:"power3.out"})})}function H(){m&&(cancelAnimationFrame(m),m=null),window.__heroResizeHandler&&(window.removeEventListener("resize",window.__heroResizeHandler),delete window.__heroResizeHandler),C()}export{H as destroy,F as init,z as render};
