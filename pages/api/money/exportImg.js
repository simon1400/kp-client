import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.AdditionalImages
    let resStrapi;

    const length = products.length

    let resImg = ''

    let productLen = 0, imgLen = 0;

    // SINGLE TOP IMAGE

    // for(var i = 0; i < length; i++) {
    //   resStrapi = await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`)
    //   if(resStrapi.data.length && resStrapi.data[0].imageName?.length) {
    //     productLen++
    //     resImg = await AxiosSTRAPI.get(encodeURI(`/upload/files?name=${resStrapi.data[0].imageName}`))
    //     if(resImg.data.length) {
    //       AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, {
    //         images: resImg.data[0].id
    //       }).then(res => {
    //         imgLen++
    //         console.log('Success update --', res.data.title)
    //       }).catch(err => {
    //         if(err.response?.data){
    //           console.log(err.response.data)
    //         }else{
    //           console.log(err.response)
    //         }
    //       })
    //     }else{
    //       console.log('Image in Strapi not found --', resStrapi.data[0].imageName)
    //     }
    //   }else{
    //     console.log(i, '/', length)
    //   }
    // }


    let imgName = '', data;
    // ADDITIONAL IMAGE

    for(var i = 0; i < length; i++) {
      resStrapi = await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`)
      if(resStrapi.data.length && products[i].image !== null) {
        imgName = products[i].image.split('/')
        imgName = imgName[imgName.length - 1]
        productLen++
        resImg = await AxiosSTRAPI.get(encodeURI(`/upload/files?name=${imgName}`))
        if(resImg.data.length) {
          if(resStrapi.data[0].images?.length) {
            data = {
              images: [...resStrapi.data[0].images.map(item => item.id), resImg.data[0].id]
            }
          }else{
            data = {
              images: resImg.data[0].id
            }
          }
          await AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, data).then(res => {
            imgLen++
            console.log('Success update --', res.data.title)
          }).catch(err => {
            if(err.response?.data){
              console.log(err.response.data)
            }else{
              console.log(err.response)
            }
          })
        }else{
          console.log('Image in Strapi not found --', imgName)
        }
      }else{
        console.log(i, '/', length)
      }
      
      // productLen++
      // resImg = await AxiosSTRAPI.get(encodeURI(`/upload/files?name=${resStrapi.data[0].imageName}`))
      // if(resImg.data.length) {
      //   AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, {
      //     images: resImg.data[0].id
      //   }).then(res => {
      //     imgLen++
      //     // console.log('Success update --', res.data.title)
      //   }).catch(err => {
      //     if(err.response?.data){
      //       console.log(err.response.data)
      //     }else{
      //       console.log(err.response)
      //     }
      //   })
      // }else{
      //   // console.log('Image in Strapi not found --', resStrapi.data[0].imageName)
      // }
      
    }

    console.log('Products with images --', productLen);
    console.log('Images in product set --', imgLen);

    res.status(200).send('All finished!');

  }else{
    res.status(200).send(req.method);
  }
}
