import{k as sa,g as Ve,f as B}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as Bt}from"./CodeEditor-CmZbxDVd.js";import{n as rt}from"./index-DQN0JRtp.js";import{l as pe,s as ne}from"./transform-ChPGlSkf.js";import{s as ca}from"./ramp-CDwHjghK.js";import{c as pa}from"./cross-DzXzbwB9.js";import{r as it,b as da}from"./band-DqVyTAN-.js";import{Y as ua}from"./YlOrRd-_z79I1LS.js";import{l as fa}from"./line-DQLATXjo.js";import{c as ma}from"./catmullRom-Dm0ttBHj.js";import"./colors-Cc3OSVma.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";function ga(a,e,t){return(e=ya(e))in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function ee(){return ee=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var o in t)({}).hasOwnProperty.call(t,o)&&(a[o]=t[o])}return a},ee.apply(null,arguments)}function $t(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(a);e&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(a,n).enumerable})),t.push.apply(t,o)}return t}function J(a){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?$t(Object(t),!0).forEach(function(o){ga(a,o,t[o])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):$t(Object(t)).forEach(function(o){Object.defineProperty(a,o,Object.getOwnPropertyDescriptor(t,o))})}return a}function ha(a,e){if(a==null)return{};var t,o,n=va(a,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(a);for(o=0;o<r.length;o++)t=r[o],e.indexOf(t)===-1&&{}.propertyIsEnumerable.call(a,t)&&(n[t]=a[t])}return n}function va(a,e){if(a==null)return{};var t={};for(var o in a)if({}.hasOwnProperty.call(a,o)){if(e.indexOf(o)!==-1)continue;t[o]=a[o]}return t}function ba(a,e){if(typeof a!="object"||!a)return a;var t=a[Symbol.toPrimitive];if(t!==void 0){var o=t.call(a,e);if(typeof o!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(a)}function ya(a){var e=ba(a,"string");return typeof e=="symbol"?e:e+""}function ht(a){"@babel/helpers - typeof";return ht=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ht(a)}var xa="1.15.7";function Z(a){if(typeof window<"u"&&window.navigator)return!!navigator.userAgent.match(a)}var te=Z(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),Ne=Z(/Edge/i),zt=Z(/firefox/i),Te=Z(/safari/i)&&!Z(/chrome/i)&&!Z(/android/i),St=Z(/iP(ad|od|hone)/i),Rt=Z(/chrome/i)&&Z(/android/i),qt={capture:!1,passive:!1};function S(a,e,t){a.addEventListener(e,t,!te&&qt)}function w(a,e,t){a.removeEventListener(e,t,!te&&qt)}function Ue(a,e){if(e){if(e[0]===">"&&(e=e.substring(1)),a)try{if(a.matches)return a.matches(e);if(a.msMatchesSelector)return a.msMatchesSelector(e);if(a.webkitMatchesSelector)return a.webkitMatchesSelector(e)}catch{return!1}return!1}}function Yt(a){return a.host&&a!==document&&a.host.nodeType&&a.host!==a?a.host:a.parentNode}function U(a,e,t,o){if(a){t=t||document;do{if(e!=null&&(e[0]===">"?a.parentNode===t&&Ue(a,e):Ue(a,e))||o&&a===t)return a;if(a===t)break}while(a=Yt(a))}return null}var Pt=/\s+/g;function Y(a,e,t){if(a&&e)if(a.classList)a.classList[t?"add":"remove"](e);else{var o=(" "+a.className+" ").replace(Pt," ").replace(" "+e+" "," ");a.className=(o+(t?" "+e:"")).replace(Pt," ")}}function b(a,e,t){var o=a&&a.style;if(o){if(t===void 0)return document.defaultView&&document.defaultView.getComputedStyle?t=document.defaultView.getComputedStyle(a,""):a.currentStyle&&(t=a.currentStyle),e===void 0?t:t[e];!(e in o)&&e.indexOf("webkit")===-1&&(e="-webkit-"+e),o[e]=t+(typeof t=="string"?"":"px")}}function ye(a,e){var t="";if(typeof a=="string")t=a;else do{var o=b(a,"transform");o&&o!=="none"&&(t=o+" "+t)}while(!e&&(a=a.parentNode));var n=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return n&&new n(t)}function Xt(a,e,t){if(a){var o=a.getElementsByTagName(e),n=0,r=o.length;if(t)for(;n<r;n++)t(o[n],n);return o}return[]}function K(){var a=document.scrollingElement;return a||document.documentElement}function z(a,e,t,o,n){if(!(!a.getBoundingClientRect&&a!==window)){var r,i,l,s,c,u,d;if(a!==window&&a.parentNode&&a!==K()?(r=a.getBoundingClientRect(),i=r.top,l=r.left,s=r.bottom,c=r.right,u=r.height,d=r.width):(i=0,l=0,s=window.innerHeight,c=window.innerWidth,u=window.innerHeight,d=window.innerWidth),(e||t)&&a!==window&&(n=n||a.parentNode,!te))do if(n&&n.getBoundingClientRect&&(b(n,"transform")!=="none"||t&&b(n,"position")!=="static")){var m=n.getBoundingClientRect();i-=m.top+parseInt(b(n,"border-top-width")),l-=m.left+parseInt(b(n,"border-left-width")),s=i+r.height,c=l+r.width;break}while(n=n.parentNode);if(o&&a!==window){var g=ye(n||a),f=g&&g.a,y=g&&g.d;g&&(i/=y,l/=f,d/=f,u/=y,s=i+u,c=l+d)}return{top:i,left:l,bottom:s,right:c,width:d,height:u}}}function Ot(a,e,t){for(var o=le(a,!0),n=z(a)[e];o;){var r=z(o)[t],i=void 0;if(i=n>=r,!i)return o;if(o===K())break;o=le(o,!1)}return!1}function xe(a,e,t,o){for(var n=0,r=0,i=a.children;r<i.length;){if(i[r].style.display!=="none"&&i[r]!==v.ghost&&(o||i[r]!==v.dragged)&&U(i[r],t.draggable,a,!1)){if(n===e)return i[r];n++}r++}return null}function _t(a,e){for(var t=a.lastElementChild;t&&(t===v.ghost||b(t,"display")==="none"||e&&!Ue(t,e));)t=t.previousElementSibling;return t||null}function H(a,e){var t=0;if(!a||!a.parentNode)return-1;for(;a=a.previousElementSibling;)a.nodeName.toUpperCase()!=="TEMPLATE"&&a!==v.clone&&(!e||Ue(a,e))&&t++;return t}function Nt(a){var e=0,t=0,o=K();if(a)do{var n=ye(a),r=n.a,i=n.d;e+=a.scrollLeft*r,t+=a.scrollTop*i}while(a!==o&&(a=a.parentNode));return[e,t]}function wa(a,e){for(var t in a)if(a.hasOwnProperty(t)){for(var o in e)if(e.hasOwnProperty(o)&&e[o]===a[t][o])return Number(t)}return-1}function le(a,e){if(!a||!a.getBoundingClientRect)return K();var t=a,o=!1;do if(t.clientWidth<t.scrollWidth||t.clientHeight<t.scrollHeight){var n=b(t);if(t.clientWidth<t.scrollWidth&&(n.overflowX=="auto"||n.overflowX=="scroll")||t.clientHeight<t.scrollHeight&&(n.overflowY=="auto"||n.overflowY=="scroll")){if(!t.getBoundingClientRect||t===document.body)return K();if(o||e)return t;o=!0}}while(t=t.parentNode);return K()}function Ea(a,e){if(a&&e)for(var t in e)e.hasOwnProperty(t)&&(a[t]=e[t]);return a}function lt(a,e){return Math.round(a.top)===Math.round(e.top)&&Math.round(a.left)===Math.round(e.left)&&Math.round(a.height)===Math.round(e.height)&&Math.round(a.width)===Math.round(e.width)}var Ae;function Ht(a,e){return function(){if(!Ae){var t=arguments,o=this;t.length===1?a.call(o,t[0]):a.apply(o,t),Ae=setTimeout(function(){Ae=void 0},e)}}}function Sa(){clearTimeout(Ae),Ae=void 0}function Gt(a,e,t){a.scrollLeft+=e,a.scrollTop+=t}function Wt(a){var e=window.Polymer,t=window.jQuery||window.Zepto;return e&&e.dom?e.dom(a).cloneNode(!0):t?t(a).clone(!0)[0]:a.cloneNode(!0)}function Vt(a,e,t){var o={};return Array.from(a.children).forEach(function(n){var r,i,l,s;if(!(!U(n,e.draggable,a,!1)||n.animated||n===t)){var c=z(n);o.left=Math.min((r=o.left)!==null&&r!==void 0?r:1/0,c.left),o.top=Math.min((i=o.top)!==null&&i!==void 0?i:1/0,c.top),o.right=Math.max((l=o.right)!==null&&l!==void 0?l:-1/0,c.right),o.bottom=Math.max((s=o.bottom)!==null&&s!==void 0?s:-1/0,c.bottom)}}),o.width=o.right-o.left,o.height=o.bottom-o.top,o.x=o.left,o.y=o.top,o}var q="Sortable"+new Date().getTime();function _a(){var a=[],e;return{captureAnimationState:function(){if(a=[],!!this.options.animation){var o=[].slice.call(this.el.children);o.forEach(function(n){if(!(b(n,"display")==="none"||n===v.ghost)){a.push({target:n,rect:z(n)});var r=J({},a[a.length-1].rect);if(n.thisAnimationDuration){var i=ye(n,!0);i&&(r.top-=i.f,r.left-=i.e)}n.fromRect=r}})}},addAnimationState:function(o){a.push(o)},removeAnimationState:function(o){a.splice(wa(a,{target:o}),1)},animateAll:function(o){var n=this;if(!this.options.animation){clearTimeout(e),typeof o=="function"&&o();return}var r=!1,i=0;a.forEach(function(l){var s=0,c=l.target,u=c.fromRect,d=z(c),m=c.prevFromRect,g=c.prevToRect,f=l.rect,y=ye(c,!0);y&&(d.top-=y.f,d.left-=y.e),c.toRect=d,c.thisAnimationDuration&&lt(m,d)&&!lt(u,d)&&(f.top-d.top)/(f.left-d.left)===(u.top-d.top)/(u.left-d.left)&&(s=ka(f,m,g,n.options)),lt(d,u)||(c.prevFromRect=u,c.prevToRect=d,s||(s=n.options.animation),n.animate(c,f,d,s)),s&&(r=!0,i=Math.max(i,s),clearTimeout(c.animationResetTimer),c.animationResetTimer=setTimeout(function(){c.animationTime=0,c.prevFromRect=null,c.fromRect=null,c.prevToRect=null,c.thisAnimationDuration=null},s),c.thisAnimationDuration=s)}),clearTimeout(e),r?e=setTimeout(function(){typeof o=="function"&&o()},i):typeof o=="function"&&o(),a=[]},animate:function(o,n,r,i){if(i){b(o,"transition",""),b(o,"transform","");var l=ye(this.el),s=l&&l.a,c=l&&l.d,u=(n.left-r.left)/(s||1),d=(n.top-r.top)/(c||1);o.animatingX=!!u,o.animatingY=!!d,b(o,"transform","translate3d("+u+"px,"+d+"px,0)"),this.forRepaintDummy=Da(o),b(o,"transition","transform "+i+"ms"+(this.options.easing?" "+this.options.easing:"")),b(o,"transform","translate3d(0,0,0)"),typeof o.animated=="number"&&clearTimeout(o.animated),o.animated=setTimeout(function(){b(o,"transition",""),b(o,"transform",""),o.animated=!1,o.animatingX=!1,o.animatingY=!1},i)}}}}function Da(a){return a.offsetWidth}function ka(a,e,t,o){return Math.sqrt(Math.pow(e.top-a.top,2)+Math.pow(e.left-a.left,2))/Math.sqrt(Math.pow(e.top-t.top,2)+Math.pow(e.left-t.left,2))*o.animation}var ge=[],st={initializeByDefault:!0},Fe={mount:function(e){for(var t in st)st.hasOwnProperty(t)&&!(t in e)&&(e[t]=st[t]);ge.forEach(function(o){if(o.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),ge.push(e)},pluginEvent:function(e,t,o){var n=this;this.eventCanceled=!1,o.cancel=function(){n.eventCanceled=!0};var r=e+"Global";ge.forEach(function(i){t[i.pluginName]&&(t[i.pluginName][r]&&t[i.pluginName][r](J({sortable:t},o)),t.options[i.pluginName]&&t[i.pluginName][e]&&t[i.pluginName][e](J({sortable:t},o)))})},initializePlugins:function(e,t,o,n){ge.forEach(function(l){var s=l.pluginName;if(!(!e.options[s]&&!l.initializeByDefault)){var c=new l(e,t,e.options);c.sortable=e,c.options=e.options,e[s]=c,ee(o,c.defaults)}});for(var r in e.options)if(e.options.hasOwnProperty(r)){var i=this.modifyOption(e,r,e.options[r]);typeof i<"u"&&(e.options[r]=i)}},getEventProperties:function(e,t){var o={};return ge.forEach(function(n){typeof n.eventProperties=="function"&&ee(o,n.eventProperties.call(t[n.pluginName],e))}),o},modifyOption:function(e,t,o){var n;return ge.forEach(function(r){e[r.pluginName]&&r.optionListeners&&typeof r.optionListeners[t]=="function"&&(n=r.optionListeners[t].call(e[r.pluginName],o))}),n}};function Ca(a){var e=a.sortable,t=a.rootEl,o=a.name,n=a.targetEl,r=a.cloneEl,i=a.toEl,l=a.fromEl,s=a.oldIndex,c=a.newIndex,u=a.oldDraggableIndex,d=a.newDraggableIndex,m=a.originalEvent,g=a.putSortable,f=a.extraEventProperties;if(e=e||t&&t[q],!!e){var y,A=e.options,P="on"+o.charAt(0).toUpperCase()+o.substr(1);window.CustomEvent&&!te&&!Ne?y=new CustomEvent(o,{bubbles:!0,cancelable:!0}):(y=document.createEvent("Event"),y.initEvent(o,!0,!0)),y.to=i||t,y.from=l||t,y.item=n||t,y.clone=r,y.oldIndex=s,y.newIndex=c,y.oldDraggableIndex=u,y.newDraggableIndex=d,y.originalEvent=m,y.pullMode=g?g.lastPutMode:void 0;var E=J(J({},f),Fe.getEventProperties(o,e));for(var _ in E)y[_]=E[_];t&&t.dispatchEvent(y),A[P]&&A[P].call(e,y)}}var Ta=["evt"],R=function(e,t){var o=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},n=o.evt,r=ha(o,Ta);Fe.pluginEvent.bind(v)(e,t,J({dragEl:p,parentEl:T,ghostEl:x,rootEl:k,nextEl:fe,lastDownEl:Xe,cloneEl:C,cloneHidden:ie,dragStarted:De,putSortable:N,activeSortable:v.active,originalEvent:n,oldIndex:be,oldDraggableIndex:Ie,newIndex:X,newDraggableIndex:re,hideGhostForTarget:Qt,unhideGhostForTarget:Zt,cloneNowHidden:function(){ie=!0},cloneNowShown:function(){ie=!1},dispatchSortableEvent:function(l){M({sortable:t,name:l,originalEvent:n})}},r))};function M(a){Ca(J({putSortable:N,cloneEl:C,targetEl:p,rootEl:k,oldIndex:be,oldDraggableIndex:Ie,newIndex:X,newDraggableIndex:re},a))}var p,T,x,k,fe,Xe,C,ie,be,X,Ie,re,je,N,ve=!1,Ke=!1,Je=[],de,V,ct,pt,Ft,Mt,De,he,Be,$e=!1,Le=!1,He,F,dt=[],vt=!1,Qe=[],nt=typeof document<"u",Re=St,jt=Ne||te?"cssFloat":"float",Aa=nt&&!Rt&&!St&&"draggable"in document.createElement("div"),Ut=(function(){if(nt){if(te)return!1;var a=document.createElement("x");return a.style.cssText="pointer-events:auto",a.style.pointerEvents==="auto"}})(),Kt=function(e,t){var o=b(e),n=parseInt(o.width)-parseInt(o.paddingLeft)-parseInt(o.paddingRight)-parseInt(o.borderLeftWidth)-parseInt(o.borderRightWidth),r=xe(e,0,t),i=xe(e,1,t),l=r&&b(r),s=i&&b(i),c=l&&parseInt(l.marginLeft)+parseInt(l.marginRight)+z(r).width,u=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+z(i).width;if(o.display==="flex")return o.flexDirection==="column"||o.flexDirection==="column-reverse"?"vertical":"horizontal";if(o.display==="grid")return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&l.float&&l.float!=="none"){var d=l.float==="left"?"left":"right";return i&&(s.clear==="both"||s.clear===d)?"vertical":"horizontal"}return r&&(l.display==="block"||l.display==="flex"||l.display==="table"||l.display==="grid"||c>=n&&o[jt]==="none"||i&&o[jt]==="none"&&c+u>n)?"vertical":"horizontal"},Ia=function(e,t,o){var n=o?e.left:e.top,r=o?e.right:e.bottom,i=o?e.width:e.height,l=o?t.left:t.top,s=o?t.right:t.bottom,c=o?t.width:t.height;return n===l||r===s||n+i/2===l+c/2},Ba=function(e,t){var o;return Je.some(function(n){var r=n[q].options.emptyInsertThreshold;if(!(!r||_t(n))){var i=z(n),l=e>=i.left-r&&e<=i.right+r,s=t>=i.top-r&&t<=i.bottom+r;if(l&&s)return o=n}}),o},Jt=function(e){function t(r,i){return function(l,s,c,u){var d=l.options.group.name&&s.options.group.name&&l.options.group.name===s.options.group.name;if(r==null&&(i||d))return!0;if(r==null||r===!1)return!1;if(i&&r==="clone")return r;if(typeof r=="function")return t(r(l,s,c,u),i)(l,s,c,u);var m=(i?l:s).options.group.name;return r===!0||typeof r=="string"&&r===m||r.join&&r.indexOf(m)>-1}}var o={},n=e.group;(!n||ht(n)!="object")&&(n={name:n}),o.name=n.name,o.checkPull=t(n.pull,!0),o.checkPut=t(n.put),o.revertClone=n.revertClone,e.group=o},Qt=function(){!Ut&&x&&b(x,"display","none")},Zt=function(){!Ut&&x&&b(x,"display","")};nt&&!Rt&&document.addEventListener("click",function(a){if(Ke)return a.preventDefault(),a.stopPropagation&&a.stopPropagation(),a.stopImmediatePropagation&&a.stopImmediatePropagation(),Ke=!1,!1},!0);var ue=function(e){if(p){e=e.touches?e.touches[0]:e;var t=Ba(e.clientX,e.clientY);if(t){var o={};for(var n in e)e.hasOwnProperty(n)&&(o[n]=e[n]);o.target=o.rootEl=t,o.preventDefault=void 0,o.stopPropagation=void 0,t[q]._onDragOver(o)}}},$a=function(e){p&&p.parentNode[q]._isOutsideThisEl(e.target)};function v(a,e){if(!(a&&a.nodeType&&a.nodeType===1))throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(a));this.el=a,this.options=e=ee({},e),a[q]=this;var t={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(a.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Kt(a,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(i,l){i.setData("Text",l.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:v.supportPointer!==!1&&"PointerEvent"in window&&(!Te||St),emptyInsertThreshold:5};Fe.initializePlugins(this,a,t);for(var o in t)!(o in e)&&(e[o]=t[o]);Jt(e);for(var n in this)n.charAt(0)==="_"&&typeof this[n]=="function"&&(this[n]=this[n].bind(this));this.nativeDraggable=e.forceFallback?!1:Aa,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?S(a,"pointerdown",this._onTapStart):(S(a,"mousedown",this._onTapStart),S(a,"touchstart",this._onTapStart)),this.nativeDraggable&&(S(a,"dragover",this),S(a,"dragenter",this)),Je.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),ee(this,_a())}v.prototype={constructor:v,_isOutsideThisEl:function(e){!this.el.contains(e)&&e!==this.el&&(he=null)},_getDirection:function(e,t){return typeof this.options.direction=="function"?this.options.direction.call(this,e,t,p):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,o=this.el,n=this.options,r=n.preventOnFilter,i=e.type,l=e.touches&&e.touches[0]||e.pointerType&&e.pointerType==="touch"&&e,s=(l||e).target,c=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,u=n.filter;if(La(o),!p&&!(/mousedown|pointerdown/.test(i)&&e.button!==0||n.disabled)&&!c.isContentEditable&&!(!this.nativeDraggable&&Te&&s&&s.tagName.toUpperCase()==="SELECT")&&(s=U(s,n.draggable,o,!1),!(s&&s.animated)&&Xe!==s)){if(be=H(s),Ie=H(s,n.draggable),typeof u=="function"){if(u.call(this,e,s,this)){M({sortable:t,rootEl:c,name:"filter",targetEl:s,toEl:o,fromEl:o}),R("filter",t,{evt:e}),r&&e.preventDefault();return}}else if(u&&(u=u.split(",").some(function(d){if(d=U(c,d.trim(),o,!1),d)return M({sortable:t,rootEl:d,name:"filter",targetEl:s,fromEl:o,toEl:o}),R("filter",t,{evt:e}),!0}),u)){r&&e.preventDefault();return}n.handle&&!U(c,n.handle,o,!1)||this._prepareDragStart(e,l,s)}}},_prepareDragStart:function(e,t,o){var n=this,r=n.el,i=n.options,l=r.ownerDocument,s;if(o&&!p&&o.parentNode===r){var c=z(o);if(k=r,p=o,T=p.parentNode,fe=p.nextSibling,Xe=o,je=i.group,v.dragged=p,de={target:p,clientX:(t||e).clientX,clientY:(t||e).clientY},Ft=de.clientX-c.left,Mt=de.clientY-c.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,p.style["will-change"]="all",s=function(){if(R("delayEnded",n,{evt:e}),v.eventCanceled){n._onDrop();return}n._disableDelayedDragEvents(),!zt&&n.nativeDraggable&&(p.draggable=!0),n._triggerDragStart(e,t),M({sortable:n,name:"choose",originalEvent:e}),Y(p,i.chosenClass,!0)},i.ignore.split(",").forEach(function(u){Xt(p,u.trim(),ut)}),S(l,"dragover",ue),S(l,"mousemove",ue),S(l,"touchmove",ue),i.supportPointer?(S(l,"pointerup",n._onDrop),!this.nativeDraggable&&S(l,"pointercancel",n._onDrop)):(S(l,"mouseup",n._onDrop),S(l,"touchend",n._onDrop),S(l,"touchcancel",n._onDrop)),zt&&this.nativeDraggable&&(this.options.touchStartThreshold=4,p.draggable=!0),R("delayStart",this,{evt:e}),i.delay&&(!i.delayOnTouchOnly||t)&&(!this.nativeDraggable||!(Ne||te))){if(v.eventCanceled){this._onDrop();return}i.supportPointer?(S(l,"pointerup",n._disableDelayedDrag),S(l,"pointercancel",n._disableDelayedDrag)):(S(l,"mouseup",n._disableDelayedDrag),S(l,"touchend",n._disableDelayedDrag),S(l,"touchcancel",n._disableDelayedDrag)),S(l,"mousemove",n._delayedDragTouchMoveHandler),S(l,"touchmove",n._delayedDragTouchMoveHandler),i.supportPointer&&S(l,"pointermove",n._delayedDragTouchMoveHandler),n._dragStartTimer=setTimeout(s,i.delay)}else s()}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){p&&ut(p),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;w(e,"mouseup",this._disableDelayedDrag),w(e,"touchend",this._disableDelayedDrag),w(e,"touchcancel",this._disableDelayedDrag),w(e,"pointerup",this._disableDelayedDrag),w(e,"pointercancel",this._disableDelayedDrag),w(e,"mousemove",this._delayedDragTouchMoveHandler),w(e,"touchmove",this._delayedDragTouchMoveHandler),w(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||e.pointerType=="touch"&&e,!this.nativeDraggable||t?this.options.supportPointer?S(document,"pointermove",this._onTouchMove):t?S(document,"touchmove",this._onTouchMove):S(document,"mousemove",this._onTouchMove):(S(p,"dragend",this),S(k,"dragstart",this._onDragStart));try{document.selection?Ge(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch{}},_dragStarted:function(e,t){if(ve=!1,k&&p){R("dragStarted",this,{evt:t}),this.nativeDraggable&&S(document,"dragover",$a);var o=this.options;!e&&Y(p,o.dragClass,!1),Y(p,o.ghostClass,!0),v.active=this,e&&this._appendGhost(),M({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(V){this._lastX=V.clientX,this._lastY=V.clientY,Qt();for(var e=document.elementFromPoint(V.clientX,V.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(V.clientX,V.clientY),e!==t);)t=e;if(p.parentNode[q]._isOutsideThisEl(e),t)do{if(t[q]){var o=void 0;if(o=t[q]._onDragOver({clientX:V.clientX,clientY:V.clientY,target:e,rootEl:t}),o&&!this.options.dragoverBubble)break}e=t}while(t=Yt(t));Zt()}},_onTouchMove:function(e){if(de){var t=this.options,o=t.fallbackTolerance,n=t.fallbackOffset,r=e.touches?e.touches[0]:e,i=x&&ye(x,!0),l=x&&i&&i.a,s=x&&i&&i.d,c=Re&&F&&Nt(F),u=(r.clientX-de.clientX+n.x)/(l||1)+(c?c[0]-dt[0]:0)/(l||1),d=(r.clientY-de.clientY+n.y)/(s||1)+(c?c[1]-dt[1]:0)/(s||1);if(!v.active&&!ve){if(o&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<o)return;this._onDragStart(e,!0)}if(x){i?(i.e+=u-(ct||0),i.f+=d-(pt||0)):i={a:1,b:0,c:0,d:1,e:u,f:d};var m="matrix(".concat(i.a,",").concat(i.b,",").concat(i.c,",").concat(i.d,",").concat(i.e,",").concat(i.f,")");b(x,"webkitTransform",m),b(x,"mozTransform",m),b(x,"msTransform",m),b(x,"transform",m),ct=u,pt=d,V=r}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!x){var e=this.options.fallbackOnBody?document.body:k,t=z(p,!0,Re,!0,e),o=this.options;if(Re){for(F=e;b(F,"position")==="static"&&b(F,"transform")==="none"&&F!==document;)F=F.parentNode;F!==document.body&&F!==document.documentElement?(F===document&&(F=K()),t.top+=F.scrollTop,t.left+=F.scrollLeft):F=K(),dt=Nt(F)}x=p.cloneNode(!0),Y(x,o.ghostClass,!1),Y(x,o.fallbackClass,!0),Y(x,o.dragClass,!0),b(x,"transition",""),b(x,"transform",""),b(x,"box-sizing","border-box"),b(x,"margin",0),b(x,"top",t.top),b(x,"left",t.left),b(x,"width",t.width),b(x,"height",t.height),b(x,"opacity","0.8"),b(x,"position",Re?"absolute":"fixed"),b(x,"zIndex","100000"),b(x,"pointerEvents","none"),v.ghost=x,e.appendChild(x),b(x,"transform-origin",Ft/parseInt(x.style.width)*100+"% "+Mt/parseInt(x.style.height)*100+"%")}},_onDragStart:function(e,t){var o=this,n=e.dataTransfer,r=o.options;if(R("dragStart",this,{evt:e}),v.eventCanceled){this._onDrop();return}R("setupClone",this),v.eventCanceled||(C=Wt(p),C.removeAttribute("id"),C.draggable=!1,C.style["will-change"]="",this._hideClone(),Y(C,this.options.chosenClass,!1),v.clone=C),o.cloneId=Ge(function(){R("clone",o),!v.eventCanceled&&(o.options.removeCloneOnHide||k.insertBefore(C,p),o._hideClone(),M({sortable:o,name:"clone"}))}),!t&&Y(p,r.dragClass,!0),t?(Ke=!0,o._loopId=setInterval(o._emulateDragOver,50)):(w(document,"mouseup",o._onDrop),w(document,"touchend",o._onDrop),w(document,"touchcancel",o._onDrop),n&&(n.effectAllowed="move",r.setData&&r.setData.call(o,n,p)),S(document,"drop",o),b(p,"transform","translateZ(0)")),ve=!0,o._dragStartId=Ge(o._dragStarted.bind(o,t,e)),S(document,"selectstart",o),De=!0,window.getSelection().removeAllRanges(),Te&&b(document.body,"user-select","none")},_onDragOver:function(e){var t=this.el,o=e.target,n,r,i,l=this.options,s=l.group,c=v.active,u=je===s,d=l.sort,m=N||c,g,f=this,y=!1;if(vt)return;function A(_e,ia){R(_e,f,J({evt:e,isOwner:u,axis:g?"vertical":"horizontal",revert:i,dragRect:n,targetRect:r,canSort:d,fromSortable:m,target:o,completed:E,onMove:function(It,la){return qe(k,t,p,n,It,z(It),e,la)},changed:_},ia))}function P(){A("dragOverAnimationCapture"),f.captureAnimationState(),f!==m&&m.captureAnimationState()}function E(_e){return A("dragOverCompleted",{insertion:_e}),_e&&(u?c._hideClone():c._showClone(f),f!==m&&(Y(p,N?N.options.ghostClass:c.options.ghostClass,!1),Y(p,l.ghostClass,!0)),N!==f&&f!==v.active?N=f:f===v.active&&N&&(N=null),m===f&&(f._ignoreWhileAnimating=o),f.animateAll(function(){A("dragOverAnimationComplete"),f._ignoreWhileAnimating=null}),f!==m&&(m.animateAll(),m._ignoreWhileAnimating=null)),(o===p&&!p.animated||o===t&&!o.animated)&&(he=null),!l.dragoverBubble&&!e.rootEl&&o!==document&&(p.parentNode[q]._isOutsideThisEl(e.target),!_e&&ue(e)),!l.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),y=!0}function _(){X=H(p),re=H(p,l.draggable),M({sortable:f,name:"change",toEl:t,newIndex:X,newDraggableIndex:re,originalEvent:e})}if(e.preventDefault!==void 0&&e.cancelable&&e.preventDefault(),o=U(o,l.draggable,t,!0),A("dragOver"),v.eventCanceled)return y;if(p.contains(e.target)||o.animated&&o.animatingX&&o.animatingY||f._ignoreWhileAnimating===o)return E(!1);if(Ke=!1,c&&!l.disabled&&(u?d||(i=T!==k):N===this||(this.lastPutMode=je.checkPull(this,c,p,e))&&s.checkPut(this,c,p,e))){if(g=this._getDirection(e,o)==="vertical",n=z(p),A("dragOverValid"),v.eventCanceled)return y;if(i)return T=k,P(),this._hideClone(),A("revert"),v.eventCanceled||(fe?k.insertBefore(p,fe):k.appendChild(p)),E(!0);var O=_t(t,l.draggable);if(!O||Na(e,g,this)&&!O.animated){if(O===p)return E(!1);if(O&&t===e.target&&(o=O),o&&(r=z(o)),qe(k,t,p,n,o,r,e,!!o)!==!1)return P(),O&&O.nextSibling?t.insertBefore(p,O.nextSibling):t.appendChild(p),T=t,_(),E(!0)}else if(O&&Oa(e,g,this)){var G=xe(t,0,l,!0);if(G===p)return E(!1);if(o=G,r=z(o),qe(k,t,p,n,o,r,e,!1)!==!1)return P(),t.insertBefore(p,G),T=t,_(),E(!0)}else if(o.parentNode===t){r=z(o);var L=0,W,I=p.parentNode!==t,D=!Ia(p.animated&&p.toRect||n,o.animated&&o.toRect||r,g),we=g?"top":"left",ae=Ot(o,"top","top")||Ot(p,"top","top"),Ee=ae?ae.scrollTop:void 0;he!==o&&(W=r[we],$e=!1,Le=!D&&l.invertSwap||I),L=Fa(e,o,r,g,D?1:l.swapThreshold,l.invertedSwapThreshold==null?l.swapThreshold:l.invertedSwapThreshold,Le,he===o);var Q;if(L!==0){var ce=H(p);do ce-=L,Q=T.children[ce];while(Q&&(b(Q,"display")==="none"||Q===x))}if(L===0||Q===o)return E(!1);he=o,Be=L;var Se=o.nextElementSibling,oe=!1;oe=L===1;var Me=qe(k,t,p,n,o,r,e,oe);if(Me!==!1)return(Me===1||Me===-1)&&(oe=Me===1),vt=!0,setTimeout(Pa,30),P(),oe&&!Se?t.appendChild(p):o.parentNode.insertBefore(p,oe?Se:o),ae&&Gt(ae,0,Ee-ae.scrollTop),T=p.parentNode,W!==void 0&&!Le&&(He=Math.abs(W-z(o)[we])),_(),E(!0)}if(t.contains(p))return E(!1)}return!1},_ignoreWhileAnimating:null,_offMoveEvents:function(){w(document,"mousemove",this._onTouchMove),w(document,"touchmove",this._onTouchMove),w(document,"pointermove",this._onTouchMove),w(document,"dragover",ue),w(document,"mousemove",ue),w(document,"touchmove",ue)},_offUpEvents:function(){var e=this.el.ownerDocument;w(e,"mouseup",this._onDrop),w(e,"touchend",this._onDrop),w(e,"pointerup",this._onDrop),w(e,"pointercancel",this._onDrop),w(e,"touchcancel",this._onDrop),w(document,"selectstart",this)},_onDrop:function(e){var t=this.el,o=this.options;if(X=H(p),re=H(p,o.draggable),R("drop",this,{evt:e}),T=p&&p.parentNode,X=H(p),re=H(p,o.draggable),v.eventCanceled){this._nulling();return}ve=!1,Le=!1,$e=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),bt(this.cloneId),bt(this._dragStartId),this.nativeDraggable&&(w(document,"drop",this),w(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),Te&&b(document.body,"user-select",""),b(p,"transform",""),e&&(De&&(e.cancelable&&e.preventDefault(),!o.dropBubble&&e.stopPropagation()),x&&x.parentNode&&x.parentNode.removeChild(x),(k===T||N&&N.lastPutMode!=="clone")&&C&&C.parentNode&&C.parentNode.removeChild(C),p&&(this.nativeDraggable&&w(p,"dragend",this),ut(p),p.style["will-change"]="",De&&!ve&&Y(p,N?N.options.ghostClass:this.options.ghostClass,!1),Y(p,this.options.chosenClass,!1),M({sortable:this,name:"unchoose",toEl:T,newIndex:null,newDraggableIndex:null,originalEvent:e}),k!==T?(X>=0&&(M({rootEl:T,name:"add",toEl:T,fromEl:k,originalEvent:e}),M({sortable:this,name:"remove",toEl:T,originalEvent:e}),M({rootEl:T,name:"sort",toEl:T,fromEl:k,originalEvent:e}),M({sortable:this,name:"sort",toEl:T,originalEvent:e})),N&&N.save()):X!==be&&X>=0&&(M({sortable:this,name:"update",toEl:T,originalEvent:e}),M({sortable:this,name:"sort",toEl:T,originalEvent:e})),v.active&&((X==null||X===-1)&&(X=be,re=Ie),M({sortable:this,name:"end",toEl:T,originalEvent:e}),this.save()))),this._nulling()},_nulling:function(){R("nulling",this),k=p=T=x=fe=C=Xe=ie=de=V=De=X=re=be=Ie=he=Be=N=je=v.dragged=v.ghost=v.clone=v.active=null;var e=this.el;Qe.forEach(function(t){e.contains(t)&&(t.checked=!0)}),Qe.length=ct=pt=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":p&&(this._onDragOver(e),za(e));break;case"selectstart":e.preventDefault();break}},toArray:function(){for(var e=[],t,o=this.el.children,n=0,r=o.length,i=this.options;n<r;n++)t=o[n],U(t,i.draggable,this.el,!1)&&e.push(t.getAttribute(i.dataIdAttr)||ja(t));return e},sort:function(e,t){var o={},n=this.el;this.toArray().forEach(function(r,i){var l=n.children[i];U(l,this.options.draggable,n,!1)&&(o[r]=l)},this),t&&this.captureAnimationState(),e.forEach(function(r){o[r]&&(n.removeChild(o[r]),n.appendChild(o[r]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return U(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var o=this.options;if(t===void 0)return o[e];var n=Fe.modifyOption(this,e,t);typeof n<"u"?o[e]=n:o[e]=t,e==="group"&&Jt(o)},destroy:function(){R("destroy",this);var e=this.el;e[q]=null,w(e,"mousedown",this._onTapStart),w(e,"touchstart",this._onTapStart),w(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(w(e,"dragover",this),w(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),Je.splice(Je.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!ie){if(R("hideClone",this),v.eventCanceled)return;b(C,"display","none"),this.options.removeCloneOnHide&&C.parentNode&&C.parentNode.removeChild(C),ie=!0}},_showClone:function(e){if(e.lastPutMode!=="clone"){this._hideClone();return}if(ie){if(R("showClone",this),v.eventCanceled)return;p.parentNode==k&&!this.options.group.revertClone?k.insertBefore(C,p):fe?k.insertBefore(C,fe):k.appendChild(C),this.options.group.revertClone&&this.animate(p,C),b(C,"display",""),ie=!1}}};function za(a){a.dataTransfer&&(a.dataTransfer.dropEffect="move"),a.cancelable&&a.preventDefault()}function qe(a,e,t,o,n,r,i,l){var s,c=a[q],u=c.options.onMove,d;return window.CustomEvent&&!te&&!Ne?s=new CustomEvent("move",{bubbles:!0,cancelable:!0}):(s=document.createEvent("Event"),s.initEvent("move",!0,!0)),s.to=e,s.from=a,s.dragged=t,s.draggedRect=o,s.related=n||e,s.relatedRect=r||z(e),s.willInsertAfter=l,s.originalEvent=i,a.dispatchEvent(s),u&&(d=u.call(c,s,i)),d}function ut(a){a.draggable=!1}function Pa(){vt=!1}function Oa(a,e,t){var o=z(xe(t.el,0,t.options,!0)),n=Vt(t.el,t.options,x),r=10;return e?a.clientX<n.left-r||a.clientY<o.top&&a.clientX<o.right:a.clientY<n.top-r||a.clientY<o.bottom&&a.clientX<o.left}function Na(a,e,t){var o=z(_t(t.el,t.options.draggable)),n=Vt(t.el,t.options,x),r=10;return e?a.clientX>n.right+r||a.clientY>o.bottom&&a.clientX>o.left:a.clientY>n.bottom+r||a.clientX>o.right&&a.clientY>o.top}function Fa(a,e,t,o,n,r,i,l){var s=o?a.clientY:a.clientX,c=o?t.height:t.width,u=o?t.top:t.left,d=o?t.bottom:t.right,m=!1;if(!i){if(l&&He<c*n){if(!$e&&(Be===1?s>u+c*r/2:s<d-c*r/2)&&($e=!0),$e)m=!0;else if(Be===1?s<u+He:s>d-He)return-Be}else if(s>u+c*(1-n)/2&&s<d-c*(1-n)/2)return Ma(e)}return m=m||i,m&&(s<u+c*r/2||s>d-c*r/2)?s>u+c/2?1:-1:0}function Ma(a){return H(p)<H(a)?1:-1}function ja(a){for(var e=a.tagName+a.className+a.src+a.href+a.textContent,t=e.length,o=0;t--;)o+=e.charCodeAt(t);return o.toString(36)}function La(a){Qe.length=0;for(var e=a.getElementsByTagName("input"),t=e.length;t--;){var o=e[t];o.checked&&Qe.push(o)}}function Ge(a){return setTimeout(a,0)}function bt(a){return clearTimeout(a)}nt&&S(document,"touchmove",function(a){(v.active||ve)&&a.cancelable&&a.preventDefault()});v.utils={on:S,off:w,css:b,find:Xt,is:function(e,t){return!!U(e,t,e,!1)},extend:Ea,throttle:Ht,closest:U,toggleClass:Y,clone:Wt,index:H,nextTick:Ge,cancelNextTick:bt,detectDirection:Kt,getChild:xe,expando:q};v.get=function(a){return a[q]};v.mount=function(){for(var a=arguments.length,e=new Array(a),t=0;t<a;t++)e[t]=arguments[t];e[0].constructor===Array&&(e=e[0]),e.forEach(function(o){if(!o.prototype||!o.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));o.utils&&(v.utils=J(J({},v.utils),o.utils)),Fe.mount(o)})};v.create=function(a,e){return new v(a,e)};v.version=xa;var $=[],ke,yt,xt=!1,ft,mt,Ze,Ce;function Ra(){function a(){this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0};for(var e in this)e.charAt(0)==="_"&&typeof this[e]=="function"&&(this[e]=this[e].bind(this))}return a.prototype={dragStarted:function(t){var o=t.originalEvent;this.sortable.nativeDraggable?S(document,"dragover",this._handleAutoScroll):this.options.supportPointer?S(document,"pointermove",this._handleFallbackAutoScroll):o.touches?S(document,"touchmove",this._handleFallbackAutoScroll):S(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(t){var o=t.originalEvent;!this.options.dragOverBubble&&!o.rootEl&&this._handleAutoScroll(o)},drop:function(){this.sortable.nativeDraggable?w(document,"dragover",this._handleAutoScroll):(w(document,"pointermove",this._handleFallbackAutoScroll),w(document,"touchmove",this._handleFallbackAutoScroll),w(document,"mousemove",this._handleFallbackAutoScroll)),Lt(),We(),Sa()},nulling:function(){Ze=yt=ke=xt=Ce=ft=mt=null,$.length=0},_handleFallbackAutoScroll:function(t){this._handleAutoScroll(t,!0)},_handleAutoScroll:function(t,o){var n=this,r=(t.touches?t.touches[0]:t).clientX,i=(t.touches?t.touches[0]:t).clientY,l=document.elementFromPoint(r,i);if(Ze=t,o||this.options.forceAutoScrollFallback||Ne||te||Te){gt(t,this.options,l,o);var s=le(l,!0);xt&&(!Ce||r!==ft||i!==mt)&&(Ce&&Lt(),Ce=setInterval(function(){var c=le(document.elementFromPoint(r,i),!0);c!==s&&(s=c,We()),gt(t,n.options,c,o)},10),ft=r,mt=i)}else{if(!this.options.bubbleScroll||le(l,!0)===K()){We();return}gt(t,this.options,le(l,!1),!1)}}},ee(a,{pluginName:"scroll",initializeByDefault:!0})}function We(){$.forEach(function(a){clearInterval(a.pid)}),$=[]}function Lt(){clearInterval(Ce)}var gt=Ht(function(a,e,t,o){if(e.scroll){var n=(a.touches?a.touches[0]:a).clientX,r=(a.touches?a.touches[0]:a).clientY,i=e.scrollSensitivity,l=e.scrollSpeed,s=K(),c=!1,u;yt!==t&&(yt=t,We(),ke=e.scroll,u=e.scrollFn,ke===!0&&(ke=le(t,!0)));var d=0,m=ke;do{var g=m,f=z(g),y=f.top,A=f.bottom,P=f.left,E=f.right,_=f.width,O=f.height,G=void 0,L=void 0,W=g.scrollWidth,I=g.scrollHeight,D=b(g),we=g.scrollLeft,ae=g.scrollTop;g===s?(G=_<W&&(D.overflowX==="auto"||D.overflowX==="scroll"||D.overflowX==="visible"),L=O<I&&(D.overflowY==="auto"||D.overflowY==="scroll"||D.overflowY==="visible")):(G=_<W&&(D.overflowX==="auto"||D.overflowX==="scroll"),L=O<I&&(D.overflowY==="auto"||D.overflowY==="scroll"));var Ee=G&&(Math.abs(E-n)<=i&&we+_<W)-(Math.abs(P-n)<=i&&!!we),Q=L&&(Math.abs(A-r)<=i&&ae+O<I)-(Math.abs(y-r)<=i&&!!ae);if(!$[d])for(var ce=0;ce<=d;ce++)$[ce]||($[ce]={});($[d].vx!=Ee||$[d].vy!=Q||$[d].el!==g)&&($[d].el=g,$[d].vx=Ee,$[d].vy=Q,clearInterval($[d].pid),(Ee!=0||Q!=0)&&(c=!0,$[d].pid=setInterval((function(){o&&this.layer===0&&v.active._onTouchMove(Ze);var Se=$[this.layer].vy?$[this.layer].vy*l:0,oe=$[this.layer].vx?$[this.layer].vx*l:0;typeof u=="function"&&u.call(v.dragged.parentNode[q],oe,Se,a,Ze,$[this.layer].el)!=="continue"||Gt($[this.layer].el,oe,Se)}).bind({layer:d}),24))),d++}while(e.bubbleScroll&&m!==s&&(m=le(m,!1)));xt=c}},30),ea=function(e){var t=e.originalEvent,o=e.putSortable,n=e.dragEl,r=e.activeSortable,i=e.dispatchSortableEvent,l=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var c=o||r;l();var u=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,d=document.elementFromPoint(u.clientX,u.clientY);s(),c&&!c.el.contains(d)&&(i("spill"),this.onSpill({dragEl:n,putSortable:o}))}};function Dt(){}Dt.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,o=e.putSortable;this.sortable.captureAnimationState(),o&&o.captureAnimationState();var n=xe(this.sortable.el,this.startIndex,this.options);n?this.sortable.el.insertBefore(t,n):this.sortable.el.appendChild(t),this.sortable.animateAll(),o&&o.animateAll()},drop:ea};ee(Dt,{pluginName:"revertOnSpill"});function kt(){}kt.prototype={onSpill:function(e){var t=e.dragEl,o=e.putSortable,n=o||this.sortable;n.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),n.animateAll()},drop:ea};ee(kt,{pluginName:"removeOnSpill"});v.mount(new Ra);v.mount(kt,Dt);let wt=[],Pe=[],ze=null,et=[],tt=[],at=null,ot=null,h={panelCount:4,layoutId:"2x2",cells:[],spacing:12,showLabels:!0,preset:"nature-double"};function j(a,e,t,o){a&&(a.addEventListener(e,t,o),wt.push({el:a,type:e,fn:t,opts:o}))}function Ye(a){let e=a;return()=>(e=e*1664525+1013904223&2147483647,e/2147483647)}const qa=[{id:"main",label:"主图",icon:"◈",desc:"散点+回归线"},{id:"scatter",label:"散点图",icon:"⠿",desc:"双变量关系"},{id:"line",label:"折线图",icon:"∿",desc:"时间序列"},{id:"bar",label:"柱状图",icon:"▐",desc:"组间比较"},{id:"box",label:"箱线图",icon:"⊟",desc:"分布形态"},{id:"heatmap",label:"热图",icon:"▦",desc:"矩阵数据"}],se={1:[{id:"1x1",label:"单图",cols:1,rows:1,gridCols:"1fr",desc:"单栏独立图，全宽"}],2:[{id:"1x2",label:"左右并排",cols:2,rows:1,gridCols:"1fr 1fr",desc:"双变量对比，等宽"},{id:"2x1",label:"上下堆叠",cols:1,rows:2,gridCols:"1fr",desc:"时间序列上下对比"},{id:"1w+1",label:"主图+辅图",cols:2,rows:1,gridCols:"1.8fr 1fr",desc:"主图突出，辅图辅助"}],3:[{id:"1x3",label:"三列叙事",cols:3,rows:1,gridCols:"1fr 1fr 1fr",desc:"因果三步递进"},{id:"1s+2",label:"主图+两辅",cols:2,rows:2,gridCols:"1.6fr 1fr",spans:[{idx:0,rowSpan:2}],desc:"左侧主图，右侧上下两辅"},{id:"2+1s",label:"两辅+主图",cols:2,rows:2,gridCols:"1fr 1.6fr",spans:[{idx:1,colStart:2,rowSpan:2}],desc:"左侧上下两辅，右侧主图"}],4:[{id:"2x2",label:"四等分",cols:2,rows:2,gridCols:"1fr 1fr",desc:"均等对比，2×2"},{id:"1x4",label:"四列横排",cols:4,rows:1,gridCols:"repeat(4,1fr)",desc:"步骤演示，横向展开"},{id:"1s+3",label:"主图+三辅",cols:2,rows:3,gridCols:"1.6fr 1fr",spans:[{idx:0,rowSpan:3}],desc:"左侧大主图，右侧三小图"}],5:[{id:"2+3",label:"上2下3",cols:3,rows:2,gridCols:"1fr 1fr 1fr",spanConfig:"2+3",desc:"上方两图，下方三图"},{id:"3+2",label:"上3下2",cols:3,rows:2,gridCols:"1fr 1fr 1fr",spanConfig:"3+2",desc:"上方三图，下方两图居中"},{id:"1s+4",label:"主图+四辅",cols:2,rows:3,gridCols:"1.5fr 1fr",spans:[{idx:0,rowSpan:2}],desc:"左侧主图占两行，右侧四小图"}],6:[{id:"2x3",label:"两行三列",cols:3,rows:2,gridCols:"1fr 1fr 1fr",desc:"Nature 标准双栏六图"},{id:"3x2",label:"三行两列",cols:2,rows:3,gridCols:"1fr 1fr",desc:"纵向叙事六图"},{id:"1sx2+4",label:"主图+五辅",cols:3,rows:3,gridCols:"1.5fr 1fr 1fr",spans:[{idx:0,rowSpan:3}],desc:"左侧大主图，右侧2列五小图"}],7:[{id:"3+4",label:"上3下4",cols:4,rows:2,gridCols:"repeat(4,1fr)",spanConfig:"3+4",desc:"复杂七图组合"},{id:"2x3+1",label:"六格+底图",cols:3,rows:3,gridCols:"1fr 1fr 1fr",spans:[{idx:6,colSpan:3}],desc:"六格+底部横幅图"}],8:[{id:"2x4",label:"两行四列",cols:4,rows:2,gridCols:"repeat(4,1fr)",desc:"大版面八图"},{id:"4x2",label:"四行两列",cols:2,rows:4,gridCols:"1fr 1fr",desc:"纵向长图"},{id:"1sx3+4",label:"主图+七辅",cols:4,rows:2,gridCols:"1.8fr 1fr 1fr 1fr",spans:[{idx:0,rowSpan:2}],desc:"左侧主图，右侧七小图"}]};function Ct(){const a=se[h.panelCount]||se[4];return a.find(e=>e.id===h.layoutId)||a[0]}function ta(a){h.panelCount=a;const e=se[a]||se[4];h.layoutId=e[0].id,h.cells=Array(a).fill(null)}function Ya(a){if(!(se[h.panelCount]||se[4]).find(n=>n.id===a))return;h.layoutId=a;const o=h.panelCount;h.cells=Array(o).fill(null).map((n,r)=>h.cells[r]||null)}const Xa={scatter(a,e,t){const o=Ye(31),n=Array.from({length:20},()=>({x:o(),y:o()})),r=pe([0,1],[6,e-6]),i=pe([0,1],[t-6,6]);ne(a).selectAll("circle").data(n).join("circle").attr("cx",l=>r(l.x)).attr("cy",l=>i(l.y)).attr("r",2.5).attr("fill","#7EC8E3").attr("opacity",.75)},line(a,e,t){const o=Ye(17),n=Array.from({length:12},(s,c)=>({x:c/11,y:.3+o()*.5})),r=pe([0,1],[6,e-6]),i=pe([0,1],[t-6,6]),l=fa().x(s=>r(s.x)).y(s=>i(s.y)).curve(ma);ne(a).append("path").datum(n).attr("d",l).attr("fill","none").attr("stroke","#95D5B2").attr("stroke-width",1.8),ne(a).selectAll("circle").data(n).join("circle").attr("cx",s=>r(s.x)).attr("cy",s=>i(s.y)).attr("r",2).attr("fill","#95D5B2")},bar(a,e,t){const o=[.5,.75,.45,.85,.6],n=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A","#7EC8E3"],r=da().domain(it(5)).range([4,e-4]).padding(.3),i=pe([0,1],[t-4,4]);ne(a).selectAll("rect").data(o).join("rect").attr("x",(l,s)=>r(s)).attr("y",l=>i(l)).attr("width",r.bandwidth()).attr("height",l=>t-4-i(l)).attr("fill",(l,s)=>n[s]).attr("rx",1)},box(a,e,t){const o=[{x:e*.2,q1:t*.3,med:t*.45,q3:t*.6,lo:t*.2,hi:t*.7,c:"#7EC8E3"},{x:e*.5,q1:t*.25,med:t*.4,q3:t*.55,lo:t*.15,hi:t*.65,c:"#95D5B2"},{x:e*.8,q1:t*.35,med:t*.5,q3:t*.65,lo:t*.25,hi:t*.75,c:"#B8B8E8"}],n=e*.14,r=ne(a);o.forEach(i=>{r.append("line").attr("x1",i.x).attr("x2",i.x).attr("y1",i.lo).attr("y2",i.hi).attr("stroke",i.c).attr("stroke-width",1.2),r.append("rect").attr("x",i.x-n/2).attr("y",i.q1).attr("width",n).attr("height",i.q3-i.q1).attr("fill","none").attr("stroke",i.c).attr("stroke-width",1.5).attr("rx",1),r.append("line").attr("x1",i.x-n/2).attr("x2",i.x+n/2).attr("y1",i.med).attr("y2",i.med).attr("stroke",i.c).attr("stroke-width",1.8)})},heatmap(a,e,t){const r=Ye(99),i=ca(ua).domain([0,1]),l=(e-4)/5,s=(t-4)/4;ne(a).selectAll("rect").data(pa(it(4),it(5))).join("rect").attr("x",([,c])=>2+c*l).attr("y",([c])=>2+c*s).attr("width",l-1).attr("height",s-1).attr("fill",()=>i(r())).attr("rx",1)},main(a,e,t){const o=Ye(42),n=Array.from({length:25},()=>({x:o(),y:o()*.7+o()*.3})),r=pe([0,1],[8,e-8]),i=pe([0,1],[t-8,8]);ne(a).append("line").attr("x1",r(0)).attr("y1",i(.15)).attr("x2",r(1)).attr("y2",i(.85)).attr("stroke","#F0B27A").attr("stroke-width",1.5).attr("opacity",.7),ne(a).selectAll("circle.pt").data(n).join("circle").attr("class","pt").attr("cx",l=>r(l.x)).attr("cy",l=>i(l.y)).attr("r",3).attr("fill","#7EC8E3").attr("opacity",.8).attr("stroke","#fff").attr("stroke-width",.5)}};function Et(a,e,t,o){a.innerHTML="";const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("width",t),n.setAttribute("height",o),n.style.display="block",a.appendChild(n);const r=Xa[e];r&&r(n,t,o)}function Ha(a,e){const{cols:t,rows:o,spans:n=[],spanConfig:r}=a,i=Array(e).fill(null).map(()=>({rowSpan:1,colSpan:1}));return r==="2+3"?e>=1&&(i[0]={rowSpan:1,colSpan:2}):r==="3+2"&&e>=4&&(i[3]={rowSpan:1,colSpan:2}),n.forEach(({idx:l,rowSpan:s=1,colSpan:c=1})=>{l<i.length&&(i[l]={rowSpan:s,colSpan:c})}),i}async function Oe(){const a=document.getElementById("p06-canvas-grid");if(!a)return;const e=Ct(),{gridCols:t,rows:o}=e,n=h.panelCount;Pe.forEach(s=>{try{s.destroy()}catch{}}),Pe=[],a.style.gridTemplateColumns=t,a.style.gridTemplateRows=`repeat(${o}, minmax(80px, 1fr))`,a.style.gap=h.spacing+"px";const r=[...a.querySelectorAll(".p06-cell")];r.length>0&&await new Promise(s=>{Ve.to(r,{scale:.88,opacity:0,duration:.18,stagger:.03,ease:"power2.in",onComplete:s})}),a.innerHTML="",Ha(e,n).forEach((s,c)=>{const u=document.createElement("div");u.className="p06-cell",u.dataset.cellIndex=c,s.rowSpan>1&&(u.style.gridRow=`span ${s.rowSpan}`),s.colSpan>1&&(u.style.gridColumn=`span ${s.colSpan}`),u.innerHTML=`
      <div class="p06-cell-label" style="display:none;">${String.fromCharCode(65+c)}</div>
      <div class="p06-cell-chart"></div>
      <div class="p06-cell-empty">
        <span class="p06-cell-empty-icon">+</span>
        <span class="p06-cell-empty-text">拖入面板</span>
      </div>
    `,a.appendChild(u)}),window.innerWidth>=768&&Wa();const l=[...a.querySelectorAll(".p06-cell")];Ve.fromTo(l,{scale:.82,opacity:0},{scale:1,opacity:1,duration:.28,stagger:.04,ease:"back.out(1.4)",delay:.05}),me()}function me(){const a=document.getElementById("p06-canvas-grid");if(!a)return;a.style.gap=h.spacing+"px",a.querySelectorAll(".p06-cell").forEach((o,n)=>{const r=h.cells[n]||null,i=o.querySelector(".p06-cell-chart"),l=o.querySelector(".p06-cell-label"),s=o.querySelector(".p06-cell-empty");if(r){const c=o.offsetWidth||120,u=Math.round(c*.65);i&&Et(i,r,c-16,Math.min(u,100)),l&&(l.textContent=String.fromCharCode(65+n),l.style.display=h.showLabels?"flex":"none"),s&&(s.style.display="none"),o.classList.add("p06-cell--filled")}else i&&(i.innerHTML=""),l&&(l.style.display="none"),s&&(s.style.display="flex"),o.classList.remove("p06-cell--filled")});const t=document.getElementById("p06-canvas-grid-m");t&&(t.style.gap=h.spacing+"px",t.querySelectorAll(".p06-cell").forEach((n,r)=>{const i=h.cells[r]||null,l=n.querySelector(".p06-cell-chart"),s=n.querySelector(".p06-cell-label"),c=n.querySelector(".p06-cell-empty");i?(l&&Et(l,i,100,60),s&&(s.textContent=String.fromCharCode(65+r),s.style.display=h.showLabels?"flex":"none"),c&&(c.style.display="none"),n.classList.add("p06-cell--filled")):(l&&(l.innerHTML=""),s&&(s.style.display="none"),c&&(c.style.display="flex"),n.classList.remove("p06-cell--filled"))})),aa()}function Ga(){h.cells=Array(h.panelCount).fill(null),me()}function Tt(){const a=h.cells.filter(Boolean);if(a.length===0)return`# 请先在画布中放置面板
`;const e=Ct(),{cols:t,rows:o,spans:n=[]}=e,i=[...new Set(a)].map(m=>({main:`# 主图：散点 + 回归线
p_main <- ggplot(df, aes(x = var1, y = var2, color = group)) +
  geom_point(size = 2, alpha = 0.7) +
  geom_smooth(method = "lm", se = TRUE, linewidth = 0.8) +
  scale_color_manual(values = okabe_ito) +
  theme_classic(base_size = 10) +
  labs(x = "自变量", y = "因变量")`,scatter:`# 散点图
p_scatter <- ggplot(df, aes(x = x1, y = x2)) +
  geom_point(size = 2, alpha = 0.6, color = "#7EC8E3") +
  theme_classic(base_size = 10)`,line:`# 折线图
p_line <- ggplot(df_time, aes(x = time, y = value, color = group)) +
  geom_line(linewidth = 0.8) +
  geom_point(size = 1.5) +
  theme_classic(base_size = 10)`,bar:`# 柱状图
p_bar <- ggplot(df_sum, aes(x = group, y = mean, fill = group)) +
  geom_col(width = 0.6) +
  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.2) +
  theme_classic(base_size = 10)`,box:`# 箱线图
p_box <- ggplot(df, aes(x = group, y = value, fill = group)) +
  geom_boxplot(width = 0.5, outlier.shape = NA, alpha = 0.6) +
  geom_jitter(width = 0.1, size = 1.5, alpha = 0.5) +
  theme_classic(base_size = 10)`,heatmap:`# 热图
p_heatmap <- ggplot(df_mat, aes(x = col, y = row, fill = value)) +
  geom_tile(color = "white", linewidth = 0.3) +
  scale_fill_distiller(palette = "YlOrRd", direction = 1) +
  theme_minimal(base_size = 10)`})[m]||`p_${m} <- ggplot() + labs(title = "${m}")`).join(`

`);let l;if(n.length>0){const m=h.panelCount,g=Array.from({length:m},(E,_)=>String.fromCharCode(65+_)),f=new Set;let y=0;const A=Array.from({length:o},()=>Array(t).fill("#"));for(let E=0;E<o;E++)for(let _=0;_<t;_++){if(f.has(E*t+_)||y>=m)continue;const O=n.find(I=>I.idx===y),G=O?.rowSpan||1,L=O?.colSpan||1,W=g[y];for(let I=0;I<G;I++)for(let D=0;D<L;D++)E+I<o&&_+D<t&&(A[E+I][_+D]=W,(I>0||D>0)&&f.add((E+I)*t+(_+D)));f.add(E*t+_),y++}l=`plot_layout(design = "${A.map(E=>E.join("")).join("\\n")}", guides = "collect")`}else l=`plot_layout(ncol = ${t}, guides = "collect")`;const s=h.cells.map(m=>m?`p_${m}`:"plot_spacer()"),c=h.showLabels?`
  plot_annotation(tag_levels = "A") &
  theme(plot.tag = element_text(size = 8, face = "bold"))`:"",d={"nature-single":"width = 89, height = 70","nature-1half":"width = 140, height = 100","nature-double":"width = 183, height = 120"}[h.preset]||"width = 183, height = 120";return`library(ggplot2)
library(patchwork)

# Okabe-Ito 色盲安全色板
okabe_ito <- c("#E69F00", "#56B4E9", "#009E73")

# ─── 各子图定义 ───────────────────────────────────────
${i}

# ─── 组合布局（${o} 行 × ${t} 列）────────────────────────────
(${s.join(" | ")}) +
  ${l}${c}

# ─── 导出 ─────────────────────────────────────────────
ggsave("multi_panel.pdf",
       ${d}, units = "mm", dpi = 300)`}function At(){if(h.cells.filter(Boolean).length===0)return`# 请先在画布中放置面板
`;const e=Ct(),{cols:t,rows:o,spans:n=[]}=e,r=n.length>0,i=h.spacing<=4?.3:h.spacing<=12?.45:.6,l=h.spacing<=4?.25:h.spacing<=12?.35:.5,s=(t*2.4).toFixed(1),c=(o*2.1).toFixed(1);if(r){const d=n.map(({idx:g,rowSpan:f=1,colSpan:y=1})=>{const A=Math.floor(g/t),P=g%t,E=String.fromCharCode(65+g);return`ax${E} = fig.add_subplot(gs[${A}:${A+f}, ${P}:${P+y}])  # 面板 ${E}`}).join(`
`),m=h.cells.map((g,f)=>{if(n.some(E=>E.idx===f))return null;const y=Math.floor(f/t),A=f%t,P=String.fromCharCode(65+f);return`ax${P} = fig.add_subplot(gs[${y}, ${A}])  # 面板 ${P}`}).filter(Boolean).join(`
`);return`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec

plt.rcParams.update({
    'font.size': 9, 'axes.labelsize': 9,
    'axes.spines.top': False, 'axes.spines.right': False,
    'figure.dpi': 300,
})

# ─── 创建 ${o}×${t} GridSpec 画布（含 span 布局）────────────
fig = plt.figure(figsize=(${s}, ${c}))
gs = gridspec.GridSpec(${o}, ${t}, figure=fig,
                       hspace=${i}, wspace=${l})

# ─── 添加子图 ─────────────────────────────────────────
${d}
${m}

# ─── 在各 ax 中绘图 ────────────────────────────────────
# 示例：axA.scatter(df['var1'], df['var2'], alpha=0.7, s=20)

plt.savefig('multi_panel.pdf', bbox_inches='tight', dpi=300)
print("导出完成：multi_panel.pdf")`}const u=h.cells.map((d,m)=>{const g=o===1?`ax[${m}]`:t===1?`ax[${m}]`:`ax.flat[${m}]`,f=h.showLabels?`${g}.set_title("(${String.fromCharCode(65+m)})", loc='left', fontweight='bold', fontsize=9)
`:"",y={main:`${g}.scatter(df['var1'], df['var2'], c=colors, alpha=0.7, s=20)
${g}.plot(x_fit, y_fit, color='#F0B27A', lw=1.2)
${f}${g}.set(xlabel='自变量', ylabel='因变量')`,scatter:`${g}.scatter(df['x1'], df['x2'], alpha=0.6, s=20, color='#7EC8E3')
${f}${g}.set(xlabel='X', ylabel='Y')`,line:`${g}.plot(df['time'], df['value'], lw=1.2, color='#95D5B2', marker='o', ms=3)
${f}${g}.set(xlabel='时间', ylabel='数值')`,bar:`${g}.bar(groups, means, color='#7EC8E3', yerr=sems, capsize=3, width=0.5)
${f}${g}.set(xlabel='分组', ylabel='均值 ± SE')`,box:`bxp = ${g}.boxplot([df[df['group']==g]['value'] for g in groups], patch_artist=True)
for patch in bxp['boxes']: patch.set_facecolor('#95D5B2'); patch.set_alpha(0.5)
${f}${g}.set(xlabel='分组', ylabel='数值')`,heatmap:`im = ${g}.imshow(matrix, aspect='auto', cmap='YlOrRd')
fig.colorbar(im, ax=${g}, shrink=0.8)
${f}`};return d?y[d]||`${g}.text(0.5, 0.5, '${d}', ha='center', transform=${g}.transAxes)`:`${g}.axis('off')  # 空格`}).join(`

`);return`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams.update({
    'font.size': 9, 'axes.labelsize': 9, 'axes.titlesize': 9,
    'xtick.labelsize': 8, 'ytick.labelsize': 8,
    'figure.dpi': 300,
    'axes.spines.top': False, 'axes.spines.right': False,
})

np.random.seed(42)
df = pd.DataFrame({
    'var1': np.random.randn(50), 'var2': np.random.randn(50),
    'x1': np.random.randn(50),   'x2': np.random.randn(50),
    'time': np.arange(50),       'value': np.cumsum(np.random.randn(50)),
    'group': np.repeat(['A','B','C','D','E'], 10)
})
groups = ['A','B','C','D','E']
means = df.groupby('group')['value'].mean().values
sems  = df.groupby('group')['value'].sem().values
matrix = np.random.rand(5, 6)
colors = ['#7EC8E3' if g == 'A' else '#95D5B2' for g in df['group']]
x_fit = np.linspace(df['var1'].min(), df['var1'].max(), 50)
y_fit = np.poly1d(np.polyfit(df['var1'], df['var2'], 1))(x_fit)

# ─── 创建 ${o}×${t} 画布（${s}" × ${c}"）────────────────
fig, ax = plt.subplots(${o}, ${t}, figsize=(${s}, ${c}))
fig.subplots_adjust(hspace=${i}, wspace=${l})

${u}

plt.tight_layout()
plt.savefig('multi_panel.pdf', bbox_inches='tight', dpi=300)
plt.savefig('multi_panel.tiff', bbox_inches='tight', dpi=600)
print("导出完成：multi_panel.pdf / .tiff")`}function aa(){if(at)try{at.setCode(Tt())}catch{}if(ot)try{ot.setCode(At())}catch{}}function Wa(){const a=document.getElementById("p06-panel-pool");a&&!ze&&(ze=new v(a,{group:{name:"panels",pull:"clone",put:!1},animation:150,ghostClass:"p06-ghost",sort:!1})),document.querySelectorAll("#p06-canvas-grid .p06-cell").forEach((e,t)=>{const o=new v(e,{group:{name:"panels",pull:!1,put:!0},animation:150,ghostClass:"p06-ghost",onAdd(n){const r=n.item.dataset.panelType;h.cells[t]=r;try{n.item.remove()}catch{}me()}});Pe.push(o),j(e,"click",()=>{h.cells[t]&&(h.cells[t]=null,me())})})}const oa=[{id:"a",label:"主图 + 辅图",desc:"主散点+柱+箱+折线",cells:["main","bar","box","line",null,null]},{id:"b",label:"3列叙事流",desc:"散点→折线→柱状",cells:["scatter","line","bar",null,null,null]},{id:"c",label:"全面板 2×3",desc:"六种图表全展示",cells:["main","scatter","line","bar","box","heatmap"]}];function Va(){const a=document.getElementById("p06-mobile-presets");a&&oa.forEach(e=>{const t=a.querySelector(`[data-preset="${e.id}"]`);t&&j(t,"click",()=>{h.cells=[...e.cells],a.querySelectorAll(".p06-preset-btn").forEach(o=>o.classList.remove("active")),t.classList.add("active"),me()})})}function Ua(a){const{cols:e,rows:t,spans:o=[]}=a,n=80,r=56,i=3,l=2,s=(n-l*2-i*(e-1))/e,c=(r-l*2-i*(t-1))/t,u=[],d=new Set;let m=0;for(let f=0;f<t&&m<a.cols*a.rows;f++)for(let y=0;y<e&&m<e*t;y++){const A=f*e+y;if(d.has(A))continue;const P=o.find(I=>I.idx===m),E=P?.rowSpan||1,_=P?.colSpan||1;for(let I=0;I<E;I++)for(let D=0;D<_;D++)(I>0||D>0)&&d.add((f+I)*e+(y+D));const O=l+y*(s+i),G=l+f*(c+i),L=s*_+i*(_-1),W=c*E+i*(E-1);u.push({x:O,y:G,w:L,h:W}),m++}const g=u.map(f=>`<rect x="${f.x.toFixed(1)}" y="${f.y.toFixed(1)}" width="${f.w.toFixed(1)}" height="${f.h.toFixed(1)}" rx="2" fill="rgba(149,213,178,0.22)" stroke="rgba(149,213,178,0.45)" stroke-width="1"/>`).join("");return`<svg viewBox="0 0 ${n} ${r}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">${g}</svg>`}function na(){const a=document.getElementById("p06-layout-templates");if(!a)return;const e=se[h.panelCount]||se[4];a.innerHTML=e.map(t=>`
    <div class="p06-tpl-card${t.id===h.layoutId?" active":""}" data-layout-id="${t.id}">
      <div class="p06-tpl-preview">${Ua(t)}</div>
      <div class="p06-tpl-name">${t.label}</div>
      <div class="p06-tpl-desc">${t.desc}</div>
    </div>
  `).join(""),a.querySelectorAll(".p06-tpl-card").forEach(t=>{j(t,"click",()=>{Ya(t.dataset.layoutId),a.querySelectorAll(".p06-tpl-card").forEach(o=>o.classList.remove("active")),t.classList.add("active"),ra(3),typeof Oe=="function"&&Oe()})})}function ra(a){document.querySelectorAll(".p06-step-item").forEach(e=>{const t=parseInt(e.dataset.step);e.classList.toggle("active",t===a),e.classList.toggle("done",t<a)})}function Ka(){document.querySelectorAll(".p06-count-btn").forEach(e=>{j(e,"click",()=>{const t=parseInt(e.dataset.count);ta(t),document.querySelectorAll(".p06-count-btn").forEach(o=>o.classList.remove("active")),e.classList.add("active"),ra(2),na(),typeof Oe=="function"&&Oe()})}),document.querySelectorAll(".p06-spacing-btn").forEach(e=>{j(e,"click",()=>{document.querySelectorAll(".p06-spacing-btn").forEach(t=>t.classList.remove("active")),document.querySelectorAll(`.p06-spacing-btn[data-spacing="${e.dataset.spacing}"]`).forEach(t=>t.classList.add("active")),h.spacing=parseInt(e.dataset.spacing),me()})}),["p06-label-toggle","p06-label-toggle-m"].forEach(e=>{const t=document.getElementById(e);t&&j(t,"change",()=>{h.showLabels=t.checked,["p06-label-toggle","p06-label-toggle-m"].forEach(o=>{const n=document.getElementById(o);n&&n!==t&&(n.checked=h.showLabels)}),me()})}),document.querySelectorAll(".p06-size-btn").forEach(e=>{j(e,"click",()=>{document.querySelectorAll(".p06-size-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active"),h.preset=e.dataset.size})});const a=document.getElementById("p06-clear-btn");a&&j(a,"click",Ga),["p06-export-code-btn","p06-export-code-btn-m"].forEach(e=>{const t=document.getElementById(e);t&&j(t,"click",()=>{aa();const o=document.getElementById("p06-s3");if(o){o.scrollIntoView({behavior:"smooth"});const n=setTimeout(()=>{const r=document.querySelectorAll(".p06-editor-container");r.length&&Ve.fromTo(r,{boxShadow:"0 0 0 2px rgba(149,213,178,0)"},{boxShadow:"0 0 0 2px rgba(149,213,178,0.6)",duration:.4,yoyo:!0,repeat:2,ease:"power2.inOut"})},600);tt.push(n)}})})}function Ja(){const a=document.querySelectorAll(".p06-code-tab"),e=document.querySelectorAll(".p06-code-panel");a.forEach(t=>{j(t,"click",()=>{a.forEach(n=>n.classList.remove("active")),e.forEach(n=>n.classList.remove("active")),t.classList.add("active");const o=document.getElementById("p06-code-"+t.dataset.tab);o&&o.classList.add("active")})})}function Qa(){document.querySelectorAll(".p06-copy-btn").forEach(a=>{j(a,"click",async()=>{const e=a.dataset.copyTarget==="r"?Tt():At();try{await navigator.clipboard.writeText(e),a.textContent="已复制 ✓",tt.push(setTimeout(()=>{a.textContent="复制代码"},2e3))}catch{a.textContent="复制失败"}})})}function Za(){const a=document.getElementById("p06-quicknav");a&&a.querySelectorAll(".hero-quicknav__item").forEach(e=>{j(e,"click",()=>{const t=document.querySelector(e.dataset.target);t&&t.scrollIntoView({behavior:"smooth"})})})}function eo(){const a=document.getElementById("p06-btn-prev"),e=document.getElementById("p06-home-btn"),t=document.getElementById("p06-btn-next");a&&j(a,"click",()=>rt("m3-p5")),e&&j(e,"click",()=>rt("m3-p1")),t&&j(t,"click",()=>rt("m3-p7"))}function to(){B("#p06-s1 .p06-section-label",{y:30,duration:.7}),B("#p06-s1 .p06-section-title",{y:40,duration:.8}),B("#p06-s1 .p06-intro-text",{y:30,duration:.7}),B(".p06-spec-item",{stagger:.08,y:20,duration:.6}),B(".p06-archetype-card",{stagger:.12,y:35,duration:.7}),B("#p06-s2 .p06-section-label",{y:30,duration:.7}),B("#p06-s2 .p06-section-title",{y:40,duration:.8}),B(".p06-steps-bar",{y:25,duration:.7}),B(".p06-count-grid",{y:30,duration:.6}),B(".p06-layout-templates",{y:30,duration:.6}),B("#p06-s3 .p06-section-label",{y:30,duration:.7}),B("#p06-s3 .p06-section-title",{y:40,duration:.8}),B(".p06-code-tabs",{y:25,duration:.6}),B(".p06-code-panels",{y:35,duration:.7}),B(".p06-annotation",{stagger:.1,y:20,duration:.6}),B("#p06-s4 .p06-section-label",{y:30,duration:.7}),B("#p06-s4 .p06-section-title",{y:40,duration:.8}),B(".p06-journal-card",{stagger:.18,y:40,duration:.8}),B(".page-footer-quote",{y:40,duration:.9}),B(".page-footer-cta .page-footer-nav",{y:25,duration:.6})}function vo(){const a=qa.map(n=>`
    <div class="p06-pool-item" data-panel-type="${n.id}" title="${n.desc}" draggable="true">
      <span class="p06-pool-icon">${n.icon}</span>
      <span class="p06-pool-label">${n.label}</span>
    </div>
  `).join("");Array.from({length:6},(n,r)=>`
    <div class="p06-cell" data-cell-index="${r}">
      <div class="p06-cell-label" style="display:none;">${String.fromCharCode(65+r)}</div>
      <div class="p06-cell-chart"></div>
      <div class="p06-cell-empty">
        <span class="p06-cell-empty-icon">+</span>
        <span class="p06-cell-empty-text">拖入面板</span>
      </div>
    </div>
  `).join("");const e=oa.map((n,r)=>`
    <button class="p06-preset-btn${r===0?" active":""}" data-preset="${n.id}" style="min-height:44px;">
      <strong>${n.label}</strong>
      <small>${n.desc}</small>
    </button>
  `).join(""),o=[{name:"Nature",color:"#7EC8E3",specs:[{label:"单栏宽度",value:"89 mm"},{label:"1.5 栏宽度",value:"140 mm"},{label:"双栏宽度",value:"183 mm"},{label:"最大高度",value:"247 mm"},{label:"最大子图数",value:"建议 ≤ 8"},{label:"分辨率",value:"PNG ≥ 300 dpi"},{label:"字体最小值",value:"≥ 7 pt（终稿）"},{label:"标签格式",value:"a, b, c（小写）"}],colRatios:[{label:"单栏",mm:89},{label:"1.5栏",mm:140},{label:"双栏",mm:183}],note:"Nature 要求图注在图下方，字体不小于 7pt。彩图须同时提供灰度版本确认可读性。"},{name:"Cell",color:"#95D5B2",specs:[{label:"单栏宽度",value:"85 mm"},{label:"双栏宽度",value:"170 mm"},{label:"最大高度",value:"225 mm"},{label:"最大子图数",value:"建议 ≤ 7"},{label:"分辨率",value:"TIFF ≥ 300 dpi"},{label:"字体最小值",value:"≥ 6 pt（终稿）"},{label:"标签格式",value:"A, B, C（大写）"},{label:"格式要求",value:"PDF / TIFF / EPS"}],colRatios:[{label:"单栏",mm:85},{label:"双栏",mm:170}],note:"Cell 系列偏好 TIFF 格式。面板标签使用大写字母，置于左上角，字体加粗。"},{name:"Science",color:"#B8B8E8",specs:[{label:"单栏宽度",value:"55 mm"},{label:"1.5 栏宽度",value:"114 mm"},{label:"双栏宽度",value:"173 mm"},{label:"最大高度",value:"234 mm"},{label:"最大子图数",value:"建议 ≤ 6"},{label:"分辨率",value:"EPS / PDF 矢量优先"},{label:"字体最小值",value:"≥ 7 pt（终稿）"},{label:"标签格式",value:"A, B, C（大写粗体）"}],colRatios:[{label:"单栏",mm:55},{label:"1.5栏",mm:114},{label:"双栏",mm:173}],note:"Science 版面更窄（单栏 55mm），图表必须精简。优先使用矢量格式（EPS/PDF）。"}].map(n=>{const r=n.specs.map(l=>`
      <div class="p06-spec-row">
        <span class="p06-spec-key">${l.label}</span>
        <span class="p06-spec-val">${l.value}</span>
      </div>
    `).join(""),i=n.colRatios.map((l,s)=>{const c=Math.round(l.mm/183*100),u=.4+s*.2;return`
        <div class="p06-col-mock">
          <div class="p06-col-bar" style="width:${c}%;background:${n.color};opacity:${u};"></div>
          <span class="p06-col-label">${l.label}<br><small>${l.mm} mm</small></span>
        </div>
      `}).join("");return`
      <div class="p06-journal-card">
        <div class="p06-journal-header" style="border-color:${n.color};">
          <h3 class="p06-journal-name" style="color:${n.color};">${n.name}</h3>
          <span class="p06-journal-badge" style="background:${n.color}20;border-color:${n.color}55;color:${n.color};">投稿必读</span>
        </div>
        <div class="p06-col-visual">${i}</div>
        <div class="p06-spec-list">${r}</div>
        <p class="p06-journal-note">${n.note}</p>
      </div>
    `}).join("");return`<div class="page-scroll">
<style>
/* ── Hero ── */
.p06-hero { position:relative; overflow:hidden; align-items:center; }
.p06-hero::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 50% at 20% 40%, rgba(149,213,178,0.12) 0%, transparent 65%); animation:p06-drift-a 14s ease-in-out infinite; pointer-events:none; }
.p06-hero::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 50% 40% at 80% 60%, rgba(126,200,227,0.08) 0%, transparent 60%); animation:p06-drift-b 9s ease-in-out infinite reverse; pointer-events:none; }
@keyframes p06-drift-a { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-10px)} }
@keyframes p06-drift-b { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,18px)} }
.p06-hero-bg-dots { position:absolute; inset:0; pointer-events:none; z-index:0; background-image:radial-gradient(circle, rgba(149,213,178,0.08) 1px, transparent 1px); background-size:32px 32px; animation:p06-dots-drift 20s linear infinite; }
@keyframes p06-dots-drift { from{background-position:0 0} to{background-position:32px 32px} }
.p06-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p06-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p06-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }

