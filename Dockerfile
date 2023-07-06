FROM --platform=$BUILDPLATFORM node:18.9-alpine3.16 AS builder
WORKDIR /backend
COPY backend/package*.json .
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
COPY backend/. .

FROM --platform=$BUILDPLATFORM node:18.9-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM --platform=$BUILDPLATFORM node:18.9-alpine3.16
LABEL org.opencontainers.image.title="Kubby Buddy" \
    org.opencontainers.image.description="Your container management pal" \
    org.opencontainers.image.vendor="Kubby Buddy Inc." \
    com.docker.desktop.extension.api.version="0.3.0" \
    com.docker.extension.screenshots="[{\"alt\": \"full dashboard for each container\", \"url\": \"https://i.ibb.co/b76Jkz5/Screenshot-2023-07-04-at-1-57-14-PM.png\"}, {\"alt\": \"collapsed view of live container data visualizer\", \"url\": \"https://i.ibb.co/kmGQStM/Screenshot-2023-07-04-at-1-57-05-PM.png\"}]"\
    com.docker.extension.detailed-description="<h1>Your container management pal</h1>" \
    com.docker.extension.publisher-url="https://kubbybuddy.com" \
    com.docker.extension.additional-urls="" \
    com.docker.extension.changelog="<p>Extension changelog<ul> <li>New feature A</li> <li>Bug fix on deleting images/li></ul></p>" \
    com.docker.desktop.extension.icon="https://drive.google.com/file/d/1kvXxK0foZnwQxX3_wGWhfRXiBU--DMrq/view?usp=sharing" \
    com.docker.extension.categories="ci-cd, container-orchestration"

COPY --from=builder /backend backend
COPY docker-compose.yaml .
COPY metadata.json .
COPY favicon.svg .
COPY --from=client-builder /ui/build ui
CMD ["node", "backend/server.js", "/run/guest-services/extension-node-extension.sock"]