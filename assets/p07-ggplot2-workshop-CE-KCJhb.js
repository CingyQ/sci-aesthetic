import{k as Xt,g as at}from"./ScrollAnimations-B5Kyk-Xq.js";import{c as Qt}from"./CodeEditor-BiI1SvFS.js";import{c as te}from"./CopyButton-2sIiwDp8.js";import{n as At}from"./index-B7QL69Hz.js";import{f as _t,n as ee,i as Rt,g as ae,h as Ht,j as re,k as oe,l as _,r as ht,a as M,b as R,c as E,p as Pt,m as Ct,e as ie,s as Lt}from"./transform-B0CMyjPe.js";import{m as B}from"./max-DBeXZoyG.js";import{a as ne,r as le,c as K,s as Mt,b as se}from"./ramp-BMotAxMB.js";import{s as wt}from"./sum-CB6J5KXz.js";import{w as ce,c as rt}from"./path-CbwjOpE9.js";import{t as de,a as J,p as pe}from"./math-CRUJxRjv.js";import{a as X}from"./area-CnIeoxsb.js";import{l as Q,c as fe}from"./line-rQPvecky.js";import{n as he,s as pt,m as Wt}from"./stack-Cnqjp3GV.js";import{c as It}from"./catmullRom-Dm0ttBHj.js";function ge(t=_t){if(t===_t)return qt;if(typeof t!="function")throw new TypeError("compare is not a function");return(e,a)=>{const o=t(e,a);return o||o===0?o:(t(a,a)===0)-(t(e,e)===0)}}function qt(t,e){return(t==null||!(t>=t))-(e==null||!(e>=e))||(t<e?-1:t>e?1:0)}function D(t,e){let a;if(e===void 0)for(const o of t)o!=null&&(a>o||a===void 0&&o>=o)&&(a=o);else{let o=-1;for(let i of t)(i=e(i,++o,t))!=null&&(a>i||a===void 0&&i>=i)&&(a=i)}return a}function Vt(t,e,a=0,o=1/0,i){if(e=Math.floor(e),a=Math.floor(Math.max(0,a)),o=Math.floor(Math.min(t.length-1,o)),!(a<=e&&e<=o))return t;for(i=i===void 0?qt:ge(i);o>a;){if(o-a>600){const b=o-a+1,y=e-a+1,p=Math.log(b),h=.5*Math.exp(2*p/3),c=.5*Math.sqrt(p*h*(b-h)/b)*(y-b/2<0?-1:1),m=Math.max(a,Math.floor(e-y*h/b+c)),s=Math.min(o,Math.floor(e+(b-y)*h/b+c));Vt(t,e,m,s,i)}const r=t[e];let n=a,f=o;for(N(t,a,e),i(t[o],r)>0&&N(t,a,o);n<f;){for(N(t,n,f),++n,--f;i(t[n],r)<0;)++n;for(;i(t[f],r)>0;)--f}i(t[a],r)===0?N(t,a,f):(++f,N(t,f,o)),f<=e&&(a=f+1),e<=f&&(o=f-1)}return t}function N(t,e,a){const o=t[e];t[e]=t[a],t[a]=o}function O(t,e,a){if(t=Float64Array.from(ee(t)),!(!(o=t.length)||isNaN(e=+e))){if(e<=0||o<2)return D(t);if(e>=1)return B(t);var o,i=(o-1)*e,r=Math.floor(i),n=B(Vt(t,r).subarray(0,r+1)),f=D(t.subarray(r+1));return n+(f-n)*(i-r)}}function ft(t,e){let a=0,o=0;if(e===void 0)for(let i of t)i!=null&&(i=+i)>=i&&(++a,o+=i);else{let i=-1;for(let r of t)(r=e(r,++i,t))!=null&&(r=+r)>=r&&(++a,o+=r)}if(a)return o/a}function me(t,e){e===void 0&&(e=t,t=Rt);for(var a=0,o=e.length-1,i=e[0],r=new Array(o<0?0:o);a<o;)r[a]=t(i,i=e[++a]);return function(n){var f=Math.max(0,Math.min(o-1,Math.floor(n*=o)));return r[f](n-f)}}function be(){var t=0,e=.5,a=1,o=1,i,r,n,f,b,y=Ht,p,h=!1,c;function m(l){return isNaN(l=+l)?c:(l=.5+((l=+p(l))-r)*(o*l<o*r?f:b),y(h?Math.max(0,Math.min(1,l)):l))}m.domain=function(l){return arguments.length?([t,e,a]=l,i=p(t=+t),r=p(e=+e),n=p(a=+a),f=i===r?0:.5/(r-i),b=r===n?0:.5/(n-r),o=r<i?-1:1,m):[t,e,a]},m.clamp=function(l){return arguments.length?(h=!!l,m):h},m.interpolator=function(l){return arguments.length?(y=l,m):y};function s(l){return function(x){var u,d,g;return arguments.length?([u,d,g]=x,y=me(l,[u,d,g]),m):[y(0),y(.5),y(1)]}}return m.range=s(Rt),m.rangeRound=s(oe),m.unknown=function(l){return arguments.length?(c=l,m):c},function(l){return p=l,i=l(t),r=l(e),n=l(a),f=i===r?0:.5/(r-i),b=r===n?0:.5/(n-r),o=r<i?-1:1,m}}function jt(){var t=ae(be()(Ht));return t.copy=function(){return ne(t,jt())},re.apply(t,arguments)}var ue=new Array(3).concat("ef8a62f7f7f767a9cf","ca0020f4a58292c5de0571b0","ca0020f4a582f7f7f792c5de0571b0","b2182bef8a62fddbc7d1e5f067a9cf2166ac","b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac","b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac","b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac","67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061","67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(K);const xe=le(ue);function gt(t){var e=t.length;return function(a){return t[Math.max(0,Math.min(e-1,Math.floor(a*e)))]}}const ye=gt(K("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));gt(K("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));gt(K("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));var ve=gt(K("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));const kt={draw(t,e){const a=J(e/pe);t.moveTo(a,0),t.arc(0,0,a,0,de)}},we={draw(t,e){const a=J(e/5)/2;t.moveTo(-3*a,-a),t.lineTo(-a,-a),t.lineTo(-a,-3*a),t.lineTo(a,-3*a),t.lineTo(a,-a),t.lineTo(3*a,-a),t.lineTo(3*a,a),t.lineTo(a,a),t.lineTo(a,3*a),t.lineTo(-a,3*a),t.lineTo(-a,a),t.lineTo(-3*a,a),t.closePath()}},ke={draw(t,e){const a=J(e),o=-a/2;t.rect(o,o,a,a)}},xt=J(3),Ce={draw(t,e){const a=-J(e/(xt*3));t.moveTo(0,a*2),t.lineTo(-xt*a,-a),t.lineTo(xt*a,-a),t.closePath()}};function St(t,e){let a=null,o=ce(i);t=typeof t=="function"?t:rt(t||kt),e=typeof e=="function"?e:rt(e===void 0?64:+e);function i(){let r;if(a||(a=r=o()),t.apply(this,arguments).draw(a,+e.apply(this,arguments)),r)return a=null,r+""||null}return i.type=function(r){return arguments.length?(t=typeof r=="function"?r:rt(r),i):t},i.size=function(r){return arguments.length?(e=typeof r=="function"?r:rt(+r),i):e},i.context=function(r){return arguments.length?(a=r??null,i):a},i}function Dt(t,e,a){t._context.bezierCurveTo((2*t._x0+t._x1)/3,(2*t._y0+t._y1)/3,(t._x0+2*t._x1)/3,(t._y0+2*t._y1)/3,(t._x0+4*t._x1+e)/6,(t._y0+4*t._y1+a)/6)}function Ot(t){this._context=t}Ot.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=NaN,this._point=0},lineEnd:function(){switch(this._point){case 3:Dt(this,this._x1,this._y1);case 2:this._context.lineTo(this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(t,e){switch(t=+t,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,e):this._context.moveTo(t,e);break;case 1:this._point=2;break;case 2:this._point=3,this._context.lineTo((5*this._x0+this._x1)/6,(5*this._y0+this._y1)/6);default:Dt(this,t,e);break}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=e}};function Y(t){return new Ot(t)}function Ee(t,e){if((o=t.length)>0){for(var a,o,i=0,r=t[0].length,n;i<r;++i){for(n=a=0;a<o;++a)n+=t[a][i][1]||0;if(n)for(a=0;a<o;++a)t[a][i][1]/=n}he(t,e)}}function z(t){let e=t;return()=>(e=e*1664525+1013904223&4294967295,(e>>>0)/4294967295)}function G(t){return()=>{const e=Math.max(1e-10,t()),a=t();return Math.sqrt(-2*Math.log(e))*Math.cos(2*Math.PI*a)}}const zt=(()=>{const t=z(42),e=G(t),a=[{name:"setosa",mx:5,sx:.35,my:1.5,sy:.18},{name:"versicolor",mx:5.9,sx:.52,my:4.3,sy:.47},{name:"virginica",mx:6.6,sx:.63,my:5.5,sy:.55}],o=[];return a.forEach(i=>{for(let r=0;r<20;r++)o.push({x:i.mx+i.sx*e(),y:i.my+i.sy*e(),sp:i.name})}),o})(),$e=(()=>{const t=z(100);return["Control","Trt-A","Trt-B","Trt-C","Trt-D"].map(a=>({cat:a,values:[{grp:"Week 1",mean:25+t()*25,se:2+t()*4},{grp:"Week 8",mean:40+t()*40,se:3+t()*6}]}))})(),V=(()=>{const t=z(200),e=["W0","W1","W2","W3","W4"];return[{grp:"Control",color:"#7EC8E3",base:30,slope:2},{grp:"Low Dose",color:"#F0B27A",base:30,slope:9},{grp:"High Dose",color:"#95D5B2",base:30,slope:15}].map(a=>({grp:a.grp,color:a.color,pts:e.map((o,i)=>({w:o,val:a.base+a.slope*i+(t()-.5)*10}))}))})(),Tt=(()=>{const t=z(300),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(a=>({name:a.name,pts:Array.from({length:30},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),ot=(()=>{const t=z(400),e=G(t);return[{name:"Control",mu:25,sigma:5},{name:"Drug A",mu:48,sigma:8},{name:"Drug B",mu:66,sigma:6}].map(a=>({name:a.name,pts:Array.from({length:50},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),it=(()=>{const t=z(500),e=G(t),a=[];for(let o=0;o<120;o++)a.push(30+8*e());for(let o=0;o<80;o++)a.push(65+10*e());return a})(),yt=(()=>{const t=z(600),e=G(t);return[{grp:"Control",color:"#7EC8E3",mu:30,sigma:6},{grp:"Low Dose",color:"#F0B27A",mu:48,sigma:9},{grp:"High Dose",color:"#95D5B2",mu:62,sigma:7}].map(a=>({grp:a.grp,color:a.color,pts:Array.from({length:80},()=>Math.max(0,a.mu+a.sigma*e()))}))})(),nt=(()=>{const t=z(700),e=["BRCA1","TP53","MYC","EGFR","VEGF","CDK4"],a=["Ctrl","Trt-1h","Trt-6h","Trt-24h","Recover"];return e.map((o,i)=>({gene:o,values:a.map((r,n)=>({cond:r,val:(t()-.5)*4+Math.sin(i*1.1+n*.7)*1.5}))}))})(),lt=(()=>{const t=z(800);return["Control","Group A","Group B","Group C","Group D","Group E"].map(a=>{const o=8+Math.floor(t()*12),i=20+t()*60,r=5+t()*15,n=r/Math.sqrt(o);return{grp:a,mean:i,se:n,sd:r,ci95:n*1.96}})})(),Be=(()=>{const t=z(900);return["BRCA2","KRAS","PIK3CA","APC","PTEN","RB1","SMAD4","VHL"].map(a=>({gene:a,val:(t()-.4)*6}))})(),st=(()=>{const t=z(1e3),e=G(t);return["Week 0","Week 4","Week 8","Week 12"].map((a,o)=>({tp:a,pts:Array.from({length:50},()=>Math.max(0,30+o*12+(5+o*2)*e()))}))})(),vt={setosa:"#7EC8E3",versicolor:"#F0B27A",virginica:"#95D5B2"},ct=["#7EC8E3","#F0B27A"],Gt=["#7EC8E3","#F0B27A","#95D5B2"],Et="#0f1117",Z=[{id:"scatter",name:"散点图",en:"Scatter Plot",tags:["连续 × 连续","相关分析"],desc:"展示两连续变量关系，支持分组着色、回归线",info:"Iris 数据集 · 60 个观测点 · 3 物种"},{id:"bar",name:"柱状图",en:"Bar Chart",tags:["分类 × 连续","组间比较"],desc:"比较不同类别的数值，支持分组/堆叠/百分比",info:"5 个处理组 · 2 个时间点 · 模拟实验数据"},{id:"line",name:"折线图",en:"Line Chart",tags:["时间序列","趋势分析"],desc:"展示随时间变化的趋势，支持面积填充",info:"5 个时间点 · 3 个治疗组 · 纵向研究数据"},{id:"boxplot",name:"箱线图",en:"Box Plot",tags:["分类 × 连续","分布比较"],desc:"展示分布中位数、四分位和异常值",info:"3 组 · 每组 30 个观测值 · 模拟临床数据"},{id:"violin",name:"小提琴图",en:"Violin Plot",tags:["分类 × 连续","分布形态"],desc:"核密度估计展示完整分布形状，比箱线图信息更丰富",info:"3 组 · 每组 50 个观测值 · 模拟临床数据"},{id:"histogram",name:"直方图",en:"Histogram",tags:["单变量","频率分布"],desc:"展示单个连续变量的频率分布，揭示数据偏斜与双峰",info:"200 个观测值 · 双峰分布 · 模拟生物学数据"},{id:"density",name:"密度图",en:"Density Plot",tags:["分布对比","多组叠加"],desc:"核密度估计平滑展示分布，多组重叠对比时优于直方图",info:"3 组 · 每组 80 个观测值 · 模拟测量数据"},{id:"heatmap",name:"热力图",en:"Heatmap",tags:["矩阵数据","表达量"],desc:"用颜色编码矩阵数值，常用于基因表达和相关性矩阵",info:"6 基因 × 5 条件 · 模拟转录组数据"},{id:"area",name:"面积图",en:"Area Chart",tags:["时间序列","组成变化"],desc:"展示随时间变化的组成比例，堆叠面积突出总量变化",info:"5 个时间点 · 3 个处理组 · 比例数据"},{id:"errorbar",name:"误差线图",en:"Error Bar",tags:["均值 ± 误差","统计推断"],desc:"展示均值与不确定性（SE/SD/CI），科研报告标配",info:"6 个处理组 · 模拟实验重复数据"},{id:"lollipop",name:"棒棒糖图",en:"Lollipop",tags:["排名比较","简洁柱状"],desc:"比柱状图更简洁，适合展示排名和单值比较",info:"8 个基因 · 差异表达量 · 模拟 RNA-seq"},{id:"ridgeline",name:"山脊图",en:"Ridgeline",tags:["多组分布","时序演变"],desc:"纵向堆叠的密度图，优雅展示多组分布的变化趋势",info:"4 个时间点 · 每时间点 50 个观测值"}],Ae={scatter:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35"/>
<line x1="18" y1="33" x2="142" y2="33" stroke="#1e2030" stroke-width="0.35"/>
<line x1="56" y1="81" x2="56" y2="8" stroke="#1e2030" stroke-width="0.35"/>
<line x1="96" y1="81" x2="96" y2="8" stroke="#1e2030" stroke-width="0.35"/>
<circle cx="26" cy="74" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="32" cy="70" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="29" cy="65" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="38" cy="72" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="36" cy="63" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="24" cy="61" r="3" fill="#7EC8E3" opacity="0.85"/><circle cx="42" cy="68" r="3" fill="#7EC8E3" opacity="0.9"/><circle cx="31" cy="57" r="3" fill="#7EC8E3" opacity="0.8"/>
<circle cx="62" cy="52" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="71" cy="45" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="66" cy="40" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="78" cy="50" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="82" cy="43" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="57" cy="44" r="3" fill="#F0B27A" opacity="0.85"/><circle cx="74" cy="36" r="3" fill="#F0B27A" opacity="0.9"/><circle cx="69" cy="55" r="3" fill="#F0B27A" opacity="0.8"/>
<circle cx="102" cy="30" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="110" cy="23" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="117" cy="17" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="107" cy="20" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="114" cy="31" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="122" cy="14" r="3" fill="#95D5B2" opacity="0.85"/><circle cx="120" cy="25" r="3" fill="#95D5B2" opacity="0.9"/><circle cx="96" cy="34" r="3" fill="#95D5B2" opacity="0.8"/>
<line x1="20" y1="78" x2="138" y2="11" stroke="#7EC8E3" stroke-width="0.8" stroke-dasharray="3,2" opacity="0.3"/>
</svg>`,bar:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<rect x="22" y="57" width="11" height="24" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="33" y="40" width="11" height="41" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="54" y="62" width="11" height="19" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="65" y="27" width="11" height="54" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="86" y="51" width="11" height="30" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="97" y="18" width="11" height="63" fill="#F0B27A" rx="1.5" opacity="0.9"/>
<rect x="118" y="59" width="11" height="22" fill="#7EC8E3" rx="1.5" opacity="0.9"/>
<rect x="129" y="36" width="11" height="45" fill="#F0B27A" rx="1.5" opacity="0.9"/>
</svg>`,line:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35"/>
<line x1="18" y1="33" x2="142" y2="33" stroke="#1e2030" stroke-width="0.35"/>
<path d="M22,73 L52,71 L82,69 L112,67 L138,65" fill="none" stroke="#7EC8E3" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="73" r="2.5" fill="#7EC8E3"/><circle cx="52" cy="71" r="2.5" fill="#7EC8E3"/><circle cx="82" cy="69" r="2.5" fill="#7EC8E3"/><circle cx="112" cy="67" r="2.5" fill="#7EC8E3"/><circle cx="138" cy="65" r="2.5" fill="#7EC8E3"/>
<path d="M22,71 L52,59 L82,47 L112,36 L138,26" fill="none" stroke="#F0B27A" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="71" r="2.5" fill="#F0B27A"/><circle cx="52" cy="59" r="2.5" fill="#F0B27A"/><circle cx="82" cy="47" r="2.5" fill="#F0B27A"/><circle cx="112" cy="36" r="2.5" fill="#F0B27A"/><circle cx="138" cy="26" r="2.5" fill="#F0B27A"/>
<path d="M22,69 L52,48 L82,29 L112,15 L138,11" fill="none" stroke="#95D5B2" stroke-width="2" stroke-linejoin="round" opacity="0.9"/>
<circle cx="22" cy="69" r="2.5" fill="#95D5B2"/><circle cx="52" cy="48" r="2.5" fill="#95D5B2"/><circle cx="82" cy="29" r="2.5" fill="#95D5B2"/><circle cx="112" cy="15" r="2.5" fill="#95D5B2"/><circle cx="138" cy="11" r="2.5" fill="#95D5B2"/>
</svg>`,boxplot:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="38" y1="74" x2="38" y2="65" stroke="#7EC8E3" stroke-width="1.2"/><line x1="32" y1="74" x2="44" y2="74" stroke="#7EC8E3" stroke-width="1.2"/>
<rect x="27" y="58" width="22" height="18" fill="rgba(126,200,227,0.15)" stroke="#7EC8E3" stroke-width="1.5" rx="1"/>
<line x1="27" y1="64" x2="49" y2="64" stroke="#7EC8E3" stroke-width="2.5"/>
<line x1="38" y1="40" x2="38" y2="58" stroke="#7EC8E3" stroke-width="1.2"/><line x1="32" y1="40" x2="44" y2="40" stroke="#7EC8E3" stroke-width="1.2"/>
<circle cx="38" cy="34" r="2" fill="none" stroke="#7EC8E3" stroke-width="1.2"/>
<line x1="80" y1="68" x2="80" y2="58" stroke="#F0B27A" stroke-width="1.2"/><line x1="74" y1="68" x2="86" y2="68" stroke="#F0B27A" stroke-width="1.2"/>
<rect x="69" y="38" width="22" height="30" fill="rgba(240,178,122,0.15)" stroke="#F0B27A" stroke-width="1.5" rx="1"/>
<line x1="69" y1="48" x2="91" y2="48" stroke="#F0B27A" stroke-width="2.5"/>
<line x1="80" y1="20" x2="80" y2="38" stroke="#F0B27A" stroke-width="1.2"/><line x1="74" y1="20" x2="86" y2="20" stroke="#F0B27A" stroke-width="1.2"/>
<circle cx="80" cy="14" r="2" fill="none" stroke="#F0B27A" stroke-width="1.2"/>
<line x1="122" y1="58" x2="122" y2="46" stroke="#95D5B2" stroke-width="1.2"/><line x1="116" y1="58" x2="128" y2="58" stroke="#95D5B2" stroke-width="1.2"/>
<rect x="111" y="22" width="22" height="34" fill="rgba(149,213,178,0.15)" stroke="#95D5B2" stroke-width="1.5" rx="1"/>
<line x1="111" y1="36" x2="133" y2="36" stroke="#95D5B2" stroke-width="2.5"/>
<line x1="122" y1="11" x2="122" y2="22" stroke="#95D5B2" stroke-width="1.2"/><line x1="116" y1="11" x2="128" y2="11" stroke="#95D5B2" stroke-width="1.2"/>
</svg>`,violin:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M38,79 C35,73 32,63 35,55 C38,47 41,44 38,38 C35,32 33,27 38,22 C43,27 41,32 38,38 C35,44 38,47 41,55 C44,63 41,73 38,79 Z" fill="#7EC8E3" opacity="0.35"/>
<path d="M38,79 C35,73 32,63 35,55 C38,47 41,44 38,38 C35,32 33,27 38,22 C43,27 41,32 38,38 C35,44 38,47 41,55 C44,63 41,73 38,79 Z" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
<line x1="33" y1="54" x2="43" y2="54" stroke="#7EC8E3" stroke-width="2"/>
<path d="M80,78 C74,71 69,58 72,46 C75,34 82,30 80,21 C78,30 85,34 88,46 C91,58 86,71 80,78 Z" fill="#F0B27A" opacity="0.35"/>
<path d="M80,78 C74,71 69,58 72,46 C75,34 82,30 80,21 C78,30 85,34 88,46 C91,58 86,71 80,78 Z" fill="none" stroke="#F0B27A" stroke-width="1.5"/>
<line x1="73" y1="43" x2="87" y2="43" stroke="#F0B27A" stroke-width="2"/>
<path d="M122,76 C114,67 108,50 112,34 C116,18 124,12 122,9 C120,12 128,18 132,34 C136,50 130,67 122,76 Z" fill="#95D5B2" opacity="0.35"/>
<path d="M122,76 C114,67 108,50 112,34 C116,18 124,12 122,9 C120,12 128,18 132,34 C136,50 130,67 122,76 Z" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
<line x1="113" y1="30" x2="131" y2="30" stroke="#95D5B2" stroke-width="2"/>
</svg>`,histogram:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<rect x="20" y="76" width="11" height="5" fill="#7EC8E3" rx="1" opacity="0.8"/>
<rect x="31" y="68" width="11" height="13" fill="#7EC8E3" rx="1" opacity="0.85"/>
<rect x="42" y="55" width="11" height="26" fill="#7EC8E3" rx="1" opacity="0.9"/>
<rect x="53" y="38" width="11" height="43" fill="#7EC8E3" rx="1" opacity="0.95"/>
<rect x="64" y="22" width="11" height="59" fill="#7EC8E3" rx="1" opacity="1"/>
<rect x="75" y="19" width="11" height="62" fill="#7EC8E3" rx="1" opacity="1"/>
<rect x="86" y="32" width="11" height="49" fill="#7EC8E3" rx="1" opacity="0.95"/>
<rect x="97" y="48" width="11" height="33" fill="#7EC8E3" rx="1" opacity="0.9"/>
<rect x="108" y="64" width="11" height="17" fill="#7EC8E3" rx="1" opacity="0.85"/>
<rect x="119" y="75" width="11" height="6" fill="#7EC8E3" rx="1" opacity="0.8"/>
<path d="M20,77 C30,77 40,60 54,38 C62,24 68,18 80,18 C92,18 98,24 106,38 C120,60 130,77 140,77" fill="none" stroke="#F0B27A" stroke-width="1.5" opacity="0.75"/>
</svg>`,density:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,81 C24,81 32,80 42,64 C48,50 50,40 54,37 C58,40 60,50 66,64 C76,80 84,81 92,81 Z" fill="#7EC8E3" opacity="0.2"/>
<path d="M18,81 C24,81 32,80 42,64 C48,50 50,40 54,37 C58,40 60,50 66,64 C76,80 84,81 92,81" fill="none" stroke="#7EC8E3" stroke-width="2" opacity="0.9"/>
<path d="M32,81 C42,81 52,80 64,58 C70,46 74,34 80,30 C86,34 90,46 96,58 C108,80 118,81 128,81 Z" fill="#F0B27A" opacity="0.18"/>
<path d="M32,81 C42,81 52,80 64,58 C70,46 74,34 80,30 C86,34 90,46 96,58 C108,80 118,81 128,81" fill="none" stroke="#F0B27A" stroke-width="2" opacity="0.9"/>
<path d="M62,81 C72,81 84,80 96,62 C104,48 108,36 114,32 C120,36 124,48 132,62 C144,80 150,81 150,81 Z" fill="#95D5B2" opacity="0.18"/>
<path d="M62,81 C72,81 84,80 96,62 C104,48 108,36 114,32 C120,36 124,48 132,62 C144,80 148,81" fill="none" stroke="#95D5B2" stroke-width="2" opacity="0.9"/>
</svg>`,heatmap:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<rect x="22" y="10" width="22" height="16" fill="#2c5f8a" rx="1.5"/><rect x="45" y="10" width="22" height="16" fill="#3a7dbf" rx="1.5"/><rect x="68" y="10" width="22" height="16" fill="#7EC8E3" rx="1.5"/><rect x="91" y="10" width="22" height="16" fill="#a8dce8" rx="1.5"/><rect x="114" y="10" width="22" height="16" fill="#d4eef7" rx="1.5"/>
<rect x="22" y="28" width="22" height="16" fill="#6b3520" rx="1.5"/><rect x="45" y="28" width="22" height="16" fill="#8b4d2a" rx="1.5"/><rect x="68" y="28" width="22" height="16" fill="#c06b38" rx="1.5"/><rect x="91" y="28" width="22" height="16" fill="#dea06e" rx="1.5"/><rect x="114" y="28" width="22" height="16" fill="#F0B27A" rx="1.5"/>
<rect x="22" y="46" width="22" height="16" fill="#1c5c35" rx="1.5"/><rect x="45" y="46" width="22" height="16" fill="#2e7a4a" rx="1.5"/><rect x="68" y="46" width="22" height="16" fill="#4aab6e" rx="1.5"/><rect x="91" y="46" width="22" height="16" fill="#7dc59a" rx="1.5"/><rect x="114" y="46" width="22" height="16" fill="#95D5B2" rx="1.5"/>
<rect x="22" y="64" width="22" height="16" fill="#4a1a5c" rx="1.5"/><rect x="45" y="64" width="22" height="16" fill="#6b2f80" rx="1.5"/><rect x="68" y="64" width="22" height="16" fill="#9b5ab0" rx="1.5"/><rect x="91" y="64" width="22" height="16" fill="#c291cf" rx="1.5"/><rect x="114" y="64" width="22" height="16" fill="#d9b8e0" rx="1.5"/>
</svg>`,area:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,81 L22,79 L52,71 L82,63 L112,55 L138,48 L138,81 Z" fill="#95D5B2" opacity="0.65"/>
<path d="M18,81 L22,70 L52,55 L82,42 L112,30 L138,22 L138,48 L112,55 L82,63 L52,71 L22,79 Z" fill="#F0B27A" opacity="0.65"/>
<path d="M18,81 L22,60 L52,40 L82,23 L112,12 L138,9 L138,22 L112,30 L82,42 L52,55 L22,70 Z" fill="#7EC8E3" opacity="0.65"/>
<path d="M22,60 L52,40 L82,23 L112,12 L138,9" fill="none" stroke="#7EC8E3" stroke-width="1.5"/>
<path d="M22,70 L52,55 L82,42 L112,30 L138,22" fill="none" stroke="#F0B27A" stroke-width="1.5"/>
<path d="M22,79 L52,71 L82,63 L112,55 L138,48" fill="none" stroke="#95D5B2" stroke-width="1.5"/>
</svg>`,errorbar:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="8" x2="18" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<line x1="18" y1="55" x2="142" y2="55" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="18" y1="30" x2="142" y2="30" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="33" y1="72" x2="33" y2="50" stroke="#7EC8E3" stroke-width="1.5"/><line x1="27" y1="72" x2="39" y2="72" stroke="#7EC8E3" stroke-width="1.5"/><line x1="27" y1="50" x2="39" y2="50" stroke="#7EC8E3" stroke-width="1.5"/>
<circle cx="33" cy="61" r="4.5" fill="#7EC8E3"/>
<line x1="62" y1="64" x2="62" y2="38" stroke="#F0B27A" stroke-width="1.5"/><line x1="56" y1="64" x2="68" y2="64" stroke="#F0B27A" stroke-width="1.5"/><line x1="56" y1="38" x2="68" y2="38" stroke="#F0B27A" stroke-width="1.5"/>
<circle cx="62" cy="51" r="4.5" fill="#F0B27A"/>
<line x1="91" y1="55" x2="91" y2="24" stroke="#95D5B2" stroke-width="1.5"/><line x1="85" y1="55" x2="97" y2="55" stroke="#95D5B2" stroke-width="1.5"/><line x1="85" y1="24" x2="97" y2="24" stroke="#95D5B2" stroke-width="1.5"/>
<circle cx="91" cy="40" r="4.5" fill="#95D5B2"/>
<line x1="120" y1="46" x2="120" y2="17" stroke="#7EC8E3" stroke-width="1.5"/><line x1="114" y1="46" x2="126" y2="46" stroke="#7EC8E3" stroke-width="1.5"/><line x1="114" y1="17" x2="126" y2="17" stroke="#7EC8E3" stroke-width="1.5"/>
<circle cx="120" cy="32" r="4.5" fill="#7EC8E3"/>
<path d="M33,61 L62,51 L91,40 L120,32" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>
</svg>`,lollipop:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="28" y1="8" x2="28" y2="86" stroke="#1e2030" stroke-width="0.8"/>
<line x1="28" y1="57" x2="142" y2="57" stroke="#1e2030" stroke-width="0.35" stroke-dasharray="2,3"/>
<line x1="28" y1="19" x2="128" y2="19" stroke="#7EC8E3" stroke-width="1.5" opacity="0.8"/><circle cx="128" cy="19" r="5.5" fill="#7EC8E3"/>
<line x1="28" y1="34" x2="110" y2="34" stroke="#F0B27A" stroke-width="1.5" opacity="0.8"/><circle cx="110" cy="34" r="5.5" fill="#F0B27A"/>
<line x1="28" y1="49" x2="138" y2="49" stroke="#95D5B2" stroke-width="1.5" opacity="0.8"/><circle cx="138" cy="49" r="5.5" fill="#95D5B2"/>
<line x1="28" y1="64" x2="88" y2="64" stroke="#7EC8E3" stroke-width="1.5" opacity="0.8"/><circle cx="88" cy="64" r="5.5" fill="#7EC8E3"/>
<line x1="28" y1="79" x2="118" y2="79" stroke="#F0B27A" stroke-width="1.5" opacity="0.8"/><circle cx="118" cy="79" r="5.5" fill="#F0B27A"/>
</svg>`,ridgeline:`<svg viewBox="0 0 150 95" xmlns="http://www.w3.org/2000/svg" style="width:100%;display:block">
<rect width="150" height="95" fill="#0f1117"/>
<line x1="18" y1="81" x2="142" y2="81" stroke="#1e2030" stroke-width="0.8"/>
<path d="M18,85 C25,85 32,84 42,76 C48,68 52,62 58,60 C64,62 68,68 74,76 C84,84 92,85 140,85 Z" fill="#1a3550" opacity="0.95"/>
<path d="M18,85 C25,85 32,84 42,76 C48,68 52,62 58,60 C64,62 68,68 74,76 C84,84 92,85 140,85" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.6"/>
<path d="M18,72 C28,72 38,71 50,61 C58,51 62,43 70,40 C78,43 82,51 90,61 C102,71 112,72 140,72 Z" fill="#162a42" opacity="0.95"/>
<path d="M18,72 C28,72 38,71 50,61 C58,51 62,43 70,40 C78,43 82,51 90,61 C102,71 112,72 140,72" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.75"/>
<path d="M18,56 C30,56 44,55 58,43 C66,31 72,21 80,18 C88,21 94,31 102,43 C116,55 130,56 140,56 Z" fill="#122038" opacity="0.95"/>
<path d="M18,56 C30,56 44,55 58,43 C66,31 72,21 80,18 C88,21 94,31 102,43 C116,55 130,56 140,56" fill="none" stroke="#7EC8E3" stroke-width="1.5" opacity="0.88"/>
<path d="M18,40 C32,40 48,39 64,25 C72,13 78,8 86,6 C94,8 100,13 108,25 C124,39 138,40 140,40 Z" fill="#0f1825" opacity="0.95"/>
<path d="M18,40 C32,40 48,39 64,25 C72,13 78,8 86,6 C94,8 100,13 108,25 C124,39 138,40 140,40" fill="none" stroke="#95D5B2" stroke-width="1.8" opacity="1"/>
</svg>`},$t={scatter:{size:3,alpha:.7,jitter:"none",regression:!1,shape:"circle"},bar:{arrangement:"grouped",barWidth:.7,errorBars:!1},line:{lineType:"solid",lineWidth:1.5,showPoints:!0,smooth:!1,fillArea:!1},boxplot:{boxWidth:.6,showOutliers:!0,fillAlpha:.7,notch:!1,showMean:!0,whisker:"iqr"},violin:{bw:.5,fillAlpha:.7,showBoxplot:!0,halfViolin:"full"},histogram:{bins:20,fillAlpha:.8,densityOverlay:!1},density:{bw:1,fillAlpha:.25,showRug:!1},heatmap:{colorScheme:"rdbu",showValues:!0},area:{arrangement:"stacked",fillAlpha:.65,showLines:!0},errorbar:{errorType:"se",capWidth:.2,lineWidth:1.5,dotSize:5},lollipop:{dotSize:8,lineWidth:1.2,sortBy:"none",horizontal:!1},ridgeline:{overlap:.7,fillAlpha:.7,bw:1}};let w={currentChart:"scatter",params:JSON.parse(JSON.stringify($t)),editor:null,copyBtn:null,cleanups:[]};function $(t){t.select(".domain").attr("stroke","#424245"),t.selectAll(".tick line").attr("stroke","#424245"),t.selectAll("text").attr("fill","#a1a1a6").style("font-size","11px")}function W(t){t.select(".domain").remove(),t.selectAll(".tick line").attr("stroke","rgba(255,255,255,0.05)"),t.selectAll("text").remove()}function A(t,e,a,o,i){a?t.append("text").attr("transform","rotate(-90)").attr("x",-i/2).attr("y",-48).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e):t.append("text").attr("x",o/2).attr("y",i+46).attr("fill","#a1a1a6").attr("text-anchor","middle").style("font-size","12px").text(e)}function mt(t){return e=>Math.exp(-.5*(e/t)**2)/(t*Math.sqrt(2*Math.PI))}function bt(t,e,a){return a.map(o=>({x:o,y:ft(t,i=>e(o-i))}))}function T(t,e,a,o){Lt(t).selectAll("*").remove();const i=Lt(t).append("svg").attr("viewBox",`0 0 ${e} ${a}`).attr("preserveAspectRatio","xMidYMid meet").style("width","100%").style("display","block");i.append("rect").attr("width",e).attr("height",a).attr("fill",Et).attr("rx",12);const r=i.append("g").attr("transform",`translate(${o.left},${o.top})`),n=e-o.left-o.right,f=a-o.top-o.bottom;return{svg:i,g:r,iW:n,iH:f}}function _e(t,e){const i={top:25,right:115,bottom:55,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=_().domain([3.8,8.2]).range([0,n]),y=_().domain([.5,8]).range([f,0]);r.append("g").call(E(y).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(b).ticks(6)).call($),r.append("g").call(E(y).ticks(5)).call($),A(r,"Sepal.Length (cm)",!1,n,f),A(r,"Petal.Length (cm)",!0,n,f),e.regression&&Object.entries(vt).forEach(([x,u])=>{const d=zt.filter(C=>C.sp===x),g=ft(d,C=>C.x),v=ft(d,C=>C.y),k=wt(d,C=>(C.x-g)*(C.y-v))/wt(d,C=>(C.x-g)**2),P=v-k*g,j=D(d,C=>C.x)-.1,q=B(d,C=>C.x)+.1;r.append("line").attr("x1",b(j)).attr("y1",y(k*j+P)).attr("x2",b(q)).attr("y2",y(k*q+P)).attr("stroke",u).attr("stroke-width",1.5).attr("stroke-dasharray","6,4").attr("opacity",.7)});const p=z(999),h=e.jitter==="light"?.12:e.jitter==="heavy"?.28:0,m={circle:kt,triangle:Ce,square:ke,cross:we}[e.shape]||kt,s=(e.size+2)**2*6;zt.forEach(x=>{const u=h>0?(p()-.5)*h:0,d=h>0?(p()-.5)*h:0;r.append("path").attr("d",St().type(m).size(s)()).attr("transform",`translate(${b(x.x+u)},${y(x.y+d)})`).attr("fill",vt[x.sp]).attr("opacity",e.alpha).attr("stroke","none")});const l=r.append("g").attr("transform",`translate(${n+12},0)`);Object.entries(vt).forEach(([x,u],d)=>{const g=l.append("g").attr("transform",`translate(0,${d*22})`);g.append("path").attr("d",St().type(m).size(64)()).attr("transform","translate(7,7)").attr("fill",u).attr("opacity",e.alpha),g.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(x)})}function Le(t,e){const i={top:25,right:115,bottom:60,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=$e,y=b.map(m=>m.cat),p=["Week 1","Week 8"],h=R().domain(y).range([0,n]).paddingInner(1-e.barWidth);if(e.arrangement==="grouped"){const m=R().domain(p).range([0,h.bandwidth()]).padding(.08),s=B(b,x=>B(x.values,u=>u.mean+(e.errorBars?u.se:0))),l=_().domain([0,s*1.12]).range([f,0]);r.append("g").call(E(l).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(h)).call($),r.append("g").call(E(l).ticks(5)).call($),A(r,"Mean Value",!0,n,f),b.forEach(x=>{const u=r.append("g").attr("transform",`translate(${h(x.cat)},0)`);x.values.forEach((d,g)=>{if(u.append("rect").attr("x",m(d.grp)).attr("y",l(d.mean)).attr("width",m.bandwidth()).attr("height",f-l(d.mean)).attr("fill",ct[g]).attr("rx",3),e.errorBars){const v=m(d.grp)+m.bandwidth()/2;u.append("line").attr("x1",v).attr("x2",v).attr("y1",l(d.mean+d.se)).attr("y2",l(d.mean-d.se)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7),[-d.se,d.se].forEach(k=>{u.append("line").attr("x1",v-4).attr("x2",v+4).attr("y1",l(d.mean+k)).attr("y2",l(d.mean+k)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.7)})}})})}else if(e.arrangement==="stacked"){const m=b.map(u=>{const d={cat:u.cat};return u.values.forEach(g=>{d[g.grp]=g.mean}),d}),s=pt().keys(p)(m),l=B(s[s.length-1],u=>u[1]),x=_().domain([0,l*1.1]).range([f,0]);r.append("g").call(E(x).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(h)).call($),r.append("g").call(E(x).ticks(5)).call($),A(r,"Total Value",!0,n,f),s.forEach((u,d)=>{r.selectAll(null).data(u).enter().append("rect").attr("x",g=>h(g.data.cat)).attr("y",g=>x(g[1])).attr("width",h.bandwidth()).attr("height",g=>x(g[0])-x(g[1])).attr("fill",ct[d]).attr("rx",d===0?3:0)})}else{const m=b.map(x=>{const u=wt(x.values,g=>g.mean),d={cat:x.cat};return x.values.forEach(g=>{d[g.grp]=g.mean/u*100}),d}),s=pt().keys(p)(m),l=_().domain([0,100]).range([f,0]);r.append("g").call(E(l).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").call(E(l).ticks(5).tickFormat(x=>x+"%")).call($),r.append("g").attr("transform",`translate(0,${f})`).call(M(h)).call($),A(r,"Proportion (%)",!0,n,f),s.forEach((x,u)=>{r.selectAll(null).data(x).enter().append("rect").attr("x",d=>h(d.data.cat)).attr("y",d=>l(d[1])).attr("width",h.bandwidth()).attr("height",d=>l(d[0])-l(d[1])).attr("fill",ct[u]).attr("rx",u===0?3:0)})}const c=r.append("g").attr("transform",`translate(${n+12},0)`);p.forEach((m,s)=>{const l=c.append("g").attr("transform",`translate(0,${s*22})`);l.append("rect").attr("width",12).attr("height",12).attr("fill",ct[s]).attr("rx",2),l.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(m)})}function Me(t,e){const i={top:25,right:110,bottom:55,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=["W0","W1","W2","W3","W4"],y=Pt().domain(b).range([0,n]).padding(.2),p=V.flatMap(l=>l.pts.map(x=>x.val)),h=_().domain([D(p)-8,B(p)+8]).range([f,0]);r.append("g").call(E(h).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(y)).call($),r.append("g").call(E(h).ticks(5)).call($),A(r,"Week",!1,n,f),A(r,"Response",!0,n,f);const c={solid:null,dashed:"8,4",dotted:"3,4"},m=e.smooth?It:fe;V.forEach(l=>{e.fillArea&&r.append("path").datum(l.pts).attr("d",X().x((u,d)=>y(b[d])).y0(f).y1(u=>h(u.val)).curve(m)).attr("fill",l.color).attr("opacity",.12);const x=r.append("path").datum(l.pts).attr("d",Q().x((u,d)=>y(b[d])).y(u=>h(u.val)).curve(m)).attr("fill","none").attr("stroke",l.color).attr("stroke-width",e.lineWidth);c[e.lineType]&&x.attr("stroke-dasharray",c[e.lineType]),e.showPoints&&l.pts.forEach((u,d)=>{r.append("circle").attr("cx",y(b[d])).attr("cy",h(u.val)).attr("r",e.lineWidth+2).attr("fill",l.color).attr("stroke",Et).attr("stroke-width",1.5)})});const s=r.append("g").attr("transform",`translate(${n+12},0)`);V.forEach((l,x)=>{const u=s.append("g").attr("transform",`translate(0,${x*22})`);u.append("line").attr("x1",0).attr("x2",14).attr("y1",7).attr("y2",7).attr("stroke",l.color).attr("stroke-width",e.lineWidth),e.showPoints&&u.append("circle").attr("cx",7).attr("cy",7).attr("r",3).attr("fill",l.color),u.append("text").attr("x",18).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(l.grp)})}function We(t,e){const i={top:25,right:30,bottom:50,left:60},{g:r,iW:n,iH:f}=T(t,540,380,i),b=Tt.map(c=>{const m=[...c.pts].sort((v,k)=>v-k),s=O(m,.25),l=O(m,.5),x=O(m,.75),u=x-s,d=e.whisker==="iqr"?Math.max(D(m),s-1.5*u):D(m),g=e.whisker==="iqr"?Math.min(B(m),x+1.5*u):B(m);return{name:c.name,q1:s,med:l,q3:x,iqr:u,wMin:d,wMax:g,outliers:m.filter(v=>v<d||v>g),mean:ft(m),notchLo:l-1.58*u/Math.sqrt(m.length),notchHi:l+1.58*u/Math.sqrt(m.length)}}),y=b.flatMap(c=>[c.wMin,c.wMax,...e.showOutliers?c.outliers:[]]),p=_().domain([D(y)-5,B(y)+5]).range([f,0]),h=R().domain(Tt.map(c=>c.name)).range([0,n]).padding(1-e.boxWidth);r.append("g").call(E(p).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(h)).call($),r.append("g").call(E(p).ticks(5)).call($),A(r,"Response Value",!0,n,f),b.forEach((c,m)=>{const s=h(c.name),l=h.bandwidth(),x=s+l/2,u=Gt[m];if(r.append("line").attr("x1",x).attr("x2",x).attr("y1",p(c.wMax)).attr("y2",p(c.wMin)).attr("stroke",u).attr("stroke-width",1.5).attr("opacity",.7),[c.wMin,c.wMax].forEach(d=>{r.append("line").attr("x1",x-l*.2).attr("x2",x+l*.2).attr("y1",p(d)).attr("y2",p(d)).attr("stroke",u).attr("stroke-width",1.5)}),e.notch){const d=Math.max(c.q1,c.notchLo),g=Math.min(c.q3,c.notchHi),v=l*.2;r.append("path").attr("d",[`M ${s} ${p(c.q1)}`,`L ${s+l} ${p(c.q1)}`,`L ${s+l} ${p(d)}`,`L ${s+l-v} ${p(c.med)}`,`L ${s+l} ${p(g)}`,`L ${s+l} ${p(c.q3)}`,`L ${s} ${p(c.q3)}`,`L ${s} ${p(g)}`,`L ${s+v} ${p(c.med)}`,`L ${s} ${p(d)}`,"Z"].join(" ")).attr("fill",u).attr("opacity",e.fillAlpha).attr("stroke",u).attr("stroke-width",1.5)}else r.append("rect").attr("x",s).attr("y",p(c.q3)).attr("width",l).attr("height",p(c.q1)-p(c.q3)).attr("fill",u).attr("opacity",e.fillAlpha).attr("stroke",u).attr("stroke-width",1.5).attr("rx",3);if(r.append("line").attr("x1",s).attr("x2",s+l).attr("y1",p(c.med)).attr("y2",p(c.med)).attr("stroke","#fff").attr("stroke-width",2),e.showMean){const g=p(c.mean);r.append("path").attr("d",`M ${x} ${g-5} L ${x+5} ${g} L ${x} ${g+5} L ${x-5} ${g} Z`).attr("fill","#fff").attr("opacity",.9)}e.showOutliers&&c.outliers.forEach(d=>{r.append("circle").attr("cx",x).attr("cy",p(d)).attr("r",3).attr("fill","none").attr("stroke",u).attr("stroke-width",1.5).attr("opacity",.7)})})}function Se(t,e){const i={top:25,right:20,bottom:50,left:60},{g:r,iW:n,iH:f}=T(t,540,380,i),b=ot.flatMap(g=>g.pts),y=D(b)-5,p=B(b)+5,h=ht(y,p,(p-y)/80),c=mt(e.bw*10),m=R().domain(ot.map(g=>g.name)).range([0,n]).padding(.3),s=_().domain([y,p]).range([f,0]),l=m.bandwidth()/2,x=ot.map(g=>bt(g.pts,c,h)),u=B(x,g=>B(g,v=>v.y)),d=_().domain([0,u]).range([0,l*.92]);r.append("g").call(E(s).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(m)).call($),r.append("g").call(E(s).ticks(5)).call($),A(r,"Response Value",!0,n,f),ot.forEach((g,v)=>{const k=m(g.name)+l,P=Gt[v],j=x[v],q=X().x0(C=>k-(e.halfViolin!=="right"?d(C.y):0)).x1(C=>k+(e.halfViolin!=="left"?d(C.y):0)).y(C=>s(C.x)).curve(It);if(r.append("path").datum(j).attr("d",q).attr("fill",P).attr("opacity",e.fillAlpha).attr("stroke",P).attr("stroke-width",1.5),e.showBoxplot){const C=[...g.pts].sort((Kt,Jt)=>Kt-Jt),I=O(C,.25),F=O(C,.5),tt=O(C,.75),Bt=tt-I,Zt=Math.max(D(C),I-1.5*Bt),Ut=Math.min(B(C),tt+1.5*Bt),et=l*.22;r.append("line").attr("x1",k).attr("x2",k).attr("y1",s(Zt)).attr("y2",s(Ut)).attr("stroke","#fff").attr("stroke-width",1.5).attr("opacity",.8),r.append("rect").attr("x",k-et).attr("y",s(tt)).attr("width",et*2).attr("height",s(I)-s(tt)).attr("fill","#111318").attr("stroke","#fff").attr("stroke-width",1.5).attr("rx",2),r.append("line").attr("x1",k-et).attr("x2",k+et).attr("y1",s(F)).attr("y2",s(F)).attr("stroke","#fff").attr("stroke-width",2.5)}})}function De(t,e){const i={top:25,right:30,bottom:55,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=D(it)-2,y=B(it)+2,p=_().domain([b,y]).range([0,n]),h=se().domain([b,y]).thresholds(e.bins)(it),c=B(h,s=>s.length),m=_().domain([0,c*1.12]).range([f,0]);if(r.append("g").call(E(m).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(p).ticks(8)).call($),r.append("g").call(E(m).ticks(5)).call($),A(r,"Value",!1,n,f),A(r,"Count",!0,n,f),r.selectAll(".p7-hbar").data(h).enter().append("rect").attr("class","p7-hbar").attr("x",s=>p(s.x0)+1).attr("y",s=>m(s.length)).attr("width",s=>Math.max(0,p(s.x1)-p(s.x0)-1)).attr("height",s=>f-m(s.length)).attr("fill","#7EC8E3").attr("opacity",e.fillAlpha).attr("rx",2),e.densityOverlay){const s=mt(3.2),l=ht(b,y,(y-b)/100),x=bt(it,s,l),u=B(x,g=>g.y),d=c/u;r.append("path").datum(x).attr("d",Q().x(g=>p(g.x)).y(g=>m(g.y*d)).curve(Y)).attr("fill","none").attr("stroke","#F0B27A").attr("stroke-width",2.5).attr("opacity",.9),r.append("text").attr("x",n-4).attr("y",14).attr("fill","#F0B27A").style("font-size","10px").attr("text-anchor","end").text("密度曲线")}}function ze(t,e){const i={top:25,right:105,bottom:55,left:60},{g:r,iW:n,iH:f}=T(t,540,380,i),b=yt.flatMap(d=>d.pts),y=D(b)-5,p=B(b)+5,h=_().domain([y,p]).range([0,n]),c=mt(e.bw*5),m=ht(y,p,(p-y)/100),s=yt.map(d=>({...d,kde:bt(d.pts,c,m)})),l=B(s,d=>B(d.kde,g=>g.y)),x=_().domain([0,l*1.12]).range([f,0]);r.append("g").call(E(x).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(h).ticks(6)).call($),r.append("g").call(E(x).ticks(4).tickFormat(Ct(".3f"))).call($),A(r,"Value",!1,n,f),A(r,"Density",!0,n,f),s.forEach(d=>{r.append("path").datum(d.kde).attr("d",X().x(g=>h(g.x)).y0(f).y1(g=>x(g.y)).curve(Y)).attr("fill",d.color).attr("opacity",e.fillAlpha),r.append("path").datum(d.kde).attr("d",Q().x(g=>h(g.x)).y(g=>x(g.y)).curve(Y)).attr("fill","none").attr("stroke",d.color).attr("stroke-width",2),e.showRug&&d.pts.forEach(g=>{r.append("line").attr("x1",h(g)).attr("x2",h(g)).attr("y1",f).attr("y2",f-6).attr("stroke",d.color).attr("opacity",.4)})});const u=r.append("g").attr("transform",`translate(${n+12},0)`);yt.forEach((d,g)=>{const v=u.append("g").attr("transform",`translate(0,${g*22})`);v.append("rect").attr("width",12).attr("height",3).attr("y",5).attr("fill",d.color).attr("rx",1),v.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(d.grp)})}function Te(t,e){const i={top:20,right:80,bottom:60,left:70},{g:r,iW:n,iH:f}=T(t,540,380,i),b=nt.map(v=>v.gene),y=nt[0].values.map(v=>v.cond),p=R().domain(y).range([0,n]).padding(.04),h=R().domain(b).range([0,f]).padding(.04),c=nt.flatMap(v=>v.values.map(k=>k.val)),m=B(c.map(Math.abs)),s={rdbu:jt(xe).domain([m,0,-m]),viridis:Mt(ye).domain([-m,m]),plasma:Mt(ve).domain([-m,m])},l=s[e.colorScheme]||s.rdbu;r.append("g").attr("transform",`translate(0,${f})`).call(M(p)).call(v=>{v.select(".domain").attr("stroke","#424245"),v.selectAll(".tick line").remove(),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px")}),r.append("g").call(E(h)).call(v=>{v.select(".domain").attr("stroke","#424245"),v.selectAll(".tick line").remove(),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),nt.forEach(v=>{v.values.forEach(k=>{r.append("rect").attr("x",p(k.cond)).attr("y",h(v.gene)).attr("width",p.bandwidth()).attr("height",h.bandwidth()).attr("fill",l(k.val)).attr("rx",3),e.showValues&&r.append("text").attr("x",p(k.cond)+p.bandwidth()/2).attr("y",h(v.gene)+h.bandwidth()/2+4).attr("text-anchor","middle").attr("fill",Math.abs(k.val)>m*.5?"#fff":"#444").style("font-size","9px").style("font-family","monospace").text(k.val.toFixed(1))})});const x=f,u=14,d=r.append("defs").append("linearGradient").attr("id","p7-hm-grad").attr("x1",0).attr("y1",1).attr("x2",0).attr("y2",0);[0,.25,.5,.75,1].forEach(v=>{d.append("stop").attr("offset",`${v*100}%`).attr("stop-color",l(-m+v*2*m))}),r.append("rect").attr("x",n+20).attr("y",0).attr("width",u).attr("height",x).attr("fill","url(#p7-hm-grad)").attr("rx",3);const g=_().domain([-m,m]).range([x,0]);r.append("g").attr("transform",`translate(${n+20+u},0)`).call(ie(g).ticks(4).tickFormat(Ct(".1f"))).call(v=>{v.select(".domain").remove(),v.selectAll(".tick line").attr("stroke","#424245"),v.selectAll("text").attr("fill","#a1a1a6").style("font-size","9px")})}function Fe(t,e){const i={top:25,right:110,bottom:55,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=["W0","W1","W2","W3","W4"],y=Pt().domain(b).range([0,n]).padding(.2),p=b.map((u,d)=>{const g={w:u};return V.forEach(v=>{g[v.grp]=v.pts[d].val}),g}),h=V.map(u=>u.grp),c=V.map(u=>u.color),m=(u,d)=>X().x((g,v)=>y(b[v])).y0(g=>d(g[0])).y1(g=>d(g[1])).curve(Wt),s=(u,d)=>Q().x((g,v)=>y(b[v])).y(g=>d(g[1])).curve(Wt);let l;if(e.arrangement==="proportional"){const u=pt().keys(h).offset(Ee)(p);l=_().domain([0,1]).range([f,0]),r.append("g").call(E(l).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(y)).call($),r.append("g").call(E(l).ticks(5).tickFormat(Ct(".0%"))).call($),A(r,"Week",!1,n,f),A(r,"Proportion",!0,n,f),u.forEach((d,g)=>{r.append("path").datum(d).attr("d",m(d,l)).attr("fill",c[g]).attr("opacity",e.fillAlpha),e.showLines&&r.append("path").datum(d).attr("d",s(d,l)).attr("fill","none").attr("stroke",c[g]).attr("stroke-width",1.5).attr("opacity",.8)})}else{const u=pt().keys(h)(p),d=B(u[u.length-1],g=>g[1]);l=_().domain([0,d*1.05]).range([f,0]),r.append("g").call(E(l).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(y)).call($),r.append("g").call(E(l).ticks(5)).call($),A(r,"Week",!1,n,f),A(r,"Response",!0,n,f),u.forEach((g,v)=>{r.append("path").datum(g).attr("d",m(g,l)).attr("fill",c[v]).attr("opacity",e.fillAlpha),e.showLines&&r.append("path").datum(g).attr("d",s(g,l)).attr("fill","none").attr("stroke",c[v]).attr("stroke-width",1.5).attr("opacity",.8)})}const x=r.append("g").attr("transform",`translate(${n+12},0)`);V.forEach((u,d)=>{const g=x.append("g").attr("transform",`translate(0,${d*22})`);g.append("rect").attr("width",12).attr("height",12).attr("fill",u.color).attr("opacity",e.fillAlpha).attr("rx",2),g.append("text").attr("x",16).attr("y",11).attr("fill","#a1a1a6").style("font-size","10px").text(u.grp)})}function Re(t,e){const i={top:25,right:30,bottom:65,left:55},{g:r,iW:n,iH:f}=T(t,540,380,i),b=e.errorType==="se"?"se":e.errorType==="sd"?"sd":"ci95",y=B(lt,s=>s.mean+s[b]),p=Math.max(0,D(lt,s=>s.mean-s[b])),h=R().domain(lt.map(s=>s.grp)).range([0,n]).padding(.5),c=_().domain([p*.85,y*1.15]).range([f,0]);r.append("g").call(E(c).ticks(5).tickSize(-n).tickFormat("")).call(W),r.append("g").attr("transform",`translate(0,${f})`).call(M(h)).call($).selectAll("text").attr("transform","rotate(-30)").attr("text-anchor","end").attr("dy","0.4em"),r.append("g").call(E(c).ticks(5)).call($),A(r,"Mean Value",!0,n,f),lt.forEach((s,l)=>{const x=h(s.grp)+h.bandwidth()/2,u=s[b],d=l<3?"#7EC8E3":"#F0B27A",g=e.capWidth*h.bandwidth();r.append("line").attr("x1",x).attr("x2",x).attr("y1",c(s.mean+u)).attr("y2",c(s.mean-u)).attr("stroke",d).attr("stroke-width",e.lineWidth),[-u,u].forEach(v=>{r.append("line").attr("x1",x-g).attr("x2",x+g).attr("y1",c(s.mean+v)).attr("y2",c(s.mean+v)).attr("stroke",d).attr("stroke-width",e.lineWidth)}),r.append("circle").attr("cx",x).attr("cy",c(s.mean)).attr("r",e.dotSize/2).attr("fill",d).attr("stroke",Et).attr("stroke-width",1.5)});const m={se:"Error bars: ±SE",sd:"Error bars: ±SD",ci95:"Error bars: 95% CI"};r.append("text").attr("x",n).attr("y",14).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").text(m[e.errorType])}function He(t,e){const a=e.horizontal?55:100,o=540,i=380,r={top:25,right:30,bottom:a,left:e.horizontal?80:55},{g:n,iW:f,iH:b}=T(t,o,i,r);let y=[...Be];e.sortBy==="asc"&&y.sort((h,c)=>h.val-c.val),e.sortBy==="desc"&&y.sort((h,c)=>c.val-h.val);const p=B(y,h=>Math.abs(h.val))*1.15;if(e.horizontal){const h=R().domain(y.map(s=>s.gene)).range([0,b]).padding(.4),c=_().domain([-p,p]).range([0,f]),m=c(0);n.append("g").call(E(h).ticks(0).tickSize(-f).tickFormat("")).call(W),n.append("g").call(M(c).ticks(5).tickSize(-b).tickFormat("")).call(W),n.append("g").call(E(h)).call(s=>{s.select(".domain").attr("stroke","#424245"),s.selectAll(".tick line").remove(),s.selectAll("text").attr("fill","#a1a1a6").style("font-size","10px").attr("font-style","italic")}),n.append("g").attr("transform",`translate(0,${b})`).call(M(c).ticks(5)).call($),n.append("line").attr("x1",m).attr("x2",m).attr("y1",0).attr("y2",b).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(n,"log2 Fold Change",!1,f,b),y.forEach(s=>{const l=h(s.gene)+h.bandwidth()/2,x=s.val>0?"#F0B27A":"#7EC8E3";n.append("line").attr("x1",m).attr("x2",c(s.val)).attr("y1",l).attr("y2",l).attr("stroke",x).attr("stroke-width",e.lineWidth).attr("opacity",.7),n.append("circle").attr("cx",c(s.val)).attr("cy",l).attr("r",e.dotSize/2).attr("fill",x)})}else{const h=R().domain(y.map(s=>s.gene)).range([0,f]).padding(.4),c=_().domain([-p,p]).range([b,0]),m=c(0);n.append("g").call(E(c).ticks(5).tickSize(-f).tickFormat("")).call(W),n.append("g").attr("transform",`translate(0,${b})`).call(M(h)).call($).selectAll("text").attr("transform","rotate(-35)").attr("text-anchor","end").attr("dy","0.4em").attr("font-style","italic"),n.append("g").call(E(c).ticks(5)).call($),n.append("line").attr("x1",0).attr("x2",f).attr("y1",m).attr("y2",m).attr("stroke","rgba(255,255,255,0.15)").attr("stroke-width",1),A(n,"Gene",!1,f,b),A(n,"log2 FC",!0,f,b),y.forEach(s=>{const l=h(s.gene)+h.bandwidth()/2,x=s.val>0?"#F0B27A":"#7EC8E3";n.append("line").attr("x1",l).attr("x2",l).attr("y1",m).attr("y2",c(s.val)).attr("stroke",x).attr("stroke-width",e.lineWidth).attr("opacity",.7),n.append("circle").attr("cx",l).attr("cy",c(s.val)).attr("r",e.dotSize/2).attr("fill",x)})}}function Pe(t,e){const i={top:30,right:20,bottom:50,left:90},{g:r,iW:n,iH:f}=T(t,540,380,i),b=st.flatMap(v=>v.pts),y=D(b)-5,p=B(b)+5,h=_().domain([y,p]).range([0,n]),c=mt(e.bw*5),m=ht(y,p,(p-y)/100),s=st.length,l=f/(s+.5),x=st.map(v=>bt(v.pts,c,m)),u=B(x,v=>B(v,k=>k.y)),d=l*(1+e.overlap),g=["#7EC8E3","#F0B27A","#95D5B2","#B8B8E8"];r.append("g").attr("transform",`translate(0,${f})`).call(M(h).ticks(6)).call($),A(r,"Value",!1,n,f),st.forEach((v,k)=>{const P=x[k],j=f-k*l,q=g[k%g.length],C=_().domain([0,u]).range([0,-d]),I=r.append("g").attr("transform",`translate(0,${j})`);I.append("path").datum(P).attr("d",X().x(F=>h(F.x)).y0(0).y1(F=>C(F.y)).curve(Y)).attr("fill",q).attr("opacity",e.fillAlpha),I.append("line").attr("x1",0).attr("x2",n).attr("y1",0).attr("y2",0).attr("stroke","rgba(255,255,255,0.1)").attr("stroke-width",1),I.append("path").datum(P).attr("d",Q().x(F=>h(F.x)).y(F=>C(F.y)).curve(Y)).attr("fill","none").attr("stroke",q).attr("stroke-width",2),I.append("text").attr("x",-8).attr("y",0).attr("text-anchor","end").attr("fill","#a1a1a6").style("font-size","10px").attr("dominant-baseline","middle").text(v.tp)})}const Ie={scatter:_e,bar:Le,line:Me,boxplot:We,violin:Se,histogram:De,density:ze,heatmap:Te,area:Fe,errorbar:Re,lollipop:He,ridgeline:Pe},qe={circle:"16",triangle:"17",square:"15",cross:"3"},Ve={solid:'"solid"',dashed:'"dashed"',dotted:'"dotted"'};function je(t){const e=t.jitter!=="none"?`    position = position_jitter(
      width = ${t.jitter==="light"?.1:.25},
      height = ${t.jitter==="light"?.1:.25}
    ),
`:"",a=t.regression?`  geom_smooth(
    aes(group = Species),
    method = "lm", se = TRUE,
    linewidth = 0.8, alpha = 0.15
  ) +
`:"";return`library(ggplot2)

# ── 数据示例（iris 为 R 内置数据集）──
# data(iris)  # 150 行 × 5 列
# str(iris)
# $ Sepal.Length: num  5.1 4.9 4.7 ...
# $ Petal.Length: num  1.4 1.4 1.3 ...
# $ Species     : Factor w/ 3 levels "setosa","versicolor","virginica"

ggplot(iris, aes(
  x     = Sepal.Length,
  y     = Petal.Length,
  color = Species
)) +
  geom_point(
    size  = ${t.size},
    alpha = ${t.alpha},
    shape = ${qe[t.shape]||"16"},
${e}  ) +
${a}  scale_color_manual(values = c(
    setosa     = "#7EC8E3",
    versicolor = "#F0B27A",
    virginica  = "#95D5B2"
  )) +
  labs(
    x     = "Sepal Length (cm)",
    y     = "Petal Length (cm)",
    color = "Species",
    title = "萼片长度 vs 花瓣长度"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position  = "right",
    panel.grid.minor = element_blank()
  )`}function Oe(t){const e={grouped:"position_dodge(0.8)",stacked:"position_stack()",filled:"position_fill()"},a=t.errorBars?`  geom_errorbar(
    aes(ymin = mean - se, ymax = mean + se),
    position = position_dodge(0.8),
    width = 0.2
  ) +
`:"",o=t.arrangement==="filled"?"Proportion":"Mean Value",i={grouped:"分组柱状图",stacked:"堆叠柱状图",filled:"百分比堆叠图"};return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  cat  = rep(c("Control","Trt-A","Trt-B","Trt-C","Trt-D"), each = 2),
  grp  = rep(c("Week 1","Week 8"), times = 5),
  mean = c(32, 55, 28, 62, 41, 78, 35, 48, 29, 71),
  se   = c(3.1, 4.8, 2.9, 5.2, 3.7, 6.1, 3.3, 4.5, 2.8, 5.9)
)

ggplot(data, aes(
  x    = cat,
  y    = mean,
  fill = grp
)) +
  geom_col(
    position = ${e[t.arrangement]},
    width    = ${t.barWidth}
  ) +
${a}  scale_fill_manual(values = c(
    "Week 1" = "#7EC8E3",
    "Week 8" = "#F0B27A"
  )) +
  labs(
    x     = "Treatment",
    y     = "${o}",
    fill  = "Time Point",
    title = "${i[t.arrangement]}"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    legend.position    = "right"
  )`}function Ge(t){const e=t.fillArea?`  geom_area(alpha = 0.12, position = "identity") +
`:"",a=t.showPoints?`  geom_point(size = ${t.lineWidth+1}) +
`:"",o=t.smooth?`  # 平滑插值：geom_smooth(se = FALSE, method = "loess") 可替代 geom_line
`:"";return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  week  = rep(0:4, times = 3),
  value = c(30, 32, 34, 36, 38,    # Control
            30, 39, 48, 57, 66,    # Low Dose
            30, 45, 60, 75, 90),   # High Dose
  group = rep(c("Control","Low Dose","High Dose"), each = 5)
)

ggplot(data, aes(
  x     = week,
  y     = value,
  color = group,
  group = group
)) +
${e}  geom_line(
    linewidth = ${t.lineWidth},
    linetype  = ${Ve[t.lineType]||'"solid"'}
  ) +
${a}${o}  scale_color_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  scale_x_continuous(breaks = 0:4, labels = paste0("W", 0:4)) +
  labs(
    x     = "Week",
    y     = "Response",
    color = "Group",
    title = "治疗响应随时间变化"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.minor = element_blank(),
    legend.position  = "right"
  )`}function Ne(t){const e=t.whisker==="iqr"?`    # 须线默认 1.5×IQR
`:`    coef = 0,     # 须线延伸到最值
`,a=t.notch?`    notch = TRUE,
`:"",o=t.showOutliers?`    outlier.shape = 1, outlier.alpha = 0.5,
`:`    outlier.shape = NA,
`,i=t.showMean?`  stat_summary(
    fun = mean, geom = "point",
    shape = 18, size = 3, color = "white"
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  group = rep(c("Control","Drug A","Drug B"), each = 30),
  value = c(rnorm(30, 25, 5), rnorm(30, 48, 8), rnorm(30, 66, 6))
)

ggplot(data, aes(
  x    = group,
  y    = value,
  fill = group
)) +
  geom_boxplot(
${a}${o}${e}    width     = ${t.boxWidth},
    alpha     = ${t.fillAlpha},
    linewidth = 0.6
  ) +
${i}  scale_fill_manual(values = c(
    "Control" = "#7EC8E3",
    "Drug A"  = "#F0B27A",
    "Drug B"  = "#95D5B2"
  )) +
  labs(
    x     = "Group",
    y     = "Response Value",
    title = "各组响应值分布"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position    = "none",
    panel.grid.major.x = element_blank()
  )`}function Ye(t){const e=t.showBoxplot?`  geom_boxplot(
    width = 0.12, fill = "white",
    outlier.shape = NA, linewidth = 0.6
  ) +
`:"",a=t.halfViolin!=="full"?`  # 半小提琴图可用：ggdist::stat_halfeye(side = "${t.halfViolin}")
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  group = rep(c("Control","Drug A","Drug B"), each = 50),
  value = c(rnorm(50, 25, 5), rnorm(50, 48, 8), rnorm(50, 66, 6))
)

