import{a5 as s,u as i,s as p,e as c,a9 as u,h as l,B as n,a as d}from"./entry.aed5c389.js";import{u as f}from"./asyncData.b26abd3c.js";import y from"./Ellipsis.7cac1da4.js";import g from"./ComponentPlaygroundData.7b6f14c5.js";/* empty css                                *//* empty css                     */import"./TabsHeader.52d17845.js";/* empty css                       */import"./ComponentPlaygroundProps.3449523d.js";import"./ProseH4.539db3cb.js";/* empty css                    */import"./ProseCodeInline.f45611cc.js";/* empty css                            */import"./Badge.3c7a164c.js";import"./ContentSlot.bce67b46.js";/* empty css                  */import"./ProseP.aacaeda5.js";/* empty css                   */import"./index.e27fb498.js";/* empty css                                     */import"./ComponentPlaygroundSlots.vue.20291ec1.js";import"./ComponentPlaygroundTokens.vue.fa90330e.js";/* empty css                                    */async function h(o){s();const t=i(o);{const{data:e}=await f(`nuxt-component-meta${t?`-${t}`:""}`,()=>$fetch(`/api/component-meta${t?`/${t}`:""}`));return p(()=>e.value)}}const _=c({props:{component:{type:String,required:!0},props:{type:Object,required:!1,default:()=>({})}},async setup(o){const t=p(()=>u(o.component)),e=l({...o.props}),r=await h(o.component);return{as:t,formProps:e,componentData:r}},render(o){const t=Object.entries(this.$slots).reduce((e,[r,a])=>{if(r.startsWith("component-")){const m=r.replace("component-","");e[m]=a}return e},{});return n("div",{class:"component-playground"},[n("div",{class:"component-playground-wrapper"},[n(y,{class:"component-playground-ellipsis",blur:"5vw",height:"100%",width:"100%"}),n(o.as,{...o.formProps,class:"component-playground-component"},{...t})]),n(g,{modelValue:o.formProps,componentData:o.componentData,"onUpdate:modelValue":e=>o.formProps=e})])}}),F=d(_,[["__scopeId","data-v-5e699dca"]]);export{F as default};
