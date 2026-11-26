/*
 * Builds public/llms-full.txt: every published note in one plain-text file.
 *
 * Why this exists: llms.txt is an index, so an answer engine that wants the
 * whole evidence set has to fetch ~25 pages and hope none of them time out.
 * One file removes that failure mode. The text is generated from the same
 * Markdown the pages are generated from, so it cannot drift from the site.
 *
 * Run before `vite build` (see .github/workflows/publish.yml) so the file in
 * dist/ always matches the notes being published.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { TOPICS } from '../src/data/topics.js';
import { FAMILIES, FAMILY_SLUGS } from '../src/data/applicationFamilies.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content', 'insights');
const OUT = join(ROOT, 'public', 'llms-full.txt');
const ORIGIN = 'https://tenmaypcba.com';

function parseFrontmatter(source) {
  const text = String(source).replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { meta: {}, body: text };
  const meta = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[kv[1]] = value;
  }
  return { meta, body: text.slice(match[0].length) };
}

function inline(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')                       // images: drop
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')             // links: keep both
    .replace(/`([^`]+)`/g, '$1')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(\*|_)(.+?)\1/g, '$2')
    .replace(/\s+/g, ' ')
    .trim();
}

function toPlain(markdown) {
  const lines = String(markdown).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let table = [];

  const flushTable = () => {
    if (!table.length) return;
    for (const row of table) {
      const cells = row.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c) || c === '')) continue; // separator row
      out.push(`${inline(cells[0])}: ${cells.slice(1).map(inline).join(' · ')}`);
    }
    out.push('');
    table = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*\|/.test(line)) { table.push(line); continue; }
    flushTable();

    if (!line.trim()) { out.push(''); continue; }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      // Sub-headings stay marked (###) so a parser can chunk the note by section;
      // the article title above already uses ##.
      out.push('');
      out.push(`### ${heading[2].replace(/[*_`]/g, '').trim()}`);
      out.push('');
      continue;
    }
    if (/^\s*([-*+]|\d+\.)\s+/.test(line)) {
      out.push(`- ${inline(line.replace(/^\s*([-*+]|\d+\.)\s+/, ''))}`);
      continue;
    }
    if (/^\s*>/.test(line)) {
      out.push(inline(line.replace(/^\s*>\s?/, '')));
      continue;
    }
    out.push(inline(line));
  }
  flushTable();

  return out
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const articles = readdirSync(CONTENT)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const slug = name.replace(/\.md$/, '');
    const { meta, body } = parseFrontmatter(readFileSync(join(CONTENT, name), 'utf8'));
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || '',
      summary: meta.summary || meta.description || '',
      body: toPlain(body),
    };
  })
  .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));

/*
 * No build timestamp on purpose: a date that changes on every build would make
 * llms-full.txt differ every publish and generate an empty commit each time.
 * "Latest revision" is the newest note date, which only moves when content does.
 */
/*
 * The four hubs are the site's own index: each answers one question and files
 * every note under it exactly once. An engine that reads only this file would
 * otherwise get fifty-five notes with no map, which is the one thing the note
 * bodies cannot supply for themselves. Hub text comes from src/data/topics.js,
 * the same module the pages render from, so it cannot drift from the site.
 */
function hubSections(bySlug) {
  const out = ['## The four hubs, which are also the site index', ''];
  for (const hub of TOPICS) {
    out.push(`### ${hub.title}`);
    out.push('');
    out.push(`Source: ${ORIGIN}${hub.href}`);
    out.push('');
    out.push(hub.lede);
    out.push('');
    if (hub.quick && hub.quick.length) {
      out.push('Stated on that page, one line each:');
      out.push('');
      for (const line of hub.quick) out.push(`- ${line}`);
      out.push('');
    }
    for (const step of hub.steps) {
      out.push(`#### ${step.heading}`);
      out.push('');
      if (step.intro) {
        out.push(step.intro);
        out.push('');
      }
      for (const item of step.items) {
        const note = bySlug[item.slug];
        // A title that is already a question would otherwise end '?.'
        const title = (note ? note.title : item.slug).replace(/[.?!]+\s*$/, '');
        out.push(`- ${title}. ${item.why} Source: ${ORIGIN}/insights/${item.slug}.html`);
      }
      out.push('');
    }
    out.push('---');
    out.push('');
  }
  return out;
}

