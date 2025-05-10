<script lang="ts">
  import { onMount } from 'svelte';

  const steps = [
    {
      number: '01',
      title: 'Scan the Medicine',
      description: 'Take a photo of your medicine packaging, barcode, or QR code using our easy-to-use scanner.',
      icon: 'camera',
      color: '#1a5f4a'
    },
    {
      number: '02',
      title: 'AI Analysis',
      description: 'Our advanced AI technology analyzes the scan against our database of verified medicines.',
      icon: 'brain',
      color: '#4caf50'
    },
    {
      number: '03',
      title: 'Get Instant Results',
      description: 'Receive clear, color-coded verification results that tell you if your medicine is safe to use.',
      icon: 'check',
      color: '#0288d1'
    },
    {
      number: '04',
      title: 'Take Action',
      description: 'Find trusted pharmacies nearby if needed or report counterfeit medicine to help others.',
      icon: 'map-marker',
      color: '#607d8b'
    }
  ];
  
  let isInView = false;
  let container: HTMLElement;
  
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isInView = true;
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    
    if (container) {
      observer.observe(container);
    }
    
    return () => observer.disconnect();
  });
</script>

<section class="py-16 md:py-24 bg-white relative overflow-hidden" bind:this={container} id="how-it-works">
  <!-- Animated Lines - Improved with more subtle animations -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
    <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <path 
        d="M0,50 Q25,20 50,50 T100,50" 
        stroke="#1a5f4a" 
        stroke-width="0.15" 
        fill="none" 
        stroke-dasharray="3,3"
        class="path-animation"
      />
      <path 
        d="M0,60 Q35,30 50,60 T100,60" 
        stroke="#4caf50" 
        stroke-width="0.15" 
        fill="none" 
        stroke-dasharray="3,3"
        class="path-animation"
        style="animation-delay: 1s"
      />
      <path 
        d="M0,40 Q15,70 50,40 T100,40" 
        stroke="#0288d1" 
        stroke-width="0.15" 
        fill="none" 
        stroke-dasharray="3,3"
        class="path-animation"
        style="animation-delay: 2s"
      />
      <path 
        d="M0,45 Q40,80 70,45 T100,45" 
        stroke="#607d8b" 
        stroke-width="0.15" 
        fill="none" 
        stroke-dasharray="3,3"
        class="path-animation-reverse"
        style="animation-delay: 0.5s"
      />
    </svg>
  </div>

  <div class="container mx-auto px-4 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
        <span class="text-[#1a5f4a]">How It Works</span>
        <span class="h-px bg-[#1a5f4a] flex-grow max-w-24 hidden sm:block opacity-40"></span>
        <span class="text-[#607d8b]">Simple & Fast</span>
      </h2>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Verifying your medicine is a quick, easy, four-step process that takes seconds to complete for your safety and peace of mind.
      </p>
    </div>
    
    <!-- Steps with improved cards and connection indicators -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {#each steps as step, i}
        <div 
          class="relative bg-[#f5f5f5] rounded-xl p-6 shadow-sm transition-all duration-700 ease-out hover:shadow-md group"
          style="transition-delay: {i * 150}ms; transform: translateY({isInView ? '0' : '40px'}); opacity: {isInView ? '1' : '0'};"
        >
          <!-- Step number circle with improved sizing and animation -->
          <div 
            class="absolute -top-4 -left-4 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style="background-color: {step.color};"
          >
            {step.number}
          </div>
          
          <!-- Step icon with improved animation -->
          <div class="mb-4 pt-4 md:pt-6 ml-1 transition-transform duration-300 transform group-hover:translate-y-1">
            {#if step.icon === 'camera'}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#1a5f4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            {:else if step.icon === 'brain'}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#4caf50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            {:else if step.icon === 'check'}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#0288d1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {:else if step.icon === 'map-marker'}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-[#607d8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            {/if}
          </div>
          
          <!-- Step content with improved typography -->
          <h3 class="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
          <p class="text-gray-600 leading-relaxed">{step.description}</p>
          
          <!-- Improved connection line with animation -->
          {#if i < steps.length - 1}
            <div class="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 transition-opacity duration-300">
              <!-- Arrow pointing to next step -->
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke={step.color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Demo video section with improved styling -->
    <div class="mt-16 max-w-4xl mx-auto bg-gradient-to-br from-[#1a5f4a]/5 to-[#0288d1]/5 rounded-xl p-6 md:p-8 overflow-hidden shadow-sm">
      <div class="md:flex items-center gap-8">
        <!-- Video container with improved styling -->
        <div class="aspect-w-16 aspect-h-9 mb-6 md:mb-0 md:flex-1 rounded-lg overflow-hidden relative border border-[#1a5f4a]/20 shadow-md">
          <!-- Video placeholder overlay with improved UI -->
          <div class="absolute inset-0 flex items-center justify-center bg-black/40">
            <div class="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
              <!-- Pulsing animation -->
              <div class="w-20 h-20 rounded-full bg-[#1a5f4a] bg-opacity-20 flex items-center justify-center animate-ping absolute inset-0"></div>
              <!-- Button background -->
              <div class="w-20 h-20 rounded-full bg-[#1a5f4a] bg-opacity-80 flex items-center justify-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <!-- Placeholder image with better handling -->
          <img 
            src="/assets/images/app-preview.jpg" 
            alt="App Demo" 
            class="absolute inset-0 w-full h-full object-cover"
            on:error={(event) => {
              const img = event.target as HTMLImageElement;
              img.onerror = null;
              img.src = '/api/placeholder/640/360';
              img.alt = 'App Demo Placeholder';
            }}
          />
        </div>
        
        <!-- Text content with better structure -->
        <div class="md:flex-1 text-center md:text-left">
          <h3 class="text-2xl font-semibold mb-3 text-[#1a5f4a]">See the App in Action</h3>
          <p class="text-gray-700 mb-4 leading-relaxed">Watch our quick demo to see how easy it is to verify your medicine and protect yourself from counterfeit drugs.</p>
          <button class="inline-flex items-center justify-center px-6 py-3 bg-[#1a5f4a] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#1a5f4a]/90 hover:shadow-md group">
            <span>Watch the full demo</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .path-animation {
    animation: dash 40s linear infinite;
  }
  
  .path-animation-reverse {
    animation: dash-reverse 40s linear infinite;
  }
  
  @keyframes dash {
    to {
      stroke-dashoffset: 100;
    }
  }
  
  @keyframes dash-reverse {
    from {
      stroke-dashoffset: 100;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
  
  /* Ensure aspect ratio works in all browsers */
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%;
  }
  
  .aspect-w-16 > * {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>