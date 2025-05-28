<!-- src/lib/components/PageHeader.svelte -->
<script lang="ts">
  export let title: string;
  export let subtitle: string;
  export let bgGradient: string = 'from-primary-600 to-primary-700';
</script>

<div class="bg-gradient-to-r {bgGradient} text-gray-300 -mt-13">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-left">
        <h1 class="text-2xl font-semibold text-gray-900 sm:text-3xl leading-tight">
          {title}
        </h1>
        
        <p class="mt-2 text-sm text-gray-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
    </div>
  </div>
</div>