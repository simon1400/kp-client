import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var filename = ''

    fs.readdirSync('./moneyData/export').forEach(file => {
      filename = file
    });

    var xml = await fs.readFileSync('./moneyData/export/' + filename, 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});

    result = JSON.parse(result)

    const data = [], dataVariants = [], dataVariantsCombine = {};

    result['MoneyData']['SeznamZasoba']['Zasoba'].map(item => {
      if(item['KmKarta']['Katalog']._text.indexOf('-') < 0){
        data.push({
          title: item['KmKarta']['Popis']._text,
          slug: slugify(item['KmKarta']['Popis']._text, {
            lower: true
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
            lower: true
          }),
          price: item['PC']['Cena1']['Cena']._text,
          stock: item['StavZasoby']['Zasoba']._text,
          code: item['KmKarta']['Katalog']._text,
          guid: item['KmKarta']['GUID']._text,
          published_at: null
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

    data.splice(0, 4).map(item => {
      AxiosSTRAPI.get(`/produkties?guid_contains=${item.guid}&_publicationState=preview`).then(res => {
        if(res.data.length){
          AxiosSTRAPI.put('/produkties/'+res.data[0].id, {
            price: item.price,
            stock: item.stock,
          }).then(res => console.log('Success update --', res.data.title))
            .catch(err => console.error(err.response.data))
        }else{
          AxiosSTRAPI.post('/produkties', item)
            .then(res => console.log('Success --', res.data.title))
            .catch(err => console.error(err.response.data))
        }
      }).catch(err => console.error(err.response.data))
    })

    // res.status(200).json(result['MoneyData']['SeznamZasoba']['Zasoba']);
    res.status(200).json(dataVariantsCombine);

  }else{
    res.status(200).send(req.method);
  }
}
