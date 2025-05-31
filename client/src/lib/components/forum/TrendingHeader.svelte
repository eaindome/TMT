<script lang="ts">
    import Icon from '$lib/components/ui/Icon.svelte';

    export let trendingStats = {
        totalPosts: 0,
        avgGrowth: 0,
        topCategory: 'Safe',
        timeRange: '24h'
    };

    function getTimeRangeLabel(range: string) {
        switch (range) {
            case '24h': return 'Last 24 Hours';
            case 'week': return 'This Week';
            case 'month': return 'This Month';
            default: return 'Last 24 Hours';
        }
    }

    function getCategoryColor(category: string) {
        switch (category) {
            case 'Safe': return 'text-green-600';
            case 'Fake': return 'text-red-600';
            case 'Caution': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    }
</script>

<div class="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-b border-gray-200">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-center space-x-4">
                <!-- Trending Icon -->
                <div class="flex-shrink-0">
                    <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <span class="text-2xl">🔥</span>
                    </div>
                </div>
                
                <div>
                    <div class="flex items-center space-x-2 mb-2">
                        <h1 class="text-3xl font-bold text-gray-900">Trending Posts</h1>
                        <div class="flex items-center px-3 py-1 bg-orange-100 rounded-full">
                            <Icon name="trending-up" className="w-4 h-4 text-orange-600 mr-1" />
                            <span class="text-sm font-medium text-orange-700">Hot</span>
                        </div>
                    </div>
                    <p class="text-gray-600 text-lg">
                        Most popular discussions in the {getTimeRangeLabel(trendingStats.timeRange).toLowerCase()}
                    </p>
                </div>
            </div>

            <!-- Quick Stats -->
            <div class="mt-6 lg:mt-0">
                <div class="flex items-center space-x-6 text-sm">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-gray-900">{trendingStats.totalPosts}</div>
                        <div class="text-gray-600">Trending Posts</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-600">+{trendingStats.avgGrowth.toFixed(1)}%</div>
                        <div class="text-gray-600">Avg Growth</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold {getCategoryColor(trendingStats.topCategory)}">{trendingStats.topCategory}</div>
                        <div class="text-gray-600">Top Category</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Trending Metrics Bar -->
        <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div class="flex items-center">
                    <Icon name="fire" className="w-5 h-5 text-orange-500 mr-2" />
                    <div>
                        <div class="text-sm text-gray-600">Hottest Topic</div>
                        <div class="font-semibold text-gray-900">Counterfeit Alerts</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div class="flex items-center">
                    <Icon name="chat" className="w-5 h-5 text-blue-500 mr-2" />
                    <div>
                        <div class="text-sm text-gray-600">Most Discussed</div>
                        <div class="font-semibold text-gray-900">Safety Guidelines</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div class="flex items-center">
                    <Icon name="heart" className="w-5 h-5 text-red-500 mr-2" />
                    <div>
                        <div class="text-sm text-gray-600">Most Loved</div>
                        <div class="font-semibold text-gray-900">Educational Content</div>
                    </div>
                </div>
            </div>
            
            <div class="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div class="flex items-center">
                    <Icon name="share" className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                        <div class="text-sm text-gray-600">Most Shared</div>
                        <div class="font-semibold text-gray-900">Research Updates</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>