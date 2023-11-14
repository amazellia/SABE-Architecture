

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f35097e3.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/index.9f01cf0a.js","_app/immutable/chunks/singletons.dee9e7be.js"];
export const stylesheets = [];
export const fonts = [];
