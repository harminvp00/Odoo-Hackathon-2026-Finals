# Rental Management System

An end-to-end Rental Management System built to manage the complete rental lifecycle — from product browsing and quotation creation to invoicing, returns, and reporting.

The system is designed with a **real-world rental business workflow** in mind, focusing on **time-based inventory reservation**, **role-based access**, and **ERP-style operations**.

---

## Problem Statement

Rental businesses commonly face:
- Overbooking of rental inventory
- Manual quotation and order handling
- Complex pricing based on rental duration
- Difficulty in tracking payments and returns
- Limited visibility into business performance

This project aims to solve these problems by providing a structured, automated, and scalable rental platform.

---

## Objectives

- Implement an end-to-end rental flow
- Prevent double booking using reservation logic
- Support flexible rental durations and time-based pricing
- Automate invoicing and payment handling
- Provide dashboards and reports for business insights

---

## User Roles

### Customer
- Browse rentable products
- Configure rental duration
- Create rental quotations
- Confirm rental orders and make payments
- View order history and download invoices

### Vendor
- Manage rental products and inventory
- Configure rental pricing
- Process rental orders
- Handle pickup and return operations
- Track earnings and performance

### Admin
- Manage users and vendors
- Configure system settings and GST details
- Monitor platform-wide analytics
- Generate and export reports

---

## Rental Lifecycle Flow

```text
Browse Products
      ↓
Create Quotation
      ↓
Confirm Rental Order
      ↓
Reserve Inventory (Time-Based)
      ↓
Pickup / Delivery
      ↓
Invoice & Payment
      ↓
Return & Settlement
      ↓
Reports & Dashboards

## Core Modules

### Authentication & User Management
- Email and password-based authentication
- Vendor signup with GSTIN (mandatory for invoicing)
- Password recovery via email verification
- Coupon code support during signup

---

### Rental Product Management
- Products marked as rentable
- Rental pricing based on:
  - Hour
  - Day
  - Week
  - Custom duration
- Inventory quantity tracking
- Publish / Unpublish product control
- Attribute and variant-based pricing

---

### Quotations & Rental Orders
- Quotations generated from cart
- Editable quotations until confirmation
- Automatic conversion of quotation to rental order
- Inventory reserved on order confirmation
- Rental period blocks product availability

**Key Rule:**  
Reserved inventory cannot be rented by another customer during the same rental period.

---

### Pickup & Return Management
- Pickup document generated on order confirmation
- Inventory moved to **"With Customer"** state
- Return document generated after rental period
- Late return charges applied automatically
- Reminder notifications before return date

---

### Invoicing & Payments
- Invoice generated from rental order
- Supports:
  - Full upfront payment
  - Partial payment / security deposit
- Automatic tax calculation
- Printable and exportable invoices
- Payment status synchronized with orders

---

### Website & Customer Portal
- Product listing with filters
- Rental configuration on product detail page
- Cart and checkout flow
- Order tracking and invoice downloads

---

### Settings & Configuration
- Rental period definitions
- Product attributes and variants
- User role and permission management
- GST and company configuration
- Profile and password management

---

### Reports & Dashboards
- Total rental revenue
- Most rented products
- Most rented products
- Vendor-wise performance
- Rental trends over time

Export formats:
- PDF
- XLSX
- CSV

---

## Project Structure (Reference)

```text
rental-management-system/
│
├── backend/
│   ├── auth/
│   ├── products/
│   ├── quotations/
│   ├── orders/
│   ├── invoices/
│   ├── returns/
│   ├── reports/
│   └── config/
│
├── frontend/
│   ├── customer/
│   ├── vendor/
│   ├── admin/
│   └── shared/
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── docs/
│   └── flow-diagrams/
│
├── README.md
└── .env.example

## Business Logic Highlights
- Time-based inventory reservation
- Automated quotation-to-order conversion
- Rental-period availability blocking
- Late return penalty calculation
- Role-based access control

---

## Hackathon Deliverables Covered
- Functional rental flow (Quotation → Order → Invoice → Return)
- Role-based access implementation
- Website and backend integration
- Dashboard and reporting module
- Clean and business-aligned UI

---

## Outcome
This project demonstrates:
- Practical understanding of rental business workflows
- ERP-style system modeling
- Full-stack architecture design
- Real-world problem-solving skills
