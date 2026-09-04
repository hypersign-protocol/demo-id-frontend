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
});

test("bankify implements ADR onboarding requirements", () => {
  const html = readFileSync("usecases/bankify/index.html", "utf8");

  assert.match(html, /<script src="\.\.\/\.\.\/config\.js"><\/script>/);
  assert.match(html, /id="onboarding-form"/);
  assert.match(html, /id="input-name"/);
  assert.match(html, /id="input-email"/);
  assert.match(html, /<button[^>]+id="btn-verify"[^>]*>/);
  assert.match(html, /Hypersign/);
  assert.match(html, /id="dashboard-view"/);
  assert.match(html, /Welcome, /);
  assert.match(html, /\$12,450\.00/);
  assert.match(html, /Salary/);
  assert.match(html, /Coffee Shop/);
  assert.match(html, /Online Transfer/);
  assert.match(html, /get-required-tokens-and-session-for-a-user/);
  assert.match(html, /usecase: "bankify"/);
  assert.match(html, /widgetConfigId = data\.widgetConfigId \|\| ""/);
  assert.match(html, /searchParams\.set\("configId", state\.widgetConfigId\)/);
  assert.match(html, /window\.addEventListener\("message", handleWidgetMessage\)/);
  assert.match(html, /VERIFICATION_SUCCESS/);
});
