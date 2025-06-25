### SecureShare - Secure Secret Sharing Platform

**Vision**: Enable secure, ephemeral sharing of sensitive information with configurable access controls (one-time view, expiration, password protection).

---

#### **Core Features**

1. **Secret Creation**
   - Set expiration (1h/24h/7d)
   - Toggle one-time access
   - Optional password protection
2. **Secret Retrieval**
   - Unique URL per secret
   - Password gate (if enabled)
   - Auto-deletion after viewing (one-time secrets)
3. **User Dashboard**
   - Manage secrets (create/view/delete)
   - Filter secrets by status (active/expired/viewed)
   - Search functionality

---

#### **Tech Stack**

- **Frontend**: Next.js 15, React 19, tRPC, Material UI
- **Backend**: tRPC, NextAuth, Prisma
- **Database**: PostgreSQL
- **Encryption**: AES-256-CBC

---

#### **Setup Instructions**

1. **Prerequisites**

   - Node.js ≥ v18
   - PostgreSQL database

2. **Installation**

   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create `.env`:

   ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/secrets?schema=public"
    JWT_SECRET="your_jwt_secret_here"
    NEXTAUTH_SECRET="your_nextauth_secret_here"
    NEXTAUTH_URL="http://localhost:3000"
    SECRETS_MASTER_KEY="your_secrets_master_key_32_char_"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run Server**
   ```bash
   npm run build
   npm run start
   ```

---

#### **Project Structure**

```
/                      # Root of the project
├── .env               # Environment variables (not committed to Git)
├── .gitignore         # Files & folders to ignore in Git
├── README.md          # Project overview & docs
├── eslint.config.mjs  # ESLint configuration
├── next-env.d.ts      # Next.js types
├── next.config.ts     # Next.js custom config
├── package.json       # NPM scripts & dependencies
├── package-lock.json  # Locked dependency tree
├── prisma/            # Prisma database schema & migrations
│   ├── migrations/    # Auto-generated migration files
│   └── schema.prisma  # Data model & datasource config
├── public/            # Static assets served at /
└── src/                            # Application source code
    ├── app/                        # Next.js App Router (pages & API routes)
    │   ├── _trpc/                  # tRPC client & provider setup
    │   │   ├── client.ts
    │   │   └── provider.tsx
    │   ├── api/                    # Server-side API routes
    │   │   ├── auth/               # NextAuth route
    │   │   │   └── [...nextauth]/route.ts
    │   │   └── trpc/               # tRPC route
    │   │       └── [trpc]/route.ts
    │   ├── auth/                   # Auth pages (login & register)
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── dashboard/              # User dashboard pages
    │   │   ├── page.tsx
    │   │   └── layout.tsx
    │   └── secret/                 # Secret viewing pages
    │       └── [id]/page.tsx
    ├── components/                 # Reusable React components
    │   ├── auth/                   # Inputs & indicators for auth flows
    │   │   ├── PasswordField.tsx
    │   │   └── PasswordStrengthIndicator.tsx
    │   ├── dashboard/              # Dashboard UI (cards, dialogs, grid)
    │   │   ├── CreateSecretDialog.tsx
    │   │   ├── SecretCard.tsx
    │   │   ├── SecretsGrid.tsx
    │   │   └── index.ts
    │   ├── home/                   # Homepage sections & features
    │   │   ├── HeroSection.tsx
    │   │   └── FeatureHighlight.tsx
    │   ├── layout/                 # Site header & footer
    │   │   ├── header.tsx
    │   │   └── footer.tsx
    │   └── secret/                 # Secret-access UI components
    │       ├── SecretAccessForm.tsx
    │       └── ViewSecret.tsx
    ├── lib/                        # Utility functions & theming
    │   ├── crypto.ts               # Encrypt/decrypt helpers
    │   ├── theme.ts                # Material UI/theme settings
    │   └── utils.ts                # helpers (date formatting, etc.)
    ├── server/                     # tRPC server & database client
    │   ├── db.ts                   # Prisma client instance
    │   └── trpc/
    │       ├── context.ts          # tRPC context
    │       ├── trpc.ts             # tRPC initialization
    │       └── router/
    │           ├── auth.ts         # Auth routes (login/register)
    │           ├── secret.ts       # Secret CRUD routes
    │           └── router.ts       # Root tRPC router
    └── types/                      # TypeScript type definitions
        ├── dashboard.ts
        ├── homeTypes.ts
        └── secret.ts
```

---

#### **API Documentation**

**Base URL**: `/api/trpc`

| Endpoint           | Method | Input                                          | Output                | Description          |
| ------------------ | ------ | ---------------------------------------------- | --------------------- | -------------------- |
| `auth.register`    | POST   | `{ email, password, name? }`                   | `{ success, userId }` | Register new user    |
| `secret.create`    | POST   | `{ content, isOneTime, expiresAt, password? }` | `{ id }`              | Create a secret      |
| `secret.get`       | GET    | `{ id, password? }`                            | `Secret` (decrypted)  | Fetch a secret by ID |
| `secret.mySecrets` | GET    | None                                           | `Secret[]`            | List user's secrets  |
| `secret.delete`    | POST   | `{ id }`                                       | `boolean`             | Delete a secret      |

---

#### **Architecture**

1. **Authentication**
   - NextAuth with JWT sessions
   - Credentials provider (email/password)
2. **Data Flow**
   - **Frontend**: tRPC hooks → React Query → tRPC server
   - **Backend**: tRPC middleware → Prisma → PostgreSQL
3. **Security**
   - Secrets encrypted with AES-256-CBC (master key)
   - Rate limiting on mutation endpoints
   - Password hashing (bcrypt)

---

#### **Usage**

1. **Create a Secret**

   - Visit `/dashboard` → "Create Secret"
   - Configure expiration/access/password.

2. **Share a Secret**

   - Copy the generated URL (e.g., `/secret/clxyz...`).
   - Recipient accesses the link, enters password (if set), views content.

3. **Manage Secrets**
   - Dashboard shows active/expired/viewed secrets.
   - Edit/delete secrets via action buttons.
