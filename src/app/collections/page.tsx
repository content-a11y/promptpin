import { AppHeader } from "@/components/AppHeader";
import { userCollections } from "@/lib/userContent";
import { FolderPlus, Globe2, LockKeyhole, Search, Share2 } from "lucide-react";
import Link from "next/link";

export default function CollectionsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[1500px] px-4 pb-16 pt-6 sm:px-6">
        <section className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">Collections</h1>
            <p className="mt-2 text-sm text-zinc-500">
              Organize prompts into boards you can revisit, share, or keep private.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
            href="/collections/new"
          >
            <FolderPlus className="h-4 w-4" />
            New collection
          </Link>
        </section>

        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 text-sm outline-none focus:border-zinc-400 focus:bg-white"
              placeholder="Search collections"
            />
          </label>
          <select className="h-12 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-medium outline-none focus:border-zinc-400">
            <option>All collections</option>
            <option>Private</option>
            <option>Public</option>
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {userCollections.map((collection) => (
            <Link
              className="group overflow-hidden rounded-[28px] border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-zinc-950/5"
              href={`/collections/${collection.slug}`}
              key={collection.slug}
            >
              <div className="grid grid-cols-2 gap-1 p-2">
                {collection.prompts.map((prompt, index) => (
                  <img
                    alt={prompt.title}
                    className={`w-full object-cover ${
                      index === 0 ? "h-56 rounded-l-3xl" : "h-[110px] rounded-2xl"
                    }`}
                    key={prompt.id}
                    src={prompt.imageUrl}
                  />
                ))}
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold tracking-tight text-zinc-950">
                      {collection.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-zinc-500">
                      {collection.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-100 p-2 text-zinc-700">
                    {collection.isPublic ? (
                      <Globe2 className="h-4 w-4" />
                    ) : (
                      <LockKeyhole className="h-4 w-4" />
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>{collection.prompts.length} prompts</span>
                  <span className="inline-flex items-center gap-1 font-medium text-zinc-700">
                    <Share2 className="h-4 w-4" />
                    Share
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
