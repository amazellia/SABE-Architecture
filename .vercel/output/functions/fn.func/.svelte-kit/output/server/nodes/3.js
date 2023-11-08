import * as universal from '../entries/pages/_...slug_/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_...slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[...slug]/+page.js";
export const imports = ["_app/immutable/nodes/3.5f455010.js","_app/immutable/chunks/Footer.a8ab9dc8.js","_app/immutable/chunks/scheduler.7824ab32.js","_app/immutable/chunks/index.f7af9784.js","_app/immutable/chunks/preload-helper.cf010ec4.js"];
export const stylesheets = ["_app/immutable/assets/Footer.e75ad3a4.css"];
export const fonts = [];
