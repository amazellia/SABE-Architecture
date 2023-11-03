import { c as create_ssr_component, e as escape } from "./ssr.js";
import "@storyblok/js";
const Feature = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { blok } = $$props;
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return `<div class="flex flex-col items-center gap-4"><h3 class="text-[clamp(2rem,6vw,5rem)] font-black tabular-nums"><span>${escape(blok.name)}</span></h3></div>`;
});
export {
  Feature as default
};
