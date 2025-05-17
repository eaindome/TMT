<script lang="ts">
  import { onMount } from 'svelte';
  
  // Mock data for flagged cases
  let flaggedCases = [
    {
      id: "FC-2025-1042",
      drugName: "Amoxicillin 500mg",
      manufacturer: "MediPharm Ltd",
      scanSource: "Eastern Regional Hospital",
      scanDate: "May 15, 2025",
      status: "New",
      severity: "high"
    },
    {
      id: "FC-2025-1039",
      drugName: "Lipitor 20mg",
      manufacturer: "Generic Pharma Co.",
      scanSource: "Community Pharmacy #124",
      scanDate: "May 14, 2025",
      status: "Under Review",
      severity: "medium"
    },
    {
      id: "FC-2025-1036",
      drugName: "Metformin 850mg",
      manufacturer: "HealthGen Solutions",
      scanSource: "Diabetes Clinic, Northern District",
      scanDate: "May 14, 2025",
      status: "New",
      severity: "high"
    },
    {
      id: "FC-2025-1029",
      drugName: "Amlodipine 5mg",
      manufacturer: "CardioMed Pharma",
      scanSource: "Central District Health Office",
      scanDate: "May 12, 2025",
      status: "Under Review",
      severity: "medium"
    },
    {
      id: "FC-2025-1024",
      drugName: "Paracetamol 500mg",
      manufacturer: "MediRelief Inc.",
      scanSource: "Western Regional Hospital",
      scanDate: "May 10, 2025",
      status: "Escalated",
      severity: "high"
    }
  ];
  
  let filterStatus = "all";
  let searchQuery = "";
  
  $: filteredCases = flaggedCases
    .filter(caseItem => {
      if (filterStatus === "all") return true;
      return caseItem.status.toLowerCase() === filterStatus.toLowerCase();
    })
    .filter(caseItem => {
      if (!searchQuery) return true;
      return caseItem.drugName.toLowerCase().includes(searchQuery.toLowerCase()) || 
             caseItem.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
             caseItem.id.toLowerCase().includes(searchQuery.toLowerCase());
    });
  
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
  
  function getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'new':
        return 'text-[#0288d1]';
      case 'under review':
        return 'text-[#f4b400]';
      case 'escalated':
        return 'text-[#d32f2f]';
      case 'resolved':
        return 'text-[#4caf50]';
      default:
        return 'text-gray-500';
    }
  }
  
  function getStatusBgColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-[#0288d1] bg-opacity-10';
      case 'under review':
        return 'bg-[#f4b400] bg-opacity-10';
      case 'escalated':
        return 'bg-[#d32f2f] bg-opacity-10';
      case 'resolved':
        return 'bg-[#4caf50] bg-opacity-10';
      default:
        return 'bg-gray-100';
    }
  }
  
  onMount(() => {
    // Fetch real flagged cases data
  });
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-lg font-bold text-gray-800">Flagged Cases</h2>
        <p class="text-sm text-gray-500">Review and manage reported counterfeit medicines</p>
      </div>
      
      <div class="flex space-x-2">
        <div class="relative">
          <input 
            type="text" 
            bind:value={searchQuery}
            placeholder="Search cases..." 
            class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a5f4a] w-48"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute right-2 top-1.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <select 
          bind:value={filterStatus}
          class="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a5f4a]"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="under review">Under Review</option>
          <option value="escalated">Escalated</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  </div>
  
  <div class="overflow-x-auto">
    <table class="min-w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scan Source</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {#each filteredCases as caseItem}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3 whitespace-nowrap">
              <div class="flex items-center">
                <div class={`w-2 h-2 rounded-full mr-2 ${getSeverityColor(caseItem.severity)}`}></div>
                <span class="text-sm font-medium text-gray-900">{caseItem.id}</span>
              </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{caseItem.drugName}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{caseItem.manufacturer}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{caseItem.scanSource}</td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{caseItem.scanDate}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <span class={`inline-flex text-xs px-2 py-1 rounded-full ${getStatusBgColor(caseItem.status)} ${getStatusColor(caseItem.status)}`}>
                {caseItem.status}
              </span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm">
              <button class="text-[#1a5f4a] hover:text-opacity-80 font-medium">
                Review Details
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    
    {#if filteredCases.length === 0}
      <div class="py-6 text-center text-gray-500">
        No flagged cases match your criteria
      </div>
    {/if}
  </div>
  
  <div class="p-4 border-t flex justify-between items-center text-sm text-gray-600">
    <div>Showing {filteredCases.length} of {flaggedCases.length} total cases</div>
    <div class="flex space-x-2">
      <button class="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
      <button class="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
    </div>
  </div>
</div>