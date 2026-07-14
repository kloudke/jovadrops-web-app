# syntax=docker/dockerfile:1
FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app/backend

# Install dependencies based on the preferred package manager
COPY backend/package.json backend/package-lock.json* ./
# Use Docker BuildKit cache mount to speed up npm install
RUN --mount=type=cache,target=/root/.npm npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/backend/node_modules ./backend/node_modules
COPY . .

# Generate prisma client and build TypeScript
WORKDIR /app/backend
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build

# Remove development node_modules and install production dependencies only
RUN rm -rf node_modules && npm prune --production

# Production image, copy all the files and run
FROM base AS runner
WORKDIR /app/backend

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

# Copy dist and node_modules with correct permissions
COPY --from=builder --chown=nodejs:nodejs /app/backend/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/backend/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/backend/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/backend/prisma ./prisma

USER nodejs

EXPOSE 5000

ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "dist/index.js"]
