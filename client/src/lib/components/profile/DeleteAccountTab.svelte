<script lang="ts">
    let showConfirmation = false;
    let confirmationText = '';
    let isDeleting = false;
    let deleteReason = '';
    let additionalFeedback = '';
    
    const deleteReasons = [
        'I no longer need the service',
        'I found a better alternative',
        'Too expensive',
        'Privacy concerns',
        'Technical issues',
        'Poor customer support',
        'Other'
    ];
    
    function initiateDelete() {
        showConfirmation = true;
    }
    
    function cancelDelete() {
        showConfirmation = false;
        confirmationText = '';
        deleteReason = '';
        additionalFeedback = '';
    }
    
    async function confirmDelete() {
        if (confirmationText !== 'DELETE MY ACCOUNT') {
            alert('Please type "DELETE MY ACCOUNT" exactly as shown to confirm.');
            return;
        }
        
        if (!deleteReason) {
            alert('Please select a reason for deletion.');
            return;
        }
        
        isDeleting = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // In a real app, this would delete the account and redirect to goodbye page
            alert('Account deletion initiated. You will receive a confirmation email shortly.');
            
            // Redirect to home page or login page
            // goto('/');
            
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred while deleting your account. Please contact support.');
        } finally {
            isDeleting = false;
        }
    }
    
    function contactSupport() {
        // Open support chat or redirect to support page
        alert('Redirecting to support...');
    }
    
    function exportData() {
        // Generate and download user data
        const userData = {
            profile: {
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@hospital.com',
                role: 'Pharmacist',
                createdAt: '2024-01-15'
            },
            scanHistory: [
                { date: '2024-05-27', medicine: 'Aspirin 500mg', result: 'Safe', confidence: 98.5 },
                { date: '2024-05-26', medicine: 'Paracetamol 250mg', result: 'Safe', confidence: 97.2 },
                // ... more scan data
            ],
            preferences: {
                notifications: true,
                theme: 'light'
            }
        };
        
        const content = JSON.stringify(userData, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tmt-account-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }
</script>

<div class="space-y-8">
    {#if !showConfirmation}
        <!-- Warning Section -->
        <div class="bg-gradient-to-r from-[#f4b400]/20 to-[#d32f2f]/20 border-l-4 border-[#f4b400] rounded-lg p-6">
            <div class="flex items-start space-x-3">
                <span class="text-[#f4b400] text-2xl">⚠️</span>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Account Deletion Warning</h3>
                    <p class="text-[#607d8b] mb-4">
                        Deleting your account is a permanent action that cannot be undone. Please review the consequences below before proceeding.
                    </p>
                </div>
            </div>
        </div>
        
        <!-- What Will Be Deleted -->
        <div class="space-y-4">
            <h4 class="text-lg font-semibold text-gray-900">What will be permanently deleted:</h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-[#f5f5f5] rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                        <span class="text-[#d32f2f]">🗑️</span>
                        <span>Personal Data</span>
                    </h5>
                    <ul class="space-y-2 text-sm text-[#607d8b]">
                        <li>• Profile information and settings</li>
                        <li>• Contact details and preferences</li>
                        <li>• Account credentials and security settings</li>
                        <li>• Subscription and billing information</li>
                    </ul>
                </div>
                
                <div class="bg-[#f5f5f5] rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                        <span class="text-[#d32f2f]">📊</span>
                        <span>Scan Data</span>
                    </h5>
                    <ul class="space-y-2 text-sm text-[#607d8b]">
                        <li>• Complete scan history (247 scans)</li>
                        <li>• Verification records and results</li>
                        <li>• Saved medicine information</li>
                        <li>• Analytics and usage data</li>
                    </ul>
                </div>
                
                <div class="bg-[#f5f5f5] rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                        <span class="text-[#d32f2f]">💳</span>
                        <span>Premium Features</span>
                    </h5>
                    <ul class="space-y-2 text-sm text-[#607d8b]">
                        <li>• Active Premium subscription</li>
                        <li>• Advanced analytics access</li>
                        <li>• Batch scanning capabilities</li>
                        <li>• Priority support benefits</li>
                    </ul>
                </div>
                
                <div class="bg-[#f5f5f5] rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                        <span class="text-[#d32f2f]">🔗</span>
                        <span>Integrations</span>
                    </h5>
                    <ul class="space-y-2 text-sm text-[#607d8b]">
                        <li>• API access and tokens</li>
                        <li>• Third-party connections</li>
                        <li>• Shared verification records</li>
                        <li>• Collaborative data</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <!-- Data Export -->
        <div class="bg-[#0288d1]/10 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>📥</span>
                <span>Export Your Data</span>
            </h4>
            
            <p class="text-[#607d8b] mb-4">
                Before deleting your account, you can download a copy of your data for your records.
            </p>
            
            <button
                on:click={exportData}
                class="bg-[#0288d1] text-white px-6 py-2 rounded-lg hover:bg-[#0277bd] transition-colors duration-200 flex items-center space-x-2"
            >
                <span>Download My Data</span>
            </button>
        </div>
        
        <!-- Alternative Options -->
        <div class="bg-[#4caf50]/10 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <span>💡</span>
                <span>Consider These Alternatives</span>
            </h4>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-3">
                    <div class="flex items-start space-x-3">
                        <span class="text-[#4caf50]">⏸️</span>
                        <div>
                            <h5 class="font-medium text-gray-900">Pause Your Account</h5>
                            <p class="text-sm text-[#607d8b]">Temporarily deactivate without losing data</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-3">
                        <span class="text-[#4caf50]">💳</span>
                        <div>
                            <h5 class="font-medium text-gray-900">Downgrade Plan</h5>
                            <p class="text-sm text-[#607d8b]">Switch to Basic plan to reduce costs</p>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div class="flex items-start space-x-3">
                        <span class="text-[#4caf50]">🔒</span>
                        <div>
                            <h5 class="font-medium text-gray-900">Privacy Settings</h5>
                            <p class="text-sm text-[#607d8b]">Adjust data sharing and visibility</p>
                        </div>
                    </div>
                    
                    <div class="flex items-start space-x-3">
                        <span class="text-[#4caf50]">💬</span>
                        <div>
                            <h5 class="font-medium text-gray-900">Contact Support</h5>
                            <p class="text-sm text-[#607d8b]">Get help resolving your concerns</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2">
                <button
                    on:click={contactSupport}
                    class="bg-[#4caf50] text-white px-4 py-2 rounded-lg hover:bg-[#43a047] transition-colors duration-200 text-sm"
                >
                    Talk to Support
                </button>
                <button
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Pause Account
                </button>
                <button
                    class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-sm"
                >
                    Manage Plan
                </button>
            </div>
        </div>
        
        <!-- Final Delete Button -->
        <div class="bg-[#d32f2f]/10 rounded-lg p-6 text-center">
            <h4 class="text-lg font-semibold text-gray-900 mb-3">I understand the consequences</h4>
            <p class="text-[#607d8b] mb-4">
                Once you click the button below, we'll ask you to confirm your decision and provide feedback.
            </p>
            <button
                on:click={initiateDelete}
                class="bg-[#d32f2f] text-white px-8 py-3 rounded-lg hover:bg-[#c62828] transition-colors duration-200 font-medium"
            >
                Delete My Account
            </button>
        </div>
        
    {:else}
        <!-- Confirmation Flow -->
        <div class="max-w-2xl mx-auto space-y-6">
            <div class="text-center">
                <span class="text-6xl">⚠️</span>
                <h3 class="text-2xl font-bold text-gray-900 mt-4 mb-2">Final Confirmation</h3>
                <p class="text-[#607d8b]">This action cannot be undone. Please confirm your decision below.</p>
            </div>
            
            <!-- Reason for deletion -->
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <fieldset>
                    <legend class="block text-sm font-medium text-gray-900 mb-3">
                        Why are you deleting your account? *
                    </legend>
                    <div class="space-y-2">
                        {#each deleteReasons as reason, i}
                            <label class="flex items-center">
                                <input
                                    type="radio"
                                    bind:group={deleteReason}
                                    value={reason}
                                    id={`delete-reason-${i}`}
                                    class="text-[#d32f2f] focus:ring-[#d32f2f]"
                                />
                                <span class="ml-2 text-sm text-gray-700">{reason}</span>
                            </label>
                        {/each}
                    </div>
                </fieldset>
            </div>
            
            <!-- Additional feedback -->
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <label for="additional-feedback" class="block text-sm font-medium text-gray-900 mb-3">
                    Additional feedback (optional)
                </label>
                <textarea
                    id="additional-feedback"
                    bind:value={additionalFeedback}
                    placeholder="Help us improve by sharing more details..."
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d32f2f] focus:border-transparent"
                    rows="4"
                ></textarea>
            </div>
            
            <!-- Type confirmation -->
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <label for="delete-confirmation-input" class="block text-sm font-medium text-gray-900 mb-3">
                    Type "DELETE MY ACCOUNT" to confirm *
                </label>
                <input
                    id="delete-confirmation-input"
                    type="text"
                    bind:value={confirmationText}
                    placeholder="DELETE MY ACCOUNT"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d32f2f] focus:border-transparent"
                />
            </div>
            
            <!-- Action buttons -->
            <div class="flex gap-4 justify-center">
                <button
                    on:click={cancelDelete}
                    disabled={isDeleting}
                    class="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    on:click={confirmDelete}
                    disabled={isDeleting || confirmationText !== 'DELETE MY ACCOUNT' || !deleteReason}
                    class="px-8 py-3 bg-[#d32f2f] text-white rounded-lg hover:bg-[#c62828] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                    {#if isDeleting}
                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Deleting...</span>
                    {:else}
                        <span>🗑️</span>
                        <span>Delete Account Permanently</span>
                    {/if}
                </button>
            </div>
            
            <div class="text-center text-xs text-[#607d8b]">
                <p>Account deletion may take up to 30 days to fully complete</p>
                <p>You will receive confirmation emails during this process</p>
            </div>
        </div>
    {/if}
</div>