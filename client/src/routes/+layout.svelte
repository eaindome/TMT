<script lang="ts">
	import '../app.css';

	// import { user, clearUser } from '$lib/stores/user';
	// import { goto } from '$app/navigation';
	// import Button from '$lib/components/Button.svelte';
	// import { logout } from '$lib/api/auth';
	// import ToastContainer from '$lib/components/ToastContainer.svelte';

	// async function handleLogout() {
	// 	try {
	// 		await logout();
	// 		clearUser();
	// 		goto('/login');
	// 	} catch (error) {
	// 		console.error('Logout failed:', error);
	// 	}
	// }

	let { children } = $props();
</script>

{@render children()}

<!-- <div class="bg-neutral-ivory flex min-h-screen flex-col">
	<header class="bg-trust-green px-6 py-4 text-white shadow">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<a href="/" class="text-2xl font-bold">TMT</a>
			<nav class="flex space-x-4">
				<a href="/" class="hover:text-accent-blue">Home</a>
				<a href="/about" class="hover:text-accent-blue">About</a>
				{#if $user}
					<a href="/profile" class="hover:text-accent-blue">Profile</a>
					<a href="/moderator" class="hover:text-accent-blue">Moderator</a>
					<Button variant="ghost" on:click={handleLogout}>Logout</Button>
				{:else}
					<a href="/login" class="hover:text-accent-blue">Login</a>
				{/if}
			</nav>
		</div>
	</header>

	<main class="mx-auto w-full max-w-7xl flex-grow px-4 py-8">
		
	</main>

	<footer class="bg-trust-green px-6 py-6 text-white">
		<div class="mx-auto flex max-w-7xl justify-between">
			<div>
				<p>&copy; 2025 TMT. All rights reserved.</p>
			</div>
			<div class="flex space-x-4">
				<a href="/about" class="hover:text-accent-blue">About</a>
				<a href="/privacy" class="hover:text-accent-blue">Privacy</a>
				<a href="/terms" class="hover:text-accent-blue">Terms</a>
			</div>
		</div>
	</footer>

	
	<ToastContainer position="top-right" />
</div> -->
