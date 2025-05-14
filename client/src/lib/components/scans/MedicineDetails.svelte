<script lang="ts">
	import { slide } from 'svelte/transition';
	// Define Medicine type
	type Medicine = {
		name: string;
		brand: string;
		strength: string;
		form: string;
		expiryDate: string;
		batchNumber: string;
		manufacturer: string;
		description: string;
		imageSrc: string;
	};
	
	// Props
	export let medicine: Medicine;
	
	// State
	let showFullDetails = false;
</script>

<div class="overflow-hidden rounded-xl bg-white shadow-md">
	<div class="p-6">
		<h2 class="mb-4 text-xl font-bold text-gray-800">Medicine Information</h2>
		
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<!-- Image -->
			<div class="sm:col-span-1">
				<div class="overflow-hidden rounded-lg bg-gray-100">
					<img src={medicine.imageSrc} alt={medicine.name} class="h-48 w-full object-cover sm:h-auto" />
				</div>
			</div>
			
			<!-- Basic Details -->
			<div class="sm:col-span-2">
				<h3 class="mb-1 text-lg font-semibold text-gray-800">{medicine.name}</h3>
				<p class="mb-4 text-sm text-gray-600">{medicine.description}</p>
				
				<div class="grid grid-cols-2 gap-x-4 gap-y-2">
					<div>
						<p class="text-xs font-medium text-gray-500">Brand</p>
						<p class="text-sm font-medium text-gray-800">{medicine.brand}</p>
					</div>
					
					<div>
						<p class="text-xs font-medium text-gray-500">Strength</p>
						<p class="text-sm font-medium text-gray-800">{medicine.strength}</p>
					</div>
					
					<div>
						<p class="text-xs font-medium text-gray-500">Form</p>
						<p class="text-sm font-medium text-gray-800">{medicine.form}</p>
					</div>
					
					<div>
						<p class="text-xs font-medium text-gray-500">Expiry Date</p>
						<p class="text-sm font-medium text-gray-800">{medicine.expiryDate}</p>
					</div>
				</div>
			</div>
		</div>
		
		<!-- Show More Details Toggle -->
		<button
			class="mt-4 flex items-center text-sm font-medium text-[#1a5f4a] hover:text-[#154739]"
			on:click={() => (showFullDetails = !showFullDetails)}
		>
			{showFullDetails ? 'Hide' : 'Show'} Full Details
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="ml-1 h-4 w-4 transition-transform duration-300 {showFullDetails ? 'rotate-180' : ''}"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		
		<!-- Full Details (Conditional) -->
		{#if showFullDetails}
			<div class="mt-4 grid grid-cols-1 gap-4 border-t border-gray-200 pt-4 sm:grid-cols-2" transition:slide={{ duration: 300 }}>
				<div>
					<p class="text-xs font-medium text-gray-500">Manufacturer</p>
					<p class="text-sm font-medium text-gray-800">{medicine.manufacturer}</p>
				</div>
				
				<div>
					<p class="text-xs font-medium text-gray-500">Batch Number</p>
					<p class="text-sm font-medium text-gray-800">{medicine.batchNumber}</p>
				</div>
				
				<div class="sm:col-span-2">
					<p class="text-xs font-medium text-gray-500">Usage & Warnings</p>
					<p class="text-sm text-gray-700">
						Always follow your doctor's or pharmacist's instructions. Store in a cool, dry place away from direct sunlight. Keep out of reach of children.
					</p>
				</div>
				
				<div class="sm:col-span-2">
					<p class="text-xs font-medium text-gray-500">Verification Notes</p>
					<p class="text-sm text-gray-700">
						This verification result is based on our AI analysis and database matching. While highly accurate, please consult a healthcare professional for any concerns.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>