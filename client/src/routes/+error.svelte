<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import SearchBar from '$lib/components/help/SearchBar.svelte';
	import ErrorIllustration from '$lib/components/error/ErrorIllustration.svelte';
	import Animated404Text from '$lib/components/error/Animated404Text.svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let searchValue = '';
	let animationComplete = false;

	// Different error types
	type ErrorTypeKey = 404 | 500 | 'default';
	const errorTypes: Record<ErrorTypeKey, {
		title: string;
		message: string;
		illustration: typeof ErrorIllustration;
	}> = {
		404: {
			title: 'Page Not Found',
			message: 'Oops! It seems the medicine page you\'re looking for doesn\'t exist or has been moved.',
			illustration: ErrorIllustration
		},
		500: {
			title: 'Server Error',
			message: 'Our system is experiencing an issue. We\'ve been notified and are working on it.',
			illustration: ErrorIllustration
		},
		default: {
			title: 'Something Went Wrong',
			message: 'We encountered an unexpected error. Please try again or contact support.',
			illustration: ErrorIllustration
		}
	};

	// Get error info based on status code
	function getErrorInfo(status: number) {
		if (status === 404 || status === 500) {
			return errorTypes[status];
		}
		return errorTypes.default;
	}
	$: errorInfo = getErrorInfo($page.status);
	$: isNotFound = $page.status === 404;

	// Simulate navigation to home page
	function goHome() {
		// In a real SvelteKit app, you'd use the goto function
		window.location.href = '/';
	}

	// Handle search input
	function handleSearch(event: CustomEvent<string>) {
		const searchTerm = event.detail;
		// Implement search logic here - redirect to search results
		window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
	}

	onMount(() => {
		// Set animation complete after a delay
		setTimeout(() => {
			animationComplete = true;
		}, 800);
	});
</script>

<svelte:head>
	<title>{errorInfo.title} | Fake Medicine Detection App</title>
	<meta name="description" content="{errorInfo.title} - Error {$page.status}" />
</svelte:head>

<main class="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f5f5f5]">
	<div
		class="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden"
		in:fade={{ duration: 300, delay: 200 }}
	>
		<div class="p-6 md:p-12 flex flex-col items-center">
			<!-- Error Code - Use animated text for 404, regular text for others -->
			{#if isNotFound}
				<div class="mb-6" in:fade={{ duration: 500, delay: 300 }}>
					<Animated404Text textColor="#1a5f4a" accentColor="#d32f2f" />
				</div>
			{:else}
				<div class="mb-6 text-6xl font-bold text-[#1a5f4a]" in:fade={{ duration: 500, delay: 300 }}>
					{$page.status}
				</div>
			{/if}

			<!-- Error Illustration -->
			<div class="w-full max-w-md mb-8" in:fade={{ duration: 500, delay: 400 }}>
				<svelte:component this={errorInfo.illustration} />
			</div>

			<!-- Error Message -->
			<div class="text-center mb-8">
				<h1
					class="text-3xl md:text-4xl font-bold text-[#1a5f4a] mb-4"
					in:fly={{ y: 20, duration: 400, delay: 500 }}
				>
					{errorInfo.title}
				</h1>
				<p
					class="text-lg text-gray-600 max-w-lg"
					in:fly={{ y: 20, duration: 400, delay: 700 }}
				>
					{errorInfo.message}
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

			<!-- Search Section (Only for 404 errors) -->
			{#if isNotFound && animationComplete}
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