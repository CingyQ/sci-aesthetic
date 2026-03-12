import{k as V,g as R,f as Z}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as G}from"./CodeEditor-CmZbxDVd.js";import{n as j}from"./index-oP3tVZec.js";import{s as T,l as B}from"./transform-ChPGlSkf.js";import{h as J}from"./index-DOot-1bs.js";import{b as H}from"./band-DqVyTAN-.js";import{s as Q}from"./ramp-CDwHjghK.js";import{t as K,l as U,O as tt,B as et}from"./link-Ci1IYdRD.js";import{l as L}from"./line-DQLATXjo.js";import{c as F}from"./catmullRom-Dm0ttBHj.js";import{a as Y}from"./area-BnRBWshW.js";import{b as q,R as P}from"./basis-DxYen36A.js";import{v as at}from"./viridis-DFAhIwmg.js";import"./colors-Cc3OSVma.js";import"./path-BckJrc8i.js";import"./math-CRUJxRjv.js";const rt={id:"Figure",label:"Figure",color:"#7EC8E3",desc:"整个图形的顶层容器，对应一张图片文件。",api:"plt.figure(figsize=(8,6), dpi=150)",children:[{id:"Axes",label:"Axes",color:"#95D5B2",desc:"单个坐标系，包含所有绘图元素。一个 Figure 可有多个 Axes。",api:"fig.add_subplot(1,1,1)  # 或 plt.subplots()",children:[{id:"Title",label:"Title",color:"#B8B8E8",desc:"图表标题文本对象。",api:'ax.set_title("标题", fontsize=14)',children:[]},{id:"XAxis",label:"XAxis",color:"#B8B8E8",desc:"X 轴（含刻度、标签、刻度线）。",api:`ax.set_xlabel("X轴")
ax.xaxis.set_tick_params()`,children:[]},{id:"YAxis",label:"YAxis",color:"#B8B8E8",desc:"Y 轴（含刻度、标签、刻度线）。",api:`ax.set_ylabel("Y轴")
ax.yaxis.set_tick_params()`,children:[]},{id:"Line2D",label:"Line2D",color:"#F0B27A",desc:"折线/散点等绘图元素（Artist）。",api:'line, = ax.plot(x, y, color="#7EC8E3", lw=2)',children:[]},{id:"Legend",label:"Legend",color:"#F0B27A",desc:"图例容器，管理标签和句柄。",api:'ax.legend(loc="upper right", framealpha=0.8)',children:[]},{id:"Annotation",label:"Annotation",color:"#F0D264",desc:"任意文字标注，支持箭头。",api:`ax.annotate("峰值", xy=(x,y), xytext=(x+1,y+2),
  arrowprops=dict(arrowstyle="->"))`,children:[]}]}]},O=[{id:"scatter",name:"scatterplot",icon:"⊙",desc:"两变量关系分布",params:[{id:"palette",label:"调色板",type:"select",options:["deep","muted","viridis","rocket","coolwarm"],default:"deep"},{id:"alpha",label:"透明度 alpha",type:"range",min:.2,max:1,step:.1,default:.7},{id:"size",label:"点大小 s",type:"range",min:20,max:120,step:10,default:60},{id:"hue",label:"分组 hue",type:"checkbox",default:!0}],genCode:t=>`import seaborn as sns
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
plt.tight_layout()`}],ot=[{concept:"散点图",python:`import matplotlib.pyplot as plt
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
)`}];let C={cleanupFns:[],resizeObservers:[],sbGallery:null,annCanvas:null};function it(t){const x=t.querySelector(".mpl-hierarchy-svg"),f=t.querySelector(".mpl-info-panel");if(!x)return;const v=x.clientWidth||420,i=380,u=T(x).append("svg").attr("viewBox",`0 0 ${v} ${i}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto"),d=J(rt);K().size([v-80,i-80])(d),u.selectAll(".mpl-link").data(d.links()).join("path").attr("class","mpl-link").attr("d",U().x(c=>c.x+40).y(c=>c.y+40)).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1.5);const n=u.selectAll(".mpl-node").data(d.descendants()).join("g").attr("class","mpl-node").attr("transform",c=>`translate(${c.x+40},${c.y+40})`).style("cursor","pointer");n.append("circle").attr("r",22).attr("fill",c=>c.data.color||"#7EC8E3").attr("stroke","#1d1d1f").attr("stroke-width",2).attr("opacity",.9),n.append("text").attr("text-anchor","middle").attr("dy","0.35em").attr("fill","#1d1d1f").attr("font-size",9).attr("font-weight",700).attr("font-family","JetBrains Mono, monospace").text(c=>c.data.label.length>8?c.data.label.slice(0,7)+"…":c.data.label),n.on("click",(c,k)=>{n.selectAll("circle").attr("stroke","#1d1d1f").attr("stroke-width",2),T(c.currentTarget).select("circle").attr("stroke",k.data.color||"#7EC8E3").attr("stroke-width",3.5),f&&(f.innerHTML=`
        <div style="margin-bottom:8px">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${k.data.color};margin-right:8px;vertical-align:middle"></span>
          <strong style="color:${k.data.color};font-size:16px;font-family:var(--font-code)">${k.data.label}</strong>
        </div>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.6;margin:0 0 12px">${k.data.desc}</p>
        <pre style="background:#1d1d1f;color:#f5f5f7;padding:12px 14px;border-radius:8px;font-size:12px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5">${k.data.api}</pre>`)}),n.filter(c=>c.data.id==="Figure").dispatch("click")}function D(t){let x=t;return()=>(x=x*1664525+1013904223&4294967295,(x>>>0)/4294967295)}function nt(t,x,f,v,i){t.selectAll("*").remove();const u={t:25,r:20,b:35,l:45},d=v-u.l-u.r,o=i-u.t-u.b,n=t.append("g").attr("transform",`translate(${u.l},${u.t})`);t.insert("rect","g").attr("width",v).attr("height",i).attr("fill","#1d1d1f").attr("rx",8);for(let r=1;r<=4;r++)n.append("line").attr("x1",0).attr("y1",r*o/4).attr("x2",d).attr("y2",r*o/4).attr("stroke","#2d2d2f").attr("stroke-width",1);n.append("line").attr("x1",0).attr("y1",o).attr("x2",d).attr("y2",o).attr("stroke","#424245").attr("stroke-width",1),n.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",o).attr("stroke","#424245").attr("stroke-width",1);const c=D(42),k=["A","B","C","D"],y={deep:["#4C72B0","#DD8452","#55A868","#C44E52"],Set2:["#66C2A5","#FC8D62","#8DA0CB","#E78AC3"],Set1:["#E41A1C","#377EB8","#4DAF4A","#984EA3"],pastel:["#AEC6CF","#FFD1DC","#B5EAD7","#FFDAC1"],viridis:["#440154","#31688E","#35B779","#FDE725"],muted:["#4878D0","#EE854A","#6ACC64","#D65F5F"],rocket:["#03051A","#4A0C5C","#B0298B","#F87060"],husl:["#F77189","#BB9832","#50B131","#36ADA4"]},b=f.palette&&y[f.palette]||["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"];function g(r,l,s,p="middle"){n.append("text").attr("x",r).attr("y",l).attr("text-anchor",p).attr("font-size",10).attr("fill","#a0a0a8").attr("font-family","sans-serif").text(s)}if(x==="scatter"){const r=Array.from({length:50},()=>({x:.05+c()*.9,y:.05+c()*.9,gi:Math.floor(c()*4)})),l=Math.max(2,Math.sqrt((f.size||60)/Math.PI)*1.1);n.selectAll("circle").data(r).join("circle").attr("cx",s=>s.x*d).attr("cy",s=>(1-s.y)*o).attr("r",l).attr("fill",s=>f.hue?b[s.gi]:b[0]).attr("opacity",f.alpha||.7)}else if(x==="line"){const l=Array.from({length:3},(p,a)=>({gi:a,pts:Array.from({length:10},(m,E)=>({x:E/9,y:Math.max(.02,Math.min(.92,.12+a*.22+c()*.08+Math.sin(E/3)*.06))}))})),s=L().x(p=>p.x*d).y(p=>(1-p.y)*o).curve(F);l.forEach(p=>{if(f.ci){const a=Y().x(m=>m.x*d).y0(m=>(1-Math.max(.02,m.y-.06))*o).y1(m=>(1-Math.min(.92,m.y+.06))*o).curve(F);n.append("path").attr("d",a(p.pts)).attr("fill",b[p.gi]).attr("opacity",.2)}n.append("path").attr("d",s(p.pts)).attr("fill","none").attr("stroke",b[p.gi]).attr("stroke-width",2),f.markers&&n.selectAll(`.mk${p.gi}`).data(p.pts).join("circle").attr("class",`.mk${p.gi}`).attr("cx",a=>a.x*d).attr("cy",a=>(1-a.y)*o).attr("r",3.5).attr("fill",b[p.gi])}),[0,3,6,9].forEach(p=>g(p/9*d,o+14,`Q${p+1}`))}else if(x==="bar"){const r=k.map(()=>.35+c()*.45),l=r.map(s=>s*.1+.03);if(f.orient==="v"){const s=H().domain(k).range([0,d]).padding(.28);n.selectAll("rect").data(r).join("rect").attr("x",(p,a)=>s(k[a])).attr("y",p=>(1-p)*o).attr("width",s.bandwidth()).attr("height",p=>p*o).attr("fill",(p,a)=>b[a]).attr("rx",3),f.ci&&r.forEach((p,a)=>{const m=s(k[a])+s.bandwidth()/2,E=(1-(p+l[a]))*o,e=(1-(p-l[a]))*o;n.append("line").attr("x1",m).attr("y1",E).attr("x2",m).attr("y2",e).attr("stroke","#fff").attr("stroke-width",1.5),n.append("line").attr("x1",m-5).attr("y1",E).attr("x2",m+5).attr("y2",E).attr("stroke","#fff").attr("stroke-width",1.5),n.append("line").attr("x1",m-5).attr("y1",e).attr("x2",m+5).attr("y2",e).attr("stroke","#fff").attr("stroke-width",1.5)}),k.forEach((p,a)=>g(s(p)+s.bandwidth()/2,o+14,p))}else{const s=H().domain(k).range([0,o]).padding(.28);n.selectAll("rect").data(r).join("rect").attr("x",0).attr("y",(p,a)=>s(k[a])).attr("width",p=>p*d).attr("height",s.bandwidth()).attr("fill",(p,a)=>b[a]).attr("rx",3),f.ci&&r.forEach((p,a)=>{const m=s(k[a])+s.bandwidth()/2,E=(p+l[a])*d;n.append("line").attr("x1",E).attr("y1",m-6).attr("x2",E).attr("y2",m+6).attr("stroke","#fff").attr("stroke-width",1.5)}),k.forEach((p,a)=>g(-6,s(p)+s.bandwidth()/2+4,p,"end"))}}else if(x==="box"){const r=(f.width||.5)*d/5.5,l=!!f.notch;k.forEach((s,p)=>{const a=(p+.5)*(d/4),m=.35+c()*.28,E=Math.max(.04,m-.1-c()*.06),e=Math.min(.94,m+.1+c()*.06),h=Math.max(.01,E-.13),w=Math.min(.97,e+.13),_=b[p];if(n.append("line").attr("x1",a).attr("y1",(1-w)*o).attr("x2",a).attr("y2",(1-e)*o).attr("stroke",_).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),n.append("line").attr("x1",a).attr("y1",(1-E)*o).attr("x2",a).attr("y2",(1-h)*o).attr("stroke",_).attr("stroke-width",1.5).attr("stroke-dasharray","3,2"),n.append("line").attr("x1",a-r/3).attr("y1",(1-w)*o).attr("x2",a+r/3).attr("y2",(1-w)*o).attr("stroke",_).attr("stroke-width",1.5),n.append("line").attr("x1",a-r/3).attr("y1",(1-h)*o).attr("x2",a+r/3).attr("y2",(1-h)*o).attr("stroke",_).attr("stroke-width",1.5),l){const A=r*.45,M=(1-m)*o,$=(1-E)*o,S=(1-e)*o,z=`M${a-r/2},${S} L${a-r/2},${M-7} L${a-A/2},${M} L${a-r/2},${M+7} L${a-r/2},${$} L${a+r/2},${$} L${a+r/2},${M+7} L${a+A/2},${M} L${a+r/2},${M-7} L${a+r/2},${S}Z`;n.append("path").attr("d",z).attr("fill",_).attr("opacity",.7)}else n.append("rect").attr("x",a-r/2).attr("y",(1-e)*o).attr("width",r).attr("height",(e-E)*o).attr("fill",_).attr("opacity",.7).attr("rx",2);n.append("line").attr("x1",a-r/2).attr("y1",(1-m)*o).attr("x2",a+r/2).attr("y2",(1-m)*o).attr("stroke","#fff").attr("stroke-width",2),g(a,o+14,s)})}else if(x==="violin"){const r=Math.max(.4,Math.min(2.5,f.bw||1)),l=f.inner||"box";k.forEach((s,p)=>{const a=(p+.5)*(d/4),m=b[p],E=28,e=[];for(let S=0;S<E;S++){const z=S/(E-1),W=.05+z*.9,X=Math.sin(Math.PI*z),I=Math.sin(Math.PI*z*1.6+p*.6)*.18,N=Math.max(1,(X+I)*(.035+c()*.018)*r*d);e.push({y:W,w:N})}const h=e.map((S,z)=>`${z===0?"M":"L"}${a-S.w},${(1-S.y)*o}`).join(" ")+e.slice().reverse().map(S=>`L${a+S.w},${(1-S.y)*o}`).join(" ")+"Z";n.append("path").attr("d",h).attr("fill",m).attr("opacity",.65);const w=.38+c()*.22,_=Math.max(.06,w-.1),A=Math.min(.92,w+.1),M=Math.floor(E/2),$=e[M].w*.45;if(l==="box")n.append("rect").attr("x",a-$/2).attr("y",(1-A)*o).attr("width",$).attr("height",(A-_)*o).attr("fill","#1d1d1f").attr("stroke",m).attr("stroke-width",1),n.append("circle").attr("cx",a).attr("cy",(1-w)*o).attr("r",3).attr("fill","#fff");else if(l==="quartile")[_,w,A].forEach(S=>{n.append("line").attr("x1",a-$).attr("y1",(1-S)*o).attr("x2",a+$).attr("y2",(1-S)*o).attr("stroke",S===w?"#fff":"#aaa").attr("stroke-width",S===w?2:1)});else if(l==="point")for(let S=0;S<12;S++){const z=.08+c()*.84,W=(c()-.5)*$*1.8;n.append("circle").attr("cx",a+W).attr("cy",(1-z)*o).attr("r",1.5).attr("fill","#fff").attr("opacity",.75)}else if(l==="stick")for(let S=0;S<12;S++){const z=.08+c()*.84;n.append("line").attr("x1",a-$*.9).attr("y1",(1-z)*o).attr("x2",a+$*.9).attr("y2",(1-z)*o).attr("stroke","#fff").attr("stroke-width",.8).attr("opacity",.7)}g(a,o+14,s)})}else if(x==="hist"){const r=Math.max(4,Math.min(f.bins||20,50)),l=.45,s=.18,p=Array.from({length:r},(m,E)=>{const e=(E+.5)/r;return Math.exp(-Math.pow((e-l)/s,2)/2)*(.7+c()*.18)}),a=d/r;if(n.selectAll("rect").data(p).join("rect").attr("x",(m,E)=>E*a+1).attr("y",m=>(1-m)*o).attr("width",a-2).attr("height",m=>m*o).attr("fill",f.color||"#7EC8E3").attr("opacity",.85),f.kde){const m=Array.from({length:60},(E,e)=>{const h=e/59;return{x:h,y:Math.exp(-Math.pow((h-l)/s,2)/2)*.92}});n.append("path").attr("d",L().x(E=>E.x*d).y(E=>(1-E.y)*o).curve(q)(m)).attr("fill","none").attr("stroke","#F0D264").attr("stroke-width",2.5)}}else if(x==="kde"){const l=.12*Math.max(.3,f.bw||1),s=f.hue?3:1,p=[.28,.48,.68];for(let a=0;a<s;a++){const m=b[a],E=Array.from({length:60},(h,w)=>{const _=w/59;return{x:_,y:Math.exp(-Math.pow((_-p[a])/l,2)/2)*.88}}),e=L().x(h=>h.x*d).y(h=>(1-h.y)*o).curve(q);if(f.fill){const h=Y().x(w=>w.x*d).y0(o).y1(w=>(1-w.y)*o).curve(q);n.append("path").attr("d",h(E)).attr("fill",m).attr("opacity",.2)}n.append("path").attr("d",e(E)).attr("fill","none").attr("stroke",m).attr("stroke-width",2.5)}}else if(x==="heatmap"){const l=d/4,s=o/4,p=[[1,.72,-.31,.54],[.72,1,.18,-.08],[-.31,.18,1,-.63],[.54,-.08,-.63,1]],m=Q({coolwarm:P,viridis:at,RdBu:P,Blues:et,Oranges:tt}[f.cmap]||P).domain([1,-1]),E=["X1","X2","X3","X4"];for(let e=0;e<4;e++)for(let h=0;h<4;h++)if(n.append("rect").attr("x",h*l+1).attr("y",e*s+1).attr("width",l-2).attr("height",s-2).attr("fill",m(p[e][h])).attr("rx",2),f.annot){const w=f.fmt===".2f"?2:1;n.append("text").attr("x",h*l+l/2).attr("y",e*s+s/2+4).attr("text-anchor","middle").attr("font-size",9).attr("fill","#fff").attr("font-weight","600").attr("font-family","JetBrains Mono, monospace").text(p[e][h].toFixed(w))}E.forEach((e,h)=>g(h*l+l/2,o+14,e))}else if(x==="pair"){const l=d/2,s=o/2,p=f.hue?3:1;for(let a=0;a<2;a++)for(let m=0;m<2;m++)if(n.append("rect").attr("x",m*l+2).attr("y",a*s+2).attr("width",l-4).attr("height",s-4).attr("fill","#2d2d2f").attr("rx",4),a===m)if(f.diag==="kde")for(let E=0;E<p;E++){const e=.25+E*.25,h=Array.from({length:20},(w,_)=>{const A=_/19;return{x:A,y:Math.exp(-Math.pow((A-e)/.16,2)/2)*.85}});n.append("path").attr("d",L().x(w=>m*l+4+w.x*(l-8)).y(w=>a*s+s-4-w.y*(s-8)).curve(q)(h)).attr("fill","none").attr("stroke",b[E]).attr("stroke-width",1.5)}else for(let e=0;e<p;e++)for(let h=0;h<6;h++){const w=(.15+c()*.55)*(s-8)*.8,_=(l-8)/6/p;n.append("rect").attr("x",m*l+4+h*(l-8)/6+e*_).attr("y",a*s+s-4-w).attr("width",_-1).attr("height",w).attr("fill",b[e]).attr("opacity",.85)}else for(let E=0;E<p;E++)for(let e=0;e<8;e++)n.append("circle").attr("cx",m*l+5+c()*(l-10)).attr("cy",a*s+5+c()*(s-10)).attr("r",2.5).attr("fill",f.hue?b[E]:b[0]).attr("opacity",.75);["V1","V2"].forEach((a,m)=>g(m*l+l/2,o+14,a))}else if(x==="reg"){const r=f.order||1,l=f.color||"#7EC8E3",s=(f.ci||95)/100*.07,p=Array.from({length:35},()=>({x:.05+c()*.9,y:0}));p.forEach(e=>{r===1?e.y=.1+e.x*.7+(c()-.5)*.16:r===2?e.y=.1+.1*e.x+.9*e.x*e.x+(c()-.5)*.13:e.y=.7-2.2*e.x+3.5*e.x*e.x-1.5*e.x*e.x*e.x+(c()-.5)*.1,e.y=Math.max(.02,Math.min(.95,e.y))}),f.scatter&&n.selectAll("circle").data(p).join("circle").attr("cx",e=>e.x*d).attr("cy",e=>(1-e.y)*o).attr("r",3.5).attr("fill",l).attr("opacity",.45);const a=Array.from({length:50},(e,h)=>{const w=.05+h/49*.9;let _;return r===1?_=.1+w*.7:r===2?_=.1+.1*w+.9*w*w:_=.7-2.2*w+3.5*w*w-1.5*w*w*w,{x:w,y:Math.max(.02,Math.min(.95,_))}}),m=a.map(e=>({x:e.x*d,y:(1-Math.min(.95,e.y+s))*o})),E=[...a].reverse().map(e=>({x:e.x*d,y:(1-Math.max(.02,e.y-s))*o}));n.append("path").attr("d",m.map((e,h)=>`${h===0?"M":"L"}${e.x},${e.y}`).join(" ")+" "+E.map(e=>`L${e.x},${e.y}`).join(" ")+"Z").attr("fill",l).attr("opacity",.2),n.append("path").attr("d",L().x(e=>e.x*d).y(e=>(1-e.y)*o).curve(F)(a)).attr("fill","none").attr("stroke",l).attr("stroke-width",2.5)}}function lt(t){if(!t)return null;const x=t.querySelector(".sb-list"),f=t.querySelector(".sb-params"),v=t.querySelector(".sb-preview"),i=t.querySelector(".sb-code");if(!x||!f||!v||!i)return null;let u=O[0],d=Object.fromEntries(u.params.map(y=>[y.id,y.default])),o=null;O.forEach((y,b)=>{const g=document.createElement("div");g.className="sb-list-item",g.style.cssText="display:flex;gap:10px;align-items:center;padding:10px 12px;cursor:pointer;border-radius:8px;transition:background 0.2s;min-height:44px;min-width:0;",g.innerHTML=`<span style="font-size:16px;flex-shrink:0">${y.icon}</span><div style="min-width:0;overflow:hidden"><div style="font-weight:600;font-size:13px;color:var(--text-on-dark);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${y.name}</div><div style="font-size:11px;color:var(--text-on-dark-2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${y.desc}</div></div>`,b===0&&(g.style.background="rgba(126,200,227,0.12)"),g.addEventListener("click",()=>{x.querySelectorAll(".sb-list-item").forEach(r=>r.style.background=""),g.style.background="rgba(126,200,227,0.12)",u=y,d=Object.fromEntries(y.params.map(r=>[r.id,r.default])),n(),c(),k()}),x.appendChild(g)});function n(){f.innerHTML=`<div style="font-weight:600;font-size:14px;color:var(--text-on-dark);margin-bottom:14px;font-family:var(--font-code)">${u.name}</div>`,u.params.forEach(y=>{const b=document.createElement("div");b.style.marginBottom="12px",y.type==="select"?b.innerHTML=`<label style="display:block;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">${y.label}</label>
          <select data-pid="${y.id}" style="width:100%;background:#2d2d2f;color:var(--text-on-dark);border:1px solid var(--border-dark);border-radius:6px;padding:6px 8px;font-size:12px;min-height:36px">
            ${y.options.map(g=>`<option value="${g}" ${g===d[y.id]?"selected":""}>${g}</option>`).join("")}
          </select>`:y.type==="range"?b.innerHTML=`<label style="display:flex;justify-content:space-between;margin-bottom:4px;font-size:12px;color:var(--text-on-dark-2)">
          <span>${y.label}</span><span class="pval-${y.id}">${d[y.id]}</span></label>
          <input type="range" data-pid="${y.id}" min="${y.min}" max="${y.max}" step="${y.step}" value="${d[y.id]}"
            style="width:100%;accent-color:var(--accent);min-height:32px;cursor:pointer">`:y.type==="checkbox"&&(b.innerHTML=`<label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:12px;color:var(--text-on-dark-2);min-height:44px">
          <input type="checkbox" data-pid="${y.id}" ${d[y.id]?"checked":""} style="width:16px;height:16px;accent-color:var(--accent)">
          ${y.label}</label>`),f.appendChild(b)}),f.querySelectorAll("[data-pid]").forEach(y=>{y.addEventListener("change",()=>{const b=y.dataset.pid;y.type==="checkbox"?d[b]=y.checked:y.type==="range"?d[b]=parseFloat(y.value):d[b]=y.value;const g=f.querySelector(`.pval-${b}`);g&&(g.textContent=d[b]),c(),k()})})}function c(){v.innerHTML="";const y=Math.max(v.clientWidth||0,180),b=320,g=T(v).append("svg").attr("viewBox",`0 0 ${y} ${b}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");nt(g,u.id,d,y,b)}function k(){const y=u.genCode(d);o?o.setCode(y):o=G(i,{language:"python",code:y,readOnly:window.innerWidth<768})}return n(),c(),k(),{destroy(){if(o){try{o.destroy()}catch{}o=null}}}}function st(t,x){const i=T(t).append("svg").attr("viewBox","0 0 130 80").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("display","block");i.append("rect").attr("width",130).attr("height",80).attr("fill","#1d1d1f").attr("rx",6);const u={t:10,r:10,b:16,l:18},d=i.append("g").attr("transform",`translate(${u.l},${u.t})`),o=130-u.l-u.r,n=80-u.t-u.b;d.append("line").attr("x1",0).attr("y1",n).attr("x2",o).attr("y2",n).attr("stroke","#424245").attr("stroke-width",.8),d.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",n).attr("stroke","#424245").attr("stroke-width",.8);const c=["#7EC8E3","#95D5B2","#B8B8E8","#F0B27A"],k=D(x.length*7+1);if(x==="散点图")for(let y=0;y<22;y++)d.append("circle").attr("cx",k()*o).attr("cy",k()*n).attr("r",2.5).attr("fill",c[Math.floor(k()*3)]).attr("opacity",.8);else if(x==="折线图"){const y=[.55,.35,.65,.45,.75,.6,.85],b=[.25,.15,.3,.2,.4,.28,.45],g=B().domain([0,6]).range([0,o]),r=B().domain([0,1]).range([n,0]),l=L().x((s,p)=>g(p)).y(s=>r(s)).curve(F);d.append("path").attr("d",l(y)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8),d.append("path").attr("d",l(b)).attr("fill","none").attr("stroke","#95D5B2").attr("stroke-width",1.8)}else if(x==="柱状图"){const y=[.55,.8,.4,.65],b=H().domain([0,1,2,3]).range([0,o]).padding(.2);y.forEach((g,r)=>{const l=g*n;d.append("rect").attr("x",b(r)).attr("y",n-l).attr("width",b.bandwidth()).attr("height",l).attr("fill",c[r]).attr("rx",2).attr("opacity",.9)})}else if(x==="分面 Facet"){const y=(o-4)/2,b=(n-4)/2;[[0,0],[1,0],[0,1],[1,1]].forEach(([g,r],l)=>{const s=g*(y+4),p=r*(b+4);d.append("rect").attr("x",s).attr("y",p).attr("width",y).attr("height",b).attr("fill","#2a2a2d").attr("rx",2);const a=D(l*13+3);for(let m=0;m<5;m++)d.append("circle").attr("cx",s+3+a()*(y-6)).attr("cy",p+3+a()*(b-6)).attr("r",2).attr("fill",c[l]).attr("opacity",.85)})}else if(x==="主题样式"){[.25,.5,.75,1].forEach(l=>{d.append("line").attr("x1",0).attr("y1",l*n).attr("x2",o).attr("y2",l*n).attr("stroke","#333336").attr("stroke-dasharray","2,2").attr("stroke-width",.6)});const y=[.3,.5,.42,.68,.55,.78],b=B().domain([0,5]).range([0,o]),g=B().domain([0,1]).range([n,0]),r=L().x((l,s)=>b(s)).y(l=>g(l)).curve(F);d.append("path").attr("d",r(y)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8)}else if(x==="配色 Scale"){const b=i.append("defs").append("linearGradient").attr("id",`cg${x.length}`).attr("x1","0%").attr("x2","100%");b.append("stop").attr("offset","0%").attr("stop-color","#3B4CC0"),b.append("stop").attr("offset","50%").attr("stop-color","#95D5B2"),b.append("stop").attr("offset","100%").attr("stop-color","#F0B27A"),d.append("rect").attr("x",0).attr("y",n/2-5).attr("width",o).attr("height",12).attr("fill",`url(#cg${x.length})`).attr("rx",3),["#3B4CC0","#6A8FD5","#95D5B2","#F0C070","#F0B27A"].forEach((g,r)=>{d.append("circle").attr("cx",(r+.5)*o/5).attr("cy",n/2-18).attr("r",6).attr("fill",g)})}else if(x==="标注 Annotate"){const y=[.25,.45,.38,.7,.55,.65],b=B().domain([0,5]).range([0,o]),g=B().domain([0,1]).range([n,0]),r=L().x((p,a)=>b(a)).y(p=>g(p)).curve(F);d.append("path").attr("d",r(y)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",1.8);const l=b(3),s=g(.7);d.append("circle").attr("cx",l).attr("cy",s).attr("r",4).attr("fill","#F0B27A"),d.append("line").attr("x1",l).attr("y1",s).attr("x2",l-15).attr("y2",s-18).attr("stroke","#F0B27A").attr("stroke-width",1.2),d.append("text").attr("x",l-16).attr("y",s-20).attr("fill","#F0B27A").attr("font-size",8).attr("text-anchor","end").attr("font-family","sans-serif").text("关键点")}else if(x==="保存图片"){const g=(o-32)/2,r=(n-42)/2-4;d.append("path").attr("d",`M${g},${r+8} L${g+8},${r} L${g+32},${r} L${g+32},${r+42} L${g},${r+42} Z`).attr("fill","#2a2a2d").attr("stroke","#424245").attr("stroke-width",1.2),d.append("path").attr("d",`M${g},${r+8} L${g+8},${r+8} L${g+8},${r}`).attr("fill","none").attr("stroke","#424245").attr("stroke-width",1);const l=g+32/2,s=r+42/2+4;d.append("line").attr("x1",l).attr("y1",s-8).attr("x2",l).attr("y2",s+6).attr("stroke","#7EC8E3").attr("stroke-width",1.5),d.append("path").attr("d",`M${l-4},${s+2} L${l},${s+7} L${l+4},${s+2}`).attr("fill","#7EC8E3"),d.append("text").attr("x",l).attr("y",r+42+12).attr("fill","#7EC8E3").attr("font-size",7).attr("text-anchor","middle").attr("font-family","sans-serif").text("PDF/SVG")}}function pt(t){if(!t)return;const x=t.querySelector("#compare-rows"),f=t.querySelector(".compare-tabs");if(!x)return;const v=document.createElement("div");v.className="compare-header-row",v.style.cssText="display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;padding:8px 0 10px;border-bottom:2px solid var(--border-light);margin-bottom:4px;",v.innerHTML=`
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">概念</div>
    <div style="font-size:11px;font-weight:600;color:var(--text-on-light-3);text-transform:uppercase;letter-spacing:0.08em">示意图</div>
    <div style="font-size:11px;font-weight:600;color:#7EC8E3;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">🐍 Python / matplotlib</div>
    <div style="font-size:11px;font-weight:600;color:#95D5B2;text-transform:uppercase;letter-spacing:0.08em;padding-left:12px">📊 R / ggplot2</div>`,x.appendChild(v),ot.forEach(i=>{const u=document.createElement("div");u.className="compare-row",u.style.cssText="display:grid;grid-template-columns:90px 140px 1fr 1fr;gap:12px;border-top:1px solid var(--border-light);padding:16px 0;align-items:start;",u.innerHTML=`
      <div style="font-weight:600;color:var(--accent);font-size:13px;padding-top:4px;font-family:var(--font-code);line-height:1.5">${i.concept}</div>
      <div class="cmp-mini-wrap" style="border-radius:6px;overflow:hidden;"></div>
      <pre class="compare-python" style="background:#1d1d1f;color:#f5f5f7;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${i.python}</pre>
      <pre class="compare-r" style="background:#f5f5f7;color:#1d1d1f;padding:12px;border-radius:8px;font-size:11px;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;margin:0;font-family:var(--font-code);line-height:1.5;min-width:0">${i.r}</pre>`,x.appendChild(u),st(u.querySelector(".cmp-mini-wrap"),i.concept)}),window.innerWidth<=768&&f&&(f.style.display="flex",x.querySelectorAll(".compare-r").forEach(i=>i.style.display="none"),f.querySelectorAll(".compare-tab").forEach(i=>{i.addEventListener("click",()=>{f.querySelectorAll(".compare-tab").forEach(d=>{d.style.background="var(--bg-light-alt)",d.style.color="var(--text-on-light)",d.style.border="1px solid var(--border-light)"}),i.style.background="var(--accent)",i.style.color="#1d1d1f",i.style.border="none";const u=i.dataset.lang;x.querySelectorAll(".compare-python").forEach(d=>{d.style.display=u==="python"?"block":"none"}),x.querySelectorAll(".compare-r").forEach(d=>{d.style.display=u==="r"?"block":"none"})})}))}function dt(t,x,f,v,i,u){const d=Math.atan2(i-f,v-x),o=10;t.strokeStyle=u,t.fillStyle=u,t.lineWidth=2,t.beginPath(),t.moveTo(x,f),t.lineTo(v,i),t.stroke(),t.beginPath(),t.moveTo(v,i),t.lineTo(v-o*Math.cos(d-.4),i-o*Math.sin(d-.4)),t.lineTo(v-o*Math.cos(d+.4),i-o*Math.sin(d+.4)),t.closePath(),t.fill()}function ct(t,x){const f=t.type==="arrow"?Math.min(t.x1,t.x2):t.x,v=t.type==="arrow"?Math.min(t.y1,t.y2):t.y,i=t.type==="arrow"?Math.abs(t.x2-t.x1)+20:t.w||60,u=t.type==="arrow"?Math.abs(t.y2-t.y1)+20:t.h||40;return x.x>=f-10&&x.x<=f+i+10&&x.y>=v-10&&x.y<=v+u+10}function xt(t){if(!t)return null;const x=t.querySelector("#annotate-canvas"),f=t.querySelector(".annotate-toolbar"),v=t.querySelector(".ann-code-editor");if(!x||!f||!v)return null;const i=x.getContext("2d"),u=window.devicePixelRatio||1;let d=null;const o=[];let n="arrow",c=null,k={x:0,y:0},y=null;[{type:"arrow",label:"↗ 箭头"},{type:"text",label:"T 文字"},{type:"rect",label:"□ 方框"},{type:"highlight",label:"◆ 高亮"}].forEach(e=>{const h=document.createElement("button");h.textContent=e.label,h.dataset.type=e.type,h.style.cssText="padding:8px 14px;min-height:44px;background:#2d2d2f;border:1px solid var(--border-dark);border-radius:8px;color:var(--text-on-dark);cursor:pointer;font-size:13px;transition:background 0.2s;white-space:nowrap;",e.type==="arrow"&&(h.style.background="rgba(126,200,227,0.18)"),h.addEventListener("click",()=>{f.querySelectorAll("button[data-type]").forEach(w=>w.style.background="#2d2d2f"),h.style.background="rgba(126,200,227,0.18)",n=e.type}),f.appendChild(h)});const g=document.createElement("button");g.textContent="重置",g.style.cssText="padding:8px 14px;min-height:44px;background:transparent;border:1px solid var(--border-dark);border-radius:8px;color:var(--accent);cursor:pointer;font-size:13px;margin-left:auto;white-space:nowrap;",g.addEventListener("click",()=>{o.length=0,p(),m()}),f.appendChild(g);function r(){const e=x.parentElement.clientWidth||400,h=Math.round(Math.min(e*.55,380));x.width=Math.round(e*u),x.height=Math.round(h*u),x.style.width=e+"px",x.style.height=h+"px",i.setTransform(u,0,0,u,0,0),l(),s()}function l(){const e=x.clientWidth,h=x.clientHeight;i.fillStyle="#1d1d1f",i.fillRect(0,0,e,h),i.strokeStyle="#424245",i.lineWidth=1,i.beginPath(),i.moveTo(55,15),i.lineTo(55,h-30),i.lineTo(e-15,h-30),i.stroke();const w=[30,80,55,120,95,150,110,170,140,185],_=(e-80)/(w.length-1),A=(h-55)/200,M=w.map(($,S)=>({x:55+S*_,y:h-30-$*A}));i.strokeStyle="#7EC8E3",i.lineWidth=2,i.beginPath(),M.forEach(($,S)=>S===0?i.moveTo($.x,$.y):i.lineTo($.x,$.y)),i.stroke(),i.fillStyle="#7EC8E3",M.forEach($=>{i.beginPath(),i.arc($.x,$.y,3.5,0,Math.PI*2),i.fill()}),i.fillStyle="#6e6e73",i.font="11px sans-serif",i.fillText("时间",e/2-10,h-8),i.save(),i.translate(14,h/2),i.rotate(-Math.PI/2),i.fillText("值",-8,0),i.restore()}function s(){o.forEach(e=>{if(i.save(),e.type==="arrow")dt(i,e.x1,e.y1,e.x2,e.y2,"#F0D264"),i.fillStyle="#F0D264",i.font="bold 11px sans-serif",i.fillText(e.label||"峰值",e.x2+6,e.y2-4);else if(e.type==="text"){i.font="12px sans-serif";const h=i.measureText(e.label||"标注").width;i.fillStyle="rgba(240,210,100,0.9)",i.fillRect(e.x-3,e.y-14,h+8,18),i.fillStyle="#1d1d1f",i.fillText(e.label||"标注",e.x+1,e.y)}else e.type==="rect"?(i.strokeStyle="#E07A7A",i.lineWidth=2,i.setLineDash([5,3]),i.strokeRect(e.x,e.y,e.w||70,e.h||45),i.setLineDash([])):e.type==="highlight"&&(i.fillStyle="rgba(240,178,122,0.22)",i.fillRect(e.x,e.y,e.w||70,e.h||45),i.strokeStyle="#F0B27A",i.lineWidth=1.5,i.strokeRect(e.x,e.y,e.w||70,e.h||45));i.restore()})}function p(){l(),s()}function a(e){const h=x.getBoundingClientRect(),w=x.clientWidth/h.width,_=x.clientHeight/h.height,A=e.clientX??e.touches?.[0]?.clientX??0,M=e.clientY??e.touches?.[0]?.clientY??0;return{x:(A-h.left)*w,y:(M-h.top)*_}}x.addEventListener("pointerdown",e=>{e.preventDefault(),x.setPointerCapture(e.pointerId);const h=a(e);c=o.slice().reverse().find(w=>ct(w,h))||null,c?k={x:h.x-(c.x??c.x1),y:h.y-(c.y??c.y1)}:y=h}),x.addEventListener("pointermove",e=>{if(!c&&!y)return;const h=a(e);if(c){const w=h.x-k.x-(c.x??c.x1),_=h.y-k.y-(c.y??c.y1);c.type==="arrow"?(c.x1+=w,c.y1+=_,c.x2+=w,c.y2+=_):(c.x+=w,c.y+=_),k={x:h.x-(c.x??c.x1),y:h.y-(c.y??c.y1)},p()}}),x.addEventListener("pointerup",e=>{if(!c&&y){const h=a(e);if(n==="arrow")o.push({type:"arrow",x1:y.x,y1:y.y,x2:h.x,y2:h.y,label:"关键点"});else if(n==="text")o.push({type:"text",x:h.x,y:h.y,label:"标注文字"});else{const w=h.x-y.x,_=h.y-y.y;o.push({type:n,x:Math.min(y.x,h.x),y:Math.min(y.y,h.y),w:Math.abs(w)||70,h:Math.abs(_)||45})}p(),m()}c=null,y=null});function m(){const e=x.clientWidth,h=x.clientHeight,w=$=>(($-55)/(e-80)*10).toFixed(1),_=$=>((h-30-$)/(h-55)*200).toFixed(0),A=["import matplotlib.pyplot as plt","","fig, ax = plt.subplots(figsize=(8, 6), dpi=150)","# ... 绘制图表数据 ...",""];o.forEach($=>{$.type==="arrow"?(A.push(`ax.annotate("${$.label||"关键点"}",`),A.push(`    xy=(${w($.x2)}, ${_($.y2)}),`),A.push(`    xytext=(${w($.x1)}, ${_($.y1)}),`),A.push('    arrowprops=dict(arrowstyle="->", color="#F0D264"),'),A.push('    color="#F0D264", fontsize=10)')):$.type==="text"?(A.push(`ax.text(${w($.x)}, ${_($.y)}, "标注文字",`),A.push('    fontsize=10, color="#F0D264")')):($.type==="rect"||$.type==="highlight")&&(A.push("from matplotlib.patches import FancyBboxPatch"),A.push(`rect = FancyBboxPatch((${w($.x)}, ${_($.y+($.h||45))}),`),A.push(`    ${(($.w||70)/(e-80)*10).toFixed(1)}, ${(($.h||45)/(h-55)*200).toFixed(0)},`),A.push('    boxstyle="round,pad=0.1",'),A.push(`    fill=${$.type==="highlight"?"True":"False"},`),A.push('    alpha=0.2, color="#F0B27A")'),A.push("ax.add_patch(rect)")),A.push("")}),A.push("plt.tight_layout()");const M=A.join(`
`);d?d.setCode(M):d=G(v,{language:"python",code:M,readOnly:window.innerWidth<768})}r(),m();const E=()=>{r(),m()};return window.addEventListener("resize",E),{destroy(){if(window.removeEventListener("resize",E),d){try{d.destroy()}catch{}d=null}}}}function qt(){return`
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
.p9-scroll-hint { font-size:var(--text-caption); color:var(--text-on-dark-3); animation:p9-float 2s ease-in-out infinite; white-space:nowrap; margin-top:var(--space-sm); }
@keyframes p9-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
.p9-hero-tagline { font-family:var(--font-body); font-size:var(--text-body); color:var(--text-on-dark-2); max-width:540px; line-height:1.8; margin-top:var(--space-sm); }
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
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow" style="opacity:0;">Module 01 / Page 09</p>
    <h1 class="page-hero-title" style="color:var(--text-on-dark);opacity:0;">Python 可视化与数据叙事</h1>
    <p class="page-hero-sub" style="opacity:0;">Python Visualization &amp; Data Storytelling</p>
    <p class="p9-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;margin-top:var(--space-sm);opacity:0;">用 matplotlib 与 seaborn 制作出版级图表，让数据开口说话。</p>
    <nav class="hero-quicknav" id="p09-quicknav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#s1-matplotlib-hierarchy">matplotlib 层次</button>
      <button class="hero-quicknav__item" data-target="#s2-seaborn-gallery">seaborn 速查</button>
      <button class="hero-quicknav__item" data-target="#s3-mpl-vs-ggplot">语法对照</button>
      <button class="hero-quicknav__item" data-target="#s4-annotate-canvas">标注演示</button>
      <button class="hero-quicknav__item" data-target="#s5-storytelling">数据叙事</button>
    </nav>
    <div class="p9-scroll-hint" style="opacity:0;">↓ 向下探索</div>
  </div>
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
  <h2 class="page-footer-quote">好图表不是装饰，而是论点本身的延伸</h2>
  <p class="page-footer-desc">下一页：科研绘图工作流与导出 — 从数据到出版级图表的完整流程</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p9-prev-btn">← R 配色方案</button>
    <button class="btn-primary" id="p9-next-btn">工作流与导出 →</button>
  </div>
</section>

</div>
`}function yt(t){if(!t)return;t.innerHTML=`
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
    </div>`;const x=D(55),f=["A","B","C","D"],v={A:"#7EC8E3",B:"#95D5B2",C:"#F0B27A",D:"#B8B8E8"},i=Array.from({length:60},()=>{const r=f[Math.floor(x()*4)];return{x:.05+x()*.9,y:.05+x()*.9,g:r}}),u=480,d=280,o=T(t.querySelector(".cc-svg-wrap")).append("svg").attr("viewBox",`0 0 ${u} ${d}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),n={t:15,r:15,b:30,l:40},c=o.append("g").attr("transform",`translate(${n.l},${n.t})`),k=u-n.l-n.r,y=d-n.t-n.b;c.append("line").attr("x1",0).attr("y1",y).attr("x2",k).attr("y2",y).attr("stroke","#d2d2d7").attr("stroke-width",1),c.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",y).attr("stroke","#d2d2d7").attr("stroke-width",1);const b=c.selectAll("circle").data(i).join("circle").attr("cx",r=>r.x*k).attr("cy",r=>(1-r.y)*y).attr("r",5).attr("fill",r=>v[r.g]).attr("opacity",.75);function g(r){b.transition().duration(400).attr("fill",l=>r==="all"||l.g===r?v[l.g]:"#d2d2d7").attr("opacity",l=>r==="all"?.75:l.g===r?.9:.3),t.querySelectorAll(".cc-btn").forEach(l=>{const s=l.dataset.group===r;l.style.background=s?"var(--accent)":"transparent",l.style.color=s?"#1d1d1f":"var(--text-on-light-2)",l.style.fontWeight=s?"600":"400"})}t.querySelectorAll(".cc-btn").forEach(r=>{r.addEventListener("click",()=>g(r.dataset.group))})}function ht(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法二</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">标注引导阅读顺序</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:20px">将分析结论直接写在图表上，箭头和文字标注引导读者按预设顺序理解数据。</p>
        <button id="af-play-btn" style="padding:8px 20px;min-height:40px;background:var(--accent);color:#1d1d1f;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600">▶ 播放标注</button>
      </div>
      <div class="af-svg-wrap"></div>
    </div>`;const x=500,f=260,v=T(t.querySelector(".af-svg-wrap")).append("svg").attr("viewBox",`0 0 ${x} ${f}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),i={t:20,r:20,b:35,l:45},u=v.append("g").attr("transform",`translate(${i.l},${i.t})`),d=x-i.l-i.r,o=f-i.t-i.b;u.append("line").attr("x1",0).attr("y1",o).attr("x2",d).attr("y2",o).attr("stroke","#d2d2d7").attr("stroke-width",1),u.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",o).attr("stroke","#d2d2d7").attr("stroke-width",1);const n=[18,32,28,55,48,72,65,88,78,95],c=B().domain([0,9]).range([0,d]),k=B().domain([0,100]).range([o,0]),y=L().x((a,m)=>c(m)).y(a=>k(a)).curve(F);u.append("path").attr("d",y(n)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5),u.selectAll("circle").data(n).join("circle").attr("cx",(a,m)=>c(m)).attr("cy",a=>k(a)).attr("r",4).attr("fill","#7EC8E3");const b=[{x:c(3),y:k(55),label:"转折点 ↑",tx:-15,ty:-32},{x:c(7),y:k(88),label:"高峰值",tx:-52,ty:22},{x:c(9),y:k(95),label:"终点 95",tx:-58,ty:28}],g=u.append("g").attr("class","ann-layer"),r=b.map(a=>{const m=g.append("g").style("opacity","0");return m.append("line").attr("x1",a.x).attr("y1",a.y).attr("x2",a.x+a.tx*.65).attr("y2",a.y+a.ty*.65).attr("stroke","#F0D264").attr("stroke-width",1.5).attr("marker-end","url(#arrow-marker)"),m.append("text").attr("x",a.x+a.tx).attr("y",a.y+a.ty).attr("fill","#F0D264").attr("font-size",11).attr("font-weight","600").attr("font-family","sans-serif").attr("text-anchor",a.tx<0?"end":"start").text(a.label),m});v.append("defs").append("marker").attr("id","arrow-marker").attr("markerWidth",8).attr("markerHeight",8).attr("refX",6).attr("refY",3).attr("orient","auto").append("path").attr("d","M0,0 L0,6 L8,3 z").attr("fill","#F0D264");let p=!1;t.querySelector("#af-play-btn").addEventListener("click",()=>{p||(p=!0,r.forEach(a=>a.style("opacity","0")),r.forEach((a,m)=>{R.to(a.node(),{opacity:1,duration:.5,delay:m*.8+.2,onComplete:m===r.length-1?()=>{p=!1}:void 0})}))})}function ft(t){if(!t)return;t.innerHTML=`
    <div class="story-grid">
      <div>
        <span style="font-size:11px;font-family:var(--font-code);color:var(--accent);text-transform:uppercase;letter-spacing:0.1em">方法三</span>
        <h3 style="font:700 1.4rem var(--font-display);color:var(--text-on-light);margin:6px 0 12px">灰化非重点数据</h3>
        <p style="color:var(--text-on-light-2);font-size:14px;line-height:1.7;margin-bottom:12px">将非核心数据调成低饱和度灰色，让重点数据自然浮现。</p>
        <p style="color:var(--text-on-light-3);font-size:13px;line-height:1.6;font-style:italic">↗ 悬停右侧柱子体验效果</p>
      </div>
      <div class="go-svg-wrap"></div>
    </div>`;const x=["一月","二月","三月","四月","五月","六月"],f=[42,68,55,80,63,91],v=["#7EC8E3","#95D5B2","#F0B27A","#B8B8E8","#E07A7A","#F0D264"],i=480,u=260,d=T(t.querySelector(".go-svg-wrap")).append("svg").attr("viewBox",`0 0 ${i} ${u}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),o={t:15,r:20,b:35,l:45},n=d.append("g").attr("transform",`translate(${o.l},${o.t})`),c=i-o.l-o.r,k=u-o.t-o.b;n.append("line").attr("x1",0).attr("y1",k).attr("x2",c).attr("y2",k).attr("stroke","#d2d2d7");const y=H().domain(x).range([0,c]).padding(.25),b=B().domain([0,100]).range([k,0]);n.selectAll("text.xt").data(x).join("text").attr("class","xt").attr("x",r=>y(r)+y.bandwidth()/2).attr("y",k+16).attr("text-anchor","middle").attr("font-size",11).attr("fill","#6e6e73").text(r=>r);const g=n.selectAll("rect").data(f).join("rect").attr("x",(r,l)=>y(x[l])).attr("y",r=>b(r)).attr("width",y.bandwidth()).attr("height",r=>k-b(r)).attr("fill",(r,l)=>v[l]).attr("rx",3).attr("opacity",.85).style("cursor","pointer");g.on("mouseover",function(r,l){const s=Array.from(this.parentNode.querySelectorAll("rect")).indexOf(this);g.transition().duration(200).attr("fill",(p,a)=>a===s?v[a]:"#d2d2d7").attr("opacity",(p,a)=>a===s?1:.5)}).on("mouseout",()=>{g.transition().duration(200).attr("fill",(r,l)=>v[l]).attr("opacity",.85)})}function gt(t){if(!t)return;t.innerHTML=`
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
    </div>`;const x=[12,28,22,45,38,62,55,75,68,88],f=480,v=250,i=T(t.querySelector(".sr-svg-wrap")).append("svg").attr("viewBox",`0 0 ${f} ${v}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","10px"),u={t:15,r:15,b:30,l:45},d=i.append("g").attr("transform",`translate(${u.l},${u.t})`),o=f-u.l-u.r,n=v-u.t-u.b;d.append("line").attr("x1",0).attr("y1",n).attr("x2",o).attr("y2",n).attr("stroke","#d2d2d7"),d.append("line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",n).attr("stroke","#d2d2d7");const c=B().domain([0,9]).range([0,o]),k=B().domain([0,100]).range([n,0]),y=d.selectAll("circle.sr-dot").data(x).join("circle").attr("class","sr-dot").attr("cx",(s,p)=>c(p)).attr("cy",s=>k(s)).attr("r",5).attr("fill","#7EC8E3").attr("opacity",0),b=d.append("path").attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2.5).attr("opacity",0);let g=null;const r=t.querySelector("#sr-step-label");function l(s){if(r&&(r.textContent=`${s} / ${x.length}`),y.attr("opacity",(p,a)=>a<s?.85:0),s>1){const p=x.slice(0,s),a=L().x((m,E)=>c(E)).y(m=>k(m)).curve(F);b.attr("d",a(p)).attr("opacity",1)}else b.attr("opacity",0)}t.querySelector("#sr-play-btn").addEventListener("click",()=>{if(g)return;l(0);let s=0;g=setInterval(()=>{s++,l(s),s>=x.length&&(clearInterval(g),g=null)},500)}),t.querySelector("#sr-reset-btn").addEventListener("click",()=>{g&&(clearInterval(g),g=null),l(0)})}function mt(t){if(!t)return;t.innerHTML=`
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
    </div>`;const x=t.querySelector('div[style*="grid-template-columns"]');window.innerWidth<=600&&x&&(x.style.gridTemplateColumns="1fr");function f(i){const o=T(i).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),n={t:15,r:15,b:25,l:35},c=o.append("g").attr("transform",`translate(${n.l},${n.t})`),k=300-n.l-n.r,y=180-n.t-n.b,b=[20,35,28,55,48,70],g=B().domain([0,5]).range([0,k]),r=B().domain([0,80]).range([y,0]),l=L().x((p,a)=>g(a)).y(p=>r(p)).curve(F);c.append("path").attr("d",l(b)).attr("fill","none").attr("stroke","#7EC8E3").attr("stroke-width",2),[{x:g(1),y:r(35),label:"增长?",color:"#E64B35"},{x:g(2),y:r(28),label:"下降!",color:"#F0B27A"},{x:g(3),y:r(55),label:"最高点",color:"#4DBBD5"},{x:g(4),y:r(48),label:"又降了",color:"#00A087"},{x:g(5),y:r(70),label:"高点",color:"#3C5488"}].forEach(p=>{c.append("circle").attr("cx",p.x).attr("cy",p.y).attr("r",6).attr("fill",p.color).attr("opacity",.9),c.append("text").attr("x",p.x+6).attr("y",p.y-6).attr("fill",p.color).attr("font-size",9).attr("font-weight","bold").text(p.label)})}function v(i){const o=T(i).append("svg").attr("viewBox","0 0 300 180").attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("height","auto").style("background","var(--bg-light-alt)").style("border-radius","8px"),n={t:15,r:15,b:25,l:35},c=o.append("g").attr("transform",`translate(${n.l},${n.t})`),k=300-n.l-n.r,y=180-n.t-n.b,b=[20,35,28,55,48,70],g=B().domain([0,5]).range([0,k]),r=B().domain([0,80]).range([y,0]),l=L().x((a,m)=>g(m)).y(a=>r(a)).curve(F);c.append("path").attr("d",l(b)).attr("fill","none").attr("stroke","#d2d2d7").attr("stroke-width",2);const s=g(5),p=r(70);c.append("circle").attr("cx",s).attr("cy",p).attr("r",6).attr("fill","#7EC8E3"),c.append("line").attr("x1",s).attr("y1",p+8).attr("x2",s-30).attr("y2",p+28).attr("stroke","#7EC8E3").attr("stroke-width",1.5),c.append("text").attr("x",s-34).attr("y",p+38).attr("fill","#7EC8E3").attr("font-size",10).attr("font-weight","600").attr("text-anchor","end").text("季度最高：70")}f(t.querySelector(".sc-bad-wrap")),v(t.querySelector(".sc-good-wrap"))}function ut(t){t&&(yt(t.querySelector("#story-color-contrast")),ht(t.querySelector("#story-annotation-flow")),ft(t.querySelector("#story-grey-out")),gt(t.querySelector("#story-reveal")),mt(t.querySelector("#story-compare")),["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal"].forEach(x=>{const f=document.querySelector(x);f&&R.fromTo(f,{opacity:0,y:40},{opacity:1,y:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:f,start:"top 82%",toggleActions:"play none none none"}})}))}function Ht(){C.cleanupFns=[],C.resizeObservers=[];const t=R.timeline({delay:.2});t.fromTo("#p9-root .hero-eyebrow",{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:"power3.out"},0),t.fromTo("#p9-root .page-hero-title",{y:30,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.15),t.fromTo("#p9-root .page-hero-sub",{y:20,opacity:0},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo("#p9-root .p9-hero-tagline",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#p9-root #p09-quicknav",{y:20,opacity:0},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),t.fromTo("#p9-root .p9-scroll-hint",{opacity:0,y:15},{opacity:1,y:0,duration:.6,ease:"power3.out"},.75),document.querySelectorAll("#p09-quicknav .hero-quicknav__item").forEach(v=>{const i=()=>{const u=document.querySelector(v.dataset.target);u&&u.scrollIntoView({behavior:"smooth",block:"start"})};v.addEventListener("click",i),C.cleanupFns.push(()=>v.removeEventListener("click",i))});const x=document.getElementById("p9-prev-btn"),f=document.getElementById("p9-next-btn");if(x){const v=()=>j("m1-p8");x.addEventListener("click",v),C.cleanupFns.push(()=>x.removeEventListener("click",v))}if(f){const v=()=>j("m1-p10");f.addEventListener("click",v),C.cleanupFns.push(()=>f.removeEventListener("click",v))}it(document.getElementById("s1-matplotlib-hierarchy")),C.sbGallery=lt(document.getElementById("s2-seaborn-gallery")),pt(document.getElementById("s3-mpl-vs-ggplot")),C.annCanvas=xt(document.getElementById("s4-annotate-canvas")),ut(document.getElementById("s5-storytelling")),["#s1-matplotlib-hierarchy h2","#s1-matplotlib-hierarchy p","#s2-seaborn-gallery h2","#s2-seaborn-gallery > div > p","#s3-mpl-vs-ggplot h2","#s3-mpl-vs-ggplot > div > p","#s4-annotate-canvas h2","#s4-annotate-canvas > div > p","#s5-storytelling h2","#s5-storytelling > div > p"].forEach(v=>{const i=document.querySelector(v);i&&Z(i,{y:40,stagger:0})})}function Dt(){V(),C.cleanupFns.forEach(f=>{try{f()}catch{}}),C.cleanupFns=[];const t=document.querySelector("#s1-matplotlib-hierarchy .mpl-hierarchy-svg svg");t&&t.remove(),C.sbGallery&&(C.sbGallery.destroy(),C.sbGallery=null);const x=document.getElementById("compare-rows");x&&(x.innerHTML=""),C.annCanvas&&(C.annCanvas.destroy(),C.annCanvas=null),C.resizeObservers.forEach(f=>f.disconnect()),C.resizeObservers=[],["#story-color-contrast","#story-annotation-flow","#story-grey-out","#story-reveal","#story-compare"].forEach(f=>{const v=document.querySelector(f);v&&(v.innerHTML="")})}export{Dt as destroy,Ht as init,qt as render};
