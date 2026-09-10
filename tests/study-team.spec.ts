import { expect, test, type Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { StudyTeamPage } from './pages/StudyTeam';

const testEmail = 'tajulislam@inneed.cloud';
const testPassword = 'J0hnc3na';

async function ensureAuthenticated(page: Page) {
	const hasAccessToken = await page.evaluate(() => !!window.localStorage.getItem('access_token'));

	if (hasAccessToken) {
		return;
	}

	const loginPage = new LoginPage(page);
	await loginPage.goto();
	await loginPage.signIn(testEmail, testPassword);
	await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
}

test.beforeEach(async ({ page }) => {
	await page.route('**/auth/api/v1/me', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ email: testEmail, fullName: 'Test User', role: 'user' })
		});
	});

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

	await page.route('**/dw/api/v2/support-us', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ message: 'Support request received' })
		});
	});

	await page.route('**/bookmark/api/v1/bookmarks/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: [] })
		});
	});

	await page.route('**/training/api/v1/user-cohorts/**', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: [] })
		});
	});

	await page.route('**/dw/api/v1/items/training_modules*', async (route) => {
		await route.fulfill({
			status: 200,
			contentType: 'application/json',
			body: JSON.stringify({ data: [] })
		});
	});

	await page.route('**/training/api/v1/user-training*', async (route) => {
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
			body: JSON.stringify({ data: [] })
		});
	});

	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.signIn(testEmail, testPassword);
	await expect(page).toHaveURL(/\/home(?:[/?#]|$)/);
});

test('TC-STUDY-001: Study Team page loads successfully', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);
	await studyTeamPage.goto();

	await expect(page).toHaveURL(/\/home#study-team-section$/);
	await expect(studyTeamPage.studyTeamSection).toBeVisible();
	await expect(studyTeamPage.studyTeamHeading).toBeVisible();
	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-STUDY-002: Who We Are section displays founder content', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();

	await expect(studyTeamPage.whoWeAreSection).toBeVisible();
	await expect(studyTeamPage.whoWeAreHeading).toBeVisible();
	await expect(studyTeamPage.whoWeAreHeading).toHaveCount(1);
	await expect(studyTeamPage.founderName).toBeVisible();
	await expect(studyTeamPage.founderName).toHaveCount(1);
	await expect(studyTeamPage.founderRole).toBeVisible();
	await expect(studyTeamPage.founderRole).toHaveCount(1);
	await expect(studyTeamPage.founderHeading).toBeVisible();
	await expect(studyTeamPage.founderHeading).toHaveCount(1);
	await expect(studyTeamPage.founderDescription).toBeVisible();
	await expect(studyTeamPage.founderDescription).toHaveCount(1);
	await studyTeamPage.founderName.scrollIntoViewIfNeeded();
	await expect(studyTeamPage.founderImage).toBeVisible();
	await expect(studyTeamPage.founderImage).toHaveCSS(
		'background-image',
		/hero-section\/hero-image\.png/
	);
	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-STUDY-003: Study Team content displays completely', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();

	await expect(studyTeamPage.studyTeamSection).toBeVisible();
	await expect(studyTeamPage.studyTeamHeading).toBeVisible();
	await expect(studyTeamPage.welcomeHeading).toBeVisible();
	await expect(studyTeamPage.researchTeamSection).toBeVisible();
	for (const introductionParagraph of studyTeamPage.researchIntroduction) {
		await expect(introductionParagraph).toBeVisible();
		await expect(introductionParagraph).toHaveCount(1);
	}

	await expect(studyTeamPage.memberNames).toHaveCount(4);
	await expect(
		studyTeamPage.studyTeamSection.getByRole('heading', {
			name: 'Bianca Shieu, PhD, RN',
			exact: true
		})
	).toHaveCount(2);
	for (const memberRole of studyTeamPage.memberRoles) {
		await expect(memberRole).toHaveCount(1);
	}

	for (const memberImage of studyTeamPage.memberImages) {
		await expect(memberImage).toBeVisible();
		await expect(memberImage).toHaveCSS('background-image', /url\([^)]+\)/);
	}

	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-STUDY-004: Study Team tabs display the correct content', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();
	await expect(studyTeamPage.researchTeamTab).toBeEnabled();
	await expect(studyTeamPage.researchStaffTab).toBeEnabled();
	await expect(studyTeamPage.systemTeamTab).toBeEnabled();

	await studyTeamPage.researchTeamTab.click();
	await expect(studyTeamPage.researchTeamContent).toBeVisible();
	await expect(studyTeamPage.researchStaffContent).toBeHidden();
	await expect(studyTeamPage.systemTeamContent).toBeHidden();

	await studyTeamPage.researchStaffTab.click();
	await expect(studyTeamPage.researchStaffContent).toBeVisible();
	await expect(studyTeamPage.researchTeamContent).toBeHidden();
	await expect(studyTeamPage.systemTeamContent).toBeHidden();

	await studyTeamPage.systemTeamTab.click();
	await expect(studyTeamPage.systemTeamContent).toBeVisible();
	await expect(studyTeamPage.researchTeamContent).toBeHidden();
	await expect(studyTeamPage.researchStaffContent).toBeHidden();
});

