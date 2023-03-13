const nodemailer = require('nodemailer');

const emailSender  = async (emailSubject, htmlMessage, receiverEmailAddress) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 2525,
            // secure: true,
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });
    
        const mailOptions = {
            from: `Sodiq Farhan <farhan@sgs.com>`,
            to: receiverEmailAddress,
            subject: emailSubject,
            html: htmlMessage
        }

        const deliveryInfo = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${deliveryInfo.accepted}`);
        return deliveryInfo.accepted;
    } catch (error) {
        console.log(`Failed to send email: ${error}`)
    }
}

module.exports = emailSender;