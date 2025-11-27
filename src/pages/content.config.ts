import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const foodsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/foods" }),
  
  schema: z.object({
    name: z.string(),
    category: z.array(z.enum([
        'Fruits', 
        'Vegetables', 
        'Meats', 
        'Dairy', 
        'Pantry', 
        'Household', 
        'Seafood',
        'Grains',
        'Nuts',
        'Beverages',
        'Herbs and Spices'
    ])),
    status: z.enum(['Safe', 'Caution', 'Toxic', 'Emergency']),
    description: z.string(),
    keywords: z.array(z.string()).optional(),
    image: z.string().optional(),
    source: z.string().optional(),
    sourceUrl: z.string().url().optional(),
  }),
});

export const collections = {
  'foods': foodsCollection,
};