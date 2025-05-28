<script lang="ts">
	export let title: string;
	export let description: string;
	export let icon: string = '📄';
	export let category: string;
	export let tags: string[] = [];
	export let lastUpdated: string;
	export let downloadCount: number = 0;
	export let fileSize: string = '';
	export let fileType: string = '';
	export let downloadUrl: string = '';
	export let previewUrl: string = '';
	export let featured: boolean = false;
	export let verified: boolean = false;
	export let rating: number = 0;
	export let reviewCount: number = 0;

	function formatDownloadCount(count: number): string {
		if (count >= 1000) {
			return (count / 1000).toFixed(1) + 'k';
		}
		return count.toString();
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getCategoryColor(category: string): string {
		const colors: Record<string, string> = {
			Guide: 'bg-blue-100 text-blue-800',
			Report: 'bg-green-100 text-green-800',
			Research: 'bg-purple-100 text-purple-800',
			App: 'bg-orange-100 text-orange-800',
			Document: 'bg-gray-100 text-gray-800'
		};
		return colors[category] || 'bg-gray-100 text-gray-800';
	}

	function downloadResource() {
		if (downloadUrl) {
			window.open(downloadUrl, '_blank');
		}
	}

	function previewResource() {
		if (previewUrl) {
			window.open(previewUrl, '_blank');
		}
	}

	function renderStars(rating: number): string {
		const fullStars = '★'.repeat(Math.floor(rating));
		const emptyStars = '☆'.repeat(5 - Math.floor(rating));
		return fullStars + emptyStars;
	}
</script>

<div
	class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg {featured
		? 'ring-2 ring-yellow-400'
		: ''}"
>
	{#if featured}
		<div
			class="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 text-center text-xs font-medium text-white"
		>
			⭐ Featured Resource
		</div>
	{/if}

	<div class="p-6">
		<!-- Header -->
		<div class="mb-4 flex items-start justify-between">
			<div class="flex items-center space-x-3">
				<div class="text-3xl">{icon}</div>
				<div class="flex-1">
					<h3 class="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
					<div class="flex items-center space-x-2">
						<span
							class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getCategoryColor(
								category
							)}"
						>
							{category}
						</span>
						{#if verified}
							<span
								class="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800"
							>
								✓ Verified
							</span>
						{/if}
					</div>
				</div>
			</div>

			{#if rating > 0}
				<div class="text-right">
					<div class="text-sm text-yellow-400">{renderStars(rating)}</div>
					<div class="text-xs text-gray-500">{reviewCount} reviews</div>
				</div>
			{/if}
		</div>

		<!-- Description -->
		<p class="mb-4 text-sm leading-relaxed text-gray-600">{description}</p>

		<!-- Tags -->
		{#if tags.length > 0}
			<div class="mb-4 flex flex-wrap gap-1">
				{#each tags as tag}
					<span
						class="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
					>
						#{tag}
					</span>
				{/each}
			</div>
		{/if}

		<!-- File Info -->
		<div class="mb-4 flex items-center justify-between text-sm text-gray-500">
			<div class="flex items-center space-x-4">
				{#if fileType}
					<span class="flex items-center">
						<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
								clip-rule="evenodd"
							/>
						</svg>
						{fileType.toUpperCase()}
					</span>
				{/if}
				{#if fileSize}
					<span class="flex items-center">
						<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						{fileSize}
					</span>
				{/if}
				{#if downloadCount > 0}
					<span class="flex items-center">
						<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
						{formatDownloadCount(downloadCount)} downloads
					</span>
				{/if}
			</div>
			<span>Updated {formatDate(lastUpdated)}</span>
		</div>

		<!-- Actions -->
		<div class="flex space-x-3">
			{#if previewUrl}
				<button
					on:click={previewResource}
					class="inline-flex flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
				>
					<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path
							fill-rule="evenodd"
							d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
							clip-rule="evenodd"
						/>
					</svg>
					Preview
				</button>
			{/if}

			<button
				on:click={downloadResource}
				class="inline-flex flex-1 items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
			>
				<svg class="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				Download
			</button>
		</div>
	</div>
</div>
