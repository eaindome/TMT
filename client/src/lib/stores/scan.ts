import { writable, type Writable } from 'svelte/store';

// Enhanced type definitions
export interface ScanState {
	scanId: string | null;
	photoUrl: string | null;
	batchNumber: string | null;
	verdict: ScanVerdict | null;
	loading: boolean;
	error: string | null;
}

// Using literal types for better type safety
export type ScanVerdict = 'green' | 'yellow' | 'red' | 'unknown';

export interface ScanData {
	scanId: string | null;
	photoUrl: string | null;
	batchNumber: string | null;
	verdict: ScanVerdict | null;
}

// Create a type-safe writable store
const createScanStore = (): Writable<ScanState> & {
	setScan: (data: ScanData) => void;
	setScanLoading: () => void;
	setScanError: (error: string) => void;
	clearScan: () => void;
} => {
	const initialState: ScanState = {
		scanId: null,
		photoUrl: null,
		batchNumber: null,
		verdict: null,
		loading: false,
		error: null
	};

	const { subscribe, set, update } = writable<ScanState>(initialState);

	return {
		subscribe,
		set,
		update,
		setScan: (data: ScanData) => {
			update((state) => ({
				...state,
				...data,
				loading: false,
				error: null
			}));
		},
		setScanLoading: () => {
			update((state) => ({ ...state, loading: true, error: null }));
		},
		setScanError: (error: string) => {
			update((state) => ({ ...state, loading: false, error }));
		},
		clearScan: () => {
			set(initialState);
		}
	};
};

// Export a singleton instance of the store
export const scan = createScanStore();
