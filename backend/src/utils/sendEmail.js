
module.exports = { 
    
    enviar(senha,email) {

            return new Promise((resolve, reject) => {

                const nodemailer = require('nodemailer');

                const config = {
                    host: "smtp.mailtrap.io",
                    port: 25,
                    auth: {
                        user: "a9d8d00e4c43de",
                        pass: "34819c390c2113"
                    },
                };

                const transporter = nodemailer.createTransport(config);

                const mailOptions = {
                    from: 'excleitonramos@gmail.com',
                    to: email,
                    subject: 'Redefinição de senha',
                    text: `Sua nova senha é ${senha}`
                };
        
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        resolve(false);
                    }
                    resolve(true);
                });

            });
        }

};