ggplot(data, aes(
  x    = group,
  y    = value,
  fill = group
)) +
  geom_violin(
    bw    = ${t.bw},
    alpha = ${t.fillAlpha},
    trim  = TRUE
  ) +
${e}${a}  scale_fill_manual(values = c(
    "Control" = "#7EC8E3",
    "Drug A"  = "#F0B27A",
    "Drug B"  = "#95D5B2"
  )) +
  labs(
    x     = "Group",
    y     = "Response Value",
    title = "各组响应值分布（小提琴图）"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    legend.position    = "none",
    panel.grid.major.x = element_blank()
  )`}function Ze(t){const e=t.densityOverlay?`  geom_density(
    aes(y = after_stat(count)),
    color = "#F0B27A", linewidth = 1
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value = c(rnorm(120, mean = 30, sd = 8),
            rnorm(80,  mean = 65, sd = 10))
)

ggplot(data, aes(x = value)) +
  geom_histogram(
    bins  = ${t.bins},
    fill  = "#7EC8E3",
    alpha = ${t.fillAlpha},
    color = NA
  ) +
${e}  labs(
    x     = "Value",
    y     = "Count",
    title = "单变量分布直方图"
  ) +
  theme_minimal(base_size = 13) +
  theme(panel.grid.minor = element_blank())`}function Ue(t){const e=t.showRug?`  geom_rug(alpha = 0.3, sides = "b") +
