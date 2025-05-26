<script lang="ts">
  import WelcomeMessage from '$lib/components/dashboard/consumer/WelcomeMessage.svelte';
  import QuickScanButton from '$lib/components/dashboard/consumer/QuickScanButton.svelte';
  import LastScanResultCard from '$lib/components/dashboard/consumer/LastScanResultCard.svelte';
  import RecentScansList from '$lib/components/dashboard/consumer/RecentScansList.svelte';
  
  // Mock data for demonstration
  const userName = "Sarah";
  
  const lastScan: {
    status: "Safe" | "Caution" | "Fake";
    drugName: string;
    image: string;
    timestamp: string;
  } = {
    status: "Safe", // "Safe", "Caution", "Fake"
    drugName: "Paracetamol 500mg",
    image: "/images/paracetamol.jpg", // Replace with actual image path
    timestamp: new Date().toISOString(),
  };
  
  const recentScans: { id: string; status: "Safe" | "Caution" | "Fake"; drugName: string; date: string; }[] = [
    {
      id: "scan-001",
      status: "Safe",
      drugName: "Paracetamol 500mg",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
    },
    {
      id: "scan-002",
      status: "Caution",
      drugName: "Amoxicillin 250mg",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
    },
    {
      id: "scan-003",
      status: "Safe",
      drugName: "Vitamin C 1000mg",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
    },
    {
      id: "scan-004",
      status: "Fake",
      drugName: "Lipitor 20mg",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
    },
    {
      id: "scan-005",
      status: "Safe",
      drugName: "Ibuprofen 400mg",
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
    }
  ];
</script>

<div class="min-h-screen">
  <!-- Header -->
  <header class="bg-[#1a5f4a] max-w-[1103px] mx-auto text-white py-4 px-6 shadow-md rounded-lg">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Track My Meds</h1>
    </div>
  </header>

  <!-- Main Content -->
  <main class="max-w-6xl mx-auto p-4 md:p-6">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      <!-- Left Column -->
      <div class="lg:col-span-8 space-y-6">
        <WelcomeMessage userName={userName} />
        
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <QuickScanButton />
          </div>
          <div class="flex-1">
            <LastScanResultCard scan={lastScan} />
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold text-[#1a5f4a]">Recent Scans</h2>
            <a href="/history" class="text-[#0288d1] text-sm font-medium hover:underline">View Full History</a>
          </div>
          <RecentScansList scans={recentScans} />
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-[#1a5f4a] mb-4">Medicine Tips</h2>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Always check medicine seals before purchase</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Purchase medications only from licensed pharmacies</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Look for holographic stickers on packaging</span>
            </li>
          </ul>
          <hr class="my-4 border-[#607d8b]/20" />
          <p class="text-xs text-[#607d8b]">Remember: When in doubt, consult your healthcare provider.</p>
        </div>
        
        <!-- <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-[#1a5f4a] mb-4">Upgrade to Premium</h2>
          <ul class="space-y-3 text-sm mb-4">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0288d1] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Unlimited scan history</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0288d1] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Detailed medicine information</span>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0288d1] flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>Early access to new features</span>
            </li>
          </ul>
          <button class="w-full py-2 px-4 bg-[#0288d1] hover:bg-[#0288d1]/90 text-white rounded-md font-medium transition-colors">
            Upgrade Now
          </button>
        </div> -->
      </div>
    </div>
  </main>
</div>