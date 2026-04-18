# API Documentation

This document outlines the REST API endpoints for the Water Refill Station Management System.

## 1. Authentication

- **`POST /auth/login`**: Authenticate a user (Staff/Admin) and return a JWT.
- **`POST /auth/register`**: Register a new staff member (Admin only).

## 2. Orders

- **`POST /orders`**: Create a new order.
- **`GET /orders`**: List orders (with pagination and filtering).
- **`GET /orders/:id`**: Get details of a single order.

## 3. Pricing

- **`GET /pricing`**: Retrieve current product pricing.
- **`PUT /pricing`**: Update product pricing (Admin only).

## 4. Reports (Admin Only)

- **`GET /reports/daily`**: Retrieve daily sales and volume reports.
- **`GET /reports/weekly`**: Retrieve weekly sales and volume reports.
- **`GET /reports/monthly`**: Retrieve monthly sales and volume reports.