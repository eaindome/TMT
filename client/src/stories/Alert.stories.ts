import type { Meta, StoryObj } from '@storybook/svelte';
import Alert from '$lib/components/Alert.svelte';

const meta = {
	title: 'UI/Alert',
	component: Alert,
	tags: ['autodocs'],
	argTypes: {
		message: {
			control: 'text',
			description: 'The message to display in the alert'
		},
		type: {
			control: 'select',
			options: ['error', 'warning', 'success', 'info'],
			description: 'The type of alert which determines its color and icon'
		},
		dismissible: {
			control: 'boolean',
			description: 'Whether the alert can be dismissed'
		},
		timeout: {
			control: 'number',
			description: 'Time in milliseconds before the alert auto-dismisses (0 means no auto-dismiss)'
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes to apply to the alert container'
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					'Alert component provides contextual feedback messages for typical user actions with support for different types and dismissibility.'
			}
		},
		actions: {
			handles: ['dismiss']
		}
	}
} satisfies Meta<Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
	args: {
		type: 'error',
		message: 'There was an error processing your request. Please try again.',
		dismissible: true,
		timeout: 0
	}
};

export const Warning: Story = {
	args: {
		type: 'warning',
		message: 'Your session will expire in 5 minutes. Please save your work.',
		dismissible: true,
		timeout: 0
	}
};

export const Success: Story = {
	args: {
		type: 'success',
		message: 'Your profile has been updated successfully!',
		dismissible: true,
		timeout: 0
	}
};

export const Info: Story = {
	args: {
		type: 'info',
		message: 'New features are available. Check them out in the settings menu.',
		dismissible: true,
		timeout: 0
	}
};

export const NonDismissible: Story = {
	args: {
		type: 'warning',
		message: 'This is an important notification that cannot be dismissed.',
		dismissible: false,
		timeout: 0
	}
};

export const WithTimeout: Story = {
	args: {
		type: 'success',
		message: 'This alert will automatically dismiss after 3 seconds.',
		dismissible: true,
		timeout: 3000
	}
};

export const WithCustomClass: Story = {
	args: {
		type: 'info',
		message: 'This alert has a custom shadow and max-width.',
		dismissible: true,
		timeout: 0,
		className: 'shadow-xl max-w-md'
	}
};

export const AllTypes: Story = {
	args: {
		message: 'Default message for all types'
	},
	render: () => ({
		Component: Alert,
		template: `
	  <div class="space-y-4">
		<Alert type="error" message="Error alert: Something went wrong" />
		<Alert type="warning" message="Warning alert: Be careful with this action" />
		<Alert type="success" message="Success alert: Operation completed successfully" />
		<Alert type="info" message="Info alert: A new version is available" />
	  </div>
	`
	})
};
