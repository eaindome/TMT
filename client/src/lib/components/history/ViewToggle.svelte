<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let viewMode: 'table' | 'card' = 'table';
	export let animate = true;

	const dispatch = createEventDispatcher();
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function toggleView(mode: 'table' | 'card') {
		viewMode = mode;
		dispatch('viewModeChange', { viewMode });
	}

	// For animation purposes only
	$: tableIsActive = viewMode === 'table';
	$: cardIsActive = viewMode === 'card';
</script>

<div class="flex items-center space-x-3 rounded-lg bg-white px-3 py-2 shadow-sm">
	<span class="text-sm font-medium text-gray-600">View:</span>

	<div class="relative flex rounded-lg bg-gray-100 p-1">
		<!-- Animated highlight pill -->
		{#if mounted && animate}
			<div
				class="absolute inset-y-1 w-10 rounded-md bg-[#1a5f4a] transition-all duration-300 ease-out"
				style="left: {viewMode === 'table' ? '0.25rem' : 'calc(100% - 2.75rem)'}"
			></div>
		{/if}

		<!-- Table view button -->
		<button
			class="relative z-10 flex h-8 w-10 items-center justify-center rounded-md transition-all duration-200
        {tableIsActive ? 'text-white' : 'text-gray-500 hover:text-gray-700'}"
			on:click={() => toggleView('table')}
			aria-label="Table view"
			aria-pressed={tableIsActive}
		>
			{#if mounted && animate && tableIsActive}
				<div in:fly={{ y: 10, duration: 200 }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4.5 w-4.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</div>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4.5 w-4.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
			{/if}
		</button>

		<!-- Card view button -->
		<button
			class="relative z-10 flex h-8 w-10 items-center justify-center rounded-md transition-all duration-200
        {cardIsActive ? 'text-white' : 'text-gray-500 hover:text-gray-700'}"
			on:click={() => toggleView('card')}
			aria-label="Card view"
			aria-pressed={cardIsActive}
		>
			{#if mounted && animate && cardIsActive}
				<div in:fly={{ y: 10, duration: 200 }}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4.5 w-4.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						/>
					</svg>
				</div>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4.5 w-4.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
					/>
				</svg>
			{/if}
		</button>
	</div>

	<!-- Optional: Tooltip to explain views -->
	<div class="hidden items-center md:flex">
		<span class="ml-1 text-xs text-gray-400">
			{#if viewMode === 'table'}
				Tabular layout with detailed information
			{:else}
				Card layout for visual comparison
			{/if}
		</span>
	</div>
</div>

<style>
	/* Fix for button size consistency */
	button {
		flex-shrink: 0;
	}

	/* Custom size for icons */
	:global(.h-4\.5) {
		height: 1.125rem;
	}

	:global(.w-4\.5) {
		width: 1.125rem;
	}

	/* Optional animation for icon swapping */
	@keyframes fadeScale {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	button svg {
		transition: transform 0.2s ease;
	}

	button:hover svg {
		transform: scale(1.1);
	}
</style>
