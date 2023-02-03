import {readFileSync, readdirSync, unlink} from 'fs'
import convert from 'xml-js';
import slugify from 'slugify'
import crudSingleProduct from '../../../function/crudSingleProduct';
import crudVariableProduct from '../../../function/crudVariableProduct';

export default async function handler (req, res) {
  if(req.method == 'POST') {

    const dir = 'moneyData/export/'

    const files = readdirSync(dir)
    const splitNameFiles = files.map(name => {
      if(name.indexOf('_') >= 0){
        return name
      }
    }).filter(item => item !== undefined)
    
    for(let i = 0; i < splitNameFiles.length; i++) {
      var xml = readFileSync(`${dir}${splitNameFiles[i]}`, 'utf8');
      // var xml = readFileSync(`${dir}Zasoby.xml`, 'utf8');
      var result = convert.xml2json(xml, {compact: true, spaces: 4});

      result = JSON.parse(result)

      if(result?.MoneyData?.SeznamZasoba?.Zasoba) {
        
        const data = [], dataVariants = [], dataVariantsCombine = {};

        if(Array.isArray(result['MoneyData']['SeznamZasoba']['Zasoba'])) {

          const arrProductsXml = result['MoneyData']['SeznamZasoba']['Zasoba']
          let a = 0;
          while(a < arrProductsXml.length) {
            let item = arrProductsXml[a]
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
                ean: item['KmKarta']['BarCode']?._text || '',
                publishedAt: null
              })
              a++;
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
                ean: item['KmKarta']['BarCode']?._text || '',
                magnetude: item['KmKarta']['Objem']._text+' ml'
              })
              a++;
            }
          }

        }else{
          const item = result['MoneyData']['SeznamZasoba']['Zasoba']
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
              ean: item['KmKarta']['BarCode']?._text || '',
              publishedAt: null
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
              ean: item['KmKarta']['BarCode']?._text || '',
              magnetude: item['KmKarta']['Objem']._text+' ml'
            })
          }
        }
        
        dataVariants.map(item => {
          if(dataVariantsCombine[item.code.split('-')[0]]){
            dataVariantsCombine[item.code.split('-')[0]].push(item)
          }else{
            dataVariantsCombine[item.code.split('-')[0]] = [item]
          }
        })

        if(data.length) {
          await crudSingleProduct(data)
        }
        
        if(Object.keys(dataVariantsCombine).length) {
          await crudVariableProduct(dataVariantsCombine)
        }
        
      }

      unlink(`${dir}${splitNameFiles[i]}`, (err) => {
        if (err) throw err;
        console.log(`successfully deleted ${dir}${splitNameFiles[i]}`);
      });
    }

    res.status(200).json({some: 'good'});

  }else{
    res.status(200).send(req.method);
  }
}
