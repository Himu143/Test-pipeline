import { expect, type Locator, type Page } from '@playwright/test';

export class TrainingPage {
	readonly page: Page;
	readonly header: Locator;
	readonly trainingNavLink: Locator;
	readonly trainingNavIndicator: Locator;
	readonly userGuideButton: Locator;
	readonly userAvatar: Locator;
	readonly heroSection: Locator;
	readonly heroTextColumn: Locator;
	readonly heroEyebrow: Locator;
	readonly heroHeading: Locator;
	readonly heroImage: Locator;
	readonly trainingProgramSection: Locator;
	readonly trainingProgramHeading: Locator;
	readonly trainingProgramDescription: Locator;
	readonly primaryModuleGrid: Locator;
	readonly moduleCards: Locator;
	readonly moduleImages: Locator;

	constructor(page: Page) {
		this.page = page;
		this.header = page.locator('header#header').first();
		this.trainingNavLink = page
			.locator('header#header a')
			.filter({ hasText: new RegExp(`^\\s*${'Training'}\\s*$`, 'i') })
			.first();
		this.trainingNavIndicator = this.trainingNavLink.locator('span').first();
		this.userGuideButton = page
			.locator('header#header [data-slot="button"]')
			.filter({ hasText: new RegExp(`^\\s*${'User Guide'}\\s*$`, 'i') })
			.first();
		this.userAvatar = page.locator('header#header [data-slot="avatar"]').first();
		this.heroSection = page.locator('section.hero-section').first();
		this.heroTextColumn = this.heroSection.locator('> div > div').first();
		this.heroEyebrow = this.heroSection.getByText(/^TRAINING$/i).first();
		this.heroHeading = this.heroSection.locator('h1').first();
		this.heroImage = this.heroSection.locator('img[alt="Training materials showcase"]').first();
		this.trainingProgramSection = this.page
			.locator('section')
			.filter({
				has: this.page.locator('h2', {
					hasText: /Self-Paced Comprehensive Training Program/i
				})
			})
			.first();
		this.trainingProgramHeading = this.trainingProgramSection
			.locator('h2', {
				hasText: /Self-Paced Comprehensive Training Program/i
			})
			.first();
		this.trainingProgramDescription = this.trainingProgramSection.getByText(
			/The training program will include video content and resources to help you learn and build confidence in your dementia caregiving journey\./i
		);
		this.primaryModuleGrid = this.page
			.locator('section')
			.filter({ has: this.page.locator('[data-index]') })
			.first();
		this.moduleCards = this.page.locator('[data-index]');
		this.moduleImages = this.moduleCards.locator('img');
	}

