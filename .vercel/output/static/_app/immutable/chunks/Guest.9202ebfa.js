import{s as X,j as E,B as Y,m as Z,n as K}from"./scheduler.7824ab32.js";import{S as $,i as ee,g,s as w,m as P,H as le,h as d,j as G,c as D,n as Q,f as p,D as te,k as o,a as U,x as u,o as W,C as ae}from"./index.f7af9784.js";import{e as L,s as se,d as ie}from"./Footer.a8ab9dc8.js";function N(s,t,a){const c=s.slice();return c[2]=t[a],c}function O(s){let t,a=s[2]+"",c;return{c(){t=g("h3"),c=P(a)},l(n){t=d(n,"H3",{});var f=G(t);c=Q(f,a),f.forEach(p)},m(n,f){U(n,t,f),u(t,c)},p(n,f){f&1&&a!==(a=n[2]+"")&&W(c,a)},d(n){n&&p(t)}}}function re(s){let t,a,c,n,f,_,x,M,T,m,v,I=s[0].name+"",V,B,h,q,y,R,C,b,j,S,z,F,k=L(s[0].year),r=[];for(let e=0;e<k.length;e+=1)r[e]=O(N(s,k,e));return{c(){t=g("div"),a=g("img"),f=w(),_=g("img"),T=w(),m=g("div"),v=g("h1"),V=P(I),B=w(),h=g("img"),R=w();for(let e=0;e<r.length;e+=1)r[e].c();C=w(),b=g("div"),j=new le(!1),this.h()},l(e){t=d(e,"DIV",{});var i=G(t);a=d(i,"IMG",{src:!0,alt:!0,class:!0}),f=D(i),_=d(i,"IMG",{src:!0,alt:!0,class:!0}),T=D(i),m=d(i,"DIV",{class:!0});var l=G(m);v=d(l,"H1",{class:!0});var H=G(v);V=Q(H,I),H.forEach(p),B=D(l),h=d(l,"IMG",{src:!0,alt:!0}),R=D(l);for(let A=0;A<r.length;A+=1)r[A].l(l);C=D(l),b=d(l,"DIV",{class:!0});var J=G(b);j=te(J,!1),J.forEach(p),l.forEach(p),i.forEach(p),this.h()},h(){E(a.src,c=s[0].image.filename+"/m/1600x0")||o(a,"src",c),o(a,"alt",n=s[0].image.alt),o(a,"class","w-full h-[360px] lg:h-[450px] object-cover"),E(_.src,x=s[0].profile.filename+"/m/1600x0")||o(_,"src",x),o(_,"alt",M=s[0].profile.alt),o(_,"class","w-full h-[360px] lg:h-[450px] object-cover"),o(v,"class","text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center"),E(h.src,q=s[0].filename)||o(h,"src",q),o(h,"alt",y=s[0].alt),j.a=null,o(b,"class","w-2/3 prose"),o(m,"class","grid justify-items-center mx-auto mb-12")},m(e,i){U(e,t,i),u(t,a),u(t,f),u(t,_),u(t,T),u(t,m),u(m,v),u(v,V),u(m,B),u(m,h),u(m,R);for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(m,null);u(m,C),u(m,b),j.m(s[1],b),z||(F=Y(S=se.call(null,t,s[0])),z=!0)},p(e,[i]){if(i&1&&!E(a.src,c=e[0].image.filename+"/m/1600x0")&&o(a,"src",c),i&1&&n!==(n=e[0].image.alt)&&o(a,"alt",n),i&1&&!E(_.src,x=e[0].profile.filename+"/m/1600x0")&&o(_,"src",x),i&1&&M!==(M=e[0].profile.alt)&&o(_,"alt",M),i&1&&I!==(I=e[0].name+"")&&W(V,I),i&1&&!E(h.src,q=e[0].filename)&&o(h,"src",q),i&1&&y!==(y=e[0].alt)&&o(h,"alt",y),i&1){k=L(e[0].year);let l;for(l=0;l<k.length;l+=1){const H=N(e,k,l);r[l]?r[l].p(H,i):(r[l]=O(H),r[l].c(),r[l].m(m,C))}for(;l<r.length;l+=1)r[l].d(1);r.length=k.length}i&2&&j.p(e[1]),S&&Z(S.update)&&i&1&&S.update.call(null,e[0])},i:K,o:K,d(e){e&&p(t),ae(r,e),z=!1,F()}}}function oe(s,t,a){let c,{blok:n}=t;return s.$$set=f=>{"blok"in f&&a(0,n=f.blok)},s.$$.update=()=>{s.$$.dirty&1&&a(1,c=ie(n.description))},[n,c]}class me extends ${constructor(t){super(),ee(this,t,oe,re,X,{blok:0})}}export{me as default};