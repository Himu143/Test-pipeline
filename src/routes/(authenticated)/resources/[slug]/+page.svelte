<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Search, ChevronRight, ChevronLeft, ChevronUpIcon } from 'lucide-svelte';
	import { ArrowRight, Bookmark, MoveRight } from '@lucide/svelte';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import SupportSection from '$lib/components/app/support-section.svelte';
	import { m } from '$lib/paraglide/messages';
	import {
		extarnalResourceCategoryStore,
		extarnalResourceStore
	} from '$lib/stores/extarnal-resource.svelte';
	import { page } from '$app/state';
	import { BOOKMARK_EXTARNAL_KEY, RESOURCE_PAGER } from '$lib/constatns';
	import { goto } from '$app/navigation';
	import { debounce } from '$lib/services/utils';
	import ContentBookmark from '$lib/components/app/content-bookmark.svelte';
	import {
		getExtaranlResourceCategoryLocale,
		getResourceCategoryLocale,
		slugify
	} from '$lib/utils';
	import { getLocale } from '$lib/paraglide/runtime';

	let searchInput: HTMLInputElement;

	function imageUrl(link: string) {
		if (link.includes('nih.gov')) {
			return '/images/resources/details/nih-details.png';
		}

		if (link.includes('cdc.gov')) {
			return '/images/resources/details/cdc-details.png';
		}
	}

	let query = $state('');
	let currentPage = $state(1);

	$effect(() => {
		let p = page.url.searchParams.get('page') || '1';
		let q = page.url.searchParams.get('search') || null;
		if (page.params.slug && p) {
			extarnalResourceStore.getResources(page.params.slug, parseInt(p), q);
		}
	});

	const category = $derived.by(() => {
		const c = extarnalResourceCategoryStore.categories.find(
			(item) => item.slug == page.params.slug
		);

		return c;
	});

	const search = debounce(async (value: string) => {
		const params = new URLSearchParams(page.url.searchParams);

		if (value.trim()) {
			params.set('search', value);
			params.set('page', '1');
		} else {
			params.delete('search');
			params.set('page', '1');
		}

		await goto(`${page.url.pathname}?${params.toString()}`, {
			replaceState: true,
			noScroll: true,
			keepFocus: true
		});

		searchInput?.focus();
	});

	function handerSearchInput(e) {
		const query = e.target.value;
		search(query);
	}

	let isFirstRender = true;

	const currengLang = $derived.by(() => {
		return getLocale();
	});

	$effect(() => {
		currentPage;
		if (isFirstRender) {
			isFirstRender = false;
			return;
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	function getLocaleByProperty(propertyName: string, resource: Record<string, any>) {
		return getExtaranlResourceCategoryLocale(currengLang, propertyName, resource);
	}
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
	<div
		class="flex flex-col-reverse items-center gap-12 pt-16 sm:pt-28 md:pt-40 lg:flex-row lg:justify-between xl:items-start 2xl:gap-36"
	>
		<div class="flex w-full flex-col gap-6 xl:gap-16">
			<header class="flex flex-col justify-between gap-6 md:gap-16 lg:flex-row lg:items-end">
				<div class="flex w-full max-w-full flex-col gap-3 lg:w-auto lg:max-w-156">
					<p
						class="font-poppins text-base leading-8 font-medium text-black sm:text-lg lg:text-xl"
					>
						{m.resources_details_sub()}
					</p>
					<h1
						class="font-baskerville text-4xl leading-tight font-bold text-black sm:text-5xl lg:text-[60px] lg:leading-16"
					>
						{category
							? getResourceCategoryLocale(currengLang, 'name', category)
							: category?.name}
					</h1>
				</div>

				<p
					class="w-full max-w-full font-poppins text-base leading-7 font-normal text-secondary-black sm:text-lg lg:w-auto lg:max-w-177"
				>
					{category
						? getResourceCategoryLocale(currengLang, 'description', category)
						: category?.description}
				</p>
			</header>

			<div class="flex flex-col gap-8 lg:gap-11">
				<div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
					<div class="font-poppins">
						<span
							class="text-lg leading-9 font-medium text-black sm:text-xl lg:text-2xl"
							>{m.resources_details_all_resources()} |
						</span>
						<span
							class="text-base leading-9 font-medium text-gray-500 sm:text-lg lg:text-xl"
						>
							{m.resources_details_total()} : {extarnalResourceStore.count}
							{m.resources_details_resource()}
						</span>
					</div>

					<div class="relative w-full sm:w-auto sm:max-w-180">
						<Search
							class="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-gray-400 sm:h-6 sm:w-6"
						/>
						<!-- svelte-ignore attribute_quoted -->
						<Input
							bind:this={searchInput}
							bind:value={query}
							oninput={handerSearchInput}
							type="search"
							placeholder={m.resources_details_input_placeholder()}
							class="h-12 rounded-lg border border-gray-300 bg-transparent pr-6 pl-12 font-inter text-base leading-6 text-black placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-gray-400 sm:h-14 sm:pl-14 sm:text-lg lg:h-16 lg:text-2xl xl:min-w-178"
						/>
					</div>
				</div>

				<!-- Resources List -->
				<!-- <div class="flex flex-col gap-6">
					{#each extarnalResourceStore.resources as item}
						{@render resourceCard(item)}
					{/each}
				</div> -->
				<div class="flex flex-col gap-6">
					{#if extarnalResourceStore.resources.length}
						{#each extarnalResourceStore.resources as item}
							{@render resourceCard(item)}
						{/each}
					{:else}
						<div
							class="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"
						>
							<Search class="mb-4 h-12 w-12 text-gray-400" />

							<h3 class="font-poppins text-2xl font-semibold text-black">
								No Resources Found
							</h3>

							<p class="mt-2 max-w-md font-poppins text-lg text-neutral-600">
								We couldn't find any resources matching your search. Try a different
								keyword or browse another category.
							</p>
						</div>
					{/if}
				</div>

				<!-- Pagination -->
				<div class="flex items-center justify-center pt-4">
					<Pagination.Root
						count={extarnalResourceStore.count}
						perPage={RESOURCE_PAGER.PER_PAGE}
						bind:page={currentPage}
						onPageChange={(val) => goto(`${page.url.pathname}?page=${val}`)}
					>
						{#snippet children({ pages, currentPage })}
							<Pagination.Content>
								<Pagination.Item>
									<Pagination.PrevButton />
								</Pagination.Item>
								{#each pages as page (page.key)}
									{#if page.type == 'ellipsis'}
										<Pagination.Item>
											<Pagination.Ellipsis />
										</Pagination.Item>
									{:else}
										<Pagination.Item>
											<Pagination.Link
												{page}
												isActive={currentPage == page.value}
											>
												{page.value}
											</Pagination.Link>
										</Pagination.Item>
									{/if}
								{/each}
								<Pagination.Item>
									<Pagination.NextButton />
								</Pagination.Item>
							</Pagination.Content>
						{/snippet}
					</Pagination.Root>
				</div>
			</div>
		</div>
	</div>
</section>

{#snippet resourceCard(item: Record<string, any>)}
	<article
		class="relative w-full overflow-hidden rounded-2xl bg-white outline -outline-offset-2 outline-neutral-200"
	>
		<div class="relative flex flex-col gap-6 p-6 lg:flex-row lg:gap-8">
			<!-- Left image block -->
			<div class="shrink-0 rounded-[10px] bg-amber-200 p-7 lg:h-72 lg:w-72 lg:py-16">
				<img
					class="h-36 w-full rounded-[10px] object-cover lg:h-36 lg:w-56"
					src={imageUrl(item.link)}
					alt={item.title}
					loading="lazy"
				/>
			</div>

			<!-- Right content -->
			<div class="flex min-w-0 flex-1 flex-col gap-7">
				<!-- Top row: tag + bookmark -->
				<div class="flex flex-wrap items-center justify-between gap-4 sm:items-start">
					<div
						class="inline-flex h-10 items-center justify-center rounded-2xl bg-amber-200/30 px-4 py-1.5 outline -outline-offset-1 outline-amber-200"
					>
						<span class="font-poppins text-xl font-medium text-neutral-700">
							{getResourceCategoryLocale(currengLang, 'name', item.category)}
						</span>
					</div>

					<!-- <button
						type="button"
						class="group inline-flex items-center gap-2 rounded-[35px] bg-white px-4 py-3 outline -outline-offset-1 outline-amber-400 transition"
						aria-label={m.resources_details_bookmark()}
					>
						<span class="font-inter text-xl leading-5 font-medium text-black">
							{m.resources_details_bookmark()}
						</span>

						<span class="relative grid h-10 w-10 place-items-center overflow-hidden">
							<span
								class="absolute inset-[0.77px] rounded-full border border-amber-400 transition hover:bg-amber-400 hover:opacity-20"
							></span>
							<Bookmark class="h-5 w-5 text-solid-primary" fill="currentColor" />
						</span>
					</button> -->

					<ContentBookmark
						item={{
							item_id: item.id,
							item_type: BOOKMARK_EXTARNAL_KEY,
							slug: slugify(item.title),
							title: item.title
						}}
					/>
				</div>

				<!-- Title + description + CTA -->
				<div class="flex flex-col gap-6">
					<h2 class="font-poppins text-3xl font-semibold text-black">
						<!-- {item.title} -->
						{item ? getLocaleByProperty('title', item) : item?.title}
					</h2>

					<div
						class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
					>
						<p
							class="line-clamp-4 max-w-230 font-poppins text-xl font-normal text-neutral-700"
						>
							<!-- {item.short_description} -->
							{item
								? getLocaleByProperty('short_description', item)
								: item?.short_description}
						</p>

						<!-- svelte-ignore a11y_invalid_attribute -->
						<!-- <a
							href="#"
							class="inline-flex h-14 items-center justify-center gap-3.5 rounded-[35px] px-8 outline -outline-offset-1 outline-amber-400 transition hover:bg-amber-50"
						>
							<span class="font-inter text-xl font-medium leading-5 text-black">
								Read More
							</span>
							<ChevronRight class="h-6 w-6 text-black" />
						</a> -->
						<Button
							href={item.link}
							target="_blank"
							size="lg"
							class="flex gap-4 px-8! text-black hover:bg-solid-primary 2xl:px-20! {item.isCdc
								? 'bg-primary'
								: 'border border-primary bg-white'}"
						>
							{m.resources_details_read_more()}
							<ArrowRight class="h-6 w-6 text-black" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	</article>
{/snippet}

<SupportSection />
