const verifyEmailTemplate = ({ name, url }) => {
    return `
    <p>Dear ${name},</p>
    <p>Thank you for resgistering LaptopStore</p>
    <a href=${url} style="color: black; background: orange; margin-top: 10px, padding: 20px"> 
    Verify Email
    </a>
    `
}

module.exports = verifyEmailTemplate