# GEMINI.MD: AI Collaboration Guide

This document provides essential context for AI models interacting with this project. Adhering to these guidelines will ensure consistency and maintain code quality.

---

## 1. Project Overview & Purpose

* **Primary Goal:** Tiny URL + Click Stats micro-SaaS — a classic link-shortening service that generates short codes, redirects to long URLs, and records per-link analytics.
* **Business Domain:** Developer productivity / Social-media tooling (marketing‐tech).

## 2. Core Technologies & Stack

| Layer            | Technology (Version*)                         |
|------------------|-----------------------------------------------|
| Languages        | TypeScript (5.x), SQL (SQLite dialect)        |
| Runtime / Build  | Bun (≥ 1.0)                                   |
| Back-end         | Hono (4.x)                                    |
| Front-end        | React 18 + Vite (6.x)                         |
| ORM / DB         | Drizzle-ORM (1.x) + SQLite                    |
| Charts           | Chart.js + react-chartjs-2                    |
| Package manager  | bun (pm)                                      |

\*Versions inferred from `bun.lock`/package.json if present; update as required.

## 3. Architectural Patterns

* **Overall Architecture:** *Monorepo* with a **Modular-Monolith** (single deployable Bun binary) plus SPA front-end.
  *Reasoning:* One runtime (Bun) serves API routes and static assets; directories `client/`, `server/`, `shared/` live under the same repo.
* **Directory Structure Philosophy**

  | Directory | Purpose |
  |-----------|---------|
  | `/client` | Vite + React SPA dashboard (tables, charts, UI). |
  | `/server` | Hono routes, DB access, cron jobs. |
  | `/shared` | Type-shared utilities & types (re-exported by client/server). |
  | `/migrations` | SQL/Drizzle migration artifacts (if generated). |
  | `/tests` | Unit / integration tests (Bun test runner). |
  | `Dockerfile` | Multi-stage build → tiny production image / single binary. |
  | `.github/workflows/` | CI (lint → test → build → deploy). |

## 4. Coding Conventions & Style Guide

| Area            | Convention (confidence) |
|-----------------|-------------------------|
| **Formatting**  | Prettier default (tabs = 2 spaces, semis = true) — inferred from typical BHVR template. |
| **Linting**     | ESLint with `@typescript-eslint` — if `.eslintrc` exists. |
| **Naming**      | `camelCase` for vars & functions, `PascalCase` for classes/React comps, `kebab-case` for files, `SCREAMING_SNAKE_CASE` for env vars. |
| **API Design**  | RESTful: `POST /links`, `GET /links`, `GET /:id` (redirect) — JSON bodies & responses. |
| **Error Handling** | `try…catch` in async route handlers; custom 404/500 middleware in `/server/src/middleware/error.ts`. |

## 5. Key Files & Entrypoints

| Scope          | File |
|----------------|------|
| Application    | `server/src/index.ts` (creates Hono app & Bun.serve). |
| SPA bootstrap  | `client/src/main.tsx`. |
| DB Schema      | `server/src/db/schema.ts`. |
| Configuration  | `.env` (runtime secrets), `vite.config.ts`, `tsconfig.json`, `bunfig.toml` (if present). |
| CI Pipeline    | `.github/workflows/ci.yml` (build & test), `.github/workflows/deploy.yml` (Fly.io). |

## 6. Development & Testing Workflow

* **Local Dev (no Bun on host)**
  ```bash
  # scaffold (one-off)
  docker run --rm -it -v "$PWD":/app -w /app oven/bun:latest -- bun create bhvr@latest

  # start dev servers (hot-reload)
  docker compose up  # uses docker-compose.yaml mounting ./client ./server
  Testing
Unit + API tests via Bun test runner:
bash
```docker compose run server bun test```
Front-end component tests use Vitest or Cypress component testing.
CI/CD
Push → GitHub Actions: lint → bun test → build SPA → bun build --compile server.
On main success, workflow builds minimal image and deploys to Fly.io via flyctl deploy.
7. Specific Instructions for AI Collaboration
Contribution Guidelines
Create feature branches from main.
Use Conventional Commits (feat:, fix:, docs:).
PR must pass CI and include unit tests for new logic.
Infrastructure (IaC)
Any edits to Dockerfile, fly.toml, or migrations/ affect production; flag reviewers.
Security
Never commit .env, API keys, or database URLs.
Validate all URL inputs to avoid open redirects / XSS when echoing links in UI.
Dependencies
Add via docker run … bun add <pkg> so bun.lock stays deterministic. Avoid bloating the production binary.
Commit Messages
Follow Conventional Commits; include scope when relevant (feat(server): add /links route).