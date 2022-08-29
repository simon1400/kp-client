import fs from 'fs'
import moneyOrder from '../../../function/moneyOrder';

export default async function handler (req, res) {
  if(req.method == 'POST') {
    fs.writeFile('moneyData/import/importOrder.xml', moneyOrder({...req.body.order.data.attributes, id: req.body.order.data.id}), (err) => {
      if (err) throw err;
      console.log('File is created successfully.');
    });

    res.status(200).json({result: req.body});

  }else{
    res.status(200).send(req.method);
  }
}