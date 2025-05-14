<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let activeSection = 'mission';
	let scrolling = false;
	let visible = false;

	// List of sections for navigation
	const sections = [
		{ id: 'mission', label: 'Our Mission', icon: 'mission' },
		{ id: 'story', label: 'Our Story', icon: 'story' },
		{ id: 'technology', label: 'Technology', icon: 'technology' },
		{ id: 'team', label: 'Team', icon: 'team' },
		{ id: 'commitment', label: 'Commitment', icon: 'commitment' }
	];

	// Scroll to section when nav item is clicked
	function scrollToSection(sectionId: string) {
		scrolling = true;
		activeSection = sectionId;

		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
			setTimeout(() => {
				scrolling = false;
			}, 1000);
		}
	}

	// Update active section based on scroll position
	onMount(() => {
		// Show the nav with a slight delay for a nice entrance
		setTimeout(() => {
			visible = true;
		}, 500);

		const sectionElements = sections.map((section) => document.getElementById(section.id));

		window.addEventListener('scroll', () => {
			if (scrolling) return;

			const scrollPosition = window.scrollY + 90;

			for (let i = sectionElements.length - 1; i >= 0; i--) {
				const section = sectionElements[i];
				if (section && section.offsetTop <= scrollPosition) {
					activeSection = sections[i].id;
					break;
				}
			}
		});
	});
</script>

{#if visible}
	<nav
		in:fly={{ x: -30, duration: 800 }}
		class="fixed top-1/2 left-8 z-10 hidden -translate-y-1/2 transform lg:block"
	>
		<div class="rounded-2xl border border-white/20 bg-white/80 p-5 shadow-xl backdrop-blur-md">
			<ul class="space-y-6">
				{#each sections as section, i}
					<li class="relative">
						<!-- Progress line connector between items -->
						{#if i < sections.length - 1}
							<div
								class="absolute top-9 bottom-[-24px] left-[15px] w-[2px] {activeSection ===
									section.id || activeSection === sections[i + 1].id
									? 'bg-[#1a5f4a]/40'
									: 'bg-gray-200'}"
							></div>
						{/if}

						<button
							class="group flex w-full items-center transition-all duration-300"
							on:click={() => scrollToSection(section.id)}
							aria-label={section.label}
							in:fly={{ y: 20, duration: 300, delay: 100 + i * 100 }}
						>
							<!-- Dot indicator -->
							<div class="relative mr-4">
								<span
									class="block h-[10px] w-[10px] rounded-full transition-all duration-300
                                {activeSection === section.id
										? 'scale-100 bg-[#1a5f4a] ring-4 ring-[#1a5f4a]/20'
										: 'bg-gray-300 group-hover:bg-[#4caf50]/50'}"
								></span>
							</div>

							<!-- Label -->
							<span
								class="text-sm font-medium tracking-wide transition-all duration-300
                            {activeSection === section.id
									? 'text-[#1a5f4a] opacity-100'
									: 'text-gray-500 group-hover:text-gray-800'}"
							>
								{section.label}
							</span>

							<!-- Icon indicator (only for active item) -->
							<span
								class="ml-2 opacity-0 transition-opacity duration-300 {activeSection === section.id
									? 'opacity-100'
									: ''}"
							>
								{#if section.icon === 'mission'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-[#1a5f4a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								{:else if section.icon === 'story'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-[#1a5f4a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
										/>
									</svg>
								{:else if section.icon === 'technology'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-[#1a5f4a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								{:else if section.icon === 'team'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-[#1a5f4a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
								{:else if section.icon === 'commitment'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 text-[#1a5f4a]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								{/if}
							</span>
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
{/if}

<style>
	/* Clean hover effect */
	button {
		position: relative;
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
	}

	button:hover {
		background-color: rgba(244, 244, 244, 0.7);
	}

	/* Subtle animation for active dot */
	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(26, 95, 74, 0.4);
		}
		70% {
			box-shadow: 0 0 0 6px rgba(26, 95, 74, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(26, 95, 74, 0);
		}
	}
</style>
