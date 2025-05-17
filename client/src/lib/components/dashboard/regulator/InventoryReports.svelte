<script lang="ts">
  import { onMount } from 'svelte';
  
  // Mock data for inventory reports
  let topScannedDrugs = [
    { name: "Amoxicillin 500mg", scans: 1243, suspiciousRate: 8.2 },
    { name: "Lipitor 20mg", scans: 987, suspiciousRate: 5.4 },
    { name: "Metformin 850mg", scans: 865, suspiciousRate: 7.1 },
    { name: "Paracetamol 500mg", scans: 753, suspiciousRate: 2.3 },
    { name: "Amlodipine 5mg", scans: 642, suspiciousRate: 4.8 }
  ];
  
  let suspiciousLots = [
    { id: "LOT-2025-A4587", drug: "Amoxicillin 500mg", manufacturer: "MediPharm Ltd", alerts: 12 },
    { id: "LOT-2025-B7291", drug: "Lipitor 20mg", manufacturer: "Generic Pharma Co.", alerts: 8 },
    { id: "LOT-2025-C1234", drug: "Metformin 850mg", manufacturer: "HealthGen Solutions", alerts: 7 }
  ];
  
  let activeTab = "topScanned";
  
  onMount(() => {
    // Fetch real inventory data
  });
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-lg font-bold text-gray-800">Inventory Reports</h2>
    <p class="text-sm text-gray-500">Monitor frequently scanned and suspicious items</p>
    
    <div class="flex space-x-1 mt-3">
      <button 
        class={`px-3 py-1 text-sm rounded-t ${activeTab === 'topScanned' ? 'bg-[#1a5f4a] text-white' : 'bg-gray-100 text-gray-700'}`}
        on:click={() => activeTab = 'topScanned'}>
        Top Scanned
      </button>
      <button 
        class={`px-3 py-1 text-sm rounded-t ${activeTab === 'suspiciousLots' ? 'bg-[#1a5f4a] text-white' : 'bg-gray-100 text-gray-700'}`}
        on:click={() => activeTab = 'suspiciousLots'}>
        Suspicious Lots
      </button>
    </div>
  </div>
  
  <div class="p-4">
    {#if activeTab === 'topScanned'}
      <div class="space-y-3">
        {#each topScannedDrugs as drug, i}
          <div class="flex items-center">
            <div class="w-6 text-xs text-gray-500">{i+1}.</div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="text-sm font-medium">{drug.name}</span>
                <span class="text-sm text-gray-500">{drug.scans.toLocaleString()} scans</span>
              </div>
              <div class="mt-1 relative w-full h-2 bg-gray-200 rounded-full">
                <div 
                  class={`absolute left-0 top-0 h-2 rounded-full ${drug.suspiciousRate > 7 ? 'bg-[#d32f2f]' : drug.suspiciousRate > 5 ? 'bg-[#f4b400]' : 'bg-[#4caf50]'}`}
                  style={`width: ${drug.suspiciousRate * 3}%`}>
                </div>
              </div>
              <div class="flex justify-between mt-1">
                <span class="text-xs text-gray-500">Suspicious rate</span>
                <span class="text-xs font-medium ${drug.suspiciousRate > 7 ? 'text-[#d32f2f]' : drug.suspiciousRate > 5 ? 'text-[#f4b400]' : 'text-[#4caf50]'}">
                  {drug.suspiciousRate}%
                </span>
              </div>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="mt-4 text-center">
        <button class="text-sm text-[#0288d1] hover:underline">
          View Complete Report
        </button>
      </div>
    {:else if activeTab === 'suspiciousLots'}
      <div class="space-y-3">
        {#each suspiciousLots as lot}
          <div class="border rounded p-3 hover:bg-gray-50 transition-colors">
            <div class="flex justify-between">
              <span class="text-sm font-medium">{lot.id}</span>
              <span class="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-[#d32f2f] bg-opacity-10 text-[#d32f2f]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {lot.alerts} alerts
              </span>
            </div>
            <div class="mt-1">
              <p class="text-xs text-gray-500">{lot.drug} • {lot.manufacturer}</p>
            </div>
            <div class="mt-2">
              <button class="text-xs px-2 py-1 bg-[#1a5f4a] text-white rounded hover:bg-opacity-90 transition-colors">
                Track Lot
              </button>
            </div>
          </div>
        {/each}
      </div>
      
      <div class="mt-4 text-center">
        <button class="text-sm text-[#0288d1] hover:underline">
          View All Suspicious Lots
        </button>
      </div>
    {/if}
  </div>
</div>