<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	// Props with TypeScript types
	export let placeholder: string = 'Search...';
	export let value: string = '';
	export let disabled: boolean = false;
	export let clearable: boolean = true;
	export let autofocus: boolean = false;
	export let loading: boolean = false;
	// Add a new prop for help text
	export let helpText: string = '';
	// Add animation duration
	export let animationDuration: number = 200; // ms

	// Create a dispatcher for events
	const dispatch = createEventDispatcher<{
		input: string;
		clear: void;
		search: string;
		focus: void;
		blur: void;
	}>();

	// Track focus state
	let isFocused = false;
	let inputElement: HTMLInputElement;

	// Handle input changes with debounce
	let debounceTimer: ReturnType<typeof setTimeout>;
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		
		// Clear previous timer
		clearTimeout(debounceTimer);
		
		// Set a new timer
		debounceTimer = setTimeout(() => {
			dispatch('input', value);
		}, 300); // 300ms debounce
	}

	// Focus input if autofocus is true
	onMount(() => {
		if (autofocus && inputElement) {
			inputElement.focus();
		}

		// Cleanup debounce timer on component destroy
		return () => {
			clearTimeout(debounceTimer);
		};
	});

	// Handle search submission
	function handleSubmit(e: Event) {
		e.preventDefault();
		if (value.trim()) {
			dispatch('search', value);
		}
	}

	// Clear the search
	function clearSearch() {
		value = '';
		dispatch('clear');
		dispatch('input', '');
		// Focus the input after clearing
		if (inputElement) {
			inputElement.focus();
		}
	}

	// Handle focus and blur events
	function handleFocus() {
		isFocused = true;
		dispatch('focus');
	}

	function handleBlur() {
		isFocused = false;
		dispatch('blur');
	}

	// Keyboard shortcuts
	function handleKeydown(e: KeyboardEvent) {
		// Escape key to clear search
		if (e.key === 'Escape' && value && clearable) {
			clearSearch();
		}
	}
</script>

<div class="search-container">
	<form 
		on:submit={handleSubmit} 
		class="relative rounded-xl bg-white p-2 shadow-md transition-all duration-200 hover:shadow-lg {isFocused ? 'ring-2 ring-[#1a5f4a] ring-opacity-50' : ''}"
	>
		<div class="relative flex items-center">
			<input
				type="text"
				{placeholder}
				bind:value
				bind:this={inputElement}
				on:input={handleInput}
				on:focus={handleFocus}
				on:blur={handleBlur}
				on:keydown={handleKeydown}
				{disabled}
				class="w-full rounded-xl border border-gray-300 bg-white py-3 pr-24 pl-12 text-gray-800 transition-all duration-{animationDuration} focus:border-[#1a5f4a] focus:outline-none focus:ring-2 focus:ring-[#1a5f4a] {disabled ? 'cursor-not-allowed opacity-70' : ''}"
				aria-label={placeholder}
			/>

			<!-- Search Icon with animation -->
			<div 
				class="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400 transition-all duration-{animationDuration} {isFocused ? 'text-[#1a5f4a]' : ''}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</div>

			<!-- Action buttons wrapper -->
			<div class="absolute top-1/2 right-4 -translate-y-1/2 transform flex space-x-2 items-center">
				<!-- Loading Spinner (visible when loading is true) -->
				{#if loading}
					<div class="text-[#1a5f4a] animate-spin">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				{/if}

				<!-- Clear Button (visible when there's text and clearable is true) -->
				{#if value && clearable && !loading}
					<button
						type="button"
						on:click={clearSearch}
						class="text-gray-400 hover:text-[#1a5f4a] focus:outline-none focus:text-[#1a5f4a] transition-colors duration-{animationDuration} p-1 rounded-full hover:bg-gray-100"
						aria-label="Clear search"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				{/if}

				<!-- Search Button -->
				<button
					type="submit"
					disabled={!value.trim() || disabled || loading}
					class="bg-[#1a5f4a] text-white rounded-lg p-2 hover:bg-[#164639] transition-colors duration-{animationDuration} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a5f4a] disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Search"
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
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</form>

	<!-- Help text -->
	{#if helpText}
		<div class="text-xs text-gray-500 mt-1 ml-2">{helpText}</div>
	{/if}

	<!-- Keyboard shortcut hint -->
	<!-- {#if isFocused && clearable && value}
		<div class="absolute right-4 mt-1 text-xs text-gray-500">Press <kbd class="px-1 py-0.5 bg-gray-100 border border-gray-300 rounded">Esc</kbd> to clear</div>
	{/if} -->
</div>

<style>
	/* Add subtle animation to the input */
	input:focus {
		transform: translateY(-1px);
	}
	
	/* Custom styling for the keyboard shortcut */
	/* kbd {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: 0.75rem;
	} */
</style>