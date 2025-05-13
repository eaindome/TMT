<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import FAQItem from '$lib/components/help/FAQItem.svelte';
	import SectionHeader from '$lib/components/help/SectionHeader.svelte';
	import SearchBar from '$lib/components/help/SearchBar.svelte';
	import CTABox from '$lib/components/help/CTABox.svelte';
	import Button from '$lib/components/Button.svelte';
	
	// FAQ data organized by sections
	const faqSections = [
		{
			id: 'app-usage',
			title: 'App Usage',
			icon: 'smartphone',
			questions: [
				{
					question: 'How does TrustMyTablet work?',
					answer: 'TrustMyTablet uses AI to analyze medication packaging, QR codes, or barcodes to verify medicine authenticity in real time. Our technology compares the scanned item against our secure database of legitimate medications.'
				},
				{
					question: 'Do I need an account to use the scanner?',
					answer: 'No. The basic scanning functionality works without an account, but signing up unlocks additional features like scan history, batch scans, and advanced analytics.'
				},
				{
					question: 'Can I scan multiple medicines at once?',
					answer: 'Yes, premium users (e.g., pharmacists and healthcare facilities) can access batch scanning features, allowing multiple medications to be verified simultaneously.'
				},
				{
					question: 'What information should I capture when scanning?',
					answer: 'For best results, ensure good lighting and capture the entire front of the package, including any barcodes, QR codes, or security features. Our AI can also analyze pill appearance if needed for verification.'
				}
			]
		},
		{
			id: 'data-privacy',
			title: 'Data Privacy & Security',
			icon: 'shield',
			questions: [
				{
					question: 'Are my scans stored or shared?',
					answer: "Scans are only stored if you're logged in and have given consent. All data is encrypted and never shared with third parties. Anonymous scan data may be used to improve our AI models."
				},
				{
					question: 'Is my personal information safe?',
					answer: 'Absolutely. We follow industry-standard data protection protocols and comply with healthcare technology regulations. Your personal information is encrypted and stored securely.'
				},
				{
					question: 'Can I delete my scan history?',
					answer: 'Yes, you can delete individual scan records or your entire scan history at any time through your account settings.'
				},
				{
					question: 'How does TrustMyTablet handle regulatory compliance?',
					answer: 'Our platform complies with global healthcare data regulations including HIPAA, GDPR, and other regional requirements for medical data handling and privacy.'
				}
			]
		},
		{
			id: 'accuracy',
			title: 'Accuracy & Limitations',
			icon: 'check-circle',
			questions: [
				{
					question: 'How accurate is the AI?',
					answer: 'Our model is trained on thousands of authentic and counterfeit drug packages with over 99% accuracy in controlled tests. However, we recommend using the app as one of multiple verification methods for critical medications.'
				},
				{
					question: 'Can it detect expired drugs?',
					answer: 'Currently, TrustMyTablet primarily detects counterfeit packaging and not expiration dates. Expiration date verification is planned for a future update.'
				},
				{
					question: 'What happens if the app can\'t recognize a medicine?',
					answer: 'The app will return a "Needs Review" status when it cannot make a confident determination. You\'ll be able to report it for manual validation by our team of experts.'
				},
				{
					question: 'Does TrustMyTablet work for all medications worldwide?',
					answer: 'Our database is continuously expanding. We currently cover most medications in North America, Europe, and parts of Asia and Africa. We prioritize common and frequently counterfeited medications.'
				}
			]
		},
		{
			id: 'account',
			title: 'Account & Premium',
			icon: 'user',
			questions: [
				{
					question: 'What do I get with a Premium account?',
					answer: 'Premium features include batch scanning, trend analytics, early counterfeit alerts, API access for system integration, and dedicated customer support.'
				},
				{
					question: 'Can I cancel my subscription anytime?',
					answer: 'Yes, you can cancel your subscription at any time from the Profile > Subscription page. Your premium access will continue until the end of your current billing period.'
				},
				{
					question: 'Are there special plans for healthcare facilities?',
					answer: 'Yes, we offer enterprise plans for pharmacies, hospitals, and other healthcare facilities with custom features, volume pricing, and integration support.'
				},
				{
					question: 'How do I upgrade my account?',
					answer: 'You can upgrade your account from the free tier to premium in the Profile > Subscription section. We offer monthly and annual billing options.'
				}
			]
		},
		{
			id: 'support',
			title: 'Support & Reporting',
			icon: 'help-circle',
			questions: [
				{
					question: 'I found a fake medicine – what should I do?',
					answer: 'If our app flags a medication as potentially counterfeit, use the in-app reporting tool to submit details. We notify relevant authorities if multiple similar reports are received. You should also contact your pharmacist or healthcare provider.'
				},
				{
					question: 'How can I contact support?',
					answer: 'You can reach our support team through the contact form on our website, by emailing support@trustmytablet.com, or through the in-app help section.'
				},
				{
					question: 'How do I report a bug or suggest a feature?',
					answer: 'We welcome feedback! Use the "Feedback" option in the app menu or email feedback@trustmytablet.com with your suggestions or issue reports.'
				},
				{
					question: 'Are there resources for learning more about counterfeit medications?',
					answer: 'Yes, check our Resources section for educational materials, guides, and links to official health organizations with information about medication safety.'
				}
			]
		}
	];
	
	let searchQuery = '';
	let filteredSections = faqSections;
	let activeSection = '';
	
	// Filter questions based on search query
	function handleSearch() {
		if (!searchQuery.trim()) {
			filteredSections = faqSections;
			return;
		}
		
		const query = searchQuery.toLowerCase();
		filteredSections = faqSections.map(section => {
			const filteredQuestions = section.questions.filter(item => 
				item.question.toLowerCase().includes(query) || 
				item.answer.toLowerCase().includes(query)
			);
			
			return {
				...section,
				questions: filteredQuestions
			};
		}).filter(section => section.questions.length > 0);
	}
	
	// Scroll to section
	function scrollToSection(sectionId: string) {
		activeSection = sectionId;
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	function handleContactSupport() {
        // Your contact support logic here
        console.log('Contact support clicked');
    }
	
	// Add animation on scroll effect
	onMount(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fade-in');
				}
			});
		}, { threshold: 0.1 });
		
		document.querySelectorAll('.animate-on-scroll').forEach(el => {
			observer.observe(el);
		});
	});
