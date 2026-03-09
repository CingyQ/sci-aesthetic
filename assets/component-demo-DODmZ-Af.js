import{g as C,S as I,k as Z,f as tt,c as et,s as at}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as G}from"./CodeEditor-BiI1SvFS.js";import{c as nt}from"./ChartPreview-BlOxeNxU.js";import{c as T}from"./CopyButton-2sIiwDp8.js";import{c as N}from"./TabSwitcher-B5dsPqHB.js";import{l as $,b as ot}from"./transform-ZU6R_1Oi.js";import{a as R,b as D}from"./axis-FVV8vvN_.js";import{l as st}from"./line-Ci26EkcQ.js";import{c as rt}from"./catmullRom-Dm0ttBHj.js";import{q as it}from"./quad-nLXVu5ve.js";import"./path-CbwjOpE9.js";import"./math-CRUJxRjv.js";function lt(r,{width:l=800,height:m=600,responsive:p=!0}={}){const e=document.createElement("canvas"),s=window.devicePixelRatio||1;function a(n,v){e.width=n*s,e.height=v*s,e.style.width=n+"px",e.style.height=v+"px",c.setTransform(s,0,0,s,0,0)}e.style.display="block",e.style.borderRadius="12px",e.style.touchAction="none";const c=e.getContext("2d");r.appendChild(e);let i=l,d=m;const u=l/m;if(p){const n=r.clientWidth;n>0&&n<l&&(i=n,d=n/u)}a(i,d);function t(n){const v=e.getBoundingClientRect(),y=i/v.width,z=d/v.height;return{x:(n.clientX-v.left)*y,y:(n.clientY-v.top)*z}}const o={pointerdown:[],pointermove:[],pointerup:[]};e.addEventListener("pointerdown",n=>{o.pointerdown.forEach(v=>v(n,t(n)))}),e.addEventListener("pointermove",n=>{o.pointermove.forEach(v=>v(n,t(n)))}),e.addEventListener("pointerup",n=>{o.pointerup.forEach(v=>v(n,t(n)))}),e.addEventListener("pointercancel",n=>{o.pointerup.forEach(v=>v(n,t(n)))});let g=null,b=null;return p&&(g=new ResizeObserver(n=>{const v=n[0],y=Math.floor(v.contentRect.width);y>0&&y!==i&&(i=y,d=y/u,a(i,d),b&&b(i,d))}),g.observe(r)),{canvas:e,ctx:c,getPos:t,getSize(){return{width:i,height:d}},onPointerDown(n){o.pointerdown.push(n)},onPointerMove(n){o.pointermove.push(n)},onPointerUp(n){o.pointerup.push(n)},onResize(n){b=n},resize(n,v){i=n,d=v,a(n,v)},clear(n){c.clearRect(0,0,i,d),n&&(c.fillStyle=n,c.fillRect(0,0,i,d))},destroy(){g&&g.disconnect(),e.remove()}}}function U({content:r="",title:l="",onClose:m=null,closeOnOverlay:p=!0,size:e="default"}={}){const s=document.createElement("div");s.className="modal-overlay",s.innerHTML=`
    <div class="modal-container modal-container--${e}">
      <div class="modal-header">
        ${l?`<h3 class="modal-title">${l}</h3>`:"<span></span>"}
        <button class="modal-close" aria-label="关闭">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">${r}</div>
    </div>
  `,document.body.appendChild(s),document.body.style.overflow="hidden";const a=s.querySelector(".modal-container"),c=s.querySelector(".modal-close");C.fromTo(s,{opacity:0},{opacity:1,duration:.25,ease:"power2.out"}),C.fromTo(a,{opacity:0,y:40,scale:.95},{opacity:1,y:0,scale:1,duration:.35,ease:"power3.out",delay:.05});function i(){C.to(a,{opacity:0,y:20,scale:.97,duration:.2,ease:"power2.in"}),C.to(s,{opacity:0,duration:.25,ease:"power2.in",delay:.05,onComplete:()=>{document.body.style.overflow="",s.remove(),m&&m()}})}c.addEventListener("click",i),p&&s.addEventListener("click",u=>{u.target===s&&i()});function d(u){u.key==="Escape"&&i()}return document.addEventListener("keydown",d),{el:s,body:s.querySelector(".modal-body"),close:i,destroy(){document.removeEventListener("keydown",d),document.body.style.overflow="",s.remove()}}}function ct(r,{items:l=[],singleOpen:m=!0,defaultOpen:p=""}={}){const e=document.createElement("div");e.className="accordion",e.innerHTML=l.map(t=>`
    <div class="accordion__item${t.id===p?" expanded":""}" data-accordion-id="${t.id}">
      <button class="accordion__header" aria-expanded="${t.id===p}">
        <span class="accordion__title">${t.title}</span>
        <svg class="accordion__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div class="accordion__content" style="${t.id===p?"":"height:0;"}">
        <div class="accordion__inner">${t.content}</div>
      </div>
    </div>
  `).join(""),r.appendChild(e);const s=e.querySelectorAll(".accordion__item");function a(t,o){const g=t.querySelector(".accordion__inner");if(o){const b=g.offsetHeight;t.style.height="0px",t.offsetHeight,t.style.transition="height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",t.style.height=b+"px";const n=()=>{t.style.height="auto",t.style.transition="",t.removeEventListener("transitionend",n)};t.addEventListener("transitionend",n)}else t.style.height=t.scrollHeight+"px",t.offsetHeight,t.style.transition="height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",t.style.height="0px"}function c(t){const o=e.querySelector(`[data-accordion-id="${t}"]`);!o||o.classList.contains("expanded")||(m&&s.forEach(g=>{g!==o&&g.classList.contains("expanded")&&i(g)}),o.classList.add("expanded"),o.querySelector(".accordion__header").setAttribute("aria-expanded","true"),a(o.querySelector(".accordion__content"),!0))}function i(t){t.classList.remove("expanded"),t.querySelector(".accordion__header").setAttribute("aria-expanded","false"),a(t.querySelector(".accordion__content"),!1)}function d(t){const o=e.querySelector(`[data-accordion-id="${t}"]`);!o||!o.classList.contains("expanded")||i(o)}function u(t){const o=e.querySelector(`[data-accordion-id="${t}"]`);o&&(o.classList.contains("expanded")?d(t):c(t))}return e.addEventListener("click",t=>{const o=t.target.closest(".accordion__header");if(!o)return;const g=o.closest(".accordion__item");u(g.dataset.accordionId)}),{open:c,close:d,toggle:u,destroy(){e.remove()}}}function dt(r,{beforeContent:l="",afterContent:m="",beforeLabel:p="Before",afterLabel:e="After",initialPosition:s=50}={}){const a=document.createElement("div");a.className="before-after",a.style.touchAction="pan-y",a.innerHTML=`
    <div class="before-after__after">${m}</div>
    <div class="before-after__before" style="width:${s}%;">${l}</div>
    <div class="before-after__handle" style="left:${s}%;">
      <div class="before-after__handle-line"></div>
      <div class="before-after__handle-grip">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </div>
    </div>
    <span class="before-after__label before-after__label--before">${p}</span>
    <span class="before-after__label before-after__label--after">${e}</span>
  `,r.appendChild(a);const c=a.querySelector(".before-after__before"),i=a.querySelector(".before-after__handle");let d=!1;function u(n){const v=Math.max(0,Math.min(100,n));c.style.width=v+"%",i.style.left=v+"%"}function t(n){const v=a.getBoundingClientRect();return(n.clientX-v.left)/v.width*100}function o(n){(n.target.closest(".before-after__handle")||n.target===a)&&(d=!0,a.setPointerCapture(n.pointerId),u(t(n)))}function g(n){d&&(n.preventDefault(),u(t(n)))}function b(){d=!1}return a.addEventListener("pointerdown",o),a.addEventListener("pointermove",g),a.addEventListener("pointerup",b),a.addEventListener("pointercancel",b),a.addEventListener("click",n=>{d||u(t(n))}),{setPosition:u,destroy(){a.remove()}}}let A=null;function pt(){return A||(A=document.createElement("div"),A.className="toast-container",document.body.appendChild(A)),A}function M(r,{duration:l=3e3,type:m="info"}={}){const p=pt(),e=document.createElement("div");e.className=`toast toast--${m}`;const s={info:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',success:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',error:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',landscape:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 6V2"/></svg>'};e.innerHTML=`
    <span class="toast__icon">${s[m]||s.info}</span>
    <span class="toast__message">${r}</span>
    <button class="toast__close" aria-label="关闭">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `,p.appendChild(e),requestAnimationFrame(()=>{e.classList.add("toast--visible")});let a=null;function c(){a&&clearTimeout(a),e.classList.remove("toast--visible"),e.classList.add("toast--exit"),setTimeout(()=>e.remove(),300)}return e.querySelector(".toast__close").addEventListener("click",c),l>0&&(a=setTimeout(c,l)),{close:c}}C.registerPlugin(I);function ut(r,{steps:l=[],heading:m="",subheading:p=""}={}){const e=document.createElement("div");e.className="sticky-steps";const s=l.map((t,o)=>`
    <div class="sticky-steps__step" data-step="${o}">
      <div class="sticky-steps__step-marker">
        <span class="sticky-steps__step-number">${o+1}</span>
        ${o<l.length-1?'<div class="sticky-steps__step-line"></div>':""}
      </div>
      <div class="sticky-steps__step-body">
        <h4 class="sticky-steps__step-title">${t.title}</h4>
        ${t.description?`<p class="sticky-steps__step-desc">${t.description}</p>`:""}
        <div class="sticky-steps__step-content">${t.content}</div>
      </div>
    </div>
  `).join("");e.innerHTML=`
    <div class="sticky-steps__fixed">
      ${m?`<h3 class="sticky-steps__heading">${m}</h3>`:""}
      ${p?`<p class="sticky-steps__subheading">${p}</p>`:""}
      <div class="sticky-steps__progress">
        <div class="sticky-steps__progress-fill"></div>
      </div>
      <div class="sticky-steps__current-label"></div>
    </div>
    <div class="sticky-steps__scroll">
      ${s}
    </div>
  `,r.appendChild(e);const a=e.querySelector(".sticky-steps__fixed");e.querySelector(".sticky-steps__scroll");const c=e.querySelector(".sticky-steps__progress-fill"),i=e.querySelector(".sticky-steps__current-label"),d=e.querySelectorAll(".sticky-steps__step");function u(t){d.forEach((o,g)=>{o.classList.toggle("active",g===t)}),l[t]&&(i.textContent=`步骤 ${t+1} / ${l.length}`),c.style.width=(t+1)/l.length*100+"%"}return u(0),I.matchMedia({"(min-width: 769px)":()=>{I.create({trigger:e,start:"top 80px",end:"bottom bottom",pin:a,pinSpacing:!1}),d.forEach((t,o)=>{C.from(t,{scrollTrigger:{trigger:t,start:"top 75%",toggleActions:"play none none reverse"},opacity:0,x:30,duration:.6,ease:"power3.out"}),I.create({trigger:t,start:"top 50%",end:"bottom 50%",onEnter:()=>u(o),onEnterBack:()=>u(o)})})},"(max-width: 768px)":()=>(a.style.position="sticky",a.style.top="56px",a.style.zIndex="10",a.style.background="inherit",a.style.paddingBottom="var(--space-sm)",d.forEach((t,o)=>{C.from(t,{scrollTrigger:{trigger:t,start:"top 90%",toggleActions:"play none none none"},opacity:0,y:20,duration:.5,ease:"power3.out"}),I.create({trigger:t,start:"top 60%",end:"bottom 60%",onEnter:()=>u(o),onEnterBack:()=>u(o)})}),()=>{a.style.position="",a.style.top="",a.style.zIndex="",a.style.background="",a.style.paddingBottom=""})}),{destroy(){I.getAll().forEach(t=>{t.trigger&&e.contains(t.trigger)&&t.kill()}),e.remove()}}}function mt(r,{value:l="#7EC8E3",onChange:m=null,label:p="颜色"}={}){let e=H(l),s="hex";const a=document.createElement("div");a.className="color-input";function c(){const t=j(e),o=F(t.r,t.g,t.b);a.innerHTML=`
      <label class="color-input__label">${p}</label>
      <div class="color-input__row">
        <div class="color-input__preview" style="background:${e};"></div>
        <div class="color-input__fields">
          <div class="color-input__tabs">
            <button class="color-input__tab${s==="hex"?" active":""}" data-mode="hex">HEX</button>
            <button class="color-input__tab${s==="rgb"?" active":""}" data-mode="rgb">RGB</button>
            <button class="color-input__tab${s==="hsl"?" active":""}" data-mode="hsl">HSL</button>
          </div>
          <div class="color-input__values">
            ${s==="hex"?`
              <input class="color-input__hex-input input" type="text" value="${e}" maxlength="7" spellcheck="false" />
            `:s==="rgb"?`
              <div class="color-input__triple">
                <label><span>R</span><input class="input input-number" type="number" min="0" max="255" value="${t.r}" data-channel="r" inputmode="numeric" /></label>
                <label><span>G</span><input class="input input-number" type="number" min="0" max="255" value="${t.g}" data-channel="g" inputmode="numeric" /></label>
                <label><span>B</span><input class="input input-number" type="number" min="0" max="255" value="${t.b}" data-channel="b" inputmode="numeric" /></label>
              </div>
            `:`
              <div class="color-input__triple">
                <label><span>H</span><input class="input input-number" type="number" min="0" max="360" value="${Math.round(o.h)}" data-channel="h" inputmode="numeric" /></label>
                <label><span>S</span><input class="input input-number" type="number" min="0" max="100" value="${Math.round(o.s)}" data-channel="s" inputmode="numeric" /></label>
                <label><span>L</span><input class="input input-number" type="number" min="0" max="100" value="${Math.round(o.l)}" data-channel="l" inputmode="numeric" /></label>
              </div>
            `}
          </div>
        </div>
      </div>
      <div class="color-input__slider-row">
        <input class="color-input__hue-slider" type="range" min="0" max="360" value="${Math.round(o.h)}" />
      </div>
    `,u()}function i(){const t=a.querySelector(".color-input__preview");t&&(t.style.background=e);const o=j(e),g=F(o.r,o.g,o.b);if(s==="hex"){const n=a.querySelector(".color-input__hex-input");n&&document.activeElement!==n&&(n.value=e)}else if(s==="rgb"){const n=a.querySelector('[data-channel="r"]'),v=a.querySelector('[data-channel="g"]'),y=a.querySelector('[data-channel="b"]');n&&document.activeElement!==n&&(n.value=o.r),v&&document.activeElement!==v&&(v.value=o.g),y&&document.activeElement!==y&&(y.value=o.b)}else{const n=a.querySelector('[data-channel="h"]'),v=a.querySelector('[data-channel="s"]'),y=a.querySelector('[data-channel="l"]');n&&document.activeElement!==n&&(n.value=Math.round(g.h)),v&&document.activeElement!==v&&(v.value=Math.round(g.s)),y&&document.activeElement!==y&&(y.value=Math.round(g.l))}const b=a.querySelector(".color-input__hue-slider");b&&document.activeElement!==b&&(b.value=Math.round(g.h))}function d(t){const o=H(t);!o||o===e||(e=o,i(),m&&m(e))}function u(){a.querySelectorAll(".color-input__tab").forEach(g=>{g.addEventListener("click",()=>{s=g.dataset.mode,c()})});const t=a.querySelector(".color-input__hex-input");t&&t.addEventListener("change",()=>{d(t.value)}),a.querySelectorAll(".color-input__triple input[data-channel]").forEach(g=>{g.addEventListener("input",()=>{if(s==="rgb"){const b=parseInt(a.querySelector('[data-channel="r"]')?.value||0),n=parseInt(a.querySelector('[data-channel="g"]')?.value||0),v=parseInt(a.querySelector('[data-channel="b"]')?.value||0);d(W(B(b,0,255),B(n,0,255),B(v,0,255)))}else if(s==="hsl"){const b=parseInt(a.querySelector('[data-channel="h"]')?.value||0),n=parseInt(a.querySelector('[data-channel="s"]')?.value||0),v=parseInt(a.querySelector('[data-channel="l"]')?.value||0),y=V(B(b,0,360),B(n,0,100),B(v,0,100));d(W(y.r,y.g,y.b))}})});const o=a.querySelector(".color-input__hue-slider");o&&o.addEventListener("input",()=>{const g=j(e),b=F(g.r,g.g,g.b);b.h=parseInt(o.value);const n=V(b.h,b.s,b.l),v=W(n.r,n.g,n.b),y=H(v);y&&y!==e&&(e=y,i(),m&&m(e))})}return c(),r.appendChild(a),{getValue(){return e},setValue(t){d(t)},destroy(){a.remove()}}}function B(r,l,m){return Math.max(l,Math.min(m,r))}function H(r){return r?(r=r.trim(),r.startsWith("#")||(r="#"+r),r.length===4&&(r="#"+r[1]+r[1]+r[2]+r[2]+r[3]+r[3]),/^#[0-9a-fA-F]{6}$/.test(r)?r.toUpperCase():null):null}function j(r){const l=H(r)||"#000000";return{r:parseInt(l.slice(1,3),16),g:parseInt(l.slice(3,5),16),b:parseInt(l.slice(5,7),16)}}function W(r,l,m){return"#"+[r,l,m].map(p=>p.toString(16).padStart(2,"0")).join("").toUpperCase()}function F(r,l,m){r/=255,l/=255,m/=255;const p=Math.max(r,l,m),e=Math.min(r,l,m);let s,a,c=(p+e)/2;if(p===e)s=a=0;else{const i=p-e;a=c>.5?i/(2-p-e):i/(p+e),p===r?s=((l-m)/i+(l<m?6:0))/6:p===l?s=((m-r)/i+2)/6:s=((r-l)/i+4)/6}return{h:s*360,s:a*100,l:c*100}}function V(r,l,m){r/=360,l/=100,m/=100;let p,e,s;if(l===0)p=e=s=m;else{const a=(d,u,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<.16666666666666666?d+(u-d)*6*t:t<.5?u:t<.6666666666666666?d+(u-d)*(.6666666666666666-t)*6:d),c=m<.5?m*(1+l):m+l-m*l,i=2*m-c;p=a(i,c,r+1/3),e=a(i,c,r),s=a(i,c,r-1/3)}return{r:Math.round(p*255),g:Math.round(e*255),b:Math.round(s*255)}}function vt(r,{panels:l=[],defaultPanel:m=""}={}){const p=document.createElement("div");p.className="workshop-layout";const e=m||l[0]&&l[0].id||"";p.innerHTML=l.map((c,i)=>`
    <div class="workshop-panel${c.id===e?" expanded":""}" data-panel-id="${c.id}">
      <div class="workshop-panel-header" role="button" tabindex="0" aria-expanded="${c.id===e}">
        <span class="workshop-panel-title">
          ${c.icon?`<span class="workshop-panel-icon">${c.icon}</span>`:""}
          ${c.title}
        </span>
        <svg class="workshop-panel-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
      <div class="workshop-panel-content" id="workshop-panel-${c.id}">
        ${c.content}
      </div>
    </div>
  `).join(""),r.appendChild(p);const s=p.querySelectorAll(".workshop-panel");function a(c){window.innerWidth>768||s.forEach(i=>{const d=i.querySelector(".workshop-panel-content"),u=i.querySelector(".workshop-panel-header");if(i.dataset.panelId===c)if(i.classList.contains("expanded"))d.style.maxHeight=d.scrollHeight+"px",d.offsetHeight,d.style.maxHeight="0",i.classList.remove("expanded"),u.setAttribute("aria-expanded","false");else{s.forEach(g=>{g!==i&&g.classList.contains("expanded")&&(g.classList.remove("expanded"),g.querySelector(".workshop-panel-header").setAttribute("aria-expanded","false"),g.querySelector(".workshop-panel-content").style.maxHeight="0")}),i.classList.add("expanded"),u.setAttribute("aria-expanded","true"),d.style.maxHeight=d.scrollHeight+"px";const o=()=>{d.style.maxHeight="none",d.removeEventListener("transitionend",o)};d.addEventListener("transitionend",o)}})}return p.addEventListener("click",c=>{const i=c.target.closest(".workshop-panel-header");if(!i)return;const d=i.closest(".workshop-panel");a(d.dataset.panelId)}),p.addEventListener("keydown",c=>{if(c.key==="Enter"||c.key===" "){const i=c.target.closest(".workshop-panel-header");if(!i)return;c.preventDefault();const d=i.closest(".workshop-panel");a(d.dataset.panelId)}}),{getPanel(c){return p.querySelector(`#workshop-panel-${c}`)},destroy(){p.remove()}}}let w=[];function Lt(){return`
    <div class="page-scroll">

      <!-- Hero -->
      <section class="section-dark" style="align-items:center;">
        <h1 class="page-hero-title" style="color:var(--text-on-dark);">组件库</h1>
        <p class="page-hero-sub">Phase 2 — 13 个核心组件交互演示</p>
      </section>

      <!-- 1. ScrollAnimations -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ScrollAnimations</h2>
          <p class="subtitle" style="margin-bottom:var(--space-xl);">GSAP ScrollTrigger — 向下滚动查看效果</p>
          <div style="display:flex;flex-direction:column;gap:var(--space-lg);">
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">fadeIn 渐入</h3>
              <p style="color:var(--text-on-light-2);">fade in + translateY，移动端 y 偏移减半。</p>
            </div>
            <div class="fade-item" style="padding:var(--space-lg);background:var(--bg-light-alt);border-radius:var(--radius-md);">
              <h3 style="margin-bottom:var(--space-xs);">matchMedia 断点适配</h3>
              <p style="color:var(--text-on-light-2);">桌面端和移动端分别设置动画参数。</p>
            </div>
          </div>
        </div>
      </section>

      <!-- countUp -->
      <section class="section-dark section-auto">
        <div class="content-wrapper" style="text-align:center;">
          <h2 style="margin-bottom:var(--space-xl);">countUp 数字递增</h2>
          <div style="display:flex;gap:var(--space-xl);justify-content:center;flex-wrap:wrap;">
            <div>
              <span class="stat-number count-target" data-target="31" style="color:var(--accent);">0</span>
              <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">知识词条</p>
            </div>
            <div>
              <span class="stat-number count-target" data-target="120" style="color:var(--accent);">0</span>
              <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-top:var(--space-xs);">交互组件</p>
            </div>
          </div>
        </div>
      </section>

      <!-- scaleReveal -->
      <section class="section-light section-auto">
        <div class="content-wrapper" style="text-align:center;">
          <h2 style="margin-bottom:var(--space-xl);">scaleReveal 缩放揭示</h2>
          <div class="scale-target" style="max-width:600px;margin:0 auto;padding:var(--space-xl);background:var(--accent-subtle);border-radius:var(--radius-lg);">
            <h3 style="color:var(--accent);margin-bottom:var(--space-sm);">交互组件入场</h3>
            <p style="color:var(--text-on-light-2);">0.9→1.0 缩放 + opacity 渐入</p>
          </div>
        </div>
      </section>

      <!-- 2. CodeEditor -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CodeEditor</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">CodeMirror 6 — R/Python 切换</p>
          <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-md);flex-wrap:wrap;">
            <button class="btn-ghost btn-small lang-switch active" data-lang="r">R</button>
            <button class="btn-ghost btn-small lang-switch" data-lang="python">Python</button>
          </div>
          <div id="code-editor-container" style="margin-bottom:var(--space-md);"></div>
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;">
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">行数：</span>
            <span id="code-line-count" style="font-size:var(--text-small);color:var(--accent);">—</span>
            <div id="code-copy-btn"></div>
          </div>
        </div>
      </section>

      <!-- 3. ChartPreview -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ChartPreview</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">D3 SVG — 深色画布 + 响应式</p>
          <div id="chart-preview-container" style="max-width:600px;"></div>
          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-ghost btn-small" id="chart-scatter">散点图</button>
            <button class="btn-ghost btn-small" id="chart-bar">柱状图</button>
            <button class="btn-ghost btn-small" id="chart-line">折线图</button>
          </div>
        </div>
      </section>

      <!-- 4. InteractiveCanvas -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">InteractiveCanvas</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">Canvas — HiDPI + Pointer Events 绘图</p>
          <div id="canvas-container" style="max-width:600px;"></div>
          <div style="margin-top:var(--space-md);display:flex;gap:var(--space-sm);flex-wrap:wrap;align-items:center;">
            <button class="btn-ghost btn-small" id="canvas-clear">清空画布</button>
            <span style="font-size:var(--text-small);color:var(--text-on-dark-3);">鼠标或手指绘画</span>
          </div>
        </div>
      </section>

      <!-- 5. CopyButton -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">CopyButton</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">一键复制 + 反馈动画</p>
          <div style="padding:var(--space-lg);background:var(--bg-dark);border-radius:var(--radius-md);max-width:500px;">
            <pre style="margin-bottom:var(--space-md);"><code>ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "#7EC8E3")</code></pre>
            <div id="copy-demo-container" style="display:flex;gap:var(--space-sm);"></div>
          </div>
        </div>
      </section>

      <!-- 6. TabSwitcher -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">TabSwitcher</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">滑动指示器跟随切换</p>
          <div style="margin-bottom:var(--space-lg);">
            <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-bottom:var(--space-sm);">Default 样式</p>
            <div id="tab-switcher-default"></div>
          </div>
          <div>
            <p style="font-size:var(--text-small);color:var(--text-on-dark-3);margin-bottom:var(--space-sm);">Pill 样式</p>
            <div id="tab-switcher-pill"></div>
          </div>
          <p id="tab-result" style="margin-top:var(--space-md);font-size:var(--text-small);color:var(--accent);">当前选中：scatter</p>
        </div>
      </section>

      <!-- 7. Modal -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Modal</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">ESC / 点击遮罩关闭，GSAP 入场</p>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-primary" id="open-modal-default">打开模态框</button>
            <button class="btn-ghost" id="open-modal-large">大尺寸模态框</button>
          </div>
        </div>
      </section>

      <!-- 8. Accordion -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Accordion</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">平滑展开/折叠，单开模式</p>
          <div id="accordion-container" style="max-width:600px;"></div>
        </div>
      </section>

      <!-- 9. BeforeAfter -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">BeforeAfter</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">拖拽/滑动对比 — Pointer Events</p>
          <div id="before-after-container" style="max-width:600px;"></div>
        </div>
      </section>

      <!-- 10. Toast -->
      <section class="section-light section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">Toast</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">底部弹出消息，自动消失</p>
          <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
            <button class="btn-ghost btn-small" id="toast-info">信息</button>
            <button class="btn-ghost btn-small" id="toast-success">成功</button>
            <button class="btn-ghost btn-small" id="toast-error">错误</button>
            <button class="btn-ghost btn-small" id="toast-landscape">横屏提示</button>
          </div>
        </div>
      </section>

      <!-- 11. StickySteps -->
      <section class="section-dark" style="min-height:auto;padding:var(--space-xl) var(--space-lg);">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">StickySteps</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">粘性滚动步骤演示</p>
          <div id="sticky-steps-container"></div>
        </div>
      </section>

      <!-- 12. ColorInput -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">ColorInput</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">HEX/RGB/HSL 三模式 + 色相滑块</p>
          <div style="display:flex;gap:var(--space-xl);flex-wrap:wrap;align-items:flex-start;">
            <div id="color-input-container"></div>
            <div id="color-preview" style="width:120px;height:120px;border-radius:var(--radius-md);background:#7EC8E3;transition:background 0.15s;border:2px solid var(--border-dark);"></div>
          </div>
        </div>
      </section>

      <!-- 13. WorkshopLayout -->
      <section class="section-dark section-auto">
        <div class="content-wrapper">
          <h2 style="margin-bottom:var(--space-sm);">WorkshopLayout</h2>
          <p class="subtitle" style="margin-bottom:var(--space-lg);">三面板：桌面 Grid / 移动端手风琴</p>
          <div id="workshop-container"></div>
        </div>
      </section>

      <!-- Footer -->
      <section class="section-dark" style="align-items:center;min-height:50vh;">
        <h2 style="text-align:center;margin-bottom:var(--space-md);">组件库完整就绪</h2>
        <p class="subtitle" style="text-align:center;margin-bottom:var(--space-lg);">13 个核心组件均可交互验证</p>
        <a href="#home" class="btn-primary">返回首页</a>
      </section>

    </div>
  `}const P={r:`library(ggplot2)

ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3, alpha = 0.8) +
  scale_color_manual(values = c("#7EC8E3", "#95D5B2", "#F0B27A")) +
  labs(title = "Weight vs MPG", x = "Weight", y = "MPG") +
  theme_minimal(base_size = 14)`,python:`import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
