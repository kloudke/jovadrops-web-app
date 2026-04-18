# Frontend Architecture

This document defines the client-side application structure, state management, and component design for the Water Refill Station Management System.

## 1. Application Layers

```mermaid
graph TD
    App[Frontend App]
    
    App --> Public[Public Layer]
    App --> Staff[Staff Layer]
    App --> Admin[Admin Layer]
    
    Public --> Landing[Product Landing Page]
    Public --> Login[Login Page]
    
    Staff --> Dashboard[Order Management UI]
    Staff --> History[Order History]
    
    Admin --> Reports[Reports & Analytics]
    Admin --> Pricing[Pricing Management]
```

---

## 2. Route Structure

- `/`                 → Product Landing Page (Public)
- `/download`         → App Download Page
- `/auth/login`       → Login
- `/staff`            → Staff Dashboard (Order Creation & History)
- `/admin`            → Admin Dashboard (Overview)
- `/admin/pricing`    → Pricing Management
- `/admin/reports`    → Reports & Analytics

---

## 3. State Management

The frontend utilizes a hybrid state management approach:

- **Server State:** `React Query` (or SWR) for fetching, caching, and synchronizing data from the Backend API (e.g., product pricing, order history, reports).
- **Global UI State:** `Zustand` or `React Context` for lightweight global state (e.g., User Session, Auth Token, Theme/Dark Mode).
- **Local Form State:** `React Hook Form` combined with `Zod` for complex form validation (e.g., Order creation form, Login form).

---

## 4. Component Design

### 4.1 Public Landing Page
The primary goal is to display available water products, show pricing, and drive mobile app downloads.

```mermaid
graph TD
    Landing[ProductsPage]
    Landing --> Nav[Navbar]
    Landing --> Hero[HeroSection]
    Landing --> Products[ProductList]
    Products --> Card[ProductCard]
    Landing --> Benefits[BenefitsSection]
    Landing --> CTA[DownloadCTA]
    Landing --> Footer[Footer]
```

### 4.2 Staff Dashboard
The staff dashboard focuses on operational efficiency, allowing staff to quickly create and view orders.

```mermaid
graph TD
    Staff[StaffDashboard]
    Staff --> SideNav[SidebarNavigation]
    Staff --> Header[Header / Auth Status]
    Staff --> OrderForm[CreateOrderForm]
    OrderForm --> ItemSelect[ProductSelector]
    OrderForm --> Payment[PaymentMethodSelect]
    Staff --> RecentOrders[RecentOrdersTable]
```

### 4.3 Admin Dashboard
The admin dashboard provides high-level business analytics and configuration settings.

```mermaid
graph TD
    Admin[AdminDashboard]
    Admin --> SideNav[SidebarNavigation]
    Admin --> Stats[KPIStatsCards]
    Admin --> Charts[RevenueCharts]
    Admin --> Config[PricingConfigForm]
```

---

## 5. Data Flow Example (Staff Order Creation)

```mermaid
sequenceDiagram
    actor Staff
    participant Form as CreateOrderForm
    participant State as React Query (Mutation)
    participant API as Backend API
    
    Staff->>Form: Selects 20L Water (x2) & Cash Payment
    Form->>Form: Local Validation (Zod)
    Form->>State: mutate(orderData)
    State->>API: POST /orders
    API-->>State: 201 Created (Order Details)
    State->>State: Invalidate 'RecentOrders' Cache
    State-->>Form: Success Callback
    Form-->>Staff: Show Success Notification & Reset Form
```