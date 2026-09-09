<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';

	let {
		currentTabValue = $bindable<string>(),
		items,
		className = ''
	} = $props<{
		currentTabValue?: string;
		items: Array<{
			value: string;
			label: string;
			content: string;
		}>;
		className?: string;
	}>();
</script>

<Tabs.Root bind:value={currentTabValue} class={className}>
	<Tabs.List>
		{#each items as { value, label }}
			<Tabs.Trigger {value}>{label}</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#each items as { value, content }}
		<Tabs.Content {value}>{content}</Tabs.Content>
	{/each}
</Tabs.Root>
