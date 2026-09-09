import { forumService } from '$lib/services/forum';
import type { ForumComment, ForumPost, Status } from '$lib/types';
import axios from 'axios';

class ForumPostStore {
	#posts: Array<ForumPost> = $state([]);

	#status: Status = $state('no-op');

	#createStatus: Status = $state('no-op');

	#loadMoreStatus: Status = $state('no-op');

	#nextCursor: string | null = $state(null);

	get status() {
		return this.#status;
	}

	get posts() {
		return this.#posts;
	}

	get createStatus() {
		return this.#createStatus;
	}

	get loadMoreStatus() {
		return this.#loadMoreStatus;
	}

	get nextCursor() {
		return this.#nextCursor;
	}

	async getPosts(channelSlug: string, categorySlug?: string, userId?: string) {
		this.#status = 'loading';

		const resp = await forumService.getPosts({
			type: 'approved',
			channelSlug: channelSlug,
			categorySlug: categorySlug,
			userId: userId
		});

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#posts = resp.data.data;
			this.#nextCursor = resp.data.next_cursor;
		} else {
			this.#status = 'error';
		}
	}

	async createPost(payload: { header: string; content: string; channel_id: string }) {
		this.#createStatus = 'loading';

		const resp = await forumService.createPost(payload);

		if (resp.status == 'success') {
			this.#createStatus = 'success';
		} else {
			this.#createStatus = 'error';
		}

		return { status: this.#createStatus };
	}

	async loadMorePost(channelSlug: string, categorySlug?: string, 	userId?: string) {
		this.#loadMoreStatus = 'loading';

		const resp = await forumService.getPosts({
			type: 'approved',
			channelSlug: channelSlug,
			nextCursor: this.#nextCursor,
			categorySlug: categorySlug,
			userId: userId
		});

		if (resp.status == 'success') {
			this.#posts.push(...resp.data.data);
			this.#loadMoreStatus = 'success';
			this.#nextCursor = resp.data.next_cursor;
		} else {
			this.#loadMoreStatus = 'error';
		}
	}

	async likePost(postId: string) {
		const resp = await forumService.likePost(postId);

		if (resp.status == 'success') {
			const updated = resp.data?.data ?? resp.data;

			this.#posts = this.#posts.map((item) => {
				if (postId == item.id) {
					const merged: any = { ...item };
					if (updated && typeof updated === 'object') {
						for (const key of Object.keys(updated)) {
							const val = (updated as any)[key];
							if (val !== undefined && val !== null) merged[key] = val;
						}
					}
					return merged as ForumPost;
				}

				return item;
			});
		}
	}
}

class FormPostDetailStore {
	#post: ForumPost | null = $state(null);

	#status: Status = $state('no-op');

	get post() {
		return this.#post;
	}

	get status() {
		return this.#status;
	}

	async getPost(id: string) {
		this.#status = 'loading';

		const resp = await forumService.getPost(id);

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#post = resp.data;
		} else {
			this.#status = 'error';
		}
	}

	async likePost(postId: string) {
		const resp = await forumService.likePost(postId);

		if (resp.status == 'success') {
			const updated = resp.data?.data ?? resp.data;
			if (updated && typeof updated === 'object') {
				const merged: any = { ...(this.#post as any) };
				for (const key of Object.keys(updated)) {
					const val = (updated as any)[key];
					if (val !== undefined && val !== null) merged[key] = val;
				}
				this.#post = merged;
			} else {
				this.#post = resp.data;
			}
		}
	}
}

class ForumCommentsStore {
	#comments: Array<ForumComment> = $state([]);

	#status: Status = $state('no-op');

	get comments() {
		return this.#comments;
	}

	get status() {
		return this.#status;
	}

	async getCommnets(postId: string) {
		this.#status = 'loading';

		const resp = await forumService.getComments({ type: 'approved', postId: postId });
		if (resp.status == 'success') {
			this.#comments = resp.data.data;
			this.#status = 'success';
		} else {
			this.#status = 'error';
		}
	}

	async createComment(
		postId: string,
		payload: { content: string; channelId?: string }
	): Promise<{ status: 'success' | 'error' }> {
		const resp = await forumService.createComment(postId, payload);

		if (resp.status == 'success') {
			return { status: 'success' };
		} else {
			return { status: 'error' };
		}
	}
}

class ForumManagerPostStore {
	#status: Status = $state('no-op');

	#posts: Array<ForumPost> = $state([]);

	get status() {
		return this.#status;
	}

	get posts() {
		return this.#posts;
	}

	async getPosts(postType: 'pending' | 'rejected') {
		this.#status = 'loading';

		const resp = await forumService.getPosts({ type: postType });

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#posts = resp.data.data;
		} else {
			this.#status = 'error';
		}
	}

	async approve(id: string) {
		const resp = await forumService.postApprove({ post_id: id, approve: true });
		if (resp.status == 'success') {
			this.#posts = this.#posts.filter((item) => item.id != id);
		}
	}

	async reject(id: string) {
		const resp = await forumService.postApprove({ post_id: id, approve: false });
		if (resp.status == 'success') {
			this.#posts = this.#posts.filter((item) => item.id != id);
		}
	}
}

class ForumManagerCommentStore {
	#status: Status = $state('no-op');

	#comments: Array<ForumPost> = $state([]);

	get status() {
		return this.#status;
	}

	get comments() {
		return this.#comments;
	}

	async getComments(commnetType: string) {
		this.#status = 'loading';

		const resp = await forumService.getComments({ type: commnetType });

		if (resp.status == 'success') {
			this.#comments = resp.data.data;
			this.#status = 'success';
		} else {
			this.#status = 'error';
		}
	}

	async approve(id: string) {
		const resp = await forumService.postApprove({ post_id: id, approve: true });

		if (resp.status == 'success') {
			this.#comments = this.#comments.filter((item) => item.id != id);
		}
	}

	async reject(id: string) {
		const resp = await forumService.postApprove({ post_id: id, approve: false });

		if (resp.status == 'success') {
			this.#comments = this.#comments.filter((item) => item.id != id);
		}
	}
}

export const forumPostStore = new ForumPostStore();

export const forumPostDetailStore = new FormPostDetailStore();

export const forumCommentsStore = new ForumCommentsStore();

export const forumManagerPostStore = new ForumManagerPostStore();

export const forumManagerCommentStore = new ForumManagerCommentStore();
