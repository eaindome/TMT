<script lang="ts">
	export let companyName = 'TrustMyTablet';

	// You could make this data-driven by defining team members here
	const teamMembers = [
		{
			initials: 'DR',
			name: 'Dr. Rebecca Chen',
			role: 'Medical Advisor',
			description:
				'Healthcare professional with experience in pharmaceutical safety and public health initiatives.'
		},
		{
			initials: 'AM',
			name: 'Alex Martinez',
			role: 'Lead Developer',
			description:
				'Software engineer with experience in computer vision and machine learning applications.'
		},
		{
			initials: 'SO',
			name: 'Sarah Okonjo',
			role: 'Operations Lead',
			description:
				'Project manager with experience in healthcare solutions and a focus on developing regions.'
		}
	];
</script>

<section id="team" class="bg-white px-4 py-16">
	<div class="mx-auto max-w-6xl">
		<div class="animate-on-scroll">
			<h2 class="mb-8 text-2xl font-bold text-[#1a5f4a] md:text-4xl">Our Team</h2>
			<p class="mb-8 text-lg text-gray-700">
				{companyName} is being created by a diverse team with backgrounds in healthcare, technology,
				and security, all focused on building a solution that's both effective and user-friendly.
			</p>
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each teamMembers as member}
					<div class="overflow-hidden rounded-lg bg-[#f5f5f5] shadow-md">
						<div class="flex h-48 items-center justify-center bg-[#1a5f4a]/10">
							<div
								class="flex h-24 w-24 items-center justify-center rounded-full bg-[#1a5f4a] text-2xl font-bold text-white"
							>
								{member.initials}
							</div>
						</div>
						<div class="p-6">
							<h3 class="text-xl font-bold text-[#1a5f4a]">{member.name}</h3>
							<p class="mb-3 font-medium text-[#0288d1]">{member.role}</p>
							<p class="text-gray-700">
								{member.description}
							</p>
						</div>
					</div>
				{/each}
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
</style>