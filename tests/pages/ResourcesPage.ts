import { expect, type Locator, type Page } from '@playwright/test';

const expectedCards = [
	'Clinical Guidance',
	'Support Networks',
	'Crisis Resources',
	'Our Publications',
	'Legal Resources',
	'Federal Resources (NIH, CDC)'
];

const expectedDescriptionTopics: Record<string, RegExp> = {
	'Clinical Guidance': /medical advice|symptom management|care strategies/i,
	'Support Networks': /support groups|organizations|community centers|advocacy networks/i,
	'Crisis Resources': /emergency|mental-health crisis|caregiver burnout/i,
	'Our Publications': /research|articles|caregiving insights/i,
	'Legal Resources': /power of attorney|advance directives|legal/i,
	'Federal Resources (NIH, CDC)': /government information|official guidelines|fact sheets/i
};

export class ResourcesPage {
	readonly page: Page;
	readonly resourceLibrarySection: Locator;
	readonly resourceLibraryLabel: Locator;
	readonly resourceLibraryHeading: Locator;
	readonly resourceLibraryDescription: Locator;
	readonly resourceCards: Locator;

	constructor(page: Page) {
		this.page = page;
		this.resourceLibrarySection = page
			.locator('section')
			.filter({ has: page.getByRole('heading', { name: 'Comprehensive Resource Library' }) })
			.first();
		this.resourceLibraryLabel = this.resourceLibrarySection.getByRole('heading', {
			name: 'RESOURCES',
			exact: true
		});
		this.resourceLibraryHeading = this.resourceLibrarySection.getByRole('heading', {
			name: 'Comprehensive Resource Library'
		});
		this.resourceLibraryDescription = this.resourceLibrarySection.locator('p').first();
		this.resourceCards = this.resourceLibrarySection.locator('a[href^="/resources/"]');
	}

