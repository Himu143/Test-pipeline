<script lang="ts">
	import * as Menubar from '$lib/components/ui/menubar/index.js';

	type MenuItem = {
		type: 'item' | 'separator' | 'checkbox' | 'radio' | 'sub';
		label?: string;
		shortcut?: string;
		inset?: boolean;
		checked?: boolean;
		value?: string;
		items?: MenuItem[];
		disabled?: boolean;
		action?: () => void;
	};

	type MenuConfig = {
		trigger: string;
		items: MenuItem[];
	};

	interface Props {
		menus: MenuConfig[];
		checkboxValues?: Record<string, boolean>;
		radioValues?: Record<string, string>;
	}

	let { menus, checkboxValues = $bindable({}), radioValues = $bindable({}) }: Props = $props();

	function handleItemClick(item: MenuItem) {
		if (item.action) {
			item.action();
		}
	}

	function renderItem(item: MenuItem, radioGroupName?: string) {
		if (item.type === 'separator') {
			return { component: Menubar.Separator };
		}

		if (item.type === 'checkbox') {
			return {
				component: Menubar.CheckboxItem,
				props: {
					checked: checkboxValues[item.value || ''] || false,
					inset: item.inset,
					disabled: item.disabled,
					onclick: () => {
						if (item.value) {
							checkboxValues[item.value] = !checkboxValues[item.value];
						}
						handleItemClick(item);
					}
				}
			};
		}

		if (item.type === 'radio') {
			return {
				component: Menubar.RadioItem,
				props: {
					value: item.value,
					disabled: item.disabled,
					onclick: () => handleItemClick(item)
				}
			};
		}

		if (item.type === 'sub') {
			return {
				component: 'sub',
				props: { disabled: item.disabled }
			};
		}

		return {
			component: Menubar.Item,
			props: {
				inset: item.inset,
				disabled: item.disabled,
				onclick: () => handleItemClick(item)
			}
		};
	}
</script>

