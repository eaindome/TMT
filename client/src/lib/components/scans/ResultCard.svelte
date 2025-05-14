<script lang="ts">
	export let result: 'verified' | 'caution' | 'fake';
	
	// Status configurations based on result type
	const statusConfig = {
		verified: {
			title: 'Verified Safe',
			description: 'This medicine appears to be authentic based on our verification system.',
			icon: 'check',
			bgColor: 'bg-[#4caf50]',
			textColor: 'text-white',
			borderColor: 'border-[#388e3c]'
		},
		caution: {
			title: 'Needs Caution',
			description: 'We found some inconsistencies. Consult with a healthcare professional before use.',
			icon: 'caution',
			bgColor: 'bg-[#f4b400]',
			textColor: 'text-black',
			borderColor: 'border-[#e69c00]'
		},
		fake: {
			title: 'Flagged as Fake',
			description: 'This medicine does not match our records of authentic products. DO NOT CONSUME.',
			icon: 'warning',
			bgColor: 'bg-[#d32f2f]',
			textColor: 'text-white',
			borderColor: 'border-[#b71c1c]'
		}
	};
	
	// Get current configuration based on result
	$: config = statusConfig[result];
</script>

<div class="overflow-hidden rounded-xl border-b-4 bg-white shadow-lg {config.borderColor}">
	<div class="p-6 {config.bgColor} {config.textColor}">
		<div class="flex items-center">
			<!-- Icon based on result -->
			{#if config.icon === 'check'}
				<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
					</svg>
				</div>
			{:else if config.icon === 'caution'}
				<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
				</div>
			{:else if config.icon === 'warning'}
				<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
					</svg>
				</div>
			{/if}
			
			<div>
				<h2 class="text-xl font-bold">{config.title}</h2>
				<p class="mt-1 opacity-90">{config.description}</p>
			</div>
		</div>
	</div>
	
	<div class="bg-white p-4">
		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<div class="mr-3 h-2 w-2 rounded-full {result === 'verified' ? 'bg-[#4caf50]' : result === 'caution' ? 'bg-[#f4b400]' : 'bg-[#d32f2f]'}"></div>
				<span class="text-sm font-medium text-gray-600">
					Scanned {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</span>
			</div>
			
			<span class="text-xs rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600">
				ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
			</span>
		</div>
		
		<div class="mt-3 text-sm text-gray-600">
			{#if result === 'verified'}
				<p>This product appears to match authentic records. Always purchase medications from licensed pharmacies.</p>
			{:else if result === 'caution'}
				<p>Some elements of this product could not be fully verified. Consult with a healthcare professional before using.</p>
			{:else}
				<p class="font-semibold text-[#d32f2f]">DO NOT USE this product. It does not match our database of authentic medications.</p>
			{/if}
		</div>
	</div>
</div>