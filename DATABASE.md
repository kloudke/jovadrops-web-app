# Database Architecture

This document defines the data layer for the Water Refill Station Management System.

## 1. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    Users ||--o{ Orders : creates
    Customers ||--o{ Orders : places
    Orders ||--|{ Order_Items : contains
    
    Users {
        int id PK
        string name
        string email
        string password_hash
        string role "admin, staff"
        datetime created_at
    }
    
    Customers {
        int id PK
        string name
        string phone
        datetime created_at
    }
    
    Orders {
        int id PK
        int customer_id FK "nullable"
        int user_id FK "staff who created order"
        decimal total_amount
        string payment_method
        datetime created_at
    }
    
    Order_Items {
        int id PK
        int order_id FK
        string container_size
        decimal price "Price at time of order"
        decimal total_price "Calculated total price for the item"
        int quantity
    }
    
    Pricing {
        int id PK
        string container_size UK
        decimal price
        datetime updated_at
    }
```

## 2. Schema Details

### 2.1 Users
Stores staff and admin credentials for authentication and authorization.
- **`role`**: Enforces Role-Based Access Control (RBAC).

### 2.2 Customers
Stores public users who place orders.
- **`phone`**: Primary contact method.

### 2.3 Orders
Records individual sales transactions.
- **`total_amount`**: The total cost of the order.
- **`payment_method`**: Cash, Card, Mobile Money, etc.

### 2.4 Order_Items
Details the line items within a specific order.
- **`price`**: Captures the historical price at the time of the transaction to maintain data integrity if `Pricing` changes.
- **`total_price`**: Subtotal for this specific line item (`price * quantity`).

### 2.5 Pricing
Independent reference table for current product pricing.
- **`container_size`**: Unique identifier for product size.