<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Author {
		name: string;
		role: string;
		avatar: string;
	}

	interface LastMessage {
		timestamp: string | number | Date;
		author: Author;
		content: string;
	}

	interface Conversation {
		id: string | number;
		title: string;
		type: string;
		isUnread?: boolean;
		unreadCount: number;
		lastMessage: LastMessage;
		participants: number;
		postId?: string | number;
		postTitle?: string;
	}

	export let conversation: Conversation;

	function formatTime(timestamp: string | number | Date) {
		const date = new Date(timestamp);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
		const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

		if (diffHours < 1) return 'Just now';
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays === 1) return 'Yesterday';
		if (diffDays < 7) return `${diffDays}d ago`;
		return date.toLocaleDateString();
	}

	function getTypeIcon(type: string) {
		switch (type) {
			case 'mention':
				return 'at-symbol';
			case 'reply':
				return 'reply';
			case 'message':
				return 'mail';
			default:
				return 'chat';
		}
	}

	function getTypeColor(type: string) {
		switch (type) {
			case 'mention':
				return 'text-blue-600 bg-blue-100';
			case 'reply':
				return 'text-green-600 bg-green-100';
			case 'message':
				return 'text-purple-600 bg-purple-100';
			default:
				return 'text-gray-600 bg-gray-100';
		}
	}

	function handleCardClick() {
		if (conversation.postId) {
			goto(`/forum/post/${conversation.postId}`);
		} else {
			goto(`/forum/conversation/${conversation.id}`);
		}
	}

	function handleGoToThread(event: MouseEvent) {
		event.stopPropagation();
		handleCardClick();
	}
</script>

<div
	class="cursor-pointer rounded-lg border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md
        {conversation.isUnread ? 'bg-[#1a5f4a]/2 ring-2 ring-[#1a5f4a]/20' : ''}"
	on:click={handleCardClick}
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' && handleCardClick()}
>
	<div class="flex items-start space-x-4">
		<!-- Type Indicator -->
		<div class="mt-1 flex-shrink-0">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-full {getTypeColor(
					conversation.type
				)}"
			>
				<Icon name={getTypeIcon(conversation.type)} className="w-4 h-4" />
			</div>
		</div>

		<!-- Content -->
		<div class="min-w-0 flex-1">
			<!-- Header -->
			<div class="mb-2 flex items-center justify-between">
				<h3 class="truncate text-sm font-semibold text-gray-900">
					{conversation.title}
				</h3>

				<div class="ml-4 flex flex-shrink-0 items-center space-x-2">
					{#if conversation.unreadCount > 0}
						<span
							class="inline-flex items-center rounded-full bg-[#1a5f4a] px-2 py-0.5 text-xs font-medium text-white"
						>
							{conversation.unreadCount}
						</span>
					{/if}

					<span class="text-xs text-gray-500">
						{formatTime(conversation.lastMessage.timestamp)}
					</span>
				</div>
			</div>

			<!-- Last Message -->
			<div class="mb-3 flex items-start space-x-3">
				<!-- Author Avatar -->
				<div class="flex-shrink-0">
					<div
						class="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] text-xs font-medium text-white"
					>
						{conversation.lastMessage.author.avatar}
					</div>
				</div>

				<!-- Message Content -->
				<div class="min-w-0 flex-1">
					<div class="mb-1 flex items-center space-x-2">
						<span class="text-sm font-medium text-gray-700">
							{conversation.lastMessage.author.name}
						</span>
						<span class="text-xs text-gray-500">
							{conversation.lastMessage.author.role}
						</span>
					</div>

					<p class="line-clamp-2 text-sm text-gray-600">
						{conversation.lastMessage.content}
					</p>
				</div>
			</div>

			<!-- Footer -->
			<div class="flex items-center justify-between">
				<div class="flex items-center space-x-4 text-xs text-gray-500">
					<span class="flex items-center">
						<Icon name="users" className="w-3 h-3 mr-1" />
						{conversation.participants} participants
					</span>

					{#if conversation.postTitle}
						<span class="flex items-center">
							<Icon name="document-text" className="w-3 h-3 mr-1" />
							in "{conversation.postTitle}"
						</span>
					{/if}
				</div>

				<button
					on:click={handleGoToThread}
					class="inline-flex items-center text-xs font-medium text-[#1a5f4a] transition-colors hover:text-[#2c8a6d]"
				>
					Go to thread
					<Icon name="arrow-right" className="w-3 h-3 ml-1" />
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
