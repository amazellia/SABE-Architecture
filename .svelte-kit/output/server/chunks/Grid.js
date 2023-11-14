import { c as create_ssr_component, e as escape, d as each, v as validate_component } from "./ssr.js";
import "@storyblok/js";
import Feature from "./Feature.js";
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div class="min-h-[200vh] w-full px-2 lg:px-10"><div class="sticky top-0 pt-40 text-center"><div class="bg-primary pointer-events-none absolute bottom-0 left-1/2 aspect-square w-1/2 -translate-x-1/2 rounded-full opacity-10 blur-3xl"></div> <h2 class="font-title relative z-[2] mx-auto text-[clamp(2rem,6vw,4.5rem)] font-black leading-none">${escape(blok.headline)}</h2> <div class="h-32"></div> <div class="grid gap-10 p-6 xl:grid-cols-3">${each(blok.columns, (blokitem) => {
    return `${validate_component(Feature, "Feature").$$render($$result, { blok: blokitem }, {}, {})}`;
  })}</div></div></div>`;
});
export {
  Grid as default
};
