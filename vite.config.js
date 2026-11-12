import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function setMeta(html, kind, key, value) {
  const re = new RegExp(`(<meta\\s+${kind}="${key}"[^>]*?content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${esc(value)}$2`);
  const inline = new RegExp(`(<meta\\s+${kind}="${key}"\\s+content=")[^"]*(")`, 'i');
  return html.replace(inline, `$1${esc(value)}$2`);
}

/*
 * Emits one real HTML file per route so each URL has its own title, description
 * and canonical, and so the body text exists in the source instead of arriving
 * only after JavaScript runs.
 *
 * The SSR bundle is built by a child `vite build --ssr` call; PRERENDER_CHILD
 * stops this plugin from recursing into itself there.
 */
function routePrerender() {
  return {
    name: 'route-prerender',
    apply: () => !process.env.PRERENDER_CHILD,
    async closeBundle() {
      const outDir = join(root, '.ssr-tmp');
      if (!existsSync(join(outDir, 'entry-server.js'))) {
        this.warn('SSR bundle missing; skipped prerender');
        return;
      }
      // The route list comes from the SSR bundle, not from a hand-kept array, so
      // a new article in src/content/insights/ is prerendered without editing
      // this file.
      const { render, routes: allRoutes } = await import(
        pathToFileURL(join(outDir, 'entry-server.js')).href
      );

      const template = readFileSync(join(root, 'dist/index.html'), 'utf8');
      const routes = allRoutes;

      for (const route of routes) {
        const { path: routePath, head, url } = route;
        let html = template;

        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`);
        html = setMeta(html, 'name', 'description', head.description);
        html = setMeta(html, 'property', 'og:title', head.ogTitle);
        html = setMeta(html, 'property', 'og:description', head.ogDescription);
        html = setMeta(html, 'property', 'og:url', url);
        html = setMeta(html, 'property', 'og:type', head.type || 'website');
        html = setMeta(html, 'name', 'twitter:title', head.ogTitle);
        html = setMeta(html, 'name', 'twitter:description', head.ogDescription);
        html = html.replace(
          /(<link rel="canonical" href=")[^"]*(")/,
          `$1${esc(url)}$2`
        );

        // Every route gets a prerendered body, including the homepage. Leaving
        // "/" as an empty shell made the most-linked page read as zero bytes of
        // text to any crawler that does not execute JavaScript.
        const body = render(routePath);
        html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

        if (routePath === '/') {
          writeFileSync(join(root, 'dist/index.html'), html);
          continue;
        }

        // One flat file per route. Directory indexes are deliberately not
        // emitted: the host serves them as a second copy of the same page,
        // which would compete with the canonical URL.
        const target = join(root, 'dist', `${routePath.replace(/^\//, '')}.html`);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, html);
      }

      // Sitemap is generated rather than hand-maintained: a route that is not in
      // it is a page search engines have to discover on their own.
      // <lastmod> is optional. Stamping every static page with the build date
      // claims the page changed when only the build ran, so pages without a
      // real content date leave it out instead of guessing.
      const urls = routes
        .map((r) => {
          const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
          return `  <url>
    <loc>${r.url}</loc>${lastmod}
    <changefreq>${r.lastmod ? 'yearly' : 'monthly'}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
        })
        .join('\n');
      writeFileSync(
        join(root, 'dist/sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
      );

      this.warn(`prerendered ${routes.length} routes, sitemap written`);
    },
  };
}

function ssrBundle() {
  return {
    name: 'route-prerender-ssr-bundle',
    apply: () => !process.env.PRERENDER_CHILD,
    async buildStart() {
      const viteBin = join(root, 'node_modules/vite/bin/vite.js');
      execFileSync(
        process.execPath,
        [viteBin, 'build', '--ssr', 'src/entry-server.jsx', '--outDir', '.ssr-tmp', '--emptyOutDir', '--logLevel', 'error'],
        { cwd: root, stdio: 'inherit', env: { ...process.env, PRERENDER_CHILD: '1' } }
      );
    },
  };
}

export default defineConfig({
  plugins: [react(), ssrBundle(), routePrerender()],
  server: {
    host: '127.0.0.1',
  },
});
