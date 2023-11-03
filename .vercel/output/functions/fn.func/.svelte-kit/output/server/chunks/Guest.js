import { c as create_ssr_component, e as escape, f as add_attribute, d as each } from "./ssr.js";
import { renderRichText } from "@storyblok/js";
const Guest = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let resolvedRichText;
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  resolvedRichText = renderRichText(blok.description);
  return `<div><img src="${escape(blok.image.filename, true) + "/m/1600x0"}"${add_attribute("alt", blok.image.alt, 0)} class="w-full h-[360px] lg:h-[450px] object-cover"> <img src="${escape(blok.profile.filename, true) + "/m/1600x0"}"${add_attribute("alt", blok.profile.alt, 0)} class="w-full h-[360px] lg:h-[450px] object-cover"> <div class="grid justify-items-center mx-auto mb-12"><h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">${escape(blok.name)}</h1> <img${add_attribute("src", blok.filename, 0)}${add_attribute("alt", blok.alt, 0)}> ${each(blok.year, (y) => {
    return `<h3>${escape(y)} </h3>`;
  })} <div class="w-2/3 prose"><!-- HTML_TAG_START -->${resolvedRichText}<!-- HTML_TAG_END --></div></div></div>`;
});
export {
  Guest as default
};
