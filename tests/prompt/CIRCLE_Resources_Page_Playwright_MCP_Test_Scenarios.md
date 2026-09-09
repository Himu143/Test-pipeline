# CIRCLE Resources Page — Playwright MCP Test Scenarios

> **Scope:** Authorized Resources Page — Resource Library content only  
> **Excluded:** Header, Navigation Bar, Support Us section, Footer section  
> **API Testing:** Out of scope

---

## TC-RES-UI-001 — Resource Library Loads Successfully

**Page:** Authorized Resources Page  

**Test Type:** Smoke + UI + Functional Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectResourceLibraryVisible()`

### Steps

1. Navigate to the authorized Resources page.
2. Wait for the Resource Library content to load.
3. Verify the main Resource Library section is visible.
4. Verify no blank content area, application error, or unexpected failure is displayed.

**Expected:** The Resource Library loads successfully and is visible to the authorized user.

---

## TC-RES-UI-002 — Resource Library Header Content Is Displayed Correctly

**Page:** Authorized Resources Page  

**Test Type:** UI + Content + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectResourceLibraryHeader()`

### Steps

1. Open the Resources page.
2. Verify the section label displays `RESOURCES`.
3. Verify the primary heading displays `Comprehensive Resource Library`.
4. Verify the introductory description below the heading is visible.
5. Verify the label, heading, and description are not clipped, truncated, or overlapping.

**Expected:** The Resource Library label, heading, and introductory description are displayed correctly and remain fully readable.

---

## TC-RES-UI-003 — Exactly Six Unique Resource Category Cards Are Displayed (Cancel)

**Page:** Authorized Resources Page  

**Test Type:** UI + Functional + Negative + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectResourceCardCount(6)`, `expectNoDuplicateResourceCards()`

### Steps

1. Locate the Resource Library card grid.
2. Count all resource category cards.
3. Verify exactly six cards are displayed.
4. Collect the visible card titles.
5. Verify each resource category title appears only once.
6. Verify no duplicate or unintended resource card is present.

**Expected:** Exactly six unique resource category cards are displayed with no duplicate cards.

---

## TC-RES-UI-004 — All Resource Category Cards Display Correct Titles, Icons, and Descriptions

**Page:** Authorized Resources Page  

**Test Type:** UI + Content + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectAllResourceCardsContent()`

### Steps

1. Locate all six resource category cards.
2. Verify the following titles are displayed:
   - `Clinical Guidance`
   - `Support Networks`
   - `Crisis Resources`
   - `Our Publications`
   - `Legal Resources`
   - `Federal Resources (NIH, CDC)`
3. Verify each card displays its intended category icon.
4. Verify each card contains a non-empty description.
5. Verify no icon, title, or description is missing.

**Expected:** All six cards display the correct category title, icon, and description.

---

## TC-RES-CONTENT-005 — Resource Category Descriptions Match Their Intended Topics

**Page:** Authorized Resources Page  

**Test Type:** Content + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectResourceDescriptionsCorrect()`

### Steps

1. Verify the Clinical Guidance description refers to medical advice, symptom management, and care strategies.
2. Verify the Support Networks description refers to support groups, organizations, community centers, or advocacy networks.
3. Verify the Crisis Resources description refers to emergency, mental-health crisis, or caregiver burnout support.
4. Verify the Our Publications description refers to research, articles, or caregiving insights.
5. Verify the Legal Resources description refers to legal topics such as power of attorney or advance directives.
6. Verify the Federal Resources description refers to reliable government information, official guidelines, or fact sheets.

**Expected:** Each resource card contains content appropriate to its intended resource category.

---

## TC-RES-FUNC-006 — All Resource Cards Open Their Correct Resource Collections

**Page:** Authorized Resources Page  

**Test Type:** Functional + Navigation + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `openResourceCategory()`, `expectCorrectResourceCategory()`

### Steps

1. Open the Resources page.
2. Click `Clinical Guidance` and verify the Clinical Guidance resource collection opens.
3. Return to the Resources page.
4. Click `Support Networks` and verify the Support Networks resource collection opens.
5. Repeat the same validation for:
   - Crisis Resources
   - Our Publications
   - Legal Resources
   - Federal Resources (NIH, CDC)
6. Verify every card opens only its corresponding resource category.

**Expected:** Each resource category card opens the correct resource collection and no card routes to an incorrect category.

---

## TC-RES-NEG-007 — Resource Card Navigation Does Not Produce Application Errors

**Page:** Authorized Resources Page  

**Test Type:** Functional + Negative + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM Methods:** `expectNoResourceNavigationErrors()`

### Steps

1. Open each of the six resource categories one at a time.
2. Verify the destination content loads successfully.
3. Verify no 404 page appears.
4. Verify no 500 or general application error appears.
5. Verify the page does not become blank or unresponsive.

**Expected:** All resource category destinations load without visible application errors.

---

## TC-RES-UI-008 — Resource Card Content Does Not Overflow or Get Truncated

**Page:** Authorized Resources Page  

**Test Type:** UI + Negative + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectNoCardContentOverflow()`

