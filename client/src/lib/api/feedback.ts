import { apiClient } from './client';

interface FeedbackRequest extends Record<string, unknown> {
	scanId: string;
	rating: number;
}

interface FeedbackResponse {
	success: boolean;
	message: string;
}

/**
 * Submits user feedback for a scan
 * @param scanId ID of the scan being rated
 * @param rating User rating (0 for negative, 1 for positive)
 * @param token Authentication token
 * @returns Promise with the feedback response
 */
export async function submitFeedback(
	scanId: FeedbackRequest['scanId'],
	rating: FeedbackRequest['rating'],
	token: string
): Promise<FeedbackResponse> {
	try {
		return await apiClient.post<FeedbackResponse, FeedbackRequest>(
			'api/feedback',
			{ scanId, rating },
			{ requiresAuth: true, token }
		);
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to submit feedback');
		}
		throw new Error('Failed to submit feedback');
	}
}
