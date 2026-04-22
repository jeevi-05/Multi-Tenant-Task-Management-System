# ── Stage 1: Build React app ─────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Cache node_modules (only re-installs if package.json changes)
COPY package.json package-lock.json ./
RUN npm ci --silent

# Build production bundle
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ────────────────────────────────
FROM nginx:1.25-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config and built app
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
