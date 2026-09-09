<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createForm } from 'felte';
	import { slugify } from '$lib/utils';
	import * as Table from '$lib/components/ui/table';
	import AddUserDialog from './add-user-dialog.svelte';
	import { page } from '$app/state';
	import { cohortDetailStore, cohortUserStore } from '$lib/stores/cohort.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { goto } from '$app/navigation';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Trash2 } from '@lucide/svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	let editing = $state(false);
	let deleteCohortDialog = $state({ open: false });

	let deleteConfirmDialog: { open: boolean; delId: null | string } = $state({
		open: false,
		delId: null
	});
	let addUserDialog = $state(false);
	let users = $state([]);
	const isPublicCohort = $derived(cohortDetailStore.cohort?.name?.toLowerCase() === 'public');

	let { form, data, setFields, reset } = createForm({
		initialValues: {
			id: '',
			name: '',
			slug: '',
			description: ''
		},
		async onSubmit(values) {
			const { status } = await cohortDetailStore.updateCohort(page.params.id, values);
			if (status == 'success') {
				editing = false;
			}
		}
	});
	function nameInputHandler(e) {
		setFields('slug', slugify(e.target.value));
	}

	$effect(() => {
		if (cohortDetailStore.cohort) {
			setFields('name', cohortDetailStore.cohort.name);
			setFields('slug', cohortDetailStore.cohort.slug);
			setFields('description', cohortDetailStore.cohort.description);
		}
	});

	$effect(() => {
		if (page.params.id) {
			cohortDetailStore.getCohort(page.params.id);
			cohortUserStore.getUsers(page.params.id);
		}
	});
</script>

<form use:form>
	<Card.Root class="mx-auto w-full">
		<Card.Header>
			<Card.Title class="flex items-center justify-between">
				<div class="flex flex-wrap items-center gap-3">
					<Button size="icon" variant="outline" onclick={() => goto('/admin/cohort')}>
						<ChevronLeft />
					</Button>
					<span class="mr-2 text-2xl">{cohortDetailStore.cohort?.name}</span>
					{#if cohortDetailStore.cohort}
						{@const isPublic =
							cohortDetailStore.cohort.name?.toLowerCase() === 'public'}
						{@const firstChannelSlug = isPublic
							? 'public'
							: (cohortDetailStore.cohort.channels?.[0]?.channel_slug ??
								cohortDetailStore.cohort.slug)}
						<Button
							size="sm"
							variant="outline"
							onclick={() => {
								if (firstChannelSlug) {
									goto(`/forum?channel=${firstChannelSlug}`);
								}
							}}
						>
							Go to Discussion
						</Button>
					{/if}
				</div>
				<div class="flex flex-wrap items-center gap-2">
					{#if editing}
						<Button size="sm" type="submit">Save</Button>
						<Button
							size="sm"
							variant="secondary"
							onclick={() => {
								editing = false;
								if (cohortDetailStore.cohort) {
									setFields('name', cohortDetailStore.cohort.name);
									setFields('slug', cohortDetailStore.cohort.slug);
									setFields('description', cohortDetailStore.cohort.description);
								}
							}}
						>
							Cancel
						</Button>
					{:else}
						<Button size="sm" onclick={() => (editing = true)}>Edit</Button>
					{/if}
					{#if cohortDetailStore.cohort?.name?.toLowerCase() !== 'public'}
						<Button
							variant="destructive"
							size="sm"
							onclick={() => {
								deleteCohortDialog.open = true;
							}}
						>
							Delete
						</Button>
					{/if}
				</div>
			</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="mb-2 grid gap-4">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input
						id="name"
						name="name"
						bind:value={$data.name}
						oninput={nameInputHandler}
						disabled={!editing || isPublicCohort}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="slug">Slug</Label>
					<Input
						id="slug"
						name="slug"
						bind:value={$data.slug}
						disabled={!editing || isPublicCohort}
					/>
				</div>
				<div class="grid gap-2">
					<Label for="description">Description</Label>
					<Textarea
						id="description"
						name="description"
						bind:value={$data.description}
						disabled={!editing}
					/>
				</div>
			</div>

			{#if !isPublicCohort}
				{#if cohortUserStore.users.length > 0}
					<Table.Root class="mb-4">
						<Table.Header>
							<Table.Row>
								<Table.Head>Username</Table.Head>
								<Table.Head>Email</Table.Head>
								<Table.Head></Table.Head>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{#each cohortUserStore.users as user}
								<Table.Row>
									<Table.Cell class="font-medium">{user.full_name}</Table.Cell>
									<Table.Cell>{user.email}</Table.Cell>
									<Table.Cell>
										<Button
											onclick={() => {
												deleteConfirmDialog = {
													open: true,
													delId: user.auth_id
												};
											}}
											variant="ghost"
											size="sm"
										>
											<Trash2 />
										</Button>
									</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				{/if}

				<Button size="sm" onclick={() => (addUserDialog = true)}>Add User</Button>
			{/if}
		</Card.Content>
	</Card.Root>
</form>

<AddUserDialog bind:open={addUserDialog} />

<AlertDialog.Root bind:open={deleteConfirmDialog.open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the channel.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				disabled={cohortUserStore.removeUserStatus == 'loading'}
				onclick={async () => {
					if (deleteConfirmDialog.delId) {
						await cohortUserStore.removeUser(page.params.id, deleteConfirmDialog.delId);
						deleteConfirmDialog.open = false;
					}
				}}
			>
				{#if cohortUserStore.removeUserStatus == 'loading'}
					<Spinner />
				{/if}
				Continue
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<AlertDialog.Root bind:open={deleteCohortDialog.open}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure you want to delete this cohort?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently delete the cohort.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action
				onclick={async () => {
					const { status } = await cohortDetailStore.deleteCohort(page.params.id);
					if (status == 'success') {
						deleteCohortDialog.open = false;
						goto('/admin/cohort');
					}
				}}
			>
				Delete
			</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
