// This file provides type declarations for the svelte-feather-icons package
declare module 'svelte-feather-icons/*' {
	import { ComponentType, SvelteComponent } from 'svelte';

	// This makes the icon components assignable to ComponentType<SvelteComponent>
	const icon: ComponentType<SvelteComponent>;
	export default icon;
}
