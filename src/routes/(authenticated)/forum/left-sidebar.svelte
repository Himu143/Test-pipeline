<script lang="ts">
	import { ChevronDown, ChevronRight } from '@lucide/svelte';
	import { m } from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select';

	let { cohort, cohorts = [], activeChannel, otherTopics, isAdmin = false } = $props();

	function handleCohortChange(value: string) {
		const selectedCohort = cohorts.find((c: any) => c.name === value || c.id === value);
		if (selectedCohort) {
			const publicChannel = selectedCohort.channels?.find((ch: any) => ch.channel_name?.toLowerCase() === 'public' || ch.channel_slug?.endsWith('-public'));
			const firstChannelSlug = publicChannel ? publicChannel.channel_slug : (selectedCohort.channels?.[0]?.channel_slug ?? 'public');
			
			// If channel slug is public channel of a cohort (like modul-1-public), route to channel=public if public cohort or keep slug
			if (selectedCohort.name?.toLowerCase() === 'public') {
				goto('/forum?channel=public');
			} else {
				goto(`/forum?channel=${firstChannelSlug}`);
			}
		}
	}
</script>

<div class="rounded-lg border border-border-gold px-4 py-1.25 bg-bg-gold-light shadow-sm">
	{#if isAdmin && cohorts && cohorts.length > 0}
		<Select.Root
			type="single"
			value={cohort?.name ?? (cohorts.find((c: any) => c.name === activeChannel?.name)?.name)}
			onValueChange={handleCohortChange}
		>
			<Select.Trigger
				class="h-auto border-none w-full bg-bg-gold-light text-xl font-normal text-secondary-black capitalize focus:ring-0 focus:ring-offset-0 shadow-none"
			>
				{cohort?.name ?? activeChannel?.name ?? 'Public Community'}
			</Select.Trigger>
			<Select.Content class="bg-bg-gold-light w-64 sm:w-80! border border-border-gold" align="start" sideOffset={5}>
				{#each cohorts as item}
					<Select.Item value={item.name} label={item.name} class="data-[highlighted]:bg-primary data-[highlighted]:text-black">
						{item.name}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	{:else}
		<h2 class="text-xl text-secondary-black capitalize">
			{cohort?.name ?? activeChannel?.name ?? 'Public Community'}
		</h2>
	{/if}
</div>

<!-- Current Topic -->
<div class="space-y-3 rounded-lg border border-border-gold bg-bg-gold-light p-4 shadow-sm">
	<div class="mb-2 flex items-center gap-2">
		<div class="h-2 w-2 rounded-full bg-slate-400"></div>
		<span class="text-xs font-medium tracking-wider text-muted-foreground uppercase lg:text-lg">
			{m.forum_current_topic()}
		</span>
	</div>

	{#if activeChannel}
		<div
			class="flex items-start justify-between text-xl font-medium text-secondary-black"
		>
			{activeChannel.name}
			<ChevronDown class="mt-1 h-4 w-4 text-solid-primary" />
		</div>
		<!-- {JSON.stringify(activeChannel)} -->
		<div class="text-xs leading-relaxed text-muted-foreground lg:text-lg">
			{m.forum_about_this_topic()} <br />
			<!-- {m.forum_about_this_description()} -->
			<span class="text-sm">
				{activeChannel?.description}
			</span>
		</div>
	{:else}
		<div class="text-sm text-muted-foreground lg:text-lg">Select a topic...</div>
	{/if}
</div>

<!-- Other Topics (Module List) -->
{#if otherTopics.length > 0}
	<div class="space-y-1">
		<div class="mb-3 flex items-center gap-2 px-1">
			<div class="h-2 w-2 rounded-full bg-slate-400"></div>
			<span
				class="text-xs font-medium tracking-wider text-muted-foreground uppercase lg:text-lg"
			>
				{m.forum_other_topic()}
			</span>
		</div>

		<nav class="space-y-1">
			{#each otherTopics as category}
				<a
					href={`/forum?channel=${category.slug}`}
					class="group flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-slate-100"
				>
					<span
						class="text-lg font-medium text-text-gray-medium group-hover:text-secondary-black"
					>
						{category.name}
					</span>
					<div
						class="flex h-6 w-6 items-center justify-center rounded-full bg-bg-gold-light opacity-0 transition-opacity group-hover:opacity-100"
					>
						<ChevronRight class="h-4 w-4 text-solid-primary" />
					</div>
				</a>
			{/each}
		</nav>
	</div>
{/if}
