import { apiClient } from './client';
import type { User } from '$lib/stores/user';

interface UserProfileResponse {
	user: User;
	success: boolean;
}

interface UpdateProfileRequest {
	name?: string;
	email?: string;
	photoURL?: string;
	bio?: string;
	[key: string]: unknown; 
}

/**
 * Get the current user's profile
 * @param token Authentication token
 * @returns Promise with the user profile
 */
export async function getUserProfile(token: string): Promise<User> {
	try {
		const response = await apiClient.get<UserProfileResponse>('api/user/profile', {
			requiresAuth: true,
			token
		});
		return response.user;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to fetch user profile');
		}
		throw new Error('Failed to fetch user profile');
	}
}

/**
 * Update the current user's profile
 * @param profileData Profile data to update
 * @param token Authentication token
 * @returns Promise with the updated user profile
 */
export async function updateUserProfile(
	profileData: UpdateProfileRequest,
	token: string
): Promise<User> {
	try {
		const response = await apiClient.put<UserProfileResponse, UpdateProfileRequest>(
			'api/user/profile',
			profileData,
			{ requiresAuth: true, token }
		);
		return response.user;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message || 'Failed to update profile');
		}
		throw new Error('Failed to update profile');
	}
}