`:"";return`library(ggplot2)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value = c(rnorm(80, 30, 6), rnorm(80, 48, 9), rnorm(80, 62, 7)),
  group = rep(c("Control","Low Dose","High Dose"), each = 80)
)

ggplot(data, aes(
  x     = value,
  fill  = group,
  color = group
)) +
  geom_density(
    bw        = ${t.bw},
    alpha     = ${t.fillAlpha},
    linewidth = 0.8
  ) +
${e}  scale_fill_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  scale_color_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +
  labs(
    x     = "Value",
    y     = "Density",
    title = "各组密度分布对比"
  ) +
  theme_minimal(base_size = 13)`}function Ke(t){const e={rdbu:`scale_fill_gradient2(
    low = "#2166AC", mid = "white", high = "#B2182B",
    midpoint = 0
  )`,viridis:'scale_fill_viridis_c(option = "viridis")',plasma:'scale_fill_viridis_c(option = "plasma")'};return`library(ggplot2)
library(dplyr)
library(tidyr)

# ── 示例数据 ──
mat <- matrix(
  c(-1.2, 0.8, 1.5,-0.3, 0.5,
     0.4,-0.9, 1.1, 2.0,-0.7,
     1.8, 0.3,-1.5, 0.6, 1.2,
    -0.5, 1.4, 0.7,-1.0, 0.9,
     0.2,-0.6, 1.3, 1.7,-0.4,
    -1.0, 0.5, 0.8,-0.2, 1.6),
  nrow = 6, byrow = TRUE,
  dimnames = list(
    c("BRCA1","TP53","MYC","EGFR","VEGF","CDK4"),
    c("Ctrl","Trt-1h","Trt-6h","Trt-24h","Recover")
  )
)

