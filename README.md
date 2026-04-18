# Water Refill Station Management System

---

## 1. Overview

This document defines the system architecture, component design, data flow, and deployment strategy for the Water Refill Station Management System. It translates the requirements into an actionable engineering blueprint.

---

## 2. High-Level Architecture

The system follows a **3-tier architecture**:

* **Presentation Layer** → Frontend (UI)
* **Application Layer** → Backend API
* **Data Layer** → Database

---

### 2.1 Architecture Diagram

```
                ┌────────────────────────────┐
                │ Public Users (Customers)   │
                └────────────┬──────────────-┘
                             │
                             ▼
                ┌────────────────────────────┐
                │        Frontend UI         │
                │   (React / Web Client)     |
                │- Products Page             |
                │- Staff/Admin Dashboards    |
                └────────────┬──────────────-┘
                             │ HTTPS
                             ▼
                ┌────────────────────────────┐
                │     Reverse Proxy (NGINX)  │
                └────────────┬──────────────-┘
                             │
                             ▼
                ┌────────────────────────────┐
                │       Backend API          │
                │   (Node.js / Express)      │
                └────────────┬──────────────-┘
                             │
         ┌───────────────────┼───────────────────┐
         ▼                   ▼                   ▼
 ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
 │ PostgreSQL   │   │ Auth Service │   │ Future Ext.  │
 │ Database     │   │ (JWT Logic)  │   │ (Payments)   │
 └──────────────┘   └──────────────┘   └──────────────┘
```

---

## 3. Component Design

### 3.1 Route Design (Updated)
/                 → Products Page (Public)
/auth/login       → Staff/Admin Login
/staff            → Staff Dashboard
/admin            → Admin Dashboard

### 3.2 Frontend (Client Application)

**Technology:** React (with Vite or Next.js)

**Responsibilities:**

* Render UI for landing page `/`, staff and admin dashboards
* Handle user interactions
* Communicate with backend via REST API
* Manage local state (orders, session)

**Key Modules:**

* Authentication 
* Staff Dashboard
* Admin Dashboard
* Reports View
* Products Page UI

---

### 3.3 Backend (API Layer)

**Technology:** Node.js (Express or NestJS)

**Responsibilities:**

* Business logic processing
* Authentication & authorization
* API endpoints
* Data validation
* Communication with database

---

### 3.4 Database Layer

**Technology:** PostgreSQL

**Responsibilities:**

* Persistent data storage
* Enforce relational integrity
* Support transactional operations

---

## 4. Backend Architecture (Layered)

```
┌────────────────────────────┐
│        Controllers         │  ← Handle HTTP requests
├────────────────────────────┤
│         Services           │  ← Business logic
├────────────────────────────┤
│       Repositories         │  ← Database queries (ORM/SQL)
├────────────────────────────┤
│         Database           │
└────────────────────────────┘
```

---

## 5. Data Flow (Order Processing)

### 5.1 Order Creation Flow

```
[Staff UI]
    │
    ▼
POST /orders
    │
    ▼
[Controller]
    │
    ▼
[Service Layer]
    ├── Validate input
    ├── Fetch pricing
    ├── Calculate total
    │
    ▼
[Repository Layer]
    │
    ▼
[Database]
    │
    ▼
Response to UI
```

---

## 6. Database Design (Detailed)

### 6.1 Entity Relationship Diagram (ERD)

```
Users ─────────────┐
                   │
                   ▼
                Orders ────────────────┐
                   │                   │
                   ▼                   ▼
             Order_Items           Customers

Pricing (independent reference table)
```

---

### 6.2 Schema Details

#### Users

```
id (PK)
name
email
password_hash
role (admin, staff)
created_at
```

#### Customers

```
id (PK)
name
phone
created_at
```

#### Orders

```
id (PK)
customer_id (FK, nullable)
user_id (FK - staff who created order)
total_amount
payment_method
created_at
```

#### Order_Items

```
id (PK)
order_id (FK)
container_size
price
quantity
```

#### Pricing

```
id (PK)
container_size (unique)
price
updated_at
```

---

## 7. API Design (Detailed)

### 7.1 Authentication

```
POST /auth/login
POST /auth/register (admin only)
```

---

### 7.2 Orders

```
POST   /orders        → Create new order
GET    /orders        → List orders
GET    /orders/:id    → Get single order
```

---

### 7.3 Pricing

```
GET    /pricing
PUT    /pricing       → Update pricing (admin)
```

---

### 7.4 Reports

```
GET /reports/daily
GET /reports/weekly
GET /reports/monthly
```

---

## 8. Authentication & Security Design

### 8.1 Authentication Flow

```
User Login → Backend validates credentials
          → JWT issued
          → Token stored in client
          → Token sent in Authorization header
```

---

### 8.2 Security Measures

* Password hashing (bcrypt)
* JWT-based authentication
* Role-based access control (RBAC)
* Input validation (avoid SQL injection)
* HTTPS enforcement in production

---

## 9. Deployment Architecture

### 9.1 Docker-Based Deployment

```
                ┌──────────────────────┐
                │     Docker Host      │
                ├──────────────────────┤
                │  NGINX Container     │
                │  Frontend Container  │
                │  Backend Container   │
                │  PostgreSQL Container│
                └──────────────────────┘
```

---

### 9.2 Docker Compose Example Structure

```
services:
  frontend
  backend
  db
  nginx
```

---

### 9.3 Future Kubernetes Architecture

```
          ┌──────────────────────────────┐
          │        Ingress (NGINX)       │
          └────────────┬─────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼                              ▼
Frontend Pod                    Backend Pod
                                        │
                                        ▼
                                 PostgreSQL (StatefulSet)
```

---

## 10. CI/CD Pipeline Design

### Pipeline Stages:

```
1. Code Push (GitHub)
        ↓
2. Build
        ↓
3. Run Tests
        ↓
4. Build Docker Images
        ↓
5. Push to Registry
        ↓
6. Deploy (Docker/K8s)
```

---

## 11. Logging & Monitoring

### Logging:

* Backend logs (requests, errors)
* Access logs via NGINX

### Monitoring (future):

* Prometheus + Grafana
* Application metrics (requests/sec, errors)

---

## 12. Scalability Considerations

* Stateless backend (horizontal scaling)
* Externalized database
* Load balancing via NGINX / Ingress
* Caching layer (Redis - future)

---

## 13. Failure Handling

* Graceful error responses
* Retry mechanisms (future)
* Database backups
* Container restart policies

---

## 14. Development Workflow

```
Feature Branch → Pull Request → Code Review → Merge → Deploy
```

---

## 15. Future Architecture Enhancements

* Microservices split (Orders, Payments, Reporting)
* Event-driven architecture (Kafka/RabbitMQ)
* Mobile app integration
* Offline-first sync system

---

## 16. Summary

This design provides:

* Clear separation of concerns
* Scalable architecture
* Strong DevOps integration potential
* Solid foundation for future expansion

---
