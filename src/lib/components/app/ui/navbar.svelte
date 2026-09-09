<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { Menu, X, Globe, User, LogOut, TvMinimalPlay, UserStar } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select-language';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/stores/auth.svelte';
	import { Bookmark } from '@lucide/svelte';
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import WelcomeDialog from '$lib/components/app/ui/welcome-dialog.svelte';
	import { cohortUserStore } from '$lib/stores/cohort.svelte';

	let languages = $state([
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' }
	]);

	let selected = $state(getLocale());

	const triggerContent = $derived(
		languages.find((lang) => lang.value === selected)?.label ?? m.nav_select_language()
	);

	let isLoggedIn = $derived(authStore.isLoggedin);
	let userEmail = $derived(authStore.user?.email || '');
	let userFullName = $derived(authStore.user?.fullName || '');
	let isAdmin = $derived(authStore.user?.role?.toLowerCase?.() === 'admin');

	type NavItem = {
		label: string;
		href: string;
		matchPath?: string;
	};

	type NavigationConfig = {
		home: NavItem[];
		authenticated: NavItem[];
		public: NavItem[];
	};

	const NAVIGATION_CONFIG = $derived({
		// Navigation items shown on the home page
		home: [
			{
				label: m.nav_study_team() ?? 'Study Team',
				href: '/home#study-team-section',
				matchPath: '/home'
			},
			{ label: m.nav_training() ?? 'Training', href: '/training', matchPath: '/training' }
		],
		authenticated: [
			{
				label: m.nav_study_team() ?? 'Study Team',
				href: '/home#study-team-section',
				matchPath: '/home'
			},
			{ label: m.nav_training() ?? 'Training', href: '/training', matchPath: '/training' },
			{
				label: m.nav_community() ?? 'Community',
				href: '/community',
				matchPath: '/community'
			},
			{ label: m.nav_resources() ?? 'Resources', href: '/resources', matchPath: '/resources' }
		],
		// Navigation items for public/unauthenticated users
		public: [
			{ label: m.nav_family_tools() ?? 'Family Tools', href: '/#family-tools' },
			{ label: m.nav_about_us() ?? 'About Us', href: '/about' },
			{ label: m.nav_ask_a_question() ?? 'Ask a Question', href: '/#faq-section' }
		]
	});

	let isMenuOpen = $state(false);
	let isMobile = $state(false);
	let lastScrollY = 0;
	let headerVisibility = $state(true);
	let isLoggingOut = $state(false);
	let showWelcomeModal = $state(false);

	let currentPath = $derived(page.url.pathname);
	let isHomePage = $derived(currentPath === '/home');

	const hasCohortAccess = $derived.by(() => {
		return cohortUserStore.userCohorts.length > 0;
	});

	let navItems = $derived.by(() => {
		// Authenticated users see authenticated navigation
		if (isLoggedIn) {
			const items: NavItem[] = [...NAVIGATION_CONFIG.authenticated];

			// Admin users get an additional admin link
			// if (isAdmin) {
			// 	items.push({
			// 		label: 'Admin',
			// 		href: '/admin/discussion/?type=pending',
			// 		matchPath: '/admin'
			// 	});
			// }

			return items;
		}

		// Unauthenticated users - no navigation items in center
		return [];
	});
	let isWhiteBackground = $derived(true);

	// Check if we're on mobile screen
	function checkIsMobile() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024;
			if (!isMobile && isMenuOpen) {
				closeMenu();
			}
		}
	}

	function toggleMenu() {
		// Only allow toggling menu on mobile screens
		if (isMobile) {
			isMenuOpen = !isMenuOpen;
			document.body.classList.toggle('overflow-hidden', isMenuOpen);
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		document.body.classList.remove('overflow-hidden');
	}

	function handleScroll() {
		const currentScrollY = window.scrollY;
		headerVisibility = currentScrollY === 0 || currentScrollY < lastScrollY;
		lastScrollY = currentScrollY;
	}

	async function logoutHandler() {
		isLoggingOut = true;
		try {
			await authStore.logout();
			goto('/auth/sign-in');
		} finally {
			isLoggingOut = false;
			closeMenu();
		}
	}

	function getUserInitials(email: string): string {
		if (!email) return 'U';
		const parts = email.split('@')[0];
		if (parts.length >= 2) {
			return parts.substring(0, 2).toUpperCase();
		}
		return email.charAt(0).toUpperCase();
	}

	function isActive(item: NavItem, path: string): boolean {
		if (item.matchPath && path.startsWith(item.matchPath)) {
			return true;
		}
		return item.href === path;
	}

	function openWelcomeModal() {
		showWelcomeModal = true;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			// Check initial screen size
			checkIsMobile();

			// Add resize listener
			window.addEventListener('resize', checkIsMobile);
			window.addEventListener('scroll', handleScroll);

			return () => {
				window.removeEventListener('resize', checkIsMobile);
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<header
	id="header"
	class={cn(
		'z-50 font-inter text-sm font-normal transition-transform duration-500 ease-in-out md:py-4 bg-transparent',
		'fixed w-full bg-white lg:sticky lg:top-4 lg:bg-transparent',
		'md:text-base'
	)}
	class:is-hidden={!headerVisibility}
	class:is-visible={headerVisibility}
	style="z-index: 10000;"
>
	<!-- Desktop Navigation (hidden on mobile) -->
	<nav
		class="hidden items-center justify-between gap-6 rounded-[500px] bg-white px-6 py-4 shadow-lg backdrop-blur-md lg:flex"
	>
		<!-- Left: Logo/Image -->
		<div class="flex items-center">
			<a href={isLoggedIn ? '/home' : '/'}>
				<img
					class="max-h-24 w-45 lg:w-auto"
					src="/images/nav/circle-final-logo.png"
					alt="Logo"
				/>
			</a>
		</div>

		<!-- Center: Navigation Items (shown when logged in) -->
		{#if isLoggedIn}
			<div class="flex items-center justify-center gap-3 text-black lg:gap-4 2xl:gap-10">
				{#each navItems as item}
					<a
						href={item.href}
						class="relative text-base whitespace-nowrap transition-colors hover:font-semibold lg:text-base xl:text-lg"
					>
						{item.label}
						{#if isActive(item, currentPath)}
							<span
								class="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-black"
								style="transform: translateY(4px);"
							></span>
						{/if}
					</a>
				{/each}

				<Select.Root
					type="single"
					name="language"
					bind:value={selected}
					onValueChange={(val) => {
						setLocale(val as 'en' | 'es');
					}}
				>
					<Select.Trigger
						class="flex w-auto items-center gap-1 px-0! py-0! text-base! whitespace-nowrap lg:gap-1 xl:text-lg!"
					>
						<Globe class="size-6 text-globe lg:size-7" />
						{triggerContent}
					</Select.Trigger>

					<Select.Content>
						<Select.Group>
							{#each languages as lang (lang.value)}
								<Select.Item value={lang.value} label={lang.label}>
									{lang.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		{/if}

		<!-- Right: Profile Dropdown (logged in) or Language + Contact + Sign In (logged out) -->
		<div class="flex items-center justify-center gap-6">
			{#if isLoggedIn}
				<Button size="lg" variant="secondary" onclick={openWelcomeModal} class="text-lg!">
					<TvMinimalPlay class="size-6!" />
					{m.nav_user_guide()}
				</Button>
				<!-- User Dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						class="flex h-12 w-12 items-center justify-center rounded-full p-0 hover:bg-transparent focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						<Avatar.Root
							class="h-12 w-12 cursor-pointer ring-2 ring-offset-2 ring-yellow-500 transition-all hover:ring-yellow-500"
						>
							<Avatar.Image src="/images/home/generic-avatar.svg" alt={userEmail} />
							<Avatar.Fallback
								class="bg-linear-to-br from-yellow-300 to-yellow-500 font-semibold text-black"
							>
								{getUserInitials(userEmail)}
							</Avatar.Fallback>
						</Avatar.Root>
						<span class="sr-only">Open user menu</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="center" class="w-56">
						<DropdownMenu.Label class="font-normal">
							<div class="flex flex-col space-y-1">
								<p class="text-sm leading-none font-medium">{userFullName}</p>
								{#if userEmail}
									<p class="text-xs leading-none text-muted-foreground">
										{userEmail}
									</p>
								{/if}
							</div>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#if isAdmin}
							<DropdownMenu.Item onclick={() => goto('/admin/cohort')}>
								<UserStar class="mr-2 size-4" />
								<span>{m.nav_cohort_management()}</span>
							</DropdownMenu.Item>
						{/if}
						<DropdownMenu.Item onclick={() => goto('/saved-items')}>
							<Bookmark class="mr-2 size-4" />
							<span>{m.nav_saved_items()}</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => goto('/my-profile')}>
							<User class="mr-2 size-4" />
							<span>{m.nav_profile()}</span>
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={logoutHandler} disabled={isLoggingOut}>
							<LogOut class="mr-2 size-4 max-w-40" />
							<span>{isLoggingOut ? m.nav_logging_out() : m.nav_logout()}</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<!-- Logged out: Language + Contact Us + Sign In -->
				<ul class="flex gap-4 lg:gap-8">
					<li class="flex items-center gap-1 text-lg! font-medium!">
						<Select.Root
							type="single"
							name="language"
							bind:value={selected}
							onValueChange={(val) => {
								setLocale(val as 'en' | 'es');
							}}
						>
							<Select.Trigger
								class="w-autop flex items-center gap-2 px-0! py-0! text-lg! font-medium!"
							>
								<Globe class="size-7 text-globe" />
								{triggerContent}
							</Select.Trigger>

							<Select.Content>
								<Select.Group>
									{#each languages as lang (lang.value)}
										<Select.Item value={lang.value} label={lang.label}>
											{lang.label}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</li>
					<li class="flex cursor-pointer items-center text-lg font-medium">
						<a href="/contact-us"> {m.nav_contact_us()} </a>
					</li>
				</ul>

				<Button
					href="/auth/sign-in"
					class="flex h-12 w-32 items-center justify-center rounded-4xl bg-black text-center text-xl font-medium hover:bg-black"
				>
					{m.nav_sign_in()}
				</Button>
			{/if}
		</div>
	</nav>

	<!-- Mobile Navigation (visible only on mobile) -->
	<nav
		class="flex min-h-12 items-center justify-between py-3 pr-4 pl-4 sm:min-h-20 sm:pr-6 md:px-6 lg:hidden lg:pr-16"
	>
		<!-- Left: Logo -->
		<div class="flex items-center">
			<a href="/" onclick={closeMenu}>
				<img
					src="/images/nav/circle-final-logo.png"
					alt="Logo"
					class="h-12 w-auto sm:h-24"
				/>
			</a>
		</div>

		<!-- Hamburger Menu -->
		<div>
			<button onclick={toggleMenu} class="flex items-center focus:outline-none">
				{#if isMenuOpen}
					<X class="size-6" />
				{:else}
					<Menu class="size-6" />
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile Menu Dropdown (only shows on mobile screens) -->
	{#if isMenuOpen && isMobile}
		<div
			class="mobile-menu flex flex-col items-start justify-start gap-2 bg-white px-6 pt-4 pb-6 shadow-lg lg:hidden"
		>
			{#if isLoggedIn}
				<!-- Logged in menu -->
				<ul class="w-full space-y-3">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								class="relative block w-fit py-2 text-base hover:font-semibold hover:text-primary {isActive(
									item,
									currentPath
								)
									? 'font-semibold text-primary'
									: 'font-normal'}"
								onclick={closeMenu}
							>
								{item.label}
								{#if isActive(item, currentPath)}
									<span
										class="absolute bottom-1 left-0 h-1 w-full rounded-full bg-black"
									></span>
								{/if}
							</a>
						</li>
					{/each}
					{#if isAdmin}
						<div class="flex items-center gap-3 py-2 text-base">
							<button
								class="relative flex w-fit items-center py-2 text-base hover:font-semibold hover:text-primary"
								class:font-semibold={currentPath === '/admin/cohort' ||
									currentPath.startsWith('/admin/cohort/')}
								class:text-primary={currentPath === '/admin/cohort' ||
									currentPath.startsWith('/admin/cohort/')}
								onclick={() => {
									closeMenu();
									goto('/admin/cohort');
								}}
							>
								<span>{m.nav_cohort_management()}</span>

								{#if currentPath === '/admin/cohort' || currentPath.startsWith('/admin/cohort/')}
									<span
										class="absolute bottom-1 left-0 h-1 w-full rounded-full bg-black"
									></span>
								{/if}
							</button>
						</div>
					{/if}

					<!-- Language selector -->
					<li class="flex items-center gap-2 pt-2">
						<Select.Root
							type="single"
							name="language"
							bind:value={selected}
							onValueChange={(val) => {
								setLocale(val as 'en' | 'es');
							}}
						>
							<Select.Trigger
								class="flex w-full items-center gap-2 px-0! py-0! text-base! font-medium!"
							>
								<Globe class="size-6 text-globe" />
								{triggerContent}
							</Select.Trigger>

							<Select.Content>
								<Select.Group>
									{#each languages as lang (lang.value)}
										<Select.Item value={lang.value} label={lang.label}>
											{lang.label}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</li>
				</ul>

				<!-- Profile with dropdown info -->
				<div class="mt-4 w-full space-y-2">
					<div class="flex items-center gap-3">
						<div
							class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-yellow-500"
						>
							<img src="/images/home/generic-avatar.svg" alt="profile" class="" />
						</div>
						<div class="flex flex-col">
							<span class="text-base font-medium">
								{userFullName}
								</span>
							{#if userEmail}
								<span class="text-xs text-muted-foreground">{userEmail}</span>
							{/if}
						</div>
					</div>

					<Button
						onclick={logoutHandler}
						disabled={isLoggingOut}
						class="mt-2 flex w-full max-w-40 items-center justify-center"
						variant="outline"
					>
						<LogOut class="mr-2 size-4 max-w-40" />
						{isLoggingOut ? m.nav_logging_out() : m.nav_logout()}
					</Button>
					<Button
						size="lg"
						variant="secondary"
						class="my-2 text-lg!"
						onclick={() => {
							closeMenu();
							openWelcomeModal();
						}}
					>
						<TvMinimalPlay class="size-6!" />
						{m.nav_user_guide()}
					</Button>
				</div>
			{:else}
				<!-- Logged out menu: match desktop elements -->
				<ul class="w-full space-y-3">
					<!-- Language selector (same as desktop) -->
					<li class="flex items-center gap-2">
						<Select.Root
							type="single"
							name="language"
							bind:value={selected}
							onValueChange={(val) => {
								setLocale(val as 'en' | 'es');
							}}
						>
							<Select.Trigger
								class="flex w-full items-center gap-2 px-0! py-0! text-base! font-medium!"
							>
								<Globe class="size-6 text-globe" />
								{triggerContent}
							</Select.Trigger>

							<Select.Content>
								<Select.Group>
									{#each languages as lang (lang.value)}
										<Select.Item value={lang.value} label={lang.label}>
											{lang.label}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</li>

					<!-- Contact Us (same text as desktop) -->
					<li class="cursor-pointer py-2 text-base font-medium">
						<a href="/contact-us"> {m.nav_contact_us()} </a>
					</li>
				</ul>

				<!-- Sign In button (same as desktop CTA) -->
				<Button
					href="/auth/sign-in"
					class="mt-4 flex min-h-12 max-w-125 items-center justify-center rounded-4xl bg-black text-center text-lg font-medium hover:bg-black"
					onclick={closeMenu}
				>
					{m.nav_sign_in()}
				</Button>
			{/if}
		</div>
	{/if}
	<WelcomeDialog bind:open={showWelcomeModal} />
</header>

<style>
</style>
