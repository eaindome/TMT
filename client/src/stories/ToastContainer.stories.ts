import type { Meta, StoryObj } from '@storybook/svelte';
import ToastContainer from '$lib/components/ToastContainer.svelte';
import { toasts } from '$lib/stores/toasts';

const meta = {
	title: 'UI/ToastContainer',
	component: ToastContainer,
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: 'select',
			options: [
				'top-right',
				'top-left',
				'bottom-right',
				'bottom-left',
				'top-center',
				'bottom-center'
			],
			description: 'Position of the toast notifications on the screen'
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					'ToastContainer component displays notification alerts in different positions on the screen.'
			}
		}
	}
} satisfies Meta<ToastContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		position: 'top-right'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	})
};

export const TopRight: Story = {
	args: {
		position: 'top-right'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const TopLeft: Story = {
	args: {
		position: 'top-left'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const BottomRight: Story = {
	args: {
		position: 'bottom-right'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const BottomLeft: Story = {
	args: {
		position: 'bottom-left'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const TopCenter: Story = {
	args: {
		position: 'top-center'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const BottomCenter: Story = {
	args: {
		position: 'bottom-center'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add example toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
	}
};

export const DifferentTypes: Story = {
	args: {
		position: 'top-right'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add different types of toasts
		toasts.add('This is an information message', 'info', 0);
		toasts.add('Operation completed successfully', 'success', 0);
		toasts.add('Warning: This action may have consequences', 'warning', 0);
		toasts.add('Error: Something went wrong', 'error', 0);
	}
};

export const WithAutoDismiss: Story = {
	args: {
		position: 'top-right'
	},
	render: (args) => ({
		Component: ToastContainer,
		props: args
	}),
	play: async () => {
		// Clear existing toasts first
		document.querySelectorAll('[aria-live="polite"] > div').forEach((el) => el.remove());

		// Add toasts with auto-dismiss (short timeout for demo purposes)
		toasts.add('This toast will auto-dismiss in 3 seconds', 'info', 3000);
		setTimeout(() => {
			toasts.add('This toast will auto-dismiss in 5 seconds', 'success', 5000);
		}, 1000);
	}
};
