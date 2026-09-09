import { cohortService } from '$lib/services/cohort';
import type { Status } from '$lib/types';

class CohortStore {
	#status: Status = $state('no-op');
	#cohorts: Array<any> = $state([]);

	get status() {
		return this.#status;
	}

	get cohorts() {
		return this.#cohorts;
	}

	async getCohorts() {
		const resp = await cohortService.getCohorts();
		if (resp.status == 'success') {
			this.#cohorts = resp.data;
		}
	}

	async createChohort(payload: Record<string, any>): Promise<{ status: 'success' | 'error' }> {
		const resp = await cohortService.createChohort(payload);
		if (resp.status == 'success') {
			await this.getCohorts();
			return {
				status: 'success'
			};
		} else {
			return {
				status: 'error'
			};
		}
	}

	updateCohort(cohort: Record<string, any>) {
		this.#cohorts = this.#cohorts.map((item) =>
			item.id === cohort.id ? { ...item, ...cohort } : item
		);
	}

	removeCohort(id) {
		this.#cohorts = this.#cohorts.filter((item) => item.id != id);
	}
}

class CohortDetailStore {
	#status: Status = $state('no-op');
	#cohort: Record<string, any> | null = $state(null);

	get status() {
		return this.#status;
	}

	get cohort() {
		return this.#cohort;
	}

	async getCohort(id: any) {
		const resp = await cohortService.getCohort(id);
		if (resp.status == 'success') {
			this.#cohort = resp.data;
		}
	}

	async deleteCohort(id: any): Promise<{ status: 'success' | 'error' }> {
		const resp = await cohortService.deleteCohort(id);
		if (resp.status == 'success') {
			cohortStore.removeCohort(id);
			return { status: 'success' };
		} else {
			return { status: 'error' };
		}
	}

	async updateCohort(
		id: any,
		payload: Record<string, any>
	): Promise<{ status: 'success' | 'error' }> {
		const resp = await cohortService.updateCohort(id, payload);
		if (resp.status == 'success') {
			this.#cohort = resp.data;

			// Keep the cohort list/sidebar in sync
			cohortStore.updateCohort(resp.data);

			return { status: 'success' };
		} else {
			return { status: 'error' };
		}
	}
}

class CohortUserStore {
	#status: Status = $state('no-op');
	#users: Array<any> = $state([]);
	#addUserStatus: Status = $state('no-op');
	#removeUserStatus: Status = $state('no-op');
	#userCohorts: Array<any> = $state([]);
	#userCohortsStatus: Status = $state('no-op');

	get status() {
		return this.#status;
	}

	get addUserStatus() {
		return this.#addUserStatus;
	}

	get removeUserStatus() {
		return this.#removeUserStatus;
	}

	get users() {
		return this.#users;
	}

	get userCohorts() {
		return this.#userCohorts;
	}

	get userCohortsStatus() {
		return this.#userCohortsStatus;
	}

	async getUsers(id: any) {
		const resp = await cohortService.getCohortUsers(id);
		if (resp.status == 'success') {
			this.#users = resp.data.users;
		}
	}

	async addUsers(
		cohortId: any,
		userIds: Array<string>
	): Promise<{ status: 'success' | 'error' }> {
		this.#addUserStatus = 'loading';
		const resp = await cohortService.addUsersToCohorts(cohortId, userIds);
		if (resp.status == 'success') {
			await this.getUsers(cohortId);
			await this.getUserCohorts(true);
			this.#addUserStatus = 'success';
			return { status: 'success' };
		} else {
			this.#addUserStatus = 'error';
			return { status: 'error' };
		}
	}

	async removeUser(cohortId: any, userid: string) {
		this.#removeUserStatus = 'loading';
		const resp = await cohortService.removeUser(cohortId, userid);

		if (resp.status == 'success') {
			this.#users = this.#users.filter((item) => item.auth_id != userid);
			await this.getUserCohorts(true);
			this.#removeUserStatus = 'success';
		}
	}

	async getUserCohorts(silent = false) {
		if (!silent) {
			this.#userCohortsStatus = 'loading';
		}

		const resp = await cohortService.userCohorts();
		if (resp.status == 'success') {
			this.#userCohorts = resp.data;
			this.#userCohortsStatus = 'success';
		} else {
			this.#userCohortsStatus = 'error';
		}
	}
}

export const cohortStore = new CohortStore();
export const cohortDetailStore = new CohortDetailStore();
export const cohortUserStore = new CohortUserStore();
