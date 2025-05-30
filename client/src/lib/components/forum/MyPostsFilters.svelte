<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let filters: {
		searchQuery?: string;
		status?: string;
		tag?: string;
		sortBy?: string;
	} = {};
	const dispatch = createEventDispatcher();

	const statusOptions = [
		{ value: 'all', label: 'All Status' },
		{ value: 'published', label: 'Published' },
		{ value: 'pending', label: 'Pending Review' },
		{ value: 'draft', label: 'Drafts' },
		{ value: 'archived', label: 'Archived' }
	];

	const tagOptions = [
		{ value: 'all', label: 'All Tags' },
		{ value: 'Safe', label: 'Safe' },
		{ value: 'Fake', label: 'Fake' },
		{ value: 'Caution', label: 'Caution' }
	];

	const sortOptions = [
		{ value: 'newest', label: 'Newest First' },
		{ value: 'oldest', label: 'Oldest First' },
		{ value: 'most-upvoted', label: 'Most Upvoted' },
		{ value: 'most-viewed', label: 'Most Viewed' },
		{ value: 'most-commented', label: 'Most Comments' }
	];

	function updateFilter(key: string, value: string) {
		dispatch('filterChange', { [key]: value });
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-4">
	<div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
		<!-- Search -->
		<div class="flex-1">
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Icon name="search" className="w-4 h-4 text-gray-400" />
				</div>
				<input
					type="text"
					placeholder="Search your posts..."
					class="w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
					value={filters.searchQuery || ''}
					on:input={(e) => updateFilter('searchQuery', (e.target! as HTMLInputElement).value)}
				/>
			</div>
		</div>

		<!-- Status Filter -->
		<div class="lg:w-48">
			<select
				class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
				value={filters.status || 'all'}
				on:change={(e) => updateFilter('status', (e.target! as HTMLSelectElement).value)}
			>
				{#each statusOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Tag Filter -->
		<div class="lg:w-40">
			<select
				class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
				value={filters.tag || 'all'}
				on:change={(e) => updateFilter('tag', (e.target! as HTMLInputElement).value)}
			>
				{#each tagOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Sort -->
		<div class="lg:w-48">
			<select
				class="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
				value={filters.sortBy || 'newest'}
				on:change={(e) => updateFilter('sortBy', (e.target! as HTMLInputElement).value)}
			>
				{#each sortOptions as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
