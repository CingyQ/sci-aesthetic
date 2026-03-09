import{k as tt,g as Y,f as et}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as V}from"./CodeEditor-BiI1SvFS.js";import{n as G}from"./index-B0tbaLKl.js";import{s as F,b as W,l as M}from"./transform-ZU6R_1Oi.js";import{N as at,h as rt}from"./index-DOot-1bs.js";import{r as Z,c as J,s as ot}from"./ramp-BVcNPFnM.js";import{s as it,x as nt,y as lt,l as T}from"./line-Ci26EkcQ.js";import{w as st,c as N}from"./path-CbwjOpE9.js";import{c as L}from"./catmullRom-Dm0ttBHj.js";import{a as X}from"./area-D7iSONw5.js";import{b as q,R,v as pt}from"./basis-DySTvzFC.js";import"./math-CRUJxRjv.js";function dt(t,a){return t.parent===a.parent?1:2}function j(t){var a=t.children;return a?a[0]:t.t}function O(t){var a=t.children;return a?a[a.length-1]:t.t}function ct(t,a,l){var v=l/(a.i-t.i);a.c-=v,a.s+=l,t.c+=v,a.z+=l,a.m+=l}function ht(t){for(var a=0,l=0,v=t.children,n=v.length,u;--n>=0;)u=v[n],u.z+=a,u.m+=a,a+=u.s+(l+=u.c)}function ft(t,a,l){return t.a.parent===a.parent?t.a:l}function H(t,a){this._=t,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=a}H.prototype=Object.create(at.prototype);function xt(t){for(var a=new H(t,0),l,v=[a],n,u,d,s;l=v.pop();)if(u=l._.children)for(l.children=new Array(s=u.length),d=s-1;d>=0;--d)v.push(n=l.children[d]=new H(u[d],d)),n.parent=l;return(a.parent=new H(null,0)).children=[a],a}function yt(){var t=dt,a=1,l=1,v=null;function n(e){var w=xt(e);if(w.eachAfter(u),w.parent.m=-w.z,w.eachBefore(d),v)e.eachBefore(p);else{var x=e,g=e,y=e;e.eachBefore(function(r){r.x<x.x&&(x=r),r.x>g.x&&(g=r),r.depth>y.depth&&(y=r)});var o=x===g?1:t(x,g)/2,c=o-x.x,h=a/(g.x+o+c),f=l/(y.depth||1);e.eachBefore(function(r){r.x=(r.x+c)*h,r.y=r.depth*f})}return e}function u(e){var w=e.children,x=e.parent.children,g=e.i?x[e.i-1]:null;if(w){ht(e);var y=(w[0].z+w[w.length-1].z)/2;g?(e.z=g.z+t(e._,g._),e.m=e.z-y):e.z=y}else g&&(e.z=g.z+t(e._,g._));e.parent.A=s(e,g,e.parent.A||x[0])}function d(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function s(e,w,x){if(w){for(var g=e,y=e,o=w,c=g.parent.children[0],h=g.m,f=y.m,r=o.m,b=c.m,E;o=O(o),g=j(g),o&&g;)c=j(c),y=O(y),y.a=e,E=o.z+r-g.z-h+t(o._,g._),E>0&&(ct(ft(o,e,x),e,E),h+=E,f+=E),r+=o.m,h+=g.m,b+=c.m,f+=y.m;o&&!O(y)&&(y.t=o,y.m+=r-f),g&&!j(c)&&(c.t=g,c.m+=h-b,x=e)}return x}function p(e){e.x*=a,e.y=e.depth*l}return n.separation=function(e){return arguments.length?(t=e,n):t},n.size=function(e){return arguments.length?(v=!1,a=+e[0],l=+e[1],n):v?null:[a,l]},n.nodeSize=function(e){return arguments.length?(v=!0,a=+e[0],l=+e[1],n):v?[a,l]:null},n}var gt=new Array(3).concat("deebf79ecae13182bd","eff3ffbdd7e76baed62171b5","eff3ffbdd7e76baed63182bd08519c","eff3ffc6dbef9ecae16baed63182bd08519c","eff3ffc6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594","f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(J);const mt=Z(gt);var ut=new Array(3).concat("fee6cefdae6be6550d","feeddefdbe85fd8d3cd94701","feeddefdbe85fd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3ce6550da63603","feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04","fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(J);const bt=Z(ut);class vt{constructor(a,l){this._context=a,this._x=l}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(a,l){switch(a=+a,l=+l,this._point){case 0:{this._point=1,this._line?this._context.lineTo(a,l):this._context.moveTo(a,l);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+a)/2,this._y0,this._x0,l,a,l):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+l)/2,a,this._y0,a,l);break}}this._x0=a,this._y0=l}}function wt(t){return new vt(t,!1)}function kt(t){return t.source}function Et(t){return t.target}function _t(t){let a=kt,l=Et,v=nt,n=lt,u=null,d=null,s=st(p);function p(){let e;const w=it.call(arguments),x=a.apply(this,w),g=l.apply(this,w);if(u==null&&(d=t(e=s())),d.lineStart(),w[0]=x,d.point(+v.apply(this,w),+n.apply(this,w)),w[0]=g,d.point(+v.apply(this,w),+n.apply(this,w)),d.lineEnd(),e)return d=null,e+""||null}return p.source=function(e){return arguments.length?(a=e,p):a},p.target=function(e){return arguments.length?(l=e,p):l},p.x=function(e){return arguments.length?(v=typeof e=="function"?e:N(+e),p):v},p.y=function(e){return arguments.length?(n=typeof e=="function"?e:N(+e),p):n},p.context=function(e){return arguments.length?(e==null?u=d=null:d=t(u=e),p):u},p}function $t(){return _t(wt)}const At={id:"Figure",label:"Figure",color:"#7EC8E3",desc:"整个图形的顶层容器，对应一张图片文件。",api:"plt.figure(figsize=(8,6), dpi=150)",children:[{id:"Axes",label:"Axes",color:"#95D5B2",desc:"单个坐标系，包含所有绘图元素。一个 Figure 可有多个 Axes。",api:"fig.add_subplot(1,1,1)  # 或 plt.subplots()",children:[{id:"Title",label:"Title",color:"#B8B8E8",desc:"图表标题文本对象。",api:'ax.set_title("标题", fontsize=14)',children:[]},{id:"XAxis",label:"XAxis",color:"#B8B8E8",desc:"X 轴（含刻度、标签、刻度线）。",api:`ax.set_xlabel("X轴")
ax.xaxis.set_tick_params()`,children:[]},{id:"YAxis",label:"YAxis",color:"#B8B8E8",desc:"Y 轴（含刻度、标签、刻度线）。",api:`ax.set_ylabel("Y轴")
ax.yaxis.set_tick_params()`,children:[]},{id:"Line2D",label:"Line2D",color:"#F0B27A",desc:"折线/散点等绘图元素（Artist）。",api:'line, = ax.plot(x, y, color="#7EC8E3", lw=2)',children:[]},{id:"Legend",label:"Legend",color:"#F0B27A",desc:"图例容器，管理标签和句柄。",api:'ax.legend(loc="upper right", framealpha=0.8)',children:[]},{id:"Annotation",label:"Annotation",color:"#F0D264",desc:"任意文字标注，支持箭头。",api:`ax.annotate("峰值", xy=(x,y), xytext=(x+1,y+2),
  arrowprops=dict(arrowstyle="->"))`,children:[]}]}]},I=[{id:"scatter",name:"scatterplot",icon:"⊙",desc:"两变量关系分布",params:[{id:"palette",label:"调色板",type:"select",options:["deep","muted","viridis","rocket","coolwarm"],default:"deep"},{id:"alpha",label:"透明度 alpha",type:"range",min:.2,max:1,step:.1,default:.7},{id:"size",label:"点大小 s",type:"range",min:20,max:120,step:10,default:60},{id:"hue",label:"分组 hue",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
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
plt.tight_layout()`}],St=[{concept:"散点图",python:`import matplotlib.pyplot as plt
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
)`}];let C={cleanupFns:[],resizeObservers:[],sbGallery:null,annCanvas:null};function Ct(t){const a=t.querySelector(".mpl-hierarchy-svg"),l=t.querySelector(".mpl-info-panel");if(!a)return;const v=a.clientWidth||420,n=380,u=F(a).append("svg").attr("viewBox",`0 0 ${v} ${n}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto"),d=rt(At);yt().size([v-80,n-80])(d),u.selectAll(".mpl-link").data(d.links()).join("path").attr("class","mpl-link").attr("d",$t().x(e=>e.x+40).y(e=>e.y+40)).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1.5);const p=u.selectAll(".mpl-node").data(d.descendants()).join("g").attr("class","mpl-node").attr("transform",e=>`translate(${e.x+40},${e.y+40})`).style("cursor","pointer");p.append("circle").attr("r",22).attr("fill",e=>e.data.color||"#7EC8E3").attr("stroke","#1d1d1f").attr("stroke-width",2).attr("opacity",.9),p.append("text").attr("text-anchor","middle").attr("dy","0.35em").attr("fill","#1d1d1f").attr("font-size",9).attr("font-weight",700).attr("font-family","JetBrains Mono, monospace").text(e=>e.data.label.length>8?e.data.label.slice(0,7)+"…":e.data.label),p.on("click",(e,w)=>{p.selectAll("circle").attr("stroke","#1d1d1f").attr("stroke-width",2),F(e.currentTarget).select("circle").attr("stroke",w.data.color||"#7EC8E3").attr("stroke-width",3.5),l&&(l.innerHTML=`
        <div style="margin-bottom:8px">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${w.data.color};margin-right:8px;vertical-align:middle"></span>
          <strong style="color:${w.data.color};font-size:16px;font-family:var(--font-code)">${w.data.label}</strong>
        </div>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.6;margin:0 0 12px">${w.data.desc}</p>
        <pre style="background:#1d1d1f;color:#f5f5f7;padding:12px 14px;border-radius:8px;font-size:12px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5">${w.data.api}</pre>`)}),p.filter(e=>e.data.id==="Figure").dispatch("click")}function D(t){let a=t;return()=>(a=a*1664525+1013904223&4294967295,(a>>>0)/4294967295)}function zt(t,a,l,v,n){t.selectAll("*").remove();const u={t:25,r:20,b:35,l:45},d=v-u.l-u.r,s=n-u.t-u.b,p=t.append("g").attr("transform",`translate(${u.l},${u.t})`);t.insert("rect","g").attr("width",v).attr("height",n).attr("fill","#1d1d1f").attr("rx",8);for(let o=1;o<=4;o++)p.append("line").attr("x1",0).attr("y1",o*s/4).attr("x2",d).attr("y2",o*s/4).attr("stroke","#2d2d2f").attr("stroke-width",1);p.append("line").attr("x1",0).attr("y1",s).attr("x2",d).attr("y2",s).attr("stroke","#424245").attr("stroke-width",1),p.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",s).attr("stroke","#424245").attr("stroke-width",1);const e=D(42),w=["A","B","C","D"],x={deep:["#4C72B0","#DD8452","#55A868","#C44E52"],Set2:["#66C2A5","#FC8D62","#8DA0CB","#E78AC3"],Set1:["#E41A1C","#377EB8","#4DAF4A","#984EA3"],pastel:["#AEC6CF","#FFD1DC","#B5EAD7","#FFDAC1"],viridis:["#440154","#31688E","#35B779","#FDE725"],muted:["#4878D0","#EE854A","#6ACC64","#D65F5F"],rocket:["#03051A","#4A0C5C","#B0298B","#F87060"],husl:["#F77189","#BB9832","#50B131","#36ADA4"]},g=l.palette&&x[l.palette]||["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"];function y(o,c,h,f="middle"){p.append("text").attr("x",o).attr("y",c).attr("text-anchor",f).attr("font-size",10).attr("fill","#6e6e73").attr("font-family","sans-serif").text(h)}if(a==="scatter"){const o=Array.from({length:50},()=>({x:.05+e()*.9,y:.05+e()*.9,gi:Math.floor(e()*4)})),c=Math.max(2,Math.sqrt((l.size||60)/Math.PI)*1.1);p.selectAll("circle").data(o).join("circle").attr("cx",h=>h.x*d).attr("cy",h=>(1-h.y)*s).attr("r",c).attr("fill",h=>l.hue?g[h.gi]:g[0]).attr("opacity",l.alpha||.7)}else if(a==="line"){const c=Array.from({length:3},(f,r)=>({gi:r,pts:Array.from({length:10},(b,E)=>({x:E/9,y:Math.max(.02,Math.min(.92,.12+r*.22+e()*.08+Math.sin(E/3)*.06))}))})),h=T().x(f=>f.x*d).y(f=>(1-f.y)*s).curve(L);c.forEach(f=>{if(l.ci){const r=X().x(b=>b.x*d).y0(b=>(1-Math.max(.02,b.y-.06))*s).y1(b=>(1-Math.min(.92,b.y+.06))*s).curve(L);p.append("path").attr("d",r(f.pts)).attr("fill",g[f.gi]).attr("opacity",.2)}p.append("path").attr("d",h(f.pts)).attr("fill","none").attr("stroke",g[f.gi]).attr("stroke-width",2),l.markers&&p.selectAll(`.mk${f.gi}`).data(f.pts).join("circle").attr("class",`.mk${f.gi}`).attr("cx",r=>r.x*d).attr("cy",r=>(1-r.y)*s).attr("r",3.5).attr("fill",g[f.gi])}),[0,3,6,9].forEach(f=>y(f/9*d,s+14,`Q${f+1}`))}else if(a==="bar"){const o=w.map(()=>.35+e()*.45),c=o.map(h=>h*.1+.03);if(l.orient==="v"){const h=W().domain(w).range([0,d]).padding(.28);p.selectAll("rect").data(o).join("rect").attr("x",(f,r)=>h(w[r])).attr("y",f=>(1-f)*s).attr("width",h.bandwidth()).attr("height",f=>f*s).attr("fill",(f,r)=>g[r]).attr("rx",3),l.ci&&o.forEach((f,r)=>{const b=h(w[r])+h.bandwidth()/2,E=(1-(f+c[r]))*s,i=(1-(f-c[r]))*s;p.append("line").attr("x1",b).attr("y1",E).attr("x2",b).attr("y2",i).attr("stroke","#fff").attr("stroke-width",1.5),[[b-5,E],[b+5,E],[b-5,i],[b+5,i]].forEach(([m,k],[$,A])=>{}),p.append("line").attr("x1",b-5).attr("y1",E).attr("x2",b+5).attr("y2",E).attr("stroke","#fff").attr("stroke-width",1.5),p.append("line").attr("x1",b-5).attr("y1",i).attr("x2",b+5).attr("y2",i).attr("stroke","#fff").attr("stroke-width",1.5)}),w.forEach((f,r)=>y(h(f)+h.bandwidth()/2,s+14,f))}else{const h=W().domain(w).range([0,s]).padding(.28);p.selectAll("rect").data(o).join("rect").attr("x",0).attr("y",(f,r)=>h(w[r])).attr("width",f=>f*d).attr("height",h.bandwidth()).attr("fill",(f,r)=>g[r]).attr("rx",3),l.ci&&o.forEach((f,r)=>{const b=h(w[r])+h.bandwidth()/2,E=(f+c[r])*d;p.append("line").attr("x1",E).attr("y1",b-6).attr("x2",E).attr("y2",b+6).attr("stroke","#fff").attr("stroke-width",1.5)}),w.forEach((f,r)=>y(-6,h(f)+h.bandwidth()/2+4,f,"end"))}}else if(a==="box"){const o=(l.width||.5)*d/5.5,c=!!l.notch;w.forEach((h,f)=>{const r=(f+.5)*(d/4),b=.35+e()*.28,E=Math.max(.04,b-.1-e()*.06),i=Math.min(.94,b+.1+e()*.06),m=Math.max(.01,E-.13),k=Math.min(.97,i+.13),$=g[f];if(p.append("line").attr("x1",r).attr("y1",(1-k)*s).attr("x2",r).attr("y2",(1-i)*s).attr("stroke",$).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),p.append("line").attr("x1",r).attr("y1",(1-E)*s).attr("x2",r).attr("y2",(1-m)*s).attr("stroke",$).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),p.append("line").attr("x1",r-o/3).attr("y1",(1-k)*s).attr("x2",r+o/3).attr("y2",(1-k)*s).attr("stroke",$).attr("stroke-width",1.5),p.append("line").attr("x1",r-o/3).attr("y1",(1-m)*s).attr("x2",r+o/3).attr("y2",(1-m)*s).attr("stroke",$).attr("stroke-width",1.5),c){const A=o*.45,z=(1-b)*s,_=(1-E)*s,S=(1-i)*s,B=`M${r-o/2},${S} L${r-o/2},${z-7} L${r-A/2},${z} L${r-o/2},${z+7} L${r-o/2},${_} L${r+o/2},${_} L${r+o/2},${z+7} L${r+A/2},${z} L${r+o/2},${z-7} L${r+o/2},${S}Z`;p.append("path").attr("d",B).attr("fill",$).attr("opacity",.7)}else p.append("rect").attr("x",r-o/2).attr("y",(1-i)*s).attr("width",o).attr("height",(i-E)*s).attr("fill",$).attr("opacity",.7).attr("rx",2);p.append("line").attr("x1",r-o/2).attr("y1",(1-b)*s).attr("x2",r+o/2).attr("y2",(1-b)*s).attr("stroke","#fff").attr("stroke-width",2),y(r,s+14,h)})}else if(a==="violin"){const o=Math.max(.4,Math.min(2.5,l.bw||1)),c=l.inner||"box";w.forEach((h,f)=>{const r=(f+.5)*(d/4),b=g[f],E=28,i=[];for(let S=0;S<E;S++){const B=S/(E-1),P=.05+B*.9,Q=Math.sin(Math.PI*B),K=Math.sin(Math.PI*B*1.6+f*.6)*.18,U=Math.max(1,(Q+K)*(.035+e()*.018)*o*d);i.push({y:P,w:U})}const m=i.map((S,B)=>`${B===0?"M":"L"}${r-S.w},${(1-S.y)*s}`).join(" ")+i.slice().reverse().map(S=>`L${r+S.w},${(1-S.y)*s}`).join(" ")+"Z";p.append("path").attr("d",m).attr("fill",b).attr("opacity",.65);const k=.38+e()*.22,$=Math.max(.06,k-.1),A=Math.min(.92,k+.1),z=Math.floor(E/2),_=i[z].w*.45;if(c==="box")p.append("rect").attr("x",r-_/2).attr("y",(1-A)*s).attr("width",_).attr("height",(A-$)*s).attr("fill","#1d1d1f").attr("stroke",b).attr("stroke-width",1),p.append("circle").attr("cx",r).attr("cy",(1-k)*s).attr("r",3).attr("fill","#fff");else if(c==="quartile")[$,k,A].forEach(S=>{p.append("line").attr("x1",r-_).attr("y1",(1-S)*s).attr("x2",r+_).attr("y2",(1-S)*s).attr("stroke",S===k?"#fff":"#aaa").attr("stroke-width",S===k?2:1)});else if(c==="point")for(let S=0;S<12;S++){const B=.08+e()*.84,P=(e()-.5)*_*1.8;p.append("circle").attr("cx",r+P).attr("cy",(1-B)*s).attr("r",1.5).attr("fill","#fff").attr("opacity",.75)}else if(c==="stick")for(let S=0;S<12;S++){const B=.08+e()*.84;p.append("line").attr("x1",r-_*.9).attr("y1",(1-B)*s).attr("x2",r+_*.9).attr("y2",(1-B)*s).attr("stroke","#fff").attr("stroke-width",.8).attr("opacity",.7)}y(r,s+14,h)})}else if(a==="hist"){const o=Math.max(4,Math.min(l.bins||20,18)),c=.45,h=.18,f=Array.from({length:o},(b,E)=>{const i=(E+.5)/o;return Math.exp(-Math.pow((i-c)/h,2)/2)*(.7+e()*.18)}),r=d/o;if(p.selectAll("rect").data(f).join("rect").attr("x",(b,E)=>E*r+1).attr("y",b=>(1-b)*s).attr("width",r-2).attr("height",b=>b*s).attr("fill",l.color||"#7EC8E3").attr("opacity",.85),l.kde){const b=Array.from({length:60},(E,i)=>{const m=i/59;return{x:m,y:Math.exp(-Math.pow((m-c)/h,2)/2)*.92}});p.append("path").attr("d",T().x(E=>E.x*d).y(E=>(1-E.y)*s).curve(q)(b)).attr("fill","none").attr("stroke","#F0D264").attr("stroke-width",2.5)}}else if(a==="kde"){const c=.12*Math.max(.3,l.bw||1),h=l.hue?3:1,f=[.28,.48,.68];for(let r=0;r<h;r++){const b=g[r],E=Array.from({length:60},(m,k)=>{const $=k/59;return{x:$,y:Math.exp(-Math.pow(($-f[r])/c,2)/2)*.88}}),i=T().x(m=>m.x*d).y(m=>(1-m.y)*s).curve(q);if(l.fill){const m=X().x(k=>k.x*d).y0(s).y1(k=>(1-k.y)*s).curve(q);p.append("path").attr("d",m(E)).attr("fill",b).attr("opacity",.2)}p.append("path").attr("d",i(E)).attr("fill","none").attr("stroke",b).attr("stroke-width",2.5)}}else if(a==="heatmap"){const c=d/4,h=s/4,f=[[1,.72,-.31,.54],[.72,1,.18,-.08],[-.31,.18,1,-.63],[.54,-.08,-.63,1]],b=ot({coolwarm:R,viridis:pt,RdBu:R,Blues:mt,Oranges:bt}[l.cmap]||R).domain([1,-1]),E=["X1","X2","X3","X4"];for(let i=0;i<4;i++)for(let m=0;m<4;m++)if(p.append("rect").attr("x",m*c+1).attr("y",i*h+1).attr("width",c-2).attr("height",h-2).attr("fill",b(f[i][m])).attr("rx",2),l.annot){const k=l.fmt===".2f"?2:1;p.append("text").attr("x",m*c+c/2).attr("y",i*h+h/2+4).attr("text-anchor","middle").attr("font-size",9).attr("fill","#fff").attr("font-weight","600").attr("font-family","JetBrains Mono, monospace").text(f[i][m].toFixed(k))}E.forEach((i,m)=>y(m*c+c/2,s+14,i))}else if(a==="pair"){const c=d/2,h=s/2,f=l.hue?3:1;for(let r=0;r<2;r++)for(let b=0;b<2;b++)if(p.append("rect").attr("x",b*c+2).attr("y",r*h+2).attr("width",c-4).attr("height",h-4).attr("fill","#2d2d2f").attr("rx",4),r===b)if(l.diag==="kde")for(let E=0;E<f;E++){const i=.25+E*.25,m=Array.from({length:20},(k,$)=>{const A=$/19;return{x:A,y:Math.exp(-Math.pow((A-i)/.16,2)/2)*.85}});p.append("path").attr("d",T().x(k=>b*c+4+k.x*(c-8)).y(k=>r*h+h-4-k.y*(h-8)).curve(q)(m)).attr("fill","none").attr("stroke",g[E]).attr("stroke-width",1.5)}else for(let i=0;i<f;i++)for(let m=0;m<6;m++){const k=(.15+e()*.55)*(h-8)*.8,$=(c-8)/6/f;p.append("rect").attr("x",b*c+4+m*(c-8)/6+i*$).attr("y",r*h+h-4-k).attr("width",$-1).attr("height",k).attr("fill",g[i]).attr("opacity",.85)}else for(let E=0;E<f;E++)for(let i=0;i<8;i++)p.append("circle").attr("cx",b*c+5+e()*(c-10)).attr("cy",r*h+5+e()*(h-10)).attr("r",2.5).attr("fill",l.hue?g[E]:g[0]).attr("opacity",.75);["V1","V2"].forEach((r,b)=>y(b*c+c/2,s+14,r))}else if(a==="reg"){const o=l.order||1,c=l.color||"#7EC8E3",h=(l.ci||95)/100*.07,f=Array.from({length:35},()=>({x:.05+e()*.9,y:0}));f.forEach(i=>{o===1?i.y=.1+i.x*.7+(e()-.5)*.16:o===2?i.y=.1+.1*i.x+.9*i.x*i.x+(e()-.5)*.13:i.y=.7-2.2*i.x+3.5*i.x*i.x-1.5*i.x*i.x*i.x+(e()-.5)*.1,i.y=Math.max(.02,Math.min(.95,i.y))}),l.scatter&&p.selectAll("circle").data(f).join("circle").attr("cx",i=>i.x*d).attr("cy",i=>(1-i.y)*s).attr("r",3.5).attr("fill",c).attr("opacity",.45);const r=Array.from({length:50},(i,m)=>{const k=.05+m/49*.9;let $;return o===1?$=.1+k*.7:o===2?$=.1+.1*k+.9*k*k:$=.7-2.2*k+3.5*k*k-1.5*k*k*k,{x:k,y:Math.max(.02,Math.min(.95,$))}}),b=r.map(i=>({x:i.x*d,y:(1-Math.min(.95,i.y+h))*s})),E=[...r].reverse().map(i=>({x:i.x*d,y:(1-Math.max(.02,i.y-h))*s}));p.append("path").attr("d",b.map((i,m)=>`${m===0?"M":"L"}${i.x},${i.y}`).join(" ")+" "+E.map(i=>`L${i.x},${i.y}`).join(" ")+"Z").attr("fill",c).attr("opacity",.2),p.append("path").attr("d",T().x(i=>i.x*d).y(i=>(1-i.y)*s).curve(L)(r)).attr("fill","none").attr("stroke",c).attr("stroke-width",2.5)}}function Mt(t){if(!t)return null;const a=t.querySelector(".sb-list"),l=t.querySelector(".sb-params"),v=t.querySelector(".sb-preview"),n=t.querySelector(".sb-code");if(!a||!l||!v||!n)return null;let u=I[0],d=Object.fromEntries(u.params.map(x=>[x.id,x.default])),s=null;I.forEach((x,g)=>{const y=document.createElement("div");y.className="sb-list-item",y.style.cssText="display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;border-radius:8px;transition:background 0.2s;min-height:44px;min-width:0;",y.innerHTML=`<span style="font-size:16px;flex-shrink:0">${x.icon}</span><div style="min-width:0;overflow:hidden"><div style="font-weight:600;font-size:13px;color:var(--text-on-dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.name}</div><div style="font-size:11px;color:var(--text-on-dark-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${x.desc}</div></div>`,g===0&&(y.style.background="rgba(126,200,227,0.12)"),y.addEventListener("click",()=>{a.querySelectorAll(".sb-list-item").forEach(o=>o.style.background=""),y.style.background="rgba(126,200,227,0.12)",u=x,d=Object.fromEntries(x.params.map(o=>[o.id,o.default])),p(),e(),w()}),a.appendChild(y)});function p(){l.innerHTML=`<div style="font-weight:600;font-size:14px;color:var(--text-on-dark);margin-bottom:14px;font-family:var(--font-code)">${u.name}</div>`,u.params.forEach(x=>{const g=document.createElement("div");g.style.marginBottom="12px",x.type==="select"?g.innerHTML=`<label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">${x.label}</label>
          <select data-pid="${x.id}" style="width:100%;background:#2d2d2f;color:var(--text-on-dark);border:1px solid var(--border-dark);border-radius:6px;padding:6px 8px;font-size:12px;min-height:36px">
            ${x.options.map(y=>`<option value="${y}" ${y===d[x.id]?"selected":""}>${y}</option>`).join("")}
          </select>`:x.type==="range"?g.innerHTML=`<label style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">
          <span>${x.label}</span><span class="pval-${x.id}">${d[x.id]}</span></label>
          <input type="range" data-pid="${x.id}" min="${x.min}" max="${x.max}" step="${x.step}" value="${d[x.id]}"
            style="width:100%;accent-color:var(--accent);min-height:32px;cursor:pointer">`:x.type==="checkbox"&&(g.innerHTML=`<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;color:var(--text-on-dark-2);min-height:44px">
          <input type="checkbox" data-pid="${x.id}" ${d[x.id]?"checked":""} style="width:16px;height:16px;accent-color:var(--accent)">
          ${x.label}</label>`),l.appendChild(g)}),l.querySelectorAll("[data-pid]").forEach(x=>{x.addEventListener("change",()=>{const g=x.dataset.pid;x.type==="checkbox"?d[g]=x.checked:x.type==="range"?d[g]=parseFloat(x.value):d[g]=x.value;const y=l.querySelector(`.pval-${g}`);y&&(y.textContent=d[g]),e(),w()})})}function e(){v.innerHTML="";const x=Math.max(v.clientWidth||0,180),g=320,y=F(v).append("svg").attr("viewBox",`0 0 ${x} ${g}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");zt(y,u.id,d,x,g)}function w(){const x=u.genCode(d);s?s.setCode(x):s=V(n,{language:"python",code:x,readOnly:window.innerWidth<768})}return p(),e(),w(),{destroy(){if(s){try{s.destroy()}catch{}s=null}}}}function Bt(t,a){const n=F(t).append("svg").attr("viewBox","0 0 130 80").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");n.append("rect").attr("width",130).attr("height",80).attr("fill","#1d1d1f").attr("rx",6);const u={t:10,r:10,b:16,l:18},d=n.append("g").attr("transform",`translate(${u.l},${u.t})`),s=130-u.l-u.r,p=80-u.t-u.b;d.append("line").attr("x1",0).attr("y1",p).attr("x2",s).attr("y2",p).attr("stroke","#424245").attr("stroke-width",.8),d.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",p).attr("stroke","#424245").attr("stroke-width",.8);const e=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"],w=D(a.length*7+1);if(a==="散点图")for(let x=0;x<22;x++)d.append("circle").attr("cx",w()*s).attr("cy",w()*p).attr("r",2.5).attr("fill",e[Math.floor(w()*3)]).attr("opacity",.8);else if(a==="折线图"){const x=[.55,.35,.65,.45,.75,.6,.85],g=[.25,.15,.3,.2,.4,.28,.45],y=M().domain([0,6]).range([0,s]),o=M().domain([0,1]).range([p,0]),c=T().x((h,f)=>y(f)).y(h=>o(h)).curve(L);d.append("path").attr("d",c(x)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8),d.append("path").attr("d",c(g)).attr("fill","none").attr("stroke","#95D5B2").attr("stroke-width",1.8)}else if(a==="柱状图"){const x=[.55,.8,.4,.65],g=W().domain([0,1,2,3]).range([0,s]).padding(.2);x.forEach((y,o)=>{const c=y*p;d.append("rect").attr("x",g(o)).attr("y",p-c).attr("width",g.bandwidth()).attr("height",c).attr("fill",e[o]).attr("rx",2).attr("opacity",.9)})}else if(a==="分面 Facet"){const x=(s-4)/2,g=(p-4)/2;[[0,0],[1,0],[0,1],[1,1]].forEach(([y,o],c)=>{const h=y*(x+4),f=o*(g+4);d.append("rect").attr("x",h).attr("y",f).attr("width",x).attr("height",g).attr("fill","#2a2a2d").attr("rx",2);const r=D(c*13+3);for(let b=0;b<5;b++)d.append("circle").attr("cx",h+3+r()*(x-6)).attr("cy",f+3+r()*(g-6)).attr("r",2).attr("fill",e[c]).attr("opacity",.85)})}else if(a==="主题样式"){[.25,.5,.75,1].forEach(c=>{d.append("line").attr("x1",0).attr("y1",c*p).attr("x2",s).attr("y2",c*p).attr("stroke","#333336").attr("stroke-dasharray","2,2").attr("stroke-width",.6)});const x=[.3,.5,.42,.68,.55,.78],g=M().domain([0,5]).range([0,s]),y=M().domain([0,1]).range([p,0]),o=T().x((c,h)=>g(h)).y(c=>y(c)).curve(L);d.append("path").attr("d",o(x)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8)}else if(a==="配色 Scale"){const g=n.append("defs").append("linearGradient").attr("id",`cg${a.length}`).attr("x1","0%").attr("x2","100%");g.append("stop").attr("offset","0%").attr("stop-color","#3B4CC0"),g.append("stop").attr("offset","50%").attr("stop-color","#95D5B2"),g.append("stop").attr("offset","100%").attr("stop-color","#F0B27A"),d.append("rect").attr("x",0).attr("y",p/2-5).attr("width",s).attr("height",12).attr("fill",`url(#cg${a.length})`).attr("rx",3),["#3B4CC0","#6A8FD5","#95D5B2","#F0C070","#F0B27A"].forEach((y,o)=>{d.append("circle").attr("cx",(o+.5)*s/5).attr("cy",p/2-18).attr("r",6).attr("fill",y)})}else if(a==="标注 Annotate"){const x=[.25,.45,.38,.7,.55,.65],g=M().domain([0,5]).range([0,s]),y=M().domain([0,1]).range([p,0]),o=T().x((f,r)=>g(r)).y(f=>y(f)).curve(L);d.append("path").attr("d",o(x)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8);const c=g(3),h=y(.7);d.append("circle").attr("cx",c).attr("cy",h).attr("r",4).attr("fill","#F0B27A"),d.append("line").attr("x1",c).attr("y1",h).attr("x2",c-15).attr("y2",h-18).attr("stroke","#F0B27A").attr("stroke-width",1.2),d.append("text").attr("x",c-16).attr("y",h-20).attr("fill","#F0B27A").attr("font-size",8).attr("text-anchor","end").attr("font-family","sans-serif").text("关键点")}else if(a==="保存图片"){const y=(s-32)/2,o=(p-42)/2-4;d.append("path").attr("d",`M${y},${o+8} L${y+8},${o} L${y+32},${o} L${y+32},${o+42} L${y},${o+42} Z`).attr("fill","#2a2a2d").attr("stroke","#424245").attr("stroke-width",1.2),d.append("path").attr("d",`M${y},${o+8} L${y+8},${o+8} L${y+8},${o}`).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1);const c=y+32/2,h=o+42/2+4;d.append("line").attr("x1",c).attr("y1",h-8).attr("x2",c).attr("y2",h+6).attr("stroke","#7EC8E3").attr("stroke-width",1.5),d.append("path").attr("d",`M${c-4},${h+2} L${c},${h+7} L${c+4},${h+2}`).attr("fill","#7EC8E3"),d.append("text").attr("x",c).attr("y",o+42+12).attr("fill","#7EC8E3").attr("font-size",7).attr("text-anchor","middle").attr("font-family","sans-serif").text("PDF/SVG")}}function Tt(t){if(!t)return;const a=t.querySelector("#compare-rows"),l=t.querySelector(".compare-tabs");if(!a)return;const v=document.createElement("div");v.className="compare-header-row",v.style.cssText="display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;padding:8px 0 10px;border-bottom:2px solid var(--border-light);margin-bottom:4px;",v.innerHTML=`
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">概念</div>
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">示意图</div>
    <div style="font-size:11px;font-weight:600;color:#7EC8E3;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">🐍 Python / matplotlib</div>
    <div style="font-size:11px;font-weight:600;color:#95D5B2;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">📊 R / ggplot2</div>`,a.appendChild(v),St.forEach(n=>{const u=document.createElement("div");u.className="compare-row",u.style.cssText="display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;border-top:1px solid var(--border-light);padding:16px 0;align-items:start;",u.innerHTML=`
      <div style="font-weight:600;color:var(--accent);font-size:13px;padding-top:4px;font-family:var(--font-code);line-height:1.5">${n.concept}</div>
      <div class="cmp-mini-wrap" style="border-radius:6px;overflow:hidden;"></div>
      <pre class="compare-python" style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${n.python}</pre>
      <pre class="compare-r" style="background:#f5f5f7;color:#1d1d1f;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${n.r}</pre>`,a.appendChild(u),Bt(u.querySelector(".cmp-mini-wrap"),n.concept)}),window.innerWidth<=768&&l&&(l.style.display="flex",a.querySelectorAll(".compare-r").forEach(n=>n.style.display="none"),l.querySelectorAll(".compare-tab").forEach(n=>{n.addEventListener("click",()=>{l.querySelectorAll(".compare-tab").forEach(d=>{d.style.background="var(--bg-light-alt)",d.style.color="var(--text-on-light)",d.style.border="1px solid var(--border-light)"}),n.style.background="var(--accent)",n.style.color="#1d1d1f",n.style.border="none";const u=n.dataset.lang;a.querySelectorAll(".compare-python").forEach(d=>{d.style.display=u==="python"?"block":"none"}),a.querySelectorAll(".compare-r").forEach(d=>{d.style.display=u==="r"?"block":"none"})})}))}function Lt(t,a,l,v,n,u){const d=Math.atan2(n-l,v-a),s=10;t.strokeStyle=u,t.fillStyle=u,t.lineWidth=2,t.beginPath(),t.moveTo(a,l),t.lineTo(v,n),t.stroke(),t.beginPath(),t.moveTo(v,n),t.lineTo(v-s*Math.cos(d-.4),n-s*Math.sin(d-.4)),t.lineTo(v-s*Math.cos(d+.4),n-s*Math.sin(d+.4)),t.closePath(),t.fill()}function Ft(t,a){const l=t.type==="arrow"?Math.min(t.x1,t.x2):t.x,v=t.type==="arrow"?Math.min(t.y1,t.y2):t.y,n=t.type==="arrow"?Math.abs(t.x2-t.x1)+20:t.w||60,u=t.type==="arrow"?Math.abs(t.y2-t.y1)+20:t.h||40;return a.x>=l-10&&a.x<=l+n+10&&a.y>=v-10&&a.y<=v+u+10}function qt(t){if(!t)return null;const a=t.querySelector("#annotate-canvas"),l=t.querySelector(".annotate-toolbar"),v=t.querySelector(".ann-code-editor");if(!a||!l||!v)return null;const n=a.getContext("2d"),u=window.devicePixelRatio||1;let d=null;const s=[];let p="arrow",e=null,w={x:0,y:0},x=null;[{type:"arrow",label:"↗ 箭头"},{type:"text",label:"T 文字"},{type:"rect",label:"□ 方框"},{type:"highlight",label:"◆ 高亮"}].forEach(i=>{const m=document.createElement("button");m.textContent=i.label,m.dataset.type=i.type,m.style.cssText="padding:8px 14px;min-height:44px;background:#2d2d2f;border:1px solid var(--border-dark);border-radius:8px;color:var(--text-on-dark);cursor:pointer;font-size:13px;transition:background 0.2s;white-space:nowrap;",i.type==="arrow"&&(m.style.background="rgba(126,200,227,0.18)"),m.addEventListener("click",()=>{l.querySelectorAll("button[data-type]").forEach(k=>k.style.background="#2d2d2f"),m.style.background="rgba(126,200,227,0.18)",p=i.type}),l.appendChild(m)});const y=document.createElement("button");y.textContent="重置",y.style.cssText="padding:8px 14px;min-height:44px;background:transparent;border:1px solid var(--border-dark);border-radius:8px;color:var(--accent);cursor:pointer;font-size:13px;margin-left:auto;white-space:nowrap;",y.addEventListener("click",()=>{s.length=0,f(),b()}),l.appendChild(y);function o(){const i=a.parentElement.clientWidth||400,m=Math.round(Math.min(i*.55,380));a.width=Math.round(i*u),a.height=Math.round(m*u),a.style.width=i+"px",a.style.height=m+"px",n.setTransform(u,0,0,u,0,0),c(),h()}function c(){const i=a.clientWidth,m=a.clientHeight;n.fillStyle="#1d1d1f",n.fillRect(0,0,i,m),n.strokeStyle="#424245",n.lineWidth=1,n.beginPath(),n.moveTo(55,15),n.lineTo(55,m-30),n.lineTo(i-15,m-30),n.stroke();const k=[30,80,55,120,95,150,110,170,140,185],$=(i-80)/(k.length-1),A=(m-55)/200,z=k.map((_,S)=>({x:55+S*$,y:m-30-_*A}));n.strokeStyle="#7EC8E3",n.lineWidth=2,n.beginPath(),z.forEach((_,S)=>S===0?n.moveTo(_.x,_.y):n.lineTo(_.x,_.y)),n.stroke(),n.fillStyle="#7EC8E3",z.forEach(_=>{n.beginPath(),n.arc(_.x,_.y,3.5,0,Math.PI*2),n.fill()}),n.fillStyle="#6e6e73",n.font="11px sans-serif",n.fillText("时间",i/2-10,m-8),n.save(),n.translate(14,m/2),n.rotate(-Math.PI/2),n.fillText("值",-8,0),n.restore()}function h(){s.forEach(i=>{if(n.save(),i.type==="arrow")Lt(n,i.x1,i.y1,i.x2,i.y2,"#F0D264"),n.fillStyle="#F0D264",n.font="bold 11px sans-serif",n.fillText(i.label||"峰值",i.x2+6,i.y2-4);else if(i.type==="text"){n.font="12px sans-serif";const m=n.measureText(i.label||"标注").width;n.fillStyle="rgba(240,210,100,0.9)",n.fillRect(i.x-3,i.y-14,m+8,18),n.fillStyle="#1d1d1f",n.fillText(i.label||"标注",i.x+1,i.y)}else i.type==="rect"?(n.strokeStyle="#E07A7A",n.lineWidth=2,n.setLineDash([5,3]),n.strokeRect(i.x,i.y,i.w||70,i.h||45),n.setLineDash([])):i.type==="highlight"&&(n.fillStyle="rgba(240,178,122,0.22)",n.fillRect(i.x,i.y,i.w||70,i.h||45),n.strokeStyle="#F0B27A",n.lineWidth=1.5,n.strokeRect(i.x,i.y,i.w||70,i.h||45));n.restore()})}function f(){c(),h()}function r(i){const m=a.getBoundingClientRect(),k=a.clientWidth/m.width,$=a.clientHeight/m.height,A=i.clientX??i.touches?.[0]?.clientX??0,z=i.clientY??i.touches?.[0]?.clientY??0;return{x:(A-m.left)*k,y:(z-m.top)*$}}a.addEventListener("pointerdown",i=>{i.preventDefault(),a.setPointerCapture(i.pointerId);const m=r(i);e=s.slice().reverse().find(k=>Ft(k,m))||null,e?w={x:m.x-(e.x??e.x1),y:m.y-(e.y??e.y1)}:x=m}),a.addEventListener("pointermove",i=>{if(!e&&!x)return;const m=r(i);if(e){const k=m.x-w.x-(e.x??e.x1),$=m.y-w.y-(e.y??e.y1);e.type==="arrow"?(e.x1+=k,e.y1+=$,e.x2+=k,e.y2+=$):(e.x+=k,e.y+=$),w={x:m.x-(e.x??e.x1),y:m.y-(e.y??e.y1)},f()}}),a.addEventListener("pointerup",i=>{if(!e&&x){const m=r(i);if(p==="arrow")s.push({type:"arrow",x1:x.x,y1:x.y,x2:m.x,y2:m.y,label:"关键点"});else if(p==="text")s.push({type:"text",x:m.x,y:m.y,label:"标注文字"});else{const k=m.x-x.x,$=m.y-x.y;s.push({type:p,x:Math.min(x.x,m.x),y:Math.min(x.y,m.y),w:Math.abs(k)||70,h:Math.abs($)||45})}f(),b()}e=null,x=null});function b(){const i=a.clientWidth,m=a.clientHeight,k=_=>((_-55)/(i-80)*10).toFixed(1),$=_=>((m-30-_)/(m-55)*200).toFixed(0),A=["import matplotlib.pyplot as plt","","fig, ax = plt.subplots(figsize=(8, 6), dpi=150)","# ... 绘制图表数据 ...",""];s.forEach(_=>{_.type==="arrow"?(A.push(`ax.annotate("${_.label||"关键点"}",`),A.push(`    xy=(${k(_.x2)}, ${$(_.y2)}),`),A.push(`    xytext=(${k(_.x1)}, ${$(_.y1)}),`),A.push('    arrowprops=dict(arrowstyle="->", color="#F0D264"),'),A.push('    color="#F0D264", fontsize=10)')):_.type==="text"?(A.push(`ax.text(${k(_.x)}, ${$(_.y)}, "标注文字",`),A.push('    fontsize=10, color="#F0D264")')):(_.type==="rect"||_.type==="highlight")&&(A.push("from matplotlib.patches import FancyBboxPatch"),A.push(`rect = FancyBboxPatch((${k(_.x)}, ${$(_.y+(_.h||45))}),`),A.push(`    ${((_.w||70)/(i-80)*10).toFixed(1)}, ${((_.h||45)/(m-55)*200).toFixed(0)},`),A.push('    boxstyle="round,pad=0.1",'),A.push(`    fill=${_.type==="highlight"?"True":"False"},`),A.push('    alpha=0.2, color="#F0B27A")'),A.push("ax.add_patch(rect)")),A.push("")}),A.push("plt.tight_layout()");const z=A.join(`
`);d?d.setCode(z):d=V(v,{language:"python",code:z,readOnly:window.innerWidth<768})}o(),b();const E=()=>{o(),b()};return window.addEventListener("resize",E),{destroy(){if(window.removeEventListener("resize",E),d){try{d.destroy()}catch{}d=null}}}}function te(){return`
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
/* Compare table mobile: responsive via CSS */
#compare-rows pre { min-width: 0; }
@media (max-width: 768px) {
  .compare-row { grid-template-columns: 80px 1fr !important; }
  .compare-header-row { display: none !important; }
  .cmp-mini-wrap { display: none !important; }
}
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
`}function Ht(t){if(!t)return;t.innerHTML=`
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
    </div>`;const a=D(55),l=["A","B","C","D"],v={A:"#7EC8E3",B:"#95D5B2",C:"#F0B27A",D:"#B8B8E8"},n=Array.from({length:60},()=>{const o=l[Math.floor(a()*4)];return{x:.05+a()*.9,y:.05+a()*.9,g:o}}),u=480,d=280,s=F(t.querySelector(".cc-svg-wrap")).append("svg").attr("viewBox",`0 0 ${u} ${d}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),p={t:15,r:15,b:30,l:40},e=s.append("g").attr("transform",`translate(${p.l},${p.t})`),w=u-p.l-p.r,x=d-p.t-p.b;e.append("line").attr("x1",0).attr("y1",x).attr("x2",w).attr("y2",x).attr("stroke","#d2d2d7").attr("stroke-width",1),e.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",x).attr("stroke","#d2d2d7").attr("stroke-width",1);const g=e.selectAll("circle").data(n).join("circle").attr("cx",o=>o.x*w).attr("cy",o=>(1-o.y)*x).attr("r",5).attr("fill",o=>v[o.g]).attr("opacity",.75);function y(o){g.transition().duration(400).attr("fill",c=>o==="all"||c.g===o?v[c.g]:"#d2d2d7").attr("opacity",c=>o==="all"?.75:c.g===o?.9:.3),t.querySelectorAll(".cc-btn").forEach(c=>{const h=c.dataset.group===o;c.style.background=h?"var(--accent)":"transparent",c.style.color=h?"#1d1d1f":"var(--text-on-light-2)",c.style.fontWeight=h?"600":"400"})}t.querySelectorAll(".cc-btn").forEach(o=>{o.addEventListener("click",()=>y(o.dataset.group))})}function Wt(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法二</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">标注引导阅读顺序</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将分析结论直接写在图表上，箭头和文字标注引导读者按预设顺序理解数据。</p>
        <button id="af-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放标注</button>
      </div>
      <div class="af-svg-wrap"></div>
    </div>`;const a=500,l=260,v=F(t.querySelector(".af-svg-wrap")).append("svg").attr("viewBox",`0 0 ${a} ${l}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),n={t:20,r:20,b:35,l:45},u=v.append("g").attr("transform",`translate(${n.l},${n.t})`),d=a-n.l-n.r,s=l-n.t-n.b;u.append("line").attr("x1",0).attr("y1",s).attr("x2",d).attr("y2",s).attr("stroke","#d2d2d7").attr("stroke-width",1),u.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",s).attr("stroke","#d2d2d7").attr("stroke-width",1);const p=[18,32,28,55,48,72,65,88,78,95],e=M().domain([0,9]).range([0,d]),w=M().domain([0,100]).range([s,0]),x=T().x((r,b)=>e(b)).y(r=>w(r)).curve(L);u.append("path").attr("d",x(p)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5),u.selectAll("circle").data(p).join("circle").attr("cx",(r,b)=>e(b)).attr("cy",r=>w(r)).attr("r",4).attr("fill","#7EC8E3");const g=[{x:e(3),y:w(55),label:"转折点 ↑",tx:-15,ty:-32},{x:e(7),y:w(88),label:"高峰值",tx:-52,ty:22},{x:e(9),y:w(95),label:"终点 95",tx:-58,ty:28}],y=u.append("g").attr("class","ann-layer"),o=g.map(r=>{const b=y.append("g").style("opacity","0");return b.append("line").attr("x1",r.x).attr("y1",r.y).attr("x2",r.x+r.tx*.65).attr("y2",r.y+r.ty*.65).attr("stroke","#F0D264").attr("stroke-width",1.5).attr("marker-end","url(#arrow-marker)"),b.append("text").attr("x",r.x+r.tx).attr("y",r.y+r.ty).attr("fill","#F0D264").attr("font-size",11).attr("font-weight","600").attr("font-family","sans-serif").attr("text-anchor",r.tx<0?"end":"start").text(r.label),b});v.append("defs").append("marker").attr("id","arrow-marker").attr("markerWidth",8).attr("markerHeight",8).attr("refX",6).attr("refY",3).attr("orient","auto").append("path").attr("d","M0,0 L0,6 L8,3 z").attr("fill","#F0D264");let f=!1;t.querySelector("#af-play-btn").addEventListener("click",()=>{f||(f=!0,o.forEach(r=>r.style("opacity","0")),o.forEach((r,b)=>{Y.to(r.node(),{opacity:1,duration:.5,delay:b*.8+.2,onComplete:b===o.length-1?()=>{f=!1}:void 0})}))})}function Dt(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法三</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">灰化非重点数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:12px">将非核心数据调成低饱和度灰色，让重点数据自然浮现。</p>
        <p style="color:var(--text-on-light-3);font-size:13px;line-height:1.6;font-style:italic">↗ 悬停右侧柱子体验效果</p>
      </div>
      <div class="go-svg-wrap"></div>
    </div>`;const a=["一月","二月","三月","四月","五月","六月"],l=[42,68,55,80,63,91],v=["#7EC8E3","#95D5B2","#F0B27A","#B8B8E8","#E07A7A","#F0D264"],n=480,u=260,d=F(t.querySelector(".go-svg-wrap")).append("svg").attr("viewBox",`0 0 ${n} ${u}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),s={t:15,r:20,b:35,l:45},p=d.append("g").attr("transform",`translate(${s.l},${s.t})`),e=n-s.l-s.r,w=u-s.t-s.b;p.append("line").attr("x1",0).attr("y1",w).attr("x2",e).attr("y2",w).attr("stroke","#d2d2d7");const x=W().domain(a).range([0,e]).padding(.25),g=M().domain([0,100]).range([w,0]);p.selectAll("text.xt").data(a).join("text").attr("class","xt").attr("x",o=>x(o)+x.bandwidth()/2).attr("y",w+16).attr("text-anchor","middle").attr("font-size",11).attr("fill","#6e6e73").text(o=>o);const y=p.selectAll("rect").data(l).join("rect").attr("x",(o,c)=>x(a[c])).attr("y",o=>g(o)).attr("width",x.bandwidth()).attr("height",o=>w-g(o)).attr("fill",(o,c)=>v[c]).attr("rx",3).attr("opacity",.85).style("cursor","pointer");y.on("mouseover",function(o,c){const h=Array.from(this.parentNode.querySelectorAll("rect")).indexOf(this);y.transition().duration(200).attr("fill",(f,r)=>r===h?v[r]:"#d2d2d7").attr("opacity",(f,r)=>r===h?1:.5)}).on("mouseout",()=>{y.transition().duration(200).attr("fill",(o,c)=>v[c]).attr("opacity",.85)})}function Pt(t){if(!t)return;t.innerHTML=`
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
    </div>`;const a=[12,28,22,45,38,62,55,75,68,88],l=480,v=250,n=F(t.querySelector(".sr-svg-wrap")).append("svg").attr("viewBox",`0 0 ${l} ${v}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),u={t:15,r:15,b:30,l:45},d=n.append("g").attr("transform",`translate(${u.l},${u.t})`),s=l-u.l-u.r,p=v-u.t-u.b;d.append("line").attr("x1",0).attr("y1",p).attr("x2",s).attr("y2",p).attr("stroke","#d2d2d7"),d.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",p).attr("stroke","#d2d2d7");const e=M().domain([0,9]).range([0,s]),w=M().domain([0,100]).range([p,0]),x=d.selectAll("circle.sr-dot").data(a).join("circle").attr("class","sr-dot").attr("cx",(h,f)=>e(f)).attr("cy",h=>w(h)).attr("r",5).attr("fill","#7EC8E3").attr("opacity",0),g=d.append("path").attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5).attr("opacity",0);let y=null;const o=t.querySelector("#sr-step-label");function c(h){if(o&&(o.textContent=`${h} / ${a.length}`),x.attr("opacity",(f,r)=>r<h?.85:0),h>1){const f=a.slice(0,h),r=T().x((b,E)=>e(E)).y(b=>w(b)).curve(L);g.attr("d",r(f)).attr("opacity",1)}else g.attr("opacity",0)}t.querySelector("#sr-play-btn").addEventListener("click",()=>{if(y)return;c(0);let h=0;y=setInterval(()=>{h++,c(h),h>=a.length&&(clearInterval(y),y=null)},500)}),t.querySelector("#sr-reset-btn").addEventListener("click",()=>{y&&(clearInterval(y),y=null),c(0)})}function Rt(t){if(!t)return;t.innerHTML=`
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
    </div>`;const a=t.querySelector('div[style*="grid-template-columns"]');window.innerWidth<=600&&a&&(a.style.gridTemplateColumns="1fr");function l(n){const s=F(n).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),p={t:15,r:15,b:25,l:35},e=s.append("g").attr("transform",`translate(${p.l},${p.t})`),w=300-p.l-p.r,x=180-p.t-p.b,g=[20,35,28,55,48,70],y=M().domain([0,5]).range([0,w]),o=M().domain([0,80]).range([x,0]),c=T().x((f,r)=>y(r)).y(f=>o(f)).curve(L);e.append("path").attr("d",c(g)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2),[{x:y(1),y:o(35),label:"增长?",color:"#E64B35"},{x:y(2),y:o(28),label:"下降!",color:"#F0B27A"},{x:y(3),y:o(55),label:"最高点",color:"#4DBBD5"},{x:y(4),y:o(48),label:"又降了",color:"#00A087"},{x:y(5),y:o(70),label:"高点",color:"#3C5488"}].forEach(f=>{e.append("circle").attr("cx",f.x).attr("cy",f.y).attr("r",6).attr("fill",f.color).attr("opacity",.9),e.append("text").attr("x",f.x+6).attr("y",f.y-6).attr("fill",f.color).attr("font-size",9).attr("font-weight","bold").text(f.label)})}function v(n){const s=F(n).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),p={t:15,r:15,b:25,l:35},e=s.append("g").attr("transform",`translate(${p.l},${p.t})`),w=300-p.l-p.r,x=180-p.t-p.b,g=[20,35,28,55,48,70],y=M().domain([0,5]).range([0,w]),o=M().domain([0,80]).range([x,0]),c=T().x((r,b)=>y(b)).y(r=>o(r)).curve(L);e.append("path").attr("d",c(g)).attr("fill","none").attr("stroke","#d2d2d7").attr("stroke-width",2);const h=y(5),f=o(70);e.append("circle").attr("cx",h).attr("cy",f).attr("r",6).attr("fill","#7EC8E3"),e.append("line").attr("x1",h).attr("y1",f-8).attr("x2",h-25).attr("y2",f-30).attr("stroke","#7EC8E3").attr("stroke-width",1.5),e.append("text").attr("x",h-28).attr("y",f-34).attr("fill","#7EC8E3").attr("font-size",10).attr("font-weight","600").attr("text-anchor","end").text("季度最高：70")}l(t.querySelector(".sc-bad-wrap")),v(t.querySelector(".sc-good-wrap"))}function jt(t){t&&(Ht(t.querySelector("#story-color-contrast")),Wt(t.querySelector("#story-annotation-flow")),Dt(t.querySelector("#story-grey-out")),Pt(t.querySelector("#story-reveal")),Rt(t.querySelector("#story-compare")),["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal"].forEach(a=>{const l=document.querySelector(a);l&&Y.fromTo(l,{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:l,start:"top 82%",toggleActions:"play none none none"}})}))}function ee(){C.cleanupFns=[],C.resizeObservers=[],Y.timeline().fromTo("#p9-root .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.1).fromTo("#p9-root .page-hero-title",{opacity:0,y:30},{opacity:1,y:0,duration:.6},.25).fromTo("#p9-root .page-hero-sub",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.4).fromTo("#p9-root .page-hero-tagline",{opacity:0,y:20},{opacity:1,y:0,duration:.5},.55).fromTo("#p9-root .hero-quicknav",{opacity:0,y:15},{opacity:1,y:0,duration:.5},.7).fromTo("#p9-root .scroll-hint",{opacity:0},{opacity:1,duration:.4},.9),document.querySelectorAll("#p09-quicknav .hero-quicknav__item").forEach(v=>{const n=()=>{const u=document.querySelector(v.dataset.target);u&&u.scrollIntoView({behavior:"smooth",block:"start"})};v.addEventListener("click",n),C.cleanupFns.push(()=>v.removeEventListener("click",n))});const a=document.getElementById("p9-prev-btn"),l=document.getElementById("p9-next-btn");if(a){const v=()=>G("m1-p8");a.addEventListener("click",v),C.cleanupFns.push(()=>a.removeEventListener("click",v))}if(l){const v=()=>G("m1-p10");l.addEventListener("click",v),C.cleanupFns.push(()=>l.removeEventListener("click",v))}Ct(document.getElementById("s1-matplotlib-hierarchy")),C.sbGallery=Mt(document.getElementById("s2-seaborn-gallery")),Tt(document.getElementById("s3-mpl-vs-ggplot")),C.annCanvas=qt(document.getElementById("s4-annotate-canvas")),jt(document.getElementById("s5-storytelling")),["#s1-matplotlib-hierarchy h2","#s1-matplotlib-hierarchy p","#s2-seaborn-gallery h2","#s2-seaborn-gallery > div > p","#s3-mpl-vs-ggplot h2","#s3-mpl-vs-ggplot > div > p","#s4-annotate-canvas h2","#s4-annotate-canvas > div > p","#s5-storytelling h2","#s5-storytelling > div > p"].forEach(v=>{const n=document.querySelector(v);n&&et(n,{y:40,stagger:0})})}function ae(){tt(),C.cleanupFns.forEach(l=>{try{l()}catch{}}),C.cleanupFns=[];const t=document.querySelector("#s1-matplotlib-hierarchy .mpl-hierarchy-svg svg");t&&t.remove(),C.sbGallery&&(C.sbGallery.destroy(),C.sbGallery=null);const a=document.getElementById("compare-rows");a&&(a.innerHTML=""),C.annCanvas&&(C.annCanvas.destroy(),C.annCanvas=null),C.resizeObservers.forEach(l=>l.disconnect()),C.resizeObservers=[],["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal","#story-compare"].forEach(l=>{const v=document.querySelector(l);v&&(v.innerHTML="")})}export{ae as destroy,ee as init,te as render};
