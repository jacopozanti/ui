# The documentation site — docs.ui.jz.land.
#
#     docker build -t jz-ui-docs .
#
# The build context is the repo root, and it has to be: the site renders the
# library from `src/` rather than from a published package (see
# apps/docs/vite.config.ts), and its generator reads the library's own sources
# and package.json to build every page.
#
# In Coolify that is one resource on this repository:
#
#   Base Directory       /                      (NOT /apps/docs — as a Docker
#                                                context that leaves src/
#                                                outside the build, and both the
#                                                generator and Vite fail)
#   Dockerfile Location  /Dockerfile
#   Port                 3000
#
# Node 24: the version .nvmrc pins, and the one the npm 11 lockfile was written
# with.
FROM node:24-alpine AS build
WORKDIR /repo

# Manifests before sources, so editing a component doesn't reinstall the world.
COPY apps/docs/package.json apps/docs/package-lock.json apps/docs/
RUN cd apps/docs && npm ci

# The library itself. Only `src/` and the manifest: the site never touches
# `dist/`, and the library's own node_modules stay out — every shared dependency
# resolves to the app's copy (Vite's `resolve.dedupe`), which is the only way
# one React ends up in the bundle.
COPY package.json ./
COPY src src

COPY apps/docs apps/docs
RUN cd apps/docs && npm run build

# One fixed path out, so the runtime stage needs no build arguments.
RUN mv apps/docs/.output /output

# The nitro preset emits a standalone server: `.output` carries the runtime
# dependencies it needs and serves `public/` itself, so nothing is installed
# here — there is no second `npm ci` to drift from the first.
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Nitro reads PORT and binds every interface, which is what Coolify's proxy
# expects to find.
ENV PORT=3000
EXPOSE 3000
USER node
COPY --from=build --chown=node:node /output ./.output
CMD ["node", ".output/server/index.mjs"]