### Steps

1. Inspect all six resource cards.
2. Verify every card title remains inside its card boundary.
3. Verify every card description remains completely visible.
4. Verify category icons do not overlap titles or descriptions.
5. Verify no text is clipped, cut off, or visually truncated.

**Expected:** All resource-card content remains fully visible without overflow, clipping, or overlap.

---

## TC-RES-UI-009 — Resource Cards Maintain Consistent Desktop Grid Alignment and Spacing

**Page:** Authorized Resources Page  

**Test Type:** UI + Visual + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectDesktopGridLayout()`, `expectConsistentCardLayout()`

### Steps

1. Set the browser to a supported desktop viewport.
2. Inspect the Resource Library grid.
3. Verify three cards appear in the first row and three in the second row.
4. Verify card widths and heights are visually consistent.
5. Verify horizontal and vertical spacing between cards is consistent.
6. Verify icon, title, and description alignment is consistent.

**Expected:** At desktop size, the six cards display in a consistent 3-column × 2-row grid.

---

## TC-RES-A11Y-010 — Resource Cards Have Meaningful Accessible Names

**Page:** Authorized Resources Page  

**Test Type:** Accessibility + UI Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectAccessibleResourceCardNames()`

### Steps

1. Inspect the interactive resource cards using Playwright accessibility roles.
2. Verify each card exposes a meaningful accessible name.
3. Verify the accessible name corresponds to the visible resource title.
4. Verify no interactive resource card is exposed as an unnamed clickable element.

**Expected:** Each resource card can be correctly identified by assistive technologies.

---

## TC-RES-A11Y-011 — Resource Cards Are Keyboard Accessible and Activatable

**Page:** Authorized Resources Page  

**Test Type:** Accessibility + Keyboard + Functional Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `focusResourceCards()`, `activateFocusedResourceCard()`

### Steps

1. Open the Resources page.
2. Use `Tab` to move through interactive content until a resource card receives focus.
3. Verify a visible focus indicator appears.
4. Continue tabbing and verify all interactive resource cards can receive focus.
5. Focus a resource card and press `Enter`.
6. Verify the corresponding resource collection opens.

**Expected:** All interactive resource cards are reachable by keyboard, show visible focus, and can be activated using the keyboard.

---

## TC-RES-RWD-012 — Resource Library Displays Correctly on Desktop

**Page:** Authorized Resources Page  

**Test Type:** Responsive + UI + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectDesktopResourceLayout()`

### Steps

1. Set the viewport to approximately `1440 × 900`.
2. Open the Resources page.
3. Verify the heading and introductory text are displayed correctly.
4. Verify all six resource cards are visible.
5. Verify the card grid is aligned correctly.
6. Verify no unintended horizontal scrolling is present.

**Expected:** The Resource Library displays correctly at a standard desktop resolution.

---

## TC-RES-RWD-013 — Resource Library Displays Correctly on Tablet

**Page:** Authorized Resources Page  

**Test Type:** Responsive + UI + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectTabletResourceLayout()`

### Steps

1. Set the viewport to approximately `768 × 1024`.
2. Open the Resources page.
3. Verify the Resource Library adapts to the available width.
4. Verify all six cards remain accessible.
5. Verify titles and descriptions remain readable.
6. Verify cards do not overlap.
7. Verify no unintended horizontal scrolling occurs.

**Expected:** The Resource Library adapts correctly to tablet dimensions without clipping, overlap, or horizontal overflow.

---

## TC-RES-RWD-014 — Resource Library Displays Correctly on Mobile

**Page:** Authorized Resources Page  

**Test Type:** Responsive + UI + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectMobileResourceLayout()`

### Steps

1. Set the viewport to approximately `390 × 844`.
2. Open the Resources page.
3. Verify the main heading remains readable.
4. Verify the introductory description wraps correctly.
5. Scroll through the Resource Library.
6. Verify all six resource cards remain visible and accessible.
7. Verify card content does not overlap or become clipped.
8. Verify no unintended horizontal scrolling occurs.

**Expected:** The Resource Library remains fully usable and readable on a mobile viewport.

---

## TC-RES-RWD-015 — Federal Resources Long Title Wraps Correctly

**Page:** Authorized Resources Page  

**Test Type:** Responsive + UI + Negative Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectFederalResourcesTitleResponsive()`

### Steps

1. Open the Resources page at a narrow viewport.
2. Locate `Federal Resources (NIH, CDC)`.
3. Verify the complete title remains visible.
4. Verify the title wraps naturally when required.
5. Verify `(NIH, CDC)` is not clipped.
6. Verify the title does not overlap the description.

**Expected:** The complete Federal Resources title remains readable on smaller screens.

---

## TC-RES-NEG-016 — Resource Cards Do Not Overlap or Render Outside the Resource Grid

**Page:** Authorized Resources Page  

