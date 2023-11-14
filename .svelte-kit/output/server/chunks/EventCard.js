import { c as create_ssr_component, e as escape, f as add_attribute, d as each } from "./ssr.js";
import "@storyblok/js";
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formattedDate = new Date(dateString).toLocaleDateString(void 0, options);
  return formattedDate;
}
const EventCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { event } = $$props;
  let { slug } = $$props;
  if ($$props.event === void 0 && $$bindings.event && event !== void 0)
    $$bindings.event(event);
  if ($$props.slug === void 0 && $$bindings.slug && slug !== void 0)
    $$bindings.slug(slug);
  return `<a href="${"/" + escape(slug, true)}" class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"><img src="${escape(event.image?.filename, true) + "/m/600x0"}"${add_attribute("alt", event.image?.alt, 0)} class="w-full h-48 xl:h-72 object-cover pointer-events-none"> <div class="p-4"><h3 class="text-xl font-bold mb-3">${escape(event.name)}</h3> <div class="line-clamp-4">${escape(formatDate(event.startDate))}</div> ${each(event.guests, (guest) => {
    return `<a href="${"/" + escape(guest.full_slug, true)}">${escape(guest.name)}<br> </a>`;
  })} <div>${each(event.stream, (stream) => {
    return `<a href="${"/" + escape(stream.full_slug, true)}">${escape(stream.name)} </a>`;
  })}</div></div></a>`;
});
export {
  EventCard as E
};
