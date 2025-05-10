import type { Meta, StoryObj } from '@storybook/svelte';
import CardSkeleton from '$lib/components/CardSkeleton.svelte';

const meta = {
	title: 'UI/CardSkeleton',
	component: CardSkeleton,
	tags: ['autodocs'],
	argTypes: {
		lines: { control: 'number' },
		imageHeight: { control: 'text' },
		showImage: { control: 'boolean' },
		showFooter: { control: 'boolean' },
		className: { control: 'text' }
	}
} satisfies Meta<CardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		lines: 3,
		imageHeight: '12rem',
		showImage: true,
		showFooter: true
	}
};

export const WithoutImage: Story = {
	args: {
		lines: 3,
		showImage: false,
		showFooter: true
	}
};

export const WithoutFooter: Story = {
	args: {
		lines: 3,
		imageHeight: '12rem',
		showImage: true,
		showFooter: false
	}
};

export const ShortContent: Story = {
	args: {
		lines: 1,
		imageHeight: '12rem',
		showImage: true,
		showFooter: true
	}
};

export const LongContent: Story = {
	args: {
		lines: 6,
		imageHeight: '12rem',
		showImage: true,
		showFooter: true
	}
};
