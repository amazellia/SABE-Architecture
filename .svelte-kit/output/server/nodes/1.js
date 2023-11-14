

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2a01e844.js","_app/immutable/chunks/scheduler.7824ab32.js","_app/immutable/chunks/index.f7af9784.js","_app/immutable/chunks/singletons.ad160180.js"];
export const stylesheets = [];
export const fonts = [];