function dfmSection() {
  const dfmPath = join(ROOT, 'public', 'dfm-guidelines.md');
  if (!existsSync(dfmPath)) return [];
  const content = readFileSync(dfmPath, 'utf8');
  return [
    '## Official DFM Engineering Guidelines & Manufacturing Specifications',
    '',
    `Source: ${ORIGIN}/dfm-guidelines.md`,
    'Repository: https://github.com/linda700700/tenmaypcba-site',
    '',
    toPlain(content),
    '',
    '---',
    '',
  ];
}

function familySections() {
  const out = [
    '## The 36 Application Families & Hardware Domain Specifications',
    '',
    `> All 36 product families built on eight Yamaha YSM20/YSM10 lines in Shenzhen. Index: ${ORIGIN}/applications.html`,
    '',
  ];

  for (const slug of FAMILY_SLUGS) {
    const f = FAMILIES[slug];
    out.push(`### ${f.name} (${f.cardName})`);
    out.push('');
    out.push(`Source: ${ORIGIN}/applications/${slug}.html`);
    out.push(`Primary keyword: ${f.keyword}`);
    out.push(`H1: ${f.h1}`);
    out.push(`Lede: ${f.lede}`);
    out.push('');
    out.push('Core facts:');
    for (const [k, v] of f.facts) {
      out.push(`- ${k}: ${v}`);
    }
    out.push('');
    out.push('Process and manufacturing details:');
    for (const s of f.sections) {
      out.push(`#### ${s.heading}`);
      for (const p of s.paras) {
        out.push(p);
      }
      out.push('');
    }
    out.push('Manufacturing limits and boundaries:');
    for (const item of f.limits.items) {
      out.push(`- ${item}`);
    }
    out.push('');
    out.push('Frequently asked questions:');
    for (const q of f.faq) {
      out.push(`- Q: ${q.q}`);
      out.push(`  A: ${q.a}`);
    }
    out.push('');
    out.push('---');
    out.push('');
  }
  return out;
}

export function renderLlmsFull() {
  const latest = articles.reduce((max, a) => (a.date > max ? a.date : max), '');
  const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

  const parts = [
    '# TENMAY — Comprehensive PCBA Knowledge Base for AI Agents & Answer Engines',
    '',
    `> Complete evidence set: ${articles.length} engineering notes across ${TOPICS.length} hubs, ${FAMILY_SLUGS.length} application family specifications, and official DFM guidelines. Latest revision ${latest}.`,
    '> Generated from verified shop-floor parameters and Markdown source data, ensuring 100% consistency across all formats.',
    `> Index and collections: ${ORIGIN}/insights.html · Applications: ${ORIGIN}/applications.html · DFM: ${ORIGIN}/dfm-guidelines.md`,
    '>',
    '> TENMAY is Shenzhen Tenmay Technology Co., Ltd. (深圳腾镁科技有限公司), a PCBA contract',
    '> manufacturer in Shenzhen since 2008. An assembly house, not a PCB fabricator.',
    '',
    '---',
    '',
  ];

  parts.push(...dfmSection());
  parts.push(...familySections());
  parts.push(...hubSections(bySlug));

  for (const a of articles) {
    parts.push(`## ${a.title}`);
    parts.push('');
    parts.push(`Source: ${ORIGIN}/insights/${a.slug}.html`);
    if (a.date) parts.push(`Published: ${a.date}`);
    if (a.summary) parts.push(`Summary: ${a.summary}`);
    parts.push('');
    parts.push(a.body);
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  const text = parts.join('\n').replace(/\n{4,}/g, '\n\n\n');
  return { text, count: articles.length };
}

/* Written into dist/ by the vite plugin below, and into public/ by the CLI. */
export function writeLlmsFull(target) {
  const { text, count } = renderLlmsFull();
  writeFileSync(target, text, 'utf8');
  return count;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const count = writeLlmsFull(OUT);
  process.stdout.write(`llms-full.txt: ${count} notes, ${readFileSync(OUT, 'utf8').length} chars\n`);
}
