<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    interface Author {
        avatar: string;
        name: string;
        role: string;
    }

    interface Post {
        postId: string;
        author: Author;
        createdAt: string;
        postStatus: string;
        isUnread: boolean;
        tag: string;
        drugName: string;
        folder?: string;
        title: string;
        body: string;
        upvotes: number;
        comments: number;
        views: number;
        savedAt: string;
    }

    export let post: Post;
    const dispatch = createEventDispatcher();

    let showRemoveConfirm = false;

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
        
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    function handleViewPost() {
        dispatch('viewPost', { postId: post.postId });
    }

    function handleRemoveFromSaved() {
        showRemoveConfirm = true;
    }

    function confirmRemove() {
        dispatch('removeFromSaved', { postId: post.postId });
        showRemoveConfirm = false;
    }

    function cancelRemove() {
        showRemoveConfirm = false;
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 {post.isUnread ? 'ring-2 ring-[#1a5f4a]/20 bg-[#1a5f4a]/2' : ''}">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
        <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-3 mb-2">
                <!-- Author Avatar -->
                <div class="w-8 h-8 bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {post.author.avatar}
                </div>

                <!-- Author Info -->
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-900">{post.author.name}</span>
                    <span class="text-xs text-gray-500">{post.author.role}</span>
                    <span class="text-xs text-gray-400">•</span>
                    <span class="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                </div>

                <!-- Status -->
                <span class="inline-flex items-center text-xs {getStatusStyle(post.postStatus)}">
                    <Icon name={getStatusIcon(post.postStatus)} className="w-3 h-3 mr-1" />
                    {post.postStatus.charAt(0).toUpperCase() + post.postStatus.slice(1)}
                </span>

                {#if post.isUnread}
                    <span class="w-2 h-2 bg-[#1a5f4a] rounded-full"></span>
                {/if}
            </div>

            <!-- Tags and Folder -->
            <div class="flex items-center space-x-2 mb-3">
                <!-- Tag -->
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTagStyle(post.tag)}">
                    {post.tag}
                </span>

                <!-- Drug Name -->
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.drugName}
                </span>

                <!-- Folder -->
                {#if post.folder}
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <Icon name="folder" className="w-3 h-3 mr-1" />
                        {post.folder}
                    </span>
                {/if}
            </div>

            <!-- Title -->
            <button
                type="button"
                class="text-left w-full text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-[#1a5f4a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/50"
                on:click={handleViewPost}
                aria-label="View post: {post.title}"
            >
                {post.title}
            </button>

            <!-- Body Snippet -->
            <p class="text-sm text-gray-600 line-clamp-3 mb-4">
                {post.body}
            </p>

            <!-- Metadata -->
            <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                    <Icon name="heart" className="w-4 h-4 mr-1" />
                    {post.upvotes}
                </span>
                
                <span class="flex items-center">
                    <Icon name="chat" className="w-4 h-4 mr-1" />
                    {post.comments}
                </span>
                
                <span class="flex items-center">
                    <Icon name="eye" className="w-4 h-4 mr-1" />
                    {post.views}
                </span>

                <span class="flex items-center text-[#1a5f4a]">
                    <Icon name="bookmark" className="w-4 h-4 mr-1" />
                    Saved {formatDate(post.savedAt)}
                </span>
            </div>
        </div>

        <!-- Actions -->
        <div class="flex items-start space-x-2 ml-4">
            <button
                on:click={handleViewPost}
                class="p-2 text-gray-400 hover:text-[#1a5f4a] hover:bg-[#1a5f4a]/5 rounded-md transition-colors"
                title="View Post"
            >
                <Icon name="external-link" className="w-4 h-4" />
            </button>

            <button
                on:click={handleRemoveFromSaved}
                class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Remove from Saved"
            >
                <Icon name="bookmark-slash" className="w-4 h-4" />
            </button>
        </div>
    </div>

    <!-- Remove Confirmation -->
    {#if showRemoveConfirm}
        <div class="border-t border-gray-200 pt-4 mt-4">
            <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <Icon name="exclamation-triangle" className="w-5 h-5 text-amber-400" />
                    </div>
                    <div class="ml-3 flex-1">
                        <h4 class="text-sm font-medium text-amber-800">Remove from Saved</h4>
                        <p class="text-sm text-amber-700 mt-1">
                            Are you sure you want to remove this post from your saved collection?
                        </p>
                        <div class="mt-3 flex space-x-3">
                            <button
                                on:click={confirmRemove}
                                class="text-sm bg-amber-600 text-white px-3 py-1.5 rounded-md hover:bg-amber-700 transition-colors"
                            >
                                Remove
                            </button>
                            <button
                                on:click={cancelRemove}
                                class="text-sm bg-white text-gray-700 border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
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