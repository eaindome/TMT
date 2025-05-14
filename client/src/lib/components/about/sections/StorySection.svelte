<script lang="ts">
	export let companyName = 'TrackMyMeds';

	// Define milestones for visual timeline
	const milestones = [
		{
			year: 'Problem',
			text: 'Identified growing crisis of counterfeit medications affecting millions globally'
		},
		{
			year: 'Vision',
			text: 'Assembled team of healthcare professionals, AI specialists, and security experts'
		},
		{
			year: 'Development',
			text: 'Building prototype and database with focus on accessibility and accuracy'
		},
		{
			year: 'Future',
			text: 'Creating comprehensive solution for consumers, pharmacies, and regulatory bodies'
		}
	];
</script>

<section id="story" class="bg-white px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<div class="animate-on-scroll">
			<div class="mb-12 text-center">
				<span
					class="mb-3 inline-block rounded-full bg-[#1a5f4a]/10 px-3 py-1 text-sm font-medium text-[#1a5f4a]"
					>Our Journey</span
				>
				<h2 class="text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Story</h2>
				<div class="mx-auto mt-4 h-1 w-20 rounded-full bg-[#1a5f4a]/20"></div>
			</div>

			<div class="mb-12 overflow-hidden rounded-xl bg-[#1a5f4a]/5 p-6 md:p-8">
				<div class="grid items-center gap-8 md:grid-cols-5">
					<div class="md:col-span-3">
						<p class="text-lg font-medium text-[#1a5f4a]">
							"An estimated 1 in 10 medical products in low and middle-income countries is
							substandard or falsified."
						</p>
						<p class="mt-2 text-sm text-gray-500">— World Health Organization</p>
					</div>
					<div class="md:col-span-2">
						<div class="h-20 w-full overflow-hidden rounded-lg bg-[#1a5f4a]/10 p-4">
							<div class="flex h-full items-center justify-between">
								<div class="text-center">
									<div class="text-2xl font-bold text-[#1a5f4a]">10%</div>
									<div class="text-xs text-gray-600">of medications</div>
								</div>
								<div class="h-full w-px bg-[#1a5f4a]/20"></div>
								<div class="text-center">
									<div class="text-2xl font-bold text-[#1a5f4a]">1M+</div>
									<div class="text-xs text-gray-600">deaths yearly</div>
								</div>
								<div class="h-full w-px bg-[#1a5f4a]/20"></div>
								<div class="text-center">
									<div class="text-2xl font-bold text-[#1a5f4a]">$200B</div>
									<div class="text-xs text-gray-600">market impact</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="space-y-6">
					<h3 class="text-xl font-semibold text-[#1a5f4a]">Our Beginning</h3>
					<p class="leading-relaxed text-gray-700">
						{companyName} was founded in response to the growing global crisis of counterfeit medications.
						Our team witnessed first-hand the devastating impact of fake medicines on patients and healthcare
						systems, particularly in vulnerable regions.
					</p>

					<div
						class="relative pl-8 before:absolute before:top-0 before:left-3 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#1a5f4a] before:to-[#4caf50]/30"
					>
						{#each milestones as milestone, i}
							<div class="relative mb-6 last:mb-0">
								<div
									class="absolute -left-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#1a5f4a]"
								>
									<span class="text-xs font-bold text-white">{i + 1}</span>
								</div>
								<h4 class="font-semibold text-[#1a5f4a]">{milestone.year}</h4>
								<p class="mt-1 text-sm text-gray-600">{milestone.text}</p>
							</div>
						{/each}
					</div>

					<p class="leading-relaxed text-gray-700">
						Our founding team combines expertise from healthcare, AI technology, and security to
						create a solution that addresses this complex global challenge.
					</p>
				</div>

				<div class="flex flex-col space-y-6">
					<div class="rounded-xl bg-gradient-to-br from-[#1a5f4a]/10 to-[#1a5f4a]/5 p-6 shadow-sm">
						<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Our Goals</h3>
						<ul class="space-y-4">
							<li class="group flex items-start">
								<div
									class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50] transition-transform group-hover:scale-110"
								>
									<span class="text-sm text-white">✓</span>
								</div>
								<div class="ml-3">
									<span class="font-medium text-gray-800"
										>Build a comprehensive verification system</span
									>
									<p class="mt-1 text-sm text-gray-600">
										Providing accessible technology to easily verify medication authenticity
									</p>
								</div>
							</li>
							<li class="group flex items-start">
								<div
									class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50] transition-transform group-hover:scale-110"
								>
									<span class="text-sm text-white">✓</span>
								</div>
								<div class="ml-3">
									<span class="font-medium text-gray-800">Partner with healthcare institutions</span
									>
									<p class="mt-1 text-sm text-gray-600">
										Creating a network of trusted organizations to improve medication safety
									</p>
								</div>
							</li>
							<li class="group flex items-start">
								<div
									class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50] transition-transform group-hover:scale-110"
								>
									<span class="text-sm text-white">✓</span>
								</div>
								<div class="ml-3">
									<span class="font-medium text-gray-800">Expand accessibility across regions</span>
									<p class="mt-1 text-sm text-gray-600">
										Prioritizing underserved areas where counterfeit medications are most prevalent
									</p>
								</div>
							</li>
							<li class="group flex items-start">
								<div
									class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50] transition-transform group-hover:scale-110"
								>
									<span class="text-sm text-white">✓</span>
								</div>
								<div class="ml-3">
									<span class="font-medium text-gray-800">Create a reliable detection system</span>
									<p class="mt-1 text-sm text-gray-600">
										Developing AI technology that continually improves accuracy over time
									</p>
								</div>
							</li>
						</ul>
					</div>

					<div class="flex-grow rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
						<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Current Stage</h3>
						<div class="mb-4 h-2.5 w-full rounded-full bg-gray-200">
							<div class="h-2.5 rounded-full bg-[#4caf50]" style="width: 35%"></div>
						</div>
						<div class="mb-6 flex justify-between text-xs text-gray-500">
							<span>Research</span>
							<span>Development</span>
							<span>Beta</span>
							<span>Launch</span>
						</div>
						<p class="text-gray-700">
							We're currently in the early stages of development, refining our prototype and
							building our database while establishing key partnerships.
						</p>
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
	h2,
	h3,
	span {
		opacity: 1;
	}

	/* Add hover effect for list items */
	.group:hover .font-medium {
		color: #1a5f4a;
		transition: color 0.2s ease;
	}
</style>
