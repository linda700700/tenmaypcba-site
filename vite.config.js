import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderLlmsFull } from './tools/gen-llms-full.mjs';
import {
  writeMeta,
  writeFamilyLinks,
  writeNeighbours,
  assertTopicCoverage,
} from './tools/insights-meta.mjs';
import { writeFamilyData } from './tools/family-index.mjs';
import { DEFAULT_WA_TEXT } from './src/data/company.js';
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
/* The reverse index the family pages read: which notes discuss this family. */
writeFamilyLinks();
/* Every note in exactly one hub, or the build stops. Checked here rather than in
 * topics.js because that module also ships to the browser, and a client bundle
 * cannot read the content directory. */
assertTopicCoverage();
/* Which two notes each note points at under "More notes". Computed here for the
 * same reason: it depends on every note's tags, hub and family, and the answer
 * has to be the same in the prerendered HTML and in the browser. */
writeNeighbours();
/* The family fields, split four ways so the 261 kB of applications prose stops
 * being part of every URL's bundle: the shared index, the card fields, the "read
 * next" reasoning, and one file per family. Generated here for the same reason as
 * the meta above: the client build imports and globs these files, so they have to
 * be on disk before the module graph is read. */
const familyCount = writeFamilyData();

function esc(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/*
 * Stamps every WhatsApp link with the route it sits on.
 *
 * The buttons all open the same chat with the same sentence, so an incoming
 * message cannot be traced to a page — and WhatsApp strips the referrer, so no
 * analytics tool can recover it either. The message itself is the only carrier
 * that survives the hop.
 *
 * This runs on the prerendered HTML rather than in React for one reason: it has
 * to hold for a visitor whose JavaScript never executes. The client-side
 * attributor in src/lib/waAttribution.js then upgrades the marker to
 * route + section at click time, replacing this one rather than adding a second.
 *
 * The payload is percent-encoded, so the marker is written encoded here and
 * stripped-then-restored on the client after decoding. Written in one place, read
 * in another: the two patterns must stay in step.
 */
const WA_HREF = /https:\/\/wa\.me\/8617361058693(?:\?text=([^"&]*))?/g;

/* The bare form — `[WhatsApp](https://wa.me/…)` with no query, which is how the
 * closing line of a note links out — still has to arrive with a request in it,
 * so it gets the same sentence the buttons use. Imported rather than retyped:
 * two copies of one sentence is how they stop matching. */
function attributeWa(html, routePath) {
  let ref = String(routePath || '/').replace(/\.html$/, '').replace(/\/+$/, '');
  if (ref === '') ref = 'home';
  else ref = ref.replace(/^\//, '');
  const marker = `\n\n[ref: ${ref}]`;

  return html.replace(WA_HREF, (whole, encoded) => {
    let text;
    if (encoded === undefined) {
      text = DEFAULT_WA_TEXT;
    } else {
      try {
        text = decodeURIComponent(encoded);
      } catch (err) {
        return whole;
      }
    }
    /* Idempotent: a template already carrying a marker is rewritten, not
     * appended to, so running this twice cannot double the text. */
    text = text.replace(/\s*\[ref:[^\]]*\]/g, '');
    return `https://wa.me/8617361058693?text=${encodeURIComponent(`${text}${marker}`)}`;
  });
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
      const { render, routes: allRoutes, resolvePage } = await import(
        pathToFileURL(join(outDir, 'entry-server.js')).href
      );

      const template = readFileSync(join(root, 'dist/index.html'), 'utf8');
      const routes = allRoutes;

      /* Page components are their own chunks now, fetched by main.jsx after this
       * bundle has parsed. Left alone that is a second round trip on a phone: the
       * entry arrives, runs, discovers it needs a chunk, and only then asks for it.
       * Declaring the chunk in the head lets both downloads overlap, so the wait
       * for a page component is the entry's own wait rather than one more.
       *
       * The filename carries a hash, so this cannot live in index.html: it is
       * written per route here from the build manifest, and it fails the build
       * rather than shipping a preload for a file that was not emitted. */
      const manifestPath = join(root, 'dist/.vite/manifest.json');
      const manifest = existsSync(manifestPath)
        ? JSON.parse(readFileSync(manifestPath, 'utf8'))
        : {};
      /* A page chunk is not always the last thing that has to arrive: a family
       * page imports the applications prose, which is a shared chunk of its own.
       * Preloading only the page would leave that second request waiting for the
       * first to parse — the waterfall this is meant to remove. So the imports
       * the manifest records for that chunk are declared too, one level deep,
       * which covers every route on the site today. */
      const hrefFor = (file) => `/assets/${file.split('/').pop()}`;
      const chunkFor = (name) => {
        const entry = manifest[`src/pages/${name}.jsx`];
        return entry ? hrefFor(entry.file) : null;
      };
      const importsOf = (name) => {
        const entry = manifest[`src/pages/${name}.jsx`];
        if (!entry || !entry.imports) return [];
        return entry.imports
          .map((key) => manifest[key])
          .filter(Boolean)
          .map((m) => hrefFor(m.file));
      };
      /* What the template already declares, plus the entry itself. Vite writes a
       * modulepreload for the entry's own imports (react, icons) and the entry is
       * loaded by the module script — repeating any of them is a duplicate tag
       * for a request already in flight. */
      const already = new Set(
        [...template.matchAll(/rel="modulepreload"[^>]*href="([^"]+)"/g)].map((m) => m[1])
      );
      const entryHref = manifest['index.html'] ? hrefFor(manifest['index.html'].file) : null;
      if (entryHref) already.add(entryHref);

      /* A family page fetches two files: its component and its own prose. The
       * prose is a dynamic import, so without a hint it would not start until the
       * entry had executed — a third round trip after the component's. Declaring
       * it here puts both in flight during the head. Missing is not fatal: the
       * page still works one round trip later. */
      const familyBodyHref = (name, routePath) => {
        if (name !== 'ApplicationFamilyPage') return [];
        const slug = /\/applications\/([^/]+)$/.exec(routePath)?.[1];
        const entry = slug && manifest[`src/data/families/${slug}.json`];
        return entry ? [hrefFor(entry.file)] : [];
      };

      const preloadFor = (routePath) => {
        const name = resolvePage(routePath).name;
        if (name === 'Home') return '';
        const href = chunkFor(name);
        if (!href) {
          throw new Error(`route ${routePath} resolves to page "${name}" with no chunk in the manifest`);
        }
        const wanted = [href, ...importsOf(name), ...familyBodyHref(name, routePath)].filter(
          (h) => !already.has(h)
        );
        return [...new Set(wanted)]
          .map((h) => `\n    <link rel="modulepreload" crossorigin href="${h}" />`)
          .join('');
      };

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

        html = html.replace('</head>', `${preloadFor(routePath)}\n  </head>`);

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

        // After the body is in, so the links being stamped are the ones the
        // visitor will actually see. Keyed to this route, not to the template.
        html = attributeWa(html, routePath);

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

      /*
       * The 404 page is the only place on this site that has to guess what a
       * visitor wanted. It gets the real route list plus each page's title, so a
       * truncated or mistyped address lands on the actual page instead of a
       * dead end — and because it is generated from `routes`, it cannot drift
       * out of step with the pages that exist.
       *
       * Paths are stored without the `.html` so the matcher compares like with
       * like: visitors arrive with both forms and the host serves both.
       */
      writeFileSync(
        join(root, 'dist/404-index.json'),
        JSON.stringify(
          routes.map((r) => ({ p: r.path.replace(/\.html$/, '') || '/', t: r.head.title }))
        )
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

      this.warn(
        `prerendered ${routes.length} routes (${familyCount.families} families, ${familyCount.bodies} bodies), sitemap written, service worker v${entry}`
      );
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
  build: {
    /* Writes dist/.vite/manifest.json. The prerender step reads it to find the
     * hashed filename of each page chunk, which is what the per-route
     * modulepreload in the head has to name. */
    manifest: true,
    rollupOptions: {
      output: {
        /* React and react-dom are the same bytes on every URL and change only
         * when the framework is upgraded. Given their own chunk they stay in the
         * browser cache across deploys while the site's own code is replaced. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react';
          if (id.includes('node_modules/lucide-react/')) return 'icons';
          return undefined;
        },
      },
    },
  },
  server: {
    host: '127.0.0.1',
  },
});
