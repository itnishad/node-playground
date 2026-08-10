# Todo API

A small REST-style Todo API built with Node.js's built-in `http` module and TypeScript. Todo data is stored in memory, so it is reset whenever the server restarts.

## Requirements

- Node.js 20 or later
- npm

## Setup

```bash
npm install
```

Optionally create a `.env` file in the project root to select the listening port:

```env
PORT=4000
```

If `PORT` is not set, the server uses port `8000`.

## Run

Start the development server with file watching:

```bash
npm run dev
```

The server is then available at `http://localhost:<PORT>`; for example, `http://localhost:4000` when using the included `.env` file.

## Todo shape

| Field | Type | Details |
| --- | --- | --- |
| `id` | string | UUID generated on creation |
| `title` | string | Required when creating a todo |
| `description` | string | Required when creating a todo |
| `status` | boolean | Set to `false` on creation |
| `createTime` | number | Creation timestamp in milliseconds |

## Endpoints

| Method | Path | Status | Description |
| --- | --- | --- | --- |
| `GET` | `/todos` | Implemented | Returns all todos as an array. |
| `GET` | `/todos/:id` | Implemented | Returns a todo by ID. |
| `POST` | `/todos` | Implemented | Creates a todo. |
| `PUT` | `/todos` | Not implemented | Placeholder only; it falls through to a 404 response. |
| `DELETE` | `/todos/:id` | Implemented | Removes a todo by ID. |

### Create a todo

`POST /todos`

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread"
}
```

Both `title` and `description` are required. A successful request returns `201`:

```json
{
  "status": true,
  "code": 201,
  "messages": "Successfully created",
  "data": {
    "id": "generated-uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": false,
    "createTime": 0
  }
}
```

### Get one todo

`GET /todos/:id`

When found, the response contains `status`, `code`, `message`, and `data`. If no matching todo exists, the API responds with a body containing a `404` code and an explanatory message.

### Delete a todo

`DELETE /todos/:id`

Returns a success message after removing every in-memory todo whose ID matches the path value. The current implementation reports success even when the ID did not match an existing todo.

## Notes

- Requests with an unknown path return `404` and `Route Not Found`.
- Invalid JSON or unexpected server errors return `500`.
- The `response` helper currently always writes HTTP status `200`, including the not-found response from `GET /todos/:id`; its JSON body still contains `code: 404`.
