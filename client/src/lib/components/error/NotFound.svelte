<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import SearchBar from '$lib/components/help/SearchBar.svelte';
	import ErrorIllustration from './ErrorIllustration.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let searchValue = '';
	let animationComplete = false;

	// Simulate navigation to home page
	function goHome() {
		// In a real SvelteKit app, you'd use the goto function or a link
		console.log('Navigating to home...');
		// goto('/');
	}

	// Handle search input
	function handleSearch(event: CustomEvent<string>) {
		console.log('Searching for:', event.detail);
		// Implement search logic here
	}

	onMount(() => {
		// Set animation complete after a delay
		setTimeout(() => {
			animationComplete = true;
		}, 800);
	});
</script>

<svelte:head>
	<title>Page Not Found | Fake Medicine Detection App</title>
	<meta name="description" content="Page not found - Error 404" />
</svelte:head>

<main class="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f5f5f5]">
	<div
		class="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden"
		in:fade={{ duration: 300, delay: 200 }}
	>
		<div class="p-6 md:p-12 flex flex-col items-center">
			<!-- Error Illustration -->
			<div class="w-full max-w-md mb-6" in:fade={{ duration: 500, delay: 300 }}>
				<ErrorIllustration />
			</div>

			<!-- Error Message -->
			<div class="text-center mb-8">
				<h1
					class="text-4xl md:text-5xl font-bold text-[#1a5f4a] mb-4"
					in:fly={{ y: 20, duration: 400, delay: 500 }}
				>
					404 - Page Not Found
				</h1>
				<p
					class="text-lg text-gray-600 max-w-lg"
					in:fly={{ y: 20, duration: 400, delay: 700 }}
				>
					Oops! It seems the medicine page you're looking for doesn't exist or has been moved.
				</p>
			</div>

			<!-- Action Buttons -->
			<div
				class="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8"
				in:fly={{ y: 20, duration: 400, delay: 900 }}
			>
				<Button variant="primary" fullWidth on:click={goHome}>
					Return to Dashboard
				</Button>
				<Button variant="outline" fullWidth on:click={() => window.history.back()}>
					Go Back
				</Button>
			</div>

			<!-- Search Section -->
			{#if animationComplete}
				<div class="w-full max-w-lg" in:fade={{ duration: 400 }}>
					<div class="text-center mb-4">
						<h2 class="text-lg font-medium text-gray-700">Looking for something specific?</h2>
					</div>
					<SearchBar
						value={searchValue}
						placeholder="Search medicines or features..."
						on:search={handleSearch}
						helpText="Try searching for medicine names, features, or help topics"
					/>
				</div>
			{/if}
		</div>

		<!-- Footer with additional links -->
		<div
			class="bg-gray-50 p-6 border-t border-gray-100 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm"
			in:fade={{ duration: 300, delay: 1100 }}
		>
			<a href="/help" class="text-[#1a5f4a] hover:underline">Help Center</a>
			<a href="/contact" class="text-[#1a5f4a] hover:underline">Contact Support</a>
			<a href="/faq" class="text-[#1a5f4a] hover:underline">FAQ</a>
			<a href="/scan" class="text-[#1a5f4a] hover:underline">Scan Medicine</a>
		</div>
	</div>
</main>

<style>
	:global(body) {
		background-color: #f5f5f5;
	}
</style>