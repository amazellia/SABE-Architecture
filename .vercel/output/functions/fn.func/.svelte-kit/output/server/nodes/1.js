

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d6f22a0b.js","_app/immutable/chunks/scheduler.7824ab32.js","_app/immutable/chunks/index.f7af9784.js","_app/immutable/chunks/singletons.b2fcbc85.js"];
export const stylesheets = [];
export const fonts = [];
