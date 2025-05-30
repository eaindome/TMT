<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	const dispatch = createEventDispatcher();

	function handleNewPost() {
		dispatch('newPost');
	}
</script>

<div class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">Community Forum</h1>
				<p class="mt-2 text-gray-600">Share experiences and help verify medicine authenticity</p>
			</div>

			<div class="mt-4 flex space-x-3 sm:mt-0">
				<button
					on:click={handleNewPost}
					class="inline-flex items-center rounded-lg bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c8a6d]"
				>
					<Icon name="annotation" className="w-4 h-4 mr-2" />
					Post Your Experience
				</button>
			</div>
		</div>
	</div>
</div>
