<script lang="ts">
	import { cn } from '$lib/utils';

	type Item = {
		id: string | number;
		name: string;
		path: string;
	};

	type Props = {
		items: Array<Item>;
		activeItem?: Item;
	};

	let { items, activeItem }: Props = $props();
</script>

<ul class="flex w-full min-w-0 flex-col">
	{#each items as item}
		{@const isActive = item.id === activeItem?.id}

		<li data-slot="sidebar-menu-item" class="group/menu-item relative">
			<a
				href={item.path}
				class={cn(
					'flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-colors',
					'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
					'focus-visible:ring-2',
					{
						'bg-slate-100 text-slate-900': isActive
					}
				)}
				data-slot="sidebar-menu-button"
				data-sidebar="menu-button"
				data-size="default"
				data-active={isActive}
			>
				<span>{item.name}</span>
			</a>
		</li>
	{/each}
</ul>
