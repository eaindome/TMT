<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	// Optionally make these configurable via props
	export let contactUrl = '/contact';
	export let resourcesUrl = '/resources';
</script>

<div class="grid gap-6 md:grid-cols-2">
	<!-- Support Card -->
	<div
		class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg"
	>
		<div
			class="flex h-full flex-col justify-between bg-gradient-to-br from-[#1a5f4a]/5 to-[#1a5f4a]/15 p-8"
		>
			<div>
				<div class="mb-5 flex items-start">
					<div
						class="mr-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1a5f4a]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-[#1a5f4a]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-bold text-[#1a5f4a]">Need personalized help?</h3>
						<p class="text-gray-700">
							Our support team is available to assist you with any specific questions or issues
							you're facing with medication verification.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-auto pt-4">
				<Button
					variant="primary"
					size="md"
					elevation={true}
					on:click={() => (window.location.href = contactUrl)}
				>
					<span class="flex items-center">
						Contact Support
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-2 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</span>
				</Button>
			</div>
		</div>
	</div>

	<!-- Resources Card -->
	<div
		class="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-lg"
	>
		<div
			class="flex h-full flex-col justify-between bg-gradient-to-br from-[#0288d1]/5 to-[#0288d1]/15 p-8"
		>
			<div>
				<div class="mb-5 flex items-start">
					<div
						class="mr-4 inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#0288d1]/10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-[#0288d1]"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
							/>
						</svg>
					</div>
					<div>
						<h3 class="mb-2 text-xl font-bold text-[#0288d1]">Browse our resources</h3>
						<p class="text-gray-700">
							Explore our guides, research, and educational materials about medication safety and
							counterfeit prevention strategies.
						</p>
					</div>
				</div>
			</div>

			<div class="mt-auto pt-4">
				<Button
					variant="secondary"
					size="md"
					elevation={true}
					on:click={() => (window.location.href = resourcesUrl)}
				>
					<span class="flex items-center">
						View Resources
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-2 h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</span>
				</Button>
			</div>
		</div>
	</div>
</div>
