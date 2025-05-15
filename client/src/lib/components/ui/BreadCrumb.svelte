<script lang="ts">
	export let items: { label: string; href: string; current?: boolean }[] = [];
	export let showHomeIcon = true;
</script>

<nav aria-label="Breadcrumb" class="mb-4 select-none">
	<ol class="flex flex-wrap items-center rounded-md bg-gray-50 px-3 py-2 text-sm shadow-sm">
		{#each items as item, i}
			<li class="flex items-center {i === items.length - 1 ? 'pointer-events-none' : ''}">
				{#if i === 0 && showHomeIcon}
					<!-- Home icon for first item -->
					<div class="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-4 w-4 text-[#1a5f4a]"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
							/>
						</svg>
					</div>
				{/if}

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
					<span
						class="rounded-full bg-[#1a5f4a]/10 px-3 py-1 font-medium text-[#1a5f4a]"
						aria-current="page"
					>
						{item.label}
					</span>
				{:else}
					<a href={item.href} class="transition-colors hover:text-[#1a5f4a]">
						<span class="group relative">
							{item.label}
							<span
								class="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1a5f4a] transition-all duration-300 group-hover:w-full"
							></span>
						</span>
					</a>
				{/if}
			</li>
		{/each}
	</ol>
</nav>

<style>
	/* Optional: Add some responsive adjustments */
	@media (max-width: 640px) {
		ol {
			padding: 0.5rem;
		}
	}
</style>
