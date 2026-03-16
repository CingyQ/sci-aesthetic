function h(s,{beforeContent:f="",afterContent:d="",beforeLabel:c="Before",afterLabel:p="After",initialPosition:i=50}={}){const e=document.createElement("div");e.className="before-after",e.style.touchAction="pan-y",e.innerHTML=`
    <div class="before-after__after">${d}</div>
    <div class="before-after__before" style="clip-path:inset(0 ${100-i}% 0 0);">${f}</div>
    <div class="before-after__handle" style="left:${i}%;">
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
    <span class="before-after__label before-after__label--before">${c}</span>
    <span class="before-after__label before-after__label--after">${p}</span>
  `,s.appendChild(e);const v=e.querySelector(".before-after__before"),u=e.querySelector(".before-after__handle");let n=!1;function o(t){const r=Math.max(0,Math.min(100,t));v.style.clipPath=`inset(0 ${100-r}% 0 0)`,u.style.left=r+"%"}function a(t){const r=e.getBoundingClientRect();return(t.clientX-r.left)/r.width*100}function _(t){n=!0,e.setPointerCapture(t.pointerId),o(a(t))}function b(t){n&&(t.preventDefault(),o(a(t)))}function l(){n=!1}return e.addEventListener("pointerdown",_),e.addEventListener("pointermove",b),e.addEventListener("pointerup",l),e.addEventListener("pointercancel",l),{setPosition:o,destroy(){e.remove()}}}export{h as c};
