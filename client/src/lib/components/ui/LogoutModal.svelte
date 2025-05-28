<script lang="ts">
  import { fade, scale } from 'svelte/transition';

  export let open = false;
  export let onClose = () => {};
  export let onConfirm = () => {};
  
  // Handle backdrop click
  function handleBackdropClick() {
    onClose();
  }
  
  // Handle escape key press
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose();
    }
  }
</script>

{#if open}
  <!-- Backdrop -->
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" 
    role="dialog" 
    aria-modal="true" 
    tabindex="0"
    on:click|self={handleBackdropClick}
    on:keydown={handleKeydown}
    transition:fade={{ duration: 150 }}
  >
    <!-- Modal card -->
    <div 
      class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl"
      transition:scale={{ duration: 200, start: 0.95 }}
    >
      <div class="p-5">
        <div class="flex flex-col items-center text-center">
          <h3 class="mb-2 text-xl font-medium text-gray-900">Log out</h3>
          <p class="mb-6 text-gray-600">Are you sure you want to log out of your account?</p>
          
          <div class="flex w-full gap-3">
            <button
              on:click={onClose}
              class="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            
            <button
              on:click={onConfirm}
              class="flex-1 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Yes, log out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}