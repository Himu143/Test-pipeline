# CIRCLE Unauthorized Landing Page — Playwright MCP Test Cases Using POM

**Base URL:** [http://localhost:5173/](http://localhost:5173/)  
**Architecture:** Page Object Model (POM)  
**Tool:** Playwright MCP  
**API Testing:** Out of scope  
**Authentication State:** User is not signed in unless a test explicitly states otherwise.

---

# Recommended POM Structure

```text
tests/
├── pages/
│   ├── LandingPage.ts
│   ├── SignInPage.ts
│   └── components/
│       ├── HeaderComponent.ts
│       ├── HeroSection.ts
│       ├── AboutCircleSection.ts
│       ├── StudyTeamSection.ts
│       ├── TrainingSection.ts
│       ├── TestimonialsSection.ts
│       ├── PartnershipSection.ts
│       ├── SupportUsSection.ts
│       └── FooterComponent.ts
│
├── specs/
│   └── unauthorized-landing-page.spec.ts
│
└── fixtures/
    └── test-data.ts
```

# POM Responsibility

**LandingPage.ts**
- Open landing page
- Verify page loaded
- Scroll to sections
- Validate full-page state
- Expose section/component objects

**HeaderComponent.ts**
- CIRCLE logo
- Language selector
- Contact Us
- Sign In
- Header navigation and link validation

**HeroSection.ts**
- Hero headings and description
- Hero image
- Start Training CTA
- Unauthorized redirect validation

**AboutCircleSection.ts**
- About CIRCLE heading and content
- Caregiver image
- 300+ card
- 80% card

**StudyTeamSection.ts**
- Study Team heading and description
- Bianca Shieu profile
- Principal Investigator designation
- Profile image

**TrainingSection.ts**
- Training heading and description
- Training image
- Start Training CTA
- Authentication redirect

**TestimonialsSection.ts**
- Testimonial quote
- Caregiver attribution
- Previous/Next controls
- Carousel state and boundary behavior

**PartnershipSection.ts**
- Partnership heading
- UT Health San Antonio logo
- UT San Antonio logo
- School of Nursing logo
- InNeed logo

**SupportUsSection.ts**
- Heading and description
- Email input
- Submit button
- Form validation and submission behavior

**FooterComponent.ts**
- Disclaimer content
- Phone/email
- Footer logo
- Quick Links
- Language links
- Copyright
- Footer link verification

**SignInPage.ts**
- Validate `/auth/sign-in`
- Validate Sign In page is displayed after protected CTA redirect

---

# POM Usage Rule

Test specs should contain **test intent and assertions only**.  
Selectors and reusable UI actions must stay inside the Page Objects.

Example:

```ts
test('TC-HERO-004 — Hero Start Training Unauthorized Redirect', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.goto();
  await landingPage.hero.clickStartTraining();

  await landingPage.expectSignInRedirect();
});
```

Avoid putting raw selectors such as `page.locator(...)`, CSS, or XPath directly inside the test specification unless there is a strong one-off reason.

---

## TC-LANDING-001 — Unauthorized Landing Page Load (Done)

**Page:** CIRCLE Unauthorized Landing Page  

**URL:** [http://localhost:5173/](http://localhost:5173/)  

**Test Type:** UI + Functional + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `goto(), expectLoaded(), expectNoVisibleError(), expectPublicUrl()`

### Steps

1. Open the landing page URL.
2. Verify the page loads successfully.
3. Verify the CIRCLE header is displayed.
4. Verify the hero section is displayed.
5. Verify the page does not show a 404, 500, application crash, or visible development error.

**Expected:** The unauthorized CIRCLE landing page loads successfully without visible errors.

---

## TC-LANDING-002 — Unauthorized User Remains on Public Landing Page (Done)

**Page:** CIRCLE Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `goto(), expectLoaded(), expectNoVisibleError(), expectPublicUrl()`

### Steps

1. Start a fresh browser context with no authentication session.
2. Open `http://localhost:5173/`.
3. Wait until the page is loaded.
4. Verify the current URL.

**Expected:** The user remains on `http://localhost:5173/` and is not automatically redirected to a protected page.

---

## TC-LANDING-003 — Page Reload (Done)

**Page:** CIRCLE Unauthorized Landing Page  

**Test Type:** Functional + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `goto(), expectLoaded(), expectNoVisibleError(), expectPublicUrl()`

### Steps

1. Open the landing page.
2. Reload the browser page.
3. Verify the header is displayed.
4. Verify the hero section is displayed.
5. Verify no visible error is displayed.

**Expected:** The page reloads successfully and all primary landing-page content remains available.

---

# Header (Done all )

## TC-HEADER-001 — Header Content Validation (Done)

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Open the landing page.
2. Verify the CIRCLE logo is displayed in the header.
3. Verify the language control displays **English** or the configured English label.
4. Verify **Contact Us** is displayed.
5. Verify **Sign In** is displayed.

**Expected:** All required header content is visible.

---

## TC-HEADER-002 — CIRCLE Header Logo Load  (Done)

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Locate the CIRCLE logo in the header.
2. Verify the logo is visible.
3. Verify the logo image has a non-empty `src`.
4. Verify the image has loaded by checking `naturalWidth > 0`.
5. Verify the image has loaded by checking `naturalHeight > 0`.

**Expected:** The CIRCLE logo loads successfully and is not broken.

---

## TC-HEADER-003 — CIRCLE Logo Navigation (Done)

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Open the landing page.
2. Scroll down the page.
3. Click the CIRCLE logo in the global header.
4. Verify the resulting URL or page position.

**Expected:** Clicking the logo returns the user to the landing page/home location according to the implemented design.

---

## TC-HEADER-004 — Language Selector Open

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Locate the language selector in the header.
2. Click the language selector.
3. Verify the language menu opens.
4. Verify **English** is available.
5. Verify **Spanish** is available if Spanish is implemented.

**Expected:** The language selector opens and configured language options are displayed.

---

## TC-HEADER-005 — Language Selector Repeated Toggle

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Click the language selector.
2. Close the language selector.
3. Repeat the open and close action several times.
4. Verify the menu remains functional.
5. Verify duplicated menu items are not created.

**Expected:** The language selector opens and closes normally on repeated use.

---

## TC-HEADER-006 — Contact Us Navigation, Content, and Form Validation

**Page:** Unauthorized Landing Page → Contact Us Page  

**Test Type:** UI + Functional + Navigation + Content Validation + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`, `ContactUsPage`  

**POM Methods:** `clickContactUs(), expectContactUsPageLoaded(), expectContentVisible(), validateRequiredFields(), fillContactForm(), submitForm(), expectValidationMessage(), expectSuccessfulSubmission()`

### Steps
1. Open the unauthorized landing page.
2. Verify the **Contact Us** link/button is visible in the header.
3. Click **Contact Us**.
4. Wait for navigation to complete.
5. Verify the Contact Us page/section is displayed.
6. Verify the browser navigates to the configured Contact Us URL.
7. Verify no **404**, **500**, blank page, or visible application error is displayed.
8. Verify the Contact Us page heading is displayed.
9. Verify the expected description/instructions are visible.
10. Verify the Contact Us form is displayed and the required fields are visible.
11. Leave all required fields empty and click **Send**.
12. Verify validation messages are displayed for all required fields.
13. Enter valid data into all required fields, including a valid email.
14. Click **Send** again.
15. Verify the configured success confirmation message is displayed.
16. Enter an invalid email format and submit.
17. Verify the invalid email is rejected and an email validation message is displayed.
18. Verify the Contact Us page remains stable after validation errors and supports correction and resubmission.

**Expected:** Clicking **Contact Us** successfully navigates the unauthorized user to the configured Contact Us page. The page loads without broken routes or visible errors, the content and form are displayed correctly, required-field validation prevents empty submissions, invalid email formats are rejected, valid submissions are accepted, and the success confirmation appears as expected.

---

## TC-HEADER-007 — Sign In Navigation

**Page:** Unauthorized Landing Page  

**URL:** [http://localhost:5173/auth/sign-in](http://localhost:5173/auth/sign-in)  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Open the landing page.
2. Click **Sign In**.
3. Wait for navigation.
4. Verify the current URL.

**Expected:** The user is redirected to `http://localhost:5173/auth/sign-in`.

---

## TC-HEADER-008 — Header Keyboard Navigation

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Open the landing page.
2. Use the `Tab` key to move through header controls.
3. Verify the language control receives focus.
4. Verify **Contact Us** receives focus.
5. Verify **Sign In** receives focus.
6. Press `Enter` on **Sign In**.

**Expected:** Header controls are keyboard accessible and Sign In can be activated using the keyboard.

---

## TC-HEADER-009 — Header Broken Link Validation

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), clickLogo(), openLanguageMenu(), clickContactUs(), clickSignIn(), validateLinks()`

### Steps

1. Inspect all clickable header links.
2. Verify required links do not contain empty destinations.
3. Verify required links do not contain invalid `undefined` or `null` URLs.
4. Click each header navigation item.
5. Verify each intended destination is reachable.

**Expected:** No required header control contains a broken or invalid navigation destination.

---

# Hero Section

## TC-HERO-001 — Hero Section Content Validation

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Verify the hero section is displayed.
2. Verify **CIRCLE stands for** is displayed.
3. Verify **Caregivers Involved in Resilience, Community, Learning, and Education.** is displayed.
4. Verify the caregiver description is displayed.
5. Verify the **Start Training** button is displayed.
6. Verify the hero caregiver/patient image is displayed.

**Expected:** All expected hero content is displayed correctly.

---

## TC-HERO-002 — Hero Description Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Locate the hero description.
2. Verify it contains the message that family caregivers of people living with dementia may face complex care tasks.
3. Verify it states that the program provides skills and confidence to care for a loved one.

**Expected:** The correct caregiver-focused hero description is displayed.

---

## TC-HERO-003 — Hero Image Validation

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Locate the hero caregiver image.
2. Verify the image is visible.
3. Verify the `src` is not empty.
4. Verify `naturalWidth > 0`.
5. Verify `naturalHeight > 0`.

**Expected:** The hero image loads successfully without a broken-image state.

---

## TC-HERO-004 — Hero Start Training Unauthorized Redirect

**Page:** Unauthorized Landing Page  

**URL:** [http://localhost:5173/auth/sign-in](http://localhost:5173/auth/sign-in)  

**Test Type:** Functional + Navigation + Authentication Guard  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Start a fresh browser context with no logged-in session.
2. Open the landing page.
3. Click **Start Training** in the hero section.
4. Wait for navigation.
5. Verify the current URL.

**Expected:** The unauthorized user is redirected to `http://localhost:5173/auth/sign-in`.

---

## TC-HERO-005 — Hero Start Training Does Not Expose Protected Training

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Security-Oriented Functional Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Ensure the browser has no authenticated session.
2. Click the hero **Start Training** button.
3. Verify the user is redirected to the Sign In page.
4. Verify protected training content is not displayed.

**Expected:** An unauthorized user cannot access training content through the public CTA.

---

## TC-HERO-006 — Hero Start Training Double Click

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Open the landing page in an unauthorized browser context.
2. Double-click **Start Training** rapidly.
3. Wait for navigation.
4. Verify the final URL.
5. Verify no duplicate browser tabs or error states are created.

**Expected:** The application performs one stable redirect to `/auth/sign-in`.

---

## TC-HERO-007 — Browser Back After Start Training Redirect

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeroSection`  

**POM Methods:** `expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Open the landing page.
2. Click **Start Training**.
3. Verify the Sign In page loads.
4. Use the browser Back action.
5. Verify the landing page loads again.

**Expected:** Browser history works normally and the user can return to the public landing page.

---

# All Landing Page Images (DOne )

## TC-IMAGE-001 — Validate All Image Sources

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `getAllImages(), validateImageSources(), expectAllImagesLoaded()`

### Steps

1. Open the landing page.
2. Locate all `<img>` elements on the page.
3. Verify each required image has a non-empty `src`.
4. Verify no required image source contains `undefined`.
5. Verify no required image source contains `null`.

**Expected:** All required page images have valid source values.

---

## TC-IMAGE-002 — Validate All Images Are Loaded

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `getAllImages(), validateImageSources(), expectAllImagesLoaded()`

### Steps

1. Open the landing page.
2. Scroll from the top to the bottom so lazy-loaded images can load.
3. Locate all required content images.
4. For each image, verify `complete === true`.
5. For each image, verify `naturalWidth > 0`.
6. For each image, verify `naturalHeight > 0`.

**Expected:** All required landing-page images load successfully.

---

## TC-IMAGE-003 — Broken Image Negative Validation

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `getAllImages(), validateImageSources(), expectAllImagesLoaded()`

### Steps

1. Open the page.
2. Inspect all required images after the page is fully loaded.
3. Check for any image with `naturalWidth === 0`.
4. Check for visible broken-image indicators.

**Expected:** No required image is broken.

---

## TC-IMAGE-004 — Image Alternative Text Validation

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `getAllImages(), validateImageSources(), expectAllImagesLoaded()`

### Steps

1. Inspect informative image elements.
2. Verify important content images contain meaningful `alt` text.
3. Verify partner logos are identifiable through accessible text.
4. Verify decorative-only images do not create misleading accessible names.

**Expected:** Images follow reasonable accessibility naming behavior.

---

# About CIRCLE Section (Done)

## TC-ABOUT-001 — About CIRCLE Section Load

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Scroll to the About CIRCLE section.
2. Verify **About Circle** is displayed.
3. Verify the section is fully visible.
4. Verify no content overlaps or disappears.

**Expected:** The About CIRCLE section is displayed correctly.

---

## TC-ABOUT-002 — About CIRCLE Heading

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate the About CIRCLE heading.
2. Verify **Empowering Caregivers Through Evidence-Based Training** is displayed.

**Expected:** The expected About CIRCLE heading is displayed.

---

## TC-ABOUT-003 — About CIRCLE Description

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate the About CIRCLE description.
2. Verify it states that CIRCLE is a self-paced program.
3. Verify video training is mentioned.
4. Verify interaction with other caregivers in a discussion forum is mentioned.
5. Verify a dedicated virtual support community is mentioned.

**Expected:** The complete expected About CIRCLE description is visible.

---

## TC-ABOUT-004 — About CIRCLE Caregiver Image

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate the caregiver-assisting-elderly-person image.
2. Verify the image is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.
5. Verify `naturalHeight > 0`.

**Expected:** The About CIRCLE image loads successfully.

---

## TC-ABOUT-005 — 300+ Statistics Card

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate the first statistics card.
2. Verify **300+** is displayed.
3. Verify the card states that caregivers have participated in previous versions of the program.

**Expected:** The 300+ statistics card is displayed with the correct supporting content.

---

## TC-ABOUT-006 — 80% Statistics Card

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate the second statistics card.
2. Verify **80%** is displayed.
3. Verify the card states that caregivers reported greater confidence in providing care after completing earlier versions of the program.

**Expected:** The 80% statistics card is displayed with the correct supporting content.

---

## TC-ABOUT-007 — Statistics Cards Are Not Empty

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `AboutCircleSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectCaregiverImageLoaded(), expectStatsCards()`

### Steps

1. Locate both About statistics cards.
2. Verify each card contains a statistic.
3. Verify each card contains supporting explanatory text.
4. Verify neither card contains blank placeholders.

**Expected:** Both cards contain complete content and no empty state.

---

# Study Team Section (Done)

## TC-STUDY-001 — Study Team Section Load

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Functional + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Scroll to the Study Team section.
2. Verify the Study Team section is displayed.
3. Verify the section loads without visible errors.

**Expected:** The Study Team section loads successfully.

---

## TC-STUDY-002 — Study Team Heading and Description

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Verify **Study team** is displayed.
2. Verify **Turning Research Into Practical Care** is displayed.
3. Verify the Study Team description is visible: "The CIRCLE project is driven by a diverse group of specialists working together to turn research into real-world solutions. I am privileged to guide this talented multidisciplinary team as we work toward our shared mission."
4. Verify the description references a diverse group of specialists.
5. Verify the description references turning research into real-world solutions.

**Expected:** Study Team heading and description are displayed correctly.

---

## TC-STUDY-003 — Principal Investigator Name

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Locate the Study Team profile card.
2. Verify **Bianca Shieu, PhD, RN** is displayed.

**Expected:** The correct Principal Investigator name is displayed.

---

## TC-STUDY-004 — Principal Investigator Designation

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Locate the Study Team profile information.
2. Verify **Principal Investigator** is displayed.

**Expected:** The correct designation is displayed.

---

## TC-STUDY-005 — Principal Investigator Image

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Locate Bianca Shieu's profile image.
2. Verify the profile image is visible.
3. Verify the image source is not empty.
4. Verify `naturalWidth > 0`.
5. Verify `naturalHeight > 0`.

**Expected:** The Principal Investigator image is displayed and loaded successfully.

---

## TC-STUDY-006 — Study Team Profile Information Not Empty

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `StudyTeamSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectInvestigator(), expectDesignation(), expectProfileImageLoaded()`

### Steps

1. Locate the Study Team profile card.
2. Verify the investigator name is not blank.
3. Verify the designation is not blank.
4. Verify the profile image is not broken.

**Expected:** The Study Team profile contains complete name, designation, and image information.

---

# Training Section (Done)

## TC-TRAINING-001 — Training Section Content

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Scroll to the Training section.
2. Verify **Training** is displayed.
3. Verify **Self-Paced Comprehensive Training Program** is displayed.
4. Verify the training description is displayed.
5. Verify the **Start Training** CTA is displayed.
6. Verify the training image is displayed.

**Expected:** The Training section contains all expected content.

---

## TC-TRAINING-002 — Training Description Validation

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Locate the training description.
2. Verify the description mentions video content.
3. Verify the description mentions resources.
4. Verify the description explains that the material helps caregivers learn and build confidence in their dementia caregiving journey.

**Expected:** The Training description matches the expected purpose of the program.

---

## TC-TRAINING-003 — Training Section Image

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Locate the Training section image.
2. Verify the image is displayed.
3. Verify the image source is present.
4. Verify `naturalWidth > 0`.
5. Verify `naturalHeight > 0`.

**Expected:** The Training section image loads successfully.

---

## TC-TRAINING-004 — Training Start Training Unauthorized Redirect

**Page:** Unauthorized Landing Page  

**URL:** [http://localhost:5173/auth/sign-in](http://localhost:5173/auth/sign-in)  

**Test Type:** Functional + Navigation + Authentication Guard  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Start in a fresh unauthorized browser context.
2. Scroll to the Training section.
3. Click **Start Training**.
4. Wait for navigation.
5. Verify the current URL.

**Expected:** The user is redirected to `http://localhost:5173/auth/sign-in`.

---

## TC-TRAINING-005 — Protected Training Cannot Be Opened From Public CTA

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Authentication Guard  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingSection`  

**POM Methods:** `scrollIntoView(), expectContent(), expectImageLoaded(), clickStartTraining(), expectUnauthorizedRedirect()`

### Steps

1. Ensure the user is not signed in.
2. Click **Start Training** in the Training section.
3. Verify the Sign In page opens.
4. Verify training modules are not shown.

**Expected:** Unauthorized users cannot bypass authentication through the Training CTA.

---

# Testimonials Section (Done)

## TC-TESTIMONIAL-001 — Testimonials Section Load

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Scroll to the Testimonials section.
2. Verify **Testimonials** is displayed.
3. Verify **What Participants have told us...** is displayed.
4. Verify a testimonial quote is visible.
5. Verify caregiver attribution is visible.

**Expected:** The Testimonials section loads with a quote and matching caregiver attribution.

---

## TC-TESTIMONIAL-002 — First Testimonial Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the testimonial for the female caregiver to her mother.
2. Verify the quote beginning with **I don’t feel as anxious as I was...** is displayed.
3. Verify **Female Caregiver to her mother.** is displayed.

**Expected:** The testimonial and its attribution are displayed correctly.

---

## TC-TESTIMONIAL-003 — Second Testimonial Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the testimonial containing **It allowed to me to reflect on the care I am providing...**
2. Verify the quote is displayed.
3. Verify **Male Caregiver to his wife.** is displayed.

**Expected:** The second expected testimonial and attribution are displayed correctly.

---

## TC-TESTIMONIAL-004 — Third Testimonial Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the testimonial beginning with **I just feel a little more confident...**
2. Verify the quote is displayed.
3. Verify **Female Caregiver to her grandmother.** is displayed.

**Expected:** The third expected testimonial and attribution are displayed correctly.

---

## TC-TESTIMONIAL-005 — Fourth Testimonial Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the testimonial beginning with **There was so much I didn’t know in caring for my wife...**
2. Verify the quote is displayed.
3. Verify **Male Caregiver for his wife.** is displayed.

**Expected:** The fourth expected testimonial and attribution are displayed correctly.

---

## TC-TESTIMONIAL-006 — Fifth Testimonial Content

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the testimonial beginning with **I knew I needed some basics...**
2. Verify the quote is displayed.
3. Verify **Female Caregiver for her husband.** is displayed.

**Expected:** The fifth expected testimonial and attribution are displayed correctly.

---

## TC-TESTIMONIAL-007 — Next Arrow Functionality

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + UI  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Scroll to the Testimonials section.
2. Record the currently displayed quote and attribution.
3. Click the **Next/Right Arrow**.
4. Verify the displayed quote changes.
5. Verify the caregiver attribution changes to match the new quote.

**Expected:** The Next arrow moves to the next testimonial correctly.

---

## TC-TESTIMONIAL-008 — Previous Arrow Functionality

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + UI  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Record the current testimonial.
2. Click the **Next/Right Arrow**.
3. Record the next testimonial.
4. Click the **Previous/Left Arrow**.
5. Verify the original testimonial is displayed again.

**Expected:** The Previous arrow returns the carousel to the previous testimonial.

---

## TC-TESTIMONIAL-009 — All Testimonials Reachable

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Start from the first visible testimonial.
2. Click the Next arrow.
3. Record each unique quote and attribution.
4. Continue until the carousel reaches the end or returns to the starting item.
5. Verify all five expected testimonial entries can be displayed.

**Expected:** All configured testimonials are reachable through the carousel controls.

---

## TC-TESTIMONIAL-010 — Quote and Attribution Stay Synchronized

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Negative Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate through each testimonial.
2. Verify every quote has a visible caregiver attribution.
3. Verify the attribution corresponds to the expected quote.
4. Verify no quote is paired with the wrong caregiver type.

**Expected:** Each quote remains paired with its correct attribution.

---

## TC-TESTIMONIAL-011 — Carousel Boundary Behavior

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Navigate to the final testimonial.
2. Click the Next arrow.
3. Observe whether the carousel wraps to the first item or keeps the last item according to the implemented design.
4. Navigate to the first testimonial.
5. Click the Previous arrow.
6. Observe the configured boundary behavior.

**Expected:** Carousel boundary behavior is stable and does not produce blank content, errors, or an invalid state.

---

## TC-TESTIMONIAL-012 — Rapid Carousel Arrow Clicks

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Click the Next arrow several times quickly.
2. Verify a valid testimonial remains visible.
3. Click the Previous arrow several times quickly.
4. Verify a valid testimonial remains visible.
5. Verify no blank slide or UI crash appears.

**Expected:** Rapid navigation does not break the testimonial carousel.

---

## TC-TESTIMONIAL-013 — Testimonial Arrow Keyboard Accessibility

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TestimonialsSection`  

**POM Methods:** `scrollIntoView(), getCurrentQuote(), getCurrentAttribution(), clickNext(), clickPrevious(), expectAllTestimonialsReachable()`

### Steps

1. Use the keyboard to focus the Previous or Next testimonial control.
2. Verify the control has a meaningful accessible name.
3. Press `Enter` or `Space`.
4. Verify the testimonial changes.

**Expected:** Testimonial navigation controls are keyboard operable and accessible.

---

# Developed in Partnership Section (Done)

## TC-PARTNER-001 — Developed in Partnership Section Load

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Scroll to the partnership section.
2. Verify **Developed in Partnership with ...** is displayed.
3. Verify partner logos are visible.

**Expected:** The partnership section is displayed correctly.

---

## TC-PARTNER-002 — UT Health San Antonio Logo

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Locate the **UT Health San Antonio** logo.
2. Verify the logo is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.

**Expected:** The UT Health San Antonio logo is loaded successfully.

---

## TC-PARTNER-003 — UT San Antonio Logo

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Locate the **UT San Antonio** logo.
2. Verify the logo is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.

**Expected:** The UT San Antonio logo is loaded successfully.

---

## TC-PARTNER-004 — UT Health San Antonio School of Nursing Logo

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Locate the **UT Health San Antonio School of Nursing** logo.
2. Verify the logo is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.

**Expected:** The School of Nursing logo is loaded successfully.

---

## TC-PARTNER-005 — InNeed Logo

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Locate the **InNeed** logo.
2. Verify the logo is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.

**Expected:** The InNeed logo is loaded successfully.

---

## TC-PARTNER-006 — All Expected Partner Logos Exist

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `PartnershipSection`  

**POM Methods:** `scrollIntoView(), expectHeading(), expectPartnerLogosLoaded()`

### Steps

1. Locate all partner logos.
2. Verify **UT Health San Antonio** is represented.
3. Verify **UT San Antonio** is represented.
4. Verify **UT Health San Antonio School of Nursing** is represented.
5. Verify **InNeed** is represented.

**Expected:** No expected partner logo is missing.

---

# Support Us Section (Not Implement)

## TC-SUPPORT-001 — Support Us Section Content

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Scroll to the Support Us section.
2. Verify **SUPPORT US** is displayed.
3. Verify **Let's connect and make compassionate care more impactful together.** is displayed.
4. Verify the collaboration description is displayed.
5. Verify the email input is displayed.
6. Verify the **Submit** button is displayed.

**Expected:** The Support Us section contains all expected text and controls.

---

## TC-SUPPORT-002 — Support Us Description

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Locate the Support Us description.
2. Verify it mentions collaboration.
3. Verify it mentions sharing ideas.
4. Verify it mentions empowering caregivers.
5. Verify it references training, technology, and human-centered innovation.

**Expected:** The expected Support Us description is displayed.

---

## TC-SUPPORT-003 — Email Field Accepts Valid Email

**Page:** Unauthorized Landing Page  

**Test Type:** Positive + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Locate the Support Us email input.
2. Enter `qa.circle+landing@example.com`.
3. Verify the entered value is displayed correctly.

**Expected:** The valid email address is accepted by the input field.

---

## TC-SUPPORT-004 — Valid Email Submission

**Page:** Unauthorized Landing Page  

**Test Type:** Positive + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter a valid email address.
2. Click **Submit**.
3. Observe the page behavior after submission.
4. Verify the implemented success confirmation or completion state is displayed.
5. Verify the page does not crash.

**Expected:** A valid email can be submitted successfully and the user receives the implemented success feedback.

---

## TC-SUPPORT-005 — Empty Email Submission

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Leave the email field empty.
2. Click **Submit**.
3. Verify the form does not complete successfully.
4. Verify a required-field validation message or equivalent browser validation is displayed.

**Expected:** Empty email submission is rejected.

---

## TC-SUPPORT-006 — Invalid Email Without @

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `qa.circle.example.com`.
2. Click **Submit**.
3. Verify the email is rejected.
4. Verify a validation message is displayed.

**Expected:** An email without `@` cannot be submitted.

---

## TC-SUPPORT-007 — Invalid Email Without Domain

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `qa.circle@`.
2. Click **Submit**.
3. Verify the form rejects the value.

**Expected:** An email without a valid domain is rejected.

---

## TC-SUPPORT-008 — Invalid Email Without Local Part

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `@example.com`.
2. Click **Submit**.
3. Verify the form rejects the value.

**Expected:** An email without a local part is rejected.

---

## TC-SUPPORT-009 — Invalid Email With Double @

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `qa@@example.com`.
2. Click **Submit**.
3. Verify the form rejects the value.

**Expected:** An incorrectly formatted email with double `@` is rejected.

---

## TC-SUPPORT-010 — Email With Leading and Trailing Spaces

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Form Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `  qa.circle@example.com  `.
2. Click **Submit**.
3. Observe whether the application trims the value or displays validation.

**Expected:** The application handles surrounding spaces safely and consistently without submitting malformed data.

---

## TC-SUPPORT-011 — Uppercase Email

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Positive Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `QA.CIRCLE@EXAMPLE.COM`.
2. Click **Submit**.
3. Verify the email is not rejected solely because uppercase characters are used.

**Expected:** A syntactically valid uppercase email is accepted.

---

## TC-SUPPORT-012 — Very Long Email Input

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter a very long email address near the supported maximum input size.
2. Verify the input field layout remains stable.
3. Attempt submission.
4. Verify the application handles the value without crashing or overflowing the page.

**Expected:** Long input is handled safely according to input-length and email-format rules.

---

## TC-SUPPORT-013 — Script-Like Input

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Security-Oriented UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter `<script>alert(1)</script>@example.com` in the email field.
2. Click **Submit**.
3. Verify no script is executed.
4. Verify the value is rejected or safely treated as plain text.

**Expected:** Script-like input does not execute and cannot create client-side injection.

---

## TC-SUPPORT-014 — Duplicate Submit Click

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter a valid email.
2. Double-click the **Submit** button rapidly.
3. Observe the UI.
4. Verify no duplicate visible success messages or broken states occur.

**Expected:** Repeated clicks are handled safely and the form remains in a valid state.

---

## TC-SUPPORT-015 — Validation Recovery

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Enter an invalid email.
2. Attempt to submit.
3. Verify validation appears.
4. Replace the invalid value with a valid email.
5. Submit again.

**Expected:** The validation state clears or updates and valid submission becomes possible.

---

## TC-SUPPORT-016 — Support Us Keyboard Operation

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `scrollIntoView(), expectContent(), fillEmail(), submit(), expectValidation(), expectSuccessState()`

### Steps

1. Use `Tab` to focus the email input.
2. Enter a valid email.
3. Use `Tab` to focus the **Submit** button.
4. Press `Enter`.

**Expected:** The Support Us form can be completed using keyboard navigation.

---

# Footer (Not Implement)

## TC-FOOTER-001 — Footer Section Load

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Scroll to the bottom of the page.
2. Verify the footer is displayed.
3. Verify the Disclaimer section is displayed.
4. Verify the CIRCLE footer logo is displayed.
5. Verify Quick Links are displayed.
6. Verify Languages are displayed.

**Expected:** The complete footer area loads successfully.

---

## TC-FOOTER-002 — Disclaimer Development Statement

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the Disclaimer text.
2. Verify it states that the CIRCLE website was developed by faculty at the UT Health San Antonio School of Nursing.
3. Verify collaboration with patients, families, and a community advisory board is mentioned.

**Expected:** The development and collaboration disclaimer is displayed correctly.

---

## TC-FOOTER-003 — Research Purpose Disclaimer

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the research disclaimer.
2. Verify it states the information is provided for research purposes only.
3. Verify it states the website is not a substitute for professional medical care.
4. Verify it states no medical advice or services are being offered.

**Expected:** The research-purpose and medical-care disclaimer is displayed.

---

## TC-FOOTER-004 — CIRCLE Resource Disclaimer

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the longer CIRCLE description in the footer.
2. Verify educational videos are mentioned.
3. Verify moderated discussion forums are mentioned.
4. Verify external resources are mentioned.
5. Verify CIRCLE's responsibility limitation for external websites/resources is displayed.

**Expected:** The CIRCLE resource disclaimer content is visible.

---

## TC-FOOTER-005 — Healthcare Provider Guidance

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the health guidance statement.
2. Verify users with or suspecting a health problem are advised to consult a healthcare provider or physician.

**Expected:** Healthcare consultation guidance is displayed.

---

## TC-FOOTER-006 — Participation Contact Phone

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation + Link Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the participation contact information.
2. Verify `210-450-8175` is displayed.
3. If the phone number is clickable, inspect the link.
4. Verify the link uses a valid `tel:` destination.

**Expected:** The correct participation phone number is displayed and any phone link is valid.

---

## TC-FOOTER-007 — Participation Contact Email

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation + Link Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the participation email.
2. Verify `circle@uthscsa.edu` is displayed.
3. If the email is clickable, inspect the destination.
4. Verify it uses `mailto:circle@uthscsa.edu`.

**Expected:** The correct participation email is displayed and any email link is valid.

---

## TC-FOOTER-008 — Footer CIRCLE Logo

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the CIRCLE footer logo.
2. Verify it is visible.
3. Verify the image source exists.
4. Verify `naturalWidth > 0`.
5. Verify **Circle Caregiver's Platform** branding is displayed where configured.

**Expected:** Footer branding is displayed correctly.

---

## TC-FOOTER-009 — Quick Links Content

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the **Quick Links** section.
2. Verify **Study Team** is displayed.
3. Verify **Training** is displayed.
4. Verify **Community** is displayed.
5. Verify **Resources** is displayed.

**Expected:** All expected Quick Links are displayed.

---

## TC-FOOTER-010 — Study Team Footer Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **Study Team** in Quick Links.
2. Wait for the configured navigation or anchor movement.
3. Verify the Study Team destination/section is displayed.
4. Verify no broken page appears.

**Expected:** The Study Team footer link navigates correctly.

---

## TC-FOOTER-011 — Training Footer Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **Training** in Quick Links.
2. Observe navigation.
3. If Training is protected, verify unauthorized access is handled according to the application design.
4. Verify no 404 or broken route is displayed.

**Expected:** The Training footer link uses the correct configured destination and does not expose protected content incorrectly.

---

## TC-FOOTER-012 — Community Footer Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **Community** in Quick Links.
2. Verify the configured destination is opened.
3. If authentication is required, verify the unauthorized user is redirected appropriately.
4. Verify no broken route is displayed.

**Expected:** Community navigation behaves according to the configured authorization rules.

---

## TC-FOOTER-013 — Resources Footer Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **Resources** in Quick Links.
2. Verify the configured destination is opened.
3. If authentication is required, verify unauthorized handling.
4. Verify no 404 or error page appears.

**Expected:** Resources navigation behaves according to the configured application rules.

---

## TC-FOOTER-014 — Footer Languages Content

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Locate the **Languages** section.
2. Verify **English** is displayed.
3. Verify **Spanish** is displayed.

**Expected:** Both configured languages are listed in the footer.

---

## TC-FOOTER-015 — Footer English Language Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **English** in the footer language section.
2. Verify the page remains or changes to the English version according to implementation.
3. Verify visible primary content is in English.

**Expected:** English language selection works correctly.

---

## TC-FOOTER-016 — Footer Spanish Language Link

**Page:** Unauthorized Landing Page  

**Test Type:** Functional + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Click **Spanish** in the footer language section.
2. Verify the configured Spanish version or language state is activated.
3. Verify no broken route or blank page appears.

**Expected:** Spanish language selection works according to the implemented language-routing behavior.

---

## TC-FOOTER-017 — Footer Copyright

**Page:** Unauthorized Landing Page  

**Test Type:** Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Scroll to the footer copyright area.
2. Verify `© 2025` is displayed.
3. Verify **Developed by InNeed Intelligent Cloud** is displayed.
4. Verify **All rights reserved** is displayed.
5. Verify **The University of Texas at San Antonio** is displayed.

**Expected:** The expected copyright statement is displayed.

---

## TC-FOOTER-018 — Footer Links Are Not Empty or Broken

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Link Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `scrollIntoView(), expectDisclaimer(), expectQuickLinks(), validateFooterLinks(), selectLanguage()`

### Steps

1. Inspect all footer links.
2. Verify intended navigational links do not use an empty `href`.
3. Verify links do not contain `undefined` or `null`.
4. Activate each expected footer navigation link.
5. Verify no 404 or application error is displayed.

**Expected:** Footer links use valid destinations and do not lead to broken routes.

---

# Cross-Page UI, Responsive, Accessibility, and Edge Cases (Done)

## TC-RESPONSIVE-001 — Desktop Layout

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Responsive  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `setViewport(), expectNoHorizontalOverflow(), expectResponsiveLayout()`

### Steps

1. Open the page at a desktop viewport such as `1440 x 900`.
2. Scroll through the entire page.
3. Verify text does not overlap images.
4. Verify cards do not overlap.
5. Verify CTA buttons remain visible.
6. Verify there is no unexpected horizontal scrollbar.

**Expected:** The landing page renders correctly at desktop width.

---

## TC-RESPONSIVE-002 — Tablet Layout

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Responsive + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `setViewport(), expectNoHorizontalOverflow(), expectResponsiveLayout()`

### Steps

1. Open the page at a tablet viewport such as `768 x 1024`.
2. Scroll through all sections.
3. Verify sections adapt correctly.
4. Verify images fit inside the viewport.
5. Verify buttons remain clickable.
6. Verify text is not clipped.

**Expected:** The landing page remains readable and functional on a tablet viewport.

---

## TC-RESPONSIVE-003 — Mobile Layout

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Responsive + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `setViewport(), expectNoHorizontalOverflow(), expectResponsiveLayout()`

### Steps

1. Open the page at a mobile viewport such as `390 x 844`.
2. Scroll through the full page.
3. Verify the header is usable.
4. Verify hero content is readable.
5. Verify About cards stack or resize correctly.
6. Verify Study Team content is readable.
7. Verify testimonial controls remain available.
8. Verify partner logos do not overflow.
9. Verify Support Us controls fit the viewport.
10. Verify footer content remains readable.

**Expected:** The landing page is usable without content clipping or horizontal overflow on mobile.

---

## TC-RESPONSIVE-004 — Small Mobile Width

**Page:** Unauthorized Landing Page  

**Test Type:** UI + Responsive + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `setViewport(), expectNoHorizontalOverflow(), expectResponsiveLayout()`

### Steps

1. Set a narrow viewport such as `320 x 700`.
2. Load the landing page.
3. Scroll through every section.
4. Check for horizontal overflow.
5. Verify important buttons and links remain reachable.

**Expected:** Core landing-page functionality remains usable at narrow supported widths.

---

## TC-A11Y-001 — Keyboard Tab Order

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Functional  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

### Steps

1. Open the page.
2. Navigate only using the `Tab` key.
3. Verify interactive controls receive visible focus.
4. Verify focus moves in a logical top-to-bottom order.
5. Verify no important interactive control is skipped.

**Expected:** Interactive controls are keyboard reachable in a logical order.

---

## TC-A11Y-002 — Buttons Have Accessible Names

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

### Steps

1. Inspect the accessible names of clickable buttons.
2. Verify **Sign In** has a meaningful name.
3. Verify **Start Training** has a meaningful name.
4. Verify **Submit** has a meaningful name.
5. Verify testimonial arrows have Previous/Next equivalent names.

**Expected:** Important controls have meaningful accessible names.

---

## TC-A11Y-003 — Heading Structure

**Page:** Unauthorized Landing Page  

**Test Type:** Accessibility + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

### Steps

1. Inspect headings on the page.
2. Verify the primary page heading is identifiable.
3. Verify major section headings use heading semantics.
4. Verify headings are not represented only by visual styling where semantic markup is expected.

**Expected:** The page uses a meaningful heading structure.

---

## TC-EDGE-001 — Full Page Repeated Scroll

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + UI  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `scrollTopToBottom(), navigateBack(), navigateForward(), expectStableState()`

### Steps

1. Scroll from the top to the footer.
2. Scroll back to the top.
3. Repeat several times.
4. Verify all sections continue to render.
5. Verify no sticky or animated element becomes incorrectly positioned.

**Expected:** Repeated scrolling does not break the landing-page layout.

---

## TC-EDGE-002 — Rapid Navigation Between Header and Footer Links

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `scrollTopToBottom(), navigateBack(), navigateForward(), expectStableState()`

### Steps

1. Use a header navigation item.
2. Return to the landing page.
3. Use a footer navigation item.
4. Return to the landing page.
5. Repeat with several links.

**Expected:** Repeated navigation does not create routing failures or an unstable page state.

---

## TC-EDGE-003 — Browser Forward and Back Navigation

**Page:** Unauthorized Landing Page  

**Test Type:** Edge Case + Navigation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `scrollTopToBottom(), navigateBack(), navigateForward(), expectStableState()`

### Steps

1. Open the landing page.
2. Navigate to the Sign In page.
3. Use browser Back.
4. Verify landing page content.
5. Use browser Forward.
6. Verify Sign In page content.

**Expected:** Browser history navigation works correctly.

---

## TC-NEGATIVE-001 — No Visible Placeholder or Undefined Content

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `expectNoPlaceholderText(), collectConsoleErrors(), collectPageErrors()`

### Steps

1. Scroll through the entire page.
2. Search visible content for `undefined`.
3. Search visible content for `null`.
4. Search visible content for obvious development placeholders such as `Lorem ipsum` where not expected.
5. Search visible content for unresolved template values.

**Expected:** No unintended placeholder, undefined, null, or unresolved template content is visible.

---

## TC-NEGATIVE-002 — No Critical Console Errors

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Technical UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `expectNoPlaceholderText(), collectConsoleErrors(), collectPageErrors()`

### Steps

1. Attach a listener for browser console errors.
2. Open the landing page.
3. Scroll through the full page.
4. Open the language selector.
5. Use testimonial arrows.
6. Interact with Support Us validation.
7. Review collected console errors.

**Expected:** No critical application console error occurs during normal landing-page interaction.

---

## TC-NEGATIVE-003 — No Unhandled Page Errors

**Page:** Unauthorized Landing Page  

**Test Type:** Negative + Technical UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `LandingPage`  

**POM Methods:** `expectNoPlaceholderText(), collectConsoleErrors(), collectPageErrors()`

### Steps

1. Attach a Playwright `pageerror` listener.
2. Open the landing page.
3. Exercise header, hero CTA, testimonials, and form interactions.
4. Review any page errors.

**Expected:** No unhandled JavaScript page error occurs.

---

# Recommended Playwright MCP Execution Flow

For stable execution, run the tests in logical groups:

1. **Landing Page Smoke**
2. **Header**
3. **Hero**
4. **All Images**
5. **About CIRCLE**
6. **Study Team**
7. **Training**
8. **Testimonials**
9. **Developed in Partnership**
10. **Support Us**
11. **Footer**
12. **Responsive**
13. **Accessibility**
14. **Negative and Edge Cases**

Use a fresh unauthenticated context for all authentication-guard tests, especially:

- `TC-HERO-004`
- `TC-HERO-005`
- `TC-TRAINING-004`
- `TC-TRAINING-005`

For carousel tests, always capture the currently displayed quote before clicking an arrow so the automation can prove that the content actually changed.

For image tests, prefer browser-side validation similar to:

```javascript
(image) => ({
  src: image.currentSrc || image.src,
  complete: image.complete,
  naturalWidth: image.naturalWidth,
  naturalHeight: image.naturalHeight
})
```

A required image passes only when it has a valid source and non-zero natural dimensions.

For navigation tests, do not rely on a fixed timeout. Wait for the expected URL, destination heading, or target section to become visible.
