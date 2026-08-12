---
adr_id: "0001"
title: "Add Bankify Customer Onboarding Use Case"
status: "Accepted"
date: "2026-08-12"
target_repos:
  - demo-id-frontend
business_issue: "architecture-and-specs#1"
---

# ADR-0001: Bankify Customer Onboarding Use Case

## 1. Context & Business Requirement
We need to showcase identity verification using Hypersign ID inside a mock banking onboarding flow ("Bankify").

## 2. Technical Specifications (`demo-id-frontend`)

### A. New Static Folder Structure
Create `usecases/bankify/index.html` with basic HTML styling for a modern banking app onboarding screen:
* Load `../../config.js` script tag in `<head>`.
* Read `window.DEMO_ID_CONFIG` for `widgetUrl` and `demoIdBackendBaseURL`.
* Add a button: "Verify Identity with Hypersign".

### B. Register Use Case in `src/App.vue`
Add the new entry to the `usecases` array in `src/App.vue`:
```javascript
{
  name: "Bankify",
  slug: "bankify",
  summary: "KYC customer onboarding for digital banking using Hypersign ID.",
  logo: `${basePath}usecases/bankify/assets/logo.png`,
}
```

### C. Hypersign ID Integration Logic
- Follow the exact widget popup and event listening implementation found in `usecases/beerkart/index.html`.

### D. User Flow & UI State
- **Form View (`#onboarding-form`):** Input fields for Name (`#input-name`) and Email (`#input-email`), with a "Verify Identity with Hypersign" button (`#btn-verify`).
- **Dashboard View (`#dashboard-view`, hidden by default):** 
  - Display user welcome message: "Welcome, <Name>".
  - Display mock balance: "$12,450.00".
  - Display table with 3 mock transactions (e.g., Salary, Coffee Shop, Online Transfer).

### E. Theme & Assets

- If the app need logo, developer can either choose from internet of use any dummy logo for now and keep the logo into folder `usecases/bankify/assets/` 
- Theme should be dark for this app


---
