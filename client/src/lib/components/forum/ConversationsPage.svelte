<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import ConversationsHeader from '$lib/components/forum/ConversationsHeader.svelte';
	import ConversationsList from '$lib/components/forum/ConversationsList.svelte';
	import ConversationTabs from '$lib/components/forum/ConversationTabs.svelte';
	import EmptyState from '$lib/components/forum/EmptyState.svelte';

	type Conversation = {
		id: number;
		type: string;
		title: string;
		lastMessage: {
			content: string;
			author: {
				name: string;
				avatar: string;
				role: string;
			};
			timestamp: string;
		};
		postTitle: string | null;
		postId: string | null;
		unreadCount: number;
		participants: number;
		isUnread: boolean;
	};

	let conversations: Conversation[] = [];
	let loading = true;
	let activeTab = 'all'; // 'all', 'mentions', 'replies'
	let filters = {
		unreadOnly: false,
		timeRange: 'all'
	};

	// Mock conversations data
	const mockConversations = [
		{
			id: 1,
			type: 'mention',
			title: 'Mentioned in "Suspicious Paracetamol packaging"',
			lastMessage: {
				content:
					'@john_doe I think you should check the batch number on your medication. It looks similar to what I reported last week...',
				author: {
					name: 'Dr. Sarah Chen',
					avatar: 'SC',
					role: 'Pharmacist'
				},
				timestamp: '2024-12-01T14:30:00Z'
			},
			postTitle: 'Suspicious Paracetamol packaging',
			postId: 'post-123',
			unreadCount: 2,
			participants: 4,
			isUnread: true
		},
		{
			id: 2,
			type: 'reply',
			title: 'Reply to your post "Metformin authenticity check"',
			lastMessage: {
				content:
					'Thanks for sharing this! I had the same issue with my Metformin last month. The pharmacy confirmed it was authentic but the packaging was indeed different.',
				author: {
					name: 'Maria Rodriguez',
					avatar: 'MR',
					role: 'Consumer'
				},
				timestamp: '2024-11-30T16:45:00Z'
			},
			postTitle: 'Metformin authenticity check',
			postId: 'post-456',
			unreadCount: 0,
			participants: 7,
			isUnread: false
		},
		{
			id: 3,
			type: 'message',
			title: 'Direct message from Dr. Williams',
			lastMessage: {
				content:
					'Hi John, I saw your post about the suspicious medication. I work at the regulatory agency and would like to discuss this privately...',
				author: {
					name: 'Dr. James Williams',
					avatar: 'JW',
					role: 'Regulator'
				},
				timestamp: '2024-11-29T10:20:00Z'
			},
			postTitle: null,
			postId: null,
			unreadCount: 1,
			participants: 2,
			isUnread: true
		},
		{
			id: 4,
			type: 'mention',
			title: 'Mentioned in "Community guidelines update"',
			lastMessage: {
				content:
					'@john_doe and others, please review the new community guidelines for reporting suspicious medications.',
				author: {
					name: 'Admin',
					avatar: 'A',
					role: 'Admin'
				},
				timestamp: '2024-11-28T09:15:00Z'
			},
			postTitle: 'Community guidelines update',
			postId: 'post-789',
			unreadCount: 0,
			participants: 15,
			isUnread: false
		}
	];

	onMount(async () => {
		// Simulate API loading
		setTimeout(() => {
			conversations = mockConversations;
			loading = false;
		}, 800);
	});

	function handleTabChange(event: CustomEvent<{ tab: string }>) {
		activeTab = event.detail.tab;
		filterConversations();
	}

	function handleFilterChange(event: CustomEvent<{tab: string }>) {
		filters = { ...filters, ...event.detail };
		filterConversations();
	}

	function filterConversations() {
		// Apply filtering logic based on activeTab and filters
		console.log('Filtering conversations:', { activeTab, filters });
	}

	function markAllAsRead() {
		conversations = conversations.map((conv) => ({
			...conv,
			unreadCount: 0,
			isUnread: false
		}));
	}

	$: filteredConversations = conversations.filter((conv) => {
		if (activeTab === 'mentions') return conv.type === 'mention';
		if (activeTab === 'replies') return conv.type === 'reply';
		if (activeTab === 'messages') return conv.type === 'message';
		return true;
	});

	$: unreadCount = conversations.filter((conv) => conv.isUnread).length;
</script>

<svelte:head>
	<title>Conversations | Community Forum | TrackMyMeds</title>
	<meta
		name="description"
		content="View your conversations, mentions, and replies in the TrackMyMeds community"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<ConversationsHeader
		{unreadCount}
		on:markAllRead={markAllAsRead}
		on:filterChange={handleFilterChange}
	/>

	<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
		<!-- Tabs -->
		<div in:fade={{ duration: 300, delay: 100 }}>
			<ConversationTabs {activeTab} {conversations} on:tabChange={handleTabChange} />
		</div>

		<!-- Conversations List -->
		<div class="mt-6" in:fade={{ duration: 300, delay: 200 }}>
			{#if loading}
				<ConversationsList conversations={[]} {loading} />
			{:else if filteredConversations.length === 0}
				<EmptyState type="conversations" {activeTab} />
			{:else}
				<ConversationsList conversations={filteredConversations} {loading} />
			{/if}
		</div>
	</div>
</div>
