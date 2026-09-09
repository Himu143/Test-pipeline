import type { BookMarkItem } from '$lib/types';
import { axiosPriv } from './http';
import type { GenericResp } from './types';
import { PUBLIC_BASE_BOOKMARK_API } from '$env/static/public';

class BookmarkService {
	#BASE_URL = `${PUBLIC_BASE_BOOKMARK_API}/bookmarks/`;

	async createBookmark(payload: BookMarkItem): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post(this.#BASE_URL, payload);

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}

	async getBookmarks(): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(this.#BASE_URL);

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

	async deleteBookmark(itemId: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.delete(`${this.#BASE_URL}/${itemId}`);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

export const bookmarkService = new BookmarkService();
