// src/pages/search.json.ts
import { getCollection } from 'astro:content';

export async function GET({}) {
  // 1. Get the data
  const foods = await getCollection('foods');
  
  // DEBUG: Print what we found to the Command Line / Terminal
  console.log("------------------------------------------------");
  console.log(`I found ${foods.length} items in the 'foods' collection.`);
  console.log("------------------------------------------------");

  // 2. Transform the data
  const searchIndex = foods.map(item => ({
    name: item.data.name,
    slug: item.id, // Note: With the Astro 5 glob loader, use 'id' for the URL slug
    status: item.data.status,
    description: item.data.description,
    keywords: item.data.keywords || [],
    category: item.data.category // <--- NEW: Add this field
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}