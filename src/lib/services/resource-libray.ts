import { PUBLIC_BASE_RESOURCE_API, PUBLIC_RESOURCE_ASSET_URL } from '$env/static/public';
import { RESOURCE_PAGER } from '$lib/constatns';
import { axiosPriv } from './http';
import type { GenericResp } from './types';

type Resp = Promise<GenericResp<any>>;

export function assetUrl(id: string) {
	return `${PUBLIC_RESOURCE_ASSET_URL}/${id}`;
}

class ArticleService {
	#baseURL = `${PUBLIC_BASE_RESOURCE_API}/items/articles`;

	async getArticles(): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { status: 'published' }
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getArticle(slug: string): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { filter: { slug: slug, status: 'published' } }
			});

			const article = data.data[0];

			if (!article) {
				return {
					status: 'error',
					message: 'Article not found'
				};
			}

			return {
				status: 'success',
				data: article
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

class AudioService {
	#baseURL = `${PUBLIC_BASE_RESOURCE_API}/items/audios`;

	async getAudios(): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { status: 'published' }
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getAudio(slug: string): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { filter: { slug: slug, status: 'published' } }
			});

			const article = data.data[0];

			if (!article) {
				return {
					status: 'error',
					message: 'Article not found'
				};
			}

			return {
				status: 'success',
				data: article
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

class VidoeService {
	#baseURL = `${PUBLIC_BASE_RESOURCE_API}/items/videos`;

	async getVideos(): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { status: 'published' }
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getVideo(slug: string): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: { filter: { slug: slug, status: 'published' } }
			});

			const video = data.data[0];

			if (!video) {
				return {
					status: 'error',
					message: 'Article not found'
				};
			}

			return {
				status: 'success',
				data: video
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

class DocumentService {
	#baseURL = `${PUBLIC_BASE_RESOURCE_API}/v1/items`;

	async getVideos(): Resp {
		try {
			const { data } = await axiosPriv.get(`${this.#baseURL}/documents`, {
				params: { status: 'published' }
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getVideo(slug: string): Resp {
		try {
			const { data } = await axiosPriv.get(`${this.#baseURL}/documents`, {
				params: { filter: { slug: slug, status: 'published' } }
			});

			const document = data.data[0];

			if (!document) {
				return {
					status: 'error',
					message: 'Article not found'
				};
			}

			return {
				status: 'success',
				data: document
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

class ExtarnaResourcesService {
	#baseURL = `${PUBLIC_BASE_RESOURCE_API}/items/extarnal_resources`;

	async getResourcesBySlug(categorySlug: string, page: number, searchQuery: string | null): Resp {
		const params = {
			fields: 'id,title,link,short_description,category.*,category.translations.*,translations.*',
			filter: {
				category: {
					slug: {
						_eq: categorySlug
					}
				},
				title: {
					_istarts_with: searchQuery
				}
			}
		};

		try {
			const [resource, count] = await Promise.all([
				axiosPriv.get(this.#baseURL, {
					params: { ...params, page: page, limit: RESOURCE_PAGER.PER_PAGE }
				}),
				axiosPriv.get(this.#baseURL, {
					params: { ...params, fields: 'id', aggregate: { count: '*' } }
				})
			]);

			return {
				status: 'success',
				data: resource.data.data,
				count: parseInt(count.data.data[0].count)
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getAllResources(): Resp {
		try {
			const { data } = await axiosPriv.get(this.#baseURL, {
				params: {
					fields: 'id,title,link,short_description,category.*',
					limit: 100
				}
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return { status: 'error' };
		}
	}

	async getAllCategories(): Resp {
		const url = `${PUBLIC_BASE_RESOURCE_API}/items/resource_categories`;
		try {
			const { data } = await axiosPriv.get(url, {
				params: {
					limit: 100,
					fields: '*,translations.*'
				}
			});

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return { status: 'error' };
		}
	}
}

export const articleService = new ArticleService();
export const audioService = new AudioService();
export const videoService = new VidoeService();
export const documentService = new DocumentService();
export const extarnaResourcesService = new ExtarnaResourcesService();
