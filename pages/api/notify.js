// const AxiosPAY = require('../../../restClient').default
// const GetAccessToken = require('../../../function/getTokenPayment').default

export default async function handler (req, res) {
  if(req.method === 'GET') {
    console.log('GET /notify');

    res.status(200).json(req.body);
  }else if(req.method === 'POST'){
    console.log('POST /notify');

    res.status(200).json(req.body);
  }else{
    res.status(200).send(req.method);
  }
}