**Test Type:** UI + Negative + Responsive + Regression Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourceCardsComponent`  

**POM Methods:** `expectNoResourceCardOverlap()`, `expectCardsInsideResourceGrid()`

### Steps

1. Identify the Resource Library card grid.
2. Verify all six category cards are contained within the intended grid.
3. Verify no card overlaps another card.
4. Verify no card is rendered outside or behind the Resource Library section.
5. Repeat the validation at desktop, tablet, and mobile viewport sizes.

**Expected:** All resource cards remain inside the intended Resource Library grid and do not overlap at supported viewport sizes.

---

## TC-RES-NEG-017 — Resource Library Has No Unexpected Horizontal Overflow

**Page:** Authorized Resources Page  

**Test Type:** UI + Negative + Responsive Validation  

**Tool:** Playwright MCP  

**API Testing:** Out of scope  

**POM:** `ResourcesPage`  

**POM Methods:** `expectNoHorizontalOverflow()`

### Steps

1. Open the Resources page at desktop size.
2. Compare the document width with the viewport width.
3. Verify the Resource Library remains inside the viewport.
4. Repeat the validation at tablet and mobile sizes.
5. Verify no unintended horizontal scrollbar is caused by the Resource Library.

**Expected:** The Resource Library does not create unintended horizontal page overflow at supported viewport sizes.


## TC-RES-UI-018 — All Resource Category Icons Load Successfully

### Page: Authorized Resources Page

## Test Type: UI + Visual + Regression Validation

## Tool: Playwright MCP

## API Testing: Out of scope

## POM: ResourceCardsComponent

## POM Methods: expectAllResourceIconsLoaded()

## Steps
1. Navigate to the authorized Resources page.
2. Scroll to the Resource Library card section.
3. Verify the icon for Clinical Guidance is visible and successfully loaded.
4. Verify the icon for Support Networks is visible and successfully loaded.
5. Verify the icon for Crisis Resources is visible and successfully loaded.
6. Verify the icon for Our Publications is visible and successfully loaded.
7. Verify the icon for Legal Resources is visible and successfully loaded.
8. Verify the icon for Federal Resources (NIH, CDC) is visible and successfully loaded.
9. Verify no broken-image placeholder, missing icon, or empty icon container is displayed.
10. Verify each icon is correctly positioned above its corresponding resource title.

Expected: All six Resource Library category icons load successfully, are clearly visible, and appear in the correct card without broken or missing assets.

---

## TC-RES-FUNC-019 — Authorized User Can Open Clinical Guidance and Read the First Resource

**Page:** Authorized Resources Page → Clinical Guidance resource collection

**Test Type:** Functional + Navigation + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ResourcesPage`

**POM Methods:** `openClinicalGuidance()`, `clickFirstReadMore()`

### Steps

1. Log in with valid credentials.
2. Navigate to the Resources page.
3. Click the `Clinical Guidance` resource category card.
4. Verify the Clinical Guidance resource collection page opens at `/resources/clinical-guidance`.
5. Verify the first resource card is visible with its title, short description, and `Read More` link.
6. Verify the first resource `Read More` link points to the resource's external URL and opens in a new tab (`target="_blank"`).
7. Click the first resource `Read More` link.
8. Verify a new tab opens and navigates to the expected external resource URL.

**Expected:** An authorized user can open the Clinical Guidance collection and clicking `Read More` on the first resource opens its external resource URL in a new tab.



## TC-RES-FUNC-020 — Authorized User Can Bookmark a Resource Successfully

**Page:** Authorized Resources Page → Resource Collection

**Test Type:** Functional + UI + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ResourceCollectionPage`

**POM Methods:** `bookmarkResource()`, `expectResourceBookmarked()`

### Steps

1. Log in with valid credentials.
2. Navigate to the Resources page.
3. Open any resource category.
4. Locate the first resource card.
5. Click the bookmark control for the resource.
6. Verify the bookmark control changes to its bookmarked state.
7. Refresh the page.
8. Verify the resource remains bookmarked.
9. Verify no error message or unexpected application failure is displayed.

**Expected:** The authorized user can bookmark a resource successfully, and the bookmarked state persists after refreshing the page.


## TC-RES-FUNC-021 — Authorized User Can Search Resources by Title

**Page:** Authorized Resources Page → Resource Collection

**Test Type:** Functional + UI + Negative + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ResourceCollectionPage`

**POM Methods:** `searchResources()`, `expectSearchResult()`, `expectNoSearchResults()`

### Steps

1. Log in with valid credentials.
2. Navigate to the Resources page.
3. Open the `Clinical Guidance` resource category.
4. Locate the resource search input.
5. Enter `Understanding` in the search input.
6. Verify the URL contains the `search=Understanding` query parameter.
7. Verify only the `Understanding Alzheimer's and Dementia` resource is displayed.
8. Verify the other Clinical Guidance resource is not displayed.
9. Replace the search text with `does-not-exist`.
10. Verify no resource cards are displayed.
11. Verify the `No Resources Found` message is displayed.

**Expected:** The authorized user can search resources by title, matching resources are displayed, non-matching resources are excluded, and an informative empty state is shown when no resources match.