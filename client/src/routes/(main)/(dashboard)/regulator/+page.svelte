<!-- RegulatorDashboard.svelte -->
<script lang="ts">
  import AlertFeed from '$lib/components/dashboard/regulator/AlertFeed.svelte';
  import TrendGraphs from '$lib/components/dashboard/regulator/TrendGraphs.svelte';
  import FlaggedCasesTable from '$lib/components/dashboard/regulator/FlaggedCasesTable.svelte';
  import InventoryReports from '$lib/components/dashboard/regulator/InventoryReports.svelte';
  import NotificationFeed from '$lib/components/dashboard/regulator/NotificationFeed.svelte';
  import { onMount } from 'svelte';
  
  let username = "Dr. Johnson";
  let todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Placeholder data that would normally come from an API
  let alertCount = 12;
  let newFlaggedCases = 8;
  let regionsWithSpikes = 3;
  
  onMount(() => {
    // This is where you'd fetch data from your API
    console.log("Dashboard mounted");
  });
</script>

<div class="min-h-screen">
  <!-- Header -->
  <header class="bg-[#1a5f4a] text-white shadow-md">
    <div class="container mx-auto p-4 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Med-Verify</h1>
        <p class="text-sm opacity-80">Regulator Dashboard</p>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <p class="font-medium">Welcome, {username}</p>
          <p class="text-xs opacity-80">{todayDate}</p>
        </div>
        <div class="w-10 h-10 bg-[#607d8b] rounded-full flex items-center justify-center">
          <span class="text-white font-bold">DJ</span>
        </div>
      </div>
    </div>
  </header>
  
  <!-- Dashboard Overview Cards -->
  <div class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
      <div class="w-12 h-12 bg-[#d32f2f] bg-opacity-20 rounded-full flex items-center justify-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#d32f2f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-gray-500">Active Alerts</p>
        <p class="text-2xl font-bold">{alertCount}</p>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
      <div class="w-12 h-12 bg-[#f4b400] bg-opacity-20 rounded-full flex items-center justify-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#f4b400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-gray-500">New Flagged Cases</p>
        <p class="text-2xl font-bold">{newFlaggedCases}</p>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow p-4 flex items-center">
      <div class="w-12 h-12 bg-[#0288d1] bg-opacity-20 rounded-full flex items-center justify-center mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#0288d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-gray-500">Regions with Spikes</p>
        <p class="text-2xl font-bold">{regionsWithSpikes}</p>
      </div>
    </div>
  </div>
  
  <!-- Main Dashboard Content -->
  <div class="container mx-auto p-4 mt-2">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <AlertFeed />
        <TrendGraphs />
        <FlaggedCasesTable />
      </div>
      
      <!-- Right Column -->
      <div class="space-y-6">
        <InventoryReports />
        <NotificationFeed />
      </div>
    </div>
  </div>
</div>