FROM node:24-alpine AS base

# 의존성 설치
FROM base AS deps
RUN apk add --no-cache libc6-compat
RUN corepack enable pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

### 의존성 캐시: 의존성이 변경된 경우, 직접 revlidate를 해야함
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# 빌드
FROM base AS builder
RUN corepack enable pnpm
WORKDIR /app

COPY --from=db-init /app/sqlite.db ./sqlite.db
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# 실행
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder --chown=node:node /app/.next/standalone ./

USER node

EXPOSE 3000

CMD ["node", "server.js"]
