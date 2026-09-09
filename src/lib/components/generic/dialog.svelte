<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import type { Snippet } from 'svelte';
	import Button from '../ui/button/button.svelte';

	type AllowedVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

	interface Props {
		className?: string;
		triggerVariant?: AllowedVariants;
		triggerText?: string;
		title?: string | Snippet;
		description?: string | Snippet;
		children: any;
		submitBtnText?: string;
		submitVariant?: AllowedVariants;
		submitBtnClass?: string;
		maxWidth?: string;
	}

	const {
		triggerVariant = 'outline',
		className = '',
		triggerText = 'Edit Profile',
		title,
		description,
		children, 
		submitBtnText = 'Save changes',
		submitVariant = 'default',
		submitBtnClass = '',
		maxWidth = 'sm:max-w-[425px]'
	}: Props = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: triggerVariant, class: className })}>
		{triggerText}
	</Dialog.Trigger>
	<Dialog.Content class={maxWidth}>
		<Dialog.Header>
			<Dialog.Title>
				{#if typeof title === 'function'}
					{@render title()}
				{:else if title}
					{title}
				{:else}
					Edit profile
				{/if}
			</Dialog.Title>

			<Dialog.Description>
				{#if typeof description === 'function'}
					{@render description()}
				{:else if description}
					{description}
				{:else}
					Make changes to your profile here. Click save when you're done.
				{/if}
			</Dialog.Description>
		</Dialog.Header>
			{@render children()}
		<Dialog.Footer>
			<Button type="submit" variant={submitVariant} class={submitBtnClass}>
				{submitBtnText}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
