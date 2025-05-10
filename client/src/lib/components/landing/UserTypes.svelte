<script lang="ts">
	import { onMount } from 'svelte';

	// User type data
	const userTypes = [
		{
			icon: 'user',
			title: 'Consumers',
			description: 'Quickly verify medication before use to ensure your safety and peace of mind.',
			benefits: ['Instant verification', 'Simple interface', 'Medication history'],
			color: '#4caf50',
			image: '/assets/images/consumer-user.jpg'
		},
		{
			icon: 'pill',
			title: 'Pharmacists',
			description:
				'Efficiently verify inventory and document authenticity for regulatory compliance.',
			benefits: ['Batch scanning', 'Digital records', 'Professional reports'],
			color: '#1a5f4a',
			image: '/assets/images/pharmacist-user.jpg'
		},
		{
			icon: 'heart',
			title: 'Healthcare Workers',
			description: 'Ensure patients receive genuine medication with quick verification tools.',
			benefits: ['Clinical accuracy', 'Patient safety tools', 'Integrated workflow'],
			color: '#0288d1',
			image: '/assets/images/healthcare-user.jpg'
		},
		{
			icon: 'chart',
			title: 'Regulators',
			description: 'Monitor counterfeit medicine trends and enforce compliance across regions.',
			benefits: ['Analytics dashboard', 'Enforcement tools', 'Geographic insights'],
			color: '#607d8b',
			image: '/assets/images/regulator-user.jpg'
		}
	];

	// Active tab state
	let activeTab = 0;

	// Auto rotate tabs
	let interval: ReturnType<typeof setInterval>;

	function startAutoRotate() {
		interval = setInterval(() => {
			activeTab = (activeTab + 1) % userTypes.length;
		}, 5000);
	}

	onMount(() => {
		startAutoRotate();
		return () => clearInterval(interval);
	});

	function setActiveTab(index: number) {
		activeTab = index;
		clearInterval(interval);
		startAutoRotate();
	}
</script>

<section class="relative overflow-hidden bg-[#f5f5f5] py-16 md:py-24">
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
		<div class="mx-auto mb-12 max-w-3xl text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
				Tailored For <span class="text-[#1a5f4a]">Every User</span>
			</h2>
			<p class="text-lg text-gray-600">
				Our app adapts to your specific needs, whether you're a consumer, healthcare professional,
				or regulator.
			</p>
		</div>

		<!-- Tab Navigation -->
		<div class="mb-12 flex flex-wrap justify-center gap-2 md:gap-4">
			{#each userTypes as userType, i}
				<button
					class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 md:text-base"
					class:bg-white={activeTab !== i}
					class:text-gray-700={activeTab !== i}
					class:hover:bg-gray-100={activeTab !== i}
					class:text-white={activeTab === i}
					class:shadow-lg={activeTab === i}
					style={activeTab === i ? `background-color: ${userType.color}` : ''}
					on:click={() => setActiveTab(i)}
				>
					{userType.title}
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="relative overflow-hidden rounded-2xl bg-white shadow-xl" style="min-height: 400px;">
			{#each userTypes as userType, i}
				<div
					class="absolute inset-0 grid transition-all duration-500 md:grid-cols-2"
					class:opacity-100={activeTab === i}
					class:z-10={activeTab === i}
					class:opacity-0={activeTab !== i}
					class:z-0={activeTab !== i}
					style="transform: translateX({(i - activeTab) * 100}%)"
				>
					<!-- Left: Content -->
					<div class="flex flex-col justify-center p-8 md:p-12">
						<div
							class="mb-6 flex h-12 w-12 items-center justify-center rounded-lg"
							style="background-color: {userType.color}15;"
						>
							{#if userType.icon === 'user'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									style="color: {userType.color}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							{:else if userType.icon === 'pill'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									style="color: {userType.color}"
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
							{:else if userType.icon === 'heart'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									style="color: {userType.color}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
									/>
								</svg>
							{:else if userType.icon === 'chart'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									style="color: {userType.color}"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
									/>
								</svg>
							{/if}
						</div>

						<h3 class="mb-3 text-2xl font-bold text-gray-800">{userType.title}</h3>
						<p class="mb-6 text-gray-600">{userType.description}</p>

						<h4 class="mb-3 font-semibold text-gray-700">Key Benefits:</h4>
						<ul class="mb-8 space-y-2">
							{#each userType.benefits as benefit}
								<li class="flex items-center">
									<svg
										class="mr-2 h-5 w-5"
										style="color: {userType.color}"
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
									<span>{benefit}</span>
								</li>
							{/each}
						</ul>

						<button
							class="inline-flex items-center font-medium hover:underline"
							style="color: {userType.color}"
						>
							<span>Learn more about features for {userType.title}</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-1 h-5 w-5"
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

					<!-- Right: Image -->
					<div class="relative h-64 bg-gray-100 md:h-auto">
						<img
							src={userType.image}
							alt={userType.title}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Progress indicators -->
		<div class="mt-6 flex justify-center gap-2">
			{#each userTypes as _, i}
				<button
					class="h-2 w-2 rounded-full transition-all duration-300"
					class:bg-gray-300={activeTab !== i}
					class:hover:bg-gray-400={activeTab !== i}
					class:bg-[#1a5f4a]={activeTab === i}
					class:w-6={activeTab === i}
					on:click={() => setActiveTab(i)}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Add any additional styles here */
</style>
