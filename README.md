# AlgoPath

AlgoPath is an interview-practice app for DSA, SQL, and system design. This repository currently implements **Phase 1**: Supabase authentication, the responsive problem library, and the initial database schema and seed catalog.

## Requirements

- Node.js 20.9 or newer (Node 22 recommended)
- npm
- Docker Desktop for the local Supabase services or the app container

## Run locally

1. Install the app dependencies:

   ```sh
   npm install
   ```

2. Start the local Supabase stack (the Supabase CLI runs its services in Docker):

   ```sh
   npx supabase start
   ```

3. Copy the local API URL and anon key printed by the CLI into `.env.local`:

   ```sh
   cp .env.example .env.local
   ```

   Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the values from `npx supabase status`.

4. Apply the schema and seed the question catalog:

   ```sh
   npx supabase db reset
   ```

5. Start Next.js:

   ```sh
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). Supabase Studio is available at [http://localhost:54323](http://localhost:54323).

## Authentication setup

The local Supabase configuration enables email sign-up and phone OTP. The phone provider in local development uses Supabase's local test flow; inspect the Auth logs or Studio to retrieve test OTPs. For a hosted Supabase project:

- Add the app origin and `/auth/callback` to the Supabase Auth redirect URL allow-list.
- Configure Google and GitHub OAuth credentials in Supabase Auth.
- Configure an SMS provider and phone sign-in in Supabase Auth.
- Set the hosted project URL and public anon key in `.env.local`.

Do not expose a Supabase service-role key in the browser or in `NEXT_PUBLIC_*` variables.

## Docker

Build and run the web app with Docker Compose:

```sh
cp .env.example .env
# Replace the placeholder anon key with the local Supabase anon key.
npx supabase start
docker compose up --build
```

The app container connects to a Supabase CLI stack running on the host. Supabase itself remains a separately managed local service stack, matching the separable-service approach planned for later phases.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Phase 1 manual test checklist

- Open the problem library at desktop and mobile widths; check All, DSA, SQL, and System design tabs.
- Search by a problem title and a company (for example, `Two Sum` and `Google`); combine search with each difficulty filter and reset filters.
- Open a problem preview from a row and close it with the button or backdrop.
- Toggle light/dark mode and reload to verify the preference persists.
- At `/login`, try email sign-up/sign-in and phone OTP using a configured local or hosted Supabase project.
- Test Google and GitHub OAuth after adding provider credentials; confirm each returns through `/auth/callback`.
- After sign-up, verify a profile row is created. As an unauthenticated user, confirm hidden test data, submissions, and other users' progress are not readable through Supabase.

## Project layout

- `src/app/`: App Router pages and the OAuth callback.
- `src/components/`: Library and authentication UI.
- `src/lib/supabase/`: Browser and server Supabase clients.
- `supabase/migrations/`: PostgreSQL tables, indexes, profile trigger, and RLS policies.
- `supabase/seed.sql`: 20 DSA, 18 SQL, and 8 system design questions; company tags; system design rubrics; and visualizer traces for the first 10 DSA problems.

Phase 2 will add the DSA editor and asynchronous judging pipeline. No code execution, SQL sandbox, or AI evaluation is part of this phase.
