<script lang="ts">
  import { onMount } from 'svelte';
  
  const features = [
    {
      icon: 'camera',
      title: 'AI-Powered Scan',
      description: 'Our advanced AI engine analyzes medicine packaging, QR codes, and barcodes to detect counterfeits with industry-leading accuracy.',
      color: '#1a5f4a'
    },
    {
      icon: 'shield',
      title: 'Visual Alerts',
      description: 'Clear color-coded results tell you if your medicine is safe, suspicious, or fake in seconds.',
      color: '#4caf50'
    },
    {
      icon: 'history',
      title: 'Verification Records',
      description: 'Build a searchable history of all your scans for future reference and peace of mind.',
      color: '#0288d1'
    },
    {
      icon: 'users',
      title: 'Role-Based Interface',
      description: "Whether you're a consumer, healthcare professional, or regulator, the app adapts to your specific needs.",
      color: '#607d8b'
    },
    {
      icon: 'star',
      title: 'Premium Features',
      description: 'Access batch scanning, advanced analytics, and early counterfeit alerts with our premium subscription.',
      color: '#f4b400'
    },
    {
      icon: 'map',
      title: 'Trusted Pharmacies',
      description: "Find verified pharmacies near you to ensure you're always getting authentic medicine.",
      color: '#d32f2f'
    }
  ];
  
  // Improved staggered animation with separate arrays for elements and their visibility states
  let featureElements: HTMLElement[] = [];
  let isVisible = Array(features.length).fill(false);
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = featureElements.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setTimeout(() => {
              isVisible[index] = true;
            }, index * 100); // staggered delay
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    featureElements.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  });
</script>

<section class="py-16 md:py-24 bg-white relative overflow-hidden" id="features">
  <!-- Background decoration elements -->
  <div class="absolute inset-0 pointer-events-none opacity-10">
    <!-- Abstract geometric shapes -->
    <div class="absolute left-0 top-20 w-40 h-40 rounded-full bg-[#1a5f4a]/20"></div>
    <div class="absolute right-10 bottom-20 w-60 h-60 rounded-full bg-[#0288d1]/10"></div>
    <div class="absolute right-1/4 top-1/4 w-20 h-20 rounded-full bg-[#4caf50]/15"></div>
    
    <!-- Grid pattern -->
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" class="opacity-5">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a5f4a" stroke-width="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <span class="inline-block py-1 px-3 rounded-full bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-medium mb-4">KEY CAPABILITIES</span>
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-5">
        Powerful Features to <span class="text-[#1a5f4a] relative">
          Keep You Safe
          <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,5 Q50,0 100,5 T200,5" stroke="#1a5f4a" stroke-width="2" fill="none" stroke-linecap="round" />
          </svg>
        </span>
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Our app combines cutting-edge AI technology with user-friendly design to help you verify medicine authenticity in seconds.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {#each features as feature, i}
        <div 
          class="feature-card bg-[#f5f5f5] rounded-xl p-6 md:p-7 transition-all duration-500 h-full border border-transparent hover:border-[#1a5f4a]/10"
          class:feature-visible={isVisible[i]}
          bind:this={featureElements[i]}
        >
          <div class="flex items-start">
            <!-- Improved icon container with gradient and subtle shadow -->
            <div 
              class="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center mr-5 transition-transform duration-300 feature-icon-container"
              style="background: linear-gradient(135deg, {feature.color}20, {feature.color}30);"
            >
              {#if feature.icon === 'camera'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              {:else if feature.icon === 'shield'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              {:else if feature.icon === 'history'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              {:else if feature.icon === 'users'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              {:else if feature.icon === 'star'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              {:else if feature.icon === 'map'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" style="color: {feature.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              {/if}
            </div>
            
            <!-- Feature content with improved typography -->
            <div class="flex-1">
              <h3 class="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p class="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- "Explore All Features" button -->
    <!-- <div class="mt-12 text-center">
      <a href="#" class="inline-flex items-center justify-center py-3 px-6 rounded-full bg-[#1a5f4a] text-white hover:bg-[#1a5f4a]/90 transition-all duration-300 shadow-sm hover:shadow-md group">
        <span>Explore All Features</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div> -->
  </div>
</section>

<style>
  /* Enhanced card styling */
  .feature-card {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
    opacity: 0;
    transform: translateY(30px);
  }
  
  .feature-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .feature-card:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
    background-color: white;
  }
  
  /* Icon container animation */
  .feature-card:hover .feature-icon-container {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* Make sure the feature cards have consistent height within rows */
  @media (min-width: 768px) {
    .feature-card {
      display: flex;
      flex-direction: column;
    }
  }
</style>