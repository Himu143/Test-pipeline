<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	type triggerButtonVariantType =
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link';

	interface Props {
		triggerButtonVariant?: triggerButtonVariantType;
		triggerButtonText?: string;
		popoverContentStyle?: string;
		children: any;
		onClick?: (e: MouseEvent) => void;
	}

	const {
		triggerButtonVariant = 'default',
		triggerButtonText = 'Open',
		popoverContentStyle,
		children,
		onClick
	}: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger onclick={onClick} class={buttonVariants({ variant: triggerButtonVariant })}
		>{triggerButtonText}</Popover.Trigger
	>
	<Popover.Content class={`w-80 ${popoverContentStyle}`}>
		{@render children()}
	</Popover.Content>
</Popover.Root>
