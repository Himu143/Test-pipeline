<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import ValidationError from '$lib/components/app/validation-error.svelte';
	import { contactSchema } from '$lib/validation';
	import { cn } from '$lib/utils';
	import { m } from '$lib/paraglide/messages.js';
	import { createMutation } from '@tanstack/svelte-query';
	import { contactUs } from '$lib/services/contact';
	import { toast } from 'svelte-sonner';
	import { Spinner } from '$lib/components/ui/spinner';

	let isSubmitting = $state(false);

	const inputClassess = [
		'bg-secondary',
		'border',
		'border-gray-300',
		'text-lg',
		'font-normal',
		'placeholder:text-lg',
		'placeholder:font-normal',
		'placeholder:text-gray-400',
		'sm:text-xl',
		'sm:placeholder:text-base'
	];

	const { form, errors, reset } = createForm({
		initialValues: {
			name: '',
			email: '',
			relation_with_patient: '',
			message: ''
		},
		extend: validator({ schema: contactSchema }),
		onSubmit: async (values) => {
			// isSubmitting = true;
			// // Simulate API call
			// await new Promise((resolve) => setTimeout(resolve, 1000));
			// console.log(values);
			// isSubmitting = false;
			mutation.mutate(values);
		}
	});

	const mutation = createMutation(() => ({
		mutationKey: ['contact-us'],
		mutationFn: (values) => {
			return contactUs(values);
		},
		onSuccess: () => {
			toast.success(m.contact_success_message());
			reset();
		}
	}));
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:mt-0 md:px-6 lg:-mt-37 xl:px-24">
	<div
		class="flex flex-col gap-12 pt-12 sm:pt-24 lg:pt-44 xl:flex-row xl:items-start xl:justify-between 2xl:gap-24"
	>
		<!-- Left Side: Form -->
		<div class="w-full xl:w-1/2 xl:pr-12">
			<h1
				class="font-baskerville text-2xl leading-9 font-normal text-black sm:text-4xl sm:leading-16 lg:text-5xl"
			>
				{m.contact_headline()}
			</h1>

			<p
				class="mt-6 font-poppins text-xl leading-relaxed font-medium text-gray-700 sm:text-2xl"
			>
				{m.contact_description()}
			</p>

			<form use:form class="mt-10 grid gap-6">
				<!-- First Name and Last Name Row -->
				<!-- moving to a single name field as per the recent edits -->
				<!-- <div class="flex flex-col gap-3 sm:flex-row sm:gap-6">
					<div class="grid w-full gap-2">
						<Label for="firstName" class="text-lg font-medium text-gray-700 sm:text-xl">
							{m.contact_field_name()} <span class="-ml-1 text-red-600"> * </span>
						</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							placeholder={m.contact_field_name_placeholder()}
							class={cn(inputClassess)}
						/>
						{#if $errors.firstName}
							<ValidationError errors={$errors.firstName} />
						{/if}
					</div>

					<div class="grid w-full gap-2">
						<Label for="lastName" class="text-lg font-medium text-gray-700 sm:text-xl">
							{m.contact_field_lastname()} <span class="-ml-1 text-red-600"> * </span>
						</Label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
							placeholder={m.contact_field_lastname_placeholder()}
							class={cn(inputClassess)}
						/>
						{#if $errors.lastName}
							<ValidationError errors={$errors.lastName} />
						{/if}
					</div>
				</div> -->

				<div class="grid w-full gap-2">
					<Label for="firstName" class="text-lg font-medium text-gray-700 sm:text-xl">
						{m.contact_field_name()} <span class="-ml-1 text-red-600"> * </span>
					</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder={m.contact_field_name_placeholder()}
						class={cn(inputClassess)}
					/>
					{#if $errors.name}
						<ValidationError errors={$errors.name} />
					{/if}
				</div>

				<!-- Email -->
				<div class="grid gap-2">
					<Label for="email" class="text-lg font-medium text-gray-700 sm:text-xl">
						{m.contact_field_email()} <span class="-ml-1 text-red-600"> * </span>
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder={m.contact_field_email_placeholder()}
						class={cn(inputClassess)}
					/>
					{#if $errors.email}
						<ValidationError errors={$errors.email} />
					{/if}
				</div>

				<div class="grid w-full gap-2">
					<Label for="phone" class="text-lg font-medium text-gray-700 sm:text-xl">
						{m.contact_field_phone()}
					</Label>
					<Input
						id="phone"
						name="phone"
						type="text"
						placeholder={m.contact_field_phone_placeholder()}
						class={cn(inputClassess)}
					/>
				</div>

				<!-- Relationship -->
				<div class="grid gap-2">
					<Label
						for="relation_with_patient"
						class="text-lg font-medium text-gray-700 sm:text-xl"
					>
						{m.contact_field_relationship()} <span class="-ml-1 text-red-600"> * </span>
					</Label>
					<Input
						id="relation_with_patient"
						name="relation_with_patient"
						type="text"
						placeholder={m.contact_field_relationship_placeholder()}
						class={cn(inputClassess)}
					/>
					{#if $errors.relation_with_patient}
						<ValidationError errors={$errors.relation_with_patient} />
					{/if}
				</div>

				<!-- Message -->
				<div class="grid gap-2">
					<Label for="message" class="text-xl font-medium text-gray-700">
						{m.contact_field_message()} <span class="-ml-1 text-red-600"> * </span>
					</Label>

					<Textarea
						id="message"
						name="message"
						placeholder={m.contact_field_message_placeholder()}
						class={cn(
							inputClassess,
							'max-h-75',
							'min-h-30',
							'resize-none',
							'overflow-y-auto'
						)}
					/>
					{#if $errors.message}
						<ValidationError errors={$errors.message} />
					{/if}
				</div>

				<!-- Submit Button -->
				<Button
					type="submit"
					class="mt-4 h-14 w-52 rounded-full bg-black font-poppins text-xl font-medium text-white hover:bg-gray-800"
					disabled={mutation.isPending}
				>
					{#if mutation.isPending}
						<Spinner />
					{/if}
					{mutation.isPending ? m.contact_field_sending() : m.contact_field_send()}
				</Button>
			</form>
		</div>

		<!-- Right Side: Image -->
		<div class="hidden sm:block sm:w-full xl:w-1/2">
			<div class="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
				<img
					src="/images/contact-us/hero-1.png"
					alt="Caregiver and patient"
					class="h-full w-full object-cover"
				/>
			</div>
		</div>
	</div>
</section>
