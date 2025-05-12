<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let loading: boolean = false;
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let fullWidth: boolean = false;

	const variantClass = {
		primary: 'bg-[#1a5f4a] hover:bg-[#154739] text-white border-transparent',
		secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent',
		outline: 'bg-transparent hover:bg-[#1a5f4a]/10 text-[#1a5f4a] border-[#1a5f4a]'
	}[variant];

	const widthClass = fullWidth ? 'w-full' : '';
</script>

<button
	{type}
	class="{variantClass} {widthClass} mt-2 flex transform items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md focus:ring-2 focus:ring-[#1a5f4a] focus:ring-offset-2 focus:outline-none active:scale-95"
	disabled={disabled || loading}
>
	<div class="relative flex h-full w-full items-center justify-center transition-all duration-300">
		<div
			class="absolute inset-0 flex items-center justify-center {loading
				? 'opacity-100'
				: 'opacity-0'} transition-opacity duration-300"
		>
			<svg
				class="mr-2 -ml-1 h-4 w-4 animate-spin text-current"
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
			<span>Loading...</span>
		</div>
		<div class="{loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300">
			<slot />
		</div>
	</div>
</button>

<style>
	@keyframes pulse {
		0%,
		100% {
			box-shadow: 0 0 0 0 rgba(26, 95, 74, 0.4);
		}
		50% {
			box-shadow: 0 0 0 6px rgba(26, 95, 74, 0);
		}
	}

	button:not(:disabled):hover {
		animation: pulse 2s infinite;
	}
</style>
