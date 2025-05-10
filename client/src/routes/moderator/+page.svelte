<script lang="ts">
    import { user } from '$lib/stores/user';
    import Card from '$lib/components/Card.svelte';
    import Button from '$lib/components/Button.svelte';
    import Badge from '$lib/components/Badge.svelte';
  
    // Mock data for flagged scans (replace with API call in production)
    let flaggedScans = [
      {
        id: '1',
        batchNumber: 'BATCH123',
        photoUrl: 'https://via.placeholder.com/150',
        verdict: 'yellow',
        reviews: 5,
      },
      {
        id: '2',
        batchNumber: 'BATCH456',
        photoUrl: 'https://via.placeholder.com/150',
        verdict: 'red',
        reviews: 3,
      },
    ];
  
    async function handleMarkSafe(scanId: string) {
      console.log(`Marking scan ${scanId} as safe`);
      // Implement API call to update scan status
    }
  
    async function handleMarkFake(scanId: string) {
      console.log(`Marking scan ${scanId} as fake`);
      // Implement API call to update scan status
    }
</script>
  
{#if $user}
    <Card padding="lg" shadow="md">
      <h1 class="text-2xl font-bold text-trust-green mb-4">Moderator Dashboard</h1>
      {#if flaggedScans.length}
        <div class="space-y-4">
          {#each flaggedScans as scan}
            <Card padding="md" shadow="sm" border>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-neutral-gray">Batch Number: {scan.batchNumber}</p>
                  <Badge
                    status={scan.verdict === 'green' ? 'safe' : scan.verdict === 'yellow' ? 'suspicious' : 'fake'}
                    size="md"
                  />
                  <p class="text-sm text-neutral-gray mt-1">Reviews: {scan.reviews}</p>
                  <img src={scan.photoUrl} alt="Medicine" class="mt-2 max-w-xs rounded-lg" />
                </div>
                <div class="flex flex-col gap-2">
                  <Button variant="success" on:click={() => handleMarkSafe(scan.id)}>Mark Safe</Button>
                  <Button variant="danger" on:click={() => handleMarkFake(scan.id)}>Mark Fake</Button>
                </div>
              </div>
            </Card>
          {/each}
        </div>
      {:else}
        <p class="text-neutral-gray">No flagged scans to review.</p>
      {/if}
    </Card>
  {:else}
    <Card padding="lg" shadow="md">
      <p class="text-neutral-gray">
        Please <a href="/login" class="text-accent-blue">login</a> to access the moderator dashboard.
      </p>
    </Card>
{/if}