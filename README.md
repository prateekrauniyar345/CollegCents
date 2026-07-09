# Campus Cents — Project Overview

Campus Cents is a student-focused personal finance web app built during the Beyond Tomorrow Summit hackathon. It helps students track spending, plan budgets, set savings goals, import transactions, and get simple AI-driven insights.

---

## Table of Contents
- Project summary
- Architecture
- Tech stack
- Folder structure
- Development setup
- Environment variables
- Backend
- Frontend
- Database
- API overview
- Authentication
- Common tasks
- Troubleshooting
- Contributing
- License

---

## Project summary

Campus Cents provides a Vue 3 frontend (Vite) and a Node.js + Express backend. The backend uses Prisma ORM targeting MySQL, and exposes REST endpoints for authentication, users, and transaction management. Frontend handles MSAL-based Microsoft sign-in, transaction import (CSV), dashboards and analytics.

## Architecture

- Frontend: Vue 3 (Vite) app that proxies API requests to the backend during development.
- Backend: Node.js + Express (ES modules) with Prisma and MySQL connector.
- Database: MySQL (connection through `DB_CONNECTION_STRING`), Prisma schema located at `backend/prisma/schema.prisma`.
- Dev servers:
  - Frontend: Vite dev server (default port 3000)
  - Backend: Node server (default port 5001)

## Tech stack

- Frontend: Vue 3, Vue Router, Pinia-style reactive store (simple reactive object), Vite, Tailwind (configured), MSAL for Microsoft sign-in, Axios for API calls.
- Backend: Node.js, Express, Prisma, mysql2, dotenv, swagger-jsdoc + swagger-ui-express for API docs.

## Folder structure (high level)

- backend/
  - src/
    - app.js — express app, middleware, swagger mounting, route registration
    - server.js — starts the server
    - config/ — db.js, prisma.js, swagger.js
    - controllers/ — authController, userController, transactionController
    - routes/ — authRoutes, userRoutes, transactionRoutes
    - services/ — authService, userService, transactionService
    - models/ — User.js, Transaction.js
    - utils/ — errorHandler.js
  - prisma/ — `schema.prisma`
  - package.json

- frontend/
  - src/
    - main.js — app bootstrap, MSAL init
    - App.vue
    - router/ — route setup
    - api/ — authApi.js, transactionApi.js, userApi.js (APIs)
    - auth/ — authStore.js, msalConfig.js, redirectBridge.js
    - components/ — UI components (dashboard, auth, home)
    - pages/ — route pages (Home, Dashboard, Transactions, etc.)
    - lib/ — axiosClient.js
  - package.json
  - vite.config.js

## Development setup

Prerequisites:
- Node.js (recommended v20+ per frontend package.json engines)
- npm
- A MySQL database (or use a hosted provider). Ensure Prisma is configured.

Quick start (backend):

1. cd backend
2. npm install
3. Create a `.env` file in `backend/` (see Environment variables below)
4. Start the backend in development:

```bash
cd backend
npm run dev
```

Quick start (frontend):

1. cd frontend
2. npm install
3. Create `.env` (or `.env.local`) in `frontend/` (see Environment variables below)
4. Start the frontend dev server:

```bash
cd frontend
npm run dev
```

The frontend dev server proxies `/api` to `http://localhost:5001` using the Vite config.

## Environment variables

Backend (`backend/.env`):
- `PORT` — backend port (default 5001)
- `DB_CONNECTION_STRING` — full MySQL connection URI (used by Prisma and mysql2 pool)
- `DB_NAME`, `DB_HOST`, `DB_USER` etc. (optional, present in example `.env`)

Frontend (`frontend/.env`):
- `VITE_AZURE_CLIENT_ID` — Azure AD app client id
- `VITE_AZURE_TENANT_ID` — tenant id
- `VITE_AZURE_REDIRECT_URI` — redirect URI for auth
- `VITE_AZURE_POST_LOGOUT_REDIRECT_URI`

Notes: Keep `.env` files out of VCS. Example templates are provided in `frontend/.env.template`.

## Backend: key files & behavior

