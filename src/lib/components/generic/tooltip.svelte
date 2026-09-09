<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';

	interface Prop {
		triggerText?: string;
		contentText?: string;
		triggerVariant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
		triggerClass?: string;
		contentClass?: string;
		delayDuration?: number;
	}

	let {
		triggerText = 'Hover',
		contentText = 'Add to library',
		triggerVariant = 'outline',
		triggerClass = '',
		contentClass = '',
		delayDuration = 200
	}: Prop = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root {delayDuration}>
		<Tooltip.Trigger class={buttonVariants({ variant: triggerVariant }) + ' ' + triggerClass}>
			<slot name="trigger">{triggerText}</slot>
		</Tooltip.Trigger>
		<Tooltip.Content class={contentClass}>
			<slot name="content">{contentText}</slot>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
