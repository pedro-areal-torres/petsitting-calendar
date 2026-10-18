# Pet sitting calendar

A pet sitting calendar built with Next.js App Router, React, Tailwind CSS, and
Drizzle ORM with PostgreSQL. The application is hosted on Netlify.

## Requirements

- Node.js 24 is used for local validation. Next.js requires at least Node.js 20.9;
  use a supported Node.js release and confirm the build and runtime versions on
  Netlify before deploying.
- npm and the committed lockfile for reproducible installs.
- Access to a PostgreSQL database with the application's schema.

## Getting started

Install dependencies:

```bash
npm ci
```

Create `.env.local` and set `DATABASE_URL` to your PostgreSQL connection string.
Use an isolated development database; never commit credentials. The home page
queries the database on every request, so it requires a working connection even
if the production build succeeds without one.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Validation

Run the independent lint, type, and production build checks:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

Next.js 16 uses Turbopack by default. Lint runs through the ESLint CLI rather than
the removed `next lint` command; it must be run separately from the build.

There is no automated test suite configured. With a test database, check `/` and
`/login`, the logo, calendar navigation between months and back to the current
month, day selection and event details on mobile, and desktop/mobile layouts.
Verify event and empty states without modifying production data, and check the
browser console and server logs for hydration or runtime errors.

## Netlify deployment

Before publishing an upgrade:

1. Confirm the site's Node.js build/runtime versions, `npm run build` command,
   and Next.js/OpenNext adapter support for the target Next.js version.
2. Enable a Deploy Preview for the upgrade branch/PR. Configure `DATABASE_URL`
   securely for that context, preferably using an isolated test database.
   Do not copy production credentials into previews automatically.
3. Run the same smoke checks in the preview. Inspect build and function logs,
   database access, dynamic rendering, and image optimization.
4. Promote only after the preview passes and the publication is approved.
   If a preview or test database is unavailable, resolve that blocker first.
5. Check production after deployment. Keep the previous successful Netlify
   deploy available for rollback; revert the upgrade changes in Git if needed.

This dependency upgrade does not require database migrations or changes to the
calendar's caching behavior.

See the [Next.js upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
and [Netlify Next.js documentation](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/).
