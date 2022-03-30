import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import slugify from 'slugify'

const categoryModel = {
  "31": {
    name: "Niche parfémy"
   },
   "130": {
    name: "Niche parfémy"
   },
   "128": {
    name: "Dekorativní kosmetika"
   },
   "47": {
    name: "Pleťová kosmetika"
   },
   "65": {
    name: "Pleťová kosmetika"
   },
   "73": {
    name: "Pleťová kosmetika"
   },
   "94": {
    name: "Manikúra a pedikúra"
   },
   "96": {
    name: "Manikúra a pedikúra"
   },
   "89": {
    name: "Svíčky a difuzéry"
   },
   "112": {
    name: "Svíčky a difuzéry"
   },
   "84": {
    name: "Dárkové poukazy"
   }
}

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.Products
    let resStrapi;

    const length = products.length

    let manufakturer = [], dataProd, productsArrIds = [];

    var i = 0;
    while(i < length) {
      await AxiosSTRAPI.get(`/produkties?product_id=${products[i].product_id}&_publicationState=preview`).then(resStrapi => {
        if(resStrapi.data.length) {
          productsArrIds = products[i].related_ids.split(',')
          productsArrIds.map(item => {
            AxiosSTRAPI.get(`/produkties?product_id=${item}&_publicationState=preview`).then(resManufac => {
              if(resStrapi.data[0].relateds !== null) {
                dataProd = {
                  relateds: [...resStrapi.data[0].relateds.map(item => item.id), resManufac.data[0].id]
                }
              }else{
                dataProd = {
                  relateds: resManufac.data[0].id
                }
              }
              return dataProd
            }).then(data => {
              AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, data).then(() => {
                console.log('UPDATE! --', i, resStrapi.data[0].title)
              }).catch(err => {
                if(err.response?.data) {
                  console.log('Error update prod --', err.response.data);
                }else{
                  console.log('Error update prod --', err.response);
                }
                console.log('Not update product! --', products[i]);
              })
            }).catch(err => {
              console.log('Error find product --', productsArrIds, item)
            })
          })
          i++ 
        }else{
          console.log(i, '/', length);
          i++
        }
      }).catch(err => {
        console.log('Error find product first --', products[i].title, err.response);
        i++
      })
    }

    // function onlyUnique(value, index, self) {
    //   return self.indexOf(value) === index;
    // }
    
    // var unique = manufakturer.filter(onlyUnique);

    // unique.map(item => {
    //   if(item !== null) {
    //     AxiosSTRAPI.post('/brands', {
    //       title: item,
    //       add_title: item,
    //       slug: slugify(item, {
    //         lower: true,
    //         remove: /[*+~´,.()'"!:@]/g
    //       })
    //     }).then(res => {
    //       console.log(res.data);
    //     }).catch(err => {
    //       if(err.response.data) {
    //         console.log(err.response.data)
    //       }else{
    //         console.log(err.response);
    //       }
    //     })
    //   }
    // })


    console.log('DONE!!!');

    res.status(200).send("Import json!");

  }else{
    res.status(200).send(req.method);
  }
}
