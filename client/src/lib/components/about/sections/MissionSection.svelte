<script lang="ts">
	export let companyName = 'TrackMyMeds';
</script>

<section
	id="mission"
	class="relative bg-cover bg-center px-4 py-12 pt-20 md:py-16 md:pt-24"
	style="background-image: url('/images/about.jpg');"
>
	<!-- Overlay with blur effect -->
	<div class="absolute inset-0 bg-[#1a5f4a]/10 backdrop-blur-md"></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<div class="animate-on-scroll animate-fade-in-fallback">
			<h1 class="mb-6 text-3xl font-bold text-white drop-shadow-md md:text-5xl">Our Mission</h1>
			<div class="rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm md:p-10">
				<p class="mb-6 text-lg text-gray-800 md:text-xl">
					At {companyName}, we're developing technology to help combat the global threat of
					counterfeit medications through innovative AI-based verification methods.
				</p>
				<p class="text-lg text-gray-800 md:text-xl">
					Our goal is to create a platform that will empower consumers, healthcare professionals,
					and regulatory bodies with accessible tools to quickly verify medication authenticity.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
    /* Keep your existing styles but remove conflicting ones */
    .animate-on-scroll {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: none !important;
    }

    /* Add a smooth transition between sections */
    section {
        scroll-margin-top: 80px; /* Adjust based on your nav height */
    }

    /* Ensure consistent typography */
    p,
    h1 {
        opacity: 1;
    }
</style>