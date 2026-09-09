import { slugify } from '$lib/utils';
import { axiosPriv } from './http';
import type { GenericResp } from './types';

import { v4 as uuidv4 } from 'uuid';

type CommentParams =
	| {
			type: 'approved';
			postId: string;
	  }
	| { type: 'rejected' }
	| { type: 'pending' };

type PostParams =
	| {
			type: 'approved';
			channelSlug: string;
			categorySlug?: string;
			nextCursor?: string | null;
			userId?: string;
	  }
	| { type: 'pending' }
	| { type: 'rejected' };

export const forumService = {
	async getChannels(): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get('/forum/api/v1/channels');
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getChannel(id: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`/forum/api/v1/channels/${id}`);
			return {
				status: 'success',
				data: {
					...data,
					slug: slugify(data.name)
				}
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async createChannel(payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post('/forum/api/v1/channels', {
				...payload,
				id: uuidv4()
			});
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async editChannels(payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.put(`/forum/api/v1/channels/${payload.id}`, payload);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getPosts(params: PostParams): Promise<GenericResp<any>> {
		let url = '/forum/api/v1/posts';
		let queryParams: Record<string, any> = { limit: 5 };
		if (params.type == 'pending') {
			url = url + '/pending';
		}

		if (params.type == 'rejected') {
			url = url + '/rejected';
		}

		if (params.type == 'approved') {
			queryParams['channel_slug'] = params.channelSlug;
			queryParams['cursor'] = params.nextCursor;

			if (params.categorySlug) {
				queryParams['category_slug'] = params.categorySlug;
			}
			if (params.userId) {
				queryParams['user_id'] = params.userId;
			}
		}

		try {
			const { data } = await axiosPriv.get(url, { params: queryParams });
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async createPost(payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post('/forum/api/v1/posts', payload);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async postApprove(payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post('/forum/api/v1/approve', payload);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getPost(id: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`/forum/api/v1/posts/${id}`);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async createComment(postId: string, payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post('/forum/api/v1/posts', {
				...payload,
				parent_id: postId,
				channel_id: payload.channelId
			});

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getComments(params: CommentParams): Promise<GenericResp<any>> {
		let url = '/forum/api/v1/comments';

		let queryParams: Record<string, any> = {};

		if (params.type == 'pending') {
			url = url + '/pending';
		} else if (params.type == 'rejected') {
			url = url + '/rejected';
		} else if (params.type == 'approved') {
			queryParams['post_id'] = params.postId;
		}

		try {
			const { data } = await axiosPriv.get(url, {
				params: queryParams
			});
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async likePost(postId: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post(`/forum/api/v1/posts/care/${postId}`);
			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getChannelCategories(channelId: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`/forum/api/v1/channels/${channelId}/categories`);
			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	},

	async getUserActivities(channelId?: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get('/forum/api/v1/user-activities', {
				params: channelId ? { channel_id: channelId } : undefined
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
	},

	async addUsersToChannel(channelId: any, userIds: Array<string>): Promise<GenericResp<any>> {
		const payload = {
			user_ids: [...userIds]
		};

		try {
			const { data } = await axiosPriv.post(
				`/forum/api/v1/channels/${channelId}/access/bulk/`,
				payload
			);
			return { status: 'success', data };
		} catch (error) {
			return { status: 'error' };
		}
	}
};
