<script lang="ts">
    import MyDiscussionCard from './MyDiscussionCard.svelte';
    import PostCardSkeleton from './PostCardSkeleton.svelte';
    import { createEventDispatcher } from 'svelte';

    export let discussions: any[] = [];
    export let loading = false;

    const dispatch = createEventDispatcher();

    function handleViewPost(event: CustomEvent) {
        dispatch('viewPost', event.detail);
    }

    function handleViewComment(event: CustomEvent) {
        dispatch('viewComment', event.detail);
    }
</script>

<div class="space-y-4">
    <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Your Discussions</h2>
        <span class="text-sm text-gray-500">{discussions.length} comments</span>
    </div>

    {#if loading}
        {#each Array(3) as _}
            <PostCardSkeleton />
        {/each}
    {:else if discussions.length === 0}
        <div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No discussions found</h3>
            <p class="text-gray-600 mb-6">You haven't commented on any posts yet or none match your current filters.</p>
            <a href="/forum" class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors">
                Explore Forum
            </a>
        </div>
    {:else}
        {#each discussions as discussion}
            <MyDiscussionCard {discussion} on:viewPost={handleViewPost} on:viewComment={handleViewComment} />
        {/each}
    {/if}
</div>