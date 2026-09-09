# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Docker

Build the production nginx image with the public SvelteKit variables baked in:

```sh
docker build \
  --build-arg PUBLIC_BASE_API=https://api.example.com \
  --build-arg PUBLIC_BASE_RESOURCE_API=https://resources.example.com \
  --build-arg PUBLIC_RESOURCE_ASSET_URL=https://assets.example.com \
  --build-arg PUBLIC_BASE_AUTH_URL=https://auth.example.com \
  -t circle-web-app:local .
```

Run it locally:

```sh
docker run --rm -p 8080:80 circle-web-app:local
```

The container serves the static app through nginx on port `80` and exposes `/healthz` for Kubernetes probes.
