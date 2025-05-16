<script lang="ts">
	import type { AuthenticityStatus, ScanStats } from '$lib/types/medicine.ts';

	export let status: AuthenticityStatus;
	export let lastVerified: Date;
	export let scanStats: ScanStats;

	// Helper function to get status configuration
	function getStatusConfig(status: AuthenticityStatus) {
		switch (status) {
			case 'safe':
				return {
					color: 'text-green-700',
					bgColor: 'bg-green-50',
					borderColor: 'border-green-500',
					iconClass: 'text-green-500',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>`
				};
			case 'caution':
				return {
					color: 'text-amber-700',
					bgColor: 'bg-amber-50',
					borderColor: 'border-amber-500',
					iconClass: 'text-amber-500',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>`
				};
			case 'fake':
				return {
					color: 'text-red-700',
					bgColor: 'bg-red-50',
					borderColor: 'border-red-500',
					iconClass: 'text-red-500',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>`
				};
			default:
				return {
					color: 'text-gray-700',
					bgColor: 'bg-gray-50',
					borderColor: 'border-gray-500',
					iconClass: 'text-gray-500',
					icon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>`
				};
		}
	}

	// Helper function to get status explanation
	function getStatusExplanation(status: AuthenticityStatus): string {
		switch (status) {
			case 'safe':
				return 'This medicine has been verified as authentic based on our database and AI analysis. It appears to be manufactured by a legitimate pharmaceutical company and matches all expected characteristics.';
			case 'caution':
				return 'This medicine has some characteristics that require caution. While not definitively identified as counterfeit, some visual elements or packaging details differ from our reference database.';
			case 'fake':
				return 'This medicine has been identified as potentially counterfeit. Multiple characteristics do not match our database of authentic medicines. Do not consume and report to local authorities.';
			default:
				return 'Status information unavailable.';
		}
	}

	const formatDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	// Calculate percentage for the chart
	const safePercentage = Math.round((scanStats.safeCounts / scanStats.totalScans) * 100) || 0;
	const cautionPercentage = Math.round((scanStats.cautionCounts / scanStats.totalScans) * 100) || 0;
	const fakePercentage = Math.round((scanStats.fakeCounts / scanStats.totalScans) * 100) || 0;

	// Get status configuration
	$: statusConfig = getStatusConfig(status);
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
	<div class="flex items-center justify-between border-b border-gray-200 p-4">
		<h2 class="text-lg font-medium text-gray-900">Authenticity Information</h2>
		<div
			class="flex items-center gap-1.5 rounded-full px-2.5 py-1 {statusConfig.bgColor} {statusConfig.color} text-xs font-medium"
		>
			{@html statusConfig.icon}
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</div>
	</div>

	<div class="p-5">
		<!-- Status information -->
		<div
			class="mb-6 rounded-md {statusConfig.bgColor} border p-4 border-{statusConfig.borderColor}/20"
		>
			<div class="flex items-start">
				<div class="mr-3 flex-shrink-0 {statusConfig.iconClass}">
					{@html statusConfig.icon}
				</div>
				<div>
					<h3 class="font-medium {statusConfig.color}">
						{status === 'safe'
							? 'Verified Authentic'
							: status === 'caution'
								? 'Requires Caution'
								: status === 'fake'
									? 'Potentially Counterfeit'
									: 'Unknown Status'}
					</h3>
					<p class="mt-1 text-sm text-gray-700">{getStatusExplanation(status)}</p>
					<div class="mt-2 flex items-center text-xs text-gray-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="mr-1 h-3.5 w-3.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						Last verified: {formatDate(lastVerified)}
					</div>
				</div>
			</div>
		</div>

		<!-- Scan Statistics -->
		<div>
			<div class="mb-4 flex items-center justify-between">
				<h3 class="font-medium text-gray-900">Scan Statistics</h3>
				<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
					{scanStats.totalScans} total scans
				</span>
			</div>

			<!-- Stats visualization -->
			<div class="space-y-4">
				<!-- Safe scans -->
				<div>
					<div class="mb-1.5 flex items-center gap-2">
						<div class="h-2.5 w-2.5 rounded-full bg-green-500"></div>
						<div class="flex flex-1 items-center justify-between">
							<span class="text-sm text-gray-700">Safe</span>
							<div class="flex items-center">
								<span class="mr-1.5 text-sm text-gray-600">{scanStats.safeCounts}</span>
								<span class="rounded bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
									{safePercentage}%
								</span>
							</div>
						</div>
					</div>
					<div class="h-1.5 w-full rounded-full bg-gray-100">
						<div class="h-1.5 rounded-full bg-green-500" style="width: {safePercentage}%"></div>
					</div>
				</div>

				<!-- Caution scans -->
				<div>
					<div class="mb-1.5 flex items-center gap-2">
						<div class="h-2.5 w-2.5 rounded-full bg-amber-500"></div>
						<div class="flex flex-1 items-center justify-between">
							<span class="text-sm text-gray-700">Caution</span>
							<div class="flex items-center">
								<span class="mr-1.5 text-sm text-gray-600">{scanStats.cautionCounts}</span>
								<span class="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700">
									{cautionPercentage}%
								</span>
							</div>
						</div>
					</div>
					<div class="h-1.5 w-full rounded-full bg-gray-100">
						<div class="h-1.5 rounded-full bg-amber-500" style="width: {cautionPercentage}%"></div>
					</div>
				</div>

				<!-- Fake scans -->
				<div>
					<div class="mb-1.5 flex items-center gap-2">
						<div class="h-2.5 w-2.5 rounded-full bg-red-500"></div>
						<div class="flex flex-1 items-center justify-between">
							<span class="text-sm text-gray-700">Fake</span>
							<div class="flex items-center">
								<span class="mr-1.5 text-sm text-gray-600">{scanStats.fakeCounts}</span>
								<span class="rounded bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700">
									{fakePercentage}%
								</span>
							</div>
						</div>
					</div>
					<div class="h-1.5 w-full rounded-full bg-gray-100">
						<div class="h-1.5 rounded-full bg-red-500" style="width: {fakePercentage}%"></div>
					</div>
				</div>
			</div>

			<!-- Note about data -->
			<div class="mt-5 rounded-md border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">
				<p>
					These statistics are derived from verified scans across all users. Always consult with
					healthcare professionals for medical advice.
				</p>
			</div>
		</div>
	</div>
</div>
