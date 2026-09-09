import { expect, test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ResourceCollectionPage } from './pages/ResourceCollectionPage';
import { ResourcesPage } from './pages/ResourcesPage';

const testEmail = 'tajulislam@inneed.cloud';
const testPassword = 'J0hnc3na';

const clinicalGuidanceResources = [
	{
		id: 101,
		title: "Understanding Alzheimer's and Dementia",
		link: 'https://alzheimers.example.org/understanding',
		short_description:
			"An overview of Alzheimer's disease and related dementias, including symptoms, diagnosis, and care planning.",
		isCdc: false,
		category: {
			id: 'clinical-guidance',
			slug: 'clinical-guidance',
			name: 'Clinical Guidance',
			translations: []
		},
		translations: []
	},
	{
		id: 102,
		title: 'Managing Caregiver Stress',
		link: 'https://caregiver.example.org/stress',
		short_description:
			'Practical strategies to recognize and reduce caregiver stress while maintaining personal well-being.',
		isCdc: false,
		category: {
			id: 'clinical-guidance',
			slug: 'clinical-guidance',
			name: 'Clinical Guidance',
			translations: []
		},
		translations: []
	}
];

const resourceCategories = [
	{
		id: 'clinical-guidance',
		slug: 'clinical-guidance',
		name: 'Clinical Guidance',
		description: 'Medical advice, symptom management, and care strategies.',
		image: 'clinical-guidance.png',
		translations: []
	},
	{
		id: 'support-networks',
		slug: 'support-networks',
		name: 'Support Networks',
		description: 'Support groups, organizations, community centers, and advocacy networks.',
		image: 'support-networks.png',
		translations: []
	},
	{
		id: 'crisis-resources',
		slug: 'crisis-resources',
		name: 'Crisis Resources',
		description:
			'Emergency and mental-health crisis support, including caregiver burnout resources.',
		image: 'crisis-resources.png',
		translations: []
	},
	{
		id: 'our-publications',
		slug: 'our-publications',
		name: 'Our Publications',
		description: 'Research, articles, and caregiving insights from CIRCLE.',
		image: 'our-publications.png',
		translations: []
	},
	{
		id: 'legal-resources',
		slug: 'legal-resources',
		name: 'Legal Resources',
		description: 'Legal topics including power of attorney and advance directives.',
		image: 'legal-resources.png',
		translations: []
	},
	{
		id: 'federal-resources',
		slug: 'federal-resources',
		name: 'Federal Resources (NIH, CDC)',
		description:
			'Reliable government information, official guidelines, and fact sheets from NIH and CDC.',
		image: 'federal-resources.png',
		translations: []
	}
];

test.beforeEach(async ({ page, context }) => {
	let bookmarks: Array<Record<string, unknown>> = [];

	await page.route('**/auth/api/v1/login', async (route) => {
		const { email, password } = route.request().postDataJSON() as {
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

	await page.route('**/auth/api/v1/profile/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: { id: 'playwright-user', email: testEmail } })
		});
	});

	await page.route('**/bookmark/api/v1/bookmarks/**', async (route) => {
		const method = route.request().method();

		if (method === 'POST') {
			const bookmark = route.request().postDataJSON() as Record<string, unknown>;
			bookmarks = bookmarks.filter((item) => item.item_id !== bookmark.item_id);
			bookmarks.push(bookmark);
			await route.fulfill({
				status: 201,
				contentType: 'application/json',
				body: JSON.stringify({ data: bookmark })
			});
			return;
		}

		if (method === 'DELETE') {
			const itemId = route.request().url().split('/').pop();
			bookmarks = bookmarks.filter((item) => String(item.item_id) !== itemId);
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify({ data: [] })
			});
			return;
		}

		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: bookmarks })
		});
	});

	await page.route('**/training/api/v1/user-cohorts/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: [] })
		});
	});

	await page.route('**/dw/api/v1/items/resource_categories*', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: resourceCategories })
		});
	});

	await page.route('**/dw/api/v1/items/extarnal_resources*', async (route) => {
		const requestUrl = new URL(route.request().url());
		const isCountRequest = requestUrl.searchParams.has('aggregate[count]');
		const filterSlug = requestUrl.searchParams.get('filter[category][slug][_eq]');
		const searchQuery = requestUrl.searchParams.get('filter[title][_istarts_with]')?.toLowerCase() ?? '';

		let resources: unknown[] = [];
		if (filterSlug === 'clinical-guidance') {
			resources = clinicalGuidanceResources.filter((resource) =>
				resource.title.toLowerCase().startsWith(searchQuery)
			);
		}

		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({
				data: isCountRequest ? [{ count: String(resources.length) }] : resources
			})
		});
	});

	await context.route('https://*.example.org/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'text/html',
			body: '<!doctype html><html><head><title>Example Resource</title></head><body><h1>Example Resource</h1></body></html>'
		});
	});

	await page.route('https://directus-dev.mycaregivingcircle.org/assets/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'image/svg+xml',
			body: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="#f0c"/></svg>'
		});
	});

	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.signIn(testEmail, testPassword);
	await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
});

