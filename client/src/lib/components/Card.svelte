<script lang="ts">
    export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
    export let shadow: 'none' | 'sm' | 'md' | 'lg' = 'md';
    export let border: boolean = false;
    export let hoverable: boolean = false;
    export let clickable: boolean = false;
    export let fullWidth: boolean = true;
  
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6'
    };
  
    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg'
    };
  
    $: classes = `
      bg-white
      rounded-lg
      ${paddingClasses[padding]}
      ${shadowClasses[shadow]}
      ${border ? 'border border-gray-200' : ''}
      ${hoverable ? 'transition-transform hover:-translate-y-1 hover:shadow-lg' : ''}
      ${clickable ? 'cursor-pointer transition-colors hover:bg-[#f5f5f5]' : ''}
      ${fullWidth ? 'w-full' : ''}
    `;
</script>
  
<div class={classes} on:click on:keydown {...$$restProps}>
    <slot />
</div>