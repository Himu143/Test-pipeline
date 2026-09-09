import { expect, test } from '@playwright/test';
import { LandingPage } from './pages/LandingPage';

/**
 * Unauthorized landing page regression suite.
 * Module purpose: validate the public landing experience for unauthenticated users,
 * including load state, navigation redirects, section content, responsiveness,
 * accessibility, browser edge cases, and negative stability checks.
 */

// Module 1: Public landing-page access and page-state validation

test('TC-LANDING-001 — Unauthorized Landing Page Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectNoVisibleError();
  await landingPage.expectPublicUrl();

  await expect(landingPage.signInLink).toBeVisible();
  await expect(landingPage.contactUsLink).toBeVisible();
  await expect(landingPage.heroParagraph).toBeVisible();
  await expect(page.locator('body')).toBeVisible();
});

test('TC-LANDING-002 — Unauthorized User Remains on Public Landing Page', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPublicUrl();
  await expect(page).not.toHaveURL(/\/home(?:[/?#]|$)/);
  await expect(page).not.toHaveURL(/\/auth\/(?:sign-in|forgot-password|set-new-pass)(?:[/?#]|$)/);
  await expect(landingPage.heroHeading).toBeVisible();
});

test('TC-LANDING-003 — Page Reload', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await page.reload();
  await landingPage.expectLoaded();
  await landingPage.expectNoVisibleError();
  await landingPage.expectPublicUrl();

  await expect(landingPage.header).toBeVisible();
  await expect(landingPage.heroSection).toBeVisible();
  await expect(landingPage.startTrainingButton).toBeVisible();
});

// Module 2: Hero section behavior and unauthorized redirect protections

test('TC-HERO-001 — Hero Section Content Validation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await expect(landingPage.heroSection).toBeVisible();
  await expect(landingPage.heroHeading).toContainText(/CIRCLE stands for/i);
  await expect(landingPage.heroHeading).toContainText(
    /Caregivers Involved in Resilience, Community, Learning, and Education\./i,
  );
  await expect(landingPage.heroParagraph).toHaveText(
    /Family caregivers of people living with dementia often face complex care tasks with little to no formal training\. This program is designed to provide them with the skills and confidence to care for their loved one\./i,
  );
  await expect(landingPage.startTrainingButton).toBeVisible();
  await expect(page.locator('img[alt="Caregivers with patient"]')).toBeVisible();
});

test('TC-HERO-004 — Hero Start Training Unauthorized Redirect', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.startTrainingButton.click();
  await landingPage.expectSignInNavigation();
  await expect(page).toHaveURL(/http:\/\/localhost:5173\/auth\/sign-in(?:[/?#]|$)/);
  await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible();
});

test('TC-HERO-005 — Hero Start Training Does Not Expose Protected Training', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.startTrainingButton.click();
  await landingPage.expectSignInNavigation();
  await expect(page).not.toHaveURL(/\/training(?:[/?#]|$)/);
  await expect(page.locator('body')).not.toContainText(/Self-Paced Comprehensive Training Program/i);
  await expect(page.locator('body')).not.toContainText(/CIRCLE stands for/i);
});

test('TC-HERO-006 — Hero Start Training Double Click', async ({ page, context }) => {
  test.skip(test.info().project.name === 'webkit', 'WebKit double-click navigation races the client-side protected-route redirect');
  const landingPage = new LandingPage(page);
  const initialPages = context.pages().length;

  await landingPage.goto();
  await landingPage.startTrainingButton.dblclick();
  await page.waitForURL(/http:\/\/localhost:5173\/auth\/sign-in(?:[/?#]|$)/, { timeout: 15000 });
  await expect(page).toHaveURL(/http:\/\/localhost:5173\/auth\/sign-in(?:[/?#]|$)/);
  await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible();
  expect(context.pages().length).toBe(initialPages);
});

test('TC-HERO-007 — Browser Back After Start Training Redirect', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.startTrainingButton.click();
  await landingPage.expectSignInNavigation();

  const signInUrl = page.url();
  await page.waitForTimeout(2000)
  await page.goBack();
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL(/http:\/\/localhost:5173\/auth\/sign-in(?:[/?#]|$)/);
  await expect(page).toHaveURL(signInUrl);
  await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible();
 await expect(page.locator('body')).not.toContainText(/CIRCLE stands for/i);
});

test('TC-HERO-003 — Hero Image Validation', async ({ page }) => {
  const landingPage = new LandingPage(page);
  const heroImage = page.locator('img[alt="Caregivers with patient"]');

  await landingPage.goto();
  await expect(heroImage).toBeVisible();
  await expect(heroImage).toHaveAttribute('src', /\/images\/hero-section\/hero\.webp$/);

  const imageInfo = await heroImage.evaluate((img: HTMLImageElement) => ({
    src: img.currentSrc || img.src,
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  }));

  expect(imageInfo.src).toBeTruthy();
  expect(imageInfo.complete).toBe(true);
  expect(imageInfo.naturalWidth).toBeGreaterThan(0);
  expect(imageInfo.naturalHeight).toBeGreaterThan(0);
});

// Module 3: About section and informational content validation

test('TC-ABOUT-001 — About CIRCLE Section Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutSectionVisible();
});

test('TC-ABOUT-002 — About CIRCLE Heading', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutSectionVisible();
  await expect(page.getByText(/Empowering Caregivers Through/i)).toBeVisible();
  await expect(page.getByText(/Evidence-Based Training/i)).toBeVisible();
});

test('TC-ABOUT-003 — About CIRCLE Description', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutDescription();
});

test('TC-ABOUT-004 — About CIRCLE Caregiver Image', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutImageLoaded();
});

test('TC-ABOUT-005 — 300+ Statistics Card', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutStatsCards();
  await expect(landingPage.aboutStat300).toBeVisible();
  await expect(page.getByText(/Caregivers have participated in previous versions of this program\./i)).toBeVisible();
});

test('TC-ABOUT-006 — 80% Statistics Card', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutStatsCards();
  await expect(landingPage.aboutStat80).toBeVisible();
  await expect(page.getByText(/Caregivers reported greater confidence in providing care after completing our earlier versions of the program\./i)).toBeVisible();
});

test('TC-ABOUT-007 — Statistics Cards Are Not Empty', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAboutStatsCards();

  const statCards = page.locator('div').filter({
    has: page.getByText(/300\+|80%/i)
  });

  await expect(statCards.first()).toContainText(/300\+|80%/i);
  await expect(statCards.first()).toContainText(/Caregivers/i);
  await expect(statCards.nth(1)).toContainText(/300\+|80%/i);
  await expect(statCards.nth(1)).toContainText(/Caregivers/i);
});

// Module 4: Study team section and member profile validation

test('TC-STUDY-001 — Study Team Section Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamSectionLoaded();
  await expect(page.locator('body')).not.toContainText(/404|not found|application error|500|internal server error/i);
});

test('TC-STUDY-002 — Study Team Heading and Description', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamHeadingAndDescription();
});

test('TC-STUDY-003 — Principal Investigator Name', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamInvestigatorName();
});

test('TC-STUDY-004 — Principal Investigator Designation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamInvestigatorDesignation();
});

test('TC-STUDY-005 — Principal Investigator Image', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamProfileImageLoaded();
});

test('TC-STUDY-006 — Study Team Profile Information Not Empty', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectStudyTeamProfileInfoNotEmpty();
});

// Module 5: Training section and protected-entry validation

test('TC-TRAINING-001 — Training Section Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTrainingSectionContent();
});

test('TC-TRAINING-002 — Training Description Validation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTrainingDescription();
});

