<script lang="ts">
	interface Post {
		title: string;
		tag: string;
		drugName: string;
		upvotes: number;
		comments: number;
	}

	export let posts: Post[] = [];
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
	<div class="border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4">
		<div class="flex items-center">
			<div class="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
				<svg class="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
						clip-rule="evenodd"
					></path>
				</svg>
			</div>
			<h2 class="ml-3 text-lg font-semibold text-gray-900">🔥 Trending Posts</h2>
		</div>
	</div>

	<div class="divide-y divide-gray-200">
		{#each posts as post, index}
			<div class="p-4 transition-colors hover:bg-gray-50">
				<div class="flex items-start space-x-3">
					<div class="flex-shrink-0">
						<div
							class="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] text-xs font-medium text-white"
						>
							{index + 1}
						</div>
					</div>

					<div class="min-w-0 flex-1">
						<div class="flex items-center space-x-2">
							<h3 class="truncate text-sm font-medium text-gray-900">{post.title}</h3>
							<span
								class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-{post.tag ===
								'Safe'
									? 'green'
									: post.tag === 'Fake'
										? 'red'
										: 'yellow'}-100 text-{post.tag === 'Safe'
									? 'green'
									: post.tag === 'Fake'
										? 'red'
										: 'yellow'}-800"
							>
								{post.tag}
							</span>
						</div>

						<div class="mt-1 flex items-center text-xs text-gray-500">
							<span>{post.drugName}</span>
							<span class="mx-1">•</span>
							<span>{post.upvotes} upvotes</span>
							<span class="mx-1">•</span>
							<span>{post.comments} comments</span>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
