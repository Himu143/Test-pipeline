<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	export interface Row {
		[key: string]: any;
	}

	interface Props {
		data?: Row[];
		caption?: string;

		tableHeadings?: string[];
		footer?: string[];
		row?: (item: Row) => string[];

		tableClass?: string;
		rowClass?: string;
		cellClass?: string;
		lastCellClass?: string;
	}

	let {
		data = [],
		caption = 'Table',
		tableHeadings = [],
		footer,
		row = (item) => Object.values(item),

		tableClass = '',
		rowClass = '',
		cellClass = '',
		lastCellClass = ''
	}: Props = $props();
</script>

<Table.Root class={tableClass}>
	{#if caption}
		<Table.Caption>{caption}</Table.Caption>
	{/if}

	<Table.Header>
		<Table.Row class={rowClass}>
			{#each tableHeadings as head, i}
				<Table.Head class={i === tableHeadings.length - 1 ? lastCellClass : cellClass}>
					{head}
				</Table.Head>
			{/each}
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{#each data as item}
			<Table.Row class={rowClass}>
				{#each row(item) as value, i}
					<Table.Cell class={i === tableHeadings.length - 1 ? lastCellClass : cellClass}>
						{value}
					</Table.Cell>
				{/each}
			</Table.Row>
		{/each}
	</Table.Body>

	{#if footer}
		<Table.Footer>
			<Table.Row class={rowClass}>
				{#each footer as value, i}
					<Table.Cell class={i === tableHeadings.length - 1 ? lastCellClass : cellClass}>
						{value}
					</Table.Cell>
				{/each}
			</Table.Row>
		</Table.Footer>
	{/if}
</Table.Root>

<!-- example usage -->
<!-- <script lang="ts">
	import Table from '$lib/components/generic/table.svelte';

	const invoices = [
		{
			invoice: 'INV001',
			paymentStatus: 'Paid',
			paymentMethod: 'Credit Card',
			totalAmount: '$250.00'
		},
		{
			invoice: 'INV002',
			paymentStatus: 'Pending',
			paymentMethod: 'PayPal',
			totalAmount: '$150.00'
		},
		{
			invoice: 'INV003',
			paymentStatus: 'Unpaid',
			paymentMethod: 'Bank Transfer',
			totalAmount: '$350.00'
		}
	];

	const tableHeadings = ['Invoice', 'Status', 'Method', 'Amount'];
	const footer = ['Total', '', '', '$750.00'];

	const row = (item) => [item.invoice, item.paymentStatus, item.paymentMethod, item.totalAmount];
</script>

<Table
	data={invoices}
	{tableHeadings}
	{footer}
	{row}
	tableClass="w-full text-sm border"
	rowClass="hover:bg-gray-100"
	cellClass="px-4 py-2"
	lastCellClass="px-4 py-2 text-right font-medium"
/> -->
