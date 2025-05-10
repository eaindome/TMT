<script lang="ts">
	import { getReviews, submitReview } from '$lib/api/reviews';
	import { user, token } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/stores/toasts';
	import Review from '$lib/components/Review.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import CardSkeleton from '$lib/components/CardSkeleton.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Define a type that matches what the Review component expects
	type ReviewDisplay = {
		id: string;
		username: string;
		avatar: string;
		date: string;
		rating: number;
		content: string;
		medicineId: string;
		medicineName: string;
		verified: boolean;
		upvotes: number;
		downvotes: number;
		comments: number;
	};

	let reviews: ReviewDisplay[] = [];
	let rating = 0;
	let comment = '';
	let error = '';
	let batchNumber = '';
	let loading = true;
	let submitting = false;

	$: batchNumber = $page.url.searchParams.get('batchNumber') || '';

	async function fetchReviews() {
		if (!batchNumber) return;

		loading = true;
		try {
			const apiReviews = await getReviews(batchNumber);
			// Transform API reviews to match the ReviewDisplay type
			reviews = apiReviews.map((review) => ({
				id: review.id,
				username: 'Anonymous', // Default value since API doesn't provide this
				avatar: '',
				date: review.createdAt,
				rating: review.rating,
				content: review.comment,
				medicineId: review.batchNumber,
				medicineName: `Batch ${review.batchNumber}`,
				verified: false, // Default value since API doesn't provide this
				upvotes: 0,
				downvotes: 0,
				comments: 0
			}));
			error = '';
		} catch (err: unknown) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			toasts.error('Failed to load reviews');
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if (batchNumber) {
			fetchReviews();
		} else {
			loading = false;
		}
	});

	async function handleSubmit() {
		if (!$user) {
			goto('/login');
			return;
		}

		if (!rating) {
			error = 'Please select a rating';
			toasts.error(error);
			return;
		}

		if (!batchNumber) {
			error = 'Batch number is required';
			toasts.error(error);
			return;
		}

		submitting = true;
		try {
			await submitReview(batchNumber, rating, comment, $token || '');
			toasts.success('Review submitted successfully!');

			// Refresh reviews list
			await fetchReviews();

			// Reset form
			rating = 0;
			comment = '';
			error = '';
		} catch (err: unknown) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			toasts.error(error);
		} finally {
			submitting = false;
		}
	}
</script>

<Card padding="lg" shadow="md">
	<h1 class="text-trust-green mb-4 text-2xl font-bold">Reviews for Batch {batchNumber || '...'}</h1>

	{#if error && !loading}
		<Alert message={error} type="error" className="mb-4" />
	{/if}

	{#if loading}
		<div class="space-y-4">
			{#each Array(3) as _}
				<div class="border-b border-neutral-200 pb-4">
					<div class="mb-2 flex items-center">
						<Skeleton width="40px" height="40px" rounded="full" className="mr-2" />
						<div>
							<Skeleton width="120px" height="0.875rem" className="mb-1" />
							<Skeleton width="80px" height="0.75rem" />
						</div>
					</div>
					<div class="mb-2 flex">
						{#each Array(5) as _}
							<Skeleton width="16px" height="16px" rounded="full" className="mr-1" />
						{/each}
					</div>
					<Skeleton height="3rem" className="mb-2" />
					<div class="flex justify-between">
						<Skeleton width="80px" height="1rem" />
						<Skeleton width="60px" height="1rem" />
					</div>
				</div>
			{/each}
		</div>
	{:else if reviews.length}
		<div class="space-y-4">
			{#each reviews as review}
				<Review
					id={review.id}
					username={review.username}
					avatar={review.avatar}
					date={review.date}
					rating={review.rating}
					content={review.content}
					medicineId={review.medicineId}
					medicineName={review.medicineName}
					verified={review.verified}
					upvotes={review.upvotes}
					downvotes={review.downvotes}
					comments={review.comments}
				/>
			{/each}
		</div>
	{:else if batchNumber}
		<p class="text-neutral-gray py-4">No reviews yet for this batch.</p>
	{:else}
		<p class="text-neutral-gray py-4">Please specify a batch number to view reviews.</p>
	{/if}

	{#if $user}
		<form on:submit|preventDefault={handleSubmit} class="mt-6 space-y-4">
			<h2 class="text-trust-green text-lg font-medium">Add Your Review</h2>
			<div>
				<label for="rating-stars" class="text-neutral-gray mb-1 block text-sm font-medium"
					>Rating</label
				>
				<div class="flex" id="rating-stars">
					{#each [1, 2, 3, 4, 5] as star}
						<button
							type="button"
							on:click={() => (rating = star)}
							class="h-6 w-6 {rating >= star
								? 'text-caution-yellow'
								: 'text-gray-300'} transition-colors"
							aria-label="Rate {star} stars"
							disabled={submitting}
						>
							<svg fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
						</button>
					{/each}
				</div>
			</div>
			<div>
				<label for="comment" class="text-neutral-gray mb-1 block text-sm font-medium">Comment</label
				>
				<textarea
					id="comment"
					bind:value={comment}
					class="border-neutral-gray focus:ring-trust-green focus:border-trust-green w-full rounded-md border p-2"
					placeholder="Share your experience"
					disabled={submitting}
				></textarea>
			</div>

			<Button
				type="submit"
				variant="primary"
				disabled={!batchNumber || !rating || submitting}
				loading={submitting}
			>
				{submitting ? 'Submitting...' : 'Submit Review'}
			</Button>
		</form>
	{:else}
		<p class="text-neutral-gray mt-4">
			Please <a href="/login" class="text-accent-blue">login</a> to submit a review.
		</p>
	{/if}
</Card>
