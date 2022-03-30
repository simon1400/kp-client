import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));
    const products = dataOC.Products
    const length = products.length

    var i = 0;
    while(i < length) {
      await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`).then(resStrapi => {
        if(resStrapi.data.length) {
          AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, {
            published_at: new Date()
          }).then(() => {
            console.log('UPDATE! --', i, resStrapi.data[0].title)
            i++
          }).catch(err => {
            if(err.response?.data) {
              console.log('Error update prod --', err.response.data);
            }else{
              console.log('Error update prod --', err.response);
            }
            console.log('Not update product! --', products[i]);
            i++
          })
        }else{
          console.log(i, '/', length);
          i++
        }
      }).catch(err => {
        console.log('Error find product first --', products[i].title, err.response);
        i++
      })
    }


    console.log('DONE!!!');

    res.status(200).send("Import json!");

  }else{
    res.status(200).send(req.method);
  }
}