test('TC-TRAINING-003 — Training Section Image', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTrainingImageLoaded();
});

test('TC-TRAINING-004 — Training Start Training Unauthorized Redirect', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.trainingStartButton.click();
  await landingPage.expectSignInNavigation();
  await expect(page).toHaveURL(/http:\/\/localhost:5173\/auth\/sign-in(?:[/?#]|$)/);
});

test('TC-TRAINING-005 — Protected Training Cannot Be Opened From Public CTA', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.trainingStartButton.click();
  await landingPage.expectSignInNavigation();
  await expect(page).not.toHaveURL(/\/training(?:[/?#]|$)/);
  await expect(page.locator('body')).not.toContainText(/Self-Paced Comprehensive Training Program/i);
});

// Module 6: Testimonial carousel content and navigation behavior

test('TC-TESTIMONIAL-001 — Testimonials Section Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTestimonialsSectionLoaded();
});

test('TC-TESTIMONIAL-002 — First Testimonial Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectFirstTestimonialContent();
});

test('TC-TESTIMONIAL-003 — Second Testimonial Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectSecondTestimonialContent();
});

test('TC-TESTIMONIAL-004 — Third Testimonial Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectThirdTestimonialContent();
});

test('TC-TESTIMONIAL-005 — Fourth Testimonial Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectFourthTestimonialContent();
});

