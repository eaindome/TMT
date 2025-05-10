import type { Meta, StoryObj } from '@storybook/svelte';
import Map from '$lib/components/Map.svelte';

const meta = {
	title: 'UI/Map',
	component: Map,
	tags: ['autodocs'],
	argTypes: {
		apiKey: { control: 'text', description: 'Google Maps API Key' },
		height: { control: 'text', description: 'Height of the map container' },
		zoom: {
			control: { type: 'range', min: 1, max: 20, step: 1 },
			description: 'Zoom level of the map'
		},
		center: {
			control: 'object',
			description: 'Center coordinates of the map (latitude and longitude)'
		},
		markers: {
			control: 'object',
			description: 'Array of markers to display on the map'
		},
		interactive: { control: 'boolean', description: 'Whether the map is interactive' },
		showControls: { control: 'boolean', description: 'Whether to show map controls' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A Google Maps component that displays a map with customizable markers and interactivity options.'
			}
		}
	}
} satisfies Meta<Map>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock API key - in a real environment, this would be provided via .env
// For Storybook demos, you might want to use a restricted API key or mock the map
const DEMO_API_KEY = 'your-google-maps-api-key';

export const Default: Story = {
	args: {
		apiKey: DEMO_API_KEY,
		height: '400px',
		zoom: 13,
		center: { lat: 40.7128, lng: -74.006 }, // New York City
		markers: [],
		interactive: true,
		showControls: true
	}
};

export const WithMarkers: Story = {
	args: {
		...Default.args,
		markers: [
			{
				id: '1',
				position: { lat: 40.7128, lng: -74.006 }, // NYC
				title: 'New York City Pharmacy',
				info: 'A verified pharmacy in downtown NYC',
				verified: true
			},
			{
				id: '2',
				position: { lat: 40.72, lng: -74.01 },
				title: 'Midtown Medical Supply',
				info: 'Medical supplies and prescriptions',
				verified: true
			},
			{
				id: '3',
				position: { lat: 40.73, lng: -74.005 },
				title: 'Uptown Pharmacy',
				info: 'Family-owned pharmacy since 1950',
				verified: false
			}
		]
	}
};

export const NonInteractive: Story = {
	args: {
		...Default.args,
		interactive: false,
		showControls: false
	}
};

export const CustomHeight: Story = {
	args: {
		...Default.args,
		height: '600px'
	}
};

export const CloseZoom: Story = {
	args: {
		...WithMarkers.args,
		zoom: 17 // Zoomed in closely to see street details
	}
};

export const FarZoom: Story = {
	args: {
		...WithMarkers.args,
		zoom: 10 // Zoomed out to see broader area
	}
};

// Note: The actual implementation for Storybook should include a note that
// you'll need to provide a real Google Maps API key for this component to work properly
// For production, you should use environment variables to store the API key securely

export const PharmacyLocator: Story = {
	args: {
		...Default.args,
		markers: [
			{
				id: 'pharm1',
				position: { lat: 40.7128, lng: -74.006 },
				title: 'Downtown Pharmacy',
				info: 'Verified pharmacy with special discounts on TMT verified medicines',
				verified: true
			},
			{
				id: 'pharm2',
				position: { lat: 40.722, lng: -74.012 },
				title: 'Central Pharmacy',
				info: 'Open 24/7 with prescription services',
				verified: true
			},
			{
				id: 'pharm3',
				position: { lat: 40.718, lng: -74.008 },
				title: 'MediStore',
				info: 'Unverified pharmacy - use with caution',
				verified: false
			},
			{
				id: 'pharm4',
				position: { lat: 40.724, lng: -74.002 },
				title: 'Health First Pharmacy',
				info: 'Verified pharmacy with consultation services',
				verified: true
			}
		],
		zoom: 14
	},
	parameters: {
		docs: {
			description: {
				story:
					'A map showing various pharmacies, both verified and unverified, to help users locate approved medication providers.'
			}
		}
	}
};
