<script lang="ts">
  import { onMount } from 'svelte';
  
  // Mock data for notifications
  let notifications = [
    {
      id: 1,
      type: "alert",
      title: "Emergency Alert: Counterfeit Amoxicillin",
      message: "Large batch of fake Amoxicillin 500mg detected in Eastern Region. All regulators should increase vigilance.",
      time: "2 hours ago",
      isRead: false
    },
    {
      id: 2,
      type: "info",
      title: "API Update: New QR Code Format",
      message: "The Med-Verify API now supports the latest pharmaceutical QR code format. Update your scanners for improved accuracy.",
      time: "Yesterday",
      isRead: true
    },
    {
      id: 3,
      type: "regulation",
      title: "New Regulation: Serialization Requirements",
      message: "Starting June 1, all pharmaceutical manufacturers must implement serialization codes on packaging.",
      time: "2 days ago",
      isRead: true
    },
    {
      id: 4,
      type: "tip",
      title: "Detection Tip: Hologram Verification",
      message: "New guide available for identifying counterfeit holograms on common antibiotics packaging.",
      time: "3 days ago",
      isRead: false
    },
    {
      id: 5,
      type: "alert",
      title: "Supply Chain Disruption",
      message: "Potential increase in counterfeits due to supply chain disruption in Southeast manufacturing hubs.",
      time: "1 week ago",
      isRead: true
    }
  ];
  
  function getTypeIcon(type: string): string {
    switch (type) {
      case 'alert':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#d32f2f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>`;
      case 'info':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#0288d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>`;
      case 'regulation':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#607d8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>`;
      case 'tip':
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#4caf50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>`;
      default:
        return `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>`;
    }
  }
  
  function markAllAsRead() {
    notifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
  }
  
  function getTypeBgColor(type: string): string {
    switch (type) {
      case 'alert':
        return 'bg-[#d32f2f] bg-opacity-10';
      case 'info':
        return 'bg-[#0288d1] bg-opacity-10';
      case 'regulation':
        return 'bg-[#607d8b] bg-opacity-10';
      case 'tip':
        return 'bg-[#4caf50] bg-opacity-10';
      default:
        return 'bg-gray-100';
    }
  }
  
  onMount(() => {
    // Fetch real notification data
  });
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex justify-between items-center">
    <div>
      <h2 class="text-lg font-bold text-gray-800">Notifications</h2>
      <p class="text-sm text-gray-500">Tips, alerts, and regulation updates</p>
    </div>
    <button on:click={markAllAsRead} class="text-sm text-[#1a5f4a] hover:underline">
      Mark all as read
    </button>
  </div>
  
  <div class="p-2 max-h-96 overflow-y-auto">
    {#each notifications as notification}
      <div class={`p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${!notification.isRead ? 'bg-[#1a5f4a] bg-opacity-5' : ''}`}>
        <div class="flex">
          <div class={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getTypeBgColor(notification.type)}`}>
            {@html getTypeIcon(notification.type)}
          </div>
          <div class="flex-1">
            <div class="flex justify-between">
              <h3 class="text-sm font-medium">{notification.title}</h3>
              <span class="text-xs text-gray-500">{notification.time}</span>
            </div>
            <p class="text-xs text-gray-600 mt-1">{notification.message}</p>
          </div>
        </div>
        {#if !notification.isRead}
          <div class="ml-11 mt-2">
            <div class="h-2 w-2 rounded-full bg-[#1a5f4a]"></div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
  
  <div class="p-3 border-t text-center">
    <button class="text-sm text-[#0288d1] hover:underline">
      View All Notifications
    </button>
  </div>
</div>