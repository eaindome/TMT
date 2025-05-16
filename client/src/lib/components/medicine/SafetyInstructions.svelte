<script lang="ts">
	import { slide } from 'svelte/transition';
	export let instructions: string[];

	let expanded = true;

	function toggleInstructions() {
		expanded = !expanded;
	}
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<button
		type="button"
		class="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 bg-gray-50 p-4 text-left focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
		on:click={toggleInstructions}
		aria-expanded={expanded}
		aria-controls="safety-instructions-panel"
	>
		<div class="flex items-center">
			<div
				class="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<h2 class="text-lg font-medium text-gray-900">Safety Instructions</h2>
		</div>

		<div class="ml-2 flex items-center">
			<span class="mr-2 hidden text-sm text-gray-500 md:inline"
				>{expanded ? 'Collapse' : 'Expand'}</span
			>
			<span class="text-gray-500" aria-hidden="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class={`h-5 w-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</span>
		</div>
	</button>

	{#if expanded}
		<div id="safety-instructions-panel" class="p-5" transition:slide={{ duration: 300 }}>
			{#if instructions.length > 0}
				<ul class="space-y-3 text-gray-700">
					{#each instructions as instruction, i}
						<li class="flex items-start">
							<span
								class="mt-1 mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-600"
								>{i + 1}</span
							>
							<span>{instruction}</span>
						</li>
					{/each}
				</ul>

				<div class="mt-6 border-t border-gray-100 pt-4">
					<a
						href="https://www.fda.gov/drugs/medication-health-fraud/knowyourmeds"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-2 -ml-0.5 h-4 w-4 text-blue-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						Learn more about medication safety
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-2 h-4 w-4 text-gray-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 6H6a2 2 0 00-2 2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</a>
				</div>

				<div class="mt-4 rounded-md bg-blue-50 p-4">
					<div class="flex">
						<div class="flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5 text-blue-500"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div class="ml-3">
							<h3 class="text-sm font-medium text-blue-800">Important information</h3>
							<div class="mt-2 text-sm text-blue-700">
								<p>
									Always consult with your healthcare provider before making any changes to your
									medication regimen.
								</p>
							</div>
						</div>
					</div>
				</div>
			{:else}
				<div class="flex items-center justify-center py-8">
					<div class="text-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mx-auto h-12 w-12 text-gray-300"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<p class="mt-2 text-gray-500">No safety instructions available for this medicine.</p>
						<p class="mt-1 text-sm text-gray-400">
							Please consult the package insert or your healthcare provider.
						</p>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
