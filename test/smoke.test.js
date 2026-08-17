import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

test("project has required entry files", () => {
  assert.equal(existsSync("index.html"), true);
  assert.equal(existsSync("src/App.vue"), true);
  assert.equal(existsSync("config.js"), true);
  assert.equal(existsSync("usecases/beerkart/index.html"), true);
  assert.equal(existsSync("usecases/nuvex/index.html"), true);
  assert.equal(existsSync("usecases/bankify/index.html"), true);
  assert.equal(existsSync("usecases/staycheck/index.html"), true);
});

test("bankify implements ADR onboarding requirements", () => {
  const html = readFileSync("usecases/bankify/index.html", "utf8");

  assert.match(html, /<script src="\.\.\/\.\.\/config\.js"><\/script>/);
  assert.match(html, /id="onboarding-form"/);
  assert.match(html, /id="input-name"/);
  assert.match(html, /id="input-email"/);
  assert.match(html, /id="btn-verify"/);
  assert.match(html, /Verify Identity with\s+Hypersign/);
  assert.match(html, /id="dashboard-view"/);
  assert.match(html, /Welcome, /);
  assert.match(html, /\$12,450\.00/);
  assert.match(html, /Salary/);
  assert.match(html, /Coffee Shop/);
  assert.match(html, /Online Transfer/);
  assert.match(html, /get-required-tokens-and-session-for-a-user/);
  assert.match(html, /window\.addEventListener\("message", handleWidgetMessage\)/);
  assert.match(html, /VERIFICATION_SUCCESS/);
});

test("staycheck implements ADR hospitality booking requirements", () => {
  const app = readFileSync("src/App.vue", "utf8");
  const html = readFileSync("usecases/staycheck/index.html", "utf8");

  assert.equal(existsSync("usecases/staycheck/assets/logo.png"), true);
  assert.match(app, /name: "StayCheck"/);
  assert.match(app, /slug: "staycheck"/);
  assert.match(app, /usecases\/staycheck\/assets\/logo\.png/);
  assert.match(html, /<script src="\.\.\/\.\.\/config\.js"><\/script>/);
  assert.match(html, /window\.DEMO_ID_CONFIG/);
  assert.match(html, /id="property-view"/);
  assert.match(html, /id="booking-view"/);
  assert.match(html, /id="guest-details-view"/);
  assert.match(html, /id="verification-view"/);
  assert.match(html, /id="verified-view"/);
  assert.match(html, /id="guest-name"/);
  assert.match(html, /id="guest-email"/);
  assert.match(html, /id="btn-start-checkin"/);
  assert.match(html, /Verify Identity with\s+Hypersign/);
  assert.match(html, /id="staycheck-widget-frame"/);
  assert.match(html, /id="staycheck-widget-placeholder"/);
  assert.match(html, /get-required-tokens-and-session-for-a-user/);
  assert.match(html, /window\.addEventListener\("message", handleWidgetMessage\)/);
  assert.match(html, /VERIFICATION_SUCCESS/);
  assert.match(html, /Reservation Booked/);
});
