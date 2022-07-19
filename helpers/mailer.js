const nodemailer = require("nodemailer");

function sendEmail(message) {
    return new Promise((res, rej) => {
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: "madhur07sharma@gmail.com",
                pass: "xsmtpsib-827b182c32b3c16d7884c5e82b320f7cb47b75e5295ba2882155880e23463b1c-W5z7I23RPJYSpkLU",
            },
        });

        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err);
            } else {
                res(info);
            }
        });
    });
}

exports.sendConfirmationEmail = function ({ toUser }) {
    const message = {
        from: "madhur07sharma@gmail.com",
        to: "madhur07sharma@gmail.com",
        subject: "Activate your tenant manager",
        html: `
                <h1 style="color:blue;text-align:center;">TEST</h1>
                <h3>Thank you for registering</h3>
            `,
    };

    return sendEmail(message);
};

//xsmtpsib-827b182c32b3c16d7884c5e82b320f7cb47b75e5295ba2882155880e23463b1c-W5z7I23RPJYSpkLU
