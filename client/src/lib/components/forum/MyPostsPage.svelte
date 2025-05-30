<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import MyPostsHeader from '$lib/components/forum/MyPostsHeader.svelte';
	import MyPostsList from '$lib/components/forum/MyPostsList.svelte';
	import MyPostsFilters from '$lib/components/forum/MyPostsFilters.svelte';
	import EmptyState from '$lib/components/forum/EmptyState.svelte';

	type MyPost = {
		id: number;
		title: string;
		body: string;
		drugName: string;
		tag: string;
		status: 'published' | 'pending' | 'draft' | 'archived';
		upvotes: number;
		comments: number;
		views: number;
		createdAt: string;
		updatedAt: string;
		isPublic: boolean;
	};

	let posts: MyPost[] = [];
	let loading = true;
	let filters = {
		status: 'all',
		tag: 'all',
		sortBy: 'newest',
		searchQuery: ''
	};

	// Mock posts data
	const mockPosts: MyPost[] = [
		{
			id: 1,
			title: 'Suspicious packaging on Paracetamol tablets',
			body: 'I bought some paracetamol from a local pharmacy and noticed the packaging looks different from usual. The text seems blurry and the colors are slightly off. Has anyone else experienced this?',
			drugName: 'Paracetamol',
			tag: 'Fake',
			status: 'published',
			upvotes: 24,
			comments: 8,
			views: 156,
			createdAt: '2024-12-01T10:30:00Z',
			updatedAt: '2024-12-01T10:30:00Z',
			isPublic: true
		},
		{
			id: 2,
			title: 'Metformin batch verification process',
			body: 'I wanted to share my experience with verifying Metformin authenticity. Here are the steps I followed and what I discovered...',
			drugName: 'Metformin',
			tag: 'Safe',
			status: 'published',
			upvotes: 15,
			comments: 12,
			views: 89,
			createdAt: '2024-11-30T14:15:00Z',
			updatedAt: '2024-11-30T14:15:00Z',
			isPublic: true
		},
		{
			id: 3,
			title: 'Concerns about new Aspirin packaging',
			body: 'I noticed some changes in the packaging of my regular Aspirin brand. Waiting for community feedback before reporting...',
			drugName: 'Aspirin',
			tag: 'Caution',
			status: 'pending',
			upvotes: 0,
			comments: 0,
			views: 0,
			createdAt: '2024-11-29T16:45:00Z',
			updatedAt: '2024-11-29T16:45:00Z',
			isPublic: false
		},
		{
			id: 4,
			title: 'Ibuprofen quality issues report',
			body: 'Draft post about potential quality issues with a specific Ibuprofen batch. Still gathering evidence and documentation.',
			drugName: 'Ibuprofen',
			tag: 'Fake',
			status: 'draft',
			upvotes: 0,
			comments: 0,
			views: 0,
			createdAt: '2024-11-28T09:20:00Z',
			updatedAt: '2024-11-29T11:30:00Z',
			isPublic: false
		}
	];

	onMount(async () => {
		// Simulate API loading
		setTimeout(() => {
			posts = mockPosts;
			loading = false;
		}, 800);
	});

	function handleFilterChange(event: CustomEvent<Partial<typeof filters>>) {
		filters = { ...filters, ...event.detail };
		applyFilters();
	}

	function applyFilters() {
		// Filter logic implementation
		console.log('Applying filters:', filters);
	}

	function handleDeletePost(event: CustomEvent<{ postId: number }>) {
		const postId = event.detail.postId;
		posts = posts.filter((post) => post.id !== postId);
		console.log('Deleted post:', postId);
	}

	function handleEditPost(event: CustomEvent<{ postId: number }>) {
		const postId = event.detail.postId;
		console.log('Edit post:', postId);
		// Navigate to edit page or open edit modal
	}

	function handleNewPost() {
		console.log('Navigate to new post');
		// Navigate to new post page
	}

	$: filteredPosts = posts.filter((post) => {
		if (filters.status !== 'all' && post.status !== filters.status) return false;
		if (filters.tag !== 'all' && post.tag !== filters.tag) return false;
		if (
			filters.searchQuery &&
			!post.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
			!post.drugName.toLowerCase().includes(filters.searchQuery.toLowerCase())
		)
			return false;
		return true;
	});

	$: postStats = {
		total: posts.length,
		published: posts.filter((p) => p.status === 'published').length,
		pending: posts.filter((p) => p.status === 'pending').length,
		drafts: posts.filter((p) => p.status === 'draft').length,
		totalUpvotes: posts.reduce((sum, p) => sum + p.upvotes, 0),
		totalViews: posts.reduce((sum, p) => sum + p.views, 0)
	};
</script>

<svelte:head>
	<title>My Posts | Community Forum | TrackMyMeds</title>
	<meta
		name="description"
		content="Manage and view all your forum posts in the TrackMyMeds community"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<MyPostsHeader {postStats} on:newPost={handleNewPost} />

	<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
		<!-- Filters -->
		<div in:fade={{ duration: 300, delay: 100 }}>
			<MyPostsFilters {filters} on:filterChange={handleFilterChange} />
		</div>

		<!-- Posts List -->
		<div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
			{#if loading}
				<MyPostsList
					posts={[]}
					{loading}
					on:deletePost={handleDeletePost}
					on:editPost={handleEditPost}
				/>
			{:else if filteredPosts.length === 0}
				<EmptyState type="my-posts" />
			{:else}
				<MyPostsList
					posts={filteredPosts}
					{loading}
					on:deletePost={handleDeletePost}
					on:editPost={handleEditPost}
				/>
			{/if}
		</div>
	</div>
</div>
