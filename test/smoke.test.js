import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

test("project has required entry files", () => {
  assert.equal(existsSync("index.html"), true);
  assert.equal(existsSync("src/App.vue"), true);
  assert.equal(existsSync("config.js"), true);
  assert.equal(existsSync("usecases/beerkart/index.html"), true);
  assert.equal(existsSync("usecases/nuvex/index.html"), true);
});