- `src/app.js` mounts middleware, docs at `/api-docs`, and registers routes under `/api/*`.
- `src/config/db.js` creates a mysql2 connection pool and provides an `initDB` helper used on app boot to ensure tables exist.
- `src/config/swagger.js` configures Swagger/OpenAPI (serves on `/api-docs`).
- `src/services/authService.js` handles upsert of Microsoft account info into the database via Prisma.
- `src/controllers/authController.js` provides `microsoftAuth` endpoint to receive account payload from the frontend and call `authService.upsertMicrosoftUser`.

Database models (Prisma):
- `User` model includes provider info, providerUserId, tenantId, email, name, role, timestamps, and relation to `Transaction`.
- `Transaction` model captures `date`, `description`, `amount`, `direction` (debit/credit), `type`, `category`, user relation, timestamps.

Routes (examples):
- `/api/auth/microsoft` — POST — Microsoft auth payload from frontend; handled by `authController.microsoftAuth`.
- `/api/users` — user management endpoints (list, update, delete)
- `/api/transactions` — transaction CRUD and summary endpoints

Validation and services: request validation is implemented in controllers (transactionController includes `validateTransactionData`), and logic is in `services/transactionService.js`.

## Frontend: key files & behavior

- `src/main.js` initializes MSAL (`@azure/msal-browser`) with `msalConfig`, registers event callbacks, and mounts the Vue app.
- `src/auth/msalConfig.js` contains MSAL configuration using environment variables.
- `src/auth/authStore.js` is a simple reactive store to hold `account` and `currentUser`.
- `src/api/axiosClient.js` is an Axios instance with `baseURL: '/api'` — Vite proxies that to backend.
- `src/components/auth/SignIn.vue` and `SignUp.vue` use MSAL to sign in and call `authApi.checkUserloginWithMicrosoft` to persist the account in the backend.
- `src/pages/Transactions.vue` interacts with `src/api/transactionApi.js` for fetching, creating, deleting, and importing transactions via CSV.

## Authentication flow

1. User signs in via MSAL in the frontend. The frontend receives an `account` object.
2. Frontend posts `account` to backend endpoint `/api/auth/microsoft`.
3. Backend upserts the user into the database using Prisma (see `authService.upsertMicrosoftUser`).
4. Backend returns the saved `User` record to the frontend. The frontend stores it in `authStore.currentUser`.

## Database setup

1. Ensure `DB_CONNECTION_STRING` in `backend/.env` points to your MySQL instance.
2. Initialize Prisma client codegen (if needed):

```bash
cd backend
npx prisma generate
```

3. If you manage migrations, use Prisma Migrate or run schema SQL against the database.

Note: The repo contains an `initDB` helper that attempts to create tables on startup using the mysql2 pool; review `backend/src/config/db.js` for details.

## API documentation

Swagger UI is available at: `http://localhost:5001/api-docs` (when backend is running). It is configured in `src/config/swagger.js` and reads JSDoc annotations from `src/routes` and `src/models`.

## Common tasks & commands

- Start backend dev server:

```bash
cd backend
npm install
npm run dev
```

- Start frontend dev server:

```bash
cd frontend
npm install
npm run dev
```

- Run Prisma generate:

```bash
cd backend
npx prisma generate
```

## Troubleshooting

- Database connection errors: verify `DB_CONNECTION_STRING` and network access to the database host/port. Ensure SSL query params if required by the provider.
- Prisma errors: run `npx prisma generate` and check the `@prisma/client` version matches the installed Prisma CLI.
- Frontend auth issues: confirm MSAL env variables in `frontend/.env` and that Azure AD app redirect URIs match `VITE_AZURE_REDIRECT_URI`.
- Proxy / CORS: Frontend Vite config proxies `/api` to backend; if running frontend on a different host or port in production, configure CORS on the backend.

## Contributing

1. Fork the repo and create a feature branch.
2. Run linters/tests locally and ensure code builds.
3. Open a pull request with a clear description of changes.

## Notes and next steps

- The repo includes additional documentation in `doc/` such as `System Architecture.md` and `Hackathon Info.md` for background and design thinking.
- Consider adding:
  - A proper migrations workflow (`prisma migrate`) and sample seed data.
  - Unit and integration tests for critical services (auth, transactions).
  - CI pipeline for automated checks, build and deploy.

---

If you'd like, I can also:
- generate a `backend/README.md` and `frontend/README.md` with step-by-step setup and environment templates,
- add a sample `.env.example` for the backend,
- or run `npx prisma generate` / `npm install` in the workspace and start the dev servers to validate the setup.
