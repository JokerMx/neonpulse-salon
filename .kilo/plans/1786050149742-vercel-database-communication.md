# Plan: Fix Vercel Database Communication

## Root Cause Analysis

Vercel cannot communicate with the MySQL database for the following confirmed reasons:

1. **Missing environment variables**: `backend/.env` is gitignored. Vercel does not read `.env` files from the repository — DB credentials (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) are undefined in production, causing connection failures.
2. **Backend not built for Vercel**: `vercel.json` points to `src/index.ts` (TypeScript) with no `buildCommand` for the backend service. Vercel tries to execute raw TypeScript, which fails.
3. **CORS blocks production frontend**: Backend CORS is hardcoded to `http://localhost:5173`. The Vercel-deployed frontend domain is blocked.
4. **Frontend API URL points to localhost**: `VITE_API_URL=http://localhost:3000/api` makes the browser attempt to connect to `localhost`, which doesn't exist in production.
5. **Unreliable Vercel `services` feature**: The `services` monorepo feature in `vercel.json` has limited support for custom Express backends and often fails to apply build/runtime settings correctly.

## Recommended Approach

**Deploy backend and frontend as separate Vercel projects.** This is the standard, documented, and reliable approach. The current `services` feature is experimental and introduces fragility.

### Alternative (if monorepo must be kept)
Fix `vercel.json` with explicit build configuration, set env vars via Vercel CLI or dashboard, and accept that the `services` feature may still be unstable.

## Implementation Steps (Separate Projects — Recommended)

### Step 1: Add root-level `vercel.json` for backend
Create `vercel.json` inside `backend/` (or keep the existing root one if splitting projects):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/src/index.ts" }
  ]
}
```

### Step 2: Configure backend environment variables in Vercel
In the Vercel dashboard for the backend project, add:
- `DB_HOST` = `mysql-devfree.alwaysdata.net`
- `DB_PORT` = `3306`
- `DB_USER` = `devfree`
- `DB_PASSWORD` = `Hw3Bk57baT!P_pc`
- `DB_NAME` = `devfree_neonpulse_salon`
- `PORT` = `3000`
- `NODE_ENV` = `production`
- `MIN_INTERVAL_MINUTES` = `30`

### Step 3: Fix CORS in `backend/src/index.ts`
Change CORS origin to accept the production Vercel domain (or all origins in production):

```typescript
const corsOrigin = process.env.NODE_ENV === 'production'
  ? process.env.FRONTEND_URL || 'https://tu-frontend.vercel.app'
  : 'http://localhost:5173';

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
```

### Step 4: Fix frontend API URL
Update `frontend/.env`:
```env
VITE_API_URL=/api
VITE_API_TIMEOUT=10000
VITE_NOTIFICATION_DURATION=5000
```

In `frontend/src/services/api.service.ts`, the fallback is already `/api`, so production will work.

### Step 5: Update frontend Vercel configuration
Deploy `frontend/` as a Vite project on Vercel. No special `vercel.json` needed — Vercel auto-detects Vite.

### Step 6: Set frontend env var for backend URL (optional)
If the frontend needs to know the backend URL for non-rewrite scenarios, add `VITE_API_URL` in the frontend Vercel project settings pointing to the backend URL (e.g., `https://tu-backend.vercel.app/api`). Otherwise, keep it as `/api` and use Vercel rewrites if hosting both under one domain.

### Step 7: Validate database connectivity
After deployment, hit the backend `/health` endpoint. If the backend starts but DB queries fail, check Vercel logs for:
- `ECONNREFUSED` → MySQL host blocked Vercel IPs. Whitelist Vercel outbound IPs in MySQL (AlwaysData control panel).
- `ER_ACCESS_DENIED` → Wrong credentials. Verify env vars in Vercel dashboard.
- Timeout → MySQL connection slow from Vercel. Consider connection timeout configuration.

### Step 8: Fix root `vercel.json` or remove it
If deploying as separate projects, the root `vercel.json` with `services` should be removed to avoid confusion. Each project uses its own default Vercel configuration.

## Validation Plan

1. Deploy backend to Vercel → check build logs for TypeScript compilation success
2. Access `https://backend-url.vercel.app/health` → expect `{"status":"OK"}`
3. Access `https://backend-url.vercel.app/api/servicios` → expect JSON data or clear error
4. If DB error, check Vercel logs for exact MySQL error code
5. Deploy frontend → confirm API calls succeed through the frontend
6. Test full reservation flow end-to-end

## Open Questions

1. Does the AlwaysData MySQL instance allow remote connections from Vercel IP ranges? (Likely yes, but must verify in AlwaysData panel)
2. Should `mysql2` connection pool limits be tuned for serverless? (Consider lowering `connectionLimit` to avoid exhausting MySQL max connections)
