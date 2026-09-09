import { axiosPriv } from './http';
import type { GenericResp } from './types';
import { PUBLIC_BASE_AUTH_URL } from '$env/static/public';

class UserService {
	async getUsers(searchQuery?: string): Promise<GenericResp<any>> {
		const params: Record<string, any> = {};

		if (searchQuery) {
			params.search = searchQuery;
		}

		try {
			// hits the public auth service for profile members
			const url = `${PUBLIC_BASE_AUTH_URL}/profile/members`;
			const { data } = await axiosPriv.get(url, {
				params: { ...params }
			});

			// API returns an array of members; normalize to { users: [...] }
			const users = Array.isArray(data) ? data : data?.data ?? [];

			return {
				status: 'success',
				data: { users }
			};
		} catch (error) {
			return {
				status: 'error'
			};
		}
	}
}

export const userService = new UserService();
