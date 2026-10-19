/**
 * Server-rendered article body.
 *
 * The blog previously split post content on blank lines and rendered every
 * block as a `<p>`, so a post had exactly one heading — its H1 — and no
 * structure below it. That made two things impossible at once: search engines
 * had no section headings to rank passages against, and answer engines had no
 * self-contained chunk boundaries to lift a citable passage from.
 *
 * This renders a deliberately small Markdown subset, on the server, with no
 * `dangerouslySetInnerHTML` — post bodies come from the CMS, so they are
 * parsed into React nodes rather than injected as HTML:
 *
 *   ## Heading          → <h2 id="slug"> (the chunk boundary)
 *   ### Heading         → <h3 id="slug">
 *   > Quote             → <blockquote> (used for the standalone short answer)
 *   - item / 1. item    → <ul> / <ol>
 *   **bold** _italic_   → <strong> / <em>
 *   [text](href)        → <a> (external links get rel="noopener")
 *   anything else       → <p>
 *
 * Headings carry slugified ids so a passage has a stable deep link, which is
 * what an engine cites back to. Blocks that aren't recognised fall through to a
 * paragraph, so the older plain-prose posts keep rendering unchanged.
 */

import Link from "next/link";
import type { ReactNode } from "react";

/** Heading ids must be stable across rebuilds — a citation links to one. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

/** Inline formatting: bold, italics and links, parsed into nodes. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // One pass over the three inline forms, longest-delimiter first so `**` wins
  // over `_`. Anything unmatched is emitted as plain text.
  const pattern = /\*\*([^*]+)\*\*|_([^_]+)_|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const key = `${keyPrefix}-i${i++}`;

    if (match[1] !== undefined) {
      nodes.push(<strong key={key} className="font-semibold text-slate-900">{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={key}>{match[2]}</em>);
    } else {
      const label = match[3];
      const href = match[4];
      const isInternal = href.startsWith("/");
      nodes.push(
        isInternal ? (
          <Link key={key} href={href} className="text-brand-red font-medium underline underline-offset-2 hover:no-underline">
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className="text-brand-red font-medium underline underline-offset-2 hover:no-underline"
          >
            {label}
          </a>
        ),
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type Block =
  | { kind: "h2" | "h3"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "p"; text: string };

/**
 * Group the raw body into blocks. Consecutive list lines collapse into a single
 * list, and a blank line ends any run — so a list immediately followed by prose
 * doesn't swallow the prose.
 */
function parseBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.replace(/\r\n/g, "\n").split("\n");

  let paragraph: string[] = [];
  let list: { kind: "list"; ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ kind: "p", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushAll();
      blocks.push({ kind: heading[1].length === 2 ? "h2" : "h3", text: heading[2].trim() });
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushAll();
      blocks.push({ kind: "quote", text: trimmed.slice(2).trim() });
      continue;
    }

    const bullet = /^[-*]\s+(.*)$/.exec(trimmed);
    const numbered = /^\d+[.)]\s+(.*)$/.exec(trimmed);
    if (bullet || numbered) {
      flushParagraph();
      const ordered = !bullet;
      const item = (bullet ? bullet[1] : numbered![1]).trim();
      if (list && list.ordered === ordered) list.items.push(item);
      else {
        flushList();
        list = { kind: "list", ordered, items: [item] };
      }
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushAll();
  return blocks;
}

export function ArticleBody({ text }: { text: string }) {
  const blocks = parseBlocks(text || "");

  return (
    <div className="article-body space-y-5 text-base text-slate-700 leading-relaxed">
      {blocks.map((block, i) => {
        const key = `b${i}`;

        if (block.kind === "h2") {
          return (
            <h2
              key={key}
              id={slugifyHeading(block.text)}
              className="scroll-mt-24 pt-4 text-2xl lg:text-[1.75rem] font-black text-slate-900 leading-tight tracking-tight"
            >
              {renderInline(block.text, key)}
            </h2>
          );
        }

        if (block.kind === "h3") {
          return (
            <h3
              key={key}
              id={slugifyHeading(block.text)}
              className="scroll-mt-24 pt-2 text-lg lg:text-xl font-bold text-slate-900 leading-snug"
            >
              {renderInline(block.text, key)}
            </h3>
          );
        }

        if (block.kind === "quote") {
          // The short answer sits here: it must stay a standalone, quotable
          // passage, so it is marked speakable and kept in the normal flow
          // rather than hidden behind any interaction.
          return (
            <blockquote
              key={key}
              className="speakable-answer border-l-4 border-brand-red bg-slate-50 rounded-r-xl px-5 py-4 text-[1.0625rem] text-slate-800 font-medium leading-relaxed"
            >
              {renderInline(block.text, key)}
            </blockquote>
          );
        }

        if (block.kind === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={key} className={`${block.ordered ? "list-decimal" : "list-disc"} pl-6 space-y-2`}>
              {block.items.map((item, j) => (
                <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
              ))}
            </List>
          );
        }

        return <p key={key}>{renderInline(block.text, key)}</p>;
      })}
    </div>
  );
}