# mat 为基因 × 样本矩阵，转换为长格式
data_long <- mat |>
  as.data.frame() |>
  rownames_to_column("gene") |>
  pivot_longer(-gene, names_to = "condition",
               values_to = "expression")

ggplot(data_long, aes(
  x    = condition,
  y    = gene,
  fill = expression
)) +
  geom_tile(linewidth = 0.3) +
${t.showValues?`  geom_text(
    aes(label = round(expression, 2)),
    size = 2.5, color = "white"
  ) +
`:""}  ${e[t.colorScheme]||e.rdbu} +
  labs(
    x     = "Condition",
    y     = "Gene",
    fill  = "log2 FC",
    title = "基因表达热力图"
  ) +
  theme_minimal(base_size = 11) +
  theme(
    axis.text.x = element_text(angle = 45, hjust = 1),
    panel.grid  = element_blank()
  )`}function Je(t){const e={stacked:"position_stack()",proportional:"position_fill()"},a=t.arrangement==="proportional"?"Proportion":"Response",o=t.arrangement==="proportional"?`
  scale_y_continuous(labels = scales::percent) +`:"",i=t.showLines?`  geom_line(
    aes(group = group),
    position = ${e[t.arrangement]},
    linewidth = 0.8, alpha = 0.8
  ) +
