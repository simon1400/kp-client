import InfoOrder from '../../../mailTemplate/infoOrder';
import sgMail from '@sendgrid/mail'

export default async function handler (req, res) {
  if(req.method === 'POST') {
    console.log('POST /SEND ORDER');

    await sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const data = req.body

    console.log("data order in mail send", data)

    const msg = {
      to: data.email,
      from: 'Objednávka dokončena - Kralovska peče <info@kralovska-pece.cz>',
      subject: 'Objednávka č.: ' + data.id,
      text: "Objednávka dokončena - Kralovska peče",
      html: InfoOrder(data),
    }

    await sgMail.send(msg).then(() => {
      res.status(200).send('Email sent')
    }).catch((error) => {
      console.error('ERRORRR --- ', error)
      res.status(error.code).json(error.response.body);
    })
  }
}
