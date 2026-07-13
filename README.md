<!-- @format -->

# The Hanger 🧥 — Full-Stack E-Commerce Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-99%25-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/Neon-Postgres-336791?logo=postgresql)
![Stripe](https://img.shields.io/badge/Payments-Stripe%20%7C%20PayPal-635BFF?logo=stripe)
![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)
![Live Demo](https://img.shields.io/website?url=https%3A%2F%2Fecom-beryl-seven.vercel.app&label=live%20demo)
![Last Commit](https://img.shields.io/github/last-commit/SiyaSok/ecom)
![License](https://img.shields.io/badge/license-MIT-green)

A full-stack fashion e-commerce storefront and admin dashboard, built with the Next.js App Router. "The Hanger" sells clothing, shoes, bags, and jewellery across Women's, Men's, Kids, and Sports collections, complete with authentication, cart & checkout, order management, wishlists, reviews, and an admin back office.

**🔗 Live demo:** [ecom-beryl-seven.vercel.app](https://ecom-beryl-seven.vercel.app)

---

## 📋 Table of Contents

- [Screenshots](#-screenshot)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Data Model](#-data-model)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [FAQ / Troubleshooting](#-faq--troubleshooting)
- [Contributing](#-contributing)
- [Known Gaps / Work in Progress](#-known-gaps--work-in-progress)
- [Roadmap Ideas](#-roadmap-ideas)
- [Acknowledgments](#-acknowledgments)
- [About the Developer](#-about-the-developer)
- [License](#-license)

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

<details>
<summary>More promo banners bundled with the project</summary>
<p align="center">
  <img src="docs/banner-2.jpg" alt="Second promotional banner" width="100%" />
</p>
</details>

> Swap in a full-page screenshot of the homepage/cart/admin dashboard here for the best first impression — a tool like [Polypane](https://polypane.app) or your browser's built-in "capture full size screenshot" (DevTools → Cmd/Ctrl+Shift+P) works well. Good pages to capture: homepage, a product detail page, the cart, and the admin overview dashboard.

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

## 🏗 Architecture

The app leans on **Next.js Server Actions** rather than a traditional REST/API layer for most data mutations. Actions live under `lib/actions/` and are called directly from client and server components:

| Action file                                                             | Responsibility                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `cart.action.ts`                                                        | Add/update/remove cart items, sync with the `Cart` table via `sessionCartId` cookie |
| `products.actions.ts`                                                   | Fetch/filter/search products, admin create/update/delete                            |
| `order.action.ts`                                                       | Create orders from cart, mark paid/delivered, Stripe/PayPal capture                 |
| `review.action.ts`                                                      | Create/read product reviews and ratings                                             |
| `wishlist.action.ts`                                                    | Add/remove/list wishlist items per user                                             |
| `user.action.ts`                                                        | Sign-up, profile updates, admin user management                                     |
| `collection-action.ts` / `category-action.ts` / `subcategory-action.ts` | Admin CRUD for the 3-tier taxonomy                                                  |

A handful of routes remain conventional API endpoints where a webhook or external redirect is required:

- `app/api/auth/[...nextauth]/route.ts` — Auth.js handler
- `app/api/uploadthing/route.ts` + `core.ts` — authenticated image upload endpoint (4MB limit, requires a logged-in session)
- `app/api/webhooks/stripe/route.ts` — listens for Stripe payment events to confirm orders

Route protection is handled in `middleware.ts` + `auth.config.ts`, which guards `/admin`, `/user/*`, `/order/*`, `/profile`, `/checkout` steps, and also mints a `sessionCartId` cookie for guest carts.

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

Copy the example file and fill in your own values:

```bash
cp .env.example .env
```

<details>
<summary>What each variable does</summary>

| Variable                                                                             | Purpose                                                     |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `DATABASE_URL`                                                                       | Postgres connection string (Neon recommended)               |
| `AUTH_SECRET` / `AUTH_URL`                                                           | Auth.js session encryption + canonical app URL              |
| `NEXT_PUBLIC_APP_NAME` / `_DESCRIPTION` / `_SERVER_URL`                              | Branding + metadata shown in the UI and emails              |
| `LATEST_PRODUCTS_LIMIT`                                                              | How many products show in the "new arrivals" rail           |
| `PAGE_SIZE`                                                                          | Products per page in search/collection listings             |
| `PAYMENT_METHODS` / `DEFAULT_PAYMENT_METHODS`                                        | Comma-separated list of enabled checkout payment options    |
| `USER_ROLES`                                                                         | Comma-separated roles used by the admin role selector       |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe payment + webhook verification                       |
| `PAYPAL_CLIENT_ID` / `PAYPAL_API_URL`                                                | PayPal REST API credentials (sandbox or live)               |
| `RESEND_API_KEY` / `SENDER_EMAIL`                                                    | Transactional email (order receipts)                        |
| `UPLOADTHING_TOKEN`                                                                  | Image upload service used by admin product/collection forms |

</details>

### 3. Set up the database

```bash
npx prisma generate
npx prisma migrate deploy
```

Seed sample data (products, users, etc.) if you'd like a populated catalog:

```bash
npx ts-node db/seed.ts
```

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

## 🔑 Demo Credentials

Running the seed script (`db/seed.ts`) populates `db/sample-data.ts`'s users, so you can sign in locally without registering:

| Role  | Email                       | Password      |
| ----- | --------------------------- | ------------- |
| Admin | `john.doe@example.com`      | `password123` |
| User  | `jane.smith@example.com`    | `secret123`   |
| User  | `alice.johnson@example.com` | `secure456`   |

> ⚠️ These are sample credentials meant for local development only — never seed this data into a production database.

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

## 🧪 Testing

The project uses **Jest** with **ts-jest**. The current suite (`test/paypal.test.ts`) covers the PayPal integration end-to-end against the sandbox API:

- Generating an OAuth access token
- Creating a PayPal order
- Simulating a payment capture (mocked)

```bash
npm run test          # run once
npm run test:watch    # watch mode
```

Since these tests hit the real PayPal sandbox, you'll need valid `PAYPAL_CLIENT_ID` / `PAYPAL_API_URL` values in `.env` for them to pass.

---

## ☁️ Deployment

The live demo is deployed on **Vercel**, and the repo includes a dedicated `vercel-build` script (`next build`) that runs `prisma generate` via `postinstall` first, so Prisma's client is always in sync with the schema at build time.

To deploy your own copy:

1. Push the repo to GitHub and import it into [Vercel](https://vercel.com/new)
2. Add all the environment variables from the [Getting Started](#-getting-started) section in the Vercel project settings
3. Point `DATABASE_URL` at a Neon (or any Postgres) production database and run `npx prisma migrate deploy`
4. Set your Stripe webhook endpoint to `https://<your-domain>/api/webhooks/stripe` and copy the signing secret into `STRIPE_WEBHOOK_SECRET`
5. Update `AUTH_URL` / `NEXT_PUBLIC_APP_SERVER_URL` to your production domain

---

## ❓ FAQ / Troubleshooting

**`prisma generate` fails or the client seems out of date**
Run `npx prisma generate` manually after any `schema.prisma` change — `postinstall` only runs it automatically on a fresh `npm install`.

**Login/session isn't persisting locally**
Double-check `AUTH_SECRET` is set (Auth.js v5 requires it even in development) and that `AUTH_URL` matches the port you're running on.

**Stripe payments succeed but orders never mark as paid**
The order is confirmed via the `/api/webhooks/stripe` route, not the client redirect. Locally, use the [Stripe CLI](https://stripe.com/docs/stripe-cli) to forward events: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`, and copy the printed signing secret into `STRIPE_WEBHOOK_SECRET`.

**Image uploads return "Unauthorized"**
`app/api/uploadthing/core.ts` requires an authenticated session — sign in before uploading, and confirm `UPLOADTHING_TOKEN` is set.

**PayPal tests fail**
`test/paypal.test.ts` calls the real PayPal sandbox API, so a valid `PAYPAL_CLIENT_ID` and network access are required for it to pass — it isn't mocked end-to-end.

---

## 🤝 Contributing

This started as a solo/portfolio build, but contributions are welcome:

1. Fork the repo and create a feature branch (`git checkout -b feature/my-change`)
2. Run `npm run lint` and `npm run test` before opening a PR
3. Keep server actions in `lib/actions/` colocated by domain (cart, order, product, etc.) rather than adding new API routes unless a webhook/redirect requires it
4. Describe the change and, if it touches the UI, include a before/after screenshot in the PR description

---

## 🚧 Known Gaps / Work in Progress

A few things flagged from exploring the live deployment that are worth tracking as issues:

- The homepage "Browse Categories" tiles currently all link back to `/`
- Several footer links (Help Centre, FAQ, Careers, etc.) are placeholders (`#`)
- The homepage countdown widget is stuck on "Loading Countdown..."

---

## 🗺 Roadmap Ideas

Not committed, just natural next steps given the current feature set:

- [ ] Wire up the "Browse Categories" grid to real collection/category routes
- [ ] Fill in footer/support pages (FAQ, Returns Policy, Delivery Info, Contact)
- [ ] Add automated test coverage beyond PayPal (cart, order, and auth actions)
- [ ] Add a proper `LICENSE` file
- [ ] Add CI (GitHub Actions) to run `lint` + `test` on PRs
- [ ] Guest checkout → account conversion flow
- [ ] Product filtering by price range / brand / rating on the search page

---

## 🙏 Acknowledgments

- UI components built on [shadcn/ui](https://ui.shadcn.com) and [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
- Database hosting via [Neon](https://neon.tech)
- Transactional email templates via [React Email](https://react.email)

---

## 👤 About the Developer

Built by **Ndofire**, a Front-End Software Engineer with 10+ years of experience across fintech, e-commerce, and retail — including React, Next.js, TypeScript, and React Native work at companies like Repwise, iKhokha, Mr Price Apparel, and iX Online Motoring.

- 💼 LinkedIn: _add your profile link here_
- 🌐 Portfolio: _add your portfolio link here_
- 📧 Email: _add your contact email here_

---

## 📄 License

No license file is currently published in this repository — add one (e.g. MIT) if you intend for others to reuse this code.
