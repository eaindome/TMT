<script lang="ts">
	import Skeleton from './Skeleton.svelte';
	import Card from './Card.svelte';
</script>

<Card padding="lg" shadow="md">
	<div class="flex flex-col items-center space-y-4">
		<!-- Title skeleton -->
		<Skeleton height="2rem" width="70%" rounded="lg" className="mb-2" />

		<!-- Badge skeleton -->
		<div class="my-4">
			<Skeleton height="3rem" width="8rem" rounded="full" />
		</div>

		<!-- Verdict text skeleton -->
		<Skeleton height="1.5rem" width="60%" rounded="md" className="mt-4" />

		<!-- Image skeleton -->
		<div class="my-3 w-full max-w-xs">
			<Skeleton height="15rem" width="100%" rounded="lg" />
		</div>

		<!-- Batch number skeleton -->
		<Skeleton height="1rem" width="40%" rounded="sm" className="mt-2" />

		<!-- Feedback buttons skeleton -->
		<div class="mt-6 flex w-full justify-center gap-4">
			<Skeleton height="2.5rem" width="45%" rounded="md" />
			<Skeleton height="2.5rem" width="45%" rounded="md" />
		</div>

		<!-- Action buttons skeleton -->
		<div class="mt-6 w-full space-y-2">
			<Skeleton height="2.5rem" width="100%" rounded="md" />
			<Skeleton height="2.5rem" width="100%" rounded="md" />
		</div>
	</div>
</Card>