test('TC-RES-UI-001: authorized user can load the Resource Library', async ({ page }) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.expectResourceLibraryVisible();
	await expect(page.locator('body')).not.toContainText(
		/blank content|application error|unexpected failure/i
	);
});

test('TC-RES-UI-002: Resource Library header content is displayed correctly', async ({ page }) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.expectResourceLibraryHeader();
});

test('TC-RES-UI-003: all resource category cards display titles, icons, and descriptions', async ({
	page
}) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.expectAllResourceCardsContent();
});

test('TC-RES-CONTENT-004: resource category descriptions match their intended topics', async ({
	page
}) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.expectResourceDescriptionsCorrect();
});

test('TC-RES-FUNC-006: all resource cards open their correct resource collections', async ({
	page
}) => {
	const resourcesPage = new ResourcesPage(page);

	for (const title of resourceCategories.map((category) => category.name)) {
		await resourcesPage.goto();
		await resourcesPage.openResourceCategory(title);
		await resourcesPage.expectCorrectResourceCategory(title);
	}
});

test('TC-RES-NEG-007: resource card navigation does not produce application errors', async ({
	page
}) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.expectNoResourceNavigationErrors();
});

test('TC-RES-RWD-013: Resource Library displays correctly on tablet', async ({ page }) => {
	await page.setViewportSize({ width: 768, height: 1024 });

	const resourcesPage = new ResourcesPage(page);
	await resourcesPage.goto();
	await resourcesPage.expectTabletResourceLayout();
});

test('TC-RES-UI-018: all resource category icons load successfully', async ({ page }) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.expectAllResourceIconsLoaded();
});

test('TC-RES-RWD-014: Resource Library displays correctly on mobile', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });

	const resourcesPage = new ResourcesPage(page);
	await resourcesPage.goto();

	await resourcesPage.expectMobileResourceLayout();
});

test('TC-RES-FUNC-019: authorized user can open Clinical Guidance and read the first resource', async ({
	page,
	context
}) => {
	const resourcesPage = new ResourcesPage(page);

	await resourcesPage.goto();
	await resourcesPage.openClinicalGuidance();

	const firstResourceCard = page.locator('article').first();
	await expect(firstResourceCard).toBeVisible();
	await expect(
		firstResourceCard.getByRole('heading', { name: clinicalGuidanceResources[0].title })
	).toBeVisible();
	await expect(
		firstResourceCard.getByText(clinicalGuidanceResources[0].short_description)
	).toBeVisible();

	const firstReadMore = firstResourceCard.getByRole('link', { name: 'Read More' });
	await expect(firstReadMore).toBeVisible();
	await expect(firstReadMore).toHaveAttribute('href', clinicalGuidanceResources[0].link);
	await expect(firstReadMore).toHaveAttribute('target', '_blank');

	const { href } = await resourcesPage.clickFirstReadMore();
	expect(href).toBe(clinicalGuidanceResources[0].link);

	const popup = context.pages().find((candidate) => candidate !== page);
	expect(popup).toBeDefined();
	await expect(popup!).toHaveURL(clinicalGuidanceResources[0].link);

	await expect(firstResourceCard.getByRole('link', { name: 'Read More' })).toBeVisible();
});

test('TC-RES-FUNC-020: authorized user can bookmark a resource successfully', async ({ page }) => {
	const resourcesPage = new ResourcesPage(page);
	const resourceCollectionPage = new ResourceCollectionPage(page);

	await resourcesPage.goto();
	await resourcesPage.openClinicalGuidance();
	await resourceCollectionPage.bookmarkResource();
	await resourceCollectionPage.expectResourceBookmarked();

	await page.reload();
	await expect(page).toHaveURL(/\/resources\/clinical-guidance(?:[/?#]|$)/);
	await resourceCollectionPage.expectResourceBookmarked();
	await expect(page.locator('body')).not.toContainText(
		/404|500|application error|unexpected failure/i
	);
});

test('TC-RES-FUNC-021: authorized user can search resources by title', async ({ page }) => {
	const resourcesPage = new ResourcesPage(page);
	const resourceCollectionPage = new ResourceCollectionPage(page);

	await resourcesPage.goto();
	await resourcesPage.openClinicalGuidance();

	await resourceCollectionPage.searchResources('Understanding');
	await resourceCollectionPage.expectSearchResult(clinicalGuidanceResources[0].title);
	await expect(page.getByRole('heading', { name: clinicalGuidanceResources[1].title })).toHaveCount(0);

	await resourceCollectionPage.searchResources('does-not-exist');
	await resourceCollectionPage.expectNoSearchResults();
});
