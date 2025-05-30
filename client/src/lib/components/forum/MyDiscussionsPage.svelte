<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import MyDiscussionsHeader from '$lib/components/forum/MyDiscussionsHeader.svelte';
    import MyDiscussionsList from '$lib/components/forum/MyDiscussionsList.svelte';
    import MyDiscussionsFilters from '$lib/components/forum/MyDiscussionsFilters.svelte';
    import EmptyState from '$lib/components/forum/EmptyState.svelte';

    type Discussion = {
        id: number;
        postId: number;
        postTitle: string;
        postAuthor: string;
        commentId: number;
        commentContent: string;
        commentSnippet: string;
        createdAt: string;
        updatedAt: string;
        tag: string;
        drugName: string;
        upvotes: number;
        replies: number;
        isLatest: boolean;
        postStatus: 'active' | 'locked' | 'archived';
    };

    let discussions: Discussion[] = [];
    let loading = true;
    let filters = {
        dateRange: 'all',
        tag: 'all',
        sortBy: 'newest',
        searchQuery: '',
        postStatus: 'all'
    };

    // Mock discussions data
    const mockDiscussions: Discussion[] = [
        {
            id: 1,
            postId: 101,
            postTitle: 'Suspicious packaging on Paracetamol tablets',
            postAuthor: 'Sarah Johnson',
            commentId: 301,
            commentContent: 'I had a similar experience last month. The key thing to check is the holographic seal on the back of the packaging. Authentic Paracetamol should have a clear, crisp hologram that changes when you tilt it.',
            commentSnippet: 'I had a similar experience last month. The key thing to check is the holographic seal...',
            createdAt: '2024-12-01T15:30:00Z',
            updatedAt: '2024-12-01T15:30:00Z',
            tag: 'Fake',
            drugName: 'Paracetamol',
            upvotes: 12,
            replies: 3,
            isLatest: true,
            postStatus: 'active'
        },
        {
            id: 2,
            postId: 102,
            postTitle: 'How to verify Metformin authenticity?',
            postAuthor: 'Dr. Michael Chen',
            commentId: 302,
            commentContent: 'Great question! Here are the key verification steps: 1) Check the batch number with the manufacturer, 2) Verify the packaging design matches official samples, 3) Look for proper regulatory markings.',
            commentSnippet: 'Great question! Here are the key verification steps: 1) Check the batch number...',
            createdAt: '2024-11-30T10:15:00Z',
            updatedAt: '2024-11-30T10:15:00Z',
            tag: 'Safe',
            drugName: 'Metformin',
            upvotes: 8,
            replies: 5,
            isLatest: false,
            postStatus: 'active'
        },
        {
            id: 3,
            postId: 103,
            postTitle: 'Lipitor batch recall information',
            postAuthor: 'Health Authority',
            commentId: 303,
            commentContent: 'Thank you for sharing this important information. I\'ve checked my Lipitor stock and found one bottle from the affected batch. Will be returning it to the pharmacy immediately.',
            commentSnippet: 'Thank you for sharing this important information. I\'ve checked my Lipitor stock...',
            createdAt: '2024-11-29T14:45:00Z',
            updatedAt: '2024-11-29T14:45:00Z',
            tag: 'Caution',
            drugName: 'Lipitor',
            upvotes: 15,
            replies: 2,
            isLatest: false,
            postStatus: 'active'
        },
        {
            id: 4,
            postId: 104,
            postTitle: 'Aspirin quality concerns discussion',
            postAuthor: 'Maria Rodriguez',
            commentId: 304,
            commentContent: 'I\'ve been following this discussion closely. Based on my experience as a pharmacist, these quality indicators are indeed concerning and worth investigating further.',
            commentSnippet: 'I\'ve been following this discussion closely. Based on my experience as a pharmacist...',
            createdAt: '2024-11-28T09:20:00Z',
            updatedAt: '2024-11-28T16:30:00Z',
            tag: 'Caution',
            drugName: 'Aspirin',
            upvotes: 6,
            replies: 1,
            isLatest: false,
            postStatus: 'locked'
        }
    ];

    onMount(async () => {
        // Simulate API loading
        setTimeout(() => {
            discussions = mockDiscussions;
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
        // Navigate to the specific post
    }

    function handleViewComment(event: CustomEvent) {
        const { postId, commentId } = event.detail;
        console.log('Navigate to comment:', { postId, commentId });
        // Navigate to the specific comment in the post
    }

    $: filteredDiscussions = discussions.filter(discussion => {
        if (filters.dateRange !== 'all') {
            const discussionDate = new Date(discussion.createdAt);
            const now = new Date();
            const daysDiff = Math.floor((now.getTime() - discussionDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (filters.dateRange === 'today' && daysDiff > 0) return false;
            if (filters.dateRange === 'week' && daysDiff > 7) return false;
            if (filters.dateRange === 'month' && daysDiff > 30) return false;
        }
        
        if (filters.tag !== 'all' && discussion.tag !== filters.tag) return false;
        if (filters.postStatus !== 'all' && discussion.postStatus !== filters.postStatus) return false;
        
        if (filters.searchQuery && 
            !discussion.postTitle.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !discussion.drugName.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !discussion.commentContent.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
            return false;
        }
        
        return true;
    });

    $: discussionStats = {
        total: discussions.length,
        thisWeek: discussions.filter(d => {
            const discussionDate = new Date(d.createdAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return discussionDate >= weekAgo;
        }).length,
        totalUpvotes: discussions.reduce((sum, d) => sum + d.upvotes, 0),
        totalReplies: discussions.reduce((sum, d) => sum + d.replies, 0)
    };
</script>

<svelte:head>
    <title>My Discussions | Community Forum | TrackMyMeds</title>
    <meta name="description" content="View and manage all your comments and engagements in the TrackMyMeds community" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <MyDiscussionsHeader {discussionStats} />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Filters -->
        <div in:fade={{ duration: 300, delay: 100 }}>
            <MyDiscussionsFilters {filters} on:filterChange={handleFilterChange} />
        </div>

        <!-- Discussions List -->
        <div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
            {#if loading}
                <MyDiscussionsList 
                    discussions={[]} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                    on:viewComment={handleViewComment} 
                />
            {:else if filteredDiscussions.length === 0}
                <EmptyState type="my-discussions" {filters} />
            {:else}
                <MyDiscussionsList 
                    discussions={filteredDiscussions} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                    on:viewComment={handleViewComment} 
                />
            {/if}
        </div>
    </div>
</div>