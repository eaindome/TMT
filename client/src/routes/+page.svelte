<script lang="ts">
  import Hero from '$lib/components/landing/Hero.svelte';
  import Features from '$lib/components/landing/Features.svelte';
  import UserTypes from '$lib/components/landing/UserTypes.svelte';
  import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
  import CTASection from '$lib/components/landing/CTASection.svelte';
  import { onMount } from 'svelte';
  
  // Add animation on scroll effect
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  });
</script>

<svelte:head>
  <title>TrustMyTablet - AI-Powered Medicine Verification</title>
  <meta name="description" content="Verify medicine authenticity in seconds with our AI-powered scanning app. Protect yourself from counterfeit drugs." />
</svelte:head>

<div class="bg-[#f5f5f5]">
  <Hero />  
  <Features />
  <UserTypes />
  <HowItWorks />
  <CTASection />
</div>

<style>
  /* Style here */
</style>