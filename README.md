# AlgoPath

AlgoPath is an interview-practice app for DSA, SQL, and system design. This repository implements **Phase 1** (Supabase authentication, the responsive problem library, and the initial database schema and seed catalog) and the Phase 2 DSA workspace with a private submission queue.

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
- Configure GitHub OAuth credentials in Supabase Auth.
- Configure an SMS provider and phone sign-in in Supabase Auth.
- Set the hosted project URL and public anon key in `.env.local`.

For local GitHub OAuth, add `SUPABASE_AUTH_EXTERNAL_GITHUB_CLIENT_ID` and `SUPABASE_AUTH_EXTERNAL_GITHUB_SECRET` to `.env.local`, then export them in the shell before starting Supabase:

```sh
set -a
source .env.local
set +a
npx supabase start
```

Restart Supabase after changing these values. The GitHub OAuth app callback URL for the local stack is `http://127.0.0.1:54321/auth/v1/callback`.

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
- Test GitHub OAuth after adding provider credentials; confirm it returns through `/auth/callback`.
- After sign-up, verify a profile row is created. As an unauthenticated user, confirm hidden test data, submissions, and other users' progress are not readable through Supabase.

## Project layout

- `src/app/`: App Router pages and the OAuth callback.
- `src/app/problems/[slug]/`: DSA workspace and authenticated submission action.
- `src/components/`: Library, authentication, and code workspace UI.
- `src/lib/supabase/`: Browser and server Supabase clients.
- `src/lib/submissions.ts`: Supported submission languages and queue types.
- `supabase/migrations/`: PostgreSQL tables, indexes, profile trigger, and RLS policies.
- `supabase/seed.sql`: 20 DSA, 18 SQL, and 8 system design questions; company tags; system design rubrics; and visualizer traces for the first 10 DSA problems.

## Phase 2: DSA workspace and submissions

- Open a DSA problem from its preview to view the statement and edit a Python, JavaScript, Java, or C++ solution.
- Signed-in users can queue submissions; they are stored with owner-only RLS and shown in the problem's recent submissions.
- This phase stores submissions only. No code is executed, no verdict is produced, and no SQL sandbox or AI evaluation is included.
- SQL and system-design workspaces remain out of scope.

### Phase 2 manual test checklist

- Open a DSA problem from the library and verify its title and statement.
- Switch languages, edit the starter solution, and check that switching back preserves each language's draft while the page remains open.
- While signed in, queue a non-empty solution and verify it appears as queued; confirm the UI says it was not run or scored.
- Reload and verify the submission appears in recent submissions for the signed-in user.
- Sign out and confirm submission history is not shown and submissions cannot be queued.
