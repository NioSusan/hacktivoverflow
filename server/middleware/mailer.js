const nodemailer = require('nodemailer');
const fs = require('fs')
// let email = fs.readFileSync('/Users/susanwen/Desktop/Hactiv8/p2/w4/hacktiveOverFlow/hacktivoverflow/server/public/email.html','utf8')
let email = "<h1>WELCOME!!!</h1><br><p>Thanks for signing up to our forum - you're all set and will be receiving the first email soon.</p><br>"
function mailer(userMail,userName){

let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'hssniowen@gmail.com',
      pass: process.env.MAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  
  let HelperOptions = {
    from: '"susannio" <hssniowen@gmail.com',
    to: `${userMail}`,
    subject: 'Hacktiv Overflow',
    text: `THANKS ${userName}FOR JOIN WITH US!!! `,
    html: email

  };
  
    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("The message was sent!");
      console.log(info);
    });
  
}

module.exports = mailer