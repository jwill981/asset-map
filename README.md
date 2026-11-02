# Asset Map

A simple React web app for displaying and managing points on a map.

## Local development

Prerequisites:

- Node.js 22
- pnpm 10

Install dependencies:

```sh
corepack enable
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Create a production build:

```sh
pnpm build
```

Preview the production build locally:

```sh
pnpm preview
```

## GitHub Pages deployment

The site is built with Vite and deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

When changes are pushed to `main`, the workflow:

1. Checks out the repository.
2. Installs the locked pnpm dependencies.
3. Builds the app into `dist`.
4. Uploads `dist` as the GitHub Pages artifact.
5. Deploys the artifact to the `github-pages` environment.

The deployment workflow can also be started manually from the repository's
**Actions** tab by selecting **Deploy to GitHub Pages** and running it.

The repository is configured to publish from GitHub Actions. In the GitHub
repository settings, open **Pages** and select **GitHub Actions** as the source.
The deployed site will be available at:

```text
https://jwill981.github.io/asset-map/
```
