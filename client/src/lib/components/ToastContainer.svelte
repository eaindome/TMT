<script lang="ts">
	import { toasts } from '$lib/stores/toasts';
	import Alert from './Alert.svelte';
	import { fly } from 'svelte/transition';

	// Position of the toast container
	export let position:
		| 'top-right'
		| 'top-left'
		| 'bottom-right'
		| 'bottom-left'
		| 'top-center'
		| 'bottom-center' = 'top-right';

	// Map position to CSS classes
	const positionClasses = {
		'top-right': 'top-0 right-0',
		'top-left': 'top-0 left-0',
		'bottom-right': 'bottom-0 right-0',
		'bottom-left': 'bottom-0 left-0',
		'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
		'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
	};

	function handleDismiss(id: number) {
		toasts.remove(id);
	}
</script>

<div
	class="fixed z-50 m-4 flex flex-col gap-2 {positionClasses[position]}"
	aria-live="polite"
	aria-atomic="true"
>
	{#each $toasts as toast (toast.id)}
		<div
			in:fly={{ y: position.startsWith('top') ? -20 : 20, duration: 300 }}
			out:fly={{ y: position.startsWith('top') ? -20 : 20, duration: 200 }}
		>
			<Alert
				message={toast.message}
				type={toast.type}
				dismissible={true}
				className="shadow-lg max-w-sm"
				on:dismiss={() => handleDismiss(toast.id)}
			/>
		</div>
	{/each}
</div>