<Menubar.Root>
	{#each menus as menu}
		<Menubar.Menu>
			<Menubar.Trigger>{menu.trigger}</Menubar.Trigger>
			<Menubar.Content>
				{#each menu.items as item}
					{@const rendered = renderItem(item)}

					{#if item.type === 'separator'}
						<Menubar.Separator />
					{:else if item.type === 'checkbox'}
						<Menubar.CheckboxItem
							bind:checked={checkboxValues[item.value || '']}
							inset={item.inset}
							disabled={item.disabled}
							onclick={() => handleItemClick(item)}
						>
							{item.label}
						</Menubar.CheckboxItem>
					{:else if item.type === 'radio'}
						<Menubar.RadioGroup bind:value={radioValues[menu.trigger.toLowerCase()]}>
							{#each item.items || [] as radioItem}
								<Menubar.RadioItem
									value={radioItem.value}
									disabled={radioItem.disabled}
									onclick={() => handleItemClick(radioItem)}
								>
									{radioItem.label}
								</Menubar.RadioItem>
							{/each}
						</Menubar.RadioGroup>
						{#if item.items && item.items.some((i) => i.type !== 'radio')}
							<Menubar.Separator />
							{#each item.items.filter((i) => i.type !== 'radio') as nonRadioItem}
								{@const nonRadioRendered = renderItem(nonRadioItem)}
								<Menubar.Item
									inset={nonRadioItem.inset}
									disabled={nonRadioItem.disabled}
									onclick={() => handleItemClick(nonRadioItem)}
								>
									{nonRadioItem.label}
								</Menubar.Item>
							{/each}
						{/if}
					{:else if item.type === 'sub'}
						<Menubar.Sub>
							<Menubar.SubTrigger disabled={item.disabled}>
								{item.label}
							</Menubar.SubTrigger>
							<Menubar.SubContent>
								{#each item.items || [] as subItem}
									{#if subItem.type === 'separator'}
										<Menubar.Separator />
									{:else}
										<Menubar.Item
											disabled={subItem.disabled}
											onclick={() => handleItemClick(subItem)}
										>
											{subItem.label}
										</Menubar.Item>
									{/if}
								{/each}
							</Menubar.SubContent>
						</Menubar.Sub>
					{:else}
						<Menubar.Item
							inset={item.inset}
							disabled={item.disabled}
							onclick={() => handleItemClick(item)}
						>
							{item.label}
							{#if item.shortcut}
								<Menubar.Shortcut>{item.shortcut}</Menubar.Shortcut>
							{/if}
						</Menubar.Item>
					{/if}
				{/each}
			</Menubar.Content>
		</Menubar.Menu>
	{/each}
</Menubar.Root>

<!-- example usage -->
 <!-- <script lang="ts">
	import Menubar from '$lib/components/generic/menu-bar.svelte';

	// State management
	let checkboxValues = $state({
		bookmarks: false,
		fullUrls: true
	});

	let radioValues = $state({
		profiles: 'benoit'
	});

	// Menu configuration
	const menus = [
		{
			trigger: 'File',
			items: [
				{
					type: 'item',
					label: 'New Tab',
					shortcut: '⌘T',
					action: () => console.log('New Tab clicked')
				},
				{
					type: 'item',
					label: 'New Window',
					shortcut: '⌘N',
					action: () => console.log('New Window clicked')
				},
				{
					type: 'item',
					label: 'New Incognito Window',
					action: () => console.log('Incognito clicked')
				},
				{ type: 'separator' },
				{
					type: 'sub',
					label: 'Share',
					items: [
						{
							type: 'item',
							label: 'Email link',
							action: () => console.log('Email link clicked')
						},
						{
							type: 'item',
							label: 'Messages',
							action: () => console.log('Messages clicked')
						},
						{
							type: 'item',
							label: 'Notes',
							action: () => console.log('Notes clicked')
						}
					]
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Print...',
					shortcut: '⌘P',
					action: () => console.log('Print clicked')
				}
			]
		},
		{
			trigger: 'Edit',
			items: [
				{
					type: 'item',
					label: 'Undo',
					shortcut: '⌘Z',
					action: () => console.log('Undo clicked')
				},
				{
					type: 'item',
					label: 'Redo',
					shortcut: '⇧⌘Z',
					action: () => console.log('Redo clicked')
				},
				{ type: 'separator' },
				{
					type: 'sub',
					label: 'Find',
					items: [
						{
							type: 'item',
							label: 'Search the web',
							action: () => console.log('Search web clicked')
						},
						{ type: 'separator' },
						{
							type: 'item',
							label: 'Find...',
							action: () => console.log('Find clicked')
						},
						{
							type: 'item',
							label: 'Find Next',
							action: () => console.log('Find Next clicked')
						},
						{
							type: 'item',
							label: 'Find Previous',
							action: () => console.log('Find Previous clicked')
						}
					]
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Cut',
					action: () => console.log('Cut clicked')
				},
				{
					type: 'item',
					label: 'Copy',
					action: () => console.log('Copy clicked')
				},
				{
					type: 'item',
					label: 'Paste',
					action: () => console.log('Paste clicked')
				}
			]
		},
		{
			trigger: 'View',
			items: [
				{
					type: 'checkbox',
					label: 'Always Show Bookmarks Bar',
					value: 'bookmarks',
					action: () => console.log('Bookmarks toggled:', checkboxValues.bookmarks)
				},
				{
					type: 'checkbox',
					label: 'Always Show Full URLs',
					value: 'fullUrls',
					action: () => console.log('Full URLs toggled:', checkboxValues.fullUrls)
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Reload',
					shortcut: '⌘R',
					inset: true,
					action: () => console.log('Reload clicked')
				},
				{
					type: 'item',
					label: 'Force Reload',
					shortcut: '⇧⌘R',
					inset: true,
					action: () => console.log('Force Reload clicked')
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Toggle Fullscreen',
					inset: true,
					action: () => console.log('Toggle Fullscreen clicked')
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Hide Sidebar',
					inset: true,
					action: () => console.log('Hide Sidebar clicked')
				}
			]
		},
		{
			trigger: 'Profiles',
			items: [
				{
					type: 'radio',
					items: [
						{
							type: 'radio',
							label: 'Andy',
							value: 'andy',
							action: () => console.log('Andy selected')
						},
						{
							type: 'radio',
							label: 'Benoit',
							value: 'benoit',
							action: () => console.log('Benoit selected')
						},
						{
							type: 'radio',
							label: 'Luis',
							value: 'luis',
							action: () => console.log('Luis selected')
						}
					]
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Edit...',
					inset: true,
					action: () => console.log('Edit Profile clicked')
				},
				{ type: 'separator' },
				{
					type: 'item',
					label: 'Add Profile...',
					inset: true,
					action: () => console.log('Add Profile clicked')
				}
			]
		}
	];
</script>

<Menubar {menus} bind:checkboxValues bind:radioValues /> -->
