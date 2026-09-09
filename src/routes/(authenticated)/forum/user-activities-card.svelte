<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { ChevronRight, MessageCircle } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import { forumUserActivityStore } from '$lib/stores/forum-user-activity.svelte';

	let {
		channelId,
		onActivitySelect,
		onViewYourPosts
	}: { channelId?: string; onActivitySelect: (item: any) => void; onViewYourPosts: () => void } =
		$props();

	function activitySelectHandler(item) {
		if (item.activity_type == 'comment') {
			onActivitySelect(item.linked_post);
		} else if (item.activity_type == 'post') {
			onActivitySelect(item);
		}
	}

	$effect(() => {
		forumUserActivityStore.getActivities(channelId);
	});
</script>

<Card.Root>
	<Card.Header class="flex flex-row flex-wrap items-center justify-between space-y-0 pb-4">
		<div class="flex items-center gap-2">
			<div class="h-2 w-2 rounded-full bg-slate-500"></div>
			<Card.Title class="text-base font-medium lg:text-lg">
				{m.forum_your_posts()}
			</Card.Title>
		</div>
		<Button
			variant="default"
			size="sm"
			onclick={() => onViewYourPosts()}
			class="h-8 rounded-full bg-solid-primary px-3 text-xs font-medium text-black hover:bg-primary-hover lg:text-lg"
		>
			{m.forum_view_your_posts()}
		</Button>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<!-- Mock Data -->
		{#each forumUserActivityStore.atvities as item}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				onclick={() => activitySelectHandler(item)}
				class="flex cursor-pointer items-start justify-between space-x-4 rounded-lg p-1 transition-colors hover:bg-muted/50"
			>
				<div class="space-y-1">
					<p class="text-sm font-semibold text-secondary-black lg:text-lg">
						{#if item.activity_type == 'post'}
							You created a post
						{:else if item.activity_type == 'comment'}
							You comment on a post
						{:else if item.activity_type == 'like'}
							You liked a post
						{/if}
					</p>
					<p class="text-xs text-muted-foreground lg:text-lg">
						{#if item.activity_type == 'post' || item.activity_type == 'like'}
							{item.header}
						{:else if item.activity_type == 'comment'}
							{item.linked_post.header}
						{/if}
					</p>
				</div>

				<!-- Chevron -->
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50/50"
				>
					<ChevronRight class="h-4 w-4 text-orange-400" />
				</div>
			</div>
			<div class="h-[1px] bg-border last:hidden"></div>
		{/each}
	</Card.Content>
</Card.Root>
