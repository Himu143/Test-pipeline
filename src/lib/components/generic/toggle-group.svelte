<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';

	type ToggleType = 'single' | 'multiple';

	let {
		type,
		items,
		selected = $bindable<string | string[]>()
	} = $props<{
		type: ToggleType;
		items: Array<{
			value: string;
			label: string;
			ariaLabel?: string;
		}>;
		selected?: string | string[];
	}>();
</script>

{#if type === 'single'}
	<ToggleGroup.Root type="single" bind:value={selected}>
		{#each items as { value, label, ariaLabel } (value)}
			<ToggleGroup.Item {value} aria-label={ariaLabel ?? `Toggle ${label}`}>
				{label}
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
{:else}
	<ToggleGroup.Root type="multiple" bind:value={selected}>
		{#each items as { value, label, ariaLabel } (value)}
			<ToggleGroup.Item {value} aria-label={ariaLabel ?? `Toggle ${label}`}>
				{label}
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
{/if}
