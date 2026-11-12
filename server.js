/**
 * Standalone Node.js Production Server for ALVÉRA Fashion
 * Serves static production assets and executes server-side BotPulse prevention enforcement.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleAlveraApiRequest } from './server/api_router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5173;
const DIST_DIR = path.resolve(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // 1. Try handling as protected API request
  if (req.url && req.url.startsWith('/api/')) {
    const handled = await handleAlveraApiRequest(req, res);
    if (handled) return;
  }

  // 2. Serve static assets or fallback to index.html (SPA)
  let safePath = path.normalize(new URL(req.url, `http://localhost:${PORT}`).pathname);
  if (safePath === '/') safePath = '/index.html';
  let filePath = path.join(DIST_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[ALVÉRA Server] Production server running on http://0.0.0.0:${PORT}`);
  console.log(`[ALVÉRA Server] Server-Side Ed25519 Enforcement Layer ACTIVE`);
});

