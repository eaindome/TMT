<script lang="ts">
	import Sidebar from '$lib/components/layouts/Sidebar.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import NotificationPanel from '$lib/components/ui/NotificationPanel.svelte';

	// Sidebar state management
	let sidebarExpanded = true;
	let showMobileSidebar = false;
	let innerWidth = browser ? window.innerWidth : 1024;

	$: isSmallScreen = innerWidth < 1024;

	// Handle window resize
	function handleResize() {
		innerWidth = window.innerWidth;
		if (innerWidth >= 1024) {
			showMobileSidebar = false;
		}
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}
	});

	// Toggle mobile sidebar
	function toggleMobileSidebar() {
		showMobileSidebar = !showMobileSidebar;
	}
</script>

<div class="flex h-screen overflow-visible bg-gray-50">
	<!-- Desktop Sidebar -->
	<Sidebar expanded={sidebarExpanded} />

	<!-- Mobile Sidebar -->
	{#if showMobileSidebar}
		<button
			type="button"
			class="fixed inset-0 z-40 lg:hidden"
			aria-label="Close mobile sidebar"
			on:click={() => (showMobileSidebar = false)}
			on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && (showMobileSidebar = false)}
		>
			<div class="absolute inset-0 bg-gray-600 opacity-75"></div>
		</button>
		<Sidebar mobile={true} expanded={true} />
	{/if}

	<!-- Main Content -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<!-- Top navbar -->
		<header class="border-b border-gray-200 bg-white shadow-sm lg:hidden">
			<div class="flex h-16 items-center justify-between px-4">
				<div class="flex items-center">
					<button
						type="button"
						class="text-gray-500 focus:outline-none lg:hidden"
						on:click={toggleMobileSidebar}
						aria-label="Toggle mobile sidebar"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
					<div class="ml-3">
						<a href="/" class="flex items-center">
							<div class="flex items-center justify-center rounded-full bg-[#1a5f4a] p-1.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="white"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M21 12.79A9 9 0 1111.21 3 7.5 7.5 0 0021 12.79z"
									/>
								</svg>
							</div>
							<span class="ml-2 text-lg font-semibold text-gray-800">TrustMyTablet</span>
						</a>
					</div>
				</div>
				<div>
					<div class="flex items-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a5f4a] text-sm font-medium text-white"
						>
							U
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
			<div class="mx-auto max-w-7xl">
				<slot />
			</div>
		</main>

		<NotificationPanel />
	</div>
</div>
