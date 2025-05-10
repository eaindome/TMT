import type { Meta, StoryObj } from '@storybook/svelte';
import Review from '$lib/components/Review.svelte';

const meta = {
	title: 'UI/Review',
	component: Review,
	tags: ['autodocs'],
	argTypes: {
		id: { control: 'text' },
		username: { control: 'text' },
		avatar: { control: 'text' },
		date: { control: 'date' },
		rating: {
			control: { type: 'range', min: 0, max: 5, step: 0.5 },
			description: 'Rating from 0 to 5, supports half-star ratings'
		},
		content: { control: 'text' },
		medicineId: { control: 'text' },
		medicineName: { control: 'text' },
		verified: { control: 'boolean' },
		upvotes: { control: 'number' },
		downvotes: { control: 'number' },
		userHasVoted: {
			control: 'select',
			options: [null, 'up', 'down'],
			description: 'Whether the current user has voted on this review'
		},
		comments: { control: 'number' },
		tags: { control: 'object' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'Review component displays user reviews with rating, content, and interactive elements like upvotes and comments.'
			}
		},
		actions: {
			handles: ['upvote', 'downvote', 'comment', 'report', 'medicineClick']
		}
	}
} satisfies Meta<Review>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		id: '1',
		username: 'John Doe',
		avatar: null,
		date: new Date(2025, 3, 15).toISOString(),
		rating: 4.5,
		content:
			'This medicine was effective and I had no side effects. The packaging was easy to open and instructions were clear. Would recommend to others.',
		medicineId: 'med123',
		medicineName: 'Paracetamol 500mg',
		verified: true,
		upvotes: 12,
		downvotes: 2,
		userHasVoted: null,
		comments: 5,
		tags: ['effective', 'no side effects']
	}
};

export const LowRating: Story = {
	args: {
		id: '2',
		username: 'Jane Smith',
		avatar: null,
		date: new Date(2025, 4, 10).toISOString(),
		rating: 2,
		content:
			"I experienced several side effects and the medicine wasn't very effective for me. The packaging was difficult to open as well.",
		medicineId: 'med456',
		medicineName: 'Amoxicillin 250mg',
		verified: false,
		upvotes: 3,
		downvotes: 8,
		userHasVoted: null,
		comments: 12,
		tags: ['side effects', 'ineffective']
	}
};

export const WithAvatar: Story = {
	args: {
		id: '3',
		username: 'Alice Johnson',
		avatar: 'https://i.pravatar.cc/300?img=1',
		date: new Date(2025, 5, 5).toISOString(),
		rating: 5,
		content:
			'Excellent medicine! Worked exactly as described with no side effects. Highly recommend to anyone who needs it.',
		medicineId: 'med789',
		medicineName: 'Ibuprofen 400mg',
		verified: true,
		upvotes: 45,
		downvotes: 0,
		userHasVoted: 'up',
		comments: 8,
		tags: ['excellent', 'fast-acting']
	}
};

export const UserVotedDown: Story = {
	args: {
		id: '4',
		username: 'Bob Williams',
		avatar: null,
		date: new Date(2025, 2, 20).toISOString(),
		rating: 1.5,
		content:
			'Did not work for me at all and I had severe headaches after taking it. Would not recommend.',
		medicineId: 'med101',
		medicineName: 'Migraine Relief',
		verified: false,
		upvotes: 2,
		downvotes: 15,
		userHasVoted: 'down',
		comments: 20,
		tags: ['ineffective', 'side effects', 'avoid']
	}
};

export const NoMedicineName: Story = {
	args: {
		id: '5',
		username: 'Emma Davis',
		avatar: null,
		date: new Date(2025, 1, 10).toISOString(),
		rating: 3.5,
		content:
			'Average effectiveness. Some mild side effects but nothing serious. Packaging was good.',
		medicineId: null,
		medicineName: null,
		verified: false,
		upvotes: 7,
		downvotes: 3,
		userHasVoted: null,
		comments: 2,
		tags: []
	}
};

export const LongReview: Story = {
	args: {
		id: '6',
		username: 'Michael Brown',
		avatar: 'https://i.pravatar.cc/300?img=3',
		date: new Date(2025, 0, 5).toISOString(),
		rating: 4,
		content:
			"I've been using this medication for about 3 months now for chronic pain management. Overall, it's been quite effective at reducing my symptoms. The first week I experienced some drowsiness, but that side effect diminished over time. The packaging is child-proof which is good for safety but can be difficult for elderly patients. The cost is reasonable compared to alternatives. My doctor recommended it and I would generally agree with their assessment. I've tried several other medications in this category and this one seems to have the best balance of effectiveness with minimal side effects.",
		medicineId: 'med202',
		medicineName: 'Pain Relief Plus',
		verified: true,
		upvotes: 32,
		downvotes: 4,
		userHasVoted: 'up',
		comments: 15,
		tags: ['chronic pain', 'effective', 'affordable']
	}
};
