<script lang="ts">
	interface CommunityHighlight {
		id: string;
		type: 'discussion' | 'guide' | 'faq' | 'alert' | 'achievement';
		title: string;
		description: string;
		author?: string;
		date: string;
		engagement: {
			views: number;
			likes: number;
			comments: number;
		};
		category: string;
		priority: 'high' | 'medium' | 'low';
		featured: boolean;
	}

	let highlights: CommunityHighlight[] = [
		{
			id: '1',
			type: 'discussion',
			title: 'Paracetamol Counterfeits Surge in West Africa',
			description:
				'Community discussion on recent counterfeit paracetamol cases and how to identify authentic products.',
			author: 'Dr. Sarah Johnson',
			date: '2024-03-15',
			engagement: { views: 2847, likes: 156, comments: 34 },
			category: 'Drug Safety Alerts',
			priority: 'high',
			featured: true
		},
		{
			id: '2',
			type: 'guide',
			title: 'Complete Guide: Identifying Fake Antibiotics',
			description:
				'Step-by-step guide created by our community experts on spotting counterfeit antibiotics.',
			author: 'Pharmacist Network',
			date: '2024-03-12',
			engagement: { views: 1923, likes: 98, comments: 28 },
			category: 'Educational Guides',
			priority: 'high',
			featured: true
		},
		{
			id: '3',
			type: 'alert',
			title: 'Urgent: Fake COVID-19 Vaccines Reported',
			description:
				'Community alert about counterfeit COVID-19 vaccines circulating in Southeast Asia.',
			author: 'WHO Regional Office',
			date: '2024-03-10',
			engagement: { views: 4562, likes: 278, comments: 67 },
			category: 'Urgent Alerts',
			priority: 'high',
			featured: true
		},
		{
			id: '4',
			type: 'faq',
			title: 'FAQ: Medicine Verification Process',
			description:
				'Comprehensive FAQ compiled from community questions about our verification process.',
			date: '2024-03-08',
			engagement: { views: 1456, likes: 73, comments: 19 },
			category: 'Help & Support',
			priority: 'medium',
			featured: false
		},
		{
			id: '5',
			type: 'discussion',
			title: 'Traditional vs Modern Medicine Authentication',
			description:
				'Ongoing discussion about authentication methods for traditional and modern medicines.',
			author: 'Traditional Medicine Council',
			date: '2024-03-05',
			engagement: { views: 1087, likes: 45, comments: 23 },
			category: 'Community Discussions',
			priority: 'medium',
			featured: false
		},
		{
			id: '6',
			type: 'achievement',
			title: 'Community Milestone: 10,000 Verified Scans',
			description:
				"Celebrating our community's achievement of 10,000 successful medicine verifications.",
			date: '2024-03-01',
			engagement: { views: 3241, likes: 189, comments: 56 },
			category: 'Community Achievements',
			priority: 'medium',
			featured: false
		}
	];

	let selectedCategory = '';
	let selectedType = '';

	$: filteredHighlights = highlights.filter((highlight) => {
		const matchesCategory = !selectedCategory || highlight.category === selectedCategory;
		const matchesType = !selectedType || highlight.type === selectedType;
		return matchesCategory && matchesType;
	});

	const categories = [...new Set(highlights.map((h) => h.category))];
	const types = [...new Set(highlights.map((h) => h.type))];
	const featuredHighlights = highlights.filter((h) => h.featured);

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getTypeIcon(type: 'discussion' | 'guide' | 'faq' | 'alert' | 'achievement'): string {
		const icons = {
			discussion: '💬',
			guide: '📖',
			faq: '❓',
			alert: '🚨',
			achievement: '🏆'
		};
		return icons[type] || '📄';
	}

	function getTypeColor(type: 'discussion' | 'guide' | 'faq' | 'alert' | 'achievement'): string {
		const colors = {
			discussion: 'bg-blue-100 text-blue-800',
			guide: 'bg-green-100 text-green-800',
			faq: 'bg-purple-100 text-purple-800',
			alert: 'bg-red-100 text-red-800',
			achievement: 'bg-yellow-100 text-yellow-800'
		};
		return colors[type] || 'bg-gray-100 text-gray-800';
	}

	function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
		const colors = {
			high: 'border-red-300 bg-red-50',
			medium: 'border-yellow-300 bg-yellow-50',
			low: 'border-green-300 bg-green-50'
		};
		return colors[priority] || 'border-gray-300 bg-gray-50';
	}

	function formatNumber(num: number): string {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k';
		}
		return num.toString();
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center">
		<h2 class="mb-2 text-3xl font-bold text-gray-900">Community Highlights</h2>
		<p class="mx-auto max-w-2xl text-gray-600">
			Stay updated with the most important discussions, guides, and alerts from our global community
			of healthcare professionals and safety advocates.
		</p>
	</div>

	<!-- Featured Highlights -->
	<div class="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-8">
		<h3 class="mb-6 text-2xl font-bold text-gray-900">Trending Now</h3>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
			{#each featuredHighlights as highlight}
				<div
					class="rounded-lg bg-white p-6 shadow-md transition-shadow duration-200 hover:shadow-lg {getPriorityColor(
						highlight.priority
					)} border-l-4"
				>
					<div class="mb-4 flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<span class="text-2xl">{getTypeIcon(highlight.type)}</span>
							<span
								class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {getTypeColor(
									highlight.type
								)}"
							>
								{highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
							</span>
						</div>
						{#if highlight.priority === 'high'}
							<span
								class="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"
							>
								🔥 Hot
							</span>
						{/if}
					</div>

					<h4 class="mb-2 text-lg font-semibold text-gray-900">{highlight.title}</h4>
					<p class="mb-4 text-sm text-gray-600">{highlight.description}</p>

					{#if highlight.author}
						<div class="mb-3 flex items-center text-sm text-gray-500">
							<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clip-rule="evenodd"
								/>
							</svg>
							<span class="font-medium">{highlight.author}</span>
							<span class="mx-2">•</span>
							<span>{formatDate(highlight.date)}</span>
						</div>
					{:else}
						<div class="mb-3 text-sm text-gray-500">{formatDate(highlight.date)}</div>
					{/if}

					<div class="flex items-center justify-between text-sm text-gray-500">
						<div class="flex items-center space-x-4">
							<span class="flex items-center">
								<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
									<path
										fill-rule="evenodd"
										d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
										clip-rule="evenodd"
									/>
								</svg>
								{formatNumber(highlight.engagement.views)}
							</span>
							<span class="flex items-center">
								<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
										clip-rule="evenodd"
									/>
								</svg>
								{formatNumber(highlight.engagement.likes)}
							</span>
							<span class="flex items-center">
								<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
										clip-rule="evenodd"
									/>
								</svg>
								{formatNumber(highlight.engagement.comments)}
							</span>
						</div>
						<button
							class="font-medium text-green-600 transition-colors duration-200 hover:text-green-800"
						>
							Read More →
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Filters -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<div>
				<label for="category-filter" class="mb-2 block text-sm font-medium text-gray-700">
					Category
				</label>
				<select
					id="category-filter"
					bind:value={selectedCategory}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
				>
					<option value="">All Categories</option>
					{#each categories as category}
						<option value={category}>{category}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="type-filter" class="mb-2 block text-sm font-medium text-gray-700">
					Content Type
				</label>
				<select
					id="type-filter"
					bind:value={selectedType}
					class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
				>
					<option value="">All Types</option>
					{#each types as type}
						<option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- All Highlights -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h3 class="mb-6 text-xl font-semibold text-gray-900">Community Feed</h3>

		<div class="space-y-4">
			{#each filteredHighlights as highlight}
				<div
					class="rounded-lg border border-gray-200 p-6 transition-colors duration-200 hover:border-purple-200 hover:bg-purple-50/30 {getPriorityColor(
						highlight.priority
					)}"
				>
					<div class="flex items-start space-x-4">
						<!-- Icon and Type -->
						<div class="flex-shrink-0">
							<div
								class="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xl"
							>
								{getTypeIcon(highlight.type)}
							</div>
						</div>

						<!-- Content -->
						<div class="min-w-0 flex-1">
							<div class="mb-2 flex items-center space-x-3">
								<h4 class="text-lg font-medium text-gray-900">{highlight.title}</h4>
								<span
									class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium {getTypeColor(
										highlight.type
									)}"
								>
									{highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
								</span>
								{#if highlight.priority === 'high'}
									<span
										class="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800"
									>
										High Priority
									</span>
								{/if}
							</div>

							<p class="mb-3 text-gray-600">{highlight.description}</p>

							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-4 text-sm text-gray-500">
									{#if highlight.author}
										<span class="flex items-center">
											<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
													clip-rule="evenodd"
												/>
											</svg>
											{highlight.author}
										</span>
									{/if}
									<span>{formatDate(highlight.date)}</span>
									<span class="text-gray-400">•</span>
									<span>{highlight.category}</span>
								</div>

								<div class="flex items-center space-x-4 text-sm text-gray-500">
									<span class="flex items-center">
										<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
											<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
											<path
												fill-rule="evenodd"
												d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
												clip-rule="evenodd"
											/>
										</svg>
										{formatNumber(highlight.engagement.views)}
									</span>
									<span class="flex items-center">
										<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
												clip-rule="evenodd"
											/>
										</svg>
										{formatNumber(highlight.engagement.likes)}
									</span>
									<span class="flex items-center">
										<svg class="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
												clip-rule="evenodd"
											/>
										</svg>
										{formatNumber(highlight.engagement.comments)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Community Stats -->
	<div class="rounded-lg bg-white p-6 shadow-md">
		<h3 class="mb-6 text-xl font-semibold text-gray-900">Community Statistics</h3>
		<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
			<div class="text-center">
				<div class="text-2xl font-bold text-purple-600">2.8k</div>
				<div class="text-sm text-gray-600">Active Members</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-green-600">156</div>
				<div class="text-sm text-gray-600">Discussions</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-blue-600">89</div>
				<div class="text-sm text-gray-600">Guides Created</div>
			</div>
			<div class="text-center">
				<div class="text-2xl font-bold text-orange-600">1.2k</div>
				<div class="text-sm text-gray-600">Questions Answered</div>
			</div>
		</div>
	</div>
</div>
