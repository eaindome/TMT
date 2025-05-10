<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

	// User type data with enhanced content
	const userTypes = [
		{
			icon: 'user',
			title: 'Consumers',
			description: 'Quickly verify medication before use to ensure your safety and peace of mind.',
			benefits: [
				'Instant verification within seconds',
				'Simple, intuitive scan interface',
				'Personal medication history tracking'
			],
			color: '#4caf50',
			image: '/assets/images/consumer-user.jpg',
			stat: '30M+',
			statLabel: 'Protected Users'
		},
		{
			icon: 'pill',
			title: 'Pharmacists',
			description:
				'Efficiently verify inventory and document authenticity for regulatory compliance.',
			benefits: [
				'Bulk scanning for large inventories',
				'Secure digital compliance records',
				'Detailed professional verification reports'
			],
			color: '#1a5f4a',
			image: '/assets/images/pharmacist-user.jpg',
			stat: '75K+',
			statLabel: 'Pharmacy Partners'
		},
		{
			icon: 'heart',
			title: 'Healthcare Workers',
			description: 'Ensure patients receive genuine medication with quick verification tools.',
			benefits: [
				'Clinical-grade scan accuracy',
				'Comprehensive patient safety tools',
				'Seamless EHR/EMR integration'
			],
			color: '#0288d1',
			image: '/assets/images/healthcare-user.jpg',
			stat: '12K+',
			statLabel: 'Facilities'
		},
		{
			icon: 'chart',
			title: 'Regulators',
			description: 'Monitor counterfeit medicine trends and enforce compliance across regions.',
			benefits: [
				'Real-time analytics and reporting dashboard',
				'Powerful enforcement and tracking tools',
				'Advanced geographic insights and trends'
			],
			color: '#607d8b',
			image: '/assets/images/regulator-user.jpg',
			stat: '45+',
			statLabel: 'Agencies'
		}
	];

	// Active tab state
	let activeTab = 0;
	let prevActiveTab = 0;
	let contentVisible = true;
	let hoverPaused = false;
	
	// Progress animation
	let progress = 0;
	let progressInterval: ReturnType<typeof setInterval>;
	
	// Auto rotate tabs
	let rotationInterval: ReturnType<typeof setInterval>;
	const rotationDelay = 6000; // 6 seconds per tab

	function startAutoRotate() {
		// Clear any existing intervals
		clearInterval(rotationInterval);
		clearInterval(progressInterval);
		
		// Reset progress
		progress = 0;
		
		// Start progress animation
		progressInterval = setInterval(() => {
			progress += 1;
			if (progress >= 100) {
				progress = 0;
			}
		}, rotationDelay / 100);
		
		// Start the rotation
		rotationInterval = setInterval(() => {
			if (!hoverPaused) {
				changeTab((activeTab + 1) % userTypes.length);
			}
		}, rotationDelay);
	}
	
	async function changeTab(index: number) {
		// Skip if it's the same tab
		if (index === activeTab) return;
		
		// Hide content with fade
		contentVisible = false;
		prevActiveTab = activeTab;
		
		// Wait for fade out transition
		await tick();
		setTimeout(async () => {
			// Change tab
			activeTab = index;
			progress = 0;
			
			// Show content with new tab
			await tick();
			contentVisible = true;
		}, 300);
	}

	function setActiveTab(index: number) {
		changeTab(index);
		clearInterval(rotationInterval);
		clearInterval(progressInterval);
		startAutoRotate();
	}
	
	function pauseRotation() {
		hoverPaused = true;
	}
	
	function resumeRotation() {
		hoverPaused = false;
	}

	onMount(() => {
		startAutoRotate();
		return () => {
			clearInterval(rotationInterval);
			clearInterval(progressInterval);
		};
	});
	
	// Icons for user types
	const getIcon = (iconName: string, color: string) => {
		switch (iconName) {
			case 'user':
				return `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: ${color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>`;
			case 'pill':
				return `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: ${color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
				</svg>`;
			case 'heart':
				return `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: ${color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
				</svg>`;
			case 'chart':
				return `<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: ${color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
				</svg>`;
			default:
				return '';
		}
	};
</script>

