<script lang="ts">
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';

	type MenuItem =
		| {
				type: 'item';
				label: string;
				shortcut?: string;
				inset?: boolean;
				onClick?: () => void;
				href?: string;
		  }
		| { type: 'checkbox'; label: string; id: string; shortcut?: string }
		| { type: 'radio'; label: string; value: string }
		| { type: 'separator' }
		| {
				type: 'submenu';
				label: string;
				items: MenuItem[];
				inset?: boolean;
				onClick?: () => void;
				href?: string;
		  }
		| { type: 'group'; heading: string; items: MenuItem[] };

	interface Props {
		triggerText?: string;
		triggerStyle?: string;
		contentStyle?: string;
		itemStyle?: string;
		separatorStyle?: string;
		groupHeadingStyle?: string;
		menuItems?: MenuItem[];
		checkboxValues: { [id: string]: boolean };
		onCheckboxChange: (id: string, checked: boolean) => void;
		radioValue: string;
		onRadioChange: (value: string) => void;
	}

	let {
		triggerText = 'Right click here',
		triggerStyle = 'flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm',
		contentStyle = 'w-64',
		itemStyle = 'px-2',
		separatorStyle = 'my-1',
		groupHeadingStyle = 'text-xs font-medium text-muted-foreground',
		menuItems = [],
		checkboxValues,
		onCheckboxChange,
		radioValue,
		onRadioChange
	}: Props = $props();
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger class={triggerStyle}>
		{triggerText}
	</ContextMenu.Trigger>

	<ContextMenu.Content class={`${contentStyle} p-1`}>
		{#each menuItems as item}
			{#if item.type === 'item'}
				<ContextMenu.Item
					class={`${itemStyle} flex items-center justify-between pl-6`}
					onSelect={item.onClick}
				>
					{#if item.href}
						<a href={item.href} class="block flex-1">
							{item.label}
						</a>
					{:else}
						<span class="flex-1">{item.label}</span>
					{/if}
				</ContextMenu.Item>
			{:else if item.type === 'checkbox'}
				<ContextMenu.CheckboxItem
					class={`${itemStyle} flex items-center justify-between pl-6`}
					checked={checkboxValues[item.id] ?? false}
					onCheckedChange={(checked) => onCheckboxChange(item.id, checked)}
				>
					<span>{item.label}</span>
				</ContextMenu.CheckboxItem>
			{:else if item.type === 'radio'}
				<ContextMenu.RadioItem
					value={item.value}
					class={`${itemStyle} flex items-center`}
					checked={radioValue === item.value}
					onCheckedChange={() => onRadioChange(item.value)}
				>
					{item.label}
				</ContextMenu.RadioItem>
			{:else if item.type === 'separator'}
				<ContextMenu.Separator class={separatorStyle} />
			{:else if item.type === 'submenu'}
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger class={`${itemStyle} flex items-center justify-between pl-6`}>
						<span>{item.label}</span>
					</ContextMenu.SubTrigger>
					<ContextMenu.SubContent class={contentStyle}>
						{#each item.items as subItem}
							{#if subItem.type === 'item'}
								<ContextMenu.Item
									class={`${itemStyle} flex items-center justify-between pl-6`}
									onSelect={subItem.onClick}
								>
									{#if subItem.href}
										<a href={subItem.href} class="block flex-1">
											{subItem.label}
										</a>
									{:else}
										<span class="flex-1">{subItem.label}</span>
									{/if}
								</ContextMenu.Item>
							{/if}
						{/each}
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
			{:else if item.type === 'group'}
				<ContextMenu.RadioGroup value={radioValue} onValueChange={onRadioChange}>
					<ContextMenu.Group>
						<ContextMenu.GroupHeading class={`${groupHeadingStyle} ${itemStyle} pl-6`} inset>
							{item.heading}
						</ContextMenu.GroupHeading>
						<ContextMenu.Separator class={separatorStyle} />
						{#each item.items as groupItem}
							{#if groupItem.type === 'radio'}
								<ContextMenu.RadioItem
									value={groupItem.value}
									class={`${itemStyle} flex items-center pl-6`}
									checked={radioValue === groupItem.value}
								>
									{groupItem.label}
								</ContextMenu.RadioItem>
							{/if}
						{/each}
					</ContextMenu.Group>
				</ContextMenu.RadioGroup>
			{/if}
		{/each}
	</ContextMenu.Content>
</ContextMenu.Root>
