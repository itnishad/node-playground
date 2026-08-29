# Playground

A small Express 5 + TypeScript learning playground. Node runs `src/server.ts` directly via native type-stripping — there is no build step.

## Requirements

- Node.js 22.18 or later (earlier 22.x needs `--experimental-strip-types`)

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Starts the dev server with file watching at `http://localhost:5000`. The port is hardcoded in `src/server.ts`; the `PORT` value in `.env` is currently ignored.

## Checks

```bash
npx tsc
```

Typechecks everything via `tsconfig.json` (no emit). The `npm run typecheck` script is currently broken under TypeScript 7, and `npm start` is an unimplemented placeholder — nothing compiles to `dist/`.

## Project layout

- `src/app.ts` — app setup: JSON/urlencoded parsers, `/static` (serves `public/`), routers mounted at `/v1/users` and `/v1/todos`, and a terminal error handler returning 500 JSON.
- `src/server.ts` — bootstrap plus `unhandledRejection` / `uncaughtException` shutdown handling.
- `src/routers/` — `users.router.ts` (`GET /` deliberately throws to exercise the error handler) and `todos.router.ts` (empty stub). No real endpoints exist yet.
- `src/{services,controllers,configs,errors,middlewares}/` — empty placeholders for upcoming work.
- `.tmp/` — gitignored scratch space for learning notes; never committed.