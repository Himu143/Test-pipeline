import { bookmarkService } from '$lib/services/bookmark';
import type { BookMarkItem, Status } from '$lib/types';

export class BookmarkStore {
	#bookmarks: Array<BookMarkItem> = $state([]);

	#status: Status = $state('no-op');

	get bookmarks() {
		return this.#bookmarks;
	}

	get status() {
		return this.#status;
	}

	async createBookmark(params: BookMarkItem) {
		this.#bookmarks.push({
			...params
		});

		const resp = await bookmarkService.createBookmark(params);
		this.#getBookmarks({ loading: false });
	}

	async #getBookmarks({ loading = false }) {
		if (loading) {
			this.#status = 'loading';
		}

		const resp = await bookmarkService.getBookmarks();

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#bookmarks = resp.data;
		}
	}

	async getBookmarks() {
		this.#getBookmarks({ loading: true });
	}

	async deleteBookmark(id: string) {
		this.#bookmarks = this.bookmarks.filter((item) => item.item_id != id);
		bookmarkService.deleteBookmark(id);
	}
}

export const bookmarkStore = new BookmarkStore();
