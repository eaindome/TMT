import { setUser, clearUser, type User } from '$lib/stores/user';

// Mock user data that matches your User interface
const mockUser: User = {
	id: 'mock-user-123',
	name: 'Developer Account',
	email: 'developer@example.com',
	photoURL: null,
	isVerified: true,
	createdAt: new Date().toISOString(),
	// Optional: mock some scan data
	scans: [
		{
			createdAt: new Date().toISOString(),
			batchNumber: 'BATCH789',
			verdict: 'green'
		}
	],
	// Optional: mock some badges
	badges: ['moderator', 'developer']
};

// Mock token
const mockToken = 'mock-jwt-token-for-development';

export function enableMockAuth() {
	// Use the exported setUser function instead of trying to use user.set
	setUser(mockUser, mockToken);

	// For debugging
	console.log('🛠️ Development mock auth enabled');

	// Return a function to clear the mock when needed
	return function disableMockAuth() {
		clearUser();
		console.log('🛠️ Development mock auth disabled');
	};
}