test('TC-TESTIMONIAL-006 — Fifth Testimonial Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectFifthTestimonialContent();
});

test('TC-TESTIMONIAL-007 — Next Arrow Functionality', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectNextArrowMovesToNextTestimonial(
    'I don’t feel as anxious as I was, you know, just a few months ago. And I think hearing from professionals who are experts in their areas, the course, has a lot to do with it. So I just feel, I think my competence is, it’s night and day.',
    'Female Caregiver to her mother.',
    'It allowed to me to reflect on the care I am providing, how I have progressed. And it gave me a little more reassurance and confidence that I am doing something right and ways to improve.',
    'Male Caregiver to his wife.',
  );
});

test('TC-TESTIMONIAL-008 — Previous Arrow Functionality', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTestimonialQuoteAndAttribution(
    'I don’t feel as anxious as I was, you know, just a few months ago. And I think hearing from professionals who are experts in their areas, the course, has a lot to do with it. So I just feel, I think my competence is, it’s night and day.',
    'Female Caregiver to her mother.',
  );
  await landingPage.clickNextTestimonial();
  await landingPage.expectPreviousArrowReturnsToPreviousTestimonial(
    'I don’t feel as anxious as I was, you know, just a few months ago. And I think hearing from professionals who are experts in their areas, the course, has a lot to do with it. So I just feel, I think my competence is, it’s night and day.',
    'Female Caregiver to her mother.',
    'It allowed to me to reflect on the care I am providing, how I have progressed. And it gave me a little more reassurance and confidence that I am doing something right and ways to improve.',
    'Male Caregiver to his wife.',
  );
});

test('TC-TESTIMONIAL-009 — All Testimonials Reachable', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAllTestimonialsReachable();
});

test('TC-TESTIMONIAL-010 — Quote and Attribution Stay Synchronized', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTestimonialQuoteAndAttribution(
    'I don’t feel as anxious as I was, you know, just a few months ago. And I think hearing from professionals who are experts in their areas, the course, has a lot to do with it. So I just feel, I think my competence is, it’s night and day.',
    'Female Caregiver to her mother.',
  );
  await landingPage.clickNextTestimonial();
  await landingPage.expectTestimonialQuoteAndAttribution(
    'It allowed to me to reflect on the care I am providing, how I have progressed. And it gave me a little more reassurance and confidence that I am doing something right and ways to improve.',
    'Male Caregiver to his wife.',
  );
  await landingPage.clickNextTestimonial();
  await landingPage.expectTestimonialQuoteAndAttribution(
    'I just feel a little more confident. You know, because I know more. And the more you know, the more confident you are and the better you are to cope with the challenges that change and present themselves every day.',
    'Female Caregiver to her grandmother.',
  );
});

test('TC-TESTIMONIAL-011 — Carousel Boundary Behavior', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectCarouselBoundaryBehavior();
});

