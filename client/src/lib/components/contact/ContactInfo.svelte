<script lang="ts">
	import { fade } from 'svelte/transition';
	export let showTitle = true;
	export let compactView = false;
	export let accentColor = '#1a5f4a';

	// Contact items data for better maintainability
	const contactItems = [
		{
			type: 'email',
			title: 'Email',
			value: 'support@trustmytablet.com',
			link: 'mailto:support@trustmytablet.com',
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />`
		},
		{
			type: 'phone',
			title: 'Phone',
			value: '+1 (555) 123-4567',
			link: 'tel:+15551234567',
			note: '(For regulatory inquiries or partnerships)',
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />`
		},
		{
			type: 'address',
			title: 'Address',
			value: ['123 Health Tech Plaza', 'Suite 456', 'San Francisco, CA 94103'],
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />`
		},
		{
			type: 'hours',
			title: 'Hours',
			value: ['Monday - Friday: 9:00 AM - 5:00 PM PST', 'Support available 24/7 via email'],
			icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`
		}
	];
</script>

<div
	class="rounded-lg border border-gray-100 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
>
	{#if showTitle}
		<div class="mb-6 flex items-center border-b border-gray-100 pb-3">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5"
				style="color: {accentColor}"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			<h2 class="text-xl font-bold" style="color: {accentColor}">Contact Information</h2>
		</div>
	{/if}

	<div class="space-y-5">
		{#each contactItems as item, i}
			{#if item.type !== 'hours' || !compactView}
				<div
					class="flex items-start rounded-md p-3 transition-all duration-300 hover:bg-gray-50"
					in:fade={{ delay: i * 150, duration: 300 }}
				>
					<div
						class="bg-opacity-10 flex-shrink-0 rounded-full p-2"
						style="background-color: {accentColor}20;"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							style="color: {accentColor}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{@html item.icon}
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-sm font-medium text-gray-700">{item.title}</h3>

						{#if item.type === 'email'}
							<a
								href={item.link}
								class="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
							>
								{item.value}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ml-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
									/>
								</svg>
							</a>
						{:else if item.type === 'phone'}
							<a
								href={item.link}
								class="font-medium text-gray-700 transition-colors duration-200 hover:text-blue-600"
							>
								{item.value}
								{#if !compactView && item.note}
									<span class="ml-1 text-xs text-gray-500">{item.note}</span>
								{/if}
							</a>
						{:else if Array.isArray(item.value)}
							<div class="text-gray-600">
								{#each item.value as line, index}
									<p class={index > 0 ? 'mt-1' : ''}>{line}</p>
								{/each}
							</div>
						{:else}
							<p class="text-gray-600">{item.value}</p>
						{/if}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style>
	/* Smooth hover transitions */
	a {
		transition: all 0.2s ease-in-out;
	}

	/* Ensure line breaks in address */
	p {
		line-height: 1.5;
	}
</style>
