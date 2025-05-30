<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	export let activeTab = 'all';
	export let conversations: { type: string; isUnread: boolean }[] = [];

	const dispatch = createEventDispatcher();

	function handleTabClick(tab: string) {
		activeTab = tab;
		dispatch('tabChange', { tab });
	}

	function getTabCount(type: string) {
		if (type === 'all') return conversations.length;
		return conversations.filter((conv) => conv.type === type).length;
	}

	function getUnreadCount(type: string) {
		if (type === 'all') return conversations.filter((conv) => conv.isUnread).length;
		return conversations.filter((conv) => conv.type === type && conv.isUnread).length;
	}

	const tabs = [
		{ id: 'all', label: 'All Conversations', icon: 'chat' },
		{ id: 'mention', label: 'Mentions', icon: 'at-symbol' },
		{ id: 'reply', label: 'Replies', icon: 'reply' },
		{ id: 'message', label: 'Messages', icon: 'mail' }
	];
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white">
	<nav class="flex space-x-0" aria-label="Tabs">
		{#each tabs as tab}
			{@const count = getTabCount(tab.id)}
			{@const unreadCount = getUnreadCount(tab.id)}

			<button
				class="flex-1 border-b-2 px-4 py-3 text-center text-sm font-medium transition-colors
                    {activeTab === tab.id
					? 'border-[#1a5f4a] bg-[#1a5f4a]/5 text-[#1a5f4a]'
					: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
				on:click={() => handleTabClick(tab.id)}
			>
				<div class="flex items-center justify-center space-x-2">
					<Icon name={tab.icon} className="w-4 h-4" />
					<span>{tab.label}</span>

					{#if count > 0}
						<span
							class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium
                            {activeTab === tab.id
								? 'bg-[#1a5f4a]/20 text-[#1a5f4a]'
								: 'bg-gray-100 text-gray-600'}"
						>
							{count}
						</span>
					{/if}

					{#if unreadCount > 0}
						<div class="h-2 w-2 rounded-full bg-red-500"></div>
					{/if}
				</div>
			</button>
		{/each}
	</nav>
</div>
