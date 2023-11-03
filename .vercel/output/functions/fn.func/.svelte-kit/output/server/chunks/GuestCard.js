import { c as create_ssr_component, e as escape, f as add_attribute } from "./ssr.js";
import "@storyblok/js";
const GuestCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { guest } = $$props;
  let { slug } = $$props;
  if ($$props.guest === void 0 && $$bindings.guest && guest !== void 0)
    $$bindings.guest(guest);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  return `<a href="${"/" + escape(slug, true)}" class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"><img src="${escape(guest.profile?.filename, true) + "/m/600x0"}"${add_attribute("alt", guest.profile?.alt, 0)} class="w-full h-48 xl:h-72 object-cover pointer-events-none"> <div class="p-4"><h3 class="text-xl font-bold mb-3">${escape(guest.name)}</h3> ${guest.teaser ? `<div class="line-clamp-4">${escape(guest?.teaser)}</div>` : ``}</div></a>`;
});
export {
  GuestCard as G
};
