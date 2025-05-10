<script lang="ts">
	// Props for the Skeleton component
	export let width: string = '100%';
	export let height: string = '1rem';
	export let rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'md';
	export let className: string = '';
	export let animation: 'pulse' | 'wave' | 'none' = 'pulse';

	// Map rounded values to Tailwind classes
	const roundedClasses = {
		none: 'rounded-none',
		sm: 'rounded-sm',
		md: 'rounded',
		lg: 'rounded-lg',
		full: 'rounded-full'
	};

	// Map animation values to Tailwind classes
	const animationClasses = {
		pulse: 'animate-pulse',
		wave: 'animate-shimmer',
		none: ''
	};

	// Compute final class list
	$: classes = `
        bg-neutral-200 dark:bg-neutral-700
        ${roundedClasses[rounded]}
        ${animationClasses[animation]}
        ${className}
    `;

	// Generate unique IDs for gradient animation, if needed
	const id = `skeleton-${Math.random().toString(36).substring(2, 9)}`;
</script>

{#if animation === 'wave'}
	<div
		class={classes}
		style="width: {width}; height: {height}; position: relative; overflow: hidden;"
	>
		<div
			class="absolute inset-0"
			style="
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 1.5s infinite;
        "
		></div>
	</div>
{:else}
	<div class={classes} style="width: {width}; height: {height};"></div>
{/if}

<style>
	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.animate-shimmer {
		position: relative;
		overflow: hidden;
	}
</style>
