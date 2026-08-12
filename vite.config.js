import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const staticEntries = ["usecases", "config.js", ".nojekyll"];

function copyStaticUsecases() {
  return {
    name: "copy-static-usecases",
    closeBundle() {
      const root = resolve(".");
      const dist = resolve("dist");

      mkdirSync(dist, { recursive: true });

      for (const entry of staticEntries) {
        const source = join(root, entry);
        const target = join(dist, entry);

        if (!existsSync(source)) {
          continue;
        }

        rmSync(target, { force: true, recursive: true });

        if (entry.includes(".")) {
          copyFileSync(source, target);
        } else {
          cpSync(source, target, { recursive: true });
        }
      }
    },
  };
}

export default defineConfig({
  base: "/demo-id-frontend/",
  plugins: [vue(), copyStaticUsecases()],
});
