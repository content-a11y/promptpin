import { AppHeader } from "@/components/AppHeader";
import { prompts } from "@/lib/prompts";
import { Folder, Share2 } from "lucide-react";
import Link from "next/link";

const collections = [
  {
    name: "Launch inspiration",
    description: "SaaS, product, and brand prompts for launch week.",
    promptSlugs: ["saas-dashboard-mockup", "workspace-brand-scene", "motion-logo-reveal"],
  },
  {
    name: "Luxury product shots",
    description: "Premium ecommerce prompts for high-detail campaign images.",
    promptSlugs: ["cinematic-product-watch", "beauty-serum-macro", "jewelry-still-life"],
  },
  {
    name: "Hospitality ideas",
    description: "Visual recipes for interiors, restaurants, and hotel booking pages.",
    promptSlugs: ["minimal-home-interior", "restaurant-menu-hero", "travel-hotel-suite"],
  },
];

export default function CollectionsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Saved boards
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
              Named prompt collections.
            </h1>
          </div>
          <button className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800">
            <Folder className="h-4 w-4" />
            New collection
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {collections.map((collection) => {
            const collectionPrompts = collection.promptSlugs
              .map((slug) => prompts.find((prompt) => prompt.slug === slug))
              .filter(Boolean);

            return (
              <article
                className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
                key={collection.name}
              >
                <div className="grid grid-cols-3">
                  {collectionPrompts.map((prompt) => (
                    <img
                      alt={prompt?.title}
                      className="h-36 w-full object-cover"
                      key={prompt?.slug}
                      src={prompt?.imageUrl}
                    />
                  ))}
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <h2 className="font-semibold text-zinc-950">{collection.name}</h2>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{collection.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">
                      {collectionPrompts.length} prompts
                    </span>
                    <Link
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-100"
                      href="/login"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </>
  );
}
