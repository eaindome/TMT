<script lang="ts">
    import TrendingPostCard from './TrendingPostCard.svelte';
    import PostCardSkeleton from './PostCardSkeleton.svelte';
    import { createEventDispatcher } from 'svelte';

    // Define the Post type according to your data structure
    type Post = {
        id: string | number;
        author: {
            avatar: string;
            name: string;
            role: string;
        };
        tag: string;
        drugName: string;
        trendingScore: number;
        title: string;
        body: string;
        createdAt: string;
        isUnread?: boolean;
        likes: number;
        comments: number;
        views: number;
        upvotes: number; // Added upvotes property
        trends: {
            upvoteGrowth: number;
            commentGrowth: number;
            viewGrowth: number;
            [key: string]: any;
        };
        // Add other fields as needed
    };

    export let posts: Post[] = [];
    export let loading = false;

    const dispatch = createEventDispatcher();

    function handleViewPost(event: CustomEvent) {
        dispatch('viewPost', event.detail);
    }
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900 flex items-center">
            <span class="text-3xl mr-2">📈</span>
            Trending Now
        </h2>
        <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {posts.length} trending posts
        </span>
    </div>

    {#if loading}
        <div class="space-y-4">
            {#each Array(5) as _}
                <PostCardSkeleton />
            {/each}
        </div>
    {:else if posts.length === 0}
        <div class="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div class="mx-auto w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mb-6">
                <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">No trending posts found</h3>
            <p class="text-gray-600 mb-6">No posts match your current filters or there's no trending content right now.</p>
            <a href="/forum" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all">
                Explore All Posts
            </a>
        </div>
    {:else}
        <div class="space-y-4">
            {#each posts as post, index}
                <TrendingPostCard {post} rank={index + 1} on:viewPost={handleViewPost} />
            {/each}
        </div>
    {/if}
</div>