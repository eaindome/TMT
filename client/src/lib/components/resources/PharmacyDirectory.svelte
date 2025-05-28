<!-- src/lib/components/resources/PharmacyDirectory.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  interface Pharmacy {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    type: 'online' | 'offline';
    verified: boolean;
    rating: number;
    phone?: string;
    website?: string;
  }

  let pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'MedTrust Pharmacy',
      address: '123 Health Street',
      city: 'Accra',
      country: 'Ghana',
      type: 'offline',
      verified: true,
      rating: 4.8,
      phone: '+233-XXX-XXXX'
    },
    {
      id: '2',
      name: 'CarePoint Online',
      address: 'Online Platform',
      city: 'Lagos',
      country: 'Nigeria',
      type: 'online',
      verified: true,
      rating: 4.6,
      website: 'carepoint.ng'
    },
    {
      id: '3',
      name: 'HealthHub Pharmacy',
      address: '456 Wellness Ave',
      city: 'Cape Town',
      country: 'South Africa',
      type: 'offline',
      verified: true,
      rating: 4.9,
      phone: '+27-XXX-XXXX'
    }
  ];

  let searchQuery = '';
  let selectedCountry = '';
  let selectedType = '';
  let filteredPharmacies: Pharmacy[] = [];

  $: {
    filteredPharmacies = pharmacies.filter(pharmacy => {
      const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pharmacy.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = !selectedCountry || pharmacy.country === selectedCountry;
      const matchesType = !selectedType || pharmacy.type === selectedType;
      
      return matchesSearch && matchesCountry && matchesType;
    });
  }

  const countries = [...new Set(pharmacies.map(p => p.country))];
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Trusted Pharmacy Directory</h2>
    <p class="text-gray-600 max-w-2xl mx-auto">
      Find verified pharmacies in your area. All listed pharmacies have been vetted for authenticity and quality standards.
    </p>
  </div>

  <!-- Search and Filters -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Search -->
      <div>
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          Search Pharmacies
        </label>
        <input
          id="search"
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name or city..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <!-- Country Filter -->
      <div>
        <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
          Country
        </label>
        <select
          id="country"
          bind:value={selectedCountry}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Countries</option>
          {#each countries as country}
            <option value={country}>{country}</option>
          {/each}
        </select>
      </div>

      <!-- Type Filter -->
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          id="type"
          bind:value={selectedType}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Types</option>
          <option value="offline">Physical Store</option>
          <option value="online">Online</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Results -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredPharmacies as pharmacy}
      <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{pharmacy.name}</h3>
            <div class="flex items-center mt-1">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {
                pharmacy.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }">
                {pharmacy.verified ? '✓ Verified' : 'Pending'}
              </span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 {
                pharmacy.type === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }">
                {pharmacy.type === 'online' ? '🌐 Online' : '🏪 Physical'}
              </span>
            </div>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center mb-4">
          <div class="flex text-yellow-400">
            {#each Array(5) as _, i}
              <svg
                class="w-4 h-4 {i < Math.floor(pharmacy.rating) ? 'text-yellow-400' : 'text-gray-300'}"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>
          <span class="ml-2 text-sm text-gray-600">{pharmacy.rating}</span>
        </div>

        <!-- Address -->
        <div class="text-gray-600 mb-4">
          <p class="text-sm">{pharmacy.address}</p>
          <p class="text-sm">{pharmacy.city}, {pharmacy.country}</p>
        </div>

        <!-- Contact Info -->
        <div class="space-y-2">
          {#if pharmacy.phone}
            <div class="flex items-center text-sm text-gray-600">
              <span class="mr-2">📞</span>
              <span>{pharmacy.phone}</span>
            </div>
          {/if}
          {#if pharmacy.website}
            <div class="flex items-center text-sm text-blue-600">
              <span class="mr-2">🌐</span>
              <a href="https://{pharmacy.website}" target="_blank" class="hover:underline">
                {pharmacy.website}
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if filteredPharmacies.length === 0}
    <div class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">🔍</div>
      <h3 class="text-xl font-medium text-gray-900 mb-2">No pharmacies found</h3>
      <p class="text-gray-600">Try adjusting your search criteria or filters.</p>
    </div>
  {/if}
</div>

<style>
  :global(.focus\:ring-primary-500:focus) {
    --tw-ring-color: #1a5f4a;
  }
  :global(.focus\:border-primary-500:focus) {
    --tw-border-opacity: 1;
    border-color: #1a5f4a;
  }
</style>