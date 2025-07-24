
# Secure Sight – Incident Monitoring Dashboard

Secure Sight is a security monitoring dashboard built with **Next.js 15**, **Prisma ORM**, and **SQLite** (for local development). It enables real-time monitoring of security incidents captured by cameras, providing features like an incident timeline, video player, and resolution tracking.

---
<img width="1900" height="866" alt="Screenshot 2025-07-25 025156" src="https://github.com/user-attachments/assets/55824d3c-f951-49b5-baf8-d2d8686c9124" />

---
## 1. Project Overview

The goal of this project was to build a responsive and intuitive security dashboard with the following features:

* **Incident Listing** – View a list of security incidents detected within the last 24 hours.
* **Incident Player** – Play back selected incidents with context from other events.
* **Timeline View** – Visual representation of all incidents for better situational awareness.
* **Incident Resolution** – Ability to mark incidents as resolved.

---

## 2. Tech Stack and Decisions

* **Next.js 15 (App Router)**
  Chosen for its server-side rendering, API routes, and optimized bundling for modern React apps.

* **Prisma ORM**
  Simplifies database schema management and provides a type-safe client for querying.

* **SQLite**
  Used for local development because of its zero-setup nature and simplicity. Perfect for prototyping.

* **TailwindCSS**
  For rapid and consistent UI design with utility-first styling.

* **TypeScript**
  Adds type safety across the entire stack, reducing runtime bugs.

---

## 3. Deployment Instructions

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Secure_Sight
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup the database**

   ```bash
   npx prisma db push
   npm run db:seed
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Access the app at `http://localhost:3000`.

---

### Deployment to Vercel

This project was deployed on **Vercel** for simplicity. However, note:

* **SQLite is not persistent in a serverless environment.**
  Vercel functions run statelessly; the database file (`dev.db`) does not survive between deployments or server instances.

**Workaround Implemented:**
The deployed app is in **Demo Mode**. The UI loads, but database operations like incident resolution and persistence are disabled in production.

---

## 4. Known Limitations on Vercel

* Database resets on every build because of SQLite’s file-based nature.
* API routes depending on Prisma still work but cannot store changes.
* For a production-ready solution, we would move to **PostgreSQL (e.g., Supabase, Neon)**.

---

## 5. If I Had More Time…

* **Database Upgrade:** Switch from SQLite to a hosted Postgres solution for persistence in deployment.
* **Authentication & Role Management:** Secure access for different user roles (Admin, Viewer).
* **Real-Time Updates:** Implement WebSockets or Next.js `server actions` for live incident updates.
* **Incident Video Integration:** Host and play back real video footage securely.
* **Advanced Filtering:** Filter incidents by type, camera, or time range.
* **Analytics Dashboard:** Provide trends and statistics on security incidents.

---

## 6. Folder Structure (High-Level)

```
secure-sight/
├── app/
│   ├── page.tsx          # Home dashboard
│   ├── api/
│   │   └── incidents/    # API routes for fetching & resolving incidents
├── components/           # UI components (Player, List, Timeline)
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed script
├── public/               # Static assets
└── README.md
```

---

## 7. Why SQLite?

SQLite was chosen for **fast prototyping** because:

* No external dependency required.
* Perfect for local testing and seeding data quickly.

For **production**, this is not ideal due to:

* Lack of persistence in serverless environments.
* Limited scalability.

---

## 8. How to Run in Demo Mode

The deployed version on Vercel includes a banner that clarifies:

> "Database features are disabled in deployment due to environment limitations."

This ensures the reviewer understands why the resolve feature doesn’t work in production.

