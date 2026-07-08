# PromptPin

A Pinterest-style prompt discovery website for image and video prompts.

## What is included

- Masonry prompt feed with a 10-prompt visitor preview.
- Prompt detail pages with media, structured prompt text, tags, creator info, and relevant prompts.
- Login/paywall screen with Supabase magic-link auth wiring.
- Internal posting tool for prompt media and structured prompt fields.
- Likes, sharing, and named collection UI scaffolding.
- Supabase schema for viewer, internal poster, and super admin roles.
- Vercel-ready Next.js app and GitHub Actions CI workflow.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Supabase setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Create a public storage bucket named `prompt-media`.
4. Copy `.env.example` to `.env.local`.
5. Add your Supabase project URL and anon key.

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deploy on Vercel

Add the same environment variables in Vercel, connect the GitHub repo, and deploy. The default build command is:

```bash
npm run build
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
