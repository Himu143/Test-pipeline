import { expect, type Locator, type Page } from '@playwright/test';

export class LandingPage {
  readonly page: Page;
  readonly header: Locator;
  readonly logo: Locator;
  readonly logoLink: Locator;
  readonly signInLink: Locator;
  readonly contactUsLink: Locator;
  readonly languageTrigger: Locator;
  readonly languageOptionEnglish: Locator;
  readonly languageOptionSpanish: Locator;
  readonly heroSection: Locator;
  readonly heroHeading: Locator;
  readonly heroParagraph: Locator;
  readonly startTrainingButton: Locator;
  readonly aboutSection: Locator;
  readonly aboutImage: Locator;
  readonly aboutDescription: Locator;
  readonly aboutStat300: Locator;
  readonly aboutStat80: Locator;
  readonly aboutStat300Text: Locator;
  readonly aboutStat80Text: Locator;
  readonly teamSection: Locator;
  readonly teamSubtitle: Locator;
  readonly teamHeadline: Locator;
  readonly teamDescription: Locator;
  readonly teamMemberName: Locator;
  readonly teamMemberDesignation: Locator;
  readonly teamProfileImage: Locator;
  readonly trainingSection: Locator;
  readonly trainingSubtitle: Locator;
  readonly trainingHeadline1: Locator;
  readonly trainingHeadline2: Locator;
  readonly trainingDescription: Locator;
  readonly trainingStartButton: Locator;
  readonly trainingImage: Locator;
  readonly testimonialsSection: Locator;
  readonly testimonialsTitle: Locator;
  readonly testimonialsHeadline: Locator;
  readonly testimonialsPreviousButton: Locator;
  readonly testimonialsNextButton: Locator;
  readonly partnershipSection: Locator;
  readonly partnershipHeading: Locator;
  readonly partnershipLogos: Locator;
  readonly utHealthLogo: Locator;
  readonly utSanAntonioLogo: Locator;
  readonly nursingLogo: Locator;
  readonly inneedLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('header#header').first();
    this.logo = page.locator('header#header img[alt="Logo"]');
    this.logoLink = page.locator('a[href="/"]').first();
    this.signInLink = page.getByRole('link', { name: /sign in/i }).first();
    this.contactUsLink = page.getByRole('link', { name: /contact us/i }).first();
    this.languageTrigger = page.locator('header#header button:visible').filter({ hasText: /English|Select language/i }).first();
    this.languageOptionEnglish = page.getByRole('option', { name: /^English$/i }).first();
    this.languageOptionSpanish = page.getByRole('option', { name: /^Spanish$/i }).first();
    this.heroSection = page.locator('section').filter({
      has: page.locator('img[alt="Caregivers with patient"]'),
    }).first();
    this.heroHeading = page.locator('h1').filter({
      hasText: /CIRCLE stands for/i,
    });
    this.heroParagraph = page.getByText(
      /Family caregivers of people living with dementia often face complex care tasks/i,
    );
    this.startTrainingButton = page.getByRole('link', { name: /start training/i }).first();
    this.aboutSection = page.locator('section').filter({ has: page.getByText(/About Circle/i) }).first();
    this.aboutImage = page.locator('img[alt="Caregiver assisting elderly person"]');
    this.aboutDescription = page.getByText(
      /CIRCLE is a self-paced program where caregivers will participate in video training sessions/i,
    );
    this.aboutStat300 = page.getByText('300+', { exact: true }).first();
    this.aboutStat80 = page.getByText('80%', { exact: true }).first();
    this.aboutStat300Text = page.getByText(
      /Caregivers have participated in previous versions of this program\./i,
    );
    this.aboutStat80Text = page.getByText(
      /Caregivers reported greater confidence in providing care after completing our earlier versions of the program\./i,
    );
    this.teamSection = page.locator('#team-section');
    this.teamSubtitle = page.getByText(/Study team/i).first();
    this.teamHeadline = page.getByText(/Turning Research Into Practical Care/i).first();
    this.teamDescription = page.getByText(
      /The CIRCLE project is driven by a diverse group of specialists working together to turn research into real-world solutions\./i,
    ).first();
    this.teamMemberName = page.getByText('Bianca Shieu, PhD, RN', { exact: true }).first();
    this.teamMemberDesignation = page.getByText('Principal Investigator', { exact: true }).first();
    this.teamProfileImage = page.locator('[role="img"][aria-label="Portrait of Bianca Shieu, PhD, RN"]');
    this.trainingSection = page.locator('#training-section');
    this.trainingSubtitle = this.trainingSection.getByText(/^Training$/i).first();
    this.trainingHeadline1 = this.trainingSection.getByText(/Self-Paced Comprehensive/i).first();
    this.trainingHeadline2 = this.trainingSection.getByText(/Training Program/i).first();
    this.trainingDescription = this.trainingSection.getByText(
      /The training program will include video content and resources to help you learn and build confidence in your dementia caregiving journey\./i,
    ).first();
    this.trainingStartButton = this.trainingSection.getByRole('link', { name: /start training/i }).first();
    this.trainingImage = this.trainingSection.locator('img').first();
    this.testimonialsSection = page.locator('section').filter({ has: page.getByText(/Testimonials/i) }).first();
    this.testimonialsTitle = page.getByText(/^Testimonials$/i).first();
    this.testimonialsHeadline = page.getByText(/What Participants have told us\.\.\./i).first();
    this.testimonialsPreviousButton = this.testimonialsSection.getByRole('button', { name: /^previous testimonial$/i }).first();
    this.testimonialsNextButton = this.testimonialsSection.getByRole('button', { name: /^next testimonial$/i }).first();
    this.partnershipSection = page.locator('section').filter({ has: page.getByText(/Developed in Partnership with/i) }).first();
    this.partnershipHeading = page.getByText(/Developed in Partnership with/i).first();
    this.partnershipLogos = this.partnershipSection.locator('img');
    this.utHealthLogo = this.partnershipSection.getByRole('img', { name: 'UT Health San Antonio' }).first();
    this.utSanAntonioLogo = this.partnershipSection.getByRole('img', { name: 'UT San Antonio' }).first();
    this.nursingLogo = this.partnershipSection.getByRole('img', { name: 'UT Health San Antonio School of Nursing' }).first();
    this.inneedLogo = this.partnershipSection.getByRole('img', { name: 'InNeed' }).first();
  }

  async goto() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.expectLoaded();
  }

  getVisibleLogo() {
    return this.page.locator('header#header img[alt="Logo"]:visible').first();
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.header).toBeVisible();
    await expect.poll(async () => {
      const images = await this.logo.evaluateAll((elements: HTMLImageElement[]) =>
        elements.some((image) => {
          const rect = image.getBoundingClientRect();
          const style = window.getComputedStyle(image);
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        })
      );
      return images;
    }, { timeout: 10000 }).toBeTruthy();
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroHeading).toContainText(/CIRCLE stands for/i);
    await expect(this.heroHeading).toContainText(
      /Caregivers Involved in Resilience, Community, Learning, and Education\./i,
    );
    await expect(this.startTrainingButton).toBeVisible();
  }

  async expectNoVisibleError() {
    await expect(this.page.locator('body')).not.toContainText(/404|not found|application error|500|internal server error|error/i);
  }

  async expectLogoImageLoaded() {
    const visibleLogo = this.getVisibleLogo();
    await expect(visibleLogo).toBeVisible();
    await expect(visibleLogo).toHaveAttribute('src', /.+/);

    const imageInfo = await visibleLogo.evaluate((img: HTMLImageElement) => ({
      src: img.currentSrc || img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
    }));

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.complete).toBe(true);
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
  }

  async openLanguageMenu() {
    await this.languageTrigger.click();
    await expect(this.languageTrigger).toHaveAttribute('aria-expanded', 'true');
  }

  async expectLanguageOptionsVisible() {
    await expect(this.languageOptionEnglish).toBeVisible();
    await expect(this.languageOptionSpanish).toBeVisible();
  }

  async expectLanguageToggleClosed() {
    await expect(this.languageTrigger).toHaveAttribute('aria-expanded', 'false');
  }

  async clickContactUs() {
    await this.contactUsLink.click();
  }

  async expectContactUsNavigation() {
    await expect(this.page).toHaveURL(/\/contact-us(?:[/?#]|$)/);
  }

  async clickSignIn() {
    await this.signInLink.click();
  }

  async expectSignInNavigation() {
    await expect(this.page).toHaveURL(/\/auth\/sign-in(?:[/?#]|$)/);
  }

  async expectHeaderLinksValid() {
    const hrefs = [
      await this.logoLink.getAttribute('href'),
      await this.contactUsLink.getAttribute('href'),
      await this.signInLink.getAttribute('href')
    ];

    expect(hrefs.every((href) => href && href !== 'undefined' && href !== 'null')).toBeTruthy();
    await expect(this.logoLink).toHaveAttribute('href', '/');
    await expect(this.contactUsLink).toHaveAttribute('href', /\/contact-us(?:[/?#]|$)/);
    await expect(this.signInLink).toHaveAttribute('href', /\/auth\/sign-in(?:[/?#]|$)/);
  }

  async clickLogo() {
    await this.logoLink.click();
  }

  async expectHomeNavigation() {
    await expect(this.page).toHaveURL(/http:\/\/localhost:5173\/?$/);
    await expect(this.heroHeading).toBeVisible();
  }

  async expectPublicUrl() {
    await expect(this.page).toHaveURL(/http:\/\/localhost:5173\/?$/);
  }

  async expectAboutSectionVisible() {
    await this.aboutSection.scrollIntoViewIfNeeded();
    await expect(this.aboutSection).toBeVisible();
    await expect(this.aboutSection).toContainText(/About Circle/i);
    await expect(this.page.getByText(/Empowering Caregivers Through/i)).toBeVisible();
    await expect(this.page.getByText(/Evidence-Based Training/i)).toBeVisible();
  }

  async expectAboutDescription() {
    await this.aboutDescription.scrollIntoViewIfNeeded();
    await expect(this.aboutDescription).toBeVisible();
    await expect(this.aboutDescription).toContainText(/self-paced program/i);
    await expect(this.aboutDescription).toContainText(/video training sessions/i);
    await expect(this.aboutDescription).toContainText(/as well as interact with other caregivers in a discussion forum and dedicated virtual support community/i);
  }

  async expectAboutImageLoaded() {
    await this.aboutImage.scrollIntoViewIfNeeded();
    await expect(this.aboutImage).toBeVisible();
    await expect(this.aboutImage).toHaveAttribute('src', /\/images\/about-section\/about\.webp$/);

    const imageInfo = await this.aboutImage.evaluate((img: HTMLImageElement) => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }));

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.complete).toBe(true);
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
  }

  async expectAboutStatsCards() {
    await this.aboutStat300.scrollIntoViewIfNeeded();
    await expect(this.aboutStat300).toBeVisible();
    await expect(this.aboutStat80).toBeVisible();
    await expect(this.aboutStat300Text).toBeVisible();
    await expect(this.aboutStat80Text).toBeVisible();
  }

  async expectStudyTeamSectionLoaded() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamSection).toBeVisible();
    await expect(this.teamSubtitle).toBeVisible();
    await expect(this.teamHeadline).toBeVisible();
    await expect(this.teamDescription).toBeVisible();
    await expect(this.teamMemberName).toBeVisible();
    await expect(this.teamMemberDesignation).toBeVisible();
    await expect(this.teamProfileImage).toBeVisible();
    await expect(this.teamProfileImage).toHaveCSS('background-image', /bianca-shieu/i);
  }

  async expectStudyTeamHeadingAndDescription() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamSubtitle).toBeVisible();
    await expect(this.teamSubtitle).toContainText(/Study team/i);
    await expect(this.teamHeadline).toBeVisible();
    await expect(this.teamHeadline).toContainText(/Turning Research Into Practical Care/i);

    const expectedDescription =
      'The CIRCLE project is driven by a diverse group of specialists working together to turn research into real-world solutions. I am privileged to guide this talented multidisciplinary team as we work toward our shared mission.';

    await expect(this.teamDescription).toBeVisible();
    await expect(this.teamDescription).toHaveText(expectedDescription);
    await expect(this.page.locator('body')).toContainText(/diverse group of specialists/i);
    await expect(this.page.locator('body')).toContainText(/turn research into real-world solutions/i);
  }

  async expectStudyTeamInvestigatorName() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamMemberName).toBeVisible();
    await expect(this.teamMemberName).toHaveText('Bianca Shieu, PhD, RN');
  }

  async expectStudyTeamInvestigatorDesignation() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamMemberDesignation).toBeVisible();
    await expect(this.teamMemberDesignation).toHaveText('Principal Investigator');
  }

  async expectStudyTeamProfileImageLoaded() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamProfileImage).toBeVisible();

    const imageInfo = await this.teamProfileImage.evaluate((element: HTMLElement) => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      const match = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/i);
      const src = match ? match[1] : '';
      const image = new Image();
      image.src = src;

      return {
        src,
        complete: image.complete,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      };
    });

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.complete).toBe(true);
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
  }

  async expectStudyTeamProfileInfoNotEmpty() {
    await this.teamSection.scrollIntoViewIfNeeded();
    await expect(this.teamMemberName).toBeVisible();
    await expect(this.teamMemberName).not.toHaveText('');
    await expect(this.teamMemberDesignation).toBeVisible();
    await expect(this.teamMemberDesignation).not.toHaveText('');
    await expect(this.teamProfileImage).toBeVisible();

    const imageInfo = await this.teamProfileImage.evaluate((element: HTMLElement) => {
      const backgroundImage = getComputedStyle(element).backgroundImage;
      const match = backgroundImage.match(/url\(["']?([^"')]+)["']?\)/i);
      const src = match ? match[1] : '';
      const image = new Image();
      image.src = src;

      return {
        src,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
      };
    });

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
  }

  async expectTrainingSectionContent() {
    await this.trainingSection.scrollIntoViewIfNeeded();
    await expect(this.trainingSection).toBeVisible();
    await expect(this.trainingSubtitle).toBeVisible();
    await expect(this.trainingSubtitle).toContainText(/Training/i);
    await expect(this.trainingHeadline1).toBeVisible();
    await expect(this.trainingHeadline2).toBeVisible();
    await expect(this.trainingDescription).toBeVisible();
    await expect(this.trainingDescription).toContainText(/video content/i);
    await expect(this.trainingDescription).toContainText(/resources/i);
    await expect(this.trainingDescription).toContainText(/build confidence in your dementia caregiving journey/i);
    await expect(this.trainingStartButton).toBeVisible();
    await expect(this.trainingImage).toBeVisible();
  }

  async expectTrainingDescription() {
    await this.trainingSection.scrollIntoViewIfNeeded();
    await expect(this.trainingDescription).toBeVisible();
    await expect(this.trainingDescription).toContainText(/video content/i);
    await expect(this.trainingDescription).toContainText(/resources/i);
    await expect(this.trainingDescription).toContainText(/build confidence in your dementia caregiving journey/i);
  }

  async expectTrainingImageLoaded() {
    await this.trainingSection.scrollIntoViewIfNeeded();
    await expect(this.trainingImage).toBeVisible();

    const imageInfo = await this.trainingImage.evaluate((img: HTMLImageElement) => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.complete).toBe(true);
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
  }

  async expectTestimonialsSectionLoaded() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.testimonialsTitle).toBeVisible();
    await expect(this.testimonialsHeadline).toBeVisible();
    await expect(this.page.locator('body')).toContainText(/I don[’']t feel as anxious as I was/i);
    await expect(this.page.locator('body')).toContainText(/Female Caregiver/i);
  }

  async expectFirstTestimonialContent() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator('body')).toContainText(
      'I don’t feel as anxious as I was, you know, just a few months ago. And I think hearing from professionals who are experts in their areas, the course, has a lot to do with it. So I just feel, I think my competence is, it’s night and day.',
    );
    await expect(this.page.locator('body')).toContainText('Female Caregiver');
    await expect(this.page.locator('body')).toContainText('to her mother.');
  }

  async expectSecondTestimonialContent() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator('body')).toContainText(
      'It allowed to me to reflect on the care I am providing, how I have progressed. And it gave me a little more reassurance and confidence that I am doing something right and ways to improve.',
    );
    await expect(this.page.locator('body')).toContainText('Male Caregiver');
    await expect(this.page.locator('body')).toContainText('to his wife.');
  }

  async expectThirdTestimonialContent() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator('body')).toContainText(
      'I just feel a little more confident. You know, because I know more. And the more you know, the more confident you are and the better you are to cope with the challenges that change and present themselves every day.',
    );
    await expect(this.page.locator('body')).toContainText('Female Caregiver');
    await expect(this.page.locator('body')).toContainText('to her grandmother.');
  }

  async expectFourthTestimonialContent() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator('body')).toContainText(
      'There was so much I didn’t know in caring for my wife and this program was so helpful.',
    );
    await expect(this.page.locator('body')).toContainText('Male Caregiver');
    await expect(this.page.locator('body')).toContainText('for his wife.');
  }

  async expectFifthTestimonialContent() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.page.locator('body')).toContainText(
      'I knew I needed some basics so that I could extend the time that I can care for him at home. After taking this course, I knew I could do this. I’m so grateful because I can sleep a little bit better, that those stressors have lessened quite a bit.',
    );
    await expect(this.page.locator('body')).toContainText('Female Caregiver');
    await expect(this.page.locator('body')).toContainText('for her husband.');
  }

  async getActiveTestimonialIndex() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();

    return await this.testimonialsSection.locator('[data-embla-container]').evaluate((container) => {
      const slides = Array.from(container.querySelectorAll('[data-embla-slide]')) as HTMLElement[];
      if (!slides.length) {
        return 0;
      }

      const viewportRect = container.parentElement?.getBoundingClientRect();
      if (!viewportRect) {
        return 0;
      }

      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const [index, slide] of slides.entries()) {
        const rect = slide.getBoundingClientRect();
        const distance = Math.abs(rect.left - viewportRect.left);

        if (distance < bestDistance) {
          bestIndex = index;
          bestDistance = distance;
        }
      }

      return bestIndex;
    });
  }

  async getActiveTestimonialText() {
    const activeIndex = await this.getActiveTestimonialIndex();
    const activeSlide = this.testimonialsSection.locator('[data-embla-slide]').nth(activeIndex);
    await expect(activeSlide).toBeVisible();
    const text = await activeSlide.textContent();
    return (text ?? '').replace(/\s+/g, ' ').trim();
  }

  async getCarouselTransform() {
    return await this.testimonialsSection.locator('[data-embla-container]').evaluate((container) => {
      return window.getComputedStyle(container).transform || 'none';
    });
  }

  async expectTestimonialQuoteAndAttribution(quote: string, attribution: string) {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    const match = this.testimonialsSection
      .locator('[data-embla-slide]')
      .filter({ hasText: quote })
      .filter({ hasText: attribution })
      .first();

    await expect(match).toBeVisible();
    await expect(match).toContainText(quote);
    await expect(match).toContainText(attribution);
  }

  async clickNextTestimonial() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.testimonialsNextButton).toBeVisible();
    const beforeTransform = await this.getCarouselTransform();
    await this.testimonialsNextButton.click();
    await expect.poll(async () => await this.getCarouselTransform(), { timeout: 10000 }).not.toBe(beforeTransform);
  }

  async clickPreviousTestimonial() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    await expect(this.testimonialsPreviousButton).toBeVisible();
    const beforeTransform = await this.getCarouselTransform();
    await this.testimonialsPreviousButton.click();
    await expect.poll(async () => await this.getCarouselTransform(), { timeout: 10000 }).not.toBe(beforeTransform);
  }

  async expectNextArrowMovesToNextTestimonial(
    currentQuote: string,
    currentAttribution: string,
    nextQuote: string,
    nextAttribution: string,
  ) {
    await this.expectTestimonialQuoteAndAttribution(currentQuote, currentAttribution);
    const beforeTransform = await this.getCarouselTransform();
    await this.clickNextTestimonial();
    await expect.poll(async () => await this.getCarouselTransform(), { timeout: 10000 }).not.toBe(beforeTransform);
    await this.expectTestimonialQuoteAndAttribution(nextQuote, nextAttribution);
  }

  async expectPreviousArrowReturnsToPreviousTestimonial(
    originalQuote: string,
    originalAttribution: string,
    nextQuote: string,
    nextAttribution: string,
  ) {
    await this.expectTestimonialQuoteAndAttribution(nextQuote, nextAttribution);
    const beforeTransform = await this.getCarouselTransform();
    await this.clickPreviousTestimonial();
    await expect.poll(async () => await this.getCarouselTransform(), { timeout: 10000 }).not.toBe(beforeTransform);
    await this.expectTestimonialQuoteAndAttribution(originalQuote, originalAttribution);
  }

  async expectAllTestimonialsReachable() {
    const textValues = await this.testimonialsSection.locator('[data-embla-slide]').allTextContents();
    const normalized = textValues.map((text) => text.replace(/\s+/g, ' ').trim());

    expect(normalized.length).toBeGreaterThanOrEqual(5);
    expect(normalized.some((text) => text.includes('I don’t feel as anxious as I was'))).toBeTruthy();
    expect(normalized.some((text) => text.includes('It allowed to me to reflect on the care I am providing'))).toBeTruthy();
    expect(normalized.some((text) => text.includes('I just feel a little more confident'))).toBeTruthy();
    expect(normalized.some((text) => text.includes('There was so much I didn’t know in caring for my wife'))).toBeTruthy();
    expect(normalized.some((text) => text.includes('I knew I needed some basics so that I could extend the time'))).toBeTruthy();

    for (let index = 0; index < 5; index++) {
      await this.clickNextTestimonial();
    }
  }

  async expectCarouselBoundaryBehavior() {
    const beforeTransform = await this.getCarouselTransform();

    for (let index = 0; index < 6; index++) {
      await this.clickNextTestimonial();
    }

    const wrapTransform = await this.getCarouselTransform();
    expect(wrapTransform).not.toBe(beforeTransform);
    expect(wrapTransform).not.toBe('none');

    await this.clickPreviousTestimonial();
    const afterPrevTransform = await this.getCarouselTransform();
    expect(afterPrevTransform).not.toBe(wrapTransform);
  }

  async expectPartnershipSectionLoaded() {
    await this.partnershipSection.scrollIntoViewIfNeeded();
    await expect(this.partnershipSection).toBeVisible();
    await expect(this.partnershipHeading).toBeVisible();
    await expect(this.partnershipLogos).toHaveCount(4);
    await expect(this.utHealthLogo).toBeVisible();
    await expect(this.utSanAntonioLogo).toBeVisible();
    await expect(this.nursingLogo).toBeVisible();
    await expect(this.inneedLogo).toBeVisible();
  }

  async expectPartnerLogoLoaded(logo: Locator, logoName: string) {
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', /.+/);

    const imageInfo = await logo.evaluate((img: HTMLImageElement) => ({
      src: img.currentSrc || img.src,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));

    expect(imageInfo.src).toBeTruthy();
    expect(imageInfo.complete).toBe(true);
    expect(imageInfo.naturalWidth).toBeGreaterThan(0);
    expect(imageInfo.naturalHeight).toBeGreaterThan(0);
    expect(logoName.length).toBeGreaterThan(0);
  }

  async expectPartnerLogosLoaded() {
    await this.expectPartnershipSectionLoaded();
    await this.expectPartnerLogoLoaded(this.utHealthLogo, 'UT Health San Antonio');
    await this.expectPartnerLogoLoaded(this.utSanAntonioLogo, 'UT San Antonio');
    await this.expectPartnerLogoLoaded(this.nursingLogo, 'UT Health San Antonio School of Nursing');
    await this.expectPartnerLogoLoaded(this.inneedLogo, 'InNeed');
  }

  async expectAllExpectedPartnerLogosExist() {
    await this.expectPartnershipSectionLoaded();
    await expect(this.utHealthLogo).toHaveAttribute('alt', 'UT Health San Antonio');
    await expect(this.utSanAntonioLogo).toHaveAttribute('alt', 'UT San Antonio');
    await expect(this.nursingLogo).toHaveAttribute('alt', 'UT Health San Antonio School of Nursing');
    await expect(this.inneedLogo).toHaveAttribute('alt', 'InNeed');
  }

  async setViewport(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async expectNoHorizontalOverflow() {
    const overflow = await this.page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > window.innerWidth + 2;
    });

    expect(overflow).toBe(false);
  }

  async expectResponsiveLayout() {
    await expect(this.page.locator('body')).toBeVisible();
    await expect(this.header).toBeVisible();
    await expect(this.heroSection).toBeVisible();
    await expect(this.aboutSection).toBeVisible();
    await expect(this.teamSection).toBeVisible();
    await expect(this.trainingSection).toBeVisible();
    await expect(this.testimonialsSection).toBeVisible();
    await expect(this.partnershipSection).toBeVisible();
    await expect(this.page.getByRole('contentinfo')).toBeVisible();
  }

  async openMobileMenu() {
    const hamburgerButton = this.page.locator('button[class*="flex items-center focus:outline-none"]');
    await hamburgerButton.click();
    await expect(this.page.locator('.mobile-menu')).toBeVisible();
  }

  async expectKeyboardTabOrder() {
    await this.page.keyboard.press('Tab');
    await expect(this.logoLink).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.languageTrigger).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.contactUsLink).toBeFocused();

    await this.page.keyboard.press('Tab');
    await expect(this.signInLink).toBeFocused();
  }

  async expectButtonsHaveAccessibleNames() {
    await expect(this.signInLink).toHaveAccessibleName(/sign in/i);
    await expect(this.startTrainingButton).toHaveAccessibleName(/start training/i);
    await expect(this.page.getByRole('button', { name: /submit/i }).first()).toHaveAccessibleName(/submit/i);
    await expect(this.testimonialsPreviousButton).toHaveAccessibleName(/previous testimonial/i);
    await expect(this.testimonialsNextButton).toHaveAccessibleName(/next testimonial/i);
  }

  async expectHeadingStructure() {
    const headings = this.page.locator('h1, h2, h3');
    const relevantHeadings = headings.filter({
      hasText: /CIRCLE stands for|About Circle|Study team|Training|Testimonials|Developed in Partnership/i,
    });

    await expect(headings.first()).toBeVisible();
    await expect.poll(async () => await relevantHeadings.count()).toBeGreaterThan(0);
  }

  async scrollToFooterAndBack() {
    await this.page.mouse.wheel(0, 2000);
    await this.page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    await this.page.mouse.wheel(0, -2500);
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  }

  async expectRepeatedScrollIsStable() {
    for (let index = 0; index < 3; index++) {
      await this.scrollToFooterAndBack();
      await expect(this.heroSection).toBeVisible();
      await expect(this.page.locator('body')).toBeVisible();
    }
  }

  async expectRapidNavigationBetweenHeaderAndFooterLinks() {
    await this.page.goto('/');
    await this.expectPublicUrl();

    await this.contactUsLink.click();
    await this.expectContactUsNavigation();
    await this.page.goBack();
    await this.expectPublicUrl();

    await this.page.mouse.wheel(0, 3000);
    await this.startTrainingButton.click();
    await this.expectSignInNavigation();
    await this.page.goBack();
    await this.expectSignInNavigation();
  }

  async expectBrowserHistoryWorks() {
    await this.page.goto('/');
    await this.signInLink.click();
    await this.expectSignInNavigation();
    await this.page.goBack();
    await this.expectPublicUrl();
    await this.page.goForward();
    await this.expectSignInNavigation();
  }

  async expectNoPlaceholderText() {
    const placeholderText = await this.page.locator('body').textContent();
    expect(placeholderText?.toLowerCase()).not.toContain('undefined');
    expect(placeholderText?.toLowerCase()).not.toContain('null');
    expect(placeholderText?.toLowerCase()).not.toContain('lorem ipsum');
  }

  async expectNoCriticalConsoleOrPageErrors() {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    this.page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    this.page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await this.page.goto('/');
    await this.heroSection.scrollIntoViewIfNeeded();
    await this.testimonialsNextButton.click();
    await this.page.getByRole('button', { name: /submit/i }).first().click();

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  }

  async expectRapidClicksStayStable() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    const startTransform = await this.getCarouselTransform();

    for (let index = 0; index < 3; index++) {
      await this.clickNextTestimonial();
    }

    const afterNextTransform = await this.getCarouselTransform();
    expect(afterNextTransform).not.toBe(startTransform);

    for (let index = 0; index < 3; index++) {
      await this.clickPreviousTestimonial();
    }

    const afterPrevTransform = await this.getCarouselTransform();
    expect(afterPrevTransform).not.toBe(afterNextTransform);
    await expect(this.testimonialsSection.locator('[data-embla-slide]')).toHaveCount(5);
  }

  async expectTestimonialArrowKeyboardAccessibility() {
    await this.testimonialsSection.scrollIntoViewIfNeeded();
    const startingTransform = await this.getCarouselTransform();

    await this.testimonialsNextButton.focus();
    await expect(this.testimonialsNextButton).toBeFocused();
    await expect(this.testimonialsNextButton).toHaveAttribute('aria-label', /next testimonial/i);
    await this.page.keyboard.press('Enter');

    await expect.poll(async () => await this.getCarouselTransform(), { timeout: 5000 }).not.toBe(startingTransform);
  }

  async getAllImages() {
    const images = this.page.locator('img');
    const count = await images.count();
    const results: { src: string | null; alt: string | null }[] = [];

    for (let index = 0; index < count; index++) {
      const img = images.nth(index);
      results.push({
        src: await img.getAttribute('src'),
        alt: await img.getAttribute('alt')
      });
    }

    return results;
  }

  async validateImageSources() {
    const images = await this.getAllImages();

    expect(images.length).toBeGreaterThan(0);

    for (const [index, image] of images.entries()) {
      expect(image.src, `Image at index ${index} is missing a src`).toBeTruthy();
      expect(image.src, `Image at index ${index} contains undefined`).not.toContain('undefined');
      expect(image.src, `Image at index ${index} contains null`).not.toContain('null');
    }
  }

  async expectAllImagesLoaded() {
    const images = this.page.locator('img');
    const count = await images.count();

    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index++) {
      const img = images.nth(index);
      const info = await img.evaluate((element: HTMLImageElement) => ({
        src: element.currentSrc || element.src,
        alt: element.alt,
        complete: element.complete,
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight
      }));

      expect(info.src, `Image at index ${index} is missing a src`).toBeTruthy();
      expect(info.complete, `Image at index ${index} is not complete`).toBe(true);
      expect(info.naturalWidth, `Image at index ${index} has zero width`).toBeGreaterThan(0);
      expect(info.naturalHeight, `Image at index ${index} has zero height`).toBeGreaterThan(0);
      expect(info.alt, `Image at index ${index} has empty alt text`).not.toBe('');
    }
  }
}
