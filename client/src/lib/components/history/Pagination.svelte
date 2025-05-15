<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let currentPage = 1;
  export let totalPages = 1;
  
  const dispatch = createEventDispatcher();
  
  function changePage(page: number) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    dispatch('pageChange', { page });
  }
  
  function getPageNumbers(): number[] {
    const pages: number[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if there are 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      if (currentPage > 3) {
        // Add ellipsis if current page is far from start
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        // Add ellipsis if current page is far from end
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  }
  
  $: pageNumbers = getPageNumbers();
</script>

<div class="flex items-center justify-center mt-4">
  <nav class="flex items-center space-x-1">
    <!-- Previous Button -->
    <button
      class="p-2 rounded-md text-secondary-neutral-gray hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage === 1}
      on:click={() => changePage(currentPage - 1)}
      aria-label="Previous page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <!-- Page Numbers -->
    {#each pageNumbers as pageNum}
      {#if pageNum === -1}
        <!-- Ellipsis -->
        <span class="px-3 py-2 text-secondary-neutral-gray">...</span>
      {:else}
        <!-- Page Number Button -->
        <button
          class={`px-3 py-1 rounded-md ${
            pageNum === currentPage
              ? 'bg-primary-trust-green text-white'
              : 'text-secondary-neutral-gray hover:bg-gray-100'
          }`}
          on:click={() => changePage(pageNum)}
          aria-label={`Page ${pageNum}`}
          aria-current={pageNum === currentPage ? 'page' : undefined}
        >
          {pageNum}
        </button>
      {/if}
    {/each}
    
    <!-- Next Button -->
    <button
      class="p-2 rounded-md text-secondary-neutral-gray hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={currentPage === totalPages}
      on:click={() => changePage(currentPage + 1)}
      aria-label="Next page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</div>