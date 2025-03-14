import jsonServer from 'json-server';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Обработчик для Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  server(req, res);
}
