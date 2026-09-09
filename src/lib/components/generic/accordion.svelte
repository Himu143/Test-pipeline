<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion';

	type accordionType = 'single' | 'multiple';

	interface Props {
		children: any;
		type: accordionType;
	}

	let { children, type }: Props = $props();
</script>

<main class="container mx-auto">
	<Accordion.Root {type} class="w-full">
		{@render children?.()}
	</Accordion.Root>
</main>
