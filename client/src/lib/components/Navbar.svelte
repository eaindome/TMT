<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { colors } from '$lib/utils/color';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Contact', href: '/contact' }
	];

	const currentPath = derived(page, ($page) => $page.url.pathname);

	// Variables for hover effects
	let isHovered = false;

	// New prop to control navbar appearance based on background
	export let onGreenBackground = false;

	// Store colors as style properties
	const navStyle = `
      --trustGreen: ${colors.trustGreen};
      --cautionYellow: ${colors.cautionYellow};
      --neutralIvory: ${colors.neutralIvory};
    `;

	// Determine the paths that have green backgrounds
	const greenBackgroundPaths = ['/faq', '/about'];

	// Automatically detect if we're on a page with green background
	$: onGreenBackground = greenBackgroundPaths.includes($currentPath);
</script>

<div class="fixed top-6 right-0 left-0 z-50 flex justify-center">
	<nav
		style={navStyle}
		class="mx-auto flex w-fit items-center justify-between rounded-full px-6 py-2
           backdrop-blur-sm transition-all duration-300
           {onGreenBackground
			? 'border border-[#1a5f4a]/10 bg-white/95 text-[#1a5f4a]'
			: 'border border-white/10 bg-[#1a5f4a]/95 text-white'}
           {isHovered ? 'translate-y-0.5 shadow-2xl' : 'shadow-lg'}"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
		in:fly={{ y: -20, duration: 800, easing: cubicOut }}
	>
		<div class="flex items-center gap-8">
			<a href="/" class="transition-transform duration-300 hover:scale-110" aria-label="Home">
				<div class="rounded-full {onGreenBackground ? 'bg-[#1a5f4a]' : 'bg-white'} p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={onGreenBackground ? 'white' : '#1a5f4a'}
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z"
						/>
					</svg>
				</div>
			</a>

			{#each links as link}
				<a
					href={link.href}
					class="relative px-1 py-2 font-medium transition-all duration-200
                 {$currentPath === link.href ? 'font-semibold' : 'opacity-85 hover:opacity-100'}"
				>
					{link.name}
					{#if $currentPath === link.href}
						<div class="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#f4b400]"></div>
					{/if}
				</a>
			{/each}
		</div>
	</nav>
</div>

<style>
	/* Add a subtle glow effect using CSS variables */
	nav {
		box-shadow: 0 4px 20px rgba(26, 95, 74, 0.15);
	}

	nav:hover {
		box-shadow: 0 6px 25px rgba(26, 95, 74, 0.25);
	}

	/* If you want to use the CSS variables from the style attribute */
	a:hover {
		color: var(--cautionYellow);
	}
</style>
