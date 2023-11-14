

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.17dc3366.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/index.202d1de4.js"];
export const stylesheets = [];
export const fonts = [];
