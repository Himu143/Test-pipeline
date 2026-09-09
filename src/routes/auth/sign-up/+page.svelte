<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Eye, EyeOff } from '@lucide/svelte';
	import LeftSection from '../(components)/left-section.svelte';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import PrivacyPolicy from '$lib/components/app/privacy-policy.svelte';
	import { simpleSignUpSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';
	import { toast } from 'svelte-sonner';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	const { form, errors, data, setFields } = createForm({
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
			terms: false
		},
		extend: validator({ schema: simpleSignUpSchema }),
		onSubmit: async (values) => {
			const { status } = await authStore.signup(values);

			if (status == 'success') {
				toast.success('Verification Code sent', {
					description: 'Check your email for the verification code'
				});
				goto('/auth/otp');
			} else {
				toast.error(authStore.signUpState.errorMessage || 'Sign up failed');
			}
		}
	});

	let isTermsChecked = $state(false);

	$effect(() => {
		setFields('terms', isTermsChecked);
	});
</script>

<div class="flex w-full flex-col items-center justify-center lg:h-auto lg:w-1/2">
	<form use:form class="w-full">
		<Card.Root class="mx-auto w-full max-w-90 sm:max-w-120">
			<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
				<Card.Title>Sign Up</Card.Title>
				<Card.Description>
					Please Enter your details to Create your account
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-5">
					<div class="grid gap-2">
						<Label for="fullName">Full Name</Label>
						<Input
							id="fullName"
							name="fullName"
							type="text"
							placeholder="Enter your name "
							required
						/>
						<ValidationError errors={$errors.fullName} />
					</div>

					<div class="grid gap-2">
						<Label for="email">Email Address</Label>
						<Input
							id="email"
							type="email"
							name="email"
							placeholder="Enter valid email "
							required
						/>
						<ValidationError errors={$errors.email} />
					</div>

					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<div class="relative">
							<Input
								id="password"
								name="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter password"
								class="pr-12 "
							/>
							<button
								type="button"
								class="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center"
								onclick={() => (showPassword = !showPassword)}
								aria-label="Toggle password visibility"
							>
								{#if showPassword}
									<EyeOff size="20" class="text-gray-500" />
								{:else}
									<Eye size="20" class="text-gray-500" />
								{/if}
							</button>
						</div>
						<ValidationError errors={$errors.password} />
					</div>

					<div class="grid gap-2">
						<Label for="confirmPassword">Confirm Password</Label>
						<div class="relative">
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Confirm password"
								class="pr-12 "
							/>
							<button
								type="button"
								class="absolute top-1/2 right-3 flex -translate-y-1/2 transform items-center"
								onclick={() => (showConfirmPassword = !showConfirmPassword)}
								aria-label="Toggle password visibility"
							>
								{#if showConfirmPassword}
									<EyeOff size="20" class="text-gray-500" />
								{:else}
									<Eye size="20" class="text-gray-500" />
								{/if}
							</button>
						</div>
						<ValidationError errors={$errors.confirmPassword} />
					</div>

					<Button
						disabled={authStore.signUpState.status == 'loading'}
						type="submit"
						class="mt-5 min-h-11 w-full text-base font-semibold"
					>
						{#if authStore.signUpState.status == 'loading'}
							<Spinner />
						{/if}
						Sign up
					</Button>
				</div>
				<div
					class="mt-4 flex justify-center gap-2 text-center text-sm leading-6 font-normal text-secondary-black"
				>
					Already have an account?
					<a href="/auth/sign-in" class="text-sm leading-6 font-semibold text-tertiary">
						Sign in
					</a>
				</div>
			</Card.Content>
		</Card.Root>
	</form>
	<!-- <PrivacyPolicy /> -->
</div>
