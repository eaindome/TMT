<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Post {
		id: string;
		status: 'published' | 'pending' | 'draft' | 'archived';
		tag: 'Safe' | 'Fake' | 'Caution' | string;
		drugName: string;
		title: string;
		body: string;
		createdAt: string;
		updatedAt: string;
		upvotes?: number;
		comments?: number;
		views?: number;
	}

	export let post: Post;
	const dispatch = createEventDispatcher();

	let showDeleteConfirm = false;

	function getStatusStyle(status: Post['status']) {
		switch (status) {
			case 'published':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800 border-yellow-200';
			case 'draft':
				return 'bg-blue-100 text-blue-800 border-blue-200';
			case 'archived':
				return 'bg-gray-100 text-gray-800 border-gray-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

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

	function formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function handleEdit() {
		dispatch('editPost', { postId: post.id });
	}

	function handleDelete() {
		showDeleteConfirm = true;
	}

	function confirmDelete() {
		dispatch('deletePost', { postId: post.id });
		showDeleteConfirm = false;
	}

	function cancelDelete() {
		showDeleteConfirm = false;
	}

	function handleViewPost() {
		if (post.status === 'published') {
			// Navigate to the public post
			console.log('View post:', post.id);
		}
	}
</script>

<div
	class="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-200 hover:shadow-md"
>
	<div class="mb-4 flex items-start justify-between">
		<!-- Post Header -->
		<div class="min-w-0 flex-1">
			<div class="mb-2 flex items-center space-x-3">
				<!-- Status Badge -->
				<span
					class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium {getStatusStyle(
						post.status
					)}"
				>
					<div
						class="mr-1.5 h-1.5 w-1.5 rounded-full {post.status === 'published'
							? 'bg-green-600'
							: post.status === 'pending'
								? 'bg-yellow-600'
								: post.status === 'draft'
									? 'bg-blue-600'
									: 'bg-gray-600'}"
					></div>
					{post.status.charAt(0).toUpperCase() + post.status.slice(1)}
				</span>

				<!-- Tag -->
				<span
					class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getTagStyle(
						post.tag
					)}"
				>
					{post.tag}
				</span>

				<!-- Drug Name -->
				<span
					class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
				>
					{post.drugName}
				</span>
			</div>

			<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">
				{post.title}
			</h3>

			<p class="mb-3 line-clamp-2 text-sm text-gray-600">
				{post.body}
			</p>

			<!-- Metadata -->
			<div class="flex items-center space-x-4 text-sm text-gray-500">
				<span class="flex items-center">
					<Icon name="calendar" className="w-4 h-4 mr-1" />
					Created {formatDate(post.createdAt)}
				</span>

				{#if post.updatedAt !== post.createdAt}
					<span class="flex items-center">
						<Icon name="pencil" className="w-4 h-4 mr-1" />
						Updated {formatDate(post.updatedAt)}
					</span>
				{/if}

				{#if post.status === 'published'}
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
				{/if}
			</div>
		</div>

		<!-- Actions -->
		<div class="ml-4 flex items-start space-x-2">
			{#if post.status === 'published'}
				<button
					on:click={handleViewPost}
					class="rounded-md p-2 text-gray-400 transition-colors hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a]"
					title="View Post"
				>
					<Icon name="external-link" className="w-4 h-4" />
				</button>
			{/if}

			<button
				on:click={handleEdit}
				class="rounded-md p-2 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
				title="Edit Post"
			>
				<Icon name="pencil" className="w-4 h-4" />
			</button>

			<button
				on:click={handleDelete}
				class="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
				title="Delete Post"
			>
				<Icon name="trash" className="w-4 h-4" />
			</button>
		</div>
	</div>

	<!-- Delete Confirmation -->
	{#if showDeleteConfirm}
		<div class="mt-4 border-t border-gray-200 pt-4">
			<div class="rounded-lg border border-red-200 bg-red-50 p-4">
				<div class="flex items-start">
					<div class="flex-shrink-0">
						<Icon name="exclamation-triangle" className="w-5 h-5 text-red-400" />
					</div>
					<div class="ml-3 flex-1">
						<h4 class="text-sm font-medium text-red-800">Delete Post</h4>
						<p class="mt-1 text-sm text-red-700">
							Are you sure you want to delete this post? This action cannot be undone.
						</p>
						<div class="mt-3 flex space-x-3">
							<button
								on:click={confirmDelete}
								class="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-700"
							>
								Delete
							</button>
							<button
								on:click={cancelDelete}
								class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
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
</style>
