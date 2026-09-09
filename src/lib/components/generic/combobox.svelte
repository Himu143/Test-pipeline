<script lang="ts">
	import Check from '@lucide/svelte/icons/check';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	let {
		value = $bindable(''),
		items = [],
		popoverPlaceholder = 'Select an option...',
		triggerClass = 'w-[200px] justify-between',
		onSelect = undefined,
		contentStyle = '',
		searchPlaceholder = 'Search...',
		notFoundStyle = '',
		popoverIconStyle
	} = $props<{
		value?: string;
		items?: Array<{ value: string; label: string }>;
		popoverPlaceholder?: string;
		triggerClass?: string;
		contentStyle?: string;
		searchPlaceholder?: string;
		notFoundStyle?: string;
		popoverIconStyle?: string;
		onSelect?: (value: string) => void;
	}>();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedLabel = $derived(
		items.find((item) => item.value === value)?.label || popoverPlaceholder
	);

	function closeAndFocusTrigger(selectedValue: string) {
		value = selectedValue;

		if (onSelect) {
			onSelect(selectedValue);
		}

		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={triggerClass}
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selectedLabel}
				<ChevronsUpDown class={`opacity-50 ${popoverIconStyle}`} />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class={`w-[200px] p-0 ${contentStyle}`}>
		<Command.Root>
			<Command.Input placeholder={searchPlaceholder} />
			<Command.List>
				<Command.Empty>
					<span class={`${notFoundStyle}`}>No options found.</span>
				</Command.Empty>
				<Command.Group>
					{#each items as item (item.value)}
						<Command.Item value={item.value} onSelect={() => closeAndFocusTrigger(item.value)}>
							<Check class={cn(value !== item.value && 'text-transparent')} />
							{item.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>


<!-- Example usage
<Combobox
bind:value={selectedValue}
items={[
    { value: 'sveltekit', label: 'SvelteKit' },
    { value: 'next.js', label: 'Next.js' },
    { value: 'nuxt.js', label: 'Nuxt.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' }
]}
buttonVariant="destructive"
popoverPlaceholder="Choose a Framework..."
triggerClass="w-[250px] justify-between bg-slate-50"
onSelect={(value) => console.log(`Selected: ${value}`)}
/> -->
