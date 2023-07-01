const nodeMailer = require('nodemailer');

module.exports = async (email, subject, text) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    })
    try {

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: `
            <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Email Verification</title>
                </head>
                <body>
                    <div>
                        <h1>Hello!</h1>
                        <p>Please click the link below to verify your email:</p>
                        <p><a href=${text}>Verify Email</a></p>
                    </div>
                </body>
            </html>
            `,
        });
        console.log("Email Sent Successfully");
    }
    catch (err) {
        console.log("Email not sent");
        console.log(err);
    }
}