/* ── 通用标题 ── */
.p06-section-label { font-size:0.75rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p06-label-light { color:var(--module-3,#95D5B2); }
.p06-label-dark  { color:var(--module-3,#95D5B2); }
.p06-section-title { font-family:var(--font-display); font-size:clamp(2rem,4vw,3.2rem); font-weight:700; letter-spacing:-0.02em; line-height:1.15; margin:0 0 var(--space-lg); }
.p06-title-light { color:var(--text-on-light); }
.p06-title-dark  { color:var(--text-on-dark); }

/* ── S1 排版规范 ── */
.p06-s1-inner { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-xxl); align-items:start; max-width:1100px; margin:0 auto; }
.p06-intro-text { font-size:1rem; color:var(--text-on-light-2); line-height:1.8; margin-bottom:var(--space-lg); }
.p06-spec-item { display:flex; align-items:baseline; gap:12px; padding:10px 14px; background:rgba(149,213,178,0.07); border-left:3px solid var(--module-3,#95D5B2); border-radius:0 var(--radius-sm) var(--radius-sm) 0; margin-bottom:10px; }
.p06-spec-item-key { font-weight:700; color:var(--module-3,#95D5B2); font-size:0.82rem; white-space:nowrap; min-width:96px; }
.p06-spec-item-val { font-size:0.87rem; color:var(--text-on-light-2); line-height:1.5; }

.p06-archetype-card { background:var(--bg-light-elevated,#fff); border-radius:var(--radius-lg); padding:var(--space-md) var(--space-lg); border:1px solid var(--border-light); margin-bottom:var(--space-md); }
.p06-archetype-header { display:flex; align-items:center; gap:var(--space-sm); margin-bottom:var(--space-md); }
.p06-archetype-num { width:28px; height:28px; border-radius:50%; background:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:700; font-size:0.78rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.p06-archetype-name { font-weight:700; color:var(--text-on-light); font-size:0.95rem; margin:0; }
.p06-archetype-use  { font-size:0.8rem; color:var(--text-on-light-2); margin:2px 0 0; }

/* 布局示意图 */
.p06-layout-diagram { display:grid; gap:4px; border-radius:var(--radius-sm); overflow:hidden; margin-bottom:var(--space-sm); height:84px; background:rgba(149,213,178,0.04); border:1px solid rgba(149,213,178,0.15); padding:4px; box-sizing:border-box; }
.p06-layout-cell { background:rgba(149,213,178,0.18); border:1.5px solid rgba(149,213,178,0.5); border-radius:3px; display:flex; align-items:center; justify-content:center; font-size:0.65rem; font-weight:700; color:var(--module-3,#95D5B2); }
.layout-2x2 { grid-template-columns:1fr 1fr; }
.layout-1plus2 { grid-template-columns:1.6fr 1fr; grid-template-rows:1fr 1fr; }
.layout-1plus2 .p06-layout-cell:first-child { grid-row:span 2; }
.layout-3col { grid-template-columns:1fr 1fr 1fr; }
.p06-archetype-note { font-size:0.8rem; color:var(--text-on-light-2); margin:0; line-height:1.6; }

/* ── S2 拖拽编辑器 ── */
.p06-editor-intro { font-size:1rem; color:var(--text-on-dark-2); line-height:1.8; margin-bottom:var(--space-xl); max-width:600px; }
.p06-editor-layout { display:grid; grid-template-columns:190px 1fr; gap:var(--space-xl); align-items:start; }
.p06-pool-title { font-size:0.72rem; font-weight:700; color:var(--text-on-dark-2); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:var(--space-sm); }
.p06-panel-pool { display:flex; flex-direction:column; gap:8px; min-height:200px; }
.p06-pool-item { display:flex; align-items:center; gap:10px; padding:10px 14px; background:rgba(255,255,255,0.06); border:1.5px solid var(--border-dark); border-radius:var(--radius-sm); cursor:grab; transition:all 0.18s; user-select:none; min-height:44px; }
.p06-pool-item:hover { border-color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); transform:translateX(2px); }
.p06-pool-item:active { cursor:grabbing; }
.p06-pool-icon  { font-size:1.05rem; line-height:1; color:var(--module-3,#95D5B2); }
.p06-pool-label { font-size:0.85rem; color:var(--text-on-dark); font-weight:500; }
.p06-pool-hint  { font-size:0.72rem; color:var(--text-on-dark-3); margin-top:var(--space-sm); line-height:1.6; }

.p06-canvas-area {}
.p06-canvas-controls { display:flex; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:var(--space-md); padding:12px var(--space-md); background:rgba(255,255,255,0.04); border-radius:var(--radius-sm); border:1px solid var(--border-dark); }
.p06-ctrl-group { display:flex; align-items:center; gap:8px; }
.p06-ctrl-label { font-size:0.75rem; color:var(--text-on-dark-2); white-space:nowrap; }
.p06-spacing-btn, .p06-size-btn { padding:5px 11px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.78rem; cursor:pointer; transition:all 0.18s; font-family:inherit; min-height:32px; }
.p06-spacing-btn.active, .p06-size-btn.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }
.p06-toggle-wrap { display:flex; align-items:center; gap:6px; }
.p06-toggle { width:36px; height:20px; background:#444; border-radius:10px; cursor:pointer; position:relative; border:none; appearance:none; -webkit-appearance:none; transition:background 0.2s; flex-shrink:0; vertical-align:middle; }
.p06-toggle:checked { background:var(--module-3,#95D5B2); }
.p06-toggle::after { content:''; position:absolute; width:14px; height:14px; background:#fff; border-radius:50%; top:3px; left:3px; transition:left 0.2s; }
.p06-toggle:checked::after { left:19px; }
.p06-toggle-label { font-size:0.78rem; color:var(--text-on-dark-2); cursor:pointer; }

.p06-canvas-wrap { background:rgba(255,255,255,0.03); border:1.5px solid var(--border-dark); border-radius:var(--radius-md); padding:var(--space-md); }
.p06-canvas-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.p06-cell { background:rgba(255,255,255,0.04); border:1.5px dashed rgba(149,213,178,0.25); border-radius:var(--radius-sm); min-height:100px; position:relative; cursor:pointer; transition:border-color 0.2s, background 0.2s; overflow:hidden; display:flex; align-items:center; justify-content:center; }
.p06-cell:hover { border-color:rgba(149,213,178,0.45); background:rgba(149,213,178,0.04); }
.p06-cell--filled { border-style:solid; border-color:rgba(149,213,178,0.4); background:rgba(149,213,178,0.06); }
.p06-cell--filled:hover { border-color:rgba(239,68,68,0.45); background:rgba(239,68,68,0.04); }
.p06-cell-label { position:absolute; top:4px; left:5px; z-index:2; width:18px; height:18px; background:var(--module-3,#95D5B2); color:#1d1d1f; border-radius:3px; font-size:0.66rem; font-weight:700; display:flex; align-items:center; justify-content:center; }
.p06-cell-chart { width:100%; padding:8px; box-sizing:border-box; display:flex; align-items:center; justify-content:center; }
.p06-cell-chart svg { max-width:100%; display:block; }
.p06-cell-empty { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; pointer-events:none; }
.p06-cell-empty-icon { font-size:1.4rem; color:rgba(149,213,178,0.3); line-height:1; }
.p06-cell-empty-text { font-size:0.66rem; color:rgba(149,213,178,0.35); }
.p06-ghost { opacity:0.35; border:2px dashed var(--module-3,#95D5B2) !important; background:rgba(149,213,178,0.08) !important; }

.p06-canvas-actions { display:flex; align-items:center; gap:12px; margin-top:var(--space-md); flex-wrap:wrap; }
.p06-action-btn { padding:10px 20px; border-radius:var(--radius-full); border:1.5px solid var(--border-dark); background:transparent; color:var(--text-on-dark-2); font-size:0.85rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; }
.p06-action-btn:hover { border-color:var(--text-on-dark-2); color:var(--text-on-dark); }
.p06-action-btn--primary { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:600; }
.p06-action-btn--primary:hover { opacity:0.88; }
.p06-canvas-hint { font-size:0.76rem; color:var(--text-on-dark-3); margin-top:8px; }

/* 移动端预设 */
.p06-mobile-presets { display:none; flex-direction:column; gap:10px; margin-bottom:var(--space-lg); }
.p06-preset-btn { display:flex; flex-direction:column; align-items:flex-start; gap:3px; padding:14px 18px; border-radius:var(--radius-md); border:1.5px solid var(--border-dark); background:rgba(255,255,255,0.04); color:var(--text-on-dark); cursor:pointer; transition:all 0.2s; font-family:inherit; text-align:left; }
.p06-preset-btn strong { font-size:0.9rem; }
.p06-preset-btn small { font-size:0.78rem; color:var(--text-on-dark-2); }
.p06-preset-btn.active { border-color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); }

/* ── S3 代码生成 ── */
.p06-code-tabs { display:flex; gap:8px; margin-bottom:var(--space-lg); }
.p06-code-tab { padding:8px 22px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.85rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; }
.p06-code-tab:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-code-tab.active { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); font-weight:600; }
.p06-code-panel { display:none; }
.p06-code-panel.active { display:block; animation:p06-panel-in 0.25s ease; }
@keyframes p06-panel-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
.p06-code-panel-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--space-sm); }
.p06-code-panel-title { font-size:1.05rem; font-weight:700; color:var(--text-on-light); }
.p06-code-panel-desc { font-size:0.88rem; color:var(--text-on-light-2); margin-bottom:var(--space-md); line-height:1.7; }
.p06-copy-btn { padding:8px 16px; border-radius:var(--radius-full); border:1.5px solid var(--border-light); background:transparent; color:var(--text-on-light-2); font-size:0.82rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:44px; white-space:nowrap; }
.p06-copy-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-editor-container { border-radius:var(--radius-md); overflow:hidden; border:1px solid var(--border-light); margin-bottom:var(--space-lg); }
.p06-annotation-list { display:grid; grid-template-columns:1fr 1fr; gap:var(--space-md); }
.p06-annotation { padding:14px 16px; background:rgba(149,213,178,0.06); border-left:3px solid var(--module-3,#95D5B2); border-radius:0 var(--radius-sm) var(--radius-sm) 0; }
.p06-annotation-key { font-family:var(--font-code); font-size:0.78rem; color:var(--module-3,#95D5B2); font-weight:700; margin-bottom:5px; word-break:break-all; }
.p06-annotation-desc { font-size:0.83rem; color:var(--text-on-light-2); line-height:1.6; }

/* ── S4 期刊案例 ── */
.p06-journal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-xl); max-width:1100px; margin:0 auto; }
.p06-journal-card { background:rgba(255,255,255,0.04); border-radius:var(--radius-lg); padding:var(--space-lg); border:1px solid var(--border-dark); }
.p06-journal-header { display:flex; align-items:center; justify-content:space-between; padding-bottom:var(--space-md); margin-bottom:var(--space-md); border-bottom:2px solid; }
.p06-journal-name { font-family:var(--font-display); font-size:1.55rem; font-weight:700; margin:0; letter-spacing:-0.02em; }
.p06-journal-badge { font-size:0.7rem; font-weight:700; padding:4px 10px; border-radius:var(--radius-full); border:1px solid; letter-spacing:0.06em; white-space:nowrap; }
.p06-col-visual { margin-bottom:var(--space-md); display:flex; flex-direction:column; gap:8px; }
.p06-col-mock { display:flex; align-items:center; gap:10px; }
.p06-col-bar { height:13px; border-radius:3px; min-width:6px; }
.p06-col-label { font-size:0.75rem; color:var(--text-on-dark-2); line-height:1.3; white-space:nowrap; }
.p06-col-label small { font-size:0.67rem; color:var(--text-on-dark-3); display:block; }
.p06-spec-list { display:flex; flex-direction:column; gap:0; margin-bottom:var(--space-md); }
.p06-spec-row { display:flex; justify-content:space-between; align-items:baseline; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
.p06-spec-row:last-child { border-bottom:none; }
.p06-spec-key { font-size:0.78rem; color:var(--text-on-dark-2); }
.p06-spec-val { font-size:0.8rem; font-weight:600; color:var(--text-on-dark); font-family:var(--font-code); text-align:right; }
.p06-journal-note { font-size:0.8rem; color:var(--text-on-dark-2); line-height:1.7; padding:10px 13px; background:rgba(255,255,255,0.04); border-radius:var(--radius-sm); margin:0; }

/* ── Footer ── */
#p06-footer { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:50vh; text-align:center; padding:var(--space-xxl) var(--space-lg); }
.p06-footer-nav { display:flex; gap:var(--space-md); flex-wrap:wrap; justify-content:center; margin-top:var(--space-xl); }
.p06-nav-btn { padding:14px 28px; border-radius:var(--radius-full); border:1.5px solid rgba(255,255,255,0.22); background:transparent; color:var(--text-on-dark); font-size:0.95rem; cursor:pointer; transition:all 0.2s; font-family:inherit; min-height:48px; }
.p06-nav-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-nav-btn--primary { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; font-weight:600; }
.p06-nav-btn--primary:hover { opacity:0.88; color:#1d1d1f; }

/* ── 响应式 ── */
@media (max-width:1024px) {
  .p06-s1-inner { grid-template-columns:1fr; gap:var(--space-xl); }
  .p06-journal-grid { grid-template-columns:1fr; gap:var(--space-lg); }
  .p06-editor-layout { grid-template-columns:1fr; }
  .p06-panel-pool { flex-direction:row; flex-wrap:wrap; }
  .p06-pool-item { flex:1 1 130px; }
}
@media (max-width:768px) {
  #p06-s1, #p06-s2, #p06-s3, #p06-s4 { scroll-margin-top:56px; }
  .p06-annotation-list { grid-template-columns:1fr; }
  .p06-canvas-grid { grid-template-columns:repeat(2,1fr); }
  .p06-desktop-drag { display:none !important; }
  .p06-mobile-presets { display:flex !important; }
  .p06-canvas-controls { flex-direction:column; align-items:flex-start; }
  .p06-footer-nav { flex-direction:column; align-items:center; }
}
@media (max-width:480px) {
  .p06-canvas-grid { grid-template-columns:1fr 1fr; }
  .p06-journal-grid { grid-template-columns:1fr; }
}

/* ── 三步向导 ── */
.p06-wizard { max-width:1100px; margin:0 auto; }
.p06-steps-bar { display:flex; align-items:center; gap:0; margin-bottom:var(--space-xxl); }
.p06-step-item { display:flex; align-items:center; gap:10px; }
.p06-step-num { width:28px; height:28px; border-radius:50%; background:rgba(255,255,255,0.1); border:2px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.35); font-size:0.78rem; font-weight:700; display:flex; align-items:center; justify-content:center; transition:all 0.3s; flex-shrink:0; }
.p06-step-item.active .p06-step-num { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; }
.p06-step-item.done .p06-step-num { background:rgba(149,213,178,0.25); border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); }
.p06-step-label { font-size:0.82rem; color:rgba(255,255,255,0.35); transition:color 0.3s; white-space:nowrap; }
.p06-step-item.active .p06-step-label,.p06-step-item.done .p06-step-label { color:var(--text-on-dark-2); }
.p06-step-connector { flex:1; height:1.5px; background:rgba(255,255,255,0.1); margin:0 12px; min-width:20px; }
.p06-count-grid { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:var(--space-xl); }
.p06-count-btn { width:56px; height:56px; border-radius:var(--radius-md); border:1.5px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); color:var(--text-on-dark-2); font-size:1.25rem; font-weight:700; cursor:pointer; transition:all 0.2s; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:var(--font-display); padding-top:4px; }
.p06-count-btn:hover { border-color:var(--module-3,#95D5B2); color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.08); transform:translateY(-2px); }
.p06-count-btn.active { background:var(--module-3,#95D5B2); border-color:var(--module-3,#95D5B2); color:#1d1d1f; transform:translateY(-2px); box-shadow:0 4px 16px rgba(149,213,178,0.3); }
.p06-count-sub { font-size:0.58rem; white-space:nowrap; opacity:0.6; font-weight:400; font-family:var(--font-body); line-height:1; }
.p06-layout-step { display:none; }
.p06-layout-step.visible { display:block; animation:p06-step-in 0.3s ease; }
@keyframes p06-step-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
.p06-layout-templates { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:var(--space-xl); }
.p06-tpl-card { cursor:pointer; padding:14px 16px; border-radius:var(--radius-md); border:1.5px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.03); transition:all 0.2s; min-width:120px; }
.p06-tpl-card:hover { border-color:rgba(149,213,178,0.5); background:rgba(149,213,178,0.06); transform:translateY(-2px); }
.p06-tpl-card.active { border-color:var(--module-3,#95D5B2); background:rgba(149,213,178,0.1); box-shadow:0 0 0 2px rgba(149,213,178,0.2); }
.p06-tpl-preview { width:80px; height:56px; margin-bottom:10px; }
.p06-tpl-name { font-size:0.82rem; font-weight:600; color:var(--text-on-dark); margin-bottom:3px; }
.p06-tpl-desc { font-size:0.72rem; color:var(--text-on-dark-3); line-height:1.4; }
.p06-mobile-editor { display:none; }
@media (max-width:768px) { .p06-desktop-drag { display:none !important; } .p06-mobile-editor { display:block; } }
</style>

<!-- ── Hero ── -->
<section class="section-dark section-hero-full p06-hero" id="p06-hero">
  <div class="p06-hero-bg-dots"></div>
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 03 / Page 06</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">多面板图形</h1>
    <p class="page-hero-sub" style="opacity:0;">Multi-Panel Figure Composition</p>
    <p class="p06-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">像 Nature 一样排版——掌握科研多图组合的视觉语言</p>
    <nav class="hero-quicknav" id="p06-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p06-s1">排版规范</button>
      <button class="hero-quicknav__item" data-target="#p06-s2">拖拽布局</button>
      <button class="hero-quicknav__item" data-target="#p06-s3">代码生成</button>
      <button class="hero-quicknav__item" data-target="#p06-s4">期刊案例</button>
    </nav>
    <div class="p06-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
</section>

<!-- ── S1 排版规范 ── -->
<section class="section-light" id="p06-s1" style="padding:var(--space-xxl) var(--space-lg);">
  <div class="p06-s1-inner">
    <!-- 左：规范说明 -->
    <div>
      <p class="p06-section-label p06-label-light">Layout Principles</p>
      <h2 class="p06-section-title p06-title-light">排版规范<br>Nature / Science 标准</h2>
      <p class="p06-intro-text">顶级期刊对多面板图形有严格要求。了解这些规范，不仅能通过审稿人的技术检查，更能让图表拥有专业的视觉重量感。</p>
      <div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">最大宽度</span>
          <span class="p06-spec-item-val">Nature 双栏 183 mm，Cell 双栏 170 mm，Science 双栏 173 mm</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">字体最小值</span>
          <span class="p06-spec-item-val">期刊终稿字体 ≥ 7 pt，轴标签不小于 6 pt（打印后可读）</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">面板标签</span>
          <span class="p06-spec-item-val">Nature 用小写 a/b/c，Cell/Science 用大写 A/B/C，置于左上角</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">分辨率</span>
          <span class="p06-spec-item-val">位图 ≥ 300 dpi，线条图 ≥ 600 dpi，首选矢量格式 PDF/EPS</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">图例整合</span>
          <span class="p06-spec-item-val">多面板共享图例应合并为一个，放在右侧或底部，避免重复</span>
        </div>
        <div class="p06-spec-item">
          <span class="p06-spec-item-key">色彩规范</span>
          <span class="p06-spec-item-val">彩色需额外付费，确认配色在灰度打印时仍可被区分</span>
        </div>
      </div>
    </div>

    <!-- 右：布局原型 -->
    <div>
      <!-- 2×2 四等分 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">1</div>
          <div>
            <p class="p06-archetype-name">2×2 四等分布局</p>
            <p class="p06-archetype-use">同类型数据对比，各面板等权重</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-2x2">
          <div class="p06-layout-cell">A</div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
          <div class="p06-layout-cell">D</div>
        </div>
        <p class="p06-archetype-note">适合：基因表达对比、四个处理组、Before/After 两对实验</p>
      </div>

      <!-- 1+2 宽窄组合 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">2</div>
          <div>
            <p class="p06-archetype-name">1+2 宽窄组合</p>
            <p class="p06-archetype-use">主图突出，右侧细节图辅助说明</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-1plus2">
          <div class="p06-layout-cell">A<br><small style="opacity:0.6;font-size:0.6rem;">主图</small></div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
        </div>
        <p class="p06-archetype-note">适合：模式图+验证、流程图+实验结果、总览+局部放大</p>
      </div>

      <!-- 3列叙事流 -->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">3</div>
          <div>
            <p class="p06-archetype-name">3列叙事流</p>
            <p class="p06-archetype-use">左→右递进，讲述因果故事</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-3col">
          <div class="p06-layout-cell">A<br><small style="opacity:0.55;font-size:0.58rem;">起因</small></div>
          <div class="p06-layout-cell">B<br><small style="opacity:0.55;font-size:0.58rem;">过程</small></div>
          <div class="p06-layout-cell">C<br><small style="opacity:0.55;font-size:0.58rem;">结论</small></div>
        </div>
        <p class="p06-archetype-note">适合：分子机制通路、三步验证实验、病程发展阶段</p>
      </div>

      <!-- 2×2 四等分（原型4）-->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">4</div>
          <div>
            <p class="p06-archetype-name">2×2 均等四图</p>
            <p class="p06-archetype-use">四组平行对比，无主次之分</p>
          </div>
        </div>
        <div class="p06-layout-diagram layout-2x2">
          <div class="p06-layout-cell">A</div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
          <div class="p06-layout-cell">D</div>
        </div>
        <p class="p06-archetype-note">适合：四种基因型对比、Before/After × 两组实验、ROC 曲线四分类</p>
      </div>

      <!-- 渐进揭示型（原型5）-->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">5</div>
          <div>
            <p class="p06-archetype-name">渐进揭示型（1+N）</p>
            <p class="p06-archetype-use">主图全高，辅图递进补充细节</p>
          </div>
        </div>
        <div class="p06-layout-diagram" style="grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr 1fr;">
          <div class="p06-layout-cell" style="grid-row:span 3;">A<br><small style="opacity:0.6;font-size:0.58rem;">主图</small></div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
          <div class="p06-layout-cell">D</div>
        </div>
        <p class="p06-archetype-note">适合：全图+三个局部放大、总体趋势+三种条件、模式图+三组验证</p>
      </div>

      <!-- 横幅底图型（原型6）-->
      <div class="p06-archetype-card">
        <div class="p06-archetype-header">
          <div class="p06-archetype-num">6</div>
          <div>
            <p class="p06-archetype-name">横幅底图型</p>
            <p class="p06-archetype-use">上方多小图，底部横跨大图总结</p>
          </div>
        </div>
        <div class="p06-layout-diagram" style="grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr;">
          <div class="p06-layout-cell">A</div>
          <div class="p06-layout-cell">B</div>
          <div class="p06-layout-cell">C</div>
          <div class="p06-layout-cell" style="grid-column:span 3;">D（横跨全宽）</div>
        </div>
        <p class="p06-archetype-note">适合：三个亚组结果 + 底部汇总统计、三时间点 + 综合热图</p>
      </div>
    </div>
  </div>
</section>

<!-- ── S2 拖拽布局编辑器 ── -->
<section class="section-dark" id="p06-s2" style="padding:var(--space-xxl) var(--space-lg);">
  <div class="p06-wizard">
    <p class="p06-section-label p06-label-dark">Interactive Editor</p>
    <h2 class="p06-section-title p06-title-dark">自适应布局编辑器</h2>
    <p class="p06-editor-intro">三步构建你的多面板图：选择面板数量，挑选最合适的排版模板，最后拖入图表类型。</p>

    <!-- 步骤指示器 -->
    <div class="p06-steps-bar">
      <div class="p06-step-item active" data-step="1">
        <div class="p06-step-num">1</div>
        <span class="p06-step-label">选择面板数</span>
      </div>
      <div class="p06-step-connector"></div>
      <div class="p06-step-item" data-step="2">
        <div class="p06-step-num">2</div>
        <span class="p06-step-label">选择布局模板</span>
      </div>
      <div class="p06-step-connector"></div>
      <div class="p06-step-item" data-step="3">
        <div class="p06-step-num">3</div>
        <span class="p06-step-label">拖入图表 / 生成代码</span>
      </div>
    </div>

    <!-- Step 1：面板数量 -->
    <div id="p06-step1">
      <p class="p06-pool-title" style="margin-bottom:var(--space-md);">需要几个子图？</p>
      <div class="p06-count-grid" id="p06-count-grid">
        <button class="p06-count-btn" data-count="1">1<span class="p06-count-sub">单图</span></button>
        <button class="p06-count-btn" data-count="2">2<span class="p06-count-sub">两图</span></button>
        <button class="p06-count-btn" data-count="3">3<span class="p06-count-sub">三图</span></button>
        <button class="p06-count-btn active" data-count="4">4<span class="p06-count-sub">四图</span></button>
        <button class="p06-count-btn" data-count="5">5<span class="p06-count-sub">五图</span></button>
        <button class="p06-count-btn" data-count="6">6<span class="p06-count-sub">六图</span></button>
        <button class="p06-count-btn" data-count="7">7<span class="p06-count-sub">七图</span></button>
        <button class="p06-count-btn" data-count="8">8<span class="p06-count-sub">八图</span></button>
      </div>
    </div>

    <!-- Step 2：布局模板（JS 动态渲染） -->
    <div id="p06-step2" class="p06-layout-step visible">
      <p class="p06-pool-title" style="margin-bottom:var(--space-md);">选择布局模板</p>
      <div class="p06-layout-templates" id="p06-layout-templates"></div>
    </div>

    <!-- Step 3：画布区（桌面端） -->
    <div id="p06-step3" class="p06-layout-step visible p06-desktop-drag">
      <div style="display:flex;gap:var(--space-xl);align-items:start;">
        <div style="width:190px;flex-shrink:0;">
          <p class="p06-pool-title">面板库</p>
          <div id="p06-panel-pool" class="p06-panel-pool">
            ${a}
          </div>
          <p class="p06-pool-hint">拖入右侧画布格子<br>点击已放置面板可移除</p>
        </div>
        <div style="flex:1;min-width:0;">
          <div class="p06-canvas-controls">
            <div class="p06-ctrl-group">
              <span class="p06-ctrl-label">间距</span>
              <button class="p06-spacing-btn" data-spacing="4">紧密</button>
              <button class="p06-spacing-btn active" data-spacing="12">正常</button>
              <button class="p06-spacing-btn" data-spacing="24">宽松</button>
            </div>
            <div class="p06-ctrl-group p06-toggle-wrap">
              <input type="checkbox" class="p06-toggle" id="p06-label-toggle" checked>
              <label class="p06-toggle-label" for="p06-label-toggle">ABCDEF 标签</label>
            </div>
            <div class="p06-ctrl-group">
              <span class="p06-ctrl-label">尺寸预设</span>
              <button class="p06-size-btn" data-size="nature-single">单栏 89mm</button>
              <button class="p06-size-btn" data-size="nature-1half">1.5栏 140mm</button>
              <button class="p06-size-btn active" data-size="nature-double">双栏 183mm</button>
            </div>
          </div>
          <div class="p06-canvas-wrap">
            <div id="p06-canvas-grid" class="p06-canvas-grid"></div>
          </div>
          <div class="p06-canvas-actions">
            <button class="p06-action-btn" id="p06-clear-btn">清空画布</button>
            <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn">生成代码 →</button>
          </div>
          <p class="p06-canvas-hint">画布模拟 Nature 双栏宽度（183mm），每格对应一个子图</p>
        </div>
      </div>
    </div>

    <!-- 移动端 -->
    <div class="p06-mobile-editor">
      <p class="p06-pool-title">选择预设布局</p>
      <div id="p06-mobile-presets" class="p06-mobile-presets">
        ${e}
      </div>
      <div class="p06-canvas-controls">
        <div class="p06-ctrl-group">
          <span class="p06-ctrl-label">间距</span>
          <button class="p06-spacing-btn" data-spacing="4">紧密</button>
          <button class="p06-spacing-btn active" data-spacing="12">正常</button>
          <button class="p06-spacing-btn" data-spacing="24">宽松</button>
        </div>
        <div class="p06-ctrl-group p06-toggle-wrap">
          <input type="checkbox" class="p06-toggle" id="p06-label-toggle-m" checked>
          <label class="p06-toggle-label" for="p06-label-toggle-m">显示标签</label>
        </div>
      </div>
      <div class="p06-canvas-wrap">
        <div id="p06-canvas-grid-m" class="p06-canvas-grid"></div>
      </div>
      <div style="text-align:center;margin-top:var(--space-xl);">
        <button class="p06-action-btn p06-action-btn--primary" id="p06-export-code-btn-m">查看完整代码 →</button>
      </div>
    </div>
  </div>
</section>

<!-- ── S3 代码生成 ── -->
<section class="section-light" id="p06-s3" style="padding:var(--space-xxl) var(--space-lg);">
  <div style="max-width:900px;margin:0 auto;">
    <p class="p06-section-label p06-label-light">Code Generation</p>
    <h2 class="p06-section-title p06-title-light">完整代码模板</h2>
    <p style="font-size:1rem;color:var(--text-on-light-2);line-height:1.8;margin-bottom:var(--space-xl);">以下代码根据你的画布布局实时生成。R 使用 patchwork，Python 使用 matplotlib subplot，均可直接用于论文投稿。</p>

    <div class="p06-code-tabs">
      <button class="p06-code-tab active" data-tab="r">R（patchwork）</button>
      <button class="p06-code-tab" data-tab="py">Python（matplotlib）</button>
    </div>

    <div>
      <!-- R 面板 -->
      <div class="p06-code-panel active" id="p06-code-r">
        <div class="p06-code-panel-header">
          <div class="p06-code-panel-title">patchwork 多面板组合</div>
          <button class="p06-copy-btn" data-copy-target="r">复制代码</button>
        </div>
        <p class="p06-code-panel-desc">patchwork 语法直观，<code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">p1 | p2</code> 横排，<code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">p1 / p2</code> 纵排，支持自动对齐轴和合并图例。</p>
        <div class="p06-editor-container" id="p06-r-editor"></div>
        <div class="p06-annotation-list">
          <div class="p06-annotation">
            <div class="p06-annotation-key">guides = "collect"</div>
            <div class="p06-annotation-desc">将所有面板的图例合并为一个，避免重复。放在 plot_layout() 中。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">tag_levels = "A"</div>
            <div class="p06-annotation-desc">plot_annotation() 自动为每个面板添加 A/B/C 标签，无需手动在每图中设置。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">plot_spacer()</div>
            <div class="p06-annotation-desc">创建不规则布局中的空白占位格，patchwork 的重要工具。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">units = "mm"</div>
            <div class="p06-annotation-desc">ggsave() 直接以毫米指定尺寸，精确匹配期刊要求（如 183mm 双栏）。</div>
          </div>
        </div>
      </div>

      <!-- Python 面板 -->
      <div class="p06-code-panel" id="p06-code-py">
        <div class="p06-code-panel-header">
          <div class="p06-code-panel-title">matplotlib subplot 多面板</div>
          <button class="p06-copy-btn" data-copy-target="py">复制代码</button>
        </div>
        <p class="p06-code-panel-desc">matplotlib 的 <code style="font-family:var(--font-code);font-size:0.85em;background:rgba(149,213,178,0.1);padding:1px 6px;border-radius:3px;">subplots()</code> 提供精确的网格控制，rcParams 全局配置确保期刊字体规范。</p>
        <div class="p06-editor-container" id="p06-py-editor"></div>
        <div class="p06-annotation-list">
          <div class="p06-annotation">
            <div class="p06-annotation-key">rcParams.update({})</div>
            <div class="p06-annotation-desc">批量设置全局样式，字号、脊线等一次配置，所有子图自动继承。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">figsize=(7.2, 4.7)</div>
            <div class="p06-annotation-desc">7.2 英寸 ≈ 183mm（Nature 双栏），直接换算期刊尺寸，dpi=300 时精确输出。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">ax[row][col]</div>
            <div class="p06-annotation-desc">subplots 返回二维数组，行列索引对应画布网格位置，直观清晰。</div>
          </div>
          <div class="p06-annotation">
            <div class="p06-annotation-key">dpi=600 / tiff</div>
            <div class="p06-annotation-desc">线条图导出 600dpi，位图 300dpi；TIFF 格式用于打印，PDF 用于提交。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ── S4 期刊案例 ── -->
<section class="section-dark" id="p06-s4" style="padding:var(--space-xxl) var(--space-lg);">
  <div style="max-width:1100px;margin:0 auto;">
    <p class="p06-section-label p06-label-dark" style="text-align:center;">Journal Specifications</p>
    <h2 class="p06-section-title p06-title-dark" style="text-align:center;margin-bottom:var(--space-xxl);">三大顶刊排版规范</h2>
    <div class="p06-journal-grid">
      ${o}
    </div>
  </div>
</section>

<!-- ── Footer CTA ── -->
<section class="page-footer-cta">
  <p class="page-footer-num">06 / 07</p>
  <h2 class="page-footer-quote">一张好的多面板图，是你研究故事的目录页。</h2>
  <p class="page-footer-desc">掌握多面板 Figure 的排版规范，让你的论文图表达到顶刊标准。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p06-btn-prev">← SVG 编辑与优化</button>
    <button class="btn-primary" id="p06-btn-next">资源与工具 →</button>
  </div>
</section>
</div>`}function bo(){const a=Ve.timeline({delay:.2});a.fromTo(".p06-hero .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),a.fromTo(".p06-hero .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),a.fromTo(".p06-hero .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),a.fromTo(".p06-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),a.fromTo("#p06-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),a.fromTo(".p06-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),Za();const e=window.innerWidth<768;if(ta(4),h.layoutId="2x2",h.cells=["main","scatter","bar","box"],na(),Oe(),e){Va();const n=document.getElementById("p06-canvas-grid-m");n&&(n.innerHTML="",n.style.gap=h.spacing+"px",n.style.gridTemplateColumns="repeat(2,1fr)",Array.from({length:6},(i,l)=>{const s=document.createElement("div");s.className="p06-cell p06-cell--filled",s.dataset.cellIndex=l;const c=document.createElement("div");c.className="p06-cell-label",c.textContent=String.fromCharCode(65+l);const u=document.createElement("div");u.className="p06-cell-chart";const d=document.createElement("div");d.className="p06-cell-empty",d.style.display="none",s.appendChild(c),s.appendChild(u),s.appendChild(d),n.appendChild(s)}),n.querySelectorAll(".p06-cell").forEach((i,l)=>{const s=h.cells[l],c=i.querySelector(".p06-cell-chart");s&&c&&Et(c,s,100,60)}))}Ka(),Ja(),Qa();const t=document.getElementById("p06-r-editor");if(t){const n=Bt(t,{code:Tt(),language:"r",readOnly:!0});n&&(et.push(n),at=n)}const o=document.getElementById("p06-py-editor");if(o){const n=Bt(o,{code:At(),language:"python",readOnly:!0});n&&(et.push(n),ot=n)}to(),eo()}function yo(){if(sa(),Pe.forEach(a=>{try{a.destroy()}catch{}}),Pe=[],ze){try{ze.destroy()}catch{}ze=null}et.forEach(a=>{try{a&&a.destroy()}catch{}}),et=[],wt.forEach(({el:a,type:e,fn:t,opts:o})=>{try{a.removeEventListener(e,t,o)}catch{}}),wt=[],tt.forEach(a=>clearTimeout(a)),tt=[],at=null,ot=null,h.cells=Array(h.panelCount).fill(null),h.spacing=12,h.showLabels=!0,h.preset="nature-double"}export{yo as destroy,bo as init,vo as render};
