import * as universal from '../entries/pages/_...slug_/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_...slug_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/[...slug]/+page.js";
export const imports = ["_app/immutable/nodes/3.bf991c64.js","_app/immutable/chunks/Footer.81ff463e.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/index.9f01cf0a.js","_app/immutable/chunks/preload-helper.a4192956.js"];
export const stylesheets = ["_app/immutable/assets/Footer.e75ad3a4.css"];
export const fonts = [];