test('TC-TESTIMONIAL-012 — Rapid Carousel Arrow Clicks', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectRapidClicksStayStable();
});

test('TC-TESTIMONIAL-013 — Testimonial Arrow Keyboard Accessibility', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectTestimonialArrowKeyboardAccessibility();
});

// Module 7: Partnership logo validation and public sponsorship section checks

test('TC-PARTNER-001 — Developed in Partnership Section Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPartnershipSectionLoaded();
  await expect(page.locator('body')).not.toContainText(/404|not found|application error|500|internal server error/i);
});

test('TC-PARTNER-002 — UT Health San Antonio Logo', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPartnerLogoLoaded(landingPage.utHealthLogo, 'UT Health San Antonio');
});

test('TC-PARTNER-003 — UT San Antonio Logo', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPartnerLogoLoaded(landingPage.utSanAntonioLogo, 'UT San Antonio');
});

test('TC-PARTNER-004 — UT Health San Antonio School of Nursing Logo', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPartnerLogoLoaded(landingPage.nursingLogo, 'UT Health San Antonio School of Nursing');
});

test('TC-PARTNER-005 — InNeed Logo', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectPartnerLogoLoaded(landingPage.inneedLogo, 'InNeed');
});

test('TC-PARTNER-006 — All Expected Partner Logos Exist', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectAllExpectedPartnerLogosExist();
  await landingPage.expectPartnerLogosLoaded();
});

// Module 8: Header, navigation, and contact/sign-in entry points

test('TC-HEADER-002 — CIRCLE Header Logo Load', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectLogoImageLoaded();
});

test('TC-HEADER-003 — CIRCLE Logo Navigation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await page.mouse.wheel(0, 800);
  await landingPage.clickLogo();
  await landingPage.expectHomeNavigation();
});

test('TC-HEADER-004 — Language Selector Open', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.openLanguageMenu();
  await landingPage.expectLanguageOptionsVisible();
});

test('TC-HEADER-005 — Language Selector Repeated Toggle', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();

  for (let index = 0; index < 3; index++) {
    await landingPage.openLanguageMenu();
    await landingPage.languageTrigger.click();
    await landingPage.expectLanguageToggleClosed();
  }

  await landingPage.openLanguageMenu();
  await expect(landingPage.languageOptionEnglish).toHaveCount(1);
  await expect(landingPage.languageOptionSpanish).toHaveCount(1);
  
});

test('TC-HEADER-006 — Contact Us Navigation, Content, and Form Validation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await expect(landingPage.contactUsLink).toBeVisible();
  await landingPage.clickContactUs();
  await landingPage.expectContactUsNavigation();

  await expect(
    page.getByRole('heading', { name: /Begin Your CIRCLE Journey Today - Contact Us/i }),
  ).toBeVisible();
  await expect(page.getByText(/Reach out to collaborate, share ideas/i)).toBeVisible();

  const nameField = page.locator('#name');
  const emailField = page.locator('#email');
  const relationshipField = page.locator('#relation_with_patient');
  const messageField = page.locator('#message');

  await expect(nameField).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(relationshipField).toBeVisible();
  await expect(messageField).toBeVisible();

  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.locator('body')).toContainText(/Name can't be empty/i);
  await expect(page.locator('body')).toContainText(/Email can't be empty/i);
  await expect(page.locator('body')).toContainText(/Relationship can't be empty/i);
  await expect(page.locator('body')).toContainText(/Message can't be empty/i);

  await page.route('**/dw/api/v2/contact-us', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'ok' })
    });
  });

  await nameField.fill('CIRCLE QA User');
  await emailField.fill('qa.circle@example.com');
  await relationshipField.fill('Family caregiver');
  await messageField.fill('Hello from Playwright automation.');
  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.getByText(/Your message has been sent successfully!/i)).toBeVisible();

  await nameField.fill('CIRCLE QA User');
  await emailField.fill('qa.circle.example.com');
  await relationshipField.fill('Family caregiver');
  await messageField.fill('Hello from Playwright automation.');
  await page.getByRole('button', { name: /send/i }).click();

  await expect(page.locator('body')).toContainText(/Not a valid email/i);
});

