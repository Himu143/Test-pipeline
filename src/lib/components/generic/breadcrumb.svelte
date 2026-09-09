<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	type dropdownContentAlignType = 'start' | 'center' | 'end';

	interface Props {
		homePage?: { label: string; href?: string } | null;
		dropdownItems?: { label: string; href: string }[];
		prevPage?: { label: string; href?: string } | null;
		currentPage?: string;
		breadcrumbListStyle?: string;
		breadcrumbElipsisStyle?: string;
		dropdownItemsStyle?: string;
		dropdownTriggerTextStyle?: string;
		dropdownContentAlign?: dropdownContentAlignType;
	}

	let {
		dropdownItems = [],
		prevPage = null,
		currentPage = '',
		homePage = null,
		breadcrumbListStyle,
		breadcrumbElipsisStyle,
		dropdownItemsStyle,
		dropdownContentAlign = 'start',
		dropdownTriggerTextStyle
	}: Props = $props();
</script>

<Breadcrumb.Root>
	<Breadcrumb.List class={`${breadcrumbListStyle}`}>
		<!-- Home link -->
		{#if homePage}
			<Breadcrumb.Item>
				{#if homePage.href}
					<Breadcrumb.Link href={homePage.href}>{homePage.label}</Breadcrumb.Link>
				{:else}
					<Breadcrumb.Page>{homePage.label}</Breadcrumb.Page>
				{/if}
			</Breadcrumb.Item>
		{/if}
		{#if dropdownItems.length}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class={`flex items-center gap-1 ${dropdownTriggerTextStyle}`}>
						<Breadcrumb.Ellipsis class={`size-4 ${breadcrumbElipsisStyle}`} />
						<span class="sr-only">Toggle menu</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align={dropdownContentAlign}>
						{#each dropdownItems as item}
							<DropdownMenu.Item>
								<a href={item.href} class={`flex w-full ${dropdownItemsStyle}`}>
									{item.label}
								</a>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Breadcrumb.Item>
		{/if}

		{#if prevPage}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				{#if prevPage.href}
					<Breadcrumb.Link href={prevPage.href}>{prevPage.label}</Breadcrumb.Link>
				{:else}
					<Breadcrumb.Page>{prevPage.label}</Breadcrumb.Page>
				{/if}
			</Breadcrumb.Item>
		{/if}

		{#if currentPage}
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>{currentPage}</Breadcrumb.Page>
			</Breadcrumb.Item>
		{/if}
	</Breadcrumb.List>
</Breadcrumb.Root>
