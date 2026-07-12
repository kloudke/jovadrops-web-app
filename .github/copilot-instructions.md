# Copilot PR review instructions

This repository is a Next.js 16 / React 19 / TypeScript application for JovaDrops, with Prisma 7 for database access and NextAuth v5 beta for authentication.

## Review priorities

When reviewing pull requests, prioritize correctness, security, and compatibility with the exact framework versions in this repo. Call out issues that can break production behavior, weaken authentication, expose customer data, or fail CI.

## Framework and version guidance

- This project uses Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma 7, and NextAuth v5 beta.
- Do not assume older Next.js App Router behavior. If a PR changes routing, server actions, metadata, cookies, headers, caching, forms, or file conventions, verify against the installed Next.js documentation under `node_modules/next/dist/docs/`.
- Prefer App Router idioms already used in `src/app`.
- Respect server/client boundaries. Only add `"use client"` when browser APIs, React state/effects, or client event handlers are required.
- Keep server-only work, database access, secrets, and privileged logic out of client components.

## Code quality expectations

- TypeScript must remain strict and pass `npx tsc --noEmit`.
- ESLint must pass with `npm run lint`.
- Avoid `any`, unsafe casts, non-null assertions, and broad error swallowing unless the surrounding code makes them clearly justified.
- Keep changes focused on the PR’s purpose. Flag unrelated refactors, speculative abstractions, or feature creep.
- Prefer existing components and utilities under `src/components` and `src/lib` before introducing new patterns.
- Preserve path alias usage with `@/*` for imports from `src`.

## Security review checklist

Flag PRs that introduce or miss safeguards for:

- Authentication or authorization bypasses in routes, pages, server actions, or account flows.
- Session handling mistakes with NextAuth v5.
- Direct database access from client components or leaked Prisma/client secrets.
- Trusting client-provided user IDs, prices, order totals, roles, or ownership fields.
- Missing ownership checks for account resources such as addresses, profile data, orders, checkout data, and uploads.
- SQL injection, command injection, XSS, unsafe redirects, unsafe file upload handling, or path traversal.
- Logging secrets, credentials, tokens, personal data, or payment/order details unnecessarily.
- Weak password handling. Passwords should be hashed with bcrypt and never returned to the client.

## Prisma and data access

- Review schema changes carefully for migration impact, relation integrity, defaults, and nullable fields.
- Database writes should validate data at the server boundary and enforce ownership/authorization server-side.
- Avoid creating new Prisma clients outside the existing `src/lib/prisma.ts` pattern.
- Be cautious with destructive deletes, cascading behavior, and changes that can orphan user/account/order data.

## UI and accessibility

- Preserve responsive behavior and the existing design language.
- Use existing UI primitives where practical.
- Interactive elements should be keyboard-accessible and use semantic HTML.
- Forms should have labels, clear validation feedback, and should not rely only on color to communicate errors.
- Loading and error states should be handled for user-facing async actions.

## Testing and CI expectations

For PRs with behavior changes, ask for evidence that relevant checks pass:

- `npm run lint`
- `npx tsc --noEmit`
- `npm test` when tests are added or affected
- `npm run build` for changes touching Next.js routing, server actions, auth, Prisma, or production configuration

Note that the current `npm test` script is a placeholder unless the PR adds a real test suite.

## PR feedback style

- Be specific and actionable. Reference the exact file and line when possible.
- Distinguish blocking correctness/security issues from suggestions.
- Do not request cosmetic rewrites unless they improve maintainability or consistency with existing code.
- Prefer small, targeted fixes over broad rewrites.
