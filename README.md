# JovaDrops Web Application

This document provides a detailed overview of the Water Refill Station Unified Platform (JovaDrops) as of April 2026.

## 1. System Overview
JovaDrops is a modern, full-stack web application designed for a water refill station. It features a public-facing storefront for ordering water, an administrative dashboard for managing operations, and a robust backend integrated with Prisma ORM and NextAuth for secure user management.

## 2. Technical Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Modern v4 style configuration in `globals.css`)
- **Authentication:** NextAuth.js (v5 Beta)
- **Database ORM:** Prisma
- **Icons:** Lucide React
- **UI Components:** Shadcn/ui-inspired custom components

## 3. Implemented Features & Pages

### 3.1 Public Website (`src/app/(public)`)
The public-facing site is designed for high conversion and pixel-perfect brand alignment.

- **Home Page (`/`)**:
    - **Hero Section:** High-impact branding with "Pure Water You Can Trust" messaging. Features dynamic cards for "100% Safe & Purified" and "Refreshing & Healthy" instead of standard buttons to match the latest design.
    - **Feature Grid:** Highlights core value propositions (Pure & Safe, Affordable, Eco-Friendly, Convenient).
    - **App Download Banner:** A dynamic, floating design promoting the mobile app with Google Play and App Store links.
- **About Us Page (`/about`)**:
    - **Our Story:** Grid layout featuring storefront imagery, brand narrative, and a statistical summary card (10,000+ Litres Delivered).
    - **Mission & Vision:** Visual cards highlighting corporate goals.
    - **Community & Impact:** A contained card-based section with a center heart-splash image and impact metrics.
    - **Customer Reviews:** Integrated with an **Elfsight Google Reviews widget** to display 50+ real-time customer testimonials.
- **Products Catalog (`/products`)**:
    - Displays the full range of water products (10L, 20L, Dispenser bottles) with category filtering and interactive product cards.
- **Product Details Page (`/products/[id]`)**:
    - Dynamic routing for individual product details.
    - Features: Vertical thumbnails, high-resolution product imagery, quantity selector, and detailed feature lists.
    - **Functional CTA:** Implements "Progressive Disclosure"—checks user session before allowing "Add to Cart" or "Order Now," redirecting to login if unauthenticated.
- **How It Works (`/how-it-works`)**:
    - Visual guide to the multi-stage purification process.
- **Contact Us (`/contact`)**:
    - Detailed contact information and business hours.
    - **Interactive Map:** A live Google Maps embed pinned to the station's location.
    - **Contact Form:** Fully styled form for customer inquiries.

### 3.2 Global Navigation & Layout
- **Public Navbar:**
    - **Dynamic State:** Hides the Shopping Cart and Profile links for guests.
    - **Authenticated View:** Displays the Shopping Cart (with notification badge) and User Profile icon once the user is logged in.
    - **"Order Now" CTA:** Primary navigation button linked directly to the product catalog.
- **Public Footer:** Persistent brand presence across all public pages with quick links and social media integration.

### 3.3 Backend & Security
- **Authentication (`src/auth.ts`)**: Configured with NextAuth v5, using the Prisma Adapter and Credentials provider (Email/Password).
- **Prisma Configuration:** `schema.prisma` is defined for user and operational data management.
- **Global Providers (`src/components/providers.tsx`)**: App-wide `SessionProvider` ensures authentication state is accessible to all client components.

## 4. Infrastructure & DevOps
- **Docker Integration:**
    - `docker-compose.yml` configured for local development and database services.
    - Custom `Dockerfile` for Prisma and deployment optimization.
- **Modern Asset Management:**
    - New brand assets implemented: `logo.png` and a conventional `icon.svg` (favicon) automatically handled by Next.js metadata.

## 5. Coding Standards
- **Component Architecture:** Atomic design using a dedicated `components/ui` folder for reusable primitives (Button, Card, Logo).
- **Linting & Validation:** Strict ESLint configuration; project maintains zero linting errors and passing TypeScript checks for all builds.
- **Pixel-Perfect Implementation:** CSS grid and flexbox layouts are manually tuned to match provided UI design mockups (`.png`).
