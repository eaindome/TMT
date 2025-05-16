<script lang="ts">
	export let images: string[];

	let currentImageIndex = 0;
	let showZoom = false;
	let touchStart = 0;
	let touchEnd = 0;

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % images.length;
		showZoom = false; // Reset zoom when changing images
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
		showZoom = false; // Reset zoom when changing images
	}

	function toggleZoom() {
		showZoom = !showZoom;
	}

	function handleTouchStart(e: TouchEvent) {
		touchStart = e.changedTouches[0].screenX;
	}

	function handleTouchEnd(e: TouchEvent) {
		touchEnd = e.changedTouches[0].screenX;
		handleSwipe();
	}

	function handleSwipe() {
		const minSwipeDistance = 50;
		const swipeDistance = touchStart - touchEnd;

		if (Math.abs(swipeDistance) > minSwipeDistance && images.length > 1) {
			if (swipeDistance > 0) {
				nextImage(); // Left swipe, next image
			} else {
				prevImage(); // Right swipe, previous image
			}
		}
	}
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-200 p-4">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-medium text-gray-900">Package Images</h2>
			<span class="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
				{currentImageIndex + 1} / {images.length}
			</span>
		</div>
	</div>

	<div class="p-5">
		<div class="relative">
			<!-- Main Image Container -->
			<div
				class="relative h-64 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 md:h-96"
				on:touchstart={handleTouchStart}
				on:touchend={handleTouchEnd}
			>
				<button
					type="button"
					class="m-0 flex h-full w-full cursor-zoom-in items-center justify-center border-none bg-transparent p-0"
					class:cursor-zoom-out={showZoom}
					on:click={toggleZoom}
					aria-label={showZoom ? 'Shrink image' : 'Zoom image'}
				>
					<div class="flex h-full w-full items-center justify-center overflow-hidden">
						<img
							src={images[currentImageIndex]}
							alt={`Medicine package ${currentImageIndex + 1}`}
							class="max-h-full max-w-full object-contain transition-transform duration-300 ease-out"
							class:scale-150={showZoom}
							class:hover:scale-110={!showZoom}
							draggable="false"
						/>
					</div>
				</button>

				<!-- Zoom indicator -->
				<div
					class="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white shadow-sm backdrop-blur-sm"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-3 w-3"
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
					{showZoom ? 'Click to reset' : 'Click to zoom'}
				</div>
			</div>

			{#if images.length > 1}
				<!-- Navigation arrows - semi-transparent on mobile, more visible on hover/desktop -->
				<button
					class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border border-gray-200/50 bg-white/60 p-2 opacity-50 shadow-sm transition-all hover:bg-white/90 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none md:opacity-70"
					on:click={prevImage}
					aria-label="Previous image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-700"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<button
					class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border border-gray-200/50 bg-white/60 p-2 opacity-50 shadow-sm transition-all hover:bg-white/90 hover:opacity-100 focus:opacity-100 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none md:opacity-70"
					on:click={nextImage}
					aria-label="Next image"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 text-gray-700"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			{/if}
		</div>

		{#if images.length > 1}
			<!-- Thumbnail Navigation -->
			<!-- <div class="mt-4 flex flex-wrap justify-center gap-2">
				<div
					class="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent flex max-w-full gap-2 overflow-x-auto pb-2"
				>
					{#each images as image, index}
						<button
							class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md transition-all focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
							class:ring-2={currentImageIndex === index}
							class:ring-gray-800={currentImageIndex === index}
							class:opacity-60={currentImageIndex !== index}
							class:hover:opacity-100={currentImageIndex !== index}
							on:click={() => {
								currentImageIndex = index;
								showZoom = false;
							}}
							aria-label={`View image ${index + 1}`}
							aria-current={currentImageIndex === index ? 'true' : 'false'}
						>
							<img src={image} alt={`Thumbnail ${index + 1}`} class="h-full w-full object-cover" />
						</button>
					{/each}
				</div>
			</div> -->

			<!-- Swipe hint for mobile - only shown on first load -->
			<div class="mt-3 text-center text-xs text-gray-500">
				<span class="inline-flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1 h-3 w-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
						/>
					</svg>
					Swipe to navigate between images
				</span>
			</div>
		{/if}
	</div>
</div>
