<script lang="ts">
	export let companyName = 'TrustMyTablet';

	// Enhanced team members with additional info and social links
	const teamMembers = [
		{
			initials: 'DR',
			name: 'Dr. Rebecca Chen',
			role: 'Medical Advisor',
			description:
				'Healthcare professional with experience in pharmaceutical safety and public health initiatives.',
			expertise: ['Pharmaceutical Safety', 'Public Health', 'Healthcare Systems'],
			links: {
				linkedin: '#',
				twitter: '#'
			}
		},
		{
			initials: 'AM',
			name: 'Alex Martinez',
			role: 'Lead Developer',
			description:
				'Software engineer with experience in computer vision and machine learning applications.',
			expertise: ['Computer Vision', 'Machine Learning', 'AI Development'],
			links: {
				linkedin: '#',
				github: '#'
			}
		},
		{
			initials: 'SO',
			name: 'Sarah Okonjo',
			role: 'Operations Lead',
			description:
				'Project manager with experience in healthcare solutions and a focus on developing regions.',
			expertise: ['Project Management', 'Global Health', 'Strategic Planning'],
			links: {
				linkedin: '#',
				twitter: '#'
			}
		}
	];
</script>

<section id="team" class="bg-gradient-to-b from-white to-gray-50 px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<div class="animate-on-scroll">
			<div class="mb-12 text-center">
				<span
					class="mb-3 inline-block rounded-full bg-[#1a5f4a]/10 px-3 py-1 text-sm font-medium text-[#1a5f4a]"
					>Our People</span
				>
				<h2 class="text-2xl font-bold text-[#1a5f4a] md:text-4xl">Meet Our Team</h2>
				<div class="mx-auto mt-4 h-1 w-20 rounded-full bg-[#1a5f4a]/20"></div>
				<p class="mx-auto mt-6 max-w-2xl text-lg text-gray-700">
					{companyName} is being created by a diverse team with backgrounds in healthcare, technology,
					and security, all focused on building a solution that's both effective and user-friendly.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each teamMembers as member}
					<div
						class="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					>
						<!-- Decorative top accent -->
						<div
							class="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-[#1a5f4a] to-[#4caf50]"
						></div>

						<!-- Member photo/avatar section -->
						<div
							class="relative flex h-48 items-center justify-center bg-gradient-to-r from-[#1a5f4a]/5 to-[#1a5f4a]/10"
						>
							<div
								class="absolute top-4 right-4 flex space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							>
								{#if member.links.linkedin}
									<a
										href={member.links.linkedin}
										class="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#0077b5] transition-transform hover:scale-110 hover:bg-white"
										aria-label="LinkedIn profile"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
											/>
										</svg>
									</a>
								{/if}
								{#if member.links.twitter}
									<a
										href={member.links.twitter}
										class="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#1DA1F2] transition-transform hover:scale-110 hover:bg-white"
										aria-label="Twitter profile"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
											/>
										</svg>
									</a>
								{/if}
								{#if member.links.github}
									<a
										href={member.links.github}
										class="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#333] transition-transform hover:scale-110 hover:bg-white"
										aria-label="GitHub profile"
									>
										<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
											<path
												d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
											/>
										</svg>
									</a>
								{/if}
							</div>

							<div
								class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c7a63] text-2xl font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110"
							>
								{member.initials}
							</div>
						</div>

						<!-- Member info section -->
						<div class="p-6">
							<div class="mb-4">
								<h3 class="text-xl font-bold text-[#1a5f4a]">{member.name}</h3>
								<p class="font-medium text-[#0288d1]">{member.role}</p>
							</div>

							<p class="mb-4 text-gray-700">
								{member.description}
							</p>

							<!-- Expertise tags -->
							<div class="mt-4 flex flex-wrap gap-2">
								{#each member.expertise as skill}
									<span
										class="rounded-full bg-[#1a5f4a]/5 px-3 py-1 text-xs font-medium text-[#1a5f4a]"
										>{skill}</span
									>
								{/each}
							</div>
						</div>

						<!-- Bottom accent that expands on hover -->
						<div
							class="mx-6 h-0.5 w-12 rounded-full bg-[#1a5f4a]/20 transition-all duration-300 group-hover:w-24 group-hover:bg-[#1a5f4a]/40"
						></div>
						<div class="pb-6"></div>
					</div>
				{/each}
			</div>

			<!-- Team recruitment CTA -->
			<div class="mt-12 rounded-xl bg-[#1a5f4a]/5 p-8 text-center">
				<h3 class="mb-2 text-xl font-semibold text-[#1a5f4a]">Join Our Growing Team</h3>
				<p class="mb-6 text-gray-700">
					We're always looking for talented individuals who are passionate about healthcare
					innovation and technology.
				</p>
				<a
					href="/careers"
					class="inline-flex items-center rounded-full bg-[#1a5f4a] px-5 py-2 text-white transition-all hover:bg-[#156b54] hover:shadow-md"
				>
					<span>See Open Positions</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-2 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
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
	h2,
	h3 {
		opacity: 1;
	}

	/* Add subtle hover animation for cards */
	.group:hover {
		transform: translateY(-5px);
	}
</style>
