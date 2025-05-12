<script lang="ts">
	import { onMount } from 'svelte';
	type Status = 'success' | 'error' | 'warning' | 'info' | 'feature';
	import { user, clearUser, token } from '$lib/stores/user';
	import { getUserProfile } from '$lib/api/user';
	import { logout } from '$lib/api/auth';
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/stores/toasts';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let loading = true;
	let logoutLoading = false;
	let userProfile = null;
	let scanHistory: { createdAt: string; batchNumber: string; verdict: string }[] = [];
	let userBadges: string[] = [];

	// Function to map verdict strings to valid Badge status values
	function mapVerdictToBadgeStatus(verdict: string): 'safe' | 'suspicious' | 'fake' | 'neutral' {
		switch (verdict.toLowerCase()) {
			case 'success':
				return 'safe';
			case 'error':
				return 'fake';
			case 'warning':
				return 'suspicious';
			case 'info':
			case 'feature':
			default:
				return 'neutral';
		}
	}

	onMount(async () => {
		if ($user && $token) {
			try {
				loading = true;
				const profile = await getUserProfile($token);
				userProfile = profile;
				scanHistory = profile.scans || [];
				userBadges = profile.badges || [];
			} catch (error) {
				console.error('Failed to load profile:', error);
				toasts.error('Failed to load profile data');
			} finally {
				loading = false;
			}
		} else {
			loading = false;
		}
	});

	async function handleLogout() {
		try {
			logoutLoading = true;
			await logout();
			clearUser();
			toasts.success('Successfully logged out');
			goto('/login');
		} catch (error) {
			console.error('Logout failed:', error);
			toasts.error('Logout failed. Please try again.');
		} finally {
			logoutLoading = false;
		}
	}
</script>

<Card padding="lg" shadow="md">
	<h1 class="text-trust-green mb-4 text-2xl font-bold">User Profile</h1>

	{#if loading}
		<div class="space-y-6">
			<div>
				<Skeleton height="1.5rem" width="30%" className="mb-2" />
				<Skeleton height="1rem" width="60%" />
			</div>
			<div>
				<Skeleton height="1.5rem" width="40%" className="mb-2" />
				<div class="space-y-2">
					<Skeleton height="1rem" width="100%" />
					<Skeleton height="1rem" width="90%" />
					<Skeleton height="1rem" width="95%" />
				</div>
			</div>
			<div>
				<Skeleton height="1.5rem" width="25%" className="mb-2" />
				<div class="flex flex-wrap gap-2">
					<Skeleton height="2rem" width="5rem" rounded="full" />
					<Skeleton height="2rem" width="7rem" rounded="full" />
					<Skeleton height="2rem" width="6rem" rounded="full" />
				</div>
			</div>
			<Skeleton height="2.5rem" width="8rem" />
		</div>
	{:else if $user}
		<div class="space-y-4">
			<div>
				<h2 class="text-neutral-gray text-lg font-medium">Email</h2>
				<p class="text-neutral-gray">{$user.email}</p>
			</div>
			<div>
				<h2 class="text-neutral-gray text-lg font-medium">Scan History</h2>
				{#if scanHistory && scanHistory.length > 0}
					<ul class="text-neutral-gray list-inside list-disc">
						{#each scanHistory as scan}
							<li>
								{new Date(scan.createdAt).toLocaleDateString()}:
								{scan.batchNumber}
								<Badge status={mapVerdictToBadgeStatus(scan.verdict)} size="sm" className="ml-2" />
							</li>
						{/each}
					</ul>
				{:else}
					<p class="text-neutral-gray">No scan history available.</p>
				{/if}
			</div>
			<div>
				<h2 class="text-neutral-gray text-lg font-medium">Badges</h2>
				{#if userBadges && userBadges.length > 0}
					<div class="mt-2 flex flex-wrap gap-2">
						{#each userBadges as badge}
							<Badge status="neutral" className="py-1 px-3">{badge}</Badge>
						{/each}
					</div>
				{:else}
					<p class="text-neutral-gray">No badges earned yet.</p>
				{/if}
			</div>
			<Button
				variant="danger"
				on:click={handleLogout}
				loading={logoutLoading}
				disabled={logoutLoading}
			>
				{logoutLoading ? 'Logging out...' : 'Logout'}
			</Button>
		</div>
	{:else}
		<p class="text-neutral-gray">
			Please <a href="/login" class="text-accent-blue hover:underline">login</a> to view your profile.
		</p>
	{/if}
</Card>
