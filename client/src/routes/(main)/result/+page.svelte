<script lang="ts">
	import { scan } from '$lib/stores/scan';
	import { submitFeedback } from '$lib/api/feedback';
	import { token } from '$lib/stores/user';
	import { formatVerdict } from '$lib/utils/format';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import ScanResultSkeleton from '$lib/components/ScanResultSkeleton.svelte';
	import { ThumbsUpIcon, ThumbsDownIcon } from 'svelte-feather-icons';
	import { toasts } from '$lib/stores/toasts';

	let feedbackSubmitted = false;
	let feedbackLoading = false;

	async function handleFeedback(rating: 'up' | 'down') {
		if (!$token || !$scan.scanId) return;
		try {
			feedbackLoading = true;
			// Convert string rating to number (1 for up, 0 for down)
			const numericRating = rating === 'up' ? 1 : 0;
			await submitFeedback($scan.scanId, numericRating, $token);
			feedbackSubmitted = true;
			toasts.success('Thank you for your feedback!');
		} catch (error) {
			console.error('Feedback submission failed:', error);
			toasts.error('Failed to submit feedback. Please try again.');
		} finally {
			feedbackLoading = false;
		}
	}
</script>

{#if $scan.loading}
	<ScanResultSkeleton />
{:else}
	<Card padding="lg" shadow="md">
		<h1 class="text-trust-green mb-4 text-2xl font-bold">Scan Result</h1>
		{#if $scan.verdict}
			<div class="text-center">
				<Badge
					status={$scan.verdict === 'green'
						? 'safe'
						: $scan.verdict === 'yellow'
							? 'suspicious'
							: 'fake'}
					size="lg"
					pulse
				/>
				<p class="text-neutral-gray mt-4 text-lg">{formatVerdict($scan.verdict)}</p>
				<img src={$scan.photoUrl} alt="Medicine" class="mx-auto mt-4 max-w-xs rounded-lg" />
				<p class="text-neutral-gray mt-2 text-sm">Batch Number: {$scan.batchNumber}</p>
				<div class="mt-6 flex justify-center gap-4">
					{#if !feedbackSubmitted}
						<Button
							variant="outline"
							icon={ThumbsUpIcon}
							on:click={() => handleFeedback('up')}
							loading={feedbackLoading}
							disabled={feedbackLoading}
						>
							Thumbs Up
						</Button>
						<Button
							variant="outline"
							icon={ThumbsDownIcon}
							on:click={() => handleFeedback('down')}
							loading={feedbackLoading}
							disabled={feedbackLoading}
						>
							Thumbs Down
						</Button>
					{:else}
						<p class="text-success-green">Thank you for your feedback!</p>
					{/if}
				</div>
				<div class="mt-6">
					<Button variant="success" href="/pharmacies">Find Nearby Help</Button>
					<Button variant="primary" href="/reviews?batchNumber={$scan.batchNumber}"
						>View Reviews</Button
					>
				</div>
			</div>
		{:else if $scan.error}
			<div class="text-center">
				<p class="text-danger-red mb-4">{$scan.error}</p>
				<Button variant="primary" href="/scan" on:click={() => scan.clearScan()}>Try Again</Button>
			</div>
		{:else}
			<p class="text-danger-red">No scan result available. Please try again.</p>
			<Button variant="primary" href="/scan" on:click={() => scan.clearScan()}>Scan Again</Button>
		{/if}
	</Card>
{/if}
