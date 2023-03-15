import{ak as j,aE as N,aF as $,aG as I,aH as W,aI as x,aJ as T,aK as B,ai as b,a0 as _,ao as J,aL as H,a5 as q,$ as G}from"./entry.aed5c389.js";const Z=()=>{const r=new Map;return{name:"memory",options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function F(r){return!r||typeof r.then!="function"?Promise.resolve(r):r}function g(r,...t){try{return F(r(...t))}catch(n){return Promise.reject(n)}}function k(r){const t=typeof r;return r===null||t!=="object"&&t!=="function"}function Q(r){const t=Object.getPrototypeOf(r);return!t||t.isPrototypeOf(Object)}function M(r){if(k(r))return String(r);if(Q(r)||Array.isArray(r))return JSON.stringify(r);if(typeof r.toJSON=="function")return M(r.toJSON());throw new Error("[unstorage] Cannot stringify value!")}function z(){if(typeof Buffer===void 0)throw new TypeError("[unstorage] Buffer is not supported!")}const K="base64:";function V(r){if(typeof r=="string")return r;z();const t=Buffer.from(r).toString("base64");return K+t}function X(r){return typeof r!="string"||!r.startsWith(K)?r:(z(),Buffer.from(r.slice(K.length),"base64"))}const ee=["hasItem","getItem","setItem","removeItem","getMeta","setMeta","removeMeta","getKeys","clear","mount","unmount"];function te(r,t){if(t=v(t),!t)return r;const n={...r};for(const a of ee)n[a]=(s="",...c)=>r[a](t+s,...c);return n.getKeys=(a="",...s)=>r.getKeys(t+a,...s).then(c=>c.map(u=>u.slice(t.length))),n}function p(r){return r?r.split("?")[0].replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""):""}function v(r){return r=p(r),r?r+":":""}const re=()=>{const r=new Map;return{name:"memory",options:{},hasItem(t){return r.has(t)},getItem(t){return r.get(t)||null},getItemRaw(t){return r.get(t)||null},setItem(t,n){r.set(t,n)},setItemRaw(t,n){r.set(t,n)},removeItem(t){r.delete(t)},getKeys(){return Array.from(r.keys())},clear(){r.clear()},dispose(){r.clear()}}};function ne(r={}){const t={mounts:{"":r.driver||re()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},n=e=>{for(const i of t.mountpoints)if(e.startsWith(i))return{base:i,relativeKey:e.slice(i.length),driver:t.mounts[i]};return{base:"",relativeKey:e,driver:t.mounts[""]}},a=(e,i)=>t.mountpoints.filter(o=>o.startsWith(e)||i&&e.startsWith(o)).map(o=>({relativeBase:e.length>o.length?e.slice(o.length):void 0,mountpoint:o,driver:t.mounts[o]})),s=(e,i)=>{if(t.watching){i=p(i);for(const o of t.watchListeners)o(e,i)}},c=async()=>{if(!t.watching){t.watching=!0;for(const e in t.mounts)t.unwatch[e]=await P(t.mounts[e],s,e)}},u=async()=>{if(t.watching){for(const e in t.unwatch)await t.unwatch[e]();t.unwatch={},t.watching=!1}},h={hasItem(e,i={}){e=p(e);const{relativeKey:o,driver:l}=n(e);return g(l.hasItem,o,i)},getItem(e,i={}){e=p(e);const{relativeKey:o,driver:l}=n(e);return g(l.getItem,o,i).then(m=>j(m))},getItemRaw(e,i={}){e=p(e);const{relativeKey:o,driver:l}=n(e);return l.getItemRaw?g(l.getItemRaw,o,i):g(l.getItem,o,i).then(m=>X(m))},async setItem(e,i,o={}){if(i===void 0)return h.removeItem(e);e=p(e);const{relativeKey:l,driver:m}=n(e);m.setItem&&(await g(m.setItem,l,M(i),o),m.watch||s("update",e))},async setItemRaw(e,i,o={}){if(i===void 0)return h.removeItem(e,o);e=p(e);const{relativeKey:l,driver:m}=n(e);if(m.setItemRaw)await g(m.setItemRaw,l,i,o);else if(m.setItem)await g(m.setItem,l,V(i),o);else return;m.watch||s("update",e)},async removeItem(e,i={}){typeof i=="boolean"&&(i={removeMata:i}),e=p(e);const{relativeKey:o,driver:l}=n(e);l.removeItem&&(await g(l.removeItem,o,i),i.removeMata&&await g(l.removeItem,o+"$",i),l.watch||s("remove",e))},async getMeta(e,i={}){typeof i=="boolean"&&(i={nativeOnly:i}),e=p(e);const{relativeKey:o,driver:l}=n(e),m=Object.create(null);if(l.getMeta&&Object.assign(m,await g(l.getMeta,o,i)),!i.nativeOnly){const f=await g(l.getItem,o+"$",i).then(w=>j(w));f&&typeof f=="object"&&(typeof f.atime=="string"&&(f.atime=new Date(f.atime)),typeof f.mtime=="string"&&(f.mtime=new Date(f.mtime)),Object.assign(m,f))}return m},setMeta(e,i,o={}){return this.setItem(e+"$",i,o)},removeMeta(e,i={}){return this.removeItem(e+"$",i)},async getKeys(e,i={}){e=v(e);const o=a(e,!0);let l=[];const m=[];for(const f of o){const E=(await g(f.driver.getKeys,f.relativeBase,i)).map(d=>f.mountpoint+p(d)).filter(d=>!l.some(y=>d.startsWith(y)));m.push(...E),l=[f.mountpoint,...l.filter(d=>!d.startsWith(f.mountpoint))]}return e?m.filter(f=>f.startsWith(e)&&!f.endsWith("$")):m.filter(f=>!f.endsWith("$"))},async clear(e,i={}){e=v(e),await Promise.all(a(e,!1).map(async o=>{if(o.driver.clear)return g(o.driver.clear,o.relativeBase,i);if(o.driver.removeItem){const l=await o.driver.getKeys(o.relativeBase,i);return Promise.all(l.map(m=>o.driver.removeItem(m)))}}))},async dispose(){await Promise.all(Object.values(t.mounts).map(e=>R(e)))},async watch(e){return await c(),t.watchListeners.push(e),async()=>{t.watchListeners=t.watchListeners.filter(i=>i!==e),t.watchListeners.length===0&&await u()}},async unwatch(){t.watchListeners=[],await u()},mount(e,i){if(e=v(e),e&&t.mounts[e])throw new Error(`already mounted at ${e}`);return e&&(t.mountpoints.push(e),t.mountpoints.sort((o,l)=>l.length-o.length)),t.mounts[e]=i,t.watching&&Promise.resolve(P(i,s,e)).then(o=>{t.unwatch[e]=o}).catch(console.error),h},async unmount(e,i=!0){e=v(e),!(!e||!t.mounts[e])&&(t.watching&&e in t.unwatch&&(t.unwatch[e](),delete t.unwatch[e]),i&&await R(t.mounts[e]),t.mountpoints=t.mountpoints.filter(o=>o!==e),delete t.mounts[e])},getMount(e=""){e=p(e)+":";const i=n(e);return{driver:i.driver,base:i.base}},getMounts(e="",i={}){return e=p(e),a(e,i.parents).map(l=>({driver:l.driver,base:l.mountpoint}))}};return h}function P(r,t,n){return r.watch?r.watch((a,s)=>t(a,n+s)):()=>{}}async function R(r){typeof r.dispose=="function"&&await g(r.dispose)}function ae(r={}){const t=ie(n,r.operators);function n(a,s){return typeof s!="object"||s instanceof RegExp?t.$eq(a,s):Object.keys(s||{}).every(c=>{const u=s[c];if(c.startsWith("$")&&t[c]){const h=t[c];return typeof h=="function"?h(a,u):!1}return n(N(a,c),u)})}return n}function ie(r,t={}){return{$match:(n,a)=>r(n,a),$eq:(n,a)=>a instanceof RegExp?a.test(n):n===a,$ne:(n,a)=>a instanceof RegExp?!a.test(n):n!==a,$not:(n,a)=>!r(n,a),$and:(n,a)=>($(a,"$and requires an array as condition"),a.every(s=>r(n,s))),$or:(n,a)=>($(a,"$or requires an array as condition"),a.some(s=>r(n,s))),$in:(n,a)=>I(a).some(s=>Array.isArray(n)?r(n,{$contains:s}):r(n,s)),$contains:(n,a)=>(n=Array.isArray(n)?n:String(n),I(a).every(s=>n.includes(s))),$icontains:(n,a)=>{if(typeof a!="string")throw new TypeError("$icontains requires a string, use $contains instead");return n=String(n).toLocaleLowerCase(),I(a).every(s=>n.includes(s.toLocaleLowerCase()))},$containsAny:(n,a)=>($(a,"$containsAny requires an array as condition"),n=Array.isArray(n)?n:String(n),a.some(s=>n.includes(s))),$exists:(n,a)=>a?typeof n<"u":typeof n>"u",$type:(n,a)=>typeof n===String(a),$regex:(n,a)=>{if(!(a instanceof RegExp)){const s=String(a).match(/\/(.*)\/([dgimsuy]*)$/);a=s?new RegExp(s[1],s[2]||""):new RegExp(a)}return a.test(String(n||""))},$lt:(n,a)=>n<a,$lte:(n,a)=>n<=a,$gt:(n,a)=>n>a,$gte:(n,a)=>n>=a,...t||{}}}function C(r){const t=ae(),n=(s,{query:c,before:u,after:h})=>{const e=typeof c=="string"?{_path:c}:c,i=s.findIndex(l=>t(l,e));u=u??1,h=h??1;const o=new Array(u+h).fill(null,0);return i===-1?o:o.map((l,m)=>s[i-u+m+Number(m>=u)]||null)},a=[(s,c)=>s.filter(u=>I(c.where).every(h=>t(u,h))),(s,c)=>I(c.sort).forEach(u=>W(s,u)),(s,c)=>c.surround?n(s,c.surround):s,(s,c)=>c.skip?s.slice(c.skip):s,(s,c)=>c.limit?s.slice(0,c.limit):s,(s,c)=>x(T(c.without))(s),(s,c)=>x(B(c.only))(s)];return async s=>{const c=await r(),u=s.params(),h=a.reduce((e,i)=>i(e,u)||e,c);return u.first?h[0]:h}}var se=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},L={},oe={get exports(){return L},set exports(r){L=r}};(function(r,t){(function(n,a,s){r.exports=s(),r.exports.default=s()})("slugify",se,function(){var n=JSON.parse(`{"$":"dollar","%":"percent","&":"and","<":"less",">":"greater","|":"or","¢":"cent","£":"pound","¤":"currency","¥":"yen","©":"(c)","ª":"a","®":"(r)","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Æ":"AE","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","Þ":"TH","ß":"ss","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","æ":"ae","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","þ":"th","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"DJ","đ":"dj","Ē":"E","ē":"e","Ė":"E","ė":"e","Ę":"e","ę":"e","Ě":"E","ě":"e","Ğ":"G","ğ":"g","Ģ":"G","ģ":"g","Ĩ":"I","ĩ":"i","Ī":"i","ī":"i","Į":"I","į":"i","İ":"I","ı":"i","Ķ":"k","ķ":"k","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ő":"O","ő":"o","Œ":"OE","œ":"oe","Ŕ":"R","ŕ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"u","ū":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","Ə":"E","ƒ":"f","Ơ":"O","ơ":"o","Ư":"U","ư":"u","ǈ":"LJ","ǉ":"lj","ǋ":"NJ","ǌ":"nj","Ș":"S","ș":"s","Ț":"T","ț":"t","ə":"e","˚":"o","Ά":"A","Έ":"E","Ή":"H","Ί":"I","Ό":"O","Ύ":"Y","Ώ":"W","ΐ":"i","Α":"A","Β":"B","Γ":"G","Δ":"D","Ε":"E","Ζ":"Z","Η":"H","Θ":"8","Ι":"I","Κ":"K","Λ":"L","Μ":"M","Ν":"N","Ξ":"3","Ο":"O","Π":"P","Ρ":"R","Σ":"S","Τ":"T","Υ":"Y","Φ":"F","Χ":"X","Ψ":"PS","Ω":"W","Ϊ":"I","Ϋ":"Y","ά":"a","έ":"e","ή":"h","ί":"i","ΰ":"y","α":"a","β":"b","γ":"g","δ":"d","ε":"e","ζ":"z","η":"h","θ":"8","ι":"i","κ":"k","λ":"l","μ":"m","ν":"n","ξ":"3","ο":"o","π":"p","ρ":"r","ς":"s","σ":"s","τ":"t","υ":"y","φ":"f","χ":"x","ψ":"ps","ω":"w","ϊ":"i","ϋ":"y","ό":"o","ύ":"y","ώ":"w","Ё":"Yo","Ђ":"DJ","Є":"Ye","І":"I","Ї":"Yi","Ј":"J","Љ":"LJ","Њ":"NJ","Ћ":"C","Џ":"DZ","А":"A","Б":"B","В":"V","Г":"G","Д":"D","Е":"E","Ж":"Zh","З":"Z","И":"I","Й":"J","К":"K","Л":"L","М":"M","Н":"N","О":"O","П":"P","Р":"R","С":"S","Т":"T","У":"U","Ф":"F","Х":"H","Ц":"C","Ч":"Ch","Ш":"Sh","Щ":"Sh","Ъ":"U","Ы":"Y","Ь":"","Э":"E","Ю":"Yu","Я":"Ya","а":"a","б":"b","в":"v","г":"g","д":"d","е":"e","ж":"zh","з":"z","и":"i","й":"j","к":"k","л":"l","м":"m","н":"n","о":"o","п":"p","р":"r","с":"s","т":"t","у":"u","ф":"f","х":"h","ц":"c","ч":"ch","ш":"sh","щ":"sh","ъ":"u","ы":"y","ь":"","э":"e","ю":"yu","я":"ya","ё":"yo","ђ":"dj","є":"ye","і":"i","ї":"yi","ј":"j","љ":"lj","њ":"nj","ћ":"c","ѝ":"u","џ":"dz","Ґ":"G","ґ":"g","Ғ":"GH","ғ":"gh","Қ":"KH","қ":"kh","Ң":"NG","ң":"ng","Ү":"UE","ү":"ue","Ұ":"U","ұ":"u","Һ":"H","һ":"h","Ә":"AE","ә":"ae","Ө":"OE","ө":"oe","Ա":"A","Բ":"B","Գ":"G","Դ":"D","Ե":"E","Զ":"Z","Է":"E'","Ը":"Y'","Թ":"T'","Ժ":"JH","Ի":"I","Լ":"L","Խ":"X","Ծ":"C'","Կ":"K","Հ":"H","Ձ":"D'","Ղ":"GH","Ճ":"TW","Մ":"M","Յ":"Y","Ն":"N","Շ":"SH","Չ":"CH","Պ":"P","Ջ":"J","Ռ":"R'","Ս":"S","Վ":"V","Տ":"T","Ր":"R","Ց":"C","Փ":"P'","Ք":"Q'","Օ":"O''","Ֆ":"F","և":"EV","ء":"a","آ":"aa","أ":"a","ؤ":"u","إ":"i","ئ":"e","ا":"a","ب":"b","ة":"h","ت":"t","ث":"th","ج":"j","ح":"h","خ":"kh","د":"d","ذ":"th","ر":"r","ز":"z","س":"s","ش":"sh","ص":"s","ض":"dh","ط":"t","ظ":"z","ع":"a","غ":"gh","ف":"f","ق":"q","ك":"k","ل":"l","م":"m","ن":"n","ه":"h","و":"w","ى":"a","ي":"y","ً":"an","ٌ":"on","ٍ":"en","َ":"a","ُ":"u","ِ":"e","ْ":"","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","پ":"p","چ":"ch","ژ":"zh","ک":"k","گ":"g","ی":"y","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","฿":"baht","ა":"a","ბ":"b","გ":"g","დ":"d","ე":"e","ვ":"v","ზ":"z","თ":"t","ი":"i","კ":"k","ლ":"l","მ":"m","ნ":"n","ო":"o","პ":"p","ჟ":"zh","რ":"r","ს":"s","ტ":"t","უ":"u","ფ":"f","ქ":"k","ღ":"gh","ყ":"q","შ":"sh","ჩ":"ch","ც":"ts","ძ":"dz","წ":"ts","ჭ":"ch","ხ":"kh","ჯ":"j","ჰ":"h","Ṣ":"S","ṣ":"s","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","ẞ":"SS","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","–":"-","‘":"'","’":"'","“":"\\"","”":"\\"","„":"\\"","†":"+","•":"*","…":"...","₠":"ecu","₢":"cruzeiro","₣":"french franc","₤":"lira","₥":"mill","₦":"naira","₧":"peseta","₨":"rupee","₩":"won","₪":"new shequel","₫":"dong","€":"euro","₭":"kip","₮":"tugrik","₯":"drachma","₰":"penny","₱":"peso","₲":"guarani","₳":"austral","₴":"hryvnia","₵":"cedi","₸":"kazakhstani tenge","₹":"indian rupee","₺":"turkish lira","₽":"russian ruble","₿":"bitcoin","℠":"sm","™":"tm","∂":"d","∆":"delta","∑":"sum","∞":"infinity","♥":"love","元":"yuan","円":"yen","﷼":"rial","ﻵ":"laa","ﻷ":"laa","ﻹ":"lai","ﻻ":"la"}`),a=JSON.parse('{"bg":{"Й":"Y","Ц":"Ts","Щ":"Sht","Ъ":"A","Ь":"Y","й":"y","ц":"ts","щ":"sht","ъ":"a","ь":"y"},"de":{"Ä":"AE","ä":"ae","Ö":"OE","ö":"oe","Ü":"UE","ü":"ue","ß":"ss","%":"prozent","&":"und","|":"oder","∑":"summe","∞":"unendlich","♥":"liebe"},"es":{"%":"por ciento","&":"y","<":"menor que",">":"mayor que","|":"o","¢":"centavos","£":"libras","¤":"moneda","₣":"francos","∑":"suma","∞":"infinito","♥":"amor"},"fr":{"%":"pourcent","&":"et","<":"plus petit",">":"plus grand","|":"ou","¢":"centime","£":"livre","¤":"devise","₣":"franc","∑":"somme","∞":"infini","♥":"amour"},"pt":{"%":"porcento","&":"e","<":"menor",">":"maior","|":"ou","¢":"centavo","∑":"soma","£":"libra","∞":"infinito","♥":"amor"},"uk":{"И":"Y","и":"y","Й":"Y","й":"y","Ц":"Ts","ц":"ts","Х":"Kh","х":"kh","Щ":"Shch","щ":"shch","Г":"H","г":"h"},"vi":{"Đ":"D","đ":"d"},"da":{"Ø":"OE","ø":"oe","Å":"AA","å":"aa","%":"procent","&":"og","|":"eller","$":"dollar","<":"mindre end",">":"større end"},"nb":{"&":"og","Å":"AA","Æ":"AE","Ø":"OE","å":"aa","æ":"ae","ø":"oe"},"it":{"&":"e"},"nl":{"&":"en"},"sv":{"&":"och","Å":"AA","Ä":"AE","Ö":"OE","å":"aa","ä":"ae","ö":"oe"}}');function s(c,u){if(typeof c!="string")throw new Error("slugify: string argument expected");u=typeof u=="string"?{replacement:u}:u||{};var h=a[u.locale]||{},e=u.replacement===void 0?"-":u.replacement,i=u.trim===void 0?!0:u.trim,o=c.normalize().split("").reduce(function(l,m){var f=h[m]||n[m]||m;return f===e&&(f=" "),l+f.replace(u.remove||/[^\w\s$*_+~.()'"!\-:@]+/g,"")},"");return u.strict&&(o=o.replace(/[^A-Za-z0-9\s]/g,"")),i&&(o=o.trim()),o=o.replace(/\s+/g,e),u.lower&&(o=o.toLowerCase()),o}return s.extend=function(c){Object.assign(n,c)},s})})(oe);const ce=r=>r.split(/[\s-]/g).map(b).join(" ");function ue(r,t){const{navigation:n}=_().content,a=c=>({...fe(["title",...n.fields])(c),...me(c==null?void 0:c.navigation)?c.navigation:{}}),s=r.sort((c,u)=>c._path.localeCompare(u._path)).reduce((c,u)=>{const h=u._path.substring(1).split("/"),e=u._id.split(":").slice(1),i=!!e[e.length-1].match(/([1-9][0-9]*\.)?index.md/g),o=f=>({title:f.title,_path:f._path,_file:f._file,children:[],...a(f),...f._draft?{_draft:!0}:{}}),l=o(u);if(i){const f=t[l._path];if(typeof(f==null?void 0:f.navigation)<"u"&&!(f!=null&&f.navigation))return c;if(u._path!=="/"){const w=o(u);l.children.push(w)}Object.assign(l,a(f))}return h.length===1?(c.push(l),c):(h.slice(0,-1).reduce((f,w,E)=>{const d="/"+h.slice(0,E+1).join("/"),y=t[d];if(typeof(y==null?void 0:y.navigation)<"u"&&!y.navigation)return[];let A=f.find(Y=>Y._path===d);return A||(A={title:ce(w),_path:d,_file:u._file,children:[],...a(y)},f.push(A)),A.children},c).push(l),c)},[]);return D(s)}const le=new Intl.Collator(void 0,{numeric:!0,sensitivity:"base"});function D(r){var n;const t=r.sort((a,s)=>le.compare(a._file,s._file));for(const a of t)(n=a.children)!=null&&n.length?D(a.children):delete a.children,delete a._file;return r}function fe(r){return t=>(t=t||{},r&&r.length?r.filter(n=>typeof t[n]<"u").reduce((n,a)=>Object.assign(n,{[a]:t[a]}),{}):t)}function me(r){return Object.prototype.toString.call(r)==="[object Object]"}const he=r=>G(r,_().public.content.api.baseURL),ge=te(ne({driver:Z()}),"@content"),U=()=>J("previewToken").value;function pe(r){async function t(){const n=new Set(await r.getKeys("cache:")),a=U();if(a){const c=await r.getItem(`${a}$`).then(e=>e||{});if(Array.isArray(c.ignoreSources)){const e=c.ignoreSources.map(i=>`cache:${i.trim()}:`);for(const i of n)e.some(o=>i.startsWith(o))&&n.delete(i)}const u=await r.getKeys(`${a}:`),h=await Promise.all(u.map(e=>r.getItem(e)));for(const e of h)n.delete(`cache:${e._id}`),e.__deleted||n.add(`${a}:${e._id}`)}return await Promise.all(Array.from(n).map(c=>r.getItem(c)))}return{storage:r,fetch:C(t),query:n=>H(C(t),n)}}let S=null,O=null;async function de(){return O?await O:S||(O=ye(),S=await O),S}async function ye(){const r=q(),{content:t}=_().public,n=pe(ge),a=await n.storage.getItem("integrity");if(t.integrity!==+(a||0)){const{contents:s,navigation:c}=await $fetch(he(t.integrity?`cache.${t.integrity}.json`:"cache.json"));await Promise.all(s.map(u=>n.storage.setItem(`cache:${u._id}`,u))),await n.storage.setItem("navigation",c),await n.storage.setItem("integrity",t.integrity)}return await r.callHook("content:storage",n.storage),n}async function ve(r){const t=await de();if(!U()&&Object.keys(r||{}).length===0)return t.storage.getItem("navigation");const n=await t.query(r).where({_partial:!1,navigation:{$ne:!1}}).find(),s=(await t.query().where({_path:/\/_dir$/i,_partial:!0}).find()).reduce((c,u)=>{var e;((e=u.title)==null?void 0:e.toLowerCase())==="dir"&&(u.title=void 0);const h=u._path.split("/").slice(0,-1).join("/")||"/";return c[h]={...u,...u.body},c},{});return ue(n,s)}export{ge as contentStorage,pe as createDB,ve as generateNavigation,U as getPreview,de as useContentDatabase};
