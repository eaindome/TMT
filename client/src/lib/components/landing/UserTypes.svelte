<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut, quintOut } from 'svelte/easing';

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
			image: '/images/consumer-user.jpg',
			feature: 'Easy to Use',
			featureLabel: 'Designed for Everyone'
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
			image: '/images/pharmacist-user.jpg',
			feature: 'Time-Saving',
			featureLabel: 'Streamlined Workflow'
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
			image: '/images/healthcare-user.jpg',
			feature: 'Integrable',
			featureLabel: 'Works with Your Systems'
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
			image: '/images/regulator-user.jpg',
			feature: 'Insightful',
			featureLabel: 'Data-Driven Decisions'
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
	<div class="absolute inset-0 z-0 bg-[#f5f5f5]"></div>
	<div class="absolute top-0 right-0 h-64 w-64 rounded-full bg-[#4caf50]/5 blur-3xl"></div>
	<div class="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0288d1]/5 blur-3xl"></div>

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
				<span
					class="inline-flex items-center rounded-full bg-[#1a5f4a]/10 px-4 py-1.5 text-sm font-medium text-[#1a5f4a]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1.5 h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
						/>
					</svg>
					Made For Everyone
				</span>
			</div>

			<h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
				Tailored For <span class="text-[#1a5f4a]">Every User</span>
			</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Our app adapts to your specific needs, providing specialized features for everyday
				consumers, healthcare professionals, and regulatory authorities.
			</p>
		</div>

		<!-- Tab Navigation -->
		<div
			class="mb-12 flex flex-wrap justify-center gap-3 md:gap-4"
			in:fly={{ y: 20, duration: 700, delay: 500 }}
		>
			{#each userTypes as userType, i}
				<button
					class="relative rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:shadow-md md:text-base"
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
						<span
							class="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full"
						>
							<span class="absolute inset-0 bg-white opacity-10"></span>
							{#if i === activeTab}
								<svg class="absolute top-0 left-0 h-full w-full" viewBox="0 0 100 100">
									<defs>
										<linearGradient id="gradient-{i}" x1="0%" y1="0%" x2="100%" y2="0%">
											<stop offset="0%" stop-color="rgba(255, 255, 255, 0.3)" />
											<stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
										</linearGradient>
									</defs>
									<circle
										cx="50"
										cy="50"
										r="47"
										fill="none"
										stroke="url(#gradient-{i})"
										stroke-width="2"
										stroke-dasharray="295.31"
										stroke-dashoffset={295.31 - (295.31 * progress) / 100}
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
		<div
			class="relative overflow-hidden rounded-2xl bg-white shadow-xl md:mb-16"
			style="min-height: 480px;"
		>
			<div
				class="absolute inset-0 transition-opacity duration-300"
				class:opacity-100={contentVisible}
				class:opacity-0={!contentVisible}
			>
				<div class="grid h-full md:grid-cols-5">
					<!-- Left: Content (3/5) -->
					<div class="p-8 md:col-span-3 md:p-12">
						<div class="mb-8">
							<!-- Header with icon and title in horizontal layout -->
							<div class="flex items-start">
								<div
									class="mr-5 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl shadow-md"
									style="background-color: {userTypes[activeTab].color}10;"
								>
									{@html getIcon(userTypes[activeTab].icon, userTypes[activeTab].color)}
								</div>

								<div class="flex-1">
									<h3 class="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
										{userTypes[activeTab].title}
									</h3>
									<p class="text-lg text-gray-600">{userTypes[activeTab].description}</p>
								</div>
							</div>
						</div>

						<!-- Benefits section -->
						<div class="mb-8 rounded-xl bg-gray-50 p-6">
							<h4 class="mb-4 flex items-center font-semibold text-gray-700">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-2 h-5 w-5"
									style="color: {userTypes[activeTab].color}"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								Key Benefits
							</h4>
							<ul class="space-y-3">
								{#each userTypes[activeTab].benefits as benefit}
									<li class="flex items-start">
										<svg
											class="mt-0.5 mr-2 h-5 w-5 flex-shrink-0"
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

						<!-- CTA section -->
						<div class="mt-auto">
							<div class="mb-6 flex flex-wrap items-center gap-6">
								<div class="flex-grow md:text-right">
									<a
										href="/signup"
										class="inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
										style="background-color: {userTypes[activeTab].color}"
									>
										<span>Join Our Beta</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fill-rule="evenodd"
												d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Image (2/5) -->
					<div class="relative h-64 md:col-span-2 md:h-auto">
						<img
							src={userTypes[activeTab].image}
							alt={userTypes[activeTab].title}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>

						<!-- Feature overlay (replacing testimonial) -->
						<div class="absolute right-0 bottom-0 left-0 p-6 lg:p-8">
							<div class="rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm">
								<div class="mb-2 flex items-center gap-3">
									<div class="flex">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
											style="background-color: {userTypes[activeTab].color}"
										>
											{userTypes[activeTab].title.charAt(0)}
										</div>
									</div>
									<!-- Replace stars with feature badge -->
									<div
										class="rounded-full px-3 py-1 text-xs font-medium"
										style="background-color: {userTypes[activeTab].color}20; color: {userTypes[
											activeTab
										].color}"
									>
										{userTypes[activeTab].feature}
									</div>
								</div>
								<!-- Replace testimonial with feature description -->
								<p class="text-sm text-gray-700">
									<span class="font-medium">{userTypes[activeTab].featureLabel}:</span> We're
									designing our platform to meet the specific needs of {userTypes[
										activeTab
									].title.toLowerCase()}, with a focus on simplicity and effectiveness.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom navigation buttons -->
		<div class="mt-12 grid gap-6 md:grid-cols-4" in:fly={{ y: 20, duration: 700, delay: 700 }}>
			{#each userTypes as userType, i}
				<button
					class="rounded-xl bg-white p-6 transition-all hover:shadow-lg"
					class:shadow-md={i === activeTab}
					style={i === activeTab ? `border-top: 3px solid ${userType.color}` : ''}
					on:click={() => setActiveTab(i)}
					on:mouseenter={pauseRotation}
					on:mouseleave={resumeRotation}
					role="tab"
					aria-selected={i === activeTab}
					tabindex="0"
					on:keydown={(e) => e.key === 'Enter' && setActiveTab(i)}
				>
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
							style="background-color: {userType.color}15;"
						>
							{@html getIcon(userType.icon, userType.color)}
						</div>
						<div>
							<h3 class="font-medium text-gray-800">{userType.title}</h3>
							<!-- Replace stat with feature label -->
							<p class="text-sm text-gray-500">{userType.feature}</p>
						</div>
					</div>
				</button>
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
		transition:
			opacity 300ms,
			transform 300ms;
	}
</style>
