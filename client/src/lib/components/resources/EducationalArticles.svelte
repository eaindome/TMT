<!-- src/lib/components/resources/EducationalArticles.svelte -->
<script lang="ts">
  interface Article {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishDate: string;
    featured: boolean;
    author: string;
    tags: string[];
  }

  let articles: Article[] = [
    {
      id: '1',
      title: 'What is Counterfeit Medicine? A Comprehensive Guide',
      excerpt: 'Learn about the dangers of counterfeit medicines, how they\'re made, and why they pose a serious threat to global health.',
      category: 'Safety',
      readTime: '8 min read',
      publishDate: '2024-03-15',
      featured: true,
      author: 'Dr. Sarah Johnson',
      tags: ['counterfeit', 'safety', 'awareness']
    },
    {
      id: '2',
      title: 'How Our AI Detection Technology Works',
      excerpt: 'Discover the advanced machine learning algorithms that power our medicine authenticity detection system.',
      category: 'Technology',
      readTime: '12 min read',
      publishDate: '2024-03-10',
      featured: true,
      author: 'Tech Team',
      tags: ['AI', 'technology', 'detection']
    },
    {
      id: '3',
      title: 'Spotting Fake Packaging: A Visual Guide',
      excerpt: 'Learn to identify common signs of counterfeit medicine packaging with real examples and expert tips.',
      category: 'Guide',
      readTime: '6 min read',
      publishDate: '2024-03-08',
      featured: false,
      author: 'Dr. Michael Chen',
      tags: ['packaging', 'identification', 'guide']
    },
    {
      id: '4',
      title: 'The Global Impact of Counterfeit Medicines',
      excerpt: 'Understanding the worldwide health and economic consequences of fake medicines in developing and developed countries.',
      category: 'Research',
      readTime: '15 min read',
      publishDate: '2024-03-05',
      featured: false,
      author: 'Research Team',
      tags: ['global health', 'research', 'impact']
    },
    {
      id: '5',
      title: 'Regulatory Guidelines for Medicine Authentication',
      excerpt: 'A comprehensive overview of international and local regulations governing medicine authenticity verification.',
      category: 'Regulation',
      readTime: '10 min read',
      publishDate: '2024-03-01',
      featured: false,
      author: 'Legal Team',
      tags: ['regulation', 'compliance', 'guidelines']
    },
    {
      id: '6',
      title: 'Best Practices for Safe Medicine Purchase',
      excerpt: 'Essential tips for consumers on how to safely purchase medicines both online and from physical pharmacies.',
      category: 'Safety',
      readTime: '7 min read',
      publishDate: '2024-02-28',
      featured: false,
      author: 'Dr. Amanda Williams',
      tags: ['safety', 'purchasing', 'consumer tips']
    }
  ];

  let selectedCategory = '';
  let searchQuery = '';
  let filteredArticles: Article[] = [];

  $: {
    filteredArticles = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  const categories = [...new Set(articles.map(a => a.category))];
  const featuredArticles = articles.filter(a => a.featured);

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'Safety': 'bg-red-100 text-red-800',
      'Technology': 'bg-blue-100 text-blue-800',
      'Guide': 'bg-green-100 text-green-800',
      'Research': 'bg-purple-100 text-purple-800',
      'Regulation': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Educational Articles & Guides</h2>
    <p class="text-gray-600 max-w-2xl mx-auto">
      Stay informed with our comprehensive collection of articles about medicine safety, counterfeit detection, and health awareness.
    </p>
  </div>

  <!-- Featured Articles -->
  <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each featuredArticles as article}
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div class="flex items-center justify-between mb-3">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {getCategoryColor(article.category)}">
              {article.category}
            </span>
            <span class="text-sm text-gray-500">{article.readTime}</span>
          </div>
          
          <h4 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{article.title}</h4>
          <p class="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
          
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              <span>By {article.author}</span>
              <span class="mx-2">•</span>
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Read More →
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Search and Filter -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Search -->
      <div>
        <label for="article-search" class="block text-sm font-medium text-gray-700 mb-2">
          Search Articles
        </label>
        <input
          id="article-search"
          type="text"
          bind:value={searchQuery}
          placeholder="Search by title, content, or tags..."
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <!-- Category Filter -->
      <div>
        <label for="category-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          id="category-filter"
          bind:value={selectedCategory}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- All Articles -->
  <div>
    <h3 class="text-2xl font-semibold text-gray-900 mb-6">All Articles</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredArticles as article}
        <article class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
          <div class="p-6">
            <!-- Category and Read Time -->
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getCategoryColor(article.category)}">
                {article.category}
              </span>
              <span class="text-sm text-gray-500">{article.readTime}</span>
            </div>

            <!-- Title -->
            <h4 class="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 cursor-pointer">
              {article.title}
            </h4>

            <!-- Excerpt -->
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              {#each article.tags.slice(0, 3) as tag}
                <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                  #{tag}
                </span>
              {/each}
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
              <div class="text-xs text-gray-500">
                <div>{article.author}</div>
                <div>{formatDate(article.publishDate)}</div>
              </div>
              <button class="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
                Read Article
              </button>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>

  {#if filteredArticles.length === 0}
    <div class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">📚</div>
      <h3 class="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
      <p class="text-gray-600">Try adjusting your search terms or category filter.</p>
    </div>
  {/if}
</div>

<style>
  :global(.primary-50) { background-color: #f0f9f4; }
  :global(.primary-100) { background-color: #e8f5f0; }
  :global(.from-primary-50) { --tw-gradient-from: #f0f9f4; }
  :global(.to-primary-100) { --tw-gradient-to: #e8f5f0; }
  :global(.text-primary-600) { color: #1a5f4a; }
  :global(.text-primary-700) { color: #155743; }
  :global(.hover\:text-primary-600:hover) { color: #1a5f4a; }
  :global(.hover\:text-primary-700:hover) { color: #155743; }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>