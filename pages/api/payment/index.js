const AxiosPAY = require('../../../restClient').default
const GetAccessToken = require('../../../function/getTokenPayment').default

export default async function handler (req, res) {

  if (req.method === 'POST') {
    console.log('POST /order');

    const data = req.body;

    const orderId64 = Buffer.from(data.id).toString('base64')

    const bodyObj = {
      payer: {
        allowed_payment_instruments: [
          "PAYMENT_CARD",
          "BANK_ACCOUNT",
          "GOPAY"
        ],
        default_payment_instrument: "PAYMENT_CARD",
        allowed_swifts: [
          "FIOBCZPP",
          "BREXCZPP"
        ],
        default_swift: "FIOBCZPP",
        contact: {
          first_name: data.name,
          last_name: data.surname,
          email: data.email,
          phone_number: data.phone,
          city: data.city,
          street: data.address,
          postal_code: data.zip,
          country_code: "CZE"
        },
      },
      target: {
        type: "ACCOUNT",
        goid: 8815516765
      },
      items: data.basketItem.map(item => ({
        type: "ITEM",
        name: `${item.brand} - ${item.title} - ${item.variant}`,
        amount: item.price * item.count * 100,
        count: item.count,
        product_url: `${process.env.APP_DOMAIN}/product/${item.slug}`
      })),
      amount: data.sum * 100,
      currency: "CZK",
      order_number: data.id,
      lang: "CS",
      callback: {
        return_url: `${process.env.APP_DOMAIN}/dekujem/${orderId64}`,
        notification_url: `${process.env.APP_DOMAIN}/api/notify`
      },
    }

    const AccessToken = await GetAccessToken()

    const resPayment = await AxiosPAY.post('/api/payments/payment', bodyObj, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${AccessToken}`,
      }
    })

    res.status(200).json(resPayment.data);

  }else{
    res.status(200).send(req.method);
  }
}