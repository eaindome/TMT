<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    interface Discussion {
        postId: string;
        commentId: string;
        tag: string;
        drugName: string;
        postStatus: string;
        isLatest: boolean;
        postTitle: string;
        postAuthor: string;
        createdAt: string;
        updatedAt: string;
        commentSnippet: string;
        upvotes: number;
        replies: number;
    }

    export let discussion: Discussion;
    const dispatch = createEventDispatcher();

    function getTagStyle(tag: string) {
        switch (tag) {
            case 'Safe':
                return 'bg-green-100 text-green-800';
            case 'Fake':
                return 'bg-red-100 text-red-800';
            case 'Caution':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    function getStatusStyle(status: string) {
        switch (status) {
            case 'active':
                return 'text-green-600';
            case 'locked':
                return 'text-yellow-600';
            case 'archived':
                return 'text-gray-600';
            default:
                return 'text-gray-600';
        }
    }

    function getStatusIcon(status: string) {
        switch (status) {
            case 'active':
                return 'check-circle';
            case 'locked':
                return 'lock-closed';
            case 'archived':
                return 'archive';
            default:
                return 'document-text';
        }
    }

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    function handleViewPost() {
        dispatch('viewPost', { postId: discussion.postId });
    }

    function handleViewComment() {
        dispatch('viewComment', { 
            postId: discussion.postId, 
            commentId: discussion.commentId 
        });
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
        <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-3 mb-2">
                <!-- Tag -->
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTagStyle(discussion.tag)}">
                    {discussion.tag}
                </span>

                <!-- Drug Name -->
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {discussion.drugName}
                </span>

                <!-- Post Status -->
                <span class="inline-flex items-center text-xs {getStatusStyle(discussion.postStatus)}">
                    <Icon name={getStatusIcon(discussion.postStatus)} className="w-3 h-3 mr-1" />
                    {discussion.postStatus.charAt(0).toUpperCase() + discussion.postStatus.slice(1)}
                </span>

                {#if discussion.isLatest}
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Latest
                    </span>
                {/if}
            </div>

            <!-- Post Title -->
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {discussion.postTitle}
            </h3>

            <!-- Post Author -->
            <p class="text-sm text-gray-600 mb-3">
                Original post by <span class="font-medium">{discussion.postAuthor}</span>
            </p>
        </div>

        <!-- Date -->
        <div class="flex-shrink-0 ml-4">
            <span class="text-sm text-gray-500">{formatDate(discussion.createdAt)}</span>
        </div>
    </div>

    <!-- Comment Content -->
    <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <div class="flex items-start space-x-3">
            <div class="flex-shrink-0 mt-1">
                <Icon name="chat" className="w-4 h-4 text-gray-400" />
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-700 mb-1">Your comment:</p>
                <blockquote class="text-sm text-gray-600 italic line-clamp-3">
                    "{discussion.commentSnippet}"
                </blockquote>
            </div>
        </div>
    </div>

    <!-- Metadata and Actions -->
    <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center">
                <Icon name="heart" className="w-4 h-4 mr-1" />
                {discussion.upvotes} upvotes
            </span>
            
            <span class="flex items-center">
                <Icon name="reply" className="w-4 h-4 mr-1" />
                {discussion.replies} replies
            </span>

            {#if discussion.updatedAt !== discussion.createdAt}
                <span class="flex items-center">
                    <Icon name="pencil" className="w-4 h-4 mr-1" />
                    Edited
                </span>
            {/if}
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-3">
            <button
                on:click={handleViewComment}
                class="text-sm font-medium text-[#1a5f4a] hover:text-[#2c8a6d] transition-colors"
            >
                View Comment
            </button>
            
            <span class="text-gray-300">•</span>
            
            <button
                on:click={handleViewPost}
                class="text-sm font-medium text-[#1a5f4a] hover:text-[#2c8a6d] transition-colors"
            >
                View Post →
            </button>
        </div>
    </div>
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