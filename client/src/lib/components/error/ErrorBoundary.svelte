<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { goto, afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';

	export let resetOnNavigate = true;

	let error: Error | null = null;
	let hasError = false;
	let countdown = 10;
	let countdownInterval: ReturnType<typeof setInterval>;

	// Error handler function
	function handleError(event: ErrorEvent) {
		event.preventDefault();
		error = event.error || new Error('An unknown error occurred');
		hasError = true;

		// Start countdown for auto-redirect
		startCountdown();

		// Log the error (you could also send to an error tracking service)
		console.error('Error caught by ErrorBoundary:', error);

		return true;
	}

	function startCountdown() {
		countdown = 10;
		countdownInterval = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				clearInterval(countdownInterval);
				navigateHome();
			}
		}, 1000);
	}

	function resetError() {
		hasError = false;
		error = null;
		clearInterval(countdownInterval);
		if (browser) {
			window.location.reload();
		}
	}

	function navigateHome() {
		clearInterval(countdownInterval);
		goto('/');
	}

	onMount(() => {
		// Listen for errors - only in browser environment
		if (browser) {
			window.addEventListener('error', handleError);
		}

		// Reset on navigation if enabled
		if (resetOnNavigate) {
			afterNavigate(() => {
				if (hasError) resetError();
			});
		}
	});

	onDestroy(() => {
		// Clean up event listeners - only in browser environment
		if (browser) {
			window.removeEventListener('error', handleError);
		}
		clearInterval(countdownInterval);
	});
</script>

{#if hasError}
	<div class="flex min-h-screen flex-col items-center justify-center bg-[#f5f5f5] p-4">
		<div class="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
			<div class="mb-6 flex items-center justify-center">
				<div class="rounded-full bg-[#f4b400]/20 p-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 text-[#f4b400]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</div>
			</div>

			<h1 class="mb-4 text-center text-2xl font-bold text-gray-800 md:text-3xl">
				Something went wrong
			</h1>

			<p class="mb-6 text-center text-gray-600">
				We've encountered an unexpected error. Our team has been notified.
			</p>

			<div class="mb-6 flex flex-col gap-4 md:flex-row">
				<Button variant="primary" fullWidth on:click={resetError}>Try Again</Button>
				<Button variant="outline" fullWidth on:click={navigateHome}>Return to Dashboard</Button>
			</div>

			<div class="text-center text-sm text-gray-500">
				Auto-redirecting to home in {countdown} seconds...
			</div>

			{#if error && browser && import.meta.env.DEV}
				<div class="mt-8 rounded-lg bg-gray-100 p-4">
					<p class="mb-2 font-medium text-gray-700">Error details (visible in development only):</p>
					<pre class="overflow-auto rounded bg-gray-50 p-2 text-xs text-red-600">{error.stack ||
							error.message}</pre>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<slot />
{/if}
