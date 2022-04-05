require("dotenv").config();
const Typesense = require("typesense");

const TYPESENSE_CONFIG = {
  nodes: [
    {
      host: process.env.TYPESENSE_HOST,
      port: process.env.TYPESENSE_PORT,
      protocol: process.env.TYPESENSE_PROTOCOL,
    },
  ],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
};

console.log("Config: ", TYPESENSE_CONFIG);

const client = new Typesense.Client(TYPESENSE_CONFIG);

module.exports = client