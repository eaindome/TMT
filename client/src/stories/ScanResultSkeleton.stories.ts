import type { Meta, StoryObj } from '@storybook/svelte';
import ScanResultSkeleton from '$lib/components/ScanResultSkeleton.svelte';

const meta = {
	title: 'UI/ScanResultSkeleton',
	component: ScanResultSkeleton,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'ScanResultSkeleton displays a loading placeholder that matches the structure of the scan result page, providing a smoother user experience during data loading.'
			}
		}
	}
} satisfies Meta<ScanResultSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		Component: ScanResultSkeleton
	})
};

// Example showing the skeleton next to potential loaded content
export const ComparisonWithLoadedContent: Story = {
	parameters: {
		docs: {
			description: {
				story:
					'This example shows how the skeleton roughly matches the structure of the actual content, providing a seamless transition when data loads.'
			}
		}
	},
	render: () => ({
		Component: ScanResultSkeleton,
		props: {}
	}),
	decorators: [
		(story) => ({
      Component: story().Component,
      props: story().props,
			template: `
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 class="mb-2 text-lg font-medium">Loading State</h3>
            {@html story}
          </div>
          <div>
            <h3 class="mb-2 text-lg font-medium">Loaded Content (Example)</h3>
            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
              <div class="flex flex-col items-center space-y-4">
                <h2 class="text-2xl font-bold text-trust-green">Scan Result</h2>
                
                <div class="my-4">
                  <span class="inline-flex items-center justify-center rounded-full bg-[#4caf50] px-4 py-2 text-base font-medium text-white">
                    Verified Safe
                  </span>
                </div>
                
                <p class="text-lg text-neutral-gray">This medication has been verified as authentic</p>
                
                <div class="my-3 w-full max-w-xs">
                  <img src="https://placehold.co/300x240/e2e8f0/1a5f4a?text=Medicine+Image" alt="Medicine" class="rounded-lg" />
                </div>
                
                <p class="text-sm text-neutral-gray">Batch Number: ABC123456789</p>
                
                <div class="mt-6 flex justify-center gap-4 w-full">
                  <button class="rounded-md border border-[#1a5f4a] bg-white px-4 py-2 text-[#1a5f4a]">
                    Report Issue
                  </button>
                  <button class="rounded-md border border-[#4caf50] bg-white px-4 py-2 text-[#4caf50]">
                    Correct
                  </button>
                </div>
                
                <div class="mt-6 space-y-2 w-full">
                  <button class="w-full rounded-md bg-[#1a5f4a] px-4 py-2 text-white">
                    Find Trusted Pharmacies
                  </button>
                  <button class="w-full rounded-md bg-[#607d8b] px-4 py-2 text-white">
                    Scan Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
		})
	]
};
