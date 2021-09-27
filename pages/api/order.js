const axios = require('axios')

export default function handler (req, res) {
  if (req.method === 'POST') {
    console.log('POST /order');

    const {
      description,
      contactInfo,
      anotherAddress,
      firmInfo,
      check,
      basket,
      payment,
      delivery,
      sum,
      status,
      payOnline
    } = req.body;

    const order = {
      email: contactInfo.email,
      phone: contactInfo.phone,
      name: contactInfo.name,
      surname: contactInfo.surname,
      state: contactInfo.state,
      city: contactInfo.city,
      address: contactInfo.address,
      zip: contactInfo.zip,
      anotherAddress,
      firmInfo,
      description,
      basket,
      sum,
      idOrder: Math.floor(Math.random() * (999999 - 0)) + 0,
      status,
      state: 'new',
      paymentMethod: payment.name,
      paymentPrice: payment.value,
      payOnline: payOnline,
      deliveryMethod: delivery.name,
      deliveryPrice: delivery.value
    };

    res.status(200).json(order);

    const resDataParse = {}

    if(payOnline){

      axios.post('https://gw.sandbox.gopay.com/api/oauth2/token', {
        scope: 'payment-create',
        grant_type: 'client_credentials'
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "Content-Type",
          "Authorization": "Content-Type",
        },
      })

      const paymentData = {
        // merchant: process.env.PAYED_ID,
        // test: true,
        // price: sum * 100,
        // lang: 'cs',
        // curr: 'CZK',
        // label: encodeURIComponent(contactInfo.name) + '-' + encodeURIComponent(contactInfo.surname),
        // refId: order.idOrder,
        // cat: 'DIGITAL',
        // // method: payment.method,
        // prepareOnly: true,
        // email: encodeURIComponent(contactInfo.email),
        // secret: process.env.PAYED_PASSWORD
      }

      var paymentReq = ''

      // for (const [key, value] of Object.entries(paymentData)) {
      //   if(!paymentReq.length){
      //     paymentReq += `${key}=${value}`
      //   }else{
      //     paymentReq += `&${key}=${value}`
      //   }
      // }

      console.log(paymentReq);

      // var resPayment = await axios.post(`https://payments.comgate.cz/v1.0/create?${paymentReq}`)

      // const resData = resPayment.data.split('&')
      // resData.forEach(item => {
      //   var itemSpliting = item.split('=');
      //   resDataParse[itemSpliting[0]] = itemSpliting[1]
      // })
    }

    const resOrder = ['resOrder']

    const response = {
      msg: "Order successfully created",
      data: payOnline ? resDataParse : resOrder
      // data: 'somedata'
    }

    res.status(200).json(response);

  }else{
    res.status(200).send(req.method);
  }
}
