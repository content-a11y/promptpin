import { AppHeader } from "@/components/AppHeader";
import { PromptCard } from "@/components/PromptCard";
import { getCollectionBySlug, userCollections } from "@/lib/userContent";
import { ArrowLeft, Globe2, LockKeyhole, Share2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return userCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  return {
    title: collection ? `${collection.name} | PromptPin` : "Collection not found",
    description: collection?.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[1500px] px-4 pb-16 pt-6 sm:px-6">
        <Link
          className="mb-5 inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          href="/collections"
        >
          <ArrowLeft className="h-4 w-4" />
          Collections
        </Link>

        <section className="mb-8 rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700">
                {collection.isPublic ? <Globe2 className="h-4 w-4" /> : <LockKeyhole className="h-4 w-4" />}
                {collection.isPublic ? "Public" : "Private"}
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950">
                {collection.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                {collection.description}
              </p>
            </div>
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white hover:bg-zinc-800">
              <Share2 className="h-4 w-4" />
              Share collection
            </button>
          </div>
        </section>

        <div className="columns-1 gap-3 sm:columns-2 lg:columns-4 xl:columns-5">
          {collection.prompts.map((prompt) => (
            <PromptCard canInteract key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </main>
    </>
  );
}