<section class="relative overflow-hidden py-20 lg:py-24">
	<!-- Background accent elements -->
	<div class="absolute inset-0 bg-[#f5f5f5] z-0"></div>
	<div class="absolute top-0 right-0 w-64 h-64 bg-[#4caf50]/5 rounded-full blur-3xl"></div>
	<div class="absolute bottom-0 left-0 w-80 h-80 bg-[#0288d1]/5 rounded-full blur-3xl"></div>
	
	<!-- Background pattern -->
	<div class="absolute inset-0 opacity-5">
		<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
				<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a5f4a" stroke-width="0.5" />
			</pattern>
			<rect width="100%" height="100%" fill="url(#grid)" />
		</svg>
	</div>

	<div class="relative z-10 container mx-auto px-4">
		<!-- Section header -->
		<div class="mx-auto mb-16 max-w-3xl text-center" in:fly={{ y: 30, duration: 800, delay: 200 }}>
			<div class="mb-4 inline-block">
				<span class="bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
						<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
					</svg>
					Made For Everyone
				</span>
			</div>
			
			<h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
				Tailored For <span class="text-[#1a5f4a]">Every User</span>
			</h2>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Our app adapts to your specific needs, providing specialized features for everyday consumers, 
				healthcare professionals, and regulatory authorities.
			</p>
		</div>

		<!-- Tab Navigation -->
		<div class="mb-12 flex flex-wrap justify-center gap-3 md:gap-4" in:fly={{ y: 20, duration: 700, delay: 500 }}>
			{#each userTypes as userType, i}
				<button
					class="relative rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 md:text-base hover:shadow-md"
					class:bg-white={activeTab !== i}
					class:text-gray-700={activeTab !== i}
					class:hover:bg-gray-50={activeTab !== i}
					class:text-white={activeTab === i}
					class:shadow-lg={activeTab === i}
					style={activeTab === i ? `background-color: ${userType.color}` : ''}
					on:click={() => setActiveTab(i)}
					on:mouseenter={pauseRotation}
					on:mouseleave={resumeRotation}
				>
					<span>{userType.title}</span>
					
					<!-- Active tab indicator -->
					{#if activeTab === i}
						<span class="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center">
							<span class="absolute inset-0 bg-white opacity-10"></span>
							{#if i === activeTab}
								<svg 
									class="w-full h-full absolute left-0 top-0" 
									viewBox="0 0 100 100"
								>
									<defs>
										<linearGradient id="gradient-{i}" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stop-color="rgba(255, 255, 255, 0.3)" />
											<stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
										</linearGradient>
									</defs>
									<circle
										cx="50" cy="50" r="47"
										fill="none"
										stroke="url(#gradient-{i})"
										stroke-width="2"
										stroke-dasharray="295.31"
										stroke-dashoffset={295.31 - (295.31 * progress / 100)}
										transform="rotate(-90 50 50)"
									/>
								</svg>
							{/if}
						</span>
					{/if}
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="relative overflow-hidden rounded-2xl bg-white shadow-xl md:mb-16" style="min-height: 480px;">
			<div 
				class="absolute inset-0 transition-opacity duration-300"
				class:opacity-100={contentVisible}
				class:opacity-0={!contentVisible}
			>
				<div class="grid md:grid-cols-5 h-full">
					<!-- Left: Content (3/5) -->
					<div class="md:col-span-3 flex flex-col justify-between p-8 md:p-12">
						<div class="mb-auto">
							<div
								class="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-xl shadow-md"
								style="background-color: {userTypes[activeTab].color}10;"
							>
								{@html getIcon(userTypes[activeTab].icon, userTypes[activeTab].color)}
							</div>

							<h3 class="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">{userTypes[activeTab].title}</h3>
							<p class="mb-8 text-lg text-gray-600">{userTypes[activeTab].description}</p>

							<div class="mb-8 p-6 bg-gray-50 rounded-xl">
								<h4 class="mb-4 font-semibold text-gray-700 flex items-center">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" style="color: {userTypes[activeTab].color}" viewBox="0 0 20 20" fill="currentColor">
										<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
									</svg>
									Key Benefits
								</h4>
								<ul class="space-y-3">
									{#each userTypes[activeTab].benefits as benefit}
										<li class="flex items-start">
											<svg
												class="mr-2 h-5 w-5 mt-0.5 flex-shrink-0"
												style="color: {userTypes[activeTab].color}"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
													clip-rule="evenodd"
												/>
											</svg>
											<span class="text-gray-700">{benefit}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>

						<div>
							<div class="mb-6 flex items-center gap-4">
								<div class="flex-shrink-0 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center" style="border: 2px solid {userTypes[activeTab].color}">
									<span class="text-xl font-bold" style="color: {userTypes[activeTab].color}">{userTypes[activeTab].stat}</span>
								</div>
								<div>
									<span class="block text-sm text-gray-500">{userTypes[activeTab].statLabel}</span>
									<span class="block text-sm font-medium">Trust TrustMyTablet</span>
								</div>
							</div>
							
							<button
								class="inline-flex items-center justify-center px-6 py-3 font-medium text-white rounded-lg transition-all hover:shadow-lg"
								style="background-color: {userTypes[activeTab].color}"
							>
								<span>Get Started</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ml-2 h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
					</div>

					<!-- Right: Image (2/5) -->
					<div class="relative md:col-span-2 h-64 md:h-auto">
						<img
							src={userTypes[activeTab].image}
							alt={userTypes[activeTab].title}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
						
						<!-- Testimonial overlay -->
						<div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
							<div class="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
								<div class="flex items-center gap-3 mb-2">
									<div class="flex -space-x-2">
										<div class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-white" style="background-color: {userTypes[activeTab].color}">
											{userTypes[activeTab].title.charAt(0)}
										</div>
									</div>
									<div class="flex items-center">
										{#each Array(5) as _, i}
											<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4b400]" viewBox="0 0 20 20" fill="currentColor">
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										{/each}
									</div>
								</div>
								<p class="text-sm text-gray-700 italic">
									"TrustMyTablet has revolutionized how we verify medications. The interface is intuitive and results are immediate."
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom stats/CTA -->
		<div class="mt-12 grid md:grid-cols-4 gap-6" in:fly={{ y: 20, duration: 700, delay: 700 }}>
			{#each userTypes as userType, i}
				<div 
					class="bg-white rounded-xl p-6 transition-all hover:shadow-lg"
					class:shadow-md={i === activeTab}
					style={i === activeTab ? `border-top: 3px solid ${userType.color}` : ""}
					on:click={() => setActiveTab(i)}
					on:mouseenter={pauseRotation}
					on:mouseleave={resumeRotation}
				>
					<div class="flex items-center gap-4">
						<div
							class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
							style="background-color: {userType.color}15;"
						>
							{@html getIcon(userType.icon, userType.color)}
						</div>
						<div>
							<h3 class="font-medium text-gray-800">{userType.title}</h3>
							<p class="text-sm text-gray-500">{userType.stat} {userType.statLabel}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Additional custom styles */
	:global(.user-type-enter) {
		opacity: 0;
		transform: translateY(20px);
	}
	:global(.user-type-enter-active) {
		opacity: 1;
		transform: translateY(0);
		transition: opacity 300ms, transform 300ms;
	}
</style>