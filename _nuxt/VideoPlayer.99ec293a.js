import{_ as m}from"./NuxtImg.vue.79f128a0.js";import{e as f,s as i,h as _,o as s,b as c,u as e,c as h,q as u,M as k,U as v,k as b,p as w,m as g,i as x,a as B}from"./entry.aed5c389.js";/* empty css                        */const I=t=>(w("data-v-f3fbc6d4"),t=t(),g(),t),S={key:1,class:"loaded"},C=["poster"],V=["src"],$=["src","type"],N=["autoplay","src"],q=I(()=>x("button",null,null,-1)),E=[q],P=f({__name:"VideoPlayer",props:{poster:{type:String,default:""},src:{type:String,default:""},sources:{type:Array,default:()=>[]},autoplay:{type:Boolean,default:!1}},setup(t){const r=t,a=i(()=>{if(r.src&&r.src.includes("youtube.com/watch")){const o=r.src.match(/\?v=([^&]*)/);return{name:"youtube",src:`https://www.youtube-nocookie.com/embed/${(o==null?void 0:o[1])||""}?autoplay=1`,poster:r.poster||`https://i3.ytimg.com/vi/${(o==null?void 0:o[1])||""}/hqdefault.jpg`}}}),p=_(!1);if(!r.src&&!r.sources.length)throw new Error("VideoPlayer: you need to provide either `src` or `sources` props");const d=i(()=>{var o,l;return r.src||((l=(o=r.sources)==null?void 0:o[0])==null?void 0:l.src)||!1});return(o,l)=>{const y=m;return s(),c("div",{class:b(["video-player",{loaded:e(p)}])},[(e(a)?e(a).poster:t.poster)?(s(),h(y,{key:0,src:e(a)?e(a).poster:t.poster},null,8,["src"])):u("",!0),e(p)?(s(),c("div",S,[e(a)?e(a).name==="youtube"?(s(),c("iframe",{key:1,allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"true",autoplay:t.autoplay,src:e(a).src},null,8,N)):u("",!0):(s(),c("video",{key:0,poster:t.poster,controls:"",autoplay:""},[e(d)?(s(),c("source",{key:0,src:e(d)},null,8,V)):u("",!0),(s(!0),c(k,null,v(t.sources,n=>(s(),c("source",{key:n.src||n,src:n.src||n,type:n.type},null,8,$))),128))],8,C))])):u("",!0),e(p)?u("",!0):(s(),c("div",{key:2,class:"play-button",onClick:l[0]||(l[0]=n=>p.value=!0)},E))],2)}}}),F=B(P,[["__scopeId","data-v-f3fbc6d4"]]);export{F as default};