	async goto() {
		await this.page.goto('/resources');
		await expect(this.page).toHaveURL(/\/resources(?:[/?#]|$)/);
	}

	async expectResourceLibraryVisible() {
		await expect(this.resourceLibrarySection).toBeVisible();
		await expect(this.resourceLibraryHeading).toBeVisible();
		await expect(
			this.resourceLibrarySection.getByText('RESOURCES', { exact: true })
		).toBeVisible();
		await expect(this.resourceLibrarySection.locator('p').first()).not.toBeEmpty();
	}

	async expectResourceLibraryHeader() {
		await expect(this.resourceLibraryLabel).toHaveText('RESOURCES');
		await expect(this.resourceLibraryHeading).toHaveText('Comprehensive Resource Library');
		await expect(this.resourceLibraryDescription).toBeVisible();
		await expect(this.resourceLibraryDescription).not.toBeEmpty();

		for (const locator of [
			this.resourceLibraryLabel,
			this.resourceLibraryHeading,
			this.resourceLibraryDescription
		]) {
			await expect(locator).toHaveJSProperty(
				'scrollWidth',
				await locator.evaluate((element) => element.clientWidth)
			);
			await expect(locator).toHaveJSProperty(
				'scrollHeight',
				await locator.evaluate((element) => element.clientHeight)
			);
		}

		const boxes = await Promise.all([
			this.resourceLibraryLabel.boundingBox(),
			this.resourceLibraryHeading.boundingBox(),
			this.resourceLibraryDescription.boundingBox()
		]);

		expect(boxes.every((box) => box !== null)).toBe(true);

		const [labelBox, headingBox, descriptionBox] = boxes;
		expect(labelBox!.y + labelBox!.height).toBeLessThanOrEqual(headingBox!.y);
		expect(headingBox!.y + headingBox!.height).toBeLessThanOrEqual(descriptionBox!.y);
	}

	async expectAllResourceCardsContent() {
		await expect(this.resourceCards).toHaveCount(expectedCards.length);

		for (const title of expectedCards) {
			const card = this.resourceCards.filter({
				has: this.page.getByRole('heading', { name: title, exact: true })
			});

			await expect(card).toHaveCount(1);
			await expect(card.getByRole('heading', { name: title, exact: true })).toBeVisible();
			await expect(card.locator('img')).toHaveCount(1);
			await expect(card.locator('img')).toBeVisible();
			await expect(card.locator('img')).toHaveAttribute('src', /.+/);
			await expect(card.locator('p')).toHaveCount(1);
			await expect(card.locator('p')).not.toBeEmpty();
		}
	}

	async expectResourceDescriptionsCorrect() {
		for (const title of expectedCards) {
			const card = this.resourceCards.filter({
				has: this.page.getByRole('heading', { name: title, exact: true })
			});
			await expect(card.locator('p')).toContainText(expectedDescriptionTopics[title]);
		}
	}

	async openResourceCategory(title: string) {
		const card = this.resourceCards.filter({
			has: this.page.getByRole('heading', { name: title, exact: true })
		});
		await expect(card).toHaveCount(1);
		await card.click();
	}

	async expectCorrectResourceCategory(title: string) {
		await expect(this.page).toHaveURL(/\/resources\/[^/?#]+(?:[/?#]|$)/);
		await expect(this.page.getByRole('heading', { name: title, exact: true })).toBeVisible();
	}

	async expectNoResourceNavigationErrors() {
		for (const title of expectedCards) {
			await this.goto();
			await this.openResourceCategory(title);
			await expect(this.page).toHaveURL(/\/resources\/[^/?#]+(?:[/?#]|$)/);
			await expect(this.page.locator('body')).toBeVisible();
			await expect(this.page.locator('body')).not.toContainText(
				/404|500|not found|application error|unexpected failure/i
			);
			await expect(this.page.locator('section').first()).toBeVisible();
			await expect(this.page.locator('body')).not.toBeEmpty();
		}
	}

	async expectTabletResourceLayout() {
		await expect(this.resourceLibrarySection).toBeVisible();
		await expect(this.resourceCards).toHaveCount(expectedCards.length);

		for (const title of expectedCards) {
			const card = this.resourceCards.filter({
				has: this.page.getByRole('heading', { name: title, exact: true })
			});
			const heading = card.getByRole('heading', { name: title, exact: true });
			const description = card.locator('p');

			await expect(card).toBeVisible();
			await expect(heading).toBeVisible();
			await expect(description).toBeVisible();
			await expect(heading).not.toBeEmpty();
			await expect(description).not.toBeEmpty();
			await expect(heading).toHaveJSProperty(
				'scrollWidth',
				await heading.evaluate((element) => element.clientWidth)
			);
			await expect(description).toHaveJSProperty(
				'scrollWidth',
				await description.evaluate((element) => element.clientWidth)
			);
		}

		const cardBoxes = await this.resourceCards.evaluateAll((cards) =>
			cards.map((card) => {
				const box = card.getBoundingClientRect();
				return { left: box.left, right: box.right, top: box.top, bottom: box.bottom };
			})
		);

		for (const box of cardBoxes) {
			expect(box.left).toBeGreaterThanOrEqual(0);
			expect(box.right).toBeLessThanOrEqual(768);
		}

		for (let index = 0; index < cardBoxes.length; index += 1) {
			for (let nextIndex = index + 1; nextIndex < cardBoxes.length; nextIndex += 1) {
				const current = cardBoxes[index];
				const next = cardBoxes[nextIndex];
				const overlaps =
					current.left < next.right &&
					current.right > next.left &&
					current.top < next.bottom &&
					current.bottom > next.top;
				expect(overlaps).toBe(false);
			}
		}

		const horizontalOverflow = await this.page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth
		);
		expect(horizontalOverflow).toBe(false);
	}

	async expectMobileResourceLayout() {
		await expect(this.resourceLibrarySection).toBeVisible();
		await expect(this.resourceLibraryHeading).toBeVisible();
		await expect(this.resourceLibraryDescription).toBeVisible();
		await expect(this.resourceCards).toHaveCount(expectedCards.length);

		await expect(this.resourceLibraryHeading).not.toBeEmpty();
		await expect(this.resourceLibraryDescription).not.toBeEmpty();
		await expect(this.resourceLibraryHeading).toHaveJSProperty(
			'scrollWidth',
			await this.resourceLibraryHeading.evaluate((element) => element.clientWidth)
		);
		await expect(this.resourceLibraryDescription).toHaveJSProperty(
			'scrollWidth',
			await this.resourceLibraryDescription.evaluate((element) => element.clientWidth)
		);

		for (const title of expectedCards) {
			const card = this.resourceCards.filter({
				has: this.page.getByRole('heading', { name: title, exact: true })
			});
			const heading = card.getByRole('heading', { name: title, exact: true });
			const description = card.locator('p');

			await card.scrollIntoViewIfNeeded();
			await expect(card).toBeVisible();
			await expect(heading).toBeVisible();
			await expect(description).toBeVisible();
			await expect(heading).not.toBeEmpty();
			await expect(description).not.toBeEmpty();

			const [cardBox, headingBox, descriptionBox] = await Promise.all([
				card.boundingBox(),
				heading.boundingBox(),
				description.boundingBox()
			]);
			expect(cardBox).not.toBeNull();
			expect(headingBox).not.toBeNull();
			expect(descriptionBox).not.toBeNull();
			expect(cardBox!.x).toBeGreaterThanOrEqual(0);
			expect(cardBox!.x + cardBox!.width).toBeLessThanOrEqual(390);
			expect(headingBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
			expect(headingBox!.x + headingBox!.width).toBeLessThanOrEqual(
				cardBox!.x + cardBox!.width
			);
			expect(descriptionBox!.x).toBeGreaterThanOrEqual(cardBox!.x);
			expect(descriptionBox!.x + descriptionBox!.width).toBeLessThanOrEqual(
				cardBox!.x + cardBox!.width
			);
		}

		const horizontalOverflow = await this.page.evaluate(
			() => document.documentElement.scrollWidth > document.documentElement.clientWidth
		);
		expect(horizontalOverflow).toBe(false);
	}

	async expectAllResourceIconsLoaded() {
		await expect(this.resourceCards).toHaveCount(expectedCards.length);
		await this.resourceCards.first().scrollIntoViewIfNeeded();

		for (const title of expectedCards) {
			const card = this.resourceCards.filter({
				has: this.page.getByRole('heading', { name: title, exact: true })
			});
			const icon = card.locator('img');
			const heading = card.getByRole('heading', { name: title, exact: true });

			await expect(icon).toHaveCount(1);
			await expect(icon).toBeVisible();
			await expect(icon).toHaveAttribute('src', /.+/);
			const imageState = await icon.evaluate((element) => {
				if (!(element instanceof HTMLImageElement)) {
					throw new Error('Resource icon locator did not resolve to an image element');
				}

				return {
					complete: element.complete,
					naturalWidth: element.naturalWidth,
					naturalHeight: element.naturalHeight
				};
			});
			expect(imageState.complete).toBe(true);
			expect(imageState.naturalWidth).toBeGreaterThan(0);
			expect(imageState.naturalHeight).toBeGreaterThan(0);

			const iconBox = await icon.boundingBox();
			const headingBox = await heading.boundingBox();
			expect(iconBox).not.toBeNull();
			expect(headingBox).not.toBeNull();
			expect(iconBox!.y + iconBox!.height).toBeLessThanOrEqual(headingBox!.y);
		}
	}

	async openClinicalGuidance() {
		await this.openResourceCategory('Clinical Guidance');
		await expect(this.page).toHaveURL(/\/resources\/clinical-guidance(?:[/?#]|$)/);
		await expect(
			this.page.getByRole('heading', { name: 'Clinical Guidance', exact: true })
		).toBeVisible();
	}

	async clickFirstReadMore() {
		const readMoreButton = this.page
			.locator('article')
			.first()
			.getByRole('link', { name: 'Read More' });
		await expect(readMoreButton).toBeVisible();
		const href = await readMoreButton.getAttribute('href');
		expect(href).not.toBeNull();

		const popupPromise = this.page.waitForEvent('popup');
		await readMoreButton.click();
		const popup = await popupPromise;
		await popup.waitForLoadState('domcontentloaded');
		await expect(popup).toHaveURL(href!);

		return { href: href! };
	}
}
