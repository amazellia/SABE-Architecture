import { c as create_ssr_component, e as escape, f as add_attribute, d as each } from "./ssr.js";
import { renderRichText } from "@storyblok/js";
const Event = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let resolvedRichText;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  resolvedRichText = renderRichText(data.description);
  return `<div><img src="${escape(data.image.filename, true) + "/m/1600x0"}"${add_attribute("alt", data.image.alt, 0)} class="w-full h-[360px] lg:h-[450px] object-cover"> <div class="grid justify-items-center mx-auto mb-12"><h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">${escape(data.name)}</h1> <h2 class="text-xl lg:text-2xl text-[#1d243d] font-bold mb-4">${escape(data.time)}</h2> ${each(data.stream, (stream) => {
    return `<a href="${"/" + escape(stream.full_slug, true)}">${escape(stream.name)} </a>`;
  })} <p>${escape(data.startDate)}</p> <p>${escape(data.endDate)}</p> <p>${escape(data.location)}</p> ${each(data.guests, (guest) => {
    return `<a href="${"/" + escape(guest.full_slug, true)}">${escape(guest.name)} </a>`;
  })} <div class="w-2/3 prose"><!-- HTML_TAG_START -->${resolvedRichText}<!-- HTML_TAG_END --></div></div></div>`;
});
export {
  Event as default
};