test('TC-STUDY-005: Research Staff content displays completely', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();
	await studyTeamPage.researchStaffTab.click();

	await expect(studyTeamPage.researchStaffContent).toBeVisible();
	await expect(studyTeamPage.researchStaffMemberNames).toHaveCount(4);
	for (const memberRole of studyTeamPage.researchStaffMemberRoles) {
		await expect(memberRole).toBeVisible();
		await expect(memberRole).toHaveCount(1);
	}

	for (const introductionParagraph of studyTeamPage.researchIntroduction) {
		await expect(introductionParagraph).toBeVisible();
		await expect(introductionParagraph).toHaveCount(1);
	}

	await expect(studyTeamPage.researchStaffMemberImages).toHaveCount(4);
	for (let imageIndex = 0; imageIndex < 4; imageIndex += 1) {
		const memberImage = studyTeamPage.researchStaffMemberImages.nth(imageIndex);
		await expect(memberImage).toBeVisible();
		await expect(memberImage).toHaveCSS('background-image', /url\([^)]+\)/);
	}

	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-STUDY-006: System Team content displays completely', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();
	await studyTeamPage.systemTeamTab.click();

	await expect(studyTeamPage.systemTeamContent).toBeVisible();
	for (const introductionParagraph of studyTeamPage.systemTeamIntroduction) {
		await expect(introductionParagraph).toBeVisible();
		await expect(introductionParagraph).toHaveCount(1);
	}

	for (const memberName of studyTeamPage.systemTeamMemberNames) {
		await expect(memberName).toBeVisible();
		await expect(memberName).toHaveCount(1);
	}
	for (const memberRole of studyTeamPage.systemTeamMemberRoles) {
		await expect(memberRole).toBeVisible();
		await expect(memberRole).toHaveCount(1);
	}

	const memberCards = studyTeamPage.studyTeamSection.locator('div').filter({
		has: page.getByRole('heading', { name: 'Shamim Ashrafi', exact: true })
	});
	await expect(memberCards.first()).toContainText('Chief Product Architect');
	await expect(
		studyTeamPage.studyTeamSection
			.locator('div')
			.filter({
				has: page.getByRole('heading', { name: 'Shaman Sharif', exact: true })
			})
			.first()
	).toContainText('System Architect');
	await expect(
		studyTeamPage.studyTeamSection
			.locator('div')
			.filter({
				has: page.getByRole('heading', { name: 'Mahdi Bakhtiar', exact: true })
			})
			.first()
	).toContainText('Product Designer');
	await expect(
		studyTeamPage.studyTeamSection
			.locator('div')
			.filter({
				has: page.getByRole('heading', { name: 'Prodipto Archo', exact: true })
			})
			.first()
	).toContainText('Business Dev. Manager');

	await expect(studyTeamPage.systemTeamMemberImages).toHaveCount(4);
	for (let imageIndex = 0; imageIndex < 4; imageIndex += 1) {
		const memberImage = studyTeamPage.systemTeamMemberImages.nth(imageIndex);
		await expect(memberImage).toBeVisible();
		await expect(memberImage).toHaveCSS('background-image', /url\([^)]+\)/);
	}

	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});

