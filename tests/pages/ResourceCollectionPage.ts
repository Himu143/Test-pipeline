import { expect, type Locator, type Page } from '@playwright/test';

export class ResourceCollectionPage {
	readonly page: Page;
	readonly firstResourceCard: Locator;
	readonly bookmarkButton: Locator;
	readonly searchInput: Locator;
	readonly resourceCards: Locator;
	readonly noResultsHeading: Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstResourceCard = page.locator('article').first();
		this.bookmarkButton = this.firstResourceCard.getByRole('button', { name: 'Bookmark' });
		this.searchInput = page.getByPlaceholder('Search', { exact: true });
		this.resourceCards = page.locator('article');
		this.noResultsHeading = page.getByRole('heading', { name: 'No Resources Found', exact: true });
	}

	async bookmarkResource() {
		await expect(this.firstResourceCard).toBeVisible();
		await expect(this.bookmarkButton).toBeVisible();
		await this.bookmarkButton.click();
	}

	async expectResourceBookmarked() {
		await expect(this.bookmarkButton).toBeVisible();
		await expect(this.bookmarkButton.locator('svg')).toHaveAttribute('fill', 'currentColor');
	}

	async searchResources(query: string) {
		await expect(this.searchInput).toBeVisible();
		await this.searchInput.fill(query);
		await expect(this.page).toHaveURL(new RegExp(`[?&]search=${encodeURIComponent(query)}`));
	}

	async expectSearchResult(title: string) {
		await expect(this.resourceCards).toHaveCount(1);
		await expect(this.resourceCards.first().getByRole('heading', { name: title })).toBeVisible();
	}

	async expectNoSearchResults() {
		await expect(this.resourceCards).toHaveCount(0);
		await expect(this.noResultsHeading).toBeVisible();
		await expect(
			this.page.getByText(/couldn't find any resources matching your search/i)
		).toBeVisible();
	}
}