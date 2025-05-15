<script lang="ts">
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import Button from '$lib/components/Button.svelte';

	export let capturedImage: string | null = null;
	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	let stream: MediaStream | null = null;
	let videoActive = false;
	let cameraError = false;
	let isCapturing = false;

	const dispatch = createEventDispatcher();

	async function startCamera() {
		try {
			cameraError = false;
			stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: 'environment',
					width: { ideal: 1280 },
					height: { ideal: 720 }
				}
			});

			if (videoElement) {
				videoElement.srcObject = stream;
				await videoElement.play();
				videoActive = true;
			}
		} catch (err) {
			console.error('Error accessing camera:', err);
			cameraError = true;
		}
	}

	function stopCamera() {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
			videoActive = false;
		}
	}

	function captureImage() {
		if (!videoElement || !canvasElement) return;

		isCapturing = true;

		const context = canvasElement.getContext('2d');
		if (!context) return;

		// Set canvas dimensions to match video
		canvasElement.width = videoElement.videoWidth;
		canvasElement.height = videoElement.videoHeight;

		// Draw video frame on canvas
		context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

		// Get the image data as a base64 string
		const imageData = canvasElement.toDataURL('image/jpeg', 0.95);

		// Dispatch event with captured image
		dispatch('image-captured', { image: imageData });

		// Add a slight delay to show capturing animation
		setTimeout(() => {
			isCapturing = false;
			// Stop camera after capturing
			stopCamera();
		}, 300);
	}

	function retakePhoto() {
		capturedImage = null;
		startCamera();
	}

	// Start camera when component mounts
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
		<div class="mb-6 rounded-xl bg-white p-4 shadow-md" in:fade={{ duration: 300 }}>
			<div class="mb-3 flex items-center justify-between">
				<h3 class="text-md font-medium text-gray-800">Preview Your Image</h3>
				<span class="rounded-full bg-[#1a5f4a]/10 px-3 py-1 text-xs font-medium text-[#1a5f4a]">
					Captured Successfully
				</span>
			</div>

			<div
				class="relative mx-auto overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-inner"
			>
				<img
					src={capturedImage}
					alt="Captured medicine"
					class="h-auto max-h-[400px] w-full object-contain"
				/>
				<div
					class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3"
				>
					<div class="flex items-center justify-between">
						<span class="text-xs font-medium text-white">Medicine Image</span>
						<span class="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white">
							{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>
				</div>
			</div>

			<div class="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
				<Button variant="outline" size="md" on:click={retakePhoto}>
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1.5 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						<span>Retake Photo</span>
					</div>
				</Button>
				<Button variant="primary" size="md">
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1.5 h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
						<span>Continue with this Image</span>
					</div>
				</Button>
			</div>

			<div class="mt-3 rounded-md bg-blue-50 p-2 text-xs text-blue-700">
				<div class="flex items-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mt-0.5 mr-1.5 h-3 w-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span
						>Make sure text is clearly visible and the image is well-lit for best verification
						results.</span
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-xl bg-white p-4 shadow-md" in:fade={{ duration: 300 }}>
			<div class="mb-3 flex items-center justify-between">
				<h3 class="text-md font-medium text-gray-800">Take a Photo</h3>
				{#if videoActive}
					<span
						class="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
					>
						<span class="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"
						></span>
						Camera Active
					</span>
				{:else}
					<span
						class="flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500"
					>
						<span class="mr-1.5 inline-block h-2 w-2 rounded-full bg-gray-400"></span>
						Initializing...
					</span>
				{/if}
			</div>

			<div class="aspect-video">
				<div
					class="relative mx-auto flex h-full max-w-md items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-900 shadow-inner"
				>
					{#if videoActive}
						<video bind:this={videoElement} class="h-full w-full object-cover" autoplay playsinline>
							<track kind="captions" label="No captions available" />
						</video>

						<!-- Camera guide overlay -->
						<div class="pointer-events-none absolute inset-0 flex items-center justify-center">
							<div class="h-64 w-64 rounded-lg border-2 border-white/70 shadow-lg"></div>

							<!-- Corner markers for better framing -->
							<div
								class="absolute top-0 left-0 h-8 w-8 rounded-tl-lg border-t-2 border-l-2 border-white/90"
							></div>
							<div
								class="absolute top-0 right-0 h-8 w-8 rounded-tr-lg border-t-2 border-r-2 border-white/90"
							></div>
							<div
								class="absolute bottom-0 left-0 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-white/90"
							></div>
							<div
								class="absolute right-0 bottom-0 h-8 w-8 rounded-br-lg border-r-2 border-b-2 border-white/90"
							></div>
						</div>

						<div
							class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-center"
						>
							<span class="text-sm font-medium text-white"
								>Position the medicine package within the frame</span
							>
						</div>
					{:else if cameraError}
						<div class="flex flex-col items-center justify-center p-6 text-center">
							<div class="mb-3 rounded-full bg-red-100 p-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-red-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<p class="mb-2 text-lg font-medium text-red-600">Camera Access Denied</p>
							<p class="text-sm text-gray-500">
								Please allow camera access in your browser settings to continue.
							</p>
							<button
								class="mt-4 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
								on:click={startCamera}
							>
								Try Again
							</button>
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center">
							<div
								class="mb-2 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#1a5f4a]"
							></div>
							<p class="text-sm text-gray-300">Initializing camera...</p>
						</div>
					{/if}
				</div>
			</div>

			<!-- Canvas for capturing (hidden) -->
			<canvas bind:this={canvasElement} class="hidden"></canvas>

			<div class="mt-5">
				<Button
					variant="primary"
					size="lg"
					fullWidth={true}
					on:click={captureImage}
					disabled={!videoActive || isCapturing}
				>
					<div class="flex items-center justify-center">
						{#if isCapturing}
							<div
								class="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
							></div>
							<span>Capturing...</span>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
									clip-rule="evenodd"
								/>
							</svg>
							<span>Capture Photo</span>
						{/if}
					</div>
				</Button>
			</div>

			<div class="mt-3 divide-y divide-gray-100 rounded-md bg-gray-50 text-xs">
				<div class="flex items-center p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4 text-[#1a5f4a]"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-gray-700">Ensure good lighting for best results</span>
				</div>
				<div class="flex items-center p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 h-4 w-4 text-[#1a5f4a]"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
							clip-rule="evenodd"
						/>
					</svg>
					<span class="text-gray-700">Make sure the barcode and expiry date are visible</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Add any custom styles needed */
	:global(.camera-container) {
		max-width: 600px;
		margin: 0 auto;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.animate-pulse {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}
</style>
