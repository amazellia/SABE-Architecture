import { c as create_ssr_component, f as add_attribute, e as escape } from "./ssr.js";
import "@storyblok/js";
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  let heroClasses = blok.layout === "constrained" ? "container mx-auto" : "";
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div${add_attribute("class", `min-h-[600px] relative flex items-end justify-center p-9 my-6 rounded-[5px] overflow-hidden ${heroClasses}`, 0)}><div class="relative z-10 text-center"><h2 class="text-3xl lg:text-6xl text-white font-bold mb-3">${escape(blok.headline)}</h2> <h3 class="text-4xl text-white font-light">${escape(blok.subheadline)}</h3></div> <img${add_attribute("src", blok.background_image.filename, 0)}${add_attribute("alt", blok.background_image.alt, 0)} class="absolute top-0 left-0 z-0 w-full h-full object-cover"></div>`;
});
export {
  Hero as default
};
