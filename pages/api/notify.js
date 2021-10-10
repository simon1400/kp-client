// const AxiosPAY = require('../../../restClient').default
// const GetAccessToken = require('../../../function/getTokenPayment').default

export default async function handler (req, res) {
  if(req.method === 'GET') {
    console.log('GET /notify');

    console.log(req.body);

    res.status(200).json(req.body);
  }else if(req.method === 'GET'){
    console.log('GET /notify');

    console.log(req.body);

    res.status(200).json(req.body);
  }else{
    res.status(200).send(req.method);
  }
}
