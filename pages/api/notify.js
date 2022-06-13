const AxiosPAY = require('../../restClient').default
const GetAccessToken = require('../../function/getTokenPayment').default

export default async function handler (req, res) {
  if(req.method === 'GET') {
    console.log('GET /order');

    const {id} = req.query;

    const AccessToken = await GetAccessToken()

    const resPayment = await AxiosPAY.get('/api/payments/payment/'+id, {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${AccessToken}`,
      }
    })

    res.status(200).json(resPayment.data);
  }else if(req.method === 'POST'){
    console.log('POST /notify');

    res.status(200).json(req.body);
  }else{
    res.status(200).send(req.method);
  }
}
