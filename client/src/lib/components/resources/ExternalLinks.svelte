<script lang="ts">
	interface ExternalLink {
		id: string;
		title: string;
		description: string;
		url: string;
		category: string;
		organization: string;
		verified: boolean;
		lastChecked: string;
		type: 'guidelines' | 'portal' | 'reporting' | 'research' | 'news';
		featured: boolean;
	}

	let links: ExternalLink[] = [
		{
			id: '1',
			title: 'WHO Guidelines on Drug Authenticity',
			description:
				'World Health Organization comprehensive guidelines for identifying and combating counterfeit medicines.',
			url: 'https://www.who.int/medicines/regulation/ssffc',
			category: 'International Guidelines',
			organization: 'World Health Organization',
			verified: true,
			lastChecked: '2024-03-15',
			type: 'guidelines',
			featured: true
		},
		{
			id: '2',
			title: 'FDA Drug Safety Portal',
			description:
				'US Food and Drug Administration portal for drug safety information and reporting suspicious medicines.',
			url: 'https://www.fda.gov/drugs/drug-safety-and-availability',
			category: 'Regulatory Portals',
			organization: 'FDA',
			verified: true,
			lastChecked: '2024-03-14',
			type: 'portal',
			featured: true
		},
		{
			id: '3',
			title: 'NAFDAC Medicine Verification',
			description:
				'National Agency for Food and Drug Administration and Control (Nigeria) medicine verification system.',
			url: 'https://www.nafdac.gov.ng/mobile-authentication-service/',
			category: 'Regulatory Portals',
			organization: 'NAFDAC',
			verified: true,
			lastChecked: '2024-03-12',
			type: 'portal',
			featured: true
		},
		{
			id: '4',
			title: 'EMA Falsified Medicines Database',
			description:
				'European Medicines Agency database for reporting and tracking falsified medicines.',
			url: 'https://www.ema.europa.eu/en/human-regulatory/post-authorisation/falsified-medicines',
			category: 'International Guidelines',
			organization: 'European Medicines Agency',
			verified: true,
			lastChecked: '2024-03-10',
			type: 'guidelines',
			featured: false
		},
		{
			id: '5',
			title: 'INTERPOL Pharmaceutical Crime Unit',
			description:
				'International police cooperation on pharmaceutical crimes and counterfeit medicine investigations.',
			url: 'https://www.interpol.int/Crimes/Illicit-goods/Pharmaceutical-crime',
			category: 'Law Enforcement',
			organization: 'INTERPOL',
			verified: true,
			lastChecked: '2024-03-08',
			type: 'reporting',
			featured: false
		},
		{
			id: '6',
			title: 'Ghana FDA Medicine Verification',
			description: 'Ghana Food and Drugs Authority platform for verifying medicine authenticity.',
			url: 'https://www.fdaghana.gov.gh/services/medicine-verification',
			category: 'Regulatory Portals',
			organization: 'Ghana FDA',
			verified: true,
			lastChecked: '2024-03-07',
			type: 'portal',
			featured: false
		},
		{
			id: '7',
			title: 'SAHPRA Medicine Safety',
			description:
				'South African Health Products Regulatory Authority medicine safety and reporting platform.',
			url: 'https://www.sahpra.org.za/medicine-safety/',
			category: 'Regulatory Portals',
			organization: 'SAHPRA',
			verified: true,
			lastChecked: '2024-03-05',
			type: 'portal',
			featured: false
		},
		{
			id: '8',
			title: 'PSI Pharmaceutical Security Institute',
			description: 'Research and intelligence on pharmaceutical counterfeiting and related crimes.',
			url: 'https://www.psi-inc.org/',
			category: 'Research Organizations',
			organization: 'PSI',
			verified: true,
			lastChecked: '2024-03-03',
			type: 'research',
			featured: false
		},
		{
			id: '9',
			title: 'MHRA Medicine Safety Updates',
			description:
				'UK Medicines and Healthcare products Regulatory Agency safety alerts and updates.',
			url: 'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency',
			category: 'Regulatory Portals',
			organization: 'MHRA',
			verified: true,
			lastChecked: '2024-03-01',
			type: 'portal',
			featured: false
		},
		{
			id: '10',
			title: 'UNODC Counterfeit Medicine Reports',
			description: 'United Nations Office on Drugs and Crime reports on illicit medicine trade.',
			url: 'https://www.unodc.org/unodc/en/organized-crime/counterfeit-goods-and-medicines.html',
			category: 'Research Organizations',
			organization: 'UNODC',
			verified: true,
			lastChecked: '2024-02-28',
			type: 'research',
			featured: false
		}
	];

	let selectedCategory = '';
	let selectedType = '';
	let filteredLinks: ExternalLink[] = [];

	$: {
		filteredLinks = links.filter((link) => {
			const matchesCategory = !selectedCategory || link.category === selectedCategory;
			const matchesType = !selectedType || link.type === selectedType;
			return matchesCategory && matchesType;
		});
	}

	const categories = [...new Set(links.map((l) => l.category))];
	const types = [...new Set(links.map((l) => l.type))];
	const featuredLinks = links.filter((l) => l.featured);

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getTypeIcon(type: 'guidelines' | 'portal' | 'reporting' | 'research' | 'news'): string {
		const icons = {
			guidelines: '📋',
			portal: '🌐',
			reporting: '🚨',
			research: '🔬',
			news: '📰'
		};
		return icons[type] || '🔗';
	}

	function getTypeColor(type: 'guidelines' | 'portal' | 'reporting' | 'research' | 'news'): string {
		const colors = {
			guidelines: 'bg-blue-100 text-blue-800',
			portal: 'bg-green-100 text-green-800',
			reporting: 'bg-red-100 text-red-800',
			research: 'bg-purple-100 text-purple-800',
			news: 'bg-yellow-100 text-yellow-800'
		};
		return colors[type] || 'bg-gray-100 text-gray-800';
	}

	function openLink(url: string) {
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center">
		<h2 class="mb-2 text-3xl font-bold text-gray-900">External Resources & Links</h2>
		<p class="mx-auto max-w-2xl text-gray-600">
			Access official guidelines, regulatory portals, and trusted organizations dedicated to
			combating counterfeit medicines worldwide.
		</p>
	</div>

	<!-- Featured Links -->
	<div class="rounded-xl bg-gradient-to-r from-green-50 to-blue-50 p-8">
		<h3 class="mb-6 text-2xl font-bold text-gray-900">Featured Resources</h3>
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredLinks as link}
				<div
					class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg"
				>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<span class="text-2xl">{getTypeIcon(link.type)}</span>
							<span
								class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getTypeColor(
									link.type
								)}"
							>
								{link.type.charAt(0).toUpperCase() + link.type.slice(1)}
							</span>
						</div>
						{#if link.verified}
							<span
								class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
							>
								✓ Verified
							</span>
						{/if}
					</div>

					<h4 class="mb-2 text-lg font-semibold text-gray-900">{link.title}</h4>
					<p class="mb-4 text-sm text-gray-600">{link.description}</p>

					<div class="mb-4 flex items-center justify-between text-sm text-gray-500">
						<span class="font-medium">{link.organization}</span>
						<span>Checked {formatDate(link.lastChecked)}</span>
					</div>

					<button
						on:click={() => openLink(link.url)}
						class="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700"
					>
						<span>Visit Resource</span>
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Filters -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- Category Filter -->
			<div>
				<label for="category-filter" class="mb-2 block text-sm font-medium text-gray-700">
					Category
				</label>
				<select
					id="category-filter"
					bind:value={selectedCategory}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
				>
					<option value="">All Categories</option>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>

			<!-- Type Filter -->
			<div>
				<label for="type-filter" class="mb-2 block text-sm font-medium text-gray-700">
					Resource Type
				</label>
				<select
					id="type-filter"
					bind:value={selectedType}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
				>
					<option value="">All Types</option>
					{#each types as type}
						<option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- All Links by Category -->
	{#each categories as category}
		{@const categoryLinks = filteredLinks.filter((l) => l.category === category)}
		{#if categoryLinks.length > 0}
			<div class="rounded-lg bg-white p-6 shadow-md">
				<h3 class="mb-6 flex items-center text-xl font-semibold text-gray-900">
					<span class="mr-3 h-6 w-1 rounded-full bg-green-600"></span>
					{category}
				</h3>

				<div class="space-y-4">
					{#each categoryLinks as link}
						<div
							class="rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:border-green-200 hover:bg-green-50/50"
						>
							<div class="flex items-start justify-between">
								<div class="flex flex-1 items-start space-x-4">
									<!-- Icon -->
									<div class="flex-shrink-0">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl"
										>
											{getTypeIcon(link.type)}
										</div>
									</div>

									<!-- Content -->
									<div class="min-w-0 flex-1">
										<div class="mb-2 flex items-center space-x-3">
											<h4 class="text-lg font-medium text-gray-900">{link.title}</h4>
											<span
												class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium {getTypeColor(
													link.type
												)}"
											>
												{link.type.charAt(0).toUpperCase() + link.type.slice(1)}
											</span>
											{#if link.verified}
												<span
													class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
												>
													✓ Verified
												</span>
											{/if}
										</div>

										<p class="mb-3 text-gray-600">{link.description}</p>

										<div class="flex items-center space-x-4 text-sm text-gray-500">
											<span class="flex items-center">
												<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
													<path
														fill-rule="evenodd"
														d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
														clip-rule="evenodd"
													/>
												</svg>
												{link.organization}
											</span>
											<span class="flex items-center">
												<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
													<path
														fill-rule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
														clip-rule="evenodd"
													/>
												</svg>
												Last checked {formatDate(link.lastChecked)}
											</span>
										</div>
									</div>
								</div>

								<!-- Action Button -->
								<div class="ml-4 flex-shrink-0">
									<button
										on:click={() => openLink(link.url)}
										class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
									>
										<span>Visit</span>
										<svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/each}

	<!-- Help Section -->
	<div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
		<div class="flex items-start">
			<div class="flex-shrink-0">
				<svg class="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="ml-3">
				<h3 class="text-sm font-medium text-blue-800">Need Help Finding Resources?</h3>
				<div class="mt-2 text-sm text-blue-700">
					<p>
						If you're looking for resources specific to your country or region, or if you have a
						resource to suggest, please contact our support team. We regularly update this list to
						ensure accuracy and relevance.
					</p>
				</div>
				<div class="mt-4">
					<button
						class="rounded bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 transition-colors duration-200 hover:bg-blue-200"
					>
						Contact Support
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
