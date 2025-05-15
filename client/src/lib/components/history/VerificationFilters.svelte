<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let searchQuery = '';
	export let dateFilter = '';
	export let resultFilter = '';
	export let animate = true;

	const dispatch = createEventDispatcher();
	let mounted = false;
	let showMobileFilters = false;

	onMount(() => {
		mounted = true;
	});

	function handleSearchInput(event: Event) {
		searchQuery = (event.target as HTMLInputElement).value;
		dispatchFilters();
	}

	function handleDateChange(event: Event) {
		dateFilter = (event.target as HTMLInputElement).value;
		dispatchFilters();
	}

	function handleResultChange(event: Event) {
		resultFilter = (event.target as HTMLSelectElement).value;
		dispatchFilters();
	}

	function dispatchFilters() {
		dispatch('filterChange', {
			searchQuery,
			dateFilter,
			resultFilter
		});
	}

	function resetFilters() {
		searchQuery = '';
		dateFilter = '';
		resultFilter = '';
		dispatchFilters();
	}

	$: filtersActive = searchQuery || dateFilter || resultFilter;
	$: resultsLabel =
		resultFilter === 'safe'
			? 'Safe'
			: resultFilter === 'caution'
				? 'Caution'
				: resultFilter === 'fake'
					? 'Fake'
					: 'All Results';
</script>

<div class="overflow-hidden rounded-xl bg-white shadow-md">
	<!-- Filters header visible on mobile -->
	<div class="flex items-center justify-between border-b border-gray-100 px-4 py-3 md:hidden">
		<h3 class="font-medium text-gray-700">Search & Filters</h3>
		<button
			class="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-[#1a5f4a]"
			on:click={() => (showMobileFilters = !showMobileFilters)}
			aria-label={showMobileFilters ? 'Hide filters' : 'Show filters'}
		>
			<svg
				class="h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				{#if showMobileFilters}
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				{/if}
			</svg>
		</button>
	</div>

	<!-- Filters container -->
	<div class="{showMobileFilters ? 'block' : 'hidden'} p-4 md:block">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-12">
			<!-- Search Bar -->
			<div class="md:col-span-6" class:animate-fadeInLeft={mounted && animate}>
				<label for="search-query" class="mb-1 block text-sm font-medium text-gray-700">Search</label
				>
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-4 w-4 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
					<input
						id="search-query"
						type="text"
						class="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 transition-colors focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a] focus:outline-none"
						placeholder="Search drug name, batch number..."
						bind:value={searchQuery}
						on:input={handleSearchInput}
					/>
					{#if searchQuery}
						<button
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
							on:click={() => {
								searchQuery = '';
								dispatchFilters();
							}}
							aria-label="Clear search"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>
			</div>

			<!-- Date Filter -->
			<div
				class="md:col-span-2"
				class:animate-fadeInLeft={mounted && animate}
				style="animation-delay: 100ms"
			>
				<label for="date-filter" class="mb-1 block text-sm font-medium text-gray-700">Date</label>
				<div class="relative">
					<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							class="h-4 w-4 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<input
						id="date-filter"
						type="date"
						class="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 transition-colors focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a] focus:outline-none"
						bind:value={dateFilter}
						on:change={handleDateChange}
					/>
					{#if dateFilter}
						<button
							class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
							on:click={() => {
								dateFilter = '';
								dispatchFilters();
							}}
							aria-label="Clear date"
						>
							<svg
								class="h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					{/if}
				</div>
			</div>

			<!-- Result Filter -->
			<div
				class="md:col-span-2"
				class:animate-fadeInLeft={mounted && animate}
				style="animation-delay: 200ms"
			>
				<label for="result-filter" class="mb-1 block text-sm font-medium text-gray-700"
					>Result</label
				>
				<div class="relative">
					<select
						id="result-filter"
						class="w-full appearance-none rounded-lg border border-gray-300 py-2.5 pr-10 pl-4 transition-colors focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a] focus:outline-none"
						bind:value={resultFilter}
						on:change={handleResultChange}
					>
						<option value="">All Results</option>
						<option value="safe">Safe</option>
						<option value="caution">Caution</option>
						<option value="fake">Fake</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
					>
						<svg
							class="h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</div>
				</div>
			</div>

			<!-- Reset Button -->
			<div
				class="md:col-span-2"
				class:animate-fadeInLeft={mounted && animate}
				style="animation-delay: 300ms"
			>
				<span class="mb-1 block text-sm font-medium text-transparent" aria-hidden="true">Reset</span>
				<button
					class="flex w-full items-center justify-center rounded-lg px-4 py-2.5 transition-colors
            {filtersActive
						? 'bg-[#1a5f4a] text-white hover:bg-[#164639]'
						: 'cursor-not-allowed bg-gray-100 text-gray-400'}"
					on:click={resetFilters}
					disabled={!filtersActive}
				>
					<svg
						class="mr-2 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Reset
				</button>
			</div>
		</div>
	</div>

	<!-- Active filters display -->
	{#if filtersActive}
		<div
			class="flex flex-wrap items-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-2.5"
			transition:fade={{ duration: 200 }}
		>
			<span class="text-xs font-medium text-gray-500">Active filters:</span>

			{#if searchQuery}
				<div
					class="inline-flex items-center rounded-full bg-[#1a5f4a]/10 px-2.5 py-1 text-xs font-medium text-[#1a5f4a]"
				>
					<span class="mr-1"
						>Search: {searchQuery.length > 15
							? searchQuery.slice(0, 15) + '...'
							: searchQuery}</span
					>
					<button
						class="ml-1 text-[#1a5f4a] hover:text-[#164639]"
						on:click={() => {
							searchQuery = '';
							dispatchFilters();
						}}
						aria-label="Remove search filter"
					>
						<svg
							class="h-3 w-3"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			{/if}

			{#if dateFilter}
				<div
					class="inline-flex items-center rounded-full bg-[#1a5f4a]/10 px-2.5 py-1 text-xs font-medium text-[#1a5f4a]"
				>
					<span class="mr-1">Date: {dateFilter}</span>
					<button
						class="ml-1 text-[#1a5f4a] hover:text-[#164639]"
						on:click={() => {
							dateFilter = '';
							dispatchFilters();
						}}
						aria-label="Remove date filter"
					>
						<svg
							class="h-3 w-3"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			{/if}

			{#if resultFilter}
				<div
					class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium
          {resultFilter === 'safe'
						? 'bg-green-100 text-green-800'
						: resultFilter === 'caution'
							? 'bg-yellow-100 text-yellow-800'
							: resultFilter === 'fake'
								? 'bg-red-100 text-red-800'
								: 'bg-[#1a5f4a]/10 text-[#1a5f4a]'}"
				>
					<span class="mr-1">Result: {resultsLabel}</span>
					<button
						class="ml-1 hover:opacity-75"
						on:click={() => {
							resultFilter = '';
							dispatchFilters();
						}}
						aria-label="Remove result filter"
					>
						<svg
							class="h-3 w-3"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Animation for staggered entrance */
	@keyframes fadeInLeft {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-fadeInLeft {
		animation: fadeInLeft 0.5s ease forwards;
	}

	/* Custom styling for date input to make it consistent across browsers */
	input[type='date'] {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	/* Subtle focus animation */
	input:focus,
	select:focus {
		box-shadow: 0 0 0 2px rgba(26, 95, 74, 0.1);
		transition: all 0.2s ease;
	}
</style>