x = np.random.randn(100)
y = 2.5 * x + np.random.randn(100) * 0.8

fig, ax = plt.subplots(figsize=(8, 6), dpi=300)
ax.scatter(x, y, c='#7EC8E3', s=50, alpha=0.7)
ax.set_xlabel('Variable X')
ax.set_ylabel('Variable Y')
plt.tight_layout()`};function Bt(){tt(".fade-item",{stagger:.2,y:60}),document.querySelectorAll(".count-target").forEach(h=>{et(h,parseInt(h.dataset.target))}),at(".scale-target");const r=document.getElementById("code-editor-container"),l=document.getElementById("code-line-count");let m="r",p=G(r,{code:P.r,language:"r",onChange:h=>{l.textContent=h.split(`
`).length+" 行"}});w.push(()=>p.destroy()),l.textContent=P.r.split(`
`).length+" 行",document.querySelectorAll(".lang-switch").forEach(h=>{h.addEventListener("click",()=>{const f=h.dataset.lang;f!==m&&(m=f,document.querySelectorAll(".lang-switch").forEach(_=>_.classList.remove("active")),h.classList.add("active"),p.destroy(),p=G(r,{code:P[f],language:f,onChange:_=>{l.textContent=_.split(`
`).length+" 行"}}),l.textContent=P[f].split(`
`).length+" 行")})});const e=T(document.getElementById("code-copy-btn"),{getText:()=>p.getCode(),label:"复制代码"});w.push(()=>e.destroy());const s=nt(document.getElementById("chart-preview-container"));w.push(()=>s.destroy());const a=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A","#E07A7A"];function c(){const h=s.clear(),f=Array.from({length:50},()=>({x:Math.random()*100,y:Math.random()*100,r:3+Math.random()*5,color:a[Math.floor(Math.random()*5)]})),_=$().domain([0,100]).range([0,s.innerWidth]),E=$().domain([0,100]).range([s.innerHeight,0]);h.append("g").attr("transform",`translate(0,${s.innerHeight})`).call(R(_).ticks(5)).selectAll("text").attr("fill","#a1a1a6"),h.append("g").call(D(E).ticks(5)).selectAll("text").attr("fill","#a1a1a6"),h.selectAll(".domain,.tick line").attr("stroke","#424245"),h.selectAll("circle").data(f).enter().append("circle").attr("cx",k=>_(k.x)).attr("cy",k=>E(k.y)).attr("r",0).attr("fill",k=>k.color).attr("opacity",.8).transition().duration(500).delay((k,x)=>x*12).attr("r",k=>k.r)}function i(){const h=s.clear(),f=["A","B","C","D","E"],_=f.map((x,L)=>({label:x,value:20+Math.random()*80,color:a[L]})),E=ot().domain(f).range([0,s.innerWidth]).padding(.3),k=$().domain([0,100]).range([s.innerHeight,0]);h.append("g").attr("transform",`translate(0,${s.innerHeight})`).call(R(E)).selectAll("text").attr("fill","#a1a1a6"),h.append("g").call(D(k).ticks(5)).selectAll("text").attr("fill","#a1a1a6"),h.selectAll(".domain,.tick line").attr("stroke","#424245"),h.selectAll("rect").data(_).enter().append("rect").attr("x",x=>E(x.label)).attr("width",E.bandwidth()).attr("y",s.innerHeight).attr("height",0).attr("fill",x=>x.color).attr("rx",4).transition().duration(500).delay((x,L)=>L*80).attr("y",x=>k(x.value)).attr("height",x=>s.innerHeight-k(x.value))}function d(){const h=s.clear(),f=Array.from({length:20},(S,q)=>({x:q,y:30+Math.sin(q*.5)*25+Math.random()*10})),_=$().domain([0,19]).range([0,s.innerWidth]),E=$().domain([0,100]).range([s.innerHeight,0]);h.append("g").attr("transform",`translate(0,${s.innerHeight})`).call(R(_).ticks(5)).selectAll("text").attr("fill","#a1a1a6"),h.append("g").call(D(E).ticks(5)).selectAll("text").attr("fill","#a1a1a6"),h.selectAll(".domain,.tick line").attr("stroke","#424245");const k=st().x(S=>_(S.x)).y(S=>E(S.y)).curve(rt),x=h.append("path").datum(f).attr("d",k).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5),L=x.node().getTotalLength();x.attr("stroke-dasharray",L).attr("stroke-dashoffset",L).transition().duration(1e3).ease(it).attr("stroke-dashoffset",0),h.selectAll("circle").data(f).enter().append("circle").attr("cx",S=>_(S.x)).attr("cy",S=>E(S.y)).attr("r",0).attr("fill","#7EC8E3").transition().delay((S,q)=>800+q*25).duration(300).attr("r",3.5)}c(),document.getElementById("chart-scatter").addEventListener("click",c),document.getElementById("chart-bar").addEventListener("click",i),document.getElementById("chart-line").addEventListener("click",d);const u=lt(document.getElementById("canvas-container"),{width:600,height:350,responsive:!0});w.push(()=>u.destroy()),u.clear("#1a1a2e");let t=!1,o=null,g=0;u.onPointerDown((h,f)=>{t=!0,o=f}),u.onPointerMove((h,f)=>{t&&(g=(g+1)%360,u.ctx.beginPath(),u.ctx.moveTo(o.x,o.y),u.ctx.lineTo(f.x,f.y),u.ctx.strokeStyle=`hsl(${g}, 70%, 65%)`,u.ctx.lineWidth=3,u.ctx.lineCap="round",u.ctx.stroke(),o=f)}),u.onPointerUp(()=>{t=!1,o=null}),u.onResize(()=>{u.clear("#1a1a2e")}),document.getElementById("canvas-clear").addEventListener("click",()=>{u.clear("#1a1a2e"),g=0});const b=T(document.getElementById("copy-demo-container"),{getText:`ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point(color = "#7EC8E3")`,label:"复制代码"}),n=T(document.getElementById("copy-demo-container"),{getText:"#7EC8E3",label:"复制色值"});w.push(()=>b.destroy(),()=>n.destroy());const v=document.getElementById("tab-result"),y=N(document.getElementById("tab-switcher-default"),{tabs:[{id:"scatter",label:"散点图"},{id:"bar",label:"柱状图"},{id:"line",label:"折线图"},{id:"boxplot",label:"箱线图"}],activeId:"scatter",onChange:h=>{v.textContent="当前选中："+h}});w.push(()=>y.destroy());const z=N(document.getElementById("tab-switcher-pill"),{tabs:[{id:"r",label:"R"},{id:"python",label:"Python"},{id:"julia",label:"Julia"}],activeId:"r",variant:"pill"});w.push(()=>z.destroy()),document.getElementById("open-modal-default").addEventListener("click",()=>{U({title:"图表导出设置",content:`
        <p style="margin-bottom:var(--space-md);">选择导出参数以获得最佳的出版品质。</p>
        <div style="margin-bottom:var(--space-sm);">
          <label style="font-size:var(--text-small);color:var(--text-on-dark-3);display:block;margin-bottom:4px;">格式</label>
          <select class="select" style="max-width:200px;">
            <option>PDF（矢量）</option><option>SVG（矢量）</option><option>PNG（位图）</option><option>TIFF（位图）</option>
          </select>
        </div>
        <div>
          <label style="font-size:var(--text-small);color:var(--text-on-dark-3);display:block;margin-bottom:4px;">DPI</label>
          <input class="input" type="number" value="300" style="max-width:120px;" inputmode="numeric" />
        </div>
      `})}),document.getElementById("open-modal-large").addEventListener("click",()=>{U({title:"配色方案浏览器",size:"large",content:`
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-md);">
          ${["Nature","Science","Cell","Lancet","JAMA","PNAS"].map(h=>`<div style="padding:var(--space-md);background:var(--bg-dark);border-radius:var(--radius-sm);border:1px solid var(--border-dark);">
              <p style="font-weight:500;margin-bottom:var(--space-xs);">${h}</p>
              <div style="display:flex;gap:4px;">${a.slice(0,4).map(f=>`<div style="width:24px;height:24px;border-radius:4px;background:${f};"></div>`).join("")}</div>
            </div>`).join("")}
        </div>
      `})});const X=ct(document.getElementById("accordion-container"),{items:[{id:"step1",title:"1. 选择图表类型",content:"<p>根据数据特征和要传达的信息，选择合适的图表类型。散点图适合展示两个连续变量的关系，柱状图适合分类比较。</p>"},{id:"step2",title:"2. 配色优化",content:"<p>使用感知均匀的配色方案（如 viridis），避免 rainbow 配色。确保色盲友好，考虑打印时的灰度效果。</p>"},{id:"step3",title:"3. 标注与排版",content:"<p>添加清晰的坐标轴标签、图例和标题。使用合适的字号（≥8pt），确保在缩小后仍可读。</p>"},{id:"step4",title:"4. 导出设置",content:"<p>矢量格式（PDF/SVG）用于期刊投稿，位图格式（PNG/TIFF）需 300+ DPI。注意文件大小限制。</p>"}],defaultOpen:"step1"});w.push(()=>X.destroy());const O=dt(document.getElementById("before-after-container"),{beforeContent:`<div style="width:100%;height:300px;background:linear-gradient(135deg,#2d2d2f,#1d1d1f);display:flex;align-items:center;justify-content:center;padding:var(--space-lg);">
      <div style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:var(--space-sm);">
          <div style="width:40px;height:80px;background:#ff0000;border-radius:4px;"></div>
          <div style="width:40px;height:120px;background:#00ff00;border-radius:4px;"></div>
          <div style="width:40px;height:60px;background:#0000ff;border-radius:4px;"></div>
          <div style="width:40px;height:100px;background:#ffff00;border-radius:4px;"></div>
        </div>
        <p style="color:var(--text-on-dark-3);font-size:var(--text-small);">默认配色</p>
      </div>
    </div>`,afterContent:`<div style="width:100%;height:300px;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;align-items:center;justify-content:center;padding:var(--space-lg);">
      <div style="text-align:center;">
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:var(--space-sm);">
          <div style="width:40px;height:80px;background:#7EC8E3;border-radius:4px;"></div>
          <div style="width:40px;height:120px;background:#95D5B2;border-radius:4px;"></div>
          <div style="width:40px;height:60px;background:#B8B8E8;border-radius:4px;"></div>
          <div style="width:40px;height:100px;background:#F0B27A;border-radius:4px;"></div>
        </div>
        <p style="color:var(--text-on-dark-2);font-size:var(--text-small);">优化配色</p>
      </div>
    </div>`,beforeLabel:"优化前",afterLabel:"优化后"});w.push(()=>O.destroy()),document.getElementById("toast-info").addEventListener("click",()=>M("图表已保存到本地",{type:"info"})),document.getElementById("toast-success").addEventListener("click",()=>M("配色方案已复制到剪贴板",{type:"success"})),document.getElementById("toast-error").addEventListener("click",()=>M("导出失败：DPI 超出限制",{type:"error"})),document.getElementById("toast-landscape").addEventListener("click",()=>M("横屏体验更佳",{type:"landscape"}));const Y=ut(document.getElementById("sticky-steps-container"),{heading:"图表美化流程",subheading:"5 步将默认图表升级到出版级",steps:[{title:"默认输出",description:"使用 ggplot2 默认主题输出图表",content:"<code>ggplot(data, aes(x, y)) + geom_point()</code>"},{title:"配色优化",description:"替换为感知均匀配色方案",content:"<code>+ scale_color_viridis_d()</code>"},{title:"字体调整",description:"设置合适的字号和字体",content:"<code>+ theme(text = element_text(size = 12))</code>"},{title:"布局重构",description:"调整图例位置和边距",content:'<code>+ theme(legend.position = "bottom")</code>'},{title:"细节打磨",description:"添加标注、调整坐标轴",content:'<code>+ labs(title = "...", caption = "Source: ...")</code>'}]});w.push(()=>Y.destroy());const J=document.getElementById("color-preview"),K=mt(document.getElementById("color-input-container"),{value:"#7EC8E3",label:"强调色",onChange:h=>{J.style.background=h}});w.push(()=>K.destroy());const Q=vt(document.getElementById("workshop-container"),{panels:[{id:"params",title:"参数面板",icon:"⚙",content:`<div style="font-size:var(--text-small);color:var(--text-on-dark-2);">
          <p style="margin-bottom:var(--space-sm);font-weight:500;color:var(--text-on-dark);">散点图参数</p>
          <label style="display:block;margin-bottom:var(--space-xs);color:var(--text-on-dark-3);">点大小</label>
          <input class="range" type="range" min="1" max="10" value="3" style="margin-bottom:var(--space-sm);" />
          <label style="display:block;margin-bottom:var(--space-xs);color:var(--text-on-dark-3);">透明度</label>
          <input class="range" type="range" min="0" max="100" value="80" />
        </div>`},{id:"preview",title:"图表预览",icon:"📊",content:`<div style="background:#1a1a2e;border-radius:var(--radius-sm);padding:var(--space-sm);overflow:hidden;">
          <svg viewBox="0 0 300 200" style="width:100%;height:auto;display:block;">
            <rect width="300" height="200" fill="#1a1a2e" rx="8"/>
            <line x1="40" y1="170" x2="280" y2="170" stroke="#424245" stroke-width="1"/>
            <line x1="40" y1="170" x2="40" y2="20" stroke="#424245" stroke-width="1"/>
            <circle cx="70" cy="130" r="5" fill="#7EC8E3" opacity="0.8"/><circle cx="100" cy="90" r="6" fill="#95D5B2" opacity="0.8"/>
            <circle cx="130" cy="110" r="4" fill="#B8B8E8" opacity="0.8"/><circle cx="160" cy="60" r="7" fill="#F0B27A" opacity="0.8"/>
            <circle cx="190" cy="80" r="5" fill="#7EC8E3" opacity="0.8"/><circle cx="220" cy="45" r="6" fill="#E07A7A" opacity="0.8"/>
            <circle cx="250" cy="70" r="4" fill="#95D5B2" opacity="0.8"/>
            <text x="160" y="190" fill="#6e6e73" font-size="10" text-anchor="middle" font-family="Inter,sans-serif">散点图预览</text>
          </svg>
        </div>`},{id:"code",title:"R 代码",icon:"💻",content:`<pre style="margin:0;font-size:13px;"><code>ggplot(mtcars, aes(wt, mpg)) +
  geom_point(
    size = 3,
    alpha = 0.8,
    color = "#7EC8E3"
  ) +
  theme_minimal()</code></pre>`}],defaultPanel:"preview"});w.push(()=>Q.destroy())}function It(){w.forEach(r=>r()),w=[],Z()}export{It as destroy,Bt as init,Lt as render};
