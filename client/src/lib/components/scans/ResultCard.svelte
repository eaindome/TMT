<script lang="ts">
	export let result: 'verified' | 'caution' | 'fake';
	export let scanTimestamp = new Date(); // Allow timestamp to be passed in

	// Status configurations based on result type
	const statusConfig = {
		verified: {
			title: 'Verified Safe',
			description: 'This medicine appears to be authentic based on our verification system.',
			icon: 'check',
			bgColor: 'bg-gradient-to-r from-[#43a047] to-[#4caf50]',
			textColor: 'text-white',
			borderColor: 'border-[#388e3c]',
			iconBg: 'bg-white/20',
			animation: 'animate-pulse-slow'
		},
		caution: {
			title: 'Needs Caution',
			description:
				'We found some inconsistencies. Consult with a healthcare professional before use.',
			icon: 'caution',
			bgColor: 'bg-gradient-to-r from-[#f0a800] to-[#f4b400]',
			textColor: 'text-gray-900',
			borderColor: 'border-[#e69c00]',
			iconBg: 'bg-white/30',
			animation: ''
		},
		fake: {
			title: 'Flagged as Fake',
			description:
				'This medicine does not match our records of authentic products. DO NOT CONSUME.',
			icon: 'warning',
			bgColor: 'bg-gradient-to-r from-[#c62828] to-[#d32f2f]',
			textColor: 'text-white',
			borderColor: 'border-[#b71c1c]',
			iconBg: 'bg-white/20',
			animation: 'animate-pulse-slow'
		}
	};

	// Get current configuration based on result
	$: config = statusConfig[result];

	// Generate scan ID deterministically instead of randomly each render
	$: scanId = `TMT-${scanTimestamp.getTime().toString(36).slice(-8).toUpperCase()}`;
</script>

<div
	class="overflow-hidden rounded-xl border-b-4 bg-white shadow-lg transition-all duration-300 hover:shadow-xl {config.borderColor}"
>
	<div class="p-6 {config.bgColor} {config.textColor}">
		<div class="flex items-center">
			<!-- Icon based on result -->
			{#if config.icon === 'check'}
				<div
					class="mr-4 flex h-14 w-14 items-center justify-center rounded-full {config.iconBg} {config.animation}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-9 w-9"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			{:else if config.icon === 'caution'}
				<div
					class="mr-4 flex h-14 w-14 items-center justify-center rounded-full {config.iconBg} {config.animation}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-9 w-9"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			{:else if config.icon === 'warning'}
				<div
					class="mr-4 flex h-14 w-14 items-center justify-center rounded-full {config.iconBg} {config.animation}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-9 w-9"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</div>
			{/if}

			<div>
				<h2 class="text-2xl font-bold">{config.title}</h2>
				<p class="mt-1 text-base opacity-90">{config.description}</p>
			</div>
		</div>
	</div>

	<div class="bg-white p-5">
		<!-- Status tag - more prominent -->
		<div
			class="mb-4 inline-block rounded-full px-4 py-1 text-sm font-semibold {result === 'verified'
				? 'bg-[#4caf50]/10 text-[#388e3c]'
				: result === 'caution'
					? 'bg-[#f4b400]/10 text-[#e69c00]'
					: 'bg-[#d32f2f]/10 text-[#b71c1c]'}"
		>
			{result === 'verified'
				? 'Authentic'
				: result === 'caution'
					? 'Verify Further'
					: 'Potentially Counterfeit'}
		</div>

		<div
			class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
		>
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-4 w-4 text-gray-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="text-sm font-medium text-gray-600">
					Scanned {scanTimestamp.toLocaleDateString()} at {scanTimestamp.toLocaleTimeString([], {
						hour: '2-digit',
						minute: '2-digit'
					})}
				</span>
			</div>

			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-2 h-4 w-4 text-gray-500"
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
				<span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
					ID: {scanId}
				</span>
			</div>
		</div>

		<div class="mt-4 border-t border-gray-100 pt-4 text-sm leading-relaxed text-gray-700">
			{#if result === 'verified'}
				<div class="flex items-start">
					<div
						class="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-[#4caf50]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p>This product appears to match authentic records.</p>
				</div>
				<div class="mt-2 flex items-start">
					<div
						class="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-[#4caf50]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p>Always purchase medications from licensed pharmacies.</p>
				</div>
			{:else if result === 'caution'}
				<div class="flex items-start">
					<div
						class="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f4b400]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-[#f4b400]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p>Some elements of this product could not be fully verified.</p>
				</div>
				<div class="mt-2 flex items-start">
					<div
						class="mt-1 mr-3 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#f4b400]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 text-[#f4b400]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<p>Consult with a healthcare professional before using this medication.</p>
				</div>
			{:else}
				<div class="rounded-md bg-[#d32f2f]/10 p-3">
					<div class="flex">
						<div class="mr-3 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-[#d32f2f]"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div>
							<p class="font-semibold text-[#d32f2f]">DO NOT USE this product.</p>
							<p class="mt-1 text-[#d32f2f]">
								It does not match our database of authentic medications. Using counterfeit
								medication can be dangerous to your health.
							</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Add a slow pulse animation for warning and success icons */
	@keyframes pulse-slow {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.8;
		}
	}

	.animate-pulse-slow {
		animation: pulse-slow 3s ease-in-out infinite;
	}
</style>
