import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import prerender from "vite-plugin-prerender";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import Renderer from "@prerenderer/renderer-puppeteer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      routes: ["/", "/About", "/services", "/careers"],
      staticDir: path.join(__dirname, "dist"),
      renderer: new Renderer({
        renderAfterTime: 5000,
        headless: true,
        puppeteer: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }),
    }),
  ],
});
