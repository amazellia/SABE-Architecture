import{u as A,a as E,b as F,H,F as M,S as O}from"../chunks/Footer.a8ab9dc8.js";import{s as C,o as P,n as R}from"../chunks/scheduler.7824ab32.js";import{S as D,i as I,s as g,e as k,y as N,f as m,c as p,a as y,t as c,b as q,d as u,g as T,r as $,h as V,j as B,u as h,v,x as S,p as z,w as b}from"../chunks/index.f7af9784.js";async function G({params:i}){await A();let t=await E(),n=i.slug,o="cdn/stories/";n?o+=n:o+="home";const s=["event.stream","event.guests","guests.year"],r=await t.get(o,{version:"draft",resolve_relations:s}),l=await t.get("cdn/stories/config/",{version:"draft",resolve_links:"url"});return{story:r.data.story,header:l.data.story.content.header_menu,logo:l.data.story.content.logo,footer:l.data.story.content}}const W=Object.freeze(Object.defineProperty({__proto__:null,load:G},Symbol.toStringTag,{value:"Module"}));function w(i){let t,n;return t=new O({props:{blok:i[0].story.content}}),{c(){$(t.$$.fragment)},l(o){h(t.$$.fragment,o)},m(o,s){v(t,o,s),n=!0},p(o,s){const r={};s&1&&(r.blok=o[0].story.content),t.$set(r)},i(o){n||(u(t.$$.fragment,o),n=!0)},o(o){c(t.$$.fragment,o),n=!1},d(o){b(t,o)}}}function j(i){let t,n,o,s,r,l;n=new H({props:{header:i[0].header,logo:i[0].logo}});let e=i[0].story&&w(i);return r=new M({props:{footer:i[0].footer,logo:i[0].logo}}),{c(){t=T("div"),$(n.$$.fragment),o=g(),e&&e.c(),s=g(),$(r.$$.fragment)},l(a){t=V(a,"DIV",{});var f=B(t);h(n.$$.fragment,f),o=p(f),e&&e.l(f),s=p(f),h(r.$$.fragment,f),f.forEach(m)},m(a,f){y(a,t,f),v(n,t,null),S(t,o),e&&e.m(t,null),S(t,s),v(r,t,null),l=!0},p(a,f){const d={};f&1&&(d.header=a[0].header),f&1&&(d.logo=a[0].logo),n.$set(d),a[0].story?e?(e.p(a,f),f&1&&u(e,1)):(e=w(a),e.c(),u(e,1),e.m(t,s)):e&&(z(),c(e,1,1,()=>{e=null}),q());const _={};f&1&&(_.footer=a[0].footer),f&1&&(_.logo=a[0].logo),r.$set(_)},i(a){l||(u(n.$$.fragment,a),u(e),u(r.$$.fragment,a),l=!0)},o(a){c(n.$$.fragment,a),c(e),c(r.$$.fragment,a),l=!1},d(a){a&&m(t),b(n),e&&e.d(),b(r)}}}function J(i){let t,n,o=i[0],s,r;document.title=t=i[0].story.name;let l=j(i);return{c(){n=g(),l.c(),s=k()},l(e){N("svelte-1qtzbim",document.head).forEach(m),n=p(e),l.l(e),s=k()},m(e,a){y(e,n,a),l.m(e,a),y(e,s,a),r=!0},p(e,[a]){(!r||a&1)&&t!==(t=e[0].story.name)&&(document.title=t),a&1&&C(o,o=e[0])?(z(),c(l,1,1,R),q(),l=j(e),l.c(),u(l,1),l.m(s.parentNode,s)):l.p(e,a)},i(e){r||(u(l),r=!0)},o(e){c(l),r=!1},d(e){e&&(m(n),m(s)),l.d(e)}}}function K(i,t,n){let{data:o}=t;return P(()=>{if(o.story){const s=["event.stream","event.guests","guest.year"];F(o.story.id,r=>n(0,o.story=r,o),{resolveRelations:s})}}),i.$$set=s=>{"data"in s&&n(0,o=s.data)},[o]}class X extends D{constructor(t){super(),I(this,t,K,J,C,{data:0})}}export{X as component,W as universal};
