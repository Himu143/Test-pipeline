# CIRCLE Training Page — UI Validation Test Cases

**Page:** Authorized Training Page  
**Reference:** Provided Training page screenshot  
**Test Scope:** UI + Visual + Content + Responsive Validation  
**Tool:** Playwright MCP  
**Architecture:** Page Object Model (POM)  
**API Testing:** Out of scope

---

## Recommended POM Structure

```text
tests/
├── pages/
│   └── TrainingPage.ts
├── components/
│   ├── HeaderComponent.ts
│   ├── TrainingHeroSection.ts
│   ├── ModuleGridSection.ts
│   ├── TrainingModuleCard.ts
│   ├── SupportUsSection.ts
│   └── FooterComponent.ts
└── specs/
    └── training-page-ui.spec.ts
```

---
## TC-TRAIN-UI-001 — Training Page Header Load

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectVisible(), expectLogoVisible(), expectNavigationVisible(), expectUserControlsVisible()`

### Steps

1. Open the authorized Training page.

2. Verify the global header is displayed.

3. Verify the CIRCLE logo is visible.

4. Verify the primary navigation is visible.

5. Verify the language selector is visible.

6. Verify the **User Guide** control is visible.

7. Verify the user profile/avatar control is visible.

**Expected:** The complete authenticated header is visible and aligned correctly.

---

## TC-TRAIN-UI-002 — Header Logo Visual Validation

**Page:** Authorized Training Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectLogoVisible(), expectLogoLoaded()`

### Steps

1. Locate the CIRCLE logo.

2. Verify the logo is visible.

3. Verify its image source is not empty.

4. Verify `naturalWidth > 0` and `naturalHeight > 0`.

5. Verify the logo is not stretched, cropped, or distorted.

**Expected:** The CIRCLE logo loads successfully with correct proportions.

---

## TC-TRAIN-UI-003 — Header Navigation Labels

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectNavigationLabels()`

### Steps

1. Verify **Study Team** is displayed.

2. Verify **Training** is displayed.

3. Verify **Community** is displayed.

4. Verify **Resources** is displayed.

**Expected:** All expected authenticated navigation labels are visible.

---

## TC-TRAIN-UI-004 — Training Navigation Active State

**Page:** Authorized Training Page  

**Test Type:** UI + State Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectActiveNavigationItem('Training')`

### Steps

1. Locate the **Training** navigation item.

2. Verify it has the active visual state.

3. Verify the active styling is distinguishable from the other navigation items.

4. Verify the active underline/border is positioned beneath **Training**.

**Expected:** Training is clearly shown as the currently selected navigation item.

---

## TC-TRAIN-UI-005 — Header Language Control

**Page:** Authorized Training Page  

**Test Type:** UI + Component Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectLanguageControlVisible()`

### Steps

1. Locate the language control.

2. Verify the language icon is visible.

3. Verify **English** is displayed.

4. Verify the dropdown indicator is visible.

5. Verify the control does not overlap neighboring elements.

**Expected:** The language control is readable and correctly positioned.

---

## TC-TRAIN-UI-006 — User Guide Button Visual Validation

**Page:** Authorized Training Page  

**Test Type:** UI + Component Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectUserGuideButtonVisible()`

### Steps

1. Locate the **User Guide** button.

2. Verify the button is visible.

3. Verify its icon and label are visible.

4. Verify text is vertically centered.

5. Verify the button does not overlap the user avatar.

**Expected:** The User Guide button is displayed cleanly as a distinct action.

---

## TC-TRAIN-UI-007 — Profile Avatar Visual Validation

**Page:** Authorized Training Page  

