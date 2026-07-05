# Duong Portfolio

Premium developer portfolio built with `React + TypeScript + Vite`.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- React Router
- Redux Toolkit
- Vercel Functions
- Neon Postgres
- Resend

## Local frontend only

```bash
npm install
npm run dev
```

Default Vite URL:

```bash
http://127.0.0.1:5173
```

## Local frontend + serverless API

The contact form now posts to `POST /api/contact`.

To run the Vite app together with the serverless function locally:

```bash
npm run dev:serverless
```

This uses `npx vercel dev`, which serves both the frontend and `api/contact.ts`.

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values:

```bash
DATABASE_URL="postgresql://user:password@your-neon-endpoint.neon.tech/neondb?sslmode=require"
RESEND_API_KEY="re_xxxxxxxxx"
LEAD_FROM_EMAIL="Portfolio <portfolio@your-domain.com>"
LEAD_TO_EMAIL="your-inbox@example.com"
LEAD_REPLY_ENABLED="true"
```

Notes:

- `DATABASE_URL` should point to a Neon Postgres database.
- `LEAD_FROM_EMAIL` must use a domain verified in Resend.
- `LEAD_TO_EMAIL` is the inbox that receives new portfolio leads.
- `LEAD_REPLY_ENABLED=false` disables the auto-reply email to visitors.

## Contact flow

`POST /api/contact` does all of the following:

1. Validates the payload on the server.
2. Creates the `contact_leads` table automatically if it does not exist yet.
3. Stores the lead in Postgres.
4. Sends a notification email to you through Resend.
5. Sends a confirmation email back to the visitor.

If the lead is saved but the email send fails, the API returns a partial-failure response and the UI shows the correct status instead of a fake success.

## Build

```bash
npm run build
```

This runs TypeScript checks for the frontend, Vite config, and the serverless API before building the site.

## Lint

```bash
npm run lint
```

## Important files

- `api/contact.ts`: Vercel serverless endpoint for lead storage and email delivery
- `src/sections/contact-section.tsx`: real frontend submit flow for the contact form
- `src/data/site-copy.ts`: bilingual UI copy, including contact form feedback states
- `src/types/contact.ts`: shared request and response types for the contact flow

## Deployment

This repo is set up for Vercel-style deployment:

- frontend static build from Vite
- serverless API in `/api`

If you deploy somewhere else, move `api/contact.ts` to the equivalent function runtime for that platform.
