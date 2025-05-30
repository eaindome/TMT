<script lang="ts">
	import PostCard from './PostCard.svelte';
	import PostCardSkeleton from './PostCardSkeleton.svelte';

	export let posts: any[] = [];
	export let loading = false;
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">Recent Discussions</h2>
		<span class="text-sm text-gray-500">{posts.length} posts</span>
	</div>

	{#if loading}
		{#each Array(3) as _}
			<PostCardSkeleton />
		{/each}
	{:else if posts.length === 0}
		<div class="rounded-lg border border-gray-200 bg-white p-8 text-center">
			<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
					></path>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-medium text-gray-900">No posts found</h3>
			<p class="text-gray-500">Be the first to share your experience!</p>
		</div>
	{:else}
		{#each posts as post}
			<PostCard {post} />
		{/each}
	{/if}
</div>
