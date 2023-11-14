

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.bf128250.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/index.202d1de4.js","_app/immutable/chunks/singletons.4ce30250.js"];
export const stylesheets = [];
export const fonts = [];
