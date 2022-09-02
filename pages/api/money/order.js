const { promises: fs } = require('fs');
import axios from 'axios';
import moneyOrder from '../../../function/moneyOrder';

const APP_API = process.env.APP_API

export default async function handler (req, res) {
  if(req.method == 'POST') {

    const dir = 'moneyData/import';

    const getNumFiles = async (dir) => {
      const files = await fs.readdir(dir)
      return files.length
    }

    const countFiles = await getNumFiles(dir)

    const nameFile = `importOrder${countFiles}.xml`

    await fs.writeFile(`moneyData/import/${nameFile}`, moneyOrder({...req.body.attributes, id: req.body.id}), (err) => {
      if (err) throw err;
      console.log('File is created successfully.');
    })

    // const dataReq = {
    //   type: 'import',
    //   fileName: nameFile,
    //   fileContent: moneyOrder({...req.body.order.data.attributes, id: req.body.order.data.id})
    // }

    // await axios.post(APP_API+'/api/moneys', {data: dataReq})
    //             .then(() => console.log('Money import data success saved!'))
    //             .catch(err => console.log(err))

    res.status(200).json({result: req.body});

  }else{
    res.status(200).send(req.method);
  }
}