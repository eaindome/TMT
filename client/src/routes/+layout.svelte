<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import DevHelper from '$lib/components/dev/DevHelper.svelte';
	import SessionHelper from '$lib/components/dev/SessionHelper.svelte';
	import ErrorBoundary from '$lib/components/error/ErrorBoundary.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-[#f5f5f5]">
	<ErrorBoundary>
    	{@render children()}
	</ErrorBoundary>
</div>

{#if import.meta.env.DEV}
	<DevHelper />
{/if}

{#if browser && import.meta.env.DEV}
  <SessionHelper />
{/if}
