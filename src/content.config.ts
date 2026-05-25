import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const foodsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/foods" }),

  schema: z.object({
    // --- Core fields (already required and working) ---
    name: z.string(),
    status: z.enum(['Safe', 'Caution', 'Toxic', 'Emergency']),
    description: z.string(),

    // --- Fields your layout already uses, now declared explicitly ---
    // Kept as loose string arrays to match your existing files exactly.
    // (Your data uses arrays for all four of these.)
    category: z.array(z.string()).optional(),
    shortAnswer: z.array(z.string()).optional(),
    source: z.array(z.string()).optional(),
    sourceUrl: z.array(z.string()).optional(),

    // --- Optional extras ---
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),

    // --- NEW: lets any page set a custom <title> tag for SEO/CTR ---
    // If omitted, the layout falls back to the existing default title.
    metaTitle: z.string().optional(),
  }),
});

export const collections = {
  'foods': foodsCollection,
};