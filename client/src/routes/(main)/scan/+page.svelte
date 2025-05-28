<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import ScanMethodSelector from '$lib/components/scans/ScanMethodSelector.svelte';
	import FileUpload from '$lib/components/scans/FileUpload.svelte';
	import CameraCapture from '$lib/components/scans/Capture.svelte';
	import { goto } from '$app/navigation';

	// Scan type: 'camera' or 'upload'
	let scanMethod: 'camera' | 'upload' = 'camera';
	let isScanning = false;
	let scanComplete = false;
	let capturedImage: string | null = null;
	let fileToUpload: File | null = null;
	let hasPermission = false;
	let showPermissionAlert = false;

	onMount(() => {
		// Check if camera is available
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(() => {
					hasPermission = true;
				})
				.catch(() => {
					hasPermission = false;
					if (scanMethod === 'camera') {
						scanMethod = 'upload';
						showPermissionAlert = true;
					}
				});
		} else {
			hasPermission = false;
			if (scanMethod === 'camera') {
				scanMethod = 'upload';
			}
		}
	});

	function handleImageCapture(event: CustomEvent) {
		capturedImage = event.detail.image;
	}

	function handleFileSelect(event: CustomEvent) {
		fileToUpload = event.detail.file;
		capturedImage = event.detail.preview;
	}

	function startScan() {
		if (!capturedImage && scanMethod === 'camera') {
			return;
		}
		
		if (!fileToUpload && !capturedImage && scanMethod === 'upload') {
			return;
		}
		
		isScanning = true;
		
		// Simulate scan process
		setTimeout(() => {
			isScanning = false;
			scanComplete = true;
			
			// Redirect to results page (with a small delay to show completion animation)
			setTimeout(() => {
				// In a real app, you'd pass the scan result ID or data
				goto('/scan-result?result=verified');
			}, 800);
		}, 2000);
	}

	function resetScan() {
		capturedImage = null;
		fileToUpload = null;
		scanComplete = false;
	}

	$: canScan = (scanMethod === 'camera' && capturedImage) || (scanMethod === 'upload' && fileToUpload);
</script>

<div class="min-h-screen pt-6 pb-16">
	<div class="container mx-auto max-w-3xl px-4">
		<!-- Header -->
		<div class="mb-8 text-center -mt-4">
			<h1 class="mb-2 text-3xl font-bold text-gray-800 text-left">Scan Medicine</h1>
			<p class="text-lg text-[#607d8b] text-left">
				Verify your medicine's authenticity by uploading a photo or using your camera
			</p>
		</div>

		{#if showPermissionAlert}
			<div class="mb-6 rounded-lg bg-[#f4b400] p-4 text-black">
				<p class="flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" 
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
							clip-rule="evenodd" />
					</svg>
					Camera access is required for scanning. Please enable camera permissions or use file upload instead.
				</p>
			</div>
		{/if}

		<!-- Scan Method Selector -->
		<ScanMethodSelector bind:scanMethod hasPermission={hasPermission} />

		<!-- Main Content -->
		<div class="mb-8 overflow-hidden rounded-xl bg-white p-6 shadow-md">
			{#if scanMethod === 'camera'}
				<CameraCapture on:image-captured={handleImageCapture} capturedImage={capturedImage} />
			{:else}
				<FileUpload on:file-selected={handleFileSelect} capturedImage={capturedImage} />
			{/if}
		</div>

		<!-- Action Buttons -->
		<div class="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
			{#if capturedImage}
				<Button variant="outline" on:click={resetScan}>
					Reset
				</Button>
			{/if}
			
			<Button 
				variant="primary" 
				size="lg" 
				fullWidth={true}
				disabled={!canScan} 
				loading={isScanning}
				loadingText="Scanning..."
				on:click={startScan}>
				{#if scanComplete}
					Scan Complete
				{:else}
					Verify Medicine
				{/if}
			</Button>
		</div>

		<div class="mt-8 text-center text-sm text-[#607d8b]">
			<p>For best results, ensure good lighting and position the medicine packaging properly in frame.</p>
			<p class="mt-2">
				Having trouble? <a href="/help" class="text-[#0288d1] hover:underline">Visit our Help Center</a>
			</p>
		</div>
	</div>
</div>