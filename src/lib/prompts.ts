export type PromptAsset = {
  id: string;
  slug: string;
  title: string;
  description: string;
  structuredPrompt: {
    subject: string;
    style: string;
    composition: string;
    lighting: string;
    details: string;
    negative: string;
  };
  mediaType: "image" | "video";
  imageUrl: string;
  height: number;
  creator: {
    name: string;
    handle: string;
    role: "Creator" | "Studio";
    avatar: string;
  };
  model: string;
  category: string;
  tags: string[];
  likes: number;
  saves: number;
  visibility: "free" | "member";
};

export const FREE_PROMPT_LIMIT = 10;

export const prompts: PromptAsset[] = [
  {
    id: "p-001",
    slug: "cinematic-product-watch",
    title: "Cinematic Watch Product Shot",
    description: "A precise luxury watch setup for ecommerce hero images.",
    structuredPrompt: {
      subject: "A brushed steel chronograph watch on a matte black stone plinth",
      style: "premium product photography, crisp commercial finish",
      composition: "three-quarter angle, centered product, shallow depth of field",
      lighting: "large softbox reflection, fine rim light, controlled highlights",
      details: "visible crown texture, polished bezel, tiny water droplets, clean background",
      negative: "no hands, no logo distortion, no extra straps, no text, no blur",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    height: 420,
    creator: {
      name: "Maya Chen",
      handle: "@maya.prompts",
      role: "Creator",
      avatar: "MC",
    },
    model: "Midjourney v7",
    category: "Product",
    tags: ["product", "luxury", "watch", "commercial"],
    likes: 1842,
    saves: 614,
    visibility: "free",
  },
  {
    id: "p-002",
    slug: "editorial-fashion-red",
    title: "Editorial Red Fashion Portrait",
    description: "High-impact portrait prompt for lookbooks and social covers.",
    structuredPrompt: {
      subject: "A model in a structured red coat against a clean studio wall",
      style: "editorial fashion campaign, refined magazine styling",
      composition: "vertical portrait crop, confident pose, negative space above",
      lighting: "single key light with soft falloff and subtle shadow edge",
      details: "tailored fabric folds, natural skin texture, modern styling",
      negative: "no plastic skin, no warped hands, no brand marks, no heavy makeup smears",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    height: 560,
    creator: {
      name: "Niko Reyes",
      handle: "@nikoreyes",
      role: "Studio",
      avatar: "NR",
    },
    model: "Flux Pro",
    category: "Fashion",
    tags: ["portrait", "fashion", "editorial", "campaign"],
    likes: 2319,
    saves: 880,
    visibility: "free",
  },
  {
    id: "p-003",
    slug: "minimal-home-interior",
    title: "Minimal Living Room Interior",
    description: "A clean interior concept prompt for home brands and architects.",
    structuredPrompt: {
      subject: "A sunlit modern living room with low sofa, walnut table, and framed art",
      style: "minimal architectural interior, warm natural realism",
      composition: "wide angle from seated eye level, balanced furniture layout",
      lighting: "late morning window light, soft floor shadows, gentle highlights",
      details: "linen texture, ceramic vase, quiet wall art, realistic scale",
      negative: "no clutter, no fisheye distortion, no impossible furniture, no overexposure",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    height: 390,
    creator: {
      name: "Ari Malik",
      handle: "@arirooms",
      role: "Creator",
      avatar: "AM",
    },
    model: "DALL-E",
    category: "Interior",
    tags: ["interior", "home", "architecture", "sunlight"],
    likes: 1290,
    saves: 402,
    visibility: "free",
  },
  {
    id: "p-004",
    slug: "saas-dashboard-mockup",
    title: "SaaS Dashboard Promo",
    description: "Prompt recipe for polished app screenshots and launch graphics.",
    structuredPrompt: {
      subject: "A modern analytics dashboard on a slim laptop with floating metrics",
      style: "clean SaaS launch visual, sharp UI product photography",
      composition: "desktop screen angled slightly left, metrics layered around device",
      lighting: "bright studio light, subtle screen glow, neutral background",
      details: "clear chart blocks, readable layout shapes, crisp keyboard edges",
      negative: "no real company logos, no unreadable tiny text, no broken UI, no glare",
    },
    mediaType: "video",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=85",
    height: 480,
    creator: {
      name: "Priya S.",
      handle: "@priyaui",
      role: "Creator",
      avatar: "PS",
    },
    model: "Runway Gen-4",
    category: "SaaS",
    tags: ["saas", "dashboard", "launch", "video"],
    likes: 940,
    saves: 271,
    visibility: "free",
  },
  {
    id: "p-005",
    slug: "restaurant-menu-hero",
    title: "Restaurant Menu Hero",
    description: "A ready-to-use food hero prompt for websites and paid ads.",
    structuredPrompt: {
      subject: "A plated handmade pasta dish with basil, parmesan, and tomato gloss",
      style: "premium restaurant photography, appetizing natural texture",
      composition: "close three-quarter crop, plate edge visible, ingredients arranged naturally",
      lighting: "soft directional window light, gentle highlights on sauce",
      details: "steam trace, parmesan flakes, ceramic plate texture, dark tabletop",
      negative: "no messy sauce, no plastic food, no extra utensils, no text",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85",
    height: 520,
    creator: {
      name: "Sam Ito",
      handle: "@samplates",
      role: "Studio",
      avatar: "SI",
    },
    model: "Midjourney v7",
    category: "Food",
    tags: ["food", "restaurant", "menu", "hero"],
    likes: 1775,
    saves: 530,
    visibility: "free",
  },
  {
    id: "p-006",
    slug: "architecture-concept-facade",
    title: "Modern Facade Study",
    description: "Architecture prompt for clean exterior concepts.",
    structuredPrompt: {
      subject: "A narrow modern townhouse facade with glass, concrete, and planted balcony",
      style: "architectural visualization, realistic materials, calm urban setting",
      composition: "street-level vertical frame, full facade visible, slight perspective",
      lighting: "overcast daylight, even material detail, soft reflections",
      details: "concrete grain, window mullions, balcony plants, realistic sidewalk",
      negative: "no impossible structure, no warped windows, no fake signage, no people",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
    height: 610,
    creator: {
      name: "Ari Malik",
      handle: "@arirooms",
      role: "Creator",
      avatar: "AM",
    },
    model: "Stable Diffusion XL",
    category: "Architecture",
    tags: ["architecture", "exterior", "facade", "urban"],
    likes: 811,
    saves: 243,
    visibility: "free",
  },
  {
    id: "p-007",
    slug: "beauty-serum-macro",
    title: "Beauty Serum Macro",
    description: "Macro product prompt for skincare brands.",
    structuredPrompt: {
      subject: "A clear glass serum bottle with pearlescent liquid on a wet acrylic surface",
      style: "beauty campaign macro photography, glossy and tactile",
      composition: "tight vertical crop, bottle label area blank, droplet foreground",
      lighting: "soft diffused light with bright specular highlights",
      details: "transparent glass, pipette reflection, clean label panel, micro droplets",
      negative: "no fake text, no distorted bottle, no extra caps, no harsh shadow",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    height: 460,
    creator: {
      name: "Maya Chen",
      handle: "@maya.prompts",
      role: "Creator",
      avatar: "MC",
    },
    model: "Flux Pro",
    category: "Beauty",
    tags: ["beauty", "skincare", "macro", "product"],
    likes: 1512,
    saves: 488,
    visibility: "free",
  },
  {
    id: "p-008",
    slug: "mobile-app-lifestyle",
    title: "Mobile App Lifestyle Shot",
    description: "Prompt structure for mobile app ads with realistic use context.",
    structuredPrompt: {
      subject: "A hand holding a phone with a clean wellness app interface in a bright kitchen",
      style: "natural lifestyle tech advertisement",
      composition: "phone foreground in focus, home scene softly blurred behind",
      lighting: "morning daylight, warm white highlights, realistic screen brightness",
      details: "simple app cards, readable hierarchy, natural hand pose, tidy countertop",
      negative: "no brand logos, no broken fingers, no tiny unreadable copy, no harsh glare",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=900&q=85",
    height: 430,
    creator: {
      name: "Priya S.",
      handle: "@priyaui",
      role: "Creator",
      avatar: "PS",
    },
    model: "DALL-E",
    category: "Mobile",
    tags: ["mobile", "lifestyle", "app", "wellness"],
    likes: 663,
    saves: 190,
    visibility: "free",
  },
  {
    id: "p-009",
    slug: "workspace-brand-scene",
    title: "Founder Workspace Scene",
    description: "A polished workspace scene for personal brands and landing pages.",
    structuredPrompt: {
      subject: "A founder desk setup with notebook, laptop, coffee, and brand mood board",
      style: "documentary startup lifestyle, premium but approachable",
      composition: "overhead desk crop, objects arranged with natural spacing",
      lighting: "soft side window light, gentle desk shadows",
      details: "paper texture, laptop edge, pen marks, subtle color swatches",
      negative: "no visible brand names, no messy cables, no warped laptop, no text artifacts",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    height: 500,
    creator: {
      name: "Niko Reyes",
      handle: "@nikoreyes",
      role: "Studio",
      avatar: "NR",
    },
    model: "Midjourney v7",
    category: "Brand",
    tags: ["workspace", "brand", "founder", "landing"],
    likes: 1204,
    saves: 362,
    visibility: "free",
  },
  {
    id: "p-010",
    slug: "travel-hotel-suite",
    title: "Boutique Hotel Suite",
    description: "Hospitality prompt for booking pages and travel ads.",
    structuredPrompt: {
      subject: "A boutique hotel suite with crisp bedding, open curtains, and city view",
      style: "luxury hospitality photography, inviting and realistic",
      composition: "wide room view from doorway, bed as anchor, window visible",
      lighting: "golden hour natural light, soft room lamps, clean highlights",
      details: "linen wrinkles, bedside objects, polished floor, realistic reflections",
      negative: "no people, no clutter, no distorted bed, no fake text, no over-saturation",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    height: 380,
    creator: {
      name: "Sam Ito",
      handle: "@samplates",
      role: "Studio",
      avatar: "SI",
    },
    model: "Stable Diffusion XL",
    category: "Travel",
    tags: ["hotel", "travel", "hospitality", "interior"],
    likes: 999,
    saves: 310,
    visibility: "free",
  },
  {
    id: "p-011",
    slug: "motion-logo-reveal",
    title: "Motion Logo Reveal",
    description: "Member prompt for a short animated brand reveal.",
    structuredPrompt: {
      subject: "A minimal symbol mark emerging from folded paper layers",
      style: "premium motion identity, clean brand reveal",
      composition: "centered logo space, paper layers moving outward, final hold frame",
      lighting: "soft studio light, slight shadow depth, smooth highlights",
      details: "blank logo placeholder, subtle paper fibers, elegant pacing",
      negative: "no real logos, no jitter, no noisy particles, no unreadable text",
    },
    mediaType: "video",
    imageUrl:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=85",
    height: 540,
    creator: {
      name: "Priya S.",
      handle: "@priyaui",
      role: "Creator",
      avatar: "PS",
    },
    model: "Runway Gen-4",
    category: "Motion",
    tags: ["motion", "logo", "brand", "video"],
    likes: 2088,
    saves: 742,
    visibility: "member",
  },
  {
    id: "p-012",
    slug: "jewelry-still-life",
    title: "Jewelry Still Life",
    description: "Member prompt for fine jewelry campaigns.",
    structuredPrompt: {
      subject: "A gold ring and thin chain arranged on polished marble with silk shadow",
      style: "fine jewelry still life, elegant commercial photography",
      composition: "macro diagonal layout, ring in focus, chain leading line",
      lighting: "controlled sparkle highlights, soft shadow, warm reflector",
      details: "metal edge clarity, stone refraction, marble veins, silk texture",
      negative: "no fake gemstones, no distorted ring, no dust, no text, no harsh glare",
    },
    mediaType: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85",
    height: 470,
    creator: {
      name: "Maya Chen",
      handle: "@maya.prompts",
      role: "Creator",
      avatar: "MC",
    },
    model: "Flux Pro",
    category: "Jewelry",
    tags: ["jewelry", "macro", "luxury", "product"],
    likes: 1733,
    saves: 585,
    visibility: "member",
  },
];

export function getPromptBySlug(slug: string) {
  return prompts.find((prompt) => prompt.slug === slug);
}

export function getRelatedPrompts(prompt: PromptAsset, limit = 4) {
  return prompts
    .filter((candidate) => candidate.id !== prompt.id)
    .map((candidate) => {
      const matchingTags = candidate.tags.filter((tag) => prompt.tags.includes(tag)).length;
      const categoryMatch = candidate.category === prompt.category ? 2 : 0;

      return {
        prompt: candidate,
        score: matchingTags + categoryMatch,
      };
    })
    .sort((a, b) => b.score - a.score || b.prompt.likes - a.prompt.likes)
    .slice(0, limit)
    .map(({ prompt: relatedPrompt }) => relatedPrompt);
}
