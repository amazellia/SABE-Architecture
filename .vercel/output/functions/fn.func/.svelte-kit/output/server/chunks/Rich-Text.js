import { c as create_ssr_component } from "./ssr.js";
import { renderRichText } from "@storyblok/js";
const Rich_Text = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let resolvedRichText;
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  resolvedRichText = renderRichText(blok.body);
  return `<div><div class="grid justify-items-center mx-auto mb-12"><div class="w-2/3 prose"><!-- HTML_TAG_START -->${resolvedRichText}<!-- HTML_TAG_END --></div></div></div>`;
});
export {
  Rich_Text as default
};
