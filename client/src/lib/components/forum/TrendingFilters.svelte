<script context="module" lang="ts">
    export interface Filters {
        timeRange?: string;
        tag?: string;
        drugName?: string;
        searchQuery?: string;
        sortBy?: string;
    }
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    export let filters: Filters = {
        timeRange: '24h',
        tag: 'all',
        drugName: '',
        searchQuery: '',
        sortBy: 'trending'
    };
    const dispatch = createEventDispatcher();

    const timeRangeOptions = [
        { value: '24h', label: 'Last 24 Hours' },
        { value: 'week', label: 'This Week' },
        { value: 'month', label: 'This Month' }
    ];

    const tagOptions = [
        { value: 'all', label: 'All Tags' },
        { value: 'Safe', label: 'Safe' },
        { value: 'Fake', label: 'Fake' },
        { value: 'Caution', label: 'Caution' }
    ];

    const sortOptions = [
        { value: 'trending', label: 'Trending Score' },
        { value: 'upvotes', label: 'Most Upvoted' },
        { value: 'comments', label: 'Most Commented' },
        { value: 'views', label: 'Most Viewed' },
        { value: 'shares', label: 'Most Shared' }
    ];

    function updateFilter(key: string, value: string) {
        dispatch('filterChange', { [key]: value });
    }
</script>

<div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <Icon name="filter" className="w-5 h-5 mr-2 text-gray-500" />
            Filter Trending Posts
        </h3>
        <span class="text-sm text-gray-500">Find what's popular right now</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Time Range -->
        <div>
            <label for="timeRange" class="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
            <select
                id="timeRange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                value={filters.timeRange || '24h'}
                on:change={(e) => updateFilter('timeRange', (e.target as HTMLSelectElement).value)}
            >
                {#each timeRangeOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Tag Filter -->
        <div>
            <label for="tagFilter" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
                id="tagFilter"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                value={filters.tag || 'all'}
                on:change={(e) => updateFilter('tag', (e.target as HTMLSelectElement).value)}
            >
                {#each tagOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Drug Name -->
        <div>
            <label for="drugNameInput" class="block text-sm font-medium text-gray-700 mb-2">Drug Name</label>
            <input
                id="drugNameInput"
                type="text"
                placeholder="Search by drug..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                value={filters.drugName || ''}
                on:input={(e) => updateFilter('drugName', (e.target as HTMLSelectElement).value)}
            />
        </div>

        <!-- Search -->
        <div>
            <label for="searchInput" class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="w-4 h-4 text-gray-400" />
                </div>
                <input
                    id="searchInput"
                    type="text"
                    placeholder="Search posts..."
                    class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                    value={filters.searchQuery || ''}
                    on:input={(e) => updateFilter('searchQuery', (e.target as HTMLSelectElement).value)}
                />
            </div>
        </div>

        <!-- Sort -->
        <div>
            <label for="sortBySelect" class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
                id="sortBySelect"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                value={filters.sortBy || 'trending'}
                on:change={(e) => updateFilter('sortBy', (e.target as HTMLSelectElement).value)}
            >
                {#each sortOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>
    </div>
</div>