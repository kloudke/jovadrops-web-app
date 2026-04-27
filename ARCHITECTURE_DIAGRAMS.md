# Water Refill Station Unified Platform: Architecture Diagrams

This document provides a visual representation of the unified platform architecture as described in the `unified-platform-architecture.md` technical design document.

## 1. System Landscape Diagram
This diagram shows the high-level actors and their interactions with the unified platform.

```mermaid
graph TD
    subgraph "External Entities"
        C[Customer]
        A[Admin]
        S[Staff/Driver]
        MA[Mobile App]
    end

    subgraph "Unified Platform (Next.js)"
        PW[Public Website]
        AD[Admin Dashboard]
        API[REST/GraphQL API]
    end

    subgraph "Data Layer"
        DB[(PostgreSQL Database)]
    end

    C -->|Browses/Orders| PW
    A -->|Manages Platform| AD
    S -->|Updates Deliveries| AD
    MA -->|Fetches Data| API
    
    PW -->|Prisma ORM| DB
    AD -->|Prisma ORM| DB
    API -->|Prisma ORM| DB
```

## 2. Application Component Diagram
This diagram details the internal structure of the Next.js App Router and shared logic.

```mermaid
graph TB
    subgraph "Next.js App Router (src/app)"
        subgraph "(public) Group"
            P1[Home Page]
            P2[Products Page]
            P3[About/Contact]
        end
        
        subgraph "(admin) Group"
            A1[Dashboard Metrics]
            A2[Order Management]
            A3[Inventory/Delivery]
        end
        
        subgraph "api Group"
            API_R[Auth/Orders/Products Routes]
        end
    end

    subgraph "Shared Core (src/)"
        COMP[UI Components - shadcn/ui]
        LIB[Lib - Utils/Prisma Client]
        AUTH[NextAuth.js Config]
        TYPE[Types/Interfaces]
    end

    subgraph "Database Access"
        PRISMA[Prisma Schema/Client]
    end

    (public) --> COMP
    (public) --> LIB
    (admin) --> COMP
    (admin) --> AUTH
    api --> AUTH
    api --> LIB

    COMP --> TYPE
    LIB --> PRISMA
```

## 3. Entity-Relationship Diagram (ERD)
Based on the implementation in `prisma/schema.prisma`.

```mermaid
erDiagram
    USER ||--o{ ACCOUNT : has
    USER ||--o{ SESSION : has
    USER ||--o{ ORDER : places
    USER ||--o{ DELIVERY : assigned_to

    USER {
        string id PK
        string name
        string email
        string password
        Role role "ADMIN | STAFF | CUSTOMER"
        datetime createdAt
    }

    ACCOUNT {
        string id PK
        string userId FK
        string provider
        string providerAccountId
    }

    SESSION {
        string id PK
        string userId FK
        string sessionToken
        datetime expires
    }

    PRODUCT ||--o{ ORDER_ITEM : included_in
    PRODUCT {
        string id PK
        string name
        string description
        float price
        string size
        boolean isAvailable
    }

    ORDER ||--|{ ORDER_ITEM : contains
    ORDER ||--o| DELIVERY : has
    ORDER {
        string id PK
        string userId FK
        OrderStatus status "PENDING | PROCESSING | ..."
        float totalPrice
        datetime createdAt
    }

    ORDER_ITEM {
        string id PK
        string orderId FK
        string productId FK
        int quantity
        float price "Snapshot"
    }

    INVENTORY {
        string id PK
        string itemName
        int quantity
        int lowStockThr
    }

    DELIVERY {
        string id PK
        string orderId FK
        string assignedStaffId FK
        DeliveryStatus status "UNASSIGNED | ASSIGNED | ..."
        string deliveryAddress
        datetime deliveredAt
    }
```

## 4. Sequence Diagram: Order Placement Flow
Illustrating the interaction between the public website, admin dashboard, and staff.

```mermaid
sequenceDiagram
    participant C as Customer
    participant P as Public Website
    participant DB as PostgreSQL
    participant A as Admin Dashboard
    participant S as Staff/Driver

    C->>P: Selects Products & Places Order
    P->>DB: Saves Order (Status: PENDING)
    P-->>C: Confirmation Message
    
    Note over A: Admin sees new order in real-time
    A->>DB: Assigns Staff to Delivery
    DB-->>A: Order Updated (Status: PROCESSING)
    
    Note over S: Staff receives assignment
    S->>A: Marks as 'OUT_FOR_DELIVERY'
    A->>DB: Updates Status
    
    S->>C: Delivers Water
    S->>A: Marks as 'DELIVERED'
    A->>DB: Updates Status & Deducts Inventory
```

## 5. Deployment Architecture (Containerization)
Visualizing the Docker-based deployment strategy.

```mermaid
graph LR
    subgraph "Local Development / CI/CD"
        DC[Docker Compose]
        BLD[Multi-stage Build]
    end

    subgraph "Production Environment (e.g., AWS/Cloud Run)"
        subgraph "Container Orchestrator"
            APP[Next.js App Container]
            ST[Standalone Node.js Server]
        end
        
        RDS[(Managed PostgreSQL)]
    end

    DC -->|Orchestrates| APP
    BLD -->|Produces| APP
    APP -->|Exposes Port 3000| LB[Load Balancer]
    APP -->|Connects via DATABASE_URL| RDS
```
