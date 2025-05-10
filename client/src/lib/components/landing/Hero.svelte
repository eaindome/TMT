<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { onMount } from 'svelte';
    
    let isVisible = false;
    
    onMount(() => {
      setTimeout(() => {
        isVisible = true;
      }, 100);
    });
  </script>
  
  <section class="relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#1a5f4a]/5 to-[#0288d1]/5 z-0"></div>
    
    <div class="container mx-auto px-4 py-16 md:py-24 z-10 relative">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
        <!-- Left side: Content -->
        <div 
          class="lg:w-1/2 transition-all duration-700 transform {isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}"
        >
          <div class="max-w-xl">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
              <span class="text-[#1a5f4a]">Verify Medicine</span> <br />
              In Seconds With AI
            </h1>
            
            <p class="text-lg md:text-xl text-gray-600 mb-8">
              Protect yourself from counterfeit medicine with our powerful 
              AI-driven verification app. Scan, verify, and stay safe.
            </p>
            
            <div class="flex flex-wrap gap-4">
              <Button primary={true} size="lg">
                <span class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  Scan Medicine
                </span>
              </Button>
              <Button primary={false} size="lg">Learn More</Button>
            </div>
            
            <div class="mt-8 flex items-center gap-3">
              <div class="flex -space-x-2">
                <img class="w-8 h-8 rounded-full border-2 border-white" src="/assets/images/user-1.jpg" alt="User" />
                <img class="w-8 h-8 rounded-full border-2 border-white" src="/assets/images/user-2.jpg" alt="User" />
                <img class="w-8 h-8 rounded-full border-2 border-white" src="/assets/images/user-3.jpg" alt="User" />
              </div>
              <p class="text-sm text-gray-600">
                <span class="font-semibold">100,000+</span> verified medicines this month
              </p>
            </div>
          </div>
        </div>
        
        <!-- Right side: App Preview -->
        <div 
          class="lg:w-1/2 transition-all duration-700 delay-300 transform {isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}"
        >
          <div class="relative">
            <!-- Phone frame -->
            <div class="relative z-10 mx-auto max-w-xs">
              <img 
                src="/assets/images/phone-mockup.png" 
                alt="TrustMyTablet App" 
                class="w-full drop-shadow-2xl"
              />
            </div>
            
            <!-- Background elements -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4caf50]/20 rounded-full blur-3xl -z-10"></div>
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-[#0288d1]/20 rounded-full blur-2xl -z-10"></div>
          </div>
          
          <!-- Trust badges -->
          <div class="flex flex-wrap justify-center gap-6 mt-8">
            <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#4caf50]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-medium">99.8% Accuracy</span>
            </div>
            <div class="flex items-center gap-2 bg-white/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[#0288d1]" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-medium">Trusted by Pharmacists</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>