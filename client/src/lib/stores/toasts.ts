import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
	timeout?: number;
}

function createToastStore() {
	const { subscribe, update } = writable<Toast[]>([]);
	let nextId = 1;

	return {
		subscribe,
		/**
		 * Add a new toast notification
		 */
		add: (message: string, type: ToastType = 'info', timeout = 5000) => {
			const id = nextId++;
			const toast: Toast = { id, message, type, timeout };

			update((toasts) => [...toasts, toast]);

			if (timeout) {
				setTimeout(() => {
					update((toasts) => toasts.filter((t) => t.id !== id));
				}, timeout);
			}

			return id;
		},
		/**
		 * Remove a toast by ID
		 */
		remove: (id: number) => {
			update((toasts) => toasts.filter((t) => t.id !== id));
		},
		/**
		 * Success toast shorthand
		 */
		success: (message: string, timeout = 5000) => {
			return add(message, 'success', timeout);
		},
		/**
		 * Error toast shorthand
		 */
		error: (message: string, timeout = 8000) => {
			return add(message, 'error', timeout);
		},
		/**
		 * Warning toast shorthand
		 */
		warning: (message: string, timeout = 6000) => {
			return add(message, 'warning', timeout);
		},
		/**
		 * Info toast shorthand
		 */
		info: (message: string, timeout = 5000) => {
			return add(message, 'info', timeout);
		}
	};
}

export const toasts = createToastStore();
function add(message: string, type: ToastType, timeout: number) {
	return toasts.add(message, type, timeout);
}
