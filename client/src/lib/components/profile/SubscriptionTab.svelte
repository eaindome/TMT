<!-- src/lib/components/profile/SubscriptionTab.svelte -->
<script lang="ts">
	interface SubscriptionData {
		plan: string;
		nextBillingDate: string;
		status: 'active' | 'cancelled' | 'expired';
	}
	
	export let subscription: SubscriptionData;
	
	const plans = [
		{
			name: 'Basic',
			price: '$9.99',
			period: 'month',
			features: [
				'100 scans per month',
				'Basic drug verification',
				'Scan history (30 days)',
				'Email support'
			],
			color: 'border-[#607d8b]',
			current: false
		},
		{
			name: 'Professional',
			price: '$29.99',
			period: 'month',
			features: [
				'Unlimited scans',
				'Advanced AI detection',
				'Batch scanning',
				'Extended history (1 year)',
				'Priority support',
				'Analytics dashboard',
				'API access'
			],
			color: 'border-[#1a5f4a] bg-[#1a5f4a]/5',
			current: true,
			popular: true
		},
		{
			name: 'Enterprise',
			price: '$99.99',
			period: 'month',
			features: [
				'Everything in Professional',
				'Custom integrations',
				'Dedicated support',
				'Advanced analytics',
				'White-label options',
				'SLA guarantee'
			],
			color: 'border-[#0288d1]',
			current: false
		}
	];
	
	function getStatusColor(status: string) {
		switch (status) {
			case 'active':
				return 'bg-[#4caf50] text-white';
			case 'cancelled':
				return 'bg-[#f4b400] text-white';
			case 'expired':
				return 'bg-[#d32f2f] text-white';
			default:
				return 'bg-[#607d8b] text-white';
		}
	}
	
	function getStatusText(status: string) {
		switch (status) {
			case 'active':
				return 'Active';
			case 'cancelled':
				return 'Cancelled';
			case 'expired':
				return 'Expired';
			default:
				return 'Unknown';
		}
	}
	
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
	
	function manageSubscription() {
		// Handle subscription management (redirect to billing portal)
		alert('Redirecting to billing portal...');
	}
	
	function cancelSubscription() {
		if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
			// Handle cancellation
			alert('Subscription cancelled. You will retain access until ' + formatDate(subscription.nextBillingDate));
		}
	}
	
	function upgradePlan(planName: string) {
		if (confirm(`Upgrade to ${planName} plan?`)) {
			alert(`Upgrading to ${planName}...`);
		}
	}
</script>

