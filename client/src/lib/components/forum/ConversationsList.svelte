<script lang="ts">
	import ConversationCard from './ConversationCard.svelte';
	import ConversationCardSkeleton from './ConversationCardSkeleton.svelte';

	export let conversations: any[] = [];
	export let loading = false;
</script>

<div class="space-y-3">
	{#if loading}
		{#each Array(4) as _}
			<ConversationCardSkeleton />
		{/each}
	{:else}
		{#each conversations as conversation}
			<ConversationCard {conversation} />
		{/each}
	{/if}
</div>
