<script lang="ts">
	export let onClose: () => void;
</script>

<div class="py-8 text-center">
	<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
		<svg
			class="h-6 w-6 text-green-600"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"
			></path>
		</svg>
	</div>
	<h4 class="text-lg font-medium text-gray-900">Thank you for your report</h4>
	<p class="mt-2 text-sm text-gray-500">
		Our team will review your concern and take appropriate action. We appreciate your help in
		keeping medicines safe.
	</p>
	<button
		class="mt-5 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
		on:click={onClose}
	>
		Close
	</button>
</div>
