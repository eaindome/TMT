<script lang="ts">
	export let scanMethod: 'camera' | 'upload' = 'camera';
	export let hasPermission: boolean = true;

	function selectMethod(method: 'camera' | 'upload') {
		if (method === 'camera' && !hasPermission) {
			return;
		}
		scanMethod = method;
	}
</script>

<div class="mb-8 select-none">
	<h3 class="mb-3 text-center text-sm font-medium text-gray-600">Choose Scan Method</h3>

	<div
		class="flex justify-center space-x-3 overflow-hidden rounded-xl bg-gray-100 p-2 shadow-inner"
	>
		<!-- Camera Button -->
		<button
			class="group relative w-1/2 overflow-hidden rounded-lg py-4 text-center transition-all duration-300
                {scanMethod === 'camera'
				? 'bg-white text-[#1a5f4a] shadow-md ring-1 ring-[#1a5f4a]/10'
				: 'bg-transparent text-gray-600 hover:bg-white/50'} 
                {!hasPermission ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}"
			on:click={() => selectMethod('camera')}
			disabled={!hasPermission}
			aria-label="Use camera to capture image"
			aria-pressed={scanMethod === 'camera'}
			aria-disabled={!hasPermission}
		>
			<div class="flex flex-col items-center justify-center">
				<div
					class="mb-2 rounded-full bg-[#1a5f4a]/10 p-2 transition-all duration-300
                    {scanMethod === 'camera'
						? 'scale-110 bg-[#1a5f4a]/15'
						: 'group-hover:scale-105 group-hover:bg-[#1a5f4a]/5'}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<span class="font-medium">Use Camera</span>
				<span class="mt-1 text-xs opacity-70">Take a photo now</span>

				{#if !hasPermission}
					<div class="mt-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-800">
						Permission needed
					</div>
				{/if}
			</div>

			{#if scanMethod === 'camera'}
				<div class="absolute bottom-0 left-0 h-1 w-full bg-[#1a5f4a]"></div>
			{/if}
		</button>

		<!-- Upload Button -->
		<button
			class="group relative w-1/2 overflow-hidden rounded-lg py-4 text-center transition-all duration-300
                {scanMethod === 'upload'
				? 'bg-white text-[#1a5f4a] shadow-md ring-1 ring-[#1a5f4a]/10'
				: 'bg-transparent text-gray-600 hover:bg-white/50'}"
			on:click={() => selectMethod('upload')}
			aria-label="Upload an existing image"
			aria-pressed={scanMethod === 'upload'}
		>
			<div class="flex flex-col items-center justify-center">
				<div
					class="mb-2 rounded-full bg-[#1a5f4a]/10 p-2 transition-all duration-300
                    {scanMethod === 'upload'
						? 'scale-110 bg-[#1a5f4a]/15'
						: 'group-hover:scale-105 group-hover:bg-[#1a5f4a]/5'}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
				<span class="font-medium">Upload Image</span>
				<span class="mt-1 text-xs opacity-70">Use existing photo</span>
			</div>

			{#if scanMethod === 'upload'}
				<div class="absolute bottom-0 left-0 h-1 w-full bg-[#1a5f4a]"></div>
			{/if}
		</button>
	</div>

	<!-- Optional: Helptext -->
	<p class="mt-2 text-center text-xs text-gray-500">
		{#if scanMethod === 'camera'}
			Position medicine packaging in good lighting for best results
		{:else}
			Select a clear image showing product details and barcode
		{/if}
	</p>
</div>

<style>
	/* Clean up any SVG specifics */
	svg {
		display: inline-block;
		vertical-align: middle;
	}
</style>
