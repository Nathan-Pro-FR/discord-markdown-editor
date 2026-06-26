"use client"

import { useMemo, useRef, useState } from "react"
import { Search } from "lucide-react"
import { EMOJI_CATEGORIES, searchEmojis } from "@/lib/emojis"
import { cn } from "@/lib/utils"

type EmojiPickerProps = {
  onSelect: (entry: { name: string; char: string }) => void
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [query, setQuery] = useState("")
  const [activeCat, setActiveCat] = useState(EMOJI_CATEGORIES[0].id)
  const scrollRef = useRef<HTMLDivElement>(null)

  const searchResults = useMemo(() => (query.trim() ? searchEmojis(query, 60) : null), [query])

  return (
    <div className="flex h-[22rem] w-[20rem] flex-col overflow-hidden rounded-lg border border-[var(--discord-border)] bg-[var(--discord-popover)] shadow-xl">
      {/* Search */}
      <div className="border-b border-[var(--discord-border)] p-2">
        <div className="flex items-center gap-2 rounded-md bg-[var(--discord-input)] px-2.5 py-1.5">
          <Search className="size-4 shrink-0 text-[var(--discord-muted)]" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un emoji"
            aria-label="Rechercher un emoji"
            className="w-full bg-transparent text-sm text-[var(--discord-text)] placeholder:text-[var(--discord-muted)] focus:outline-none"
          />
        </div>
      </div>

      {/* Category tabs (hidden while searching) */}
      {!searchResults && (
        <div
          role="tablist"
          aria-label="Catégories d'emojis"
          className="flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--discord-border)] px-2 py-1.5"
        >
          {EMOJI_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCat === cat.id}
              title={cat.label}
              onClick={() => {
                setActiveCat(cat.id)
                document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className={cn(
                "shrink-0 rounded px-2 py-1 text-base leading-none transition-colors",
                activeCat === cat.id
                  ? "bg-[var(--discord-input)]"
                  : "opacity-60 hover:opacity-100 hover:bg-[var(--discord-input)]",
              )}
            >
              <span role="img" aria-label={cat.label}>
                {cat.emojis[0].char}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2">
        {searchResults ? (
          searchResults.length > 0 ? (
            <EmojiGrid emojis={searchResults} onSelect={onSelect} />
          ) : (
            <p className="px-2 py-8 text-center text-sm text-[var(--discord-muted)]">Aucun emoji trouvé</p>
          )
        ) : (
          EMOJI_CATEGORIES.map((cat) => (
            <section key={cat.id} id={`cat-${cat.id}`} className="mb-2">
              <h3 className="px-1 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--discord-muted)]">
                {cat.label}
              </h3>
              <EmojiGrid emojis={cat.emojis} onSelect={onSelect} />
            </section>
          ))
        )}
      </div>
    </div>
  )
}

function EmojiGrid({
  emojis,
  onSelect,
}: {
  emojis: { name: string; char: string }[]
  onSelect: (entry: { name: string; char: string }) => void
}) {
  return (
    <div className="grid grid-cols-8 gap-0.5">
      {emojis.map((emoji) => (
        <button
          key={emoji.name}
          type="button"
          title={`:${emoji.name}:`}
          onClick={() => onSelect(emoji)}
          className="flex aspect-square items-center justify-center rounded text-xl transition-colors hover:bg-[var(--discord-input)]"
        >
          <span role="img" aria-label={emoji.name}>
            {emoji.char}
          </span>
        </button>
      ))}
    </div>
  )
}
