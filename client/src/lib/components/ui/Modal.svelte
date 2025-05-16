<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	export let open = false;
	export let onClose: () => void;
	export let title: string = '';
	export let maxWidth: string = 'max-w-lg';
	export let closeOnBackdropClick: boolean = true;

	function handleBackdropClick() {
		if (closeOnBackdropClick) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}
</script>

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		role="dialog"
		aria-modal="true"
		tabindex="0"
		on:click|self={handleBackdropClick}
		on:keydown={handleKeydown}
		transition:fade={{ duration: 150 }}
	>
		<div
			class="w-full {maxWidth} overflow-hidden rounded-lg bg-white shadow-xl"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			{#if title}
				<div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
					<h3 class="text-lg font-medium text-gray-900">{title}</h3>
					<button
						class="rounded text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
						on:click={onClose}
						aria-label="Close dialog"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			{/if}

			<div class="px-5 py-4">
				<slot />
			</div>
		</div>
	</div>
{/if}
