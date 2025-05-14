<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import CTASection from '$lib/components/landing/CTASection.svelte';
  import ContactForm from '$lib/components/contact/ContactForm.svelte';
  import ContactInfo from '$lib/components/contact/ContactInfo.svelte';
  import HelpCTA from '$lib/components/contact/HelpCTA.svelte';
  import { onMount } from 'svelte';

  // Handle form submission
  function handleFormSubmit(event: CustomEvent) {
    const formData = event.detail;
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend API
  }

  // Animation on scroll
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  });
</script>

<svelte:head>
  <title>Contact Us - TrustMyTablet</title>
  <meta name="description" content="Get in touch with the TrustMyTablet team. We're here to help with medicine verification and answer your questions." />
</svelte:head>

<div class="bg-[#f5f5f5] min-h-screen">
  <Navbar />
  
  <main class="container mx-auto px-4 py-8 md:py-16">
    <!-- Header -->
    <div class="animate-on-scroll transition-opacity duration-700 ">
      <h1 class="text-3xl md:text-4xl font-bold text-[#1a5f4a] mb-2 pt-18">Contact Us</h1>
      <p class="text-[#607d8b] text-lg mb-8">Have questions or feedback? We're here to help you verify your medicines safely.</p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Contact Form -->
      <div class="md:col-span-2 animate-on-scroll transition-opacity duration-700 delay-100">
        <ContactForm showTitle={false} on:submit={handleFormSubmit} />
      </div>
      
      <!-- Contact Info -->
      <div class="space-y-6 animate-on-scroll transition-opacity duration-700 delay-200">
        <ContactInfo />
        
        <!-- CTA Card -->
        <!-- <HelpCTA /> -->
      </div>
    </div>

    <!-- Map Section -->
    <!-- <div class="mt-16 animate-on-scroll transition-opacity duration-700 delay-300">
      <h2 class="text-2xl font-bold text-[#1a5f4a] mb-6">Find Us</h2>
      <div class="h-96 bg-gray-200 rounded-lg shadow-md overflow-hidden relative">
        This would be replaced with an actual map integration 
        <div class="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-[#1a5f4a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p class="mt-2 text-[#607d8b] text-lg">Map placeholder - TrustMyTablet HQ</p>
            <p class="text-[#607d8b]">123 Health Tech Plaza, San Francisco, CA 94103</p>
          </div>
        </div>
      </div>
    </div> -->

    <!-- FAQs Section -->
    <div class="mt-16 animate-on-scroll transition-opacity duration-700 delay-400">
      <h2 class="text-2xl font-bold text-[#1a5f4a] mb-6">Frequently Asked Contact Questions</h2>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-[#1a5f4a] mb-2">How quickly will I receive a response?</h3>
          <p class="text-[#607d8b]">We typically respond to all inquiries within 24-48 hours on business days. For urgent matters related to medicine verification, we prioritize those communications.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-[#1a5f4a] mb-2">Can I request a demo of the app?</h3>
          <p class="text-[#607d8b]">Yes! Select "Partnership" in the contact form category and mention you're interested in a demo. Our team will arrange a personalized walkthrough of the full features.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-[#1a5f4a] mb-2">How do I report a false verification result?</h3>
          <p class="text-[#607d8b]">Please select "Bug Report" in the contact form and include details about the medicine and the scan result. Attaching a photo of the medicine helps our team investigate.</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-[#1a5f4a] mb-2">I'm a healthcare organization. How can we partner?</h3>
          <p class="text-[#607d8b]">We offer special integration options for healthcare providers. Choose "Partnership" in the form and our partnership team will reach out with collaboration opportunities.</p>
        </div>
      </div>
    </div>
  </main>
  
  <CTASection />
</div>

<style>
  /* .animate-fade-in {
    opacity: 1;
    transition: opacity 0.7s ease-in-out;
  } */
</style>