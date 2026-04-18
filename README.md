# Water Refill Station Management System

## 1. Overview

This document defines the system architecture, component design, data flow, and deployment strategy for the Water Refill Station Management System. It translates the requirements into an actionable engineering blueprint.

For detailed API and Database specifications, please refer to:
- [API Documentation](API.md)
- [Database Architecture](DATABASE.md)
- [Frontend Architecture](FRONTEND_ARCHITECTURE.md)

---

## 2. High-Level Architecture

The system follows a **3-tier architecture**:

* **Presentation Layer** → Frontend (UI)
* **Application Layer** → Backend API
* **Data Layer** → Database


### 2.1 Architecture Diagram

```mermaid
graph TD
    PublicUsers[Public Users / Customers] -->|HTTPS| Frontend[Frontend UI \n React / Web Client]
    Frontend -->|HTTPS| Nginx[Reverse Proxy \n NGINX]
    Nginx --> Backend[Backend API \n Node.js / Express]
    
    Backend --> DB[(PostgreSQL Database)]
    Backend --> Auth[Auth Service \n JWT Logic]
    Backend -.-> Ext[Future Ext. \n Payments]
    
    classDef client fill:#f9f,stroke:#333,stroke-width:2px;
    classDef server fill:#bbf,stroke:#333,stroke-width:2px;
    classDef db fill:#fdb,stroke:#333,stroke-width:2px;
    
    class Frontend client;
    class Backend,Nginx,Auth,Ext server;
    class DB db;
```
---

## 3. Component Design

### 3.1 Route Design
- `/`                 → Products Page (Public)
- `/auth/login`       → Staff/Admin Login
- `/staff`            → Staff Dashboard
- `/admin`            → Admin Dashboard

### 3.2 Frontend (Client Application)
**Technology:** React (with Vite or Next.js)
**Responsibilities:** Render UI, Handle interactions, Communicate with API, Manage local state.
See [Frontend Architecture](FRONTEND_ARCHITECTURE.md) for details.

### 3.3 Backend (API Layer)
**Technology:** Node.js (Express or NestJS)
**Responsibilities:** Business logic, Auth, Validation.

### 3.4 Database Layer
**Technology:** PostgreSQL
**Responsibilities:** Persistent storage, relational integrity, transactions.
See [Database Architecture](DATABASE.md) for details.

---

## 4. Backend Architecture (Layered)

```mermaid
graph TD
    Req[HTTP Request] --> Controller[Controllers]
    Controller --> Service[Services \n Business Logic]
    Service --> Repo[Repositories \n Data Access]
    Repo --> DB[(Database)]
```

---

## 5. Data Flow (Order Processing)

```mermaid
sequenceDiagram
    actor Staff
    participant UI as Staff UI
    participant API as Controller
    participant Svc as Service Layer
    participant Repo as Repository Layer
    participant DB as Database
    
    Staff->>UI: Submit Order Form
    UI->>API: POST /orders
    API->>Svc: Validate & Process
    Svc->>Svc: Fetch pricing & Calculate total
    Svc->>Repo: Save Order
    Repo->>DB: INSERT into Orders & Order_Items
    DB-->>Repo: Confirm save
    Repo-->>Svc: Success
    Svc-->>API: Process complete
    API-->>UI: Response (201 Created)
    UI-->>Staff: Show Success Message
```

---

## 6. Authentication & Security Design

- **Password Hashing:** bcrypt
- **Auth:** JWT-based authentication
- **RBAC:** Role-based access control (Admin vs Staff)
- **Input Validation:** Prevent SQL injection and XSS
- **Transport:** HTTPS enforcement in production

---

## 7. Deployment Architecture

### 7.1 Docker-Based Deployment

```mermaid
graph TD
    subgraph Docker Host
        Nginx[NGINX Container]
        Front[Frontend Container]
        Back[Backend Container]
        DB[(PostgreSQL Container)]
    end
    
    Internet --> Nginx
    Nginx --> Front
    Nginx --> Back
    Back --> DB
```

---

## 8. CI/CD Pipeline Design

```mermaid
graph LR
    Push[Code Push] --> Build[Build]
    Build --> Test[Run Tests]
    Test --> Docker[Build Images]
    Docker --> Registry[Push to Registry]
    Registry --> Deploy[Deploy]
```



## 9. Future Enhancements
* Microservices split (Orders, Payments, Reporting)
* Event-driven architecture (Kafka/RabbitMQ)
* Caching layer (Redis)
* Monitoring (Prometheus + Grafana)
* Kubernetes Deployment
