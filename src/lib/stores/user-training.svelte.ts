import { userTrainingService } from '$lib/services/user-training';
import type { Status } from '$lib/types';

class UserTrainginStore {
	#status: Status = $state('no-op');
	#userTrainings: any[] = $state([]);

	get status() {
		return this.#status;
	}

	get userTrainings() {
		return this.#userTrainings;
	}

	async getUserTrainings() {
		const resp = await userTrainingService.getUserTrainings();

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#userTrainings = resp.data;
		} else {
			this.#status = 'error';
		}
	}

	async createUserTraining(id: number) {
		const resp = await userTrainingService.createUserTraining(id);

		if (resp.status == 'success') {
			this.getUserTrainings();
		}
	}
}

export const userTrainingStore = new UserTrainginStore();
