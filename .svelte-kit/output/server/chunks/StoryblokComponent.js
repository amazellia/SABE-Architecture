import { c as create_ssr_component, h as compute_rest_props, v as validate_component, m as missing_component } from "./ssr.js";
import { g as getComponent } from "./index.js";
const StoryblokComponent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["blok"]);
  let component;
  let { blok } = $$props;
  if (blok) {
    component = getComponent(blok.component);
  } else {
    console.error("Please provide a 'blok' property to the StoryblokComponent");
  }
  if ($$props.blok === void 0 && $$bindings.blok && blok !== void 0)
    $$bindings.blok(blok);
  return ` ${validate_component(component || missing_component, "svelte:component").$$render($$result, Object.assign({}, { blok }, $$restProps), {}, {})}`;
});
export {
  StoryblokComponent as S
};
