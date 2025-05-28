import { writable } from 'svelte/store';

interface Notification {
	id: number;
	type: string;
	title: string;
	message: string;
	time: string;
	unread: boolean;
	avatar?: string;
}

interface NotificationState {
	isVisible: boolean;
	notifications: Notification[];
}

export const notificationStore = writable<NotificationState>({
	isVisible: false,
	notifications: []
});

export function showNotifications(notifications: Notification[] = []) {
	notificationStore.update((store) => ({
		...store,
		isVisible: true,
		notifications
	}));
}

export function hideNotifications() {
	notificationStore.update((store) => ({
		...store,
		isVisible: false
	}));
}

export function toggleNotifications(notifications: Notification[] = []) {
	notificationStore.update((store) => ({
		isVisible: !store.isVisible,
		notifications: store.isVisible ? store.notifications : notifications
	}));
}
