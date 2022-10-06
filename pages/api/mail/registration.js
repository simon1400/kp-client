const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const mailersend = new MailerSend({
  api_key: process.env.MAILERSEND_TOKEN,
});

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
export default async function handler (req, res) {
  if(req.method === 'POST') {
    console.log('POST /SEND ORDER');

    const {email} = req.body

    try{
      const recipients = [
        new Recipient(email, "Recipient")
      ];
  
      const emailParams = new EmailParams()
          .setFrom("info@kralovska-pece.cz")
          .setFromName("Kralovska peče")
          .setRecipients(recipients)
          .setSubject('Registrace')
          .setHtml("<strong>and easy to do anywhere, even with Node.js</strong>")
          .setText("Registrace - Kralovska peče");
  
      mailersend.send(emailParams);
  
      console.log('Email send')
      res.status(200).send('Email sent')
    }catch(err) {
      console.error('ERRORRR REG --- ', err)
      res.status(err.code).json(err.response.body);
    }
  }
}
