<script lang="ts">
  import type { Verification } from '$lib/types/history.ts';
  import Icon from '$lib/components/ui/Icon.svelte';

  export let verification: Verification;

  // Format date string for display
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Get status color class based on verification status
  function getStatusConfig(status: string) {
    switch (status.toLowerCase()) {
      case 'safe':
        return {
          dotColor: 'bg-green-600',
          textColor: 'text-green-700',
          borderColor: 'border-l-green-600',
          label: 'Safe'
        };
      case 'caution':
        return {
          dotColor: 'bg-amber-500',
          textColor: 'text-amber-700',
          borderColor: 'border-l-amber-500',
          label: 'Caution'
        };
      case 'fake':
        return {
          dotColor: 'bg-red-600',
          textColor: 'text-red-700',
          borderColor: 'border-l-red-600',
          label: 'Fake'
        };
      default:
        return {
          dotColor: 'bg-gray-400',
          textColor: 'text-gray-700',
          borderColor: 'border-l-gray-400',
          label: 'Unknown'
        };
    }
  }

  function handleViewResult(id: string) {
    // This would navigate to the medicine detail page
    console.log(`Viewing result for verification ${id}`);
    // In a real implementation, you would use SvelteKit's navigation:
    // goto(`/medicine/${id}`);
  }

  // Get status config
  $: statusConfig = getStatusConfig(verification.status);

  // Time ago calculation
  function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(months / 12);
    return `${years}y ago`;
  }
</script>

<div
  class="group relative flex flex-col rounded-md border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-1px] overflow-hidden {statusConfig.borderColor} border-l-2"
>
  <!-- Card content -->
  <div class="p-4 flex-grow">
    <!-- Header with drug name and badge -->
    <div class="flex items-start justify-between gap-3 mb-3">
      <h3 class="text-base font-medium text-gray-900 line-clamp-1">
        {verification.drugName}
      </h3>
      
      <div class="flex items-center gap-1.5 text-xs font-medium {statusConfig.textColor}">
        <div class="h-1.5 w-1.5 rounded-full {statusConfig.dotColor}"></div>
        {statusConfig.label}
      </div>
    </div>
    
    <!-- Manufacturer and time -->
    <div class="flex items-center text-xs text-gray-500 mb-4">
      <span>{verification.manufacturer}</span>
      <span class="mx-1.5">•</span>
      <span>{timeAgo(verification.timestamp)}</span>
    </div>

    <!-- Details -->
    <div class="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
      <div>
        <div class="text-xs text-gray-500 mb-0.5">Batch Number</div>
        <div class="font-mono font-medium text-gray-800">{verification.batchNumber}</div>
      </div>
      
      <div>
        <div class="text-xs text-gray-500 mb-0.5">Scanned On</div>
        <div class="text-gray-800">{formatDate(verification.timestamp)}</div>
      </div>
    </div>
  </div>

  <!-- Action bar with bottom border -->
  <div class="flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
    <button
      class="text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
      on:click={() => console.log('Show history for', verification.drugName)}
    >
      History
    </button>
    
    <button
      class="rounded-md border border-[#1a5f4a] px-3 py-1 text-xs font-medium text-[#1a5f4a] hover:bg-[#1a5f4a] hover:text-white transition-colors"
      on:click={() => handleViewResult(verification.id)}
    >
      View Details
    </button>
  </div>
</div>

<style>
  /* Truncate long text with ellipsis */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Better monospace font for batch numbers */
  .font-mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }
</style>