	async goto() {
		await this.page.goto('/training');
		await expect(this.page).toHaveURL(/\/training(?:[/?#]|$)/);
		await expect(this.header).toBeVisible();
	}

	async expectActiveNavigationItem(itemLabel: string) {
		const targetLink = this.page
			.locator('header#header a')
			.filter({ hasText: new RegExp(`^\\s*${itemLabel}\\s*$`, 'i') })
			.first();

		await expect(targetLink).toBeVisible();

		const activeLinkCount = await this.page.locator('header#header a').evaluateAll((links) => {
			return links.filter((link) => {
				const spans = Array.from(link.querySelectorAll('span'));
				return spans.some((span) => {
					const rect = span.getBoundingClientRect();
					const styles = getComputedStyle(span);
					return (
						rect.width > 0 &&
						rect.height > 0 &&
						styles.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
						styles.backgroundColor !== 'transparent'
					);
				});
			}).length;
		});

		expect(activeLinkCount).toBe(1);

		const indicator = targetLink.locator('span').first();
		await expect(indicator).toBeVisible();

		const targetBounds = await targetLink.boundingBox();
		const indicatorBounds = await indicator.boundingBox();

		expect(targetBounds).not.toBeNull();
		expect(indicatorBounds).not.toBeNull();

		if (!targetBounds || !indicatorBounds) {
			throw new Error(`Missing bounds for ${itemLabel} navigation state`);
		}

		expect(indicatorBounds.width).toBeGreaterThan(targetBounds.width * 0.6);
		expect(indicatorBounds.y).toBeGreaterThanOrEqual(targetBounds.y + targetBounds.height - 16);
		expect(indicatorBounds.height).toBeGreaterThan(0);

		const indicatorColor = await indicator.evaluate(
			(element) => getComputedStyle(element).backgroundColor
		);
		expect(indicatorColor).toMatch(/rgb\(0, 0, 0\)|rgba\(0, 0, 0, 1\)|#000|#000000/);
	}

	async expectUserGuideButtonVisible() {
		const button = this.userGuideButton;
		const avatar = this.userAvatar;

		await expect(button).toBeVisible();
		await expect(button).toBeEnabled();

		// Icon (svg) and label (text) are visible
		await expect(button.locator('svg')).toBeVisible();
		await expect(button).toContainText(new RegExp(`^\\s*${'User Guide'}\\s*$`, 'i'));

		// Text is vertically centered: text bbox center aligns with button bbox center
		const buttonBox = await button.boundingBox();
		const labelBox = await button.locator('text=User Guide').boundingBox();
		expect(buttonBox).not.toBeNull();
		expect(labelBox).not.toBeNull();
		if (buttonBox && labelBox) {
			const buttonCenterY = buttonBox.y + buttonBox.height / 2;
			const labelCenterY = labelBox.y + labelBox.height / 2;
			expect(Math.abs(buttonCenterY - labelCenterY)).toBeLessThanOrEqual(4);
		}

		// Button does not overlap the user avatar
		const avatarBox = await avatar.boundingBox();
		expect(avatarBox).not.toBeNull();
		if (buttonBox && avatarBox) {
			const noOverlap =
				buttonBox.x + buttonBox.width <= avatarBox.x ||
				avatarBox.x + avatarBox.width <= buttonBox.x ||
				buttonBox.y + buttonBox.height <= avatarBox.y ||
				avatarBox.y + avatarBox.height <= buttonBox.y;
			expect(noOverlap).toBe(true);
		}
	}

	async expectTrainingHeroVisible() {
		await expect(this.heroSection).toBeVisible();
		await expect(this.heroTextColumn).toBeVisible();
		await expect(this.heroImage).toBeVisible();

		const heroBox = await this.heroSection.boundingBox();
		expect(heroBox).not.toBeNull();

		if (heroBox) {
			expect(heroBox.height).toBeGreaterThan(200);
			expect(heroBox.width).toBeGreaterThan(200);
		}

		const headerBox = await this.header.boundingBox();
		expect(headerBox).not.toBeNull();
		if (headerBox && heroBox) {
			const heroBottom = heroBox.y + heroBox.height;
			const headerBottom = headerBox.y + headerBox.height;
			expect(heroBottom).toBeGreaterThan(Math.max(headerBottom - 80, 0));
		}
	}

	async expectTrainingHeroEyebrow(label: string) {
		const eyebrow = this.page.getByText(new RegExp(`^\\s*${label}\\s*$`, 'i')).first();
		await expect(eyebrow).toBeVisible();

		const headingBox = await this.heroHeading.boundingBox();
		const eyebrowBox = await eyebrow.boundingBox();
		expect(headingBox).not.toBeNull();
		expect(eyebrowBox).not.toBeNull();

		if (headingBox && eyebrowBox) {
			expect(eyebrowBox.y).toBeLessThan(headingBox.y);
		}
	}

	async expectTrainingHeroHeading() {
		await expect(this.heroHeading).toBeVisible();
		await expect(this.heroHeading).toContainText(
			/Each week, we provide you with learning materials including interactive presentations, expert video content, and reflection questions\./i
		);

		const headingBox = await this.heroHeading.boundingBox();
		expect(headingBox).not.toBeNull();
		if (headingBox) {
			expect(headingBox.width).toBeGreaterThan(200);
			expect(headingBox.height).toBeGreaterThan(40);
		}
	}

	async expectTrainingHeroHeadingStyle() {
		await expect(this.heroHeading).toBeVisible();

		const fontFamily = await this.heroHeading.evaluate((element) =>
			getComputedStyle(element).fontFamily.toLowerCase()
		);
		const fontSize = await this.heroHeading.evaluate((element) =>
			Number.parseFloat(getComputedStyle(element).fontSize)
		);
		const lineHeight = await this.heroHeading.evaluate((element) =>
			Number.parseFloat(getComputedStyle(element).lineHeight)
		);
		const bgColor = await this.heroSection.evaluate(
			(element) => getComputedStyle(element).backgroundColor
		);
		const textColor = await this.heroHeading.evaluate(
			(element) => getComputedStyle(element).color
		);

		expect(fontFamily).toMatch(/baskerville|serif/);
		expect(fontSize).toBeGreaterThan(28);
		expect(lineHeight).toBeGreaterThan(1.2);
		expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
		expect(textColor).not.toBe(bgColor);
	}

	async expectTrainingProgramHeadingAndDescription() {
		await this.trainingProgramSection.scrollIntoViewIfNeeded();
		await expect(this.trainingProgramHeading).toBeVisible();
		await expect(this.trainingProgramHeading).toContainText(
			/Self-Paced Comprehensive Training Program/i
		);
		await expect(this.trainingProgramDescription).toBeVisible();
		await expect(this.trainingProgramDescription).toContainText(
			/The training program will include video content and resources to help you learn and build confidence in your dementia caregiving journey\./i
		);

		const headingBox = await this.trainingProgramHeading.boundingBox();
		const sectionBox = await this.trainingProgramSection.boundingBox();
		expect(headingBox).not.toBeNull();
		expect(sectionBox).not.toBeNull();

		if (headingBox && sectionBox) {
			const headingCenterX = headingBox.x + headingBox.width / 2;
			const sectionCenterX = sectionBox.x + sectionBox.width / 2;
			expect(Math.abs(headingCenterX - sectionCenterX)).toBeLessThanOrEqual(80);
			expect(headingBox.width).toBeGreaterThan(200);
			expect(headingBox.height).toBeGreaterThan(30);
		}
	}

	async expectModuleCount(expected: number) {
		await this.page.waitForFunction(
			() => document.querySelectorAll('[data-index]').length >= 1
		);
		await this.primaryModuleGrid.scrollIntoViewIfNeeded();
		await expect(this.primaryModuleGrid).toBeVisible();
		await expect(this.moduleCards).toHaveCount(expected);

		for (let i = 0; i < expected; i++) {
			await expect(this.moduleCards.nth(i)).toBeVisible();
		}
	}

	async expectModuleTitles() {
		const expectedTitles = [
			'Welcome and Overview',
			'Caregiving Principles & Values',
			'Communication & Behavior',
			'Home Safety & Mobility',
			'Nutrition, Eating & Oral Health',
			'Medication Management',
			'Managing Health Issues: Pain, Diabetes & UTIs',
			'Planning for the Future'
		];

		await this.page.waitForFunction(
			() => document.querySelectorAll('[data-index]').length >= 8
		);
		await expect(this.moduleCards).toHaveCount(8);

		for (let i = 0; i < expectedTitles.length; i++) {
			const title = expectedTitles[i];
			const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			await expect(this.moduleCards.nth(i)).toBeVisible();
			await expect(this.moduleCards.nth(i)).toContainText(new RegExp(escapedTitle, 'i'));
		}
	}

	async expectModuleOneAvailableState() {
		const moduleOne = this.moduleCards.first();
		await moduleOne.scrollIntoViewIfNeeded();
		await expect(moduleOne).toBeVisible();
		await expect(moduleOne).toContainText(/Module 1:\s*Welcome and Overview/i);
		await expect(moduleOne).toContainText(
			/Start here to get familiar with the program structure and how to navigate the course\./i
		);
		await expect(moduleOne).toContainText(/Approx\.\s*15\s*Sec/i);

		const availableBadge = moduleOne.getByText(/Available/i).first();
		await expect(availableBadge).toBeVisible();

		const startButton = moduleOne.getByRole('button', { name: /Start Module/i }).first();
		await expect(startButton).toBeVisible();
		await expect(startButton).toBeEnabled();

		await expect(moduleOne).not.toContainText(/Locked|Complete previous module to unlock/i);
	}

	async expectAllImagesLoaded() {
		await this.page.waitForFunction(
			() => document.querySelectorAll('[data-index] img').length >= 1
		);
		await this.primaryModuleGrid.scrollIntoViewIfNeeded();
		await expect(this.primaryModuleGrid).toBeVisible();

		const cardCount = await this.moduleCards.count();
		const imageCount = await this.moduleImages.count();
		expect(cardCount).toBeGreaterThan(0);
		expect(imageCount).toBe(cardCount);

		for (let i = 0; i < imageCount; i++) {
			const image = this.moduleImages.nth(i);
			await expect(image).toBeVisible();

			const src = await image.getAttribute('src');
			expect(src).not.toBeNull();
			expect(src?.trim().length ?? 0).toBeGreaterThan(0);

			const cardBox = await this.moduleCards.nth(i).boundingBox();
			expect(cardBox).not.toBeNull();

			const state = await image.evaluate((img: HTMLImageElement) => {
				const rect = img.getBoundingClientRect();
				return {
					complete: img.complete,
					naturalWidth: img.naturalWidth,
					naturalHeight: img.naturalHeight,
					width: rect.width,
					height: rect.height,
					display: getComputedStyle(img).display
				};
			});

			expect(state.complete).toBe(true);
			expect(state.naturalWidth).toBeGreaterThan(0);
			expect(state.naturalHeight).toBeGreaterThan(0);

			// Image stays inside its card boundaries (scroll-aware boxes).
			if (cardBox) {
				const imgBox = await image.boundingBox();
				expect(imgBox).not.toBeNull();
				if (imgBox) {
					expect(imgBox.x).toBeGreaterThanOrEqual(cardBox.x);
					expect(imgBox.y).toBeGreaterThanOrEqual(cardBox.y);
					expect(imgBox.x + imgBox.width).toBeLessThanOrEqual(cardBox.x + cardBox.width);
					expect(imgBox.y + imgBox.height).toBeLessThanOrEqual(
						cardBox.y + cardBox.height
					);
				}
			}
		}
	}
}
