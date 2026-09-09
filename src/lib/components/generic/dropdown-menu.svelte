<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';

	type triggerButtonVariantType =
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';

	let {
		triggerLabel = 'Open',
		triggerButtonVariant = 'default',
		groups = []
	} = $props<{
		triggerLabel?: string;
		triggerButtonVariant?: triggerButtonVariantType;
		groups?: Array<{
			heading?: string;
			items: Array<{
				icon?: any;
				label: string;
				href?: string;
				onClick?: () => void;
				shortcut?: string;
				subItems?: Array<{
					icon?: any;
					label: string;
					href?: string;
					onClick?: () => void;
				}>;
			}>;
		}>;
	}>();

	function allow(action?: () => void, href?: string) {
		if (action) {
			action();
		}
		if (href) {
			window.location.href = href;
		}
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: triggerButtonVariant })}>
		{triggerLabel}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		{#each groups as group, gidx (gidx)}
			<DropdownMenu.Group>
				{#if group.heading}
					<DropdownMenu.GroupHeading>{group.heading}</DropdownMenu.GroupHeading>
				{/if}
				{#each group.items as item, idx (idx)}
					{#if item.subItems}
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger onclick={() => allow(item.onClick, item.href)}>
								{#if item.icon}
									<item.icon class="mr-2 size-4" />
								{/if}
								<span>{item.label}</span>
							</DropdownMenu.SubTrigger>
							<DropdownMenu.SubContent>
								{#each item.subItems as subItem, sidx (sidx)}
									<DropdownMenu.Item onclick={() => allow(subItem.onClick, subItem.href)}>
										{#if subItem.icon}
											<subItem.icon class="mr-2 size-4" />
										{/if}
										<span>{subItem.label}</span>
									</DropdownMenu.Item>
								{/each}
							</DropdownMenu.SubContent>
						</DropdownMenu.Sub>
					{:else}
						<DropdownMenu.Item onclick={() => allow(item.onClick, item.href)}>
							{#if item.icon}
								<item.icon class="mr-2 size-4" />
							{/if}
							<span>{item.label}</span>
							{#if item.shortcut}
								<DropdownMenu.Shortcut>{item.shortcut}</DropdownMenu.Shortcut>
							{/if}
						</DropdownMenu.Item>
					{/if}
				{/each}
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- example usage: -->

<!-- <DropdownMenu
	triggerLabel="Menu"
	triggerButtonVariant="default"
	groups={[
		{
			heading: 'My Account',
			items: [
				{
					icon: User,
					label: 'Profile',
					shortcut: '⇧⌘P',
					// href: '/profile',
					onClick: () => alert('Profile clicked')
				},
				{
					icon: CreditCard,
					label: 'Billing',
					shortcut: '⌘B',
					onClick: () => {
						alert('billing clicked');
					}
				},
				{ icon: Settings, label: 'Settings', shortcut: '⌘S', href: '/settings' }
			]
		},
		{
			heading: 'Team',
			items: [
				{
					icon: UserPlus,
					label: 'Invite Users',
					subItems: [
						{ icon: Mail, label: 'Email', href: '/invite/email' },
						{ icon: MessageSquare, label: 'Message', href: '/invite/message' },
						{ icon: CirclePlus, label: 'More...', href: '/invite/more' }
					]
				},
				{ icon: Plus, label: 'New Team', shortcut: '⌘+T', href: '/team/new' }
			]
		}
	]}
/> -->
