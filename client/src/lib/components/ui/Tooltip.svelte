<script lang="ts">
    export let text: string;
    export let placement: 'right' | 'left' | 'top' | 'bottom' = 'right';
    export let offset: number = 8;
</script>
  
<div class="relative group">
    <slot />
    <div
      class="absolute z-50 hidden whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-all duration-150 group-hover:opacity-100 group-hover:block"
      class:right={placement === 'right'}
      class:left={placement === 'left'}
      class:top={placement === 'top'}
      class:bottom={placement === 'bottom'}
      style="
        {placement === 'right' ? `left: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%)` : ''}
        {placement === 'left' ? `right: calc(100% + ${offset}px); top: 50%; transform: translateY(-50%)` : ''}
        {placement === 'top' ? `bottom: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%)` : ''}
        {placement === 'bottom' ? `top: calc(100% + ${offset}px); left: 50%; transform: translateX(-50%)` : ''}
      "
    >
      {text}
    </div>
</div>
  