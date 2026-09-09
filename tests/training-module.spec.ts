import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { TrainingPage } from './pages/TrainingPage';

const testEmail = 'tajulislam@inneed.cloud';
const testPassword = 'J0hnc3na';

function buildTrainingModules() {
	const modules = Array.from({ length: 8 }, (_, index) => ({
		id: index + 1,
		sort: index + 1,
		name: `Module ${index + 1}`,
		slug: `module-${index + 1}`,
		short_description: `Short description for module ${index + 1}`,
		feature_image: `module-${index + 1}.png`,
		video_length: `${index + 1} min`,
		translations: []
	}));

	modules[0] = {
		id: 1,
		sort: 1,
		name: 'Welcome and Overview',
		slug: 'welcome-and-overview',
		short_description:
			'Start here to get familiar with the program structure and how to navigate the course. We will introduce you to the goals of our training and show you how to get the most out of the resources available to you.',
		feature_image: 'module-1.png',
		video_length: 'Approx. 15 Sec',
		translations: []
	};

	modules[1] = {
		id: 2,
		sort: 2,
		name: 'Caregiving Principles & Values',
		slug: 'caregiving-principles-values',
		short_description: 'Discover the values and principles that guide compassionate, respectful caregiving.',
		feature_image: 'module-2.png',
		video_length: 'Approx. 10 Min',
		translations: []
	};

	modules[2] = {
		id: 3,
		sort: 3,
		name: 'Communication & Behavior',
		slug: 'communication-behavior',
		short_description: 'Learn how communication and behavior strategies can improve daily care and reduce stress.',
		feature_image: 'module-3.png',
		video_length: 'Approx. 12 Min',
		translations: []
	};

	modules[3] = {
		id: 4,
		sort: 4,
		name: 'Home Safety & Mobility',
		slug: 'home-safety-mobility',
		short_description: 'Build confidence in creating a safer home and supporting safe movement throughout the day.',
		feature_image: 'module-4.png',
		video_length: 'Approx. 15 Min',
		translations: []
	};

	modules[4] = {
		id: 5,
		sort: 5,
		name: 'Nutrition, Eating & Oral Health',
		slug: 'nutrition-eating-oral-health',
		short_description: 'Explore practical strategies for nutrition, eating support, and oral health routines.',
		feature_image: 'module-5.png',
		video_length: 'Approx. 18 Min',
		translations: []
	};

	modules[5] = {
		id: 6,
		sort: 6,
		name: 'Medication Management',
		slug: 'medication-management',
		short_description: 'Understand safe medication routines and how to support consistent, accurate care.',
		feature_image: 'module-6.png',
		video_length: 'Approx. 14 Min',
		translations: []
	};

	modules[6] = {
		id: 7,
		sort: 7,
		name: 'Managing Health Issues: Pain, Diabetes & UTIs',
		slug: 'managing-health-issues-pain-diabetes-utis',
		short_description: 'Learn how to recognize and respond to common health concerns with confidence and care.',
		feature_image: 'module-7.png',
		video_length: 'Approx. 16 Min',
		translations: []
	};

	modules[7] = {
		id: 8,
		sort: 8,
		name: 'Planning for the Future',
		slug: 'planning-for-the-future',
		short_description: 'Prepare for long-term care planning and future decision-making with practical guidance.',
		feature_image: 'module-8.png',
		video_length: 'Approx. 13 Min',
		translations: []
	};

	return modules;
}

async function ensureAuthenticated(page: Page) {
	let hasAccessToken = false;

	try {
		hasAccessToken = await page.evaluate(() => !!window.localStorage.getItem('access_token'));
	} catch {
		hasAccessToken = false;
	}

	if (hasAccessToken) {
		return;
	}

	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.signIn(testEmail, testPassword);
	await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
}

test.beforeEach(async ({ page }) => {
	await page.route('**/auth/api/v1/login', async (route) => {
		const request = route.request();
		const { email, password } = request.postDataJSON() as {
			email?: string;
			password?: string;
		};

		if (email === testEmail && password === testPassword) {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({
					access_token: 'playwright-access-token',
					refresh_token: 'playwright-refresh-token'
				})
			});
			return;
		}

		await route.fulfill({
			status: 401,
			contentType: 'application/json',
			body: JSON.stringify({ detail: 'Invalid username or password' })
		});
	});

	await page.route('**/items/training_modules*', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				data: buildTrainingModules()
			})
		});
	});

	await page.route('https://directus-dev.mycaregivingcircle.org/assets/**', async (route) => {
		const url = new URL(route.request().url());
		const filename = url.pathname.split('/').filter(Boolean).at(-1) ?? '';

		const image = await readFile(resolve('static', 'images', 'training', filename));

		await route.fulfill({
			status: 200,
			contentType: 'image/png',
			body: image
		});
	});

	await page.route('**/user-training/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				data: []
			})
		});
	});

	await ensureAuthenticated(page);
});

test('TC-TRAIN-UI-001: Training navigation item shows the active state', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectActiveNavigationItem('Training');
});

test('TC-TRAIN-UI-002: User Guide button is visible and does not overlap the avatar', async ({
	page
}) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectUserGuideButtonVisible();
});

test('TC-TRAIN-UI-003: Training hero section is displayed below the header', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectTrainingHeroVisible();
});

test('TC-TRAIN-UI-004: Training hero label is displayed', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectTrainingHeroEyebrow('TRAINING');
});

test('TC-TRAIN-UI-005: Training hero main heading is fully visible', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectTrainingHeroHeading();
});

test('TC-TRAIN-UI-006: Hero heading uses a readable serif style', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectTrainingHeroHeadingStyle();
});

test('TC-TRAIN-UI-007: Training program heading and description are visible and centered', async ({
	page
}) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectTrainingProgramHeadingAndDescription();
});

test('TC-TRAIN-UI-008: Module 1 is available with the expected content and CTA', async ({
	page
}) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectModuleOneAvailableState();
});

test('TC-TRAIN-UI-009: Module titles are present in the expected order', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectModuleTitles();
});

test('TC-TRAIN-UI-010: Primary training module count is eight', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectModuleCount(8);
});

test('TC-TRAIN-UI-011: All module images load', async ({ page }) => {
	const trainingPage = new TrainingPage(page);
	await trainingPage.goto();
	await trainingPage.expectAllImagesLoaded();
});
