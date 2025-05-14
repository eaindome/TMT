<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	// Animation control
	const pillScale = tweened(0, { duration: 500, easing: cubicOut });
	const pillRotate = tweened(-10, { duration: 400, easing: cubicOut });
	const magnifierScale = tweened(0, { duration: 400, easing: cubicOut });
	const questionMarkOpacity = tweened(0, { duration: 300, easing: cubicOut });
	
	onMount(() => {
		// Sequence the animations
		setTimeout(() => pillScale.set(1), 100);
		setTimeout(() => pillRotate.set(0), 300);
		setTimeout(() => magnifierScale.set(1), 500);
		setTimeout(() => questionMarkOpacity.set(1), 800);
	});
</script>

<div class="w-full h-full">
	<svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
		<!-- Background elements -->
		<circle cx="300" cy="125" r="110" fill="#f5f5f5" />
		<circle cx="320" cy="115" r="80" fill="#e9f5f2" />

		<!-- Medicine bottle - scaled and rotated with animation -->
		<g transform="translate(260, 115) scale({$pillScale}) rotate({$pillRotate})">
			<rect x="-40" y="-55" width="80" height="110" rx="8" fill="#1a5f4a" />
			<rect x="-30" y="-45" width="60" height="90" rx="4" fill="white" opacity="0.2" />
			<rect x="-30" y="-30" width="60" height="10" rx="2" fill="white" opacity="0.4" />
			<rect x="-25" y="-15" width="50" height="10" rx="2" fill="white" opacity="0.4" />
			<rect x="-20" y="0" width="40" height="10" rx="2" fill="white" opacity="0.4" />
		</g>

		<!-- Question mark - animated with opacity -->
		<g opacity={$questionMarkOpacity}>
			<text x="310" y="135" font-size="80" font-weight="bold" fill="#d32f2f" text-anchor="middle">?</text>
		</g>

		<!-- Magnifying glass - scaled with animation -->
		<g transform="translate(420, 150) scale({$magnifierScale})">
			<circle cx="0" cy="0" r="35" fill="white" stroke="#607d8b" stroke-width="6" />
			<circle cx="0" cy="0" r="25" fill="#f5f5f5" />
			<line x1="25" y1="25" x2="60" y2="60" stroke="#607d8b" stroke-width="8" stroke-linecap="round" />
			<path d="M-5,-5 L5,5 M-5,5 L5,-5" stroke="#d32f2f" stroke-width="4" stroke-linecap="round" />
		</g>

		<!-- 404 subtle text in background -->
		<text x="150" y="210" font-size="24" font-weight="bold" fill="#e0e0e0" text-anchor="middle">404</text>
		<text x="450" y="210" font-size="24" font-weight="bold" fill="#e0e0e0" text-anchor="middle">404</text>
	</svg>
</div>