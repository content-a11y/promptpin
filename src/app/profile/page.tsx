import { AppHeader } from "@/components/AppHeader";
import { ProfileIdentity } from "@/components/ProfileIdentity";
import { ProfileActions } from "@/components/ProfileActions";
import { PromptCard } from "@/components/PromptCard";
import { likedPrompts, userCollections } from "@/lib/userContent";
import { Grid3X3, Heart, Pin, Share2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-6 sm:px-6">
        <section className="rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <ProfileIdentity />
            <ProfileActions />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            {[
              { label: "Liked", value: likedPrompts.length.toString(), Icon: Heart, href: "/liked" },
              {
                label: "Collections",
                value: userCollections.length.toString(),
                Icon: Grid3X3,
                href: "/collections",
              },
              { label: "Pinned", value: "9", Icon: Pin, href: "/collections" },
              { label: "Shared", value: "13", Icon: Share2, href: "/profile" },
            ].map(({ label, value, Icon, href }) => (
              <Link
                className="rounded-2xl bg-zinc-50 p-4 transition hover:bg-zinc-100"
                href={href}
                key={label}
              >
                <Icon className="h-5 w-5 text-zinc-500" />
                <p className="mt-3 text-2xl font-semibold text-zinc-950">{value}</p>
                <p className="text-sm text-zinc-500">{label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950">Collections</h2>
              <p className="text-sm text-zinc-500">Prompt boards you saved for later.</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {userCollections.slice(0, 3).map((collection) => (
              <Link
                className="block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-zinc-950/5"
                href={`/collections/${collection.slug}`}
                key={collection.name}
              >
                <div className="grid grid-cols-3 gap-1 p-2">
                  {collection.prompts.map((prompt) => (
                    <img
                      alt={prompt.title}
                      className="h-32 w-full rounded-2xl object-cover"
                      key={prompt.id}
                      src={prompt.imageUrl}
                    />
                  ))}
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h3 className="font-semibold text-zinc-950">{collection.name}</h3>
                  <p className="mt-1 text-sm text-zinc-500">{collection.prompts.length} prompts</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-950">Liked prompts</h2>
            <div className="columns-1 gap-3 sm:columns-2">
              {likedPrompts.map((prompt) => (
                <PromptCard canInteract key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-zinc-950">Collections</h2>
            <div className="columns-1 gap-3 sm:columns-2">
              {userCollections.flatMap((collection) =>
                collection.prompts.slice(0, 1).map((prompt) => (
                  <PromptCard canInteract key={`${collection.slug}-${prompt.id}`} prompt={prompt} />
                )),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
