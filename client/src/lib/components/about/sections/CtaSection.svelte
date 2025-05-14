<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';

	// Add subtle animation on mount
	onMount(() => {
		const elem = document.querySelector('.cta-container');
		if (elem) {
			elem.classList.add('.animate-appear');
		}
	});
</script>

<section class="relative overflow-hidden bg-gradient-to-br from-[#1a5f4a] to-[#134a3c] px-4 py-20">
	<!-- Decorative elements -->
	<div class="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
		<div class="absolute top-10 left-10 h-32 w-32 rounded-full bg-white opacity-5"></div>
		<div class="absolute right-20 bottom-20 h-64 w-64 rounded-full bg-white opacity-5"></div>
		<div class="absolute top-1/3 right-1/4 h-16 w-16 rounded-full bg-[#f4b400] opacity-10"></div>
	</div>

	<div
		class="cta-container relative z-10 mx-auto max-w-4xl rounded-xl bg-white/5 p-8 backdrop-blur-sm md:p-12"
	>
		<div class="text-center">
			<h2 class="mb-6 text-2xl font-bold text-white md:text-4xl">Join Our <span class="text-[#f4b400]">Beta</span> Program</h2>

			<div class="mx-auto mb-8 h-1 w-20 rounded-full bg-[#4caf50]"></div>

			<p class="mb-8 text-lg leading-relaxed text-white/90 md:text-xl">
				We're looking for early adopters to help us refine our product. Whether you're a healthcare
				provider, regulator, or concerned individual, you can help shape the future of medication
				verification.
			</p>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <!-- Primary CTA -->
                <a
                    href="/signup"
                    class="group relative w-full transform transition-all duration-300 hover:scale-105 sm:w-auto"
                >
                    <!-- This glow effect needs to be positioned properly -->
                    <div
                        class="absolute -inset-0.5 rounded-full bg-[#4caf50]/50 blur-md transition-all duration-300 group-hover:opacity-80 group-hover:blur-xl"
                    ></div>
                    <Button
                        variant="outline"
                        size="lg"
                        elevation={true}
                        animateOnHover={true}
                        
                    >
                        <span class="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-2 h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            Join Beta Program
                        </span>
                    </Button>
                </a>

                <!-- Secondary CTA -->
                <a href="/contact" class="w-full sm:w-auto">
                    <Button
                        variant="kustom"
                        size="lg"
                        elevation={false}
                        animateOnHover={true}
                        ripple={true}
                    >
                        <span class="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="mr-2 h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                            </svg>
                            Partner With Us
                        </span>
                    </Button>
                </a>
            </div>

            <!-- Added trust indicators -->
            <div class="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/70">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>Free for Beta Users</span>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <span>Data Privacy Focused</span>
                </div>
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    <span>Early Access to Features</span>
                </div>
            </div>
		</div>
	</div>
</section>

<style>
	/* Animation for elements */
	@keyframes appear {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Add a smooth transition between sections */
	section {
		scroll-margin-top: 80px; /* Adjust based on your nav height */
	}

	/* Ensure consistent typography */
	p,
	h2,
	a {
		opacity: 1;
	}

	/* Add subtle pulse animation to primary button glow */
	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 0.2;
			blur: 10px;
		}
		50% {
			opacity: 0.4;
			blur: 15px;
		}
	}

    .blur-md {
    filter: blur(12px);
    }
</style>
