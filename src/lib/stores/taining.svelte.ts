import { trainingService } from '$lib/services/traning';
import type { Status } from '$lib/types';

class TrainingStore {
	#status: Status = $state('no-op');
	#trainings: Array<any> = $state([]);

	get status() {
		return this.#status;
	}

	get trainings() {
		return this.#trainings;
	}

	async getTraining() {
		this.#status = 'loading';

		const resp = await trainingService.getTrainings();
		if (resp.status == 'success') {
			this.#status = 'success';
			this.#trainings = resp.data;
		}
	}
}

class TrainingDetailStore {
	#status: Status = $state('no-op');
	#training: Record<string, any> | null = $state(null);

	get status() {
		return this.#status;
	}

	get training() {
		return this.#training;
	}

	async getTraining(slug: string) {
		this.#status = 'loading';

		const resp = await trainingService.getTraining(slug);

		if (resp.status == 'success') {
			this.#status = 'success';
			this.#training = resp.data;
		} else {
			this.#status = 'error';
		}
	}
}

export const trainingStore = new TrainingStore();
export const trainingDetailStore = new TrainingDetailStore();
