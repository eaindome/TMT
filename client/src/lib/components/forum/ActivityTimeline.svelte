<script lang="ts">
    import ActivityItem from './ActivityItem.svelte';
    import ActivityItemSkeleton from './ActivityItemSkeleton.svelte';
    import { createEventDispatcher } from 'svelte';

    interface Activity {
        id: string | number;
        timestamp: string;
        type: string;
        title: string;
        description: string;
        // Add other fields as needed, e.g.:
        // content: string;
        // user: { id: string | number; name: string; }
    }

    export let activities: Activity[] = [];
    export let loading = false;

    const dispatch = createEventDispatcher();

    function handleViewPost(event: CustomEvent) {
        dispatch('viewPost', event.detail);
    }

    function handleViewComment(event: CustomEvent) {
        dispatch('viewComment', event.detail);
    }

    function groupActivitiesByDate(activities: Activity[]) {
        const grouped: { [key: string]: Activity[] } = {};
        
        activities.forEach(activity => {
            const date = new Date(activity.timestamp);
            const dateKey = date.toDateString();
            
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(activity);
        });
        
        return grouped;
    }

    function formatDateHeader(dateString: string) {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
    }

    $: groupedActivities = groupActivitiesByDate(activities);
</script>

<div class="space-y-6">
    <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Activity Timeline</h2>
        <span class="text-sm text-gray-500">{activities.length} activities</span>
    </div>

    {#if loading}
        <div class="space-y-4">
            {#each Array(5) as _}
                <ActivityItemSkeleton />
            {/each}
        </div>
    {:else if activities.length === 0}
        <div class="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">No recent activity</h3>
            <p class="text-gray-600 mb-6">Start engaging with the community to see your activity here.</p>
            <a href="/forum" class="inline-flex items-center px-4 py-2 bg-[#1a5f4a] text-white text-sm font-medium rounded-lg hover:bg-[#2c8a6d] transition-colors">
                Explore Forum
            </a>
        </div>
    {:else}
        <!-- Timeline Container -->
        <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <!-- Grouped Activities -->
            {#each Object.entries(groupedActivities) as [dateKey, dayActivities]}
                <div class="mb-8">
                    <!-- Date Header -->
                    <div class="relative flex items-center mb-4">
                        <div class="absolute left-6 w-4 h-4 bg-[#1a5f4a] rounded-full border-4 border-white shadow-sm z-10"></div>
                        <div class="ml-16">
                            <h3 class="text-lg font-semibold text-gray-900 bg-white pr-4">
                                {formatDateHeader(dateKey)}
                            </h3>
                        </div>
                    </div>
                    
                    <!-- Activities for this date -->
                    <div class="space-y-4">
                        {#each dayActivities as activity}
                            <ActivityItem 
                                {activity} 
                                on:viewPost={handleViewPost} 
                                on:viewComment={handleViewComment} 
                            />
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>