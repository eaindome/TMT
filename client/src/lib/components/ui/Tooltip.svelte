<script lang="ts">
    export let text: string;
    export let placement: 'right' | 'left' | 'top' | 'bottom' = 'right';
    export let offset: number = 8;
    export let variant: 'dark' | 'light' | 'primary' = 'dark';
    export let showDelay: number = 300; // milliseconds to wait before showing tooltip
    export let showOnCollapsed: boolean = false; // New prop to control when tooltip shows

    // Dynamically determine classes based on variant
    $: bgColor = variant === 'dark' 
        ? 'bg-gray-800' 
        : variant === 'light' 
            ? 'bg-white border border-gray-200 shadow-md' 
            : 'bg-[#1a5f4a]';
    
    $: textColor = variant === 'light' ? 'text-gray-800' : 'text-white';
    
    // Determine if we should show the tooltip
    $: showTooltip = showOnCollapsed;
</script>
  
<div class="relative group inline-block">
    <slot />
    
    <div
      role="tooltip"
      class="pointer-events-none absolute z-50 invisible scale-95 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium {bgColor} {textColor} opacity-0 shadow-lg transition-all duration-200 
      group-hover:opacity-100 group-hover:visible group-hover:scale-100"
      class:right={placement === 'right'}
      class:left={placement === 'left'}
      class:top={placement === 'top'}
      class:bottom={placement === 'bottom'}
      style="
        {placement === 'right' ? `left: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%) scale(var(--scale, 0.95));` : ''}
        {placement === 'left' ? `right: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%) scale(var(--scale, 0.95));` : ''}
        {placement === 'top' ? `bottom: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%) scale(var(--scale, 0.95));` : ''}
        {placement === 'bottom' ? `top: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%) scale(var(--scale, 0.95));` : ''}
      "
      style:--scale={showOnCollapsed ? '1' : '0.95'}
      style:transition-delay={`${showDelay}ms, ${showDelay}ms, ${showDelay}ms, 0ms`}
    >
      {text}
      
      <!-- Arrow/pointer -->
      <div 
        class="absolute h-2 w-2 rotate-45 {bgColor}"
        class:border-r={variant === 'light' && (placement === 'left' || placement === 'top')}
        class:border-b={variant === 'light' && (placement === 'left' || placement === 'top')}
        class:border-l={variant === 'light' && (placement === 'right' || placement === 'bottom')}
        class:border-t={variant === 'light' && (placement === 'right' || placement === 'bottom')}
        style="
          {placement === 'right' ? 'left: -4px; top: 50%; transform: translateY(-50%) rotate(45deg);' : ''}
          {placement === 'left' ? 'right: -4px; top: 50%; transform: translateY(-50%) rotate(45deg);' : ''}
          {placement === 'top' ? 'bottom: -4px; left: 50%; transform: translateX(-50%) rotate(45deg);' : ''}
          {placement === 'bottom' ? 'top: -4px; left: 50%; transform: translateX(-50%) rotate(45deg);' : ''}
        "
      ></div>
    </div>
</div>

<style>
  /* Optional: Add some animations for better UX */
  @keyframes tooltipFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* When tooltip is hidden and reappears, apply a subtle animation */
  [role="tooltip"].group-hover:visible {
    animation: tooltipFadeIn 0.2s ease-out forwards;
  }
  
  /* Ensure the border color matches for the arrow in light variant */
  [role="tooltip"].bg-white > div {
    border-color: #e5e7eb;
  }
</style>
