<script lang="ts">
	import type { Verification } from '$lib/types/history.ts';

	export let verifications: Verification[] = [];

	// Format date string for display
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	// Get status color class based on verification status
	function getStatusConfig(status: string) {
		switch (status.toLowerCase()) {
			case 'safe':
				return {
					dotColor: 'bg-green-500',
					textColor: 'text-green-700'
				};
			case 'caution':
				return {
					dotColor: 'bg-amber-500',
					textColor: 'text-amber-700'
				};
			case 'fake':
				return {
					dotColor: 'bg-red-500',
					textColor: 'text-red-700'
				};
			default:
				return {
					dotColor: 'bg-gray-400',
					textColor: 'text-gray-700'
				};
		}
	}

	function handleViewResult(id: string) {
		// This would navigate to the medicine detail page
		console.log(`Viewing result for verification ${id}`);
		// In a real implementation, you would use SvelteKit's navigation:
		// goto(`/medicine/${id}`);
	}
</script>

<div class="overflow-x-auto">
	<table class="min-w-full">
		<thead>
			<tr class="border-b border-gray-200">
				<th
					scope="col"
					class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Drug Name
				</th>
				<th
					scope="col"
					class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Status
				</th>
				<th
					scope="col"
					class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Batch Number
				</th>
				<th
					scope="col"
					class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Manufacturer
				</th>
				<th
					scope="col"
					class="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Date & Time
				</th>
				<th
					scope="col"
					class="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
				>
					Actions
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-100">
			{#if verifications.length === 0}
				<tr>
					<td colspan="6" class="px-4 py-6 text-center text-sm text-gray-500">
						No verification records found.
					</td>
				</tr>
			{:else}
				{#each verifications as verification}
					{@const status = getStatusConfig(verification.status)}
					<tr class="transition-colors hover:bg-gray-50">
						<td class="px-4 py-3.5">
							<div class="text-sm font-medium text-gray-900">{verification.drugName}</div>
						</td>
						<td class="px-4 py-3.5">
                            <span class={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                                ${verification.status.toLowerCase() === 'safe' ? 'bg-green-100 text-green-800' : 
                                verification.status.toLowerCase() === 'caution' ? 'bg-amber-100 text-amber-800' : 
                                verification.status.toLowerCase() === 'fake' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'}`}
                            >
                                <div class={`h-2 w-2 rounded-full ${status.dotColor}`}></div>
                                {verification.status.charAt(0).toUpperCase() + verification.status.slice(1)}
                            </span>
                        </td>
						<td class="px-4 py-3.5 font-mono text-sm text-gray-500">
							{verification.batchNumber}
						</td>
						<td class="px-4 py-3.5 text-sm text-gray-500">
							{verification.manufacturer}
						</td>
						<td class="px-4 py-3.5 text-sm text-gray-500">
							{formatDate(verification.timestamp)}
						</td>
						<td class="px-4 py-3.5 text-right">
							<button
								class="rounded border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#1a5f4a]/20 hover:text-[#1a5f4a]"
								on:click={() => handleViewResult(verification.id)}
							>
								View
							</button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	/* Add subtle sticky header on scroll */
	thead {
		position: sticky;
		top: 0;
		background-color: white;
		z-index: 1;
	}

	/* Custom monospace font for batch numbers */
	.font-mono {
		font-family: 'SF Mono', 'Roboto Mono', monospace;
	}
</style>
