# Demo ID Frontend

Static frontend for listing ID demo use cases.

The root page lists all available use cases and links to each demo folder:

```text
http://127.0.0.1:5500/demo-id-frontend/
http://127.0.0.1:5500/demo-id-frontend/beerkart/
http://127.0.0.1:5500/demo-id-frontend/nuvex/
```

## 1. Running The App

This project is static. It does not need `npm install` or a build command.

Start a static server from the parent directory of this repo:

```bash
cd /Users/hermit/code/learn/ai-assistent-setup
python3 -m http.server 5500 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5500/demo-id-frontend/
```

Important: run the server from the parent directory, not from inside `demo-id-frontend`, because the app is expected to be served under the `/demo-id-frontend/` path.

## 2. Adding A New Use Case

Create a new folder inside this repo. Each use case should have its own folder with an `index.html` file.

Example:

```text
demo-id-frontend/
  mydemo/
    index.html
    assets/
      logo.png
```

If the use case needs the shared ID configuration, load the root config before the use case script:

```html
<script src="../config.js"></script>
<script>
    const demoIdConfig = window.DEMO_ID_CONFIG || {};

    const state = {
        widgetUrl: demoIdConfig.widgetUrl || "https://verify.hypersign.id",
        demoIdBackendBaseURL: demoIdConfig.demoIdBackendBaseURL || "http://localhost:3007",
    };
</script>
```

Then add the use case to the `usecases` array in `index.html`:

```js
{
    name: "My Demo",
    slug: "mydemo",
    summary: "Short description of this ID use case.",
    logo: `${basePath}mydemo/assets/logo.png`,
}
```

After this, the root page will show the new use case:

```text
http://127.0.0.1:5500/demo-id-frontend/
```

The new demo will be available at:

```text
http://127.0.0.1:5500/demo-id-frontend/mydemo/
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

This repo is ready for GitHub Pages because it is a static app.

Steps:

1. Push this repo to GitHub.
2. Open the GitHub repository settings.
3. Go to `Pages`.
4. Set the source to the branch you want to publish, usually `main`.
5. Set the folder to `/root`.
6. Save the settings.

After GitHub Pages finishes deploying, the app should be available at:

```text
https://<owner>.github.io/demo-id-frontend/
```

The use case links will follow the same path:

```text
https://<owner>.github.io/demo-id-frontend/beerkart/
https://<owner>.github.io/demo-id-frontend/nuvex/
```

The `.nojekyll` file is included so GitHub Pages serves the static files directly.
