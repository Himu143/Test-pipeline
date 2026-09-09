# CIRCLE Profile Menu — Playwright MCP Test Scenarios

> **Scope:** Authorized user header — profile avatar trigger and user dropdown menu only
> **Excluded:** Navigation bar links, Language selector, User Guide welcome dialog internals, page body content
> **API Testing:** Out of scope

---

## TC-PROFILE-UI-001 — Profile Avatar Is Visible in the Authenticated Header

**Page:** Authorized page (e.g., Home / Training / Resources)

**Test Type:** UI + Component + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `HeaderComponent`

**POM Methods:** `expectAvatarVisible()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page (for example the Training page).
3. Locate the profile avatar control in the top-right header.
4. Verify the avatar is visible.
5. Verify the avatar remains inside its circular boundary and is not clipped.
6. Verify the avatar is vertically aligned with the **User Guide** button.

**Expected:** The profile avatar is displayed correctly in the authenticated header.

---

## TC-PROFILE-UI-002 — Profile Avatar Opens the User Dropdown Menu

**Page:** Authorized page

**Test Type:** UI + Functional Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `HeaderComponent` / `ProfileMenu`

**POM Methods:** `openUserMenu()`, `expectUserMenuOpen()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar.
4. Verify a dropdown menu opens below the avatar.

**Expected:** Clicking the avatar opens the user dropdown menu.

---

## TC-PROFILE-UI-003 — Dropdown Displays the Logged-In User's Name and Email

**Page:** Authorized page — profile dropdown

**Test Type:** UI + Content Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `expectUserIdentity()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Verify the user's full name is displayed.
5. Verify the logged-in user's email address is displayed beneath the name.
6. Verify the displayed email matches the account used to sign in.

**Expected:** The dropdown shows the authenticated user's full name and email address.

---

## TC-PROFILE-UI-004 — Dropdown Contains Saved Items, Profile, and Logout

**Page:** Authorized page — profile dropdown

**Test Type:** UI + Content + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `expectMenuItemsVisible()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Verify a **Saved Items** menu item is present (with a bookmark icon).
5. Verify a **Profile** menu item is present (with a person icon).
6. Verify a **Logout** menu item is present (with a logout icon).
7. Verify no menu item overlaps another and all labels are fully readable.

**Expected:** The dropdown exposes Saved Items, Profile, and Logout actions for the signed-in user.

---

## TC-PROFILE-FUNC-005 — Saved Items Opens the Saved Items Page

**Page:** Authorized page → Saved Items

**Test Type:** Functional + Navigation + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `openSavedItems()`, `expectSavedItemsPage()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Click **Saved Items**.
5. Verify the browser navigates to the Saved Items page.
6. Verify the Saved Items page heading/content loads successfully.
7. Verify no 404 or application error is displayed.

**Expected:** Selecting Saved Items navigates the authorized user to the Saved Items page.

---

## TC-PROFILE-FUNC-006 — Profile Opens the My Profile Page

**Page:** Authorized page → My Profile

**Test Type:** Functional + Navigation + Regression Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `openProfile()`, `expectProfilePage()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Click **Profile**.
5. Verify the browser navigates to the My Profile page.
6. Verify the Profile page content loads successfully (e.g., the Personal Information section is visible).
7. Verify no 404 or application error is displayed.

**Expected:** Selecting Profile navigates the authorized user to the My Profile page.

---

## TC-PROFILE-FUNC-007 — Logout Signs the User Out and Returns to the Sign-In Page

**Page:** Authorized page → Sign In

**Test Type:** Functional + Navigation + Negative Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `logout()`, `expectSignedOut()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Click **Logout**.
5. Wait for the logout process to complete.
6. Verify the user is redirected to the Sign In page.
7. Verify the authenticated header (avatar, Saved Items, Profile) is no longer visible.
8. Verify an authenticated page (e.g., `/resources`) is no longer accessible without signing in again.

**Expected:** Logout ends the session, clears the authenticated header, and redirects the user to the Sign In page.

---

## TC-PROFILE-A11Y-008 — Dropdown Trigger Has an Accessible Name

**Page:** Authorized page

**Test Type:** Accessibility + UI Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `expectAccessibleTrigger()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Locate the profile avatar dropdown trigger.
4. Verify the trigger is exposed as a button to assistive technology.
5. Verify the trigger has a meaningful accessible name (e.g., an `Open user menu` sr-only label or the email-based avatar alt text).
6. Verify the trigger can be activated to open the menu.

**Expected:** The profile avatar dropdown trigger is identifiable and operable by assistive technology.

---

## TC-PROFILE-A11Y-009 — Dropdown Menu Items Are Keyboard Accessible

**Page:** Authorized page — profile dropdown

**Test Type:** Accessibility + Keyboard + Functional Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `expectKeyboardNavigation()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Focus the profile avatar trigger using the keyboard.
4. Press `Enter` or `Space` to open the dropdown.
5. Use the `ArrowDown` / `ArrowUp` keys to move through the menu items.
6. Verify focus moves between Saved Items, Profile, and Logout.
7. Press `Enter` on a menu item and verify the expected action/navigation occurs.
8. Press `Escape` and verify the dropdown closes.

**Expected:** All profile dropdown items are reachable and activatable with the keyboard, and the menu can be dismissed with Escape.

---

## TC-PROFILE-NEG-010 — Dropdown Closes on Outside Click

**Page:** Authorized page — profile dropdown

**Test Type:** UI + Negative Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `ProfileMenu`

**POM Methods:** `expectMenuClosesOnOutsideClick()`

### Steps

1. Log in with valid credentials.
2. Open an authenticated page.
3. Click the profile avatar to open the dropdown.
4. Verify the menu is open.
5. Click anywhere outside the dropdown (e.g., on the page body).
6. Verify the dropdown closes.
7. Verify clicking the avatar again reopens the dropdown.

**Expected:** The user dropdown closes when the user clicks outside it and can be reopened from the avatar.

---

## TC-PROFILE-NEG-011 — Dropdown Does Not Open for Unauthenticated Users

**Page:** Public page / Sign In page

**Test Type:** Negative + Functional Validation

**Tool:** Playwright MCP

**API Testing:** Out of scope

**POM:** `HeaderComponent`

**POM Methods:** `expectNoUserMenuWhenLoggedOut()`

### Steps

1. Open the application while logged out (or after logging out).
2. Verify the profile avatar is not displayed in the header.
3. Verify the **User Guide** button and user dropdown are not displayed.
4. Verify the header instead shows the Sign In action for public users.

**Expected:** The profile avatar and user dropdown are only rendered for authenticated users.

---
