<!-- src/lib/components/resources/Downloads.svelte -->
<script lang="ts">
  interface DownloadItem {
    id: string;
    title: string;
    description: string;
    type: 'pdf' | 'ebook' | 'app' | 'guide';
    size: string;
    downloadCount: number;
    lastUpdated: string;
    downloadUrl: string;
    previewUrl?: string;
    featured: boolean;
    category: string;
  }

  let downloads: DownloadItem[] = [
    {
      id: '1',
      title: 'Medicine Safety Guide',
      description: 'A comprehensive guide covering medicine safety, storage, and identification of counterfeit drugs.',
      type: 'pdf',
      size: '2.5 MB',
      downloadCount: 1250,
      lastUpdated: '2024-03-15',
      downloadUrl: '/downloads/medicine-safety-guide.pdf',
      previewUrl: '/previews/medicine-safety-guide.jpg',
      featured: true,
      category: 'Safety Guides'
    },
    {
      id: '2',
      title: 'How to Report Suspicious Drugs',
      description: 'Step-by-step instructions for reporting counterfeit or suspicious medicines to authorities.',
      type: 'pdf',
      size: '1.8 MB',
      downloadCount: 890,
      lastUpdated: '2024-03-12',
      downloadUrl: '/downloads/report-suspicious-drugs.pdf',
      featured: true,
      category: 'Reporting'
    },
    {
      id: '3',
      title: 'Counterfeit Detection Handbook',
      description: 'Visual guide with real examples of counterfeit medicines and how to identify them.',
      type: 'ebook',
      size: '4.2 MB',
      downloadCount: 2100,
      lastUpdated: '2024-03-10',
      downloadUrl: '/downloads/counterfeit-detection-handbook.pdf',
      previewUrl: '/previews/counterfeit-handbook.jpg',
      featured: false,
      category: 'Detection'
    },
    {
      id: '4',
      title: 'Mobile App - Android',
      description: 'Download our medicine verification app for Android devices.',
      type: 'app',
      size: '15.6 MB',
      downloadCount: 5400,
      lastUpdated: '2024-03-18',
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.medverify',
      featured: true,
      category: 'Mobile Apps'
    },
    {
      id: '5',
      title: 'Mobile App - iOS',
      description: 'Download our medicine verification app for iPhone and iPad.',
      type: 'app',
      size: '18.2 MB',
      downloadCount: 3200,
      lastUpdated: '2024-03-18',
      downloadUrl: 'https://apps.apple.com/app/medverify/id123456789',
      featured: true,
      category: 'Mobile Apps'
    },
    {
      id: '6',
      title: 'Pharmacy Verification Checklist',
      description: 'Essential checklist for pharmacists to verify medicine authenticity.',
      type: 'guide',
      size: '1.2 MB',
      downloadCount: 760,
      lastUpdated: '2024-03-08',
      downloadUrl: '/downloads/pharmacy-checklist.pdf',
      featured: false,
      category: 'Professional Tools'
    },
    {
      id: '7',
      title: 'Regulatory Compliance Guide',
      description: 'Guidelines for healthcare institutions on medicine authenticity compliance.',
      type: 'pdf',
      size: '3.1 MB',
      downloadCount: 420,
      lastUpdated: '2024-03-05',
      downloadUrl: '/downloads/regulatory-compliance.pdf',
      featured: false,
      category: 'Compliance'
    },
    {
      id: '8',
      title: 'Consumer Awareness Brochure',
      description: 'Educational brochure for public awareness campaigns about medicine safety.',
      type: 'pdf',
      size: '0.8 MB',
      downloadCount: 1890,
      lastUpdated: '2024-03-01',
      downloadUrl: '/downloads/consumer-brochure.pdf',
      featured: false,
      category: 'Public Awareness'
    }
  ];

  let selectedCategory = '';
  let selectedType = '';
  let filteredDownloads: DownloadItem[] = [];

  $: {
    filteredDownloads = downloads.filter(item => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesType = !selectedType || item.type === selectedType;
      return matchesCategory && matchesType;
    });
  }

  const categories = [...new Set(downloads.map(d => d.category))];
  const types = [...new Set(downloads.map(d => d.type))];
  const featuredDownloads = downloads.filter(d => d.featured);

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function getTypeIcon(type: 'pdf' | 'ebook' | 'app' | 'guide'): string {
    const icons: Record<'pdf' | 'ebook' | 'app' | 'guide', string> = {
      'pdf': '📄',
      'ebook': '📖',
      'app': '📱',
      'guide': '📋'
    };
    return icons[type] || '📄';
  }

  function getTypeColor(type: 'pdf' | 'ebook' | 'app' | 'guide'): string {
    const colors = {
      'pdf': 'bg-red-100 text-red-800',
      'ebook': 'bg-blue-100 text-blue-800',
      'app': 'bg-green-100 text-green-800',
      'guide': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  }

  function handleDownload(item: DownloadItem) {
    // In a real app, you would track downloads
    window.open(item.downloadUrl, '_blank');
  }
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="text-center">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Downloads & Resources</h2>
    <p class="text-gray-600 max-w-2xl mx-auto">
      Access our comprehensive collection of guides, mobile apps, and educational materials to help keep you safe from counterfeit medicines.
    </p>
  </div>

  <!-- Featured Downloads -->
  <div class="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8">
    <h3 class="text-2xl font-bold text-gray-900 mb-6">Featured Downloads</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each featuredDownloads as item}
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="text-2xl">{getTypeIcon(item.type)}</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTypeColor(item.type)}">
                {item.type.toUpperCase()}
              </span>
            </div>
            <span class="text-sm text-gray-500">{item.size}</span>
          </div>
          
          <h4 class="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
          <p class="text-gray-600 text-sm mb-4">{item.description}</p>
          
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{item.downloadCount.toLocaleString()} downloads</span>
            <span>Updated {formatDate(item.lastUpdated)}</span>
          </div>
          
          <button
            on:click={() => handleDownload(item)}
            class="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Download Now
          </button>
        </div>
      {/each}
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <!-- Type Filter -->
      <div>
        <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <select
          id="type-filter"
          bind:value={selectedType}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Types</option>
          {#each types as type}
            <option value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- All Downloads -->
  <div>
    <h3 class="text-2xl font-semibold text-gray-900 mb-6">All Downloads</h3>
    <div class="space-y-4">
      {#each filteredDownloads as item}
        <div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <!-- Icon and Type -->
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {getTypeIcon(item.type)}
                </div>
              </div>
              
              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center space-x-3 mb-2">
                  <h4 class="text-lg font-semibold text-gray-900">{item.title}</h4>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTypeColor(item.type)}">
                    {item.type.toUpperCase()}
                  </span>
                  <span class="text-sm text-gray-500">{item.size}</span>
                </div>
                
                <p class="text-gray-600 mb-3">{item.description}</p>
                
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    {item.downloadCount.toLocaleString()} downloads
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                    Updated {formatDate(item.lastUpdated)}
                  </span>
                  <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Download Button -->
            <div class="flex-shrink-0 ml-4">
              <button
                on:click={() => handleDownload(item)}
                class="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  {#if filteredDownloads.length === 0}
    <div class="text-center py-12">
      <div class="text-gray-400 text-6xl mb-4">📥</div>
      <h3 class="text-xl font-medium text-gray-900 mb-2">No downloads found</h3>
      <p class="text-gray-600">Try adjusting your filter criteria.</p>
    </div>
  {/if}
</div>

<style>
  :global(.bg-primary-600) { background-color: #1a5f4a; }
  :global(.bg-primary-700) { background-color: #155743; }
  :global(.hover\:bg-primary-600:hover) { background-color: #1a5f4a; }
  :global(.hover\:bg-primary-700:hover) { background-color: #155743; }
  :global(.primary-50) { background-color: #f0f9f4; }
  :global(.primary-100) { background-color: #e8f5f0; }
  :global(.from-primary-50) { --tw-gradient-from: #f0f9f4; }
  :global(.to-primary-100) { --tw-gradient-to: #e8f5f0; }
</style>