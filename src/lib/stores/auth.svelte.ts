import type { SignInSchema, SimpleSignUpSchema } from '$lib/validation';
import type { NewPasswordReq, Status } from '$lib/types';
import { authService } from '$lib/services/auth';

type AuthStatus = Status | 'email-noverify-error';
type Resp = Promise<{ status: 'success' } | { status: 'error'; message?: string }>;

class AuthStore {
	#signInState = $state<{ status: AuthStatus; errorMessage?: string }>({ status: 'no-op' });

	#signUpState = $state<{ status: Status; errorMessage?: string }>({ status: 'no-op' });

	#accessToken = $state<string | null>();

	#otp = $state<{ status: Status; errorMessage?: string }>({ status: 'no-op' });

	isLoggedin = $derived(this.#signInState.status == 'success' && this.#accessToken);

	#forgotPasswordState = $state<{ status: Status; errorMessage?: string }>({ status: 'no-op' });

	#resetPasswordState = $state<{ status: Status }>({ status: 'no-op' });

	#resendCodeState = $state<{ status: Status }>({ status: 'no-op' });

	user = $state<any>(undefined);

	constructor() {
		const token = authService.getAccessToken();
		if (token) {
			this.#signInState.status = 'success';
			this.#accessToken = token;
			// fetch and populate current user profile when token exists
			this.getProfile();
		}
	}

	async getProfile(): Promise<void> {
		const resp = await authService.getMe();
		if (resp.status === 'success') {
			this.user = resp.data;
		}
	}

	get signInState() {
		return this.#signInState;
	}

	get signUpState() {
		return this.#signUpState;
	}

	get otp() {
		return this.#otp;
	}

	get forgotPasswordState() {
		return this.#forgotPasswordState;
	}

	get resetPasswordState() {
		return this.#resetPasswordState;
	}

	get resendCodeState() {
		return this.#resendCodeState;
	}

	async login(
		params: SignInSchema
	): Promise<{ status: 'success' | 'error' | 'email-noverify-error' }> {
		this.#signInState.status = 'loading';
		const resp = await authService.login(params);

		if (resp.status == 'success') {
			this.#accessToken = resp.data.access_token;
			this.#signInState.status = 'success';
			return {
				status: 'success'
			};
		} else {
			if (resp.message == 'Email not verified') {
				this.#signInState.status = 'email-noverify-error';
				this.#signInState.errorMessage = resp.message;
				return {
					status: 'email-noverify-error'
				};
			}

			this.#signInState.status = 'error';
			this.#signInState.errorMessage = 'Invalid username or password';
			return {
				status: 'error'
			};
		}
	}

	async logout(): Promise<{ status: 'success' | 'error' }> {
		const { status } = await authService.logout();

		if (status == 'success') {
			this.#accessToken = null;
			this.#signInState.status = 'no-op';
			return {
				status: 'success'
			};
		}

		return {
			status: 'error'
		};
	}

	async signup(payload: SimpleSignUpSchema): Promise<{ status: 'success' | 'error' }> {
		this.#signUpState.status = 'loading';
		const resp = await authService.signup(payload);
		if (resp.status == 'success') {
			this.#signUpState.status = 'success';
			return {
				status: 'success'
			};
		} else {
			this.#signUpState.status = 'error';
			this.#signUpState.errorMessage = resp.message;
			return {
				status: 'error'
			};
		}
	}

	async verifyOTP({ otp }: { otp: string }): Promise<{ status: 'success' | 'error' }> {
		this.#otp.status = 'loading';
		const resp = await authService.verifyOtp(otp);

		if (resp.status == 'success') {
			this.#otp.status = 'success';
			return {
				status: 'success'
			};
		} else {
			this.#otp.status = 'error';
			this.#otp.errorMessage = resp.message;
			return {
				status: 'error'
			};
		}
	}

	async resendVerificationCode(): Promise<
		{ status: 'success' } | { status: 'error'; message?: string }
	> {
		this.#resendCodeState.status = 'loading';
		const resp = await authService.resendVerificationCode();
		if (resp.status == 'success') {
			this.#resendCodeState.status = 'success';
			return {
				status: 'success'
			};
		} else {
			this.#resendCodeState.status = 'error';
			return {
				status: 'error',
				message: resp.message
			};
		}
	}

	async forgotPassword(
		email: string
	): Promise<{ status: 'success' } | { status: 'error'; message?: string }> {
		this.#forgotPasswordState.status = 'loading';
		const resp = await authService.forgotPassword(email);

		if (resp.status == 'success') {
			this.#forgotPasswordState.status = 'success';
			return { status: 'success' };
		} else {
			this.#forgotPasswordState.status = 'error';
			this.#forgotPasswordState.errorMessage = resp.message;
			return { status: 'error', message: resp.message };
		}
	}

	async resetPassword(payload: NewPasswordReq): Resp {
		this.#resetPasswordState.status = 'loading';
		const resp = await authService.resetPassword(payload);

		if (resp.status == 'success') {
			this.#resetPasswordState.status = 'success';
			return { status: 'success' };
		} else {
			this.#resetPasswordState.status = 'error';
			return { status: 'error', message: resp.message };
		}
	}
}

export const authStore = new AuthStore();
