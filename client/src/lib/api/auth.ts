import { browser } from '$app/environment';

// Mock Firebase User type
interface MockUser {
	uid: string;
	email: string | null;
	displayName: string | null;
	getIdToken: () => Promise<string>;
}

// Define a mock auth object
const mockAuth = {
	currentUser: null as MockUser | null
};

// Only initialize Firebase in browser and if environment variables exist
import type { FirebaseApp } from 'firebase/app';

let app: FirebaseApp | undefined = undefined;
import type { Auth } from 'firebase/auth';

let auth: Auth | typeof mockAuth = mockAuth;

if (browser) {
	try {
		// Dynamically import Firebase only in browser
		const firebaseImport = import('firebase/app');
		const authImport = import('firebase/auth');

		// Check if all required environment variables are defined
		const hasAllEnvVars =
			import.meta.env.VITE_FIREBASE_API_KEY &&
			import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
			import.meta.env.VITE_FIREBASE_PROJECT_ID;

		if (hasAllEnvVars) {
			Promise.all([firebaseImport, authImport])
				.then(([firebase, firebaseAuth]) => {
					const firebaseConfig = {
						apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
						authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
						projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
						storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
						messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
						appId: import.meta.env.VITE_FIREBASE_APP_ID
					};

					app = firebase.initializeApp(firebaseConfig);
					auth = firebaseAuth.getAuth(app);
				})
				.catch((err) => {
					console.error('Error initializing Firebase:', err);
				});
		}
	} catch (error) {
		console.error('Firebase not initialized:', error);
	}
}

interface LoginResponse {
	user: MockUser; // Using MockUser to work with both real and mock implementations
	token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
	// Check if we're using real Firebase
	if (browser && auth !== mockAuth && 'signInWithEmailAndPassword' in auth) {
		try {
			const { signInWithEmailAndPassword } = await import('firebase/auth');
			const userCredential = await signInWithEmailAndPassword(auth as Auth, email, password);
			const token = await userCredential.user.getIdToken();
			return { user: userCredential.user, token };
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Login failed: ${error.message}`);
			}
			throw new Error('Login failed: An unknown error occurred.');
		}
	} else {
		// Mock login for development
		console.log('Using mock login');
		return {
			user: {
				uid: 'mock-user-id',
				email: email,
				displayName: 'Mock User',
				getIdToken: () => Promise.resolve('mock-token')
			},
			token: 'mock-token'
		};
	}
}

interface SignupResponse {
	user: MockUser;
	token: string;
}

export async function signup(email: string, password: string): Promise<SignupResponse> {
	// Check if we're using real Firebase
	if (browser && auth !== mockAuth && 'createUserWithEmailAndPassword' in auth) {
		try {
			const { createUserWithEmailAndPassword } = await import('firebase/auth');
			const userCredential = await createUserWithEmailAndPassword(auth as Auth, email, password);
			const token = await userCredential.user.getIdToken();
			return { user: userCredential.user, token };
		} catch (error: unknown) {
			if (error instanceof Error) {
				throw new Error(`Signup failed: ${error.message}`);
			}
			throw new Error('Signup failed: An unknown error occurred.');
		}
	} else {
		// Mock signup for development
		console.log('Using mock signup');
		return {
			user: {
				uid: 'mock-user-id',
				email: email,
				displayName: 'Mock User',
				getIdToken: () => Promise.resolve('mock-token')
			},
			token: 'mock-token'
		};
	}
}

export async function logout() {
	// Check if we're using real Firebase
	if (browser && auth !== mockAuth && 'signOut' in auth) {
		try {
			const { signOut } = await import('firebase/auth');
			await signOut(auth);
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Logout failed: ${error.message}`);
			}
			throw new Error('Logout failed: An unknown error occurred.');
		}
	} else {
		// Mock logout
		console.log('Using mock logout');
		return Promise.resolve();
	}
}

export function getCurrentUser() {
	if (browser && auth !== mockAuth) {
		return auth.currentUser;
	} else {
		// Return null for mock authentication
		return null;
	}
}
