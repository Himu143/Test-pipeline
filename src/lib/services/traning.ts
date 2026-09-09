import { PUBLIC_BASE_RESOURCE_API, PUBLIC_RESOURCE_ASSET_URL } from '$env/static/public';
import { axiosPriv } from './http';
import type { GenericResp } from './types';

type Resp = Promise<GenericResp<any>>;

class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
	}
}

class TraningService {
	#BASE_URL = `${PUBLIC_BASE_RESOURCE_API}/items/training_modules`;

	async getTrainings(): Resp {
		const { data } = await axiosPriv.get(this.#BASE_URL, {
			params: { fields: 'id,sort,name,slug,short_description,feature_image,video_length,translations.*' }
		});
		try {
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

	async getTraining(slug: String): Resp {
		const { data } = await axiosPriv.get(this.#BASE_URL, {
			params: { fields: '*,resources.documents_id.*,translations.*', filter: { slug: { _eq: slug } } }
		});
		try {
			if (data.data.length > 0) {
				return {
					status: 'success',
					data: data.data[0]
				};
			} else {
				throw new NotFoundError('Not found exception');
			}
		} catch (error: unknown) {
			if (error instanceof NotFoundError) {
			}
			return {
				status: 'error'
			};
		}
	}
}

export const trainingService = new TraningService();
