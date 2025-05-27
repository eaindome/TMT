<!-- src/lib/components/profile/SecurityTab.svelte -->
<script lang="ts">
	let twoFactorEnabled = false;
	let showQRCode = false;
	let isEnabling2FA = false;
	let verificationCode = '';
	let sessions = [
		{
			id: '1',
			device: 'Chrome on Windows',
			location: 'New York, USA',
			lastActive: '2024-05-27T10:30:00Z',
			current: true,
			ip: '192.168.1.1'
		},
		{
			id: '2',
			device: 'Safari on iPhone',
			location: 'New York, USA',
			lastActive: '2024-05-26T15:45:00Z',
			current: false,
			ip: '10.0.0.1'
		},
		{
			id: '3',
			device: 'Firefox on MacOS',
			location: 'Boston, USA',
			lastActive: '2024-05-25T09:15:00Z',
			current: false,
			ip: '172.16.0.1'
		}
	];
	
	function formatLastActive(dateString: string) {
		const date = new Date(dateString);
		const now = new Date();
		const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
		
		if (diffInHours < 1) {
			return 'Active now';
		} else if (diffInHours < 24) {
			return `${diffInHours} hours ago`;
		} else {
			const diffInDays = Math.floor(diffInHours / 24);
			return `${diffInDays} days ago`;
		}
	}
	
	function toggle2FA() {
		if (twoFactorEnabled) {
			// Disable 2FA
			if (confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
				twoFactorEnabled = false;
				showQRCode = false;
			}
		} else {
			// Enable 2FA
			showQRCode = true;
			isEnabling2FA = true;
		}
	}
	
	function verify2FA() {
		if (verificationCode.length === 6) {
			// Simulate verification
			setTimeout(() => {
				twoFactorEnabled = true;
				showQRCode = false;
				isEnabling2FA = false;
				verificationCode = '';
				alert('Two-factor authentication has been enabled successfully!');
			}, 1000);
		}
	}
	
	function cancel2FASetup() {
		showQRCode = false;
		isEnabling2FA = false;
		verificationCode = '';
	}
	
	function terminateSession(sessionId: string) {
		if (confirm('Are you sure you want to terminate this session?')) {
			sessions = sessions.filter(s => s.id !== sessionId);
		}
	}
	
	function terminateAllSessions() {
		if (confirm('This will log you out of all devices except this one. Continue?')) {
			sessions = sessions.filter(s => s.current);
			alert('All other sessions have been terminated.');
		}
	}
	
	function downloadBackupCodes() {
		// Generate and download backup codes
		const codes = Array.from({length: 10}, () => 
			Math.random().toString(36).substring(2, 10).toUpperCase()
		);
		
		const content = `TMT Medicine Detector - Backup Codes
Generated on: ${new Date().toLocaleDateString()}

Keep these codes in a safe place. Each code can only be used once.

${codes.map((code, i) => `${i + 1}. ${code}`).join('\n')}

If you lose access to your authenticator app, you can use these codes to regain access to your account.`;
		
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'tmt-backup-codes.txt';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<div class="space-y-8">
	<!-- Two-Factor Authentication -->
	<div class="space-y-4">
		<h3 class="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
		
		<div class="bg-[#f5f5f5] rounded-lg p-6">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h4 class="font-medium text-gray-900">Authenticator App</h4>
					<p class="text-sm text-[#607d8b] mt-1">
						{twoFactorEnabled 
							? 'Two-factor authentication is currently enabled' 
							: 'Add an extra layer of security to your account'}
					</p>
				</div>
				
				<div class="flex items-center space-x-3">
					{#if twoFactorEnabled}
						<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#4caf50] text-white">
							✓ Enabled
						</span>
					{:else}
						<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#607d8b] text-white">
							Disabled
						</span>
					{/if}
					
					<button
						on:click={toggle2FA}
						class="bg-[#1a5f4a] text-white px-4 py-2 rounded-lg hover:bg-[#155240] transition-colors duration-200"
					>
						{twoFactorEnabled ? 'Disable' : 'Enable'}
					</button>
				</div>
			</div>
			
			<!-- 2FA Setup -->
			{#if showQRCode}
				<div class="border-t border-gray-200 pt-4 space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h5 class="font-medium text-gray-900 mb-3">Step 1: Scan QR Code</h5>
							<div class="bg-white p-4 rounded-lg border-2 border-dashed border-[#607d8b] text-center">
								<div class="w-32 h-32 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
									<span class="text-4xl">📱</span>
								</div>
								<p class="text-sm text-[#607d8b]">
									Scan this QR code with your authenticator app
								</p>
							</div>
							
							<div class="mt-3 p-3 bg-white rounded border">
								<p class="text-xs text-[#607d8b] mb-1">Manual entry key:</p>
								<code class="text-sm font-mono bg-[#f5f5f5] px-2 py-1 rounded">
									JBSWY3DPEHPK3PXP
								</code>
							</div>
						</div>
						
						<div>
							<h5 class="font-medium text-gray-900 mb-3">Step 2: Enter Verification Code</h5>
							<div class="space-y-4">
								<div>
									<label for="verification" class="block text-sm font-medium text-gray-700 mb-2">
										6-digit code from your app
									</label>
									<input
										id="verification"
										bind:value={verificationCode}
										type="text"
										maxlength="6"
										placeholder="000000"
										class="w-full px-4 py-2 border border-[#607d8b]/30 rounded-lg focus:ring-2 focus:ring-[#1a5f4a] focus:border-transparent text-center text-2xl font-mono tracking-widest"
									/>
								</div>
								
								<div class="space-y-2">
									<button
										on:click={verify2FA}
										disabled={verificationCode.length !== 6}
										class="w-full bg-[#4caf50] text-white py-2 px-4 rounded-lg hover:bg-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
									>
										Verify & Enable
									</button>
									
									<button
										on:click={cancel2FASetup}
										class="w-full bg-[#607d8b] text-white py-2 px-4 rounded-lg hover:bg-[#546e7a] transition-colors duration-200"
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Backup Codes -->
			{#if twoFactorEnabled}
				<div class="border-t border-gray-200 pt-4">
					<div class="flex items-center justify-between">
						<div>
							<h5 class="font-medium text-gray-900">Backup Codes</h5>
							<p class="text-sm text-[#607d8b]">
								Download backup codes in case you lose access to your authenticator
							</p>
						</div>
						
						<button
							on:click={downloadBackupCodes}
							class="bg-[#0288d1] text-white px-4 py-2 rounded-lg hover:bg-[#0277bd] transition-colors duration-200 flex items-center space-x-2"
						>
							<span>📥</span>
							<span>Download Codes</span>
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
	
	<!-- Login Sessions -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-900">Active Sessions</h3>
			
			<button
				on:click={terminateAllSessions}
				class="bg-[#d32f2f] text-white px-4 py-2 rounded-lg hover:bg-[#c62828] transition-colors duration-200 flex items-center space-x-2"
			>
				<span>Log Out All Devices</span>
			</button>
		</div>
		
		<div class="space-y-3">
			{#each sessions as session}
				<div class="bg-white border border-gray-200 rounded-lg p-4">
					<div class="flex items-center justify-between">
						<div class="flex-1">
							<div class="flex items-center space-x-3 mb-2">
								<h4 class="font-medium text-gray-900">{session.device}</h4>
								{#if session.current}
									<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#4caf50] text-white">
										Current Session
									</span>
								{/if}
							</div>
							
							<div class="space-y-1 text-sm text-[#607d8b]">
								<p class="flex items-center space-x-2">
									<span>📍</span>
									<span>{session.location}</span>
								</p>
								
								<p class="flex items-center space-x-2">
									<span>🌐</span>
									<span>{session.ip}</span>
								</p>
								
								<p class="flex items-center space-x-2">
									<span>⏰</span>
									<span>{formatLastActive(session.lastActive)}</span>
								</p>
							</div>
						</div>
						
						{#if !session.current}
							<button
								on:click={() => terminateSession(session.id)}
								class="bg-[#d32f2f] text-white px-3 py-1 rounded text-sm hover:bg-[#c62828] transition-colors duration-200"
							>
								Terminate
							</button>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
	
	<!-- Security Recommendations -->
	<div class="bg-gradient-to-r from-[#0288d1]/10 to-[#1a5f4a]/10 rounded-lg p-6">
		<h3 class="text-lg font-semibold text-gray-900 mb-4">Security Recommendations</h3>
		
		<div class="space-y-3">
			<div class="flex items-start space-x-3">
				<span class="text-[#4caf50] text-xl">✓</span>
				<div>
					<p class="font-medium text-gray-900">Strong Password</p>
					<p class="text-sm text-[#607d8b]">Your password meets our security requirements</p>
				</div>
			</div>
			
			<div class="flex items-start space-x-3">
				<span class="{twoFactorEnabled ? 'text-[#4caf50]' : 'text-[#f4b400]'} text-xl">
					{twoFactorEnabled ? '✓' : '⚠️'}
				</span>
				<div>
					<p class="font-medium text-gray-900">Two-Factor Authentication</p>
					<p class="text-sm text-[#607d8b]">
						{twoFactorEnabled 
							? 'Great! Your account has 2FA enabled' 
							: 'Enable 2FA for enhanced security'}
					</p>
				</div>
			</div>
			
			<div class="flex items-start space-x-3">
				<span class="text-[#4caf50] text-xl">✓</span>
				<div>
					<p class="font-medium text-gray-900">Account Activity Monitoring</p>
					<p class="text-sm text-[#607d8b]">We monitor your account for suspicious activity</p>
				</div>
			</div>
		</div>
	</div>
</div>