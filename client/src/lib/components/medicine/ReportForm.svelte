<script lang="ts">
  export let medicineName: string = 'this medicine';
  export let onSubmit: (data: { reason: string, selectedReason: string }) => void;
  export let onCancel: () => void;
  
  let reason = '';
  let selectedReason = '';
  
  const commonReasons = [
    'Package appears tampered or damaged',
    'Unusual appearance, color, or taste',
    'Different effects than expected',
    'Missing security features (hologram, etc.)',
    'Suspicious source or vendor'
  ];
  
  function selectReason(reasonText: string) {
    selectedReason = reasonText === selectedReason ? '' : reasonText;
  }
  
  function handleSubmit() {
    onSubmit({ reason, selectedReason });
  }
</script>

<div class="space-y-5">
  <!-- Medicine name -->
  <div class="text-sm text-gray-500">
    Medicine: <span class="font-medium text-gray-900">{medicineName}</span>
  </div>
  
  <!-- Common reasons -->
  <div>
    <label for="common-reasons" class="block text-sm font-medium text-gray-700 mb-2">
      Common reasons for concern:
    </label>
    <div id="common-reasons" class="space-y-2">
      {#each commonReasons as reasonText}
        <button
          type="button"
          class="w-full rounded-md border px-3 py-2 text-left text-sm transition-colors {selectedReason === reasonText
            ? 'border-red-500 bg-red-50 text-red-700'
            : 'border-gray-300 hover:border-gray-400'}"
          on:click={() => selectReason(reasonText)}
          aria-pressed={selectedReason === reasonText}
        >
          {reasonText}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Additional details -->
  <div>
    <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">
      Additional details (optional):
    </label>
    <textarea
      id="reason"
      bind:value={reason}
      class="h-24 w-full rounded-md border border-gray-300 p-3 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
      placeholder="Provide any additional details about your concerns..."
    ></textarea>
  </div>
  
  <!-- Privacy notice -->
  <div class="rounded-md bg-gray-50 p-3 text-xs text-gray-500">
    Your report will be reviewed by our team and may be shared with regulatory authorities
    if necessary. Your identity will remain confidential.
  </div>
  
  <div class="flex justify-end gap-3">
    <button
      class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
      on:click={onCancel}
      type="button"
    >
      Cancel
    </button>
    
    <button
      class="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      on:click={handleSubmit}
      disabled={!reason.trim() && !selectedReason}
      type="button"
    >
      Submit Report
    </button>
  </div>
</div>