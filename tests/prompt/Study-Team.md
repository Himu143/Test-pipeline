# CIRCLE — Study Team Playwright MCP Test Scenarios

## Login Setup

1. Go to the login URL:
   https://mycaregivingcircle.org/auth/sign-in

2. Login with the provided credentials:
   - **Email:** `tajulislam@inneed.cloud`
   - **Password:** `J0hnc3na`

3. Verify that login is successful before starting the Study Team tests.

---

## TC-STUDY-001 — Study Team Page Load

**Page:** Study Team  
**URL:** https://mycaregivingcircle.org/home#study-team-section  
**Test Type:** UI + Functional + Navigation + Content Validation  
**Tool:** Playwright MCP  
**API Testing:** Out of scope

### Steps

1. Open the Study Team URL.
2. Verify the Study Team section is displayed.
3. Verify the page loads without visible errors.

**Expected:** Study Team page/section loads successfully.

---

## TC-STUDY-002 — Who We Are Section

### Steps

1. Verify the **WHO WE ARE** section is displayed.
2. Verify **Carole White, PhD, RN** is displayed.
3. Verify **Professor Emeritus** is displayed.
4. Verify the founder heading is displayed.
5. Verify the description is visible.
6. Verify the profile image is loaded.

**Expected:** Who We Are content, profile image, heading, and description are displayed correctly.

---

## TC-STUDY-003 — Study Team Content

### Steps

1. Verify **STUDY TEAM** is displayed.
2. Verify **Welcome to the CIRCLE Team** is displayed.
3. Verify the Research Team content is displayed.
4. Verify team member images are loaded.

**Expected:** Study Team content is displayed correctly.

---

## TC-STUDY-004 — Study Team Tabs

### Steps

1. Click **Research Team**.
2. Verify Research Team content is displayed.
3. Click **Research Staff**.
4. Verify the content changes.
5. Click **System Team**.
6. Verify the content changes.

**Expected:** All Study Team tabs are clickable and display the correct content.

---

## TC-STUDY-005 — Team Member Information

### Steps

Verify the following members and roles:

1. **Bianca Shieu, PhD, RN** — Principal Investigator
2. **Dr. Lixin Song, PhD, RN, FAAN** — Co-Investigator
3. **Roxana E Delgado, PhD, MS** — Collaborator
4. **Bianca Shieu, PhD, RN** — Biostatistician

**Expected:** Team member names, roles, descriptions, and images are displayed correctly.

---

## TC-STUDY-006 — Support Us Section

### Steps

1. Scroll to the **SUPPORT US** section.
2. Verify the Support Us heading is displayed.
3. Verify the support description is visible.
4. Verify the email input is displayed.
5. Verify the **Submit** button is displayed.
6. Enter a valid email.
7. Click **Submit**.
8. Verify the expected success message or behavior.

**Expected:** Support Us section is displayed correctly and email submission works as expected.

---

## TC-STUDY-007 — Support Us Email Validation

### Steps

1. Scroll to the Support Us section.
2. Leave the email field empty.
3. Click **Submit**.
4. Enter an invalid email.
5. Click **Submit**.

**Expected:** Appropriate validation is displayed and invalid/empty email cannot be submitted successfully.

---

## TC-STUDY-008 — Footer Validation

### Steps

1. Scroll to the footer.
2. Verify the CIRCLE logo is displayed.
3. Verify the Disclaimer content is displayed.
4. Verify the contact information is displayed.
5. Verify the copyright information is displayed.

**Expected:** Footer content is displayed correctly.

---

## TC-STUDY-009 — Footer Quick Links

### Steps

1. Click **Study Team**.
2. Verify the Study Team section is displayed.
3. Click **Training**.
4. Verify the Training page opens.
5. Return to the Study Team page.
6. Click **Community**.
7. Verify the Community page opens.
8. Return to the Study Team page.
9. Click **Resources**.
10. Verify the Resources page opens.

**Expected:** All footer Quick Links navigate to the correct pages without errors.

---

## TC-STUDY-010 — Language Validation

### Steps

1. Verify **English** is displayed.
2. Verify **Spanish** is displayed.
3. Select **Spanish**.
4. Verify the expected Spanish content is displayed.
5. Switch back to **English**.
6. Verify English content is displayed.

**Expected:** Language selection works correctly.

---

## TC-STUDY-011 — Contact Information

### Steps

1. Verify phone number `210-450-8175` is displayed.
2. Verify email `circle@uthscsa.edu` is displayed.
3. If the phone/email is clickable, click it.
4. Verify the expected action occurs.

**Expected:** Contact information is displayed correctly and links/actions work where applicable.

---

## TC-STUDY-012 — Image Validation

### Steps

1. Verify the founder image is loaded.
2. Verify all visible team member images are loaded.
3. Verify the footer CIRCLE logo is loaded.
4. Check for broken images.

**Expected:** All required images load successfully without broken-image indicators.

---

## TC-STUDY-013 — Responsive UI

### Steps

Run the Study Team page on:

1. Desktop
2. Tablet
3. Mobile

Verify:

- Header/navigation
- Who We Are
- Study Team
- Team member cards
- Support Us
- Footer
- Quick Links
- Language options

**Expected:** Page content remains readable, usable, and properly aligned on supported screen sizes.

---

## TC-STUDY-014 — Console and Page Error Validation

### Steps

1. Open the Study Team page.
2. Check for browser console errors.
3. Navigate through Study Team tabs.
4. Test Support Us.
5. Test footer links.
6. Check for broken resources.

**Expected:** No unexpected JavaScript errors, broken resources, or failed navigation should occur.

---

# MCP Execution Rules

1. Use Playwright MCP to interact with the actual website.
2. Perform the login before executing Study Team test cases.
3. Inspect the live page before selecting locators.
4. Use accessible locators where possible.
5. Actually click and interact with tested elements.
6. Verify the result after every action.
7. Do not assume a link or button works without testing it.
8. Do not perform API testing.
9. Do not modify application source code.
10. Do not report PASS unless the scenario was actually executed.

# Test Result

For each test case report:

- **PASS**
- **FAIL**
- **BLOCKED**
- **NOT TESTED**

For failures, provide:

**Bug Title:**  
**Test Case:**  
**Steps:**  
**Expected:**  
**Actual:**  
**Severity:**  
**URL:**  
**Evidence:**  
**Console Error:**  

The MCP agent must distinguish between an application defect, locator issue, test-data issue, environment issue, and network issue before reporting a confirmed bug.
