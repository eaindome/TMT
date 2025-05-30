<script lang="ts">
    import Icon from '$lib/components/ui/Icon.svelte';

    export let activityStats = {
        total: 0,
        today: 0,
        thisWeek: 0,
        byType: {
            posts: 0,
            comments: 0,
            upvotes: 0,
            bookmarks: 0
        }
    };
</script>

<div class="bg-white border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 flex items-center">
                    <Icon name="clock" className="w-6 h-6 mr-3 text-[#1a5f4a]" />
                    Recent Activity
                </h1>
                <p class="mt-1 text-sm text-gray-600">Your timeline of forum interactions and contributions</p>
            </div>
        </div>

        <!-- Stats Grid -->
        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="activity" className="w-5 h-5 text-gray-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-600">Total</p>
                        <p class="text-lg font-semibold text-gray-900">{activityStats.total}</p>
                    </div>
                </div>
            </div>

            <div class="bg-blue-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="sun" className="w-5 h-5 text-blue-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-blue-600">Today</p>
                        <p class="text-lg font-semibold text-blue-900">{activityStats.today}</p>
                    </div>
                </div>
            </div>

            <div class="bg-green-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <Icon name="calendar" className="w-5 h-5 text-green-600" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-green-600">This Week</p>
                        <p class="text-lg font-semibold text-green-900">{activityStats.thisWeek}</p>
                    </div>
                </div>
            </div>

            <div class="bg-purple-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-lg">📝</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-purple-600">Posts</p>
                        <p class="text-lg font-semibold text-purple-900">{activityStats.byType.posts}</p>
                    </div>
                </div>
            </div>

            <div class="bg-orange-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-lg">💬</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-orange-600">Comments</p>
                        <p class="text-lg font-semibold text-orange-900">{activityStats.byType.comments}</p>
                    </div>
                </div>
            </div>

            <div class="bg-red-50 rounded-lg p-4">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-lg">❤️</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-600">Upvotes</p>
                        <p class="text-lg font-semibold text-red-900">{activityStats.byType.upvotes}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>