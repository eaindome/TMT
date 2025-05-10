import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '$lib/components/Skeleton.svelte';

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	tags: ['autodocs'],
	argTypes: {
		width: {
			control: 'text',
			description: 'Width of the skeleton (CSS value)'
		},
		height: {
			control: 'text',
			description: 'Height of the skeleton (CSS value)'
		},
		rounded: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'full'],
			description: 'Border radius of the skeleton'
		},
		className: {
			control: 'text',
			description: 'Additional CSS classes'
		},
		animation: {
			control: 'select',
			options: ['pulse', 'wave', 'none'],
			description: 'Animation type for the skeleton'
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					'Skeleton component provides placeholder loading states for UI elements while content is being fetched.'
			}
		}
	}
} satisfies Meta<Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		width: '100%',
		height: '1rem',
		rounded: 'md',
		animation: 'pulse',
		className: ''
	}
};

export const Text: Story = {
	args: {
		width: '200px',
		height: '1rem',
		rounded: 'md',
		animation: 'pulse',
		className: ''
	}
};

export const Circle: Story = {
	args: {
		width: '50px',
		height: '50px',
		rounded: 'full',
		animation: 'pulse',
		className: ''
	}
};

export const Rectangle: Story = {
	args: {
		width: '300px',
		height: '200px',
		rounded: 'lg',
		animation: 'pulse',
		className: ''
	}
};

export const WaveAnimation: Story = {
	args: {
		width: '200px',
		height: '1.5rem',
		rounded: 'md',
		animation: 'wave',
		className: ''
	}
};

export const NoAnimation: Story = {
	args: {
		width: '150px',
		height: '1.5rem',
		rounded: 'sm',
		animation: 'none',
		className: ''
	}
};

export const WithCustomClass: Story = {
	args: {
		width: '200px',
		height: '2rem',
		rounded: 'md',
		animation: 'pulse',
		className: 'shadow-md'
	}
};

export const TextParagraph: Story = {
	render: () => ({
		Component: Skeleton,
		template: `
      <div class="space-y-2 max-w-md">
        <Skeleton width="60%" height="1.5rem" rounded="md" />
        <Skeleton width="90%" height="1rem" rounded="md" />
        <Skeleton width="80%" height="1rem" rounded="md" />
        <Skeleton width="85%" height="1rem" rounded="md" />
        <Skeleton width="75%" height="1rem" rounded="md" />
      </div>
    `
	})
};

export const CardSkeleton: Story = {
	render: () => ({
		Component: Skeleton,
		template: `
      <div class="p-4 border rounded-lg shadow-sm max-w-sm">
        <Skeleton width="100%" height="150px" rounded="lg" className="mb-4" />
        <Skeleton width="70%" height="1.75rem" rounded="md" className="mb-2" />
        <Skeleton width="100%" height="1rem" rounded="md" className="mb-1" />
        <Skeleton width="90%" height="1rem" rounded="md" className="mb-1" />
        <Skeleton width="85%" height="1rem" rounded="md" className="mb-3" />
        <div class="flex justify-between">
          <Skeleton width="30%" height="2rem" rounded="md" />
          <Skeleton width="30%" height="2rem" rounded="md" />
        </div>
      </div>
    `
	})
};

export const UserProfile: Story = {
	render: () => ({
		Component: Skeleton,
		template: `
      <div class="flex items-center space-x-4 max-w-md">
        <Skeleton width="64px" height="64px" rounded="full" />
        <div class="space-y-2 flex-1">
          <Skeleton width="140px" height="1.25rem" rounded="md" />
          <Skeleton width="90px" height="1rem" rounded="md" />
          <Skeleton width="180px" height="0.875rem" rounded="md" />
        </div>
      </div>
    `
	})
};
