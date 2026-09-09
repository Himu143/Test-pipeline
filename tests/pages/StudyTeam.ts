import type { Page } from "@playwright/test";
import type { Locator } from "@playwright/test";

export class StudyTeamPage {
  readonly page: Page;
  readonly studyTeamSection: Locator;
  readonly studyTeamHeading: Locator;
  readonly welcomeHeading: Locator;
  readonly researchTeamSection: Locator;
  readonly researchIntroduction: Locator[];
  readonly memberNames: Locator;
  readonly memberRoles: Locator[];
  readonly memberImages: Locator[];
  readonly researchTeamTab: Locator;
  readonly researchStaffTab: Locator;
  readonly systemTeamTab: Locator;
  readonly researchTeamContent: Locator;
  readonly researchStaffContent: Locator;
  readonly systemTeamContent: Locator;
  readonly systemTeamIntroduction: Locator[];
  readonly systemTeamMemberNames: Locator[];
  readonly systemTeamMemberRoles: Locator[];
  readonly systemTeamMemberImages: Locator;
  readonly researchStaffMemberNames: Locator;
  readonly researchStaffMemberRoles: Locator[];
  readonly researchStaffMemberImages: Locator;
  readonly whoWeAreSection: Locator;
  readonly whoWeAreHeading: Locator;
  readonly founderName: Locator;
  readonly founderRole: Locator;
  readonly founderHeading: Locator;
  readonly founderDescription: Locator;
  readonly founderImage: Locator;
  readonly header: Locator;
  readonly logo: Locator;
  readonly studyTeamLink: Locator;
  readonly trainingLink: Locator;
  readonly communityLink: Locator;
  readonly resourcesLink: Locator;
  readonly languageButton: Locator;
  readonly userGuideButton: Locator;
  readonly footer: Locator;
  readonly footerLogo: Locator;
  readonly footerDisclaimer: Locator;
  readonly footerDisclaimerParagraphs: Locator[];
  readonly footerContactInformation: Locator;
  readonly footerCopyright: Locator;
  readonly footerStudyTeamLink: Locator;
  readonly footerTrainingLink: Locator;
  readonly footerCommunityLink: Locator;
  readonly footerResourcesLink: Locator;
  readonly supportUsSection: Locator;
  readonly supportUsHeading: Locator;
  readonly supportDescription: Locator;
  readonly supportEmailInput: Locator;
  readonly supportSubmitButton: Locator;
  readonly supportEmailValidationMessage: Locator;
  readonly supportSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.studyTeamSection = page.locator("#study-team-section");
    this.studyTeamHeading = this.studyTeamSection.getByText("Study Team", {
      exact: true,
    });
    this.welcomeHeading = this.studyTeamSection.getByRole("heading", {
      name: "Welcome to the CIRCLE Team",
      exact: true,
    });
    this.researchTeamSection = this.studyTeamSection.getByText("Research Team", {
      exact: true,
    });
    this.researchIntroduction = [
      this.studyTeamSection.getByText(
        "As the Principal Investigator of the CIRCLE project, I am honored to introduce you to the dedicated individuals behind our work. While we come from different backgrounds, ranging from nursing to data science, we are united by a single mission: to improve the quality of life for caregivers and patients with dementia.",
        { exact: true },
      ),
      this.studyTeamSection.getByText(
        "This team was carefully selected not just for their academic excellence, but for their genuine passion for this community. Below, you will meet the experts who are working tirelessly to turn research into real-world support for you.",
        { exact: true },
      ),
    ];
    this.memberNames = this.studyTeamSection.getByRole("heading", {
      name: /Bianca Shieu, PhD, RN|Dr\. Lixin Song, PhD, RN, FAAN|Roxana E Delgado, PhD, MS/,
    });
    this.memberRoles = [
      this.studyTeamSection.getByText("Principal Investigator", { exact: true }),
      this.studyTeamSection.getByText("Co-Investigator", { exact: true }),
      this.studyTeamSection.getByText("Collaborator", { exact: true }),
      this.studyTeamSection.getByText("Biostatistician", { exact: true }),
    ];
    this.memberImages = [
      this.studyTeamSection.getByRole("img", {
        name: "Portrait of Bianca Shieu, PhD, RN",
        exact: true,
      }).nth(0),
      this.studyTeamSection.getByRole("img", {
        name: "Portrait of Bianca Shieu, PhD, RN",
        exact: true,
      }).nth(1),
      this.studyTeamSection.getByRole("img", {
        name: "Portrait of Dr. Lixin Song, PhD, RN, FAAN",
        exact: true,
      }),
      this.studyTeamSection.getByRole("img", {
        name: "Portrait of Roxana E Delgado, PhD, MS",
        exact: true,
      }),
    ];
    this.researchTeamTab = this.studyTeamSection.getByRole("button", {
      name: "Research Team",
      exact: true,
    });
    this.researchStaffTab = this.studyTeamSection.getByRole("button", {
      name: "Research Staff",
      exact: true,
    });
    this.systemTeamTab = this.studyTeamSection.getByRole("button", {
      name: "System Team",
      exact: true,
    });
    this.researchTeamContent = this.studyTeamSection.getByRole("heading", {
      name: "Bianca Shieu, PhD, RN",
      exact: true,
    }).first();
    this.researchStaffContent = this.studyTeamSection.getByText(
      "Project Coordinator",
      { exact: true },
    );
    this.systemTeamContent = this.studyTeamSection.getByText(
      "Chief Product Architect",
      { exact: true },
    );
    this.systemTeamIntroduction = [
      this.studyTeamSection.getByText(
        "As the system development partner for the CIRCLE project, InNeed supports the platform's mission by transforming research insights into a reliable, accessible, and user-centered digital experience. Our role is to ensure the technology behind CIRCLE is intuitive, secure, and scalable, so caregivers and families can focus on what matters most.",
        { exact: true },
      ),
      this.studyTeamSection.getByText(
        "The system team brings together expertise in product design, engineering, accessibility, and cloud infrastructure. Beyond technical excellence, the team is committed to building inclusive, easy-to-use solutions that respond to the needs of caregivers and older adults, supporting the CIRCLE community.",
        { exact: true },
      ),
    ];
    this.systemTeamMemberNames = [
      "Shamim Ashrafi",
      "Shaman Sharif",
      "Mahdi Bakhtiar",
      "Prodipto Archo",
    ].map((name) =>
      this.studyTeamSection.getByRole("heading", { name, exact: true }),
    );
    this.systemTeamMemberRoles = [
      "Chief Product Architect",
      "System Architect",
      "Product Designer",
      "Business Dev. Manager",
    ].map((role) => this.studyTeamSection.getByText(role, { exact: true }));
    this.systemTeamMemberImages = this.studyTeamSection.locator('[role="img"]');
    this.researchStaffMemberNames = this.studyTeamSection.getByRole("heading", {
      name: "Name goes here",
      exact: true,
    });
    this.researchStaffMemberRoles = [
      this.studyTeamSection.getByText("Project Coordinator", { exact: true }),
      this.studyTeamSection.getByText("Interventionist", { exact: true }),
      this.studyTeamSection.getByText("Research Assistant", { exact: true }),
      this.studyTeamSection.getByText("Research Assistants", { exact: true }),
    ];
    this.researchStaffMemberImages = this.studyTeamSection.locator('[role="img"]');
    this.whoWeAreSection = page
      .locator("section")
      .filter({ hasText: "Carole White, PhD, RN" })
      .first();
    this.whoWeAreHeading = this.page.getByRole("heading", {
      name: "Who We Are",
      exact: true,
    });
    this.founderName = this.page.getByRole("heading", {
      name: "Carole White, PhD, RN",
      exact: true,
    });
    this.founderRole = this.page.getByText("Professor Emeritus", {
      exact: true,
    });
    this.founderHeading = this.page.getByRole("heading", {
      name: "Founder of Learning Skills Together and Aprendiendo Juntos Program (Predecessor of CIRCLE)",
      exact: true,
    });
    this.founderDescription = this.page.getByText(
      'Dr. White is a Professor Emeritus at the UT Health San Antonio School of Nursing and the founding director of the Caring for the Caregiver program. Renowned for her "legacy of love" and advocacy in the San Antonio community, she has worked tirelessly to ensure caregivers feel seen, supported, and equipped for their journey. Moving forward, Dr. White will continue to support the team and the community as a consultant, ensuring her vision for compassionate, evidence-based care continues to thrive.',
      { exact: true },
    );
    this.founderImage = page.getByRole("img", {
      name: "Portrait of Dr. Carole White",
      exact: true,
    });
    this.header = page.getByRole("banner");
    this.logo = this.header.getByRole("img", { name: "Logo", exact: true });
    this.studyTeamLink = this.header.getByRole("link", {
      name: "Study Team",
      exact: true,
    });
    this.trainingLink = this.header.getByRole("link", {
      name: "Training",
      exact: true,
    });
    this.communityLink = this.header.getByRole("link", {
      name: "Community",
      exact: true,
    });
    this.resourcesLink = this.header.getByRole("link", {
      name: "Resources",
      exact: true,
    });
    this.languageButton = this.header.getByRole("button", {
      name: /^(en|english)$/i,
    });
    this.userGuideButton = this.header.getByRole("button", {
      name: "User Guide",
      exact: true,
    });
    this.footer = page.getByRole("contentinfo");
    this.footerLogo = this.footer.getByRole("img", {
      name: "Circle Caregiver's Platform",
      exact: true,
    });
    this.footerDisclaimer = this.footer.getByRole("heading", {
      name: "Disclaimer",
      exact: true,
    });
    this.footerDisclaimerParagraphs = [
      "The Caregivers Involved in Resilience, Community, Learning, and Education (CIRCLE) website was developed by faculty at the UT Health San Antonio School of Nursing, in collaboration with patients, families, and a community advisory board.",
      "The information on the CIRCLE website is provided for research purposes only. It is not a substitute for professional medical care, and no medical advice or services are being offered.",
      "This website aims to provide useful, credible, and personalized information and support for caregivers and persons living with dementia before, during, and after diagnoses. CIRCLE provides educational videos, moderated discussion forums, and links to other resources to support our research goals. CIRCLE is not responsible for information provided on external websites or linked resources.",
      "If you have, or suspect you have, a health problem, you should consult your healthcare provider or physician.",
    ].map((text) => this.footer.getByText(text, { exact: true }));
    this.footerContactInformation = this.footer.getByText(
      "If you are interested in participating in this program, please call 210-450-8175 or email circle@uthscsa.edu",
      { exact: true },
    );
    this.footerCopyright = this.footer.locator("div.border-t p");
    this.footerStudyTeamLink = this.footer.getByRole("link", {
      name: "Study Team",
      exact: true,
    });
    this.footerTrainingLink = this.footer.getByRole("link", {
      name: "Training",
      exact: true,
    });
    this.footerCommunityLink = this.footer.getByRole("link", {
      name: "Community",
      exact: true,
    });
    this.footerResourcesLink = this.footer.getByRole("link", {
      name: "Resources",
      exact: true,
    });
    this.supportUsHeading = page.getByRole("heading", {
      name: "SUPPORT US",
      exact: true,
    });
    this.supportUsSection = this.supportUsHeading.locator("xpath=ancestor::section");
    this.supportDescription = this.supportUsSection.locator("p");
    this.supportEmailInput = this.supportUsSection.locator(
      'input[type="email"]',
    );
    this.supportSubmitButton = this.supportUsSection.getByRole("button", {
      name: "Submit",
      exact: true,
    });
    this.supportEmailValidationMessage = this.supportUsSection.locator(
      "p.text-red-600",
    );
    this.supportSuccessMessage = page.getByText(
      "Thank you for your interest in supporting CIRCLE! We will reach out to you shortly.",
      { exact: true },
    );
  }

  async goto() {
    await this.page.goto("/home#study-team-section");
  }

  async submitSupportEmail(email: string) {
    await this.supportUsSection.scrollIntoViewIfNeeded();
    await this.supportEmailInput.fill(email);
    await this.supportSubmitButton.click();
  }
}
