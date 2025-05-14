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

<div class="mb-6">
	<div class="flex justify-center space-x-2 overflow-hidden rounded-lg bg-gray-200 p-1">
		<button
			class="w-1/2 rounded-md py-3 text-center transition-all duration-300 {scanMethod === 'camera' ? 'bg-white text-[#1a5f4a] shadow-md' : 'bg-transparent text-gray-600 hover:bg-white/50'} {!hasPermission ? 'cursor-not-allowed opacity-50' : ''}"
			on:click={() => selectMethod('camera')}
			disabled={!hasPermission}
		>
			<div class="flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
				</svg>
				Use Camera
			</div>
		</button>
		
		<button
			class="w-1/2 rounded-md py-3 text-center transition-all duration-300 {scanMethod === 'upload' ? 'bg-white text-[#1a5f4a] shadow-md' : 'bg-transparent text-gray-600 hover:bg-white/50'}"
			on:click={() => selectMethod('upload')}
		>
			<div class="flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
				</svg>
				Upload Image
			</div>
		</button>
	</div>
</div>