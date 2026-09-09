import { expect, type Locator, type Page } from '@playwright/test';

export class ProfileMenu {
	readonly page: Page;
	readonly avatarTrigger: Locator;
	readonly userMenu: Locator;
	readonly savedItemsItem: Locator;
	readonly profileItem: Locator;
	readonly logoutItem: Locator;

	constructor(page: Page) {
		this.page = page;
		this.avatarTrigger = page.getByRole('button', { name: 'Open user menu' });
		this.userMenu = page.getByRole('menu');
		this.savedItemsItem = page.getByRole('menuitem', { name: 'Saved Items', exact: true });
		this.profileItem = page.getByRole('menuitem', { name: 'Profile', exact: true });
		this.logoutItem = page.getByRole('menuitem', { name: 'Logout', exact: true });
	}

	async expectAvatarVisible() {
		await expect(this.avatarTrigger).toBeVisible();
		await expect(this.avatarTrigger).toHaveAttribute('aria-expanded', 'false');
		const avatar = this.avatarTrigger.locator('img');
		await expect(avatar).toBeVisible();
		await expect(avatar).toHaveAttribute('alt', 'profile@example.com');
	}

	async openUserMenu() {
		if ((await this.avatarTrigger.getAttribute('aria-expanded')) !== 'true') {
			await this.avatarTrigger.click();
		}
	}

	async expectUserMenuOpen() {
		await expect(this.userMenu).toBeVisible();
	}

	async expectUserIdentity() {
		await expect(this.userMenu).toContainText('Test User');
		await expect(this.userMenu).toContainText('profile@example.com');
	}

	async expectMenuItemsVisible() {
		await expect(this.savedItemsItem).toBeVisible();
		await expect(this.profileItem).toBeVisible();
		await expect(this.logoutItem).toBeVisible();
	}

	async openSavedItems() {
		await this.savedItemsItem.click();
	}

	async openProfile() {
		await this.profileItem.click();
	}

	async logout() {
		await this.logoutItem.click();
	}

	async expectSignedOut() {
		await expect(this.page).toHaveURL(/\/auth\/sign-in(?:[/?#]|$)/);
		await expect(this.avatarTrigger).toHaveCount(0);
		await expect(this.page.getByRole('button', { name: 'Sign In', exact: true })).toBeVisible();
	}

	async expectAccessibleTrigger() {
		await expect(this.avatarTrigger).toHaveAttribute('aria-haspopup', 'menu');
		await expect(this.avatarTrigger).toHaveAccessibleName(/profile@example\.com.*Open user menu/i);
	}

	async expectKeyboardNavigation() {
		await this.avatarTrigger.focus();
		await expect(this.avatarTrigger).toBeFocused();
		await this.page.keyboard.press('Enter');
		await this.expectUserMenuOpen();
		await expect(this.page.getByRole('menuitem').first()).toBeFocused();
		await this.page.keyboard.press('ArrowDown');
		await expect(this.page.getByRole('menuitem').nth(1)).toBeFocused();
		await this.page.keyboard.press('ArrowDown');
		await expect(this.page.getByRole('menuitem', { name: 'Logout', exact: true })).toBeFocused();
		await this.page.keyboard.press('Escape');
		await expect(this.userMenu).toBeHidden();
	}

	async expectMenuClosesOnOutsideClick() {
		await this.expectUserMenuOpen();
		await this.page.mouse.click(10, 400);
		await expect(this.userMenu).toBeHidden();
		await this.avatarTrigger.click();
		await this.expectUserMenuOpen();
	}

	async expectProfilePage() {
		await expect(this.page).toHaveURL(/\/my-profile(?:[/?#]|$)/);
		await expect(this.page.getByText('Personal Information', { exact: true })).toBeVisible();
		await expect(this.page.locator('body')).not.toContainText(/404|500|application error/i);
	}

	async expectSavedItemsPage() {
		await expect(this.page).toHaveURL(/\/saved-items(?:[/?#]|$)/);
		await expect(this.page.getByRole('heading', { name: 'Saved Items', exact: true })).toBeVisible();
		await expect(this.page.locator('body')).not.toContainText(/404|500|application error/i);
	}
}