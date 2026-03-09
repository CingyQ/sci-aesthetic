import{k as G,g as P,f as X}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as O}from"./CodeEditor-BiI1SvFS.js";import{n as R}from"./index-CKSdhN-L.js";import{s as A,b as q,l as z}from"./transform-ZU6R_1Oi.js";import{N,h as I}from"./index-DOot-1bs.js";import{s as Z}from"./ramp-BVcNPFnM.js";import{s as V,x as J,y as K,l as B}from"./line-Ci26EkcQ.js";import{w as Q,c as j}from"./path-CbwjOpE9.js";import{c as M}from"./catmullRom-Dm0ttBHj.js";import{R as U}from"./RdBu-DUpo4zJF.js";import"./math-CRUJxRjv.js";function tt(t,a){return t.parent===a.parent?1:2}function W(t){var a=t.children;return a?a[0]:t.t}function D(t){var a=t.children;return a?a[a.length-1]:t.t}function et(t,a,p){var g=p/(a.i-t.i);a.c-=g,a.s+=p,t.c+=g,a.z+=p,a.m+=p}function at(t){for(var a=0,p=0,g=t.children,n=g.length,y;--n>=0;)y=g[n],y.z+=a,y.m+=a,a+=y.s+(p+=y.c)}function rt(t,a,p){return t.a.parent===a.parent?t.a:p}function L(t,a){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=a}L.prototype=Object.create(N.prototype);function ot(t){for(var a=new L(t,0),p,g=[a],n,y,l,d;p=g.pop();)if(y=p._.children)for(p.children=new Array(d=y.length),l=d-1;l>=0;--l)g.push(n=p.children[l]=new L(y[l],l)),n.parent=p;return(a.parent=new L(null,0)).children=[a],a}function it(){var t=tt,a=1,p=1,g=null;function n(e){var m=ot(e);if(m.eachAfter(y),m.parent.m=-m.z,m.eachBefore(l),g)e.eachBefore(c);else{var s=e,h=e,o=e;e.eachBefore(function(x){x.x<s.x&&(s=x),x.x>h.x&&(h=x),x.depth>o.depth&&(o=x)});var r=s===h?1:t(s,h)/2,i=r-s.x,f=a/(h.x+r+i),u=p/(o.depth||1);e.eachBefore(function(x){x.x=(x.x+i)*f,x.y=x.depth*u})}return e}function y(e){var m=e.children,s=e.parent.children,h=e.i?s[e.i-1]:null;if(m){at(e);var o=(m[0].z+m[m.length-1].z)/2;h?(e.z=h.z+t(e._,h._),e.m=e.z-o):e.z=o}else h&&(e.z=h.z+t(e._,h._));e.parent.A=d(e,h,e.parent.A||s[0])}function l(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function d(e,m,s){if(m){for(var h=e,o=e,r=m,i=h.parent.children[0],f=h.m,u=o.m,x=r.m,w=i.m,$;r=D(r),h=W(h),r&&h;)i=W(i),o=D(o),o.a=e,$=r.z+x-h.z-f+t(r._,h._),$>0&&(et(rt(r,e,s),e,$),f+=$,u+=$),x+=r.m,f+=h.m,w+=i.m,u+=o.m;r&&!D(o)&&(o.t=r,o.m+=x-u),h&&!W(i)&&(i.t=h,i.m+=f-w,s=e)}return s}function c(e){e.x*=a,e.y=e.depth*p}return n.separation=function(e){return arguments.length?(t=e,n):t},n.size=function(e){return arguments.length?(g=!1,a=+e[0],p=+e[1],n):g?null:[a,p]},n.nodeSize=function(e){return arguments.length?(g=!0,a=+e[0],p=+e[1],n):g?[a,p]:null},n}class nt{constructor(a,p){this._context=a,this._x=p}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(a,p){switch(a=+a,p=+p,this._point){case 0:{this._point=1,this._line?this._context.lineTo(a,p):this._context.moveTo(a,p);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+a)/2,this._y0,this._x0,p,a,p):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+p)/2,a,this._y0,a,p);break}}this._x0=a,this._y0=p}}function lt(t){return new nt(t,!1)}function st(t){return t.source}function pt(t){return t.target}function dt(t){let a=st,p=pt,g=J,n=K,y=null,l=null,d=Q(c);function c(){let e;const m=V.call(arguments),s=a.apply(this,m),h=p.apply(this,m);if(y==null&&(l=t(e=d())),l.lineStart(),m[0]=s,l.point(+g.apply(this,m),+n.apply(this,m)),m[0]=h,l.point(+g.apply(this,m),+n.apply(this,m)),l.lineEnd(),e)return l=null,e+""||null}return c.source=function(e){return arguments.length?(a=e,c):a},c.target=function(e){return arguments.length?(p=e,c):p},c.x=function(e){return arguments.length?(g=typeof e=="function"?e:j(+e),c):g},c.y=function(e){return arguments.length?(n=typeof e=="function"?e:j(+e),c):n},c.context=function(e){return arguments.length?(e==null?y=l=null:l=t(y=e),c):y},c}function ct(){return dt(lt)}const ht={id:"Figure",label:"Figure",color:"#7EC8E3",desc:"整个图形的顶层容器，对应一张图片文件。",api:"plt.figure(figsize=(8,6), dpi=150)",children:[{id:"Axes",label:"Axes",color:"#95D5B2",desc:"单个坐标系，包含所有绘图元素。一个 Figure 可有多个 Axes。",api:"fig.add_subplot(1,1,1)  # 或 plt.subplots()",children:[{id:"Title",label:"Title",color:"#B8B8E8",desc:"图表标题文本对象。",api:'ax.set_title("标题", fontsize=14)',children:[]},{id:"XAxis",label:"XAxis",color:"#B8B8E8",desc:"X 轴（含刻度、标签、刻度线）。",api:`ax.set_xlabel("X轴")
ax.xaxis.set_tick_params()`,children:[]},{id:"YAxis",label:"YAxis",color:"#B8B8E8",desc:"Y 轴（含刻度、标签、刻度线）。",api:`ax.set_ylabel("Y轴")
ax.yaxis.set_tick_params()`,children:[]},{id:"Line2D",label:"Line2D",color:"#F0B27A",desc:"折线/散点等绘图元素（Artist）。",api:'line, = ax.plot(x, y, color="#7EC8E3", lw=2)',children:[]},{id:"Legend",label:"Legend",color:"#F0B27A",desc:"图例容器，管理标签和句柄。",api:'ax.legend(loc="upper right", framealpha=0.8)',children:[]},{id:"Annotation",label:"Annotation",color:"#F0D264",desc:"任意文字标注，支持箭头。",api:`ax.annotate("峰值", xy=(x,y), xytext=(x+1,y+2),
  arrowprops=dict(arrowstyle="->"))`,children:[]}]}]},Y=[{id:"scatter",name:"scatterplot",icon:"⊙",desc:"两变量关系分布",params:[{id:"palette",label:"调色板",type:"select",options:["deep","muted","viridis","rocket","coolwarm"],default:"deep"},{id:"alpha",label:"透明度 alpha",type:"range",min:.2,max:1,step:.1,default:.7},{id:"size",label:"点大小 s",type:"range",min:20,max:120,step:10,default:60},{id:"hue",label:"分组 hue",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.scatterplot(
    data=tips, x="total_bill", y="tip",
    ${t.hue?'hue="day", ':""}palette="${t.palette}",
    alpha=${t.alpha}, s=${t.size}, ax=ax
)
ax.set_title("散点图 - 消费与小费关系")
plt.tight_layout()
plt.savefig("scatter.pdf", dpi=300)`},{id:"line",name:"lineplot",icon:"〜",desc:"时间序列/趋势折线",params:[{id:"palette",label:"调色板",type:"select",options:["deep","Set2","viridis","rocket"],default:"deep"},{id:"ci",label:"置信区间",type:"checkbox",default:!0},{id:"markers",label:"显示标记点",type:"checkbox",default:!1}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

flights = sns.load_dataset("flights")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.lineplot(
    data=flights, x="year", y="passengers", hue="month",
    palette="${t.palette}",
    ${t.markers?"markers=True, ":""}errorbar=${t.ci?'"ci"':"None"}, ax=ax
)
ax.set_title("折线图 - 航班乘客月度趋势")
plt.tight_layout()`},{id:"bar",name:"barplot",icon:"▌",desc:"分类变量均值对比",params:[{id:"palette",label:"调色板",type:"select",options:["deep","pastel","Set1","rocket"],default:"pastel"},{id:"orient",label:"方向",type:"select",options:["v","h"],default:"v"},{id:"ci",label:"误差线",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.barplot(
    data=tips, x="day", y="total_bill",
    palette="${t.palette}", orient="${t.orient}",
    errorbar=${t.ci?'"sd"':"None"}, ax=ax
)
ax.set_title("柱状图 - 各天消费均值")
plt.tight_layout()`},{id:"box",name:"boxplot",icon:"⊡",desc:"分布四分位数/异常值",params:[{id:"palette",label:"调色板",type:"select",options:["Set2","deep","pastel","viridis"],default:"Set2"},{id:"width",label:"箱体宽度",type:"range",min:.3,max:.9,step:.1,default:.5},{id:"notch",label:"缺口样式",type:"checkbox",default:!1}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.boxplot(
    data=tips, x="day", y="total_bill",
    palette="${t.palette}", width=${t.width},
    ${t.notch?"notch=True, ":""}ax=ax
)
ax.set_title("箱线图 - 消费分布")
plt.tight_layout()`},{id:"violin",name:"violinplot",icon:"♫",desc:"分布密度+四分位",params:[{id:"palette",label:"调色板",type:"select",options:["muted","Set2","pastel","rocket"],default:"muted"},{id:"inner",label:"内部样式",type:"select",options:["box","quartile","point","stick"],default:"box"},{id:"bw",label:"带宽 bw_adjust",type:"range",min:.5,max:2,step:.25,default:1}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.violinplot(
    data=tips, x="day", y="total_bill",
    palette="${t.palette}",
    inner="${t.inner}",
    bw_adjust=${t.bw}, ax=ax
)
ax.set_title("小提琴图 - 消费密度分布")
plt.tight_layout()`},{id:"hist",name:"histplot",icon:"█",desc:"单变量频率分布",params:[{id:"bins",label:"分箱数 bins",type:"range",min:10,max:50,step:5,default:20},{id:"kde",label:"叠加 KDE 曲线",type:"checkbox",default:!0},{id:"color",label:"颜色",type:"select",options:["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"],default:"#7EC8E3"}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.histplot(
    data=tips, x="total_bill",
    bins=${t.bins}, kde=${t.kde?"True":"False"},
    color="${t.color}", ax=ax
)
ax.set_title("直方图 - 消费额分布")
plt.tight_layout()`},{id:"kde",name:"kdeplot",icon:"∿",desc:"核密度估计曲线",params:[{id:"bw",label:"带宽 bw_adjust",type:"range",min:.3,max:2,step:.1,default:1},{id:"fill",label:"填充区域",type:"checkbox",default:!0},{id:"hue",label:"分组 hue",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.kdeplot(
    data=tips, x="total_bill",
    ${t.hue?'hue="sex", ':""}bw_adjust=${t.bw},
    fill=${t.fill?"True":"False"}, ax=ax
)
ax.set_title("核密度图 - 消费额密度")
plt.tight_layout()`},{id:"heatmap",name:"heatmap",icon:"▦",desc:"矩阵热力图/相关性",params:[{id:"cmap",label:"色图 cmap",type:"select",options:["coolwarm","viridis","RdBu_r","YlOrRd","Blues"],default:"coolwarm"},{id:"annot",label:"显示数值",type:"checkbox",default:!0},{id:"linewidths",label:"格线宽度",type:"range",min:0,max:1,step:.1,default:.5}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")
corr = tips.select_dtypes('number').corr()

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.heatmap(
    corr, cmap="${t.cmap}",
    annot=${t.annot?"True":"False"},
    linewidths=${t.linewidths},
    vmin=-1, vmax=1, center=0, ax=ax
)
ax.set_title("热力图 - 相关矩阵")
plt.tight_layout()`},{id:"pair",name:"pairplot",icon:"⊞",desc:"多变量两两关系矩阵",params:[{id:"palette",label:"调色板",type:"select",options:["deep","Set2","husl","rocket"],default:"deep"},{id:"diag",label:"对角线图形",type:"select",options:["hist","kde"],default:"hist"},{id:"hue",label:"分组 hue",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset("iris")

g = sns.pairplot(
    iris, ${t.hue?'hue="species", ':""}palette="${t.palette}",
    diag_kind="${t.diag}",
    plot_kws={"alpha": 0.6}
)
g.figure.suptitle("Pairplot - 鸢尾花多变量关系", y=1.02)
plt.tight_layout()`},{id:"reg",name:"regplot",icon:"↗",desc:"回归拟合线+置信区间",params:[{id:"ci",label:"置信区间 %",type:"range",min:50,max:99,step:5,default:95},{id:"order",label:"多项式阶数",type:"range",min:1,max:3,step:1,default:1},{id:"scatter",label:"显示散点",type:"checkbox",default:!0},{id:"color",label:"颜色",type:"select",options:["#7EC8E3","#E07A7A","#95D5B2","#F0B27A"],default:"#7EC8E3"}],genCode:t=>`import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset("tips")

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
sns.regplot(
    data=tips, x="total_bill", y="tip",
    ci=${t.ci}, order=${t.order},
    scatter=${t.scatter?"True":"False"},
    color="${t.color}", ax=ax
)
ax.set_title("回归图 - 线性拟合")
plt.tight_layout()`}],xt=[{concept:"散点图",python:`import matplotlib.pyplot as plt
import numpy as np

fig, ax = plt.subplots(figsize=(8,6), dpi=150)
ax.scatter(x, y, c=color, s=60, alpha=0.7)
ax.set_xlabel("X轴")
ax.set_ylabel("Y轴")
ax.spines[["top","right"]].set_visible(False)`,r:`library(ggplot2)

ggplot(df, aes(x=x, y=y, color=group)) +
  geom_point(size=2, alpha=0.7) +
  labs(x="X轴", y="Y轴") +
  theme_minimal()`},{concept:"折线图",python:`fig, ax = plt.subplots(figsize=(8,6), dpi=150)
ax.plot(x, y, color="#7EC8E3", lw=2, marker="o")
ax.fill_between(x, y-err, y+err,
    color="#7EC8E3", alpha=0.2)
ax.set_xlabel("时间")
ax.set_ylabel("值")`,r:`ggplot(df, aes(x=x, y=y, group=grp)) +
  geom_line(color="#7EC8E3", linewidth=1) +
  geom_ribbon(aes(ymin=y-err, ymax=y+err),
              alpha=0.2, fill="#7EC8E3") +
  theme_minimal()`},{concept:"柱状图",python:`fig, ax = plt.subplots(figsize=(8,6), dpi=150)
ax.bar(categories, values,
       color="#95D5B2", edgecolor="white",
       width=0.6)
ax.set_xlabel("类别")
ax.set_ylabel("数值")`,r:`ggplot(df, aes(x=category, y=value,
               fill=category)) +
  geom_col(width=0.6) +
  scale_fill_brewer(palette="Set2") +
  theme_minimal()`},{concept:"分面 Facet",python:`fig, axes = plt.subplots(2, 3, figsize=(12,8))
for ax, grp in zip(axes.flat, groups):
    ax.scatter(x[grp], y[grp],
               color=colors[grp])
    ax.set_title(grp)
plt.tight_layout()`,r:`ggplot(df, aes(x=x, y=y)) +
  geom_point() +
  facet_wrap(~group, ncol=3) +
  theme_minimal()`},{concept:"主题样式",python:`import matplotlib as mpl
plt.style.use("seaborn-v0_8-whitegrid")
# 精细控制：
ax.spines[["top","right"]].set_visible(False)
ax.grid(axis="y", alpha=0.3, linestyle="--")
mpl.rcParams["font.family"] = "sans-serif"`,r:`ggplot(df, aes(x,y)) +
  geom_point() +
  theme_minimal() +
  theme(
    panel.grid.minor = element_blank(),
    text = element_text(family="sans")
  )`},{concept:"配色 Scale",python:`import matplotlib.cm as cm
import seaborn as sns

# 连续配色
colors = cm.viridis(np.linspace(0,1,n))
# 定性配色
sns.set_palette("Set2")`,r:`ggplot(df, aes(x,y,color=z)) +
  geom_point() +
  # 连续：
  scale_color_viridis_c() +
  # 定性：
  # scale_color_brewer(palette="Set2")`},{concept:"标注 Annotate",python:`ax.annotate(
    "关键点",
    xy=(x0, y0),
    xytext=(x0+1, y0+2),
    arrowprops=dict(
        arrowstyle="->",
        color="gray"
    ),
    fontsize=10
)`,r:`ggplot(df, aes(x,y)) +
  geom_point() +
  annotate("text", x=x0+1, y=y0+2,
           label="关键点", size=3) +
  annotate("segment",
           x=x0+1, xend=x0,
           y=y0+2, yend=y0,
           arrow=arrow(length=unit(0.2,"cm")))`},{concept:"保存图片",python:`plt.savefig(
    "fig.pdf",
    dpi=300,
    bbox_inches="tight",
    format="pdf"
)
# 透明背景：
# transparent=True`,r:`ggsave(
    "fig.pdf",
    plot = p,
    width = 88,
    height = 66,
    units = "mm",
    dpi = 300
)`}];let S={cleanupFns:[],resizeObservers:[],sbGallery:null,annCanvas:null};function yt(t){const a=t.querySelector(".mpl-hierarchy-svg"),p=t.querySelector(".mpl-info-panel");if(!a)return;const g=a.clientWidth||420,n=380,y=A(a).append("svg").attr("viewBox",`0 0 ${g} ${n}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto"),l=I(ht);it().size([g-80,n-80])(l),y.selectAll(".mpl-link").data(l.links()).join("path").attr("class","mpl-link").attr("d",ct().x(e=>e.x+40).y(e=>e.y+40)).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1.5);const c=y.selectAll(".mpl-node").data(l.descendants()).join("g").attr("class","mpl-node").attr("transform",e=>`translate(${e.x+40},${e.y+40})`).style("cursor","pointer");c.append("circle").attr("r",22).attr("fill",e=>e.data.color||"#7EC8E3").attr("stroke","#1d1d1f").attr("stroke-width",2).attr("opacity",.9),c.append("text").attr("text-anchor","middle").attr("dy","0.35em").attr("fill","#1d1d1f").attr("font-size",9).attr("font-weight",700).attr("font-family","JetBrains Mono, monospace").text(e=>e.data.label.length>8?e.data.label.slice(0,7)+"…":e.data.label),c.on("click",(e,m)=>{c.selectAll("circle").attr("stroke","#1d1d1f").attr("stroke-width",2),A(e.currentTarget).select("circle").attr("stroke",m.data.color||"#7EC8E3").attr("stroke-width",3.5),p&&(p.innerHTML=`
        <div style="margin-bottom:8px">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${m.data.color};margin-right:8px;vertical-align:middle"></span>
          <strong style="color:${m.data.color};font-size:16px;font-family:var(--font-code)">${m.data.label}</strong>
        </div>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.6;margin:0 0 12px">${m.data.desc}</p>
        <pre style="background:#1d1d1f;color:#f5f5f7;padding:12px 14px;border-radius:8px;font-size:12px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5">${m.data.api}</pre>`)}),c.filter(e=>e.data.id==="Figure").dispatch("click")}function H(t){let a=t;return()=>(a=a*1664525+1013904223&4294967295,(a>>>0)/4294967295)}function ft(t,a,p,g,n){t.selectAll("*").remove();const y={t:20,r:20,b:35,l:40},l=g-y.l-y.r,d=n-y.t-y.b,c=t.append("g").attr("transform",`translate(${y.l},${y.t})`);t.insert("rect","g").attr("width",g).attr("height",n).attr("fill","#1d1d1f").attr("rx",8),c.append("line").attr("x1",0).attr("y1",d).attr("x2",l).attr("y2",d).attr("stroke","#424245").attr("stroke-width",1),c.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",d).attr("stroke","#424245").attr("stroke-width",1);const e=H(42),m=["Mon","Tue","Wed","Thu"],s=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"];if(a==="scatter"){const h=Array.from({length:40},()=>({x:.1+e()*.8,y:.1+e()*.8,g:Math.floor(e()*4)}));c.selectAll("circle").data(h).join("circle").attr("cx",o=>o.x*l).attr("cy",o=>(1-o.y)*d).attr("r",Math.sqrt((p.size||60)/Math.PI)*1.2).attr("fill",o=>p.hue?s[o.g]:"#7EC8E3").attr("opacity",p.alpha||.7)}else if(a==="line"){const h=[0,1,2].map(r=>({gi:r,pts:Array.from({length:8},(i,f)=>({x:f/7,y:.15+r*.22+e()*.12}))})),o=B().x(r=>r.x*l).y(r=>(1-r.y)*d).curve(M);h.forEach(r=>{c.append("path").attr("d",o(r.pts)).attr("fill","none").attr("stroke",s[r.gi]).attr("stroke-width",2),p.markers&&c.selectAll(null).data(r.pts).join("circle").attr("cx",i=>i.x*l).attr("cy",i=>(1-i.y)*d).attr("r",3).attr("fill",s[r.gi])})}else if(a==="bar"){const h=m.map((r,i)=>.3+e()*.5),o=q().domain(m).range([0,l]).padding(.25);if(p.orient==="v")c.selectAll("rect").data(h).join("rect").attr("x",(r,i)=>o(m[i])).attr("y",r=>(1-r)*d).attr("width",o.bandwidth()).attr("height",r=>r*d).attr("fill",(r,i)=>s[i]).attr("rx",3);else{const r=q().domain(m).range([0,d]).padding(.25);c.selectAll("rect").data(h).join("rect").attr("x",0).attr("y",(i,f)=>r(m[f])).attr("width",i=>i*l).attr("height",r.bandwidth()).attr("fill",(i,f)=>s[f]).attr("rx",3)}}else if(a==="box"){const h=(p.width||.5)*l/5;m.forEach((o,r)=>{const i=(r+.5)*(l/4),f=.35+e()*.3,u=f-.1-e()*.08,x=f+.1+e()*.08,w=u-.12,$=x+.12;c.append("line").attr("x1",i).attr("y1",(1-$)*d).attr("x2",i).attr("y2",(1-x)*d).attr("stroke",s[r]).attr("stroke-width",1.5),c.append("line").attr("x1",i).attr("y1",(1-u)*d).attr("x2",i).attr("y2",(1-w)*d).attr("stroke",s[r]).attr("stroke-width",1.5),c.append("rect").attr("x",i-h/2).attr("y",(1-x)*d).attr("width",h).attr("height",(x-u)*d).attr("fill",s[r]).attr("opacity",.7).attr("rx",2),c.append("line").attr("x1",i-h/2).attr("y1",(1-f)*d).attr("x2",i+h/2).attr("y2",(1-f)*d).attr("stroke","#fff").attr("stroke-width",2)})}else if(a==="violin")m.forEach((h,o)=>{const r=(o+.5)*(l/4),i=20,f=[];for(let x=0;x<i;x++){const w=x/(i-1),$=.1+w*.8,b=Math.sin(Math.PI*w)*(.04+e()*.03)*l;f.push({y:$,w:b})}const u=f.map((x,w)=>`${w===0?"M":"L"}${r-x.w},${(1-x.y)*d}`).join(" ")+f.slice().reverse().map(x=>`L${r+x.w},${(1-x.y)*d}`).join(" ")+"Z";c.append("path").attr("d",u).attr("fill",s[o]).attr("opacity",.7)});else if(a==="hist"){const h=Math.min(p.bins||20,15),o=Array.from({length:h},()=>.05+e()*.85),r=l/h;if(c.selectAll("rect").data(o).join("rect").attr("x",(i,f)=>f*r+1).attr("y",i=>(1-i)*d).attr("width",r-2).attr("height",i=>i*d).attr("fill",p.color||"#7EC8E3").attr("opacity",.8),p.kde){const i=Array.from({length:30},(x,w)=>{const $=w/29;return(1-Math.exp(-Math.pow(($-.45)/.2,2)/2)*.85)*d}),u=Array.from({length:30},(x,w)=>w/29*l).map((x,w)=>`${w===0?"M":"L"}${x},${i[w]}`).join(" ");c.append("path").attr("d",u).attr("fill","none").attr("stroke","#F0D264").attr("stroke-width",2)}}else if(a==="kde")[0,1].forEach(h=>{const o=h*.25,r=Array.from({length:30},(u,x)=>{const w=x/29;return(1-Math.exp(-Math.pow((w-.35-o)/.18,2)/2)*.8)*d}),f=Array.from({length:30},(u,x)=>x/29*l).map((u,x)=>`${x===0?"M":"L"}${u},${r[x]}`).join(" ");if(p.hue){if(p.fill){const u=f+`L${l},${d} L0,${d}Z`;c.append("path").attr("d",u).attr("fill",s[h]).attr("opacity",.25)}c.append("path").attr("d",f).attr("fill","none").attr("stroke",s[h]).attr("stroke-width",2)}else if(h===0){if(p.fill){const u=f+`L${l},${d} L0,${d}Z`;c.append("path").attr("d",u).attr("fill","#7EC8E3").attr("opacity",.25)}c.append("path").attr("d",f).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2)}});else if(a==="heatmap"){const o=l/4,r=d/4,i=[[1,.7,-.3,.5],[.7,1,.2,-.1],[-.3,.2,1,-.6],[.5,-.1,-.6,1]],f=Z(U).domain([1,-1]);for(let u=0;u<4;u++)for(let x=0;x<4;x++)c.append("rect").attr("x",x*o).attr("y",u*r).attr("width",o-2).attr("height",r-2).attr("fill",f(i[u][x])).attr("rx",2),p.annot&&c.append("text").attr("x",x*o+o/2).attr("y",u*r+r/2+4).attr("text-anchor","middle").attr("font-size",10).attr("fill","#fff").attr("font-family","JetBrains Mono, monospace").text(i[u][x].toFixed(1))}else if(a==="pair"){const o=l/2,r=d/2;for(let i=0;i<2;i++)for(let f=0;f<2;f++)if(c.append("rect").attr("x",f*o+2).attr("y",i*r+2).attr("width",o-4).attr("height",r-4).attr("fill","#2d2d2f").attr("rx",4),i===f)for(let x=0;x<8;x++){const w=(.2+e()*.6)*r*.8;c.append("rect").attr("x",f*o+4+x*(o-8)/8).attr("y",i*r+r-w-4).attr("width",(o-8)/8-1).attr("height",w).attr("fill",s[i]).attr("opacity",.8)}else for(let u=0;u<12;u++)c.append("circle").attr("cx",f*o+6+e()*(o-12)).attr("cy",i*r+6+e()*(r-12)).attr("r",3).attr("fill",s[f]).attr("opacity",.7)}else if(a==="reg"){const h=Array.from({length:30},()=>({x:.05+e()*.9,y:0}));h.forEach(i=>{i.y=.1+i.x*.7+(e()-.5)*.2}),p.scatter&&c.selectAll("circle").data(h).join("circle").attr("cx",i=>i.x*l).attr("cy",i=>(1-i.y)*d).attr("r",4).attr("fill",p.color||"#7EC8E3").attr("opacity",.5);const o=.7,r=.1;c.append("line").attr("x1",.05*l).attr("y1",(1-(r+.05*o))*d).attr("x2",.95*l).attr("y2",(1-(r+.95*o))*d).attr("stroke",p.color||"#7EC8E3").attr("stroke-width",2.5),c.append("path").attr("d",`M${.05*l},${(1-(r+.05*o+.06))*d} L${.95*l},${(1-(r+.95*o+.04))*d} L${.95*l},${(1-(r+.95*o-.04))*d} L${.05*l},${(1-(r+.05*o-.06))*d}Z`).attr("fill",p.color||"#7EC8E3").attr("opacity",.2)}}function gt(t){if(!t)return null;const a=t.querySelector(".sb-list"),p=t.querySelector(".sb-params"),g=t.querySelector(".sb-preview"),n=t.querySelector(".sb-code");if(!a||!p||!g||!n)return null;let y=Y[0],l=Object.fromEntries(y.params.map(s=>[s.id,s.default])),d=null;Y.forEach((s,h)=>{const o=document.createElement("div");o.className="sb-list-item",o.style.cssText="display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;border-radius:8px;transition:background 0.2s;min-height:44px;min-width:0;",o.innerHTML=`<span style="font-size:16px;flex-shrink:0">${s.icon}</span><div style="min-width:0;overflow:hidden"><div style="font-weight:600;font-size:13px;color:var(--text-on-dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.name}</div><div style="font-size:11px;color:var(--text-on-dark-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${s.desc}</div></div>`,h===0&&(o.style.background="rgba(126,200,227,0.12)"),o.addEventListener("click",()=>{a.querySelectorAll(".sb-list-item").forEach(r=>r.style.background=""),o.style.background="rgba(126,200,227,0.12)",y=s,l=Object.fromEntries(s.params.map(r=>[r.id,r.default])),c(),e(),m()}),a.appendChild(o)});function c(){p.innerHTML=`<div style="font-weight:600;font-size:14px;color:var(--text-on-dark);margin-bottom:14px;font-family:var(--font-code)">${y.name}</div>`,y.params.forEach(s=>{const h=document.createElement("div");h.style.marginBottom="12px",s.type==="select"?h.innerHTML=`<label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">${s.label}</label>
          <select data-pid="${s.id}" style="width:100%;background:#2d2d2f;color:var(--text-on-dark);border:1px solid var(--border-dark);border-radius:6px;padding:6px 8px;font-size:12px;min-height:36px">
            ${s.options.map(o=>`<option value="${o}" ${o===l[s.id]?"selected":""}>${o}</option>`).join("")}
          </select>`:s.type==="range"?h.innerHTML=`<label style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">
          <span>${s.label}</span><span class="pval-${s.id}">${l[s.id]}</span></label>
          <input type="range" data-pid="${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${l[s.id]}"
            style="width:100%;accent-color:var(--accent);min-height:32px;cursor:pointer">`:s.type==="checkbox"&&(h.innerHTML=`<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;color:var(--text-on-dark-2);min-height:44px">
          <input type="checkbox" data-pid="${s.id}" ${l[s.id]?"checked":""} style="width:16px;height:16px;accent-color:var(--accent)">
          ${s.label}</label>`),p.appendChild(h)}),p.querySelectorAll("[data-pid]").forEach(s=>{s.addEventListener("change",()=>{const h=s.dataset.pid;s.type==="checkbox"?l[h]=s.checked:s.type==="range"?l[h]=parseFloat(s.value):l[h]=s.value;const o=p.querySelector(`.pval-${h}`);o&&(o.textContent=l[h]),e(),m()})})}function e(){g.innerHTML="";const s=Math.max(g.clientWidth||0,180),h=320,o=A(g).append("svg").attr("viewBox",`0 0 ${s} ${h}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");ft(o,y.id,l,s,h)}function m(){const s=y.genCode(l);d?d.setCode(s):d=O(n,{language:"python",code:s,readOnly:window.innerWidth<768})}return c(),e(),m(),{destroy(){if(d){try{d.destroy()}catch{}d=null}}}}function mt(t,a){const n=A(t).append("svg").attr("viewBox","0 0 130 80").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");n.append("rect").attr("width",130).attr("height",80).attr("fill","#1d1d1f").attr("rx",6);const y={t:10,r:10,b:16,l:18},l=n.append("g").attr("transform",`translate(${y.l},${y.t})`),d=130-y.l-y.r,c=80-y.t-y.b;l.append("line").attr("x1",0).attr("y1",c).attr("x2",d).attr("y2",c).attr("stroke","#424245").attr("stroke-width",.8),l.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",c).attr("stroke","#424245").attr("stroke-width",.8);const e=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"],m=H(a.length*7+1);if(a==="散点图")for(let s=0;s<22;s++)l.append("circle").attr("cx",m()*d).attr("cy",m()*c).attr("r",2.5).attr("fill",e[Math.floor(m()*3)]).attr("opacity",.8);else if(a==="折线图"){const s=[.55,.35,.65,.45,.75,.6,.85],h=[.25,.15,.3,.2,.4,.28,.45],o=z().domain([0,6]).range([0,d]),r=z().domain([0,1]).range([c,0]),i=B().x((f,u)=>o(u)).y(f=>r(f)).curve(M);l.append("path").attr("d",i(s)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8),l.append("path").attr("d",i(h)).attr("fill","none").attr("stroke","#95D5B2").attr("stroke-width",1.8)}else if(a==="柱状图"){const s=[.55,.8,.4,.65],h=q().domain([0,1,2,3]).range([0,d]).padding(.2);s.forEach((o,r)=>{const i=o*c;l.append("rect").attr("x",h(r)).attr("y",c-i).attr("width",h.bandwidth()).attr("height",i).attr("fill",e[r]).attr("rx",2).attr("opacity",.9)})}else if(a==="分面 Facet"){const s=(d-4)/2,h=(c-4)/2;[[0,0],[1,0],[0,1],[1,1]].forEach(([o,r],i)=>{const f=o*(s+4),u=r*(h+4);l.append("rect").attr("x",f).attr("y",u).attr("width",s).attr("height",h).attr("fill","#2a2a2d").attr("rx",2);const x=H(i*13+3);for(let w=0;w<5;w++)l.append("circle").attr("cx",f+3+x()*(s-6)).attr("cy",u+3+x()*(h-6)).attr("r",2).attr("fill",e[i]).attr("opacity",.85)})}else if(a==="主题样式"){[.25,.5,.75,1].forEach(i=>{l.append("line").attr("x1",0).attr("y1",i*c).attr("x2",d).attr("y2",i*c).attr("stroke","#333336").attr("stroke-dasharray","2,2").attr("stroke-width",.6)});const s=[.3,.5,.42,.68,.55,.78],h=z().domain([0,5]).range([0,d]),o=z().domain([0,1]).range([c,0]),r=B().x((i,f)=>h(f)).y(i=>o(i)).curve(M);l.append("path").attr("d",r(s)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8)}else if(a==="配色 Scale"){const h=n.append("defs").append("linearGradient").attr("id",`cg${a.length}`).attr("x1","0%").attr("x2","100%");h.append("stop").attr("offset","0%").attr("stop-color","#3B4CC0"),h.append("stop").attr("offset","50%").attr("stop-color","#95D5B2"),h.append("stop").attr("offset","100%").attr("stop-color","#F0B27A"),l.append("rect").attr("x",0).attr("y",c/2-5).attr("width",d).attr("height",12).attr("fill",`url(#cg${a.length})`).attr("rx",3),["#3B4CC0","#6A8FD5","#95D5B2","#F0C070","#F0B27A"].forEach((o,r)=>{l.append("circle").attr("cx",(r+.5)*d/5).attr("cy",c/2-18).attr("r",6).attr("fill",o)})}else if(a==="标注 Annotate"){const s=[.25,.45,.38,.7,.55,.65],h=z().domain([0,5]).range([0,d]),o=z().domain([0,1]).range([c,0]),r=B().x((u,x)=>h(x)).y(u=>o(u)).curve(M);l.append("path").attr("d",r(s)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8);const i=h(3),f=o(.7);l.append("circle").attr("cx",i).attr("cy",f).attr("r",4).attr("fill","#F0B27A"),l.append("line").attr("x1",i).attr("y1",f).attr("x2",i-15).attr("y2",f-18).attr("stroke","#F0B27A").attr("stroke-width",1.2),l.append("text").attr("x",i-16).attr("y",f-20).attr("fill","#F0B27A").attr("font-size",8).attr("text-anchor","end").attr("font-family","sans-serif").text("关键点")}else if(a==="保存图片"){const o=(d-32)/2,r=(c-42)/2-4;l.append("path").attr("d",`M${o},${r+8} L${o+8},${r} L${o+32},${r} L${o+32},${r+42} L${o},${r+42} Z`).attr("fill","#2a2a2d").attr("stroke","#424245").attr("stroke-width",1.2),l.append("path").attr("d",`M${o},${r+8} L${o+8},${r+8} L${o+8},${r}`).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1);const i=o+32/2,f=r+42/2+4;l.append("line").attr("x1",i).attr("y1",f-8).attr("x2",i).attr("y2",f+6).attr("stroke","#7EC8E3").attr("stroke-width",1.5),l.append("path").attr("d",`M${i-4},${f+2} L${i},${f+7} L${i+4},${f+2}`).attr("fill","#7EC8E3"),l.append("text").attr("x",i).attr("y",r+42+12).attr("fill","#7EC8E3").attr("font-size",7).attr("text-anchor","middle").attr("font-family","sans-serif").text("PDF/SVG")}}function ut(t){if(!t)return;const a=t.querySelector("#compare-rows"),p=t.querySelector(".compare-tabs");if(!a)return;const g=window.innerWidth<=768,n=g?"80px 1fr":"90px 140px 1fr 1fr";if(!g){const y=document.createElement("div");y.style.cssText=`display:grid;grid-template-columns:${n};gap:12px;padding:8px 0 10px;border-bottom:2px solid var(--border-light);margin-bottom:4px;`,y.innerHTML=`
      <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">概念</div>
      <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">示意图</div>
      <div style="font-size:11px;font-weight:600;color:#7EC8E3;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">🐍 Python / matplotlib</div>
      <div style="font-size:11px;font-weight:600;color:#95D5B2;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">📊 R / ggplot2</div>`,a.appendChild(y)}xt.forEach(y=>{const l=document.createElement("div");l.className="compare-row",l.style.cssText=`display:grid;grid-template-columns:${n};gap:12px;border-top:1px solid var(--border-light);padding:16px 0;align-items:start;`;const d=g?"":'<div class="cmp-mini-wrap" style="border-radius:6px;overflow:hidden;"></div>';l.innerHTML=`
      <div style="font-weight:600;color:var(--accent);font-size:13px;padding-top:4px;font-family:var(--font-code);line-height:1.5">${y.concept}</div>
      ${d}
      <pre class="compare-python" style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${y.python}</pre>
      <pre class="compare-r" style="background:#f5f5f7;color:#1d1d1f;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0${g?";display:none":""}">${y.r}</pre>`,a.appendChild(l),g||mt(l.querySelector(".cmp-mini-wrap"),y.concept)}),g&&p&&(p.style.display="flex",p.querySelectorAll(".compare-tab").forEach(y=>{y.addEventListener("click",()=>{p.querySelectorAll(".compare-tab").forEach(d=>{d.style.background="var(--bg-light-alt)",d.style.color="var(--text-on-light)",d.style.border="1px solid var(--border-light)"}),y.style.background="var(--accent)",y.style.color="#1d1d1f",y.style.border="none";const l=y.dataset.lang;a.querySelectorAll(".compare-python").forEach(d=>{d.style.display=l==="python"?"block":"none"}),a.querySelectorAll(".compare-r").forEach(d=>{d.style.display=l==="r"?"block":"none"})})}))}function bt(t,a,p,g,n,y){const l=Math.atan2(n-p,g-a),d=10;t.strokeStyle=y,t.fillStyle=y,t.lineWidth=2,t.beginPath(),t.moveTo(a,p),t.lineTo(g,n),t.stroke(),t.beginPath(),t.moveTo(g,n),t.lineTo(g-d*Math.cos(l-.4),n-d*Math.sin(l-.4)),t.lineTo(g-d*Math.cos(l+.4),n-d*Math.sin(l+.4)),t.closePath(),t.fill()}function vt(t,a){const p=t.type==="arrow"?Math.min(t.x1,t.x2):t.x,g=t.type==="arrow"?Math.min(t.y1,t.y2):t.y,n=t.type==="arrow"?Math.abs(t.x2-t.x1)+20:t.w||60,y=t.type==="arrow"?Math.abs(t.y2-t.y1)+20:t.h||40;return a.x>=p-10&&a.x<=p+n+10&&a.y>=g-10&&a.y<=g+y+10}function wt(t){if(!t)return null;const a=t.querySelector("#annotate-canvas"),p=t.querySelector(".annotate-toolbar"),g=t.querySelector(".ann-code-editor");if(!a||!p||!g)return null;const n=a.getContext("2d"),y=window.devicePixelRatio||1;let l=null;const d=[];let c="arrow",e=null,m={x:0,y:0},s=null;[{type:"arrow",label:"↗ 箭头"},{type:"text",label:"T 文字"},{type:"rect",label:"□ 方框"},{type:"highlight",label:"◆ 高亮"}].forEach(b=>{const v=document.createElement("button");v.textContent=b.label,v.dataset.type=b.type,v.style.cssText="padding:8px 14px;min-height:44px;background:#2d2d2f;border:1px solid var(--border-dark);border-radius:8px;color:var(--text-on-dark);cursor:pointer;font-size:13px;transition:background 0.2s;white-space:nowrap;",b.type==="arrow"&&(v.style.background="rgba(126,200,227,0.18)"),v.addEventListener("click",()=>{p.querySelectorAll("button[data-type]").forEach(_=>_.style.background="#2d2d2f"),v.style.background="rgba(126,200,227,0.18)",c=b.type}),p.appendChild(v)});const o=document.createElement("button");o.textContent="重置",o.style.cssText="padding:8px 14px;min-height:44px;background:transparent;border:1px solid var(--border-dark);border-radius:8px;color:var(--accent);cursor:pointer;font-size:13px;margin-left:auto;white-space:nowrap;",o.addEventListener("click",()=>{d.length=0,u(),w()}),p.appendChild(o);function r(){const b=a.parentElement.clientWidth||400,v=Math.round(Math.min(b*.55,380));a.width=Math.round(b*y),a.height=Math.round(v*y),a.style.width=b+"px",a.style.height=v+"px",n.setTransform(y,0,0,y,0,0),i(),f()}function i(){const b=a.clientWidth,v=a.clientHeight;n.fillStyle="#1d1d1f",n.fillRect(0,0,b,v),n.strokeStyle="#424245",n.lineWidth=1,n.beginPath(),n.moveTo(55,15),n.lineTo(55,v-30),n.lineTo(b-15,v-30),n.stroke();const _=[30,80,55,120,95,150,110,170,140,185],C=(b-80)/(_.length-1),E=(v-55)/200,T=_.map((k,F)=>({x:55+F*C,y:v-30-k*E}));n.strokeStyle="#7EC8E3",n.lineWidth=2,n.beginPath(),T.forEach((k,F)=>F===0?n.moveTo(k.x,k.y):n.lineTo(k.x,k.y)),n.stroke(),n.fillStyle="#7EC8E3",T.forEach(k=>{n.beginPath(),n.arc(k.x,k.y,3.5,0,Math.PI*2),n.fill()}),n.fillStyle="#6e6e73",n.font="11px sans-serif",n.fillText("时间",b/2-10,v-8),n.save(),n.translate(14,v/2),n.rotate(-Math.PI/2),n.fillText("值",-8,0),n.restore()}function f(){d.forEach(b=>{if(n.save(),b.type==="arrow")bt(n,b.x1,b.y1,b.x2,b.y2,"#F0D264"),n.fillStyle="#F0D264",n.font="bold 11px sans-serif",n.fillText(b.label||"峰值",b.x2+6,b.y2-4);else if(b.type==="text"){n.font="12px sans-serif";const v=n.measureText(b.label||"标注").width;n.fillStyle="rgba(240,210,100,0.9)",n.fillRect(b.x-3,b.y-14,v+8,18),n.fillStyle="#1d1d1f",n.fillText(b.label||"标注",b.x+1,b.y)}else b.type==="rect"?(n.strokeStyle="#E07A7A",n.lineWidth=2,n.setLineDash([5,3]),n.strokeRect(b.x,b.y,b.w||70,b.h||45),n.setLineDash([])):b.type==="highlight"&&(n.fillStyle="rgba(240,178,122,0.22)",n.fillRect(b.x,b.y,b.w||70,b.h||45),n.strokeStyle="#F0B27A",n.lineWidth=1.5,n.strokeRect(b.x,b.y,b.w||70,b.h||45));n.restore()})}function u(){i(),f()}function x(b){const v=a.getBoundingClientRect(),_=a.clientWidth/v.width,C=a.clientHeight/v.height,E=b.clientX??b.touches?.[0]?.clientX??0,T=b.clientY??b.touches?.[0]?.clientY??0;return{x:(E-v.left)*_,y:(T-v.top)*C}}a.addEventListener("pointerdown",b=>{b.preventDefault(),a.setPointerCapture(b.pointerId);const v=x(b);e=d.slice().reverse().find(_=>vt(_,v))||null,e?m={x:v.x-(e.x??e.x1),y:v.y-(e.y??e.y1)}:s=v}),a.addEventListener("pointermove",b=>{if(!e&&!s)return;const v=x(b);if(e){const _=v.x-m.x-(e.x??e.x1),C=v.y-m.y-(e.y??e.y1);e.type==="arrow"?(e.x1+=_,e.y1+=C,e.x2+=_,e.y2+=C):(e.x+=_,e.y+=C),m={x:v.x-(e.x??e.x1),y:v.y-(e.y??e.y1)},u()}}),a.addEventListener("pointerup",b=>{if(!e&&s){const v=x(b);if(c==="arrow")d.push({type:"arrow",x1:s.x,y1:s.y,x2:v.x,y2:v.y,label:"关键点"});else if(c==="text")d.push({type:"text",x:v.x,y:v.y,label:"标注文字"});else{const _=v.x-s.x,C=v.y-s.y;d.push({type:c,x:Math.min(s.x,v.x),y:Math.min(s.y,v.y),w:Math.abs(_)||70,h:Math.abs(C)||45})}u(),w()}e=null,s=null});function w(){const b=a.clientWidth,v=a.clientHeight,_=k=>((k-55)/(b-80)*10).toFixed(1),C=k=>((v-30-k)/(v-55)*200).toFixed(0),E=["import matplotlib.pyplot as plt","","fig, ax = plt.subplots(figsize=(8, 6), dpi=150)","# ... 绘制图表数据 ...",""];d.forEach(k=>{k.type==="arrow"?(E.push(`ax.annotate("${k.label||"关键点"}",`),E.push(`    xy=(${_(k.x2)}, ${C(k.y2)}),`),E.push(`    xytext=(${_(k.x1)}, ${C(k.y1)}),`),E.push('    arrowprops=dict(arrowstyle="->", color="#F0D264"),'),E.push('    color="#F0D264", fontsize=10)')):k.type==="text"?(E.push(`ax.text(${_(k.x)}, ${C(k.y)}, "标注文字",`),E.push('    fontsize=10, color="#F0D264")')):(k.type==="rect"||k.type==="highlight")&&(E.push("from matplotlib.patches import FancyBboxPatch"),E.push(`rect = FancyBboxPatch((${_(k.x)}, ${C(k.y+(k.h||45))}),`),E.push(`    ${((k.w||70)/(b-80)*10).toFixed(1)}, ${((k.h||45)/(v-55)*200).toFixed(0)},`),E.push('    boxstyle="round,pad=0.1",'),E.push(`    fill=${k.type==="highlight"?"True":"False"},`),E.push('    alpha=0.2, color="#F0B27A")'),E.push("ax.add_patch(rect)")),E.push("")}),E.push("plt.tight_layout()");const T=E.join(`
`);l?l.setCode(T):l=O(g,{language:"python",code:T,readOnly:window.innerWidth<768})}r(),w();const $=()=>{r(),w()};return window.addEventListener("resize",$),{destroy(){if(window.removeEventListener("resize",$),l){try{l.destroy()}catch{}l=null}}}}function Pt(){return`
<div class="page-scroll" id="p9-root">
<style>
/* ── Hero ── */
.p9-hero {
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
  background: var(--bg-dark);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-xl) var(--space-lg);
  overflow: hidden;
}
.p9-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 75% 25%, rgba(126,200,227,0.22) 0%, transparent 65%),
              radial-gradient(ellipse 40% 35% at 20% 70%, rgba(149,213,178,0.10) 0%, transparent 65%);
  animation: p9GlowA 14s ease-in-out infinite alternate;
  pointer-events: none;
}
.p9-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 40% at 55% 80%, rgba(126,200,227,0.08) 0%, transparent 60%);
  animation: p9GlowB 11s ease-in-out infinite alternate-reverse;
  pointer-events: none;
}
@keyframes p9GlowA { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(-50px) translateY(30px); } }
@keyframes p9GlowB { 0% { transform: translateX(0) translateY(0); } 100% { transform: translateX(40px) translateY(-40px); } }

/* ── Quicknav ── */
.hero-quicknav { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; margin-top:32px; }
.hero-quicknav__item { padding:8px 18px; min-height:44px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); border-radius:99px; color:var(--text-on-dark); cursor:pointer; font-size:14px; font-family:var(--font-body); transition:background 0.2s; white-space:nowrap; }
.hero-quicknav__item:hover { background:rgba(255,255,255,0.15); }
.scroll-hint { color:var(--text-on-dark-3); font-size:13px; margin-top:24px; }
.page-hero-tagline { color:var(--text-on-dark-2); font-family:var(--font-body); font-size:var(--text-body); line-height:1.7; margin-top:12px; }
.page-hero-title { font:700 var(--text-display) var(--font-display); color:var(--text-on-dark); letter-spacing:-0.02em; line-height:1.1; margin:0; }
.page-hero-sub { font-size:var(--text-body); color:var(--text-on-dark-2); margin-top:8px; font-weight:300; }

/* ── Mobile responsive ── */
@media (max-width: 900px) {
  .sb-gallery-layout { flex-direction: column !important; }
  .sb-list { width: 100% !important; max-height: 200px !important; border-right: none !important; border-bottom: 1px solid var(--border-dark); padding-right: 0 !important; padding-bottom: 12px; overflow-x: auto; display: flex !important; gap: 8px; scrollbar-width: none; }
  .sb-list::-webkit-scrollbar { display: none; }
  .sb-right { width: 100% !important; }
}
@media (max-width: 768px) {
  .p9-hero { padding: var(--space-md) var(--space-sm) !important; }
  .hero-quicknav { gap: 8px; }
  .page-hero-title { font-size: clamp(2rem,7vw,3rem) !important; }
  #mpl-hierarchy-container { flex-direction: column !important; }
  .mpl-info-panel { width: 100% !important; }
  #s4-annotate-canvas > div > div:last-child { width: 100% !important; }
}
@media (max-width: 400px) {
  .hero-quicknav { flex-direction: column; align-items: center; }
}
/* Story block 2-column grid */
.story-grid { display:grid; grid-template-columns:minmax(200px,340px) 1fr; gap:32px; align-items:start; }
@media (max-width: 768px) { .story-grid { grid-template-columns:1fr !important; } }
/* Storytelling blocks responsive */
@media (max-width: 768px) {
  #s5-storytelling .story-block { margin-bottom: 40px !important; }
}
/* Compare table mobile: already handled via JS, but add min-width:0 to pre elements */
#compare-rows pre { min-width: 0; }
/* Seaborn params + preview on small screens */
@media (max-width: 600px) {
  .sb-right > div:first-child { flex-direction: column !important; }
  .sb-params { width: 100% !important; }
}
/* Annotate toolbar wraps on small screens */
.annotate-toolbar { flex-wrap: wrap; }
</style>

<!-- ══════════════════ HERO ══════════════════ -->
<section class="section-dark section-hero-full p9-hero">
  <p class="hero-eyebrow">Module 01 / Page 09</p>
  <h1 class="page-hero-title">Python 可视化与数据叙事</h1>
  <p class="page-hero-sub">Python Visualization &amp; Data Storytelling</p>
  <p class="page-hero-tagline" style="max-width:520px">用 matplotlib 与 seaborn 制作出版级图表，让数据开口说话。</p>
  <nav class="hero-quicknav" id="p09-quicknav">
    <button class="hero-quicknav__item" data-target="#s1-matplotlib-hierarchy">matplotlib 层次</button>
    <button class="hero-quicknav__item" data-target="#s2-seaborn-gallery">seaborn 速查</button>
    <button class="hero-quicknav__item" data-target="#s3-mpl-vs-ggplot">语法对照</button>
    <button class="hero-quicknav__item" data-target="#s4-annotate-canvas">标注演示</button>
    <button class="hero-quicknav__item" data-target="#s5-storytelling">数据叙事</button>
  </nav>
  <p class="scroll-hint">↓ 向下探索</p>
</section>

<!-- ══════════════════ SECTION 01: matplotlib 层次结构 ══════════════════ -->
<section class="section-light" id="s1-matplotlib-hierarchy" style="padding: var(--space-3xl) var(--space-lg); min-height: 60vh; display: flex; flex-direction: column; justify-content: center;">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 01</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">matplotlib 层次结构</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8">理解 Figure / Axes / Artist 的层次关系，是掌握 matplotlib 的关键。点击节点查看详细说明。</p>
    <div id="mpl-hierarchy-container" style="margin-top:32px;display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
      <div class="mpl-hierarchy-svg" style="flex:1;min-width:280px;min-width:0;"></div>
      <div class="mpl-info-panel" style="width:280px;flex-shrink:0;min-height:160px;padding:20px;background:var(--bg-light-alt);border-radius:12px;border:1px solid var(--border-light);box-sizing:border-box;">
        <p style="color:var(--text-on-light-3);margin:0">← 点击节点查看详情</p>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 02: seaborn 速查手册 ══════════════════ -->
<section class="section-dark" id="s2-seaborn-gallery" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 02</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-dark);margin-bottom:16px">seaborn 速查手册</h2>
    <p style="color:var(--text-on-dark-2);max-width:600px;line-height:1.8;margin-bottom:32px">10 种常用图表，选择图表类型，调整参数，实时预览效果与 Python 代码。</p>
    <div class="sb-gallery-layout" style="display:flex;gap:24px;align-items:flex-start;">
      <div class="sb-list" style="width:220px;flex-shrink:0;max-height:500px;overflow-y:auto;scrollbar-width:thin;border-right:1px solid var(--border-dark);padding-right:12px;min-width:0;"></div>
      <div class="sb-right" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:20px;">
        <div style="display:flex;gap:16px;flex-wrap:wrap;">
          <div class="sb-params" style="width:240px;flex-shrink:0;min-width:0;"></div>
          <div class="sb-preview" style="flex:1;min-width:200px;min-width:0;"></div>
        </div>
        <div class="sb-code" style="border-radius:12px;overflow:hidden;min-height:200px;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 03: matplotlib vs ggplot2 ══════════════════ -->
<section class="section-light" id="s3-mpl-vs-ggplot" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 03</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">matplotlib vs ggplot2</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8;margin-bottom:32px">R 用户迁移到 Python 的语法对照手册——相同图表，两种实现。</p>
    <div class="compare-tabs" style="display:none;gap:8px;margin-bottom:16px;">
      <button class="compare-tab active" data-lang="python" style="padding:8px 20px;min-height:44px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:600;">Python</button>
      <button class="compare-tab" data-lang="r" style="padding:8px 20px;min-height:44px;background:var(--bg-light-alt);color:var(--text-on-light);border:1px solid var(--border-light);border-radius:8px;cursor:pointer;font-size:14px;">R / ggplot2</button>
    </div>
    <div id="compare-rows"></div>
  </div>
</section>

<!-- ══════════════════ SECTION 04: annotate 交互演示 ══════════════════ -->
<section class="section-dark" id="s4-annotate-canvas" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 04</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-dark);margin-bottom:16px">annotate 交互演示</h2>
    <p style="color:var(--text-on-dark-2);max-width:600px;line-height:1.8;margin-bottom:32px">在图表上拖放标注元素，实时生成对应的 plt.annotate() Python 代码。</p>
    <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-start;">
      <div style="flex:1;min-width:280px;min-width:0;">
        <div class="annotate-toolbar" style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;"></div>
        <canvas id="annotate-canvas" style="width:100%;border-radius:12px;touch-action:none;cursor:crosshair;display:block;"></canvas>
      </div>
      <div style="width:280px;flex-shrink:0;min-width:0;">
        <h4 style="color:var(--text-on-dark);margin:0 0 12px;font-size:15px;">生成代码</h4>
        <div class="ann-code-editor" style="border-radius:10px;overflow:hidden;min-height:180px;"></div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════ SECTION 05: 图表叙事四种方法 ══════════════════ -->
<section class="section-light" id="s5-storytelling" style="padding: var(--space-3xl) var(--space-lg);">
  <div style="max-width: var(--w-full); margin: 0 auto; width: 100%;">
    <p style="font-family:var(--font-code);font-size:var(--text-small);color:var(--accent);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px">Section 05</p>
    <h2 style="font:700 var(--text-title) var(--font-display);color:var(--text-on-light);margin-bottom:16px">图表叙事四种方法</h2>
    <p style="color:var(--text-on-light-2);max-width:600px;line-height:1.8;margin-bottom:40px">好的图表不只展示数据，更要主动引导读者注意力——以下四种方法是数据叙事的核心工具。</p>
    <div id="story-color-contrast" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-annotation-flow" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-grey-out" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-reveal" class="story-block" style="margin-bottom:60px;"></div>
    <div id="story-compare" style="margin-top:40px;"></div>
  </div>
</section>

<!-- ══════════════════ FOOTER CTA ══════════════════ -->
<section class="page-footer-cta">
  <p class="page-footer-num">09 / 10</p>
  <h2 class="page-footer-quote">"好图表不是装饰，而是论点本身的延伸。"</h2>
  <p class="page-footer-desc">下一页：科研绘图工作流与导出 — 从数据到出版级图表的完整流程</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p9-prev-btn">← 上一页</button>
    <button class="btn-primary" id="p9-next-btn">下一页 →</button>
  </div>
</section>

</div>
`}function kt(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法一</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">颜色对比突出关键数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将需要强调的数据组染成鲜明颜色，其余保持灰色——读者视线被自动吸引。</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <button class="cc-btn active" data-group="all" style="padding:6px 16px;min-height:36px;border-radius:20px;border:none;background:var(--accent);color:#1d1d1f;font-size:13px;cursor:pointer;font-weight:600">全部</button>
          <button class="cc-btn" data-group="A" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 A 组</button>
          <button class="cc-btn" data-group="B" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 B 组</button>
          <button class="cc-btn" data-group="C" style="padding:6px 16px;min-height:36px;border-radius:20px;border:1px solid var(--border-light);background:transparent;color:var(--text-on-light-2);font-size:13px;cursor:pointer">突出 C 组</button>
        </div>
      </div>
      <div class="cc-svg-wrap"></div>
    </div>`;const a=H(55),p=["A","B","C","D"],g={A:"#7EC8E3",B:"#95D5B2",C:"#F0B27A",D:"#B8B8E8"},n=Array.from({length:60},()=>{const r=p[Math.floor(a()*4)];return{x:.05+a()*.9,y:.05+a()*.9,g:r}}),y=480,l=280,d=A(t.querySelector(".cc-svg-wrap")).append("svg").attr("viewBox",`0 0 ${y} ${l}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),c={t:15,r:15,b:30,l:40},e=d.append("g").attr("transform",`translate(${c.l},${c.t})`),m=y-c.l-c.r,s=l-c.t-c.b;e.append("line").attr("x1",0).attr("y1",s).attr("x2",m).attr("y2",s).attr("stroke","#d2d2d7").attr("stroke-width",1),e.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",s).attr("stroke","#d2d2d7").attr("stroke-width",1);const h=e.selectAll("circle").data(n).join("circle").attr("cx",r=>r.x*m).attr("cy",r=>(1-r.y)*s).attr("r",5).attr("fill",r=>g[r.g]).attr("opacity",.75);function o(r){h.transition().duration(400).attr("fill",i=>r==="all"||i.g===r?g[i.g]:"#d2d2d7").attr("opacity",i=>r==="all"?.75:i.g===r?.9:.3),t.querySelectorAll(".cc-btn").forEach(i=>{const f=i.dataset.group===r;i.style.background=f?"var(--accent)":"transparent",i.style.color=f?"#1d1d1f":"var(--text-on-light-2)",i.style.fontWeight=f?"600":"400"})}t.querySelectorAll(".cc-btn").forEach(r=>{r.addEventListener("click",()=>o(r.dataset.group))})}function Et(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法二</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">标注引导阅读顺序</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将分析结论直接写在图表上，箭头和文字标注引导读者按预设顺序理解数据。</p>
        <button id="af-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放标注</button>
      </div>
      <div class="af-svg-wrap"></div>
    </div>`;const a=500,p=260,g=A(t.querySelector(".af-svg-wrap")).append("svg").attr("viewBox",`0 0 ${a} ${p}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),n={t:20,r:20,b:35,l:45},y=g.append("g").attr("transform",`translate(${n.l},${n.t})`),l=a-n.l-n.r,d=p-n.t-n.b;y.append("line").attr("x1",0).attr("y1",d).attr("x2",l).attr("y2",d).attr("stroke","#d2d2d7").attr("stroke-width",1),y.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",d).attr("stroke","#d2d2d7").attr("stroke-width",1);const c=[18,32,28,55,48,72,65,88,78,95],e=z().domain([0,9]).range([0,l]),m=z().domain([0,100]).range([d,0]),s=B().x((x,w)=>e(w)).y(x=>m(x)).curve(M);y.append("path").attr("d",s(c)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5),y.selectAll("circle").data(c).join("circle").attr("cx",(x,w)=>e(w)).attr("cy",x=>m(x)).attr("r",4).attr("fill","#7EC8E3");const h=[{x:e(3),y:m(55),label:"重要转折点",tx:-30,ty:-30},{x:e(7),y:m(88),label:"高峰值",tx:10,ty:-25},{x:e(9),y:m(95),label:"最终水平",tx:-60,ty:15}],o=y.append("g").attr("class","ann-layer"),r=h.map(x=>{const w=o.append("g").style("opacity","0");return w.append("line").attr("x1",x.x).attr("y1",x.y).attr("x2",x.x+x.tx*.7).attr("y2",x.y+x.ty*.7).attr("stroke","#F0D264").attr("stroke-width",1.5).attr("marker-end","url(#arrow-marker)"),w.append("text").attr("x",x.x+x.tx).attr("y",x.y+x.ty).attr("fill","#F0D264").attr("font-size",11).attr("font-weight","600").attr("font-family","sans-serif").text(x.label),w});g.append("defs").append("marker").attr("id","arrow-marker").attr("markerWidth",8).attr("markerHeight",8).attr("refX",6).attr("refY",3).attr("orient","auto").append("path").attr("d","M0,0 L0,6 L8,3 z").attr("fill","#F0D264");let u=!1;t.querySelector("#af-play-btn").addEventListener("click",()=>{u||(u=!0,r.forEach(x=>x.style("opacity","0")),r.forEach((x,w)=>{P.to(x.node(),{opacity:1,duration:.5,delay:w*.8+.2,onComplete:w===r.length-1?()=>{u=!1}:void 0})}))})}function _t(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法三</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">灰化非重点数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:12px">将非核心数据调成低饱和度灰色，让重点数据自然浮现。</p>
        <p style="color:var(--text-on-light-3);font-size:13px;line-height:1.6;font-style:italic">↗ 悬停右侧柱子体验效果</p>
      </div>
      <div class="go-svg-wrap"></div>
    </div>`;const a=["一月","二月","三月","四月","五月","六月"],p=[42,68,55,80,63,91],g=["#7EC8E3","#95D5B2","#F0B27A","#B8B8E8","#E07A7A","#F0D264"],n=480,y=260,l=A(t.querySelector(".go-svg-wrap")).append("svg").attr("viewBox",`0 0 ${n} ${y}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),d={t:15,r:20,b:35,l:45},c=l.append("g").attr("transform",`translate(${d.l},${d.t})`),e=n-d.l-d.r,m=y-d.t-d.b;c.append("line").attr("x1",0).attr("y1",m).attr("x2",e).attr("y2",m).attr("stroke","#d2d2d7");const s=q().domain(a).range([0,e]).padding(.25),h=z().domain([0,100]).range([m,0]);c.selectAll("text.xt").data(a).join("text").attr("class","xt").attr("x",r=>s(r)+s.bandwidth()/2).attr("y",m+16).attr("text-anchor","middle").attr("font-size",11).attr("fill","#6e6e73").text(r=>r);const o=c.selectAll("rect").data(p).join("rect").attr("x",(r,i)=>s(a[i])).attr("y",r=>h(r)).attr("width",s.bandwidth()).attr("height",r=>m-h(r)).attr("fill",(r,i)=>g[i]).attr("rx",3).attr("opacity",.85).style("cursor","pointer");o.on("mouseover",function(r,i){const f=Array.from(this.parentNode.querySelectorAll("rect")).indexOf(this);o.transition().duration(200).attr("fill",(u,x)=>x===f?g[x]:"#d2d2d7").attr("opacity",(u,x)=>x===f?1:.5)}).on("mouseout",()=>{o.transition().duration(200).attr("fill",(r,i)=>g[i]).attr("opacity",.85)})}function $t(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法四</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">分步揭示</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">按时间顺序或分析步骤逐步展示数据，引导读者跟随叙事节奏理解趋势。</p>
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <button id="sr-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放</button>
          <button id="sr-reset-btn" style="padding:8px 16px;min-height:40px;background:transparent;border:1px solid var(--border-light);border-radius:8px;cursor:pointer;font-size:13px;color:var(--text-on-light-2)">重置</button>
          <span id="sr-step-label" style="font-size:13px;color:var(--text-on-light-3);font-family:var(--font-code)">0 / 10</span>
        </div>
      </div>
      <div class="sr-svg-wrap"></div>
    </div>`;const a=[12,28,22,45,38,62,55,75,68,88],p=480,g=250,n=A(t.querySelector(".sr-svg-wrap")).append("svg").attr("viewBox",`0 0 ${p} ${g}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),y={t:15,r:15,b:30,l:45},l=n.append("g").attr("transform",`translate(${y.l},${y.t})`),d=p-y.l-y.r,c=g-y.t-y.b;l.append("line").attr("x1",0).attr("y1",c).attr("x2",d).attr("y2",c).attr("stroke","#d2d2d7"),l.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",c).attr("stroke","#d2d2d7");const e=z().domain([0,9]).range([0,d]),m=z().domain([0,100]).range([c,0]),s=l.selectAll("circle.sr-dot").data(a).join("circle").attr("class","sr-dot").attr("cx",(f,u)=>e(u)).attr("cy",f=>m(f)).attr("r",5).attr("fill","#7EC8E3").attr("opacity",0),h=l.append("path").attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5).attr("opacity",0);let o=null;const r=t.querySelector("#sr-step-label");function i(f){if(r&&(r.textContent=`${f} / ${a.length}`),s.attr("opacity",(u,x)=>x<f?.85:0),f>1){const u=a.slice(0,f),x=B().x((w,$)=>e($)).y(w=>m(w)).curve(M);h.attr("d",x(u)).attr("opacity",1)}else h.attr("opacity",0)}t.querySelector("#sr-play-btn").addEventListener("click",()=>{if(o)return;i(0);let f=0;o=setInterval(()=>{f++,i(f),f>=a.length&&(clearInterval(o),o=null)},500)}),t.querySelector("#sr-reset-btn").addEventListener("click",()=>{o&&(clearInterval(o),o=null),i(0)})}function St(t){if(!t)return;t.innerHTML=`
    <div style="margin-bottom:20px;padding-top:20px;border-top:1px solid var(--border-light)">
      <h3 style="font:700 1.3rem var(--font-display);color:var(--text-on-light);margin-bottom:8px">好/差标注对比</h3>
      <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">同样的折线图，标注质量决定可读性。</p>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
      <div>
        <div style="text-align:center;margin-bottom:8px;font-size:13px;color:#E07A7A;font-weight:600">✗ 标注混乱</div>
        <div class="sc-bad-wrap"></div>
        <p style="font-size:12px;color:var(--text-on-light-3);margin-top:8px;line-height:1.6">过多标注、颜色杂乱、视线无法聚焦</p>
      </div>
      <div>
        <div style="text-align:center;margin-bottom:8px;font-size:13px;color:#95D5B2;font-weight:600">✓ 精准引导</div>
        <div class="sc-good-wrap"></div>
        <p style="font-size:12px;color:var(--text-on-light-3);margin-top:8px;line-height:1.6">只标最关键一个点，简洁有力</p>
      </div>
    </div>`;const a=t.querySelector('div[style*="grid-template-columns"]');window.innerWidth<=600&&a&&(a.style.gridTemplateColumns="1fr");function p(n){const d=A(n).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),c={t:15,r:15,b:25,l:35},e=d.append("g").attr("transform",`translate(${c.l},${c.t})`),m=300-c.l-c.r,s=180-c.t-c.b,h=[20,35,28,55,48,70],o=z().domain([0,5]).range([0,m]),r=z().domain([0,80]).range([s,0]),i=B().x((u,x)=>o(x)).y(u=>r(u)).curve(M);e.append("path").attr("d",i(h)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2),[{x:o(1),y:r(35),label:"增长?",color:"#E64B35"},{x:o(2),y:r(28),label:"下降!",color:"#F0B27A"},{x:o(3),y:r(55),label:"最高点",color:"#4DBBD5"},{x:o(4),y:r(48),label:"又降了",color:"#00A087"},{x:o(5),y:r(70),label:"高点",color:"#3C5488"}].forEach(u=>{e.append("circle").attr("cx",u.x).attr("cy",u.y).attr("r",6).attr("fill",u.color).attr("opacity",.9),e.append("text").attr("x",u.x+6).attr("y",u.y-6).attr("fill",u.color).attr("font-size",9).attr("font-weight","bold").text(u.label)})}function g(n){const d=A(n).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),c={t:15,r:15,b:25,l:35},e=d.append("g").attr("transform",`translate(${c.l},${c.t})`),m=300-c.l-c.r,s=180-c.t-c.b,h=[20,35,28,55,48,70],o=z().domain([0,5]).range([0,m]),r=z().domain([0,80]).range([s,0]),i=B().x((x,w)=>o(w)).y(x=>r(x)).curve(M);e.append("path").attr("d",i(h)).attr("fill","none").attr("stroke","#d2d2d7").attr("stroke-width",2);const f=o(5),u=r(70);e.append("circle").attr("cx",f).attr("cy",u).attr("r",6).attr("fill","#7EC8E3"),e.append("line").attr("x1",f).attr("y1",u-8).attr("x2",f-25).attr("y2",u-30).attr("stroke","#7EC8E3").attr("stroke-width",1.5),e.append("text").attr("x",f-28).attr("y",u-34).attr("fill","#7EC8E3").attr("font-size",10).attr("font-weight","600").attr("text-anchor","end").text("季度最高：70")}p(t.querySelector(".sc-bad-wrap")),g(t.querySelector(".sc-good-wrap"))}function zt(t){t&&(kt(t.querySelector("#story-color-contrast")),Et(t.querySelector("#story-annotation-flow")),_t(t.querySelector("#story-grey-out")),$t(t.querySelector("#story-reveal")),St(t.querySelector("#story-compare")),["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal"].forEach(a=>{const p=document.querySelector(a);p&&P.fromTo(p,{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:p,start:"top 82%",toggleActions:"play none none none"}})}))}function Rt(){S.cleanupFns=[],S.resizeObservers=[],P.timeline().fromTo("#p9-root .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.1).fromTo("#p9-root .page-hero-title",{opacity:0,y:30},{opacity:1,y:0,duration:.6},.25).fromTo("#p9-root .page-hero-sub",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.4).fromTo("#p9-root .page-hero-tagline",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.55).fromTo("#p9-root .hero-quicknav",{opacity:0,y:15},{opacity:1,y:0,duration:.5},.7).fromTo("#p9-root .scroll-hint",{opacity:0},{opacity:1,duration:.4},.9),document.querySelectorAll("#p09-quicknav .hero-quicknav__item").forEach(g=>{const n=()=>{const y=document.querySelector(g.dataset.target);y&&y.scrollIntoView({behavior:"smooth",block:"start"})};g.addEventListener("click",n),S.cleanupFns.push(()=>g.removeEventListener("click",n))});const a=document.getElementById("p9-prev-btn"),p=document.getElementById("p9-next-btn");if(a){const g=()=>R("m1-p8");a.addEventListener("click",g),S.cleanupFns.push(()=>a.removeEventListener("click",g))}if(p){const g=()=>R("m1-p10");p.addEventListener("click",g),S.cleanupFns.push(()=>p.removeEventListener("click",g))}yt(document.getElementById("s1-matplotlib-hierarchy")),S.sbGallery=gt(document.getElementById("s2-seaborn-gallery")),ut(document.getElementById("s3-mpl-vs-ggplot")),S.annCanvas=wt(document.getElementById("s4-annotate-canvas")),zt(document.getElementById("s5-storytelling")),["#s1-matplotlib-hierarchy h2","#s1-matplotlib-hierarchy p","#s2-seaborn-gallery h2","#s2-seaborn-gallery > div > p","#s3-mpl-vs-ggplot h2","#s3-mpl-vs-ggplot > div > p","#s4-annotate-canvas h2","#s4-annotate-canvas > div > p","#s5-storytelling h2","#s5-storytelling > div > p"].forEach(g=>{const n=document.querySelector(g);n&&X(n,{y:40,stagger:0})})}function jt(){G(),S.cleanupFns.forEach(p=>{try{p()}catch{}}),S.cleanupFns=[];const t=document.querySelector("#s1-matplotlib-hierarchy .mpl-hierarchy-svg svg");t&&t.remove(),S.sbGallery&&(S.sbGallery.destroy(),S.sbGallery=null);const a=document.getElementById("compare-rows");a&&(a.innerHTML=""),S.annCanvas&&(S.annCanvas.destroy(),S.annCanvas=null),S.resizeObservers.forEach(p=>p.disconnect()),S.resizeObservers=[],["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal","#story-compare"].forEach(p=>{const g=document.querySelector(p);g&&(g.innerHTML="")})}export{jt as destroy,Rt as init,Pt as render};
