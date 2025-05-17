<!-- AlertFeed.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  // Mock data for alert feed
  let alerts = [
    {
      id: 1,
      drugName: "Amoxicillin 500mg",
      manufacturer: "PharmaCo Ltd",
      severity: "high",
      location: "Eastern District",
      timestamp: "2 hours ago",
      description: "Counterfeit batch detected with incorrect hologram"
    },
    {
      id: 2,
      drugName: "Lipitor 20mg",
      manufacturer: "HealthPharm Inc",
      severity: "medium",
      location: "Northern Region",
      timestamp: "5 hours ago",
      description: "Suspicious packaging reported by multiple pharmacies"
    },
    {
      id: 3,
      drugName: "Metformin 850mg",
      manufacturer: "MedGen Solutions",
      severity: "high",
      location: "Western District",
      timestamp: "Yesterday",
      description: "Chemical composition analysis failed verification"
    },
    {
      id: 4,
      drugName: "Amlodipine 5mg",
      manufacturer: "CardioMed Labs",
      severity: "medium",
      location: "Southern Region",
      timestamp: "Yesterday",
      description: "QR code links to unverified website"
    }
  ];
  
  function getSeverityColor(severity: string): string {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-[#d32f2f]';
      case 'medium':
        return 'bg-[#f4b400]';
      case 'low':
        return 'bg-[#607d8b]';
      default:
        return 'bg-[#607d8b]';
    }
  }
  
  onMount(() => {
    // Fetch real alert data
  });
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex justify-between items-center">
    <div>
      <h2 class="text-lg font-bold text-gray-800">Alert Feed</h2>
      <p class="text-sm text-gray-500">Recent flagged/fake medicines in the system</p>
    </div>
    <button class="bg-[#1a5f4a] text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors text-sm">
      View All Alerts
    </button>
  </div>
  
  <div class="p-4">
    <div class="space-y-4">
      {#each alerts as alert}
        <div class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
          <div class="flex justify-between">
            <div class="flex items-center">
              <div class={`w-3 h-3 rounded-full mr-2 ${getSeverityColor(alert.severity)}`}></div>
              <h3 class="font-medium">{alert.drugName}</h3>
            </div>
            <span class="text-xs text-gray-500">{alert.timestamp}</span>
          </div>
          
          <div class="mt-2">
            <p class="text-sm text-gray-700">{alert.description}</p>
            <div class="flex mt-2 text-xs text-gray-500">
              <span class="mr-4">Manufacturer: {alert.manufacturer}</span>
              <span>Location: {alert.location}</span>
            </div>
          </div>
          
          <div class="mt-3 flex space-x-2">
            <button class="px-3 py-1 bg-[#1a5f4a] text-white text-xs rounded hover:bg-opacity-90 transition-colors">
              View Case
            </button>
            <button class="px-3 py-1 border border-[#1a5f4a] text-[#1a5f4a] text-xs rounded hover:bg-[#1a5f4a] hover:bg-opacity-10 transition-colors">
              Take Action
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>