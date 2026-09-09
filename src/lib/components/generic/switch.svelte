<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		labelText: string;
		labelClass: string;
		switchClass: string;
	}

	let { id, labelText, labelClass, switchClass }: Props = $props();
</script>

<div class="flex items-center space-x-2">
	<Switch {id} class={switchClass} />
	<Label for={id} class={labelClass}>{labelText}</Label>
</div>
