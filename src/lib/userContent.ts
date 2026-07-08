import { prompts } from "./prompts";

export const savedPrompts = prompts.slice(0, 6);
export const likedPrompts = prompts.slice(4, 10);

export const userCollections = [
  {
    slug: "launch-visuals",
    name: "Launch visuals",
    description: "SaaS, product, and brand prompts for launch week.",
    isPublic: false,
    prompts: [prompts[3], prompts[8], prompts[10], prompts[0]],
  },
  {
    slug: "product-shots",
    name: "Product shots",
    description: "Premium ecommerce prompts for high-detail campaign images.",
    isPublic: true,
    prompts: [prompts[0], prompts[6], prompts[11], prompts[4]],
  },
  {
    slug: "fashion-ideas",
    name: "Fashion ideas",
    description: "Editorial, lookbook, and campaign prompts for fashion concepts.",
    isPublic: false,
    prompts: [prompts[1], prompts[7], prompts[9], prompts[5]],
  },
  {
    slug: "hospitality-scenes",
    name: "Hospitality scenes",
    description: "Hotel, food, and interior prompts for service brands.",
    isPublic: true,
    prompts: [prompts[2], prompts[4], prompts[9], prompts[5]],
  },
];

export function getCollectionBySlug(slug: string) {
  return userCollections.find((collection) => collection.slug === slug);
}
