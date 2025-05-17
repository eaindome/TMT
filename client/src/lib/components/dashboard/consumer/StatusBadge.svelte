<script lang="ts">
  export let status: 'Safe' | 'Caution' | 'Fake';
  
  // Define styles for each status
  const styles = {
    Safe: {
      bg: 'bg-[#4caf50]/10',
      text: 'text-[#4caf50]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>`
    },
    Caution: {
      bg: 'bg-[#f4b400]/10',
      text: 'text-[#f4b400]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>`
    },
    Fake: {
      bg: 'bg-[#d32f2f]/10',
      text: 'text-[#d32f2f]',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>`
    }
  };
  
  $: currentStyle = styles[status];
</script>

<div class="inline-flex items-center px-2.5 py-1 rounded-full {currentStyle.bg} {currentStyle.text} text-xs font-medium">
  <span class="mr-1">
    {@html currentStyle.icon}
  </span>
  {status}
</div>