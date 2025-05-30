<script context="module" lang="ts">
    export interface Filters {
        timeRange?: string;
        activityType?: string;
        sortBy?: string;
        [key: string]: string | undefined;
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';

    export let filters: Filters = {};
    const dispatch = createEventDispatcher();

    const timeRangeOptions = [
        { value: 'all', label: 'All Time' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' }
    ];

    const activityTypeOptions = [
        { value: 'all', label: 'All Activities', icon: '🔄' },
        { value: 'post_created', label: 'Posts Created', icon: '📝' },
        { value: 'comment_added', label: 'Comments Added', icon: '💬' },
        { value: 'upvote_given', label: 'Upvotes Given', icon: '❤️' },
        { value: 'post_bookmarked', label: 'Posts Saved', icon: '🔖' },
        { value: 'reply_received', label: 'Replies Received', icon: '↩️' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' }
    ];

    function updateFilter(key: string, value: string) {
        dispatch('filterChange', { [key]: value });
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 p-4">
    <div class="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
        <!-- Time Range Filter -->
        <div class="flex-1">
            <label for="time-range-select" class="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
                id="time-range-select"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                value={filters.timeRange || 'all'}
                on:change={(e) => updateFilter('timeRange', (e.target as HTMLSelectElement).value)}
            >
                {#each timeRangeOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Activity Type Filter -->
        <div class="flex-1">
            <label for="activity-type-select" class="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
            <select
                id="activity-type-select"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                value={filters.activityType || 'all'}
                on:change={(e) => updateFilter('activityType', (e.target as HTMLSelectElement).value)}
            >
                {#each activityTypeOptions as option}
                    <option value={option.value}>
                        {option.icon} {option.label}
                    </option>
                {/each}
            </select>
        </div>

        <!-- Sort -->
        <div class="flex-1">
            <label for="sort-by-select" class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
                id="sort-by-select"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                value={filters.sortBy || 'newest'}
                on:change={(e) => updateFilter('sortBy', (e.target as HTMLSelectElement).value)}
            >
                {#each sortOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>
    </div>
</div>