**Test Type:** UI + Component Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectAvatarVisible()`

### Steps

1. Locate the profile/avatar control.

2. Verify the avatar is visible.

3. Verify it remains inside its circular boundary.

4. Verify it is not clipped.

5. Verify it aligns vertically with the User Guide button.

**Expected:** The avatar is displayed correctly and aligned with the header.

---

## TC-TRAIN-UI-008 — Header Container Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Layout Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `HeaderComponent`  

**POM Methods:** `expectHeaderLayoutStable()`

### Steps

1. Inspect the header container.

2. Verify rounded corners are rendered consistently.

3. Verify the logo is aligned left.

4. Verify navigation is centered.

5. Verify user controls are aligned right.

6. Verify no element crosses the header boundary.

**Expected:** The header layout is stable with no clipping or overlap.

---

## TC-TRAIN-UI-009 — Training Hero Section Load

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectVisible(), expectContentVisible(), expectImageVisible()`

### Steps

1. Verify the hero section is displayed below the header.

2. Verify the light-yellow section background is visible.

3. Verify the text block appears on the left.

4. Verify the caregiver image collage appears on the right.

**Expected:** The Training hero section is displayed with the intended two-column layout.

---

## TC-TRAIN-UI-010 — Training Hero Label

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectEyebrowText('TRAINING')`

### Steps

1. Locate the small hero section label.

2. Verify **TRAINING** is displayed.

3. Verify it is visually separated from the main heading.

**Expected:** The TRAINING label is displayed correctly.

---

## TC-TRAIN-UI-011 — Training Hero Main Heading

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectHeading()`

### Steps

1. Locate the hero heading.

2. Verify it contains **Each week, we provide you with learning materials including interactive presentations, expert video content, and reflection questions.**

3. Verify the complete heading is readable.

4. Verify no line is clipped.

**Expected:** The full hero heading is visible without truncation.

---

## TC-TRAIN-UI-012 — Hero Heading Typography

**Page:** Authorized Training Page  

**Test Type:** UI + Typography Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectHeadingStyle()`

### Steps

1. Inspect the hero heading.

2. Verify it uses the intended prominent serif heading style.

3. Verify the font size is larger than body text.

4. Verify line height is sufficient.

5. Verify text contrast against the yellow background is readable.

**Expected:** The hero heading has clear hierarchy and remains readable.

---

## TC-TRAIN-UI-013 — Hero Caregiver Collage

**Page:** Authorized Training Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectImageVisible(), expectImageLoaded()`

### Steps

1. Locate the caregiver collage.

2. Verify all visible collage images are displayed.

3. Verify image sources are valid.

4. Verify `naturalWidth > 0` for each required image.

5. Verify rounded image boundaries are rendered correctly.

**Expected:** The hero caregiver collage loads without broken or distorted images.

---

## TC-TRAIN-UI-014 — Hero Text and Image Separation

**Page:** Authorized Training Page  

**Test Type:** UI + Layout Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingHeroSection`  

**POM Methods:** `expectNoOverlap()`

### Steps

1. Inspect the hero text block.

2. Inspect the hero image container.

3. Verify the two regions do not overlap.

4. Verify sufficient horizontal spacing exists between them.

**Expected:** Hero text and imagery remain visually separated.

---

## TC-TRAIN-UI-015 — Training Program Heading and description 

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `expectHeading()`

### Steps

1. Scroll to the training program section.

2. Verify **Self-Paced Comprehensive Training Program** is displayed.

3. Verify the heading is centered.

4. Verify it is not clipped or overlapped.

**Expected:** The training program heading is visible and centered correctly.

---

---

## TC-TRAIN-UI-017 — Primary Module Count

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `expectModuleCount(8)`

### Steps

1. Locate the primary training-module grid.

2. Count the module cards.

3. Verify exactly 8 primary training module cards are displayed.

**Expected:** Eight primary training module cards are displayed.

---

## TC-TRAIN-UI-018 — Desktop Module Grid Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Layout Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `expectDesktopGrid(4, 2)`

### Steps

1. Use a desktop viewport comparable to the reference.

2. Verify four cards are displayed in the first row.

3. Verify four cards are displayed in the second row.

4. Verify card widths are consistent.

5. Verify row and column spacing is consistent.

**Expected:** The module grid displays as a clean 4-column by 2-row desktop layout.

---

## TC-TRAIN-UI-019 — Module Card Visual Consistency

**Page:** Authorized Training Page  

**Test Type:** UI + Component Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectCardStyleConsistent()`

