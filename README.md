<!-- @format -->

# The Hanger 🧥 — Full-Stack E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-99%25-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Neon-Postgres-336791?logo=postgresql)
![Stripe](https://img.shields.io/badge/Payments-Stripe%20%7C%20PayPal-635BFF?logo=stripe)
![License](https://img.shields.io/badge/license-MIT-green)

A full-stack fashion e-commerce storefront and admin dashboard, built with the Next.js App Router. "The Hanger" sells clothing, shoes, bags, and jewellery across Women's, Men's, Kids, and Sports collections, complete with authentication, cart & checkout, order management, wishlists, reviews, and an admin back office.

**🔗 Live demo:** [ecom-beryl-seven.vercel.app](https://ecom-beryl-seven.vercel.app)

---

## 📸 Screenshot

<p align="center">
  <img src="docs/hero.jpg" alt="The Hanger storefront banner" width="100%" />
</p>

<p align="center">
  <img src="https://utfs.io/f/X55GebA8RFI0h7L1QSNZJ3IcfESsOwyUGoND9Aqv4znRjVPg" alt="Women's Aldo boots product listing" width="24%" />
  <img src="https://utfs.io/f/X55GebA8RFI0DE7xDpY8r7lUvqWxIcY4dLspAtFyPX35SwEn" alt="Women's Timberland boots product listing" width="24%" />
  <img src="https://utfs.io/f/X55GebA8RFI0U6EEGHiL52GVcoxI7Fjy9hpzXAklHOgrPEvt" alt="Women's canvas mini purse product listing" width="24%" />
  <img src="https://utfs.io/f/X55GebA8RFI02lnU1iVKWEPj5xkdrilwmzTGIY90V6uZhNMC" alt="Sterling silver ring product listing" width="24%" />
</p>

<p align="center"><sub>Homepage banner from <code>public/images</code>; product tiles pulled live from the storefront catalog (Aldo, Timberland, Foschini, American Swiss).</sub></p>

> Swap in a full-page screenshot of the homepage/cart/admin dashboard here for the best first impression — a tool like [Polypane](https://polypane.app) or your browser's built-in "capture full size screenshot" (DevTools → Cmd/Ctrl+Shift+P) works well.

---

## ✨ Features

### Storefront

- Browse by collection → category → subcategory (e.g. `Women / Clothing / Jeans`)
- Product detail pages with image galleries, variants, ratings & reviews
- Keyword search with filtering and sorting (`app/(root)/search`)
- Cart, shipping address, payment method, and multi-step checkout (`checkout-steps`)
- **Stripe** and **PayPal** payment integration, with a Stripe webhook for order confirmation
- Order history and order detail/tracking pages
- Wishlist support
- Email notifications (purchase receipts) via **Resend** + **React Email**
- Credentials-based sign-up/sign-in with **Auth.js (NextAuth v5)**
- Light/dark mode toggle

### Admin Dashboard (`/admin`)

- Overview page with sales charts (**Recharts**)
- CRUD management for Products, Collections, Categories, Subcategories, Orders, and Users
- Image uploads via **UploadThing**
- Role-based route protection via middleware (`auth-guard.ts`, `auth.config.ts`)

### User Account (`/user`)

- Profile management
- Order history

---

## 🛠 Tech Stack

| Layer              | Technology                                                    |
| ------------------ | ------------------------------------------------------------- |
| Framework          | [Next.js 15](https://nextjs.org) (App Router, Server Actions) |
| Language           | TypeScript                                                    |
| Styling / UI       | Tailwind CSS, shadcn/ui, Radix UI primitives, Lucide icons    |
| Auth               | Auth.js / NextAuth v5 (Credentials + Prisma adapter)          |
| Database           | PostgreSQL via [Neon](https://neon.tech) (serverless driver)  |
| ORM                | Prisma (with `@prisma/adapter-neon`)                          |
| Payments           | Stripe, PayPal                                                |
| Email              | Resend + React Email                                          |
| File uploads       | UploadThing                                                   |
| Forms & validation | React Hook Form + Zod                                         |
| Charts             | Recharts                                                      |
| Testing            | Jest, ts-jest                                                 |

---

## 🗂 Data Model

The Prisma schema (`prisma/schema.prisma`) models a typical storefront + admin domain:

- **Product** — belongs to a `Collection`, `Category`, and optional `SubCategory`; has images, price, stock, rating, and relations to `OrderItem`, `Review`, and `Wishlist`
- **User / Account / Session / VerificationToken** — Auth.js-compatible auth tables, plus `role` and `address`
- **Cart** — session- or user-scoped, holds line items and computed pricing
- **Order / OrderItem** — captures shipping, payment result, and paid/delivered status
- **Review** — rating + written review per user/product
- **Collection / Category / SubCategory** — a three-level taxonomy (e.g. Women → Clothing → Jeans)
- **Wishlist** — saved products per user

18 migrations are tracked under `prisma/migrations/`, evolving from an initial schema through collections/categories, reviews, and wishlist support.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (the project is set up for [Neon](https://neon.tech))

### 1. Clone & install

```bash
git clone https://github.com/SiyaSok/ecom.git
cd ecom
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
# Database
DATABASE_URL=

# Auth.js
AUTH_SECRET=
AUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_NAME="The Hanger"
NEXT_PUBLIC_APP_DESCRIPTION="Cool Store"
NEXT_PUBLIC_APP_SERVER_URL=http://localhost:3000
LATEST_PRODUCTS_LIMIT=6
PAGE_SIZE=12
PAYMENT_METHODS=Stripe,PayPal
DEFAULT_PAYMENT_METHODS=Stripe
USER_ROLES=admin,user

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# PayPal
PAYPAL_CLIENT_ID=
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# Resend (email)
RESEND_API_KEY=
SENDER_EMAIL=

# UploadThing
UPLOADTHING_TOKEN=
```

### 3. Set up the database

```bash
npx prisma generate
npx prisma migrate deploy
```

Seed sample data (products, users, etc.) if you'd like a populated catalog — see `db/seed.ts` / `db/sample-data.ts`.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build         # production build
npm run start          # run production build
npm run lint           # eslint
npm run test            # jest
npm run test:watch     # jest --watch
npm run email           # preview React Email templates on :3001
```

---

## 📁 Project Structure

```
ecom/
├─ app/
│  ├─ (auth)/           # sign-in / sign-up
│  ├─ (root)/            # storefront: home, cart, product, search, checkout flow
│  ├─ admin/             # admin dashboard: products, orders, users, collections...
│  ├─ user/               # account profile & order history
│  └─ api/                # NextAuth, UploadThing, Stripe webhook routes
├─ components/
│  ├─ admin/              # admin forms (product, category, collection, subcategory)
│  └─ ui/                  # shadcn/ui components + shared product/header components
├─ db/                     # Prisma client, seed script, sample data
├─ email/                  # React Email templates (purchase receipt)
├─ lib/
│  ├─ actions/              # server actions (cart, orders, products, reviews, wishlist, users)
│  └─ validators.ts, paypal.ts, uploadthing.ts, utils.ts
├─ prisma/                 # schema.prisma + migrations
├─ test/                    # Jest tests
└─ types/                   # shared TypeScript types
```

---

## 🚧 Known Gaps / Work in Progress

A few things flagged from exploring the live deployment that are worth tracking as issues:

- The homepage "Browse Categories" tiles currently all link back to `/`
- Several footer links (Help Centre, FAQ, Careers, etc.) are placeholders (`#`)
- The homepage countdown widget is stuck on "Loading Countdown..."

---

## 📄 License

No license file is currently published in this repository — add one (e.g. MIT) if you intend for others to reuse this code.
