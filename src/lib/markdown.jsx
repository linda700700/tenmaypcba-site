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

    const quote = t.match(/^>\s?(.*)$/);
    if (quote) {
      flushPara();
      flushList();
      out.push({ type: 'quote', text: quote[1] });
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
  return out;
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
