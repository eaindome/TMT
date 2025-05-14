<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	
	// Props
	export let capturedImage: string | null = null;
	
	// Event dispatcher
	const dispatch = createEventDispatcher();
	
	// State
	let dragActive = false;
	let fileInput: HTMLInputElement;
	
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
		<div class="mb-4 text-center">
			<p class="mb-2 text-[#1a5f4a]">Selected Image</p>
			<div class="relative mx-auto flex max-w-xs items-center justify-center overflow-hidden rounded-lg border-2 border-[#1a5f4a]/20 bg-gray-100">
				<img src={capturedImage} alt="Selected medicine" class="h-auto max-h-64 w-full object-contain" />
				<div class="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-xs text-white">
					Medicine image uploaded
				</div>
			</div>
		</div>
		
		<div class="mt-4 flex justify-center">
			<button 
				on:click={resetFile} 
				class="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
			>
				Choose Another Image
			</button>
		</div>
	{:else}
		<div 
			class="flex flex-col items-center justify-center"
			role="region"
			aria-label="File upload dropzone"
			on:dragenter={handleDragEnter}
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
			on:drop={handleDrop}
		>
			<div 
				class="mb-6 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed {dragActive ? 'border-[#1a5f4a] bg-[#1a5f4a]/5' : 'border-gray-300 bg-gray-50'}"
				role="button"
				tabindex="0"
				aria-label="Click or press Enter/Space to upload an image"
				on:click={openFileSelector}
				on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { openFileSelector(); } }}
			>
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<svg class="mb-3 h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
					</svg>
					<p class="mb-2 text-sm text-gray-500">
						<span class="font-semibold">Click to upload</span> or drag and drop
					</p>
					<p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 10MB)</p>
				</div>
			</div>
			
			<input 
				bind:this={fileInput}
				type="file" 
				class="hidden" 
				accept="image/*" 
				on:change={handleFileChange} 
			/>
			
			<p class="text-center text-sm text-gray-600">
				Take a clear photo of the medicine packaging, ensuring the brand name and details are visible
			</p>
		</div>
	{/if}
</div>