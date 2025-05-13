<script lang="ts">
	import { enableMockAuth } from '$lib/stores/mockAuth';
	import { user } from '$lib/stores/user';
	import { browser } from '$app/environment';

	let mockAuthEnabled = false;
	let disableMockFn: (() => void) | null = null;
	let currentUser: any = null;

	// Subscribe to user store
	if (browser) {
		user.subscribe((value) => {
			currentUser = value;
			// If we have a user but mock auth is not enabled, we might have set it externally
			if (value && !mockAuthEnabled && disableMockFn) {
				mockAuthEnabled = true;
			}
		});
	}

	function toggleMockAuth() {
		if (mockAuthEnabled && disableMockFn) {
			disableMockFn();
			disableMockFn = null;
			mockAuthEnabled = false;
		} else {
			disableMockFn = enableMockAuth();
			mockAuthEnabled = true;
		}
	}
</script>

<div
	class="fixed right-4 bottom-4 z-50 rounded-lg bg-gray-800 p-3 text-white opacity-80 shadow-lg transition-opacity hover:opacity-100"
>
	<div class="flex flex-col gap-2">
		<button
			class="rounded px-3 py-1 text-xs {mockAuthEnabled ? 'bg-red-600' : 'bg-[#1a5f4a]'}"
			on:click={toggleMockAuth}
		>
			{mockAuthEnabled ? 'Disable Mock Auth' : 'Enable Mock Auth'}
		</button>

		<div class="mt-1 text-xs">
			{#if currentUser}
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-green-500"></span>
					<span>Logged in as: {currentUser.email}</span>
				</div>
				<div class="mt-1 text-[10px] text-gray-400">
					Role: {currentUser.badges?.includes('moderator') ? 'Moderator' : 'User'}
				</div>
			{:else}
				<div class="flex items-center gap-2">
					<span class="inline-block h-2 w-2 rounded-full bg-red-500"></span>
					<span>Not logged in</span>
				</div>
			{/if}
		</div>
	</div>
</div>
