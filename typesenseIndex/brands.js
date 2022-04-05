require("dotenv").config();
const client = require('./config')
const axios = require('axios')
const nameCollection = 'brands'
const APP_API = process.env.APP_API

const schema = require(`./schemas/${nameCollection}`)
// const query = require(`./queries/${nameCollection}`)

module.exports = (async () => {

  const res = await axios.get(`${APP_API}/${nameCollection}?_limit=800`).catch(err => console.log(err.response))
  const data = res.data

  try {
    const collection = await client.collections(nameCollection).retrieve();
    console.log("Found existing collection of "+nameCollection);
    console.log(JSON.stringify(collection, null, 2));

    // if (collection.num_documents !== data.length) {
    //   console.log("Collection has different number of documents than data");
    //   console.log(`Deleting collection ${nameCollection}...`);
    //   await client.collections(nameCollection).delete();
    // }
    await client.collections(nameCollection).delete();
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await client.collections().create(schema);

  console.log("Populating collection...");

  const transformData = []

  data.forEach(async (item, index) => {

    transformData[index] = {
      title: item.title,
      slug: item.slug
    };

  });

  try {
    const returnData = await client
      .collections(nameCollection)
      .documents()
      .import(transformData);

    console.log(`Return data ${nameCollection}: `, returnData);
  } catch (err) {
    console.error(err);
  }
})();