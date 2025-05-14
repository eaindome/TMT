<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { createForm, type ValidationRules } from '$lib/utils/form';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let showTitle = true;
	export let initialValues = {
		fullName: '',
		email: '',
		category: 'Feedback',
		message: '',
		attachment: null as File | null
	};

	const dispatch = createEventDispatcher();

	// Initialize form with validation
	const validationSchema: Record<string, ValidationRules> = {
		fullName: { required: true, minLength: 2, maxLength: 100 },
		email: { required: true, email: true, maxLength: 100 },
		category: { required: true },
		message: { required: true, minLength: 10, maxLength: 2000 }
	};

	// Create the form without the recursive assignment
	const form = createForm(initialValues);

	let loading = false;
	let submitted = false;
	let errorMessage = '';
	let attachmentName = '';
	let focusedField = '';
	let currentStep = 1;
	const totalSteps = 3;
	let formProgress = 0;

	// Update progress based on valid fields
	$: {
		let validFieldsCount = 0;

		if (touched.fullName && !errors.fullName) validFieldsCount++;
		if (touched.email && !errors.email) validFieldsCount++;
		if (touched.category) validFieldsCount++;
		if (touched.message && !errors.message) validFieldsCount++;

		formProgress = (validFieldsCount / 4) * 100;
	}

	// Handle form submission
	async function handleSubmit() {
		form.validate(validationSchema);
		let formStore: any;
		form.subscribe(
			(state: {
				values: Record<string, any>;
				isValid: boolean;
				errors: Record<string, string>;
				touched: Record<string, boolean>;
			}) => {
				formStore = state;
			}
		)();

		if (!formStore.isValid) {
			// Mark all fields as touched to show validation errors
			form.setTouched('fullName');
			form.setTouched('email');
			form.setTouched('message');
			return;
		}

		loading = true;

		try {
			// Dispatch the form data to parent
			dispatch('submit', {
				...formStore.values,
				attachment: formStore.values.attachment
			});

			// Simulating API call delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			submitted = true;
			errorMessage = '';

			// Reset form after submission
			setTimeout(() => {
				form.reset();
				attachmentName = '';
				submitted = false;
				currentStep = 1;
			}, 5000);
		} catch (err) {
			errorMessage = 'There was an error submitting your message. Please try again.';
		} finally {
			loading = false;
		}
	}

	// Handle file selection
	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0];
			// Check file size (5MB limit)
			if (file.size > 5 * 1024 * 1024) {
				errorMessage = 'File is too large. Please upload a file under 5MB.';
				return;
			}

			form.setValue('attachment', file);
			attachmentName = file.name;
			errorMessage = '';
		} else {
			form.setValue('attachment', null);
			attachmentName = '';
		}
	}

	// Form field update handler
	function updateField(
		field: 'email' | 'fullName' | 'category' | 'message' | 'attachment',
		event: Event
	) {
		const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
		form.setValue(field, target.value);
		if (errorMessage) errorMessage = '';
	}

	// Apply validation on blur
	function handleBlur(field: 'fullName' | 'email' | 'category' | 'message' | 'attachment') {
		form.setTouched(field);
		form.validate(validationSchema);
		focusedField = '';
	}

	// Set focused field
	function handleFocus(field: 'fullName' | 'email' | 'category' | 'message' | 'attachment') {
		focusedField = field;
	}

	// Go to next or previous step
	function navigateStep(direction: 'next' | 'prev') {
		if (direction === 'next' && currentStep < totalSteps) {
			// Only allow moving forward if current step fields are valid
			if (currentStep === 1) {
				form.setTouched('fullName');
				form.setTouched('email');
				form.validate(validationSchema);

				if (errors.fullName || errors.email) return;
			} else if (currentStep === 2) {
				form.setTouched('message');
				form.validate(validationSchema);

				if (errors.message) return;
			}

			currentStep++;
		} else if (direction === 'prev' && currentStep > 1) {
			currentStep--;
		}
	}

	// Subscribe to form store for validation
	let errors: Record<string, string> = {};
	let touched: Record<string, boolean> = {};
	// Use the reactive store directly with $form syntax

	const unsubscribe = form.subscribe(
		(state: {
			errors: Record<string, string>;
			touched: Record<string, boolean>;
			values: Record<string, any>;
		}) => {
			errors = state.errors;
			touched = state.touched;
		}
	);

	onMount(() => {
		return unsubscribe;
	});

	// Helper function to get character count
	function getCharacterCount(text: string): string {
		return `${text.length}/2000`;
	}
