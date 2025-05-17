<script lang="ts">
  import StatusBadge from './StatusBadge.svelte';
  import { formatDistanceToNow } from 'date-fns';

  export let scan: {
    status: 'Safe' | 'Caution' | 'Fake';
    drugName: string;
    image: string;
    timestamp: string;
  };

  $: timeAgo = formatDistanceToNow(new Date(scan.timestamp), { addSuffix: true });

  // Fallback image in case the provided one fails to load
  let fallbackImage = "/images/default-medicine.jpg";
  
  // Function to handle image loading errors
  function handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = fallbackImage;
    }
  }
  
  // Get background color based on status
  $: statusBg = scan.status === 'Safe' 
    ? 'bg-green-50' 
    : scan.status === 'Caution' 
      ? 'bg-amber-50' 
      : 'bg-red-50';
</script>

<div class="bg-white rounded-lg shadow-md h-64 overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
  <div class="p-4 border-b border-gray-100 flex justify-between items-center {statusBg}">
    <h3 class="font-semibold text-gray-800">Last Scan Result</h3>
    <StatusBadge status={scan.status} />
  </div>
  
  <div class="p-4">
    <div class="flex gap-4">
      <div class="w-22 h-22 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden shadow-sm border border-gray-200">
        <img 
          src={scan.image} 
          alt={scan.drugName}
          class="w-full h-full object-cover"
        />
      </div>
      
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-gray-900 truncate">{scan.drugName}</h4>
        <p class="text-xs text-gray-500 mt-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {timeAgo}
        </p>
      </div>
    </div>
    
    <div class="mt-5 flex justify-center">
      <a 
        href={`/medicine/${encodeURIComponent(scan.drugName)}`} 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#1a5f4a] hover:bg-[#164a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a5f4a] transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        View Details
      </a>
    </div>
  </div>
</div>


<!-- on:error={handleImageError} -->