import { forumService } from '$lib/services/forum';
import type { Status } from '$lib/types';

class ForumUserActivityStore {
	#status: Status = $state('no-op');
	#atvities: Array<any> = $state([]);

	get status() {
		return this.#status;
	}

	get atvities() {
		return this.#atvities;
	}

	async getActivities(channelId?: string) {
		const resp = await forumService.getUserActivities(channelId);

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#atvities = resp.data;
		} else {
			this.#status = 'no-op';
		}
	}
}

export const forumUserActivityStore = new ForumUserActivityStore();
