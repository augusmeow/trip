import{e as r,A as l,s as u,B as n,l as p,C as m,a as f}from"./entry.aed5c389.js";import d from"./ContentSlot.bce67b46.js";/* empty css                 */const _={primary:"heroicons-outline:check",info:"heroicons-outline:information-circle",success:"heroicons-outline:check-circle",warning:"heroicons-outline:exclamation",danger:"heroicons-outline:exclamation-circle"},y=r({props:{icon:{type:String,default:null},type:{type:String,default:"primary",validator:e=>["primary","info","success","warning","danger"].includes(e)}},setup(e){const s=l(),{flatUnwrap:t,unwrap:a}=m(),i=u(()=>e.icon||_[e.type]);return()=>{const c=t((s.default&&s.default())??[],["ul"]).map(o=>a(o,["li"]));return n("ul",c.map(o=>n("li",[n("span",{class:`list-icon ${e.type}`},n(p,{name:i.value,class:"icon"})),n("span",n(d,{use:()=>o}))])))}}}),x=f(y,[["__scopeId","data-v-59c8e529"]]);export{x as default};
