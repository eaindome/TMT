<script context="module" lang="ts">
	export interface Filters {
		searchQuery?: string;
		folder?: string;
		tag?: string;
		postStatus?: string;
		status?: string;
		dateRange?: string;
		timeRange?: string;
		activityType?: string;
	}
</script>

<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	export let type = 'conversations';
	export let activeTab = 'all';

	export let filters: Filters = {};

	function getEmptyStateContent() {
		if (type === 'activity') {
			if (filters.timeRange !== 'all' || filters.activityType !== 'all') {
				return {
					icon: 'search',
					title: 'No activity found',
					description: 'Try adjusting your filters to see more activity.'
				};
			}
			
			return {
				icon: 'clock',
				title: 'No recent activity',
				description: 'Start engaging with the community to see your activity timeline here.'
			};
		}

		if (type === 'saved-posts') {
			if (filters.searchQuery || filters.folder !== 'all' || filters.tag !== 'all' || filters.postStatus !== 'all') {
				return {
					icon: 'search',
					title: 'No saved posts match your filters',
					description: 'Try adjusting your search criteria or filters to find saved posts.'
				};
			}

			return {
				icon: 'collection',
				title: 'No saved posts yet',
				description: 'Start saving posts that you find useful or want to read later by clicking the bookmark icon.'
			};
		}

		if (type === 'my-discussions') {
			if (filters.searchQuery || filters.dateRange !== 'all' || filters.tag !== 'all' || filters.postStatus !== 'all') {
				return {
					icon: 'search',
					title: 'No discussions match your filters',
					description: 'Try adjusting your search criteria or filters to find discussions.'
				};
			}

			return {
				icon: 'chat',
				title: 'No discussions yet',
				description: 'Start engaging with the community by commenting on posts that interest you.'
			};
		}

		if (type === 'my-posts') {
			if (filters.searchQuery || filters.status !== 'all' || filters.tag !== 'all') {
				return {
					icon: 'search',
					title: 'No posts match your filters',
					description: 'Try adjusting your search criteria or filters to find posts.'
				};
			}

			return {
				icon: 'document-text',
				title: 'No posts yet',
				description: 'Start sharing your experiences with the community by creating your first post.'
			};
		}

		if (type === 'conversations') {
			switch (activeTab) {
				case 'mention':
					return {
						icon: 'at-symbol',
						title: 'No mentions yet',
						description: 'When someone mentions you in a post or comment, it will appear here.'
					};
				case 'reply':
					return {
						icon: 'reply',
						title: 'No replies yet',
						description: 'Replies to your posts and comments will appear here.'
					};
				case 'message':
					return {
						icon: 'mail',
						title: 'No messages yet',
						description: 'Direct messages from other users will appear here.'
					};
				default:
					return {
						icon: 'chat',
						title: 'No conversations yet',
						description: 'Your mentions, replies, and messages will appear here when you start engaging with the community.'
					};
			}
		}

		return {
			icon: 'document-text',
			title: 'Nothing here yet',
			description: 'Content will appear here when available.'
		};
	}

	$: content = getEmptyStateContent();
</script>

<div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
	<div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
		<Icon name={content.icon} className="w-8 h-8 text-gray-400" />
	</div>

	<h3 class="text-lg font-semibold text-gray-900 mb-2">
		{content.title}
	</h3>

	<p class="text-gray-600 max-w-md mx-auto">
		{content.description}
	</p>

	{#if type === 'activity'}
		<div class="mt-6">
			<a
				href="/forum"
				class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors"
			>
				<Icon name="clock" className="w-4 h-4 mr-2" />
				Explore Forum
			</a>
		</div>
	{:else if type === 'saved-posts'}
		<div class="mt-6">
			<a
				href="/forum"
				class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors"
			>
				<Icon name="collection" className="w-4 h-4 mr-2" />
				Explore Forum
			</a>
		</div>
	{:else if type === 'my-discussions'}
		<div class="mt-6">
			<a
				href="/forum"
				class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors"
			>
				<Icon name="chat" className="w-4 h-4 mr-2" />
				Explore Forum
			</a>
		</div>
	{:else if type === 'my-posts'}
		<div class="mt-6">
			<button class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors">
				<Icon name="plus" className="w-4 h-4 mr-2" />
				Create Your First Post
			</button>
		</div>
	{:else if type === 'conversations' && activeTab === 'all'}
		<div class="mt-6">
			<a
				href="/forum"
				class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors"
			>
				<Icon name="forum" className="w-4 h-4 mr-2" />
				Explore Forum
			</a>
		</div>
	{/if}
</div>
