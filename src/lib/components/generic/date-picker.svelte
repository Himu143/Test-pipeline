<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let {
		value,
		placeholder = 'Pick a date',
		triggerClass = 'w-[280px] justify-start text-left font-normal',
		format = 'long'
	} = $props<{
		value?: DateValue | undefined;
		placeholder?: string;
		triggerClass?: string;
		format?: 'full' | 'long' | 'medium' | 'short';
	}>();

	let selectedDate = $state<DateValue | undefined>(value);

	$effect(() => {
		if (value !== selectedDate) {
			value = selectedDate;
		}
	});

	$effect(() => {
		if (value !== selectedDate) {
			selectedDate = value;
		}
	});

	const dateFormatter = new DateFormatter('en-US', {
		dateStyle: format
	});

	const formattedDate = $derived(
		selectedDate ? dateFormatter.format(selectedDate.toDate(getLocalTimeZone())) : placeholder
	);
</script>

<Popover.Root>
	<Popover.Trigger
		class={cn(
			buttonVariants({
				variant: 'outline',
				class: triggerClass
			}),
			!selectedDate && 'text-muted-foreground'
		)}
	>
		<CalendarIcon class="mr-2 h-4 w-4" />
		{formattedDate}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar type="single" bind:value={selectedDate} />
	</Popover.Content>
</Popover.Root>

<!-- demo usage
<DatePicker
	bind:value={selectedDate}
	placeholder="Select date..."
	triggerClass="w-[300px] justify-start text-left"
	format="medium"
	calendarType="single"
/> -->
