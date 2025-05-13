<script lang="ts">
	// FAQItem component - Collapsible question and answer
	import { slide } from 'svelte/transition';
 	import { quintOut } from 'svelte/easing';
	import { createEventDispatcher } from 'svelte';

	export let question: string;
	export let answer: string;
	export let initiallyOpen: boolean = false; // Allow items to be open by default

	let isOpen = initiallyOpen;
	const dispatch = createEventDispatcher();

	function toggle() {
		isOpen = !isOpen;
		if (isOpen) {
			dispatch('open', { question });
		} else {
			dispatch('close', { question });
		}
	}
</script>

<div
	class="mb-4 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md {isOpen
		? 'shadow-md ring-1 ring-[#1a5f4a]/10'
		: ''}"
>
	<button
		on:click={toggle}
		class="flex w-full items-center justify-between p-5 text-left transition-all duration-200 {isOpen
			? 'bg-[#1a5f4a]/5'
			: 'hover:bg-gray-50'}"
		aria-expanded={isOpen}
	>
		<div class="flex items-center">
			<div
				class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full {isOpen
					? 'bg-[#1a5f4a] text-white'
					: 'bg-[#1a5f4a]/10 text-[#1a5f4a]'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<h3 class="font-medium text-gray-900 {isOpen ? 'font-semibold text-[#1a5f4a]' : ''}">
				{question}
			</h3>
		</div>

		<div class="ml-4 flex-shrink-0 transition-transform duration-300 {isOpen ? 'rotate-180' : ''}">
			<div
				class="flex h-6 w-6 items-center justify-center rounded-full {isOpen
					? 'bg-[#1a5f4a] text-white'
					: 'bg-gray-100 text-gray-500'}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	</button>

	{#if isOpen}
		<div
			transition:slide={{ duration: 300, easing: quintOut }}
			class="border-t border-gray-100 p-5 text-gray-700"
		>
			<p class="leading-relaxed">{@html answer}</p>

			<div class="mt-4 flex flex-wrap gap-2">
				<button
					class="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-3.5 w-3.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
						/>
					</svg>
					Helpful
				</button>
			</div>
		</div>
	{/if}
</div>
