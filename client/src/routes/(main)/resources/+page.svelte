<!-- src/routes/resources/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import PageHeader from '$lib/components/resources/PageHeader.svelte';
  import PharmacyDirectory from '$lib/components/resources/PharmacyDirectory.svelte';
  import EducationalArticles from '$lib/components/resources/EducationalArticles.svelte';
  import Downloads from '$lib/components/resources/Downloads.svelte';
  import ExternalLinks from '$lib/components/resources/ExternalLinks.svelte';
  import CommunityHighlights from '$lib/components/resources/CommunityHighlights.svelte';
  import ResourceCard from '$lib/components/resources/ResourceCard.svelte';

  let activeSection = 'directory';
  
  const sections = [
    { id: 'directory', label: 'Pharmacy Directory', icon: '🏥' },
    { id: 'articles', label: 'Educational Articles', icon: '📚' },
    { id: 'downloads', label: 'Downloads', icon: '📥' },
    { id: 'links', label: 'External Links', icon: '🔗' },
    { id: 'community', label: 'Community', icon: '👥' }
  ];

  onMount(() => {
    // Set active section based on URL hash or default
    const hash = window.location.hash.slice(1);
    if (hash && sections.find(s => s.id === hash)) {
      activeSection = hash;
    }
  });

  function setActiveSection(sectionId: string) {
    activeSection = sectionId;
    window.history.replaceState(null, '', `#${sectionId}`);
  }
</script>

<svelte:head>
  <title>Resources - Fake Medicine Detection</title>
  <meta name="description" content="Access trusted pharmacy directories, educational materials, and resources for medicine authenticity verification." />
</svelte:head>

<div class="min-h-screen bg-neutral-50">
  <!-- Page Header -->
  <PageHeader 
    title="Resources & Information"
    subtitle="Your trusted source for medicine safety education and verified pharmacy listings"
    bgGradient="from-primary-600 to-primary-700"
  />

  <!-- Navigation Tabs -->
  <div class="bg-white shadow-sm max-w-[1210px] mx-auto rounded-xl border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex space-x-8 overflow-x-auto py-4">
        {#each sections as section}
          <button
            class="flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors duration-200 {
              activeSection === section.id 
                ? 'bg-primary-100 text-primary-700 border-2 border-primary-200' 
                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
            }"
            on:click={() => setActiveSection(section.id)}
          >
            <span class="text-lg">{section.icon}</span>
            <span class="font-medium">{section.label}</span>
          </button>
        {/each}
      </nav>
    </div>
  </div>

  <!-- Main Content -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {#if activeSection === 'directory'}
      <PharmacyDirectory />
    {:else if activeSection === 'articles'}
      <EducationalArticles />
    {:else if activeSection === 'downloads'}
      <Downloads />
    {:else if activeSection === 'links'}
      <ExternalLinks />
    {:else if activeSection === 'community'}
      <CommunityHighlights />
    {/if}
  </div>
</div>

<style>
  :global(.primary-600) { color: #1a5f4a; }
  :global(.primary-700) { color: #155743; }
  :global(.primary-100) { background-color: #e8f5f0; }
  :global(.primary-200) { border-color: #c6e9d9; }
  :global(.text-primary-600) { color: #1a5f4a; }
  :global(.text-primary-700) { color: #155743; }
  :global(.bg-primary-100) { background-color: #e8f5f0; }
  :global(.hover\:text-primary-600:hover) { color: #1a5f4a; }
  :global(.border-primary-200) { border-color: #c6e9d9; }
  :global(.from-primary-600) { --tw-gradient-from: #1a5f4a; }
  :global(.to-primary-700) { --tw-gradient-to: #155743; }
  :global(.neutral-50) { background-color: #f5f5f5; }
</style>