<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { onMount } from 'svelte';
  import { fly, fade } from 'svelte/transition';
  
  let isVisible = false;
  let showBadges = false;
  
  onMount(() => {
    setTimeout(() => {
      isVisible = true;
    }, 100);
    
    setTimeout(() => {
      showBadges = true;
    }, 900);
  });
</script>

<section class="relative overflow-hidden py-10 md:py-16 lg:py-24">
  <!-- Background elements -->
  <div class="absolute inset-0 bg-gradient-to-br from-[#1a5f4a]/10 to-[#0288d1]/10 z-0"></div>
  <div class="absolute top-20 right-20 w-72 h-72 bg-[#4caf50]/15 rounded-full blur-3xl -z-10"></div>
  <div class="absolute bottom-10 left-10 w-64 h-64 bg-[#0288d1]/15 rounded-full blur-3xl -z-10"></div>
  
  <!-- Pattern overlay -->
  <div class="absolute inset-0 opacity-5 z-0">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <pattern id="dots-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.5" fill="#1a5f4a" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  </div>
  
  <div class="container mx-auto px-4 z-10 relative pt-12">
    <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
      <!-- Left side: Content -->
      <div class="lg:w-1/2">
        {#if isVisible}
          <div in:fly={{ y: 30, duration: 800, delay: 200 }} class="max-w-xl">
            <div class="mb-6 inline-block" in:fly={{ y: 20, duration: 600, delay: 300 }}>
              <span class="bg-[#1a5f4a]/10 text-[#1a5f4a] text-sm font-medium px-4 py-1.5 rounded-full inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                AI-Powered Authentication
              </span>
            </div>
            
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4" in:fly={{ y: 20, duration: 700, delay: 500 }}>
              <span class="text-[#1a5f4a]">Verify Medicine</span> <br />
              In Seconds With AI
            </h1>
            
            <p class="text-lg md:text-xl text-gray-600 mb-8" in:fly={{ y: 20, duration: 700, delay: 700 }}>
              Protect yourself and loved ones from counterfeit medications. 
              Our AI instantly scans packaging, barcodes, and pills to verify authenticity.
            </p>
            
            <div class="flex flex-wrap gap-4 mb-10" in:fly={{ y: 20, duration: 700, delay: 900 }}>
              <Button primary={true} size="lg">
                <span class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  Scan Medicine
                </span>
              </Button>
              <Button primary={false} size="lg">
                <span class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                  </svg>
                  Learn More
                </span>
              </Button>
            </div>
            
            <div class="flex items-center gap-6 flex-wrap" in:fly={{ y: 20, duration: 700, delay: 1100 }}>
              <div class="flex items-center gap-3">
                <div class="flex -space-x-2">
                  {#each Array(3) as _, i}
                    <div class="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-md flex items-center justify-center" 
                        style="background-color: {['#4caf50', '#0288d1', '#f4b400'][i]};">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        {#if i === 0}
                          <!-- User/person icon -->
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        {:else if i === 1}
                          <!-- Shield/security icon -->
                          <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z" clip-rule="evenodd" />
                        {:else}
                          <!-- Medical/pill icon -->
                          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                        {/if}
                      </svg>
                    </div>
                  {/each}
                </div>
                <p class="text-sm text-gray-600">
                  <span class="font-semibold">Database-Ready</span> for thousands of medicines
                </p>
              </div>
              
              <div class="h-8 w-px bg-gray-200"></div>
              
              <div class="flex items-center gap-2">
                <div class="flex items-center justify-center w-6 h-6 bg-[#f4b400]/20 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#f4b400]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-sm text-gray-600">
                  <span class="font-semibold">Beta Testing</span> in progress
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Right side: App Preview -->
      <div class="lg:w-1/2 mt-12 lg:mt-0">
        {#if isVisible}
          <div class="relative" in:fly={{ y: 30, duration: 800, delay: 500 }}>
            <!-- Phone mockup with app -->
            <div class="relative z-10 mx-auto max-w-sm">
              <div class="relative">
                <img 
                  src="/images/phone-mockup.png" 
                  alt="TrustMyTablet App" 
                  class="w-full drop-shadow-2xl"
                />
                
                <!-- App screen overlay (optional) -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/app-screen.png" 
                    alt="App Interface" 
                    class="w-[92%] h-[92%] mt-[4%] rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>
            
            <!-- Floating elements -->
            <div class="absolute -top-10 -left-20 z-20 hidden md:block" in:fly={{ y: 20, x: -10, duration: 800, delay: 900 }}>
              <div class="bg-white rounded-lg shadow-xl p-3 flex items-center gap-3 w-56">
                <div class="w-10 h-10 bg-[#4caf50]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800">Medicine Verified</p>
                  <p class="text-xs text-gray-500">Original product confirmed</p>
                </div>
              </div>
            </div>
            
            <div class="absolute top-1/2 -right-12 z-20 hidden md:block" in:fly={{ y: -20, x: 10, duration: 800, delay: 1100 }}>
              <div class="bg-white rounded-lg shadow-xl p-3 flex items-center gap-3 w-48">
                <div class="w-10 h-10 bg-[#f4b400]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#f4b400]" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-800">Expiration Check</p>
                  <p class="text-xs text-gray-500">Valid until Jun 2026</p>
                </div>
              </div>
            </div>
            
            <!-- Background elements -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#4caf50]/15 rounded-full blur-3xl -z-10"></div>
            <div class="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0288d1]/15 rounded-full blur-2xl -z-10"></div>
          </div>
          
          <!-- Trust badges -->
          {#if showBadges}
            <div class="flex flex-wrap justify-center gap-4 mt-12" in:fly={{ y: 20, duration: 700, delay: 1300 }}>
              <div class="flex items-center gap-2 bg-white py-2.5 px-5 rounded-full shadow-md border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">AI-Powered Analysis</span>
              </div>
              <div class="flex items-center gap-2 bg-white py-2.5 px-5 rounded-full shadow-md border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0288d1]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">Developed with Pharmacists</span>
              </div>
              <div class="flex items-center gap-2 bg-white py-2.5 px-5 rounded-full shadow-md border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#1a5f4a]" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm font-medium">FDA Guidelines Aligned</span>
              </div>
            </div>
          {/if}
        {/if}
      </div>
    </div>
  </div>
</section>