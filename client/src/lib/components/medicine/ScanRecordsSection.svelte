<script lang="ts">
	import type { ScanRecord, AuthenticityStatus } from '$lib/types/medicine.ts';

	export let scans: ScanRecord[];

	// Get status configuration based on verification status
	function getStatusConfig(status: AuthenticityStatus) {
		switch (status.toLowerCase()) {
			case 'safe':
				return {
					dotColor: 'bg-green-500',
					textColor: 'text-green-700',
					bgColor: 'bg-green-50',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>`
				};
			case 'caution':
				return {
					dotColor: 'bg-amber-500',
					textColor: 'text-amber-700',
					bgColor: 'bg-amber-50',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`
				};
			case 'fake':
				return {
					dotColor: 'bg-red-500',
					textColor: 'text-red-700',
					bgColor: 'bg-red-50',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>`
				};
			default:
				return {
					dotColor: 'bg-gray-400',
					textColor: 'text-gray-700',
					bgColor: 'bg-gray-50',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`
				};
		}
	}

	// Format date with time
	const formatDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	// Format time separately
	const formatTime = (date: Date): string => {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// Calculate time ago
	function timeAgo(date: Date): string {
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

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="flex items-center justify-between border-b border-gray-200 p-4">
		<h2 class="text-lg font-medium text-gray-900">Recent Scan Records</h2>
		{#if scans.length > 0}
			<span class="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
				{scans.length}
				{scans.length === 1 ? 'record' : 'records'}
			</span>
		{/if}
	</div>

	<div class="p-4">
		{#if scans.length > 0}
			<div class="space-y-3">
				{#each scans as scan, index}
					{@const statusConfig = getStatusConfig(scan.status)}
					<div
						class="rounded-md border border-gray-200 p-3 transition-colors hover:border-gray-300 {index ===
						0
							? 'bg-gray-50'
							: 'bg-white'}"
					>
						<div class="flex items-start justify-between gap-3">
							<div class="flex-1">
								<div class="flex items-center gap-2">
									<div class="flex items-center {statusConfig.textColor}">
										{@html statusConfig.icon}
									</div>
									<div class="text-sm font-medium">
										{scan.status.charAt(0).toUpperCase() + scan.status.slice(1)}
									</div>
									<div class="ml-1 text-xs text-gray-500">{timeAgo(scan.date)}</div>
								</div>

								<div class="mt-2 flex flex-col gap-1.5">
									<div class="flex items-start gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mt-0.5 h-3.5 w-3.5 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
										<span class="text-sm text-gray-700">{scan.location}</span>
									</div>

									<div class="flex items-start gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mt-0.5 h-3.5 w-3.5 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										<span class="text-sm text-gray-700">{scan.user}</span>
									</div>
								</div>
							</div>

							<div class="flex flex-col items-end text-right">
								<span class="text-xs font-medium text-gray-500">{formatDate(scan.date)}</span>
								<span class="mt-0.5 text-xs text-gray-400">{formatTime(scan.date)}</span>
							</div>
						</div>
					</div>
				{/each}
			</div>

			{#if scans.length > 3}
				<div class="mt-4 border-t border-gray-100 pt-3 text-center">
					<a
						href="/verification-history"
						class="inline-flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-[#1a5f4a]"
					>
						View complete scan history
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-1 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				</div>
			{/if}
		{:else}
			<div class="py-6 text-center">
				<div
					class="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-gray-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</div>
				<p class="text-sm text-gray-500">No scan records available for this medicine.</p>
			</div>
		{/if}
	</div>
</div>
