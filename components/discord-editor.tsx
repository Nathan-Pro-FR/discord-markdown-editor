"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Bold, Italic, Underline, Strikethrough, Code, Quote, List, Eye, Smile } from "lucide-react"
import { EmojiPicker } from "./emoji-picker"
import { renderDiscordMarkdown } from "@/lib/discord-markdown"
import { searchEmojis } from "@/lib/emojis"
import { cn } from "@/lib/utils"

const DEFAULT_TEXT = `**Bienvenue** dans l'éditeur Markdown Discord :wave:

Tape \`:\` suivi d'un nom pour insérer un emoji, par ex. :heart: :fire: :rocket:

> Tu peux aussi faire des citations
- Des listes
- Du *texte en italique*, du __souligné__ et du ~~barré~~
- Et des spoilers : ||surprise !||

\`\`\`
Ou même des blocs de code
\`\`\`
`

type Suggestion = { name: string; char: string }

export function DiscordEditor() {
  const [text, setText] = useState(DEFAULT_TEXT)
  const [pickerOpen, setPickerOpen] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const pickerWrapRef = useRef<HTMLDivElement>(null)

  // Autocomplete state
  const [suggestQuery, setSuggestQuery] = useState<string | null>(null)
  const [suggestStart, setSuggestStart] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const suggestions: Suggestion[] = useMemo(
    () => (suggestQuery !== null ? searchEmojis(suggestQuery, 8) : []),
    [suggestQuery],
  )

  // Close emoji picker on outside click
  useEffect(() => {
    if (!pickerOpen) return
    function handleClick(e: MouseEvent) {
      if (pickerWrapRef.current && !pickerWrapRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [pickerOpen])

  function insertAtCursor(insert: string, opts?: { selectInside?: boolean; wrap?: [string, string] }) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd

    if (opts?.wrap) {
      const [before, after] = opts.wrap
      const selected = text.slice(start, end)
      const newText = text.slice(0, start) + before + selected + after + text.slice(end)
      setText(newText)
      const cursorStart = start + before.length
      const cursorEnd = cursorStart + selected.length
      requestAnimationFrame(() => {
        el.focus()
        el.setSelectionRange(cursorStart, cursorEnd)
      })
      return
    }

    const newText = text.slice(0, start) + insert + text.slice(end)
    setText(newText)
    const cursor = start + insert.length
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(cursor, cursor)
    })
  }

  function updateSuggestions(value: string, caret: number) {
    // Look backwards from caret for a ":" that starts a shortcode
    const uptoCaret = value.slice(0, caret)
    const match = /(?:^|\s):([a-z0-9_+-]*)$/i.exec(uptoCaret)
    if (match) {
      setSuggestQuery(match[1])
      setSuggestStart(caret - match[1].length - 1) // position of the ":"
      setActiveIndex(0)
    } else {
      setSuggestQuery(null)
    }
  }

  function applySuggestion(s: Suggestion) {
    const el = textareaRef.current
    if (!el) return
    const caret = el.selectionStart
    const before = text.slice(0, suggestStart)
    const after = text.slice(caret)
    const insert = `${s.char} `
    const newText = before + insert + after
    setText(newText)
    setSuggestQuery(null)
    const cursor = before.length + insert.length
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(cursor, cursor)
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (suggestQuery !== null && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % suggestions.length)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault()
        applySuggestion(suggestions[activeIndex])
      } else if (e.key === "Escape") {
        setSuggestQuery(null)
      }
    }
  }

  const rendered = useMemo(() => renderDiscordMarkdown(text), [text])

  const toolbarButtons = [
    { icon: Bold, label: "Gras", action: () => insertAtCursor("", { wrap: ["**", "**"] }) },
    { icon: Italic, label: "Italique", action: () => insertAtCursor("", { wrap: ["*", "*"] }) },
    { icon: Underline, label: "Souligné", action: () => insertAtCursor("", { wrap: ["__", "__"] }) },
    { icon: Strikethrough, label: "Barré", action: () => insertAtCursor("", { wrap: ["~~", "~~"] }) },
    { icon: Code, label: "Code", action: () => insertAtCursor("", { wrap: ["`", "`"] }) },
    { icon: Eye, label: "Spoiler", action: () => insertAtCursor("", { wrap: ["||", "||"] }) },
    { icon: Quote, label: "Citation", action: () => insertAtCursor("> ") },
    { icon: List, label: "Liste", action: () => insertAtCursor("- ") },
  ]

  return (
    <div className="grid w-full gap-4 lg:grid-cols-2">
      {/* Editor pane */}
      <div className="flex flex-col rounded-lg border border-[var(--discord-border)] bg-[var(--discord-input-bg)]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-[var(--discord-border)] p-2">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              title={btn.label}
              aria-label={btn.label}
              onClick={btn.action}
              className="flex size-8 items-center justify-center rounded text-[var(--discord-muted)] transition-colors hover:bg-[var(--discord-input)] hover:text-[var(--discord-text)]"
            >
              <btn.icon className="size-4" aria-hidden="true" />
            </button>
          ))}

          <div className="ml-auto" ref={pickerWrapRef}>
            <div className="relative">
              <button
                type="button"
                title="Emojis"
                aria-label="Ouvrir le sélecteur d'emojis"
                aria-expanded={pickerOpen}
                onClick={() => setPickerOpen((o) => !o)}
                className={cn(
                  "flex size-8 items-center justify-center rounded transition-colors hover:bg-[var(--discord-input)]",
                  pickerOpen ? "text-[var(--discord-blurple)]" : "text-[var(--discord-muted)] hover:text-[var(--discord-text)]",
                )}
              >
                <Smile className="size-4" aria-hidden="true" />
              </button>
              {pickerOpen && (
                <div className="absolute right-0 top-10 z-20">
                  <EmojiPicker
                    onSelect={(emoji) => {
                      insertAtCursor(`${emoji.char} `)
                      setPickerOpen(false)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Textarea + autocomplete */}
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              updateSuggestions(e.target.value, e.target.selectionStart)
            }}
            onKeyDown={handleKeyDown}
            onClick={(e) => updateSuggestions(text, e.currentTarget.selectionStart)}
            spellCheck={false}
            placeholder="Écris ton message... tape : pour un emoji"
            className="h-full min-h-[24rem] w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-[var(--discord-text)] placeholder:text-[var(--discord-muted)] focus:outline-none"
          />

          {suggestQuery !== null && suggestions.length > 0 && (
            <div className="absolute bottom-3 left-3 z-10 w-64 overflow-hidden rounded-lg border border-[var(--discord-border)] bg-[var(--discord-popover)] shadow-xl">
              <div className="border-b border-[var(--discord-border)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--discord-muted)]">
                Emojis correspondants
              </div>
              <ul role="listbox" className="max-h-56 overflow-y-auto py-1">
                {suggestions.map((s, idx) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={idx === activeIndex}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        applySuggestion(s)
                      }}
                      className={cn(
                        "flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm",
                        idx === activeIndex ? "bg-[var(--discord-input)]" : "",
                      )}
                    >
                      <span className="text-lg" role="img" aria-label={s.name}>
                        {s.char}
                      </span>
                      <span className="text-[var(--discord-text)]">:{s.name}:</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Preview pane */}
      <div className="flex flex-col rounded-lg border border-[var(--discord-border)] bg-[var(--discord-bg)]">
        <div className="flex items-center gap-2 border-b border-[var(--discord-border)] p-3">
          <Eye className="size-4 text-[var(--discord-muted)]" aria-hidden="true" />
          <span className="text-sm font-semibold text-[var(--discord-text)]">Aperçu</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Discord-style message row */}
          <div className="flex gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--discord-blurple)] text-base font-semibold text-white">
              U
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-semibold text-[var(--discord-text)]">Utilisateur</span>
                <span className="text-xs text-[var(--discord-muted)]">Aujourd&apos;hui à 12:00</span>
              </div>
              <div className="mt-0.5 break-words text-[var(--discord-text)]">{rendered}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
