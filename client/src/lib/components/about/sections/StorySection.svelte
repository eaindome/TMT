<script lang="ts">
	export let companyName = 'TrustMyTablet';
</script>

<section id="story" class="bg-white px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<div class="animate-on-scroll">
			<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Story</h2>
			<div class="grid gap-8 md:grid-cols-2">
				<div>
					<p class="mb-4 text-gray-700">
						{companyName} was founded in response to the growing global crisis of counterfeit medications.
						According to the World Health Organization, an estimated 1 in 10 medical products in low
						and middle-income countries is substandard or falsified.
					</p>
					<p class="mb-4 text-gray-700">
						Our founding team includes healthcare professionals, AI specialists, and security
						experts who share a vision: to leverage technology to make medicine verification more
						accessible to everyone.
					</p>
					<p class="text-gray-700">
						We're currently in the early stages of development, refining our prototype and building
						our database. Our aim is to create a solution that will serve individual consumers,
						pharmacies, healthcare facilities, and regulatory bodies.
					</p>
				</div>
				<div class="rounded-lg bg-[#f5f5f5] p-6">
					<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Our Goals</h3>
					<ul class="space-y-3">
						<li class="flex items-start">
							<div
								class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
							>
								<span class="text-sm text-white">✓</span>
							</div>
							<span class="ml-3 text-gray-700">Build a comprehensive verification system</span>
						</li>
						<li class="flex items-start">
							<div
								class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
							>
								<span class="text-sm text-white">✓</span>
							</div>
							<span class="ml-3 text-gray-700">Partner with healthcare institutions</span>
						</li>
						<li class="flex items-start">
							<div
								class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
							>
								<span class="text-sm text-white">✓</span>
							</div>
							<span class="ml-3 text-gray-700">Expand accessibility across regions</span>
						</li>
						<li class="flex items-start">
							<div
								class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
							>
								<span class="text-sm text-white">✓</span>
							</div>
							<span class="ml-3 text-gray-700">Create a reliable counterfeit detection system</span>
						</li>
					</ul>
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
    h2,
    h3,
    span {
        opacity: 1;
    }
</style>