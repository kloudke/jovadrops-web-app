# Technical Design Document: Water Refill Station Unified Platform

## 1. Background & Motivation
The Water Refill Station business requires a modern, high-converting public website to drive mobile app downloads and direct orders, alongside a robust internal admin dashboard to manage staff, orders, inventory, and deliveries. Developing these as separate applications would lead to duplicated effort, fragmented data models, and increased maintenance overhead. A unified platform architecture ensures consistency, accelerates development, and provides a single source of truth.

## 2. Scope & Impact
This document outlines the architecture for a unified full-stack web application that serves both the public-facing website and the protected internal admin dashboard.
- **In Scope:** Next.js App Router setup, shared database schema (Users, Orders, Inventory, Deliveries), authentication (NextAuth), role-based access control (Admin, Staff, Customer), UI component strategy, and Docker containerization.
- **Out of Scope:** Development of the native mobile applications (though the API layer will support them in the future).

## 3. Proposed Solution: Next.js Full-Stack Monolith
We will build a unified full-stack application using the following modern tech stack:
- **Framework:** Next.js (App Router) for server-side rendering, SEO optimization, and API route generation.
- **Language:** TypeScript for type safety across the frontend and backend.
- **Database:** PostgreSQL managed via Prisma ORM for type-safe database queries and migrations.
- **Authentication:** NextAuth.js (Auth.js) using JWT sessions, supporting role-based access (Admin, Staff, Customer).
- **Styling:** Tailwind CSS combined with shadcn/ui (or Radix UI primitives) for accessible, reusable components.
- **Containerization:** Docker for building portable, optimized images using Next.js standalone output.

### 3.1 Routing Structure
The Next.js App Router will be structured using Route Groups to separate public and admin interfaces without affecting the URL path:
- `(public)/`: Home, Products, How It Works, About, Contact, FAQ, Download App.
- `(admin)/admin/`: Dashboard, Orders, Customers, Products, Inventory, Deliveries, Analytics, Settings.
- `api/`: REST/GraphQL endpoints for the future mobile app and client-side data fetching.

### 3.2 Containerization Strategy
To ensure the application is environment-agnostic and easy to deploy, it will be fully containerized using Docker:
- **Multi-Stage Dockerfile:** A multi-stage build will be used to keep the final production image minimal. It will handle dependency installation, Prisma client generation, building the Next.js app, and isolating the final standalone build.
- **Next.js Standalone Output:** We will leverage Next.js's `output: 'standalone'` configuration to significantly reduce the image size by only including the necessary files.
- **Docker Compose (Local Development):** A `docker-compose.yml` file will be provided to orchestrate the local development environment, including spinning up a local PostgreSQL database container alongside the Next.js application.
- **Deployment Portability:** The resulting Docker image can be deployed to any modern container orchestrator (e.g., AWS ECS, Google Cloud Run, Azure Container Apps, or Kubernetes).

## 4. Data Models (Prisma Schema Overview)
The shared PostgreSQL database will include:
- **User:** Manages authentication and roles (`ADMIN`, `STAFF`, `CUSTOMER`). Includes profile details.
- **Product:** Manages water products, pricing, sizes, and subscription tiers.
- **Order:** Tracks customer orders, total price, and status (`PENDING`, `PROCESSING`, `OUT_FOR_DELIVERY`, `DELIVERED`, `CANCELLED`).
- **OrderItem:** Junction table linking Orders and Products with quantities.
- **Inventory:** Tracks stock levels of water, bottles, and other supplies, with low-stock alerts.
- **Delivery:** Assigns orders to staff/drivers, tracking delivery status and addresses.

## 5. Alternatives Considered
- **Decoupled Architecture (Separate React SPA + Node.js API):** Rejected for the initial phase due to higher operational complexity, lack of built-in SEO benefits for the public website, and the need to manage multiple codebases. A unified Next.js app provides API routes that can serve the mobile app later while keeping the web development streamlined.

## 6. Phased Implementation Plan
- **Phase 1: Project Setup, Schema Design & Containerization**
  - Initialize Next.js project with TypeScript, Tailwind, and Prisma.
  - Set up Dockerfile and Docker Compose for local development with PostgreSQL.
  - Define and migrate the PostgreSQL database schema.
  - Setup NextAuth.js for role-based authentication.
- **Phase 2: Public Website (Marketing & Conversion)**
  - Build shared UI components (buttons, navbars, cards).
  - Implement the high-converting Homepage, Products, and Download App pages.
  - Focus on SEO, performance, and mobile responsiveness.
- **Phase 3: Admin Dashboard Core**
  - Implement protected `/admin` routes.
  - Build the Admin Dashboard overview (metrics, charts).
  - Develop Order Management and Customer Management interfaces.
- **Phase 4: Operations & Analytics**
  - Develop Product, Inventory, and Delivery management modules.
  - Implement real-time notifications and Analytics reporting.

## 7. Verification & Testing
- **Linting & Formatting:** ESLint and Prettier enforcement.
- **Type Checking:** Strict TypeScript compilation.
- **Unit Testing:** Jest and React Testing Library for core UI components and utility functions.
- **E2E Testing:** Playwright or Cypress for critical user flows (e.g., checkout, admin login, order assignment).

## 8. Migration & Rollback
- Database migrations will be version-controlled using Prisma Migrate.
- Deployments of the Docker image will be automated via CI/CD pipelines (e.g., GitHub Actions) to a container registry, and then deployed to a container orchestrator (e.g., AWS ECS, Cloud Run).
- Rollbacks can be instantly performed by deploying the previous known-good Docker image version and, if necessary, reverting database migrations.
