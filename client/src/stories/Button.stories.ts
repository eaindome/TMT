import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '$lib/components/Button.svelte';
import { CheckIcon, AlertTriangleIcon, MailIcon as MailIcon, ArrowRightCircleIcon } from 'svelte-feather-icons';

const meta = {
	title: 'UI/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'success', 'danger', 'caution', 'outline', 'ghost'],
			description: 'The visual style of the button'
		},
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
			description: 'The size of the button'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the button is disabled'
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'The HTML button type'
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether the button should take up the full width of its container'
		},
		icon: {
			control: 'object',
			description: 'An optional Svelte component to be used as an icon'
		},
		iconPosition: {
			control: 'select',
			options: ['left', 'right'],
			description: 'The position of the icon relative to the button text'
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					'Button component used throughout the application for user actions. Supports various styles, sizes, and states.'
			}
		}
	}
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Primary Button'
		}
	})
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		size: 'md',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Secondary Button'
		}
	})
};

export const Success: Story = {
	args: {
		variant: 'success',
		size: 'md',
		disabled: false,
		fullWidth: false,
		icon: CheckIcon,
		iconPosition: 'left'
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Success Button'
		}
	})
};

export const Danger: Story = {
	args: {
		variant: 'danger',
		size: 'md',
		disabled: false,
		fullWidth: false,
		icon: AlertTriangleIcon,
		iconPosition: 'left'
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Danger Button'
		}
	})
};

export const Caution: Story = {
	args: {
		variant: 'caution',
		size: 'md',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Caution Button'
		}
	})
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		size: 'md',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Outline Button'
		}
	})
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		size: 'md',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Ghost Button'
		}
	})
};

export const Small: Story = {
	args: {
		variant: 'primary',
		size: 'sm',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Small Button'
		}
	})
};

export const Large: Story = {
	args: {
		variant: 'primary',
		size: 'lg',
		disabled: false,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Large Button'
		}
	})
};

export const Disabled: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		disabled: true,
		fullWidth: false
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Disabled Button'
		}
	})
};

export const FullWidth: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		disabled: false,
		fullWidth: true
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Full Width Button'
		}
	})
};

export const WithLeftIcon: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		disabled: false,
		fullWidth: false,
		icon: MailIcon,
		iconPosition: 'left'
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Button with Left Icon'
		}
	})
};

export const WithRightIcon: Story = {
	args: {
		variant: 'primary',
		size: 'md',
		disabled: false,
		fullWidth: false,
		icon: ArrowRightCircleIcon,
		iconPosition: 'right'
	},
	render: (args) => ({
		Component: Button,
		props: args,
		slots: {
			default: 'Button with Right Icon'
		}
	})
};

export const AllVariants: Story = {
	render: () => ({
		Component: Button,
		template: `
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="caution">Caution</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        
        <div class="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
        
        <div class="flex flex-wrap gap-4">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>
    `
	})
};
