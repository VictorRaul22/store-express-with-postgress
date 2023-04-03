const nodemailer = require('nodemailer');
const { config } = require('./config/config');
async function sendMail() {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: config.mailHost,
    secure: true, // true for 465, false for other ports
    port: config.mailPort,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'businesscommercec@gmail.com', // sender address
    to: 'businessAppKey@gmail.com', // list of receivers
    subject: 'Este es un nuevo correo', // Subject line
    text: 'Hola victor', // plain text body
    html: '<b>Hola victor</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
sendMail().catch(console.error);
