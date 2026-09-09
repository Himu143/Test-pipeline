<script lang="ts">
	import ContextMenu from '$lib/components/generic/context-menu.svelte';

	let checkboxValues = $state({
		showBookmarks: true,
		showFullURLs: false
	});
	let selectedRadio = $state('pedro');

	const menuItems = [
		{
			type: 'item',
			label: 'Back',
			shortcut: '⌘[',
			inset: true,
			onClick: () => {
				alert('Back clicked');
			}
		},
		{ type: 'item', label: 'Forward', shortcut: '⌘]', inset: true, href: '/' },
		{
			type: 'submenu',
			label: 'More Tools',
			items: [
				{
					type: 'item',
					label: 'Save Page As...',
					shortcut: '⇧⌘S',
					onClick: () => alert('Save Page As clicked')
				},
				{
					type: 'item',
					label: 'Create Shortcut...',
					href: '/'
				}
			]
		},
		{ type: 'separator' },
		{ type: 'checkbox', label: 'Show Bookmarks', id: 'showBookmarks', shortcut: '⌘⇧B' },
		{ type: 'checkbox', label: 'Show Full URLs', id: 'showFullURLs' },
		{
			type: 'group',
			heading: 'People',
			items: [
				{ type: 'radio', label: 'Pedro Duarte', value: 'pedro' },
				{ type: 'radio', label: 'Colm Tuite', value: 'colm' }
			]
		}
	];

	function handleCheckedChange(id: string, checked: boolean) {
		checkboxValues[id] = checked;
	}

	function handleRadioChange(value: string) {
		selectedRadio = value;
	}
</script>

<ContextMenu
	triggerText="Right click here"
	{menuItems}
	{checkboxValues}
	onCheckboxChange={handleCheckedChange}
	radioValue={selectedRadio}
	onRadioChange={handleRadioChange}
/>

<div class="mt-4 rounded border p-4">
	<p>Current states:</p>
	<ul>
		<li>Show Bookmarks: {checkboxValues.showBookmarks ? 'Checked' : 'Unchecked'}</li>
		<li>Show Full URLs: {checkboxValues.showFullURLs ? 'Checked' : 'Unchecked'}</li>
		<li>Selected: {selectedRadio}</li>
	</ul>
</div>
