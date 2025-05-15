<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import VerificationFilters from './VerificationFilters.svelte';
	import VerificationTable from './VerificationTable.svelte';
	import VerificationCard from './VerificationCard.svelte';
	import ViewToggle from './ViewToggle.svelte';
	import Pagination from './Pagination.svelte';
	import type { Verification } from '$lib/types/history.ts';
	import Icon from '$lib/components/ui/Icon.svelte';

	// State variables
	let viewMode: 'table' | 'card' = 'table';
	let verifications: Verification[] = [];
	let filteredVerifications: Verification[] = [];
	let currentPage = 1;
	let itemsPerPage = 10;
	let totalPages = 1;
	let loading = true;
	let error: string | null = null;

	// Filters
	let searchQuery = '';
	let dateFilter = '';
	let resultFilter = '';

	// Get status distribution
	$: statusStats = {
		safe: filteredVerifications.filter((v) => v.status === 'safe').length,
		caution: filteredVerifications.filter((v) => v.status === 'caution').length,
		fake: filteredVerifications.filter((v) => v.status === 'fake').length
	};

	// Mock data for demonstration
	onMount(async () => {
		try {
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 800));

			// This would be replaced with an actual API call
			verifications = [
				{
					id: '1',
					drugName: 'Ibuprofen 200mg',
					status: 'safe',
					timestamp: '2025-05-14T10:30:00Z',
					batchNumber: 'IBU-2025-0544',
					manufacturer: 'PharmaCorp Inc.'
				},
				{
					id: '2',
					drugName: 'Amoxicillin 500mg',
					status: 'fake',
					timestamp: '2025-05-13T14:22:00Z',
					batchNumber: 'AMX-2024-8721',
					manufacturer: 'MediGen Ltd.'
				},
				{
					id: '3',
					drugName: 'Loratadine 10mg',
					status: 'caution',
					timestamp: '2025-05-12T09:15:00Z',
					batchNumber: 'LOR-2025-3319',
					manufacturer: 'AllClear Pharmaceuticals'
				},
				{
					id: '4',
					drugName: 'Metformin 850mg',
					status: 'safe',
					timestamp: '2025-05-10T16:45:00Z',
					batchNumber: 'MET-2025-6622',
					manufacturer: 'DiaCare Medical'
				},
				{
					id: '5',
					drugName: 'Simvastatin 20mg',
					status: 'safe',
					timestamp: '2025-05-09T11:20:00Z',
					batchNumber: 'SIM-2025-1198',
					manufacturer: 'HeartWell Pharma'
				}
			];

			applyFilters();
			loading = false;
		} catch (err) {
			error = 'Failed to load verification history.';
			loading = false;
		}
	});

	// Apply filters to verifications
	function applyFilters() {
		filteredVerifications = verifications.filter((verification) => {
			// Search query filter
			const matchesSearch =
				searchQuery === '' ||
				verification.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				verification.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
				verification.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

			// Date filter (simplified for demo)
			const matchesDate = dateFilter === '' || verification.timestamp.includes(dateFilter);

			// Result filter
			const matchesResult = resultFilter === '' || verification.status === resultFilter;

			return matchesSearch && matchesDate && matchesResult;
		});

		totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);
		if (currentPage > totalPages) {
			currentPage = totalPages > 0 ? totalPages : 1;
		}
	}

	// Handle filter changes
	function handleFilterChange(event: CustomEvent) {
		searchQuery = event.detail.searchQuery;
		dateFilter = event.detail.dateFilter;
		resultFilter = event.detail.resultFilter;
		currentPage = 1; // Reset to first page when filters change
		applyFilters();
	}

	// Handle view mode toggle
	function handleViewModeChange(event: CustomEvent) {
		viewMode = event.detail.viewMode;
	}

	// Handle pagination
	function handlePageChange(event: CustomEvent) {
		currentPage = event.detail.page;
	}

	// Get current page items
	$: paginatedVerifications = filteredVerifications.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// Calculate the range of items being displayed
	$: startItem = (currentPage - 1) * itemsPerPage + 1;
	$: endItem = Math.min(startItem + itemsPerPage - 1, filteredVerifications.length);
</script>

<div class="min-h-screen bg-gray-50">
	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Page header -->
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-gray-900 sm:text-3xl">Verification History</h1>
			<p class="mt-2 text-sm text-gray-600">View and manage your medicine verification records</p>
		</div>

		<!-- Filters -->
		<div class="mb-6">
			<VerificationFilters
				{searchQuery}
				{dateFilter}
				{resultFilter}
				on:filterChange={handleFilterChange}
			/>
		</div>

		<!-- Results info and view toggle -->
		<div class="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
			<div class="text-sm text-gray-600">
				{#if filteredVerifications.length > 0}
					Showing <span class="font-medium">{startItem}-{endItem}</span> of
					<span class="font-medium">{filteredVerifications.length}</span> results
				{:else}
					No results found
				{/if}
			</div>

			<ViewToggle {viewMode} on:viewModeChange={handleViewModeChange} />
		</div>

		<!-- Loading state -->
		{#if loading}
			<div class="flex min-h-60 items-center justify-center rounded-lg bg-white p-8 text-center">
				<div class="flex flex-col items-center">
					<div
						class="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-[#1a5f4a]"
					></div>
					<p class="text-sm text-gray-600">Loading verification records...</p>
				</div>
			</div>

			<!-- Error state -->
		{:else if error}
			<div class="rounded-lg bg-white p-8 text-center">
				<div class="flex flex-col items-center">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-red-600"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<p class="text-gray-900">{error}</p>
					<button
						class="mt-4 rounded-md bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#164639]"
					>
						Try Again
					</button>
				</div>
			</div>

			<!-- Empty state -->
		{:else if filteredVerifications.length === 0}
			<div class="rounded-lg bg-white p-8 text-center" in:fade={{ duration: 200 }}>
				<div class="flex flex-col items-center">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h3 class="text-lg font-medium text-gray-900">No verification records found</h3>
					<p class="mt-2 text-sm text-gray-600">
						{#if searchQuery || dateFilter || resultFilter}
							Try adjusting your search filters to find what you're looking for.
						{:else}
							You haven't verified any medications yet. Start by scanning a medication.
						{/if}
					</p>
					{#if searchQuery || dateFilter || resultFilter}
						<button
							class="mt-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
							on:click={() => {
								searchQuery = '';
								dateFilter = '';
								resultFilter = '';
								applyFilters();
							}}
						>
							Clear All Filters
						</button>
					{:else}
						<button
							class="mt-4 rounded-md bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#164639]"
						>
							Scan Medication
						</button>
					{/if}
				</div>
			</div>

			<!-- Content -->
		{:else}
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
				{#if viewMode === 'table'}
					<div in:fade={{ duration: 200, delay: 100 }}>
						<VerificationTable verifications={paginatedVerifications} />
					</div>
				{:else}
					<div class="p-4" in:fade={{ duration: 200, delay: 100 }}>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each paginatedVerifications as verification}
								<div
									in:fade={{
										duration: 200,
										delay: 100 + 100 * (paginatedVerifications.indexOf(verification) % 3)
									}}
								>
									<VerificationCard {verification} />
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Pagination -->
		{#if totalPages > 1 && filteredVerifications.length > 0}
			<div class="mt-6">
				<Pagination {currentPage} {totalPages} on:pageChange={handlePageChange} />
			</div>
		{/if}
	</div>
</div>

<style>
	/* Loading spinner animation */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
