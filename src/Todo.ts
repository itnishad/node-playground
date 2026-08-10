import http, { IncomingMessage, ServerResponse } from 'http';
import { randomUUID } from 'crypto';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];

function sendJSON(res: ServerResponse, statusCode: number, data: unknown): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function getRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  const method = req.method || '';
  const parts = url.split('/').filter(Boolean); // ['todos', ':id']

  try {
    // GET /todos
    if (method === 'GET' && parts[0] === 'todos' && parts.length === 1) {
      return sendJSON(res, 200, todos);
    }

    // GET /todos/:id
    if (method === 'GET' && parts[0] === 'todos' && parts.length === 2) {
      const todo = todos.find((t) => t.id === parts[1]);
      if (!todo) return sendJSON(res, 404, { message: 'Todo not found' });
      return sendJSON(res, 200, todo);
    }

    // POST /todos
    if (method === 'POST' && parts[0] === 'todos' && parts.length === 1) {
      const body = await getRequestBody(req);
      if (!body.title) return sendJSON(res, 400, { message: 'Title is required' });
      const newTodo: Todo = {
        id: randomUUID(),
        title: body.title,
        completed: false,
      };
      todos.push(newTodo);
      return sendJSON(res, 201, newTodo);
    }

    // PUT /todos/:id
    if (method === 'PUT' && parts[0] === 'todos' && parts.length === 2) {
      const body = await getRequestBody(req);
      const todo = todos.find((t) => t.id === parts[1]);
      if (!todo) return sendJSON(res, 404, { message: 'Todo not found' });
      if (body.title !== undefined) todo.title = body.title;
      if (body.completed !== undefined) todo.completed = body.completed;
      return sendJSON(res, 200, todo);
    }

    // DELETE /todos/:id
    if (method === 'DELETE' && parts[0] === 'todos' && parts.length === 2) {
      const index = todos.findIndex((t) => t.id === parts[1]);
      if (index === -1) return sendJSON(res, 404, { message: 'Todo not found' });
      todos.splice(index, 1);
      return sendJSON(res, 204, null);
    }

    sendJSON(res, 404, { message: 'Route not found' });
  } catch (err) {
    sendJSON(res, 500, { message: 'Internal server error' });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});