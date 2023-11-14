export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.7be20c23.js","app":"_app/immutable/entry/app.1f010dbb.js","imports":["_app/immutable/entry/start.7be20c23.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/singletons.4d674689.js","_app/immutable/entry/app.1f010dbb.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.012baebd.js","_app/immutable/chunks/index.9f01cf0a.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/3.js'))
		],
		routes: [
			{
				id: "/[...slug]",
				pattern: /^(?:\/(.*))?\/?$/,
				params: [{"name":"slug","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
