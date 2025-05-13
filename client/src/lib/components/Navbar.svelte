<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { colors } from '$lib/utils/color';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Resource', href: '/resources' }
	];

	const currentPath = derived(page, ($page) => $page.url.pathname);

	// Variables for hover effects
	let isHovered = false;

	// Store colors as style properties
	const navStyle = `
      --trustGreen: ${colors.trustGreen};
      --cautionYellow: ${colors.cautionYellow};
      --neutralIvory: ${colors.neutralIvory};
    `;
</script>

<div class="fixed top-6 right-0 left-0 z-50 flex justify-center ">
	<nav
		style={navStyle}
		class="bg-opacity-95 mx-auto flex w-fit items-center justify-between rounded-full bg-[#1a5f4a] px-6 py-2 text-white
           shadow-xl backdrop-blur-sm transition-all duration-300
           {isHovered ? 'translate-y-0.5 shadow-2xl' : 'shadow-lg'}"
		on:mouseenter={() => (isHovered = true)}
		on:mouseleave={() => (isHovered = false)}
		in:fly={{ y: -20, duration: 800, easing: cubicOut }}
	>
		<div class="flex items-center gap-8">
			<a href="/" class="transition-transform duration-300 hover:scale-110" aria-label="Home">
				<div class="rounded-full bg-white p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="#1a5f4a"
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
					class="relative px-1 py-2 font-medium text-white transition-all duration-200
                 {$currentPath === link.href
						? 'font-semibold text-white'
						: 'opacity-85 hover:opacity-100'}"
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
		box-shadow: 0 4px 20px rgba(26, 95, 74, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	nav:hover {
		box-shadow: 0 6px 25px rgba(26, 95, 74, 0.4);
	}

	/* If you want to use the CSS variables from the style attribute */
	a:hover {
		color: var(--neutralIvory);
	}
</style>
