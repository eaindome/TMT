<script lang="ts">
    export let id: string;
    export let username: string;
    export let avatar: string | null = null;
    export let date: string | Date;
    export let rating: number;
    export let content: string;
    export let medicineId: string | null = null;
    export let medicineName: string | null = null;
    export let verified: boolean = false;
    export let upvotes: number = 0;
    export let downvotes: number = 0;
    export let userHasVoted: 'up' | 'down' | null = null;
    export let comments: number = 0;
    export let tags: string[] = [];
  
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  
    function formatDate(date: string | Date): string {
      if (!date) return '';
      const d = typeof date === 'string' ? new Date(date) : date;
      return d.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  
    function handleUpvote() {
      dispatch('upvote', { id });
    }
  
    function handleDownvote() {
      dispatch('downvote', { id });
    }
  
    function handleComment() {
      dispatch('comment', { id });
    }
  
    function handleReport() {
      dispatch('report', { id });
    }
  
    function handleMedicineClick() {
      if (medicineId) {
        dispatch('medicineClick', { medicineId });
      }
    }
  
    // Generate star rating display
    function getStars(rating: number): { filled: number, half: boolean, empty: number } {
      const filled = Math.floor(rating);
      const half = rating % 1 >= 0.5;
      const empty = 5 - filled - (half ? 1 : 0);
      return { filled, half, empty };
    }
  
    $: stars = getStars(rating);
</script>
  
<div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
    <div class="flex items-start justify-between">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          {#if avatar}
            <img src={avatar} alt={username} class="h-10 w-10 rounded-full object-cover" />
          {:else}
            <div class="h-10 w-10 rounded-full bg-[#1a5f4a] text-white flex items-center justify-center">
              {username.charAt(0).toUpperCase()}
            </div>
          {/if}
        </div>
        <div class="ml-3">
          <div class="flex items-center">
            <h3 class="text-sm font-medium text-gray-900">{username}</h3>
            {#if verified}
              <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#4caf50] text-white">
                Verified
              </span>
            {/if}
          </div>
          <p class="text-xs text-gray-500">{formatDate(date)}</p>
        </div>
      </div>
      <div class="flex">
        {#each Array(stars.filled) as _}
          <svg class="w-4 h-4 text-[#f4b400]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        {/each}
        {#if stars.half}
          <svg class="w-4 h-4 text-[#f4b400]" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stop-color="#f4b400"></stop>
                <stop offset="50%" stop-color="#e5e7eb"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        {/if}
        {#each Array(stars.empty) as _}
          <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        {/each}
      </div>
    </div>
    
    {#if medicineName}
      <div class="mt-2">
        <button 
          class="text-xs inline-flex items-center px-2.5 py-0.5 rounded-md bg-[#1a5f4a]/10 text-[#1a5f4a] hover:bg-[#1a5f4a]/20"
          on:click={handleMedicineClick}
        >
          <svg class="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="3" />
          </svg>
          {medicineName}
        </button>
      </div>
    {/if}
  
    <div class="mt-3">
      <p class="text-sm text-gray-700">{content}</p>
    </div>
  
    {#if tags.length > 0}
      <div class="mt-3 flex flex-wrap gap-1">
        {#each tags as tag}
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-gray-100">
            {tag}
          </span>
        {/each}
      </div>
    {/if}
  
    <div class="mt-4 flex items-center justify-between">
      <div class="flex space-x-4">
        <button 
          class="flex items-center text-xs text-gray-500 hover:text-gray-700"
          on:click={handleUpvote}
        >
          <svg 
            class="w-4 h-4 mr-1 {userHasVoted === 'up' ? 'text-[#0288d1]' : 'text-gray-400'}" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
          {upvotes}
        </button>
        <button 
          class="flex items-center text-xs text-gray-500 hover:text-gray-700"
          on:click={handleDownvote}
        >
          <svg 
            class="w-4 h-4 mr-1 {userHasVoted === 'down' ? 'text-[#d32f2f]' : 'text-gray-400'}" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h1.999L9 7v-.001A1 1 0 018 6H7a1 1 0 00-1 1v.999L7 9zm3 0a1 1 0 01-1-1V7a1 1 0 01-1-1h3a1 1 0 01-1 1v1a1 1 0 01-1 1z" clip-rule="evenodd" />
            <path fill-rule="evenodd" d="M12.293 10.293a1 1 0 010 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414A1 1 0 018 10h4a1 1 0 01.293.293z" clip-rule="evenodd" />
          </svg>
          {downvotes}
        </button>
      </div>
      <div class="flex space-x-4">
        <button 
          class="flex items-center text-xs text-gray-500 hover:text-gray-700"
          on:click={handleComment}
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.08 9.08 0 01-2.54-.3 1 1 0 01-.44.17H3a1 1 0 01-1-1v-1a6 6 0 013-5.6 9 9 0 0114-8.6 9 9 0 018 9z" />
          </svg>
          {comments}
        </button>
        <button 
          class="flex items-center text-xs text-gray-500 hover:text-gray-700"
          on:click={handleReport}
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l9 6-9 6m10.5-12l9 6-9 6" />
          </svg>
          Report
        </button>
      </div>
    </div>
</div>