<script>
    // Import necessary components or utilities
    import { onMount } from 'svelte';
    
    // Track if user has already interacted with CTA
    let hasInteracted = false;
    
    // For email input form
    let email = '';
    let isEmailValid = true;
    let isSubmitting = false;
    let submitSuccess = false;
    
    // Platform options
    const platforms = [
      { id: 'ios', name: 'iOS', icon: 'apple' },
      { id: 'android', name: 'Android', icon: 'android' },
      { id: 'web', name: 'Web App', icon: 'laptop' }
    ];
    
    // Basic email validation
    function validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isEmailValid = emailRegex.test(email);
      return isEmailValid;
    }
    
    // Mock submit function - would connect to backend in production
    function handleSubmit() {
      if (!validateEmail()) return;
      
      isSubmitting = true;
      hasInteracted = true;
      
      // Simulate API call
      setTimeout(() => {
        isSubmitting = false;
        submitSuccess = true;
        email = '';
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          submitSuccess = false;
        }, 5000);
      }, 1500);
    }
    
    // Add animation on scroll
    onMount(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
      elementsToAnimate.forEach(el => {
        observer.observe(el);
      });
    });
  </script>
  
  <section id="cta-section" class="py-16 bg-gradient-to-br from-[#1a5f4a] to-[#0d3d2d] text-white">
    <div class="container mx-auto px-4 md:px-8">
      <!-- Main CTA Container -->
      <div class="max-w-5xl mx-auto rounded-lg p-8 animate-on-scroll">
        <!-- Two-column layout -->
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <!-- Left column: Main CTA text -->
          <div class="lg:w-1/2 text-center lg:text-left">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Verify Your Medicines?</h2>
            <p class="text-lg mb-6">Join thousands of users who trust TrustMyTablet for safe medicine verification. Download our app or sign up for early access.</p>
            
            <!-- App badges/buttons -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {#each platforms as platform}
                <button 
                  class="flex items-center px-6 py-3 bg-white text-[#1a5f4a] rounded-full font-medium hover:bg-[#f4b400] hover:text-white transition-colors duration-300"
                  aria-label="Download for {platform.name}"
                >
                  <span class="mr-2">
                    {#if platform.icon === 'apple'}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    {:else if platform.icon === 'android'}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.2 16.8H6v-8h1.2v8zm.6-10.56L6.47 4.67l.75-.75 1.41 1.41-.75.75zM10 3h4v1h-4V3zm3.6 13.8h-1.2v-8h1.2v8zM17.2 4.67l-1.38 1.38-.75-.75 1.41-1.41.75.75zM17.2 16.8H16v-8h1.2v8zm3.6-6.8h-1.2v5.6h1.2V10zm-16.8 0H2.8v5.6H4V10zm13.8 8H6.2c-.67 0-1.2-.53-1.2-1.2V9.2h13.2v7.6c0 .67-.53 1.2-1.2 1.2zm0-12.8H6.2C5.53 5.2 5 5.73 5 6.4V8h14V6.4c0-.67-.53-1.2-1.2-1.2z"/>
                      </svg>
                    {:else if platform.icon === 'laptop'}
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16zM4 6h16v10H4V6zm16 14H4v-2h16v2z"/>
                      </svg>
                    {/if}
                  </span>
                  {platform.name}
                </button>
              {/each}
            </div>
          </div>
          
          <!-- Right column: Email signup form -->
          <div class="lg:w-2/5 w-full bg-white p-6 rounded-lg shadow-lg">
            {#if !submitSuccess}
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-[#1a5f4a] mb-2">Get Early Access</h3>
                <p class="text-[#607d8b]">Be among the first to try our premium features</p>
              </div>
              
              <!-- Email form -->
              <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div class="relative">
                  <label for="email" class="block text-sm font-medium text-[#607d8b] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    bind:value={email} 
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-[#1a5f4a] {!isEmailValid ? 'border-[#d32f2f]' : 'border-gray-300'}"
                    placeholder="your@email.com"
                    on:blur={validateEmail}
                    required
                  />
                  {#if !isEmailValid}
                    <p class="text-[#d32f2f] text-xs mt-1">Please enter a valid email address</p>
                  {/if}
                </div>
                
                <button 
                  type="submit" 
                  class="w-full bg-[#1a5f4a] text-white py-2 px-4 rounded-lg hover:bg-[#0d3d2d] transition-colors duration-300 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {#if isSubmitting}
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  {:else}
                    Sign Up for Early Access
                  {/if}
                </button>
              </form>
            {:else}
              <!-- Success message -->
              <div class="text-center py-6">
                <div class="w-16 h-16 bg-[#4caf50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-[#1a5f4a] mb-2">Thank You!</h3>
                <p class="text-[#607d8b]">We've added you to our early access list. We'll notify you when we're ready!</p>
              </div>
            {/if}
            
            <!-- Trust indicators -->
            <div class="mt-4 pt-4 border-t border-gray-200">
              <div class="flex items-center justify-center gap-2 text-[#607d8b] text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <span>Secure & Confidential</span>
                <span class="mx-2">•</span>
                <span>No Spam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <style>
    /* Fade in animation */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* .animate-fade-in {
      animation: fadeIn 0.8s ease forwards;
    } */
    
    /* Ensure buttons don't have extra width on mobile */
    button {
      white-space: nowrap;
    }
  </style>