import { extarnaResourcesService } from '$lib/services/resource-libray';
import type { Status } from '$lib/types';

class ExtarnalResourceStore {
	#resources: Array<Record<string, any>> = $state([]);

	#status: Status = $state('no-op');

	#count: number = $state(0);

	get resources() {
		return this.#resources;
	}

	get status() {
		return this.#status;
	}

	get count() {
		return this.#count;
	}

	async getResources(categorySlug: string, page = 1, searchQeury: string | null = null) {
		this.#status = 'loading';

		const resp = await extarnaResourcesService.getResourcesBySlug(
			categorySlug,
			page,
			searchQeury
		);

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#resources = resp.data;
			this.#count = resp.count ? resp.count : 0;
		} else {
			this.#status = 'error';
		}
	}

	async getAllResources() {
		this.#status = 'loading';

		const resp = await extarnaResourcesService.getAllResources();

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#resources = resp.data;
		} else {
			this.#status = 'error';
		}
	}
}

class ExtarnalResourceCategoryStore {
	#categories: Array<Record<string, any>> = $state([]);

	#status: Status = $state('no-op');

	get categories() {
		return this.#categories;
	}

	get status() {
		return this.#status;
	}

	async getAllCategories() {
		this.#status = 'loading';

		const resp = await extarnaResourcesService.getAllCategories();

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#categories = resp.data;
		} else {
			this.#status = 'error';
		}
	}
}

export const extarnalResourceStore = new ExtarnalResourceStore();
export const extarnalResourceCategoryStore = new ExtarnalResourceCategoryStore();
