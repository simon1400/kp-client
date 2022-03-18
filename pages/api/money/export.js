import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var xml = await fs.readFileSync('./moneyData/export/Zasoby_001.xml', 'utf8');
    var result = convert.xml2json(xml, {compact: true, spaces: 4});

    result = JSON.parse(result)

    const dataProduct = []

    result['MoneyData']['SeznamZasoba']['Zasoba'].map(item => {
      AxiosSTRAPI.post('/produkties', {
        title: item['KmKarta']['Popis']._text,
        slug: slugify(item['KmKarta']['Popis']._text, {
          lower: true
        }),
        price: item['PC']['Cena1']['Cena']._text,
        stock: item['StavZasoby']['Zasoba']._text,
        code: item['KmKarta']['Katalog']._text,
        published_at: null
      }).then(res => {
        console.log(res.data);
      }).catch(err => console.error(err.response.data.data))
    })

    res.status(200).json({result: result['MoneyData']['SeznamZasoba']['Zasoba'], dataProduct});

  }else{
    res.status(200).send(req.method);
  }
}
