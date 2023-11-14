import { c as create_ssr_component, d as each, e as escape, f as add_attribute, v as validate_component } from "./ssr.js";
import { G as GuestCard } from "./GuestCard.js";
import "@storyblok/js";
const GuestList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPage = 1;
  let guests = [];
  let years = ["All", "2023", "2022", "2021", "2020", "2019"];
  return `<div class="py-24"><div class="mt-4 text-center"><label for="yearSelector" class="block text-gray-700" data-svelte-h="svelte-5e89js">Select Year:</label> <select id="yearSelector" class="mt-1 p-2 border rounded">${each(years, (year) => {
    return `<option${add_attribute("value", year, 0)}>${escape(year)}</option>`;
  })}</select></div> <div class="container mx-auto grid md:grid-cols-3 gap-12 my-12 place-items-start">${each(guests, (guest) => {
    return `${validate_component(GuestCard, "GuestCard").$$render(
      $$result,
      {
        guest: guest.content,
        slug: guest.full_slug
      },
      {},
      {}
    )}`;
  })}</div> <div class="flex justify-center mt-4"><button class="mr-2" ${"disabled"}>Previous</button> <div class="flex">${``} ${``} <button>${escape(currentPage)}</button> ${`<button class="ml-2 hidden md:block">${escape(currentPage + 1)}</button>`}</div> <button class="ml-2" ${""}>Next</button></div></div>`;
});
export {
  GuestList as default
};
