create extension if not exists "pgcrypto";

create type public.profile_role as enum ('viewer', 'internal_poster', 'super_admin');
create type public.prompt_visibility as enum ('free', 'member');
create type public.media_type as enum ('image', 'video');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  handle text unique,
  role public.profile_role not null default 'viewer',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prompts (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  slug text not null unique,
  title text not null,
  description text not null,
  category text not null,
  model text not null,
  tags text[] not null default '{}',
  visibility public.prompt_visibility not null default 'free',
  subject text not null,
  style text not null,
  composition text not null,
  lighting text not null,
  details text not null,
  negative_prompt text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.prompt_media (
  id uuid primary key default gen_random_uuid(),
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  type public.media_type not null,
  storage_path text not null,
  alt_text text,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create table public.likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.collection_items (
  collection_id uuid not null references public.collections(id) on delete cascade,
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (collection_id, prompt_id)
);

alter table public.profiles enable row level security;
alter table public.prompts enable row level security;
alter table public.prompt_media enable row level security;
alter table public.likes enable row level security;
alter table public.collections enable row level security;
alter table public.collection_items enable row level security;

create policy "Profiles are viewable by signed in users"
on public.profiles for select
to authenticated
using (true);

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Published free prompts are public"
on public.prompts for select
to anon, authenticated
using (published_at is not null and visibility = 'free');

create policy "Signed in users can read all published prompts"
on public.prompts for select
to authenticated
using (published_at is not null);

create policy "Internal posters can insert prompts"
on public.prompts for insert
to authenticated
with check (
  auth.uid() = creator_id
  and exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role in ('internal_poster', 'super_admin')
  )
);

create policy "Internal posters can update own prompts"
on public.prompts for update
to authenticated
using (
  auth.uid() = creator_id
  or exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'super_admin'
  )
)
with check (
  auth.uid() = creator_id
  or exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'super_admin'
  )
);

create policy "Prompt media follows prompt visibility"
on public.prompt_media for select
to anon, authenticated
using (
  exists (
    select 1 from public.prompts
    where prompts.id = prompt_media.prompt_id
    and prompts.published_at is not null
    and (prompts.visibility = 'free' or auth.role() = 'authenticated')
  )
);

create policy "Internal posters can manage own prompt media"
on public.prompt_media for all
to authenticated
using (
  exists (
    select 1 from public.prompts
    where prompts.id = prompt_media.prompt_id
    and prompts.creator_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.prompts
    where prompts.id = prompt_media.prompt_id
    and prompts.creator_id = auth.uid()
  )
);

create policy "Users can manage own likes"
on public.likes for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can view own and public collections"
on public.collections for select
to authenticated
using (owner_id = auth.uid() or is_public);

create policy "Users can manage own collections"
on public.collections for all
to authenticated
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can view collection items they can access"
on public.collection_items for select
to authenticated
using (
  exists (
    select 1 from public.collections
    where collections.id = collection_items.collection_id
    and (collections.owner_id = auth.uid() or collections.is_public)
  )
);

create policy "Users can manage own collection items"
on public.collection_items for all
to authenticated
using (
  exists (
    select 1 from public.collections
    where collections.id = collection_items.collection_id
    and collections.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.collections
    where collections.id = collection_items.collection_id
    and collections.owner_id = auth.uid()
  )
);