<div class="space-y-8">
	<!-- Current Subscription -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900">Current Subscription</h3>
		
		<div class="bg-gradient-to-r from-[#1a5f4a] to-[#4caf50] rounded-lg p-6 text-white">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h4 class="text-2xl font-bold">{subscription.plan} Plan</h4>
					<p class="opacity-90">Premium features included</p>
				</div>
				
				<div class="text-right">
					<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {getStatusColor(subscription.status)}">
						{getStatusText(subscription.status)}
					</span>
				</div>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
				<div>
					<p class="opacity-75">Next Billing Date</p>
					<p class="font-semibold">{formatDate(subscription.nextBillingDate)}</p>
				</div>
				
				<div>
					<p class="opacity-75">Billing Amount</p>
					<p class="font-semibold">$29.99/month</p>
				</div>
			</div>
		</div>
		
		<!-- Quick Actions -->
		<div class="flex flex-wrap gap-4">
			<button
				on:click={manageSubscription}
				class="bg-[#0288d1] text-white px-6 py-2 rounded-lg hover:bg-[#0277bd] transition-colors duration-200 flex items-center space-x-2"
			>
				<span>Manage Billing</span>
			</button>
			
			{#if subscription.status === 'active'}
				<button
					on:click={cancelSubscription}
					class="bg-[#d32f2f] text-white px-6 py-2 rounded-lg hover:bg-[#c62828] transition-colors duration-200 flex items-center space-x-2"
				>
					<span>Cancel Subscription</span>
				</button>
			{/if}
		</div>
	</div>
	
	<!-- Usage Statistics -->
	<div class="bg-[#f5f5f5] rounded-lg p-6">
		<h4 class="text-lg font-semibold text-gray-900 mb-4">This Month's Usage</h4>
		
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div class="bg-white rounded-lg p-4 text-center">
				<div class="text-2xl font-bold text-[#1a5f4a]">247</div>
				<div class="text-sm text-[#607d8b]">Scans Completed</div>
				<div class="text-xs text-[#4caf50] mt-1">Unlimited ✨</div>
			</div>
			
			<div class="bg-white rounded-lg p-4 text-center">
				<div class="text-2xl font-bold text-[#0288d1]">15</div>
				<div class="text-sm text-[#607d8b]">Batch Scans</div>
				<div class="text-xs text-[#4caf50] mt-1">Premium Feature</div>
			</div>
			
			<div class="bg-white rounded-lg p-4 text-center">
				<div class="text-2xl font-bold text-[#f4b400]">98.5%</div>
				<div class="text-sm text-[#607d8b]">Accuracy Rate</div>
				<div class="text-xs text-[#4caf50] mt-1">Enhanced AI</div>
			</div>
		</div>
	</div>
	
	<!-- Available Plans -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900">Available Plans</h3>
		
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{#each plans as plan}
				<div class="relative border-2 {plan.color} rounded-lg p-6 {plan.current ? 'bg-[#1a5f4a]/5' : 'bg-white'}">
					{#if plan.popular}
						<div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
							<span class="bg-[#f4b400] text-white px-3 py-1 rounded-full text-sm font-medium">
								Most Popular
							</span>
						</div>
					{/if}
					
					{#if plan.current}
						<div class="absolute -top-3 right-4">
							<span class="bg-[#4caf50] text-white px-3 py-1 rounded-full text-sm font-medium">
								Current Plan
							</span>
						</div>
					{/if}
					
					<div class="text-center mb-6">
						<h4 class="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
						<div class="text-3xl font-bold text-[#1a5f4a]">
							{plan.price}
							<span class="text-lg text-[#607d8b] font-normal">/{plan.period}</span>
						</div>
					</div>
					
					<ul class="space-y-3 mb-6">
						{#each plan.features as feature}
							<li class="flex items-center space-x-3">
								<span class="text-[#4caf50]">✓</span>
								<span class="text-sm text-gray-700">{feature}</span>
							</li>
						{/each}
					</ul>
					
					{#if !plan.current}
						<button
							on:click={() => upgradePlan(plan.name)}
							class="w-full bg-[#1a5f4a] text-white py-2 px-4 rounded-lg hover:bg-[#155240] transition-colors duration-200 font-medium"
						>
							{plan.name === 'Basic' ? 'Downgrade' : 'Upgrade'} to {plan.name}
						</button>
					{:else}
						<div class="w-full bg-[#4caf50] text-white py-2 px-4 rounded-lg text-center font-medium">
							Current Plan
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Billing History -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900">Billing History</h3>
		
		<div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-[#f5f5f5]">
						<tr>
							<th class="px-6 py-3 text-left text-xs font-medium text-[#607d8b] uppercase tracking-wider">
								Date
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-[#607d8b] uppercase tracking-wider">
								Description
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-[#607d8b] uppercase tracking-wider">
								Amount
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-[#607d8b] uppercase tracking-wider">
								Status
							</th>
							<th class="px-6 py-3 text-left text-xs font-medium text-[#607d8b] uppercase tracking-wider">
								Invoice
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								May 15, 2024
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Professional Plan - Monthly
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								$29.99
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4caf50] text-white">
									Paid
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<button class="text-[#0288d1] hover:text-[#0277bd] font-medium">
									Download
								</button>
							</td>
						</tr>
						
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Apr 15, 2024
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Professional Plan - Monthly
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								$29.99
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4caf50] text-white">
									Paid
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<button class="text-[#0288d1] hover:text-[#0277bd] font-medium">
									Download
								</button>
							</td>
						</tr>
						
						<tr>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Mar 15, 2024
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Professional Plan - Monthly
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								$29.99
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4caf50] text-white">
									Paid
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm">
								<button class="text-[#0288d1] hover:text-[#0277bd] font-medium">
									Download
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>