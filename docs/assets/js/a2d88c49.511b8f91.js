(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{107:function(e,r,t){"use strict";t.d(r,"a",(function(){return s})),t.d(r,"b",(function(){return f}));var n=t(0),o=t.n(n);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=o.a.createContext({}),p=function(e){var r=o.a.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},s=function(e){var r=p(e.components);return o.a.createElement(u.Provider,{value:r},e.children)},b={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},d=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(t),d=n,f=s["".concat(c,".").concat(d)]||s[d]||b[d]||a;return t?o.a.createElement(f,i(i({ref:r},u),{},{components:t})):o.a.createElement(f,i({ref:r},u))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,c=new Array(a);c[0]=d;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var u=2;u<a;u++)c[u]=t[u];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},94:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return c})),t.d(r,"metadata",(function(){return i})),t.d(r,"toc",(function(){return l})),t.d(r,"default",(function(){return p}));var n=t(3),o=t(7),a=(t(0),t(107)),c={id:"hook",title:"Hook",sidebar_label:"Hook",slug:"/hook"},i={unversionedId:"hook",id:"hook",isDocsHomePage:!1,title:"Hook",description:"Hook \u662f\u4e00\u79cd\u7279\u6b8a\u7684\u7ed3\u6784, \u7528\u4e8e\u5b9e\u73b0 AOP \u7f16\u7a0b\u7684\u6548\u679c, \u76ee\u524d\u5df2\u7ecf\u5177\u5907\u7684 Hook \u6709",source:"@site/docs/hook.md",slug:"/hook",permalink:"/structured-react-hook/docs/hook",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/hook.md",version:"current",sidebar_label:"Hook",sidebar:"docs",previous:{title:"Styles",permalink:"/structured-react-hook/docs/styles"},next:{title:"Combination",permalink:"/structured-react-hook/docs/combination"}},l=[],u={toc:l};function p(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},u,t,{components:r,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Hook \u662f\u4e00\u79cd\u7279\u6b8a\u7684\u7ed3\u6784, \u7528\u4e8e\u5b9e\u73b0 AOP \u7f16\u7a0b\u7684\u6548\u679c, \u76ee\u524d\u5df2\u7ecf\u5177\u5907\u7684 Hook \u6709"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"before","[Controller/\u5168\u90e8/\u5355\u4e2a]"),Object(a.b)("li",{parentName:"ul"},"after","[Controller/\u5168\u90e8/\u5355\u4e2a]"),Object(a.b)("li",{parentName:"ul"},"render","[View/\u5168\u90e8/\u5355\u4e2a]","Wrapper")),Object(a.b)("p",null,"\u901a\u8fc7\u4f8b\u5b50\u4f1a\u6bd4\u8f83\u5bb9\u6613\u7406\u89e3"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-js"},"controller:{\n  onButtonClick(){},\n  onResetButtonClick(){}\n}\nview:{\n    renderMain(){return(<div>main</div>)},\n    renderSub(){return(<div>sub</div>)}\n}\nhook:{\n    beforeController(){} // \u5728\u6240\u6709 Controller \u6267\u884c\u524d\u6267\u884c\n    afterController(){} // \u5728\u6240\u6709 Controller \u6267\u884c\u540e\u6267\u884c\n    renderWrapper(renderTarget, renderKey){} // \u5728\u6240\u6709 render \u51fd\u6570\u5916\u5c42\u5305\u88f9\u4e9b\u4ec0\u4e48\n}\n")))}p.isMDXComponent=!0}}]);