# Landing Page

## 1. Frontend Architecture

```
Frontend App
├── Public Layer
│   └── Product Landing Page
│
├── Staff Layer
│   └── Order Management UI
│
├── Admin Layer
│   └── Reports & Management
```

---

## 2. Route Structure

```
/                 → Product Landing Page (Public)
/download         → App Download Page
/auth/login       → Login
/staff            → Staff Dashboard
/admin            → Admin Dashboard
/admin/pricing    → Pricing Management
/admin/reports    → Reports
```

---

## 3. Product Landing Page Design

### Purpose

- Display available water products
- Show pricing
- Encourage users to download mobile app
- Serve as main public entry point

---

### UI Structure

```
┌─────────────────────────────────────┐
│ Navbar (Logo, Login)                │
├─────────────────────────────────────┤
│ Hero Section                        │
│ "Clean Water. Fast Delivery."       │
│ [ Order Now ]                       │
├─────────────────────────────────────┤
│ Products Section                    │
│  - 10L Container                   │
│  - 20L Container                   │
├─────────────────────────────────────┤
│ Benefits Section                    │
│  - Safe Water                       │
│  - Affordable Pricing               │
│  - Fast Service                     │
├─────────────────────────────────────┤
│ Download CTA                        │
│ [ Play Store ] [ App Store ]        │
├─────────────────────────────────────┤
│ Footer                              │
└─────────────────────────────────────┘
```

---

## 4. Component Design (Frontend)

```
ProductsPage
├── Navbar
├── HeroSection
├── ProductList
│   └── ProductCard
├── BenefitsSection
├── DownloadCTA
├── Footer
```

---

## 5. Data Flow (Landing Page)

```
User visits "/"
        │
        ▼
Frontend loads ProductsPage
        │
        ▼
GET /pricing
        │
        ▼
Backend API
        │
        ▼
Database (Pricing Table)
        │
        ▼
Render Product Cards
```

---

## 6. Backend API Usage

Endpoint:
GET /pricing

Response:
[
  { "container_size": "10L", "price": 30 },
  { "container_size": "20L", "price": 50 }
]

---

## 7. Conversion Flow

```
User clicks "Order Now"
        │
        ▼
Download Modal
        │
        ├── Android → Play Store
        └── iOS → App Store
```