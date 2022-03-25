import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.Products
    let resStrapi;

    const length = products.length
    
    var img = '';

    for(var i = 0; i < length; i++) {
      resStrapi = await AxiosSTRAPI.get(`/produkties?code=${products[i].sku}&_publicationState=preview`)
      if(resStrapi.data.length) {
        img = products[i]['image_name'].split('/')
        img = img[img.length - 1]
        AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, {
          title: products[i]['name(cs-cz)'],
          content: products[i]['description(cs-cz)'],
          product_id: `${products[i]['product_id']}`,
          relatedIds: products[i]['related_ids'] !== null ? `${products[i]['related_ids']}` : '',
          imageName: img,
          meta: {
            title: products[i]['meta_title(cs-cz)'],
            description: products[i]['meta_description(cs-cz)']
          }
        }).then(() => console.log('UPDATE! --', i))
          .catch(err => {
            if(err.response.data) {
              console.log(err.response.data.data);
            }else{
              console.log(err.response);
            }
            console.log('Not update! --', products[i]);
          })
      }else{
        console.log(i, '/', length)
      }
    }

    console.log('DONE!!!');

    res.status(200).send("Import json!");

  }else{
    res.status(200).send(req.method);
  }
}
