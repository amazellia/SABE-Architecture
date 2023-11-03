

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.62abfada.js","_app/immutable/chunks/scheduler.7824ab32.js","_app/immutable/chunks/index.f7af9784.js"];
export const stylesheets = [];
export const fonts = [];
