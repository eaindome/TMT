<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	export let title: string;
	export let description: string;
	export let icon: 'report' | 'location' | 'share' | 'info';
	export let buttonText: string;
	export let buttonVariant: 'primary' | 'outline' | 'secondary' = 'primary';
	export let href: string;

	// Add hover effect state
	let isHovered = false;
</script>

<div
	class="rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg"
	on:mouseenter={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
	role="region"
>
	<div class="flex items-start gap-4">
		<!-- Icon container - slightly larger for better visibility -->
		<div
			class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1a5f4a]/10 transition-all duration-300 {isHovered
				? 'bg-[#1a5f4a]/20'
				: ''}"
		>
			{#if icon === 'report'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-[#1a5f4a]"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else if icon === 'location'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-[#1a5f4a]"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
						clip-rule="evenodd"
					/>
				</svg>
			{:else if icon === 'share'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-[#1a5f4a]"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
					/>
				</svg>
			{:else if icon === 'info'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 text-[#1a5f4a]"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
			{/if}
		</div>

		<!-- Content container -->
		<div class="flex-1">
			<h3
				class="text-lg font-semibold text-gray-800 transition-colors {isHovered
					? 'text-[#1a5f4a]'
					: ''}"
			>
				{title}
			</h3>
			<p class="mt-1 text-sm text-gray-600">{description}</p>

			<!-- Button positioned at the bottom of the content area -->
			<div class="mt-4">
				<a {href} class="inline-block w-full">
					<Button variant={buttonVariant} size="sm" fullWidth={true}>
						<span class="flex items-center justify-center">
							{buttonText}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-1 h-4 w-4 transition-transform duration-300 {isHovered
									? 'translate-x-0.5'
									: ''}"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fill-rule="evenodd"
									d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</span>
					</Button>
				</a>
			</div>
		</div>
	</div>
</div>
