import { writable, type Writable } from 'svelte/store';
import { getCurrentUser } from '$lib/api/auth';

// Enhanced type definitions
export interface User {
	id: string;
	name: string;
	email: string;
	photoURL?: string | null;
	isVerified?: boolean;
	createdAt?: string;
	scans?: { createdAt: string; batchNumber: string; verdict: string }[];
	badges?: string[];
}

export type Token = string;

// User store state
export interface UserState {
	user: User | null;
	token: Token | null;
	loading: boolean;
	error: string | null;
}

// Type-safe user store with methods
const createUserStore = (): Writable<UserState> & {
	setUser: (userData: User, userToken: Token) => void;
	clearUser: () => void;
	setLoading: (isLoading: boolean) => void;
	setError: (errorMessage: string | null) => void;
} => {
	const initialState: UserState = {
		user: null,
		token: null,
		loading: false,
		error: null
	};

	const { subscribe, set, update } = writable<UserState>(initialState);

	return {
		subscribe,
		set,
		update,
		setUser: (userData: User, userToken: Token) => {
			update((state) => ({
				...state,
				user: userData,
				token: userToken,
				loading: false,
				error: null
			}));
		},
		clearUser: () => {
			set(initialState);
		},
		setLoading: (isLoading: boolean) => {
			update((state) => ({ ...state, loading: isLoading, error: null }));
		},
		setError: (errorMessage: string | null) => {
			update((state) => ({ ...state, error: errorMessage, loading: false }));
		}
	};
};

// Create and export store instance
const userStore = createUserStore();

// Export subscribable stores for use in components
export const user: {
	subscribe: (derived: (user: User | null) => void) => void;
} = {
	subscribe: (derived) => userStore.subscribe((state) => derived(state.user))
};

interface TokenStore {
	subscribe: (derived: (token: Token | null) => void) => void;
}

export const token: TokenStore = {
	subscribe: (derived) => userStore.subscribe((state) => derived(state.token))
};

interface UserLoadingStore {
	subscribe: (derived: (loading: boolean) => void) => void;
}

export const userLoading: UserLoadingStore = {
	subscribe: (derived) => userStore.subscribe((state) => derived(state.loading))
};

interface UserErrorStore {
	subscribe: (derived: (error: string | null) => void) => void;
}

export const userError: UserErrorStore = {
	subscribe: (derived) => userStore.subscribe((state) => derived(state.error))
};

// Export store methods for use in API calls
export const { setUser, clearUser, setLoading, setError } = userStore;

// Initialize user state on app load
user.subscribe((value) => {
	const firebaseUser = getCurrentUser();
	if (!value && firebaseUser) {
		firebaseUser.getIdToken().then((idToken) => {
			setUser(
				{
					id: firebaseUser.uid,
					name: firebaseUser.displayName || '',
					email: firebaseUser.email || '',
					photoURL: firebaseUser.photoURL
				},
				idToken
			);
		});
	}
});
