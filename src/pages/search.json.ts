// src/pages/search.json.ts
import { getCollection } from 'astro:content';

export async function GET({}) {
  const foods = await getCollection('foods');

  // DEBUG: Print what we found to the Command Line / Terminal
  console.log("------------------------------------------------");
  console.log(`I found ${foods.length} items in the 'foods' collection.`);
  console.log("------------------------------------------------");
  
  const searchIndex = foods.map(item => ({
    name: item.data.name,
    // FIX: Remove '.md' from the end of the ID
    slug: item.id.replace(/\.md$/, ''), 
    status: item.data.status,
    description: item.data.description,
    keywords: item.data.keywords || [],
    category: item.data.category
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
