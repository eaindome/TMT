<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import Icon from '$lib/components/ui/Icon.svelte';

    export let savedStats = {
        total: 0,
        unread: 0,
        thisWeek: 0,
        folders: 0
    };
    
    const dispatch = createEventDispatcher();

    function handleCreateFolder() {
        dispatch('createFolder');
    }
</script>

<div class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 flex items-center">
                    <Icon name="collection" className="w-6 h-6 mr-3 text-[#1a5f4a]" />
                    Saved Posts
                    {#if savedStats.unread > 0}
                        <span class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1a5f4a] text-white">
                            {savedStats.unread} new
                        </span>
                    {/if}
                </h1>
                <p class="mt-1 text-sm text-gray-600">Your bookmarked posts and important discussions</p>
            </div>
            
            <div class="mt-4 lg:mt-0 flex items-center space-x-3">
                <button
                    on:click={handleCreateFolder}
                    class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    <Icon name="folder-add" className="w-4 h-4 mr-2" />
                    New Folder
                </button>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="collection" className="w-5 h-5 text-gray-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-600">Total Saved</p>
                        <p class="text-lg font-semibold text-gray-900">{savedStats.total}</p>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="sparkles" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-blue-600">New This Week</p>
                        <p class="text-lg font-semibold text-blue-900">{savedStats.thisWeek}</p>
                    </div>
                </div>
            </div>

            <div class="bg-yellow-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="eye" className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-yellow-600">Unread</p>
                        <p class="text-lg font-semibold text-yellow-900">{savedStats.unread}</p>
                    </div>
                </div>
            </div>

            <div class="bg-green-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="folder" className="w-5 h-5 text-green-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-600">Folders</p>
                        <p class="text-lg font-semibold text-green-900">{savedStats.folders}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>