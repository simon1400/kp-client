import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import FormData from 'form-data'
import slugify from 'slugify'
import axios from 'axios';
import { Blob } from 'buffer';

function DataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i)

  return new Blob([ia], { type: mimeString })
}

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.Products
    let resStrapi;

    const length = products.length

    

    for(var i = 0; i < 20; i++) {
      resStrapi = await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`)
      if(resStrapi.data.length && resStrapi.data[0].imageName?.length) {
        
        
        const file = fs.readFileSync('public/catalog/'+resStrapi.data[0].imageName)
        // let name = resStrapi.data[0].imageName.split('.')
        const base64 = file.toString('base64')
        const fileBlob = DataURIToBlob(base64)
        console.log(fileBlob);
        // let blobFile = new Blob([file], {type: name[name.length - 1]})
        // let formData = new FormData()
        // formData.append('files', blobFile)
        // formData.append('ref', 'produkties')
        // formData.append('refId', resStrapi.data[0].id)
        // formData.append('field', 'images')
        // console.log(formData);
        // AxiosSTRAPI.post('/upload', formData).then(res => console.log(res.data))
        //     .catch(err => console.log('Not uploud --', err.response.data.data.errors))

      }else{
        console.log(i, '/', length)
      }
    }

    res.status(200).send('All finished!');

  }else{
    res.status(200).send(req.method);
  }
}
