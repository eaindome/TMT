<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import TrendingHeader from '$lib/components/forum/TrendingHeader.svelte';
    import TrendingFilters from '$lib/components/forum/TrendingFilters.svelte';
    import TrendingPostsList from '$lib/components/forum/TrendingPostsList.svelte';
    import EmptyState from '$lib/components/forum/EmptyState.svelte';

    type TrendingPost = {
        id: number;
        title: string;
        body: string;
        drugName: string;
        tag: string;
        upvotes: number;
        comments: number;
        views: number;
        shares?: number;
        likes: number; // Added likes property
        author: {
            name: string;
            avatar: string;
            role: string;
        };
        createdAt: string;
        isUnread: boolean;
        trendingScore: number;
        rank: number;
        trends: {
            upvoteGrowth: number;
            commentGrowth: number;
            viewGrowth: number;
        };
    };

    let posts: TrendingPost[] = [];
    let loading = true;
    let filters = {
        timeRange: '24h',
        tag: 'all',
        drugName: '',
        sortBy: 'trending',
        searchQuery: ''
    };

    const mockTrendingPosts: TrendingPost[] = [
        {
            id: 1,
            title: 'URGENT: Major counterfeit Paracetamol batch discovered across multiple pharmacies',
            body: 'Health authorities have identified a sophisticated counterfeit operation distributing fake Paracetamol tablets across several major pharmacy chains. The fake tablets contain dangerous substances...',
            drugName: 'Paracetamol',
            tag: 'Fake',
            upvotes: 234,
            comments: 89,
            views: 4521,
            shares: 156,
            likes: 200,
            author: {
                name: 'Dr. Sarah Mitchell',
                avatar: 'SM',
                role: 'Pharmacist'
            },
            createdAt: '2024-12-01T06:30:00Z',
            isUnread: true,
            trendingScore: 98.5,
            rank: 1,
            trends: {
                upvoteGrowth: 45.2,
                commentGrowth: 67.8,
                viewGrowth: 234.5
            }
        },
        {
            id: 2,
            title: 'Comprehensive guide: How to verify authentic Metformin - Updated 2024',
            body: 'With increasing reports of counterfeit diabetes medications, this updated guide provides the latest verification methods for Metformin authenticity...',
            drugName: 'Metformin',
            tag: 'Safe',
            upvotes: 187,
            comments: 64,
            views: 3892,
            shares: 98,
            likes: 150,
            author: {
                name: 'Health Authority Official',
                avatar: 'HA',
                role: 'Regulator'
            },
            createdAt: '2024-11-30T14:15:00Z',
            isUnread: false,
            trendingScore: 89.3,
            rank: 2,
            trends: {
                upvoteGrowth: 23.1,
                commentGrowth: 34.5,
                viewGrowth: 156.7
            }
        },
        {
            id: 3,
            title: 'Community Alert: Suspicious Aspirin packaging - Please verify before use',
            body: 'Multiple community members have reported receiving Aspirin with unusual packaging. The boxes appear legitimate but have subtle differences...',
            drugName: 'Aspirin',
            tag: 'Caution',
            upvotes: 156,
            comments: 73,
            views: 2847,
            shares: 67,
            likes: 120,
            author: {
                name: 'Community Moderator',
                avatar: 'CM',
                role: 'Moderator'
            },
            createdAt: '2024-11-30T09:45:00Z',
            isUnread: false,
            trendingScore: 78.9,
            rank: 3,
            trends: {
                upvoteGrowth: 31.4,
                commentGrowth: 89.2,
                viewGrowth: 98.3
            }
        },
        {
            id: 4,
            title: 'Breaking: New technology helps identify fake medicines instantly',
            body: 'Researchers have developed a portable device that can instantly detect counterfeit medications using advanced spectroscopy...',
            drugName: 'General',
            tag: 'Safe',
            upvotes: 143,
            comments: 45,
            views: 2234,
            shares: 89,
            likes: 110,
            author: {
                name: 'Tech Research Lab',
                avatar: 'TR',
                role: 'Researcher'
            },
            createdAt: '2024-11-29T16:20:00Z',
            isUnread: false,
            trendingScore: 72.1,
            rank: 4,
            trends: {
                upvoteGrowth: 18.7,
                commentGrowth: 12.3,
                viewGrowth: 67.8
            }
        },
        {
            id: 5,
            title: 'Insulin shortage leads to increased counterfeit concerns - What to watch for',
            body: 'The ongoing insulin shortage has created opportunities for counterfeit products to enter the market. Here are key warning signs...',
            drugName: 'Insulin',
            tag: 'Caution',
            upvotes: 128,
            comments: 67,
            views: 1987,
            shares: 54,
            likes: 90,
            author: {
                name: 'Dr. Michael Chen',
                avatar: 'MC',
                role: 'Endocrinologist'
            },
            createdAt: '2024-11-29T11:10:00Z',
            isUnread: false,
            trendingScore: 68.4,
            rank: 5,
            trends: {
                upvoteGrowth: 25.3,
                commentGrowth: 45.6,
                viewGrowth: 78.9
            }
        }
    ];

    onMount(async () => {
        // Simulate API loading
        setTimeout(() => {
            posts = mockTrendingPosts;
            loading = false;
        }, 800);
    });

    function handleFilterChange(event: CustomEvent) {
        filters = { ...filters, ...event.detail };
        applyFilters();
    }

    function applyFilters() {
        console.log('Applying filters:', filters);
        // Here you would typically refetch data or filter existing data
    }

    function handleViewPost(event: CustomEvent) {
        const postId = event.detail.postId;
        console.log('Navigate to post:', postId);
        // Navigate to the specific post
    }

    // Filter and sort posts based on current filters
    $: filteredPosts = posts.filter(post => {
        if (filters.tag !== 'all' && post.tag !== filters.tag) return false;
        if (filters.drugName && !post.drugName.toLowerCase().includes(filters.drugName.toLowerCase())) return false;
        if (filters.searchQuery && 
            !post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !post.body.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
            !post.drugName.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
            return false;
        }
        return true;
    });

    // Sort filtered posts
    $: sortedPosts = [...filteredPosts].sort((a, b) => {
        switch (filters.sortBy) {
            case 'comments':
                return b.comments - a.comments;
            case 'upvotes':
                return b.upvotes - a.upvotes;
            case 'views':
                return b.views - a.views;
            case 'shares':
                return (b.shares || 0) - (a.shares || 0);
            case 'trending':
            default:
                return b.trendingScore - a.trendingScore;
        }
    });

    $: trendingStats = {
        totalPosts: posts.length,
        avgGrowth: posts.length > 0 ? posts.reduce((sum, p) => sum + p.trends.upvoteGrowth, 0) / posts.length : 0,
        topCategory: getTopCategory(),
        timeRange: filters.timeRange
    };

    function getTopCategory() {
        const categories = posts.reduce((acc: Record<string, number>, post) => {
            acc[post.tag] = (acc[post.tag] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(categories).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Safe';
    }
</script>

<svelte:head>
    <title>Trending Posts | Community Forum | TrackMyMeds</title>
    <meta name="description" content="Discover the most popular and trending discussions in the TrackMyMeds community" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <TrendingHeader {trendingStats} />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Filters -->
        <div in:fade={{ duration: 300, delay: 100 }}>
            <TrendingFilters {filters} on:filterChange={handleFilterChange} />
        </div>

        <!-- Trending Posts List -->
        <div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
            {#if loading}
                <TrendingPostsList 
                    posts={[]} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                />
            {:else if sortedPosts.length === 0}
                <EmptyState type="trending" {filters} />
            {:else}
                <TrendingPostsList 
                    posts={sortedPosts} 
                    {loading} 
                    on:viewPost={handleViewPost} 
                />
            {/if}
        </div>
    </div>
</div>