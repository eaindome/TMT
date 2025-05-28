<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { notificationStore, hideNotifications } from '$lib/stores/notificationStore.js';
    import Icon from './Icon.svelte';
    import { onMount } from 'svelte';

    interface Notification {
        id: number;
        type: string;
        title: string;
        message: string;
        time: string;
        unread: boolean;
        avatar?: string;
    }

    $: ({ isVisible, notifications } = $notificationStore);

    // Mock notifications data - you can replace this with real data
    const mockNotifications = [
        {
            id: 1,
            type: 'reply',
            title: 'New reply to your post',
            message: 'John Doe replied to "Medicine expiry concerns"',
            time: '2 minutes ago',
            unread: true,
            avatar: 'JD'
        },
        {
            id: 2,
            type: 'like',
            title: 'Post liked',
            message: 'Sarah Johnson liked your post about counterfeit drugs',
            time: '1 hour ago',
            unread: true,
            avatar: 'SJ'
        },
        {
            id: 3,
            type: 'mention',
            title: 'You were mentioned',
            message: 'Mike Chen mentioned you in a discussion',
            time: '3 hours ago',
            unread: false,
            avatar: 'MC'
        },
        {
            id: 4,
            type: 'system',
            title: 'System update',
            message: 'New scanning features are now available',
            time: '1 day ago',
            unread: false,
            avatar: null
        },
        {
            id: 5,
            type: 'reply',
            title: 'New reply to your post',
            message: 'Dr. Williams replied to "Drug authentication methods"',
            time: '2 days ago',
            unread: false,
            avatar: 'DW'
        }
    ];

    // Group notifications by time periods
    $: groupedNotifications = groupNotificationsByTime(notifications.length > 0 ? notifications : mockNotifications);

    function groupNotificationsByTime(notifications: Array<any>) {
        const now = new Date();
        const today: any[] = [];
        const thisWeek: any[] = [];
        const earlier: any[] = [];

        notifications.forEach(notification => {
            const notificationTime = parseTimeAgo(notification.time);
            const diffHours = (now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60);

            if (diffHours < 24) {
                today.push(notification);
            } else if (diffHours < 168) { // 7 days
                thisWeek.push(notification);
            } else {
                earlier.push(notification);
            }
        });

        return {
            today: today.length > 0 ? { label: 'Today', items: today } : null,
            thisWeek: thisWeek.length > 0 ? { label: 'This Week', items: thisWeek } : null,
            earlier: earlier.length > 0 ? { label: 'Earlier', items: earlier } : null
        };
    }

    function parseTimeAgo(timeString: string) {
        const now = new Date();
        if (timeString.includes('minute')) {
            const minutes = parseInt(timeString);
            return new Date(now.getTime() - minutes * 60 * 1000);
        } else if (timeString.includes('hour')) {
            const hours = parseInt(timeString);
            return new Date(now.getTime() - hours * 60 * 60 * 1000);
        } else if (timeString.includes('day')) {
            const days = parseInt(timeString);
            return new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        }
        return now;
    }

    function getNotificationIcon(type: string) {
        switch (type) {
            case 'reply': return 'chat';
            case 'like': return 'heart';
            case 'mention': return 'at-symbol';
            case 'system': return 'cog';
            default: return 'bell';
        }
    }

    function getNotificationColor(type: string) {
        switch (type) {
            case 'reply': return 'text-blue-600';
            case 'like': return 'text-red-600';
            case 'mention': return 'text-green-600';
            case 'system': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        if (isVisible && (event.target as HTMLElement).closest('.notification-panel') === null) {
            hideNotifications();
        }
    }

    function markAsRead(notificationId: number) {
        // Implementation for marking notification as read
        console.log('Mark as read:', notificationId);
    }

    function markAllAsRead() {
        // Implementation for marking all notifications as read
        console.log('Mark all as read');
    }

    onMount(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    });
</script>

<!-- Backdrop overlay -->
{#if isVisible}
    <div
        class="fixed inset-0 z-40 backdrop-blur-sm bg-white/10 transition-all duration-200"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}
    ></div>
{/if}

<!-- Notification Panel -->
{#if isVisible}
    <div
        class="notification-panel fixed right-0 top-0 z-50 h-full w-full bg-white shadow-xl sm:w-[400px]"
        in:fly={{ x: 400, duration: 300, easing: cubicOut }}
        out:fly={{ x: 400, duration: 250, easing: cubicOut }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-200 p-4">
            <div class="flex items-center">
                <div class="flex items-center justify-center rounded-lg bg-[#1a5f4a]/10 p-2">
                    <Icon name="bell" className="h-5 w-5 text-[#1a5f4a]" />
                </div>
                <h2 class="ml-3 text-lg font-semibold text-gray-900">Notifications</h2>
            </div>
            
            <div class="flex items-center space-x-2">
                <button
                    on:click={markAllAsRead}
                    class="text-sm text-[#1a5f4a] hover:text-[#2c8a6d] transition-colors"
                >
                    Mark all read
                </button>
                <button
                    on:click={hideNotifications}
                    class="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <Icon name="x" className="h-5 w-5" />
                </button>
            </div>
        </div>

        <!-- Notifications List -->
        <div class="flex-1 overflow-y-auto">
            {#each Object.values(groupedNotifications).filter(Boolean) as group}
                {#if group}
                <div class="border-b border-gray-100 last:border-b-0">
                    <!-- Group Header -->
                    <div class="sticky top-0 bg-gray-50 px-4 py-2">
                        <h3 class="text-sm font-medium text-gray-700">{group.label}</h3>
                    </div>

                    <!-- Notifications in Group -->
                    <div class="divide-y divide-gray-100">
                        {#each group.items as notification}
                            <button
                                type="button"
                                class="w-full text-left p-4 transition-colors hover:bg-gray-50 {notification.unread ? 'bg-blue-50' : ''}"
                                on:click={() => markAsRead(notification.id)}
                            >
                                <div class="flex items-start space-x-3">
                                    <!-- Avatar or Icon -->
                                    <div class="flex-shrink-0">
                                        {#if notification.avatar}
                                            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] text-xs font-medium text-white">
                                                {notification.avatar}
                                            </div>
                                        {:else}
                                            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                                <Icon 
                                                    name={getNotificationIcon(notification.type)} 
                                                    className="h-4 w-4 {getNotificationColor(notification.type)}" 
                                                />
                                            </div>
                                        {/if}
                                    </div>

                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center justify-between">
                                            <p class="text-sm font-medium text-gray-900 truncate">
                                                {notification.title}
                                            </p>
                                            {#if notification.unread}
                                                <div class="ml-2 h-2 w-2 rounded-full bg-[#1a5f4a]"></div>
                                            {/if}
                                        </div>
                                        <p class="text-sm text-gray-600 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p class="text-xs text-gray-400 mt-1">
                                            {notification.time}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        {/each}
                    </div>
                </div>
                {/if}
            {/each}

            <!-- Empty State -->
            {#if notifications.length === 0 && mockNotifications.length === 0}
                <div class="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Icon name="bell" className="h-12 w-12 text-gray-300 mb-4" />
                    <p class="text-lg font-medium">No notifications</p>
                    <p class="text-sm">You're all caught up!</p>
                </div>
            {/if}
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-200 p-4">
            <button
                class="w-full rounded-lg bg-[#1a5f4a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2c8a6d]"
            >
                View All Notifications
            </button>
        </div>
    </div>
{/if}

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>