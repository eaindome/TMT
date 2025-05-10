import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface LoginResponse {
  user: import('firebase/auth').User;
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    }
    throw new Error('Login failed: An unknown error occurred.');
  }
}

interface SignupResponse {
  user: import('firebase/auth').User;
  token: string;
}

export async function signup(email: string, password: string): Promise<SignupResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    return { user: userCredential.user, token };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
    throw new Error('Signup failed: An unknown error occurred.');
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Logout failed: ${error.message}`);
    }
    throw new Error('Logout failed: An unknown error occurred.');
  }
}

export function getCurrentUser() {
  return auth.currentUser;
}