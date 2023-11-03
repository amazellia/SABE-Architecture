import { c as create_ssr_component, f as add_attribute, e as escape } from "./ssr.js";
import "@storyblok/js";
const GridReportItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div><a${add_attribute("href", blok.File.filename, 0)}><img src="${escape(blok.cover_image?.filename, true) + "/m/600x0"}"${add_attribute("alt", blok.cover_image?.alt, 0)} class="w-full h-48 xl:h-72 object-cover pointer-events-none"></a> <div class="p-8"><h3 class="text-xl text-[#ff0085] font-bold mb-3">${escape(blok.title)}</h3> <p class="text-xxs">${escape(blok.Description)}</p></div></div>`;
});
export {
  GridReportItem as default
};
