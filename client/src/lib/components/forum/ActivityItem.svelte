<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    // Define types for relatedPost, relatedComment, and metadata
    type RelatedPost = {
        id: string;
        tag: string;
        drugName: string;
        title: string;
    };

    type RelatedComment = {
        id: string;
        content: string;
    };

    type Metadata = {
        upvotes?: number;
        comments?: number;
        views?: number;
    };

    // Define the Activity type
    interface Activity {
        type: string;
        title: string;
        description: string;
        timestamp: string | number | Date;
        relatedPost?: RelatedPost;
        relatedComment?: RelatedComment;
        metadata?: Metadata;
    }

    export let activity: Activity;
    const dispatch = createEventDispatcher();

    function getActivityIcon(type: string) {
        switch (type) {
            case 'post_created': return '📝';
            case 'comment_added': return '💬';
            case 'upvote_given': return '❤️';
            case 'post_bookmarked': return '🔖';
            case 'reply_received': return '↩️';
            default: return '🔄';
        }
    }

    function getActivityColor(type: string) {
        switch (type) {
            case 'post_created': return 'border-purple-200 bg-purple-50';
            case 'comment_added': return 'border-blue-200 bg-blue-50';
            case 'upvote_given': return 'border-red-200 bg-red-50';
            case 'post_bookmarked': return 'border-yellow-200 bg-yellow-50';
            case 'reply_received': return 'border-green-200 bg-green-50';
            default: return 'border-gray-200 bg-gray-50';
        }
    }

    function getTagStyle(tag: string) {
        switch (tag) {
            case 'Safe': return 'bg-green-100 text-green-800';
            case 'Fake': return 'bg-red-100 text-red-800';
            case 'Caution': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }

    function formatTime(timestamp: string | number | Date) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    function handleViewPost() {
        if (activity.relatedPost) {
            dispatch('viewPost', { postId: activity.relatedPost.id });
        }
    }

    function handleViewComment() {
        if (activity.relatedComment && activity.relatedPost) {
            dispatch('viewComment', { 
                postId: activity.relatedPost.id, 
                commentId: activity.relatedComment.id 
            });
        }
    }
</script>

<div class="relative">
    <!-- Timeline dot -->
    <div class="absolute left-7 w-2 h-2 bg-[#1a5f4a] rounded-full mt-2 z-10"></div>
    
    <!-- Activity Card -->
    <div class="ml-16 border rounded-lg p-4 hover:shadow-md transition-all duration-200 {getActivityColor(activity.type)}">
        <div class="flex items-start justify-between">
            <!-- Content -->
            <div class="flex-1">
                <!-- Header -->
                <div class="flex items-center space-x-3 mb-2">
                    <span class="text-lg">{getActivityIcon(activity.type)}</span>
                    <h3 class="text-sm font-semibold text-gray-900">{activity.title}</h3>
                    <span class="text-xs text-gray-500">{formatTime(activity.timestamp)}</span>
                </div>

                <!-- Description -->
                <p class="text-sm text-gray-600 mb-3">{activity.description}</p>

                <!-- Related Content -->
                {#if activity.relatedPost}
                    <div class="bg-white rounded-md p-3 mb-3 border border-gray-200">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center space-x-2 mb-1">
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {getTagStyle(activity.relatedPost.tag)}">
                                        {activity.relatedPost.tag}
                                    </span>
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {activity.relatedPost.drugName}
                                    </span>
                                </div>
                                <h4 class="text-sm font-medium text-gray-900 line-clamp-2">
                                    {activity.relatedPost.title}
                                </h4>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Comment Content -->
                {#if activity.relatedComment}
                    <div class="bg-gray-100 rounded-md p-3 mb-3">
                        <div class="flex items-start space-x-2">
                            <Icon name="chat" className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p class="text-xs font-medium text-gray-700 mb-1">
                                    {activity.type === 'reply_received' ? 'Reply:' : 'Your comment:'}
                                </p>
                                <blockquote class="text-sm text-gray-600 italic line-clamp-3">
                                    "{activity.relatedComment.content}"
                                </blockquote>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Metadata -->
                {#if activity.metadata && (activity.metadata.upvotes !== undefined || activity.metadata.comments !== undefined)}
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                        {#if activity.metadata.upvotes !== undefined}
                            <span class="flex items-center">
                                <Icon name="heart" className="w-3 h-3 mr-1" />
                                {activity.metadata.upvotes}
                            </span>
                        {/if}
                        
                        {#if activity.metadata.comments !== undefined}
                            <span class="flex items-center">
                                <Icon name="chat" className="w-3 h-3 mr-1" />
                                {activity.metadata.comments}
                            </span>
                        {/if}

                        {#if activity.metadata.views !== undefined}
                            <span class="flex items-center">
                                <Icon name="eye" className="w-3 h-3 mr-1" />
                                {activity.metadata.views}
                            </span>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- Actions -->
            <div class="flex items-start space-x-2 ml-4">
                {#if activity.type === 'comment_added' || activity.type === 'reply_received'}
                    <button
                        on:click={handleViewComment}
                        class="p-1.5 text-gray-400 hover:text-[#1a5f4a] hover:bg-white rounded-md transition-colors"
                        title="View Comment"
                    >
                        <Icon name="external-link" className="w-4 h-4" />
                    </button>
                {:else if activity.relatedPost}
                    <button
                        on:click={handleViewPost}
                        class="p-1.5 text-gray-400 hover:text-[#1a5f4a] hover:bg-white rounded-md transition-colors"
                        title="View Post"
                    >
                        <Icon name="external-link" className="w-4 h-4" />
                    </button>
                {/if}
            </div>
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