<script lang="ts">
	import Icon from '$lib/components/ui/Icon.svelte';

	export let type = 'conversations';
	export let activeTab = 'all';

	function getEmptyStateContent() {
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
						description:
							'Your mentions, replies, and messages will appear here when you start engaging with the community.'
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

<div class="rounded-lg border border-gray-200 bg-white p-12 text-center">
	<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
		<Icon name={content.icon} className="w-8 h-8 text-gray-400" />
	</div>

	<h3 class="mb-2 text-lg font-semibold text-gray-900">
		{content.title}
	</h3>

	<p class="mx-auto max-w-md text-gray-600">
		{content.description}
	</p>

	{#if type === 'conversations' && activeTab === 'all'}
		<div class="mt-6">
			<a
				href="/forum"
				class="inline-flex items-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c8a6d]"
			>
				<Icon name="forum" className="w-4 h-4 mr-2" />
				Explore Forum
			</a>
		</div>
	{/if}
</div>
