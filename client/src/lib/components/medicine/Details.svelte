<script lang="ts">
    import { onMount } from 'svelte';
    import MedicineHeader from '$lib/components/medicine/Header.svelte';
    import ImageGallery from '$lib/components/medicine/ImageGallery.svelte';
    import AuthenticityInfo from '$lib/components/medicine/AuthenticityInfo.svelte';
    import SafetyInstructions from '$lib/components/medicine/SafetyInstructions.svelte';
    import FlagActionButton from '$lib/components/medicine/FlagActionButton.svelte';
    import ScanRecordsSection from '$lib/components/medicine/ScanRecordsSection.svelte';
    import type { Medicine, AuthenticityStatus } from '$lib/types/medicine.ts';
    import { page } from '$app/stores';
    import Breadcrumb from '$lib/components/ui/BreadCrumb.svelte';
    
    
    export let medicineId: string;
    
    let medicine: Medicine | null = null;
    let loading = true;
    let error = false;

    
    
    // Mock data - In production, you would fetch this from your API
    onMount(async () => {
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Mock data
            medicine = {
                id: medicineId,
                name: "Amoxicillin",
                brand: "MediCure Pharma",
                manufacturer: "Global Health Pharmaceuticals",
                status: "safe" as AuthenticityStatus,
                lastVerified: new Date(),
                images: [
                    "/api/placeholder/400/300",
                    "/api/placeholder/400/300"
                ],
                description: "Amoxicillin is a penicillin antibiotic used to treat bacterial infections.",
                batchNumber: "AMX-2025-0542",
                expiryDate: new Date("2026-05-15"),
                scanStats: {
                    totalScans: 1458,
                    safeCounts: 1426,
                    cautionCounts: 24,
                    fakeCounts: 8
                },
                safetyInstructions: [
                    "Store at room temperature away from moisture and heat",
                    "Take as directed by your doctor",
                    "Complete the full course as prescribed"
                ],
                recentScans: [
                    {
                        id: "scan1",
                        date: new Date("2025-05-10"),
                        location: "New York, USA",
                        status: "safe",
                        user: "Pharmacist"
                    },
                    {
                        id: "scan2",
                        date: new Date("2025-05-08"),
                        location: "Boston, USA",
                        status: "caution",
                        user: "Consumer"
                    },
                    {
                        id: "scan3",
                        date: new Date("2025-05-05"),
                        location: "Chicago, USA",
                        status: "safe",
                        user: "Healthcare Worker"
                    }
                ]
            };
            
            loading = false;
        } catch (e) {
            console.error("Error fetching medicine details:", e);
            error = true;
            loading = false;
        }
    });
    
    function handleFlagDrug() {
        // In production, implement API call to flag the drug
        alert("Drug has been flagged for review by our team. Thank you for your vigilance!");
    }

    // Define breadcrumb items
	const breadcrumbItems = [
		{ label: 'History', href: '/history' },
		{ label: 'Details', href: '', current: true }
	];
</script>

<svelte:head>
    <title>{medicine ? `${medicine.name} Details` : 'Medicine Details'} | Fake Medicine Detection</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
    <!-- Header with Back Button -->
	<Breadcrumb items={breadcrumbItems} />
    {#if loading}
        <div class="flex justify-center items-center h-64">
            <div class="animate-pulse text-primary-trust-green text-xl">Loading medicine details...</div>
        </div>
    {:else if error}
        <div class="bg-danger-red bg-opacity-10 text-danger-red p-4 rounded-lg text-center">
            <h2 class="text-xl font-bold">Error</h2>
            <p>Failed to load medicine details. Please try again later.</p>
            <button class="mt-4 bg-primary-trust-green text-white px-4 py-2 rounded-lg" on:click={() => window.location.reload()}>
                Retry
            </button>
        </div>
    {:else if medicine}
        <div class="grid grid-cols-1 gap-8">
            <!-- Medicine Header -->
            <MedicineHeader 
                name={medicine.name} 
                brand={medicine.brand} 
                manufacturer={medicine.manufacturer} 
                status={medicine.status} 
                batchNumber={medicine.batchNumber}
                expiryDate={medicine.expiryDate}
            />
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Left Column -->
                <div class="md:col-span-2 space-y-6">
                    <!-- Image Gallery -->
                    <ImageGallery images={medicine.images} />
                    
                    <!-- Authenticity Information -->
                    <AuthenticityInfo 
                        status={medicine.status} 
                        lastVerified={medicine.lastVerified} 
                        scanStats={medicine.scanStats} 
                    />
                    
                    <!-- Safety Instructions -->
                    <SafetyInstructions instructions={medicine.safetyInstructions} />
                </div>
                
                <!-- Right Column -->
                <div class="space-y-6">
                    <!-- Flag Action -->
                    <FlagActionButton onFlag={handleFlagDrug} />
                    
                    <!-- Scan Records -->
                    <ScanRecordsSection scans={medicine.recentScans} />
                </div>
            </div>
        </div>
    {/if}
</div>