### Steps

1. Inspect all eight cards.

2. Verify each uses the same border radius.

3. Verify each uses the same card background.

4. Verify image dimensions are consistent.

5. Verify title, metadata, and status/action spacing is consistent.

**Expected:** All module cards follow one consistent visual component design.

---

## TC-TRAIN-UI-020 — All Module Images Load

**Page:** Authorized Training Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectAllImagesLoaded()`

### Steps

1. Locate each module image.

2. Verify every image is visible.

3. Verify each image has a non-empty source.

4. Verify `naturalWidth > 0` and `naturalHeight > 0`.

5. Verify images remain inside card boundaries.

**Expected:** All module images load successfully without broken states.

---

## TC-TRAIN-UI-021 — Module 1 Available State

**Page:** Authorized Training Page  

**Test Type:** UI + State + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `getModule(1), expectStatus('Available'), expectStartButtonVisible()`

### Steps

1. Locate Module 1.

2. Verify the title contains **Module 1: Welcome and Overview**.

3. Verify the **Available** badge is visible.

4. Verify approximate duration metadata is visible.

5. Verify the **Start Module** button is displayed.

6. Verify no locked instruction is shown on Module 1.

**Expected:** Module 1 is clearly presented as available and ready to start.

---

## TC-TRAIN-UI-022 — Module 1 Start Button Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Component Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `getModule(1), expectStartButtonVisible()`

### Steps

1. Locate the **Start Module** button.

2. Verify the label is readable.

3. Verify the arrow icon is visible.

4. Verify the button fits within the card.

5. Verify it does not overlap other content.

**Expected:** The Start Module button is cleanly rendered inside Module 1.

---

## TC-TRAIN-UI-023 — Locked State on Modules 2–8

**Page:** Authorized Training Page  

**Test Type:** UI + State Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `expectModulesLocked([2,3,4,5,6,7,8])`

### Steps

1. Locate Modules 2 through 8.

2. Verify each displays a **Locked** badge.

3. Verify the lock icon is visible where implemented.

4. Verify none of these modules displays **Available**.

**Expected:** Modules 2–8 are clearly identified as locked.

---

## TC-TRAIN-UI-024 — Locked Module Instruction

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectLockedInstruction()`

### Steps

1. Inspect Modules 2 through 8.

2. Verify each displays **Complete previous module to unlock.**

3. Verify the message is readable.

4. Verify the message remains inside the card boundary.

**Expected:** Every locked module displays the prerequisite instruction.

---

## TC-TRAIN-UI-025 — Module Titles Validation

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `expectModuleTitles()`

### Steps

1. Verify Module 1 contains **Welcome and Overview**.

2. Verify Module 2 contains **Caregiving Principles & Values**.

3. Verify Module 3 contains **Communication & Behavior**.

4. Verify Module 4 contains **Home Safety & Mobility**.

5. Verify Module 5 contains **Nutrition, Eating & Oral Health**.

6. Verify Module 6 contains **Medication Management**.

7. Verify Module 7 contains **Managing Health Issues: Pain, Diabetes & UTIs**.

8. Verify Module 8 contains **Planning for the Future**.

**Expected:** All module titles are present and readable.

---

## TC-TRAIN-UI-026 — Module Description Truncation

**Page:** Authorized Training Page  

**Test Type:** UI + Text Overflow Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectDescriptionClampingConsistent()`

### Steps

1. Inspect descriptions on all module cards.

2. Verify long descriptions use consistent truncation/ellipsis where intended.

3. Verify description text does not overlap duration metadata.

4. Verify text does not extend outside cards.

**Expected:** Module descriptions remain visually consistent and contained.

---

## TC-TRAIN-UI-027 — Module Duration Metadata

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectDurationVisible()`

### Steps

1. Inspect each module card.

2. Verify approximate duration metadata is visible.

3. Verify the clock icon is displayed where implemented.

4. Verify duration text is not clipped.

**Expected:** Each module displays readable duration information.

