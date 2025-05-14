<script lang="ts">
	export let items: { label: string; href: string; current?: boolean }[] = [];
</script>

<nav aria-label="Breadcrumb" class="mb-4">
	<ol class="flex items-center space-x-2 text-sm">
		{#each items as item, i}
			<li class="flex items-center">
				{#if i > 0}
					<svg class="mx-2 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}

				{#if item.current}
					<span class="font-medium text-gray-700" aria-current="page">{item.label}</span>
				{:else}
					<a href={item.href} class="text-[#1a5f4a] hover:text-[#164639] hover:underline"
						>{item.label}</a
					>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
