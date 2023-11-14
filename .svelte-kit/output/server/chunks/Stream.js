import { c as create_ssr_component, e as escape } from "./ssr.js";
import { renderRichText } from "@storyblok/js";
const Stream = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let resolvedRichText;
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  resolvedRichText = renderRichText(blok.description);
  return `<div> <div class="grid justify-items-center mx-auto mb-12"><h1 class="text-2xl lg:text-6xl font-bold mt-12 mb-4 text-center">${escape(blok.name)}</h1>  <div class="w-2/3 prose"><!-- HTML_TAG_START -->${resolvedRichText}<!-- HTML_TAG_END --></div></div></div>`;
});
export {
  Stream as default
};
