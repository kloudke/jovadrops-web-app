# CI/CD Strategy

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) strategy for the JovaDrops Web App, implemented using GitHub Actions.

## Workflows

### 1. Continuous Integration (`ci.yml`)

**Triggers:**
- Pushes to `main` and `develop` branches.
- Pull Requests targeting the `main` branch.

**Stages:**
1.  **Code Quality & Security (`quality` job):**
    *   **Linting:** Runs ESLint to enforce code style and catch syntax errors.
    *   **Type Checking:** Runs TypeScript compiler (`tsc --noEmit`) to verify type safety without emitting files.
    *   **Security Audit:** Runs `npm audit` to detect high-level vulnerabilities in dependencies.
2.  **Automated Testing (`test` job):**
    *   **Execution:** Runs the project's test suite via `npm test`.
    *   **Parallelism:** Runs simultaneously with the `quality` job to speed up the pipeline.
3.  **Build & Push Docker Image (`docker-build-push` job):**
    *   **Dependency:** Requires both the `quality` and `test` jobs to pass.
    *   **Containerization:** Uses Docker to build the Next.js application in `standalone` mode, packaging it with the necessary Node runtime. The image is initially exported to the local Docker daemon.
    *   **Security Scanning:** Runs the **Trivy Vulnerability Scanner** against the built Docker image to detect `CRITICAL` or `HIGH` severity vulnerabilities. If any are found, the pipeline fails before pushing.
    *   **Artifacts (GHCR):** If the scan passes, it pushes the immutable Docker image to the GitHub Container Registry (GHCR). 
    *   **Tags:** The image is tagged with the branch name and Git SHA. The `latest` tag is automatically applied when merging to `main`.

## Deployment Strategy (Future Implementation)

Currently, the project focuses on robust CI. Once a hosting provider (e.g., Vercel, AWS ECS, or a VPS) is finalized, a Continuous Deployment (`cd.yml`) workflow will be added.

### Rollout Plan
*   **Staging:** Pushes to the `develop` branch will automatically deploy to a Staging environment for QA and stakeholder review.
*   **Production:** Merges to the `main` branch will automatically trigger a production deployment. We recommend a Zero-Downtime deployment strategy (e.g., Blue/Green or Rolling updates depending on the hosting provider).

### Rollback Strategy
*   In the event of a failed production deployment or critical bug discovery, the immediate rollback strategy involves instructing the container orchestration platform (e.g., ECS, Kubernetes, Docker Swarm) to deploy the previous, known-good Docker image tag (usually the previous Git SHA).
*   Because the Docker image is completely immutable, rolling back is instantaneous and completely deterministic.
*   Database rollbacks must be handled carefully. Migrations should be backward-compatible whenever possible. If a destructive migration was applied, it must be reverted manually or via a reverse migration script before the app code is rolled back.

### Secrets and Environment Configuration
*   All sensitive variables (e.g., `DATABASE_URL`, NextAuth secrets, payment API keys) MUST be stored securely in GitHub Secrets.
*   Environment variables should be injected during the build step or runtime via the hosting platform's environment configuration.

### Notification Strategy
*   GitHub Actions is configured to notify the repository owner on workflow failures.
*   *Future addition:* Integrate Slack or Discord webhooks into the CD pipeline to broadcast deployment successes and failures to the development team.
