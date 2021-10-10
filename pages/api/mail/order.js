const sgMail = require('@sendgrid/mail')
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
export default async function handler (req, res) {
  if(req.method === 'POST') {
    console.log('POST /SEND ORDER');

    await sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    console.log(req.data);

    const {email} = req.data

    const msg = {
      to: email, // Change to your recipient
      from: 'pechunka11@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    await sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        res.status(error.code).json(error.response.body);
        console.error('ERRORRR --- ', error)
      })


  }
}
