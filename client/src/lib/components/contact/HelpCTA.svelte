<script lang="ts">
	import { onMount } from 'svelte';

	export let title = 'Need Help Verifying?';
	export let description =
		'Having trouble with medicine verification? Visit our Help Center for guides and FAQs.';
	export let buttonText = 'Visit Help Center';
	export let buttonLink = '/help';
	export let accent = '#4caf50'; // Default accent color

	$: hoverColor = adjustColor(accent, -10);

	// Set CSS variable only in the browser after component mounts
	onMount(() => {
		document.documentElement.style.setProperty('--hover-color', hoverColor);

		// Clean up when component is destroyed
		return () => {
			document.documentElement.style.setProperty('--hover-color', '');
		};
	});

	// Helper function to adjust color brightness
	function adjustColor(hex: string, percent: number): string {
		// Trim the hash if it exists
		hex = hex.replace('#', '');

		// Parse the hex string to RGB
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);

		// Adjust the brightness
		const adjustR = Math.max(0, Math.min(255, Math.round(r * (1 + percent / 100))));
		const adjustG = Math.max(0, Math.min(255, Math.round(g * (1 + percent / 100))));
		const adjustB = Math.max(0, Math.min(255, Math.round(b * (1 + percent / 100))));

		// Convert back to hex
		return `#${adjustR.toString(16).padStart(2, '0')}${adjustG.toString(16).padStart(2, '0')}${adjustB.toString(16).padStart(2, '0')}`;
	}
</script>

<div class="rounded-lg border-l-4 bg-white p-6 shadow-md" style="border-color: {accent}">
	<h2 class="mb-2 text-xl font-bold text-[#1a5f4a]">{title}</h2>
	<p class="mb-4 text-[#607d8b]">{description}</p>
	<a
		href={buttonLink}
		style="background-color: {accent}; hover:background-color: {hoverColor};"
		class="hover-effect inline-block rounded-md px-4 py-2 font-medium text-white transition-colors"
	>
		{buttonText}
	</a>
</div>

<style>
	/* Apply hover effect using the CSS variable */
	.hover-effect:hover {
		background-color: var(--hover-color) !important;
	}
</style>
