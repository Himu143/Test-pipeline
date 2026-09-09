import type { SimpleSignUpSchema } from '$lib/validation';
import type { SignInSchema } from '$lib/validation';
import axios, { AxiosError } from 'axios';
import type { GenericResp } from './types';
import { STORAGE_KEY } from '$lib/constatns';
import type { NewPasswordReq } from '$lib/types';
import { PUBLIC_BASE_API } from '$env/static/public';
class AuthService {
	#BASE_URL = `${PUBLIC_BASE_API}/auth/api/v1`;

	async login(payload: SignInSchema): Promise<GenericResp<any>> {
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/login`, payload);

			this.#setTokens({
				accessToken: data.access_token,
				refreshToken: data.refresh_token
			});

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;

			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}

	async signup(payload: SimpleSignUpSchema): Promise<GenericResp<any>> {
		this.#setTempEmail(payload.email);
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/register`, payload);

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;

			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}

	async verifyOtp(otp: string): Promise<GenericResp<any>> {
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/verify-email`, {
				email: this.#getTempEmail(),
				otp: otp
			});

			this.#clearTempEmail();

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;
			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}

	async resendVerificationCode(): Promise<GenericResp<any>> {
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/resend-verification-email`, {
				email: this.#getTempEmail()
			});

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;
			return {
				status: 'error'
			};
		}
	}

	#clearTempEmail() {
		localStorage.removeItem(STORAGE_KEY.USER_EMAIL_TEMP);
	}

	#setTempEmail(email: string) {
		localStorage.setItem(STORAGE_KEY.USER_EMAIL_TEMP, email);
	}

	#getTempEmail() {
		return localStorage.getItem(STORAGE_KEY.USER_EMAIL_TEMP);
	}

	async getMe(): Promise<GenericResp<any>> {
		try {
			const token = this.getAccessToken();
			const { data } = await axios.get(`${this.#BASE_URL}/me`, {
				headers: {
					Authorization: token ? `Bearer ${token}` : ''
				}
			});

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;
			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}

	#setTokens({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
		localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken);
		localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refreshToken);
	}

	#clearTokens() {
		localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN);
		localStorage.removeItem(STORAGE_KEY.REFRESH_TOKEN);
	}

	getAccessToken() {
		return localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
	}

	async logout(): Promise<{ status: 'success' | 'error' }> {
		this.#clearTokens();
		return {
			status: 'success'
		};
	}

	async forgotPassword(email: string): Promise<GenericResp<any>> {
		this.#setTempEmail(email);
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/forget-password`, { email });

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;

			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}

	async resetPassword(payload: NewPasswordReq): Promise<GenericResp<any>> {
		try {
			const { data } = await axios.post(`${this.#BASE_URL}/reset-password`, {
				otp: payload.otp,
				email: this.#getTempEmail(),
				new_password: payload.newPassword
			});

			this.#clearTempEmail();

			return {
				status: 'success',
				data: data
			};
		} catch (error) {
			const err = error as AxiosError;

			return {
				status: 'error',
				message: err.response?.data?.detail
			};
		}
	}
}

export const authService = new AuthService();
