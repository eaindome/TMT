<script lang="ts">
	// Import necessary components or utilities
	import { onMount, tick } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	// Track if user has already interacted with CTA
	let hasInteracted = false;

	// For email input form
	let email = '';
	let isEmailValid = true;
	let isSubmitting = false;
	let submitSuccess = false;
	let emailInput: HTMLInputElement | null = null;

	// Platform options
	const platforms = [
		{ id: 'ios', name: 'iOS', icon: 'apple' },
		{ id: 'android', name: 'Android', icon: 'android' },
		{ id: 'web', name: 'Web App', icon: 'laptop' }
	];

	// Basic email validation
	function validateEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		isEmailValid = emailRegex.test(email);
		return isEmailValid;
	}

	// Mock submit function - would connect to backend in production
	async function handleSubmit() {
		if (!validateEmail()) {
			// Focus on email input if invalid
			if (emailInput) emailInput.focus();
			return;
		}

		isSubmitting = true;
		hasInteracted = true;

		// Simulate API call
		setTimeout(() => {
			isSubmitting = false;
			submitSuccess = true;
			email = '';

			// Reset success message after 5 seconds
			setTimeout(() => {
				submitSuccess = false;
			}, 5000);
		}, 1500);
	}

	// Add animation on scroll
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('animate-fade-in');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
		elementsToAnimate.forEach((el) => {
			observer.observe(el);
		});

		return () => {
			elementsToAnimate.forEach((el) => {
				observer.unobserve(el);
			});
		};
	});
</script>

<section
	id="cta-section"
	class="relative overflow-hidden bg-gradient-to-br from-[#1a5f4a] to-[#0d3d2d] py-20 text-white"
