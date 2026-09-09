<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { PencilLine, CircleCheckBig, XIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import { getProfile, updateProfile as updateProfileService } from '$lib/services/profile';
	import { createForm } from 'felte';
	import { toast } from 'svelte-sonner';

	import { useQueryClient } from '@tanstack/svelte-query';
	import { cohortService } from '$lib/services/cohort';
	import { authStore } from '$lib/stores/auth.svelte';

	const queryClient = useQueryClient();

	let isEditingPersonal = $state(false);
	let isEditingAccount = $state(false);

	let showPassword = $state(false);
	let profile = $state({
		firstName: 'Natasha',
		lastName: 'Romanoff',
		relationWithPatient: 'Daughter',
		batch: '01',
		email: 'natasharamanouf@email.com',
		phone: '123-456-7890',
		zip: '0000',
		password: ''
	});

	let isAdmin = $derived(authStore.user?.role?.toLowerCase?.() === 'admin');

	const { data, errors, setData } = createForm({
		initialValues: {
			full_name: '',
			relation_with_patient: '',
			phone: '',
			zipcode: '',
			email: ''
		}
	});

	const togglePersonalEdit = () => {
		isEditingPersonal = !isEditingPersonal;
	};

	const toggleAccountEdit = () => {
		isEditingAccount = !isEditingAccount;
	};

	const updateProfile = () => {
		mutation.mutate($data);
	};

	const query = createQuery(() => ({
		queryKey: ['get-profile'],
		queryFn: () => {
			return getProfile();
		}
		// initialData:
	}));

	const latestCohortQuery = createQuery(() => ({
		queryKey: ['user-cohorts', 'latest'],
		queryFn: () => cohortService.userCohorts(true)
	}));

	const latestCohort = $derived.by(() => {
		const cohorts =
			latestCohortQuery.data?.status === 'success' ? latestCohortQuery.data.data : undefined;
		return Array.isArray(cohorts) ? cohorts[0] : cohorts;
	});

	const mutation = createMutation(() => ({
		mutationKey: ['update-profile'],
		mutationFn: (data) => {
			return updateProfileService(data);
		},
		onSuccess: async () => {
			isEditingPersonal = false;

			await authStore.getProfile();
			await queryClient.invalidateQueries({ queryKey: ['get-profile'] });

			toast.info('Profile update successfull');
		}
	}));

	$effect(() => {
		if (query.isSuccess) {
			setData('full_name', query.data.data.full_name);
			setData('phone', query.data.data.phone);
			setData('relation_with_patient', query.data.data.relation_with_patient);
			setData('zipcode', query.data.data.zipcode);
			setData('email', query.data.data.email);
		}
	});

	const profileInputClass = `text-wrap truncate h-14 px-5 py-3 bg-white rounded-[10px] border border-stone-300 
	font-poppins text-2xl! font-semibold text-black focus:outline-none focus:ring-2 focus:ring-black 
	focus:border-transparent disabled:cursor-default disabled:opacity-50 disabled:bg-white 
	disabled:text-neutral-900`;
</script>

<section class="bg-secondary px-4 py-12 sm:px-8 md:px-6 lg:-mt-40 xl:px-24">
	<div
		class=" items-center gap-12 pt-12 sm:pt-28 md:pt-40! lg:flex-row lg:items-center lg:justify-between lg:pt-40! xl:items-start 2xl:gap-36"
	>
		<div class="flex flex-col gap-6 sm:gap-8">
			<!-- Page title -->
			<!-- <h1 class="font-baskerville text-2xl font-bold text-black sm:text-3xl md:text-4xl">
				My Profile
			</h1> -->

			<!-- Personal info card -->
			<div class="rounded-2xl bg-white p-4 sm:p-6 md:p-8">
				<div class="mb-4 flex items-center justify-between gap-4 sm:mb-6">
					<p class="font-poppins text-lg font-semibold text-black sm:text-xl md:text-3xl">
						{m.profile_personal_info()}
					</p>

					<div class="flex gap-2">
						{#if isEditingPersonal}
							<!-- save -->
							<Button variant="outline" onclick={() => (isEditingPersonal = false)}>
								<XIcon class="size-4" />

								<span>
									{m.cancel()}
								</span>
							</Button>
							<Button type="button" onclick={updateProfile}>
								<CircleCheckBig class="size-4" />

								<span>
									{m.profile_save_update()}
								</span>
							</Button>
						{:else}
							<!-- edit -->
							<Button type="button" onclick={() => (isEditingPersonal = true)}>
								<PencilLine class="size-4" />

								<span>
									{m.profile_edit()}
								</span>
							</Button>
						{/if}
					</div>
				</div>

				<div class="mb-4 h-px w-full bg-black/10 sm:mb-6"></div>

				<div
					class="flex flex-col gap-4 rounded-2xl bg-white pb-11 sm:flex-row sm:items-center sm:gap-8"
				>
					<div class="relative self-start sm:self-auto">
						<img
							class="h-16 w-16 rounded-full object-cover sm:h-24 sm:w-24 md:h-28 md:w-28 border-2 border-yellow-500"
							src="/images/home/generic-avatar.svg"
							alt="profile"
						/>
						<!-- <div
							class="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
						>
							<img
								class="h-5 w-5 text-neutral-900"
								src="/images/profile/camera.png"
								alt="camera icon"
							/>
						</div> -->
					</div>

					<div class="flex flex-col gap-2">
						<p
							class="font-poppins text-xl font-semibold text-black sm:text-2xl md:text-4xl"
						>
							{query.data?.data.full_name}
						</p>
						{#if !isAdmin && latestCohort?.name}
							<p class="font-poppins text-sm text-black sm:text-base md:text-lg">
								{latestCohort.name}
							</p>
						{/if}
					</div>
				</div>

				<form
					class="mr-0 grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3 2xl:mr-20 2xl:grid-cols-3"
				>
					<!-- First Name -->
					<div class="flex flex-col gap-2">
						<Label
							for="full_name"
							class="font-poppins text-base leading-none text-neutral-500 sm:text-2xl"
						>
							{m.full_name()}
						</Label>

						<Input
							id="full_name"
							type="text"
							bind:value={$data.full_name}
							disabled={!isEditingPersonal}
							class={profileInputClass}
						/>
					</div>

					<!-- Email -->
					<div class="flex flex-col gap-2">
						<Label
							for="email"
							class="flex items-end font-poppins text-base leading-none font-semibold text-neutral-500 sm:text-2xl"
						>
							<span> {m.profile_email()}</span>
							{#if isEditingPersonal}
								<span class="text-sm">(Not editable)</span>
							{/if}
						</Label>
						<Input
							id="email"
							type="email"
							bind:value={$data.email}
							disabled
							class={profileInputClass}
						/>
					</div>

					<!-- Last Name -->
					<div class="flex flex-col gap-2">
						<!-- <Label
							for="lastName"
							class="font-poppins text-base leading-none text-neutral-500 sm:text-2xl"
						>
							{m.profile_last_name()}
						</Label>
						<Input
							id="lastName"
							type="text"
							bind:value={profile.lastName}
							disabled={!isEditingPersonal}
							class={profileInputClass}
						/> -->
					</div>

					<!-- Relation With Patients -->
					<div class="flex flex-col gap-2">
						<Label
							for="relation"
							class="font-poppins text-base leading-none font-semibold text-neutral-500 sm:text-2xl"
						>
							{m.profile_relation()}
						</Label>
						<Input
							id="relation"
							type="text"
							bind:value={$data.relation_with_patient}
							disabled={!isEditingPersonal}
							class={profileInputClass}
						/>
					</div>

					<!-- Phone -->
					<div class="flex flex-col gap-2">
						<Label
							for="phone"
							class="font-poppins text-base leading-none font-semibold text-neutral-500 sm:text-2xl"
						>
							{m.profile_phone()}
						</Label>
						<Input
							id="phone"
							type="tel"
							bind:value={$data.phone}
							disabled={!isEditingPersonal}
							class={profileInputClass}
						/>
					</div>

					<!-- Zip Code -->
					<div class="flex flex-col gap-2">
						<Label
							for="zip"
							class="font-poppins text-base leading-none font-semibold text-neutral-500  sm:text-2xl"
						>
							{m.profile_zip()}
						</Label>
						<Input
							id="zip"
							type="text"
							bind:value={$data.zipcode}
							disabled={!isEditingPersonal}
							class={profileInputClass}
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
