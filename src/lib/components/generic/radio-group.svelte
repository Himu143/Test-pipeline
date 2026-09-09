<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';

	interface OptionItem {
		id: string;
		value: string;
		label: string;
	}

	interface Prop {
		options: Array<OptionItem>;
		value: string;
	}

	let { value = $bindable(), options = [] } : Prop = $props();
</script>

<RadioGroup.Root bind:value>
	{#each options as { label, value, id }}
		<div class="flex items-center space-x-2">
			<RadioGroup.Item value={value} {id} />
			<Label for={id}>{label}</Label>
		</div>
	{/each}
</RadioGroup.Root>
