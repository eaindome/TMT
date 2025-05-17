<!-- TrendGraphs.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let selectedView = 'region';
  
  // Mock data for charts - in a real app you'd fetch this from your API
  const regionData = [
    { name: 'Eastern', reports: 42, lastWeek: 38 },
    { name: 'Western', reports: 28, lastWeek: 23 },
    { name: 'Northern', reports: 19, lastWeek: 21 },
    { name: 'Southern', reports: 35, lastWeek: 30 },
    { name: 'Central', reports: 15, lastWeek: 12 }
  ];
  
  const typeData = [
    { name: 'Antibiotics', reports: 37, lastWeek: 32 },
    { name: 'Painkillers', reports: 42, lastWeek: 38 },
    { name: 'Cardiovascular', reports: 23, lastWeek: 25 },
    { name: 'Antidiabetics', reports: 18, lastWeek: 15 },
    { name: 'Others', reports: 19, lastWeek: 14 }
  ];
  
  $: chartData = selectedView === 'region' ? regionData : typeData;
  
  // Find the item with the biggest increase from last week
  $: alertItem = chartData.reduce((prev, current) => {
    const prevIncrease = prev.reports - prev.lastWeek;
    const currentIncrease = current.reports - current.lastWeek;
    return currentIncrease > prevIncrease ? current : prev;
  }, chartData[0]);
  
  $: alertIncrease = alertItem.reports - alertItem.lastWeek;
  $: alertPercentage = Math.round((alertIncrease / alertItem.lastWeek) * 100);
  
  onMount(() => {
    // In a real application, this is where you'd initialize
    // a chart library like Chart.js or D3.js
    
    // For now we're using a simplified representation with divs
    console.log("Trend graphs mounted");
  });
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-lg font-bold text-gray-800">Counterfeit Trends</h2>
        <p class="text-sm text-gray-500">30-day overview with spike detection</p>
      </div>
      
      <div class="flex space-x-2">
        <button 
          class={`px-3 py-1 rounded text-sm ${selectedView === 'region' ? 'bg-[#1a5f4a] text-white' : 'border text-gray-600'}`}
          on:click={() => selectedView = 'region'}>
          By Region
        </button>
        <button 
          class={`px-3 py-1 rounded text-sm ${selectedView === 'type' ? 'bg-[#1a5f4a] text-white' : 'border text-gray-600'}`}
          on:click={() => selectedView = 'type'}>
          By Drug Type
        </button>
      </div>
    </div>
  </div>
  
  <div class="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Chart would go here - using simplified visualization -->
    <div class="lg:col-span-2">
      <div class="h-64 flex items-end space-x-2">
        {#each chartData as item}
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full group relative">
              <div class="tooltip opacity-0 group-hover:opacity-100 absolute -top-8 left-0 right-0 text-xs bg-gray-800 text-white p-1 rounded text-center transition-opacity">
                {item.reports} reports ({item.reports - item.lastWeek >= 0 ? '+' : ''}{item.reports - item.lastWeek} from last week)
              </div>
              <div class="bg-[#1a5f4a] bg-opacity-80 hover:bg-opacity-100 transition-all rounded-t w-full" style="height: {(item.reports / 50) * 100}%"></div>
            </div>
            <span class="text-xs mt-1 text-gray-600 truncate w-full text-center">{item.name}</span>
          </div>
        {/each}
      </div>
      <div class="mt-4">
        <div class="h-1 w-full bg-gray-200 rounded"></div>
        <div class="flex justify-between mt-1 text-xs text-gray-500">
          <span>April 17</span>
          <span>May 17 (Today)</span>
        </div>
      </div>
    </div>
    
    <!-- Spike Alert Panel -->
    <div class="bg-[#d32f2f] bg-opacity-10 rounded-lg p-4">
      <div class="flex items-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#d32f2f] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <h3 class="font-bold text-[#d32f2f]">Spike Detected</h3>
      </div>
      
      <p class="text-sm mb-3">
        <span class="font-medium">{alertItem.name}</span> has shown a significant 
        increase of <span class="font-medium">{alertIncrease} reports</span> 
        ({alertPercentage}%) compared to last week.
      </p>
      
      <div class="bg-white rounded p-3 text-sm">
        <h4 class="font-medium mb-1">Recommended Action:</h4>
        <p class="text-gray-600 text-xs">
          Consider initiating an investigation in this {selectedView === 'region' ? 'region' : 'category'} 
          to identify potential distribution channels for counterfeit products.
        </p>
      </div>
      
      <button class="w-full mt-3 bg-[#1a5f4a] text-white py-2 rounded text-sm hover:bg-opacity-90 transition-colors">
        View Detailed Analysis
      </button>
    </div>
  </div>
</div>