import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.resolve(__dirname, 'node_modules/vite-plugin-prerender/dist/index.mjs');

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes("createRequire")) {
    content = content.replace(
      'const Prerenderer = require("@prerenderer/prerenderer");',
      `import { createRequire } from 'module';\nconst _require = createRequire(import.meta.url);\nconst Prerenderer = _require("@prerenderer/prerenderer");`
    );
    
    content = content.replace('require("@prerenderer/renderer-puppeteer")', '_require("@prerenderer/renderer-puppeteer")');
    content = content.replace('require("html-minifier")', '_require("html-minifier")');
    content = content.replace('require("mkdirp")', '_require("mkdirp")');
    
    fs.writeFileSync(file, content);
    console.log("vite-plugin-prerender patched successfully.");
  }
} else {
  console.log("vite-plugin-prerender not found, skipping patch.");
}
