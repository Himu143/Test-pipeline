import { axiosPriv } from './http';
import type { GenericResp } from './types';
import { PUBLIC_BASE_USER_TRAINING_API } from '$env/static/public';

class UserTrainingService {
	#BASE_URL = `${PUBLIC_BASE_USER_TRAINING_API}/user-training/`;

	async getUserTrainings(): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.get(this.#BASE_URL);

			return {
				status: 'success',
				data: data.data
			};
		} catch (error) {
			return { status: 'error' };
		}
	}

	async createUserTraining(id: number): Promise<GenericResp<any>> {
		try {
			const { data } = await axiosPriv.post(this.#BASE_URL, {
				training_id: id
			});

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			return { status: 'error' };
		}
	}
}

export const userTrainingService = new UserTrainingService();
