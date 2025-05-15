<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// Props
	export let capturedImage: string | null = null;

	// Event dispatcher
	const dispatch = createEventDispatcher();

	// State
	let dragActive = false;
	let fileInput: HTMLInputElement;
	let isHovering = false;
	let uploadTips = [
		'Ensure all text on packaging is clearly visible',
		'Include the product barcode if available',
		'Capture both front and back of packaging when possible',
		'Avoid shadows and glare on the image'
	];
	let currentTip = 0;

	// Cycle through tips
	onMount(() => {
		const interval = setInterval(() => {
			currentTip = (currentTip + 1) % uploadTips.length;
		}, 5000);

		return () => clearInterval(interval);
	});

	// Handle file selection
	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			processFile(input.files[0]);
		}
	}

	// Handle drag events
	function handleDragEnter(event: DragEvent) {
		event.preventDefault();
		dragActive = true;
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragActive = true;
	}

	function handleDragLeave() {
		dragActive = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragActive = false;

		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			processFile(event.dataTransfer.files[0]);
		}
	}

	// Process the selected file
	function processFile(file: File) {
		// Check if file is an image
		if (!file.type.match('image.*')) {
			alert('Please select an image file');
			return;
		}

		// Create a preview
		const reader = new FileReader();
		reader.onload = (e) => {
			const preview = e.target?.result as string;
			dispatch('file-selected', { file, preview });
		};
		reader.readAsDataURL(file);
	}

	// Trigger file input click
	function openFileSelector() {
		fileInput.click();
	}

	// Reset the selection
	function resetFile() {
		capturedImage = null;
		if (fileInput) {
			fileInput.value = '';
		}
		dispatch('file-selected', { file: null, preview: null });
	}
</script>

<div class="file-upload-container">
	{#if capturedImage}
		<div class="mb-6 text-center" in:fade={{ duration: 300 }}>
			<div class="mb-3 flex items-center justify-center">
				<span
					class="inline-flex h-8 items-center rounded-full bg-[#1a5f4a]/10 px-3 text-sm font-medium text-[#1a5f4a]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1.5 h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
					Image Selected
				</span>
			</div>

			<div class="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-md">
				<div class="group relative">
					<img
						src={capturedImage}
						alt="Selected medicine"
						class="h-auto max-h-80 w-full object-contain"
					/>
					<div
						class="bg-opacity-0 group-hover:bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center bg-black transition-all duration-300"
					>
						<button
							on:click={resetFile}
							class="transform rounded-full bg-white p-2 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 hover:bg-red-50"
							aria-label="Remove selected image"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 text-red-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="bg-white p-3">
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5 text-[#1a5f4a]"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="text-sm font-medium text-gray-700">Medicine Image</span>
						</div>
						<button
							on:click={resetFile}
							class="rounded-md px-2 py-1 text-xs font-medium text-[#1a5f4a] hover:bg-[#1a5f4a]/5"
						>
							Change
						</button>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div
			class="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm"
			role="region"
			aria-label="File upload dropzone"
			on:dragenter={handleDragEnter}
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
			on:drop={handleDrop}
			on:mouseenter={() => (isHovering = true)}
			on:mouseleave={() => (isHovering = false)}
			in:fade={{ duration: 300 }}
		>
			<div
				class="relative mb-5 flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 {dragActive
					? 'border-[#1a5f4a] bg-[#1a5f4a]/5'
					: 'border-dashed border-gray-300 bg-gray-50'} transition-all duration-300 hover:border-[#1a5f4a] hover:bg-[#1a5f4a]/5"
				role="button"
				tabindex="0"
				aria-label="Click or press Enter/Space to upload an image"
				on:click={openFileSelector}
				on:keydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						openFileSelector();
					}
				}}
			>
				<div class="flex flex-col items-center justify-center px-4 py-6 text-center">
					<div class="mb-4 rounded-full bg-[#1a5f4a]/10 p-3">
						<svg
							class="h-10 w-10 text-[#1a5f4a]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
					</div>
					<h3 class="mb-1 text-lg font-medium text-gray-700">Upload Medicine Image</h3>
					<p class="mb-3 text-sm text-gray-500">
						<span class="font-semibold text-[#1a5f4a]">Click to browse</span> or drag and drop
					</p>
					<p class="mb-3 text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>

					<div class="mt-2 inline-flex rounded-md bg-[#1a5f4a]/10 px-3 py-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1.5 h-4 w-4 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-xs font-medium text-[#1a5f4a]">
							{uploadTips[currentTip]}
						</span>
					</div>
				</div>

				<!-- Upload Progress Indicators (if needed) -->
				<div class="absolute right-0 bottom-0 left-0 h-1 overflow-hidden">
					<div class="h-full w-0 bg-[#1a5f4a] transition-all duration-300"></div>
				</div>
			</div>

			<input
				bind:this={fileInput}
				type="file"
				class="hidden"
				accept="image/*"
				on:change={handleFileChange}
			/>

			<div
				class="mt-2 flex w-full max-w-md flex-col rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm"
			>
				<h4 class="mb-2 font-medium text-gray-700">Quick Tips:</h4>
				<ul class="space-y-1 text-xs text-gray-600">
					<li class="flex items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mt-0.5 mr-1.5 h-3 w-3 flex-shrink-0 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Ensure packaging text and brand name are clearly visible
					</li>
					<li class="flex items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mt-0.5 mr-1.5 h-3 w-3 flex-shrink-0 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Take photos in good lighting without shadows or glare
					</li>
					<li class="flex items-start">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mt-0.5 mr-1.5 h-3 w-3 flex-shrink-0 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						Include the medicine batch number and expiry date if possible
					</li>
				</ul>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Subtle animation for the dropzone border on hover */
	@keyframes pulse-border {
		0%,
		100% {
			border-color: rgba(26, 95, 74, 0.5);
		}
		50% {
			border-color: rgba(26, 95, 74, 0.8);
		}
	}
</style>
