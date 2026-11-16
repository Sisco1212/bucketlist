# Bucketlist

Bucketlist is currently a minimal Next.js starter application. The repository name suggests a bucket-list product, but the committed application is still the default `create-next-app` landing page: it does not yet implement bucket-list workflows, persistent data, user accounts, or a backend API.

## Project status

The project provides a runnable Next.js 16 / React 19 application shell, TypeScript configuration, Tailwind CSS styling, and ESLint setup. The home route displays Next.js starter content and links to Next.js and Vercel resources.

Several dependencies are present without corresponding application code: `@supabase/supabase-js` is installed, but there is no Supabase client configuration, database schema, or usage in the source. There are also no configured authentication flows or application API routes.

## Features currently implemented

- Next.js App Router application with a single home page at `/`.
- Starter page layout styled with Tailwind CSS utility classes.
- Geist and Geist Mono fonts configured through `next/font/google`.
- Responsive and dark-mode styling in the starter page and global stylesheet.
- TypeScript with strict checking enabled.
- ESLint configuration using the Next.js Core Web Vitals and TypeScript presets.

## Technology stack

| Area | Technologies and current usage |
| --- | --- |
| UI and framework | Next.js 16.2.10 App Router, React 19.2.4, React DOM 19.2.4 |
| Language | TypeScript 5; JavaScript is supported by the TypeScript configuration |
| Styling | Tailwind CSS 4 via `@tailwindcss/postcss`, plus `app/globals.css` |
| Fonts | Geist and Geist Mono loaded with `next/font/google` |
| Backend / runtime | Next.js Node.js server for development and production; no separate backend service or application API is implemented |
| Database | None implemented. Supabase JS is listed as a dependency but is not used by the source code |
| Authentication | None implemented |
| Quality tooling | ESLint 9 with `eslint-config-next` |
| Package management | npm, with dependency lockfile `package-lock.json` |
| Deployment | No provider-specific deployment configuration is included. The project can be built and served using Next.js scripts. |

## Application architecture

The application uses the Next.js App Router. The root layout in `app/layout.tsx` sets document metadata, loads the fonts, and imports the global stylesheet. The root route in `app/page.tsx` renders the starter UI. Next.js handles routing and rendering; there are no separate API services, data-access modules, database models, or authentication layers in the current codebase.

## Repository structure

```text
.
├── app/
│   ├── favicon.ico       # Browser icon
│   ├── globals.css       # Tailwind import and global theme styles
│   ├── layout.tsx        # Root layout, fonts, and document metadata
│   └── page.tsx          # Starter home page at /
├── public/               # Static starter SVG assets
├── AGENTS.md             # Repository-specific agent guidance
├── CLAUDE.md             # References AGENTS.md
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration (currently defaults)
├── package.json          # Dependencies and npm scripts
├── package-lock.json     # Locked npm dependency tree
├── postcss.config.mjs    # Tailwind CSS PostCSS plugin
└── tsconfig.json         # TypeScript configuration and @/* path alias
```

## Prerequisites

- Node.js compatible with Next.js 16 (Node.js 20.9 or later).
- npm.

## Installation and setup

Clone the repository and install the locked dependencies:

```bash
git clone https://github.com/Sisco1212/bucketlist.git
cd bucketlist
npm ci
```

No environment file or external service credentials are required by the current application.

## Running the application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Create and run a production build:

```bash
npm run build
npm run start
```

Run the configured lint check:

```bash
npm run lint
```

The npm scripts are defined in `package.json`. There is no test script configured in the current repository.

## Environment variables

The current source code does not read environment variables, and no `.env.example` is present. No variables are required to run the application as committed. Although the Supabase client library is included in dependencies, Supabase is not configured or used, so Supabase credentials should not be added unless a corresponding integration is implemented.

## API

There are no application API endpoints currently implemented. In particular, the repository contains no `app/api` route handlers or other server endpoints. The only application route is the page at `/`.

## Authentication and security

No sign-in, session management, authorization, or user-specific access control is implemented. No secrets are required by the current code. Keep any credentials introduced for future integrations out of source control; `.gitignore` already excludes `.env*` files.

## Data and database

The application currently has no database connection, migrations, schema, or data models. `@supabase/supabase-js` appears in `package.json`, but the application does not import or initialize it. No data is persisted by the current page.

## Deployment

The repository does not include deployment-specific settings or a configured hosting provider. A standard Next.js deployment can use the provided production commands:

```bash
npm ci
npm run build
npm run start
```

For a managed platform such as Vercel, configure the project for Next.js and use the same build process. No application environment variables are currently needed. Any platform-specific runtime requirements should be checked against the selected host's Next.js 16 support.

## Screenshots

Screenshots are not currently included in the repository. Add product screenshots here when the application UI is implemented.

<!-- Suggested location for future screenshots: docs/screenshots/ -->

## Potential future improvements

These are suggestions, not implemented features:

- Replace the starter page with the intended bucket-list experience and define its core user workflows.
- Add data persistence, potentially using Supabase, with explicit schema and access policies.
- Implement authentication and authorization if lists are intended to be user-specific or shared.
- Add automated tests and document the expected development and production workflows.
- Add screenshots once the product interface is available.

## Author and acknowledgements

The repository is owned by [Sisco1212](https://github.com/Sisco1212). The committed app is based on the Next.js `create-next-app` starter and includes the standard Next.js and Vercel starter assets. No individual author or additional acknowledgements are identified in the repository.
