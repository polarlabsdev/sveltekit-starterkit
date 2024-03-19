# Most of svelte and sveltekit are preprocessors, so the intent is to do all the 
# build work in one docker build container, then just copy the finished files into
# a deployable container that's a fraction of the size.
FROM node:20-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY . .

# https://kit.svelte.dev/docs/adapter-node#environment-variables-origin-protocolheader-hostheader-and-port-header
ARG ORIGIN=http://localhost:3000

# Install with clean env
RUN npm ci

# Build while injecting env vars (because apparently svelte doesn't do that for prod builds??)
ENV ORIGIN=${ORIGIN}
RUN npm run build

# Remove non dev dependencies from node_modules so we can copy them into the deploy
# container without having to run npm install again
RUN npm prune --production

# -------------------------------------

# This one is the deployable container!
FROM node:20-alpine
RUN mkdir -p /app
RUN chown node:node /app

# don't use root for security reasons, there is a built in user called node
USER node
WORKDIR /app

# copy all the pre-built files from the builder container, including the 
# pruned node modules
COPY --from=builder --chown=node:node /app/build build/
COPY --from=builder --chown=node:node /app/node_modules node_modules/
COPY package.json .
COPY .env .

# Set the env and ports
EXPOSE 3000
ENV NODE_ENV=production

# do the thing!
CMD ["node", "-r", "dotenv/config", "build/index.js"]