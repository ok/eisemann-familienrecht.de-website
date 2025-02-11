import { createClient } from "contentful";
import { writeFile } from "fs/promises";
import 'dotenv/config'; // Load environment variables from .env

console.log("SPACE_ID:", process.env.CTFL_SPACE);
console.log("ACCESS_TOKEN:", process.env.CTFL_ACCESSTOKEN ? "✅ Loaded" : "❌ Missing");

const client = createClient({
  space: process.env.CTFL_SPACE,
  accessToken: process.env.CTFL_ACCESSTOKEN,
});

function getSlug(title) {
  return title
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, ""); // Remove special characters
}

function getVideoId(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

// Fetch and store collection data from Contentful
async function fetchContent(contentType) {
  try {
    const entries = await client.withAllLocales.getEntries({ 
      content_type: contentType
    });

    return entries.items;
  } catch (error) {
    console.error(`❌ Error fetching Contentful data of type ${contentType}:`, error);
  }
};

// Fetch and store collection data from Contentful
async function storeContent(content, contentType) {
  try {
    const filePath = `./src/_data/${contentType}.json`;
    await writeFile(filePath, JSON.stringify(content, null, 2));
    console.log(`✅ Content stored to ${filePath}`);
    // console.log("content: " + JSON.stringify(entries.items));

    return content;
  } catch (error) {
    console.error(`❌ Error writing Contentful data of type ${contentType}:`, error);
  }
};

// Post processing for all collections
function processPages(pages) {
  console.log(`✅ Processing all page content!`);
  const filteredPages = pages.map(function(page) {
    // console.log(page);
    let filteredPage= {
      title: page.fields.title,
      slug: page.fields.slug,
      content: []
    };
    page.fields.contentBlocks?.["en-US"]?.forEach((entry) => {
      // console.log("field: " + JSON.stringify(entry.fields));
      filteredPage.content.push({
        title: entry.fields.title,
        type: entry.sys.contentType.sys.id,
        text: entry.fields.text,
        image: entry.fields.image?.["en-US"]?.fields.file?.["en-US"]?.url
      });
    });
    return filteredPage;
  });
  return filteredPages;
};

async function main() {
  const pages = await fetchContent("webpage");
  await storeContent(pages, "cf-webpage");
  const filteredPages = processPages(pages);
  // console.log("web pages: " + JSON.strigify(filteredPages));
  await storeContent(filteredPages, "webpages");
  
  const contact = await fetchContent("contactBlock");
  await storeContent(contact, "contactBlock");
  console.log("contactBlock: " + contact)
}

main();