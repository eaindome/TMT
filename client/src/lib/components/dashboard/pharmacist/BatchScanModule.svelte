<script lang="ts">
  import { goto } from '$app/navigation';
  import { formatDistanceToNow } from 'date-fns';

  export let lastBatch: {
    totalScanned: number;
    successCount: number;
    errorCount: number;
    timestamp: string;
  };
  
  $: successRate = (lastBatch.successCount / lastBatch.totalScanned) * 100;
  $: timeAgo = formatDistanceToNow(new Date(lastBatch.timestamp), { addSuffix: true });
  
  function navigateToBatchScan() {
    goto('/pharmacy/batch-scan');
  }
  
  function navigateToUploadCSV() {
    goto('/pharmacy/upload-csv');
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h3 class="font-semibold text-[#1a5f4a] mb-4">Batch Verification</h3>
  
  <div class="space-y-3">
    <button 
      on:click={navigateToBatchScan}
      class="w-full py-3 px-4 bg-[#1a5f4a] hover:bg-[#1a5f4a]/90 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
      Scan Multiple
    </button>
    
    <button 
      on:click={navigateToUploadCSV}
      class="w-full py-3 px-4 bg-white border border-[#1a5f4a] text-[#1a5f4a] hover:bg-[#1a5f4a]/5 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
      Upload CSV
    </button>
  </div>
  
  {#if lastBatch.totalScanned > 0}
    <div class="mt-4 pt-4 border-t border-[#607d8b]/10">
      <h4 class="text-sm font-medium mb-2">Last Batch Result</h4>
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs text-[#607d8b]">Success Rate</span>
        <span class="text-xs font-medium">{successRate.toFixed(0)}%</span>
      </div>
      <div class="w-full h-2 bg-[#607d8b]/10 rounded-full overflow-hidden mb-3">
        <div 
          class={`h-full ${successRate >= 90 ? "bg-[#4caf50]" : successRate >= 70 ? "bg-[#f4b400]" : "bg-[#d32f2f]"}`} 
          style="width: {successRate}%"
        ></div>
      </div>
      <div class="flex justify-between text-xs">
        <div>
          <span class="text-[#607d8b]">Total:</span>
          <span class="font-medium">{lastBatch.totalScanned}</span>
        </div>
        <div>
          <span class="text-[#4caf50]">{lastBatch.successCount} verified</span>
          <span class="mx-1">•</span>
          <span class="text-[#d32f2f]">{lastBatch.errorCount} issues</span>
        </div>
      </div>
      <div class="mt-2 text-xs text-right text-[#607d8b]">{timeAgo}</div>
    </div>
  {/if}
</div>