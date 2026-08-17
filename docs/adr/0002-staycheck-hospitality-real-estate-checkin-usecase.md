---
adr_id: "0002"
title: "Add StayCheck Hospitality And Real Estate Check-In Use Case"
status: "Accepted"
date: "2026-08-17"
target_repos:
  - demo-id-frontend
business_issue: "#3"
---

# ADR-0002: StayCheck Hospitality And Real Estate Check-In Use Case

## 1. Context & Business Requirement
We need to showcase privacy-preserving, contactless identity verification using Hypersign ID inside a hospitality and real estate guest check-in flow ("StayCheck").

The demo should help sales representatives and product managers present how hotels, property managers, and short-term rental platforms can verify guest identity before arrival without requiring physical passport scans at the front desk or oversharing sensitive personally identifiable information.

## 2. Technical Specifications (`demo-id-frontend`)

### A. New Static Folder Structure
Create `usecases/staycheck/index.html` with a dedicated property booking and guest check-in portal:
* Load `../../config.js` script tag in `<head>`.
* Read `window.DEMO_ID_CONFIG` for `widgetUrl` and `demoIdBackendBaseURL`.
* Include a distinct hospitality-focused black visual theme that is clearly different from BeerKart, NuVex, and Bankify.
* Include `usecases/staycheck/assets/logo.png`.
* The page must be static-host compatible and work when served from `/demo-id-frontend/usecases/staycheck/`.

Suggested page content:
* Brand name: "StayCheck".
* Context text for privacy-preserving booking and remote pre-arrival verification.
* A landing page with a list/grid of bookable properties, similar to a short-term rental or Airbnb-style discovery flow.
* At least 3 mock property cards with:
  * property name
  * property image or visual preview
  * location
  * nightly price
  * capacity or room/unit type
  * short description
  * "Select" or "Book" action
* Date selection after a property is selected:
  * check-in date
  * check-out date
  * guest count if useful for the UI
* Booking summary after date selection:
  * selected property
  * check-in and check-out dates
  * guest count
  * estimated total
  * booking reference or pending reservation id
* Guest detail form:
  * guest name
  * guest email
* A clear identity verification call-to-action button: "Verify Identity with Hypersign".
* A visible status area for booking setup, verification setup, widget progress, errors, and success.

### B. Register Use Case in `src/App.vue`
Add the new entry to the `usecases` array in `src/App.vue`:
```javascript
{
  name: "StayCheck",
  slug: "staycheck",
  summary: "Contactless guest check-in for hospitality and real estate using Hypersign ID.",
  logo: `${basePath}usecases/staycheck/assets/logo.png`,
}
```

The central demo portal must show the StayCheck card alongside BeerKart, NuVex, and Bankify. Clicking the card must navigate to:
```text
/demo-id-frontend/usecases/staycheck/
```

### C. Hypersign ID Integration Logic
Implement the Hypersign widget integration using the existing patterns from `usecases/bankify/index.html`, `usecases/beerkart/index.html`, and `usecases/nuvex/index.html`.

Required behavior:
* Read shared environment values from:
```javascript
const demoIdConfig = window.DEMO_ID_CONFIG || {};
const state = {
  widgetUrl: demoIdConfig.widgetUrl || "https://verify.hypersign.id",
  demoIdBackendBaseURL: demoIdConfig.demoIdBackendBaseURL || "http://localhost:3007",
};
```
* Request verification session data from:
```text
POST ${state.demoIdBackendBaseURL}/get-required-tokens-and-session-for-a-user
```
* Send a JSON body containing at least:
```javascript
{ name, email }
```
* Store returned values:
  * `kycAdminToken`
  * `ssiAdminToken`
  * `kycUserAccessToken` or `userBearerToken`
  * `sessionId`
  * optional `widgetUrl`
* Build the Hypersign widget URL with:
  * `kycAccessToken`
  * `ssiAccessToken`
  * `sessionId`
  * `kycUserAccessToken`
* Embed the widget in an iframe.
* Listen for `window.postMessage` events from the widget origin.
* Treat `status === "success"` and `code === "VERIFICATION_SUCCESS"` as successful check-in verification.
* Show restart or retry controls when verification fails due to expired session, expired token, liveness failure, document failure, proof generation failure, or unknown widget errors.
* Normalize `http://verify.hypersign.id` to `https://verify.hypersign.id`.

