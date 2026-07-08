"use client";

import { ImagePlus, Send } from "lucide-react";
import { FormEvent, useState } from "react";

export function CreatorPostForm() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
        setStatus("Internal draft saved locally. Connect this form to Supabase Storage and `prompts` next.");
  }

  return (
    <form className="grid gap-5 lg:grid-cols-[1fr_360px]" onSubmit={handleSubmit}>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-800" htmlFor="title">
            Prompt title
          </label>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-zinc-200 px-4 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
            id="title"
            placeholder="Luxury bottle hero shot"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-800" htmlFor="media">
            Image or video URL
          </label>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-zinc-200 px-4 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
            id="media"
            placeholder="Supabase Storage URL"
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {["Subject", "Style", "Composition", "Lighting"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-zinc-800" htmlFor={field}>
                {field}
              </label>
              <textarea
                className="mt-2 min-h-28 w-full rounded-lg border border-zinc-200 p-4 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
                id={field}
                required
              />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-800" htmlFor="negative">
            Negative prompt
          </label>
          <textarea
            className="mt-2 min-h-28 w-full rounded-lg border border-zinc-200 p-4 outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
            id="negative"
            placeholder="No warped text, no extra limbs, no fake logos..."
          />
        </div>
      </div>

      <aside className="space-y-4">
        <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5">
          <div className="flex h-56 items-center justify-center rounded-lg bg-white text-center text-zinc-500">
            <div>
              <ImagePlus className="mx-auto h-8 w-8" />
              <p className="mt-2 text-sm">Media preview</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4">
          <label className="block text-sm font-medium text-zinc-800" htmlFor="visibility">
            Visibility
          </label>
          <select
            className="mt-2 h-11 w-full rounded-full border border-zinc-200 px-4 text-sm outline-none focus:border-red-300 focus:ring-4 focus:ring-red-100"
            id="visibility"
          >
            <option>Free preview</option>
            <option>Member only</option>
          </select>
          <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-zinc-950 text-sm font-semibold text-white hover:bg-zinc-800">
            <Send className="h-4 w-4" />
            Publish prompt
          </button>
          {status ? <p className="mt-3 text-sm leading-6 text-zinc-700">{status}</p> : null}
        </div>
      </aside>
    </form>
  );
}
