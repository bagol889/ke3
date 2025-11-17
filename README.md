# Next.js Supabase Multi-Dashboard (Tailwind + bcrypt owner)

Local setup:
1. Copy `.env.local.example` to `.env.local` and fill the keys.
2. Create the required tables in Supabase (users, user_keys, owner_config).
3. Run `npm install` (or `pnpm install`).
4. `npm run dev` to start the dev server.
5. Use `npm run hash-owner <password>` to generate a bcrypt hash for owner and paste it into owner_config table.
