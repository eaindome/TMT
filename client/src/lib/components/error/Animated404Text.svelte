<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut, elasticOut, backOut } from 'svelte/easing';

	export let animated = true;
	export let textColor = '#1a5f4a';
	export let accentColor = '#d32f2f';
	export let size: 'md' | 'lg' | 'xl' = 'xl'; // xl, lg, md
	
	// Text animation values
	const digit1 = tweened(0, { duration: 800, easing: elasticOut });
	const digit2 = tweened(0, { duration: 800, easing: elasticOut });
	const digit3 = tweened(0, { duration: 800, easing: elasticOut });
	
	// Scale animation for middle zero
	const scale = tweened(animated ? 0.5 : 1, { duration: 500, easing: backOut });
	
	// Size mappings
	const sizeClasses = {
		md: 'text-6xl md:text-7xl',
		lg: 'text-7xl md:text-8xl',
		xl: 'text-8xl md:text-9xl'
	};
	
	onMount(() => {
		if (animated) {
			// Start animations with slight delays between digits
			setTimeout(() => digit1.set(4), 200);
			setTimeout(() => digit2.set(0), 350);
			setTimeout(() => digit3.set(4), 500);
			setTimeout(() => scale.set(1.2), 650);
			setTimeout(() => scale.set(1), 850);
		} else {
			// Set to final values immediately
			digit1.set(4, { duration: 0 });
			digit2.set(0, { duration: 0 });
			digit3.set(4, { duration: 0 });
		}
	});
</script>

<div class="flex items-center justify-center font-bold {sizeClasses[size]} tracking-tight">
	<span 
		style="transform: translateY({$digit1 * 5}px); color: {textColor};"
		class="transition-transform"
	>
		4
	</span>
	<span 
		style="transform: scale({$scale}); color: {accentColor};"
		class="transition-transform mx-1 inline-block"
	>
		0
	</span>
	<span 
		style="transform: translateY({$digit3 * 5}px); color: {textColor};"
		class="transition-transform"
	>
		4
	</span>
</div>