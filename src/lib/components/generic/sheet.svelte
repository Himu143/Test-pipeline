<script lang="ts">
	import * as SheetPrimitive from '$lib/components/ui/sheet/index.js';
	import type { Snippet } from 'svelte';

	type SideType = 'top' | 'bottom' | 'left' | 'right';

	interface Props {
		triggerText: string;
		triggerTextStyle: string;
		title: string;
		side: SideType;
		modal: boolean;
		preventCloseOnOutsideClick: boolean;
		closeOnEscape: boolean;
		children: any;
		overlayClass: string;
		contentClass: string;
		headerClass: string;
		titleClass: string;
		descriptionClass: string;
	}

	let {
		triggerText = 'Open',
		triggerTextStyle = '',
		title,
		side = 'right' as SideType,
		modal = true,
		preventCloseOnOutsideClick = false,
		closeOnEscape = true,
		children,
		overlayClass = '',
		contentClass = '',
		headerClass = '',
		titleClass = '',
		descriptionClass = ''
	}: Props = $props();

	let open = $state(false);

	function handleOverlayClick(event: MouseEvent) {
		if (preventCloseOnOutsideClick) {
			event.stopPropagation();
		} else {
			open = false;
		}
	}
</script>

<SheetPrimitive.Root {open} onOpenChange={(value) => (open = value)}>
	<SheetPrimitive.Trigger class={triggerTextStyle}>
		{triggerText}
	</SheetPrimitive.Trigger>

	{#if modal}
		<SheetPrimitive.Overlay class={overlayClass} onclick={handleOverlayClick} />
	{/if}

	<SheetPrimitive.Content
		{side}
		class={contentClass}
		onkeydown={(e) => {
			if (!closeOnEscape && e.key === 'key') e.preventDefault();
		}}
	>
		<SheetPrimitive.Header class={headerClass}>
			{#if title}
				<SheetPrimitive.Title class={titleClass}>
					{@render title()}
				</SheetPrimitive.Title>
			{/if}
			<SheetPrimitive.Description class={descriptionClass}>
				{@render children()}
			</SheetPrimitive.Description>
		</SheetPrimitive.Header>
		<SheetPrimitive.Close />
	</SheetPrimitive.Content>
</SheetPrimitive.Root>
