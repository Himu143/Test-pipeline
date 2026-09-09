<script lang="ts">
	import type { ForumChannel } from '$lib/types';
	import { cn } from '$lib/utils';

	type Props = {
		channles: Array<ForumChannel>;
		activeChannel?: ForumChannel;
	};

	let { channles, activeChannel }: Props = $props();
</script>

<ul class="flex w-full min-w-0 flex-col">
	{#each channles as channel}
		<li data-slot="sidebar-menu-item" data-sidebar="menu-item" class="group/menu-item relative">
			<a
				href={`/forum?channel=${channel.slug}`}
				class={cn([
					'active:bg-sidebar-accent',
					'active:text-sidebar-accent-foreground',
					'hover:bg-sidebar-accent',
					'hover:text-sidebar-accent-foreground',
					'flex',
					'h-8',
					'w-full',
					'items-center',
					'gap-2',
					'overflow-hidden',
					'rounded-md',
					'p-2',
					'text-left',
					'text-sm',
					'outline-hidden',
					'transition-[width,height,padding]',
					'focus-visible:ring-2',
					'disabled:pointer-events-none',
					'disabled:opacity-50',
					{ 'bg-slate-100': channel.id == activeChannel?.id }
				])}
				data-slot="sidebar-menu-button"
				data-sidebar="menu-button"
				data-size="default"
				data-active={channel.id == activeChannel?.id}
			>
				<span>{channel.name}</span>
			</a>
		</li>
	{/each}
</ul>
