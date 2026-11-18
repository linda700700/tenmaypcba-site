import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderLlmsFull } from './tools/gen-llms-full.mjs';
import { writeMeta } from './tools/insights-meta.mjs';
import { dirname, join } from 'node:path';

// Absolute origin used for og:image and canonical URLs in the prerendered HTML.
const SITE_URL = 'https://tenmaypcba.com';

const root = dirname(fileURLToPath(import.meta.url));

/*
 * Regenerated here rather than in a plugin hook: the client build imports this
 * JSON through src/lib/insights.js, and the module graph is read before any
 * closeBundle runs. Doing it while the config loads means the file on disk is
 * always newer than the .md files it came from, on every build and in dev.
 */
writeMeta();

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

        /* Per-route share image. Without this every URL advertised the same
         * generic card, so a link to the servo page previewed as a photo of
         * solder joints. The declared dimensions follow the file actually used,
         * because a mismatch is what makes a preview render as a thumbnail. */
        if (route.share) {
          const absolute = `${SITE_URL}${route.share.image}`;
          html = setMeta(html, 'property', 'og:image', absolute);
          html = setMeta(html, 'property', 'og:image:width', String(route.share.width));
          html = setMeta(html, 'property', 'og:image:height', String(route.share.height));
          html = setMeta(html, 'name', 'twitter:image', absolute);
        }
        html = html.replace(
          /(<link rel="canonical" href=")[^"]*(")/,
          `$1${esc(url)}$2`
        );

        // Every route gets a prerendered body, including the homepage. Leaving
        // "/" as an empty shell made the most-linked page read as zero bytes of
        // text to any crawler that does not execute JavaScript.
        const body = render(routePath);
        html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

        // React's server renderer emits `srcSet` with a capital S. Attribute
        // names are case-insensitive in HTML so browsers read it correctly, but
        // it fails an HTML validator and it reads as a bug in view-source. The
        // client-side renderer sets the property properly either way, so only
        // the serialised HTML needs normalising.
        html = html.replace(/ srcSet=/g, ' srcset=');

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
      // <changefreq> and <priority> are ignored by Google and Bing; they only add
      // noise to a file a crawler has to parse. <lastmod> stays because it is the
      // one signal a crawler acts on, and only where a real content date exists.
      const urls = routes
        .map((r) => {
          const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : '';
          return `  <url>
    <loc>${r.url}</loc>${lastmod}
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

      // RSS for the insight notes. Without it the only way to notice a new
      // article is to re-crawl /insights and diff the page, which is not a
      // cadence anyone keeps. Items are the article routes: those are the only
      // entries carrying a real content date, so the feed can never claim an
      // update that did not happen.
      const feedItems = routes
        .filter((r) => r.lastmod)
        .map((r) => {
          const published = new Date(`${r.lastmod}T00:00:00Z`);
          const pubDate = Number.isNaN(published.getTime())
            ? ''
            : `\n      <pubDate>${published.toUTCString()}</pubDate>`;
          return `    <item>
      <title>${esc(r.head.ogTitle || r.head.title)}</title>
      <link>${r.url}</link>
      <guid isPermaLink="true">${r.url}</guid>${pubDate}
      <description>${esc(r.head.description || '')}</description>
    </item>`;
        })
        .join('\n');
      const newest = routes
        .filter((r) => r.lastmod)
        .map((r) => new Date(`${r.lastmod}T00:00:00Z`))
        .filter((d) => !Number.isNaN(d.getTime()))
        .sort((a, b) => b - a)[0];
      writeFileSync(
        join(root, 'dist/feed.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TENMAY — Notes from the PCBA line</title>
    <link>https://tenmaypcba.com/insights.html</link>
    <description>Process limits, quoting arithmetic and BOM problems, written from a high-mix PCBA floor in Shenzhen.</description>
    <language>en</language>
    <atom:link href="https://tenmaypcba.com/feed.xml" rel="self" type="application/rss+xml" />${newest ? `\n    <lastBuildDate>${newest.toUTCString()}</lastBuildDate>` : ''}
${feedItems}
  </channel>
</rss>
`
      );

      // An HTML file that loads a script 404 renders nothing at all: the visitor
      // gets a blank page and the form is unreachable. That is silent — the
      // build succeeds, the deploy succeeds, the site just stops working. It
      // happened once: the HTML kept an older asset hash while dist/assets held
      // the new one. Fail the build here rather than publish that.
      const published = readFileSync(join(root, 'dist/index.html'), 'utf8');
      const referenced = [...new Set(published.match(/\/assets\/[A-Za-z0-9._-]+/g) || [])];
      const missing = referenced.filter(
        (ref) => !existsSync(join(root, 'dist', ref.replace(/^\//, '')))
      );
      if (missing.length) {
        throw new Error(
          `prerendered HTML references assets that were not emitted: ${missing.join(', ')}`
        );
      }

      // The host serves every file with max-age=600, so the browser revalidates
      // all of them ten minutes after a visit. The service worker caches
      // /assets/ for good; its version comes from the hashed bundle name, so
      // each deploy drops the old cache instead of serving last week's photo.
      const entry = (template.match(/\/assets\/(index-[A-Za-z0-9_-]+\.js)/) || [])[1];
      if (!entry) {
        throw new Error('cannot version the service worker: no hashed entry bundle in the built HTML');
      }
      const swSource = readFileSync(join(root, 'sw-template.js'), 'utf8');
      writeFileSync(join(root, 'dist/sw.js'), swSource.replace('__CACHE_VERSION__', entry));

      this.warn(`prerendered ${routes.length} routes, sitemap written, service worker v${entry}`);
    },
  };
}

/*
 * One plain-text file holding every note, for answer engines that would rather
 * fetch once than crawl twenty-five pages. Generated from the same Markdown the
 * notes are built from, so it cannot describe a site that no longer exists.
 */
function llmsFullText() {
  return {
    name: 'llms-full-text',
    apply: () => !process.env.PRERENDER_CHILD,
    closeBundle() {
      const { text, count } = renderLlmsFull();
      writeFileSync(join(root, 'dist/llms-full.txt'), text);
      this.warn(`llms-full.txt: ${count} notes, ${text.length} chars`);
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
  plugins: [react(), ssrBundle(), routePrerender(), llmsFullText()],
  server: {
    host: '127.0.0.1',
  },
});
