<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLeft } from '@lucide/svelte';
	import LeftSection from '../(components)/left-section.svelte';
	import * as InputOTP from '$lib/components/ui/input-otp/index.js';
	import { createForm } from 'felte';
	import * as zod from 'zod';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import { REGEXP_ONLY_DIGITS } from 'bits-ui';
	import Copyright from '$lib/components/app/copyright.svelte';
	import { otpSchema } from '$lib/validation';
	import { authStore } from '$lib/stores/auth.svelte';
	import { toast } from 'svelte-sonner';

	const { form, errors, data, reset } = createForm({
		initialValues: {
			otp: ''
		},
		extend: validator({ schema: otpSchema }),
		onSubmit: async (values) => {
			const resp = await authStore.verifyOTP(values);
			if (resp.status == 'success') {
				toast.success('Success');
				goto('/auth/sign-in');
			} else {
				toast.error(authStore.otp.errorMessage || 'Invalid verification code');
			}
		}
	});

	async function resendCode() {
		reset();
		const resp = await authStore.resendVerificationCode();
		if (resp.status == 'success') {
			toast.success('Verification Code Sent');
		} else {
			toast.error('Error', { description: resp.message || 'Failed to resend code' });
		}
	}
</script>

<div class="flex w-full flex-col items-center justify-center lg:h-auto lg:w-1/2">
	<Card.Root class="mx-auto w-full max-w-90 sm:max-w-120">
		<Card.Header class="flex flex-col items-center gap-2 pt-4 pb-2">
			<Card.Title class="text-3xl font-semibold">Check Your Email</Card.Title>
			<Card.Description
				class="text-center text-base leading-6 font-normal text-secondary-black"
				>Enter the verification code sent to <br /> you email.</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<form use:form class="mt-6 grid gap-5">
				<div class="grid items-center justify-center gap-2">
					<InputOTP.Root
						bind:value={$data.otp}
						name="otp"
						maxlength={6}
						pattern={REGEXP_ONLY_DIGITS}
					>
						{#snippet children({ cells })}
							<!-- <InputOTP.Group>
									{#each cells.slice(6, 6) as cell (cell)}
										<InputOTP.Slot {cell} />
									{/each}
								</InputOTP.Group> -->
							<InputOTP.Group class="flex gap-2 xl:gap-3">
								{#each cells.slice(0, 6) as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
					<div class="flex justify-center">
						<ValidationError errors={$errors.otp} />
					</div>
				</div>
				<div
					class="-mt-2 flex justify-center gap-2 text-center text-sm leading-6 font-normal text-secondary-black"
				>
					Didn't get your code?
					<Button
						variant="ghost"
						onclick={resendCode}
						class="h-auto px-0 py-0 text-sm leading-6 font-semibold text-tertiary hover:bg-transparent"
					>
						Send a new code
					</Button>
				</div>

				<Button type="submit" class="mt-5 min-h-11 w-full text-base font-semibold">
					Continue
				</Button>
			</form>
			<div class="flex justify-center">
				<Button
					variant="ghost"
					class="mt-4 mb-5 flex cursor-pointer justify-center gap-2 text-center text-sm leading-6 font-normal text-secondary-black hover:bg-transparent"
					onclick={() => {
						goto('/auth/sign-in');
					}}
				>
					<span><ArrowLeft /></span> Back to Login
				</Button>
			</div>
		</Card.Content>
	</Card.Root>
	<Copyright />
</div>