</script>

<div class="overflow-hidden rounded-lg bg-white p-6 shadow-md">
	{#if showTitle}
		<h2 class="mb-2 text-2xl font-bold text-[#1a5f4a]">Get in Touch</h2>
		<p class="mb-6 text-[#607d8b]">
			We're here to help with any questions or feedback you may have.
		</p>
	{/if}

	{#if !submitted}
		<!-- Progress bar -->
		<div class="mb-6">
			<div class="mb-1 flex items-center justify-between">
				<span class="text-sm font-medium text-[#1a5f4a]">Form Progress</span>
				<span class="text-sm text-[#607d8b]">{Math.round(formProgress)}%</span>
			</div>
			<div class="h-2.5 w-full rounded-full bg-gray-200">
				<div
					class="h-2.5 rounded-full transition-all duration-500 ease-out"
					style="width: {formProgress}%; background-color: #1a5f4a;"
				></div>
			</div>
		</div>
	{/if}

	{#if submitted}
		<div
			class="bg-opacity-10 mb-6 rounded-lg border border-[#4caf50] bg-[#4caf50] p-6"
			in:fly={{ y: 20, duration: 600, easing: quintOut }}
		>
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="mr-4 h-12 w-12 text-[#4caf50]"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<h3 class="text-lg font-semibold text-[#1a5f4a]">Message Sent Successfully!</h3>
					<p class="text-[#4caf50]">
						Thank you for reaching out! We've received your message and will get back to you
						shortly.
					</p>
				</div>
			</div>
		</div>
	{:else}
		{#if errorMessage}
			<div
				class="bg-opacity-10 mb-6 rounded-lg border border-[#d32f2f] bg-[#d32f2f] p-4"
				transition:fade={{ duration: 200 }}
			>
				<div class="flex items-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="mt-0.5 mr-2 h-5 w-5 text-[#d32f2f]"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="font-medium text-[#d32f2f]">{errorMessage}</p>
				</div>
			</div>
		{/if}

		<form on:submit|preventDefault={handleSubmit} class="space-y-5">
			<!-- Step indicators -->
			<div class="mb-4 flex justify-center">
				{#each Array(totalSteps) as _, i}
					<button
						type="button"
						class="mx-4 flex cursor-pointer flex-col items-center"
						on:click={() =>
							currentStep === i + 1 ? null : navigateStep(i + 1 < currentStep ? 'prev' : 'next')}
						aria-label="Step {i + 1}: {i === 0 ? 'Your Info' : i === 1 ? 'Message' : 'Attachment'}"
					>
						<div
							class="mb-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300
					{currentStep > i + 1
								? 'bg-[#4caf50] text-white'
								: currentStep === i + 1
									? 'bg-[#1a5f4a] text-white'
									: 'bg-gray-200 text-gray-500'}"
						>
							{#if currentStep > i + 1}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							{:else}
								{i + 1}
							{/if}
						</div>
						<span class="text-xs font-medium text-[#607d8b]">
							{i === 0 ? 'Your Info' : i === 1 ? 'Message' : 'Attachment'}
						</span>
					</button>
				{/each}
			</div>

			<!-- Step 1: Personal Info -->
			{#if currentStep === 1}
				<div in:fade={{ duration: 300 }}>
					<h3 class="mb-4 text-lg font-semibold text-[#1a5f4a]">Your Information</h3>

					<!-- Full Name -->
					<div class="mb-5">
						<label for="fullName" class="mb-1 block text-sm font-medium text-[#607d8b]">
							Full Name <span class="text-[#d32f2f]">*</span>
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</span>
							<input
								type="text"
								id="fullName"
								name="fullName"
								on:input={(e) => updateField('fullName', e)}
								on:blur={() => handleBlur('fullName')}
								on:focus={() => handleFocus('fullName')}
								class="w-full rounded-md border py-3 pr-4 pl-10 transition-all duration-300 focus:outline-none
                  {focusedField === 'fullName' ? 'border-[#1a5f4a] ring-2 ring-[#1a5f4a]/20' : ''}
                  {touched.fullName && errors.fullName ? 'border-[#d32f2f]' : 'border-gray-300'}"
								placeholder="Your name"
							/>
							{#if touched.fullName && !errors.fullName}
								<span class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
							{/if}
						</div>
						{#if touched.fullName && errors.fullName}
							<p class="mt-1 flex items-center text-sm text-[#d32f2f]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								{errors.fullName}
							</p>
						{/if}
					</div>

					<!-- Email -->
					<div class="mb-5">
						<label for="email" class="mb-1 block text-sm font-medium text-[#607d8b]">
							Email Address <span class="text-[#d32f2f]">*</span>
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<input
								type="email"
								id="email"
								name="email"
								on:input={(e) => updateField('email', e)}
								on:blur={() => handleBlur('email')}
								on:focus={() => handleFocus('email')}
								class="w-full rounded-md border py-3 pr-4 pl-10 transition-all duration-300 focus:outline-none
                  {focusedField === 'email' ? 'border-[#1a5f4a] ring-2 ring-[#1a5f4a]/20' : ''}
                  {touched.email && errors.email ? 'border-[#d32f2f]' : 'border-gray-300'}"
								placeholder="email@example.com"
							/>
							{#if touched.email && !errors.email}
								<span class="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</span>
							{/if}
						</div>
						{#if touched.email && errors.email}
							<p class="mt-1 flex items-center text-sm text-[#d32f2f]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								{errors.email}
							</p>
						{/if}
					</div>

					<!-- Category -->
					<div class="mb-5">
						<label for="category" class="mb-1 block text-sm font-medium text-[#607d8b]">
							Subject Category
						</label>
						<div class="relative">
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
									/>
								</svg>
							</span>
							<select
								id="category"
								name="category"
								on:change={(e) => updateField('category', e)}
								on:focus={() => handleFocus('category')}
								on:blur={() => handleBlur('category')}
								class="w-full appearance-none rounded-md border border-gray-300 bg-white py-3 pr-10 pl-10 transition-all duration-300 focus:outline-none
                  {focusedField === 'category' ? 'border-[#1a5f4a] ring-2 ring-[#1a5f4a]/20' : ''}"
							>
								<option value="Feedback">Feedback</option>
								<option value="Bug Report">Bug Report</option>
								<option value="Suggestion">Suggestion</option>
								<option value="Partnership">Partnership</option>
								<option value="Other">Other</option>
							</select>
							<div
								class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div class="mt-6 flex justify-end">
						<button
							type="button"
							on:click={() => navigateStep('next')}
							class="flex items-center rounded-md bg-[#1a5f4a] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#164639]"
						>
							Continue
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/if}

			<!-- Step 2: Message -->
			{#if currentStep === 2}
				<div in:fade={{ duration: 300 }}>
					<h3 class="mb-4 text-lg font-semibold text-[#1a5f4a]">Your Message</h3>

					<!-- Message -->
					<div class="mb-5">
						<label for="message" class="mb-1 block text-sm font-medium text-[#607d8b]">
							Message <span class="text-[#d32f2f]">*</span>
						</label>
						<div class="relative">
							<textarea
								id="message"
								name="message"
								on:input={(e) => updateField('message', e)}
								on:blur={() => handleBlur('message')}
								on:focus={() => handleFocus('message')}
								class="min-h-[180px] w-full rounded-md border px-4 py-3 transition-all duration-300 focus:outline-none
                                {focusedField === 'message'
									? 'border-[#1a5f4a] ring-2 ring-[#1a5f4a]/20'
									: ''}
                                {touched.message && errors.message
									? 'border-[#d32f2f]'
									: 'border-gray-300'}"
								placeholder="Please describe your question, feedback, or issue in detail..."
							></textarea>

							<!-- Character count -->
								{getCharacterCount($form.values.message || '')}
						</div>
						{#if touched.message && errors.message}
							<p class="mt-1 flex items-center text-sm text-[#d32f2f]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mr-1 h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								{errors.message}
							</p>
						{/if}
					</div>

					<div class="mt-6 flex justify-between">
						<button
							type="button"
							on:click={() => navigateStep('prev')}
							class="flex items-center rounded-md border border-[#1a5f4a] px-6 py-3 font-medium text-[#1a5f4a] transition-all duration-300 hover:bg-[#1a5f4a]/5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Back
						</button>
						<button
							type="button"
							on:click={() => navigateStep('next')}
							class="flex items-center rounded-md bg-[#1a5f4a] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#164639]"
						>
							Continue
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>
				</div>
			{/if}

			<!-- Step 3: Attachment & Submit -->
			{#if currentStep === 3}
				<div in:fade={{ duration: 300 }}>
					<h3 class="mb-4 text-lg font-semibold text-[#1a5f4a]">Attachment (Optional)</h3>

					<!-- File Attachment -->
					<div class="mb-5">
						<label for="attachment" class="mb-3 block text-sm font-medium text-[#607d8b]">
							Add supporting documents or images
						</label>
						<div
							class="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors duration-300 hover:border-[#1a5f4a]"
						>
							<input
								type="file"
								id="attachment"
								name="attachment"
								on:change={handleFileChange}
								accept="image/*,.pdf"
								class="hidden"
							/>

							{#if attachmentName}
								<div class="mb-4 flex items-center justify-center">
									<div class="mr-3 rounded-full bg-[#e8f5e9] p-2 text-[#43a047]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div class="text-left">
										<p class="font-medium text-[#1a5f4a]">{attachmentName}</p>
										<button
											type="button"
											class="text-sm text-[#d32f2f] hover:underline focus:outline-none"
											on:click={() => {
												form.setValue('attachment', null);
												attachmentName = '';
											}}
										>
											Remove
										</button>
									</div>
								</div>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="mx-auto h-12 w-12 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
									/>
								</svg>
								<p class="mt-2 text-sm text-gray-600">
									Drag and drop files, or <label
										for="attachment"
										class="cursor-pointer font-medium text-[#1a5f4a] hover:underline">browse</label
									>
								</p>
								<p class="mt-1 text-xs text-gray-500">
									You can upload screenshots or photos of medicines (Max 5MB)
								</p>
							{/if}
						</div>
					</div>

					<div class="bg-opacity-50 mt-8 mb-6 rounded-lg bg-[#e8f5e9] p-4">
						<h4 class="mb-2 flex items-center font-medium text-[#1a5f4a]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Review Your Information
						</h4>
						<div class="grid grid-cols-2 gap-4 text-sm">
							<div>
								<p class="text-gray-500">Name:</p>
								<p class="font-medium">{$form.values.fullName || 'Not provided'}</p>
							</div>
							<div>
								<p class="text-gray-500">Email:</p>
								<p class="font-medium">{$form.values.email || 'Not provided'}</p>
							</div>
							<div>
								<p class="text-gray-500">Category:</p>
								<p class="font-medium">{$form.values.category}</p>
							</div>
							<div>
								<p class="text-gray-500">Attachment:</p>
								<p class="font-medium">{attachmentName || 'None'}</p>
							</div>
						</div>
					</div>

					<div class="mt-6 flex justify-between">
						<button
							type="button"
							on:click={() => navigateStep('prev')}
							class="flex items-center rounded-md border border-[#1a5f4a] px-6 py-3 font-medium text-[#1a5f4a] transition-all duration-300 hover:bg-[#1a5f4a]/5"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mr-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							Back
						</button>
						<button
							type="submit"
							class="flex items-center rounded-md bg-[#1a5f4a] px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-[#164639] disabled:cursor-not-allowed disabled:opacity-50"
							disabled={loading}
						>
							{#if loading}
								<svg
									class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										class="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										stroke-width="4"
									></circle>
									<path
										class="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Sending...
							{:else}
								Submit Message
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ml-2 h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
									/>
								</svg>
							{/if}
						</button>
					</div>
				</div>
			{/if}
		</form>
	{/if}
</div>

<style>
	/* Smooth transitions for form elements */
	input,
	textarea,
	select,
	button {
		transition: all 0.2s ease-in-out;
	}

	/* Styled file input */
	input[type='file'] {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}

	/* Remove focus ring for mouse users, keep for keyboard users */
	:global(.js-focus-visible :focus:not(.focus-visible)) {
		outline: none;
	}

	/* Custom scrollbar for textarea */
	textarea {
		scrollbar-width: thin;
		scrollbar-color: #b0bec5 transparent;
	}

	textarea::-webkit-scrollbar {
		width: 8px;
	}

	textarea::-webkit-scrollbar-track {
		background: transparent;
	}

	textarea::-webkit-scrollbar-thumb {
		background-color: #b0bec5;
		border-radius: 4px;
	}
</style>
