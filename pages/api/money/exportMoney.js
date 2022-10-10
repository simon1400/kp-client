import fs from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'
import crudSingleProduct from '../../../function/crudSingleProduct';
import crudVariableProduct from '../../../function/crudVariableProduct';

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

    // crudSingleProduct(data)

    crudVariableProduct(dataVariantsCombine)

    res.status(200).json({some: 'good'});

  }else{
    res.status(200).send(req.method);
  }
}
