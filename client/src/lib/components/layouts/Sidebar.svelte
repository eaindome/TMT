<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly, scale } from 'svelte/transition';
    import { quintOut, cubicOut } from 'svelte/easing';
    import { session } from '$lib/stores/session'; // Assuming you have session store
    import Icon from '../ui/Icon.svelte';
    import Tooltip from '$lib/components/ui/Tooltip.svelte';
    import { onMount } from 'svelte';

    export let expanded = true;
    export let mobile = false;

	type NavItem = {
        id: string;
        label: string;
        href: string;
        icon: string;
        badge: string | null;
    };
    
    type NavCategory = {
        id: string;
        label: string;
        items: NavItem[];
    };

    // Safe fallback with default values
    $: user = $session?.user || { role: 'guest', isPremium: false };

    // Navigation categories
    let navCategories: NavCategory[] = [
        {
            id: 'main',
            label: 'Main',
            items: [
                { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home', badge: null },
                { id: 'scan', label: 'Scan Medicine', href: '/scan', icon: 'camera', badge: null },
                { id: 'history', label: 'Scan History', href: '/history', icon: 'history', badge: null }
            ]
        },
        {
            id: 'resources',
            label: 'Resources',
            items: [
                { id: 'resources', label: 'Resources', href: '/resources', icon: 'book', badge: null },
                { id: 'profile', label: 'My Profile', href: '/profile', icon: 'user', badge: null }
            ]
        }
    ];

    // Premium features category
    let premiumCategory: NavCategory = {
        id: 'premium',
        label: 'Premium Features',
        items: [
            { id: 'batch', label: 'Batch Scan', href: '/batch-scan', icon: 'collection', badge: null },
            { id: 'alerts', label: 'Early Alerts', href: '/alerts', icon: 'bell', badge: '3' },
            { id: 'analytics', label: 'Analytics', href: '/analytics', icon: 'chart-bar', badge: 'New' }
        ]
    };

    // Regulator features category
    let regulatorCategory = {
        id: 'regulator',
        label: 'Regulatory Tools',
        items: [
            { id: 'reports', label: 'Trend Reports', href: '/reports', icon: 'chart-pie', badge: null },
            { id: 'compliance', label: 'Compliance Logs', href: '/compliance', icon: 'clipboard', badge: null }
        ]
    };

    // Admin features category
    let adminCategory = {
        id: 'admin',
        label: 'Administration',
        items: [
            { id: 'admin-users', label: 'Users', href: '/admin/users', icon: 'users', badge: null },
            { id: 'admin-drugs', label: 'Drugs DB', href: '/admin/drugs', icon: 'database', badge: null },
            { id: 'admin-feedback', label: 'Feedback Reports', href: '/admin/feedback', icon: 'annotation', badge: '5' }
        ]
    };

    // Add premium features if user is premium
    $: if (user && user.isPremium) {
        if (!navCategories.find(cat => cat.id === 'premium')) {
            navCategories = [...navCategories, premiumCategory];
        }
    }

    // Add regulator features if user is a regulator
    $: if (user && user.role === 'regulator') {
        if (!navCategories.find(cat => cat.id === 'regulator')) {
            navCategories = [...navCategories, regulatorCategory];
        }
    }

    // Add admin features if user is an admin
    $: if (user && user.role === 'admin') {
        if (!navCategories.find(cat => cat.id === 'admin')) {
            navCategories = [...navCategories, adminCategory];
        }
    }

    // For navigation
    $: isActive = (path: string) => {
        return $page.url.pathname.startsWith(path);
    };

    function toggleSidebar() {
        expanded = !expanded;
    }

    // For animations
    let mounted = false;
    onMount(() => {
        mounted = true;
    });
</script>

<div
    class="sidebar-container {mobile ? 'lg:hidden' : 'hidden lg:block'}"
    in:fly={{ x: -20, duration: 300, easing: cubicOut }}
>
    <aside
        class="fixed z-30 flex h-screen flex-col {expanded ? 'w-64' : 'w-20'} 
           border-r border-gray-200 bg-white shadow-md transition-all duration-300"
    >
        <!-- Header without the toggle button -->
		<div class="flex h-16 items-center justify-between border-b border-gray-200 px-4">
			<a href="/" class="flex items-center">
				<div class="flex items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] p-2 shadow-sm">
					<Icon name="globe" className="h-5 w-5 text-white" />
				</div>
				{#if expanded}
					<span class="ml-3 text-xl font-semibold text-gray-800" in:fade={{ duration: 200 }}>
						TrackMyMeds
					</span>
				{/if}
			</a>
		</div>

		<!-- Sidebar toggle button positioned at the edge -->
		<button
			on:click={toggleSidebar}
			class="absolute -right-10.5 top-4 flex h-8 w-8 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1a5f4a] focus:outline-none focus:ring-2 focus:ring-[#1a5f4a]/20"
			aria-label="Toggle sidebar"
		>
			<Icon name={expanded ? "chevrons-left" : "layout-sidebar"} className="h-4 w-4" />
		</button>

        <!-- Navigation -->
        <nav class="flex-1 overflow-y-auto px-3 py-4">
            {#each navCategories as category, categoryIndex}
                <div class="mb-6">
                    {#if expanded}
                        <h3 class="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500" 
                            in:fade={{ duration: 200, delay: categoryIndex * 50 }}>
                            {category.label}
                        </h3>
                    {:else}
                        <div class="mb-2 mx-auto h-px w-8 bg-gray-200"></div>
                    {/if}
                    
                    <ul class="space-y-1">
                        {#each category.items as item, i}
                            <li class="relative">
                                <!-- <Tooltip text={item.label} placement="right" offset={12} showOnCollapsed={!expanded}> -->
                                    <a
                                        href={item.href}
                                        class="group flex items-center rounded-lg p-3 text-sm font-medium transition-all duration-200
                                            {isActive(item.href)
                                            ? 'bg-[#1a5f4a]/10 text-[#1a5f4a]'
                                            : 'text-gray-700 hover:bg-[#1a5f4a]/5 hover:text-[#1a5f4a]'}"
                                        style="animation-delay: {(categoryIndex * 100) + (i * 50)}ms"
                                    >
                                        <div class="relative flex-shrink-0">
                                            {#if isActive(item.href)}
                                                <div class="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#1a5f4a]"></div>
                                            {/if}
                                            <div class="{isActive(item.href) ? 'bg-[#1a5f4a]/10' : 'bg-gray-100 group-hover:bg-[#1a5f4a]/5'} flex h-9 w-9 items-center justify-center rounded-lg transition-colors">
                                                <Icon
                                                    name={item.icon}
                                                    className="h-5 w-5 {isActive(item.href)
                                                    ? 'text-[#1a5f4a]'
                                                    : 'text-gray-500 group-hover:text-[#1a5f4a]'}"
                                                />
                                            </div>
                                        </div>
                                        
                                        {#if expanded}
                                            <span class="ml-3 whitespace-nowrap" in:fade={{ duration: 200 }}>
                                                {item.label}
                                            </span>
                                            
                                            {#if item.badge}
                                                <span class="ml-auto rounded-full px-2 py-0.5 text-xs font-semibold 
                                                    {item.badge === 'New' 
                                                        ? 'bg-blue-100 text-blue-700' 
                                                        : 'bg-[#1a5f4a]/10 text-[#1a5f4a]'}"
                                                >
                                                    {item.badge}
                                                </span>
                                            {/if}
                                        {:else if item.badge}
                                            <div class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"></div>
                                        {/if}
                                    </a>
                                <!-- </Tooltip> -->
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </nav>

        <!-- User Profile Section -->
        <div class="border-t border-gray-200 p-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="relative">
                        <div
                            class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1a5f4a] to-[#2c8a6d] text-sm font-medium text-white shadow-sm"
                        >
                            {'name' in user && user.name 
                                ? user.name.charAt(0).toUpperCase() 
                                : 'U'}
                        </div>
                        <div class="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
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
                        class="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                        in:fade={{ duration: 200 }}
                        aria-label="Logout"
                    >
                        <Icon name="logout" className="h-5 w-5" />
                    </button>
                {:else}
                    <Tooltip text="Logout" placement="right" offset={8}>
                        <button
                            class="mt-2 rounded-md p-1 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none"
                            aria-label="Logout"
                        >
                            <Icon name="logout" className="h-4 w-4" />
                        </button>
                    </Tooltip>
                {/if}
            </div>
        </div>
    </aside>
</div>

<style>
    /* Enhanced scrollbar styling */
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
    
    /* Subtle bounce animation for entering items */
    @keyframes menuItemEnter {
        0% { opacity: 0; transform: translateX(-8px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    
    /* Apply animation to menu items */
    a[href] {
        animation: menuItemEnter 0.3s ease-out backwards;
    }
    
    /* Hover effect for icon containers */
    a:hover div.flex {
        transform: scale(1.05);
        transition: transform 0.2s ease-out;
    }
</style>
