<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let apiKey: string = '';
	export let height: string = '400px';
	export let zoom: number = 13;
	export let center: { lat: number; lng: number } = { lat: 40.7128, lng: -74.006 }; // Default: NYC
	export let markers: Array<{
		id: string;
		position: { lat: number; lng: number };
		title: string;
		info?: string;
		verified?: boolean;
	}> = [];
	export let interactive: boolean = true;
	export let showControls: boolean = true;

	let mapContainer: HTMLElement;
	let map: any;
	let mapMarkers: any[] = [];
	let infoWindow: any;
	let googleMapsLoaded = false;

	onMount(() => {
		if (!apiKey) {
			console.error('Google Maps API key is required');
			return;
		}

		loadGoogleMaps();
	});

	onDestroy(() => {
		if (map) {
			// Cleanup resources if needed
			mapMarkers = [];
			map = null;
		}
	});

	function loadGoogleMaps() {
		if (typeof window === 'undefined') return;

		// Check if Google Maps is already loaded
		if (window.google && window.google.maps) {
			googleMapsLoaded = true;
			initMap();
			return;
		}

		// Load Google Maps API
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
		script.async = true;
		script.defer = true;
		script.onload = () => {
			googleMapsLoaded = true;
			initMap();
		};
		document.head.appendChild(script);
	}

	function initMap() {
		if (!googleMapsLoaded || !mapContainer) return;

		const mapOptions = {
			zoom,
			center,
			disableDefaultUI: !showControls,
			gestureHandling: interactive ? 'auto' : 'none',
			styles: [
				{
					featureType: 'poi.business',
					stylers: [{ visibility: 'on' }]
				},
				{
					featureType: 'poi',
					elementType: 'labels.icon',
					stylers: [{ color: '#1a5f4a' }]
				}
			]
		};

		// Create map
		map = new google.maps.Map(mapContainer, mapOptions);
		infoWindow = new google.maps.InfoWindow();

		// Add markers
		addMarkers();

		// Dispatch event when map is ready
		dispatchEvent(new CustomEvent('mapready', { detail: { map } }));
	}

	function addMarkers() {
		if (!map) return;

		// Clear existing markers
		mapMarkers.forEach((marker) => marker.setMap(null));
		mapMarkers = [];

		// Add new markers
		markers.forEach((markerData) => {
			const markerOptions = {
				position: markerData.position,
				map,
				title: markerData.title,
				icon: markerData.verified
					? {
							path: google.maps.SymbolPath.CIRCLE,
							fillColor: '#4caf50',
							fillOpacity: 1,
							strokeColor: '#ffffff',
							strokeWeight: 2,
							scale: 8
						}
					: undefined
			};

			const marker = new google.maps.Marker(markerOptions);

			if (markerData.info) {
				marker.addListener('click', () => {
					infoWindow.setContent(`
              <div class="p-2">
                <h3 class="font-medium text-[#1a5f4a]">${markerData.title}</h3>
                <p>${markerData.info}</p>
                ${
									markerData.verified
										? '<span class="px-2 py-1 text-xs bg-[#4caf50] text-white rounded-full">Verified Pharmacy</span>'
										: ''
								}
              </div>
            `);
					infoWindow.open(map, marker);
				});
			}

			mapMarkers.push(marker);
		});

		// Fit bounds if multiple markers
		if (markers.length > 1) {
			const bounds = new google.maps.LatLngBounds();
			markers.forEach((marker) => bounds.extend(marker.position));
			map.fitBounds(bounds);
		}
	}

	$: if (map && markers) {
		addMarkers();
	}

	$: if (map && center) {
		map.setCenter(center);
	}

	$: if (map && zoom) {
		map.setZoom(zoom);
	}
</script>

<div
	bind:this={mapContainer}
	class="overflow-hidden rounded-lg border border-gray-200"
	style="height: {height}; width: 100%;"
>
	{#if !googleMapsLoaded}
		<div class="flex h-full w-full items-center justify-center bg-gray-100">
			<div class="text-center">
				<svg
					class="mx-auto h-10 w-10 animate-spin text-[#1a5f4a]"
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
				<p class="mt-2 text-gray-600">Loading map...</p>
			</div>
		</div>
	{/if}
</div>
