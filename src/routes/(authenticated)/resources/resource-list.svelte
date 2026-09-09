<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { assetUrl } from '$lib/services/resource-libray';
	import { extarnalResourceCategoryStore } from '$lib/stores/extarnal-resource.svelte';
	import { getResourceCategoryLocale } from '$lib/utils';

	const currengLang = $derived.by(() => {
		return getLocale();
	});

	function getLocaleByProperty(propertyName: string, training: Record<string, any>) {
		return getResourceCategoryLocale(currengLang, propertyName, training);
	}
</script>

<div class="mt-16 sm:mt-20 lg:mt-28">
	<div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
		{#each extarnalResourceCategoryStore.categories as item (item)}
			<a
				href={`/resources/${item.slug}`}
				class=" h-full rounded-2xl border border-primary p-6"
			>
				<div class="flex h-full flex-col items-center justify-center gap-6 text-center">
					<div class="bg-warning/40 rounded-full p-3">
						<img
							src={assetUrl(item.image)}
							alt=""
							class="h-12 w-12 2xl:h-16 2xl:w-16"
							loading="lazy"
						/>
					</div>

					<div class="space-y-3">
						<h3 class="font-poppins text-2xl leading-normal font-semibold 2xl:text-3xl">
							{getLocaleByProperty('name', item)}
						</h3>
						<p
							class="max-w-113 font-poppins text-sm leading-normal font-normal text-secondary-black sm:text-xl 2xl:text-2xl"
						>
							{getLocaleByProperty('description', item)}
							<!-- {item.description} -->
						</p>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