test('TC-STUDY-HEADER-001: main header navigation is visible', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();

	await expect(studyTeamPage.header).toBeVisible();
	await expect(studyTeamPage.logo).toBeVisible();
	await expect(studyTeamPage.studyTeamLink).toBeVisible();
	await expect(studyTeamPage.trainingLink).toBeVisible();
	await expect(studyTeamPage.communityLink).toBeVisible();
	await expect(studyTeamPage.resourcesLink).toBeVisible();
	await expect(studyTeamPage.languageButton).toBeVisible();
	await expect(studyTeamPage.userGuideButton).toBeVisible();
});

test('TC-STUDY-007: Support Us section accepts a valid email', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();

	await expect(studyTeamPage.supportUsSection).toBeVisible();
	await expect(studyTeamPage.supportUsHeading).toBeVisible();
	await expect(studyTeamPage.supportDescription).toBeVisible();
	await expect(studyTeamPage.supportEmailInput).toBeVisible();
	await expect(studyTeamPage.supportSubmitButton).toBeVisible();
	await studyTeamPage.submitSupportEmail('himu111@example.com');
	await expect(studyTeamPage.supportSuccessMessage).toBeVisible();
	await expect(studyTeamPage.supportEmailInput).toHaveValue('');
});

test('TC-STUDY-011: Support Us rejects empty and invalid emails', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();
	await studyTeamPage.supportUsSection.scrollIntoViewIfNeeded();

	await expect(studyTeamPage.supportEmailInput).toHaveValue('');
	await studyTeamPage.supportSubmitButton.click();
	await expect(studyTeamPage.supportEmailValidationMessage).toHaveText("Email can't be empty");
	await expect(studyTeamPage.supportSuccessMessage).toBeHidden();

	await studyTeamPage.supportEmailInput.fill('invalid-email');
	await studyTeamPage.supportSubmitButton.click();
	await expect(studyTeamPage.supportEmailValidationMessage).toHaveText('Not a valid email');
	await expect(studyTeamPage.supportSuccessMessage).toBeHidden();
});

test('TC-STUDY-008: Footer content is displayed correctly', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await studyTeamPage.goto();
	await studyTeamPage.footer.scrollIntoViewIfNeeded();

	await expect(studyTeamPage.footer).toBeVisible();
	await expect(studyTeamPage.footerLogo).toBeVisible();
	await expect(studyTeamPage.footerDisclaimer).toBeVisible();
	for (const disclaimerParagraph of studyTeamPage.footerDisclaimerParagraphs) {
		await expect(disclaimerParagraph).toBeVisible();
		await expect(disclaimerParagraph).toHaveCount(1);
	}
	await expect(studyTeamPage.footerContactInformation).toBeVisible();
	await expect(studyTeamPage.footerCopyright).toBeVisible();
	await expect(studyTeamPage.footerCopyright).toContainText(
		'2025 Developed by InNeed Intelligent Cloud. All rights reserved - The University of Texas at San Antonio.'
	);
});

test('TC-STUDY-009: Footer quick links navigate correctly', async ({ page }) => {
	const studyTeamPage = new StudyTeamPage(page);

	await ensureAuthenticated(page);
	await studyTeamPage.goto();
	await studyTeamPage.footer.scrollIntoViewIfNeeded();

	await studyTeamPage.footerStudyTeamLink.click();
	await expect(page).toHaveURL(/\/home#study-team-section$/);
	await expect(studyTeamPage.studyTeamSection).toBeVisible();

	await studyTeamPage.footer.scrollIntoViewIfNeeded();
	await studyTeamPage.footerTrainingLink.click();
	await expect(page).toHaveURL(/\/training(?:[/?#]|$)/);
	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);

	await ensureAuthenticated(page);
	await studyTeamPage.goto();
	await studyTeamPage.footer.scrollIntoViewIfNeeded();
	await studyTeamPage.footerCommunityLink.click();
	await expect(page).toHaveURL(/\/community(?:[/?#]|$)/);
	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);

	await ensureAuthenticated(page);
	await studyTeamPage.goto();
	await studyTeamPage.footer.scrollIntoViewIfNeeded();
	await studyTeamPage.footerResourcesLink.click();
	await expect(page).toHaveURL(/\/resources(?:[/?#]|$)/);
	await expect(page.locator('body')).not.toContainText(/404|not found|application error/i);
});
