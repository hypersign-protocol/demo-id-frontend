# Demo ID Frontend

Vue 3 frontend for listing ID demo use cases.

The root page lists all available use cases and links to each demo folder:

```text
http://127.0.0.1:5173/demo-id-frontend/
http://127.0.0.1:5173/demo-id-frontend/usecases/beerkart/
http://127.0.0.1:5173/demo-id-frontend/usecases/nuvex/
```

## 1. Running The App

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open:

```text
http://127.0.0.1:5173/demo-id-frontend/
```

The app is configured with the `/demo-id-frontend/` base path so local Vite URLs match GitHub Pages project URLs.

Build the deployable app:

```bash
npm run build
```

Run the smoke tests:

```bash
npm run test
```

The output is created in:

```text
dist/
```

Preview the built output locally:

```bash
npm run preview
```

Then open:

```text
http://127.0.0.1:4173/demo-id-frontend/
```

The build process copies the static use case folders and shared config into `dist`.

## 2. Adding A New Use Case

Create a new folder inside `usecases`. Each use case should have its own folder with an `index.html` file.

Example:

```text
demo-id-frontend/
  usecases/
    mydemo/
      index.html
      assets/
        logo.png
```

If the use case needs the shared ID configuration, load the root config before the use case script:

```html
<script src="../../config.js"></script>
<script>
    const demoIdConfig = window.DEMO_ID_CONFIG || {};

    const state = {
        widgetUrl: demoIdConfig.widgetUrl || "https://verify.hypersign.id",
        demoIdBackendBaseURL: demoIdConfig.demoIdBackendBaseURL || "http://localhost:3007",
    };
</script>
```

Then add the use case to the `usecases` array in `src/App.vue`:

```js
{
  name: "My Demo",
  slug: "mydemo",
  summary: "Short description of this ID use case.",
  logo: `${basePath}usecases/mydemo/assets/logo.png`,
}
```

After this, the root page will show the new use case:

```text
http://127.0.0.1:5173/demo-id-frontend/
```

The new demo will be available at:

```text
http://127.0.0.1:5173/demo-id-frontend/usecases/mydemo/
```

## Shared Configuration

Common values are kept in `config.js`:

```js
window.DEMO_ID_CONFIG = {
    widgetUrl: "https://verify.hypersign.id",
    demoIdBackendBaseURL: "http://localhost:3007",
};
```

Update this file when the widget URL or backend URL changes. Existing use cases read from this file, so the same values can be reused across demos.

## 3. Deploying On GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

Steps:

1. Push this repo to GitHub.
2. Open the GitHub repository settings.
3. Go to `Pages`.
4. Set the source to `GitHub Actions`.
5. Push to `main` to deploy, or push to `develop` to run test/build checks without deploying.

The workflow also uses `actions/configure-pages` with `enablement: true`, so it can enable GitHub Pages for the repository when permissions allow it. If the workflow still reports `Get Pages site failed`, enable Pages manually from `Settings -> Pages -> Source: GitHub Actions`, then rerun the workflow.

Deployment is restricted to the `main` branch. The workflow may run on `develop`, but the deploy job is skipped there to avoid GitHub Pages environment protection errors.

After GitHub Pages finishes deploying, the app should be available at:

```text
https://<owner>.github.io/demo-id-frontend/
```

The use case links will follow the same path:

```text
https://<owner>.github.io/demo-id-frontend/usecases/beerkart/
https://<owner>.github.io/demo-id-frontend/usecases/nuvex/
```

The workflow runs:

```bash
npm ci
npm run test
npm run build
```

Then it deploys the `dist` folder to GitHub Pages.

The `.nojekyll` file is copied into `dist` so GitHub Pages serves the static files directly.
