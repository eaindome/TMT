<script lang="ts">
	import { onMount } from 'svelte';
	import MedicineHeader from '$lib/components/medicine/Header.svelte';
	import ImageGallery from '$lib/components/medicine/ImageGallery.svelte';
	import AuthenticityInfo from '$lib/components/medicine/AuthenticityInfo.svelte';
	import SafetyInstructions from '$lib/components/medicine/SafetyInstructions.svelte';
	import FlagActionButton from '$lib/components/medicine/FlagActionButton.svelte';
	import ScanRecordsSection from '$lib/components/medicine/ScanRecordsSection.svelte';
	import type { Medicine, AuthenticityStatus } from '$lib/types/medicine.ts';
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/ui/BreadCrumb.svelte';
	import { fade, fly } from 'svelte/transition';

	export let medicineId: string;

	let medicine: Medicine | null = null;
	let loading = true;
	let error = false;

	// Mock data - In production, you would fetch this from your API
	onMount(async () => {
		try {
			// Simulating API call
			await new Promise((resolve) => setTimeout(resolve, 800));

			// Mock data
			medicine = {
				id: medicineId,
				name: 'Amoxicillin',
				brand: 'MediCure Pharma',
				manufacturer: 'Global Health Pharmaceuticals',
				status: 'safe' as AuthenticityStatus,
				lastVerified: new Date(),
				images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
				description: 'Amoxicillin is a penicillin antibiotic used to treat bacterial infections.',
				batchNumber: 'AMX-2025-0542',
				expiryDate: new Date('2026-05-15'),
				scanStats: {
					totalScans: 1458,
					safeCounts: 1426,
					cautionCounts: 24,
					fakeCounts: 8
				},
				safetyInstructions: [
					'Store at room temperature away from moisture and heat',
					'Take as directed by your doctor',
					'Complete the full course as prescribed'
				],
				recentScans: [
					{
						id: 'scan1',
						date: new Date('2025-05-10'),
						location: 'New York, USA',
						status: 'safe',
						user: 'Pharmacist'
					},
					{
						id: 'scan2',
						date: new Date('2025-05-08'),
						location: 'Boston, USA',
						status: 'caution',
						user: 'Consumer'
					},
					{
						id: 'scan3',
						date: new Date('2025-05-05'),
						location: 'Chicago, USA',
						status: 'safe',
						user: 'Healthcare Worker'
					}
				]
			};

			loading = false;
		} catch (e) {
			console.error('Error fetching medicine details:', e);
			error = true;
			loading = false;
		}
	});

	function handleFlagDrug() {
		// In production, implement API call to flag the drug
		alert('Drug has been flagged for review by our team. Thank you for your vigilance!');
	}

	// Define breadcrumb items
	const breadcrumbItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Scan History', href: '/history' },
		{ label: 'Medicine Details', href: '', current: true }
	];

	// Helper function to get status-specific styling
	function getStatusStyle(status: AuthenticityStatus | undefined) {
		if (!status) return {};

		switch (status) {
			case 'safe':
				return 'bg-green-50 border-green-200';
			case 'caution':
				return 'bg-amber-50 border-amber-200';
			case 'fake':
				return 'bg-red-50 border-red-200';
			default:
				return 'bg-gray-50 border-gray-200';
		}
	}
</script>

<svelte:head>
	<title>{medicine ? `${medicine.name} Details` : 'Medicine Details'} | Trust My Tablet</title>
	<meta
		name="description"
		content={medicine?.description || 'Verify the authenticity of your medicine'}
	/>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
	<!-- Breadcrumb -->
	<div class="mb-6">
		<Breadcrumb items={breadcrumbItems} />
	</div>

	{#if loading}
		<div
			class="flex h-96 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-sm"
			in:fade
		>
			<div class="flex flex-col items-center">
				<div
					class="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
				></div>
				<p class="text-lg font-medium text-gray-600">Loading medicine details...</p>
			</div>
		</div>
	{:else if error}
		<div class="overflow-hidden rounded-lg border border-red-200 bg-red-50 shadow-sm" in:fade>
			<div class="p-8 text-center">
				<div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h2 class="mb-2 text-xl font-bold text-gray-900">Unable to Load Medicine Details</h2>
				<p class="mb-6 text-gray-600">
					We encountered a problem while retrieving the medicine information. Please try again later
					or contact support if the problem persists.
				</p>
				<button
					class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					on:click={() => window.location.reload()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2 -ml-1 h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Retry
				</button>
			</div>
		</div>
	{:else if medicine}
		<div class="space-y-6" in:fade={{ duration: 300 }}>
			<!-- Medicine Header -->
			<MedicineHeader
				name={medicine.name}
				brand={medicine.brand}
				manufacturer={medicine.manufacturer}
				status={medicine.status}
				batchNumber={medicine.batchNumber}
				expiryDate={medicine.expiryDate}
			/>

			<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<!-- Left Column (2/3 width on large screens) -->
				<div class="space-y-6 lg:col-span-2">
					<!-- Image Gallery -->
					<div in:fly={{ x: -20, duration: 400, delay: 100 }}>
						<ImageGallery images={medicine.images} />
					</div>

					<!-- Authenticity Information -->
					<div in:fly={{ x: -20, duration: 400, delay: 200 }}>
						<AuthenticityInfo
							status={medicine.status}
							lastVerified={medicine.lastVerified}
							scanStats={medicine.scanStats}
						/>
					</div>

					<!-- Safety Instructions -->
					<div in:fly={{ x: -20, duration: 400, delay: 250 }}>
						<SafetyInstructions instructions={medicine.safetyInstructions} />
					</div>
				</div>

				<!-- Right Column (1/3 width on large screens) -->
				<div class="space-y-6">
                    <!-- Flag Action Button -->
					<div in:fly={{ x: 20, duration: 400, delay: 350 }}>
						<FlagActionButton
							onFlag={handleFlagDrug}
							medicineId={medicine.id}
							medicineName={medicine.name}
						/>
					</div>

					<!-- Scan Records Section -->
					<div in:fly={{ x: 20, duration: 400, delay: 400 }}>
						<ScanRecordsSection scans={medicine.recentScans} />
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
