import { apiClient } from './client';

export interface Review {
	id: string;
	batchNumber: string;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
}

export interface SubmitReviewRequest extends Record<string, unknown> {
	batchNumber: string;
	rating: number;
	comment: string;
}

/**
 * Submit a review for a medicine batch
 * @param batchNumber The batch number of the medicine
 * @param rating Rating from 1-5
 * @param comment User's review comment
 * @param token Authentication token
 * @returns Promise with the submitted review
 */
export async function submitReview(
	batchNumber: string,
	rating: number,
	comment: string,
	token: string
): Promise<Review> {
	try {
		// Adding the second type argument for the body type
		return await apiClient.post<Review, SubmitReviewRequest>(
			'api/reviews',
			{ batchNumber, rating, comment },
			{ requiresAuth: true, token }
		);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to submit review');
		}
		throw new Error('Failed to submit review');
	}
}

/**
 * Get reviews for a medicine batch
 * @param batchNumber The batch number of the medicine
 * @returns Promise with array of reviews
 */
export async function getReviews(batchNumber: string): Promise<Review[]> {
	try {
		return await apiClient.get<Review[]>(`api/reviews/${batchNumber}`);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to fetch reviews');
		}
		throw new Error('Failed to fetch reviews');
	}
}
