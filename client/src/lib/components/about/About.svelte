<script lang="ts">
	import { onMount } from 'svelte';
	import AboutNav from './AboutNav.svelte';
    import Button from '$lib/components/Button.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	// Simplify this for now and focus on layout integration
	onMount(() => {
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			el.classList.add('animate-fade-in');
		});
	});
</script>

<svelte:head>
	<title>About Us | TrustMyTablet - AI-Powered Medicine Verification</title>
	<meta
		name="description"
		content="Learn about our mission to combat counterfeit medications using AI technology and our commitment to global medicine safety."
	/>
</svelte:head>

<div class="min-h-screen bg-[#f5f5f5]">
	<!-- Improved Header Section with Navigation -->
	<div class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
		<div class="container mx-auto">
			<AboutNav />
		</div>
	</div>

	<!-- Main content with proper spacing -->
		<div class="content-visible pt-14">
		<!-- Hero Section with adjusted spacing to account for nav -->
		<section id="mission" class="px-4 py-12 md:py-16">
			<div class="mx-auto max-w-6xl">
				<div class="animate-on-scroll animate-fade-in-fallback">
					<h1 class="mb-6 text-3xl font-bold text-[#1a5f4a] md:text-5xl">Our Mission</h1>
					<div class="rounded-lg bg-white p-6 shadow-lg md:p-10">
						<p class="mb-6 text-lg text-gray-700 md:text-xl">
							At TrustMyTablet, we're on a mission to combat the global threat of counterfeit
							medications using cutting-edge AI technology.
						</p>
						<p class="text-lg text-gray-700 md:text-xl">
							Our platform empowers consumers, healthcare professionals, and regulatory bodies with
							tools to instantly verify medication authenticity, protecting health and saving lives.
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Our Story -->
		<section id="story" class="bg-white px-4 py-16">
			<div class="mx-auto max-w-6xl">
				<div class="animate-on-scroll">
					<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Story</h2>
					<div class="grid gap-8 md:grid-cols-2">
						<div>
							<p class="mb-4 text-gray-700">
								TrustMyTablet was founded in response to the growing global crisis of counterfeit
								medications. According to the World Health Organization, an estimated 1 in 10
								medical products in low and middle-income countries is substandard or falsified.
							</p>
							<p class="mb-4 text-gray-700">
								Our founding team of healthcare professionals, AI specialists, and security experts
								came together with a shared vision: to leverage advanced technology to make medicine
								verification accessible to everyone.
							</p>
							<p class="text-gray-700">
								What began as a research project has evolved into a comprehensive platform that
								serves individual consumers, pharmacies, healthcare facilities, and regulatory
								bodies worldwide.
							</p>
						</div>
						<div class="rounded-lg bg-[#f5f5f5] p-6">
							<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Our Impact</h3>
							<ul class="space-y-3">
								<li class="flex items-start">
									<div
										class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
									>
										<span class="text-sm text-white">✓</span>
									</div>
									<span class="ml-3 text-gray-700"
										>Verified over 1 million medications globally</span
									>
								</li>
								<li class="flex items-start">
									<div
										class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
									>
										<span class="text-sm text-white">✓</span>
									</div>
									<span class="ml-3 text-gray-700">Partnered with 200+ healthcare institutions</span
									>
								</li>
								<li class="flex items-start">
									<div
										class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
									>
										<span class="text-sm text-white">✓</span>
									</div>
									<span class="ml-3 text-gray-700">Active in 25+ countries worldwide</span>
								</li>
								<li class="flex items-start">
									<div
										class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4caf50]"
									>
										<span class="text-sm text-white">✓</span>
									</div>
									<span class="ml-3 text-gray-700">Identified 50,000+ counterfeit products</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Technology -->
		<section id="technology" class="px-4 py-16">
			<div class="mx-auto max-w-6xl">
				<div class="animate-on-scroll">
					<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Technology</h2>
					<div class="overflow-hidden rounded-lg bg-white shadow-lg">
						<div class="grid md:grid-cols-3">
							<div class="border-b border-gray-200 p-6 md:border-r md:border-b-0">
								<div
									class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1a5f4a]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 class="mb-2 text-xl font-semibold text-[#1a5f4a]">Advanced AI</h3>
								<p class="text-gray-700">
									Our proprietary machine learning algorithms analyze multiple aspects of medication
									packaging, pills, and security features to detect counterfeits with over 99%
									accuracy.
								</p>
							</div>
							<div class="border-b border-gray-200 p-6 md:border-r md:border-b-0">
								<div
									class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0288d1]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								</div>
								<h3 class="mb-2 text-xl font-semibold text-[#0288d1]">Secure Database</h3>
								<p class="text-gray-700">
									We maintain a comprehensive, secure database of legitimate medications that is
									continuously updated in collaboration with manufacturers and regulatory bodies.
								</p>
							</div>
							<div class="p-6">
								<div
									class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#4caf50]"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<h3 class="mb-2 text-xl font-semibold text-[#4caf50]">Cross-Platform</h3>
								<p class="text-gray-700">
									Our technology works seamlessly across web and mobile platforms, ensuring
									accessibility for users regardless of their device or location.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Team -->
		<section id="team" class="bg-white px-4 py-16">
			<div class="mx-auto max-w-6xl">
				<div class="animate-on-scroll">
					<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Team</h2>
					<p class="mb-8 text-lg text-gray-700">
						TrustMyTablet brings together experts from healthcare, technology, and security to
						create a solution that's both powerful and user-friendly.
					</p>
					<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<!-- Team Member 1 -->
						<div class="overflow-hidden rounded-lg bg-[#f5f5f5] shadow-md">
							<div class="flex h-48 items-center justify-center bg-[#1a5f4a]/10">
								<div
									class="flex h-24 w-24 items-center justify-center rounded-full bg-[#1a5f4a] text-2xl font-bold text-white"
								>
									DR
								</div>
							</div>
							<div class="p-6">
								<h3 class="text-xl font-bold text-[#1a5f4a]">Dr. Rebecca Chen</h3>
								<p class="mb-3 font-medium text-[#0288d1]">Chief Medical Officer</p>
								<p class="text-gray-700">
									Former WHO advisor with 15+ years experience in pharmaceutical safety and global
									health initiatives.
								</p>
							</div>
						</div>

						<!-- Team Member 2 -->
						<div class="overflow-hidden rounded-lg bg-[#f5f5f5] shadow-md">
							<div class="flex h-48 items-center justify-center bg-[#1a5f4a]/10">
								<div
									class="flex h-24 w-24 items-center justify-center rounded-full bg-[#1a5f4a] text-2xl font-bold text-white"
								>
									AM
								</div>
							</div>
							<div class="p-6">
								<h3 class="text-xl font-bold text-[#1a5f4a]">Alex Martinez</h3>
								<p class="mb-3 font-medium text-[#0288d1]">Chief Technology Officer</p>
								<p class="text-gray-700">
									AI specialist with background in computer vision and machine learning at leading
									tech companies.
								</p>
							</div>
						</div>

						<!-- Team Member 3 -->
						<div class="overflow-hidden rounded-lg bg-[#f5f5f5] shadow-md">
							<div class="flex h-48 items-center justify-center bg-[#1a5f4a]/10">
								<div
									class="flex h-24 w-24 items-center justify-center rounded-full bg-[#1a5f4a] text-2xl font-bold text-white"
								>
									SO
								</div>
							</div>
							<div class="p-6">
								<h3 class="text-xl font-bold text-[#1a5f4a]">Sarah Okonjo</h3>
								<p class="mb-3 font-medium text-[#0288d1]">Head of Global Operations</p>
								<p class="text-gray-700">
									Expert in healthcare logistics with experience implementing technology solutions
									in developing regions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Partners & Commitment -->
		<section id="commitment" class="px-4 py-16">
			<div class="mx-auto max-w-6xl">
				<div class="animate-on-scroll">
					<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Commitment</h2>
					<div class="rounded-lg bg-white p-6 shadow-lg md:p-10">
						<div class="grid gap-8 md:grid-cols-2">
							<div>
								<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Accessibility</h3>
								<p class="mb-6 text-gray-700">
									We believe everyone deserves access to safe medication. That's why our core
									verification technology is available to individual users at no cost, with premium
									features for institutions and high-volume users.
								</p>
								<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Privacy</h3>
								<p class="text-gray-700">
									We're committed to protecting user data. Our platform operates with strict privacy
									protocols, and we never sell or share personal information with third parties.
								</p>
							</div>
							<div>
								<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Global Reach</h3>
								<p class="mb-6 text-gray-700">
									Counterfeit medications are a global problem requiring global solutions. We're
									actively expanding our database and partnerships to cover medications worldwide.
								</p>
								<h3 class="mb-4 text-xl font-semibold text-[#1a5f4a]">Continuous Improvement</h3>
								<p class="text-gray-700">
									Our AI models and databases are continually updated to stay ahead of
									counterfeiters and incorporate new medications as they enter the market.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA -->
        <section class="bg-[#1a5f4a] px-4 py-16">
            <div class="animate-on-scroll mx-auto max-w-4xl text-center">
                <h2 class="mb-6 text-2xl font-bold text-white md:text-4xl">
                    Join Us in Making Medication Safer
                </h2>
                <p class="mb-8 text-lg text-white/90 md:text-xl">
                    Whether you're a healthcare provider, regulator, or concerned individual, TrustMyTablet
                    provides the tools you need to verify medication authenticity.
                </p>
                <div class="flex flex-col justify-center gap-4 sm:flex-row">
                    <!-- Using the Button component instead of anchor tags -->
                    <a href="/signup">
                        <Button 
                            variant="inverse" 
                            size="lg" 
                            elevation={true} 
                            animateOnHover={true}
                        >
                            Create Free Account
                        </Button>
                    </a>
                    
                    <a href="/contact">
                        <Button 
                            variant="inverse-outline" 
                            size="lg" 
                            shape="rounded" 
                            animateOnHover={true}
                            ripple={true}
                        >
                            Partner With Us
                        </Button>
                    </a>
                </div>
            </div>
        </section>
	</div>
</div>

<style>
	/* Keep your existing styles but remove conflicting ones */
	.animate-on-scroll {
		opacity: 1 !important;
		transform: translateY(0) !important;
		transition: none !important;
	}

	.content-visible {
		opacity: 1 !important;
		visibility: visible !important;
	}

	/* Add a smooth transition between sections */
	section {
		scroll-margin-top: 80px; /* Adjust based on your nav height */
	}

	/* Ensure consistent typography */
	p,
	h1,
	h2,
	h3,
	span,
	a {
		opacity: 1;
	}
</style>
