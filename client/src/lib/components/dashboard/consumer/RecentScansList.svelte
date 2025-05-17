<script lang="ts">
  import StatusBadge from './StatusBadge.svelte';
  import { formatDistanceToNow } from 'date-fns';
  
  export let scans: {
    id: string;
    status: 'Safe' | 'Caution' | 'Fake';
    drugName: string;
    date: string;
  }[];
  
  function formatTime(dateString: string): string {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }
</script>

{#if scans.length === 0}
  <div class="text-center py-6 text-[#607d8b]">
    <p>No scan history yet.</p>
  </div>
{:else}
  <ul class="divide-y divide-[#607d8b]/10">
    {#each scans as scan (scan.id)}
      <li class="py-3 first:pt-0 last:pb-0">
        <a href={`/medicine/${encodeURIComponent(scan.drugName)}`} class="flex items-center justify-between hover:bg-[#f5f5f5] p-2 -mx-2 rounded-md transition-colors">
          <div class="flex items-center gap-3">
            <StatusBadge status={scan.status} />
            <span class="font-medium">{scan.drugName}</span>
          </div>
          <span class="text-xs text-[#607d8b]">{formatTime(scan.date)}</span>
        </a>
      </li>
    {/each}
  </ul>
{/if}