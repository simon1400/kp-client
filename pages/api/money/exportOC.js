import {AxiosSTRAPI} from '../../../restClient';
import fs from 'fs'
import slugify from 'slugify'

export default async function handler (req, res) {
  if(req.method == 'POST') {

    var dataOC = JSON.parse(await fs.readFileSync('./data/exportFromOC.json', 'utf8'));

    const products = dataOC.Products
    let resStrapi;

    const length = products.length

    // {
    //   "product_id": 98,
    //   "name(cs-cz)": "Diptyque - L`Ombre dans L`Eau EdT",
    //   "categories": "31",
    //   "sku": "0006",
    //   "model": "0006",
    //   "manufacturer": "Diptyque",
    //   "image_name": "catalog\/diptyque\/l-ombre-dans-l-eau-edt-1.jpg",
    //   "description(cs-cz)": "<p>\"Stín (chládek) na vodě\" - nádherná čistá vůně, která již při prvním přivonění připomene poetický obraz překrásné zahrady, která leží na břehu malého rybníka. Esence listů keře černého rybízu a to nejněžnější z bulharských růží, jenom tušení, nechá nás snít.<\/p>\n\n<p>S hlavními akordy zelené, ovoce, aromatických složek, jemného koření a růže je to parfém lehký, nasládlý a krásný. Nejprve se objeví zelená vůně, pak se přidá bouquet divokých květin. Složky jako bulharská růže či koření dávájí této vůni exotický a luxusní linii.  <\/p>\n\n<p><strong>Hlava: <\/strong>černý rybíz<br \/>\n<strong>Srdce: <\/strong>bulharská růže<br \/>\n<strong>Tělo: <\/strong>mošus, lístky rybízu<\/p>\n",
    //   "meta_title(cs-cz)": "Diptyque - L`Ombre dans L`Eau EdT",
    //   "meta_description(cs-cz)": "Diptyque - L`Ombre dans L`Eau. S hlavními akordy zelené, ovoce, aromatických složek, jemného koření a růže je to parfém lehký, nasládlý a krásný.",
    //   "related_ids": "104,365"
    //  },

    for(var i = 0; i < length; i++) {
      resStrapi = await AxiosSTRAPI.get(`/produkties?code=${products[i].sku}&_publicationState=preview`)
      if(resStrapi.data.length) {
        console.log(resStrapi.data[0].id)
        AxiosSTRAPI.put('/produkties/'+resStrapi.data[0].id, {
          title: products[i]['name(cs-cz)'],
          content: products[i]['description(cs-cz)'],
          product_id: `${products[i]['product_id']}`,
          meta: {
            title: products[i]['meta_title(cs-cz)'],
            description: products[i]['meta_description(cs-cz)']
          }
        }).then(() => console.log('UPDATE! --', i))
          .catch(err => {
            console.log(err.response.data);
            console.log('Not update! --', i);
          })
      }else{
        console.log(i, '/', length)
      }
    }

    console.log('DONE!!!');

    res.status(200).send("Import json!");

  }else{
    res.status(200).send(req.method);
  }
}
