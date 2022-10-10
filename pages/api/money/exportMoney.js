import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var xml = await fs.readFileSync('./moneyData/export/Zasoby.xml', 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});

    result = JSON.parse(result)

    const data = [], dataVariants = [], dataVariantsCombine = {};

    result['MoneyData']['SeznamZasoba']['Zasoba'].map(item => {
      if(item['KmKarta']['Katalog']._text.indexOf('-') < 0){
        data.push({
          title: item['KmKarta']['Popis']._text,
          slug: slugify(item['KmKarta']['Popis']._text, {
            lower: true,
            remove: /[*+~´,.()'"!:@]/g
          }),
          price: item['PC']['Cena1']['Cena']._text,
          stock: item['StavZasoby']['Zasoba']._text,
          code: item['KmKarta']['Katalog']._text,
          guid: item['KmKarta']['GUID']._text,
          published_at: null
        })
      }else{
        dataVariants.push({
          title: item['KmKarta']['Popis']._text,
          slug: slugify(item['KmKarta']['Popis']._text, {
            lower: true,
            remove: /[*+~´,.()'"!:@]/g
          }),
          price: item['PC']['Cena1']['Cena']._text,
          stock: item['StavZasoby']['Zasoba']._text,
          code: item['KmKarta']['Katalog']._text,
          guid: item['KmKarta']['GUID']._text,
          magnetude: item['KmKarta']['Objem']._text+' ml'
        })
      }
    })

    dataVariants.map(item => {
      if(dataVariantsCombine[item.code.split('-')[0]]){
        dataVariantsCombine[item.code.split('-')[0]].push(item)
      }else{
        dataVariantsCombine[item.code.split('-')[0]] = [item]
      }
    })

    data.map(item => {
      AxiosSTRAPI.get(`/api/produkties?guid_contains=${item.guid}&_publicationState=preview`).then(res => {
        console.log('res ---- ', res);
        if(res.data.length){
          AxiosSTRAPI.put('/api/produkties/'+res.data[0].id, {data: {
            price: item.price,
            stock: item.stock,
          }}).then(res => console.log('Success update --', res.data.title))
            .catch(err => console.error(err.response?.data || err.response))
        }else{
          AxiosSTRAPI.post('/api/produkties', {data: item})
            .then(res => console.log('Success created --', res.data.title))
            .catch(err => {
              if(err.response?.data) {
                console.log('Failed created --', err.response.data)
              }else{
                console.log('Failed created --', err.response)
              }
            })
        }
      }).catch(err => console.log(err.response?.data || err.response))
    })

    for (const [key, value] of Object.entries(dataVariantsCombine)) {
      AxiosSTRAPI.get(`/api/produkties?guid_contains=${value[0].guid}&_publicationState=preview`).then(res => {
        if(res.data.length){
          AxiosSTRAPI.put('/api/produkties/'+res.data[0].id, {data: {
            price: value[0].price,
            stock: value[0].stock,
            Variants: value.map(item => ({
              nazev: item.magnetude,
              price: item.price,
              guid: item.guid,
              stock: item.stock,
            })),
          }}).then(res => console.log('Success update variant --', res.data?.title))
            .catch(err => console.error(err.response?.data))
        }else{
          AxiosSTRAPI.post('/api/produkties', {data: {
            title: value[0].title,
            slug: slugify(value[0].title, {
              lower: true,
              remove: /[*+~´,.()'"!:@]/g
            }),
            price: value[0].price,
            stock: value[0].stock,
            code: key,
            guid: value.map(item => item.guid).join(),
            Variants: value.map(item => ({
              nazev: item.magnetude,
              price: item.price,
              guid: item.guid,
              stock: item.stock,
            })),
            published_at: null
          }}).then(res => console.log('Success created variant --', res.data.title))
            .catch(err => {
              if(err.response?.data?.error?.details) {
                console.error('Failed create variant 1 --', err.response?.data?.error?.details)
              }else if(err.response?.data?.error) {
                console.error('Failed create variant 2 --', err.response?.data?.error)
              }else if(err.response?.data) {
                console.error('Failed create variant 3 --', err.response?.data)
              }else if(err.response?.data) {
                console.error('Failed create variant 4 --', err.response?.data)
              }else{
                console.error('Failed create variant 5 --', err.response)
              }
            })
        }
      }).catch(err => {
        if(err.response?.data) {
          console.log('Failed get --', err.response.data)
        }else{
          console.log('Failed get --', err.response)
        }
      })
    }

    res.status(200).json(dataVariantsCombine);

  }else{
    res.status(200).send(req.method);
  }
}
