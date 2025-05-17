<script lang="ts">
  import { goto } from '$app/navigation';

  function navigateToSingleScan() {
    goto('/pharmacy/scan');
  }
  
  function navigateToCameraScan() {
    goto('/pharmacy/camera-scan');
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h3 class="font-semibold text-[#1a5f4a] mb-4">Quick Scan</h3>
  
  <div class="space-y-3">
    <button 
      on:click={navigateToSingleScan}
      class="w-full py-3 px-4 bg-[#1a5f4a] hover:bg-[#1a5f4a]/90 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Z" />
      </svg>
      Single Scan
    </button>
    
    <button 
      on:click={navigateToCameraScan}
      class="w-full py-3 px-4 bg-white border border-[#1a5f4a] text-[#1a5f4a] hover:bg-[#1a5f4a]/5 rounded-md font-medium transition-colors flex items-center justify-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
      Camera Scan
    </button>
  </div>
  
  <div class="mt-4">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-medium">Recent Searches</h4>
      <button class="text-xs text-[#0288d1]">Clear</button>
    </div>
    <div class="mt-2 flex flex-wrap gap-2">
      <button class="px-3 py-1 bg-[#607d8b]/10 hover:bg-[#607d8b]/20 rounded-full text-xs text-[#607d8b] transition-colors">
        Amoxicillin
      </button>
      <button class="px-3 py-1 bg-[#607d8b]/10 hover:bg-[#607d8b]/20 rounded-full text-xs text-[#607d8b] transition-colors">
        Lipitor
      </button>
      <button class="px-3 py-1 bg-[#607d8b]/10 hover:bg-[#607d8b]/20 rounded-full text-xs text-[#607d8b] transition-colors">
        Metformin
      </button>
    </div>
  </div>
</div>