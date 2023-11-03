import { c as create_ssr_component, e as escape, v as validate_component } from "./ssr.js";
import "@storyblok/js";
const Headline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headline } = $$props;
  if ($$props.headline === void 0 && $$bindings.headline && headline !== void 0)
    $$bindings.headline(headline);
  return `<h2 class="font-title relative z-[2] mx-auto text-[clamp(2rem,6vw,4.5rem)] font-black leading-none"><span style="opacity:1">${escape(headline)}</span> <br></h2>`;
});
const HeadlineColorful = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { headline } = $$props;
  if ($$props.headline === void 0 && $$bindings.headline && headline !== void 0)
    $$bindings.headline(headline);
  return `<h2 class="font-title relative z-[2] mx-auto text-[clamp(2rem,6vw,4.5rem)] font-black leading-none"><span class="inline-grid"><span style="opacity:1" class="[&::selection]:text-base-content relative col-start-1 row-start-1 leading-tight [&::selection]:bg-blue-700/20 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]">${escape(headline)}</span></span></h2>`;
});
const Teaser = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div class="w-full"><div class="text-center bg-white bg-opacity-70 px-2 pt-40 lg:px-10">${validate_component(Headline, "Headline").$$render($$result, { headline: blok.headline }, {}, {})} ${blok.headline2 ? `${validate_component(HeadlineColorful, "HeadlineColorful").$$render($$result, { headline: blok.headline2 }, {}, {})}` : ``} <div class="h-10"></div></div></div>`;
});
export {
  Teaser as default
};
