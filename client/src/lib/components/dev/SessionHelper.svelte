<script lang="ts">
	import { sessionStore, session } from '$lib/stores/session';
	import { browser } from '$app/environment';
	import { fly } from 'svelte/transition';

	interface User {
		name: string;
		role: string;
		isPremium: boolean;
	}

	let currentUser: User | null = null;
	let showPanel = false;
	let selectedRole = 'user';
	let isPremium = false;

	// Subscribe to session store
	if (browser) {
		session.subscribe((value) => {
			currentUser = value.user;
		});
	}

	function togglePanel() {
		showPanel = !showPanel;
	}

	function setMockSession() {
		sessionStore.mockSession(selectedRole as any, isPremium);
		showPanel = false;
	}

	function logout() {
		sessionStore.logout();
	}
</script>

{#if import.meta.env.DEV}
	<div class="fixed bottom-4 left-4 z-50">
		<button
			class="rounded-full bg-gray-800 p-2 text-white shadow-lg transition-colors hover:bg-[#1a5f4a]"
			on:click={togglePanel}
			title="Session Helper"
			aria-label="Session Helper"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>

		{#if showPanel}
			<div
				class="absolute bottom-12 left-0 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-xl"
				transition:fly={{ y: 10, duration: 200 }}
			>
				<div class="mb-4">
					<h3 class="mb-1 text-sm font-bold text-gray-700">Session Helper</h3>
					{#if currentUser}
						<div class="mb-2 rounded bg-gray-50 p-2 text-xs">
							<div class="flex justify-between">
								<span class="font-medium">Name:</span>
								<span>{currentUser.name}</span>
							</div>
							<div class="flex justify-between">
								<span class="font-medium">Role:</span>
								<span>{currentUser.role}</span>
							</div>
							<div class="flex justify-between">
								<span class="font-medium">Premium:</span>
								<span>{currentUser.isPremium ? 'Yes' : 'No'}</span>
							</div>
						</div>
					{:else}
						<div class="mb-2 text-xs text-gray-600">Not logged in</div>
					{/if}
				</div>

				<div class="space-y-3">
					<div>
						<label for="role-select" class="mb-1 block text-xs font-medium text-gray-700">Role</label>
						<select
							id="role-select"
							bind:value={selectedRole}
							class="w-full rounded-md border-gray-300 text-sm shadow-sm"
						>
							<option value="guest">Guest</option>
							<option value="user">User</option>
							<option value="premium">Premium User</option>
							<option value="moderator">Moderator</option>
							<option value="regulator">Regulator</option>
							<option value="admin">Admin</option>
						</select>
					</div>

					<div class="flex items-center">
						<input
							type="checkbox"
							bind:checked={isPremium}
							id="premium-check"
							class="h-4 w-4 rounded border-gray-300 text-[#1a5f4a]"
						/>
						<label for="premium-check" class="ml-2 text-xs text-gray-700">Is Premium</label>
					</div>

					<div class="flex gap-2">
						<button
							on:click={setMockSession}
							class="rounded bg-[#1a5f4a] px-3 py-1 text-xs text-white transition-colors hover:bg-[#144639]"
						>
							Mock Session
						</button>

						{#if currentUser}
							<button
								on:click={logout}
								class="rounded bg-red-600 px-3 py-1 text-xs text-white transition-colors hover:bg-red-700"
							>
								Log Out
							</button>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
{/if}
