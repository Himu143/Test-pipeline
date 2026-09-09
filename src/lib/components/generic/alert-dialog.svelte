<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';

	type AllowedVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

	interface Props {
		className?: string;
		triggerVariant?: AllowedVariants;
		triggerText?: string;
		title?: Snippet;
		description?: Snippet;
		cancelBtnText?: string;
		actionBtnText?: string;
		cancelVariant?: AllowedVariants;
		actionVariant?: AllowedVariants;
		cancelClass?: string;
		actionClass?: string;
	}

	const {
		triggerVariant = 'outline',
		className = '',
		triggerText = 'Show Dialog',
		title,
		description,
		cancelBtnText = 'Cancel',
		actionBtnText = 'Continue',
		cancelVariant = 'outline',
		actionVariant = 'default',
		cancelClass = '',
		actionClass = ''
	}: Props = $props();
</script>

<AlertDialog.Root>
	<AlertDialog.Trigger class={buttonVariants({ variant: triggerVariant, class: className })}>
		{triggerText}
	</AlertDialog.Trigger>
	<AlertDialog.Content>
		<AlertDialog.Header>
			{#if title}
				<AlertDialog.Title>{@render title()}</AlertDialog.Title>
			{:else}
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			{/if}

			{#if description}
				<AlertDialog.Description>{@render description()}</AlertDialog.Description>
			{:else}
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your
					data from our servers.
				</AlertDialog.Description>
			{/if}
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel
				class={buttonVariants({
					variant: cancelVariant,
					class: cancelClass
				})}
			>
				{cancelBtnText}
			</AlertDialog.Cancel>
			<AlertDialog.Action
				class={buttonVariants({
					variant: actionVariant,
					class: actionClass
				})}
			>
				{actionBtnText}
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