### D. User Flow & UI State
Implement the following UI states:

* **Property Discovery View (`#property-view`):**
  * Show StayCheck branding and black hospitality theme.
  * Show a list/grid of mock properties.
  * Each property card should allow the user to select a property.
  * Selecting a property should reveal or navigate to the booking date step without leaving the static page.

* **Booking Date View (`#booking-view`, hidden until a property is selected):**
  * Show selected property details.
  * Let the user choose check-in and check-out dates.
  * Include a "Proceed to Guest Details" button.
  * Show a reservation summary with selected dates and estimated total.

* **Guest Details View (`#guest-details-view`, hidden until booking dates are selected):**
  * Show the reservation summary.
  * Show guest detail fields:
    * Name (`#guest-name`)
    * Email (`#guest-email`)
  * Show CTA button (`#btn-start-checkin`) with text "Verify Identity with Hypersign".
  * Show status box (`#checkin-status`) with initial text "Enter guest details to start pre-arrival verification."

* **Verification View (`#verification-view`, hidden by default):**
  * Show an embedded Hypersign ID widget panel (`#staycheck-widget-panel`).
  * Use iframe id `#staycheck-widget-frame`.
  * Use placeholder id `#staycheck-widget-placeholder`.
  * Show text explaining that StayCheck confirms identity credentials without storing physical ID scans in this demo.
  * On desktop, place this panel in the primary check-in area.
  * On mobile, replace the guest details/reservation action area with the widget so the user does not need to scroll down to find it.

* **Verified View (`#verified-view`, hidden by default):**
  * Display "Reservation Booked".
  * Display a confirmation message including the guest name.
  * Show selected property and booking date details.
  * Show a mock confirmation number, arrival instruction, or digital key readiness message.
  * Include a "Start Another Check-In" button (`#btn-new-checkin`) that resets the demo.

### E. UX Requirements
* The demo should feel like a hospitality/property management booking and check-in experience, not a banking or commerce page.
* Use a polished black theme suitable for hotels, serviced apartments, or short-term rentals.
* The first screen should prioritize property discovery with visible property options.
* The flow should feel similar to a simplified Airbnb-style booking journey:
  * choose property
  * choose dates
  * enter guest details
  * verify identity with Hypersign ID
  * receive booking confirmation
* Avoid one-note color palettes; use a balanced palette with clear contrast.
* Keep cards at 8px border radius or less.
* Ensure the widget is visible immediately after the session is generated, especially on mobile.
* Avoid relying on browser popups. Use an embedded iframe panel, matching the repo's existing widget approach.
* Provide clear loading states while the verification session is being generated.
* Avoid exposing tokens in visible UI text.

### F. Assets
Create a simple StayCheck logo image at:
```text
usecases/staycheck/assets/logo.png
```

The implementing agent may generate any logo that reflects the hospitality, stay, booking, real estate, or guest check-in use case. Keep all StayCheck-specific assets inside `usecases/staycheck/assets/`.

### G. Tests And Build
Update or add tests so the following are covered:
* `usecases/staycheck/index.html` exists.
* `usecases/staycheck/assets/logo.png` exists.
* `src/App.vue` contains the StayCheck use case entry.
* StayCheck loads `../../config.js`.
* StayCheck references `window.DEMO_ID_CONFIG`.
* StayCheck includes the required widget iframe id `staycheck-widget-frame`.

Run and ensure both commands pass:
```bash
npm run test
npm run build
```

### H. Acceptance Criteria Mapping
* **Dashboard Discovery:** StayCheck card appears on the central demo portal landing page.
* **Branding & Context:** StayCheck opens a dedicated black-themed guest booking and check-in portal with hospitality branding, property discovery, and reservation context.
* **Identity Integration:** The page asks the user to verify identity with Hypersign ID after property/date selection and guest detail entry, then confirms the reservation once verification succeeds.
* **Environment Flexibility:** Backend and widget URLs are read from shared `config.js` and work across local and GitHub Pages deployments.


--
--

-- 
--
--
--
--
--
-- 
