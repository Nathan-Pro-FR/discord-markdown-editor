import type React from "react"
import { EMOJI_MAP } from "./emojis"

/**
 * Lightweight Discord-flavored markdown renderer.
 * Supports: headers (#, ##, ###), bold, italic, underline, strikethrough,
 * inline code, code blocks, block quotes, spoilers, lists, links, and
 * :shortcode: emoji substitution.
 */

let keyCounter = 0
function nextKey() {
  return `dmd-${keyCounter++}`
}

// --- Inline parsing ---------------------------------------------------------

type InlineRule = {
  regex: RegExp
  render: (match: RegExpExecArray) => React.ReactNode
}

function renderInline(text: string): React.ReactNode[] {
  // Order matters: longer/more specific tokens first.
  const rules: InlineRule[] = [
    // Inline code `code` (no further parsing inside)
    {
      regex: /`([^`\n]+)`/,
      render: (m) => (
        <code
          key={nextKey()}
          className="rounded bg-[var(--discord-code-bg)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--discord-text)]"
        >
          {m[1]}
        </code>
      ),
    },
    // Spoiler ||text||
    {
      regex: /\|\|([\s\S]+?)\|\|/,
      render: (m) => <Spoiler key={nextKey()}>{renderInline(m[1])}</Spoiler>,
    },
    // Bold **text**
    {
      regex: /\*\*([\s\S]+?)\*\*/,
      render: (m) => <strong key={nextKey()}>{renderInline(m[1])}</strong>,
    },
    // Underline __text__
    {
      regex: /__([\s\S]+?)__/,
      render: (m) => <u key={nextKey()}>{renderInline(m[1])}</u>,
    },
    // Strikethrough ~~text~~
    {
      regex: /~~([\s\S]+?)~~/,
      render: (m) => <s key={nextKey()}>{renderInline(m[1])}</s>,
    },
    // Italic *text* or _text_
    {
      regex: /\*([^*\n]+?)\*|_([^_\n]+?)_/,
      render: (m) => <em key={nextKey()}>{renderInline(m[1] ?? m[2])}</em>,
    },
    // Masked link [label](url)
    {
      regex: /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/,
      render: (m) => (
        <a
          key={nextKey()}
          href={m[2]}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[var(--discord-link)] hover:underline"
        >
          {renderInline(m[1])}
        </a>
      ),
    },
    // Bare URL
    {
      regex: /(https?:\/\/[^\s<]+)/,
      render: (m) => (
        <a
          key={nextKey()}
          href={m[1]}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[var(--discord-link)] hover:underline"
        >
          {m[1]}
        </a>
      ),
    },
    // Emoji :shortcode:
    {
      regex: /:([a-z0-9_+-]+):/i,
      render: (m) => {
        const char = EMOJI_MAP[m[1].toLowerCase()]
        if (!char) return m[0]
        return (
          <span key={nextKey()} className="text-[1.2em] leading-none align-middle" role="img" aria-label={m[1]}>
            {char}
          </span>
        )
      },
    },
  ]

  const nodes: React.ReactNode[] = []
  let remaining = text

  while (remaining.length > 0) {
    let earliest: { index: number; match: RegExpExecArray; rule: InlineRule } | null = null

    for (const rule of rules) {
      const re = new RegExp(rule.regex.source, rule.regex.flags.includes("i") ? "i" : "")
      const match = re.exec(remaining)
      if (match && (earliest === null || match.index < earliest.index)) {
        earliest = { index: match.index, match, rule }
      }
    }

    if (!earliest) {
      nodes.push(remaining)
      break
    }

    if (earliest.index > 0) {
      nodes.push(remaining.slice(0, earliest.index))
    }
    nodes.push(earliest.rule.render(earliest.match))
    remaining = remaining.slice(earliest.index + earliest.match[0].length)
  }

  return nodes
}

// --- Block parsing ----------------------------------------------------------

export function renderDiscordMarkdown(source: string): React.ReactNode {
  keyCounter = 0
  const lines = source.split("\n")
  const blocks: React.ReactNode[] = []

  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    // Code block ```lang \n ... \n ```
    if (line.trimStart().startsWith("```")) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing fence
      blocks.push(
        <pre
          key={nextKey()}
          className="my-1 overflow-x-auto rounded-md bg-[var(--discord-codeblock-bg)] p-3 font-mono text-[0.85em] text-[var(--discord-text)]"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>,
      )
      continue
    }

    // Block quote > text (consecutive lines)
    if (/^>\s?/.test(line)) {
      const quoteLines: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""))
        i++
      }
      blocks.push(
        <blockquote
          key={nextKey()}
          className="my-0.5 border-l-4 border-[var(--discord-quote-border)] pl-3 text-[var(--discord-text)]"
        >
          {quoteLines.map((q) => (
            <div key={nextKey()}>{renderInline(q) }</div>
          ))}
        </blockquote>,
      )
      continue
    }

    // Headers
    const headerMatch = /^(#{1,3})\s+(.*)$/.exec(line)
    if (headerMatch) {
      const level = headerMatch[1].length
      const content = renderInline(headerMatch[2])
      const cls =
        level === 1
          ? "text-2xl font-bold my-1"
          : level === 2
            ? "text-xl font-bold my-1"
            : "text-lg font-bold my-1"
      const Tag = (level === 1 ? "h1" : level === 2 ? "h2" : "h3") as keyof React.JSX.IntrinsicElements
      blocks.push(
        <Tag key={nextKey()} className={cls}>
          {content}
        </Tag>,
      )
      i++
      continue
    }

    // Unordered list - item / * item
    if (/^\s*[-*]\s+/.test(line)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\s*[-*]\s+/, "")
        items.push(<li key={nextKey()}>{renderInline(itemText)}</li>)
        i++
      }
      blocks.push(
        <ul key={nextKey()} className="my-0.5 list-disc pl-6">
          {items}
        </ul>,
      )
      continue
    }

    // Empty line -> spacing
    if (line.trim() === "") {
      blocks.push(<div key={nextKey()} className="h-2" aria-hidden="true" />)
      i++
      continue
    }

    // Default paragraph line
    blocks.push(
      <div key={nextKey()} className="min-h-[1.375rem] leading-relaxed">
        {renderInline(line)}
      </div>,
    )
    i++
  }

  return blocks
}

// --- Spoiler component ------------------------------------------------------

function Spoiler({ children }: { children: React.ReactNode }) {
  return (
    <span
      tabIndex={0}
      className="group cursor-pointer rounded bg-[var(--discord-spoiler-bg)] text-transparent transition-colors hover:bg-[var(--discord-spoiler-bg-hover)] focus:bg-[var(--discord-spoiler-bg-hover)] focus:text-[var(--discord-text)] focus:outline-none [&:focus_*]:text-[var(--discord-text)]"
      data-spoiler=""
    >
      {children}
    </span>
  )
}
