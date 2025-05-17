<script lang="ts">
  export let scans: {
    id: string;
    status: "Safe" | "Fake" | "Caution";
    drugName: string;
    manufacturer: string;
    date: string;
  }[];
  
  let activeFilter: "All" | "Safe" | "Fake" | "Caution" = "All";
  
  $: filteredScans = activeFilter === "All" 
    ? scans 
    : scans.filter(scan => scan.status === activeFilter);
  
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `Today at ${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  
  function getStatusColor(status: string): string {
    switch(status) {
      case "Safe": return "bg-[#4caf50] text-white";
      case "Fake": return "bg-[#d32f2f] text-white";
      case "Caution": return "bg-[#f4b400] text-white";
      default: return "bg-[#607d8b] text-white";
    }
  }
</script>

<div>
  <div class="flex gap-2 mb-4 overflow-x-auto pb-2">
    <button 
      class={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === "All" ? "bg-[#1a5f4a] text-white" : "bg-[#607d8b]/10 text-[#607d8b] hover:bg-[#607d8b]/20"}`}
      on:click={() => activeFilter = "All"}>
      All
    </button>
    <button 
      class={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === "Safe" ? "bg-[#4caf50] text-white" : "bg-[#607d8b]/10 text-[#607d8b] hover:bg-[#607d8b]/20"}`}
      on:click={() => activeFilter = "Safe"}>
      Safe
    </button>
    <button 
      class={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === "Caution" ? "bg-[#f4b400] text-white" : "bg-[#607d8b]/10 text-[#607d8b] hover:bg-[#607d8b]/20"}`}
      on:click={() => activeFilter = "Caution"}>
      Caution
    </button>
    <button 
      class={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${activeFilter === "Fake" ? "bg-[#d32f2f] text-white" : "bg-[#607d8b]/10 text-[#607d8b] hover:bg-[#607d8b]/20"}`}
      on:click={() => activeFilter = "Fake"}>
      Fake
    </button>
  </div>
  
  {#if filteredScans.length === 0}
    <div class="text-center py-6 text-[#607d8b]">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mx-auto mb-2 text-[#607d8b]/50">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      <p>No verifications found with this filter</p>
    </div>
  {:else}
    <div class="divide-y divide-[#607d8b]/10">
      {#each filteredScans as scan}
        <div class="py-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class={`px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(scan.status)}`}>
              {scan.status}
            </span>
            <div>
              <p class="font-medium">{scan.drugName}</p>
              <p class="text-xs text-[#607d8b]">{scan.manufacturer}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-[#607d8b]">{formatDate(scan.date)}</p>
            <a href="/pharmacy/scan/{scan.id}" class="text-xs text-[#0288d1] hover:underline">
              View Details
            </a>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>