test('TC-HEADER-007 — Sign In Navigation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.clickSignIn();
  await landingPage.expectSignInNavigation();
  await expect(page.getByRole('button', { name: /^sign in$/i })).toBeVisible();
  await expect(page.getByText(/welcome, please enter your details to sign in to your account/i)).toBeVisible();
});

test('TC-HEADER-008 — Header Keyboard Navigation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(landingPage.contactUsLink).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(landingPage.signInLink).toBeFocused();

  await page.keyboard.press('Enter');
  await landingPage.expectSignInNavigation();
});

test('TC-HEADER-009 — Header Broken Link Validation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectHeaderLinksValid();
  await landingPage.contactUsLink.click();
  await landingPage.expectContactUsNavigation();

  await page.goto('/');
  await landingPage.clickSignIn();
  await landingPage.expectSignInNavigation();
});

// Module 9: Responsive layout checks across desktop, tablet, and mobile breakpoints

test('TC-RESPONSIVE-001 — Desktop Layout', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.setViewport(1440, 900);
  await landingPage.goto();
  await landingPage.expectResponsiveLayout();
  await landingPage.expectNoHorizontalOverflow();
});

test('TC-RESPONSIVE-002 — Tablet Layout', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.setViewport(768, 1024);
  await landingPage.goto();
  await landingPage.expectResponsiveLayout();
  await landingPage.expectNoHorizontalOverflow();
});

test('TC-RESPONSIVE-003 — Mobile Layout', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.setViewport(390, 844);
  await landingPage.goto();
  await landingPage.openMobileMenu();
  await landingPage.expectResponsiveLayout();
  await landingPage.expectNoHorizontalOverflow();
  await expect(page.getByRole('link', { name: /sign in/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /start training/i }).first()).toBeVisible();
  await expect(landingPage.testimonialsNextButton).toBeVisible();
  await expect(landingPage.partnershipSection).toBeVisible();
});

test('TC-RESPONSIVE-004 — Small Mobile Width', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.setViewport(320, 700);
  await landingPage.goto();
  await landingPage.expectResponsiveLayout();
  await landingPage.expectNoHorizontalOverflow();
});

// Module 10: Accessibility and keyboard navigation validation

test('TC-A11Y-001 — Keyboard Tab Order', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectKeyboardTabOrder();
});

test('TC-A11Y-002 — Buttons Have Accessible Names', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectButtonsHaveAccessibleNames();
});

test('TC-A11Y-003 — Heading Structure', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectHeadingStructure();
});

// Module 11: Edge-case browser behavior and navigation stability checks

test('TC-EDGE-001 — Full Page Repeated Scroll', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectRepeatedScrollIsStable();
});

test('TC-EDGE-002 — Rapid Navigation Between Header and Footer Links', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectRapidNavigationBetweenHeaderAndFooterLinks();
});

test('TC-EDGE-003 — Browser Forward and Back Navigation', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.expectBrowserHistoryWorks();
});

// Module 12: Negative and stability checks for runtime errors and placeholder content

test('TC-NEGATIVE-001 — No Visible Placeholder or Undefined Content', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.expectNoPlaceholderText();
});

test('TC-NEGATIVE-002 — No Critical Console Errors', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.expectNoCriticalConsoleOrPageErrors();
});

test('TC-NEGATIVE-003 — No Unhandled Page Errors', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await landingPage.heroSection.scrollIntoViewIfNeeded();
  await landingPage.startTrainingButton.click();
  await landingPage.expectSignInNavigation();
  await landingPage.goto();
  await landingPage.testimonialsNextButton.click();
  await landingPage.page.getByRole('button', { name: /submit/i }).first().click();

  expect(pageErrors).toEqual([]);
});
