import { getTotalUrlCount, getAllSitemapUrls } from "../src/data/sitemapUrls";

async function run() {
  const count = await getTotalUrlCount();
  console.log("Total URL count:", count);
  
  const all = await getAllSitemapUrls();
  console.log("Breakdown:");
  Object.keys(all).forEach(key => {
    console.log(`- ${key}: ${(all as any)[key].length}`);
  });
}

run().catch(console.error);
