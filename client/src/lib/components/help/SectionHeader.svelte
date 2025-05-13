<script lang="ts">
	// SectionHeader component - Displays section title with icon
	export let title: string;
	export let icon: string;
	export let count: number | undefined = undefined; // Optional count of items in section
	export let description: string | undefined = undefined; // Optional description
</script>

<div class="mb-6">
	<div class="flex items-center">
		<!-- Icon with gradient background and shadow -->
		<div
			class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#267d63] shadow-md"
		>
			{#if icon === 'smartphone'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
					/>
				</svg>
			{:else if icon === 'shield'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					/>
				</svg>
			{:else if icon === 'check-circle'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			{:else if icon === 'user'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			{:else if icon === 'help-circle'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 text-white"
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
			{/if}
		</div>

		<div>
			<div class="flex items-center">
				<h2 class="text-2xl font-bold text-[#1a5f4a]">{title}</h2>

				<!-- Optional item count badge -->
				{#if count !== undefined}
					<span
						class="ml-3 rounded-full bg-[#1a5f4a]/10 px-2.5 py-0.5 text-sm font-medium text-[#1a5f4a]"
					>
						{count}
						{count === 1 ? 'item' : 'items'}
					</span>
				{/if}
			</div>

			<!-- Optional description -->
			{#if description}
				<p class="mt-1 text-sm text-gray-600">{description}</p>
			{/if}
		</div>
	</div>

	<!-- Decorative line that extends from the icon -->
	<div class="mt-6 flex items-center">
		<div class="ml-7 h-0.5 w-6 bg-[#1a5f4a]/20"></div>
		<div class="h-0.5 flex-grow bg-gray-100"></div>
	</div>
</div>