`:"";return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  week  = rep(0:4, times = 3),
  value = c(30, 32, 34, 36, 38,    # Control
            30, 39, 48, 57, 66,    # Low Dose
            30, 45, 60, 75, 90),   # High Dose
  group = rep(c("Control","Low Dose","High Dose"), each = 5)
)

ggplot(data, aes(
  x     = week,
  y     = value,
  fill  = group,
  group = group
)) +
  geom_area(
    position = ${e[t.arrangement]},
    alpha    = ${t.fillAlpha}
  ) +
${i}  scale_fill_manual(values = c(
    "Control"   = "#7EC8E3",
    "Low Dose"  = "#F0B27A",
    "High Dose" = "#95D5B2"
  )) +${o}
  labs(
    x     = "Week",
    y     = "${a}",
    fill  = "Group",
    title = "${t.arrangement==="proportional"?"比例堆叠面积图":"堆叠面积图"}"
  ) +
  theme_minimal(base_size = 13)`}function Xe(t){const e={se:{ymin:"mean - se",ymax:"mean + se",note:"# se = sd / sqrt(n)"},sd:{ymin:"mean - sd",ymax:"mean + sd",note:"# sd = standard deviation"},ci95:{ymin:"mean - ci95",ymax:"mean + ci95",note:"# ci95 = 1.96 * se"}},a=e[t.errorType]||e.se;return`library(ggplot2)

# ── 示例数据 ──
data <- data.frame(
  group = c("Control","Group A","Group B","Group C","Group D","Group E"),
  mean  = c(24.3, 51.7, 38.2, 67.4, 44.8, 82.1),
  se    = c( 2.8,  4.3,  3.1,  5.6,  3.7,  6.2),
  sd    = c( 8.4, 12.9,  9.3, 16.8, 11.1, 18.6),
  ci95  = c( 5.5,  8.4,  6.1, 11.0,  7.3, 12.2)
)

${a.note}
ggplot(data, aes(x = group, y = mean)) +
  geom_errorbar(
    aes(ymin = ${a.ymin},
        ymax = ${a.ymax}),
    width     = ${t.capWidth},
    linewidth = ${t.lineWidth},
    color     = "#7EC8E3"
  ) +
  geom_point(
    size  = ${t.dotSize},
    color = "#7EC8E3"
  ) +
  labs(
    x     = "Group",
    y     = "Mean ± ${t.errorType.toUpperCase()}",
    title = "均值与误差范围"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.x = element_blank(),
    axis.text.x = element_text(angle = 30, hjust = 1)
  )`}function Qe(t){const e=t.sortBy!=="none"?`  dplyr::mutate(gene = reorder(gene, ${t.sortBy==="asc"?"":"-"}log2fc)) |>
`:"",a=t.horizontal?`  coord_flip() +
`:"",o=t.horizontal?"":'angle = 35, hjust = 1, face = "italic"';return`library(ggplot2)
library(dplyr)

# ── 示例数据 ──
data <- data.frame(
  gene   = c("BRCA2","KRAS","PIK3CA","APC","PTEN","RB1","SMAD4","VHL"),
  log2fc = c(2.4, -1.8, 1.1, -2.7, 0.6, -1.3, 1.9, -0.5)
)

data |>
${e}ggplot(aes(x = gene, y = log2fc,
         color = ifelse(log2fc > 0, "up", "down"))) +
  geom_segment(
    aes(xend = gene, yend = 0),
    linewidth = ${t.lineWidth},
    alpha     = 0.7
  ) +
  geom_point(size = ${t.dotSize}) +
${a}  geom_hline(yintercept = 0, linetype = "dashed",
             color = "grey50", linewidth = 0.5) +
  scale_color_manual(values = c(
    "up"   = "#F0B27A",
    "down" = "#7EC8E3"
  ), guide = "none") +
  labs(
    x     = "Gene",
    y     = "log2 Fold Change",
    title = "差异基因 log2FC 棒棒糖图"
  ) +
  theme_minimal(base_size = 13) +
  theme(
    panel.grid.major.${t.horizontal?"y":"x"} = element_blank(),
    axis.text.x = element_text(${o})
  )`}function ta(t){return`library(ggplot2)
library(ggridges)

# ── 示例数据 ──
set.seed(42)
data <- data.frame(
  value     = c(rnorm(50, 30, 5), rnorm(50, 42, 7),
                rnorm(50, 54, 9), rnorm(50, 66, 11)),
  timepoint = factor(
    rep(c("Week 0","Week 4","Week 8","Week 12"), each = 50),
    levels = c("Week 12","Week 8","Week 4","Week 0")
  )
)

ggplot(data, aes(
  x    = value,
  y    = timepoint,
  fill = timepoint
)) +
  geom_density_ridges(
    scale          = ${t.overlap},
    bandwidth      = ${t.bw},
    alpha          = ${t.fillAlpha},
    rel_min_height = 0.01
  ) +
  scale_fill_manual(values = c(
    "Week 0"  = "#7EC8E3",
    "Week 4"  = "#F0B27A",
    "Week 8"  = "#95D5B2",
    "Week 12" = "#B8B8E8"
  )) +
  labs(
    x     = "Value",
    y     = "Time Point",
    title = "随时间变化的分布（山脊图）"
  ) +
  theme_ridges(font_size = 13) +
  theme(legend.position = "none")`}const Nt={scatter:je,bar:Oe,line:Ge,boxplot:Ne,violin:Ye,histogram:Ze,density:Ue,heatmap:Ke,area:Je,errorbar:Xe,lollipop:Qe,ridgeline:ta};function S(t,e){return`<button class="p7-toggle${t?" p7-toggle--on":""}" data-toggle="${e}">
    <span class="p7-tog-track"><span class="p7-tog-thumb"></span></span>
    <span class="p7-tog-lbl">${t?"开启":"关闭"}</span>
  </button>`}function H(t,e,a){return`<div class="p7-opt-row">${t.map(o=>`<button class="p7-opt-btn${o.val===e?" active":""}" data-group="${a}" data-val="${o.val}">${o.label}</button>`).join("")}</div>`}function L(t,e,a,o,i){return`<div class="p7-ctrl-hdr">
    <span class="p7-ctrl-lbl">${{size:"点大小",alpha:"透明度",barWidth:"柱宽",lineWidth:"线宽",boxWidth:"箱宽",fillAlpha:"填充透明度",bw:"带宽",bins:"分箱数",capWidth:"线帽宽度",dotSize:"点大小",overlap:"重叠度"}[t]}</span>
    <span class="p7-ctrl-val" id="p7-val-${t}">${i}</span>
  </div>
  <input class="p7-slider" type="range" data-param="${t}"
    min="${e}" max="${a}" step="${o}" value="${i}">`}function ea(t){return`
    <div class="p7-ctrl-group">${L("size",1,8,1,t.size)}</div>
    <div class="p7-ctrl-group">${L("alpha",.1,1,.1,t.alpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">抖动</span>
      ${H([{val:"none",label:"无"},{val:"light",label:"轻微"},{val:"heavy",label:"明显"}],t.jitter,"jitter")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">回归线</span>
      ${S(t.regression,"regression")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">点形状</span>
      <div class="p7-opt-row">${[{val:"circle",label:"●",title:"圆形"},{val:"triangle",label:"▲",title:"三角"},{val:"square",label:"■",title:"方形"},{val:"cross",label:"✕",title:"十字"}].map(e=>`<button class="p7-shape-btn${e.val===t.shape?" active":""}" data-group="shape" data-val="${e.val}" title="${e.title}">${e.label}</button>`).join("")}</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function aa(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排列方式</span>
      ${H([{val:"grouped",label:"分组"},{val:"stacked",label:"堆叠"},{val:"filled",label:"百分比"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${L("barWidth",.3,.9,.05,t.barWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差线</span>
      ${S(t.errorBars,"errorBars")}
      <div class="p7-ctrl-note">分组模式下可见误差线</div>
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ra(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">线型</span>
      ${H([{val:"solid",label:"实线"},{val:"dashed",label:"虚线"},{val:"dotted",label:"点线"}],t.lineType,"lineType")}
    </div>
    <div class="p7-ctrl-group">${L("lineWidth",.5,3,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据点</span>
      ${S(t.showPoints,"showPoints")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">平滑曲线</span>
      ${S(t.smooth,"smooth")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">面积填充</span>
      ${S(t.fillArea,"fillArea")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function oa(t){return`
    <div class="p7-ctrl-group">${L("boxWidth",.3,.9,.05,t.boxWidth)}</div>
    <div class="p7-ctrl-group">${L("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">须线样式</span>
      ${H([{val:"iqr",label:"1.5×IQR"},{val:"minmax",label:"全范围"}],t.whisker,"whisker")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示异常值</span>
      ${S(t.showOutliers,"showOutliers")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">Notch（槽口置信区间）</span>
      ${S(t.notch,"notch")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示均值（菱形）</span>
      ${S(t.showMean,"showMean")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ia(t){return`
    <div class="p7-ctrl-group">${L("bw",.2,2,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${L("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">嵌套箱线图</span>
      ${S(t.showBoxplot,"showBoxplot")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">展示方向</span>
      ${H([{val:"full",label:"完整"},{val:"left",label:"左半"},{val:"right",label:"右半"}],t.halfViolin,"halfViolin")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function na(t){return`
    <div class="p7-ctrl-group">${L("bins",5,50,1,t.bins)}</div>
    <div class="p7-ctrl-group">${L("fillAlpha",.1,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">叠加密度曲线</span>
      ${S(t.densityOverlay,"densityOverlay")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function la(t){return`
    <div class="p7-ctrl-group">${L("bw",.5,5,.1,t.bw)}</div>
    <div class="p7-ctrl-group">${L("fillAlpha",0,.6,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数据地毯</span>
      ${S(t.showRug,"showRug")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function sa(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">颜色映射方案</span>
      ${H([{val:"rdbu",label:"红蓝"},{val:"viridis",label:"Viridis"},{val:"plasma",label:"Plasma"}],t.colorScheme,"colorScheme")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示数值标签</span>
      ${S(t.showValues,"showValues")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function ca(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">堆叠方式</span>
      ${H([{val:"stacked",label:"绝对堆叠"},{val:"proportional",label:"比例填充"}],t.arrangement,"arrangement")}
    </div>
    <div class="p7-ctrl-group">${L("fillAlpha",.2,.95,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">显示边界线</span>
      ${S(t.showLines,"showLines")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function da(t){return`
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">误差类型</span>
      ${H([{val:"se",label:"SE"},{val:"sd",label:"SD"},{val:"ci95",label:"95% CI"}],t.errorType,"errorType")}
      <div class="p7-ctrl-note">SE：标准误 · SD：标准差 · CI：置信区间</div>
    </div>
    <div class="p7-ctrl-group">${L("capWidth",.1,.5,.05,t.capWidth)}</div>
    <div class="p7-ctrl-group">${L("lineWidth",.5,2.5,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">${L("dotSize",2,10,1,t.dotSize)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function pa(t){return`
    <div class="p7-ctrl-group">${L("dotSize",4,16,1,t.dotSize)}</div>
    <div class="p7-ctrl-group">${L("lineWidth",.5,3,.25,t.lineWidth)}</div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">排序方式</span>
      ${H([{val:"none",label:"原始"},{val:"asc",label:"升序"},{val:"desc",label:"降序"}],t.sortBy,"sortBy")}
    </div>
    <div class="p7-ctrl-group">
      <span class="p7-ctrl-lbl">水平方向</span>
      ${S(t.horizontal,"horizontal")}
    </div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}function fa(t){return`
    <div class="p7-ctrl-group">${L("overlap",.2,1.5,.1,t.overlap)}</div>
    <div class="p7-ctrl-group">${L("fillAlpha",.2,1,.05,t.fillAlpha)}</div>
    <div class="p7-ctrl-group">${L("bw",.5,5,.1,t.bw)}</div>
    <button class="p7-reset-btn" data-reset="true">↺ 重置参数</button>`}const ha={scatter:ea,bar:aa,line:ra,boxplot:oa,violin:ia,histogram:na,density:la,heatmap:sa,area:ca,errorbar:da,lollipop:pa,ridgeline:fa};function Sa(){const t=`<svg class="p7-chevron" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <polyline points="6 9 12 15 18 9"/></svg>`,e=Z.map(o=>`
    <button class="p7-chart-tab${o.id==="scatter"?" active":""}" data-chart="${o.id}">
      ${o.name}
    </button>`).join("");return`
<div class="page-scroll">
<style>
/* ══ p07 作用域样式 ══ */
.p7-hero {
  min-height:100vh; min-height:100dvh;
  background:var(--bg-dark); display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  text-align:center; padding:var(--space-3xl) var(--space-lg);
  position:relative; overflow:hidden;
}
@keyframes p7-glow-a {
  0%,100% { transform:translate(0,0) scale(1); opacity:1; }
  40% { transform:translate(-4%,2%) scale(1.08); opacity:0.7; }
  70% { transform:translate(3%,-3%) scale(0.95); opacity:0.9; }
}
@keyframes p7-glow-b {
  0%,100% { transform:translate(0,0) scale(1); opacity:0.5; }
  50% { transform:translate(6%,4%) scale(1.12); opacity:0.9; }
}
.p7-hero::before {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 55% 45% at 35% 45%, rgba(126,200,227,0.12) 0%, transparent 65%);
  pointer-events:none;
  animation:p7-glow-a 12s ease-in-out infinite;
}
.p7-hero::after {
  content:''; position:absolute; inset:0;
  background:radial-gradient(ellipse 45% 40% at 72% 58%, rgba(184,184,232,0.08) 0%, transparent 60%);
  pointer-events:none;
  animation:p7-glow-b 15s ease-in-out infinite;
}
.p7-eyebrow {
  font-family:var(--font-code); font-size:var(--text-small);
  color:var(--accent); letter-spacing:.15em; text-transform:uppercase;
}
.p7-hero-title {
  font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.5rem);
  font-weight:700; letter-spacing:-.02em; line-height:1.1; color:var(--text-on-dark);
}
.p7-hero-sub { /* styling via global .page-hero-sub */ }
.p7-hero-tagline { /* styling via inline styles */ }
.p7-scroll-hint {
  font-size:var(--text-caption); color:var(--text-on-dark-3);
  animation:p7-float 2s ease-in-out infinite;
  margin-top:var(--space-sm);
}
@keyframes p7-float{0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)}}
.p7-container { max-width:960px; margin:0 auto; }
.p7-container-wide { max-width:1440px; margin:0 auto; }

/* ── Gallery ── */
.p7-gallery-section {
  background:var(--bg-light); color:var(--text-on-light);
  padding:var(--space-xl) var(--space-lg) var(--space-2xl);
}
.p7-sec-hdr { text-align:center; margin-bottom:var(--space-xl); }
.p7-sec-title {
  font-family:var(--font-display); font-size:clamp(1.75rem,4vw,3rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-sec-sub {
  font-size:1.05rem; line-height:1.7; max-width:600px;
  margin:var(--space-sm) auto 0; opacity:.65;
}
.p7-chart-grid {
  display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md);
}
.p7-chart-card {
  background:var(--bg-light-elevated); border:1.5px solid var(--border-light);
  border-radius:var(--radius-md); overflow:hidden; cursor:pointer;
  transition:opacity 0.5s ease, transform 0.5s ease, border-color .3s var(--ease-apple), box-shadow .3s var(--ease-apple);
  display:flex; flex-direction:column;
  opacity:0; transform:translateY(20px);
}
.p7-chart-card.p7-card-vis { opacity:1; transform:translateY(0); }
.p7-chart-card.p7-card-vis:hover {
  border-color:var(--accent); transform:translateY(-4px); box-shadow:var(--shadow-hover);
}
.p7-chart-card.active {
  border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow);
}
.p7-thumb-wrap { overflow:hidden; line-height:0; }
.p7-card-info { padding:14px 14px 8px; flex:1; }
.p7-card-name {
  font-family:var(--font-display); font-size:1.1rem; font-weight:700;
  color:var(--text-on-light);
}
.p7-card-en {
  font-size:.75rem; color:var(--text-on-light-3); margin-top:1px;
  font-family:var(--font-code); letter-spacing:.05em;
}
.p7-card-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:8px; }
.p7-tag {
  padding:2px 10px; background:var(--bg-light-alt);
  border:1px solid var(--border-light); border-radius:var(--radius-full);
  font-size:.72rem; color:var(--text-on-light-2);
}
.p7-chart-card.active .p7-tag {
  border-color:rgba(126,200,227,.3); color:var(--accent);
  background:rgba(126,200,227,.06);
}
.p7-card-desc {
  font-size:.8rem; line-height:1.5; color:var(--text-on-light-2); margin-top:8px;
}
.p7-card-cta {
  padding:8px 14px 12px; font-size:.78rem; color:var(--accent); font-weight:500;
}
.p7-chart-card:hover .p7-card-cta,
.p7-chart-card.active .p7-card-cta { color:var(--accent-hover); }

/* ── Workshop ── */
.p7-workshop-section {
  background:var(--bg-dark); color:var(--text-on-dark);
  padding:var(--space-3xl) var(--space-lg) var(--space-2xl);
}
.p7-ws-head {
  display:flex; align-items:flex-start; justify-content:space-between;
  gap:var(--space-md); flex-wrap:wrap; margin-bottom:var(--space-lg);
}
.p7-ws-title {
  font-family:var(--font-display); font-size:clamp(1.5rem,3vw,2.25rem);
  font-weight:700; letter-spacing:-.02em;
}
.p7-chart-tabs { display:flex; gap:6px; flex-wrap:wrap; align-self:flex-end; }
.p7-chart-tab {
  padding:10px 20px; background:var(--bg-dark-elevated);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-2); font-size:.9rem; cursor:pointer;
  transition:all var(--t-fast); min-height:44px; white-space:nowrap;
}
.p7-chart-tab:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-chart-tab.active {
  background:var(--accent); border-color:var(--accent);
  color:#1d1d1f; font-weight:600;
}
/* 3-panel grid */
.p7-ws-layout {
  display:grid; grid-template-columns:280px 1fr 360px;
  gap:var(--space-md); align-items:start;
}
.p7-panel {
  background:var(--bg-dark-elevated); border:1px solid var(--border-dark);
  border-radius:var(--radius-md); overflow:hidden;
}
.p7-panel-hdr {
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 16px; border-bottom:1px solid var(--border-dark);
  font-size:.9rem; font-weight:600; color:var(--text-on-dark); user-select:none;
}
.p7-panel-body { padding:16px; }
.p7-chevron { transition:transform var(--t-fast); flex-shrink:0; color:var(--text-on-dark-3); }
.p7-panel.collapsed .p7-chevron { transform:rotate(-90deg); }

/* Params */
.p7-ctrl-group { margin-bottom:20px; }
.p7-ctrl-group:last-of-type { margin-bottom:12px; }
.p7-ctrl-hdr { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
.p7-ctrl-lbl { font-size:.85rem; color:var(--text-on-dark-2); display:block; margin-bottom:8px; }
.p7-ctrl-hdr .p7-ctrl-lbl { margin-bottom:0; }
.p7-ctrl-val { font-family:var(--font-code); font-size:.82rem; color:var(--accent); min-width:32px; text-align:right; }
.p7-slider {
  -webkit-appearance:none; appearance:none; width:100%; height:6px;
  border-radius:var(--radius-full); background:var(--border-dark); outline:none; cursor:pointer;
}
.p7-slider::-webkit-slider-thumb {
  -webkit-appearance:none; width:20px; height:20px; border-radius:50%;
  background:var(--accent); cursor:pointer; box-shadow:0 0 8px rgba(126,200,227,.4);
}
.p7-slider::-moz-range-thumb {
  width:20px; height:20px; border-radius:50%;
  background:var(--accent); border:none; cursor:pointer;
}
.p7-opt-row { display:flex; gap:4px; flex-wrap:wrap; }
.p7-opt-btn {
  padding:7px 14px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-full);
  color:var(--text-on-dark-3); font-size:.82rem; cursor:pointer;
  transition:all var(--t-fast); min-height:36px;
}
.p7-opt-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-opt-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-shape-btn {
  width:38px; height:38px; background:var(--bg-dark);
  border:1.5px solid var(--border-dark); border-radius:var(--radius-sm);
  color:var(--text-on-dark-2); cursor:pointer; transition:all var(--t-fast);
  display:flex; align-items:center; justify-content:center; font-size:1rem;
}
.p7-shape-btn:hover { border-color:var(--accent); color:var(--text-on-dark); }
.p7-shape-btn.active { background:rgba(126,200,227,.12); border-color:var(--accent); color:var(--accent); }
.p7-toggle {
  display:inline-flex; align-items:center; gap:10px; cursor:pointer;
  background:none; border:none; padding:0; color:var(--text-on-dark-2);
  font-size:.85rem; min-height:36px;
}
.p7-tog-track {
  width:40px; height:22px; background:var(--border-dark);
  border-radius:11px; position:relative; transition:background var(--t-fast); flex-shrink:0;
}
.p7-tog-thumb {
  width:16px; height:16px; border-radius:50%; background:#666;
  position:absolute; top:3px; left:3px; transition:all var(--t-fast);
}
.p7-toggle.p7-toggle--on .p7-tog-track { background:rgba(126,200,227,.3); }
.p7-toggle.p7-toggle--on .p7-tog-thumb { background:var(--accent); left:21px; }
.p7-toggle.p7-toggle--on .p7-tog-lbl { color:var(--accent); }
.p7-ctrl-note { font-size:.75rem; color:var(--text-on-dark-3); margin-top:6px; }
.p7-reset-btn {
  width:100%; padding:10px; background:transparent;
  border:1px solid var(--border-dark); border-radius:var(--radius-md);
  color:var(--text-on-dark-3); cursor:pointer; font-size:.85rem;
  transition:all var(--t-fast); margin-top:4px; min-height:44px;
}
.p7-reset-btn:hover { border-color:var(--accent); color:var(--accent); }
/* Preview */
.p7-preview-panel .p7-panel-body { padding:12px; display:flex; flex-direction:column; gap:8px; }
#p7-d3-container { width:100%; }
.p7-preview-info {
  font-family:var(--font-code); font-size:.72rem;
  color:var(--text-on-dark-3); text-align:center; padding:4px 0;
}
/* Code panel */
.p7-code-panel .p7-panel-body { padding:0; display:flex; flex-direction:column; }
.p7-code-actions {
  display:flex; align-items:center; gap:8px;
  padding:10px 12px; border-top:1px solid var(--border-dark); flex-wrap:wrap;
}
.p7-export-btn {
  padding:9px 18px; background:transparent;
  border:1.5px solid var(--accent); border-radius:var(--radius-full);
  color:var(--accent); font-size:.85rem; cursor:pointer;
  transition:all var(--t-fast); min-height:40px;
}
.p7-export-btn:hover { background:var(--accent-subtle); }
.p7-export-btn:active { transform:scale(.97); }
/* footer uses global .page-footer-cta */

/* ── Tablet ── */
@media (max-width:1024px) {
  .p7-ws-layout {
    grid-template-columns:240px 1fr;
    grid-template-areas:'params preview' 'code code';
  }
  .p7-code-panel { grid-area:code; }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); }
}

/* ── Mobile tab bar (hidden on desktop) ── */
.p7-mobile-tabs {
  display:none; border-radius:var(--radius-md) var(--radius-md) 0 0;
  overflow:hidden; border:1px solid var(--border-dark); border-bottom:none;
}
.p7-mob-tab {
  flex:1; padding:13px 4px; background:var(--bg-dark-elevated);
  border:none; border-right:1px solid var(--border-dark);
  color:var(--text-on-dark-3); font-size:.78rem; cursor:pointer;
  min-height:48px; transition:background .2s,color .2s;
  font-weight:500; line-height:1.3; white-space:nowrap;
}
.p7-mob-tab:last-child { border-right:none; }
.p7-mob-tab.active { background:var(--accent); color:#0a0a0a; font-weight:700; }

/* ── Mobile ── */
@media (max-width:768px) {
  /* Gallery & workshop sections */
  .p7-gallery-section,.p7-workshop-section { padding:var(--space-lg) var(--space-sm); }
  .p7-chart-grid { grid-template-columns:repeat(2,1fr); gap:12px; }
  .p7-card-desc { display:none; }

  /* Workshop head */
  .p7-ws-head { flex-direction:column; gap:var(--space-sm); }
  .p7-chart-tabs { overflow-x:auto; scrollbar-width:none; width:100%; }
  .p7-chart-tabs::-webkit-scrollbar { display:none; }
  .p7-chart-tab { padding:8px 14px; font-size:.8rem; min-height:40px; }

  /* Show mobile tab bar */
  .p7-mobile-tabs { display:flex; }

  /* Workshop: single-panel tab view */
  .p7-ws-layout { display:block; }
  .p7-panel { display:none; border-radius:0 0 var(--radius-md) var(--radius-md); border:1px solid var(--border-dark); border-top:none; }
  .p7-panel.mob-active { display:flex; flex-direction:column; }
  .p7-panel-hdr { display:none; } /* replaced by mobile tab bar */

  /* Params panel: scrollable, compact */
  #p7-params-body { max-height:62vh; overflow-y:auto; padding:14px; }
  .p7-ctrl-group { margin-bottom:16px; }
  .p7-opt-row { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
  .p7-opt-btn { padding:9px 4px; font-size:.8rem; min-height:40px; }
  .p7-shape-btn { padding:9px 4px; font-size:1rem; min-height:40px; }
  /* Shape buttons: 4 in a row */
  .p7-ctrl-group .p7-opt-row:has(.p7-shape-btn) { grid-template-columns:repeat(4,1fr); }
  .p7-slider::-webkit-slider-thumb { width:24px; height:24px; }
  .p7-slider::-moz-range-thumb { width:24px; height:24px; }
  .p7-slider { min-height:32px; }

  /* Preview panel */
  #p7-preview-body { padding:10px; }

  /* Code panel: limited height + scroll */
  #p7-code-body { display:flex; flex-direction:column; max-height:65vh; }
  #p7-code-editor { flex:1; min-height:0; overflow:auto; max-height:50vh; }
  .p7-code-actions { padding:10px 12px; flex-shrink:0; }

  /* footer nav uses global .page-footer-nav */
}
@media (max-width:480px) {
  .p7-chart-grid { gap:10px; }
}
@media (max-width:400px) {
  .p7-chart-grid { grid-template-columns:1fr; }
}
</style>

<!-- Hero -->
<section class="p7-hero section-dark section-hero-full" id="p7-hero">
  <div class="flex-col-center" style="gap:var(--space-md);text-align:center;position:relative;z-index:1;">
    <p class="hero-eyebrow p7-eyebrow" id="p7-hero-eyebrow" style="opacity:0;">Module 01 / Page 07</p>
    <h1 class="page-hero-title p7-hero-title" style="color:var(--text-on-dark);opacity:0;">ggplot2<br>图表工作坊</h1>
    <p class="page-hero-sub p7-hero-sub" style="opacity:0;">ggplot2 Chart Workshop</p>
    <p class="p7-hero-tagline" style="font-family:var(--font-body);font-size:var(--text-body);color:var(--text-on-dark-2);max-width:540px;line-height:1.8;opacity:0;">12 种常用图表 · 参数实时调节 · R 代码即时生成 · 一键导出脚本</p>
    <div class="hero-quicknav" id="p7-hero-nav" style="opacity:0;">
      <button class="hero-quicknav__item" data-target="#p7-gallery">图表类型库</button>
      <button class="hero-quicknav__item" data-target="#p7-workshop">交互工作坊</button>
    </div>
    <div class="p7-scroll-hint">↓ 向下探索</div>
  </div>
</section>

<!-- Gallery -->
<section class="p7-gallery-section" id="p7-gallery">
  <div class="p7-container">
    <div class="p7-sec-hdr" id="p7-gallery-hdr">
      <div class="p7-eyebrow" style="color:var(--text-on-light-2)">图表类型</div>
      <h2 class="p7-sec-title">12 种核心图表</h2>
      <p class="p7-sec-sub">点击任意图表卡片进入工作坊，实时调节参数并同步生成 R 代码。</p>
    </div>
    <div class="p7-chart-grid" id="p7-chart-grid">${Z.map(o=>`
    <div class="p7-chart-card" data-chart="${o.id}" id="p7-card-${o.id}"
         role="button" tabindex="0" aria-label="打开 ${o.name} 工作坊">
      <div class="p7-thumb-wrap">${Ae[o.id]||""}</div>
      <div class="p7-card-info">
        <div class="p7-card-name">${o.name}</div>
        <div class="p7-card-en">${o.en}</div>
        <div class="p7-card-tags">${o.tags.map(i=>`<span class="p7-tag">${i}</span>`).join("")}</div>
        <div class="p7-card-desc">${o.desc}</div>
      </div>
      <div class="p7-card-cta">打开工作坊 →</div>
    </div>`).join("")}</div>
  </div>
</section>

<!-- Workshop -->
<section class="p7-workshop-section" id="p7-workshop">
  <div class="p7-container-wide">
    <div class="p7-ws-head">
      <div>
        <div class="p7-eyebrow">交互工作坊</div>
        <h2 class="p7-ws-title" id="p7-ws-title">散点图</h2>
      </div>
      <div class="p7-chart-tabs" id="p7-chart-tabs">${e}</div>
    </div>
    <!-- 移动端三栏切换 Tab -->
    <div class="p7-mobile-tabs" id="p7-mobile-tabs">
      <button class="p7-mob-tab" data-panel="params">⚙ 参数控制</button>
      <button class="p7-mob-tab active" data-panel="preview">📊 实时预览</button>
      <button class="p7-mob-tab" data-panel="code">{ } R 代码</button>
    </div>
    <div class="p7-ws-layout" id="p7-ws-layout">

      <!-- 左：参数 -->
      <div class="p7-panel p7-params-panel" id="p7-params-panel">
        <div class="p7-panel-hdr" id="p7-params-hdr">
          <span>⚙ 参数控制</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-params-body"></div>
      </div>

      <!-- 中：预览 -->
      <div class="p7-panel p7-preview-panel" id="p7-preview-panel">
        <div class="p7-panel-hdr" id="p7-preview-hdr">
          <span>📊 实时预览</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-preview-body">
          <div id="p7-d3-container"></div>
          <div class="p7-preview-info" id="p7-preview-info">Iris 数据集 · 60 个观测点 · 3 物种</div>
        </div>
      </div>

      <!-- 右：代码 -->
      <div class="p7-panel p7-code-panel" id="p7-code-panel">
        <div class="p7-panel-hdr" id="p7-code-hdr">
          <span>{ } R 代码</span>${t}
        </div>
        <div class="p7-panel-body" id="p7-code-body">
          <div id="p7-code-editor"></div>
          <div class="p7-code-actions">
            <button class="p7-export-btn" id="p7-export-btn">↓ 导出脚本</button>
            <div id="p7-copy-wrap"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Footer CTA -->
<section class="page-footer-cta" id="p7-footer">
  <p class="page-footer-num">07 / 10</p>
  <h2 class="page-footer-quote" id="p7-footer-inner">掌握参数，让图表更出色</h2>
  <p class="page-footer-desc">第 8 页深入 R 配色方案与出版级图表调整——主题定制器、期刊规格导出、patchwork 多面板布局。</p>
  <div class="page-footer-nav">
    <button class="btn-ghost" id="p7-btn-prev">← 图层语法</button>
    <button class="btn-primary" id="p7-btn-next">R 配色方案 →</button>
  </div>
</section>
</div>`}function dt(t){if(!Z.find(o=>o.id===t))return;w.currentChart=t,document.querySelectorAll(".p7-chart-tab").forEach(o=>o.classList.toggle("active",o.dataset.chart===t)),document.querySelectorAll(".p7-chart-card").forEach(o=>o.classList.toggle("active",o.dataset.chart===t));const e=document.getElementById("p7-ws-title"),a=Z.find(o=>o.id===t);e&&a&&(e.textContent=a.name),Yt(),U(),ut(),ga()}function Yt(){const t=document.getElementById("p7-params-body");if(t&&(t.innerHTML=ha[w.currentChart](w.params[w.currentChart]),window.innerWidth<=768)){const e=t.closest(".p7-panel");e&&e.classList.contains("collapsed")&&(t.classList.add("p7-collapsed"),t.classList.remove("p7-expanded"))}}function U(){const t=document.getElementById("p7-d3-container");t&&Ie[w.currentChart](t,w.params[w.currentChart])}function ut(){if(!w.editor)return;const t=Nt[w.currentChart](w.params[w.currentChart]);w.editor.setCode(t)}function ga(){const t=document.getElementById("p7-preview-info");if(!t)return;const e=Z.find(a=>a.id===w.currentChart);e&&(t.textContent=e.info)}function Ft(t,e){w.params[w.currentChart][t]=e,U(),ut()}function ma(){w.params[w.currentChart]=JSON.parse(JSON.stringify($t[w.currentChart])),Yt(),U(),ut()}function ba(){if(window.innerWidth>768)return;[{hdrId:"p7-params-hdr",bodyId:"p7-params-body",expanded:!1},{hdrId:"p7-preview-hdr",bodyId:"p7-preview-body",expanded:!0},{hdrId:"p7-code-hdr",bodyId:"p7-code-body",expanded:!1}].forEach(e=>{const a=document.getElementById(e.bodyId);if(!a)return;e.expanded?a.classList.add("p7-expanded"):(a.classList.add("p7-collapsed"),a.closest(".p7-panel")?.classList.add("collapsed"));const o=document.getElementById(e.hdrId);if(!o)return;const i=()=>{a.classList.contains("p7-expanded")?(a.classList.replace("p7-expanded","p7-collapsed"),o.closest(".p7-panel")?.classList.add("collapsed")):(a.classList.replace("p7-collapsed","p7-expanded"),o.closest(".p7-panel")?.classList.remove("collapsed"))};o.addEventListener("click",i),w.cleanups.push(()=>o.removeEventListener("click",i))})}function ua(){const t=at.timeline({delay:.2});t.to("#p7-hero-eyebrow",{opacity:1,y:0,duration:.7,ease:"power3.out"},0),t.fromTo(".p7-hero-title",{y:30},{opacity:1,y:0,duration:.9,ease:"power3.out"},.15),t.fromTo(".p7-hero-sub",{y:20},{opacity:.5,y:0,duration:.8,ease:"power3.out"},.3),t.fromTo(".p7-hero-tagline",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.45),t.fromTo("#p7-hero-nav",{y:20},{opacity:1,y:0,duration:.8,ease:"power3.out"},.6),at.from("#p7-gallery-hdr",{scrollTrigger:{trigger:"#p7-gallery",start:"top 85%"},opacity:0,y:50,duration:.8,ease:"power3.out"}),at.from("#p7-ws-layout",{scrollTrigger:{trigger:"#p7-workshop",start:"top 80%"},opacity:0,y:30,duration:.8,ease:"power3.out"}),at.from("#p7-footer-inner",{scrollTrigger:{trigger:"#p7-footer",start:"top 85%"},opacity:0,y:40,duration:.8,ease:"power3.out"})}function Da(){const t=document.querySelectorAll(".p7-chart-card");if(t.length){const b=new IntersectionObserver(y=>{y.forEach(p=>{p.isIntersecting&&(p.target.classList.add("p7-card-vis"),b.unobserve(p.target))})},{threshold:.05,rootMargin:"0px 0px -10px 0px"});t.forEach(y=>b.observe(y)),w.cleanups.push(()=>b.disconnect())}const e=document.getElementById("p7-mobile-tabs");if(e){const b={params:"p7-params-panel",preview:"p7-preview-panel",code:"p7-code-panel"},y=h=>{e.querySelectorAll(".p7-mob-tab").forEach(c=>c.classList.toggle("active",c.dataset.panel===h)),Object.entries(b).forEach(([c,m])=>document.getElementById(m)?.classList.toggle("mob-active",c===h)),h==="preview"&&U()};window.innerWidth<=768&&y("preview");const p=h=>{const c=h.target.closest("[data-panel]");c&&(h.preventDefault(),y(c.dataset.panel))};e.addEventListener("click",p),w.cleanups.push(()=>e.removeEventListener("click",p))}const a=document.getElementById("p7-code-editor");a&&(w.editor=Qt(a,{code:Nt.scatter(w.params.scatter),language:"r"}));const o=document.getElementById("p7-copy-wrap");o&&(w.copyBtn=te(o,{getText:()=>w.editor?w.editor.getCode():"",label:"复制代码",successLabel:"已复制"})),dt("scatter");const i=document.getElementById("p7-chart-grid");if(i){const b=p=>{const h=p.target.closest("[data-chart]");h&&(dt(h.dataset.chart),document.getElementById("p7-workshop")?.scrollIntoView({behavior:"smooth",block:"start"}))},y=p=>{if(p.key==="Enter"||p.key===" "){const h=p.target.closest("[data-chart]");h&&(p.preventDefault(),dt(h.dataset.chart))}};i.addEventListener("click",b),i.addEventListener("keydown",y),w.cleanups.push(()=>{i.removeEventListener("click",b),i.removeEventListener("keydown",y)})}const r=document.getElementById("p7-chart-tabs");if(r){const b=y=>{const p=y.target.closest("[data-chart]");p&&dt(p.dataset.chart)};r.addEventListener("click",b),w.cleanups.push(()=>r.removeEventListener("click",b))}const n=document.getElementById("p7-params-body");if(n){const b=p=>{if(p.target.dataset.param){const h=p.target.dataset.param,c=parseFloat(p.target.value),m=document.getElementById(`p7-val-${h}`);m&&(m.textContent=c),Ft(h,c)}},y=p=>{const h=p.target.closest("[data-group][data-val]");if(h){const m=h.dataset.group,s=h.dataset.val;n.querySelectorAll(`[data-group="${m}"]`).forEach(l=>l.classList.remove("active")),h.classList.add("active"),Ft(m,s);return}const c=p.target.closest("[data-toggle]");if(c){const m=c.dataset.toggle,s=!w.params[w.currentChart][m];w.params[w.currentChart][m]=s,c.classList.toggle("p7-toggle--on",s);const l=c.querySelector(".p7-tog-lbl");l&&(l.textContent=s?"开启":"关闭"),U(),ut();return}p.target.closest("[data-reset]")&&ma()};n.addEventListener("input",b),n.addEventListener("click",y),w.cleanups.push(()=>{n.removeEventListener("input",b),n.removeEventListener("click",y)})}const f=document.getElementById("p7-export-btn");if(f){const b=()=>{const y=w.editor?w.editor.getCode():"",p=new Blob([y],{type:"text/plain"}),h=URL.createObjectURL(p),c=document.createElement("a");c.href=h,c.download=`${w.currentChart}_plot.R`,document.body.appendChild(c),c.click(),c.remove(),URL.revokeObjectURL(h)};f.addEventListener("click",b),w.cleanups.push(()=>f.removeEventListener("click",b))}document.querySelectorAll("#p7-hero-nav .hero-quicknav__item").forEach(b=>{b.addEventListener("click",()=>{document.querySelector(b.dataset.target)?.scrollIntoView({behavior:"smooth",block:"start"})})}),document.getElementById("p7-btn-prev")?.addEventListener("click",()=>At("m1-p6")),document.getElementById("p7-btn-next")?.addEventListener("click",()=>At("m1-p8")),ba(),ua()}function za(){Xt(),w.editor&&(w.editor.destroy(),w.editor=null),w.copyBtn&&(w.copyBtn.destroy(),w.copyBtn=null),w.cleanups.forEach(t=>t()),w.cleanups=[],w.currentChart="scatter",w.params=JSON.parse(JSON.stringify($t))}export{za as destroy,Da as init,Sa as render};
