<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import ActivityHeader from '$lib/components/forum/ActivityHeader.svelte';
    import ActivityTimeline from '$lib/components/forum/ActivityTimeline.svelte';
    import ActivityFilters from '$lib/components/forum/ActivityFilters.svelte';
    import EmptyState from '$lib/components/forum/EmptyState.svelte';

    type ActivityItem = {
        id: number;
        type: 'post_created' | 'comment_added' | 'upvote_given' | 'post_bookmarked' | 'reply_received';
        title: string;
        description: string;
        timestamp: string;
        relatedPost?: {
            id: number;
            title: string;
            drugName: string;
            tag: string;
        };
        relatedComment?: {
            id: number;
            content: string;
            postTitle: string;
        };
        metadata: {
            upvotes?: number;
            comments?: number;
            views?: number;
        };
    };

    let activities: ActivityItem[] = [];
    let loading = true;
    let filters = {
        timeRange: 'all',
        activityType: 'all',
        sortBy: 'newest'
    };

    // Mock activity data
    const mockActivities: ActivityItem[] = [
        {
            id: 1,
            type: 'post_created',
            title: 'You created a new post',
            description: 'Posted about suspicious Paracetamol packaging',
            timestamp: '2024-12-01T10:30:00Z',
            relatedPost: {
                id: 101,
                title: 'Suspicious packaging on Paracetamol tablets',
                drugName: 'Paracetamol',
                tag: 'Fake'
            },
            metadata: {
                upvotes: 24,
                comments: 8,
                views: 156
            }
        },
        {
            id: 2,
            type: 'upvote_given',
            title: 'You upvoted a post',
            description: 'Upvoted "How to verify Metformin authenticity"',
            timestamp: '2024-12-01T09:15:00Z',
            relatedPost: {
                id: 102,
                title: 'How to verify Metformin authenticity?',
                drugName: 'Metformin',
                tag: 'Safe'
            },
            metadata: {
                upvotes: 67,
                comments: 23
            }
        },
        {
            id: 3,
            type: 'comment_added',
            title: 'You commented on a post',
            description: 'Added helpful verification tips',
            timestamp: '2024-11-30T16:45:00Z',
            relatedComment: {
                id: 301,
                content: 'I had a similar experience last month. The key thing to check is the holographic seal on the back of the packaging...',
                postTitle: 'Lipitor batch recall information'
            },
            relatedPost: {
                id: 103,
                title: 'Lipitor batch recall information',
                drugName: 'Lipitor',
                tag: 'Caution'
            },
            metadata: {
                upvotes: 12,
                comments: 3
            }
        },
        {
            id: 4,
            type: 'post_bookmarked',
            title: 'You saved a post',
            description: 'Bookmarked comprehensive guide for future reference',
            timestamp: '2024-11-30T14:20:00Z',
            relatedPost: {
                id: 104,
                title: 'Comprehensive guide to identifying fake medicines',
                drugName: 'General',
                tag: 'Safe'
            },
            metadata: {
                upvotes: 89,
                comments: 34
            }
        },
        {
            id: 5,
            type: 'reply_received',
            title: 'Someone replied to your comment',
            description: 'Dr. Sarah Chen replied to your comment',
            timestamp: '2024-11-29T11:30:00Z',
            relatedComment: {
                id: 302,
                content: 'Thanks for sharing your experience! Your observation about the packaging differences is very helpful...',
                postTitle: 'Quality concerns with new Aspirin batch'
            },
            relatedPost: {
                id: 105,
                title: 'Quality concerns with new Aspirin batch',
                drugName: 'Aspirin',
                tag: 'Caution'
            },
            metadata: {
                upvotes: 5,
                comments: 1
            }
        },
        {
            id: 6,
            type: 'upvote_given',
            title: 'You upvoted a comment',
            description: 'Upvoted helpful verification advice',
            timestamp: '2024-11-28T15:10:00Z',
            relatedPost: {
                id: 106,
                title: 'Best practices for medicine verification',
                drugName: 'General',
                tag: 'Safe'
            },
            metadata: {
                upvotes: 45
            }
        }
    ];

    onMount(async () => {
        // Simulate API loading
        setTimeout(() => {
            activities = mockActivities;
            loading = false;
        }, 800);
    });

    function handleFilterChange(event: CustomEvent) {
        filters = { ...filters, ...event.detail };
        applyFilters();
    }

    function applyFilters() {
        console.log('Applying filters:', filters);
    }

    function handleViewPost(event: CustomEvent) {
        const postId = event.detail.postId;
        console.log('Navigate to post:', postId);
    }

    function handleViewComment(event: CustomEvent) {
        const { postId, commentId } = event.detail;
        console.log('Navigate to comment:', { postId, commentId });
    }

    $: filteredActivities = activities.filter(activity => {
        // Time range filter
        if (filters.timeRange !== 'all') {
            const activityDate = new Date(activity.timestamp);
            const now = new Date();
            const diffTime = now.getTime() - activityDate.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (filters.timeRange === 'today' && diffDays > 0) return false;
            if (filters.timeRange === 'week' && diffDays > 7) return false;
            if (filters.timeRange === 'month' && diffDays > 30) return false;
        }

        // Activity type filter
        if (filters.activityType !== 'all' && activity.type !== filters.activityType) {
            return false;
        }

        return true;
    });

    // Sort activities
    $: sortedActivities = [...filteredActivities].sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        
        return filters.sortBy === 'oldest' ? dateA - dateB : dateB - dateA;
    });

    $: activityStats = {
        total: activities.length,
        today: activities.filter(a => {
            const activityDate = new Date(a.timestamp);
            const today = new Date();
            return activityDate.toDateString() === today.toDateString();
        }).length,
        thisWeek: activities.filter(a => {
            const activityDate = new Date(a.timestamp);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return activityDate >= weekAgo;
        }).length,
        byType: {
            posts: activities.filter(a => a.type === 'post_created').length,
            comments: activities.filter(a => a.type === 'comment_added').length,
            upvotes: activities.filter(a => a.type === 'upvote_given').length,
            bookmarks: activities.filter(a => a.type === 'post_bookmarked').length
        }
    };
</script>

<svelte:head>
    <title>Recent Activity | Community Forum | TrackMyMeds</title>
    <meta name="description" content="View your recent activity and engagement in the TrackMyMeds community" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <ActivityHeader {activityStats} />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Filters -->
        <div in:fade={{ duration: 300, delay: 100 }}>
            <ActivityFilters {filters} on:filterChange={handleFilterChange} />
        </div>

        <!-- Activity Timeline -->
        <div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
            {#if loading}
                <ActivityTimeline 
                    activities={[]} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                    on:viewComment={handleViewComment} 
                />
            {:else if sortedActivities.length === 0}
                <EmptyState type="activity" {filters} />
            {:else}
                <ActivityTimeline 
                    activities={sortedActivities} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                    on:viewComment={handleViewComment} 
                />
            {/if}
        </div>
    </div>
</div>