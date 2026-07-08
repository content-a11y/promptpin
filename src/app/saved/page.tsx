import { AppHeader } from "@/components/AppHeader";
import { PromptCard } from "@/components/PromptCard";
import { savedPrompts } from "@/lib/userContent";
import { Bookmark, Search } from "lucide-react";

export default function SavedPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[1500px] px-4 pb-16 pt-6 sm:px-6">
        <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700">
              <Bookmark className="h-4 w-4" />
              Saved
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Saved prompts</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Prompts you saved for reuse, remixing, and collection building.
            </p>
          </div>
          <label className="relative block md:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none focus:border-zinc-400 focus:bg-white"
              placeholder="Search saved prompts"
            />
          </label>
        </section>

        <div className="columns-1 gap-3 sm:columns-2 lg:columns-4 xl:columns-5">
          {savedPrompts.map((prompt) => (
            <PromptCard canInteract key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </main>
    </>
  );
}
