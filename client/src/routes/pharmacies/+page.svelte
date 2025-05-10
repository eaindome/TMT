<script lang="ts">
	import { findPharmacies } from '$lib/api/pharmacies';
	import { toasts } from '$lib/stores/toasts';
	import Map from '$lib/components/Map.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { onMount } from 'svelte';

	type Pharmacy = {
		id: string;
		lat: number;
		lng: number;
		name: string;
		address: string;
		trustScore?: number;
		verified?: boolean;
	};

	let pharmacies: Pharmacy[] = [];
	let center = { lat: 40.7128, lng: -74.006 };
	let error = '';
	let loading = true;
	let locationLoading = true;

	onMount(async () => {
		if ('geolocation' in navigator) {
			try {
				locationLoading = true;
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						center = { lat: position.coords.latitude, lng: position.coords.longitude };
						locationLoading = false;
						await fetchPharmacies();
					},
					(err) => {
						locationLoading = false;
						toasts.info('Using default location. Enable location services for better results.');
						fetchPharmacies();
					},
					{ timeout: 10000 }
				);
			} catch (err) {
				locationLoading = false;
				fetchPharmacies();
			}
		} else {
			locationLoading = false;
			await fetchPharmacies();
		}
	});

	async function fetchPharmacies() {
		loading = true;
		error = '';

		try {
			pharmacies = (await findPharmacies(center.lat, center.lng)).map((pharmacy) => ({
				id: pharmacy.id,
				lat: pharmacy.latitude,
				lng: pharmacy.longitude,
				name: pharmacy.name,
				address: pharmacy.address,
				trustScore: pharmacy.trustScore || 0,
				verified: pharmacy.verified || false
			}));

			if (pharmacies.length === 0) {
				toasts.info('No pharmacies found in this area. Try a different location.');
			} else {
				toasts.success(`Found ${pharmacies.length} pharmacies near you`);
			}
		} catch (err) {
			error = (err as Error).message;
			toasts.error('Failed to load pharmacies');
		} finally {
			loading = false;
		}
	}

	function handleRefresh() {
		fetchPharmacies();
	}
</script>

<Card padding="lg" shadow="md">
	<div class="mb-4 flex items-center justify-between">
		<h1 class="text-trust-green text-2xl font-bold">Find Trusted Pharmacies</h1>
		<Button
			variant="outline"
			on:click={handleRefresh}
			disabled={loading || locationLoading}
			{loading}
			size="sm"
		>
			Refresh
		</Button>
	</div>

	{#if locationLoading}
		<div class="mb-4 rounded-md bg-blue-50 p-3">
			<p class="flex items-center text-sm text-blue-700">
				<svg
					class="mr-2 h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Detecting your location...
			</p>
		</div>
	{/if}

	{#if error}
		<Alert message={error} type="error" className="mb-4" />
	{/if}

	{#if loading && !locationLoading}
		<!-- Map skeleton -->
		<Skeleton height="400px" width="100%" rounded="md" className="mb-4" />
	{:else}
		<Map
			apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
			height="400px"
			bind:center
			markers={pharmacies.map((pharmacy) => ({
				id: pharmacy.id,
				position: { lat: pharmacy.lat, lng: pharmacy.lng },
				title: pharmacy.name,
				info: `${pharmacy.address}<br>Trust Score: ${pharmacy.trustScore}`,
				verified: pharmacy.verified
			}))}
		/>
	{/if}

	<div class="mt-6 space-y-4">
		{#if loading}
			{#each Array(3) as _}
				<div class="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
					<Skeleton height="1.25rem" width="60%" className="mb-2" />
					<Skeleton height="0.875rem" width="80%" className="mb-1" />
					<Skeleton height="0.875rem" width="40%" className="mb-3" />
					<Skeleton height="2.25rem" width="40%" rounded="md" />
				</div>
			{/each}
		{:else if pharmacies.length > 0}
			{#each pharmacies as pharmacy}
				<Card padding="md" shadow="sm" border>
					<h3 class="text-trust-green text-lg font-medium">
						{pharmacy.name}
						{#if pharmacy.verified}
							<span class="bg-success-green ml-2 rounded-full px-2 py-0.5 text-xs text-white"
								>Verified</span
							>
						{/if}
					</h3>
					<p class="text-neutral-gray text-sm">{pharmacy.address}</p>
					<p class="text-neutral-gray mb-2 text-sm">Trust Score: {pharmacy.trustScore}</p>
					<Button
						variant="outline"
						href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`}
						target="_blank"
					>
						Get Directions
					</Button>
				</Card>
			{/each}
		{:else if !loading}
			<div class="py-8 text-center">
				<p class="text-neutral-gray mb-2">No pharmacies found in this area.</p>
				<Button variant="primary" on:click={handleRefresh}>Try Again</Button>
			</div>
		{/if}
	</div>
</Card>
