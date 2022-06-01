module.exports = {
  name: "produkties",
  num_documents: 0,
  fields: [
    {
      name: "title",
      type: "string",
      facet: false,
    },
    {
      name: "slug",
      type: "string",
      facet: false,
    },
    {
      name: "image",
      type: "string",
      facet: false,
      optional: true,
    },
    {
      name: "code",
      type: "string",
      facet: false,
    },
    {
      name: "price",
      type: "int32",
      facet: true,
    },
    {
      name: "brand",
      type: "string",
      facet: true
    },
    {
      name: "brandsSlug",
      type: "string",
      facet: true
    },
    {
      name: "category",
      type: "string[]",
      facet: true
    },
    {
      name: "categorySlug",
      type: "string[]",
      facet: false,
    },
    {
      name: "values",
      type: "string[]",
      facet: true,
    },
    
  ]
}