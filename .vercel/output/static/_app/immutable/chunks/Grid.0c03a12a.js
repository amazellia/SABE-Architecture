import{s as A,B as J,m as K}from"./scheduler.7824ab32.js";import{S as L,i as M,g as m,s as q,m as N,h as _,j as p,f as h,c as B,n as O,k as v,a as P,x as u,o as Q,d as E,b as R,t as C,C as T,r as U,u as W,v as X,w as Y,p as Z}from"./index.f7af9784.js";import{e as z,s as ee}from"./Footer.a8ab9dc8.js";import te from"./Feature.775f6457.js";function F(r,a,o){const s=r.slice();return s[1]=a[o],s}function G(r){let a,o;return a=new te({props:{blok:r[1]}}),{c(){U(a.$$.fragment)},l(s){W(a.$$.fragment,s)},m(s,i){X(a,s,i),o=!0},p(s,i){const c={};i&1&&(c.blok=s[1]),a.$set(c)},i(s){o||(E(a.$$.fragment,s),o=!0)},o(s){C(a.$$.fragment,s),o=!1},d(s){Y(a,s)}}}function le(r){let a,o,s,i,c,g=r[0].headline+"",$,w,b,D,f,y,k,I,S,d=z(r[0].columns),l=[];for(let t=0;t<d.length;t+=1)l[t]=G(F(r,d,t));const H=t=>C(l[t],1,1,()=>{l[t]=null});return{c(){a=m("div"),o=m("div"),s=m("div"),i=q(),c=m("h2"),$=N(g),w=q(),b=m("div"),D=q(),f=m("div");for(let t=0;t<l.length;t+=1)l[t].c();this.h()},l(t){a=_(t,"DIV",{class:!0});var n=p(a);o=_(n,"DIV",{class:!0});var e=p(o);s=_(e,"DIV",{class:!0}),p(s).forEach(h),i=B(e),c=_(e,"H2",{class:!0});var x=p(c);$=O(x,g),x.forEach(h),w=B(e),b=_(e,"DIV",{class:!0}),p(b).forEach(h),D=B(e),f=_(e,"DIV",{class:!0});var j=p(f);for(let V=0;V<l.length;V+=1)l[V].l(j);j.forEach(h),e.forEach(h),n.forEach(h),this.h()},h(){v(s,"class","bg-primary pointer-events-none absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full opacity-10 blur-3xl"),v(c,"class","font-title relative z-[2] mx-auto text-[clamp(2rem,6vw,4.5rem)] font-black leading-none"),v(b,"class","h-32"),v(f,"class","grid gap-10 p-6 xl:grid-cols-3"),v(o,"class","sticky top-0 pt-40 text-center"),v(a,"class","min-h-[200vh] w-full px-2 lg:px-10")},m(t,n){P(t,a,n),u(a,o),u(o,s),u(o,i),u(o,c),u(c,$),u(o,w),u(o,b),u(o,D),u(o,f);for(let e=0;e<l.length;e+=1)l[e]&&l[e].m(f,null);k=!0,I||(S=J(y=ee.call(null,a,r[0])),I=!0)},p(t,[n]){if((!k||n&1)&&g!==(g=t[0].headline+"")&&Q($,g),n&1){d=z(t[0].columns);let e;for(e=0;e<d.length;e+=1){const x=F(t,d,e);l[e]?(l[e].p(x,n),E(l[e],1)):(l[e]=G(x),l[e].c(),E(l[e],1),l[e].m(f,null))}for(Z(),e=d.length;e<l.length;e+=1)H(e);R()}y&&K(y.update)&&n&1&&y.update.call(null,t[0])},i(t){if(!k){for(let n=0;n<d.length;n+=1)E(l[n]);k=!0}},o(t){l=l.filter(Boolean);for(let n=0;n<l.length;n+=1)C(l[n]);k=!1},d(t){t&&h(a),T(l,t),I=!1,S()}}}function ae(r,a,o){let{blok:s}=a;return r.$$set=i=>{"blok"in i&&o(0,s=i.blok)},[s]}class ie extends L{constructor(a){super(),M(this,a,ae,le,A,{blok:0})}}export{ie as default};
