import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import FormData from 'form-data'
import slugify from 'slugify'
import axios from 'axios';
import {loadImage} from 'canvas'
import { Blob } from 'buffer';

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.Products
    let resStrapi;

    const length = products.length

    for(var i = 10; i < 13; i++) {
      resStrapi = await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`)
      if(resStrapi.data.length && resStrapi.data[0].imageName?.length) {
        
        const file = fs.readFileSync('data/catalog/'+resStrapi.data[0].imageName)

        let base = file.toString('base64')

        let dataSend = {
          files: base,
          ref: 'produkties',
          refId: `${resStrapi.data[0].id}`,
          field: 'images'
        }

        // console.log(dataSend)

        let formData = new FormData()
        formData.append('file', dataSend.files)
        formData.append('ref', dataSend.ref)
        formData.append('refId', dataSend.refId)
        formData.append('field', dataSend.field)
        AxiosSTRAPI.post('/upload', formData).then(res => console.log(res.data))
          .catch(err => console.log('Not uploud --', err.response.data))

      }else{
        console.log(i, '/', length)
      }
    }

    res.status(200).send('All finished!');

  }else{
    res.status(200).send(req.method);
  }
}
