import { env } from '$env/dynamic/public';
import axios from 'axios';

export const axiosPriv = axios.create({
	baseURL: env.PUBLIC_BASE_API
});

axiosPriv.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token');

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosPriv.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (!originalRequest || originalRequest._retry) {
			return Promise.reject(error);
		}

		// Handle token refresh on 401 (Unauthorized) or 403 (Forbidden due to outdated token claims)
		if (error.response?.status === 401 || error.response?.status === 403) {
			originalRequest._retry = true;

			try {
				const refreshToken = localStorage.getItem('refresh_token');

				if (!refreshToken) {
					throw new Error('No refresh token available');
				}

				const refreshEndpoint = `${env.PUBLIC_BASE_AUTH_URL}/refresh`;

				const { data } = await axios.post(refreshEndpoint, {
					refresh_token: refreshToken
				});

				const newAccessToken = data?.access_token;

				if (!newAccessToken) {
					throw new Error('Refresh response did not include an access_token');
				}

				localStorage.setItem('access_token', newAccessToken);

				// Update header and retry original request
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

				return axiosPriv(originalRequest);
			} catch (refreshError) {
				console.error('Refresh token failed:', refreshError);

				return Promise.reject(refreshError);
			}
		}

		return Promise.reject(error);
	}
);