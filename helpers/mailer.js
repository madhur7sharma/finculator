const nodemailer = require("nodemailer");
function sendEmail(message) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.in",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: "madhur07sharma@gmail.com", //zoho username
                pass: "YhBqMJbQht4u", //Not zoho mail password because of 2FA enabled
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

exports.sendConfirmationEmail = function (new_user) {
    console.log("new_user", new_user);
    console.log(`http://localhost:3000/api/activate-user/${new_user._id}`);
    const message = {
        from: `<madhur07sharma@gmail.com>`,
        to: "madhur07sharma@gmail.com",
        subject: "Verify your account",
        html: `
                <h1 style="color:blue;text-align:center;">${new_user.name}</h1>
                <h3>Thank you for registering</h3>
                <a target="_" href="http://localhost:3000/api/activate-user/${new_user._id}"><button style="color:white;text-align:center;background-color:gray;">Activation Link</button></a>
            `,
    };

    return sendEmail(message);
};

//xsmtpsib-827b182c32b3c16d7884c5e82b320f7cb47b75e5295ba2882155880e23463b1c-W5z7I23RPJYSpkLU
