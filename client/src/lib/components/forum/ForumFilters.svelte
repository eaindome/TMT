<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let filters: { drugName?: string; tag?: string; sortBy?: string } = {};
	const dispatch = createEventDispatcher();

	const tags = ['All', 'Safe', 'Fake', 'Caution'];
	const sortOptions = [
		{ value: 'newest', label: 'Newest First' },
		{ value: 'oldest', label: 'Oldest First' },
		{ value: 'popular', label: 'Most Popular' },
		{ value: 'comments', label: 'Most Comments' }
	];

	function updateFilter(key: string, value: any) {
		dispatch('filterChange', { [key]: value });
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4">
	<div
		class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4"
	>
		<!-- Search -->
		<div class="flex-1">
			<input
				type="text"
				placeholder="Search by drug name..."
				class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
				value={filters.drugName || ''}
				on:input={(e) => updateFilter('drugName', (e.target as HTMLInputElement)?.value)}
			/>
		</div>

		<!-- Tag Filter -->
		<div class="flex flex-wrap gap-2">
			{#each tags as tag}
				<button
					class="rounded-full px-3 py-1 text-sm font-medium transition-colors
                        {filters.tag === tag || (tag === 'All' && !filters.tag)
						? 'bg-[#1a5f4a] text-white'
						: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
					on:click={() => updateFilter('tag', tag === 'All' ? '' : tag)}
				>
					{tag}
				</button>
			{/each}
		</div>

		<!-- Sort -->
		<div>
			<select
				class="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
				value={filters.sortBy || 'newest'}
				on:change={(e) => updateFilter('sortBy', (e.target as HTMLSelectElement)?.value ?? '')}
			>
				{#each sortOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