---

## TC-TRAIN-UI-028 — Status Badge Positioning

**Page:** Authorized Training Page  

**Test Type:** UI + Layout Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectStatusBadgePositionValid()`

### Steps

1. Inspect the Available badge on Module 1.

2. Inspect Locked badges on Modules 2–8.

3. Verify every badge remains inside the image/card area.

4. Verify badges do not cover module titles.

5. Verify badge styling is consistent.

**Expected:** Status badges are positioned consistently without disrupting card content.

---

## TC-TRAIN-UI-029 — Support Us Section Heading

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `expectVisible(), expectHeadingVisible()`

### Steps

1. Scroll below the primary module grid.

2. Verify **SUPPORT US** is displayed.

3. Verify **Support CIRCLE's Mission to Empower Caregivers** is displayed.

4. Verify the heading is centered and readable.

**Expected:** The Support Us section heading is displayed correctly.

---

## TC-TRAIN-UI-030 — Support Us Does Not Overlap Modules

**Page:** Authorized Training Page  

**Test Type:** UI + Layout + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `expectNoOverlapWithModules()`

### Steps

1. Locate the bottom boundary of the primary module grid.

2. Locate the top boundary of the Support Us section.

3. Verify there is visible vertical separation.

4. Verify the Support Us heading does not cover module cards.

5. Verify module content does not render through the Support Us background.

**Expected:** The Support Us section is visually separated from the training module grid.

---

## TC-TRAIN-UI-031 — No Duplicate Module Cards in Support Us

**Page:** Authorized Training Page  

**Test Type:** UI + Negative + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `expectNoDuplicateCardsInSupportSection()`

### Steps

1. Count the primary training cards.

2. Scroll into the Support Us area.

3. Verify Modules 5–8 are not unintentionally duplicated behind or inside the Support Us section.

4. Verify only intended Support Us content appears in that section.

**Expected:** Training cards appear only in the intended module grid and are not duplicated in the Support Us area.

---

## TC-TRAIN-UI-032 — Support Us Container Styling

**Page:** Authorized Training Page  

**Test Type:** UI + Visual Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection`  

**POM Methods:** `expectContainerStyle()`

### Steps

1. Inspect the Support Us container.

2. Verify the intended yellow background is visible.

3. Verify rounded corners are rendered correctly.

4. Verify the section width aligns with the main content container.

5. Verify content does not overflow the container.

**Expected:** The Support Us container matches the intended visual design.

---

## TC-TRAIN-UI-033 — Footer Load

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectVisible(), expectDisclaimerVisible(), expectQuickLinksVisible(), expectLanguagesVisible()`

### Steps

1. Scroll to the bottom of the page.

2. Verify the footer is displayed.

3. Verify the Disclaimer area is visible.

4. Verify the CIRCLE logo is visible.

5. Verify Quick Links are visible.

6. Verify Languages are visible.

7. Verify the copyright line is visible.

**Expected:** The complete footer is displayed correctly.

---

## TC-TRAIN-UI-034 — Footer Disclaimer Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Layout + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectDisclaimerLayoutStable()`

### Steps

1. Verify **Disclaimer** is displayed.

2. Inspect all disclaimer paragraphs.

3. Verify text is left aligned.

4. Verify paragraph spacing is consistent.

5. Verify disclaimer text does not overlap right-side footer content.

**Expected:** The disclaimer area is readable and contained within the footer.

---

## TC-TRAIN-UI-035 — Footer Participation Contact

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectParticipationContactVisible()`

### Steps

1. Locate the participation contact statement.

2. Verify `210-450-8175` is visible.

3. Verify `circle@uthscsa.edu` is visible.

4. Verify the contact statement is readable and not clipped.

**Expected:** The participation phone number and email address are visible.

---

## TC-TRAIN-UI-036 — Footer CIRCLE Logo

**Page:** Authorized Training Page  

**Test Type:** UI + Image Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectLogoLoaded()`

### Steps

1. Locate the footer CIRCLE logo.

2. Verify it is visible.

