<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';

	interface Link {
		title: string;
		href: string;
	}

	let { links }: { links: Array<Link> } = $props();
</script>

{#snippet showArrowIfNotLast(len: number, index: number)}
	{#if len != index + 1}
		<Breadcrumb.Separator class="hidden md:block" />
	{/if}
{/snippet}

{#snippet breadCrumbItem(href: string, title: string)}
	<Breadcrumb.Item class="hidden md:block">
		<Breadcrumb.Link {href}>{title}</Breadcrumb.Link>
	</Breadcrumb.Item>
{/snippet}

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each links as link, index}
			{@render breadCrumbItem(link.href, link.title)}
			{@render showArrowIfNotLast(links.length, index)}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>
