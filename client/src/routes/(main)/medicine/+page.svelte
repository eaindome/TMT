<script lang="ts">
    import MedicineDetailPage from '$lib/components/medicine/Details.svelte';
    import { page } from '$app/stores';
    
    // Extract medicineId from the page params
    $: medicineId = $page.params.id || 'demo-medicine-id';
</script>

<svelte:head>
    <title>Medicine Details | Fake Medicine Detection</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">    
    <MedicineDetailPage {medicineId} />
</div>