3. Verify its source is not empty.

4. Verify `naturalWidth > 0`.

5. Verify it is not stretched or distorted.

**Expected:** The footer CIRCLE logo loads correctly.

---

## TC-TRAIN-UI-037 — Footer Quick Links

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectQuickLinks()`

### Steps

1. Locate **Quick Links**.

2. Verify **Study Team** is visible.

3. Verify **Training** is visible.

4. Verify **Community** is visible.

5. Verify **Resources** is visible.

**Expected:** All expected Quick Links are displayed.

---

## TC-TRAIN-UI-038 — Footer Languages

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectLanguages()`

### Steps

1. Locate **Languages**.

2. Verify **English** is visible.

3. Verify **Spanish** is visible.

4. Verify the language items do not overlap.

**Expected:** English and Spanish are displayed correctly in the footer.

---

## TC-TRAIN-UI-039 — Footer Copyright

**Page:** Authorized Training Page  

**Test Type:** UI + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `FooterComponent`  

**POM Methods:** `expectCopyrightVisible()`

### Steps

1. Locate the copyright line.

2. Verify `© 2025` is displayed.

3. Verify **Developed by InNeed Intelligent Cloud** is displayed.

4. Verify **All rights reserved** is displayed.

5. Verify **The University of Texas at San Antonio** is displayed.

**Expected:** The expected copyright content is visible.

---

## TC-TRAIN-UI-040 — No Horizontal Overflow

**Page:** Authorized Training Page  

**Test Type:** UI + Layout + Negative Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `expectNoHorizontalOverflow()`

### Steps

1. Open the Training page at desktop width.

2. Compare the page scroll width with the client width.

3. Scroll through the complete page.

4. Verify no unintended horizontal scrollbar appears.

**Expected:** The Training page does not create unintended horizontal overflow.

---

## TC-TRAIN-UI-041 — No Major Section Overlap

**Page:** Authorized Training Page  

**Test Type:** UI + Layout + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `expectMajorSectionsDoNotOverlap()`

### Steps

1. Inspect the header/hero boundary.

2. Inspect the hero/training-content boundary.

3. Inspect the module-grid/Support Us boundary.

4. Inspect the Support Us/footer boundary.

5. Verify no section covers another section's content.

**Expected:** All major page sections remain visually separated.

---

## TC-TRAIN-UI-042 — No Broken Images

**Page:** Authorized Training Page  

**Test Type:** UI + Image + Negative Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `expectAllImagesLoaded()`

### Steps

1. Scroll from top to bottom to trigger lazy-loaded assets.

2. Locate all required images.

3. Verify each has a valid source.

4. Verify `complete === true`.

5. Verify `naturalWidth > 0` and `naturalHeight > 0`.

**Expected:** No required image is broken.

---

## TC-TRAIN-UI-043 — No Undefined or Placeholder Text

**Page:** Authorized Training Page  

**Test Type:** UI + Negative + Content Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `expectNoPlaceholderText()`

### Steps

1. Inspect visible page text.

2. Verify `undefined` is not displayed.

3. Verify `null` is not displayed.

4. Verify unresolved template placeholders are not visible.

5. Verify no unintended development placeholder text is shown.

**Expected:** No unresolved or placeholder UI text is visible.

---

## TC-TRAIN-UI-044 — Desktop Responsive Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Responsive Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `setViewport(), expectDesktopLayout()`

### Steps

1. Set a viewport around `1440 x 900`.

2. Verify the full header remains visible.

3. Verify hero text and imagery remain side-by-side.

4. Verify the module grid uses the intended desktop layout.

5. Verify Support Us and footer remain inside the viewport width.

**Expected:** The desktop layout remains stable without overlap or overflow.

---

## TC-TRAIN-UI-045 — Tablet Responsive Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Responsive + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `setViewport(), expectTabletLayout()`

### Steps

1. Set a viewport around `768 x 1024`.

2. Verify the header remains usable.

3. Verify hero content reflows without overlap.

4. Verify module cards reflow appropriately.

5. Verify titles and badges remain readable.

