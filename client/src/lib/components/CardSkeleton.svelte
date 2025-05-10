<script lang="ts">
	import Skeleton from './Skeleton.svelte';

	export let lines: number = 3;
	export let imageHeight: string = '12rem';
	export let showImage: boolean = true;
	export let showFooter: boolean = true;
	export let className: string = '';
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-md dark:bg-neutral-800 {className}">
	<!-- Card header/title skeleton -->
	<div class="p-4">
		<Skeleton height="1.5rem" width="70%" rounded="md" className="mb-2" />

		<!-- Card description skeleton -->
		{#if lines > 0}
			<div class="mt-4 space-y-2">
				{#each Array(lines) as _, i}
					<Skeleton height="0.875rem" width={`${Math.random() * 20 + 80}%`} rounded="sm" />
				{/each}
			</div>
		{/if}
	</div>

	<!-- Card image skeleton if enabled -->
	{#if showImage}
		<Skeleton height={imageHeight} width="100%" rounded="none" />
	{/if}

	<!-- Card footer skeleton if enabled -->
	{#if showFooter}
		<div
			class="flex items-center justify-between border-t border-neutral-200 p-4 dark:border-neutral-700"
		>
			<Skeleton height="1rem" width="30%" rounded="full" />
			<Skeleton height="2rem" width="25%" rounded="md" />
		</div>
	{/if}
</div>
