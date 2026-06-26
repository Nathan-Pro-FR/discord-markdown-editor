import { DiscordEditor } from "@/components/discord-editor"

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--discord-bg)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6">
          <h1 className="text-pretty text-2xl font-bold text-[var(--discord-text)] sm:text-3xl">
            Éditeur Markdown Discord
          </h1>
          <p className="mt-1 text-sm text-[var(--discord-muted)]">
            Mets en forme tes messages et insère des emojis avec la syntaxe{" "}
            <code className="rounded bg-[var(--discord-code-bg)] px-1.5 py-0.5 font-mono text-[var(--discord-text)]">
              :nom:
            </code>{" "}
            — par exemple :heart:, :fire: ou :rocket:.
          </p>
        </header>
        <DiscordEditor />
      </div>
    </main>
  )
}
