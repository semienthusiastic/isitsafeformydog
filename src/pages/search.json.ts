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
    slug: item.slug,
    status: item.data.status,
    description: item.data.description,
    keywords: item.data.keywords || []
  }));

  return new Response(JSON.stringify(searchIndex), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}