import toXmlHeureka from '../../../function/feed/heureka'
import axios from 'axios'
import qs from 'qs'
import fs from 'fs'
import {convert} from 'html-to-text'

const query = qs.stringify({
  populate: '*',
  pagination: {
    page: 1,
    pageSize: 1000,
  },
}, {
  encodeValuesOnly: true
});

const toPlainText = (content) => {
  return convert(content, {
    wordwrap: 130
  });
}

const replaceSymbol = (string) => {
  if(string?.length) {
    return string.replace(/&/g, '&amp;')
  }
  return ''
}

export default async function handler (req, res) {
  if(req.method === 'POST') {
    console.log('POST /GENERATE FEEDS');

    try{
      
      const productsRes = await axios.get(`${process.env.APP_API}/api/produkties?${query}`)
      const products = productsRes.data.data.map(item => ({id: item.id, ...item.attributes}))

      console.log(products.length)
      
      let productsData = [];
  
      for(var i = 0; i < products.length; i++) {
        var productVariants = [], dataObj = {};
        if(products[i].Variants && products[i].Variants?.length){
          for(var a = 0; a < products[i].Variants?.length; a++){
            dataObj = {
              id: products[i].Variants[a].code,
              parentId: products[i].code,
              parentTitle: replaceSymbol(products[i].title),
              title: replaceSymbol(products[i].title) + ' | ' + replaceSymbol(products[i].Variants[a].nazev),
              description: replaceSymbol(toPlainText(products[i].content)),
              link: 'https://kralovska-pece.cz/p/' + products[i].slug + '?variant=' + products[i].Variants[a].nazev.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
              image_link: process.env.APP_API+products[i].images?.data?.[0].attributes.url,
              stock: products[i].Variants[a].stock,
              price: products[i].Variants[a].price,
              ean: products[i].Variants[a]?.ean || '',
              category: replaceSymbol(products[i]?.category?.data?.[0]?.attributes?.title) || '',
              brand: replaceSymbol(products[i].brand?.data?.attributes?.title) || ''
            }
            productVariants.push(dataObj)
          }
        }else if(+products[i].price > 0 && (!products[i].Variants || !products[i].Variants?.length)){
          dataObj = {
            id: products[i].code,
            title: replaceSymbol(products[i].title),
            description: replaceSymbol(toPlainText(products[i].content)),
            link: 'https://kralovksa-pece.cz/p/' + products[i].slug,
            image_link: process.env.APP_API+products[i]?.images?.data?.[0]?.attributes?.url,
            stock: products[i].stock,
            price: products[i].price,
            ean: products[i]?.ean || '',
            category: replaceSymbol(products[i].category?.data?.[0]?.attributes?.title) || '',
            brand: replaceSymbol(products[i].brand?.data?.attributes?.title) || ''
          }
          productsData.push(dataObj);
        }
        productsData.push(...productVariants)
      }
  
      const xmlHeureka = toXmlHeureka(productsData)
  
      var pathHeureka = './public/heureka-feed.xml'

      fs.writeFile(pathHeureka, xmlHeureka, (err) => {
        if (err) return console.log(err);
        console.log(`Xml write in --> ${pathHeureka}`);
      });

      res.send('Good')
      
    }catch(err) {
      console.error('ERRORRR --- ', err)
      res.status(err.code).json(err.response?.body);
    }
  }
}