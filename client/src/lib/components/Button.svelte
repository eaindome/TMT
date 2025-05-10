<script lang="ts">
	import type { ComponentType, SvelteComponent } from 'svelte';
	import { onMount, createEventDispatcher } from 'svelte';

	// Types
	type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'caution' | 'outline' | 'ghost';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	type Shape = 'rounded' | 'pill' | 'square';

	// Props
	export let variant: Variant = 'primary';
	export let size: Size = 'md';
	export let shape: Shape = 'rounded';
	export let disabled: boolean = false;
	export let loading: boolean = false;
	export let loadingText: string = 'Loading...';
	export let showLoadingText: boolean = true;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let fullWidth: boolean = false;
	export let icon: ComponentType<SvelteComponent> | null = null;
	export let iconPosition: 'left' | 'right' = 'left';
	export let elevation: boolean = false;
	export let ripple: boolean = true;
	export let animateOnHover: boolean = true;
	export let pulse: boolean = false;

	// Element reference for ripple effect
	let buttonElement: HTMLButtonElement;
	let rippleElements: HTMLSpanElement[] = [];
	let isPressed = false;
	let isHovered = false;

	// Event dispatcher for custom events
	const dispatch = createEventDispatcher();

	// Base variant classes with improved state transitions
	const variantClasses: Record<Variant, string> = {
		primary: 'bg-[#1a5f4a] hover:bg-[#154739] active:bg-[#0f3529] text-white',
		secondary: 'bg-[#607d8b] hover:bg-[#546e7a] active:bg-[#455a64] text-white',
		success: 'bg-[#4caf50] hover:bg-[#43a047] active:bg-[#388e3c] text-white',
		danger: 'bg-[#d32f2f] hover:bg-[#c62828] active:bg-[#b71c1c] text-white',
		caution: 'bg-[#f4b400] hover:bg-[#f0a800] active:bg-[#e69c00] text-black',
		outline: 'bg-white border border-[#1a5f4a] text-[#1a5f4a] hover:bg-gray-50 active:bg-gray-100',
		ghost: 'bg-transparent text-[#1a5f4a] hover:bg-[#1a5f4a]/5 active:bg-[#1a5f4a]/10'
	};

	// Size classes with better proportions
	const sizeClasses: Record<Size, string> = {
		xs: 'text-xs py-1 px-2 h-6',
		sm: 'text-sm py-1.5 px-3 h-8',
		md: 'text-base py-2 px-4 h-10',
		lg: 'text-lg py-2.5 px-5 h-12',
		xl: 'text-xl py-3 px-6 h-14'
	};

	// Shape classes
	const shapeClasses: Record<Shape, string> = {
		rounded: 'rounded-md',
		pill: 'rounded-full',
		square: 'rounded-none'
	};

	// Dynamic classes based on props
	$: classes = `
	  ${variantClasses[variant]}
	  ${sizeClasses[size]}
	  ${shapeClasses[shape]}
	  ${fullWidth ? 'w-full' : ''}
	  ${elevation && !disabled ? 'shadow-sm hover:shadow-md active:shadow-sm' : ''}
	  font-medium
	  transition-all duration-300 ease-in-out
	  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a5f4a] focus:ring-opacity-50
	  ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
	  ${loading ? 'relative' : ''}
	  ${pulse && !disabled && !loading ? 'hover-pulse' : ''}
	  ${animateOnHover && !disabled ? 'transform hover:scale-105 active:scale-95' : ''}
	  relative overflow-hidden
	  flex items-center justify-center
	`;

	// Create ripple effect
	function createRipple(event: MouseEvent) {
		if (!ripple || disabled || loading) return;

		isPressed = true;

		const button = buttonElement;
		const diameter = Math.max(button.clientWidth, button.clientHeight);
		const radius = diameter / 2;

		const rect = button.getBoundingClientRect();
		const x = event.clientX - rect.left - radius;
		const y = event.clientY - rect.top - radius;

		// Create the ripple element
		const rippleElement = document.createElement('span');
		rippleElement.style.width = rippleElement.style.height = `${diameter}px`;
		rippleElement.style.left = `${x}px`;
		rippleElement.style.top = `${y}px`;
		rippleElement.classList.add('ripple');

		// Keep track of ripple elements
		rippleElements.push(rippleElement);
		button.appendChild(rippleElement);

		// Remove ripple after animation
		setTimeout(() => {
			if (rippleElement && button.contains(rippleElement)) {
				button.removeChild(rippleElement);
				rippleElements = rippleElements.filter((el) => el !== rippleElement);
			}
		}, 600);
	}

	// Handle mouse events
	function handleMouseDown(event: MouseEvent) {
		if (!disabled && !loading) {
			createRipple(event);
		}
	}

	function handleMouseUp() {
		isPressed = false;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
		isPressed = false;
	}

	// Clean up ripples on unmount
	onMount(() => {
		return () => {
			rippleElements.forEach((el) => {
				if (el.parentNode === buttonElement) {
					buttonElement.removeChild(el);
				}
			});
		};
	});

	// Handle custom click event
	function handleClick(event: MouseEvent) {
		if (!disabled && !loading) {
			dispatch('click', event);
		}
	}
</script>

<button
	bind:this={buttonElement}
	{type}
	{disabled}
	class={classes}
	on:click={handleClick}
	on:mousedown={handleMouseDown}
	on:mouseup={handleMouseUp}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	{...$$restProps}
>
	<div class="relative flex h-full w-full items-center justify-center gap-2">
		{#if loading}
			<div class="flex items-center justify-center transition-opacity duration-300">
				<svg
					class="mr-2 h-4 w-4 animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				{#if showLoadingText}
					<span>{loadingText}</span>
				{/if}
			</div>
		{:else}
			<div
				class="flex items-center transition-all duration-300 {isPressed
					? 'scale-95'
					: isHovered
						? 'scale-105'
						: 'scale-100'}"
			>
				{#if icon && iconPosition === 'left'}
					<span
						class="mr-2 h-5 w-5 transition-transform duration-300 {isHovered
							? '-translate-x-0.5'
							: ''}"
					>
						{#if typeof icon === 'function'}
							<svelte:component this={icon} />
						{/if}
					</span>
				{/if}

				<span>
					<slot />
				</span>

				{#if icon && iconPosition === 'right'}
					<span
						class="ml-2 h-5 w-5 transition-transform duration-300 {isHovered
							? 'translate-x-0.5'
							: ''}"
					>
						{#if typeof icon === 'function'}
							<svelte:component this={icon} />
						{/if}
					</span>
				{/if}
			</div>
		{/if}
	</div>
</button>

<style>
	/* Ripple effect */
	.ripple {
		position: absolute;
		border-radius: 50%;
		transform: scale(0);
		opacity: 0.4;
		background-color: rgba(255, 255, 255, 0.7);
		pointer-events: none;
		animation: ripple 600ms linear;
		z-index: 0;
	}

	@keyframes ripple {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}

	/* Pulse animation on hover */
	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(26, 95, 74, 0.4);
		}
		50% {
			box-shadow: 0 0 0 6px rgba(26, 95, 74, 0);
		}
	}

	.hover-pulse:hover {
		animation: pulse 2s infinite;
	}

	/* Make sure button content is above ripple */
	button {
		position: relative;
		z-index: 1;
	}

	button > :global(*) {
		position: relative;
		z-index: 2;
	}

	/* Ensure disabled buttons don't transform */
	button:disabled {
		transform: scale(1) !important;
		box-shadow: none !important;
	}
</style>
