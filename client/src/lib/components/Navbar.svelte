<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { colors } from '$lib/utils/color';
	import { onMount } from 'svelte';

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'FAQ', href: '/faq' },
		{ name: 'Contact', href: '/contact' }
	];

	const currentPath = derived(page, ($page) => $page.url.pathname);

	// Variables for hover effects
	let isHovered = false;

	// Variables for dynamic background
	let isScrolled = false;
	let isOnColoredSection = false;
	let navbarElement: HTMLElement;

	// Variables for scroll animation
	let isVisible = true;
	let lastScrollY = 0;
	let scrollingDown = false;
	let scrollTimer: ReturnType<typeof setTimeout> | null = null;

	// Store colors as style properties
	const navStyle = `
      --trustGreen: ${colors.trustGreen};
      --cautionYellow: ${colors.cautionYellow};
      --neutralIvory: ${colors.neutralIvory};
    `;

	// Configuration for pages with colored sections
	const pageConfig = {
		'/': {
			defaultNavColor: 'green', // Default green for homepage
			heroHeight: 650,
			sections: [{ top: 0, bottom: 650, colored: true }]
		},
		'/about': {
			defaultNavColor: 'green', // Default green for about page
			heroHeight: 500,
			sections: [{ top: 0, bottom: 500, colored: false }]
		},
		'/faq': {
			defaultNavColor: 'white', // Default white for FAQ page
			heroHeight: 300,
			sections: [{ top: 0, bottom: 300, colored: true }]
		},
		'/contact': {
			defaultNavColor: 'green', // Default for contact page
			heroHeight: 400,
			sections: [{ top: 0, bottom: 400, colored: false }]
		}
	};

	// Function to check if we're over a colored section and handle scroll direction
	function handleScroll() {
		const scrollY = window.scrollY;
		const path = $currentPath;

		// Handle scroll direction
		scrollingDown = scrollY > lastScrollY;

		// Don't hide navbar if at the top of the page
		if (scrollY < 50) {
			isVisible = true;
		} else if (scrollingDown && isVisible && scrollY > 150) {
			// Hide when scrolling down and we've scrolled past the threshold
			isVisible = false;
		} else if (!scrollingDown && !isVisible) {
			// Show when scrolling up
			isVisible = true;
		}

		// Update last scroll position
		lastScrollY = scrollY;

		// Handle colored section detection
		isOnColoredSection = false;
		if (path in pageConfig) {
			const config = pageConfig[path as keyof typeof pageConfig];
			config.sections.forEach((section) => {
				if (scrollY >= section.top && scrollY < section.bottom && section.colored) {
					isOnColoredSection = true;
				}
			});
		}

		// Update scrolled state
		isScrolled = scrollY > 20;

		// Clear any existing timer
		if (scrollTimer) {
			clearTimeout(scrollTimer);
		}

		// Set timer to hide navbar after 3 seconds of inactivity when scrolled down
		if (scrollY > 150) {
			scrollTimer = setTimeout(() => {
				isVisible = false;
			}, 3000);
		}
	}

	onMount(() => {
		// Initial check
		handleScroll();

		// Listen for scroll events
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (scrollTimer) clearTimeout(scrollTimer);
		};
	});

	// Get default color for current page
	$: defaultNavColor =
		$currentPath in pageConfig
			? pageConfig[$currentPath as keyof typeof pageConfig].defaultNavColor
			: 'green';

	// Compute background style based on scroll position, section and page default
	$: navbarBg = isScrolled
		? isOnColoredSection
			? 'bg-gradient-to-r from-white/95 to-gray-50/95 text-[#1a5f4a] border-white/20'
			: 'bg-gradient-to-r from-[#1a5f4a]/95 to-[#267d63]/95 text-white border-white/10'
		: defaultNavColor === 'white'
			? 'bg-gradient-to-r from-white/90 to-gray-50/90 text-[#1a5f4a] border-white/20 backdrop-blur-sm'
			: 'bg-gradient-to-r from-[#1a5f4a]/90 to-[#267d63]/90 text-white border-white/10 backdrop-blur-sm';

	// For the logo background - consider page default and position
	$: logoBg =
		(isScrolled && isOnColoredSection) || (!isScrolled && defaultNavColor === 'white')
			? 'bg-[#1a5f4a]'
			: 'bg-white';

	// For the logo color - consider page default and position
	$: logoColor =
		(isScrolled && isOnColoredSection) || (!isScrolled && defaultNavColor === 'white')
			? 'white'
			: '#1a5f4a';

	// Reset the auto-hide timer when the user hovers over the navbar
	function resetAutoHideTimer() {
		if (scrollTimer) {
			clearTimeout(scrollTimer);
		}
		isVisible = true;
	}
</script>

<div class="fixed top-0 right-0 left-0 z-50 flex justify-center">
	<nav
		bind:this={navbarElement}
		style={navStyle}
		class="mx-auto mt-6 flex w-fit items-center justify-between rounded-full border px-6
           py-2 transition-all duration-300 {navbarBg}
           {isHovered ? 'shadow-2xl' : 'shadow-lg'}
           transform transition-transform duration-500 ease-in-out
           {isVisible ? 'translate-y-0' : '-translate-y-24'}"
		on:mouseenter={() => {
			isHovered = true;
			resetAutoHideTimer();
		}}
		on:mouseleave={() => (isHovered = false)}
		on:focus={() => resetAutoHideTimer()}
	>
		<div class="flex items-center gap-8">
			<a href="/" class="transition-transform duration-300 hover:scale-110" aria-label="Home">
				<div class="rounded-full {logoBg} p-2 transition-colors duration-300">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke={logoColor}
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
