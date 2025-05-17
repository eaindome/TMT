<script lang="ts">
  import PharmacistWelcome from '$lib/components/dashboard/pharmacist/PharmacistWelcome.svelte';
  import QuickScanPanel from '$lib/components/dashboard/pharmacist/QuickScanPanel.svelte';
  import BatchScanModule from '$lib/components/dashboard/pharmacist/BatchScanModule.svelte';
  import FilteredHistoryPreview from '$lib/components/dashboard/pharmacist/FilteredHistoryPreview.svelte';
  import QuickStats from '$lib/components/dashboard/pharmacist/QuickStats.svelte';
  
  // Mock data for demonstration
  const doctorName = "Emily Chen";
  
  const lastBatch = {
    totalScanned: 24,
    successCount: 22,
    errorCount: 2,
    timestamp: new Date().toISOString(),
  };
  
  type ScanStatus = "Safe" | "Fake" | "Caution";
  type ScanHistoryItem = {
    id: string;
    status: ScanStatus;
    drugName: string;
    manufacturer: string;
    date: string;
  };

  const scanHistory: ScanHistoryItem[] = [
    {
      id: "scan-101",
      status: "Safe",
      drugName: "Amoxicillin 500mg",
      manufacturer: "PharmaCorp",
      date: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString() // 1 hour ago
    },
    {
      id: "scan-102",
      status: "Safe",
      drugName: "Lipitor 40mg",
      manufacturer: "MediPharma",
      date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() // 3 hours ago
    },
    {
      id: "scan-103",
      status: "Fake",
      drugName: "Xanax 1mg",
      manufacturer: "Unknown Source",
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
    },
    {
      id: "scan-104",
      status: "Caution",
      drugName: "Metformin 850mg",
      manufacturer: "GlobalMeds",
      date: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() // 8 hours ago
    },
    {
      id: "scan-105",
      status: "Safe",
      drugName: "Atorvastatin 20mg",
      manufacturer: "PharmaCorp",
      date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() // 12 hours ago
    }
  ];
  
  const quickStats = {
    todayScans: 18,
    weeklyScans: 134,
    flaggedCount: 3
  };
</script>

<div class="min-h-screen">
  <!-- Header -->
  <header class="bg-[#1a5f4a] max-w-[1103px] mx-auto text-white py-4 px-6 shadow-md rounded-lg">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold">Track My Meds</h1>
        <span class="bg-white/20 text-white text-xs px-2 py-0.5 rounded-md">Pharmacy</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <span class="hidden md:inline text-sm">Dr. {doctorName}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-6xl mx-auto p-4 md:p-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Column -->
      <div class="lg:col-span-8 space-y-6">
        <PharmacistWelcome doctorName={doctorName} />
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <QuickScanPanel />
          <BatchScanModule lastBatch={lastBatch} />
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-[#1a5f4a]">Recent Verifications</h2>
            <a href="/pharmacy/history" class="text-[#0288d1] text-sm font-medium hover:underline">Open Full History</a>
          </div>
          <FilteredHistoryPreview scans={scanHistory} />
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="lg:col-span-4 space-y-6">
        <QuickStats stats={quickStats} />
        
        <!-- <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-[#1a5f4a] mb-4">Recent Alerts</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-[#d32f2f]/10 flex items-center justify-center mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#d32f2f]">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium">Fake Xanax 1mg detected</p>
                <p class="text-xs text-[#607d8b] mt-1">Today at 12:45 PM</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-[#f4b400]/10 flex items-center justify-center mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#f4b400]">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium">Metformin batch verification needed</p>
                <p class="text-xs text-[#607d8b] mt-1">Today at 09:18 AM</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <div class="h-8 w-8 rounded-full bg-[#d32f2f]/10 flex items-center justify-center mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-[#d32f2f]">
                  <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="font-medium">Counterfeit supplier alert: GlobalMeds</p>
                <p class="text-xs text-[#607d8b] mt-1">Yesterday at 2:30 PM</p>
              </div>
            </li>
          </ul>
          <hr class="my-4 border-[#607d8b]/20" />
          <a href="/pharmacy/alerts" class="text-[#0288d1] text-sm font-medium hover:underline flex justify-center">
            View All Alerts
          </a>
        </div> -->
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-[#1a5f4a] mb-4">Verification Summary</h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#607d8b]">Verified Safe</span>
              <div class="flex items-center gap-2">
                <span class="font-semibold">92%</span>
                <div class="w-24 h-2 bg-[#607d8b]/10 rounded-full overflow-hidden">
                  <div class="bg-[#4caf50] h-full" style="width: 92%"></div>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#607d8b]">Needs Verification</span>
              <div class="flex items-center gap-2">
                <span class="font-semibold">6%</span>
                <div class="w-24 h-2 bg-[#607d8b]/10 rounded-full overflow-hidden">
                  <div class="bg-[#f4b400] h-full" style="width: 6%"></div>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-[#607d8b]">Flagged as Fake</span>
              <div class="flex items-center gap-2">
                <span class="font-semibold">2%</span>
                <div class="w-24 h-2 bg-[#607d8b]/10 rounded-full overflow-hidden">
                  <div class="bg-[#d32f2f] h-full" style="width: 2%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  
  <!-- Footer -->
  <footer class="bg-[#607d8b]/10 py-4 px-6 mt-12">
    <div class="max-w-6xl mx-auto text-center text-[#607d8b] text-sm">
      <p>© 2025 MediCheck Professional. All rights reserved.</p>
    </div>
  </footer>
</div>