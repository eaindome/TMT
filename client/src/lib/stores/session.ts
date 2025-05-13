import { writable, derived, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

// Define user types and interfaces
export interface User {
	id: string;
	name: string;
	email: string;
	role: 'user' | 'premium' | 'moderator' | 'regulator' | 'admin' | 'guest';
	isPremium: boolean;
	photoURL?: string | null;
	createdAt?: string;
}

export interface SessionState {
	user: User | null;
	token: string | null;
	authenticated: boolean;
	loading: boolean;
	error: string | null;
	lastActivity: number;
}

// Initialize with values from localStorage if in browser
const initialState: SessionState = {
	user: null,
	token: null,
	authenticated: false,
	loading: true,
	error: null,
	lastActivity: Date.now()
};

// Try to load from localStorage on init
if (browser) {
	try {
		const savedSession = localStorage.getItem('session');
		if (savedSession) {
			const parsed = JSON.parse(savedSession);
			initialState.user = parsed.user;
			initialState.token = parsed.token;
			initialState.authenticated = !!parsed.user;
			initialState.loading = false;
		} else {
			initialState.loading = false;
		}
	} catch (e) {
		console.error('Failed to restore session from localStorage:', e);
		initialState.loading = false;
	}
}

// Create session store with methods
function createSessionStore() {
	const { subscribe, set, update }: Writable<SessionState> = writable(initialState);

	// Update localStorage when session changes
	if (browser) {
		subscribe((state) => {
			if (state.user && state.token) {
				localStorage.setItem(
					'session',
					JSON.stringify({
						user: state.user,
						token: state.token
					})
				);
			} else {
				localStorage.removeItem('session');
			}
		});
	}

	return {
		subscribe,

		// Set user info and mark as authenticated
		login: (user: User, token: string) => {
			update((state) => ({
				...state,
				user,
				token,
				authenticated: true,
				loading: false,
				error: null,
				lastActivity: Date.now()
			}));
		},

		// Clear the session
		logout: () => {
			set({
				user: null,
				token: null,
				authenticated: false,
				loading: false,
				error: null,
				lastActivity: Date.now()
			});
		},

		// Update user information
		updateUser: (userData: Partial<User>) => {
			update((state) => {
				if (!state.user) return state;

				return {
					...state,
					user: {
						...state.user,
						...userData
					},
					lastActivity: Date.now()
				};
			});
		},

		// Set or clear error message
		setError: (message: string | null) => {
			update((state) => ({
				...state,
				error: message,
				loading: false
			}));
		},

		// Set loading state
		setLoading: (isLoading: boolean) => {
			update((state) => ({
				...state,
				loading: isLoading,
				lastActivity: Date.now()
			}));
		},

		// Update the last activity timestamp (for session timeout tracking)
		touch: () => {
			update((state) => ({
				...state,
				lastActivity: Date.now()
			}));
		},

		// For development/testing: set mock session data
		mockSession: (role: User['role'] = 'user', isPremium: boolean = false) => {
			const mockUser: User = {
				id: 'mock-user-123',
				name: 'Test Account',
				email: 'test@example.com',
				role,
				isPremium,
				createdAt: new Date().toISOString()
			};

			update((state) => ({
				...state,
				user: mockUser,
				token: 'mock-token-for-development',
				authenticated: true,
				loading: false,
				error: null,
				lastActivity: Date.now()
			}));

			console.log(`🛠️ Mocked session with role: ${role}, premium: ${isPremium}`);
		}
	};
}

// Create and export the session store
export const sessionStore = createSessionStore();

// Derived store for easier access to the session
export const session = derived(sessionStore, ($sessionStore) => $sessionStore);

// Export individual stores for convenience
export const user = derived(sessionStore, ($sessionStore) => $sessionStore.user);

export const isAuthenticated = derived(
	sessionStore,
	($sessionStore) => $sessionStore.authenticated
);

export const isLoading = derived(sessionStore, ($sessionStore) => $sessionStore.loading);

export const sessionError = derived(sessionStore, ($sessionStore) => $sessionStore.error);

// Check for session timeout (e.g., after 2 hours of inactivity)
if (browser) {
	const SESSION_TIMEOUT = 1000 * 60 * 60 * 2; // 2 hours

	setInterval(() => {
		sessionStore.subscribe((state) => {
			if (state.authenticated && Date.now() - state.lastActivity > SESSION_TIMEOUT) {
				console.log('Session timed out due to inactivity');
				sessionStore.logout();
			}
		});
	}, 60000); // Check every minute
}