6. Verify footer content remains inside the viewport.

**Expected:** The Training page remains readable and visually stable on tablet.

---

## TC-TRAIN-UI-046 — Mobile Responsive Layout

**Page:** Authorized Training Page  

**Test Type:** UI + Responsive + Edge Case  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `setViewport(), expectMobileLayout()`

### Steps

1. Set a viewport around `390 x 844`.

2. Verify the header adapts appropriately.

3. Verify the hero heading remains readable.

4. Verify hero images do not overflow.

5. Verify module cards stack/reflow correctly.

6. Verify badges stay inside cards.

7. Verify Support Us does not overlap modules.

8. Verify the footer remains readable.

9. Verify no horizontal scrollbar appears.

**Expected:** The Training page is usable and visually stable on mobile.

---

## TC-TRAIN-UI-047 — Module State Is Not Color-Only

**Page:** Authorized Training Page  

**Test Type:** UI + Accessibility Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingModuleCard`  

**POM Methods:** `expectStatusTextAndIcon()`

### Steps

1. Inspect Module 1's available state.

2. Verify **Available** text is visible.

3. Inspect locked modules.

4. Verify **Locked** text is visible.

5. Verify state information is not communicated by color alone.

**Expected:** Module state is understandable without relying only on color.

---

## TC-TRAIN-UI-048 — Full Page Visual Regression

**Page:** Authorized Training Page  

**Test Type:** UI + Visual Regression  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `TrainingPage`  

**POM Methods:** `captureFullPageScreenshot(), compareWithBaseline()`

### Steps

1. Open the Training page at the approved desktop viewport.

2. Wait for images and fonts to load.

3. Scroll through the page to trigger lazy-loaded assets.

4. Return to the top.

5. Capture a full-page screenshot.

6. Compare it with the approved baseline.

7. Review differences in layout, spacing, typography, colors, images, cards, and section positioning.

**Expected:** The page matches the approved visual baseline within the project's accepted threshold.

---

## TC-TRAIN-UI-049 — Module Grid Visual Regression

**Page:** Authorized Training Page  

**Test Type:** UI + Visual Regression  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `ModuleGridSection`  

**POM Methods:** `captureScreenshot(), compareWithBaseline()`

### Steps

1. Scroll the module grid into view.

2. Wait for all module images to load.

3. Capture the complete primary module grid.

4. Compare it with the approved baseline.

5. Verify card dimensions, gaps, badges, titles, metadata, and Module 1 action styling.

**Expected:** The primary module grid matches the approved visual baseline.

---

## TC-TRAIN-UI-050 — Support Us and Footer Visual Regression

**Page:** Authorized Training Page  

**Test Type:** UI + Visual Regression + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope

**POM:** `SupportUsSection, FooterComponent`  

**POM Methods:** `captureScreenshot(), compareWithBaseline()`

### Steps

1. Scroll to the lower portion of the page.

2. Capture the Support Us and footer region.

3. Compare it with the approved baseline.

4. Verify the Support Us section does not overlap module cards.

5. Verify duplicate module cards are not visible.

6. Verify the footer begins below the Support Us section with appropriate spacing.

**Expected:** The lower-page layout matches the approved design without overlap or duplicate-card defects.

---

# POM Execution Notes

Keep selectors inside the Page Objects, not inside the test specifications.

For image validation, verify both visibility and natural dimensions:

```ts
const result = await image.evaluate((img: HTMLImageElement) => ({
  complete: img.complete,
  naturalWidth: img.naturalWidth,
  naturalHeight: img.naturalHeight,
}));

expect(result.complete).toBeTruthy();
expect(result.naturalWidth).toBeGreaterThan(0);
expect(result.naturalHeight).toBeGreaterThan(0);
```

For overlap validation, compare element bounding boxes. This is especially important for the **module grid → Support Us** boundary shown in the reference design.

For visual-regression tests, use the approved Training-page screenshot as the baseline only after the UI has been confirmed as correct. DOM/layout assertions should remain the primary checks; screenshot comparison should supplement them.
