<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    export let post: {
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
        upvotes: number;
        comments: number;
        views: number;
        shares?: number;
        trends: {
            upvoteGrowth: number;
            commentGrowth: number;
            viewGrowth: number;
        };
    };
    export let rank = 1;
    const dispatch = createEventDispatcher();

    function getTagStyle(tag: string) {
        switch (tag) {
            case 'Safe':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Fake':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Caution':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    }

    function getRankStyle(rank: number) {
        switch (rank) {
            case 1:
                return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg';
            case 2:
                return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-md';
            case 3:
                return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-md';
            default:
                return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white';
        }
    }

    function getRankIcon(rank: number) {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return rank.toString();
        }
    }

    function formatNumber(num: number) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    }

    function formatGrowth(growth: number) {
        return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        
        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        return date.toLocaleDateString();
    }

    function handleClick() {
        dispatch('viewPost', { postId: post.id });
    }
</script>

<div class="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group relative overflow-hidden"
     on:click={handleClick}
     role="button"
     tabindex="0"
     on:keydown={(e) => e.key === 'Enter' && handleClick()}>
    
    <!-- Trending gradient overlay -->
    <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400"></div>
    
    <!-- Rank Badge -->
    <div class="absolute top-4 right-4">
        <div class="w-12 h-12 rounded-full {getRankStyle(rank)} flex items-center justify-center font-bold text-sm">
            {#if rank <= 3}
                <span class="text-lg">{getRankIcon(rank)}</span>
            {:else}
                #{rank}
            {/if}
        </div>
    </div>

    <div class="flex items-start space-x-4 pr-16">
        <!-- Author Avatar & Info -->
        <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] rounded-full flex items-center justify-center text-white font-medium shadow-sm">
                {post.author.avatar}
            </div>
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
            <!-- Header -->
            <div class="flex items-center space-x-3 mb-2">
                <span class="font-medium text-gray-900">{post.author.name}</span>
                <span class="text-sm text-gray-500">{post.author.role}</span>
                <span class="text-sm text-gray-400">•</span>
                <span class="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                {#if post.isUnread}
                    <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                {/if}
            </div>

            <!-- Tags -->
            <div class="flex items-center space-x-2 mb-3">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border {getTagStyle(post.tag)}">
                    {post.tag}
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {post.drugName}
                </span>
                <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200">
                    <Icon name="trending-up" className="w-3 h-3 mr-1" />
                    Score: {post.trendingScore.toFixed(1)}
                </div>
            </div>

            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {post.title}
            </h3>

            <!-- Body -->
            <p class="text-gray-600 mb-4 line-clamp-3">
                {post.body}
            </p>

            <!-- Metrics -->
            <div class="flex items-center justify-between">
                <!-- Engagement Stats -->
                <div class="flex items-center space-x-6 text-sm">
                    <div class="flex items-center space-x-1 text-red-600">
                        <Icon name="heart" className="w-4 h-4" />
                        <span class="font-medium">{formatNumber(post.upvotes)}</span>
                        <span class="text-green-600 text-xs">({formatGrowth(post.trends.upvoteGrowth)})</span>
                    </div>
                    
                    <div class="flex items-center space-x-1 text-blue-600">
                        <Icon name="chat" className="w-4 h-4" />
                        <span class="font-medium">{formatNumber(post.comments)}</span>
                        <span class="text-green-600 text-xs">({formatGrowth(post.trends.commentGrowth)})</span>
                    </div>
                    
                    <div class="flex items-center space-x-1 text-purple-600">
                        <Icon name="eye" className="w-4 h-4" />
                        <span class="font-medium">{formatNumber(post.views)}</span>
                        <span class="text-green-600 text-xs">({formatGrowth(post.trends.viewGrowth)})</span>
                    </div>

                    {#if post.shares}
                        <div class="flex items-center space-x-1 text-green-600">
                            <Icon name="share" className="w-4 h-4" />
                            <span class="font-medium">{formatNumber(post.shares)}</span>
                        </div>
                    {/if}
                </div>

                <!-- Action Button -->
                <button class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
                    <Icon name="external-link" className="w-4 h-4 mr-2" />
                    View Post
                </button>
            </div>
        </div>
    </div>

    <!-- Trending indicator animation -->
    <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>