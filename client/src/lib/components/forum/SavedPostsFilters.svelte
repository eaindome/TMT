<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';
    
    interface Filters {
        searchQuery?: string;
        folder?: string;
        tag?: string;
        postStatus?: string;
        sortBy?: string;
        [key: string]: any;
    }

    export let filters: Filters = {};
    export let savedPosts: Array<{ folder?: string; [key: string]: any }> = [];
    const dispatch = createEventDispatcher();

    const tagOptions = [
        { value: 'all', label: 'All Tags' },
        { value: 'Safe', label: 'Safe' },
        { value: 'Fake', label: 'Fake' },
        { value: 'Caution', label: 'Caution' }
    ];

    const statusOptions = [
        { value: 'all', label: 'All Posts' },
        { value: 'active', label: 'Active Posts' },
        { value: 'locked', label: 'Locked Posts' },
        { value: 'archived', label: 'Archived Posts' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Recently Saved' },
        { value: 'oldest', label: 'Oldest Saved' },
        { value: 'most-upvoted', label: 'Most Upvoted' },
        { value: 'most-viewed', label: 'Most Viewed' },
        { value: 'most-commented', label: 'Most Comments' }
    ];

    // Get unique folders from saved posts
    $: folderOptions = [
        { value: 'all', label: 'All Folders' },
        ...Array.from(new Set(savedPosts.map(post => post.folder).filter(Boolean)))
            .map(folder => ({ value: folder, label: folder }))
    ];

    function updateFilter(key: string, value: any) {
        dispatch('filterChange', { [key]: value });
    }
</script>

<div class="bg-white rounded-lg border border-gray-200 p-4">
    <div class="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
        <!-- Search -->
        <div class="flex-1">
            <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="w-4 h-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search saved posts..."
                    class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                    value={filters.searchQuery || ''}
                    on:input={(e) => updateFilter('searchQuery', (e.target as HTMLSelectElement).value)}
                />
            </div>
        </div>

        <!-- Folder Filter -->
        {#if folderOptions.length > 1}
            <div class="lg:w-40">
                <select
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                    value={filters.folder || 'all'}
                    on:change={(e) => updateFilter('folder', (e.target as HTMLSelectElement).value)}
                >
                    {#each folderOptions as option}
                        <option value={option.value}>{option.label}</option>
                    {/each}
                </select>
            </div>
        {/if}

        <!-- Tag Filter -->
        <div class="lg:w-32">
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                value={filters.tag || 'all'}
                on:change={(e) => updateFilter('tag', (e.target as HTMLSelectElement).value)}
            >
                {#each tagOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Status Filter -->
        <div class="lg:w-36">
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] outline-none"
                value={filters.postStatus || 'all'}
                on:change={(e) => updateFilter('postStatus', (e.target as HTMLSelectElement).value)}
            >
                {#each statusOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <!-- Sort -->
        <div class="lg:w-44">
            <select
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