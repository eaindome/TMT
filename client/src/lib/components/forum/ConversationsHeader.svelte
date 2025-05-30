<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let unreadCount = 0;

	const dispatch = createEventDispatcher();

	let showFilters = false;

	function toggleFilters() {
		showFilters = !showFilters;
	}

	function markAllAsRead() {
		dispatch('markAllRead');
	}

	function handleFilterChange(key: string, value: any) {
		dispatch('filterChange', { [key]: value });
	}
</script>

<div class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="flex items-center text-2xl font-bold text-gray-900">
					<Icon name="chat" className="w-6 h-6 mr-3 text-[#1a5f4a]" />
					Conversations
					{#if unreadCount > 0}
						<span
							class="ml-2 inline-flex items-center rounded-full bg-[#1a5f4a] px-2.5 py-0.5 text-xs font-medium text-white"
						>
							{unreadCount} unread
						</span>
					{/if}
				</h1>
				<p class="mt-1 text-sm text-gray-600">Your mentions, replies, and direct messages</p>
			</div>

			<div class="mt-4 flex items-center space-x-3 sm:mt-0">
				{#if unreadCount > 0}
					<button
						on:click={markAllAsRead}
						class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-[#1a5f4a] transition-colors hover:bg-[#1a5f4a]/5 hover:text-[#2c8a6d]"
					>
						<Icon name="check" className="w-4 h-4 mr-1" />
						Mark all read
					</button>
				{/if}

				<button
					on:click={toggleFilters}
					class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					<Icon name="filter" className="w-4 h-4 mr-1" />
					Filters
				</button>
			</div>
		</div>

		<!-- Filters Panel -->
		{#if showFilters}
			<div class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<label for="timeRange" class="mb-2 block text-sm font-medium text-gray-700">Time Range</label>
						<select
							id="timeRange"
							class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a]"
							on:change={(e) => handleFilterChange('timeRange', (e.target as HTMLSelectElement).value)}
						>
							<option value="all">All time</option>
							<option value="today">Today</option>
							<option value="week">This week</option>
							<option value="month">This month</option>
						</select>
					</div>

					<div class="flex items-center">
						<label class="flex items-center">
							<input
								type="checkbox"
								class="h-4 w-4 rounded border-gray-300 text-[#1a5f4a] focus:ring-[#1a5f4a]"
								on:change={(e) => handleFilterChange('unreadOnly', e.target && (e.target as HTMLInputElement).checked)}
							/>
							<span class="ml-2 text-sm text-gray-700">Show unread only</span>
						</label>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
