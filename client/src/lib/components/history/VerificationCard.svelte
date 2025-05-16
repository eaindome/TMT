<script lang="ts">
	import type { Verification } from '$lib/types/history.ts';
	import { goto } from '$app/navigation';

	export let verification: Verification;

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
					bgColor: 'bg-green-100',
					textColor: 'text-green-800',
					borderColor: 'border-green-200',
					iconName: 'shield-check',
					pillColor: 'bg-green-500',
					label: 'Safe'
				};
			case 'caution':
				return {
					bgColor: 'bg-yellow-100',
					textColor: 'text-yellow-800',
					borderColor: 'border-yellow-200',
					iconName: 'shield-exclamation',
					pillColor: 'bg-yellow-500',
					label: 'Caution'
				};
			case 'fake':
				return {
					bgColor: 'bg-red-100',
					textColor: 'text-red-800',
					borderColor: 'border-red-200',
					iconName: 'shield-x',
					pillColor: 'bg-red-500',
					label: 'Fake'
				};
			default:
				return {
					bgColor: 'bg-gray-100',
					textColor: 'text-gray-800',
					borderColor: 'border-gray-200',
					iconName: 'question-mark-circle',
					pillColor: 'bg-gray-500',
					label: 'Unknown'
				};
		}
	}

	function handleViewResult(id: string) {
		// This would navigate to the medicine detail page
		console.log(`Viewing result for verification ${id}`);
		// In a real implementation, you would use SvelteKit's navigation:
		goto(`/medicine/`);
	}

	// Get status config
	$: statusConfig = getStatusConfig(verification.status);

	// Time ago calculation
	function timeAgo(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

		if (seconds < 60) return 'just now';

		const minutes = Math.floor(seconds / 60);
		if (minutes < 60) return `${minutes}m ago`;

		const hours = Math.floor(minutes / 60);
		if (hours < 24) return `${hours}h ago`;

		const days = Math.floor(hours / 24);
		if (days < 30) return `${days}d ago`;

		const months = Math.floor(days / 30);
		if (months < 12) return `${months}mo ago`;

		const years = Math.floor(months / 12);
		return `${years}y ago`;
	}
</script>

<div
	class="group relative overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md border-gray-200 hover:border-gray-300"
>
	<!-- Status indicator strip -->
	<div class="absolute top-0 left-0 h-full w-1 {statusConfig.pillColor}"></div>

	<!-- Card content with padding accommodating the strip -->
	<div class="p-5 pl-6">
		<!-- Status badge -->
		<div class="mb-4 flex items-start justify-between">
			<div>
				<h3 class="mb-1 line-clamp-1 pr-20 text-lg font-semibold text-gray-900">
					{verification.drugName}
				</h3>
				<div class="flex items-center text-sm text-gray-500">
					<span class="font-medium">{verification.manufacturer}</span>
					<span class="mx-2">•</span>
					<span>{timeAgo(verification.timestamp)}</span>
				</div>
			</div>

			<div class="absolute top-5 right-5">
				<span
					class="{statusConfig.bgColor} {statusConfig.textColor} flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
				>
					<div class="h-2 w-2 rounded-full {statusConfig.pillColor}"></div>
					{statusConfig.label}
				</span>
			</div>
		</div>

		<!-- Verification details -->
		<div class="mb-5 rounded-lg border border-gray-100 bg-gray-50 p-3">
			<div class="grid grid-cols-2 gap-3">
				<div>
					<div class="mb-1 text-xs text-gray-500">Batch Number</div>
					<div class="font-mono text-sm font-medium">{verification.batchNumber}</div>
				</div>

				<div>
					<div class="mb-1 text-xs text-gray-500">Scanned On</div>
					<div class="text-sm font-medium">{formatDate(verification.timestamp)}</div>
				</div>
			</div>
		</div>

		<!-- Actions -->
		<div class="flex justify-between">
			<button
				class="flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
				on:click={() => console.log('Show history for', verification.drugName)}
			>
				<svg
					class="mr-1 h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				History
			</button>

			<button
				class="flex items-center justify-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#164639]"
				on:click={() => handleViewResult(verification.id)}
			>
				<span>View Details</span>
				<svg
					class="ml-1.5 h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>

	<!-- Optional hover indicator for better interactivity -->
	<div
		class="pointer-events-none absolute inset-0 bg-[#1a5f4a]/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
	></div>
</div>

<style>
	/* Truncate long text with ellipsis */
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	/* Better monospace font for batch numbers */
	.font-mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}

	/* Add subtle animation on hover */
	.group:hover {
		transform: translateY(-1px);
	}
</style>
