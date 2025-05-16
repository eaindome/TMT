<script lang="ts">
	import type { AuthenticityStatus } from '$lib/types/medicine.ts';

	export let name: string;
	export let brand: string;
	export let manufacturer: string;
	export let status: AuthenticityStatus;
	export let batchNumber: string;
	export let expiryDate: Date;

	// Helper function to get status configuration
	function getStatusConfig(status: AuthenticityStatus) {
		switch (status) {
			case 'safe':
				return {
					bgColor: 'bg-green-100',
					textColor: 'text-green-800',
					borderColor: 'border-green-500',
					dotColor: 'bg-green-500',
					label: 'Verified Safe',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>`
				};
			case 'caution':
				return {
					bgColor: 'bg-amber-100',
					textColor: 'text-amber-800',
					borderColor: 'border-amber-500',
					dotColor: 'bg-amber-500',
					label: 'Needs Caution',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`
				};
			case 'fake':
				return {
					bgColor: 'bg-red-100',
					textColor: 'text-red-800',
					borderColor: 'border-red-500',
					dotColor: 'bg-red-500',
					label: 'Flagged as Fake',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                </svg>`
				};
			default:
				return {
					bgColor: 'bg-gray-100',
					textColor: 'text-gray-700',
					borderColor: 'border-gray-400',
					dotColor: 'bg-gray-400',
					label: 'Unknown Status',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`
				};
		}
	}

	// Format date for display
	const formatDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	// Get status configuration
	$: statusConfig = getStatusConfig(status);
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
		<div class="flex flex-wrap items-center justify-between gap-4">
			<h1 class="text-2xl font-bold text-gray-900">{name}</h1>

			<div
				class="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium {statusConfig.bgColor} {statusConfig.textColor} border-{statusConfig.borderColor}"
			>
				{@html statusConfig.icon}
				{statusConfig.label}
			</div>
		</div>
	</div>

	<div class="p-6">
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
			<div class="rounded-md border border-gray-100 bg-gray-50 p-3">
				<div class="mb-1 text-xs text-gray-500">Brand</div>
				<div class="font-medium text-gray-900">{brand}</div>
			</div>

			<div class="rounded-md border border-gray-100 bg-gray-50 p-3">
				<div class="mb-1 text-xs text-gray-500">Manufacturer</div>
				<div class="font-medium text-gray-900">{manufacturer}</div>
			</div>

			<div class="rounded-md border border-gray-100 bg-gray-50 p-3">
				<div class="mb-1 text-xs text-gray-500">Batch Number</div>
				<div class="font-mono font-medium text-gray-900">{batchNumber}</div>
			</div>

			<div class="rounded-md border border-gray-100 bg-gray-50 p-3">
				<div class="mb-1 text-xs text-gray-500">Expires</div>
				<div class="font-medium text-gray-900">{formatDate(expiryDate)}</div>
			</div>
		</div>
	</div>
</div>
