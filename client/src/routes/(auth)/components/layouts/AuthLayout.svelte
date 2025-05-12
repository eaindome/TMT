<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	
	// Theme color constant - easier to update in the future
	const themeColor = '#1a5f4a';
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
	<div class="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md border border-gray-100 transition-shadow duration-300 hover:shadow-lg">
		<div>
			<a href="/" class="flex justify-center transition-opacity hover:opacity-90">
				<img class="h-12 w-auto" src="/assets/images/logo.svg" alt="TrustMyTablet" />
			</a>
			<h2 class="mt-6 text-center text-2xl font-extrabold text-gray-800">{title}</h2>
			{#if subtitle}
				<p class="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
			{/if}
			<!-- Subtle theme-colored accent line -->
			<div class="mx-auto mt-4 h-1 w-16 rounded bg-[#1a5f4a]/80"></div>
		</div>

		<slot />

		<div class="mt-4 border-t border-gray-200 pt-4">
			<div class="flex items-center justify-center">
				<a href="/help" class="text-sm text-gray-600 hover:text-[#1a5f4a] transition-colors duration-200">Need help?</a>
				<span class="mx-2 text-gray-500">•</span>
				<a href="/privacy" class="text-sm text-gray-600 hover:text-[#1a5f4a] transition-colors duration-200">Privacy</a>
				<span class="mx-2 text-gray-500">•</span>
				<a href="/terms" class="text-sm text-gray-600 hover:text-[#1a5f4a] transition-colors duration-200">Terms</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* Add subtle theme-colored outline when the form container is hovered */
	div:hover {
		box-shadow: 0 10px 25px -5px rgba(26, 95, 74, 0.05), 
					0 8px 10px -6px rgba(26, 95, 74, 0.01);
	}
	
	/* Optional: Add a very subtle gradient background to the page */
	@media (min-width: 768px) {
		:global(body) {
			background: linear-gradient(to bottom right, #f9fafb, #f3f4f6, #f5f7f6);
		}
	}
</style>
