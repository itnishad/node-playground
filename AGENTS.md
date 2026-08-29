# AGENTS.md

Small Express 5 + TypeScript learning playground. There is **no build step**: Node runs `src/server.ts` directly via native type-stripping, so relative imports must use explicit `.ts` extensions (`import app from './app.ts'`), and `.ts`-incompatible syntax (enums, namespaces, parameter properties) is rejected by `erasableSyntaxOnly` in tsconfig.

## Commands
- `npm run dev` — dev server (`node --watch --env-file=.env src/server.ts`). Listens on port **5000, hardcoded in `src/server.ts:11`**; `.env` `PORT` is ignored despite what README says.
- `npx tsc` — typecheck. Reads `tsconfig.json` (`noEmit`, `strict`, `verbatimModuleSyntax` → use `import type` for type-only imports). **Do not use `npm run typecheck`** — under installed TypeScript 7 it fails with `TS5112` because files are passed on the CLI while tsconfig exists.
- No test, lint, or build scripts exist. `npm start` (`node dist/server.js`) is a broken placeholder — nothing ever emits to `dist/`.

Requires Node ≥ 22.18 (native TS execution enabled by default; earlier 22.x needs `--experimental-strip-types`).

## Layout
- `src/app.ts` — Express app: JSON/urlencoded parsers, `/static` serves `public/`, routers mounted at `/v1/users` and `/v1/todos`, terminal error handler returns 500 JSON.
- `src/server.ts` — bootstrap + `unhandledRejection` / `uncaughtException` shutdown handling.
- `src/routers/` — only non-empty code today: `users.router.ts` (`GET /` deliberately throws `"Manual Error"` to exercise the error handler) and `todos.router.ts` (empty stub).
- `src/{services,controllers,configs,errors,middlewares}/` — empty placeholders.
- `.tmp/` — gitignored scratch space (learning checklist); never commit to it.

## Gotchas
- `README.md` describes an old Node `http`-module Todo API and is stale vs. the current Express code. Trust the code, not the README.