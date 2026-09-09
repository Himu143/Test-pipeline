<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Skeleton } from '$lib/components/ui/skeleton';

	let { type = 'list' }: { type: 'single' | 'list' } = $props();

	const noOfTimes = $derived(type == 'list' ? 3 : 1);

</script>

{#each Array(noOfTimes) as _}
	<Card.Root class="mb-4">
		<Card.Header>
			<div class="mb-3 flex items-center justify-between space-x-4">
				<div class="flex items-center gap-2">
					<Skeleton class="size-8 rounded-full" />
					<Skeleton class="h-4 w-[250px]" />
				</div>
				<div class="space-y-2">
					<Skeleton class="h-4 w-[150px]" />
				</div>
			</div>
		</Card.Header>

		<Card.Content>
			<div class="flex flex-col gap-2">
				<Skeleton class="mb-2 h-5 w-[400px]" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-[300px]" />
			</div>
		</Card.Content>
	</Card.Root>
{/each}
