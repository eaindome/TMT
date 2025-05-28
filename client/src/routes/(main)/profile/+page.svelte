<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import UserInfoCard from '$lib/components/profile/UserInfoCard.svelte';
	import EditProfileTab from '$lib/components/profile/EditProfileTab.svelte';
	import SubscriptionTab from '$lib/components/profile/SubscriptionTab.svelte';
	import SecurityTab from '$lib/components/profile/SecurityTab.svelte';
	import DeleteAccountTab from '$lib/components/profile/DeleteAccountTab.svelte';
	
	type Tab = 'profile' | 'subscription' | 'security' | 'delete';
	
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
	
	interface SubscriptionData {
		plan: string;
		nextBillingDate: string;
		status: 'active' | 'cancelled' | 'expired';
	}
	
	let activeTab: Tab = 'profile';
	let user: User = {
		id: '1',
		name: 'Dr. Sarah Johnson',
		email: 'sarah.johnson@hospital.com',
		phone: '+1 (555) 123-4567',
		role: 'Pharmacist',
		isPremium: true,
		profileImage: '',
		createdAt: '2024-01-15'
	};
	
	let subscription: SubscriptionData = {
		plan: 'Professional',
		nextBillingDate: '2024-07-15',
		status: 'active'
	};
	
	const tabs = [
		{ id: 'profile', label: 'Profile', icon: '👤' },
		{ id: 'subscription', label: 'Subscription', icon: '💳', premiumOnly: true },
		{ id: 'security', label: 'Security', icon: '🔒' },
		{ id: 'delete', label: 'Delete Account', icon: '🗑️' }
	] as const;
	
	function setActiveTab(tab: Tab) {
		activeTab = tab;
	}
	
	onMount(() => {
		// Load user data from API or store
	});
</script>

<svelte:head>
	<title>Profile - TMT Medicine Detector</title>
</svelte:head>

<div class="min-h-screen py-8">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Page Header -->
		<div class="mb-8  -mt-5">
			<h1 class="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
			<p class="text-[#607d8b]">Manage your account settings and preferences</p>
		</div>
		
		<!-- User Info Card - Always Visible -->
		<div class="mb-8">
			<UserInfoCard {user} />
		</div>
		
		<!-- Tabbed Interface -->
		<div class="bg-white rounded-lg shadow-lg overflow-hidden">
			<!-- Tab Navigation -->
			<div class="border-b border-gray-200">
				<nav class="flex space-x-8 px-6" aria-label="Tabs">
					{#each tabs as tab}
						{#if (!('premiumOnly' in tab) || (tab.premiumOnly === true && user.isPremium))}
							<button
								on:click={() => setActiveTab(tab.id)}
								class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 {activeTab === tab.id
									? 'border-[#1a5f4a] text-[#1a5f4a]'
									: 'border-transparent text-[#607d8b] hover:text-gray-700 hover:border-gray-300'}"
							>
								<span class="mr-2">{tab.icon}</span>
								{tab.label}
							</button>
						{/if}
					{/each}
				</nav>
			</div>
			
			<!-- Tab Content -->
			<div class="p-6">
				{#if activeTab === 'profile'}
					<EditProfileTab bind:user />
				{:else if activeTab === 'subscription' && user.isPremium}
					<SubscriptionTab bind:subscription />
				{:else if activeTab === 'security'}
					<SecurityTab />
				{:else if activeTab === 'delete'}
					<DeleteAccountTab />
				{/if}
			</div>
		</div>
	</div>
</div>