<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	export let post;

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
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return 'Today';
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays} days ago`;
		return date.toLocaleDateString();
	}
</script>

<div class="rounded-lg border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
	<div class="flex items-start space-x-4">
		<!-- Author Avatar -->
		<div class="flex-shrink-0">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] font-medium text-white"
			>
				{post.author.avatar}
			</div>
		</div>

		<!-- Post Content -->
		<div class="min-w-0 flex-1">
			<!-- Header -->
			<div class="mb-2 flex items-center justify-between">
				<div class="flex items-center space-x-2">
					<span class="text-sm font-medium text-gray-900">{post.author.name}</span>
					<span class="text-xs text-gray-500">{post.author.role}</span>
					<span class="text-xs text-gray-400">•</span>
					<span class="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
				</div>

				{#if post.isUnread}
					<div class="h-2 w-2 rounded-full bg-[#1a5f4a]"></div>
				{/if}
			</div>

			<!-- Title -->
			<h3 class="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">{post.title}</h3>

			<!-- Body Snippet -->
			<p class="mb-3 line-clamp-2 text-sm text-gray-600">{post.body}</p>

			<!-- Tags and Drug Info -->
			<div class="mb-4 flex items-center space-x-3">
				<span
					class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getTagStyle(
						post.tag
					)}"
				>
					{post.tag}
				</span>

				<span
					class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
				>
					{post.drugName}
				</span>
			</div>

			<!-- Actions -->
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4 text-sm text-gray-500">
					<button class="flex items-center space-x-1 transition-colors hover:text-[#1a5f4a]">
						<Icon name="heart" className="w-4 h-4" />
						<span>{post.upvotes}</span>
					</button>

					<button class="flex items-center space-x-1 transition-colors hover:text-[#1a5f4a]">
						<Icon name="chat" className="w-4 h-4" />
						<span>{post.comments}</span>
					</button>

					<button class="flex items-center space-x-1 transition-colors hover:text-[#1a5f4a]">
						<Icon name="collection" className="w-4 h-4" />
						<span>Save</span>
					</button>
				</div>

				<button class="text-sm font-medium text-[#1a5f4a] transition-colors hover:text-[#2c8a6d]">
					View Discussion →
				</button>
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
</style>
