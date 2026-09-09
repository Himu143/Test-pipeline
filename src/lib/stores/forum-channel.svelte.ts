import { forumService } from '$lib/services/forum';
import type { ForumChannel, Status } from '$lib/types';
import { slugify } from '$lib/utils';
import axios from 'axios';

class ForumChannelsStore {
	#channels: Array<ForumChannel> = $state([]);

	#status: Status = $state('no-op');

	#createStatus: Status = $state('no-op');

	get channes() {
		return this.#channels;
	}

	get status() {
		return this.#status;
	}

	get createStatus() {
		return this.#createStatus;
	}

	get firstChannel() {
		if (this.#channels.length > 0) {
			return this.#channels[0];
		}
	}

	getActiveChannel(slug: string) {
		const index = this.#channels.findIndex((el) => el.slug == slug);

		if (index > -1) {
			return this.#channels[index];
		}
	}

	async getChannels() {
		this.#status = 'loading';

		const resp = await forumService.getChannels();
		if (resp.status == 'success') {
			this.#status = 'success';
			this.#channels = resp.data.data;
		} else {
			this.#status = 'error';
		}
	}

	async createChannel(payload: Record<string, any>): Promise<{ status: 'success' | 'error' }> {
		this.#createStatus = 'loading';

		const resp = await forumService.createChannel(payload);

		if (resp.status == 'success') {
			this.#channels.push(resp.data);
			return {
				status: 'success'
			};
		} else {
			return {
				status: 'error'
			};
		}
	}

	updateChannel(channel: ForumChannel) {
		this.#channels = this.#channels.map((item) => {
			if (item.id == channel.id) {
				return channel;
			}

			return item;
		});
	}

	removeChannelSync(id: string) {
		this.#channels = this.#channels.filter((item) => item.id != id);
	}
}

class ForumChannelDetailStore {
	#channel: ForumChannel | undefined = $state();

	#status: Status = $state('no-op');

	#editStatus: Status = $state('no-op');

	#channelsStore: ForumChannelsStore;

	constructor(forumChannelStore: ForumChannelsStore) {
		this.#channelsStore = forumChannelStore;
	}

	get channes() {
		return this.#channel;
	}

	get status() {
		return this.#status;
	}

	get editStatus() {
		return this.#editStatus;
	}

	async getChannel(slug: string) {
		this.#status = 'loading';

		const resp = await forumService.getChannel(slug);

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#channel = resp.data;
		} else {
			this.#status = 'error';
		}
	}

	async editChannel(payload: ForumChannel) {
		this.#editStatus = 'loading';

		const resp = await forumService.editChannels(payload);

		if (resp.status == 'success') {
			this.#channelsStore.updateChannel(resp.data);
			this.#editStatus = 'success';
		} else {
			this.#editStatus = 'error';
		}
	}

	async deleteChannel(id: string): Promise<{ status: 'success' | 'error' }> {
		this.#editStatus = 'loading';

		try {
			const { data } = await axios.delete(`/api/forum/channels/id}`);

			this.#status = 'success';
			this.#channelsStore.removeChannelSync(id);

			return {
				status: 'success'
			};
		} catch (error) {
			this.#status = 'error';
			return {
				status: 'error'
			};
		}
	}
}

class ForumChannelCategoryStore {
	#status: Status = $state('no-op');

	#categories: Array<any> = $state([]);

	get status() {
		return this.#status;
	}

	get categories() {
		return this.#categories;
	}

	async getCategories(channelId: string) {
		this.#status = 'loading';

		const resp = await forumService.getChannelCategories(channelId);

		if (resp.status == 'success') {
			this.#categories = resp.data;
			this.#status = 'success';
		} else {
			this.#status = 'error';
		}
	}
}

class FourmChannelUserStore {
	#status: Status = $state('no-op');
	#users: Array<any> = $state([]);

	get status() {
		return this.#status;
	}

	get users() {
		return this.#users;
	}

	// async getUsers(id: any) {
	// 	const resp = await cohortService.getCohortUsers(id);
	// 	if (resp.status == 'success') {
	// 		this.#users = resp.data.user_ids;
	// 	}
	// }

	async addUsers(
		channelId: any,
		userIds: Array<string>
	): Promise<{ status: 'success' | 'error' }> {
		const resp = await forumService.addUsersToChannel(channelId, userIds);
		if (resp.status == 'success') {
			return { status: 'success' };
		} else {
			return { status: 'error' };
		}
	}
}

export const forumChannelStore = new ForumChannelsStore();

export const forumChannelDetailStore = new ForumChannelDetailStore(forumChannelStore);

export const forumChannelCategoryStore = new ForumChannelCategoryStore();

export const fourmChannelUserStore = new FourmChannelUserStore();
