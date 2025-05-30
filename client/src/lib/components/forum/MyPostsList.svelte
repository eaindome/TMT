<script lang="ts">
	import MyPostCard from './MyPostCard.svelte';
	import PostCardSkeleton from './PostCardSkeleton.svelte';
	import { createEventDispatcher } from 'svelte';

	// Replace 'Post' with your actual post type/interface if available
	export let posts: any[] = [];
	export let loading = false;

	const dispatch = createEventDispatcher();

	function handleDeletePost(event: CustomEvent) {
		dispatch('deletePost', event.detail);
	}

	function handleEditPost(event: CustomEvent) {
		dispatch('editPost', event.detail);
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">Your Posts</h2>
		<span class="text-sm text-gray-500">{posts.length} posts</span>
	</div>

	{#if loading}
		{#each Array(3) as _}
			<PostCardSkeleton />
		{/each}
	{:else if posts.length === 0}
		<div class="rounded-lg border border-gray-200 bg-white p-12 text-center">
			<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
				<svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					></path>
				</svg>
			</div>
			<h3 class="mb-2 text-lg font-semibold text-gray-900">No posts found</h3>
			<p class="mb-6 text-gray-600">
				You haven't created any posts yet or none match your current filters.
			</p>
			<button
				class="inline-flex items-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c8a6d]"
			>
				Create Your First Post
			</button>
		</div>
	{:else}
		{#each posts as post}
			<MyPostCard {post} on:deletePost={handleDeletePost} on:editPost={handleEditPost} />
		{/each}
	{/if}
</div>
