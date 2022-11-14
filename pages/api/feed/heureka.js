import toXmlHeureka from '../../../function/feed/heureka'
import axios from 'axios'
import qs from 'qs'
import fs from 'fs'
import {convert} from 'html-to-text'

const query = qs.stringify({
  populate: '*',
  pagination: {
    page: 1,
    pageSize: 10,
  },
}, {
  encodeValuesOnly: true
});

const toPlainText = (content) => {
  return convert(content, {
    wordwrap: 130
  });
}

export default async function handler (req, res) {
  if(req.method === 'POST') {
    console.log('POST /GENERATE FEEDS');

    const data = req.body

    try{
      
      const productsRes = await axios.get(`${process.env.APP_API}/api/produkties?${query}`)
      const products = productsRes.data.data.map(item => ({id: item.id, ...item.attributes}))

      products.map(item => console.log(item.brand))
      
      let productsData = [];
  
      for(var i = 0; i < products.length; i++) {
        var productVariants = [], dataObj = {}, articleItem = {};
        if(products[i].Variants && products[i].Variants.length){
          for(var a = 0; a < products[i].variants.length; a++){
            articleItem = {}
            dataObj = {
              id: products[i].variants[a].id,
              parentId: products[i].id,
              parentTitle: products[i].title,
              title: products[i].title + ' | ' + products[i].Variants[a].nazev,
              description: toPlainText(products[i].content),
              link: 'https://kralovska-pece.cz/p/' + products[i].slug + '?variant=' + products[i].Variants[a].nazev.toLowerCase().split(' ').join('-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
              image_link: process.env.APP_API+products[i].images.data[0].attributes.url,
              stock: products[i].Variants[a].stock,
              price: products[i].Variants[a].price,
              category: products[i].category.data[0]?.attributes?.title || '',
              brand: products[i].brand.data?.attributes?.title || ''
            }
            productVariants.push(dataObj)
          }
        }else if(+products[i].price > 0 && (!products[i].Variants || !products[i].Variants.length)){
          dataObj = {
            id: products[i].id,
            title: products[i].title,
            description: toPlainText(products[i].content),
            link: 'https://kralovksa-pece.cz/p/' + products[i].slug,
            image_link: process.env.APP_API+products[i].images.data[0].attributes.url,
            stock: products[i].stock,
            price: products[i].price,
            category: products[i].category.data[0]?.attributes?.title || '',
            brand: products[i].brand.data?.attributes?.title || ''
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