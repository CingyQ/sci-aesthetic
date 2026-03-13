function d(l,{getText:c,label:o="复制",successLabel:a="已复制",className:y=""}={}){const e=document.createElement("button");e.className=`copy-btn ${y}`.trim(),e.setAttribute("aria-label",o),e.innerHTML=`
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
    <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    <span class="copy-label">${o}</span>
  `;let t=null;async function s(){const p=typeof c=="function"?c():c,n=e.querySelector(".copy-label"),i=e.querySelector(".copy-icon"),r=e.querySelector(".check-icon");try{await navigator.clipboard.writeText(p),e.classList.add("copy-success"),n.textContent=a,i.style.display="none",r.style.display="block",t&&clearTimeout(t),t=setTimeout(()=>{e.classList.remove("copy-success"),n.textContent=o,i.style.display="",r.style.display="none"},2e3)}catch{e.classList.add("copy-error"),n.textContent="复制失败",t&&clearTimeout(t),t=setTimeout(()=>{e.classList.remove("copy-error"),n.textContent=o},2e3)}}return e.addEventListener("click",s),l.appendChild(e),{button:e,destroy(){t&&clearTimeout(t),e.removeEventListener("click",s),e.remove()}}}export{d as c};
