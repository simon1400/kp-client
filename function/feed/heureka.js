const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP>\n`
  const dataTransform = data.reduce((result, item) => {

   return result + `\n<SHOPITEM>
     <ITEM_ID>${item.id}</ITEM_ID>
     <PRODUCTNAME>${item.brand} | ${item.title}</PRODUCTNAME>
     <PRODUCT>${item.brand} | ${item.title}</PRODUCT>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE_VAT>${item.price}</PRICE_VAT>
     <DELIVERY_DATE>${item.stock > 0 ? '0' : '14'}</DELIVERY_DATE>
     <CATEGORY>
        <CATEGORY_NAME>${item.category}</CATEGORY_NAME>
     </CATEGORY>
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
