<script lang="ts">
	import Modal from '$lib/components/ui/Modal.svelte';
	import ReportForm from './ReportForm.svelte';
	import SuccessMessage from './SuccessMessage.svelte';

	export let onFlag: () => void;
	export let medicineId: string = '';
	export let medicineName: string = 'this medicine';

	let showModal = false;
	let submitted = false;

	function openModal() {
		showModal = true;
		submitted = false;
	}

	function closeModal() {
		showModal = false;
	}

	function handleFormSubmit({ reason, selectedReason }: { reason: string; selectedReason: string }) {
		// Combine selected reason with custom reason if both exist
		const finalReason = selectedReason
			? reason
				? `${selectedReason} - ${reason}`
				: selectedReason
			: reason;
	
		// In production, you would send this reason along with the drug ID
		console.log(`Reporting ${medicineId}: ${finalReason}`);
		submitted = true;
	
		// Simulate API call
		setTimeout(() => {
			closeModal();
			onFlag();
		}, 1500);
	}
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="border-b border-gray-200 p-4">
		<h2 class="text-lg font-medium text-gray-900">Report Concerns</h2>
	</div>

	<div class="p-5">
		<div class="flex items-start">
			<div class="mt-0.5 mr-3 flex-shrink-0 text-gray-400">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						fill-rule="evenodd"
						d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="flex-1">
				<p class="mb-4 text-sm text-gray-700">
					If you have concerns about the authenticity of this medicine, please report it for our
					team to investigate. Your report helps protect the community.
				</p>

				<button
					class="inline-flex items-center justify-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition-colors hover:bg-red-50 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
					on:click={openModal}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mr-1.5 h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					Report Concerns
				</button>
			</div>
		</div>
	</div>

	<Modal
		open={showModal}
		onClose={closeModal}
		title={submitted ? '' : 'Report Authenticity Concern'}
	>
		{#if submitted}
			<SuccessMessage onClose={closeModal} />
		{:else}
			<ReportForm {medicineName} onSubmit={handleFormSubmit} onCancel={closeModal} />
		{/if}
	</Modal>
</div>
