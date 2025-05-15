<script lang="ts">
	import { slide, fade } from 'svelte/transition';

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
	let isHovered = false;

	// Format date for better display
	function formatDate(dateString: string) {
		if (!dateString) return 'Unknown';
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
		} catch (e) {
			return dateString;
		}
	}
</script>

<div
	class="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role="region"
>
	<div class="border-b border-gray-100 bg-gradient-to-r from-[#1a5f4a]/5 to-[#1a5f4a]/10 px-6 py-4">
		<h2 class="text-xl font-bold text-[#1a5f4a]">Medicine Information</h2>
	</div>

	<div class="p-6">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
			<!-- Image with improved presentation -->
			<div class="sm:col-span-1">
				<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
					<div class="relative">
						<img
							src={medicine.imageSrc}
							alt={medicine.name}
							class="h-48 w-full object-cover transition-transform duration-700 sm:h-auto {isHovered
								? 'scale-105'
								: 'scale-100'}"
						/>
						<div
							class="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-white"
						>
							<span class="text-xs font-medium">Product Image</span>
						</div>
					</div>
				</div>

				<!-- Key verification indicators -->
				<div class="mt-3 rounded-md bg-[#1a5f4a]/10 p-3">
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 h-5 w-5 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clip-rule="evenodd"
							/>
						</svg>
						<span class="text-sm font-medium text-[#1a5f4a]">Verified authenticity</span>
					</div>
					<div class="mt-2 text-xs text-gray-600">
						Last checked: {new Date().toLocaleDateString()}
					</div>
				</div>
			</div>

			<!-- Basic Details with improved hierarchy -->
			<div class="sm:col-span-2">
				<div class="mb-4">
					<div class="flex items-center">
						<h3 class="text-2xl font-bold text-gray-800">{medicine.name}</h3>
						<span
							class="ml-2 rounded-full bg-[#1a5f4a]/10 px-2 py-0.5 text-xs font-medium text-[#1a5f4a]"
						>
							{medicine.form}
						</span>
					</div>
					<div class="mt-1 flex items-center text-sm text-gray-500">
						<span class="font-medium">{medicine.brand}</span>
						<span class="mx-2">•</span>
						<span>{medicine.strength}</span>
					</div>
				</div>

				<p class="mb-5 text-sm leading-relaxed text-gray-600">{medicine.description}</p>

				<!-- Key details with icons -->
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
					<div
						class="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3 h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
							/>
						</svg>
						<div>
							<p class="text-xs font-medium text-gray-500 uppercase">Manufacturer</p>
							<p class="text-sm font-medium text-gray-800">{medicine.manufacturer}</p>
						</div>
					</div>

					<div
						class="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3 h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<div>
							<p class="text-xs font-medium text-gray-500 uppercase">Expiry Date</p>
							<p class="text-sm font-medium text-gray-800">{formatDate(medicine.expiryDate)}</p>
						</div>
					</div>

					<div
						class="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3 h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
							/>
						</svg>
						<div>
							<p class="text-xs font-medium text-gray-500 uppercase">Batch Number</p>
							<p class="text-sm font-medium text-gray-800">{medicine.batchNumber}</p>
						</div>
					</div>

					<div
						class="flex items-start rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-3 h-5 w-5 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<div>
							<p class="text-xs font-medium text-gray-500 uppercase">Prescription</p>
							<p class="text-sm font-medium text-gray-800">Required</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Show More Details Toggle with improved button -->
		<button
			class="mt-6 flex w-full items-center justify-center rounded-md border border-[#1a5f4a]/20 bg-[#1a5f4a]/5 py-2 text-sm font-medium text-[#1a5f4a] transition-colors hover:bg-[#1a5f4a]/10"
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

		<!-- Full Details (Conditional) with improved sections -->
		{#if showFullDetails}
			<div
				class="mt-6 rounded-lg border border-gray-100 bg-gray-50"
				transition:slide={{ duration: 300 }}
			>
				<div class="border-b border-gray-100 bg-gray-100 px-4 py-3">
					<h3 class="text-md font-semibold text-gray-700">Additional Information</h3>
				</div>

				<div class="divide-y divide-gray-100">
					<!-- Usage & Dosage -->
					<div class="p-4">
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5 text-[#1a5f4a]"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
									clip-rule="evenodd"
								/>
							</svg>
							<h4 class="font-medium text-gray-700">Usage & Dosage</h4>
						</div>
						<p class="mt-2 text-sm leading-relaxed text-gray-600">
							Always follow your doctor's or pharmacist's instructions. The typical dosage varies
							based on condition being treated. Do not exceed the recommended dose.
						</p>
					</div>

					<!-- Storage & Warnings -->
					<div class="p-4">
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5 text-amber-500"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
							<h4 class="font-medium text-gray-700">Storage & Warnings</h4>
						</div>
						<ul class="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
							<li>Store in a cool, dry place away from direct sunlight</li>
							<li>Keep out of reach of children</li>
							<li>Do not use after expiry date</li>
							<li>May cause drowsiness - do not drive or operate machinery if affected</li>
						</ul>
					</div>

					<!-- Verification Details -->
					<div class="p-4">
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5 text-[#1a5f4a]"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clip-rule="evenodd"
								/>
							</svg>
							<h4 class="font-medium text-gray-700">Verification Notes</h4>
						</div>
						<div class="mt-2 rounded-md bg-white p-3 text-sm text-gray-600">
							<p>
								This verification result is based on our AI analysis and database matching. While
								highly accurate, please consult a healthcare professional for any concerns.
							</p>
							<div class="mt-2 flex items-center text-xs text-gray-500">
								<span class="rounded-full bg-green-100 px-2 py-0.5 text-green-800"
									>Blockchain verified</span
								>
								<span class="mx-2">•</span>
								<span>Last updated: {new Date().toLocaleDateString()}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	/* Add any additional custom styles here */
	:global(.transition-all) {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}
</style>
