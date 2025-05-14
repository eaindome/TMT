<script lang="ts">
	export let companyName = 'TrackMyMeds';
</script>

<section
	id="mission"
	class="relative overflow-hidden bg-cover bg-center px-4 py-16 md:py-26"
	style="background-image: url('/images/about.jpg');"
>
	<!-- Enhanced overlay with gradient -->
	<div
		class="absolute inset-0 bg-gradient-to-b from-[#1a5f4a]/10 to-[#1a5f4a]/10 backdrop-blur-md"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="animate-on-scroll animate-fade-in-fallback">
			<!-- Improved mission header -->
			<div class="mb-8 inline-block rounded-full bg-white/10 px-4 py-1 backdrop-blur-sm">
				<span class="font-medium text-white">Our Purpose</span>
			</div>

			<h1 class="mb-8 text-3xl font-bold text-white drop-shadow-md md:text-5xl lg:text-6xl">
				Safeguarding Global <span class="text-[#1a5f4a]">Health</span>
				<br class="hidden md:block" /> Through <span class="text-[#f4b400]">Innovation</span>
			</h1>

			<div class="rounded-xl bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-10">
				<div class="mx-auto max-w-4xl">
					<div class="mb-6 h-1 w-16 rounded-full bg-[#1a5f4a]"></div>

					<p class="mb-6 text-lg text-gray-800 md:text-xl">
						At <span class="font-semibold text-[#1a5f4a]">{companyName}</span>, we're developing
						technology to help combat the global threat of counterfeit medications through
						innovative AI-based verification methods.
					</p>

					<p class="mb-6 text-lg text-gray-800 md:text-xl">
						Our goal is to create a platform that will empower consumers, healthcare professionals,
						and regulatory bodies with accessible tools to quickly verify medication authenticity.
					</p>

					<!-- Key principles -->
					<div class="mt-8 grid gap-4 md:grid-cols-3">
						<div class="flex items-start space-x-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1a5f4a] text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-[#1a5f4a]">Accessibility</h3>
								<p class="text-sm text-gray-700">For everyone, everywhere</p>
							</div>
						</div>
						<div class="flex items-start space-x-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1a5f4a] text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-[#1a5f4a]">Innovation</h3>
								<p class="text-sm text-gray-700">AI-powered verification</p>
							</div>
						</div>
						<div class="flex items-start space-x-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1a5f4a] text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div>
								<h3 class="font-semibold text-[#1a5f4a]">Trust</h3>
								<p class="text-sm text-gray-700">Building confidence in medication</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Keep your existing styles but remove conflicting ones */
	.animate-on-scroll {
		opacity: 1 !important;
		transform: translateY(0) !important;
		transition: none !important;
	}

	/* Add a smooth transition between sections */
	section {
		scroll-margin-top: 80px; /* Adjust based on your nav height */
	}

	/* Ensure consistent typography */
	p,
	h1,
	h3 {
		opacity: 1;
	}

	/* Add subtle animation for background elements */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.backdrop-blur-sm {
		backdrop-filter: blur(4px);
	}
</style>
