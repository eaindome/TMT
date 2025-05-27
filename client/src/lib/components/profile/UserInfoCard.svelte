<script lang="ts">
	interface User {
		id: string;
		name: string;
		email: string;
		phone?: string;
		role: 'Consumer' | 'Pharmacist' | 'Regulator';
		isPremium: boolean;
		profileImage?: string;
		createdAt: string;
	}
	
	export let user: User;
	
	function getRoleBadgeColor(role: string) {
		switch (role) {
			case 'Pharmacist':
				return 'bg-[#0288d1] text-white';
			case 'Regulator':
				return 'bg-[#d32f2f] text-white';
			default:
				return 'bg-[#607d8b] text-white';
		}
	}
	
	function getInitials(name: string): string {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
	}
</script>

<div class="bg-white rounded-lg shadow-lg p-6">
	<div class="flex items-center space-x-6">
		<!-- Profile Picture -->
		<div class="flex-shrink-0">
			{#if user.profileImage}
				<img
					src={user.profileImage}
					alt="{user.name}'s profile"
					class="w-20 h-20 rounded-full object-cover border-4 border-[#1a5f4a]"
				/>
			{:else}
				<div class="w-20 h-20 rounded-full bg-[#1a5f4a] flex items-center justify-center border-4 border-[#1a5f4a]">
					<span class="text-white text-xl font-bold">{getInitials(user.name)}</span>
				</div>
			{/if}
		</div>
		
		<!-- User Details -->
		<div class="flex-1 min-w-0">
			<div class="flex items-center space-x-3 mb-2">
				<h2 class="text-2xl font-bold text-gray-900 truncate">{user.name}</h2>
				{#if user.isPremium}
					<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#f4b400] to-[#ffc107] text-white shadow-md">
						✨ Premium
					</span>
				{/if}
			</div>
			
			<div class="space-y-1">
				<p class="text-[#607d8b] flex items-center">
					<span class="mr-2">📧</span>
					{user.email}
				</p>
				
				{#if user.phone}
					<p class="text-[#607d8b] flex items-center">
						<span class="mr-2">📱</span>
						{user.phone}
					</p>
				{/if}
				
				<div class="flex items-center space-x-3 mt-3">					
					<span class="text-sm text-[#607d8b]">
						Member since {new Date(user.createdAt).toLocaleDateString('en-US', { 
							year: 'numeric', 
							month: 'long' 
						})}
					</span>
				</div>
			</div>
		</div>
		
		<!-- Quick Stats -->
		<!-- <div class="hidden lg:flex flex-col space-y-4 text-center">
			<div class="bg-[#f5f5f5] rounded-lg p-4">
				<div class="text-2xl font-bold text-[#1a5f4a]">247</div>
				<div class="text-sm text-[#607d8b]">Scans Completed</div>
			</div>
			
			<div class="bg-[#f5f5f5] rounded-lg p-4">
				<div class="text-2xl font-bold text-[#4caf50]">98.5%</div>
				<div class="text-sm text-[#607d8b]">Success Rate</div>
			</div>
		</div> -->
	</div>
</div>