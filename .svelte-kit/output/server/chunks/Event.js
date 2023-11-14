import { c as create_ssr_component, e as escape, f as add_attribute, d as each } from "./ssr.js";
import { renderRichText } from "@storyblok/js";
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let resolvedRichText;
  let { blok } = $$props;
  console.log(blok.guests);
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  resolvedRichText = renderRichText(blok.description);
  return `<div><img src="${escape(blok.image.filename, true) + "/m/1600x0"}"${add_attribute("alt", blok.image.alt, 0)} class="w-full h-[360px] lg:h-[450px] object-cover"> <div class="grid justify-items-center mx-auto mb-12"><h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">${escape(blok.name)}</h1> <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">${escape(blok.time)}</h2> ${each(blok.stream, (stream) => {
    return `<a href="${"/" + escape(stream.full_slug, true)}">${escape(stream.name)} </a>`;
  })} <p>${escape(blok.startDate)}</p> <p>${escape(blok.endDate)}</p> <p>${escape(blok.location)}</p> ${each(blok.guests, (guest) => {
    return `<a href="${"/" + escape(guest.full_slug, true)}">${escape(guest.name)} </a>`;
  })} <div class="w-2/3 prose"><!-- HTML_TAG_START -->${resolvedRichText}<!-- HTML_TAG_END --></div></div></div>`;
});
export {
  Event as default
};
