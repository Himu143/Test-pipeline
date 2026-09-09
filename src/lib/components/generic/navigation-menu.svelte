<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';
	import type { SvelteComponent } from 'svelte';

	export interface NavItem {
		title: string;
		href: string;
		description?: string;
		icon?: typeof SvelteComponent;
	}

	export interface NavSection {
		trigger: string;
		columns?: number;
		items: NavItem[];
	}

	export interface Props {
		sections?: NavSection[];
		simpleLinks?: NavItem[];
		iconLinks?: NavItem[];
		flatLinks?: NavItem[]; // replaces hardcoded "Docs" etc.
		tableClass?: string;
	}

	let {
		sections = [],
		simpleLinks = [],
		iconLinks = [],
		flatLinks = [],
		tableClass = ''
	}: Props = $props();
</script>

<NavigationMenu.Root viewport={false}>
	<NavigationMenu.List>
		<!-- Section menus -->
		{#each sections as { trigger, items, columns = 2 }}
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>{trigger}</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class={`grid w-[400px] gap-4 p-2 md:w-[500px] lg:w-[600px] md:grid-cols-${columns}`}>
						{#each items as { title, href, description }}
							<li>
								<NavigationMenu.Link
									{href}
									class="hover:bg-accent hover:text-accent-foreground block rounded-md p-3 no-underline transition-colors select-none"
								>
									<div class="text-sm font-medium">{title}</div>
									{#if description}
										<p class="text-muted-foreground text-sm leading-snug">{description}</p>
									{/if}
								</NavigationMenu.Link>
							</li>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
		{/each}

		<!-- Simple links -->
		{#if simpleLinks.length}
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>Simple</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[200px] gap-4 p-2">
						{#each simpleLinks as { href, title }}
							<li>
								<NavigationMenu.Link {href}>{title}</NavigationMenu.Link>
							</li>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
		{/if}

		<!-- Icon links -->
		{#if iconLinks.length}
			<NavigationMenu.Item>
				<NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>
				<NavigationMenu.Content>
					<ul class="grid w-[200px] gap-4 p-2">
						{#each iconLinks as { href, title, icon: Icon }}
							<li>
								<NavigationMenu.Link {href} class="flex flex-row items-start gap-2">
									{#if Icon}
										<Icon />
									{/if}
									{title}
								</NavigationMenu.Link>
							</li>
						{/each}
					</ul>
				</NavigationMenu.Content>
			</NavigationMenu.Item>
		{/if}

		<!-- Flat links (ex: Docs, GitHub, etc.) -->
		{#if flatLinks.length}
			{#each flatLinks as { href, title }}
				<NavigationMenu.Item>
					<NavigationMenu.Link {href} class="px-4 py-2 text-sm hover:underline">
						{title}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			{/each}
		{/if}
	</NavigationMenu.List>
</NavigationMenu.Root>

<!-- example usage -->
<!-- <script lang="ts">
	import NavigationMenu from '$lib/components/generic/navigation-menu.svelte';
	import { CircleIcon, CircleCheckIcon, CircleHelpIcon, Inbox, List } from '@lucide/svelte/icons';

	const sections = [
		{
			trigger: 'Docs',
			items: [
				{ title: 'Getting Started', href: '/docs', description: 'Start here.' },
				{ title: 'Installation', href: '/docs/install', description: 'How to set it up.' }
			]
		},
		{
			trigger: 'Components',
			columns: 2,
			items: [
				{ title: 'Button', href: '/components/button', description: 'Clickable UI element' },
				{ title: 'Card', href: '/components/card', description: 'Content container' }
			]
		}
	];

	const simpleLinks = [
		{ title: 'Blog', href: '/blog' },
		{ title: 'Roadmap', href: '/roadmap' }
	];

	const iconLinks = [
		{ title: 'Inbox', href: '/inbox', icon: Inbox },
		{ title: 'Tasks', href: '/tasks', icon: List }
	];

	const flatLinks = [
		{ title: 'GitHub', href: 'https://github.com' },
		{ title: 'Docs', href: '/docs' }
	];
</script>

<NavigationMenu {sections} {simpleLinks} {iconLinks} {flatLinks} /> -->