</script>

<svelte:head>
	<title>Help Center | TrustMyTablet - AI-Powered Medicine Verification</title>
	<meta
		name="description"
		content="Find answers to common questions about using TrustMyTablet for medicine verification, account management, and more."
	/>
</svelte:head>

<div class="min-h-screen bg-[#f5f5f5]">
	<Navbar />
	
	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-[#1a5f4a] to-[#267d63] pt-20 text-white md:pt-24">
		<div class="container mx-auto px-4">
			<div class="mx-auto max-w-3xl text-center mt-10 pb-5">
				<h1 class="mb-6 text-3xl font-bold md:text-4xl">How can we help you?</h1>
				<p class="mb-8 text-lg text-white/90">
					Find answers to common questions about TrustMyTablet and medicine verification
				</p>
				<SearchBar on:search={handleSearch} />
			</div>
		</div>
	</section>
	
	<!-- Main Content -->
	<div class="container mx-auto px-4 py-12">
		<div class="lg:flex lg:gap-8">
			<!-- Sidebar Navigation -->
			<aside class="mb-8 lg:mb-0 lg:w-1/4">
				<div class="sticky top-24 rounded-lg bg-white p-6 shadow-md border border-gray-100">
					<h2 class="mb-6 text-xl font-bold text-[#1a5f4a] flex items-center">
						<div
							class="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#267d63] shadow-md"
						>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path 
									stroke-linecap="round" 
									stroke-linejoin="round" 
									stroke-width="2" 
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
								/>
							</svg>
						</div>
						Topics
					</h2>
					<nav>
						<ul class="space-y-1">
							{#each faqSections as section, index}
								<li>
									<button
										on:click={() => scrollToSection(section.id)}
										class="group flex w-full items-center rounded-md px-4 py-3 text-left transition-all relative {activeSection === section.id ? 'bg-[#1a5f4a] text-white font-medium' : 'text-gray-700 hover:bg-gray-50'}"
									>
										<!-- Section icon -->
										{#if section.icon === 'smartphone'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 {activeSection === section.id ? 'text-white' : 'text-[#1a5f4a] group-hover:text-[#1a5f4a]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
											</svg>
										{:else if section.icon === 'shield'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 {activeSection === section.id ? 'text-white' : 'text-[#1a5f4a] group-hover:text-[#1a5f4a]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
											</svg>
										{:else if section.icon === 'check-circle'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 {activeSection === section.id ? 'text-white' : 'text-[#1a5f4a] group-hover:text-[#1a5f4a]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										{:else if section.icon === 'user'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 {activeSection === section.id ? 'text-white' : 'text-[#1a5f4a] group-hover:text-[#1a5f4a]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
											</svg>
										{:else if section.icon === 'help-circle'}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 {activeSection === section.id ? 'text-white' : 'text-[#1a5f4a] group-hover:text-[#1a5f4a]'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
											</svg>
										{/if}
										
										<span class="flex-1">{section.title}</span>
										
										<!-- Question count badge -->
										<span class="ml-2 rounded-full px-2 py-0.5 text-xs {activeSection === section.id ? 'bg-white text-[#1a5f4a]' : 'bg-gray-100 text-gray-600 group-hover:bg-[#1a5f4a]/10'}">
											{section.questions.length}
										</span>
										
										<!-- Active indicator -->
										{#if activeSection === section.id}
											<span class="absolute right-0 top-0 bottom-0 w-1 bg-[#1a5f4a] rounded-l"></span>
										{/if}
									</button>
								</li>
								
								<!-- Add divider except after last item -->
								{#if index < faqSections.length - 1}
									<div class="my-1 border-t border-gray-100"></div>
								{/if}
							{/each}
						</ul>
					</nav>
					
					<!-- Quick help box -->
					<div class="mt-8 rounded-md bg-[#f0f7f4] p-4 border border-[#1a5f4a]/20">
						<h3 class="font-medium text-[#1a5f4a] mb-2 flex items-center text-sm">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Can't find what you need?
						</h3>
						<p class="text-sm text-gray-600 mb-3">
							Contact our support team for personalized assistance.
						</p>
						<Button 
							variant="primary"
							size="sm"
							fullWidth={true}
							on:click={handleContactSupport}
						>
							Contact Support
						</Button>
					</div>
				</div>
			</aside>
			
			<!-- FAQ Content -->
			<div class="lg:w-3/4">
				{#if filteredSections.length === 0}
					<div class="rounded-lg bg-white p-8 text-center shadow-md">
						<svg xmlns="http://www.w3.org/2000/svg" class="mx-auto mb-4 h-12 w-12 text-[#607d8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<h3 class="mb-2 text-xl font-medium text-gray-900">No results found</h3>
						<p class="text-gray-600">Try adjusting your search query or browse by category</p>
					</div>
				{:else}
					{#each filteredSections as section}
						<div id={section.id} class="mb-12 animate-on-scroll rounded-lg bg-white p-6 shadow-md md:p-8">
							<SectionHeader title={section.title} icon={section.icon} />
							
							<div class="mt-6 space-y-4">
								{#each section.questions as item}
									<FAQItem question={item.question} answer={item.answer} />
								{/each}
							</div>
						</div>
					{/each}
				{/if}
				
				<!-- Additional Help CTA -->
				<div class="mt-8 animate-on-scroll">
					<CTABox />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* .animate-on-scroll {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.5s ease, transform 0.5s ease;
	}
	
	.animate-fade-in {
		opacity: 1;
		transform: translateY(0);
	} */
</style>