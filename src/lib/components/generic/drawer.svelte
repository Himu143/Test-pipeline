<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';

	type directionTypes = 'top' | 'bottom' | 'left' | 'right';

	interface Props {
		trigger?: Snippet;
		header?: Snippet;
		title?: string;
		description?: Snippet;
		body?: Snippet;
		footer?: Snippet;
		triggerLabel?: string;
		triggerClass?: string;
		drawerClass?: string;
		cancelBtnText?: string;
		actionBtnText?: string;
		cancelBtnStyle?: string;
		actionBtnStyle?: string;
		direction?: directionTypes;
	}

	let {
		trigger,
		header,
		title,
		description,
		body,
		footer,
		direction,
		triggerLabel = 'Open Drawer',
		triggerClass = buttonVariants({ variant: 'outline' }),
		drawerClass = 'mx-auto w-full max-w-md',
		cancelBtnText = 'Cancel',
		actionBtnText = 'Submit',
		cancelBtnStyle = buttonVariants({ variant: 'outline' }),
		actionBtnStyle = buttonVariants({ variant: 'default' })
	}: Props = $props();
</script>

<Drawer.Root {direction}>
	<Drawer.Trigger class={triggerClass}>
		{#if trigger}
			{@render trigger()}
		{:else}
			{triggerLabel}
		{/if}
	</Drawer.Trigger>

	<Drawer.Content>
		<div class={drawerClass}>
			<Drawer.Header>
				{#if header}
					{@render header()}
				{:else}
					{#if title}
						<Drawer.Title>{title}</Drawer.Title>
					{/if}
					{#if description}
						<Drawer.Description>{@render description()}</Drawer.Description>
					{/if}
				{/if}
			</Drawer.Header>

			{#if body}
				<div class="p-4">
					{@render body()}
				</div>
			{/if}

			<Drawer.Footer class="flex justify-between">
				{#if footer}
					{@render footer()}
				{:else}
					<Drawer.Close class={cancelBtnStyle}>{cancelBtnText}</Drawer.Close>
					<Button class={actionBtnStyle}>{actionBtnText}</Button>
				{/if}
			</Drawer.Footer>
		</div>
	</Drawer.Content>
</Drawer.Root>

<!-- example usage -->
<!-- <Drawer title="Edit Profile" triggerLabel="⚙ Open Settings" direction="right" cancelBtnText="Cancel" actionBtnText="Save">
	{#snippet description()}
		<div class="space-y-4 p-4">Update your personal info</div>
	{/snippet}
	{#snippet body()}
		<div class="space-y-4 p-4">
			<input placeholder="Name" class="input w-full" />
			<input placeholder="Email" class="input w-full" />
		</div>
	{/snippet}
</Drawer> -->

