import{s as R,j as w,B as y,m as z,n as A}from"./scheduler.7824ab32.js";import{S as J,i as K,g as u,s as B,m as C,h,j as g,f as d,c as H,n as M,k as s,a as L,x as o,o as P}from"./index.f7af9784.js";import{s as N}from"./Footer.a8ab9dc8.js";function O(i){let t,r,l,c,k,E,j,n,m,v=i[0].title+"",x,q,_,p=i[0].Description+"",D,I,F,G;return{c(){t=u("div"),r=u("a"),l=u("img"),j=B(),n=u("div"),m=u("h3"),x=C(v),q=B(),_=u("p"),D=C(p),this.h()},l(a){t=h(a,"DIV",{});var e=g(t);r=h(e,"A",{href:!0});var b=g(r);l=h(b,"IMG",{src:!0,alt:!0,class:!0}),b.forEach(d),j=H(e),n=h(e,"DIV",{class:!0});var f=g(n);m=h(f,"H3",{class:!0});var S=g(m);x=M(S,v),S.forEach(d),q=H(f),_=h(f,"P",{class:!0});var V=g(_);D=M(V,p),V.forEach(d),f.forEach(d),e.forEach(d),this.h()},h(){var a,e;w(l.src,c=((a=i[0].cover_image)==null?void 0:a.filename)+"/m/600x0")||s(l,"src",c),s(l,"alt",k=(e=i[0].cover_image)==null?void 0:e.alt),s(l,"class","w-full h-48 xl:h-72 object-cover pointer-events-none"),s(r,"href",E=i[0].File.filename),s(m,"class","text-xl text-[#ff0085] font-bold mb-3"),s(_,"class","text-xxs"),s(n,"class","p-8")},m(a,e){L(a,t,e),o(t,r),o(r,l),o(t,j),o(t,n),o(n,m),o(m,x),o(n,q),o(n,_),o(_,D),F||(G=y(I=N.call(null,t,i[0])),F=!0)},p(a,[e]){var b,f;e&1&&!w(l.src,c=((b=a[0].cover_image)==null?void 0:b.filename)+"/m/600x0")&&s(l,"src",c),e&1&&k!==(k=(f=a[0].cover_image)==null?void 0:f.alt)&&s(l,"alt",k),e&1&&E!==(E=a[0].File.filename)&&s(r,"href",E),e&1&&v!==(v=a[0].title+"")&&P(x,v),e&1&&p!==(p=a[0].Description+"")&&P(D,p),I&&z(I.update)&&e&1&&I.update.call(null,a[0])},i:A,o:A,d(a){a&&d(t),F=!1,G()}}}function Q(i,t,r){let{blok:l}=t;return i.$$set=c=>{"blok"in c&&r(0,l=c.blok)},[l]}class X extends J{constructor(t){super(),K(this,t,Q,O,R,{blok:0})}}export{X as default};
