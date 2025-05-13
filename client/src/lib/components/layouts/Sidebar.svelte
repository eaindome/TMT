<script lang="ts">
	import { page } from '$app/stores';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { session } from '$lib/stores/session'; // Assuming you have session store
	import Icon from '../ui/Icon.svelte';
  import Tooltip from '$lib/components/ui/Tooltip.svelte';

	export let expanded = true;
	export let mobile = false;

	// Add safe fallback with default values
	$: user = $session?.user || { role: 'guest', isPremium: false };

	// Base shared items
	let navItems = [
		{ id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home' },
		{ id: 'scan', label: 'Scan Medicine', href: '/scan', icon: 'camera' },
		{ id: 'history', label: 'Scan History', href: '/history', icon: 'history' },
		{ id: 'resources', label: 'Resources', href: '/resources', icon: 'book' },
		{ id: 'profile', label: 'My Profile', href: '/profile', icon: 'user' }
	];

	// Only add premium features if we're sure the user is premium
	$: if (user && user.isPremium) {
		navItems = [
			...navItems,
			{ id: 'batch', label: 'Batch Scan', href: '/batch-scan', icon: 'collection' },
			{ id: 'alerts', label: 'Early Alerts', href: '/alerts', icon: 'bell' },
			{ id: 'analytics', label: 'Analytics', href: '/analytics', icon: 'chart-bar' }
		];
	}

	// Only add regulator features if we're sure the user is a regulator
	$: if (user && user.role === 'regulator') {
		navItems = [
			...navItems,
			{ id: 'reports', label: 'Trend Reports', href: '/reports', icon: 'chart-pie' },
			{ id: 'compliance', label: 'Compliance Logs', href: '/compliance', icon: 'clipboard' }
		];
	}

	// Only add admin features if we're sure the user is an admin
	$: if (user && user.role === 'admin') {
		navItems = [
			...navItems,
			{ id: 'admin-users', label: 'Users', href: '/admin/users', icon: 'users' },
			{ id: 'admin-drugs', label: 'Drugs DB', href: '/admin/drugs', icon: 'database' },
			{
				id: 'admin-feedback',
				label: 'Feedback Reports',
				href: '/admin/feedback',
				icon: 'annotation'
			}
		];
	}

	// For navigation
	$: isActive = (path: string) => {
		return $page.url.pathname.startsWith(path);
	};

	function toggleSidebar() {
		expanded = !expanded;
	}
</script>

<div
	class="sidebar-container {mobile ? 'lg:hidden' : 'hidden lg:block'}"
	in:fly={{ x: -20, duration: 300, easing: cubicOut }}
>
	<aside
		class="fixed z-30 flex h-screen flex-col {expanded ? 'w-64' : 'w-20'} 
           border-r border-gray-200 bg-white shadow-sm transition-all duration-300"
	>
		<div class="flex h-16 items-center justify-between border-b border-gray-200 px-4">
			<a href="/" class="flex items-center">
				<div class="flex items-center justify-center rounded-full bg-[#1a5f4a] p-2">
					<Icon name="globe" className="h-5 w-5 text-white" />
				</div>
				{#if expanded}
					<span class="ml-3 text-lg font-semibold text-gray-800" in:fade={{ duration: 200 }}
						>TrustMyTablet</span
					>
				{/if}
			</a>
			<button
				on:click={toggleSidebar}
				class="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
				aria-label="Toggle sidebar"
			>
				<Icon name="menu" className="h-5 w-5" />
			</button>
		</div>

		<nav class="flex-1 overflow-y-auto p-4">
			<ul class="space-y-2">
				{#each navItems as item}
					<li>
            <Tooltip text={item.label} placement="right" offset={10}>
              <a
              href={item.href}
              class="group flex items-center rounded-md p-2.5 text-sm font-medium transition-all duration-200
                  {isActive(item.href)
                ? 'bg-[#1a5f4a]/10 text-[#1a5f4a]'
                : 'text-gray-700 hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a]'}"
              >
              <Icon
                name={item.icon}
                className="h-5 w-5 {isActive(item.href)
                ? 'text-[#1a5f4a]'
                : 'text-gray-500 group-hover:text-[#1a5f4a]'}"
              />
              {#if expanded}
                <span class="ml-3 whitespace-nowrap" in:fade={{ duration: 200 }}>{item.label}</span>
                {#if isActive(item.href)}
                <span class="ml-auto h-1.5 w-1.5 rounded-full bg-[#1a5f4a]"></span>
                {/if}
              {/if}
              </a>
            </Tooltip>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="border-t border-gray-200 p-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a5f4a] text-sm font-medium text-white"
					>
						U
					</div>
					{#if expanded}
						<div class="ml-3" in:fade={{ duration: 200 }}>
							<p class="text-sm font-medium text-gray-800">
								{'name' in user ? user.name : 'User Name'}
							</p>
							<p class="text-xs text-gray-500">
								{'email' in user ? user.email : 'user@example.com'}
							</p>
						</div>
					{/if}
				</div>
				{#if expanded}
					<button
						class="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
						in:fade={{ duration: 200 }}
						aria-label="Logout"
					>
						<Icon name="logout" className="h-5 w-5" />
					</button>
				{/if}
			</div>
		</div>
	</aside>
</div>

<style>
	nav {
		scrollbar-width: thin;
		scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
	}
	nav::-webkit-scrollbar {
		width: 4px;
	}
	nav::-webkit-scrollbar-track {
		background: transparent;
	}
	nav::-webkit-scrollbar-thumb {
		background-color: rgba(156, 163, 175, 0.5);
		border-radius: 20px;
	}
	a:hover span.rounded-full {
		transform: scale(1.2);
	}
</style>