>
	<!-- Background decorative elements -->
	<div class="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
		<div class="absolute top-10 left-10 h-32 w-32 rounded-full bg-white opacity-5"></div>
		<div class="absolute right-20 bottom-20 h-64 w-64 rounded-full bg-white opacity-5"></div>
		<div class="absolute top-1/3 right-1/4 h-16 w-16 rounded-full bg-[#f4b400] opacity-10"></div>
	</div>

	<div class="relative container mx-auto px-4 md:px-8">
		<!-- Main CTA Container -->
		<div
			class="animate-on-scroll mx-auto max-w-5xl rounded-xl bg-black/5 p-8 backdrop-blur-sm md:p-10"
		>
			<!-- Two-column layout -->
			<div class="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
				<!-- Left column: Main CTA text -->
				<div class="text-center lg:w-1/2 lg:text-left">
					<h2 class="mb-4 text-3xl leading-tight font-bold md:text-4xl">
						Ready to Verify Your <span class="text-[#f4b400]">Medicines</span>?
					</h2>
					<p class="mb-8 text-lg leading-relaxed text-white/90">
						Our mission is to make medicine verification accessible to everyone. Sign up for early access to our platform and be part of the solution from day one.
					</p>

					<!-- App badges/buttons -->
					<div class="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
						{#each platforms as platform, i}
							<button
								class="flex transform items-center rounded-full bg-white px-6 py-3 font-medium text-[#1a5f4a] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#f4b400] hover:text-white hover:shadow-xl active:translate-y-0"
								aria-label="Download for {platform.name}"
								in:fly={{ delay: 100 * i, y: 20, duration: 600 }}
							>
								<span class="mr-2">
									{#if platform.icon === 'apple'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path
												d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
											/>
										</svg>
									{:else if platform.icon === 'android'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path
												d="M7.2 16.8H6v-8h1.2v8zm.6-10.56L6.47 4.67l.75-.75 1.41 1.41-.75.75zM10 3h4v1h-4V3zm3.6 13.8h-1.2v-8h1.2v8zM17.2 4.67l-1.38 1.38-.75-.75 1.41-1.41.75.75zM17.2 16.8H16v-8h1.2v8zm3.6-6.8h-1.2v5.6h1.2V10zm-16.8 0H2.8v5.6H4V10zm13.8 8H6.2c-.67 0-1.2-.53-1.2-1.2V9.2h13.2v7.6c0 .67-.53 1.2-1.2 1.2zm0-12.8H6.2C5.53 5.2 5 5.73 5 6.4V8h14V6.4c0-.67-.53-1.2-1.2-1.2z"
											/>
										</svg>
									{:else if platform.icon === 'laptop'}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5"
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path
												d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16zM4 6h16v10H4V6zm16 14H4v-2h16v2z"
											/>
										</svg>
									{/if}
								</span>
								{platform.name}
							</button>
						{/each}
					</div>
				</div>

				<!-- Right column: Email signup form -->
				<div
					class="w-full transform rounded-xl bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-2xl md:p-8 lg:w-2/5"
				>
					{#if !submitSuccess}
						<div class="mb-6 text-center">
							<h3 class="mb-2 text-xl font-bold text-[#1a5f4a]">Get Early Access</h3>
							<p class="text-[#607d8b]">Be among the first to try our premium features</p>
						</div>

						<!-- Email form -->
						<form on:submit|preventDefault={handleSubmit} class="space-y-4">
							<div class="relative">
								<label for="email" class="mb-1 block text-sm font-medium text-[#607d8b]"
									>Email Address</label
								>
								<div class="relative">
									<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
											/>
										</svg>
									</div>
									<input
										type="email"
										id="email"
										bind:value={email}
										bind:this={emailInput}
										class="w-full rounded-lg border py-3 pr-4 pl-10 text-gray-700 focus:border-[#1a5f4a] focus:ring-2 focus:ring-[#1a5f4a] {!isEmailValid
											? 'border-[#d32f2f]'
											: 'border-gray-300'}"
										placeholder="your@email.com"
										on:blur={validateEmail}
										required
									/>
								</div>
								{#if !isEmailValid}
									<p class="mt-1 flex items-center text-xs text-[#d32f2f]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="mr-1 h-3 w-3"
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
										Please enter a valid email address
									</p>
								{/if}
							</div>

							<button
								type="submit"
								class="flex w-full transform items-center justify-center rounded-lg bg-[#1a5f4a] px-4 py-3 font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d3d2d] hover:shadow-lg active:translate-y-0"
								disabled={isSubmitting}
							>
								{#if isSubmitting}
									<svg
										class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
									Processing...
								{:else}
									Sign Up for Early Access
								{/if}
							</button>
						</form>
					{:else}
						<!-- Success message -->
						<div class="py-8 text-center" in:fly={{ y: 20, duration: 500 }}>
							<div
								class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#4caf50]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-white"
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
							<h3 class="mb-2 text-xl font-bold text-[#1a5f4a]">Thank You!</h3>
							<p class="mb-4 text-[#607d8b]">
								We've added you to our early access list. We'll notify you when we're ready!
							</p>
							<button
								class="font-medium text-[#1a5f4a] transition-colors duration-200 hover:underline"
								on:click={() => (submitSuccess = false)}
							>
								Submit another email
							</button>
						</div>
					{/if}

					<!-- Trust indicators -->
					<div class="mt-6 border-t border-gray-200 pt-4">
						<div class="flex flex-wrap items-center justify-center gap-4 text-sm text-[#607d8b]">
							<div class="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
										clip-rule="evenodd"
									/>
								</svg>
								<span>Secure & Confidential</span>
							</div>
							<div class="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
										clip-rule="evenodd"
									/>
								</svg>
								<span>No Spam</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Fade in animation */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* .animate-fade-in {
		animation: fadeIn 0.8s ease forwards;
	} */

	/* Ensure buttons don't have extra width on mobile */
	button {
		white-space: nowrap;
	}

	/* Customize focus states */
	input:focus,
	button:focus {
		outline: none;
	}

	/* Fix for mobile devices */
	@media (max-width: 640px) {
		.container {
			padding-left: 16px;
			padding-right: 16px;
		}
	}
</style>
