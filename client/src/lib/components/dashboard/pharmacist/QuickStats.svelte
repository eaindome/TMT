<script lang="ts">
  export let stats: {
    todayScans: number;
    weeklyScans: number;
    flaggedCount: number;
  };
  
  // Calculate week-over-week trend (mock data, in a real app this would come from the backend)
  const previousWeekScans = 120; // Mock value for example
  const weeklyTrend = ((stats.weeklyScans - previousWeekScans) / previousWeekScans) * 100;
  const trendIsPositive = weeklyTrend >= 0;
</script>

<div class="bg-white rounded-lg shadow-md p-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-lg font-semibold text-[#1a5f4a]">Quick Stats</h2>
    <a href="/pharmacy/analytics" class="text-[#0288d1] text-sm font-medium hover:underline">Full Analytics</a>
  </div>
  
  <div class="grid grid-cols-1 gap-4">
    <!-- Today's Scans -->
    <div class="flex items-center justify-between p-3 bg-[#1a5f4a]/5 rounded-lg">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-[#1a5f4a]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#1a5f4a]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <div>
          <p class="text-[#607d8b] text-sm">Today's Scans</p>
          <p class="font-semibold text-xl">{stats.todayScans}</p>
        </div>
      </div>
      <span class="text-xs px-2 py-1 rounded-full bg-[#1a5f4a]/10 text-[#1a5f4a]">Today</span>
    </div>
    
    <!-- Weekly Scans -->
    <div class="flex items-center justify-between p-3 bg-[#0288d1]/5 rounded-lg">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-[#0288d1]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#0288d1]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
        </div>
        <div>
          <p class="text-[#607d8b] text-sm">Last 7 Days</p>
          <div class="flex items-center gap-2">
            <p class="font-semibold text-xl">{stats.weeklyScans}</p>
            <span class={`text-xs flex items-center ${trendIsPositive ? 'text-[#4caf50]' : 'text-[#d32f2f]'}`}>
              {#if trendIsPositive}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 mr-0.5">
                  <path fill-rule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z" clip-rule="evenodd" />
                </svg>
              {:else}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 mr-0.5">
                  <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                </svg>
              {/if}
              {Math.abs(weeklyTrend).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      <span class="text-xs px-2 py-1 rounded-full bg-[#0288d1]/10 text-[#0288d1]">Weekly</span>
    </div>
    
    <!-- Flagged Medicines -->
    <div class="flex items-center justify-between p-3 bg-[#d32f2f]/5 rounded-lg">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-full bg-[#d32f2f]/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-[#d32f2f]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div>
          <p class="text-[#607d8b] text-sm">Flagged Medicines</p>
          <p class="font-semibold text-xl">{stats.flaggedCount}</p>
        </div>
      </div>
      <a href="/pharmacy/flags" class="text-xs px-2 py-1 rounded-full bg-[#d32f2f]/10 text-[#d32f2f] hover:bg-[#d32f2f]/20 transition-colors">
        View All
      </a>
    </div>
  </div>
  
  <div class="mt-4 pt-4 border-t border-[#607d8b]/10">
    <a href="/pharmacy/reports" class="flex items-center justify-center text-[#0288d1] text-sm font-medium hover:underline">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Download Monthly Report
    </a>
  </div>
</div>