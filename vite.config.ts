import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// @ts-ignore
import { handleAlveraApiRequest } from './server/api_router.js'

function alveraServerMiddlewarePlugin() {
  return {
    name: 'alvera-server-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url && req.url.startsWith('/api/')) {
          const handled = await handleAlveraApiRequest(req, res);
          if (handled) return;
        }
        next();
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    alveraServerMiddlewarePlugin()
  ],
})
