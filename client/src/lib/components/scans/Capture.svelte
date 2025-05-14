<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';

	export let capturedImage: string | null = null;
	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	let videoActive = false;
	
	const dispatch = createEventDispatcher();

	async function startCamera() {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment' }
			});
			
			if (videoElement) {
				videoElement.srcObject = stream;
				videoElement.play();
				videoActive = true;
			}
		} catch (err) {
			console.error('Error accessing camera:', err);
		}
	}

	function stopCamera() {
		if (stream) {
			stream.getTracks().forEach(track => track.stop());
			stream = null;
			videoActive = false;
		}
	}

	function captureImage() {
		if (!videoElement || !canvasElement) return;
		
		const context = canvasElement.getContext('2d');
		if (!context) return;
		
		// Set canvas dimensions to match video
		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;
		
		// Draw video frame on canvas
		context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
		
		// Get the image data as a base64 string
		const imageData = canvasElement.toDataURL('image/jpeg');
		
		// Dispatch event with captured image
		dispatch('image-captured', { image: imageData });
		
		// Stop camera after capturing
		stopCamera();
	}

	function retakePhoto() {
		capturedImage = null;
		startCamera();
	}

	// Start camera when component mounts
	import { onMount, onDestroy } from 'svelte';
	
	onMount(() => {
		if (!capturedImage) {
			startCamera();
		}
	});
	
	// Clean up on component destruction
	onDestroy(() => {
		stopCamera();
	});
</script>

<div class="camera-container">
	{#if capturedImage}
		<div class="mb-4 text-center">
			<p class="mb-2 text-[#1a5f4a]">Preview</p>
			<div class="relative mx-auto flex max-w-xs items-center justify-center overflow-hidden rounded-lg border-2 border-[#1a5f4a]/20 bg-gray-100">
				<img src={capturedImage} alt="Captured medicine" class="h-auto max-h-64 w-full object-contain" />
				<div class="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center text-xs text-white">
					Medicine image captured
				</div>
			</div>
		</div>
		<div class="mt-4 flex justify-center space-x-4">
			<Button variant="outline" size="md" on:click={retakePhoto}>
				Retake Photo
			</Button>
		</div>
	{:else}
		<div class="aspect-video">
			<div class="relative mx-auto flex max-w-md items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#1a5f4a]/30 bg-gray-100">
				{#if videoActive}
					<video 
						bind:this={videoElement} 
						class="h-full w-full max-h-64 object-cover"
						autoplay 
						playsinline>
						<track kind="captions" label="No captions available" />
					</video>
					
					<!-- Camera guide overlay -->
					<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
						<div class="h-64 w-64 border-2 border-[#1a5f4a] rounded-lg"></div>
					</div>
					
					<div class="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center text-xs text-white">
						Position the medicine package within the frame
					</div>
				{:else}
					<p class="text-center text-[#607d8b]">Initializing camera...</p>
				{/if}
			</div>
		</div>
		
		<!-- Canvas for capturing (hidden) -->
		<canvas bind:this={canvasElement} class="hidden"></canvas>

		<div class="mt-6 text-center">
            <Button variant="primary" size="lg" on:click={captureImage} disabled={!videoActive}>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                    <span>Capture Photo</span>
                </div>
            </Button>
        </div>
	{/if}
</div>