<script lang="ts">
    import SavedPostCard from './SavedPostCard.svelte';
    import PostCardSkeleton from './PostCardSkeleton.svelte';
    import { createEventDispatcher } from 'svelte';

    export let posts: any[] = [];
    export let loading = false;

    const dispatch = createEventDispatcher();

    function handleRemoveFromSaved(event: CustomEvent) {
        dispatch('removeFromSaved', event.detail);
    }

    function handleViewPost(event: CustomEvent) {
        dispatch('viewPost', event.detail);
    }
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Your Saved Posts</h2>
        <span class="text-sm text-gray-500">{posts.length} saved</span>
    </div>

    {#if loading}
        {#each Array(3) as _}
            <PostCardSkeleton />
        {/each}
    {:else if posts.length === 0}
        <div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No saved posts found</h3>
            <p class="text-gray-600 mb-6">You haven't saved any posts yet or none match your current filters.</p>
            <a href="/forum" class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors">
                Explore Forum
            </a>
        </div>
    {:else}
        {#each posts as post}
            <SavedPostCard {post} on:removeFromSaved={handleRemoveFromSaved} on:viewPost={handleViewPost} />
        {/each}
    {/if}
</div>