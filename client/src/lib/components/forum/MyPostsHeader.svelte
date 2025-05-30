<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let postStats = {
		total: 0,
		published: 0,
		pending: 0,
		drafts: 0,
		totalUpvotes: 0,
		totalViews: 0
	};

	const dispatch = createEventDispatcher();

	function handleNewPost() {
		dispatch('newPost');
	}
</script>

<div class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
		<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
			<div>
				<h1 class="flex items-center text-2xl font-bold text-gray-900">
					<Icon name="annotation" className="w-6 h-6 mr-3 text-[#1a5f4a]" />
					My Posts
				</h1>
				<p class="mt-1 text-sm text-gray-600">Manage and track all your community contributions</p>
			</div>

			<div class="mt-4 lg:mt-0">
				<button
					on:click={handleNewPost}
					class="inline-flex items-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c8a6d]"
				>
					<Icon name="plus" className="w-4 h-4 mr-2" />
					Create New Post
				</button>
			</div>
		</div>

		<!-- Stats Cards -->
		<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
			<div class="rounded-lg bg-gray-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="document-text" className="w-5 h-5 text-gray-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-gray-600">Total Posts</p>
						<p class="text-lg font-semibold text-gray-900">{postStats.total}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-green-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="check-circle" className="w-5 h-5 text-green-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-green-600">Published</p>
						<p class="text-lg font-semibold text-green-900">{postStats.published}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-yellow-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="clock" className="w-5 h-5 text-yellow-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-yellow-600">Pending</p>
						<p class="text-lg font-semibold text-yellow-900">{postStats.pending}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-blue-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="document" className="w-5 h-5 text-blue-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-blue-600">Drafts</p>
						<p class="text-lg font-semibold text-blue-900">{postStats.drafts}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-red-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="heart" className="w-5 h-5 text-red-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-red-600">Total Upvotes</p>
						<p class="text-lg font-semibold text-red-900">{postStats.totalUpvotes}</p>
					</div>
				</div>
			</div>

			<div class="rounded-lg bg-purple-50 p-4">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<Icon name="eye" className="w-5 h-5 text-purple-600" />
					</div>
					<div class="ml-3">
						<p class="text-sm font-medium text-purple-600">Total Views</p>
						<p class="text-lg font-semibold text-purple-900">{postStats.totalViews}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
