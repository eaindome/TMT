<script lang="ts">
    import Icon from '$lib/components/ui/Icon.svelte';

    export let discussionStats = {
        total: 0,
        thisWeek: 0,
        totalUpvotes: 0,
        totalReplies: 0
    };
</script>

<div class="bg-white border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 flex items-center">
                    <Icon name="comments" className="w-6 h-6 mr-3 text-[#1a5f4a]" />
                    My Discussions
                </h1>
                <p class="mt-1 text-sm text-gray-600">Track your comments and engagements across the community</p>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="chat" className="w-5 h-5 text-gray-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-600">Total Comments</p>
                        <p class="text-lg font-semibold text-gray-900">{discussionStats.total}</p>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="calendar" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-blue-600">This Week</p>
                        <p class="text-lg font-semibold text-blue-900">{discussionStats.thisWeek}</p>
                    </div>
                </div>
            </div>

            <div class="bg-red-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="heart" className="w-5 h-5 text-red-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-600">Total Upvotes</p>
                        <p class="text-lg font-semibold text-red-900">{discussionStats.totalUpvotes}</p>
                    </div>
                </div>
            </div>

            <div class="bg-green-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="reply" className="w-5 h-5 text-green-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-600">Total Replies</p>
                        <p class="text-lg font-semibold text-green-900">{discussionStats.totalReplies}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>