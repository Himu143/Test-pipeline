import { axiosPriv } from './http';
import type { GenericResp } from './types';
import { PUBLIC_BASE_USER_TRAINING_API } from '$env/static/public';

class CohortService {
	// avoid double slashes when composing paths
	#BASE_URL = `${PUBLIC_BASE_USER_TRAINING_API}/cohorts/`;

	async getCohorts(): Promise<GenericResp<any>> {
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

	async createChohort(payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post(
				`${PUBLIC_BASE_USER_TRAINING_API}/cohort_with_channel/`,
				payload
			);
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

	async getCohort(id: any): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`${this.#BASE_URL}${id}`);

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

	async deleteCohort(id: any): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.delete(`${this.#BASE_URL}${id}`);
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

	async updateCohort(cohortId: any, payload: Record<string, any>): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.patch(`${this.#BASE_URL}${cohortId}`, payload);
			return { status: 'success', data };
		} catch (error) {
			return { status: 'error' };
		}
	}

	async addUsersToCohorts(cohortId: any, userIds: Array<string>): Promise<GenericResp<any>> {
		const payload = {
			user_ids: [...userIds]
		};

		try {
			const { data } = await axiosPriv.post(
				`${this.#BASE_URL}${cohortId}/members/bulk`,
				payload
			);
			return { status: 'success', data };
		} catch (error) {
			return { status: 'error' };
		}
	}

	async getCohortUsers(id: any): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`${this.#BASE_URL}${id}/members`);
			return { status: 'success', data: data };
		} catch (error) {
			return { status: 'error' };
		}
	}

	async removeUser(cohortId: any, userId: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.delete(
				`${this.#BASE_URL}${cohortId}/members/${userId}`
			);
			return { status: 'success', data: data };
		} catch (error) {
			return { status: 'error' };
		}
	}

	async userCohorts(latest = false): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(`${PUBLIC_BASE_USER_TRAINING_API}/user-cohorts/`, {
				params: latest ? { latest: true } : undefined
			});

			return { status: 'success', data: data.data };
		} catch (error) {
			return { status: 'error' };
		}
	}
}

export function getLatestCohortForumLink(cohorts: Array<Record<string, any>>): string | null {
	if (!cohorts.length) return null;

	const latestCohort = [...cohorts].sort(
		(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
	)[0];

	const channelSlug = latestCohort.channels?.[0]?.channel_slug;
	return channelSlug ? `/forum?channel=${channelSlug}` : null;
}

export const cohortService = new CohortService();
