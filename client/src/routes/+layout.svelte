<script lang="ts">
	import '../app.css';
	import { browser } from '$app/environment';
	import DevHelper from '$lib/components/dev/DevHelper.svelte';
	import SessionHelper from '$lib/components/dev/SessionHelper.svelte';

	let { children } = $props();
</script>

{@render children()}

{#if import.meta.env.DEV}
	<DevHelper />
{/if}

{#if browser && import.meta.env.DEV}
  <SessionHelper />
{/if}
