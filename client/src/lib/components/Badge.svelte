<script lang="ts">
    type Status = 'safe' | 'suspicious' | 'fake' | 'neutral';
    type Size = 'sm' | 'md' | 'lg';
  
    export let status: Status = 'neutral';
    export let size: Size = 'md';
    export let outline: boolean = false;
    export let pulse: boolean = false;
  
    const statusClasses: Record<Status, string> = {
      safe: outline 
        ? 'border-[#4caf50] text-[#4caf50] bg-[#4caf50]/10' 
        : 'bg-[#4caf50] text-white',
      suspicious: outline 
        ? 'border-[#f4b400] text-[#f4b400] bg-[#f4b400]/10' 
        : 'bg-[#f4b400] text-black',
      fake: outline 
        ? 'border-[#d32f2f] text-[#d32f2f] bg-[#d32f2f]/10' 
        : 'bg-[#d32f2f] text-white',
      neutral: outline 
        ? 'border-[#607d8b] text-[#607d8b] bg-[#607d8b]/10' 
        : 'bg-[#607d8b] text-white'
    };
  
    const sizeClasses: Record<Size, string> = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5'
    };
  
    $: classes = `
      inline-flex items-center justify-center
      font-medium
      ${statusClasses[status]}
      ${sizeClasses[size]}
      ${outline ? 'border' : ''}
      ${pulse ? 'animate-pulse' : ''}
      rounded-full
    `;
  
    const statusText: Record<Status, string> = {
      safe: 'Verified Safe',
      suspicious: 'Needs Caution',
      fake: 'Flagged as Fake',
      neutral: 'Unverified'
    };
</script>
  
<span class={classes} {...$$restProps}>
    <slot>{statusText[status]}</slot>
</span>