<!-- src/lib/components/profile/EditProfileTab.svelte -->
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
	
	let isEditing = false;
	let isSaving = false;
	let showSuccess = false;
	let fileInput: HTMLInputElement;
	
	// Form data
	let formData = {
		name: user.name,
		phone: user.phone || '',
		profileImage: user.profileImage || ''
	};
	
	function toggleEdit() {
		if (isEditing) {
			// Cancel editing - reset form data
			formData = {
				name: user.name,
				phone: user.phone || '',
				profileImage: user.profileImage || ''
			};
		}
		isEditing = !isEditing;
	}
	
	async function saveProfile() {
		isSaving = true;
		
		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Update user data
			user.name = formData.name;
			user.phone = formData.phone;
			user.profileImage = formData.profileImage;
			
			isEditing = false;
			showSuccess = true;
			
			// Hide success message after 3 seconds
			setTimeout(() => {
				showSuccess = false;
			}, 3000);
		} catch (error) {
			console.error('Error saving profile:', error);
		} finally {
			isSaving = false;
		}
	}
	
	function handleImageUpload() {
		fileInput.click();
	}
	
	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				formData.profileImage = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}
	
	function removeImage() {
		formData.profileImage = '';
	}
	
	function resetPassword() {
		// Handle password reset logic
		alert('Password reset email sent to ' + user.email);
	}
</script>

<div class="space-y-8">
	<!-- Success Message -->
	{#if showSuccess}
		<div class="bg-[#4caf50] text-white p-4 rounded-lg flex items-center space-x-3">
			<span>Profile updated successfully!</span>
		</div>
	{/if}
	
	<!-- Profile Picture Section -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900">Profile Picture</h3>
		
		<div class="flex items-center space-x-6">
			<div class="flex-shrink-0">
				{#if formData.profileImage}
					<img
						src={formData.profileImage}
						alt="Profile preview"
						class="w-24 h-24 rounded-full object-cover border-4 border-[#1a5f4a]"
					/>
				{:else}
					<div class="w-24 h-24 rounded-full bg-[#1a5f4a] flex items-center justify-center border-4 border-[#1a5f4a]">
						<span class="text-white text-xl font-bold">
							{user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
						</span>
					</div>
				{/if}
			</div>
			
			{#if isEditing}
				<div class="space-x-3">
					<button
						on:click={handleImageUpload}
						class="bg-[#1a5f4a] text-white px-4 py-2 rounded-lg hover:bg-[#155240] transition-colors duration-200"
					>
						Upload Photo
					</button>
					
					{#if formData.profileImage}
						<button
							on:click={removeImage}
							class="bg-[#607d8b] text-white px-4 py-2 rounded-lg hover:bg-[#546e7a] transition-colors duration-200"
						>
							Remove
						</button>
					{/if}
				</div>
			{/if}
		</div>
		
		<input
			bind:this={fileInput}
			type="file"
			accept="image/*"
			on:change={handleFileChange}
			class="hidden"
		/>
	</div>
	
	<!-- Basic Information -->
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>
			
			{#if !isEditing}
				<button
					on:click={toggleEdit}
					class="bg-[#1a5f4a] text-white px-4 py-2 rounded-lg hover:bg-[#155240] transition-colors duration-200 flex items-center space-x-2"
				>
					<span>Edit</span>
				</button>
			{/if}
		</div>
		
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Full Name -->
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
					Full Name *
				</label>
				{#if isEditing}
					<input
						id="name"
						bind:value={formData.name}
						type="text"
						required
						class="w-full px-4 py-2 border border-[#607d8b]/30 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-transparent"
					/>
				{:else}
					<p class="text-gray-900 py-2">{user.name}</p>
				{/if}
			</div>
			
			<!-- Email (Read-only) -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
					Email Address
				</label>
				<p class="text-gray-900 py-2 flex items-center space-x-2">
					<span>{user.email}</span>
				</p>
			</div>
			
			<!-- Phone -->
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
					Phone Number
				</label>
				{#if isEditing}
					<input
						id="phone"
						bind:value={formData.phone}
						type="tel"
						placeholder="+1 (555) 123-4567"
						class="w-full px-4 py-2 border border-[#607d8b]/30 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-transparent"
					/>
				{:else}
					<p class="text-gray-900 py-2">{user.phone || 'Not provided'}</p>
				{/if}
			</div>
			
			<!-- Role (Read-only) -->
			<div>
				<label for="accountType" class="block text-sm font-medium text-gray-700 mb-2">
					Account Type
				</label>
				<input
					id="accountType"
					type="text"
					value={user.role}
					readonly
					tabindex="-1"
					aria-readonly="true"
					class="w-full px-4 py-2 border border-[#607d8b]/30 rounded-lg bg-gray-100 text-gray-900"
				/>
			</div>
		</div>
		
		<!-- Action Buttons -->
		{#if isEditing}
			<div class="flex space-x-4 pt-4">
				<button
					on:click={saveProfile}
					disabled={isSaving}
					class="bg-[#4caf50] text-white px-6 py-2 rounded-lg hover:bg-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
				>
					{#if isSaving}
						<span class="animate-spin">⏳</span>
						<span>Saving...</span>
					{:else}
						<span>Save Changes</span>
					{/if}
				</button>
				
				<button
					on:click={toggleEdit}
					disabled={isSaving}
					class="bg-[#607d8b] text-white px-6 py-2 rounded-lg hover:bg-[#546e7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
				>
					Cancel
				</button>
			</div>
		{/if}
	</div>
	
	<!-- Password Reset -->
	<div class="border-t border-gray-200 pt-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Password</h3>
		
		<div class="bg-[#f5f5f5] p-4 rounded-lg">
			<p class="text-[#607d8b] mb-4">
				For security reasons, we'll send a password reset link to your email address.
			</p>
			
			<button
				on:click={resetPassword}
				class="bg-[#0288d1] text-white px-4 py-2 rounded-lg hover:bg-[#0277bd] transition-colors duration-200 flex items-center space-x-2"
			>
				<span>Reset Password</span>
			</button>
		</div>
	</div>
</div>