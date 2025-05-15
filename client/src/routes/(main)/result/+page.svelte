<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import ResultCard from '$lib/components/scans/ResultCard.svelte';
	import MedicineDetails from '$lib/components/scans/MedicineDetails.svelte';
	import ActionCard from '$lib/components/scans/ActionCard.svelte';
	import Breadcrumb from '$lib/components/ui/BreadCrumb.svelte';

	// Get result from URL query parameter
	// In a real app, you'd use an ID to fetch the actual scan result from an API
	let result: 'verified' | 'caution' | 'fake' = 'verified';
	let loading = true;
	let animateIn = false;

	// Define breadcrumb items
	const breadcrumbItems = [
		{ label: 'Scan Medicine', href: '/scan' },
		{ label: 'Scan Results', href: '', current: true }
	];

	// Demo medicine data (would be fetched from API in real app)
	const medicineData = {
		verified: {
			name: 'Amoxicillin',
			brand: 'Medipharm',
			strength: '500mg',
			form: 'Capsule',
			expiryDate: '2026-05-14',
			batchNumber: 'AMX-2023-45678',
			manufacturer: 'Medipharm Pharmaceuticals Ltd.',
			description: 'Amoxicillin is used to treat a wide variety of bacterial infections.',
			imageSrc: '/api/placeholder/400/320'
		},
		caution: {
			name: 'Lisinopril',
			brand: 'Unknown',
			strength: '20mg',
			form: 'Tablet',
			expiryDate: 'Unknown',
			batchNumber: 'LIS-5432',
			manufacturer: 'Unverified Manufacturer',
			description: 'Some details of this medicine could not be verified. Please consult a pharmacist.',
			imageSrc: '/api/placeholder/400/320'
		},
		fake: {
			name: 'Claimed as Lipitor',
			brand: 'Unknown',
			strength: 'Unknown',
			form: 'Tablet',
			expiryDate: 'Invalid',
			batchNumber: 'Not authentic',
			manufacturer: 'Unidentified Source',
			description: 'This product does not match authentic Lipitor characteristics.',
			imageSrc: '/api/placeholder/400/320'
		}
	};

	onMount(() => {
		// Get result from URL query parameter
		const urlResult = $page.url.searchParams.get('result');
		if (urlResult === 'verified' || urlResult === 'caution' || urlResult === 'fake') {
			result = urlResult;
		}

		// Simulate loading
		setTimeout(() => {
			loading = false;
			// Trigger animation after loading
			setTimeout(() => {
				animateIn = true;
			}, 100);
		}, 800);
	});

	function scanNew() {
		goto('/scan');
	}

	function saveResult() {
		// In a real app, this would save to user's history
		// For demo, just show an alert
		alert('Result saved to your verification history');
	}

	// Helper function to get appropriate data based on result
	$: medicine = medicineData[result];
</script>

<div class="min-h-screen pt-6 pb-16">
	<div class="container mx-auto max-w-3xl px-4">
		{#if loading}
			<div class="flex h-64 items-center justify-center">
				<div class="flex flex-col items-center">
					<svg class="h-12 w-12 animate-spin text-[#1a5f4a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<p class="mt-4 text-lg text-[#607d8b]">Processing scan results...</p>
				</div>
			</div>
		{:else}
			<!-- Header with Back Button -->
			<Breadcrumb items={breadcrumbItems} />

			<!-- Result Card -->
			<div class="transition-all duration-500 ease-out {animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
				<ResultCard {result} />
			</div>

			<!-- Medicine Details -->
			<div class="mt-6 transition-all duration-500 ease-out delay-100 {animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
				<MedicineDetails medicine={medicine} />
			</div>

			<!-- Action Cards -->
			<div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 transition-all duration-500 ease-out delay-200 {animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
				<ActionCard
					title="Report Issue"
					description="Found something suspicious? Report this medicine to authorities."
					icon="report"
					buttonText="Report"
					buttonVariant="outline"
					href="/report"
				/>
				<ActionCard
					title="Find Legitimate Source"
					description="Locate verified pharmacies near you that sell authentic medications."
					icon="location"
					buttonText="Find Nearby"
					buttonVariant="outline"
					href="/find-pharmacy"
				/>
			</div>

			<!-- Action Buttons -->
			<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center transition-all duration-500 ease-out delay-300 {animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}">
				<Button variant="primary" on:click={scanNew}>
					<div class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
						</svg>
						<span>Scan New Medicine</span>
					</div>
				</Button>
				<Button variant="outline" on:click={saveResult}>
					<div class="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
						</svg>
						<span>Save Result</span>
					</div>
				</Button>
			</div>

			<div class="mt-8 text-center text-sm text-[#607d8b]">
				<p>Need more information? <a href="/help" class="text-[#0288d1] hover:underline">Visit our Help Center</a></p>
			</div>
		{/if}
	</div>
</div>