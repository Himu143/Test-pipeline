<script lang="ts">
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import * as Table from '$lib/components/ui/table';
	import { userService } from '$lib/services/user';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';

	let { open = $bindable(false) } = $props();

	let users: Array<any> = $state([]);
	let selectedUsers: Array<Record<string, any>> = $state([]);
	let loading = $state(false);
	let searchInput = $state('');

	const cohortMemberIds = $derived.by(() => {
		return new Set(cohortUserStore.users.map((user) => String(user.auth_id ?? user.id)));
	});

	const availableUsers = $derived.by(() => {
		return users.filter((user) => !cohortMemberIds.has(String(user.id)));
	});

	const filteredUsers = $derived.by(() => {
		const query = searchInput.trim().toLowerCase();
		if (!query) return availableUsers;

		return availableUsers.filter((user) => {
			const name = (user.full_name ?? user.username ?? '').toLowerCase();
			const email = (user.email ?? '').toLowerCase();

			return name.includes(query) || email.includes(query);
		});
	});

	async function getUsers() {
		loading = true;
		const resp = await userService.getUsers();
		if (resp.status == 'success') {
			users = resp.data.users;
		}
		loading = false;
	}

	async function addUserHandler() {
		const { status } = await cohortUserStore.addUsers(
			page.params.id,
			selectedUsers.map((item) => item.id)
		);

		if (status == 'success') {
			open = false;
		}
	}

	$effect(() => {
		if (open) {
			getUsers();
			selectedUsers = [];
			searchInput = '';
		}
	});
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-h-[85vh] sm:max-w-2xl">
		<Dialog.Header>
			<Dialog.Title class="flex items-center justify-between">
				<span> User List </span>
				<div class="flex items-center gap-2">
					{#if loading}
						<Spinner />
					{/if}
					<Button size="sm" onclick={addUserHandler}>
						{#if cohortUserStore.addUserStatus == 'loading'}
							<Spinner />
						{/if}
						Add
					</Button>
				</div>
			</Dialog.Title>

			<Input bind:value={searchInput} placeholder="Search users..." />

			<Dialog.Description class="max-h-[50vh] overflow-y-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head></Table.Head>
							<Table.Head>Username</Table.Head>
							<Table.Head>Email</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each filteredUsers as user (user.id)}
							<Table.Row>
								<Table.Cell class="font-medium">
									<Checkbox
										checked={selectedUsers.find((s) => s.id == user.id) ? true : false}
										onCheckedChange={(val) => {
											if (val) {
												selectedUsers = [...selectedUsers, user];
											} else {
												selectedUsers = selectedUsers.filter((item) => user.id != item.id);
											}
										}}
									/>
								</Table.Cell>
								<Table.Cell class="font-medium">{user.full_name ?? user.username}</Table.Cell>
								<Table.Cell>{user.email}</Table.Cell>
							</Table.Row>
						{:else}
							<Table.Row>
								<Table.Cell colspan={3} class="text-center text-muted-foreground">
									{#if loading}
										Loading users...
									{:else if searchInput.trim()}
										No users match your search.
									{:else}
										No users available to add.
									{/if}
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
