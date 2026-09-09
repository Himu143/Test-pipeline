import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProfileMenu } from './pages/ProfileMenu';

const testEmail = 'profile@example.com';
const testPassword = 'ProfilePassword123!';

test.beforeEach(async ({ page }) => {
	await page.route('**/auth/api/v1/login', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				access_token: 'profile-access-token',
				refresh_token: 'profile-refresh-token'
			})
		});
	});

	await page.route('**/auth/api/v1/me', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ email: testEmail, fullName: 'Test User', role: 'user' })
		});
	});

	await page.route('**/auth/api/v1/profile/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				data: {
					full_name: 'Test User',
					email: testEmail,
					phone: '123-456-7890',
					relation_with_patient: 'Daughter',
					zipcode: '0000'
				}
			})
		});
	});

	await page.route('**/bookmark/api/v1/bookmarks/**', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [] }) });
	});

	await page.route('**/training/api/v1/user-cohorts/**', async (route) => {
		await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: [] }) });
	});

	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.signIn(testEmail, testPassword);
	await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
});

test('TC-PROFILE-UI-001: profile avatar is visible in the authenticated header', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.expectAvatarVisible();
	await expect(page.getByRole('button', { name: 'User Guide' })).toBeVisible();
});

test('TC-PROFILE-UI-002: profile avatar opens the user dropdown menu', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.expectUserMenuOpen();
});

test('TC-PROFILE-UI-003: dropdown displays the logged-in user identity', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.expectUserIdentity();
});

test('TC-PROFILE-UI-004: dropdown contains Saved Items, Profile, and Logout', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.expectMenuItemsVisible();
});

test('TC-PROFILE-FUNC-005: Saved Items opens the Saved Items page', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.openSavedItems();
	await profileMenu.expectSavedItemsPage();
});

test('TC-PROFILE-FUNC-006: Profile opens the My Profile page', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.openProfile();
	await profileMenu.expectProfilePage();
});

test('TC-PROFILE-FUNC-007: logout signs the user out and returns to Sign In', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.logout();
	await profileMenu.expectSignedOut();

	await page.goto('/resources');
	await expect(page).toHaveURL(/\/auth\/sign-in(?:[/?#]|$)/);
});

test('TC-PROFILE-A11Y-008: dropdown trigger has an accessible name', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.expectAccessibleTrigger();
	await profileMenu.openUserMenu();
	await profileMenu.expectUserMenuOpen();
});

test('TC-PROFILE-A11Y-009: dropdown menu items are keyboard accessible', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.expectKeyboardNavigation();
});

test('TC-PROFILE-NEG-010: dropdown closes on outside click', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.expectMenuClosesOnOutsideClick();
});

test('TC-PROFILE-NEG-011: dropdown does not open for unauthenticated users', async ({ page }) => {
	const profileMenu = new ProfileMenu(page);
	await profileMenu.openUserMenu();
	await profileMenu.logout();
	await profileMenu.expectSignedOut();
	await expect(page.getByRole('button', { name: 'User Guide' })).toHaveCount(0);
	await expect(page.getByRole('button', { name: 'Open user menu' })).toHaveCount(0);
});