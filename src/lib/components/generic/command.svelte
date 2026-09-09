<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';

	interface Group {
		heading: string;
		items: string[];
	}

	interface Props {
		rootStyle?: string;
		inputPlaceholder?: string;
		emptyCommandMessage?: string;
		groupStyle?: string;
		itemStyle?: string;
		groups?: Group[];
		emptyCommandStyle?: string;
	}

	let {
		rootStyle = '',
		groupStyle = '',
		itemStyle = '',
		inputPlaceholder = 'Type a command or search...',
		emptyCommandMessage = 'No results found.',
		emptyCommandStyle = '',
		groups = [
			{
				heading: 'Suggestions',
				items: ['Calendar', 'Search Emoji', 'Calculator']
			},
			{
				heading: 'Settings',
				items: ['Profile', 'Billing', 'Settings']
			}
		]
	}: Props = $props();
</script>

<Command.Root class={`max-w-[450px] rounded-lg border shadow-md ${rootStyle}`}>
	<Command.Input placeholder={inputPlaceholder} />
	<Command.List>
		<Command.Empty class={`${emptyCommandStyle}`}>{emptyCommandMessage}</Command.Empty>

		{#each groups as group, i}
			{#if i > 0}
				<Command.Separator />
			{/if}

			<Command.Group heading={group.heading} class={`text-red-500 ${groupStyle}`}>
				{#each group.items as item}
					<Command.Item class={`text-blue-600 ${itemStyle}`}>{item}</Command.Item>
				{/each}
			</Command.Group>
		{/each}
	</Command.List>
</Command.Root>
