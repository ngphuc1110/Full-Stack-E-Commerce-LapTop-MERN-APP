const { Resend } = require('resend');
const dotenv = require('dotenv')
dotenv.config()

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'LaptopStore <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error("sendEmail", error);
        }
        return data

    } catch (err) {
        console.log(err)
    }

}

module.exports = sendEmail
