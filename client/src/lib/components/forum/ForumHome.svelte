<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import ForumHeader from '$lib/components/forum/ForumHeader.svelte';
	import TrendingPosts from '$lib/components/forum/TrendingPosts.svelte';
	import PostsList from '$lib/components/forum/PostsList.svelte';
	import ForumFilters from '$lib/components/forum/ForumFilters.svelte';
	import PostCard from '$lib/components/forum/PostCard.svelte';

	// Mock data - replace with real API calls
	type Post = {
		id: number;
		title: string;
		body: string;
		drugName: string;
		tag: string;
		upvotes: number;
		comments: number;
		author: {
			name: string;
			avatar: string;
			role: string;
		};
		createdAt: string;
		isUnread: boolean;
	};

	let posts: Post[] = [];
	let trendingPosts: Post[] = [];
	let loading = true;
	let filters = {
		tag: '',
		drugName: '',
		category: '',
		sortBy: 'newest'
	};

	// Mock posts data
	const mockPosts = [
		{
			id: 1,
			title: 'Suspicious packaging on Paracetamol tablets',
			body: 'I bought some paracetamol from a local pharmacy and noticed the packaging looks different from usual. The text seems blurry and the colors are slightly off...',
			drugName: 'Paracetamol',
			tag: 'Fake',
			upvotes: 24,
			comments: 8,
			author: {
				name: 'Sarah Johnson',
				avatar: 'SJ',
				role: 'Consumer'
			},
			createdAt: '2024-12-01T10:30:00Z',
			isUnread: true
		},
		{
			id: 2,
			title: 'How to verify Metformin authenticity?',
			body: "Can someone guide me on how to properly verify if my Metformin is authentic? I want to make sure I'm taking the right medication...",
			drugName: 'Metformin',
			tag: 'Safe',
			upvotes: 15,
			comments: 12,
			author: {
				name: 'John Davis',
				avatar: 'JD',
				role: 'Consumer'
			},
			createdAt: '2024-11-30T14:15:00Z',
			isUnread: false
		},
		{
			id: 3,
			title: 'Lipitor batch recall - check your medicine',
			body: "There's been a recall on certain Lipitor batches. Please check the batch numbers on your medication and verify authenticity...",
			drugName: 'Lipitor',
			tag: 'Caution',
			upvotes: 42,
			comments: 18,
			author: {
				name: 'Dr. Michael Chen',
				avatar: 'MC',
				role: 'Pharmacist'
			},
			createdAt: '2024-11-29T09:20:00Z',
			isUnread: false
		}
	];

	onMount(async () => {
		// Simulate API loading
		setTimeout(() => {
			posts = mockPosts;
			trendingPosts = mockPosts.slice(0, 3);
			loading = false;
		}, 1000);
	});

	function handleFilterChange(event: CustomEvent) {
		filters = { ...filters, ...event.detail };
		// Apply filters logic here
		applyFilters();
	}

	function applyFilters() {
		// Filter logic implementation
		console.log('Applying filters:', filters);
	}

	function handleNewPost() {
		// Navigate to new post page
		console.log('Navigate to new post');
	}
</script>

<svelte:head>
	<title>Community Forum | TrackMyMeds</title>
	<meta
		name="description"
		content="Join the TrackMyMeds community to share experiences and verify medicine authenticity"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Forum Header -->
	<ForumHeader on:newPost={handleNewPost} />

	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<!-- Main Content -->
			<div class="space-y-6 lg:col-span-3">
				<!-- Trending Section -->
				{#if !loading && trendingPosts.length > 0}
					<div in:fade={{ duration: 300, delay: 100 }}>
						<TrendingPosts posts={trendingPosts} />
					</div>
				{/if}

				<!-- Filters -->
				<div in:fade={{ duration: 300, delay: 200 }}>
					<ForumFilters {filters} on:filterChange={handleFilterChange} />
				</div>

				<!-- Posts List -->
				<div in:fade={{ duration: 300, delay: 300 }}>
					<PostsList {posts} {loading} />
				</div>
			</div>

			<!-- Sidebar -->
			<div class="space-y-6 lg:col-span-1">
				<!-- Quick Actions -->
				<div
					class="rounded-lg border border-gray-200 bg-white p-6"
					in:fade={{ duration: 300, delay: 400 }}
				>
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
					<div class="space-y-3">
						<button
							on:click={handleNewPost}
							class="flex w-full items-center justify-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-white transition-colors hover:bg-[#2c8a6d]"
						>
							<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4v16m8-8H4"
								></path>
							</svg>
							Post Your Experience
						</button>

						<button
							class="w-full rounded-lg bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
						>
							Browse Categories
						</button>
					</div>
				</div>

				<!-- Forum Stats -->
				<div
					class="rounded-lg border border-gray-200 bg-white p-6"
					in:fade={{ duration: 300, delay: 500 }}
				>
					<h3 class="mb-4 text-lg font-semibold text-gray-900">Community Stats</h3>
					<div class="space-y-3">
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Total Posts</span>
							<span class="font-semibold text-[#1a5f4a]">1,247</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Active Members</span>
							<span class="font-semibold text-[#1a5f4a]">892</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-gray-600">Verified Reports</span>
							<span class="font-semibold text-green-600">3,456</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
