<script lang="ts">
	import { scan } from '$lib/stores/scan';
	import { user, token } from '$lib/stores/user';
	import { uploadScan } from '$lib/api/scan';
	import { validateForm, scanSchema } from '$lib/utils/validation';
	import { goto } from '$app/navigation';
	import { toasts } from '$lib/stores/toasts';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { CameraIcon, ImageIcon } from 'svelte-feather-icons';

	let file: File | null = null;
	let batchNumber = '';
	let error = '';
	let filePreview: string | null = null;
	let isDragging = false;

	// Create file preview when file is selected
	$: if (file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			filePreview = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	} else {
		filePreview = null;
	}

	async function handleSubmit() {
		if (!$user) {
			goto('/login');
			return;
		}

		error = '';

		// Use the new Zod validation
		const validation = validateForm(scanSchema, { batchNumber, photo: file });
		if (!validation.success) {
			error = Object.values(validation.errors || {})[0] || '';
			toasts.error(error);
			return;
		}

		// Use the store methods directly from the store object
		scan.update((state) => ({ ...state, loading: true, error: null }));

		try {
			if (!$token) {
				error = 'Authentication token is missing.';
				toasts.error(error);
				return;
			}

			const result = await uploadScan(file!, batchNumber, $token);

			// Update the scan store with the new data
			scan.update((state) => ({
				...state,
				scanId: result.id,
				photoUrl: result.url,
				batchNumber,
				verdict: (result.verdict as any) || 'unknown',
				loading: false,
				error: null
			}));

			toasts.success('Scan uploaded successfully!');
			goto('/result');
		} catch (err) {
			if (err instanceof Error) {
				scan.update((state) => ({ ...state, loading: false, error: err.message }));
				error = err.message;
				toasts.error(error);
			} else {
				scan.update((state) => ({ ...state, loading: false, error: 'An unknown error occurred.' }));
				error = 'An unknown error occurred.';
				toasts.error(error);
			}
		}
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;

		if (e.dataTransfer?.files?.length) {
			file = e.dataTransfer.files[0];
		}
	}
</script>

<Card padding="lg" shadow="md">
	<h1 class="text-trust-green mb-4 text-2xl font-bold">Scan Medicine</h1>
	<p class="text-neutral-gray mb-6">
		Upload a clear photo of the medicine packaging and enter the batch number.
	</p>

	{#if error}
		<Alert message={error} type="error" className="mb-4" />
	{/if}

	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<label for="photo-upload" class="text-neutral-gray mb-1 block text-sm font-medium"
				>Photo</label
			>
			<div
				class="border-neutral-gray rounded-lg border-2 {isDragging
					? 'border-trust-green bg-trust-green/10'
					: 'border-dashed'} p-4 text-center transition-colors"
				on:dragover={handleDragOver}
				on:dragleave={handleDragLeave}
				on:drop={handleDrop}
				role="button"
				tabindex="0"
				aria-label="Upload photo by dragging and dropping"
			>
				<input
					type="file"
					accept="image/*"
					on:change={(e) => {
						const input = e.target as HTMLInputElement;
						if (input && input.files) file = input.files[0];
					}}
					class="hidden"
					id="photo-upload"
					disabled={$scan.loading}
				/>

				{#if filePreview}
					<div class="relative mx-auto max-w-xs">
						<img src={filePreview} alt="Preview" class="mx-auto mb-2 max-h-40 rounded" />
						<button
							type="button"
							class="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white"
							on:click={() => (file = null)}
							disabled={$scan.loading}
						>
							✕
						</button>
						<p class="text-trust-green text-sm">{file?.name}</p>
					</div>
				{:else}
					<label for="photo-upload" class="cursor-pointer">
						{#if $scan.loading}
							<div class="flex animate-pulse flex-col items-center">
								<div class="mb-2 h-8 w-8 rounded-full bg-neutral-200"></div>
								<div class="h-4 w-32 rounded bg-neutral-200"></div>
							</div>
						{:else}
							<CameraIcon class="text-trust-green mx-auto h-8 w-8" />
							<p class="text-neutral-gray mt-2 text-sm">Drag and drop or click to upload</p>
						{/if}
					</label>
				{/if}
			</div>
		</div>

		<div>
			<label for="batchNumber" class="text-neutral-gray mb-1 block text-sm font-medium"
				>Batch Number</label
			>
			<input
				type="text"
				id="batchNumber"
				bind:value={batchNumber}
				class="border-neutral-gray focus:ring-trust-green focus:border-trust-green w-full rounded-md border p-2"
				placeholder="e.g., BATCH123"
				disabled={$scan.loading}
			/>
		</div>

		<Button
			type="submit"
			variant="primary"
			loading={$scan.loading}
			disabled={$scan.loading || !file || !batchNumber}
			fullWidth
		>
			{#if $scan.loading}
				Analyzing Medicine...
			{:else}
				Analyze Now
			{/if}
		</Button>
	</form>
</Card>
