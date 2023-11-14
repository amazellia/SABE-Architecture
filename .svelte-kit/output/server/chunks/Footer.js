import { c as create_ssr_component, e as escape, d as each, f as add_attribute } from "./ssr.js";
const Header_svelte_svelte_type_style_lang = "";
const css = {
  code: ".open.svelte-jr4mtv{display:block}.mobile-nav.svelte-jr4mtv{display:none}.mobile-nav.open.svelte-jr4mtv{display:block}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { header } = $$props;
  let { logo } = $$props;
  let { title } = $$props;
  if ($$props.header === void 0 && $$bindings.header && header !== void 0)
    $$bindings.header(header);
  if ($$props.logo === void 0 && $$bindings.logo && logo !== void 0)
    $$bindings.logo(logo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<head>${escape(title)}</head> <header class="w-full h-full sticky z-20 top-0 md:relative lg:relative"><div class="navbar top-0 md:bg-base-100"><div class="flex-1">${logo ? `<a href="/" data-svelte-h="svelte-162y2r8">
                    home</a>` : ``}</div> ${header ? `<div class="${["flex-none hidden lg:block svelte-jr4mtv", ""].join(" ").trim()}"><ul class="flex space-x-4 lg:space-x-8 text-lg font-bold">${each(header, (blok) => {
    return `<li class="hover:text-[#808080] p-3"><a href="${"/" + escape(blok.link.story.url, true)}">${escape(blok.name)}</a> </li>`;
  })}</ul></div>` : ``} <div class="${[
    "mobile-nav fixed inset-0 bg-white z-50 transform transition-transform ease-in-out duration-300 svelte-jr4mtv",
    ""
  ].join(" ").trim()}"><div class="flex items-center justify-end p-4"><button class="text-gray-500 btn btn-circle" data-svelte-h="svelte-3u10kd"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> <ul class="flex flex-col items-center justify-center space-y-4 text-lg font-bold">${each(header, (blok) => {
    return `<li class="hover:text-[#ff0085]"><a href="${"/" + escape(blok.link.story.url, true)}">${escape(blok.name)}</a> </li>`;
  })}</ul></div> <button class="lg:hidden btn" data-svelte-h="svelte-uit5t7"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> <svg class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div> </header>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { footer } = $$props;
  let { logo } = $$props;
  if ($$props.footer === void 0 && $$bindings.footer && footer !== void 0)
    $$bindings.footer(footer);
  if ($$props.logo === void 0 && $$bindings.logo && logo !== void 0)
    $$bindings.logo(logo);
  return `<footer class="p-12"><div class="flex flex-col lg:flex-row justify-stretch">${footer ? `<div class="basis-auto lg:basis-1/2"><img${add_attribute("src", logo.filename, 0)}${add_attribute("alt", logo.alt, 0)} class="basis-auto lg:basis-1/2"> <p>${escape(footer.address)}</p> <b class="no-underline bold" data-svelte-h="svelte-1n8r7ja">Contact Us</b><br> <a class="underline underline-offset-8"${add_attribute("href", footer.phone, 0)}>Phone</a> <br> <a class="underline underline-offset-8" href="${"mailto:" + escape(footer.email, true)}">Email</a> <br><br></div> <div class="basis-auto lg:basis-1/2">
            Would you like to know our monthly updates, events on working bees, and different ways to get involved?
            Sign up here: 
            <br><br> ${escape(footer.acknowledgement)}<br></div>` : ``}</div> <div class="flex items-center justify-center text-xl lg:text-2xl font-bold text-center p-8">${escape(footer.copyright)}</div></footer>`;
});
export {
  Footer as F,
  Header as H
};
