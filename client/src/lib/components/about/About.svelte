<script lang="ts">
	import { onMount } from 'svelte';
	import AboutNav from './AboutNav.svelte';
	import Button from '$lib/components/Button.svelte';
	import MissionSection from './sections/MissionSection.svelte';
    import StorySection from './sections/StorySection.svelte';
    import TechnologySection from './sections/TechnologySection.svelte';
    import TeamSection from './sections/TeamSection.svelte';
    import CommitmentSection from './sections/CommitmentSection.svelte';
    import CtaSection from './sections/CtaSection.svelte';

	// Simplify this for now and focus on layout integration
	onMount(() => {
		document.querySelectorAll('.animate-on-scroll').forEach((el) => {
			el.classList.add('animate-fade-in');
		});
	});
</script>

<svelte:head>
	<title>About Us | Track My Meds - AI-Powered Medicine Verification</title>
	<meta
		name="description"
		content="Learn about our mission to combat counterfeit medications using AI technology and our commitment to global medicine safety."
	/>
</svelte:head>

<div class="min-h-screen bg-[#f5f5f5]">
	<!-- Improved Header Section with Navigation -->
	<div class="sticky top-0 z-50 bg-white shadow-sm ">
		<div class="container mx-auto">
			<AboutNav />
		</div>
	</div>

	<!-- Main content with proper spacing -->
	<div class="content-visible">
		<MissionSection companyName="TrackMyMeds" />
        <StorySection companyName="TrackMyMeds" />
        <TechnologySection />
        <TeamSection companyName="TrackMyMeds" />
        <CommitmentSection />
        <CtaSection />
	</div>
</div>

<style>
	/* styles go here */
</style>
