<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	let {
		value = $bindable(null),
		options = [],
		triggerClass = 'w-[180px]',
		groupHeading = ''
	} = $props<{
		value?: string;
		options?: Array<{ value: string; label: string }>;
		triggerClass?: string;
		groupHeading?: string;
	}>();

	const selectedLabel = $derived(
		options.find((option) => option.value === value)?.label || 'Select an option'
	);
</script>

<Select.Root type="single" bind:value>
	<Select.Trigger class={triggerClass}>
		{selectedLabel}
	</Select.Trigger>
	<Select.Content>
		{#if groupHeading}
			<Select.Group>
				<Select.GroupHeading>{groupHeading}</Select.GroupHeading>
				{#each options as option (option.value)}
					<Select.Item value={option.value} label={option.label}>
						{option.label}
					</Select.Item>
				{/each}
			</Select.Group>
		{:else}
			{#each options as option (option.value)}
				<Select.Item value={option.value} label={option.label}>
					{option.label}
				</Select.Item>
			{/each}
		{/if}
	</Select.Content>
</Select.Root>
