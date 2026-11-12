import React from 'react';

/*
 * A deliberately small Markdown subset. The site has no Markdown dependency and
 * the articles only need headings, lists, quotes, paragraphs and inline
 * emphasis. Everything is returned as React nodes, so no HTML string is ever
 * injected and a typo in an article cannot break the page.
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)\s]+\))/g;

export function inline(text, keyPrefix = 'i') {
  const parts = String(text).split(INLINE);
  return parts.filter(Boolean).map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-slate-100 px-1 py-0.5 text-[0.9em] text-slate-800">
          {part.slice(1, -1)}
        </code>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const external = /^https?:/.test(href);
      return (
        <a
          key={key}
          href={href}
          className="text-[#126B3F] underline decoration-[#126B3F]/30 underline-offset-2 hover:decoration-[#126B3F]"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>
      );
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key} className="italic">{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
}

export function renderMarkdown(source) {
  const lines = String(source).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let para = [];
  let list = null; // { ordered, items }
  let table = null; // raw pipe rows, flushed when the block ends

  const flushPara = () => {
    if (!para.length) return;
    const text = para.join(' ').trim();
    if (text) out.push({ type: 'p', text });
    para = [];
  };

  const flushList = () => {
    if (!list) return;
    out.push(list);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const t = line.trim();

    // A pending table must be emitted before whatever ends it. Without this the
    // next heading is pushed first and the table lands after it.
    if (table && !/^\|/.test(t)) {
      out.push({ type: 'table', rows: table });
      table = null;
    }

    if (!t) {
      flushPara();
      flushList();
      continue;
    }

    const h = t.match(/^(#{2,4})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      out.push({ type: 'h', level: h[1].length, text: h[2] });
      continue;
    }

    if (/^---+$/.test(t)) {
      flushPara();
      flushList();
      out.push({ type: 'hr' });
      continue;
    }

    const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (img) {
      flushPara();
      flushList();
      out.push({ type: 'img', alt: img[1], src: img[2] });
      continue;
    }

    const quote = t.match(/^>\s?(.*)$/);
    if (quote) {
      flushPara();
      flushList();
      out.push({ type: 'quote', text: quote[1] });
      continue;
    }

    if (/^\|/.test(t)) {
      flushPara();
      flushList();
      if (!table) table = [];
      table.push(t);
      continue;
    }
    const ul = t.match(/^[-*]\s+(.*)$/);
    const ol = t.match(/^\d+\.\s+(.*)$/);
    if (ul || ol) {
      flushPara();
      const ordered = !!ol;
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: 'list', ordered, items: [] };
      }
      list.items.push((ul || ol)[1]);
      continue;
    }

    flushList();
    para.push(t);
  }

  flushPara();
  flushList();
  if (table) out.push({ type: 'table', rows: table });
  return out;
}

function parseTable(rows) {
  const cells = (line) =>
    line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const isSeparator = (line) => /^\|?[\s:|-]+\|?$/.test(line);
  return {
    head: cells(rows[0]),
    data: rows.slice(1).filter((r) => !isSeparator(r)).map(cells),
  };
}

const H_CLASS = {
  2: 'mt-10 mb-3 text-[22px] font-bold leading-snug text-slate-900 sm:text-[25px]',
  3: 'mt-8 mb-2 text-[18px] font-semibold leading-snug text-slate-900',
  4: 'mt-6 mb-2 text-[16px] font-semibold text-slate-900',
};

export function Markdown({ source }) {
  const blocks = renderMarkdown(source);
  return blocks.map((b, i) => {
    const key = `b${i}`;
    if (b.type === 'h') {
      const Tag = `h${b.level}`;
      return <Tag key={key} className={H_CLASS[b.level]}>{inline(b.text, key)}</Tag>;
    }
    if (b.type === 'hr') {
      return <hr key={key} className="my-8 border-slate-200" />;
    }
    if (b.type === 'img') {
      return (
        <figure key={key} className="my-8">
          <img
            src={b.src}
            alt={b.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg ring-1 ring-slate-200"
          />
          {b.alt ? (
            <figcaption className="mt-2 text-[12.5px] leading-snug text-slate-500">{b.alt}</figcaption>
          ) : null}
        </figure>
      );
    }
    if (b.type === 'table') {
      const { head, data } = parseTable(b.rows);
      return (
        <div key={key} className="my-7 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-[14px] leading-snug">
            <thead>
              <tr className="border-b-2 border-slate-300">
                {head.map((c, j) => (
                  <th key={j} className="py-2 pr-4 align-bottom font-semibold text-slate-900">
                    {inline(c, `${key}-h${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, r) => (
                <tr key={r} className="border-b border-slate-200 align-top">
                  {row.map((c, j) => (
                    <td key={j} className="py-2 pr-4 text-slate-700">
                      {inline(c, `${key}-${r}-${j}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (b.type === 'quote') {
      return (
        <blockquote key={key} className="my-5 border-l-2 border-[#126B3F]/40 bg-slate-50 px-4 py-3 text-[15.5px] text-slate-700">
          {inline(b.text, key)}
        </blockquote>
      );
    }
    if (b.type === 'list') {
      const Tag = b.ordered ? 'ol' : 'ul';
      return (
        <Tag
          key={key}
          className={`my-4 space-y-2 pl-5 text-[15.5px] leading-relaxed text-slate-700 ${b.ordered ? 'list-decimal' : 'list-disc'}`}
        >
          {b.items.map((item, j) => (
            <li key={`${key}-${j}`}>{inline(item, `${key}-${j}`)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={key} className="my-4 text-[15.5px] leading-[1.75] text-slate-700">
        {inline(b.text, key)}
      </p>
    );
  });
}
