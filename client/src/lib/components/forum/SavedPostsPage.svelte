<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import SavedPostsHeader from '$lib/components/forum/SavedPostsHeader.svelte';
    import SavedPostsList from '$lib/components/forum/SavedPostsList.svelte';
    import SavedPostsFilters from '$lib/components/forum/SavedPostsFilters.svelte';
    import EmptyState from '$lib/components/forum/EmptyState.svelte';

    type SavedPost = {
        id: number;
        postId: number;
        title: string;
        body: string;
        drugName: string;
        tag: string;
        upvotes: number;
        comments: number;
        views: number;
        author: {
            name: string;
            avatar: string;
            role: string;
        };
        createdAt: string;
        savedAt: string;
        isUnread: boolean;
        postStatus: 'active' | 'locked' | 'archived';
        folder?: string;
    };

    let savedPosts: SavedPost[] = [];
    let loading = true;
    let filters = {
        tag: 'all',
        folder: 'all',
        sortBy: 'newest',
        searchQuery: '',
        postStatus: 'all'
    };

    // Mock saved posts data
    const mockSavedPosts: SavedPost[] = [
        {
            id: 1,
            postId: 101,
            title: 'Comprehensive guide to identifying fake Paracetamol',
            body: 'This detailed guide covers all the key indicators you should look for when verifying Paracetamol authenticity. From packaging details to physical characteristics...',
            drugName: 'Paracetamol',
            tag: 'Safe',
            upvotes: 45,
            comments: 23,
            views: 892,
            author: {
                name: 'Dr. Sarah Chen',
                avatar: 'SC',
                role: 'Pharmacist'
            },
            createdAt: '2024-11-25T10:30:00Z',
            savedAt: '2024-12-01T14:20:00Z',
            isUnread: false,
            postStatus: 'active',
            folder: 'Educational'
        },
        {
            id: 2,
            postId: 102,
            title: 'URGENT: Metformin batch recall - check your medicine',
            body: 'Health authorities have issued a recall notice for specific Metformin batches. Please check the batch numbers listed below and contact your pharmacy immediately...',
            drugName: 'Metformin',
            tag: 'Caution',
            upvotes: 78,
            comments: 34,
            views: 1543,
            author: {
                name: 'Health Authority',
                avatar: 'HA',
                role: 'Regulator'
            },
            createdAt: '2024-11-20T08:15:00Z',
            savedAt: '2024-11-30T16:45:00Z',
            isUnread: true,
            postStatus: 'active',
            folder: 'Alerts'
        },
        {
            id: 3,
            postId: 103,
            title: 'Community discussion: Aspirin quality concerns',
            body: 'Several community members have reported quality issues with a particular Aspirin brand. Let\'s discuss experiences and gather evidence...',
            drugName: 'Aspirin',
            tag: 'Fake',
            upvotes: 32,
            comments: 18,
            views: 421,
            author: {
                name: 'Maria Rodriguez',
                avatar: 'MR',
                role: 'Consumer'
            },
            createdAt: '2024-11-18T12:30:00Z',
            savedAt: '2024-11-29T10:15:00Z',
            isUnread: false,
            postStatus: 'active',
            folder: 'Research'
        },
        {
            id: 4,
            postId: 104,
            title: 'How to report suspicious medications effectively',
            body: 'Step-by-step guide on how to properly report suspicious medications to authorities. Includes contact information and required documentation...',
            drugName: 'General',
            tag: 'Safe',
            upvotes: 67,
            comments: 29,
            views: 734,
            author: {
                name: 'John Wilson',
                avatar: 'JW',
                role: 'Consumer'
            },
            createdAt: '2024-11-15T14:45:00Z',
            savedAt: '2024-11-28T09:30:00Z',
            isUnread: false,
            postStatus: 'active',
            folder: 'Educational'
        }
    ];

    onMount(async () => {
        // Simulate API loading
        setTimeout(() => {
            savedPosts = mockSavedPosts;
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

    function handleRemoveFromSaved(event: CustomEvent) {
        const postId = event.detail.postId;
        savedPosts = savedPosts.filter(post => post.postId !== postId);
        console.log('Removed from saved:', postId);
    }

    function handleViewPost(event: CustomEvent) {
        const postId = event.detail.postId;
        console.log('Navigate to post:', postId);
        // Navigate to the specific post
    }

    function handleCreateFolder() {
        console.log('Create new folder');
        // Open create folder modal
    }

    $: filteredPosts = savedPosts.filter(post => {
        if (filters.tag !== 'all' && post.tag !== filters.tag) return false;
        if (filters.folder !== 'all' && post.folder !== filters.folder) return false;
        if (filters.postStatus !== 'all' && post.postStatus !== filters.postStatus) return false;
        
        if (filters.searchQuery && 
            !post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !post.drugName.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !post.body.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
            return false;
        }
        
        return true;
    });

    // Sort filtered posts
    $: sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (filters.sortBy) {
            case 'oldest':
                return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
            case 'most-upvoted':
                return b.upvotes - a.upvotes;
            case 'most-viewed':
                return b.views - a.views;
            case 'most-commented':
                return b.comments - a.comments;
            case 'newest':
            default:
                return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
        }
    });

    $: savedStats = {
        total: savedPosts.length,
        unread: savedPosts.filter(p => p.isUnread).length,
        thisWeek: savedPosts.filter(p => {
            const savedDate = new Date(p.savedAt);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return savedDate >= weekAgo;
        }).length,
        folders: [...new Set(savedPosts.map(p => p.folder).filter(Boolean))].length
    };
</script>

<svelte:head>
    <title>Saved Posts | Community Forum | TrackMyMeds</title>
    <meta name="description" content="View and manage your saved posts from the TrackMyMeds community" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <SavedPostsHeader {savedStats} on:createFolder={handleCreateFolder} />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Filters -->
        <div in:fade={{ duration: 300, delay: 100 }}>
            <SavedPostsFilters {filters} {savedPosts} on:filterChange={handleFilterChange} />
        </div>

        <!-- Posts List -->
        <div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
            {#if loading}
                <SavedPostsList 
                    posts={[]} 
                    {loading} 
                    on:removeFromSaved={handleRemoveFromSaved} 
                    on:viewPost={handleViewPost} 
                />
            {:else if sortedPosts.length === 0}
                <EmptyState type="saved-posts" {filters} />
            {:else}
                <SavedPostsList 
                    posts={sortedPosts} 
                    {loading} 
                    on:removeFromSaved={handleRemoveFromSaved} 
                    on:viewPost={handleViewPost} 
                />
            {/if}
        </div>
    </div>
</div>