import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var xml = await fs.readFileSync('./moneyData/export/Zasoby_001.xml', 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});

    result = JSON.parse(result)

    result['MoneyData']['SeznamZasoba']['Zasoba'].map(item => {
      AxiosSTRAPI.get(`/produkties?guid_contains=${item.KmKarta.GUID._text}&_publicationState=preview`).then(res => {
        if(res.data.length){
          AxiosSTRAPI.put('/produkties/'+res.data[0].id, {
            price: item['PC']['Cena1']['Cena']._text,
            stock: item['StavZasoby']['Zasoba']._text,
            code: item['KmKarta']['Katalog']._text,
          }).then(res => console.log('Success update --', res.data.title))
            .catch(err => console.error(err.response.data))
        }else{
          AxiosSTRAPI.post('/produkties', {
            title: item['KmKarta']['Popis']._text,
            slug: slugify(item['KmKarta']['Popis']._text, {
              lower: true
            }),
            price: item['PC']['Cena1']['Cena']._text,
            stock: item['StavZasoby']['Zasoba']._text,
            code: item['KmKarta']['Katalog']._text,
            guid: item['KmKarta']['GUID']._text,
            published_at: null
          }).then(res => console.log('Success --', res.data.title))
            .catch(err => console.error(err.response.data))
        }
      }).catch(err => console.error(err.response.data))
    })

    res.status(200).json(result['MoneyData']['SeznamZasoba']['Zasoba']);

  }else{
    res.status(200).send(req.method);
  }
}
