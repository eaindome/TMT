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
            case 'reply': return 'text-blue-500';
            case 'like': return 'text-rose-500';
            case 'mention': return 'text-green-500';
            case 'system': return 'text-gray-500';
            default: return 'text-gray-500';
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        if (isVisible && (event.target as HTMLElement).closest('.notification-panel') === null) {
            hideNotifications();
        }
    }

    function markAsRead(notificationId: number) {
        console.log('Mark as read:', notificationId);
    }

    function markAllAsRead() {
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
        class="fixed inset-0 z-40 backdrop-blur-[2px] bg-black/5 transition-all duration-200"
        in:fade={{ duration: 200 }}
        out:fade={{ duration: 200 }}
    ></div>
{/if}

<!-- Notification Panel -->
{#if isVisible}
    <div
        class="notification-panel fixed right-0 top-0 z-50 h-full w-full bg-white/95 backdrop-blur-md border-l border-gray-200/50 shadow-2xl sm:w-[380px]"
        in:fly={{ x: 400, duration: 300, easing: cubicOut }}
        out:fly={{ x: 400, duration: 250, easing: cubicOut }}
    >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-100 p-5 bg-white/80 backdrop-blur-sm">
            <div class="flex items-center">
                <div class="flex items-center justify-center rounded-xl bg-[#1a5f4a]/10 p-2.5">
                    <Icon name="bell" className="h-4 w-4 text-[#1a5f4a]" />
                </div>
                <h2 class="ml-3 text-lg font-semibold text-gray-800">Notifications</h2>
            </div>
            
            <div class="flex items-center space-x-1">
                <button
                    on:click={markAllAsRead}
                    class="px-2 py-1 text-xs font-medium text-[#1a5f4a] hover:text-[#2c8a6d] hover:bg-[#1a5f4a]/5 rounded-md transition-colors"
                >
                    Mark all read
                </button>
                <button
                    on:click={hideNotifications}
                    class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                    <Icon name="x" className="h-4 w-4" />
                </button>
            </div>
        </div>

        <!-- Notifications List -->
        <div class="flex-1 overflow-y-auto">
            {#each Object.values(groupedNotifications).filter(Boolean) as group}
                {#if group}
                <div class="last:border-b-0">
                    <!-- Group Header -->
                    <div class="sticky top-0 bg-white/90 backdrop-blur-sm px-5 py-2.5 border-b border-gray-50">
                        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">{group.label}</h3>
                    </div>

                    <!-- Notifications in Group -->
                    <div>
                        {#each group.items as notification, index}
                            <button
                                type="button"
                                class="w-full text-left px-5 py-4 transition-all duration-150 hover:bg-gray-50/80 active:bg-gray-100/50 {notification.unread ? 'bg-[#1a5f4a]/3 border-l-2 border-[#1a5f4a]/30' : ''} {index !== group.items.length - 1 ? 'border-b border-gray-50' : ''}"
                                on:click={() => markAsRead(notification.id)}
                            >
                                <div class="flex items-start space-x-3">
                                    <!-- Avatar or Icon -->
                                    <div class="flex-shrink-0 mt-0.5">
                                        {#if notification.avatar}
                                            <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] text-xs font-semibold text-white shadow-sm">
                                                {notification.avatar}
                                            </div>
                                        {:else}
                                            <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                                                <Icon 
                                                    name={getNotificationIcon(notification.type)} 
                                                    className="h-3.5 w-3.5 {getNotificationColor(notification.type)}" 
                                                />
                                            </div>
                                        {/if}
                                    </div>

                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-start justify-between">
                                            <p class="text-sm font-medium text-gray-800 leading-snug">
                                                {notification.title}
                                            </p>
                                            {#if notification.unread}
                                                <div class="ml-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-[#1a5f4a] flex-shrink-0"></div>
                                            {/if}
                                        </div>
                                        <p class="text-sm text-gray-600 leading-relaxed mt-0.5 line-clamp-2">
                                            {notification.message}
                                        </p>
                                        <p class="text-xs text-gray-400 mt-2">
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
                <div class="flex flex-col items-center justify-center h-64 text-gray-400 px-8">
                    <div class="rounded-full bg-gray-100 p-4 mb-4">
                        <Icon name="bell" className="h-8 w-8 text-gray-300" />
                    </div>
                    <p class="text-base font-medium text-gray-600 mb-1">All caught up!</p>
                    <p class="text-sm text-gray-400 text-center">No new notifications to show</p>
                </div>
            {/if}
        </div>

        <!-- Footer -->
        <div class="border-t border-gray-100 p-4 bg-white/80 backdrop-blur-sm">
            <button
                class="w-full rounded-lg bg-[#1a5f4a] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#2c8a6d] hover:shadow-md active:scale-[0.98]"
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

    /* Custom scrollbar */
    .notification-panel ::-webkit-scrollbar {
        width: 4px;
    }

    .notification-panel ::-webkit-scrollbar-track {
        background: transparent;
    }

    .notification-panel ::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 20px;
    }

    .notification-panel ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(156, 163, 175, 0.5);
    }
</style>