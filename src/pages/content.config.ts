// src/content.config.ts
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const foodsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/foods" }),
  
  schema: z.object({
    name: z.string(),
    // NEW: Define your categories here
    category: z.enum([
        'Fruits', 
        'Vegetables', 
        'Meats', 
        'Dairy', 
        'Pantry', 
        'Household', 
        'Plants', 
        'Other'
    ]),
    status: z.enum(['Safe', 'Caution', 'Toxic', 'Emergency']),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'foods': foodsCollection,
};