/// <reference path="../.astro/types.d.ts" />
/// <reference types="vite/client" />
/// <reference types="vue" />

// Ensure TypeScript understands Vue Single File Components have a default export
declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
