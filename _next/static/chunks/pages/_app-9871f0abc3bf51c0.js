(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[636],{8424:(e,t,r)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(472)}])},5157:(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),r(2063),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6397:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return _}});let n=r(7677),l=r(4848),o=n._(r(6540)),u=r(6847),a=r(7785),s=r(2772),c=r(1278),f=r(6185),i=r(7644),d=r(6334),p=r(5157),h=r(296),b=r(1903),y=new Set;function v(e,t,r,n){if((0,a.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let l=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(l))return;y.add(l)}e.prefetch(t,r,n).catch(e=>{})}}function m(e){return"string"==typeof e?e:(0,s.formatUrl)(e)}let _=o.default.forwardRef(function(e,t){let r,n;let{href:s,as:y,children:_,prefetch:j=null,passHref:g,replace:x,shallow:M,scroll:P,locale:O,onClick:N,onMouseEnter:C,onTouchStart:k,legacyBehavior:E=!1,...w}=e;r=_,E&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let R=o.default.useContext(i.RouterContext),L=!1!==j,{href:I,as:S}=o.default.useMemo(()=>{if(!R){let e=m(s);return{href:e,as:y?m(y):e}}let[e,t]=(0,u.resolveHref)(R,s,!0);return{href:e,as:y?(0,u.resolveHref)(R,y):t||e}},[R,s,y]),T=o.default.useRef(I),U=o.default.useRef(S);E&&(n=o.default.Children.only(r));let A=E?n&&"object"==typeof n&&n.ref:t,[D,H,K]=(0,d.useIntersection)({rootMargin:"200px"}),F=o.default.useCallback(e=>{(U.current!==S||T.current!==I)&&(K(),U.current=S,T.current=I),D(e)},[S,I,K,D]),G=(0,b.useMergedRef)(F,A);o.default.useEffect(()=>{R&&H&&L&&v(R,I,S,{locale:O})},[S,I,H,O,L,null==R?void 0:R.locale,R]);let X={ref:G,onClick(e){E||"function"!=typeof N||N(e),E&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),R&&!e.defaultPrevented&&function(e,t,r,n,l,o,u,s){let{nodeName:c}=e.currentTarget;"A"===c.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!(0,a.isLocalURL)(r))||(e.preventDefault(),(()=>{let e=null==u||u;"beforePopState"in t?t[l?"replace":"push"](r,n,{shallow:o,locale:s,scroll:e}):t[l?"replace":"push"](n||r,{scroll:e})})())}(e,R,I,S,x,M,P,O)},onMouseEnter(e){E||"function"!=typeof C||C(e),E&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),R&&v(R,I,S,{locale:O,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){E||"function"!=typeof k||k(e),E&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),R&&v(R,I,S,{locale:O,priority:!0,bypassPrefetchedCheck:!0})}};if((0,c.isAbsoluteUrl)(S))X.href=S;else if(!E||g||"a"===n.type&&!("href"in n.props)){let e=void 0!==O?O:null==R?void 0:R.locale,t=(null==R?void 0:R.isLocaleDomain)&&(0,p.getDomainLocale)(S,e,null==R?void 0:R.locales,null==R?void 0:R.domainLocales);X.href=t||(0,h.addBasePath)((0,f.addLocale)(S,e,null==R?void 0:R.defaultLocale))}return E?o.default.cloneElement(n,X):(0,l.jsx)("a",{...w,...X,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6334:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return s}});let n=r(6540),l=r(4959),o="function"==typeof IntersectionObserver,u=new Map,a=[];function s(e){let{rootRef:t,rootMargin:r,disabled:s}=e,c=s||!o,[f,i]=(0,n.useState)(!1),d=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(o){if(c||f)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:l,elements:o}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=u.get(n)))return t;let l=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=l.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:l},a.push(r),u.set(r,t),t}(r);return o.set(e,t),l.observe(e),function(){if(o.delete(e),l.unobserve(e),0===o.size){l.disconnect(),u.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&i(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!f){let e=(0,l.requestIdleCallback)(()=>i(!0));return()=>(0,l.cancelIdleCallback)(e)}},[c,r,t,f,d.current]),[p,f,(0,n.useCallback)(()=>{i(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1903:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return l}});let n=r(6540);function l(e,t){let r=(0,n.useRef)(()=>{}),l=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),l.current()):(r.current=o(e,n),l.current=o(t,n))}:e||t,[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},472:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var n=r(4848),l=r(2551),o=r.n(l),u=r(1106),a=r.n(u);let s=e=>{let{path:t,label:r,className:l=""}=e;return(0,n.jsx)("li",{children:(0,n.jsx)(a(),{href:t,className:"text-gray-700 hover:text-gray-900 hover:underline font-bold ".concat(l),children:r})})},c=[{path:"/",label:"Home"},{path:"/gallery",label:"Gallery"},{path:"/about",label:"About"},{path:"/contact",label:"Contact"}],f=e=>{let{className:t=""}=e;return(0,n.jsx)("nav",{"aria-label":"Huvudnavigation",className:t,children:(0,n.jsx)("ul",{className:"flex space-x-6",children:c.map(e=>(0,n.jsx)(s,{...e},e.path))})})},i=()=>(0,n.jsx)("header",{className:"p-8 mb-6",children:(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{className:"text-4xl font-bold text-gray-800",children:"Johanna Lundstr\xf6m"}),(0,n.jsx)("p",{className:"text-gray-600 mt-2 font-bold",children:"Portfolio"})]}),(0,n.jsx)(f,{})]})});function d(e){let{children:t}=e;return(0,n.jsxs)("main",{className:"min-h-screen bg-gray-200",children:[(0,n.jsx)(i,{}),(0,n.jsx)("div",{className:"px-8 py-2",children:t})]})}function p(e){let{Component:t,pageProps:r}=e;return(0,n.jsx)("div",{className:o().className,children:(0,n.jsx)(d,{children:(0,n.jsx)(t,{...r})})})}r(885)},885:()=>{},2551:e=>{e.exports={style:{fontFamily:"'Montserrat', 'Montserrat Fallback', Georgia, serif",fontStyle:"normal"},className:"__className_9a9972"}},1106:(e,t,r)=>{e.exports=r(6397)}},e=>{var t=t=>e(e.s=t);e.O(0,[593,792],()=>(t(8424),t(8440))),_N_E=e.O()}]);